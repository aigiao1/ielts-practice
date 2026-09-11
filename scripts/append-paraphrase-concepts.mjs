import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const targetFile = path.resolve(__dirname, "../factory/data/paraphrase-concepts.js");

const newConcepts = [
  // 23. STUDENT_WELLBEING (Positive Impact)
  {
    id: "STUDENT_WELLBEING",
    category: "EDUCATION",
    difficulty: 2,
    meaningZh: "关注身心健康 / 减轻学生焦虑",
    distractorGroup: "POSITIVE_IMPACT",
    sourcePatterns: [
      "actively alleviates stress and exam anxiety among {target}",
      "places top priority on physical and psychological wellness of {target}",
      "helps learners maintain a healthy study-life balance during {period}",
      "boosts morale and reduces emotional burnout across {target}"
    ],
    targetPatterns: [
      "promotes learner mental wellbeing",
      "supports students' emotional health",
      "helps reduce academic pressure"
    ],
    slots: {
      target: ["first-year undergraduates", "postgraduate researchers", "overseas exchange students", "graduating seniors"],
      period: ["the final examination term", "the intensive thesis submission phase", "the autumn induction week"]
    },
    explanationTpl: "alleviates stress / psychological wellness ↔ mental wellbeing / reduce pressure。"
  },

  // 24. SKILL_TRANSFER (Positive Impact)
  {
    id: "SKILL_TRANSFER",
    category: "EDUCATION",
    difficulty: 3,
    meaningZh: "技能迁移 / 学以致用",
    distractorGroup: "POSITIVE_IMPACT",
    sourcePatterns: [
      "enables participants to directly apply theoretical concepts to {context}",
      "equips trainees with adaptable skills that translate seamlessly into {context}",
      "bridges the gap between classroom theory and real-world {context}",
      "allows students to transfer analytical techniques into {context}"
    ],
    targetPatterns: [
      "facilitates practical skill transfer",
      "enables direct application in the workplace",
      "connects academic study with practical execution"
    ],
    slots: {
      context: ["commercial software projects", "hospital clinical practice", "corporate management settings", "field engineering operations"]
    },
    explanationTpl: "apply concepts to real-world context ↔ practical skill transfer / direct application。"
  },

  // 25. PUBLIC_HEALTH_BENEFIT (Positive Impact)
  {
    id: "PUBLIC_HEALTH_BENEFIT",
    category: "HEALTH",
    difficulty: 2,
    meaningZh: "促进公众健康 / 预防生活方式疾病",
    distractorGroup: "POSITIVE_IMPACT",
    sourcePatterns: [
      "encourages regular physical exercise among {group}",
      "substantially lowers the long-term risk of cardiovascular disease in {group}",
      "fosters wholesome lifestyle habits that prevent chronic ailments",
      "makes active daily movement accessible for {group}"
    ],
    targetPatterns: [
      "delivers significant health benefits",
      "encourages a more active lifestyle",
      "helps prevent chronic health conditions"
    ],
    slots: {
      group: ["desk-bound office workers", "older suburban residents", "secondary school adolescents", "urban commuters"]
    },
    explanationTpl: "lowers risk of disease / encourages exercise ↔ significant health benefits / active lifestyle。"
  },

  // 26. DIGITAL_ACCESSIBILITY (Positive Impact)
  {
    id: "DIGITAL_ACCESSIBILITY",
    category: "TECHNOLOGY",
    difficulty: 3,
    meaningZh: "消除数字鸿沟 / 无障碍访问",
    distractorGroup: "POSITIVE_IMPACT",
    sourcePatterns: [
      "removes digital barriers for users who struggle with {device}",
      "makes essential public services reachable via simple phone interfaces without {device}",
      "ensures visually impaired individuals can effortlessly navigate {platform}",
      "broadens access so no demographic is left behind online"
    ],
    targetPatterns: [
      "improves digital accessibility",
      "ensures inclusive technological access",
      "caters to users with varied technical abilities"
    ],
    slots: {
      device: ["complicated touch-screen kiosks", "expensive high-end smartphones", "high-speed broadband connections"],
      platform: ["the official local council portal", "the hospital appointment system", "the university digital repository"]
    },
    explanationTpl: "removes digital barriers / visually impaired can navigate ↔ improves accessibility / inclusive access。"
  },

  // 27. ECONOMIC_GROWTH (Positive Impact)
  {
    id: "ECONOMIC_GROWTH",
    category: "BUSINESS",
    difficulty: 2,
    meaningZh: "带动本地经济 / 促进就业与消费",
    distractorGroup: "POSITIVE_IMPACT",
    sourcePatterns: [
      "injects substantial revenue directly into local {businesses}",
      "creates hundreds of seasonal job opportunities across {region}",
      "attracts high-spending visitors who patronise neighborhood {businesses}",
      "provides a powerful financial stimulus for {region}"
    ],
    targetPatterns: [
      "boosts the local economy",
      "stimulates regional commerce and employment",
      "generates commercial revenue for nearby traders"
    ],
    slots: {
      businesses: ["independent cafes and restaurants", "family-run boutique hotels", "specialist retail craft shops"],
      region: ["the historic docklands district", "the seaside tourist corridor", "the rural market town"]
    },
    explanationTpl: "injects revenue / creates jobs ↔ boosts local economy / stimulates commerce。"
  },

  // 28. STAFF_SHORTAGE (Operational Challenge)
  {
    id: "STAFF_SHORTAGE",
    category: "MANAGEMENT",
    difficulty: 3,
    meaningZh: "人员匮乏 / 严重人手不足",
    distractorGroup: "OPERATIONAL_CHALLENGE",
    sourcePatterns: [
      "is severely undermined by a lack of qualified {role}",
      "struggles continuously because vacancies for skilled {role} remain unfilled",
      "faces acute staffing deficits that constrain daily operations",
      "cannot cope with demand due to an insufficient headcount of {role}"
    ],
    targetPatterns: [
      "suffers from serious staff shortages",
      "struggles with inadequate manpower",
      "is hampered by a lack of personnel"
    ],
    slots: {
      role: ["bilingual laboratory assistants", "experienced nursing specialists", "certified heavy-vehicle drivers", "qualified child educators"]
    },
    explanationTpl: "lack of qualified staff / unfilled vacancies ↔ serious staff shortages / inadequate manpower。"
  },

  // 29. COORDINATION_FAILURE (Operational Challenge)
  {
    id: "COORDINATION_FAILURE",
    category: "MANAGEMENT",
    difficulty: 4,
    meaningZh: "跨部门沟通不畅 / 协调脱节",
    distractorGroup: "OPERATIONAL_CHALLENGE",
    sourcePatterns: [
      "suffered from breakdown in communication between {deptA} and {deptB}",
      "failed because teams worked in isolated silos without consulting {deptB}",
      "generated friction due to mismatched objectives between {deptA} and {deptB}",
      "lacked unified leadership connecting different working divisions"
    ],
    targetPatterns: [
      "resulted from poor inter-departmental coordination",
      "was hindered by communication breakdowns",
      "lacked effective cross-team cooperation"
    ],
    slots: {
      deptA: ["the central planning authority", "the technical design department", "the commercial sales team"],
      deptB: ["the on-site construction contractors", "the frontline maintenance division", "the external regulatory auditors"]
    },
    explanationTpl: "breakdown in communication / working in silos ↔ poor coordination / communication breakdowns。"
  },

  // 30. RESISTANCE_TO_CHANGE (Operational Challenge)
  {
    id: "RESISTANCE_TO_CHANGE",
    category: "PSYCHOLOGY",
    difficulty: 3,
    meaningZh: "抗拒改革 / 固守原有习惯",
    distractorGroup: "OPERATIONAL_CHALLENGE",
    sourcePatterns: [
      "met with fierce opposition from {group} who preferred customary routines",
      "encountered persistent reluctance from {group} unwilling to abandon established practices",
      "sparked widespread pushback because people distrusted the new guidelines",
      "found staff clinging firmly to legacy procedures"
    ],
    targetPatterns: [
      "faced resistance to proposed changes",
      "encountered reluctance to adopt new methods",
      "met with opposition from existing users"
    ],
    slots: {
      group: ["long-serving senior lecturers", "traditional manufacturing artisans", "local transport operators", "veteran administrative staff"]
    },
    explanationTpl: "fierce opposition / reluctant to abandon established practices ↔ resistance to changes。"
  },

  // 31. TECHNICAL_BREAKDOWN (Operational Challenge)
  {
    id: "TECHNICAL_BREAKDOWN",
    category: "TECHNOLOGY",
    difficulty: 2,
    meaningZh: "设备故障 / 系统反复崩溃",
    distractorGroup: "OPERATIONAL_CHALLENGE",
    sourcePatterns: [
      "is constantly plagued by glitchy software crashes in {component}",
      "suffered repeated mechanical failures that brought {component} to a standstill",
      "proves notoriously unreliable owing to frequent technical malfunctions",
      "shuts down unexpectedly because {component} overheats during operation"
    ],
    targetPatterns: [
      "is prone to technical failures",
      "suffers from frequent system malfunctions",
      "is unreliable due to recurring breakdowns"
    ],
    slots: {
      component: ["the central booking server", "the automated ticketing gate", "the water filtration sensor array", "the climate-control thermostat"]
    },
    explanationTpl: "plagued by crashes / repeated mechanical failures ↔ prone to technical failures / malfunctions。"
  },

  // 32. MATERIAL_SCARCITY (Resource Limit)
  {
    id: "MATERIAL_SCARCITY",
    category: "MANAGEMENT",
    difficulty: 3,
    meaningZh: "原材料短缺 / 供应受阻",
    distractorGroup: "RESOURCE_LIMIT",
    sourcePatterns: [
      "was halted when global shipments of {material} completely dried up",
      "grappled with a severe worldwide deficit in high-grade {material}",
      "could not complete fabrication owing to depleted supplies of {material}",
      "struggled to source sufficient quantities of certified {material}"
    ],
    targetPatterns: [
      "faces a shortage of essential raw materials",
      "was disrupted by scarce material supplies",
      "is constrained by supply chain deficits"
    ],
    slots: {
      material: ["refined lithium battery cells", "seasoned Scandinavian timber", "specialised pharmaceutical compounds", "recycled aluminium extrusion"]
    },
    explanationTpl: "shipments dried up / deficit in high-grade materials ↔ shortage of raw materials。"
  },

  // 33. TIME_PRESSURE (Resource Limit)
  {
    id: "TIME_PRESSURE",
    category: "MANAGEMENT",
    difficulty: 2,
    meaningZh: "工期极度紧张 / 时间仓促",
    distractorGroup: "RESOURCE_LIMIT",
    sourcePatterns: [
      "leaves barely enough time for the team to thoroughly test {stage}",
      "forces researchers into an impossibly tight deadline before {event}",
      "demands an intense rush to submit documents within a mere forty-eight hours",
      "compresses months of fieldwork into an unforgivingly brief timetable"
    ],
    targetPatterns: [
      "operates under severe time constraints",
      "is rushed due to tight deadlines",
      "allows insufficient time for comprehensive review"
    ],
    slots: {
      stage: ["the primary safety protocols", "the bilingual user interface", "the structural load simulations"],
      event: ["the international summit", "the annual accreditation audit", "the formal public unveiling"]
    },
    explanationTpl: "barely enough time / tight deadline ↔ severe time constraints / rushed。"
  },

  // 34. BUDGET_OVERRUN (Resource Limit)
  {
    id: "BUDGET_OVERRUN",
    category: "BUSINESS",
    difficulty: 3,
    meaningZh: "严重超出预算 / 资金赤字",
    distractorGroup: "RESOURCE_LIMIT",
    sourcePatterns: [
      "soared past initial cost projections by over {percent} percent",
      "swallowed up far more funds than was originally allocated in the fiscal plan",
      "incurred unexpected runaway expenses that ballooned total outlays",
      "drained contingency accounts long before project completion"
    ],
    targetPatterns: [
      "substantially exceeded the allocated budget",
      "suffered from major cost overruns",
      "cost significantly more than anticipated"
    ],
    slots: {
      percent: ["twenty-five", "forty", "fifty", "sixty-five"]
    },
    explanationTpl: "soared past initial projections / ballooned total outlays ↔ exceeded allocated budget / cost overruns。"
  },

  // 35. GRADUAL_IMPROVEMENT (Time Progress)
  {
    id: "GRADUAL_IMPROVEMENT",
    category: "ACADEMIC",
    difficulty: 2,
    meaningZh: "循序渐进 / 稳步显现成效",
    distractorGroup: "TIME_PROGRESS",
    sourcePatterns: [
      "does not yield instant miracles but shows steady gains in {metric} over months",
      "takes time to bear fruit, with incremental progress emerging after {duration}",
      "demonstrates cumulative positive changes that unfold step-by-step",
      "shows a slow and methodical upward trajectory rather than overnight success"
    ],
    targetPatterns: [
      "produces gradual, incremental improvement",
      "takes time to show measurable benefits",
      "yields steady long-term progress"
    ],
    slots: {
      metric: ["student reading fluency", "energy conservation savings", "patient joint mobility", "staff retention rates"],
      duration: ["twelve weeks of structured practice", "six months of routine monitoring", "two full academic semesters"]
    },
    explanationTpl: "steady gains over months / takes time to bear fruit ↔ gradual, incremental improvement。"
  },

  // 36. PHASED_ROLLOUT (Time Progress)
  {
    id: "PHASED_ROLLOUT",
    category: "MANAGEMENT",
    difficulty: 3,
    meaningZh: "分阶段逐步推行 / 试点后推广",
    distractorGroup: "TIME_PROGRESS",
    sourcePatterns: [
      "will first be piloted in {location} before expanding nationwide",
      "is being introduced in three distinct consecutive stages",
      "rolls out gradually sector by sector rather than in one sudden launch",
      "begins with a small trial cohort before opening to general enrollment"
    ],
    targetPatterns: [
      "is being implemented in stages",
      "adopts a phased rollout approach",
      "starts with a trial before wider deployment"
    ],
    slots: {
      location: ["selected suburban pilot clinics", "two designated university campuses", "the northern industrial corridor"]
    },
    explanationTpl: "piloted before expanding / introduced in distinct stages ↔ implemented in stages / phased rollout。"
  },

  // 37. DEADLINE_MISSED (Time Progress)
  {
    id: "DEADLINE_MISSED",
    category: "MANAGEMENT",
    difficulty: 2,
    meaningZh: "未能如期完成 / 逾期",
    distractorGroup: "TIME_PROGRESS",
    sourcePatterns: [
      "failed to deliver final drawings by the scheduled date of {date}",
      "overshot the non-negotiable deadline set by the university board",
      "could not hand in the completed portfolio in time for {event}",
      "was unable to meet the agreed handover date"
    ],
    targetPatterns: [
      "failed to meet the target completion deadline",
      "was unable to finish on time",
      "overshot the agreed schedule"
    ],
    slots: {
      date: ["the fifteenth of October", "the end of Michaelmas term", "the first of March"],
      event: ["the external moderation committee", "the regional competition judging", "the funding renewal meeting"]
    },
    explanationTpl: "failed to deliver by scheduled date / overshot deadline ↔ failed to meet target deadline。"
  },

  // 38. PEER_REVIEW (Method & Policy)
  {
    id: "PEER_REVIEW",
    category: "EDUCATION",
    difficulty: 3,
    meaningZh: "同伴互评 / 互相评估作业",
    distractorGroup: "METHOD_AND_POLICY",
    sourcePatterns: [
      "requires classmates to read and critique each other's {assignment}",
      "involves presenting your draft to fellow students for constructive feedback",
      "incorporates structured reciprocal grading between peer pairs",
      "relies on mutual evaluation among study group members"
    ],
    targetPatterns: [
      "involves peer assessment and feedback",
      "requires students to review each other's work",
      "incorporates collaborative peer evaluation"
    ],
    slots: {
      assignment: ["experimental lab reports", "business proposal drafts", "architectural sketches", "academic research essays"]
    },
    explanationTpl: "critique each other's drafts / reciprocal grading ↔ peer assessment / review each other's work。"
  },

  // 39. STANDARDISED_TESTING (Method & Policy)
  {
    id: "STANDARDISED_TESTING",
    category: "EDUCATION",
    difficulty: 2,
    meaningZh: "标准化统考 / 统一基准测试",
    distractorGroup: "METHOD_AND_POLICY",
    sourcePatterns: [
      "gauges all candidates using the exact same formal written examination",
      "evaluates performance strictly against uniform nationwide benchmarks",
      "subjects everyone to identical timed multiple-choice papers",
      "measures candidate competencies using standardised scoring criteria"
    ],
    targetPatterns: [
      "uses standardised formal assessment",
      "applies uniform testing criteria",
      "evaluates candidates through identical examinations"
    ],
    slots: {},
    explanationTpl: "exact same formal examination / uniform benchmarks ↔ standardised formal assessment。"
  },

  // 40. COMPULSORY_ATTENDANCE (Method & Policy)
  {
    id: "COMPULSORY_ATTENDANCE",
    category: "EDUCATION",
    difficulty: 2,
    meaningZh: "强制出勤 / 缺课直接扣分",
    distractorGroup: "METHOD_AND_POLICY",
    sourcePatterns: [
      "makes physical presence at every {session} mandatory for course credit",
      "strictly penalises students whose attendance drops below {threshold} percent",
      "does not allow learners to skip practical laboratory modules",
      "requires non-negotiable roll-call check-ins at every scheduled lecture"
    ],
    targetPatterns: [
      "enforces mandatory attendance",
      "requires compulsory participation",
      "does not allow sessions to be missed"
    ],
    slots: {
      session: ["weekly seminar discussion", "laboratory dissection tutorial", "fieldwork survey outing"],
      threshold: ["eighty", "eighty-five", "ninety"]
    },
    explanationTpl: "mandatory for credit / penalises attendance below 80% ↔ enforces mandatory attendance。"
  },

  // 41. BLENDED_LEARNING (Method & Policy)
  {
    id: "BLENDED_LEARNING",
    category: "EDUCATION",
    difficulty: 3,
    meaningZh: "线上线下结合 / 混合式教学",
    distractorGroup: "METHOD_AND_POLICY",
    sourcePatterns: [
      "combines digital video lectures with face-to-face {activity}",
      "mixes self-paced online modules with weekly classroom discussions",
      "merges remote virtual resources with tangible in-person laboratory sessions",
      "integrates web-based study with traditional tutor-led seminars"
    ],
    targetPatterns: [
      "utilises a blended learning format",
      "combines online modules with in-person sessions",
      "mixes virtual study with face-to-face teaching"
    ],
    slots: {
      activity: ["hands-on studio workshops", "small-group problem-solving tutorials", "guided lab experiments"]
    },
    explanationTpl: "combines digital lectures with face-to-face workshops ↔ blended learning format。"
  },

  // 42. EXPERT_CONSULTATION (Method & Policy)
  {
    id: "EXPERT_CONSULTATION",
    category: "ACADEMIC",
    difficulty: 3,
    meaningZh: "寻求专家指导 / 行业资深意见",
    distractorGroup: "METHOD_AND_POLICY",
    sourcePatterns: [
      "invites feedback from seasoned {specialist} before finalizing the report",
      "seeks professional counsel from leading authorities in {field}",
      "arranges one-on-one advisory reviews with experienced industry consultants",
      "consults outside subject-matter practitioners to validate preliminary findings"
    ],
    targetPatterns: [
      "seeks advice from external experts",
      "consults specialist practitioners",
      "involves professional external consultation"
    ],
    slots: {
      specialist: ["environmental law practitioners", "senior clinical pharmacists", "structural engineering fellows"],
      field: ["marine biodiversity", "renewable solar infrastructure", "paediatric neurodevelopment"]
    },
    explanationTpl: "feedback from seasoned specialists / counsel from leading authorities ↔ advice from external experts。"
  },

  // 43. CONGESTION_RELIEF (Urban Transport)
  {
    id: "CONGESTION_RELIEF",
    category: "TRANSPORT",
    difficulty: 2,
    meaningZh: "缓解拥堵 / 畅通主干道",
    distractorGroup: "URBAN_TRANSPORT",
    sourcePatterns: [
      "eases bumper-to-bumper morning tailbacks along {corridor}",
      "clears gridlock that routinely snarls rush-hour traffic in {corridor}",
      "keeps private vehicles moving smoothly and cuts journey delays",
      "substantially reduces traffic bottlenecks through the town centre"
    ],
    targetPatterns: [
      "alleviates severe traffic congestion",
      "improves traffic flow along major corridors",
      "reduces peak-hour gridlock"
    ],
    slots: {
      corridor: ["the ring road orbital bypass", "the coastal arterial highway", "the historic bridge crossing"]
    },
    explanationTpl: "eases bumper-to-bumper tailbacks / clears gridlock ↔ alleviates traffic congestion。"
  },

  // 44. CYCLING_INFRASTRUCTURE (Urban Transport)
  {
    id: "CYCLING_INFRASTRUCTURE",
    category: "TRANSPORT",
    difficulty: 2,
    meaningZh: "独立自行车道 / 骑行配套设施",
    distractorGroup: "URBAN_TRANSPORT",
    sourcePatterns: [
      "constructs physically segregated cycle tracks along {roadway}",
      "installs secure bike storage lockers and repair stations near {roadway}",
      "safeguards cyclists from motor traffic with curbed bike lanes",
      "creates a comprehensive network of dedicated pedal pathways"
    ],
    targetPatterns: [
      "expands dedicated cycling facilities",
      "provides segregated bicycle infrastructure",
      "enhances safety for cyclists"
    ],
    slots: {
      roadway: ["the main university thoroughfare", "the waterfront promenade", "the central railway avenue"]
    },
    explanationTpl: "segregated cycle tracks / secure bike lockers ↔ dedicated cycling facilities。"
  },

  // 45. PUBLIC_TRANSIT_EXPANSION (Urban Transport)
  {
    id: "PUBLIC_TRANSIT_EXPANSION",
    category: "TRANSPORT",
    difficulty: 3,
    meaningZh: "公交轻轨扩建 / 增加班次与覆盖",
    distractorGroup: "URBAN_TRANSPORT",
    sourcePatterns: [
      "extends the light rail network outward to connect {suburb}",
      "doubles the frequency of electric feeder buses serving {suburb}",
      "introduces late-night rapid tram services across underserved districts",
      "widens mass transit coverage so commuters can leave cars at home"
    ],
    targetPatterns: [
      "expands public transportation networks",
      "increases public transit frequency and coverage",
      "enhances bus and tram connectivity"
    ],
    slots: {
      suburb: ["the outlying residential satellite town", "the new high-tech enterprise zone", "the eastern medical park"]
    },
    explanationTpl: "extends light rail / doubles bus frequency ↔ expands public transportation。"
  },

  // 46. PEDESTRIAN_PRIORITY (Urban Transport)
  {
    id: "PEDESTRIAN_PRIORITY",
    category: "TRANSPORT",
    difficulty: 2,
    meaningZh: "步行街改造 / 行人优先",
    distractorGroup: "URBAN_TRANSPORT",
    sourcePatterns: [
      "bars motor vehicles completely from {zone} to create a peaceful walkway",
      "redesigns high streets so people walking always have the right of way over {zone}",
      "creates a car-free shopping haven with wide stone paving",
      "transforms the historical shopping square into an exclusive pedestrian precinct"
    ],
    targetPatterns: [
      "creates car-free pedestrian zones",
      "prioritises pedestrian access over vehicles",
      "establishes dedicated pedestrian precincts"
    ],
    slots: {
      zone: ["the historic cathedral precinct", "the central market boulevard", "the bustling waterfront plaza"]
    },
    explanationTpl: "bars motor vehicles / car-free shopping haven ↔ creates car-free pedestrian zones。"
  },

  // 47. PARKING_RESTRICTION (Urban Transport)
  {
    id: "PARKING_RESTRICTION",
    category: "TRANSPORT",
    difficulty: 2,
    meaningZh: "严控停车位 / 停车收费限制",
    distractorGroup: "URBAN_TRANSPORT",
    sourcePatterns: [
      "sharply reduces permitted kerbside parking bays in {area}",
      "introduces punitive hourly parking tariffs to deter private driving into {area}",
      "enforces strict permit-only restrictions on resident streets",
      "limits visitor vehicle stays to a strict maximum of sixty minutes"
    ],
    targetPatterns: [
      "imposes strict parking restrictions",
      "discourages vehicle parking through higher charges",
      "limits available parking capacity"
    ],
    slots: {
      area: ["the commercial downtown centre", "the heritage university quarter", "the crowded hospital district"]
    },
    explanationTpl: "reduces parking bays / punitive parking tariffs ↔ strict parking restrictions。"
  },

  // 48. TRAFFIC_CALMING (Urban Transport)
  {
    id: "TRAFFIC_CALMING",
    category: "TRANSPORT",
    difficulty: 3,
    meaningZh: "交通静化 / 限速带与环岛减速",
    distractorGroup: "URBAN_TRANSPORT",
    sourcePatterns: [
      "installs raised speed bumps and chicanes along {lane}",
      "lowers the mandatory speed ceiling to twenty miles per hour near {lane}",
      "narrows lane widths with planted curb extensions to force motorists to slow down",
      "employs physical road engineering to curb reckless speeding"
    ],
    targetPatterns: [
      "implements traffic calming measures",
      "forces vehicles to reduce travel speeds",
      "improves road safety via physical design"
    ],
    slots: {
      lane: ["residential school-commute streets", "the suburban residential crescent", "the park perimeter roadway"]
    },
    explanationTpl: "speed bumps and chicanes / 20 mph ceiling ↔ traffic calming measures / reduce speeds。"
  },

  // 49. PREVENTIVE_CARE (Health Medical)
  {
    id: "PREVENTIVE_CARE",
    category: "HEALTH",
    difficulty: 2,
    meaningZh: "预防性干预 / 防患于未然",
    distractorGroup: "HEALTH_MEDICAL",
    sourcePatterns: [
      "focuses on spotting warning signs early rather than treating advanced {illness}",
      "prioritises routine baseline screenings to avert complications from {illness}",
      "emphasises early behavioural interventions before symptoms turn severe",
      "shifts the clinical strategy from emergency response to preemptive wellness"
    ],
    targetPatterns: [
      "focuses on preventive healthcare",
      "emphasises early intervention and screening",
      "aims to prevent conditions before they escalate"
    ],
    slots: {
      illness: ["type two adult diabetes", "chronic pulmonary disease", "osteoporotic bone fractures", "high blood pressure"]
    },
    explanationTpl: "spotting warning signs early / routine baseline screenings ↔ preventive healthcare / early intervention。"
  },

  // 50. MENTAL_HEALTH_SUPPORT (Health Medical)
  {
    id: "MENTAL_HEALTH_SUPPORT",
    category: "HEALTH",
    difficulty: 2,
    meaningZh: "心理健康支持 / 心理疏导咨询",
    distractorGroup: "HEALTH_MEDICAL",
    sourcePatterns: [
      "offers confidential one-on-one psychological counselling for {client}",
      "sets up dedicated peer support circles to help with emotional distress in {client}",
      "provides round-the-clock telephone helplines for anxiety and depression",
      "ensures accessible therapeutic interventions for psychological struggles"
    ],
    targetPatterns: [
      "provides mental health counseling and support",
      "addresses psychological and emotional needs",
      "offers professional therapeutic assistance"
    ],
    slots: {
      client: ["struggling adolescent pupils", "frontline medical personnel", "isolated elderly residents"]
    },
    explanationTpl: "confidential counselling / help with emotional distress ↔ mental health counseling / psychological support。"
  },

  // 51. LONG_TERM_RECOVERY (Health Medical)
  {
    id: "LONG_TERM_RECOVERY",
    category: "HEALTH",
    difficulty: 3,
    meaningZh: "长期康复治疗 / 渐进式理疗恢复",
    distractorGroup: "HEALTH_MEDICAL",
    sourcePatterns: [
      "entails months of supervised physical therapy following {surgery}",
      "demands a slow, phased rehabilitation regimen to regain full movement after {surgery}",
      "requires continuous post-operative monitoring and gradual mobility exercises",
      "takes extensive recuperative physiotherapy before patients resume regular activity"
    ],
    targetPatterns: [
      "requires extended physical rehabilitation",
      "involves a long-term recovery process",
      "demands ongoing post-operative physiotherapy"
    ],
    slots: {
      surgery: ["complex knee ligament replacement", "emergency spinal cord decompression", "major cardiac bypass surgery"]
    },
    explanationTpl: "months of supervised physical therapy / slow rehabilitation ↔ extended physical rehabilitation。"
  },

  // 52. EARLY_DIAGNOSIS (Health Medical)
  {
    id: "EARLY_DIAGNOSIS",
    category: "HEALTH",
    difficulty: 3,
    meaningZh: "早期确诊 / 尽早发现病变",
    distractorGroup: "HEALTH_MEDICAL",
    sourcePatterns: [
      "detects microscopic cellular abnormalities years before {disease} becomes symptomatic",
      "identifies subtle early blood markers for prompt clinical intervention in {disease}",
      "catches degenerative conditions in their initial stage when therapy is most effective",
      "enables clinicians to diagnose disorders well ahead of clinical manifestation"
    ],
    targetPatterns: [
      "facilitates early diagnosis and detection",
      "identifies conditions at an early developmental stage",
      "enables timely clinical intervention"
    ],
    slots: {
      disease: ["rheumatoid arthritis", "early-onset cognitive decline", "malignant skin melanoma"]
    },
    explanationTpl: "detects abnormalities before symptomatic / catches in initial stage ↔ early diagnosis / timely intervention。"
  },

  // 53. PATIENT_AUTONOMY (Health Medical)
  {
    id: "PATIENT_AUTONOMY",
    category: "HEALTH",
    difficulty: 4,
    meaningZh: "患者自主权 / 自主选择治疗方案",
    distractorGroup: "HEALTH_MEDICAL",
    sourcePatterns: [
      "empowers patients to make informed choices regarding their own {treatment}",
      "respects the individual's ultimate right to decline or select specific {treatment}",
      "involves sufferers directly in collaborative decisions about therapeutic pathways",
      "moves away from doctor-knows-best paternalism toward shared decision-making"
    ],
    targetPatterns: [
      "promotes patient autonomy in decision-making",
      "empowers individuals to choose treatments",
      "involves patients directly in care decisions"
    ],
    slots: {
      treatment: ["experimental oncology medication", "invasive elective surgical options", "long-term palliative care strategies"]
    },
    explanationTpl: "empowers patients to make choices / shared decision-making ↔ patient autonomy in decisions。"
  },

  // 54. HOLISTIC_TREATMENT (Health Medical)
  {
    id: "HOLISTIC_TREATMENT",
    category: "HEALTH",
    difficulty: 3,
    meaningZh: "整体综合疗法 / 兼顾身心情绪与生活方式",
    distractorGroup: "HEALTH_MEDICAL",
    sourcePatterns: [
      "treats the whole person including nutrition and stress rather than just prescribing {drug}",
      "combines medicinal therapy with lifestyle adjustments, sleep hygiene and dietary overhaul",
      "looks beyond isolated symptoms to evaluate social and environmental wellness factors",
      "integrates physical rehabilitation with psychological and nutritional guidance"
    ],
    targetPatterns: [
      "adopts a holistic approach to care",
      "combines medical treatment with lifestyle factors",
      "addresses physical and emotional wellness together"
    ],
    slots: {
      drug: ["standard synthetic painkillers", "strong anti-inflammatory pharmaceuticals", "daily hormonal pills"]
    },
    explanationTpl: "treats the whole person / combines medicine with lifestyle ↔ holistic approach to care。"
  },

  // 55. MARKET_COMPETITION (Business Economy)
  {
    id: "MARKET_COMPETITION",
    category: "BUSINESS",
    difficulty: 3,
    meaningZh: "行业竞争激烈 / 争夺市场份额",
    distractorGroup: "BUSINESS_ECONOMY",
    sourcePatterns: [
      "faces fierce rivalry from well-funded commercial giants in {industry}",
      "competes against aggressive low-cost market disruptors in {industry}",
      "struggles to stand out in an increasingly saturated and cut-throat commercial arena",
      "navigates relentless competition for dwindling customer attention"
    ],
    targetPatterns: [
      "faces intense market competition",
      "operates in a highly competitive sector",
      "struggles against established commercial rivals"
    ],
    slots: {
      industry: ["the cloud software sector", "the boutique organic beverage market", "the budget domestic flight industry"]
    },
    explanationTpl: "fierce rivalry from giants / cut-throat arena ↔ intense market competition。"
  },

  // 56. STARTUP_RISK (Business Economy)
  {
    id: "STARTUP_RISK",
    category: "BUSINESS",
    difficulty: 3,
    meaningZh: "初创期高风险 / 早期夭折率高",
    distractorGroup: "BUSINESS_ECONOMY",
    sourcePatterns: [
      "involves immense commercial hazard where eight out of ten ventures fail within {time}",
      "carries a high probability of early insolvency before cash-flow stabilizes",
      "demands founders risk substantial private savings on an unproven market proposition",
      "is fraught with vulnerability during the perilous initial launch period"
    ],
    targetPatterns: [
      "carries high entrepreneurial risk",
      "faces significant risk of early failure",
      "is vulnerable to initial financial instability"
    ],
    slots: {
      time: ["twenty-four months", "the initial three years", "the first eighteen months"]
    },
    explanationTpl: "immense commercial hazard / high probability of insolvency ↔ high entrepreneurial risk。"
  },

  // 57. OUTSOURCING_BENEFIT (Business Economy)
  {
    id: "OUTSOURCING_BENEFIT",
    category: "BUSINESS",
    difficulty: 3,
    meaningZh: "外包非核心业务 / 节约成本与精力",
    distractorGroup: "BUSINESS_ECONOMY",
    sourcePatterns: [
      "contracts out routine {function} to external specialists so internal staff can focus on growth",
      "delegates non-core administrative overhead like {function} to third-party providers",
      "cuts operational payroll by relying on specialized external vendors for {function}",
      "avoids keeping costly permanent departments by using flexible outside contractors"
    ],
    targetPatterns: [
      "benefits from outsourcing non-core functions",
      "uses external providers to reduce overhead",
      "contracts third parties for specialised services"
    ],
    slots: {
      function: ["payroll accounting and tax compliance", "customer service call-centre staffing", "warehouse logistics and dispatch"]
    },
    explanationTpl: "contracts out to external specialists / delegates non-core overhead ↔ outsourcing non-core functions。"
  },

  // 58. BRAND_REPUTATION (Business Economy)
  {
    id: "BRAND_REPUTATION",
    category: "BUSINESS",
    difficulty: 2,
    meaningZh: "企业声誉与口碑 / 品牌信任度",
    distractorGroup: "BUSINESS_ECONOMY",
    sourcePatterns: [
      "depends heavily on maintaining an untarnished public image for {attribute}",
      "built a loyal consumer following through thirty years of uncompromising {attribute}",
      "suffered irreversible brand damage when scandals over product quality surfaced",
      "relies on positive word-of-mouth recommendations from satisfied clients"
    ],
    targetPatterns: [
      "relies on a strong brand reputation",
      "depends on consumer trust and goodwill",
      "is vulnerable to reputational damage"
    ],
    slots: {
      attribute: ["ethical ingredient sourcing", "exceptional post-sales client support", "transparent pricing policies"]
    },
    explanationTpl: "untarnished public image / loyal following through quality ↔ strong brand reputation / consumer trust。"
  },

  // 59. COST_REDUCTION (Business Economy)
  {
    id: "COST_REDUCTION",
    category: "BUSINESS",
    difficulty: 2,
    meaningZh: "削减运营成本 / 精简开销",
    distractorGroup: "BUSINESS_ECONOMY",
    sourcePatterns: [
      "substantially trims unnecessary overhead expenditure on {expense}",
      "slashes recurring operational bills by renegotiating contracts for {expense}",
      "delivers considerable financial savings through automated workflow efficiency",
      "eliminates redundant administrative steps to lower production costs"
    ],
    targetPatterns: [
      "achieves significant cost reduction",
      "trims overall operational expenditure",
      "lowers recurring business overheads"
    ],
    slots: {
      expense: ["commercial office leasing", "third-party distribution freight", "high-volume paper stationery supplies"]
    },
    explanationTpl: "trims unnecessary expenditure / slashes recurring bills ↔ cost reduction / trims expenditure。"
  },

  // 60. CONSUMER_DEMAND (Business Economy)
  {
    id: "CONSUMER_DEMAND",
    category: "BUSINESS",
    difficulty: 2,
    meaningZh: "消费者需求旺盛 / 市场青睐",
    distractorGroup: "BUSINESS_ECONOMY",
    sourcePatterns: [
      "has seen orders surge dramatically as buyers clamour for {product}",
      "taps into a booming consumer appetite for sustainable, cruelty-free {product}",
      "cannot produce units fast enough to satisfy eager waiting lists of shoppers",
      "experiences phenomenal retail sales driven by shifting public tastes"
    ],
    targetPatterns: [
      "experiences high consumer demand",
      "benefits from strong customer appetite",
      "enjoys robust commercial market demand"
    ],
    slots: {
      product: ["plant-based dairy alternatives", "locally-crafted recycled furniture", "energy-efficient smart thermostats"]
    },
    explanationTpl: "orders surge dramatically / buyers clamour for product ↔ high consumer demand。"
  },

  // 61. DATA_PRIVACY (Digital Tech)
  {
    id: "DATA_PRIVACY",
    category: "TECHNOLOGY",
    difficulty: 3,
    meaningZh: "个人隐私保护 / 数据安全隐患",
    distractorGroup: "DIGITAL_TECH",
    sourcePatterns: [
      "raises troubling questions regarding how {entity} collects and monetises confidential personal data",
      "risks exposing users' sensitive browsing history without their explicit consent",
      "demands rigorous encryption standards to safeguard private customer credentials from {entity}",
      "violates regulatory privacy standards by harvesting location telemetry"
    ],
    targetPatterns: [
      "raises serious data privacy concerns",
      "compromises user confidentiality",
      "involves risks to personal data security"
    ],
    slots: {
      entity: ["third-party marketing advertisers", "foreign cloud data brokers", "unregulated algorithmic profiling companies"]
    },
    explanationTpl: "troubling questions on personal data / exposes sensitive history ↔ data privacy concerns。"
  },

  // 62. AUTOMATION_DISPLACEMENT (Digital Tech)
  {
    id: "AUTOMATION_DISPLACEMENT",
    category: "TECHNOLOGY",
    difficulty: 3,
    meaningZh: "自动化取代人工 / 岗位流失",
    distractorGroup: "DIGITAL_TECH",
    sourcePatterns: [
      "makes human workers redundant as intelligent algorithms handle {task}",
      "replaces hundreds of salaried employees with automated robotic systems performing {task}",
      "threatens job security in routine occupations that can be performed by software",
      "accelerates layoffs as corporations swap manual labor for machine processing"
    ],
    targetPatterns: [
      "leads to job displacement through automation",
      "replaces human labor with automated systems",
      "poses threats to employment security"
    ],
    slots: {
      task: ["routine telephone customer inquiries", "warehouse packaging sorting", "standardized legal document drafting"]
    },
    explanationTpl: "makes workers redundant / replaces employees with robotics ↔ job displacement through automation。"
  },

  // 63. DIGITAL_DEPENDENCY (Digital Tech)
  {
    id: "DIGITAL_DEPENDENCY",
    category: "TECHNOLOGY",
    difficulty: 3,
    meaningZh: "过度依赖数字设备 / 离开网络寸步难行",
    distractorGroup: "DIGITAL_TECH",
    sourcePatterns: [
      "leaves individuals completely helpless when {system} suffers a temporary blackout",
      "fosters an unhealthy reliance where people cannot navigate daily life without {system}",
      "erodes basic offline memory and calculation capabilities due to digital crutches",
      "creates a vulnerability where operations collapse the moment connectivity drops"
    ],
    targetPatterns: [
      "creates excessive digital dependency",
      "leads to over-reliance on online systems",
      "weakens independent offline capabilities"
    ],
    slots: {
      system: ["mobile GPS satellite navigation", "centralized cloud authentication", "contactless electronic payment networks"]
    },
    explanationTpl: "completely helpless without system / cannot navigate without ↔ excessive digital dependency。"
  },

  // 64. CYBERSECURITY_RISK (Digital Tech)
  {
    id: "CYBERSECURITY_RISK",
    category: "TECHNOLOGY",
    difficulty: 3,
    meaningZh: "网络黑客威胁 / 系统被入侵勒索",
    distractorGroup: "DIGITAL_TECH",
    sourcePatterns: [
      "leaves {infrastructure} wide open to catastrophic malware and ransomware infiltration",
      "was paralyzed when malicious hackers breached security defenses and seized {infrastructure}",
      "faces sophisticated denial-of-service barrages aimed at crippling servers",
      "exposes critical public utilities to destructive foreign cyber sabotage"
    ],
    targetPatterns: [
      "presents serious cybersecurity vulnerabilities",
      "is vulnerable to malicious cyber attacks",
      "faces threats from malware and hacking"
    ],
    slots: {
      infrastructure: ["the regional electrical power grid", "the municipal hospital database", "the central banking clearance network"]
    },
    explanationTpl: "open to malware / hackers breached defenses ↔ cybersecurity vulnerabilities / cyber attacks。"
  },

  // 65. REMOTE_WORK_BENEFIT (Digital Tech)
  {
    id: "REMOTE_WORK_BENEFIT",
    category: "TECHNOLOGY",
    difficulty: 2,
    meaningZh: "居家远程办公优势 / 免除通勤劳顿",
    distractorGroup: "DIGITAL_TECH",
    sourcePatterns: [
      "spares employees the exhausting two-hour daily commute on {transit}",
      "allows professionals to work comfortably from home without traveling on {transit}",
      "cuts commuting stress and enables staff to live further from expensive city centres",
      "offers the convenience of telecommuting via modern collaborative software"
    ],
    targetPatterns: [
      "offers clear remote working benefits",
      "eliminates daily commuting stress",
      "provides flexibility to work from home"
    ],
    slots: {
      transit: ["overcrowded underground tube trains", "congested suburban freeway traffic", "delayed regional commuter railways"]
    },
    explanationTpl: "spares exhausting daily commute / work comfortably from home ↔ remote working benefits / eliminates commuting。"
  },

  // 66. ALGORITHM_BIAS (Digital Tech)
  {
    id: "ALGORITHM_BIAS",
    category: "TECHNOLOGY",
    difficulty: 4,
    meaningZh: "算法偏见 / 历史数据带来的歧视",
    distractorGroup: "DIGITAL_TECH",
    sourcePatterns: [
      "unwittingly perpetuates historical prejudice against {group} because training data was skewed",
      "displays subtle systemic discrimination against {group} in automated screening results",
      "reinforces unfair social stereotyping disguised as objective algorithmic scoring",
      "disadvantages marginalized demographics due to unrepresentative initial datasets"
    ],
    targetPatterns: [
      "reflects underlying algorithmic bias",
      "produces discriminatory outcomes",
      "perpetuates unfair systemic bias"
    ],
    slots: {
      group: ["female applicants for engineering roles", "minority residential loan seekers", "candidates from underprivileged postcodes"]
    },
    explanationTpl: "perpetuates historical prejudice / subtle systemic discrimination ↔ algorithmic bias / discriminatory outcomes。"
  },

  // 67. EXCESSIVE_COMPLEXITY (Operational Challenge)
  {
    id: "EXCESSIVE_COMPLEXITY",
    category: "MANAGEMENT",
    difficulty: 3,
    meaningZh: "流程繁冗复杂 / 令人眼花缭乱",
    distractorGroup: "OPERATIONAL_CHALLENGE",
    sourcePatterns: [
      "is bogged down by an incomprehensible maze of bureaucratic {procedure}",
      "proves overwhelmingly baffling for ordinary users due to convoluted {procedure}",
      "requires wading through dozens of pages of opaque legalistic instructions",
      "involves excessive steps that confuse and deter participants"
    ],
    targetPatterns: [
      "is unnecessarily complex and convoluted",
      "involves excessive bureaucratic procedures",
      "causes confusion due to complicated rules"
    ],
    slots: {
      procedure: ["registration and eligibility verification", "online grant application checklists", "annual tax exemption filings"]
    },
    explanationTpl: "incomprehensible maze / convoluted procedure ↔ unnecessarily complex / excessive procedures。"
  },

  // 68. EXPENSIVE_UPKEEP (Resource Limit)
  {
    id: "EXPENSIVE_UPKEEP",
    category: "MANAGEMENT",
    difficulty: 3,
    meaningZh: "后期维护昂贵 / 养护无底洞",
    distractorGroup: "RESOURCE_LIMIT",
    sourcePatterns: [
      "costs an absolute fortune in annual servicing bills to maintain {asset}",
      "burns through municipal funds year after year just to keep {asset} operational",
      "proves economically unsustainable over the decade due to sky-high spare part costs",
      "demands ongoing financial expenditure that far outstrips the original purchase price"
    ],
    targetPatterns: [
      "incurs exorbitant long-term upkeep costs",
      "is expensive to keep in operating condition",
      "entails disproportionate recurring expenses"
    ],
    slots: {
      asset: ["the Olympic-sized heated aquatic centre", "the heritage steam locomotive fleet", "the specialised automated sorting conveyor"]
    },
    explanationTpl: "absolute fortune in annual servicing / burns through funds year after year ↔ exorbitant upkeep costs。"
  },

  // 69. SCHEDULE_DRIFT (Time Progress)
  {
    id: "SCHEDULE_DRIFT",
    category: "MANAGEMENT",
    difficulty: 3,
    meaningZh: "进度不知不觉延后 / 缓步拖延",
    distractorGroup: "TIME_PROGRESS",
    sourcePatterns: [
      "slipped gradually behind day by day until final delivery was delayed by {delay}",
      "experienced subtle cumulative slippage that pushed completion back into {delay}",
      "suffered minor daily setbacks that eventually culminated in serious lateness",
      "drifted well beyond early milestones without management realising until too late"
    ],
    targetPatterns: [
      "experienced progressive schedule slippage",
      "drifted gradually behind agreed timetables",
      "accumulated delays over successive phases"
    ],
    slots: {
      delay: ["the following academic term", "late autumn of next year", "the second financial quarter"]
    },
    explanationTpl: "slipped gradually day by day / cumulative slippage ↔ progressive schedule slippage。"
  },

  // 70. PROCESS_DEPENDENCY (Method & Policy)
  {
    id: "PROCESS_DEPENDENCY",
    category: "MANAGEMENT",
    difficulty: 3,
    meaningZh: "高度依赖特定工序 / 前提不满足则瘫痪",
    distractorGroup: "METHOD_AND_POLICY",
    sourcePatterns: [
      "cannot function unless {precondition} is completed first in meticulous detail",
      "is strictly contingent upon {precondition} taking place without error",
      "grinds to a halt if the preceding preparatory step is neglected",
      "depends entirely on the flawless execution of prior technical prerequisites"
    ],
    targetPatterns: [
      "is strictly dependent on prerequisite steps",
      "requires prior stages to be completed first",
      "is contingent on specific preparatory procedures"
    ],
    slots: {
      precondition: ["thorough chemical sanitisation of the chamber", "precise geological soil testing", "complete formal stakeholder sign-off"]
    },
    explanationTpl: "cannot function unless completed first / strictly contingent ↔ strictly dependent on prerequisite steps。"
  },

  // 71. SKILL_SHORTAGE (Resource Limit)
  {
    id: "SKILL_SHORTAGE",
    category: "EDUCATION",
    difficulty: 3,
    meaningZh: "专业技能匮乏 / 缺少对口技能",
    distractorGroup: "RESOURCE_LIMIT",
    sourcePatterns: [
      "finds that local job applicants lack essential expertise in {discipline}",
      "faces a severe deficit of candidates possessing certified competencies in {discipline}",
      "struggles because recent graduates have theoretical knowledge but zero skill in {discipline}",
      "cannot expand operations due to an acute dearth of talent trained in {discipline}"
    ],
    targetPatterns: [
      "faces an acute shortage of specialized skills",
      "struggles with a lack of qualified expertise",
      "is constrained by an expertise deficit in the workforce"
    ],
    slots: {
      discipline: ["deep-water marine robotics", "bio-pharmaceutical quality assurance", "advanced structural masonry restoration"]
    },
    explanationTpl: "applicants lack essential expertise / dearth of talent ↔ acute shortage of specialized skills。"
  },

  // 72. RAPID_EXPANSION (Time Progress)
  {
    id: "RAPID_EXPANSION",
    category: "BUSINESS",
    difficulty: 2,
    meaningZh: "扩张过快 / 增长迅猛超出承载",
    distractorGroup: "TIME_PROGRESS",
    sourcePatterns: [
      "ballooned so fast that administrative systems struggled to keep up with {surge}",
      "grew at a breakneck speed that strained physical infrastructure beyond its limits",
      "doubled in scale within a single year, causing acute growing pains",
      "scaled up too hastily before foundational operational controls were solidified"
    ],
    targetPatterns: [
      "experienced rapid, unstainable expansion",
      "grew too quickly for existing systems to cope",
      "suffered growing pains from overly fast scaling"
    ],
    slots: {
      surge: ["the sudden influx of three thousand new students", "the quadrupled volume of daily delivery orders", "the massive surge in international site visits"]
    },
    explanationTpl: "ballooned so fast / breakneck speed ↔ rapid, unsustainable expansion / grew too quickly。"
  },

  // 73. RESTRICTED_ACCESS (Operational Challenge)
  {
    id: "RESTRICTED_ACCESS",
    category: "MANAGEMENT",
    difficulty: 2,
    meaningZh: "进出受限 / 需特殊通行证",
    distractorGroup: "OPERATIONAL_CHALLENGE",
    sourcePatterns: [
      "is barred to general visitors and requires an authorised biometric badge for {facility}",
      "permits entry solely to accredited academic researchers carrying verified security passes",
      "cannot be entered without advance formal clearance from security personnel",
      "is kept locked around the clock, restricting admission to registered staff only"
    ],
    targetPatterns: [
      "has strictly controlled access restrictions",
      "requires special authorisation to enter",
      "is closed to unaccredited visitors"
    ],
    slots: {
      facility: ["the rare manuscript vault", "the underground biosafety containment laboratory", "the active archaeological trench"]
    },
    explanationTpl: "barred to general visitors / requires authorised badge ↔ strictly controlled access / special authorisation。"
  },

  // 74. WEATHER_RESILIENCE (Positive Impact)
  {
    id: "WEATHER_RESILIENCE",
    category: "ENVIRONMENT",
    difficulty: 2,
    meaningZh: "耐候性强 / 无惧风雨侵蚀",
    distractorGroup: "POSITIVE_IMPACT",
    sourcePatterns: [
      "withstands punishing gale-force winds and heavy coastal sea spray without {damage}",
      "endures sub-zero freezing blizzards and extreme heatwaves without cracking or warped surfaces",
      "is engineered specifically to resist severe climate conditions across decades",
      "remains completely weatherproof throughout prolonged torrential rains"
    ],
    targetPatterns: [
      "demonstrates exceptional weather resistance",
      "is resilient against harsh climate conditions",
      "withstands extreme atmospheric exposure"
    ],
    slots: {
      damage: ["corrosive rust along exterior beams", "structural timber splitting", "water ingress into underlying foundations"]
    },
    explanationTpl: "withstands gale-force winds and coastal spray ↔ exceptional weather resistance / resilient against harsh climate。"
  },

  // 75. INTERDISCIPLINARY_STUDY (Method & Policy)
  {
    id: "INTERDISCIPLINARY_STUDY",
    category: "ACADEMIC",
    difficulty: 3,
    meaningZh: "跨学科交叉研究 / 融合多领域视角",
    distractorGroup: "METHOD_AND_POLICY",
    sourcePatterns: [
      "bridges insights from {fieldA} alongside methodologies from {fieldB}",
      "demands students combine analytical techniques from both {fieldA} and {fieldB}",
      "synthesises historical documentary records with cutting-edge scientific data from {fieldB}",
      "crosses conventional academic boundaries to explore complex real-world dilemmas"
    ],
    targetPatterns: [
      "involves an interdisciplinary approach",
      "integrates multiple academic disciplines",
      "combines methodologies from different fields"
    ],
    slots: {
      fieldA: ["classical behavioural psychology", "medieval economic history", "urban architecture theory"],
      fieldB: ["satellite geospatial mapping", "biochemical isotopic analysis", "computational linguistics modeling"]
    },
    explanationTpl: "bridges insights from field A and field B ↔ interdisciplinary approach / integrates multiple disciplines。"
  }
];

// Read current file
let content = fs.readFileSync(targetFile, "utf-8");

// Find the position right before the closing `];` of PARAPHRASE_CONCEPTS
const lastBracketIndex = content.lastIndexOf("];");
if (lastBracketIndex === -1) {
  console.error("Could not find closing bracket ];");
  process.exit(1);
}

// Convert new concepts to formatted string
const jsonCode = newConcepts.map(c => ",\n\n    " + JSON.stringify(c, null, 4).replace(/\n/g, "\n    ")).join("");

const updatedContent = content.slice(0, lastBracketIndex) + jsonCode + "\n  ];\n" + content.slice(lastBracketIndex + 2);

fs.writeFileSync(targetFile, updatedContent, "utf-8");
console.log(`Successfully appended ${newConcepts.length} new concepts! Total concepts should now be 75.`);
