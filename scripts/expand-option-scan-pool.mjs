import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const targetFile = path.resolve(__dirname, "../option-scan.js");

const additionalOptions = [
  // 学术研究与方法论 (Academic & Research)
  { text: "was based on an unrepresentative sample size", keyword: "样本偏差", tag: "学术" },
  { text: "failed to account for variable weather conditions", keyword: "忽略天气", tag: "学术" },
  { text: "demands rigorous ethical clearance from the board", keyword: "伦理审批", tag: "学术" },
  { text: "contradicts findings from earlier published literature", keyword: "颠覆前论", tag: "学术" },
  { text: "relied excessively on self-reported questionnaires", keyword: "主观问卷", tag: "学术" },
  { text: "highlights significant discrepancies in recorded data", keyword: "数据矛盾", tag: "学术" },
  { text: "requires interdisciplinary collaboration across departments", keyword: "跨系合作", tag: "学术" },
  { text: "provides conclusive proof for the proposed hypothesis", keyword: "确凿证据", tag: "学术" },
  { text: "lacks sufficient control groups for comparison", keyword: "缺少对照", tag: "学术" },
  { text: "focuses primarily on qualitative interview narratives", keyword: "定性访谈", tag: "学术" },

  // 校园生活与课程管理 (Campus Life & Courses)
  { text: "carries mandatory prerequisites in advanced mathematics", keyword: "先修限制", tag: "课程" },
  { text: "allows students to submit assignments via audio recordings", keyword: "音频作业", tag: "课程" },
  { text: "imposes a strict deduction for late submissions", keyword: "迟交扣分", tag: "课程" },
  { text: "offers one-to-one mentorship from doctoral candidates", keyword: "博导指导", tag: "课程" },
  { text: "grants academic credit for approved overseas internships", keyword: "实习学分", tag: "课程" },
  { text: "restricts library borrowing during examination periods", keyword: "借阅限制", tag: "校园" },
  { text: "is funded entirely through alumni endowment donations", keyword: "校友捐赠", tag: "校园" },
  { text: "provides free shuttle transport between split campuses", keyword: "跨校班车", tag: "校园" },
  { text: "requires students to sign non-disclosure agreements", keyword: "保密协议", tag: "校园" },
  { text: "limits workshop access to registered laboratory members", keyword: "门禁限制", tag: "校园" },

  // 商业管理与市场经济 (Business & Commerce)
  { text: "struggles with sudden currency exchange fluctuations", keyword: "汇率波动", tag: "经济" },
  { text: "relies heavily on seasonal tourist footfall", keyword: "季节客流", tag: "商业" },
  { text: "adopts an aggressive low-pricing penetration strategy", keyword: "低价渗透", tag: "商业" },
  { text: "faced severe patent infringement lawsuits overseas", keyword: "专利侵权", tag: "法律" },
  { text: "benefits from supply chain relocation closer to home", keyword: "供应链回流", tag: "商业" },
  { text: "struggles with high employee turnover in sales roles", keyword: "人员流失", tag: "管理" },
  { text: "attracts substantial venture capital seed funding", keyword: "风投资金", tag: "金融" },
  { text: "failed due to insufficient preliminary market research", keyword: "调研不足", tag: "商业" },
  { text: "depends heavily on automated inventory reordering", keyword: "自动补货", tag: "技术" },
  { text: "prioritises customer retention over new acquisitions", keyword: "老客留存", tag: "营销" },

  // 城市规划与交通基建 (Urban Infrastructure)
  { text: "proves unfeasible due to underground utility cables", keyword: "地下管线", tag: "基建" },
  { text: "prioritises emergency vehicles over private cars", keyword: "应急优先", tag: "交通" },
  { text: "suffered delays waiting for municipal zoning permits", keyword: "规划批文", tag: "政策" },
  { text: "features permeable asphalt to prevent flash flooding", keyword: "透水路面", tag: "生态" },
  { text: "connects isolated rural villages to major rail lines", keyword: "接驳孤岛", tag: "交通" },
  { text: "encourages park-and-ride schemes outside the city core", keyword: "换乘优惠", tag: "交通" },
  { text: "involves demolishing derelict dockside warehouses", keyword: "拆除旧仓", tag: "改造" },
  { text: "incorporates acoustic barriers to block highway noise", keyword: "隔音屏障", tag: "环保" },
  { text: "faces vocal opposition from local heritage campaigners", keyword: "保育反对", tag: "社会" },
  { text: "allocates generous funding for public outdoor plazas", keyword: "广场拨款", tag: "市政" },

  // 环境生态与气候变化 (Environment & Nature)
  { text: "accelerates soil erosion along exposed riverbanks", keyword: "水土流失", tag: "生态" },
  { text: "threatens indigenous bird nesting during spring months", keyword: "鸟类繁育", tag: "生态" },
  { text: "uses natural predators rather than synthetic pesticides", keyword: "生物防治", tag: "农业" },
  { text: "monitors microplastic levels in regional drinking water", keyword: "微塑料监测", tag: "环境" },
  { text: "restores degraded peatland to capture atmospheric carbon", keyword: "泥炭固碳", tag: "气候" },
  { text: "suffers during prolonged seasonal drought periods", keyword: "干旱受损", tag: "自然" },
  { text: "creates wildlife corridors between fragmented forests", keyword: "生态廊道", tag: "生态" },
  { text: "relies on solar panels installed across barn rooftops", keyword: "屋顶光伏", tag: "能源" },
  { text: "encourages rainwater harvesting for agricultural irrigation", keyword: "雨水灌溉", tag: "节水" },
  { text: "faces contamination from legacy industrial pollutants", keyword: "工业污染", tag: "环境" },

  // 心理健康与行为科学 (Psychology & Health)
  { text: "disrupts normal REM sleep cycles in young adults", keyword: "睡眠紊乱", tag: "健康" },
  { text: "exhibits the classic cognitive anchoring effect", keyword: "锚定效应", tag: "心理" },
  { text: "triggers sensory overload in neurodivergent individuals", keyword: "感官过载", tag: "心理" },
  { text: "improves fine motor coordination through daily practice", keyword: "精细动作", tag: "康复" },
  { text: "causes measurable drops in workplace concentration", keyword: "专注力下滑", tag: "心理" },
  { text: "benefits from guided mindfulness breathing exercises", keyword: "正念冥想", tag: "健康" },
  { text: "overcomes initial feelings of social isolation", keyword: "排解孤独", tag: "社交" },
  { text: "reveals significant gender differences in risk perception", keyword: "风险感知", tag: "心理" },
  { text: "reinforces positive behavioural feedback loops", keyword: "正向反馈", tag: "行为" },
  { text: "causes temporary cognitive fatigue after prolonged focus", keyword: "大脑疲劳", tag: "认知" },

  // 科技数字化与人工智能 (Technology & AI)
  { text: "requires biometric fingerprint verification for access", keyword: "指纹验证", tag: "安防" },
  { text: "suffers from latency issues over satellite connections", keyword: "卫星延迟", tag: "通讯" },
  { text: "uses machine learning to predict consumer churn rates", keyword: "流失预测", tag: "算法" },
  { text: "is hindered by legacy database incompatibility", keyword: "旧库不兼容", tag: "技术" },
  { text: "encrypts all sensitive student records end-to-end", keyword: "端到端加密", tag: "隐私" },
  { text: "automates the detection of counterfeit luxury goods", keyword: "假货识别", tag: "AI应用" },
  { text: "struggles with thermal management under heavy computing loads", keyword: "算力发热", tag: "硬件" },
  { text: "replaces paper medical charts with handheld digital tablets", keyword: "无纸平板", tag: "数字化" },
  { text: "depends on continuous sensor telemetry calibration", keyword: "传感器校准", tag: "物联网" },
  { text: "exposes critical vulnerabilities in legacy firmware", keyword: "固件漏洞", tag: "安全" },

  // 艺术历史与文化遗产 (Art, Culture & History)
  { text: "was commissioned by a prominent 18th-century merchant", keyword: "富商委托", tag: "历史" },
  { text: "incorporates intricate geometric Islamic tile patterns", keyword: "伊斯兰花纹", tag: "艺术" },
  { text: "was buried under volcanic ash for several centuries", keyword: "火山灰掩埋", tag: "考古" },
  { text: "showcases rare medieval hand-illuminated manuscripts", keyword: "手抄孤本", tag: "文物" },
  { text: "was originally intended as a temporary military fortress", keyword: "军事要塞", tag: "历史" },
  { text: "preserves oral folklore songs through acoustic recordings", keyword: "口传民谣", tag: "民俗" },
  { text: "combines classical Gothic arches with modernist glass facades", keyword: "哥特混搭", tag: "建筑" },
  { text: "commemorates the signing of the historic peace treaty", keyword: "纪念和约", tag: "历史" },
  { text: "underwent controversial chemical cleaning during the 1960s", keyword: "争议清洗", tag: "文物" },
  { text: "was sculpted from a single block of Carrara marble", keyword: "卡拉拉大理石", tag: "艺术" },
  { text: "displays subtle political satire mocking the monarchy", keyword: "讽刺王室", tag: "艺术" },
  { text: "reflects colonial trade influences in indigenous ceramics", keyword: "殖民陶瓷", tag: "历史" }
];

let content = fs.readFileSync(targetFile, "utf-8");

// Find `const OPTION_SEMANTIC_POOL = [`
const startMarker = "const OPTION_SEMANTIC_POOL = [";
const startIndex = content.indexOf(startMarker);
if (startIndex === -1) {
  console.error("Marker not found");
  process.exit(1);
}

// Find closing `];` for OPTION_SEMANTIC_POOL
const endIndex = content.indexOf("];", startIndex);
if (endIndex === -1) {
  console.error("End bracket not found");
  process.exit(1);
}

const originalPoolStr = content.slice(startIndex + startMarker.length, endIndex);
const additionsStr = ",\n    " + additionalOptions.map(opt => JSON.stringify(opt)).join(",\n    ");

const newContent = content.slice(0, endIndex) + additionsStr + "\n  " + content.slice(endIndex);

fs.writeFileSync(targetFile, newContent, "utf-8");
console.log(`Successfully expanded OPTION_SEMANTIC_POOL by ${additionalOptions.length} items! Total items should now be 96.`);
