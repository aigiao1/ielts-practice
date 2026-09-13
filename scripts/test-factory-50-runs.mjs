// QuestionFactory v1 50 轮高强度随机性与自适应压力测试
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dir, "..");

// 导入核心零件与工厂
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const { UserModel } = require(path.join(root, "factory", "user-model.js"));
const { engine } = require(path.join(root, "number-date-engine.js"));
const { NumberFactory } = require(path.join(root, "factory", "number-factory.js"));
const { PARAPHRASE_CONCEPTS, DISTRACTOR_GROUPS } = require(path.join(root, "factory", "data", "paraphrase-concepts.js"));
const { ParaphraseFactory } = require(path.join(root, "factory", "paraphrase-factory.js"));
const { TrapFactory } = require(path.join(root, "factory", "trap-factory.js"));
const { QuestionFactory } = require(path.join(root, "factory", "question-factory.js"));

console.log("🚀 开始 QuestionFactory v1 50 轮高强度出题与随机性测试...\n");

const userModel = new UserModel({ recentWindowSize: 10 });
userModel.weights.clear();
userModel.stats.clear();
const numberFactory = new NumberFactory(engine, userModel);
const paraphraseFactory = new ParaphraseFactory(PARAPHRASE_CONCEPTS, DISTRACTOR_GROUPS, userModel);
const trapFactory = new TrapFactory(undefined, userModel);

const factory = new QuestionFactory({
  userModel,
  numberFactory,
  paraphraseFactory,
  trapFactory
});

// ==========================================
// 1. 同义替换 50 轮测试
// ==========================================
console.log("▶ [Test 1] 运行 50 轮同义替换动态出题...");
const paraLabels = { A: 0, B: 0, C: 0, D: 0 };
const paraUniqueSpoken = new Set();
const paraConceptsSeen = new Set();

for (let i = 0; i < 50; i++) {
  const q = factory.generate("paraphrase");

  assert.ok(q.sourceSpoken, `第 ${i+1} 题缺少 sourceSpoken`);
  assert.ok(!q.sourceSpoken.includes("{"), `第 ${i+1} 题发现残留插槽: ${q.sourceSpoken}`);
  assert.ok(!q.sourceSpoken.includes("undefined"), `第 ${i+1} 题包含 undefined`);

  assert.equal(q.options.length, 4, `第 ${i+1} 题选项数量不为 4`);
  const correctOpts = q.options.filter((o) => o.isCorrect);
  assert.equal(correctOpts.length, 1, `第 ${i+1} 题必须有且仅有 1 个正确项`);

  assert.ok(["A", "B", "C", "D"].includes(q.correctLabel), `第 ${i+1} 题答案标签不合法`);
  paraLabels[q.correctLabel]++;

  paraUniqueSpoken.add(q.sourceSpoken);
  paraConceptsSeen.add(q.conceptId);

  // 模拟交替答题
  const isCorrect = i % 3 !== 0; // 每 3 题错 1 题
  factory.recordResult(q, isCorrect);
}

console.log("   - 50 轮生成不重复口语原句数:", paraUniqueSpoken.size, "/ 50");
console.log("   - 覆盖的核心概念种类:", paraConceptsSeen.size);
console.log("   - 选项正确位置分布:", paraLabels);

assert.ok(paraUniqueSpoken.size >= 40, "50 轮生成中不重复口语原句应 >= 40 种，杜绝死题背答案！");
assert.ok(paraLabels.A >= 1 && paraLabels.B >= 1 && paraLabels.C >= 1 && paraLabels.D >= 1, "正确答案位置必须随机分布于 A/B/C/D！");

// ==========================================
// 2. 陷阱转折题 50 轮测试
// ==========================================
console.log("\n▶ [Test 2] 运行 50 轮雅思陷阱与转折题生成...");
const trapLabels = { A: 0, B: 0, C: 0 };
const trapUniqueSpoken = new Set();

for (let i = 0; i < 50; i++) {
  const q = factory.generate("trap");

  assert.ok(q.spokenSentence, `第 ${i+1} 题缺少 spokenSentence`);
  assert.ok(!q.spokenSentence.includes("{"), `第 ${i+1} 题发现残留插槽: ${q.spokenSentence}`);
  assert.ok(!q.spokenSentence.includes("undefined"), `第 ${i+1} 题包含 undefined`);

  assert.equal(q.options.length, 3, `第 ${i+1} 题选项数量应为 3`);
  const correctOpts = q.options.filter((o) => o.isCorrect);
  assert.equal(correctOpts.length, 1, `第 ${i+1} 题必须有且仅有 1 个正确项`);

  trapLabels[q.correctLabel]++;
  trapUniqueSpoken.add(q.spokenSentence);
}

console.log("   - 50 轮生成不重复音频文本数:", trapUniqueSpoken.size, "/ 50");
console.log("   - 陷阱题正确答案位置分布:", trapLabels);
assert.ok(trapUniqueSpoken.size >= 35, "50 轮陷阱题音频应高度多态随机！");
assert.ok(trapLabels.A > 5 && trapLabels.B > 5 && trapLabels.C > 5, "陷阱题正确选项必须在 A/B/C 均匀分布！");

// ==========================================
// 3. 自适应权重测试 (错项自适应提高出现频率)
// ==========================================
console.log("\n▶ [Test 3] 验证自适应算法（做错后该考点权重爬升并优先出题）...");
const targetConceptId = "CONDITIONAL_SUSTAINABILITY";
const initialWeight = userModel.getWeight(targetConceptId);
console.log(`   - 考点 ${targetConceptId} 初始权重:`, initialWeight);

// 连续模拟做错 3 次
userModel.recordAttempt(targetConceptId, false);
userModel.recordAttempt(targetConceptId, false);
userModel.recordAttempt(targetConceptId, false);

const penalisedWeight = userModel.getWeight(targetConceptId);
console.log(`   - 连续做错 3 次后惩罚权重:`, penalisedWeight);
assert.ok(penalisedWeight > initialWeight * 3, "连续做错后权重应大幅提升！");

// 清除滑动窗口后测试抽选概率 (在 22 项样本池中验证轮盘赌加权命中率)
userModel.clearRecent();
let targetHitCount = 0;
const samplePool = PARAPHRASE_CONCEPTS.slice(0, 22);
for (let i = 0; i < 50; i++) {
  userModel.clearRecent(); // 每次单独测试抽选概率
  const picked = userModel.pickWeighted(samplePool, (c) => c.id);
  if (picked.id === targetConceptId) targetHitCount++;
}
console.log(`   - 50 次单抽中高权考点命中次数: ${targetHitCount} 次 (由于权重大幅提升至 ${penalisedWeight})`);
assert.ok(targetHitCount >= 3, "高权重弱项在抽题中应显著增加出现频次！");

// 连续做对 4 次
userModel.recordAttempt(targetConceptId, true);
userModel.recordAttempt(targetConceptId, true);
userModel.recordAttempt(targetConceptId, true);
userModel.recordAttempt(targetConceptId, true);
const rewardedWeight = userModel.getWeight(targetConceptId);
console.log(`   - 连续做对 4 次后衰减权重:`, rewardedWeight);
assert.ok(rewardedWeight < penalisedWeight, "做对后权重应自动回调衰减！");

console.log("\n🎉 ALL 50-RUNS PRESSURE TESTS PASSED! QuestionFactory v1 验证圆满成功！\n");
