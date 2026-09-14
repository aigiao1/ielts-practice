# Task 1 四段式小作文工坊设计规范 (Design Spec)

- **日期**：2026-09-14
- **主题**：Task 1 Mini-Essay Workbench (小作文工坊 · 写作思路 + 语块积累 + 4段式实战)
- **状态**：Pending User Review

---

## 1. 背景与核心目标

### 1.1 现状与痛点
当前 Task 1 模块虽然提供了原生 SVG 图表与基础句子练习，但存在明显瓶颈：
- **单句割裂，缺乏篇章逻辑**：每个题组仅为 5 句孤立的中文翻译，学习者无法建立「怎么看图、怎么归类、怎么分段」的宏观写作思维；
- **缺失 Overview（宏观总述）训练**：Overview 是雅思 Task 1 冲刺 7 分及以上的灵魂段落，当前完全未作区分，甚至夹杂细碎数字；
- **语块缺乏场景化积累**：缺乏针对引言改写、宏观概括、主体对比和数据引出的结构化语块库；
- **拒绝虚假 AI 评分**：无后端 LLM 支撑时，绝不堆砌虚假跑分或评语，专注务实的结构化训练。

### 1.2 核心目标
将 Task 1 升级为**「四段式小作文沉浸工坊」**：
1. **真实雅思 4 段式小作文流水线**：改写题目 ➔ 宏观 Overview ➔ 主体段一 ➔ 主体段二；
2. **每图标配「双思维切入角度」**：提供思路 A 与思路 B 切换，图表联动高亮，传授高分归类逻辑；
3. **结构化高频实战语块库**：点击一键注入输入框，强化地道搭配；
4. **实时小作文合成板 (Live Mini-Essay Canvas)**：4 步书写实时拼装成工整排版的完整小作文，附带实时词数统计与标准对照。

---

## 2. 核心架构与数据模型

### 2.1 四段式段落定义 (`paragraphSteps`)
每个题组将原有的 5 道散题重构或归纳为标准 4 段：
```typescript
interface ParagraphStep {
  stepId: "intro" | "overview" | "body1" | "body2";
  stepNumber: 1 | 2 | 3 | 4;
  title: string;          // e.g. "Step 1: Introduction (题目与图表改写)"
  role: string;           // e.g. "题目改写 · 杜绝原词"
  chinesePrompt: string;  // 中文意图与构思引导
  canonicalAnswer: string;// 考官级标准示范表达
  acceptableVariants: string[]; // 容错与多样表达
  strategyTip: string;    // 写作思路指导与扣分避坑指南
  keyChunks: Array<{ en: string; note: string; category: string }>; // 专属推荐核心语块
}
```

### 2.2 双思维切入角度 (`thinkingAngles`)
每套图表结构包含两种不同的解构逻辑：
```typescript
interface ThinkingAngle {
  angleId: "angleA" | "angleB";
  label: string;          // e.g. "思路 A：按数值主导划分（考场最稳）"
  concept: string;        // 核心归类理念
  overviewLogic: string;  // Overview 抓取要点（无具体数字）
  body1Logic: string;     // 主体一归类对象及数据对比
  body2Logic: string;     // 主体二归类对象及对比转折
  highlightElements: string[]; // 图表上重点联动高亮的图元 ID
}
```

### 2.3 实战语块抽屉分类 (`functionalChunks`)
按四大段落功能精准分类：
1. **引言改写 (Intro Verbs & Structures)**：`illustrates`, `delineates`, `compares the proportion of...`, `over a five-year period from...`；
2. **Overview 宏观总述 (Macro Trends & Contrasts)**：`Overall, it is readily apparent that...`, `accounted for the lion's share`, `trailed far behind`, `the reverse was true for...`；
3. **数据引出与排位 (Data Citation & Ranking)**：`constituting roughly`, `registering at`, `ranked as the primary contributor`, `followed closely by`；
4. **比较、转折与倍数 (Comparisons & Multipliers)**：`In stark contrast`, `By comparison`, `outnumbered by nearly three to one`, `while the figure for...`；
5. **段落衔接 (Cohesion & Coherence)**：`Turning next to...`, `With regard to...`, `Looking at the remaining categories...`。

---

## 3. 用户交互流程与界面布局

### 3.1 界面布局 (Workbench Layout)
- **左侧：视读与思维面板 (40% 宽)**
  - 顶部：题组选择器与模式切换；
  - 核心：原生交互式 SVG 图表（支持悬浮联动高亮与切片点击）；
  - 思维切换：`[思路 A] / [思路 B]` Tab 选项卡，实时切换左侧图表分析与右侧段落思路提示；
  - 底部：`📚 高频学术替换语块抽屉`，支持按分类检索与点击一键填入当前聚焦的输入框。
- **右侧：四步沉浸式写作工坊 (60% 宽)**
  - 顶部步进条：`[ 1. 引言改写 ] ➔ [ 2. 宏观 Overview ] ➔ [ 3. 主体一 ] ➔ [ 4. 主体二 ]`；
  - 当前段落卡片：
    - 🎯 **思路点拨**：展示当前激活思路下的分段要点；
    - 📝 **写作目标**：清晰的中文意图；
    - ⌨️ **盲打输入区**：大文本/长句输入框，支持 `Ctrl+Enter` 快速提交；
    - 💡 **避坑提醒**：介词搭配、时态陷阱与数据格式提示；
    - 底部操作栏：`[ 上一步 ]`、`[ 显现范例参考 ]`、`[ 确认并推进 ➔ ]`；
  - 底部：**📋 实时小作文合成板 (Live Mini-Essay Canvas)**：
    - 4 个段落实时聚合为完整作文；
    - 实时动态字数统计 (`当前: 142 词 · 建议 130–160 词`)；
    - 一键复制完整作文 (`[ 📋 复制完整小作文 ]`)；
    - 对照展开标准范文。

---

## 4. 关键交互细节与无感辅助

1. **思维切换瞬时联动**：
   当用户在左侧切换「思路 A」与「思路 B」时，右侧卡片的思路点拨文本即刻切换，同时左侧 SVG 图表对应的切片/折线/柱子自动施加柔和高亮，帮助视觉快速建立分类认知。
2. **语块点击注入**：
   点击语块抽屉中的任何语块胶囊，如果右侧输入框处于激活状态，将直接在光标处插入该语块；若未聚焦，则自动追加到当前正在编写的段落输入框末尾。
3. **真实字数统计**：
   实时依据标准英文分词规则统计总字数，用不同颜色呈现字数健康度（<120词 橙色提示偏短，130-170词 绿色理想，>200词 黄色提示可能超时）。

---

## 5. 验证与测试计划

1. **自动化测试**：
   - 编写 `scripts/test-task1-mini-essay.mjs`，断言每个题组均具备完备的双思维模型与 4 段式结构；
   - 验证语块抽屉包含 5 类功能词，且可被正确检索；
   - 验证完整小作文实时拼接算法的纯文本输出与词数计算。
2. **全量回归测试**：
   - 运行全部现有单元测试，确保不破坏现有内容包架构；
   - 更新 PWA `sw.js` 离线缓存至新版本。
