// 雅思训练引擎统一底层数据库 (IndexedDB Wrapper: ielts_engine_v1)
(() => {
  "use strict";

  const DB_NAME = "ielts_engine_v1";
  const DB_VERSION = 2;

  class EngineDatabase {
    constructor() {
      this.db = null;
      this.readyPromise = this.init();
    }

    init() {
      if (typeof window !== "undefined" && !("indexedDB" in window)) {
        console.warn("IndexedDB is not supported in this browser. Fallback memory mode active.");
        return Promise.resolve(null);
      }

      const idb = typeof indexedDB !== "undefined" ? indexedDB : (typeof window !== "undefined" ? window.indexedDB : null);
      if (!idb) return Promise.resolve(null);

      return new Promise((resolve, reject) => {
        const req = idb.open(DB_NAME, DB_VERSION);

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

          // 5. user_content 仓库 (v2 新增：存放用户自增的生词、笔记、错题)
          if (!db.objectStoreNames.contains("user_content")) {
            const store = db.createObjectStore("user_content", { keyPath: "id" });
            store.createIndex("domain", "domain", { unique: false });
            store.createIndex("contentType", "contentType", { unique: false });
            store.createIndex("status", "status", { unique: false });
            store.createIndex("createdAt", "createdAt", { unique: false });
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

    async getAttemptsByTimeRange(startTimestamp, endTimestamp) {
      const db = await this.getDb();
      if (!db) return [];
      return new Promise((resolve, reject) => {
        const tx = db.transaction("attempts", "readonly");
        const store = tx.objectStore("attempts");
        const index = store.index("timestamp");
        const range = IDBKeyRange.bound(startTimestamp, endTimestamp);
        const req = index.openCursor(range);
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

    // 4. user_content 用户自增生词、笔记与自定义内容 (v2 新增)
    async saveUserContent(item) {
      if (!item.id) {
        item.id = "uc-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7);
      }
      if (!item.createdAt) {
        item.createdAt = Date.now();
      }
      item.updatedAt = Date.now();
      return this.runTx("user_content", "readwrite", (store) => store.put(item));
    }

    async getAllUserContent(filter = null) {
      const db = await this.getDb();
      if (!db) return [];
      return new Promise((resolve, reject) => {
        const tx = db.transaction("user_content", "readonly");
        const store = tx.objectStore("user_content");
        const req = store.openCursor();
        const results = [];

        req.onsuccess = (e) => {
          const cursor = e.target.result;
          if (cursor) {
            const val = cursor.value;
            let match = true;
            if (filter) {
              if (filter.domain && val.domain !== filter.domain) match = false;
              if (filter.contentType && val.contentType !== filter.contentType) match = false;
              if (filter.status && val.status !== filter.status) match = false;
            }
            if (match) results.push(val);
            cursor.continue();
          } else {
            resolve(results);
          }
        };
        req.onerror = () => reject(tx.error);
      });
    }

    async getUserContent(id) {
      return this.runTx("user_content", "readonly", (store) => store.get(id));
    }

    async deleteUserContent(id) {
      return this.runTx("user_content", "readwrite", (store) => store.delete(id));
    }

    // 6. review_items 复习调度队列
    async saveReviewItem(item) {
      if (!item.id) {
        item.id = "rev-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7);
      }
      if (!item.createdAt) {
        item.createdAt = Date.now();
      }
      return this.runTx("review_items", "readwrite", (store) => store.put(item));
    }

    async scheduleChunkReview(chunkKey, intervalMs = 86400000) {
      const item = {
        id: "rev-chunk-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
        chunkKey,
        moduleType: "chunk_aural",
        scheduledAt: Date.now(),
        nextReviewAt: Date.now() + intervalMs,
        status: "pending"
      };
      return this.saveReviewItem(item);
    }

    async getPendingReviews(targetTimestamp = Date.now()) {
      const db = await this.getDb();
      if (!db) return [];
      return new Promise((resolve, reject) => {
        const tx = db.transaction("review_items", "readonly");
        const store = tx.objectStore("review_items");
        const index = store.index("nextReviewAt");
        const range = IDBKeyRange.upperBound(targetTimestamp);
        const req = index.openCursor(range);
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

    // 5. JSON 导出与恢复 (升级支持 user_content，兼容 v1/v2)
    async exportAllData() {
      const db = await this.getDb();
      if (!db) return null;

      const attempts = await this.getRecentAttempts(5000);
      const mistakes = await this.getAllMistakes();
      const user_content = await this.getAllUserContent();

      return {
        schemaVersion: 2,
        version: "2.0.0",
        exportedAt: new Date().toISOString(),
        attempts,
        mistakes,
        user_content
      };
    }

    async importAllData(jsonData) {
      if (!jsonData || typeof jsonData !== "object") {
        throw new Error("Invalid import JSON payload");
      }

      let importedAttempts = 0;
      let importedMistakes = 0;
      let importedUserContent = 0;

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

      // v2 增量导入 user_content
      if (Array.isArray(jsonData.user_content)) {
        for (const uc of jsonData.user_content) {
          await this.saveUserContent(uc);
          importedUserContent++;
        }
      }

      return { importedAttempts, importedMistakes, importedUserContent };
    }
  }

  if (typeof window !== "undefined") {
    window.IELTS_DB = new EngineDatabase();
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { EngineDatabase, DB_NAME, DB_VERSION };
  }
})();
