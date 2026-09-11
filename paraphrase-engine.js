// 雅思听力同义替换动态出题引擎 (Paraphrase Engine)
(() => {
  "use strict";

  class ParaphraseEngine {
    constructor(corpus) {
      this.corpus = corpus || [];
      this.recentIds = [];
      this.maxRecent = 15;
    }

    setCorpus(corpus) {
      this.corpus = corpus || [];
    }

    // 防记忆抽取
    pickNextItem(filterConcept = "all") {
      let pool = this.corpus;
      if (filterConcept && filterConcept !== "all") {
        pool = pool.filter((item) => item.concept === filterConcept);
      }
      if (!pool.length) pool = this.corpus;

      // 排除最近出现过的题目
      const available = pool.filter((item) => !this.recentIds.includes(item.id));
      const candidates = available.length > 0 ? available : pool;

      const chosen = candidates[Math.floor(Math.random() * candidates.length)];

      this.recentIds.push(chosen.id);
      if (this.recentIds.length > this.maxRecent) {
        this.recentIds.shift();
      }

      return chosen;
    }

    // 动态生成 4 选 1 试题
    generateQuestion(filterConcept = "all") {
      const correctItem = this.pickNextItem(filterConcept);

      // 从其他概念池中抽取 3 个强干扰项
      const otherConcepts = this.corpus.filter((item) => item.concept !== correctItem.concept);
      const shuffledOthers = [...otherConcepts].sort(() => 0.5 - Math.random());
      const decoys = shuffledOthers.slice(0, 3);

      const options = [
        { text: correctItem.targetOption, isCorrect: true, concept: correctItem.concept },
        ...decoys.map((d) => ({ text: d.targetOption, isCorrect: false, concept: d.concept }))
      ];

      // 彻底打乱选项顺序 A/B/C/D
      options.sort(() => 0.5 - Math.random());

      const correctIndex = options.findIndex((o) => o.isCorrect);
      const labels = ["A", "B", "C", "D"];

      return {
        item: correctItem,
        sourceSpoken: correctItem.sourceSpoken,
        conceptZh: correctItem.conceptZh,
        contextSentence: correctItem.contextSentence,
        explanation: correctItem.explanation,
        options: options.map((opt, idx) => ({
          label: labels[idx],
          key: String(idx + 1),
          text: opt.text,
          isCorrect: opt.isCorrect,
          concept: opt.concept
        })),
        correctLabel: labels[correctIndex],
        correctKey: String(correctIndex + 1),
        correctOptionText: correctItem.targetOption
      };
    }
  }

  const engine = new ParaphraseEngine(
    typeof window !== "undefined" ? window.PARAPHRASE_DATABASE : []
  );

  if (typeof window !== "undefined") {
    window.ParaphraseEngine = engine;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { ParaphraseEngine };
  }
})();
