/* =========================================================
 * 深夜便利店补货 · localStorage 数据清理脚本
 * 粘贴到浏览器开发者工具 Console 后回车执行
 * =======================================================*/
(function() {
  const ALL_KEYS = [
    "clerkData",
    "codexLastSession",
    "codexMaxSession",
    "codexMissCount",
    "codexSalesCount",
    "codexShelfStats",
    "codexSubstituteMiss",
    "codexSubstituteSales",
    "lastNightReplay",
    "tutorialCompleted",
    "weekArchive",
    "wxyy_layout_schemes"
  ];

  function classify(key) {
    if (key === "tutorialCompleted") return "新手教学标记";
    if (key === "clerkData") return "店员升级进度 / 经验值";
    if (key === "weekArchive") return "七夜经营周档案";
    if (key === "wxyy_layout_schemes") return "货架布局方案";
    if (key === "lastNightReplay") return "上局回放录像";
    if (key.startsWith("codex")) return "经营手册累计统计";
    return "其他存储";
  }

  function backup() {
    const data = {};
    ALL_KEYS.forEach(k => {
      const v = localStorage.getItem(k);
      if (v !== null) data[k] = v;
    });
    return data;
  }

  const args = (typeof window !== "undefined" && window.__CLEAR_ARGS__) || ["safe"];
  const mode = args[0] || "safe";

  const existing = ALL_KEYS.filter(k => localStorage.getItem(k) !== null);
  console.group("📋 当前存在的游戏数据 (" + existing.length + "/" + ALL_KEYS.length + ")");
  existing.forEach(k => {
    const v = localStorage.getItem(k);
    const size = new Blob([v]).size;
    console.log("  ·", k, "—", classify(k), "(" + size + " 字节)");
  });
  if (existing.length === 0) console.log("  (无)");
  console.groupEnd();

  if (mode === "backup") {
    const data = backup();
    console.log("💾 已备份，可复制下面的 JSON 到别处：");
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  if (mode === "restore") {
    const payload = args[1];
    if (!payload || typeof payload !== "object") {
      console.error("restore 用法：__CLEAR_ARGS__ = ['restore', {key:value,...}]");
      return;
    }
    Object.entries(payload).forEach(([k, v]) => localStorage.setItem(k, v));
    console.log("✅ 已恢复", Object.keys(payload).length, "个 key");
    return;
  }

  let targets = [];
  if (mode === "all" || mode === "factory") {
    targets = ALL_KEYS;
  } else if (mode === "safe") {
    targets = ["lastNightReplay", "weekArchive", "wxyy_layout_schemes", "codexSalesCount", "codexMissCount", "codexMaxSession", "codexShelfStats", "codexLastSession", "codexSubstituteSales", "codexSubstituteMiss"];
  } else if (mode === "week") {
    targets = ["weekArchive"];
  } else if (mode === "scheme") {
    targets = ["wxyy_layout_schemes"];
  } else if (mode === "replay") {
    targets = ["lastNightReplay"];
  } else if (mode === "codex") {
    targets = ALL_KEYS.filter(k => k.startsWith("codex"));
  } else if (mode === "tutorial") {
    targets = ["tutorialCompleted"];
  } else if (mode === "clerk") {
    targets = ["clerkData"];
  } else {
    console.error("未知清理模式:", mode);
    console.log("可用模式: safe | all | week | scheme | replay | codex | tutorial | clerk | backup | restore");
    return;
  }

  const toRemove = targets.filter(k => localStorage.getItem(k) !== null);
  const data = backup();
  toRemove.forEach(k => localStorage.removeItem(k));

  console.log("🧹 已清理", toRemove.length, "个 key:", toRemove.join(", "));
  if (toRemove.length > 0 && mode !== "factory") {
    console.log("（数据已备份到 window.__LAST_BACKUP__，如需恢复立即执行：__CLEAR_ARGS__ = ['restore', window.__LAST_BACKUP__]）");
    window.__LAST_BACKUP__ = data;
  }
  console.log("🔄 刷新页面后生效，或手动：location.reload()");
})();
