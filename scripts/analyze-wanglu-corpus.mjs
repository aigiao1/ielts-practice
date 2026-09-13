import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvPath = path.resolve(__dirname, '../content/sources/wanglu-corpus-raw.csv');
const raw = fs.readFileSync(csvPath, 'utf-8');
const lines = raw.split(/\r?\n/).map(l => l.trimEnd()).filter(l => l.length > 0);

console.log(`总行数: ${lines.length}`);
const headerLine = lines[0];
const headers = headerLine.split(',');
console.log(`列数: ${headers.length}`);
headers.forEach((h, i) => {
  if (h) console.log(`  Col ${i}: ${h}`);
});

// 统计各列的有效数据量
const colCounts = {};
headers.forEach((h, i) => {
  if (h) colCounts[h] = 0;
});

for (let r = 3; r < lines.length; r++) {
  const cols = lines[r].split(',');
  headers.forEach((h, i) => {
    if (h && cols[i] && cols[i].trim().length > 0) {
      colCounts[h]++;
    }
  });
}

console.log("\n各章节有效词条统计:");
Object.entries(colCounts).forEach(([k, v]) => {
  console.log(`  [${k}]: ${v} 条`);
});

// 汇总统计
let ch3Count = 0;
let ch4Count = 0;
let ch5Count = 0;
let ch11Count = 0;

Object.entries(colCounts).forEach(([k, v]) => {
  if (k.startsWith("3.")) ch3Count += v;
  else if (k.startsWith("4.")) ch4Count += v;
  else if (k.startsWith("5.")) ch5Count += v;
  else if (k.startsWith("11-")) ch11Count += v;
});

console.log("\n=========================");
console.log(`第 3 章 (名词): ${ch3Count} 条`);
console.log(`第 4 章 (形容词/副词): ${ch4Count} 条`);
console.log(`第 5 章 (核心词块 Chunks): ${ch5Count} 条`);
console.log(`第 11 章 (横向测试真题词块): ${ch11Count} 条`);
console.log(`总计词块 (Ch5 + Ch11): ${ch5Count + ch11Count} 条`);
console.log("=========================");
