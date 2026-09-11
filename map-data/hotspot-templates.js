// 雅思听力高频答案位置秒杀模板库 (30+ 场景与道路组合)
(() => {
  "use strict";

  const HOTSPOT_TEMPLATES = [
    // 1. 弯道处 (at the bend)
    {
      id: "hs-bend-1",
      category: "bend",
      phrase: "at the bend of the path",
      phraseCn: "弯道拐弯处",
      audio: "The tourist info booth is located right at the bend of the pathway.",
      svgRoad: "M 40 20 L 40 120 Q 40 180 110 180 L 260 180",
      candidateSlots: [
        { slotId: "s1", x: 55, y: 165, isAnswer: true },
        { slotId: "s2", x: 40, y: 50, isAnswer: false },
        { slotId: "s3", x: 220, y: 180, isAnswer: false }
      ],
      teaching: "高频考点 'at the bend'：即道路发生弧形转向的顶弧处。"
    },
    {
      id: "hs-bend-2",
      category: "bend",
      phrase: "just after the bend",
      phraseCn: "刚拐过弯道",
      audio: "If you continue around the curve, you will see the bike racks just after the bend.",
      svgRoad: "M 40 20 L 40 120 Q 40 180 110 180 L 260 180",
      candidateSlots: [
        { slotId: "s1", x: 50, y: 155, isAnswer: false },
        { slotId: "s2", x: 140, y: 160, isAnswer: true },
        { slotId: "s3", x: 40, y: 60, isAnswer: false }
      ],
      teaching: "'just after the bend'：拐过弯道之后立刻出现在眼前的位置。"
    },
    {
      id: "hs-bend-3",
      category: "bend",
      phrase: "just before the bend",
      phraseCn: "在到达弯道之前",
      audio: "Just before you reach the sharp bend in the road, the picnic bench is on your left.",
      svgRoad: "M 40 20 L 40 120 Q 40 180 110 180 L 260 180",
      candidateSlots: [
        { slotId: "s1", x: 65, y: 90, isAnswer: true },
        { slotId: "s2", x: 55, y: 165, isAnswer: false },
        { slotId: "s3", x: 180, y: 165, isAnswer: false }
      ],
      teaching: "'just before the bend'：尚未进入弯道，在拐角前的笔直路段边缘。"
    },

    // 2. 道路尽头 (dead end / cul-de-sac)
    {
      id: "hs-deadend-1",
      category: "end",
      phrase: "at the end of the road",
      phraseCn: "在道路最深尽头",
      audio: "You will find the public restrooms situated right at the end of the road.",
      svgRoad: "M 150 20 L 150 220",
      candidateSlots: [
        { slotId: "s1", x: 150, y: 60, isAnswer: false },
        { slotId: "s2", x: 150, y: 130, isAnswer: false },
        { slotId: "s3", x: 150, y: 230, isAnswer: true }
      ],
      teaching: "高频考点 'at the end of the road'：路无法继续延伸的最末端。"
    },
    {
      id: "hs-deadend-2",
      category: "end",
      phrase: "at the far end of the cul-de-sac",
      phraseCn: "在死胡同的最深处",
      audio: "The blacksmith workshop is located at the far end of the cul-de-sac.",
      svgRoad: "M 150 20 L 150 200",
      candidateSlots: [
        { slotId: "s1", x: 150, y: 215, isAnswer: true },
        { slotId: "s2", x: 100, y: 110, isAnswer: false },
        { slotId: "s3", x: 200, y: 110, isAnswer: false }
      ],
      teaching: "'cul-de-sac'：死胡同 / 盲端路，最底端即为答案。"
    },

    // 3. 左右手第一栋 / 第二栋 (first/second building on right/left)
    {
      id: "hs-first-right-1",
      category: "order",
      phrase: "first building on your right",
      phraseCn: "右手边第一栋建筑",
      audio: "As you walk down the avenue from the entrance, the gallery is the first building on your right.",
      svgRoad: "M 150 240 L 150 20",
      candidateSlots: [
        { slotId: "s1", x: 80, y: 170, isAnswer: false },
        { slotId: "s2", x: 220, y: 170, isAnswer: true },
        { slotId: "s3", x: 220, y: 80, isAnswer: false }
      ],
      teaching: "考点 'first building on your right'：由下往上走，右侧遇到的第 1 栋。"
    },
    {
      id: "hs-first-left-1",
      category: "order",
      phrase: "first building on your left",
      phraseCn: "左手边第一栋建筑",
      audio: "Heading northward from the car park, the security office is the first building on your left.",
      svgRoad: "M 150 240 L 150 20",
      candidateSlots: [
        { slotId: "s1", x: 80, y: 170, isAnswer: true },
        { slotId: "s2", x: 220, y: 170, isAnswer: false },
        { slotId: "s3", x: 80, y: 80, isAnswer: false }
      ],
      teaching: "'first building on your left'：按前进方向左侧遇到的第一栋。"
    },
    {
      id: "hs-second-right-1",
      category: "order",
      phrase: "second building on your right",
      phraseCn: "右手边第二栋建筑",
      audio: "Continue along the path; the gift shop is the second building on your right.",
      svgRoad: "M 150 240 L 150 20",
      candidateSlots: [
        { slotId: "s1", x: 220, y: 170, isAnswer: false },
        { slotId: "s2", x: 220, y: 80, isAnswer: true },
        { slotId: "s3", x: 80, y: 80, isAnswer: false }
      ],
      teaching: "听到 'second building' 必须跳过第 1 栋，精准命中第 2 栋。"
    },
    {
      id: "hs-second-left-1",
      category: "order",
      phrase: "second building on your left",
      phraseCn: "左手边第二栋建筑",
      audio: "Walk north; the science museum is the second building on your left.",
      svgRoad: "M 150 240 L 150 20",
      candidateSlots: [
        { slotId: "s1", x: 80, y: 170, isAnswer: false },
        { slotId: "s2", x: 80, y: 80, isAnswer: true },
        { slotId: "s3", x: 220, y: 80, isAnswer: false }
      ],
      teaching: "顺路线前行，左侧数过去第 2 栋建筑。"
    },

    // 4. 正对大门 / 出口 (opposite the entrance)
    {
      id: "hs-opposite-1",
      category: "opposite",
      phrase: "directly opposite the main entrance",
      phraseCn: "正对主大门",
      audio: "The reception counter is placed directly opposite the main entrance.",
      svgRoad: "M 20 170 L 280 170",
      candidateSlots: [
        { slotId: "s1", x: 150, y: 80, isAnswer: true },
        { slotId: "s2", x: 60, y: 80, isAnswer: false },
        { slotId: "s3", x: 240, y: 80, isAnswer: false }
      ],
      teaching: "考点 'directly opposite the entrance'：正对大门入口视线直线穿过去的位置。"
    },

    // 5. 十字路口拐角 (corner of the junction)
    {
      id: "hs-corner-ne",
      category: "corner",
      phrase: "on the northeast corner of the junction",
      phraseCn: "在十字路口东北角",
      audio: "The post office stands on the northeast corner of the crossroads.",
      svgRoad: "M 150 20 L 150 220;M 20 120 L 280 120",
      candidateSlots: [
        { slotId: "s1", x: 210, y: 70, isAnswer: true },
        { slotId: "s2", x: 90, y: 70, isAnswer: false },
        { slotId: "s3", x: 90, y: 170, isAnswer: false },
        { slotId: "s4", x: 210, y: 170, isAnswer: false }
      ],
      teaching: "十字路口右上角象限（上北右东）为东北角 (northeast corner)。"
    },
    {
      id: "hs-corner-sw",
      category: "corner",
      phrase: "on the southwest corner of the intersection",
      phraseCn: "在十字路口西南角",
      audio: "You can find the bank on the southwest corner of the intersection.",
      svgRoad: "M 150 20 L 150 220;M 20 120 L 280 120",
      candidateSlots: [
        { slotId: "s1", x: 90, y: 170, isAnswer: true },
        { slotId: "s2", x: 210, y: 70, isAnswer: false },
        { slotId: "s3", x: 90, y: 70, isAnswer: false },
        { slotId: "s4", x: 210, y: 170, isAnswer: false }
      ],
      teaching: "十字路口左下角象限（下南左西）为西南角 (southwest corner)。"
    },
    {
      id: "hs-corner-se",
      category: "corner",
      phrase: "on the southeast corner of the crossroads",
      phraseCn: "在十字路口东南角",
      audio: "The coffee house is on the southeast corner of the crossroads.",
      svgRoad: "M 150 20 L 150 220;M 20 120 L 280 120",
      candidateSlots: [
        { slotId: "s1", x: 210, y: 170, isAnswer: true },
        { slotId: "s2", x: 90, y: 70, isAnswer: false },
        { slotId: "s3", x: 210, y: 70, isAnswer: false },
        { slotId: "s4", x: 90, y: 170, isAnswer: false }
      ],
      teaching: "十字路口右下角为东南角 (southeast corner)。"
    },
    {
      id: "hs-corner-nw",
      category: "corner",
      phrase: "on the northwest corner of the junction",
      phraseCn: "在十字路口西北角",
      audio: "The pharmacy is situated on the northwest corner of the junction.",
      svgRoad: "M 150 20 L 150 220;M 20 120 L 280 120",
      candidateSlots: [
        { slotId: "s1", x: 90, y: 70, isAnswer: true },
        { slotId: "s2", x: 210, y: 70, isAnswer: false },
        { slotId: "s3", x: 90, y: 170, isAnswer: false },
        { slotId: "s4", x: 210, y: 170, isAnswer: false }
      ],
      teaching: "十字路口左上角为西北角 (northwest corner)。"
    },

    // 6. 丁字路口对面 (facing the T-junction)
    {
      id: "hs-facing-t",
      category: "junction",
      phrase: "facing the T-junction",
      phraseCn: "正对丁字路口路冲",
      audio: "As you drive up North Road, the Town Hall is directly ahead facing the T-junction.",
      svgRoad: "M 20 70 L 280 70;M 150 70 L 150 220",
      candidateSlots: [
        { slotId: "s1", x: 150, y: 35, isAnswer: true },
        { slotId: "s2", x: 60, y: 120, isAnswer: false },
        { slotId: "s3", x: 240, y: 120, isAnswer: false }
      ],
      teaching: "'facing the T-junction'：自下而上走到丁字路口时，正前方迎面而立的建筑。"
    },

    // 7. 环岛出口 (roundabout exit)
    {
      id: "hs-roundabout-1",
      category: "roundabout",
      phrase: "take the first exit off the roundabout",
      phraseCn: "环岛第一出口处",
      audio: "Enter the roundabout and take the very first exit on your left.",
      svgRoad: "M 150 240 L 150 170;M 150 70 L 150 20;M 30 120 L 100 120;M 200 120 L 270 120",
      candidateSlots: [
        { slotId: "s1", x: 40, y: 80, isAnswer: true },
        { slotId: "s2", x: 150, y: 30, isAnswer: false },
        { slotId: "s3", x: 260, y: 80, isAnswer: false }
      ],
      teaching: "按车辆行驶顺序，进入环岛后的第 1 个出口支路旁。"
    },
    {
      id: "hs-roundabout-2",
      category: "roundabout",
      phrase: "take the second exit off the roundabout",
      phraseCn: "环岛第二出口（直行出口）",
      audio: "Go round the roundabout and take the second exit heading straight north.",
      svgRoad: "M 150 240 L 150 170;M 150 70 L 150 20;M 30 120 L 100 120;M 200 120 L 270 120",
      candidateSlots: [
        { slotId: "s1", x: 150, y: 30, isAnswer: true },
        { slotId: "s2", x: 40, y: 80, isAnswer: false },
        { slotId: "s3", x: 260, y: 80, isAnswer: false }
      ],
      teaching: "环岛第 2 个出口通常对应正前方的直行道路。"
    },

    // 8. 跨过桥梁之后 (across the bridge)
    {
      id: "hs-across-bridge",
      category: "bridge",
      phrase: "immediately across the footbridge",
      phraseCn: "刚跨过人行桥",
      audio: "The bird watching hide is located immediately across the footbridge on your right.",
      svgRoad: "M 150 240 L 150 20",
      candidateSlots: [
        { slotId: "s1", x: 210, y: 80, isAnswer: true },
        { slotId: "s2", x: 90, y: 80, isAnswer: false },
        { slotId: "s3", x: 210, y: 180, isAnswer: false }
      ],
      teaching: "'across the bridge'：必须跨到河流的另一侧对岸。"
    },

    // 9. 道路分岔口 (where the path forks)
    {
      id: "hs-fork-right",
      category: "fork",
      phrase: "take the right fork",
      phraseCn: "走分岔口的右边支路",
      audio: "Where the trail forks, follow the right branch to reach the campsite.",
      svgRoad: "M 150 240 L 150 140;M 150 140 L 70 40;M 150 140 L 230 40",
      candidateSlots: [
        { slotId: "s1", x: 230, y: 50, isAnswer: true },
        { slotId: "s2", x: 70, y: 50, isAnswer: false },
        { slotId: "s3", x: 150, y: 140, isAnswer: false }
      ],
      teaching: "'Right fork'：走道路分叉后的右侧支路。"
    },
    {
      id: "hs-fork-left",
      category: "fork",
      phrase: "take the left fork",
      phraseCn: "走分岔口的左边支路",
      audio: "When the path forks into two, take the left fork to the nature reserve.",
      svgRoad: "M 150 240 L 150 140;M 150 140 L 70 40;M 150 140 L 230 40",
      candidateSlots: [
        { slotId: "s1", x: 70, y: 50, isAnswer: true },
        { slotId: "s2", x: 230, y: 50, isAnswer: false },
        { slotId: "s3", x: 150, y: 140, isAnswer: false }
      ],
      teaching: "'Left fork'：走分叉后的左侧支路。"
    }
  ];

  window.MAP_HOTSPOT_DATA = HOTSPOT_TEMPLATES;
})();
