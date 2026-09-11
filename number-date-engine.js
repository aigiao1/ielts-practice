// 雅思听力数字/日期/时间/货币无限生成器核心引擎 (Number & Date Engine)
(() => {
  "use strict";

  const MONTHS = [
    { name: "January", short: "Jan", num: 1, days: 31 },
    { name: "February", short: "Feb", num: 2, days: 28 },
    { name: "March", short: "Mar", num: 3, days: 31 },
    { name: "April", short: "Apr", num: 4, days: 30 },
    { name: "May", short: "May", num: 5, days: 31 },
    { name: "June", short: "Jun", num: 6, days: 30 },
    { name: "July", short: "Jul", num: 7, days: 31 },
    { name: "August", short: "Aug", num: 8, days: 31 },
    { name: "September", short: "Sept", num: 9, days: 30 },
    { name: "October", short: "Oct", num: 10, days: 31 },
    { name: "November", short: "Nov", num: 11, days: 30 },
    { name: "December", short: "Dec", num: 12, days: 31 }
  ];

  const ORDINAL_SUFFIX = ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"];
  function getOrdinal(n) {
    if (n >= 11 && n <= 13) return `${n}th`;
    return `${n}${ORDINAL_SUFFIX[n % 10] || "th"}`;
  }

  const TEEN_TY_PAIRS = [
    { teen: 13, ty: 30, teenSpoken: "thirteen", tySpoken: "thirty" },
    { teen: 14, ty: 40, teenSpoken: "fourteen", tySpoken: "forty" },
    { teen: 15, ty: 50, teenSpoken: "fifteen", tySpoken: "fifty" },
    { teen: 16, ty: 60, teenSpoken: "sixteen", tySpoken: "sixty" },
    { teen: 17, ty: 70, teenSpoken: "seventeen", tySpoken: "seventy" },
    { teen: 18, ty: 80, teenSpoken: "eighteen", tySpoken: "eighty" },
    { teen: 19, ty: 90, teenSpoken: "nineteen", tySpoken: "ninety" }
  ];

  const NUMBER_WORDS = {
    0: "zero", 1: "one", 2: "two", 3: "three", 4: "four", 5: "five",
    6: "six", 7: "seven", 8: "eight", 9: "nine", 10: "ten",
    11: "eleven", 12: "twelve", 13: "thirteen", 14: "fourteen", 15: "fifteen",
    16: "sixteen", 17: "seventeen", 18: "eighteen", 19: "nineteen", 20: "twenty",
    30: "thirty", 40: "forty", 50: "fifty", 60: "sixty", 70: "seventy",
    80: "eighty", 90: "ninety"
  };

  // 生成英文朗读词 (支持千百级递归)
  function numberToWords(num) {
    if (num === 0) return "zero";
    if (NUMBER_WORDS[num]) return NUMBER_WORDS[num];

    let words = "";
    if (Math.floor(num / 1000) > 0) {
      words += numberToWords(Math.floor(num / 1000)) + " thousand ";
      num %= 1000;
    }

    if (Math.floor(num / 100) > 0) {
      words += (NUMBER_WORDS[Math.floor(num / 100)] || "") + " hundred ";
      num %= 100;
      if (num > 0) words += "and ";
    }

    if (num > 0) {
      if (NUMBER_WORDS[num]) {
        words += NUMBER_WORDS[num];
      } else {
        const tens = Math.floor(num / 10) * 10;
        const ones = num % 10;
        words += `${NUMBER_WORDS[tens] || ""}-${NUMBER_WORDS[ones] || ""}`;
      }
    }

    return words.trim();
  }

  const UK_POSTCODE_AREAS = [
    { area: "SW", num: 1, street: "A", end: "1AA" },
    { area: "OX", num: 2, street: "6", end: "DP" },
    { area: "CB", num: 3, street: "9", end: "EJ" },
    { area: "BS", num: 8, street: "1", end: "TH" },
    { area: "EH", num: 1, street: "2", end: "AB" },
    { area: "M", num: 4, street: "4", end: "PF" },
    { area: "B", num: 2, street: "5", end: "RT" },
    { area: "LS", num: 2, street: "9", end: "JT" }
  ];

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  class NumberDateGenerator {
    // 1. -teen vs -ty 极速辨析
    generateTeenTy() {
      const pair = pickRandom(TEEN_TY_PAIRS);
      const isHundred = Math.random() < 0.35;
      const isThousand = !isHundred && Math.random() < 0.25;
      const chooseTeen = Math.random() < 0.5;

      let spoken = "";
      let answer = "";
      let tip = "";

      if (isHundred) {
        const h = randomInt(1, 9);
        const hWord = NUMBER_WORDS[h];
        if (chooseTeen) {
          answer = `${h}${pair.teen}`;
          spoken = `${hWord} hundred and ${pair.teenSpoken}`;
          tip = `注意重音在末尾：${pair.teenSpoken.toUpperCase()}（轻尾音 /tiːn/ 拖长）`;
        } else {
          answer = `${h}${pair.ty}`;
          spoken = `${hWord} hundred and ${pair.tySpoken}`;
          tip = `注意重音在首音节：${pair.tySpoken.toUpperCase()}（短促爆破 /ti/，不拖长）`;
        }
      } else if (isThousand && (pair.teen === 14 || pair.teen === 15 || pair.teen === 18)) {
        if (chooseTeen) {
          answer = `${pair.teen * 100}`;
          spoken = `${pair.teenSpoken} hundred`;
          tip = `雅思高频：口语常说 fourteen hundred 代替 1400`;
        } else {
          const k = pair.ty / 10;
          answer = `${k}000`;
          spoken = `${NUMBER_WORDS[k]} thousand`;
          tip = `千万别把 four thousand 误听为 fourteen hundred`;
        }
      } else {
        if (chooseTeen) {
          answer = String(pair.teen);
          spoken = pair.teenSpoken;
          tip = `重音在后：${pair.teenSpoken.toUpperCase()} (/tiːn/)`;
        } else {
          answer = String(pair.ty);
          spoken = pair.tySpoken;
          tip = `重音在前：${pair.tySpoken.toUpperCase()} (/ti/)`;
        }
      }

      return {
        category: "teen_ty",
        categoryName: "-teen vs -ty 极速辨析",
        spoken,
        displayAnswer: answer,
        acceptableAnswers: [answer],
        tip,
        trapType: "sound_recognition"
      };
    }

    // 2. 日期与年份
    generateDate() {
      const isYearOnly = Math.random() < 0.25;
      if (isYearOnly) {
        const century = pickRandom([17, 18, 19, 20]);
        const yy = randomInt(10, 99);
        const year = century * 100 + yy;
        const cWord = numberToWords(century);
        const yWord = numberToWords(yy);
        const spoken = `${cWord} ${yWord}`;
        return {
          category: "date",
          categoryName: "年份与世纪",
          spoken,
          displayAnswer: String(year),
          acceptableAnswers: [String(year)],
          tip: `年份通常拆成两个两位数读：${century} (${cWord}) + ${yy} (${yWord})`,
          trapType: "number_date"
        };
      }

      const month = pickRandom(MONTHS);
      const day = randomInt(1, month.days);
      const ordinal = getOrdinal(day);
      const style = pickRandom(["day_of_month", "month_day", "the_day_of_month"]);

      let spoken = "";
      if (style === "day_of_month") {
        spoken = `${day}${day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th"} of ${month.name}`;
      } else if (style === "month_day") {
        spoken = `${month.name} the ${ordinal}`;
      } else {
        spoken = `the ${ordinal} of ${month.name}`;
      }

      const standardAnswer = `${day} ${month.name}`;
      const acceptable = [
        standardAnswer,
        `${day}th ${month.name}`,
        `${month.name} ${day}`,
        `${month.name} ${day}th`,
        `${day} ${month.short}`,
        `${month.short} ${day}`,
        `${day}/${month.num}`,
        `${day}-${month.num}`
      ];

      return {
        category: "date",
        categoryName: "英式考点日期",
        spoken,
        displayAnswer: standardAnswer,
        acceptableAnswers: acceptable,
        tip: `听力中无论读 "the ${ordinal} of ${month.name}" 还是 "${month.name} ${ordinal}"，均推荐规范简写为 "${day} ${month.name}"`,
        trapType: "number_date"
      };
    }

    // 3. 时间表达
    generateTime() {
      const hour = randomInt(1, 12);
      const minuteKind = pickRandom(["quarter_to", "quarter_past", "half_past", "exact_mins", "o_clock"]);

      let spoken = "";
      let standardAnswer = "";
      let tip = "";

      if (minuteKind === "quarter_to") {
        const actualHour = hour === 1 ? 12 : hour - 1;
        standardAnswer = `${actualHour}:45`;
        spoken = `quarter to ${numberToWords(hour)}`;
        tip = `"quarter to ${hour}" 表示差一刻钟到 ${hour} 点，实际时间是 ${standardAnswer}`;
      } else if (minuteKind === "quarter_past") {
        standardAnswer = `${hour}:15`;
        spoken = `quarter past ${numberToWords(hour)}`;
        tip = `"quarter past ${hour}" 表示 ${hour} 点过一刻，即 ${standardAnswer}`;
      } else if (minuteKind === "half_past") {
        standardAnswer = `${hour}:30`;
        spoken = `half past ${numberToWords(hour)}`;
        tip = `"half past ${hour}" 即 ${standardAnswer}`;
      } else if (minuteKind === "exact_mins") {
        const mins = pickRandom([5, 10, 20, 25, 35, 40, 50]);
        if (mins < 30) {
          standardAnswer = `${hour}:${mins < 10 ? "0" + mins : mins}`;
          spoken = `${numberToWords(mins)} past ${numberToWords(hour)}`;
          tip = `"${mins} past ${hour}" 即 ${standardAnswer}`;
        } else {
          const toMins = 60 - mins;
          const targetHour = hour === 12 ? 1 : hour + 1;
          standardAnswer = `${hour}:${mins}`;
          spoken = `${numberToWords(toMins)} to ${numberToWords(targetHour)}`;
          tip = `"${toMins} to ${targetHour}" 即 ${standardAnswer}`;
        }
      } else {
        standardAnswer = `${hour}:00`;
        spoken = `${numberToWords(hour)} o'clock`;
        tip = `整点 "${hour} o'clock" 写成 ${standardAnswer} 或 ${hour} 均可`;
      }

      const acceptable = [
        standardAnswer,
        standardAnswer.replace(":", "."),
        hour < 10 ? `0${standardAnswer}` : standardAnswer
      ];

      return {
        category: "time",
        categoryName: "时间与钟点",
        spoken,
        displayAnswer: standardAnswer,
        acceptableAnswers: acceptable,
        tip,
        trapType: "number_date"
      };
    }

    // 4. 英美货币与价格
    generateMoney() {
      const currencyType = pickRandom(["pounds", "pounds_pence", "pence_only", "dollars"]);

      if (currencyType === "pence_only") {
        const p = pickRandom([20, 30, 45, 50, 60, 75, 80, 95]);
        const spoken = `${numberToWords(p)} pence`;
        const standardAnswer = `${p}p`;
        return {
          category: "money",
          categoryName: "货币便士价格",
          spoken,
          displayAnswer: standardAnswer,
          acceptableAnswers: [standardAnswer, `£0.${p}`, `0.${p}`],
          tip: `单收便士听力常读 "pence" 或 "p"，写作 "${p}p" 或 "£0.${p}"`,
          trapType: "number_date"
        };
      }

      if (currencyType === "pounds_pence") {
        const pounds = randomInt(5, 85);
        const pence = pickRandom([20, 50, 75, 95, 99]);
        const spoken = `${numberToWords(pounds)} pounds ${numberToWords(pence)}`;
        const standardAnswer = `£${pounds}.${pence}`;
        return {
          category: "money",
          categoryName: "英镑与便士",
          spoken,
          displayAnswer: standardAnswer,
          acceptableAnswers: [standardAnswer, `${pounds}.${pence}`, `£${pounds}.${pence}`],
          tip: `英式习惯中常省略第二词 "pence"，直接读 "${pounds} pounds ${pence}"`,
          trapType: "number_date"
        };
      }

      if (currencyType === "dollars") {
        const d = pickRandom([15, 25, 40, 75, 120, 250, 480]);
        const spoken = `${numberToWords(d)} dollars`;
        const standardAnswer = `$${d}`;
        return {
          category: "money",
          categoryName: "美元与金额",
          spoken,
          displayAnswer: standardAnswer,
          acceptableAnswers: [standardAnswer, String(d)],
          tip: `注意题目若已印有货币符号，只需填数字；若无符号，需补上符号。`,
          trapType: "number_date"
        };
      }

      // 整数英镑
      const p = pickRandom([12, 18, 35, 50, 65, 120, 450]);
      const spoken = `${numberToWords(p)} pounds`;
      const standardAnswer = `£${p}`;
      return {
        category: "money",
        categoryName: "英镑价格",
        spoken,
        displayAnswer: standardAnswer,
        acceptableAnswers: [standardAnswer, String(p)],
        tip: `注意英镑符号 £ 或数字格式书写规范`,
        trapType: "number_date"
      };
    }

    // 5. 电话号码与邮编
    generateCodesAndPhone() {
      const isPhone = Math.random() < 0.6;
      if (isPhone) {
        // 典型英国电话 07700 900XXX 带 double 或 oh
        const prefix = "07";
        const hasDouble = Math.random() < 0.8;
        const dDigit = randomInt(1, 9);
        const mid = hasDouble ? `7${dDigit}${dDigit}` : String(randomInt(100, 999));
        const last3 = String(randomInt(100, 999));
        const fullNumber = `${prefix}${mid}${last3}`;

        // 拼接发音
        const spokenParts = ["oh", "seven"];
        for (let i = 2; i < fullNumber.length; i++) {
          const ch = fullNumber[i];
          const next = fullNumber[i + 1];
          if (ch === next && i < fullNumber.length - 1) {
            spokenParts.push(`double ${ch === "0" ? "oh" : NUMBER_WORDS[ch]}`);
            i++;
          } else {
            spokenParts.push(ch === "0" ? "oh" : NUMBER_WORDS[ch]);
          }
        }

        const standardAnswer = fullNumber;
        const formattedAnswer = `${fullNumber.slice(0, 5)} ${fullNumber.slice(5)}`;

        return {
          category: "phone_code",
          categoryName: "电话号码与数字连读",
          spoken: spokenParts.join(" "),
          displayAnswer: formattedAnswer,
          acceptableAnswers: [standardAnswer, formattedAnswer],
          tip: `雅思听力电话三大陷阱：0 读作 "oh"；连续两个相同数字读作 "double X"；三个相同数字读作 "triple X"`,
          trapType: "sound_recognition"
        };
      }

      // 英国邮编
      const area = pickRandom(UK_POSTCODE_AREAS);
      const postCode = `${area.area}${area.num}${area.street} ${area.end}`;
      const letters = postCode.split("").map((c) => {
        if (c === " ") return " ";
        if (/\d/.test(c)) return NUMBER_WORDS[c];
        return c;
      }).join(" ");

      return {
        category: "phone_code",
        categoryName: "英式邮政编码 (Postcode)",
        spoken: letters,
        displayAnswer: postCode,
        acceptableAnswers: [postCode, postCode.replace(/\s+/g, "")],
        tip: `英国邮政编码格式通常为 "大写字母+数字+空格+数字+字母"，字母发音务必分清 A/E/I 与 B/D`,
        trapType: "spelling"
      };
    }

    // 6. 大数字听写
    generateLargeNumber() {
      const scale = pickRandom(["hundreds_thousands", "decimals_million", "exact_thousands"]);

      if (scale === "decimals_million") {
        const whole = randomInt(1, 9);
        const dec = pickRandom([2, 25, 5, 75]);
        const decStr = String(dec);
        const spoken = `${numberToWords(whole)} point ${decStr.split("").map((d) => NUMBER_WORDS[d]).join(" ")} million`;
        const standardAnswer = `${whole}.${dec} million`;
        return {
          category: "large_number",
          categoryName: "带小数点的百万级大数",
          spoken,
          displayAnswer: standardAnswer,
          acceptableAnswers: [standardAnswer, `${whole}.${dec}m`, `${whole}.${dec} Million`],
          tip: `小数点读作 "point"，小数点后的数字必须一个个单独读出 (例如 point two five，不可读 twenty-five)`,
          trapType: "number_date"
        };
      }

      if (scale === "hundreds_thousands") {
        const k = pickRandom([150, 250, 320, 450, 680, 850]);
        const spoken = `${numberToWords(k)} thousand`;
        const standardAnswer = `${k},000`;
        return {
          category: "large_number",
          categoryName: "十万级大数字",
          spoken,
          displayAnswer: standardAnswer,
          acceptableAnswers: [standardAnswer, `${k}000`, `${k} thousand`],
          tip: `注意三位一分节的逗号位置，英文以 thousand (千) 和 million (百万) 为单位计数`,
          trapType: "number_date"
        };
      }

      const thousands = randomInt(1, 20);
      const hundreds = randomInt(1, 9) * 100;
      const total = thousands * 1000 + hundreds;
      const spoken = `${numberToWords(thousands)} thousand ${numberToWords(hundreds / 100)} hundred`;
      const standardAnswer = `${thousands},${hundreds}`;

      return {
        category: "large_number",
        categoryName: "千级复合大数字",
        spoken,
        displayAnswer: standardAnswer,
        acceptableAnswers: [standardAnswer, String(total)],
        tip: `千位与百位之间通常直接连读，例如 "${thousands} thousand ${hundreds / 100} hundred"`,
        trapType: "number_date"
      };
    }

    // 综合随机出题
    nextQuestion(category = "all") {
      switch (category) {
        case "teen_ty":
          return this.generateTeenTy();
        case "date":
          return this.generateDate();
        case "time":
          return this.generateTime();
        case "money":
          return this.generateMoney();
        case "phone_code":
          return this.generateCodesAndPhone();
        case "large_number":
          return this.generateLargeNumber();
        default: {
          const generators = [
            () => this.generateTeenTy(),
            () => this.generateDate(),
            () => this.generateTime(),
            () => this.generateMoney(),
            () => this.generateCodesAndPhone(),
            () => this.generateLargeNumber()
          ];
          return pickRandom(generators)();
        }
      }
    }

    // 智能判卷与归一化对比
    checkAnswer(userInput, item) {
      if (!userInput) return { correct: false, normUser: "", normExpected: item.displayAnswer };

      const clean = (str) => String(str || "")
        .toLowerCase()
        .replace(/,/g, "")
        .replace(/\s+/g, " ")
        .replace(/[£$€]/g, "")
        .replace(/\bthe\b/g, "")
        .replace(/\bof\b/g, "")
        .replace(/(st|nd|rd|th)\b/g, "")
        .trim();

      const normUser = clean(userInput);

      // 直接判断在可接受答案库中
      const matched = item.acceptableAnswers.some((ans) => {
        return clean(ans) === normUser || ans.toLowerCase().trim() === userInput.toLowerCase().trim();
      });

      return {
        correct: matched,
        normUser,
        normExpected: item.displayAnswer
      };
    }
  }

  // 挂载引擎
  const engine = new NumberDateGenerator();
  if (typeof window !== "undefined") {
    window.NumberDateEngine = engine;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { NumberDateGenerator, engine };
  }
})();
