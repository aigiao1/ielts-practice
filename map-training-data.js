// 雅思听力地图题专项数据集 (IELTS Listening Map Training Data)
window.MAP_TRAINING_DATA = {
  // 1. 常见地图图形 (Visual Dictionary)
  visualShapes: [
    {
      id: "crossroads",
      name: "Junction / Crossroads / Intersection",
      phonetic: "/ˈdʒʌŋkʃn/ /ˈkrɒsrəʊdz/",
      chinese: "十字路口 / 交叉路口",
      svg: `<svg viewBox="0 0 160 120" class="shape-svg">
        <rect width="160" height="120" fill="#fdfaf5" rx="8"/>
        <rect x="0" y="46" width="160" height="28" fill="#e8dfd3"/>
        <rect x="66" y="0" width="28" height="120" fill="#e8dfd3"/>
        <line x1="0" y1="60" x2="160" y2="60" stroke="#7a7065" stroke-dasharray="4 3" stroke-width="1.5"/>
        <line x1="80" y1="0" x2="80" y2="120" stroke="#7a7065" stroke-dasharray="4 3" stroke-width="1.5"/>
        <circle cx="80" cy="60" r="5" fill="#f2743f"/>
      </svg>`,
      collocations: [
        "at the junction",
        "turn right at the crossroads",
        "just before the intersection",
        "on the corner of the junction"
      ]
    },
    {
      id: "t_junction",
      name: "T-Junction",
      phonetic: "/ˈtiː dʒʌŋkʃn/",
      chinese: "丁字路口",
      svg: `<svg viewBox="0 0 160 120" class="shape-svg">
        <rect width="160" height="120" fill="#fdfaf5" rx="8"/>
        <rect x="0" y="24" width="160" height="28" fill="#e8dfd3"/>
        <rect x="66" y="24" width="28" height="96" fill="#e8dfd3"/>
        <line x1="0" y1="38" x2="160" y2="38" stroke="#7a7065" stroke-dasharray="4 3" stroke-width="1.5"/>
        <line x1="80" y1="38" x2="80" y2="120" stroke="#7a7065" stroke-dasharray="4 3" stroke-width="1.5"/>
        <circle cx="80" cy="38" r="5" fill="#f2743f"/>
      </svg>`,
      collocations: [
        "turn left at the T-junction",
        "facing the T-junction",
        "when you reach the T-junction"
      ]
    },
    {
      id: "bend",
      name: "Bend / Curve",
      phonetic: "/bend/ /kɜːv/",
      chinese: "弯道 / 拐角弧度",
      svg: `<svg viewBox="0 0 160 120" class="shape-svg">
        <rect width="160" height="120" fill="#fdfaf5" rx="8"/>
        <path d="M 28 0 L 28 55 Q 28 92 65 92 L 160 92 L 160 64 L 65 64 Q 56 64 56 55 L 56 0 Z" fill="#e8dfd3"/>
        <path d="M 42 0 L 42 55 Q 42 78 65 78 L 160 78" fill="none" stroke="#7a7065" stroke-dasharray="4 3" stroke-width="1.5"/>
        <circle cx="48" cy="72" r="5" fill="#f2743f"/>
      </svg>`,
      collocations: [
        "at the bend",
        "just after the bend",
        "on the bend of the road",
        "before you get to the bend"
      ]
    },
    {
      id: "right_angle_bend",
      name: "Right-Angle Bend / Sharp Turn",
      phonetic: "/ˌraɪt ˈæŋɡl bend/",
      chinese: "直角拐弯 / 急转弯",
      svg: `<svg viewBox="0 0 160 120" class="shape-svg">
        <rect width="160" height="120" fill="#fdfaf5" rx="8"/>
        <rect x="30" y="0" width="28" height="84" fill="#e8dfd3"/>
        <rect x="30" y="56" width="130" height="28" fill="#e8dfd3"/>
        <polyline points="44,0 44,70 160,70" fill="none" stroke="#7a7065" stroke-dasharray="4 3" stroke-width="1.5"/>
        <circle cx="44" cy="70" r="5" fill="#f2743f"/>
      </svg>`,
      collocations: [
        "a sharp right-angle bend",
        "make a sharp turn",
        "immediately around the corner"
      ]
    },
    {
      id: "branch_off",
      name: "Branch Off / Lead Off",
      phonetic: "/brɑːntʃ ɒf/",
      chinese: "分岔 / 从主路延伸出一条小径",
      svg: `<svg viewBox="0 0 160 120" class="shape-svg">
        <rect width="160" height="120" fill="#fdfaf5" rx="8"/>
        <rect x="25" y="0" width="28" height="120" fill="#e8dfd3"/>
        <polygon points="53,50 145,100 135,116 53,72" fill="#dfd6c8"/>
        <line x1="39" y1="0" x2="39" y2="120" stroke="#7a7065" stroke-dasharray="4 3" stroke-width="1.5"/>
        <line x1="45" y1="60" x2="140" y2="108" stroke="#948b7f" stroke-dasharray="3 3" stroke-width="1.2"/>
        <circle cx="53" cy="62" r="5" fill="#f2743f"/>
      </svg>`,
      collocations: [
        "a path branches off to the right",
        "a little path leads off from the main road",
        "where the side path branches off"
      ]
    },
    {
      id: "winding_road",
      name: "Winding Road / Meandering Path",
      phonetic: "/ˈwaɪndɪŋ rəʊd/",
      chinese: "蜿蜒小路 / 蛇形小道",
      svg: `<svg viewBox="0 0 160 120" class="shape-svg">
        <rect width="160" height="120" fill="#fdfaf5" rx="8"/>
        <path d="M 15 100 Q 50 100 65 60 T 115 60 T 150 15" fill="none" stroke="#e8dfd3" stroke-width="26" stroke-linecap="round"/>
        <path d="M 15 100 Q 50 100 65 60 T 115 60 T 150 15" fill="none" stroke="#7a7065" stroke-dasharray="4 3" stroke-width="1.5"/>
      </svg>`,
      collocations: [
        "follow the winding road",
        "a meandering path through the woods",
        "the path winds its way along the river"
      ]
    },
    {
      id: "bridge_river",
      name: "Bridge / River / Stream",
      phonetic: "/brɪdʒ/ /ˈrɪvə/",
      chinese: "桥梁 / 河流 / 溪流",
      svg: `<svg viewBox="0 0 160 120" class="shape-svg">
        <rect width="160" height="120" fill="#fdfaf5" rx="8"/>
        <path d="M 0 35 C 40 20, 80 50, 160 30 L 160 70 C 90 85, 40 55, 0 70 Z" fill="#d2edf5"/>
        <rect x="66" y="0" width="28" height="120" fill="#e8dfd3"/>
        <rect x="62" y="32" width="36" height="6" fill="#7a6754" rx="2"/>
        <rect x="62" y="62" width="36" height="6" fill="#7a6754" rx="2"/>
      </svg>`,
      collocations: [
        "cross the bridge",
        "just before the bridge",
        "on the other side of the river",
        "beside the stream"
      ]
    },
    {
      id: "circular_area",
      name: "Circular Area / Roundabout",
      phonetic: "/ˈsɜːkjələ ˈeəriə/",
      chinese: "圆形区域 / 环形转盘",
      svg: `<svg viewBox="0 0 160 120" class="shape-svg">
        <rect width="160" height="120" fill="#fdfaf5" rx="8"/>
        <rect x="0" y="48" width="160" height="24" fill="#e8dfd3"/>
        <rect x="68" y="0" width="24" height="120" fill="#e8dfd3"/>
        <circle cx="80" cy="60" r="32" fill="#e8dfd3"/>
        <circle cx="80" cy="60" r="16" fill="#dbeef0"/>
        <circle cx="80" cy="60" r="2" fill="#7a7065"/>
      </svg>`,
      collocations: [
        "in the circular area",
        "take the second exit at the roundabout",
        "located in the central circular courtyard"
      ]
    },
    {
      id: "corner",
      name: "Corner (SW / NE etc.)",
      phonetic: "/ˈkɔːnə/",
      chinese: "角落 / 西南角 / 东北角",
      svg: `<svg viewBox="0 0 160 120" class="shape-svg">
        <rect width="160" height="120" fill="#fdfaf5" rx="8"/>
        <rect x="15" y="15" width="130" height="90" fill="none" stroke="#7a7065" stroke-width="2" stroke-dasharray="4 2"/>
        <circle cx="30" cy="30" r="10" fill="#fff0df" stroke="#f2743f" stroke-width="2"/>
        <text x="30" y="34" font-size="9" font-weight="bold" fill="#9b4b1d" text-anchor="middle">NW</text>
        <circle cx="130" cy="90" r="10" fill="#fff0df" stroke="#f2743f" stroke-width="2"/>
        <text x="130" y="94" font-size="9" font-weight="bold" fill="#9b4b1d" text-anchor="middle">SE</text>
      </svg>`,
      collocations: [
        "in the southwest corner",
        "in the top right corner",
        "tucked away in the corner"
      ]
    },
    {
      id: "corridor_aisle",
      name: "Corridor / Aisle / Hallway",
      phonetic: "/ˈkɒrɪdɔː/ /aɪl/",
      chinese: "走廊 / 过道 / 门厅通道",
      svg: `<svg viewBox="0 0 160 120" class="shape-svg">
        <rect width="160" height="120" fill="#fdfaf5" rx="8"/>
        <rect x="20" y="20" width="120" height="80" fill="#f5ede3" stroke="#b0a597"/>
        <rect x="45" y="20" width="70" height="80" fill="#ffffff"/>
        <line x1="45" y1="40" x2="45" y2="55" stroke="#f2743f" stroke-width="3"/>
        <line x1="45" y1="70" x2="45" y2="85" stroke="#f2743f" stroke-width="3"/>
        <line x1="115" y1="50" x2="115" y2="65" stroke="#f2743f" stroke-width="3"/>
        <text x="80" y="65" font-size="10" fill="#7a7065" text-anchor="middle">Corridor</text>
      </svg>`,
      collocations: [
        "walk down the main corridor",
        "the first door on the right along the aisle",
        "at the end of the corridor"
      ]
    },
    {
      id: "dead_end",
      name: "Dead End / Cul-de-sac",
      phonetic: "/ˌded ˈend/ /ˈkʌl də sæk/",
      chinese: "死胡同 / 尽头",
      svg: `<svg viewBox="0 0 160 120" class="shape-svg">
        <rect width="160" height="120" fill="#fdfaf5" rx="8"/>
        <rect x="20" y="44" width="85" height="32" fill="#e8dfd3"/>
        <circle cx="105" cy="60" r="26" fill="#e8dfd3"/>
        <line x1="20" y1="60" x2="90" y2="60" stroke="#7a7065" stroke-dasharray="4 3" stroke-width="1.5"/>
        <line x1="131" y1="48" x2="131" y2="72" stroke="#c0392b" stroke-width="4"/>
      </svg>`,
      collocations: [
        "the road comes to a dead end",
        "at the far end of the cul-de-sac",
        "at the end of the path"
      ]
    },
    {
      id: "fork",
      name: "Fork in the Road / Y-Junction",
      phonetic: "/fɔːk/",
      chinese: "三岔口 / 道路分成两路 (Y形)",
      svg: `<svg viewBox="0 0 160 120" class="shape-svg">
        <rect width="160" height="120" fill="#fdfaf5" rx="8"/>
        <polygon points="66,120 94,120 94,80 135,10 110,0 80,55 50,0 25,10 66,80" fill="#e8dfd3"/>
        <line x1="80" y1="120" x2="80" y2="70" stroke="#7a7065" stroke-dasharray="4 3" stroke-width="1.5"/>
        <line x1="80" y1="70" x2="122" y2="5" stroke="#7a7065" stroke-dasharray="4 3" stroke-width="1.5"/>
        <line x1="80" y1="70" x2="38" y2="5" stroke="#7a7065" stroke-dasharray="4 3" stroke-width="1.5"/>
      </svg>`,
      collocations: [
        "take the right fork",
        "where the path forks into two",
        "at the fork in the path"
      ]
    }
  ],

  // 2. 方位词互动训练场景 (Direction & Orientation Training)
  directionExercises: [
    {
      id: "dir-1",
      landmark: "Library",
      landmarkCn: "图书馆",
      prompt: "to the left of the library",
      promptCn: "在图书馆的左侧（西面）",
      audio: "The study room is located directly to the left of the library.",
      pins: [
        { id: "A", x: 190, y: 55 },
        { id: "B", x: 70, y: 140 }, // 正确
        { id: "C", x: 310, y: 140 },
        { id: "D", x: 190, y: 225 }
      ],
      answer: "B",
      explanation: "面对地图，左侧对应正西方向位置 B。"
    },
    {
      id: "dir-2",
      landmark: "Museum",
      landmarkCn: "博物馆",
      prompt: "directly north of the museum",
      promptCn: "在博物馆正北面",
      audio: "The sculpture garden can be found directly north of the museum.",
      pins: [
        { id: "A", x: 190, y: 55 }, // 正确
        { id: "B", x: 70, y: 140 },
        { id: "C", x: 310, y: 140 },
        { id: "D", x: 190, y: 225 }
      ],
      answer: "A",
      explanation: "指南针标注北在上方，正上方对应位置 A。"
    },
    {
      id: "dir-3",
      landmark: "Community Hall",
      landmarkCn: "社区大礼堂",
      prompt: "in the southeast corner",
      promptCn: "在右下角（东南角）",
      audio: "The emergency exit is situated in the southeast corner of the complex.",
      pins: [
        { id: "A", x: 75, y: 65 },
        { id: "B", x: 305, y: 65 },
        { id: "C", x: 75, y: 215 },
        { id: "D", x: 305, y: 215 } // 正确
      ],
      answer: "D",
      explanation: "东南（Southeast）对应地图的右下方位置 D。"
    },
    {
      id: "dir-4",
      landmark: "Car Park",
      landmarkCn: "停车场",
      prompt: "on the opposite side of the road",
      promptCn: "在马路正对面",
      audio: "You'll find the ticket kiosk on the opposite side of the road from the car park.",
      pins: [
        { id: "A", x: 190, y: 50 }, // 正确
        { id: "B", x: 70, y: 190 },
        { id: "C", x: 310, y: 190 }
      ],
      answer: "A",
      explanation: "停车场位于路南，隔着马路的正对面对应位置 A。"
    },
    {
      id: "dir-5",
      landmark: "Central Lake",
      landmarkCn: "中心人工湖",
      prompt: "on the far side of the lake",
      promptCn: "在湖泊的另一侧（远端）",
      audio: "The bird watching tower stands on the far side of the lake.",
      pins: [
        { id: "A", x: 190, y: 45 }, // 正确
        { id: "B", x: 90, y: 140 },
        { id: "C", x: 190, y: 235 }
      ],
      answer: "A",
      explanation: "从观察起点视角（入口在下方），湖对面的远端位置为 A。"
    },
    {
      id: "dir-6",
      landmark: "Visitor Centre",
      landmarkCn: "游客中心",
      prompt: "in the southwest corner",
      promptCn: "在左下角（西南角）",
      audio: "The bicycle rental shed is located in the southwest corner.",
      pins: [
        { id: "A", x: 65, y: 55 },
        { id: "B", x: 315, y: 55 },
        { id: "C", x: 65, y: 220 }, // 正确
        { id: "D", x: 315, y: 220 }
      ],
      answer: "C",
      explanation: "西南角（Southwest）对应地图的左下角位置 C。"
    }
  ],

  // 3. 空间过渡与参照物关系专项 (Spatial Transitions)
  referenceRelations: [
    {
      id: "ref-1",
      title: "Through & Beyond 穿过与超出",
      subtitle: "Ticket Office → Room G → Beyond that room",
      audioSequence: [
        "First, enter through the main double doors into the Ticket Office.",
        "Go straight through the Ticket Office into Room G.",
        "Beyond that room is the main Exhibition Hall."
      ],
      steps: [
        { x: 190, y: 250, label: "Entrance", text: "从正门进入售票厅 (Ticket Office)" },
        { x: 190, y: 160, label: "Room G", text: "穿过售票厅，走入 G 展厅 (Room G)" },
        { x: 190, y: 70, label: "Exhibition", text: "Beyond that room（越过G展厅之后），即为主展厅！" }
      ],
      question: "Where is the Exhibition Hall?",
      pins: [
        { id: "A", x: 70, y: 160 },
        { id: "B", x: 310, y: 160 },
        { id: "C", x: 190, y: 70 } // 正确
      ],
      answer: "C",
      explanation: "Go through 表示穿过，Beyond that room 表示越过那个房间再往前延伸的位置 C。"
    },
    {
      id: "ref-2",
      title: "Past the Trees 绕过/经过地标",
      subtitle: "Main Road → Go past the trees → First building on your right",
      audioSequence: [
        "Walk north along the gravel path.",
        "Go past the grove of pine trees on your left.",
        "The gift shop is the first building on your right."
      ],
      steps: [
        { x: 190, y: 250, label: "Start", text: "沿着砂石小径往北走" },
        { x: 190, y: 150, label: "Past Trees", text: "经过/走过左侧的松树林" },
        { x: 280, y: 110, label: "Gift Shop", text: "右侧的第一座建筑物即为礼品店" }
      ],
      question: "Where is the Gift Shop?",
      pins: [
        { id: "A", x: 90, y: 110 },
        { id: "B", x: 280, y: 110 }, // 正确
        { id: "C", x: 280, y: 200 }
      ],
      answer: "B",
      explanation: "Go past 表示走过/越过该地标。经过树林后，右手边的第一座建筑对应位置 B。"
    },
    {
      id: "ref-3",
      title: "Between A and B 位于两者之间",
      subtitle: "Nestled between the Café and the Greenhouse",
      audioSequence: [
        "Cross the courtyard toward the north.",
        "You'll see the Café on the left and the Greenhouse on the right.",
        "The Information Desk is situated right between them."
      ],
      steps: [
        { x: 190, y: 240, label: "Courtyard", text: "穿过中央庭院" },
        { x: 190, y: 100, label: "Between", text: "位于左边咖啡馆与右边温室正中间" }
      ],
      question: "Where is the Information Desk?",
      pins: [
        { id: "A", x: 90, y: 100, tag: "Café" },
        { id: "B", x: 190, y: 100 }, // 正确
        { id: "C", x: 290, y: 100, tag: "Greenhouse" }
      ],
      answer: "B",
      explanation: "Between A and B 表达位于两座参照地标的正中央位置 B。"
    }
  ],

  // 4. 路线跟随训练 (Route Following: "Follow the Speaker" Maze)
  routeScenarios: [
    {
      id: "route-1",
      title: "湿地自然公园 (Wetland Nature Reserve)",
      context: "公园管理员正在向游客介绍设施分布",
      mapWidth: 460,
      mapHeight: 340,
      startPoint: { x: 230, y: 310, label: "Main Entrance (You are here)" },
      svgFeatures: {
        roads: [
          "M 230 320 L 230 170",
          "M 230 170 L 100 170 L 100 80",
          "M 230 170 L 360 170 L 360 80"
        ],
        rivers: [
          "M 0 110 C 120 90, 200 140, 460 100 L 460 135 C 200 175, 120 125, 0 145 Z"
        ],
        bridges: [
          { x: 88, y: 108, w: 24, h: 20 },
          { x: 348, y: 100, w: 24, h: 20 }
        ],
        landmarks: [
          { name: "Pond", type: "water", x: 130, y: 210, w: 60, h: 45, rx: 20 },
          { name: "Pine Trees", type: "trees", x: 270, y: 210, w: 60, h: 50 },
          { name: "Café", type: "building", x: 45, y: 65, w: 45, h: 30 }
        ]
      },
      steps: [
        {
          text: "We are starting here at the main entrance, facing north.",
          audioText: "We are starting here at the main entrance, facing north.",
          coord: { x: 230, y: 310 }
        },
        {
          text: "Walk straight ahead along the main path.",
          audioText: "Walk straight ahead along the main path.",
          coord: { x: 230, y: 230 }
        },
        {
          text: "You will pass the pond on your left and the pine trees on your right.",
          audioText: "You will pass the pond on your left and the pine trees on your right.",
          coord: { x: 230, y: 190 }
        },
        {
          text: "When you reach the T-junction, turn left.",
          audioText: "When you reach the T-junction, turn left.",
          coord: { x: 180, y: 170 }
        },
        {
          text: "Follow the path until you cross the wooden bridge over the river.",
          audioText: "Follow the path until you cross the wooden bridge over the river.",
          coord: { x: 100, y: 100 }
        },
        {
          text: "The Bird Hide is the building directly ahead of you on the left.",
          audioText: "The Bird Hide is the building directly ahead of you on the left.",
          coord: { x: 60, y: 55 }
        }
      ],
      question: "Where is the Bird Hide (观鸟掩体)?",
      candidatePins: [
        { id: "A", x: 45, y: 55 }, // 正确
        { id: "B", x: 140, y: 55 },
        { id: "C", x: 330, y: 60 },
        { id: "D", x: 395, y: 60 },
        { id: "E", x: 330, y: 190 }
      ],
      answer: "A",
      pathCoords: [
        [230, 310],
        [230, 170],
        [100, 170],
        [100, 95],
        [65, 65]
      ],
      explanation: "入口出发向北 -> 经过左侧池塘右侧树林 -> 丁字路口左转 -> 过木桥后正前方左手边的建筑即为 A。"
    },
    {
      id: "route-2",
      title: "历史农场民俗中心 (Historical Farm Heritage)",
      context: "讲解员引导参观古代农庄建筑布局",
      mapWidth: 460,
      mapHeight: 340,
      startPoint: { x: 230, y: 310, label: "Ticket Kiosk (You are here)" },
      svgFeatures: {
        roads: [
          "M 230 320 L 230 200",
          "M 230 200 C 150 200, 150 90, 230 90 C 310 90, 310 200, 230 200",
          "M 230 90 L 370 90"
        ],
        landmarks: [
          { name: "Great Barn", type: "building", x: 200, y: 120, w: 60, h: 50 },
          { name: "Sheep Pen", type: "farm", x: 75, y: 120, w: 55, h: 50 },
          { name: "Orchard", type: "trees", x: 290, y: 220, w: 75, h: 55 }
        ]
      },
      steps: [
        {
          text: "Start at the ticket kiosk on the southern edge of the farm.",
          audioText: "Start at the ticket kiosk on the southern edge of the farm.",
          coord: { x: 230, y: 310 }
        },
        {
          text: "Take the path heading north until you come to the circular route around the Great Barn.",
          audioText: "Take the path heading north until you come to the circular route around the Great Barn.",
          coord: { x: 230, y: 200 }
        },
        {
          text: "Follow the path clockwise around the barn, with the sheep pen to your left.",
          audioText: "Follow the path clockwise around the barn, with the sheep pen to your left.",
          coord: { x: 165, y: 135 }
        },
        {
          text: "Continue to the northernmost point of the circle.",
          audioText: "Continue to the northernmost point of the circle.",
          coord: { x: 230, y: 90 }
        },
        {
          text: "Take the side path leading east, and the Blacksmith's Workshop is at the very end of it.",
          audioText: "Take the side path leading east, and the Blacksmith's Workshop is at the very end of it.",
          coord: { x: 370, y: 90 }
        }
      ],
      question: "Where is the Blacksmith's Workshop (铁匠工坊)?",
      candidatePins: [
        { id: "A", x: 95, y: 70 },
        { id: "B", x: 230, y: 60 },
        { id: "C", x: 395, y: 90 }, // 正确
        { id: "D", x: 395, y: 170 },
        { id: "E", x: 230, y: 230 }
      ],
      answer: "C",
      pathCoords: [
        [230, 310],
        [230, 200],
        [175, 160],
        [175, 120],
        [230, 90],
        [390, 90]
      ],
      explanation: "售票处出发 -> 沿大谷仓西侧顺时针绕行 -> 到达最北端向东支路 -> 走到尽头的建筑就是 C。"
    }
  ],

  // 5. 答案高发位置秒杀训练 (High-Frequency Answer Spots)
  highFrequencySpots: [
    {
      id: "spot-1",
      scenario: "at the bend of the road (弯道处)",
      audio: "The gift stall is set up right at the bend of the pathway.",
      hint: "点击弯道拐弯顶弧位置",
      svgRoad: "M 40 20 L 40 120 Q 40 180 110 180 L 260 180",
      pins: [
        { id: "A", x: 55, y: 165 }, // 正确
        { id: "B", x: 40, y: 50 },
        { id: "C", x: 220, y: 180 }
      ],
      answer: "A"
    },
    {
      id: "spot-2",
      scenario: "at the end of the road (路尽头)",
      audio: "You'll find the restroom block situated at the end of the road.",
      hint: "点击道路最底端尽头",
      svgRoad: "M 150 20 L 150 220",
      pins: [
        { id: "A", x: 150, y: 60 },
        { id: "B", x: 150, y: 130 },
        { id: "C", x: 150, y: 230 } // 正确
      ],
      answer: "C"
    },
    {
      id: "spot-3",
      scenario: "first building on your right (右手边第一栋建筑)",
      audio: "As you walk down the avenue, the exhibition gallery is the first building on your right.",
      hint: "假设从下方往上方走，看右侧第一栋",
      svgRoad: "M 150 240 L 150 20",
      pins: [
        { id: "A", x: 80, y: 170 },
        { id: "B", x: 220, y: 170 }, // 正确
        { id: "C", x: 220, y: 80 }
      ],
      answer: "B"
    },
    {
      id: "spot-4",
      scenario: "just after the crossroads (十字路口刚过)",
      audio: "The bicycle rack is located immediately after the crossroads on your left.",
      hint: "向上直行穿过十字路口后左侧",
      svgRoad: "M 150 240 L 150 20; M 40 130 L 260 130",
      pins: [
        { id: "A", x: 90, y: 90 }, // 正确
        { id: "B", x: 210, y: 90 },
        { id: "C", x: 90, y: 170 }
      ],
      answer: "A"
    }
  ],

  // 6. 重点地标词汇库 (Landmark Vocabulary)
  landmarkVocabulary: [
    { term: "barn", phonetic: "/bɑːn/", chinese: "谷仓 / 农舍大仓库", category: "building" },
    { term: "maze", phonetic: "/meɪz/", chinese: "迷宫（常为树篱迷宫 hedge maze）", category: "nature" },
    { term: "entrance / gate", phonetic: "/ˈentrəns/ /ɡeɪt/", chinese: "入口 / 大门", category: "access" },
    { term: "reception", phonetic: "/rɪˈsepʃn/", chinese: "前台 / 接待大厅", category: "building" },
    { term: "cloakroom", phonetic: "/ˈkləʊkrʊm/", chinese: "衣帽寄存间", category: "building" },
    { term: "car park", phonetic: "/ˈkɑː pɑːk/", chinese: "停车场", category: "facility" },
    { term: "traffic lights", phonetic: "/ˈtræfɪk laɪts/", chinese: "红绿灯 / 交通信号灯", category: "traffic" },
    { term: "pedestrian crossing", phonetic: "/pəˈdestriən ˈkrɒsɪŋ/", chinese: "斑马线 / 人行横道", category: "traffic" },
    { term: "railway tracks", phonetic: "/ˈreɪlweɪ træks/", chinese: "铁轨 / 铁路线", category: "traffic" },
    { term: "disabled entry", phonetic: "/dɪsˈeɪbld ˈentri/", chinese: "无障碍通道入口", category: "access" },
    { term: "footbridge", phonetic: "/ˈfʊtbrɪdʒ/", chinese: "步行人行天桥 / 木人行桥", category: "traffic" },
    { term: "circular courtyard", phonetic: "/ˈsɜːkjələ ˈkɔːtjɑːd/", chinese: "环形中庭 / 圆形庭院", category: "feature" },
    { term: "pond / lake", phonetic: "/pɒnd/ /leɪk/", chinese: "池塘 / 湖泊", category: "nature" },
    { term: "greenhouse", phonetic: "/ˈɡriːnhaʊs/", chinese: "温室花房", category: "building" },
    { term: "visitor centre", phonetic: "/ˈvɪzɪtə ˈsentə/", chinese: "游客中心", category: "facility" },
    { term: "starting point", phonetic: "/ˈstɑːtɪŋ pɔɪnt/", chinese: "出发起点（You are here）", category: "access" }
  ]
};
