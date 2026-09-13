// 雅思内容架构元数据与数据模型规范 (Content Schemas v1)
(() => {
  "use strict";

  const DOMAINS = Object.freeze({
    LISTENING: "listening",
    WRITING: "writing",
    SPEAKING: "speaking",
    READING: "reading"
  });

  const CONTENT_TYPES = Object.freeze({
    WORD: "word",
    CHUNK: "chunk",
    PARAPHRASE: "paraphrase",
    TRAP: "trap",
    MAP: "map",
    OPTION_SCAN: "option_scan",
    TASK1: "task1",
    TASK2: "task2",
    NOTE: "note",
    PROCEDURAL_RULES: "procedural_rules"
  });

  const TRAINING_ROLES = Object.freeze({
    LISTENING_RECOGNITION: "listening_recognition",
    PRODUCTIVE_OUTPUT: "productive_output"
  });

  const PRODUCTIVE_SUITABILITY = Object.freeze({
    HIGH: "high",
    MEDIUM: "medium",
    RECOGNITION_ONLY: "recognition_only"
  });

  const REACTION_TIERS = Object.freeze({
    FLUENT: "fluent",        // <= 2000ms 快速直觉调用
    ACCESSIBLE: "accessible",// 2000ms - 4000ms 能调用但不熟
    SLOW: "slow",            // 4000ms - 8000ms 迟钝
    WEAK: "weak"             // > 8000ms 或不会/未激活
  });

  const SOURCE_TYPES = Object.freeze({
    WANGLU: "wanglu",
    CAMBRIDGE_DERIVED: "cambridge_derived",
    OFFICIAL_IELTS: "official_ielts",
    USER_NOTE: "user_note",
    USER_MISTAKE: "user_mistake",
    HUMAN_CURATED: "human_curated",
    TEMPLATE_GENERATED: "template_generated",
    PROCEDURAL: "procedural"
  });

  const ORIGINS = Object.freeze({
    BUNDLED: "bundled",
    USER_ADDED: "user_added",
    IMPORTED: "imported"
  });

  const REVIEW_STATUSES = Object.freeze({
    IMPORTED: "imported",
    DRAFT: "draft",
    REVIEWED: "reviewed",
    VERIFIED: "verified"
  });

  const STATUSES = Object.freeze({
    ACTIVE: "active",
    DISABLED: "disabled",
    DEPRECATED: "deprecated"
  });

  function computeContentKey(packId, itemId) {
    if (!packId || !itemId) {
      throw new Error(`Invalid contentKey args: packId='${packId}', itemId='${itemId}'`);
    }
    return `${packId}:${itemId}`;
  }

  const ContentSchemas = {
    DOMAINS,
    CONTENT_TYPES,
    TRAINING_ROLES,
    PRODUCTIVE_SUITABILITY,
    REACTION_TIERS,
    SOURCE_TYPES,
    ORIGINS,
    REVIEW_STATUSES,
    STATUSES,
    computeContentKey
  };

  if (typeof window !== "undefined") {
    window.ContentSchemas = ContentSchemas;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = ContentSchemas;
  }
})();
