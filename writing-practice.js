(() => {
  "use strict";

  const STORAGE_KEY = "ielts-task1-rapid-v1";
  const DRAFTS_STORAGE_PREFIX = "ielts-task1-drafts-";

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
    practiceMode: "mini_essay" // "mini_essay" (4段式小作文工坊 · 默认) | "sentence_drill" (单句盲打)
  };

  let state = loadState();
  let currentGroup = null;
  let isSubmitted = false;

  // 小作文工坊运行态变量
  let currentPracticeMode = state.practiceMode || "mini_essay";
  let currentAngleId = "angleA"; // "angleA" | "angleB"
  let currentStepIndex = 0; // 0: intro, 1: overview, 2: body1, 3: body2
  let currentEssayDrafts = { intro: "", overview: "", body1: "", body2: "" };
  let isStepReferenceVisible = false;
  let isFullModelEssayVisible = false;

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved) return structuredClone(defaultState);

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
        _legacyCompletedGroups: rawGroups
      };
    } catch {
      return structuredClone(defaultState);
    }
  }

  function saveState() {
    state.practiceMode = currentPracticeMode;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateSummary();
  }

  function loadGroupDrafts(groupId) {
    try {
      const saved = localStorage.getItem(DRAFTS_STORAGE_PREFIX + groupId);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return { intro: "", overview: "", body1: "", body2: "" };
  }

  function saveGroupDrafts(groupId, drafts) {
    try {
      localStorage.setItem(DRAFTS_STORAGE_PREFIX + groupId, JSON.stringify(drafts));
    } catch {}
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

    currentStepIndex = 0;
    currentAngleId = "angleA";
    isStepReferenceVisible = false;
    isFullModelEssayVisible = false;
    currentEssayDrafts = loadGroupDrafts(currentGroup.id);

    renderGroupQuestions(currentGroup);
  }

  function renderGroupQuestions(group) {
    isSubmitted = false;
    ui.form.classList.remove("submitted");
    ui.formMessage.textContent = "";
    ui.submitButton.disabled = false;
    ui.nextButton.hidden = true;

    const qFirst = group.questions[0].number;
    const qLast = group.questions.at(-1).number;
    ui.batchLabel.textContent = `${group.label}（第 ${qFirst}–${qLast} 题）`;

    // 获取本题组的视觉图表与小作文模型
    const scaffoldConfig = (typeof window !== "undefined" && window.Task1VisualScaffolds)
      ? window.Task1VisualScaffolds.getVisualScaffoldForGroup(group)
      : null;

    const miniEssay = scaffoldConfig?.miniEssay ||
      (typeof window !== "undefined" && window.Task1MiniEssayModels
        ? window.Task1MiniEssayModels.getMiniEssayForGroup(group.id, group)
        : null);

    // 渲染动态原生 SVG 图表
    const chartHtml = (typeof window !== "undefined" && window.Task1ChartRenderer && scaffoldConfig)
      ? window.Task1ChartRenderer.renderChart(scaffoldConfig)
      : "";

    if (currentPracticeMode === "mini_essay" && miniEssay) {
      // 模式 A：四段式小作文沉浸工坊 (Mini-Essay Workbench)
      renderMiniEssayWorkbench(group, scaffoldConfig, miniEssay, chartHtml);
      // 隐藏旧版底部的全局提交按钮（由小作文工坊内置的操作栏接管）
      ui.submitButton.hidden = true;
      if (ui.toggleAllBtn) ui.toggleAllBtn.hidden = true;
    } else {
      // 模式 B：传统 5 句单句练习 (Sentence Drill)
      renderLegacySentenceDrill(group, scaffoldConfig, chartHtml);
      ui.submitButton.hidden = false;
      if (ui.toggleAllBtn) {
        ui.toggleAllBtn.hidden = false;
        ui.toggleAllBtn.textContent = "全部展开英文";
      }
    }
  }

  // =========================================================================
  // 核心模式：Task 1 四段式小作文沉浸工坊
  // =========================================================================

  function renderMiniEssayWorkbench(group, scaffoldConfig, miniEssay, chartHtml) {
    const thinkingAngles = miniEssay.thinkingAngles || {};
    const angleA = thinkingAngles.angleA || { label: "思路 A", concept: "常规宏观划分", overviewLogic: "", body1Logic: "", body2Logic: "", highlightElements: [] };
    const angleB = thinkingAngles.angleB || { label: "思路 B", concept: "功能属性划分", overviewLogic: "", body1Logic: "", body2Logic: "", highlightElements: [] };
    const activeAngle = currentAngleId === "angleB" ? angleB : angleA;

    const steps = miniEssay.paragraphSteps || [];
    const currentStep = steps[currentStepIndex] || steps[0];

    // 实战高频语块库 (融合全局通用与题组专属)
    const globalChunks = scaffoldConfig?.functionalChunks || (window.Task1MiniEssayModels?.GLOBAL_FUNCTIONAL_CHUNKS || []);
    const groupSynonyms = scaffoldConfig?.synonymGroups || [];

    // 合成小作文状态与字数
    const synthesized = window.Task1MiniEssayModels
      ? window.Task1MiniEssayModels.synthesizeEssay(currentEssayDrafts)
      : { fullText: Object.values(currentEssayDrafts).filter(Boolean).join("\n\n"), wordCount: 0, healthStatus: "short" };

    const wordCountLabels = {
      short: "篇幅偏短 (建议 ≥130 词)",
      ideal: "✓ 字数理想 (130–170 词)",
      long: "偏长 (注意考场控时)"
    };

    // 1. 左侧思维选择与语块抽屉
    const thinkingCardHtml = `
      <div class="thinking-angles-card">
        <div class="thinking-header">
          <span class="thinking-title">💡 写作思路选择与看图分段</span>
          <span class="thinking-tip">点击切换构思视角，图表联动高亮</span>
        </div>
        <div class="thinking-tabs-row">
          <button type="button" class="thinking-tab-btn ${currentAngleId === 'angleA' ? 'active' : ''}" data-angle-btn="angleA">
            <span>${escapeHtml(angleA.label)}</span>
          </button>
          <button type="button" class="thinking-tab-btn ${currentAngleId === 'angleB' ? 'active' : ''}" data-angle-btn="angleB">
            <span>${escapeHtml(angleB.label)}</span>
          </button>
        </div>
        <div class="thinking-concept-desc">
          <p style="margin:0 0 6px;"><strong>🎯 本思路要点：</strong>${escapeHtml(activeAngle.concept)}</p>
          <div class="thinking-flow-mini">
            <div><b>• Overview 抓取：</b>${escapeHtml(activeAngle.overviewLogic)}</div>
            <div><b>• 主体一段归类：</b>${escapeHtml(activeAngle.body1Logic)}</div>
            <div><b>• 主体二段归类：</b>${escapeHtml(activeAngle.body2Logic)}</div>
          </div>
        </div>
      </div>
    `;

    const functionalChunksHtml = `
      <div class="synonym-drawer card-panel" style="margin-top:12px;">
        <div class="synonym-drawer-header" style="margin-bottom:8px;">
          <span class="synonym-title">📚 高频实战语块库 (点击直接插入输入框)</span>
        </div>
        <div class="synonym-groups-wrap">
          ${globalChunks.map((grp) => `
            <div class="synonym-group-block" style="margin-bottom:10px;">
              <span class="synonym-cat-tag">${grp.icon || '📌'} ${escapeHtml(grp.category)}</span>
              <div class="synonym-chips-row">
                ${grp.words.map((w) => `
                  <button type="button" class="synonym-chip" data-insert-text="${escapeHtml(w.en)}" title="${escapeHtml(w.note || '')}">
                    <span>${escapeHtml(w.en)}</span>
                    <span class="chip-note">${escapeHtml(w.note || '')}</span>
                  </button>
                `).join("")}
              </div>
            </div>
          `).join("")}

          ${groupSynonyms.length > 0 ? `
            <div class="synonym-group-block">
              <span class="synonym-cat-tag">🔍 本题核心词汇与替换</span>
              <div class="synonym-chips-row">
                ${groupSynonyms.flatMap(g => g.words).map((w) => `
                  <button type="button" class="synonym-chip" data-insert-text="${escapeHtml(w.en)}" title="${escapeHtml(w.note || '')}">
                    <span>${escapeHtml(w.en)}</span>
                    <span class="chip-note">${escapeHtml(w.note || '')}</span>
                  </button>
                `).join("")}
              </div>
            </div>
          ` : ""}
        </div>
      </div>
    `;

    // 2. 右侧四步步进卡片与当前段落
    const stepperPillsHtml = steps.map((s, idx) => {
      const isDone = (currentEssayDrafts[s.stepId] || "").trim().length > 8;
      let cls = "";
      if (idx === currentStepIndex) cls = "active";
      else if (isDone) cls = "completed";
      return `
        <button type="button" class="mini-essay-step-btn ${cls}" data-goto-step="${idx}">
          <span class="step-btn-num">${isDone ? '✓ ' : ''}Step ${idx + 1}</span>
          <span class="step-btn-title">${s.stepId === 'intro' ? '1.引言改写' : s.stepId === 'overview' ? '2.宏观Overview' : s.stepId === 'body1' ? '3.主体一段' : '4.主体二段'}</span>
        </button>
      `;
    }).join("");

    const currentDraftText = currentEssayDrafts[currentStep.stepId] || "";

    const activeStepCardHtml = `
      <div class="paragraph-workshop-card">
        <div class="paragraph-header-row">
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="badge" style="font-size:13px;font-weight:800;background:#ede8e1;">${escapeHtml(currentStep.title)}</span>
            <span class="writing-role-tag">${escapeHtml(currentStep.role)}</span>
          </div>
          <span style="font-size:12px;color:var(--muted);">段落 ${currentStepIndex + 1} / 4</span>
        </div>

        <div class="writing-strategy-box">
          <strong>💡 考官思维点拨：</strong>${escapeHtml(currentStep.strategyTip)}
        </div>

        <div class="paragraph-prompt-label">📝 构思写作意图与目标：</div>
        <div class="paragraph-prompt-text">
          ${escapeHtml(currentStep.chinesePrompt)}
        </div>

        <label class="answer-label" for="miniEssayTextarea" style="font-size:12px;color:var(--muted);margin-bottom:6px;">
          英文键盘盲打输入（可点击左侧高频语块一键填入，按 <code>Ctrl+Enter</code> 推进）：
        </label>
        <textarea id="miniEssayTextarea"
                  class="mini-essay-textarea"
                  placeholder="根据中文意图输入地道英文表达 (例如引用左侧搭配词)..."
                  spellcheck="false">${escapeHtml(currentDraftText)}</textarea>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;flex-wrap:wrap;gap:8px;">
          <div>
            <button type="button" id="toggleStepRefBtn" class="text-button" style="font-size:12.5px;">
              ${isStepReferenceVisible ? '🙈 隐藏参考示范' : '💡 查看考官级参考示范'}
            </button>
          </div>
          <div style="display:flex;gap:8px;">
            <button type="button" id="prevStepBtn" class="secondary compact" ${currentStepIndex === 0 ? 'disabled' : ''}>
              ◀ 上一段
            </button>
            <button type="button" id="nextStepBtn" class="primary compact">
              ${currentStepIndex === 3 ? '🎉 完成四段合成' : '确认并推进下一段 ➔'}
            </button>
          </div>
        </div>

        <!-- 考官级示范参考抽屉 -->
        <div id="stepReferenceBox" style="margin-top:14px;padding:12px 14px;background:#fdfaf6;border:1.5px dashed #d8cbbe;border-radius:8px;${isStepReferenceVisible ? '' : 'display:none;'}">
          <div style="font-size:12px;font-weight:700;color:#8a4b08;margin-bottom:4px;">🌟 考官级标准范式参考：</div>
          <div style="font-size:14.5px;color:var(--ink);font-weight:600;font-family:Georgia, serif;line-height:1.5;">
            ${escapeHtml(currentStep.canonicalAnswer)}
          </div>
          ${currentStep.acceptableVariants && currentStep.acceptableVariants.length ? `
            <div style="font-size:12px;color:var(--muted);margin-top:6px;">
              <b>可选替代句式：</b>${escapeHtml(currentStep.acceptableVariants.join(" / "))}
            </div>
          ` : ""}
          <div style="margin-top:8px;">
            <button type="button" id="copyStepRefBtn" class="secondary compact" style="font-size:11.5px;padding:3px 8px;">
              📋 将此示范填入输入框
            </button>
          </div>
        </div>
      </div>
    `;

    // 3. 实时小作文合成板
    const stepLabels = ["引言", "Overview", "主体一", "主体二"];
    const formattedParagraphsHtml = steps.map((s, idx) => {
      const text = (currentEssayDrafts[s.stepId] || "").trim();
      if (text) {
        return `<p style="margin:0 0 12px;">${escapeHtml(text)}</p>`;
      }
      return `<p class="live-essay-placeholder" style="margin:0 0 12px;">[ 第 ${idx + 1} 段待撰写：${stepLabels[idx]} · ${escapeHtml(s.role)} ]</p>`;
    }).join("");

    const liveCanvasHtml = `
      <div class="live-essay-canvas">
        <div class="live-essay-header">
          <div class="live-essay-title-wrap">
            <span style="font-size:16px;">📋</span>
            <strong style="font-size:14px;color:var(--ink);">实时小作文合成板 (Live Mini-Essay Canvas)</strong>
            <span class="word-count-badge ${synthesized.healthStatus}">
              ${synthesized.wordCount} 词 · ${wordCountLabels[synthesized.healthStatus]}
            </span>
          </div>
          <div style="display:flex;gap:8px;">
            <button type="button" id="copyFullEssayBtn" class="secondary compact" style="font-size:12px;">
              📋 复制完整小作文
            </button>
            <button type="button" id="toggleModelEssayBtn" class="secondary compact" style="font-size:12px;">
              ${isFullModelEssayVisible ? '收起完整范文' : '👁️ 对照完整范文'}
            </button>
          </div>
        </div>

        <div class="live-essay-body">
          ${formattedParagraphsHtml}
        </div>

        <!-- 全文范文对照区 -->
        <div id="fullModelEssayDrawer" style="margin-top:14px;padding:16px;background:#f0fdf4;border:1.5px solid #86efac;border-radius:10px;${isFullModelEssayVisible ? '' : 'display:none;'}">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <strong style="color:#166534;font-size:14px;">🏆 考官级 4 段标准微型小作文对照</strong>
            <span style="font-size:12px;color:#15803d;">结构完备 · Overview 抓取到位 · 语流连贯</span>
          </div>
          <div style="font-family:Georgia, serif;font-size:14px;line-height:1.7;color:#14532d;white-space:pre-wrap;">
${escapeHtml(steps.map(s => s.canonicalAnswer).join("\n\n"))}
          </div>
        </div>
      </div>
    `;

    // 组合双栏工作台布局
    ui.groups.innerHTML = `
      <!-- 顶部模式切换开关 -->
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:12px;padding:4px 2px;">
        <div class="mode-toggle-group">
          <button type="button" class="mode-toggle-btn active" data-switch-mode="mini_essay">
            📝 四段式小作文工坊 (推荐)
          </button>
          <button type="button" class="mode-toggle-btn" data-switch-mode="sentence_drill">
            ⚡ 5句快速翻译打卡
          </button>
        </div>
        <span style="font-size:12px;color:var(--muted);">
          模式：<b>双思维解析 + 4段沉浸撰写 + 实时合成</b>
        </span>
      </div>

      <div class="task1-workbench-layout">
        <!-- 左侧视读看板：真题图表 + 双思维切入 + 实战语块抽屉 -->
        <aside class="task1-workbench-sidebar">
          ${chartHtml}
          ${thinkingCardHtml}
          ${functionalChunksHtml}
        </aside>

        <!-- 右侧作答区：4步沉浸步进 + 实时小作文合成板 -->
        <main class="task1-workbench-main">
          <div class="mini-essay-stepper">
            ${stepperPillsHtml}
          </div>
          ${activeStepCardHtml}
          ${liveCanvasHtml}
        </main>
      </div>
    `;

    bindMiniEssayEvents(group, scaffoldConfig, miniEssay);
  }

  function bindMiniEssayEvents(group, scaffoldConfig, miniEssay) {
    const steps = miniEssay.paragraphSteps || [];
    const currentStep = steps[currentStepIndex] || steps[0];

    // 模式切换
    ui.groups.querySelectorAll("[data-switch-mode]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const targetMode = e.currentTarget.dataset.switchMode;
        if (targetMode && targetMode !== currentPracticeMode) {
          currentPracticeMode = targetMode;
          saveState();
          renderGroupQuestions(group);
        }
      });
    });

    // 思维视角切换 (思路 A vs 思路 B)
    ui.groups.querySelectorAll("[data-angle-btn]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const aid = e.currentTarget.dataset.angleBtn;
        if (aid && aid !== currentAngleId) {
          currentAngleId = aid;
          renderGroupQuestions(group);

          // 联动高亮图表元素
          const activeAngle = miniEssay.thinkingAngles?.[currentAngleId];
          if (activeAngle && window.Task1ChartRenderer && activeAngle.highlightElements?.length) {
            window.Task1ChartRenderer.highlightElements(activeAngle.highlightElements);
          }
        }
      });
    });

    // 步进导航点击
    ui.groups.querySelectorAll("[data-goto-step]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const stepIdx = parseInt(e.currentTarget.dataset.gotoStep, 10);
        if (!isNaN(stepIdx) && stepIdx >= 0 && stepIdx < steps.length) {
          currentStepIndex = stepIdx;
          isStepReferenceVisible = false;
          renderGroupQuestions(group);
        }
      });
    });

    // 文本框输入即时响应与自动保存
    const textarea = document.getElementById("miniEssayTextarea");
    if (textarea) {
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);

      textarea.addEventListener("input", (e) => {
        currentEssayDrafts[currentStep.stepId] = e.target.value;
        saveGroupDrafts(group.id, currentEssayDrafts);
        updateLiveEssayCanvas(miniEssay);
      });

      textarea.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          advanceToNextStep(group, miniEssay);
        }
      });
    }

    // 上一段 / 下一段按钮
    const prevBtn = document.getElementById("prevStepBtn");
    const nextBtn = document.getElementById("nextStepBtn");

    prevBtn?.addEventListener("click", () => {
      if (currentStepIndex > 0) {
        currentStepIndex--;
        isStepReferenceVisible = false;
        renderGroupQuestions(group);
      }
    });

    nextBtn?.addEventListener("click", () => {
      advanceToNextStep(group, miniEssay);
    });

    // 显现参考范例
    const toggleStepRefBtn = document.getElementById("toggleStepRefBtn");
    const stepRefBox = document.getElementById("stepReferenceBox");
    toggleStepRefBtn?.addEventListener("click", () => {
      isStepReferenceVisible = !isStepReferenceVisible;
      if (stepRefBox) stepRefBox.style.display = isStepReferenceVisible ? "block" : "none";
      if (toggleStepRefBtn) toggleStepRefBtn.textContent = isStepReferenceVisible ? "🙈 隐藏参考示范" : "💡 查看考官级参考示范";
    });

    // 复制单步示范入框
    const copyStepRefBtn = document.getElementById("copyStepRefBtn");
    copyStepRefBtn?.addEventListener("click", () => {
      if (textarea) {
        textarea.value = currentStep.canonicalAnswer;
        currentEssayDrafts[currentStep.stepId] = currentStep.canonicalAnswer;
        saveGroupDrafts(group.id, currentEssayDrafts);
        updateLiveEssayCanvas(miniEssay);
        textarea.focus();
      }
    });

    // 语块抽屉点击插入输入框
    ui.groups.querySelectorAll("[data-insert-text]").forEach((chip) => {
      chip.addEventListener("click", (e) => {
        const textToInsert = e.currentTarget.dataset.insertText;
        if (!textToInsert) return;

        if (textarea) {
          const start = textarea.selectionStart ?? textarea.value.length;
          const end = textarea.selectionEnd ?? textarea.value.length;
          const val = textarea.value;
          const needsSpace = start > 0 && val[start - 1] !== " " && val[start - 1] !== "\n";
          const insertContent = (needsSpace ? " " : "") + textToInsert + " ";

          textarea.value = val.slice(0, start) + insertContent + val.slice(end);
          currentEssayDrafts[currentStep.stepId] = textarea.value;
          saveGroupDrafts(group.id, currentEssayDrafts);
          updateLiveEssayCanvas(miniEssay);

          textarea.focus();
          const newPos = start + insertContent.length;
          textarea.setSelectionRange(newPos, newPos);
        }
      });
    });

    // 复制完整小作文
    const copyFullBtn = document.getElementById("copyFullEssayBtn");
    copyFullBtn?.addEventListener("click", () => {
      const syn = window.Task1MiniEssayModels.synthesizeEssay(currentEssayDrafts);
      if (navigator.clipboard) {
        navigator.clipboard.writeText(syn.fullText).then(() => {
          alert(`📋 完整 4 段小作文（共 ${syn.wordCount} 词）已成功复制到剪贴板！可以直接粘贴提交。`);
        });
      } else {
        alert(syn.fullText);
      }
    });

    // 切换完整范文展开
    const toggleModelBtn = document.getElementById("toggleModelEssayBtn");
    const fullModelDrawer = document.getElementById("fullModelEssayDrawer");
    toggleModelBtn?.addEventListener("click", () => {
      isFullModelEssayVisible = !isFullModelEssayVisible;
      if (fullModelDrawer) fullModelDrawer.style.display = isFullModelEssayVisible ? "block" : "none";
      if (toggleModelBtn) toggleModelBtn.textContent = isFullModelEssayVisible ? "收起完整范文" : "👁️ 对照完整范文";
    });
  }

  function advanceToNextStep(group, miniEssay) {
    const steps = miniEssay.paragraphSteps || [];
    if (currentStepIndex < steps.length - 1) {
      currentStepIndex++;
      isStepReferenceVisible = false;
      renderGroupQuestions(group);
    } else {
      // 4 段全部完成 ➔ 标记题组完成并展示祝贺
      if (!state.completedGroups.includes(group.id)) {
        state.completedGroups.push(group.id);
        saveState();
        populateGroupSelect();
        ui.groupSelect.value = group.id;
      }
      const syn = window.Task1MiniEssayModels.synthesizeEssay(currentEssayDrafts);
      alert(`🎉 恭喜！本题组四段式小作文已全部完成！\n\n总词数：${syn.wordCount} 词（${syn.wordCount >= 130 ? '达标' : '建议适当丰富细节'}）。\n可点击「复制完整小作文」进行留存，或选择下一题组继续挑战！`);
    }
  }

  function updateLiveEssayCanvas(miniEssay) {
    const syn = window.Task1MiniEssayModels
      ? window.Task1MiniEssayModels.synthesizeEssay(currentEssayDrafts)
      : { wordCount: 0, healthStatus: "short" };

    const badge = ui.groups.querySelector(".word-count-badge");
    if (badge) {
      badge.className = `word-count-badge ${syn.healthStatus}`;
      const labels = { short: "篇幅偏短 (建议 ≥130 词)", ideal: "✓ 字数理想 (130–170 词)", long: "偏长 (注意控时)" };
      badge.textContent = `${syn.wordCount} 词 · ${labels[syn.healthStatus]}`;
    }

    const liveBody = ui.groups.querySelector(".live-essay-body");
    if (liveBody && miniEssay) {
      const steps = miniEssay.paragraphSteps || [];
      const stepLabels = ["引言", "Overview", "主体一", "主体二"];
      liveBody.innerHTML = steps.map((s, idx) => {
        const text = (currentEssayDrafts[s.stepId] || "").trim();
        if (text) return `<p style="margin:0 0 12px;">${escapeHtml(text)}</p>`;
        return `<p class="live-essay-placeholder" style="margin:0 0 12px;">[ 第 ${idx + 1} 段待撰写：${stepLabels[idx]} · ${escapeHtml(s.role)} ]</p>`;
      }).join("");
    }
  }

  // =========================================================================
  // 兼容模式：传统 5 句快速翻译盲打 (Legacy Sentence Drill)
  // =========================================================================

  function renderLegacySentenceDrill(group, scaffoldConfig, chartHtml) {
    const synonymGroups = scaffoldConfig?.synonymGroups || [];
    const synonymsHtml = synonymGroups.length > 0 ? `
      <div class="synonym-drawer card-panel">
        <div class="synonym-drawer-header">
          <span class="synonym-title">📚 高频学术替换词库 (点击直接填入输入框)</span>
        </div>
        <div class="synonym-groups-wrap">
          ${synonymGroups.map((grp) => `
            <div class="synonym-group-block">
              <span class="synonym-cat-tag">${escapeHtml(grp.category)}</span>
              <div class="synonym-chips-row">
                ${grp.words.map((w) => `
                  <button type="button" class="synonym-chip" data-word="${escapeHtml(w.en)}" title="${escapeHtml(w.note || '')}">
                    <span>${escapeHtml(w.en)}</span>
                    <span class="chip-note">${escapeHtml(w.note || '')}</span>
                  </button>
                `).join("")}
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    ` : "";

    ui.groups.innerHTML = `
      <!-- 顶部模式切换开关 -->
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:12px;padding:4px 2px;">
        <div class="mode-toggle-group">
          <button type="button" class="mode-toggle-btn" data-switch-mode="mini_essay">
            📝 四段式小作文工坊 (推荐)
          </button>
          <button type="button" class="mode-toggle-btn active" data-switch-mode="sentence_drill">
            ⚡ 5句快速翻译打卡
          </button>
        </div>
        <span style="font-size:12px;color:var(--muted);">
          模式：<b>5句基础单句输入盲打与模糊匹配</b>
        </span>
      </div>

      <div class="task1-workbench-layout">
        <aside class="task1-workbench-sidebar">
          ${chartHtml}
          ${synonymsHtml}
        </aside>

        <main class="task1-workbench-main">
          <section class="group-card card-panel">
            <header class="group-header">
              <div class="group-header-top">
                <span class="group-module-tag">${escapeHtml(group.moduleName || "雅思 Task 1 核心表达")}</span>
                <span class="badge">${group.label}</span>
              </div>
              <h3 style="margin:4px 0 0;font-size:16px;color:var(--ink);font-weight:800;">${escapeHtml(group.moduleName || "")} · ${group.label}</h3>
              ${group.context ? `
                <div class="group-context-pill">
                  <span class="context-icon">📊</span>
                  <span class="context-text"><strong>图表考点背景：</strong>${escapeHtml(group.context)}</span>
                </div>
              ` : ""}
            </header>

            <div class="questions-list">
              ${group.questions.map((q) => {
                const rel = (scaffoldConfig?.relations || []).find((r) => r.qNumber === q.number);
                const relTargets = rel ? JSON.stringify(rel.targets || []) : "[]";
                return `
                  <article class="question-row" data-qid="${q.number}" data-relation-targets="${escapeHtml(relTargets)}">
                    <div class="q-header">
                      <div class="q-title-wrap">
                        <span class="q-num">#${q.number}</span>
                        <div class="q-title-box">
                          <p class="q-cn">${escapeHtml(q.chinese)}</p>
                          ${rel ? `
                            <div class="q-relation-pill" title="${escapeHtml(rel.desc || '')}">
                              <span class="rel-badge">${escapeHtml(rel.badge)}</span>
                              <span class="rel-trigger">${escapeHtml(rel.trigger)}</span>
                            </div>
                          ` : ""}
                        </div>
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
                `;
              }).join("")}
            </div>

            ${group.note ? `
              <footer class="group-note">
                <strong>💡 高分提炼 / 易错分析：</strong>${escapeHtml(group.note)}
              </footer>
            ` : ""}
          </section>
        </main>
      </div>
    `;

    // 模式切换事件
    ui.groups.querySelectorAll("[data-switch-mode]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const targetMode = e.currentTarget.dataset.switchMode;
        if (targetMode && targetMode !== currentPracticeMode) {
          currentPracticeMode = targetMode;
          saveState();
          renderGroupQuestions(group);
        }
      });
    });

    // 绑定模糊卡片点击
    const blurBoxes = ui.groups.querySelectorAll(".q-blur-box");
    blurBoxes.forEach((box) => {
      box.addEventListener("click", () => {
        const isRevealed = box.classList.toggle("revealed");
        const statusEl = box.querySelector(".blur-status");
        if (statusEl) statusEl.textContent = isRevealed ? "点击遮住" : "点击显现";
        updateToggleAllButtonText();
      });
    });

    // 绑定题目行与图表联动高亮
    const questionRows = ui.groups.querySelectorAll(".question-row");
    questionRows.forEach((row) => {
      let targets = [];
      try { targets = JSON.parse(row.dataset.relationTargets || "[]"); } catch {}

      const triggerHighlight = () => {
        questionRows.forEach((r) => r.classList.remove("active-row"));
        row.classList.add("active-row");
        if (window.Task1ChartRenderer && targets.length) {
          window.Task1ChartRenderer.highlightElements(targets);
        }
      };

      const clearHighlight = () => {
        if (!row.querySelector(".writing-input:focus") && window.Task1ChartRenderer) {
          window.Task1ChartRenderer.clearHighlights();
        }
      };

      row.addEventListener("mouseenter", triggerHighlight);
      row.addEventListener("mouseleave", clearHighlight);

      const inputEl = row.querySelector(".writing-input");
      inputEl?.addEventListener("focus", triggerHighlight);
      inputEl?.addEventListener("blur", clearHighlight);
    });

    // 绑定回车切题
    const inputs = ui.groups.querySelectorAll(".writing-input");
    inputs.forEach((input, idx) => {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (idx < inputs.length - 1) inputs[idx + 1].focus();
          else submitBatch();
        }
      });
    });

    // 绑定词块填入
    ui.groups.querySelectorAll(".synonym-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const word = chip.dataset.word;
        if (!word) return;
        const activeInput = ui.groups.querySelector(".writing-input:focus") ||
                            ui.groups.querySelector(".question-row.active-row .writing-input") ||
                            ui.groups.querySelector(".writing-input");
        if (activeInput) {
          const start = activeInput.selectionStart ?? activeInput.value.length;
          const end = activeInput.selectionEnd ?? activeInput.value.length;
          const val = activeInput.value;
          const needsLeadingSpace = start > 0 && val[start - 1] !== " ";
          const insertText = (needsLeadingSpace ? " " : "") + word + " ";
          activeInput.value = val.slice(0, start) + insertText + val.slice(end);
          activeInput.focus();
          const newPos = start + insertText.length;
          activeInput.setSelectionRange(newPos, newPos);
        }
      });
    });

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
        input.readOnly = true;
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
    ui.nextButton.focus();
  }

  function moveToNextGroup() {
    const currentIdx = data.groups.findIndex((g) => g.id === currentGroup.id);
    const nextIdx = currentIdx + 1;

    if (nextIdx < data.groups.length) {
      const nextGroup = data.groups[nextIdx];
      if (nextGroup.moduleId !== state.activeModuleId) {
        state.activeModuleId = nextGroup.moduleId;
        saveState();
        renderModuleNav();
        populateGroupSelect();
      }
      ui.groupSelect.value = nextGroup.id;
      loadGroupFromSelect();
    } else {
      alert("🎉 恭喜！全部 7 大模块雅思 Task 1 练习已全部通关！");
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

  // 全局键盘回车跳题
  document.addEventListener("keydown", (e) => {
    const writingSection = document.getElementById("writingModule");
    if (!writingSection || writingSection.hidden) return;

    if (isSubmitted && e.key === "Enter") {
      if (document.activeElement === ui.nextButton) return;
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
