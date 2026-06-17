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
  render();
}

function bindControls() {
  startBtn.addEventListener("click", startGame);
  restartBtn.addEventListener("click", resetGame);
  actionBtn.addEventListener("click", interact);
  document.getElementById("upBtn").addEventListener("click", () => move(0, -1));
  document.getElementById("downBtn").addEventListener("click", () => move(0, 1));
  document.getElementById("leftBtn").addEventListener("click", () => move(-1, 0));
  document.getElementById("rightBtn").addEventListener("click", () => move(1, 0));
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
      return;
    }
    const dir = keyMap[event.key];
    if (dir) {
      event.preventDefault();
      move(dir[0], dir[1]);
    }
  });
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
    });
    crateButtonsEl.appendChild(button);
  });
}

function startGame() {
  if (state.running) return;
  state.running = true;
  resultEl.classList.add("hidden");
  addLog("营业开始，顾客陆续进店。");
  timer = setInterval(tick, 1200);
  render();
}

function resetGame() {
  clearInterval(timer);
  state = freshState();
  resultEl.classList.add("hidden");
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
  const score = Math.max(0, state.sales + state.energy * 2 - state.misses * 15);
  resultEl.innerHTML = `<h2>${reason}</h2><p>最终销售额${state.sales}，缺货${state.misses}次，剩余体力${state.energy}，评分${score}。</p>`;
  resultEl.classList.remove("hidden");
  addLog("结算完成，可以重新开始。");
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
