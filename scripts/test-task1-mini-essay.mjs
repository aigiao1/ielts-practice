// Task 1 四段式小作文工坊断言测试 (Mini-Essay Workbench TDD Suite)
import assert from "node:assert/strict";
import Task1MiniEssayModels from "../content/writing/task1/task1-mini-essay-models.js";
import Task1VisualScaffolds from "../content/writing/task1/task1-visual-scaffolds.js";

console.log("\n=======================================================");
console.log("🧪 运行 Task 1 四段式小作文工坊单元断言测试...");
console.log("=======================================================\n");

// [Test 1] 校验高频实战学术语块库 (GLOBAL_FUNCTIONAL_CHUNKS)
console.log("▶ [Test 1] 校验高频实战学术语块库类别与词条容量...");
const chunks = Task1MiniEssayModels.GLOBAL_FUNCTIONAL_CHUNKS;
assert.ok(Array.isArray(chunks), "语块库应为数组");
assert.equal(chunks.length, 5, "应包含恰好 5 大核心功能类别");

const expectedCategories = [
  "引言改写 (Introduction)",
  "Overview 宏观总述 (Band 7+ 关键)",
  "主体数据引出与排位 (Data & Ranking)",
  "比较、倍数与差值 (Comparisons & Multipliers)",
  "段落推进与过渡 (Cohesion & Connectors)"
];

expectedCategories.forEach((cat, idx) => {
  assert.equal(chunks[idx].category, cat, `类别 ${idx} 应为 ${cat}`);
  assert.ok(Array.isArray(chunks[idx].words) && chunks[idx].words.length >= 5, `${cat} 应包含至少 5 条实用短语`);
  chunks[idx].words.forEach((w) => {
    assert.ok(w.en && w.en.trim(), "每个语块应包含非空英文");
    assert.ok(w.note && w.note.trim(), "每个语块应包含中文释义或说明");
  });
});
console.log("   ✔ 五大功能类别语块库完备无损 (涵盖引言、Overview、数据、对比与连接词)");

// [Test 2] 校验深度定制题组的双思维切入模型 (Thinking Angles)
console.log("▶ [Test 2] 校验典型题组的双思维切入模型 (思路 A vs 思路 B)...");
const sampleGroupIds = ["task1-group-01", "task1-group-02", "task1-group-05", "task1-group-17", "task1-group-21"];

sampleGroupIds.forEach((gid) => {
  const essayModel = Task1MiniEssayModels.getMiniEssayForGroup(gid);
  assert.ok(essayModel, `${gid} 应存在小作文模型`);
  assert.ok(essayModel.thinkingAngles, `${gid} 应具备 thinkingAngles`);
  assert.ok(essayModel.thinkingAngles.angleA, `${gid} 应具备 angleA`);
  assert.ok(essayModel.thinkingAngles.angleB, `${gid} 应具备 angleB`);

  const { angleA, angleB } = essayModel.thinkingAngles;
  assert.notEqual(angleA.label, angleB.label, `${gid} 两种思路标签不可雷同`);
  assert.ok(angleA.overviewLogic && angleA.overviewLogic.length > 5, `${gid} angleA 需具备明确 overview 抓取逻辑`);
  assert.ok(angleA.body1Logic && angleA.body1Logic.length > 5, `${gid} angleA 需具备主体一段逻辑`);
  assert.ok(angleA.body2Logic && angleA.body2Logic.length > 5, `${gid} angleA 需具备主体二段逻辑`);

  assert.ok(angleB.overviewLogic && angleB.overviewLogic.length > 5, `${gid} angleB 需具备明确 overview 抓取逻辑`);
  assert.ok(angleB.body1Logic && angleB.body1Logic.length > 5, `${gid} angleB 需具备主体一段逻辑`);
  assert.ok(angleB.body2Logic && angleB.body2Logic.length > 5, `${gid} angleB 需具备主体二段逻辑`);
});
console.log("   ✔ 双思维模型断言通过：饼图、表格、折线图、地图、流程图均标配两种解构思路");

// [Test 3] 校验标准 4 段式小作文段落结构完整性 (Paragraph Steps)
console.log("▶ [Test 3] 校验 4 段式结构规范 (Intro ➔ Overview ➔ Body 1 ➔ Body 2)...");
sampleGroupIds.forEach((gid) => {
  const essayModel = Task1MiniEssayModels.getMiniEssayForGroup(gid);
  const steps = essayModel.paragraphSteps;
  assert.ok(Array.isArray(steps) && steps.length === 4, `${gid} 应恰好包含 4 个段落步骤`);

  const expectedStepIds = ["intro", "overview", "body1", "body2"];
  steps.forEach((st, idx) => {
    assert.equal(st.stepId, expectedStepIds[idx], `第 ${idx + 1} 步 ID 应为 ${expectedStepIds[idx]}`);
    assert.ok(st.title && st.title.trim(), "段落应包含标题");
    assert.ok(st.role && st.role.trim(), "段落应包含角色说明");
    assert.ok(st.chinesePrompt && st.chinesePrompt.trim(), "段落应包含构思意图");
    assert.ok(st.canonicalAnswer && st.canonicalAnswer.trim(), "段落应包含考官级示范");
    assert.ok(st.strategyTip && st.strategyTip.trim(), "段落应包含考官思维点拨");
  });
});
console.log("   ✔ 4 段式结构断言通过：Intro, Overview, Body 1, Body 2 职责分明");

// [Test 4] 校验动态题组兜底生成能力 (覆盖全量 28 个题组)
console.log("▶ [Test 4] 校验全量 28 个题组的小作文模型覆盖与兜底机制...");
for (let i = 1; i <= 28; i++) {
  const gid = `task1-group-${String(i).padStart(2, "0")}`;
  const dummyGroup = { id: gid, label: `题组 ${i}`, questions: [{ answer: "A", chinese: "中文" }] };
  const essayModel = Task1MiniEssayModels.getMiniEssayForGroup(gid, dummyGroup);

  assert.ok(essayModel, `${gid} 应成功获取小作文模型`);
  assert.ok(essayModel.thinkingAngles.angleA && essayModel.thinkingAngles.angleB, `${gid} 需生成双思维切入角度`);
  assert.equal(essayModel.paragraphSteps.length, 4, `${gid} 需生成 4 段式步骤`);
}
console.log("   ✔ 全量 28 题组 100% 覆盖小作文模型与双思维视角");

// [Test 5] 校验小作文实时合成板算法与词数统计 (Live Essay Synthesis)
console.log("▶ [Test 5] 校验小作文实时合成板拼接与词数统计...");
const drafts1 = {
  intro: "The pie chart illustrates the proportion of household spending across four categories.",
  overview: "Overall, housing and food accounted for the vast majority of total outlay, while entertainment was minimal.",
  body1: "Specifically, accommodation represented 45% of all expenses, followed closely by food at 30%, meaning both together made up three quarters of the entire family budget.",
  body2: "By contrast, transport constituted only 15%, and leisure spending was the lowest category at merely 10%, four and a half times lower than housing."
};

const result1 = Task1MiniEssayModels.synthesizeEssay(drafts1);
assert.ok(result1.fullText.includes("\n\n"), "段落之间应用双换行符分隔");
assert.equal(result1.parts.length, 4, "应包含 4 个段落");
assert.ok(result1.wordCount > 70, `词数计算应大于 70 (实测: ${result1.wordCount})`);
assert.ok(result1.isComplete, "完整撰写时 isComplete 应为 true");

const draftsEmpty = { intro: "", overview: "", body1: "", body2: "" };
const resultEmpty = Task1MiniEssayModels.synthesizeEssay(draftsEmpty);
assert.equal(resultEmpty.wordCount, 0, "空草稿词数应为 0");
assert.equal(resultEmpty.isComplete, false, "空草稿 isComplete 应为 false");
console.log(`   ✔ 小作文实时合成测试通过 (测试范文总词数: ${result1.wordCount} 词 · 健康状态: ${result1.healthStatus})`);

// [Test 6] 校验 Task1VisualScaffolds 挂接联动
console.log("▶ [Test 6] 校验 Task1VisualScaffolds.getVisualScaffoldForGroup 挂接联动...");
const scaffold = Task1VisualScaffolds.getVisualScaffoldForGroup({ id: "task1-group-01" });
assert.ok(scaffold.miniEssay, "scaffold 应当自动挂载 miniEssay");
assert.ok(scaffold.functionalChunks, "scaffold 应当自动挂载 functionalChunks");
assert.equal(scaffold.miniEssay.paragraphSteps.length, 4, "挂载的 miniEssay 应具备 4 段式步骤");
console.log("   ✔ VisualScaffolds 联动挂接 100% 通过！");

console.log("\n=======================================================");
console.log("🎉 Task 1 四段式小作文工坊全套单元断言测试 100% 通过！");
console.log("=======================================================\n");
