(() => {
  "use strict";

  const STORAGE_KEY = "ielts-word-dictation-v1";
  const words = window.WORDS_DICTATION_DATA || [];

  const $ = (id) => document.getElementById(id);
  const ui = {
    todayCount: $("todayCount"),
    accuracy: $("accuracy"),
    unknownCount: $("unknownCount"),
    knownCount: $("knownCount"),
    mode: $("modeSelect"),
    chapter: $("chapterSelect"),
    start: $("startButton"),
    practice: $("practiceCard"),
    empty: $("emptyState"),
    progress: $("progressText"),
    chapterBadge: $("chapterBadge"),
    play: $("playWordButton"),
    slow: $("slowButton"),
    hintButton: $("hintButton"),
    hint: $("chineseHint"),
    form: $("answerForm"),
    input: $("answerInput"),
    feedback: $("feedback"),
    spellingForm: $("spellingForm"),
    spellingInput: $("spellingInput"),
    spellingFeedback: $("spellingFeedback"),
    ratingArea: $("ratingArea"),
    reveal: $("revealButton"),
    settingsButton: $("settingsButton"),
    settings: $("settingsDialog"),
    voice: $("voiceSelect"),
    rate: $("rateInput"),
    rateOutput: $("rateOutput"),
    autoPlay: $("autoPlayInput"),
    export: $("exportButton"),
    import: $("importInput"),
    reset: $("resetButton"),
    dataSummary: $("dataSummary"),
  };

  const defaultState = {
    progress: {},
    daily: {},
    settings: { voice: "", rate: 0.9, autoPlay: true },
  };

  let state = loadState();
  let session = [];
  let index = 0;
  let current = null;
  let answered = false;
  let answerWasCorrect = false;
  let voices = [];
  let cardStartTime = performance.now();
  let wordSessionId = "sess-" + Date.now();

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return {
        ...structuredClone(defaultState),
        ...saved,
        settings: { ...defaultState.settings, ...(saved?.settings || {}) },
      };
    } catch {
      return structuredClone(defaultState);
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateSummary();
  }

  function dayKey(timestamp = Date.now()) {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  function normalized(value) {
    return (value || "").trim().toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, " ");
  }

  function shuffle(items) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function populateFilters() {
    ui.chapter.innerHTML = "";
    ui.chapter.add(new Option(`全部单词 (${words.length} 词)`, "all"));

    const groups = new Map();
    words.forEach((w) => {
      const g = w.group || 1;
      if (!groups.has(g)) groups.set(g, []);
      groups.get(g).push(w);
    });

    [...groups.keys()].sort((a, b) => a - b).forEach((g) => {
      const list = groups.get(g);
      const first = list[0].id.replace("wd-", "#");
      const last = list.at(-1).id.replace("wd-", "#");
      ui.chapter.add(new Option(`第 ${g} 组 (${list.length} 词 · ${first}–${last})`, String(g)));
    });
  }

  function updateSummary() {
    const today = state.daily[dayKey()] || { total: 0, correct: 0 };
    let known = 0;
    let unknown = 0;
    Object.values(state.progress).forEach((item) => {
      if (item.status === "known") known += 1;
      else if (item.status === "unknown") unknown += 1;
    });

    ui.todayCount.textContent = String(today.total);
    ui.accuracy.textContent = today.total ? `${Math.round((today.correct / today.total) * 100)}%` : "—";
    ui.unknownCount.textContent = String(unknown);
    ui.knownCount.textContent = String(known);

    if (ui.dataSummary) {
      ui.dataSummary.textContent = `词库总量：${words.length} 词 · 已标记已掌握：${known} 词 · 生词本：${unknown} 词`;
    }
  }

  function populateVoices() {
    if (!("speechSynthesis" in window)) return;
    voices = speechSynthesis.getVoices().filter((voice) => /^en/i.test(voice.lang));
    const previous = ui.voice.value || state.settings.voice;
    ui.voice.innerHTML = '<option value="">系统默认英语语音</option>';

    const ukVoice = voices.find((v) => /en-GB|British|UK/i.test(v.lang) || /United Kingdom/i.test(v.name));
    voices.forEach((voice) => {
      const label = `${voice.name} (${voice.lang})${voice.default ? " [默认]" : ""}`;
      ui.voice.add(new Option(label, voice.name));
    });

    if (previous && voices.some((v) => v.name === previous)) {
      ui.voice.value = previous;
    } else if (ukVoice) {
      ui.voice.value = ukVoice.name;
    }
  }

  function speakWord(customRate) {
    if (!current || !("speechSynthesis" in window)) return;
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(current.term);
    const selectedVoice = voices.find((v) => v.name === state.settings.voice)
      || voices.find((v) => /en-GB|British/i.test(v.lang))
      || voices[0];

    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.rate = typeof customRate === "number" ? customRate : Number(state.settings.rate) || 0.9;
    utterance.pitch = 1.0;

    ui.play.classList.add("speaking");
    utterance.onend = () => ui.play.classList.remove("speaking");
    utterance.onerror = () => ui.play.classList.remove("speaking");

    speechSynthesis.speak(utterance);
  }

  function startSession() {
    const selectedGroup = ui.chapter.value;
    const mode = ui.mode.value;

    let pool = words.filter((w) => selectedGroup === "all" || String(w.group) === selectedGroup);

    if (mode === "new") {
      pool = pool.filter((w) => !state.progress[w.id]?.status);
    } else if (mode === "unknown") {
      pool = pool.filter((w) => state.progress[w.id]?.status === "unknown");
    }

    if (!pool.length) {
      session = [];
      current = null;
      ui.practice.hidden = true;
      ui.empty.hidden = false;
      return;
    }

    session = shuffle(pool);
    index = 0;
    ui.empty.hidden = true;
    ui.practice.hidden = false;
    showCard(index);
  }

  function showCard(cardIndex) {
    current = session[cardIndex];
    if (!current) {
      ui.practice.hidden = true;
      ui.empty.hidden = false;
      ui.empty.querySelector("h2").textContent = "本轮听写已完成！";
      ui.empty.querySelector("p").textContent = "可以切换为重背生词或全部随机，继续巩固。";
      return;
    }

    answered = false;
    answerWasCorrect = false;
    cardStartTime = performance.now();

    ui.progress.textContent = `第 ${cardIndex + 1} / ${session.length} 词`;
    ui.chapterBadge.textContent = `Group ${current.group || 1}`;

    ui.hint.hidden = true;
    ui.hint.innerHTML = `<strong>中文释义：</strong>${current.chinese}`;
    ui.hintButton.hidden = false;
    ui.hintButton.textContent = "显示中文释义提示";

    ui.input.value = "";
    ui.input.disabled = false;
    ui.input.readOnly = false;
    ui.input.classList.remove("input-correct", "input-wrong");
    ui.feedback.innerHTML = "";
    ui.feedback.className = "feedback";

    ui.spellingForm.hidden = true;
    ui.spellingInput.value = "";
    ui.spellingFeedback.textContent = "";
    ui.spellingFeedback.className = "spelling-feedback";

    ui.ratingArea.hidden = true;

    ui.input.focus();

    if (state.settings.autoPlay) {
      setTimeout(() => speakWord(), 100);
    }
  }

  function submitAnswer(event) {
    if (event) event.preventDefault();
    if (!current) return;

    if (answered) {
      // 已经核对过，再次提交直接进入下一个
      moveToNext();
      return;
    }

    const userInput = normalized(ui.input.value);
    if (!userInput) {
      // 空提交等于交白卷
      revealAnswer(true);
      return;
    }

    answered = true;
    ui.input.readOnly = true;

    const correct = userInput === normalized(current.term);
    answerWasCorrect = correct;

    recordAttempt(correct, ui.input.value.trim());

    ui.hint.hidden = false;
    ui.hintButton.hidden = true;

    if (correct) {
      ui.input.classList.add("input-correct");
      ui.feedback.className = "feedback correct";
      ui.feedback.innerHTML = `
        <div class="result-box">
          <span class="badge ok-badge">✔ 拼写正确</span>
          <div class="word-card-reveal">
            <strong class="correct-word">${current.term}</strong>
            <span class="phonetic">${current.phonetic || ""}</span>
            <span class="word-meaning">${current.chinese}</span>
          </div>
          <p class="next-tip">按 <kbd>Enter</kbd> 直接进入下一词，或按 <kbd>1</kbd> 标为生词。</p>
        </div>
      `;
      ui.ratingArea.hidden = false;
    } else {
      ui.input.classList.add("input-wrong");
      ui.feedback.className = "feedback wrong";
      ui.feedback.innerHTML = `
        <div class="result-box">
          <span class="badge wrong-badge">✘ 拼写有误</span>
          <div class="word-card-reveal">
            <span class="user-typed">你的输入：${ui.input.value.trim()}</span>
            <strong class="correct-word">${current.term}</strong>
            <span class="phonetic">${current.phonetic || ""}</span>
            <span class="word-meaning">${current.chinese}</span>
          </div>
        </div>
      `;

      // 激活二次拼写巩固
      ui.spellingForm.hidden = false;
      ui.ratingArea.hidden = false;
      ui.spellingInput.focus();
    }

    saveState();

    // 只要按了 Enter 出答案（无论对错），立刻再读一遍单词
    speakWord();
  }

  function revealAnswer(isGiveUp = false) {
    if (!current || answered) return;
    answered = true;
    answerWasCorrect = false;

    ui.input.readOnly = true;
    ui.input.classList.add("input-wrong");

    recordAttempt(false, isGiveUp ? "[交白卷]" : "[查看答案]");

    ui.hint.hidden = false;
    ui.hintButton.hidden = true;

    ui.feedback.className = "feedback wrong";
    ui.feedback.innerHTML = `
      <div class="result-box">
        <span class="badge wrong-badge">${isGiveUp ? "交白卷" : "查看答案"}</span>
        <div class="word-card-reveal">
          <strong class="correct-word">${current.term}</strong>
          <span class="phonetic">${current.phonetic || ""}</span>
          <span class="word-meaning">${current.chinese}</span>
        </div>
      </div>
    `;

    ui.spellingForm.hidden = false;
    ui.ratingArea.hidden = false;
    ui.spellingInput.focus();

    saveState();

    // 出答案时再朗读一遍
    speakWord();
  }

  function handleSpellingSubmit(event) {
    if (event) event.preventDefault();
    if (!current) return;

    const typed = normalized(ui.spellingInput.value);
    if (!typed) {
      applyRating("unknown", true);
      return;
    }

    if (typed === normalized(current.term)) {
      ui.spellingFeedback.className = "spelling-feedback ok";
      ui.spellingFeedback.textContent = "✔ 亲手拼写正确！";
      applyRating("unknown", true);
    } else {
      ui.spellingFeedback.className = "spelling-feedback err";
      ui.spellingFeedback.textContent = `请准确拼写出：${current.term}`;
      ui.spellingInput.select();
      speakWord();
    }
  }

  function recordAttempt(correct, userInput = "") {
    const today = state.daily[dayKey()] || { total: 0, correct: 0 };
    today.total += 1;
    if (correct) today.correct += 1;
    state.daily[dayKey()] = today;

    const responseTimeMs = Math.round(performance.now() - (cardStartTime || performance.now()));

    // 写入统一底座 IndexedDB
    if (window.IELTS_DB && current) {
      window.IELTS_DB.saveAttempt({
        id: "att-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
        sessionId: wordSessionId,
        moduleType: "word",
        itemId: current.term,
        mode: "practice",
        timestamp: Date.now(),
        correct,
        responseTimeMs,
        userAnswer: userInput,
        expectedAnswer: current.term,
        errorReasons: correct ? [] : ["sound_recognition"],
        metadata: {
          phonetic: current.phonetic,
          chinese: current.chinese,
          group: current.group
        }
      }).catch((err) => console.warn("Failed to save attempt to IndexedDB:", err));
    }

    // 默认评级：答对默认标为已认识，答错默认标为生词
    applyRating(correct ? "known" : "unknown", false);
  }

  function applyRating(status, shouldMove = true) {
    if (!current) return;
    state.progress[current.id] = {
      status,
      lastSeen: Date.now(),
      term: current.term,
    };
    saveState();
    if (shouldMove) moveToNext();
  }

  function moveToNext() {
    index += 1;
    showCard(index);
  }

  // 键盘快捷键监听
  window.addEventListener("keydown", (event) => {
    // 如果弹窗打开中，不拦截
    if (ui.settings.open) return;
    const isWritingVisible = document.getElementById("listeningModule").hidden;
    if (isWritingVisible) return;

    if (event.key === "Enter") {
      // 未提交答案时，让 answerForm 正常触发 submit
      if (!answered) return;

      // 如果二次拼写框激活并且输入了内容，交给 spellingForm 的 submit 校验
      if (!ui.spellingForm.hidden && document.activeElement === ui.spellingInput && ui.spellingInput.value.trim().length > 0) {
        return;
      }

      // 已出答案后继续按 Enter，直接切入下一个单词
      event.preventDefault();
      moveToNext();
      return;
    }

    if (event.key === "F2") {
      event.preventDefault();
      speakWord();
      return;
    }

    if (event.key === "1") {
      const activeEl = document.activeElement;
      if (activeEl === ui.input && !answered && ui.input.value.length > 0) return;
      if (activeEl === ui.spellingInput && ui.spellingInput.value.length > 0) return;

      event.preventDefault();
      if (!answered) {
        revealAnswer(true);
      } else {
        applyRating("unknown", true);
      }
      return;
    }

    if (event.key === "2") {
      const activeEl = document.activeElement;
      if (activeEl === ui.input && !answered && ui.input.value.length > 0) return;
      if (activeEl === ui.spellingInput && ui.spellingInput.value.length > 0) return;

      event.preventDefault();
      if (!answered) {
        applyRating("known", true);
      } else {
        applyRating("known", true);
      }
      return;
    }
  });

  // 事件绑定
  ui.form.addEventListener("submit", submitAnswer);
  ui.spellingForm.addEventListener("submit", handleSpellingSubmit);
  ui.play.addEventListener("click", () => speakWord());
  ui.slow.addEventListener("click", () => speakWord(0.75));
  ui.reveal.addEventListener("click", () => revealAnswer(false));
  ui.start.addEventListener("click", startSession);
  ui.chapter.addEventListener("change", startSession);
  ui.mode.addEventListener("change", startSession);

  ui.hintButton.addEventListener("click", () => {
    ui.hint.hidden = !ui.hint.hidden;
    ui.hintButton.textContent = ui.hint.hidden ? "显示中文释义提示" : "隐藏中文提示";
  });

  ui.ratingArea.querySelectorAll("button[data-status]").forEach((btn) => {
    btn.addEventListener("click", () => applyRating(btn.dataset.status, true));
  });

  // 设置弹窗
  ui.settingsButton.addEventListener("click", () => {
    populateVoices();
    ui.rate.value = state.settings.rate;
    ui.rateOutput.textContent = `${Number(state.settings.rate).toFixed(2)}×`;
    ui.autoPlay.checked = state.settings.autoPlay;
    updateSummary();
    ui.settings.showModal();
  });

  ui.rate.addEventListener("input", () => {
    ui.rateOutput.textContent = `${Number(ui.rate.value).toFixed(2)}×`;
  });

  ui.settings.querySelector("form").addEventListener("submit", () => {
    state.settings.voice = ui.voice.value;
    state.settings.rate = Number(ui.rate.value) || 0.9;
    state.settings.autoPlay = ui.autoPlay.checked;
    saveState();
  });

  ui.export.addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ielts-word-dictation-backup-${dayKey()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  });

  ui.import.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const imported = JSON.parse(text);
      if (imported && typeof imported === "object") {
        state = {
          ...defaultState,
          ...imported,
          settings: { ...defaultState.settings, ...(imported.settings || {}) },
        };
        saveState();
        startSession();
        alert("学习进度导入成功！");
      }
    } catch (error) {
      alert(`导入失败：${error.message}`);
    }
  });

  ui.reset.addEventListener("click", () => {
    if (confirm("确定要清空所有单词练习进度和生词本吗？")) {
      state = structuredClone(defaultState);
      saveState();
      startSession();
    }
  });

  if ("speechSynthesis" in window) {
    speechSynthesis.onvoiceschanged = populateVoices;
  }

  populateFilters();
  populateVoices();
  updateSummary();
  startSession();
})();
