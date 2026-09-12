// 雅思同义替换训练交互控制器 (Paraphrase UI)
(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);

  let currentQ = null;
  let isAnswered = false;
  let startTime = 0;
  let synthVoice = null;

  const ui = {
    panel: $("paraphraseModule"),
    sourceBox: $("paraSourceSpoken"),
    speakBtn: $("paraSpeakBtn"),
    optionsGrid: $("paraOptionsGrid"),
    feedbackBox: $("paraFeedbackBox"),
    teachingCard: $("paraTeachingCard"),
    nextBtn: $("paraNextBtn"),
    todayCount: $("paraTodayCount"),
    accuracy: $("paraAccuracy")
  };

  let stats = {
    total: 0,
    correct: 0
  };

  function initVoice() {
    if (!("speechSynthesis" in window)) return;
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      synthVoice = voices.find((v) => v.lang === "en-GB" || v.lang.startsWith("en-GB")) ||
                   voices.find((v) => v.lang.startsWith("en"));
    };
    speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }

  function speakSource() {
    if (!currentQ || !("speechSynthesis" in window)) return;
    speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(currentQ.sourceSpoken);
    if (synthVoice) utter.voice = synthVoice;
    utter.rate = 0.9;
    speechSynthesis.speak(utter);
  }

  function renderQuestion() {
    if (window.defaultQuestionFactory) {
      currentQ = window.defaultQuestionFactory.generate("paraphrase");
    } else if (window.ParaphraseEngine) {
      if (!window.ParaphraseEngine.corpus || !window.ParaphraseEngine.corpus.length) {
        if (window.PARAPHRASE_DATABASE) {
          window.ParaphraseEngine.setCorpus(window.PARAPHRASE_DATABASE);
        }
      }
      currentQ = window.ParaphraseEngine.generateQuestion();
    } else {
      return;
    }

    isAnswered = false;
    startTime = Date.now();

    if (ui.sourceBox) {
      ui.sourceBox.textContent = currentQ.sourceSpoken;
    }

    if (ui.feedbackBox) {
      ui.feedbackBox.hidden = true;
      ui.feedbackBox.className = "feedback";
      ui.feedbackBox.innerHTML = "";
    }

    if (ui.teachingCard) {
      ui.teachingCard.hidden = true;
      ui.teachingCard.innerHTML = "";
    }

    if (ui.nextBtn) {
      ui.nextBtn.hidden = true;
    }

    if (ui.optionsGrid) {
      ui.optionsGrid.innerHTML = currentQ.options.map((opt) => `
        <button type="button" class="para-option-card" data-opt-key="${opt.key}" data-is-correct="${opt.isCorrect}">
          <span class="para-opt-badge">${opt.label}</span>
          <span class="para-opt-text">${opt.text}</span>
          <small class="para-opt-num">按 ${opt.key}</small>
        </button>
      `).join("");

      ui.optionsGrid.querySelectorAll(".para-option-card").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (!isAnswered) {
            handleChoice(btn.dataset.optKey);
          }
        });
      });
    }

    // 自动发音
    setTimeout(() => {
      speakSource();
    }, 150);
  }

  async function handleChoice(key) {
    if (isAnswered || !currentQ) return;
    isAnswered = true;
    const responseTimeMs = Math.max(100, Date.now() - startTime);

    const chosenOption = currentQ.options.find((o) => o.key === key);
    const isCorrect = chosenOption ? chosenOption.isCorrect : false;

    stats.total++;
    if (isCorrect) stats.correct++;
    updateStats();

    // 记录 Attempt
    if (window.defaultQuestionFactory) {
      window.defaultQuestionFactory.recordResult(currentQ, isCorrect);
    }

    if (window.IELTS_DB) {
      const attempt = {
        id: "att-para-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
        sessionId: "session-" + (sessionStorage.getItem("ielts_session_id") || "default"),
        moduleType: "paraphrase",
        itemId: currentQ.conceptId || currentQ.item?.id || "para-q",
        mode: "practice",
        timestamp: Date.now(),
        correct: isCorrect,
        responseTimeMs,
        userAnswer: chosenOption ? chosenOption.text : "",
        expectedAnswer: currentQ.correctTarget || currentQ.correctOptionText,
        errorReasons: isCorrect ? [] : ["paraphrase"],
        metadata: {
          concept: currentQ.conceptId || currentQ.item?.concept,
          sourceSpoken: currentQ.sourceSpoken
        }
      };
      await window.IELTS_DB.saveAttempt(attempt).catch((e) => console.warn(e));
    }

    // 选项高亮反馈
    ui.optionsGrid?.querySelectorAll(".para-option-card").forEach((btn) => {
      btn.disabled = true;
      const isThisCorrect = btn.dataset.isCorrect === "true";
      const isChosen = btn.dataset.optKey === key;

      if (isThisCorrect) {
        btn.classList.add("correct");
      } else if (isChosen && !isThisCorrect) {
        btn.classList.add("wrong");
      }
    });

    // 展开教学解析
    if (ui.teachingCard) {
      const conceptName = currentQ.conceptZh || currentQ.meaningZh || "";
      const sentenceText = currentQ.contextSentence || currentQ.sourceSpoken || "";
      const targetText = currentQ.correctOptionText || currentQ.correctTarget || "";

      ui.teachingCard.hidden = false;
      ui.teachingCard.innerHTML = `
        <div class="card-panel teaching-card" style="margin-top:14px;padding:16px;background:#fffcf8;border:1px solid #ebdccb;border-radius:10px;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;">
            <strong style="color:${isCorrect ? '#2a7a42' : '#b23b3b'};font-size:15px;">
              ${isCorrect ? '🎉 反应迅速！' : '❌ 未认出同义概括'}
            </strong>
            <span class="badge" style="background:#e8f4ec;color:#2a7a42;font-size:12px;">
              🎯 核心考点：${conceptName}
            </span>
          </div>

          <div style="font-size:14px;line-height:1.6;color:#2c2825;margin-bottom:10px;">
            <strong>听力原文：</strong>"${sentenceText}"
          </div>

          <div style="display:flex;align-items:center;gap:8px;background:#f7f0e6;padding:8px 12px;border-radius:8px;font-size:13px;margin-bottom:10px;">
            <span>口语表达：<em>"${currentQ.sourceSpoken || ""}"</em></span>
            <span style="color:var(--orange);font-weight:900;">↔</span>
            <span>卷面选项：<strong>"${targetText}"</strong></span>
          </div>

          <div style="font-size:12px;color:var(--muted);line-height:1.5;">
            ${currentQ.explanation || ""}
          </div>
        </div>
      `;
    }

    if (ui.nextBtn) {
      ui.nextBtn.hidden = false;
      ui.nextBtn.focus();
    }
  }

  function updateStats() {
    if (ui.todayCount) ui.todayCount.textContent = stats.total;
    if (ui.accuracy) {
      const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
      ui.accuracy.textContent = `${pct}%`;
    }
  }

  function initEvents() {
    ui.speakBtn?.addEventListener("click", () => speakSource());
    ui.nextBtn?.addEventListener("click", () => renderQuestion());

    window.addEventListener("keydown", (e) => {
      if (ui.panel?.hidden) return;

      if (!isAnswered && ["1", "2", "3", "4"].includes(e.key)) {
        e.preventDefault();
        handleChoice(e.key);
      } else if (isAnswered && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        renderQuestion();
      } else if (e.key === "F2") {
        e.preventDefault();
        speakSource();
      }
    });

    window.addEventListener("paraphrase-module-visible", () => {
      if (!currentQ) renderQuestion();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initVoice();
    initEvents();
  });
})();
