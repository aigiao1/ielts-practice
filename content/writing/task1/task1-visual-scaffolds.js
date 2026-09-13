// Task 1 核心图表视觉数据与四步思维链词库规范 (Task 1 Visual Scaffolds v1)
(() => {
  "use strict";

  const TASK1_VISUAL_SCAFFOLDS = {
    // 题组 1：饼图：家庭支出构成
    "task1-group-01": {
      groupId: "task1-group-01",
      chartType: "pie",
      chartTitle: "家庭支出构成 (Household Expenditure Breakdown)",
      unit: "%",
      chartData: [
        { label: "住房 (Housing)", value: 45, unit: "%", color: "#e76f51" },
        { label: "食品 (Food)", value: 30, unit: "%", color: "#f4a261" },
        { label: "交通 (Transport)", value: 15, unit: "%", color: "#2a9d8f" },
        { label: "娱乐 (Entertainment)", value: 10, unit: "%", color: "#457b9d" }
      ],
      // 题目与图表数据及关系的映射
      relations: [
        {
          qNumber: 1,
          type: "proportion",
          badge: "单项占比 · 最大值",
          trigger: "看到 45% (最大)",
          funcIntent: "主项占比陈述",
          targets: ["住房 (Housing)"],
          skeleton: "[Category] accounted for [N]% of total household expenditure.",
          demo: "Housing accounted for 45% of total household expenditure."
        },
        {
          qNumber: 2,
          type: "ranking",
          badge: "顺位排序 · 第二大",
          trigger: "看到 30% 紧随其后",
          funcIntent: "第二梯队顺位描述",
          targets: ["食品 (Food)"],
          skeleton: "[Category] was the second-largest category, representing [N]% of the total.",
          demo: "Food was the second-largest category, representing 30% of the total."
        },
        {
          qNumber: 3,
          type: "difference",
          badge: "差值对比 · 百分点",
          trigger: "看到 15% vs 10% (差5)",
          funcIntent: "两项差值对比 (谨防误用 percent)",
          targets: ["交通 (Transport)", "娱乐 (Entertainment)"],
          skeleton: "The proportion spent on [A] was [N] percentage points higher than that for [B].",
          demo: "The proportion spent on transport was 5 percentage points higher than that for entertainment."
        },
        {
          qNumber: 4,
          type: "multiplier",
          badge: "倍数关系 · 四倍半",
          trigger: "看到 45% vs 10% (4.5倍)",
          funcIntent: "极值与极小项倍数对比",
          targets: ["住房 (Housing)", "娱乐 (Entertainment)"],
          skeleton: "Spending on [A] was [N] times as high as spending on [B].",
          demo: "Spending on housing was four and a half times as high as spending on entertainment."
        },
        {
          qNumber: 5,
          type: "total",
          badge: "合计数 · 分数归纳",
          trigger: "看到 45% + 30% = 75%",
          funcIntent: "前两大部分合并归纳 (四分之三)",
          targets: ["住房 (Housing)", "食品 (Food)"],
          skeleton: "[A] and [B] together made up [fraction] of all expenditure.",
          demo: "Housing and food together made up three quarters of all expenditure."
        }
      ],
      // 高频替换词抽屉 (Synonym Drawer)
      synonymGroups: [
        {
          category: "主题词 · 支出",
          words: [
            { en: "expenditure", note: "不可数/可数，雅思最通用正式词" },
            { en: "spending", note: "常用动名词" },
            { en: "outlay", note: "开销/支出金额" },
            { en: "expenses", note: "通常用复数形式" },
            { en: "spending on...", note: "搭配介词 on" }
          ]
        },
        {
          category: "功能词 · 比例 / 份额",
          words: [
            { en: "proportion", note: "比例（后接 that for / of）" },
            { en: "percentage", note: "百分比" },
            { en: "share", note: "份额/占比" },
            { en: "rate", note: "比率" }
          ]
        },
        {
          category: "骨架动词 · 占据 / 构成",
          words: [
            { en: "accounted for", note: "占据（雅思最高频核心动词）" },
            { en: "made up", note: "构成/占据" },
            { en: "represented", note: "代表/相当于" },
            { en: "constituted", note: "构成（正式书面语）" },
            { en: "comprised", note: "由...组成 / 占" }
          ]
        },
        {
          category: "比较与修饰",
          words: [
            { en: "percentage points higher than...", note: "高出...个百分点" },
            { en: "four and a half times as high as...", note: "四倍半之高" },
            { en: "second-largest category", note: "第二大类别" },
            { en: "together made up three quarters", note: "合计占四分之三" }
          ]
        }
      ],
      // 四步思维链引导
      stepsGuide: {
        step1: "1. 识别关系：住房 45% 最大；食品 30% 次之；交通 15% 与娱乐 10% 差 5 个百分点；45% 是 10% 的 4.5 倍；前两项合计 75%。",
        step2: "2. 对应功能：占比陈述 / 顺位排序 / 差值对比 / 倍数对比 / 组合合计。",
        step3: "3. 提取骨架：从下方骨架抽屉中调用对应的模板，避免考场重新创造语法。",
        step4: "4. 填入数据：放入 Housing / Food / Transport / Entertainment 及具体数值，注意单复数与代词 that for。"
      }
    },

    // 题组 2：表格：三座机场的年客流量
    "task1-group-02": {
      groupId: "task1-group-02",
      chartType: "table",
      chartTitle: "三座机场年客流量对比 (Annual Passenger Numbers)",
      unit: "passengers per year",
      chartData: [
        { label: "Airport A", value: "1.2 million (120万)", note: "最高客流量" },
        { label: "Airport B", value: "800,000 (80万)", note: "中等规模，比A少40万" },
        { label: "Airport C", value: "600,000 (60万)", note: "刚好是A的一半" }
      ],
      relations: [
        {
          qNumber: 6,
          type: "volume",
          badge: "绝对量 · 主体陈述",
          trigger: "看到 Airport A: 120万",
          funcIntent: "首位主体吞吐量陈述",
          targets: ["Airport A"],
          skeleton: "[Airport] handled approximately [N] passengers per year.",
          demo: "Airport A handled approximately 1.2 million passengers per year."
        },
        {
          qNumber: 7,
          type: "difference",
          badge: "差值比较 · 绝对数值",
          trigger: "看到 B 80万 vs A 120万 (少40万)",
          funcIntent: "并列数值后追加差额非限定短语",
          targets: ["Airport B", "Airport A"],
          skeleton: "[Airport B] served [X] passengers, [Y] fewer than [Airport A].",
          demo: "Airport B served 800,000 passengers annually, 400,000 fewer than Airport A."
        },
        {
          qNumber: 8,
          type: "multiplier",
          badge: "倍数关系 · 两倍",
          trigger: "看到 A 120万 是 C 60万的两倍",
          funcIntent: "倍数与代词替代 (those at...)",
          targets: ["Airport A", "Airport C"],
          skeleton: "Passenger numbers at [A] were exactly twice those at [C].",
          demo: "Passenger numbers at Airport A were exactly twice those at Airport C."
        },
        {
          qNumber: 9,
          type: "ranking",
          badge: "极值排序 · 最少",
          trigger: "看到 Airport C 最低",
          funcIntent: "底端规模与从句修饰",
          targets: ["Airport C"],
          skeleton: "[Airport C] had the lowest traffic, with [X] passengers traveling through it.",
          demo: "Airport C had the lowest traffic, with 600,000 passengers traveling through it."
        },
        {
          qNumber: 10,
          type: "total",
          badge: "总计与平均",
          trigger: "看到 1.2M + 0.8M + 0.6M = 2.6M",
          funcIntent: "全项求和归纳",
          targets: ["Airport A", "Airport B", "Airport C"],
          skeleton: "In total, the three airports accommodated [N] passengers over the period.",
          demo: "In total, the three airports accommodated 2.6 million passengers over the period."
        }
      ],
      synonymGroups: [
        {
          category: "主题词 · 客流量 / 旅客",
          words: [
            { en: "passenger numbers", note: "旅客数量（复数）" },
            { en: "passenger traffic", note: "客流总量（不可数）" },
            { en: "passengers", note: "乘客人数" }
          ]
        },
        {
          category: "动词 · 接待 / 服务 / 吞吐",
          words: [
            { en: "handled", note: "处理/吞吐（机场最地道）" },
            { en: "served", note: "服务接待" },
            { en: "accommodated", note: "容纳/接待（大规模）" },
            { en: "traveled through...", note: "途经该机场" }
          ]
        },
        {
          category: "比较与倍数代词",
          words: [
            { en: "twice those at...", note: "是...的两倍（代词 those 替代 numbers）" },
            { en: "400,000 fewer than...", note: "比...少 40 万" },
            { en: "the lowest traffic", note: "最低客流量" }
          ]
        }
      ],
      stepsGuide: {
        step1: "1. 识别关系：A 120万(最多)；B 80万；C 60万(最少)；B比A少40万；A是C的整整2倍；总计260万。",
        step2: "2. 对应功能：客流吞吐 / 差值描述 / 倍数比较 (注意代词 those) / 极值排序 / 总量归纳。",
        step3: "3. 提取骨架：避免用 than Airport C（逻辑错误），必须用 than that/those at Airport C。",
        step4: "4. 填入数据：注意单位 passengers per year 与 million 的搭配。"
      }
    },

    // 题组 3：近似数字：四种能源
    "task1-group-03": {
      groupId: "task1-group-03",
      chartType: "pie",
      chartTitle: "四种能源消耗占比 (Energy Sources)",
      unit: "%",
      chartData: [
        { label: "煤炭 (Coal)", value: 51, unit: "%", color: "#264653" },
        { label: "天然气 (Gas)", value: 24, unit: "%", color: "#2a9d8f" },
        { label: "核能 (Nuclear)", value: 14, unit: "%", color: "#e9c46a" },
        { label: "可再生能源 (Renewables)", value: 11, unit: "%", color: "#e76f51" }
      ],
      relations: [
        {
          qNumber: 11,
          type: "approximate",
          badge: "刚过半 · just over half",
          trigger: "看到 51% (略微大于 50%)",
          funcIntent: "半数临界近似表达",
          targets: ["煤炭 (Coal)"],
          skeleton: "[Category] made up just over half of all [topic], at 51%.",
          demo: "Coal made up just over half of all energy consumption, at 51%."
        },
        {
          qNumber: 12,
          type: "approximate",
          badge: "将近四分之一 · just under a quarter",
          trigger: "看到 24% (略微小于 25%)",
          funcIntent: "四分之一临界近似表达",
          targets: ["天然气 (Gas)"],
          skeleton: "Natural gas accounted for just under a quarter of the total.",
          demo: "Natural gas accounted for just under a quarter of the total, at 24%."
        },
        {
          qNumber: 13,
          type: "approximate",
          badge: "大约 · roughly / approximately",
          trigger: "看到 14% 和 11%",
          funcIntent: "中低比例模糊量化",
          targets: ["核能 (Nuclear)", "可再生能源 (Renewables)"],
          skeleton: "Nuclear energy and renewables supplied roughly [X]% and [Y]% respectively.",
          demo: "Nuclear power and renewable sources provided approximately 14% and 11% respectively."
        }
      ],
      synonymGroups: [
        {
          category: "近似修饰词 (Approximations)",
          words: [
            { en: "just over half", note: "刚过半（51%–53%）" },
            { en: "just under a quarter", note: "将近四分之一（23%–24%）" },
            { en: "roughly / approximately", note: "大约/概略" },
            { en: "almost / nearly", note: "差不多达到" }
          ]
        },
        {
          category: "能源与供应动词",
          words: [
            { en: "energy consumption", note: "能源消耗" },
            { en: "supplied / provided", note: "供应/提供能源" },
            { en: "renewable sources", note: "可再生能源" }
          ]
        }
      ],
      stepsGuide: {
        step1: "1. 识别关系：51% 刚好过半 (50%)；24% 刚好接近 1/4 (25%)；核能与可再生能源分别占 14% 与 11%。",
        step2: "2. 对应功能：分数近似 (just over half / just under a quarter) / 分别列举 (respectively)。",
        step3: "3. 提取骨架：不要只会写 exactly 51%，灵活使用分数比写死数字在评分标准中词汇多样性得分更高！",
        step4: "4. 填入数据：核对 51% 与 24% 的近似度。"
      }
    }
  };

  /**
   * 智能获取或生成题组视觉与骨架数据
   * 针对未预置详细数据的题组，自动根据 context 和 note 提炼出通用视觉与词库！
   */
  function getVisualScaffoldForGroup(group) {
    if (!group) return null;
    if (TASK1_VISUAL_SCAFFOLDS[group.id]) {
      return TASK1_VISUAL_SCAFFOLDS[group.id];
    }

    // 通用降级配置：从 group.context 和 group.label 智能解析
    const label = group.label || "";
    const context = group.context || "";
    const isPie = label.includes("饼图") || context.includes("%");
    const isTable = label.includes("表格");
    const isLine = label.includes("折线") || label.includes("趋势") || label.includes("2000–") || label.includes("1990年");

    let chartType = "bar";
    if (isPie) chartType = "pie";
    else if (isTable) chartType = "table";
    else if (isLine) chartType = "line";

    return {
      groupId: group.id,
      chartType,
      chartTitle: label,
      chartData: [],
      genericContext: context,
      genericNote: group.note,
      relations: (group.questions || []).map((q, idx) => ({
        qNumber: q.number,
        badge: `核心表达 #${idx + 1}`,
        trigger: q.chinese,
        funcIntent: "表达骨架练习",
        targets: [],
        skeleton: q.answer,
        demo: q.answer
      })),
      synonymGroups: [
        {
          category: "高频学术替换 (Academic Synonyms)",
          words: [
            { en: "account for / make up", note: "占比与构成" },
            { en: "proportion / percentage", note: "比例与份额" },
            { en: "experience a rise / drop", note: "趋势变化" },
            { en: "in comparison with...", note: "相较而言" }
          ]
        }
      ],
      stepsGuide: {
        step1: `1. 观察背景数据：${context}`,
        step2: "2. 识别主次关系：找出最高点、最低点、最大差距或转折。",
        step3: "3. 匹配功能抽屉：调用占比、比较、趋势或排序经典句型。",
        step4: `4. 避免易错陷阱：${group.note || "注意单位与代词一致性。"}`
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
