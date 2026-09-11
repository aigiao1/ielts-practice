import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.resolve(scriptDir, "..");
const projectDir = path.resolve(appDir, "..");
const require = createRequire(import.meta.url);
const WordPOS = require(path.join(projectDir, "work/wordnet/node_modules/wordpos"));
const wordnetDb = require(path.join(projectDir, "work/wordnet/node_modules/wordnet-db"));
const wordpos = new WordPOS({ dictPath: wordnetDb.path });
const outputPath = path.join(appDir, "curated", "generated-after-3.2.json");

globalThis.window = {};
await import("../corpus-data.js");

const normalize = (value) => value.toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, " ").trim();
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const hash = (value) => [...value].reduce((total, char) => ((total << 5) - total + char.charCodeAt(0)) | 0, 0);
const choose = (items, key) => items[Math.abs(hash(key)) % items.length];
const lookupCache = new Map();

const topicKeywords = {
  "教育 & 学术": ["school", "student", "study", "teach", "course", "learn", "university", "academic", "book"],
  "工作 & 就业": ["work", "job", "employee", "business", "office", "profession", "occupation", "company"],
  "健康 & 医疗": ["health", "medical", "body", "disease", "patient", "doctor", "treatment", "medicine"],
  "环境 & 气候": ["environment", "weather", "climate", "animal", "plant", "earth", "water", "air"],
  "科技 & 数字": ["computer", "machine", "electronic", "technology", "data", "device", "internet"],
  "旅行 & 交通": ["travel", "vehicle", "journey", "road", "transport", "passenger", "place", "hotel"],
  "犯罪 & 法律": ["law", "crime", "police", "legal", "court", "offence", "punishment"],
  "饮食 & 烹饪": ["food", "eat", "drink", "cook", "meal", "fruit", "meat"],
  "金融 & 银行": ["money", "financial", "pay", "bank", "cost", "price", "business"],
  "住宅 & 建筑": ["building", "house", "room", "home", "construction", "furniture"],
  "艺术 & 文化": ["art", "music", "culture", "performance", "picture", "literature"],
  "社会 & 人口": ["people", "society", "population", "community", "social", "group"],
  "媒体 & 传播": ["information", "news", "communication", "write", "television", "radio"],
  "体育 & 休闲": ["sport", "game", "exercise", "play", "leisure", "activity"],
};
const topicFallback = {
  "教育 & 学术": "learning",
  "工作 & 就业": "work",
  "健康 & 医疗": "health",
  "环境 & 气候": "the natural world",
  "科技 & 数字": "technology",
  "旅行 & 交通": "travel",
  "犯罪 & 法律": "the law",
  "饮食 & 烹饪": "food",
  "金融 & 银行": "money",
  "住宅 & 建筑": "buildings",
  "艺术 & 文化": "culture",
  "社会 & 人口": "society",
  "媒体 & 传播": "communication",
  "体育 & 休闲": "leisure",
  "其他核心词汇": "the subject being discussed",
};

const verbStarts = new Set([
  "add", "apply", "arrive", "avoid", "book", "bring", "broaden", "build", "buy", "call", "cancel", "carry",
  "change", "check", "choose", "collect", "complete", "contact", "cook", "cover", "cross", "deliver", "describe",
  "develop", "do", "draw", "drink", "drive", "eat", "enter", "exercise", "fill", "find", "finish", "follow", "get",
  "give", "go", "hire", "hold", "improve", "include", "keep", "learn", "leave", "listen", "live", "lock", "lose",
  "maintain", "make", "meet", "move", "open", "order", "pay", "play", "prepare", "provide", "read", "receive",
  "record", "reduce", "register", "remember", "rent", "replace", "reserve", "return", "save", "send", "share", "show",
  "sign", "spend", "start", "study", "take", "teach", "travel", "turn", "use", "visit", "wait", "walk", "wash",
  "wear", "work", "write"
]);
const prepositions = new Set(["at", "by", "during", "for", "from", "in", "into", "near", "of", "on", "over", "through", "to", "under", "with", "without"]);
const stopWords = new Set(["a", "an", "the", "of", "for", "to", "and", "or", "in", "on", "at", "by", "with", "from", "one's"]);

function cleanDefinition(value) {
  return value
    .replace(/\s+/g, " ")
    .replace(/\s*;\s*$/, "")
    .replace(/^\(.*?\)\s*/, "")
    .trim()
    .replace(/[.;:]$/, "");
}

function safeDefinition(result, card) {
  let def = cleanDefinition(result.def || "");
  const exact = normalize(card.term).replace(/_/g, " ");
  const pattern = new RegExp(`\\b${escapeRegex(exact)}\\b`, "ig");
  if (!pattern.test(def)) return def;
  pattern.lastIndex = 0;
  const synonym = (result.synonyms || [])
    .map((value) => value.replace(/_/g, " "))
    .find((value) => normalize(value) !== exact && !new RegExp(`\\b${escapeRegex(exact)}\\b`, "i").test(value));
  return def.replace(pattern, synonym || topicFallback[card.topic] || topicFallback["其他核心词汇"]);
}

async function lookup(term) {
  const key = normalize(term);
  if (lookupCache.has(key)) return lookupCache.get(key);
  const variants = [key, key.replace(/[ -]+/g, "_"), key.replace(/-/g, "_")];
  let results = [];
  for (const variant of [...new Set(variants)]) {
    results = await wordpos.lookup(variant);
    if (results.length) break;
  }
  lookupCache.set(key, results);
  return results;
}

function preferredPos(card) {
  if (card.chapters.some((chapter) => /^3\./.test(chapter))) return "n";
  if (card.chapters.some((chapter) => chapter === "4.4")) return "r";
  if (card.chapters.some((chapter) => /^4\./.test(chapter))) return "a";
  const first = normalize(card.term).split(/\s+/)[0].replace(/[^a-z'-]/g, "");
  return verbStarts.has(first) ? "v" : "n";
}

function scoreResult(result, card) {
  const wanted = preferredPos(card);
  const def = cleanDefinition(result.def || "").toLowerCase();
  const exactTerm = normalize(card.term).replace(/_/g, " ");
  let score = 0;
  if (result.pos === wanted || (wanted === "a" && result.pos === "s")) score += 30;
  if ((result.synonyms || []).some((value) => normalize(value.replace(/_/g, " ")) === exactTerm)) score += 15;
  for (const keyword of topicKeywords[card.topic] || []) if (def.includes(keyword)) score += 3;
  if (def.split(/\s+/).length >= 4 && def.split(/\s+/).length <= 24) score += 5;
  if ((result.exp || []).length) score += 2;
  if (new RegExp(`\\b${escapeRegex(exactTerm)}\\b`, "i").test(def)) score -= 40;
  return score;
}

function replaceExampleTerm(example, result, card) {
  const candidates = [card.term, ...(result.synonyms || []).map((value) => value.replace(/_/g, " "))]
    .sort((a, b) => b.length - a.length);
  for (const candidate of candidates) {
    const pattern = new RegExp(`\\b${escapeRegex(candidate)}\\b`, "i");
    if (!pattern.test(example)) continue;
    const replaced = example.replace(pattern, "{{term}}");
    const remainder = replaced.replace("{{term}}", "");
    const answerLeak = new RegExp(`\\b${escapeRegex(card.term)}\\b`, "i").test(remainder);
    if ((replaced.match(/\{\{term\}\}/g) || []).length === 1 && !answerLeak) return replaced;
  }
  return null;
}

function finishSentence(value) {
  let sentence = value.replace(/\s+/g, " ").trim();
  sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
  if (!/[.!?]$/.test(sentence)) sentence += ".";
  return sentence;
}

function exampleSentence(results, card) {
  for (const result of results) {
    for (const example of result.exp || []) {
      const words = example.trim().split(/\s+/).length;
      if (words < 5 || words > 32) continue;
      const replaced = replaceExampleTerm(example, result, card);
      if (replaced) return finishSentence(replaced);
    }
  }
  return null;
}

function definitionSentence(result, card) {
  const def = result.safeDef || safeDefinition(result, card);
  const pos = result.pos;
  const frames = pos === "n" ? [
    `In this context, {{term}} means ${def}.`,
    `The glossary defines {{term}} as ${def}.`,
    `Here, {{term}} refers to ${def}.`,
    `The lecturer used {{term}} for ${def}.`,
    `For this exercise, {{term}} describes ${def}.`,
  ] : pos === "v" ? [
    `Here, to {{term}} means to ${def}.`,
    `The instruction uses {{term}} to mean ${def}.`,
    `In this situation, people {{term}} when they ${def}.`,
  ] : pos === "r" ? [
    `The action happens {{term}}, meaning ${def}.`,
    `The speaker uses {{term}} to mean ${def}.`,
    `The process is completed {{term}}, or ${def}.`,
  ] : [
    `The tutor described the result as {{term}}, meaning ${def}.`,
    `In this description, {{term}} means ${def}.`,
    `The option is {{term}} because it is ${def}.`,
    `The speaker uses {{term}} for something that is ${def}.`,
  ];
  return finishSentence(choose(frames, card.key));
}

async function bestTokenDefinition(token, pos = null) {
  const results = await lookup(token);
  const filtered = pos ? results.filter((result) => result.pos === pos || (pos === "a" && result.pos === "s")) : results;
  const candidate = (filtered.length ? filtered : results)
    .map((result) => cleanDefinition(result.def || ""))
    .find((def) => def && !new RegExp(`\\b${escapeRegex(token)}\\b`, "i").test(def));
  return candidate || "the activity or object described in the announcement";
}

function phraseParts(term) {
  const tokens = normalize(term).replace(/[()]/g, "").split(/[^a-z']+/).filter(Boolean);
  const content = tokens.filter((token) => !stopWords.has(token));
  const ofIndex = tokens.indexOf("of");
  let head = content.at(-1) || tokens.at(-1) || term;
  if (ofIndex > 0) head = tokens[ofIndex - 1];
  const modifiers = content.filter((token) => token !== head).slice(0, 2);
  return { tokens, head, modifiers };
}

function headFrame(head, clue, headDef, card) {
  const groups = [
    { re: /^(fee|cost|price|payment|deposit|tax|discount|fare|salary|pay)$/, frames: [
      `The amount charged for ${clue} is listed as {{term}}.`,
      `Before paying, customers should check {{term}}, the charge connected with ${clue}.`,
    ] },
    { re: /^(ticket|pass|card|certificate|letter|form|document|receipt|note|book|list)$/, frames: [
      `The document needed for ${clue} is called {{term}}.`,
      `Applicants use {{term}} when dealing with ${clue}.`,
    ] },
    { re: /^(room|area|centre|center|hall|office|building|station|park|museum|factory|shop|store|club|school|library|clinic)$/, frames: [
      `The place provided for ${clue} is known as {{term}}.`,
      `Visitors looking for ${clue} should go to {{term}}.`,
    ] },
    { re: /^(course|class|lesson|exam|test|lecture|study|research|training|education|degree|project|meeting)$/, frames: [
      `Students working on ${clue} take part in {{term}}.`,
      `The academic activity connected with ${clue} is described as {{term}}.`,
    ] },
    { re: /^(service|facilities|facility|equipment|system|supply|resources|resource|information|guidance|support|policy|programme|program)$/, frames: [
      `The organisation provides {{term}} to support ${clue}.`,
      `People dealing with ${clue} can use {{term}}.`,
    ] },
    { re: /^(food|meal|meat|drink|juice|oil|water|milk|bread|fruit|diet)$/, frames: [
      `The menu describes {{term}} as an option connected with ${clue}.`,
      `Customers asking for ${clue} can order {{term}}.`,
    ] },
    { re: /^(flight|train|bus|taxi|car|ride|route|road|bridge|driver|transport|trip|tour|journey)$/, frames: [
      `Travellers dealing with ${clue} can choose {{term}}.`,
      `The travel option associated with ${clue} is {{term}}.`,
    ] },
    { re: /^(company|manager|worker|driver|job|career|work|staff|industry|business)$/, frames: [
      `The workplace role connected with ${clue} is described as {{term}}.`,
      `During the job briefing, {{term}} was linked to ${clue}.`,
    ] },
    { re: /^(treatment|medicine|monitor|health|disease|problem|pain|care|therapy)$/, frames: [
      `At the clinic, {{term}} was discussed in relation to ${clue}.`,
      `The medical option connected with ${clue} is called {{term}}.`,
    ] },
    { re: /^(show|performance|music|opera|film|party|festival|activities|activity|sport|game|tour)$/, frames: [
      `The event organised around ${clue} is advertised as {{term}}.`,
      `Visitors interested in ${clue} can attend {{term}}.`,
    ] },
  ];
  const match = groups.find((group) => group.re.test(head));
  if (match) return finishSentence(choose(match.frames, card.key));
  const frames = [
    `In the glossary, {{term}} means ${headDef} connected with ${clue}.`,
    `The phrase {{term}} describes ${headDef} associated with ${clue}.`,
    `Here, {{term}} refers to ${headDef} used for ${clue}.`,
    `The speaker uses {{term}} for ${headDef} involving ${clue}.`,
  ];
  return finishSentence(choose(frames, card.key));
}

async function compositionalSentence(card) {
  const { tokens, head, modifiers } = phraseParts(card.term);
  const first = tokens[0] || "";
  const headDef = await bestTokenDefinition(head, "n");
  const modifierDefs = [];
  for (const modifier of modifiers) modifierDefs.push(await bestTokenDefinition(modifier));
  const clue = modifierDefs.length ? modifierDefs.join(" and ") : `the purpose described by ${headDef}`;

  if (prepositions.has(first)) {
    const object = tokens.filter((token) => !prepositions.has(token) && !stopWords.has(token)).at(-1) || head;
    const objectDef = await bestTokenDefinition(object, "n");
    return finishSentence(`The expression {{term}} describes a position or situation involving ${objectDef}.`);
  }
  if (verbStarts.has(first)) {
    const verbDef = await bestTokenDefinition(first, "v");
    return finishSentence(`The instruction {{term}} asks someone to ${verbDef} in relation to ${clue}.`);
  }
  return headFrame(head, clue, headDef, card);
}

async function generateCard(card) {
  const results = (await lookup(card.term)).sort((a, b) => scoreResult(b, card) - scoreResult(a, card));
  const ordered = results
    .map((result) => ({ ...result, safeDef: safeDefinition(result, card) }))
    .filter((result) => result.safeDef);
  const example = exampleSentence(ordered, card);
  let sentence;
  let source;
  if (example) {
    sentence = example;
    source = "wordnet-example";
  } else if (ordered.length) {
    sentence = definitionSentence(ordered[0], card);
    source = "wordnet-definition";
  } else {
    sentence = await compositionalSentence(card);
    source = "compositional-gloss";
  }
  return [card.key, { sentence, quality: "semantic", source }];
}

const targets = window.CORPUS_DATA.filter((card) => card.quality !== "curated" && card.chapters.some((chapter) => chapter !== "3.1"));
const output = {};
let cursor = 0;
let complete = 0;

async function worker() {
  while (cursor < targets.length) {
    const card = targets[cursor];
    cursor += 1;
    const [key, value] = await generateCard(card);
    output[key] = value;
    complete += 1;
    if (complete % 500 === 0) console.log(`Generated ${complete}/${targets.length}`);
  }
}

await Promise.all(Array.from({ length: 8 }, () => worker()));
const sortedOutput = Object.fromEntries(Object.entries(output).sort(([a], [b]) => a.localeCompare(b)));
fs.writeFileSync(outputPath, `${JSON.stringify(sortedOutput, null, 2)}\n`, "utf8");
console.log(`Wrote ${Object.keys(sortedOutput).length} semantic sentences to ${outputPath}`);
