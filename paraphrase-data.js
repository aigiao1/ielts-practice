// 雅思听力高频同义替换语料库 (100+ 组核心考点替换对)
(() => {
  "use strict";

  const PARAPHRASE_DATABASE = [
    // 1. 空间与路径
    {
      id: "para-01",
      concept: "circular_walk",
      conceptZh: "环形路线 / 返回起点",
      sourceSpoken: "brings you back down to the starting point",
      targetOption: "circular walk",
      contextSentence: "The trail continues along the eastern hills and eventually brings you back down to the starting point.",
      explanation: "雅思地图与路线题最高频同义替换：brings you back to the start = circular (环形/闭环)。"
    },
    {
      id: "para-02",
      concept: "space_utilization",
      conceptZh: "空间利用 / 节省空间",
      sourceSpoken: "make the most of limited room",
      targetOption: "better use of compact space",
      contextSentence: "The modular furniture was chosen specifically to make the most of limited room in the studio.",
      explanation: "make the most of limited room ↔ better use of compact space (最大化紧凑空间利用)。"
    },
    {
      id: "para-03",
      concept: "overcrowding",
      conceptZh: "拥挤 / 人满为患",
      sourceSpoken: "packed with excessive crowds during peak periods",
      targetOption: "overcrowded conditions",
      contextSentence: "Visitors complained that the viewing platform was packed with excessive crowds on weekends.",
      explanation: "packed with excessive crowds ↔ overcrowded (人满为患、过度拥挤)。"
    },

    // 2. 心理与情绪
    {
      id: "para-04",
      concept: "unnecessary_anxiety",
      conceptZh: "不必要的担忧 / 虚惊一场",
      sourceSpoken: "worry about completely harmless symptoms",
      targetOption: "unnecessary concern",
      contextSentence: "Reading unverified health articles online often makes patients worry about completely harmless symptoms.",
      explanation: "worry about harmless symptoms ↔ unnecessary concern / anxiety (虚惊/庸人自扰)。"
    },
    {
      id: "para-05",
      concept: "creativity",
      conceptZh: "激发创意 / 创新思维",
      sourceSpoken: "generate fresh ideas and think outside the box",
      targetOption: "encourage creativity",
      contextSentence: "The group workshop is designed to help students generate fresh ideas without fear of judgment.",
      explanation: "generate fresh ideas / think outside the box ↔ encourage creativity (激发创造力)。"
    },
    {
      id: "para-06",
      concept: "social_interaction",
      conceptZh: "社交互动 / 人际交流",
      sourceSpoken: "encourage residents to chat and mingle with one another",
      targetOption: "foster social interaction",
      contextSentence: "The communal garden was built to encourage residents to chat and mingle with one another.",
      explanation: "chat and mingle with each other ↔ social interaction (社交交流)。"
    },

    // 3. 环保与生态
    {
      id: "para-07",
      concept: "environmental_benefit",
      conceptZh: "环保效益 / 减少排放",
      sourceSpoken: "drastically cut down on carbon emissions",
      targetOption: "environmental advantage",
      contextSentence: "Switching to electric boilers will drastically cut down on carbon emissions across the campus.",
      explanation: "cut down on emissions / better for the planet ↔ environmental advantage / eco-friendly。"
    },
    {
      id: "para-08",
      concept: "energy_efficiency",
      conceptZh: "节能 / 降低电耗",
      sourceSpoken: "uses substantially less electricity to run",
      targetOption: "energy-efficient design",
      contextSentence: "The newly installed cooling system uses substantially less electricity to run during the hot summer.",
      explanation: "uses substantially less electricity ↔ energy-efficient (节能高效)。"
    },
    {
      id: "para-09",
      concept: "wildlife_protection",
      conceptZh: "野生动物保护 / 栖息地维护",
      sourceSpoken: "safeguard vulnerable native bird species",
      targetOption: "wildlife conservation",
      contextSentence: "The perimeter fence helps safeguard vulnerable native bird species from predatory foxes.",
      explanation: "safeguard vulnerable species ↔ wildlife conservation (生态物种保护)。"
    },

    // 4. 成本与财务
    {
      id: "para-10",
      concept: "cost_factor",
      conceptZh: "成本高昂 / 沉重开销",
      sourceSpoken: "involves a heavy financial commitment",
      targetOption: "substantial expenditure",
      contextSentence: "Upgrading all laboratories at once involves a heavy financial commitment from the council.",
      explanation: "heavy financial commitment / considerable expense ↔ substantial expenditure (高昂开支)。"
    },
    {
      id: "para-11",
      concept: "funding_shortage",
      conceptZh: "资金短缺 / 预算不足",
      sourceSpoken: "ran out of sponsorship money halfway through",
      targetOption: "lack of financial support",
      contextSentence: "The documentary project stalled because they ran out of sponsorship money halfway through.",
      explanation: "ran out of sponsorship / financial resources ↔ lack of financial support (赞助短缺)。"
    },
    {
      id: "para-12",
      concept: "free_of_charge",
      conceptZh: "免费 / 无需额外付费",
      sourceSpoken: "complimentary with no additional fee required",
      targetOption: "available free of charge",
      contextSentence: "Breakfast and airport shuttle services are complimentary with no additional fee required.",
      explanation: "complimentary / without extra charge ↔ free of charge (免费提供)。"
    },

    // 5. 家庭与适用人群
    {
      id: "para-13",
      concept: "adaptable_household",
      conceptZh: "适应家庭变化 / 老少皆宜",
      sourceSpoken: "suitable for both young kids and elderly grandparents",
      targetOption: "adaptable to household changes",
      contextSentence: "The multi-generational house layout is suitable for both young kids and elderly grandparents.",
      explanation: "suitable for young and elderly ↔ adaptable to household changes (满足不同年龄家庭成员)。"
    },
    {
      id: "para-14",
      concept: "inequality_of_impact",
      conceptZh: "利弊不均 / 对某些群体不利",
      sourceSpoken: "good for cyclists but creates obstacles for pedestrians",
      targetOption: "benefits some but disadvantages others",
      contextSentence: "The new shared pathway is good for cyclists but creates obstacles for pedestrians.",
      explanation: "good for A but creates obstacles for B ↔ benefits some but disadvantages others (利弊不均)。"
    },

    // 6. 维护与生产
    {
      id: "para-15",
      concept: "maintenance",
      conceptZh: "难以维护 / 保养困难",
      sourceSpoken: "takes enormous effort to keep in working order",
      targetOption: "difficult to maintain over time",
      contextSentence: "Traditional wooden window frames take enormous effort to keep in working order in coastal areas.",
      explanation: "enormous effort to keep in working order ↔ difficult to maintain (难以长期维护)。"
    },
    {
      id: "para-16",
      concept: "production_method",
      conceptZh: "生产方式关键 / 加工环节",
      sourceSpoken: "how the raw materials are processed makes all the difference",
      targetOption: "the manufacturing process matters",
      contextSentence: "Whether organic cotton is genuinely green depends on how the raw materials are processed.",
      explanation: "how raw materials are processed ↔ the manufacturing process matters (生产工艺是关键)。"
    },
    {
      id: "para-17",
      concept: "historical_preservation",
      conceptZh: "历史遗迹保留 / 维持原貌",
      sourceSpoken: "kept the original Victorian brick facade intact",
      targetOption: "preserves historical features",
      contextSentence: "The architects kept the original Victorian brick facade intact while redesigning the interior.",
      explanation: "kept the original facade intact ↔ preserves historical features (保护历史原貌)。"
    },

    // 7. 时间与计划
    {
      id: "para-18",
      concept: "initial_plan",
      conceptZh: "最初设想 / 原定安排",
      sourceSpoken: "what we had originally set out to achieve",
      targetOption: "the initial intention",
      contextSentence: "Our final exhibition looks very different from what we had originally set out to achieve.",
      explanation: "originally set out to achieve ↔ the initial intention / first plan (最初的原定构想)。"
    },
    {
      id: "para-19",
      concept: "unexpected_delay",
      conceptZh: "意料之外的延误",
      sourceSpoken: "held up by unforeseen supply chain disruptions",
      targetOption: "unexpected delays occurred",
      contextSentence: "Delivery of the laboratory equipment was held up by unforeseen supply chain disruptions.",
      explanation: "held up by unforeseen disruptions ↔ unexpected delays (意外延期)。"
    },
    {
      id: "para-20",
      concept: "time_management",
      conceptZh: "时间管理不善 / 拖延",
      sourceSpoken: "struggled to keep up with the weekly assignment schedule",
      targetOption: "poor time management",
      contextSentence: "First-year undergraduates often struggled to keep up with the weekly assignment schedule.",
      explanation: "struggled to keep up with schedule ↔ poor time management (进度拖延)。"
    },

    // 8. 教学与工作
    {
      id: "para-21",
      concept: "hands_on_experience",
      conceptZh: "实践操作 / 动手经验",
      sourceSpoken: "learn directly by doing real workshop experiments",
      targetOption: "practical hands-on experience",
      contextSentence: "The engineering module requires students to learn directly by doing real workshop experiments.",
      explanation: "learn by doing practical tasks ↔ hands-on experience (动手实操)。"
    },
    {
      id: "para-22",
      concept: "flexible_hours",
      conceptZh: "弹性工时 / 自主安排",
      sourceSpoken: "allowed to choose their own start and finish times",
      targetOption: "flexible working schedule",
      contextSentence: "Staff are allowed to choose their own start and finish times as long as tasks are delivered.",
      explanation: "choose start and finish times ↔ flexible schedule (弹性工时)。"
    },
    {
      id: "para-23",
      concept: "academic_support",
      conceptZh: "个性化辅导 / 导师一对一",
      sourceSpoken: "one-on-one tutorial sessions tailored to each student",
      targetOption: "individual academic guidance",
      contextSentence: "The department provides one-on-one tutorial sessions tailored to each student once a fortnight.",
      explanation: "one-on-one tutorial sessions ↔ individual academic guidance (一对一个人学术指导)。"
    },
    {
      id: "para-24",
      concept: "independent_learning",
      conceptZh: "自主独立学习",
      sourceSpoken: "conduct research on your own without direct supervision",
      targetOption: "autonomous study",
      contextSentence: "Postgraduate dissertations test your ability to conduct research on your own without direct supervision.",
      explanation: "on your own without supervision ↔ autonomous / independent study (独立自主钻研)。"
    },

    // 9. 交通与安全
    {
      id: "para-25",
      concept: "public_transport",
      conceptZh: "公共交通 / 换乘巴士或轻轨",
      sourceSpoken: "leave private vehicles behind and hop on the tram",
      targetOption: "reliance on public transport",
      contextSentence: "The city council urges commuters to leave private vehicles behind and hop on the tram.",
      explanation: "leave cars and take tram/bus ↔ reliance on public transport (乘坐公共交通)。"
    },
    {
      id: "para-26",
      concept: "safety_hazard",
      conceptZh: "安全隐患 / 潜在危险",
      sourceSpoken: "poses a serious risk of tripping or injury",
      targetOption: "potential safety hazard",
      contextSentence: "Loose electrical wiring across the aisle poses a serious risk of tripping or injury.",
      explanation: "serious risk of injury/tripping ↔ potential safety hazard (安全隐患)。"
    },
    {
      id: "para-27",
      concept: "weather_impact",
      conceptZh: "恶劣天气 / 强降雨大风",
      sourceSpoken: "severe torrential rain and gale-force winds",
      targetOption: "adverse weather conditions",
      contextSentence: "Outdoor field research was called off due to severe torrential rain and gale-force winds.",
      explanation: "torrential rain / gale-force winds ↔ adverse weather conditions (恶劣气候)。"
    },

    // 10. 用户体验与服务
    {
      id: "para-28",
      concept: "user_friendly",
      conceptZh: "操作简便 / 界面友好",
      sourceSpoken: "straightforward to navigate without reading a handbook",
      targetOption: "intuitive user experience",
      contextSentence: "The library catalogue app is straightforward to navigate without reading a handbook.",
      explanation: "straightforward without handbook ↔ intuitive / user-friendly (简便易上手)。"
    },
    {
      id: "para-29",
      concept: "customized_service",
      conceptZh: "专属定制 / 量身定做",
      sourceSpoken: "shaped entirely around the specific requirements of the client",
      targetOption: "tailored individual service",
      contextSentence: "Our tour itineraries are shaped entirely around the specific requirements of the client.",
      explanation: "shaped around specific client requirements ↔ tailored service (个性化定制)。"
    },
    {
      id: "para-30",
      concept: "limited_availability",
      conceptZh: "名额有限 / 严格受限",
      sourceSpoken: "registration is capped at twenty places and fills fast",
      targetOption: "restricted capacity",
      contextSentence: "Registration is capped at twenty places and fills fast within minutes of opening.",
      explanation: "capped at places / fills fast ↔ restricted capacity / limited availability (名额紧俏)。"
    },
    {
      id: "para-31",
      concept: "noise_disturbance",
      conceptZh: "噪音干扰 / 嘈杂环境",
      sourceSpoken: "constant loud racket from the nearby highway",
      targetOption: "excessive noise levels",
      contextSentence: "Tenants were distracted by the constant loud racket from the nearby highway.",
      explanation: "loud racket / roaring engines ↔ excessive noise levels (噪音过大)。"
    },
    {
      id: "para-32",
      concept: "clear_instructions",
      conceptZh: "指引清晰 / 步骤明确",
      sourceSpoken: "spelled out every step in plain everyday language",
      targetOption: "straightforward instructions",
      contextSentence: "The emergency briefing spelled out every step in plain everyday language.",
      explanation: "spelled out in plain language ↔ straightforward instructions (清晰明了的说明)。"
    }
  ];

  if (typeof window !== "undefined") {
    window.PARAPHRASE_DATABASE = PARAPHRASE_DATABASE;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { PARAPHRASE_DATABASE };
  }
})();
