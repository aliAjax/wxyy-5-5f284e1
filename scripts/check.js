#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");

function log(color, tag, msg) {
  const codes = { ok: "\x1b[32m", warn: "\x1b[33m", fail: "\x1b[31m", info: "\x1b[36m", dim: "\x1b[2m" };
  const reset = "\x1b[0m";
  console.log(`${codes[color] || ""}[${tag}]${reset} ${msg}`);
}

function bailOnFailures(failures, phase) {
  if (failures > 0) {
    log("fail", "中止", `${phase} 发现 ${failures} 个问题，请修复后再提交。`);
    process.exitCode = 1;
    return true;
  }
  return false;
}

const KNOWN_LOCALSTORAGE_KEYS = [
  "tutorialCompleted",
  "clerkData",
  "weekArchive",
  "wxyy_layout_schemes",
  "lastNightReplay",
  "codexSalesCount",
  "codexMissCount",
  "codexMaxSession",
  "codexShelfStats",
  "codexLastSession",
  "codexSubstituteSales",
  "codexSubstituteMiss",
];

const EXPECTED_FILES = [
  "index.html",
  "style.css",
  "app.js",
  "test.html",
];

function phase1_filePresence() {
  log("info", "P1", "检查核心文件是否存在...");
  let failures = 0;
  for (const f of EXPECTED_FILES) {
    const p = path.join(ROOT, f);
    if (fs.existsSync(p)) {
      log("ok", "存在", f);
    } else {
      log("fail", "缺失", f);
      failures += 1;
    }
  }
  return failures;
}

function phase2_indexReferences() {
  log("info", "P2", "检查 index.html 引用是否匹配...");
  let failures = 0;
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const reScript = /<script[^>]+src=["']([^"']+)["']/g;
  const reLink = /<link[^>]+href=["']([^"']+)["']/g;
  let m;
  const refs = [];
  while ((m = reScript.exec(html))) refs.push(m[1]);
  while ((m = reLink.exec(html))) refs.push(m[1]);
  for (const ref of refs) {
    if (ref.startsWith("http:") || ref.startsWith("https:") || ref.startsWith("data:")) continue;
    const p = path.join(ROOT, ref);
    if (fs.existsSync(p)) {
      log("ok", "引用", `${ref} -> 找到`);
    } else {
      log("fail", "引用", `${ref} -> 找不到文件`);
      failures += 1;
    }
  }
  if (!html.includes(`<script src="app.js"></script>`)) {
    log("warn", "引用", "index.html 未用原路径方式引用 app.js（可能影响直接打开 html 的能力）");
  }
  return failures;
}

function phase3_jsSyntax() {
  log("info", "P3", "检查 app.js 语法有效性...");
  let failures = 0;
  const src = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
  try {
    new vm.Script(src, { filename: "app.js" });
    log("ok", "语法", "app.js 通过 V8 语法解析");
  } catch (e) {
    log("fail", "语法", `app.js 语法错误: ${e.message}`);
    failures += 1;
  }
  return failures;
}

function phase4_localStorageKeys() {
  log("info", "P4", "扫描 localStorage 调用，检查 key 命名规范...");
  let failures = 0;
  const src = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");

  const getItemCalls = [...src.matchAll(/localStorage\.getItem\(\s*["'`]([^"'`]+)["'`]\s*\)/g)].map(m => m[1]);
  const setItemCalls = [...src.matchAll(/localStorage\.setItem\(\s*["'`]([^"'`]+)["'`]\s*,/g)].map(m => m[1]);
  const allUsed = Array.from(new Set([...getItemCalls, ...setItemCalls]));

  log("dim", "发现", `共使用 ${allUsed.length} 个 localStorage key: ${allUsed.join(", ")}`);

  for (const key of allUsed) {
    const hasGet = getItemCalls.includes(key);
    const hasSet = setItemCalls.includes(key);
    if (hasGet && !hasSet) {
      log("warn", "存储", `key "${key}" 只有 getItem，没有 setItem（可能依赖外部预置）`);
    }
    if (hasSet && !hasGet) {
      log("fail", "存储", `key "${key}" 只有 setItem，没有 getItem（可能泄漏或未读取）`);
      failures += 1;
    }
    if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(key)) {
      log("warn", "存储", `key "${key}" 命名不规范（推荐 camelCase）`);
    }
  }

  const usedSet = new Set(allUsed);
  for (const definedKey of KNOWN_LOCALSTORAGE_KEYS) {
    if (!usedSet.has(definedKey) && !/_(KEY|CONST)$/.test(definedKey)) {
      log("dim", "存储", `已知 key "${definedKey}" 在本次扫描中未出现`);
    }
  }

  return failures;
}

function phase5_constantUsage() {
  log("info", "P5", "检查 localStorage 常量命名的真实使用...");
  let failures = 0;
  const src = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");

  const constKeys = [...src.matchAll(/(?:const|let|var)\s+(WEEK_STORAGE_KEY|SCHEME_STORAGE_KEY)\s*=\s*["'`]([^"'`]+)["'`]/g)];
  for (const [m, constName, literalValue] of constKeys) {
    const constCount = [...src.matchAll(new RegExp(`localStorage\\.[sg]etItem\\(\\s*${constName}\\s*[,\\)]`, "g"))].length;
    const litCount = [...src.matchAll(new RegExp(`localStorage\\.[sg]etItem\\(\\s*["']${literalValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']\\s*[,\\)]`, "g"))].length;
    if (litCount > 0) {
      log("fail", "常量", `仍有 ${litCount} 处硬编码 "${literalValue}"，应改用常量 ${constName}（常量引用 ${constCount} 处）`);
      failures += 1;
    } else {
      log("ok", "常量", `${constName}="${literalValue}" 全部通过常量引用`);
    }
  }
  return failures;
}

function phase6_smokeLevels() {
  log("info", "P6", "简单检查 levels 配置完整性...");
  let failures = 0;
  const src = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
  const levelMatches = [...src.matchAll(/id:\s*(\d+)[\s\S]{0,400}?shelves:\s*\[([\s\S]*?)\]/g)];
  log("dim", "关卡", `从 app.js 中提取到 ${levelMatches.length} 个关卡的 shelves 定义片段`);
  if (levelMatches.length < 1) {
    log("fail", "关卡", "未找到任何 shelves 定义");
    failures += 1;
  }
  return failures;
}

function main() {
  console.log("=".repeat(60));
  console.log("深夜便利店补货 · 基础静态检查");
  console.log("=".repeat(60));

  let totalFailures = 0;
  totalFailures += phase1_filePresence();
  if (bailOnFailures(totalFailures, "文件完整性")) return;

  totalFailures += phase2_indexReferences();
  totalFailures += phase3_jsSyntax();
  if (bailOnFailures(totalFailures, "语法/引用")) return;

  totalFailures += phase4_localStorageKeys();
  totalFailures += phase5_constantUsage();
  totalFailures += phase6_smokeLevels();

  console.log("-".repeat(60));
  if (totalFailures === 0) {
    log("ok", "完成", "所有检查项通过 ✅");
  } else {
    log("fail", "完成", `共 ${totalFailures} 个错误（warn 不计入失败），请处理。`);
    process.exitCode = 1;
  }
}

main();
