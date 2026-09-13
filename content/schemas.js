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

  const SUITABILITY_SOURCES = Object.freeze({
    AUTO_INFERRED: "auto_inferred",   // 算法规则自动推导 (待人工复核)
    HUMAN_REVIEWED: "human_reviewed"  // 教师/人工确认适用性
  });

  const AUDIO_MODES = Object.freeze({
    STANDALONE: "standalone",     // Level 1: 独立词块发音
    SENTENCE: "sentence",         // Level 2: 短句语境发音 (预留)
    EXAM_CONTEXT: "exam_context"  // Level 3: 雅思真题真实连读语流 (预留)
  });

  const DIAGNOSTIC_REASONS = Object.freeze({
    SOUND_NOT_RECOGNISED: "sound_not_recognised",       // 听不出是什么 (声音通路断裂)
    RECOGNISED_BUT_MISSPELLED: "recognised_but_misspelled", // 听懂了但拼写错误 (仅音形差异)
    SLOW_RECOGNITION: "slow_recognition",               // 能听出但反应迟钝 (>4000ms)
    MEANING_UNKNOWN: "meaning_unknown"                  // 词块本身不熟/生词
  });

  const REPAIR_STAGES = Object.freeze({
    L1_ISOLATED: "l1_isolated",       // 阶段1：单块重音辨音
    L2_COLLOCATION: "l2_collocation", // 阶段2：常见搭配拓展
    L3_IN_SENTENCE: "l3_in_sentence", // 阶段3：短句语流挖空抓取
    L4_PRODUCTIVE: "l4_productive"    // 阶段4：中文意图极速调出
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
    SUITABILITY_SOURCES,
    AUDIO_MODES,
    DIAGNOSTIC_REASONS,
    REPAIR_STAGES,
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
