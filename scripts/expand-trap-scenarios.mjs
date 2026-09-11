import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const targetFile = path.resolve(__dirname, "../factory/trap-factory.js");

const newScenarios = [
  // 5. 主讲人变更 (Speaker & Guest Lecturer)
  {
    id: "TRAP_SPEAKER",
    category: "PERSON",
    subject: "the keynote guest lecture",
    questionTpl: "Who will actually deliver {subject}?",
    priorStarters: [
      "We had initially confirmed that",
      "The program originally stated that",
      "We had first invited",
      "At the outset, the department booked"
    ],
    priorObjects: [
      { label: "Dr. Richard Evans", text: "Dr. Richard Evans from Oxford" },
      { label: "Professor Helen Miller", text: "Professor Helen Miller from Cambridge" },
      { label: "Dr. Karen Davies", text: "Dr. Karen Davies from Edinburgh" }
    ],
    transitions: [
      "but due to an urgent family bereavement,",
      "however, overseas flight cancellations intervened,",
      "yet having fallen ill with laryngitis at the last minute,",
      "but because of an unavoidable scheduling conflict,"
    ],
    finalStarters: [
      "we are delighted that stepping in at short notice is",
      "the address will now be presented instead by",
      "taking her place on the podium will be",
      "we have arranged for the talk to be given by"
    ],
    actualObjects: [
      { label: "Professor Simon Scott", text: "Professor Simon Scott from University College London" },
      { label: "Dr. Rebecca Howard", text: "Dr. Rebecca Howard from Manchester" },
      { label: "Professor Martin Hughes", text: "Professor Martin Hughes from Bristol" }
    ],
    decoys: [
      { label: "Dr. Anthony Cole", text: "Dr. Anthony Cole from Birmingham" },
      { label: "Professor Fiona Bell", text: "Professor Fiona Bell from Leeds" },
      { label: "Dr. Andrew Wilson", text: "Dr. Andrew Wilson from Sheffield" }
    ],
    tip: "人物/主讲人陷阱：第一位提到的学者(Evans/Miller)通常是原定主讲，中途突发变故(illness/cancellation)，后半句 stepping in at short notice 才是实际登台者。"
  },

  // 6. 出行交通工具 (Transport Mode)
  {
    id: "TRAP_TRANSPORT",
    category: "TRANSPORT",
    subject: "the field trip travel",
    questionTpl: "Which mode of transport will the group use for {subject}?",
    priorStarters: [
      "The organizers had originally arranged for",
      "We had first intended to hire",
      "The initial proposal was to travel by",
      "Our earliest itinerary booked"
    ],
    priorObjects: [
      { label: "a private chartered coach", text: "a private fifty-seater luxury coach" },
      { label: "the regional express train", text: "the morning regional passenger express train" },
      { label: "a fleet of minibuses", text: "three rented university minibuses" }
    ],
    transitions: [
      "but emergency repairs closed the motorway bridge,",
      "however, severe rail union strikes were announced for that day,",
      "yet hiring costs exceeded our transport allowance by double,",
      "but heavy rural road flooding made the highway impassable,"
    ],
    finalStarters: [
      "so we have chartered",
      "so we will now be traveling aboard",
      "we finally decided that everyone will take",
      "it was agreed that the most scenic option was"
    ],
    actualObjects: [
      { label: "the scenic passenger ferry", text: "the scheduled scenic passenger ferry across the bay" },
      { label: "the coastal electric tram", text: "the modern coastal light-rail tram" },
      { label: "the heritage paddle steamer", text: "the vintage river paddle steamer" }
    ],
    decoys: [
      { label: "hired mountain bicycles", text: "a convoy of hired bicycles" },
      { label: "regular municipal buses", text: "local municipal commuter buses" },
      { label: "private shared taxis", text: "pre-booked shared licensed taxis" }
    ],
    tip: "出行方式陷阱：常见先提大巴或火车(coach/train)，因修路或罢工被否决(strikes/closed bridge)，改乘轮渡或轻轨(ferry/tram)。"
  },

  // 7. 招募对象与资格门槛 (Target Audience & Eligibility)
  {
    id: "TRAP_AUDIENCE",
    category: "ELIGIBILITY",
    subject: "the specialist coding workshop",
    questionTpl: "Who is eligible to register for {subject}?",
    priorStarters: [
      "At first, admission was restricted strictly to",
      "The committee initially opened places solely for",
      "We had originally intended to accept only",
      "The preliminary guidelines limited enrollment to"
    ],
    priorObjects: [
      { label: "final-year honors students", text: "final-year computing honors students" },
      { label: "postgraduate doctoral researchers", text: "postgraduate doctoral candidates" },
      { label: "experienced commercial programmers", text: "working professionals with commercial programming backgrounds" }
    ],
    transitions: [
      "but because only seven candidates applied,",
      "however, following requests from the student union,",
      "yet to encourage wider technical literacy across campus,",
      "but since the seminar hall has plenty of spare capacity,"
    ],
    finalStarters: [
      "we have now broadened entry to include",
      "the sessions are now officially accessible to",
      "we have revised the rules so it is open to",
      "the workshop will warmly welcome"
    ],
    actualObjects: [
      { label: "all enrolled undergraduates", text: "any registered undergraduate regardless of academic department" },
      { label: "introductory beginners", text: "complete beginners with no prior coding experience" },
      { label: "second-year science students", text: "all second and third year natural science students" }
    ],
    decoys: [
      { label: "visiting high-school pupils", text: "local sixth-form high-school pupils" },
      { label: "university administrative staff", text: "full-time non-academic university staff" },
      { label: "retired alumni members", text: "visiting alumni society members" }
    ],
    tip: "报名资格陷阱：最初门槛极高(final-year only)，因人数不足或呼声放宽(broadened entry)，最终面向所有本科生或零基础。"
  },

  // 8. 调研方法论选择 (Research Methodology)
  {
    id: "TRAP_METHODOLOGY",
    category: "METHODOLOGY",
    subject: "their dissertation research",
    questionTpl: "Which primary method did the students select for {subject}?",
    priorStarters: [
      "Our team spent the first month drafting",
      "We had initially planned to rely upon",
      "Our first experimental setup involved",
      "We originally intended to collect data through"
    ],
    priorObjects: [
      { label: "online public questionnaires", text: "an anonymous mass online questionnaire on social media" },
      { label: "covert CCTV video observations", text: "covert CCTV video recordings inside the cafeteria" },
      { label: "laboratory simulation software", text: "computerized virtual simulations of crowd behavior" }
    ],
    transitions: [
      "but the response rate was shockingly low,",
      "however, the ethics committee firmly rejected the protocol,",
      "yet technical glitches corrupted nearly all our raw data,",
      "but participants provided overwhelmingly unreliable answers,"
    ],
    finalStarters: [
      "so we scrapped that and switched over to",
      "so we ultimately gathered all our empirical evidence via",
      "we decided that our best approach was conducting",
      "we resolved to base our core findings on"
    ],
    actualObjects: [
      { label: "in-depth face-to-face interviews", text: "structured in-depth face-to-face interviews with forty shoppers" },
      { label: "focus group discussions", text: "three recorded focus group discussions with local parents" },
      { label: "written reflective diaries", text: "participant written reflective diaries maintained over three weeks" }
    ],
    decoys: [
      { label: "telephone poll samples", text: "randomized telephone poll cold calls" },
      { label: "historical newspaper archives", text: "regional 19th-century newspaper archive clippings" },
      { label: "satellite imaging surveys", text: "satellite imaging vegetation surveys" }
    ],
    tip: "论文方法陷阱：常见问卷调查(online questionnaires)因回收率极低或伦理未过(ethics rejected)，最终全面转入深度面访(in-depth interviews)。"
  },

  // 9. 首站参观点 (First Stop / Destination)
  {
    id: "TRAP_DESTINATION",
    category: "DESTINATION",
    subject: "the historical walking tour",
    questionTpl: "Where will the tour group stop at first?",
    priorStarters: [
      "The standard tour itinerary always begins at",
      "We had initially intended to lead you first to",
      "The printed guidebook lists our first destination as",
      "We usually kick off the morning by visiting"
    ],
    priorObjects: [
      { label: "the cathedral bell tower", text: "the medieval cathedral bell tower" },
      { label: "the historic town hall", text: "the 18th-century guildhall and council chambers" },
      { label: "the Roman bath excavations", text: "the underground Roman bath archaeological site" }
    ],
    transitions: [
      "but urgent stonework restoration is blocking the entrance,",
      "however, an official civic ceremony is occupying the hall till noon,",
      "yet heavy morning rainfall made the stone steps treacherous,",
      "but a television crew has booked the interior for filming today,"
    ],
    finalStarters: [
      "so instead our very first stop will be",
      "so we will adjust the order and head straight to",
      "we will commence our walk instead over at",
      "we'll change our schedule and start at"
    ],
    actualObjects: [
      { label: "the maritime heritage museum", text: "the newly renovated maritime heritage museum by the dock" },
      { label: "the botanical glasshouse", text: "the Victorian botanical palm glasshouse" },
      { label: "the ancient stone fortress", text: "the perimeter walls of the ancient stone fortress" }
    ],
    decoys: [
      { label: "the municipal art gallery", text: "the contemporary municipal art gallery" },
      { label: "the open-air farmer's market", text: "the bustling open-air farmer's market" },
      { label: "the riverside canal lock", text: "the historic canal lock and toll house" }
    ],
    tip: "首发参观点陷阱：导游词常提到以往第一站是钟楼/市政厅(tower/town hall)，但今天由于修缮(restoration)或拍摄，临时改为海事博物馆(maritime museum)。"
  },

  // 10. 会员费优惠门槛 (Price & Discount Tiers)
  {
    id: "TRAP_PRICE_TIER",
    category: "PRICE",
    subject: "the annual sports club pass",
    questionTpl: "How much will the student actually pay for {subject}?",
    priorStarters: [
      "The standard full adult membership fee is",
      "The brochure currently quotes a price of",
      "Normally we charge new applicants",
      "The regular published price lists"
    ],
    priorObjects: [
      { label: "£120 per year", text: "one hundred and twenty pounds for twelve months" },
      { label: "£95 per year", text: "ninety-five pounds per calendar year" },
      { label: "£150 per year", text: "one hundred and fifty pounds upfront" }
    ],
    transitions: [
      "and while the early-bird voucher offered a rate of £80,",
      "and although our flyer mentions a concession of £75,",
      "and even with the local resident discount it comes to £70,",
      "and the seasonal coupon only brings that down to £65,"
    ],
    finalStarters: [
      "with your verified full-time student ID card you only pay",
      "because you are enrolled in full-time education, your special subsidized charge is",
      "if you sign up during freshers' week, the discounted student price is exactly",
      "your student concession entitlement drops the final cost down to"
    ],
    actualObjects: [
      { label: "£45", text: "just forty-five pounds for the entire year" },
      { label: "£50", text: "a flat fee of fifty pounds with free locker access" },
      { label: "£38", text: "an exclusive rate of thirty-eight pounds" }
    ],
    decoys: [
      { label: "£85", text: "eighty-five pounds" },
      { label: "£60", text: "sixty pounds" },
      { label: "£30", text: "thirty pounds" }
    ],
    tip: "价格阶梯陷阱：录音中会依次报出原价(£120)、普通早鸟/传单折扣(£80/£75)，最后用 student ID 亮出真正的底价(£45/£50)。"
  }
];

let content = fs.readFileSync(targetFile, "utf-8");

// Find `const TRAP_SCENARIOS = [`
const startMarker = "const TRAP_SCENARIOS = [";
const startIndex = content.indexOf(startMarker);
if (startIndex === -1) {
  console.error("Start marker not found");
  process.exit(1);
}

// Find `class TrapFactory`
const classMarker = "class TrapFactory";
const classIndex = content.indexOf(classMarker);
if (classIndex === -1) {
  console.error("Class marker not found");
  process.exit(1);
}

// Find `];` right before class TrapFactory
const bracketIndex = content.lastIndexOf("];", classIndex);
if (bracketIndex === -1) {
  console.error("Bracket not found");
  process.exit(1);
}

const additionsStr = ",\n\n    " + newScenarios.map(s => JSON.stringify(s, null, 2).replace(/\n/g, "\n    ")).join(",\n\n    ");

const newContent = content.slice(0, bracketIndex) + additionsStr + "\n  " + content.slice(bracketIndex);

fs.writeFileSync(targetFile, newContent, "utf-8");
console.log(`Successfully expanded TRAP_SCENARIOS by ${newScenarios.length} scenarios! Total scenarios is now 10.`);
