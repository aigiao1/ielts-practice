// 雅思统一内容注册中枢 (Content Registry v1)
// 职责：聚合 Bundled Packs (静态包) 与 User Content (IndexedDB 动态生词/笔记)，统一提供查询 API
(() => {
  "use strict";

  class ContentRegistryClass {
    constructor() {
      this.packs = new Map();
      this.userItems = [];
      this.isReady = false;
      this._initResolve = null;
      this._initReject = null;
      this.readyPromise = new Promise((resolve, reject) => {
        this._initResolve = resolve;
        this._initReject = reject;
      });
    }

    // 注册静态内容包 (Pack)
    registerPack(pack) {
      if (!pack || !pack.packId) {
        console.warn("[ContentRegistry] 无效的 Pack 对象", pack);
        return;
      }

      // 对 Item 实施元数据继承与 contentKey 强化
      const packMeta = pack.metadata || {};
      const normalizedItems = (pack.items || []).map((item) => {
        const contentKey = `${pack.packId}:${item.id}`;
        return {
          ...item,
          contentKey,
          packId: pack.packId,
          domain: item.domain || pack.domain,
          contentType: item.contentType || pack.contentType,
          sourceType: item.sourceType || packMeta.sourceType || "human_curated",
          sourceRef: item.sourceRef || packMeta.sourceRef || "",
          origin: item.origin || packMeta.origin || "bundled",
          reviewStatus: item.reviewStatus || packMeta.reviewStatus || "imported",
          status: item.status || packMeta.status || "active",
          tags: Array.isArray(item.tags) ? item.tags : (packMeta.tags || [])
        };
      });

      const normalizedPack = {
        ...pack,
        items: normalizedItems
      };

      this.packs.set(pack.packId, normalizedPack);
      return normalizedPack;
    }

    // 异步初始化生命周期：确保 Bundled + IndexedDB user_content 完全就绪
    async init() {
      if (this.isReady) return this.readyPromise;

      try {
        // 1. 自动挂载 window 上预先挂载的静态数据包 (若有)
        if (typeof window !== "undefined" && window._PRELOADED_PACKS) {
          for (const p of window._PRELOADED_PACKS) {
            this.registerPack(p);
          }
        }

        // 2. 等待 IndexedDB 数据库连接
        if (typeof window !== "undefined" && window.IELTS_DB) {
          await window.IELTS_DB.readyPromise;

          // 3. 从 IndexedDB 提取用户自定义增量内容 (生词、笔记、错题)
          if (typeof window.IELTS_DB.getAllUserContent === "function") {
            const storedUserContent = await window.IELTS_DB.getAllUserContent();
            this.userItems = (storedUserContent || [])
              .filter((item) => item.status !== "disabled")
              .map((item) => ({
                ...item,
                contentKey: item.contentKey || `user_content:${item.id}`,
                origin: item.origin || "user_added",
                reviewStatus: item.reviewStatus || "draft",
                status: item.status || "active"
              }));
          }
        }

        this.isReady = true;
        this._initResolve(this);

        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("ielts-content-ready", { detail: this }));
        }
      } catch (err) {
        console.error("[ContentRegistry] 初始化失败:", err);
        // 容错降级：即使 IndexedDB 失败，静态 Packs 依然可用
        this.isReady = true;
        this._initResolve(this);
      }

      return this.readyPromise;
    }

    // 核心查询接口：按 domain 和 contentType 获取聚合后的全量题目
    getItems(domain, contentType, filterFn = null) {
      const results = [];

      // 1. 收集所有 active 的静态 Packs 中的题目
      for (const pack of this.packs.values()) {
        if (pack.status === "disabled") continue;
        if (domain && pack.domain !== domain) continue;
        if (contentType && pack.contentType !== contentType) continue;

        for (const item of pack.items) {
          if (item.status === "disabled") continue;
          if (!filterFn || filterFn(item)) {
            results.push(item);
          }
        }
      }

      // 2. 收集用户后来在 IndexedDB 中添加的内容 (无缝融合)
      for (const item of this.userItems) {
        if (domain && item.domain !== domain) continue;
        if (contentType && item.contentType !== contentType) continue;
        if (item.status === "disabled") continue;
        if (!filterFn || filterFn(item)) {
          results.push(item);
        }
      }

      return results;
    }

    // 获取特定 Pack
    getPack(packId) {
      return this.packs.get(packId) || null;
    }

    // 获取满足条件的 Packs 列表
    getPacks(domain, contentType) {
      const list = [];
      for (const pack of this.packs.values()) {
        if (domain && pack.domain !== domain) continue;
        if (contentType && pack.contentType !== contentType) continue;
        list.push(pack);
      }
      return list;
    }

    // 获取特定领域的 Canonical 正式标准包
    getCanonicalPack(domain, contentType) {
      for (const pack of this.packs.values()) {
        if (pack.domain === domain && pack.contentType === contentType && pack.canonical) {
          return pack;
        }
      }
      return null;
    }

    // 动态添加一条用户内容 (直接注入内存，同时提供持久化支持)
    registerUserItem(item) {
      if (!item || !item.id) return;
      const normalized = {
        ...item,
        contentKey: `user_content:${item.id}`,
        origin: "user_added",
        reviewStatus: item.reviewStatus || "draft",
        status: item.status || "active"
      };
      this.userItems.push(normalized);
      return normalized;
    }
  }

  const ContentRegistry = new ContentRegistryClass();

  if (typeof window !== "undefined") {
    window.ContentRegistry = ContentRegistry;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { ContentRegistry, ContentRegistryClass };
  }
})();
