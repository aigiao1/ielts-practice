// Task 1 核心图表视觉数据与四步思维链词库全量知识包 (Task 1 Visual Scaffolds v2 - Complete 28 Groups)
// 包含 7 大模块、全量 28 个题组、140 道题目的精准原生图表数据、思维链骨架与学术同义词库
(() => {
  "use strict";

  const TASK1_VISUAL_SCAFFOLDS = {
  "task1-group-01": {
    "chartType": "pie",
    "chartTitle": "家庭支出构成 (Household Expenditure Breakdown)",
    "unit": "%",
    "chartData": [
      {
        "label": "住房 (Housing)",
        "value": 45,
        "unit": "%",
        "color": "#e76f51"
      },
      {
        "label": "食品 (Food)",
        "value": 30,
        "unit": "%",
        "color": "#f4a261"
      },
      {
        "label": "交通 (Transport)",
        "value": 15,
        "unit": "%",
        "color": "#2a9d8f"
      },
      {
        "label": "娱乐 (Entertainment)",
        "value": 10,
        "unit": "%",
        "color": "#457b9d"
      }
    ],
    "relations": [
      {
        "qNumber": 1,
        "type": "proportion",
        "badge": "单项占比 · 最大值",
        "trigger": "看到 45% (最大)",
        "funcIntent": "主项占比陈述",
        "targets": [
          "住房 (Housing)"
        ],
        "skeleton": "[Category] accounted for [N]% of total household expenditure.",
        "demo": "Housing accounted for 45% of total household expenditure."
      },
      {
        "qNumber": 2,
        "type": "ranking",
        "badge": "顺位排序 · 第二大",
        "trigger": "看到 30% 紧随其后",
        "funcIntent": "第二梯队顺位描述",
        "targets": [
          "食品 (Food)"
        ],
        "skeleton": "[Category] was the second-largest category, representing [N]% of the total.",
        "demo": "Food was the second-largest category, representing 30% of the total."
      },
      {
        "qNumber": 3,
        "type": "difference",
        "badge": "差值对比 · 百分点",
        "trigger": "看到 15% vs 10% (差5)",
        "funcIntent": "两项差值对比 (谨防误用 percent)",
        "targets": [
          "交通 (Transport)",
          "娱乐 (Entertainment)"
        ],
        "skeleton": "The proportion spent on [A] was [N] percentage points higher than that for [B].",
        "demo": "The proportion spent on transport was 5 percentage points higher than that for entertainment."
      },
      {
        "qNumber": 4,
        "type": "multiplier",
        "badge": "倍数关系 · 四倍半",
        "trigger": "看到 45% vs 10% (4.5倍)",
        "funcIntent": "极值与极小项倍数对比",
        "targets": [
          "住房 (Housing)",
          "娱乐 (Entertainment)"
        ],
        "skeleton": "Spending on [A] was [N] times as high as spending on [B].",
        "demo": "Spending on housing was four and a half times as high as spending on entertainment."
      },
      {
        "qNumber": 5,
        "type": "total",
        "badge": "合计数 · 分数归纳",
        "trigger": "看到 45% + 30% = 75%",
        "funcIntent": "前两大部分合并归纳 (四分之三)",
        "targets": [
          "住房 (Housing)",
          "食品 (Food)"
        ],
        "skeleton": "[A] and [B] together made up [fraction] of all expenditure.",
        "demo": "Housing and food together made up three quarters of all expenditure."
      }
    ],
    "synonymGroups": [
      {
        "category": "主题词 · 支出",
        "words": [
          {
            "en": "expenditure",
            "note": "不可数/可数，雅思最通用正式词"
          },
          {
            "en": "spending",
            "note": "常用动名词"
          },
          {
            "en": "outlay",
            "note": "开销/支出金额"
          },
          {
            "en": "expenses",
            "note": "通常用复数形式"
          },
          {
            "en": "spending on...",
            "note": "搭配介词 on"
          }
        ]
      },
      {
        "category": "功能词 · 比例 / 份额",
        "words": [
          {
            "en": "proportion",
            "note": "比例（后接 that for / of）"
          },
          {
            "en": "percentage",
            "note": "百分比"
          },
          {
            "en": "share",
            "note": "份额/占比"
          },
          {
            "en": "rate",
            "note": "比率"
          }
        ]
      },
      {
        "category": "骨架动词 · 占据 / 构成",
        "words": [
          {
            "en": "accounted for",
            "note": "占据（雅思最高频核心动词）"
          },
          {
            "en": "made up",
            "note": "构成/占据"
          },
          {
            "en": "represented",
            "note": "代表/相当于"
          },
          {
            "en": "constituted",
            "note": "构成（正式书面语）"
          },
          {
            "en": "comprised",
            "note": "由...组成 / 占"
          }
        ]
      }
    ],
    "stepsGuide": {
      "step1": "1. 识别关系：住房 45% 最大；食品 30% 次之；交通 15% 与娱乐 10% 差 5 个百分点；45% 是 10% 的 4.5 倍；前两项合计 75%。",
      "step2": "2. 对应功能：占比陈述 / 顺位排序 / 差值对比 / 倍数对比 / 组合合计。",
      "step3": "3. 提取骨架：从下方骨架抽屉中调用对应的模板，避免考场重新创造语法。",
      "step4": "4. 填入数据：放入 Housing / Food / Transport / Entertainment 及具体数值，注意单复数与代词 that for。"
    }
  },
  "task1-group-02": {
    "chartType": "table",
    "chartTitle": "三座机场年客流量对比 (Annual Passenger Numbers)",
    "unit": "passengers per year",
    "chartData": [
      {
        "label": "Airport A",
        "value": "1.2 million (120万)",
        "note": "最高客流量"
      },
      {
        "label": "Airport B",
        "value": "800,000 (80万)",
        "note": "中等规模，比A少40万"
      },
      {
        "label": "Airport C",
        "value": "600,000 (60万)",
        "note": "刚好是A的一半"
      }
    ],
    "relations": [
      {
        "qNumber": 6,
        "type": "volume",
        "badge": "绝对量 · 主体陈述",
        "trigger": "看到 Airport A: 120万",
        "funcIntent": "首位主体吞吐量陈述",
        "targets": [
          "Airport A"
        ],
        "skeleton": "[Airport] handled approximately [N] passengers per year.",
        "demo": "Airport A handled approximately 1.2 million passengers per year."
      },
      {
        "qNumber": 7,
        "type": "difference",
        "badge": "差值比较 · 绝对数值",
        "trigger": "看到 B 80万 vs A 120万 (少40万)",
        "funcIntent": "并列数值后追加差额非限定短语",
        "targets": [
          "Airport B",
          "Airport A"
        ],
        "skeleton": "[Airport B] served [X] passengers, [Y] fewer than [Airport A].",
        "demo": "Airport B served 800,000 passengers annually, 400,000 fewer than Airport A."
      },
      {
        "qNumber": 8,
        "type": "multiplier",
        "badge": "倍数关系 · 两倍",
        "trigger": "看到 A 120万 是 C 60万的两倍",
        "funcIntent": "倍数与代词替代 (those at...)",
        "targets": [
          "Airport A",
          "Airport C"
        ],
        "skeleton": "Passenger numbers at [A] were exactly twice those at [C].",
        "demo": "Passenger numbers at Airport A were exactly twice those at Airport C."
      },
      {
        "qNumber": 9,
        "type": "ranking",
        "badge": "极值排序 · 最少",
        "trigger": "看到 Airport C 最低",
        "funcIntent": "底端规模与从句修饰",
        "targets": [
          "Airport C"
        ],
        "skeleton": "[Airport C] had the lowest traffic, with [X] passengers traveling through it.",
        "demo": "Airport C had the lowest traffic, with 600,000 passengers traveling through it."
      },
      {
        "qNumber": 10,
        "type": "total",
        "badge": "总计与平均",
        "trigger": "看到 1.2M + 0.8M + 0.6M = 2.6M",
        "funcIntent": "全项求和归纳",
        "targets": [
          "Airport A",
          "Airport B",
          "Airport C"
        ],
        "skeleton": "In total, the three airports accommodated [N] passengers over the period.",
        "demo": "In total, the three airports accommodated 2.6 million passengers over the period."
      }
    ],
    "synonymGroups": [
      {
        "category": "主题词 · 客流量 / 旅客",
        "words": [
          {
            "en": "passenger numbers",
            "note": "旅客数量（复数）"
          },
          {
            "en": "passenger traffic",
            "note": "客流总量（不可数）"
          },
          {
            "en": "passengers",
            "note": "乘客人数"
          }
        ]
      },
      {
        "category": "动词 · 接待 / 服务 / 吞吐",
        "words": [
          {
            "en": "handled",
            "note": "处理/吞吐（机场最地道）"
          },
          {
            "en": "served",
            "note": "服务接待"
          },
          {
            "en": "accommodated",
            "note": "容纳/接待（大规模）"
          },
          {
            "en": "traveled through...",
            "note": "途经该机场"
          }
        ]
      },
      {
        "category": "比较与倍数代词",
        "words": [
          {
            "en": "twice those at...",
            "note": "是...的两倍（代词 those 替代 numbers）"
          },
          {
            "en": "400,000 fewer than...",
            "note": "比...少 40 万"
          },
          {
            "en": "the lowest traffic",
            "note": "最低客流量"
          }
        ]
      }
    ],
    "stepsGuide": {
      "step1": "1. 识别关系：A 120万(最多)；B 80万；C 60万(最少)；B比A少40万；A是C的整整2倍；总计260万。",
      "step2": "2. 对应功能：客流吞吐 / 差值描述 / 倍数比较 (注意代词 those) / 极值排序 / 总量归纳。",
      "step3": "3. 提取骨架：避免用 than Airport C（逻辑错误），必须用 than that/those at Airport C。",
      "step4": "4. 填入数据：注意单位 passengers per year 与 million 的搭配。"
    }
  },
  "task1-group-03": {
    "chartType": "pie",
    "chartTitle": "四种能源消耗占比 (Energy Sources)",
    "unit": "%",
    "chartData": [
      {
        "label": "煤炭 (Coal)",
        "value": 51,
        "unit": "%",
        "color": "#264653"
      },
      {
        "label": "天然气 (Gas)",
        "value": 24,
        "unit": "%",
        "color": "#2a9d8f"
      },
      {
        "label": "核能 (Nuclear)",
        "value": 14,
        "unit": "%",
        "color": "#e9c46a"
      },
      {
        "label": "可再生能源 (Renewables)",
        "value": 11,
        "unit": "%",
        "color": "#e76f51"
      }
    ],
    "relations": [
      {
        "qNumber": 11,
        "type": "approximate",
        "badge": "刚过半 · just over half",
        "trigger": "看到 51% (略微大于 50%)",
        "funcIntent": "半数临界近似表达",
        "targets": [
          "煤炭 (Coal)"
        ],
        "skeleton": "[Category] made up just over half of all [topic], at 51%.",
        "demo": "Coal made up just over half of all energy consumption, at 51%."
      },
      {
        "qNumber": 12,
        "type": "approximate",
        "badge": "将近四分之一 · just under a quarter",
        "trigger": "看到 24% (略微小于 25%)",
        "funcIntent": "四分之一临界近似表达",
        "targets": [
          "天然气 (Gas)"
        ],
        "skeleton": "Natural gas accounted for just under a quarter of the total.",
        "demo": "Natural gas accounted for just under a quarter of the total, at 24%."
      },
      {
        "qNumber": 13,
        "type": "approximate",
        "badge": "大约 · roughly / approximately",
        "trigger": "看到 14% 和 11%",
        "funcIntent": "中低比例模糊量化",
        "targets": [
          "核能 (Nuclear)",
          "可再生能源 (Renewables)"
        ],
        "skeleton": "Nuclear energy and renewables supplied roughly [X]% and [Y]% respectively.",
        "demo": "Nuclear power and renewable sources provided approximately 14% and 11% respectively."
      },
      {
        "qNumber": 14,
        "type": "approximate",
        "badge": "两者合计接近 · close to two thirds",
        "trigger": "看到 51% + 24% = 75% 左右",
        "funcIntent": "多项合并近似",
        "targets": [
          "煤炭 (Coal)",
          "天然气 (Gas)"
        ],
        "skeleton": "Fossil fuels together made up approximately three quarters of the total.",
        "demo": "Coal and gas together comprised close to three quarters of all energy consumed."
      },
      {
        "qNumber": 15,
        "type": "approximate",
        "badge": "微弱少数 · a small minority",
        "trigger": "看到可再生能源仅 11%",
        "funcIntent": "极小项修饰",
        "targets": [
          "可再生能源 (Renewables)"
        ],
        "skeleton": "Renewable energy represented a small minority of the total, at just 11%.",
        "demo": "Renewables accounted for a small minority of total energy, at 11%."
      }
    ],
    "synonymGroups": [
      {
        "category": "近似修饰词 (Approximations)",
        "words": [
          {
            "en": "just over half",
            "note": "刚过半（51%–53%）"
          },
          {
            "en": "just under a quarter",
            "note": "将近四分之一（23%–24%）"
          },
          {
            "en": "roughly / approximately",
            "note": "大约/概略"
          },
          {
            "en": "close to three quarters",
            "note": "接近四分之三"
          },
          {
            "en": "a small minority",
            "note": "微弱少数"
          }
        ]
      },
      {
        "category": "能源与供应动词",
        "words": [
          {
            "en": "energy consumption",
            "note": "能源消耗"
          },
          {
            "en": "supplied / provided",
            "note": "供应/提供能源"
          },
          {
            "en": "renewable sources",
            "note": "可再生能源"
          }
        ]
      }
    ],
    "stepsGuide": {
      "step1": "1. 识别关系：51% 刚好过半 (50%)；24% 接近 1/4 (25%)；核能与可再生能源分别占 14% 与 11%；前两项合计接近 3/4。",
      "step2": "2. 对应功能：分数近似 (just over half / just under a quarter) / 分别列举 (respectively)。",
      "step3": "3. 提取骨架：不要只会写 exactly 51%，灵活使用分数比写死数字更符合雅思学术多态标准！",
      "step4": "4. 填入数据：核对 51% 与 24% 的近似度，注意 respectively 对应顺序。"
    }
  },
  "task1-group-04": {
    "chartType": "bar_grouped",
    "chartTitle": "三种通勤方式人群比例变化 (Commuting Trends: Percent vs Points)",
    "unit": "%",
    "chartData": {
      "categories": [
        "自行车 (Cycling)",
        "驾车 (Driving)",
        "步行 (Walking)"
      ],
      "series": [
        {
          "name": "基期",
          "color": "#8d99ae",
          "values": [
            20,
            50,
            10
          ]
        },
        {
          "name": "末期",
          "color": "#2a9d8f",
          "values": [
            30,
            40,
            10
          ]
        }
      ]
    },
    "relations": [
      {
        "qNumber": 16,
        "type": "rise_to",
        "badge": "升至 · rose to 30%",
        "trigger": "看到自行车 20% -> 30%",
        "funcIntent": "终点数值表述",
        "targets": [
          "自行车 (Cycling)"
        ],
        "skeleton": "The proportion of people cycling to work rose to 30%.",
        "demo": "The proportion of people cycling to work rose to 30%."
      },
      {
        "qNumber": 17,
        "type": "rise_by_points",
        "badge": "上升百分点 · rose by 10 points",
        "trigger": "看到差额 30% - 20% = 10",
        "funcIntent": "差值幅度表述 (必须用 percentage points)",
        "targets": [
          "自行车 (Cycling)"
        ],
        "skeleton": "The percentage of cyclists increased by 10 percentage points.",
        "demo": "The percentage of cyclists increased by 10 percentage points."
      },
      {
        "qNumber": 18,
        "type": "fall_to",
        "badge": "降至 · dropped to 40%",
        "trigger": "看到驾车 50% -> 40%",
        "funcIntent": "降至终点数值",
        "targets": [
          "驾车 (Driving)"
        ],
        "skeleton": "Car commuters fell to 40% of the total.",
        "demo": "Car commuters fell to 40% of the total."
      },
      {
        "qNumber": 19,
        "type": "fall_by_points",
        "badge": "下降百分点 · dropped by 10 points",
        "trigger": "看到差额 50% - 40% = 10",
        "funcIntent": "降幅差值 (谨防误用 dropped by 10%)",
        "targets": [
          "驾车 (Driving)"
        ],
        "skeleton": "The figure for drivers decreased by 10 percentage points.",
        "demo": "The figure for drivers decreased by 10 percentage points."
      },
      {
        "qNumber": 20,
        "type": "stable",
        "badge": "保持稳定 · remained stable at 10%",
        "trigger": "看到步行始终 10%",
        "funcIntent": "持平无变化表述",
        "targets": [
          "步行 (Walking)"
        ],
        "skeleton": "Walking remained unchanged at 10% over the period.",
        "demo": "Walking remained unchanged at 10% over the period."
      }
    ],
    "synonymGroups": [
      {
        "category": "介词核心辨析",
        "words": [
          {
            "en": "rose to [N]%",
            "note": "升至（终点数值）"
          },
          {
            "en": "rose by [N] percentage points",
            "note": "上升了...个百分点（差额）"
          },
          {
            "en": "fell to [N]%",
            "note": "降至（终点数值）"
          },
          {
            "en": "fell by [N] percentage points",
            "note": "下降了...个百分点（差额）"
          }
        ]
      },
      {
        "category": "平稳与不变",
        "words": [
          {
            "en": "remained stable at...",
            "note": "稳定在..."
          },
          {
            "en": "remained unchanged at...",
            "note": "保持不变"
          },
          {
            "en": "stayed constant at...",
            "note": "维持恒定"
          }
        ]
      }
    ],
    "stepsGuide": {
      "step1": "1. 识别关系：自行车 20% ➔ 30% (涨 10 个百分点)；驾车 50% ➔ 40% (跌 10 个百分点)；步行 10% 保持不变。",
      "step2": "2. 对应功能：终点描述 (to) ↔ 差额描述 (by percentage points) ↔ 平稳描述 (remained stable at)。",
      "step3": "3. 提取骨架：严禁把 20% 升到 30% 写成 rose by 10%（数学错误：20%涨10%是22%）！必须写 rose by 10 percentage points！",
      "step4": "4. 填入数据：核对 to 与 by 的搭配及主语。"
    }
  },
  "task1-group-05": {
    "chartType": "line",
    "chartTitle": "2000–2020年三种交通出行量变化 (Transport Journeys 2000–2020)",
    "unit": "million journeys",
    "chartData": {
      "xLabels": [
        "2000",
        "2005",
        "2010",
        "2015",
        "2020"
      ],
      "yUnit": "m",
      "yMin": 0,
      "yMax": 60,
      "series": [
        {
          "label": "铁路 (Rail)",
          "color": "#2a9d8f",
          "points": [
            20,
            28,
            38,
            47,
            55
          ]
        },
        {
          "label": "公交 (Bus)",
          "color": "#e76f51",
          "points": [
            45,
            42,
            40,
            37,
            35
          ]
        },
        {
          "label": "航空 (Air)",
          "color": "#457b9d",
          "points": [
            10,
            18,
            28,
            40,
            50
          ]
        }
      ]
    },
    "relations": [
      {
        "qNumber": 21,
        "type": "steady_rise",
        "badge": "稳步上升 · rose steadily",
        "trigger": "看到铁路 20 持续增至 55",
        "funcIntent": "持续稳定上升趋势",
        "targets": [
          "铁路 (Rail)"
        ],
        "skeleton": "Rail travel rose steadily from [A] million to [B] million.",
        "demo": "Rail travel rose steadily from 20 million to 55 million."
      },
      {
        "qNumber": 22,
        "type": "gradual_fall",
        "badge": "缓慢下降 · fell gradually",
        "trigger": "看到公交 45 缓慢跌至 35",
        "funcIntent": "温和下降走势",
        "targets": [
          "公交 (Bus)"
        ],
        "skeleton": "Bus journeys experienced a gradual decline from [A]m to [B]m.",
        "demo": "Bus journeys experienced a gradual decline from 45m to 35m."
      },
      {
        "qNumber": 23,
        "type": "rapid_growth",
        "badge": "快速攀升 · grew rapidly",
        "trigger": "看到航空 10 激增至 50",
        "funcIntent": "高速增长斜率",
        "targets": [
          "航空 (Air)"
        ],
        "skeleton": "Air travel grew dramatically, jumping from [A]m to [B]m.",
        "demo": "Air travel grew dramatically, jumping from 10m to 50m."
      },
      {
        "qNumber": 24,
        "type": "overtake",
        "badge": "反超顺位 · overtook bus",
        "trigger": "看到航空与铁路中途超越公交",
        "funcIntent": "多线交错动态反超",
        "targets": [
          "航空 (Air)",
          "公交 (Bus)"
        ],
        "skeleton": "By [Year], air journeys had surpassed bus trips.",
        "demo": "By 2015, air journeys had surpassed bus trips."
      },
      {
        "qNumber": 25,
        "type": "final_rank",
        "badge": "期末排序 · highest at the end",
        "trigger": "看到 2020 年铁路 55 最高",
        "funcIntent": "期末极值汇总",
        "targets": [
          "铁路 (Rail)"
        ],
        "skeleton": "By the end of the period, rail accounted for the highest volume.",
        "demo": "By the end of the period, rail accounted for the highest volume."
      }
    ],
    "synonymGroups": [
      {
        "category": "上升动词与副词",
        "words": [
          {
            "en": "rose steadily",
            "note": "平稳上升（多节点方向一致）"
          },
          {
            "en": "grew dramatically",
            "note": "剧烈增长"
          },
          {
            "en": "surged from... to...",
            "note": "激增"
          },
          {
            "en": "witnessed a steady upward trend",
            "note": "见证稳步上升趋势"
          }
        ]
      },
      {
        "category": "下降动词与副词",
        "words": [
          {
            "en": "fell gradually",
            "note": "缓慢下降"
          },
          {
            "en": "declined slightly",
            "note": "微幅下滑"
          },
          {
            "en": "experienced a downward trend",
            "note": "呈现下行趋势"
          }
        ]
      },
      {
        "category": "超越与反超",
        "words": [
          {
            "en": "overtook...",
            "note": "超过/反超"
          },
          {
            "en": "surpassed...",
            "note": "超越"
          },
          {
            "en": "exceeded...",
            "note": "多于/超越"
          }
        ]
      }
    ],
    "stepsGuide": {
      "step1": "1. 识别关系：铁路(绿)从20稳增到55；公交(红)从45缓慢降至35；航空(蓝)从10狂飙到50反超公交。",
      "step2": "2. 对应功能：趋势描述 + 斜率修饰语 (steadily / gradually / dramatically) + 反超结构。",
      "step3": "3. 提取骨架：从起点到终点用 from... to...，注意动词过去式 rose / fell / grew。",
      "step4": "4. 填入数据：单位为 million journeys，不要遗漏单位。"
    }
  },
  "task1-group-06": {
    "chartType": "line",
    "chartTitle": "月度用电量波动曲线 (Monthly Electricity Fluctuations)",
    "unit": "kWh",
    "chartData": {
      "xLabels": [
        "1月",
        "4月",
        "7月",
        "10月",
        "12月"
      ],
      "yUnit": "kWh",
      "yMin": 200,
      "yMax": 450,
      "series": [
        {
          "label": "月用电量 (Usage)",
          "color": "#e76f51",
          "points": [
            320,
            240,
            410,
            260,
            350
          ]
        }
      ]
    },
    "relations": [
      {
        "qNumber": 26,
        "type": "fluctuate",
        "badge": "全年剧烈波动 · fluctuated",
        "trigger": "看到多次上下起伏",
        "funcIntent": "总体波动形态陈述",
        "targets": [
          "月用电量 (Usage)"
        ],
        "skeleton": "Electricity consumption fluctuated significantly between [Min] and [Max] kWh.",
        "demo": "Electricity consumption fluctuated significantly between 240 and 410 kWh."
      },
      {
        "qNumber": 27,
        "type": "drop_to",
        "badge": "春季下滑 · dropped to 240",
        "trigger": "看到 1月 320 -> 4月 240",
        "funcIntent": "下行低谷描述",
        "targets": [
          "月用电量 (Usage)"
        ],
        "skeleton": "Usage dropped to 240 kWh in April.",
        "demo": "Usage dropped to 240 kWh in April."
      },
      {
        "qNumber": 28,
        "type": "rebound_peak",
        "badge": "夏季激增到达顶峰 · peaked at 410",
        "trigger": "看到 7月 飙升至 410 (全年最高)",
        "funcIntent": "反弹冲顶描述",
        "targets": [
          "月用电量 (Usage)"
        ],
        "skeleton": "Consumption rebounded sharply to peak at 410 kWh in July.",
        "demo": "Consumption rebounded sharply to peak at 410 kWh in July."
      },
      {
        "qNumber": 29,
        "type": "drop_autumn",
        "badge": "秋季回落 · fell back to 260",
        "trigger": "看到 10月 降至 260",
        "funcIntent": "二次回落",
        "targets": [
          "月用电量 (Usage)"
        ],
        "skeleton": "Figures fell back to 260 kWh in October.",
        "demo": "Figures fell back to 260 kWh in October."
      },
      {
        "qNumber": 30,
        "type": "year_end_rise",
        "badge": "年末再度走高 · recovered to 350",
        "trigger": "看到 12月 恢复至 350",
        "funcIntent": "年末翘尾走势",
        "targets": [
          "月用电量 (Usage)"
        ],
        "skeleton": "Electricity demand recovered to finish at 350 kWh in December.",
        "demo": "Electricity demand recovered to finish at 350 kWh in December."
      }
    ],
    "synonymGroups": [
      {
        "category": "波动核心词",
        "words": [
          {
            "en": "fluctuated between A and B",
            "note": "在A与B之间波动（需有多次起伏）"
          },
          {
            "en": "experienced wild fluctuations",
            "note": "经历剧烈起伏"
          },
          {
            "en": "showed an oscillating pattern",
            "note": "呈现摆动模式"
          }
        ]
      },
      {
        "category": "峰值与反弹",
        "words": [
          {
            "en": "peaked at...",
            "note": "在...达到顶峰（动词）"
          },
          {
            "en": "reached a peak of...",
            "note": "达到...的高峰（名词）"
          },
          {
            "en": "rebounded to...",
            "note": "反弹至"
          },
          {
            "en": "fell back to...",
            "note": "回落到"
          }
        ]
      }
    ],
    "stepsGuide": {
      "step1": "1. 识别关系：1月320 ➔ 4月跌至240 ➔ 7月飙到410(峰值) ➔ 10月跌到260 ➔ 12月回弹到350。",
      "step2": "2. 对应功能：全图先用 fluctuate 定调，再分述各节点的跌落、冲顶、回落与反弹。",
      "step3": "3. 提取骨架：peaked at + 数字，不可写 peaked to；fluctuated 后跟 between A and B。",
      "step4": "4. 填入数据：带入月份 in April / in July / in December 与对应千瓦时 kWh。"
    }
  },
  "task1-group-07": {
    "chartType": "line",
    "chartTitle": "两国互联网使用率演变与交叉 (Internet Penetration Crossing)",
    "unit": "%",
    "chartData": {
      "xLabels": [
        "2005",
        "2015",
        "2025"
      ],
      "yUnit": "%",
      "yMin": 20,
      "yMax": 100,
      "series": [
        {
          "label": "甲国 (Country A)",
          "color": "#2a9d8f",
          "points": [
            60,
            70,
            82
          ]
        },
        {
          "label": "乙国 (Country B)",
          "color": "#e76f51",
          "points": [
            25,
            70,
            90
          ]
        }
      ]
    },
    "relations": [
      {
        "qNumber": 31,
        "type": "initial_gap",
        "badge": "初始差距悬殊 · 60% vs 25%",
        "trigger": "看到 2005 年甲国领先 35 个点",
        "funcIntent": "基期初始状态对比",
        "targets": [
          "甲国 (Country A)",
          "乙国 (Country B)"
        ],
        "skeleton": "In 2005, internet usage in [A] was significantly higher than in [B], at 60% compared with 25%.",
        "demo": "In 2005, internet penetration in Country A was much higher than in Country B, at 60% versus 25%."
      },
      {
        "qNumber": 32,
        "type": "steep_rise",
        "badge": "乙国高速追赶 · surged",
        "trigger": "看到乙国曲线斜率极大",
        "funcIntent": "斜率对比描述",
        "targets": [
          "乙国 (Country B)"
        ],
        "skeleton": "Country B experienced much faster growth over the following decade.",
        "demo": "Country B experienced much faster growth over the following decade."
      },
      {
        "qNumber": 33,
        "type": "intersection",
        "badge": "相交打平 · figures were equal",
        "trigger": "看到 2015 年相交于 70%",
        "funcIntent": "曲线相交（打平）规范表达",
        "targets": [
          "甲国 (Country A)",
          "乙国 (Country B)"
        ],
        "skeleton": "By 2015, the figures for both nations were equal at 70%.",
        "demo": "By 2015, the figures for both countries were equal at 70%."
      },
      {
        "qNumber": 34,
        "type": "overtake",
        "badge": "后来居上反超 · overtook",
        "trigger": "看到乙国在 2015 年后超过甲国",
        "funcIntent": "反超状态判定",
        "targets": [
          "乙国 (Country B)",
          "甲国 (Country A)"
        ],
        "skeleton": "After 2015, Country B overtook Country A.",
        "demo": "After 2015, Country B overtook Country A to take the lead."
      },
      {
        "qNumber": 35,
        "type": "final_project",
        "badge": "期末预测领先 · reached 90%",
        "trigger": "看到 2025 年乙国 90% vs 甲国 82%",
        "funcIntent": "期末状态与极值",
        "targets": [
          "乙国 (Country B)"
        ],
        "skeleton": "By 2025, Country B is projected to reach 90%, outstripping Country A.",
        "demo": "By 2025, internet usage in Country B is expected to reach 90%, outstripping Country A's 82%."
      }
    ],
    "synonymGroups": [
      {
        "category": "交叉与相等",
        "words": [
          {
            "en": "the figures were equal at...",
            "note": "两项数据在...持平（严禁写 crossed each other 无结果）"
          },
          {
            "en": "converged at...",
            "note": "交汇于..."
          },
          {
            "en": "tied at...",
            "note": "打平在..."
          }
        ]
      },
      {
        "category": "反超与领跑",
        "words": [
          {
            "en": "overtook...",
            "note": "超过（动词过去式）"
          },
          {
            "en": "surpassed...",
            "note": "超越"
          },
          {
            "en": "outstripped...",
            "note": "超越/超过"
          },
          {
            "en": "took the lead",
            "note": "取得领先地位"
          }
        ]
      }
    ],
    "stepsGuide": {
      "step1": "1. 识别关系：2005年甲国60%远高于乙国25%；2015年两条线在70%精确相交打平；2025年乙国反超冲到90%，甲国82%。",
      "step2": "2. 对应功能：初始差距 ➔ 追赶斜率 ➔ 相交持平 (were equal at) ➔ 反超 (overtook) ➔ 期末领跑。",
      "step3": "3. 提取骨架：不要直译“lines crossed each other”，学术写作必须写 the figures were equal 或 B overtook A。",
      "step4": "4. 填入数据：注意 2025 年是未来预测时态 (is projected to / is expected to)。"
    }
  },
  "task1-group-08": {
    "chartType": "line",
    "chartTitle": "产品销售量峰谷走势 (Product Sales: Peak, Trough & Recovery)",
    "unit": "thousand units",
    "chartData": {
      "xLabels": [
        "2010",
        "2012",
        "2015",
        "2018",
        "2020"
      ],
      "yUnit": "k",
      "yMin": 30,
      "yMax": 100,
      "series": [
        {
          "label": "销量 (Sales)",
          "color": "#2a9d8f",
          "points": [
            70,
            95,
            40,
            65,
            90
          ]
        }
      ]
    },
    "relations": [
      {
        "qNumber": 36,
        "type": "peak",
        "badge": "冲顶峰值 · peaked at 95,000",
        "trigger": "看到 2012 年冲至 95 (最高)",
        "funcIntent": "历史最高点表述",
        "targets": [
          "销量 (Sales)"
        ],
        "skeleton": "Sales reached a peak of [N] units in [Year].",
        "demo": "Sales peaked at 95,000 units in 2012."
      },
      {
        "qNumber": 37,
        "type": "trough",
        "badge": "跌入谷底 · hit a trough of 40,000",
        "trigger": "看到 2015 年暴跌至 40 (最低)",
        "funcIntent": "历史最低点/谷底表述",
        "targets": [
          "销量 (Sales)"
        ],
        "skeleton": "The figure then plunged to hit an all-time low of [N] units.",
        "demo": "The figure then plummeted to hit a trough of 40,000 units in 2015."
      },
      {
        "qNumber": 38,
        "type": "recover",
        "badge": "强劲反弹 · recovered to 65,000",
        "trigger": "看到 2018 年回升至 65",
        "funcIntent": "经历低谷后的恢复与回弹",
        "targets": [
          "销量 (Sales)"
        ],
        "skeleton": "Sales subsequently recovered to [N] units in [Year].",
        "demo": "Sales subsequently recovered to 65,000 units in 2018."
      },
      {
        "qNumber": 39,
        "type": "finish_high",
        "badge": "期末回稳 · finished at 90,000",
        "trigger": "看到 2020 年重新攀升至 90",
        "funcIntent": "终点收尾走势",
        "targets": [
          "销量 (Sales)"
        ],
        "skeleton": "The upward trend continued, finishing at [N] units in [Year].",
        "demo": "The upward momentum continued, finishing at 90,000 units in 2020."
      },
      {
        "qNumber": 40,
        "type": "overall_vibe",
        "badge": "总体模式 · experienced marked volatility",
        "trigger": "看到大起大落的全貌",
        "funcIntent": "走势宏观特征定调",
        "targets": [
          "销量 (Sales)"
        ],
        "skeleton": "Overall, sales experienced marked fluctuations before recovering.",
        "demo": "Overall, sales experienced marked volatility despite finishing strongly."
      }
    ],
    "synonymGroups": [
      {
        "category": "峰顶与极值",
        "words": [
          {
            "en": "peaked at...",
            "note": "在...达到顶峰（动词）"
          },
          {
            "en": "reached a peak of...",
            "note": "达到...的峰值（名词）"
          },
          {
            "en": "hit an all-time high of...",
            "note": "创下历史新高"
          }
        ]
      },
      {
        "category": "低谷与深跌",
        "words": [
          {
            "en": "hit a trough of...",
            "note": "跌入...的谷底"
          },
          {
            "en": "bottomed out at...",
            "note": "在...探底企稳"
          },
          {
            "en": "plummeted to an all-time low",
            "note": "跌入历史低点"
          }
        ]
      },
      {
        "category": "反弹与恢复",
        "words": [
          {
            "en": "recovered to...",
            "note": "恢复至..."
          },
          {
            "en": "rebounded strongly",
            "note": "强劲反弹"
          },
          {
            "en": "bounced back to...",
            "note": "回升至..."
          }
        ]
      }
    ],
    "stepsGuide": {
      "step1": "1. 识别关系：2010年7万 ➔ 2012年冲顶9.5万 ➔ 2015年暴跌谷底4万 ➔ 2018年反弹到6.5万 ➔ 2020年回到9万高位。",
      "step2": "2. 对应功能：冲顶峰值 ➔ 暴跌谷底 ➔ 持续回升 ➔ 终点结算 ➔ 宏观波动概括。",
      "step3": "3. 提取骨架：peak 作动词必须加 at (peaked at 95,000)；作名词必须加 of (reached a peak of 95,000)。严禁写 peak to。",
      "step4": "4. 填入数据：注意单位是 thousand units，写成 95,000 或 95 thousand。"
    }
  },
  "task1-group-09": {
    "chartType": "bar_grouped",
    "chartTitle": "四国通勤方式结构对比 (Commuting Patterns in 4 Countries)",
    "unit": "%",
    "chartData": {
      "categories": [
        "甲国 (Country A)",
        "乙国 (Country B)",
        "丙国 (Country C)",
        "丁国 (Country D)"
      ],
      "series": [
        {
          "name": "驾车 (Car)",
          "color": "#e76f51",
          "values": [
            70,
            65,
            30,
            25
          ]
        },
        {
          "name": "公共交通 (Public Transport)",
          "color": "#2a9d8f",
          "values": [
            20,
            25,
            55,
            60
          ]
        }
      ]
    },
    "relations": [
      {
        "qNumber": 41,
        "type": "comparison",
        "badge": "甲国驾车为主 · was higher",
        "trigger": "看到甲国驾车 70% vs 公交 20%",
        "funcIntent": "单国内部悬殊对比",
        "targets": [
          "甲国 (Country A) 驾车 (Car)"
        ],
        "skeleton": "In Country A, car usage was significantly higher than public transport, at 70% compared with 20%.",
        "demo": "In Country A, car usage was significantly higher than public transport, at 70% compared with 20%."
      },
      {
        "qNumber": 42,
        "type": "pattern_similarity",
        "badge": "乙国模式相似 · recorded similar pattern",
        "trigger": "看到乙国 65% vs 25% 类似甲国",
        "funcIntent": "模式相似性归类",
        "targets": [
          "乙国 (Country B) 驾车 (Car)"
        ],
        "skeleton": "Country B showed a similar distribution, with 65% driving to work.",
        "demo": "Country B showed a similar pattern, with 65% of commuters driving to work."
      },
      {
        "qNumber": 43,
        "type": "contrast",
        "badge": "丙丁两国截然相反 · in sharp contrast",
        "trigger": "看到丙国公交 55%、丁国公交 60% 占据主导",
        "funcIntent": "群组反差对比",
        "targets": [
          "丙国 (Country C)",
          "丁国 (Country D)"
        ],
        "skeleton": "In sharp contrast, public transit was the dominant mode in Countries C and D.",
        "demo": "In sharp contrast, public transport was the dominant mode in Countries C and D."
      },
      {
        "qNumber": 44,
        "type": "highest_ranking",
        "badge": "最高公交率 · had the highest reliance",
        "trigger": "看到丁国公交 60% 全场最高",
        "funcIntent": "横向顺位极值",
        "targets": [
          "丁国 (Country D) 公共交通 (Public Transport)"
        ],
        "skeleton": "Country D recorded the highest reliance on public transport, at 60%.",
        "demo": "Country D recorded the highest reliance on public transport, at 60%."
      },
      {
        "qNumber": 45,
        "type": "residual",
        "badge": "其余为步行或骑车 · the remainder",
        "trigger": "看到其余比例由步行/骑车构成",
        "funcIntent": "剩余项归纳",
        "targets": [
          "甲国 (Country A)",
          "乙国 (Country B)"
        ],
        "skeleton": "The remaining commuters in all four nations walked or cycled.",
        "demo": "The remaining proportions were made up of walking or cycling."
      }
    ],
    "synonymGroups": [
      {
        "category": "静态比较动词",
        "words": [
          {
            "en": "was higher than...",
            "note": "高于（静态严禁写 increased）"
          },
          {
            "en": "was the dominant mode",
            "note": "是主导方式"
          },
          {
            "en": "showed a similar pattern",
            "note": "呈现相似模式"
          },
          {
            "en": "in sharp contrast to...",
            "note": "与...形成鲜明对比"
          }
        ]
      },
      {
        "category": "剩余项与补充",
        "words": [
          {
            "en": "the remainder",
            "note": "剩余部分"
          },
          {
            "en": "the remaining proportion",
            "note": "剩余比例"
          },
          {
            "en": "accounted for the rest",
            "note": "占据了其余份额"
          }
        ]
      }
    ],
    "stepsGuide": {
      "step1": "1. 识别关系：甲乙两组驾车占绝对主导 (70%/65%)；丙丁两组反过来，公交占主导 (55%/60%)；两两成鲜明对比。",
      "step2": "2. 对应功能：单国比较 ➔ 相似组归并 ➔ 鲜明反差对比 ➔ 单项极值 ➔ 剩余项交代。",
      "step3": "3. 提取骨架：静态图绝对不能写 increase 或 decrease！用 was higher、dominated、accounted for。",
      "step4": "4. 填入数据：把 4 国分为甲乙 vs 丙丁两个大组进行对比呈现。"
    }
  },
  "task1-group-10": {
    "chartType": "bar",
    "chartTitle": "不同年龄段人群网购普及率 (Online Shopping by Age Group)",
    "unit": "%",
    "chartData": [
      {
        "label": "16–24 岁",
        "value": 78,
        "unit": "%",
        "color": "#457b9d"
      },
      {
        "label": "25–44 岁",
        "value": 85,
        "unit": "%",
        "color": "#2a9d8f",
        "note": "最活跃网购群体 (Peak)"
      },
      {
        "label": "45–64 岁",
        "value": 56,
        "unit": "%",
        "color": "#f4a261"
      },
      {
        "label": "65 岁以上",
        "value": 22,
        "unit": "%",
        "color": "#e76f51",
        "note": "渗透率最低 (Lowest)"
      }
    ],
    "relations": [
      {
        "qNumber": 46,
        "type": "peak_group",
        "badge": "最热衷群体 · highest percentage",
        "trigger": "看到 25–44 岁 85% 居首",
        "funcIntent": "最高年龄段极值陈述",
        "targets": [
          "25–44 岁"
        ],
        "skeleton": "People aged 25–44 were the most active online shoppers, at 85%.",
        "demo": "People aged 25–44 were the most active online shoppers, at 85%."
      },
      {
        "qNumber": 47,
        "type": "young_group",
        "badge": "年轻群体紧随其后 · followed by",
        "trigger": "看到 16–24 岁 78% 紧随其后",
        "funcIntent": "第二梯队紧随描述",
        "targets": [
          "16–24 岁"
        ],
        "skeleton": "This was followed closely by the 16–24 age group, at 78%.",
        "demo": "This was followed closely by the 16–24 age group, with 78% buying online."
      },
      {
        "qNumber": 48,
        "type": "middle_group",
        "badge": "中年段过半 · just over half",
        "trigger": "看到 45–64 岁 56%",
        "funcIntent": "中位区间量化",
        "targets": [
          "45–64 岁"
        ],
        "skeleton": "Just over half of those aged 45–64 shopped via the internet.",
        "demo": "Just over half of those aged 45–64 shopped via the internet, at 56%."
      },
      {
        "qNumber": 49,
        "type": "lowest_group",
        "badge": "老年段垫底 · lowest rate",
        "trigger": "看到 65岁以上仅 22%",
        "funcIntent": "极低值群体陈述",
        "targets": [
          "65 岁以上"
        ],
        "skeleton": "By comparison, the lowest rate was recorded among seniors, at just 22%.",
        "demo": "By comparison, the lowest figure was seen among those aged 65 and over, at 22%."
      },
      {
        "qNumber": 50,
        "type": "age_correlation",
        "badge": "总体反比关系 · inverse relationship",
        "trigger": "看到整体年龄越大网购率越低",
        "funcIntent": "宏观趋势与相关性总结",
        "targets": [
          "25–44 岁",
          "65 岁以上"
        ],
        "skeleton": "Overall, online shopping rates declined steadily with advancing age beyond 44.",
        "demo": "Overall, participation in online shopping showed a clear downward trend across older age brackets."
      }
    ],
    "synonymGroups": [
      {
        "category": "年龄段主谓搭配",
        "words": [
          {
            "en": "people aged 25–44 [were]",
            "note": "复数主语，谓语用 were"
          },
          {
            "en": "the 25–44 age group [was]",
            "note": "单数主语，谓语用 was"
          },
          {
            "en": "those aged 65 and over",
            "note": "65岁以上人群"
          },
          {
            "en": "seniors / the elderly",
            "note": "老年群体"
          }
        ]
      },
      {
        "category": "参与率与顺位",
        "words": [
          {
            "en": "were the most active",
            "note": "最为活跃"
          },
          {
            "en": "followed closely by...",
            "note": "紧随其后"
          },
          {
            "en": "the lowest rate was recorded among...",
            "note": "在...中录得最低比例"
          }
        ]
      }
    ],
    "stepsGuide": {
      "step1": "1. 识别关系：25–44岁(85%)最多；16–24岁(78%)次之；45–64岁(56%)刚过半；65岁以上(22%)断崖式偏低。",
      "step2": "2. 对应功能：极高值 ➔ 次高梯队 ➔ 中位段 ➔ 极低垫底 ➔ 年龄负相关归纳。",
      "step3": "3. 提取骨架：语法高频雷区：the 25–44 age group 谓语必须是单数 was；people aged 25–44 谓语必须是复数 were！",
      "step4": "4. 填入数据：精准引用各年龄段百分比并附带学术修饰语。"
    }
  },
  "task1-group-11": {
    "chartType": "dual_pie",
    "chartTitle": "城市 X 与 城市 Y 财政预算分配对比 (Budget Allocations: City X vs City Y)",
    "unit": "%",
    "chartData": {
      "pieA": {
        "title": "城市 X (City X)",
        "data": [
          {
            "label": "教育 (Education)",
            "value": 40,
            "color": "#2a9d8f"
          },
          {
            "label": "医疗 (Healthcare)",
            "value": 25,
            "color": "#e76f51"
          },
          {
            "label": "交通 (Transport)",
            "value": 20,
            "color": "#457b9d"
          },
          {
            "label": "其他 (Other)",
            "value": 15,
            "color": "#e9c46a"
          }
        ]
      },
      "pieB": {
        "title": "城市 Y (City Y)",
        "data": [
          {
            "label": "医疗 (Healthcare)",
            "value": 35,
            "color": "#e76f51"
          },
          {
            "label": "交通 (Transport)",
            "value": 30,
            "color": "#457b9d"
          },
          {
            "label": "教育 (Education)",
            "value": 25,
            "color": "#2a9d8f"
          },
          {
            "label": "其他 (Other)",
            "value": 10,
            "color": "#e9c46a"
          }
        ]
      }
    },
    "relations": [
      {
        "qNumber": 51,
        "type": "city_x_priority",
        "badge": "城市X侧重教育 · prioritised education",
        "trigger": "看到城市X教育 40% 居首",
        "funcIntent": "单城最大预算项陈述",
        "targets": [
          "城市 X (City X) 教育 (Education)"
        ],
        "skeleton": "City X allocated the largest portion of its budget to education, at 40%.",
        "demo": "City X allocated the largest portion of its budget to education, at 40%."
      },
      {
        "qNumber": 52,
        "type": "city_y_contrast",
        "badge": "城市Y侧重医疗 · prioritised healthcare",
        "trigger": "看到城市Y医疗 35% 居首",
        "funcIntent": "另一城市差异首选",
        "targets": [
          "城市 Y (City Y) 医疗 (Healthcare)"
        ],
        "skeleton": "In contrast, healthcare was the top priority for City Y, receiving 35%.",
        "demo": "In contrast, healthcare was the top priority for City Y, receiving 35% of total funding."
      },
      {
        "qNumber": 53,
        "type": "transport_diff",
        "badge": "交通预算差值 · 10 points higher",
        "trigger": "看到城市Y交通 30% vs 城市X 20%",
        "funcIntent": "跨城单项差值对比",
        "targets": [
          "城市 Y (City Y) 交通 (Transport)",
          "城市 X (City X) 交通 (Transport)"
        ],
        "skeleton": "City Y dedicated 30% of funds to transport, 10 percentage points higher than City X.",
        "demo": "City Y dedicated 30% of funds to transport, 10 percentage points higher than City X."
      },
      {
        "qNumber": 54,
        "type": "education_gap",
        "badge": "教育份额对比 · 40% vs 25%",
        "trigger": "看到城市X教育 40% vs 城市Y 25%",
        "funcIntent": "反向差值对比",
        "targets": [
          "城市 X (City X) 教育 (Education)",
          "城市 Y (City Y) 教育 (Education)"
        ],
        "skeleton": "The proportion spent on education in City X was notably greater than that in City Y.",
        "demo": "The proportion spent on education in City X was notably greater than that in City Y (40% vs 25%)."
      },
      {
        "qNumber": 55,
        "type": "other_sector",
        "badge": "其他支出最小 · smallest share",
        "trigger": "看到两市其他项均最低 (15% vs 10%)",
        "funcIntent": "双城共有特征归纳",
        "targets": [
          "城市 X (City X) 其他 (Other)",
          "城市 Y (City Y) 其他 (Other)"
        ],
        "skeleton": "In both cities, other services received the smallest budget allocation.",
        "demo": "In both municipalities, miscellaneous sectors accounted for the smallest share of spending."
      }
    ],
    "synonymGroups": [
      {
        "category": "财政分配动词",
        "words": [
          {
            "en": "allocated [N]% to...",
            "note": "把...%预算划拨给"
          },
          {
            "en": "dedicated [N]% of funds to...",
            "note": "将...%资金专项用于"
          },
          {
            "en": "prioritised...",
            "note": "重点优先考虑"
          },
          {
            "en": "budget allocation",
            "note": "预算划拨"
          }
        ]
      },
      {
        "category": "跨城对比代词",
        "words": [
          {
            "en": "greater than that in City Y",
            "note": "高于城市Y的相应比例（that 代替 proportion）"
          },
          {
            "en": "in both municipalities",
            "note": "在两个城市中"
          },
          {
            "en": "the top priority",
            "note": "头号优先事项"
          }
        ]
      }
    ],
    "stepsGuide": {
      "step1": "1. 识别关系：城市X教育(40%)独大；城市Y医疗(35%)与交通(30%)靠前；跨城看：X的教育比Y高15个点，Y的交通比X高10个点；其他项都是最低。",
      "step2": "2. 对应功能：各自极值 ➔ 核心科目交叉对比 ➔ 共同点提炼。",
      "step3": "3. 提取骨架：切忌主观脑补“因为X更重视学生”，必须死扣数据：allocated the largest portion / prioritised。",
      "step4": "4. 填入数据：注意单复数与比较代词 that in City Y。"
    }
  },
  "task1-group-12": {
    "chartType": "bar_grouped",
    "chartTitle": "五门学科男女在读人数对比 (Course Enrolment by Gender)",
    "unit": "人",
    "chartData": {
      "categories": [
        "工程 (Engineering)",
        "护理 (Nursing)",
        "商业 (Business)",
        "艺术 (Art)",
        "科学 (Science)"
      ],
      "series": [
        {
          "name": "男 (Male)",
          "color": "#457b9d",
          "values": [
            80,
            15,
            55,
            35,
            60
          ]
        },
        {
          "name": "女 (Female)",
          "color": "#e76f51",
          "values": [
            20,
            85,
            50,
            60,
            45
          ]
        }
      ]
    },
    "relations": [
      {
        "qNumber": 56,
        "type": "outnumber_male",
        "badge": "男生远超女生 · men outnumbered women",
        "trigger": "看到工程男 80 vs 女 20",
        "funcIntent": "及物动词 outnumber 极值表述",
        "targets": [
          "工程 (Engineering) 男 (Male)"
        ],
        "skeleton": "Men vastly outnumbered women in engineering, at 80 compared with 20.",
        "demo": "Men vastly outnumbered women in engineering, at 80 compared with 20."
      },
      {
        "qNumber": 57,
        "type": "outnumber_female",
        "badge": "女生反超居首 · female students dominated",
        "trigger": "看到护理女 85 vs 男 15",
        "funcIntent": "反向科目极大差距陈述",
        "targets": [
          "护理 (Nursing) 女 (Female)"
        ],
        "skeleton": "Female students dominated nursing, outnumbering males by 70.",
        "demo": "Female students dominated nursing, with 85 women enrolled compared with just 15 men."
      },
      {
        "qNumber": 58,
        "type": "balanced_course",
        "badge": "男女比例均衡 · fairly balanced",
        "trigger": "看到商业男 55 vs 女 50",
        "funcIntent": "均衡科目描述",
        "targets": [
          "商业 (Business)"
        ],
        "skeleton": "Business showed a fairly balanced gender ratio (55 men and 50 women).",
        "demo": "Enrolment in business was fairly balanced, with 55 males and 50 females."
      },
      {
        "qNumber": 59,
        "type": "art_female",
        "badge": "艺术女生较多 · higher female share",
        "trigger": "看到艺术女 60 vs 男 35",
        "funcIntent": "中等差距顺位",
        "targets": [
          "艺术 (Art) 女 (Female)"
        ],
        "skeleton": "In art, women accounted for a noticeably higher headcount than men.",
        "demo": "In art courses, female attendees outnumbered males by 25 (60 vs 35)."
      },
      {
        "qNumber": 60,
        "type": "science_male",
        "badge": "科学男生占优 · male bias",
        "trigger": "看到科学男 60 vs 女 45",
        "funcIntent": "适度优势科目",
        "targets": [
          "科学 (Science) 男 (Male)"
        ],
        "skeleton": "Science also attracted more male students, at 60 compared with 45 females.",
        "demo": "Science also attracted more male students, at 60 compared with 45 females."
      }
    ],
    "synonymGroups": [
      {
        "category": "outnumber 核心及物句型",
        "words": [
          {
            "en": "men outnumbered women",
            "note": "男性人数超过女性（outnumber 直接跟宾语）"
          },
          {
            "en": "females outnumbered males by [N]",
            "note": "女性超过男性...人"
          },
          {
            "en": "严禁错误写成: the number of men outnumbered",
            "note": "逻辑主语必须是人，不能是数字"
          }
        ]
      },
      {
        "category": "平衡与优势",
        "words": [
          {
            "en": "fairly balanced",
            "note": "相当平衡"
          },
          {
            "en": "dominated the subject",
            "note": "在该学科占主导"
          },
          {
            "en": "headcount",
            "note": "人数/人头数"
          }
        ]
      }
    ],
    "stepsGuide": {
      "step1": "1. 识别关系：工程(男80女20)与科学(男60女45)偏男；护理(女85男15)与艺术(女60男35)偏女；商业(男55女50)极其平衡。",
      "step2": "2. 对应功能：男多女少 ➔ 女多男少 ➔ 比例持平 ➔ 优势程度修饰。",
      "step3": "3. 提取骨架：绝对不要写 the number of men outnumbered women！必须是人作主语：men outnumbered women。",
      "step4": "4. 填入数据：核对各科人数，单位为人。"
    }
  },
  "task1-group-13": {
    "chartType": "line",
    "chartTitle": "多趋势动态宏观走势图 (Dynamic Trends Overview)",
    "unit": "index",
    "chartData": {
      "xLabels": [
        "期初 (Start)",
        "中期 (Mid)",
        "期末 (End)"
      ],
      "yUnit": "pts",
      "yMin": 0,
      "yMax": 100,
      "series": [
        {
          "label": "指标 A (持续上升)",
          "color": "#2a9d8f",
          "points": [
            20,
            50,
            85
          ]
        },
        {
          "label": "指标 B (持续下降)",
          "color": "#e76f51",
          "points": [
            80,
            45,
            15
          ]
        },
        {
          "label": "指标 C (先升后降)",
          "color": "#f4a261",
          "points": [
            30,
            70,
            35
          ]
        }
      ]
    },
    "relations": [
      {
        "qNumber": 61,
        "type": "overall_trend_a",
        "badge": "总体上行 · showed an upward trend",
        "trigger": "看到 A 持续走高",
        "funcIntent": "主项总体上行概述",
        "targets": [
          "指标 A (持续上升)"
        ],
        "skeleton": "Overall, Indicator A experienced a steady upward trend over the period.",
        "demo": "Overall, Indicator A experienced a steady upward trend over the period."
      },
      {
        "qNumber": 62,
        "type": "overall_trend_b",
        "badge": "总体下行 · downward trajectory",
        "trigger": "看到 B 持续下滑",
        "funcIntent": "次项下行定调",
        "targets": [
          "指标 B (持续下降)"
        ],
        "skeleton": "Conversely, Indicator B followed a marked downward trajectory.",
        "demo": "Conversely, Indicator B followed a marked downward trajectory throughout."
      },
      {
        "qNumber": 63,
        "type": "rise_and_fall",
        "badge": "先升后降 · rose and then fell",
        "trigger": "看到 C 中期冲高后期回落",
        "funcIntent": "非单调趋势提炼",
        "targets": [
          "指标 C (先升后降)"
        ],
        "skeleton": "Indicator C rose initially before falling back towards its starting level.",
        "demo": "Indicator C rose initially before falling back towards its starting level."
      },
      {
        "qNumber": 64,
        "type": "endpoint_extremes",
        "badge": "期末极值概括 · highest and lowest",
        "trigger": "看到期末 A 最高、B 最低",
        "funcIntent": "终点极值对比概括",
        "targets": [
          "指标 A (持续上升)",
          "指标 B (持续下降)"
        ],
        "skeleton": "By the end of the timeframe, A had become the highest while B was the lowest.",
        "demo": "By the end of the timeframe, A had become the highest while B was the lowest."
      },
      {
        "qNumber": 65,
        "type": "overview_synthesis",
        "badge": "两极分化总结 · divergent trends",
        "trigger": "看到全图分化走势",
        "funcIntent": "宏观 1–2 句高度概括",
        "targets": [
          "指标 A (持续上升)",
          "指标 B (持续下降)"
        ],
        "skeleton": "Overall, the three indicators exhibited contrasting trends across the period.",
        "demo": "Overall, the three indicators exhibited contrasting trends, with A overtaking B."
      }
    ],
    "synonymGroups": [
      {
        "category": "Overview 核心连接词",
        "words": [
          {
            "en": "Overall, ...",
            "note": "雅思最标准总述开头句（必须加逗号）"
          },
          {
            "en": "exhibited contrasting trends",
            "note": "呈现鲜明反差趋势"
          },
          {
            "en": "experienced an upward trajectory",
            "note": "呈现上行轨迹"
          },
          {
            "en": "Conversely, ...",
            "note": "相反地"
          }
        ]
      },
      {
        "category": "禁忌提醒",
        "words": [
          {
            "en": "严禁在 Overview 罗列具体琐碎数字",
            "note": "Overview 只写宏观趋势与极值，不塞数字"
          },
          {
            "en": "不要把 5 句全塞进同一篇作文",
            "note": "考试时精选 1–2 句最能概括全貌的句子即可"
          }
        ]
      }
    ],
    "stepsGuide": {
      "step1": "1. 识别关系：A一路高歌猛进；B一路跌入谷底；C中间冲高最后回落；期末A最高B最低。",
      "step2": "2. 对应功能：Overview 宏观定调 ➔ 严禁罗列具体数字！",
      "step3": "3. 提取骨架：使用 Overall, it is clear that... 搭配 upward / downward trajectory。",
      "step4": "4. 填入数据：只写趋势方向与极值主体，把具体数值留给 Body 段落。"
    }
  },
  "task1-group-14": {
    "chartType": "table",
    "chartTitle": "六类产品在四国销量模式矩阵 (Static Matrix Overview)",
    "unit": "sales index",
    "chartData": [
      {
        "label": "电子产品 (Electronics)",
        "value": "全场最高 (Highest in all 4)",
        "note": "四国均居榜首 · Dominant category"
      },
      {
        "label": "服装服饰 (Clothing)",
        "value": "中高水平 (High)",
        "note": "甲国与乙国需求巨大"
      },
      {
        "label": "家用电器 (Appliances)",
        "value": "中等规模 (Moderate)",
        "note": "各国表现较为平均"
      },
      {
        "label": "体育用品 (Sports)",
        "value": "中低水平 (Lower-mid)",
        "note": "丙国与丁国偏好更高"
      },
      {
        "label": "化妆护肤 (Cosmetics)",
        "value": "较低份额 (Low)",
        "note": "仅少数群体消费"
      },
      {
        "label": "纸质书籍 (Books)",
        "value": "全场垫底 (Lowest across all)",
        "note": "四国均处最低水平"
      }
    ],
    "relations": [
      {
        "qNumber": 66,
        "type": "highest_all",
        "badge": "全场最高品类 · dominated all markets",
        "trigger": "看到电子产品四国全部最高",
        "funcIntent": "全局绝对第一品类提炼",
        "targets": [
          "电子产品 (Electronics)"
        ],
        "skeleton": "Overall, electronics was the most widely purchased category across all four nations.",
        "demo": "Overall, electronics was the most widely purchased category across all four nations."
      },
      {
        "qNumber": 67,
        "type": "lowest_all",
        "badge": "全场垫底品类 · lowest sales figures",
        "trigger": "看到纸质书籍四国全部最低",
        "funcIntent": "全局绝对最低品类提炼",
        "targets": [
          "纸质书籍 (Books)"
        ],
        "skeleton": "In contrast, books consistently generated the lowest sales figures in all countries.",
        "demo": "In contrast, books consistently generated the lowest sales figures in all countries."
      },
      {
        "qNumber": 68,
        "type": "grouping_pattern",
        "badge": "国家分组相似性 · similar consumer patterns",
        "trigger": "看到甲乙结构类似、丙丁类似",
        "funcIntent": "静态横向聚类特征",
        "targets": [
          "服装服饰 (Clothing)",
          "体育用品 (Sports)"
        ],
        "skeleton": "Countries A and B displayed broadly similar purchasing habits.",
        "demo": "Countries A and B displayed broadly similar purchasing habits, as did C and D."
      },
      {
        "qNumber": 69,
        "type": "broad_range",
        "badge": "极值跨度悬殊 · marked disparity",
        "trigger": "看到最高与最低品类悬殊",
        "funcIntent": "品类层级两极分化",
        "targets": [
          "电子产品 (Electronics)",
          "纸质书籍 (Books)"
        ],
        "skeleton": "There was a marked disparity between high-demand items and books.",
        "demo": "There was a marked disparity between tech products and traditional media."
      },
      {
        "qNumber": 70,
        "type": "overview_summary",
        "badge": "静态概括典范 · summary sentence",
        "trigger": "看到整张表格核心结构",
        "funcIntent": "总览句精要输出",
        "targets": [
          "电子产品 (Electronics)",
          "纸质书籍 (Books)"
        ],
        "skeleton": "In summary, while electronic devices were universally favoured, books remained the least popular.",
        "demo": "In summary, while electronic goods were universally favoured, books remained the least popular across the board."
      }
    ],
    "synonymGroups": [
      {
        "category": "静态 Overview 提炼词",
        "words": [
          {
            "en": "across all four nations",
            "note": "在全部四个国家中"
          },
          {
            "en": "universally favoured",
            "note": "受到普遍青睐"
          },
          {
            "en": "consistently generated the lowest",
            "note": "始终录得最低"
          },
          {
            "en": "across the board",
            "note": "全盘地/总体上"
          }
        ]
      },
      {
        "category": "聚类与归并",
        "words": [
          {
            "en": "displayed broadly similar habits",
            "note": "表现出大致相似的习惯"
          },
          {
            "en": "marked disparity",
            "note": "显著差距"
          }
        ]
      }
    ],
    "stepsGuide": {
      "step1": "1. 识别关系：电子产品在所有4国全部夺冠；书籍在所有4国全部垫底；甲乙偏重服装，丙丁偏重体育。",
      "step2": "2. 对应功能：静态图 Overview 不需要流水账复述，提炼最强、最弱和聚类模式即可！",
      "step3": "3. 提取骨架：while X was universally favoured, Y remained the least popular across the board。",
      "step4": "4. 检查：确保没有塞入任何琐碎具体金额数字。"
    }
  },
  "task1-group-15": {
    "chartType": "mixed",
    "chartTitle": "游客总量与客源构成混合图 (Tourist Volume & Visitor Split)",
    "unit": "mixed",
    "chartData": {
      "partA": {
        "title": "图 1：2000–2020 游客总人数走势 (柱图)",
        "type": "bar",
        "data": [
          {
            "label": "2000年",
            "value": 5,
            "unit": "million",
            "color": "#457b9d"
          },
          {
            "label": "2010年",
            "value": 9,
            "unit": "million",
            "color": "#2a9d8f"
          },
          {
            "label": "2020年",
            "value": 15,
            "unit": "million",
            "color": "#e76f51"
          }
        ]
      },
      "partB": {
        "title": "图 2：2020 年游客目的构成 (饼图)",
        "data": [
          {
            "label": "休闲度假 (Leisure)",
            "value": 72,
            "color": "#2a9d8f"
          },
          {
            "label": "商务差旅 (Business)",
            "value": 28,
            "color": "#f4a261"
          }
        ]
      }
    },
    "relations": [
      {
        "qNumber": 71,
        "type": "chart1_trend",
        "badge": "图1趋势 · steady growth",
        "trigger": "看到柱图 500万 -> 1500万三连涨",
        "funcIntent": "混合图图一趋势概述",
        "targets": [
          "图 1：2000–2020 游客总人数走势 (柱图)"
        ],
        "skeleton": "Overall, the total volume of visitors grew substantially over the 20-year period.",
        "demo": "Overall, total visitor numbers grew substantially over the 20-year period."
      },
      {
        "qNumber": 72,
        "type": "chart2_split",
        "badge": "图2结构 · leisure dominated",
        "trigger": "看到饼图休闲客 72% 占绝大多数",
        "funcIntent": "混合图图二结构概述",
        "targets": [
          "图 2：2020 年游客目的构成 (饼图)"
        ],
        "skeleton": "In terms of purpose, leisure travellers made up the vast majority.",
        "demo": "In terms of purpose, leisure travelers made up the vast majority of visitors."
      },
      {
        "qNumber": 73,
        "type": "combined_overview",
        "badge": "双图合壁 Overview · combined",
        "trigger": "将图1总量增长与图2休闲主导合成一句",
        "funcIntent": "双图合壁标杆 Overview 句子",
        "targets": [
          "图 1：2000–2020 游客总人数走势 (柱图)",
          "图 2：2020 年游客目的构成 (饼图)"
        ],
        "skeleton": "Overall, while total visitor numbers climbed steadily, leisure tourists consistently formed the largest segment.",
        "demo": "Overall, while total visitor numbers climbed steadily, leisure tourists consistently formed the largest segment."
      },
      {
        "qNumber": 74,
        "type": "correlation_caution",
        "badge": "严谨客观描述 · objective linkage",
        "trigger": "两图关联必须忠实于数据",
        "funcIntent": "数据关联严谨性限定",
        "targets": [
          "图 2：2020 年游客目的构成 (饼图)"
        ],
        "skeleton": "The growth in tourism was accompanied by a predominant share of holidaymakers.",
        "demo": "The expansion in tourism was characterized by a heavy reliance on vacationers."
      },
      {
        "qNumber": 75,
        "type": "business_minority",
        "badge": "次要群体交代 · minority share",
        "trigger": "看到商务差旅仅 28%",
        "funcIntent": "次要构成概括",
        "targets": [
          "图 2：2020 年游客目的构成 (饼图)"
        ],
        "skeleton": "Business travelers represented a much smaller minority throughout.",
        "demo": "Business travelers represented a much smaller minority throughout."
      }
    ],
    "synonymGroups": [
      {
        "category": "混合图 Overview 连词",
        "words": [
          {
            "en": "while [Chart 1], [Chart 2]",
            "note": "一句话打通两幅图的标准让步复合句"
          },
          {
            "en": "in terms of [category]",
            "note": "在...方面"
          },
          {
            "en": "made up the vast majority",
            "note": "占据了绝大多数"
          }
        ]
      },
      {
        "category": "游客表达多态性",
        "words": [
          {
            "en": "visitor numbers / arrivals",
            "note": "游客人次/抵境人数"
          },
          {
            "en": "holidaymakers / vacationers",
            "note": "度假者/休闲客"
          },
          {
            "en": "business travelers",
            "note": "商务旅客"
          }
        ]
      }
    ],
    "stepsGuide": {
      "step1": "1. 识别关系：图1总量持续翻倍增长 (500万➔1500万)；图2休闲客 (72%) 远远多于商务客 (28%)。",
      "step2": "2. 对应功能：混合图的 Overview 必须【同时覆盖两幅图】！严禁只写其中一幅！",
      "step3": "3. 提取骨架：while total visitor numbers climbed steadily, leisure travelers formed the dominant share。",
      "step4": "4. 检查：两图结合，语言紧凑，无冗余细节数字。"
    }
  },
  "task1-group-16": {
    "chartType": "line",
    "chartTitle": "特征筛选与宏观/细节区分图 (Overview vs Detail Filter)",
    "unit": "students",
    "chartData": {
      "xLabels": [
        "2008",
        "2012",
        "2016",
        "2020"
      ],
      "yUnit": "people",
      "yMin": 0,
      "yMax": 3000,
      "series": [
        {
          "label": "学生总人数 (Total)",
          "color": "#2a9d8f",
          "points": [
            1800,
            2200,
            2600,
            2900
          ]
        },
        {
          "label": "女生人数 (Female)",
          "color": "#e76f51",
          "points": [
            800,
            1150,
            1450,
            1650
          ]
        },
        {
          "label": "男生人数 (Male)",
          "color": "#457b9d",
          "points": [
            1000,
            1240,
            1150,
            1250
          ]
        },
        {
          "label": "国际生 (International)",
          "color": "#e9c46a",
          "points": [
            200,
            250,
            300,
            350
          ]
        }
      ]
    },
    "relations": [
      {
        "qNumber": 76,
        "type": "macro_total",
        "badge": "宏观特征 1 · 总数上升 (该写)",
        "trigger": "总数 1800 -> 2900 明显攀升",
        "funcIntent": "宏观总体走势判断",
        "targets": [
          "学生总人数 (Total)"
        ],
        "skeleton": "Overall, total student enrolment rose steadily across the period.",
        "demo": "Overall, total student enrolment rose steadily across the period."
      },
      {
        "qNumber": 77,
        "type": "macro_overtake",
        "badge": "宏观特征 2 · 女生反超男生 (该写)",
        "trigger": "女生中途超越男生",
        "funcIntent": "关键结构性重大变化",
        "targets": [
          "女生人数 (Female)",
          "男生人数 (Male)"
        ],
        "skeleton": "Female students eventually surpassed their male counterparts.",
        "demo": "Female students eventually surpassed their male counterparts in number."
      },
      {
        "qNumber": 78,
        "type": "macro_minority",
        "badge": "宏观特征 3 · 国际生始终是少数 (该写)",
        "trigger": "国际生常年处于底端",
        "funcIntent": "全局持续性状态总结",
        "targets": [
          "国际生 (International)"
        ],
        "skeleton": "International students consistently comprised a small minority.",
        "demo": "Overseas students consistently accounted for only a fraction of the student body."
      },
      {
        "qNumber": 79,
        "type": "detail_filter",
        "badge": "细节孤证 · 2012年男生1240人 (不写进Overview)",
        "trigger": "某一年孤立数字仅属于细节",
        "funcIntent": "细节过滤：留到正文段",
        "targets": [
          "男生人数 (Male)"
        ],
        "skeleton": "[Detail] Male enrolment reached 1,240 in 2012. (Body Paragraph only)",
        "demo": "In 2012, male enrolment stood at 1,240 before levelling off."
      },
      {
        "qNumber": 80,
        "type": "filter_rule",
        "badge": "核心判准 · Overview价值在于筛选",
        "trigger": "辨析 Overview 与 Body 职责",
        "funcIntent": "元认知法则掌握",
        "targets": [
          "学生总人数 (Total)"
        ],
        "skeleton": "An Overview should prioritize broad trends and structural shifts over isolated figures.",
        "demo": "An Overview should prioritize broad trends and structural shifts over isolated figures."
      }
    ],
    "synonymGroups": [
      {
        "category": "Overview 核心准则",
        "words": [
          {
            "en": "broad trends",
            "note": "宏观趋势（Overview 核心）"
          },
          {
            "en": "structural shifts",
            "note": "结构性逆转/反超（Overview 重点）"
          },
          {
            "en": "isolated figures",
            "note": "孤立数字（必须留在 Body，禁入 Overview）"
          }
        ]
      },
      {
        "category": "群体与对比代词",
        "words": [
          {
            "en": "their male counterparts",
            "note": "对应的男性同类（高级学术替换）"
          },
          {
            "en": "a fraction of the student body",
            "note": "学生总数的一小部分"
          }
        ]
      }
    ],
    "stepsGuide": {
      "step1": "1. 识别关系：总数上升、女超男、国际生恒少属于三大宏观特征；2012年男1240人只是局部细节。",
      "step2": "2. 对应功能：严防死守——即使数字再精准，不能代表全局走向的细节一律不放进 Overview！",
      "step3": "3. 提取骨架：熟练使用 their male counterparts, fraction of the total。",
      "step4": "4. 检查：Overview 纯粹保留宏观特征。"
    }
  },
  "task1-group-17": {
    "chartType": "map",
    "chartTitle": "小镇三十年规划演变 (Town Redevelopment 1990–2020)",
    "unit": "map",
    "chartData": {
      "periods": [
        {
          "title": "1990 年原貌 (Original 1990)",
          "zones": [
            {
              "label": "北部农田 (Farmland)",
              "en": "Northern farmland",
              "type": "nature",
              "statusBadge": "原貌"
            },
            {
              "label": "中心商业街 (Shops)",
              "en": "Central shopping street",
              "type": "commercial",
              "statusBadge": "保留"
            },
            {
              "label": "东部老工厂 (Factory)",
              "en": "Eastern manufacturing plant",
              "type": "industrial",
              "statusBadge": "待拆除"
            },
            {
              "label": "南部主干道 (Road)",
              "en": "Southern main road",
              "type": "infrastructure",
              "statusBadge": "原道路"
            }
          ]
        },
        {
          "title": "2020 年改造后 (Redeveloped 2020)",
          "zones": [
            {
              "label": "北部住宅区 (Residential)",
              "en": "New housing estate",
              "type": "residential",
              "statusBadge": "新建 (取代农田)"
            },
            {
              "label": "中心商业街 (Shops)",
              "en": "Central shopping street",
              "type": "commercial",
              "statusBadge": "原貌保留"
            },
            {
              "label": "东部城市公园 (Public Park)",
              "en": "Public park & greenery",
              "type": "nature",
              "statusBadge": "改建 (取代工厂)"
            },
            {
              "label": "南部延伸公路 (Extended Road)",
              "en": "Extended highway to south",
              "type": "infrastructure",
              "statusBadge": "向南延伸"
            }
          ]
        }
      ]
    },
    "relations": [
      {
        "qNumber": 81,
        "type": "passive_replace",
        "badge": "农田变住宅 · was replaced by",
        "trigger": "看到北部农田变成了整齐住宅区",
        "funcIntent": "被动语态设施取代",
        "targets": [
          "北部住宅区 (Residential)"
        ],
        "skeleton": "The farmland in the north was replaced by a residential area.",
        "demo": "The farmland in the north was replaced by a residential area."
      },
      {
        "qNumber": 82,
        "type": "passive_demolish",
        "badge": "工厂拆除建公园 · was demolished to make way for",
        "trigger": "看到东部老工厂彻底消失，建了绿地公园",
        "funcIntent": "拆除腾退与新建连缀句",
        "targets": [
          "东部城市公园 (Public Park)"
        ],
        "skeleton": "The factory in the east was demolished to make way for a public park.",
        "demo": "The factory in the east was demolished to make way for a public park."
      },
      {
        "qNumber": 83,
        "type": "passive_extend",
        "badge": "道路向南延伸 · was extended southward",
        "trigger": "看到南面公路拉长贯通",
        "funcIntent": "基础设施线性延伸",
        "targets": [
          "南部延伸公路 (Extended Road)"
        ],
        "skeleton": "The main road was extended further south.",
        "demo": "The main road was extended further south to improve connectivity."
      },
      {
        "qNumber": 84,
        "type": "remain_unchanged",
        "badge": "中心商业街保留 · remained intact",
        "trigger": "看到市中心商店原封未动",
        "funcIntent": "静态保留项肯定表述",
        "targets": [
          "中心商业街 (Shops)"
        ],
        "skeleton": "The shops in the town centre remained largely unchanged.",
        "demo": "The shops in the town centre remained virtually unchanged."
      },
      {
        "qNumber": 85,
        "type": "map_overview",
        "badge": "地图宏观总结 · transformed from industrial to residential",
        "trigger": "看到全镇从工业农业转变为宜居宜游",
        "funcIntent": "地图整体演变 Overview",
        "targets": [
          "北部住宅区 (Residential)",
          "东部城市公园 (Public Park)"
        ],
        "skeleton": "Overall, the town was transformed into a more residential and recreational area.",
        "demo": "Overall, the town was transformed from an agricultural and industrial hub into a residential area."
      }
    ],
    "synonymGroups": [
      {
        "category": "地图改建被动语态核心词",
        "words": [
          {
            "en": "was replaced by...",
            "note": "被...所取代（最通用）"
          },
          {
            "en": "was converted into...",
            "note": "强调用途/属性改变"
          },
          {
            "en": "was demolished to make way for...",
            "note": "被拆除以给...腾出空间"
          },
          {
            "en": "was constructed / erected",
            "note": "被兴建/矗立"
          }
        ]
      },
      {
        "category": "保留与扩建",
        "words": [
          {
            "en": "remained unchanged / intact",
            "note": "保持原样未变"
          },
          {
            "en": "was extended southward",
            "note": "向南延伸"
          },
          {
            "en": "underwent major transformation",
            "note": "经历了重大蜕变"
          }
        ]
      }
    ],
    "stepsGuide": {
      "step1": "1. 识别关系：北边农田变住宅；东边工厂拆了变公园；中心商铺不动；南边公路向南拉长；整体向居住绿化转型。",
      "step2": "2. 对应功能：地图题绝对核心是【被动语态】！主体一般是地块设施，不要无端加 people 或 government！",
      "step3": "3. 提取骨架：was demolished to make way for / was replaced by / remained intact。",
      "step4": "4. 填入数据：带上方块方位词 in the north / in the eastern section。"
    }
  },
  "task1-group-18": {
    "chartType": "map",
    "chartTitle": "市政公园改造前后平面设计对比 (Park Renovation Layout)",
    "unit": "layout",
    "chartData": {
      "periods": [
        {
          "title": "改造前 (Before Renovation)",
          "zones": [
            {
              "label": "南侧主入口 (South Entrance)",
              "en": "Main gate in the south",
              "type": "infrastructure",
              "statusBadge": "保留"
            },
            {
              "label": "中央喷泉 (Central Fountain)",
              "en": "Water fountain in center",
              "type": "nature",
              "statusBadge": "待改建"
            },
            {
              "label": "西侧普通花园 (West Garden)",
              "en": "Small garden on west",
              "type": "nature",
              "statusBadge": "待扩大"
            },
            {
              "label": "东北角空地 (NE Vacant Lot)",
              "en": "Empty corner in northeast",
              "type": "nature",
              "statusBadge": "未利用"
            },
            {
              "label": "环形步道 (Circular Footpath)",
              "en": "Circular walkway",
              "type": "infrastructure",
              "statusBadge": "保留"
            }
          ]
        },
        {
          "title": "改造后 (After Renovation)",
          "zones": [
            {
              "label": "南侧主入口 (South Entrance)",
              "en": "Main gate in the south",
              "type": "infrastructure",
              "statusBadge": "位置保留"
            },
            {
              "label": "中央咖啡馆 (Central Cafe)",
              "en": "Cafe & outdoor seating",
              "type": "commercial",
              "statusBadge": "取代喷泉"
            },
            {
              "label": "西侧扩建大花园 (Enlarged Garden)",
              "en": "Substantially enlarged garden",
              "type": "nature",
              "statusBadge": "规模扩大"
            },
            {
              "label": "东北儿童游乐区 (Children's Play Area)",
              "en": "Playground in NE corner",
              "type": "nature",
              "statusBadge": "全新增设"
            },
            {
              "label": "环形步道 (Circular Footpath)",
              "en": "Circular walkway",
              "type": "infrastructure",
              "statusBadge": "完好保留"
            }
          ]
        }
      ]
    },
    "relations": [
      {
        "qNumber": 86,
        "type": "fountain_to_cafe",
        "badge": "喷泉改咖啡馆 · was replaced with a cafe",
        "trigger": "中央喷泉变成了休闲咖啡馆",
        "funcIntent": "内部设施功能改变",
        "targets": [
          "中央咖啡馆 (Central Cafe)"
        ],
        "skeleton": "The central fountain was replaced by a modern cafe.",
        "demo": "The central fountain was removed and replaced by a cafe."
      },
      {
        "qNumber": 87,
        "type": "garden_enlarged",
        "badge": "花园大幅扩建 · was substantially enlarged",
        "trigger": "西侧花园占地面积扩大一倍",
        "funcIntent": "面积扩增被动式",
        "targets": [
          "西侧扩建大花园 (Enlarged Garden)"
        ],
        "skeleton": "The garden on the western side was substantially expanded.",
        "demo": "The garden situated in the west was substantially expanded."
      },
      {
        "qNumber": 88,
        "type": "corner_addition",
        "badge": "东北角增设游乐区 · in the north-eastern corner",
        "trigger": "东北角空地上建了儿童游乐区",
        "funcIntent": "角落方位精确定位",
        "targets": [
          "东北儿童游乐区 (Children's Play Area)"
        ],
        "skeleton": "A children's playground was constructed in the north-eastern corner.",
        "demo": "A children's play area was introduced in the north-eastern corner of the park."
      },
      {
        "qNumber": 89,
        "type": "entrance_kept",
        "badge": "南入口保留 · remained in its original location",
        "trigger": "南门位置原样不动",
        "funcIntent": "出入口保留描述",
        "targets": [
          "南侧主入口 (South Entrance)"
        ],
        "skeleton": "The entrance remained in the south as before.",
        "demo": "The main entrance remained in the south, retaining its original position."
      },
      {
        "qNumber": 90,
        "type": "pathway_preserved",
        "badge": "环道保留 · was maintained throughout",
        "trigger": "外围环形步道完全保留",
        "funcIntent": "环道与骨架保留",
        "targets": [
          "环形步道 (Circular Footpath)"
        ],
        "skeleton": "The circular footpath encircling the park was preserved.",
        "demo": "The circular footpath encircling the park was preserved."
      }
    ],
    "synonymGroups": [
      {
        "category": "平面图方位介词精析",
        "words": [
          {
            "en": "in the north-eastern corner",
            "note": "在东北角（区域内部角落用 in）"
          },
          {
            "en": "to the north-east of...",
            "note": "在...的东北方（区域外部用 to）"
          },
          {
            "en": "on the western side",
            "note": "在西侧"
          },
          {
            "en": "encircling the park",
            "note": "环绕着整个公园"
          }
        ]
      },
      {
        "category": "改建动词",
        "words": [
          {
            "en": "was substantially expanded",
            "note": "被大幅扩大"
          },
          {
            "en": "was introduced / added",
            "note": "被引入/新增"
          },
          {
            "en": "retained its position",
            "note": "保留原有位置"
          }
        ]
      }
    ],
    "stepsGuide": {
      "step1": "1. 识别关系：中央(喷泉变咖啡馆)；西边(花园扩大)；东北角(建儿童区)；南门与环形步道(完全保留)。",
      "step2": "2. 对应功能：角落定位 (in the corner) ➔ 面积扩增 ➔ 设施更替 ➔ 线性环道保留。",
      "step3": "3. 提取骨架：区分 in the north-eastern corner（内部）与 to the north-east of（外部）。",
      "step4": "4. 检查：地图改动描述逻辑清晰，不丢三落四。"
    }
  },
  "task1-group-19": {
    "chartType": "map",
    "chartTitle": "无人海岛旅游度假区规划演变 (Island Resort Development)",
    "unit": "map",
    "chartData": {
      "periods": [
        {
          "title": "开发前 (Wild Island)",
          "zones": [
            {
              "label": "中央原野树木 (Central Trees)",
              "en": "Natural trees & wilderness",
              "type": "nature",
              "statusBadge": "原始未开辟"
            },
            {
              "label": "东西两侧原生态荒地 (Open Land)",
              "en": "Vacant coastlines",
              "type": "nature",
              "statusBadge": "未开发"
            },
            {
              "label": "南岸天然沙滩 (South Beach)",
              "en": "Pristine beach",
              "type": "nature",
              "statusBadge": "天然沙滩"
            }
          ]
        },
        {
          "title": "开发后 (Tourist Resort)",
          "zones": [
            {
              "label": "中央接待处 (Reception Center)",
              "en": "Main reception building",
              "type": "commercial",
              "statusBadge": "核心建筑"
            },
            {
              "label": "西侧木屋群 (Western Chalets)",
              "en": "Tourist accommodation units",
              "type": "residential",
              "statusBadge": "新建客房"
            },
            {
              "label": "东侧特色客房 (Eastern Cabins)",
              "en": "Additional accommodation",
              "type": "residential",
              "statusBadge": "新建客房"
            },
            {
              "label": "南岸游艇码头 (Pier / Dock)",
              "en": "Pier for boats",
              "type": "infrastructure",
              "statusBadge": "出海码头"
            },
            {
              "label": "连接步道网络 (Footpath Network)",
              "en": "Interconnected footpaths",
              "type": "infrastructure",
              "statusBadge": "全岛贯通"
            }
          ]
        }
      ]
    },
    "relations": [
      {
        "qNumber": 91,
        "type": "reception_center",
        "badge": "中央建接待处 · a reception was constructed",
        "trigger": "看到岛中央建起了接待服务大楼",
        "funcIntent": "核心枢纽建筑兴建",
        "targets": [
          "中央接待处 (Reception Center)"
        ],
        "skeleton": "A reception building was erected in the centre of the island.",
        "demo": "A reception building was erected in the centre of the island."
      },
      {
        "qNumber": 92,
        "type": "flanking_cabins",
        "badge": "东西两侧建住宿 · accommodation flanked on both sides",
        "trigger": "看到东西两侧对称建成了独栋小木屋群",
        "funcIntent": "对称式功能区兴建",
        "targets": [
          "西侧木屋群 (Western Chalets)",
          "东侧特色客房 (Eastern Cabins)"
        ],
        "skeleton": "Accommodation units were constructed to the east and west of the reception.",
        "demo": "Accommodation facilities were built on either side of the reception area."
      },
      {
        "qNumber": 93,
        "type": "south_pier",
        "badge": "南岸建码头 · a pier was built on the south coast",
        "trigger": "看到南面海边新建了长条码头",
        "funcIntent": "水运基础设施建设",
        "targets": [
          "南岸游艇码头 (Pier / Dock)"
        ],
        "skeleton": "A pier was constructed on the southern shore to allow boats to dock.",
        "demo": "A pier was constructed on the southern shore to allow boats to dock."
      },
      {
        "qNumber": 94,
        "type": "interconnecting_paths",
        "badge": "步道连接全岛 · connected by footpaths",
        "trigger": "看到蜿蜒步道把码头、接待处和客房串起来",
        "funcIntent": "动线网络贯通",
        "targets": [
          "连接步道网络 (Footpath Network)"
        ],
        "skeleton": "The facilities were connected by a comprehensive network of footpaths.",
        "demo": "All facilities were interconnected by a newly built network of footpaths."
      },
      {
        "qNumber": 95,
        "type": "island_overview",
        "badge": "海岛综合 Overview · transformed into vacation retreat",
        "trigger": "原始荒岛变为现代化休闲度假村",
        "funcIntent": "海岛巨变宏观概括",
        "targets": [
          "中央接待处 (Reception Center)",
          "西侧木屋群 (Western Chalets)"
        ],
        "skeleton": "Overall, the deserted island was completely converted into a tourist resort while preserving its coastline.",
        "demo": "Overall, the uninhabited island was completely developed into a tourist resort."
      }
    ],
    "synonymGroups": [
      {
        "category": "度假区开发词汇",
        "words": [
          {
            "en": "uninhabited island",
            "note": "无人岛/荒岛"
          },
          {
            "en": "tourist resort",
            "note": "旅游度假区"
          },
          {
            "en": "accommodation units",
            "note": "住宿单元/客房"
          },
          {
            "en": "pier / dock",
            "note": "码头/泊位"
          }
        ]
      },
      {
        "category": "空间连接与方位",
        "words": [
          {
            "en": "on either side of...",
            "note": "在...的两侧"
          },
          {
            "en": "connected by footpaths",
            "note": "由步道连接"
          },
          {
            "en": "on the southern shore",
            "note": "在南侧海岸"
          }
        ]
      }
    ],
    "stepsGuide": {
      "step1": "1. 识别关系：中央建接待处；东西两侧分别建木屋住宿；南岸建码头接纳游客；步道连通全岛；原始海滩被利用。",
      "step2": "2. 对应功能：中心建筑 ➔ 两翼住宿 ➔ 码头门户 ➔ 步道闭环网络 ➔ Overview 宏观度假村定位。",
      "step3": "3. 提取骨架：to the east and west of the reception / interconnected by footpaths。",
      "step4": "4. 检查：地图 Overview 应同时强调主要开发设施与整体用途彻底转换。"
    }
  },
  "task1-group-20": {
    "chartType": "map",
    "chartTitle": "大学校园规划方案对比 (Campus Masterplan: Present vs 2028 Proposed)",
    "unit": "plan",
    "chartData": {
      "periods": [
        {
          "title": "现状 (Current Campus)",
          "zones": [
            {
              "label": "中心图书馆 (Library)",
              "en": "Main Library",
              "type": "commercial",
              "statusBadge": "核心建筑"
            },
            {
              "label": "北部空地 (North Lot)",
              "en": "Vacant space north of library",
              "type": "nature",
              "statusBadge": "待规划"
            },
            {
              "label": "东门及车道 (East Gate & Road)",
              "en": "East gate with vehicle road",
              "type": "infrastructure",
              "statusBadge": "车辆通行"
            },
            {
              "label": "现停车场 (Current Parking)",
              "en": "Central car parking lot",
              "type": "infrastructure",
              "statusBadge": "占地混乱"
            }
          ]
        },
        {
          "title": "2028 规划方案 (Proposed 2028)",
          "zones": [
            {
              "label": "中心图书馆 (Library)",
              "en": "Main Library",
              "type": "commercial",
              "statusBadge": "原样保留"
            },
            {
              "label": "新建实验大楼 (Science Lab)",
              "en": "New science complex north",
              "type": "residential",
              "statusBadge": "拟建新楼"
            },
            {
              "label": "东门关闭及步行区 (Pedestrian Zone)",
              "en": "Pedestrianized central street",
              "type": "infrastructure",
              "statusBadge": "禁车改为步行"
            },
            {
              "label": "迁至西侧新停车场 (Relocated Parking)",
              "en": "Relocated car park on west",
              "type": "infrastructure",
              "statusBadge": "外迁整合"
            }
          ]
        }
      ]
    },
    "relations": [
      {
        "qNumber": 96,
        "type": "future_lab",
        "badge": "北侧规划建实验楼 · is planned to be built",
        "trigger": "看到图书馆北侧标注新建实验楼",
        "funcIntent": "未来拟建计划 (未来被动态)",
        "targets": [
          "新建实验大楼 (Science Lab)"
        ],
        "skeleton": "A new laboratory block is scheduled to be built to the north of the library.",
        "demo": "A new science laboratory is planned to be constructed north of the library."
      },
      {
        "qNumber": 97,
        "type": "relocate_carpark",
        "badge": "停车场迁至西侧 · will be relocated to the west",
        "trigger": "看到现有车位取消，统一迁往西侧",
        "funcIntent": "设施搬迁与整合",
        "targets": [
          "迁至西侧新停车场 (Relocated Parking)"
        ],
        "skeleton": "The car park will be relocated to the western boundary of the campus.",
        "demo": "The existing car park will be moved to the western periphery."
      },
      {
        "qNumber": 98,
        "type": "pedestrianize",
        "badge": "中央道路改为步行区 · will be pedestrianized",
        "trigger": "看到中间车道变成步行林荫道",
        "funcIntent": "步行化功能改造",
        "targets": [
          "东门关闭及步行区 (Pedestrian Zone)"
        ],
        "skeleton": "The central road will be converted into a pedestrian zone.",
        "demo": "The central road will be pedestrianized, banning vehicular traffic."
      },
      {
        "qNumber": 99,
        "type": "gate_closure",
        "badge": "东门关闭 · will be closed permanently",
        "trigger": "看到东大门封堵变封闭绿化",
        "funcIntent": "出入口封锁",
        "targets": [
          "东门关闭及步行区 (Pedestrian Zone)"
        ],
        "skeleton": "The eastern entrance will be permanently closed.",
        "demo": "The eastern gate is set to be closed off to cars."
      },
      {
        "qNumber": 100,
        "type": "target_year",
        "badge": "全盘完工时间 · is scheduled for completion in 2028",
        "trigger": "看到 2028 年目标交工期",
        "funcIntent": "规划完工年限交代",
        "targets": [
          "新建实验大楼 (Science Lab)"
        ],
        "skeleton": "The redevelopment is scheduled to be completed by 2028.",
        "demo": "All redevelopment projects are scheduled for completion in 2028."
      }
    ],
    "synonymGroups": [
      {
        "category": "未来规划核心时态语态",
        "words": [
          {
            "en": "is planned / proposed to be built",
            "note": "计划被建设（现在时态表示既定计划）"
          },
          {
            "en": "will be relocated to...",
            "note": "将被迁移至"
          },
          {
            "en": "will be pedestrianized",
            "note": "将被改为步行区"
          },
          {
            "en": "is scheduled for completion in [Year]",
            "note": "预定于某年完工"
          }
        ]
      },
      {
        "category": "位置与边界",
        "words": [
          {
            "en": "to the north of...",
            "note": "在...以北"
          },
          {
            "en": "on the western periphery",
            "note": "在西侧边缘地带"
          },
          {
            "en": "permanently closed",
            "note": "永久关闭"
          }
        ]
      }
    ],
    "stepsGuide": {
      "step1": "1. 识别关系：北边建实验楼；停车场搬到西侧；东门关闭；主干道改成步行区；2028年完工。",
      "step2": "2. 对应功能：未来规划图时态控制！必须全程使用未来被动或计划句型：will be built / is planned to be constructed。",
      "step3": "3. 提取骨架：is scheduled for completion by 2028 / will be pedestrianized。",
      "step4": "4. 检查：统一时态，不可前后混淆过去时和未来时！"
    }
  },
  "task1-group-21": {
    "chartType": "flow",
    "chartTitle": "咖啡豆全套生产工序流程 (Coffee Bean Production Process)",
    "unit": "steps",
    "chartData": {
      "isCircular": false,
      "steps": [
        {
          "step": 1,
          "label": "人工采摘成熟鲜果",
          "en": "Picking ripe cherries",
          "icon": "🍒",
          "note": "挑选红色成熟果实"
        },
        {
          "step": 2,
          "label": "机械剥离果肉",
          "en": "Pulping & sorting",
          "icon": "⚙️",
          "note": "分离外皮与果肉"
        },
        {
          "step": 3,
          "label": "水槽发酵清洗",
          "en": "Washing & fermenting",
          "icon": "💧",
          "note": "清洗粘液杂质"
        },
        {
          "step": 4,
          "label": "阳光自然晒干",
          "en": "Sun-drying on tables",
          "icon": "☀️",
          "note": "降至目标含水率"
        },
        {
          "step": 5,
          "label": "高温均匀烘焙",
          "en": "Roasting beans",
          "icon": "🔥",
          "note": "豆体膨胀变深棕"
        },
        {
          "step": 6,
          "label": "真空密封包装",
          "en": "Packaging into bags",
          "icon": "📦",
          "note": "贴标装箱外运"
        }
      ]
    },
    "relations": [
      {
        "qNumber": 101,
        "type": "flow_start",
        "badge": "流程起点 · first stage involves",
        "trigger": "看到步骤 1 采摘成熟红果实",
        "funcIntent": "工序起始点陈述",
        "targets": [
          "人工采摘成熟鲜果"
        ],
        "skeleton": "The process begins with the harvesting of ripe coffee cherries.",
        "demo": "The process begins when ripe coffee beans are picked by hand."
      },
      {
        "qNumber": 102,
        "type": "passive_pulping",
        "badge": "去肉清洗 · is removed and washed",
        "trigger": "看到步骤 2 去肉与步骤 3 水洗",
        "funcIntent": "连续被动工序连缀",
        "targets": [
          "机械剥离果肉",
          "水槽发酵清洗"
        ],
        "skeleton": "After the flesh is removed, the beans are washed thoroughly.",
        "demo": "Next, the pulp is stripped away, after which the beans are washed in water."
      },
      {
        "qNumber": 103,
        "type": "drying_stage",
        "badge": "日晒干燥 · dried in the sun",
        "trigger": "看到步骤 4 在日照下晾晒",
        "funcIntent": "自然干燥工序",
        "targets": [
          "阳光自然晒干"
        ],
        "skeleton": "The beans are then spread out to dry in the sun.",
        "demo": "Following this, the cleaned beans are spread out on mats to dry under the sun."
      },
      {
        "qNumber": 104,
        "type": "roasting_stage",
        "badge": "高温烘焙 · roasted at high temperatures",
        "trigger": "看到步骤 5 烘焙机烘烤",
        "funcIntent": "物理加热转换步骤",
        "targets": [
          "高温均匀烘焙"
        ],
        "skeleton": "Once dried, they are roasted at high heat to develop flavor.",
        "demo": "Once completely dry, the green beans are roasted at high temperatures."
      },
      {
        "qNumber": 105,
        "type": "flow_final",
        "badge": "最终包装 · final step entails",
        "trigger": "看到步骤 6 包装入袋",
        "funcIntent": "工序终点及产出",
        "targets": [
          "真空密封包装"
        ],
        "skeleton": "In the final stage, the roasted beans are packaged into sealed bags.",
        "demo": "In the final stage, the roasted beans are sealed into airtight packages ready for sale."
      }
    ],
    "synonymGroups": [
      {
        "category": "流程图时序连接词",
        "words": [
          {
            "en": "The process begins with / when...",
            "note": "流程开始于..."
          },
          {
            "en": "Following this / Subsequently, ...",
            "note": "随后/接着"
          },
          {
            "en": "Once dried, ...",
            "note": "一旦...之后（分词紧凑结构）"
          },
          {
            "en": "In the final stage, ...",
            "note": "在最终阶段"
          }
        ]
      },
      {
        "category": "被动工艺动词",
        "words": [
          {
            "en": "are harvested / picked",
            "note": "被采摘"
          },
          {
            "en": "is stripped away",
            "note": "被剥离去除"
          },
          {
            "en": "are roasted",
            "note": "被烘焙"
          },
          {
            "en": "are sealed into packages",
            "note": "被封装进包装"
          }
        ]
      }
    ],
    "stepsGuide": {
      "step1": "1. 识别关系：采摘 ➔ 去果肉 ➔ 水洗发酵 ➔ 晒干 ➔ 烘焙 ➔ 密封包装。全流程 6 步线性人工工艺。",
      "step2": "2. 对应功能：流程图重点是【原料经历了什么】！必须全程使用一般现在时的被动语态 (are picked, are washed)。",
      "step3": "3. 提取骨架：The process commences with... After being washed, they are dried... In the final stage...",
      "step4": "4. 检查：严禁每句都写 workers / people！突出动作与物料形态转变。"
    }
  },
  "task1-group-22": {
    "chartType": "flow",
    "chartTitle": "废纸回收与环保再生纸流程 (Waste Paper Recycling Process)",
    "unit": "steps",
    "chartData": {
      "isCircular": false,
      "steps": [
        {
          "step": 1,
          "label": "回收箱收集废纸",
          "en": "Collection from bins",
          "icon": "🗑️",
          "note": "集中旧书报纸箱"
        },
        {
          "step": 2,
          "label": "人工分拣分类",
          "en": "Sorting by grade",
          "icon": "🧤",
          "note": "剔除不合格杂质"
        },
        {
          "step": 3,
          "label": "水槽碎浆混合",
          "en": "Pulping with water",
          "icon": "🌊",
          "note": "形成纸纤维浆液"
        },
        {
          "step": 4,
          "label": "过滤去除墨迹油污",
          "en": "De-inking & filtering",
          "icon": "🧪",
          "note": "化学除墨脱色"
        },
        {
          "step": 5,
          "label": "重型滚轮压制成纸",
          "en": "Pressing through rollers",
          "icon": "⚙️",
          "note": "滚筒脱水压光"
        },
        {
          "step": 6,
          "label": "卷纸出厂再次使用",
          "en": "Rolls ready for reuse",
          "icon": "🗞️",
          "note": "重新制成印刷纸"
        }
      ]
    },
    "relations": [
      {
        "qNumber": 106,
        "type": "collection",
        "badge": "收集与运输 · collected from households",
        "trigger": "看到废纸从居民区回收集中",
        "funcIntent": "原料收集起始阶段",
        "targets": [
          "回收箱收集废纸"
        ],
        "skeleton": "Waste paper is first collected from households and offices.",
        "demo": "Waste paper is first collected from households and public recycling bins."
      },
      {
        "qNumber": 107,
        "type": "sorting_discard",
        "badge": "分拣与剔除 · sorted and unsuitable paper discarded",
        "trigger": "看到步骤 2 分拣出可用部分，丢弃不可用部分",
        "funcIntent": "原料筛选与损耗",
        "targets": [
          "人工分拣分类"
        ],
        "skeleton": "The collected material is sorted, with unsuitable items discarded.",
        "demo": "At the sorting facility, non-recyclable paper is screened out and discarded."
      },
      {
        "qNumber": 108,
        "type": "pulping_clean",
        "badge": "制浆除杂 · converted into pulp and cleaned",
        "trigger": "看到步骤 3 泡水制浆与步骤 4 化学除墨",
        "funcIntent": "物理化学混合反应",
        "targets": [
          "水槽碎浆混合",
          "过滤去除墨迹油污"
        ],
        "skeleton": "The paper is then mixed with water to create pulp and cleaned.",
        "demo": "The usable paper is then pulped in water and de-inked to remove impurities."
      },
      {
        "qNumber": 109,
        "type": "pressing_compact",
        "badge": "紧凑从句表达 · after being cleaned and pressed",
        "trigger": "除杂后经压网机滚轮压制",
        "funcIntent": "分词短语高级压缩",
        "targets": [
          "重型滚轮压制成纸"
        ],
        "skeleton": "After being cleaned, the pulp is pressed through heated rollers into new sheets.",
        "demo": "After being cleaned and pressed by rollers, it is rolled into fresh sheets of paper."
      },
      {
        "qNumber": 110,
        "type": "reuse_cycle",
        "badge": "出厂流通再用 · ready to be reused",
        "trigger": "看到步骤 6 卷纸送往印刷厂",
        "funcIntent": "产出与再流通",
        "targets": [
          "卷纸出厂再次使用"
        ],
        "skeleton": "The resulting recycled paper is rolled up, ready to be reused for printing.",
        "demo": "Finally, the manufactured recycled paper is shipped out to be reused."
      }
    ],
    "synonymGroups": [
      {
        "category": "回收工序核心动词",
        "words": [
          {
            "en": "is collected and transported",
            "note": "被收集与运输"
          },
          {
            "en": "is sorted into grades",
            "note": "被按等级分类"
          },
          {
            "en": "unsuitable materials are discarded",
            "note": "不合适材料被丢弃"
          },
          {
            "en": "is pulped and de-inked",
            "note": "被制浆与脱墨"
          }
        ]
      },
      {
        "category": "高级紧凑结构",
        "words": [
          {
            "en": "After being [done], ...",
            "note": "在被...之后（分词短语，主语一致方可省略）"
          },
          {
            "en": "ready to be reused",
            "note": "准备好重新投入使用"
          }
        ]
      }
    ],
    "stepsGuide": {
      "step1": "1. 识别关系：收集 ➔ 分级分拣(剔除不可用纸) ➔ 加水碎浆 ➔ 除墨脱色 ➔ 滚轮压制 ➔ 成品出厂再用。",
      "step2": "2. 对应功能：重点掌握分类阶段的损耗交代 (discarded) 以及 after being cleaned and pressed 的紧凑句法。",
      "step3": "3. 提取骨架：After being sorted, the paper is pulped... Finally, it is rolled...",
      "step4": "4. 检查：注意省略结构的逻辑主语一致性。"
    }
  },
  "task1-group-23": {
    "chartType": "flow",
    "chartTitle": "太阳能热水循环系统工作原理 (Solar Water Heating System)",
    "unit": "system",
    "chartData": {
      "isCircular": false,
      "steps": [
        {
          "step": 1,
          "label": "市政管网冷水注入水箱",
          "en": "Cold water enters tank",
          "icon": "🚰",
          "note": "主动流入 (Flows into)"
        },
        {
          "step": 2,
          "label": "水泵增压泵入集热板",
          "en": "Pumped to solar collectors",
          "icon": "⚡",
          "note": "机械加压 (Is pumped)"
        },
        {
          "step": 3,
          "label": "屋顶吸收太阳辐射加热",
          "en": "Heated by solar energy",
          "icon": "☀️",
          "note": "光热转化 (Is heated)"
        },
        {
          "step": 4,
          "label": "热水回流顶部储水箱",
          "en": "Hot water returns to tank",
          "icon": "♨️",
          "note": "回流储能 (Flows back)"
        },
        {
          "step": 5,
          "label": "经管道输送到家庭使用",
          "en": "Supplied to the household",
          "icon": "🚿",
          "note": "终端供应 (Is supplied)"
        }
      ]
    },
    "relations": [
      {
        "qNumber": 111,
        "type": "cold_inflow",
        "badge": "冷水注入 · cold water enters",
        "trigger": "看到冷水从底部进入储水罐",
        "funcIntent": "自然流动 (主动语态 flows)",
        "targets": [
          "市政管网冷水注入水箱"
        ],
        "skeleton": "Cold water flows into the storage tank from the mains supply.",
        "demo": "Cold water initially enters the bottom of the storage tank."
      },
      {
        "qNumber": 112,
        "type": "pump_action",
        "badge": "水泵驱动 · is pumped to the roof",
        "trigger": "看到水泵对水施加推力打上屋顶",
        "funcIntent": "设备动作 (被动语态 is pumped)",
        "targets": [
          "水泵增压泵入集热板"
        ],
        "skeleton": "It is then pumped up towards the solar panels mounted on the roof.",
        "demo": "A pump is used to transport this cold water to the rooftop solar collectors."
      },
      {
        "qNumber": 113,
        "type": "solar_absorb",
        "badge": "太阳光加热 · heated by sunlight",
        "trigger": "看到集热管吸收阳光把水加热",
        "funcIntent": "吸热升温机理",
        "targets": [
          "屋顶吸收太阳辐射加热"
        ],
        "skeleton": "Inside the collector, the water is heated by absorbing sunlight.",
        "demo": "As the water passes through the tubes, it is heated by solar energy."
      },
      {
        "qNumber": 114,
        "type": "hot_return",
        "badge": "热水返回 · returns to the tank",
        "trigger": "看到变热的水顺着回路流回水箱上层",
        "funcIntent": "热对流与回流储能",
        "targets": [
          "热水回流顶部储水箱"
        ],
        "skeleton": "The heated water then flows back into the top section of the tank.",
        "demo": "Once heated, the water returns to the storage tank for retention."
      },
      {
        "qNumber": 115,
        "type": "household_supply",
        "badge": "输送入户 · supplied to the home",
        "trigger": "看到管道引出送到浴室厨房",
        "funcIntent": "终端生活供给",
        "targets": [
          "经管道输送到家庭使用"
        ],
        "skeleton": "Finally, hot water is supplied to the home for everyday domestic use.",
        "demo": "Finally, the hot water is piped into the household for domestic consumption."
      }
    ],
    "synonymGroups": [
      {
        "category": "主动与被动辨析（机器与流体）",
        "words": [
          {
            "en": "water flows / enters...",
            "note": "水自行流动（主动语态 flows/enters）"
          },
          {
            "en": "is pumped by a pump",
            "note": "被水泵施力加压（被动语态 is pumped）"
          },
          {
            "en": "is heated by solar panels",
            "note": "被集热器加热（被动语态 is heated）"
          },
          {
            "en": "is supplied to...",
            "note": "被供给到家庭（被动语态 is supplied）"
          }
        ]
      },
      {
        "category": "物理系统装置词",
        "words": [
          {
            "en": "storage tank",
            "note": "蓄水箱/储热水罐"
          },
          {
            "en": "solar collectors / panels",
            "note": "太阳能集热板"
          },
          {
            "en": "domestic consumption",
            "note": "家庭日常用水"
          }
        ]
      }
    ],
    "stepsGuide": {
      "step1": "1. 识别关系：冷水进水箱 ➔ 水泵打上屋顶 ➔ 太阳能集热器加热 ➔ 热水回流保温罐 ➔ 供给生活使用。",
      "step2": "2. 对应功能：物理装置题难点在于【主动与被动交替】——水流动用主动 (flows into)，机械设备动作流水用被动 (is pumped, is heated)。",
      "step3": "3. 提取骨架：Cold water flows... It is then pumped... After being heated, it returns...",
      "step4": "4. 检查：动词主被动语态切换自然精准。"
    }
  },
  "task1-group-24": {
    "chartType": "flow_circular",
    "chartTitle": "青蛙完整生命周期闭环循环图 (Life Cycle of a Frog)",
    "unit": "cycle",
    "chartData": {
      "isCircular": true,
      "steps": [
        {
          "step": 1,
          "label": "水中产卵与受精",
          "en": "Breeding & laying eggs",
          "icon": "🫧",
          "note": "漂浮卵群 (Frogspawn)"
        },
        {
          "step": 2,
          "label": "孵化长尾小蝌蚪",
          "en": "Tadpoles hatch",
          "icon": "🐟",
          "note": "水生呼吸有鳃"
        },
        {
          "step": 3,
          "label": "萌发生长出后腿",
          "en": "Hind legs develop",
          "icon": "🦵",
          "note": "进入变态期"
        },
        {
          "step": 4,
          "label": "萌发前腿尾巴缩短",
          "en": "Front legs grow & tail shrinks",
          "icon": "🦎",
          "note": "肺部开始发育"
        },
        {
          "step": 5,
          "label": "转变为幼年小蛙",
          "en": "Young froglet emerges",
          "icon": "🐸",
          "note": "尾巴残存但可陆生"
        },
        {
          "step": 6,
          "label": "完全成熟成年蛙",
          "en": "Reaches full adulthood",
          "icon": "👑",
          "note": "生活在陆地与水边"
        },
        {
          "step": 7,
          "label": "交配产卵循环起点",
          "en": "Mates and lays eggs in water",
          "icon": "🔄",
          "note": "闭环重复新生命"
        }
      ]
    },
    "relations": [
      {
        "qNumber": 116,
        "type": "egg_stage",
        "badge": "产卵起点 · laying eggs in water",
        "trigger": "看到水草丛中漂浮着大串受精卵",
        "funcIntent": "生命周期起点交代",
        "targets": [
          "水中产卵与受精"
        ],
        "skeleton": "The cycle begins when adult frogs mate and lay eggs in water.",
        "demo": "The life cycle begins when an adult frog deposits eggs in a body of water."
      },
      {
        "qNumber": 117,
        "type": "tadpole_hatch",
        "badge": "蝌蚪孵化 · tadpoles emerge",
        "trigger": "看到卵孵化成游动蝌蚪",
        "funcIntent": "孵化与早期幼体",
        "targets": [
          "孵化长尾小蝌蚪"
        ],
        "skeleton": "After an incubation period, tiny tadpoles emerge from the eggs.",
        "demo": "After a period of development, small tadpoles hatch from these eggs."
      },
      {
        "qNumber": 118,
        "type": "metamorphosis",
        "badge": "四肢萌发生长 · grow hind legs then front legs",
        "trigger": "看到先后长出后腿与前腿",
        "funcIntent": "器官变态分期生长",
        "targets": [
          "萌发生长出后腿",
          "萌发前腿尾巴缩短"
        ],
        "skeleton": "Over time, the tadpole grows hind legs, followed by front limbs.",
        "demo": "Gradually, the tadpole develops hind legs, while its tail begins to shorten."
      },
      {
        "qNumber": 119,
        "type": "froglet_adult",
        "badge": "长成成蛙 · matures into an adult frog",
        "trigger": "看到尾巴完全消失，长成健壮成蛙",
        "funcIntent": "成年蜕变与陆生适应",
        "targets": [
          "完全成熟成年蛙"
        ],
        "skeleton": "Once the tail is completely reabsorbed, the froglet matures into an adult.",
        "demo": "Eventually, the creature matures into a fully grown adult frog capable of living on land."
      },
      {
        "qNumber": 120,
        "type": "cyclical_loop",
        "badge": "闭环重头循环 · cyclical process repeating",
        "trigger": "看到箭头从成蛙弯回产卵，完成循环",
        "funcIntent": "闭环总结句（Overview必考）",
        "targets": [
          "交配产卵循环起点"
        ],
        "skeleton": "The adult then returns to the water to mate, and the entire cycle starts anew.",
        "demo": "The mature frog returns to the water to lay eggs, and the cycle repeats indefinitely."
      }
    ],
    "synonymGroups": [
      {
        "category": "自然生命周期专属时态",
        "words": [
          {
            "en": "always present tense",
            "note": "自然规律全程使用【一般现在时】！"
          },
          {
            "en": "deposits / lays eggs",
            "note": "产卵"
          },
          {
            "en": "hatches from...",
            "note": "从...中孵化"
          },
          {
            "en": "matures into an adult",
            "note": "成熟蜕变为成体"
          }
        ]
      },
      {
        "category": "闭环循环 Overview 经典句",
        "words": [
          {
            "en": "The entire cycle starts anew",
            "note": "整个循环重新开始"
          },
          {
            "en": "and the cyclical process repeats",
            "note": "闭环过程周而复始"
          },
          {
            "en": "completing the life cycle",
            "note": "完成整个生命周期"
          }
        ]
      }
    ],
    "stepsGuide": {
      "step1": "1. 识别关系：卵群 ➔ 蝌蚪 ➔ 长出后腿 ➔ 长出前腿缩短尾巴 ➔ 幼蛙 ➔ 成蛙 ➔ 产卵。这是纯天然闭环循环。",
      "step2": "2. 对应功能：生命周期必须用【一般现在时】！Overview 必须点出【最终回到起点，周而复始】！",
      "step3": "3. 提取骨架：The cycle commences with... Over time, it grows... Eventually, it matures... and the cycle repeats anew.",
      "step4": "4. 检查：保证循环箭头闭环闭合，动词单三形式精准。"
    }
  },
  "task1-group-25": {
    "chartType": "line",
    "chartTitle": "微型报告一：四种常见废料回收率对比 (Material Recycling Rates 1982–2010)",
    "unit": "%",
    "chartData": {
      "xLabels": [
        "1982",
        "1990",
        "2000",
        "2010"
      ],
      "yUnit": "%",
      "yMin": 0,
      "yMax": 80,
      "series": [
        {
          "label": "纸张 (Paper & Cardboard)",
          "color": "#2a9d8f",
          "points": [
            55,
            68,
            75,
            70
          ]
        },
        {
          "label": "玻璃瓶 (Glass Containers)",
          "color": "#e76f51",
          "points": [
            40,
            43,
            48,
            52
          ]
        },
        {
          "label": "铝罐 (Aluminium Cans)",
          "color": "#457b9d",
          "points": [
            10,
            22,
            45,
            62
          ]
        },
        {
          "label": "塑料 (Plastics)",
          "color": "#e9c46a",
          "points": [
            4,
            8,
            12,
            18
          ]
        }
      ]
    },
    "relations": [
      {
        "qNumber": 121,
        "type": "intro_paraphrase",
        "badge": "开头段改写题目 · intro paraphrase",
        "trigger": "审读图表标题与轴线信息",
        "funcIntent": "学术首句无损改写",
        "targets": [
          "微型报告一：四种常见废料回收率对比 (Material Recycling Rates 1982–2010)"
        ],
        "skeleton": "The line graph compares the recycling rates of four materials between 1982 and 2010.",
        "demo": "The line graph compares the proportion of paper, glass, aluminium cans and plastics recycled between 1982 and 2010."
      },
      {
        "qNumber": 122,
        "type": "report_overview",
        "badge": "总述段提炼 · overall upward trend",
        "trigger": "看到四条线总体全涨，铝罐增幅最猛",
        "funcIntent": "微型报告总览概述",
        "targets": [
          "纸张 (Paper & Cardboard)",
          "铝罐 (Aluminium Cans)"
        ],
        "skeleton": "Overall, all four materials saw growth, with aluminium experiencing the steepest rise.",
        "demo": "Overall, all four materials recorded increases, with aluminium cans showing the most dramatic growth."
      },
      {
        "qNumber": 123,
        "type": "dominant_paper",
        "badge": "最高项纸张详写 · paper maintained lead",
        "trigger": "看到纸张从 55% 冲到 75% 再微降至 70%",
        "funcIntent": "领跑科目细部数据支撑",
        "targets": [
          "纸张 (Paper & Cardboard)"
        ],
        "skeleton": "Paper was consistently the most recycled material, climbing to a peak of 75% before edging down to 70%.",
        "demo": "Paper remained the most recycled item throughout, rising from 55% in 1982 to peak at 75% before dipping to 70% in 2010."
      },
      {
        "qNumber": 124,
        "type": "fastest_cans",
        "badge": "飙升项铝罐详写 · sixfold jump",
        "trigger": "看到铝罐从 10% 狂飙到 62%",
        "funcIntent": "黑马科目六倍跨越描写",
        "targets": [
          "铝罐 (Aluminium Cans)"
        ],
        "skeleton": "Aluminium cans witnessed a sixfold increase, surging from 10% to 62%.",
        "demo": "Aluminium cans recorded a striking sixfold surge, rocketing from just 10% in 1982 to 62% in 2010."
      },
      {
        "qNumber": 125,
        "type": "lowest_plastic",
        "badge": "最低项塑料交代 · remaining at the bottom",
        "trigger": "看到塑料从 4% 爬到 18% 仍垫底",
        "funcIntent": "底端项收尾交代",
        "targets": [
          "塑料 (Plastics)"
        ],
        "skeleton": "Plastics registered the lowest figures despite climbing from 4% to 18%.",
        "demo": "In contrast, plastics were the least recycled throughout, reaching only 18% by 2010."
      }
    ],
    "synonymGroups": [
      {
        "category": "报告首尾经典框架",
        "words": [
          {
            "en": "The line graph illustrates / compares...",
            "note": "折线图比较了...（首段改写）"
          },
          {
            "en": "Overall, all materials recorded increases",
            "note": "总体而言所有材料均有增长（Overview）"
          },
          {
            "en": "a sixfold increase",
            "note": "六倍的增幅"
          },
          {
            "en": "edging down to...",
            "note": "略微小幅回落至"
          }
        ]
      },
      {
        "category": "材料与回收动词",
        "words": [
          {
            "en": "recycling rates",
            "note": "回收比例"
          },
          {
            "en": "consistently the most recycled",
            "note": "始终是回收率最高的"
          },
          {
            "en": "rocketed from... to...",
            "note": "从...火箭般蹿升至"
          }
        ]
      }
    ],
    "stepsGuide": {
      "step1": "1. 识别关系：纸张始终第一 (55%➔75%➔70%)；铝罐暴增 6 倍 (10%➔62%)；玻璃稳步增 (40%➔52%)；塑料始终垫底 (4%➔18%)。",
      "step2": "2. 对应功能：把单句组装成完整微型报告——第121句改写题目 ➔ 第122句写总览 ➔ 第123/124/125句详写各主体。",
      "step3": "3. 提取骨架：从独立造句进阶到 120 词完整小作文段落结构！",
      "step4": "4. 检查：时态全用过去时，段落衔接连贯。"
    }
  },
  "task1-group-26": {
    "chartType": "bar",
    "chartTitle": "微型报告二：大学毕业生毕业去向调查 (Graduate Destinations)",
    "unit": "%",
    "chartData": [
      {
        "label": "全职工作 (Full-time)",
        "value": 55,
        "unit": "%",
        "color": "#2a9d8f",
        "note": "过半毕业生首选 · Majority"
      },
      {
        "label": "继续深造 (Further Study)",
        "value": 25,
        "unit": "%",
        "color": "#457b9d",
        "note": "四分之一选读研 · One quarter"
      },
      {
        "label": "兼职工作 (Part-time)",
        "value": 12,
        "unit": "%",
        "color": "#f4a261",
        "note": "过渡状态 · Minority"
      },
      {
        "label": "失业待业 (Unemployed)",
        "value": 8,
        "unit": "%",
        "color": "#e76f51",
        "note": "全场最低 · Lowest share"
      }
    ],
    "relations": [
      {
        "qNumber": 126,
        "type": "intro_graduates",
        "badge": "改写题目 · bar chart illustrates",
        "trigger": "柱图显示某大学毕业生的四种去向",
        "funcIntent": "柱图报告首句改写",
        "targets": [
          "全职工作 (Full-time)"
        ],
        "skeleton": "The bar chart shows the destinations of university graduates from a particular institution.",
        "demo": "The bar chart illustrates the career pathways chosen by university leavers."
      },
      {
        "qNumber": 127,
        "type": "overview_graduates",
        "badge": "总览多数与少数 · overview contrast",
        "trigger": "全职与深造合计占了八成",
        "funcIntent": "报告 Overview 提炼",
        "targets": [
          "全职工作 (Full-time)",
          "继续深造 (Further Study)"
        ],
        "skeleton": "Overall, full-time employment was by far the most common option, while unemployment was minimal.",
        "demo": "Overall, the vast majority entered full-time work or further education, with unemployment remaining rare."
      },
      {
        "qNumber": 128,
        "type": "fulltime_lead",
        "badge": "全职详写 · over half entered full-time",
        "trigger": "看到全职 55% 超过半数",
        "funcIntent": "主导项精准数据论述",
        "targets": [
          "全职工作 (Full-time)"
        ],
        "skeleton": "More than half of the graduates secured full-time employment, at 55%.",
        "demo": "More than half of the cohort (55%) went straight into full-time employment."
      },
      {
        "qNumber": 129,
        "type": "further_study",
        "badge": "深造详写 · one quarter chose further study",
        "trigger": "看到深造 25% 刚好四分之一",
        "funcIntent": "第二大去向分数表达",
        "targets": [
          "继续深造 (Further Study)"
        ],
        "skeleton": "A further quarter (25%) elected to pursue postgraduate study.",
        "demo": "A further quarter of graduates (25%) elected to pursue advanced education."
      },
      {
        "qNumber": 130,
        "type": "parttime_unemployed",
        "badge": "兼职与失业合并交代 · remaining shares",
        "trigger": "兼职 12% 与失业 8% 垫底",
        "funcIntent": "次要低位项组合归纳",
        "targets": [
          "兼职工作 (Part-time)",
          "失业待业 (Unemployed)"
        ],
        "skeleton": "The remaining graduates either engaged in part-time work (12%) or were unemployed (8%).",
        "demo": "The remaining alumni engaged in part-time roles (12%) or struggled with unemployment (8%)."
      }
    ],
    "synonymGroups": [
      {
        "category": "毕业生与去向词汇",
        "words": [
          {
            "en": "university leavers / alumni / cohort",
            "note": "毕业生/校友群体"
          },
          {
            "en": "career pathways / destinations",
            "note": "职业路径/出路"
          },
          {
            "en": "secured full-time employment",
            "note": "获得了全职工作"
          },
          {
            "en": "pursue postgraduate study",
            "note": "攻读研究生深造"
          }
        ]
      },
      {
        "category": "静态数据表达",
        "words": [
          {
            "en": "elected to...",
            "note": "选择去..."
          },
          {
            "en": "by far the most common",
            "note": "显而易见最普遍的选择"
          },
          {
            "en": "a further quarter",
            "note": "另外四分之一"
          }
        ]
      }
    ],
    "stepsGuide": {
      "step1": "1. 识别关系：全职 55%(过半)；深造 25%(四分之一)；兼职 12%；失业 8%。静态截面分布。",
      "step2": "2. 对应功能：改写首句 ➔ 极值与两极分化 Overview ➔ 55%半数详述 ➔ 25%四分之一详述 ➔ 剩余项组合交代。",
      "step3": "3. 提取骨架：More than half of the graduates secured... A further quarter elected to... The remaining alumni were...",
      "step4": "4. 检查：静态图严禁写 increased to 55%，全部用 was / entered / accounted for。"
    }
  },
  "task1-group-27": {
    "chartType": "map",
    "chartTitle": "微型报告三：中央火车站扩建与现代化改造方案 (Railway Station Expansion)",
    "unit": "layout",
    "chartData": {
      "periods": [
        {
          "title": "改造前 (Current Station)",
          "zones": [
            {
              "label": "单一站台 1 (Platform 1)",
              "en": "Single operational platform",
              "type": "infrastructure",
              "statusBadge": "运力饱和"
            },
            {
              "label": "老售票处 (Ticket Office)",
              "en": "Original ticket office",
              "type": "commercial",
              "statusBadge": "保留"
            },
            {
              "label": "狭窄进站口 (Narrow Entrance)",
              "en": "Narrow passenger entrance",
              "type": "infrastructure",
              "statusBadge": "拥挤"
            }
          ]
        },
        {
          "title": "改造方案 (Proposed Scheme)",
          "zones": [
            {
              "label": "保留站台 1 (Platform 1)",
              "en": "Existing platform 1",
              "type": "infrastructure",
              "statusBadge": "原样保留"
            },
            {
              "label": "新建第二站台 (Platform 2)",
              "en": "New platform 2 added",
              "type": "infrastructure",
              "statusBadge": "新建扩容"
            },
            {
              "label": "新建咖啡馆与便利店 (Station Cafe)",
              "en": "New passenger cafe",
              "type": "commercial",
              "statusBadge": "商业配套"
            },
            {
              "label": "非机动车停放区 (Cycle Parking)",
              "en": "Bicycle parking racks",
              "type": "infrastructure",
              "statusBadge": "便民设施"
            },
            {
              "label": "大幅扩建进站大厅 (Enlarged Entrance)",
              "en": "Expanded concourse entrance",
              "type": "infrastructure",
              "statusBadge": "拓宽疏导"
            }
          ]
        }
      ]
    },
    "relations": [
      {
        "qNumber": 131,
        "type": "intro_station",
        "badge": "地图报告改写 · plans illustrate",
        "trigger": "图纸展示火车站改造扩建规划",
        "funcIntent": "地图微型报告首句",
        "targets": [
          "微型报告三：中央火车站扩建与现代化改造方案 (Railway Station Expansion)"
        ],
        "skeleton": "The maps illustrate the proposed redevelopment of a railway station.",
        "demo": "The two diagrams illustrate the planned modernization of a local train station."
      },
      {
        "qNumber": 132,
        "type": "overview_station",
        "badge": "地图总揽 · capacity expansion",
        "trigger": "运力扩大、商业与服务设施全面增加",
        "funcIntent": "地图报告核心 Overview",
        "targets": [
          "新建第二站台 (Platform 2)",
          "新建咖啡馆与便利店 (Station Cafe)"
        ],
        "skeleton": "Overall, the station will undergo major expansion with an additional platform and improved amenities.",
        "demo": "Overall, the station will be extensively modernized with greater passenger capacity and enhanced facilities."
      },
      {
        "qNumber": 133,
        "type": "platform_doubling",
        "badge": "站台翻倍增设 · a second platform will be added",
        "trigger": "看到增设了第二站台 Platform 2",
        "funcIntent": "关键运力基础设施翻倍",
        "targets": [
          "新建第二站台 (Platform 2)"
        ],
        "skeleton": "A second platform will be constructed opposite the existing one.",
        "demo": "A second platform will be built alongside the original one to accommodate more trains."
      },
      {
        "qNumber": 134,
        "type": "amenities_added",
        "badge": "配套商业落地 · cafe and bicycle parking introduced",
        "trigger": "看到新增了咖啡馆与自行车停放处",
        "funcIntent": "辅助商业服务配套",
        "targets": [
          "新建咖啡馆与便利店 (Station Cafe)",
          "非机动车停放区 (Cycle Parking)"
        ],
        "skeleton": "New amenities, including a cafe and bicycle parking area, will also be introduced.",
        "demo": "Modern passenger amenities, such as a cafe and designated bicycle parking, will be introduced."
      },
      {
        "qNumber": 135,
        "type": "entrance_expanded",
        "badge": "入口拓宽与售票保留 · concourse enlarged while ticket office retained",
        "trigger": "大门扩建变宽敞，老售票处依旧保留",
        "funcIntent": "主入口改造与保留项并陈",
        "targets": [
          "老售票处 (Ticket Office)",
          "大幅扩建进站大厅 (Enlarged Entrance)"
        ],
        "skeleton": "While the ticket office will remain, the main entrance is set to be greatly expanded.",
        "demo": "While the original ticket booth will be retained, the entrance concourse will be substantially expanded."
      }
    ],
    "synonymGroups": [
      {
        "category": "车站改造规划专用动词",
        "words": [
          {
            "en": "will be extensively modernized",
            "note": "将被全面现代化改造"
          },
          {
            "en": "accommodate more trains",
            "note": "容纳更多列车车次"
          },
          {
            "en": "designated bicycle parking",
            "note": "指定自行车停放区"
          },
          {
            "en": "entrance concourse",
            "note": "进站大厅/集散广场"
          }
        ]
      },
      {
        "category": "保留与扩建对比",
        "words": [
          {
            "en": "While X will be retained, Y will be expanded",
            "note": "在X保留的同时，Y将被扩建（经典小作文句型）"
          },
          {
            "en": "alongside the original one",
            "note": "在原设施旁边"
          }
        ]
      }
    ],
    "stepsGuide": {
      "step1": "1. 识别关系：增设第二站台(运力翻倍)；新增咖啡馆与自行车区；大门扩宽；售票处原样保留。",
      "step2": "2. 对应功能：改写首句 ➔ 运力与便民双重升级 Overview ➔ 站台扩容 ➔ 配套增设 ➔ 留旧扩新组合句。",
      "step3": "3. 提取骨架：While X will be retained, Y will be substantially expanded...",
      "step4": "4. 检查：使用将来被动时态 will be built / will be introduced。"
    }
  },
  "task1-group-28": {
    "chartType": "flow_circular",
    "chartTitle": "微型报告四：废旧玻璃瓶闭环循环再生流程 (Glass Bottle Recycling Loop)",
    "unit": "cycle",
    "chartData": {
      "isCircular": true,
      "steps": [
        {
          "step": 1,
          "label": "消费者将空瓶投入回收桶",
          "en": "Depositing empty bottles",
          "icon": "🍾",
          "note": "起点投放"
        },
        {
          "step": 2,
          "label": "重型卡车运送至处理厂",
          "en": "Transported by trucks",
          "icon": "🚛",
          "note": "集中外运"
        },
        {
          "step": 3,
          "label": "按棕色绿色透明分色",
          "en": "Sorting by color",
          "icon": "🎨",
          "note": "分色除杂"
        },
        {
          "step": 4,
          "label": "高压水枪彻底清洗消毒",
          "en": "Washed & sanitized",
          "icon": "💧",
          "note": "清洗洁净"
        },
        {
          "step": 5,
          "label": "高温熔炉融化成玻璃液",
          "en": "Melted in a furnace",
          "icon": "🔥",
          "note": "熔融再造"
        },
        {
          "step": 6,
          "label": "模具吹制成崭新玻璃瓶",
          "en": "Moulded into new bottles",
          "icon": "✨",
          "note": "吹塑成型"
        },
        {
          "step": 7,
          "label": "灌装饮品重新上市销售",
          "en": "Refilled & sold in stores",
          "icon": "🛒",
          "note": "重新流通"
        },
        {
          "step": 8,
          "label": "饮用后再次回归回收桶",
          "en": "Emptied and recycled again",
          "icon": "🔄",
          "note": "闭环重复"
        }
      ]
    },
    "relations": [
      {
        "qNumber": 136,
        "type": "intro_glass_loop",
        "badge": "循环流程改写 · diagram shows circular stages",
        "trigger": "图示展示玻璃瓶循环利用全过程",
        "funcIntent": "闭环流程微型报告首句",
        "targets": [
          "微型报告四：废旧玻璃瓶闭环循环再生流程 (Glass Bottle Recycling Loop)"
        ],
        "skeleton": "The diagram details the stages involved in recycling glass bottles through a circular system.",
        "demo": "The flowchart outlines the multi-stage cycle through which used glass bottles are recycled."
      },
      {
        "qNumber": 137,
        "type": "overview_glass_loop",
        "badge": "闭环特质 Overview · cyclical eight-step loop",
        "trigger": "全流程8步闭合，瓶子经熔化重新流通",
        "funcIntent": "闭环报告总括 Overview",
        "targets": [
          "消费者将空瓶投入回收桶",
          "饮用后再次回归回收桶"
        ],
        "skeleton": "Overall, the process comprises eight distinct steps, forming a closed loop where materials re-enter consumption.",
        "demo": "Overall, it is a cyclical process containing eight main stages, from collection to reuse."
      },
      {
        "qNumber": 138,
        "type": "collection_sorting",
        "badge": "收集与分色详述 · collected and separated by color",
        "trigger": "看到卡车拉到工厂后按颜色分类清洗",
        "funcIntent": "前半程收集分色工序",
        "targets": [
          "重型卡车运送至处理厂",
          "按棕色绿色透明分色",
          "高压水枪彻底清洗消毒"
        ],
        "skeleton": "Initially, bottles are collected and transported to a plant, where they are sorted by colour and washed.",
        "demo": "First, empty bottles are gathered by collection trucks and taken to a facility to be sorted by color and cleaned."
      },
      {
        "qNumber": 139,
        "type": "melting_moulding",
        "badge": "熔化与重塑详述 · melted and blown into new bottles",
        "trigger": "看到进入高温炉熔化，模具吹制新瓶",
        "funcIntent": "核心物理高温再生工序",
        "targets": [
          "高温熔炉融化成玻璃液",
          "模具吹制成崭新玻璃瓶"
        ],
        "skeleton": "Following this, the crushed glass is melted in a high-temperature furnace and moulded into new containers.",
        "demo": "Next, the glass is melted inside a scorching furnace and blown into new bottles using moulds."
      },
      {
        "qNumber": 140,
        "type": "loop_completion",
        "badge": "灌装重返市场 · refilled and cycle begins anew",
        "trigger": "装入饮品送往商店，消费后重新回收",
        "funcIntent": "终点闭环闭合",
        "targets": [
          "灌装饮品重新上市销售",
          "饮用后再次回归回收桶"
        ],
        "skeleton": "Finally, the newly created bottles are filled with liquids, distributed to retailers, and ready to re-enter the same cycle after use.",
        "demo": "Finally, the newly formed bottles are refilled, shipped to retail outlets, and eventually re-enter the same cycle after use."
      }
    ],
    "synonymGroups": [
      {
        "category": "闭环循环专用高级术语",
        "words": [
          {
            "en": "closed-loop recycling system",
            "note": "闭环循环回收系统（学术大词）"
          },
          {
            "en": "re-enter the same cycle after use",
            "note": "使用后再次进入同一循环"
          },
          {
            "en": "scorching furnace",
            "note": "高温熔炉"
          },
          {
            "en": "moulded into new containers",
            "note": "被模具重塑为新容器"
          }
        ]
      },
      {
        "category": "工序推进标志词",
        "words": [
          {
            "en": "Initially, ...",
            "note": "起初"
          },
          {
            "en": "Following this, ...",
            "note": "接着"
          },
          {
            "en": "Finally, ... and re-enters the cycle",
            "note": "最终...并回到循环起点"
          }
        ]
      }
    ],
    "stepsGuide": {
      "step1": "1. 识别关系：收集 ➔ 运输 ➔ 分色 ➔ 清洗 ➔ 高温熔化 ➔ 模具重塑 ➔ 灌装销售 ➔ 再次回收。完美的闭环系统。",
      "step2": "2. 对应功能：改写题目 ➔ 闭环 Overview ➔ 收集清洗前半段 ➔ 熔融成型核心段 ➔ 灌装流通闭环收尾。",
      "step3": "3. 提取骨架：Overall, it is a cyclical process... Finally, the bottles are refilled and ready to re-enter the same cycle after use.",
      "step4": "4. 检查：全书终极压轴题，完整掌握 Task 1 微型报告串联逻辑！"
    }
  }
};

  /**
   * 智能获取题组视觉与骨架数据
   * 确保 28 个题组 100% 具备原生 SVG 图表与思维链
   */
  function getVisualScaffoldForGroup(group) {
    if (!group) return null;
    if (TASK1_VISUAL_SCAFFOLDS[group.id]) {
      return TASK1_VISUAL_SCAFFOLDS[group.id];
    }

    // 兜底降级策略
    return {
      groupId: group.id,
      chartType: "pie",
      chartTitle: group.label || "雅思学术类图表",
      chartData: [],
      genericContext: group.context || "",
      relations: (group.questions || []).map((q, idx) => ({
        qNumber: q.number,
        badge: `表达 #${idx + 1}`,
        trigger: q.chinese,
        funcIntent: "表达骨架练习",
        targets: [],
        skeleton: q.answer,
        demo: q.answer
      })),
      synonymGroups: [
        {
          category: "高频学术替换",
          words: [
            { en: "account for / make up", note: "占比与构成" },
            { en: "proportion / percentage", note: "比例与份额" }
          ]
        }
      ],
      stepsGuide: {
        step1: `1. 观察数据：${group.context || ""}`,
        step2: "2. 识别主次特征与极值差距。",
        step3: "3. 调用经典语言骨架。",
        step4: "4. 代入数据并注意时态与单复数。"
      }
    };
  }

  const Task1VisualScaffolds = {
    TASK1_VISUAL_SCAFFOLDS,
    getVisualScaffoldForGroup
  };

  if (typeof window !== "undefined") {
    window.Task1VisualScaffolds = Task1VisualScaffolds;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = Task1VisualScaffolds;
  }
})();
