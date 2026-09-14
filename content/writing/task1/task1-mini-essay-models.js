// Task 1 四段式小作文沉浸工坊核心数据与题型自适应双思维模型包 (Task 1 Mini-Essay Models v2)
// 核心职责：
// 1. 消除千图一面与套话重复：按雅思 6 大题型（动态趋势、静态占比、多主体对比、变迁地图、工序流程、复合双图）彻底解耦专属思维与高分词句抽屉
// 2. 贯彻 5 到 6.5 分提分红线：严禁 Overview 堆砌流水账数字，提供 130–170 词理想区间的标准 4 段式示范
(() => {
  "use strict";

  // =========================================================================
  // 1. 雅思 6 大题型专属高分实战词句库矩阵 (Type-Specific Functional Chunks)
  // =========================================================================

  const TYPE_SPECIFIC_FUNCTIONAL_CHUNKS = {
    // 题型 1: 动态趋势型 (Line Graphs, Trend Bars, Multi-period Tables)
    trend: [
      {
        category: "趋势走势与幅度 (Trajectories & Movements)",
        icon: "📈",
        words: [
          { en: "experienced a sustained upward trajectory", note: "全程呈现持续平稳上升轨迹" },
          { en: "witnessed a precipitous decline", note: "经历了陡峭剧烈的下滑" },
          { en: "surged dramatically to reach [N]", note: "大幅激增，冲至某个数值" },
          { en: "rose steadily throughout the period", note: "在整个周期内稳步爬升" },
          { en: "underwent a continual downward slide", note: "经历了不可逆的持续阴跌" },
          { en: "plummeted to an all-time low of [N]", note: "暴跌至历史最低点" }
        ]
      },
      {
        category: "极值、平稳与波动 (Peaks, Plateaus & Fluctuations)",
        icon: "⛰️",
        words: [
          { en: "peaked at [N] in [Year]", note: "在某年冲上多少的峰值" },
          { en: "plateaued at around [N] for the remainder", note: "在多少的高位/平位维持平稳" },
          { en: "bottomed out at [N] before recovering", note: "探底多少后企稳回升" },
          { en: "fluctuated marginally between [A] and [B]", note: "在两者之间轻微窄幅波动" },
          { en: "remained virtually static at [N]", note: "几乎完全静止保持在某数值" }
        ]
      },
      {
        category: "交汇与反超 (Overtaking & Milestones)",
        icon: "🔀",
        words: [
          { en: "overtook [A] to become the predominant ...", note: "反超A项成为最主要的类别 (冲分关键)" },
          { en: "intersected with ... around [Year]", note: "在某年左右与另一条线产生交点" },
          { en: "widened the gap with ... considerably", note: "大幅拉开了与后者的差距" },
          { en: "narrowed the difference significantly", note: "显著缩小了两者之间的差距" },
          { en: "reversing their relative positions by [Year]", note: "在某年彻底逆转了彼此的相对位次" }
        ]
      },
      {
        category: "时间与阶段承接 (Chronological Transitions)",
        icon: "⏳",
        words: [
          { en: "Starting from an initial figure of [N], ...", note: "从最初的多少数值起跑..." },
          { en: "Over the course of the subsequent decade, ...", note: "在随后的十年时间历程中..." },
          { en: "By the final year of the timeline, ...", note: "截止到该统计周期的最后一年..." },
          { en: "During the first half of the timeframe, ...", note: "在前半段观察周期内..." }
        ]
      },
      {
        category: "动态引言与总述 (Intro & Dynamic Overview)",
        icon: "🌟",
        words: [
          { en: "The line graph illustrates changes in ... over a [N]-year span", note: "折线图展示了跨越若干年间的变动走势" },
          { en: "Overall, it is readily apparent that ... experienced substantial growth, while ...", note: "总体而言，显而易见两增一减大势 (无碎数字)" },
          { en: "exhibited a clear upward trajectory throughout", note: "展现了清晰贯穿始终的上升轨迹" },
          { en: "the opposite pattern was observed in ...", note: "而相反的下行模式则出现在..." }
        ]
      }
    ],

    // 题型 2: 静态占比与顺位型 (Pie Charts, Proportions, Single-Year Bars)
    static: [
      {
        category: "份额与占比 (Shares & Proportions)",
        icon: "🥧",
        words: [
          { en: "accounted for the lion's share of ...", note: "占据了绝大部分的主导份额" },
          { en: "represented roughly [N]% of the total", note: "大约代表了总量的百分之几" },
          { en: "constituted a mere [N]%", note: "仅构成区区微不足道的百分之几" },
          { en: "made up the vast majority of ...", note: "构成了全部项的绝大多数" },
          { en: "occupied the remaining fraction", note: "占据了余下的碎小零星份额" }
        ]
      },
      {
        category: "顺位与梯级 (Rankings & Tiers)",
        icon: "🥇",
        words: [
          { en: "stood out as the primary contributor at [N]%", note: "以多少比例作为最主要的贡献项领跑" },
          { en: "ranked as the second-largest category", note: "位列第二大类别，紧随其后" },
          { en: "followed closely behind at [N]%", note: "紧随其后排在第二" },
          { en: "trailed far behind at merely [N]%", note: "远远落后，垫底仅有百分之几" },
          { en: "formed the secondary tier alongside ...", note: "与另一项共同构成第二中间梯队" }
        ]
      },
      {
        category: "倍数与落差 (Multipliers & Margins)",
        icon: "⚖️",
        words: [
          { en: "was nearly [N] times as high as ...", note: "是后者的将近几倍之多" },
          { en: "outnumbered ... by approximately two to one", note: "以大约 2:1 的压倒性优势大幅超出" },
          { en: "was [N] percentage points higher than ...", note: "比...高出若干个百分点 (严禁错用 percent)" },
          { en: "exceeded the combined sum of the remaining categories", note: "超过了其余所有细项合计之和" }
        ]
      },
      {
        category: "静态引言与总述 (Intro & Static Overview)",
        icon: "🌟",
        words: [
          { en: "The pie chart illustrates the breakdown of ... across [N] categories", note: "该饼图展示了在若干个细分项上的开支细分" },
          { en: "Overall, it is readily apparent that ... accounted for the lion's share, while ...", note: "总述主导绝对大项与微弱细小项 (绝无具体数字)" },
          { en: "dominated the overall distribution by a wide margin", note: "以巨大优势统治了整体份额分布格局" }
        ]
      },
      {
        category: "段落过渡与转折 (Transitions & Connectors)",
        icon: "🔗",
        words: [
          { en: "Looking first at the dominant expenditures, ...", note: "首先看最为突出的第一梯队主项..." },
          { en: "Turning to the minor segments, ...", note: "转向中尾部的其余细分项目..." },
          { en: "In stark contrast, ...", note: "形成极其鲜明的反差对比..." },
          { en: "By comparison, ...", note: "相较而言，..." }
        ]
      }
    ],

    // 题型 3: 多主体横向对比型 (Grouped Bars, Comparative Tables, Multi-entity)
    comparison: [
      {
        category: "横向优劣与对战 (Cross-Entity Matchups)",
        icon: "🥊",
        words: [
          { en: "consistently outperformed ... across all metrics", note: "在所有考察指标上均持续压制胜出" },
          { en: "lagged significantly behind its counterparts", note: "显著落后于对比的其他同类对象" },
          { en: "showed a markedly contrasting profile", note: "呈现出截然相反的结构特征" },
          { en: "was virtually on par with ...", note: "几乎与...完全并驾齐驱、平分秋色" }
        ]
      },
      {
        category: "差距与悬殊反差 (Disparities & Anomalies)",
        icon: "📊",
        words: [
          { en: "the disparity was most pronounced in terms of ...", note: "在...方面两者的差距表现得最为悬殊" },
          { en: "with the notable exception of ...", note: "除了某项格外引人注目的特例之外" },
          { en: "reversed the general trend by ...", note: "逆转了普遍趋势，呈现反向特征" },
          { en: "registered double the volume of ...", note: "录得对方整整两倍的吞吐规模" }
        ]
      },
      {
        category: "对比引言与总述 (Intro & Comparison Overview)",
        icon: "🌟",
        words: [
          { en: "The table compares ... across [N] major institutions in [Year]", note: "表格比较了若干家机构在某年份的数据" },
          { en: "Overall, [Entity A] exhibited the highest figures across the majority of metrics", note: "总述主体A多数指标领先，而主体B垫底 (无碎数字)" },
          { en: "clear contrasts can be observed between ... and ...", note: "在两者之间能观察到鲜明对照格局" }
        ]
      },
      {
        category: "段落衔接 (Cohesion)",
        icon: "🔗",
        words: [
          { en: "Looking first at the leading facilities, ...", note: "首先审视处于领头羊位置的机构..." },
          { en: "In sharp contrast, regional facilities handled considerably fewer ...", note: "形成鲜明对比的是，次要机构处理量明显少得多..." },
          { en: "Further down the ranking, ...", note: "顺着排位进一步向下看..." }
        ]
      }
    ],

    // 题型 4: 地理演变与地图改造 (Before & After Maps, Urban Redevelopment)
    map: [
      {
        category: "拆除与清理 (Demolition & Removal)",
        icon: "🚜",
        words: [
          { en: "was pulled down to make way for ...", note: "被彻底拆除以腾出空间新建某设施 (8分必备)" },
          { en: "was completely demolished", note: "被夷为平地彻底拆毁" },
          { en: "was cleared and replaced by ...", note: "被清理移除并被某新建筑所取代" },
          { en: "saw the complete clearance of ...", note: "见证了某旧旧区域的全部清退" }
        ]
      },
      {
        category: "新建与扩建 (Construction & Expansion)",
        icon: "🏗️",
        words: [
          { en: "witnessed the construction of a brand-new ...", note: "见证了某座全新配套设施的落成拔地而起" },
          { en: "a new [facility] was erected on the former site of ...", note: "在某设施的旧址上拔地建起了全新建筑" },
          { en: "expanded substantially northward", note: "向北侧方向大幅度延伸扩建" },
          { en: "was extended towards the coastline", note: "被延伸铺设至海岸线沿线" }
        ]
      },
      {
        category: "改建与功能置换 (Conversion & Modernization)",
        icon: "🔄",
        words: [
          { en: "underwent comprehensive redevelopment", note: "经历了全方位的综合现代化改造" },
          { en: "was converted into a pedestrian zone", note: "被改造转化成了步行商业街区" },
          { en: "was repurposed into residential apartments", note: "被重新规划改作现代化居住公寓" },
          { en: "modernized into state-of-the-art facilities", note: "被翻新升级为顶尖现代化配套" }
        ]
      },
      {
        category: "空间方位与布局 (Spatial & Cardinal Positions)",
        icon: "🧭",
        words: [
          { en: "situated directly to the north of ...", note: "正坐落在...的正北方位置" },
          { en: "flanked by [A] on the west and [B] on the east", note: "西侧紧邻A，东侧紧邻B，呈左右环绕夹峙" },
          { en: "adjacent to the central waterfront", note: "紧挨着中央滨水核心景观区" },
          { en: "occupying the south-eastern quadrant", note: "占据了整座城镇的东南象限区域" },
          { en: "in close proximity to the railway station", note: "与新建火车站仅一步之遥、紧密相连" }
        ]
      },
      {
        category: "地图引言与总述 (Intro & Map Overview)",
        icon: "🌟",
        words: [
          { en: "The maps illustrate the key spatial modifications made to ... between [Year] and [Year]", note: "两幅地图展示了某区域在若干年间的重大空间重构" },
          { en: "Overall, the area underwent extensive modernization, transforming from a largely rural site into a developed urban district", note: "总述从工农业旧态向现代商住区的全面转型 (无碎数字)" },
          { en: "residential amenities replaced industrial infrastructure", note: "居住休闲配套全面取代了重工业基建" }
        ]
      }
    ],

    // 题型 5: 工艺流程与生命周期 (Process Flow, Industrial Lifecycles)
    process: [
      {
        category: "工序启始与原料 (Initiation & Intake)",
        icon: "🌱",
        words: [
          { en: "The process commences with the manual collection of ...", note: "该流程始于手工采摘收集原辅料" },
          { en: "The initial stage involves harvesting the raw material", note: "第一阶段涉及采集未加工天然原料" },
          { en: "First and foremost, the substances are sorted and cleaned", note: "首当其冲的是将物料进行初级分选与清洗" }
        ]
      },
      {
        category: "工艺处理与被动语态 (Transformations & Passive Actions)",
        icon: "⚙️",
        words: [
          { en: "is subsequently fed into a cylindrical chamber", note: "随后被送入圆柱形反应舱室内 (被动式)" },
          { en: "is subjected to intense heat and high pressure", note: "经受高温与高压的深度物理加工 (被动式)" },
          { en: "undergoes rigorous mechanical filtration", note: "经历极其严密的机械过滤筛选" },
          { en: "is finely ground into a uniform powder", note: "被细细研磨成均匀细腻的粉末" },
          { en: "is cooled down before being transferred to ...", note: "经充分冷却降温后，再被转运至下一工序" }
        ]
      },
      {
        category: "工序衔接与因果递进 (Sequential Cohesion)",
        icon: "🔗",
        words: [
          { en: "Once this phase has concluded, the material is routed to ...", note: "一旦该环节结束，原料即被导向至..." },
          { en: "Following this step, the resulting mixture ...", note: "紧接着这一步，所产生的混合物..." },
          { en: "After undergoing fermentation, the beans are spread out to dry", note: "在经历发酵后，物料被铺平晾干..." },
          { en: "At this juncture of the operation, ...", note: "在这一关键生产工序节点..." }
        ]
      },
      {
        category: "成品产出与分装 (Culmination & Output)",
        icon: "📦",
        words: [
          { en: "culminates in the automated packaging of ...", note: "在全自动化灌装封装环节达到最终完成" },
          { en: "is vacuum-sealed into airtight containers", note: "被抽真空紧密封存进气密容器内" },
          { en: "is finally dispatched for commercial retail distribution", note: "最终被装车发货运往各大零售超市上架" }
        ]
      },
      {
        category: "流程引言与总述 (Intro & Process Overview)",
        icon: "🌟",
        words: [
          { en: "The flow diagram details the sequential stages involved in the production of ...", note: "流程图详细展示了生产某商业成品的连续阶段" },
          { en: "Overall, the process comprises [N] distinct stages, beginning with ... and culminating in ...", note: "总述全工序包含若干主要阶段，始于原料止于分装 (无碎数字)" }
        ]
      }
    ],

    // 题型 6: 综合双图复合型 (Mixed / Dual Charts: Pie + Bar, Table + Line)
    mixed: [
      {
        category: "跨图联动与综合互证 (Cross-Chart Synthesis & Correlations)",
        icon: "🧩",
        words: [
          { en: "Taking both charts into consideration, ...", note: "将两幅图表结合起来综合审视考察..." },
          { en: "A closer inspection of the accompanying bar chart reveals ...", note: "仔细观察配套的柱状图则进一步揭示出..." },
          { en: "corresponded directly to the pattern observed in ...", note: "与在另一张图中所观察到的格局直接吻合互证" },
          { en: "presents a striking correlation between [A] and [B]", note: "在宏观指标A与具体现象B之间呈现出惊人的相关性" }
        ]
      },
      {
        category: "双图引言与总述 (Intro & Dual-Chart Overview)",
        icon: "🌟",
        words: [
          { en: "The charts provide a comprehensive breakdown of ... through both [Chart A] and [Chart B]", note: "两图分别通过图A与图B提供了关于该主题的详实数据" },
          { en: "Overall, while [Macro Trend in Chart 1], [Detailed Phenomenon in Chart 2]", note: "总述一句话打通双图核心宏观反差与联系 (无碎数字)" }
        ]
      }
    ]
  };

  // 全局保底通用词库（向后兼容旧调用，包含 5 大标准通用类别）
  const GLOBAL_FUNCTIONAL_CHUNKS = [
    {
      category: "引言改写 (Introduction)",
      icon: "🎯",
      words: [
        { en: "The chart illustrates ...", note: "图表展示了... (最经典学术引出)" },
        { en: "compares the proportion of ...", note: "比较了...的比例份额" },
        { en: "provides a breakdown of ...", note: "提供了...的细分数据" },
        { en: "over a ...-year period from ... to ...", note: "在从...到...的若干年期间" },
        { en: "in terms of ...", note: "在...方面 / 就...而言" },
        { en: "reveals notable changes in ...", note: "揭示了在...方面的显著变化" }
      ]
    },
    {
      category: "Overview 宏观总述 (Band 7+ 关键)",
      icon: "🌟",
      words: [
        { en: "Overall, it is readily apparent that ...", note: "总体而言，显而易见的是... (绝无琐碎数字)" },
        { en: "accounted for the lion's share of ...", note: "占据了绝大部分的主导份额" },
        { en: "stood out as the primary contributor", note: "作为最主要的贡献项尤为突出" },
        { en: "trailed far behind at merely ...", note: "远远落后，仅为..." },
        { en: "experienced an upward trajectory throughout", note: "全程呈现持续上升轨迹" },
        { en: "while the opposite pattern was observed in ...", note: "而相反的走势则出现在..." },
        { en: "dominated the overall distribution", note: "主导了整体的分布格局" }
      ]
    },
    {
      category: "主体数据引出与排位 (Data & Ranking)",
      icon: "📊",
      words: [
        { en: "represented roughly [N]% of the total", note: "大约占总量的百分之几" },
        { en: "constituted the second largest category at [N]%", note: "以百分之几位列第二大类别" },
        { en: "ranked second, following closely behind", note: "紧随其后，位列第二" },
        { en: "made up three quarters of all ...", note: "构成了全部...的四分之三" },
        { en: "peaked at [N] in [Year]", note: "在某年冲上多少的峰值" },
        { en: "plummeted to a record low of [N]", note: "暴跌至多少的历史低谷" },
        { en: "remained relatively steady at ...", note: "保持相对稳定在..." }
      ]
    },
    {
      category: "比较、倍数与差值 (Comparisons & Multipliers)",
      icon: "⚖️",
      words: [
        { en: "In stark contrast, ...", note: "形成鲜明对比的是..." },
        { en: "By comparison, ...", note: "相较而言，..." },
        { en: "was nearly four times as high as ...", note: "是...的将近四倍之高" },
        { en: "outnumbered ... by approximately two to one", note: "以大约二比一的比例大幅超出..." },
        { en: "was [N] percentage points higher than ...", note: "比...高出若干个百分点 (防错用percent)" },
        { en: "whereas the figure for ... was only ...", note: "而...对应的数据仅有..." }
      ]
    },
    {
      category: "段落推进与过渡 (Cohesion & Connectors)",
      icon: "🔗",
      words: [
        { en: "Looking first at the dominant features, ...", note: "首先看最为突出的主要特征..." },
        { en: "Turning next to the remaining categories, ...", note: "接下来转向剩余的几个细分项..." },
        { en: "With regard to ..., it witnessed ...", note: "关于...方面，它经历了..." },
        { en: "In terms of ..., ... respectively", note: "在...方面，分别为... (句末对应)" },
        { en: "Subsequently, the process involves ...", note: "随后，该工序包括... (流程与地图关键)" }
      ]
    }
  ];

  /**
   * 根据题型自适应获取专属高分词库抽屉
   */
  function getChunksForArchetype(archetype) {
    if (!archetype) return GLOBAL_FUNCTIONAL_CHUNKS;
    const cleanKey = String(archetype).toLowerCase().trim();
    return TYPE_SPECIFIC_FUNCTIONAL_CHUNKS[cleanKey] ||
           TYPE_SPECIFIC_FUNCTIONAL_CHUNKS.static ||
           GLOBAL_FUNCTIONAL_CHUNKS;
  }

  // =========================================================================
  // 2. 核心代表题组专属双思维切入角度与 4 段式小作文模型 (高分标准 140–160 词)
  // =========================================================================

  const TASK1_MINI_ESSAY_REGISTRY = {
    // -----------------------------------------------------------------------
    // Group 01: 静态 6 项家庭支出构成 (Pie Chart · 6 项扩展数据)
    // -----------------------------------------------------------------------
    "task1-group-01": {
      topic: "家庭年度支出构成 (Annual Household Expenditure Breakdown)",
      chartType: "pie",
      archetype: "static",
      thinkingAngles: {
        angleA: {
          id: "angleA",
          label: "思路 A：按数值主导梯次划分（头部主导 vs 中尾部次要）",
          concept: "第一梯队两强 (Housing 35% + Food 25% = 60%) 独占六成主力 ➔ 中段梯队 (Transport 15% + Healthcare 12%) ➔ 尾部小项 (Recreation 8% + Clothing 5%) 构成鲜明阶梯。",
          overviewLogic: "总述住房与食品餐饮合占全家开销大半主导地位，而服饰穿着占比最小（绝不提细碎数字）。",
          body1Logic: "第一梯队：详述第一大项住房 (35%) 与第二大项食品 (25%)，两项合并占比高达六成。",
          body2Logic: "次席与尾部：交通 (15%) 略超医疗 (12%)；娱乐 (8%) 与服饰 (5%) 垫底，住房支出是服饰的整整 7 倍。",
          highlightElements: ["住房 (Housing)", "食品餐饮 (Food & Groceries)"]
        },
        angleB: {
          id: "angleB",
          label: "思路 B：按生活生存刚需 vs 弹性可支配属性划分（思辨深刻）",
          concept: "生存与健康刚性保障开支 (Housing 35% + Food 25% + Healthcare 12% = 72%) 占据超七成预算 ➔ 弹性发展与享受型开销 (Transport 15% + Recreation 8% + Clothing 5%)。",
          overviewLogic: "家庭预算绝大部分被刚性生活与健康开支消耗，可用于弹性穿着与娱乐的自由预算极为有限。",
          body1Logic: "生存刚需：住房、食品与医疗三项合计消耗了家庭超过七成的总预算，构成了家庭消费的绝对支柱。",
          body2Logic: "弹性支出：交通作为通勤开支占 15%，而娱乐与服饰仅分别获得 8% 和 5% 的预算，边缘化特征明显。",
          highlightElements: ["医疗保健 (Healthcare)", "休闲娱乐 (Recreation)", "服饰穿着 (Clothing)"]
        }
      },
      paragraphSteps: [
        {
          stepId: "intro",
          stepNumber: 1,
          title: "Step 1: Introduction (题目与图表改写)",
          role: "引言段 · 题目与分类规范改写",
          chinesePrompt: "该饼图展示了某欧洲国家普通家庭在2020年全年在六项不同类别上的支出构成比例分配。",
          canonicalAnswer: "The pie chart illustrates the breakdown of annual household expenditure across six categories in a European country in 2020.",
          acceptableVariants: [
            "The pie chart provides a breakdown of how households allocated their annual budget across six distinct sectors in 2020."
          ],
          strategyTip: "用 illustrates the breakdown of... across six categories 规范改写主题与分类数量。",
          keyChunks: ["The pie chart illustrates the breakdown of ... in [Year]", "represented roughly [N]% of the total"]
        },
        {
          stepId: "overview",
          stepNumber: 2,
          title: "Step 2: Overview (宏观总述 · 冲6.5分关键)",
          role: "总述段 · 宏观极值与大格局 (严禁细碎数字)",
          chinesePrompt: "总体而言，显而易见的是，住房和食品餐饮占据了家庭开支的绝大部分份额，而服饰穿着则是所有项目中所占比例最小的支出。",
          canonicalAnswer: "Overall, it is readily apparent that housing and food accounted for the lion's share of total household expenditure, whereas clothing represented the least significant outlay.",
          acceptableVariants: [
            "Overall, housing and food dominated family budgets by a wide margin, while clothing registered the smallest share among all categories."
          ],
          strategyTip: "冲 6.5 分死律：Overview 严禁写 35%、25% 等具体数字！用 lion's share 与 least significant outlay 宏观定调极值。",
          keyChunks: ["accounted for the lion's share of ...", "trailed far behind at merely [N]%"]
        },
        {
          stepId: "body1",
          stepNumber: 3,
          title: "Step 3: Body Paragraph 1 (主体一：第一梯队主力数据)",
          role: "主体一段 · 核心第一梯队数据与合并",
          chinesePrompt: "具体而言，住房以35%的比例高居所有支出首位；食品餐饮紧随其后位列第二，占25%，这两项生存刚需合计构成了全国家庭总支出的六成。",
          canonicalAnswer: "Looking first at the dominant expenditures, housing represented the largest single proportion at 35%, closely followed by food and groceries, which constituted a substantial 25%. Together, these two primary categories made up exactly six-tenths of the overall family budget, confirming their role as essential living requirements.",
          acceptableVariants: [
            "In detail, housing was the primary expense at 35%, with food ranking second at 25%, collectively comprising 60% of total expenditure."
          ],
          strategyTip: "用 Looking first at the dominant expenditures 引出，并用 closely followed by 和 together made up six-tenths 归纳合并比例。",
          keyChunks: ["stood out as the primary contributor at [N]%", "ranked as the second-largest category, following closely behind"]
        },
        {
          stepId: "body2",
          stepNumber: 4,
          title: "Step 4: Body Paragraph 2 (主体二：中尾部梯次与倍数对比)",
          role: "主体二段 · 次要数据与倍数/差值对比",
          chinesePrompt: "相较之下，交通出行占15%，略高于医疗保健的12%；而休闲娱乐与服饰穿着则排在末尾，分别仅占8%和5%，其中住房开销是服饰开销的整整七倍。",
          canonicalAnswer: "In comparison, transport accounted for 15% of annual outlays, which was 3 percentage points higher than healthcare at 12%. By contrast, recreation and clothing trailed far behind at merely 8% and 5% respectively, with the total expenditure on accommodation being seven times as high as that on clothing.",
          acceptableVariants: [
            "Turning to the remaining areas, transport stood at 15%, slightly outpacing healthcare (12%), while recreation and clothing made up just 8% and 5% respectively."
          ],
          strategyTip: "用 percentage points higher 表达差值，用 seven times as high as 凸显极值倍数对比。",
          keyChunks: ["was nearly [N] times as high as ...", "was [N] percentage points higher than ..."]
        }
      ]
    },

    // -----------------------------------------------------------------------
    // Group 02: 多主体对比 5 座英国机场客流量 (Table · 5 项清晰对比数据)
    // -----------------------------------------------------------------------
    "task1-group-02": {
      topic: "英国五座主要机场年客流量对比 (Annual Passenger Volumes across 5 UK Airports)",
      chartType: "table",
      archetype: "comparison",
      thinkingAngles: {
        angleA: {
          id: "angleA",
          label: "思路 A：按机场量级梯级划分（头部枢纽 vs 区域与支线机场）",
          concept: "领跑者希思罗 (4.5m) 独大，几乎相当于后两座机场总和 ➔ 盖特威克 (3.0m) 居次席 ➔ 曼彻斯特 (1.5m)、爱丁堡 (0.8m) 与卢顿 (0.4m) 构成次级梯队。",
          overviewLogic: "总述希思罗机场年客流量高居榜首且远超同类，而卢顿机场接待旅客数量最少。",
          body1Logic: "领跑枢纽：详述希思罗 4.5m 的绝对优势，以及盖特威克 3.0m 的次席地位（比希思罗少 1.5m，是曼彻斯特的两倍）。",
          body2Logic: "区域支线：曼彻斯特录得 1.5m；爱丁堡与卢顿则处于更低位次，分别录得 0.8m 与 0.4m，卢顿不足希思罗的十分之一。",
          highlightElements: ["希思罗 (Heathrow)", "盖特威克 (Gatwick)"]
        },
        angleB: {
          id: "angleB",
          label: "思路 B：按伦敦大都市圈枢纽 vs 外省区域干线功能划分",
          concept: "伦敦核心双子星机场 (Heathrow + Gatwick = 7.5m) 吞吐量巨大 ➔ 外省大都会与苏格兰区域机场 (Manchester + Edinburgh + Luton)。",
          overviewLogic: "旅客吞吐量高度向伦敦两大国际航空枢纽集中，外省与支线机场吞吐规模明显呈现断层。",
          body1Logic: "伦敦双枢纽：希思罗与盖特威克合计运送 7.5 百万人次，占据全表总旅客量的近四分之三。",
          body2Logic: "外省与支线：曼彻斯特为 1.5m，爱丁堡与卢顿合力仅贡献 1.2m，差距悬殊。",
          highlightElements: ["曼彻斯特 (Manchester)", "爱丁堡 (Edinburgh)", "卢顿 (Luton)"]
        }
      },
      paragraphSteps: [
        {
          stepId: "intro",
          stepNumber: 1,
          title: "Step 1: Introduction (题目与表格改写)",
          role: "引言段 · 表格题目与对象改写",
          chinesePrompt: "该表格比较了英国五座主要机场在一年内所接待的旅客总人数。",
          canonicalAnswer: "The table compares the annual passenger volumes handled by five major airports across the United Kingdom.",
          acceptableVariants: [
            "The table provides data regarding the volume of travelers passing through five key airports in the UK in a single year."
          ],
          strategyTip: "表格常用 compares the annual passenger volumes handled by five major airports。",
          keyChunks: ["The table compares ... across [N] major institutions in [Year]", "consistently outperformed ... across all metrics"]
        },
        {
          stepId: "overview",
          stepNumber: 2,
          title: "Step 2: Overview (宏观总述 · 冲6.5分关键)",
          role: "总述段 · 宏观极值与断层梯次 (严禁细碎数字)",
          chinesePrompt: "总体而言，显而易见的是，希思罗机场在旅客吞吐量上处于绝对领先地位，而卢顿机场接待的旅客人数最少。",
          canonicalAnswer: "Overall, it is readily apparent that Heathrow was by far the busiest airport in terms of passenger throughput, whereas Luton recorded the lowest volume among the facilities listed.",
          acceptableVariants: [
            "Overall, Heathrow dominated overall traffic figures by a large margin, while Luton handled the fewest passengers."
          ],
          strategyTip: "用 by far the busiest 与 lowest volume 定性概括两极，坚决不写 4.5m、0.4m 等琐碎数值。",
          keyChunks: ["Overall, [Entity A] exhibited the highest figures across the majority of metrics", "the disparity was most pronounced in terms of ..."]
        },
        {
          stepId: "body1",
          stepNumber: 3,
          title: "Step 3: Body Paragraph 1 (主体一：主导枢纽与冠亚军差距)",
          role: "主体一段 · 头部枢纽数据与倍数",
          chinesePrompt: "具体来看，希思罗机场共接待了450万旅客，高居全英之冠；盖特威克机场以300万人次位列第二，虽然比希思罗少了150万人次，但其客流正好是曼彻斯特机场的两倍。",
          canonicalAnswer: "Looking first at the leading hubs, Heathrow handled 4.5 million travelers, firmly establishing itself as the primary aviation center. Gatwick occupied second place with 3.0 million passengers, trailing Heathrow by 1.5 million while handling double the volume of Manchester Airport.",
          acceptableVariants: [
            "In detail, Heathrow ranked first with 4.5 million passengers, followed by Gatwick at 3.0 million, which fell short of Heathrow by 1.5 million but was twice the size of Manchester."
          ],
          strategyTip: "用 firmly establishing itself as the primary aviation center 和 trailing by 1.5 million 增强句式丰富度。",
          keyChunks: ["Looking first at the leading facilities, ...", "registered double the volume of ..."]
        },
        {
          stepId: "body2",
          stepNumber: 4,
          title: "Step 4: Body Paragraph 2 (主体二：区域与支线机场落差)",
          role: "主体二段 · 次席与末尾差距",
          chinesePrompt: "形成鲜明对比的是，其余区域机场客流量要小得多：曼彻斯特录得150万人次，正好是希思罗的三分之一；爱丁堡和卢顿分别录得80万和40万人次，卢顿的客流量甚至不足希思罗的十分之一。",
          canonicalAnswer: "In stark contrast, regional airports handled considerably fewer travelers. Manchester registered 1.5 million passengers, which was exactly one-third of Heathrow's total. Further down the ranking, Edinburgh and Luton accounted for 0.8 million and 0.4 million passengers respectively, with Luton's traffic being less than a tenth of Heathrow's.",
          acceptableVariants: [
            "By contrast, Manchester recorded 1.5 million passengers, while Edinburgh and Luton trailed at 0.8 million and 0.4 million respectively, leaving Luton far behind the leader."
          ],
          strategyTip: "用 In stark contrast 引出反差，用 one-third 和 less than a tenth 进行深层极值倍数对比。",
          keyChunks: ["In sharp contrast, regional facilities handled considerably fewer ...", "Further down the ranking, ..."]
        }
      ]
    },

    // -----------------------------------------------------------------------
    // Group 05: 动态折线 三种交通方式走势 (Line Graph · 3 条曲线跨 20 年)
    // -----------------------------------------------------------------------
    "task1-group-05": {
      topic: "2000–2020年三种交通出行量走势 (Transport Journeys 2000–2020)",
      chartType: "line",
      archetype: "trend",
      thinkingAngles: {
        angleA: {
          id: "angleA",
          label: "思路 A：按走势方向分段（增长类别 vs 下降类别 · 最清晰）",
          concept: "铁路与航空保持持续强劲增长并完成历史性反超 ➔ 公交车则呈现不可逆的长期滑落。",
          overviewLogic: "总述铁路与民航出行在 20 年间大幅攀升，而公共汽车使用量则经历持续滑坡。",
          body1Logic: "上升组：铁路与民航的稳步上升，重点写民航从 10m 暴增至 50m，并在 2012 年首次反超公交车并创新高。",
          body2Logic: "下降组：公交车从初期的统治地位 (45m) 持续下滑至期末垫底 (35m)。",
          highlightElements: ["铁路 (Rail)", "航空 (Air)"]
        },
        angleB: {
          id: "angleB",
          label: "思路 B：按时间节点分期分段（前半程平稳 ➔ 后半程反超与格局分化）",
          concept: "2000–2010 各方式保持固有格局 ➔ 2010–2020 发生关键交叉点（民航反超公交）并形成新格局。",
          overviewLogic: "全周期呈现两增一降格局，且在中间时间节点发生了交通方式主导权的戏剧性易手。",
          body1Logic: "前半程 (2000–2010)：公交车虽在下降但仍居首位，铁路民航缓慢爬坡至接近水平。",
          body2Logic: "后半程 (2010–2020)：民航冲破交叉点反超公交，期末三者位次彻底重构。",
          highlightElements: ["公交 (Bus)"]
        }
      },
      paragraphSteps: [
        {
          stepId: "intro",
          stepNumber: 1,
          title: "Step 1: Introduction (题目与折线图改写)",
          role: "引言段 · 动态折线图改写",
          chinesePrompt: "该折线图展示了2000年至2020年间某国使用三种交通方式（铁路、公交和航空）的人次走势变化。",
          canonicalAnswer: "The line graph illustrates changes in passenger numbers for three modes of transport—rail, bus, and air—in a nation over a 20-year span from 2000 to 2020.",
          acceptableVariants: [
            "The line graph shows the trends in commuter journeys utilizing rail, bus, and air between 2000 and 2020."
          ],
          strategyTip: "动态图务必标注时间跨度 over a 20-year span from 2000 to 2020，用 modes of transport 规范表达。",
          keyChunks: ["The line graph illustrates changes in ... over a [N]-year span", "experienced a sustained upward trajectory"]
        },
        {
          stepId: "overview",
          stepNumber: 2,
          title: "Step 2: Overview (宏观总述 · 冲6.5分关键)",
          role: "总述段 · 宏观两增一减大趋势 (严禁细碎数字)",
          chinesePrompt: "总体而言，显而易见的是，铁路和航空出行在整个时期内经历了显著增长，而公共汽车的使用量则出现了持续下降。",
          canonicalAnswer: "Overall, it is readily apparent that both rail and air travel experienced significant upward trajectories throughout the period, whereas bus usage saw a sustained and marked decline.",
          acceptableVariants: [
            "Overall, both rail and air registered a clear upward trajectory, while bus travel experienced a continuous downward trend."
          ],
          strategyTip: "指出两增一减的总趋势，用 upward trajectories 与 sustained and marked decline 替代简单增减词。",
          keyChunks: ["Overall, it is readily apparent that ... experienced substantial growth, while ...", "exhibited a clear upward trajectory throughout"]
        },
        {
          stepId: "body1",
          stepNumber: 3,
          title: "Step 3: Body Paragraph 1 (主体一：上升组与反超交叉点)",
          role: "主体一段 · 上升趋势与交汇反超",
          chinesePrompt: "具体而言，铁路客流从2000年的2000万人次稳步上升至2020年的5500万人次，跃居首位；航空出行增幅最为惊人，从最初的1000万一路飙升五倍至5000万，并在2012年前后首次反超公共汽车。",
          canonicalAnswer: "Looking first at the expanding transport sectors, rail journeys climbed steadily from 20 million in 2000 to reach 55 million by 2020, becoming the most popular choice. Air travel exhibited an even steeper escalation, soaring fivefold from an initial 10 million to 50 million, overtaking bus services around 2012.",
          acceptableVariants: [
            "In detail, rail journeys rose from 20m to 55m over the period, while air travel grew fivefold from 10m to 50m, surpassing bus around 2012."
          ],
          strategyTip: "overtaking bus services around 2012 是折线图关键反超点的高分写法！",
          keyChunks: ["overtook [A] to become the predominant ...", "surged dramatically to reach [N]"]
        },
        {
          stepId: "body2",
          stepNumber: 4,
          title: "Step 4: Body Paragraph 2 (主体二：下滑组与位次失守)",
          role: "主体二段 · 下降趋势与位次逆转",
          chinesePrompt: "与此形成鲜明对比的是，公共汽车在2000年曾以4500万人次位列榜首，但随后经历持续滑落，到2020年降至3500万人次，沦为最不受欢迎的出行方式。",
          canonicalAnswer: "In stark contrast, bus transport commenced as the undisputed leader at 45 million in 2000. However, it underwent a continual downward slide over the two decades, eventually plummeting to 35 million and dropping to the bottom position.",
          acceptableVariants: [
            "By contrast, although bus was originally the most popular mode with 45m in 2000, it saw a continuous decrease to 35m by 2020, ending in last place."
          ],
          strategyTip: "用 commenced as the undisputed leader 突出初始领先，用 continual downward slide 表达长期疲软走势。",
          keyChunks: ["underwent a continual downward slide", "plummeted to an all-time low of [N]"]
        }
      ]
    },

    // -----------------------------------------------------------------------
    // Group 17: 地图演变 公园现代化改造 (Before & After Map · 5 处显著变迁)
    // -----------------------------------------------------------------------
    "task1-group-17": {
      topic: "公共公园二十年改造规划对比 (Public Park Redevelopment Plan)",
      chartType: "map",
      archetype: "map",
      thinkingAngles: {
        angleA: {
          id: "angleA",
          label: "思路 A：按空间核心与外围分区划分（中心商业化 vs 外围绿化娱乐）",
          concept: "中心核心区景观置换（喷泉拆除改建露天咖啡馆、玫瑰园大幅扩建）➔ 东北与外围区域（草坪改建儿童乐园、环形步道完好保留）。",
          overviewLogic: "总述公园经历了全面的现代化改造，休闲与商业配套取代了单纯的观赏绿地，同时交通走廊完好保留。",
          body1Logic: "中心改建：中央装饰性喷泉被彻底拆除，由带有户外座位的现代咖啡馆所取代；紧邻西侧的原玫瑰园得到大幅扩建。",
          body2Logic: "外围与配套：东北侧开放草坪被改建为儿童游乐区；南门主入口与环形主步道则完整保留。",
          highlightElements: ["中央咖啡馆 (Central Cafe)", "西侧扩建大花园 (Enlarged Garden)"]
        },
        angleB: {
          id: "angleB",
          label: "思路 B：按工程改造性质划分（拆除置换项 vs 扩建增设与保留项）",
          concept: "功能置换与拆除项目（喷泉 ➔ 咖啡馆、草坪 ➔ 游乐场）➔ 扩建与完好保留项目（玫瑰园扩张、主入口步道完好）。",
          overviewLogic: "工程重点在于提升公众参与度与商业活力，在保留原有框架的前提下大幅充实功能属性。",
          body1Logic: "设施置换：喷泉与草地两项传统景观分别被赋予了餐饮与亲子娱乐的实用功能。",
          body2Logic: "保留与扩张：花园面积翻倍以平衡生态绿意，环园路网确保了通达性的延续。",
          highlightElements: ["东北儿童游乐区 (Children's Play Area)", "环形步道 (Circular Footpath)"]
        }
      },
      paragraphSteps: [
        {
          stepId: "intro",
          stepNumber: 1,
          title: "Step 1: Introduction (题目与地图改写)",
          role: "引言段 · 地图改写与时间跨度",
          chinesePrompt: "这两幅规划地图展示了某公共公园在经历全面翻新前后的核心空间布局变迁。",
          canonicalAnswer: "The maps illustrate the key spatial modifications made to a public park between its original layout and its current state following extensive renovation.",
          acceptableVariants: [
            "The diagrams show the alterations that have taken place in a public park before and after a redevelopment project."
          ],
          strategyTip: "地图题经典开篇：illustrate the key spatial modifications made to ... following extensive renovation。",
          keyChunks: ["The maps illustrate the key spatial modifications made to ... between [Year] and [Year]", "underwent comprehensive redevelopment"]
        },
        {
          stepId: "overview",
          stepNumber: 2,
          title: "Step 2: Overview (宏观总述 · 冲6.5分关键)",
          role: "总述段 · 宏观功能转型 (严禁细碎数字)",
          chinesePrompt: "总体而言，显而易见的是，该公园经历了全面的现代化改造，休闲与商业配套取代了单纯的观赏性景观，而通行基础设施则完好保留。",
          canonicalAnswer: "Overall, it is readily apparent that the park underwent comprehensive modernization, with leisure and commercial facilities replacing purely ornamental features, while access infrastructure remained preserved.",
          acceptableVariants: [
            "Overall, the park transformed into a more functional community space, with several recreational amenities added while existing pathways were retained."
          ],
          strategyTip: "地图 Overview 核心：用 underwent comprehensive modernization 和 replacing purely ornamental features 概括功能本质飞跃。",
          keyChunks: ["underwent comprehensive redevelopment", "residential amenities replaced industrial infrastructure"]
        },
        {
          stepId: "body1",
          stepNumber: 3,
          title: "Step 3: Body Paragraph 1 (主体一：中心核心区拆除与扩建)",
          role: "主体一段 · 内部拆除重建与功能置换",
          chinesePrompt: "首先看中心区域的改造：原有的中央装饰性喷泉被彻底拆除，为一座带有露天座位的现代化咖啡馆腾出了空间；紧邻其西侧，原先的玫瑰园得到了显著扩建，成为公园内占地面积最大的自然景观。",
          canonicalAnswer: "Looking first at internal alterations, the central ornamental fountain was pulled down to make way for a modern cafe with outdoor seating. Immediately adjacent to the west, the former rose garden was substantially enlarged, becoming the dominant natural green space in the redesigned park.",
          acceptableVariants: [
            "In the center, the decorative fountain was removed and replaced by a cafe, while the neighboring garden to the west was expanded considerably."
          ],
          strategyTip: "was pulled down to make way for 是地图最高频必背被动语态短语！",
          keyChunks: ["was pulled down to make way for ...", "adjacent to the central waterfront"]
        },
        {
          stepId: "body2",
          stepNumber: 4,
          title: "Step 4: Body Paragraph 2 (主体二：外围新建游乐区与步道保留)",
          role: "主体二段 · 外围增设与设施保留",
          chinesePrompt: "转向周边外围区域：东北角的开阔草坪被改建为专门的儿童游乐区；与此形成对比的是，南侧主入口大门与环绕整个公园的环形主步道均得到了完好保留，确保了游客在全园的漫步通行便利。",
          canonicalAnswer: "Turning to the peripheral sections, the northeastern open lawn was converted into a dedicated children's playground. In contrast, the southern entrance gate and the perimeter circular footpath were intact and retained, ensuring continuity of visitor access throughout the grounds.",
          acceptableVariants: [
            "Regarding the outer areas, a children's play zone replaced the lawn in the northeast, whereas the south gate and circular pathway remained unchanged."
          ],
          strategyTip: "方位介词：northeastern open lawn was converted into ...，保留用 intact and retained。",
          keyChunks: ["was converted into a pedestrian zone", "occupying the south-eastern quadrant"]
        }
      ]
    },

    // -----------------------------------------------------------------------
    // Group 21: 流程工序 咖啡豆加工全流程 (Process Flow · 6 道工艺步骤)
    // -----------------------------------------------------------------------
    "task1-group-21": {
      topic: "咖啡豆商业化加工与包装流程 (Commercial Coffee Production Process)",
      chartType: "flow",
      archetype: "process",
      thinkingAngles: {
        angleA: {
          id: "angleA",
          label: "思路 A：按前后两期工序划分（前期农艺采集与脱浆发酵 ➔ 后期烘焙研磨与分装）",
          concept: "前期原辅料准备（手工采摘成熟浆果、脱浆水洗、发酵晾晒）➔ 后期工业化深加工（去壳、高温烘焙、精细研磨与真空密封包装）。",
          overviewLogic: "总述生产全过程包含六个连续的阶段，始于原料手工采摘，最终在成品分装与物流配送中达到完成。",
          body1Logic: "工序前半程：手工采摘红浆果、机械去除果肉、并在水槽中经历发酵与日晒脱水。",
          body2Logic: "工序后半程：干燥豆脱壳并进入高温烘焙炉、随后被机械研磨成粉并抽真空密封入袋。",
          highlightElements: ["采摘水洗 (Harvest & Ferment)", "烘焙包装 (Roast & Pack)"]
        },
        angleB: {
          id: "angleB",
          label: "思路 B：按物料物理形态转化划分（天然生豆湿法分离 ➔ 热力熟化粉状定型）",
          concept: "湿处理初级分离阶段（利用水流发酵洗除果肉黏膜）➔ 热力转化固化阶段（烘烤变色、粉碎变态与气密包装）。",
          overviewLogic: "全流程通过不可逆的物理与温度加工，将天然多汁果实逐步转化为可直接冲泡消费的粉状商品。",
          body1Logic: "生豆提纯：成熟浆果经机械去肉与水槽脱粘，实现坚硬内豆与果肉的彻底物理分离。",
          body2Logic: "热加工包装：暴晒控水后经受高温烘翻炒激发出香气，最后被粉碎为均一粉末并封装。",
          highlightElements: ["水槽发酵 (Water Fermentation)", "高温烘焙 (High Heat Roasting)"]
        }
      },
      paragraphSteps: [
        {
          stepId: "intro",
          stepNumber: 1,
          title: "Step 1: Introduction (题目与流程图改写)",
          role: "引言段 · 流程图改写",
          chinesePrompt: "该流程图详细展示了从手工采摘成熟咖啡浆果到最终包装上市销售的完整咖啡豆商业化加工工艺流程。",
          canonicalAnswer: "The flow diagram illustrates the sequential stages involved in the commercial production of coffee, from the harvesting of beans to final packaging.",
          acceptableVariants: [
            "The process diagram details the steps required to produce packaged coffee from harvested cherries for retail distribution."
          ],
          strategyTip: "流程图开篇金句：illustrates the sequential stages involved in the commercial production of ...",
          keyChunks: ["The flow diagram details the sequential stages involved in the production of ...", "The process commences with the manual collection of ..."]
        },
        {
          stepId: "overview",
          stepNumber: 2,
          title: "Step 2: Overview (宏观总述 · 冲6.5分关键)",
          role: "总述段 · 宏观阶段数与起止闭环 (严禁细碎数字)",
          chinesePrompt: "总体而言，显而易见的是，该生产流程包含六个主要的连续工序，始于手工采摘原料，并在最终的抽真空包装与分发中达到终点。",
          canonicalAnswer: "Overall, the process comprises six distinct stages, beginning with the manual collection of raw coffee cherries and culminating in the sealed distribution of commercial packages.",
          acceptableVariants: [
            "Overall, production involves a linear series of six stages, commencing with cherry harvesting and ending with packaged products ready for retail."
          ],
          strategyTip: "流程图 Overview 黄金公式：comprises [N] distinct stages, beginning with ... and culminating in ...",
          keyChunks: ["Overall, the process comprises [N] distinct stages, beginning with ... and culminating in ...", "culminates in the automated packaging of ..."]
        },
        {
          stepId: "body1",
          stepNumber: 3,
          title: "Step 3: Body Paragraph 1 (主体一：采摘、去肉、发酵与晾晒)",
          role: "主体一段 · 前道原料初加工",
          chinesePrompt: "该工艺首先从种植园中手工采摘成熟的咖啡豆开始；随后，果皮与果肉被机械剥离，之后剩下的豆子被浸泡在大型水槽中进行发酵，最后被平铺在阳光下彻底晾干。",
          canonicalAnswer: "The process commences when ripe coffee beans are hand-picked from plantations. Subsequently, the outer fruit skin and pulp are mechanically stripped away, after which the remaining beans are submerged in water tanks for fermentation before being spread out in the sun to dry.",
          acceptableVariants: [
            "Initially, cherries are picked by hand. Following this, the flesh is removed, and the beans undergo fermentation in water before sun-drying."
          ],
          strategyTip: "被动语态与工序衔接：The process commences when ... Subsequently, ... are stripped away, after which ... are submerged ...",
          keyChunks: ["The process commences with the manual collection of ...", "Once this phase has concluded, the material is routed to ..."]
        },
        {
          stepId: "body2",
          stepNumber: 4,
          title: "Step 4: Body Paragraph 2 (主体二：脱壳、高温烘焙、研磨与包装)",
          role: "主体二段 · 后道熟化深加工与封装",
          chinesePrompt: "一旦水分彻底脱干，咖啡豆被送入专门的烘烤炉中经受高温翻炒；在完成烘焙后，它们被机械研磨成均匀的粉末，最后被抽真空密封进气密包装中，准备发往各大超市零售。",
          canonicalAnswer: "Once completely dried, the beans are fed into specialized roasting drums and subjected to intense heat. Following the roasting phase, they are finely ground into powder, and finally vacuum-sealed into airtight packages ready for domestic delivery and retail sales.",
          acceptableVariants: [
            "After drying, the beans are roasted at high temperatures. Next, they are ground and eventually vacuum-packed into sealed bags for sale."
          ],
          strategyTip: "阶段推进词：Once completely dried, ... are fed into ... and subjected to ... Following the roasting phase, ... finally vacuum-sealed ...",
          keyChunks: ["is subjected to intense heat and high pressure", "is vacuum-sealed into airtight containers"]
        }
      ]
    }
  };

  // =========================================================================
  // 3. 动态智能小作文生成器 (Dynamic Fallback Engine for Remaining Groups)
  // =========================================================================

  /**
   * 依据题型为任意题组动态装配专业双思维角度与 4 段式高分模型
   */
  function buildDynamicMiniEssayForGroup(groupId, group, scaffoldConfig) {
    const questions = group?.questions || [];
    const q1 = questions[0]?.answer || "The data provides detailed information on this topic.";
    const q2 = questions[1]?.answer || "A significant proportion is observed in the primary category.";
    const q3 = questions[2]?.answer || "Noticeable differences exist among the categories.";
    const q4 = questions[3]?.answer || "The trend illustrates substantial shifts over time.";
    const q5 = questions[4]?.answer || "Overall, the pattern remains distinct across all measures.";

    const title = group?.label || "雅思学术类图表小作文";
    const chartType = scaffoldConfig?.chartType || group?.chartType || "bar";
    
    // 推导 archetype 题型原型
    let archetype = scaffoldConfig?.archetype || "static";
    if (scaffoldConfig?.archetype) {
      archetype = scaffoldConfig.archetype;
    } else if (chartType === "line" || chartType === "bar_grouped" || group?.moduleId === "module-2") {
      archetype = "trend";
    } else if (chartType === "map" || group?.moduleId === "module-5") {
      archetype = "map";
    } else if (chartType === "flow" || chartType === "flow_circular" || group?.moduleId === "module-6") {
      archetype = "process";
    } else if (chartType === "table" || group?.moduleId === "module-4") {
      archetype = "comparison";
    } else if (chartType === "mixed" || group?.moduleId === "module-7") {
      archetype = "mixed";
    } else {
      archetype = "static";
    }

    // 根据不同题型定制专属双思维角度
    let thinkingAngles = {};
    let paragraphSteps = [];

    if (archetype === "trend") {
      thinkingAngles = {
        angleA: {
          id: "angleA",
          label: "思路 A：按走势形态分组（上升组 vs 下降/平稳组 · 最稳妥）",
          concept: "将全周期呈上升或反超的类别归为第一组，持续下降或波动的类别归为第二组，逻辑泾渭分明。",
          overviewLogic: "总述全周期呈现升降分化的总体大势，提炼主要增长项与主要下滑项，严禁带入细碎年份与数值。",
          body1Logic: "上升组：详述领跑与大幅增长的类别，写出起点、爬升斜率以及关键交汇节点。",
          body2Logic: "下降/平稳组：转折对比呈现下行趋势的类别，交代其失守高位与终期跌幅。",
          highlightElements: []
        },
        angleB: {
          id: "angleB",
          label: "思路 B：按时间推进节点分期（初期起跑格局 ➔ 中后期分化与终局）",
          concept: "以关键转折年或交汇年为分水岭，前半段陈述初始排位，后半段汇报戏剧性重塑与终点格局。",
          overviewLogic: "全周期呈现两阶段演变格局，期间发生了关键的主导地位易手与两极分化。",
          body1Logic: "前半程：交代起始年份各项的基准数值与前期的温和发展态势。",
          body2Logic: "后半程：深入描写后半程的剧烈剧变、历史交点以及最终形成的全新排位。",
          highlightElements: []
        }
      };

      paragraphSteps = [
        {
          stepId: "intro",
          stepNumber: 1,
          title: "Step 1: Introduction (题目与走势图改写)",
          role: "引言段 · 动态走势规范改写",
          chinesePrompt: `该图表展示了关于“${title}”在给定历史时期内的动态走势变化。`,
          canonicalAnswer: `The diagram illustrates key changes and trends regarding ${title.toLowerCase()} over the specified timeframe.`,
          acceptableVariants: [`The chart provides an overview of the trajectory of ${title.toLowerCase()} across the recorded years.`],
          strategyTip: "使用 illustrates changes in / delineates the trajectory of 改写主题，标明时间跨度。",
          keyChunks: ["The line graph illustrates changes in ... over a [N]-year span", "experienced a sustained upward trajectory"]
        },
        {
          stepId: "overview",
          stepNumber: 2,
          title: "Step 2: Overview (宏观总述 · 冲6.5分关键)",
          role: "总述段 · 宏观走势升降大势 (绝无具体数字)",
          chinesePrompt: "总体而言，显而易见的是，主要类别在整个周期内经历了显著增长，而其余项目则呈现相反的停滞或下降态势。",
          canonicalAnswer: "Overall, it is readily apparent that the leading category experienced a sustained upward trajectory, whereas the remaining sectors showed stagnant or declining patterns.",
          acceptableVariants: ["Overall, clear upward and downward trends characterized the period, with the principal sector recording substantial growth."],
          strategyTip: "冲 6.5 分死律：Overview 严禁出现具体数字！只提炼宏观升降与反超大势。",
          keyChunks: ["Overall, it is readily apparent that ... experienced substantial growth, while ...", "exhibited a clear upward trajectory throughout"]
        },
        {
          stepId: "body1",
          stepNumber: 3,
          title: "Step 3: Body Paragraph 1 (主体一：主要增长与反超特征)",
          role: "主体一段 · 上升趋势与交汇细节",
          chinesePrompt: `在增长与主导项中：${questions[0]?.chinese || "第一项显著爬升，构成了最主要的变化特征。"}`,
          canonicalAnswer: q1,
          acceptableVariants: [q2],
          strategyTip: "使用 Looking first at the growing categories 启承，精准代入动词与介词搭配 (rose to / surged by)。",
          keyChunks: ["surged dramatically to reach [N]", "overtook [A] to become the predominant ..."]
        },
        {
          stepId: "body2",
          stepNumber: 4,
          title: "Step 4: Body Paragraph 2 (主体二：次要类别与反向变动)",
          role: "主体二段 · 下降走势与终点收尾",
          chinesePrompt: `相比之下，其余处于下滑或平稳状态的项目：${questions[2]?.chinese || "次要类别数据明显落后，呈现持续走低格局。"}`,
          canonicalAnswer: q3 || q4 || q5,
          acceptableVariants: [q4 || q5],
          strategyTip: "使用 In stark contrast 或 By comparison 转折，凸显与主体一段的走势分歧。",
          keyChunks: ["underwent a continual downward slide", "plummeted to an all-time low of [N]"]
        }
      ];
    } else if (archetype === "map") {
      thinkingAngles = {
        angleA: {
          id: "angleA",
          label: "思路 A：按空间地理区域划分（北部/核心区改造 vs 南部/外围新设施）",
          concept: "北部或中央核心区的功能置换 ➔ 南侧、东侧或滨水外围区域的规模拓展与路网铺设。",
          overviewLogic: "总述区域经历了从传统旧态向现代功能区的综合重塑，公共与商业设施显著充实。",
          body1Logic: "核心区改造：详述中心位置旧建筑物的拆除、清退以及取而代之的新设施。",
          body2Logic: "外围区建设：转折描写外围方位的新增基础设施、绿化与主干道延展。",
          highlightElements: []
        },
        angleB: {
          id: "angleB",
          label: "思路 B：按工程改造性质划分（拆除置换工程 vs 全新建造与保留项）",
          concept: "被推倒清理并更换功能的旧设施 ➔ 全新规划落成以及完好保留未动的基础配套。",
          overviewLogic: "改造工程重点体现功能性升级，在保留原有主骨架的同时注入了现代化服务属性。",
          body1Logic: "拆除与置换：旧建筑被推倒拆毁并为新型现代化公共服务设施腾出空间。",
          body2Logic: "新建与保留：周边路网的打通、新建配套设施的落成以及被保留的标志物。",
          highlightElements: []
        }
      };

      paragraphSteps = [
        {
          stepId: "intro",
          stepNumber: 1,
          title: "Step 1: Introduction (题目与地图改写)",
          role: "引言段 · 地图改写与空间范围",
          chinesePrompt: `这两幅规划地图展示了关于“${title}”在改造前后的空间演变与布局变化。`,
          canonicalAnswer: `The maps illustrate the key spatial transformations that have taken place in ${title.toLowerCase()} over the given timeframe.`,
          acceptableVariants: [`The diagrams show the development and layout changes of ${title.toLowerCase()} between the two periods.`],
          strategyTip: "地图开篇：illustrate the key spatial transformations that have taken place in ...",
          keyChunks: ["The maps illustrate the key spatial modifications made to ... between [Year] and [Year]", "underwent comprehensive redevelopment"]
        },
        {
          stepId: "overview",
          stepNumber: 2,
          title: "Step 2: Overview (宏观总述 · 冲6.5分关键)",
          role: "总述段 · 宏观功能重组 (绝无具体数字)",
          chinesePrompt: "总体而言，显而易见的是，该区域经历了全面的现代化重塑，商业与居住设施显著增多，而原有的传统空间则相应缩减。",
          canonicalAnswer: "Overall, it is readily apparent that the area underwent extensive modernization, with modern commercial and residential amenities replacing traditional infrastructure.",
          acceptableVariants: ["Overall, the settlement experienced significant development, becoming far more urbanized and accessible."],
          strategyTip: "地图 Overview 核心：指出从传统到现代的转型 (modernization, urbanized, amenities replacing traditional infrastructure)。",
          keyChunks: ["underwent comprehensive redevelopment", "residential amenities replaced industrial infrastructure"]
        },
        {
          stepId: "body1",
          stepNumber: 3,
          title: "Step 3: Body Paragraph 1 (主体一：主要拆除与核心改建)",
          role: "主体一段 · 核心拆迁与建筑更新",
          chinesePrompt: `在核心区域的变迁中：${questions[0]?.chinese || "主要旧有设施被拆除，并为新配套腾出了空间。"}`,
          canonicalAnswer: q1,
          acceptableVariants: [q2],
          strategyTip: "熟练运用被动语态短语：was pulled down to make way for / was completely replaced by。",
          keyChunks: ["was pulled down to make way for ...", "adjacent to the central waterfront"]
        },
        {
          stepId: "body2",
          stepNumber: 4,
          title: "Step 4: Body Paragraph 2 (主体二：外围扩展与交通保留)",
          role: "主体二段 · 方位延伸与设施保留",
          chinesePrompt: `转向其余外围区域：${questions[2]?.chinese || "道路向外延展，新建配套落成，部分设施得以保留。"}`,
          canonicalAnswer: q3 || q4 || q5,
          acceptableVariants: [q4 || q5],
          strategyTip: "方位表达与方向动词：situated to the north of / extended southwards / was retained intact。",
          keyChunks: ["was converted into a pedestrian zone", "occupying the south-eastern quadrant"]
        }
      ];
    } else if (archetype === "process") {
      thinkingAngles = {
        angleA: {
          id: "angleA",
          label: "思路 A：按工序前后阶段划分（前期原料采集预处理 ➔ 后期精制加工与封装）",
          concept: "前端天然原料的采收、清洁与初级物理分离 ➔ 后端热加工、化学转化以及最终商业包装。",
          overviewLogic: "总述生产全工序包含若干主要阶段，自原材料采集开始，最终在成品灌装与运输流通中完成。",
          body1Logic: "工序前半程：详述最初的原辅料获取、机械分选以及初步清洗或脱浆工序。",
          body2Logic: "工序后半程：深入描写深加工成型、高温处理以及成品的自动化分装与仓储。",
          highlightElements: []
        },
        angleB: {
          id: "angleB",
          label: "思路 B：按物态转化与处理方式划分（机械物理分拣 ➔ 熟化变态与包装）",
          concept: "物理分选处理工段 ➔ 温度热力或化学改性深加工工段。",
          overviewLogic: "全流程通过连贯而不可逆的工业环节，将初级农产品或废旧物料高效转化为高价值商品。",
          body1Logic: "物理预处理：原料的筛选、破碎、清洗除杂与初步沉淀分离。",
          body2Logic: "熟化成型：高温熔融、化学调配、定型压片以及终端抽真空打包包装。",
          highlightElements: []
        }
      };

      paragraphSteps = [
        {
          stepId: "intro",
          stepNumber: 1,
          title: "Step 1: Introduction (题目与流程图改写)",
          role: "引言段 · 流程图改写",
          chinesePrompt: `该流程图详细展示了关于“${title}”从原材料到成品的完整生产加工步骤。`,
          canonicalAnswer: `The diagram illustrates the sequential stages involved in the process of ${title.toLowerCase()}.`,
          acceptableVariants: [`The flow chart details the step-by-step procedure required for ${title.toLowerCase()}.`],
          strategyTip: "流程图经典改写句型：details the sequential stages involved in the production of ...",
          keyChunks: ["The flow diagram details the sequential stages involved in the production of ...", "The process commences with the manual collection of ..."]
        },
        {
          stepId: "overview",
          stepNumber: 2,
          title: "Step 2: Overview (宏观总述 · 冲6.5分关键)",
          role: "总述段 · 阶段数与起止闭环 (绝无具体数字)",
          chinesePrompt: "总体而言，显而易见的是，该生产过程包含多个主要工序，始于初期原料收集，最终以成品包装分发作为结束。",
          canonicalAnswer: "Overall, it is readily apparent that the operation comprises several distinct stages, commencing with initial material collection and concluding with final product packaging and distribution.",
          acceptableVariants: ["Overall, the linear process consists of multiple consecutive steps from raw material intake to commercial dispatch."],
          strategyTip: "流程图 Overview 核心：comprises several distinct stages, commencing with ... and concluding with ...",
          keyChunks: ["Overall, the process comprises [N] distinct stages, beginning with ... and culminating in ...", "culminates in the automated packaging of ..."]
        },
        {
          stepId: "body1",
          stepNumber: 3,
          title: "Step 3: Body Paragraph 1 (主体一：前道工序原料处理)",
          role: "主体一段 · 早期收集与初级准备",
          chinesePrompt: `在初级处理阶段中：${questions[0]?.chinese || "原料被收集进车间，并经历清洗与初步分类。"}`,
          canonicalAnswer: q1,
          acceptableVariants: [q2],
          strategyTip: "全程使用一般现在时被动语态：The process commences with ... / is subsequently transferred to ...",
          keyChunks: ["The process commences with the manual collection of ...", "Once this phase has concluded, the material is routed to ..."]
        },
        {
          stepId: "body2",
          stepNumber: 4,
          title: "Step 4: Body Paragraph 2 (主体二：后道加工与成品包装)",
          role: "主体二段 · 深度精制与封装运输",
          chinesePrompt: `随后进入后续深加工：${questions[2]?.chinese || "物料经受深度精炼，并最终完成密封包装上市。"}`,
          canonicalAnswer: q3 || q4 || q5,
          acceptableVariants: [q4 || q5],
          strategyTip: "工序承接副词：Following this step / is subjected to / culminating in the automated packaging of ...",
          keyChunks: ["is subjected to intense heat and high pressure", "is vacuum-sealed into airtight containers"]
        }
      ];
    } else if (archetype === "comparison") {
      thinkingAngles = {
        angleA: {
          id: "angleA",
          label: "思路 A：按主体横向对战划分（主体 A 表现 vs 主体 B/C 表现）",
          concept: "以主要领跑主体为核心详述其统治性数据 ➔ 对比从属或滞后主体的全方位表现与差距。",
          overviewLogic: "总述特定主体在各项指标上呈现压倒性优势，而其余主体则显著落后，两极分化清晰。",
          body1Logic: "领跑主体：详细罗列第一主体的领先数据、核心绝对值及领先幅度。",
          body2Logic: "对比主体：对比第二梯队与垫底主体的对应表现，突出倍数与悬殊差值。",
          highlightElements: []
        },
        angleB: {
          id: "angleB",
          label: "思路 B：按指标评价维度划分（绝对优势指标组 vs 悬殊反差指标组）",
          concept: "各大主体均表现强劲的优势指标 ➔ 产生巨大反常反差或落后的特殊指标。",
          overviewLogic: "各维度指标呈现鲜明的梯级断层，不同评价维度下各主体的表现反差显著。",
          body1Logic: "主要优势项：集中分析各大主体均保持高位或差距较小的核心领域。",
          body2Logic: "落差项与特例：深入对比差距最为悬殊的特定领域或发生位次倒置的反常指标。",
          highlightElements: []
        }
      };

      paragraphSteps = [
        {
          stepId: "intro",
          stepNumber: 1,
          title: "Step 1: Introduction (题目与表格改写)",
          role: "引言段 · 横向对比改写",
          chinesePrompt: `该表格/图表比较了关于“${title}”在不同考察对象与维度之间的关键数据分布。`,
          canonicalAnswer: `The diagram compares key metrics regarding ${title.toLowerCase()} across different categories.`,
          acceptableVariants: [`The table presents a comparative analysis of ${title.toLowerCase()} among the specified entities.`],
          strategyTip: "使用 compares key metrics regarding ... across different categories 规范引出。",
          keyChunks: ["The table compares ... across [N] major institutions in [Year]", "consistently outperformed ... across all metrics"]
        },
        {
          stepId: "overview",
          stepNumber: 2,
          title: "Step 2: Overview (宏观总述 · 冲6.5分关键)",
          role: "总述段 · 宏观优劣与对比特征 (绝无具体数字)",
          chinesePrompt: "总体而言，显而易见的是，领先主体在多数指标上均占据显著优势，而其余对象则录得明显偏低的数据。",
          canonicalAnswer: "Overall, it is readily apparent that the primary subject registered the highest figures across the majority of metrics, whereas its counterparts recorded considerably lower figures.",
          acceptableVariants: ["Overall, clear disparities exist among the entities, with one leader outperforming the rest across most measures."],
          strategyTip: "冲 6.5 分死律：Overview 不报具体数字，只抓主要领先主体与整体悬殊落差。",
          keyChunks: ["Overall, [Entity A] exhibited the highest figures across the majority of metrics", "the disparity was most pronounced in terms of ..."]
        },
        {
          stepId: "body1",
          stepNumber: 3,
          title: "Step 3: Body Paragraph 1 (主体一：领跑实体数据)",
          role: "主体一段 · 核心领跑者数据",
          chinesePrompt: `在表现最突出的方面：${questions[0]?.chinese || "第一项高居首位，展现出显著的主导优势。"}`,
          canonicalAnswer: q1,
          acceptableVariants: [q2],
          strategyTip: "使用 Looking first at the leading facility / outperforming by a large margin 代入精准数据。",
          keyChunks: ["Looking first at the leading facilities, ...", "registered double the volume of ..."]
        },
        {
          stepId: "body2",
          stepNumber: 4,
          title: "Step 4: Body Paragraph 2 (主体二：对比实体与悬殊落差)",
          role: "主体二段 · 次席与末尾差距",
          chinesePrompt: `相比之下，其余考察对象的表现：${questions[2]?.chinese || "次要类别数据明显偏低，并形成了鲜明倍数反差。"}`,
          canonicalAnswer: q3 || q4 || q5,
          acceptableVariants: [q4 || q5],
          strategyTip: "使用 In stark contrast 或 By comparison 转折，凸显与第一主体的倍数或差值落差。",
          keyChunks: ["In sharp contrast, regional facilities handled considerably fewer ...", "Further down the ranking, ..."]
        }
      ];
    } else {
      // 默认静态占比 (static / general)
      thinkingAngles = {
        angleA: {
          id: "angleA",
          label: "思路 A：按数值主导梯次划分（头部领跑 vs 次要与微小细项 · 考场最稳）",
          concept: "以占比最高的最大项与第二项为核心组成绝对主力 ➔ 其余次要项构成次等梯队。",
          overviewLogic: "总述主导项目在整体分布中占据支配性份额，而极小项目仅占边缘微弱比例（无碎数字）。",
          body1Logic: "第一梯队：集中描写位列第一的领跑大项及其数值，交代第二大项紧随其后之势与两项合并总和。",
          body2Logic: "中尾部梯次：对比剩余次要类别，强调两者的差值百分点与极值间的悬殊倍数。",
          highlightElements: []
        },
        angleB: {
          id: "angleB",
          label: "思路 B：按功能属性与刚需分类划分（基础刚性保障 vs 弹性可支配）",
          concept: "从数据内在性质或业务功能关联角度分组，如刚性基本开销 vs 弹性休闲开销。",
          overviewLogic: "总述不同功能组别的宏观格局差异，基础刚需占据大头，弹性发展项相对受限。",
          body1Logic: "基础核心类别：详述主要组别内部的构成比例与走势细节。",
          body2Logic: "弹性次要类别：对比次要组别的分布表现，强调两者倍数或差值落差。",
          highlightElements: []
        }
      };

      paragraphSteps = [
        {
          stepId: "intro",
          stepNumber: 1,
          title: "Step 1: Introduction (题目与图表改写)",
          role: "引言段 · 题目与分类规范改写",
          chinesePrompt: `该图表展示了关于“${title}”在各核心细分项上的数据构成与比例分布。`,
          canonicalAnswer: `The diagram illustrates the breakdown of data regarding ${title.toLowerCase()}, providing a comprehensive comparison across categories.`,
          acceptableVariants: [`The chart provides an overview of the distribution of ${title.toLowerCase()} across the specified sectors.`],
          strategyTip: "使用 illustrates the breakdown of / provides a comprehensive breakdown across categories 规范引出。",
          keyChunks: ["The pie chart illustrates the breakdown of ... in [Year]", "represented roughly [N]% of the total"]
        },
        {
          stepId: "overview",
          stepNumber: 2,
          title: "Step 2: Overview (宏观总述 · 冲6.5分关键)",
          role: "总述段 · 宏观大格局与极值 (绝无碎数字)",
          chinesePrompt: "总体而言，显而易见的是，主导项目在整体分布中占据绝大部分份额，而其余次要类别所占比例相对微小。",
          canonicalAnswer: "Overall, it is readily apparent that the dominant category accounted for the lion's share of the overall distribution, while the remaining sectors represented comparatively modest proportions.",
          acceptableVariants: ["Overall, clear contrasts are visible across the categories, with the primary feature standing out distinctly above the rest."],
          strategyTip: "冲 6.5 分死律：Overview 严禁出现具体数字！用 accounted for the lion's share 宏观定调极值。",
          keyChunks: ["accounted for the lion's share of ...", "trailed far behind at merely [N]%"]
        },
        {
          stepId: "body1",
          stepNumber: 3,
          title: "Step 3: Body Paragraph 1 (主体一：第一梯队主力数据)",
          role: "主体一段 · 核心数据与主导排位",
          chinesePrompt: `在最主要的数据特征中：${questions[0]?.chinese || "第一项高居首位，并构成了整体的最重要部分。"}`,
          canonicalAnswer: q1,
          acceptableVariants: [q2],
          strategyTip: "使用 Looking first at the dominant expenditures 启承，精准代入数据与倍数关系。",
          keyChunks: ["stood out as the primary contributor at [N]%", "ranked as the second-largest category, following closely behind"]
        },
        {
          stepId: "body2",
          stepNumber: 4,
          title: "Step 4: Body Paragraph 2 (主体二：中尾部梯次与对比)",
          role: "主体二段 · 次要数据与对比转折",
          chinesePrompt: `相比之下，其余细分项目：${questions[2]?.chinese || "次要类别数据明显落后，并形成了鲜明倍数反差。"}`,
          canonicalAnswer: q3 || q4 || q5,
          acceptableVariants: [q4 || q5],
          strategyTip: "使用 In stark contrast 或 By comparison 转折，凸显与主体一段的层级差异。",
          keyChunks: ["was nearly [N] times as high as ...", "was [N] percentage points higher than ..."]
        }
      ];
    }

    return {
      topic: `${title} (Task 1 Mini-Essay)`,
      chartType: chartType,
      archetype: archetype,
      thinkingAngles: thinkingAngles,
      paragraphSteps: paragraphSteps,
      functionalChunks: getChunksForArchetype(archetype)
    };
  }

  /**
   * 获取题组对应的四段式小作文沉浸模型
   */
  function getMiniEssayForGroup(groupId, group = null, scaffoldConfig = null) {
    if (TASK1_MINI_ESSAY_REGISTRY[groupId]) {
      const reg = TASK1_MINI_ESSAY_REGISTRY[groupId];
      // 挂载题型专属词库抽屉
      reg.functionalChunks = getChunksForArchetype(reg.archetype || "static");
      return reg;
    }
    return buildDynamicMiniEssayForGroup(groupId, group, scaffoldConfig);
  }

  /**
   * 实时将 4 段文本合成为一篇具有真实段落排版的完整 Task 1 小作文
   * 并计算真实英文词数 (排除空字符)
   */
  function synthesizeEssay(drafts = {}) {
    const parts = [
      (drafts.intro || "").trim(),
      (drafts.overview || "").trim(),
      (drafts.body1 || "").trim(),
      (drafts.body2 || "").trim()
    ];

    const fullText = parts.filter(Boolean).join("\n\n");
    const rawTokens = fullText ? fullText.split(/\s+/).filter(Boolean) : [];
    const wordCount = rawTokens.length;

    let healthStatus = "short"; // short (<120) | ideal (130-170) | long (>180)
    if (wordCount >= 130 && wordCount <= 170) {
      healthStatus = "ideal";
    } else if (wordCount > 170) {
      healthStatus = "long";
    }

    return {
      parts,
      fullText,
      wordCount,
      healthStatus,
      isComplete: parts.every((p) => p.length > 10)
    };
  }

  const Task1MiniEssayModels = {
    GLOBAL_FUNCTIONAL_CHUNKS,
    TYPE_SPECIFIC_FUNCTIONAL_CHUNKS,
    getChunksForArchetype,
    TASK1_MINI_ESSAY_REGISTRY,
    getMiniEssayForGroup,
    synthesizeEssay
  };

  if (typeof window !== "undefined") {
    window.Task1MiniEssayModels = Task1MiniEssayModels;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = Task1MiniEssayModels;
  }
})();
