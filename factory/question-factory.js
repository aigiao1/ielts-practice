// 雅思智能出题工厂调度中枢 (Question Factory Orchestrator)
(() => {
  "use strict";

  class QuestionFactory {
    constructor(dependencies = {}) {
      this.userModel = dependencies.userModel || null;
      this.numberFactory = dependencies.numberFactory || null;
      this.paraphraseFactory = dependencies.paraphraseFactory || null;
      this.trapFactory = dependencies.trapFactory || null;

      this.initDefaultInstances();
    }

    initDefaultInstances() {
      if (typeof window !== "undefined") {
        if (!this.userModel && window.defaultUserModel) {
          this.userModel = window.defaultUserModel;
        }
        if (!this.numberFactory && window.NumberFactory && window.NumberDateEngine) {
          this.numberFactory = new window.NumberFactory(window.NumberDateEngine, this.userModel);
        }
        if (!this.paraphraseFactory && window.ParaphraseFactory && window.PARAPHRASE_CONCEPTS && window.DISTRACTOR_GROUPS) {
          this.paraphraseFactory = new window.ParaphraseFactory(
            window.PARAPHRASE_CONCEPTS,
            window.DISTRACTOR_GROUPS,
            this.userModel
          );
        }
        if (!this.trapFactory && window.TrapFactory) {
          this.trapFactory = new window.TrapFactory(undefined, this.userModel);
        }
      }
    }

    // 核心统一出题入口
    generate(skillType = "paraphrase", options = {}) {
      switch (skillType) {
        case "number_date":
        case "number":
          if (!this.numberFactory) throw new Error("NumberFactory not initialized");
          return {
            skillType: "number_date",
            ...this.numberFactory.generateQuestion(options.category || "all")
          };

        case "trap":
          if (!this.trapFactory) throw new Error("TrapFactory not initialized");
          return {
            skillType: "trap",
            ...this.trapFactory.generateQuestion(options)
          };

        case "paraphrase":
        default:
          if (!this.paraphraseFactory) throw new Error("ParaphraseFactory not initialized");
          return {
            skillType: "paraphrase",
            ...this.paraphraseFactory.generateQuestion(options)
          };
      }
    }

    // 统一记录作答并自适应调整权重
    recordResult(question, isCorrect) {
      if (!this.userModel || !question) return;

      const trackingId = question.conceptId || question.weightId || question.scenarioId;
      if (trackingId) {
        this.userModel.recordAttempt(trackingId, isCorrect);
      }
    }

    getWeights() {
      if (!this.userModel) return {};
      const res = {};
      for (const [k, v] of this.userModel.weights.entries()) {
        res[k] = v;
      }
      return res;
    }
  }

  const defaultQuestionFactory = new QuestionFactory();

  if (typeof window !== "undefined") {
    window.QuestionFactory = QuestionFactory;
    window.defaultQuestionFactory = defaultQuestionFactory;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { QuestionFactory, defaultQuestionFactory };
  }
})();
