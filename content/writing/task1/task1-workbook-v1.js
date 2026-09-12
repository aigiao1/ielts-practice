// Task 1 核心图表与微型报告翻译训练包 (task1-workbook-v1)
// 包含标准的 140 题，严格对应 28 个题组与 7 大训练模块 (121–140 为微型报告)
(() => {
  "use strict";

  const TASK1_WORKBOOK_PACK_V1 = {
  "packId": "task1-workbook-v1",
  "version": "1.0.0",
  "domain": "writing",
  "contentType": "task1",
  "canonical": true,
  "expectedCount": 140,
  "metadata": {
    "sourceType": "human_curated",
    "sourceRef": "task1-translation-workbook.md (140题标准训练册)",
    "origin": "bundled",
    "reviewStatus": "reviewed",
    "status": "active",
    "tags": [
      "writing",
      "task1",
      "translation",
      "canonical_140"
    ]
  },
  "modules": [
    {
      "id": "module-1",
      "number": 1,
      "name": "模块一：数字、单位与比较不出错",
      "range": "1–20"
    },
    {
      "id": "module-2",
      "number": 2,
      "name": "模块二：动态图与时态控制",
      "range": "21–40"
    },
    {
      "id": "module-3",
      "number": 3,
      "name": "模块三：静态图的分组与比较",
      "range": "41–60"
    },
    {
      "id": "module-4",
      "number": 4,
      "name": "模块四：Overview 选择主要特征",
      "range": "61–80"
    },
    {
      "id": "module-5",
      "number": 5,
      "name": "模块五：地图与平面图",
      "range": "81–100"
    },
    {
      "id": "module-6",
      "number": 6,
      "name": "模块六：流程图与被动语态",
      "range": "101–120"
    },
    {
      "id": "module-7",
      "number": 7,
      "name": "模块七：把单句连成微型报告",
      "range": "121–140"
    }
  ],
  "groups": [
    {
      "id": "task1-group-01",
      "number": 1,
      "label": "饼图：家庭支出构成",
      "module": "模块一：数字、单位与比较不出错（1–20）",
      "context": "住房 45%，食品 30%，交通 15%，娱乐 10%。本组训练占比、排序和合计。",
      "note": "45% 比 10% 多 35 个百分点，但前者是后者的 4.5 倍，不是“高 4.5 倍”。",
      "questions": [
        {
          "number": 1,
          "chinese": "住房占家庭总支出的45%。",
          "answer": "Housing accounted for 45% of total household expenditure.",
          "answerParts": [
            {
              "text": "Housing ",
              "strong": false
            },
            {
              "text": "accounted for 45% of total household expenditure",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-001"
        },
        {
          "number": 2,
          "chinese": "食品是第二大支出项目，占30%。",
          "answer": "Food was the second-largest category, representing 30% of the total.",
          "answerParts": [
            {
              "text": "Food was the second-largest category, ",
              "strong": false
            },
            {
              "text": "representing 30% of the total",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-002"
        },
        {
          "number": 3,
          "chinese": "交通支出的比例比娱乐高5个百分点。",
          "answer": "The proportion spent on transport was 5 percentage points higher than that for entertainment.",
          "answerParts": [
            {
              "text": "The proportion spent on transport was ",
              "strong": false
            },
            {
              "text": "5 percentage points higher than",
              "strong": true
            },
            {
              "text": " that for entertainment.",
              "strong": false
            }
          ],
          "id": "task1-003"
        },
        {
          "number": 4,
          "chinese": "住房支出是娱乐支出的四倍半。",
          "answer": "Spending on housing was four and a half times as high as spending on entertainment.",
          "answerParts": [
            {
              "text": "Spending on housing was ",
              "strong": false
            },
            {
              "text": "four and a half times as high as",
              "strong": true
            },
            {
              "text": " spending on entertainment.",
              "strong": false
            }
          ],
          "id": "task1-004"
        },
        {
          "number": 5,
          "chinese": "住房和食品合计占全部支出的四分之三。",
          "answer": "Housing and food together made up three quarters of all expenditure.",
          "answerParts": [
            {
              "text": "Housing and food ",
              "strong": false
            },
            {
              "text": "together made up three quarters of",
              "strong": true
            },
            {
              "text": " all expenditure.",
              "strong": false
            }
          ],
          "id": "task1-005"
        }
      ],
      "moduleId": "module-1",
      "moduleName": "模块一：数字、单位与比较不出错（1–20）"
    },
    {
      "id": "task1-group-02",
      "number": 2,
      "label": "表格：三座机场的年客流量",
      "module": "模块一：数字、单位与比较不出错（1–20）",
      "context": "A机场 120万人，B机场 80万人，C机场 60万人。单位为 passengers per year。",
      "note": "比较数字用 those at Airport C，避免重复 passenger numbers，也避免错误的 than Airport C。",
      "questions": [
        {
          "number": 6,
          "chinese": "A机场每年接待约120万名乘客。",
          "answer": "Airport A handled approximately 1.2 million passengers per year.",
          "answerParts": [
            {
              "text": "Airport A handled ",
              "strong": false
            },
            {
              "text": "approximately 1.2 million passengers per year",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-006"
        },
        {
          "number": 7,
          "chinese": "B机场的年客流量为80万人，比A机场少40万人。",
          "answer": "Airport B served 800,000 passengers annually, 400,000 fewer than Airport A.",
          "answerParts": [
            {
              "text": "Airport B served 800,000 passengers annually, ",
              "strong": false
            },
            {
              "text": "400,000 fewer than Airport A",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-007"
        },
        {
          "number": 8,
          "chinese": "A机场的客流量正好是C机场的两倍。",
          "answer": "Passenger numbers at Airport A were exactly twice those at Airport C.",
          "answerParts": [
            {
              "text": "Passenger numbers at Airport A were ",
              "strong": false
            },
            {
              "text": "exactly twice those at Airport C",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-008"
        },
        {
          "number": 9,
          "chinese": "三座机场的年客流量合计为260万人。",
          "answer": "The three airports handled a combined total of 2.6 million passengers each year.",
          "answerParts": [
            {
              "text": "The three airports handled ",
              "strong": false
            },
            {
              "text": "a combined total of 2.6 million passengers",
              "strong": true
            },
            {
              "text": " each year.",
              "strong": false
            }
          ],
          "id": "task1-009"
        },
        {
          "number": 10,
          "chinese": "A机场占三座机场总客流量的近一半。",
          "answer": "Airport A accounted for just under half of the combined passenger total.",
          "answerParts": [
            {
              "text": "Airport A accounted for ",
              "strong": false
            },
            {
              "text": "just under half of the combined passenger total",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-010"
        }
      ],
      "moduleId": "module-1",
      "moduleName": "模块一：数字、单位与比较不出错（1–20）"
    },
    {
      "id": "task1-group-03",
      "number": 3,
      "label": "近似数字：四种能源",
      "module": "模块一：数字、单位与比较不出错（1–20）",
      "context": "煤炭 51%，天然气 24%，核能 14%，可再生能源 11%。本组训练 just over、just under、roughly。",
      "note": "图中给精确数字时可以准确报告；只有在概括或数字本身近似时才使用 about、roughly、approximately。",
      "questions": [
        {
          "number": 11,
          "chinese": "煤炭提供了略高于一半的能源。",
          "answer": "Coal supplied just over half of the energy produced.",
          "answerParts": [
            {
              "text": "Coal supplied ",
              "strong": false
            },
            {
              "text": "just over half of the energy produced",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-011"
        },
        {
          "number": 12,
          "chinese": "天然气约占总量的四分之一。",
          "answer": "Natural gas accounted for approximately a quarter of the total.",
          "answerParts": [
            {
              "text": "Natural gas accounted for ",
              "strong": false
            },
            {
              "text": "approximately a quarter of the total",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-012"
        },
        {
          "number": 13,
          "chinese": "核能的占比略低于15%。",
          "answer": "The share of nuclear power was just under 15%.",
          "answerParts": [
            {
              "text": "The share of nuclear power was ",
              "strong": false
            },
            {
              "text": "just under 15%",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-013"
        },
        {
          "number": 14,
          "chinese": "可再生能源的贡献大约是煤炭的五分之一。",
          "answer": "The contribution of renewables was roughly one fifth of that of coal.",
          "answerParts": [
            {
              "text": "The contribution of renewables was ",
              "strong": false
            },
            {
              "text": "roughly one fifth of that of coal",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-014"
        },
        {
          "number": 15,
          "chinese": "核能和可再生能源合计占四分之一。",
          "answer": "Nuclear power and renewables collectively represented one quarter of energy production.",
          "answerParts": [
            {
              "text": "Nuclear power and renewables ",
              "strong": false
            },
            {
              "text": "collectively represented one quarter",
              "strong": true
            },
            {
              "text": " of energy production.",
              "strong": false
            }
          ],
          "id": "task1-015"
        }
      ],
      "moduleId": "module-1",
      "moduleName": "模块一：数字、单位与比较不出错（1–20）"
    },
    {
      "id": "task1-group-04",
      "number": 4,
      "label": "百分比与百分点",
      "module": "模块一：数字、单位与比较不出错（1–20）",
      "context": "使用自行车通勤的人群从20%升至30%；驾车者从50%降至40%；步行保持在10%。",
      "note": "rose to 30% 是“升至30%”；rose by 10 percentage points 是“上升10个百分点”。",
      "questions": [
        {
          "number": 16,
          "chinese": "骑自行车通勤的比例上升了10个百分点。",
          "answer": "The proportion of bicycle commuters rose by 10 percentage points.",
          "answerParts": [
            {
              "text": "The proportion of bicycle commuters ",
              "strong": false
            },
            {
              "text": "rose by 10 percentage points",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-016"
        },
        {
          "number": 17,
          "chinese": "相对而言，骑车通勤人数的占比增加了50%。",
          "answer": "In relative terms, the share of bicycle commuters increased by 50%.",
          "answerParts": [
            {
              "text": "In relative terms, the share of bicycle commuters ",
              "strong": false
            },
            {
              "text": "increased by 50%",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-017"
        },
        {
          "number": 18,
          "chinese": "驾车通勤的比例从50%下降到40%。",
          "answer": "The percentage commuting by car fell from 50% to 40%.",
          "answerParts": [
            {
              "text": "The percentage commuting by car ",
              "strong": false
            },
            {
              "text": "fell from 50% to 40%",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-018"
        },
        {
          "number": 19,
          "chinese": "骑车与驾车两项变化的幅度相同，方向相反。",
          "answer": "Cycling and car use changed by the same number of percentage points, but in opposite directions.",
          "answerParts": [
            {
              "text": "Cycling and car use changed ",
              "strong": false
            },
            {
              "text": "by the same number of percentage points, but in opposite directions",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-019"
        },
        {
          "number": 20,
          "chinese": "步行者的比例在整个时期保持不变，为10%。",
          "answer": "The proportion of people walking remained unchanged at 10% throughout the period.",
          "answerParts": [
            {
              "text": "The proportion of people walking ",
              "strong": false
            },
            {
              "text": "remained unchanged at 10% throughout the period",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-020"
        }
      ],
      "moduleId": "module-1",
      "moduleName": "模块一：数字、单位与比较不出错（1–20）"
    },
    {
      "id": "task1-group-05",
      "number": 5,
      "label": "2000–2020年三种交通方式",
      "module": "模块二：动态图与时态控制（21–40）",
      "context": "铁路从20升至55；公交从45缓慢降至35；航空从10快速升至50。单位为 million journeys。",
      "note": "有多个时间点且方向持续一致才用 rose steadily；只有两个端点时不要凭空判断中间“稳定增长”。",
      "questions": [
        {
          "number": 21,
          "chinese": "2000年至2020年间，铁路出行量从2000万稳步增至5500万。",
          "answer": "Between 2000 and 2020, rail travel rose steadily from 20 million to 55 million journeys.",
          "answerParts": [
            {
              "text": "Between 2000 and 2020, rail travel ",
              "strong": false
            },
            {
              "text": "rose steadily from 20 million to 55 million journeys",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-021"
        },
        {
          "number": 22,
          "chinese": "相比之下，公交出行量从4500万缓慢下降到3500万。",
          "answer": "By contrast, the number of bus journeys declined gradually from 45 million to 35 million.",
          "answerParts": [
            {
              "text": "By contrast, the number of bus journeys ",
              "strong": false
            },
            {
              "text": "declined gradually from 45 million to 35 million",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-022"
        },
        {
          "number": 23,
          "chinese": "航空出行的增长最为显著，最终达到5000万次。",
          "answer": "Air travel experienced the most substantial growth, eventually reaching 50 million journeys.",
          "answerParts": [
            {
              "text": "Air travel ",
              "strong": false
            },
            {
              "text": "experienced the most substantial growth",
              "strong": true
            },
            {
              "text": ", eventually reaching 50 million journeys.",
              "strong": false
            }
          ],
          "id": "task1-023"
        },
        {
          "number": 24,
          "chinese": "铁路在2015年前后超过公交，成为使用最多的交通方式。",
          "answer": "Rail overtook buses around 2015 to become the most widely used mode of transport.",
          "answerParts": [
            {
              "text": "Rail ",
              "strong": false
            },
            {
              "text": "overtook buses around 2015",
              "strong": true
            },
            {
              "text": " to become the most widely used mode of transport.",
              "strong": false
            }
          ],
          "id": "task1-024"
        },
        {
          "number": 25,
          "chinese": "到期末，铁路与航空的使用量相近，而公交落后于二者。",
          "answer": "By the end of the period, rail and air figures were similar, while bus travel lagged behind both.",
          "answerParts": [
            {
              "text": "By the end of the period, rail and air figures were similar, while bus travel ",
              "strong": false
            },
            {
              "text": "lagged behind both",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-025"
        }
      ],
      "moduleId": "module-2",
      "moduleName": "模块二：动态图与时态控制（21–40）"
    },
    {
      "id": "task1-group-06",
      "number": 6,
      "label": "月度用电量波动",
      "module": "模块二：动态图与时态控制（21–40）",
      "context": "1月 320，4月 240，7月 410，10月 260，12月 350。单位为 kWh。",
      "note": "fluctuate 至少要有多次上下变化；单纯先升后降更适合 rose and then fell。",
      "questions": [
        {
          "number": 26,
          "chinese": "家庭用电量在一年中出现明显波动。",
          "answer": "Household electricity consumption fluctuated considerably over the year.",
          "answerParts": [
            {
              "text": "Household electricity consumption ",
              "strong": false
            },
            {
              "text": "fluctuated considerably over the year",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-026"
        },
        {
          "number": 27,
          "chinese": "用电量从1月的320千瓦时降至4月的240千瓦时。",
          "answer": "Consumption fell from 320 kWh in January to 240 kWh in April.",
          "answerParts": [
            {
              "text": "Consumption ",
              "strong": false
            },
            {
              "text": "fell from 320 kWh in January to 240 kWh in April",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-027"
        },
        {
          "number": 28,
          "chinese": "随后该数字急剧上升，在7月达到410千瓦时的峰值。",
          "answer": "The figure then climbed sharply, peaking at 410 kWh in July.",
          "answerParts": [
            {
              "text": "The figure then climbed sharply, ",
              "strong": false
            },
            {
              "text": "peaking at 410 kWh in July",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-028"
        },
        {
          "number": 29,
          "chinese": "到10月，用电量再次下降到260千瓦时。",
          "answer": "By October, electricity use had dropped again to 260 kWh.",
          "answerParts": [
            {
              "text": "By October, electricity use ",
              "strong": false
            },
            {
              "text": "had dropped again to 260 kWh",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-029"
        },
        {
          "number": 30,
          "chinese": "最后两个月出现回升，12月的用电量为350千瓦时。",
          "answer": "Consumption recovered during the final two months, ending the year at 350 kWh.",
          "answerParts": [
            {
              "text": "Consumption ",
              "strong": false
            },
            {
              "text": "recovered during the final two months",
              "strong": true
            },
            {
              "text": ", ending the year at 350 kWh.",
              "strong": false
            }
          ],
          "id": "task1-030"
        }
      ],
      "moduleId": "module-2",
      "moduleName": "模块二：动态图与时态控制（21–40）"
    },
    {
      "id": "task1-group-07",
      "number": 7,
      "label": "两国互联网使用率交叉",
      "module": "模块二：动态图与时态控制（21–40）",
      "context": "2005年甲国 60%、乙国 25%；2015年两国均为70%；2025年甲国 82%、乙国 90%。",
      "note": "两条线相交可写 the figures were equal 或 B overtook A；不要把“交叉”直译成 crossed each other 而不说明结果。",
      "questions": [
        {
          "number": 31,
          "chinese": "2005年，甲国的互联网使用率远高于乙国。",
          "answer": "In 2005, internet use in Country A was far higher than that in Country B.",
          "answerParts": [
            {
              "text": "In 2005, internet use in Country A was ",
              "strong": false
            },
            {
              "text": "far higher than that in Country B",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-031"
        },
        {
          "number": 32,
          "chinese": "随后两国之间的差距逐渐缩小。",
          "answer": "The gap between the two countries narrowed gradually thereafter.",
          "answerParts": [
            {
              "text": "The gap between the two countries ",
              "strong": false
            },
            {
              "text": "narrowed gradually thereafter",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-032"
        },
        {
          "number": 33,
          "chinese": "两国的使用率在2015年持平，均为70%。",
          "answer": "The two rates were equal at 70% in 2015.",
          "answerParts": [
            {
              "text": "The two rates ",
              "strong": false
            },
            {
              "text": "were equal at 70% in 2015",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-033"
        },
        {
          "number": 34,
          "chinese": "2015年之后，乙国超过甲国，并在2025年达到90%。",
          "answer": "After 2015, Country B surpassed Country A, reaching 90% in 2025.",
          "answerParts": [
            {
              "text": "After 2015, Country B ",
              "strong": false
            },
            {
              "text": "surpassed Country A",
              "strong": true
            },
            {
              "text": ", reaching 90% in 2025.",
              "strong": false
            }
          ],
          "id": "task1-034"
        },
        {
          "number": 35,
          "chinese": "总体来看，乙国的增长速度更快，并由落后转为领先。",
          "answer": "Overall, Country B grew more rapidly and moved from a substantial deficit to a clear lead.",
          "answerParts": [
            {
              "text": "Overall, Country B grew more rapidly and ",
              "strong": false
            },
            {
              "text": "moved from a substantial deficit to a clear lead",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-035"
        }
      ],
      "moduleId": "module-2",
      "moduleName": "模块二：动态图与时态控制（21–40）"
    },
    {
      "id": "task1-group-08",
      "number": 8,
      "label": "峰值、低点与恢复",
      "module": "模块二：动态图与时态控制（21–40）",
      "context": "某产品销量2010年 70，2012年 95，2015年 40，2018年 65，2020年 90。单位为 thousand units。",
      "note": "peak 可作动词 peak at 95,000，也可作名词 reach a peak of 95,000；不要写 peak to。",
      "questions": [
        {
          "number": 36,
          "chinese": "销量在2012年达到9.5万件的早期高点。",
          "answer": "Sales reached an initial high of 95,000 units in 2012.",
          "answerParts": [
            {
              "text": "Sales ",
              "strong": false
            },
            {
              "text": "reached an initial high of 95,000 units in 2012",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-036"
        },
        {
          "number": 37,
          "chinese": "此后销量大幅下降，并在2015年触底至4万件。",
          "answer": "They then fell markedly, bottoming out at 40,000 in 2015.",
          "answerParts": [
            {
              "text": "They then fell markedly, ",
              "strong": false
            },
            {
              "text": "bottoming out at 40,000 in 2015",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-037"
        },
        {
          "number": 38,
          "chinese": "2015年以后，销量逐步恢复。",
          "answer": "Sales recovered progressively after 2015.",
          "answerParts": [
            {
              "text": "Sales ",
              "strong": false
            },
            {
              "text": "recovered progressively after 2015",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-038"
        },
        {
          "number": 39,
          "chinese": "到2020年，该数字回升至9万件，但仍略低于2012年的峰值。",
          "answer": "By 2020, the figure had returned to 90,000, slightly below the 2012 peak.",
          "answerParts": [
            {
              "text": "By 2020, the figure had returned to 90,000, ",
              "strong": false
            },
            {
              "text": "slightly below the 2012 peak",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-039"
        },
        {
          "number": 40,
          "chinese": "整个时期的特点是先急剧下降，随后几乎完全恢复。",
          "answer": "The period was characterised by a sharp decline followed by an almost complete recovery.",
          "answerParts": [
            {
              "text": "The period was characterised by ",
              "strong": false
            },
            {
              "text": "a sharp decline followed by an almost complete recovery",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-040"
        }
      ],
      "moduleId": "module-2",
      "moduleName": "模块二：动态图与时态控制（21–40）"
    },
    {
      "id": "task1-group-09",
      "number": 9,
      "label": "四国通勤方式",
      "module": "模块三：静态图的分组与比较（41–60）",
      "context": "驾车比例——甲70%、乙65%、丙30%、丁25%；公共交通——甲20%、乙25%、丙55%、丁60%。其余为步行或骑车。",
      "note": "静态图没有时间变化，不要写 increase、decrease；用 was higher、accounted for、recorded 等比较状态。",
      "questions": [
        {
          "number": 41,
          "chinese": "甲国和乙国的大多数通勤者选择驾车。",
          "answer": "In Countries A and B, the majority of commuters travelled by car.",
          "answerParts": [
            {
              "text": "In Countries A and B, ",
              "strong": false
            },
            {
              "text": "the majority of commuters travelled by car",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-041"
        },
        {
          "number": 42,
          "chinese": "相反，公共交通在丙国和丁国占主导地位。",
          "answer": "Public transport, by contrast, was the dominant mode in Countries C and D.",
          "answerParts": [
            {
              "text": "Public transport, by contrast, ",
              "strong": false
            },
            {
              "text": "was the dominant mode in Countries C and D",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-042"
        },
        {
          "number": 43,
          "chinese": "甲国的驾车比例最高，为70%。",
          "answer": "Country A recorded the highest proportion of car commuters, at 70%.",
          "answerParts": [
            {
              "text": "Country A ",
              "strong": false
            },
            {
              "text": "recorded the highest proportion of car commuters",
              "strong": true
            },
            {
              "text": ", at 70%.",
              "strong": false
            }
          ],
          "id": "task1-043"
        },
        {
          "number": 44,
          "chinese": "丁国使用公共交通的比例是甲国的三倍。",
          "answer": "The share using public transport in Country D was three times that in Country A.",
          "answerParts": [
            {
              "text": "The share using public transport in Country D was ",
              "strong": false
            },
            {
              "text": "three times that in Country A",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-044"
        },
        {
          "number": 45,
          "chinese": "总体而言，四国可以清楚地分为两个以汽车为主和两个以公共交通为主的国家。",
          "answer": "Overall, the countries fell into two clear groups: two dominated by cars and two by public transport.",
          "answerParts": [
            {
              "text": "Overall, the countries ",
              "strong": false
            },
            {
              "text": "fell into two clear groups",
              "strong": true
            },
            {
              "text": ": two dominated by cars and two by public transport.",
              "strong": false
            }
          ],
          "id": "task1-045"
        }
      ],
      "moduleId": "module-3",
      "moduleName": "模块三：静态图的分组与比较（41–60）"
    },
    {
      "id": "task1-group-10",
      "number": 10,
      "label": "不同年龄组的网络购物率",
      "module": "模块三：静态图的分组与比较（41–60）",
      "context": "16–24岁 78%，25–44岁 85%，45–64岁 56%，65岁以上 22%。",
      "note": "the 25–44 age group 作单数；people aged 25–44 作复数，谓语必须对应。",
      "questions": [
        {
          "number": 46,
          "chinese": "25至44岁人群的网络购物率最高，为85%。",
          "answer": "People aged 25–44 had the highest rate of online shopping, at 85%.",
          "answerParts": [
            {
              "text": "People aged 25–44 ",
              "strong": false
            },
            {
              "text": "had the highest rate of online shopping",
              "strong": true
            },
            {
              "text": ", at 85%.",
              "strong": false
            }
          ],
          "id": "task1-046"
        },
        {
          "number": 47,
          "chinese": "16至24岁组紧随其后，比例为78%。",
          "answer": "The 16–24 group followed closely behind, at 78%.",
          "answerParts": [
            {
              "text": "The 16–24 group ",
              "strong": false
            },
            {
              "text": "followed closely behind",
              "strong": true
            },
            {
              "text": ", at 78%.",
              "strong": false
            }
          ],
          "id": "task1-047"
        },
        {
          "number": 48,
          "chinese": "45至64岁人群的比例明显较低，只有56%。",
          "answer": "The figure for 45–64-year-olds was considerably lower, at just 56%.",
          "answerParts": [
            {
              "text": "The figure for 45–64-year-olds was ",
              "strong": false
            },
            {
              "text": "considerably lower, at just 56%",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-048"
        },
        {
          "number": 49,
          "chinese": "65岁以上人群最少使用网络购物，其比例不到25至44岁组的三分之一。",
          "answer": "Online shopping was least common among those aged 65 and over, whose rate was less than one third of that for 25–44-year-olds.",
          "answerParts": [
            {
              "text": "Online shopping was least common among those aged 65 and over, whose rate was ",
              "strong": false
            },
            {
              "text": "less than one third of that for 25–44-year-olds",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-049"
        },
        {
          "number": 50,
          "chinese": "总体上，网络购物在较年轻的三个年龄组中更普遍。",
          "answer": "Overall, online shopping was substantially more prevalent among the three younger age groups.",
          "answerParts": [
            {
              "text": "Overall, online shopping was ",
              "strong": false
            },
            {
              "text": "substantially more prevalent among the three younger age groups",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-050"
        }
      ],
      "moduleId": "module-3",
      "moduleName": "模块三：静态图的分组与比较（41–60）"
    },
    {
      "id": "task1-group-11",
      "number": 11,
      "label": "两个城市的预算分配",
      "module": "模块三：静态图的分组与比较（41–60）",
      "context": "城市X教育40%、医疗25%、交通20%、其他15%；城市Y教育25%、医疗35%、交通30%、其他10%。",
      "note": "图表只显示资金比例，prioritised 可由最大份额支持；不要进一步猜测“因为当地学校更差”。",
      "questions": [
        {
          "number": 51,
          "chinese": "教育是城市X最大的预算项目，却只占城市Y预算的四分之一。",
          "answer": "Education was the largest budget item in City X, but accounted for only a quarter of spending in City Y.",
          "answerParts": [
            {
              "text": "Education was the largest budget item in City X, but ",
              "strong": false
            },
            {
              "text": "accounted for only a quarter of spending in City Y",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-051"
        },
        {
          "number": 52,
          "chinese": "城市Y在医疗上的支出比例比城市X高10个百分点。",
          "answer": "City Y allocated 10 percentage points more of its budget to healthcare than City X did.",
          "answerParts": [
            {
              "text": "City Y allocated ",
              "strong": false
            },
            {
              "text": "10 percentage points more of its budget to healthcare",
              "strong": true
            },
            {
              "text": " than City X did.",
              "strong": false
            }
          ],
          "id": "task1-052"
        },
        {
          "number": 53,
          "chinese": "两个城市用于交通的比例分别为20%和30%。",
          "answer": "The respective proportions spent on transport in the two cities were 20% and 30%.",
          "answerParts": [
            {
              "text": "The respective proportions spent on transport in the two cities ",
              "strong": false
            },
            {
              "text": "were 20% and 30%",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-053"
        },
        {
          "number": 54,
          "chinese": "“其他”支出在两个城市中都是最小的类别。",
          "answer": "Other expenditure was the smallest category in both cities.",
          "answerParts": [
            {
              "text": "Other expenditure ",
              "strong": false
            },
            {
              "text": "was the smallest category in both cities",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-054"
        },
        {
          "number": 55,
          "chinese": "总体而言，城市X更重视教育，而城市Y把更大比例的资金用于医疗和交通。",
          "answer": "Overall, City X prioritised education, whereas City Y devoted larger shares to healthcare and transport.",
          "answerParts": [
            {
              "text": "Overall, City X prioritised education, whereas City Y ",
              "strong": false
            },
            {
              "text": "devoted larger shares to healthcare and transport",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-055"
        }
      ],
      "moduleId": "module-3",
      "moduleName": "模块三：静态图的分组与比较（41–60）"
    },
    {
      "id": "task1-group-12",
      "number": 12,
      "label": "五门课程的男女选课人数",
      "module": "模块三：静态图的分组与比较（41–60）",
      "context": "工程男80女20；护理男15女85；商业男55女50；艺术男35女60；科学男60女45。",
      "note": "outnumber 是及物动词，写 men outnumbered women；不能写 the number of men outnumbered women。",
      "questions": [
        {
          "number": 56,
          "chinese": "工程专业的男性人数是女性的四倍。",
          "answer": "The number of men studying engineering was four times the number of women.",
          "answerParts": [
            {
              "text": "The number of men studying engineering was ",
              "strong": false
            },
            {
              "text": "four times the number of women",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-056"
        },
        {
          "number": 57,
          "chinese": "护理专业呈现相反格局，女性占绝大多数。",
          "answer": "Nursing displayed the opposite pattern, with women forming an overwhelming majority.",
          "answerParts": [
            {
              "text": "Nursing displayed the opposite pattern, with women ",
              "strong": false
            },
            {
              "text": "forming an overwhelming majority",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-057"
        },
        {
          "number": 58,
          "chinese": "商业课程的男女选课人数最为接近。",
          "answer": "Business showed the smallest gender difference in enrolment.",
          "answerParts": [
            {
              "text": "Business ",
              "strong": false
            },
            {
              "text": "showed the smallest gender difference",
              "strong": true
            },
            {
              "text": " in enrolment.",
              "strong": false
            }
          ],
          "id": "task1-058"
        },
        {
          "number": 59,
          "chinese": "男性在工程和科学方面人数更多，而女性在护理和艺术方面占优势。",
          "answer": "Men outnumbered women in engineering and science, while women predominated in nursing and art.",
          "answerParts": [
            {
              "text": "Men outnumbered women in engineering and science, while women ",
              "strong": false
            },
            {
              "text": "predominated in nursing and art",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-059"
        },
        {
          "number": 60,
          "chinese": "总体来看，学科选择存在明显的性别差异，但商业课程是一个例外。",
          "answer": "Overall, subject choice varied markedly by gender, with business as the main exception.",
          "answerParts": [
            {
              "text": "Overall, subject choice varied markedly by gender, ",
              "strong": false
            },
            {
              "text": "with business as the main exception",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-060"
        }
      ],
      "moduleId": "module-3",
      "moduleName": "模块三：静态图的分组与比较（41–60）"
    },
    {
      "id": "task1-group-13",
      "number": 13,
      "label": "动态图 Overview",
      "module": "模块四：Overview 选择主要特征（61–80）",
      "context": "A持续上升；B持续下降；C先升后降；期末A最高、B最低。本组只练 Overview，不写具体数字。",
      "note": "这 5 句是不同可用表达，不应全部塞进同一篇 Overview；考试时选择最能概括全图的 1–2 句。",
      "questions": [
        {
          "number": 61,
          "chinese": "总体来看，A呈持续上升趋势，而B在整个时期不断下降。",
          "answer": "Overall, A followed a sustained upward trend, whereas B declined throughout the period.",
          "answerParts": [
            {
              "text": "Overall, A ",
              "strong": false
            },
            {
              "text": "followed a sustained upward trend",
              "strong": true
            },
            {
              "text": ", whereas B declined throughout the period.",
              "strong": false
            }
          ],
          "id": "task1-061"
        },
        {
          "number": 62,
          "chinese": "C最初增长，但在后半段失去了全部增幅。",
          "answer": "C rose initially but lost all of its gains during the second half of the period.",
          "answerParts": [
            {
              "text": "C rose initially but ",
              "strong": false
            },
            {
              "text": "lost all of its gains during the second half of the period",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-062"
        },
        {
          "number": 63,
          "chinese": "A由最小类别变成最大类别。",
          "answer": "A moved from being the smallest category to the largest.",
          "answerParts": [
            {
              "text": "A ",
              "strong": false
            },
            {
              "text": "moved from being the smallest category to the largest",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-063"
        },
        {
          "number": 64,
          "chinese": "相比之下，B从首位降至末位。",
          "answer": "By contrast, B fell from first place to last.",
          "answerParts": [
            {
              "text": "By contrast, B ",
              "strong": false
            },
            {
              "text": "fell from first place to last",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-064"
        },
        {
          "number": 65,
          "chinese": "最显著的总体特征是A与B的排名完全逆转。",
          "answer": "The most striking overall feature is the complete reversal in the rankings of A and B.",
          "answerParts": [
            {
              "text": "The most striking overall feature is ",
              "strong": false
            },
            {
              "text": "the complete reversal in the rankings of A and B",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-065"
        }
      ],
      "moduleId": "module-4",
      "moduleName": "模块四：Overview 选择主要特征（61–80）"
    },
    {
      "id": "task1-group-14",
      "number": 14,
      "label": "静态图 Overview",
      "module": "模块四：Overview 选择主要特征（61–80）",
      "context": "六类产品在四国的销量；电子产品整体最高，书籍整体最低；甲乙结构相似，丙丁结构相似。",
      "note": "Overview 不等于把每类数据重新念一遍；要提炼最高、最低、共同模式和显著例外。",
      "questions": [
        {
          "number": 66,
          "chinese": "总体而言，电子产品在四个国家中都是最畅销的类别。",
          "answer": "Overall, electronics were the best-selling category in all four countries.",
          "answerParts": [
            {
              "text": "Overall, electronics ",
              "strong": false
            },
            {
              "text": "were the best-selling category in all four countries",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-066"
        },
        {
          "number": 67,
          "chinese": "书籍的销量普遍最低。",
          "answer": "Books consistently recorded the lowest sales figures.",
          "answerParts": [
            {
              "text": "Books ",
              "strong": false
            },
            {
              "text": "consistently recorded the lowest sales figures",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-067"
        },
        {
          "number": 68,
          "chinese": "甲国和乙国的消费结构大体相似。",
          "answer": "Countries A and B displayed broadly similar purchasing patterns.",
          "answerParts": [
            {
              "text": "Countries A and B ",
              "strong": false
            },
            {
              "text": "displayed broadly similar purchasing patterns",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-068"
        },
        {
          "number": 69,
          "chinese": "丙国和丁国形成了另一个较为接近的组别。",
          "answer": "Countries C and D formed a second, relatively similar group.",
          "answerParts": [
            {
              "text": "Countries C and D ",
              "strong": false
            },
            {
              "text": "formed a second, relatively similar group",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-069"
        },
        {
          "number": 70,
          "chinese": "最明显的特征是产品类别造成的差异大于国家之间的差异。",
          "answer": "The clearest feature is that variation by product category was greater than variation between countries.",
          "answerParts": [
            {
              "text": "The clearest feature is that variation by product category was ",
              "strong": false
            },
            {
              "text": "greater than variation between countries",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-070"
        }
      ],
      "moduleId": "module-4",
      "moduleName": "模块四：Overview 选择主要特征（61–80）"
    },
    {
      "id": "task1-group-15",
      "number": 15,
      "label": "混合图 Overview",
      "module": "模块四：Overview 选择主要特征（61–80）",
      "context": "柱图显示游客总数2000–2020持续增长；饼图显示2020年休闲游客占多数，商务游客较少。",
      "note": "混合图的 Overview 必须覆盖两幅图；第74句只有在数据确实支持这种联系时才能使用。",
      "questions": [
        {
          "number": 71,
          "chinese": "总体来看，游客总数在所示时期内显著增长。",
          "answer": "Overall, the total number of visitors increased substantially over the period shown.",
          "answerParts": [
            {
              "text": "Overall, the total number of visitors ",
              "strong": false
            },
            {
              "text": "increased substantially over the period shown",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-071"
        },
        {
          "number": 72,
          "chinese": "2020年，休闲旅行是到访的主要目的。",
          "answer": "Leisure travel was the principal purpose of visits in 2020.",
          "answerParts": [
            {
              "text": "Leisure travel was ",
              "strong": false
            },
            {
              "text": "the principal purpose of visits in 2020",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-072"
        },
        {
          "number": 73,
          "chinese": "商务游客在期末只占较小比例。",
          "answer": "Business travellers made up a relatively small share at the end of the period.",
          "answerParts": [
            {
              "text": "Business travellers ",
              "strong": false
            },
            {
              "text": "made up a relatively small share",
              "strong": true
            },
            {
              "text": " at the end of the period.",
              "strong": false
            }
          ],
          "id": "task1-073"
        },
        {
          "number": 74,
          "chinese": "两幅图共同表明，游客增长主要与休闲旅行有关。",
          "answer": "Taken together, the charts indicate that visitor growth was largely associated with leisure travel.",
          "answerParts": [
            {
              "text": "Taken together, the charts indicate that visitor growth was ",
              "strong": false
            },
            {
              "text": "largely associated with leisure travel",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-074"
        },
        {
          "number": 75,
          "chinese": "最重要的特征是总量上升，同时休闲游客在最终构成中占主导。",
          "answer": "The key features are the rise in overall numbers and the dominance of leisure visitors in the final breakdown.",
          "answerParts": [
            {
              "text": "The key features are ",
              "strong": false
            },
            {
              "text": "the rise in overall numbers and the dominance of leisure visitors in the final breakdown",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-075"
        }
      ],
      "moduleId": "module-4",
      "moduleName": "模块四：Overview 选择主要特征（61–80）"
    },
    {
      "id": "task1-group-16",
      "number": 16,
      "label": "判断什么不该写进 Overview",
      "module": "模块四：Overview 选择主要特征（61–80）",
      "context": "某校学生总数上升；女生后来超过男生；海外学生始终是少数；2012年男生为1,240人。前3项是主要特征，最后一项只是细节。",
      "note": "Overview 的价值在于筛选。一个准确数字如果不能代表总体趋势，仍然不是 Overview 内容。",
      "questions": [
        {
          "number": 76,
          "chinese": "学生总数在整个时期有所增加。",
          "answer": "The total student population grew over the period as a whole.",
          "answerParts": [
            {
              "text": "The total student population ",
              "strong": false
            },
            {
              "text": "grew over the period as a whole",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-076"
        },
        {
          "number": 77,
          "chinese": "女生人数后来超过了男生人数。",
          "answer": "Female enrolment eventually overtook male enrolment.",
          "answerParts": [
            {
              "text": "Female enrolment ",
              "strong": false
            },
            {
              "text": "eventually overtook male enrolment",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-077"
        },
        {
          "number": 78,
          "chinese": "海外学生虽然有所增加，但始终只占少数。",
          "answer": "Although the number of overseas students rose, they remained a minority throughout.",
          "answerParts": [
            {
              "text": "Although the number of overseas students rose, they ",
              "strong": false
            },
            {
              "text": "remained a minority throughout",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-078"
        },
        {
          "number": 79,
          "chinese": "2012年，男生人数恰好为1,240人。",
          "answer": "In 2012, there were exactly 1,240 male students.",
          "answerParts": [
            {
              "text": "In 2012, ",
              "strong": false
            },
            {
              "text": "there were exactly 1,240 male students",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-079"
        },
        {
          "number": 80,
          "chinese": "第79句适合放在正文细节段，而不适合单独作为总体概述。",
          "answer": "Sentence 79 belongs in a detailed body paragraph rather than serving as part of the overview.",
          "answerParts": [
            {
              "text": "Sentence 79 belongs in a detailed body paragraph rather than ",
              "strong": false
            },
            {
              "text": "serving as part of the overview",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-080"
        }
      ],
      "moduleId": "module-4",
      "moduleName": "模块四：Overview 选择主要特征（61–80）"
    },
    {
      "id": "task1-group-17",
      "number": 17,
      "label": "小镇1990年与2020年",
      "module": "模块五：地图与平面图（81–100）",
      "context": "北部农田变为住宅区；中心商店保留；东部工厂拆除后建公园；道路向南延伸。",
      "note": "地图描述通常用被动语态；was replaced by 后接新设施，was converted into 强调用途改变。",
      "questions": [
        {
          "number": 81,
          "chinese": "总体而言，该镇变得更加住宅化，工业用地和农田都有所减少。",
          "answer": "Overall, the town became more residential, with reductions in both industrial and agricultural land.",
          "answerParts": [
            {
              "text": "Overall, the town became ",
              "strong": false
            },
            {
              "text": "more residential, with reductions in both industrial and agricultural land",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-081"
        },
        {
          "number": 82,
          "chinese": "镇北部的农田被一个大型住宅区取代。",
          "answer": "The farmland in the north of the town was replaced by a large residential area.",
          "answerParts": [
            {
              "text": "The farmland in the north of the town ",
              "strong": false
            },
            {
              "text": "was replaced by a large residential area",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-082"
        },
        {
          "number": 83,
          "chinese": "位于镇中心的商店在整个时期保持不变。",
          "answer": "The shops in the town centre remained unchanged throughout the period.",
          "answerParts": [
            {
              "text": "The shops in the town centre ",
              "strong": false
            },
            {
              "text": "remained unchanged throughout the period",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-083"
        },
        {
          "number": 84,
          "chinese": "东部的工厂被拆除，原址建成了一座公园。",
          "answer": "The factory in the east was demolished to make way for a park.",
          "answerParts": [
            {
              "text": "The factory in the east ",
              "strong": false
            },
            {
              "text": "was demolished to make way for a park",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-084"
        },
        {
          "number": 85,
          "chinese": "主干道向南延伸，以连接新开发区域。",
          "answer": "The main road was extended southwards to connect the new development.",
          "answerParts": [
            {
              "text": "The main road ",
              "strong": false
            },
            {
              "text": "was extended southwards to connect the new development",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-085"
        }
      ],
      "moduleId": "module-5",
      "moduleName": "模块五：地图与平面图（81–100）"
    },
    {
      "id": "task1-group-18",
      "number": 18,
      "label": "公园改造前后",
      "module": "模块五：地图与平面图（81–100）",
      "context": "入口仍在南侧；中央喷泉改为咖啡馆；西侧花园扩大；东北角新增儿童区；环形步道保留。",
      "note": "in the north-eastern corner 表示区域内部角落；to the north-east of X 表示在X的东北方向。",
      "questions": [
        {
          "number": 86,
          "chinese": "公园入口仍位于南侧。",
          "answer": "The entrance remained on the southern side of the park.",
          "answerParts": [
            {
              "text": "The entrance ",
              "strong": false
            },
            {
              "text": "remained on the southern side of the park",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-086"
        },
        {
          "number": 87,
          "chinese": "中央喷泉被改建成一座咖啡馆。",
          "answer": "The central fountain was converted into a café.",
          "answerParts": [
            {
              "text": "The central fountain ",
              "strong": false
            },
            {
              "text": "was converted into a café",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-087"
        },
        {
          "number": 88,
          "chinese": "西侧的花园扩大，占据了更大的区域。",
          "answer": "The garden on the western side was enlarged to occupy a greater area.",
          "answerParts": [
            {
              "text": "The garden on the western side ",
              "strong": false
            },
            {
              "text": "was enlarged to occupy a greater area",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-088"
        },
        {
          "number": 89,
          "chinese": "公园东北角新增了一个儿童游乐区。",
          "answer": "A children's play area was added in the north-eastern corner of the park.",
          "answerParts": [
            {
              "text": "A children's play area ",
              "strong": false
            },
            {
              "text": "was added in the north-eastern corner",
              "strong": true
            },
            {
              "text": " of the park.",
              "strong": false
            }
          ],
          "id": "task1-089"
        },
        {
          "number": 90,
          "chinese": "尽管设施有所更新，环绕公园的步道布局并未改变。",
          "answer": "Despite the new facilities, the layout of the path around the park was left unchanged.",
          "answerParts": [
            {
              "text": "Despite the new facilities, the layout of the path around the park ",
              "strong": false
            },
            {
              "text": "was left unchanged",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-090"
        }
      ],
      "moduleId": "module-5",
      "moduleName": "模块五：地图与平面图（81–100）"
    },
    {
      "id": "task1-group-19",
      "number": 19,
      "label": "无人岛开发为旅游区",
      "module": "模块五：地图与平面图（81–100）",
      "context": "原岛只有树木和海滩；后来中央建接待处，东西两侧建住宿，南岸建码头，各处由步道连接。",
      "note": "地图 Overview 应同时写主要开发方向和明显保留项，不能只列“建了A、建了B”。",
      "questions": [
        {
          "number": 91,
          "chinese": "开发前，岛上除了树木和海滩外没有任何设施。",
          "answer": "Before development, the island contained no facilities apart from trees and a beach.",
          "answerParts": [
            {
              "text": "Before development, the island ",
              "strong": false
            },
            {
              "text": "contained no facilities apart from trees and a beach",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-091"
        },
        {
          "number": 92,
          "chinese": "接待中心建在岛屿中央。",
          "answer": "A reception building was constructed in the centre of the island.",
          "answerParts": [
            {
              "text": "A reception building ",
              "strong": false
            },
            {
              "text": "was constructed in the centre of the island",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-092"
        },
        {
          "number": 93,
          "chinese": "两组住宿设施分别分布在接待中心的东侧和西侧。",
          "answer": "Two groups of accommodation units were located to the east and west of the reception building.",
          "answerParts": [
            {
              "text": "Two groups of accommodation units ",
              "strong": false
            },
            {
              "text": "were located to the east and west of the reception building",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-093"
        },
        {
          "number": 94,
          "chinese": "南岸新建的码头使游客能够乘船到达该岛。",
          "answer": "A new pier on the southern coast enabled visitors to reach the island by boat.",
          "answerParts": [
            {
              "text": "A new pier on the southern coast ",
              "strong": false
            },
            {
              "text": "enabled visitors to reach the island by boat",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-094"
        },
        {
          "number": 95,
          "chinese": "总体来看，该岛被改造成旅游度假区，同时大部分树木得到保留。",
          "answer": "Overall, the island was transformed into a tourist resort while most of its trees were retained.",
          "answerParts": [
            {
              "text": "Overall, the island ",
              "strong": false
            },
            {
              "text": "was transformed into a tourist resort while most of its trees were retained",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-095"
        }
      ],
      "moduleId": "module-5",
      "moduleName": "模块五：地图与平面图（81–100）"
    },
    {
      "id": "task1-group-20",
      "number": 20,
      "label": "未来校园规划",
      "module": "模块五：地图与平面图（81–100）",
      "context": "计划在图书馆北侧建实验楼；停车场迁至西侧；东门关闭；中央道路改为步行区；计划2028年完成。",
      "note": "未来规划可用 will be built、is planned、is to be constructed；全篇选择一种主时态并保持一致。",
      "questions": [
        {
          "number": 96,
          "chinese": "规划中的实验楼将建在图书馆北侧。",
          "answer": "The proposed laboratory building will be constructed to the north of the library.",
          "answerParts": [
            {
              "text": "The proposed laboratory building ",
              "strong": false
            },
            {
              "text": "will be constructed to the north of the library",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-096"
        },
        {
          "number": 97,
          "chinese": "现有停车场将迁至校园西侧。",
          "answer": "The existing car park is to be relocated to the western side of the campus.",
          "answerParts": [
            {
              "text": "The existing car park ",
              "strong": false
            },
            {
              "text": "is to be relocated to the western side of the campus",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-097"
        },
        {
          "number": 98,
          "chinese": "东门将被关闭，车辆只能从南门进入。",
          "answer": "The eastern entrance will be closed, leaving the southern gate as the only point of access for vehicles.",
          "answerParts": [
            {
              "text": "The eastern entrance will be closed, leaving the southern gate as ",
              "strong": false
            },
            {
              "text": "the only point of access for vehicles",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-098"
        },
        {
          "number": 99,
          "chinese": "穿过校园中央的道路将改为步行区。",
          "answer": "The road running through the centre of the campus will be converted into a pedestrian zone.",
          "answerParts": [
            {
              "text": "The road running through the centre of the campus ",
              "strong": false
            },
            {
              "text": "will be converted into a pedestrian zone",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-099"
        },
        {
          "number": 100,
          "chinese": "总体而言，该规划旨在减少校园中心的车辆活动并增加教学空间。",
          "answer": "Overall, the plan will reduce vehicle access to the centre while expanding teaching facilities.",
          "answerParts": [
            {
              "text": "Overall, the plan will ",
              "strong": false
            },
            {
              "text": "reduce vehicle access to the centre while expanding teaching facilities",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-100"
        }
      ],
      "moduleId": "module-5",
      "moduleName": "模块五：地图与平面图（81–100）"
    },
    {
      "id": "task1-group-21",
      "number": 21,
      "label": "咖啡豆生产",
      "module": "模块六：流程图与被动语态（101–120）",
      "context": "采摘成熟果实→去果肉→清洗→晒干→烘焙→包装。线性人工流程。",
      "note": "流程重点是原料发生了什么，通常用被动语态；不要每句都写 workers 或 people。",
      "questions": [
        {
          "number": 101,
          "chinese": "总体来看，咖啡生产是一个由六个主要阶段组成的线性过程。",
          "answer": "Overall, coffee production is a linear process consisting of six main stages.",
          "answerParts": [
            {
              "text": "Overall, coffee production is ",
              "strong": false
            },
            {
              "text": "a linear process consisting of six main stages",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-101"
        },
        {
          "number": 102,
          "chinese": "首先，成熟的咖啡果实由人工采摘。",
          "answer": "First, ripe coffee cherries are picked by hand.",
          "answerParts": [
            {
              "text": "First, ripe coffee cherries ",
              "strong": false
            },
            {
              "text": "are picked by hand",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-102"
        },
        {
          "number": 103,
          "chinese": "去除果肉后，咖啡豆会被彻底清洗。",
          "answer": "Once the outer pulp has been removed, the beans are washed thoroughly.",
          "answerParts": [
            {
              "text": "Once the outer pulp has been removed, the beans ",
              "strong": false
            },
            {
              "text": "are washed thoroughly",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-103"
        },
        {
          "number": 104,
          "chinese": "清洗后的咖啡豆被铺在阳光下晾干。",
          "answer": "The washed beans are spread out in the sun to dry.",
          "answerParts": [
            {
              "text": "The washed beans ",
              "strong": false
            },
            {
              "text": "are spread out in the sun to dry",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-104"
        },
        {
          "number": 105,
          "chinese": "最后，干燥的咖啡豆经过烘焙并包装，以供销售。",
          "answer": "Finally, the dried beans are roasted and packaged for sale.",
          "answerParts": [
            {
              "text": "Finally, the dried beans ",
              "strong": false
            },
            {
              "text": "are roasted and packaged for sale",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-105"
        }
      ],
      "moduleId": "module-6",
      "moduleName": "模块六：流程图与被动语态（101–120）"
    },
    {
      "id": "task1-group-22",
      "number": 22,
      "label": "废纸回收",
      "module": "模块六：流程图与被动语态（101–120）",
      "context": "收集→分类→制浆→去除杂质→压成纸张→再次使用。部分废纸在分类阶段被丢弃。",
      "note": "after being cleaned and pressed 比 after it is cleaned and it is pressed 更紧凑，但只有主语一致时才能使用省略结构。",
      "questions": [
        {
          "number": 106,
          "chinese": "废纸回收从收集旧纸开始，以生产新的纸张结束。",
          "answer": "Paper recycling begins with the collection of used paper and ends with the production of new sheets.",
          "answerParts": [
            {
              "text": "Paper recycling ",
              "strong": false
            },
            {
              "text": "begins with the collection of used paper and ends with the production of new sheets",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-106"
        },
        {
          "number": 107,
          "chinese": "收集到的纸张按照类型和质量进行分类。",
          "answer": "The collected paper is sorted according to type and quality.",
          "answerParts": [
            {
              "text": "The collected paper ",
              "strong": false
            },
            {
              "text": "is sorted according to type and quality",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-107"
        },
        {
          "number": 108,
          "chinese": "不适合回收的材料在这一阶段被去除。",
          "answer": "Material that is unsuitable for recycling is removed at this stage.",
          "answerParts": [
            {
              "text": "Material that is unsuitable for recycling ",
              "strong": false
            },
            {
              "text": "is removed at this stage",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-108"
        },
        {
          "number": 109,
          "chinese": "剩余的纸张与水混合，形成纸浆。",
          "answer": "The remaining paper is mixed with water to form pulp.",
          "answerParts": [
            {
              "text": "The remaining paper ",
              "strong": false
            },
            {
              "text": "is mixed with water to form pulp",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-109"
        },
        {
          "number": 110,
          "chinese": "纸浆经过清洁和压制后成为新纸，可再次投入使用。",
          "answer": "After being cleaned and pressed, the pulp is turned into new paper ready for reuse.",
          "answerParts": [
            {
              "text": "After being cleaned and pressed, the pulp ",
              "strong": false
            },
            {
              "text": "is turned into new paper ready for reuse",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-110"
        }
      ],
      "moduleId": "module-6",
      "moduleName": "模块六：流程图与被动语态（101–120）"
    },
    {
      "id": "task1-group-23",
      "number": 23,
      "label": "太阳能热水系统",
      "module": "模块六：流程图与被动语态（101–120）",
      "context": "冷水进入储水箱→泵入屋顶集热板→阳光加热→热水返回水箱→输送到住宅。",
      "note": "自然过程或液体自行流动可用主动 flows；设备对水执行动作时用被动 is pumped、is supplied。",
      "questions": [
        {
          "number": 111,
          "chinese": "该系统利用太阳能把冷水转化为可供家庭使用的热水。",
          "answer": "The system uses solar energy to convert cold water into hot water for domestic use.",
          "answerParts": [
            {
              "text": "The system uses solar energy to ",
              "strong": false
            },
            {
              "text": "convert cold water into hot water for domestic use",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-111"
        },
        {
          "number": 112,
          "chinese": "冷水首先流入储水箱。",
          "answer": "Cold water first flows into a storage tank.",
          "answerParts": [
            {
              "text": "Cold water first ",
              "strong": false
            },
            {
              "text": "flows into a storage tank",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-112"
        },
        {
          "number": 113,
          "chinese": "随后，水被泵送到安装在屋顶上的太阳能集热板。",
          "answer": "It is then pumped to solar collectors mounted on the roof.",
          "answerParts": [
            {
              "text": "It is then pumped to ",
              "strong": false
            },
            {
              "text": "solar collectors mounted on the roof",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-113"
        },
        {
          "number": 114,
          "chinese": "当水流经集热板时，阳光产生的热量使其温度升高。",
          "answer": "As the water passes through the collectors, heat from the sun raises its temperature.",
          "answerParts": [
            {
              "text": "As the water passes through the collectors, heat from the sun ",
              "strong": false
            },
            {
              "text": "raises its temperature",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-114"
        },
        {
          "number": 115,
          "chinese": "加热后的水返回储水箱，然后被输送到住宅内部。",
          "answer": "The heated water returns to the tank before being supplied to the house.",
          "answerParts": [
            {
              "text": "The heated water returns to the tank before ",
              "strong": false
            },
            {
              "text": "being supplied to the house",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-115"
        }
      ],
      "moduleId": "module-6",
      "moduleName": "模块六：流程图与被动语态（101–120）"
    },
    {
      "id": "task1-group-24",
      "number": 24,
      "label": "青蛙生命周期",
      "module": "模块六：流程图与被动语态（101–120）",
      "context": "卵→蝌蚪→长出后腿→长出前腿并缩短尾巴→幼蛙→成年蛙→产卵。循环自然过程。",
      "note": "自然生命周期通常用一般现在时；cyclical process 的 Overview 应明确“最终回到起点”。",
      "questions": [
        {
          "number": 116,
          "chinese": "青蛙的生命周期是一个循环过程，从卵开始，最后由成年蛙再次产卵。",
          "answer": "The life cycle of a frog is a cyclical process that begins with eggs and ends when adult frogs lay eggs again.",
          "answerParts": [
            {
              "text": "The life cycle of a frog is ",
              "strong": false
            },
            {
              "text": "a cyclical process that begins with eggs and ends when adult frogs lay eggs again",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-116"
        },
        {
          "number": 117,
          "chinese": "卵孵化后，幼小的蝌蚪进入水中。",
          "answer": "After the eggs hatch, young tadpoles emerge into the water.",
          "answerParts": [
            {
              "text": "After the eggs hatch, ",
              "strong": false
            },
            {
              "text": "young tadpoles emerge into the water",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-117"
        },
        {
          "number": 118,
          "chinese": "随着蝌蚪生长，它先长出后腿，随后长出前腿。",
          "answer": "As the tadpole develops, its hind legs appear before its front legs.",
          "answerParts": [
            {
              "text": "As the tadpole develops, ",
              "strong": false
            },
            {
              "text": "its hind legs appear before its front legs",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-118"
        },
        {
          "number": 119,
          "chinese": "在下一阶段，尾巴逐渐缩短，幼蛙开始形成。",
          "answer": "During the next stage, the tail gradually shortens as a young frog forms.",
          "answerParts": [
            {
              "text": "During the next stage, the tail ",
              "strong": false
            },
            {
              "text": "gradually shortens as a young frog forms",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-119"
        },
        {
          "number": 120,
          "chinese": "成年蛙最终产卵，从而开始新一轮生命周期。",
          "answer": "The adult frog eventually lays eggs, thereby beginning a new cycle.",
          "answerParts": [
            {
              "text": "The adult frog eventually lays eggs, ",
              "strong": false
            },
            {
              "text": "thereby beginning a new cycle",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-120"
        }
      ],
      "moduleId": "module-6",
      "moduleName": "模块六：流程图与被动语态（101–120）"
    },
    {
      "id": "task1-group-25",
      "number": 25,
      "label": "微型报告一：回收率折线图",
      "module": "模块七：把单句连成微型报告（121–140）",
      "context": "图表比较1982–2010年纸张、玻璃、铝罐和塑料的回收比例。纸张先升后略降但始终最高；铝罐增长最快；塑料始终最低。",
      "note": "第121句只是改写题目，不是 Overview；第122句才是总体概述。",
      "questions": [
        {
          "number": 121,
          "chinese": "该折线图比较了1982年至2010年间四种材料的回收比例。",
          "answer": "The line graph compares the percentages of four materials recycled between 1982 and 2010.",
          "answerParts": [
            {
              "text": "The line graph ",
              "strong": false
            },
            {
              "text": "compares the percentages of four materials recycled between 1982 and 2010",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-121"
        },
        {
          "number": 122,
          "chinese": "总体而言，纸张的回收率始终最高，而塑料一直排在最后。",
          "answer": "Overall, paper consistently had the highest recycling rate, while plastic remained the least recycled material.",
          "answerParts": [
            {
              "text": "Overall, paper ",
              "strong": false
            },
            {
              "text": "consistently had the highest recycling rate",
              "strong": true
            },
            {
              "text": ", while plastic remained the least recycled material.",
              "strong": false
            }
          ],
          "id": "task1-122"
        },
        {
          "number": 123,
          "chinese": "纸张回收率最初上升，达到峰值后在期末略有下降。",
          "answer": "The figure for paper rose initially before declining slightly after reaching a peak.",
          "answerParts": [
            {
              "text": "The figure for paper rose initially before ",
              "strong": false
            },
            {
              "text": "declining slightly after reaching a peak",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-123"
        },
        {
          "number": 124,
          "chinese": "铝罐虽然起点较低，却在整个时期增长最快。",
          "answer": "Despite starting from a low base, aluminium cans recorded the fastest growth over the period.",
          "answerParts": [
            {
              "text": "Despite starting from a low base, aluminium cans ",
              "strong": false
            },
            {
              "text": "recorded the fastest growth over the period",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-124"
        },
        {
          "number": 125,
          "chinese": "相比之下，塑料回收率只出现了小幅提高，最终仍远低于其他材料。",
          "answer": "By contrast, plastic recycling increased only marginally and finished well below the other figures.",
          "answerParts": [
            {
              "text": "By contrast, plastic recycling ",
              "strong": false
            },
            {
              "text": "increased only marginally and finished well below the other figures",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-125"
        }
      ],
      "moduleId": "module-7",
      "moduleName": "模块七：把单句连成微型报告（121–140）"
    },
    {
      "id": "task1-group-26",
      "number": 26,
      "label": "微型报告二：四类毕业生去向",
      "module": "模块七：把单句连成微型报告（121–140）",
      "context": "柱图显示某大学毕业生去向：全职工作55%、继续深造25%、兼职工作12%、失业8%。",
      "note": "静态图用 was、accounted for、entered；不要写 full-time employment increased to 55%。",
      "questions": [
        {
          "number": 126,
          "chinese": "该柱状图显示了某大学毕业生毕业后的四种去向。",
          "answer": "The bar chart shows the four destinations of graduates from a particular university.",
          "answerParts": [
            {
              "text": "The bar chart ",
              "strong": false
            },
            {
              "text": "shows the four destinations of graduates from a particular university",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-126"
        },
        {
          "number": 127,
          "chinese": "总体来看，全职就业是最常见的去向，而失业所占比例最小。",
          "answer": "Overall, full-time employment was by far the most common outcome, whereas unemployment was the least common.",
          "answerParts": [
            {
              "text": "Overall, full-time employment was ",
              "strong": false
            },
            {
              "text": "by far the most common outcome",
              "strong": true
            },
            {
              "text": ", whereas unemployment was the least common.",
              "strong": false
            }
          ],
          "id": "task1-127"
        },
        {
          "number": 128,
          "chinese": "超过一半的毕业生进入全职工作，具体比例为55%。",
          "answer": "Just over half of the graduates entered full-time employment, at 55%.",
          "answerParts": [
            {
              "text": "Just over half of the graduates ",
              "strong": false
            },
            {
              "text": "entered full-time employment",
              "strong": true
            },
            {
              "text": ", at 55%.",
              "strong": false
            }
          ],
          "id": "task1-128"
        },
        {
          "number": 129,
          "chinese": "继续深造的人占四分之一，比例不到全职就业者的一半。",
          "answer": "A quarter continued their studies, less than half the proportion taking full-time jobs.",
          "answerParts": [
            {
              "text": "A quarter continued their studies, ",
              "strong": false
            },
            {
              "text": "less than half the proportion taking full-time jobs",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-129"
        },
        {
          "number": 130,
          "chinese": "兼职工作和失业分别占12%和8%，两者合计仅为五分之一。",
          "answer": "Part-time work and unemployment accounted for 12% and 8% respectively, a combined share of only one fifth.",
          "answerParts": [
            {
              "text": "Part-time work and unemployment accounted for 12% and 8% respectively, ",
              "strong": false
            },
            {
              "text": "a combined share of only one fifth",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-130"
        }
      ],
      "moduleId": "module-7",
      "moduleName": "模块七：把单句连成微型报告（121–140）"
    },
    {
      "id": "task1-group-27",
      "number": 27,
      "label": "微型报告三：火车站改造",
      "module": "模块七：把单句连成微型报告（121–140）",
      "context": "旧站只有一个站台和售票处；新方案增加第二站台、咖啡馆和自行车停放区；售票处保留；入口扩大。",
      "note": "地图正文按区域或改动类型分组；不要毫无顺序地逐项“左边有、右边有”。",
      "questions": [
        {
          "number": 131,
          "chinese": "两幅平面图展示了火车站目前的布局和计划改造后的样子。",
          "answer": "The two plans show the current layout of a railway station and its proposed redevelopment.",
          "answerParts": [
            {
              "text": "The two plans ",
              "strong": false
            },
            {
              "text": "show the current layout of a railway station and its proposed redevelopment",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-131"
        },
        {
          "number": 132,
          "chinese": "总体而言，车站将增加乘客设施和交通容量，而原有售票处会被保留。",
          "answer": "Overall, the station will gain more passenger facilities and greater capacity, while the existing ticket office will be retained.",
          "answerParts": [
            {
              "text": "Overall, the station will ",
              "strong": false
            },
            {
              "text": "gain more passenger facilities and greater capacity",
              "strong": true
            },
            {
              "text": ", while the existing ticket office will be retained.",
              "strong": false
            }
          ],
          "id": "task1-132"
        },
        {
          "number": 133,
          "chinese": "第二个站台将建在现有铁轨的北侧。",
          "answer": "A second platform will be constructed on the northern side of the existing tracks.",
          "answerParts": [
            {
              "text": "A second platform ",
              "strong": false
            },
            {
              "text": "will be constructed on the northern side of the existing tracks",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-133"
        },
        {
          "number": 134,
          "chinese": "入口附近将新增咖啡馆，东侧则规划了自行车停放区。",
          "answer": "A café will be added near the entrance, while a bicycle parking area is planned for the eastern side.",
          "answerParts": [
            {
              "text": "A café will be added near the entrance, while ",
              "strong": false
            },
            {
              "text": "a bicycle parking area is planned for the eastern side",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-134"
        },
        {
          "number": 135,
          "chinese": "售票处的位置不会改变，但主入口将被拓宽。",
          "answer": "The ticket office will remain in the same position, but the main entrance will be widened.",
          "answerParts": [
            {
              "text": "The ticket office will remain in the same position, but ",
              "strong": false
            },
            {
              "text": "the main entrance will be widened",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-135"
        }
      ],
      "moduleId": "module-7",
      "moduleName": "模块七：把单句连成微型报告（121–140）"
    },
    {
      "id": "task1-group-28",
      "number": 28,
      "label": "微型报告四：玻璃瓶循环利用",
      "module": "模块七：把单句连成微型报告（121–140）",
      "context": "空瓶回收→卡车运输→按颜色分类→清洗→熔化→制成新瓶→灌装→送往商店，之后可再次回收。",
      "note": "Overview 说明这是循环过程；正文按箭头顺序写，不漏掉会改变原料状态的关键阶段。",
      "questions": [
        {
          "number": 136,
          "chinese": "该图说明了废旧玻璃瓶如何被回收并重新投入使用。",
          "answer": "The diagram illustrates how used glass bottles are recycled and returned to use.",
          "answerParts": [
            {
              "text": "The diagram ",
              "strong": false
            },
            {
              "text": "illustrates how used glass bottles are recycled and returned to use",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-136"
        },
        {
          "number": 137,
          "chinese": "总体来看，这是一个循环过程，包括收集、加工、重新灌装和再次销售。",
          "answer": "Overall, it is a cyclical process involving collection, processing, refilling, and resale.",
          "answerParts": [
            {
              "text": "Overall, it is ",
              "strong": false
            },
            {
              "text": "a cyclical process involving collection, processing, refilling, and resale",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-137"
        },
        {
          "number": 138,
          "chinese": "回收的瓶子由卡车运到处理厂，并按照颜色分类。",
          "answer": "The collected bottles are transported by truck to a processing plant, where they are sorted by colour.",
          "answerParts": [
            {
              "text": "The collected bottles are transported by truck to a processing plant, where they ",
              "strong": false
            },
            {
              "text": "are sorted by colour",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-138"
        },
        {
          "number": 139,
          "chinese": "清洗后，玻璃被熔化并制成新的瓶子。",
          "answer": "After being cleaned, the glass is melted and formed into new bottles.",
          "answerParts": [
            {
              "text": "After being cleaned, the glass ",
              "strong": false
            },
            {
              "text": "is melted and formed into new bottles",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-139"
        },
        {
          "number": 140,
          "chinese": "新瓶完成灌装后被送往商店，使用后又可以进入同一循环。",
          "answer": "Once filled, the new bottles are delivered to shops and can re-enter the same cycle after use.",
          "answerParts": [
            {
              "text": "Once filled, the new bottles are delivered to shops and can ",
              "strong": false
            },
            {
              "text": "re-enter the same cycle after use",
              "strong": true
            },
            {
              "text": ".",
              "strong": false
            }
          ],
          "id": "task1-140"
        }
      ],
      "moduleId": "module-7",
      "moduleName": "模块七：把单句连成微型报告（121–140）"
    }
  ],
  "items": [
    {
      "id": "task1-001",
      "number": 1,
      "groupId": "task1-group-01",
      "groupNumber": 1,
      "moduleId": "module-1",
      "moduleName": "模块一：数字、单位与比较不出错（1–20）",
      "groupLabel": "饼图：家庭支出构成",
      "module": "模块一：数字、单位与比较不出错（1–20）",
      "context": "住房 45%，食品 30%，交通 15%，娱乐 10%。本组训练占比、排序和合计。",
      "note": "45% 比 10% 多 35 个百分点，但前者是后者的 4.5 倍，不是“高 4.5 倍”。",
      "chinese": "住房占家庭总支出的45%。",
      "answer": "Housing accounted for 45% of total household expenditure.",
      "answerParts": [
        {
          "text": "Housing ",
          "strong": false
        },
        {
          "text": "accounted for 45% of total household expenditure",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-002",
      "number": 2,
      "groupId": "task1-group-01",
      "groupNumber": 1,
      "moduleId": "module-1",
      "moduleName": "模块一：数字、单位与比较不出错（1–20）",
      "groupLabel": "饼图：家庭支出构成",
      "module": "模块一：数字、单位与比较不出错（1–20）",
      "context": "住房 45%，食品 30%，交通 15%，娱乐 10%。本组训练占比、排序和合计。",
      "note": "45% 比 10% 多 35 个百分点，但前者是后者的 4.5 倍，不是“高 4.5 倍”。",
      "chinese": "食品是第二大支出项目，占30%。",
      "answer": "Food was the second-largest category, representing 30% of the total.",
      "answerParts": [
        {
          "text": "Food was the second-largest category, ",
          "strong": false
        },
        {
          "text": "representing 30% of the total",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-003",
      "number": 3,
      "groupId": "task1-group-01",
      "groupNumber": 1,
      "moduleId": "module-1",
      "moduleName": "模块一：数字、单位与比较不出错（1–20）",
      "groupLabel": "饼图：家庭支出构成",
      "module": "模块一：数字、单位与比较不出错（1–20）",
      "context": "住房 45%，食品 30%，交通 15%，娱乐 10%。本组训练占比、排序和合计。",
      "note": "45% 比 10% 多 35 个百分点，但前者是后者的 4.5 倍，不是“高 4.5 倍”。",
      "chinese": "交通支出的比例比娱乐高5个百分点。",
      "answer": "The proportion spent on transport was 5 percentage points higher than that for entertainment.",
      "answerParts": [
        {
          "text": "The proportion spent on transport was ",
          "strong": false
        },
        {
          "text": "5 percentage points higher than",
          "strong": true
        },
        {
          "text": " that for entertainment.",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-004",
      "number": 4,
      "groupId": "task1-group-01",
      "groupNumber": 1,
      "moduleId": "module-1",
      "moduleName": "模块一：数字、单位与比较不出错（1–20）",
      "groupLabel": "饼图：家庭支出构成",
      "module": "模块一：数字、单位与比较不出错（1–20）",
      "context": "住房 45%，食品 30%，交通 15%，娱乐 10%。本组训练占比、排序和合计。",
      "note": "45% 比 10% 多 35 个百分点，但前者是后者的 4.5 倍，不是“高 4.5 倍”。",
      "chinese": "住房支出是娱乐支出的四倍半。",
      "answer": "Spending on housing was four and a half times as high as spending on entertainment.",
      "answerParts": [
        {
          "text": "Spending on housing was ",
          "strong": false
        },
        {
          "text": "four and a half times as high as",
          "strong": true
        },
        {
          "text": " spending on entertainment.",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-005",
      "number": 5,
      "groupId": "task1-group-01",
      "groupNumber": 1,
      "moduleId": "module-1",
      "moduleName": "模块一：数字、单位与比较不出错（1–20）",
      "groupLabel": "饼图：家庭支出构成",
      "module": "模块一：数字、单位与比较不出错（1–20）",
      "context": "住房 45%，食品 30%，交通 15%，娱乐 10%。本组训练占比、排序和合计。",
      "note": "45% 比 10% 多 35 个百分点，但前者是后者的 4.5 倍，不是“高 4.5 倍”。",
      "chinese": "住房和食品合计占全部支出的四分之三。",
      "answer": "Housing and food together made up three quarters of all expenditure.",
      "answerParts": [
        {
          "text": "Housing and food ",
          "strong": false
        },
        {
          "text": "together made up three quarters of",
          "strong": true
        },
        {
          "text": " all expenditure.",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-006",
      "number": 6,
      "groupId": "task1-group-02",
      "groupNumber": 2,
      "moduleId": "module-1",
      "moduleName": "模块一：数字、单位与比较不出错（1–20）",
      "groupLabel": "表格：三座机场的年客流量",
      "module": "模块一：数字、单位与比较不出错（1–20）",
      "context": "A机场 120万人，B机场 80万人，C机场 60万人。单位为 passengers per year。",
      "note": "比较数字用 those at Airport C，避免重复 passenger numbers，也避免错误的 than Airport C。",
      "chinese": "A机场每年接待约120万名乘客。",
      "answer": "Airport A handled approximately 1.2 million passengers per year.",
      "answerParts": [
        {
          "text": "Airport A handled ",
          "strong": false
        },
        {
          "text": "approximately 1.2 million passengers per year",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-007",
      "number": 7,
      "groupId": "task1-group-02",
      "groupNumber": 2,
      "moduleId": "module-1",
      "moduleName": "模块一：数字、单位与比较不出错（1–20）",
      "groupLabel": "表格：三座机场的年客流量",
      "module": "模块一：数字、单位与比较不出错（1–20）",
      "context": "A机场 120万人，B机场 80万人，C机场 60万人。单位为 passengers per year。",
      "note": "比较数字用 those at Airport C，避免重复 passenger numbers，也避免错误的 than Airport C。",
      "chinese": "B机场的年客流量为80万人，比A机场少40万人。",
      "answer": "Airport B served 800,000 passengers annually, 400,000 fewer than Airport A.",
      "answerParts": [
        {
          "text": "Airport B served 800,000 passengers annually, ",
          "strong": false
        },
        {
          "text": "400,000 fewer than Airport A",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-008",
      "number": 8,
      "groupId": "task1-group-02",
      "groupNumber": 2,
      "moduleId": "module-1",
      "moduleName": "模块一：数字、单位与比较不出错（1–20）",
      "groupLabel": "表格：三座机场的年客流量",
      "module": "模块一：数字、单位与比较不出错（1–20）",
      "context": "A机场 120万人，B机场 80万人，C机场 60万人。单位为 passengers per year。",
      "note": "比较数字用 those at Airport C，避免重复 passenger numbers，也避免错误的 than Airport C。",
      "chinese": "A机场的客流量正好是C机场的两倍。",
      "answer": "Passenger numbers at Airport A were exactly twice those at Airport C.",
      "answerParts": [
        {
          "text": "Passenger numbers at Airport A were ",
          "strong": false
        },
        {
          "text": "exactly twice those at Airport C",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-009",
      "number": 9,
      "groupId": "task1-group-02",
      "groupNumber": 2,
      "moduleId": "module-1",
      "moduleName": "模块一：数字、单位与比较不出错（1–20）",
      "groupLabel": "表格：三座机场的年客流量",
      "module": "模块一：数字、单位与比较不出错（1–20）",
      "context": "A机场 120万人，B机场 80万人，C机场 60万人。单位为 passengers per year。",
      "note": "比较数字用 those at Airport C，避免重复 passenger numbers，也避免错误的 than Airport C。",
      "chinese": "三座机场的年客流量合计为260万人。",
      "answer": "The three airports handled a combined total of 2.6 million passengers each year.",
      "answerParts": [
        {
          "text": "The three airports handled ",
          "strong": false
        },
        {
          "text": "a combined total of 2.6 million passengers",
          "strong": true
        },
        {
          "text": " each year.",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-010",
      "number": 10,
      "groupId": "task1-group-02",
      "groupNumber": 2,
      "moduleId": "module-1",
      "moduleName": "模块一：数字、单位与比较不出错（1–20）",
      "groupLabel": "表格：三座机场的年客流量",
      "module": "模块一：数字、单位与比较不出错（1–20）",
      "context": "A机场 120万人，B机场 80万人，C机场 60万人。单位为 passengers per year。",
      "note": "比较数字用 those at Airport C，避免重复 passenger numbers，也避免错误的 than Airport C。",
      "chinese": "A机场占三座机场总客流量的近一半。",
      "answer": "Airport A accounted for just under half of the combined passenger total.",
      "answerParts": [
        {
          "text": "Airport A accounted for ",
          "strong": false
        },
        {
          "text": "just under half of the combined passenger total",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-011",
      "number": 11,
      "groupId": "task1-group-03",
      "groupNumber": 3,
      "moduleId": "module-1",
      "moduleName": "模块一：数字、单位与比较不出错（1–20）",
      "groupLabel": "近似数字：四种能源",
      "module": "模块一：数字、单位与比较不出错（1–20）",
      "context": "煤炭 51%，天然气 24%，核能 14%，可再生能源 11%。本组训练 just over、just under、roughly。",
      "note": "图中给精确数字时可以准确报告；只有在概括或数字本身近似时才使用 about、roughly、approximately。",
      "chinese": "煤炭提供了略高于一半的能源。",
      "answer": "Coal supplied just over half of the energy produced.",
      "answerParts": [
        {
          "text": "Coal supplied ",
          "strong": false
        },
        {
          "text": "just over half of the energy produced",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-012",
      "number": 12,
      "groupId": "task1-group-03",
      "groupNumber": 3,
      "moduleId": "module-1",
      "moduleName": "模块一：数字、单位与比较不出错（1–20）",
      "groupLabel": "近似数字：四种能源",
      "module": "模块一：数字、单位与比较不出错（1–20）",
      "context": "煤炭 51%，天然气 24%，核能 14%，可再生能源 11%。本组训练 just over、just under、roughly。",
      "note": "图中给精确数字时可以准确报告；只有在概括或数字本身近似时才使用 about、roughly、approximately。",
      "chinese": "天然气约占总量的四分之一。",
      "answer": "Natural gas accounted for approximately a quarter of the total.",
      "answerParts": [
        {
          "text": "Natural gas accounted for ",
          "strong": false
        },
        {
          "text": "approximately a quarter of the total",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-013",
      "number": 13,
      "groupId": "task1-group-03",
      "groupNumber": 3,
      "moduleId": "module-1",
      "moduleName": "模块一：数字、单位与比较不出错（1–20）",
      "groupLabel": "近似数字：四种能源",
      "module": "模块一：数字、单位与比较不出错（1–20）",
      "context": "煤炭 51%，天然气 24%，核能 14%，可再生能源 11%。本组训练 just over、just under、roughly。",
      "note": "图中给精确数字时可以准确报告；只有在概括或数字本身近似时才使用 about、roughly、approximately。",
      "chinese": "核能的占比略低于15%。",
      "answer": "The share of nuclear power was just under 15%.",
      "answerParts": [
        {
          "text": "The share of nuclear power was ",
          "strong": false
        },
        {
          "text": "just under 15%",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-014",
      "number": 14,
      "groupId": "task1-group-03",
      "groupNumber": 3,
      "moduleId": "module-1",
      "moduleName": "模块一：数字、单位与比较不出错（1–20）",
      "groupLabel": "近似数字：四种能源",
      "module": "模块一：数字、单位与比较不出错（1–20）",
      "context": "煤炭 51%，天然气 24%，核能 14%，可再生能源 11%。本组训练 just over、just under、roughly。",
      "note": "图中给精确数字时可以准确报告；只有在概括或数字本身近似时才使用 about、roughly、approximately。",
      "chinese": "可再生能源的贡献大约是煤炭的五分之一。",
      "answer": "The contribution of renewables was roughly one fifth of that of coal.",
      "answerParts": [
        {
          "text": "The contribution of renewables was ",
          "strong": false
        },
        {
          "text": "roughly one fifth of that of coal",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-015",
      "number": 15,
      "groupId": "task1-group-03",
      "groupNumber": 3,
      "moduleId": "module-1",
      "moduleName": "模块一：数字、单位与比较不出错（1–20）",
      "groupLabel": "近似数字：四种能源",
      "module": "模块一：数字、单位与比较不出错（1–20）",
      "context": "煤炭 51%，天然气 24%，核能 14%，可再生能源 11%。本组训练 just over、just under、roughly。",
      "note": "图中给精确数字时可以准确报告；只有在概括或数字本身近似时才使用 about、roughly、approximately。",
      "chinese": "核能和可再生能源合计占四分之一。",
      "answer": "Nuclear power and renewables collectively represented one quarter of energy production.",
      "answerParts": [
        {
          "text": "Nuclear power and renewables ",
          "strong": false
        },
        {
          "text": "collectively represented one quarter",
          "strong": true
        },
        {
          "text": " of energy production.",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-016",
      "number": 16,
      "groupId": "task1-group-04",
      "groupNumber": 4,
      "moduleId": "module-1",
      "moduleName": "模块一：数字、单位与比较不出错（1–20）",
      "groupLabel": "百分比与百分点",
      "module": "模块一：数字、单位与比较不出错（1–20）",
      "context": "使用自行车通勤的人群从20%升至30%；驾车者从50%降至40%；步行保持在10%。",
      "note": "rose to 30% 是“升至30%”；rose by 10 percentage points 是“上升10个百分点”。",
      "chinese": "骑自行车通勤的比例上升了10个百分点。",
      "answer": "The proportion of bicycle commuters rose by 10 percentage points.",
      "answerParts": [
        {
          "text": "The proportion of bicycle commuters ",
          "strong": false
        },
        {
          "text": "rose by 10 percentage points",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-017",
      "number": 17,
      "groupId": "task1-group-04",
      "groupNumber": 4,
      "moduleId": "module-1",
      "moduleName": "模块一：数字、单位与比较不出错（1–20）",
      "groupLabel": "百分比与百分点",
      "module": "模块一：数字、单位与比较不出错（1–20）",
      "context": "使用自行车通勤的人群从20%升至30%；驾车者从50%降至40%；步行保持在10%。",
      "note": "rose to 30% 是“升至30%”；rose by 10 percentage points 是“上升10个百分点”。",
      "chinese": "相对而言，骑车通勤人数的占比增加了50%。",
      "answer": "In relative terms, the share of bicycle commuters increased by 50%.",
      "answerParts": [
        {
          "text": "In relative terms, the share of bicycle commuters ",
          "strong": false
        },
        {
          "text": "increased by 50%",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-018",
      "number": 18,
      "groupId": "task1-group-04",
      "groupNumber": 4,
      "moduleId": "module-1",
      "moduleName": "模块一：数字、单位与比较不出错（1–20）",
      "groupLabel": "百分比与百分点",
      "module": "模块一：数字、单位与比较不出错（1–20）",
      "context": "使用自行车通勤的人群从20%升至30%；驾车者从50%降至40%；步行保持在10%。",
      "note": "rose to 30% 是“升至30%”；rose by 10 percentage points 是“上升10个百分点”。",
      "chinese": "驾车通勤的比例从50%下降到40%。",
      "answer": "The percentage commuting by car fell from 50% to 40%.",
      "answerParts": [
        {
          "text": "The percentage commuting by car ",
          "strong": false
        },
        {
          "text": "fell from 50% to 40%",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-019",
      "number": 19,
      "groupId": "task1-group-04",
      "groupNumber": 4,
      "moduleId": "module-1",
      "moduleName": "模块一：数字、单位与比较不出错（1–20）",
      "groupLabel": "百分比与百分点",
      "module": "模块一：数字、单位与比较不出错（1–20）",
      "context": "使用自行车通勤的人群从20%升至30%；驾车者从50%降至40%；步行保持在10%。",
      "note": "rose to 30% 是“升至30%”；rose by 10 percentage points 是“上升10个百分点”。",
      "chinese": "骑车与驾车两项变化的幅度相同，方向相反。",
      "answer": "Cycling and car use changed by the same number of percentage points, but in opposite directions.",
      "answerParts": [
        {
          "text": "Cycling and car use changed ",
          "strong": false
        },
        {
          "text": "by the same number of percentage points, but in opposite directions",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-020",
      "number": 20,
      "groupId": "task1-group-04",
      "groupNumber": 4,
      "moduleId": "module-1",
      "moduleName": "模块一：数字、单位与比较不出错（1–20）",
      "groupLabel": "百分比与百分点",
      "module": "模块一：数字、单位与比较不出错（1–20）",
      "context": "使用自行车通勤的人群从20%升至30%；驾车者从50%降至40%；步行保持在10%。",
      "note": "rose to 30% 是“升至30%”；rose by 10 percentage points 是“上升10个百分点”。",
      "chinese": "步行者的比例在整个时期保持不变，为10%。",
      "answer": "The proportion of people walking remained unchanged at 10% throughout the period.",
      "answerParts": [
        {
          "text": "The proportion of people walking ",
          "strong": false
        },
        {
          "text": "remained unchanged at 10% throughout the period",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-021",
      "number": 21,
      "groupId": "task1-group-05",
      "groupNumber": 5,
      "moduleId": "module-2",
      "moduleName": "模块二：动态图与时态控制（21–40）",
      "groupLabel": "2000–2020年三种交通方式",
      "module": "模块二：动态图与时态控制（21–40）",
      "context": "铁路从20升至55；公交从45缓慢降至35；航空从10快速升至50。单位为 million journeys。",
      "note": "有多个时间点且方向持续一致才用 rose steadily；只有两个端点时不要凭空判断中间“稳定增长”。",
      "chinese": "2000年至2020年间，铁路出行量从2000万稳步增至5500万。",
      "answer": "Between 2000 and 2020, rail travel rose steadily from 20 million to 55 million journeys.",
      "answerParts": [
        {
          "text": "Between 2000 and 2020, rail travel ",
          "strong": false
        },
        {
          "text": "rose steadily from 20 million to 55 million journeys",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-022",
      "number": 22,
      "groupId": "task1-group-05",
      "groupNumber": 5,
      "moduleId": "module-2",
      "moduleName": "模块二：动态图与时态控制（21–40）",
      "groupLabel": "2000–2020年三种交通方式",
      "module": "模块二：动态图与时态控制（21–40）",
      "context": "铁路从20升至55；公交从45缓慢降至35；航空从10快速升至50。单位为 million journeys。",
      "note": "有多个时间点且方向持续一致才用 rose steadily；只有两个端点时不要凭空判断中间“稳定增长”。",
      "chinese": "相比之下，公交出行量从4500万缓慢下降到3500万。",
      "answer": "By contrast, the number of bus journeys declined gradually from 45 million to 35 million.",
      "answerParts": [
        {
          "text": "By contrast, the number of bus journeys ",
          "strong": false
        },
        {
          "text": "declined gradually from 45 million to 35 million",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-023",
      "number": 23,
      "groupId": "task1-group-05",
      "groupNumber": 5,
      "moduleId": "module-2",
      "moduleName": "模块二：动态图与时态控制（21–40）",
      "groupLabel": "2000–2020年三种交通方式",
      "module": "模块二：动态图与时态控制（21–40）",
      "context": "铁路从20升至55；公交从45缓慢降至35；航空从10快速升至50。单位为 million journeys。",
      "note": "有多个时间点且方向持续一致才用 rose steadily；只有两个端点时不要凭空判断中间“稳定增长”。",
      "chinese": "航空出行的增长最为显著，最终达到5000万次。",
      "answer": "Air travel experienced the most substantial growth, eventually reaching 50 million journeys.",
      "answerParts": [
        {
          "text": "Air travel ",
          "strong": false
        },
        {
          "text": "experienced the most substantial growth",
          "strong": true
        },
        {
          "text": ", eventually reaching 50 million journeys.",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-024",
      "number": 24,
      "groupId": "task1-group-05",
      "groupNumber": 5,
      "moduleId": "module-2",
      "moduleName": "模块二：动态图与时态控制（21–40）",
      "groupLabel": "2000–2020年三种交通方式",
      "module": "模块二：动态图与时态控制（21–40）",
      "context": "铁路从20升至55；公交从45缓慢降至35；航空从10快速升至50。单位为 million journeys。",
      "note": "有多个时间点且方向持续一致才用 rose steadily；只有两个端点时不要凭空判断中间“稳定增长”。",
      "chinese": "铁路在2015年前后超过公交，成为使用最多的交通方式。",
      "answer": "Rail overtook buses around 2015 to become the most widely used mode of transport.",
      "answerParts": [
        {
          "text": "Rail ",
          "strong": false
        },
        {
          "text": "overtook buses around 2015",
          "strong": true
        },
        {
          "text": " to become the most widely used mode of transport.",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-025",
      "number": 25,
      "groupId": "task1-group-05",
      "groupNumber": 5,
      "moduleId": "module-2",
      "moduleName": "模块二：动态图与时态控制（21–40）",
      "groupLabel": "2000–2020年三种交通方式",
      "module": "模块二：动态图与时态控制（21–40）",
      "context": "铁路从20升至55；公交从45缓慢降至35；航空从10快速升至50。单位为 million journeys。",
      "note": "有多个时间点且方向持续一致才用 rose steadily；只有两个端点时不要凭空判断中间“稳定增长”。",
      "chinese": "到期末，铁路与航空的使用量相近，而公交落后于二者。",
      "answer": "By the end of the period, rail and air figures were similar, while bus travel lagged behind both.",
      "answerParts": [
        {
          "text": "By the end of the period, rail and air figures were similar, while bus travel ",
          "strong": false
        },
        {
          "text": "lagged behind both",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-026",
      "number": 26,
      "groupId": "task1-group-06",
      "groupNumber": 6,
      "moduleId": "module-2",
      "moduleName": "模块二：动态图与时态控制（21–40）",
      "groupLabel": "月度用电量波动",
      "module": "模块二：动态图与时态控制（21–40）",
      "context": "1月 320，4月 240，7月 410，10月 260，12月 350。单位为 kWh。",
      "note": "fluctuate 至少要有多次上下变化；单纯先升后降更适合 rose and then fell。",
      "chinese": "家庭用电量在一年中出现明显波动。",
      "answer": "Household electricity consumption fluctuated considerably over the year.",
      "answerParts": [
        {
          "text": "Household electricity consumption ",
          "strong": false
        },
        {
          "text": "fluctuated considerably over the year",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-027",
      "number": 27,
      "groupId": "task1-group-06",
      "groupNumber": 6,
      "moduleId": "module-2",
      "moduleName": "模块二：动态图与时态控制（21–40）",
      "groupLabel": "月度用电量波动",
      "module": "模块二：动态图与时态控制（21–40）",
      "context": "1月 320，4月 240，7月 410，10月 260，12月 350。单位为 kWh。",
      "note": "fluctuate 至少要有多次上下变化；单纯先升后降更适合 rose and then fell。",
      "chinese": "用电量从1月的320千瓦时降至4月的240千瓦时。",
      "answer": "Consumption fell from 320 kWh in January to 240 kWh in April.",
      "answerParts": [
        {
          "text": "Consumption ",
          "strong": false
        },
        {
          "text": "fell from 320 kWh in January to 240 kWh in April",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-028",
      "number": 28,
      "groupId": "task1-group-06",
      "groupNumber": 6,
      "moduleId": "module-2",
      "moduleName": "模块二：动态图与时态控制（21–40）",
      "groupLabel": "月度用电量波动",
      "module": "模块二：动态图与时态控制（21–40）",
      "context": "1月 320，4月 240，7月 410，10月 260，12月 350。单位为 kWh。",
      "note": "fluctuate 至少要有多次上下变化；单纯先升后降更适合 rose and then fell。",
      "chinese": "随后该数字急剧上升，在7月达到410千瓦时的峰值。",
      "answer": "The figure then climbed sharply, peaking at 410 kWh in July.",
      "answerParts": [
        {
          "text": "The figure then climbed sharply, ",
          "strong": false
        },
        {
          "text": "peaking at 410 kWh in July",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-029",
      "number": 29,
      "groupId": "task1-group-06",
      "groupNumber": 6,
      "moduleId": "module-2",
      "moduleName": "模块二：动态图与时态控制（21–40）",
      "groupLabel": "月度用电量波动",
      "module": "模块二：动态图与时态控制（21–40）",
      "context": "1月 320，4月 240，7月 410，10月 260，12月 350。单位为 kWh。",
      "note": "fluctuate 至少要有多次上下变化；单纯先升后降更适合 rose and then fell。",
      "chinese": "到10月，用电量再次下降到260千瓦时。",
      "answer": "By October, electricity use had dropped again to 260 kWh.",
      "answerParts": [
        {
          "text": "By October, electricity use ",
          "strong": false
        },
        {
          "text": "had dropped again to 260 kWh",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-030",
      "number": 30,
      "groupId": "task1-group-06",
      "groupNumber": 6,
      "moduleId": "module-2",
      "moduleName": "模块二：动态图与时态控制（21–40）",
      "groupLabel": "月度用电量波动",
      "module": "模块二：动态图与时态控制（21–40）",
      "context": "1月 320，4月 240，7月 410，10月 260，12月 350。单位为 kWh。",
      "note": "fluctuate 至少要有多次上下变化；单纯先升后降更适合 rose and then fell。",
      "chinese": "最后两个月出现回升，12月的用电量为350千瓦时。",
      "answer": "Consumption recovered during the final two months, ending the year at 350 kWh.",
      "answerParts": [
        {
          "text": "Consumption ",
          "strong": false
        },
        {
          "text": "recovered during the final two months",
          "strong": true
        },
        {
          "text": ", ending the year at 350 kWh.",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-031",
      "number": 31,
      "groupId": "task1-group-07",
      "groupNumber": 7,
      "moduleId": "module-2",
      "moduleName": "模块二：动态图与时态控制（21–40）",
      "groupLabel": "两国互联网使用率交叉",
      "module": "模块二：动态图与时态控制（21–40）",
      "context": "2005年甲国 60%、乙国 25%；2015年两国均为70%；2025年甲国 82%、乙国 90%。",
      "note": "两条线相交可写 the figures were equal 或 B overtook A；不要把“交叉”直译成 crossed each other 而不说明结果。",
      "chinese": "2005年，甲国的互联网使用率远高于乙国。",
      "answer": "In 2005, internet use in Country A was far higher than that in Country B.",
      "answerParts": [
        {
          "text": "In 2005, internet use in Country A was ",
          "strong": false
        },
        {
          "text": "far higher than that in Country B",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-032",
      "number": 32,
      "groupId": "task1-group-07",
      "groupNumber": 7,
      "moduleId": "module-2",
      "moduleName": "模块二：动态图与时态控制（21–40）",
      "groupLabel": "两国互联网使用率交叉",
      "module": "模块二：动态图与时态控制（21–40）",
      "context": "2005年甲国 60%、乙国 25%；2015年两国均为70%；2025年甲国 82%、乙国 90%。",
      "note": "两条线相交可写 the figures were equal 或 B overtook A；不要把“交叉”直译成 crossed each other 而不说明结果。",
      "chinese": "随后两国之间的差距逐渐缩小。",
      "answer": "The gap between the two countries narrowed gradually thereafter.",
      "answerParts": [
        {
          "text": "The gap between the two countries ",
          "strong": false
        },
        {
          "text": "narrowed gradually thereafter",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-033",
      "number": 33,
      "groupId": "task1-group-07",
      "groupNumber": 7,
      "moduleId": "module-2",
      "moduleName": "模块二：动态图与时态控制（21–40）",
      "groupLabel": "两国互联网使用率交叉",
      "module": "模块二：动态图与时态控制（21–40）",
      "context": "2005年甲国 60%、乙国 25%；2015年两国均为70%；2025年甲国 82%、乙国 90%。",
      "note": "两条线相交可写 the figures were equal 或 B overtook A；不要把“交叉”直译成 crossed each other 而不说明结果。",
      "chinese": "两国的使用率在2015年持平，均为70%。",
      "answer": "The two rates were equal at 70% in 2015.",
      "answerParts": [
        {
          "text": "The two rates ",
          "strong": false
        },
        {
          "text": "were equal at 70% in 2015",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-034",
      "number": 34,
      "groupId": "task1-group-07",
      "groupNumber": 7,
      "moduleId": "module-2",
      "moduleName": "模块二：动态图与时态控制（21–40）",
      "groupLabel": "两国互联网使用率交叉",
      "module": "模块二：动态图与时态控制（21–40）",
      "context": "2005年甲国 60%、乙国 25%；2015年两国均为70%；2025年甲国 82%、乙国 90%。",
      "note": "两条线相交可写 the figures were equal 或 B overtook A；不要把“交叉”直译成 crossed each other 而不说明结果。",
      "chinese": "2015年之后，乙国超过甲国，并在2025年达到90%。",
      "answer": "After 2015, Country B surpassed Country A, reaching 90% in 2025.",
      "answerParts": [
        {
          "text": "After 2015, Country B ",
          "strong": false
        },
        {
          "text": "surpassed Country A",
          "strong": true
        },
        {
          "text": ", reaching 90% in 2025.",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-035",
      "number": 35,
      "groupId": "task1-group-07",
      "groupNumber": 7,
      "moduleId": "module-2",
      "moduleName": "模块二：动态图与时态控制（21–40）",
      "groupLabel": "两国互联网使用率交叉",
      "module": "模块二：动态图与时态控制（21–40）",
      "context": "2005年甲国 60%、乙国 25%；2015年两国均为70%；2025年甲国 82%、乙国 90%。",
      "note": "两条线相交可写 the figures were equal 或 B overtook A；不要把“交叉”直译成 crossed each other 而不说明结果。",
      "chinese": "总体来看，乙国的增长速度更快，并由落后转为领先。",
      "answer": "Overall, Country B grew more rapidly and moved from a substantial deficit to a clear lead.",
      "answerParts": [
        {
          "text": "Overall, Country B grew more rapidly and ",
          "strong": false
        },
        {
          "text": "moved from a substantial deficit to a clear lead",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-036",
      "number": 36,
      "groupId": "task1-group-08",
      "groupNumber": 8,
      "moduleId": "module-2",
      "moduleName": "模块二：动态图与时态控制（21–40）",
      "groupLabel": "峰值、低点与恢复",
      "module": "模块二：动态图与时态控制（21–40）",
      "context": "某产品销量2010年 70，2012年 95，2015年 40，2018年 65，2020年 90。单位为 thousand units。",
      "note": "peak 可作动词 peak at 95,000，也可作名词 reach a peak of 95,000；不要写 peak to。",
      "chinese": "销量在2012年达到9.5万件的早期高点。",
      "answer": "Sales reached an initial high of 95,000 units in 2012.",
      "answerParts": [
        {
          "text": "Sales ",
          "strong": false
        },
        {
          "text": "reached an initial high of 95,000 units in 2012",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-037",
      "number": 37,
      "groupId": "task1-group-08",
      "groupNumber": 8,
      "moduleId": "module-2",
      "moduleName": "模块二：动态图与时态控制（21–40）",
      "groupLabel": "峰值、低点与恢复",
      "module": "模块二：动态图与时态控制（21–40）",
      "context": "某产品销量2010年 70，2012年 95，2015年 40，2018年 65，2020年 90。单位为 thousand units。",
      "note": "peak 可作动词 peak at 95,000，也可作名词 reach a peak of 95,000；不要写 peak to。",
      "chinese": "此后销量大幅下降，并在2015年触底至4万件。",
      "answer": "They then fell markedly, bottoming out at 40,000 in 2015.",
      "answerParts": [
        {
          "text": "They then fell markedly, ",
          "strong": false
        },
        {
          "text": "bottoming out at 40,000 in 2015",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-038",
      "number": 38,
      "groupId": "task1-group-08",
      "groupNumber": 8,
      "moduleId": "module-2",
      "moduleName": "模块二：动态图与时态控制（21–40）",
      "groupLabel": "峰值、低点与恢复",
      "module": "模块二：动态图与时态控制（21–40）",
      "context": "某产品销量2010年 70，2012年 95，2015年 40，2018年 65，2020年 90。单位为 thousand units。",
      "note": "peak 可作动词 peak at 95,000，也可作名词 reach a peak of 95,000；不要写 peak to。",
      "chinese": "2015年以后，销量逐步恢复。",
      "answer": "Sales recovered progressively after 2015.",
      "answerParts": [
        {
          "text": "Sales ",
          "strong": false
        },
        {
          "text": "recovered progressively after 2015",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-039",
      "number": 39,
      "groupId": "task1-group-08",
      "groupNumber": 8,
      "moduleId": "module-2",
      "moduleName": "模块二：动态图与时态控制（21–40）",
      "groupLabel": "峰值、低点与恢复",
      "module": "模块二：动态图与时态控制（21–40）",
      "context": "某产品销量2010年 70，2012年 95，2015年 40，2018年 65，2020年 90。单位为 thousand units。",
      "note": "peak 可作动词 peak at 95,000，也可作名词 reach a peak of 95,000；不要写 peak to。",
      "chinese": "到2020年，该数字回升至9万件，但仍略低于2012年的峰值。",
      "answer": "By 2020, the figure had returned to 90,000, slightly below the 2012 peak.",
      "answerParts": [
        {
          "text": "By 2020, the figure had returned to 90,000, ",
          "strong": false
        },
        {
          "text": "slightly below the 2012 peak",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-040",
      "number": 40,
      "groupId": "task1-group-08",
      "groupNumber": 8,
      "moduleId": "module-2",
      "moduleName": "模块二：动态图与时态控制（21–40）",
      "groupLabel": "峰值、低点与恢复",
      "module": "模块二：动态图与时态控制（21–40）",
      "context": "某产品销量2010年 70，2012年 95，2015年 40，2018年 65，2020年 90。单位为 thousand units。",
      "note": "peak 可作动词 peak at 95,000，也可作名词 reach a peak of 95,000；不要写 peak to。",
      "chinese": "整个时期的特点是先急剧下降，随后几乎完全恢复。",
      "answer": "The period was characterised by a sharp decline followed by an almost complete recovery.",
      "answerParts": [
        {
          "text": "The period was characterised by ",
          "strong": false
        },
        {
          "text": "a sharp decline followed by an almost complete recovery",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-041",
      "number": 41,
      "groupId": "task1-group-09",
      "groupNumber": 9,
      "moduleId": "module-3",
      "moduleName": "模块三：静态图的分组与比较（41–60）",
      "groupLabel": "四国通勤方式",
      "module": "模块三：静态图的分组与比较（41–60）",
      "context": "驾车比例——甲70%、乙65%、丙30%、丁25%；公共交通——甲20%、乙25%、丙55%、丁60%。其余为步行或骑车。",
      "note": "静态图没有时间变化，不要写 increase、decrease；用 was higher、accounted for、recorded 等比较状态。",
      "chinese": "甲国和乙国的大多数通勤者选择驾车。",
      "answer": "In Countries A and B, the majority of commuters travelled by car.",
      "answerParts": [
        {
          "text": "In Countries A and B, ",
          "strong": false
        },
        {
          "text": "the majority of commuters travelled by car",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-042",
      "number": 42,
      "groupId": "task1-group-09",
      "groupNumber": 9,
      "moduleId": "module-3",
      "moduleName": "模块三：静态图的分组与比较（41–60）",
      "groupLabel": "四国通勤方式",
      "module": "模块三：静态图的分组与比较（41–60）",
      "context": "驾车比例——甲70%、乙65%、丙30%、丁25%；公共交通——甲20%、乙25%、丙55%、丁60%。其余为步行或骑车。",
      "note": "静态图没有时间变化，不要写 increase、decrease；用 was higher、accounted for、recorded 等比较状态。",
      "chinese": "相反，公共交通在丙国和丁国占主导地位。",
      "answer": "Public transport, by contrast, was the dominant mode in Countries C and D.",
      "answerParts": [
        {
          "text": "Public transport, by contrast, ",
          "strong": false
        },
        {
          "text": "was the dominant mode in Countries C and D",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-043",
      "number": 43,
      "groupId": "task1-group-09",
      "groupNumber": 9,
      "moduleId": "module-3",
      "moduleName": "模块三：静态图的分组与比较（41–60）",
      "groupLabel": "四国通勤方式",
      "module": "模块三：静态图的分组与比较（41–60）",
      "context": "驾车比例——甲70%、乙65%、丙30%、丁25%；公共交通——甲20%、乙25%、丙55%、丁60%。其余为步行或骑车。",
      "note": "静态图没有时间变化，不要写 increase、decrease；用 was higher、accounted for、recorded 等比较状态。",
      "chinese": "甲国的驾车比例最高，为70%。",
      "answer": "Country A recorded the highest proportion of car commuters, at 70%.",
      "answerParts": [
        {
          "text": "Country A ",
          "strong": false
        },
        {
          "text": "recorded the highest proportion of car commuters",
          "strong": true
        },
        {
          "text": ", at 70%.",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-044",
      "number": 44,
      "groupId": "task1-group-09",
      "groupNumber": 9,
      "moduleId": "module-3",
      "moduleName": "模块三：静态图的分组与比较（41–60）",
      "groupLabel": "四国通勤方式",
      "module": "模块三：静态图的分组与比较（41–60）",
      "context": "驾车比例——甲70%、乙65%、丙30%、丁25%；公共交通——甲20%、乙25%、丙55%、丁60%。其余为步行或骑车。",
      "note": "静态图没有时间变化，不要写 increase、decrease；用 was higher、accounted for、recorded 等比较状态。",
      "chinese": "丁国使用公共交通的比例是甲国的三倍。",
      "answer": "The share using public transport in Country D was three times that in Country A.",
      "answerParts": [
        {
          "text": "The share using public transport in Country D was ",
          "strong": false
        },
        {
          "text": "three times that in Country A",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-045",
      "number": 45,
      "groupId": "task1-group-09",
      "groupNumber": 9,
      "moduleId": "module-3",
      "moduleName": "模块三：静态图的分组与比较（41–60）",
      "groupLabel": "四国通勤方式",
      "module": "模块三：静态图的分组与比较（41–60）",
      "context": "驾车比例——甲70%、乙65%、丙30%、丁25%；公共交通——甲20%、乙25%、丙55%、丁60%。其余为步行或骑车。",
      "note": "静态图没有时间变化，不要写 increase、decrease；用 was higher、accounted for、recorded 等比较状态。",
      "chinese": "总体而言，四国可以清楚地分为两个以汽车为主和两个以公共交通为主的国家。",
      "answer": "Overall, the countries fell into two clear groups: two dominated by cars and two by public transport.",
      "answerParts": [
        {
          "text": "Overall, the countries ",
          "strong": false
        },
        {
          "text": "fell into two clear groups",
          "strong": true
        },
        {
          "text": ": two dominated by cars and two by public transport.",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-046",
      "number": 46,
      "groupId": "task1-group-10",
      "groupNumber": 10,
      "moduleId": "module-3",
      "moduleName": "模块三：静态图的分组与比较（41–60）",
      "groupLabel": "不同年龄组的网络购物率",
      "module": "模块三：静态图的分组与比较（41–60）",
      "context": "16–24岁 78%，25–44岁 85%，45–64岁 56%，65岁以上 22%。",
      "note": "the 25–44 age group 作单数；people aged 25–44 作复数，谓语必须对应。",
      "chinese": "25至44岁人群的网络购物率最高，为85%。",
      "answer": "People aged 25–44 had the highest rate of online shopping, at 85%.",
      "answerParts": [
        {
          "text": "People aged 25–44 ",
          "strong": false
        },
        {
          "text": "had the highest rate of online shopping",
          "strong": true
        },
        {
          "text": ", at 85%.",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-047",
      "number": 47,
      "groupId": "task1-group-10",
      "groupNumber": 10,
      "moduleId": "module-3",
      "moduleName": "模块三：静态图的分组与比较（41–60）",
      "groupLabel": "不同年龄组的网络购物率",
      "module": "模块三：静态图的分组与比较（41–60）",
      "context": "16–24岁 78%，25–44岁 85%，45–64岁 56%，65岁以上 22%。",
      "note": "the 25–44 age group 作单数；people aged 25–44 作复数，谓语必须对应。",
      "chinese": "16至24岁组紧随其后，比例为78%。",
      "answer": "The 16–24 group followed closely behind, at 78%.",
      "answerParts": [
        {
          "text": "The 16–24 group ",
          "strong": false
        },
        {
          "text": "followed closely behind",
          "strong": true
        },
        {
          "text": ", at 78%.",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-048",
      "number": 48,
      "groupId": "task1-group-10",
      "groupNumber": 10,
      "moduleId": "module-3",
      "moduleName": "模块三：静态图的分组与比较（41–60）",
      "groupLabel": "不同年龄组的网络购物率",
      "module": "模块三：静态图的分组与比较（41–60）",
      "context": "16–24岁 78%，25–44岁 85%，45–64岁 56%，65岁以上 22%。",
      "note": "the 25–44 age group 作单数；people aged 25–44 作复数，谓语必须对应。",
      "chinese": "45至64岁人群的比例明显较低，只有56%。",
      "answer": "The figure for 45–64-year-olds was considerably lower, at just 56%.",
      "answerParts": [
        {
          "text": "The figure for 45–64-year-olds was ",
          "strong": false
        },
        {
          "text": "considerably lower, at just 56%",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-049",
      "number": 49,
      "groupId": "task1-group-10",
      "groupNumber": 10,
      "moduleId": "module-3",
      "moduleName": "模块三：静态图的分组与比较（41–60）",
      "groupLabel": "不同年龄组的网络购物率",
      "module": "模块三：静态图的分组与比较（41–60）",
      "context": "16–24岁 78%，25–44岁 85%，45–64岁 56%，65岁以上 22%。",
      "note": "the 25–44 age group 作单数；people aged 25–44 作复数，谓语必须对应。",
      "chinese": "65岁以上人群最少使用网络购物，其比例不到25至44岁组的三分之一。",
      "answer": "Online shopping was least common among those aged 65 and over, whose rate was less than one third of that for 25–44-year-olds.",
      "answerParts": [
        {
          "text": "Online shopping was least common among those aged 65 and over, whose rate was ",
          "strong": false
        },
        {
          "text": "less than one third of that for 25–44-year-olds",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-050",
      "number": 50,
      "groupId": "task1-group-10",
      "groupNumber": 10,
      "moduleId": "module-3",
      "moduleName": "模块三：静态图的分组与比较（41–60）",
      "groupLabel": "不同年龄组的网络购物率",
      "module": "模块三：静态图的分组与比较（41–60）",
      "context": "16–24岁 78%，25–44岁 85%，45–64岁 56%，65岁以上 22%。",
      "note": "the 25–44 age group 作单数；people aged 25–44 作复数，谓语必须对应。",
      "chinese": "总体上，网络购物在较年轻的三个年龄组中更普遍。",
      "answer": "Overall, online shopping was substantially more prevalent among the three younger age groups.",
      "answerParts": [
        {
          "text": "Overall, online shopping was ",
          "strong": false
        },
        {
          "text": "substantially more prevalent among the three younger age groups",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-051",
      "number": 51,
      "groupId": "task1-group-11",
      "groupNumber": 11,
      "moduleId": "module-3",
      "moduleName": "模块三：静态图的分组与比较（41–60）",
      "groupLabel": "两个城市的预算分配",
      "module": "模块三：静态图的分组与比较（41–60）",
      "context": "城市X教育40%、医疗25%、交通20%、其他15%；城市Y教育25%、医疗35%、交通30%、其他10%。",
      "note": "图表只显示资金比例，prioritised 可由最大份额支持；不要进一步猜测“因为当地学校更差”。",
      "chinese": "教育是城市X最大的预算项目，却只占城市Y预算的四分之一。",
      "answer": "Education was the largest budget item in City X, but accounted for only a quarter of spending in City Y.",
      "answerParts": [
        {
          "text": "Education was the largest budget item in City X, but ",
          "strong": false
        },
        {
          "text": "accounted for only a quarter of spending in City Y",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-052",
      "number": 52,
      "groupId": "task1-group-11",
      "groupNumber": 11,
      "moduleId": "module-3",
      "moduleName": "模块三：静态图的分组与比较（41–60）",
      "groupLabel": "两个城市的预算分配",
      "module": "模块三：静态图的分组与比较（41–60）",
      "context": "城市X教育40%、医疗25%、交通20%、其他15%；城市Y教育25%、医疗35%、交通30%、其他10%。",
      "note": "图表只显示资金比例，prioritised 可由最大份额支持；不要进一步猜测“因为当地学校更差”。",
      "chinese": "城市Y在医疗上的支出比例比城市X高10个百分点。",
      "answer": "City Y allocated 10 percentage points more of its budget to healthcare than City X did.",
      "answerParts": [
        {
          "text": "City Y allocated ",
          "strong": false
        },
        {
          "text": "10 percentage points more of its budget to healthcare",
          "strong": true
        },
        {
          "text": " than City X did.",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-053",
      "number": 53,
      "groupId": "task1-group-11",
      "groupNumber": 11,
      "moduleId": "module-3",
      "moduleName": "模块三：静态图的分组与比较（41–60）",
      "groupLabel": "两个城市的预算分配",
      "module": "模块三：静态图的分组与比较（41–60）",
      "context": "城市X教育40%、医疗25%、交通20%、其他15%；城市Y教育25%、医疗35%、交通30%、其他10%。",
      "note": "图表只显示资金比例，prioritised 可由最大份额支持；不要进一步猜测“因为当地学校更差”。",
      "chinese": "两个城市用于交通的比例分别为20%和30%。",
      "answer": "The respective proportions spent on transport in the two cities were 20% and 30%.",
      "answerParts": [
        {
          "text": "The respective proportions spent on transport in the two cities ",
          "strong": false
        },
        {
          "text": "were 20% and 30%",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-054",
      "number": 54,
      "groupId": "task1-group-11",
      "groupNumber": 11,
      "moduleId": "module-3",
      "moduleName": "模块三：静态图的分组与比较（41–60）",
      "groupLabel": "两个城市的预算分配",
      "module": "模块三：静态图的分组与比较（41–60）",
      "context": "城市X教育40%、医疗25%、交通20%、其他15%；城市Y教育25%、医疗35%、交通30%、其他10%。",
      "note": "图表只显示资金比例，prioritised 可由最大份额支持；不要进一步猜测“因为当地学校更差”。",
      "chinese": "“其他”支出在两个城市中都是最小的类别。",
      "answer": "Other expenditure was the smallest category in both cities.",
      "answerParts": [
        {
          "text": "Other expenditure ",
          "strong": false
        },
        {
          "text": "was the smallest category in both cities",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-055",
      "number": 55,
      "groupId": "task1-group-11",
      "groupNumber": 11,
      "moduleId": "module-3",
      "moduleName": "模块三：静态图的分组与比较（41–60）",
      "groupLabel": "两个城市的预算分配",
      "module": "模块三：静态图的分组与比较（41–60）",
      "context": "城市X教育40%、医疗25%、交通20%、其他15%；城市Y教育25%、医疗35%、交通30%、其他10%。",
      "note": "图表只显示资金比例，prioritised 可由最大份额支持；不要进一步猜测“因为当地学校更差”。",
      "chinese": "总体而言，城市X更重视教育，而城市Y把更大比例的资金用于医疗和交通。",
      "answer": "Overall, City X prioritised education, whereas City Y devoted larger shares to healthcare and transport.",
      "answerParts": [
        {
          "text": "Overall, City X prioritised education, whereas City Y ",
          "strong": false
        },
        {
          "text": "devoted larger shares to healthcare and transport",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-056",
      "number": 56,
      "groupId": "task1-group-12",
      "groupNumber": 12,
      "moduleId": "module-3",
      "moduleName": "模块三：静态图的分组与比较（41–60）",
      "groupLabel": "五门课程的男女选课人数",
      "module": "模块三：静态图的分组与比较（41–60）",
      "context": "工程男80女20；护理男15女85；商业男55女50；艺术男35女60；科学男60女45。",
      "note": "outnumber 是及物动词，写 men outnumbered women；不能写 the number of men outnumbered women。",
      "chinese": "工程专业的男性人数是女性的四倍。",
      "answer": "The number of men studying engineering was four times the number of women.",
      "answerParts": [
        {
          "text": "The number of men studying engineering was ",
          "strong": false
        },
        {
          "text": "four times the number of women",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-057",
      "number": 57,
      "groupId": "task1-group-12",
      "groupNumber": 12,
      "moduleId": "module-3",
      "moduleName": "模块三：静态图的分组与比较（41–60）",
      "groupLabel": "五门课程的男女选课人数",
      "module": "模块三：静态图的分组与比较（41–60）",
      "context": "工程男80女20；护理男15女85；商业男55女50；艺术男35女60；科学男60女45。",
      "note": "outnumber 是及物动词，写 men outnumbered women；不能写 the number of men outnumbered women。",
      "chinese": "护理专业呈现相反格局，女性占绝大多数。",
      "answer": "Nursing displayed the opposite pattern, with women forming an overwhelming majority.",
      "answerParts": [
        {
          "text": "Nursing displayed the opposite pattern, with women ",
          "strong": false
        },
        {
          "text": "forming an overwhelming majority",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-058",
      "number": 58,
      "groupId": "task1-group-12",
      "groupNumber": 12,
      "moduleId": "module-3",
      "moduleName": "模块三：静态图的分组与比较（41–60）",
      "groupLabel": "五门课程的男女选课人数",
      "module": "模块三：静态图的分组与比较（41–60）",
      "context": "工程男80女20；护理男15女85；商业男55女50；艺术男35女60；科学男60女45。",
      "note": "outnumber 是及物动词，写 men outnumbered women；不能写 the number of men outnumbered women。",
      "chinese": "商业课程的男女选课人数最为接近。",
      "answer": "Business showed the smallest gender difference in enrolment.",
      "answerParts": [
        {
          "text": "Business ",
          "strong": false
        },
        {
          "text": "showed the smallest gender difference",
          "strong": true
        },
        {
          "text": " in enrolment.",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-059",
      "number": 59,
      "groupId": "task1-group-12",
      "groupNumber": 12,
      "moduleId": "module-3",
      "moduleName": "模块三：静态图的分组与比较（41–60）",
      "groupLabel": "五门课程的男女选课人数",
      "module": "模块三：静态图的分组与比较（41–60）",
      "context": "工程男80女20；护理男15女85；商业男55女50；艺术男35女60；科学男60女45。",
      "note": "outnumber 是及物动词，写 men outnumbered women；不能写 the number of men outnumbered women。",
      "chinese": "男性在工程和科学方面人数更多，而女性在护理和艺术方面占优势。",
      "answer": "Men outnumbered women in engineering and science, while women predominated in nursing and art.",
      "answerParts": [
        {
          "text": "Men outnumbered women in engineering and science, while women ",
          "strong": false
        },
        {
          "text": "predominated in nursing and art",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-060",
      "number": 60,
      "groupId": "task1-group-12",
      "groupNumber": 12,
      "moduleId": "module-3",
      "moduleName": "模块三：静态图的分组与比较（41–60）",
      "groupLabel": "五门课程的男女选课人数",
      "module": "模块三：静态图的分组与比较（41–60）",
      "context": "工程男80女20；护理男15女85；商业男55女50；艺术男35女60；科学男60女45。",
      "note": "outnumber 是及物动词，写 men outnumbered women；不能写 the number of men outnumbered women。",
      "chinese": "总体来看，学科选择存在明显的性别差异，但商业课程是一个例外。",
      "answer": "Overall, subject choice varied markedly by gender, with business as the main exception.",
      "answerParts": [
        {
          "text": "Overall, subject choice varied markedly by gender, ",
          "strong": false
        },
        {
          "text": "with business as the main exception",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-061",
      "number": 61,
      "groupId": "task1-group-13",
      "groupNumber": 13,
      "moduleId": "module-4",
      "moduleName": "模块四：Overview 选择主要特征（61–80）",
      "groupLabel": "动态图 Overview",
      "module": "模块四：Overview 选择主要特征（61–80）",
      "context": "A持续上升；B持续下降；C先升后降；期末A最高、B最低。本组只练 Overview，不写具体数字。",
      "note": "这 5 句是不同可用表达，不应全部塞进同一篇 Overview；考试时选择最能概括全图的 1–2 句。",
      "chinese": "总体来看，A呈持续上升趋势，而B在整个时期不断下降。",
      "answer": "Overall, A followed a sustained upward trend, whereas B declined throughout the period.",
      "answerParts": [
        {
          "text": "Overall, A ",
          "strong": false
        },
        {
          "text": "followed a sustained upward trend",
          "strong": true
        },
        {
          "text": ", whereas B declined throughout the period.",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-062",
      "number": 62,
      "groupId": "task1-group-13",
      "groupNumber": 13,
      "moduleId": "module-4",
      "moduleName": "模块四：Overview 选择主要特征（61–80）",
      "groupLabel": "动态图 Overview",
      "module": "模块四：Overview 选择主要特征（61–80）",
      "context": "A持续上升；B持续下降；C先升后降；期末A最高、B最低。本组只练 Overview，不写具体数字。",
      "note": "这 5 句是不同可用表达，不应全部塞进同一篇 Overview；考试时选择最能概括全图的 1–2 句。",
      "chinese": "C最初增长，但在后半段失去了全部增幅。",
      "answer": "C rose initially but lost all of its gains during the second half of the period.",
      "answerParts": [
        {
          "text": "C rose initially but ",
          "strong": false
        },
        {
          "text": "lost all of its gains during the second half of the period",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-063",
      "number": 63,
      "groupId": "task1-group-13",
      "groupNumber": 13,
      "moduleId": "module-4",
      "moduleName": "模块四：Overview 选择主要特征（61–80）",
      "groupLabel": "动态图 Overview",
      "module": "模块四：Overview 选择主要特征（61–80）",
      "context": "A持续上升；B持续下降；C先升后降；期末A最高、B最低。本组只练 Overview，不写具体数字。",
      "note": "这 5 句是不同可用表达，不应全部塞进同一篇 Overview；考试时选择最能概括全图的 1–2 句。",
      "chinese": "A由最小类别变成最大类别。",
      "answer": "A moved from being the smallest category to the largest.",
      "answerParts": [
        {
          "text": "A ",
          "strong": false
        },
        {
          "text": "moved from being the smallest category to the largest",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-064",
      "number": 64,
      "groupId": "task1-group-13",
      "groupNumber": 13,
      "moduleId": "module-4",
      "moduleName": "模块四：Overview 选择主要特征（61–80）",
      "groupLabel": "动态图 Overview",
      "module": "模块四：Overview 选择主要特征（61–80）",
      "context": "A持续上升；B持续下降；C先升后降；期末A最高、B最低。本组只练 Overview，不写具体数字。",
      "note": "这 5 句是不同可用表达，不应全部塞进同一篇 Overview；考试时选择最能概括全图的 1–2 句。",
      "chinese": "相比之下，B从首位降至末位。",
      "answer": "By contrast, B fell from first place to last.",
      "answerParts": [
        {
          "text": "By contrast, B ",
          "strong": false
        },
        {
          "text": "fell from first place to last",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-065",
      "number": 65,
      "groupId": "task1-group-13",
      "groupNumber": 13,
      "moduleId": "module-4",
      "moduleName": "模块四：Overview 选择主要特征（61–80）",
      "groupLabel": "动态图 Overview",
      "module": "模块四：Overview 选择主要特征（61–80）",
      "context": "A持续上升；B持续下降；C先升后降；期末A最高、B最低。本组只练 Overview，不写具体数字。",
      "note": "这 5 句是不同可用表达，不应全部塞进同一篇 Overview；考试时选择最能概括全图的 1–2 句。",
      "chinese": "最显著的总体特征是A与B的排名完全逆转。",
      "answer": "The most striking overall feature is the complete reversal in the rankings of A and B.",
      "answerParts": [
        {
          "text": "The most striking overall feature is ",
          "strong": false
        },
        {
          "text": "the complete reversal in the rankings of A and B",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-066",
      "number": 66,
      "groupId": "task1-group-14",
      "groupNumber": 14,
      "moduleId": "module-4",
      "moduleName": "模块四：Overview 选择主要特征（61–80）",
      "groupLabel": "静态图 Overview",
      "module": "模块四：Overview 选择主要特征（61–80）",
      "context": "六类产品在四国的销量；电子产品整体最高，书籍整体最低；甲乙结构相似，丙丁结构相似。",
      "note": "Overview 不等于把每类数据重新念一遍；要提炼最高、最低、共同模式和显著例外。",
      "chinese": "总体而言，电子产品在四个国家中都是最畅销的类别。",
      "answer": "Overall, electronics were the best-selling category in all four countries.",
      "answerParts": [
        {
          "text": "Overall, electronics ",
          "strong": false
        },
        {
          "text": "were the best-selling category in all four countries",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-067",
      "number": 67,
      "groupId": "task1-group-14",
      "groupNumber": 14,
      "moduleId": "module-4",
      "moduleName": "模块四：Overview 选择主要特征（61–80）",
      "groupLabel": "静态图 Overview",
      "module": "模块四：Overview 选择主要特征（61–80）",
      "context": "六类产品在四国的销量；电子产品整体最高，书籍整体最低；甲乙结构相似，丙丁结构相似。",
      "note": "Overview 不等于把每类数据重新念一遍；要提炼最高、最低、共同模式和显著例外。",
      "chinese": "书籍的销量普遍最低。",
      "answer": "Books consistently recorded the lowest sales figures.",
      "answerParts": [
        {
          "text": "Books ",
          "strong": false
        },
        {
          "text": "consistently recorded the lowest sales figures",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-068",
      "number": 68,
      "groupId": "task1-group-14",
      "groupNumber": 14,
      "moduleId": "module-4",
      "moduleName": "模块四：Overview 选择主要特征（61–80）",
      "groupLabel": "静态图 Overview",
      "module": "模块四：Overview 选择主要特征（61–80）",
      "context": "六类产品在四国的销量；电子产品整体最高，书籍整体最低；甲乙结构相似，丙丁结构相似。",
      "note": "Overview 不等于把每类数据重新念一遍；要提炼最高、最低、共同模式和显著例外。",
      "chinese": "甲国和乙国的消费结构大体相似。",
      "answer": "Countries A and B displayed broadly similar purchasing patterns.",
      "answerParts": [
        {
          "text": "Countries A and B ",
          "strong": false
        },
        {
          "text": "displayed broadly similar purchasing patterns",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-069",
      "number": 69,
      "groupId": "task1-group-14",
      "groupNumber": 14,
      "moduleId": "module-4",
      "moduleName": "模块四：Overview 选择主要特征（61–80）",
      "groupLabel": "静态图 Overview",
      "module": "模块四：Overview 选择主要特征（61–80）",
      "context": "六类产品在四国的销量；电子产品整体最高，书籍整体最低；甲乙结构相似，丙丁结构相似。",
      "note": "Overview 不等于把每类数据重新念一遍；要提炼最高、最低、共同模式和显著例外。",
      "chinese": "丙国和丁国形成了另一个较为接近的组别。",
      "answer": "Countries C and D formed a second, relatively similar group.",
      "answerParts": [
        {
          "text": "Countries C and D ",
          "strong": false
        },
        {
          "text": "formed a second, relatively similar group",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-070",
      "number": 70,
      "groupId": "task1-group-14",
      "groupNumber": 14,
      "moduleId": "module-4",
      "moduleName": "模块四：Overview 选择主要特征（61–80）",
      "groupLabel": "静态图 Overview",
      "module": "模块四：Overview 选择主要特征（61–80）",
      "context": "六类产品在四国的销量；电子产品整体最高，书籍整体最低；甲乙结构相似，丙丁结构相似。",
      "note": "Overview 不等于把每类数据重新念一遍；要提炼最高、最低、共同模式和显著例外。",
      "chinese": "最明显的特征是产品类别造成的差异大于国家之间的差异。",
      "answer": "The clearest feature is that variation by product category was greater than variation between countries.",
      "answerParts": [
        {
          "text": "The clearest feature is that variation by product category was ",
          "strong": false
        },
        {
          "text": "greater than variation between countries",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-071",
      "number": 71,
      "groupId": "task1-group-15",
      "groupNumber": 15,
      "moduleId": "module-4",
      "moduleName": "模块四：Overview 选择主要特征（61–80）",
      "groupLabel": "混合图 Overview",
      "module": "模块四：Overview 选择主要特征（61–80）",
      "context": "柱图显示游客总数2000–2020持续增长；饼图显示2020年休闲游客占多数，商务游客较少。",
      "note": "混合图的 Overview 必须覆盖两幅图；第74句只有在数据确实支持这种联系时才能使用。",
      "chinese": "总体来看，游客总数在所示时期内显著增长。",
      "answer": "Overall, the total number of visitors increased substantially over the period shown.",
      "answerParts": [
        {
          "text": "Overall, the total number of visitors ",
          "strong": false
        },
        {
          "text": "increased substantially over the period shown",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-072",
      "number": 72,
      "groupId": "task1-group-15",
      "groupNumber": 15,
      "moduleId": "module-4",
      "moduleName": "模块四：Overview 选择主要特征（61–80）",
      "groupLabel": "混合图 Overview",
      "module": "模块四：Overview 选择主要特征（61–80）",
      "context": "柱图显示游客总数2000–2020持续增长；饼图显示2020年休闲游客占多数，商务游客较少。",
      "note": "混合图的 Overview 必须覆盖两幅图；第74句只有在数据确实支持这种联系时才能使用。",
      "chinese": "2020年，休闲旅行是到访的主要目的。",
      "answer": "Leisure travel was the principal purpose of visits in 2020.",
      "answerParts": [
        {
          "text": "Leisure travel was ",
          "strong": false
        },
        {
          "text": "the principal purpose of visits in 2020",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-073",
      "number": 73,
      "groupId": "task1-group-15",
      "groupNumber": 15,
      "moduleId": "module-4",
      "moduleName": "模块四：Overview 选择主要特征（61–80）",
      "groupLabel": "混合图 Overview",
      "module": "模块四：Overview 选择主要特征（61–80）",
      "context": "柱图显示游客总数2000–2020持续增长；饼图显示2020年休闲游客占多数，商务游客较少。",
      "note": "混合图的 Overview 必须覆盖两幅图；第74句只有在数据确实支持这种联系时才能使用。",
      "chinese": "商务游客在期末只占较小比例。",
      "answer": "Business travellers made up a relatively small share at the end of the period.",
      "answerParts": [
        {
          "text": "Business travellers ",
          "strong": false
        },
        {
          "text": "made up a relatively small share",
          "strong": true
        },
        {
          "text": " at the end of the period.",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-074",
      "number": 74,
      "groupId": "task1-group-15",
      "groupNumber": 15,
      "moduleId": "module-4",
      "moduleName": "模块四：Overview 选择主要特征（61–80）",
      "groupLabel": "混合图 Overview",
      "module": "模块四：Overview 选择主要特征（61–80）",
      "context": "柱图显示游客总数2000–2020持续增长；饼图显示2020年休闲游客占多数，商务游客较少。",
      "note": "混合图的 Overview 必须覆盖两幅图；第74句只有在数据确实支持这种联系时才能使用。",
      "chinese": "两幅图共同表明，游客增长主要与休闲旅行有关。",
      "answer": "Taken together, the charts indicate that visitor growth was largely associated with leisure travel.",
      "answerParts": [
        {
          "text": "Taken together, the charts indicate that visitor growth was ",
          "strong": false
        },
        {
          "text": "largely associated with leisure travel",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-075",
      "number": 75,
      "groupId": "task1-group-15",
      "groupNumber": 15,
      "moduleId": "module-4",
      "moduleName": "模块四：Overview 选择主要特征（61–80）",
      "groupLabel": "混合图 Overview",
      "module": "模块四：Overview 选择主要特征（61–80）",
      "context": "柱图显示游客总数2000–2020持续增长；饼图显示2020年休闲游客占多数，商务游客较少。",
      "note": "混合图的 Overview 必须覆盖两幅图；第74句只有在数据确实支持这种联系时才能使用。",
      "chinese": "最重要的特征是总量上升，同时休闲游客在最终构成中占主导。",
      "answer": "The key features are the rise in overall numbers and the dominance of leisure visitors in the final breakdown.",
      "answerParts": [
        {
          "text": "The key features are ",
          "strong": false
        },
        {
          "text": "the rise in overall numbers and the dominance of leisure visitors in the final breakdown",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-076",
      "number": 76,
      "groupId": "task1-group-16",
      "groupNumber": 16,
      "moduleId": "module-4",
      "moduleName": "模块四：Overview 选择主要特征（61–80）",
      "groupLabel": "判断什么不该写进 Overview",
      "module": "模块四：Overview 选择主要特征（61–80）",
      "context": "某校学生总数上升；女生后来超过男生；海外学生始终是少数；2012年男生为1,240人。前3项是主要特征，最后一项只是细节。",
      "note": "Overview 的价值在于筛选。一个准确数字如果不能代表总体趋势，仍然不是 Overview 内容。",
      "chinese": "学生总数在整个时期有所增加。",
      "answer": "The total student population grew over the period as a whole.",
      "answerParts": [
        {
          "text": "The total student population ",
          "strong": false
        },
        {
          "text": "grew over the period as a whole",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-077",
      "number": 77,
      "groupId": "task1-group-16",
      "groupNumber": 16,
      "moduleId": "module-4",
      "moduleName": "模块四：Overview 选择主要特征（61–80）",
      "groupLabel": "判断什么不该写进 Overview",
      "module": "模块四：Overview 选择主要特征（61–80）",
      "context": "某校学生总数上升；女生后来超过男生；海外学生始终是少数；2012年男生为1,240人。前3项是主要特征，最后一项只是细节。",
      "note": "Overview 的价值在于筛选。一个准确数字如果不能代表总体趋势，仍然不是 Overview 内容。",
      "chinese": "女生人数后来超过了男生人数。",
      "answer": "Female enrolment eventually overtook male enrolment.",
      "answerParts": [
        {
          "text": "Female enrolment ",
          "strong": false
        },
        {
          "text": "eventually overtook male enrolment",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-078",
      "number": 78,
      "groupId": "task1-group-16",
      "groupNumber": 16,
      "moduleId": "module-4",
      "moduleName": "模块四：Overview 选择主要特征（61–80）",
      "groupLabel": "判断什么不该写进 Overview",
      "module": "模块四：Overview 选择主要特征（61–80）",
      "context": "某校学生总数上升；女生后来超过男生；海外学生始终是少数；2012年男生为1,240人。前3项是主要特征，最后一项只是细节。",
      "note": "Overview 的价值在于筛选。一个准确数字如果不能代表总体趋势，仍然不是 Overview 内容。",
      "chinese": "海外学生虽然有所增加，但始终只占少数。",
      "answer": "Although the number of overseas students rose, they remained a minority throughout.",
      "answerParts": [
        {
          "text": "Although the number of overseas students rose, they ",
          "strong": false
        },
        {
          "text": "remained a minority throughout",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-079",
      "number": 79,
      "groupId": "task1-group-16",
      "groupNumber": 16,
      "moduleId": "module-4",
      "moduleName": "模块四：Overview 选择主要特征（61–80）",
      "groupLabel": "判断什么不该写进 Overview",
      "module": "模块四：Overview 选择主要特征（61–80）",
      "context": "某校学生总数上升；女生后来超过男生；海外学生始终是少数；2012年男生为1,240人。前3项是主要特征，最后一项只是细节。",
      "note": "Overview 的价值在于筛选。一个准确数字如果不能代表总体趋势，仍然不是 Overview 内容。",
      "chinese": "2012年，男生人数恰好为1,240人。",
      "answer": "In 2012, there were exactly 1,240 male students.",
      "answerParts": [
        {
          "text": "In 2012, ",
          "strong": false
        },
        {
          "text": "there were exactly 1,240 male students",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-080",
      "number": 80,
      "groupId": "task1-group-16",
      "groupNumber": 16,
      "moduleId": "module-4",
      "moduleName": "模块四：Overview 选择主要特征（61–80）",
      "groupLabel": "判断什么不该写进 Overview",
      "module": "模块四：Overview 选择主要特征（61–80）",
      "context": "某校学生总数上升；女生后来超过男生；海外学生始终是少数；2012年男生为1,240人。前3项是主要特征，最后一项只是细节。",
      "note": "Overview 的价值在于筛选。一个准确数字如果不能代表总体趋势，仍然不是 Overview 内容。",
      "chinese": "第79句适合放在正文细节段，而不适合单独作为总体概述。",
      "answer": "Sentence 79 belongs in a detailed body paragraph rather than serving as part of the overview.",
      "answerParts": [
        {
          "text": "Sentence 79 belongs in a detailed body paragraph rather than ",
          "strong": false
        },
        {
          "text": "serving as part of the overview",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-081",
      "number": 81,
      "groupId": "task1-group-17",
      "groupNumber": 17,
      "moduleId": "module-5",
      "moduleName": "模块五：地图与平面图（81–100）",
      "groupLabel": "小镇1990年与2020年",
      "module": "模块五：地图与平面图（81–100）",
      "context": "北部农田变为住宅区；中心商店保留；东部工厂拆除后建公园；道路向南延伸。",
      "note": "地图描述通常用被动语态；was replaced by 后接新设施，was converted into 强调用途改变。",
      "chinese": "总体而言，该镇变得更加住宅化，工业用地和农田都有所减少。",
      "answer": "Overall, the town became more residential, with reductions in both industrial and agricultural land.",
      "answerParts": [
        {
          "text": "Overall, the town became ",
          "strong": false
        },
        {
          "text": "more residential, with reductions in both industrial and agricultural land",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-082",
      "number": 82,
      "groupId": "task1-group-17",
      "groupNumber": 17,
      "moduleId": "module-5",
      "moduleName": "模块五：地图与平面图（81–100）",
      "groupLabel": "小镇1990年与2020年",
      "module": "模块五：地图与平面图（81–100）",
      "context": "北部农田变为住宅区；中心商店保留；东部工厂拆除后建公园；道路向南延伸。",
      "note": "地图描述通常用被动语态；was replaced by 后接新设施，was converted into 强调用途改变。",
      "chinese": "镇北部的农田被一个大型住宅区取代。",
      "answer": "The farmland in the north of the town was replaced by a large residential area.",
      "answerParts": [
        {
          "text": "The farmland in the north of the town ",
          "strong": false
        },
        {
          "text": "was replaced by a large residential area",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-083",
      "number": 83,
      "groupId": "task1-group-17",
      "groupNumber": 17,
      "moduleId": "module-5",
      "moduleName": "模块五：地图与平面图（81–100）",
      "groupLabel": "小镇1990年与2020年",
      "module": "模块五：地图与平面图（81–100）",
      "context": "北部农田变为住宅区；中心商店保留；东部工厂拆除后建公园；道路向南延伸。",
      "note": "地图描述通常用被动语态；was replaced by 后接新设施，was converted into 强调用途改变。",
      "chinese": "位于镇中心的商店在整个时期保持不变。",
      "answer": "The shops in the town centre remained unchanged throughout the period.",
      "answerParts": [
        {
          "text": "The shops in the town centre ",
          "strong": false
        },
        {
          "text": "remained unchanged throughout the period",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-084",
      "number": 84,
      "groupId": "task1-group-17",
      "groupNumber": 17,
      "moduleId": "module-5",
      "moduleName": "模块五：地图与平面图（81–100）",
      "groupLabel": "小镇1990年与2020年",
      "module": "模块五：地图与平面图（81–100）",
      "context": "北部农田变为住宅区；中心商店保留；东部工厂拆除后建公园；道路向南延伸。",
      "note": "地图描述通常用被动语态；was replaced by 后接新设施，was converted into 强调用途改变。",
      "chinese": "东部的工厂被拆除，原址建成了一座公园。",
      "answer": "The factory in the east was demolished to make way for a park.",
      "answerParts": [
        {
          "text": "The factory in the east ",
          "strong": false
        },
        {
          "text": "was demolished to make way for a park",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-085",
      "number": 85,
      "groupId": "task1-group-17",
      "groupNumber": 17,
      "moduleId": "module-5",
      "moduleName": "模块五：地图与平面图（81–100）",
      "groupLabel": "小镇1990年与2020年",
      "module": "模块五：地图与平面图（81–100）",
      "context": "北部农田变为住宅区；中心商店保留；东部工厂拆除后建公园；道路向南延伸。",
      "note": "地图描述通常用被动语态；was replaced by 后接新设施，was converted into 强调用途改变。",
      "chinese": "主干道向南延伸，以连接新开发区域。",
      "answer": "The main road was extended southwards to connect the new development.",
      "answerParts": [
        {
          "text": "The main road ",
          "strong": false
        },
        {
          "text": "was extended southwards to connect the new development",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-086",
      "number": 86,
      "groupId": "task1-group-18",
      "groupNumber": 18,
      "moduleId": "module-5",
      "moduleName": "模块五：地图与平面图（81–100）",
      "groupLabel": "公园改造前后",
      "module": "模块五：地图与平面图（81–100）",
      "context": "入口仍在南侧；中央喷泉改为咖啡馆；西侧花园扩大；东北角新增儿童区；环形步道保留。",
      "note": "in the north-eastern corner 表示区域内部角落；to the north-east of X 表示在X的东北方向。",
      "chinese": "公园入口仍位于南侧。",
      "answer": "The entrance remained on the southern side of the park.",
      "answerParts": [
        {
          "text": "The entrance ",
          "strong": false
        },
        {
          "text": "remained on the southern side of the park",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-087",
      "number": 87,
      "groupId": "task1-group-18",
      "groupNumber": 18,
      "moduleId": "module-5",
      "moduleName": "模块五：地图与平面图（81–100）",
      "groupLabel": "公园改造前后",
      "module": "模块五：地图与平面图（81–100）",
      "context": "入口仍在南侧；中央喷泉改为咖啡馆；西侧花园扩大；东北角新增儿童区；环形步道保留。",
      "note": "in the north-eastern corner 表示区域内部角落；to the north-east of X 表示在X的东北方向。",
      "chinese": "中央喷泉被改建成一座咖啡馆。",
      "answer": "The central fountain was converted into a café.",
      "answerParts": [
        {
          "text": "The central fountain ",
          "strong": false
        },
        {
          "text": "was converted into a café",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-088",
      "number": 88,
      "groupId": "task1-group-18",
      "groupNumber": 18,
      "moduleId": "module-5",
      "moduleName": "模块五：地图与平面图（81–100）",
      "groupLabel": "公园改造前后",
      "module": "模块五：地图与平面图（81–100）",
      "context": "入口仍在南侧；中央喷泉改为咖啡馆；西侧花园扩大；东北角新增儿童区；环形步道保留。",
      "note": "in the north-eastern corner 表示区域内部角落；to the north-east of X 表示在X的东北方向。",
      "chinese": "西侧的花园扩大，占据了更大的区域。",
      "answer": "The garden on the western side was enlarged to occupy a greater area.",
      "answerParts": [
        {
          "text": "The garden on the western side ",
          "strong": false
        },
        {
          "text": "was enlarged to occupy a greater area",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-089",
      "number": 89,
      "groupId": "task1-group-18",
      "groupNumber": 18,
      "moduleId": "module-5",
      "moduleName": "模块五：地图与平面图（81–100）",
      "groupLabel": "公园改造前后",
      "module": "模块五：地图与平面图（81–100）",
      "context": "入口仍在南侧；中央喷泉改为咖啡馆；西侧花园扩大；东北角新增儿童区；环形步道保留。",
      "note": "in the north-eastern corner 表示区域内部角落；to the north-east of X 表示在X的东北方向。",
      "chinese": "公园东北角新增了一个儿童游乐区。",
      "answer": "A children's play area was added in the north-eastern corner of the park.",
      "answerParts": [
        {
          "text": "A children's play area ",
          "strong": false
        },
        {
          "text": "was added in the north-eastern corner",
          "strong": true
        },
        {
          "text": " of the park.",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-090",
      "number": 90,
      "groupId": "task1-group-18",
      "groupNumber": 18,
      "moduleId": "module-5",
      "moduleName": "模块五：地图与平面图（81–100）",
      "groupLabel": "公园改造前后",
      "module": "模块五：地图与平面图（81–100）",
      "context": "入口仍在南侧；中央喷泉改为咖啡馆；西侧花园扩大；东北角新增儿童区；环形步道保留。",
      "note": "in the north-eastern corner 表示区域内部角落；to the north-east of X 表示在X的东北方向。",
      "chinese": "尽管设施有所更新，环绕公园的步道布局并未改变。",
      "answer": "Despite the new facilities, the layout of the path around the park was left unchanged.",
      "answerParts": [
        {
          "text": "Despite the new facilities, the layout of the path around the park ",
          "strong": false
        },
        {
          "text": "was left unchanged",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-091",
      "number": 91,
      "groupId": "task1-group-19",
      "groupNumber": 19,
      "moduleId": "module-5",
      "moduleName": "模块五：地图与平面图（81–100）",
      "groupLabel": "无人岛开发为旅游区",
      "module": "模块五：地图与平面图（81–100）",
      "context": "原岛只有树木和海滩；后来中央建接待处，东西两侧建住宿，南岸建码头，各处由步道连接。",
      "note": "地图 Overview 应同时写主要开发方向和明显保留项，不能只列“建了A、建了B”。",
      "chinese": "开发前，岛上除了树木和海滩外没有任何设施。",
      "answer": "Before development, the island contained no facilities apart from trees and a beach.",
      "answerParts": [
        {
          "text": "Before development, the island ",
          "strong": false
        },
        {
          "text": "contained no facilities apart from trees and a beach",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-092",
      "number": 92,
      "groupId": "task1-group-19",
      "groupNumber": 19,
      "moduleId": "module-5",
      "moduleName": "模块五：地图与平面图（81–100）",
      "groupLabel": "无人岛开发为旅游区",
      "module": "模块五：地图与平面图（81–100）",
      "context": "原岛只有树木和海滩；后来中央建接待处，东西两侧建住宿，南岸建码头，各处由步道连接。",
      "note": "地图 Overview 应同时写主要开发方向和明显保留项，不能只列“建了A、建了B”。",
      "chinese": "接待中心建在岛屿中央。",
      "answer": "A reception building was constructed in the centre of the island.",
      "answerParts": [
        {
          "text": "A reception building ",
          "strong": false
        },
        {
          "text": "was constructed in the centre of the island",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-093",
      "number": 93,
      "groupId": "task1-group-19",
      "groupNumber": 19,
      "moduleId": "module-5",
      "moduleName": "模块五：地图与平面图（81–100）",
      "groupLabel": "无人岛开发为旅游区",
      "module": "模块五：地图与平面图（81–100）",
      "context": "原岛只有树木和海滩；后来中央建接待处，东西两侧建住宿，南岸建码头，各处由步道连接。",
      "note": "地图 Overview 应同时写主要开发方向和明显保留项，不能只列“建了A、建了B”。",
      "chinese": "两组住宿设施分别分布在接待中心的东侧和西侧。",
      "answer": "Two groups of accommodation units were located to the east and west of the reception building.",
      "answerParts": [
        {
          "text": "Two groups of accommodation units ",
          "strong": false
        },
        {
          "text": "were located to the east and west of the reception building",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-094",
      "number": 94,
      "groupId": "task1-group-19",
      "groupNumber": 19,
      "moduleId": "module-5",
      "moduleName": "模块五：地图与平面图（81–100）",
      "groupLabel": "无人岛开发为旅游区",
      "module": "模块五：地图与平面图（81–100）",
      "context": "原岛只有树木和海滩；后来中央建接待处，东西两侧建住宿，南岸建码头，各处由步道连接。",
      "note": "地图 Overview 应同时写主要开发方向和明显保留项，不能只列“建了A、建了B”。",
      "chinese": "南岸新建的码头使游客能够乘船到达该岛。",
      "answer": "A new pier on the southern coast enabled visitors to reach the island by boat.",
      "answerParts": [
        {
          "text": "A new pier on the southern coast ",
          "strong": false
        },
        {
          "text": "enabled visitors to reach the island by boat",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-095",
      "number": 95,
      "groupId": "task1-group-19",
      "groupNumber": 19,
      "moduleId": "module-5",
      "moduleName": "模块五：地图与平面图（81–100）",
      "groupLabel": "无人岛开发为旅游区",
      "module": "模块五：地图与平面图（81–100）",
      "context": "原岛只有树木和海滩；后来中央建接待处，东西两侧建住宿，南岸建码头，各处由步道连接。",
      "note": "地图 Overview 应同时写主要开发方向和明显保留项，不能只列“建了A、建了B”。",
      "chinese": "总体来看，该岛被改造成旅游度假区，同时大部分树木得到保留。",
      "answer": "Overall, the island was transformed into a tourist resort while most of its trees were retained.",
      "answerParts": [
        {
          "text": "Overall, the island ",
          "strong": false
        },
        {
          "text": "was transformed into a tourist resort while most of its trees were retained",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-096",
      "number": 96,
      "groupId": "task1-group-20",
      "groupNumber": 20,
      "moduleId": "module-5",
      "moduleName": "模块五：地图与平面图（81–100）",
      "groupLabel": "未来校园规划",
      "module": "模块五：地图与平面图（81–100）",
      "context": "计划在图书馆北侧建实验楼；停车场迁至西侧；东门关闭；中央道路改为步行区；计划2028年完成。",
      "note": "未来规划可用 will be built、is planned、is to be constructed；全篇选择一种主时态并保持一致。",
      "chinese": "规划中的实验楼将建在图书馆北侧。",
      "answer": "The proposed laboratory building will be constructed to the north of the library.",
      "answerParts": [
        {
          "text": "The proposed laboratory building ",
          "strong": false
        },
        {
          "text": "will be constructed to the north of the library",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-097",
      "number": 97,
      "groupId": "task1-group-20",
      "groupNumber": 20,
      "moduleId": "module-5",
      "moduleName": "模块五：地图与平面图（81–100）",
      "groupLabel": "未来校园规划",
      "module": "模块五：地图与平面图（81–100）",
      "context": "计划在图书馆北侧建实验楼；停车场迁至西侧；东门关闭；中央道路改为步行区；计划2028年完成。",
      "note": "未来规划可用 will be built、is planned、is to be constructed；全篇选择一种主时态并保持一致。",
      "chinese": "现有停车场将迁至校园西侧。",
      "answer": "The existing car park is to be relocated to the western side of the campus.",
      "answerParts": [
        {
          "text": "The existing car park ",
          "strong": false
        },
        {
          "text": "is to be relocated to the western side of the campus",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-098",
      "number": 98,
      "groupId": "task1-group-20",
      "groupNumber": 20,
      "moduleId": "module-5",
      "moduleName": "模块五：地图与平面图（81–100）",
      "groupLabel": "未来校园规划",
      "module": "模块五：地图与平面图（81–100）",
      "context": "计划在图书馆北侧建实验楼；停车场迁至西侧；东门关闭；中央道路改为步行区；计划2028年完成。",
      "note": "未来规划可用 will be built、is planned、is to be constructed；全篇选择一种主时态并保持一致。",
      "chinese": "东门将被关闭，车辆只能从南门进入。",
      "answer": "The eastern entrance will be closed, leaving the southern gate as the only point of access for vehicles.",
      "answerParts": [
        {
          "text": "The eastern entrance will be closed, leaving the southern gate as ",
          "strong": false
        },
        {
          "text": "the only point of access for vehicles",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-099",
      "number": 99,
      "groupId": "task1-group-20",
      "groupNumber": 20,
      "moduleId": "module-5",
      "moduleName": "模块五：地图与平面图（81–100）",
      "groupLabel": "未来校园规划",
      "module": "模块五：地图与平面图（81–100）",
      "context": "计划在图书馆北侧建实验楼；停车场迁至西侧；东门关闭；中央道路改为步行区；计划2028年完成。",
      "note": "未来规划可用 will be built、is planned、is to be constructed；全篇选择一种主时态并保持一致。",
      "chinese": "穿过校园中央的道路将改为步行区。",
      "answer": "The road running through the centre of the campus will be converted into a pedestrian zone.",
      "answerParts": [
        {
          "text": "The road running through the centre of the campus ",
          "strong": false
        },
        {
          "text": "will be converted into a pedestrian zone",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-100",
      "number": 100,
      "groupId": "task1-group-20",
      "groupNumber": 20,
      "moduleId": "module-5",
      "moduleName": "模块五：地图与平面图（81–100）",
      "groupLabel": "未来校园规划",
      "module": "模块五：地图与平面图（81–100）",
      "context": "计划在图书馆北侧建实验楼；停车场迁至西侧；东门关闭；中央道路改为步行区；计划2028年完成。",
      "note": "未来规划可用 will be built、is planned、is to be constructed；全篇选择一种主时态并保持一致。",
      "chinese": "总体而言，该规划旨在减少校园中心的车辆活动并增加教学空间。",
      "answer": "Overall, the plan will reduce vehicle access to the centre while expanding teaching facilities.",
      "answerParts": [
        {
          "text": "Overall, the plan will ",
          "strong": false
        },
        {
          "text": "reduce vehicle access to the centre while expanding teaching facilities",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-101",
      "number": 101,
      "groupId": "task1-group-21",
      "groupNumber": 21,
      "moduleId": "module-6",
      "moduleName": "模块六：流程图与被动语态（101–120）",
      "groupLabel": "咖啡豆生产",
      "module": "模块六：流程图与被动语态（101–120）",
      "context": "采摘成熟果实→去果肉→清洗→晒干→烘焙→包装。线性人工流程。",
      "note": "流程重点是原料发生了什么，通常用被动语态；不要每句都写 workers 或 people。",
      "chinese": "总体来看，咖啡生产是一个由六个主要阶段组成的线性过程。",
      "answer": "Overall, coffee production is a linear process consisting of six main stages.",
      "answerParts": [
        {
          "text": "Overall, coffee production is ",
          "strong": false
        },
        {
          "text": "a linear process consisting of six main stages",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-102",
      "number": 102,
      "groupId": "task1-group-21",
      "groupNumber": 21,
      "moduleId": "module-6",
      "moduleName": "模块六：流程图与被动语态（101–120）",
      "groupLabel": "咖啡豆生产",
      "module": "模块六：流程图与被动语态（101–120）",
      "context": "采摘成熟果实→去果肉→清洗→晒干→烘焙→包装。线性人工流程。",
      "note": "流程重点是原料发生了什么，通常用被动语态；不要每句都写 workers 或 people。",
      "chinese": "首先，成熟的咖啡果实由人工采摘。",
      "answer": "First, ripe coffee cherries are picked by hand.",
      "answerParts": [
        {
          "text": "First, ripe coffee cherries ",
          "strong": false
        },
        {
          "text": "are picked by hand",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-103",
      "number": 103,
      "groupId": "task1-group-21",
      "groupNumber": 21,
      "moduleId": "module-6",
      "moduleName": "模块六：流程图与被动语态（101–120）",
      "groupLabel": "咖啡豆生产",
      "module": "模块六：流程图与被动语态（101–120）",
      "context": "采摘成熟果实→去果肉→清洗→晒干→烘焙→包装。线性人工流程。",
      "note": "流程重点是原料发生了什么，通常用被动语态；不要每句都写 workers 或 people。",
      "chinese": "去除果肉后，咖啡豆会被彻底清洗。",
      "answer": "Once the outer pulp has been removed, the beans are washed thoroughly.",
      "answerParts": [
        {
          "text": "Once the outer pulp has been removed, the beans ",
          "strong": false
        },
        {
          "text": "are washed thoroughly",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-104",
      "number": 104,
      "groupId": "task1-group-21",
      "groupNumber": 21,
      "moduleId": "module-6",
      "moduleName": "模块六：流程图与被动语态（101–120）",
      "groupLabel": "咖啡豆生产",
      "module": "模块六：流程图与被动语态（101–120）",
      "context": "采摘成熟果实→去果肉→清洗→晒干→烘焙→包装。线性人工流程。",
      "note": "流程重点是原料发生了什么，通常用被动语态；不要每句都写 workers 或 people。",
      "chinese": "清洗后的咖啡豆被铺在阳光下晾干。",
      "answer": "The washed beans are spread out in the sun to dry.",
      "answerParts": [
        {
          "text": "The washed beans ",
          "strong": false
        },
        {
          "text": "are spread out in the sun to dry",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-105",
      "number": 105,
      "groupId": "task1-group-21",
      "groupNumber": 21,
      "moduleId": "module-6",
      "moduleName": "模块六：流程图与被动语态（101–120）",
      "groupLabel": "咖啡豆生产",
      "module": "模块六：流程图与被动语态（101–120）",
      "context": "采摘成熟果实→去果肉→清洗→晒干→烘焙→包装。线性人工流程。",
      "note": "流程重点是原料发生了什么，通常用被动语态；不要每句都写 workers 或 people。",
      "chinese": "最后，干燥的咖啡豆经过烘焙并包装，以供销售。",
      "answer": "Finally, the dried beans are roasted and packaged for sale.",
      "answerParts": [
        {
          "text": "Finally, the dried beans ",
          "strong": false
        },
        {
          "text": "are roasted and packaged for sale",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-106",
      "number": 106,
      "groupId": "task1-group-22",
      "groupNumber": 22,
      "moduleId": "module-6",
      "moduleName": "模块六：流程图与被动语态（101–120）",
      "groupLabel": "废纸回收",
      "module": "模块六：流程图与被动语态（101–120）",
      "context": "收集→分类→制浆→去除杂质→压成纸张→再次使用。部分废纸在分类阶段被丢弃。",
      "note": "after being cleaned and pressed 比 after it is cleaned and it is pressed 更紧凑，但只有主语一致时才能使用省略结构。",
      "chinese": "废纸回收从收集旧纸开始，以生产新的纸张结束。",
      "answer": "Paper recycling begins with the collection of used paper and ends with the production of new sheets.",
      "answerParts": [
        {
          "text": "Paper recycling ",
          "strong": false
        },
        {
          "text": "begins with the collection of used paper and ends with the production of new sheets",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-107",
      "number": 107,
      "groupId": "task1-group-22",
      "groupNumber": 22,
      "moduleId": "module-6",
      "moduleName": "模块六：流程图与被动语态（101–120）",
      "groupLabel": "废纸回收",
      "module": "模块六：流程图与被动语态（101–120）",
      "context": "收集→分类→制浆→去除杂质→压成纸张→再次使用。部分废纸在分类阶段被丢弃。",
      "note": "after being cleaned and pressed 比 after it is cleaned and it is pressed 更紧凑，但只有主语一致时才能使用省略结构。",
      "chinese": "收集到的纸张按照类型和质量进行分类。",
      "answer": "The collected paper is sorted according to type and quality.",
      "answerParts": [
        {
          "text": "The collected paper ",
          "strong": false
        },
        {
          "text": "is sorted according to type and quality",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-108",
      "number": 108,
      "groupId": "task1-group-22",
      "groupNumber": 22,
      "moduleId": "module-6",
      "moduleName": "模块六：流程图与被动语态（101–120）",
      "groupLabel": "废纸回收",
      "module": "模块六：流程图与被动语态（101–120）",
      "context": "收集→分类→制浆→去除杂质→压成纸张→再次使用。部分废纸在分类阶段被丢弃。",
      "note": "after being cleaned and pressed 比 after it is cleaned and it is pressed 更紧凑，但只有主语一致时才能使用省略结构。",
      "chinese": "不适合回收的材料在这一阶段被去除。",
      "answer": "Material that is unsuitable for recycling is removed at this stage.",
      "answerParts": [
        {
          "text": "Material that is unsuitable for recycling ",
          "strong": false
        },
        {
          "text": "is removed at this stage",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-109",
      "number": 109,
      "groupId": "task1-group-22",
      "groupNumber": 22,
      "moduleId": "module-6",
      "moduleName": "模块六：流程图与被动语态（101–120）",
      "groupLabel": "废纸回收",
      "module": "模块六：流程图与被动语态（101–120）",
      "context": "收集→分类→制浆→去除杂质→压成纸张→再次使用。部分废纸在分类阶段被丢弃。",
      "note": "after being cleaned and pressed 比 after it is cleaned and it is pressed 更紧凑，但只有主语一致时才能使用省略结构。",
      "chinese": "剩余的纸张与水混合，形成纸浆。",
      "answer": "The remaining paper is mixed with water to form pulp.",
      "answerParts": [
        {
          "text": "The remaining paper ",
          "strong": false
        },
        {
          "text": "is mixed with water to form pulp",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-110",
      "number": 110,
      "groupId": "task1-group-22",
      "groupNumber": 22,
      "moduleId": "module-6",
      "moduleName": "模块六：流程图与被动语态（101–120）",
      "groupLabel": "废纸回收",
      "module": "模块六：流程图与被动语态（101–120）",
      "context": "收集→分类→制浆→去除杂质→压成纸张→再次使用。部分废纸在分类阶段被丢弃。",
      "note": "after being cleaned and pressed 比 after it is cleaned and it is pressed 更紧凑，但只有主语一致时才能使用省略结构。",
      "chinese": "纸浆经过清洁和压制后成为新纸，可再次投入使用。",
      "answer": "After being cleaned and pressed, the pulp is turned into new paper ready for reuse.",
      "answerParts": [
        {
          "text": "After being cleaned and pressed, the pulp ",
          "strong": false
        },
        {
          "text": "is turned into new paper ready for reuse",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-111",
      "number": 111,
      "groupId": "task1-group-23",
      "groupNumber": 23,
      "moduleId": "module-6",
      "moduleName": "模块六：流程图与被动语态（101–120）",
      "groupLabel": "太阳能热水系统",
      "module": "模块六：流程图与被动语态（101–120）",
      "context": "冷水进入储水箱→泵入屋顶集热板→阳光加热→热水返回水箱→输送到住宅。",
      "note": "自然过程或液体自行流动可用主动 flows；设备对水执行动作时用被动 is pumped、is supplied。",
      "chinese": "该系统利用太阳能把冷水转化为可供家庭使用的热水。",
      "answer": "The system uses solar energy to convert cold water into hot water for domestic use.",
      "answerParts": [
        {
          "text": "The system uses solar energy to ",
          "strong": false
        },
        {
          "text": "convert cold water into hot water for domestic use",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-112",
      "number": 112,
      "groupId": "task1-group-23",
      "groupNumber": 23,
      "moduleId": "module-6",
      "moduleName": "模块六：流程图与被动语态（101–120）",
      "groupLabel": "太阳能热水系统",
      "module": "模块六：流程图与被动语态（101–120）",
      "context": "冷水进入储水箱→泵入屋顶集热板→阳光加热→热水返回水箱→输送到住宅。",
      "note": "自然过程或液体自行流动可用主动 flows；设备对水执行动作时用被动 is pumped、is supplied。",
      "chinese": "冷水首先流入储水箱。",
      "answer": "Cold water first flows into a storage tank.",
      "answerParts": [
        {
          "text": "Cold water first ",
          "strong": false
        },
        {
          "text": "flows into a storage tank",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-113",
      "number": 113,
      "groupId": "task1-group-23",
      "groupNumber": 23,
      "moduleId": "module-6",
      "moduleName": "模块六：流程图与被动语态（101–120）",
      "groupLabel": "太阳能热水系统",
      "module": "模块六：流程图与被动语态（101–120）",
      "context": "冷水进入储水箱→泵入屋顶集热板→阳光加热→热水返回水箱→输送到住宅。",
      "note": "自然过程或液体自行流动可用主动 flows；设备对水执行动作时用被动 is pumped、is supplied。",
      "chinese": "随后，水被泵送到安装在屋顶上的太阳能集热板。",
      "answer": "It is then pumped to solar collectors mounted on the roof.",
      "answerParts": [
        {
          "text": "It is then pumped to ",
          "strong": false
        },
        {
          "text": "solar collectors mounted on the roof",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-114",
      "number": 114,
      "groupId": "task1-group-23",
      "groupNumber": 23,
      "moduleId": "module-6",
      "moduleName": "模块六：流程图与被动语态（101–120）",
      "groupLabel": "太阳能热水系统",
      "module": "模块六：流程图与被动语态（101–120）",
      "context": "冷水进入储水箱→泵入屋顶集热板→阳光加热→热水返回水箱→输送到住宅。",
      "note": "自然过程或液体自行流动可用主动 flows；设备对水执行动作时用被动 is pumped、is supplied。",
      "chinese": "当水流经集热板时，阳光产生的热量使其温度升高。",
      "answer": "As the water passes through the collectors, heat from the sun raises its temperature.",
      "answerParts": [
        {
          "text": "As the water passes through the collectors, heat from the sun ",
          "strong": false
        },
        {
          "text": "raises its temperature",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-115",
      "number": 115,
      "groupId": "task1-group-23",
      "groupNumber": 23,
      "moduleId": "module-6",
      "moduleName": "模块六：流程图与被动语态（101–120）",
      "groupLabel": "太阳能热水系统",
      "module": "模块六：流程图与被动语态（101–120）",
      "context": "冷水进入储水箱→泵入屋顶集热板→阳光加热→热水返回水箱→输送到住宅。",
      "note": "自然过程或液体自行流动可用主动 flows；设备对水执行动作时用被动 is pumped、is supplied。",
      "chinese": "加热后的水返回储水箱，然后被输送到住宅内部。",
      "answer": "The heated water returns to the tank before being supplied to the house.",
      "answerParts": [
        {
          "text": "The heated water returns to the tank before ",
          "strong": false
        },
        {
          "text": "being supplied to the house",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-116",
      "number": 116,
      "groupId": "task1-group-24",
      "groupNumber": 24,
      "moduleId": "module-6",
      "moduleName": "模块六：流程图与被动语态（101–120）",
      "groupLabel": "青蛙生命周期",
      "module": "模块六：流程图与被动语态（101–120）",
      "context": "卵→蝌蚪→长出后腿→长出前腿并缩短尾巴→幼蛙→成年蛙→产卵。循环自然过程。",
      "note": "自然生命周期通常用一般现在时；cyclical process 的 Overview 应明确“最终回到起点”。",
      "chinese": "青蛙的生命周期是一个循环过程，从卵开始，最后由成年蛙再次产卵。",
      "answer": "The life cycle of a frog is a cyclical process that begins with eggs and ends when adult frogs lay eggs again.",
      "answerParts": [
        {
          "text": "The life cycle of a frog is ",
          "strong": false
        },
        {
          "text": "a cyclical process that begins with eggs and ends when adult frogs lay eggs again",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-117",
      "number": 117,
      "groupId": "task1-group-24",
      "groupNumber": 24,
      "moduleId": "module-6",
      "moduleName": "模块六：流程图与被动语态（101–120）",
      "groupLabel": "青蛙生命周期",
      "module": "模块六：流程图与被动语态（101–120）",
      "context": "卵→蝌蚪→长出后腿→长出前腿并缩短尾巴→幼蛙→成年蛙→产卵。循环自然过程。",
      "note": "自然生命周期通常用一般现在时；cyclical process 的 Overview 应明确“最终回到起点”。",
      "chinese": "卵孵化后，幼小的蝌蚪进入水中。",
      "answer": "After the eggs hatch, young tadpoles emerge into the water.",
      "answerParts": [
        {
          "text": "After the eggs hatch, ",
          "strong": false
        },
        {
          "text": "young tadpoles emerge into the water",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-118",
      "number": 118,
      "groupId": "task1-group-24",
      "groupNumber": 24,
      "moduleId": "module-6",
      "moduleName": "模块六：流程图与被动语态（101–120）",
      "groupLabel": "青蛙生命周期",
      "module": "模块六：流程图与被动语态（101–120）",
      "context": "卵→蝌蚪→长出后腿→长出前腿并缩短尾巴→幼蛙→成年蛙→产卵。循环自然过程。",
      "note": "自然生命周期通常用一般现在时；cyclical process 的 Overview 应明确“最终回到起点”。",
      "chinese": "随着蝌蚪生长，它先长出后腿，随后长出前腿。",
      "answer": "As the tadpole develops, its hind legs appear before its front legs.",
      "answerParts": [
        {
          "text": "As the tadpole develops, ",
          "strong": false
        },
        {
          "text": "its hind legs appear before its front legs",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-119",
      "number": 119,
      "groupId": "task1-group-24",
      "groupNumber": 24,
      "moduleId": "module-6",
      "moduleName": "模块六：流程图与被动语态（101–120）",
      "groupLabel": "青蛙生命周期",
      "module": "模块六：流程图与被动语态（101–120）",
      "context": "卵→蝌蚪→长出后腿→长出前腿并缩短尾巴→幼蛙→成年蛙→产卵。循环自然过程。",
      "note": "自然生命周期通常用一般现在时；cyclical process 的 Overview 应明确“最终回到起点”。",
      "chinese": "在下一阶段，尾巴逐渐缩短，幼蛙开始形成。",
      "answer": "During the next stage, the tail gradually shortens as a young frog forms.",
      "answerParts": [
        {
          "text": "During the next stage, the tail ",
          "strong": false
        },
        {
          "text": "gradually shortens as a young frog forms",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-120",
      "number": 120,
      "groupId": "task1-group-24",
      "groupNumber": 24,
      "moduleId": "module-6",
      "moduleName": "模块六：流程图与被动语态（101–120）",
      "groupLabel": "青蛙生命周期",
      "module": "模块六：流程图与被动语态（101–120）",
      "context": "卵→蝌蚪→长出后腿→长出前腿并缩短尾巴→幼蛙→成年蛙→产卵。循环自然过程。",
      "note": "自然生命周期通常用一般现在时；cyclical process 的 Overview 应明确“最终回到起点”。",
      "chinese": "成年蛙最终产卵，从而开始新一轮生命周期。",
      "answer": "The adult frog eventually lays eggs, thereby beginning a new cycle.",
      "answerParts": [
        {
          "text": "The adult frog eventually lays eggs, ",
          "strong": false
        },
        {
          "text": "thereby beginning a new cycle",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-121",
      "number": 121,
      "groupId": "task1-group-25",
      "groupNumber": 25,
      "moduleId": "module-7",
      "moduleName": "模块七：把单句连成微型报告（121–140）",
      "groupLabel": "微型报告一：回收率折线图",
      "module": "模块七：把单句连成微型报告（121–140）",
      "context": "图表比较1982–2010年纸张、玻璃、铝罐和塑料的回收比例。纸张先升后略降但始终最高；铝罐增长最快；塑料始终最低。",
      "note": "第121句只是改写题目，不是 Overview；第122句才是总体概述。",
      "chinese": "该折线图比较了1982年至2010年间四种材料的回收比例。",
      "answer": "The line graph compares the percentages of four materials recycled between 1982 and 2010.",
      "answerParts": [
        {
          "text": "The line graph ",
          "strong": false
        },
        {
          "text": "compares the percentages of four materials recycled between 1982 and 2010",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-122",
      "number": 122,
      "groupId": "task1-group-25",
      "groupNumber": 25,
      "moduleId": "module-7",
      "moduleName": "模块七：把单句连成微型报告（121–140）",
      "groupLabel": "微型报告一：回收率折线图",
      "module": "模块七：把单句连成微型报告（121–140）",
      "context": "图表比较1982–2010年纸张、玻璃、铝罐和塑料的回收比例。纸张先升后略降但始终最高；铝罐增长最快；塑料始终最低。",
      "note": "第121句只是改写题目，不是 Overview；第122句才是总体概述。",
      "chinese": "总体而言，纸张的回收率始终最高，而塑料一直排在最后。",
      "answer": "Overall, paper consistently had the highest recycling rate, while plastic remained the least recycled material.",
      "answerParts": [
        {
          "text": "Overall, paper ",
          "strong": false
        },
        {
          "text": "consistently had the highest recycling rate",
          "strong": true
        },
        {
          "text": ", while plastic remained the least recycled material.",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-123",
      "number": 123,
      "groupId": "task1-group-25",
      "groupNumber": 25,
      "moduleId": "module-7",
      "moduleName": "模块七：把单句连成微型报告（121–140）",
      "groupLabel": "微型报告一：回收率折线图",
      "module": "模块七：把单句连成微型报告（121–140）",
      "context": "图表比较1982–2010年纸张、玻璃、铝罐和塑料的回收比例。纸张先升后略降但始终最高；铝罐增长最快；塑料始终最低。",
      "note": "第121句只是改写题目，不是 Overview；第122句才是总体概述。",
      "chinese": "纸张回收率最初上升，达到峰值后在期末略有下降。",
      "answer": "The figure for paper rose initially before declining slightly after reaching a peak.",
      "answerParts": [
        {
          "text": "The figure for paper rose initially before ",
          "strong": false
        },
        {
          "text": "declining slightly after reaching a peak",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-124",
      "number": 124,
      "groupId": "task1-group-25",
      "groupNumber": 25,
      "moduleId": "module-7",
      "moduleName": "模块七：把单句连成微型报告（121–140）",
      "groupLabel": "微型报告一：回收率折线图",
      "module": "模块七：把单句连成微型报告（121–140）",
      "context": "图表比较1982–2010年纸张、玻璃、铝罐和塑料的回收比例。纸张先升后略降但始终最高；铝罐增长最快；塑料始终最低。",
      "note": "第121句只是改写题目，不是 Overview；第122句才是总体概述。",
      "chinese": "铝罐虽然起点较低，却在整个时期增长最快。",
      "answer": "Despite starting from a low base, aluminium cans recorded the fastest growth over the period.",
      "answerParts": [
        {
          "text": "Despite starting from a low base, aluminium cans ",
          "strong": false
        },
        {
          "text": "recorded the fastest growth over the period",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-125",
      "number": 125,
      "groupId": "task1-group-25",
      "groupNumber": 25,
      "moduleId": "module-7",
      "moduleName": "模块七：把单句连成微型报告（121–140）",
      "groupLabel": "微型报告一：回收率折线图",
      "module": "模块七：把单句连成微型报告（121–140）",
      "context": "图表比较1982–2010年纸张、玻璃、铝罐和塑料的回收比例。纸张先升后略降但始终最高；铝罐增长最快；塑料始终最低。",
      "note": "第121句只是改写题目，不是 Overview；第122句才是总体概述。",
      "chinese": "相比之下，塑料回收率只出现了小幅提高，最终仍远低于其他材料。",
      "answer": "By contrast, plastic recycling increased only marginally and finished well below the other figures.",
      "answerParts": [
        {
          "text": "By contrast, plastic recycling ",
          "strong": false
        },
        {
          "text": "increased only marginally and finished well below the other figures",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-126",
      "number": 126,
      "groupId": "task1-group-26",
      "groupNumber": 26,
      "moduleId": "module-7",
      "moduleName": "模块七：把单句连成微型报告（121–140）",
      "groupLabel": "微型报告二：四类毕业生去向",
      "module": "模块七：把单句连成微型报告（121–140）",
      "context": "柱图显示某大学毕业生去向：全职工作55%、继续深造25%、兼职工作12%、失业8%。",
      "note": "静态图用 was、accounted for、entered；不要写 full-time employment increased to 55%。",
      "chinese": "该柱状图显示了某大学毕业生毕业后的四种去向。",
      "answer": "The bar chart shows the four destinations of graduates from a particular university.",
      "answerParts": [
        {
          "text": "The bar chart ",
          "strong": false
        },
        {
          "text": "shows the four destinations of graduates from a particular university",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-127",
      "number": 127,
      "groupId": "task1-group-26",
      "groupNumber": 26,
      "moduleId": "module-7",
      "moduleName": "模块七：把单句连成微型报告（121–140）",
      "groupLabel": "微型报告二：四类毕业生去向",
      "module": "模块七：把单句连成微型报告（121–140）",
      "context": "柱图显示某大学毕业生去向：全职工作55%、继续深造25%、兼职工作12%、失业8%。",
      "note": "静态图用 was、accounted for、entered；不要写 full-time employment increased to 55%。",
      "chinese": "总体来看，全职就业是最常见的去向，而失业所占比例最小。",
      "answer": "Overall, full-time employment was by far the most common outcome, whereas unemployment was the least common.",
      "answerParts": [
        {
          "text": "Overall, full-time employment was ",
          "strong": false
        },
        {
          "text": "by far the most common outcome",
          "strong": true
        },
        {
          "text": ", whereas unemployment was the least common.",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-128",
      "number": 128,
      "groupId": "task1-group-26",
      "groupNumber": 26,
      "moduleId": "module-7",
      "moduleName": "模块七：把单句连成微型报告（121–140）",
      "groupLabel": "微型报告二：四类毕业生去向",
      "module": "模块七：把单句连成微型报告（121–140）",
      "context": "柱图显示某大学毕业生去向：全职工作55%、继续深造25%、兼职工作12%、失业8%。",
      "note": "静态图用 was、accounted for、entered；不要写 full-time employment increased to 55%。",
      "chinese": "超过一半的毕业生进入全职工作，具体比例为55%。",
      "answer": "Just over half of the graduates entered full-time employment, at 55%.",
      "answerParts": [
        {
          "text": "Just over half of the graduates ",
          "strong": false
        },
        {
          "text": "entered full-time employment",
          "strong": true
        },
        {
          "text": ", at 55%.",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-129",
      "number": 129,
      "groupId": "task1-group-26",
      "groupNumber": 26,
      "moduleId": "module-7",
      "moduleName": "模块七：把单句连成微型报告（121–140）",
      "groupLabel": "微型报告二：四类毕业生去向",
      "module": "模块七：把单句连成微型报告（121–140）",
      "context": "柱图显示某大学毕业生去向：全职工作55%、继续深造25%、兼职工作12%、失业8%。",
      "note": "静态图用 was、accounted for、entered；不要写 full-time employment increased to 55%。",
      "chinese": "继续深造的人占四分之一，比例不到全职就业者的一半。",
      "answer": "A quarter continued their studies, less than half the proportion taking full-time jobs.",
      "answerParts": [
        {
          "text": "A quarter continued their studies, ",
          "strong": false
        },
        {
          "text": "less than half the proportion taking full-time jobs",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-130",
      "number": 130,
      "groupId": "task1-group-26",
      "groupNumber": 26,
      "moduleId": "module-7",
      "moduleName": "模块七：把单句连成微型报告（121–140）",
      "groupLabel": "微型报告二：四类毕业生去向",
      "module": "模块七：把单句连成微型报告（121–140）",
      "context": "柱图显示某大学毕业生去向：全职工作55%、继续深造25%、兼职工作12%、失业8%。",
      "note": "静态图用 was、accounted for、entered；不要写 full-time employment increased to 55%。",
      "chinese": "兼职工作和失业分别占12%和8%，两者合计仅为五分之一。",
      "answer": "Part-time work and unemployment accounted for 12% and 8% respectively, a combined share of only one fifth.",
      "answerParts": [
        {
          "text": "Part-time work and unemployment accounted for 12% and 8% respectively, ",
          "strong": false
        },
        {
          "text": "a combined share of only one fifth",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-131",
      "number": 131,
      "groupId": "task1-group-27",
      "groupNumber": 27,
      "moduleId": "module-7",
      "moduleName": "模块七：把单句连成微型报告（121–140）",
      "groupLabel": "微型报告三：火车站改造",
      "module": "模块七：把单句连成微型报告（121–140）",
      "context": "旧站只有一个站台和售票处；新方案增加第二站台、咖啡馆和自行车停放区；售票处保留；入口扩大。",
      "note": "地图正文按区域或改动类型分组；不要毫无顺序地逐项“左边有、右边有”。",
      "chinese": "两幅平面图展示了火车站目前的布局和计划改造后的样子。",
      "answer": "The two plans show the current layout of a railway station and its proposed redevelopment.",
      "answerParts": [
        {
          "text": "The two plans ",
          "strong": false
        },
        {
          "text": "show the current layout of a railway station and its proposed redevelopment",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-132",
      "number": 132,
      "groupId": "task1-group-27",
      "groupNumber": 27,
      "moduleId": "module-7",
      "moduleName": "模块七：把单句连成微型报告（121–140）",
      "groupLabel": "微型报告三：火车站改造",
      "module": "模块七：把单句连成微型报告（121–140）",
      "context": "旧站只有一个站台和售票处；新方案增加第二站台、咖啡馆和自行车停放区；售票处保留；入口扩大。",
      "note": "地图正文按区域或改动类型分组；不要毫无顺序地逐项“左边有、右边有”。",
      "chinese": "总体而言，车站将增加乘客设施和交通容量，而原有售票处会被保留。",
      "answer": "Overall, the station will gain more passenger facilities and greater capacity, while the existing ticket office will be retained.",
      "answerParts": [
        {
          "text": "Overall, the station will ",
          "strong": false
        },
        {
          "text": "gain more passenger facilities and greater capacity",
          "strong": true
        },
        {
          "text": ", while the existing ticket office will be retained.",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-133",
      "number": 133,
      "groupId": "task1-group-27",
      "groupNumber": 27,
      "moduleId": "module-7",
      "moduleName": "模块七：把单句连成微型报告（121–140）",
      "groupLabel": "微型报告三：火车站改造",
      "module": "模块七：把单句连成微型报告（121–140）",
      "context": "旧站只有一个站台和售票处；新方案增加第二站台、咖啡馆和自行车停放区；售票处保留；入口扩大。",
      "note": "地图正文按区域或改动类型分组；不要毫无顺序地逐项“左边有、右边有”。",
      "chinese": "第二个站台将建在现有铁轨的北侧。",
      "answer": "A second platform will be constructed on the northern side of the existing tracks.",
      "answerParts": [
        {
          "text": "A second platform ",
          "strong": false
        },
        {
          "text": "will be constructed on the northern side of the existing tracks",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-134",
      "number": 134,
      "groupId": "task1-group-27",
      "groupNumber": 27,
      "moduleId": "module-7",
      "moduleName": "模块七：把单句连成微型报告（121–140）",
      "groupLabel": "微型报告三：火车站改造",
      "module": "模块七：把单句连成微型报告（121–140）",
      "context": "旧站只有一个站台和售票处；新方案增加第二站台、咖啡馆和自行车停放区；售票处保留；入口扩大。",
      "note": "地图正文按区域或改动类型分组；不要毫无顺序地逐项“左边有、右边有”。",
      "chinese": "入口附近将新增咖啡馆，东侧则规划了自行车停放区。",
      "answer": "A café will be added near the entrance, while a bicycle parking area is planned for the eastern side.",
      "answerParts": [
        {
          "text": "A café will be added near the entrance, while ",
          "strong": false
        },
        {
          "text": "a bicycle parking area is planned for the eastern side",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-135",
      "number": 135,
      "groupId": "task1-group-27",
      "groupNumber": 27,
      "moduleId": "module-7",
      "moduleName": "模块七：把单句连成微型报告（121–140）",
      "groupLabel": "微型报告三：火车站改造",
      "module": "模块七：把单句连成微型报告（121–140）",
      "context": "旧站只有一个站台和售票处；新方案增加第二站台、咖啡馆和自行车停放区；售票处保留；入口扩大。",
      "note": "地图正文按区域或改动类型分组；不要毫无顺序地逐项“左边有、右边有”。",
      "chinese": "售票处的位置不会改变，但主入口将被拓宽。",
      "answer": "The ticket office will remain in the same position, but the main entrance will be widened.",
      "answerParts": [
        {
          "text": "The ticket office will remain in the same position, but ",
          "strong": false
        },
        {
          "text": "the main entrance will be widened",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-136",
      "number": 136,
      "groupId": "task1-group-28",
      "groupNumber": 28,
      "moduleId": "module-7",
      "moduleName": "模块七：把单句连成微型报告（121–140）",
      "groupLabel": "微型报告四：玻璃瓶循环利用",
      "module": "模块七：把单句连成微型报告（121–140）",
      "context": "空瓶回收→卡车运输→按颜色分类→清洗→熔化→制成新瓶→灌装→送往商店，之后可再次回收。",
      "note": "Overview 说明这是循环过程；正文按箭头顺序写，不漏掉会改变原料状态的关键阶段。",
      "chinese": "该图说明了废旧玻璃瓶如何被回收并重新投入使用。",
      "answer": "The diagram illustrates how used glass bottles are recycled and returned to use.",
      "answerParts": [
        {
          "text": "The diagram ",
          "strong": false
        },
        {
          "text": "illustrates how used glass bottles are recycled and returned to use",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-137",
      "number": 137,
      "groupId": "task1-group-28",
      "groupNumber": 28,
      "moduleId": "module-7",
      "moduleName": "模块七：把单句连成微型报告（121–140）",
      "groupLabel": "微型报告四：玻璃瓶循环利用",
      "module": "模块七：把单句连成微型报告（121–140）",
      "context": "空瓶回收→卡车运输→按颜色分类→清洗→熔化→制成新瓶→灌装→送往商店，之后可再次回收。",
      "note": "Overview 说明这是循环过程；正文按箭头顺序写，不漏掉会改变原料状态的关键阶段。",
      "chinese": "总体来看，这是一个循环过程，包括收集、加工、重新灌装和再次销售。",
      "answer": "Overall, it is a cyclical process involving collection, processing, refilling, and resale.",
      "answerParts": [
        {
          "text": "Overall, it is ",
          "strong": false
        },
        {
          "text": "a cyclical process involving collection, processing, refilling, and resale",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-138",
      "number": 138,
      "groupId": "task1-group-28",
      "groupNumber": 28,
      "moduleId": "module-7",
      "moduleName": "模块七：把单句连成微型报告（121–140）",
      "groupLabel": "微型报告四：玻璃瓶循环利用",
      "module": "模块七：把单句连成微型报告（121–140）",
      "context": "空瓶回收→卡车运输→按颜色分类→清洗→熔化→制成新瓶→灌装→送往商店，之后可再次回收。",
      "note": "Overview 说明这是循环过程；正文按箭头顺序写，不漏掉会改变原料状态的关键阶段。",
      "chinese": "回收的瓶子由卡车运到处理厂，并按照颜色分类。",
      "answer": "The collected bottles are transported by truck to a processing plant, where they are sorted by colour.",
      "answerParts": [
        {
          "text": "The collected bottles are transported by truck to a processing plant, where they ",
          "strong": false
        },
        {
          "text": "are sorted by colour",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-139",
      "number": 139,
      "groupId": "task1-group-28",
      "groupNumber": 28,
      "moduleId": "module-7",
      "moduleName": "模块七：把单句连成微型报告（121–140）",
      "groupLabel": "微型报告四：玻璃瓶循环利用",
      "module": "模块七：把单句连成微型报告（121–140）",
      "context": "空瓶回收→卡车运输→按颜色分类→清洗→熔化→制成新瓶→灌装→送往商店，之后可再次回收。",
      "note": "Overview 说明这是循环过程；正文按箭头顺序写，不漏掉会改变原料状态的关键阶段。",
      "chinese": "清洗后，玻璃被熔化并制成新的瓶子。",
      "answer": "After being cleaned, the glass is melted and formed into new bottles.",
      "answerParts": [
        {
          "text": "After being cleaned, the glass ",
          "strong": false
        },
        {
          "text": "is melted and formed into new bottles",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    },
    {
      "id": "task1-140",
      "number": 140,
      "groupId": "task1-group-28",
      "groupNumber": 28,
      "moduleId": "module-7",
      "moduleName": "模块七：把单句连成微型报告（121–140）",
      "groupLabel": "微型报告四：玻璃瓶循环利用",
      "module": "模块七：把单句连成微型报告（121–140）",
      "context": "空瓶回收→卡车运输→按颜色分类→清洗→熔化→制成新瓶→灌装→送往商店，之后可再次回收。",
      "note": "Overview 说明这是循环过程；正文按箭头顺序写，不漏掉会改变原料状态的关键阶段。",
      "chinese": "新瓶完成灌装后被送往商店，使用后又可以进入同一循环。",
      "answer": "Once filled, the new bottles are delivered to shops and can re-enter the same cycle after use.",
      "answerParts": [
        {
          "text": "Once filled, the new bottles are delivered to shops and can ",
          "strong": false
        },
        {
          "text": "re-enter the same cycle after use",
          "strong": true
        },
        {
          "text": ".",
          "strong": false
        }
      ]
    }
  ]
};

  if (typeof window !== "undefined") {
    window.TASK1_WORKBOOK_PACK_V1 = TASK1_WORKBOOK_PACK_V1;
    if (window.ContentRegistry) {
      window.ContentRegistry.registerPack(TASK1_WORKBOOK_PACK_V1);
    } else {
      window._PRELOADED_PACKS = window._PRELOADED_PACKS || [];
      window._PRELOADED_PACKS.push(TASK1_WORKBOOK_PACK_V1);
    }
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = TASK1_WORKBOOK_PACK_V1;
  }
})();
