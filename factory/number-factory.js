// 数字日期自适应工厂 (Number Factory with Adaptive Weights)
(() => {
  "use strict";

  // 依赖 number-date-engine.js 中的 NumberDateGenerator
  class NumberFactory {
    constructor(engine, userModel) {
      this.engine = engine || (typeof window !== "undefined" ? window.NumberDateEngine : null);
      this.userModel = userModel || null;

      this.categories = [
        { id: "teen_ty", name: "-teen vs -ty 辨析" },
        { id: "date", name: "英式考点日期与年份" },
        { id: "time", name: "时间与钟点表达" },
        { id: "money", name: "英镑与美元价格" },
        { id: "phone_code", name: "电话连读与英式邮编" },
        { id: "large_number", name: "百万级与十万级大数" }
      ];
    }

    setEngine(engine) {
      this.engine = engine;
    }

    setUserModel(userModel) {
      this.userModel = userModel;
    }

    generateQuestion(filterCat = "all") {
      if (!this.engine) {
        throw new Error("NumberDateEngine is not available in NumberFactory");
      }

      let categoryToUse = filterCat;

      // 若为 all，利用 userModel 加权轮盘赌自动向弱项倾斜
      if (filterCat === "all" && this.userModel && typeof this.userModel.pickWeighted === "function") {
        const picked = this.userModel.pickWeighted(this.categories, (c) => `num_${c.id}`);
        if (picked) categoryToUse = picked.id;
      }

      const q = this.engine.nextQuestion(categoryToUse);
      return {
        ...q,
        weightId: `num_${q.category}`
      };
    }

    checkAnswer(userInput, item) {
      if (!this.engine) return { correct: false };
      return this.engine.checkAnswer(userInput, item);
    }
  }

  if (typeof window !== "undefined") {
    window.NumberFactory = NumberFactory;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { NumberFactory };
  }
})();
