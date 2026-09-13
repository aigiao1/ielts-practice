// 剑桥真题错题标准数据模型规范 (Cambridge Mistake Schema v1)
// 职责：标准化剑桥雅思真题错题对象，确保元数据与错因正交解耦，可无损存入 IndexedDB
(() => {
  "use strict";

  const SCHEMA_VERSION = "1.0.0";

  // 9 大核心错因归因字典 (标准化与错误分析对齐)
  const STANDARD_ERROR_REASONS = Object.freeze([
    { id: "sound_recognition", label: "🔊 声音没认出", desc: "连读、弱读、失去爆破或生僻口音" },
    { id: "meaning_processing", label: "🧠 听懂词没懂意", desc: "单词认出但大脑句意转义迟滞" },
    { id: "paraphrase", label: "🔄 同义替换没反应", desc: "未能识别题目与录音间的概念抽象与重构" },
    { id: "option_scanning", label: "👀 选项没读完", desc: "审题预读时间分配不足" },
    { id: "map_tracking", label: "🗺️ 地图跟丢", desc: "方位词或路线行进参照物断片" },
    { id: "number_date", label: "🔢 数字日期混淆", desc: "teen/ty混淆、日月倒置或大数连读" },
    { id: "spelling", label: "✍️ 拼写错误", desc: "听出正确词汇但拼写或词形变化出错" },
    { id: "trap", label: "⚠️ 陷阱/转折误导", desc: "受 but/however/originally 干扰项误导" },
    { id: "attention", label: "😵 注意力掉线", desc: "纠结前题或节奏打乱导致漏听" }
  ]);

  const STANDARD_QUESTION_TYPES = Object.freeze([
    "note",             // 笔记/表格填空
    "choice",           // 单项选择
    "multiple_choice",  // 多项选择 (5选2 / 7选3)
    "matching",         // 配对题
    "map",              // 地图/平面图题
    "summary",          // 摘要填空
    "short_answer",     // 简答题
    "flow_chart",       // 流程图填空
    "other"
  ]);

  /**
   * 规范化并创建 Cambridge Mistake 对象
   * 严格保证向下兼容已有 mistakes.js 表单数据
   */
  function createCambridgeMistake(raw = {}) {
    const now = Date.now();

    // 兼容 questionNumber(单数/字符串) 与 questionNumbers(数组)
    let qNumbers = [];
    if (Array.isArray(raw.questionNumbers)) {
      qNumbers = raw.questionNumbers.map((n) => String(n).trim()).filter(Boolean);
    } else if (raw.questionNumber !== undefined && raw.questionNumber !== null && raw.questionNumber !== "") {
      qNumbers = String(raw.questionNumber).split(/[,，\s-]+/).map((s) => s.trim()).filter(Boolean);
    }

    // 兼容 part (旧表单) 与 section (雅思官方)
    let sectionVal = raw.section !== undefined ? raw.section : raw.part;
    if (typeof sectionVal === "string") {
      const match = sectionVal.match(/\d+/);
      if (match) sectionVal = parseInt(match[0], 10);
    }

    // 概念提取与数组归一化
    let concepts = [];
    if (Array.isArray(raw.concepts)) {
      concepts = raw.concepts.map((c) => String(c).trim()).filter(Boolean);
    } else if (typeof raw.concepts === "string" && raw.concepts.trim()) {
      concepts = raw.concepts.split(/[,，\s]+/).map((c) => c.trim()).filter(Boolean);
    }

    // 错因归一化
    const errorReasons = Array.isArray(raw.errorReasons)
      ? Array.from(new Set(raw.errorReasons.map((r) => String(r).trim()).filter(Boolean)))
      : [];

    return {
      id: raw.id || `mis-${now}-${Math.random().toString(36).slice(2, 7)}`,
      schemaVersion: SCHEMA_VERSION,
      domain: raw.domain || "listening",
      sourceType: "user_mistake",
      origin: "user_added",

      // 剑桥真题坐标定位 (Cambridge Coordinates)
      book: String(raw.book || "难点收藏").trim(),
      test: raw.test !== undefined && raw.test !== null ? raw.test : "",
      section: sectionVal !== undefined && sectionVal !== null ? sectionVal : "",
      part: raw.part || (sectionVal ? `Part ${sectionVal}` : ""),
      questionNumbers: qNumbers,
      questionNumber: qNumbers.join(", "), // 兼容旧代码字段访问
      questionType: raw.questionType || "note",

      // 题目与答案
      questionText: String(raw.questionText || "").trim(),
      options: Array.isArray(raw.options) ? raw.options : [],
      userAnswer: String(raw.userAnswer || "").trim(),
      correctAnswer: String(raw.correctAnswer || "").trim(),

      // 原文与考点深度还原
      transcript: String(raw.transcript || "").trim(),
      keySentence: String(raw.keySentence || "").trim(),
      paraphrase: (raw.paraphrase && (raw.paraphrase.source || raw.paraphrase.target)) ? {
        source: String(raw.paraphrase.source || "").trim(),
        target: String(raw.paraphrase.target || "").trim()
      } : null,

      // 错因归因与考点标签
      errorReasons,
      concepts,
      notes: String(raw.notes || raw.teachingPoint || "").trim(),

      // 听力音频切片资产引用
      audioClip: raw.audioClip ? {
        audioAssetId: raw.audioClip.audioAssetId || null,
        startTime: Number(raw.audioClip.startTime) || 0,
        endTime: Number(raw.audioClip.endTime) || 0
      } : null,

      // 标签与时间戳
      tags: Array.isArray(raw.tags) ? raw.tags : [],
      createdAt: Number(raw.createdAt) || now,
      updatedAt: Number(raw.updatedAt) || now
    };
  }

  /**
   * 校验 Cambridge Mistake 对象完整性
   */
  function validateCambridgeMistake(item) {
    const errors = [];
    if (!item || typeof item !== "object") {
      return { valid: false, errors: ["条目必须为非空对象"] };
    }

    if (!item.id || typeof item.id !== "string") {
      errors.push("缺少有效的 'id' 字符串");
    }

    if (!item.book) {
      errors.push("缺少 'book' 书籍信息");
    }

    if (!item.questionText && !item.correctAnswer) {
      errors.push("必须提供 'questionText' 或 'correctAnswer' 中的至少一项");
    }

    if (item.errorReasons && !Array.isArray(item.errorReasons)) {
      errors.push("'errorReasons' 必须为数组");
    }

    if (item.concepts && !Array.isArray(item.concepts)) {
      errors.push("'concepts' 必须为数组");
    }

    if (item.audioClip) {
      if (typeof item.audioClip !== "object") {
        errors.push("'audioClip' 必须为对象");
      } else if (item.audioClip.startTime > item.audioClip.endTime && item.audioClip.endTime > 0) {
        errors.push("'audioClip' 的 startTime 不能大于 endTime");
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  const CambridgeMistakeSchema = {
    SCHEMA_VERSION,
    STANDARD_ERROR_REASONS,
    STANDARD_QUESTION_TYPES,
    createCambridgeMistake,
    validateCambridgeMistake
  };

  if (typeof window !== "undefined") {
    window.CambridgeMistakeSchema = CambridgeMistakeSchema;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = CambridgeMistakeSchema;
  }
})();
