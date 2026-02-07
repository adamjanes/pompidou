# ccexp (claude-code-explorer)

| Field | Value |
|-------|-------|
| GitHub | [nyatinte/ccexp](https://github.com/nyatinte/ccexp) |
| Stars | 247 |
| Last Commit | 2026-02-05 |
| Install | `npx ccexp@latest` or `bun install -g ccexp` |
| Status | Watching |
| Category | native |
| Holy Grail Phase | Supporting |

## What It Does

ccexp is a React Ink-based interactive TUI for discovering, previewing, and managing Claude Code configuration files and slash commands. It provides split-pane navigation to find CLAUDE.md files, settings, commands, agents, and other Claude-related configs across your codebase with live search and file actions.

## How It Works

Launch with `bunx ccexp@latest` (no install required) or `ccexp` if globally installed. The TUI shows:

- **Left pane**: File list with automatic discovery of memory files (CLAUDE.md, CLAUDE.local.md, ~/.claude/CLAUDE.md), command files (.claude/commands/, ~/.claude/commands/), subagent files (.claude/agents/, ~/.claude/agents/), and settings files (.claude/settings.json, settings.local.json, ~/.claude/settings.json)
- **Right pane**: Live markdown preview with syntax highlighting
- **Actions menu** (Enter key): Copy content, copy absolute/relative path, copy file to current directory, edit with $EDITOR, open in default application

Keyboard shortcuts: ↑/↓ navigate, Enter opens action menu, ESC closes/exits, Tab switches panes, / focuses search, c/p/r/d/e/o trigger actions.

Can specify directory with `--path ~/projects`.

## Evaluation

### Strengths
- Zero installation required (npx/bunx)
- Beautiful, intuitive TUI with proper focus management
- Comprehensive file discovery across all Claude Code config types
- Live markdown rendering for previews
- Multiple file actions (copy, edit, open)
- Fast, keyboard-driven navigation
- Active maintenance (updated Feb 2026)
- Mentioned in awesome-claude-code list

### Weaknesses
- Read-only (no inline editing in the TUI)
- Primarily a discovery/navigation tool, not a management interface
- Requires Node.js 20+ (not lightweight)
- No bulk operations (must act on one file at a time)
- Overlaps with native `find` + `grep` + editor workflows for advanced users

### Community Sentiment

Featured in [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) curated list. npm package has "good" download metrics (ccexp v4.0.0 on Libraries.io).

Some users report [plugin management issues](https://github.com/anthropics/claude-code/issues/9426) in Claude Code Marketplace (removing/deleting plugins, inconsistent state), but this is a broader Claude Code ecosystem problem, not specific to ccexp.

A VS Code extension variant exists ([safeekow.ccexp-vscode](https://marketplace.visualstudio.com/items?itemName=safeekow.ccexp-vscode)), suggesting demand for this UX pattern.

Alternative TUI tools exist (e.g., [joeyism/claude-code-config](https://github.com/joeyism/claude-code-config) for managing ~/.claude.json), indicating healthy ecosystem competition.

### Compared To

- **Native workflow**: `find . -name "CLAUDE.md"`, `ls ~/.claude/commands`, `cat .claude/settings.json` — ccexp adds TUI, preview, and actions but requires Node.js
- **claude-code-config**: TUI for ~/.claude.json MCP servers, projects, conversations (different scope: global config vs file discovery)
- **File managers** (ranger, lf, nnn): General-purpose but lack Claude Code-specific filtering and markdown preview

## Our Usage

**Watching** — Interesting for quick config exploration but not essential. Adam's workflow already uses `rg "CLAUDE.md"` and editor navigation. Would be valuable for onboarding new contributors or auditing complex projects with many .claude/ subdirectories.

**Decision**: Not needed currently. If we grow the number of .claude/ configurations across clients/projects, revisit for discovery UX. For now, native tools + knowledge of standard paths suffice.

**Score**: 3.40/5.00
- Holy Grail alignment (30%): 0.75 — Supports config discovery but not a core phase tool
- Simplicity (20%): 0.80 — One-line install/run, intuitive UX
- Community trust (15%): 0.60 — 247 stars, featured in awesome list, recent updates
- Ecosystem fit (15%): 0.50 — Works standalone, doesn't integrate with OpenSpec/Beads/OMC
- Cost efficiency (10%): 0.40 — No API costs but requires Node.js runtime
- Maturity (10%): 0.35 — Stable but young project (v4.0.0)

## Sources

- [GitHub - nyatinte/ccexp](https://github.com/nyatinte/ccexp)
- [ccexp - npm](https://www.npmjs.com/package/ccexp)
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)
- [ccexp VS Code Extension](https://marketplace.visualstudio.com/items?itemName=safeekow.ccexp-vscode)

---
*Last reviewed: 2026-02-07*
