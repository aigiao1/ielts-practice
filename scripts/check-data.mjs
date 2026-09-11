import assert from "node:assert/strict";

globalThis.window = {};
await import("../corpus-data.js");
await import("../sentence-translations.js");

const cards = window.CORPUS_DATA;
const meta = window.CORPUS_META;
const translations = window.SENTENCE_TRANSLATIONS;
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

assert.equal(cards.length, 4123, "去重题卡数量异常");
assert.equal(meta.uniqueCards, cards.length, "元数据题卡数量不一致");
assert.equal(meta.totalSourceEntries, 4479, "原始非空词条数量异常");
assert.equal(new Set(cards.map((card) => card.id)).size, cards.length, "题卡 ID 不唯一");
assert.equal(new Set(cards.map((card) => card.key)).size, cards.length, "题卡规范键不唯一");
assert.equal(Object.keys(translations).length, 1023, "精修句译文数量异常");
assert.ok(cards.filter((card) => card.curated).every((card) => translations[card.id]), "存在缺少完整中文译文的精修句");

for (const card of cards) {
  assert.ok(card.term, `${card.id} 缺少答案`);
  assert.match(card.sentence, /[.!?]$/, `${card.term} 的句子缺少结束标点`);
  assert.ok(card.cloze.includes("_____"), `${card.term} 的句子没有挖空`);
  assert.ok(card.chapters.length > 0, `${card.term} 缺少章节`);
  const exactAnswer = new RegExp(`(^|[^a-z])${escapeRegex(card.term)}([^a-z]|$)`, "i");
  assert.ok(!exactAnswer.test(card.cloze), `${card.term} 在挖空句中泄露答案`);
}

for (const [chapter, expected] of [["3.2", 143], ["3.3", 113], ["3.4", 112], ["3.5", 145], ["3.6", 113], ["3.7", 104], ["3.8", 152], ["3.9", 142]]) {
  const chapterCards = cards.filter((card) => card.chapters.includes(chapter));
  assert.equal(chapterCards.length, expected, `Ch${chapter} 题目数量异常`);
  assert.ok(chapterCards.every((card) => card.curated), `Ch${chapter} 存在未精修题目`);
  assert.ok(chapterCards.every((card) => card.quality === "curated"), `Ch${chapter} 存在非人工精修题目`);
  assert.equal(new Set(chapterCards.map((card) => card.sentence)).size, expected, `Ch${chapter} 存在完全重复的句子`);
  assert.ok(chapterCards.every((card) => !/(information about|pointed out|clearly mentioned)/i.test(card.sentence)), `Ch${chapter} 仍包含万能模板句`);
}

console.log(`PASS: ${cards.length} 张题卡，${meta.totalSourceEntries} 条原始记录，全部数据检查通过。`);
