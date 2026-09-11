import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.resolve(scriptDir, "..");
const projectDir = path.resolve(appDir, "..");
const csvPath = path.join(projectDir, "雅思王 雅思 听力 语料库.csv");
const referencePath = path.join(projectDir, "collocation-reference.md");
const outputPath = path.join(appDir, "corpus-data.js");
const curatedDir = path.join(appDir, "curated");

const normalize = (value) => value
  .trim()
  .toLowerCase()
  .replace(/[’‘]/g, "'")
  .replace(/\s+/g, " ");

const stableId = (key) => `wl-${createHash("sha1").update(key).digest("hex").slice(0, 12)}`;

function parseCsvLine(line) {
  const values = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"') {
      if (quoted && line[index + 1] === '"') {
        value += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === "," && !quoted) {
      values.push(value);
      value = "";
    } else {
      value += char;
    }
  }
  values.push(value);
  return values;
}

function parseReference(markdown) {
  const entries = new Map();
  let topic = "其他核心词汇";

  for (const line of markdown.split(/\r?\n/)) {
    const heading = line.match(/^##\s+\d+\.\s+(.+?)(?:\s+\([^)]*\))?\s+\(\d+词\)\s*$/);
    if (heading) {
      topic = heading[1].trim();
      continue;
    }

    const row = line.match(/^\|\s*\d+\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|$/);
    if (!row) continue;
    const [, term, chinese, chapter] = row;
    const key = normalize(term);
    if (!key) continue;

    const candidate = { topic, chinese: chinese.trim(), referenceChapter: chapter.trim() };
    const current = entries.get(key);
    if (!current || (!current.chinese && candidate.chinese) || current.topic === "其他核心词汇") {
      entries.set(key, candidate);
    }
  }
  return entries;
}

function loadCuratedTemplates(directory) {
  const templates = new Map();
  if (!fs.existsSync(directory)) return templates;

  for (const file of fs.readdirSync(directory).filter((name) => name.endsWith(".json")).sort()) {
    const values = JSON.parse(fs.readFileSync(path.join(directory, file), "utf8"));
    for (const [term, value] of Object.entries(values)) {
      const key = normalize(term);
      if (templates.has(key)) throw new Error(`精修句重复：${term}`);
      const entry = typeof value === "string"
        ? { sentence: value, quality: "curated" }
        : { sentence: value?.sentence, quality: value?.quality || "semantic" };
      const template = entry.sentence;
      if (typeof template !== "string" || (template.match(/\{\{term\}\}/g) || []).length !== 1) {
        throw new Error(`精修句必须包含且只包含一个 {{term}}：${term}`);
      }
      templates.set(key, entry);
    }
  }
  return templates;
}

function chapterForColumn(index, rawHeader) {
  if (index >= 0 && index <= 8) return rawHeader || `3.${index + 1}`;
  if (index >= 10 && index <= 13) return rawHeader || `4.${index - 9}`;
  if (index >= 15 && index <= 26) {
    const number = index - 14;
    return number === 10 ? "5.10" : `5.${number}`;
  }
  if (index >= 28 && index <= 31) return `11-${index - 27}`;
  return rawHeader || "其他";
}

const topicScenes = {
  "教育 & 学术": ["During the course briefing", "In the university office", "During the lecture"],
  "工作 & 就业": ["During the staff meeting", "At the job interview", "In the workplace briefing"],
  "健康 & 医疗": ["At the health centre", "During the medical appointment", "In the clinic"],
  "环境 & 气候": ["In the environmental report", "During the field study", "At the community meeting"],
  "科技 & 数字": ["During the technical demonstration", "At the support desk", "In the technology lecture"],
  "旅行 & 交通": ["At the travel information desk", "Before the journey", "During the transport announcement"],
  "犯罪 & 法律": ["During the safety briefing", "At the police station", "In the legal discussion"],
  "饮食 & 烹饪": ["At the café", "During the cooking class", "While discussing the menu"],
  "金融 & 银行": ["At the bank", "During the financial appointment", "While completing the payment form"],
  "住宅 & 建筑": ["During the property viewing", "At the accommodation office", "Before moving into the building"],
  "艺术 & 文化": ["During the museum tour", "At the cultural event", "In the arts programme"],
  "社会 & 人口": ["During the community survey", "In the social research report", "At the public meeting"],
  "媒体 & 传播": ["During the radio programme", "In the media report", "At the information session"],
  "体育 & 休闲": ["At the sports centre", "During the activity briefing", "At the leisure club"],
  "其他核心词汇": ["During the conversation", "At the information desk", "In the announcement"],
};

const verbStarts = new Set([
  "add", "apply", "arrive", "avoid", "book", "bring", "broaden", "build", "buy", "call", "cancel",
  "carry", "change", "check", "choose", "collect", "complete", "contact", "cook", "cover", "cross",
  "deliver", "describe", "develop", "do", "draw", "drink", "drive", "eat", "enter", "exercise", "fill",
  "find", "finish", "follow", "get", "give", "go", "hire", "hold", "improve", "include", "keep", "learn",
  "leave", "listen", "live", "lock", "lose", "maintain", "make", "meet", "move", "open", "order", "pay",
  "play", "prepare", "provide", "read", "receive", "record", "reduce", "register", "remember", "rent", "replace",
  "reserve", "return", "save", "send", "share", "show", "sign", "spend", "start", "study", "take", "teach",
  "travel", "turn", "use", "visit", "wait", "walk", "wash", "wear", "work", "write"
]);

const prepositionStarts = new Set([
  "at", "by", "during", "for", "from", "in", "into", "near", "of", "on", "over", "through", "to", "under", "with", "without"
]);

const adjectivePhrases = [
  /^free (?:of|for)/i, /^available /i, /^responsible for/i, /^suitable for/i, /^famous for/i,
  /^interested in/i, /^different from/i, /^similar to/i, /^close to/i, /^full of/i, /^aware of/i
];

const semanticFrames = [
  { pattern: /\b(?:fee|fees|cost|costs|price|prices|payment|payments|deposit|tax|insurance|discount|loan|budget|cash|credit)\b/i,
    template: "At the service desk, the clerk asked the customer to check {{term}} before paying." },
  { pattern: /\b(?:flight|train|railway|bus|taxi|car|vehicle|bicycle|bike|ferry|ferries|route|journey|trip|travel|transport|ticket|destination|airport|station|ride)\b/i,
    template: "Before the journey, the travel adviser asked us to check {{term}}." },
  { pattern: /\b(?:course|class|exam|examination|lecture|assignment|essay|student|students|tutor|teacher|faculty|campus|library|degree|research|study|school|college|university)\b/i,
    template: "During the course briefing, the tutor discussed {{term}} with the students." },
  { pattern: /\b(?:doctor|patient|clinic|hospital|medicine|medical|health|disease|illness|pain|treatment|therapy|blood|heart|injury|infection|vitamin|diet)\b/i,
    template: "At the health centre, the doctor discussed {{term}} with the patient." },
  { pattern: /\b(?:food|meal|meat|fish|fruit|juice|bread|milk|coffee|tea|oil|salad|vegetable|nuts|cooking|menu|restaurant|cafe|cafeteria)\b/i,
    template: "While discussing the menu, the waiter confirmed that {{term}} was available." },
  { pattern: /\b(?:house|housing|room|building|flat|apartment|garden|kitchen|bedroom|bathroom|floor|furniture|accommodation|entrance|door|window)\b/i,
    template: "During the property viewing, the landlord pointed out {{term}}." },
  { pattern: /\b(?:job|work|worker|staff|manager|employment|employer|employee|career|salary|office|company|business|training)\b/i,
    template: "During the staff meeting, the manager discussed {{term}} with the team." },
  { pattern: /\b(?:survey|report|data|sample|method|experiment|analysis|result|results|questionnaire|project|statistics|evidence)\b/i,
    template: "During the research meeting, the team recorded new information about {{term}}." },
  { pattern: /\b(?:environment|environmental|climate|weather|pollution|carbon|dioxide|energy|water|forest|soil|ocean|river|animal|animals|bird|birds|plant|plants|species|wildlife)\b/i,
    template: "During the field study, the guide explained how {{term}} affected the local area." },
  { pattern: /\b(?:computer|software|internet|website|online|digital|camera|video|telephone|phone|machine|engine|system|technology|equipment|electricity)\b/i,
    template: "During the demonstration, the technician showed us how {{term}} worked." },
  { pattern: /\b(?:form|card|letter|email|passport|certificate|document|address|name|number|receipt|application)\b/i,
    template: "At reception, the assistant asked me to provide {{term}}." },
  { pattern: /\b(?:sport|sports|football|tennis|swimming|climbing|riding|gym|exercise|game|games|club|fitness|skating)\b/i,
    template: "At the leisure centre, the instructor gave us safety advice about {{term}}." },
  { pattern: /\b(?:date|time|day|week|month|year|morning|afternoon|evening|night|deadline|duration|appointment|schedule|timetable)\b/i,
    template: "At reception, the assistant confirmed {{term}} for the booking." },
  { pattern: /\b(?:museum|park|hall|centre|center|shop|store|market|beach|mountain|island|road|street|bridge|map|location|area)\b/i,
    template: "During the tour, the guide showed us {{term}} on the map." },
  { pattern: /\b(?:shirt|shoes|clothes|clothing|fabric|leather|cotton|wool|size|colour|color)\b/i,
    template: "In the shop, the assistant showed the customer {{term}}." },
];

function stableChoice(items, key) {
  let hash = 0;
  for (const char of key) hash = ((hash << 5) - hash + char.charCodeAt(0)) | 0;
  return items[Math.abs(hash) % items.length];
}

function makeSentence(term, topic, chapters) {
  const scene = stableChoice(topicScenes[topic] || topicScenes["其他核心词汇"], term);
  const firstWord = normalize(term).split(/\s+/)[0].replace(/[^a-z'-]/g, "");
  const isAdjective = chapters.some((chapter) => /^4\.[123]$/.test(chapter));
  const isAdverb = chapters.some((chapter) => chapter === "4.4");

  const semanticFrame = semanticFrames.find(({ pattern }) => pattern.test(term));
  if (semanticFrame) return avoidAnswerLeak(semanticFrame.template, term);

  if (adjectivePhrases.some((pattern) => pattern.test(term))) {
    return avoidAnswerLeak(`${scene}, the adviser said the option was {{term}}.`, term);
  }
  if (prepositionStarts.has(firstWord)) {
    return avoidAnswerLeak(`${scene}, the speaker said the service would be available {{term}}.`, term);
  }
  if (verbStarts.has(firstWord)) {
    return avoidAnswerLeak(`${scene}, the adviser asked us to {{term}}.`, term);
  }
  if (isAdverb) {
    return avoidAnswerLeak(`${scene}, the speaker explained the procedure {{term}}.`, term);
  }
  if (isAdjective) {
    return avoidAnswerLeak(`${scene}, the lecturer described the option as {{term}}.`, term);
  }
  return avoidAnswerLeak(`${scene}, the speaker gave us information about {{term}}.`, term);
}

function avoidAnswerLeak(template, term) {
  const carrier = normalize(template.replace("{{term}}", ""));
  const answer = normalize(term).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (new RegExp(`(^|[^a-z])${answer}([^a-z]|$)`, "i").test(carrier)) {
    return "The recording clearly mentioned {{term}} during the conversation.";
  }
  return template;
}

const csv = fs.readFileSync(csvPath, "utf8");
const reference = parseReference(fs.readFileSync(referencePath, "utf8"));
const curatedTemplates = loadCuratedTemplates(curatedDir);
const rows = csv.split(/\r?\n/).filter((line) => line.length > 0).map(parseCsvLine);
const headers = rows[0];
const corpus = new Map();

for (let rowIndex = 3; rowIndex < rows.length; rowIndex += 1) {
  const row = rows[rowIndex];
  for (let columnIndex = 0; columnIndex < row.length; columnIndex += 1) {
    const term = row[columnIndex]?.trim();
    if (!term) continue;
    const key = normalize(term);
    const chapter = chapterForColumn(columnIndex, headers[columnIndex]?.trim());
    const existing = corpus.get(key);
    if (existing) {
      if (!existing.chapters.includes(chapter)) existing.chapters.push(chapter);
      existing.occurrences += 1;
      continue;
    }
    corpus.set(key, {
      id: stableId(key),
      term,
      key,
      chapters: [chapter],
      sourceRow: rowIndex + 1,
      occurrences: 1,
    });
  }
}

const cards = [...corpus.values()].map((item) => {
  const ref = reference.get(item.key) || {};
  const topic = ref.topic || "其他核心词汇";
  const curatedEntry = curatedTemplates.get(item.key);
  const sentenceTemplate = curatedEntry?.sentence || makeSentence(item.term, topic, item.chapters);
  return {
    ...item,
    topic,
    chinese: ref.chinese || "",
    curated: Boolean(curatedEntry),
    quality: curatedEntry?.quality || "template",
    sentence: sentenceTemplate.replace("{{term}}", item.term),
    cloze: sentenceTemplate.replace("{{term}}", "_____"),
  };
});

const metadata = {
  generatedAt: new Date().toISOString(),
  source: path.basename(csvPath),
  totalSourceEntries: cards.reduce((sum, card) => sum + card.occurrences, 0),
  uniqueCards: cards.length,
  translatedCards: cards.filter((card) => card.chinese).length,
  curatedCards: cards.filter((card) => card.curated).length,
  topics: [...new Set(cards.map((card) => card.topic))],
  chapters: [...new Set(cards.flatMap((card) => card.chapters))],
};

const payload = `// 由 scripts/build-data.mjs 根据原始 CSV 自动生成，请勿手工编辑。\nwindow.CORPUS_META = ${JSON.stringify(metadata, null, 2)};\nwindow.CORPUS_DATA = ${JSON.stringify(cards, null, 2)};\n`;
fs.writeFileSync(outputPath, payload, "utf8");
console.log(JSON.stringify(metadata, null, 2));
