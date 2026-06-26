#!/usr/bin/env node
// Pure unit tests for browser-audit.mjs (no browser). Run: node scripts/test-browser-audit.mjs
import { parseBrandTokens, parseArgs } from "../skills/vanilla-audit/references/browser-audit.mjs";

let failed = 0;
const ok = (name, cond) => { console.log(`${cond ? "✓" : "✗"} ${name}`); if (!cond) failed++; };
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// parseBrandTokens: per-theme --vanilla-* extraction, comment-safe.
{
  const css = `/* note: a token in :root {} applies to both themes */
:root { --vanilla-primary: #2f6df0; --vanilla-canvas: #07090d; }
:root[data-theme='light'] { --vanilla-primary: #2257c8; }`;
  const t = parseBrandTokens(css);
  ok("dark block parsed", t.dark["primary"] === "#2f6df0" && t.dark["canvas"] === "#07090d");
  ok("light block parsed (single quotes)", t.light["primary"] === "#2257c8");
  ok("comment :root {} did not hijack dark block", t.dark["primary"] === "#2f6df0");
}

// parseArgs: url positional + flags with defaults.
{
  const a = parseArgs(["http://localhost:5173", "--brand", "docs/vanilla/brand.css", "--theme", "light"]);
  ok("url parsed", a.url === "http://localhost:5173");
  ok("brand parsed", a.brand === "docs/vanilla/brand.css");
  ok("theme parsed", a.theme === "light");
  ok("out default", a.out === "docs/vanilla/audit");
  const b = parseArgs(["http://x", "--out", "tmp"]);
  ok("out override + theme default both", b.out === "tmp" && b.theme === "both" && b.brand === undefined);
}

console.log(failed ? `\n${failed} failed` : "\nall tests passed");
process.exit(failed ? 1 : 0);
