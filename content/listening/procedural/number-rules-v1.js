// 雅思听力数字/日期/时间/货币规则参数包 (number-rules-v1)
(() => {
  "use strict";

  const NUMBER_RULES_PACK_V1 = {
  "packId": "number-rules-v1",
  "version": "1.0.0",
  "domain": "listening",
  "contentType": "procedural_rules",
  "canonical": true,
  "expectedCount": 6,
  "metadata": {
    "sourceType": "procedural",
    "sourceRef": "雅思听力Part 1数字/日期/时间/货币考点规则",
    "origin": "bundled",
    "reviewStatus": "verified",
    "status": "active",
    "tags": [
      "listening",
      "procedural",
      "number_date"
    ]
  },
  "items": [
    {
      "id": "rule-teen-ty",
      "name": "-teen vs -ty 混淆辨析",
      "category": "teen_ty",
      "difficulty": 2
    },
    {
      "id": "rule-dates",
      "name": "英式日月与年份",
      "category": "date",
      "difficulty": 2
    },
    {
      "id": "rule-times",
      "name": "时间与钟点表达",
      "category": "time",
      "difficulty": 1
    },
    {
      "id": "rule-money",
      "name": "英镑/美元价格与小数",
      "category": "money",
      "difficulty": 2
    },
    {
      "id": "rule-phone-postcode",
      "name": "电话连读与英式邮编",
      "category": "phone_code",
      "difficulty": 3
    },
    {
      "id": "rule-large-numbers",
      "name": "十万/百万级大数与逗号",
      "category": "large_number",
      "difficulty": 3
    }
  ]
};

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
