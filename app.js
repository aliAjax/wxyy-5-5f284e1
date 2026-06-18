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

const eventBanner = document.getElementById("eventBanner");
const eventBannerIcon = document.getElementById("eventBannerIcon");
const eventBannerTitle = document.getElementById("eventBannerTitle");
const eventBannerDesc = document.getElementById("eventBannerDesc");
const activeEventsEl = document.getElementById("activeEvents");
const appShellEl = document.querySelector(".app-shell");

const codexState = {
  selectedGood: null
};

const eventTemplates = {
  hotDrinkSurge: {
    id: "hotDrinkSurge",
    name: "热饮需求暴涨",
    type: "demand",
    icon: "☕",
    startTitle: "☕ 热饮需求暴涨！",
    startDesc: "深夜寒风来袭，顾客对热饮的需求大幅增加！",
    endTitle: "✅ 热饮热潮消退",
    endDesc: "天气回暖，顾客对热饮的需求恢复正常。",
    minDuration: 4,
    maxDuration: 7,
    effect: { goodKey: "drink", demandMultiplier: 2.5 },
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
    startTitle: "🍜 泡面货架故障！",
    startDesc: "泡面货架突然出了问题，暂时无法取货和补货！",
    endTitle: "✅ 泡面货架修复",
    endDesc: "经过临时抢修，泡面货架恢复正常使用。",
    minDuration: 3,
    maxDuration: 5,
    effect: { targetGood: "noodle", blockShelf: true },
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
    startTitle: "📦 仓库短暂断货！",
    startDesc: "物流延迟，仓库暂时无法取出任何货物！",
    endTitle: "✅ 仓库到货",
    endDesc: "补给车终于赶到，仓库恢复正常取货。",
    minDuration: 3,
    maxDuration: 5,
    effect: { blockWarehouse: true },
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
    startTitle: "💤 疲惫袭来！",
    startDesc: "深夜困倦来袭，所有行动的体力消耗翻倍！",
    endTitle: "✅ 精神恢复",
    endDesc: "一阵凉风吹过，你的精神稍微恢复了一些。",
    minDuration: 4,
    maxDuration: 6,
    effect: { energyMultiplier: 2 },
    log: {
      start: "💤 突发：深夜困倦袭来，移动、拿货、补货的体力消耗全部翻倍！",
      end: "✅ 一阵冷风让你清醒过来，体力消耗恢复正常。"
    }
  }
};

const EVENT_TRIGGER_CONFIG = {
  minStartTick: 2,
  minGapBetweenEvents: 4,
  maxActiveEvents: 2,
  baseTriggerChance: 0.22,
  lateGameChanceBoost: 0.15
};

let eventBannerTimer = null;

function getAvailableEventTemplates() {
  const activeIds = (state.events.active || []).map(e => e.id);
  return Object.values(eventTemplates).filter(t => !activeIds.includes(t.id));
}

function canTriggerEvent() {
  const level = getCurrentLevel();
  const totalTicks = Math.floor(level.duration / 5);
  const currentTick = Math.floor(state.minute / 5);
  const activeCount = (state.events.active || []).length;

  if (currentTick < EVENT_TRIGGER_CONFIG.minStartTick) return false;
  if (activeCount >= EVENT_TRIGGER_CONFIG.maxActiveEvents) return false;
  if (state.events.lastTriggeredTick !== null &&
      currentTick - state.events.lastTriggeredTick < EVENT_TRIGGER_CONFIG.minGapBetweenEvents) return false;
  if (getAvailableEventTemplates().length === 0) return false;
  if (currentTick >= totalTicks - 2) return false;
  return true;
}

function calculateTriggerChance() {
  const level = getCurrentLevel();
  const totalTicks = Math.floor(level.duration / 5);
  const currentTick = Math.floor(state.minute / 5);
  const progress = currentTick / totalTicks;
  let chance = EVENT_TRIGGER_CONFIG.baseTriggerChance;
  if (progress > 0.5) chance += EVENT_TRIGGER_CONFIG.lateGameChanceBoost;
  if (progress > 0.75) chance += EVENT_TRIGGER_CONFIG.lateGameChanceBoost * 0.5;
  return chance;
}

function tryTriggerRandomEvent() {
  if (!canTriggerEvent()) return;
  const chance = calculateTriggerChance();
  if (Math.random() > chance) return;

  const available = getAvailableEventTemplates();
  const template = available[Math.floor(Math.random() * available.length)];
  startEvent(template);
}

function startEvent(template) {
  const duration = template.minDuration +
    Math.floor(Math.random() * (template.maxDuration - template.minDuration + 1));
  const currentTick = Math.floor(state.minute / 5);

  const event = {
    id: template.id,
    templateId: template.id,
    name: template.name,
    type: template.type,
    icon: template.icon,
    startTick: currentTick,
    endTick: currentTick + duration,
    duration: duration,
    effect: { ...template.effect }
  };

  state.events.active.push(event);
  state.events.lastTriggeredTick = currentTick;
  state.events.history.push({
    id: template.id,
    name: template.name,
    startTick: currentTick,
    ended: false
  });

  addLog(template.log.start);
  showEventBanner(template.startTitle, template.startDesc, template.type, false, template.icon);
  applyEventVisualEffects(template, true);
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

function applyEventVisualEffects(template, apply) {
  if (!state || !state.shelves) return;
  switch (template.id) {
    case "noodleShelfBroken":
      state.shelves.forEach(shelf => {
        if (shelf.good === "noodle") {
          shelf._broken = apply;
        }
      });
      break;
    case "warehouseShortage":
      state.warehouseBlocked = apply;
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
  const shelfEvents = getActiveEventsByType("shelf");
  for (const event of shelfEvents) {
    if (event.effect.blockShelf && shelf.good === event.effect.targetGood) {
      return true;
    }
  }
  return false;
}

function isWarehouseBlocked() {
  if (state.warehouseBlocked) return true;
  return getActiveEventsByType("warehouse").length > 0;
}

function getEnergyMultiplier() {
  let multiplier = 1;
  const energyEvents = getActiveEventsByType("energy");
  energyEvents.forEach(event => {
    multiplier *= event.effect.energyMultiplier;
  });
  return multiplier;
}

function renderActiveEvents() {
  if (!activeEventsEl) return;
  const active = state.events.active || [];
  if (active.length === 0) {
    activeEventsEl.classList.add("hidden");
    return;
  }
  activeEventsEl.classList.remove("hidden");
  activeEventsEl.innerHTML = "";
  const currentTick = Math.floor(state.minute / 5);

  active.forEach(event => {
    const remaining = Math.max(0, event.endTick - currentTick);
    const total = event.duration;
    const elapsed = total - remaining;
    const ratio = total > 0 ? Math.max(0, Math.min(100, ((total - elapsed) / total) * 100)) : 0;
    const template = eventTemplates[event.templateId];

    const card = document.createElement("div");
    card.className = `active-event-card type-${event.type}`;
    card.innerHTML = `
      <span class="active-event-icon">${event.icon}</span>
      <div class="active-event-info">
        <div class="active-event-name">${event.name}</div>
        <div class="active-event-remaining">
          <span>剩余 ${remaining} 格</span>
          <div class="active-event-bar"><span style="width:${ratio}%"></span></div>
        </div>
      </div>
    `;
    activeEventsEl.appendChild(card);
  });
}

function resetAllEventEffects() {
  if (state) {
    state.warehouseBlocked = false;
    if (state.shelves) {
      state.shelves.forEach(shelf => {
        shelf._broken = false;
      });
    }
  }
  document.body.classList.remove("energy-high-drain");
  if (eventBannerTimer) {
    clearTimeout(eventBannerTimer);
    eventBannerTimer = null;
  }
  if (eventBanner) eventBanner.classList.add("hidden");
  if (activeEventsEl) activeEventsEl.classList.add("hidden");
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

function loadClerkData() {
  const saved = localStorage.getItem("clerkData");
  if (saved) return JSON.parse(saved);
  return { exp: 0, level: 1 };
}

function saveClerkData(data) {
  localStorage.setItem("clerkData", JSON.stringify(data));
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

function freshState() {
  const savedSalesCount = localStorage.getItem("codexSalesCount");
  const salesCount = savedSalesCount ? JSON.parse(savedSalesCount) : {};
  const level = getCurrentLevel();
  return {
    running: false,
    minute: 0,
    energy: 100,
    sales: 0,
    misses: 0,
    player: { ...level.playerStart },
    carry: [],
    selected: getCurrentLevelGoodKeys()[0],
    shelves: level.shelves.map((shelf) => ({ ...shelf, _broken: false })),
    log: ["卷帘门半开，夜班还没开始。"],
    salesCount: {
      snack: salesCount.snack || 0,
      drink: salesCount.drink || 0,
      noodle: salesCount.noodle || 0
    },
    sessionSalesCount: {
      snack: 0,
      drink: 0,
      noodle: 0
    },
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
      lastTriggeredTick: null
    },
    warehouseBlocked: false
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
    const item = document.createElement("div");
    item.className = `codex-list-item ${codexState.selectedGood === key ? "active" : ""}`;
    const unlocked = count >= 1;
    if (!unlocked) {
      item.classList.add("locked");
    }
    item.innerHTML = `
      <div class="codex-item-icon">${unlocked ? good.icon : "❓"}</div>
      <div class="codex-item-info">
        <strong>${unlocked ? good.name : "???"}</strong>
        <span>累计售出：${count}</span>
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
    codexDetailEl.innerHTML = `<p class="codex-empty">选择左侧商品查看详情</p>`;
    return;
  }

  const good = goods[goodKey];
  const count = state.salesCount[goodKey] || 0;
  const unlocked = count >= 1;
  const unlockedTexts = getUnlockedTexts(goodKey, count);
  const nextUnlock = getNextUnlock(goodKey, count);
  const compatShelves = getCompatShelves(goodKey);

  codexDetailEl.innerHTML = `
    <div class="codex-detail-header">
      <div class="codex-detail-icon ${!unlocked ? 'locked' : ''}">${unlocked ? good.icon : '❓'}</div>
      <div>
        <h3 class="${!unlocked ? 'locked-text' : ''}">${unlocked ? good.name : '???'}</h3>
        ${unlocked ? `<p class="codex-desc">${good.desc}</p>` : `<p class="codex-hint">还没卖过这件商品，卖出 1 件即可解锁商品介绍。</p>`}
      </div>
    </div>
    <div class="codex-stats">
      <div class="codex-stat">
        <span class="codex-stat-label">售价</span>
        <span class="codex-stat-value">¥${good.price}</span>
      </div>
      <div class="codex-stat">
        <span class="codex-stat-label">适配货架</span>
        <span class="codex-stat-value">${compatShelves}</span>
      </div>
      <div class="codex-stat">
        <span class="codex-stat-label">补货收益</span>
        <span class="codex-stat-value">+${good.restockGain} 件/次</span>
      </div>
      <div class="codex-stat">
        <span class="codex-stat-label">缺货影响</span>
        <span class="codex-stat-value">-${good.missPenalty} 评分</span>
      </div>
      <div class="codex-stat full">
        <span class="codex-stat-label">累计销量</span>
        <span class="codex-stat-value">${count} 件</span>
      </div>
    </div>
    <div class="codex-unlocks">
      <h4>解锁记录</h4>
      ${unlockedTexts.length > 0 ? unlockedTexts.map((t) => `<div class="codex-unlock-item unlocked">✓ ${t.text}</div>`).join("") : ""}
      ${nextUnlock ? `<div class="codex-unlock-item next">还差 ${nextUnlock.threshold - count} 件解锁：${nextUnlock.text}</div>` : `<div class="codex-unlock-item max">已解锁全部记录！</div>`}
    </div>
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

  const activeEffects = getUnlockedAbilities();
  const effectsHtml = activeEffects.length > 0 ? `
    <div class="clerk-effects">
      <h4>当前生效能力</h4>
      ${activeEffects.map(id => {
        const cl = clerkLevels.find(c => c.ability && c.ability.id === id);
        if (!cl) return '';
        let effectDetail = '';
        switch (id) {
          case 'moveSave': effectDetail = '移动消耗体力：0'; break;
          case 'restockBonus': effectDetail = '补货数量：+3件/次'; break;
          case 'earlyAlert': effectDetail = '低库存提醒阈值：50%'; break;
          case 'dualCarry': effectDetail = '可携带：2箱货物'; break;
        }
        return `<div class="clerk-effect-item">💡 ${cl.ability.name} — ${effectDetail}</div>`;
      }).join('')}
    </div>
  ` : '<div class="clerk-effects"><h4>当前生效能力</h4><div class="clerk-effect-empty">暂无能力，继续努力升级吧！</div></div>';

  clerkBodyEl.innerHTML = `
    <div class="clerk-profile">
      <div class="clerk-profile-icon">${info.icon}</div>
      <div class="clerk-profile-info">
        <div class="clerk-profile-title">${info.title} <span class="clerk-profile-lv">Lv.${info.level}</span></div>
        ${expBarHtml}
      </div>
    </div>
    <div class="clerk-abilities">
      <h4>能力列表</h4>
      ${abilitiesHtml}
    </div>
    ${effectsHtml}
  `;
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
      state = freshState();
      resultEl.classList.add("hidden");
      addLog(`已选择关卡：${level.icon} ${level.name}。点击「开始营业」开始游戏。`);
      updateEditorUI();
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
  updateEditorUI();
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
      startGame();
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
    if (carrying || full) button.disabled = true;
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
  for (let i = 0; i < level.incomingPreview; i++) {
    generateIncomingCustomer();
  }
  addLog("营业开始，顾客陆续进店。");
  addLog("🎯 本次夜班目标已生成：");
  state.goals.forEach((g, i) => {
    addLog(`  ${i + 1}. ${g.title}（奖励 +${g.reward}分）`);
  });
  updateGoalProgress();
  if (!tutorial.active) {
    timer = setInterval(tick, level.tickInterval);
  }
  render();
}

function resetGame() {
  clearInterval(timer);
  timer = null;
  resetAllEventEffects();
  state = freshState();
  resultEl.classList.add("hidden");
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
  renderCrates();
  renderLevelName();
  render();
}

function tick() {
  if (!state.running) return;
  state.minute += 5;
  checkEventExpirations();
  tryTriggerRandomEvent();
  processCustomerQueue();
  updateGoalProgress();
  if (state.minute >= getCurrentLevel().duration) {
    finish("天快亮了，夜班结束。");
  }
  render();
}

function generateIncomingCustomer() {
  const level = getCurrentLevel();
  const goodKeys = getCurrentLevelGoodKeys();

  const weightedKeys = [];
  goodKeys.forEach(key => {
    const multiplier = getGoodDemandMultiplier(key);
    const weight = Math.round(multiplier * 10);
    for (let i = 0; i < weight; i++) {
      weightedKeys.push(key);
    }
  });
  const goodKey = weightedKeys[Math.floor(Math.random() * weightedKeys.length)];

  const lastArrival = state.customers.incoming.length > 0
    ? state.customers.incoming[state.customers.incoming.length - 1].arrivalTick
    : Math.floor(state.minute / 5);
  const baseGap = Math.max(1, level.customerBaseGap - Math.floor(state.minute / 40));
  const arrivalTick = lastArrival + baseGap + Math.floor(Math.random() * level.customerRandomRange);
  state.customers.incoming.push({
    id: state.customers.nextId++,
    goodKey: goodKey,
    arrivalTick: arrivalTick,
    maxWait: level.customerWaitMin + Math.floor(Math.random() * (level.customerWaitMax - level.customerWaitMin + 1))
  });
}

function processCustomerQueue() {
  const currentTick = Math.floor(state.minute / 5);
  const level = getCurrentLevel();

  const arrived = state.customers.incoming.filter(c => c.arrivalTick <= currentTick);
  arrived.forEach(customer => {
    if (state.customers.waiting.length < level.maxWaiting) {
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
      addLog(`👥 店内太拥挤，顾客#${customer.id}直接离开，计入缺货！`);
    }
  });
  state.customers.incoming = state.customers.incoming.filter(c => c.arrivalTick > currentTick);

  while (state.customers.incoming.length < level.incomingPreview) {
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
        const shelf = customer.targetShelfId ? state.shelves.find(s => s.id === customer.targetShelfId) : null;
        if (shelf) {
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
    const prevCount = state.salesCount[shelf.good] || 0;
    state.salesCount[shelf.good] = prevCount + 1;
    const prevSessionCount = state.sessionSalesCount[shelf.good] || 0;
    state.sessionSalesCount[shelf.good] = prevSessionCount + 1;
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
  if (!state.running) return;
  const level = getCurrentLevel();
  const nextX = Math.max(0, Math.min(level.mapCols - 1, state.player.x + dx));
  const nextY = Math.max(0, Math.min(level.mapRows - 1, state.player.y + dy));
  if (nextX === state.player.x && nextY === state.player.y) return;
  state.player.x = nextX;
  state.player.y = nextY;
  spendEnergy(hasAbility("moveSave") ? 0 : 1);
  render();
}

function interact() {
  if (!state.running) return;
  const level = getCurrentLevel();
  const shelf = shelfAt(state.player.x, state.player.y);
  if (state.player.x === level.warehousePos.x && state.player.y === level.warehousePos.y) {
    if (isWarehouseBlocked()) {
      addLog("📦 仓库暂时断货，无法取货！请等待仓库恢复。");
    } else if (state.carry.length >= maxCarryCount()) {
      addLog("手上已经拿满了。");
    } else if (state.carry.includes(state.selected)) {
      addLog("已经拿了一箱这种货。");
    } else {
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
        const restockAmount = hasAbility("restockBonus") ? 3 : 2;
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
  render();
}

function spendEnergy(amount) {
  const multiplier = getEnergyMultiplier();
  const actualAmount = Math.ceil(amount * multiplier);
  state.energy = Math.max(0, state.energy - actualAmount);
  updateGoalProgress();
  if (state.energy === 0) {
    finish("体力耗尽，夜班提前结束。");
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
  state.running = false;
  clearInterval(timer);
  timer = null;

  const remaining = state.customers.waiting.length;
  if (remaining > 0) {
    addLog(`🌙 打烊时间到！店内还有 ${remaining} 位顾客未买到商品，全部计入缺货。`);
    state.customers.waiting.forEach(customer => {
      state.misses += 1;
      state.customers.missedCount += 1;
      const good = goods[customer.goodKey];
      addLog(`🚪 顾客#${customer.id}因打烊离开，没买到${good.icon}${good.name}。`);
    });
    state.customers.waiting = [];
  }

  localStorage.setItem("codexSalesCount", JSON.stringify(state.salesCount));

  evaluateEndGoals();
  const baseScore = Math.max(0, state.sales + state.energy * 2 - state.misses * 15);
  const goalsBonus = calcGoalsBonus();
  const finalScore = baseScore + goalsBonus;
  const served = state.customers.servedCount;
  const missed = state.customers.missedCount;
  const total = served + missed;
  const serviceRate = total > 0 ? Math.round((served / total) * 100) : 100;

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
  const expGained = Math.max(10, Math.floor(finalScore * 0.3));
  clerkData.exp += expGained;

  let newLevel = 1;
  for (let i = clerkLevels.length - 1; i >= 0; i--) {
    if (clerkData.exp >= clerkLevels[i].expRequired) {
      newLevel = clerkLevels[i].level;
      break;
    }
  }
  clerkData.level = newLevel;
  saveClerkData(clerkData);

  const leveledUp = newLevel > prevLevel;
  const newAbility = leveledUp ? clerkLevels.find(cl => cl.level === newLevel) : null;

  const clerkInfo = getClerkLevelInfo(prevLevel);
  const nextLvl = getNextClerkLevel(prevLevel);
  const expHtml = `
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
      </div>
    </div>
  `;

  const eventHistory = state.events.history || [];
  const eventsHtml = eventHistory.length > 0 ? `
    <div class="result-goals">
      <h3>⚡ 经营事件记录</h3>
      <div class="result-goal-list">
        ${eventHistory.map(h => {
          const template = eventTemplates[h.id];
          const icon = template ? template.icon : '⚡';
          const duration = h.ended && h.endTick ? `（持续 ${h.endTick - h.startTick} 格）` : '（未结束）';
          return `
          <div class="result-goal-item" style="background:#f5efe0;">
            <span>${icon} ${h.name}</span>
            <span class="reward-tag">第 ${h.startTick} 格触发 ${duration}</span>
          </div>
        `}).join('')}
      </div>
    </div>
  ` : '';

  resetAllEventEffects();

  resultEl.innerHTML = `
    <h2>${reason}</h2>
    <p>最终销售额 ¥${state.sales}，缺货 ${state.misses} 次，剩余体力 ${state.energy}，基础评分 ${baseScore}。</p>
    ${statsHtml}
    ${goalsHtml}
    ${eventsHtml}
    ${expHtml}
    <p style="margin-top: 12px; font-size: 18px; font-weight: 700; color: #6b5a20;">最终综合评分：<strong>${finalScore}</strong>${goalsBonus > 0 ? `（含目标奖励 +${goalsBonus}）` : ''}</p>
  `;
  resultEl.classList.remove("hidden");
  addLog(`结算完成，服务${served}位顾客，流失${missed}位，基础分${baseScore}，目标奖励+${goalsBonus}，最终评分${finalScore}。获得${expGained}经验。${leveledUp ? '🎉 升级到' + clerkLevels.find(cl => cl.level === newLevel).title + '！' : ''}`);

  if (tutorial.active && tutorial.currentStep === 4) {
    checkTutorialAction("finish");
  }
}

function render() {
  clockEl.textContent = `0${Math.floor(state.minute / 60)}:${String(state.minute % 60).padStart(2, "0")}`;
  energyEl.textContent = state.energy;
  salesEl.textContent = state.sales;
  missesEl.textContent = state.misses;
  carryEl.textContent = state.carry.length > 0 ? state.carry.map(k => goods[k].name).join(" + ") : "空";
  startBtn.disabled = state.running;
  actionBtn.disabled = !state.running;
  changeLevelBtn.disabled = state.running;
  renderBoard();
  renderShelves();
  renderGoals();
  renderQueue();
  renderLog();
  renderClerkBadge();
  renderCrates();
  renderActiveEvents();

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
          const lowThreshold = hasAbility("earlyAlert") ? 50 : 35;
          if (shelfRatio <= lowThreshold) tile.classList.add("shelf-low");
          if (isShelfBlocked(shelf)) tile.classList.add("shelf-broken");
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
    sortedIncoming.slice(0, 6).forEach(customer => {
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
    const lowThreshold = hasAbility("earlyAlert") ? 50 : 35;
    const blocked = isShelfBlocked(shelf);
    const nameText = blocked
      ? `${shelf.id} ${goods[shelf.good].name} ⚠️故障`
      : `${shelf.id} ${goods[shelf.good].name}`;
    const stockText = blocked ? `无法使用` : `${shelf.stock}/${shelf.max}`;
    if (blocked) {
      card.style.borderColor = "#d45f4c";
      card.style.background = "#2a1e1e";
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

function renderLog() {
  logEl.innerHTML = "";
  state.log.forEach((entry) => {
    const p = document.createElement("p");
    p.textContent = entry;
    logEl.appendChild(p);
  });
}

init();
