// 词块听辨训练引擎单元断言测试 (Chunk Aural Engine TDD Tests)
// 运行：node scripts/test-chunk-aural-engine.mjs
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
const { ChunkAuralEngine } = require(path.join(rootDir, "chunk-aural-engine.js"));

console.log("\n=======================================================");
console.log("🧪 运行 Chunk Aural Engine 单元断言测试 (TDD)...");
console.log("=======================================================\n");

const engine = new ChunkAuralEngine({
  packs: [wangluChunksPack, wangluAdvancedChunksPack],
  schemas: ContentSchemas
});

// 1. 测试会话题库筛选 (Pool Filtering)
console.log("▶ [Test 1] 校验题库章节与范围过滤 (Scope & Section Filtering)...");
engine.initSession({ packScope: "all", sectionFilter: "all", shuffle: false });
assert.equal(engine.pool.length, 2987, "全量题库必须包含 2,987 条词块");

engine.initSession({ packScope: "wanglu_ch5", sectionFilter: "all", shuffle: false });
assert.equal(engine.pool.length, 1569, "第 5 章必须包含 1,569 条词块");

engine.initSession({ packScope: "wanglu_ch11", sectionFilter: "all", shuffle: false });
assert.equal(engine.pool.length, 1418, "第 11 章必须包含 1,418 条词块");

engine.initSession({ packScope: "wanglu_ch5", sectionFilter: "5.7", shuffle: false });
assert.ok(engine.pool.length > 0, "5.7 必须有题目");
assert.ok(engine.pool.every((c) => c.sourceRef === "Chapter 5.7"), "所有题目来源必须严格为 Chapter 5.7");
console.log(`   ✔ 题库范围过滤完全准确 (5.7 单小节共 ${engine.pool.length} 条词块)`);

// 2. 测试拼写比对与变体容错 (Spelling Evaluation & Variants)
console.log("▶ [Test 2] 校验词块拼写判定与多形式容错 (Spelling Diff & Normalization)...");
// 精确匹配
const res1 = ChunkAuralEngine.evaluateAnswer("living expenses", "living expenses");
assert.equal(res1.isCorrect, true);
assert.equal(res1.spellingErrors.length, 0);

// 大小写与首尾空格容错
const res2 = ChunkAuralEngine.evaluateAnswer("  Living Expenses  ", "living expenses");
assert.equal(res2.isCorrect, true);

// 括号可选词变体容错: "a (great) variety of" 允许输入 "a variety of" 或 "a great variety of" 或 "variety of"
const res3 = ChunkAuralEngine.evaluateAnswer("a great variety of", "a (great) variety of");
assert.equal(res3.isCorrect, true);
const res4 = ChunkAuralEngine.evaluateAnswer("a variety of", "a (great) variety of");
assert.equal(res4.isCorrect, true);

// 错误拼写并提取差异
const res5 = ChunkAuralEngine.evaluateAnswer("livin expens", "living expenses");
assert.equal(res5.isCorrect, false);
assert.ok(res5.spellingErrors.length > 0);
console.log("   ✔ 拼写判定准确，完美支持大小写、多余空格及括号选项变体");

// 3. 反应时间与音频结束起算计时逻辑 (Audio-End Relative Latency)
console.log("▶ [Test 3] 校验音频结束后起算的 recognitionLatency 与 completionTime...");
engine.initSession({ packScope: "wanglu_ch5", sectionFilter: "5.7", shuffle: false });
const q = engine.getCurrentQuestion();
assert.ok(q, "必须获取到当前题目");

// 模拟音频播放过程
const tAudioStart = 10000;
const tAudioEnd = 11500; // 音频播放了 1.5s
engine.markAudioStarted(tAudioStart);
engine.markAudioEnded(tAudioEnd);

// 用户在音频结束 650ms 产生第一次按键 (t = 12150)
const tFirstKey = 12150;
engine.markFirstKeystroke(tFirstKey);

// 再次重播 (用户按 F2)
engine.recordReplay();
assert.equal(engine.currentReplayCount, 1);

// 用户在 14200 提交答案
const tSubmit = 14200;
const attempt = engine.submitAnswer(q.text, tSubmit);

// 校验计时数据
assert.equal(attempt.recognitionLatency, 650, "recognitionLatency 必须精确等于 12150 - 11500 = 650ms");
assert.equal(attempt.completionTime, 2700, "completionTime 必须精确等于 14200 - 11500 = 2700ms");
assert.equal(attempt.replayCount, 1, "重播次数必须记录为 1");
assert.equal(attempt.reactionTier, "fluent", "650ms 正确回答必须被评定为 fluent");
assert.equal(attempt.moduleType, "chunk_aural");
assert.equal(attempt.chunkId, q.id);
assert.equal(attempt.contentKey, q.contentKey);
assert.equal(attempt.correct, true);
console.log("   ✔ 反应时间严格自音频结束点起算，杜绝长短音频时间惩罚");

// 4. 校验 4 级反应时判定 (Reaction Tiers)
console.log("▶ [Test 4] 校验 4 级反应时判定阈值...");
assert.equal(ChunkAuralEngine.evaluateReactionTier(900, true), "fluent");
assert.equal(ChunkAuralEngine.evaluateReactionTier(2000, true), "fluent");
assert.equal(ChunkAuralEngine.evaluateReactionTier(2001, true), "accessible");
assert.equal(ChunkAuralEngine.evaluateReactionTier(4000, true), "accessible");
assert.equal(ChunkAuralEngine.evaluateReactionTier(4001, true), "slow");
assert.equal(ChunkAuralEngine.evaluateReactionTier(8000, true), "slow");
assert.equal(ChunkAuralEngine.evaluateReactionTier(8001, true), "weak");
assert.equal(ChunkAuralEngine.evaluateReactionTier(500, false), "weak"); // 做错无论多快均定为 weak
console.log("   ✔ 反应时 4 级阶梯判定完全符合架构规范");

// 5. 校验会话推进与统计聚合
console.log("▶ [Test 5] 校验会话切题与统计数据...");
const nextQ = engine.nextQuestion();
assert.notEqual(nextQ.id, q.id, "下一题必须不同于当前题");
assert.equal(engine.currentReplayCount, 0, "换题后重播计数器必须重置为 0");
assert.equal(engine.audioEndedAt, null, "换题后音频结束时间戳必须重置");

const stats = engine.getSessionStats();
assert.equal(stats.totalAnswered, 1);
assert.equal(stats.totalCorrect, 1);
assert.equal(stats.accuracy, 100);
assert.equal(stats.fluentCount, 1);
console.log("   ✔ 会话切题、计数器重置与统计聚合验证通过");

// 6. B+ 阶段1：20 题雷达连续筛查 (Rapid Screening Session)
console.log("▶ [Test 6] 校验 20 题连续雷达扫描 (不打断基线测试)...");
engine.initScreeningSession({ packScope: "wanglu_ch5", batchSize: 20, shuffle: true });
assert.equal(engine.currentStage, "screening");
assert.equal(engine.pool.length, 20, "筛查批次必须锁定为 20 题");
assert.equal(engine.screeningRecords.length, 0);

// 7. B+ 阶段2：错因轻量自动推导与分流 (Diagnostic Reason Attribution)
console.log("▶ [Test 7] 校验错因自动推导与分流规则 (Diagnostic Attribution)...");
// Case A: 听懂但拼错 (例如 environmental damage 漏写一个 n)
const diag1 = ChunkAuralEngine.predictDiagnosticReason("enviromental damage", "environmental damage", 1200, false);
assert.equal(diag1, "recognised_but_misspelled", "高编辑相似度错误应推导为拼写错误，不浪费时间重学声音");

// Case B: 完全听不出来 (例如输入空或毫无关联的字母)
const diag2 = ChunkAuralEngine.predictDiagnosticReason("", "traffic congestion", 5000, false);
assert.equal(diag2, "sound_not_recognised", "交白卷或完全错误应推导为声音听辨盲区");

// Case C: 正确但反应慢 (>4000ms)
const diag3 = ChunkAuralEngine.predictDiagnosticReason("living expenses", "living expenses", 5200, true);
assert.equal(diag3, "slow_recognition", "超过 4000ms 即使答对也应推导为反应迟钝");

// Case D: 极速正确
const diag4 = ChunkAuralEngine.predictDiagnosticReason("tuition fees", "tuition fees", 950, true);
assert.equal(diag4, null, "≤2000ms 正确作答无弱项");
console.log("   ✔ 错因分流推导准确无误 (区分盲区 vs 拼错 vs 迟钝)");

// 8. B+ 阶段3：诊断战报聚合与 Repair Queue 生成
console.log("▶ [Test 8] 校验 20 题诊断战报与弱项生成 (Diagnostic Summary)...");
// 模拟录入 20 题结果
engine.screeningRecords = [
  { chunk: { id: "c1", text: "word1" }, isCorrect: true, recognitionLatency: 900, diagnosticReason: null },
  { chunk: { id: "c2", text: "word2" }, isCorrect: true, recognitionLatency: 1100, diagnosticReason: null },
  { chunk: { id: "c3", text: "traffic congestion" }, isCorrect: false, recognitionLatency: 4500, diagnosticReason: "sound_not_recognised" },
  { chunk: { id: "c4", text: "environmental damage" }, isCorrect: false, recognitionLatency: 2200, diagnosticReason: "recognised_but_misspelled" },
  { chunk: { id: "c5", text: "living expenses" }, isCorrect: true, recognitionLatency: 5500, diagnosticReason: "slow_recognition" }
];
// 填充剩余 15 题全对
for (let i = 6; i <= 20; i++) {
  engine.screeningRecords.push({ chunk: { id: `c${i}`, text: `word${i}` }, isCorrect: true, recognitionLatency: 1200, diagnosticReason: null });
}

const summary = engine.generateDiagnosticSummary();
assert.equal(summary.totalScreened, 20);
assert.equal(summary.stableCount, 17); // 17 题 fluent 正确
assert.equal(summary.soundBlindCount, 1);
assert.equal(summary.misspelledCount, 1);
assert.equal(summary.slowCount, 1);
assert.equal(summary.needsRepairItems.length, 3, "必须准确筛出 3 个待修复项目");
console.log("   ✔ 诊断战报聚合通过，成功提取 3 个靶向弱项词块");

// 9. B+ 阶段4：动态分流修复梯 (Dynamic Repair Pathway)
console.log("▶ [Test 9] 校验动态分流修复梯与适宜度门禁...");
engine.initRepairSession(summary.needsRepairItems);
assert.equal(engine.currentStage, "repair");

// 校验第一项 (sound_not_recognised 且为 high) 包含 L1, L2, L3
const repairItem1 = engine.repairQueue[0];
assert.equal(repairItem1.chunk.text, "traffic congestion");
const pathway1 = ChunkAuralEngine.determineRepairPathway(repairItem1.chunk, repairItem1.diagnosticReason);
assert.deepEqual(pathway1.slice(0, 3), ["l1_isolated", "l2_collocation", "l3_in_sentence"]);

// 校验拼错项仅走 spelling_repair
const repairItem2 = engine.repairQueue[1];
assert.equal(repairItem2.diagnosticReason, "recognised_but_misspelled");
const pathway2 = ChunkAuralEngine.determineRepairPathway(repairItem2.chunk, repairItem2.diagnosticReason);
assert.deepEqual(pathway2, ["spelling_repair"], "拼写错误必须直奔拼写靶向，绝不重新磨耳朵");

// 校验生僻听力词 (recognition_only: 如 red blood cells) 绝不进入 L4
const bioChunk = { id: "bio-1", text: "red blood cells", productiveSuitability: "recognition_only", promptZh: "红细胞" };
const pathwayBio = ChunkAuralEngine.determineRepairPathway(bioChunk, "sound_not_recognised");
assert.ok(!pathwayBio.includes("l4_productive"), "recognition_only 词块严禁进入 L4 主动调用");
console.log("   ✔ 动态修复深度生效：拼错走拼写靶向、生僻词坚决止步 L3");

// 10. B+ 阶段5：延迟混排回测与非即时掌握 (Delayed Retest)
console.log("▶ [Test 10] 校验延迟混排回测与即时掌握铁律拦截...");
// 完成修复时仅记录 repairCompletedAt，严禁标记为 mastered
const repairRecord = engine.finishItemRepair(repairItem1.chunk.id);
assert.ok(repairRecord.repairCompletedAt, "必须记录修复完成时间戳");
assert.equal(repairRecord.mastered, false, "同会话即时完成绝不等于已掌握");

// 初始化延迟回测 (混入 3 道干扰题)
engine.initDelayedRetest(summary.needsRepairItems, 3);
assert.equal(engine.currentStage, "delayed_retest");
assert.equal(engine.delayedRetestPool.length, 6, "3 个待测题 + 3 个混排干扰题 = 6 题");
console.log("   ✔ 延迟混排回测机制与非即时掌握铁律全部断言通过！");

console.log("\n=======================================================");
console.log("🎉 Chunk Aural Engine 全部 B+ 阶段 TDD 单元测试通过！");
console.log("=======================================================\n");

