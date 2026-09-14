// Task 1 四段式小作文沉浸工坊核心数据与双思维模型包 (Task 1 Mini-Essay Models)
// 职责：为 28 个全量题组提供双思维切入角度（思路A/思路B）、4段式标准小作文结构（Intro, Overview, Body 1, Body 2）与实战高频语块库
(() => {
  "use strict";

  // 1. 全局五大类别高频实战学术语块库 (点击直接一键填入当前输入框)
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

  // 2. 全量 28 题组专属双思维切入角度与 4 段式小作文模型
  const TASK1_MINI_ESSAY_REGISTRY = {
    "task1-group-01": {
      topic: "家庭支出构成 (Household Expenditure)",
      chartType: "pie",
      thinkingAngles: {
        angleA: {
          id: "angleA",
          label: "思路 A：按数值主导性与量级划分（考场最稳）",
          concept: "两大多项 (Housing 45% + Food 30% = 75%) 组成绝对主导 ➔ 其余两小项 (Transport 15% + Entertainment 10%) 构成微弱次席。",
          overviewLogic: "总述住房和食品合计独占四分之三开销，而娱乐仅占极微小份额（不写具体数字）。",
          body1Logic: "集中汇报两巨头：住房 45% 位居第一，食品 30% 紧随其后，两者合并高达 75%。",
          body2Logic: "转述两小项并做倍数/差值对比：交通占 15%，娱乐垫底仅 10%，住房是娱乐的 4.5 倍。",
          highlightElements: ["住房 (Housing)", "食品 (Food)"]
        },
        angleB: {
          id: "angleB",
          label: "思路 B：按生活必需品 vs 享受型支出属性划分（论述深刻）",
          concept: "按支出功能属性分类：生存刚需支出 (Housing + Food) vs 非刚需通勤与休闲支出 (Transport + Entertainment)。",
          overviewLogic: "家庭预算绝大部分被基本生活保障开支消耗，可用于娱乐休闲的自由支配预算极为有限。",
          body1Logic: "生存刚需：住房与食品作为刚性支出合计占总消费的 75%。",
          body2Logic: "发展与享受型开销：通勤交通占 15%，而自由娱乐仅获 10% 预算分配。",
          highlightElements: ["交通 (Transport)", "娱乐 (Entertainment)"]
        }
      },
      paragraphSteps: [
        {
          stepId: "intro",
          stepNumber: 1,
          title: "Step 1: Introduction (题目与图表改写)",
          role: "引言段 · 改写图表背景",
          chinesePrompt: "该饼图展示了一般家庭在住房、食品、交通和娱乐这四类项目上的支出比例分配。",
          canonicalAnswer: "The pie chart illustrates the proportion of household expenditure allocated across four categories: housing, food, transport, and entertainment.",
          acceptableVariants: [
            "The pie chart shows the breakdown of household spending among four distinct categories: housing, food, transport, and entertainment."
          ],
          strategyTip: "用 illustrates/delineates 改写 shows，用 proportion of expenditure 改写 spending，按顺序列出四大项目。",
          keyChunks: ["The chart illustrates ...", "provides a breakdown of ..."]
        },
        {
          stepId: "overview",
          stepNumber: 2,
          title: "Step 2: Overview (宏观总述 · 冲7分关键)",
          role: "总述段 · 宏观极值与特征 (绝无细碎数字)",
          chinesePrompt: "总体而言，显而易见的是，住房和食品占据了家庭开支的绝大部分份额，而娱乐支出则是所有项目中最小的一项。",
          canonicalAnswer: "Overall, it is readily apparent that housing and food accounted for the lion's share of household spending, whereas entertainment was the least significant expense.",
          acceptableVariants: [
            "Overall, it is clear that the vast majority of household expenditure was dedicated to housing and food, while entertainment represented the smallest outlay."
          ],
          strategyTip: "绝不要在 Overview 中罗列 45% 或 30% 等具体数字！只需宏观指出极值与压倒性主导项。",
          keyChunks: ["Overall, it is readily apparent that ...", "accounted for the lion's share of ..."]
        },
        {
          stepId: "body1",
          stepNumber: 3,
          title: "Step 3: Body Paragraph 1 (主体一：主要特征与关键数据)",
          role: "核心段落 · 主要类别与顺位排序",
          chinesePrompt: "在主要开销中，住房以45%的份额位居榜首，成为最大支出项；食品紧随其后，占总支出的30%，两项合计高达总预算的四分之三。",
          canonicalAnswer: "Looking first at the primary expenses, housing was the single largest item, accounting for 45% of the total, followed closely by food at 30%; together, these two essentials made up three quarters of overall household outlay.",
          acceptableVariants: [
            "Looking first at the major expenses, housing constituted 45% of total expenditure as the primary category, with food following at 30%, meaning the two items combined represented three quarters of the total."
          ],
          strategyTip: "使用 accounting for, followed closely by 以及 together made up three quarters 将数据有机串联成句。",
          keyChunks: ["Looking first at the dominant features, ...", "represented roughly [N]% of the total", "made up three quarters of all ..."]
        },
        {
          stepId: "body2",
          stepNumber: 4,
          title: "Step 4: Body Paragraph 2 (主体二：次要特征与细节对比)",
          role: "次要段落 · 剩余数据与倍数/差值对比",
          chinesePrompt: "相比之下，交通方面的支出降至15%，而娱乐支出垫底，仅占10%，这意味着住房方面的花费是娱乐花费的整整四倍半。",
          canonicalAnswer: "By contrast, spending on transport stood at 15%, while entertainment trailed far behind at merely 10%, meaning that expenditure on accommodation was four and a half times as high as that on leisure.",
          acceptableVariants: [
            "In stark contrast, transport accounted for only 15%, and entertainment recorded the lowest share at 10%, which was 5 percentage points lower than transport."
          ],
          strategyTip: "使用 By contrast 过渡，用 trailed far behind at merely 突出低值，并用 four and a half times 进行极值深度对比。",
          keyChunks: ["By comparison, ...", "trailed far behind at merely ...", "was nearly four times as high as ..."]
        }
      ]
    },

    "task1-group-02": {
      topic: "三座机场客流对比 (Airport Passenger Traffic)",
      chartType: "table",
      thinkingAngles: {
        angleA: {
          id: "angleA",
          label: "思路 A：按机场量级梯度划分（希思罗绝对优势 vs 盖特威克与斯坦斯特德）",
          concept: "希思罗以 1.2M 稳居首位，几乎相当于后两座机场总和 ➔ 盖特威克 (800k) 与斯坦斯特德 (600k) 构成第二阵营。",
          overviewLogic: "总述希思罗机场处理了最多的国际旅客，客流量远超其他两座枢纽机场。",
          body1Logic: "单列希思罗：以 1.2 百万客流傲视群雄，是斯坦斯特德的两倍整。",
          body2Logic: "对比盖特威克与斯坦斯特德：分别为 800k 与 600k，两者差距为 200k。",
          highlightElements: ["希思罗 (Heathrow)", "盖特威克 (Gatwick)"]
        },
        angleB: {
          id: "angleB",
          label: "思路 B：按排名顺序线性叙述（头把交椅 ➔ 次席 ➔ 垫底机场）",
          concept: "标准顺位递降逻辑：第 1 希思罗 (1.2M) ➔ 第 2 盖特威克 (800k) ➔ 第 3 斯坦斯特德 (600k)。",
          overviewLogic: "旅客吞吐量呈明显的阶梯式递减，各机场间保持着清晰的顺位层级。",
          body1Logic: "冠亚军比较：希思罗居首 (1.2M)，盖特威克以 800k 位列第二，差距为 400k。",
          body2Logic: "第三名及总体倍数：斯坦斯特德以 600k 居末席，仅为希思罗的一半。",
          highlightElements: ["斯坦斯特德 (Stansted)"]
        }
      },
      paragraphSteps: [
        {
          stepId: "intro",
          stepNumber: 1,
          title: "Step 1: Introduction (题目与表格改写)",
          role: "引言段 · 题目改写",
          chinesePrompt: "该表格比较了三座主要英国机场（希思罗、盖特威克和斯坦斯特德）所接待的旅客人数。",
          canonicalAnswer: "The table compares the passenger numbers handled by three major UK airports: Heathrow, Gatwick, and Stansted.",
          acceptableVariants: [
            "The table provides data regarding the volume of passengers traveling through three key airports in the UK: Heathrow, Gatwick, and Stansted."
          ],
          strategyTip: "表格常用 compares passenger numbers 或 illustrates passenger volume。",
          keyChunks: ["The chart illustrates ...", "compares the proportion of ..."]
        },
        {
          stepId: "overview",
          stepNumber: 2,
          title: "Step 2: Overview (宏观总述 · 冲7分关键)",
          role: "总述段 · 宏观格局与极值",
          chinesePrompt: "总体而言，显而易见的是，希思罗机场在旅客吞吐量上处于绝对领先地位，而斯坦斯特德接待的旅客最少。",
          canonicalAnswer: "Overall, it is readily apparent that Heathrow was by far the busiest airport in terms of passenger traffic, whereas Stansted recorded the lowest figure.",
          acceptableVariants: [
            "Overall, Heathrow dominated passenger volumes among the three airports, while Stansted trailed behind the other two."
          ],
          strategyTip: "用 by far the busiest 与 lowest figure 宏观概括极值，不提 1.2M 等具体数字。",
          keyChunks: ["Overall, it is readily apparent that ...", "dominated the overall distribution"]
        },
        {
          stepId: "body1",
          stepNumber: 3,
          title: "Step 3: Body Paragraph 1 (主体一：领跑机场与倍数)",
          role: "核心段落 · 榜首霸主数据",
          chinesePrompt: "具体来看，希思罗机场共接待了120万旅客，高居首位；这一数字恰好是斯坦斯特德机场（60万人次）的整整两倍。",
          canonicalAnswer: "Looking first at the leading facility, Heathrow handled 1.2 million travelers, standing out as the largest hub; notably, this number was precisely double that of Stansted, which welcomed 600,000 passengers.",
          acceptableVariants: [
            "In detail, Heathrow ranked first with 1.2 million passengers, representing twice the volume recorded at Stansted (600,000)."
          ],
          strategyTip: "用 precisely double that of 凸显两倍整的整齐倍数关系。",
          keyChunks: ["Looking first at the dominant features, ...", "was nearly four times as high as ..."]
        },
        {
          stepId: "body2",
          stepNumber: 4,
          title: "Step 4: Body Paragraph 2 (主体二：次席与末位对比)",
          role: "次要段落 · 二三名差距对比",
          chinesePrompt: "与此同时，盖特威克机场以80万人次位列第二，比斯坦斯特德多了20万人次，但仍落后希思罗机场达40万人次之多。",
          canonicalAnswer: "Meanwhile, Gatwick occupied second position with 800,000 visitors, which was 200,000 higher than Stansted, yet still fell short of Heathrow by 400,000 passengers.",
          acceptableVariants: [
            "Meanwhile, Gatwick recorded 800,000 passengers, placing it in second position, 200,000 ahead of Stansted."
          ],
          strategyTip: "用 yet still fell short of by 表达虽居次席但与榜首仍有显著差距。",
          keyChunks: ["Turning next to the remaining categories, ...", "constituted the second largest category at [N]%"]
        }
      ]
    },

    "task1-group-05": {
      topic: "三种交通方式 2000–2020 动态走势 (Transport Trends Line)",
      chartType: "line",
      thinkingAngles: {
        angleA: {
          id: "angleA",
          label: "思路 A：按走势方向分段（增长类别 vs 下降类别 · 最清晰）",
          concept: "铁路与航空保持持续强劲增长并完成反超 ➔ 公交车则呈现无可挽回的长期滑落。",
          overviewLogic: "总述铁路与航空旅客量在 20 年间大幅攀升，而公共汽车使用量则经历持续锐减。",
          body1Logic: "上升组：铁路与民航的稳步上升，重点写民航在 2012 年首次反超公交车并创新高。",
          body2Logic: "下降组：公交车从初期的统治地位 (80m) 持续下滑至期末垫底 (30m)。",
          highlightElements: ["铁路 (Rail)", "航空 (Air)"]
        },
        angleB: {
          id: "angleB",
          label: "思路 B：按时间节点分期分段（前十年平稳 ➔ 后十年反超与分化）",
          concept: "2000–2010 各方式保持固有格局 ➔ 2010–2020 发生关键交叉点（民航反超公交）并形成新格局。",
          overviewLogic: "全周期呈现两增一降格局，且在中间节点发生了交通方式主导权的戏剧性易手。",
          body1Logic: "前半程 (2000–2010)：公交车虽在下降但仍居首位，铁路民航缓慢爬坡。",
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
          chinesePrompt: "该折线图展示了2000年至2020年间某国使用三种交通方式（铁路、公交和航空）的人数变化走势。",
          canonicalAnswer: "The line graph illustrates changes in the number of commuters utilizing three modes of transport—rail, bus, and air—over a 20-year period from 2000 to 2020.",
          acceptableVariants: [
            "The line graph shows passenger numbers for rail, bus, and air travel between 2000 and 2020."
          ],
          strategyTip: "动态图务必标注时间区间 from 2000 to 2020 / over a 20-year period，用 utilizing modes of transport 替换 using。",
          keyChunks: ["The chart illustrates ...", "over a ...-year period from ... to ..."]
        },
        {
          stepId: "overview",
          stepNumber: 2,
          title: "Step 2: Overview (宏观总述 · 冲7分关键)",
          role: "总述段 · 宏观两增一减大趋势",
          chinesePrompt: "总体而言，显而易见的是，铁路和航空的出行人数在整个时期内经历了显著增长，而公交车的使用量则出现了大幅下降。",
          canonicalAnswer: "Overall, it is readily apparent that rail and air travel experienced substantial growth throughout the period, whereas the number of bus commuters saw a precipitous decline.",
          acceptableVariants: [
            "Overall, both rail and air registered a clear upward trajectory, while bus travel experienced a continuous downward trend."
          ],
          strategyTip: "抓大放小：指出两增一减的总趋势，用 upward trajectory 与 precipitous decline 替代简单词汇。",
          keyChunks: ["Overall, it is readily apparent that ...", "experienced an upward trajectory throughout", "while the opposite pattern was observed in ..."]
        },
        {
          stepId: "body1",
          stepNumber: 3,
          title: "Step 3: Body Paragraph 1 (主体一：上升组与反超交叉点)",
          role: "核心段落 · 上升趋势与交汇反超",
          chinesePrompt: "具体而言，铁路客流从2000年的4000万人稳步上升至2020年的7000万人；航空客流增幅最为惊人，从2000年的2500万一路飙升，并在2012年首次反超公交车，最终达到8500万的高峰。",
          canonicalAnswer: "In detail, rail passengers climbed steadily from 40 million in 2000 to 70 million by 2020. Air travel witnessed an even steeper escalation, soaring from 25 million to overtake bus ridership around 2012, before peaking at 85 million at the end of the period.",
          acceptableVariants: [
            "Looking at the growing categories, rail rose steadily from 40m to 70m, while air travel surged dramatically, surpassing bus in 2012 and reaching 85m in 2020."
          ],
          strategyTip: "overtake bus ridership around 2012 是折线图关键交叉点的神仙句型！",
          keyChunks: ["Looking first at the dominant features, ...", "peaked at [N] in [Year]"]
        },
        {
          stepId: "body2",
          stepNumber: 4,
          title: "Step 4: Body Paragraph 2 (主体二：下滑组与位次逆转)",
          role: "次要段落 · 下降趋势与失守榜首",
          chinesePrompt: "与此形成鲜明对比的是，公交车在2000年曾以8000万人高居榜首，但随后经历持续滑落，到2020年暴跌至仅剩3000万人，沦为最不受欢迎的出行方式。",
          canonicalAnswer: "In stark contrast, although bus was initially the dominant choice with 80 million users in 2000, it suffered a continual downward slide, plunging to merely 30 million by 2020 and becoming the least favored option.",
          acceptableVariants: [
            "By contrast, bus started as the most popular transport at 80 million, but fell continuously over the two decades, finishing at a low of 30 million."
          ],
          strategyTip: "用 although initially dominant ... plunging to merely 突出由盛转衰的鲜明对比。",
          keyChunks: ["In stark contrast, ...", "plummeted to a record low of [N]"]
        }
      ]
    },

    "task1-group-17": {
      topic: "小镇规划演变 1990 vs 2020 (Town Redevelopment Map)",
      chartType: "map",
      thinkingAngles: {
        angleA: {
          id: "angleA",
          label: "思路 A：按变动与保留划分（拆除改建区 vs 原状保留区）",
          concept: "原北部农田改建为住宅区、原东部重工厂拆除改造为生态公园 ➔ 商业步行街与核心干道得到保留并南延。",
          overviewLogic: "小镇经历了从农业和重工业主导向现代化居住与休闲社区的全面转型。",
          body1Logic: "重大改建工程：北部农田彻底变身为现代化住宅，东侧废旧化工厂被绿化公园取代。",
          body2Logic: "保留与扩建：中央传统商业街得以保留，同时交通路网向南部大举延伸以连接新区。",
          highlightElements: ["北部农田 (Farmland ➔ Housing)", "东部工厂 (Factory ➔ Park)"]
        },
        angleB: {
          id: "angleB",
          label: "思路 B：按地理方位划分（北部与东部改造 vs 南部与中部扩展）",
          concept: "北侧与东侧重点进行功能置换 ➔ 中部与南侧重点进行交通基建延伸与商业配套升级。",
          overviewLogic: "三十年间小镇空间布局发生显著重组，绿化与居住设施大幅增加。",
          body1Logic: "北区与东区：农田消失代之以密集民居，东部重工业设施完全退场并建成湖泊公园。",
          body2Logic: "中区与南区：原有商业街两侧新建了停车场，主干道跨过铁路线向南延伸出新开发区。",
          highlightElements: ["商业区 (Commercial)", "主干道南延 (Road South)"]
        }
      },
      paragraphSteps: [
        {
          stepId: "intro",
          stepNumber: 1,
          title: "Step 1: Introduction (题目与地图改写)",
          role: "引言段 · 地图演变改写",
          chinesePrompt: "这两幅地图展示了一个小镇从1990年至2020年三十年间经历的城市规划改造与发展变化。",
          canonicalAnswer: "The two maps illustrate the urban redevelopment and infrastructural changes that occurred in a specific town over a 30-year period between 1990 and 2020.",
          acceptableVariants: [
            "The diagrams show how a town developed over thirty years from 1990 to 2020."
          ],
          strategyTip: "地图题开头必备：urban redevelopment and infrastructural changes / layout alterations。",
          keyChunks: ["The chart illustrates ...", "over a ...-year period from ... to ..."]
        },
        {
          stepId: "overview",
          stepNumber: 2,
          title: "Step 2: Overview (宏观总述 · 冲7分关键)",
          role: "总述段 · 宏观转型与城市重组",
          chinesePrompt: "总体而言，显而易见的是，该小镇经历了从传统工农业聚落向现代化居住与休闲社区的全面转型，绿色空间与交通便利性均得到极大提升。",
          canonicalAnswer: "Overall, it is readily apparent that the town transformed from a largely industrial and agricultural settlement into a modern residential and recreational community, with significantly enhanced green space and transport connectivity.",
          acceptableVariants: [
            "Overall, the town was substantially modernized, with industrial areas replaced by residential housing and public amenities."
          ],
          strategyTip: "地图题 Overview 绝招：用 transformed from A to B 概括宏观功能变化！",
          keyChunks: ["Overall, it is readily apparent that ...", "reveals notable changes in ..."]
        },
        {
          stepId: "body1",
          stepNumber: 3,
          title: "Step 3: Body Paragraph 1 (主体一：北侧与东侧功能置换)",
          role: "主体一段 · 核心改建工程",
          chinesePrompt: "在北部区域，原本广阔的农田在2020年已被大片新建住宅区彻底取代；与此同时，东部的重工业化工厂被全部拆除，并在原址上建造了一座带有步行湖泊的公共公园。",
          canonicalAnswer: "Looking first at the northern and eastern sections, the extensive farmland visible in 1990 was completely replaced by a large residential estate by 2020; meanwhile, the heavy industrial factory to the east was demolished to make way for a landscaped public park featuring an artificial lake.",
          acceptableVariants: [
            "In the north, agricultural land was converted into housing, while the eastern industrial site was cleared and turned into a recreational park."
          ],
          strategyTip: "was completely replaced by / was demolished to make way for 是地图最高频被动语态！",
          keyChunks: ["Looking first at the dominant features, ...", "Subsequently, the process involves ..."]
        },
        {
          stepId: "body2",
          stepNumber: 4,
          title: "Step 4: Body Paragraph 2 (主体二：中部保留与南部交通延伸)",
          role: "主体二段 · 设施保留与路网延伸",
          chinesePrompt: "相比之下，位于小镇中部的商业街得到了完整保留，并在两侧扩建了公共停车场；此外，原有主干道跨过铁路线向南延伸，直通新建的高铁站与副中心。",
          canonicalAnswer: "By contrast, the commercial high street in the town center remained largely untouched, although additional car parking facilities were constructed nearby. Furthermore, the main arterial road was extended southwards across the railway to connect directly with a newly erected railway station.",
          acceptableVariants: [
            "In the center, shops were retained and expanded with parking, and the main road was extended southwards."
          ],
          strategyTip: "方位介词与方向动词：extended southwards across ... to connect directly with。",
          keyChunks: ["By comparison, ...", "With regard to ..., it witnessed ..."]
        }
      ]
    },

    "task1-group-21": {
      topic: "咖啡豆生产全工序 (Coffee Production Flow)",
      chartType: "flow",
      thinkingAngles: {
        angleA: {
          id: "angleA",
          label: "思路 A：按前后两期工程划分（采收发酵前期 ➔ 烘焙包装成型期）",
          concept: "采摘、脱浆、水洗、发酵为农业原辅料处理期 ➔ 晒干、脱壳、深度烘焙与密封包装为工业成型流通期。",
          overviewLogic: "总述生产全过程包含从采摘成熟浆果到最终密封包装销售的多个连续物理与工序步骤。",
          body1Logic: "前期农艺步骤：手工采摘红浆果、机器脱皮脱肉、并在水槽中经历 24–48 小时水洗发酵。",
          body2Logic: "后期工业深加工：在阳光下晾晒至干燥、去壳研磨、进入高达 200°C 烘烤炉烘焙并抽真空装袋。",
          highlightElements: ["采摘水洗 (Harvest & Ferment)", "烘焙包装 (Roast & Pack)"]
        },
        angleB: {
          id: "angleB",
          label: "思路 B：按物态转化性质划分（湿法发酵分离 ➔ 干燥高温物理定型）",
          concept: "湿法加工阶段（利用水槽发酵除去果肉黏膜）➔ 物理高温阶段（脱水日晒与高温爆香成型）。",
          overviewLogic: "全流程包含六个不可逆的工序，将天然果实逐步转化为可直接冲泡消费的商业商品。",
          body1Logic: "湿处理分离：成熟咖啡果实进入水槽经发酵脱黏，完成豆肉彻底分离。",
          body2Logic: "热力固化包装：发酵豆铺平暴晒控水，随后经历高温翻炒变色并密封装袋。",
          highlightElements: ["水槽发酵 (Water Fermentation)", "高温烘焙 (High Heat Roasting)"]
        }
      },
      paragraphSteps: [
        {
          stepId: "intro",
          stepNumber: 1,
          title: "Step 1: Introduction (题目与流程图改写)",
          role: "引言段 · 流程图改写",
          chinesePrompt: "该流程图详细展示了从手工采摘成熟咖啡浆果到最终包装上市销售的完整咖啡豆生产工艺。",
          canonicalAnswer: "The flow diagram details the sequential stages involved in the production of commercial coffee, from the harvesting of ripe coffee cherries to the final packaging for retail.",
          acceptableVariants: [
            "The process diagram illustrates the steps required to produce commercial coffee from harvested beans to packaged products."
          ],
          strategyTip: "流程图必背句首：The flow diagram details the sequential stages involved in the production of ...",
          keyChunks: ["The chart illustrates ...", "provides a breakdown of ..."]
        },
        {
          stepId: "overview",
          stepNumber: 2,
          title: "Step 2: Overview (宏观总述 · 冲7分关键)",
          role: "总述段 · 宏观阶段数与起止闭环",
          chinesePrompt: "总体而言，显而易见的是，该生产过程包含大约六个连续的主要工序，可大致划分为早期的湿法采收处理阶段和随后的高温干燥烘焙阶段。",
          canonicalAnswer: "Overall, it is readily apparent that the linear process comprises approximately six main stages, which can be broadly divided into an initial wet harvesting phase and a subsequent thermal roasting and packaging phase.",
          acceptableVariants: [
            "Overall, the production involves a multi-stage process starting with cherry picking and concluding with packaged coffee ready for distribution."
          ],
          strategyTip: "流程图 Overview 核心：总述阶段数 (linear / cyclical process comprises N stages, starting with ... and concluding with ...)。",
          keyChunks: ["Overall, it is readily apparent that ...", "Subsequently, the process involves ..."]
        },
        {
          stepId: "body1",
          stepNumber: 3,
          title: "Step 3: Body Paragraph 1 (主体一：采摘、脱浆与发酵)",
          role: "工序前半程 · 采收与湿法处理",
          chinesePrompt: "首先，只有成熟的红色咖啡浆果会被工人手工采摘下来；随后，这些浆果被送入去皮机去除外部果肉，接着浸泡在大型水槽中发酵24至48小时以分解外层粘液。",
          canonicalAnswer: "In the first stage of the operation, only fully ripened red cherries are hand-picked from the trees. Subsequently, the outer pulp is mechanically removed before the remaining beans are soaked in large fermentation tanks for 24 to 48 hours to decompose the mucilage layer.",
          acceptableVariants: [
            "To begin with, ripe cherries are harvested by hand. Following this, the flesh is stripped away and the beans undergo fermentation in water."
          ],
          strategyTip: "被动语态与工序连接词：In the first stage ..., Subsequently ..., before the beans are soaked ...",
          keyChunks: ["Looking first at the dominant features, ...", "Subsequently, the process involves ..."]
        },
        {
          stepId: "body2",
          stepNumber: 4,
          title: "Step 4: Body Paragraph 2 (主体二：日晒脱水、深度烘焙与包装)",
          role: "工序后半程 · 脱水烘焙与成品封装",
          chinesePrompt: "水洗完成后，咖啡豆被铺在开阔阳光下晾晒数日直至水分彻底蒸发；紧接着，干燥的豆子进入温度高达200°C的烘烤箱进行深度翻炒，最后在冷却后被密封包装成袋，分发至各大超市。",
          canonicalAnswer: "After thorough washing, the beans are spread across open drying beds to dehydrate naturally in the sunlight. Once dried, the outer husk is stripped, and the beans undergo intense roasting in an oven at temperatures reaching 200°C, before finally being vacuum-sealed into bags for distribution.",
          acceptableVariants: [
            "After washing, the beans are sun-dried, roasted at high heat, and eventually vacuum-packaged for market delivery."
          ],
          strategyTip: "Once dried ..., the beans undergo intense roasting ..., before finally being vacuum-sealed ... 连贯流畅！",
          keyChunks: ["Turning next to the remaining categories, ...", "in terms of ..."]
        }
      ]
    }
  };

  /**
   * 兜底构造题组专属小作文模型
   * 为尚未单独深度配置的题组动态生成规范的双思维切入角度与 4 段式模型
   */
  function buildDynamicMiniEssayForGroup(groupId, group) {
    const questions = group?.questions || [];
    const q1 = questions[0]?.answer || "The data provides detailed information on this topic.";
    const q2 = questions[1]?.answer || "A significant proportion is observed in the primary category.";
    const q3 = questions[2]?.answer || "Noticeable differences exist among the categories.";
    const q4 = questions[3]?.answer || "The trend illustrates substantial shifts over time.";
    const q5 = questions[4]?.answer || "Overall, the pattern remains distinct across all measures.";

    const title = group?.label || "雅思学术类图表小作文";
    const context = group?.context || "图表核心考点";

    return {
      topic: `${title} (Task 1 Mini-Essay)`,
      chartType: "general",
      thinkingAngles: {
        angleA: {
          id: "angleA",
          label: "思路 A：按主导极值与从属特征划分（考场最稳）",
          concept: `立足图表最大占比/最陡走势与次要项的梯度反差。${context}`,
          overviewLogic: "宏观概括处于统治地位的主导项与极小项，绝不写死繁琐细碎数字。",
          body1Logic: "主要特征描述：聚焦排序第一的类别或主要变化趋势，带入精准数据。",
          body2Logic: "次要特征描述：转折对比剩余类别、反向变动或停滞状态，完成平衡收尾。",
          highlightElements: []
        },
        angleB: {
          id: "angleB",
          label: "思路 B：按结构属性与功能分类划分（逻辑深刻）",
          concept: "从数据内在性质、时态分期或功能关联角度进行分组并列讨论。",
          overviewLogic: "总述不同功能组别的宏观格局差异与整体走势特征。",
          body1Logic: "第一梯队/第一阶段特征：详述主要组别内部的构成比例与走势细节。",
          body2Logic: "第二梯队/第二阶段特征：对比次要组别的分布表现，强调两者倍数或差值。",
          highlightElements: []
        }
      },
      paragraphSteps: [
        {
          stepId: "intro",
          stepNumber: 1,
          title: "Step 1: Introduction (题目与图表改写)",
          role: "引言段 · 规范改写",
          chinesePrompt: `该图表展示了关于“${title}”的核心数据分布与比较特征。`,
          canonicalAnswer: `The diagram illustrates key data regarding ${title.toLowerCase()}, providing a comprehensive comparison across the main categories.`,
          acceptableVariants: [
            `The chart illustrates data concerning ${title.toLowerCase()}, highlighting the principal figures.`
          ],
          strategyTip: "使用 illustrates/delineates 替代 shows，规范改写图表主题与时间范围。",
          keyChunks: ["The chart illustrates ...", "provides a breakdown of ..."]
        },
        {
          stepId: "overview",
          stepNumber: 2,
          title: "Step 2: Overview (宏观总述 · 冲7分关键)",
          role: "总述段 · 宏观大格局 (绝无碎数字)",
          chinesePrompt: "总体而言，显而易见的是，主导项目在整体分布中占据压倒性优势，而相反的格局则出现在其余次要类别中。",
          canonicalAnswer: "Overall, it is readily apparent that the primary category accounted for the lion's share of the overall distribution, while the remaining sectors represented comparatively modest proportions.",
          acceptableVariants: [
            "Overall, clear contrasts are visible across the categories, with the dominant feature standing out distinctly."
          ],
          strategyTip: "牢记考官原则：Overview 中绝对不要写任何具体数字！只概括两项宏观特征。",
          keyChunks: ["Overall, it is readily apparent that ...", "accounted for the lion's share of ..."]
        },
        {
          stepId: "body1",
          stepNumber: 3,
          title: "Step 3: Body Paragraph 1 (主体一：主要特征与关键数据)",
          role: "主体一段 · 核心数据与主导排位",
          chinesePrompt: `在最主要的数据特征中：${questions[0]?.chinese || "第一项高居首位，并构成了整体的最重要部分。"}`,
          canonicalAnswer: q1,
          acceptableVariants: [q2],
          strategyTip: "使用 Looking first at the dominant features 启承，精准代入数据与倍数关系。",
          keyChunks: ["Looking first at the dominant features, ...", "represented roughly [N]% of the total"]
        },
        {
          stepId: "body2",
          stepNumber: 4,
          title: "Step 4: Body Paragraph 2 (主体二：次要特征与细节对比)",
          role: "主体二段 · 次要数据与对比转折",
          chinesePrompt: `相比之下，其余细分项目：${questions[2]?.chinese || "次要类别数据明显落后，并形成了鲜明对比。"}`,
          canonicalAnswer: q3 || q4 || q5,
          acceptableVariants: [q4 || q5],
          strategyTip: "使用 In stark contrast 或 By comparison 转折，凸显与主体一段的层级差异。",
          keyChunks: ["By comparison, ...", "trailed far behind at merely ..."]
        }
      ]
    };
  }

  /**
   * 获取题组对应的四段式小作文沉浸模型
   */
  function getMiniEssayForGroup(groupId, group = null) {
    if (TASK1_MINI_ESSAY_REGISTRY[groupId]) {
      return TASK1_MINI_ESSAY_REGISTRY[groupId];
    }
    return buildDynamicMiniEssayForGroup(groupId, group);
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
