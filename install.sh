#!/usr/bin/env bash
#
# Vanilla — installer for the PDM design-system skills.
#
# Remote (the repo is public — no clone needed):
#   curl -fsSL https://raw.githubusercontent.com/maclevison/vanilla-ai/main/install.sh | bash
#   curl -fsSL https://raw.githubusercontent.com/maclevison/vanilla-ai/main/install.sh | bash -s -- --project ./my-app
#
# From a local clone:
#   ./install.sh                 # installs globally into ~/.claude/skills
#   ./install.sh --project .     # installs into ./.claude/skills
#   ./install.sh --link          # symlink instead of copy (track the clone)
#
# Installs every vanilla* skill so it is available to Claude Code and OpenCode.

set -euo pipefail

REPO="maclevison/vanilla-ai"
REF="main"          # branch or tag to fetch in remote mode
MODE="global"       # global | project
TARGET_DIR=""       # project mode target; defaults to the current directory
USE_LINK=0

c_info='\033[0;36m'; c_ok='\033[0;32m'; c_warn='\033[0;33m'; c_err='\033[0;31m'; c_off='\033[0m'
info() { printf "${c_info}›${c_off} %s\n" "$1"; }
ok()   { printf "${c_ok}✓${c_off} %s\n" "$1"; }
warn() { printf "${c_warn}!${c_off} %s\n" "$1" >&2; }
die()  { printf "${c_err}✗${c_off} %s\n" "$1" >&2; exit 1; }

usage() {
  cat <<'EOF'
Vanilla installer — installs the vanilla* design-system skills.

Usage:
  install.sh [--global | --project [DIR]] [--link] [--ref REF]

Options:
  --global         Install into ~/.claude/skills (default; available everywhere).
  --project [DIR]  Install into DIR/.claude/skills (DIR defaults to the current dir).
  --link           Symlink the skills instead of copying (local clone only).
  --ref REF        Branch or tag to fetch in remote mode (default: main).
  -h, --help       Show this help.
EOF
}

while [ $# -gt 0 ]; do
  case "$1" in
    --global)  MODE="global"; shift ;;
    --project)
      MODE="project"
      if [ $# -ge 2 ] && [ "${2#-}" = "$2" ]; then TARGET_DIR="$2"; shift 2; else shift; fi ;;
    --link)    USE_LINK=1; shift ;;
    --ref)     REF="${2:?--ref needs a value}"; shift 2 ;;
    -h|--help) usage; exit 0 ;;
    *)         die "unknown option: $1 (try --help)" ;;
  esac
done

# Destination
if [ "$MODE" = "global" ]; then
  DEST="${HOME}/.claude/skills"
else
  DEST="${TARGET_DIR:-$PWD}/.claude/skills"
fi

# Locate the skills source: a local clone if we're inside one, else download a tarball.
SRC=""
SELF="${BASH_SOURCE[0]:-}"
if [ -n "$SELF" ] && [ -f "$SELF" ]; then
  SCRIPT_DIR="$(cd "$(dirname "$SELF")" && pwd)"
  [ -d "$SCRIPT_DIR/.claude/skills" ] && SRC="$SCRIPT_DIR/.claude/skills"
fi

if [ -z "$SRC" ]; then
  [ "$USE_LINK" = "1" ] && die "--link needs a local clone; drop it for a remote install"
  command -v curl >/dev/null 2>&1 || die "curl is required for the remote install"
  command -v tar  >/dev/null 2>&1 || die "tar is required for the remote install"
  TMP="$(mktemp -d)"
  trap 'rm -rf "$TMP"' EXIT
  info "Downloading ${REPO}@${REF}…"
  curl -fsSL "https://codeload.github.com/${REPO}/tar.gz/refs/heads/${REF}" -o "$TMP/v.tar.gz" 2>/dev/null \
    || curl -fsSL "https://codeload.github.com/${REPO}/tar.gz/refs/tags/${REF}" -o "$TMP/v.tar.gz" 2>/dev/null \
    || die "download failed for ref '${REF}'"
  tar -xzf "$TMP/v.tar.gz" -C "$TMP"
  EXTRACTED="$(find "$TMP" -maxdepth 1 -type d -name 'vanilla-ai-*' | head -1)"
  [ -n "$EXTRACTED" ] && [ -d "$EXTRACTED/.claude/skills" ] || die "skills not found in the downloaded archive"
  SRC="$EXTRACTED/.claude/skills"
fi

# Install every vanilla* skill.
mkdir -p "$DEST"
count=0
for d in "$SRC"/vanilla*; do
  [ -d "$d" ] || continue
  name="$(basename "$d")"
  rm -rf "$DEST/$name"
  if [ "$USE_LINK" = "1" ]; then
    ln -s "$d" "$DEST/$name"
  else
    cp -R "$d" "$DEST/$name"
  fi
  count=$((count + 1))
  ok "$name"
done
[ "$count" -gt 0 ] || die "no vanilla* skills found in $SRC"

echo
ok "Installed $count skill(s) → $DEST"
[ "$USE_LINK" = "1" ] && info "Symlinked — pull the clone to update."
info "Ask your agent to \"use the vanilla skill\" to build PDM product UI."
