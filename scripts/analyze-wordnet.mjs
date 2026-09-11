import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, "../..");
const require = createRequire(import.meta.url);
const WordPOS = require(path.join(projectDir, "work/wordnet/node_modules/wordpos"));
const wordnetDb = require(path.join(projectDir, "work/wordnet/node_modules/wordnet-db"));
const wordpos = new WordPOS({ dictPath: wordnetDb.path });

globalThis.window = {};
await import("../corpus-data.js");
const cards = window.CORPUS_DATA;

const stats = new Map();
let cursor = 0;

async function lookupCard(card) {
  const queries = [card.term, card.term.replace(/[ -]+/g, "_")];
  let results = [];
  for (const query of [...new Set(queries)]) {
    results = await wordpos.lookup(query.toLowerCase());
    if (results.length) break;
  }
  for (const chapter of card.chapters) {
    const value = stats.get(chapter) || { total: 0, covered: 0, examples: 0 };
    value.total += 1;
    if (results.length) value.covered += 1;
    if (results.some((result) => result.exp?.length)) value.examples += 1;
    stats.set(chapter, value);
  }
}

async function worker() {
  while (cursor < cards.length) {
    const card = cards[cursor];
    cursor += 1;
    await lookupCard(card);
  }
}

await Promise.all(Array.from({ length: 8 }, () => worker()));
const rows = [...stats.entries()]
  .sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true }))
  .map(([chapter, value]) => ({ chapter, ...value, coverage: `${Math.round(value.covered / value.total * 100)}%` }));
console.table(rows);
console.log({
  total: cards.length,
  covered: rows.reduce((sum, row) => sum + row.covered, 0),
  chapterOccurrences: rows.reduce((sum, row) => sum + row.total, 0),
});

