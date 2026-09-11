// 雅思听力方位表达模板与生成规则库 (Direction & Orientation Templates)
(() => {
  "use strict";

  // 16+ 核心方位表达配置
  const DIRECTION_EXPRESSIONS = [
    {
      id: "to_the_left_of",
      phrase: "to the left of",
      phraseCn: "在……的左侧（西侧）",
      targetSlot: "west",
      requiresNorth: false,
      sentenceTemplates: [
        "The {target} is located directly to the left of the {center}.",
        "If you look to the left of the {center}, you will see the {target}.",
        "You will find the {target} just to the left of the {center}."
      ],
      explanation: "面对地图，'to the left of' 指以 {center} 为基准的左手方向（对应位置 {letter}）。"
    },
    {
      id: "to_the_right_of",
      phrase: "to the right of",
      phraseCn: "在……的右侧（东侧）",
      targetSlot: "east",
      requiresNorth: false,
      sentenceTemplates: [
        "The {target} is situated to the right of the {center}.",
        "Just to the right of the {center} is the {target}.",
        "You can find the {target} immediately to the right of the {center}."
      ],
      explanation: "以 {center} 为基准，'to the right of' 指右侧位置（对应字母 {letter}）。"
    },
    {
      id: "directly_north_of",
      phrase: "directly north of",
      phraseCn: "在……的正北面",
      targetSlot: "north",
      requiresNorth: true,
      sentenceTemplates: [
        "The {target} can be found directly north of the {center}.",
        "Head straight up; the {target} is just north of the {center}.",
        "Positioned directly north of the {center} is the new {target}."
      ],
      explanation: "查看右上角指南针，North（正北）指向地图上方，因此位于 {center} 正上方的候选点是 {letter}。"
    },
    {
      id: "south_of",
      phrase: "just south of",
      phraseCn: "在……的正南面（下方）",
      targetSlot: "south",
      requiresNorth: true,
      sentenceTemplates: [
        "The {target} is situated just south of the {center}.",
        "Directly south of the {center}, you'll find the {target}.",
        "The {target} lies immediately south of the {center}."
      ],
      explanation: "根据指南针，South 指地图下方，位于 {center} 正下方的位置是 {letter}。"
    },
    {
      id: "east_of",
      phrase: "to the east of",
      phraseCn: "在……的正东面",
      targetSlot: "east",
      requiresNorth: true,
      sentenceTemplates: [
        "The {target} is located directly to the east of the {center}.",
        "Further to the east of the {center} stands the {target}.",
        "You will come across the {target} just east of the {center}."
      ],
      explanation: "根据上北下南左西右东，East（东面）指向右侧，位于 {center} 右侧的是 {letter}。"
    },
    {
      id: "west_of",
      phrase: "to the west of",
      phraseCn: "在……的正西面",
      targetSlot: "west",
      requiresNorth: true,
      sentenceTemplates: [
        "The {target} is situated to the west of the {center}.",
        "Just to the west of the {center}, you will see the {target}.",
        "Directly west of the {center} is where they built the {target}."
      ],
      explanation: "West（西面）指向地图左侧，位于 {center} 正西侧的是 {letter}。"
    },
    {
      id: "northeast_of",
      phrase: "to the northeast of",
      phraseCn: "在……的东北方向（右上）",
      targetSlot: "northeast",
      requiresNorth: true,
      sentenceTemplates: [
        "The {target} lies to the northeast of the {center}.",
        "In the area to the northeast of the {center}, you will spot the {target}.",
        "The {target} is positioned just northeast of the {center}."
      ],
      explanation: "Northeast（东北）位于北（上）与东（右）之间，即右上角位置 {letter}。"
    },
    {
      id: "northwest_of",
      phrase: "to the northwest of",
      phraseCn: "在……的西北方向（左上）",
      targetSlot: "northwest",
      requiresNorth: true,
      sentenceTemplates: [
        "The {target} is located to the northwest of the {center}.",
        "Looking to the northwest of the {center}, there is the {target}.",
        "Directly northwest of the {center} stands the {target}."
      ],
      explanation: "Northwest（西北）位于北（上）与西（左）之间，即左上角位置 {letter}。"
    },
    {
      id: "southeast_of",
      phrase: "in the southeast area of",
      phraseCn: "在……的东南方向（右下）",
      targetSlot: "southeast",
      requiresNorth: true,
      sentenceTemplates: [
        "The {target} is situated to the southeast of the {center}.",
        "Down to the southeast of the {center}, you'll find the {target}.",
        "The {target} is located in the southeast corner relative to the {center}."
      ],
      explanation: "Southeast（东南）指右下角方位，相对 {center} 位于右下方的是 {letter}。"
    },
    {
      id: "southwest_of",
      phrase: "in the southwest corner of",
      phraseCn: "在……的西南方位（左下）",
      targetSlot: "southwest",
      requiresNorth: true,
      sentenceTemplates: [
        "The {target} is positioned to the southwest of the {center}.",
        "Down in the southwest area of the {center}, that is where the {target} is.",
        "To the southwest of the {center}, you will see the {target}."
      ],
      explanation: "Southwest（西南）指左下角方位，相对 {center} 位于左下方的是 {letter}。"
    },
    {
      id: "opposite_across_path",
      phrase: "opposite across the path from",
      phraseCn: "在……正对面（隔路相望）",
      targetSlot: "south",
      requiresNorth: false,
      sentenceTemplates: [
        "The {target} is located directly opposite the {center}, across the pathway.",
        "Right across the main path from the {center}, you will find the {target}.",
        "Opposite the {center} on the other side of the road is the {target}."
      ],
      explanation: "'Opposite' 表示正对面。隔着道路与 {center} 面对面的正是位置 {letter}。"
    },
    {
      id: "adjacent_next_to",
      phrase: "immediately next to",
      phraseCn: "紧挨着 / 紧邻",
      targetSlot: "east",
      requiresNorth: false,
      sentenceTemplates: [
        "The {target} is placed immediately next to the {center}.",
        "Next to the {center}, on its eastern wall, you can spot the {target}.",
        "Right next to the {center} is the entrance to the {target}."
      ],
      explanation: "'Next to / adjacent to' 表示紧挨着旁边，紧贴 {center} 建造的是 {letter}。"
    },
    {
      id: "in_the_far_corner",
      phrase: "in the far northeast corner",
      phraseCn: "在遥远的东北死角",
      targetSlot: "northeast",
      requiresNorth: true,
      sentenceTemplates: [
        "Tucked away in the far northeast corner beyond the {center} is the {target}.",
        "The {target} is situated right in the far northeast corner of the grounds.",
        "In the furthest northeast corner from the {center}, you will see the {target}."
      ],
      explanation: "'Far corner' 指场地最边缘的角落，右上角尽头的位置是 {letter}。"
    },
    {
      id: "on_the_far_side",
      phrase: "on the far side of",
      phraseCn: "在……的远端/对面远端",
      targetSlot: "north",
      requiresNorth: false,
      sentenceTemplates: [
        "On the far side of the {center}, away from the road, lies the {target}.",
        "You will see the {target} positioned on the far side of the {center}.",
        "Beyond and on the far side of the {center} is the {target}."
      ],
      explanation: "'On the far side' 表示在参照物背后较远的另一端，对应位置 {letter}。"
    },
    {
      id: "front_of",
      phrase: "directly in front of",
      phraseCn: "正前方（入口面）",
      targetSlot: "south",
      requiresNorth: false,
      sentenceTemplates: [
        "Directly in front of the {center} is the new {target}.",
        "Right in front of the main entrance to the {center}, you will find the {target}.",
        "Standing directly in front of the {center} gives you quick access to the {target}."
      ],
      explanation: "在建筑的主入口正面正前方即为位置 {letter}。"
    },
    {
      id: "behind",
      phrase: "tucked behind",
      phraseCn: "隐蔽在……的后方",
      targetSlot: "north",
      requiresNorth: false,
      sentenceTemplates: [
        "Tucked right behind the {center} is the small {target}.",
        "If you walk behind the {center}, you will discover the {target}.",
        "The {target} is hidden immediately behind the main block of the {center}."
      ],
      explanation: "'Behind' 表示在参照物的后方（上方背侧），对应位置 {letter}。"
    }
  ];

  // 槽位物理坐标定义（基准中心在 190, 140）
  const SLOT_COORDINATES = {
    north: { x: 190, y: 52 },
    south: { x: 190, y: 228 },
    west: { x: 70, y: 140 },
    east: { x: 310, y: 140 },
    northwest: { x: 75, y: 60 },
    northeast: { x: 305, y: 60 },
    southwest: { x: 75, y: 220 },
    southeast: { x: 305, y: 220 }
  };

  window.MAP_DIRECTION_DATA = {
    expressions: DIRECTION_EXPRESSIONS,
    slotCoordinates: SLOT_COORDINATES
  };
})();
