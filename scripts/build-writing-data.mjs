import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const appDirectory = path.resolve(scriptDirectory, "..");
const projectDirectory = path.resolve(appDirectory, "..");

const task1Source = path.join(projectDirectory, "task1-translation-workbook.md");
const task2Source = path.join(projectDirectory, "translation-workbook.md");
const outputPath = path.join(appDirectory, "writing-data.js");

function answerParts(markdown) {
  const parts = [];
  let cursor = 0;
  const strongPattern = /\*\*(.+?)\*\*/g;
  for (const match of markdown.matchAll(strongPattern)) {
    if (match.index > cursor) parts.push({ text: markdown.slice(cursor, match.index), strong: false });
    parts.push({ text: match[1], strong: true });
    cursor = match.index + match[0].length;
  }
  if (cursor < markdown.length) parts.push({ text: markdown.slice(cursor), strong: false });
  return parts.length ? parts : [{ text: markdown, strong: false }];
}

function parseTableRow(line) {
  const match = line.match(/^\|\s*(\d+)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*$/);
  if (!match) return null;
  const answerMarkdown = match[3];
  return {
    number: Number(match[1]),
    chinese: match[2],
    answer: answerMarkdown.replace(/\*\*/g, ""),
    answerParts: answerParts(answerMarkdown),
  };
}

function parseTask1(markdown) {
  const lines = markdown.split(/\r?\n/);
  const groups = [];
  let moduleLabel = "";
  let group = null;

  const finishGroup = () => {
    if (!group) return;
    assert.equal(group.questions.length, 5, `${group.label} 应包含5题`);
    groups.push(group);
    group = null;
  };

  for (const line of lines) {
    const moduleMatch = line.match(/^##\s+(模块.+)$/);
    if (moduleMatch) {
      finishGroup();
      moduleLabel = moduleMatch[1].trim();
      continue;
    }

    const groupMatch = line.match(/^###\s+题组\s+(\d+)\s+·\s+(.+)$/);
    if (groupMatch) {
      finishGroup();
      group = {
        id: `task1-group-${String(Number(groupMatch[1])).padStart(2, "0")}`,
        number: Number(groupMatch[1]),
        label: groupMatch[2].trim(),
        module: moduleLabel,
        context: "",
        note: "",
        questions: [],
      };
      continue;
    }

    if (!group) continue;
    if (line.startsWith("> 原始信息：")) {
      group.context = line.slice("> 原始信息：".length).trim();
      continue;
    }
    if (line.startsWith("> 易错点：")) {
      group.note = line.slice("> 易错点：".length).trim();
      continue;
    }
    if (line.startsWith("> 自检：")) {
      group.note = line.slice("> 自检：".length).trim();
      continue;
    }

    const row = parseTableRow(line);
    if (row) group.questions.push({ ...row, id: `task1-${String(row.number).padStart(3, "0")}` });
  }
  finishGroup();

  assert.equal(groups.length, 28, "Task 1 题组数量异常");
  const questions = groups.flatMap((item) => item.questions);
  assert.equal(questions.length, 140, "Task 1 题目数量异常");
  assert.deepEqual(questions.map((item) => item.number), Array.from({ length: 140 }, (_, index) => index + 1), "Task 1 编号不连续");
  assert.ok(groups.every((item) => item.context), "Task 1 存在缺少原始信息的题组");
  assert.ok(groups.every((item) => item.note), "Task 1 存在缺少易错点或自检的题组");
  return groups;
}

function parseTask2(markdown) {
  const marker = "## Band 7 真题母题翻译训练（121–240）";
  const markerIndex = markdown.indexOf(marker);
  assert.ok(markerIndex >= 0, "找不到Task 2的121–240题段落");

  const lines = markdown.slice(markerIndex).split(/\r?\n/);
  const groups = [];
  let group = null;

  const finishGroup = () => {
    if (!group) return;
    assert.equal(group.questions.length, 5, `${group.label} 应包含5题`);
    groups.push(group);
    group = null;
  };

  for (const line of lines) {
    const groupMatch = line.match(/^###\s+(\d+)\.\s+(.+)$/);
    if (groupMatch) {
      finishGroup();
      const fullLabel = groupMatch[2].trim();
      const sourceMatch = fullLabel.match(/（([^）]+)）\s*$/);
      group = {
        id: `task2-group-${String(Number(groupMatch[1])).padStart(2, "0")}`,
        number: Number(groupMatch[1]),
        label: fullLabel,
        source: sourceMatch?.[1] || "",
        context: "",
        questions: [],
      };
      continue;
    }

    if (!group) continue;
    if (line.startsWith("> 母题提要：")) {
      group.context = line.slice("> 母题提要：".length).trim();
      continue;
    }

    const row = parseTableRow(line);
    if (row) group.questions.push({ ...row, id: `task2-${String(row.number).padStart(3, "0")}` });
  }
  finishGroup();

  assert.equal(groups.length, 24, "Task 2 题组数量异常");
  const questions = groups.flatMap((item) => item.questions);
  assert.equal(questions.length, 120, "Task 2 题目数量异常");
  assert.deepEqual(questions.map((item) => item.number), Array.from({ length: 120 }, (_, index) => index + 121), "Task 2 编号不连续");
  assert.ok(groups.every((item) => item.context), "Task 2 存在缺少母题提要的题组");
  return groups;
}

const [task1Markdown, task2Markdown] = await Promise.all([
  readFile(task1Source, "utf8"),
  readFile(task2Source, "utf8"),
]);

const data = {
  task1: {
    label: "Task 1",
    description: "图表、地图、流程与微型报告翻译",
    firstQuestion: 1,
    lastQuestion: 140,
    groups: parseTask1(task1Markdown),
  },
  task2: {
    label: "Task 2",
    description: "真题母题中译英（121–240）",
    firstQuestion: 121,
    lastQuestion: 240,
    groups: parseTask2(task2Markdown),
  },
};

const source = `// 此文件由 scripts/build-writing-data.mjs 自动生成，请勿手工编辑。\nwindow.WRITING_PRACTICE_DATA = ${JSON.stringify(data, null, 2)};\n`;
await writeFile(outputPath, source, "utf8");
console.log(`PASS: Task 1 ${data.task1.groups.length}组/140题，Task 2 ${data.task2.groups.length}组/120题。`);
