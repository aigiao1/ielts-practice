import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");

// 1. 生成 wanglu-core-v1.js
const wordsDataPath = path.join(rootDir, "words-dictation-data.js");
const wordsCode = fs.readFileSync(wordsDataPath, "utf8");
const wordsMatch = wordsCode.match(/window\.WORDS_DICTATION_DATA\s*=\s*(\[[\s\S]*?\]);\s*$/m);
if (!wordsMatch) {
  throw new Error("Cannot parse words-dictation-data.js");
}
const rawWords = JSON.parse(wordsMatch[1]);

const wangluPack = {
  packId: "wanglu-core-v1",
  version: "1.0.0",
  domain: "listening",
  contentType: "word",
  canonical: true,
  expectedCount: 305,
  metadata: {
    sourceType: "wanglu",
    sourceRef: "王陆807雅思听力核心高频词",
    origin: "bundled",
    reviewStatus: "imported", // 依约束#9：未逐条核验不盲写 verified
    status: "active",
    tags: ["listening", "dictation", "wanglu_core"]
  },
  items: rawWords.map((w) => ({
    id: w.id, // 依约束#3：严格保持原有 wd-* 稳定 ID
    term: w.term,
    phonetic: w.phonetic,
    chinese: w.chinese,
    groupId: w.group, // 规范为 groupId，保持 1–11 原始分组
    group: w.group    // 向后兼容旧代码
  }))
};

const wangluFileContent = `// 王陆雅思听力高频核心词汇包 (wanglu-core-v1)
// 包含 305 个核心词汇，严格保留 Group 1–11 原始分组与 wd-* 稳定 ID
(() => {
  "use strict";

  const WANGLU_CORE_PACK_V1 = ${JSON.stringify(wangluPack, null, 2)};

  if (typeof window !== "undefined") {
    window.WANGLU_CORE_PACK_V1 = WANGLU_CORE_PACK_V1;
    if (window.ContentRegistry) {
      window.ContentRegistry.registerPack(WANGLU_CORE_PACK_V1);
    } else {
      window._PRELOADED_PACKS = window._PRELOADED_PACKS || [];
      window._PRELOADED_PACKS.push(WANGLU_CORE_PACK_V1);
    }
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = WANGLU_CORE_PACK_V1;
  }
})();
`;

const wordsDir = path.join(rootDir, "content", "listening", "words");
fs.mkdirSync(wordsDir, { recursive: true });
fs.writeFileSync(path.join(wordsDir, "wanglu-core-v1.js"), wangluFileContent, "utf8");
console.log(`[Pack] 成功生成 wanglu-core-v1.js (${wangluPack.items.length} 词)`);

// 2. 生成 paraphrase-concepts-v1.js
const conceptsDataPath = path.join(rootDir, "factory", "data", "paraphrase-concepts.js");
const conceptsCode = fs.readFileSync(conceptsDataPath, "utf8");

// 解析 DISTRACTOR_GROUPS 与 PARAPHRASE_CONCEPTS
const sandbox = { window: {}, module: { exports: {} } };
const evalFn = new Function("window", "module", conceptsCode);
evalFn(sandbox.window, sandbox.module);
const rawConcepts = sandbox.window.PARAPHRASE_CONCEPTS || sandbox.module.exports.PARAPHRASE_CONCEPTS;
const distractorGroups = sandbox.window.DISTRACTOR_GROUPS || sandbox.module.exports.DISTRACTOR_GROUPS;

const paraphrasePack = {
  packId: "paraphrase-concepts-v1",
  version: "1.0.0",
  domain: "listening",
  contentType: "paraphrase",
  canonical: true,
  expectedCount: rawConcepts.length,
  metadata: {
    sourceType: "human_curated",
    sourceRef: "雅思听力Section 2/3同义替换考点归纳",
    origin: "bundled",
    reviewStatus: "imported",
    status: "active",
    tags: ["listening", "paraphrase", "mc_matching"]
  },
  distractorGroups,
  items: rawConcepts.map((c) => ({
    id: c.id,
    category: c.category,
    difficulty: c.difficulty,
    meaningZh: c.meaningZh,
    distractorGroup: c.distractorGroup,
    sourcePatterns: c.sourcePatterns,
    targetPatterns: c.targetPatterns,
    slots: c.slots,
    explanationTpl: c.explanationTpl
  }))
};

const paraFileContent = `// 雅思听力同义替换核心考点包 (paraphrase-concepts-v1)
// 包含 75 个考点概念、插槽与同组干扰项配置
(() => {
  "use strict";

  const PARAPHRASE_CONCEPTS_PACK_V1 = ${JSON.stringify(paraphrasePack, null, 2)};

  if (typeof window !== "undefined") {
    window.PARAPHRASE_CONCEPTS_PACK_V1 = PARAPHRASE_CONCEPTS_PACK_V1;
    if (window.ContentRegistry) {
      window.ContentRegistry.registerPack(PARAPHRASE_CONCEPTS_PACK_V1);
    } else {
      window._PRELOADED_PACKS = window._PRELOADED_PACKS || [];
      window._PRELOADED_PACKS.push(PARAPHRASE_CONCEPTS_PACK_V1);
    }
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = PARAPHRASE_CONCEPTS_PACK_V1;
  }
})();
`;

const paraDir = path.join(rootDir, "content", "listening", "paraphrase");
fs.mkdirSync(paraDir, { recursive: true });
fs.writeFileSync(path.join(paraDir, "paraphrase-concepts-v1.js"), paraFileContent, "utf8");
console.log(`[Pack] 成功生成 paraphrase-concepts-v1.js (${paraphrasePack.items.length} 考点)`);

// 3. 生成 canonical task1-workbook-v1.js (140题)
// 从 writing-data.js 提取真实的 140 题标准数据
const writingDataPath = path.join(rootDir, "writing-data.js");
const writingCode = fs.readFileSync(writingDataPath, "utf8");
const writingSandbox = { window: {} };
const writingEvalFn = new Function("window", writingCode);
writingEvalFn(writingSandbox.window);
const canonicalTask1 = writingSandbox.window.WRITING_PRACTICE_DATA.task1;

const task1CanonicalPack = {
  packId: "task1-workbook-v1",
  version: "1.0.0",
  domain: "writing",
  contentType: "task1",
  canonical: true,
  expectedCount: 140,
  metadata: {
    sourceType: "human_curated",
    sourceRef: "task1-translation-workbook.md (140题标准训练册)",
    origin: "bundled",
    reviewStatus: "reviewed",
    status: "active",
    tags: ["writing", "task1", "translation", "canonical_140"]
  },
  modules: [
    { id: "module-1", number: 1, name: "模块一：数字、单位与比较不出错", range: "1–20" },
    { id: "module-2", number: 2, name: "模块二：动态图与时态控制", range: "21–40" },
    { id: "module-3", number: 3, name: "模块三：静态图的分组与比较", range: "41–60" },
    { id: "module-4", number: 4, name: "模块四：Overview 选择主要特征", range: "61–80" },
    { id: "module-5", number: 5, name: "模块五：地图与平面图", range: "81–100" },
    { id: "module-6", number: 6, name: "模块六：流程图与被动语态", range: "101–120" },
    { id: "module-7", number: 7, name: "模块七：把单句连成微型报告", range: "121–140" }
  ],
  groups: canonicalTask1.groups.map((g) => ({
    ...g,
    moduleId: `module-${Math.ceil(g.number / 4)}`,
    moduleName: g.module
  })),
  items: canonicalTask1.groups.flatMap((g) =>
    g.questions.map((q) => ({
      id: q.id || `task1-${String(q.number).padStart(3, "0")}`,
      number: q.number,
      groupId: g.id,
      groupNumber: g.number,
      moduleId: `module-${Math.ceil(g.number / 4)}`,
      moduleName: g.module,
      groupLabel: g.label,
      module: g.module,
      context: g.context,
      note: g.note,
      chinese: q.chinese,
      answer: q.answer,
      answerParts: q.answerParts
    }))
  )
};

const task1CanonFileContent = `// Task 1 核心图表与微型报告翻译训练包 (task1-workbook-v1)
// 包含标准的 140 题，严格对应 28 个题组与 7 大训练模块 (121–140 为微型报告)
(() => {
  "use strict";

  const TASK1_WORKBOOK_PACK_V1 = ${JSON.stringify(task1CanonicalPack, null, 2)};

  if (typeof window !== "undefined") {
    window.TASK1_WORKBOOK_PACK_V1 = TASK1_WORKBOOK_PACK_V1;
    if (window.ContentRegistry) {
      window.ContentRegistry.registerPack(TASK1_WORKBOOK_PACK_V1);
    } else {
      window._PRELOADED_PACKS = window._PRELOADED_PACKS || [];
      window._PRELOADED_PACKS.push(TASK1_WORKBOOK_PACK_V1);
    }
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = TASK1_WORKBOOK_PACK_V1;
  }
})();
`;

const writingDir = path.join(rootDir, "content", "writing", "task1");
fs.mkdirSync(writingDir, { recursive: true });
fs.writeFileSync(path.join(writingDir, "task1-workbook-v1.js"), task1CanonFileContent, "utf8");
console.log(`[Pack] 成功生成 task1-workbook-v1.js (${task1CanonicalPack.items.length} 题)`);

// 4. 生成 legacy snapshot task1-rapid-legacy-v1.js (154题备份，默认 disabled)
const rapidDataPath = path.join(rootDir, "task1-rapid-data.js");
const rapidCode = fs.readFileSync(rapidDataPath, "utf8");
const rapidSandbox = { window: {} };
const rapidEvalFn = new Function("window", rapidCode);
rapidEvalFn(rapidSandbox.window);
const legacyTask1 = rapidSandbox.window.TASK1_RAPID_DATA;

const task1LegacyPack = {
  packId: "task1-rapid-legacy-v1",
  version: "1.0.0",
  domain: "writing",
  contentType: "task1",
  canonical: false,
  role: "legacy_snapshot",
  expectedCount: 154,
  metadata: {
    sourceType: "human_curated",
    sourceRef: "task1-rapid-data.js (早期154题历史快照)",
    origin: "bundled",
    reviewStatus: "imported",
    status: "disabled", // 依约束#5：默认不进入训练
    tags: ["writing", "task1", "legacy_snapshot"]
  },
  modules: legacyTask1.modules,
  groups: legacyTask1.groups,
  items: legacyTask1.modules.flatMap((m) =>
    (m.groups || []).flatMap((g) =>
      (g.questions || []).map((q) => ({
        id: `legacy-t1-${String(q.number).padStart(3, "0")}`,
        number: q.number,
        groupId: g.id,
        groupNumber: g.number,
        groupLabel: g.label,
        moduleId: m.id,
        moduleName: m.name,
        chinese: q.chinese,
        answer: q.answer
      }))
    )
  )
};

const task1LegacyFileContent = `// Task 1 早期速练全量题库快照 (task1-rapid-legacy-v1)
// 包含 154 题历史数据，作为 legacy snapshot 备份存档，默认 status: "disabled"
(() => {
  "use strict";

  const TASK1_RAPID_LEGACY_PACK_V1 = ${JSON.stringify(task1LegacyPack, null, 2)};

  if (typeof window !== "undefined") {
    window.TASK1_RAPID_LEGACY_PACK_V1 = TASK1_RAPID_LEGACY_PACK_V1;
    if (window.ContentRegistry) {
      window.ContentRegistry.registerPack(TASK1_RAPID_LEGACY_PACK_V1);
    } else {
      window._PRELOADED_PACKS = window._PRELOADED_PACKS || [];
      window._PRELOADED_PACKS.push(TASK1_RAPID_LEGACY_PACK_V1);
    }
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = TASK1_RAPID_LEGACY_PACK_V1;
  }
})();
`;

fs.writeFileSync(path.join(writingDir, "task1-rapid-legacy-v1.js"), task1LegacyFileContent, "utf8");
console.log(`[Pack] 成功生成 task1-rapid-legacy-v1.js (${task1LegacyPack.items.length} 题，status: disabled)`);
