#!/usr/bin/env node
// Vanilla foundation validator — zero deps, run with: node scripts/validate-skills.mjs
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const SKILLS_DIR = "skills";
const NAME_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const errors = [];

function frontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const fm = {};
  const lines = m[1].split("\n");
  for (let i = 0; i < lines.length; i++) {
    const mm = lines[i].match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!mm) continue;
    const key = mm[1];
    let val = mm[2];
    // Block scalar (| or >) or empty: collect following more-indented lines.
    if (val === "|" || val === ">" || val === "") {
      const collected = [];
      while (i + 1 < lines.length && /^\s+\S/.test(lines[i + 1])) {
        collected.push(lines[++i].trim());
      }
      if (collected.length) val = collected.join(" ");
    }
    // Strip a single pair of surrounding quotes.
    val = val.trim().replace(/^(['"])([\s\S]*)\1$/, "$2");
    fm[key] = val;
  }
  return fm;
}

// 1. Portability of every skill under skills/
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

// 3. vanilla-discovery brief-template integrity (only if the skill exists)
const discoveryPath = join(SKILLS_DIR, "vanilla-discovery/SKILL.md");
if (existsSync(discoveryPath)) {
  const disc = readFileSync(discoveryPath, "utf8");
  // Anchor the section check to the brief template block, not the whole file.
  const briefBlock = (disc.match(/```markdown\n([\s\S]*?)```/g) || []).find((b) => /#\s+Vanilla Brief/.test(b)) || "";
  if (!briefBlock) errors.push("vanilla-discovery: missing the vanilla-brief.md template block");
  const requiredSections = ["Product", "User", "Task", "Domain", "Feel", "Signature"];
  const missing = requiredSections.filter((s) => !new RegExp(`##\\s+${s}\\b`).test(briefBlock));
  if (missing.length) errors.push(`vanilla-discovery: brief template missing section(s): ${missing.join(", ")}`);
  if (!/vanilla-brief\.md/.test(disc)) errors.push("vanilla-discovery: must reference vanilla-brief.md output");
}

// 4. vanilla-build must reference the skin and the brief (only if it exists)
const buildPath = join(SKILLS_DIR, "vanilla-build/SKILL.md");
if (existsSync(buildPath)) {
  const build = readFileSync(buildPath, "utf8");
  const mustMention = ["vanilla-brief.md", "tokens.css", "theme.css", "Base UI", "Reka UI", "Lucide"];
  const absent = mustMention.filter((s) => !build.includes(s));
  if (absent.length) errors.push(`vanilla-build: must reference skin/brief, missing: ${absent.join(", ")}`);
}

// 5. vanilla-review must reference the brief, the skin, and the uniqueness test (only if it exists)
const reviewPath = join(SKILLS_DIR, "vanilla-review/SKILL.md");
if (existsSync(reviewPath)) {
  const review = readFileSync(reviewPath, "utf8");
  const mustMention = ["vanilla-brief.md", "tokens.css", "signature", "Lucide", "Base UI", "Reka UI"];
  const absent = mustMention.filter((s) => !review.includes(s));
  if (absent.length) errors.push(`vanilla-review: must reference brief/skin/signature, missing: ${absent.join(", ")}`);
}

// 6. vanilla-direction must keep the skin fixed and reference the brief/signature (only if it exists)
const directionPath = join(SKILLS_DIR, "vanilla-direction/SKILL.md");
if (existsSync(directionPath)) {
  const direction = readFileSync(directionPath, "utf8");
  const mustMention = ["vanilla-brief.md", "signature", "Inter", "surface ladder", "Lucide"];
  const absent = mustMention.filter((s) => !direction.includes(s));
  if (absent.length) errors.push(`vanilla-direction: must reference skin/brief, missing: ${absent.join(", ")}`);
}

// 7. The canonical tokens must ship a light theme block redefining the core surfaces
if (existsSync(tokensPath)) {
  const tokensLight = readFileSync(tokensPath, "utf8");
  const lightBlock = tokensLight.match(/:root\[data-theme="light"\]\s*\{([\s\S]*?)\}/);
  if (!lightBlock) {
    errors.push('tokens.css: missing :root[data-theme="light"] block');
  } else {
    const need = ["--vanilla-canvas", "--vanilla-ink", "--vanilla-surface-1", "--vanilla-hairline", "--vanilla-primary"];
    const miss = need.filter((v) => !new RegExp(v + "\\s*:").test(lightBlock[1]));
    if (miss.length) errors.push(`tokens.css light theme missing: ${miss.join(", ")}`);
  }
}

// 8. design.md is value-free — all values live in tokens.css (the single source).
//    A brand overrides tokens; design.md must not duplicate or pin literal values.
const designPath = join(SKILLS_DIR, "vanilla/references/design.md");
if (existsSync(designPath)) {
  const design = readFileSync(designPath, "utf8");
  const hexes = design.match(/#[0-9a-fA-F]{3,8}\b/g) || [];
  if (hexes.length) {
    errors.push(
      `design.md must be value-free (values live in tokens.css); found ${hexes.length} literal hex value(s): ${[...new Set(hexes)].slice(0, 5).join(", ")}${hexes.length > 5 ? " …" : ""}`,
    );
  }
  if (/^\s*(colors|typography|spacing|radius):\s*$/m.test(design)) {
    errors.push("design.md must not carry a structured colors/typography/spacing/radius token block — that duplicates tokens.css");
  }
}

// 9. vanilla-brand: the brand-interview skill must reference its output (brand.css),
//    write under docs/vanilla/, and ship the brand.css contract example.
const brandPath = join(SKILLS_DIR, "vanilla-brand/SKILL.md");
if (existsSync(brandPath)) {
  const brand = readFileSync(brandPath, "utf8");
  const mustMention = ["brand.css", "docs/vanilla/", "tokens.css", "vanilla-audit"];
  const absent = mustMention.filter((s) => !brand.includes(s));
  if (absent.length) errors.push(`vanilla-brand: must reference output/skin, missing: ${absent.join(", ")}`);
  if (!existsSync(join(SKILLS_DIR, "vanilla-brand/references/brand.css.example"))) {
    errors.push("vanilla-brand: missing references/brand.css.example (the brand.css contract)");
  }
}

if (errors.length) {
  console.error("✗ Vanilla validation failed:");
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log("✓ Vanilla validation passed");
