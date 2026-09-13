// 剑桥真题错题规范断言与兼容性测试 (Cambridge Mistake Schema Tests)
// 运行：node scripts/test-cambridge-mistake-schema.mjs
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const require = createRequire(import.meta.url);

const CambridgeMistakeSchema = require(path.join(rootDir, "content", "user-materials", "cambridge-mistake-schema.js"));

console.log("\n=======================================================");
console.log("🧪 运行 Cambridge Mistake Schema 规范断言测试...");
console.log("=======================================================\n");

const { createCambridgeMistake, validateCambridgeMistake, STANDARD_ERROR_REASONS } = CambridgeMistakeSchema;

// 1. 测试从完整输入创建标准错题
const completeRaw = {
  book: "Cam 16",
  test: 2,
  section: 3,
  questionNumbers: [21, 22],
  questionType: "multiple_choice",
  questionText: "Which TWO aspects of the research project surprised the students?",
  options: ["A. the variety of responses", "B. the high refusal rate", "C. the accuracy of records"],
  userAnswer: "A, C",
  correctAnswer: "A, B",
  transcript: "We were quite shocked by how many people declined to participate initially.",
  keySentence: "shocked by how many people declined",
  paraphrase: {
    source: "shocked by declined to participate",
    target: "surprised by the high refusal rate"
  },
  errorReasons: ["paraphrase", "trap"],
  concepts: ["academic_research", "sample_bias"],
  notes: "declined 对应 refusal，被选项 C 的 records 干扰了",
  audioClip: {
    audioAssetId: "aud-test-123",
    startTime: 120.5,
    endTime: 128.0
  },
  tags: ["Section3", "MultipleChoice", "Vocabulary"]
};

const mistake1 = createCambridgeMistake(completeRaw);

assert.equal(mistake1.book, "Cam 16");
assert.equal(mistake1.test, 2);
assert.equal(mistake1.section, 3);
assert.equal(mistake1.part, "Part 3");
assert.deepEqual(mistake1.questionNumbers, ["21", "22"]);
assert.equal(mistake1.questionNumber, "21, 22");
assert.deepEqual(mistake1.concepts, ["academic_research", "sample_bias"]);
assert.equal(mistake1.notes, "declined 对应 refusal，被选项 C 的 records 干扰了");
assert.equal(mistake1.audioClip.audioAssetId, "aud-test-123");
assert.equal(mistake1.audioClip.startTime, 120.5);
assert.equal(mistake1.audioClip.endTime, 128.0);
assert.deepEqual(mistake1.errorReasons, ["paraphrase", "trap"]);

const validation1 = validateCambridgeMistake(mistake1);
assert.equal(validation1.valid, true, "完整错题校验应通过");
console.log("  ✓ 断言通过: 完整 Cambridge 真题错题对象规范化与属性完整性");

// 2. 测试对已有旧版 mistakes.js 字段的向下兼容性
const legacyRaw = {
  book: "Cam 14",
  test: "Test 1",
  part: "Part 2",
  questionNumber: "14",
  questionType: "note",
  questionText: "Total distance of the hiking trail: ______ km",
  correctAnswer: "15",
  userAnswer: "50",
  errorReasons: ["number_date"],
  teachingPoint: "注意 -teen 和 -ty 的发音重音区别"
};

const mistake2 = createCambridgeMistake(legacyRaw);
assert.equal(mistake2.book, "Cam 14");
assert.equal(mistake2.section, 2, "应能从 'Part 2' 自动解析出 section: 2");
assert.deepEqual(mistake2.questionNumbers, ["14"]);
assert.equal(mistake2.notes, "注意 -teen 和 -ty 的发音重音区别", "旧 teachingPoint 应被兼容为 notes");
assert.deepEqual(mistake2.errorReasons, ["number_date"]);

const validation2 = validateCambridgeMistake(mistake2);
assert.equal(validation2.valid, true, "旧版兼容错题校验应通过");
console.log("  ✓ 断言通过: 旧版 mistakes.js 字段 (part, questionNumber, teachingPoint) 向下无损兼容");

// 3. 测试非法输入与防呆校验
const invalidItem = {
  id: "mis-invalid",
  book: "",
  questionText: "",
  correctAnswer: ""
};
const validationInvalid = validateCambridgeMistake(invalidItem);
assert.equal(validationInvalid.valid, false);
assert.ok(validationInvalid.errors.length >= 2, "应指出 book 与 答案/问题缺失");
console.log("  ✓ 断言通过: 字段校验器严格拦截缺少题目/答案或书籍的非法条目");

// 4. 模拟序列化到 IndexedDB 的无损保留
const serialized = JSON.parse(JSON.stringify(mistake1));
assert.deepEqual(serialized, mistake1, "JSON 序列化前后必须完全一致无损");
console.log("  ✓ 断言通过: 结构可原生序列化并存入 IndexedDB mistakes 表无损还原");

console.log("\n🎉 Cambridge Mistake Schema 全部测试通过！\n");
