(() => {
  "use strict";

  const STORAGE_KEY = "ielts-map-training-v2";
  const $ = (id) => document.getElementById(id);

  const ui = {
    todayCount: $("mapTodayCount"),
    accuracy: $("mapAccuracy"),
    masteredCount: $("mapMasteredCount"),
    reviewCount: $("mapReviewCount"),
    subnav: $("mapSubNav"),
    modeBtns: document.querySelectorAll(".mode-tab-btn"),
    resetSessionBtn: $("mapResetSessionBtn"),

    // Submodules
    panelShapes: $("submoduleShapes"),
    panelDirections: $("submoduleDirections"),
    panelTransitions: $("submoduleTransitions"),
    panelRoutes: $("submoduleRoutes"),
    panelHotspots: $("submoduleHotspots"),
    panelVocab: $("submoduleVocab"),

    // 1. Shapes
    shapesGrid: $("visualShapesGrid"),

    // 2. Directions
    dirPlayBtn: $("dirAudioPlayBtn"),
    dirPromptText: $("dirPromptText"),
    dirSvgContainer: $("dirSvgContainer"),
    dirFeedback: $("dirFeedback"),
    dirNextBtn: $("dirNextBtn"),

    // 3. Transitions
    transPlayBtn: $("transAudioPlayBtn"),
    transPromptText: $("transPromptText"),
    transSvgContainer: $("transSvgContainer"),
    transFeedback: $("transFeedback"),
    transAnimateBtn: $("transAnimateBtn"),
    transNextBtn: $("transNextBtn"),

    // 4. Routes
    routeTitle: $("routeMapTitle"),
    routeContext: $("routeMapContext"),
    routeSelect: $("routeScenarioSelect"),
    routeStepBadge: $("routeStepBadge"),
    routeStepText: $("routeStepText"),
    routePrevBtn: $("routePrevStepBtn"),
    routeReplayBtn: $("routeReplayStepBtn"),
    routeNextBtn: $("routeNextStepBtn"),
    routeSvgContainer: $("routeSvgContainer"),
    routeQuestionText: $("routeQuestionText"),
    routeSelectedNotice: $("routeSelectedNotice"),
    routeFeedback: $("routeFeedback"),
    routeSubmitBtn: $("routeSubmitBtn"),
    routeNextScenarioBtn: $("routeNextScenarioBtn"),
    speedBtns: document.querySelectorAll(".speed-btn"),

    // 5. Hotspots
    hotspotAudioBtn: $("hotspotAudioBtn"),
    hotspotPromptText: $("hotspotPromptText"),
    hotspotSvgContainer: $("hotspotSvgContainer"),
    hotspotFeedback: $("hotspotFeedback"),
    hotspotNextBtn: $("hotspotNextBtn"),

    // 6. Vocab
    landmarkGrid: $("landmarkGrid"),
  };

  const defaultState = {
    today: { date: dayKey(), count: 0, correct: 0 },
    mastered: [],
    review: [],
    currentSubmodule: "shapes",
    trainingMode: "practice" // 'learning' | 'practice' | 'exam'
  };

  let state = loadState();
  let currentSpeed = 1.0;

  // Active question runtime holders (Data-driven from MapEngine)
  let currentDirQ = null;
  let dirAnswered = false;

  let currentTransQ = null;
  let transAnswered = false;

  let currentRouteQ = null;
  let routeStepIndex = 0;
  let routeSelectedPin = null;
  let routeAnswered = false;

  let currentSpotQ = null;
  let hotspotAnswered = false;
  let mapSessionId = "sess-map-" + Date.now();
  let questionStartTime = performance.now();

  function dayKey() {
    return new Date().toISOString().slice(0, 10);
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      const s = { ...defaultState, ...(saved || {}) };
      if (s.today?.date !== dayKey()) {
        s.today = { date: dayKey(), count: 0, correct: 0 };
      }
      return s;
    } catch {
      return structuredClone(defaultState);
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateSummary();
  }

  function updateSummary() {
    const t = state.today || { count: 0, correct: 0 };
    if (ui.todayCount) ui.todayCount.textContent = String(t.count);
    if (ui.accuracy) {
      ui.accuracy.textContent = t.count ? `${Math.round((t.correct / t.count) * 100)}%` : "—";
    }
    if (ui.masteredCount) ui.masteredCount.textContent = String(state.mastered.length);
    if (ui.reviewCount) ui.reviewCount.textContent = String(state.review.length);
  }

  function recordScore(isCorrect, itemId, userAnswer = "", expectedAnswer = "", metadata = {}) {
    state.today.count += 1;
    if (isCorrect) {
      state.today.correct += 1;
      if (itemId && !state.mastered.includes(itemId)) {
        state.mastered.push(itemId);
      }
      state.review = state.review.filter((id) => id !== itemId);
    } else {
      if (itemId && !state.review.includes(itemId)) {
        state.review.push(itemId);
      }
    }
    saveState();

    const responseTimeMs = Math.round(performance.now() - (questionStartTime || performance.now()));

    // 写入统一底座 IndexedDB
    if (window.IELTS_DB) {
      window.IELTS_DB.saveAttempt({
        id: "att-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
        sessionId: mapSessionId,
        moduleType: "map",
        itemId: itemId || "map-item",
        mode: state.trainingMode || "practice",
        timestamp: Date.now(),
        correct: isCorrect,
        responseTimeMs,
        userAnswer,
        expectedAnswer,
        errorReasons: isCorrect ? [] : ["map_tracking"],
        metadata: {
          submodule: state.currentSubmodule,
          ...metadata
        }
      }).catch((err) => console.warn("Failed to save map attempt to IndexedDB:", err));
    }
  }

  // 音频朗读引擎
  function speak(text, rate = 1.0, onEnd = null) {
    if (!("speechSynthesis" in window) || !text) return;
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    const ukVoice = voices.find((v) => /en-GB|British/i.test(v.lang) || /United Kingdom/i.test(v.name))
      || voices.find((v) => /^en/i.test(v.lang));

    if (ukVoice) utterance.voice = ukVoice;
    utterance.rate = Number(rate) || 1.0;
    utterance.pitch = 1.0;

    if (typeof onEnd === "function") {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    speechSynthesis.speak(utterance);
  }

  // 1. 常见地图图形图典渲染 (固定图典)
  function renderShapes() {
    if (!ui.shapesGrid) return;
    const shapes = window.MAP_TRAINING_DATA?.visualShapes || [];
    ui.shapesGrid.innerHTML = shapes.map((shape) => `
      <article class="shape-card" data-shape-id="${shape.id}">
        <div class="shape-svg-wrap">
          ${shape.svg}
        </div>
        <div class="shape-meta">
          <span class="shape-name">${shape.name}</span>
          <span class="shape-phonetic">${shape.phonetic || ""}</span>
          <span class="shape-cn">${shape.chinese}</span>
        </div>
        <button type="button" class="shape-speak-btn" data-speak="${shape.name.split("/")[0].trim()}">
          🔊 听发音
        </button>
        <div class="shape-collocations">
          <span class="colloc-title">💡 雅思真题高频搭配：</span>
          <div class="colloc-pills">
            ${shape.collocations.map((c) => `<span class="colloc-pill">• ${c}</span>`).join("")}
          </div>
        </div>
      </article>
    `).join("");

    ui.shapesGrid.querySelectorAll(".shape-speak-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        speak(btn.dataset.speak, 0.9);
      });
    });
  }

  // 2. 方位词互动训练 (数据驱动随机生成 + 答题后再教学)
  function renderDirection() {
    if (!window.MapEngine) return;
    dirAnswered = false;
    currentDirQ = window.MapEngine.generateDirectionQuestion();
    if (!currentDirQ) return;

    questionStartTime = performance.now();
    ui.dirFeedback.hidden = true;
    const mode = state.trainingMode;

    // 根据模式控制题干文本暴露
    if (mode === "learning") {
      ui.dirPromptText.innerHTML = `
        <span>目标方位：<strong>${currentDirQ.phrase}</strong> (${currentDirQ.phraseCn})</span>
        <div style="font-size:13px;color:var(--muted);margin-top:2px;">"${currentDirQ.audioText}"</div>
      `;
    } else if (mode === "practice") {
      ui.dirPromptText.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
          <span>请听音频并在地图上定位目标</span>
          <button type="button" class="reveal-toggle-btn" id="dirRevealBtn">👁️ 显示英文字句</button>
        </div>
        <div id="dirBlurredText" class="text-blurred" style="font-size:13px;color:var(--muted);margin-top:4px;">
          ${currentDirQ.audioText}
        </div>
      `;
      const revBtn = $("dirRevealBtn");
      const blurTxt = $("dirBlurredText");
      revBtn?.addEventListener("click", () => {
        blurTxt?.classList.toggle("revealed");
        revBtn.textContent = blurTxt?.classList.contains("revealed") ? "🙈 遮住英文字句" : "👁️ 显示英文字句";
      });
    } else {
      // 考试模式：纯盲听
      ui.dirPromptText.innerHTML = `<span>🎧 考场盲听模式：请根据听力指令在地图中点击对应 Pin 点</span>`;
    }

    // 绘制动态 SVG 画布 (带指北针、随机地标名与 A-D 洗牌候选点)
    const isWater = /Lake|Pond|River/i.test(currentDirQ.centerName);
    ui.dirSvgContainer.innerHTML = `
      <svg viewBox="0 0 380 280" class="dir-map-svg">
        <rect width="380" height="280" fill="#fcf9f4"/>

        <!-- 纵横辅助轻路网 -->
        <rect x="0" y="125" width="380" height="30" fill="#e8dfd3"/>
        <line x1="0" y1="140" x2="380" y2="140" stroke="#7a7065" stroke-dasharray="6 4" stroke-width="1.2"/>
        <rect x="175" y="0" width="30" height="280" fill="#e8dfd3"/>
        <line x1="190" y1="0" x2="190" y2="280" stroke="#7a7065" stroke-dasharray="6 4" stroke-width="1.2"/>

        ${currentDirQ.showNorth ? `
          <!-- 指南针 Compass -->
          <g class="compass" transform="translate(340, 40)">
            <circle cx="0" cy="0" r="20" fill="#ffffff" stroke="#d5c8b8" stroke-width="1.5"/>
            <polygon points="0,-16 4,-3 0,0 -4,-3" fill="#f2743f"/>
            <polygon points="0,16 4,3 0,0 -4,3" fill="#7a7065"/>
            <text x="0" y="-19" font-size="9" font-weight="800" fill="#f2743f" text-anchor="middle">N</text>
            <text x="0" y="27" font-size="8" font-weight="700" fill="#7a7065" text-anchor="middle">S</text>
            <text x="24" y="3" font-size="8" font-weight="700" fill="#7a7065" text-anchor="middle">E</text>
            <text x="-24" y="3" font-size="8" font-weight="700" fill="#7a7065" text-anchor="middle">W</text>
          </g>
        ` : ""}

        <!-- 中央参照地标 -->
        ${isWater ? `
          <ellipse cx="190" cy="140" rx="55" ry="38" fill="#d2edf5" stroke="#99d1e3" stroke-width="2"/>
          <text x="190" y="144" font-size="12" font-weight="800" fill="#1b637a" text-anchor="middle">${currentDirQ.centerName}</text>
        ` : `
          <rect x="135" y="112" width="110" height="56" rx="8" fill="#f4eee6" stroke="#b8aa99" stroke-width="2"/>
          <text x="190" y="143" font-size="12" font-weight="800" fill="#3a342e" text-anchor="middle">${currentDirQ.centerName}</text>
        `}

        <!-- 洗牌候选位置 (A-D) -->
        ${currentDirQ.pins.map((pin) => `
          <g class="candidate-pin" data-dir-pin="${pin.letter}" transform="translate(${pin.x}, ${pin.y})">
            <circle cx="0" cy="0" r="16"/>
            <text x="0" y="1">${pin.letter}</text>
          </g>
        `).join("")}
      </svg>
    `;

    ui.dirSvgContainer.querySelectorAll(".candidate-pin").forEach((p) => {
      p.addEventListener("click", () => handleDirectionPinClick(p.dataset.dirPin));
    });

    speak(currentDirQ.audioText, 0.95);
  }

  function handleDirectionPinClick(letter) {
    if (dirAnswered || !currentDirQ) return;
    dirAnswered = true;

    const isCorrect = letter === currentDirQ.answer;
    recordScore(isCorrect, currentDirQ.id, letter, currentDirQ.answer, { phrase: currentDirQ.phrase });

    ui.dirSvgContainer.querySelectorAll(".candidate-pin").forEach((p) => {
      const pLetter = p.dataset.dirPin;
      if (pLetter === currentDirQ.answer) p.classList.add("correct");
      else if (pLetter === letter && !isCorrect) p.classList.add("wrong");
    });

    // 答题后再教学卡片呈现
    ui.dirFeedback.hidden = false;
    ui.dirFeedback.className = `map-feedback ${isCorrect ? "correct" : "wrong"}`;
    ui.dirFeedback.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
        <strong>${isCorrect ? "✔ 回答正确！准确锁定方位！" : `✘ 选错位置：正确答案是 ${currentDirQ.answer}`}</strong>
        <span class="teaching-keyword-pill">${currentDirQ.phrase} (${currentDirQ.phraseCn})</span>
      </div>
      <div class="teaching-detail-card">
        <div class="teaching-quote">"${currentDirQ.audioText}"</div>
        <div class="teaching-point">💡 空间辨析：${currentDirQ.explanation}</div>
      </div>
    `;

    // 答完后重读一遍原句强化记忆
    speak(currentDirQ.audioText, 0.95);
  }

  function nextDirection() {
    renderDirection();
  }

  // 3. 空间过渡与参照物 (动态插槽布局 + 答题后再教学)
  function renderTransition() {
    if (!window.MapEngine) return;
    transAnswered = false;
    currentTransQ = window.MapEngine.generateSpatialQuestion();
    if (!currentTransQ) return;

    questionStartTime = performance.now();
    ui.transFeedback.hidden = true;
    const mode = state.trainingMode;

    if (mode === "learning") {
      ui.transPromptText.innerHTML = `
        <strong>${currentTransQ.title}</strong> — 请在地图上定位目标：<strong>${currentTransQ.targetName}</strong>
        <div style="font-size:13px;color:var(--muted);margin-top:2px;">"${currentTransQ.audioFull}"</div>
      `;
    } else if (mode === "practice") {
      ui.transPromptText.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
          <span>场景：<strong>${currentTransQ.title}</strong> · 请定位目标：<strong>${currentTransQ.targetName}</strong></span>
          <button type="button" class="reveal-toggle-btn" id="transRevealBtn">👁️ 显示听力文本</button>
        </div>
        <div id="transBlurredText" class="text-blurred" style="font-size:13px;color:var(--muted);margin-top:4px;">
          ${currentTransQ.audioFull}
        </div>
      `;
      const revBtn = $("transRevealBtn");
      const blurTxt = $("transBlurredText");
      revBtn?.addEventListener("click", () => {
        blurTxt?.classList.toggle("revealed");
        revBtn.textContent = blurTxt?.classList.contains("revealed") ? "🙈 遮住听力文本" : "👁️ 显示听力文本";
      });
    } else {
      ui.transPromptText.innerHTML = `<span>🎧 考场盲听：请根据过渡路线定位 <strong>${currentTransQ.targetName}</strong></span>`;
    }

    // 动态渲染 SVG (根据 layoutType 生成真实的建筑布局)
    const isRoom = currentTransQ.layoutType === "sequential_rooms";
    const isRiver = currentTransQ.layoutType === "river_crossing";
    const isCourtyard = currentTransQ.layoutType === "flanked_courtyard";

    ui.transSvgContainer.innerHTML = `
      <svg viewBox="0 0 380 280" class="trans-map-svg">
        <rect width="380" height="280" fill="#fcf9f4"/>

        ${isRiver ? `
          <!-- 河流与木桥布局 -->
          <path d="M 0 140 Q 190 120 380 140 L 380 170 Q 190 150 0 170 Z" fill="#d2edf5" stroke="#99d1e3" stroke-width="2"/>
          <rect x="175" y="125" width="30" height="42" fill="#d7c4b0" stroke="#8b7355" stroke-width="2" rx="4"/>
          <rect x="175" y="170" width="30" height="110" fill="#ebdccb"/>
          <line x1="190" y1="170" x2="190" y2="280" stroke="#7a7065" stroke-dasharray="4 3"/>
        ` : isCourtyard ? `
          <!-- 中庭夹峙建筑布局 -->
          <rect x="30" y="30" width="320" height="220" fill="#f5eee5" stroke="#b0a292" stroke-width="1.5" rx="8"/>
          <rect x="60" y="80" width="70" height="70" fill="#ffffff" stroke="#d5c8b8" rx="6"/>
          <text x="95" y="120" font-size="11" font-weight="700" fill="#7a7065" text-anchor="middle">Building A</text>
          <rect x="250" y="80" width="70" height="70" fill="#ffffff" stroke="#d5c8b8" rx="6"/>
          <text x="285" y="120" font-size="11" font-weight="700" fill="#7a7065" text-anchor="middle">Building B</text>
        ` : isRoom ? `
          <!-- 连通套间布局 -->
          <rect x="50" y="25" width="280" height="230" fill="#f5eee5" stroke="#b0a292" stroke-width="2" rx="10"/>
          <rect x="130" y="40" width="120" height="60" fill="#ffffff" stroke="#d5c8b8" rx="6"/>
          <rect x="130" y="115" width="120" height="55" fill="#ffffff" stroke="#d5c8b8" rx="6"/>
          <rect x="130" y="185" width="120" height="55" fill="#ebdccb" stroke="#b8aa99" rx="6"/>
        ` : `
          <!-- 通用道路与绿化布局 -->
          <path d="M 190 280 L 190 140 L 70 140 L 70 50 M 190 140 L 310 140 L 310 50" fill="none" stroke="#e8dfd3" stroke-width="26" stroke-linecap="round"/>
          <circle cx="190" cy="140" r="18" fill="#d5e8d4" stroke="#82b366" stroke-width="1.5"/>
        `}

        <!-- 动画指示小光点 -->
        <circle id="transSpeakerDot" cx="${currentTransQ.stepCoords[0]?.x || 190}" cy="${currentTransQ.stepCoords[0]?.y || 240}" r="8" fill="#f2743f" stroke="#ffffff" stroke-width="2" style="transition: all .5s cubic-bezier(0.2,0.8,0.2,1);"/>

        <!-- 候选位置 Pin (洗牌标签) -->
        ${currentTransQ.pins.map((pin) => `
          <g class="candidate-pin" data-trans-pin="${pin.letter}" transform="translate(${pin.x}, ${pin.y})">
            <circle cx="0" cy="0" r="16"/>
            <text x="0" y="1">${pin.letter}</text>
          </g>
        `).join("")}
      </svg>
    `;

    ui.transSvgContainer.querySelectorAll(".candidate-pin").forEach((p) => {
      p.addEventListener("click", () => handleTransitionPinClick(p.dataset.transPin));
    });

    speak(currentTransQ.audioFull, 0.95);
  }

  function animateTransitionSteps() {
    if (!currentTransQ || !currentTransQ.stepCoords) return;
    const dot = $("transSpeakerDot");
    if (!dot) return;

    let idx = 0;
    function run() {
      if (idx >= currentTransQ.stepCoords.length) return;
      const step = currentTransQ.stepCoords[idx];
      dot.setAttribute("cx", step.x);
      dot.setAttribute("cy", step.y);
      if (currentTransQ.audioSteps[idx]) {
        speak(currentTransQ.audioSteps[idx], 0.95, () => {
          idx += 1;
          setTimeout(run, 350);
        });
      }
    }
    run();
  }

  function handleTransitionPinClick(letter) {
    if (transAnswered || !currentTransQ) return;
    transAnswered = true;

    const isCorrect = letter === currentTransQ.answer;
    recordScore(isCorrect, currentTransQ.id, letter, currentTransQ.answer, { relation: currentTransQ.relation });

    ui.transSvgContainer.querySelectorAll(".candidate-pin").forEach((p) => {
      const pLetter = p.dataset.transPin;
      if (pLetter === currentTransQ.answer) p.classList.add("correct");
      else if (pLetter === letter && !isCorrect) p.classList.add("wrong");
    });

    ui.transFeedback.hidden = false;
    ui.transFeedback.className = `map-feedback ${isCorrect ? "correct" : "wrong"}`;
    ui.transFeedback.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
        <strong>${isCorrect ? "✔ 回答正确！精准推导空间过渡！" : `✘ 判断失误：正确位置是 ${currentTransQ.answer}`}</strong>
        <span class="teaching-keyword-pill">${currentTransQ.relation}</span>
      </div>
      <div class="teaching-detail-card">
        <div class="teaching-quote">"${currentTransQ.audioFull}"</div>
        <div class="teaching-point">💡 考点教学：${currentTransQ.teaching}</div>
      </div>
    `;

    speak(currentTransQ.audioFull, 0.95);
  }

  function nextTransition() {
    renderTransition();
  }

  // 4. 路线跟随训练 (10 套真实雅思仿真地图 + 30+ 路线题库 + 候选点洗牌)
  function initRouteScenarios() {
    if (!ui.routeSelect) return;
    const allMaps = window.MAP_ROUTE_MAPS_DATA || [];
    ui.routeSelect.innerHTML = `
      <option value="random">🎲 随机轮换雅思地图 (10 套)</option>
      ${allMaps.map((m, idx) => `<option value="${m.id}">${idx + 1}. ${m.title}</option>`).join("")}
    `;

    ui.routeSelect.addEventListener("change", () => {
      loadRouteScenario(ui.routeSelect.value === "random" ? null : ui.routeSelect.value);
    });

    loadRouteScenario(null);
  }

  function loadRouteScenario(mapId = null) {
    if (!window.MapEngine) return;
    currentRouteQ = window.MapEngine.generateRouteQuestion(mapId);
    if (!currentRouteQ) return;

    questionStartTime = performance.now();
    routeStepIndex = 0;
    routeSelectedPin = null;
    routeAnswered = false;

    ui.routeTitle.textContent = currentRouteQ.mapTitle;
    ui.routeContext.textContent = currentRouteQ.context;
    ui.routeQuestionText.textContent = `听力问题：${currentRouteQ.question}`;
    ui.routeSelectedNotice.textContent = "未选择";
    ui.routeSelectedNotice.className = "badge";
    ui.routeFeedback.hidden = true;
    ui.routeSubmitBtn.disabled = false;
    ui.routeNextScenarioBtn.hidden = true;

    renderRouteMap(currentRouteQ);
    updateRouteStep(0);
  }

  function renderRouteMap(sc) {
    ui.routeSvgContainer.innerHTML = `
      <svg viewBox="0 0 ${sc.mapWidth} ${sc.mapHeight}" class="route-svg">
        <rect width="${sc.mapWidth}" height="${sc.mapHeight}" fill="#fcf9f4"/>

        <!-- 指南针 Compass -->
        <g class="compass" transform="translate(${sc.mapWidth - 35}, 40)">
          <circle cx="0" cy="0" r="18" fill="#ffffff" stroke="#d5c8b8" stroke-width="1.5"/>
          <polygon points="0,-14 4,-3 0,0 -4,-3" fill="#f2743f"/>
          <polygon points="0,14 4,3 0,0 -4,3" fill="#7a7065"/>
          <text x="0" y="-17" font-size="8" font-weight="800" fill="#f2743f" text-anchor="middle">N</text>
        </g>

        <!-- 河流 -->
        ${(sc.svgFeatures.rivers || []).map((r) => `
          <path d="${r}" fill="#d2edf5" stroke="#a3d6e5" stroke-width="2"/>
        `).join("")}

        <!-- 道路系统 -->
        ${(sc.svgFeatures.roads || []).map((rd) => `
          <path d="${rd}" fill="none" stroke="#e8dfd3" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="${rd}" fill="none" stroke="#c0b3a3" stroke-width="1.5" stroke-dasharray="5 3"/>
        `).join("")}

        <!-- 桥梁 -->
        ${(sc.svgFeatures.bridges || []).map((b) => `
          <rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="#cfbaa2" stroke="#6e5a44" stroke-width="2" rx="3"/>
          <line x1="${b.x}" y1="${b.y + b.h / 2}" x2="${b.x + b.w}" y2="${b.y + b.h / 2}" stroke="#ffffff" stroke-dasharray="2 2"/>
        `).join("")}

        <!-- 地标物 -->
        ${(sc.svgFeatures.landmarks || []).map((lm) => {
          if (lm.type === "water") {
            return `
              <ellipse cx="${lm.x + lm.w / 2}" cy="${lm.y + lm.h / 2}" rx="${lm.w / 2}" ry="${lm.h / 2}" fill="#c6e8f2" stroke="#87c7d8" stroke-width="1.5"/>
              <text x="${lm.x + lm.w / 2}" y="${lm.y + lm.h / 2 + 3}" font-size="11" font-weight="800" fill="#1b637a" text-anchor="middle">${lm.name}</text>
            `;
          }
          if (lm.type === "trees") {
            return `
              <rect x="${lm.x}" y="${lm.y}" width="${lm.w}" height="${lm.h}" fill="#e3f0db" stroke="#9bc287" stroke-width="1.5" rx="${lm.rx || 8}"/>
              <text x="${lm.x + lm.w / 2}" y="${lm.y + lm.h / 2 + 3}" font-size="11" font-weight="800" fill="#386b24" text-anchor="middle">🌲 ${lm.name}</text>
            `;
          }
          return `
            <rect x="${lm.x}" y="${lm.y}" width="${lm.w}" height="${lm.h}" fill="#ffffff" stroke="#c8bbae" stroke-width="1.5" rx="6"/>
            <text x="${lm.x + lm.w / 2}" y="${lm.y + lm.h / 2 + 3}" font-size="11" font-weight="800" fill="#4d443b" text-anchor="middle">${lm.name}</text>
          `;
        }).join("")}

        <!-- 起点 Start (You are here) -->
        <g class="start-marker" transform="translate(${sc.startPoint.x}, ${sc.startPoint.y})">
          <circle cx="0" cy="0" r="10" fill="#f2743f" stroke="#ffffff" stroke-width="2"/>
          <text x="0" y="16" font-size="9" font-weight="800" fill="#f2743f" text-anchor="middle">${sc.startPoint.label.split("(")[0].trim()}</text>
          <text x="0" y="26" font-size="8" font-weight="700" fill="#7a7065" text-anchor="middle">★ You are here</text>
        </g>

        <!-- 路线行进小红点 -->
        <circle id="routeTravelDot" cx="${sc.startPoint.x}" cy="${sc.startPoint.y}" r="8" fill="#f2743f" stroke="#ffffff" stroke-width="2.5" style="transition: all .45s ease-out;"/>

        <!-- 提交后展现的真实行动路线 -->
        <polyline id="routeRevealedPath" points="${sc.pathCoords.map((c) => c.join(",")).join(" ")}" fill="none" stroke="#f2743f" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="6 4" hidden/>

        <!-- 候选位置 Pins (洗牌标签) -->
        ${sc.pins.map((pin) => `
          <g class="candidate-pin" data-route-pin="${pin.letter}" transform="translate(${pin.x}, ${pin.y})">
            <circle cx="0" cy="0" r="15"/>
            <text x="0" y="1">${pin.letter}</text>
          </g>
        `).join("")}
      </svg>
    `;

    ui.routeSvgContainer.querySelectorAll(".candidate-pin").forEach((pinEl) => {
      pinEl.addEventListener("click", () => {
        if (routeAnswered) return;
        routeSelectedPin = pinEl.dataset.routePin;
        ui.routeSvgContainer.querySelectorAll(".candidate-pin").forEach((p) => p.classList.remove("selected"));
        pinEl.classList.add("selected");
        ui.routeSelectedNotice.textContent = `已选：${routeSelectedPin}`;
        ui.routeSelectedNotice.className = "badge active";
      });
    });
  }

  function updateRouteStep(idx) {
    if (!currentRouteQ) return;
    const total = currentRouteQ.steps.length;
    routeStepIndex = Math.max(0, Math.min(idx, total - 1));
    const step = currentRouteQ.steps[routeStepIndex];

    ui.routeStepBadge.textContent = `第 ${routeStepIndex + 1} / ${total} 句`;

    const mode = state.trainingMode;
    if (mode === "learning") {
      ui.routeStepText.innerHTML = step.text;
    } else if (mode === "practice") {
      ui.routeStepText.innerHTML = `
        <span id="routeStepMask" class="text-blurred">${step.text}</span>
        <button type="button" class="reveal-toggle-btn" id="routeStepRevealBtn" style="margin-left:8px;">👁️ 显字</button>
      `;
      $("routeStepRevealBtn")?.addEventListener("click", () => {
        $("routeStepMask")?.classList.toggle("revealed");
      });
    } else {
      // 考试模式：彻底隐藏文字
      ui.routeStepText.innerHTML = `<span style="color:var(--muted);font-weight:700;">🔊 正在播放指令，请注视地图光点行进...</span>`;
    }

    const dot = $("routeTravelDot");
    if (dot && step.coord) {
      dot.setAttribute("cx", step.coord.x);
      dot.setAttribute("cy", step.coord.y);
    }

    speak(step.audioText, currentSpeed);
  }

  function handleRouteSubmit() {
    if (routeAnswered || !currentRouteQ) return;
    if (!routeSelectedPin) {
      alert("请先点击地图上的候选字母 A–E 选择目标位置！");
      return;
    }

    routeAnswered = true;
    const isCorrect = routeSelectedPin === currentRouteQ.answer;
    recordScore(isCorrect, currentRouteQ.id, routeSelectedPin, currentRouteQ.answer, { mapTitle: currentRouteQ.mapTitle });

    // 展开真实行进轨迹
    const pathEl = $("routeRevealedPath");
    if (pathEl) pathEl.removeAttribute("hidden");

    ui.routeSvgContainer.querySelectorAll(".candidate-pin").forEach((p) => {
      const pid = p.dataset.routePin;
      if (pid === currentRouteQ.answer) p.classList.add("correct");
      else if (pid === routeSelectedPin && !isCorrect) p.classList.add("wrong");
    });

    ui.routeFeedback.hidden = false;
    ui.routeFeedback.className = `map-feedback ${isCorrect ? "correct" : "wrong"}`;
    ui.routeFeedback.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
        <strong>${isCorrect ? "🎉 恭喜完全走对！成功锁定正确目标！" : `✘ 走错路线：正确答案是 ${currentRouteQ.answer}`}</strong>
        <span class="teaching-keyword-pill">路线跟随真题</span>
      </div>
      <div class="teaching-detail-card">
        <div style="font-weight:800;color:#9b4b1d;margin-bottom:4px;">📜 完整导览听力原稿：</div>
        <ol style="margin:4px 0 10px 20px;padding:0;">
          ${currentRouteQ.steps.map((s) => `<li>${s.text}</li>`).join("")}
        </ol>
        <div class="teaching-point">💡 空间行进复盘：${currentRouteQ.explanation}</div>
      </div>
    `;

    ui.routeSubmitBtn.disabled = true;
    ui.routeNextScenarioBtn.hidden = false;
  }

  // 5. 答案高发位置秒杀 (30+ 场景模板 + 答题后再教学)
  function renderHotspot() {
    if (!window.MapEngine) return;
    hotspotAnswered = false;
    currentSpotQ = window.MapEngine.generateHotspotQuestion();
    if (!currentSpotQ) return;

    questionStartTime = performance.now();
    ui.hotspotFeedback.hidden = true;
    const mode = state.trainingMode;

    if (mode === "learning") {
      ui.hotspotPromptText.innerHTML = `
        <strong>${currentSpotQ.phrase}</strong> (${currentSpotQ.phraseCn})
        <div style="font-size:13px;color:var(--muted);margin-top:2px;">"${currentSpotQ.audio}"</div>
      `;
    } else if (mode === "practice") {
      ui.hotspotPromptText.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;">
          <span>请听音极速点选对应位置</span>
          <button type="button" class="reveal-toggle-btn" id="hsRevealBtn">👁️ 显示原句</button>
        </div>
        <div id="hsBlurredText" class="text-blurred" style="font-size:13px;color:var(--muted);margin-top:4px;">
          ${currentSpotQ.audio}
        </div>
      `;
      $("hsRevealBtn")?.addEventListener("click", () => {
        $("hsBlurredText")?.classList.toggle("revealed");
      });
    } else {
      ui.hotspotPromptText.innerHTML = `<span>⚡ 极速秒杀：听到关键介词短语后立即点击对应点</span>`;
    }

    ui.hotspotSvgContainer.innerHTML = `
      <svg viewBox="0 0 300 240" class="hotspot-map-svg">
        <rect width="300" height="240" fill="#fcf9f4"/>
        <!-- 道路系统 -->
        ${currentSpotQ.svgRoad.split(";").map((r) => `
          <path d="${r}" fill="none" stroke="#e8dfd3" stroke-width="24" stroke-linecap="round"/>
          <path d="${r}" fill="none" stroke="#7a7065" stroke-width="1.5" stroke-dasharray="5 3"/>
        `).join("")}
        <!-- 候选位置 -->
        ${currentSpotQ.pins.map((pin) => `
          <g class="candidate-pin" data-hotspot-pin="${pin.letter}" transform="translate(${pin.x}, ${pin.y})">
            <circle cx="0" cy="0" r="16"/>
            <text x="0" y="1">${pin.letter}</text>
          </g>
        `).join("")}
      </svg>
    `;

    ui.hotspotSvgContainer.querySelectorAll(".candidate-pin").forEach((p) => {
      p.addEventListener("click", () => {
        if (hotspotAnswered || !currentSpotQ) return;
        hotspotAnswered = true;
        const letter = p.dataset.hotspotPin;
        const isCorrect = letter === currentSpotQ.answer;
        recordScore(isCorrect, currentSpotQ.id, letter, currentSpotQ.answer, { phrase: currentSpotQ.phrase });

        ui.hotspotSvgContainer.querySelectorAll(".candidate-pin").forEach((cp) => {
          const cpid = cp.dataset.hotspotPin;
          if (cpid === currentSpotQ.answer) cp.classList.add("correct");
          else if (cpid === letter && !isCorrect) cp.classList.add("wrong");
        });

        ui.hotspotFeedback.hidden = false;
        ui.hotspotFeedback.className = `map-feedback ${isCorrect ? "correct" : "wrong"}`;
        ui.hotspotFeedback.innerHTML = `
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
            <strong>${isCorrect ? "✔ 反应神速！准确命中高频考点！" : `✘ 反应偏差：答案应选 ${currentSpotQ.answer}`}</strong>
            <span class="teaching-keyword-pill">${currentSpotQ.phrase} (${currentSpotQ.phraseCn})</span>
          </div>
          <div class="teaching-detail-card">
            <div class="teaching-quote">"${currentSpotQ.audio}"</div>
            <div class="teaching-point">💡 考点秒杀逻辑：${currentSpotQ.teaching}</div>
          </div>
        `;

        speak(currentSpotQ.audio, 0.95);
      });
    });

    speak(currentSpotQ.audio, 0.95);
  }

  // 6. 重点地标词典渲染 (36+ 核心真题地标词)
  function renderLandmarkVocab() {
    if (!ui.landmarkGrid) return;
    const vocabList = window.MAP_LANDMARKS_DATA || window.MAP_TRAINING_DATA?.landmarkVocabulary || [];
    ui.landmarkGrid.innerHTML = vocabList.map((item) => `
      <div class="landmark-card">
        <div class="landmark-info">
          <strong>${item.term}</strong>
          <span>${item.phonetic || ""} · ${item.chinese}</span>
        </div>
        <button type="button" class="shape-speak-btn" data-vocab-speak="${item.term.split("/")[0].trim()}">
          🔊
        </button>
      </div>
    `).join("");

    ui.landmarkGrid.querySelectorAll("[data-vocab-speak]").forEach((btn) => {
      btn.addEventListener("click", () => speak(btn.dataset.vocabSpeak, 0.9));
    });
  }

  // 模式切换与重置
  function setTrainingMode(mode) {
    state.trainingMode = mode;
    if (window.MapEngine) window.MapEngine.mode = mode;
    ui.modeBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.mapMode === mode);
    });
    saveState();

    // 重新渲染当前活跃子模块
    refreshActiveSubmodule();
  }

  function refreshActiveSubmodule() {
    switch (state.currentSubmodule) {
      case "directions":
        renderDirection();
        break;
      case "transitions":
        renderTransition();
        break;
      case "routes":
        loadRouteScenario(ui.routeSelect?.value === "random" ? null : ui.routeSelect?.value);
        break;
      case "hotspots":
        renderHotspot();
        break;
      default:
        break;
    }
  }

  // 子模块切换
  function activateSubmodule(submoduleName) {
    state.currentSubmodule = submoduleName;
    ui.subnav?.querySelectorAll("[data-map-submodule]").forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.mapSubmodule === submoduleName);
    });

    const panels = [
      { name: "shapes", el: ui.panelShapes, render: renderShapes },
      { name: "directions", el: ui.panelDirections, render: renderDirection },
      { name: "transitions", el: ui.panelTransitions, render: renderTransition },
      { name: "routes", el: ui.panelRoutes, render: initRouteScenarios },
      { name: "hotspots", el: ui.panelHotspots, render: renderHotspot },
      { name: "vocab", el: ui.panelVocab, render: renderLandmarkVocab },
    ];

    panels.forEach((p) => {
      if (!p.el) return;
      const isTarget = p.name === submoduleName;
      p.el.hidden = !isTarget;
      if (isTarget && typeof p.render === "function") {
        p.render();
      }
    });

    saveState();
  }

  function bindEvents() {
    // 训练模式切换
    ui.modeBtns.forEach((btn) => {
      btn.addEventListener("click", () => setTrainingMode(btn.dataset.mapMode));
    });

    // 重新洗牌与生成新种子
    ui.resetSessionBtn?.addEventListener("click", () => {
      if (window.MapEngine) window.MapEngine.resetSession();
      refreshActiveSubmodule();
      const original = ui.resetSessionBtn.textContent;
      ui.resetSessionBtn.textContent = "✔ 已重新洗牌！";
      setTimeout(() => { ui.resetSessionBtn.textContent = original; }, 1200);
    });

    // 子模块切换导航
    ui.subnav?.addEventListener("click", (e) => {
      const tab = e.target.closest("[data-map-submodule]");
      if (tab) activateSubmodule(tab.dataset.mapSubmodule);
    });

    // 模块 2: 方位
    ui.dirPlayBtn?.addEventListener("click", () => {
      if (currentDirQ) speak(currentDirQ.audioText, 0.95);
    });
    ui.dirNextBtn?.addEventListener("click", nextDirection);

    // 模块 3: 过渡
    ui.transPlayBtn?.addEventListener("click", () => {
      if (currentTransQ) speak(currentTransQ.audioFull, 0.95);
    });
    ui.transAnimateBtn?.addEventListener("click", animateTransitionSteps);
    ui.transNextBtn?.addEventListener("click", nextTransition);

    // 模块 4: 路线
    ui.routePrevBtn?.addEventListener("click", () => updateRouteStep(routeStepIndex - 1));
    ui.routeNextBtn?.addEventListener("click", () => updateRouteStep(routeStepIndex + 1));
    ui.routeReplayBtn?.addEventListener("click", () => {
      if (currentRouteQ && currentRouteQ.steps[routeStepIndex]) {
        speak(currentRouteQ.steps[routeStepIndex].audioText, currentSpeed);
      }
    });
    ui.routeSubmitBtn?.addEventListener("click", handleRouteSubmit);
    ui.routeNextScenarioBtn?.addEventListener("click", () => {
      loadRouteScenario(ui.routeSelect?.value === "random" ? null : ui.routeSelect?.value);
    });

    ui.speedBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        ui.speedBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentSpeed = Number(btn.dataset.speed) || 1.0;
      });
    });

    // 模块 5: 高频位置
    ui.hotspotAudioBtn?.addEventListener("click", () => {
      if (currentSpotQ) speak(currentSpotQ.audio, 0.95);
    });
    ui.hotspotNextBtn?.addEventListener("click", renderHotspot);

    // 快捷键支持
    window.addEventListener("keydown", (e) => {
      const mapPanel = $("mapModule");
      if (!mapPanel || mapPanel.hidden) return;

      if (e.key === "Enter") {
        if (state.currentSubmodule === "directions" && dirAnswered) {
          e.preventDefault();
          nextDirection();
        } else if (state.currentSubmodule === "transitions" && transAnswered) {
          e.preventDefault();
          nextTransition();
        } else if (state.currentSubmodule === "hotspots" && hotspotAnswered) {
          e.preventDefault();
          renderHotspot();
        } else if (state.currentSubmodule === "routes") {
          if (!routeAnswered && routeSelectedPin) {
            e.preventDefault();
            handleRouteSubmit();
          } else if (routeAnswered) {
            e.preventDefault();
            loadRouteScenario(ui.routeSelect?.value === "random" ? null : ui.routeSelect?.value);
          }
        }
      } else if (e.key === "F2") {
        e.preventDefault();
        if (state.currentSubmodule === "directions" && currentDirQ) speak(currentDirQ.audioText, 0.95);
        else if (state.currentSubmodule === "transitions" && currentTransQ) speak(currentTransQ.audioFull, 0.95);
        else if (state.currentSubmodule === "hotspots" && currentSpotQ) speak(currentSpotQ.audio, 0.95);
      }
    });

    // 监听 Hub 切换事件
    window.addEventListener("map-module-visible", () => {
      activateSubmodule(state.currentSubmodule || "shapes");
    });
  }

  function init() {
    updateSummary();
    bindEvents();
    if (state.trainingMode) {
      ui.modeBtns.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.mapMode === state.trainingMode);
      });
    }
  }

  init();
})();
