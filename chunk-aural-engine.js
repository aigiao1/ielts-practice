// 雅思真题词块听辨引擎 (Chunk Aural Engine)
// 职责：处理词块会话抽词、B+ 四段式状态机、音频时间轴、轻量错因推导、分流修复队列与延迟回测调度
(() => {
  "use strict";

  function computeLevenshtein(s1, s2) {
    const a = (s1 || "").toLowerCase().trim();
    const b = (s2 || "").toLowerCase().trim();
    if (!a) return b.length;
    if (!b) return a.length;

    const matrix = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }
    return matrix[a.length][b.length];
  }

  class ChunkAuralEngine {
    constructor(options = {}) {
      this.packs = options.packs || [];
      this.schemas = options.schemas || (typeof window !== "undefined" ? window.ContentSchemas : null);
      this.pool = [];
      this.currentIndex = 0;

      // B+ 状态机: "idle" | "screening" | "diagnostic_summary" | "repair" | "delayed_retest"
      this.currentStage = "idle";
      this.screeningRecords = [];
      this.repairQueue = [];
      this.repairIndex = 0;
      this.delayedRetestPool = [];
      this.delayedRetestIndex = 0;
      this.lastDiagnosticSummary = null;

      // 题目级计时器与状态
      this.audioStartedAt = null;
      this.audioEndedAt = null;
      this.firstKeystrokeAt = null;
      this.recognitionLatency = null;
      this.completionTime = null;
      this.currentReplayCount = 0;

      // 会话统计
      this.sessionStats = {
        totalAnswered: 0,
        totalCorrect: 0,
        accuracy: 0,
        fluentCount: 0,
        accessibleCount: 0,
        slowCount: 0,
        weakCount: 0
      };
    }

    /**
     * 初始化全量/指定小节题库
     */
    initSession(config = {}) {
      const scope = config.packScope || "all";
      const section = config.sectionFilter || "all";
      const shuffle = config.shuffle !== false;

      let candidates = [];
      this.packs.forEach((p) => {
        if (!p || !Array.isArray(p.items)) return;
        if (scope === "wanglu_ch5" && p.packId !== "wanglu-chunks-v1") return;
        if (scope === "wanglu_ch11" && p.packId !== "wanglu-advanced-chunks-v1") return;
        candidates.push(...p.items);
      });

      if (section !== "all") {
        candidates = candidates.filter((item) => {
          const ref = (item.sourceRef || "").toLowerCase();
          return ref.includes(section.toLowerCase());
        });
      }

      if (shuffle) {
        for (let i = candidates.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
        }
      }

      this.pool = candidates;
      this.currentIndex = 0;
      this.currentStage = "screening";
      this.resetQuestionTimers();
      this.sessionStats = {
        totalAnswered: 0,
        totalCorrect: 0,
        accuracy: 0,
        fluentCount: 0,
        accessibleCount: 0,
        slowCount: 0,
        weakCount: 0
      };

      return this.pool;
    }

    /**
     * B+ 阶段 1：雷达连续筛查会话 (固定批次 20 题，中途不打断)
     */
    initScreeningSession(config = {}) {
      const batchSize = config.batchSize || 20;
      this.initSession(config);
      this.pool = this.pool.slice(0, batchSize);
      this.currentStage = "screening";
      this.screeningRecords = [];
      return this.pool;
    }

    resetQuestionTimers() {
      this.audioStartedAt = null;
      this.audioEndedAt = null;
      this.firstKeystrokeAt = null;
      this.recognitionLatency = null;
      this.completionTime = null;
      this.currentReplayCount = 0;
    }

    getCurrentQuestion() {
      if (this.currentStage === "repair") {
        return this.repairQueue[this.repairIndex]?.chunk || null;
      }
      if (this.currentStage === "delayed_retest") {
        return this.delayedRetestPool[this.delayedRetestIndex] || null;
      }
      if (!this.pool || this.pool.length === 0) return null;
      if (this.currentIndex >= this.pool.length) return null;
      return this.pool[this.currentIndex];
    }

    markAudioStarted(ts = Date.now()) {
      this.audioStartedAt = ts;
    }

    markAudioEnded(ts = Date.now()) {
      this.audioEndedAt = ts;
    }

    markFirstKeystroke(ts = Date.now()) {
      if (this.firstKeystrokeAt === null && this.audioEndedAt !== null) {
        this.firstKeystrokeAt = ts;
        this.recognitionLatency = Math.max(0, ts - this.audioEndedAt);
      }
    }

    recordReplay() {
      this.currentReplayCount++;
    }

    static normalizeString(text) {
      if (!text) return "";
      return String(text)
        .toLowerCase()
        .replace(/[\/]/g, " ")
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, " ")
        .trim();
    }

    static getAcceptableVariants(expectedText) {
      const variants = new Set();
      if (!expectedText) return variants;

      const rawParts = expectedText.split("=").map((s) => s.trim());

      rawParts.forEach((part) => {
        const norm = ChunkAuralEngine.normalizeString(part);
        if (norm) variants.add(norm);

        if (part.includes("(") && part.includes(")")) {
          const withParen = part.replace(/[()]/g, " ").trim();
          const withoutParen = part.replace(/\([^)]*\)/g, " ").trim();
          const normWith = ChunkAuralEngine.normalizeString(withParen);
          const normWithout = ChunkAuralEngine.normalizeString(withoutParen);
          if (normWith) variants.add(normWith);
          if (normWithout) variants.add(normWithout);

          const core = normWithout.replace(/^(a|an|the|in|at|on|for|of)\s+/, "");
          if (core) variants.add(core);
        }
      });

      return variants;
    }

    static evaluateAnswer(userAnswer, expectedAnswer) {
      const normUser = ChunkAuralEngine.normalizeString(userAnswer);
      const variants = ChunkAuralEngine.getAcceptableVariants(expectedAnswer);

      const isCorrect = variants.has(normUser);
      const spellingErrors = [];

      if (!isCorrect) {
        const expectedPrimary = ChunkAuralEngine.normalizeString(expectedAnswer.split("=")[0]);
        const expWords = expectedPrimary.split(" ").filter(Boolean);
        const usrWords = normUser.split(" ").filter(Boolean);

        for (let i = 0; i < Math.max(expWords.length, usrWords.length); i++) {
          const expW = expWords[i] || "(缺少)";
          const usrW = usrWords[i] || "(未填)";
          if (expW !== usrW) {
            spellingErrors.push(`[${usrW} ➔ ${expW}]`);
          }
        }
      }

      return {
        isCorrect,
        normalizedUser: normUser,
        expectedVariants: Array.from(variants),
        spellingErrors
      };
    }

    static evaluateReactionTier(recognitionLatency, isCorrect) {
      if (!isCorrect) return "weak";
      const lat = typeof recognitionLatency === "number" ? recognitionLatency : 99999;
      if (lat <= 2000) return "fluent";
      if (lat <= 4000) return "accessible";
      if (lat <= 8000) return "slow";
      return "weak";
    }

    /**
     * B+ 阶段 2：轻量错因自动预测规则 (区分盲区 vs 拼错 vs 迟钝)
     */
    static predictDiagnosticReason(userAnswer, expectedAnswer, recognitionLatency, isCorrect) {
      const user = ChunkAuralEngine.normalizeString(userAnswer);
      const exp = ChunkAuralEngine.normalizeString(expectedAnswer.split("=")[0]);

      if (isCorrect) {
        if (typeof recognitionLatency === "number" && recognitionLatency > 4000) {
          return "slow_recognition";
        }
        return null;
      }

      // 未输入或输入过短且毫无相似度
      if (!user) {
        return "sound_not_recognised";
      }

      const dist = computeLevenshtein(user, exp);
      const maxLen = Math.max(user.length, exp.length);

      // 编辑距离极小 (例如只错 1-2 字母)，或者相似度高达 70% 以上 ➔ 听懂了但拼写错误
      if (dist <= 2 || (maxLen > 4 && dist / maxLen <= 0.35)) {
        return "recognised_but_misspelled";
      }

      // 词汇重合度判断 (如 3 个词对了 2 个)
      const uTokens = new Set(user.split(" "));
      const eTokens = exp.split(" ");
      const matchCount = eTokens.filter((t) => uTokens.has(t)).length;
      if (eTokens.length >= 2 && matchCount / eTokens.length >= 0.5) {
        return "recognised_but_misspelled";
      }

      return "sound_not_recognised";
    }

    submitAnswer(userAnswer, ts = Date.now()) {
      const q = this.getCurrentQuestion();
      if (!q) return null;

      const evalRes = ChunkAuralEngine.evaluateAnswer(userAnswer, q.text);
      const submitTime = ts;
      const completionTime = this.audioEndedAt !== null
        ? Math.max(0, submitTime - this.audioEndedAt)
        : 0;

      const recognitionLatency = this.recognitionLatency !== null
        ? this.recognitionLatency
        : completionTime;

      const reactionTier = ChunkAuralEngine.evaluateReactionTier(recognitionLatency, evalRes.isCorrect);

      // 预判错因
      const predictedReason = ChunkAuralEngine.predictDiagnosticReason(
        userAnswer,
        q.text,
        recognitionLatency,
        evalRes.isCorrect
      );

      const attempt = {
        id: "att-chunk-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
        moduleType: "chunk_aural",
        domain: "listening",
        chunkId: q.id,
        contentKey: q.contentKey,
        text: q.text,
        userAnswer: (userAnswer || "").trim(),
        expectedAnswer: q.text,
        correct: evalRes.isCorrect,
        replayCount: this.currentReplayCount,
        recognitionLatency,
        completionTime,
        reactionTier,
        diagnosticReason: predictedReason,
        spellingErrors: evalRes.spellingErrors,
        timestamp: ts
      };

      // 记录到本轮筛查明细
      if (this.currentStage === "screening") {
        this.screeningRecords.push({
          chunk: q,
          userAnswer: attempt.userAnswer,
          isCorrect: evalRes.isCorrect,
          recognitionLatency,
          completionTime,
          reactionTier,
          diagnosticReason: predictedReason,
          attempt
        });
      }

      // 统计聚合
      this.sessionStats.totalAnswered++;
      if (evalRes.isCorrect) this.sessionStats.totalCorrect++;
      if (reactionTier === "fluent") this.sessionStats.fluentCount++;
      else if (reactionTier === "accessible") this.sessionStats.accessibleCount++;
      else if (reactionTier === "slow") this.sessionStats.slowCount++;
      else this.sessionStats.weakCount++;

      this.sessionStats.accuracy = Math.round(
        (this.sessionStats.totalCorrect / this.sessionStats.totalAnswered) * 100
      );

      return attempt;
    }

    /**
     * 用户手动纠正/确认某题错因
     */
    setLastDiagnosticReason(reason) {
      if (this.screeningRecords.length > 0) {
        this.screeningRecords[this.screeningRecords.length - 1].diagnosticReason = reason;
      }
    }

    nextQuestion() {
      this.currentIndex++;
      this.resetQuestionTimers();
      return this.getCurrentQuestion();
    }

    /**
     * B+ 阶段 3：生成本轮 20 题诊断战报与弱项清单
     */
    generateDiagnosticSummary() {
      const records = this.screeningRecords;
      const total = records.length;

      const stable = records.filter((r) => r.isCorrect && (r.recognitionLatency <= 2000 || r.reactionTier === "fluent"));
      const slow = records.filter((r) => r.diagnosticReason === "slow_recognition" || (r.isCorrect && r.recognitionLatency > 4000));
      const soundBlind = records.filter((r) => r.diagnosticReason === "sound_not_recognised");
      const misspelled = records.filter((r) => r.diagnosticReason === "recognised_but_misspelled");
      const meaningUnknown = records.filter((r) => r.diagnosticReason === "meaning_unknown");

      // 待修复弱项：所有做错的、反应迟钝的或有标记错因的词块
      const needsRepair = records.filter((r) => !r.isCorrect || r.diagnosticReason || r.recognitionLatency > 4000);

      const summary = {
        totalScreened: total,
        stableCount: stable.length,
        slowCount: slow.length,
        soundBlindCount: soundBlind.length,
        misspelledCount: misspelled.length,
        meaningUnknownCount: meaningUnknown.length,
        needsRepairItems: needsRepair
      };

      this.lastDiagnosticSummary = summary;
      this.currentStage = "diagnostic_summary";
      return summary;
    }

    /**
     * B+ 阶段 4：启动定向修复工作台 (Repair Queue)
     */
    initRepairSession(repairItems = null) {
      const items = repairItems || this.lastDiagnosticSummary?.needsRepairItems || [];
      this.repairQueue = items.map((it) => {
        const chunk = it.chunk || it;
        const reason = it.diagnosticReason || "sound_not_recognised";
        return {
          chunk,
          diagnosticReason: reason,
          pathway: ChunkAuralEngine.determineRepairPathway(chunk, reason),
          currentStepIndex: 0,
          completed: false
        };
      });

      this.repairIndex = 0;
      this.currentStage = "repair";
      this.resetQuestionTimers();
      return this.repairQueue;
    }

    /**
     * 动态分流修复梯 (Dynamic Repair Pathway)
     */
    static determineRepairPathway(chunk, diagnosticReason) {
      if (diagnosticReason === "recognised_but_misspelled") {
        return ["spelling_repair"];
      }
      if (diagnosticReason === "slow_recognition") {
        return ["speed_challenge"];
      }
      if (diagnosticReason === "meaning_unknown") {
        return ["meaning_anchor", "l1_isolated"];
      }

      // sound_not_recognised (声音通路盲区): L1 -> L2 -> L3 (+ L4 if high/medium & verified promptZh)
      const base = ["l1_isolated", "l2_collocation", "l3_in_sentence"];
      if (chunk && chunk.productiveSuitability !== "recognition_only" && chunk.promptZh && chunk.promptZh.trim()) {
        base.push("l4_productive");
      }
      return base;
    }

    finishItemRepair(chunkId) {
      const item = this.repairQueue.find((r) => (r.chunk.id === chunkId || r.chunk.contentKey === chunkId));
      if (item) {
        item.completed = true;
      }
      return {
        chunkId,
        repairCompletedAt: Date.now(),
        mastered: false // 铁律：同会话即时修复完成绝不直接算掌握
      };
    }

    /**
     * B+ 阶段 5：延迟混排回测 (Delayed Retest)
     */
    initDelayedRetest(repairItems, distractorCount = 3) {
      const repaired = (repairItems || this.repairQueue).map((r) => r.chunk || r);
      const repairedIds = new Set(repaired.map((c) => c.id));

      // 提取干扰题 (从当前题库中抽答对或未测题)
      const distractors = this.pool.filter((c) => !repairedIds.has(c.id)).slice(0, distractorCount);

      // 混排
      const combined = [...repaired, ...distractors];
      for (let i = combined.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [combined[i], combined[j]] = [combined[j], combined[i]];
      }

      this.delayedRetestPool = combined;
      this.delayedRetestIndex = 0;
      this.currentStage = "delayed_retest";
      this.resetQuestionTimers();
      return this.delayedRetestPool;
    }

    getSessionStats() {
      return {
        ...this.sessionStats,
        currentIndex: this.currentIndex,
        totalInPool: this.pool.length,
        currentStage: this.currentStage
      };
    }
  }

  if (typeof window !== "undefined") {
    window.ChunkAuralEngine = ChunkAuralEngine;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { ChunkAuralEngine };
  }
})();
