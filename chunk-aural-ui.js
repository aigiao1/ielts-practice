// 雅思真题词块听辨交互界面控制器 (Chunk Aural UI)
// 职责：驱动 B+ 四段式认知激活流水线（Stage 1 雷达筛查 ➔ Stage 2 诊断战报 ➔ Stage 3 分流修复 ➔ Stage 4 延迟回测）
(() => {
  "use strict";

  let engine = null;
  let voices = [];

  // Stage 1 运行态变量
  let currentAudioEndTime = null;
  let currentFirstKeystrokeTime = null;
  let isAnswerSubmitted = false;
  let currentPredictedReason = null;
  let currentSelectedReason = null;

  // Stage 3 修复态变量
  let repairTimerInterval = null;

  // Stage 4 回测态变量
  let currentRetestAudioEndTime = null;
  let currentRetestFirstKeystrokeTime = null;
  let isRetestSubmitted = false;

  // DOM 容器引用
  const ui = {};

  // 场景化语料脚手架生成器 (真实语境与搭配支持)
  const ChunkScaffolds = {
    getCollocation(chunkText, section = "") {
      const text = (chunkText || "").trim();
      const norm = text.toLowerCase();

      // 若索引器中有包含此词构件的其它更长真题词块，优先选用
      if (window.WordChunkIndexer) {
        const tokens = norm.split(" ");
        for (const t of tokens) {
          if (t.length > 3) {
            const matches = window.WordChunkIndexer.getChunksForWord(t);
            const longer = matches.find((m) => m.text.toLowerCase().length > norm.length && m.text.toLowerCase().includes(norm));
            if (longer) return longer.text;
          }
        }
      }

      // 规则化搭配模板
      if (/^(a|an|the)\s+/i.test(text)) {
        return `essential ${text}`;
      }
      if (/ing\b/i.test(text.split(" ")[0])) {
        return `focus on ${text}`;
      }
      if (norm.includes("problem") || norm.includes("issue") || norm.includes("crisis")) {
        return `deal with ${text}`;
      }
      if (norm.includes("cost") || norm.includes("fee") || norm.includes("expense") || norm.includes("price")) {
        return `rising ${text}`;
      }
      if (norm.includes("traffic") || norm.includes("transport") || norm.includes("car")) {
        return `heavy ${text}`;
      }
      if (norm.includes("environment") || norm.includes("climate") || norm.includes("energy")) {
        return `sustainable ${text}`;
      }
      return `significant ${text}`;
    },

    getSentenceCloze(chunk) {
      if (chunk.contextSentence && chunk.contextSentence.trim()) {
        const full = chunk.contextSentence;
        const reg = new RegExp(escapeRegExp(chunk.text), "i");
        return {
          fullSentence: full,
          clozeSentence: full.replace(reg, "____")
        };
      }

      const text = chunk.text;
      const ref = (chunk.sourceRef || "").toLowerCase();

      let template = "The speaker mentioned that {blank} is essential for university students.";
      if (ref.includes("5.2")) {
        template = "Students are required to consider {blank} before submitting their final project.";
      } else if (ref.includes("5.3")) {
        template = "The management team decided to improve {blank} in order to boost efficiency.";
      } else if (ref.includes("5.4")) {
        template = "Many local residents expressed strong concern about {blank} in their neighborhood.";
      } else if (ref.includes("5.5")) {
        template = "Environmental researchers emphasize that {blank} has caused widespread impact.";
      } else if (ref.includes("5.6")) {
        template = "Health experts advise patients that {blank} plays an indispensable role.";
      } else if (ref.includes("5.7")) {
        template = "Travelers should check all relevant guidelines regarding {blank} before arrival.";
      } else if (ref.includes("5.8")) {
        template = "Recent technological breakthroughs have greatly enhanced {blank} in this sector.";
      } else if (ref.includes("5.9")) {
        template = "The scientific report documented how {blank} survives under severe weather.";
      } else if (ref.includes("5.10")) {
        template = "The city gallery held a special exhibition celebrating {blank} this season.";
      } else if (ref.includes("5.11")) {
        template = "The local council enacted stricter laws to regulate {blank} effectively.";
      } else if (ref.includes("11.")) {
        template = "According to the listening section, {blank} was identified as the main factor.";
      }

      return {
        fullSentence: template.replace("{blank}", text),
        clozeSentence: template.replace("{blank}", "____")
      };
    }
  };

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function initUi() {
    ui.module = document.getElementById("chunkModule");
    if (!ui.module) return;

    // 四大容器
    ui.screeningContainer = document.getElementById("chunkScreeningContainer");
    ui.reportContainer = document.getElementById("chunkReportContainer");
    ui.repairContainer = document.getElementById("chunkRepairContainer");
    ui.retestContainer = document.getElementById("chunkRetestContainer");

    // 顶部统计
    ui.todayCount = document.getElementById("chunkTodayCount");
    ui.accuracy = document.getElementById("chunkAccuracy");
    ui.fluentCount = document.getElementById("chunkFluentCount");
    ui.testedCount = document.getElementById("chunkTestedCount");

    // 筛选控件
    ui.scopeSelect = document.getElementById("chunkScopeSelect");
    ui.sectionSelect = document.getElementById("chunkSectionSelect");
    ui.batchSizeSelect = document.getElementById("chunkBatchSizeSelect");
    ui.rateSelect = document.getElementById("chunkRateSelect");
    ui.autoPlay = document.getElementById("chunkAutoPlayInput");
    ui.startBtn = document.getElementById("chunkStartBtn");

    // Stage 1 卡片元信息与答题
    ui.metaScope = document.getElementById("chunkMetaScope");
    ui.metaProgress = document.getElementById("chunkMetaProgress");
    ui.metaReplay = document.getElementById("chunkMetaReplay");
    ui.listenBtn = document.getElementById("chunkListenBtn");
    ui.listenTip = document.getElementById("chunkListenTip");
    ui.input = document.getElementById("chunkInput");
    ui.submitBtn = document.getElementById("chunkSubmitBtn");
    ui.feedback = document.getElementById("chunkFeedback");
    ui.resultBox = document.getElementById("chunkResultBox");

    // Stage 2 战报按钮
    ui.startRepairQueueBtn = document.getElementById("startRepairQueueBtn");
    ui.rescreenBtn = document.getElementById("rescreenBtn");

    // Stage 3 & 4 动态挂载点
    ui.repairContent = document.getElementById("repairWorkbenchContent");
    ui.retestContent = document.getElementById("retestWorkbenchContent");

    bindEvents();
    loadVoices();
    initEngineAndStart();
  }

  function loadVoices() {
    if (!("speechSynthesis" in window)) return;
    voices = speechSynthesis.getVoices().filter((v) => /^en/i.test(v.lang));
    speechSynthesis.onvoiceschanged = () => {
      voices = speechSynthesis.getVoices().filter((v) => /^en/i.test(v.lang));
    };
  }

  function initEngineAndStart() {
    const packs = [];
    if (window.CONTENT_REGISTRY) {
      const p5 = window.CONTENT_REGISTRY.getPack("wanglu-chunks-v1");
      const p11 = window.CONTENT_REGISTRY.getPack("wanglu-advanced-chunks-v1");
      if (p5) packs.push(p5);
      if (p11) packs.push(p11);
    }

    if (packs.length === 0) {
      if (window.WANGLU_CHUNKS_PACK_V1) packs.push(window.WANGLU_CHUNKS_PACK_V1);
      if (window.WANGLU_ADVANCED_CHUNKS_PACK_V1) packs.push(window.WANGLU_ADVANCED_CHUNKS_PACK_V1);
    }

    engine = new window.ChunkAuralEngine({
      packs,
      schemas: window.ContentSchemas
    });

    startScreeningSession();
  }

  // =========================================================================
  // 阶段 1：雷达连续筛查 (Stage 1: Screening)
  // =========================================================================

  function startScreeningSession() {
    if (!engine) return;

    const scope = ui.scopeSelect?.value || "wanglu_ch5";
    const section = ui.sectionSelect?.value || "all";
    const batchSize = parseInt(ui.batchSizeSelect?.value, 10) || 20;

    engine.initScreeningSession({
      packScope: scope,
      sectionFilter: section,
      shuffle: true,
      batchSize
    });

    // 视图切换
    if (ui.screeningContainer) ui.screeningContainer.hidden = false;
    if (ui.reportContainer) ui.reportContainer.hidden = true;
    if (ui.repairContainer) ui.repairContainer.hidden = true;
    if (ui.retestContainer) ui.retestContainer.hidden = true;

    loadTodayStats();
    loadScreeningQuestion(engine.getCurrentQuestion());
  }

  function loadScreeningQuestion(q) {
    if (!q) {
      // 20 题筛查全部完成 ➔ 平滑切入 Stage 2 诊断战报
      showDiagnosticReport();
      return;
    }

    isAnswerSubmitted = false;
    currentAudioEndTime = null;
    currentFirstKeystrokeTime = null;
    currentPredictedReason = null;
    currentSelectedReason = null;

    if (ui.metaScope) ui.metaScope.textContent = q.sourceRef || "王陆真题词块";
    if (ui.metaProgress) {
      const stats = engine.getSessionStats();
      ui.metaProgress.textContent = `第 ${stats.currentIndex + 1} / ${stats.totalInPool} 题 (雷达扫描)`;
    }
    if (ui.metaReplay) ui.metaReplay.textContent = `🔊 播放: 0 次`;

    if (ui.input) {
      ui.input.value = "";
      ui.input.className = "";
      ui.input.disabled = false;
      ui.input.placeholder = "听音输入词块 (按 Enter 提交)...";
      ui.input.focus();
    }
    if (ui.submitBtn) {
      ui.submitBtn.textContent = "提交 (Enter)";
      ui.submitBtn.className = "primary";
    }

    if (ui.feedback) ui.feedback.hidden = true;
    if (ui.resultBox) ui.resultBox.innerHTML = "";

    if (ui.autoPlay && ui.autoPlay.checked) {
      setTimeout(() => playScreeningAudio(false), 200);
    }
  }

  function playScreeningAudio(isReplay = false) {
    const q = engine?.getCurrentQuestion();
    if (!q || !("speechSynthesis" in window)) return;

    speechSynthesis.cancel();

    if (isReplay) {
      engine.recordReplay();
      if (ui.metaReplay) {
        ui.metaReplay.textContent = `🔊 播放: ${engine.currentReplayCount} 次`;
      }
    }

    const utter = new SpeechSynthesisUtterance(q.text);
    const ukVoice = voices.find((v) => /en-GB|British/i.test(v.lang)) || voices[0];
    if (ukVoice) utter.voice = ukVoice;

    const customRate = ui.rateSelect ? parseFloat(ui.rateSelect.value) : 0.9;
    utter.rate = customRate || 0.9;

    ui.listenBtn?.classList.add("speaking");
    if (ui.listenTip) ui.listenTip.textContent = "正在朗读中... 请专注辨音";

    const onAudioComplete = () => {
      ui.listenBtn?.classList.remove("speaking");
      if (ui.listenTip) ui.listenTip.textContent = "音频播放完毕 · 计时开始！请即刻输入";
      currentAudioEndTime = Date.now();
      engine.markAudioEnded(currentAudioEndTime);
    };

    utter.onend = onAudioComplete;
    utter.onerror = onAudioComplete;

    engine.markAudioStarted(Date.now());
    speechSynthesis.speak(utter);
  }

  async function handleScreeningSubmit() {
    if (!engine) return;

    if (isAnswerSubmitted) {
      // 已提交状态，再次按 Enter 推进下一题
      const nextQ = engine.nextQuestion();
      loadScreeningQuestion(nextQ);
      return;
    }

    const q = engine.getCurrentQuestion();
    if (!q) return;

    const userVal = ui.input?.value || "";
    const submitTime = Date.now();
    const attempt = engine.submitAnswer(userVal, submitTime);

    isAnswerSubmitted = true;
    currentPredictedReason = attempt.diagnosticReason;
    currentSelectedReason = attempt.diagnosticReason;

    renderScreeningFeedback(attempt, q);

    if (window.IELTS_DB) {
      try {
        await window.IELTS_DB.saveAttempt(attempt);
      } catch (e) {
        console.warn("IndexedDB save chunk attempt failed:", e);
      }
    }

    loadTodayStats();
    window.dispatchEvent(new CustomEvent("chunk-attempt-recorded", { detail: attempt }));
  }

  function selectDiagnosticReason(reason) {
    currentSelectedReason = reason;
    engine?.setLastDiagnosticReason(reason);

    const chips = ui.resultBox?.querySelectorAll(".reason-chip");
    if (chips) {
      chips.forEach((chip) => {
        const match = chip.dataset.reason === reason;
        chip.classList.toggle("active", match);
      });
    }
  }

  function renderScreeningFeedback(attempt, q) {
    if (!ui.feedback || !ui.resultBox) return;

    ui.feedback.hidden = false;
    ui.feedback.className = `feedback ${attempt.correct ? "correct" : "wrong"}`;

    if (ui.input) {
      ui.input.classList.add(attempt.correct ? "input-correct" : "input-wrong");
    }

    if (ui.submitBtn) {
      ui.submitBtn.textContent = "下一题 👉 (Enter)";
      ui.submitBtn.className = "primary";
    }

    let tierClass = "wrong-badge";
    let tierText = "❌ 答错/未调出 (weak)";
    if (attempt.correct) {
      if (attempt.reactionTier === "fluent") {
        tierClass = "ok-badge";
        tierText = `⚡ 极速直觉: ${attempt.recognitionLatency}ms (fluent ≤2s)`;
      } else if (attempt.reactionTier === "accessible") {
        tierClass = "badge";
        tierText = `⏱️ 稍有延迟: ${attempt.recognitionLatency}ms (accessible 2–4s)`;
      } else if (attempt.reactionTier === "slow") {
        tierClass = "wrong-badge";
        tierText = `🐢 反应较慢: ${attempt.recognitionLatency}ms (slow 4–8s)`;
      } else {
        tierClass = "wrong-badge";
        tierText = `⚠️ 严重超时: ${attempt.recognitionLatency}ms (>8s)`;
      }
    }

    let chineseHtml = "";
    if (q.meaningZh && q.meaningZh.trim()) {
      chineseHtml = `<span class="word-meaning">${escapeHtml(q.meaningZh)}</span>`;
    } else {
      chineseHtml = `<span class="chunk-unreviewed-note">（暂无人工审核中文释义 · 纯声音听辨）</span>`;
    }

    const comps = q.components || [];
    const compPills = comps.map((c) => {
      return `<button type="button" class="chunk-comp-pill" data-chunk-comp="${escapeHtml(c)}" title="查看构件词关联真题">#${escapeHtml(c)}</button>`;
    }).join(" ");

    let diffHtml = "";
    if (!attempt.correct) {
      diffHtml = `
        <div style="margin: 8px 0; padding: 8px 12px; background: #fff5f5; border-radius: 8px; border: 1px solid #fed7d7; font-size: 13px;">
          <span style="color: var(--red); font-weight: 700;">你的输入：</span>
          <span style="font-family: ui-monospace, monospace;">${escapeHtml(attempt.userAnswer || "(空)")}</span>
          ${attempt.spellingErrors && attempt.spellingErrors.length ? `<span style="color: var(--muted); margin-left: 8px;">差异: ${escapeHtml(attempt.spellingErrors.join(" "))}</span>` : ""}
        </div>
      `;
    }

    // 错因分流轻量选择面板 (做错或反应偏慢时展示)
    let reasonSelectorHtml = "";
    const needsReason = !attempt.correct || attempt.recognitionLatency > 4000;
    if (needsReason) {
      const activeReason = currentSelectedReason || "sound_not_recognised";
      reasonSelectorHtml = `
        <div class="diagnostic-reasons-panel">
          <div class="diagnostic-reasons-header">
            <span>🎯 快速核定错因 (直接按 <kbd>1</kbd>/<kbd>2</kbd>/<kbd>3</kbd>/<kbd>4</kbd> 切换，按 <kbd>Enter</kbd> 默认确认)：</span>
            <span style="font-size: 11px; color: var(--muted);">不中断扫描节奏</span>
          </div>
          <div class="reason-chips-grid">
            <div class="reason-chip reason-sound_not_recognised ${activeReason === "sound_not_recognised" ? "active" : ""}" data-reason="sound_not_recognised">
              <span><kbd>1</kbd> 🎧 听不出声音</span>
              ${attempt.diagnosticReason === "sound_not_recognised" ? '<span class="reason-rec-badge">推荐</span>' : ""}
            </div>
            <div class="reason-chip reason-recognised_but_misspelled ${activeReason === "recognised_but_misspelled" ? "active" : ""}" data-reason="recognised_but_misspelled">
              <span><kbd>2</kbd> ✍️ 听懂但拼错</span>
              ${attempt.diagnosticReason === "recognised_but_misspelled" ? '<span class="reason-rec-badge">推荐</span>' : ""}
            </div>
            <div class="reason-chip reason-slow_recognition ${activeReason === "slow_recognition" ? "active" : ""}" data-reason="slow_recognition">
              <span><kbd>3</kbd> ⏱️ 反应偏慢</span>
              ${attempt.diagnosticReason === "slow_recognition" ? '<span class="reason-rec-badge">推荐</span>' : ""}
            </div>
            <div class="reason-chip reason-meaning_unknown ${activeReason === "meaning_unknown" ? "active" : ""}" data-reason="meaning_unknown">
              <span><kbd>4</kbd> ❓ 词义不认识</span>
              ${attempt.diagnosticReason === "meaning_unknown" ? '<span class="reason-rec-badge">推荐</span>' : ""}
            </div>
          </div>
        </div>
      `;
    }

    ui.resultBox.innerHTML = `
      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 18px;">${attempt.correct ? "✅" : "❌"}</span>
          <strong style="font-size: 15px; color: ${attempt.correct ? "var(--green)" : "var(--red)"};">
            ${attempt.correct ? "辨音完全正确！" : "辨音或拼写存在差异"}
          </strong>
        </div>
        <span class="badge ${tierClass}">${tierText}</span>
      </div>

      <div style="display: flex; align-items: baseline; flex-wrap: wrap; gap: 12px; margin: 10px 0;">
        <span class="correct-word" style="font-size: 26px; font-weight: 800; color: var(--ink);">
          ${escapeHtml(q.text)}
        </span>
        <button type="button" class="icon-button" id="chunkReplayInCard" style="width:32px;height:32px;font-size:15px;" title="重听本词块发音">🔊</button>
        ${chineseHtml}
      </div>

      ${diffHtml}
      ${reasonSelectorHtml}

      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; margin-top: 12px; padding-top: 10px; border-top: 1px dashed var(--line); font-size: 12px; color: var(--muted);">
        <div>
          <span>构件拆解: </span>${compPills || "无"}
        </div>
        <div>
          <span>重播: <b>${attempt.replayCount}</b> 次</span> · 
          <span>识别延迟: <b>${attempt.recognitionLatency}ms</b></span>
        </div>
      </div>
    `;

    document.getElementById("chunkReplayInCard")?.addEventListener("click", () => playScreeningAudio(true));

    // 绑定错因选择事件
    ui.resultBox.querySelectorAll(".reason-chip").forEach((chip) => {
      chip.addEventListener("click", (e) => {
        const r = e.currentTarget.dataset.reason;
        selectDiagnosticReason(r);
      });
    });

    // 绑定构件弹窗
    ui.resultBox.querySelectorAll("[data-chunk-comp]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const compWord = e.currentTarget.dataset.chunkComp;
        if (window.WordChunkIndexer) {
          const related = window.WordChunkIndexer.getChunksForWord(compWord);
          alert(`构件词 [${compWord}] 关联了 ${related.length} 条真题词块：\n\n` +
            related.slice(0, 8).map((c, i) => `${i + 1}. ${c.text} (${c.sourceRef})`).join("\n") +
            (related.length > 8 ? `\n... 等共 ${related.length} 条` : "")
          );
        }
      });
    });
  }

  // =========================================================================
  // 阶段 2：弱项诊断战报 (Stage 2: Diagnostic Report)
  // =========================================================================

  function showDiagnosticReport() {
    if (!engine) return;

    if (ui.screeningContainer) ui.screeningContainer.hidden = true;
    if (ui.reportContainer) ui.reportContainer.hidden = false;
    if (ui.repairContainer) ui.repairContainer.hidden = true;
    if (ui.retestContainer) ui.retestContainer.hidden = true;

    const summary = engine.generateDiagnosticSummary();

    const stableEl = document.getElementById("repStableCount");
    const slowEl = document.getElementById("repSlowCount");
    const blindEl = document.getElementById("repBlindCount");
    const misspellEl = document.getElementById("repMisspellCount");
    const needsEl = document.getElementById("repNeedsCount");
    const accBadge = document.getElementById("reportAccuracyBadge");
    const listEl = document.getElementById("repWeakList");

    if (stableEl) stableEl.textContent = String(summary.stableCount);
    if (slowEl) slowEl.textContent = String(summary.slowCount);
    if (blindEl) blindEl.textContent = String(summary.soundBlindCount);
    if (misspellEl) misspellEl.textContent = String(summary.misspelledCount);
    if (needsEl) needsEl.textContent = String(summary.needsRepairItems.length);

    const acc = summary.totalScreened > 0 ? Math.round((summary.stableCount / summary.totalScreened) * 100) : 0;
    if (accBadge) {
      accBadge.textContent = `${acc}% 极速直觉率`;
      accBadge.className = `badge ${acc >= 75 ? "ok-badge" : "wrong-badge"}`;
    }

    if (!listEl) return;
    listEl.innerHTML = "";

    if (summary.needsRepairItems.length === 0) {
      listEl.innerHTML = `
        <div style="text-align: center; padding: 24px; background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 12px; color: #15803d;">
          <div style="font-size: 32px; margin-bottom: 8px;">🎉</div>
          <h3 style="margin: 0 0 6px;">太棒了！本轮 ${summary.totalScreened} 题全部形成稳定直觉听辨！</h3>
          <p style="margin: 0; font-size: 13px;">无听觉盲区，亦无拼写阻滞。建议直接开启下一批雷达扫描。</p>
        </div>
      `;
      if (ui.startRepairQueueBtn) ui.startRepairQueueBtn.hidden = true;
      return;
    }

    if (ui.startRepairQueueBtn) {
      ui.startRepairQueueBtn.hidden = false;
      ui.startRepairQueueBtn.textContent = `👉 开始本轮弱项分流修复 (${summary.needsRepairItems.length} 个词块)`;
    }

    summary.needsRepairItems.forEach((item, idx) => {
      const c = item.chunk;
      const reason = item.diagnosticReason || "sound_not_recognised";

      let reasonBadge = "";
      let pathwayText = "";
      if (reason === "recognised_but_misspelled") {
        reasonBadge = `<span class="badge" style="background:#fffaf0;color:#c05621;border:1px solid #fbd38d;">✍️ 拼写错误</span>`;
        pathwayText = `仅攻坚音形拼写差异 (不磨耳朵)`;
      } else if (reason === "slow_recognition") {
        reasonBadge = `<span class="badge" style="background:#fffff0;color:#975a16;border:1px solid #faf089;">⏱️ 反应偏慢</span>`;
        pathwayText = `2秒极速冲刺挑战`;
      } else if (reason === "meaning_unknown") {
        reasonBadge = `<span class="badge" style="background:#faf5ff;color:#6b46c1;border:1px solid #d6bcfa;">❓ 词义盲区</span>`;
        pathwayText = `概念意义锚定 ➔ 单块重音`;
      } else {
        reasonBadge = `<span class="badge" style="background:#ebf8ff;color:#2b6cb0;border:1px solid #bee3f8;">🎧 声音盲区</span>`;
        pathwayText = `L1单块重音 ➔ L2搭配 ➔ L3句中语流`;
        if (c.productiveSuitability !== "recognition_only" && c.promptZh) {
          pathwayText += ` ➔ L4中文直觉`;
        }
      }

      const card = document.createElement("div");
      card.className = "weak-chunk-card";
      card.innerHTML = `
        <div>
          <div class="weak-chunk-title">
            <span>${idx + 1}. ${escapeHtml(c.text)}</span>
            <small style="font-size: 11px; color: var(--muted); font-weight: 500;">(${escapeHtml(c.sourceRef || "真题")})</small>
            ${reasonBadge}
          </div>
          <div style="font-size: 12px; color: var(--muted); margin-top: 4px;">
            ${item.userAnswer ? `<span>作答: <code style="color:var(--red);">${escapeHtml(item.userAnswer)}</code></span> · ` : ""}
            <span>修复路径: <span class="pathway-pill">${pathwayText}</span></span>
          </div>
        </div>
        <div style="font-size: 12px; font-weight: 700; color: #78716c;">
          ${item.recognitionLatency ? `耗时: ${(item.recognitionLatency / 1000).toFixed(1)}s` : ""}
        </div>
      `;
      listEl.appendChild(card);
    });
  }

  // =========================================================================
  // 阶段 3：定向分流修复工作台 (Stage 3: Scaffolded Repair)
  // =========================================================================

  function startRepairWorkbench() {
    if (!engine) return;

    if (ui.screeningContainer) ui.screeningContainer.hidden = true;
    if (ui.reportContainer) ui.reportContainer.hidden = true;
    if (ui.repairContainer) ui.repairContainer.hidden = false;
    if (ui.retestContainer) ui.retestContainer.hidden = true;

    engine.initRepairSession();
    renderRepairStep();
  }

  function renderRepairStep() {
    if (!engine || !ui.repairContent) return;

    if (repairTimerInterval) {
      clearInterval(repairTimerInterval);
      repairTimerInterval = null;
    }

    if (engine.repairIndex >= engine.repairQueue.length) {
      // 本轮全部弱项修复完成 ➔ 进入 Stage 4 延迟混排回测
      startDelayedRetest();
      return;
    }

    const queueItem = engine.repairQueue[engine.repairIndex];
    const chunk = queueItem.chunk;
    const pathway = queueItem.pathway;
    const stepIdx = queueItem.currentStepIndex || 0;
    const stepType = pathway[stepIdx];

    const stepLabels = {
      spelling_repair: "音形差异击破",
      speed_challenge: "2秒极速直觉",
      meaning_anchor: "语义概念锚定",
      l1_isolated: "单块重音重塑",
      l2_collocation: "高频搭配拓展",
      l3_in_sentence: "句中语流抓取",
      l4_productive: "中文直觉调出"
    };

    // 步进导航条
    const stepperHtml = pathway.map((s, idx) => {
      let cls = "";
      let prefix = `${idx + 1}. `;
      if (idx < stepIdx) {
        cls = "completed";
        prefix = "✓ ";
      } else if (idx === stepIdx) {
        cls = "active";
        prefix = "▶ ";
      }
      return `<span class="repair-step-badge ${cls}">${prefix}${stepLabels[s] || s}</span>`;
    }).join(" ");

    // 各步骤专属工坊内容
    let stepContentHtml = "";
    if (stepType === "spelling_repair") {
      stepContentHtml = renderStepSpellingRepair(chunk, queueItem);
    } else if (stepType === "speed_challenge") {
      stepContentHtml = renderStepSpeedChallenge(chunk);
    } else if (stepType === "meaning_anchor") {
      stepContentHtml = renderStepMeaningAnchor(chunk);
    } else if (stepType === "l1_isolated") {
      stepContentHtml = renderStepL1Isolated(chunk);
    } else if (stepType === "l2_collocation") {
      stepContentHtml = renderStepL2Collocation(chunk);
    } else if (stepType === "l3_in_sentence") {
      stepContentHtml = renderStepL3InSentence(chunk);
    } else if (stepType === "l4_productive") {
      stepContentHtml = renderStepL4Productive(chunk);
    }

    ui.repairContent.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;">
        <span class="badge" style="font-size: 13px; font-weight: 800; padding: 6px 12px; background: #e0f2fe; color: #0369a1;">
          🛠️ 弱项修复 ${engine.repairIndex + 1} / ${engine.repairQueue.length}
        </span>
        <span style="font-size: 12px; color: var(--muted);">
          错因标记: <b>${escapeHtml(queueItem.diagnosticReason)}</b> · 铁律：即时修复完成不标记掌握，需过延迟回测
        </span>
      </div>

      <div class="repair-stepper">${stepperHtml}</div>

      <div class="repair-workbench-card">
        ${stepContentHtml}
      </div>
    `;

    bindRepairStepEvents(stepType, chunk, queueItem);
  }

  function renderStepSpellingRepair(chunk, queueItem) {
    return `
      <h3 style="margin: 0 0 8px; font-size: 18px; color: #c05621;">✍️ 音形差异击破：攻坚拼写盲点</h3>
      <p style="margin: 0 0 16px; font-size: 13px; color: var(--muted);">
        你其实已经听出了这个发音，只是键盘拼写存在音形盲点。精准比对字母差异后盲打输入。
      </p>

      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
        <span style="font-size: 26px; font-weight: 800; color: var(--ink); font-family: ui-monospace, monospace;">
          ${escapeHtml(chunk.text)}
        </span>
        <button type="button" class="icon-button" id="repairAudioBtn" title="播放标准发音">🔊</button>
      </div>

      <form id="repairForm" autocomplete="off">
        <label class="answer-label" for="repairInput">遮挡并由肌肉记忆亲手盲打正确拼写：</label>
        <div class="answer-row">
          <input type="text" id="repairInput" placeholder="输入完整拼写验证..." autofocus>
          <button type="submit" class="primary">验证 (Enter)</button>
        </div>
        <div id="repairFeedback" class="feedback" hidden style="margin-top: 10px;"></div>
      </form>
    `;
  }

  function renderStepSpeedChallenge(chunk) {
    return `
      <h3 style="margin: 0 0 8px; font-size: 18px; color: #975a16;">⚡ 2秒极速直觉冲刺</h3>
      <p style="margin: 0 0 14px; font-size: 13px; color: var(--muted);">
        听音后请于 2.5 秒倒计时内立刻敲击键盘，建立不经中文转译的声音直觉。
      </p>

      <div style="margin-bottom: 12px;">
        <button type="button" class="primary compact" id="repairAudioBtn" style="font-size: 13px; padding: 8px 18px;">
          🔊 播放发音并开启倒计时
        </button>
      </div>

      <div class="speed-progress-bar">
        <div id="speedProgressFill" class="speed-progress-fill"></div>
      </div>

      <form id="repairForm" autocomplete="off" style="margin-top: 14px;">
        <label class="answer-label" for="repairInput">极速输入词块：</label>
        <div class="answer-row">
          <input type="text" id="repairInput" placeholder="倒计时结束前输入并按 Enter..." autofocus>
          <button type="submit" class="primary">确认 (Enter)</button>
        </div>
        <div id="repairFeedback" class="feedback" hidden style="margin-top: 10px;"></div>
      </form>
    `;
  }

  function renderStepMeaningAnchor(chunk) {
    const comps = (chunk.components || []).map((c) => `#${c}`).join(" ");
    return `
      <h3 style="margin: 0 0 8px; font-size: 18px; color: #6b46c1;">💡 语义概念锚定</h3>
      <p style="margin: 0 0 16px; font-size: 13px; color: var(--muted);">
        建立扎实的词块意义表征，理清构件组合逻辑。
      </p>

      <div style="background: #faf5ff; border: 1.5px solid #d6bcfa; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
        <div style="font-size: 24px; font-weight: 800; color: #553c9a; margin-bottom: 6px;">
          ${escapeHtml(chunk.text)}
        </div>
        <div style="font-size: 14px; color: #6b46c1; margin-bottom: 10px;">
          ${chunk.meaningZh ? `<b>释义：</b>${escapeHtml(chunk.meaningZh)}` : "（真题核心词块 · 请专注构件词与场景关联）"}
        </div>
        <div style="font-size: 12px; color: #7e22ce;">
          构件词汇：<b>${escapeHtml(comps || "无")}</b>
        </div>
      </div>

      <button type="button" id="repairMeaningConfirmBtn" class="primary" style="padding: 10px 24px;">
        👉 我已理解概念，进入声音重音重塑 (Enter)
      </button>
    `;
  }

  function renderStepL1Isolated(chunk) {
    const comps = (chunk.components || []).join(" · ");
    return `
      <h3 style="margin: 0 0 8px; font-size: 18px; color: #2b6cb0;">🎧 第一阶：单块重音与节拍重塑</h3>
      <p style="margin: 0 0 16px; font-size: 13px; color: var(--muted);">
        专注入耳节拍与轻重音划分，先听 0.8x 慢速再听原速，将发音刻入听觉记忆。
      </p>

      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
        <button type="button" class="secondary compact" id="repairSlowAudioBtn">0.8× 慢速辨音</button>
        <button type="button" class="primary compact" id="repairAudioBtn">1.0× 标准重播</button>
        <span style="font-size: 13px; color: var(--muted); margin-left: 6px;">节拍：<b>${escapeHtml(comps)}</b></span>
      </div>

      <form id="repairForm" autocomplete="off">
        <label class="answer-label" for="repairInput">听音输入单块：</label>
        <div class="answer-row">
          <input type="text" id="repairInput" placeholder="听音输入词块..." autofocus>
          <button type="submit" class="primary">验证 (Enter)</button>
        </div>
        <div id="repairFeedback" class="feedback" hidden style="margin-top: 10px;"></div>
      </form>
    `;
  }

  function renderStepL2Collocation(chunk) {
    const phrase = ChunkScaffolds.getCollocation(chunk.text, chunk.sourceRef);
    return `
      <h3 style="margin: 0 0 8px; font-size: 18px; color: #0d9488;">🔗 第二阶：高频搭配语块拓展</h3>
      <p style="margin: 0 0 16px; font-size: 13px; color: var(--muted);">
        听力真题中绝少孤立出现词块。在真实搭配语块中捕捉核心词块。
      </p>

      <div style="background: #f0fdfa; border: 1px solid #99f6e4; border-radius: 10px; padding: 14px 18px; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span style="font-size: 18px; font-weight: 700; color: #115e59;">
            搭配：${escapeHtml(phrase)}
          </span>
          <button type="button" class="icon-button" id="repairAudioBtn" title="朗读搭配">🔊</button>
        </div>
      </div>

      <form id="repairForm" autocomplete="off">
        <label class="answer-label" for="repairInput">输入所听到的核心词块：</label>
        <div class="answer-row">
          <input type="text" id="repairInput" placeholder="输入核心词块..." autofocus>
          <button type="submit" class="primary">验证 (Enter)</button>
        </div>
        <div id="repairFeedback" class="feedback" hidden style="margin-top: 10px;"></div>
      </form>
    `;
  }

  function renderStepL3InSentence(chunk) {
    const clozeInfo = ChunkScaffolds.getSentenceCloze(chunk);
    return `
      <h3 style="margin: 0 0 8px; font-size: 18px; color: #4338ca;">📝 第三阶：句中语流抓取</h3>
      <p style="margin: 0 0 16px; font-size: 13px; color: var(--muted);">
        置于真题典型句子语流中，克服弱读、连读干扰，精准抠出目标词块。
      </p>

      <div class="cloze-sentence-box">
        <div style="margin-bottom: 10px;">
          ${escapeHtml(clozeInfo.clozeSentence).replace("____", '<span class="cloze-blank-highlight">[ ______ 词块挖空 ______ ]</span>')}
        </div>
        <button type="button" class="primary compact" id="repairAudioBtn" style="font-size: 13px; padding: 6px 14px;">
          🔊 播放整句语流发音
        </button>
      </div>

      <form id="repairForm" autocomplete="off">
        <label class="answer-label" for="repairInput">输入挖空处的词块：</label>
        <div class="answer-row">
          <input type="text" id="repairInput" placeholder="填入句中挖空的词块..." autofocus>
          <button type="submit" class="primary">验证 (Enter)</button>
        </div>
        <div id="repairFeedback" class="feedback" hidden style="margin-top: 10px;"></div>
      </form>
    `;
  }

  function renderStepL4Productive(chunk) {
    const prompt = chunk.promptZh || chunk.meaningZh || "英文表达转换";
    return `
      <h3 style="margin: 0 0 8px; font-size: 18px; color: #b45309;">🗣️ 第四阶：中文意图秒调出 (主动产出)</h3>
      <p style="margin: 0 0 16px; font-size: 13px; color: var(--muted);">
        解决写作与口语卡壳：看到中文意图，2秒内调出整条英文词块，不单字硬翻。
      </p>

      <div style="background: #fffbeb; border: 1.5px solid #fde68a; border-radius: 12px; padding: 18px; margin-bottom: 18px;">
        <div style="font-size: 13px; color: #92400e; font-weight: 700; margin-bottom: 4px;">中文意图：</div>
        <div style="font-size: 22px; font-weight: 800; color: #78350f;">
          "${escapeHtml(prompt)}"
        </div>
      </div>

      <form id="repairForm" autocomplete="off">
        <label class="answer-label" for="repairInput">输入对应的英文地道词块：</label>
        <div class="answer-row">
          <input type="text" id="repairInput" placeholder="输入英文词块..." autofocus>
          <button type="submit" class="primary">验证 (Enter)</button>
        </div>
        <div id="repairFeedback" class="feedback" hidden style="margin-top: 10px;"></div>
      </form>
    `;
  }

  function bindRepairStepEvents(stepType, chunk, queueItem) {
    const audioBtn = document.getElementById("repairAudioBtn");
    const slowAudioBtn = document.getElementById("repairSlowAudioBtn");
    const form = document.getElementById("repairForm");
    const input = document.getElementById("repairInput");
    const feedback = document.getElementById("repairFeedback");
    const meaningBtn = document.getElementById("repairMeaningConfirmBtn");

    const playText = (textToPlay, rate = 0.9) => {
      if (!("speechSynthesis" in window)) return;
      speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(textToPlay);
      const ukVoice = voices.find((v) => /en-GB|British/i.test(v.lang)) || voices[0];
      if (ukVoice) utter.voice = ukVoice;
      utter.rate = rate;
      speechSynthesis.speak(utter);
      return utter;
    };

    if (audioBtn) {
      audioBtn.addEventListener("click", () => {
        if (stepType === "l2_collocation") {
          const phrase = ChunkScaffolds.getCollocation(chunk.text, chunk.sourceRef);
          playText(phrase, 0.9);
        } else if (stepType === "l3_in_sentence") {
          const cloze = ChunkScaffolds.getSentenceCloze(chunk);
          playText(cloze.fullSentence, 0.9);
        } else if (stepType === "speed_challenge") {
          const utter = playText(chunk.text, 0.95);
          if (utter) {
            utter.onend = () => {
              startSpeedCountdown();
            };
          } else {
            startSpeedCountdown();
          }
        } else {
          playText(chunk.text, 0.9);
        }
      });
    }

    if (slowAudioBtn) {
      slowAudioBtn.addEventListener("click", () => playText(chunk.text, 0.75));
    }

    if (meaningBtn) {
      meaningBtn.addEventListener("click", () => advanceRepairStep(queueItem));
    }

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const val = input?.value || "";
        const evalRes = window.ChunkAuralEngine.evaluateAnswer(val, chunk.text);

        if (evalRes.isCorrect) {
          if (feedback) {
            feedback.hidden = false;
            feedback.className = "feedback correct";
            feedback.innerHTML = `<strong>✅ 击破成功！</strong> 正在进入下一步骤...`;
          }
          if (input) input.disabled = true;
          setTimeout(() => advanceRepairStep(queueItem), 650);
        } else {
          if (feedback) {
            feedback.hidden = false;
            feedback.className = "feedback wrong";
            feedback.innerHTML = `
              <span>❌ 仍有差异：正确为 <b>${escapeHtml(chunk.text)}</b></span>
              ${evalRes.spellingErrors && evalRes.spellingErrors.length ? `<small style="margin-left:8px;">(${escapeHtml(evalRes.spellingErrors.join(" "))})</small>` : ""}
            `;
          }
          if (input) {
            input.focus();
            input.select();
          }
        }
      });
    }

    function startSpeedCountdown() {
      const fill = document.getElementById("speedProgressFill");
      if (!fill) return;
      let left = 2500;
      const step = 50;
      fill.style.width = "100%";
      if (input) input.focus();

      if (repairTimerInterval) clearInterval(repairTimerInterval);
      repairTimerInterval = setInterval(() => {
        left -= step;
        const pct = Math.max(0, (left / 2500) * 100);
        fill.style.width = `${pct}%`;
        if (left <= 0) {
          clearInterval(repairTimerInterval);
          repairTimerInterval = null;
        }
      }, step);
    }
  }

  async function advanceRepairStep(queueItem) {
    const pathway = queueItem.pathway;
    const stepIdx = queueItem.currentStepIndex || 0;

    if (stepIdx + 1 < pathway.length) {
      queueItem.currentStepIndex = stepIdx + 1;
      renderRepairStep();
    } else {
      // 该项所有步骤完成
      engine.finishItemRepair(queueItem.chunk.id);

      if (window.IELTS_DB) {
        try {
          await window.IELTS_DB.saveAttempt({
            id: "att-repair-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
            moduleType: "chunk_repair",
            chunkId: queueItem.chunk.id,
            contentKey: queueItem.chunk.contentKey,
            text: queueItem.chunk.text,
            diagnosticReason: queueItem.diagnosticReason,
            repairPathway: queueItem.pathway,
            repairCompletedAt: Date.now(),
            mastered: false,
            timestamp: Date.now()
          });
        } catch (err) {
          console.warn("Save chunk repair attempt failed:", err);
        }
      }

      engine.repairIndex++;
      renderRepairStep();
    }
  }

  // =========================================================================
  // 阶段 4：延迟混排回测 (Stage 4: Delayed Retest)
  // =========================================================================

  function startDelayedRetest() {
    if (!engine || !ui.retestContent) return;

    if (ui.screeningContainer) ui.screeningContainer.hidden = true;
    if (ui.reportContainer) ui.reportContainer.hidden = true;
    if (ui.repairContainer) ui.repairContainer.hidden = true;
    if (ui.retestContainer) ui.retestContainer.hidden = false;

    engine.initDelayedRetest(engine.repairQueue, 3);
    renderRetestCard();
  }

  function renderRetestCard() {
    if (!engine || !ui.retestContent) return;

    if (engine.delayedRetestIndex >= engine.delayedRetestPool.length) {
      renderRetestCompleted();
      return;
    }

    isRetestSubmitted = false;
    currentRetestAudioEndTime = null;
    currentRetestFirstKeystrokeTime = null;

    const q = engine.delayedRetestPool[engine.delayedRetestIndex];
    const total = engine.delayedRetestPool.length;
    const current = engine.delayedRetestIndex + 1;

    ui.retestContent.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 14px;">
        <div>
          <h3 style="margin: 0 0 4px; font-size: 20px;">🔄 阶段 4：延迟混排回测</h3>
          <p style="margin: 0; color: var(--muted); font-size: 13px;">
            刚才修复的词块与干扰项已混合 · 检验是否真正形成独立反射（严禁做完立刻标掌握）
          </p>
        </div>
        <span class="badge" style="font-size: 13px; font-weight: 800; padding: 6px 12px; background: #fef3c7; color: #92400e;">
          回测进度 ${current} / ${total}
        </span>
      </div>

      <div class="practice-card" style="margin-top: 10px;">
        <button type="button" id="retestAudioBtn" class="listen-button">
          <span class="listen-icon">🔊</span>
          <div>
            <strong>点击播放发音 (按 F2 重播)</strong>
            <small id="retestListenTip">音频播放结束后计时反应时间</small>
          </div>
        </button>

        <form id="retestForm" autocomplete="off" style="margin-top: 14px;">
          <label class="answer-label" for="retestInput">听音盲打完整词块：</label>
          <div class="answer-row">
            <input type="text" id="retestInput" placeholder="听音输入词块 (按 Enter 提交)..." autofocus>
            <button type="submit" id="retestSubmitBtn" class="primary">提交 (Enter)</button>
          </div>
          <div id="retestFeedback" class="feedback" hidden style="margin-top: 10px;"></div>
        </form>
      </div>
    `;

    bindRetestEvents(q);

    if (ui.autoPlay && ui.autoPlay.checked) {
      setTimeout(() => playRetestAudio(q), 200);
    }
  }

  function playRetestAudio(q) {
    if (!q || !("speechSynthesis" in window)) return;
    speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(q.text);
    const ukVoice = voices.find((v) => /en-GB|British/i.test(v.lang)) || voices[0];
    if (ukVoice) utter.voice = ukVoice;
    utter.rate = 0.9;

    const audioBtn = document.getElementById("retestAudioBtn");
    audioBtn?.classList.add("speaking");

    const onComplete = () => {
      audioBtn?.classList.remove("speaking");
      currentRetestAudioEndTime = Date.now();
      const tip = document.getElementById("retestListenTip");
      if (tip) tip.textContent = "音频播放完毕 · 计时开始！请即刻输入";
    };

    utter.onend = onComplete;
    utter.onerror = onComplete;
    speechSynthesis.speak(utter);
  }

  function bindRetestEvents(q) {
    const audioBtn = document.getElementById("retestAudioBtn");
    const form = document.getElementById("retestForm");
    const input = document.getElementById("retestInput");
    const feedback = document.getElementById("retestFeedback");
    const submitBtn = document.getElementById("retestSubmitBtn");

    audioBtn?.addEventListener("click", () => playRetestAudio(q));

    input?.addEventListener("keydown", (e) => {
      if (e.key === "F2") {
        e.preventDefault();
        playRetestAudio(q);
        return;
      }
      if (currentRetestAudioEndTime && !currentRetestFirstKeystrokeTime && !["Shift", "Control", "Alt", "Meta", "Enter"].includes(e.key)) {
        currentRetestFirstKeystrokeTime = Date.now();
      }
    });

    form?.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (isRetestSubmitted) {
        engine.delayedRetestIndex++;
        renderRetestCard();
        return;
      }

      const val = input?.value || "";
      const evalRes = window.ChunkAuralEngine.evaluateAnswer(val, q.text);
      const latency = currentRetestAudioEndTime && currentRetestFirstKeystrokeTime
        ? Math.max(0, currentRetestFirstKeystrokeTime - currentRetestAudioEndTime)
        : 0;

      isRetestSubmitted = true;
      if (input) input.disabled = true;
      if (submitBtn) submitBtn.textContent = "下一题 👉 (Enter)";

      if (feedback) {
        feedback.hidden = false;
        feedback.className = `feedback ${evalRes.isCorrect ? "correct" : "wrong"}`;
        feedback.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong>${evalRes.isCorrect ? "✅ 回测通过！" : "❌ 仍存迟滞或拼错"} 正确答案: ${escapeHtml(q.text)}</strong>
            <span class="badge ${evalRes.isCorrect ? "ok-badge" : "wrong-badge"}">直觉耗时: ${latency}ms</span>
          </div>
        `;
      }

      if (window.IELTS_DB) {
        try {
          await window.IELTS_DB.saveAttempt({
            id: "att-retest-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
            moduleType: "chunk_retest",
            chunkId: q.id,
            contentKey: q.contentKey,
            text: q.text,
            correct: evalRes.isCorrect,
            recognitionLatency: latency,
            timestamp: Date.now()
          });
        } catch (err) {
          console.warn("Save retest attempt failed:", err);
        }
      }
    });
  }

  async function renderRetestCompleted() {
    if (!ui.retestContent || !engine) return;

    // 将本轮修复的弱项调度进次日 review_items 队列 (24小时后复核)
    if (window.IELTS_DB && typeof window.IELTS_DB.scheduleChunkReview === "function") {
      for (const item of engine.repairQueue) {
        try {
          await window.IELTS_DB.scheduleChunkReview(item.chunk.contentKey || item.chunk.id, 86400000);
        } catch (err) {
          console.warn("Schedule chunk review failed:", err);
        }
      }
    }

    const items = engine.repairQueue;
    const rowsHtml = items.map((it, idx) => {
      return `
        <tr style="border-bottom: 1px solid var(--line);">
          <td style="padding: 10px 12px; font-weight: 700;">${idx + 1}. ${escapeHtml(it.chunk.text)}</td>
          <td style="padding: 10px 12px;"><span class="badge">${escapeHtml(it.diagnosticReason)}</span></td>
          <td style="padding: 10px 12px; color: var(--green); font-weight: 700;">✓ 已完成阶梯重塑</td>
          <td style="padding: 10px 12px; font-size: 12px; color: #92400e;">📅 次日 24h 自动复习</td>
        </tr>
      `;
    }).join("");

    ui.retestContent.innerHTML = `
      <div style="text-align: center; padding: 24px 12px;">
        <div style="font-size: 40px; margin-bottom: 12px;">🏆</div>
        <h2 style="margin: 0 0 8px;">B+ 认知激活完整流水线圆满完成！</h2>
        <p style="color: var(--muted); font-size: 14px; margin: 0 0 20px;">
          「筛查 ➔ 诊断 ➔ 分流修复 ➔ 延迟回测」全闭环达成 · 弱项已安排入库明日复查
        </p>

        <div style="max-width: 650px; margin: 0 auto 24px; overflow-x: auto;">
          <table style="width: 100%; text-align: left; border-collapse: collapse; font-size: 13px; background: #ffffff; border-radius: 10px; border: 1px solid var(--line);">
            <thead>
              <tr style="background: #faf7f2; border-bottom: 1.5px solid var(--line);">
                <th style="padding: 10px 12px;">修复词块</th>
                <th style="padding: 10px 12px;">初始错因</th>
                <th style="padding: 10px 12px;">本次状态</th>
                <th style="padding: 10px 12px;">认知复核计划</th>
              </tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </div>

        <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
          <button type="button" id="retestRestartBtn" class="primary" style="font-size: 15px; padding: 12px 28px;">
            👉 开启新一组 20 题雷达扫描
          </button>
        </div>
      </div>
    `;

    document.getElementById("retestRestartBtn")?.addEventListener("click", startScreeningSession);
    loadTodayStats();
  }

  // =========================================================================
  // 公共与辅助函数
  // =========================================================================

  async function loadTodayStats() {
    if (!window.IELTS_DB) return;
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const attempts = await window.IELTS_DB.getAttemptsByTimeRange(startOfDay.getTime(), Date.now());
      const chunkAttempts = (attempts || []).filter((a) => a.moduleType === "chunk_aural");

      const total = chunkAttempts.length;
      const correct = chunkAttempts.filter((a) => a.correct).length;
      const fluent = chunkAttempts.filter((a) => a.reactionTier === "fluent").length;
      const acc = total > 0 ? Math.round((correct / total) * 100) : 0;

      if (ui.todayCount) ui.todayCount.textContent = String(total);
      if (ui.accuracy) ui.accuracy.textContent = total > 0 ? `${acc}%` : "—";
      if (ui.fluentCount) ui.fluentCount.textContent = String(fluent);
      if (ui.testedCount && engine) ui.testedCount.textContent = `${engine.pool.length} 词块`;
    } catch (e) {
      console.warn("Load chunk today stats error:", e);
    }
  }

  function bindEvents() {
    // Stage 1 事件
    ui.listenBtn?.addEventListener("click", () => playScreeningAudio(true));

    ui.input?.addEventListener("keydown", (e) => {
      if (e.key === "F2") {
        e.preventDefault();
        playScreeningAudio(true);
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        handleScreeningSubmit();
        return;
      }

      // 如果已提交且在错因选择阶段，按 1/2/3/4 切换错因
      if (isAnswerSubmitted && (!ui.feedback.hidden)) {
        if (e.key === "1") {
          e.preventDefault();
          selectDiagnosticReason("sound_not_recognised");
          return;
        }
        if (e.key === "2") {
          e.preventDefault();
          selectDiagnosticReason("recognised_but_misspelled");
          return;
        }
        if (e.key === "3") {
          e.preventDefault();
          selectDiagnosticReason("slow_recognition");
          return;
        }
        if (e.key === "4") {
          e.preventDefault();
          selectDiagnosticReason("meaning_unknown");
          return;
        }
      }

      const ignored = ["Shift", "Control", "Alt", "Meta", "Tab", "Escape", "CapsLock"];
      if (currentAudioEndTime && !currentFirstKeystrokeTime && !ignored.includes(e.key)) {
        currentFirstKeystrokeTime = Date.now();
        engine?.markFirstKeystroke(currentFirstKeystrokeTime);
      }
    });

    ui.submitBtn?.addEventListener("click", handleScreeningSubmit);

    // 筛选变动
    ui.scopeSelect?.addEventListener("change", (e) => {
      populateSectionOptions(e.target.value);
      startScreeningSession();
    });
    ui.sectionSelect?.addEventListener("change", startScreeningSession);
    ui.batchSizeSelect?.addEventListener("change", startScreeningSession);
    ui.startBtn?.addEventListener("click", startScreeningSession);

    // Stage 2 战报按钮
    ui.startRepairQueueBtn?.addEventListener("click", startRepairWorkbench);
    ui.rescreenBtn?.addEventListener("click", startScreeningSession);

    // 全局快捷键 F2
    window.addEventListener("keydown", (e) => {
      const panel = document.getElementById("chunkModule");
      if (panel && !panel.hidden && e.key === "F2") {
        e.preventDefault();
        if (ui.screeningContainer && !ui.screeningContainer.hidden) {
          playScreeningAudio(true);
        }
      }
    });

    // 模块显示
    window.addEventListener("chunk-module-visible", () => {
      loadTodayStats();
      if (!engine || engine.pool.length === 0) {
        startScreeningSession();
      } else if (ui.input && !isAnswerSubmitted && ui.screeningContainer && !ui.screeningContainer.hidden) {
        ui.input.focus();
      }
    });
  }

  function populateSectionOptions(scope) {
    if (!ui.sectionSelect) return;
    ui.sectionSelect.innerHTML = '<option value="all">全部小节</option>';

    if (scope === "all" || scope === "wanglu_ch5") {
      const ch5Sections = [
        ["5.1", "5.1 基础表达与名词搭配"],
        ["5.2", "5.2 学术教育场景"],
        ["5.3", "5.3 工作商务场景"],
        ["5.4", "5.4 日常生活场景"],
        ["5.5", "5.5 环境生态与地理"],
        ["5.6", "5.6 医疗健康场景"],
        ["5.7", "5.7 旅游与交通住宿"],
        ["5.8", "5.8 科技媒体场景"],
        ["5.9", "5.9 动植物专有名词"],
        ["5.10", "5.10 艺术文化活动"],
        ["5.11", "5.11 法律与社会问题"],
        ["5.12", "5.12 综合高频词组"]
      ];
      ch5Sections.forEach(([val, label]) => {
        ui.sectionSelect.add(new Option(label, val));
      });
    }

    if (scope === "all" || scope === "wanglu_ch11") {
      const ch11Sections = [
        ["11.1", "11.1 横向综合测试一"],
        ["11.2", "11.2 横向综合测试二"],
        ["11.3", "11.3 横向综合测试三"],
        ["11.4", "11.4 横向综合测试四"]
      ];
      ch11Sections.forEach(([val, label]) => {
        ui.sectionSelect.add(new Option(label, val));
      });
    }
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initUi);
  } else {
    initUi();
  }
})();
