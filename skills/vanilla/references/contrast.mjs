#!/usr/bin/env node
/**
 * Vanilla contrast checker — WCAG ratios over the fixed skin's tokens.
 *
 * The skin is shared, so its text/surface pairs can be verified once and hold
 * for every Vanilla product. Two modes:
 *
 *   node contrast.mjs                 → audit the skin's curated pairs, both themes
 *   node contrast.mjs <fg> <bg>       → ad-hoc pair (hex like #6c7079, or a token
 *                                       name like ink-subtle); add --theme light
 *
 * Exit code is 1 if any *required* curated pair fails AA (so it is CI-able);
 * ad-hoc mode never fails the process, it just reports.
 *
 * No dependencies. Reads tokens.css next to this file. color-mix()/non-hex
 * token values are skipped (resolve them by hand and pass hex to ad-hoc mode).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const TOKENS = path.join(HERE, 'tokens.css')

// ── WCAG math ──────────────────────────────────────────────────────────────
const lin = (c) => {
  c /= 255
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}
const L = (hex) => {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}
const ratio = (fg, bg) => {
  const a = L(fg)
  const b = L(bg)
  const hi = Math.max(a, b)
  const lo = Math.min(a, b)
  return (hi + 0.05) / (lo + 0.05)
}
const norm3 = (hex) => {
  let h = hex.trim().replace(/^#/, '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  return '#' + h.toLowerCase()
}
const isHex = (v) => /^#?[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(v.trim())

// ── token parsing ───────────────────────────────────────────────────────────
function parseTheme(css, selector) {
  // grab the first { ... } block for the given selector
  const start = css.indexOf(selector)
  if (start === -1) return {}
  const open = css.indexOf('{', start)
  const close = css.indexOf('}', open)
  const body = css.slice(open + 1, close)
  const out = {}
  for (const m of body.matchAll(/--vanilla-([\w-]+):\s*([^;]+);/g)) {
    const val = m[2].trim()
    if (isHex(val)) out[m[1]] = norm3(val)
  }
  return out
}

const css = fs.readFileSync(TOKENS, 'utf8')
const DARK = parseTheme(css, ':root {')
const LIGHT = { ...DARK, ...parseTheme(css, ':root[data-theme="light"]') }
const THEMES = { dark: DARK, light: LIGHT }

const resolve = (token, theme) => {
  if (isHex(token)) return norm3(token)
  const key = token.replace(/^--vanilla-/, '')
  return THEMES[theme]?.[key]
}

// Curated pairs that carry real text. `min` is the AA floor for that role:
//   4.5 = body text · 3.0 = large/non-body (≥18px or bold ≥14px, dots, icons)
//   0   = informational only (WCAG-exempt role like disabled/footnote) — the
//         ratio is printed but never fails the process.
const PAIRS = [
  ['ink', 'canvas', 4.5, 'body/headlines on canvas'],
  ['ink', 'surface-1', 4.5, 'card text'],
  ['ink-muted', 'surface-1', 4.5, 'secondary text'],
  ['ink-subtle', 'surface-1', 4.5, 'tertiary text (the usual offender)'],
  ['ink-subtle', 'surface-2', 4.5, 'muted text on lifted surface'],
  ['ink-tertiary', 'surface-1', 0, 'disabled/footnote — never real text (light dips <3:1)'],
  ['on-primary', 'primary', 4.5, 'button label on lavender fill'],
  ['primary', 'canvas', 3.0, 'accent/link on canvas (≥18px or non-text)'],
  ['primary', 'surface-1', 3.0, 'accent on card (≥18px or non-text)'],
  ['success', 'surface-1', 3.0, 'status dot/text (non-body)'],
]

const bar = (r) => (r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? 'AA-lg' : 'FAIL')
const pad = (s, n) => String(s).padEnd(n)

function auditTheme(theme) {
  console.log(`\n  ${theme.toUpperCase()}`)
  console.log('  ' + '─'.repeat(64))
  let failed = 0
  for (const [fgTok, bgTok, min, note] of PAIRS) {
    const fg = resolveEff(fgTok, theme)
    const bg = resolveEff(bgTok, theme)
    if (!fg || !bg) {
      console.log(`  ${pad(fgTok + ' / ' + bgTok, 26)} skipped (non-hex token)`)
      continue
    }
    const r = ratio(fg, bg)
    const info = min === 0
    const ok = info || r >= min
    if (!ok) failed++
    const tag = info ? 'info' : ok ? bar(r) : 'FAIL'
    const mark = ok ? '·' : '✗'
    console.log(
      `  ${mark} ${pad(fgTok + ' / ' + bgTok, 26)} ${pad(r.toFixed(2) + ':1', 9)} ${pad(tag, 6)} ${note}`,
    )
  }
  return failed
}

// ── run ──────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2)
const themeFlag = (() => {
  const i = args.indexOf('--theme')
  if (i === -1) return null
  const t = args[i + 1]
  args.splice(i, 2)
  return t
})()
// Optional per-client brand overlay: brand.css redefines a subset of --vanilla-* tokens.
const brandFlag = (() => {
  const i = args.indexOf("--brand");
  if (i === -1) return null;
  const v = args[i + 1];
  args.splice(i, 2);
  return v;
})();
let DARK_EFF = DARK, LIGHT_EFF = LIGHT;
if (brandFlag) {
  const bcss = fs.readFileSync(brandFlag, "utf8");
  const bDark = parseTheme(bcss, ":root {");
  const bLight = parseTheme(bcss, ':root[data-theme="light"]');
  DARK_EFF = { ...DARK, ...bDark };
  LIGHT_EFF = { ...LIGHT, ...bDark, ...bLight };
}
const THEMES_EFF = { dark: DARK_EFF, light: LIGHT_EFF };
const resolveEff = (token, theme) => {
  if (isHex(token)) return norm3(token);
  const key = token.replace(/^--vanilla-/, "");
  return THEMES_EFF[theme]?.[key];
};
const positional = args.filter((a) => !a.startsWith('--'))

if (positional.length >= 2) {
  const theme = themeFlag || 'light'
  const fg = resolveEff(positional[0], theme)
  const bg = resolveEff(positional[1], theme)
  if (!fg || !bg) {
    console.error(`Could not resolve "${positional[0]}" / "${positional[1]}" in ${theme} theme.`)
    process.exit(2)
  }
  const r = ratio(fg, bg)
  console.log(`\n  ${positional[0]} on ${positional[1]} (${theme})`)
  console.log(`  ${fg} on ${bg}  →  ${r.toFixed(2)}:1  [${bar(r)}]`)
  console.log(
    `  AA normal (4.5): ${r >= 4.5 ? 'PASS' : 'FAIL'}   AA large (3.0): ${r >= 3 ? 'PASS' : 'FAIL'}\n`,
  )
  process.exit(0)
}

console.log('\n  Vanilla skin — WCAG contrast audit')
const failures = auditTheme('dark') + auditTheme('light')
console.log('')
if (failures > 0) {
  console.log(`  ${failures} required pair(s) below AA. Fix the token, not the symptom.\n`)
  process.exit(1)
}
console.log('  All required pairs clear AA on both themes.\n')
process.exit(0)
