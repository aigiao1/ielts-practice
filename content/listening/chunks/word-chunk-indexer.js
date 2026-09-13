// 单词 ↔ 词块双向关联索引器 (Word ↔ Chunk Bidirectional Indexer)
// 职责：在内存中建立“单词基根 ➔ 真题词块”与“词块 ➔ 构件词汇”的双向倒排索引
(() => {
  "use strict";

  class WordChunkIndexerClass {
    constructor() {
      this.wordToChunks = new Map(); // word (lowercase) -> Array of chunk items
      this.chunkToWords = new Map(); // chunkId -> Array of matching words
      this.isIndexed = false;
    }

    /**
     * 简单的英文词形归一化 (词根去复数/ing/ed等轻量归一化)
     */
    static normalizeToken(token) {
      if (!token) return "";
      let t = String(token).toLowerCase().trim();
      // 常见轻量词形变换还原
      if (t.endsWith("ies") && t.length > 4) t = t.slice(0, -3) + "y";
      else if (t.endsWith("es") && t.length > 4 && /(sh|ch|x|z|ss)$/.test(t.slice(0, -2))) t = t.slice(0, -2);
      else if (t.endsWith("s") && !t.endsWith("ss") && t.length > 3) t = t.slice(0, -1);
      return t;
    }

    /**
     * 构建双向倒排索引
     * @param {Array} chunksList 词块包数组 (e.g. [wangluChunksPack, advancedChunksPack])
     * @param {Array} wordsList 可选的基准单词列表 (e.g. wangluCorePack.items)
     */
    buildIndex(chunksList = [], wordsList = []) {
      this.wordToChunks.clear();
      this.chunkToWords.clear();

      // 1. 注册基准单词 (如有)
      const baseWordSet = new Set();
      (wordsList || []).forEach((w) => {
        const text = typeof w === "string" ? w : (w.word || w.term || w.id);
        if (text) {
          const norm = WordChunkIndexerClass.normalizeToken(text);
          baseWordSet.add(norm);
          baseWordSet.add(text.toLowerCase());
        }
      });

      // 2. 遍历所有注册的词块包
      chunksList.forEach((pack) => {
        if (!pack || !pack.items) return;

        pack.items.forEach((chunk) => {
          const chunkId = chunk.contentKey || chunk.id;
          const components = chunk.components || [];

          // 记录 chunk 对应的构件
          this.chunkToWords.set(chunkId, components);

          // 建立 components ➔ chunk 映射
          components.forEach((comp) => {
            const normComp = WordChunkIndexerClass.normalizeToken(comp);
            const keysToBind = new Set([comp.toLowerCase(), normComp]);

            keysToBind.forEach((k) => {
              if (!this.wordToChunks.has(k)) {
                this.wordToChunks.set(k, []);
              }
              const existingList = this.wordToChunks.get(k);
              if (!existingList.some((c) => (c.contentKey || c.id) === chunkId)) {
                existingList.push(chunk);
              }
            });
          });
        });
      });

      this.isIndexed = true;
      return this;
    }

    /**
     * 查询指定单词关联的真题词块
     * @param {string} word 查询词汇
     * @param {Object} filterOptions 过滤选项 (suitability: 'high' | 'recognition_only' | 'all')
     */
    getChunksForWord(word, filterOptions = {}) {
      if (!word) return [];
      const rawKey = String(word).toLowerCase().trim();
      const normKey = WordChunkIndexerClass.normalizeToken(rawKey);

      const candidates = (this.wordToChunks.get(rawKey) || [])
        .concat(this.wordToChunks.get(normKey) || []);

      // 去重
      const seen = new Set();
      const uniqueChunks = candidates.filter((c) => {
        const id = c.contentKey || c.id;
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
      });

      // 按照适宜度或训练角色过滤
      if (filterOptions.suitability && filterOptions.suitability !== "all") {
        return uniqueChunks.filter((c) => c.productiveSuitability === filterOptions.suitability);
      }
      if (filterOptions.role) {
        return uniqueChunks.filter((c) => (c.trainingRole || []).includes(filterOptions.role));
      }

      return uniqueChunks;
    }

    /**
     * 检查单词是否有收录关联词块
     */
    hasChunks(word) {
      if (!word) return false;
      const rawKey = String(word).toLowerCase().trim();
      const normKey = WordChunkIndexerClass.normalizeToken(rawKey);
      return (this.wordToChunks.has(rawKey) && this.wordToChunks.get(rawKey).length > 0) ||
             (this.wordToChunks.has(normKey) && this.wordToChunks.get(normKey).length > 0);
    }

    /**
     * 索引总量概况
     */
    getStats() {
      return {
        indexedWordsCount: this.wordToChunks.size,
        indexedChunksCount: this.chunkToWords.size
      };
    }
  }

  const WordChunkIndexer = new WordChunkIndexerClass();

  if (typeof window !== "undefined") {
    window.WordChunkIndexer = WordChunkIndexer;
    window.WordChunkIndexerClass = WordChunkIndexerClass;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { WordChunkIndexer, WordChunkIndexerClass };
  }
})();
