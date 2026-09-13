// 雅思真题错题与错因系统 (Real Question Mistakes & Error Attribution)
(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);

  // 9 大核心错因配置
  const ERROR_REASONS = [
    { id: "sound_recognition", label: "🔊 声音没认出", desc: "连读、弱读或发音盲区" },
    { id: "meaning_processing", label: "🧠 听懂词没懂意", desc: "单词都听出来了但整句没转过弯" },
    { id: "paraphrase", label: "🔄 同义替换没反应", desc: "没认出原句与选项的概念概括" },
    { id: "option_scanning", label: "👀 选项没读完", desc: "审题预读时间不足" },
    { id: "map_tracking", label: "🗺️ 地图跟丢", desc: "方位词或行进路线空间断片" },
    { id: "number_date", label: "🔢 数字日期混淆", desc: "teen/ty或月日反应慢" },
    { id: "spelling", label: "✍️ 拼写错误", desc: "听出单词但字母打错" },
    { id: "trap", label: "⚠️ 陷阱/转折误导", desc: "被 but/however/originally 偷袭" },
    { id: "attention", label: "😵 注意力掉线", desc: "纠结前一题导致漏听" }
  ];

  // 时间字符串转秒数 (支持 02:17.5 或纯数字 137.5)
  function parseTimeToSeconds(val) {
    if (!val) return 0;
    val = String(val).trim();
    if (val.includes(":")) {
      const parts = val.split(":");
      const mins = parseFloat(parts[0]) || 0;
      const secs = parseFloat(parts[1]) || 0;
      return mins * 60 + secs;
    }
    return parseFloat(val) || 0;
  }

  // 秒数转 mm:ss 格式
  function formatSeconds(secs) {
    const m = Math.floor(secs / 60);
    const s = (secs % 60).toFixed(1);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }

  let selectedReasons = new Set();
  let stagedAudioBlob = null;
  let stagedAudioFileName = "";
  let activeAudioPlayer = null;
  let audioObjectUrlMap = new Map();

  const ui = {
    form: $("mistakeForm"),
    toggleFormBtn: $("toggleMistakeFormBtn"),
    formContainer: $("mistakeFormContainer"),
    reasonsContainer: $("errorReasonsPills"),
    audioFileInput: $("mistakeAudioFile"),
    audioStartInput: $("mistakeAudioStart"),
    audioEndInput: $("mistakeAudioEnd"),
    audioPreviewBtn: $("mistakeAudioPreviewBtn"),
    audioFileNameSpan: $("mistakeAudioFileName"),
    listContainer: $("mistakesListContainer"),
    statsSummary: $("mistakesSummaryBar"),
    exportBtn: $("exportMistakesBtn"),
    importInput: $("importMistakesInput"),
    startReviewBtn: $("startMistakeReviewBtn"),
    reviewContainer: $("mistakeReviewContainer"),
  };

  // 初始化错因选择药丸
  function initReasonPills() {
    if (!ui.reasonsContainer) return;
    ui.reasonsContainer.innerHTML = ERROR_REASONS.map((r) => `
      <button type="button" class="error-pill" data-reason-id="${r.id}" title="${r.desc}">
        ${r.label}
      </button>
    `).join("");

    ui.reasonsContainer.querySelectorAll(".error-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.reasonId;
        if (selectedReasons.has(id)) {
          selectedReasons.delete(id);
          btn.classList.remove("active");
        } else {
          selectedReasons.add(id);
          btn.classList.add("active");
        }
      });
    });
  }

  // 处理音频文件选取
  function initAudioControls() {
    ui.audioFileInput?.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (file) {
        stagedAudioBlob = file;
        stagedAudioFileName = file.name;
        if (ui.audioFileNameSpan) {
          ui.audioFileNameSpan.textContent = `已选音频：${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`;
        }
      }
    });

    // 录入时试听所选时段
    ui.audioPreviewBtn?.addEventListener("click", () => {
      if (!stagedAudioBlob) {
        alert("请先选择对应的音频 MP3 文件！");
        return;
      }
      const start = parseTimeToSeconds(ui.audioStartInput?.value);
      const end = parseTimeToSeconds(ui.audioEndInput?.value);
      playAudioRange(stagedAudioBlob, start, end);
    });
  }

  // 播放 Blob 片段
  function playAudioRange(blob, startTime, endTime, onEnd) {
    if (activeAudioPlayer) {
      activeAudioPlayer.pause();
      activeAudioPlayer = null;
    }

    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    activeAudioPlayer = audio;

    audio.currentTime = startTime;

    audio.addEventListener("canplay", () => {
      audio.currentTime = startTime;
      audio.play().catch((err) => console.warn("Audio play blocked:", err));
    }, { once: true });

    audio.addEventListener("timeupdate", () => {
      if (endTime > startTime && audio.currentTime >= endTime) {
        audio.pause();
        if (typeof onEnd === "function") onEnd();
      }
    });

    audio.addEventListener("ended", () => {
      if (typeof onEnd === "function") onEnd();
    });
  }

  // 保存错题表单 (极速 15 秒收录模式)
  async function handleFormSubmit(e) {
    e.preventDefault();

    const questionText = $("mistakeQuestionText")?.value.trim() || "";
    const correctAnswer = $("mistakeCorrectAnswer")?.value.trim() || "";
    const book = $("mistakeBook")?.value.trim() || "难点收藏";
    const test = $("mistakeTest")?.value.trim() || "";
    const part = $("mistakePart")?.value || "";
    const qNum = $("mistakeQNum")?.value.trim() || "";
    const questionType = $("mistakeType")?.value || "note";
    const optionsRaw = $("mistakeOptions")?.value.trim() || "";
    const options = optionsRaw ? optionsRaw.split("\n").map((o) => o.trim()).filter(Boolean) : [];
    const transcript = $("mistakeTranscript")?.value.trim() || "";
    const userAnswer = $("mistakeUserAnswer")?.value.trim() || "";
    const keySentence = $("mistakeKeySentence")?.value.trim() || "";
    const paraphraseSource = $("mistakeParaSource")?.value.trim() || "";
    const paraphraseTarget = $("mistakeParaTarget")?.value.trim() || "";

    if (!questionText && !correctAnswer) {
      alert("请至少填写原句文本或正确答案！");
      return;
    }

    let audioClipRef = null;
    if (stagedAudioBlob) {
      const assetId = "aud-" + Date.now();
      await window.IELTS_DB.saveAudioAsset({
        id: assetId,
        fileName: stagedAudioFileName,
        mimeType: stagedAudioBlob.type || "audio/mp3",
        blob: stagedAudioBlob,
        createdAt: Date.now()
      });

      const start = parseTimeToSeconds(ui.audioStartInput?.value);
      const end = parseTimeToSeconds(ui.audioEndInput?.value);
      audioClipRef = {
        audioAssetId: assetId,
        startTime: start,
        endTime: end > start ? end : start + 6
      };
    }

    const rawMistake = {
      book,
      test,
      part,
      questionNumber: qNum,
      questionType,
      questionText,
      options,
      transcript,
      userAnswer,
      correctAnswer,
      keySentence,
      paraphrase: (paraphraseSource || paraphraseTarget) ? {
        source: paraphraseSource,
        target: paraphraseTarget
      } : null,
      errorReasons: Array.from(selectedReasons),
      audioClip: audioClipRef,
      createdAt: Date.now()
    };

    const mistake = (typeof window !== "undefined" && window.CambridgeMistakeSchema)
      ? window.CambridgeMistakeSchema.createCambridgeMistake(rawMistake)
      : {
          id: "mis-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
          ...rawMistake
        };

    await window.IELTS_DB.saveMistake(mistake);

    // 重置表单
    ui.form?.reset();
    selectedReasons.clear();
    stagedAudioBlob = null;
    stagedAudioFileName = "";
    if (ui.audioFileNameSpan) ui.audioFileNameSpan.textContent = "";
    ui.reasonsContainer?.querySelectorAll(".error-pill").forEach((b) => b.classList.remove("active"));
    ui.formContainer?.setAttribute("hidden", "true");

    renderMistakesList();
    renderStats();
  }

  // 渲染难点收藏列表
  async function renderMistakesList() {
    if (!ui.listContainer) return;
    const mistakes = await window.IELTS_DB.getAllMistakes();

    if (!mistakes.length) {
      ui.listContainer.innerHTML = `
        <div class="empty-state card-panel" style="text-align:center;padding:40px 20px;">
          <p style="font-size:16px;font-weight:700;color:var(--muted);margin-bottom:8px;">暂无收藏的难点</p>
          <p style="font-size:13px;color:#8a7f72;margin-bottom:16px;">平时做剑雅遇到生僻表达或神仙原句，点击上方「➕ 收藏一道难点 / 错句」，10 秒极速存入！</p>
        </div>
      `;
      return;
    }

    ui.listContainer.innerHTML = mistakes.map((m) => {
      const reasonsHtml = (m.errorReasons || []).map((rid) => {
        const r = ERROR_REASONS.find((item) => item.id === rid);
        return `<span class="teaching-keyword-pill" style="margin-right:4px;">${r ? r.label : rid}</span>`;
      }).join("");

      const sourceParts = [m.book, m.test, m.part, m.questionNumber].filter(Boolean);
      const sourceHeader = sourceParts.length > 0 ? sourceParts.join(" · ") : "难点笔记";

      return `
        <article class="card-panel mistake-card" data-mistake-id="${m.id}" style="margin-bottom:14px;padding:18px;">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;border-bottom:1px solid #f0e6dc;padding-bottom:8px;margin-bottom:10px;">
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
              <strong style="font-size:14px;color:var(--ink);">${sourceHeader}</strong>
              <span class="badge" style="font-size:11px;">${m.questionType}</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:12px;color:var(--muted);">${new Date(m.createdAt).toLocaleDateString()}</span>
              <button type="button" class="icon-button danger-icon delete-mistake-btn" data-delete-id="${m.id}" title="删除此条" style="padding:2px 6px;font-size:12px;">🗑️</button>
            </div>
          </div>

          <!-- 错因标签列表 -->
          <div style="margin-bottom:10px;">
            ${reasonsHtml || `<span style="font-size:11px;color:var(--muted);">未标记错因</span>`}
          </div>

          <!-- 原句 / 原题展示 -->
          ${m.questionText ? `
            <div style="font-size:15px;line-height:1.5;font-weight:700;margin-bottom:10px;color:#2c2825;background:#fff8ee;padding:10px 14px;border-radius:8px;border-left:4px solid var(--orange);">
              "${m.questionText}"
            </div>
          ` : ""}

          <!-- 正确答案与核心考点 -->
          <div style="display:flex;flex-wrap:wrap;gap:14px;align-items:center;margin-bottom:8px;font-size:14px;">
            ${m.correctAnswer ? `
              <div style="color:#2a7a42;font-weight:800;background:#ebf6ed;padding:4px 10px;border-radius:6px;">
                🎯 正确/核心：${m.correctAnswer}
              </div>
            ` : ""}
            ${m.userAnswer ? `
              <div style="color:#b23b3b;font-weight:700;font-size:13px;">
                ❌ 我选的：${m.userAnswer}
              </div>
            ` : ""}
          </div>

          <!-- 高级信息（定位句与同义替换，如有） -->
          ${m.keySentence ? `
            <div class="teaching-detail-card" style="margin-top:6px;padding:8px 12px;font-size:13px;">
              <div style="font-weight:800;color:#9b4b1d;font-size:11px;margin-bottom:2px;">🎯 答案定位关键句：</div>
              <div class="teaching-quote">"${m.keySentence}"</div>
            </div>
          ` : ""}

          ${m.paraphrase ? `
            <div style="margin-top:6px;background:#fbf8f3;border:1px dashed #d5c8b8;padding:6px 10px;border-radius:6px;font-size:12px;display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
              <strong style="color:#9b4b1d;">🔄 同义替换：</strong>
              <span>"${m.paraphrase.source}"</span>
              <span style="font-weight:800;color:var(--orange);">↔</span>
              <span><strong>"${m.paraphrase.target}"</strong></span>
            </div>
          ` : ""}

          <!-- 原声播放或 TTS 朗读 -->
          <div style="margin-top:10px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            ${m.audioClip ? `
              <button type="button" class="secondary compact play-audio-clip-btn" data-asset-id="${m.audioClip.audioAssetId}" data-start="${m.audioClip.startTime}" data-end="${m.audioClip.endTime}">
                🔊 播放原声 (${formatSeconds(m.audioClip.startTime)} - ${formatSeconds(m.audioClip.endTime)})
              </button>
            ` : (m.questionText || m.keySentence) ? `
              <button type="button" class="secondary compact tts-speak-sentence-btn" data-tts-text="${(m.questionText || m.keySentence).replace(/"/g, '&quot;')}">
                🔊 朗读原句
              </button>
            ` : ""}
          </div>
        </article>
      `;
    }).join("");

    // 绑定删除事件
    ui.listContainer.querySelectorAll(".delete-mistake-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        if (confirm("确定要删除这道真题错题记录吗？")) {
          await window.IELTS_DB.deleteMistake(btn.dataset.deleteId);
          renderMistakesList();
          renderStats();
        }
      });
    });

    // 绑定原声播放
    ui.listContainer.querySelectorAll(".play-audio-clip-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const assetId = btn.dataset.assetId;
        const start = parseFloat(btn.dataset.start) || 0;
        const end = parseFloat(btn.dataset.end) || 0;

        const asset = await window.IELTS_DB.getAudioAsset(assetId);
        if (asset && asset.blob) {
          const original = btn.textContent;
          btn.textContent = "🔊 正在播放...";
          playAudioRange(asset.blob, start, end, () => {
            btn.textContent = original;
          });
        } else {
          alert("未找到该本地音频资源！");
        }
      });
    });

    // 绑定 TTS 朗读
    ui.listContainer.querySelectorAll(".tts-speak-sentence-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!("speechSynthesis" in window)) return;
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(btn.dataset.ttsText);
        u.lang = "en-GB";
        speechSynthesis.speak(u);
      });
    });
  }

  // 渲染数据总览与错因分布
  async function renderStats() {
    if (!ui.statsSummary) return;
    const mistakes = await window.IELTS_DB.getAllMistakes();
    const stats = await window.IELTS_DB.getAttemptsStats();

    const counts = {};
    for (const m of mistakes) {
      for (const r of (m.errorReasons || [])) {
        counts[r] = (counts[r] || 0) + 1;
      }
    }

    const topReasons = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([rid, num]) => {
        const item = ERROR_REASONS.find((r) => r.id === rid);
        return `${item ? item.label.split(" ")[1] : rid} (${num}次)`;
      });

    ui.statsSummary.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
        <div>
          <strong style="font-size:15px;color:var(--ink);">已录入真题错题：${mistakes.length} 题</strong>
          <span style="font-size:12px;color:var(--muted);margin-left:8px;">全站累计训练记录：${stats.total} 次 (正确率 ${stats.total ? Math.round((stats.correct / stats.total) * 100) : 0}%)</span>
        </div>
        ${topReasons.length ? `
          <div style="font-size:12px;color:#9b4b1d;background:#fff6ed;padding:4px 10px;border-radius:8px;border:1px solid #edd9c4;">
            <strong>高频错因：</strong>${topReasons.join(" · ")}
          </div>
        ` : ""}
      </div>
    `;
  }

  // JSON 备份与恢复
  function initExportImport() {
    ui.exportBtn?.addEventListener("click", async () => {
      const data = await window.IELTS_DB.exportAllData();
      if (!data) return;
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ielts-learning-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });

    ui.importInput?.addEventListener("change", async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        const json = JSON.parse(text);
        const res = await window.IELTS_DB.importAllData(json);
        alert(`数据恢复成功！已导入 ${res.importedAttempts} 条训练记录，${res.importedMistakes} 道真题错题。`);
        renderMistakesList();
        renderStats();
      } catch (err) {
        alert("导入失败：JSON 文件格式不合法！" + err.message);
      }
    });
  }

  // 难点随机主动召回复习模式
  let activeReviewMistake = null;

  async function startReviewSession() {
    const mistakes = await window.IELTS_DB.getAllMistakes();
    if (!mistakes || !mistakes.length) {
      alert("你的难点收藏库目前还是空的！请先在做题或复盘时收藏 1~2 道难点句。");
      return;
    }
    const picked = mistakes[Math.floor(Math.random() * mistakes.length)];
    activeReviewMistake = picked;
    renderReviewCard(picked, false);
    ui.reviewContainer?.removeAttribute("hidden");
    ui.reviewContainer?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function playReviewAudio(mistake) {
    if (mistake.audioClip && mistake.audioClip.audioAssetId) {
      window.IELTS_DB.getAudioAsset(mistake.audioClip.audioAssetId).then((asset) => {
        if (asset && asset.blob) {
          playAudioRange(asset.blob, mistake.audioClip.startTime, mistake.audioClip.endTime);
        } else if (mistake.questionText && "speechSynthesis" in window) {
          speakReviewText(mistake.questionText);
        }
      });
    } else if (mistake.questionText && "speechSynthesis" in window) {
      speakReviewText(mistake.questionText);
    }
  }

  function speakReviewText(text) {
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-GB";
    utter.rate = 0.9;
    speechSynthesis.speak(utter);
  }

  function renderReviewCard(mistake, isRevealed = false) {
    if (!ui.reviewContainer) return;
    const sourceParts = [mistake.book, mistake.test, mistake.part, mistake.questionNumber].filter(Boolean);
    const sourceHeader = sourceParts.length > 0 ? sourceParts.join(" · ") : "难点抽测";

    const reasonsHtml = (mistake.errorReasons || []).map((rid) => {
      const r = ERROR_REASONS.find((item) => item.id === rid);
      return `<span class="teaching-keyword-pill" style="margin-right:4px;">${r ? r.label : rid}</span>`;
    }).join("");

    if (!isRevealed) {
      ui.reviewContainer.innerHTML = `
        <div class="mistake-review-header">
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="badge" style="background:#2c8b67;color:white;font-weight:800;">🎧 难点主动召回复习</span>
            <strong style="color:var(--ink);">${sourceHeader}</strong>
          </div>
          <button type="button" id="closeReviewCardBtn" class="text-button" style="color:var(--muted);font-size:12px;">✖ 关闭抽测</button>
        </div>

        <div style="display:flex;align-items:center;gap:12px;margin:12px 0;">
          <button type="button" id="playReviewAudioBtn" class="primary compact" style="display:flex;align-items:center;gap:6px;">
            <span>🔊 播放听力原句发音</span>
          </button>
          <span style="font-size:12px;color:var(--muted);">仔细听，回忆本句核心意思、答案或对应同义替换</span>
        </div>

        <div class="mistake-prompt-box">
          <div style="font-size:12px;font-weight:800;color:#9b4b1d;margin-bottom:6px;">题型与考点方向：</div>
          <p style="margin:0;font-size:15px;color:var(--ink);"><strong>${mistake.questionType || "听力难点"}</strong> — 录音原句已就绪，准备好后点击下方揭晓。</p>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px;">
          <button type="button" id="revealReviewAnswerBtn" class="primary">👀 揭晓原句与正确答案</button>
          <button type="button" id="skipReviewNextBtn" class="secondary compact">换下一条 ❯</button>
        </div>
      `;
      setTimeout(() => playReviewAudio(mistake), 250);
    } else {
      ui.reviewContainer.innerHTML = `
        <div class="mistake-review-header">
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="badge ok-badge">✔ 抽测结果与复盘</span>
            <strong style="color:var(--ink);">${sourceHeader}</strong>
          </div>
          <button type="button" id="closeReviewCardBtn" class="text-button" style="color:var(--muted);font-size:12px;">✖ 关闭抽测</button>
        </div>

        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
          <button type="button" id="playReviewAudioBtn" class="secondary compact">🔊 重听发音</button>
        </div>

        <div style="background:#f4faf6;border:1.5px solid #bce6cf;border-radius:12px;padding:16px 20px;margin-bottom:12px;">
          <div style="font-size:12px;font-weight:800;color:var(--green);margin-bottom:4px;">🎯 正确答案 / 核心考点：</div>
          <div style="font-size:18px;font-weight:800;color:var(--ink);">${mistake.correctAnswer || "（未记录答案）"}</div>
        </div>

        <div style="background:white;border:1px solid #ebdccb;border-radius:12px;padding:14px 18px;margin-bottom:12px;">
          <div style="font-size:12px;font-weight:800;color:var(--muted);margin-bottom:4px;">📝 录音原句：</div>
          <blockquote style="margin:0;font-size:15px;font-weight:600;color:var(--ink);line-height:1.5;">${mistake.questionText || "（未录入原句）"}</blockquote>
        </div>

        ${mistake.paraphrase ? `
          <div style="background:#fff9f0;border:1px solid #f2dfc7;border-radius:10px;padding:10px 14px;margin-bottom:12px;font-size:13px;">
            <strong>🔄 同义替换映射：</strong>
            <span style="color:#8a4d1b;">${mistake.paraphrase.source || ""}</span> ➔ <strong>${mistake.paraphrase.target || ""}</strong>
          </div>
        ` : ""}

        ${reasonsHtml ? `
          <div style="margin-bottom:14px;">
            <span style="font-size:12px;color:var(--muted);font-weight:700;margin-right:6px;">当时错因：</span>
            ${reasonsHtml}
          </div>
        ` : ""}

        <div style="display:flex;justify-content:flex-end;align-items:center;gap:10px;margin-top:14px;">
          <button type="button" id="nextReviewBtn" class="primary">🔄 再抽测下一道难点 (Enter)</button>
        </div>
      `;
    }

    $("closeReviewCardBtn")?.addEventListener("click", () => {
      ui.reviewContainer?.setAttribute("hidden", "true");
    });
    $("playReviewAudioBtn")?.addEventListener("click", () => {
      playReviewAudio(mistake);
    });
    $("revealReviewAnswerBtn")?.addEventListener("click", () => {
      renderReviewCard(mistake, true);
    });
    $("skipReviewNextBtn")?.addEventListener("click", () => {
      startReviewSession();
    });
    $("nextReviewBtn")?.addEventListener("click", () => {
      startReviewSession();
    });

    // 键盘快捷键：Enter 下一题/揭晓答案，Escape 关闭
    const reviewKeyHandler = (e) => {
      if (!ui.reviewContainer || ui.reviewContainer.hidden) return;
      if (e.key === "Enter") {
        e.preventDefault();
        const nextBtn = $("nextReviewBtn");
        const revealBtn = $("revealReviewAnswerBtn");
        if (nextBtn) {
          startReviewSession();
        } else if (revealBtn) {
          renderReviewCard(activeReviewMistake, true);
        }
      } else if (e.key === "Escape") {
        ui.reviewContainer?.setAttribute("hidden", "true");
      }
    };
    document.removeEventListener("keydown", reviewKeyHandler);
    document.addEventListener("keydown", reviewKeyHandler);
  }

  function init() {
    initReasonPills();
    initAudioControls();
    initExportImport();

    ui.startReviewBtn?.addEventListener("click", startReviewSession);

    ui.toggleFormBtn?.addEventListener("click", () => {
      const isHidden = ui.formContainer?.hasAttribute("hidden");
      if (isHidden) {
        ui.formContainer?.removeAttribute("hidden");
        ui.toggleFormBtn.textContent = "✖ 折叠录入表单";
      } else {
        ui.formContainer?.setAttribute("hidden", "true");
        ui.toggleFormBtn.textContent = "➕ 收藏一道难点 / 错句";
      }
    });

    ui.form?.addEventListener("submit", handleFormSubmit);

    // 监听导航切换
    window.addEventListener("mistakes-module-visible", () => {
      renderMistakesList();
      renderStats();
    });

    renderMistakesList();
    renderStats();
  }

  // DOM 载入后初始化
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
