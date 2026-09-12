// 雅思听力数字/日期/时间/价格 交互控制器 (Number & Date UI)
(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);

  let currentQuestion = null;
  let currentCategory = "all";
  let questionStartTime = 0;
  let isAnswered = false;
  let synthVoice = null;
  let speechRate = 0.9;

  const ui = {
    panel: $("numberDateModule"),
    categoryPills: $("numDateCategoryPills"),
    playBtn: $("numDatePlayBtn"),
    speedSelect: $("numDateSpeedSelect"),
    form: $("numDateForm"),
    input: $("numDateInput"),
    feedback: $("numDateFeedback"),
    nextBtn: $("numDateNextBtn"),
    tipBox: $("numDateTipBox"),
    countStat: $("numDateTodayCount"),
    accStat: $("numDateAccuracy")
  };

  let sessionStats = {
    total: 0,
    correct: 0
  };

  // 初始化英语发音语音包
  function initVoice() {
    if (!("speechSynthesis" in window)) return;
    const updateVoices = () => {
      const voices = speechSynthesis.getVoices();
      // 优先选英音 (en-GB)，次选美音或澳音
      synthVoice = voices.find((v) => v.lang === "en-GB" || v.lang.startsWith("en-GB")) ||
                   voices.find((v) => v.lang === "en-AU") ||
                   voices.find((v) => v.lang.startsWith("en"));
    };
    speechSynthesis.onvoiceschanged = updateVoices;
    updateVoices();
  }

  // 播放当前题目英文发音
  function speakCurrent(repeat = false) {
    if (!currentQuestion || !("speechSynthesis" in window)) return;
    speechSynthesis.cancel();

    const text = currentQuestion.spoken;
    const utter = new SpeechSynthesisUtterance(text);
    if (synthVoice) utter.voice = synthVoice;
    utter.rate = speechRate;
    utter.pitch = 1.0;

    ui.playBtn?.classList.add("playing");
    utter.onend = () => ui.playBtn?.classList.remove("playing");
    utter.onerror = () => ui.playBtn?.classList.remove("playing");

    speechSynthesis.speak(utter);
  }

  // 出新题
  function loadNextQuestion() {
    if (!window.NumberDateEngine) return;

    currentQuestion = window.NumberDateEngine.nextQuestion(currentCategory);
    questionStartTime = Date.now();
    isAnswered = false;

    if (ui.input) {
      ui.input.value = "";
      ui.input.disabled = false;
      ui.input.focus();
    }

    if (ui.feedback) {
      ui.feedback.innerHTML = "";
      ui.feedback.className = "feedback";
      ui.feedback.hidden = true;
    }

    if (ui.tipBox) {
      ui.tipBox.innerHTML = "";
      ui.tipBox.hidden = true;
    }

    if (ui.nextBtn) {
      ui.nextBtn.hidden = true;
    }

    // 自动朗读发音
    setTimeout(() => {
      speakCurrent();
    }, 150);
  }

  // 提交并判卷
  async function submitAnswer() {
    if (!currentQuestion || isAnswered) return;

    const userInput = ui.input?.value.trim() || "";
    if (!userInput) return;

    isAnswered = true;
    const responseTimeMs = Math.max(100, Date.now() - questionStartTime);
    const result = window.NumberDateEngine.checkAnswer(userInput, currentQuestion);

    sessionStats.total++;
    if (result.correct) sessionStats.correct++;

    updateStatsDisplay();

    let latestNdAttempt = null;
    if (window.IELTS_DB) {
      latestNdAttempt = {
        id: "att-nd-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
        sessionId: "session-" + (sessionStorage.getItem("ielts_session_id") || "default"),
        moduleType: "number_date",
        itemId: currentQuestion.category + ":" + currentQuestion.displayAnswer,
        mode: "practice",
        timestamp: Date.now(),
        correct: result.correct,
        responseTimeMs,
        userAnswer: userInput,
        expectedAnswer: currentQuestion.displayAnswer,
        errorReasons: result.correct ? [] : [currentQuestion.trapType || "number_date"],
        metadata: {
          category: currentQuestion.category,
          spoken: currentQuestion.spoken
        }
      };
      await window.IELTS_DB.saveAttempt(latestNdAttempt).catch((e) => console.warn(e));
    }

    // 渲染判卷反馈
    if (ui.feedback) {
      ui.feedback.hidden = false;
      if (result.correct) {
        ui.feedback.className = "feedback correct";
        ui.feedback.innerHTML = `
          <strong>🎉 正确！</strong> 标准写法：<span style="font-weight:800;">${currentQuestion.displayAnswer}</span>
          <span style="font-size:12px;opacity:0.85;margin-left:8px;">(${responseTimeMs / 1000}s)</span>
        `;
      } else {
        ui.feedback.className = "feedback error";
        ui.feedback.innerHTML = `
          <strong>❌ 稍有偏差</strong><br>
          你的输入：<span style="text-decoration:line-through;margin-right:12px;">${userInput}</span>
          参考标准：<span style="color:#2a7a42;font-weight:800;font-size:15px;">${currentQuestion.displayAnswer}</span>
          <div class="inline-error-reasons" id="numDateErrorPills">
            <span style="font-size:12px;font-weight:700;color:var(--muted);margin-right:4px;">错因记录:</span>
            <button type="button" class="reason-chip active" data-nd-reason="number_date">🔢 读音/位数混淆</button>
            <button type="button" class="reason-chip" data-nd-reason="spelling">✍️ 拼写/格式手滑</button>
            <button type="button" class="reason-chip" data-nd-reason="attention">😵 语速过快没跟上</button>
          </div>
        `;
        const pillsWrap = document.getElementById("numDateErrorPills");
        if (pillsWrap) {
          pillsWrap.querySelectorAll("[data-nd-reason]").forEach((btn) => {
            btn.addEventListener("click", () => {
              btn.classList.toggle("active");
              if (latestNdAttempt && window.IELTS_DB) {
                const reasons = [...pillsWrap.querySelectorAll(".reason-chip.active")].map((b) => b.dataset.ndReason);
                latestNdAttempt.errorReasons = reasons;
                window.IELTS_DB.saveAttempt(latestNdAttempt).catch((e) => console.warn(e));
              }
            });
          });
        }
      }
    }

    // 展示教学辨析与提示
    if (ui.tipBox) {
      ui.tipBox.hidden = false;
      ui.tipBox.innerHTML = `
        <div style="background:#fffcf7;border:1px solid #ebdccb;padding:10px 14px;border-radius:8px;font-size:13px;line-height:1.5;">
          <div style="font-weight:800;color:#9b4b1d;margin-bottom:4px;">💡 考点精要与发音辨析：</div>
          <div>${currentQuestion.tip}</div>
          <div style="margin-top:6px;font-size:12px;color:var(--muted);">
            录音文本读音：<em>"${currentQuestion.spoken}"</em>
          </div>
        </div>
      `;
    }

    if (ui.nextBtn) {
      ui.nextBtn.hidden = false;
      ui.nextBtn.focus();
    }
  }

  function updateStatsDisplay() {
    if (ui.countStat) ui.countStat.textContent = sessionStats.total;
    if (ui.accStat) {
      const pct = sessionStats.total > 0 ? Math.round((sessionStats.correct / sessionStats.total) * 100) : 0;
      ui.accStat.textContent = `${pct}%`;
    }
  }

  // 初始化 DOM 事件
  function initEvents() {
    // 类别切换药丸
    ui.categoryPills?.querySelectorAll("[data-num-category]").forEach((btn) => {
      btn.addEventListener("click", () => {
        ui.categoryPills.querySelectorAll("[data-num-category]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentCategory = btn.dataset.numCategory;
        loadNextQuestion();
      });
    });

    // 播放按钮
    ui.playBtn?.addEventListener("click", () => speakCurrent(true));

    // 语速选择
    ui.speedSelect?.addEventListener("change", (e) => {
      speechRate = parseFloat(e.target.value) || 0.9;
    });

    // 表单提交
    ui.form?.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!isAnswered) {
        submitAnswer();
      } else {
        loadNextQuestion();
      }
    });

    // 下一题按钮
    ui.nextBtn?.addEventListener("click", () => loadNextQuestion());

    // 键盘快捷键 F2 重听，Enter 推进
    window.addEventListener("keydown", (e) => {
      if (ui.panel?.hidden) return;
      if (e.key === "F2") {
        e.preventDefault();
        speakCurrent(true);
      }
    });

    // 响应模块被展示时自动开始
    window.addEventListener("numberdate-module-visible", () => {
      if (!currentQuestion) loadNextQuestion();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initVoice();
    initEvents();
  });
})();
