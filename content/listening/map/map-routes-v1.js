// 雅思听力全矢量路线地图场景包 (map-routes-v1)
// 包含 10 套全矢量地图场景与 30+ 条跟随导览路线
(() => {
  "use strict";

  const MAP_ROUTES_PACK_V1 = {
  "packId": "map-routes-v1",
  "version": "1.0.0",
  "domain": "listening",
  "contentType": "map",
  "subType": "route_scenario",
  "canonical": true,
  "expectedCount": 10,
  "metadata": {
    "sourceType": "human_curated",
    "sourceRef": "雅思听力路线跟随矢量地图题库",
    "origin": "bundled",
    "reviewStatus": "imported",
    "status": "active",
    "tags": [
      "listening",
      "map",
      "routes",
      "tracking"
    ]
  },
  "items": [
    {
      "id": "map-wetland",
      "title": "湿地自然公园 (Wetland Nature Reserve)",
      "context": "公园管理员正在向游客介绍设施分布与参观路线",
      "mapWidth": 460,
      "mapHeight": 340,
      "startPoint": {
        "x": 230,
        "y": 315,
        "label": "Main Entrance (You are here)"
      },
      "svgFeatures": {
        "rivers": [
          "M 0 110 C 120 90, 200 140, 460 100 L 460 135 C 200 175, 120 125, 0 145 Z"
        ],
        "roads": [
          "M 230 325 L 230 170",
          "M 230 170 L 100 170 L 100 80",
          "M 230 170 L 360 170 L 360 80"
        ],
        "bridges": [
          {
            "x": 88,
            "y": 108,
            "w": 24,
            "h": 20
          },
          {
            "x": 348,
            "y": 100,
            "w": 24,
            "h": 20
          }
        ],
        "landmarks": [
          {
            "name": "Pond",
            "type": "water",
            "x": 130,
            "y": 210,
            "w": 60,
            "h": 45,
            "rx": 20
          },
          {
            "name": "Pine Trees",
            "type": "trees",
            "x": 270,
            "y": 210,
            "w": 60,
            "h": 50
          },
          {
            "name": "Café",
            "type": "building",
            "x": 45,
            "y": 190,
            "w": 45,
            "h": 30
          }
        ]
      },
      "candidatePositions": [
        {
          "slotId": "pos_1",
          "x": 50,
          "y": 55,
          "name": "Bird Hide (观鸟掩体)"
        },
        {
          "slotId": "pos_2",
          "x": 145,
          "y": 55,
          "name": "Duck Breeding Centre (野鸭繁育站)"
        },
        {
          "slotId": "pos_3",
          "x": 320,
          "y": 55,
          "name": "Education Pavilion (生态科普亭)"
        },
        {
          "slotId": "pos_4",
          "x": 405,
          "y": 55,
          "name": "Wildlife Research Hut (科研小屋)"
        },
        {
          "slotId": "pos_5",
          "x": 330,
          "y": 210,
          "name": "Picnic Shelter (野餐凉亭)"
        }
      ],
      "routes": [
        {
          "id": "w1",
          "targetSlotId": "pos_1",
          "question": "Where is the Bird Hide (观鸟掩体)?",
          "steps": [
            {
              "text": "We are starting here at the main entrance, facing north.",
              "audioText": "We are starting here at the main entrance, facing north.",
              "coord": {
                "x": 230,
                "y": 315
              }
            },
            {
              "text": "Walk straight ahead along the central gravel path.",
              "audioText": "Walk straight ahead along the central gravel path.",
              "coord": {
                "x": 230,
                "y": 230
              }
            },
            {
              "text": "Pass the pond on your left and the pine trees on your right.",
              "audioText": "Pass the pond on your left and the pine trees on your right.",
              "coord": {
                "x": 230,
                "y": 180
              }
            },
            {
              "text": "When you reach the T-junction, turn left.",
              "audioText": "When you reach the T-junction, turn left.",
              "coord": {
                "x": 160,
                "y": 170
              }
            },
            {
              "text": "Cross the wooden bridge across the river.",
              "audioText": "Cross the wooden bridge across the river.",
              "coord": {
                "x": 100,
                "y": 100
              }
            },
            {
              "text": "The Bird Hide is the building directly ahead of you on the left.",
              "audioText": "The Bird Hide is the building directly ahead of you on the left.",
              "coord": {
                "x": 50,
                "y": 55
              }
            }
          ],
          "pathCoords": [
            [
              230,
              315
            ],
            [
              230,
              170
            ],
            [
              100,
              170
            ],
            [
              100,
              95
            ],
            [
              50,
              55
            ]
          ],
          "explanation": "入口正北出发 -> 经过左侧池塘右侧松林 -> 丁字路口左转 -> 过西侧木桥后左前方即为目标。"
        },
        {
          "id": "w2",
          "targetSlotId": "pos_3",
          "question": "Where is the Education Pavilion (生态科普亭)?",
          "steps": [
            {
              "text": "Start from the main entrance and head straight up the path.",
              "audioText": "Start from the main entrance and head straight up the path.",
              "coord": {
                "x": 230,
                "y": 315
              }
            },
            {
              "text": "Continue all the way to the junction in the middle.",
              "audioText": "Continue all the way to the junction in the middle.",
              "coord": {
                "x": 230,
                "y": 170
              }
            },
            {
              "text": "Take the right fork and follow the path to the eastern bridge.",
              "audioText": "Take the right fork and follow the path to the eastern bridge.",
              "coord": {
                "x": 300,
                "y": 170
              }
            },
            {
              "text": "Cross over the bridge to the north bank.",
              "audioText": "Cross over the bridge to the north bank.",
              "coord": {
                "x": 360,
                "y": 100
              }
            },
            {
              "text": "The Education Pavilion is situated on your left as soon as you cross the bridge.",
              "audioText": "The Education Pavilion is situated on your left as soon as you cross the bridge.",
              "coord": {
                "x": 320,
                "y": 55
              }
            }
          ],
          "pathCoords": [
            [
              230,
              315
            ],
            [
              230,
              170
            ],
            [
              360,
              170
            ],
            [
              360,
              95
            ],
            [
              320,
              55
            ]
          ],
          "explanation": "主入口直走至十字口 -> 右转前往东桥 -> 过桥后左手边的建筑即为目标。"
        },
        {
          "id": "w3",
          "targetSlotId": "pos_5",
          "question": "Where is the Picnic Shelter (野餐凉亭)?",
          "steps": [
            {
              "text": "From the entrance, walk north along the path.",
              "audioText": "From the entrance, walk north along the path.",
              "coord": {
                "x": 230,
                "y": 315
              }
            },
            {
              "text": "Before you reach the main junction, look to your right.",
              "audioText": "Before you reach the main junction, look to your right.",
              "coord": {
                "x": 230,
                "y": 220
              }
            },
            {
              "text": "Just beyond the grove of pine trees is the Picnic Shelter.",
              "audioText": "Just beyond the grove of pine trees is the Picnic Shelter.",
              "coord": {
                "x": 330,
                "y": 210
              }
            }
          ],
          "pathCoords": [
            [
              230,
              315
            ],
            [
              230,
              220
            ],
            [
              330,
              210
            ]
          ],
          "explanation": "主入口往北 -> 在到达主路口前向右看 -> 松树林后方东侧的建筑即为目标。"
        }
      ]
    },
    {
      "id": "map-farm",
      "title": "历史民俗农场 (Heritage Historical Farm)",
      "context": "向导向游客讲解古老农场各工坊分布",
      "mapWidth": 460,
      "mapHeight": 340,
      "startPoint": {
        "x": 90,
        "y": 310,
        "label": "Ticket Office (You are here)"
      },
      "svgFeatures": {
        "roads": [
          "M 90 320 L 90 120",
          "M 90 120 L 250 120",
          "M 250 120 L 250 250",
          "M 90 120 L 90 50 L 200 50",
          "M 250 120 L 390 120"
        ],
        "landmarks": [
          {
            "name": "Great Barn",
            "type": "building",
            "x": 120,
            "y": 150,
            "w": 100,
            "h": 70
          },
          {
            "name": "Duck Pond",
            "type": "water",
            "x": 280,
            "y": 150,
            "w": 70,
            "h": 50,
            "rx": 25
          },
          {
            "name": "Apple Orchard",
            "type": "trees",
            "x": 280,
            "y": 40,
            "w": 90,
            "h": 60
          }
        ]
      },
      "candidatePositions": [
        {
          "slotId": "pos_1",
          "x": 230,
          "y": 45,
          "name": "Smithy (铁匠铺)"
        },
        {
          "slotId": "pos_2",
          "x": 395,
          "y": 45,
          "name": "Stables (马厩)"
        },
        {
          "slotId": "pos_3",
          "x": 405,
          "y": 120,
          "name": "Farmhouse Bakery (农家面包房)"
        },
        {
          "slotId": "pos_4",
          "x": 250,
          "y": 275,
          "name": "Wool Spinning Shed (毛纺工坊)"
        },
        {
          "slotId": "pos_5",
          "x": 45,
          "y": 150,
          "name": "Dairy House (奶酪作坊)"
        }
      ],
      "routes": [
        {
          "id": "f1",
          "targetSlotId": "pos_1",
          "question": "Where is the Smithy (铁匠铺)?",
          "steps": [
            {
              "text": "We are currently standing by the Ticket Office.",
              "audioText": "We are currently standing by the Ticket Office.",
              "coord": {
                "x": 90,
                "y": 310
              }
            },
            {
              "text": "Walk north along the road, passing the Dairy House on your left.",
              "audioText": "Walk north along the road, passing the Dairy House on your left.",
              "coord": {
                "x": 90,
                "y": 200
              }
            },
            {
              "text": "Continue past the junction and keep following the path as it bends north and east.",
              "audioText": "Continue past the junction and keep following the path as it bends north and east.",
              "coord": {
                "x": 90,
                "y": 50
              }
            },
            {
              "text": "Walk to the far end of this northern path.",
              "audioText": "Walk to the far end of this northern path.",
              "coord": {
                "x": 170,
                "y": 50
              }
            },
            {
              "text": "The Smithy is the building right at the dead end.",
              "audioText": "The Smithy is the building right at the dead end.",
              "coord": {
                "x": 230,
                "y": 45
              }
            }
          ],
          "pathCoords": [
            [
              90,
              310
            ],
            [
              90,
              50
            ],
            [
              230,
              50
            ]
          ],
          "explanation": "售票处向北 -> 顺小路向北再折向东 -> 死胡同尽头的工坊即为目标。"
        },
        {
          "id": "f2",
          "targetSlotId": "pos_3",
          "question": "Where is the Farmhouse Bakery (农家面包房)?",
          "steps": [
            {
              "text": "Starting from the Ticket Office, head up the lane.",
              "audioText": "Starting from the Ticket Office, head up the lane.",
              "coord": {
                "x": 90,
                "y": 310
              }
            },
            {
              "text": "At the first major crossroads, turn right.",
              "audioText": "At the first major crossroads, turn right.",
              "coord": {
                "x": 90,
                "y": 120
              }
            },
            {
              "text": "Walk past the Great Barn on your right and the pond on your left.",
              "audioText": "Walk past the Great Barn on your right and the pond on your left.",
              "coord": {
                "x": 220,
                "y": 120
              }
            },
            {
              "text": "Keep going straight until the path terminates.",
              "audioText": "Keep going straight until the path terminates.",
              "coord": {
                "x": 330,
                "y": 120
              }
            },
            {
              "text": "The Farmhouse Bakery is situated at the far eastern end of the path.",
              "audioText": "The Farmhouse Bakery is situated at the far eastern end of the path.",
              "coord": {
                "x": 405,
                "y": 120
              }
            }
          ],
          "pathCoords": [
            [
              90,
              310
            ],
            [
              90,
              120
            ],
            [
              405,
              120
            ]
          ],
          "explanation": "主路口右拐一路向东 -> 经过大谷仓与池塘 -> 东侧尽头即为面包房。"
        },
        {
          "id": "f3",
          "targetSlotId": "pos_4",
          "question": "Where is the Wool Spinning Shed (毛纺工坊)?",
          "steps": [
            {
              "text": "From the Ticket Office, go north along the track.",
              "audioText": "From the Ticket Office, go north along the track.",
              "coord": {
                "x": 90,
                "y": 310
              }
            },
            {
              "text": "Turn right and walk east along the side of the Great Barn.",
              "audioText": "Turn right and walk east along the side of the Great Barn.",
              "coord": {
                "x": 170,
                "y": 120
              }
            },
            {
              "text": "When you reach the eastern corner of the barn, turn south.",
              "audioText": "When you reach the eastern corner of the barn, turn south.",
              "coord": {
                "x": 250,
                "y": 150
              }
            },
            {
              "text": "The Wool Spinning Shed is the building right at the southern tip of this lane.",
              "audioText": "The Wool Spinning Shed is the building right at the southern tip of this lane.",
              "coord": {
                "x": 250,
                "y": 275
              }
            }
          ],
          "pathCoords": [
            [
              90,
              310
            ],
            [
              90,
              120
            ],
            [
              250,
              120
            ],
            [
              250,
              275
            ]
          ],
          "explanation": "售票处向北右转 -> 绕行大谷仓东墙南拐 -> 巷子最南端即为目标。"
        }
      ]
    },
    {
      "id": "map-campus",
      "title": "大学校园中心 (University Campus)",
      "context": "新生报到日志愿者正在向新生介绍核心学术与生活设施",
      "mapWidth": 460,
      "mapHeight": 340,
      "startPoint": {
        "x": 230,
        "y": 320,
        "label": "Main Archway (You are here)"
      },
      "svgFeatures": {
        "roads": [
          "M 230 330 L 230 190",
          "M 230 190 L 80 190 L 80 70",
          "M 230 190 L 380 190 L 380 70",
          "M 80 70 L 380 70"
        ],
        "landmarks": [
          {
            "name": "Clock Tower Plaza",
            "type": "building",
            "x": 190,
            "y": 165,
            "w": 80,
            "h": 50
          },
          {
            "name": "Central Lawn",
            "type": "trees",
            "x": 120,
            "y": 90,
            "w": 220,
            "h": 70,
            "rx": 12
          },
          {
            "name": "Fountain",
            "type": "water",
            "x": 215,
            "y": 110,
            "w": 30,
            "h": 30,
            "rx": 15
          }
        ]
      },
      "candidatePositions": [
        {
          "slotId": "pos_1",
          "x": 45,
          "y": 70,
          "name": "Career Services Centre (就业指导中心)"
        },
        {
          "slotId": "pos_2",
          "x": 230,
          "y": 45,
          "name": "Main Library (主图书馆)"
        },
        {
          "slotId": "pos_3",
          "x": 415,
          "y": 70,
          "name": "Computer Science Annex (计科馆)"
        },
        {
          "slotId": "pos_4",
          "x": 45,
          "y": 190,
          "name": "Student Union Lounge (学联活动厅)"
        },
        {
          "slotId": "pos_5",
          "x": 415,
          "y": 190,
          "name": "Campus Bookstore (校园书店)"
        }
      ],
      "routes": [
        {
          "id": "c1",
          "targetSlotId": "pos_2",
          "question": "Where is the Main Library (主图书馆)?",
          "steps": [
            {
              "text": "You are standing at the Main Archway facing into the campus.",
              "audioText": "You are standing at the Main Archway facing into the campus.",
              "coord": {
                "x": 230,
                "y": 320
              }
            },
            {
              "text": "Walk up past the Clock Tower Plaza.",
              "audioText": "Walk up past the Clock Tower Plaza.",
              "coord": {
                "x": 230,
                "y": 180
              }
            },
            {
              "text": "Take the path skirting around the Central Lawn and the Fountain.",
              "audioText": "Take the path skirting around the Central Lawn and the Fountain.",
              "coord": {
                "x": 230,
                "y": 100
              }
            },
            {
              "text": "The large imposing building directly on the northern boundary is the Main Library.",
              "audioText": "The large imposing building directly on the northern boundary is the Main Library.",
              "coord": {
                "x": 230,
                "y": 45
              }
            }
          ],
          "pathCoords": [
            [
              230,
              320
            ],
            [
              230,
              180
            ],
            [
              230,
              90
            ],
            [
              230,
              45
            ]
          ],
          "explanation": "主拱门往北 -> 穿过钟楼广场与中央草坪 -> 最北端主轴线上的大楼即为主图书馆。"
        },
        {
          "id": "c2",
          "targetSlotId": "pos_1",
          "question": "Where is the Career Services Centre (就业指导中心)?",
          "steps": [
            {
              "text": "Start from the Main Archway.",
              "audioText": "Start from the Main Archway.",
              "coord": {
                "x": 230,
                "y": 320
              }
            },
            {
              "text": "Walk north until you hit the Clock Tower Plaza, then turn left.",
              "audioText": "Walk north until you hit the Clock Tower Plaza, then turn left.",
              "coord": {
                "x": 160,
                "y": 190
              }
            },
            {
              "text": "Follow the walkway west until you reach the corner, then turn right to go north.",
              "audioText": "Follow the walkway west until you reach the corner, then turn right to go north.",
              "coord": {
                "x": 80,
                "y": 130
              }
            },
            {
              "text": "The Career Services Centre is the building at the northwest corner of the walkway.",
              "audioText": "The Career Services Centre is the building at the northwest corner of the walkway.",
              "coord": {
                "x": 45,
                "y": 70
              }
            }
          ],
          "pathCoords": [
            [
              230,
              320
            ],
            [
              230,
              190
            ],
            [
              80,
              190
            ],
            [
              80,
              70
            ],
            [
              45,
              70
            ]
          ],
          "explanation": "主拱门向北 -> 钟楼左拐向西 -> 尽头向北折行 -> 西北角的建筑即为目标。"
        },
        {
          "id": "c3",
          "targetSlotId": "pos_5",
          "question": "Where is the Campus Bookstore (校园书店)?",
          "steps": [
            {
              "text": "From the entrance archway, proceed straight north.",
              "audioText": "From the entrance archway, proceed straight north.",
              "coord": {
                "x": 230,
                "y": 320
              }
            },
            {
              "text": "Turn right immediately before the Clock Tower.",
              "audioText": "Turn right immediately before the Clock Tower.",
              "coord": {
                "x": 300,
                "y": 190
              }
            },
            {
              "text": "The Campus Bookstore is located right at the eastern end of this southern avenue.",
              "audioText": "The Campus Bookstore is located right at the eastern end of this southern avenue.",
              "coord": {
                "x": 415,
                "y": 190
              }
            }
          ],
          "pathCoords": [
            [
              230,
              320
            ],
            [
              230,
              190
            ],
            [
              415,
              190
            ]
          ],
          "explanation": "入口向北 -> 钟楼前右转一路向东 -> 走到底就是书店。"
        }
      ]
    },
    {
      "id": "map-botanical",
      "title": "国家植物园 (National Botanical Gardens)",
      "context": "植物园园艺师引导观众探索各专类温室与花园",
      "mapWidth": 460,
      "mapHeight": 340,
      "startPoint": {
        "x": 70,
        "y": 310,
        "label": "Welcome Pavilion (You are here)"
      },
      "svgFeatures": {
        "roads": [
          "M 70 320 L 70 180",
          "M 70 180 Q 70 80 180 80 L 370 80",
          "M 180 80 L 180 260 L 370 260"
        ],
        "landmarks": [
          {
            "name": "Palm Greenhouse",
            "type": "building",
            "x": 95,
            "y": 130,
            "w": 75,
            "h": 50
          },
          {
            "name": "Hedge Maze",
            "type": "trees",
            "x": 220,
            "y": 120,
            "w": 90,
            "h": 90
          },
          {
            "name": "Water Lily Pond",
            "type": "water",
            "x": 340,
            "y": 140,
            "w": 60,
            "h": 60,
            "rx": 30
          }
        ]
      },
      "candidatePositions": [
        {
          "slotId": "pos_1",
          "x": 180,
          "y": 40,
          "name": "Rose Pergola (玫瑰花架)"
        },
        {
          "slotId": "pos_2",
          "x": 405,
          "y": 75,
          "name": "Butterfly House (蝴蝶生态馆)"
        },
        {
          "slotId": "pos_3",
          "x": 405,
          "y": 260,
          "name": "Herbarium & Seed Vault (种子标本馆)"
        },
        {
          "slotId": "pos_4",
          "x": 265,
          "y": 290,
          "name": "Tea Terrace (茶歇露台)"
        },
        {
          "slotId": "pos_5",
          "x": 40,
          "y": 130,
          "name": "Cactus Display (仙人掌展区)"
        }
      ],
      "routes": [
        {
          "id": "b1",
          "targetSlotId": "pos_2",
          "question": "Where is the Butterfly House (蝴蝶生态馆)?",
          "steps": [
            {
              "text": "Start at the Welcome Pavilion in the southwest corner.",
              "audioText": "Start at the Welcome Pavilion in the southwest corner.",
              "coord": {
                "x": 70,
                "y": 310
              }
            },
            {
              "text": "Follow the winding path northward, curving around the Palm Greenhouse.",
              "audioText": "Follow the winding path northward, curving around the Palm Greenhouse.",
              "coord": {
                "x": 70,
                "y": 130
              }
            },
            {
              "text": "Turn east along the top perimeter path.",
              "audioText": "Turn east along the top perimeter path.",
              "coord": {
                "x": 230,
                "y": 80
              }
            },
            {
              "text": "Continue all the way past the Hedge Maze to the far northeastern corner.",
              "audioText": "Continue all the way past the Hedge Maze to the far northeastern corner.",
              "coord": {
                "x": 360,
                "y": 80
              }
            },
            {
              "text": "The Butterfly House is the glass structure right at the end on your right.",
              "audioText": "The Butterfly House is the glass structure right at the end on your right.",
              "coord": {
                "x": 405,
                "y": 75
              }
            }
          ],
          "pathCoords": [
            [
              70,
              310
            ],
            [
              70,
              180
            ],
            [
              70,
              80
            ],
            [
              405,
              80
            ]
          ],
          "explanation": "西南门出发 -> 沿路弧形绕过棕榈温室 -> 沿顶部北路向东走到底即为蝴蝶馆。"
        },
        {
          "id": "b2",
          "targetSlotId": "pos_3",
          "question": "Where is the Herbarium & Seed Vault (种子标本馆)?",
          "steps": [
            {
              "text": "Leave the Welcome Pavilion and walk up to the Palm Greenhouse.",
              "audioText": "Leave the Welcome Pavilion and walk up to the Palm Greenhouse.",
              "coord": {
                "x": 70,
                "y": 310
              }
            },
            {
              "text": "Follow the curve around to the junction above the maze, and take the southbound path.",
              "audioText": "Follow the curve around to the junction above the maze, and take the southbound path.",
              "coord": {
                "x": 180,
                "y": 160
              }
            },
            {
              "text": "Turn east onto the southern path beneath the maze.",
              "audioText": "Turn east onto the southern path beneath the maze.",
              "coord": {
                "x": 260,
                "y": 260
              }
            },
            {
              "text": "The Seed Vault is the building at the southeast terminus of the path.",
              "audioText": "The Seed Vault is the building at the southeast terminus of the path.",
              "coord": {
                "x": 405,
                "y": 260
              }
            }
          ],
          "pathCoords": [
            [
              70,
              310
            ],
            [
              70,
              80
            ],
            [
              180,
              80
            ],
            [
              180,
              260
            ],
            [
              405,
              260
            ]
          ],
          "explanation": "绕到北路后南折 -> 沿迷宫南侧道路向东 -> 走到东南终点即为标本馆。"
        },
        {
          "id": "b3",
          "targetSlotId": "pos_1",
          "question": "Where is the Rose Pergola (玫瑰花架)?",
          "steps": [
            {
              "text": "Walk north from the entrance until the path bends eastward.",
              "audioText": "Walk north from the entrance until the path bends eastward.",
              "coord": {
                "x": 70,
                "y": 310
              }
            },
            {
              "text": "Just where the path levels out to run along the north of the gardens, look to the north side of the path.",
              "audioText": "Just where the path levels out to run along the north of the gardens, look to the north side of the path.",
              "coord": {
                "x": 180,
                "y": 80
              }
            },
            {
              "text": "The Rose Pergola is located directly on that northern edge.",
              "audioText": "The Rose Pergola is located directly on that northern edge.",
              "coord": {
                "x": 180,
                "y": 40
              }
            }
          ],
          "pathCoords": [
            [
              70,
              310
            ],
            [
              70,
              80
            ],
            [
              180,
              80
            ],
            [
              180,
              40
            ]
          ],
          "explanation": "顺小路拐弯后到达北侧通道起点，正北侧的棚架即为玫瑰花架。"
        }
      ]
    },
    {
      "id": "map-harbour",
      "title": "海滨港口码头景区 (Waterfront Harbour & Wharf)",
      "context": "海港巡逻员向游客介绍码头沿线游览景点",
      "mapWidth": 460,
      "mapHeight": 340,
      "startPoint": {
        "x": 230,
        "y": 320,
        "label": "Ferry Terminal Pier (You are here)"
      },
      "svgFeatures": {
        "rivers": [
          "M 0 0 L 460 0 L 460 140 C 320 120, 160 160, 0 130 Z"
        ],
        "roads": [
          "M 230 330 L 230 150",
          "M 230 200 L 90 200 L 90 90",
          "M 230 200 L 370 200 L 370 90",
          "M 90 90 L 370 90"
        ],
        "landmarks": [
          {
            "name": "Fish Market",
            "type": "building",
            "x": 120,
            "y": 220,
            "w": 80,
            "h": 50
          },
          {
            "name": "Dry Dock",
            "type": "water",
            "x": 270,
            "y": 220,
            "w": 70,
            "h": 50
          },
          {
            "name": "Lighthouse Pier",
            "type": "traffic",
            "x": 215,
            "y": 60,
            "w": 30,
            "h": 70
          }
        ]
      },
      "candidatePositions": [
        {
          "slotId": "pos_1",
          "x": 50,
          "y": 80,
          "name": "Maritime Museum (海事博物馆)"
        },
        {
          "slotId": "pos_2",
          "x": 230,
          "y": 45,
          "name": "Lighthouse Viewing Deck (灯塔观景台)"
        },
        {
          "slotId": "pos_3",
          "x": 410,
          "y": 80,
          "name": "Harbour Master's Office (港务长办公室)"
        },
        {
          "slotId": "pos_4",
          "x": 50,
          "y": 200,
          "name": "Lifeboat Station (救生艇站)"
        },
        {
          "slotId": "pos_5",
          "x": 410,
          "y": 200,
          "name": "Seafood Restaurant (海鲜餐厅)"
        }
      ],
      "routes": [
        {
          "id": "h1",
          "targetSlotId": "pos_1",
          "question": "Where is the Maritime Museum (海事博物馆)?",
          "steps": [
            {
              "text": "Start from the Ferry Terminal Pier heading north.",
              "audioText": "Start from the Ferry Terminal Pier heading north.",
              "coord": {
                "x": 230,
                "y": 320
              }
            },
            {
              "text": "Turn left onto Wharf Street just after the Fish Market.",
              "audioText": "Turn left onto Wharf Street just after the Fish Market.",
              "coord": {
                "x": 150,
                "y": 200
              }
            },
            {
              "text": "Turn right at the corner and walk towards the water.",
              "audioText": "Turn right at the corner and walk towards the water.",
              "coord": {
                "x": 90,
                "y": 130
              }
            },
            {
              "text": "The Maritime Museum is on your left on the northwestern shoreline.",
              "audioText": "The Maritime Museum is on your left on the northwestern shoreline.",
              "coord": {
                "x": 50,
                "y": 80
              }
            }
          ],
          "pathCoords": [
            [
              230,
              320
            ],
            [
              230,
              200
            ],
            [
              90,
              200
            ],
            [
              90,
              90
            ],
            [
              50,
              80
            ]
          ],
          "explanation": "渡轮码头向北 -> 鱼市后左拐向西 -> 尽头向北沿水岸走 -> 西北角即为海事博物馆。"
        },
        {
          "id": "h2",
          "targetSlotId": "pos_2",
          "question": "Where is the Lighthouse Viewing Deck (灯塔观景台)?",
          "steps": [
            {
              "text": "Leave the Ferry Terminal and continue straight ahead along the central pier.",
              "audioText": "Leave the Ferry Terminal and continue straight ahead along the central pier.",
              "coord": {
                "x": 230,
                "y": 320
              }
            },
            {
              "text": "Cross straight through the junction without turning.",
              "audioText": "Cross straight through the junction without turning.",
              "coord": {
                "x": 230,
                "y": 190
              }
            },
            {
              "text": "Proceed along the stone causeway projecting out into the harbour.",
              "audioText": "Proceed along the stone causeway projecting out into the harbour.",
              "coord": {
                "x": 230,
                "y": 100
              }
            },
            {
              "text": "At the very tip of the jetty stands the Lighthouse Viewing Deck.",
              "audioText": "At the very tip of the jetty stands the Lighthouse Viewing Deck.",
              "coord": {
                "x": 230,
                "y": 45
              }
            }
          ],
          "pathCoords": [
            [
              230,
              320
            ],
            [
              230,
              150
            ],
            [
              230,
              45
            ]
          ],
          "explanation": "中央防波堤一直笔直向北走到最突出的海中尽头即为灯塔观景台。"
        },
        {
          "id": "h3",
          "targetSlotId": "pos_5",
          "question": "Where is the Seafood Restaurant (海鲜餐厅)?",
          "steps": [
            {
              "text": "From the terminal pier, walk north towards the dry dock.",
              "audioText": "From the terminal pier, walk north towards the dry dock.",
              "coord": {
                "x": 230,
                "y": 320
              }
            },
            {
              "text": "Turn right onto the eastern promenade.",
              "audioText": "Turn right onto the eastern promenade.",
              "coord": {
                "x": 310,
                "y": 200
              }
            },
            {
              "text": "The Seafood Restaurant is the large venue at the end of the promenade on the right.",
              "audioText": "The Seafood Restaurant is the large venue at the end of the promenade on the right.",
              "coord": {
                "x": 410,
                "y": 200
              }
            }
          ],
          "pathCoords": [
            [
              230,
              320
            ],
            [
              230,
              200
            ],
            [
              410,
              200
            ]
          ],
          "explanation": "码头北上 -> 右转进入东侧滨海长廊 -> 尽头右手边即为海鲜餐厅。"
        }
      ]
    },
    {
      "id": "map-zoo",
      "title": "城市野生动物园 (City Wildlife Zoo)",
      "context": "动物园科普解说员向研学团队说明园区布局",
      "mapWidth": 460,
      "mapHeight": 340,
      "startPoint": {
        "x": 230,
        "y": 320,
        "label": "Visitor Gate (You are here)"
      },
      "svgFeatures": {
        "roads": [
          "M 230 330 L 230 230",
          "M 230 230 C 100 230, 80 100, 230 100",
          "M 230 230 C 360 230, 380 100, 230 100",
          "M 230 100 L 230 45"
        ],
        "landmarks": [
          {
            "name": "Flamingo Lake",
            "type": "water",
            "x": 190,
            "y": 135,
            "w": 80,
            "h": 60,
            "rx": 30
          },
          {
            "name": "Primate House",
            "type": "building",
            "x": 60,
            "y": 140,
            "w": 60,
            "h": 50
          },
          {
            "name": "Big Cat Area",
            "type": "trees",
            "x": 340,
            "y": 140,
            "w": 60,
            "h": 50
          }
        ]
      },
      "candidatePositions": [
        {
          "slotId": "pos_1",
          "x": 230,
          "y": 40,
          "name": "Veterinary Clinic (动物诊疗所)"
        },
        {
          "slotId": "pos_2",
          "x": 50,
          "y": 60,
          "name": "Reptile Pavilion (爬行两栖馆)"
        },
        {
          "slotId": "pos_3",
          "x": 410,
          "y": 60,
          "name": "Aviary (巨型飞禽舍)"
        },
        {
          "slotId": "pos_4",
          "x": 90,
          "y": 260,
          "name": "Children's Petting Barn (儿童萌宠天地)"
        },
        {
          "slotId": "pos_5",
          "x": 370,
          "y": 260,
          "name": "Souvenir Kiosk (纪念品驿站)"
        }
      ],
      "routes": [
        {
          "id": "z1",
          "targetSlotId": "pos_1",
          "question": "Where is the Veterinary Clinic (动物诊疗所)?",
          "steps": [
            {
              "text": "Begin at the Visitor Gate.",
              "audioText": "Begin at the Visitor Gate.",
              "coord": {
                "x": 230,
                "y": 320
              }
            },
            {
              "text": "Walk north to the circular junction.",
              "audioText": "Walk north to the circular junction.",
              "coord": {
                "x": 230,
                "y": 230
              }
            },
            {
              "text": "Follow the eastern curve around Flamingo Lake.",
              "audioText": "Follow the eastern curve around Flamingo Lake.",
              "coord": {
                "x": 320,
                "y": 160
              }
            },
            {
              "text": "Where the two paths meet again on the north side, head straight up the dead-end spur.",
              "audioText": "Where the two paths meet again on the north side, head straight up the dead-end spur.",
              "coord": {
                "x": 230,
                "y": 80
              }
            },
            {
              "text": "The Veterinary Clinic is the quiet facility at the very top.",
              "audioText": "The Veterinary Clinic is the quiet facility at the very top.",
              "coord": {
                "x": 230,
                "y": 40
              }
            }
          ],
          "pathCoords": [
            [
              230,
              320
            ],
            [
              230,
              230
            ],
            [
              320,
              165
            ],
            [
              230,
              100
            ],
            [
              230,
              40
            ]
          ],
          "explanation": "入园北行 -> 顺环形道东侧绕过火烈鸟湖 -> 在北汇合口往最深处直行即为诊疗所。"
        },
        {
          "id": "z2",
          "targetSlotId": "pos_2",
          "question": "Where is the Reptile Pavilion (爬行两栖馆)?",
          "steps": [
            {
              "text": "From the Visitor Gate, walk north until the road splits.",
              "audioText": "From the Visitor Gate, walk north until the road splits.",
              "coord": {
                "x": 230,
                "y": 320
              }
            },
            {
              "text": "Take the left-hand loop heading northwest past the Primate House.",
              "audioText": "Take the left-hand loop heading northwest past the Primate House.",
              "coord": {
                "x": 130,
                "y": 180
              }
            },
            {
              "text": "Continue towards the top left corner of the park.",
              "audioText": "Continue towards the top left corner of the park.",
              "coord": {
                "x": 100,
                "y": 100
              }
            },
            {
              "text": "The Reptile Pavilion is situated tucked in the northwest corner.",
              "audioText": "The Reptile Pavilion is situated tucked in the northwest corner.",
              "coord": {
                "x": 50,
                "y": 60
              }
            }
          ],
          "pathCoords": [
            [
              230,
              320
            ],
            [
              230,
              230
            ],
            [
              130,
              180
            ],
            [
              90,
              90
            ],
            [
              50,
              60
            ]
          ],
          "explanation": "分岔口选择左环路 -> 绕过灵长类展馆 -> 西北角处即为两栖馆。"
        },
        {
          "id": "z3",
          "targetSlotId": "pos_4",
          "question": "Where is the Children's Petting Barn (儿童萌宠天地)?",
          "steps": [
            {
              "text": "Just after entering the gate, take the small left spur before the main circular path.",
              "audioText": "Just after entering the gate, take the small left spur before the main circular path.",
              "coord": {
                "x": 230,
                "y": 300
              }
            },
            {
              "text": "Walk west towards the southwestern lawn.",
              "audioText": "Walk west towards the southwestern lawn.",
              "coord": {
                "x": 150,
                "y": 260
              }
            },
            {
              "text": "The Children's Petting Barn is right there on the corner.",
              "audioText": "The Children's Petting Barn is right there on the corner.",
              "coord": {
                "x": 90,
                "y": 260
              }
            }
          ],
          "pathCoords": [
            [
              230,
              320
            ],
            [
              230,
              280
            ],
            [
              90,
              260
            ]
          ],
          "explanation": "进门不久左拐向西南草坪 -> 角落处即为儿童萌宠天地。"
        }
      ]
    },
    {
      "id": "map-sports",
      "title": "奥林匹克运动小镇 (Olympic Sports Village)",
      "context": "运动会志愿者向运动员和观众介绍场馆与保障区",
      "mapWidth": 460,
      "mapHeight": 340,
      "startPoint": {
        "x": 60,
        "y": 310,
        "label": "Main Reception (You are here)"
      },
      "svgFeatures": {
        "roads": [
          "M 60 320 L 60 170 L 400 170",
          "M 230 170 L 230 60 L 400 60",
          "M 230 170 L 230 300 L 400 300"
        ],
        "landmarks": [
          {
            "name": "Athletics Track",
            "type": "trees",
            "x": 90,
            "y": 70,
            "w": 110,
            "h": 70,
            "rx": 20
          },
          {
            "name": "Aquatic Centre",
            "type": "water",
            "x": 260,
            "y": 80,
            "w": 90,
            "h": 60
          },
          {
            "name": "Tennis Courts",
            "type": "building",
            "x": 90,
            "y": 200,
            "w": 100,
            "h": 70
          }
        ]
      },
      "candidatePositions": [
        {
          "slotId": "pos_1",
          "x": 415,
          "y": 60,
          "name": "Physiotherapy Suite (运动理疗康复室)"
        },
        {
          "slotId": "pos_2",
          "x": 415,
          "y": 170,
          "name": "Changing Pavilion (综合更衣馆)"
        },
        {
          "slotId": "pos_3",
          "x": 415,
          "y": 300,
          "name": "Equipment Rental (运动器材租赁站)"
        },
        {
          "slotId": "pos_4",
          "x": 230,
          "y": 40,
          "name": "VIP Grandstand (VIP 观赛看台)"
        },
        {
          "slotId": "pos_5",
          "x": 60,
          "y": 90,
          "name": "First Aid Station (急救救护站)"
        }
      ],
      "routes": [
        {
          "id": "s1",
          "targetSlotId": "pos_1",
          "question": "Where is the Physiotherapy Suite (运动理疗康复室)?",
          "steps": [
            {
              "text": "Start outside the Main Reception in the southwest.",
              "audioText": "Start outside the Main Reception in the southwest.",
              "coord": {
                "x": 60,
                "y": 310
              }
            },
            {
              "text": "Walk north past the tennis courts until you hit the central corridor, then turn right.",
              "audioText": "Walk north past the tennis courts until you hit the central corridor, then turn right.",
              "coord": {
                "x": 60,
                "y": 170
              }
            },
            {
              "text": "At the crossroads, turn left and head north alongside the Aquatic Centre.",
              "audioText": "At the crossroads, turn left and head north alongside the Aquatic Centre.",
              "coord": {
                "x": 230,
                "y": 110
              }
            },
            {
              "text": "Turn right onto the northern avenue and follow it to the end.",
              "audioText": "Turn right onto the northern avenue and follow it to the end.",
              "coord": {
                "x": 330,
                "y": 60
              }
            },
            {
              "text": "The Physiotherapy Suite is the building at the eastern tip of this lane.",
              "audioText": "The Physiotherapy Suite is the building at the eastern tip of this lane.",
              "coord": {
                "x": 415,
                "y": 60
              }
            }
          ],
          "pathCoords": [
            [
              60,
              310
            ],
            [
              60,
              170
            ],
            [
              230,
              170
            ],
            [
              230,
              60
            ],
            [
              415,
              60
            ]
          ],
          "explanation": "接待处北上右拐 -> 十字路口北拐过游泳馆 -> 东拐走到底即为康复理疗室。"
        },
        {
          "id": "s2",
          "targetSlotId": "pos_2",
          "question": "Where is the Changing Pavilion (综合更衣馆)?",
          "steps": [
            {
              "text": "From the reception desk, walk north to the main central avenue.",
              "audioText": "From the reception desk, walk north to the main central avenue.",
              "coord": {
                "x": 60,
                "y": 310
              }
            },
            {
              "text": "Turn right and walk east straight down the middle of the village.",
              "audioText": "Turn right and walk east straight down the middle of the village.",
              "coord": {
                "x": 180,
                "y": 170
              }
            },
            {
              "text": "Go straight across the central intersection.",
              "audioText": "Go straight across the central intersection.",
              "coord": {
                "x": 300,
                "y": 170
              }
            },
            {
              "text": "The Changing Pavilion stands directly ahead at the far eastern end of the avenue.",
              "audioText": "The Changing Pavilion stands directly ahead at the far eastern end of the avenue.",
              "coord": {
                "x": 415,
                "y": 170
              }
            }
          ],
          "pathCoords": [
            [
              60,
              310
            ],
            [
              60,
              170
            ],
            [
              415,
              170
            ]
          ],
          "explanation": "中央大道一路向东穿过十字路口，东侧尽头的大型建筑即为更衣馆。"
        },
        {
          "id": "s3",
          "targetSlotId": "pos_3",
          "question": "Where is the Equipment Rental (运动器材租赁站)?",
          "steps": [
            {
              "text": "Start from reception, walk north to the avenue and turn right.",
              "audioText": "Start from reception, walk north to the avenue and turn right.",
              "coord": {
                "x": 60,
                "y": 170
              }
            },
            {
              "text": "At the crossroads between the sports zones, turn south.",
              "audioText": "At the crossroads between the sports zones, turn south.",
              "coord": {
                "x": 230,
                "y": 240
              }
            },
            {
              "text": "Turn east onto the southern service lane.",
              "audioText": "Turn east onto the southern service lane.",
              "coord": {
                "x": 320,
                "y": 300
              }
            },
            {
              "text": "The Equipment Rental depot is right at the end on your left.",
              "audioText": "The Equipment Rental depot is right at the end on your left.",
              "coord": {
                "x": 415,
                "y": 300
              }
            }
          ],
          "pathCoords": [
            [
              60,
              310
            ],
            [
              60,
              170
            ],
            [
              230,
              170
            ],
            [
              230,
              300
            ],
            [
              415,
              300
            ]
          ],
          "explanation": "十字路口南拐 -> 进入南侧服务通道向东到底即为器材租赁站。"
        }
      ]
    },
    {
      "id": "map-castle",
      "title": "古堡历史庄园 (Historic Castle Grounds)",
      "context": "古堡策展人向参访团解说中世纪要塞建筑布局",
      "mapWidth": 460,
      "mapHeight": 340,
      "startPoint": {
        "x": 230,
        "y": 320,
        "label": "Drawbridge Gate (You are here)"
      },
      "svgFeatures": {
        "rivers": [
          "M 30 250 L 430 250 L 430 275 L 30 275 Z"
        ],
        "roads": [
          "M 230 330 L 230 180",
          "M 230 180 L 100 180 L 100 80 L 360 80 L 360 180 L 230 180"
        ],
        "bridges": [
          {
            "x": 215,
            "y": 245,
            "w": 30,
            "h": 32
          }
        ],
        "landmarks": [
          {
            "name": "Outer Courtyard",
            "type": "building",
            "x": 170,
            "y": 130,
            "w": 120,
            "h": 50
          },
          {
            "name": "Great Keep Tower",
            "type": "trees",
            "x": 190,
            "y": 40,
            "w": 80,
            "h": 40
          }
        ]
      },
      "candidatePositions": [
        {
          "slotId": "pos_1",
          "x": 60,
          "y": 70,
          "name": "Armoury (兵器装备展厅)"
        },
        {
          "slotId": "pos_2",
          "x": 230,
          "y": 35,
          "name": "Throne Room (皇家议事大厅)"
        },
        {
          "slotId": "pos_3",
          "x": 400,
          "y": 70,
          "name": "Falconry Mew (皇家猎鹰房)"
        },
        {
          "slotId": "pos_4",
          "x": 60,
          "y": 180,
          "name": "Guard Barracks (卫兵营房)"
        },
        {
          "slotId": "pos_5",
          "x": 400,
          "y": 180,
          "name": "Medieval Kitchen (中世纪御膳房)"
        }
      ],
      "routes": [
        {
          "id": "cs1",
          "targetSlotId": "pos_1",
          "question": "Where is the Armoury (兵器装备展厅)?",
          "steps": [
            {
              "text": "We begin at the Drawbridge Gate over the moat.",
              "audioText": "We begin at the Drawbridge Gate over the moat.",
              "coord": {
                "x": 230,
                "y": 320
              }
            },
            {
              "text": "Cross the wooden drawbridge and pass through the portcullis into the Outer Courtyard.",
              "audioText": "Cross the wooden drawbridge and pass through the portcullis into the Outer Courtyard.",
              "coord": {
                "x": 230,
                "y": 180
              }
            },
            {
              "text": "Turn left and walk west along the castle wall, then follow it north.",
              "audioText": "Turn left and walk west along the castle wall, then follow it north.",
              "coord": {
                "x": 100,
                "y": 130
              }
            },
            {
              "text": "The Armoury is the stone building situated in the northwest tower corner.",
              "audioText": "The Armoury is the stone building situated in the northwest tower corner.",
              "coord": {
                "x": 60,
                "y": 70
              }
            }
          ],
          "pathCoords": [
            [
              230,
              320
            ],
            [
              230,
              180
            ],
            [
              100,
              180
            ],
            [
              100,
              80
            ],
            [
              60,
              70
            ]
          ],
          "explanation": "过吊桥进外庭院 -> 左拐向西顺西墙北上 -> 西北角塔楼处即为兵器展厅。"
        },
        {
          "id": "cs2",
          "targetSlotId": "pos_3",
          "question": "Where is the Falconry Mew (皇家猎鹰房)?",
          "steps": [
            {
              "text": "Cross the moat via the drawbridge.",
              "audioText": "Cross the moat via the drawbridge.",
              "coord": {
                "x": 230,
                "y": 320
              }
            },
            {
              "text": "In the courtyard, bear right and follow the eastern rampart path heading north.",
              "audioText": "In the courtyard, bear right and follow the eastern rampart path heading north.",
              "coord": {
                "x": 360,
                "y": 130
              }
            },
            {
              "text": "The Falconry Mew is the open-air facility perched in the northeast bastion.",
              "audioText": "The Falconry Mew is the open-air facility perched in the northeast bastion.",
              "coord": {
                "x": 400,
                "y": 70
              }
            }
          ],
          "pathCoords": [
            [
              230,
              320
            ],
            [
              230,
              180
            ],
            [
              360,
              180
            ],
            [
              360,
              80
            ],
            [
              400,
              70
            ]
          ],
          "explanation": "过桥后右转沿东侧城墙向北走到东北角堡垒，即为猎鹰房。"
        },
        {
          "id": "cs3",
          "targetSlotId": "pos_5",
          "question": "Where is the Medieval Kitchen (中世纪御膳房)?",
          "steps": [
            {
              "text": "Cross the drawbridge into the courtyard.",
              "audioText": "Cross the drawbridge into the courtyard.",
              "coord": {
                "x": 230,
                "y": 320
              }
            },
            {
              "text": "Turn immediately to your right.",
              "audioText": "Turn immediately to your right.",
              "coord": {
                "x": 300,
                "y": 180
              }
            },
            {
              "text": "The Medieval Kitchen is the first building against the southeast inner wall.",
              "audioText": "The Medieval Kitchen is the first building against the southeast inner wall.",
              "coord": {
                "x": 400,
                "y": 180
              }
            }
          ],
          "pathCoords": [
            [
              230,
              320
            ],
            [
              230,
              180
            ],
            [
              400,
              180
            ]
          ],
          "explanation": "过桥后立即右拐，东南部内墙第一栋建筑即为御膳房。"
        }
      ]
    },
    {
      "id": "map-industry",
      "title": "工业遗址创意园 (Industrial Heritage Park)",
      "context": "园区管委会向文创团队介绍厂区改造与工作室分布",
      "mapWidth": 460,
      "mapHeight": 340,
      "startPoint": {
        "x": 70,
        "y": 310,
        "label": "South Gate (You are here)"
      },
      "svgFeatures": {
        "roads": [
          "M 70 320 L 70 170 L 380 170",
          "M 70 170 L 70 70 L 380 70",
          "M 380 70 L 380 300"
        ],
        "landmarks": [
          {
            "name": "Old Chimney Plaza",
            "type": "building",
            "x": 100,
            "y": 90,
            "w": 80,
            "h": 60
          },
          {
            "name": "Red Brick Mill",
            "type": "trees",
            "x": 230,
            "y": 90,
            "w": 100,
            "h": 60
          },
          {
            "name": "Railway Track",
            "type": "traffic",
            "x": 20,
            "y": 220,
            "w": 420,
            "h": 8
          }
        ]
      },
      "candidatePositions": [
        {
          "slotId": "pos_1",
          "x": 380,
          "y": 40,
          "name": "Contemporary Art Gallery (当代美术馆)"
        },
        {
          "slotId": "pos_2",
          "x": 420,
          "y": 170,
          "name": "Design Incubator (设计孵化中心)"
        },
        {
          "slotId": "pos_3",
          "x": 415,
          "y": 300,
          "name": "Artisan Coffee Roastery (工匠咖啡烘焙坊)"
        },
        {
          "slotId": "pos_4",
          "x": 70,
          "y": 40,
          "name": "Blacksmith Studio (打铁艺术工作室)"
        },
        {
          "slotId": "pos_5",
          "x": 230,
          "y": 200,
          "name": "Sculpture Yard (露天雕塑庭院)"
        }
      ],
      "routes": [
        {
          "id": "ind1",
          "targetSlotId": "pos_1",
          "question": "Where is the Contemporary Art Gallery (当代美术馆)?",
          "steps": [
            {
              "text": "Enter through the South Gate.",
              "audioText": "Enter through the South Gate.",
              "coord": {
                "x": 70,
                "y": 310
              }
            },
            {
              "text": "Walk north past the historic railway tracks all the way to the top northern wall.",
              "audioText": "Walk north past the historic railway tracks all the way to the top northern wall.",
              "coord": {
                "x": 70,
                "y": 120
              }
            },
            {
              "text": "Turn right onto the high line road running above the old chimney and mill.",
              "audioText": "Turn right onto the high line road running above the old chimney and mill.",
              "coord": {
                "x": 220,
                "y": 70
              }
            },
            {
              "text": "The Contemporary Art Gallery is the converted warehouse at the northeast corner.",
              "audioText": "The Contemporary Art Gallery is the converted warehouse at the northeast corner.",
              "coord": {
                "x": 380,
                "y": 40
              }
            }
          ],
          "pathCoords": [
            [
              70,
              310
            ],
            [
              70,
              70
            ],
            [
              380,
              70
            ],
            [
              380,
              40
            ]
          ],
          "explanation": "南门出发向北穿过老铁轨一路至北端 -> 右拐向东走到底即为当代美术馆。"
        },
        {
          "id": "ind2",
          "targetSlotId": "pos_3",
          "question": "Where is the Artisan Coffee Roastery (工匠咖啡烘焙坊)?",
          "steps": [
            {
              "text": "From the gate, walk north to the central roadway and turn right.",
              "audioText": "From the gate, walk north to the central roadway and turn right.",
              "coord": {
                "x": 70,
                "y": 170
              }
            },
            {
              "text": "Follow the road past the Red Brick Mill all the way to the eastern wall, then turn south.",
              "audioText": "Follow the road past the Red Brick Mill all the way to the eastern wall, then turn south.",
              "coord": {
                "x": 380,
                "y": 220
              }
            },
            {
              "text": "The Artisan Coffee Roastery is situated right at the southeastern end of the track.",
              "audioText": "The Artisan Coffee Roastery is situated right at the southeastern end of the track.",
              "coord": {
                "x": 415,
                "y": 300
              }
            }
          ],
          "pathCoords": [
            [
              70,
              310
            ],
            [
              70,
              170
            ],
            [
              380,
              170
            ],
            [
              380,
              300
            ],
            [
              415,
              300
            ]
          ],
          "explanation": "从中央道路向东穿过红砖车间 -> 遇东墙南拐 -> 东南端尽头即为咖啡烘焙坊。"
        },
        {
          "id": "ind3",
          "targetSlotId": "pos_4",
          "question": "Where is the Blacksmith Studio (打铁艺术工作室)?",
          "steps": [
            {
              "text": "Walk north along the main western avenue from the gate.",
              "audioText": "Walk north along the main western avenue from the gate.",
              "coord": {
                "x": 70,
                "y": 310
              }
            },
            {
              "text": "Cross over the central junction and continue heading north.",
              "audioText": "Cross over the central junction and continue heading north.",
              "coord": {
                "x": 70,
                "y": 120
              }
            },
            {
              "text": "The Blacksmith Studio is the building at the northwest end before the path turns east.",
              "audioText": "The Blacksmith Studio is the building at the northwest end before the path turns east.",
              "coord": {
                "x": 70,
                "y": 40
              }
            }
          ],
          "pathCoords": [
            [
              70,
              310
            ],
            [
              70,
              40
            ]
          ],
          "explanation": "从南门一直笔直往北走到底，道路拐弯前的西北端建筑即为工作室。"
        }
      ]
    },
    {
      "id": "map-forest",
      "title": "森林探险营地 (Forest Adventure Camp)",
      "context": "户外营地教练向营员宣讲安全规程与营区设施分布",
      "mapWidth": 460,
      "mapHeight": 340,
      "startPoint": {
        "x": 230,
        "y": 320,
        "label": "Camp Base HQ (You are here)"
      },
      "svgFeatures": {
        "rivers": [
          "M 0 160 C 130 140, 200 180, 460 150 L 460 180 C 200 210, 130 170, 0 190 Z"
        ],
        "roads": [
          "M 230 330 L 230 120",
          "M 230 120 L 90 120 L 90 60",
          "M 230 120 L 370 120 L 370 60"
        ],
        "bridges": [
          {
            "x": 218,
            "y": 155,
            "w": 24,
            "h": 26
          }
        ],
        "landmarks": [
          {
            "name": "Zip-line Tower",
            "type": "building",
            "x": 110,
            "y": 220,
            "w": 70,
            "h": 50
          },
          {
            "name": "Tent Clearing",
            "type": "trees",
            "x": 280,
            "y": 220,
            "w": 90,
            "h": 60
          }
        ]
      },
      "candidatePositions": [
        {
          "slotId": "pos_1",
          "x": 50,
          "y": 55,
          "name": "First Aid Station (急救救护站)"
        },
        {
          "slotId": "pos_2",
          "x": 230,
          "y": 50,
          "name": "Campfire Amphitheatre (篝火露天剧场)"
        },
        {
          "slotId": "pos_3",
          "x": 410,
          "y": 55,
          "name": "Equipment Lockers (重装储物舱)"
        },
        {
          "slotId": "pos_4",
          "x": 50,
          "y": 230,
          "name": "Climbing Wall (户外攀岩壁)"
        },
        {
          "slotId": "pos_5",
          "x": 410,
          "y": 230,
          "name": "Camp Kitchen (营地自助厨房)"
        }
      ],
      "routes": [
        {
          "id": "fo1",
          "targetSlotId": "pos_1",
          "question": "Where is the First Aid Station (急救救护站)?",
          "steps": [
            {
              "text": "We are at Camp Base HQ.",
              "audioText": "We are at Camp Base HQ.",
              "coord": {
                "x": 230,
                "y": 320
              }
            },
            {
              "text": "Walk north across the wooden bridge spanning the river gorge.",
              "audioText": "Walk north across the wooden bridge spanning the river gorge.",
              "coord": {
                "x": 230,
                "y": 160
              }
            },
            {
              "text": "Immediately after the bridge, turn left onto the northern riverside track.",
              "audioText": "Immediately after the bridge, turn left onto the northern riverside track.",
              "coord": {
                "x": 140,
                "y": 120
              }
            },
            {
              "text": "Follow the track north at the bend; the First Aid Station is situated on the left.",
              "audioText": "Follow the track north at the bend; the First Aid Station is situated on the left.",
              "coord": {
                "x": 50,
                "y": 55
              }
            }
          ],
          "pathCoords": [
            [
              230,
              320
            ],
            [
              230,
              160
            ],
            [
              230,
              120
            ],
            [
              90,
              120
            ],
            [
              90,
              60
            ],
            [
              50,
              55
            ]
          ],
          "explanation": "基地向北过峡谷木桥 -> 左拐顺河岸走并在拐角向北 -> 左侧即为急救站。"
        },
        {
          "id": "fo2",
          "targetSlotId": "pos_2",
          "question": "Where is the Campfire Amphitheatre (篝火露天剧场)?",
          "steps": [
            {
              "text": "From the base HQ, walk directly north.",
              "audioText": "From the base HQ, walk directly north.",
              "coord": {
                "x": 230,
                "y": 320
              }
            },
            {
              "text": "Cross the bridge and keep walking straight ahead on the central trail.",
              "audioText": "Cross the bridge and keep walking straight ahead on the central trail.",
              "coord": {
                "x": 230,
                "y": 120
              }
            },
            {
              "text": "The Campfire Amphitheatre is nestled in the clearing at the top of the trail.",
              "audioText": "The Campfire Amphitheatre is nestled in the clearing at the top of the trail.",
              "coord": {
                "x": 230,
                "y": 50
              }
            }
          ],
          "pathCoords": [
            [
              230,
              320
            ],
            [
              230,
              160
            ],
            [
              230,
              50
            ]
          ],
          "explanation": "过桥后不转弯，沿着中央小径一直向北到底的圆形空地即为篝火剧场。"
        },
        {
          "id": "fo3",
          "targetSlotId": "pos_3",
          "question": "Where are the Equipment Lockers (重装储物舱)?",
          "steps": [
            {
              "text": "Cross the bridge heading north from HQ.",
              "audioText": "Cross the bridge heading north from HQ.",
              "coord": {
                "x": 230,
                "y": 320
              }
            },
            {
              "text": "Turn right onto the eastern loop.",
              "audioText": "Turn right onto the eastern loop.",
              "coord": {
                "x": 300,
                "y": 120
              }
            },
            {
              "text": "Follow it north to the northeastern ridge.",
              "audioText": "Follow it north to the northeastern ridge.",
              "coord": {
                "x": 370,
                "y": 80
              }
            },
            {
              "text": "The Equipment Lockers are inside the wooden shelter on your right.",
              "audioText": "The Equipment Lockers are inside the wooden shelter on your right.",
              "coord": {
                "x": 410,
                "y": 55
              }
            }
          ],
          "pathCoords": [
            [
              230,
              320
            ],
            [
              230,
              160
            ],
            [
              230,
              120
            ],
            [
              370,
              120
            ],
            [
              370,
              60
            ],
            [
              410,
              55
            ]
          ],
          "explanation": "过桥后右转往东 -> 顺路向北上行至东北山脊 -> 右手边即为储物舱。"
        }
      ]
    }
  ]
};

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
