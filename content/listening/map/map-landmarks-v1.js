// 雅思听力地图高频地标包 (map-landmarks-v1)
// 包含 60 个室内外设施、自然景观与交通地标词汇
(() => {
  "use strict";

  const MAP_LANDMARKS_PACK_V1 = {
  "packId": "map-landmarks-v1",
  "version": "1.0.0",
  "domain": "listening",
  "contentType": "map",
  "subType": "landmark",
  "canonical": true,
  "expectedCount": 60,
  "metadata": {
    "sourceType": "human_curated",
    "sourceRef": "雅思听力地图题高频地标与设施词典",
    "origin": "bundled",
    "reviewStatus": "imported",
    "status": "active",
    "tags": [
      "listening",
      "map",
      "landmarks",
      "spatial"
    ]
  },
  "items": [
    {
      "id": "lm-library",
      "originalId": "library",
      "term": "Library",
      "phonetic": "/ˈlaɪbrəri/",
      "chinese": "图书馆",
      "category": "building",
      "indoor": true
    },
    {
      "id": "lm-museum",
      "originalId": "museum",
      "term": "Museum",
      "phonetic": "/mjuˈziːəm/",
      "chinese": "博物馆",
      "category": "building",
      "indoor": true
    },
    {
      "id": "lm-community_hall",
      "originalId": "community_hall",
      "term": "Community Hall",
      "phonetic": "/kəˈmjuːnəti hɔːl/",
      "chinese": "社区大礼堂",
      "category": "building",
      "indoor": true
    },
    {
      "id": "lm-visitor_centre",
      "originalId": "visitor_centre",
      "term": "Visitor Centre",
      "phonetic": "/ˈvɪzɪtə ˈsentə/",
      "chinese": "游客服务中心",
      "category": "facility",
      "indoor": true
    },
    {
      "id": "lm-ticket_office",
      "originalId": "ticket_office",
      "term": "Ticket Office",
      "phonetic": "/ˈtɪkɪt ˈɒfɪs/",
      "chinese": "售票处",
      "category": "facility",
      "indoor": true
    },
    {
      "id": "lm-car_park",
      "originalId": "car_park",
      "term": "Car Park",
      "phonetic": "/ˈkɑː pɑːk/",
      "chinese": "停车场",
      "category": "facility",
      "indoor": false
    },
    {
      "id": "lm-lake",
      "originalId": "lake",
      "term": "Lake",
      "phonetic": "/leɪk/",
      "chinese": "人工湖 / 湖泊",
      "category": "water",
      "indoor": false
    },
    {
      "id": "lm-river",
      "originalId": "river",
      "term": "River",
      "phonetic": "/ˈrɪvə/",
      "chinese": "河流 / 溪流",
      "category": "water",
      "indoor": false
    },
    {
      "id": "lm-bridge",
      "originalId": "bridge",
      "term": "Bridge",
      "phonetic": "/brɪdʒ/",
      "chinese": "桥梁 / 木桥",
      "category": "traffic",
      "indoor": false
    },
    {
      "id": "lm-trees",
      "originalId": "trees",
      "term": "Pine Trees",
      "phonetic": "/paɪn triːz/",
      "chinese": "松树林 / 树林",
      "category": "nature",
      "indoor": false
    },
    {
      "id": "lm-playground",
      "originalId": "playground",
      "term": "Playground",
      "phonetic": "/ˈpleɪɡraʊnd/",
      "chinese": "儿童游乐场",
      "category": "facility",
      "indoor": false
    },
    {
      "id": "lm-factory",
      "originalId": "factory",
      "term": "Factory",
      "phonetic": "/ˈfæktri/",
      "chinese": "工厂厂房",
      "category": "building",
      "indoor": true
    },
    {
      "id": "lm-warehouse",
      "originalId": "warehouse",
      "term": "Warehouse",
      "phonetic": "/ˈweəhaʊs/",
      "chinese": "仓储库房",
      "category": "building",
      "indoor": true
    },
    {
      "id": "lm-barn",
      "originalId": "barn",
      "term": "Barn",
      "phonetic": "/bɑːn/",
      "chinese": "大谷仓",
      "category": "building",
      "indoor": true
    },
    {
      "id": "lm-orchard",
      "originalId": "orchard",
      "term": "Orchard",
      "phonetic": "/ˈɔːtʃəd/",
      "chinese": "果园",
      "category": "nature",
      "indoor": false
    },
    {
      "id": "lm-garden",
      "originalId": "garden",
      "term": "Rose Garden",
      "phonetic": "/rəʊz ˈɡɑːdn/",
      "chinese": "玫瑰花园",
      "category": "nature",
      "indoor": false
    },
    {
      "id": "lm-pond",
      "originalId": "pond",
      "term": "Pond",
      "phonetic": "/pɒnd/",
      "chinese": "池塘 / 水塘",
      "category": "water",
      "indoor": false
    },
    {
      "id": "lm-reception",
      "originalId": "reception",
      "term": "Reception",
      "phonetic": "/rɪˈsepʃn/",
      "chinese": "接待处 / 前台大厅",
      "category": "building",
      "indoor": true
    },
    {
      "id": "lm-cloakroom",
      "originalId": "cloakroom",
      "term": "Cloakroom",
      "phonetic": "/ˈkləʊkrʊm/",
      "chinese": "衣帽寄存间",
      "category": "facility",
      "indoor": true
    },
    {
      "id": "lm-exhibition_hall",
      "originalId": "exhibition_hall",
      "term": "Exhibition Hall",
      "phonetic": "/ˌeksɪˈbɪʃn hɔːl/",
      "chinese": "主展览大厅",
      "category": "building",
      "indoor": true
    },
    {
      "id": "lm-education_centre",
      "originalId": "education_centre",
      "term": "Education Centre",
      "phonetic": "/ˌedʒuˈkeɪʃn ˈsentə/",
      "chinese": "教育研习中心",
      "category": "building",
      "indoor": true
    },
    {
      "id": "lm-cafe",
      "originalId": "cafe",
      "term": "Café",
      "phonetic": "/ˈkæfeɪ/",
      "chinese": "咖啡馆 / 茶座",
      "category": "facility",
      "indoor": true
    },
    {
      "id": "lm-shop",
      "originalId": "shop",
      "term": "Gift Shop",
      "phonetic": "/ɡɪft ʃɒp/",
      "chinese": "礼品商店",
      "category": "facility",
      "indoor": true
    },
    {
      "id": "lm-entrance",
      "originalId": "entrance",
      "term": "Main Entrance",
      "phonetic": "/meɪn ˈentrəns/",
      "chinese": "主出入口",
      "category": "access",
      "indoor": false
    },
    {
      "id": "lm-gate",
      "originalId": "gate",
      "term": "South Gate",
      "phonetic": "/saʊθ ɡeɪt/",
      "chinese": "南门 / 入口铁门",
      "category": "access",
      "indoor": false
    },
    {
      "id": "lm-railway",
      "originalId": "railway",
      "term": "Railway Track",
      "phonetic": "/ˈreɪlweɪ træk/",
      "chinese": "铁轨 / 铁路线",
      "category": "traffic",
      "indoor": false
    },
    {
      "id": "lm-platform",
      "originalId": "platform",
      "term": "Platform",
      "phonetic": "/ˈplætfɔːm/",
      "chinese": "月台 / 乘车平台",
      "category": "traffic",
      "indoor": false
    },
    {
      "id": "lm-sports_field",
      "originalId": "sports_field",
      "term": "Sports Field",
      "phonetic": "/spɔːts fiːld/",
      "chinese": "户外运动场 / 草坪运动区",
      "category": "facility",
      "indoor": false
    },
    {
      "id": "lm-fountain",
      "originalId": "fountain",
      "term": "Central Fountain",
      "phonetic": "/ˈfəʊntɪn/",
      "chinese": "中央喷泉",
      "category": "nature",
      "indoor": false
    },
    {
      "id": "lm-greenhouse",
      "originalId": "greenhouse",
      "term": "Greenhouse",
      "phonetic": "/ˈɡriːnhaʊs/",
      "chinese": "温室花房",
      "category": "building",
      "indoor": true
    },
    {
      "id": "lm-maze",
      "originalId": "maze",
      "term": "Hedge Maze",
      "phonetic": "/hedʒ meɪz/",
      "chinese": "树篱迷宫",
      "category": "nature",
      "indoor": false
    },
    {
      "id": "lm-smithy",
      "originalId": "smithy",
      "term": "Smithy",
      "phonetic": "/ˈsmɪði/",
      "chinese": "铁匠铺 / 锻造房",
      "category": "building",
      "indoor": true
    },
    {
      "id": "lm-stables",
      "originalId": "stables",
      "term": "Horse Stables",
      "phonetic": "/hɔːs ˈsteɪblz/",
      "chinese": "马厩",
      "category": "building",
      "indoor": true
    },
    {
      "id": "lm-campsite",
      "originalId": "campsite",
      "term": "Campsite",
      "phonetic": "/ˈkæmpsaɪt/",
      "chinese": "露营帐篷营地",
      "category": "facility",
      "indoor": false
    },
    {
      "id": "lm-pavilion",
      "originalId": "pavilion",
      "term": "Band Pavilion",
      "phonetic": "/pəˈvɪljən/",
      "chinese": "凉亭 / 露天乐坛",
      "category": "facility",
      "indoor": false
    },
    {
      "id": "lm-footbridge",
      "originalId": "footbridge",
      "term": "Footbridge",
      "phonetic": "/ˈfʊtbrɪdʒ/",
      "chinese": "步行桥 / 观景木人行桥",
      "category": "traffic",
      "indoor": false
    },
    {
      "id": "lm-aviary",
      "originalId": "aviary",
      "term": "Bird Aviary",
      "phonetic": "/ˈeɪviəri/",
      "chinese": "大型观鸟鸟舍",
      "category": "facility",
      "indoor": true
    },
    {
      "id": "lm-boathouse",
      "originalId": "boathouse",
      "term": "Boathouse",
      "phonetic": "/ˈbəʊthaʊs/",
      "chinese": "游艇码头船库",
      "category": "water",
      "indoor": true
    },
    {
      "id": "lm-picnic_shelter",
      "originalId": "picnic_shelter",
      "term": "Picnic Shelter",
      "phonetic": "/ˈpɪknɪk ˈʃeltə/",
      "chinese": "遮阳野餐凉亭",
      "category": "facility",
      "indoor": false
    },
    {
      "id": "lm-viewing_platform",
      "originalId": "viewing_platform",
      "term": "Viewing Platform",
      "phonetic": "/ˈvjuːɪŋ ˈplætfɔːm/",
      "chinese": "高架观景展望台",
      "category": "facility",
      "indoor": false
    },
    {
      "id": "lm-windmill",
      "originalId": "windmill",
      "term": "Historic Windmill",
      "phonetic": "/hɪˈstɒrɪk ˈwɪndmɪl/",
      "chinese": "历史风车磨坊",
      "category": "building",
      "indoor": true
    },
    {
      "id": "lm-watermill",
      "originalId": "watermill",
      "term": "Old Watermill",
      "phonetic": "/əʊld ˈwɔːtəmɪl/",
      "chinese": "水力磨坊木屋",
      "category": "building",
      "indoor": true
    },
    {
      "id": "lm-herb_garden",
      "originalId": "herb_garden",
      "term": "Medicinal Herb Garden",
      "phonetic": "/mɪˈdɪsnl hɜːb ˈɡɑːdn/",
      "chinese": "药用草本植物园",
      "category": "nature",
      "indoor": false
    },
    {
      "id": "lm-courtyard",
      "originalId": "courtyard",
      "term": "Central Courtyard",
      "phonetic": "/ˈsentrəl ˈkɔːtjɑːd/",
      "chinese": "建筑中央内庭院",
      "category": "facility",
      "indoor": false
    },
    {
      "id": "lm-atrium",
      "originalId": "atrium",
      "term": "Glass Atrium",
      "phonetic": "/ɡlɑːs ˈeɪtriəm/",
      "chinese": "采光玻璃中庭大厅",
      "category": "building",
      "indoor": true
    },
    {
      "id": "lm-lecture_theatre",
      "originalId": "lecture_theatre",
      "term": "Main Lecture Theatre",
      "phonetic": "/meɪn ˈlektʃə ˈθɪətə/",
      "chinese": "主阶梯大讲堂",
      "category": "building",
      "indoor": true
    },
    {
      "id": "lm-seminar_room",
      "originalId": "seminar_room",
      "term": "Seminar Room",
      "phonetic": "/ˈsemɪnɑː rʊm/",
      "chinese": "研讨辅导教室",
      "category": "building",
      "indoor": true
    },
    {
      "id": "lm-pottery_workshop",
      "originalId": "pottery_workshop",
      "term": "Pottery Studio",
      "phonetic": "/ˈpɒtəri ˈstjuːdiəʊ/",
      "chinese": "陶艺手工作坊",
      "category": "building",
      "indoor": true
    },
    {
      "id": "lm-bicycle_shed",
      "originalId": "bicycle_shed",
      "term": "Covered Bicycle Shed",
      "phonetic": "/ˈkʌvəd ˈbaɪsɪkl ʃed/",
      "chinese": "带棚自行车存放处",
      "category": "facility",
      "indoor": false
    },
    {
      "id": "lm-conservatory",
      "originalId": "conservatory",
      "term": "Tropical Conservatory",
      "phonetic": "/ˈtrɒpɪkl kənˈsɜːvətri/",
      "chinese": "热带植物保温暖房",
      "category": "building",
      "indoor": true
    },
    {
      "id": "lm-aquarium",
      "originalId": "aquarium",
      "term": "Marine Aquarium",
      "phonetic": "/məˈriːn əˈkweəriəm/",
      "chinese": "海洋生物水族馆",
      "category": "building",
      "indoor": true
    },
    {
      "id": "lm-observatory",
      "originalId": "observatory",
      "term": "Astronomical Observatory",
      "phonetic": "/ˌæstrəˈnɒmɪkl əbˈzɜːvətri/",
      "chinese": "圆顶天文观测台",
      "category": "building",
      "indoor": true
    },
    {
      "id": "lm-statue",
      "originalId": "statue",
      "term": "Bronze Founder's Statue",
      "phonetic": "/brɒnz ˈfaʊndəz ˈstætʃuː/",
      "chinese": "先驱者青铜纪念像",
      "category": "nature",
      "indoor": false
    },
    {
      "id": "lm-amphitheatre",
      "originalId": "amphitheatre",
      "term": "Open-Air Amphitheatre",
      "phonetic": "/ˌəʊpən ˈeər ˈæmfɪθɪətə/",
      "chinese": "露天半圆阶梯剧场",
      "category": "facility",
      "indoor": false
    },
    {
      "id": "lm-clock_tower",
      "originalId": "clock_tower",
      "term": "Central Clock Tower",
      "phonetic": "/ˈsentrəl klɒk ˈtaʊə/",
      "chinese": "园区中央大钟楼",
      "category": "building",
      "indoor": true
    },
    {
      "id": "lm-first_aid",
      "originalId": "first_aid",
      "term": "First Aid Station",
      "phonetic": "/fɜːst eɪd ˈsteɪʃn/",
      "chinese": "红十字急救医务站",
      "category": "facility",
      "indoor": true
    },
    {
      "id": "lm-information_kiosk",
      "originalId": "information_kiosk",
      "term": "Information Kiosk",
      "phonetic": "/ˌɪnfəˈmeɪʃn ˈkiːɒsk/",
      "chinese": "电子触摸问询服务亭",
      "category": "facility",
      "indoor": false
    },
    {
      "id": "lm-wildflower_meadow",
      "originalId": "wildflower_meadow",
      "term": "Wildflower Meadow",
      "phonetic": "/ˈwaɪldflaʊə ˈmedəʊ/",
      "chinese": "野花生态保育草甸",
      "category": "nature",
      "indoor": false
    },
    {
      "id": "lm-bee_hives",
      "originalId": "bee_hives",
      "term": "Apiary Bee Hives",
      "phonetic": "/ˈeɪpiəri biː haɪvz/",
      "chinese": "养蜂科普蜂箱区",
      "category": "nature",
      "indoor": false
    },
    {
      "id": "lm-sculpture_walk",
      "originalId": "sculpture_walk",
      "term": "Sculpture Promenade",
      "phonetic": "/ˈskʌlptʃə ˌprɒməˈnɑːd/",
      "chinese": "当代艺术雕塑林荫道",
      "category": "nature",
      "indoor": false
    }
  ]
};

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
