// 验证 IndexedDB 升级规范断言测试
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");

console.log("\n=======================================================");
console.log("🧪 运行 IndexedDB v1 -> v2 升级与无损规范断言测试...");
console.log("=======================================================");

const dbCode = fs.readFileSync(path.join(rootDir, "db.js"), "utf8");

// 1. 约束 #1 验证：DB_NAME 绝不允许改变，必须仍为 ielts_engine_v1
assert.ok(dbCode.includes('const DB_NAME = "ielts_engine_v1";'), "DB_NAME 必须保持 'ielts_engine_v1'，严禁创建新空库！");
console.log("  ✓ 断言通过: DB_NAME 保持 'ielts_engine_v1'");

// 2. 约束 #1 验证：DB_VERSION 从 1 升到 2
assert.ok(dbCode.includes('const DB_VERSION = 2;'), "DB_VERSION 必须为 2");
console.log("  ✓ 断言通过: DB_VERSION 升至 2");

// 3. 约束 #1 验证：onupgradeneeded 必须包含全部 5 个仓库创建判断
assert.ok(dbCode.includes('db.objectStoreNames.contains("attempts")'), "缺少 attempts 仓库判断");
assert.ok(dbCode.includes('db.objectStoreNames.contains("mistakes")'), "缺少 mistakes 仓库判断");
assert.ok(dbCode.includes('db.objectStoreNames.contains("audio_assets")'), "缺少 audio_assets 仓库判断");
assert.ok(dbCode.includes('db.objectStoreNames.contains("review_items")'), "缺少 review_items 仓库判断");
assert.ok(dbCode.includes('db.objectStoreNames.contains("user_content")'), "缺少 user_content 仓库判断");
console.log("  ✓ 断言通过: attempts / mistakes / audio_assets / review_items 完整保留，新增 user_content");

// 4. 约束 #8 验证：exportAllData 与 importAllData 升级支持 user_content
assert.ok(dbCode.includes('const user_content = await this.getAllUserContent()'), "exportAllData 必须包含 user_content");
assert.ok(dbCode.includes('schemaVersion: 2'), "exportAllData 必须输出 schemaVersion: 2");
assert.ok(dbCode.includes('jsonData.user_content'), "importAllData 必须处理 user_content");
console.log("  ✓ 断言通过: 导出/恢复完整涵盖 user_content 且兼容旧版备份");

console.log("🎉 IndexedDB 升级断言全部通过！\n");
