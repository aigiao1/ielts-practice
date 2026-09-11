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
  }

  tabs.forEach((tab) => tab.addEventListener("click", () => activate(tab.dataset.hubModule)));

  let savedModule = "listening";
  try {
    savedModule = JSON.parse(localStorage.getItem(STORAGE_KEY))?.module || "listening";
  } catch {
    savedModule = "listening";
  }
  activate(savedModule);
})();
