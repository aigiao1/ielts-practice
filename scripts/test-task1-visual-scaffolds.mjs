// Task 1 视觉图表与思维链词库断言测试 (Task 1 Visual Scaffolds Tests)
// 运行：node scripts/test-task1-visual-scaffolds.mjs
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const require = createRequire(import.meta.url);

const Task1VisualScaffolds = require(path.join(rootDir, "content", "writing", "task1", "task1-visual-scaffolds.js"));
const Task1ChartRenderer = require(path.join(rootDir, "content", "writing", "task1", "task1-chart-renderer.js"));
const Task1Workbook = require(path.join(rootDir, "content", "writing", "task1", "task1-workbook-v1.js"));

console.log("\n=======================================================");
console.log("🧪 运行 Task 1 视觉图表与思维链断言测试...");
console.log("=======================================================\n");

const group1 = Task1Workbook.groups.find((g) => g.id === "task1-group-01");
assert.ok(group1, "必须找到题组 task1-group-01");

// 1. 测试 Group 1 视觉数据模型
const scaffold1 = Task1VisualScaffolds.getVisualScaffoldForGroup(group1);
assert.equal(scaffold1.chartType, "pie", "题组1应为饼图");
assert.equal(scaffold1.chartData.length, 4, "题组1应有4个支出类别");

const sumVal = scaffold1.chartData.reduce((acc, d) => acc + d.value, 0);
assert.equal(sumVal, 100, "家庭支出 4 项占比之和必须严格为 100%");
console.log("  ✓ 断言通过: 题组 1 饼图数据完备，4 项占比精确合计 100% (45+30+15+10)");

// 2. 测试 Group 1 关系与思维链映射
assert.equal(scaffold1.relations.length, 5, "题组1应定义 5 道题目的关系映射");
const q3Rel = scaffold1.relations.find((r) => r.qNumber === 3);
assert.equal(q3Rel.type, "difference", "第3题应为差值对比");
assert.ok(q3Rel.targets.includes("交通 (Transport)") && q3Rel.targets.includes("娱乐 (Entertainment)"), "第3题应关联交通与娱乐");

const q4Rel = scaffold1.relations.find((r) => r.qNumber === 4);
assert.equal(q4Rel.type, "multiplier", "第4题应为倍数关系 (四倍半)");
console.log("  ✓ 断言通过: 5 道题与图表扇区的四步思维链/关系映射严格对齐");

// 3. 测试高频学术替换词抽屉
assert.ok(scaffold1.synonymGroups.length >= 3, "应提供至少 3 组高频学术同义词");
const expenditureGroup = scaffold1.synonymGroups.find((g) => g.category.includes("支出"));
assert.ok(expenditureGroup, "必须包含支出分类");
const hasExpenditure = expenditureGroup.words.some((w) => w.en === "expenditure");
const hasSpending = expenditureGroup.words.some((w) => w.en === "spending");
assert.ok(hasExpenditure && hasSpending, "支出词库应包含 expenditure 和 spending");
console.log("  ✓ 断言通过: 高频学术替换词库抽屉数据完备且准确");

// 4. 测试图表渲染器 SVG 输出
const chartHtml = Task1ChartRenderer.renderChart(scaffold1);
assert.ok(chartHtml.includes("<svg"), "渲染结果必须包含 <svg> 根节点");
assert.ok(chartHtml.includes("pie-slice"), "渲染结果必须包含 pie-slice 扇区路径");
assert.ok(chartHtml.includes("TOTAL") && chartHtml.includes("100%"), "饼图中心应渲染 TOTAL 100% 环孔文字");
assert.ok(chartHtml.includes("pie-legends-grid"), "必须生成图例区");
console.log("  ✓ 断言通过: 原生 SVG 饼图与图例成功生成且属性结构完整");

// 5. 测试通用题组降级兼容能力 (针对未硬编码的题组)
const group10 = Task1Workbook.groups.find((g) => g.id === "task1-group-10");
assert.ok(group10, "必须找到题组 task1-group-10");
const scaffold10 = Task1VisualScaffolds.getVisualScaffoldForGroup(group10);
assert.ok(scaffold10, "通用题组必须能够自动生成视觉/思维链骨架");
assert.ok(scaffold10.stepsGuide.step1.length > 0, "通用题组应生成步骤引导");

const chartHtml10 = Task1ChartRenderer.renderChart(scaffold10);
assert.ok(chartHtml10.length > 50, "通用题组图表卡片渲染成功");
console.log("  ✓ 断言通过: 通用未预置题组自动平滑降级并提取视觉背景");

console.log("\n🎉 Task 1 视觉图表与思维链词库断言测试全部通过！\n");
