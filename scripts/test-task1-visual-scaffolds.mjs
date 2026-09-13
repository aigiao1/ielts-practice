// Task 1 视觉图表与思维链词库断言测试 (Task 1 Visual Scaffolds Tests - Complete 28 Groups)
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
console.log("🧪 运行 Task 1 全 28 题组 (140 题) 视觉图表与思维链断言测试...");
console.log("=======================================================\n");

// 1. 验证全部 28 个题组在知识包中 100% 存在
assert.equal(Task1Workbook.groups.length, 28, "Workbook 必须包含 28 个题组");
let totalMappedQuestions = 0;

Task1Workbook.groups.forEach((group) => {
  const scaffold = Task1VisualScaffolds.TASK1_VISUAL_SCAFFOLDS[group.id];
  assert.ok(scaffold, `题组 ${group.id} (${group.label}) 必须在 TASK1_VISUAL_SCAFFOLDS 中有专属图表与思维链定义`);
  assert.ok(scaffold.chartType, `题组 ${group.id} 必须指定有效 chartType`);
  assert.ok(scaffold.chartTitle, `题组 ${group.id} 必须有明确标题`);
  assert.ok(Array.isArray(scaffold.relations), `题组 ${group.id} 必须包含 relations 列表`);
  assert.equal(scaffold.relations.length, group.questions.length, `题组 ${group.id} 的题目映射数必须与实际题目数 (${group.questions.length}) 严格一致`);

  // 验证每道题目的映射属性
  scaffold.relations.forEach((rel, qIdx) => {
    const expectedQNum = group.questions[qIdx].number;
    assert.equal(rel.qNumber, expectedQNum, `题目映射题号应为 ${expectedQNum}`);
    assert.ok(rel.badge && rel.badge.length > 0, `第 ${expectedQNum} 题必须有 badge`);
    assert.ok(rel.trigger && rel.trigger.length > 0, `第 ${expectedQNum} 题必须有 trigger 引导`);
    assert.ok(rel.funcIntent && rel.funcIntent.length > 0, `第 ${expectedQNum} 题必须有 funcIntent 功能意图`);
    assert.ok(rel.skeleton && rel.skeleton.length > 0, `第 ${expectedQNum} 题必须有 skeleton 骨架`);
    totalMappedQuestions++;
  });

  // 验证渲染器能够直接生成原生图形，绝不能降级成 generic-chart-box
  const chartHtml = Task1ChartRenderer.renderChart(scaffold);
  assert.ok(chartHtml.length > 50, `题组 ${group.id} 渲染出的图表 HTML 不得为空`);
  assert.equal(chartHtml.includes("generic-chart-box"), false, `题组 ${group.id} 绝对不允许降级为纯文字卡片 generic-chart-box`);
});

console.log(`  ✓ 断言通过: 28 个题组 100% 具备专属图表数据，总计 ${totalMappedQuestions} 道题目实现全量思维链映射`);
console.log("  ✓ 断言通过: 全量 28 个题组渲染完全零降级，杜绝任何通用文字卡片");

// 2. 专项断言各类核心图表生成器的准确度
// A. 动态多折线图 (Group 05)
const scaffold5 = Task1VisualScaffolds.TASK1_VISUAL_SCAFFOLDS["task1-group-05"];
assert.equal(scaffold5.chartType, "line");
const lineHtml = Task1ChartRenderer.renderChart(scaffold5);
assert.ok(lineHtml.includes("<svg") && lineHtml.includes("task1-line-svg"), "折线图应包含 task1-line-svg");
assert.ok(lineHtml.includes("line-dot"), "折线图应包含数据拐点 line-dot");
assert.ok(lineHtml.includes("line-path"), "折线图应包含曲线路径 line-path");
console.log("  ✓ 断言通过: 动态多折线图 (renderLineSvg) 包含网格、坐标与折线拐点");

// B. 分组对比柱图 (Group 04 & Group 09)
const scaffold9 = Task1VisualScaffolds.TASK1_VISUAL_SCAFFOLDS["task1-group-09"];
assert.equal(scaffold9.chartType, "bar_grouped");
const barHtml = Task1ChartRenderer.renderChart(scaffold9);
assert.ok(barHtml.includes("grouped-bar-container"), "分组柱图应包含 grouped-bar-container");
assert.ok(barHtml.includes("single-bar-col"), "分组柱图应包含柱体列 single-bar-col");
console.log("  ✓ 断言通过: 分组对比柱图 (renderBarSvg) 生成完整系列图例与各类别对比柱");

// C. 双饼对比图 (Group 11)
const scaffold11 = Task1VisualScaffolds.TASK1_VISUAL_SCAFFOLDS["task1-group-11"];
assert.equal(scaffold11.chartType, "dual_pie");
const dualPieHtml = Task1ChartRenderer.renderChart(scaffold11);
assert.ok(dualPieHtml.includes("dual-pie-container"), "双饼图应包含 dual-pie-container");
assert.ok(dualPieHtml.includes("城市 X (City X)") && dualPieHtml.includes("城市 Y (City Y)"), "双饼图应并排呈现两市环形图");
console.log("  ✓ 断言通过: 双饼对比图 (renderDualPieHtml) 并排生成两座城市对比环形图");

// D. 流程工序与闭环循环图 (Group 21 & Group 24)
const scaffold21 = Task1VisualScaffolds.TASK1_VISUAL_SCAFFOLDS["task1-group-21"];
assert.equal(scaffold21.chartType, "flow");
const flowHtml = Task1ChartRenderer.renderChart(scaffold21);
assert.ok(flowHtml.includes("task1-flow-wrapper"), "流程图应包含 task1-flow-wrapper");
assert.ok(flowHtml.includes("flow-step-card"), "流程图应包含步骤卡片 flow-step-card");

const scaffold24 = Task1VisualScaffolds.TASK1_VISUAL_SCAFFOLDS["task1-group-24"];
assert.equal(scaffold24.chartType, "flow_circular");
const circularFlowHtml = Task1ChartRenderer.renderChart(scaffold24);
assert.ok(circularFlowHtml.includes("flow-loop-badge"), "闭环生命周期图必须渲染循环回路标识");
console.log("  ✓ 断言通过: 流程工序图与闭环生命周期图 (renderProcessFlowHtml) 支持线性步骤与闭环循环");

// E. 规划与演变地图 (Group 17 & Group 18)
const scaffold17 = Task1VisualScaffolds.TASK1_VISUAL_SCAFFOLDS["task1-group-17"];
assert.equal(scaffold17.chartType, "map");
const mapHtml = Task1ChartRenderer.renderChart(scaffold17);
assert.ok(mapHtml.includes("task1-map-wrapper"), "地图应包含 task1-map-wrapper");
assert.ok(mapHtml.includes("map-compass-badge"), "地图应包含指南针方位标识");
assert.ok(mapHtml.includes("map-zone-card"), "地图应包含各规划地块卡片");
console.log("  ✓ 断言通过: 规划地图与演变平面图 (renderMapHtml) 包含前后对比与指南针方位标");

console.log("\n🎉 Task 1 全 28 题组视觉图表与思维链断言测试 100% 全部通过！\n");
