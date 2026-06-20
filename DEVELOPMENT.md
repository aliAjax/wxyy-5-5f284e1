# 深夜便利店补货 · 开发说明

> 三文件（index.html + style.css + app.js）零依赖浏览器小游戏，
> **直接双击 `index.html` 即可游玩**，无需任何构建或安装。
> 本说明针对需要本地开发、静态检查和自动化回归验证的场景。

---

## 目录结构

```
.
├── index.html              # 游戏主页面，直接双击即可玩
├── style.css               # 样式
├── app.js                  # 核心游戏逻辑（约 8700+ 行）
├── test.html               # 浏览器内自动化回归测试入口
├── package.json            # 统一命令入口（可选）
├── scripts/
│   ├── check.js            # 基础静态检查（语法、引用、存储 key 等）
│   ├── clear-storage-keys.js   # 生成 localStorage 清理片段
│   └── _storage_snippet.js     # 生成的：粘贴到控制台用于清理存储
└── DEVELOPMENT.md          # 本文件
```

---

## 1. 本地启动

### 方式 A：直接打开（推荐用户）

双击 `index.html`，任何现代浏览器都能运行。

### 方式 B：本地 HTTP 服务（推荐开发者）

因为 `test.html` 用 iframe 加载 `index.html`，**部分浏览器的 file:// 协议会限制 iframe**，所以回归测试必须走 HTTP。

```bash
# 用 npm 脚本（需要先写好 package.json，本项目已提供）
npm run start
# 或
npm run dev

# 或手动（本项目默认端口 19876）
python3 -m http.server 19876
```

启动后打开：

| 用途 | URL |
| --- | --- |
| 正常游玩 | http://localhost:19876/index.html |
| 自动化回归测试 | http://localhost:19876/test.html |

macOS 上可以用：

```bash
npm run app:open      # 打开游戏页
npm run test:open     # 打开测试页
```

---

## 2. 基础静态检查

用 node 运行 `scripts/check.js`，**零第三方依赖**，只使用 node 内置的 `vm` 模块做语法解析。

```bash
npm run check
# 或别名
npm run lint
```

检查项（对应脚本中的 P1–P6）：

| 阶段 | 内容 | 失败处理 |
| --- | --- | --- |
| **P1 文件完整性** | 检查 index.html/style.css/app.js/test.html 是否存在 | 中止，缺文件无法后续检查 |
| **P2 引用匹配** | 扫描 index.html 中的 `<script src>` / `<link href>`，验证目标文件存在，提示是否仍保留 `app.js` 的直接引用（保证双击能玩） | 中止 |
| **P3 JS 语法** | 用 V8 `new vm.Script(...)` 完整解析 app.js，捕获语法错误 | 中止，语法错误时后续静态扫描无意义 |
| **P4 localStorage key** | 正则扫出所有 `localStorage.getItem / setItem` 的字面量 key：检查**成对出现**（只有 set 没有 get 标错）、命名是否 camelCase | 不中止，记失败数 |
| **P5 存储常量** | 检查 `WEEK_STORAGE_KEY` / `SCHEME_STORAGE_KEY` 定义后，是否仍有硬编码原值（应统一用常量） | 不中止 |
| **P6 关卡冒烟** | 提取 levels 中的 `shelves` 定义片段，确认至少有 3 个关卡 | 不中止 |

**修改 app.js 后、提交前、改完 localStorage 相关逻辑后必跑。**

---

## 3. localStorage 测试数据清理

游戏把进度持久化在浏览器 `localStorage` 中。开发时经常需要清掉脏数据、重放教学、验证初始状态等。

### 3.1 自动生成清理片段

```bash
npm run clear:storage
```

它会：
1. 从 `app.js` 里真实扫描出所有 localStorage key（含通过 `WEEK_STORAGE_KEY` / `SCHEME_STORAGE_KEY` 常量保存的值）
2. 生成 `scripts/_storage_snippet.js`（一段可直接粘贴到浏览器控制台的 IIFE）
3. 在终端打印使用说明

### 3.2 清理步骤

1. 启动本地服务后打开 index.html（或 test.html）
2. 按 `F12` / `Cmd+Option+I` 打开 DevTools → Console
3. 把 `scripts/_storage_snippet.js` 的内容**整段粘贴并回车**
4. 默认模式 `safe` 会清：回放录像 / 周报 / 布局方案 / 经营手册统计，**保留店员进度和教学标记**

### 3.3 切换清理模式

在粘贴片段前，先在控制台设置：

```js
// 模式列表：
window.__CLEAR_ARGS__ = ['all']         // 清空所有（含店员/教学），回出厂状态
window.__CLEAR_ARGS__ = ['week']        // 只清七夜经营周报数据
window.__CLEAR_ARGS__ = ['scheme']      // 只清货架布局方案
window.__CLEAR_ARGS__ = ['replay']      // 只清上局回放录像
window.__CLEAR_ARGS__ = ['codex']       // 只清经营手册累计统计
window.__CLEAR_ARGS__ = ['tutorial']    // 只清新手教学完成标记（下次进游戏会重新弹）
window.__CLEAR_ARGS__ = ['clerk']       // 只清店员升级进度
window.__CLEAR_ARGS__ = ['backup']      // 只备份，不清理（会把 JSON 打印到控制台）
window.__CLEAR_ARGS__ = ['restore', { /* 备份对象 */ }]  // 从备份恢复
```

**安全机制**：除 `factory/all` 外，清理前会自动把原数据备份到 `window.__LAST_BACKUP__`，清错了立即在控制台执行：

```js
__CLEAR_ARGS__ = ['restore', window.__LAST_BACKUP__]
```

即可恢复。

### 3.4 实际使用的 localStorage key 清单

由扫描脚本从 app.js 提取：

| Key | 用途 | safe 模式是否清理 |
| --- | --- | --- |
| `tutorialCompleted` | 新手教学已完成标记 | ❌ 保留 |
| `clerkData` | 店员等级 / 经验值 / 解锁能力 | ❌ 保留 |
| `weekArchive` | 七夜经营周档案（WEEK_STORAGE_KEY） | ✅ 清理 |
| `wxyy_layout_schemes` | 货架布局方案（SCHEME_STORAGE_KEY） | ✅ 清理 |
| `lastNightReplay` | 上一局完整回放录像 | ✅ 清理 |
| `codexSalesCount` | 经营手册累计销量 | ✅ 清理 |
| `codexMissCount` | 经营手册累计缺货次数 | ✅ 清理 |
| `codexMaxSession` | 经营手册单局最高销量 | ✅ 清理 |
| `codexShelfStats` | 经营手册分货架表现 | ✅ 清理 |
| `codexLastSession` | 经营手册上一局数据 | ✅ 清理 |
| `codexSubstituteSales` | 替代商品销售统计 | ✅ 清理 |
| `codexSubstituteMiss` | 替代商品缺货统计 | ✅ 清理 |

---

## 4. 自动化回归测试（test.html）

所有测试用 **iframe 加载真实 index.html + app.js**，调用 `window.__schedulingTestApi` 暴露的钩子来驱动状态，避免写 mock。

### 4.1 跑回归的完整流程

```bash
# 1. 先跑静态检查
npm run check

# 2. 启动本地 HTTP 服务（如已在跑就跳过）
npm run start &

# 3. 打开测试页（macOS）
npm run test:open
# 或手动访问：http://localhost:19876/test.html
```

页面会自动跑全部用例，顶部有**总用例数 / 通过 / 失败**汇总，每组用例有 badge，失败的用例展开红色堆栈。点右上角「重新运行」可再跑。

### 4.2 当前已覆盖的测试套件

| 套件 | 关键场景 | 用例数 |
| --- | --- | --- |
| **客流曲线生成** | 固定 seed 稳定、高峰策略高峰>低峰、所有策略含商品权重 | 3 |
| **预期统计计算** | 输入稳定、真实策略生成预览 | 2 |
| **实际经营数据** | 调度分支初始化、服务/流失/替代/类型记录 | 2 |
| **排班奖励结算** | 按策略和倍率结算、无策略/低服务率不发 | 2 |
| **关键分支逻辑** | 跳过排班、训练模式强制 rushHour 策略 | 2 |
| **回放模式回归** | mock 帧结构、进入/跳帧/退出还原、localStorage 存取、时间格式化、reset 清理 | 7 |
| **训练模式回归** | 4 种主题配置完整性、覆盖优先级、双手搬运标记、duration 倍率、关卡切换、reset 清理、scheduling 预览 | 10 |
| **基础工具与状态护栏** | 玩家位置/货架库存 helper、3 关卡 goodKeys 与 goods 字典一致 | 4 |

总计约 **32 个用例**（原 11 + 新增 21）。

### 4.3 如何快速定位一个用例失败

1. 失败用例的红色 `.error` 块里有堆栈，第一行就是 `expect` 断言失败位置
2. 看堆栈里被调用的 API 名：
   - 带 `scheduling` / `strategy` / `curve` → 排班模块
   - 带 `replay*` → 回放模块
   - 带 `training*` / `TRAINING_THEMES` / `getTrainingConfigOverride` → 训练模块
3. 在 app.js 里 `grep` 对应函数名，对照断言期望值改逻辑
4. 改完刷新 test.html 即可重跑，无需重启服务

### 4.4 跑回放回归时的注意事项

- 回放 mock 数据用 `api.replayBuildMockData(levelId, frameCount)` 生成，和真实录制的结构一致（`deepCloneStateForReplay` 输出）
- `replayEnterMode` 会自动保存真实状态 → 切换到回放 → `replayExitMode` 再还原，**退出时若还原失败对应测试会失败**
- `replayJumpToFrame` 内部会 clamp，传 999 会定位到最后一帧，适合验证末尾渲染

### 4.5 跑训练模式回归时的注意事项

- 所有训练主题测试**不应污染 clerkData 和 codex**（训练模式有独立分支 `training.active = true` 时不走这些持久化路径）
- `getTrainingConfigOverride(key, defaultValue)` 规则：
  - 非训练模式：永远返回 defaultValue
  - 训练模式：先找 `theme.config[key]`（精确覆盖），再找 `theme.config[key + 'Multiplier']` 做比例缩放
- `api.trainingExitSession(false)` 传 `false` 表示**不显示训练结果弹窗**，适合在测试里静默退出

---

## 5. 扩展测试钩子（__schedulingTestApi）

`app.js` 末尾暴露了 `window.__schedulingTestApi`，是测试和真实 app 交互的唯一入口。**不要直接改 app.js 里的内部函数签名来适配测试，优先扩展这个对象。**

当前分类一览：

### 5.1 状态读写

| 接口 | 用途 |
| --- | --- |
| `api.state` / `api.training` / `api.schedulingState` | 只读 getter 访问内部 state |
| `api.currentLevelId`（getter/setter） | 直接切关卡 |
| `api.stopTimer()` | 停止主循环 setInterval |
| `api.resetForTest()` | **每个用例必须先调用**：清 timer / 回放 / 训练 / 排班 / UI 横幅 |

### 5.2 排班模块（原已有）

`openSchedulingChallenge` / `skipSchedulingChallenge` / `selectStrategy(id)` / `generatePreviewForStrategy()` / `startWithSchedulingStrategy()` / `openSchedulingForTraining()` / `calculateExpectedStats()` / `calculateSchedulingBonus()` / `recordActualCustomer()` / `getCurveSegmentForTick()` / `getCurrentLevel()` / `getCurrentLevelGoodKeys()` / `startSchedulingTrainingPreviewForTest()`

### 5.3 回放模块（新增）

| 接口 | 用途 |
| --- | --- |
| `api.replayRecorder` / `api.replayPlayer` | 直接引用内部对象 |
| `api.replayStartRecording()` / `replayStopRecording(result)` / `replayHasSaved()` / `replayLoadSaved()` | 真实录制流程 |
| `api.replayApplyFrame(idx)` | 底层帧应用函数 |
| `api.replayFormatTime(seconds)` | 时间格式化工具 |
| `api.replaySaveToStorage(data)` / `replayClearFromStorage()` | localStorage 读写 |
| `api.replayBuildMockData(levelId, frameCount)` | **测试核心**：快速构造一组合法帧 |
| `api.replayEnterMode(data)` | 进入回放，保存真实状态，显示 banner |
| `api.replayExitMode()` | 退出回放，还原真实状态 |
| `api.replayJumpToFrame(idx)` | 跳帧（自动 clamp） |
| `api.replayGetFrameCount()` | 当前数据帧数 |

### 5.4 训练模块（新增）

| 接口 | 用途 |
| --- | --- |
| `api.TRAINING_THEMES` | 直接访问主题字典 |
| `api.getTrainingConfigOverride(key, default)` | 训练配置覆盖逻辑 |
| `api.trainingSetTheme(themeId, levelIdOrNull)` | 选主题+切关卡，保存 originalLevelId |
| `api.trainingStartSession()` | 走真实的开始训练分支 |
| `api.trainingExitSession(showResult)` | 退出，还原关卡，隐藏 banner |
| `api.trainingGetFinalState()` | 取结束时快照 |

### 5.5 工具辅助（新增）

`setPlayerPos(x, y)` / `getShelfById(id)` / `setShelfStock(id, stock)` —— 用于以后写路径/补货逻辑回归，可按需扩展。

---

## 6. 推荐开发工作流

每次改完 app.js 后按下面顺序走，**不要跳步**：

```
1. npm run check            # P1-P6 静态检查，语法/存储 key 问题先拦住
2. 刷新 index.html 人工点两下关键路径  # 肉眼验证没白屏
3. 刷新 test.html 等跑完     # 32+ 用例绿灯
4. 若涉及 localStorage：用 clear:storage 生成的 snippet 清一下再复现
5. 若涉及训练/回放：重点关注对应 suite 的 badge 是否仍绿
```

### 常见坑速查

| 现象 | 排查思路 |
| --- | --- |
| `P3 语法错误` | 看错误里的行号，多半是改 app.js 时多/少了 `}` 或 `,` |
| `P5 常量硬编码` | grep 一下错误里提示的字串值，把它换成常量 |
| test.html 打开白屏、提示"未找到真实页面测试接口" | 你是用 `file://` 打开的，iframe 被拦了 → 改用 `http://localhost:19876/test.html` |
| 某回放用例失败：`bannerHidden 应为 true 实际是 false` | 你新的分支里可能在某路径下又把 banner 显示出来了，检查有没有漏调用 `replayBanner.classList.add('hidden')` |
| 训练模式测试后店员数据被污染 | 看你是不是在 `training.active = true` 的分支外写了 `saveClerkData()` 之类调用 |

---

## 7. 如何新增一个回归用例

以"新增双手搬运训练时双手按钮真的禁用了单手路径"为例：

1. 打开 `test.html`，找到 `describe("训练模式回归", ...)`
2. 加一个新的 `it("双手搬运训练强制禁用单手...", () => { ... })`
3. 里面按顺序写：
   - `resetApp()`（**必写，避免上一个用例脏状态**）
   - `api.trainingSetTheme("dualCarry", 1)` + `api.training.active = true`
   - 调用要测的逻辑
   - `expect(实际).toBe(期望)`
4. 保存 → 刷新 test.html → 看新增用例 badge 是否绿

原则：
- **不要依赖真实 DOM 点击**（除非测 DOM 绑定），优先调 `__schedulingTestApi` 里的函数
- **每个 it 里先 resetForTest**，框架里的 for 循环已经会自动调，不要漏掉
- 涉及随机的用固定 seed 包一层：`withSeed(123, () => ...)`，保证 CI 重跑稳定

---

## 8. 为什么不引入 npm 依赖 / 构建工具

1. **保持双击 index.html 能玩**：不打包、不编译、不做模块拆分，用户拿到三个文件在离线机器上也能玩
2. **降低维护成本**：8k 行 JS 用 V8 语法解析已经足够发现 90% 的低级错误，没必要为了 ESLint/TS 引入 node_modules
3. **测试用真 iframe 加载真页面**：比 JSDOM + mock 更接近真实浏览器环境，发现的问题才是用户会遇到的问题

当某一天 app.js 到了 2w+ 行、多人协作经常因为类型问题踩坑时，**再考虑迁移 TS/Vite**，当前阶段保持轻量即可。
