import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvPath = path.resolve(__dirname, '../content/sources/wanglu-corpus-raw.csv');
const raw = fs.readFileSync(csvPath, 'utf-8');
const lines = raw.split(/\r?\n/).map(l => l.trimEnd()).filter(l => l.length > 0);

// 第一行是列名
const headerLine = lines[0];
const rawHeaders = headerLine.split(',');

// 修正列名: Col 24 在 Excel 里因为精度截断成了 "5.1"，但实际在 5.9 之后、5.11 之前，是 Chapter 5.10!
const headers = rawHeaders.map((h, idx) => {
  if (idx === 24 && h === "5.1") return "5.10";
  return h;
});

// 提取 components（词根词组分词，去停用词与标点）
const STOP_WORDS = new Set(["a", "an", "the", "of", "in", "on", "at", "to", "for", "with", "and", "or", "by", "from", "as", "is", "are", "was", "were", "be", "been", "sb", "one's", "his", "her", "their"]);

function extractComponents(text) {
  const clean = text.toLowerCase()
    .replace(/[=()\/]/g, " ")
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim();
  const words = clean.split(/\s+/).filter(w => w.length > 1 && !STOP_WORDS.has(w));
  return Array.from(new Set(words));
}

// 标签分类规则
function inferTags(text, components) {
  const t = text.toLowerCase();
  const tags = new Set();

  if (/tuition|fee|cost|expense|budget|bank|loan|money|price|deposit|salary|payment|cash|bill|financial|currency|economic/.test(t)) {
    tags.add("money");
  }
  if (/student|course|academic|school|university|degree|library|exam|tutor|lecture|study|campus|assignment|education|faculty/.test(t)) {
    tags.add("education");
  }
  if (/environment|climate|forest|recycle|solar|waste|energy|pollution|organic|nature|carbon|water|green/.test(t)) {
    tags.add("environment");
  }
  if (/health|diet|hospital|medical|doctor|illness|disease|fitness|exercise|blood|medicine|symptom/.test(t)) {
    tags.add("health");
  }
  if (/traffic|bus|car|train|road|flight|travel|journey|transport|airport|station|ticket|driving/.test(t)) {
    tags.add("transport");
  }
  if (/hotel|room|campsite|house|living|flat|apartment|accommodation|kitchen|furniture/.test(t)) {
    tags.add("accommodation");
  }
  if (/job|work|career|company|interview|staff|employer|employee|marketing|business|manager/.test(t)) {
    tags.add("work");
  }

  if (tags.size === 0) tags.add("general");
  return Array.from(tags);
}

// 判定 productiveSuitability 与 trainingRole
const RECOGNITION_ONLY_PATTERNS = [
  /beacon/, /blood cell/, /skin of/, /mould/, /larva/, /herds/, /flamingo/,
  /sediment/, /precaution against/, /water-ride/, /rollercoaster/, /dinosaur/,
  /fossils?/, /reptile/, /monogamous/, /nitrogen/, /hibernat/, /humidity/,
  /urchin/, /oyster/, /gill/, /caterpillar/, /cocoon/, /pupa/, /nectar/,
  /pollinat/, /pesticide/, /insecticide/, /bacteria/, /microscope/, /ultraviolet/,
  /evaporation/, /volcano/, /crater/, /glacier/, /canyon/, /peninsula/,
  /archaeolog/, /excavat/, /artefact/, /hieroglyph/, /pharaoh/, /pyramid/,
  /mummy/, /tomb/, /spindle/, /loom/, /weaver/, /carpentry/, /masonry/,
  /smithy/, /forge/, /smelt/, /foundry/, /ore/, /quarry/, /shaft/,
  /refinery/, /tanker/, /pipeline/, /locat(or|ion) beacon/, /hind legs/,
  /tadpole/, /froglet/, /eggplant/, /beetroot/, /cranberry/, /walnut/,
  /chestnut/, /koala/, /kangaroo/, /crocodile/, /falcon/, /pigeon/,
  /amber/, /kelp/, /willow/, /fernery/, /pine tree/, /lemon tree/,
  /hothouse/, /incubator/, /darkroom/, /lock-up/, /hovercraft/
];

const HIGH_PRODUCTIVE_PATTERNS = [
  /cost of living/, /living expenses?/, /tuition fees?/, /traffic congestion/,
  /a balanced diet/, /environmental damage/, /in advance/, /time management/,
  /action plan/, /job interview/, /customer service/, /budget management/,
  /sustainable (development|practice)/, /public transport/, /renewable energy/,
  /carbon dioxide/, /global warming/, /higher education/, /career pathway/,
  /health care/, /social activities/, /academic (performance|record)/,
  /research (methods?|findings?|results?)/, /data analysis/, /course fee/,
  /full-time/, /part-time/, /student union/, /bank account/, /credit card/,
  /medical history/, /emergency contact/, /a wide range of/, /a variety of/,
  /broaden one's (view|horizon)/, /cope with/, /rely (heavily )?on/,
  /make an appointment/, /take (into )?account/, /pay attention to/,
  /face-to-face/, /drop out/, /entrance fee/, /market research/, /living cost/
];

function evaluateSuitability(text, chapter) {
  const t = text.toLowerCase();

  for (const pat of RECOGNITION_ONLY_PATTERNS) {
    if (pat.test(t)) {
      return "recognition_only";
    }
  }

  for (const pat of HIGH_PRODUCTIVE_PATTERNS) {
    if (pat.test(t)) {
      return "high";
    }
  }

  // 默认规则：Chapter 5 属于生活与学术常用词块，较适宜输出；Chapter 11 多为生僻听力真题混合词
  if (chapter.startsWith("5.")) {
    // 词数适中且为常见词组
    return "high";
  } else {
    return "medium";
  }
}

// 提取各章节原始数据
const ch5Items = [];
const ch11Items = [];

for (let r = 3; r < lines.length; r++) {
  const cols = lines[r].split(',');

  headers.forEach((h, colIdx) => {
    if (!h) return;
    const val = (cols[colIdx] || "").trim();
    if (!val) return;

    if (h.startsWith("5.")) {
      ch5Items.push({
        rawText: val,
        chapter: h
      });
    } else if (h.startsWith("11-")) {
      ch11Items.push({
        rawText: val,
        chapter: h.replace("横向测试答案", "").replace("11-", "11.")
      });
    }
  });
}

console.log(`解析提取到 Chapter 5 词条: ${ch5Items.length}`);
console.log(`解析提取到 Chapter 11 词条: ${ch11Items.length}`);

// 构建 Chapter 5 Pack
let ch5HighCount = 0;
let ch5RecogCount = 0;

const normalizedCh5Items = ch5Items.map((item, idx) => {
  const id = `chunk-05-${String(idx + 1).padStart(4, "0")}`;
  const text = item.rawText;
  const components = extractComponents(text);
  const suitability = evaluateSuitability(text, item.chapter);
  if (suitability === "high") ch5HighCount++;
  if (suitability === "recognition_only") ch5RecogCount++;

  const trainingRole = ["listening_recognition"];
  if (suitability !== "recognition_only") {
    trainingRole.push("productive_output");
  }

  return {
    id,
    contentKey: `wanglu-chunks-v1:${id}`,
    domain: "listening",
    contentType: "chunk",
    text,
    components,
    sourceType: "wanglu",
    sourceRef: `Chapter ${item.chapter}`,
    trainingRole,
    productiveSuitability: suitability,
    tags: inferTags(text, components),
    origin: "bundled",
    reviewStatus: "imported", // 机器辅助生成统一为 imported
    status: "active"
  };
});

// 构建 Chapter 11 Pack
let ch11HighCount = 0;
let ch11RecogCount = 0;

const normalizedCh11Items = ch11Items.map((item, idx) => {
  const id = `chunk-11-${String(idx + 1).padStart(4, "0")}`;
  const text = item.rawText;
  const components = extractComponents(text);
  const suitability = evaluateSuitability(text, item.chapter);
  if (suitability === "high") ch11HighCount++;
  if (suitability === "recognition_only") ch11RecogCount++;

  const trainingRole = ["listening_recognition"];
  if (suitability !== "recognition_only") {
    trainingRole.push("productive_output");
  }

  return {
    id,
    contentKey: `wanglu-advanced-chunks-v1:${id}`,
    domain: "listening",
    contentType: "chunk",
    text,
    components,
    sourceType: "wanglu",
    sourceRef: `Chapter ${item.chapter}`,
    trainingRole,
    productiveSuitability: suitability,
    tags: inferTags(text, components),
    origin: "bundled",
    reviewStatus: "imported",
    status: "active"
  };
});

// 输出 Chapter 5 Content Pack
const ch5Pack = {
  packId: "wanglu-chunks-v1",
  version: "1.0.0",
  domain: "listening",
  contentType: "chunk",
  canonical: true,
  expectedCount: normalizedCh5Items.length,
  metadata: {
    sourceType: "wanglu",
    sourceRef: "王陆雅思听力语料库 · 第5章核心词块 (5.1–5.12)",
    origin: "bundled",
    reviewStatus: "imported",
    status: "active",
    tags: ["chunks", "collocations", "listening", "wanglu_ch5"]
  },
  items: normalizedCh5Items
};

// 输出 Chapter 11 Content Pack
const ch11Pack = {
  packId: "wanglu-advanced-chunks-v1",
  version: "1.0.0",
  domain: "listening",
  contentType: "chunk",
  canonical: false,
  expectedCount: normalizedCh11Items.length,
  metadata: {
    sourceType: "wanglu",
    sourceRef: "王陆雅思听力语料库 · 第11章横向真题测试 (11.1–11.4)",
    origin: "bundled",
    reviewStatus: "imported",
    status: "active",
    tags: ["advanced_chunks", "real_exam", "cross_test", "wanglu_ch11"]
  },
  items: normalizedCh11Items
};

// 确保目标目录存在
const chunksDir = path.resolve(__dirname, '../content/listening/chunks');
if (!fs.existsSync(chunksDir)) {
  fs.mkdirSync(chunksDir, { recursive: true });
}

// 写入文件
const ch5FileContent = `// 王陆核心高频词块标准包 (wanglu-chunks-v1)
// 包含王陆雅思听力语料库第 5 章（5.1–5.12）全量 ${normalizedCh5Items.length} 条真题词块与固定搭配
(() => {
  "use strict";

  const WANGLU_CHUNKS_PACK_V1 = ${JSON.stringify(ch5Pack, null, 2)};

  if (typeof window !== "undefined") {
    window.WANGLU_CHUNKS_PACK_V1 = WANGLU_CHUNKS_PACK_V1;
    if (window.ContentRegistry) {
      window.ContentRegistry.registerPack(WANGLU_CHUNKS_PACK_V1);
    } else {
      window._PRELOADED_PACKS = window._PRELOADED_PACKS || [];
      window._PRELOADED_PACKS.push(WANGLU_CHUNKS_PACK_V1);
    }
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = WANGLU_CHUNKS_PACK_V1;
  }
})();
`;

const ch11FileContent = `// 王陆真题横向测试长词块标准包 (wanglu-advanced-chunks-v1)
// 包含王陆雅思听力语料库第 11 章（11.1–11.4）全量 ${normalizedCh11Items.length} 条综合强化与长词块
(() => {
  "use strict";

  const WANGLU_ADVANCED_CHUNKS_PACK_V1 = ${JSON.stringify(ch11Pack, null, 2)};

  if (typeof window !== "undefined") {
    window.WANGLU_ADVANCED_CHUNKS_PACK_V1 = WANGLU_ADVANCED_CHUNKS_PACK_V1;
    if (window.ContentRegistry) {
      window.ContentRegistry.registerPack(WANGLU_ADVANCED_CHUNKS_PACK_V1);
    } else {
      window._PRELOADED_PACKS = window._PRELOADED_PACKS || [];
      window._PRELOADED_PACKS.push(WANGLU_ADVANCED_CHUNKS_PACK_V1);
    }
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = WANGLU_ADVANCED_CHUNKS_PACK_V1;
  }
})();
`;

const ch5Target = path.join(chunksDir, 'wanglu-chunks-v1.js');
const ch11Target = path.join(chunksDir, 'wanglu-advanced-chunks-v1.js');

fs.writeFileSync(ch5Target, ch5FileContent, 'utf-8');
fs.writeFileSync(ch11Target, ch11FileContent, 'utf-8');

console.log(`\n=======================================================`);
console.log(`✅ 成功生成 Chapter 5 核心词块包: ${ch5Target}`);
console.log(`   • 总词块数: ${normalizedCh5Items.length}`);
console.log(`   • 高输出适宜度 (high): ${ch5HighCount}`);
console.log(`   • 听懂即可 (recognition_only): ${ch5RecogCount}`);
console.log(`   • reviewStatus: imported (机器解析生成)`);
console.log(`-------------------------------------------------------`);
console.log(`✅ 成功生成 Chapter 11 横向真题词块包: ${ch11Target}`);
console.log(`   • 总词块数: ${normalizedCh11Items.length}`);
console.log(`   • 听懂即可 (recognition_only): ${ch11RecogCount}`);
console.log(`   • 高/中适宜度: ${ch11HighCount + (normalizedCh11Items.length - ch11HighCount - ch11RecogCount)}`);
console.log(`=======================================================\n`);
