(() => {
  "use strict";

  const STORAGE_KEY = "ielts-task1-rapid-v1";

  // 映射表：将旧 154 版中的题组 ID 平滑映射到新标准 140 版题组 ID (依约束#6)
  const LEGACY_TO_CANONICAL_GROUP_MAP = {
    "m1-g1": "task1-group-01", "m1-g2": "task1-group-02", "m1-g3": "task1-group-03", "m1-g4": "task1-group-04",
    "m2-g1": "task1-group-05", "m2-g2": "task1-group-06", "m2-g3": "task1-group-07", "m2-g4": "task1-group-08",
    "m3-g1": "task1-group-09", "m3-g2": "task1-group-09", "m3-g3": "task1-group-10", "m3-g4": "task1-group-11",
    "m3-g5": "task1-group-11", "m3-g6": "task1-group-12", "m3-g7": "task1-group-12", "m4-g1": "task1-group-13",
    "m4-g2": "task1-group-14", "m4-g3": "task1-group-15", "m4-g4": "task1-group-16", "m5-g1": "task1-group-17",
    "m5-g2": "task1-group-18", "m5-g3": "task1-group-19", "m5-g4": "task1-group-20", "m6-g1": "task1-group-21",
    "m6-g2": "task1-group-22", "m6-g3": "task1-group-23", "m6-g4": "task1-group-24", "m7-g1": "task1-group-25",
    "m7-g2": "task1-group-26", "m7-g3": "task1-group-27", "m7-g4": "task1-group-28"
  };

  // 优先加载 ContentRegistry 中的 Canonical Task 1 Pack (标准 140 题)，平滑回退至全局变量
  const canonicalPack = (typeof window !== "undefined" && window.ContentRegistry?.getCanonicalPack("writing", "task1")) ||
                        (typeof window !== "undefined" ? window.TASK1_WORKBOOK_PACK_V1 : null);
  const data = canonicalPack || (typeof window !== "undefined" ? window.TASK1_RAPID_DATA : null) || { modules: [], groups: [] };

  // 确保 groups 拍平且附带 moduleId 和 moduleName
  if (!data.groups || !data.groups.length) {
    data.groups = (data.modules || []).flatMap((m) =>
      (m.groups || []).map((g) => ({ ...g, moduleId: m.id, moduleName: m.name }))
    );
  }

  const $ = (id) => document.getElementById(id);
  const ui = {
    moduleNav: $("moduleNav"),
    completedQuestions: $("writingCompletedQuestions"),
    completedGroups: $("writingCompletedGroups"),
    totalQuestions: $("writingTotalQuestions"),
    resumeAt: $("writingResumeAt"),
    groupSelect: $("writingGroupSelect"),
    continueButton: $("writingContinueButton"),
    form: $("writingBatchForm"),
    groups: $("writingGroups"),
    formMessage: $("writingFormMessage"),
    batchLabel: $("writingBatchLabel"),
    submitButton: $("writingSubmitButton"),
    nextButton: $("writingNextButton"),
    toggleAllBtn: $("writingToggleAllBtn"),
    activeModuleTitle: $("activeModuleTitle"),
    activeModuleRange: $("activeModuleRange"),
  };

  const defaultState = {
    activeModuleId: "module-1",
    completedGroups: [],
  };

  let state = loadState();
  let currentGroup = null;
  let isSubmitted = false;

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved) return structuredClone(defaultState);

      // 依约束#6：自动将历史 completedGroups 中的旧 ID 平滑映射到新版题组 ID，无法映射的保留在 _legacyCompletedGroups
      const rawGroups = saved.completedGroups || [];
      const canonicalGroupIds = new Set((data.groups || []).map((g) => g.id));
      const migrated = new Set();

      for (const id of rawGroups) {
        if (LEGACY_TO_CANONICAL_GROUP_MAP[id]) {
          migrated.add(LEGACY_TO_CANONICAL_GROUP_MAP[id]);
        } else if (canonicalGroupIds.has(id)) {
          migrated.add(id);
        }
      }

      return {
        ...defaultState,
        ...saved,
        completedGroups: Array.from(migrated),
        _legacyCompletedGroups: rawGroups // 保留旧数据，不破坏
      };
    } catch {
      return structuredClone(defaultState);
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateSummary();
  }

  function renderModuleNav() {
    if (!ui.moduleNav) return;
    ui.moduleNav.innerHTML = "";
    (data.modules || []).forEach((mod) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `writing-tab${mod.id === state.activeModuleId ? " active" : ""}`;
      btn.dataset.moduleId = mod.id;
      btn.textContent = `${mod.name}（${mod.range}）`;
      btn.addEventListener("click", () => setActiveModule(mod.id));
      ui.moduleNav.append(btn);
    });
  }

  function setActiveModule(moduleId) {
    state.activeModuleId = moduleId;
    saveState();

    ui.moduleNav.querySelectorAll(".writing-tab").forEach((tab) => {
      const active = tab.dataset.moduleId === moduleId;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
    });

    const mod = (data.modules || []).find((m) => m.id === moduleId);
    if (mod) {
      if (ui.activeModuleTitle) ui.activeModuleTitle.textContent = mod.name;
      if (ui.activeModuleRange) ui.activeModuleRange.textContent = `第 ${mod.range} 题`;
    }

    populateGroupSelect();
    loadGroupFromSelect();
  }

  function populateGroupSelect() {
    const moduleGroups = data.groups.filter((g) => g.moduleId === state.activeModuleId);
    ui.groupSelect.innerHTML = "";

    moduleGroups.forEach((g) => {
      const done = state.completedGroups.includes(g.id) ? "✓ " : "";
      const qFirst = g.questions[0].number;
      const qLast = g.questions.at(-1).number;
      const opt = new Option(`${done}${g.label}（${qFirst}–${qLast}）`, g.id);
      ui.groupSelect.add(opt);
    });

    // 默认选择当前模块下第一个未完成的题组
    const uncompleted = moduleGroups.find((g) => !state.completedGroups.includes(g.id));
    if (uncompleted) {
      ui.groupSelect.value = uncompleted.id;
    } else if (moduleGroups.length) {
      ui.groupSelect.value = moduleGroups[0].id;
    }
  }

  function loadGroupFromSelect() {
    const groupId = ui.groupSelect.value;
    currentGroup = data.groups.find((g) => g.id === groupId) || data.groups[0];
    if (!currentGroup) return;

    renderGroupQuestions(currentGroup);
  }

  function renderGroupQuestions(group) {
    isSubmitted = false;
    ui.form.classList.remove("submitted");
    ui.formMessage.textContent = "";
    ui.submitButton.disabled = false;
    ui.nextButton.hidden = true;
    if (ui.toggleAllBtn) {
      ui.toggleAllBtn.textContent = "全部展开英文";
    }

    const qFirst = group.questions[0].number;
    const qLast = group.questions.at(-1).number;
    ui.batchLabel.textContent = `${group.label}（第 ${qFirst}–${qLast} 题）`;

    ui.groups.innerHTML = `
      <section class="group-card card-panel">
        <header class="group-header">
          <div class="group-header-top">
            <span class="group-module-tag">${escapeHtml(group.moduleName || "雅思 Task 1 核心表达")}</span>
            <span class="badge">${group.label}</span>
          </div>
          <h3 style="margin:4px 0 0;font-size:16px;color:var(--ink);font-weight:800;">${escapeHtml(group.moduleName || "")} · ${group.label}</h3>
        </header>

        <div class="questions-list">
          ${group.questions.map((q) => `
            <article class="question-row" data-qid="${q.number}">
              <div class="q-header">
                <div class="q-title-wrap">
                  <span class="q-num">#${q.number}</span>
                  <p class="q-cn">${escapeHtml(q.chinese)}</p>
                </div>
                <div class="q-blur-box" data-blur-qid="${q.number}" title="点击显现 / 再次点击遮住">
                  <span class="blur-status">点击显现</span>
                  <span class="blur-text">${escapeHtml(q.answer)}</span>
                </div>
              </div>
              <div class="q-input-wrap">
                <input type="text"
                       class="writing-input"
                       placeholder="输入英文表达，敲 Enter 换下一题..."
                       data-input-for="${q.number}"
                       autocomplete="off"
                       spellcheck="false">
              </div>
              <div class="q-feedback-row" style="margin-top:6px;min-height:20px;">
                <span class="solution-match-tag"></span>
              </div>
            </article>
          `).join("")}
        </div>

        ${group.note ? `
          <footer class="group-note">
            <strong>💡 高分提炼 / 易错分析：</strong>${escapeHtml(group.note)}
          </footer>
        ` : ""}
      </section>
    `;

    // 绑定模糊卡片点击展开/遮住事件
    const blurBoxes = ui.groups.querySelectorAll(".q-blur-box");
    blurBoxes.forEach((box) => {
      box.addEventListener("click", () => {
        const isRevealed = box.classList.toggle("revealed");
        const statusEl = box.querySelector(".blur-status");
        if (statusEl) {
          statusEl.textContent = isRevealed ? "点击遮住" : "点击显现";
        }
        updateToggleAllButtonText();
      });
    });

    // 绑定 input 回车切题事件
    const inputs = ui.groups.querySelectorAll(".writing-input");
    inputs.forEach((input, idx) => {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (idx < inputs.length - 1) {
            inputs[idx + 1].focus();
          } else {
            submitBatch();
          }
        }
      });
    });

    // 默认聚焦第一题
    inputs[0]?.focus();
  }

  function updateToggleAllButtonText() {
    if (!ui.toggleAllBtn) return;
    const boxes = ui.groups.querySelectorAll(".q-blur-box");
    if (!boxes.length) return;
    const allRevealed = Array.from(boxes).every((b) => b.classList.contains("revealed"));
    ui.toggleAllBtn.textContent = allRevealed ? "全部遮住英文" : "全部展开英文";
  }

  function toggleAllExpressions() {
    const boxes = ui.groups.querySelectorAll(".q-blur-box");
    if (!boxes.length) return;
    const allRevealed = Array.from(boxes).every((b) => b.classList.contains("revealed"));
    const shouldReveal = !allRevealed;

    boxes.forEach((b) => {
      b.classList.toggle("revealed", shouldReveal);
      const status = b.querySelector(".blur-status");
      if (status) status.textContent = shouldReveal ? "点击遮住" : "点击显现";
    });

    if (ui.toggleAllBtn) {
      ui.toggleAllBtn.textContent = shouldReveal ? "全部遮住英文" : "全部展开英文";
    }
  }

  function checkMatch(userInput, answer) {
    const norm = (s) => s.toLowerCase().replace(/[\.,\?!'"]/g, "").replace(/\s+/g, " ").trim();
    const u = norm(userInput);
    if (!u) return false;
    const alts = answer.split("/").map((a) => norm(a.replace(/\.{2,}/g, "")));
    return alts.some((alt) => alt === u || (u.length >= 5 && (alt.includes(u) || u.includes(alt))));
  }

  function submitBatch(event) {
    if (event) event.preventDefault();
    if (!currentGroup || isSubmitted) return;

    isSubmitted = true;
    ui.form.classList.add("submitted");

    // 全显现模糊框
    ui.groups.querySelectorAll(".q-blur-box").forEach((box) => {
      box.classList.add("revealed");
      const status = box.querySelector(".blur-status");
      if (status) status.textContent = "已显现";
    });
    if (ui.toggleAllBtn) ui.toggleAllBtn.textContent = "全部遮住英文";

    // 检查输入并比对
    currentGroup.questions.forEach((q) => {
      const row = ui.groups.querySelector(`.question-row[data-qid="${q.number}"]`);
      if (!row) return;

      const input = row.querySelector(".writing-input");
      const matchTag = row.querySelector(".solution-match-tag");

      if (input) {
        input.readOnly = true; // 保持焦点且可复制，不设为 disabled
        const userVal = input.value.trim();
        const isMatched = checkMatch(userVal, q.answer);

        if (matchTag) {
          if (isMatched) {
            matchTag.className = "badge ok-badge";
            matchTag.textContent = "✓ 准确匹配";
          } else if (userVal) {
            matchTag.className = "badge";
            matchTag.style.background = "#fff2e4";
            matchTag.style.color = "#9b4b1d";
            matchTag.textContent = "请对照核查";
          } else {
            matchTag.className = "badge";
            matchTag.style.background = "#f5efe6";
            matchTag.style.color = "#8b7e70";
            matchTag.textContent = "未填写";
          }
        }
      }
    });

    // 标记题组完成
    if (!state.completedGroups.includes(currentGroup.id)) {
      state.completedGroups.push(currentGroup.id);
      saveState();
      populateGroupSelect();
      ui.groupSelect.value = currentGroup.id;
    }

    ui.submitButton.disabled = true;
    ui.nextButton.hidden = false;
    ui.formMessage.className = "writing-form-message success";
    ui.formMessage.textContent = "✔ 已显现本组必记核心表达！按 Enter 键或点击按钮即可进入下一题组。";

    // 聚焦下一题组按钮，使用户可以直接敲 Enter 前进
    ui.nextButton.focus();
  }

  function moveToNextGroup() {
    const currentIdx = data.groups.findIndex((g) => g.id === currentGroup.id);
    const nextIdx = currentIdx + 1;

    if (nextIdx < data.groups.length) {
      const nextGroup = data.groups[nextIdx];
      // 如果跨模块，自动切换模块导航
      if (nextGroup.moduleId !== state.activeModuleId) {
        state.activeModuleId = nextGroup.moduleId;
        saveState();
        renderModuleNav();
        populateGroupSelect();
      }
      ui.groupSelect.value = nextGroup.id;
      loadGroupFromSelect();
    } else {
      alert("🎉 恭喜！全部 7 大模块、154 条雅思 Task 1 必记核心表达已全部完成！");
      ui.groupSelect.value = data.groups[0].id;
      loadGroupFromSelect();
    }

    const writingModuleEl = document.getElementById("writingModule");
    if (writingModuleEl) {
      window.scrollTo({ top: writingModuleEl.offsetTop, behavior: "smooth" });
    }
  }

  function continueLastProgress() {
    const uncompleted = data.groups.find((g) => !state.completedGroups.includes(g.id)) || data.groups[0];
    if (uncompleted.moduleId !== state.activeModuleId) {
      setActiveModule(uncompleted.moduleId);
    }
    ui.groupSelect.value = uncompleted.id;
    loadGroupFromSelect();
  }

  function updateSummary() {
    const completedQ = state.completedGroups.reduce((acc, gid) => {
      const g = data.groups.find((x) => x.id === gid);
      return acc + (g ? g.questions.length : 0);
    }, 0);

    const totalQ = data.groups.reduce((acc, g) => acc + g.questions.length, 0);

    if (ui.completedGroups) ui.completedGroups.textContent = String(state.completedGroups.length);
    if (ui.completedQuestions) ui.completedQuestions.textContent = String(completedQ);
    if (ui.totalQuestions) ui.totalQuestions.textContent = String(totalQ);

    const uncompleted = data.groups.find((g) => !state.completedGroups.includes(g.id));
    if (ui.resumeAt) {
      ui.resumeAt.textContent = uncompleted ? String(uncompleted.questions[0].number) : "已全通关";
    }
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // 全局 keydown 捕获：如果在已提交状态下敲 Enter，直接进下一题组
  document.addEventListener("keydown", (e) => {
    const writingSection = document.getElementById("writingModule");
    if (!writingSection || writingSection.hidden) return;

    if (isSubmitted && e.key === "Enter") {
      if (document.activeElement === ui.nextButton) return; // 让原生 click 触发
      e.preventDefault();
      moveToNextGroup();
    }
  });

  // 事件绑定
  ui.groupSelect?.addEventListener("change", loadGroupFromSelect);
  ui.continueButton?.addEventListener("click", continueLastProgress);
  ui.toggleAllBtn?.addEventListener("click", toggleAllExpressions);
  ui.form?.addEventListener("submit", submitBatch);
  ui.nextButton?.addEventListener("click", moveToNextGroup);

  // 初始化
  renderModuleNav();
  populateGroupSelect();
  loadGroupFromSelect();
  updateSummary();
})();
