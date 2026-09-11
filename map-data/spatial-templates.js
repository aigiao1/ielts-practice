// 雅思听力空间过渡与参照物关系模板库 (Spatial Transitions & Relation Templates)
// 支持地标插槽动态替换 (Slot Replacement: {start}, {mid}, {target}, {decoy1}, {decoy2})
(() => {
  "use strict";

  const SPATIAL_TEMPLATES = [
    // 1. Through & Beyond (连通房间)
    {
      id: "sp-beyond-rooms",
      relation: "beyond",
      title: "Through & Beyond 穿过与深入",
      layoutType: "sequential_rooms",
      slots: {
        start: ["Ticket Office", "Main Reception", "Entrance Foyer"],
        mid: ["Room G", "Cloakroom", "Waiting Area", "Gallery 1"],
        target: ["Exhibition Hall", "Archive Room", "Auditorium", "Library"],
        decoy1: ["Café", "Gift Shop", "Staff Office"]
      },
      audioSteps: [
        "First, enter through the double doors into the {start}.",
        "Walk straight through the {start} and pass into the {mid}.",
        "Beyond that {mid} lies the main {target}."
      ],
      stepCoords: [
        { x: 190, y: 245, label: "{start}" },
        { x: 190, y: 155, label: "{mid}" },
        { x: 190, y: 65, label: "{target}" }
      ],
      candidateSlots: [
        { id: "target", x: 190, y: 65, isAnswer: true },
        { id: "decoy1", x: 75, y: 155, isAnswer: false },
        { id: "decoy2", x: 305, y: 155, isAnswer: false },
        { id: "decoy3", x: 75, y: 65, isAnswer: false }
      ],
      teaching: "考点词 'Beyond'：表示『越过/超出……之后再往前』。听到 'Beyond that {mid}'，答案绝对不是 {mid} 本身，而是继续往深处延伸的建筑！"
    },

    // 2. Past the Landmark (绕过室外地标)
    {
      id: "sp-past-trees",
      relation: "past",
      title: "Past the Landmark 绕过/经过地标",
      layoutType: "winding_outdoor_path",
      slots: {
        start: ["Main Entrance", "South Gate", "Car Park"],
        mid: ["Pine Trees", "Rose Garden", "Old Fountain", "Orchard"],
        target: ["Education Centre", "Gift Shop", "Observation Deck"],
        decoy1: ["Picnic Area", "Playground", "Restrooms"]
      },
      audioSteps: [
        "Starting from the {start}, follow the gravel path heading north.",
        "Go past the {mid} on your left.",
        "The {target} is the very first building you will come to on your right."
      ],
      stepCoords: [
        { x: 190, y: 250, label: "Start" },
        { x: 190, y: 160, label: "Past {mid}" },
        { x: 285, y: 110, label: "{target}" }
      ],
      candidateSlots: [
        { id: "decoy1", x: 95, y: 110, isAnswer: false },
        { id: "target", x: 285, y: 110, isAnswer: true },
        { id: "decoy2", x: 285, y: 210, isAnswer: false },
        { id: "decoy3", x: 190, y: 55, isAnswer: false }
      ],
      teaching: "考点词 'Go past'：表示『从旁边经过并继续向前』。经过左侧的 {mid} 之后，右侧的第一栋建筑才是目标。"
    },

    // 3. Between A and B (夹在两建筑之间)
    {
      id: "sp-between-buildings",
      relation: "between",
      title: "Between A and B 位于两者之间",
      layoutType: "flanked_courtyard",
      slots: {
        start: ["Main Courtyard", "Visitor Center Entrance", "Central Plaza"],
        mid1: ["Café", "Bookshop", "Community Hall"],
        mid2: ["Greenhouse", "Art Gallery", "Workshop"],
        target: ["Information Desk", "Cloakroom", "Souvenir Stall"],
        decoy1: ["Bicycle Rack"]
      },
      audioSteps: [
        "As you enter the {start}, look directly ahead towards the north wall.",
        "You'll notice the {mid1} on your left and the {mid2} over on your right.",
        "The {target} is situated right between the two."
      ],
      stepCoords: [
        { x: 190, y: 240, label: "{start}" },
        { x: 190, y: 105, label: "{target}" }
      ],
      candidateSlots: [
        { id: "decoy1", x: 80, y: 105, isAnswer: false, tag: "{mid1}" },
        { id: "target", x: 190, y: 105, isAnswer: true },
        { id: "decoy2", x: 300, y: 105, isAnswer: false, tag: "{mid2}" },
        { id: "decoy3", x: 190, y: 195, isAnswer: false }
      ],
      teaching: "考点短语 'Between A and B'：必定位于两个清晰参照物的正中间夹缝位置。"
    },

    // 4. Opposite across the courtyard (穿过庭院正对面)
    {
      id: "sp-opposite-courtyard",
      relation: "opposite",
      title: "Directly Opposite 正对大门/穿过中庭对面",
      layoutType: "square_plaza",
      slots: {
        start: ["Main Entrance", "Ticket Barrier", "North Gate"],
        target: ["Auditorium", "Exhibition Hall", "Main Library"],
        decoy1: ["Cafe", "Gift Shop"],
        decoy2: ["Restrooms", "Cloakroom"]
      },
      audioSteps: [
        "Come in through the {start} into the open square.",
        "Directly opposite the entrance, straight across the central fountain, is the {target}."
      ],
      stepCoords: [
        { x: 190, y: 250, label: "{start}" },
        { x: 190, y: 70, label: "{target}" }
      ],
      candidateSlots: [
        { id: "target", x: 190, y: 70, isAnswer: true },
        { id: "decoy1", x: 70, y: 140, isAnswer: false },
        { id: "decoy2", x: 310, y: 140, isAnswer: false },
        { id: "decoy3", x: 70, y: 70, isAnswer: false }
      ],
      teaching: "'Opposite / directly across'：与出发点或参照物成 180 度正对直线，穿过中间空地即达。"
    },

    // 5. On the other side of the bridge/river (桥梁另一侧)
    {
      id: "sp-other-side-bridge",
      relation: "on the other side of",
      title: "On the Other Side 跨过河流/另一侧",
      layoutType: "river_crossing",
      slots: {
        start: ["Car Park", "South Path", "Ticket Kiosk"],
        mid: ["Wooden Bridge", "Footbridge", "Stone Arch"],
        target: ["Nature Trail Starting Point", "Bird Hide", "Campground"],
        decoy1: ["Boat Hire Shed", "Picnic Tables"]
      },
      audioSteps: [
        "Leave the {start} and proceed north towards the river.",
        "Cross over the {mid}.",
        "On the other side of the river, immediately to your right, you'll spot the {target}."
      ],
      stepCoords: [
        { x: 190, y: 250, label: "{start}" },
        { x: 190, y: 140, label: "{mid}" },
        { x: 280, y: 90, label: "{target}" }
      ],
      candidateSlots: [
        { id: "decoy1", x: 100, y: 90, isAnswer: false },
        { id: "target", x: 280, y: 90, isAnswer: true },
        { id: "decoy2", x: 280, y: 190, isAnswer: false },
        { id: "decoy3", x: 100, y: 190, isAnswer: false }
      ],
      teaching: "'On the other side of'：关键在于必须跨过河流或界线。过桥后在对岸寻找目标。"
    },

    // 6. At the far end of the corridor / path (走廊或道路尽头)
    {
      id: "sp-end-of-corridor",
      relation: "at the end of",
      title: "At the Far End 尽头/走廊最深处",
      layoutType: "long_corridor",
      slots: {
        start: ["Reception", "Entrance Hall", "Front Foyer"],
        target: ["Conference Room", "Archive Vault", "Director's Office"],
        decoy1: ["Meeting Room A", "Coffee Lounge"],
        decoy2: ["Restrooms"]
      },
      audioSteps: [
        "From the {start}, walk down the long eastern corridor.",
        "Do not turn off into any side doors.",
        "The {target} is situated right at the far end of the hallway."
      ],
      stepCoords: [
        { x: 50, y: 140, label: "{start}" },
        { x: 180, y: 140, label: "Midway" },
        { x: 310, y: 140, label: "{target}" }
      ],
      candidateSlots: [
        { id: "decoy1", x: 160, y: 70, isAnswer: false },
        { id: "decoy2", x: 230, y: 70, isAnswer: false },
        { id: "target", x: 310, y: 140, isAnswer: true },
        { id: "decoy3", x: 160, y: 210, isAnswer: false }
      ],
      teaching: "'At the far end / at the end of'：走到最底部，路已经无法继续往前延伸的尽头位置。"
    },

    // 7. First building on the right (右手边第一栋)
    {
      id: "sp-first-building-right",
      relation: "first building on the right",
      title: "First Building on the Right 右侧第一栋",
      layoutType: "avenue_row",
      slots: {
        start: ["Main Gate", "Visitor Parking", "South Entrance"],
        target: ["Souvenir Shop", "Ticket Booth", "Bicycle Rental"],
        decoy1: ["Cafeteria", "Lecture Theatre"],
        decoy2: ["Science Lab"]
      },
      audioSteps: [
        "Enter through the {start} and walk north up Avenue Road.",
        "The {target} is the very first building on your right."
      ],
      stepCoords: [
        { x: 190, y: 260, label: "{start}" },
        { x: 190, y: 190, label: "On Avenue" },
        { x: 275, y: 190, label: "{target}" }
      ],
      candidateSlots: [
        { id: "decoy1", x: 105, y: 190, isAnswer: false },
        { id: "target", x: 275, y: 190, isAnswer: true },
        { id: "decoy2", x: 275, y: 100, isAnswer: false },
        { id: "decoy3", x: 105, y: 100, isAnswer: false }
      ],
      teaching: "'First building on your right'：以自己的行进方向为基准，右侧遇到的第 1 栋建筑。"
    },

    // 8. Second building on the left (左手边第二栋)
    {
      id: "sp-second-building-left",
      relation: "second building on the left",
      title: "Second Building on the Left 左侧第二栋",
      layoutType: "avenue_row",
      slots: {
        start: ["North Gate", "Bus Stop", "Main Drop-off"],
        target: ["Chemistry Lab", "Art Studio", "Language Centre"],
        decoy1: ["Admin Block", "First Aid Room"],
        decoy2: ["Library Annex"]
      },
      audioSteps: [
        "Head south along the central walkway from the {start}.",
        "The first building on the left is {decoy1}.",
        "The {target} is the second building on the left."
      ],
      stepCoords: [
        { x: 190, y: 30, label: "{start}" },
        { x: 190, y: 100, label: "Past 1st" },
        { x: 105, y: 180, label: "{target}" }
      ],
      candidateSlots: [
        { id: "decoy1", x: 105, y: 90, isAnswer: false },
        { id: "target", x: 105, y: 180, isAnswer: true },
        { id: "decoy2", x: 275, y: 90, isAnswer: false },
        { id: "decoy3", x: 275, y: 180, isAnswer: false }
      ],
      teaching: "'Second building on the left'：行进时要数清顺序，忽略第 1 栋，选择第 2 栋建筑！"
    },

    // 9. Just before the junction / bend (转弯/路口之前)
    {
      id: "sp-before-bend",
      relation: "before",
      title: "Just Before the Bend 拐弯之前",
      layoutType: "curved_road",
      slots: {
        start: ["South Entry", "Pavilion", "Courtyard"],
        target: ["Information Board", "Drinking Fountain", "Luggage Locker"],
        decoy1: ["Observation Tower", "Windmill"]
      },
      audioSteps: [
        "Follow the main curved road heading towards the lake.",
        "Just before you get to the sharp bend, you will see the {target} on your left."
      ],
      stepCoords: [
        { x: 190, y: 250, label: "{start}" },
        { x: 190, y: 170, label: "Before bend" },
        { x: 110, y: 170, label: "{target}" }
      ],
      candidateSlots: [
        { id: "target", x: 110, y: 170, isAnswer: true },
        { id: "decoy1", x: 110, y: 80, isAnswer: false },
        { id: "decoy2", x: 270, y: 80, isAnswer: false },
        { id: "decoy3", x: 270, y: 170, isAnswer: false }
      ],
      teaching: "'Just before'：千万不能过了转弯处，是在到达弯道前的路段侧边。"
    },

    // 10. Just after the crossroads (刚过十字路口)
    {
      id: "sp-after-crossroads",
      relation: "after",
      title: "Just After the Crossroads 刚过十字路口",
      layoutType: "crossroads_scene",
      slots: {
        start: ["Main Entrance", "Carpark A", "Plaza"],
        target: ["Post Office", "Pharmacy", "Newsagent"],
        decoy1: ["Bakery", "Bank"],
        decoy2: ["Flower Stall"]
      },
      audioSteps: [
        "Walk straight ahead along High Street.",
        "Cross straight over the crossroads without turning.",
        "Just after the crossroads, the {target} is immediately on your right."
      ],
      stepCoords: [
        { x: 190, y: 260, label: "{start}" },
        { x: 190, y: 140, label: "Crossroads" },
        { x: 260, y: 80, label: "{target}" }
      ],
      candidateSlots: [
        { id: "decoy1", x: 260, y: 190, isAnswer: false },
        { id: "decoy2", x: 120, y: 80, isAnswer: false },
        { id: "target", x: 260, y: 80, isAnswer: true },
        { id: "decoy3", x: 120, y: 190, isAnswer: false }
      ],
      teaching: "'Just after'：穿过了十字路口之后才到达的区域。"
    },

    // 11. Next to the lake on the eastern shore (湖泊东岸紧邻)
    {
      id: "sp-lake-eastern-shore",
      relation: "next to",
      title: "On the Eastern Bank 湖泊东岸",
      layoutType: "lake_shore",
      slots: {
        start: ["Visitor Centre", "West Entrance", "Ferry Pier"],
        mid: ["Duck Pond", "Boating Lake", "Fish Pool"],
        target: ["Bird Watching Hut", "Tea Pavilion", "Picnic Shelter"],
        decoy1: ["Children's Playground", "Boat House"]
      },
      audioSteps: [
        "From the {start}, skirt along the southern perimeter of the {mid}.",
        "On the far eastern shore of the {mid}, right next to the water, you will reach the {target}."
      ],
      stepCoords: [
        { x: 80, y: 220, label: "{start}" },
        { x: 190, y: 230, label: "South side" },
        { x: 300, y: 140, label: "{target}" }
      ],
      candidateSlots: [
        { id: "decoy1", x: 80, y: 140, isAnswer: false },
        { id: "target", x: 300, y: 140, isAnswer: true },
        { id: "decoy2", x: 190, y: 55, isAnswer: false },
        { id: "decoy3", x: 190, y: 235, isAnswer: false }
      ],
      teaching: "'Eastern shore/bank'：紧挨水域东侧（地图右侧边缘）。"
    },

    // 12. Diagonally opposite (对角线斜对面)
    {
      id: "sp-diagonally-opposite",
      relation: "opposite",
      title: "Diagonally Opposite 对角斜对面",
      layoutType: "crossroads_scene",
      slots: {
        start: ["Southwest Gate", "Bus Terminal", "Station Square"],
        mid: ["Bank", "Supermarket", "Town Hall"],
        target: ["Modern Art Gallery", "Cinema", "Gymnasium"],
        decoy1: ["Pharmacy", "Bookstore"]
      },
      audioSteps: [
        "You are standing outside the {mid} on the southwest corner of the intersection.",
        "Diagonally opposite across the junction, on the northeast corner, is the {target}."
      ],
      stepCoords: [
        { x: 90, y: 210, label: "{mid}" },
        { x: 290, y: 70, label: "{target}" }
      ],
      candidateSlots: [
        { id: "decoy1", x: 90, y: 70, isAnswer: false },
        { id: "decoy2", x: 290, y: 210, isAnswer: false },
        { id: "target", x: 290, y: 70, isAnswer: true },
        { id: "decoy3", x: 190, y: 140, isAnswer: false }
      ],
      teaching: "'Diagonally opposite'：十字路口的对角线方向（如从西南角看东北角）。"
    },

    // 13. Through the courtyard and beyond the fountain (穿过庭院越过喷泉)
    {
      id: "sp-courtyard-fountain-beyond",
      relation: "beyond",
      title: "Beyond the Fountain 越过喷泉深处",
      layoutType: "garden_fountain",
      slots: {
        start: ["Palace Gate", "Museum Entry", "Campus Archway"],
        mid: ["Central Fountain", "Sunken Garden", "Clock Tower"],
        target: ["Sculpture Gallery", "Royal Conservatory", "Memorial Chapel"],
        decoy1: ["Coffee Kiosk", "Gift Shop"]
      },
      audioSteps: [
        "Proceed through the {start} into the open garden.",
        "Walk straight ahead until you reach the {mid}.",
        "Beyond the {mid}, right at the rear wall, stands the {target}."
      ],
      stepCoords: [
        { x: 190, y: 250, label: "{start}" },
        { x: 190, y: 150, label: "{mid}" },
        { x: 190, y: 50, label: "{target}" }
      ],
      candidateSlots: [
        { id: "decoy1", x: 80, y: 150, isAnswer: false },
        { id: "decoy2", x: 300, y: 150, isAnswer: false },
        { id: "target", x: 190, y: 50, isAnswer: true },
        { id: "decoy3", x: 80, y: 50, isAnswer: false }
      ],
      teaching: "'Beyond the {mid}'：越过中部的地标物后继续往前，靠在后墙处。"
    },

    // 14. In the recess behind the main hall (后侧凹角处)
    {
      id: "sp-recess-behind",
      relation: "next to",
      title: "Tucked in the Recess 凹角回廊处",
      layoutType: "u_shaped_hall",
      slots: {
        start: ["Front Reception", "Lobby", "Ticket Counter"],
        mid: ["Great Hall", "Assembly Room", "Main Auditorium"],
        target: ["First Aid Station", "Baby Care Room", "Luggage Storage"],
        decoy1: ["Restrooms", "Vending Area"]
      },
      audioSteps: [
        "Walk down the west corridor alongside the {mid}.",
        "In the quiet recess tucked behind the northwest corner of the {mid}, you'll discover the {target}."
      ],
      stepCoords: [
        { x: 190, y: 240, label: "{start}" },
        { x: 90, y: 150, label: "West Corridor" },
        { x: 90, y: 60, label: "{target}" }
      ],
      candidateSlots: [
        { id: "target", x: 90, y: 60, isAnswer: true },
        { id: "decoy1", x: 290, y: 60, isAnswer: false },
        { id: "decoy2", x: 90, y: 160, isAnswer: false },
        { id: "decoy3", x: 290, y: 160, isAnswer: false }
      ],
      teaching: "'Tucked in the recess / corner'：隐藏在大楼拐角处的凹入空间。"
    },

    // 15. Where the road forks (岔路口分道处)
    {
      id: "sp-fork-choice",
      relation: "at the end of",
      title: "At the Fork 道路分岔口",
      layoutType: "fork_scene",
      slots: {
        start: ["South Park Gate", "Ranger Post", "Camp Entry"],
        target: ["Wildlife Sanctuary", "Botanical Nursery", "Forest Pavilion"],
        decoy1: ["Children's Maze", "Horse Riding Ring"]
      },
      audioSteps: [
        "Walk north along the gravel track from the {start}.",
        "When the track forks, take the right branch.",
        "Follow it to the end where you will find the {target}."
      ],
      stepCoords: [
        { x: 190, y: 250, label: "{start}" },
        { x: 190, y: 150, label: "Fork" },
        { x: 290, y: 60, label: "{target}" }
      ],
      candidateSlots: [
        { id: "decoy1", x: 90, y: 60, isAnswer: false },
        { id: "target", x: 290, y: 60, isAnswer: true },
        { id: "decoy2", x: 190, y: 60, isAnswer: false },
        { id: "decoy3", x: 290, y: 160, isAnswer: false }
      ],
      teaching: "'Where the track forks'：道路分成两岔，按指令选择 right branch 并走到尽头。"
    }
  ];

  window.MAP_SPATIAL_DATA = SPATIAL_TEMPLATES;
})();
