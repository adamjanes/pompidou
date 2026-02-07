# Claude HUD

| Field | Value |
|-------|-------|
| GitHub | [jarrodwatts/claude-hud](https://github.com/jarrodwatts/claude-hud) |
| Stars | 3,079 |
| Last Commit | Jan 2026 |
| Install | `/plugin marketplace add jarrodwatts/claude-hud` then `/plugin install claude-hud` then `/claude-hud:setup` |
| Status | Watching |
| Category | notification |
| Holy Grail Phase | 4-Flag |

## What It Does

Plugin that shows real-time context usage, active tools, running agents, and todo progress as a statusline HUD. Uses Claude Code's native statusline API — no tmux or separate windows needed. Displays color-coded context bars (green→yellow→red), git branch status, tool activity tracking, agent monitoring, and usage limit display. Updates approximately every 300ms.

## How It Works

Leverages Claude Code's stdin JSON → statusline API. Parses transcript JSONL files for activity data. Uses native token counts (not estimates). Three presets: Full, Essential, Minimal. Configurable via `/claude-hud:configure`. Requires Claude Code v1.0.80+ and Node.js 18+. MIT license, 14 contributors, 0 open issues.

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 2 | 0.60 |
| Simplicity | 20% | 4 | 0.80 |
| Community trust | 15% | 3 | 0.45 |
| Ecosystem fit | 15% | 3 | 0.45 |
| Cost efficiency | 10% | 4 | 0.40 |
| Maturity | 10% | 3 | 0.30 |
| **Composite** | | | **3.00** |

### Strengths
- Real-time context usage visualization — critical for knowing when you're approaching limits
- Native statusline integration — no extra windows or processes
- Color-coded bars make context pressure instantly visible
- Git awareness (branch, dirty state, file changes)
- Agent monitoring for subagent processes
- Todo progress tracking
- Well-maintained (14 contributors, 0 issues)

### Weaknesses
- Plugin-only (not standalone monitoring)
- Limited to what the statusline API exposes
- May compete with Oh-My-ClaudeCode's built-in statusline
- 300ms refresh adds some overhead

### Community Sentiment

Positive. Developers praise the "finally I can see what's happening" visibility. Featured in multiple plugin recommendation lists. Some prefer it over Oh-My-ClaudeCode's statusline for its focus and configurability.

### Compared To

- **ccusage** — Post-hoc CLI analysis vs claude-hud's real-time monitoring. Different use cases.
- **Oh-My-ClaudeCode statusline** — Built-in statusline but less configurable. Claude HUD is more focused and customizable.
- **ccflare** — Web dashboard vs terminal statusline. ccflare for trends, claude-hud for real-time awareness.

## Our Usage

Watching. Useful for monitoring Ralph loops in real-time — seeing context pressure, agent status, and progress without interrupting the session. Would pair well with Claude Squad's TUI. Evaluate when we start running autonomous loops.

## Sources

- [GitHub: jarrodwatts/claude-hud](https://github.com/jarrodwatts/claude-hud)

---
*Last reviewed: 2026-02-07*
