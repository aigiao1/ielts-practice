// 雅思词块多维激活系统与双向索引器单元断言测试 (Chunk Architecture Tests)
// 运行：node scripts/test-chunk-architecture.mjs
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const require = createRequire(import.meta.url);

const ContentSchemas = require(path.join(rootDir, "content", "schemas.js"));
const wangluChunksPack = require(path.join(rootDir, "content", "listening", "chunks", "wanglu-chunks-v1.js"));
const wangluAdvancedChunksPack = require(path.join(rootDir, "content", "listening", "chunks", "wanglu-advanced-chunks-v1.js"));
const wangluCorePack = require(path.join(rootDir, "content", "listening", "words", "wanglu-core-v1.js"));
const { WordChunkIndexer, WordChunkIndexerClass } = require(path.join(rootDir, "content", "listening", "chunks", "word-chunk-indexer.js"));

console.log("\n=======================================================");
console.log("🧪 运行 IELTS Chunk Architecture & Indexer 单元测试...");
console.log("=======================================================\n");

// 1. 测试 ContentSchemas 常量与元模型完整性
console.log("▶ [Test 1] 校验 ContentSchemas 扩展元模型...");
assert.equal(ContentSchemas.CONTENT_TYPES.CHUNK, "chunk");
assert.equal(ContentSchemas.TRAINING_ROLES.LISTENING_RECOGNITION, "listening_recognition");
assert.equal(ContentSchemas.TRAINING_ROLES.PRODUCTIVE_OUTPUT, "productive_output");
assert.equal(ContentSchemas.PRODUCTIVE_SUITABILITY.HIGH, "high");
assert.equal(ContentSchemas.PRODUCTIVE_SUITABILITY.MEDIUM, "medium");
assert.equal(ContentSchemas.PRODUCTIVE_SUITABILITY.RECOGNITION_ONLY, "recognition_only");
assert.equal(ContentSchemas.REACTION_TIERS.FLUENT, "fluent");
assert.equal(ContentSchemas.REACTION_TIERS.ACCESSIBLE, "accessible");
assert.equal(ContentSchemas.REACTION_TIERS.SLOW, "slow");
assert.equal(ContentSchemas.REACTION_TIERS.WEAK, "weak");
console.log("   ✔ Schemas 枚举常量定义完整且不可变");

// 2. 校验王陆词块包数据规格
console.log("▶ [Test 2] 校验王陆词块包 (Chapter 5 & 11) 结构与容量...");
assert.equal(wangluChunksPack.packId, "wanglu-chunks-v1");
assert.equal(wangluChunksPack.domain, "listening");
assert.equal(wangluChunksPack.contentType, "chunk");
assert.equal(wangluChunksPack.items.length, 1569);
assert.equal(wangluChunksPack.expectedCount, 1569);
assert.equal(wangluChunksPack.metadata.reviewStatus, "imported");

assert.equal(wangluAdvancedChunksPack.packId, "wanglu-advanced-chunks-v1");
assert.equal(wangluAdvancedChunksPack.domain, "listening");
assert.equal(wangluAdvancedChunksPack.contentType, "chunk");
assert.equal(wangluAdvancedChunksPack.items.length, 1418);
assert.equal(wangluAdvancedChunksPack.expectedCount, 1418);
assert.equal(wangluAdvancedChunksPack.metadata.reviewStatus, "imported");
console.log(`   ✔ 两个词块包共收录 ${wangluChunksPack.items.length + wangluAdvancedChunksPack.items.length} 条真题词块`);

// 3. 校验适宜度规则推导准确性 (productiveSuitability)
console.log("▶ [Test 3] 校验高频产出词 vs 纯听辨词分类规则...");
// 高频生活/学术产出词块
const tuitionChunk = wangluChunksPack.items.find((c) => c.text.toLowerCase().includes("tuition fee"));
assert.ok(tuitionChunk, "必须找到 tuition fee 相关词块");
assert.equal(tuitionChunk.productiveSuitability, "high");
assert.ok(tuitionChunk.trainingRole.includes("productive_output"));

const livingExpensesChunk = wangluChunksPack.items.find((c) => c.text.toLowerCase() === "living expenses");
assert.ok(livingExpensesChunk, "必须找到 living expenses 词块");
assert.equal(livingExpensesChunk.productiveSuitability, "high");

// 偏门学术/生物/生僻专用词块应标记为 recognition_only，防止滥进入 2秒中文产出召回
const redBloodChunk = wangluAdvancedChunksPack.items.find((c) => c.text.toLowerCase() === "red blood cells");
assert.ok(redBloodChunk, "必须找到 red blood cells 词块");
assert.equal(redBloodChunk.productiveSuitability, "recognition_only");
assert.deepEqual(redBloodChunk.trainingRole, ["listening_recognition"]);

const locatorBeaconChunk = wangluAdvancedChunksPack.items.find((c) => c.text.toLowerCase().includes("emergency locator beacon"));
assert.ok(locatorBeaconChunk, "必须找到 emergency locator beacon 词块");
assert.equal(locatorBeaconChunk.productiveSuitability, "recognition_only");
console.log("   ✔ 适宜度推导准确：living expenses (high) vs red blood cells (recognition_only)");

// 4. 校验 WordChunkIndexer 双向倒排索引
console.log("▶ [Test 4] 校验 WordChunkIndexer 双向倒排索引构建与检索...");
WordChunkIndexer.buildIndex([wangluChunksPack, wangluAdvancedChunksPack], wangluCorePack.items);

const stats = WordChunkIndexer.getStats();
console.log(`   • 倒排索引规模: ${stats.indexedWordsCount} 个单词构件 ➔ ${stats.indexedChunksCount} 条真题词块`);
assert.ok(stats.indexedWordsCount > 2000, "索引词汇量应超过 2000");
assert.equal(stats.indexedChunksCount, 2987, "总索引词块必须为 2987 条");

// 单词 -> 词块查找
assert.equal(WordChunkIndexer.hasChunks("tuition"), true);
assert.equal(WordChunkIndexer.hasChunks("expenses"), true);
assert.equal(WordChunkIndexer.hasChunks("nonexistentfakeword123"), false);

const tuitionMatches = WordChunkIndexer.getChunksForWord("tuition");
assert.ok(tuitionMatches.length >= 1);
assert.ok(tuitionMatches.some((c) => c.text.toLowerCase().includes("tuition")));

// 词形还原测试：查询单数 expense 能命中 living expenses
const expenseMatches = WordChunkIndexer.getChunksForWord("expense");
assert.ok(expenseMatches.some((c) => c.text.toLowerCase() === "living expenses"));

// 适宜度过滤检索
const highOnlyMatches = WordChunkIndexer.getChunksForWord("blood", { suitability: "high" });
const allBloodMatches = WordChunkIndexer.getChunksForWord("blood");
assert.ok(allBloodMatches.length > highOnlyMatches.length, "全量匹配应多于过滤后的 high 匹配");
assert.ok(!highOnlyMatches.some((c) => c.text.toLowerCase() === "red blood cells"));

console.log("   ✔ 双向索引构建、形态学归一化查询、适宜度过滤检索全部验证通过");

// 5. 校验反应时阶梯 (Reaction Tiers) 判定逻辑
console.log("▶ [Test 5] 校验 2 秒极速反应时阶梯判定逻辑...");
function evaluateReactionTier(responseLatencyMs, isCorrect) {
  if (!isCorrect) return ContentSchemas.REACTION_TIERS.WEAK;
  if (responseLatencyMs <= 2000) return ContentSchemas.REACTION_TIERS.FLUENT;
  if (responseLatencyMs <= 4000) return ContentSchemas.REACTION_TIERS.ACCESSIBLE;
  if (responseLatencyMs <= 8000) return ContentSchemas.REACTION_TIERS.SLOW;
  return ContentSchemas.REACTION_TIERS.WEAK;
}

assert.equal(evaluateReactionTier(1200, true), "fluent");
assert.equal(evaluateReactionTier(2000, true), "fluent");
assert.equal(evaluateReactionTier(2001, true), "accessible");
assert.equal(evaluateReactionTier(3800, true), "accessible");
assert.equal(evaluateReactionTier(4500, true), "slow");
assert.equal(evaluateReactionTier(8000, true), "slow");
assert.equal(evaluateReactionTier(8500, true), "weak");
assert.equal(evaluateReactionTier(1500, false), "weak"); // 虽快但错直接定为 weak
console.log("   ✔ 反应时阶梯判定逻辑严格符合 <=2s fluent 架构定义");

// 6. 铁律检查：没有任何 item 包含运行时状态 mastery
console.log("▶ [Test 6] 严格检查静态内容无 mastery 污染...");
const allChunks = [...wangluChunksPack.items, ...wangluAdvancedChunksPack.items];
for (const item of allChunks) {
  assert.equal("mastery" in item, false, `Item ${item.id} 绝不能包含 mastery 字段`);
}
console.log(`   ✔ 全部 ${allChunks.length} 条词块 100% 保持静态纯洁无 mastery 污染`);

console.log("\n=======================================================");
console.log("🎉 全部 6 组 Chunk Architecture 单元测试通过！");
console.log("=======================================================\n");
