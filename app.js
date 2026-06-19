const levels = [
  {
    id: 1,
    name: "街角小店",
    desc: "小型便利店，货架少、顾客温和，适合新手熟悉流程。",
    icon: "🏪",
    mapCols: 8,
    mapRows: 6,
    warehousePos: { x: 0, y: 5 },
    checkoutPos: { x: 7, y: 0 },
    playerStart: { x: 0, y: 5 },
    shelves: [
      { id: "A", x: 2, y: 1, good: "snack", stock: 3, max: 5 },
      { id: "B", x: 5, y: 1, good: "drink", stock: 3, max: 5 },
      { id: "C", x: 2, y: 4, good: "noodle", stock: 2, max: 4 },
      { id: "D", x: 6, y: 4, good: "snack", stock: 2, max: 5 }
    ],
    goodKeys: ["snack", "drink", "noodle"],
    duration: 120,
    customerBaseGap: 3,
    customerRandomRange: 2,
    customerWaitMin: 3,
    customerWaitMax: 6,
    incomingPreview: 5,
    maxWaiting: 8,
    tickInterval: 1200
  },
  {
    id: 2,
    name: "社区超市",
    desc: "中型超市，货架增多、节奏加快，考验多任务协调能力。",
    icon: "🏬",
    mapCols: 10,
    mapRows: 7,
    warehousePos: { x: 0, y: 6 },
    checkoutPos: { x: 9, y: 0 },
    playerStart: { x: 0, y: 6 },
    shelves: [
      { id: "A", x: 2, y: 1, good: "snack", stock: 3, max: 5 },
      { id: "B", x: 5, y: 1, good: "drink", stock: 3, max: 5 },
      { id: "C", x: 8, y: 1, good: "noodle", stock: 2, max: 4 },
      { id: "D", x: 2, y: 4, good: "drink", stock: 2, max: 5 },
      { id: "E", x: 5, y: 4, good: "snack", stock: 2, max: 5 },
      { id: "F", x: 8, y: 5, good: "noodle", stock: 2, max: 4 }
    ],
    goodKeys: ["snack", "drink", "noodle"],
    duration: 150,
    customerBaseGap: 2,
    customerRandomRange: 2,
    customerWaitMin: 3,
    customerWaitMax: 5,
    incomingPreview: 6,
    maxWaiting: 10,
    tickInterval: 1100
  },
  {
    id: 3,
    name: "深夜大卖场",
    desc: "大型卖场，货架密集、顾客络绎不绝，只有高效补货才能撑到天亮。",
    icon: "🏙️",
    mapCols: 12,
    mapRows: 8,
    warehousePos: { x: 0, y: 7 },
    checkoutPos: { x: 11, y: 0 },
    playerStart: { x: 0, y: 7 },
    shelves: [
      { id: "A", x: 2, y: 1, good: "snack", stock: 3, max: 6 },
      { id: "B", x: 5, y: 1, good: "drink", stock: 3, max: 6 },
      { id: "C", x: 8, y: 1, good: "noodle", stock: 3, max: 5 },
      { id: "D", x: 2, y: 4, good: "drink", stock: 2, max: 6 },
      { id: "E", x: 5, y: 4, good: "snack", stock: 2, max: 6 },
      { id: "F", x: 8, y: 4, good: "noodle", stock: 2, max: 5 },
      { id: "G", x: 3, y: 6, good: "snack", stock: 2, max: 5 },
      { id: "H", x: 7, y: 6, good: "drink", stock: 2, max: 5 }
    ],
    goodKeys: ["snack", "drink", "noodle"],
    duration: 180,
    customerBaseGap: 1,
    customerRandomRange: 2,
    customerWaitMin: 2,
    customerWaitMax: 5,
    incomingPreview: 7,
    maxWaiting: 12,
    tickInterval: 1000
  }
];

let currentLevelId = 1;

function getCurrentLevel() {
  return levels.find(l => l.id === currentLevelId) || levels[0];
}

function getCurrentLevelGoodKeys() {
  const levelGoodKeys = getCurrentLevel().goodKeys || [];
  const validGoodKeys = levelGoodKeys.filter((key) => goods[key]);
  return validGoodKeys.length > 0 ? validGoodKeys : Object.keys(goods);
}

const boardEl = document.getElementById("board");
const crateButtonsEl = document.getElementById("crateButtons");
const shelfListEl = document.getElementById("shelfList");
const logEl = document.getElementById("log");
const resultEl = document.getElementById("result");
const clockEl = document.getElementById("clock");
const energyEl = document.getElementById("energy");
const salesEl = document.getElementById("sales");
const missesEl = document.getElementById("misses");
const carryEl = document.getElementById("carry");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const changeLevelBtn = document.getElementById("changeLevelBtn");
const actionBtn = document.getElementById("actionBtn");
const waitingCountEl = document.getElementById("waitingCount");
const pressureLevelEl = document.getElementById("pressureLevel");
const waitingListEl = document.getElementById("waitingList");
const incomingListEl = document.getElementById("incomingList");

const tutorialOverlay = document.getElementById("tutorialOverlay");
const tutorialSpotlight = document.getElementById("tutorialSpotlight");
const tutorialDialog = document.getElementById("tutorialDialog");
const tutorialArrow = document.getElementById("tutorialArrow");
const tutorialTitle = document.getElementById("tutorialTitle");
const tutorialContent = document.getElementById("tutorialContent");
const tutorialStepEl = document.getElementById("tutorialStep");
const tutorialTotalEl = document.getElementById("tutorialTotal");
const tutorialNextBtn = document.getElementById("tutorialNext");
const tutorialSkipBtn = document.getElementById("tutorialSkip");
const tutorialChoice = document.getElementById("tutorialChoice");
const choiceYesBtn = document.getElementById("choiceYes");
const choiceNoBtn = document.getElementById("choiceNo");
const codexBtn = document.getElementById("codexBtn");
const codexOverlay = document.getElementById("codexOverlay");
const codexCloseBtn = document.getElementById("codexCloseBtn");
const codexListEl = document.getElementById("codexList");
const codexDetailEl = document.getElementById("codexDetail");
const goalsListEl = document.getElementById("goalsList");
const levelSelectOverlay = document.getElementById("levelSelectOverlay");
const levelCardsEl = document.getElementById("levelCards");
const levelNameEl = document.getElementById("levelName");
const clerkBadgeEl = document.getElementById("clerkBadge");
const clerkLevelIconEl = document.getElementById("clerkLevelIcon");
const clerkLevelNumEl = document.getElementById("clerkLevelNum");
const clerkLevelTitleEl = document.getElementById("clerkLevelTitle");
const clerkExpFillEl = document.getElementById("clerkExpFill");
const clerkExpTextEl = document.getElementById("clerkExpText");
const clerkUpgradeBtn = document.getElementById("clerkUpgradeBtn");
const clerkOverlay = document.getElementById("clerkOverlay");
const clerkCloseBtn = document.getElementById("clerkCloseBtn");
const clerkBodyEl = document.getElementById("clerkBody");

const schedulingOverlay = document.getElementById("schedulingOverlay");
const strategyCardsEl = document.getElementById("strategyCards");
const schedulingPreviewEl = document.getElementById("schedulingPreview");
const previewSummaryEl = document.getElementById("previewSummary");
const previewCurveEl = document.getElementById("previewCurve");
const previewGoodsEl = document.getElementById("previewGoods");
const previewTipsEl = document.getElementById("previewTips");
const schedulingBackBtn = document.getElementById("schedulingBackBtn");
const schedulingStartBtn = document.getElementById("schedulingStartBtn");
const schedulingSkipBtn = document.getElementById("schedulingSkipBtn");

const editorBanner = document.getElementById("editorBanner");
const editorPanel = document.getElementById("editorPanel");
const editorSelectedInfo = document.getElementById("editorSelectedInfo");
const editorGoodPicker = document.getElementById("editorGoodPicker");
const editorGoodButtons = document.getElementById("editorGoodButtons");
const editorLog = document.getElementById("editorLog");
const editLayoutBtn = document.getElementById("editLayoutBtn");
const saveLayoutBtn = document.getElementById("saveLayoutBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const normalControls = document.getElementById("normalControls");

const replayBanner = document.getElementById("replayBanner");
const replayPlayBtn = document.getElementById("replayPlayBtn");
const replayPauseBtn = document.getElementById("replayPauseBtn");
const replaySpeedBtn = document.getElementById("replaySpeedBtn");
const replayExitBtn = document.getElementById("replayExitBtn");
const replaySlider = document.getElementById("replaySlider");
const replayTimeLabel = document.getElementById("replayTimeLabel");
const replayTimeTotal = document.getElementById("replayTimeTotal");
const replayBtn = document.getElementById("replayBtn");

const eventBanner = document.getElementById("eventBanner");
const eventBannerIcon = document.getElementById("eventBannerIcon");
const eventBannerTitle = document.getElementById("eventBannerTitle");
const eventBannerDesc = document.getElementById("eventBannerDesc");
const activeEventsEl = document.getElementById("activeEvents");
const warningBanner = document.getElementById("warningBanner");
const warningBannerIcon = document.getElementById("warningBannerIcon");
const warningBannerTitle = document.getElementById("warningBannerTitle");
const warningBannerDesc = document.getElementById("warningBannerDesc");
const warningBannerCountdown = document.getElementById("warningBannerCountdown");
const responsePanel = document.getElementById("responsePanel");
const responseEventIcon = document.getElementById("responseEventIcon");
const responseEventName = document.getElementById("responseEventName");
const responseEventDesc = document.getElementById("responseEventDesc");
const responseOptions = document.getElementById("responseOptions");
const predictionPanelEl = document.getElementById("predictionPanel");
const appShellEl = document.querySelector(".app-shell");

const saveAsSchemeBtn = document.getElementById("saveAsSchemeBtn");
const manageSchemesBtn = document.getElementById("manageSchemesBtn");
const editorCurrentScheme = document.getElementById("editorCurrentScheme");
const currentSchemeNameEl = document.getElementById("currentSchemeName");

const schemeOverlay = document.getElementById("schemeOverlay");
const schemeCloseBtn = document.getElementById("schemeCloseBtn");
const schemeDialogTitle = document.getElementById("schemeDialogTitle");
const schemeDialogLevel = document.getElementById("schemeDialogLevel");
const schemeListEl = document.getElementById("schemeList");
const schemeEmptyHint = document.getElementById("schemeEmptyHint");
const schemeNewBtn = document.getElementById("schemeNewBtn");

const schemeSaveOverlay = document.getElementById("schemeSaveOverlay");
const schemeSaveCloseBtn = document.getElementById("schemeSaveCloseBtn");
const schemeNameInput = document.getElementById("schemeNameInput");
const schemeDescInput = document.getElementById("schemeDescInput");
const schemeSavePreview = document.getElementById("schemeSavePreview");
const schemeSaveCancelBtn = document.getElementById("schemeSaveCancelBtn");
const schemeSaveConfirmBtn = document.getElementById("schemeSaveConfirmBtn");

const schemeRenameOverlay = document.getElementById("schemeRenameOverlay");
const schemeRenameCloseBtn = document.getElementById("schemeRenameCloseBtn");
const schemeRenameInput = document.getElementById("schemeRenameInput");
const schemeRenameCancelBtn = document.getElementById("schemeRenameCancelBtn");
const schemeRenameConfirmBtn = document.getElementById("schemeRenameConfirmBtn");

const schemeDeleteOverlay = document.getElementById("schemeDeleteOverlay");
const schemeDeleteCloseBtn = document.getElementById("schemeDeleteCloseBtn");
const schemeDeleteMsg = document.getElementById("schemeDeleteMsg");
const schemeDeleteCancelBtn = document.getElementById("schemeDeleteCancelBtn");
const schemeDeleteConfirmBtn = document.getElementById("schemeDeleteConfirmBtn");

const schemeApplyOverlay = document.getElementById("schemeApplyOverlay");
const schemeApplyCloseBtn = document.getElementById("schemeApplyCloseBtn");
const schemeApplyMsg = document.getElementById("schemeApplyMsg");
const schemeApplyPreview = document.getElementById("schemeApplyPreview");
const schemeApplyCancelBtn = document.getElementById("schemeApplyCancelBtn");
const schemeApplyConfirmBtn = document.getElementById("schemeApplyConfirmBtn");

const trainingBtn = document.getElementById("trainingBtn");
const trainingOverlay = document.getElementById("trainingOverlay");
const trainingCloseBtn = document.getElementById("trainingCloseBtn");
const trainingThemeListEl = document.getElementById("trainingThemeList");
const trainingInfoEl = document.getElementById("trainingInfo");
const trainingLevelSelect = document.getElementById("trainingLevelSelect");
const trainingStartBtn = document.getElementById("trainingStartBtn");
const trainingBanner = document.getElementById("trainingBanner");
const trainingBannerThemeEl = document.getElementById("trainingBannerTheme");
const trainingExitBtn = document.getElementById("trainingExitBtn");
const trainingResultOverlay = document.getElementById("trainingResultOverlay");
const trainingResultCloseBtn = document.getElementById("trainingResultCloseBtn");
const trainingResultBodyEl = document.getElementById("trainingResultBody");
const trainingRetryBtn = document.getElementById("trainingRetryBtn");
const trainingBackBtn = document.getElementById("trainingBackBtn");

const nightReportOverlay = document.getElementById("nightReportOverlay");
const nightReportCloseBtn = document.getElementById("nightReportCloseBtn");
const nightReportCloseFooterBtn = document.getElementById("nightReportCloseFooterBtn");
const nightReportReplayBtn = document.getElementById("nightReportReplayBtn");
const nightReportSubtitle = document.getElementById("nightReportSubtitle");
const nightReportTimeline = document.getElementById("nightReportTimeline");
const nightReportStats = document.getElementById("nightReportStats");
const nightReportShelfStats = document.getElementById("nightReportShelfStats");
const reportFinalScore = document.getElementById("reportFinalScore");
const reportServiceRate = document.getElementById("reportServiceRate");
const reportMisses = document.getElementById("reportMisses");
const reportWorstIcon = document.getElementById("reportWorstIcon");
const reportWorstLabel = document.getElementById("reportWorstLabel");
const reportWorstShelfIcon = document.getElementById("reportWorstShelfIcon");
const reportWorstShelfLabel = document.getElementById("reportWorstShelfLabel");

const nightReportData = {
  generated: false,
  timelineEvents: [],
  worstGood: null,
  worstShelf: null,
  finalScore: 0,
  serviceRate: 0,
  misses: 0,
  levelId: null,
  levelName: ''
};

const codexState = {
  selectedGood: null
};

const EVENT_WARNING_TICKS = 2;

function getEventWarningTicks() {
  return EVENT_WARNING_TICKS + getEventWarningBonus();
}

const eventTemplates = {
  hotDrinkSurge: {
    id: "hotDrinkSurge",
    name: "热饮需求暴涨",
    type: "demand",
    icon: "☕",
    warningIcon: "🌡️",
    warningTitle: "🌡️ 气温骤降预警",
    warningDesc: "天气预报称寒潮即将来袭，热饮需求可能暴涨！",
    startTitle: "☕ 热饮需求暴涨！",
    startDesc: "深夜寒风来袭，顾客对热饮的需求大幅增加！",
    endTitle: "✅ 热饮热潮消退",
    endDesc: "天气回暖，顾客对热饮的需求恢复正常。",
    minDuration: 4,
    maxDuration: 7,
    effect: { goodKey: "drink", demandMultiplier: 2.5 },
    responses: [
      {
        id: "stockUp",
        name: "提前热饮备货",
        icon: "📦",
        desc: "趁还来得及，先给热饮货架补满库存",
        effectMods: { demandMultiplier: -0.5 }
      },
      {
        id: "quickCheck",
        name: "清点仓库",
        icon: "📋",
        desc: "检查仓库库存，事件持续时间缩短1格",
        effectMods: { durationDelta: -1 }
      },
      {
        id: "waitItOut",
        name: "按兵不动",
        icon: "🤷",
        desc: "不做额外准备，事件按原样发生",
        effectMods: {}
      }
    ],
    log: {
      start: "☕ 突发：深夜寒风袭来，顾客对热饮的需求暴涨！进店顾客购买热饮的概率大幅提高。",
      end: "✅ 热饮热潮消退，顾客偏好恢复正常。"
    }
  },
  noodleShelfBroken: {
    id: "noodleShelfBroken",
    name: "泡面货架故障",
    type: "shelf",
    icon: "🍜",
    warningIcon: "🔧",
    warningTitle: "🔧 货架异响预警",
    warningDesc: "泡面货架发出异响，可能即将发生故障！",
    startTitle: "🍜 泡面货架故障！",
    startDesc: "泡面货架突然出了问题，暂时无法取货和补货！",
    endTitle: "✅ 泡面货架修复",
    endDesc: "经过临时抢修，泡面货架恢复正常使用。",
    minDuration: 3,
    maxDuration: 5,
    effect: { targetGood: "noodle", blockShelf: true },
    responses: [
      {
        id: "reinforce",
        name: "临时加固货架",
        icon: "🛡️",
        desc: "对货架进行紧急加固，故障持续时间缩短1格",
        effectMods: { durationDelta: -1 }
      },
      {
        id: "transferGoods",
        name: "提前转移泡面",
        icon: "🔄",
        desc: "把泡面挪到其他位置，故障时仍可有限售卖",
        effectMods: { partialAccess: true }
      },
      {
        id: "waitItOut",
        name: "按兵不动",
        icon: "🤷",
        desc: "不做额外准备，事件按原样发生",
        effectMods: {}
      }
    ],
    log: {
      start: "🍜 突发：泡面货架电路故障，无法售卖也无法补货！请优先补货其他货架。",
      end: "✅ 泡面货架已临时修复，恢复正常售卖和补货。"
    }
  },
  warehouseShortage: {
    id: "warehouseShortage",
    name: "仓库短暂断货",
    type: "warehouse",
    icon: "📦",
    warningIcon: "🚚",
    warningTitle: "🚚 物流延迟预警",
    warningDesc: "接到通知，补给车可能晚点，仓库将暂时缺货！",
    startTitle: "📦 仓库短暂断货！",
    startDesc: "物流延迟，仓库暂时无法取出任何货物！",
    endTitle: "✅ 仓库到货",
    endDesc: "补给车终于赶到，仓库恢复正常取货。",
    minDuration: 3,
    maxDuration: 5,
    effect: { blockWarehouse: true },
    responses: [
      {
        id: "stockUp",
        name: "提前清点仓库",
        icon: "📋",
        desc: "趁仓库还能用，赶紧取货备货，事件持续时间缩短1格",
        effectMods: { durationDelta: -1 }
      },
      {
        id: "saveEnergy",
        name: "节省体力",
        icon: "💤",
        desc: "减少活动等待补给，事件期间体力消耗减半",
        effectMods: { energySaveDuring: true }
      },
      {
        id: "waitItOut",
        name: "按兵不动",
        icon: "🤷",
        desc: "不做额外准备，事件按原样发生",
        effectMods: {}
      }
    ],
    log: {
      start: "📦 突发：物流延迟导致仓库断货！暂时无法从仓库取货，请用现有库存应对。",
      end: "✅ 补给车到货，仓库恢复正常，可以继续取货补货了！"
    }
  },
  fatigueIncrease: {
    id: "fatigueIncrease",
    name: "体力消耗加剧",
    type: "energy",
    icon: "💤",
    warningIcon: "😴",
    warningTitle: "😴 困倦预警",
    warningDesc: "一阵困意袭来，你感觉体力消耗即将加倍！",
    startTitle: "💤 疲惫袭来！",
    startDesc: "深夜困倦来袭，所有行动的体力消耗翻倍！",
    endTitle: "✅ 精神恢复",
    endDesc: "一阵凉风吹过，你的精神稍微恢复了一些。",
    minDuration: 4,
    maxDuration: 6,
    effect: { energyMultiplier: 2 },
    responses: [
      {
        id: "coffee",
        name: "喝咖啡提神",
        icon: "☕",
        desc: "来一杯咖啡，体力消耗倍率从2x降为1.5x",
        effectMods: { energyMultiplierDelta: -0.5 }
      },
      {
        id: "rest",
        name: "适当休息",
        icon: "🛋️",
        desc: "放慢节奏，事件持续时间缩短1格但消耗5点体力",
        effectMods: { durationDelta: -1, energyCost: 5 }
      },
      {
        id: "waitItOut",
        name: "按兵不动",
        icon: "🤷",
        desc: "不做额外准备，事件按原样发生",
        effectMods: {}
      }
    ],
    log: {
      start: "💤 突发：深夜困倦袭来，移动、拿货、补货的体力消耗全部翻倍！",
      end: "✅ 一阵冷风让你清醒过来，体力消耗恢复正常。"
    }
  }
};

const STRATEGY_TEMPLATES = {
  steady: {
    id: "steady",
    name: "平稳客流",
    icon: "🌙",
    difficulty: "简单",
    difficultyLevel: 1,
    desc: "顾客均匀进店，节奏平缓，适合新手熟悉排班逻辑。",
    tags: [{ label: "低风险", level: "easy" }, { label: "可预测", level: "easy" }],
    generateCurve: (totalTicks, goodKeys) => {
      const curve = [];
      for (let t = 0; t < totalTicks; t++) {
        const progress = t / totalTicks;
        let intensity = 1.0;
        if (progress < 0.1) intensity = 0.7 + progress * 3;
        else if (progress > 0.85) intensity = 1.0 - (progress - 0.85) * 4;
        curve.push({
          tick: t,
          intensity: Math.max(0.4, intensity + (Math.random() - 0.5) * 0.3),
          goodWeights: generateBalancedWeights(goodKeys, 0.2)
        });
      }
      return curve;
    },
    tips: [
      "客流基本稳定，按常规节奏补货即可",
      "注意货架不要空置超过一半",
      "体力消耗均匀，可稳步推进"
    ]
  },
  rushHour: {
    id: "rushHour",
    name: "下班高峰",
    icon: "🚶",
    difficulty: "中等",
    difficultyLevel: 2,
    desc: "前半场冷清，中段突然涌入大量顾客，需要提前备货。",
    tags: [{ label: "波峰明显", level: "medium" }, { label: "考验预判", level: "medium" }],
    generateCurve: (totalTicks, goodKeys) => {
      const curve = [];
      const peakStart = Math.floor(totalTicks * 0.3);
      const peakEnd = Math.floor(totalTicks * 0.65);
      const peakCenter = (peakStart + peakEnd) / 2;
      for (let t = 0; t < totalTicks; t++) {
        let intensity;
        if (t < peakStart) {
          intensity = 0.5 + (t / peakStart) * 0.3;
        } else if (t > peakEnd) {
          const decay = (t - peakEnd) / (totalTicks - peakEnd);
          intensity = 1.0 - decay * 0.5;
        } else {
          const dist = Math.abs(t - peakCenter) / ((peakEnd - peakStart) / 2);
          intensity = 1.8 - dist * 0.6;
        }
        intensity += (Math.random() - 0.5) * 0.25;
        const weights = {};
        if (t >= peakStart && t <= peakEnd) {
          weights[goodKeys[0]] = 0.8 + Math.random() * 0.3;
          weights[goodKeys[1]] = 1.2 + Math.random() * 0.4;
          weights[goodKeys[2 % goodKeys.length]] = 1.0 + Math.random() * 0.2;
        } else {
          Object.assign(weights, generateBalancedWeights(goodKeys, 0.15));
        }
        curve.push({
          tick: t,
          intensity: Math.max(0.4, intensity),
          goodWeights: weights
        });
      }
      return curve;
    },
    tips: [
      "高峰大约在营业时间中段（30%~65%）到来",
      "高峰前提前给所有货架补满库存",
      "热饮在高峰期间需求特别旺盛"
    ]
  },
  randomBurst: {
    id: "randomBurst",
    name: "随机爆单",
    icon: "⚡",
    difficulty: "困难",
    difficultyLevel: 3,
    desc: "客流极度不稳定，随时可能出现几波不可预测的爆单潮。",
    tags: [{ label: "高波动", level: "hard" }, { label: "考验应急", level: "hard" }],
    generateCurve: (totalTicks, goodKeys) => {
      const curve = [];
      const burstCount = 2 + Math.floor(Math.random() * 2);
      const burstPositions = [];
      for (let i = 0; i < burstCount; i++) {
        burstPositions.push(Math.floor(totalTicks * (0.2 + (i / burstCount) * 0.6 + (Math.random() - 0.5) * 0.1)));
      }
      const burstWidth = Math.max(2, Math.floor(totalTicks * 0.08));
      for (let t = 0; t < totalTicks; t++) {
        let intensity = 0.6 + Math.random() * 0.3;
        for (const pos of burstPositions) {
          const dist = Math.abs(t - pos);
          if (dist < burstWidth) {
            const boost = (1 - dist / burstWidth) * 1.6;
            intensity += boost;
          }
        }
        const weights = {};
        goodKeys.forEach(key => {
          weights[key] = 0.6 + Math.random() * 1.2;
        });
        curve.push({
          tick: t,
          intensity: Math.max(0.4, Math.min(2.5, intensity)),
          goodWeights: weights
        });
      }
      return curve;
    },
    tips: [
      "爆单点不可预测，保持货架始终有安全库存",
      "每次补货尽量补满，不要只补1-2件",
      "体力要预留，不要在前期耗尽"
    ]
  },
  preferenceShift: {
    id: "preferenceShift",
    name: "商品偏好波动",
    icon: "📊",
    difficulty: "困难",
    difficultyLevel: 3,
    desc: "总客流量平稳，但不同时段的热门商品会剧烈切换。",
    tags: [{ label: "偏好漂移", level: "hard" }, { label: "考验选品", level: "hard" }],
    generateCurve: (totalTicks, goodKeys) => {
      const curve = [];
      const phaseCount = 3 + Math.floor(Math.random() * 2);
      const phaseLength = Math.floor(totalTicks / phaseCount);
      for (let t = 0; t < totalTicks; t++) {
        const phase = Math.min(phaseCount - 1, Math.floor(t / phaseLength));
        const phaseProgress = (t % phaseLength) / phaseLength;
        const baseIntensity = 0.85 + (Math.random() - 0.5) * 0.2;
        const weights = {};
        const favoredIndex = phase % goodKeys.length;
        const nextFavoredIndex = (phase + 1) % goodKeys.length;
        goodKeys.forEach((key, idx) => {
          if (idx === favoredIndex) {
            weights[key] = 1.8 - phaseProgress * 0.8 + (Math.random() - 0.5) * 0.2;
          } else if (idx === nextFavoredIndex) {
            weights[key] = 0.8 + phaseProgress * 1.0 + (Math.random() - 0.5) * 0.2;
          } else {
            weights[key] = 0.5 + Math.random() * 0.3;
          }
        });
        curve.push({
          tick: t,
          intensity: baseIntensity,
          goodWeights: weights
        });
      }
      return curve;
    },
    tips: [
      "热门商品会周期性切换，观察进店顾客的购买倾向",
      "当某商品突然热销时，优先给对应货架补货",
      "不要把所有体力投入单一商品，保持灵活"
    ]
  }
};

function generateBalancedWeights(goodKeys, variance) {
  const weights = {};
  goodKeys.forEach(key => {
    weights[key] = 1.0 + (Math.random() - 0.5) * variance * 2;
  });
  return weights;
}

const schedulingState = {
  active: false,
  selectedStrategy: null,
  generatedCurve: null,
  previewData: null,
  expectedStats: null,
  actualStats: {
    customersByTick: [],
    demandByGood: {},
    totalServed: 0,
    totalMissed: 0
  }
};

const PREDICTION_LOOKAHEAD = 6;

function seededRandom(seed) {
  let s = seed >>> 0;
  return function() {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

function computeForecastCacheKey() {
  const activeEventIds = (state.events.active || []).map(e => `${e.id}-${e.endTick}`).sort().join('|');
  const warningKey = state.events.warning ? `${state.events.warning.templateId}-${state.events.warning.remainingTicks}` : '';
  const stocks = state.shelves.map(s => `${s.id}:${s.stock}:${s._broken || 0}`).join('|');
  const waiting = state.customers.waiting.map(c => `${c.goodKey}-${c.maxWait - c.waited}`).sort().join(',');
  const incoming = state.customers.incoming.map(c => `${c.goodKey}-${c.arrivalTick}`).sort().join(',');
  return [
    Math.floor(state.minute / 5),
    state.running,
    schedulingState.active,
    schedulingState.selectedStrategy || 'none',
    state.warehouseBlocked ? 1 : 0,
    activeEventIds,
    warningKey,
    stocks,
    waiting,
    incoming
  ].join('§');
}

function computeForecast() {
  const cacheKey = computeForecastCacheKey();
  if (state._forecastCache && state._forecastCache.key === cacheKey) {
    return state._forecastCache.value;
  }

  const level = getCurrentLevel();
  const goodKeys = getCurrentLevelGoodKeys();
  const currentTick = Math.floor(state.minute / 5);
  const totalTicks = Math.ceil(level.duration / 5);
  const rand = seededRandom(currentTick * 1000 + (schedulingState.selectedStrategy ? schedulingState.selectedStrategy.length : 0) + goodKeys.length);

  const queuePressure = getPressureLevel();
  const waitingCount = state.customers.waiting.length;
  const incomingCount = state.customers.incoming.length;
  const queueBacklogFactor = Math.min(1.3, 1 + waitingCount * 0.05);

  const trendBars = [];
  for (let i = 0; i < PREDICTION_LOOKAHEAD; i++) {
    const targetTick = currentTick + i + 1;
    if (targetTick >= totalTicks) {
      trendBars.push({ intensity: 0, level: 'low', tickOffset: i + 1 });
      continue;
    }

    let intensity;
    const curveSeg = getCurveSegmentForTick(targetTick);
    if (schedulingState.active && curveSeg) {
      intensity = curveSeg.intensity;
    } else {
      const progress = targetTick / totalTicks;
      intensity = 0.8 + progress * 0.4 + (rand() - 0.5) * 0.2;
    }

    if (i === 0) {
      intensity *= queueBacklogFactor;
    }

    (state.events.active || []).forEach(evt => {
      const template = eventTemplates[evt.templateId];
      if (!template) return;
      if (template.effect) {
        if (template.effect.demandMultiplier) {
          intensity *= 1.15;
        }
        if (template.effect.blockWarehouse) {
          intensity *= 1.1;
        }
      }
      const evtRemaining = evt.endTick - currentTick;
      if (evtRemaining > 0 && evtRemaining <= PREDICTION_LOOKAHEAD && i >= evtRemaining) {
        intensity *= 0.9;
      }
    });

    if (state.events.warning) {
      intensity *= 1.12;
    }

    if (state.warehouseBlocked) {
      intensity *= 1.08;
    }

    intensity += (rand() - 0.5) * 0.12;
    intensity = Math.max(0.3, Math.min(2.8, intensity));

    let barLevel;
    if (intensity < 0.7) barLevel = 'low';
    else if (intensity < 1.0) barLevel = 'medium';
    else if (intensity < 1.4) barLevel = 'high';
    else barLevel = 'critical';

    trendBars.push({ intensity, level: barLevel, tickOffset: i + 1 });
  }

  const avgIntensity = trendBars.reduce((s, b) => s + b.intensity, 0) / trendBars.length;
  let overallPressureLevel;
  if (avgIntensity < 0.7) overallPressureLevel = 'low';
  else if (avgIntensity < 1.0) overallPressureLevel = 'medium';
  else if (avgIntensity < 1.4) overallPressureLevel = 'high';
  else overallPressureLevel = 'critical';

  if (queuePressure.level >= 3) {
    overallPressureLevel = overallPressureLevel === 'critical' ? 'critical' : 
      overallPressureLevel === 'high' ? 'critical' : 'high';
  }

  const pressureLabels = { low: '宽松', medium: '适中', high: '紧张', critical: '危险' };
  const baseMin = Math.max(0, Math.round(avgIntensity * 1.5 - 1));
  const baseMax = Math.max(baseMin + 1, Math.round(avgIntensity * 2.5 + 1));
  const queueBonus = Math.floor(waitingCount * 0.3);
  const pressureRangeMin = Math.max(0, baseMin + queueBonus);
  const pressureRangeMax = Math.max(pressureRangeMin + 1, baseMax + queueBonus);

  const waitingByGood = {};
  goodKeys.forEach(k => waitingByGood[k] = 0);
  state.customers.waiting.forEach(c => {
    if (waitingByGood[c.goodKey] !== undefined) {
      waitingByGood[c.goodKey]++;
    }
  });

  const incomingByGood = {};
  goodKeys.forEach(k => incomingByGood[k] = 0);
  state.customers.incoming.forEach(c => {
    if (incomingByGood[c.goodKey] !== undefined && c.arrivalTick <= currentTick + PREDICTION_LOOKAHEAD) {
      incomingByGood[c.goodKey]++;
    }
  });

  const goodForecasts = goodKeys.map(key => {
    const shelvesForGood = state.shelves.filter(s => s.good === key);
    const totalStock = shelvesForGood.reduce((sum, s) => sum + (isShelfBlocked(s) ? 0 : s.stock), 0);
    const totalMax = shelvesForGood.reduce((sum, s) => sum + s.max, 0);
    const blockedShelves = shelvesForGood.filter(s => isShelfBlocked(s)).length;
    const partialShelves = shelvesForGood.filter(s => isShelfPartialAccess(s)).length;

    let expectedDemand = 0;
    for (let i = 0; i < PREDICTION_LOOKAHEAD; i++) {
      const targetTick = currentTick + i + 1;
      if (targetTick >= totalTicks) break;
      const curveSeg = getCurveSegmentForTick(targetTick);
      let weight = 1;
      if (schedulingState.active && curveSeg && curveSeg.goodWeights[key]) {
        weight = curveSeg.goodWeights[key];
      }
      let segIntensity = 1;
      if (schedulingState.active && curveSeg) {
        segIntensity = curveSeg.intensity;
      }
      expectedDemand += segIntensity * weight * 0.8;
    }

    expectedDemand += waitingByGood[key] * 0.6;
    expectedDemand += incomingByGood[key] * 0.4;

    (state.events.active || []).forEach(evt => {
      const template = eventTemplates[evt.templateId];
      if (template && template.effect) {
        if (template.effect.demandMultiplier && template.effect.goodKey === key) {
          expectedDemand *= template.effect.demandMultiplier * 0.7;
        }
        if (template.effect.blockShelf && template.effect.targetGood === key) {
          expectedDemand *= partialShelves > 0 ? 0.5 : 0.1;
        }
        if (template.effect.blockWarehouse) {
          expectedDemand *= 1.15;
        }
      }
    });

    if (state.events.warning) {
      const warnTemplate = eventTemplates[state.events.warning.templateId];
      if (warnTemplate && warnTemplate.effect) {
        if (warnTemplate.effect.demandMultiplier && warnTemplate.effect.goodKey === key) {
          expectedDemand *= 1.35;
        }
        if (warnTemplate.effect.blockShelf && warnTemplate.effect.targetGood === key) {
          expectedDemand *= 1.2;
        }
      }
    }

    if (state.warehouseBlocked) {
      expectedDemand *= 1.1;
    }

    let demandFuzzyMin = Math.max(0, Math.round(expectedDemand * 0.65));
    let demandFuzzyMax = Math.max(demandFuzzyMin + 1, Math.round(expectedDemand * 1.45));

    let riskLevel;
    let riskLabel;
    const stockRatio = totalMax > 0 ? totalStock / totalMax : 0;
    const urgentWaiting = state.customers.waiting.filter(c => 
      c.goodKey === key && (c.maxWait - c.waited) <= 1
    ).length;

    if (totalStock === 0 || blockedShelves === shelvesForGood.length) {
      riskLevel = 'critical';
      riskLabel = '断货';
    } else if (urgentWaiting > 0 && totalStock < urgentWaiting) {
      riskLevel = 'critical';
      riskLabel = '极高';
    } else if (stockRatio < 0.2 && expectedDemand > totalStock * 1.5) {
      riskLevel = 'critical';
      riskLabel = '极高';
    } else if (stockRatio < 0.35 || (expectedDemand > totalStock && totalStock < 4)) {
      riskLevel = 'high';
      riskLabel = '偏高';
    } else if (stockRatio < 0.55 || expectedDemand > totalStock * 0.7) {
      riskLevel = 'medium';
      riskLabel = '中等';
    } else {
      riskLevel = 'low';
      riskLabel = '充足';
    }

    const lowStockThreshold = hasAbility("earlyAlert") ? 0.5 : 0.35;
    const bonusThreshold = lowStockThreshold + getLowStockThresholdBonus() / 100;
    if (stockRatio < bonusThreshold && riskLevel === 'low') {
      riskLevel = 'medium';
      riskLabel = '中等';
    }

    const prevDemand = schedulingState.active && schedulingState.generatedCurve
      ? (() => {
          const prevSeg = getCurveSegmentForTick(Math.max(0, currentTick - 2));
          return prevSeg ? (prevSeg.goodWeights[key] || 1) * prevSeg.intensity : 1;
        })()
      : 1;
    const currDemand = expectedDemand / PREDICTION_LOOKAHEAD;
    const demandRatio = prevDemand > 0 ? currDemand / prevDemand : 1;

    const recentServed = state.sessionSalesCount[key] || 0;
    const recentMissed = state.sessionMissCount[key] || 0;
    if (recentMissed > recentServed * 0.3 && recentMissed >= 2) {
      riskLevel = riskLevel === 'critical' ? 'critical' : 
        riskLevel === 'high' ? 'critical' : 'high';
    }

    let trend;
    if (demandRatio > 1.25) trend = 'up';
    else if (demandRatio < 0.75) trend = 'down';
    else trend = 'stable';

    const demandBarPercent = Math.min(100, Math.round((expectedDemand / Math.max(totalMax, 1)) * 100));

    return {
      key,
      totalStock,
      totalMax,
      expectedDemand,
      demandFuzzyMin,
      demandFuzzyMax,
      riskLevel,
      riskLabel,
      trend,
      demandBarPercent,
      blockedShelves,
      partialShelves,
      waitingCount: waitingByGood[key],
      incomingCount: incomingByGood[key]
    };
  });

  const eventHints = [];
  (state.events.active || []).forEach(evt => {
    const template = eventTemplates[evt.templateId];
    if (template) {
      const remaining = Math.max(0, evt.endTick - currentTick);
      eventHints.push({
        icon: template.icon,
        text: `${template.name} (还剩约${remaining}格)`,
        type: evt.type
      });
    }
  });

  if (state.events.warning) {
    const warnTemplate = eventTemplates[state.events.warning.templateId];
    if (warnTemplate) {
      eventHints.push({
        icon: warnTemplate.warningIcon || '⚠️',
        text: `${warnTemplate.warningTitle || '预警中'} (${state.events.warning.remainingTicks}格后触发)`,
        type: 'warning'
      });
    }
  }

  if (state.warehouseBlocked) {
    eventHints.push({
      icon: '📦',
      text: '仓库暂时缺货，补货受限',
      type: 'warehouse'
    });
  }

  const result = {
    trendBars,
    overallPressureLevel,
    pressureLabel: pressureLabels[overallPressureLevel],
    pressureRangeMin,
    pressureRangeMax,
    goodForecasts,
    eventHints
  };
  state._forecastCache = { key: cacheKey, value: result };
  return result;
}

function renderPredictionPanel() {
  if (!predictionPanelEl) return;
  if (!state.running) {
    predictionPanelEl.innerHTML = `
      <div class="prediction-empty">
        <div class="prediction-empty-icon">🔮</div>
        <div class="prediction-empty-text">营业开始后显示趋势预测</div>
        <div class="prediction-empty-hint">选择客流策略并开始营业</div>
      </div>
    `;
    return;
  }

  const forecast = computeForecast();

  const trendHtml = `
    <div class="prediction-section">
      <div class="prediction-section-title">📈 客流压力趋势</div>
      <div class="prediction-trend-chart">
        ${forecast.trendBars.map((bar, idx) => {
          const heightPct = Math.min(100, Math.max(10, bar.intensity * 50));
          return `<div class="prediction-trend-bar level-${bar.level}" style="height:${heightPct}%" title="第${idx + 1}格预测"></div>`;
        }).join('')}
      </div>
      <div class="prediction-trend-labels">
        <span>下1格</span>
        <span>${PREDICTION_LOOKAHEAD}格后</span>
      </div>
      <div class="prediction-pressure-row" style="margin-top:8px;">
        <span class="prediction-pressure-label">预期压力</span>
        <span class="prediction-pressure-badge risk-${forecast.overallPressureLevel}">${forecast.pressureLabel}</span>
      </div>
      <div class="prediction-fuzzy">预估进店 ${forecast.pressureRangeMin}~${forecast.pressureRangeMax} 人</div>
    </div>
  `;

  const dividerHtml = '<div class="prediction-section-divider"></div>';

  const goodsHtml = `
    <div class="prediction-section">
      <div class="prediction-section-title">🏷️ 热门商品 & 库存风险</div>
      <div class="prediction-goods-list">
        ${forecast.goodForecasts.map(g => {
          const good = goods[g.key];
          const trendIcon = g.trend === 'up' ? '↑' : g.trend === 'down' ? '↓' : '→';
          const trendLabel = g.trend === 'up' ? '升温' : g.trend === 'down' ? '降温' : '稳定';
          const blockedText = g.blockedShelves > 0 ? ` ⚠️${g.blockedShelves}架故障` : '';
          const partialText = g.partialShelves > 0 && g.blockedShelves === 0 ? ` 🔧${g.partialShelves}架受限` : '';
          const queueText = g.waitingCount > 0 ? ` 👥${g.waitingCount}人等待` : '';
          const barWidth = Math.min(100, g.demandBarPercent);
          return `
            <div class="prediction-good-row">
              <div class="prediction-good-icon">${good.icon}</div>
              <div class="prediction-good-info">
                <div class="prediction-good-name">
                  ${good.name}${blockedText}${partialText}${queueText}
                  <span class="prediction-good-trend ${g.trend}">${trendIcon}${trendLabel}</span>
                </div>
                <div class="prediction-good-bar"><span class="risk-${g.riskLevel}" style="width:${barWidth}%"></span></div>
                <div class="prediction-fuzzy">库存${g.totalStock}/${g.totalMax} · 需求约${g.demandFuzzyMin}~${g.demandFuzzyMax}份</div>
              </div>
              <span class="prediction-risk-badge risk-${g.riskLevel}">${g.riskLabel}</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  const eventHintsHtml = forecast.eventHints.length > 0 ? `
    ${dividerHtml}
    <div class="prediction-section">
      <div class="prediction-section-title">⚡ 事件影响</div>
      ${forecast.eventHints.map(h => `
        <div class="prediction-event-hint">
          <span class="hint-icon">${h.icon}</span>
          <span>${h.text}</span>
        </div>
      `).join('')}
    </div>
  ` : '';

  predictionPanelEl.innerHTML = trendHtml + dividerHtml + goodsHtml + eventHintsHtml;
}

const EVENT_TRIGGER_CONFIG = {
  minStartTick: 2,
  minGapBetweenEvents: 4,
  maxActiveEvents: 2,
  baseTriggerChance: 0.22,
  lateGameChanceBoost: 0.15
};

let eventBannerTimer = null;

function getRemainingEventTicks() {
  const level = getCurrentLevel();
  const totalTicks = Math.floor(level.duration / 5);
  const currentTick = Math.floor(state.minute / 5);
  return Math.max(0, totalTicks - currentTick);
}

function getAvailableEventTemplates(maxDuration = Infinity) {
  const activeIds = (state.events.active || []).map(e => e.id);
  return Object.values(eventTemplates).filter(t => !activeIds.includes(t.id) && t.minDuration <= maxDuration);
}

function canTriggerEvent() {
  const currentTick = Math.floor(state.minute / 5);
  const activeCount = (state.events.active || []).length;
  const remainingTicks = getRemainingEventTicks();

  const minStart = getTrainingConfigOverride('eventMinStartTick', EVENT_TRIGGER_CONFIG.minStartTick);
  const maxActive = getTrainingConfigOverride('eventMaxActive', EVENT_TRIGGER_CONFIG.maxActiveEvents);
  const minGap = getTrainingConfigOverride('eventMinGap', EVENT_TRIGGER_CONFIG.minGapBetweenEvents);

  if (currentTick < minStart) return false;
  if (activeCount >= maxActive) return false;
  if (state.events.warning) return false;
  if (state.events.lastTriggeredTick !== null &&
      currentTick - state.events.lastTriggeredTick < minGap) return false;
  if (remainingTicks < 3) return false;
  if (getAvailableEventTemplates(remainingTicks).length === 0) return false;
  return true;
}

function calculateTriggerChance() {
  const level = getCurrentLevel();
  const totalTicks = Math.floor(level.duration / 5);
  const currentTick = Math.floor(state.minute / 5);
  const progress = currentTick / totalTicks;
  const baseChance = getTrainingConfigOverride('eventBaseChance', EVENT_TRIGGER_CONFIG.baseTriggerChance);
  const boost = getTrainingConfigOverride('eventLateBoost', EVENT_TRIGGER_CONFIG.lateGameChanceBoost);
  let chance = baseChance;
  if (progress > 0.5) chance += boost;
  if (progress > 0.75) chance += boost * 0.5;
  return chance;
}

function tryTriggerRandomEvent() {
  if (!canTriggerEvent()) return;
  const chance = calculateTriggerChance();
  if (Math.random() > chance) return;

  const remainingTicks = getRemainingEventTicks();
  const available = getAvailableEventTemplates(remainingTicks);
  const template = available[Math.floor(Math.random() * available.length)];
  createEventWarning(template, remainingTicks);
}

function createEventWarning(template, maxDuration) {
  const currentTick = Math.floor(state.minute / 5);

  state.events.warning = {
    templateId: template.id,
    name: template.name,
    type: template.type,
    icon: template.icon,
    warningIcon: template.warningIcon,
    warningTitle: template.warningTitle,
    warningDesc: template.warningDesc,
    startTick: currentTick,
    remainingTicks: getEventWarningTicks(),
    maxDuration: maxDuration,
    selectedResponse: null
  };

  addLog(`⚠️ 预警：${template.warningDesc}`);
  showWarningBanner(template);
  showResponsePanel(template);
  replayRecordFrame('event_warning');
}

function showWarningBanner(template) {
  if (!warningBanner) return;
  warningBannerIcon.textContent = template.warningIcon || '⚠️';
  warningBannerTitle.textContent = template.warningTitle || '预警';
  warningBannerDesc.textContent = template.warningDesc || '';
  warningBannerCountdown.textContent = `剩余 ${state.events.warning.remainingTicks} 格`;
  warningBanner.classList.remove("hidden");
}

function updateWarningBannerCountdown() {
  if (!state.events.warning || !warningBannerCountdown) return;
  warningBannerCountdown.textContent = `剩余 ${state.events.warning.remainingTicks} 格`;
}

function hideWarningBanner() {
  if (warningBanner) warningBanner.classList.add("hidden");
}

function showResponsePanel(template) {
  if (!responsePanel) return;
  responseEventIcon.textContent = template.warningIcon || template.icon;
  responseEventName.textContent = template.warningTitle || template.name;
  responseEventDesc.textContent = '选择你的应对方式：';

  responseOptions.innerHTML = '';
  const responses = template.responses || [];
  const isReplayMode = replayPlayer && replayPlayer.active;
  responses.forEach(resp => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'response-option';
    if (isReplayMode) {
      btn.classList.add('disabled');
    }
    btn.innerHTML = `
      <span class="response-option-icon">${resp.icon}</span>
      <span class="response-option-name">${resp.name}</span>
      <span class="response-option-desc">${resp.desc}</span>
    `;
    if (!isReplayMode) {
      btn.addEventListener('click', () => selectEventResponse(resp.id));
    }
    responseOptions.appendChild(btn);
  });
  responsePanel.classList.remove("hidden");
}

function selectEventResponse(responseId) {
  if (!state.events.warning) return;
  state.events.warning.selectedResponse = responseId;

  const template = eventTemplates[state.events.warning.templateId];
  if (template && template.responses) {
    const resp = template.responses.find(r => r.id === responseId);
    if (resp) {
      addLog(`🛡️ 你选择了：${resp.icon} ${resp.name} — ${resp.desc}`);
    }
  }

  const options = responseOptions.querySelectorAll('.response-option');
  options.forEach(opt => opt.classList.remove('selected'));
  const idx = (template.responses || []).findIndex(r => r.id === responseId);
  if (idx >= 0 && options[idx]) {
    options[idx].classList.add('selected');
  }

  responsePanel.classList.add("hidden");
}

function tickWarningCountdown() {
  if (!state.events.warning) return;
  state.events.warning.remainingTicks--;
  updateWarningBannerCountdown();

  if (state.events.warning.remainingTicks <= 0) {
    const warning = state.events.warning;
    state.events.warning = null;
    hideWarningBanner();
    responsePanel.classList.add("hidden");
    startEventFromWarning(warning);
  }
}

function startEventFromWarning(warning) {
  const template = eventTemplates[warning.templateId];
  if (!template) return;

  const response = warning.selectedResponse
    ? (template.responses || []).find(r => r.id === warning.selectedResponse)
    : null;
  const effectMods = response ? response.effectMods : {};

  startEvent(template, warning.maxDuration, effectMods, response);
}

function startEvent(template, maxDuration = Infinity, effectMods = {}, response = null) {
  let durationMax = Math.min(template.maxDuration, maxDuration);
  const originalDuration = template.minDuration +
    Math.floor(Math.random() * (durationMax - template.minDuration + 1));
  let duration = originalDuration;

  if (effectMods.durationDelta) {
    duration = Math.max(template.minDuration, duration + effectMods.durationDelta);
  }

  const currentTick = Math.floor(state.minute / 5);

  const originalEffect = { ...template.effect };
  const effect = { ...originalEffect };
  if (effectMods.demandMultiplier && effect.demandMultiplier) {
    effect.demandMultiplier = Math.max(1, effect.demandMultiplier + effectMods.demandMultiplier);
  }
  if (effectMods.energyMultiplierDelta && effect.energyMultiplier) {
    effect.energyMultiplier = Math.max(1, effect.energyMultiplier + effectMods.energyMultiplierDelta);
  }
  if (effectMods.partialAccess) {
    effect.partialAccess = true;
  }
  if (effectMods.energySaveDuring) {
    effect.energySaveDuring = true;
  }

  if (effectMods.energyCost && state.energy >= effectMods.energyCost) {
    state.energy -= effectMods.energyCost;
    addLog(`💨 应对消耗了 ${effectMods.energyCost} 点体力`);
  }

  const event = {
    id: template.id,
    templateId: template.id,
    name: template.name,
    type: template.type,
    icon: template.icon,
    startTick: currentTick,
    endTick: currentTick + duration,
    duration: duration,
    effect: effect,
    responseName: response ? response.name : null,
    responseIcon: response ? response.icon : null
  };

  state.events.active.push(event);
  state.events.lastTriggeredTick = currentTick;
  state.events.history.push({
    id: template.id,
    name: template.name,
    startTick: currentTick,
    ended: false,
    endTick: null,
    responseName: response ? response.name : null,
    responseIcon: response ? response.icon : null,
    responseDesc: response ? response.desc : null,
    effectMods: Object.keys(effectMods).length > 0 ? effectMods : null,
    originalEffect: originalEffect,
    finalEffect: { ...effect },
    originalDuration: originalDuration,
    finalDuration: duration
  });

  let startLog = template.log.start;
  if (response && response.name !== '按兵不动') {
    startLog = `${response.icon} 应对「${response.name}」生效！` + startLog;
  }
  addLog(startLog);
  showEventBanner(template.startTitle, template.startDesc, template.type, false, template.icon);
  applyEventVisualEffects(template, true, effect);
  replayRecordFrame('event_start');
}

function checkEventExpirations() {
  const currentTick = Math.floor(state.minute / 5);
  const expired = [];
  state.events.active = state.events.active.filter(event => {
    if (currentTick >= event.endTick) {
      expired.push(event);
      return false;
    }
    return true;
  });

  expired.forEach(event => {
    const template = eventTemplates[event.templateId];
    if (template) {
      addLog(template.log.end);
      showEventBanner(template.endTitle, template.endDesc, template.type, true, template.icon);
      applyEventVisualEffects(template, false);
    }
    const historyEntry = state.events.history.find(h => h.id === event.templateId && !h.ended);
    if (historyEntry) {
      historyEntry.ended = true;
      historyEntry.endTick = currentTick;
    }
  });
  if (expired.length > 0) {
    replayRecordFrame('event_end');
  }
}

function endActiveEventsForClosing() {
  if (state.events.warning) {
    addLog(`⚠️ 预警中的「${state.events.warning.name}」因打烊取消。`);
    state.events.warning = null;
    hideWarningBanner();
    responsePanel && responsePanel.classList.add("hidden");
  }

  const active = state.events.active || [];
  if (active.length === 0) return;
  const currentTick = Math.floor(state.minute / 5);

  active.forEach(event => {
    const template = eventTemplates[event.templateId];
    if (template) {
      addLog(template.log.end);
      applyEventVisualEffects(template, false);
    }
    const historyEntry = state.events.history.find(h => h.id === event.templateId && !h.ended);
    if (historyEntry) {
      historyEntry.ended = true;
      historyEntry.endTick = currentTick;
    }
  });

  state.events.active = [];
}

function showEventBanner(title, desc, type, isEnd, icon) {
  if (!eventBanner) return;
  eventBanner.className = "event-banner";
  eventBanner.classList.add(`event-type-${type}`);
  if (isEnd) eventBanner.classList.add("event-end");
  eventBannerIcon.textContent = isEnd ? "✅" : (icon || "⚡");
  eventBannerTitle.textContent = title;
  eventBannerDesc.textContent = desc;
  eventBanner.classList.remove("hidden");

  if (eventBannerTimer) clearTimeout(eventBannerTimer);
  eventBannerTimer = setTimeout(() => {
    eventBanner.classList.add("hidden");
  }, 4000);
}

function applyEventVisualEffects(template, apply, effect) {
  if (!state || !state.shelves) return;
  const actualEffect = effect || template.effect;
  switch (template.id) {
    case "noodleShelfBroken":
      state.shelves.forEach(shelf => {
        if (shelf.good === "noodle") {
          shelf._broken = apply && !actualEffect.partialAccess;
          shelf._partialAccess = apply && actualEffect.partialAccess;
        }
      });
      break;
    case "warehouseShortage":
      state.warehouseBlocked = apply && !actualEffect.energySaveDuring;
      if (!state.warehouseBlocked) {
        state.emergencySupplyUsed = 0;
      }
      break;
    case "fatigueIncrease":
      if (apply) {
        document.body.classList.add("energy-high-drain");
      } else {
        document.body.classList.remove("energy-high-drain");
      }
      break;
  }
}

function hasActiveEvent(eventId) {
  if (!state || !state.events || !state.events.active) return false;
  return state.events.active.some(e => e.id === eventId);
}

function getActiveEventsByType(type) {
  if (!state || !state.events || !state.events.active) return [];
  return state.events.active.filter(e => e.type === type);
}

function getGoodDemandMultiplier(goodKey) {
  let multiplier = 1;
  const demandEvents = getActiveEventsByType("demand");
  demandEvents.forEach(event => {
    if (event.effect.goodKey === goodKey) {
      multiplier *= event.effect.demandMultiplier;
    }
  });
  return multiplier;
}

function isShelfBlocked(shelf) {
  if (!shelf) return false;
  if (shelf._broken) return true;
  if (shelf._partialAccess) return false;
  const shelfEvents = getActiveEventsByType("shelf");
  for (const event of shelfEvents) {
    if (event.effect.blockShelf && !event.effect.partialAccess && shelf.good === event.effect.targetGood) {
      return true;
    }
  }
  return false;
}

function isShelfPartialAccess(shelf) {
  if (!shelf || !shelf._partialAccess) return false;
  const shelfEvents = getActiveEventsByType("shelf");
  for (const event of shelfEvents) {
    if (event.effect.partialAccess && shelf.good === event.effect.targetGood) {
      return true;
    }
  }
  return false;
}

function isWarehouseBlocked() {
  if (state.warehouseBlocked) return true;
  const warehouseEvents = getActiveEventsByType("warehouse");
  for (const event of warehouseEvents) {
    if (!event.effect.energySaveDuring) return true;
  }
  return false;
}

function getEnergyMultiplier() {
  let multiplier = 1;
  const energyEvents = getActiveEventsByType("energy");
  energyEvents.forEach(event => {
    multiplier *= event.effect.energyMultiplier;
  });
  const warehouseEvents = getActiveEventsByType("warehouse");
  warehouseEvents.forEach(event => {
    if (event.effect.energySaveDuring) {
      multiplier *= 0.5;
    }
  });
  return multiplier;
}

function renderActiveEvents() {
  if (!activeEventsEl) return;
  const active = state.events.active || [];
  const warning = state.events.warning;

  if (active.length === 0 && !warning) {
    activeEventsEl.classList.add("hidden");
    return;
  }
  activeEventsEl.classList.remove("hidden");
  activeEventsEl.innerHTML = "";
  const currentTick = Math.floor(state.minute / 5);

  if (warning) {
    const wCard = document.createElement("div");
    wCard.className = "active-event-card type-warning";
    const respText = warning.selectedResponse
      ? eventTemplates[warning.templateId]?.responses?.find(r => r.id === warning.selectedResponse)?.name || '已选择'
      : '等待选择...';
    wCard.innerHTML = `
      <span class="active-event-icon">${warning.warningIcon || '⚠️'}</span>
      <div class="active-event-info">
        <div class="active-event-name">${warning.warningTitle || '预警中'}</div>
        <div class="active-event-remaining">
          <span>预警剩余 ${warning.remainingTicks} 格</span>
          <div class="active-event-bar warning"><span style="width:${(warning.remainingTicks / getEventWarningTicks()) * 100}%"></span></div>
        </div>
        <div class="active-event-response">应对：${respText}</div>
      </div>
    `;
    activeEventsEl.appendChild(wCard);
  }

  active.forEach(event => {
    const remaining = Math.max(0, event.endTick - currentTick);
    const total = event.duration;
    const elapsed = total - remaining;
    const ratio = total > 0 ? Math.max(0, Math.min(100, ((total - elapsed) / total) * 100)) : 0;

    const responseHtml = event.responseName
      ? `<div class="active-event-response">${event.responseIcon || ''} ${event.responseName}</div>`
      : '';

    const card = document.createElement("div");
    card.className = `active-event-card type-${event.type}${event.responseName ? ' has-response' : ''}`;
    card.innerHTML = `
      <span class="active-event-icon">${event.icon}</span>
      <div class="active-event-info">
        <div class="active-event-name">${event.name}</div>
        <div class="active-event-remaining">
          <span>剩余 ${remaining} 格</span>
          <div class="active-event-bar"><span style="width:${ratio}%"></span></div>
        </div>
        ${responseHtml}
      </div>
    `;
    activeEventsEl.appendChild(card);
  });
}

function resetAllEventEffects(preserveWarning = false) {
  if (state) {
    state.warehouseBlocked = false;
    state.emergencySupplyUsed = 0;
    if (state.shelves) {
      state.shelves.forEach(shelf => {
        shelf._broken = false;
        shelf._partialAccess = false;
      });
    }
    if (state.events && !preserveWarning) {
      state.events.warning = null;
    }
  }
  document.body.classList.remove("energy-high-drain");
  if (eventBannerTimer) {
    clearTimeout(eventBannerTimer);
    eventBannerTimer = null;
  }
  if (eventBanner) eventBanner.classList.add("hidden");
  if (activeEventsEl) activeEventsEl.classList.add("hidden");
  if (warningBanner) warningBanner.classList.add("hidden");
  if (responsePanel) responsePanel.classList.add("hidden");
}

const goods = {
  snack: {
    name: "饭团",
    price: 12,
    icon: "🍙",
    desc: "深夜充饥的经典选择，海苔包裹着温热的米饭，一口一个刚刚好。",
    restockGain: 2,
    missPenalty: 15,
    unlockTexts: [
      { threshold: 1, text: "初遇：有顾客买走了第一个饭团。" },
      { threshold: 5, text: "小有名气：饭团开始成为夜班常客的夜宵首选。" },
      { threshold: 15, text: "招牌商品：你的饭团已经远近闻名，顾客专门为它而来。" }
    ]
  },
  drink: {
    name: "热饮",
    price: 9,
    icon: "☕",
    desc: "暖暖的热饮，深夜里握住纸杯的温度，是治愈疲惫的良药。",
    restockGain: 2,
    missPenalty: 15,
    unlockTexts: [
      { threshold: 1, text: "初遇：第一位顾客选择了热饮来取暖。" },
      { threshold: 5, text: "温暖陪伴：越来越多的人在深夜点上一杯热饮。" },
      { threshold: 15, text: "深夜灯塔：你的热饮成为了寒夜里最温暖的守候。" }
    ]
  },
  noodle: {
    name: "泡面",
    price: 16,
    icon: "🍜",
    desc: "宵夜之王，热气腾腾的泡面总能慰藉辘辘饥肠。",
    restockGain: 2,
    missPenalty: 15,
    unlockTexts: [
      { threshold: 1, text: "初遇：有人在深夜泡了第一碗面。" },
      { threshold: 5, text: "夜宵霸主：泡面的香气开始弥漫整个夜班。" },
      { threshold: 15, text: "传奇之味：你的泡面销量让供应商都啧啧称奇。" }
    ]
  }
};

const clerkLevels = [
  { level: 1, title: "新手店员", expRequired: 0, icon: "👷" },
  { level: 2, title: "实习店员", expRequired: 100, icon: "🧑‍💼", ability: { id: "moveSave", name: "轻步如风", desc: "移动不再消耗体力" } },
  { level: 3, title: "正式店员", expRequired: 300, icon: "👨‍💼", ability: { id: "restockBonus", name: "高效补货", desc: "每次补货数量+1" } },
  { level: 4, title: "资深店员", expRequired: 600, icon: "🎯", ability: { id: "earlyAlert", name: "库存直觉", desc: "低库存提醒更早出现" } },
  { level: 5, title: "店长", expRequired: 1000, icon: "⭐", ability: { id: "dualCarry", name: "双手搬运", desc: "可同时携带两种货物" } }
];

const skillBranches = {
  restock: {
    name: "补货专精",
    icon: "📦",
    desc: "提升补货效率与应急能力",
    skills: [
      {
        id: "restockBoost",
        name: "大量补货",
        icon: "📦",
        desc: "每次补货数量额外+1",
        maxLevel: 3,
        effectPerLevel: 1
      },
      {
        id: "emergencySupply",
        name: "应急取货",
        icon: "🆘",
        desc: "仓库断货时仍可额外取货N次（每次事件）",
        maxLevel: 2,
        effectPerLevel: 1
      }
    ]
  },
  stamina: {
    name: "体力专精",
    icon: "💪",
    desc: "增强体力与持久力",
    skills: [
      {
        id: "energyEfficient",
        name: "节省体力",
        icon: "⚡",
        desc: "所有行动体力消耗减少1点（最低为0）",
        maxLevel: 3,
        effectPerLevel: 1
      },
      {
        id: "staminaBoost",
        name: "体力充沛",
        icon: "💪",
        desc: "体力上限+20",
        maxLevel: 2,
        effectPerLevel: 20
      }
    ]
  },
  foresight: {
    name: "预判专精",
    icon: "🔮",
    desc: "提前感知顾客与事件",
    skills: [
      {
        id: "previewExtend",
        name: "未卜先知",
        icon: "👁️",
        desc: "顾客入店预告提前N格显示",
        maxLevel: 2,
        effectPerLevel: 1
      },
      {
        id: "earlyWarning",
        name: "事件预感",
        icon: "⚠️",
        desc: "经营事件预警提前N格出现",
        maxLevel: 2,
        effectPerLevel: 1
      },
      {
        id: "lowStockSense",
        name: "库存敏锐",
        icon: "📊",
        desc: "低库存提醒阈值提高10%",
        maxLevel: 2,
        effectPerLevel: 10
      }
    ]
  }
};

function getDefaultSkillData() {
  const skills = {};
  Object.values(skillBranches).forEach(branch => {
    branch.skills.forEach(skill => {
      skills[skill.id] = 0;
    });
  });
  return skills;
}

function loadClerkData() {
  const saved = localStorage.getItem("clerkData");
  const defaultSkills = getDefaultSkillData();
  if (saved) {
    const parsed = JSON.parse(saved);
    if (!parsed.skillPoints) parsed.skillPoints = 0;
    if (!parsed.skills) parsed.skills = defaultSkills;
    else {
      Object.keys(defaultSkills).forEach(k => {
        if (parsed.skills[k] === undefined) parsed.skills[k] = 0;
      });
    }
    if (!parsed.emergencySupplyUsed) parsed.emergencySupplyUsed = 0;
    return parsed;
  }
  return { exp: 0, level: 1, skillPoints: 0, skills: defaultSkills, emergencySupplyUsed: 0 };
}

function saveClerkData(data) {
  localStorage.setItem("clerkData", JSON.stringify(data));
}

function getSkillLevel(skillId) {
  const data = loadClerkData();
  return data.skills[skillId] || 0;
}

function getSkillEffect(skillId) {
  const level = getSkillLevel(skillId);
  for (const branch of Object.values(skillBranches)) {
    const skill = branch.skills.find(s => s.id === skillId);
    if (skill) return level * skill.effectPerLevel;
  }
  return 0;
}

function getTotalSkillPointsEarned() {
  const data = loadClerkData();
  return Math.max(0, data.level - 1);
}

function getAvailableSkillPoints() {
  const data = loadClerkData();
  return data.skillPoints;
}

function upgradeSkill(skillId) {
  const data = loadClerkData();
  for (const branch of Object.values(skillBranches)) {
    const skill = branch.skills.find(s => s.id === skillId);
    if (skill) {
      if (data.skillPoints <= 0) return { success: false, reason: "技能点不足" };
      if ((data.skills[skillId] || 0) >= skill.maxLevel) return { success: false, reason: "已达最高等级" };
      data.skills[skillId] = (data.skills[skillId] || 0) + 1;
      data.skillPoints -= 1;
      saveClerkData(data);
      if (skillId === "staminaBoost") {
        const newMax = 100 + getMaxEnergyBonus();
        if (state) {
          state.maxEnergy = newMax;
          state.energy = Math.min(state.energy + skill.effectPerLevel, newMax);
        }
      }
      render();
      return { success: true, newLevel: data.skills[skillId] };
    }
  }
  return { success: false, reason: "技能不存在" };
}

function getRestockBonusAmount() {
  const base = hasAbility("restockBonus") ? 3 : 2;
  return base + getSkillEffect("restockBoost");
}

function getEnergyCostReduction() {
  return getSkillEffect("energyEfficient");
}

function getMaxEnergyBonus() {
  return getSkillEffect("staminaBoost");
}

function getIncomingPreviewBonus() {
  return getSkillEffect("previewExtend");
}

function getEventWarningBonus() {
  return getSkillEffect("earlyWarning");
}

function getLowStockThresholdBonus() {
  return getSkillEffect("lowStockSense");
}

function getEmergencySupplyMax() {
  return getSkillEffect("emergencySupply");
}

function getClerkLevelInfo(clerkLevel) {
  return clerkLevels.find(cl => cl.level === clerkLevel) || clerkLevels[0];
}

function getNextClerkLevel(clerkLevel) {
  return clerkLevels.find(cl => cl.level === clerkLevel + 1) || null;
}

function getUnlockedAbilities() {
  const data = loadClerkData();
  const abilities = [];
  clerkLevels.forEach(cl => {
    if (cl.ability && data.level >= cl.level) {
      abilities.push(cl.ability.id);
    }
  });
  return abilities;
}

function hasAbility(id) {
  return getUnlockedAbilities().includes(id);
}

function maxCarryCount() {
  if (training.active && training.themeId && TRAINING_THEMES[training.themeId]?.config?.forceDualCarry) {
    return 2;
  }
  return hasAbility("dualCarry") ? 2 : 1;
}

const CUSTOMER_WAIT_MIN = 3;
const CUSTOMER_WAIT_MAX = 6;
const INCOMING_PREVIEW = 5;
const MAX_WAITING_CUSTOMERS = 8;

const goalTemplates = [
  {
    type: "total_sales",
    name: "总销售额目标",
    generate: () => {
      const targets = [120, 150, 180, 200, 240];
      const target = targets[Math.floor(Math.random() * targets.length)];
      return {
        type: "total_sales",
        title: `夜班总销售额达到 ¥${target}`,
        target: target,
        reward: Math.round(target * 0.4),
        unit: "¥"
      };
    },
    getProgress: (state, goal) => Math.min(state.sales, goal.target)
  },
  {
    type: "good_sales",
    name: "指定商品销售额",
    generate: () => {
      const goodKeys = getCurrentLevelGoodKeys();
      const goodKey = goodKeys[Math.floor(Math.random() * goodKeys.length)];
      const good = goods[goodKey];
      const multipliers = [4, 5, 6, 7, 8];
      const count = multipliers[Math.floor(Math.random() * multipliers.length)];
      const target = good.price * count;
      return {
        type: "good_sales",
        title: `${good.icon} ${good.name}销售额达到 ¥${target}`,
        target: target,
        goodKey: goodKey,
        reward: Math.round(target * 0.5),
        unit: "¥"
      };
    },
    getProgress: (state, goal) => {
      const count = state.sessionSalesCount[goal.goodKey] || 0;
      return Math.min(count * goods[goal.goodKey].price, goal.target);
    }
  },
  {
    type: "good_count",
    name: "指定商品销量",
    generate: () => {
      const goodKeys = getCurrentLevelGoodKeys();
      const goodKey = goodKeys[Math.floor(Math.random() * goodKeys.length)];
      const good = goods[goodKey];
      const targets = [5, 6, 7, 8, 10];
      const target = targets[Math.floor(Math.random() * targets.length)];
      return {
        type: "good_count",
        title: `${good.icon} 卖出${target}份${good.name}`,
        target: target,
        goodKey: goodKey,
        reward: target * 6,
        unit: "份"
      };
    },
    getProgress: (state, goal) => Math.min(state.sessionSalesCount[goal.goodKey] || 0, goal.target)
  },
  {
    type: "max_misses",
    name: "缺货次数限制",
    generate: () => {
      const targets = [1, 2, 3, 4];
      const target = targets[Math.floor(Math.random() * targets.length)];
      return {
        type: "max_misses",
        title: `缺货次数不超过 ${target} 次`,
        target: target,
        reward: (8 - target) * 12,
        unit: "次",
        inverse: true
      };
    },
    getProgress: (state, goal) => state.misses
  },
  {
    type: "min_energy",
    name: "保留体力",
    generate: () => {
      const targets = [30, 40, 50, 60];
      const target = targets[Math.floor(Math.random() * targets.length)];
      return {
        type: "min_energy",
        title: `夜班结束时体力保留 ${target} 以上`,
        target: target,
        reward: target + 10,
        unit: "点",
        endOnly: true
      };
    },
    getProgress: (state, goal) => state.energy
  },
  {
    type: "shelf_stock",
    name: "货架库存保持",
    generate: () => {
      const shelvesForGoal = state && state.shelves && state.shelves.length > 0
        ? state.shelves
        : getCurrentLevel().shelves;
      const shelf = shelvesForGoal[Math.floor(Math.random() * shelvesForGoal.length)];
      const good = goods[shelf.good];
      const targets = [1, 2];
      const target = targets[Math.floor(Math.random() * targets.length)];
      return {
        type: "shelf_stock",
        title: `${shelf.id}货架${good.icon}${good.name}库存从不低于 ${target}`,
        target: target,
        shelfId: shelf.id,
        reward: 35 + target * 15,
        unit: "件",
        failOnBreak: true,
        broken: false
      };
    },
    getProgress: (state, goal) => {
      const shelf = state.shelves.find(s => s.id === goal.shelfId);
      return shelf ? shelf.stock : 0;
    }
  }
];

let state;
let timer;

const editor = {
  active: false,
  selectedShelfId: null,
  originalShelves: [],
  logs: []
};

const schemeState = {
  activeSchemeId: null,
  tempSchemeId: null,
  tempSchemeData: null,
  lastSavedSchemeId: null
};

const SCHEME_STORAGE_KEY = "wxyy_layout_schemes";

function loadAllSchemes() {
  try {
    const raw = localStorage.getItem(SCHEME_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return {};
    return parsed;
  } catch (e) {
    console.warn("读取布局方案失败", e);
    return {};
  }
}

function saveAllSchemes(allSchemes) {
  try {
    localStorage.setItem(SCHEME_STORAGE_KEY, JSON.stringify(allSchemes));
    return true;
  } catch (e) {
    console.warn("保存布局方案失败", e);
    return false;
  }
}

function getSchemesForLevel(levelId) {
  const all = loadAllSchemes();
  const levelKey = `level_${levelId}`;
  const schemes = all[levelKey];
  if (!Array.isArray(schemes)) return [];
  return schemes;
}

function setSchemesForLevel(levelId, schemes) {
  const all = loadAllSchemes();
  const levelKey = `level_${levelId}`;
  all[levelKey] = schemes;
  return saveAllSchemes(all);
}

function generateSchemeId() {
  return `scheme_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function serializeShelves(shelves) {
  return shelves.map(s => ({
    id: s.id,
    x: s.x,
    y: s.y,
    good: s.good,
    max: s.max
  }));
}

function validateShelves(shelves, level) {
  if (!Array.isArray(shelves)) return false;
  if (shelves.length === 0) return false;
  for (const s of shelves) {
    if (typeof s.id !== "string") return false;
    if (typeof s.x !== "number" || typeof s.y !== "number") return false;
    if (typeof s.good !== "string") return false;
    if (!goods[s.good]) return false;
    if (s.x < 0 || s.x >= level.mapCols) return false;
    if (s.y < 0 || s.y >= level.mapRows) return false;
  }
  return true;
}

function formatSchemeDate(timestamp) {
  if (!timestamp) return "";
  const d = new Date(timestamp);
  const pad = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function buildShelfPreviewHtml(shelves) {
  if (!shelves || shelves.length === 0) return "";
  return shelves.map(s => {
    const g = goods[s.good] || { icon: "❓", name: "未知" };
    return `<span>${s.id} ${g.icon}${g.name}(${s.x},${s.y})</span>`;
  }).join("");
}

function getActiveSchemeName() {
  if (!schemeState.activeSchemeId) return "默认布局";
  const schemes = getSchemesForLevel(currentLevelId);
  const scheme = schemes.find(s => s.id === schemeState.activeSchemeId);
  return scheme ? scheme.name : "默认布局";
}

function updateEditorCurrentSchemeDisplay() {
  if (!currentSchemeNameEl) return;
  currentSchemeNameEl.textContent = getActiveSchemeName();
}

function openSaveSchemeDialog() {
  if (!state || !state.shelves) return;
  schemeNameInput.value = "";
  schemeDescInput.value = "";
  const level = getCurrentLevel();
  const previewHtml = buildShelfPreviewHtml(state.shelves);
  schemeSavePreview.innerHTML = `
    <p class="scheme-save-preview-title">当前布局预览（${level.mapCols}×${level.mapRows}，共 ${state.shelves.length} 个货架）</p>
    <div class="scheme-save-preview-items">${previewHtml}</div>
  `;
  schemeSaveOverlay.classList.remove("hidden");
  setTimeout(() => schemeNameInput.focus(), 100);
}

function closeSaveSchemeDialog() {
  schemeSaveOverlay.classList.add("hidden");
  schemeNameInput.value = "";
  schemeDescInput.value = "";
}

function confirmSaveScheme() {
  const name = schemeNameInput.value.trim();
  const desc = schemeDescInput.value.trim();
  if (!name) {
    addEditorLog("请输入方案名称！", "error");
    schemeNameInput.focus();
    return;
  }
  if (name.length > 20) {
    addEditorLog("方案名称不能超过 20 个字符！", "error");
    schemeNameInput.focus();
    return;
  }
  const level = getCurrentLevel();
  const shelvesData = serializeShelves(state.shelves);
  if (!validateShelves(shelvesData, level)) {
    addEditorLog("布局数据不合法，无法保存！", "error");
    return;
  }
  const schemes = getSchemesForLevel(currentLevelId);
  const existing = schemes.find(s => s.name === name);
  if (existing) {
    const overwriteOk = confirm(`已存在名为「${name}」的方案，是否覆盖？`);
    if (!overwriteOk) {
      schemeNameInput.focus();
      return;
    }
    existing.shelves = shelvesData;
    existing.desc = desc;
    existing.updatedAt = Date.now();
    existing.shelfCount = shelvesData.length;
    existing.mapSize = `${level.mapCols}×${level.mapRows}`;
    schemeState.activeSchemeId = existing.id;
    schemeState.lastSavedSchemeId = existing.id;
  } else {
    const newScheme = {
      id: generateSchemeId(),
      name: name,
      desc: desc,
      shelves: shelvesData,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      shelfCount: shelvesData.length,
      mapSize: `${level.mapCols}×${level.mapRows}`
    };
    schemes.push(newScheme);
    schemeState.activeSchemeId = newScheme.id;
    schemeState.lastSavedSchemeId = newScheme.id;
  }
  const ok = setSchemesForLevel(currentLevelId, schemes);
  if (ok) {
    addEditorLog(`✅ 方案「${name}」保存成功！`, "success");
    addLog(`📁 布局方案「${name}」已保存`);
    updateEditorCurrentSchemeDisplay();
    closeSaveSchemeDialog();
    if (!schemeOverlay.classList.contains("hidden")) {
      renderSchemeList();
    }
  } else {
    addEditorLog("保存失败，可能是浏览器存储空间不足。", "error");
  }
}

function openSchemeManager() {
  const level = getCurrentLevel();
  schemeDialogLevel.textContent = `当前关卡：${level.icon} ${level.name}（${level.mapCols}×${level.mapRows}）`;
  renderSchemeList();
  schemeOverlay.classList.remove("hidden");
}

function closeSchemeManager() {
  schemeOverlay.classList.add("hidden");
}

function renderSchemeList() {
  const schemes = getSchemesForLevel(currentLevelId);
  if (schemes.length === 0) {
    schemeListEl.innerHTML = "";
    schemeListEl.classList.add("hidden");
    schemeEmptyHint.classList.remove("hidden");
    return;
  }
  schemeListEl.classList.remove("hidden");
  schemeEmptyHint.classList.add("hidden");
  schemeListEl.innerHTML = "";
  const sortedSchemes = [...schemes].sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  sortedSchemes.forEach(scheme => {
    const isCurrent = scheme.id === schemeState.activeSchemeId;
    const card = document.createElement("div");
    card.className = `scheme-card ${isCurrent ? "current" : ""}`;
    const previewHtml = buildShelfPreviewHtml(scheme.shelves);
    const createdAt = formatSchemeDate(scheme.createdAt);
    const updatedAt = formatSchemeDate(scheme.updatedAt);
    const timeText = scheme.updatedAt && scheme.updatedAt !== scheme.createdAt
      ? `更新于 ${updatedAt}`
      : `创建于 ${createdAt}`;
    card.innerHTML = `
      <div class="scheme-card-header">
        <div class="scheme-card-title">
          <div class="scheme-card-icon">📐</div>
          <div class="scheme-card-info">
            <div class="scheme-card-name">
              ${escapeHtml(scheme.name)}
              ${isCurrent ? '<span class="current-badge">当前方案</span>' : ""}
            </div>
            <div class="scheme-card-meta">
              ${scheme.mapSize || ""} · ${scheme.shelfCount || 0} 个货架 · ${timeText}
            </div>
          </div>
        </div>
      </div>
      ${scheme.desc ? `<div class="scheme-card-desc">${escapeHtml(scheme.desc)}</div>` : ""}
      <div class="scheme-card-preview">
        ${previewHtml}
      </div>
      <div class="scheme-card-actions">
        <button class="scheme-card-btn apply ${isCurrent ? "current-active" : ""}" data-action="apply" data-id="${scheme.id}" type="button">
          ${isCurrent ? "✓ 已应用" : "🔄 应用方案"}
        </button>
        <button class="scheme-card-btn rename" data-action="rename" data-id="${scheme.id}" type="button">✏️ 重命名</button>
        <button class="scheme-card-btn delete" data-action="delete" data-id="${scheme.id}" type="button">🗑️ 删除</button>
      </div>
    `;
    schemeListEl.appendChild(card);
  });
  schemeListEl.querySelectorAll(".scheme-card-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const action = e.currentTarget.dataset.action;
      const id = e.currentTarget.dataset.id;
      handleSchemeCardAction(action, id);
    });
  });
}

function escapeHtml(str) {
  if (!str) return "";
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function handleSchemeCardAction(action, schemeId) {
  if (!schemeId) return;
  const schemes = getSchemesForLevel(currentLevelId);
  const scheme = schemes.find(s => s.id === schemeId);
  if (!scheme) {
    addEditorLog("方案不存在，可能已被删除。", "error");
    renderSchemeList();
    return;
  }
  switch (action) {
    case "apply":
      openApplySchemeDialog(scheme);
      break;
    case "rename":
      openRenameSchemeDialog(scheme);
      break;
    case "delete":
      openDeleteSchemeDialog(scheme);
      break;
  }
}

function openApplySchemeDialog(scheme) {
  const isCurrent = scheme.id === schemeState.activeSchemeId;
  schemeState.tempSchemeId = scheme.id;
  schemeState.tempSchemeData = scheme;
  const previewHtml = buildShelfPreviewHtml(scheme.shelves);
  schemeApplyMsg.textContent = isCurrent
    ? `当前已经在使用「${scheme.name}」。重新应用将放弃当前编辑，恢复到保存时的状态。`
    : `确定要加载方案「${scheme.name}」吗？${editor.active ? "当前的编辑将被覆盖。" : ""}`;
  schemeApplyPreview.innerHTML = `
    <p class="scheme-apply-preview-title">方案内容预览</p>
    <div class="scheme-apply-preview-items">${previewHtml}</div>
  `;
  schemeApplyOverlay.classList.remove("hidden");
}

function closeApplySchemeDialog() {
  schemeApplyOverlay.classList.add("hidden");
  schemeState.tempSchemeId = null;
  schemeState.tempSchemeData = null;
}

function confirmApplyScheme() {
  const scheme = schemeState.tempSchemeData;
  if (!scheme) {
    closeApplySchemeDialog();
    return;
  }
  const level = getCurrentLevel();
  if (!validateShelves(scheme.shelves, level)) {
    addEditorLog(`方案「${scheme.name}」数据不合法，无法应用！`, "error");
    closeApplySchemeDialog();
    return;
  }
  const newShelves = scheme.shelves.map(s => {
    const currentShelf = state.shelves.find(existing => existing.id === s.id);
    const levelShelf = level.shelves.find(existing => existing.id === s.id);
    const stockSource = currentShelf || levelShelf || {};
    return {
      id: s.id,
      x: s.x,
      y: s.y,
      good: s.good,
      stock: stockSource.stock || 0,
      max: s.max,
      _broken: Boolean(stockSource._broken),
      _partialAccess: Boolean(stockSource._partialAccess)
    };
  });
  state.shelves = newShelves;
  schemeState.activeSchemeId = scheme.id;
  editor.selectedShelfId = null;
  editor.originalShelves = state.shelves.map(s => ({ ...s }));
  addEditorLog(`✅ 已应用方案「${scheme.name}」`, "success");
  addLog(`📐 已应用布局方案「${scheme.name}」`);
  updateEditorCurrentSchemeDisplay();
  updateEditorUI();
  render();
  closeApplySchemeDialog();
  if (!schemeOverlay.classList.contains("hidden")) {
    renderSchemeList();
  }
}

function openRenameSchemeDialog(scheme) {
  schemeState.tempSchemeId = scheme.id;
  schemeState.tempSchemeData = scheme;
  schemeRenameInput.value = scheme.name;
  schemeRenameOverlay.classList.remove("hidden");
  setTimeout(() => {
    schemeRenameInput.focus();
    schemeRenameInput.select();
  }, 100);
}

function closeRenameSchemeDialog() {
  schemeRenameOverlay.classList.add("hidden");
  schemeRenameInput.value = "";
  schemeState.tempSchemeId = null;
  schemeState.tempSchemeData = null;
}

function confirmRenameScheme() {
  const newName = schemeRenameInput.value.trim();
  const scheme = schemeState.tempSchemeData;
  if (!scheme) {
    closeRenameSchemeDialog();
    return;
  }
  if (!newName) {
    addEditorLog("请输入新的方案名称！", "error");
    schemeRenameInput.focus();
    return;
  }
  if (newName.length > 20) {
    addEditorLog("方案名称不能超过 20 个字符！", "error");
    schemeRenameInput.focus();
    return;
  }
  const schemes = getSchemesForLevel(currentLevelId);
  const duplicate = schemes.find(s => s.name === newName && s.id !== scheme.id);
  if (duplicate) {
    addEditorLog(`已存在名为「${newName}」的方案！`, "error");
    schemeRenameInput.focus();
    return;
  }
  const target = schemes.find(s => s.id === scheme.id);
  if (!target) {
    addEditorLog("方案不存在，可能已被删除。", "error");
    closeRenameSchemeDialog();
    renderSchemeList();
    return;
  }
  const oldName = target.name;
  target.name = newName;
  target.updatedAt = Date.now();
  const ok = setSchemesForLevel(currentLevelId, schemes);
  if (ok) {
    addEditorLog(`✅ 方案「${oldName}」已重命名为「${newName}」`, "success");
    updateEditorCurrentSchemeDisplay();
    closeRenameSchemeDialog();
    renderSchemeList();
  } else {
    addEditorLog("重命名失败！", "error");
  }
}

function openDeleteSchemeDialog(scheme) {
  schemeState.tempSchemeId = scheme.id;
  schemeState.tempSchemeData = scheme;
  schemeDeleteMsg.innerHTML = `确定要删除方案「<strong>${escapeHtml(scheme.name)}</strong>」吗？<br>此操作不可撤销。`;
  schemeDeleteOverlay.classList.remove("hidden");
}

function closeDeleteSchemeDialog() {
  schemeDeleteOverlay.classList.add("hidden");
  schemeState.tempSchemeId = null;
  schemeState.tempSchemeData = null;
}

function confirmDeleteScheme() {
  const scheme = schemeState.tempSchemeData;
  if (!scheme) {
    closeDeleteSchemeDialog();
    return;
  }
  let schemes = getSchemesForLevel(currentLevelId);
  const initialCount = schemes.length;
  schemes = schemes.filter(s => s.id !== scheme.id);
  if (schemes.length === initialCount) {
    addEditorLog("方案不存在，可能已被删除。", "error");
    closeDeleteSchemeDialog();
    renderSchemeList();
    return;
  }
  const ok = setSchemesForLevel(currentLevelId, schemes);
  if (ok) {
    const wasActive = schemeState.activeSchemeId === scheme.id;
    if (wasActive) {
      schemeState.activeSchemeId = null;
      updateEditorCurrentSchemeDisplay();
    }
    addEditorLog(`✅ 方案「${scheme.name}」已删除`, "success");
    addLog(`🗑️ 布局方案「${scheme.name}」已删除`);
    closeDeleteSchemeDialog();
    renderSchemeList();
  } else {
    addEditorLog("删除失败！", "error");
  }
}

function handleNewSchemeFromManager() {
  closeSchemeManager();
  if (!editor.active) {
    enterEditMode();
  }
  setTimeout(openSaveSchemeDialog, 200);
}

function bindSchemeControls() {
  if (saveAsSchemeBtn) {
    saveAsSchemeBtn.addEventListener("click", () => {
      if (!editor.active) {
        addLog("请先进入布局编辑模式，调整好布局后再保存为方案。");
        return;
      }
      openSaveSchemeDialog();
    });
  }
  if (manageSchemesBtn) {
    manageSchemesBtn.addEventListener("click", openSchemeManager);
  }
  if (schemeCloseBtn) {
    schemeCloseBtn.addEventListener("click", closeSchemeManager);
  }
  if (schemeOverlay) {
    schemeOverlay.addEventListener("click", (e) => {
      if (e.target === schemeOverlay) closeSchemeManager();
    });
  }
  if (schemeNewBtn) {
    schemeNewBtn.addEventListener("click", handleNewSchemeFromManager);
  }

  if (schemeSaveCloseBtn) {
    schemeSaveCloseBtn.addEventListener("click", closeSaveSchemeDialog);
  }
  if (schemeSaveCancelBtn) {
    schemeSaveCancelBtn.addEventListener("click", closeSaveSchemeDialog);
  }
  if (schemeSaveConfirmBtn) {
    schemeSaveConfirmBtn.addEventListener("click", confirmSaveScheme);
  }
  if (schemeSaveOverlay) {
    schemeSaveOverlay.addEventListener("click", (e) => {
      if (e.target === schemeSaveOverlay) closeSaveSchemeDialog();
    });
  }
  if (schemeNameInput) {
    schemeNameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") confirmSaveScheme();
    });
  }

  if (schemeRenameCloseBtn) {
    schemeRenameCloseBtn.addEventListener("click", closeRenameSchemeDialog);
  }
  if (schemeRenameCancelBtn) {
    schemeRenameCancelBtn.addEventListener("click", closeRenameSchemeDialog);
  }
  if (schemeRenameConfirmBtn) {
    schemeRenameConfirmBtn.addEventListener("click", confirmRenameScheme);
  }
  if (schemeRenameOverlay) {
    schemeRenameOverlay.addEventListener("click", (e) => {
      if (e.target === schemeRenameOverlay) closeRenameSchemeDialog();
    });
  }
  if (schemeRenameInput) {
    schemeRenameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") confirmRenameScheme();
    });
  }

  if (schemeDeleteCloseBtn) {
    schemeDeleteCloseBtn.addEventListener("click", closeDeleteSchemeDialog);
  }
  if (schemeDeleteCancelBtn) {
    schemeDeleteCancelBtn.addEventListener("click", closeDeleteSchemeDialog);
  }
  if (schemeDeleteConfirmBtn) {
    schemeDeleteConfirmBtn.addEventListener("click", confirmDeleteScheme);
  }
  if (schemeDeleteOverlay) {
    schemeDeleteOverlay.addEventListener("click", (e) => {
      if (e.target === schemeDeleteOverlay) closeDeleteSchemeDialog();
    });
  }

  if (schemeApplyCloseBtn) {
    schemeApplyCloseBtn.addEventListener("click", closeApplySchemeDialog);
  }
  if (schemeApplyCancelBtn) {
    schemeApplyCancelBtn.addEventListener("click", closeApplySchemeDialog);
  }
  if (schemeApplyConfirmBtn) {
    schemeApplyConfirmBtn.addEventListener("click", confirmApplyScheme);
  }
  if (schemeApplyOverlay) {
    schemeApplyOverlay.addEventListener("click", (e) => {
      if (e.target === schemeApplyOverlay) closeApplySchemeDialog();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (schemeDeleteOverlay && !schemeDeleteOverlay.classList.contains("hidden")) {
      closeDeleteSchemeDialog();
      e.preventDefault();
    } else if (schemeRenameOverlay && !schemeRenameOverlay.classList.contains("hidden")) {
      closeRenameSchemeDialog();
      e.preventDefault();
    } else if (schemeSaveOverlay && !schemeSaveOverlay.classList.contains("hidden")) {
      closeSaveSchemeDialog();
      e.preventDefault();
    } else if (schemeApplyOverlay && !schemeApplyOverlay.classList.contains("hidden")) {
      closeApplySchemeDialog();
      e.preventDefault();
    } else if (schemeOverlay && !schemeOverlay.classList.contains("hidden")) {
      closeSchemeManager();
      e.preventDefault();
    }
  });
}

const replayRecorder = {
  recording: false,
  frames: [],
  levelId: null,
  resultData: null
};

function deepCloneStateForReplay(s) {
  const shelfStatsClone = {};
  if (s.sessionShelfStats) {
    Object.keys(s.sessionShelfStats).forEach(k => {
      shelfStatsClone[k] = { ...s.sessionShelfStats[k] };
    });
  }
  const shelfMissClone = {};
  if (s.sessionShelfMissCount) {
    Object.keys(s.sessionShelfMissCount).forEach(k => {
      shelfMissClone[k] = s.sessionShelfMissCount[k];
    });
  }
  return {
    minute: s.minute,
    energy: s.energy,
    sales: s.sales,
    misses: s.misses,
    player: { x: s.player.x, y: s.player.y },
    carry: [...s.carry],
    shelves: s.shelves.map(sh => ({
      id: sh.id, x: sh.x, y: sh.y, good: sh.good,
      stock: sh.stock, max: sh.max, _broken: sh._broken,
      _partialAccess: sh._partialAccess
    })),
    log: [...s.log],
    salesCount: { ...s.salesCount },
    sessionSalesCount: { ...s.sessionSalesCount },
    sessionMissCount: { ...s.sessionMissCount },
    sessionShelfStats: shelfStatsClone,
    sessionShelfMissCount: shelfMissClone,
    goals: s.goals.map(g => ({
      ...g
    })),
    customers: {
      incoming: s.customers.incoming.map(c => ({ ...c })),
      waiting: s.customers.waiting.map(c => ({ ...c })),
      nextId: s.customers.nextId,
      servedCount: s.customers.servedCount,
      missedCount: s.customers.missedCount
    },
    events: {
      active: s.events.active.map(e => ({ ...e })),
      history: s.events.history.map(h => ({ ...h })),
      lastTriggeredTick: s.events.lastTriggeredTick,
      warning: s.events.warning ? { ...s.events.warning } : null
    },
    warehouseBlocked: s.warehouseBlocked,
    running: s.running
  };
}

function replayRecordFrame(frameType) {
  if (!replayRecorder.recording) return;
  const snapshot = deepCloneStateForReplay(state);
  snapshot.frameType = frameType || 'tick';
  snapshot.timestamp = Date.now();
  replayRecorder.frames.push(snapshot);
}

function replayStartRecording() {
  replayRecorder.recording = true;
  replayRecorder.frames = [];
  replayRecorder.levelId = currentLevelId;
  replayRecorder.resultData = null;
  replayRecordFrame('start');
}

function replayStopRecording(resultData) {
  replayRecorder.recording = false;
  replayRecorder.resultData = resultData || null;
  const replayData = {
    levelId: replayRecorder.levelId,
    frames: replayRecorder.frames,
    resultData: replayRecorder.resultData,
    savedAt: Date.now()
  };
  try {
    localStorage.setItem("lastNightReplay", JSON.stringify(replayData));
  } catch (e) {
    console.warn("回放数据过大，无法保存到 localStorage", e);
  }
}

function replayHasSaved() {
  return !!localStorage.getItem("lastNightReplay");
}

function replayLoadSaved() {
  const raw = localStorage.getItem("lastNightReplay");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

const replayPlayer = {
  active: false,
  data: null,
  currentFrameIndex: 0,
  playing: false,
  speed: 1,
  timer: null,
  savedRealState: null,
  savedResultHtml: null,
  savedResultVisible: false,
  savedLevelId: null
};

function formatReplayTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function replayApplyFrame(index) {
  if (!replayPlayer.data || !replayPlayer.data.frames) return;
  const frame = replayPlayer.data.frames[index];
  if (!frame) return;

  replayPlayer.currentFrameIndex = index;

  state.minute = frame.minute;
  state.energy = frame.energy;
  state.sales = frame.sales;
  state.misses = frame.misses;
  state.player = { x: frame.player.x, y: frame.player.y };
  state.carry = [...frame.carry];
  state.shelves = frame.shelves.map(sh => ({ ...sh }));
  state.log = [...frame.log];
  state.salesCount = { ...frame.salesCount };
  state.sessionSalesCount = { ...frame.sessionSalesCount };
  state.sessionMissCount = { ...frame.sessionMissCount };
  state.sessionShelfStats = {};
  if (frame.sessionShelfStats) {
    Object.keys(frame.sessionShelfStats).forEach(k => {
      state.sessionShelfStats[k] = { ...frame.sessionShelfStats[k] };
    });
  }
  state.sessionShelfMissCount = {};
  if (frame.sessionShelfMissCount) {
    Object.keys(frame.sessionShelfMissCount).forEach(k => {
      state.sessionShelfMissCount[k] = frame.sessionShelfMissCount[k];
    });
  }
  state.goals = frame.goals.map(g => ({ ...g }));
  state.customers = {
    incoming: frame.customers.incoming.map(c => ({ ...c })),
    waiting: frame.customers.waiting.map(c => ({ ...c })),
    nextId: frame.customers.nextId,
    servedCount: frame.customers.servedCount,
    missedCount: frame.customers.missedCount
  };
  state.events = {
    active: frame.events.active.map(e => ({ ...e })),
    history: frame.events.history.map(h => ({ ...h })),
    lastTriggeredTick: frame.events.lastTriggeredTick,
    warning: frame.events.warning ? { ...frame.events.warning } : null
  };
  state.warehouseBlocked = frame.warehouseBlocked;
  state.running = frame.running;

  resetAllEventEffects(true);
  if (warningBanner) warningBanner.classList.add("hidden");
  if (responsePanel) responsePanel.classList.add("hidden");

  if (state.events.warning) {
    const wTemplate = eventTemplates[state.events.warning.templateId];
    if (wTemplate) {
      showWarningBanner(wTemplate);
      showResponsePanel(wTemplate);
      if (state.events.warning.selectedResponse) {
        const options = responseOptions.querySelectorAll('.response-option');
        const idx = (wTemplate.responses || []).findIndex(r => r.id === state.events.warning.selectedResponse);
        if (idx >= 0 && options[idx]) {
          options[idx].classList.add('selected');
        }
      }
    }
  }

  frame.events.active.forEach(event => {
    const template = eventTemplates[event.templateId];
    if (template) {
      applyEventVisualEffects(template, true, event.effect);
    }
  });

  render();

  const totalSeconds = replayPlayer.data.frames.length > 0
    ? replayPlayer.data.frames[replayPlayer.data.frames.length - 1].minute
    : 0;
  replayTimeLabel.textContent = formatReplayTime(frame.minute);
  replayTimeTotal.textContent = formatReplayTime(totalSeconds);
  replaySlider.max = Math.max(0, replayPlayer.data.frames.length - 1);
  replaySlider.value = index;
}

function replayNextFrame() {
  if (!replayPlayer.playing) return;
  const nextIdx = replayPlayer.currentFrameIndex + replayPlayer.speed;
  if (nextIdx >= replayPlayer.data.frames.length - 1) {
    replayApplyFrame(replayPlayer.data.frames.length - 1);
    replayPausePlayback();
    if (replayPlayer.data.resultData) {
      const rd = replayPlayer.data.resultData;
      resultEl.innerHTML = typeof rd === 'string' ? rd : (rd.html || '');
      resultEl.classList.remove("hidden");
      bindResultButtonsForReplay();
    }
    return;
  }
  replayApplyFrame(Math.min(nextIdx, replayPlayer.data.frames.length - 1));
}

function injectReportButtonToResult() {
  const existingBtn = document.getElementById("resultReportBtn");
  if (existingBtn) return;

  const buttonContainer = resultEl.querySelector("div[style*='display: flex']");
  if (!buttonContainer) return;

  const reportBtn = document.createElement("button");
  reportBtn.id = "resultReportBtn";
  reportBtn.className = "primary";
  reportBtn.type = "button";
  reportBtn.style.margin = "0";
  reportBtn.style.flex = "1";
  reportBtn.textContent = "📰 夜班日报";
  reportBtn.addEventListener("click", () => {
    openNightReportFromReplay();
  });

  buttonContainer.insertBefore(reportBtn, buttonContainer.firstChild);
}

function bindResultButtonsForReplay() {
  injectReportButtonToResult();

  const resultReportBtn = document.getElementById("resultReportBtn");
  if (resultReportBtn) {
    resultReportBtn.addEventListener("click", () => {
      openNightReportFromReplay();
    });
  }
  const resultReplayBtn = document.getElementById("resultReplayBtn");
  if (resultReplayBtn) {
    resultReplayBtn.addEventListener("click", () => {
      if (replayHasSaved()) {
        replayEnterMode();
      }
    });
  }
  const resultRestartBtn = document.getElementById("resultRestartBtn");
  if (resultRestartBtn) {
    resultRestartBtn.addEventListener("click", () => {
      resetGame();
    });
  }
}

function replayStartPlayback() {
  if (!replayPlayer.data) return;
  replayPlayer.playing = true;
  replayPlayBtn.classList.add("hidden");
  replayPauseBtn.classList.remove("hidden");
  if (replayPlayer.timer) clearInterval(replayPlayer.timer);
  const interval = Math.max(80, getCurrentLevel().tickInterval / replayPlayer.speed);
  replayPlayer.timer = setInterval(replayNextFrame, interval);
}

function replayPausePlayback() {
  replayPlayer.playing = false;
  replayPlayBtn.classList.remove("hidden");
  replayPauseBtn.classList.add("hidden");
  if (replayPlayer.timer) {
    clearInterval(replayPlayer.timer);
    replayPlayer.timer = null;
  }
}

function replayToggleSpeed() {
  const speeds = [1, 2, 4];
  const currentIdx = speeds.indexOf(replayPlayer.speed);
  const nextIdx = (currentIdx + 1) % speeds.length;
  replayPlayer.speed = speeds[nextIdx];
  replaySpeedBtn.textContent = `⏩ ${replayPlayer.speed}x`;
  if (replayPlayer.playing) {
    replayPausePlayback();
    replayStartPlayback();
  }
}

function replaySeekTo(frameIndex) {
  if (!replayPlayer.data) return;
  const idx = Math.max(0, Math.min(frameIndex, replayPlayer.data.frames.length - 1));
  replayApplyFrame(idx);
  resultEl.classList.add("hidden");
}

function replayEnterMode() {
  const replayData = replayLoadSaved();
  if (!replayData) {
    addLog("没有找到上一局回放录像。");
    return;
  }

  replayPlayer.savedLevelId = currentLevelId;
  if (replayData.levelId) {
    currentLevelId = replayData.levelId;
  }

  replayPlayer.savedRealState = deepCloneStateForReplay(state);
  replayPlayer.savedResultHtml = resultEl.innerHTML;
  replayPlayer.savedResultVisible = !resultEl.classList.contains("hidden");

  replayPlayer.active = true;
  replayPlayer.data = replayData;
  replayPlayer.currentFrameIndex = 0;
  replayPlayer.playing = false;
  replayPlayer.speed = 1;
  replaySpeedBtn.textContent = "⏩ 1x";

  replayBanner.classList.remove("hidden");
  boardEl.classList.add("replay-mode");
  resultEl.classList.add("hidden");
  normalControls.classList.add("hidden");

  replayApplyFrame(0);
  addLog("🎬 进入回放模式，可播放、暂停、加速或拖动进度条。");
}

function replayExitMode() {
  if (!replayPlayer.active) return;

  replayPausePlayback();

  if (replayPlayer.savedRealState) {
    const saved = replayPlayer.savedRealState;
    state.minute = saved.minute;
    state.energy = saved.energy;
    state.sales = saved.sales;
    state.misses = saved.misses;
    state.player = { x: saved.player.x, y: saved.player.y };
    state.carry = [...saved.carry];
    state.shelves = saved.shelves.map(sh => ({ ...sh }));
    state.log = [...saved.log];
    state.salesCount = { ...saved.salesCount };
    state.sessionSalesCount = { ...saved.sessionSalesCount };
    state.sessionMissCount = { ...saved.sessionMissCount };
    state.sessionShelfStats = {};
    if (saved.sessionShelfStats) {
      Object.keys(saved.sessionShelfStats).forEach(k => {
        state.sessionShelfStats[k] = { ...saved.sessionShelfStats[k] };
      });
    }
    state.sessionShelfMissCount = {};
    if (saved.sessionShelfMissCount) {
      Object.keys(saved.sessionShelfMissCount).forEach(k => {
        state.sessionShelfMissCount[k] = saved.sessionShelfMissCount[k];
      });
    }
    state.goals = saved.goals.map(g => ({ ...g }));
    state.customers = {
      incoming: saved.customers.incoming.map(c => ({ ...c })),
      waiting: saved.customers.waiting.map(c => ({ ...c })),
      nextId: saved.customers.nextId,
      servedCount: saved.customers.servedCount,
      missedCount: saved.customers.missedCount
    };
    state.events = {
      active: saved.events.active.map(e => ({ ...e })),
      history: saved.events.history.map(h => ({ ...h })),
      lastTriggeredTick: saved.events.lastTriggeredTick,
      warning: saved.events.warning ? { ...saved.events.warning } : null
    };
    state.warehouseBlocked = saved.warehouseBlocked;
    state.running = saved.running;
  }

  resetAllEventEffects(true);
  if (warningBanner) warningBanner.classList.add("hidden");
  if (responsePanel) responsePanel.classList.add("hidden");
  replayPlayer.savedRealState && replayPlayer.savedRealState.events.active.forEach(event => {
    const template = eventTemplates[event.templateId];
    if (template) applyEventVisualEffects(template, true, event.effect);
  });

  if (state.events.warning) {
    const wTemplate = eventTemplates[state.events.warning.templateId];
    if (wTemplate) {
      showWarningBanner(wTemplate);
      showResponsePanel(wTemplate);
      if (state.events.warning.selectedResponse) {
        const options = responseOptions.querySelectorAll('.response-option');
        const idx = (wTemplate.responses || []).findIndex(r => r.id === state.events.warning.selectedResponse);
        if (idx >= 0 && options[idx]) {
          options[idx].classList.add('selected');
        }
      }
    }
  }

  if (replayPlayer.savedResultHtml) {
    resultEl.innerHTML = replayPlayer.savedResultHtml;
    bindResultButtonsForReplay();
  }
  if (replayPlayer.savedResultVisible) {
    resultEl.classList.remove("hidden");
  } else {
    resultEl.classList.add("hidden");
  }

  if (replayPlayer.savedLevelId !== null) {
    currentLevelId = replayPlayer.savedLevelId;
  }

  replayPlayer.active = false;
  replayPlayer.data = null;
  replayPlayer.savedRealState = null;
  replayPlayer.savedResultHtml = null;
  replayPlayer.savedLevelId = null;

  replayBanner.classList.add("hidden");
  boardEl.classList.remove("replay-mode");
  normalControls.classList.remove("hidden");
  updateEditorUI();
  render();
  addLog("已退出回放模式，回到当前状态。");
}

function bindReplayControls() {
  if (replayPlayBtn) {
    replayPlayBtn.addEventListener("click", () => {
      if (replayPlayer.currentFrameIndex >= replayPlayer.data.frames.length - 1) {
        replayApplyFrame(0);
        resultEl.classList.add("hidden");
      }
      replayStartPlayback();
    });
  }
  if (replayPauseBtn) {
    replayPauseBtn.addEventListener("click", replayPausePlayback);
  }
  if (replaySpeedBtn) {
    replaySpeedBtn.addEventListener("click", replayToggleSpeed);
  }
  if (replayExitBtn) {
    replayExitBtn.addEventListener("click", replayExitMode);
  }
  if (replaySlider) {
    let isDragging = false;
    replaySlider.addEventListener("mousedown", () => { isDragging = true; replayPausePlayback(); });
    replaySlider.addEventListener("touchstart", () => { isDragging = true; replayPausePlayback(); });
    replaySlider.addEventListener("input", (e) => {
      if (isDragging) {
        replaySeekTo(parseInt(e.target.value, 10));
      }
    });
    replaySlider.addEventListener("change", (e) => {
      isDragging = false;
      replaySeekTo(parseInt(e.target.value, 10));
    });
    replaySlider.addEventListener("mouseup", () => { isDragging = false; });
    replaySlider.addEventListener("touchend", () => { isDragging = false; });
  }
  if (replayBtn) {
    replayBtn.addEventListener("click", () => {
      if (state.running) {
        addLog("游戏进行中无法查看回放，请先结束或重新开始。");
        return;
      }
      if (!replayHasSaved()) {
        addLog("还没有可回放的录像，先完成一局夜班吧！");
        return;
      }
      replayEnterMode();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (!replayPlayer.active) return;
    if (e.key === "Escape") {
      e.preventDefault();
      replayExitMode();
    } else if (e.key === " ") {
      e.preventDefault();
      if (replayPlayer.playing) replayPausePlayback();
      else replayStartPlayback();
    }
  });
}

function updateReplayButtonState() {
  if (replayBtn) {
    replayBtn.disabled = !replayHasSaved();
  }
}

function addEditorLog(text, type = "info") {
  editor.logs.push({ text, type, time: Date.now() });
  editor.logs = editor.logs.slice(-20);
  renderEditorLog();
}

function renderEditorLog() {
  if (!editorLog) return;
  editorLog.innerHTML = "";
  editor.logs.forEach(entry => {
    const p = document.createElement("p");
    p.className = `log-${entry.type}`;
    p.textContent = entry.text;
    editorLog.appendChild(p);
  });
}

function getEditorShelves() {
  return state.shelves;
}

function findShelfById(id) {
  return state.shelves.find(s => s.id === id);
}

function findShelfAt(x, y, excludeId = null) {
  return state.shelves.find(s => s.x === x && s.y === y && s.id !== excludeId);
}

function isReservedPosition(x, y) {
  const level = getCurrentLevel();
  if (x === level.warehousePos.x && y === level.warehousePos.y) return { blocked: true, reason: "仓库" };
  if (x === level.checkoutPos.x && y === level.checkoutPos.y) return { blocked: true, reason: "收银台" };
  return { blocked: false };
}

function canPlaceShelfAt(x, y, shelfId) {
  const level = getCurrentLevel();
  if (x < 0 || x >= level.mapCols || y < 0 || y >= level.mapRows) {
    return { ok: false, reason: "超出地图范围" };
  }
  const reserved = isReservedPosition(x, y);
  if (reserved.blocked) {
    return { ok: false, reason: `不能覆盖${reserved.reason}` };
  }
  const occupant = findShelfAt(x, y, shelfId);
  if (occupant) {
    return { ok: false, reason: `该位置已有${occupant.id}货架` };
  }
  return { ok: true };
}

function enterEditMode() {
  if (state.running) {
    addLog("游戏进行中无法编辑布局，请先结束或重新开始。");
    return;
  }
  editor.active = true;
  editor.selectedShelfId = null;
  editor.originalShelves = state.shelves.map(s => ({ ...s }));
  editor.logs = [];
  addEditorLog("进入布局编辑模式，原始布局已备份。", "info");
  addEditorLog("提示：点击货架选中，再点击空格移动。", "info");
  updateEditorUI();
  render();
}

function exitEditMode(restoreOriginal) {
  if (restoreOriginal) {
    state.shelves = editor.originalShelves.map(s => ({ ...s }));
    addEditorLog("已取消编辑，恢复原始布局。", "info");
  }
  editor.active = false;
  editor.selectedShelfId = null;
  updateEditorUI();
  render();
}

function selectShelf(shelfId) {
  if (!editor.active) return;
  if (editor.selectedShelfId === shelfId) {
    editor.selectedShelfId = null;
    addEditorLog("取消选中货架。", "info");
  } else {
    editor.selectedShelfId = shelfId;
    const shelf = findShelfById(shelfId);
    if (shelf) {
      addEditorLog(`已选中${shelf.id}货架（${goods[shelf.good].name}），点击空格移动。`, "success");
    }
  }
  updateEditorUI();
  render();
}

function tryMoveSelectedShelfTo(x, y) {
  if (!editor.active || !editor.selectedShelfId) return;
  const shelf = findShelfById(editor.selectedShelfId);
  if (!shelf) return;
  if (shelf.x === x && shelf.y === y) {
    editor.selectedShelfId = null;
    addEditorLog("位置未变，取消选中。", "info");
    updateEditorUI();
    render();
    return;
  }
  const check = canPlaceShelfAt(x, y, shelf.id);
  if (!check.ok) {
    addEditorLog(`无法移动：${check.reason}！`, "error");
    return;
  }
  const oldX = shelf.x;
  const oldY = shelf.y;
  shelf.x = x;
  shelf.y = y;
  addEditorLog(`${shelf.id}货架已从(${oldX},${oldY})移至(${x},${y})。`, "success");
  editor.selectedShelfId = null;
  updateEditorUI();
  render();
}

function handleEditorTileClick(x, y) {
  if (!editor.active) return;
  const reserved = isReservedPosition(x, y);
  if (reserved.blocked) {
    addEditorLog(`${reserved.reason}位置不可放置货架。`, "error");
    return;
  }
  const clickedShelf = findShelfAt(x, y);
  if (clickedShelf) {
    selectShelf(clickedShelf.id);
  } else if (editor.selectedShelfId) {
    tryMoveSelectedShelfTo(x, y);
  }
}

function changeSelectedShelfGood(goodKey) {
  if (!editor.active || !editor.selectedShelfId) return;
  const shelf = findShelfById(editor.selectedShelfId);
  if (!shelf) return;
  if (shelf.good === goodKey) return;
  const oldGood = goods[shelf.good];
  const newGood = goods[goodKey];
  shelf.good = goodKey;
  addEditorLog(`${shelf.id}货架商品已从${oldGood.name}切换为${newGood.name}。`, "success");
  updateEditorUI();
  render();
}

function saveLayoutAndExit() {
  if (!editor.active) return;
  const changed = state.shelves.some((s, i) => {
    const o = editor.originalShelves[i];
    return s.x !== o.x || s.y !== o.y || s.good !== o.good;
  });
  if (changed) {
    addEditorLog("✅ 布局已保存，将用于本局游戏！", "success");
    addLog("🛠️ 货架布局已调整并保存。");
  } else {
    addEditorLog("布局未修改，保持原状。", "info");
  }
  exitEditMode(false);
}

function cancelEdit() {
  if (!editor.active) return;
  exitEditMode(true);
}

function updateEditorUI() {
  if (!editorBanner || !editorPanel || !normalControls) return;
  if (editor.active) {
    editorBanner.classList.remove("hidden");
    editorPanel.classList.remove("hidden");
    normalControls.classList.add("hidden");
    boardEl.classList.add("editor-mode");
  } else {
    editorBanner.classList.add("hidden");
    editorPanel.classList.add("hidden");
    normalControls.classList.remove("hidden");
    boardEl.classList.remove("editor-mode");
  }
  renderEditorSelectedInfo();
  renderEditorGoodPicker();
  renderEditorLog();
  updateEditorCurrentSchemeDisplay();
}

function renderEditorSelectedInfo() {
  if (!editorSelectedInfo) return;
  if (!editor.selectedShelfId) {
    editorSelectedInfo.innerHTML = `<p class="editor-info-empty">未选中货架<br><span style="font-size:11px;color:#6b7a6e;">点击地图上的货架开始编辑</span></p>`;
    return;
  }
  const shelf = findShelfById(editor.selectedShelfId);
  if (!shelf) {
    editorSelectedInfo.innerHTML = `<p class="editor-info-empty">未选中货架</p>`;
    return;
  }
  const good = goods[shelf.good];
  editorSelectedInfo.innerHTML = `
    <div class="editor-shelf-detail">
      <div class="editor-shelf-icon">${good.icon}</div>
      <div class="editor-shelf-meta">
        <span class="editor-shelf-id">${shelf.id} 货架</span>
        <span class="editor-shelf-pos">位置: (${shelf.x}, ${shelf.y})</span>
        <span class="editor-shelf-good">商品: ${good.name} ¥${good.price}</span>
      </div>
    </div>
  `;
}

function renderEditorGoodPicker() {
  if (!editorGoodPicker || !editorGoodButtons) return;
  if (!editor.selectedShelfId) {
    editorGoodPicker.classList.add("hidden");
    return;
  }
  const shelf = findShelfById(editor.selectedShelfId);
  if (!shelf) {
    editorGoodPicker.classList.add("hidden");
    return;
  }
  editorGoodPicker.classList.remove("hidden");
  const goodKeys = getCurrentLevelGoodKeys();
  editorGoodButtons.innerHTML = "";
  goodKeys.forEach(key => {
    const good = goods[key];
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `editor-good-btn ${shelf.good === key ? "active" : ""}`;
    btn.innerHTML = `
      <span class="editor-good-btn-icon">${good.icon}</span>
      <span class="editor-good-btn-name">${good.name}</span>
    `;
    btn.addEventListener("click", () => changeSelectedShelfGood(key));
    editorGoodButtons.appendChild(btn);
  });
}

function bindEditorControls() {
  if (editLayoutBtn) {
    editLayoutBtn.addEventListener("click", () => {
      if (state.running) {
        addLog("游戏进行中无法编辑布局，请先结束或重新开始。");
        return;
      }
      enterEditMode();
    });
  }
  if (saveLayoutBtn) {
    saveLayoutBtn.addEventListener("click", saveLayoutAndExit);
  }
  if (cancelEditBtn) {
    cancelEditBtn.addEventListener("click", cancelEdit);
  }
  document.addEventListener("keydown", (e) => {
    if (editor.active && e.key === "Escape") {
      e.preventDefault();
      cancelEdit();
    }
  });
}

const tutorial = {
  active: false,
  currentStep: 0,
  waitingForAction: false,
  targetGood: "snack",
  targetShelfId: "A"
};

const tutorialSteps = [
  {
    title: "第一步：开始营业",
    content: "点击右下角的「开始营业」按钮，开启今晚的便利店夜班！",
    target: () => startBtn,
    position: "bottom",
    autoNext: false,
    action: "startGame"
  },
  {
    title: "第二步：移动",
    content: "使用方向键（或 WASD）移动到左下角的「仓库」位置（0, 5）。也可以点击屏幕上的方向按钮。",
    target: () => {
      const tile = document.querySelector('.warehouse');
      return tile;
    },
    position: "right",
    autoNext: false,
    action: "moveToWarehouse"
  },
  {
    title: "第三步：从仓库拿货",
    content: "你现在在仓库位置。点击左侧「拿饭团」按钮，从仓库取出一箱饭团。",
    target: () => {
      const buttons = crateButtonsEl.querySelectorAll('button');
      return buttons[0];
    },
    position: "right",
    autoNext: false,
    action: "pickupGoods"
  },
  {
    title: "第四步：给正确货架补货",
    content: "移动到 A 货架（饭团货架）的位置，然后点击「互动」按钮进行补货。注意：只有拿对货物才能补货成功！",
    target: () => {
      const tiles = document.querySelectorAll('.tile');
      for (const tile of tiles) {
        if (tile.textContent.includes('A 饭团')) {
          return tile;
        }
      }
      return null;
    },
    position: "top",
    autoNext: false,
    action: "restockShelf"
  },
  {
    title: "第五步：查看结算",
    content: "夜班即将结束！营业时间到后会出现结算面板，展示你的销售额、缺货次数、剩余体力和最终评分。等待结算出现后，教学即自动完成。",
    target: () => document.querySelector('.board-wrap'),
    position: "top",
    autoNext: false,
    action: "finish",
    onStart: () => {
      state.minute = 115;
      if (!timer) {
        timer = setInterval(tick, getCurrentLevel().tickInterval);
      }
      render();
    }
  }
];

const TRAINING_THEMES = {
  queue: {
    id: "queue",
    name: "顾客排队演练",
    icon: "👥",
    difficulty: "beginner",
    difficultyLabel: "入门",
    shortDesc: "在高密度客流下练习快速响应和排队管理。",
    description: "本训练模拟一个客流高峰期，顾客将以更快的速度、更密集的频率涌入店内。你的目标是保持高服务率，避免顾客因排队等待过久而流失。",
    objectives: [
      "学习在高压力下快速规划补货路线",
      "练习优先处理最紧急的顾客需求",
      "掌握库存不足时的快速应对策略"
    ],
    tips: [
      { title: "紧盯压力指示器", content: "右上角的压力等级会随等待人数升高，注意在达到「紧张」前处理完队列。" },
      { title: "先补热门货架", content: "优先为顾客最多的商品货架补货，一次补满可服务多位顾客。" }
    ],
    config: {
      customerBaseGap: 1,
      customerRandomRange: 1,
      customerWaitMin: 2,
      customerWaitMax: 4,
      maxWaitingMultiplier: 1.2,
      durationMultiplier: 0.8
    }
  },
  event: {
    id: "event",
    name: "突发事件应对",
    icon: "⚡",
    difficulty: "intermediate",
    difficultyLabel: "进阶",
    shortDesc: "在各种经营事件频发的环境中练习临机应变。",
    description: "本训练将在短时间内连续触发多种随机经营事件（货架故障、仓库断货、需求暴涨、体力消耗加倍等）。你的目标是在混乱中保持销售额，减少缺货损失。",
    objectives: [
      "熟悉各类突发事件的应对方式",
      "练习在事件影响下调整补货优先级",
      "提高在多重压力下的决策速度"
    ],
    tips: [
      { title: "关注事件横幅", content: "顶部横幅会显示当前活跃事件，仔细阅读事件类型和影响。" },
      { title: "提前备货", content: "在货架故障/仓库缺货前，提前给其他货架补满货物作为缓冲。" }
    ],
    config: {
      eventMinStartTick: 1,
      eventMinGap: 2,
      eventMaxActive: 3,
      eventBaseChance: 0.55,
      eventLateBoost: 0.2,
      durationMultiplier: 0.9,
      customerBaseGap: 2
    }
  },
  scheduling: {
    id: "scheduling",
    name: "排班预测练习",
    icon: "📊",
    difficulty: "intermediate",
    difficultyLabel: "进阶",
    shortDesc: "结合风险预览，练习根据排班预测提前准备。",
    description: "本训练在开始前会展示完整的客流预测曲线和商品需求预览。你需要根据预览提前规划备货策略，然后在实际营业中验证预判的准确性。目标是让实际销量与预测尽可能匹配。",
    objectives: [
      "学习解读排班预览和需求曲线",
      "练习根据预测合理分配补货精力",
      "提高对高峰时段的提前备货意识"
    ],
    tips: [
      { title: "关注高需求时段", content: "在曲线高峰到来前，提前给对应商品货架补满库存。" },
      { title: "高峰值 = 高风险", content: "5-6级的高峰意味着顾客将大量涌入，务必提前备好热门商品。" }
    ],
    config: {
      showPreview: true,
      forceStrategy: "peakFocused",
      durationMultiplier: 1.0
    }
  },
  dualCarry: {
    id: "dualCarry",
    name: "双手搬运训练",
    icon: "💪",
    difficulty: "advanced",
    difficultyLabel: "困难",
    shortDesc: "强制启用双手搬运，练习高效的多物品运输路线。",
    description: "本训练强制启用店长级「双手搬运」能力（即使你尚未解锁也可使用），一次可以携带两种不同货物。你的目标是尽量减少往返仓库的次数，最大化补货效率。",
    objectives: [
      "掌握双手搬运的操作流程（一次取两种货物）",
      "规划最优路线减少仓库来回次数",
      "练习正确匹配货物与货架的补货顺序"
    ],
    tips: [
      { title: "合理搭配货物", content: "一次拿相邻区域的两种货架货物，减少走动距离。" },
      { title: "注意手部容量", content: "双手模式最多带2箱，合理规划每次运输的货物组合。" }
    ],
    config: {
      forceDualCarry: true,
      customerBaseGap: 2,
      customerRandomRange: 2,
      durationMultiplier: 1.0
    }
  }
};

const training = {
  active: false,
  themeId: null,
  levelId: null,
  originalLevelId: null,
  selectedThemeId: null,
  snapshot: null
};

function freshState(trainingMode = false) {
  let savedSalesCount, salesCount, savedMissCount, missCount, savedMaxSession, maxSession;
  let savedShelfStats, shelfStats, savedLastSession, lastSession;

  if (trainingMode) {
    savedSalesCount = null; salesCount = {};
    savedMissCount = null; missCount = {};
    savedMaxSession = null; maxSession = {};
    savedShelfStats = null; shelfStats = {};
    savedLastSession = null; lastSession = {};
  } else {
    savedSalesCount = localStorage.getItem("codexSalesCount");
    salesCount = savedSalesCount ? JSON.parse(savedSalesCount) : {};
    savedMissCount = localStorage.getItem("codexMissCount");
    missCount = savedMissCount ? JSON.parse(savedMissCount) : {};
    savedMaxSession = localStorage.getItem("codexMaxSession");
    maxSession = savedMaxSession ? JSON.parse(savedMaxSession) : {};
    savedShelfStats = localStorage.getItem("codexShelfStats");
    shelfStats = savedShelfStats ? JSON.parse(savedShelfStats) : {};
    savedLastSession = localStorage.getItem("codexLastSession");
    lastSession = savedLastSession ? JSON.parse(savedLastSession) : {};
  }
  const level = getCurrentLevel();

  const goodKeys = getCurrentLevelGoodKeys();
  const initGoodObj = (defaults, fallback) => {
    const obj = {};
    goodKeys.forEach(k => { obj[k] = (defaults && defaults[k]) || fallback; });
    return obj;
  };

  const initShelfStats = (defaults) => {
    const obj = {};
    goodKeys.forEach(k => { obj[k] = (defaults && defaults[k]) ? { ...defaults[k] } : {}; });
    return obj;
  };

  const initLastSession = (defaults) => {
    const obj = {};
    goodKeys.forEach(k => { obj[k] = (defaults && defaults[k]) ? { ...defaults[k] } : null; });
    return obj;
  };

  return {
    running: false,
    minute: 0,
    energy: 100 + getMaxEnergyBonus(),
    maxEnergy: 100 + getMaxEnergyBonus(),
    sales: 0,
    misses: 0,
    player: { ...level.playerStart },
    carry: [],
    selected: getCurrentLevelGoodKeys()[0],
    shelves: level.shelves.map((shelf) => ({ ...shelf, _broken: false })),
    log: ["卷帘门半开，夜班还没开始。"],
    salesCount: initGoodObj(salesCount, 0),
    sessionSalesCount: initGoodObj(null, 0),
    missCount: initGoodObj(missCount, 0),
    sessionMissCount: initGoodObj(null, 0),
    sessionShelfMissCount: {},
    maxSessionSales: initGoodObj(maxSession, 0),
    shelfStats: initShelfStats(shelfStats),
    sessionShelfStats: initShelfStats(null),
    lastSession: initLastSession(lastSession),
    goals: [],
    customers: {
      incoming: [],
      waiting: [],
      nextId: 1,
      servedCount: 0,
      missedCount: 0
    },
    events: {
      active: [],
      history: [],
      lastTriggeredTick: null,
      warning: null
    },
    warehouseBlocked: false,
    emergencySupplyUsed: 0,
    _isTraining: trainingMode,
    _forecastCache: null
  };
}

function generateNightGoals() {
  const shuffled = [...goalTemplates].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 3);
  return selected.map(template => {
    const goal = template.generate();
    goal.templateType = template.type;
    goal.completed = false;
    goal.failed = false;
    return goal;
  });
}

function getGoalTemplate(type) {
  return goalTemplates.find(t => t.type === type);
}

function updateGoalProgress() {
  if (!state.goals || state.goals.length === 0) return;

  state.goals.forEach(goal => {
    if (goal.completed || goal.failed) return;

    const template = getGoalTemplate(goal.templateType);
    if (!template) return;

    if (goal.endOnly) return;

    const progress = template.getProgress(state, goal);

    if (goal.failOnBreak) {
      if (progress < goal.target) {
        goal.failed = true;
        goal.broken = true;
        addLog(`❌ 目标失败：${goal.title}`);
      }
      return;
    }

    if (goal.inverse) {
      if (progress > goal.target) {
        goal.failed = true;
        addLog(`❌ 目标失败：${goal.title}`);
      }
    } else {
      if (progress >= goal.target) {
        goal.completed = true;
        addLog(`✅ 目标达成：${goal.title}（+${goal.reward}分）`);
      }
    }
  });
}

function evaluateEndGoals() {
  if (!state.goals || state.goals.length === 0) return;

  state.goals.forEach(goal => {
    if (goal.completed || goal.failed) return;

    const template = getGoalTemplate(goal.templateType);
    if (!template) return;

    const progress = template.getProgress(state, goal);

    if (goal.failOnBreak || goal.inverse) {
      goal.completed = true;
      addLog(`✅ 目标达成：${goal.title}（+${goal.reward}分）`);
    } else {
      if (progress >= goal.target) {
        goal.completed = true;
        addLog(`✅ 目标达成：${goal.title}（+${goal.reward}分）`);
      } else {
        goal.failed = true;
      }
    }
  });
}

function calcGoalsBonus() {
  if (!state.goals || state.goals.length === 0) return 0;
  return state.goals
    .filter(g => g.completed)
    .reduce((sum, g) => sum + g.reward, 0);
}

function getCompatShelves(goodKey) {
  return getCurrentLevel().shelves
    .filter((s) => s.good === goodKey)
    .map((s) => s.id)
    .join("、");
}

function getUnlockedTexts(goodKey, count) {
  const good = goods[goodKey];
  return good.unlockTexts.filter((t) => count >= t.threshold);
}

function getNextUnlock(goodKey, count) {
  const good = goods[goodKey];
  return good.unlockTexts.find((t) => count < t.threshold);
}

function updateCodexStats() {
  const goodKeys = Object.keys(goods);
  const today = new Date().toLocaleDateString('zh-CN');

  goodKeys.forEach(key => {
    const sessionSales = state.sessionSalesCount[key] || 0;
    const sessionMisses = state.sessionMissCount[key] || 0;

    state.missCount[key] = (state.missCount[key] || 0) + sessionMisses;

    if (sessionSales > (state.maxSessionSales[key] || 0)) {
      state.maxSessionSales[key] = sessionSales;
    }

    if (state.sessionShelfStats[key]) {
      if (!state.shelfStats[key]) state.shelfStats[key] = {};
      Object.entries(state.sessionShelfStats[key]).forEach(([shelfId, count]) => {
        state.shelfStats[key][shelfId] = (state.shelfStats[key][shelfId] || 0) + count;
      });
    }

    state.lastSession[key] = {
      sales: sessionSales,
      misses: sessionMisses,
      date: today,
      revenue: sessionSales * goods[key].price
    };
  });

  localStorage.setItem("codexSalesCount", JSON.stringify(state.salesCount));
  localStorage.setItem("codexMissCount", JSON.stringify(state.missCount));
  localStorage.setItem("codexMaxSession", JSON.stringify(state.maxSessionSales));
  localStorage.setItem("codexShelfStats", JSON.stringify(state.shelfStats));
  localStorage.setItem("codexLastSession", JSON.stringify(state.lastSession));
}

function getCommonShelves(goodKey, topN = 3) {
  const stats = state.shelfStats[goodKey] || {};
  const entries = Object.entries(stats).sort((a, b) => b[1] - a[1]);
  return entries.slice(0, topN);
}

function isGoodMastered(goodKey) {
  const count = state.salesCount[goodKey] || 0;
  const good = goods[goodKey];
  const maxThreshold = good.unlockTexts[good.unlockTexts.length - 1]?.threshold || 0;
  return count >= maxThreshold;
}

function getGoodStatus(goodKey) {
  const count = state.salesCount[goodKey] || 0;
  if (count < 1) return 'locked';
  if (isGoodMastered(goodKey)) return 'mastered';
  return 'unlocked';
}

function openCodex() {
  codexOverlay.classList.remove("hidden");
  codexState.selectedGood = null;
  renderCodexList();
  renderCodexDetail(null);
}

function closeCodex() {
  codexOverlay.classList.add("hidden");
  codexState.selectedGood = null;
}

function renderCodexList() {
  codexListEl.innerHTML = "";
  Object.entries(goods).forEach(([key, good]) => {
    const count = state.salesCount[key] || 0;
    const status = getGoodStatus(key);
    const item = document.createElement("div");
    item.className = `codex-list-item ${codexState.selectedGood === key ? "active" : ""}`;
    if (status === 'locked') {
      item.classList.add("locked");
    } else if (status === 'mastered') {
      item.classList.add("mastered");
    }
    const statusLabel = status === 'locked' ? '未解锁' : status === 'mastered' ? '满成就' : '已解锁';
    item.innerHTML = `
      <div class="codex-item-icon">${status !== 'locked' ? good.icon : "❓"}</div>
      <div class="codex-item-info">
        <strong>${status !== 'locked' ? good.name : "???"}</strong>
        <span>累计售出：${count} · ${statusLabel}</span>
      </div>
    `;
    item.addEventListener("click", () => {
      codexState.selectedGood = key;
      renderCodexList();
      renderCodexDetail(key);
    });
    codexListEl.appendChild(item);
  });
}

function renderCodexDetail(goodKey) {
  if (!goodKey) {
    codexDetailEl.innerHTML = `<p class="codex-empty">选择左侧商品查看经营数据</p>`;
    return;
  }

  const good = goods[goodKey];
  const count = state.salesCount[goodKey] || 0;
  const status = getGoodStatus(goodKey);
  const unlocked = status !== 'locked';
  const mastered = status === 'mastered';
  const unlockedTexts = getUnlockedTexts(goodKey, count);
  const nextUnlock = getNextUnlock(goodKey, count);
  const missCount = state.missCount[goodKey] || 0;
  const maxSession = state.maxSessionSales[goodKey] || 0;
  const commonShelves = getCommonShelves(goodKey, 3);
  const lastSession = state.lastSession[goodKey];
  const compatShelves = getCompatShelves(goodKey);

  const maxThreshold = good.unlockTexts[good.unlockTexts.length - 1]?.threshold || 0;
  const progress = Math.min(100, Math.round((count / maxThreshold) * 100));

  const statusText = status === 'locked' ? '未解锁' : mastered ? '满成就' : '已解锁';

  const masteredBanner = mastered ? `
    <div class="codex-mastered-banner">
      <span class="trophy-icon">🏆</span>恭喜达成满成就！你已经完全掌握了${good.name}的经营之道。
    </div>
  ` : '';

  const statsHtml = `
    <div class="codex-detail-section">
      <h4><span class="section-icon">📊</span>经营统计</h4>
      <div class="codex-stats">
        <div class="codex-stat">
          <span class="codex-stat-label">累计销量</span>
          <span class="codex-stat-value">${count} 件</span>
        </div>
        <div class="codex-stat">
          <span class="codex-stat-label">历史缺货次数</span>
          <span class="codex-stat-value">${missCount} 次</span>
        </div>
        <div class="codex-stat">
          <span class="codex-stat-label">最高单局销量</span>
          <span class="codex-stat-value">${maxSession} 件</span>
        </div>
        <div class="codex-stat">
          <span class="codex-stat-label">售价</span>
          <span class="codex-stat-value">¥${good.price}</span>
        </div>
      </div>
      <div class="codex-progress-bar">
        <div class="codex-progress-fill ${mastered ? 'mastered' : ''}" style="width: ${progress}%"></div>
      </div>
    </div>
  `;

  const lockedStatsHtml = `
    <div class="codex-detail-section">
      <h4><span class="section-icon">📊</span>经营统计</h4>
      <div class="codex-stats">
        <div class="codex-stat">
          <span class="codex-stat-label">累计销量</span>
          <span class="codex-stat-value">--</span>
        </div>
        <div class="codex-stat">
          <span class="codex-stat-label">历史缺货次数</span>
          <span class="codex-stat-value">--</span>
        </div>
        <div class="codex-stat">
          <span class="codex-stat-label">最高单局销量</span>
          <span class="codex-stat-value">--</span>
        </div>
        <div class="codex-stat">
          <span class="codex-stat-label">售价</span>
          <span class="codex-stat-value">¥${good.price}</span>
        </div>
      </div>
      <p class="codex-hint" style="margin-top: 8px;">卖出 1 件即可解锁完整经营数据。</p>
    </div>
  `;

  let shelfHtml = '';
  if (unlocked) {
    const hasCommonData = commonShelves.length > 0;
    shelfHtml = `
      <div class="codex-detail-section">
        <h4><span class="section-icon">🏪</span>常见适配货架</h4>
        ${hasCommonData ? `
          <div class="codex-shelf-list">
            ${commonShelves.map(([shelfId, shelfCount], idx) => `
              <span class="codex-shelf-tag ${idx === 0 ? 'common' : ''}">
                ${shelfId}
                <span class="tag-count">${shelfCount}件</span>
              </span>
            `).join('')}
          </div>
        ` : `
          <p class="codex-hint">暂无历史货架数据，多营业几晚记录数据吧。</p>
        `}
      </div>
    `;
  }

  let performanceHtml = '';
  if (unlocked) {
    if (lastSession) {
      const total = lastSession.sales + lastSession.misses;
      const rate = total > 0 ? Math.round((lastSession.sales / total) * 100) : 100;
      let perfClass = 'good';
      if (rate < 50) perfClass = 'poor';
      else if (rate < 80) perfClass = 'average';

      performanceHtml = `
        <div class="codex-detail-section">
          <h4><span class="section-icon">📈</span>最近一局表现</h4>
          <div class="codex-performance-card ${perfClass}">
            <div class="codex-performance-header">
              <span class="codex-performance-title">${lastSession.date} 夜班</span>
              <span class="codex-performance-date">完成率 ${rate}%</span>
            </div>
            <div class="codex-performance-stats">
              <div class="codex-performance-stat">
                <span class="codex-performance-stat-label">销量</span>
                <span class="codex-performance-stat-value">${lastSession.sales} 件</span>
              </div>
              <div class="codex-performance-stat">
                <span class="codex-performance-stat-label">缺货</span>
                <span class="codex-performance-stat-value">${lastSession.misses} 次</span>
              </div>
              <div class="codex-performance-stat">
                <span class="codex-performance-stat-label">营业额</span>
                <span class="codex-performance-stat-value">¥${lastSession.revenue}</span>
              </div>
              <div class="codex-performance-stat">
                <span class="codex-performance-stat-label">缺货影响</span>
                <span class="codex-performance-stat-value">-${lastSession.misses * good.missPenalty} 分</span>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      performanceHtml = `
        <div class="codex-detail-section">
          <h4><span class="section-icon">📈</span>最近一局表现</h4>
          <p class="codex-hint">暂无最近一局数据，完成一局营业后查看。</p>
        </div>
      `;
    }
  }

  const unlocksHtml = `
    <div class="codex-detail-section">
      <h4><span class="section-icon">📝</span>经营手记</h4>
      ${unlockedTexts.length > 0 ? unlockedTexts.map((t) => `<div class="codex-unlock-item unlocked">✓ ${t.text}</div>`).join("") : ""}
      ${nextUnlock ? `<div class="codex-unlock-item next">还差 ${nextUnlock.threshold - count} 件解锁：${nextUnlock.text}</div>` : `<div class="codex-unlock-item max">已解锁全部手记！</div>`}
    </div>
  `;

  codexDetailEl.innerHTML = `
    <div class="codex-detail-header">
      <div class="codex-detail-icon ${!unlocked ? 'locked' : ''} ${mastered ? 'mastered' : ''}">${unlocked ? good.icon : '❓'}</div>
      <div>
        <h3 class="${!unlocked ? 'locked-text' : ''}">
          ${unlocked ? good.name : '???'}
          <span class="codex-status-badge ${status}">${statusText}</span>
        </h3>
        ${unlocked ? `<p class="codex-desc">${good.desc}</p>` : `<p class="codex-hint">还没卖过这件商品，卖出 1 件即可解锁商品介绍和经营数据。</p>`}
      </div>
    </div>
    ${masteredBanner}
    ${unlocked ? statsHtml : lockedStatsHtml}
    ${shelfHtml}
    ${performanceHtml}
    ${unlocked ? unlocksHtml : ''}
  `;
}

function bindCodexControls() {
  codexBtn.addEventListener("click", openCodex);
  codexCloseBtn.addEventListener("click", closeCodex);
  codexOverlay.addEventListener("click", (e) => {
    if (e.target === codexOverlay) {
      closeCodex();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !codexOverlay.classList.contains("hidden")) {
      closeCodex();
    }
  });
}

function formatTickTime(tick) {
  const totalMinutes = tick * 5;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function generateNightReportFromReplay(replayData) {
  if (!replayData || !replayData.frames || replayData.frames.length === 0) {
    return null;
  }

  const frames = replayData.frames;
  const levelId = replayData.levelId || 1;
  const level = levels.find(l => l.id === levelId) || levels[0];
  const resultInfo = replayData.resultData && typeof replayData.resultData === 'object' ? replayData.resultData : null;

  const timelineEvents = [];
  let firstMiss = null;
  let peakCustomerFrame = null;
  let maxCustomerCount = 0;
  let peakPressureFrame = null;
  let maxPressureLevel = -1;
  let goalAchievements = [];
  const eventStartTimes = {};

  const firstFrame = frames[0];
  const lastFrame = frames[frames.length - 1];

  if (firstFrame && firstFrame.goals && firstFrame.goals.length > 0) {
    const goalTexts = firstFrame.goals.map(g => `${g.completed ? '✓' : (g.failed ? '✗' : '○')} ${g.title}`).join('、');
    timelineEvents.push({
      type: 'goal_set',
      tick: 0,
      title: '开局目标',
      desc: goalTexts
    });
  }

  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];
    const tick = Math.floor(frame.minute / 5);

    if (i === 0) {
      timelineEvents.push({
        type: 'start',
        tick: tick,
        title: '夜班开始',
        desc: '卷帘门拉起，深夜便利店开始营业'
      });
    }

    const waitingCount = frame.customers ? frame.customers.waiting.length : 0;
    if (waitingCount > maxCustomerCount) {
      maxCustomerCount = waitingCount;
      peakCustomerFrame = frame;
    }

    let pressureLevel = 0;
    if (frame.customers && frame.customers.waiting) {
      const waiting = frame.customers.waiting.length;
      const urgentCount = frame.customers.waiting.filter(c => {
        const remaining = c.maxWait - c.waited;
        return remaining <= 1;
      }).length;
      if (waiting === 0) pressureLevel = 0;
      else if (waiting <= 2 && urgentCount === 0) pressureLevel = 1;
      else if (waiting <= 4 && urgentCount <= 1) pressureLevel = 2;
      else if (waiting <= 6) pressureLevel = 3;
      else pressureLevel = 4;
    }
    if (pressureLevel > maxPressureLevel) {
      maxPressureLevel = pressureLevel;
      peakPressureFrame = frame;
    }

    if (frame.misses > 0 && firstMiss === null) {
      if (i > 0) {
        const prevFrame = frames[i - 1];
        if (prevFrame.misses !== frame.misses) {
          firstMiss = { tick: tick, frame: frame };
        }
      }
    }

    if (frame.goals && frame.goals.length > 0) {
      frame.goals.forEach((goal, idx) => {
        if (goal.completed) {
          if (!goalAchievements.find(g => g.title === goal.title)) {
            goalAchievements.push({
              tick: tick,
              title: goal.title,
              reward: goal.reward
            });
          }
        }
      });
    }

    if (frame.events && frame.events.history) {
      frame.events.history.forEach(evt => {
        if (!eventStartTimes[evt.id] && evt.startTick !== undefined) {
          eventStartTimes[evt.id] = {
            startTick: evt.startTick,
            event: evt
          };
        }
      });
    }
  }

  if (firstMiss) {
    const frame = firstMiss.frame;
    let missGoodKey = null;
    let missCount = 0;
    if (frame.sessionMissCount) {
      for (const key in frame.sessionMissCount) {
        if (frame.sessionMissCount[key] > missCount) {
          missCount = frame.sessionMissCount[key];
          missGoodKey = key;
        }
      }
    }
    const good = missGoodKey ? goods[missGoodKey] : null;
    timelineEvents.push({
      type: 'miss',
      tick: firstMiss.tick,
      title: '第一次缺货',
      desc: good ? `顾客因 ${good.icon}${good.name} 缺货而离开` : '有顾客因缺货离开'
    });
  }

  Object.values(eventStartTimes).forEach(item => {
    const evt = item.event;
    const template = eventTemplates[evt.id];
    if (template) {
      timelineEvents.push({
        type: 'event',
        tick: item.startTick,
        title: `${template.icon} ${template.name}`,
        desc: evt.responseName ? `选择了「${evt.responseName}」应对策略` : '事件突发发生'
      });
    }
  });

  goalAchievements.forEach(goal => {
    timelineEvents.push({
      type: 'goal',
      tick: goal.tick,
      title: `🎯 目标达成：${goal.title}`,
      desc: `获得 +${goal.reward} 分奖励`
    });
  });

  if (peakCustomerFrame && maxCustomerCount > 0) {
    const tick = Math.floor(peakCustomerFrame.minute / 5);
    timelineEvents.push({
      type: 'peak',
      tick: tick,
      title: '服务高峰',
      desc: `店内同时有 ${maxCustomerCount} 位顾客等待`
    });
  }

  if (peakPressureFrame && maxPressureLevel >= 2) {
    const tick = Math.floor(peakPressureFrame.minute / 5);
    const pressureLabels = ['轻松', '平稳', '忙碌', '紧张', '爆满!'];
    timelineEvents.push({
      type: 'pressure',
      tick: tick,
      title: '最高压力时刻',
      desc: `压力等级达到「${pressureLabels[maxPressureLevel]}」`
    });
  }

  if (resultInfo && resultInfo.leveledUp && resultInfo.newLevel) {
    const lastTick = Math.floor(lastFrame.minute / 5);
    const newLvlInfo = clerkLevels.find(cl => cl.level === resultInfo.newLevel);
    const prevLvlInfo = clerkLevels.find(cl => cl.level === resultInfo.prevLevel);
    let upgradeDesc = `${prevLvlInfo ? prevLvlInfo.icon + ' ' + prevLvlInfo.title : 'Lv.' + resultInfo.prevLevel} → ${newLvlInfo ? newLvlInfo.icon + ' ' + newLvlInfo.title : 'Lv.' + resultInfo.newLevel}`;
    if (resultInfo.newAbility && resultInfo.newAbility.ability) {
      upgradeDesc += `，解锁「${resultInfo.newAbility.ability.name}」`;
    }
    timelineEvents.push({
      type: 'upgrade',
      tick: lastTick,
      title: '🎉 店员升级',
      desc: upgradeDesc
    });
  }

  const lastTick = Math.floor(lastFrame.minute / 5);
  timelineEvents.push({
    type: 'end',
    tick: lastTick,
    title: '打烊结束',
    desc: `最终销售额 ¥${lastFrame.sales}，缺货 ${lastFrame.misses} 次`
  });

  timelineEvents.sort((a, b) => a.tick - b.tick);

  let worstGood = null;
  let worstGoodMisses = 0;
  if (lastFrame.sessionMissCount) {
    for (const key in lastFrame.sessionMissCount) {
      if (lastFrame.sessionMissCount[key] > worstGoodMisses) {
        worstGoodMisses = lastFrame.sessionMissCount[key];
        worstGood = key;
      }
    }
  }

  let totalShelfSales = {};
  if (lastFrame.sessionShelfStats) {
    for (const goodKey in lastFrame.sessionShelfStats) {
      for (const shelfId in lastFrame.sessionShelfStats[goodKey]) {
        totalShelfSales[shelfId] = (totalShelfSales[shelfId] || 0) + lastFrame.sessionShelfStats[goodKey][shelfId];
      }
    }
  }

  let worstShelf = null;
  let worstShelfMisses = 0;
  if (lastFrame.sessionShelfMissCount) {
    for (const sid in lastFrame.sessionShelfMissCount) {
      if (lastFrame.sessionShelfMissCount[sid] > worstShelfMisses) {
        worstShelfMisses = lastFrame.sessionShelfMissCount[sid];
        worstShelf = sid;
      }
    }
  }

  let worstGoodInfo = null;
  if (worstGood && goods[worstGood]) {
    worstGoodInfo = {
      key: worstGood,
      name: goods[worstGood].name,
      icon: goods[worstGood].icon,
      missCount: worstGoodMisses,
      saleCount: lastFrame.sessionSalesCount ? (lastFrame.sessionSalesCount[worstGood] || 0) : 0
    };
  }

  let worstShelfInfo = null;
  if (worstShelf && worstShelfMisses > 0) {
    const shelfGoodKey = level.shelves.find(s => s.id === worstShelf)?.good;
    const shelfGood = shelfGoodKey ? goods[shelfGoodKey] : null;
    worstShelfInfo = {
      id: worstShelf,
      goodKey: shelfGoodKey,
      goodName: shelfGood ? shelfGood.name : '',
      goodIcon: shelfGood ? shelfGood.icon : '🗄️',
      missCount: worstShelfMisses,
      saleCount: totalShelfSales[worstShelf] || 0
    };
  }

  const goodStats = [];
  const goodKeys = getCurrentLevelGoodKeys ? getCurrentLevelGoodKeys() : Object.keys(goods);
  goodKeys.forEach(key => {
    if (goods[key]) {
      goodStats.push({
        key: key,
        name: goods[key].name,
        icon: goods[key].icon,
        missCount: lastFrame.sessionMissCount ? (lastFrame.sessionMissCount[key] || 0) : 0,
        saleCount: lastFrame.sessionSalesCount ? (lastFrame.sessionSalesCount[key] || 0) : 0
      });
    }
  });
  goodStats.sort((a, b) => b.missCount - a.missCount);

  const shelfStats = [];
  if (level.shelves) {
    level.shelves.forEach(shelf => {
      const good = goods[shelf.good];
      const missCount = lastFrame.sessionShelfMissCount ? (lastFrame.sessionShelfMissCount[shelf.id] || 0) : 0;
      const saleCount = totalShelfSales[shelf.id] || 0;
      shelfStats.push({
        id: shelf.id,
        goodKey: shelf.good,
        goodName: good ? good.name : '',
        goodIcon: good ? good.icon : '🗄️',
        missCount: missCount,
        saleCount: saleCount
      });
    });
  }
  shelfStats.sort((a, b) => b.missCount - a.missCount);

  const served = lastFrame.customers ? lastFrame.customers.servedCount : 0;
  const missed = lastFrame.customers ? lastFrame.customers.missedCount : 0;
  const total = served + missed;
  const serviceRate = total > 0 ? Math.round((served / total) * 100) : 100;

  return {
    timelineEvents: timelineEvents,
    worstGood: worstGoodInfo,
    worstShelf: worstShelfInfo,
    goodStats: goodStats,
    shelfStats: shelfStats,
    finalScore: resultInfo && resultInfo.totalFinalScore !== undefined ? resultInfo.totalFinalScore : (lastFrame.sales + (lastFrame.energy || 0) * 2 - lastFrame.misses * 15),
    serviceRate: serviceRate,
    misses: lastFrame.misses,
    sales: lastFrame.sales,
    served: served,
    missed: missed,
    levelId: levelId,
    levelName: level.name,
    levelIcon: level.icon
  };
}

function generateNightReportFromState() {
  const level = getCurrentLevel();
  const served = state.customers.servedCount;
  const missed = state.customers.missedCount;
  const total = served + missed;
  const serviceRate = total > 0 ? Math.round((served / total) * 100) : 100;
  const baseScore = Math.max(0, state.sales + state.energy * 2 - state.misses * 15);
  const goalsBonus = calcGoalsBonus();
  let schedulingBonus = 0;
  if (schedulingState.active && schedulingState.selectedStrategy) {
    schedulingBonus = calculateSchedulingBonus(serviceRate, missed);
  }
  const finalScore = baseScore + goalsBonus + schedulingBonus;

  const clerkData = loadClerkData();
  const expGained = Math.max(10, Math.floor(finalScore * 0.3));
  const totalExp = clerkData.exp + expGained;
  const prevLevel = clerkData.level;
  let newLevel = prevLevel;
  for (let i = clerkLevels.length - 1; i >= 0; i--) {
    if (totalExp >= clerkLevels[i].expRequired) {
      newLevel = clerkLevels[i].level;
      break;
    }
  }
  const leveledUp = newLevel > prevLevel;
  const newLevelInfo = leveledUp ? clerkLevels.find(cl => cl.level === newLevel) : null;

  const timelineEvents = [];

  if (state.goals && state.goals.length > 0) {
    const goalTexts = state.goals.map(g => `${g.completed ? '✓' : (g.failed ? '✗' : '○')} ${g.title}`).join('、');
    timelineEvents.push({
      type: 'goal_set',
      tick: 0,
      title: '开局目标',
      desc: goalTexts
    });
  }

  timelineEvents.push({
    type: 'start',
    tick: 0,
    title: '夜班开始',
    desc: '卷帘门拉起，深夜便利店开始营业'
  });

  if (state.goals && state.goals.length > 0) {
    state.goals.forEach(goal => {
      if (goal.completed) {
        timelineEvents.push({
          type: 'goal',
          tick: Math.floor(state.minute / 5),
          title: `🎯 目标达成：${goal.title}`,
          desc: `已达成，+${goal.reward} 分`
        });
      }
    });
  }

  if (state.events.history && state.events.history.length > 0) {
    state.events.history.forEach(evt => {
      const template = eventTemplates[evt.id];
      if (template) {
        timelineEvents.push({
          type: 'event',
          tick: evt.startTick,
          title: `${template.icon} ${template.name}`,
          desc: evt.responseName ? `选择了「${evt.responseName}」应对策略` : '事件突发发生'
        });
      }
    });
  }

  if (leveledUp && newLevelInfo) {
    const lastTick = Math.floor(state.minute / 5);
    const prevLvlInfo = clerkLevels.find(cl => cl.level === prevLevel);
    let upgradeDesc = `${prevLvlInfo ? prevLvlInfo.icon + ' ' + prevLvlInfo.title : 'Lv.' + prevLevel} → ${newLevelInfo.icon} ${newLevelInfo.title}`;
    if (newLevelInfo.ability) {
      upgradeDesc += `，解锁「${newLevelInfo.ability.name}」`;
    }
    timelineEvents.push({
      type: 'upgrade',
      tick: lastTick,
      title: '🎉 店员升级',
      desc: upgradeDesc
    });
  } else {
    timelineEvents.forEach(ev => {
      if (ev.type === 'upgrade') {
        ev._remove = true;
      }
    });
  }

  timelineEvents.push({
    type: 'end',
    tick: Math.floor(state.minute / 5),
    title: '打烊结束',
    desc: `最终销售额 ¥${state.sales}，缺货 ${state.misses} 次`
  });

  timelineEvents.sort((a, b) => a.tick - b.tick);

  const goodStats = [];
  const goodKeys = getCurrentLevelGoodKeys();
  goodKeys.forEach(key => {
    if (goods[key]) {
      goodStats.push({
        key: key,
        name: goods[key].name,
        icon: goods[key].icon,
        missCount: state.sessionMissCount ? (state.sessionMissCount[key] || 0) : 0,
        saleCount: state.sessionSalesCount ? (state.sessionSalesCount[key] || 0) : 0
      });
    }
  });
  goodStats.sort((a, b) => b.missCount - a.missCount);

  let worstGood = goodStats.length > 0 && goodStats[0].missCount > 0 ? goodStats[0] : null;

  let totalShelfSales = {};
  if (state.sessionShelfStats) {
    for (const goodKey in state.sessionShelfStats) {
      for (const shelfId in state.sessionShelfStats[goodKey]) {
        totalShelfSales[shelfId] = (totalShelfSales[shelfId] || 0) + state.sessionShelfStats[goodKey][shelfId];
      }
    }
  }

  let worstShelf = null;
  let worstShelfMisses = 0;
  if (state.sessionShelfMissCount) {
    for (const sid in state.sessionShelfMissCount) {
      if (state.sessionShelfMissCount[sid] > worstShelfMisses) {
        worstShelfMisses = state.sessionShelfMissCount[sid];
        worstShelf = sid;
      }
    }
  }

  let worstShelfInfo = null;
  if (worstShelf && worstShelfMisses > 0) {
    const shelfGoodKey = level.shelves.find(s => s.id === worstShelf)?.good;
    const shelfGood = shelfGoodKey ? goods[shelfGoodKey] : null;
    worstShelfInfo = {
      id: worstShelf,
      goodKey: shelfGoodKey,
      goodName: shelfGood ? shelfGood.name : '',
      goodIcon: shelfGood ? shelfGood.icon : '🗄️',
      missCount: worstShelfMisses,
      saleCount: totalShelfSales[worstShelf] || 0
    };
  }

  const shelfStats = [];
  if (level.shelves) {
    level.shelves.forEach(shelf => {
      const good = goods[shelf.good];
      const missCount = state.sessionShelfMissCount ? (state.sessionShelfMissCount[shelf.id] || 0) : 0;
      const saleCount = totalShelfSales[shelf.id] || 0;
      shelfStats.push({
        id: shelf.id,
        goodKey: shelf.good,
        goodName: good ? good.name : '',
        goodIcon: good ? good.icon : '🗄️',
        missCount: missCount,
        saleCount: saleCount
      });
    });
  }
  shelfStats.sort((a, b) => b.missCount - a.missCount);

  return {
    timelineEvents: timelineEvents,
    worstGood: worstGood,
    worstShelf: worstShelfInfo,
    goodStats: goodStats,
    shelfStats: shelfStats,
    finalScore: finalScore,
    serviceRate: serviceRate,
    misses: state.misses,
    sales: state.sales,
    served: served,
    missed: missed,
    levelId: currentLevelId,
    levelName: level.name,
    levelIcon: level.icon
  };
}

function renderNightReportTimeline(timelineEvents) {
  if (!timelineEvents || timelineEvents.length === 0) {
    nightReportTimeline.innerHTML = '<p style="color:#8ba390;text-align:center;padding:20px;">暂无时间轴数据</p>';
    return;
  }

  const html = timelineEvents.map(evt => {
    const timeStr = formatTickTime(evt.tick);
    const badgeClass = evt.type;
    const badgeText = getTimelineBadgeText(evt.type);

    return `
      <div class="timeline-item ${evt.type}">
        <div class="timeline-dot"></div>
        <div class="timeline-time">${timeStr}</div>
        <div class="timeline-title">
          ${evt.title}
          ${badgeText ? `<span class="timeline-badge ${badgeClass}">${badgeText}</span>` : ''}
        </div>
        <div class="timeline-desc">${evt.desc}</div>
      </div>
    `;
  }).join('');

  nightReportTimeline.innerHTML = html;
}

function getTimelineBadgeText(type) {
  const map = {
    start: '开始',
    end: '结束',
    miss: '缺货',
    event: '事件',
    peak: '高峰',
    pressure: '压力',
    goal: '目标',
    goal_set: '目标',
    upgrade: '升级'
  };
  return map[type] || '';
}

function renderNightReportStats(goodStats) {
  if (!goodStats || goodStats.length === 0) {
    nightReportStats.innerHTML = '<p style="color:#8ba390;text-align:center;padding:20px;">暂无统计数据</p>';
    return;
  }

  const maxMiss = Math.max(...goodStats.map(g => g.missCount), 1);
  const maxSale = Math.max(...goodStats.map(g => g.saleCount), 1);

  const html = goodStats.map((good, idx) => {
    const isWorst = idx === 0 && good.missCount > 0;
    const missPercent = (good.missCount / maxMiss) * 100;
    const salePercent = (good.saleCount / maxSale) * 100;

    return `
      <div class="report-stat-row ${isWorst ? 'worst' : ''}">
        <div class="report-stat-left">
          <div class="report-stat-icon">${good.icon}</div>
          <div class="report-stat-info">
            <div class="report-stat-name">${good.name} ${isWorst ? '<span style="color:#e74c3c;font-size:11px;">最拖后腿</span>' : ''}</div>
            <div class="report-stat-detail">售出 ${good.saleCount} 件 · 缺货 ${good.missCount} 次</div>
          </div>
        </div>
        <div class="report-stat-right">
          <div class="report-stat-bar">
            <div class="report-stat-bar-fill sale" style="width:${salePercent}%"></div>
          </div>
          <div class="report-stat-bar" style="margin-top:3px;">
            <div class="report-stat-bar-fill miss" style="width:${missPercent}%"></div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  nightReportStats.innerHTML = html;
}

function renderNightReportShelfStats(shelfStats) {
  if (!nightReportShelfStats) return;
  if (!shelfStats || shelfStats.length === 0) {
    nightReportShelfStats.innerHTML = '<p style="color:#8ba390;text-align:center;padding:20px;">暂无货架统计</p>';
    return;
  }

  const maxMiss = Math.max(...shelfStats.map(s => s.missCount), 1);
  const maxSale = Math.max(...shelfStats.map(s => s.saleCount), 1);

  const html = shelfStats.map((shelf, idx) => {
    const isWorst = idx === 0 && shelf.missCount > 0;
    const missPercent = (shelf.missCount / maxMiss) * 100;
    const salePercent = (shelf.saleCount / maxSale) * 100;

    return `
      <div class="report-stat-row ${isWorst ? 'worst' : ''}">
        <div class="report-stat-left">
          <div class="report-stat-icon">${shelf.goodIcon}</div>
          <div class="report-stat-info">
            <div class="report-stat-name">${shelf.id} ${isWorst ? '<span style="color:#e74c3c;font-size:11px;">最拖后腿</span>' : ''}</div>
            <div class="report-stat-detail">${shelf.goodName || '—'} · 售出 ${shelf.saleCount} 件 · 缺货 ${shelf.missCount} 次</div>
          </div>
        </div>
        <div class="report-stat-right">
          <div class="report-stat-bar">
            <div class="report-stat-bar-fill sale" style="width:${salePercent}%"></div>
          </div>
          <div class="report-stat-bar" style="margin-top:3px;">
            <div class="report-stat-bar-fill miss" style="width:${missPercent}%"></div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  nightReportShelfStats.innerHTML = html;
}

function openNightReport(reportData) {
  if (!reportData) {
    reportData = generateNightReportFromState();
  }

  nightReportData.generated = true;
  nightReportData.timelineEvents = reportData.timelineEvents;
  nightReportData.worstGood = reportData.worstGood;
  nightReportData.worstShelf = reportData.worstShelf;
  nightReportData.finalScore = reportData.finalScore;
  nightReportData.serviceRate = reportData.serviceRate;
  nightReportData.misses = reportData.misses;
  nightReportData.levelId = reportData.levelId;
  nightReportData.levelName = reportData.levelName;

  nightReportSubtitle.textContent = `${reportData.levelIcon || '🏪'} 第 ${reportData.levelId} 关 · ${reportData.levelName}`;
  reportFinalScore.textContent = reportData.finalScore;
  reportServiceRate.textContent = reportData.serviceRate + '%';
  reportMisses.textContent = reportData.misses;

  if (reportData.worstGood && reportData.worstGood.missCount > 0) {
    reportWorstIcon.textContent = reportData.worstGood.icon;
    reportWorstLabel.textContent = reportData.worstGood.name;
  } else {
    reportWorstIcon.textContent = '🎉';
    reportWorstLabel.textContent = '表现优秀';
  }

  if (reportWorstShelfIcon && reportWorstShelfLabel) {
    if (reportData.worstShelf && reportData.worstShelf.missCount > 0) {
      reportWorstShelfIcon.textContent = reportData.worstShelf.goodIcon || '🗄️';
      reportWorstShelfLabel.textContent = reportData.worstShelf.id;
    } else {
      reportWorstShelfIcon.textContent = '✨';
      reportWorstShelfLabel.textContent = '货架稳定';
    }
  }

  renderNightReportTimeline(reportData.timelineEvents);
  renderNightReportStats(reportData.goodStats);
  renderNightReportShelfStats(reportData.shelfStats);

  if (replayHasSaved()) {
    nightReportReplayBtn.classList.remove('hidden');
  } else {
    nightReportReplayBtn.classList.add('hidden');
  }

  nightReportOverlay.classList.remove('hidden');
}

function closeNightReport() {
  nightReportOverlay.classList.add('hidden');
}

function generateNightReportFromSavedReplay() {
  const replayData = replayLoadSaved();
  if (!replayData) return null;
  return generateNightReportFromReplay(replayData);
}

function openNightReportFromReplay() {
  const reportData = generateNightReportFromSavedReplay();
  if (!reportData) {
    addLog('没有可查看的回放数据。');
    return;
  }
  openNightReport(reportData);
}

function bindNightReportControls() {
  nightReportCloseBtn.addEventListener("click", closeNightReport);
  nightReportCloseFooterBtn.addEventListener("click", closeNightReport);
  nightReportOverlay.addEventListener("click", (e) => {
    if (e.target === nightReportOverlay) {
      closeNightReport();
    }
  });
  nightReportReplayBtn.addEventListener("click", () => {
    closeNightReport();
    if (replayHasSaved()) {
      replayEnterMode();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !nightReportOverlay.classList.contains("hidden")) {
      closeNightReport();
    }
  });
}

function renderLevelName() {
  const level = getCurrentLevel();
  if (levelNameEl) {
    levelNameEl.textContent = `${level.icon} ${level.name}`;
  }
}

function renderClerkBadge() {
  const clerkData = loadClerkData();
  const info = getClerkLevelInfo(clerkData.level);
  const nextLvl = getNextClerkLevel(clerkData.level);

  if (clerkLevelIconEl) clerkLevelIconEl.textContent = info.icon;
  if (clerkLevelNumEl) clerkLevelNumEl.textContent = info.level;
  if (clerkLevelTitleEl) clerkLevelTitleEl.textContent = info.title;

  if (clerkExpFillEl) {
    if (nextLvl) {
      const prevExp = info.expRequired;
      const progress = ((clerkData.exp - prevExp) / (nextLvl.expRequired - prevExp)) * 100;
      clerkExpFillEl.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    } else {
      clerkExpFillEl.style.width = "100%";
    }
  }

  if (clerkExpTextEl) {
    clerkExpTextEl.textContent = nextLvl ? `${clerkData.exp} / ${nextLvl.expRequired}` : `${clerkData.exp} (MAX)`;
  }
}

function openClerkOverlay() {
  clerkOverlay.classList.remove("hidden");
  renderClerkBody();
}

function closeClerkOverlay() {
  clerkOverlay.classList.add("hidden");
}

function renderClerkBody() {
  const clerkData = loadClerkData();
  const info = getClerkLevelInfo(clerkData.level);
  const nextLvl = getNextClerkLevel(clerkData.level);
  const availablePoints = clerkData.skillPoints || 0;

  let expBarHtml;
  if (nextLvl) {
    const prevExp = info.expRequired;
    const progress = ((clerkData.exp - prevExp) / (nextLvl.expRequired - prevExp)) * 100;
    expBarHtml = `
      <div class="clerk-exp-bar-wrap">
        <div class="clerk-exp-bar"><span style="width:${Math.min(100, Math.max(0, progress))}%"></span></div>
        <div class="clerk-exp-label">${clerkData.exp} / ${nextLvl.expRequired} EXP</div>
      </div>
    `;
  } else {
    expBarHtml = `
      <div class="clerk-exp-bar-wrap">
        <div class="clerk-exp-bar"><span style="width:100%"></span></div>
        <div class="clerk-exp-label">已满级 (${clerkData.exp} EXP)</div>
      </div>
    `;
  }

  const abilitiesHtml = clerkLevels.filter(cl => cl.ability).map(cl => {
    const unlocked = clerkData.level >= cl.level;
    return `
      <div class="clerk-ability-card ${unlocked ? 'unlocked' : 'locked'}">
        <div class="clerk-ability-icon">${unlocked ? '✅' : '🔒'}</div>
        <div class="clerk-ability-info">
          <div class="clerk-ability-name">${cl.ability.name} <span class="clerk-ability-level">Lv.${cl.level} 解锁</span></div>
          <div class="clerk-ability-desc">${cl.ability.desc}</div>
        </div>
      </div>
    `;
  }).join('');

  const skillBranchesHtml = Object.entries(skillBranches).map(([branchKey, branch]) => {
    const skillsHtml = branch.skills.map(skill => {
      const currentLevel = clerkData.skills[skill.id] || 0;
      const maxed = currentLevel >= skill.maxLevel;
      const canUpgrade = availablePoints > 0 && !maxed;
      const effectText = skill.desc.replace('N', currentLevel * skill.effectPerLevel);
      return `
        <div class="skill-card ${currentLevel > 0 ? 'unlocked' : ''}" data-skill-id="${skill.id}">
          <div class="skill-icon">${skill.icon}</div>
          <div class="skill-info">
            <div class="skill-name">
              ${skill.name}
              <span class="skill-level">Lv.${currentLevel}/${skill.maxLevel}</span>
            </div>
            <div class="skill-desc">${currentLevel > 0 ? effectText : skill.desc.replace('N', skill.effectPerLevel)}</div>
            <div class="skill-level-dots">
              ${Array.from({length: skill.maxLevel}, (_, i) => 
                `<span class="skill-dot ${i < currentLevel ? 'filled' : ''}"></span>`
              ).join('')}
            </div>
          </div>
          <button class="skill-upgrade-btn ${canUpgrade ? '' : 'disabled'}" 
                  data-skill-id="${skill.id}" ${canUpgrade ? '' : 'disabled'}>
            ${maxed ? '已满级' : (canUpgrade ? '升级 (1点)' : '技能点不足')}
          </button>
        </div>
      `;
    }).join('');

    return `
      <div class="skill-branch">
        <div class="skill-branch-header">
          <span class="skill-branch-icon">${branch.icon}</span>
          <div>
            <div class="skill-branch-name">${branch.name}</div>
            <div class="skill-branch-desc">${branch.desc}</div>
          </div>
        </div>
        <div class="skill-branch-skills">
          ${skillsHtml}
        </div>
      </div>
    `;
  }).join('');

  const activeEffects = getUnlockedAbilities();
  const effectsList = [];
  activeEffects.forEach(id => {
    const cl = clerkLevels.find(c => c.ability && c.ability.id === id);
    if (!cl) return;
    let effectDetail = '';
    switch (id) {
      case 'moveSave': effectDetail = '移动消耗体力：0'; break;
      case 'restockBonus': effectDetail = `补货数量基础：+3件/次${getSkillEffect('restockBoost') > 0 ? '（技能额外+' + getSkillEffect('restockBoost') + '）' : ''}`; break;
      case 'earlyAlert': effectDetail = `低库存提醒阈值：50%${getSkillEffect('lowStockSense') > 0 ? '（技能额外+' + getSkillEffect('lowStockSense') + '%）' : ''}`; break;
      case 'dualCarry': effectDetail = '可携带：2箱货物'; break;
    }
    effectsList.push(`💡 ${cl.ability.name} — ${effectDetail}`);
  });

  Object.entries(clerkData.skills || {}).forEach(([skillId, level]) => {
    if (level <= 0) return;
    for (const branch of Object.values(skillBranches)) {
      const skill = branch.skills.find(s => s.id === skillId);
      if (skill) {
        let effectDetail = '';
        const effect = level * skill.effectPerLevel;
        switch (skillId) {
          case 'restockBoost': effectDetail = `每次补货额外+${effect}件`; break;
          case 'emergencySupply': effectDetail = `仓库断货时可额外取货${effect}次/事件`; break;
          case 'energyEfficient': effectDetail = `所有行动体力消耗-${effect}点（最低0）`; break;
          case 'staminaBoost': effectDetail = `体力上限+${effect}`; break;
          case 'previewExtend': effectDetail = `顾客入店预告提前${effect}格`; break;
          case 'earlyWarning': effectDetail = `经营事件预警提前${effect}格`; break;
          case 'lowStockSense': effectDetail = `低库存提醒阈值+${effect}%`; break;
        }
        if (effectDetail) effectsList.push(`✨ ${skill.name} (Lv.${level}) — ${effectDetail}`);
        break;
      }
    }
  });

  const effectsHtml = effectsList.length > 0 ? `
    <div class="clerk-effects">
      <h4>当前生效效果</h4>
      ${effectsList.map(e => `<div class="clerk-effect-item">${e}</div>`).join('')}
    </div>
  ` : '<div class="clerk-effects"><h4>当前生效效果</h4><div class="clerk-effect-empty">暂无效果，继续努力升级吧！</div></div>';

  clerkBodyEl.innerHTML = `
    <div class="clerk-profile">
      <div class="clerk-profile-icon">${info.icon}</div>
      <div class="clerk-profile-info">
        <div class="clerk-profile-title">${info.title} <span class="clerk-profile-lv">Lv.${info.level}</span></div>
        ${expBarHtml}
      </div>
      <div class="clerk-skill-points ${availablePoints > 0 ? 'has-points' : ''}">
        <div class="skill-points-label">技能点</div>
        <div class="skill-points-value">${availablePoints}</div>
      </div>
    </div>
    <div class="clerk-abilities">
      <h4>固定能力（按等级解锁）</h4>
      ${abilitiesHtml}
    </div>
    <div class="clerk-skills-section">
      <h4>技能分支（消耗技能点升级） ${availablePoints > 0 ? `<span class="skill-points-badge">${availablePoints}点可用</span>` : ''}</h4>
      ${skillBranchesHtml}
    </div>
    ${effectsHtml}
  `;

  clerkBodyEl.querySelectorAll('.skill-upgrade-btn:not(.disabled)').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const skillId = e.currentTarget.dataset.skillId;
      const result = upgradeSkill(skillId);
      if (result.success) {
        addLog(`⬆️ 技能升级成功！`);
        renderClerkBody();
        renderClerkBadge();
      } else {
        addLog(`⚠️ 技能升级失败：${result.reason}`);
      }
    });
  });
}

function bindClerkControls() {
  if (clerkUpgradeBtn) {
    clerkUpgradeBtn.addEventListener("click", openClerkOverlay);
  }
  if (clerkCloseBtn) {
    clerkCloseBtn.addEventListener("click", closeClerkOverlay);
  }
  if (clerkOverlay) {
    clerkOverlay.addEventListener("click", (e) => {
      if (e.target === clerkOverlay) closeClerkOverlay();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && clerkOverlay && !clerkOverlay.classList.contains("hidden")) {
      closeClerkOverlay();
    }
  });
}

function openLevelSelect() {
  levelCardsEl.innerHTML = "";
  levels.forEach(level => {
    const card = document.createElement("div");
    card.className = `level-card ${level.id === currentLevelId ? "current" : ""}`;
    const shelfSummary = level.shelves.map(s => `${s.id}:${goods[s.good].name}`).join("、");
    const durationMin = Math.floor(level.duration / 60);
    const durationSec = level.duration % 60;
    const durationText = durationSec > 0 ? `${durationMin}分${durationSec}秒` : `${durationMin}分钟`;
    card.innerHTML = `
      <div class="level-card-header">
        <span class="level-icon">${level.icon}</span>
        <div class="level-card-title">
          <strong>${level.name}</strong>
          <span class="level-size">${level.mapCols}×${level.mapRows} 地图</span>
        </div>
      </div>
      <p class="level-desc">${level.desc}</p>
      <div class="level-meta">
        <span>🕐 ${durationText}</span>
        <span>📦 ${level.shelves.length} 货架</span>
        <span>👥 容纳${level.maxWaiting}人</span>
      </div>
      <div class="level-shelves">${shelfSummary}</div>
    `;
    card.addEventListener("click", () => {
      currentLevelId = level.id;
      if (editor.active) {
        editor.active = false;
        editor.selectedShelfId = null;
        editor.originalShelves = [];
        editor.logs = [];
      }
      schemeState.activeSchemeId = null;
      schemeState.tempSchemeId = null;
      schemeState.tempSchemeData = null;
      schemeState.lastSavedSchemeId = null;
      state = freshState();
      resultEl.classList.add("hidden");
      addLog(`已选择关卡：${level.icon} ${level.name}。点击「开始营业」开始游戏。`);
      updateEditorUI();
      updateEditorCurrentSchemeDisplay();
      renderCrates();
      render();
      renderLevelName();
      levelSelectOverlay.classList.add("hidden");
    });
    levelCardsEl.appendChild(card);
  });
  levelSelectOverlay.classList.remove("hidden");
}

function bindLevelSelectControls() {
  levelSelectOverlay.addEventListener("click", (e) => {
    if (e.target === levelSelectOverlay) {
      levelSelectOverlay.classList.add("hidden");
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !levelSelectOverlay.classList.contains("hidden")) {
      levelSelectOverlay.classList.add("hidden");
    }
  });
}

function init() {
  state = freshState();
  renderCrates();
  bindControls();
  bindTutorialControls();
  bindCodexControls();
  bindLevelSelectControls();
  bindClerkControls();
  bindEditorControls();
  bindReplayControls();
  bindSchedulingControls();
  bindSchemeControls();
  bindTrainingControls();
  bindNightReportControls();
  updateEditorUI();
  updateReplayButtonState();
  updateEditorCurrentSchemeDisplay();
  render();
  renderLevelName();
  renderClerkBadge();
  tutorialTotalEl.textContent = tutorialSteps.length;

  window.addEventListener("resize", () => {
    if (tutorial.active && !tutorialOverlay.classList.contains("hidden")) {
      const step = tutorialSteps[tutorial.currentStep];
      if (step) {
        positionTutorialElements(step);
      }
    }
  });

  const hasCompletedTutorial = localStorage.getItem("tutorialCompleted");
  if (!hasCompletedTutorial) {
    showTutorialChoice(true);
  }
}

function bindControls() {
  startBtn.addEventListener("click", () => {
    if (tutorial.active && tutorial.currentStep === 0) {
      startGame();
      checkTutorialAction("startGame");
    } else {
      openSchedulingChallenge();
    }
  });
  changeLevelBtn.addEventListener("click", () => {
    if (state.running) {
      addLog("游戏进行中无法切换关卡，请先结束或重新开始。");
      return;
    }
    openLevelSelect();
  });
  restartBtn.addEventListener("click", () => {
    resetGame();
  });
  actionBtn.addEventListener("click", () => {
    interact();
    if (tutorial.active && tutorial.currentStep === 3) {
      checkTutorialAction("restockShelf");
    }
  });
  document.getElementById("upBtn").addEventListener("click", () => {
    move(0, -1);
    if (tutorial.active && tutorial.currentStep === 1) {
      checkTutorialAction("moveToWarehouse");
    }
  });
  document.getElementById("downBtn").addEventListener("click", () => {
    move(0, 1);
    if (tutorial.active && tutorial.currentStep === 1) {
      checkTutorialAction("moveToWarehouse");
    }
  });
  document.getElementById("leftBtn").addEventListener("click", () => {
    move(-1, 0);
    if (tutorial.active && tutorial.currentStep === 1) {
      checkTutorialAction("moveToWarehouse");
    }
  });
  document.getElementById("rightBtn").addEventListener("click", () => {
    move(1, 0);
    if (tutorial.active && tutorial.currentStep === 1) {
      checkTutorialAction("moveToWarehouse");
    }
  });
  window.addEventListener("keydown", (event) => {
    const keyMap = {
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      w: [0, -1],
      s: [0, 1],
      a: [-1, 0],
      d: [1, 0]
    };
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      interact();
      if (tutorial.active && tutorial.currentStep === 3) {
        checkTutorialAction("restockShelf");
      }
      return;
    }
    const dir = keyMap[event.key];
    if (dir) {
      event.preventDefault();
      move(dir[0], dir[1]);
      if (tutorial.active && tutorial.currentStep === 1) {
        checkTutorialAction("moveToWarehouse");
      }
    }
  });
}

function bindTutorialControls() {
  tutorialNextBtn.addEventListener("click", nextTutorialStep);
  tutorialSkipBtn.addEventListener("click", endTutorial);
  choiceYesBtn.addEventListener("click", () => {
    tutorialChoice.classList.add("hidden");
    startTutorial();
  });
  choiceNoBtn.addEventListener("click", () => {
    tutorialChoice.classList.add("hidden");
    localStorage.setItem("tutorialCompleted", "true");
  });
}

function showTutorialChoice(isFirstVisit) {
  resetGame();
  tutorialChoice.classList.remove("hidden");
}

function startTutorial() {
  tutorial.active = true;
  tutorial.currentStep = 0;
  tutorial.waitingForAction = false;
  state = freshState();
  state.player = { x: 4, y: 3 };
  state.shelves[0].stock = 1;
  render();
  showTutorialStep(0);
}

function showTutorialStep(stepIndex) {
  if (stepIndex >= tutorialSteps.length) {
    endTutorial();
    return;
  }

  tutorial.currentStep = stepIndex;
  const step = tutorialSteps[stepIndex];
  tutorialStepEl.textContent = stepIndex + 1;
  tutorialTitle.textContent = step.title;
  tutorialContent.textContent = step.content;

  tutorialOverlay.classList.remove("hidden");

  setTimeout(() => {
    positionTutorialElements(step);
  }, 100);

  if (step.autoNext) {
    tutorialNextBtn.classList.remove("hidden");
    tutorialNextBtn.textContent = "完成";
    tutorial.waitingForAction = false;
  } else {
    tutorialNextBtn.classList.add("hidden");
    tutorial.waitingForAction = true;
  }

  if (step.onStart) {
    step.onStart();
  }
}

function positionTutorialElements(step) {
  const targetEl = step.target();
  if (!targetEl) {
    tutorialOverlay.classList.add("hidden");
    return;
  }

  const rect = targetEl.getBoundingClientRect();
  const padding = 8;

  tutorialSpotlight.style.left = `${rect.left - padding}px`;
  tutorialSpotlight.style.top = `${rect.top - padding}px`;
  tutorialSpotlight.style.width = `${rect.width + padding * 2}px`;
  tutorialSpotlight.style.height = `${rect.height + padding * 2}px`;

  const dialogWidth = 360;
  const dialogHeight = 200;
  let dialogLeft, dialogTop;
  let arrowDirection = step.position;

  switch (step.position) {
    case "top":
      dialogLeft = Math.max(10, Math.min(window.innerWidth - dialogWidth - 10, rect.left + rect.width / 2 - dialogWidth / 2));
      dialogTop = Math.max(10, rect.top - dialogHeight - 60);
      arrowDirection = "down";
      break;
    case "bottom":
      dialogLeft = Math.max(10, Math.min(window.innerWidth - dialogWidth - 10, rect.left + rect.width / 2 - dialogWidth / 2));
      dialogTop = Math.min(window.innerHeight - dialogHeight - 10, rect.bottom + 60);
      arrowDirection = "up";
      break;
    case "left":
      dialogLeft = Math.max(10, rect.left - dialogWidth - 60);
      dialogTop = Math.max(10, Math.min(window.innerHeight - dialogHeight - 10, rect.top + rect.height / 2 - dialogHeight / 2));
      arrowDirection = "right";
      break;
    case "right":
      dialogLeft = Math.min(window.innerWidth - dialogWidth - 10, rect.right + 60);
      dialogTop = Math.max(10, Math.min(window.innerHeight - dialogHeight - 10, rect.top + rect.height / 2 - dialogHeight / 2));
      arrowDirection = "left";
      break;
  }

  tutorialDialog.style.left = `${dialogLeft}px`;
  tutorialDialog.style.top = `${dialogTop}px`;

  tutorialArrow.className = `tutorial-arrow ${arrowDirection}`;
  let arrowLeft, arrowTop;
  const arrowOffset = 30;

  switch (arrowDirection) {
    case "down":
      arrowLeft = rect.left + rect.width / 2 - 16;
      arrowTop = rect.top - arrowOffset;
      break;
    case "up":
      arrowLeft = rect.left + rect.width / 2 - 16;
      arrowTop = rect.bottom + arrowOffset - 20;
      break;
    case "left":
      arrowLeft = rect.right + arrowOffset - 20;
      arrowTop = rect.top + rect.height / 2 - 16;
      break;
    case "right":
      arrowLeft = rect.left - arrowOffset;
      arrowTop = rect.top + rect.height / 2 - 16;
      break;
  }

  tutorialArrow.style.left = `${arrowLeft}px`;
  tutorialArrow.style.top = `${arrowTop}px`;
}

function checkTutorialAction(actionType) {
  if (!tutorial.active) return;

  const step = tutorialSteps[tutorial.currentStep];
  if (!step || step.action !== actionType) return;

  if (!tutorial.waitingForAction && !step.autoNext) return;

  let completed = false;

  switch (actionType) {
    case "startGame":
      completed = state.running;
      break;
    case "moveToWarehouse":
      const wh = getCurrentLevel().warehousePos;
      completed = state.player.x === wh.x && state.player.y === wh.y;
      break;
    case "pickupGoods":
      completed = state.carry.includes(tutorial.targetGood);
      break;
    case "restockShelf":
      const targetShelf = state.shelves.find(s => s.id === tutorial.targetShelfId);
      completed = targetShelf && targetShelf.stock >= 3 && state.carry.length === 0;
      break;
    case "finish":
      completed = !resultEl.classList.contains("hidden");
      break;
  }

  if (completed && tutorial.waitingForAction) {
    tutorial.waitingForAction = false;
    addLog(`✓ 教学步骤完成：${step.title}`);
    setTimeout(() => {
      nextTutorialStep();
    }, 800);
  }
}

function nextTutorialStep() {
  if (tutorial.currentStep < tutorialSteps.length - 1) {
    showTutorialStep(tutorial.currentStep + 1);
  } else {
    endTutorial();
  }
}

function endTutorial() {
  tutorial.active = false;
  tutorial.waitingForAction = false;
  tutorialOverlay.classList.add("hidden");
  localStorage.setItem("tutorialCompleted", "true");
  addLog("🎉 新手教学完成！开始你的便利店夜班吧！");

  if (state.running && !timer) {
    timer = setInterval(tick, getCurrentLevel().tickInterval);
  }

  render();
}

function renderCrates() {
  crateButtonsEl.innerHTML = "";
  getCurrentLevelGoodKeys().forEach((key) => {
    const good = goods[key];
    const button = document.createElement("button");
    button.type = "button";
    const carrying = state.carry.includes(key);
    const full = state.carry.length >= maxCarryCount();
    button.textContent = carrying ? `${good.name} ✓` : `拿${good.name}`;
    if (carrying || full || replayPlayer.active) button.disabled = true;
    button.addEventListener("click", () => {
      state.selected = key;
      interact();
      if (tutorial.active && tutorial.currentStep === 2) {
        checkTutorialAction("pickupGoods");
      }
    });
    crateButtonsEl.appendChild(button);
  });
}

function startGame() {
  if (state.running) return;
  const level = getCurrentLevel();
  state.running = true;
  resultEl.classList.add("hidden");
  state.goals = generateNightGoals();
  state.customers = {
    incoming: [],
    waiting: [],
    nextId: 1,
    servedCount: 0,
    missedCount: 0
  };

  if (schedulingState.active && schedulingState.selectedStrategy) {
    const strategy = STRATEGY_TEMPLATES[schedulingState.selectedStrategy];
    if (strategy) {
      addLog(`🧠 排班挑战已激活：${strategy.icon} ${strategy.name}（${strategy.difficulty}）`);
      addLog(`   提示：${strategy.tips[0]}`);
    }
  }

  for (let i = 0; i < level.incomingPreview; i++) {
    generateIncomingCustomer();
  }
  addLog("营业开始，顾客陆续进店。");
  addLog("🎯 本次夜班目标已生成：");
  state.goals.forEach((g, i) => {
    addLog(`  ${i + 1}. ${g.title}（奖励 +${g.reward}分）`);
  });
  updateGoalProgress();
  replayStartRecording();
  if (!tutorial.active) {
    timer = setInterval(tick, level.tickInterval);
  }
  render();
}

function resetGame() {
  clearInterval(timer);
  timer = null;
  resetAllEventEffects();
  activeEventsEl.classList.add("hidden");
  eventBanner.classList.add("hidden");
  appShellEl.classList.remove("energy-high-drain");
  const wasTraining = training.active;
  const savedThemeId = training.themeId;
  const savedOriginalId = training.originalLevelId;
  const savedSelected = training.selectedThemeId;
  state = freshState(wasTraining);
  resultEl.classList.add("hidden");
  if (wasTraining) {
    training.active = true;
    training.themeId = savedThemeId;
    training.originalLevelId = savedOriginalId;
    training.selectedThemeId = savedSelected;
    trainingBanner.classList.remove("hidden");
    boardEl.classList.add("training-mode");
  }
  schedulingState.active = false;
  schedulingState.selectedStrategy = null;
  schedulingState.generatedCurve = null;
  schedulingState.previewData = null;
  schedulingState.expectedStats = null;
  schedulingState.actualStats = {
    customersByTick: [],
    demandByGood: {},
    totalServed: 0,
    totalMissed: 0
  };
  schemeState.activeSchemeId = null;
  schemeState.tempSchemeId = null;
  schemeState.tempSchemeData = null;
  schemeState.lastSavedSchemeId = null;
  if (tutorial.active) {
    tutorial.active = false;
    tutorial.waitingForAction = false;
    tutorialOverlay.classList.add("hidden");
  }
  if (editor.active) {
    editor.active = false;
    editor.selectedShelfId = null;
    editor.originalShelves = [];
    editor.logs = [];
  }
  updateEditorUI();
  updateEditorCurrentSchemeDisplay();
  renderCrates();
  renderLevelName();
  renderClerkBadge();
  render();
  renderGoals();
  if (wasTraining && savedThemeId === 'scheduling') {
    setTimeout(() => openSchedulingForTraining(), 100);
  }
}

function tick() {
  if (!state.running) return;
  state.minute += 5;
  tickWarningCountdown();
  checkEventExpirations();
  tryTriggerRandomEvent();
  processCustomerQueue();
  updateGoalProgress();
  replayRecordFrame('tick');
  const effectiveDuration = getTrainingConfigOverride('duration', getCurrentLevel().duration);
  if (state.minute >= effectiveDuration) {
    const isTraining = state._isTraining || training.active;
    finish(isTraining ? "训练时间到，本轮练习结束。" : "天快亮了，夜班结束。");
  }
  render();
}

function generateIncomingCustomer() {
  const level = getCurrentLevel();
  const goodKeys = getCurrentLevelGoodKeys();
  const currentTick = Math.floor(state.minute / 5);
  const curveSegment = getCurveSegmentForTick(currentTick);
  const useCurve = schedulingState.active && curveSegment !== null;

  const effectiveCustomerBaseGap = getTrainingConfigOverride('customerBaseGap', level.customerBaseGap);
  const effectiveCustomerWaitMin = getTrainingConfigOverride('customerWaitMin', level.customerWaitMin);
  const effectiveCustomerWaitMax = getTrainingConfigOverride('customerWaitMax', level.customerWaitMax);
  const effectiveCustomerRandomRange = getTrainingConfigOverride('customerRandomRange', level.customerRandomRange);

  const weightedKeys = [];
  goodKeys.forEach(key => {
    let multiplier = getGoodDemandMultiplier(key);
    if (useCurve && curveSegment.goodWeights[key] !== undefined) {
      multiplier *= curveSegment.goodWeights[key];
    }
    const weight = Math.round(multiplier * 10);
    for (let i = 0; i < weight; i++) {
      weightedKeys.push(key);
    }
  });
  const goodKey = weightedKeys[Math.floor(Math.random() * weightedKeys.length)];

  const lastArrival = state.customers.incoming.length > 0
    ? state.customers.incoming[state.customers.incoming.length - 1].arrivalTick
    : currentTick;

  let baseGap;
  if (useCurve) {
    const intensity = curveSegment.intensity;
    const baseGapRaw = effectiveCustomerBaseGap / Math.max(0.5, intensity);
    baseGap = Math.max(1, Math.round(baseGapRaw));
  } else {
    baseGap = Math.max(1, effectiveCustomerBaseGap - Math.floor(state.minute / 40));
  }

  const randomRange = useCurve
    ? Math.max(1, Math.floor(effectiveCustomerRandomRange * 0.8))
    : effectiveCustomerRandomRange;

  const arrivalTick = lastArrival + baseGap + Math.floor(Math.random() * randomRange);
  state.customers.incoming.push({
    id: state.customers.nextId++,
    goodKey: goodKey,
    arrivalTick: arrivalTick,
    maxWait: effectiveCustomerWaitMin + Math.floor(Math.random() * (effectiveCustomerWaitMax - effectiveCustomerWaitMin + 1))
  });
}

function processCustomerQueue() {
  const currentTick = Math.floor(state.minute / 5);
  const level = getCurrentLevel();
  const effectiveMaxWaiting = getTrainingConfigOverride('maxWaiting', level.maxWaiting);

  const arrived = state.customers.incoming.filter(c => c.arrivalTick <= currentTick);
  arrived.forEach(customer => {
    if (state.customers.waiting.length < effectiveMaxWaiting) {
      const shelf = pickBestShelfForGood(customer.goodKey);
      const waitingCustomer = {
        ...customer,
        targetShelfId: shelf ? shelf.id : null,
        waited: 0,
        displayX: shelf ? shelf.x : Math.floor(Math.random() * (level.mapCols - 2)) + 1,
        displayY: shelf ? shelf.y : Math.floor(Math.random() * (level.mapRows - 2)) + 1
      };
      state.customers.waiting.push(waitingCustomer);
      addLog(`👤 顾客#${customer.id}进店，想要${goods[customer.goodKey].icon}${goods[customer.goodKey].name}。`);
    } else {
      state.misses += 1;
      state.customers.missedCount += 1;
      state.sessionMissCount[customer.goodKey] = (state.sessionMissCount[customer.goodKey] || 0) + 1;
      const shelf = pickBestShelfForGood(customer.goodKey);
      if (shelf) {
        state.sessionShelfMissCount[shelf.id] = (state.sessionShelfMissCount[shelf.id] || 0) + 1;
      }
      recordActualCustomer(customer.goodKey, currentTick, false);
      addLog(`👥 店内太拥挤，顾客#${customer.id}直接离开，计入缺货！`);
    }
  });
  state.customers.incoming = state.customers.incoming.filter(c => c.arrivalTick > currentTick);

  const previewCount = level.incomingPreview + getIncomingPreviewBonus();
  while (state.customers.incoming.length < previewCount) {
    generateIncomingCustomer();
  }

  const stillWaiting = [];
  for (const customer of state.customers.waiting) {
    const result = tryServeCustomer(customer);
    if (result === 'served') {
      continue;
    } else if (result === 'waiting') {
      customer.waited += 1;
      if (customer.waited >= customer.maxWait) {
        state.misses += 1;
        state.customers.missedCount += 1;
        state.sessionMissCount[customer.goodKey] = (state.sessionMissCount[customer.goodKey] || 0) + 1;
        recordActualCustomer(customer.goodKey, currentTick, false);
        const shelf = customer.targetShelfId ? state.shelves.find(s => s.id === customer.targetShelfId) : null;
        if (shelf) {
          state.sessionShelfMissCount[shelf.id] = (state.sessionShelfMissCount[shelf.id] || 0) + 1;
          addLog(`😠 顾客#${customer.id}等了太久，${shelf.id}货架缺${goods[customer.goodKey].name}，愤怒离开！`);
        } else {
          addLog(`😠 顾客#${customer.id}等了太久，没有买到${goods[customer.goodKey].name}，愤怒离开！`);
        }
      } else {
        stillWaiting.push(customer);
      }
    }
  }
  state.customers.waiting = stillWaiting;
}

function pickBestShelfForGood(goodKey) {
  const compatibleShelves = state.shelves.filter(s => s.good === goodKey && !isShelfBlocked(s));
  if (compatibleShelves.length === 0) return null;
  const withStock = compatibleShelves.filter(s => s.stock > 0);
  if (withStock.length > 0) {
    return withStock.reduce((best, s) => s.stock > best.stock ? s : best, withStock[0]);
  }
  return compatibleShelves[Math.floor(Math.random() * compatibleShelves.length)];
}

function tryServeCustomer(customer) {
  const currentTick = Math.floor(state.minute / 5);
  const shelf = customer.targetShelfId
    ? state.shelves.find(s => s.id === customer.targetShelfId)
    : pickBestShelfForGood(customer.goodKey);

  if (!shelf) {
    return 'waiting';
  }

  if (isShelfBlocked(shelf)) {
    const altShelf = pickBestShelfForGood(customer.goodKey);
    if (altShelf && altShelf.id !== shelf.id) {
      customer.targetShelfId = altShelf.id;
      customer.displayX = altShelf.x;
      customer.displayY = altShelf.y;
      return tryServeCustomer(customer);
    }
    return 'waiting';
  }

  if (!customer.targetShelfId) {
    customer.targetShelfId = shelf.id;
    customer.displayX = shelf.x;
    customer.displayY = shelf.y;
  }

  if (shelf.stock > 0) {
    shelf.stock -= 1;
    state.sales += goods[shelf.good].price;
    state.customers.servedCount += 1;
    recordActualCustomer(customer.goodKey, currentTick, true);
    const prevCount = state.salesCount[shelf.good] || 0;
    state.salesCount[shelf.good] = prevCount + 1;
    const prevSessionCount = state.sessionSalesCount[shelf.good] || 0;
    state.sessionSalesCount[shelf.good] = prevSessionCount + 1;
    if (!state.sessionShelfStats[shelf.good]) state.sessionShelfStats[shelf.good] = {};
    state.sessionShelfStats[shelf.good][shelf.id] = (state.sessionShelfStats[shelf.good][shelf.id] || 0) + 1;
    addLog(`✅ 顾客#${customer.id}买走了${goods[shelf.good].name}，${shelf.id}货架剩${shelf.stock}件。`);

    if (!codexOverlay.classList.contains("hidden")) {
      renderCodexList();
      if (codexState.selectedGood === shelf.good) {
        renderCodexDetail(shelf.good);
      }
    }
    return 'served';
  }

  return 'waiting';
}

function getPressureLevel() {
  const waiting = state.customers.waiting.length;
  const urgentCount = state.customers.waiting.filter(c => {
    const remaining = c.maxWait - c.waited;
    return remaining <= 1;
  }).length;

  let level, label, className;
  if (waiting === 0) {
    level = 0;
    label = '轻松';
    className = 'pressure-low';
  } else if (waiting <= 2 && urgentCount === 0) {
    level = 1;
    label = '平稳';
    className = 'pressure-low';
  } else if (waiting <= 4 && urgentCount <= 1) {
    level = 2;
    label = '忙碌';
    className = 'pressure-medium';
  } else if (waiting <= 6) {
    level = 3;
    label = '紧张';
    className = 'pressure-high';
  } else {
    level = 4;
    label = '爆满!';
    className = 'pressure-extreme';
  }
  return { level, label, className };
}

function move(dx, dy) {
  if (replayPlayer.active) return;
  if (!state.running) return;
  const level = getCurrentLevel();
  const nextX = Math.max(0, Math.min(level.mapCols - 1, state.player.x + dx));
  const nextY = Math.max(0, Math.min(level.mapRows - 1, state.player.y + dy));
  if (nextX === state.player.x && nextY === state.player.y) return;
  state.player.x = nextX;
  state.player.y = nextY;
  spendEnergy(hasAbility("moveSave") ? 0 : 1);
  replayRecordFrame('move');
  render();
}

function interact() {
  if (replayPlayer.active) return;
  if (!state.running) return;
  const level = getCurrentLevel();
  const shelf = shelfAt(state.player.x, state.player.y);
  if (state.player.x === level.warehousePos.x && state.player.y === level.warehousePos.y) {
    const emergencyMax = getEmergencySupplyMax();
    const warehouseBlocked = isWarehouseBlocked();
    const canEmergencyUse = warehouseBlocked && emergencyMax > 0 && (state.emergencySupplyUsed || 0) < emergencyMax;
    if (warehouseBlocked && !canEmergencyUse) {
      addLog("📦 仓库暂时断货，无法取货！请等待仓库恢复。");
    } else if (state.carry.length >= maxCarryCount()) {
      addLog("手上已经拿满了。");
    } else if (state.carry.includes(state.selected)) {
      addLog("已经拿了一箱这种货。");
    } else {
      if (warehouseBlocked && canEmergencyUse) {
        state.emergencySupplyUsed = (state.emergencySupplyUsed || 0) + 1;
        addLog(`🆘 使用应急取货！（剩余 ${emergencyMax - state.emergencySupplyUsed} 次/事件）`);
      }
      state.carry.push(state.selected);
      spendEnergy(2);
      addLog(`从仓库拿起一箱${goods[state.selected].name}。`);
    }
  } else if (shelf) {
    if (isShelfBlocked(shelf)) {
      addLog(`⚠️ ${shelf.id}${goods[shelf.good].name}货架故障，暂时无法补货和取货！`);
    } else if (state.carry.length === 0) {
      addLog("手上没有货箱。");
    } else {
      const carryIndex = state.carry.indexOf(shelf.good);
      if (carryIndex === -1) {
        addLog(`${shelf.id}货架不收你手上的货。`);
      } else if (shelf.stock >= shelf.max) {
        addLog(`${shelf.id}货架已经满了。`);
      } else {
        const restockAmount = getRestockBonusAmount();
        shelf.stock = Math.min(shelf.max, shelf.stock + restockAmount);
        state.carry.splice(carryIndex, 1);
        spendEnergy(4);
        addLog(`${shelf.id}货架补货完成（+${restockAmount}件）。`);
        updateGoalProgress();
      }
    }
  } else {
    addLog("这里没有可处理的东西。");
  }
  replayRecordFrame('interact');
  render();
}

function spendEnergy(amount) {
  const multiplier = getEnergyMultiplier();
  const reduction = getEnergyCostReduction();
  const baseAmount = Math.max(0, amount - reduction);
  const actualAmount = Math.max(0, Math.ceil(baseAmount * multiplier));
  state.energy = Math.max(0, state.energy - actualAmount);
  updateGoalProgress();
  if (state.energy === 0) {
    const isTraining = state._isTraining || training.active;
    finish(isTraining ? "体力耗尽，训练提前结束。" : "体力耗尽，夜班提前结束。");
  }
}

function shelfAt(x, y) {
  return state.shelves.find((shelf) => shelf.x === x && shelf.y === y);
}

function addLog(text) {
  state.log.push(text);
  state.log = state.log.slice(-28);
}

function finish(reason) {
  if (!state.running) return;

  const isTraining = state._isTraining || training.active;

  state.running = false;
  clearInterval(timer);
  timer = null;

  const currentTick = Math.floor(state.minute / 5);
  const remaining = state.customers.waiting.length;
  if (remaining > 0) {
    if (isTraining) {
      addLog(`⏱️ 训练结束！店内还有 ${remaining} 位顾客未买到商品，全部计入缺货。`);
    } else {
      addLog(`🌙 打烊时间到！店内还有 ${remaining} 位顾客未买到商品，全部计入缺货。`);
    }
    state.customers.waiting.forEach(customer => {
      state.misses += 1;
      state.customers.missedCount += 1;
      state.sessionMissCount[customer.goodKey] = (state.sessionMissCount[customer.goodKey] || 0) + 1;
      recordActualCustomer(customer.goodKey, currentTick, false);
      const shelf = customer.targetShelfId ? state.shelves.find(s => s.id === customer.targetShelfId) : pickBestShelfForGood(customer.goodKey);
      if (shelf) {
        state.sessionShelfMissCount[shelf.id] = (state.sessionShelfMissCount[shelf.id] || 0) + 1;
      }
      const good = goods[customer.goodKey];
      if (isTraining) {
        addLog(`🚪 顾客#${customer.id}因训练结束离开，没买到${good.icon}${good.name}。`);
      } else {
        addLog(`🚪 顾客#${customer.id}因打烊离开，没买到${good.icon}${good.name}。`);
      }
    });
    state.customers.waiting = [];
  }

  if (!isTraining) {
    updateCodexStats();
  }

  endActiveEventsForClosing();
  evaluateEndGoals();
  const baseScore = Math.max(0, state.sales + state.energy * 2 - state.misses * 15);
  const goalsBonus = calcGoalsBonus();
  let schedulingBonus = 0;
  const finalScore = baseScore + goalsBonus;
  const served = state.customers.servedCount;
  const missed = state.customers.missedCount;
  const total = served + missed;
  const serviceRate = total > 0 ? Math.round((served / total) * 100) : 100;

  const schedulingComparisonHtml = generateSchedulingComparisonHtml();
  if (schedulingState.active && schedulingState.selectedStrategy) {
    schedulingBonus = calculateSchedulingBonus(serviceRate, missed);
  }

  const goalsHtml = state.goals.length > 0 ? `
    <div class="result-goals">
      <h3>🎯 夜班目标结算</h3>
      <div class="result-goal-list">
        ${state.goals.map(g => `
          <div class="result-goal-item ${g.completed ? 'success' : 'fail'}">
            <span>${g.completed ? '✓' : '✗'} ${g.title}</span>
            <span class="reward-tag">${g.completed ? '+' + g.reward : '未达成'}</span>
          </div>
        `).join('')}
      </div>
      ${goalsBonus > 0 ? `<div class="result-bonus">🌟 目标奖励总分：+${goalsBonus} 分</div>` : ''}
    </div>
  ` : '';

  const statsHtml = `
    <div class="result-goals">
      <h3>👥 顾客服务统计</h3>
      <div class="result-goal-list">
        <div class="result-goal-item success">
          <span>✓ 成功服务顾客</span>
          <span class="reward-tag">${served} 位</span>
        </div>
        <div class="result-goal-item fail">
          <span>✗ 流失顾客（缺货/拥挤）</span>
          <span class="reward-tag">${missed} 位</span>
        </div>
        <div class="result-goal-item ${serviceRate >= 70 ? 'success' : 'fail'}">
          <span>${serviceRate >= 70 ? '✓' : '✗'} 服务满意率</span>
          <span class="reward-tag">${serviceRate}%</span>
        </div>
      </div>
    </div>
  `;

  const clerkData = loadClerkData();
  const prevLevel = clerkData.level;
  const totalFinalScore = finalScore + schedulingBonus;
  const expGained = Math.max(10, Math.floor(totalFinalScore * 0.3));
  let newLevel = prevLevel;
  let leveledUp = false;
  let newAbility = null;
  let expHtml = '';
  let clerkInfo, nextLvl;

  if (!isTraining) {
    clerkData.exp += expGained;
    for (let i = clerkLevels.length - 1; i >= 0; i--) {
      if (clerkData.exp >= clerkLevels[i].expRequired) {
        newLevel = clerkLevels[i].level;
        break;
      }
    }
    const levelDiff = newLevel - prevLevel;
    if (levelDiff > 0) {
      clerkData.skillPoints = (clerkData.skillPoints || 0) + levelDiff;
    }
    clerkData.level = newLevel;
    saveClerkData(clerkData);

    leveledUp = newLevel > prevLevel;
    newAbility = leveledUp ? clerkLevels.find(cl => cl.level === newLevel) : null;

    clerkInfo = getClerkLevelInfo(prevLevel);
    nextLvl = getNextClerkLevel(prevLevel);
    const availablePoints = clerkData.skillPoints || 0;
    expHtml = `
      <div class="result-goals">
        <h3>⬆️ 店员经验</h3>
        <div class="result-goal-list">
          <div class="result-goal-item success">
            <span>本次获得经验</span>
            <span class="reward-tag">+${expGained} EXP</span>
          </div>
          <div class="result-goal-item success">
            <span>${clerkInfo.icon} ${clerkInfo.title} (Lv.${clerkInfo.level})${leveledUp ? ' → ' + clerkLevels.find(cl => cl.level === newLevel).icon + ' ' + clerkLevels.find(cl => cl.level === newLevel).title + ' (Lv.' + newLevel + ')' : ''}</span>
            <span class="reward-tag">${clerkData.exp}${nextLvl ? ' / ' + nextLvl.expRequired : ' (MAX)'} EXP</span>
          </div>
          ${leveledUp && newAbility && newAbility.ability ? `<div class="result-goal-item success" style="background:#e6f4de;"><span>🎉 解锁新能力：${newAbility.ability.name}</span><span class="reward-tag">${newAbility.ability.desc}</span></div>` : ''}
          ${leveledUp && levelDiff > 0 ? `<div class="result-goal-item success" style="background:#fff4d6;"><span>⭐ 获得技能点</span><span class="reward-tag">+${levelDiff} 点（可用 ${availablePoints} 点）</span></div>` : ''}
          ${availablePoints > 0 && !leveledUp ? `<div class="result-goal-item" style="background:#fff8e1;"><span>💡 可用技能点</span><span class="reward-tag">${availablePoints} 点，点击「店员升级」分配</span></div>` : ''}
        </div>
      </div>
    `;
  }

  const eventHistory = state.events.history || [];
  const eventsHtml = eventHistory.length > 0 ? `
    <div class="result-goals">
      <h3>⚡ 经营事件记录</h3>
      <div class="result-goal-list">
        ${eventHistory.map(h => {
          const template = eventTemplates[h.id];
          const icon = template ? template.icon : '⚡';
          const actualDuration = h.ended && h.endTick ? h.endTick - h.startTick : h.finalDuration;
          const durationText = h.ended ? `（持续 ${actualDuration} 格）` : '（未结束）';
          
          let effectDetails = '';
          if (h.responseName && h.effectMods) {
            const mods = [];
            if (h.effectMods.durationDelta !== undefined) {
              mods.push(`⏱️ 持续时间: ${h.originalDuration} → ${h.finalDuration} 格`);
            }
            if (h.effectMods.demandMultiplier !== undefined && h.finalEffect.demandMultiplier) {
              mods.push(`📈 需求倍率: ${h.originalEffect.demandMultiplier}x → ${h.finalEffect.demandMultiplier}x`);
            }
            if (h.effectMods.energyMultiplierDelta !== undefined && h.finalEffect.energyMultiplier) {
              mods.push(`💤 体力消耗: ${h.originalEffect.energyMultiplier}x → ${h.finalEffect.energyMultiplier}x`);
            }
            if (h.effectMods.partialAccess) {
              mods.push(`🔧 货架: 完全禁用 → 部分可用`);
            }
            if (h.effectMods.energySaveDuring) {
              mods.push(`💨 仓库: 完全封锁 → 体力消耗减半`);
            }
            if (h.effectMods.energyCost !== undefined) {
              mods.push(`⚡ 即时消耗: -${h.effectMods.energyCost} 体力`);
            }
            if (mods.length > 0) {
              effectDetails = `<br><span style="color:#5a7a5a;font-size:11px;">${mods.join(' | ')}</span>`;
            }
          }
          
          const responseText = h.responseName 
            ? `<span style="color:#8b6914;font-size:12px;">🛡️ ${h.responseIcon || ''} ${h.responseName}${h.responseDesc ? ` — ${h.responseDesc}` : ''}</span>` 
            : `<span style="color:#888;font-size:12px;">🤷 未选择应对措施</span>`;
          
          return `
          <div class="result-goal-item result-event-item" style="background:#f5efe0;">
            <span>
              ${icon} <strong>${h.name}</strong>
              <br>${responseText}
              ${effectDetails}
            </span>
            <span class="reward-tag">第 ${h.startTick} 格触发 ${durationText}</span>
          </div>
        `}).join('')}
      </div>
    </div>
  ` : '';

  resetAllEventEffects();

  if (isTraining) {
    const finalData = {
      sales: state.sales,
      misses: state.misses,
      energy: state.energy,
      served: served,
      missed: missed,
      eventsTriggered: eventHistory.length
    };
    const savedOriginal = training.originalLevelId;
    const savedSelected = training.selectedThemeId;
    training.active = false;
    training.themeId = null;
    trainingBanner.classList.add("hidden");
    boardEl.classList.remove("training-mode");
    activeEventsEl.classList.add("hidden");
    eventBanner.classList.add("hidden");
    appShellEl.classList.remove("energy-high-drain");
    currentLevelId = savedOriginal || 1;
    training.originalLevelId = null;
    schedulingState.active = false;
    schedulingState.selectedStrategy = null;
    schedulingState.generatedCurve = null;
    state = freshState(false);
    renderCrates();
    renderLevelName();
    renderClerkBadge();
    render();
    renderGoals();
    training.selectedThemeId = savedSelected;
    showTrainingResult(finalData);
    return;
  }

  const resultHtml = `
    <h2>${reason}</h2>
    <p>最终销售额 ¥${state.sales}，缺货 ${state.misses} 次，剩余体力 ${state.energy}，基础评分 ${baseScore}。</p>
    ${statsHtml}
    ${schedulingComparisonHtml}
    ${goalsHtml}
    ${eventsHtml}
    ${expHtml}
    <p style="margin-top: 12px; font-size: 18px; font-weight: 700; color: #6b5a20;">最终综合评分：<strong>${totalFinalScore}</strong>（基础 ${baseScore} + 目标奖励 +${goalsBonus}${schedulingBonus > 0 ? ' + 排班奖励 +' + schedulingBonus : ''}）</p>
    <div style="margin-top: 16px; display: flex; gap: 10px;">
      <button id="resultReportBtn" class="primary" type="button" style="margin: 0; flex: 1;">📰 夜班日报</button>
      <button id="resultReplayBtn" class="secondary" type="button" style="margin: 0; flex: 1;">🎬 查看回放</button>
      <button id="resultRestartBtn" class="secondary" type="button" style="margin: 0; flex: 1;">🔄 重新开始</button>
    </div>
  `;
  resultEl.innerHTML = resultHtml;
  resultEl.classList.remove("hidden");

  const resultInfo = {
    html: resultHtml,
    goals: state.goals.map(g => ({ ...g })),
    leveledUp: leveledUp,
    prevLevel: prevLevel,
    newLevel: newLevel,
    expGained: expGained,
    totalFinalScore: totalFinalScore,
    newAbility: newAbility ? {
      level: newAbility.level,
      title: newAbility.title,
      icon: newAbility.icon,
      ability: newAbility.ability ? { name: newAbility.ability.name, desc: newAbility.ability.desc } : null
    } : null
  };

  replayRecordFrame('finish');
  replayStopRecording(resultInfo);
  updateReplayButtonState();

  const resultReportBtn = document.getElementById("resultReportBtn");
  if (resultReportBtn) {
    resultReportBtn.addEventListener("click", () => {
      const reportData = generateNightReportFromSavedReplay() || generateNightReportFromState();
      openNightReport(reportData);
    });
  }
  const resultReplayBtn = document.getElementById("resultReplayBtn");
  if (resultReplayBtn) {
    resultReplayBtn.addEventListener("click", () => {
      if (replayHasSaved()) {
        replayEnterMode();
      }
    });
  }
  const resultRestartBtn = document.getElementById("resultRestartBtn");
  if (resultRestartBtn) {
    resultRestartBtn.addEventListener("click", () => {
      resetGame();
    });
  }

  addLog(`结算完成，服务${served}位顾客，流失${missed}位，基础分${baseScore}，目标奖励+${goalsBonus}${schedulingBonus > 0 ? '，排班奖励+' + schedulingBonus : ''}，最终评分${totalFinalScore}。获得${expGained}经验。${leveledUp ? '🎉 升级到' + clerkLevels.find(cl => cl.level === newLevel).title + '！' : ''}`);

  if (tutorial.active && tutorial.currentStep === 4) {
    checkTutorialAction("finish");
  }
}

function generateSchedulingComparisonHtml() {
  if (!schedulingState.active || !schedulingState.selectedStrategy || !schedulingState.expectedStats) {
    return '';
  }
  const strategy = STRATEGY_TEMPLATES[schedulingState.selectedStrategy];
  const expected = schedulingState.expectedStats;
  const actual = schedulingState.actualStats;
  const goodKeys = getCurrentLevelGoodKeys();

  const actualTotal = (actual.totalServed || 0) + (actual.totalMissed || 0);
  const expectedTotal = expected.totalExpectedCustomers;
  const totalDiff = actualTotal - expectedTotal;
  const totalMatch = expectedTotal > 0 ? Math.round((1 - Math.abs(totalDiff) / expectedTotal) * 100) : 100;
  let totalMatchClass = totalMatch >= 80 ? 'good' : totalMatch >= 60 ? 'ok' : 'bad';

  let goodsRows = '';
  goodKeys.forEach(key => {
    const good = goods[key];
    const expectedDemand = expected.expectedDemandByGood[key] || 0;
    const actualDemand = actual.demandByGood[key] || 0;
    const diff = actualDemand - expectedDemand;
    const demandMatch = expectedDemand > 0 ? Math.round((1 - Math.abs(diff) / expectedDemand) * 100) : 100;
    let demandMatchClass = demandMatch >= 75 ? 'good' : demandMatch >= 50 ? 'ok' : 'bad';
    const isOver = diff > 0;
    goodsRows += `
      <tr>
        <td>${good.icon} ${good.name}</td>
        <td class="comparison-expected">约 ${expectedDemand} 份</td>
        <td class="comparison-actual ${isOver ? 'over' : ''}">${actualDemand} 份 ${diff !== 0 ? `(${diff > 0 ? '+' : ''}${diff})` : ''}</td>
        <td><span class="comparison-match ${demandMatchClass}">${demandMatch}%</span></td>
      </tr>
    `;
  });

  let actualPeakCustomers = 0;
  let expectedPeakIntensity = 0;
  if (schedulingState.generatedCurve) {
    schedulingState.generatedCurve.forEach(seg => {
      if (seg.intensity > expectedPeakIntensity) expectedPeakIntensity = seg.intensity;
    });
  }
  if (actual.customersByTick && actual.customersByTick.length > 0) {
    actualPeakCustomers = Math.max(...actual.customersByTick);
  }

  const level = getCurrentLevel();
  const actualMaxWait = level.maxWaiting;
  const peakHandled = actualPeakCustomers <= actualMaxWait * 0.8;

  return `
    <div class="scheduling-comparison" style="background:#faf5e0; border-color:#c4b27a;">
      <h3 style="color:#7a5a10;">🧠 排班挑战 · 预期 vs 实际（${strategy.icon} ${strategy.name}）</h3>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>指标</th>
            <th>预期值</th>
            <th>实际值</th>
            <th>匹配度</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>👥 总到访顾客</td>
            <td class="comparison-expected">约 ${expectedTotal} 位</td>
            <td class="comparison-actual ${totalDiff > 0 ? 'over' : ''}">${actualTotal} 位 ${totalDiff !== 0 ? `(${totalDiff > 0 ? '+' : ''}${totalDiff})` : ''}</td>
            <td><span class="comparison-match ${totalMatchClass}">${totalMatch}%</span></td>
          </tr>
          <tr>
            <td>⚡ 客流强度峰值</td>
            <td class="comparison-expected">${expectedPeakIntensity.toFixed(1)}x</td>
            <td class="comparison-actual">单格 ${actualPeakCustomers} 人</td>
            <td><span class="comparison-match ${peakHandled ? 'good' : 'bad'}">${peakHandled ? '从容应对' : '超出承载'}</span></td>
          </tr>
          <tr>
            <td>😠 流失顾客</td>
            <td class="comparison-expected">-</td>
            <td class="comparison-actual ${actual.totalMissed > 3 ? 'over' : ''}">${actual.totalMissed || 0} 位</td>
            <td><span class="comparison-match ${(actual.totalMissed || 0) <= 2 ? 'good' : (actual.totalMissed || 0) <= 5 ? 'ok' : 'bad'}">${(actual.totalMissed || 0) <= 2 ? '优秀' : (actual.totalMissed || 0) <= 5 ? '合格' : '不足'}</span></td>
          </tr>
        </tbody>
      </table>
      <h4 style="margin:14px 0 8px; color:#7a5a10; font-size:14px;">📦 商品需求对比</h4>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>商品</th>
            <th>预期需求</th>
            <th>实际需求</th>
            <th>匹配度</th>
          </tr>
        </thead>
        <tbody>
          ${goodsRows}
        </tbody>
      </table>
    </div>
  `;
}

function calculateSchedulingBonus(serviceRate, missed) {
  let bonus = 0;
  const strategy = STRATEGY_TEMPLATES[schedulingState.selectedStrategy];
  if (!strategy) return 0;
  const difficultyMult = strategy.difficultyLevel;
  if (serviceRate >= 85) bonus += 30 * difficultyMult;
  else if (serviceRate >= 70) bonus += 15 * difficultyMult;
  if (missed === 0) bonus += 20 * difficultyMult;
  else if (missed <= 2) bonus += 10 * difficultyMult;
  return bonus;
}

function render() {
  clockEl.textContent = `0${Math.floor(state.minute / 60)}:${String(state.minute % 60).padStart(2, "0")}`;
  energyEl.textContent = `${state.energy}/${state.maxEnergy}`;
  salesEl.textContent = state.sales;
  missesEl.textContent = state.misses;
  carryEl.textContent = state.carry.length > 0 ? state.carry.map(k => goods[k].name).join(" + ") : "空";
  const replayActive = replayPlayer.active;
  startBtn.disabled = state.running || replayActive;
  actionBtn.disabled = !state.running || replayActive;
  changeLevelBtn.disabled = state.running || replayActive;
  restartBtn.disabled = replayActive;
  editLayoutBtn.disabled = state.running || replayActive;
  replayBtn.disabled = replayActive;
  document.getElementById("upBtn").disabled = replayActive;
  document.getElementById("downBtn").disabled = replayActive;
  document.getElementById("leftBtn").disabled = replayActive;
  document.getElementById("rightBtn").disabled = replayActive;
  renderBoard();
  renderShelves();
  renderGoals();
  renderQueue();
  renderLog();
  renderClerkBadge();
  renderCrates();
  renderActiveEvents();
  renderPredictionPanel();

  if (tutorial.active && tutorial.waitingForAction) {
    setTimeout(() => {
      const step = tutorialSteps[tutorial.currentStep];
      if (step) {
        positionTutorialElements(step);
      }
    }, 50);
  }
}

function renderBoard() {
  boardEl.innerHTML = "";
  const level = getCurrentLevel();
  boardEl.style.gridTemplateColumns = `repeat(${level.mapCols}, 1fr)`;
  boardEl.style.gridTemplateRows = `repeat(${level.mapRows}, 1fr)`;
  boardEl.style.aspectRatio = `${level.mapCols} / ${level.mapRows}`;
  const tileCustomers = {};
  state.customers.waiting.forEach(customer => {
    const key = `${customer.displayX},${customer.displayY}`;
    if (!tileCustomers[key]) tileCustomers[key] = [];
    tileCustomers[key].push(customer);
  });

  for (let y = 0; y < level.mapRows; y += 1) {
    for (let x = 0; x < level.mapCols; x += 1) {
      const tile = document.createElement("div");
      tile.className = "tile";
      const label = document.createElement("span");
      label.className = "label";
      let isEmpty = true;
      if (x === level.warehousePos.x && y === level.warehousePos.y) {
        tile.classList.add("warehouse");
        if (isWarehouseBlocked()) {
          tile.classList.add("warehouse-blocked");
        }
        label.textContent = "仓库";
        isEmpty = false;
      } else if (x === level.checkoutPos.x && y === level.checkoutPos.y) {
        tile.classList.add("checkout");
        label.textContent = "收银";
        isEmpty = false;
      } else {
        const shelf = shelfAt(x, y);
        if (shelf) {
          tile.classList.add("shelf");
          isEmpty = false;
          const shelfRatio = Math.round((shelf.stock / shelf.max) * 100);
          const lowThresholdBase = hasAbility("earlyAlert") ? 50 : 35;
          const lowThreshold = lowThresholdBase + getLowStockThresholdBonus();
          if (shelfRatio <= lowThreshold) tile.classList.add("shelf-low");
          if (isShelfBlocked(shelf)) tile.classList.add("shelf-broken");
          if (isShelfPartialAccess(shelf)) tile.classList.add("shelf-partial");
          if (editor.active && editor.selectedShelfId === shelf.id) {
            tile.classList.add("editor-selected");
          }
          if (editor.active) {
            label.textContent = `${shelf.id} ${goods[shelf.good].icon}${goods[shelf.good].name}`;
          } else {
            label.textContent = `${shelf.id} ${goods[shelf.good].name} ${shelf.stock}/${shelf.max}`;
          }
        }
      }
      if (isEmpty && editor.active) {
        tile.classList.add("empty-tile");
      }
      if (state.player.x === x && state.player.y === y) {
        tile.classList.add("player");
      }

      if (editor.active) {
        tile.addEventListener("click", () => handleEditorTileClick(x, y));
      }

      const key = `${x},${y}`;
      if (tileCustomers[key] && !editor.active) {
        tileCustomers[key].forEach((customer, idx) => {
          const customerEl = document.createElement("div");
          const remaining = customer.maxWait - customer.waited;
          const isUrgent = remaining <= 1;
          customerEl.className = `customer-on-map ${isUrgent ? "urgent" : ""}`;
          customerEl.textContent = goods[customer.goodKey].icon;
          const offset = idx * 22;
          customerEl.style.top = `8%`;
          customerEl.style.left = `${8 + offset}%`;
          customerEl.title = `顾客#${customer.id}: ${goods[customer.goodKey].name}，剩余等待${remaining}`;
          tile.appendChild(customerEl);
        });
      }

      tile.appendChild(label);
      boardEl.appendChild(tile);
    }
  }
}

function renderQueue() {
  const pressure = getPressureLevel();
  waitingCountEl.textContent = state.customers.waiting.length;
  pressureLevelEl.textContent = pressure.label;
  pressureLevelEl.className = pressure.className;

  waitingListEl.innerHTML = "";
  if (state.customers.waiting.length === 0) {
    const empty = document.createElement("p");
    empty.className = "queue-empty";
    empty.textContent = "暂无顾客";
    waitingListEl.appendChild(empty);
  } else {
    const sorted = [...state.customers.waiting].sort((a, b) => {
      const remainA = a.maxWait - a.waited;
      const remainB = b.maxWait - b.waited;
      return remainA - remainB;
    });
    sorted.forEach(customer => {
      const good = goods[customer.goodKey];
      const remaining = customer.maxWait - customer.waited;
      const ratio = Math.round((remaining / customer.maxWait) * 100);
      let statusClass = "";
      if (remaining <= 1) {
        statusClass = "urgent";
      } else if (remaining <= 2) {
        statusClass = "warning";
      }
      const shelf = customer.targetShelfId ? state.shelves.find(s => s.id === customer.targetShelfId) : null;
      const hasStock = shelf && shelf.stock > 0;
      const card = document.createElement("div");
      card.className = `waiting-card ${statusClass}`;
      card.innerHTML = `
        <div class="waiting-icon">${good.icon}</div>
        <div class="waiting-info">
          <div class="waiting-good">${good.name} ${!hasStock && shelf ? '⚠️缺货' : ''}</div>
          <div class="waiting-target">${shelf ? `目标: ${shelf.id}货架` : '寻找货架...'}</div>
        </div>
        <div class="waiting-time">
          <span>剩余</span>
          <strong>${remaining}</strong>
        </div>
        <div class="waiting-bar"><span style="width:${ratio}%"></span></div>
      `;
      waitingListEl.appendChild(card);
    });
  }

  incomingListEl.innerHTML = "";
  const currentTick = Math.floor(state.minute / 5);
  const sortedIncoming = [...state.customers.incoming].sort((a, b) => a.arrivalTick - b.arrivalTick);
  if (sortedIncoming.length === 0) {
    const empty = document.createElement("p");
    empty.className = "queue-empty";
    empty.textContent = "暂无预告";
    incomingListEl.appendChild(empty);
  } else {
    const maxPreview = 6 + getIncomingPreviewBonus();
    sortedIncoming.slice(0, maxPreview).forEach(customer => {
      const good = goods[customer.goodKey];
      const ticksUntil = customer.arrivalTick - currentTick;
      const isHighlight = ticksUntil <= 1;
      const card = document.createElement("div");
      card.className = `incoming-card ${isHighlight ? "highlight" : ""}`;
      card.innerHTML = `
        <div class="incoming-icon">${good.icon}</div>
        <div class="incoming-good">${good.name}</div>
        <div class="incoming-countdown">${ticksUntil <= 0 ? '即将进店' : ticksUntil + ' 格后'}</div>
      `;
      incomingListEl.appendChild(card);
    });
  }
}

function renderShelves() {
  shelfListEl.innerHTML = "";
  state.shelves.forEach((shelf) => {
    const card = document.createElement("div");
    card.className = "shelf-card";
    const ratio = Math.round((shelf.stock / shelf.max) * 100);
    const lowThresholdBase = hasAbility("earlyAlert") ? 50 : 35;
    const lowThreshold = lowThresholdBase + getLowStockThresholdBonus();
    const blocked = isShelfBlocked(shelf);
    const partial = isShelfPartialAccess(shelf);
    const nameText = blocked
      ? `${shelf.id} ${goods[shelf.good].name} ⚠️故障`
      : partial
        ? `${shelf.id} ${goods[shelf.good].name} 🔧受限`
        : `${shelf.id} ${goods[shelf.good].name}`;
    const stockText = blocked ? `无法使用` : `${shelf.stock}/${shelf.max}`;
    if (blocked) {
      card.style.borderColor = "#d45f4c";
      card.style.background = "#2a1e1e";
    } else if (partial) {
      card.style.borderColor = "#e7b951";
      card.style.background = "#2a261e";
    }
    card.innerHTML = `<strong>${nameText}</strong><span>${stockText}</span><div class="meter ${ratio <= lowThreshold || blocked ? "low" : ""}"><span style="width:${blocked ? 0 : ratio}%"></span></div>`;
    shelfListEl.appendChild(card);
  });
}

function renderGoals() {
  goalsListEl.innerHTML = "";

  if (!state.goals || state.goals.length === 0) {
    const empty = document.createElement("p");
    empty.className = "goals-empty";
    empty.textContent = state.running ? "暂无目标" : "点击「开始营业」生成本次夜班目标";
    goalsListEl.appendChild(empty);
    return;
  }

  state.goals.forEach(goal => {
    const template = getGoalTemplate(goal.templateType);
    const progress = template ? template.getProgress(state, goal) : 0;

    let ratio, badgeText, badgeClass;

    if (goal.completed) {
      badgeText = "已达成";
      badgeClass = "completed";
      ratio = 100;
    } else if (goal.failed) {
      badgeText = "已失败";
      badgeClass = "failed";
      ratio = goal.inverse ? 100 : (goal.target > 0 ? Math.min(100, (progress / goal.target) * 100) : 0);
    } else {
      badgeText = "进行中";
      badgeClass = "progress";
      if (goal.failOnBreak) {
        ratio = 100;
      } else if (goal.inverse) {
        ratio = goal.target > 0 ? Math.max(0, 100 - (progress / goal.target) * 100) : 100;
      } else {
        ratio = goal.target > 0 ? Math.min(100, (progress / goal.target) * 100) : 0;
      }
    }

    let progressText;
    if (goal.unit === "¥") {
      progressText = `${goal.unit}${progress} / ${goal.unit}${goal.target}`;
    } else if (goal.inverse) {
      progressText = `当前 ${progress}${goal.unit} / 上限 ${goal.target}${goal.unit}`;
    } else if (goal.failOnBreak) {
      progressText = `当前 ${progress}${goal.unit} / 需保持 ≥${goal.target}${goal.unit}`;
    } else if (goal.endOnly) {
      progressText = `当前 ${progress}${goal.unit} / 目标 ≥${goal.target}${goal.unit}（结算时判定）`;
    } else {
      progressText = `${progress}${goal.unit} / ${goal.target}${goal.unit}`;
    }

    const card = document.createElement("div");
    card.className = `goal-card ${goal.completed ? "completed" : ""} ${goal.failed ? "failed" : ""}`;
    card.innerHTML = `
      <div class="goal-header">
        <p class="goal-title">${goal.title}</p>
        <span class="goal-badge ${badgeClass}">${badgeText}</span>
      </div>
      <div class="goal-meta">
        <span>${progressText}</span>
        <span class="goal-reward">奖励 +${goal.reward}</span>
      </div>
      <div class="goal-meter"><span style="width:${ratio}%"></span></div>
    `;
    goalsListEl.appendChild(card);
  });
}

function openSchedulingChallenge() {
  if (state.running) {
    addLog("游戏进行中无法选择排班策略，请先结束或重新开始。");
    return;
  }
  schedulingState.active = false;
  schedulingState.selectedStrategy = null;
  schedulingState.generatedCurve = null;
  schedulingState.previewData = null;
  schedulingState.expectedStats = null;
  renderStrategyCards();
  schedulingPreviewEl.classList.add("hidden");
  schedulingBackBtn.classList.add("hidden");
  schedulingStartBtn.classList.add("hidden");
  schedulingSkipBtn.classList.remove("hidden");
  strategyCardsEl.classList.remove("hidden");
  schedulingOverlay.classList.remove("hidden");
}

function closeSchedulingOverlay() {
  schedulingOverlay.classList.add("hidden");
}

function renderStrategyCards() {
  strategyCardsEl.innerHTML = "";
  Object.values(STRATEGY_TEMPLATES).forEach(strategy => {
    const isSelected = schedulingState.selectedStrategy === strategy.id;
    const card = document.createElement("div");
    card.className = `strategy-card ${isSelected ? "selected" : ""}`;
    card.innerHTML = `
      <div class="strategy-card-header">
        <div class="strategy-icon">${strategy.icon}</div>
        <div class="strategy-info">
          <h3>${strategy.name}</h3>
          <div class="difficulty">难度：${strategy.difficulty}</div>
        </div>
      </div>
      <p class="strategy-desc">${strategy.desc}</p>
      <div class="strategy-tags">
        ${strategy.tags.map(tag => `<span class="strategy-tag ${tag.level}">${tag.label}</span>`).join("")}
      </div>
    `;
    card.addEventListener("click", () => selectStrategy(strategy.id));
    strategyCardsEl.appendChild(card);
  });
}

function selectStrategy(strategyId) {
  schedulingState.active = true;
  schedulingState.selectedStrategy = strategyId;
  renderStrategyCards();
  const strategy = STRATEGY_TEMPLATES[strategyId];
  if (!strategy) return;
  const level = getCurrentLevel();
  const goodKeys = getCurrentLevelGoodKeys();
  const totalTicks = Math.ceil(level.duration / 5);
  const curve = strategy.generateCurve(totalTicks, goodKeys);
  schedulingState.generatedCurve = curve;
  const expectedStats = calculateExpectedStats(curve, goodKeys, level);
  schedulingState.expectedStats = expectedStats;
  const previewData = generatePreviewData(curve, expectedStats, goodKeys, strategy);
  schedulingState.previewData = previewData;
  renderPreview(previewData, strategy, goodKeys);
  schedulingPreviewEl.classList.remove("hidden");
  schedulingBackBtn.classList.remove("hidden");
  schedulingStartBtn.classList.remove("hidden");
  schedulingSkipBtn.classList.add("hidden");
}

function calculateExpectedStats(curve, goodKeys, level) {
  let totalExpectedCustomers = 0;
  const expectedDemandByGood = {};
  goodKeys.forEach(key => expectedDemandByGood[key] = 0);
  let maxIntensity = 0;
  let pressureTicks = 0;
  curve.forEach((segment, idx) => {
    const arrivalRate = level.customerBaseGap > 0 ? segment.intensity / level.customerBaseGap : segment.intensity;
    const expectedCount = Math.max(0, Math.round(arrivalRate * 1.2));
    totalExpectedCustomers += expectedCount;
    if (segment.intensity > maxIntensity) maxIntensity = segment.intensity;
    if (segment.intensity >= 1.3) pressureTicks++;
    goodKeys.forEach(key => {
      const weight = segment.goodWeights[key] || 1;
      const totalWeight = goodKeys.reduce((sum, k) => sum + (segment.goodWeights[k] || 1), 0);
      expectedDemandByGood[key] += Math.round(expectedCount * (weight / totalWeight));
    });
  });
  const avgPressure = curve.reduce((sum, s) => sum + s.intensity, 0) / curve.length;
  let overallRisk;
  if (avgPressure < 0.9 && pressureTicks < curve.length * 0.2) {
    overallRisk = { label: "低", level: "low" };
  } else if (avgPressure < 1.2 && pressureTicks < curve.length * 0.4) {
    overallRisk = { label: "中", level: "medium" };
  } else {
    overallRisk = { label: "高", level: "high" };
  }
  return {
    totalExpectedCustomers,
    expectedDemandByGood,
    maxIntensity,
    avgPressure,
    pressureTicks,
    overallRisk,
    curveLength: curve.length
  };
}

function generatePreviewData(curve, stats, goodKeys, strategy) {
  const segments = 20;
  const ticksPerSegment = Math.max(1, Math.ceil(curve.length / segments));
  const curveBars = [];
  for (let i = 0; i < segments; i++) {
    const start = i * ticksPerSegment;
    const end = Math.min(curve.length, start + ticksPerSegment);
    let sum = 0;
    for (let j = start; j < end; j++) {
      sum += curve[j].intensity;
    }
    const avg = sum / (end - start);
    let level = 1;
    if (avg < 0.6) level = 1;
    else if (avg < 0.85) level = 2;
    else if (avg < 1.1) level = 3;
    else if (avg < 1.4) level = 4;
    else if (avg < 1.8) level = 5;
    else level = 6;
    curveBars.push({ level, intensity: avg });
  }
  const goodDemandList = goodKeys.map(key => {
    const demand = stats.expectedDemandByGood[key] || 0;
    const total = Object.values(stats.expectedDemandByGood).reduce((a, b) => a + b, 0) || 1;
    const ratio = demand / total;
    let level;
    if (ratio < 0.25) level = "low";
    else if (ratio < 0.4) level = "medium";
    else level = "high";
    return { key, demand, ratio, level };
  });
  return { curveBars, goodDemandList };
}

function renderPreview(previewData, strategy, goodKeys) {
  const stats = schedulingState.expectedStats;
  previewSummaryEl.innerHTML = `
    <div class="preview-stat">
      <span class="preview-stat-label">预期顾客数</span>
      <span class="preview-stat-value">约 ${stats.totalExpectedCustomers} 位</span>
    </div>
    <div class="preview-stat">
      <span class="preview-stat-label">整体压力</span>
      <span class="preview-stat-value risk-${stats.overallRisk.level}">${stats.overallRisk.label}风险</span>
    </div>
    <div class="preview-stat">
      <span class="preview-stat-label">高峰时段数</span>
      <span class="preview-stat-value risk-${stats.pressureTicks > stats.curveLength * 0.3 ? "high" : stats.pressureTicks > stats.curveLength * 0.15 ? "medium" : "low"}">${stats.pressureTicks} 格</span>
    </div>
  `;
  previewCurveEl.innerHTML = `
    <p class="curve-title"><span>客流强度趋势</span><span>营业开始 → 结束</span></p>
    <div class="curve-chart">
      ${previewData.curveBars.map(bar => `<div class="curve-bar level-${bar.level}" title="强度: ${bar.intensity.toFixed(2)}"></div>`).join("")}
    </div>
    <div class="curve-labels">
      <span>开场</span>
      <span>1/4</span>
      <span>中段</span>
      <span>3/4</span>
      <span>打烊</span>
    </div>
  `;
  previewGoodsEl.innerHTML = previewData.goodDemandList.map(item => {
    const good = goods[item.key];
    const percent = Math.round(item.ratio * 100);
    return `
      <div class="good-demand-row">
        <div class="good-demand-icon">${good.icon}</div>
        <div class="good-demand-name">${good.name}</div>
        <div class="good-demand-bar">
          <div class="good-demand-fill ${item.level}" style="width:${percent}%"></div>
        </div>
        <div class="good-demand-label ${item.level}">约 ${item.demand} 份</div>
      </div>
    `;
  }).join("");
  previewTipsEl.innerHTML = `
    <p class="preview-tips-title">💡 排班建议（${strategy.name}）</p>
    <ul>
      ${strategy.tips.map(tip => `<li>${tip}</li>`).join("")}
    </ul>
  `;
}

function backToStrategySelection() {
  schedulingState.active = false;
  schedulingState.selectedStrategy = null;
  schedulingState.generatedCurve = null;
  schedulingState.previewData = null;
  schedulingState.expectedStats = null;
  renderStrategyCards();
  schedulingPreviewEl.classList.add("hidden");
  schedulingBackBtn.classList.add("hidden");
  schedulingStartBtn.classList.add("hidden");
  schedulingSkipBtn.classList.remove("hidden");
}

function skipSchedulingChallenge() {
  schedulingState.active = false;
  schedulingState.selectedStrategy = null;
  schedulingState.generatedCurve = null;
  schedulingState.previewData = null;
  schedulingState.expectedStats = null;
  closeSchedulingOverlay();
  startGame();
}

function startWithSchedulingStrategy() {
  if (!schedulingState.selectedStrategy || !schedulingState.generatedCurve) return;
  schedulingState.actualStats = {
    customersByTick: new Array(schedulingState.generatedCurve.length).fill(0),
    demandByGood: {},
    totalServed: 0,
    totalMissed: 0
  };
  getCurrentLevelGoodKeys().forEach(key => {
    schedulingState.actualStats.demandByGood[key] = 0;
  });
  closeSchedulingOverlay();
  if (training.active) {
    startGameWithTrainingConfig();
  } else {
    startGame();
  }
}

function bindSchedulingControls() {
  if (schedulingBackBtn) {
    schedulingBackBtn.addEventListener("click", backToStrategySelection);
  }
  if (schedulingStartBtn) {
    schedulingStartBtn.addEventListener("click", startWithSchedulingStrategy);
  }
  if (schedulingSkipBtn) {
    schedulingSkipBtn.addEventListener("click", skipSchedulingChallenge);
  }
  if (schedulingOverlay) {
    schedulingOverlay.addEventListener("click", (e) => {
      if (e.target === schedulingOverlay && !schedulingState.selectedStrategy) {
        closeSchedulingOverlay();
      }
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !schedulingOverlay.classList.contains("hidden")) {
      if (schedulingState.selectedStrategy) {
        backToStrategySelection();
      } else {
        closeSchedulingOverlay();
      }
    }
  });
}

function getCurveSegmentForTick(tickIndex) {
  if (!schedulingState.generatedCurve) return null;
  const idx = Math.max(0, Math.min(tickIndex, schedulingState.generatedCurve.length - 1));
  return schedulingState.generatedCurve[idx];
}

function recordActualCustomer(goodKey, tickIndex, served) {
  if (!schedulingState.active || !schedulingState.generatedCurve) return;
  const idx = Math.max(0, Math.min(tickIndex, schedulingState.actualStats.customersByTick.length - 1));
  schedulingState.actualStats.customersByTick[idx] += 1;
  if (schedulingState.actualStats.demandByGood[goodKey] !== undefined) {
    schedulingState.actualStats.demandByGood[goodKey] += 1;
  }
  if (served) {
    schedulingState.actualStats.totalServed += 1;
  } else {
    schedulingState.actualStats.totalMissed += 1;
  }
}

function renderLog() {
  logEl.innerHTML = "";
  state.log.forEach((entry) => {
    const p = document.createElement("p");
    p.textContent = entry;
    logEl.appendChild(p);
  });
}

function openTrainingOverlay() {
  if (state.running || editor.active) {
    addLog("游戏进行中或编辑模式下无法进入训练模式。");
    return;
  }
  training.selectedThemeId = null;
  renderTrainingThemeList();
  renderTrainingInfo(null);
  populateTrainingLevelSelect();
  trainingStartBtn.disabled = true;
  trainingStartBtn.classList.add("disabled");
  trainingOverlay.classList.remove("hidden");
}

function closeTrainingOverlay() {
  trainingOverlay.classList.add("hidden");
}

function populateTrainingLevelSelect() {
  if (!trainingLevelSelect) return;
  trainingLevelSelect.innerHTML = "";
  levels.forEach(lv => {
    const opt = document.createElement("option");
    opt.value = lv.id;
    opt.textContent = `${lv.icon} ${lv.name}`;
    if (lv.id === currentLevelId) opt.selected = true;
    trainingLevelSelect.appendChild(opt);
  });
}

function renderTrainingThemeList() {
  trainingThemeListEl.innerHTML = "";
  Object.values(TRAINING_THEMES).forEach(theme => {
    const card = document.createElement("div");
    card.className = `training-theme-card ${training.selectedThemeId === theme.id ? "selected" : ""}`;
    card.innerHTML = `
      <div class="training-theme-header">
        <div class="training-theme-icon">${theme.icon}</div>
        <div class="training-theme-title">
          <strong>${theme.name}</strong>
          <div class="training-theme-difficulty">难度：<span class="difficulty-tag ${theme.difficulty}">${theme.difficultyLabel}</span></div>
        </div>
      </div>
      <p class="training-theme-desc">${theme.shortDesc}</p>
    `;
    card.addEventListener("click", () => selectTrainingTheme(theme.id));
    trainingThemeListEl.appendChild(card);
  });
}

function selectTrainingTheme(themeId) {
  training.selectedThemeId = themeId;
  renderTrainingThemeList();
  renderTrainingInfo(themeId);
  trainingStartBtn.disabled = false;
  trainingStartBtn.classList.remove("disabled");
}

function renderTrainingInfo(themeId) {
  if (!themeId) {
    trainingInfoEl.innerHTML = `<div class="training-info-empty">← 选择左侧主题查看详情</div>`;
    return;
  }
  const theme = TRAINING_THEMES[themeId];
  if (!theme) return;

  const objectivesHtml = theme.objectives.map(obj => `<li>${obj}</li>`).join("");
  const tipsHtml = theme.tips.map(tip => `
    <div class="training-tip-card">
      <h5>${tip.title}</h5>
      <p>${tip.content}</p>
    </div>
  `).join("");

  trainingInfoEl.innerHTML = `
    <div class="training-info-header">
      <div class="training-info-icon">${theme.icon}</div>
      <div class="training-info-title">
        <h3>${theme.name}</h3>
        <span class="difficulty-tag ${theme.difficulty}">${theme.difficultyLabel}</span>
      </div>
    </div>
    <div class="training-info-section">
      <h4>📝 训练简介</h4>
      <p>${theme.description}</p>
    </div>
    <div class="training-info-section">
      <h4>🎯 练习目标</h4>
      <ul>${objectivesHtml}</ul>
    </div>
    <div class="training-info-section">
      <h4>💡 技巧提示</h4>
      ${tipsHtml}
    </div>
  `;
}

function startTrainingSession() {
  if (!training.selectedThemeId) return;

  const theme = TRAINING_THEMES[training.selectedThemeId];
  const selectedLevelId = parseInt(trainingLevelSelect.value, 10) || currentLevelId;

  training.originalLevelId = currentLevelId;
  currentLevelId = selectedLevelId;
  training.levelId = selectedLevelId;
  training.themeId = theme.id;
  training.active = true;

  state = freshState(true);
  closeTrainingOverlay();

  trainingBanner.classList.remove("hidden");
  trainingBannerThemeEl.textContent = `练习主题：${theme.name}`;
  boardEl.classList.add("training-mode");

  if (theme.id === "scheduling" && theme.config.showPreview) {
    openSchedulingForTraining();
  } else {
    startGameWithTrainingConfig();
  }
  addLog(`🎯 进入训练模式：${theme.name}。练习数据不计入店员经验和累计销量。`);
}

function openSchedulingForTraining() {
  const strategy = TRAINING_THEMES[training.themeId]?.config?.forceStrategy || "peakFocused";
  schedulingState.active = true;
  schedulingState.selectedStrategy = null;
  schedulingState.generatedCurve = null;
  schedulingState.expectedStats = null;
  schedulingState.previewData = null;
  schedulingState.actualStats = null;
  strategyCardsEl.innerHTML = "";
  schedulingPreviewEl.classList.add("hidden");
  schedulingBackBtn.classList.add("hidden");
  schedulingStartBtn.classList.add("hidden");
  schedulingSkipBtn.classList.add("hidden");
  schedulingOverlay.classList.remove("hidden");
  renderStrategyCards();
  setTimeout(() => {
    if (strategyCardsEl.children.length > 0) {
      const cards = strategyCardsEl.querySelectorAll(".strategy-card");
      const targetCard = Array.from(cards).find(c => c.dataset.id === strategy) || cards[0];
      if (targetCard) {
        targetCard.classList.add("selected");
        schedulingState.selectedStrategy = targetCard.dataset.id;
        generatePreviewForStrategy();
      }
    }
  }, 50);
}

function startGameWithTrainingConfig() {
  const theme = TRAINING_THEMES[training.themeId];
  if (!theme) {
    startGame();
    return;
  }
  const originalStart = startBtn.disabled;
  startBtn.disabled = true;
  resultEl.classList.add("hidden");
  state.running = true;
  state.log = [`🎯 训练模式：${theme.name} 开始！加油练习吧！`];
  state.goals = generateNightGoals();
  render();
  renderGoals();
  if (!timer) {
    timer = setInterval(tick, getCurrentLevel().tickInterval);
  }
}

function exitTrainingSession(showResult = true) {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  const finalState = {
    sales: state.sales,
    misses: state.misses,
    energy: state.energy,
    served: state.customers.servedCount,
    missed: state.customers.missedCount,
    eventsTriggered: (state.events.history || []).length
  };

  training.active = false;
  training.themeId = null;
  trainingBanner.classList.add("hidden");
  boardEl.classList.remove("training-mode");
  resetAllEventEffects();
  activeEventsEl.classList.add("hidden");
  eventBanner.classList.add("hidden");
  appShellEl.classList.remove("energy-high-drain");
  currentLevelId = training.originalLevelId || 1;
  training.originalLevelId = null;

  state = freshState(false);
  renderCrates();
  renderLevelName();
  renderClerkBadge();
  render();
  renderGoals();

  if (showResult) {
    showTrainingResult(finalState);
  }
}

function showTrainingResult(data) {
  const theme = training.selectedThemeId ? TRAINING_THEMES[training.selectedThemeId] : null;
  const themeName = theme ? theme.name : "训练";
  const totalCustomers = data.served + data.missed;
  const serviceRate = totalCustomers > 0 ? Math.round((data.served / totalCustomers) * 100) : 100;
  const baseScore = Math.max(0, data.sales + data.energy * 2 - data.misses * 15);
  const finalScore = baseScore + (serviceRate >= 70 ? 50 : 0);

  trainingResultBodyEl.innerHTML = `
    <div class="training-result-summary">
      <div class="training-result-theme">${themeName}</div>
      <div class="training-result-score">${finalScore}</div>
      <div class="training-result-label">训练评分</div>
    </div>
    <div class="training-result-stats">
      <div class="training-stat-card">
        <div class="training-stat-value">¥${data.sales}</div>
        <div class="training-stat-name">销售额</div>
      </div>
      <div class="training-stat-card">
        <div class="training-stat-value">${data.misses}</div>
        <div class="training-stat-name">缺货次数</div>
      </div>
      <div class="training-stat-card">
        <div class="training-stat-value">${data.served}</div>
        <div class="training-stat-name">服务顾客</div>
      </div>
      <div class="training-stat-card">
        <div class="training-stat-value">${serviceRate}%</div>
        <div class="training-stat-name">服务率</div>
      </div>
    </div>
    <div class="training-isolation-notice">
      <p><strong>🔒 数据已隔离</strong></p>
      <p>本次训练的销售数据未计入「经营手册」累计销量，店员经验也未获得增长。</p>
      <p>回到正式营业模式后，所有数据继续正常累积。</p>
    </div>
  `;
  trainingResultOverlay.classList.remove("hidden");
}

function closeTrainingResultOverlay() {
  trainingResultOverlay.classList.add("hidden");
}

function retryTraining() {
  closeTrainingResultOverlay();
  setTimeout(() => {
    training.selectedThemeId = training.selectedThemeId;
    startTrainingSession();
  }, 80);
}

function backToTrainingThemes() {
  closeTrainingResultOverlay();
  setTimeout(() => {
    openTrainingOverlay();
  }, 80);
}

function bindTrainingControls() {
  if (trainingBtn) {
    trainingBtn.addEventListener("click", openTrainingOverlay);
  }
  if (trainingCloseBtn) {
    trainingCloseBtn.addEventListener("click", closeTrainingOverlay);
  }
  if (trainingOverlay) {
    trainingOverlay.addEventListener("click", (e) => {
      if (e.target === trainingOverlay) closeTrainingOverlay();
    });
  }
  if (trainingStartBtn) {
    trainingStartBtn.addEventListener("click", startTrainingSession);
  }
  if (trainingExitBtn) {
    trainingExitBtn.addEventListener("click", () => {
      if (confirm("确定要退出当前训练吗？训练进度将不会保存。")) {
        exitTrainingSession(true);
      }
    });
  }
  if (trainingResultCloseBtn) {
    trainingResultCloseBtn.addEventListener("click", closeTrainingResultOverlay);
  }
  if (trainingResultOverlay) {
    trainingResultOverlay.addEventListener("click", (e) => {
      if (e.target === trainingResultOverlay) closeTrainingResultOverlay();
    });
  }
  if (trainingRetryBtn) {
    trainingRetryBtn.addEventListener("click", retryTraining);
  }
  if (trainingBackBtn) {
    trainingBackBtn.addEventListener("click", backToTrainingThemes);
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!trainingOverlay.classList.contains("hidden")) closeTrainingOverlay();
      if (!trainingResultOverlay.classList.contains("hidden")) closeTrainingResultOverlay();
    }
  });
}

function getTrainingConfigOverride(key, defaultValue) {
  if (!training.active || !training.themeId) return defaultValue;
  const theme = TRAINING_THEMES[training.themeId];
  if (!theme || !theme.config) return defaultValue;
  if (theme.config[key] !== undefined && theme.config[key] !== null) {
    return theme.config[key];
  }
  const multiplierKey = key + 'Multiplier';
  if (theme.config[multiplierKey] !== undefined && theme.config[multiplierKey] !== null && defaultValue !== undefined) {
    if (Number.isInteger(defaultValue)) {
      return Math.max(1, Math.round(defaultValue * theme.config[multiplierKey]));
    }
    return defaultValue * theme.config[multiplierKey];
  }
  return defaultValue;
}

init();
