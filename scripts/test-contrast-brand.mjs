#!/usr/bin/env node
// Tests for contrast.mjs brand overlay + suggestions. Run: node scripts/test-contrast-brand.mjs
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const SCRIPT = "skills/vanilla/references/contrast.mjs";
let failed = 0;
const ok = (name, cond) => { console.log(`${cond ? "✓" : "✗"} ${name}`); if (!cond) failed++; };

function run(args) {
  try {
    return { out: execFileSync("node", [SCRIPT, ...args], { encoding: "utf8" }), code: 0 };
  } catch (e) {
    return { out: (e.stdout || "") + (e.stderr || ""), code: e.status ?? 1 };
  }
}
function tmpBrand(css) {
  const dir = mkdtempSync(join(tmpdir(), "vbrand-"));
  const p = join(dir, "brand.css");
  writeFileSync(p, css);
  return { dir, p };
}

// Test 1: --brand overlays the accent so an ad-hoc pair reflects the brand value.
{
  const { dir, p } = tmpBrand(`:root { --vanilla-primary: #2f6df0; }`);
  const r = run(["--brand", p, "primary", "canvas", "--theme", "dark"]);
  ok("brand overlay changes resolved primary", r.out.includes("#2f6df0"));
  rmSync(dir, { recursive: true, force: true });
}

console.log(failed ? `\n${failed} test(s) failed` : "\nall tests passed");
process.exit(failed ? 1 : 0);
