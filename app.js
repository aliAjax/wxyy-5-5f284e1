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
const actionBtn = document.getElementById("actionBtn");

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

const goods = {
  snack: { name: "饭团", price: 12 },
  drink: { name: "热饮", price: 9 },
  noodle: { name: "泡面", price: 16 }
};

const baseShelves = [
  { id: "A", x: 2, y: 1, good: "snack", stock: 3, max: 5 },
  { id: "B", x: 5, y: 1, good: "drink", stock: 3, max: 5 },
  { id: "C", x: 2, y: 4, good: "noodle", stock: 2, max: 4 },
  { id: "D", x: 6, y: 4, good: "snack", stock: 2, max: 5 }
];

let state;
let timer;

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
        timer = setInterval(tick, 1200);
      }
      render();
    }
  }
];

function freshState() {
  return {
    running: false,
    minute: 0,
    energy: 100,
    sales: 0,
    misses: 0,
    player: { x: 0, y: 5 },
    carry: null,
    selected: "snack",
    shelves: baseShelves.map((shelf) => ({ ...shelf })),
    log: ["卷帘门半开，夜班还没开始。"]
  };
}

function init() {
  state = freshState();
  renderCrates();
  bindControls();
  bindTutorialControls();
  render();
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
  restartBtn.addEventListener("click", () => {
    showTutorialChoice(false);
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
      completed = state.player.x === 0 && state.player.y === 5;
      break;
    case "pickupGoods":
      completed = state.carry === tutorial.targetGood;
      break;
    case "restockShelf":
      const targetShelf = state.shelves.find(s => s.id === tutorial.targetShelfId);
      completed = targetShelf && targetShelf.stock >= 3 && !state.carry;
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
    timer = setInterval(tick, 1200);
  }

  render();
}

function renderCrates() {
  crateButtonsEl.innerHTML = "";
  Object.entries(goods).forEach(([key, good]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `拿${good.name}`;
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
  state.running = true;
  resultEl.classList.add("hidden");
  addLog("营业开始，顾客陆续进店。");
  if (!tutorial.active) {
    timer = setInterval(tick, 1200);
  }
  render();
}

function resetGame() {
  clearInterval(timer);
  timer = null;
  state = freshState();
  resultEl.classList.add("hidden");
  if (tutorial.active) {
    tutorial.active = false;
    tutorial.waitingForAction = false;
    tutorialOverlay.classList.add("hidden");
  }
  render();
}

function tick() {
  if (!state.running) return;
  state.minute += 5;
  customerVisit();
  if (state.minute >= 120) {
    finish("天快亮了，夜班结束。");
  }
  render();
}

function customerVisit() {
  const shelf = state.shelves[Math.floor(Math.random() * state.shelves.length)];
  if (shelf.stock > 0) {
    shelf.stock -= 1;
    state.sales += goods[shelf.good].price;
    addLog(`顾客买走了${goods[shelf.good].name}，${shelf.id}货架剩${shelf.stock}件。`);
  } else {
    state.misses += 1;
    addLog(`${shelf.id}货架缺${goods[shelf.good].name}，顾客空手离开。`);
  }
}

function move(dx, dy) {
  if (!state.running) return;
  const nextX = Math.max(0, Math.min(7, state.player.x + dx));
  const nextY = Math.max(0, Math.min(5, state.player.y + dy));
  if (nextX === state.player.x && nextY === state.player.y) return;
  state.player.x = nextX;
  state.player.y = nextY;
  spendEnergy(1);
  render();
}

function interact() {
  if (!state.running) return;
  const shelf = shelfAt(state.player.x, state.player.y);
  if (state.player.x === 0 && state.player.y === 5) {
    state.carry = state.selected;
    spendEnergy(2);
    addLog(`从仓库拿起一箱${goods[state.carry].name}。`);
  } else if (shelf) {
    if (!state.carry) {
      addLog("手上没有货箱。");
    } else if (state.carry !== shelf.good) {
      addLog(`${shelf.id}货架不收这种货。`);
    } else if (shelf.stock >= shelf.max) {
      addLog(`${shelf.id}货架已经满了。`);
    } else {
      shelf.stock = Math.min(shelf.max, shelf.stock + 2);
      state.carry = null;
      spendEnergy(4);
      addLog(`${shelf.id}货架补货完成。`);
    }
  } else {
    addLog("这里没有可处理的东西。");
  }
  render();
}

function spendEnergy(amount) {
  state.energy = Math.max(0, state.energy - amount);
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
  const score = Math.max(0, state.sales + state.energy * 2 - state.misses * 15);
  resultEl.innerHTML = `<h2>${reason}</h2><p>最终销售额${state.sales}，缺货${state.misses}次，剩余体力${state.energy}，评分${score}。</p>`;
  resultEl.classList.remove("hidden");
  addLog("结算完成，可以重新开始。");

  if (tutorial.active && tutorial.currentStep === 4) {
    checkTutorialAction("finish");
  }
}

function render() {
  clockEl.textContent = `0${Math.floor(state.minute / 60)}:${String(state.minute % 60).padStart(2, "0")}`;
  energyEl.textContent = state.energy;
  salesEl.textContent = state.sales;
  missesEl.textContent = state.misses;
  carryEl.textContent = state.carry ? goods[state.carry].name : "空";
  startBtn.disabled = state.running;
  actionBtn.disabled = !state.running;
  renderBoard();
  renderShelves();
  renderLog();

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
  for (let y = 0; y < 6; y += 1) {
    for (let x = 0; x < 8; x += 1) {
      const tile = document.createElement("div");
      tile.className = "tile";
      const label = document.createElement("span");
      label.className = "label";
      if (x === 0 && y === 5) {
        tile.classList.add("warehouse");
        label.textContent = "仓库";
      } else if (x === 7 && y === 0) {
        tile.classList.add("checkout");
        label.textContent = "收银";
      } else {
        const shelf = shelfAt(x, y);
        if (shelf) {
          tile.classList.add("shelf");
          label.textContent = `${shelf.id} ${goods[shelf.good].name} ${shelf.stock}/${shelf.max}`;
        }
      }
      if (state.player.x === x && state.player.y === y) {
        tile.classList.add("player");
      }
      tile.appendChild(label);
      boardEl.appendChild(tile);
    }
  }
}

function renderShelves() {
  shelfListEl.innerHTML = "";
  state.shelves.forEach((shelf) => {
    const card = document.createElement("div");
    card.className = "shelf-card";
    const ratio = Math.round((shelf.stock / shelf.max) * 100);
    card.innerHTML = `<strong>${shelf.id} ${goods[shelf.good].name}</strong><span>${shelf.stock}/${shelf.max}</span><div class="meter ${ratio <= 35 ? "low" : ""}"><span style="width:${ratio}%"></span></div>`;
    shelfListEl.appendChild(card);
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
