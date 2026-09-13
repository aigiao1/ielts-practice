// 雅思内容架构自动化质检器 (Content Validator)
// 运行：node scripts/validate-content.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");

const ALLOWED_DOMAINS = new Set(["listening", "writing", "speaking", "reading"]);
const ALLOWED_CONTENT_TYPES = new Set(["word", "paraphrase", "trap", "map", "option_scan", "task1", "task2", "note", "procedural_rules"]);
const ALLOWED_SOURCE_TYPES = new Set([
  "wanglu", "cambridge_derived", "official_ielts", "user_note",
  "user_mistake", "human_curated", "template_generated", "procedural"
]);
const ALLOWED_ORIGINS = new Set(["bundled", "user_added", "imported"]);
const ALLOWED_REVIEW_STATUSES = new Set(["imported", "draft", "reviewed", "verified"]);
const ALLOWED_STATUSES = new Set(["active", "disabled", "deprecated"]);

let fatalErrors = 0;
let warnings = 0;

function error(msg) {
  console.error(`❌ [ERROR] ${msg}`);
  fatalErrors++;
}

function warn(msg) {
  console.warn(`⚠️ [WARN]  ${msg}`);
  warnings++;
}

function loadJsModule(filePath) {
  const code = fs.readFileSync(filePath, "utf8");
  const sandbox = { window: {}, module: { exports: {} } };
  const evalFn = new Function("window", "module", code);
  evalFn(sandbox.window, sandbox.module);
  return sandbox.module.exports || sandbox.window;
}

console.log("\n=======================================================");
console.log("🔍 开始运行 IELTS Content Architecture 自动化质检...");
console.log("=======================================================\n");

// 1. 读取 Manifest
const manifestPath = path.join(rootDir, "content", "manifest.js");
if (!fs.existsSync(manifestPath)) {
  error(`找不到清单文件: ${manifestPath}`);
  process.exit(1);
}

const manifest = loadJsModule(manifestPath);
const packsManifest = manifest.CONTENT_MANIFEST?.packs || manifest.packs || [];
console.log(`📋 Manifest 注册包数量: ${packsManifest.length}`);

const packIdSet = new Set();
const globalContentKeys = new Set();
const contentStatsByDomain = {};

for (const pRef of packsManifest) {
  // 检查 packId 唯一性
  if (packIdSet.has(pRef.packId)) {
    error(`Manifest 存在重复 packId: ${pRef.packId}`);
  }
  packIdSet.add(pRef.packId);

  // 检查文件存在性
  const packAbsPath = path.join(rootDir, pRef.path);
  if (!fs.existsSync(packAbsPath)) {
    error(`Pack 文件不存在: ${pRef.path} (packId: ${pRef.packId})`);
    continue;
  }

  // 加载 Pack 对象
  let pack = null;
  try {
    const loaded = loadJsModule(packAbsPath);
    if (loaded && loaded.packId === pRef.packId) {
      pack = loaded;
    } else if (loaded && typeof loaded === "object") {
      pack = Object.values(loaded).find((v) => v && typeof v === "object" && v.packId === pRef.packId);
    }
  } catch (err) {
    error(`解析 Pack 文件失败: ${pRef.path} - ${err.message}`);
    continue;
  }

  if (!pack) {
    error(`在 ${pRef.path} 中未能找到 packId 为 ${pRef.packId} 的导出对象`);
    continue;
  }

  // 验证基础字段
  if (!ALLOWED_DOMAINS.has(pack.domain)) {
    error(`Pack ${pack.packId} 的 domain 非法: '${pack.domain}'`);
  }
  if (!ALLOWED_CONTENT_TYPES.has(pack.contentType)) {
    error(`Pack ${pack.packId} 的 contentType 非法: '${pack.contentType}'`);
  }

  // 验证元数据
  const meta = pack.metadata || {};
  if (!ALLOWED_SOURCE_TYPES.has(meta.sourceType)) {
    error(`Pack ${pack.packId} metadata.sourceType 非法: '${meta.sourceType}'`);
  }
  if (!ALLOWED_ORIGINS.has(meta.origin)) {
    error(`Pack ${pack.packId} metadata.origin 非法: '${meta.origin}'`);
  }
  if (!ALLOWED_REVIEW_STATUSES.has(meta.reviewStatus)) {
    error(`Pack ${pack.packId} metadata.reviewStatus 非法: '${meta.reviewStatus}'`);
  }
  if (!ALLOWED_STATUSES.has(meta.status)) {
    error(`Pack ${pack.packId} metadata.status 非法: '${meta.status}'`);
  }

  // 铁律校验：绝不允许在 Content 中出现 mastery 字段
  if ("mastery" in pack || "mastery" in meta) {
    error(`Pack ${pack.packId} 严重违背原则：不得包含 'mastery' 字段！`);
  }

  // 验证 items 集合
  const items = Array.isArray(pack.items) ? pack.items : [];
  if (pack.expectedCount !== undefined && items.length !== pack.expectedCount) {
    error(`Pack ${pack.packId} 条目数 (${items.length}) 与 expectedCount (${pack.expectedCount}) 不一致！`);
  }

  const localItemIds = new Set();
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    if (!it.id) {
      error(`Pack ${pack.packId} 第 ${i + 1} 项缺少必需的 'id' 字段`);
      continue;
    }

    // 依约束#10：item.id 在本 pack 必须唯一
    if (localItemIds.has(it.id)) {
      error(`Pack ${pack.packId} 内部存在重复 item.id: '${it.id}'`);
    }
    localItemIds.add(it.id);

    // 依约束#10：contentKey = `${packId}:${item.id}` 全局唯一
    const contentKey = `${pack.packId}:${it.id}`;
    if (globalContentKeys.has(contentKey)) {
      error(`全局 contentKey 碰撞: '${contentKey}'`);
    }
    globalContentKeys.add(contentKey);

    // 铁律校验：绝不允许单条 item 含有 mastery
    if ("mastery" in it) {
      error(`Pack ${pack.packId} Item '${it.id}' 违背原则：含有 'mastery' 字段！`);
    }
  }

  // 针对特定 Pack 的专项业务完整性校验
  if (pack.packId === "wanglu-core-v1") {
    for (const w of items) {
      if (typeof w.groupId !== "number" || w.groupId < 1 || w.groupId > 11) {
        error(`王陆核心词 '${w.id}' (${w.term}) groupId 越界: ${w.groupId} (必须在 1–11 之间)`);
      }
      if (!w.term || !w.chinese) {
        error(`王陆核心词 '${w.id}' 缺少 term 或 chinese`);
      }
    }
  }

  if (pack.packId === "task1-workbook-v1") {
    const numbers = items.map((q) => q.number);
    const expectedNumbers = Array.from({ length: 140 }, (_, idx) => idx + 1);
    const mismatch = expectedNumbers.find((num, idx) => numbers[idx] !== num);
    if (mismatch !== undefined) {
      error(`Task 1 标准 140 题编号不连续或存在偏差，从题号 ${mismatch} 开始不匹配`);
    }
  }

  if (pack.packId === "paraphrase-concepts-v1") {
    for (const c of items) {
      if (!c.meaningZh) error(`同义替换考点 '${c.id}' 缺少 meaningZh`);
      if (!c.distractorGroup) error(`同义替换考点 '${c.id}' 缺少 distractorGroup`);
      if (!Array.isArray(c.sourcePatterns) || !c.sourcePatterns.length) {
        error(`同义替换考点 '${c.id}' 缺少 sourcePatterns`);
      }
      if (!Array.isArray(c.targetPatterns) || !c.targetPatterns.length) {
        error(`同义替换考点 '${c.id}' 缺少 targetPatterns`);
      }

      // Slot 占位符完整性检查
      const slots = c.slots || {};
      for (const pattern of c.sourcePatterns) {
        const slotMatches = pattern.match(/\{([a-zA-Z0-9_]+)\}/g) || [];
        for (const slotTag of slotMatches) {
          const slotName = slotTag.slice(1, -1);
          if (!slots[slotName] || !Array.isArray(slots[slotName]) || !slots[slotName].length) {
            error(`同义替换考点 '${c.id}' 模板缺少槽位定义: {${slotName}}`);
          }
        }
      }
    }
  }

  // 统计汇总
  const d = pack.domain;
  if (!contentStatsByDomain[d]) contentStatsByDomain[d] = { totalItems: 0, packs: 0 };
  contentStatsByDomain[d].totalItems += items.length;
  contentStatsByDomain[d].packs += 1;

  console.log(`✅ [OK] Pack: ${pack.packId.padEnd(25)} | ${pack.domain.padEnd(10)} | ${items.length.toString().padStart(4)} items | status: ${pack.metadata.status} (${pack.metadata.reviewStatus})`);
}

console.log("\n=======================================================");
console.log("📊 领域数据总量统计 (Content Domain Summary):");
for (const [d, stat] of Object.entries(contentStatsByDomain)) {
  console.log(`   • ${d.padEnd(12)}: ${stat.totalItems.toString().padStart(4)} 条内容 (分布在 ${stat.packs} 个数据包)`);
}
console.log(`   • 全局独立 contentKey 数量: ${globalContentKeys.size}`);
console.log("=======================================================\n");

if (fatalErrors > 0) {
  console.error(`💥 质检失败！共发现 ${fatalErrors} 个严重错误，${warnings} 个警告。请修复后再提交。`);
  process.exit(1);
} else {
  console.log(`🎉 质检完美通过！所有 Content Pack 格式合规、无破坏、元数据正交！(警告数: ${warnings})\n`);
  process.exit(0);
}
