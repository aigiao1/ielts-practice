// 同义替换动态组装出题工厂 (Paraphrase Factory)
(() => {
  "use strict";

  function pickRandom(arr) {
    if (!arr || !arr.length) return "";
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  class ParaphraseFactory {
    constructor(concepts, distractorGroups, userModel) {
      this.concepts = concepts || [];
      this.distractorGroups = distractorGroups || {};
      this.userModel = userModel || null;
      this.conceptMap = new Map();
      for (const c of this.concepts) {
        this.conceptMap.set(c.id, c);
      }
    }

    setConcepts(concepts, distractorGroups) {
      this.concepts = concepts || [];
      this.distractorGroups = distractorGroups || {};
      this.conceptMap.clear();
      for (const c of this.concepts) {
        this.conceptMap.set(c.id, c);
      }
    }

    // 插槽渲染引擎：将 {slotKey} 替换为随机槽位值
    renderTemplate(tpl, slots = {}) {
      if (!tpl) return "";
      return tpl.replace(/\{(\w+)\}/g, (match, key) => {
        if (slots[key] && Array.isArray(slots[key]) && slots[key].length > 0) {
          return pickRandom(slots[key]);
        }
        return match; // 未配置插槽则保留
      });
    }

    // 抽取同组高仿干扰项
    getDistractors(targetConcept, count = 3) {
      const distractors = [];
      const sameGroupIds = (this.distractorGroups[targetConcept.distractorGroup] || [])
        .filter((id) => id !== targetConcept.id);

      // 1. 优先从同组相近概念中提取目标句型
      const shuffledSameGroup = shuffle(sameGroupIds);
      for (const id of shuffledSameGroup) {
        const concept = this.conceptMap.get(id);
        if (concept && concept.targetPatterns && concept.targetPatterns.length > 0) {
          const rawPattern = pickRandom(concept.targetPatterns);
          const renderedText = this.renderTemplate(rawPattern, concept.slots || {});
          if (!distractors.some((d) => d.text === renderedText)) {
            distractors.push({
              text: renderedText,
              conceptId: concept.id,
              isSameGroup: true
            });
          }
        }
        if (distractors.length >= count) break;
      }

      // 2. 如果同组数量不足，从全局其他组备选补充
      if (distractors.length < count) {
        const otherConcepts = this.concepts.filter(
          (c) => c.id !== targetConcept.id && !distractors.some((d) => d.conceptId === c.id)
        );
        const shuffledOthers = shuffle(otherConcepts);
        for (const oc of shuffledOthers) {
          const rawPattern = pickRandom(oc.targetPatterns);
          const renderedText = this.renderTemplate(rawPattern, oc.slots || {});
          if (!distractors.some((d) => d.text === renderedText)) {
            distractors.push({
              text: renderedText,
              conceptId: oc.id,
              isSameGroup: false
            });
          }
          if (distractors.length >= count) break;
        }
      }

      return distractors;
    }

    // 动态组装试题
    generateQuestion(options = {}) {
      let pool = this.concepts;

      // 难度过滤 (Level 1~5)
      if (options.level) {
        const filtered = pool.filter((c) => c.difficulty === options.level);
        if (filtered.length > 0) pool = filtered;
      }

      // 类别过滤
      if (options.category) {
        const filtered = pool.filter((c) => c.category === options.category);
        if (filtered.length > 0) pool = filtered;
      }

      // 结合用户模型加权轮盘赌抽选薄弱概念
      let chosenConcept = null;
      if (this.userModel && typeof this.userModel.pickWeighted === "function") {
        chosenConcept = this.userModel.pickWeighted(pool, (c) => c.id);
      } else {
        chosenConcept = pickRandom(pool);
      }

      // 随机渲染听力原文与正确选项
      const rawSource = pickRandom(chosenConcept.sourcePatterns);
      const rawTarget = pickRandom(chosenConcept.targetPatterns);

      const sourceSpoken = this.renderTemplate(rawSource, chosenConcept.slots || {});
      const correctTarget = this.renderTemplate(rawTarget, chosenConcept.slots || {});

      // 抽取 3 个高仿干扰项
      const decoys = this.getDistractors(chosenConcept, 3);

      const optionItems = [
        { text: correctTarget, isCorrect: true, conceptId: chosenConcept.id },
        ...decoys.map((d) => ({ text: d.text, isCorrect: false, conceptId: d.conceptId }))
      ];

      // 选项随机打乱
      const shuffledOptions = shuffle(optionItems);
      const correctIdx = shuffledOptions.findIndex((o) => o.isCorrect);
      const labels = ["A", "B", "C", "D"];

      const explanation = chosenConcept.explanationTpl
        ? this.renderTemplate(chosenConcept.explanationTpl, chosenConcept.slots || {})
        : `考点概念：${chosenConcept.meaningZh}。`;

      return {
        conceptId: chosenConcept.id,
        category: chosenConcept.category,
        difficulty: chosenConcept.difficulty,
        meaningZh: chosenConcept.meaningZh,
        sourceSpoken,
        correctTarget,
        options: shuffledOptions.map((opt, idx) => ({
          label: labels[idx],
          key: String(idx + 1),
          text: opt.text,
          isCorrect: opt.isCorrect,
          conceptId: opt.conceptId
        })),
        correctLabel: labels[correctIdx],
        correctKey: String(correctIdx + 1),
        explanation
      };
    }
  }

  if (typeof window !== "undefined") {
    window.ParaphraseFactory = ParaphraseFactory;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { ParaphraseFactory };
  }
})();
