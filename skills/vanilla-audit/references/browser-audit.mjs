#!/usr/bin/env node
/**
 * Vanilla browser audit — deterministic render evidence for vanilla-audit.
 *
 *   node browser-audit.mjs <url> [--brand <path>] [--out <dir>] [--theme dark|light|both]
 *
 * Renders a served Vanilla build and emits findings: screenshots (dark/light ×
 * desktop/mobile), brand-overlay proof, axe-core a11y/contrast, horizontal
 * overflow, touch-target sizes. Exit 1 on any P0 (overflow, axe critical/serious,
 * overlay mismatch), 2 on usage/operational error, else 0.
 *
 * Playwright + @axe-core/playwright are resolved from the TARGET project's
 * node_modules (run from the project root). They are NOT deps of the skill.
 */
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";

// ── pure helpers (exported for unit tests; no browser) ───────────────────────
export function parseBrandTokens(css) {
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, ""); // comment-safe (contrast.mjs lesson)
  const block = (re) => {
    const m = re.exec(stripped);
    if (!m) return {};
    const open = stripped.indexOf("{", m.index);
    const close = stripped.indexOf("}", open);
    const body = stripped.slice(open + 1, close);
    const out = {};
    for (const mm of body.matchAll(/--vanilla-([\w-]+)\s*:\s*([^;]+);/g)) {
      out[mm[1].trim()] = mm[2].trim();
    }
    return out;
  };
  return {
    dark: block(/:root\s*\{/),
    light: block(/:root\[\s*data-theme\s*=\s*['"]?\s*light\s*['"]?\s*\]\s*\{/),
  };
}

export function parseArgs(argv) {
  const args = [...argv];
  const take = (flag) => {
    const i = args.indexOf(flag);
    if (i === -1) return undefined;
    const v = args[i + 1];
    args.splice(i, 2);
    return v;
  };
  const brand = take("--brand");
  const out = take("--out") || "docs/vanilla/audit";
  const theme = take("--theme") || "both";
  const url = args.filter((a) => !a.startsWith("--"))[0];
  return { url, brand, out, theme };
}

// main + browser logic added in Chunk 2.

const isMain = import.meta.url === pathToFileURL(process.argv[1] || "").href;
if (isMain) {
  // placeholder until Chunk 2 adds main(); keeps the file runnable as a module now.
  console.error("browser-audit: browser run not implemented yet");
  process.exit(2);
}
