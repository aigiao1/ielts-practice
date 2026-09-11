// 雅思训练引擎统一底层数据库 (IndexedDB Wrapper: ielts_engine_v1)
(() => {
  "use strict";

  const DB_NAME = "ielts_engine_v1";
  const DB_VERSION = 1;

  class EngineDatabase {
    constructor() {
      this.db = null;
      this.readyPromise = this.init();
    }

    init() {
      if (!("indexedDB" in window)) {
        console.warn("IndexedDB is not supported in this browser. Fallback memory mode active.");
        return Promise.resolve(null);
      }

      return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);

        req.onupgradeneeded = (e) => {
          const db = e.target.result;

          // 1. attempts 仓库 (事实训练记录)
          if (!db.objectStoreNames.contains("attempts")) {
            const store = db.createObjectStore("attempts", { keyPath: "id" });
            store.createIndex("timestamp", "timestamp", { unique: false });
            store.createIndex("moduleType", "moduleType", { unique: false });
            store.createIndex("correct", "correct", { unique: false });
            store.createIndex("sessionId", "sessionId", { unique: false });
          }

          // 2. mistakes 仓库 (剑雅真题错题)
          if (!db.objectStoreNames.contains("mistakes")) {
            const store = db.createObjectStore("mistakes", { keyPath: "id" });
            store.createIndex("createdAt", "createdAt", { unique: false });
            store.createIndex("book", "book", { unique: false });
            store.createIndex("questionType", "questionType", { unique: false });
          }

          // 3. audio_assets 仓库 (持久化本地二进制音频 Blob)
          if (!db.objectStoreNames.contains("audio_assets")) {
            const store = db.createObjectStore("audio_assets", { keyPath: "id" });
            store.createIndex("createdAt", "createdAt", { unique: false });
          }

          // 4. review_items 仓库 (复习调度队列)
          if (!db.objectStoreNames.contains("review_items")) {
            const store = db.createObjectStore("review_items", { keyPath: "id" });
            store.createIndex("nextReviewAt", "nextReviewAt", { unique: false });
            store.createIndex("mistakeId", "mistakeId", { unique: false });
          }
        };

        req.onsuccess = (e) => {
          this.db = e.target.result;
          resolve(this.db);
        };

        req.onerror = (e) => {
          console.error("IndexedDB open error:", e);
          reject(e);
        };
      });
    }

    async getDb() {
      if (!this.db) await this.readyPromise;
      return this.db;
    }

    // 通用事务封装
    async runTx(storeName, mode, callback) {
      const db = await this.getDb();
      if (!db) return null;
      return new Promise((resolve, reject) => {
        try {
          const tx = db.transaction(storeName, mode);
          const store = tx.objectStore(storeName);
          const req = callback(store);

          tx.oncomplete = () => resolve(req?.result);
          tx.onerror = () => reject(tx.error);
        } catch (err) {
          reject(err);
        }
      });
    }

    // 1. PracticeAttempt 记录写入与查询
    async saveAttempt(attempt) {
      if (!attempt.id) {
        attempt.id = "att-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7);
      }
      if (!attempt.timestamp) {
        attempt.timestamp = Date.now();
      }
      return this.runTx("attempts", "readwrite", (store) => store.put(attempt));
    }

    async getRecentAttempts(limit = 100, moduleFilter = null) {
      const db = await this.getDb();
      if (!db) return [];
      return new Promise((resolve, reject) => {
        const tx = db.transaction("attempts", "readonly");
        const store = tx.objectStore("attempts");
        const index = store.index("timestamp");
        const req = index.openCursor(null, "prev");
        const results = [];

        req.onsuccess = (e) => {
          const cursor = e.target.result;
          if (cursor && results.length < limit) {
            const val = cursor.value;
            if (!moduleFilter || val.moduleType === moduleFilter) {
              results.push(val);
            }
            cursor.continue();
          } else {
            resolve(results);
          }
        };
        req.onerror = () => reject(tx.error);
      });
    }

    async getAttemptsStats(sinceTimestamp = 0) {
      const attempts = await this.getRecentAttempts(2000);
      const filtered = sinceTimestamp ? attempts.filter((a) => a.timestamp >= sinceTimestamp) : attempts;

      const stats = {
        total: filtered.length,
        correct: 0,
        wrong: 0,
        byModule: {},
        errorReasons: {}
      };

      for (const a of filtered) {
        if (a.correct) stats.correct += 1;
        else stats.wrong += 1;

        if (!stats.byModule[a.moduleType]) {
          stats.byModule[a.moduleType] = { total: 0, correct: 0 };
        }
        stats.byModule[a.moduleType].total += 1;
        if (a.correct) stats.byModule[a.moduleType].correct += 1;

        if (Array.isArray(a.errorReasons)) {
          for (const reason of a.errorReasons) {
            stats.errorReasons[reason] = (stats.errorReasons[reason] || 0) + 1;
          }
        }
      }

      return stats;
    }

    // 2. RealQuestionMistake 错题操作
    async saveMistake(mistake) {
      if (!mistake.id) {
        mistake.id = "mis-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7);
      }
      if (!mistake.createdAt) {
        mistake.createdAt = Date.now();
      }
      return this.runTx("mistakes", "readwrite", (store) => store.put(mistake));
    }

    async getAllMistakes() {
      const db = await this.getDb();
      if (!db) return [];
      return new Promise((resolve, reject) => {
        const tx = db.transaction("mistakes", "readonly");
        const store = tx.objectStore("mistakes");
        const index = store.index("createdAt");
        const req = index.openCursor(null, "prev");
        const results = [];

        req.onsuccess = (e) => {
          const cursor = e.target.result;
          if (cursor) {
            results.push(cursor.value);
            cursor.continue();
          } else {
            resolve(results);
          }
        };
        req.onerror = () => reject(tx.error);
      });
    }

    async getMistake(id) {
      return this.runTx("mistakes", "readonly", (store) => store.get(id));
    }

    async deleteMistake(id) {
      return this.runTx("mistakes", "readwrite", (store) => store.delete(id));
    }

    // 3. AudioAsset 二进制 Blob 音频持久化
    async saveAudioAsset(asset) {
      if (!asset.id) {
        asset.id = "aud-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7);
      }
      if (!asset.createdAt) {
        asset.createdAt = Date.now();
      }
      return this.runTx("audio_assets", "readwrite", (store) => store.put(asset));
    }

    async getAudioAsset(id) {
      return this.runTx("audio_assets", "readonly", (store) => store.get(id));
    }

    // 4. JSON 导出与恢复
    async exportAllData() {
      const db = await this.getDb();
      if (!db) return null;

      const attempts = await this.getRecentAttempts(5000);
      const mistakes = await this.getAllMistakes();

      // 音频资产元数据（暂不导出体积过大的 Blob 二进制，保留元信息）
      return {
        version: "1.0.0",
        exportedAt: new Date().toISOString(),
        attempts,
        mistakes
      };
    }

    async importAllData(jsonData) {
      if (!jsonData || typeof jsonData !== "object") {
        throw new Error("Invalid import JSON payload");
      }

      let importedAttempts = 0;
      let importedMistakes = 0;

      if (Array.isArray(jsonData.attempts)) {
        for (const a of jsonData.attempts) {
          await this.saveAttempt(a);
          importedAttempts++;
        }
      }

      if (Array.isArray(jsonData.mistakes)) {
        for (const m of jsonData.mistakes) {
          await this.saveMistake(m);
          importedMistakes++;
        }
      }

      return { importedAttempts, importedMistakes };
    }
  }

  window.IELTS_DB = new EngineDatabase();
})();
