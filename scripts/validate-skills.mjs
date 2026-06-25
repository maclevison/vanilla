#!/usr/bin/env node
// Vanilla foundation validator — zero deps, run with: node scripts/validate-skills.mjs
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const SKILLS_DIR = ".claude/skills";
const NAME_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const errors = [];

function frontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split("\n")) {
    const mm = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (mm) fm[mm[1]] = mm[2].trim();
  }
  return fm;
}

// 1. Portability of every skill under .claude/skills
if (!existsSync(SKILLS_DIR)) {
  errors.push(`missing ${SKILLS_DIR}/`);
} else {
  for (const entry of readdirSync(SKILLS_DIR)) {
    const dir = join(SKILLS_DIR, entry);
    if (!statSync(dir).isDirectory()) continue;
    const skillFile = join(dir, "SKILL.md");
    if (!existsSync(skillFile)) { errors.push(`${entry}: missing SKILL.md`); continue; }
    const fm = frontmatter(readFileSync(skillFile, "utf8"));
    if (!fm) { errors.push(`${entry}: missing or malformed frontmatter`); continue; }
    if (!fm.name) {
      errors.push(`${entry}: frontmatter missing 'name'`);
    } else {
      if (fm.name !== entry) errors.push(`${entry}: name "${fm.name}" must match folder name`);
      if (fm.name.includes(":")) errors.push(`${entry}: name must not contain ':' (not portable to OpenCode)`);
      if (!NAME_RE.test(fm.name)) errors.push(`${entry}: name "${fm.name}" must be kebab-case [a-z0-9-]`);
    }
    if (!fm.description) errors.push(`${entry}: frontmatter missing 'description'`);
    else if (fm.description.length > 1024) errors.push(`${entry}: description exceeds 1024 chars`);
  }
}

// 2. Token-chain integrity for the vanilla skill
const tokensPath = join(SKILLS_DIR, "vanilla/references/tokens.css");
const themePath = join(SKILLS_DIR, "vanilla/references/theme.css");
if (existsSync(tokensPath) && existsSync(themePath)) {
  const tokens = readFileSync(tokensPath, "utf8");
  const theme = readFileSync(themePath, "utf8");
  const defined = new Set([...tokens.matchAll(/(--vanilla-[a-z0-9-]+)\s*:/g)].map((m) => m[1]));
  for (const m of theme.matchAll(/var\((--vanilla-[a-z0-9-]+)\)/g)) {
    if (!defined.has(m[1])) errors.push(`theme.css references ${m[1]} not defined in tokens.css`);
  }
  const themeBlock = theme.match(/@theme\s*\{([\s\S]*?)\}/);
  if (themeBlock && /#[0-9a-fA-F]{3,8}\b/.test(themeBlock[1])) {
    errors.push("theme.css @theme block contains raw hex — must reference tokens.css vars");
  }
} else {
  errors.push("vanilla skill: missing references/tokens.css or references/theme.css");
}

if (errors.length) {
  console.error("✗ Vanilla validation failed:");
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log("✓ Vanilla validation passed");
