// 用户模型与自适应权重系统 (User Model & Adaptive Weights)
(() => {
  "use strict";

  const STORAGE_KEY = "ielts_user_model_v1";

  class UserModel {
    constructor(options = {}) {
      this.recentWindowSize = options.recentWindowSize || 15;
      this.weights = new Map(); // id -> float (default 1.0)
      this.stats = new Map();   // id -> { errorCount, correctCount, total }
      this.recentIds = [];      // 滑动窗口去重队列
      this.load();
    }

    load() {
      if (typeof localStorage === "undefined") return;
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const data = JSON.parse(raw);
        if (data.weights) {
          for (const [k, v] of Object.entries(data.weights)) {
            this.weights.set(k, parseFloat(v) || 1.0);
          }
        }
        if (data.stats) {
          for (const [k, v] of Object.entries(data.stats)) {
            this.stats.set(k, v);
          }
        }
      } catch (e) {
        console.warn("UserModel load failed:", e);
      }
    }

    save() {
      if (typeof localStorage === "undefined") return;
      try {
        const weightsObj = {};
        for (const [k, v] of this.weights.entries()) {
          weightsObj[k] = v;
        }
        const statsObj = {};
        for (const [k, v] of this.stats.entries()) {
          statsObj[k] = v;
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          weights: weightsObj,
          stats: statsObj,
          updatedAt: Date.now()
        }));
      } catch (e) {
        console.warn("UserModel save failed:", e);
      }
    }

    getWeight(id) {
      if (!this.weights.has(id)) return 1.0;
      return this.weights.get(id);
    }

    recordAttempt(id, isCorrect) {
      const curWeight = this.getWeight(id);
      let newWeight = curWeight;

      if (isCorrect) {
        // 答对：降低权重，最低 0.2
        newWeight = Math.max(0.2, Number((curWeight * 0.8).toFixed(3)));
      } else {
        // 答错：大幅提高权重惩罚，最高 5.0
        newWeight = Math.min(5.0, Number((curWeight * 1.5).toFixed(3)));
      }
      this.weights.set(id, newWeight);

      // 统计次数
      const stat = this.stats.get(id) || { errorCount: 0, correctCount: 0, total: 0 };
      stat.total++;
      if (isCorrect) stat.correctCount++;
      else stat.errorCount++;
      this.stats.set(id, stat);

      this.save();
      return newWeight;
    }

    markSeen(id) {
      if (!id) return;
      this.recentIds.push(id);
      if (this.recentIds.length > this.recentWindowSize) {
        this.recentIds.shift();
      }
    }

    isRecentlySeen(id) {
      return this.recentIds.includes(id);
    }

    clearRecent() {
      this.recentIds = [];
    }

    // 核心算法：加权轮盘赌抽选（结合滑动窗口防连续重复）
    pickWeighted(candidates, getIdFn = (item) => item.id) {
      if (!candidates || !candidates.length) return null;
      if (candidates.length === 1) return candidates[0];

      // 1. 优先从排除“最近出现过”的候选中抽
      let available = candidates.filter((c) => !this.isRecentlySeen(getIdFn(c)));
      if (available.length === 0) {
        available = candidates;
      }

      // 2. 计算权重总和
      let totalWeight = 0;
      const weights = available.map((item) => {
        const w = this.getWeight(getIdFn(item));
        totalWeight += w;
        return w;
      });

      // 3. 轮盘赌加权随机
      const randomThreshold = Math.random() * totalWeight;
      let runningSum = 0;
      for (let i = 0; i < available.length; i++) {
        runningSum += weights[i];
        if (runningSum >= randomThreshold) {
          const chosen = available[i];
          this.markSeen(getIdFn(chosen));
          return chosen;
        }
      }

      const fallback = available[available.length - 1];
      this.markSeen(getIdFn(fallback));
      return fallback;
    }

    reset() {
      this.weights.clear();
      this.stats.clear();
      this.recentIds = [];
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }

  const defaultModel = new UserModel();

  if (typeof window !== "undefined") {
    window.UserModel = UserModel;
    window.defaultUserModel = defaultModel;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { UserModel, defaultModel };
  }
})();
