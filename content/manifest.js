// 雅思内容包静态注册清单 (Content Pack Manifest)
// 此清单由 scripts/build-content-manifest.mjs 自动生成或校验，为全站内容包发现的单一可信源
(() => {
  "use strict";

  const CONTENT_MANIFEST = {
    version: "1.0.0",
    packs: [
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
