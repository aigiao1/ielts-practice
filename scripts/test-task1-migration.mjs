// 验证 Task 1 历史学习进度从 154 题旧版到 140 题标准版 (task1-workbook-v1) 的平滑无损迁移
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");

// 基于语义重合度与模块考点比对建立的确定性映射表
export const LEGACY_TO_CANONICAL_GROUP_MAP = Object.freeze({
  "m1-g1": "task1-group-01",
  "m1-g2": "task1-group-02",
  "m1-g3": "task1-group-03",
  "m1-g4": "task1-group-04",
  "m2-g1": "task1-group-05",
  "m2-g2": "task1-group-06",
  "m2-g3": "task1-group-07",
  "m2-g4": "task1-group-08",
  "m3-g1": "task1-group-09",
  "m3-g2": "task1-group-09",
  "m3-g3": "task1-group-10",
  "m3-g4": "task1-group-11",
  "m3-g5": "task1-group-11",
  "m3-g6": "task1-group-12",
  "m3-g7": "task1-group-12",
  "m4-g1": "task1-group-13",
  "m4-g2": "task1-group-14",
  "m4-g3": "task1-group-15",
  "m4-g4": "task1-group-16",
  "m5-g1": "task1-group-17",
  "m5-g2": "task1-group-18",
  "m5-g3": "task1-group-19",
  "m5-g4": "task1-group-20",
  "m6-g1": "task1-group-21",
  "m6-g2": "task1-group-22",
  "m6-g3": "task1-group-23",
  "m6-g4": "task1-group-24",
  "m7-g1": "task1-group-25",
  "m7-g2": "task1-group-26",
  "m7-g3": "task1-group-27",
  "m7-g4": "task1-group-28"
});

export function migrateTask1Progress(legacyCompletedGroups, canonicalGroups) {
  if (!Array.isArray(legacyCompletedGroups)) return [];
  const canonicalIds = new Set((canonicalGroups || []).map((g) => g.id));
  const migrated = new Set();

  for (const oldId of legacyCompletedGroups) {
    if (LEGACY_TO_CANONICAL_GROUP_MAP[oldId]) {
      migrated.add(LEGACY_TO_CANONICAL_GROUP_MAP[oldId]);
    } else if (canonicalIds.has(oldId)) {
      // 已经是新版 ID
      migrated.add(oldId);
    }
    // 无法确定的未知 ID 坚决不猜，丢弃在新版中，防止污染
  }

  return Array.from(migrated);
}

// 自动化测试执行
const v140Code = fs.readFileSync(path.join(rootDir, "content/writing/task1/task1-workbook-v1.js"), "utf8");
const v140 = JSON.parse(v140Code.match(/TASK1_WORKBOOK_PACK_V1\s*=\s*(\{[\s\S]*?\});/)[1]);

console.log("\n=======================================================");
console.log("🧪 运行 Task 1 进度迁移断言测试...");
console.log("=======================================================");

const testOldInput = ["m1-g1", "m2-g4", "m7-g4", "random-fake-group"];
const testResult = migrateTask1Progress(testOldInput, v140.groups);

console.log("  输入旧进度:", testOldInput);
console.log("  迁移后新进度:", testResult);

if (
  testResult.includes("task1-group-01") &&
  testResult.includes("task1-group-08") &&
  testResult.includes("task1-group-28") &&
  !testResult.includes("random-fake-group") &&
  testResult.length === 3
) {
  console.log("🎉 Task 1 迁移断言 100% 通过！映射严格准确且不污染未知题组！\n");
  process.exit(0);
} else {
  console.error("❌ 迁移断言失败！");
  process.exit(1);
}
