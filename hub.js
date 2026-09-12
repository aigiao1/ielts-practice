(() => {
  "use strict";

  const STORAGE_KEY = "ielts-practice-hub-v1";
  const tabs = [...document.querySelectorAll("[data-hub-module]")];
  const panels = [...document.querySelectorAll("[data-hub-panel]")];
  const title = document.getElementById("pageTitle");
  const eyebrow = document.getElementById("pageEyebrow");
  const settingsButton = document.getElementById("settingsButton");

  const moduleCopy = {
    listening: { title: "雅思核心单词听写", eyebrow: "IELTS LISTENING · WORD DICTATION" },
    numberdate: { title: "数字/日期无限生成器", eyebrow: "IELTS LISTENING · NUMBERS & DATES" },
    paraphrase: { title: "同义替换随机速练", eyebrow: "IELTS LISTENING · PARAPHRASE DRILL" },
    optionscan: { title: "30秒长选项速读扫描", eyebrow: "IELTS LISTENING · SPEED SCANNING" },
    map: { title: "雅思听力地图题专项", eyebrow: "IELTS LISTENING · MAP TRAINING" },
    writing: { title: "雅思小作文核心表达", eyebrow: "IELTS WRITING TASK 1 · KEY EXPRESSIONS" },
    mistakes: { title: "我的难点收藏", eyebrow: "IELTS PRACTICE · QUICK NOTES & MISTAKES" },
  };

  function activate(moduleName) {
    const name = moduleCopy[moduleName] ? moduleName : "listening";
    tabs.forEach((tab) => {
      const active = tab.dataset.hubModule === name;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    panels.forEach((panel) => { panel.hidden = panel.dataset.hubPanel !== name; });
    title.textContent = moduleCopy[name].title;
    eyebrow.textContent = moduleCopy[name].eyebrow;
    settingsButton.hidden = name !== "listening";
    if (name !== "listening" && "speechSynthesis" in window) speechSynthesis.cancel();
    document.title = `${moduleCopy[name].title} · IELTS 练习中心`;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ module: name }));
    if (name === "numberdate") window.dispatchEvent(new CustomEvent("numberdate-module-visible"));
    if (name === "paraphrase") window.dispatchEvent(new CustomEvent("paraphrase-module-visible"));
    if (name === "optionscan") window.dispatchEvent(new CustomEvent("optionscan-module-visible"));
    if (name === "writing") window.dispatchEvent(new CustomEvent("writing-module-visible"));
    if (name === "map") window.dispatchEvent(new CustomEvent("map-module-visible"));
    if (name === "mistakes") window.dispatchEvent(new CustomEvent("mistakes-module-visible"));
    updateDailyCoach();
  }

  async function updateDailyCoach() {
    const coachIcon = document.getElementById("coachIcon");
    const coachTitle = document.getElementById("coachTitle");
    const coachDesc = document.getElementById("coachDesc");
    const coachWordBadge = document.getElementById("coachWordBadge");
    const coachNumBadge = document.getElementById("coachNumBadge");
    const coachReviewBadge = document.getElementById("coachReviewBadge");
    const coachActionBtn = document.getElementById("coachActionBtn");
    if (!coachTitle) return;

    let wordsToday = 0;
    try {
      const wordState = JSON.parse(localStorage.getItem("ielts-word-dictation-v1"));
      const now = new Date();
      const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
      wordsToday = wordState?.daily?.[todayKey]?.total || 0;
    } catch {}

    let numbersToday = 0;
    let mistakesTotal = 0;
    if (window.IELTS_DB) {
      try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const attempts = await window.IELTS_DB.getAttemptsByTimeRange(startOfDay.getTime(), Date.now());
        numbersToday = (attempts || []).filter((a) => a.moduleType === "number_date").length;
        const allMistakes = await window.IELTS_DB.getAllMistakes();
        mistakesTotal = (allMistakes || []).length;
      } catch (e) {
        console.warn("DB query for coach failed:", e);
      }
    }

    if (coachWordBadge) {
      coachWordBadge.textContent = `单词听写: ${wordsToday} / 30`;
      coachWordBadge.classList.toggle("done", wordsToday >= 30);
    }
    if (coachNumBadge) {
      coachNumBadge.textContent = `数字日期: ${numbersToday} / 10`;
      coachNumBadge.classList.toggle("done", numbersToday >= 10);
    }
    if (coachReviewBadge) {
      coachReviewBadge.textContent = `难点收藏: ${mistakesTotal} 条`;
    }

    if (wordsToday < 30) {
      if (coachIcon) coachIcon.textContent = "🎧";
      coachTitle.textContent = "晨间基础辨音：核心单词听写";
      coachDesc.textContent = `看得懂但耳朵认不出？今天建议先完成 30 个核心单词听写（目前已完成 ${wordsToday} 词）。`;
      if (coachActionBtn) {
        coachActionBtn.textContent = `👉 去听写单词 (还差 ${30 - wordsToday} 词)`;
        coachActionBtn.onclick = () => activate("listening");
      }
    } else if (numbersToday < 10) {
      if (coachIcon) coachIcon.textContent = "🔢";
      coachTitle.textContent = "考场必拿分项：数字与日期速练";
      coachDesc.textContent = `单词听写已达标！现在做 10 题 -teen/-ty、日期与价格速听，巩固听力 Section 1。`;
      if (coachActionBtn) {
        coachActionBtn.textContent = `👉 练数字日期 (还差 ${10 - numbersToday} 题)`;
        coachActionBtn.onclick = () => activate("numberdate");
      }
    } else {
      if (coachIcon) coachIcon.textContent = "🏆";
      coachTitle.textContent = "今日基础训练已达成！进入专项突破";
      coachDesc.textContent = `单词和数字已全部完成！接下来建议进入【地图题专项】或【同义替换速练】。`;
      if (coachActionBtn) {
        coachActionBtn.textContent = "👉 攻坚地图题专项";
        coachActionBtn.onclick = () => activate("map");
      }
    }
  }

  tabs.forEach((tab) => tab.addEventListener("click", () => activate(tab.dataset.hubModule)));

  let savedModule = "listening";
  try {
    savedModule = JSON.parse(localStorage.getItem(STORAGE_KEY))?.module || "listening";
  } catch {
    savedModule = "listening";
  }
  activate(savedModule);
  setTimeout(updateDailyCoach, 200);
})();
