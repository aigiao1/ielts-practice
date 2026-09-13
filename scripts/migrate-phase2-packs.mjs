// 迁移 Phase 2 内容包：Option Scan、Trap Scenarios、Map Landmarks、Map Routes、Number Rules
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");

console.log("\n=======================================================");
console.log("📦 开始执行 Phase 2 Content Packs 迁移与标准化打包...");
console.log("=======================================================\n");

// 1. 迁移 Option Scan 96 语义短语包
const optScanPath = path.join(rootDir, "option-scan.js");
const optScanCode = fs.readFileSync(optScanPath, "utf8");
const poolMatch = optScanCode.match(/const OPTION_SEMANTIC_POOL\s*=\s*(\[[\s\S]*?\]);\s*let timerId/m);
if (!poolMatch) throw new Error("无法从 option-scan.js 解析 OPTION_SEMANTIC_POOL");

const rawOptionPool = eval(poolMatch[1]);
console.log(`✓ 成功提取 Option Scan 短语: ${rawOptionPool.length} 条`);

const optionScanPack = {
  packId: "option-scan-pool-v1",
  version: "1.0.0",
  domain: "listening",
  contentType: "option_scan",
  canonical: true,
  expectedCount: rawOptionPool.length,
  metadata: {
    sourceType: "human_curated",
    sourceRef: "雅思听力长选项速读高频语义池",
    origin: "bundled",
    reviewStatus: "imported",
    status: "active",
    tags: ["listening", "option_scan", "speed_reading"]
  },
  items: rawOptionPool.map((item, idx) => ({
    id: `opt-${String(idx + 1).padStart(3, "0")}`,
    text: item.text,
    keyword: item.keyword,
    tag: item.tag
  }))
};

const optFileContent = `// 雅思听力长选项速读高频语义池 (option-scan-pool-v1)
// 包含 96 条涵盖学术、生活、环境、管理等核心考点的选项短语
(() => {
  "use strict";

  const OPTION_SCAN_POOL_PACK_V1 = ${JSON.stringify(optionScanPack, null, 2)};

  if (typeof window !== "undefined") {
    window.OPTION_SCAN_POOL_PACK_V1 = OPTION_SCAN_POOL_PACK_V1;
    if (window.ContentRegistry) {
      window.ContentRegistry.registerPack(OPTION_SCAN_POOL_PACK_V1);
    } else {
      window._PRELOADED_PACKS = window._PRELOADED_PACKS || [];
      window._PRELOADED_PACKS.push(OPTION_SCAN_POOL_PACK_V1);
    }
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = OPTION_SCAN_POOL_PACK_V1;
  }
})();
`;

const optDir = path.join(rootDir, "content", "listening", "option-scan");
fs.mkdirSync(optDir, { recursive: true });
fs.writeFileSync(path.join(optDir, "option-scan-pool-v1.js"), optFileContent, "utf8");
console.log(`[Pack] 成功生成 option-scan-pool-v1.js (${optionScanPack.items.length} 条)`);

// 2. 迁移 Trap Scenarios 10 大转折陷阱场景
const trapFactoryPath = path.join(rootDir, "factory", "trap-factory.js");
const trapCode = fs.readFileSync(trapFactoryPath, "utf8");
const trapMatch = trapCode.match(/const TRAP_SCENARIOS\s*=\s*(\[[\s\S]*?\]);\s*class TrapFactory/m);
if (!trapMatch) throw new Error("无法从 trap-factory.js 解析 TRAP_SCENARIOS");

const rawTrapScenarios = eval(trapMatch[1]);
console.log(`✓ 成功提取 Trap Scenarios 场景: ${rawTrapScenarios.length} 个`);

const trapPack = {
  packId: "trap-scenarios-v1",
  version: "1.0.0",
  domain: "listening",
  contentType: "trap",
  canonical: true,
  expectedCount: rawTrapScenarios.length,
  metadata: {
    sourceType: "human_curated",
    sourceRef: "雅思听力Section 2/3高频转折陷阱题型归纳",
    origin: "bundled",
    reviewStatus: "imported",
    status: "active",
    tags: ["listening", "trap", "turnaround", "attention"]
  },
  items: rawTrapScenarios.map((s) => ({
    id: s.id,
    category: s.category,
    subject: s.subject,
    questionTpl: s.questionTpl,
    priorStarters: s.priorStarters,
    priorObjects: s.priorObjects,
    transitions: s.transitions,
    finalStarters: s.finalStarters,
    actualObjects: s.actualObjects,
    decoys: s.decoys,
    tip: s.tip
  }))
};

const trapFileContent = `// 雅思听力高频转折陷阱考点包 (trap-scenarios-v1)
// 包含 10 大核心转折场景模板（选址变更、时间改期、人员替换、价格阶梯等）
(() => {
  "use strict";

  const TRAP_SCENARIOS_PACK_V1 = ${JSON.stringify(trapPack, null, 2)};

  if (typeof window !== "undefined") {
    window.TRAP_SCENARIOS_PACK_V1 = TRAP_SCENARIOS_PACK_V1;
    if (window.ContentRegistry) {
      window.ContentRegistry.registerPack(TRAP_SCENARIOS_PACK_V1);
    } else {
      window._PRELOADED_PACKS = window._PRELOADED_PACKS || [];
      window._PRELOADED_PACKS.push(TRAP_SCENARIOS_PACK_V1);
    }
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = TRAP_SCENARIOS_PACK_V1;
  }
})();
`;

const trapDir = path.join(rootDir, "content", "listening", "traps");
fs.mkdirSync(trapDir, { recursive: true });
fs.writeFileSync(path.join(trapDir, "trap-scenarios-v1.js"), trapFileContent, "utf8");
console.log(`[Pack] 成功生成 trap-scenarios-v1.js (${trapPack.items.length} 场景)`);

// 3. 迁移 Map Landmarks 60 地标词汇包
const landmarksPath = path.join(rootDir, "map-data", "landmarks.js");
const landmarksCode = fs.readFileSync(landmarksPath, "utf8");
const lmMatch = landmarksCode.match(/const LANDMARKS\s*=\s*(\[[\s\S]*?\]);\s*window\.MAP_LANDMARKS_DATA/m);
if (!lmMatch) throw new Error("无法从 landmarks.js 解析 LANDMARKS");

const rawLandmarks = eval(lmMatch[1]);
console.log(`✓ 成功提取 Map Landmarks: ${rawLandmarks.length} 个`);

const mapLandmarksPack = {
  packId: "map-landmarks-v1",
  version: "1.0.0",
  domain: "listening",
  contentType: "map",
  subType: "landmark",
  canonical: true,
  expectedCount: rawLandmarks.length,
  metadata: {
    sourceType: "human_curated",
    sourceRef: "雅思听力地图题高频地标与设施词典",
    origin: "bundled",
    reviewStatus: "imported",
    status: "active",
    tags: ["listening", "map", "landmarks", "spatial"]
  },
  items: rawLandmarks.map((lm) => ({
    id: `lm-${lm.id}`,
    originalId: lm.id,
    term: lm.term,
    phonetic: lm.phonetic,
    chinese: lm.chinese,
    category: lm.category,
    indoor: lm.indoor
  }))
};

const lmFileContent = `// 雅思听力地图高频地标包 (map-landmarks-v1)
// 包含 60 个室内外设施、自然景观与交通地标词汇
(() => {
  "use strict";

  const MAP_LANDMARKS_PACK_V1 = ${JSON.stringify(mapLandmarksPack, null, 2)};

  if (typeof window !== "undefined") {
    window.MAP_LANDMARKS_PACK_V1 = MAP_LANDMARKS_PACK_V1;
    if (window.ContentRegistry) {
      window.ContentRegistry.registerPack(MAP_LANDMARKS_PACK_V1);
    } else {
      window._PRELOADED_PACKS = window._PRELOADED_PACKS || [];
      window._PRELOADED_PACKS.push(MAP_LANDMARKS_PACK_V1);
    }
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = MAP_LANDMARKS_PACK_V1;
  }
})();
`;

const mapDir = path.join(rootDir, "content", "listening", "map");
fs.mkdirSync(mapDir, { recursive: true });
fs.writeFileSync(path.join(mapDir, "map-landmarks-v1.js"), lmFileContent, "utf8");
console.log(`[Pack] 成功生成 map-landmarks-v1.js (${mapLandmarksPack.items.length} 地标)`);

// 4. 迁移 Map Routes 10 套矢量地图场景包
const routesPath = path.join(rootDir, "map-data", "route-scenarios.js");
const routesCode = fs.readFileSync(routesPath, "utf8");
const routesMatch = routesCode.match(/const ROUTE_MAPS\s*=\s*(\[[\s\S]*?\]);\s*window\.MAP_ROUTE_MAPS_DATA/m);
if (!routesMatch) throw new Error("无法从 route-scenarios.js 解析 ROUTE_MAPS");

const rawRoutes = eval(routesMatch[1]);
console.log(`✓ 成功提取 Map Route Scenarios: ${rawRoutes.length} 个地图`);

const mapRoutesPack = {
  packId: "map-routes-v1",
  version: "1.0.0",
  domain: "listening",
  contentType: "map",
  subType: "route_scenario",
  canonical: true,
  expectedCount: rawRoutes.length,
  metadata: {
    sourceType: "human_curated",
    sourceRef: "雅思听力路线跟随矢量地图题库",
    origin: "bundled",
    reviewStatus: "imported",
    status: "active",
    tags: ["listening", "map", "routes", "tracking"]
  },
  items: rawRoutes.map((m) => ({
    id: m.id,
    title: m.title,
    context: m.context,
    mapWidth: m.mapWidth,
    mapHeight: m.mapHeight,
    startPoint: m.startPoint,
    svgFeatures: m.svgFeatures,
    candidatePositions: m.candidatePositions,
    routes: m.routes
  }))
};

const routeFileContent = `// 雅思听力全矢量路线地图场景包 (map-routes-v1)
// 包含 10 套全矢量地图场景与 30+ 条跟随导览路线
(() => {
  "use strict";

  const MAP_ROUTES_PACK_V1 = ${JSON.stringify(mapRoutesPack, null, 2)};

  if (typeof window !== "undefined") {
    window.MAP_ROUTES_PACK_V1 = MAP_ROUTES_PACK_V1;
    if (window.ContentRegistry) {
      window.ContentRegistry.registerPack(MAP_ROUTES_PACK_V1);
    } else {
      window._PRELOADED_PACKS = window._PRELOADED_PACKS || [];
      window._PRELOADED_PACKS.push(MAP_ROUTES_PACK_V1);
    }
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = MAP_ROUTES_PACK_V1;
  }
})();
`;

fs.writeFileSync(path.join(mapDir, "map-routes-v1.js"), routeFileContent, "utf8");
console.log(`[Pack] 成功生成 map-routes-v1.js (${mapRoutesPack.items.length} 套场景)`);

// 5. 生成 Procedural Number & Date 规则参数包
const numberRulesPack = {
  packId: "number-rules-v1",
  version: "1.0.0",
  domain: "listening",
  contentType: "procedural_rules",
  canonical: true,
  expectedCount: 6,
  metadata: {
    sourceType: "procedural",
    sourceRef: "雅思听力Part 1数字/日期/时间/货币考点规则",
    origin: "bundled",
    reviewStatus: "verified",
    status: "active",
    tags: ["listening", "procedural", "number_date"]
  },
  items: [
    { id: "rule-teen-ty", name: "-teen vs -ty 混淆辨析", category: "teen_ty", difficulty: 2 },
    { id: "rule-dates", name: "英式日月与年份", category: "date", difficulty: 2 },
    { id: "rule-times", name: "时间与钟点表达", category: "time", difficulty: 1 },
    { id: "rule-money", name: "英镑/美元价格与小数", category: "money", difficulty: 2 },
    { id: "rule-phone-postcode", name: "电话连读与英式邮编", category: "phone_code", difficulty: 3 },
    { id: "rule-large-numbers", name: "十万/百万级大数与逗号", category: "large_number", difficulty: 3 }
  ]
};

const numberRulesFileContent = `// 雅思听力数字/日期/时间/货币规则参数包 (number-rules-v1)
(() => {
  "use strict";

  const NUMBER_RULES_PACK_V1 = ${JSON.stringify(numberRulesPack, null, 2)};

  if (typeof window !== "undefined") {
    window.NUMBER_RULES_PACK_V1 = NUMBER_RULES_PACK_V1;
    if (window.ContentRegistry) {
      window.ContentRegistry.registerPack(NUMBER_RULES_PACK_V1);
    } else {
      window._PRELOADED_PACKS = window._PRELOADED_PACKS || [];
      window._PRELOADED_PACKS.push(NUMBER_RULES_PACK_V1);
    }
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = NUMBER_RULES_PACK_V1;
  }
})();
`;

const procDir = path.join(rootDir, "content", "listening", "procedural");
fs.mkdirSync(procDir, { recursive: true });
fs.writeFileSync(path.join(procDir, "number-rules-v1.js"), numberRulesFileContent, "utf8");
console.log(`[Pack] 成功生成 number-rules-v1.js (${numberRulesPack.items.length} 规则项)`);

console.log("\n🎉 全部 Phase 2 数据包生成完毕！");
