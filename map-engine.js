// 雅思听力地图题随机生成与防记忆引擎 (IELTS Map Training Dynamic Engine)
(() => {
  "use strict";

  // 伪随机数发生器 (Mulberry32)
  function createPrng(seed) {
    let a = (seed ^ 0xdeadbeef) >>> 0;
    return function next() {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  class MapEngine {
    constructor() {
      this.sessionSeed = Math.floor(Math.random() * 1000000);
      this.prng = createPrng(this.sessionSeed);
      this.mode = "practice"; // 'learning' | 'practice' | 'exam'

      // 防记忆滑动窗口
      this.history = {
        questionIds: [],    // 最近 20 题
        expressions: [],    // 最近 5 个核心表达
        layouts: []         // 最近 3 个地图/场景
      };

      this.loadHistory();
    }

    loadHistory() {
      try {
        const saved = JSON.parse(localStorage.getItem("ielts-map-history-v2"));
        if (saved) {
          this.history.questionIds = saved.questionIds || [];
          this.history.expressions = saved.expressions || [];
          this.history.layouts = saved.layouts || [];
        }
      } catch {}
    }

    saveHistory() {
      try {
        localStorage.setItem("ielts-map-history-v2", JSON.stringify(this.history));
      } catch {}
    }

    resetSession() {
      this.sessionSeed = Math.floor(Math.random() * 1000000);
      this.prng = createPrng(this.sessionSeed);
      this.history = { questionIds: [], expressions: [], layouts: [] };
      this.saveHistory();
    }

    random() {
      return this.prng();
    }

    randomChoice(arr) {
      if (!arr || !arr.length) return null;
      return arr[Math.floor(this.random() * arr.length)];
    }

    shuffle(arr) {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(this.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }

    trackRecent(id, expression, layout) {
      if (id) {
        this.history.questionIds.push(id);
        if (this.history.questionIds.length > 20) this.history.questionIds.shift();
      }
      if (expression) {
        this.history.expressions.push(expression);
        if (this.history.expressions.length > 5) this.history.expressions.shift();
      }
      if (layout) {
        this.history.layouts.push(layout);
        if (this.history.layouts.length > 3) this.history.layouts.shift();
      }
      this.saveHistory();
    }

    // 候选 Pin 标签动态随机洗牌 (物理坐标不变，A-I 字母完全随机映射)
    shufflePinLetters(slots, maxPins = 5) {
      const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"].slice(0, Math.min(slots.length, maxPins));
      const shuffledLetters = this.shuffle(letters);

      let answerLetter = null;
      const mappedPins = slots.slice(0, maxPins).map((slot, index) => {
        const assignedLetter = shuffledLetters[index];
        if (slot.isAnswer) {
          answerLetter = assignedLetter;
        }
        return {
          ...slot,
          letter: assignedLetter
        };
      });

      // 按字母顺序 A, B, C... 返回或者按位置渲染
      return {
        pins: mappedPins,
        answerLetter: answerLetter || mappedPins[0].letter
      };
    }

    // 1. 模块二：方位表达训练题目生成器
    generateDirectionQuestion() {
      const exprData = window.MAP_DIRECTION_DATA || { expressions: [], slotCoordinates: {} };
      const landmarks = window.MAP_LANDMARKS_DATA || [];
      const expressions = exprData.expressions;
      const coords = exprData.slotCoordinates;

      // 过滤最近 5 次出现的表达
      let availableExprs = expressions.filter((e) => !this.history.expressions.includes(e.id));
      if (!availableExprs.length) availableExprs = expressions;
      const expr = this.randomChoice(availableExprs);

      // 随机抽取中央 Landmark 与目标 Landmark
      const shuffledLandmarks = this.shuffle(landmarks);
      const center = shuffledLandmarks[0] || { term: "Library", chinese: "图书馆" };
      const target = shuffledLandmarks[1] || { term: "Museum", chinese: "博物馆" };

      // 确定目标槽位及候选干扰槽位
      const targetSlotName = expr.targetSlot;
      const allSlots = Object.keys(coords);
      const distractorSlots = this.shuffle(allSlots.filter((s) => s !== targetSlotName)).slice(0, 3);

      const chosenSlotNames = this.shuffle([targetSlotName, ...distractorSlots]);
      const rawPins = chosenSlotNames.map((slotName) => {
        const pt = coords[slotName];
        // 加入 ±6px 微幅抖动
        const jitterX = Math.round((this.random() - 0.5) * 12);
        const jitterY = Math.round((this.random() - 0.5) * 12);
        return {
          slotName,
          x: pt.x + jitterX,
          y: pt.y + jitterY,
          isAnswer: slotName === targetSlotName
        };
      });

      const { pins, answerLetter } = this.shufflePinLetters(rawPins, 4);

      // 替换句子模板
      const template = this.randomChoice(expr.sentenceTemplates);
      const audioSentence = template.replace(/{target}/g, target.term).replace(/{center}/g, center.term);
      const explanation = expr.explanation.replace(/{center}/g, center.term).replace(/{letter}/g, answerLetter);

      const qId = `dir-${expr.id}-${center.id}-${Date.now()}`;
      this.trackRecent(qId, expr.id, center.id);

      return {
        id: qId,
        expressionId: expr.id,
        phrase: expr.phrase,
        phraseCn: expr.phraseCn,
        centerName: center.term,
        centerCn: center.chinese,
        centerIndoor: center.indoor,
        targetName: target.term,
        targetCn: target.chinese,
        audioText: audioSentence,
        showNorth: expr.requiresNorth !== false,
        pins,
        answer: answerLetter,
        explanation
      };
    }

    // 2. 模块三：空间过渡与参照物题目生成器
    generateSpatialQuestion() {
      const templates = window.MAP_SPATIAL_DATA || [];
      const landmarks = window.MAP_LANDMARKS_DATA || [];

      // 排除最近出现过的模板
      let available = templates.filter((t) => !this.history.layouts.includes(t.id));
      if (!available.length) available = templates;
      const tpl = this.randomChoice(available);

      // 插槽地标选择
      const getLandmarkName = (slotKey) => {
        if (tpl.slots && tpl.slots[slotKey]) {
          return this.randomChoice(tpl.slots[slotKey]);
        }
        const r = this.randomChoice(landmarks);
        return r ? r.term : "Hall";
      };

      const slotValues = {
        start: getLandmarkName("start"),
        mid: getLandmarkName("mid"),
        mid1: getLandmarkName("mid1"),
        mid2: getLandmarkName("mid2"),
        target: getLandmarkName("target"),
        decoy1: getLandmarkName("decoy1"),
        decoy2: getLandmarkName("decoy2")
      };

      // 填充音频文本与步骤
      const fillText = (txt) => {
        if (!txt) return "";
        let res = txt;
        for (const [k, v] of Object.entries(slotValues)) {
          res = res.replaceAll(`{${k}}`, v);
        }
        return res;
      };

      const audioSteps = tpl.audioSteps.map((s) => fillText(s));
      const stepCoords = (tpl.stepCoords || []).map((sc) => ({
        ...sc,
        label: fillText(sc.label)
      }));

      // 洗牌候选 Pin 点字母
      const rawPins = (tpl.candidateSlots || []).map((cs) => ({
        ...cs,
        tag: fillText(cs.tag)
      }));
      const { pins, answerLetter } = this.shufflePinLetters(rawPins, 4);

      const qId = `sp-${tpl.id}-${Date.now()}`;
      this.trackRecent(qId, tpl.relation, tpl.id);

      return {
        id: qId,
        relation: tpl.relation,
        title: fillText(tpl.title),
        layoutType: tpl.layoutType,
        audioSteps,
        audioFull: audioSteps.join(" "),
        stepCoords,
        pins,
        answer: answerLetter,
        targetName: slotValues.target,
        teaching: fillText(tpl.teaching)
      };
    }

    // 3. 模块四：路线跟随题目生成器 (10 套地图 + 30+ 路线)
    generateRouteQuestion(preferredMapId = null) {
      const allMaps = window.MAP_ROUTE_MAPS_DATA || [];
      if (!allMaps.length) return null;

      let map = null;
      if (preferredMapId) {
        map = allMaps.find((m) => m.id === preferredMapId);
      }
      if (!map) {
        // 过滤最近用过的 2 张地图
        let availableMaps = allMaps.filter((m) => !this.history.layouts.includes(m.id));
        if (!availableMaps.length) availableMaps = allMaps;
        map = this.randomChoice(availableMaps);
      }

      // 随机抽取该地图的 3 条路线之一
      const chosenRoute = this.randomChoice(map.routes);

      // 对候选位置进行 A-E 字母随机重洗映射！
      const rawPositions = map.candidatePositions.map((pos) => ({
        ...pos,
        isAnswer: pos.slotId === chosenRoute.targetSlotId
      }));

      const { pins, answerLetter } = this.shufflePinLetters(rawPositions, 5);

      const qId = `rt-${map.id}-${chosenRoute.id}-${Date.now()}`;
      this.trackRecent(qId, chosenRoute.id, map.id);

      return {
        id: qId,
        mapId: map.id,
        mapTitle: map.title,
        context: map.context,
        mapWidth: map.mapWidth,
        mapHeight: map.mapHeight,
        startPoint: map.startPoint,
        svgFeatures: map.svgFeatures,
        question: chosenRoute.question,
        steps: chosenRoute.steps,
        pathCoords: chosenRoute.pathCoords,
        pins,
        answer: answerLetter,
        explanation: chosenRoute.explanation
      };
    }

    // 4. 模块五：高频位置秒杀生成器 (30+ 场景)
    generateHotspotQuestion() {
      const templates = window.MAP_HOTSPOT_DATA || [];
      if (!templates.length) return null;

      // 排除最近出现过的表达与分类
      let available = templates.filter((t) => !this.history.expressions.includes(t.phrase));
      if (!available.length) available = templates;
      const tpl = this.randomChoice(available);

      const { pins, answerLetter } = this.shufflePinLetters(tpl.candidateSlots, 4);

      const qId = `hs-${tpl.id}-${Date.now()}`;
      this.trackRecent(qId, tpl.phrase, tpl.category);

      return {
        id: qId,
        phrase: tpl.phrase,
        phraseCn: tpl.phraseCn,
        audio: tpl.audio,
        svgRoad: tpl.svgRoad,
        pins,
        answer: answerLetter,
        teaching: tpl.teaching
      };
    }
  }

  window.MapEngine = new MapEngine();
})();
