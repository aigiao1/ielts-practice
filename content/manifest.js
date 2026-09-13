// 雅思内容包静态注册清单 (Content Pack Manifest)
// 此清单由 scripts/build-content-manifest.mjs 自动生成或校验，为全站内容包发现的单一可信源
(() => {
  "use strict";

  const CONTENT_MANIFEST = {
    version: "1.0.0",
    packs: [
    {
        "packId": "map-landmarks-v1",
        "name": "雅思听力地图题高频地标与设施词典",
        "path": "content/listening/map/map-landmarks-v1.js",
        "domain": "listening",
        "contentType": "map",
        "expectedCount": 60,
        "canonical": true,
        "status": "active"
    },
    {
        "packId": "map-routes-v1",
        "name": "雅思听力路线跟随矢量地图题库",
        "path": "content/listening/map/map-routes-v1.js",
        "domain": "listening",
        "contentType": "map",
        "expectedCount": 10,
        "canonical": true,
        "status": "active"
    },
    {
        "packId": "number-rules-v1",
        "name": "雅思听力Part 1数字/日期/时间/货币考点规则",
        "path": "content/listening/procedural/number-rules-v1.js",
        "domain": "listening",
        "contentType": "procedural_rules",
        "expectedCount": 6,
        "canonical": true,
        "status": "active"
    },
    {
        "packId": "option-scan-pool-v1",
        "name": "雅思听力长选项速读高频语义池",
        "path": "content/listening/option-scan/option-scan-pool-v1.js",
        "domain": "listening",
        "contentType": "option_scan",
        "expectedCount": 106,
        "canonical": true,
        "status": "active"
    },
    {
        "packId": "paraphrase-concepts-v1",
        "name": "雅思听力Section 2/3同义替换考点归纳",
        "path": "content/listening/paraphrase/paraphrase-concepts-v1.js",
        "domain": "listening",
        "contentType": "paraphrase",
        "expectedCount": 75,
        "canonical": true,
        "status": "active"
    },
    {
        "packId": "task1-rapid-legacy-v1",
        "name": "task1-rapid-data.js (早期154题历史快照)",
        "path": "content/writing/task1/task1-rapid-legacy-v1.js",
        "domain": "writing",
        "contentType": "task1",
        "expectedCount": 154,
        "canonical": false,
        "status": "disabled",
        "role": "legacy_snapshot"
    },
    {
        "packId": "task1-workbook-v1",
        "name": "task1-translation-workbook.md (140题标准训练册)",
        "path": "content/writing/task1/task1-workbook-v1.js",
        "domain": "writing",
        "contentType": "task1",
        "expectedCount": 140,
        "canonical": true,
        "status": "active"
    },
    {
        "packId": "trap-scenarios-v1",
        "name": "雅思听力Section 2/3高频转折陷阱题型归纳",
        "path": "content/listening/traps/trap-scenarios-v1.js",
        "domain": "listening",
        "contentType": "trap",
        "expectedCount": 10,
        "canonical": true,
        "status": "active"
    },
    {
        "packId": "wanglu-core-v1",
        "name": "王陆807雅思听力核心高频词",
        "path": "content/listening/words/wanglu-core-v1.js",
        "domain": "listening",
        "contentType": "word",
        "expectedCount": 305,
        "canonical": true,
        "status": "active"
    }
]
  };

  if (typeof window !== "undefined") {
    window.CONTENT_MANIFEST = CONTENT_MANIFEST;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = CONTENT_MANIFEST;
  }
})();
