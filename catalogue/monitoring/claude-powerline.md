# Claude Powerline

| Field | Value |
|-------|-------|
| GitHub | [Owloops/claude-powerline](https://github.com/Owloops/claude-powerline) |
| Stars | 762 |
| Last Commit | 2026-02-06 |
| Install | Add to `settings.json`: `"statusLine": {"type": "command", "command": "npx -y @owloops/claude-powerline@latest"}` |
| Status | Watching |
| Score | **3.50** |
| Category | monitoring |
| Holy Grail Phase | Supporting |

## What It Does

Vim-style powerline statusline for Claude Code with real-time usage tracking, git integration, and custom themes. Displays session costs, 5-hour billing window burn rate, daily budgets, git branch/status, context window percentage, model info, session metrics, and more — all in a customizable bottom-of-screen statusline. Supports 6 built-in themes (dark, light, nord, tokyo-night, rose-pine, gruvbox), 3 separator styles (minimal, powerline, capsule), auto-wrap layout, and zero dependencies. Performance: ~80ms for default config, ~240ms with all segments enabled.

## How It Works

**Setup:**
Add to `.claude/settings.json`:
```json
{
  "statusLine": {
    "type": "command",
    "command": "npx -y @owloops/claude-powerline@latest --style=powerline"
  }
}
```
Using `npx` auto-downloads latest version without manual updates.

**Key segments:**
- **Directory**: Current working directory (full / fish-style / basename)
- **Git**: Branch, SHA, working tree status (staged/unstaged/untracked), commits ahead/behind, tag, upstream, repo name, time since commit, stash count
- **Metrics**: Session duration, total API time, last response time, message count, lines added/removed
- **Model**: Current Claude model (Sonnet/Opus/Haiku)
- **Context**: Context window usage with auto-compact threshold (percentage or tokens remaining)
- **Session**: Current conversation usage (tokens/cost/both/breakdown), calculated or official cost source
- **Block**: 5-hour billing window usage (tokens/cost/time/weighted), burn rate display
- **Today**: Daily total usage (tokens/cost/both/breakdown)
- **Tmux**: Tmux session name and window (if in tmux)
- **Version**: Claude Code version

**Configuration:**
```bash
# CLI flags (both --arg value and --arg=value syntax)
--theme dark|light|nord|tokyo-night|rose-pine|gruvbox|custom
--style minimal|powerline|capsule
--charset unicode|text
--config /path/to/config.json

# Environment variables
export CLAUDE_POWERLINE_THEME=dark
export CLAUDE_POWERLINE_STYLE=powerline
export CLAUDE_POWERLINE_CONFIG=/path/to/config.json
```

**Config file locations** (priority order):
1. `./.claude-powerline.json` (project-specific)
2. `~/.claude/claude-powerline.json` (user config)
3. `~/.config/claude-powerline/config.json` (XDG standard)

**Budget monitoring:**
```json
"budget": {
  "session": { "amount": 10.0, "warningThreshold": 80 },
  "today": { "amount": 25.0, "warningThreshold": 80 },
  "block": { "amount": 15.0, "type": "cost", "warningThreshold": 80 }
}
```
Indicators: `25%` Normal, `+75%` Moderate (50-79%), `!85%` Warning (80%+)

**Character sets:**
- `unicode`: Nerd Font icons (⎇, ✱, ●, ↑, ↓) — best display
- `text`: ASCII-only (~, M, *, ^, v) — maximum compatibility without Nerd Font

**Styles:**
- `minimal`: No separators, clean text flow
- `powerline`: Arrow separators (requires Nerd Font for unicode)
- `capsule`: Rounded caps (requires Nerd Font for unicode)

**Auto-wrap:** Segments wrap to new lines when terminal width exceeded. Enabled by default, adjusts on terminal resize.

**Performance:**
- Default config: ~80ms
- Full-featured: ~240ms
- Individual segment timings: directory/model/session/context/metrics (~40ms), git (~60ms), tmux (~50ms), block (~180ms), today (~250ms, cached ~50ms)

**Optimization:** Global install (`npm install -g @owloops/claude-powerline`) avoids npx overhead.

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 2 | 0.60 |
| Simplicity | 20% | 4 | 0.80 |
| Community trust | 15% | 4 | 0.60 |
| Ecosystem fit | 15% | 4 | 0.60 |
| Cost efficiency | 10% | 5 | 0.50 |
| Maturity | 10% | 3 | 0.30 |
| **Composite** | | | **3.50** |

### Strengths
- Zero dependencies — no external packages, fast startup, minimal footprint
- Auto-update via npx — always latest version without manual upgrades
- Comprehensive git integration — branch, commits ahead/behind, working tree changes, stash count, upstream tracking
- Real-time usage tracking — session/block/daily costs with budget warnings prevent overspend
- 5-hour billing window support — understands Claude's rate limit structure, not just daily totals
- Weighted token tracking — Opus tokens count 5x for rate limits (matches Claude's actual billing)
- Auto-wrap layout — segments flow naturally, no cutoff on narrow terminals
- Theme variety — 6 built-in themes + custom colors, light/dark, popular dev themes (nord, tokyo-night, rose-pine)
- Charset flexibility — unicode for beauty, text for compatibility (terminals without Nerd Font)
- Performance transparency — documented timings for each segment, clear trade-offs
- Active development — last commit 2026-02-06, responsive maintenance
- Config reload without restart — change themes/settings, statusline updates automatically
- Mentioned in Awesome Claude Code list

### Weaknesses
- Performance cost — 80-240ms per statusline refresh adds latency to every Claude response
- Nerd Font dependency for best experience — unicode mode requires specific font installation
- Config fragmentation — 3 possible locations (./.claude-powerline.json, ~/.claude/, ~/.config/) creates confusion
- Budget tracking is manual — you set thresholds in config, no auto-sync with actual Anthropic limits
- No alerting — warnings display in statusline but don't push notifications (e.g., Telegram)
- Git integration assumes single repo — multi-repo projects show only CWD's repo
- Block window calculation is approximate — parses transcripts to estimate 5-hour windows, not exact API data
- Daily usage requires full transcript load — slow (~250ms) unless cached
- No session resumption tracking — doesn't show if session is resumed or fresh
- Statusline-only visibility — info hidden if you're not looking at terminal (no persistent logs)

### Community Sentiment

Positive reception from developers who spend "serious time in Claude Code" ([Jerad Bitner's blog](https://jeradbitner.com/blog/claude-code-statusline)). Community appreciates the "just works" setup (one line in settings.json) and comprehensive git integration. Theme variety gets praise: "finally, statuslines that match my terminal aesthetic." Budget tracking with 5-hour window support noted as "actually understanding Claude's billing, not just showing numbers." Some complaints about Nerd Font requirement, resolved by `--charset=text` flag. Performance concerns for full-featured config (~240ms) but acknowledgment that default config (~80ms) is acceptable. Alternative statusline tools exist ([ccstatusline](https://github.com/sirmalloc/ccstatusline), [@illumin8ca/claude-statusline](https://www.npmjs.com/package/@illumin8ca/claude-statusline)) but claude-powerline seen as "most feature-complete and actively maintained." Noted in [Vibe Sparking AI blog](https://www.vibesparking.com/en/blog/ai/2026-01-05-claude-powerline-statusline/) as "beautiful vim-style statusline for Claude Code."

### Compared To

- **ccusage** (`catalogue/scheduling/ccusage.md`): CLI command for usage checks. ccusage is instant, one-off; claude-powerline is persistent, always visible. ccusage shows full history; claude-powerline shows current session. Complementary: use ccusage for deep dives, claude-powerline for glanceable awareness.
- **ccflare** (`catalogue/monitoring/ccflare.md`): Web dashboard for usage. ccflare is visual, detailed, requires browser tab; claude-powerline is terminal-native, glanceable. ccflare better for analysis; claude-powerline better for awareness during coding.
- **claude-code-hooks-multi-agent-observability** (`catalogue/monitoring/claude-code-hooks-multi-agent-observability.md`): Real-time event monitoring with web dashboard. Full observability vs simple statusline. This tool is lightweight, no server; that tool is comprehensive, requires infrastructure. Use claude-powerline for single-agent awareness; use hooks-observability for multi-agent debugging.
- **ccstatusline**: Alternative statusline (sirmalloc, 52 stars). Similar feature set but less polish, fewer stars, less active. claude-powerline more popular and better maintained.
- **@illumin8ca/claude-statusline**: Another alternative (npm package). Minimal feature set compared to claude-powerline's git/budget/context integration.

## Our Usage

**Status: Watching** — Not installed yet.

**Why watching:**
- **Glanceable budget awareness:** Real-time session/block/daily costs prevent accidentally burning through budget before noticing
- **Git integration useful:** Branch, commits ahead/behind, working tree status saves manual `git status` checks
- **Zero-config appeal:** One line in settings.json, npx auto-updates, works immediately
- **Terminal-native:** No browser tabs, no separate processes, stays in terminal workflow

**Why not chosen:**
- **Performance cost unclear for Ralph loops:** 80-240ms per statusline refresh may add up during autonomous overnight sessions with hundreds of responses
- **Statusline visibility ephemeral:** Info disappears when session ends; no persistent logs for morning review (Holy Grail Phase 5)
- **No blocker notification:** Budget warnings show in statusline but don't push to Telegram (our chosen alert channel via OpenClaw)
- **Budget tracking is manual:** Thresholds in config don't sync with actual Anthropic limits; requires manual updates
- **Git info redundant:** Adam's workflow already has git status via shell prompt and manual checks

**Potential future use:**
- **Interactive sessions:** When working directly with Claude (not autonomous Ralph loops), statusline provides useful awareness during coding
- **Budget enforcement:** If Adam sets daily budget and wants persistent reminder visible at all times
- **Alternative to ccusage:** If checking costs via `ccusage` command becomes friction, statusline provides passive awareness

**Decision criteria for adoption:**
- **Trigger:** Adam starts running interactive Claude sessions for extended periods (hours) where glanceable cost awareness prevents overspend
- **Alternative check:** First try ccusage for spot checks; only adopt statusline if checking manually becomes annoying
- **Performance validation:** Test with autonomous Ralph loops to confirm 80-240ms overhead doesn't slow execution noticeably
- **Integration with OpenClaw:** Build custom segment or hook to push budget warnings to Telegram before relying on statusline-only alerts

**If adopted, config preferences:**
- Theme: `dark` (Adam's terminal theme)
- Style: `minimal` (prefer clean text, avoid powerline arrows)
- Charset: `unicode` (assume Nerd Font installed)
- Segments enabled: `directory`, `git`, `session`, `context` (disable `block`, `today`, `metrics` for speed)
- Budget: Set session $5, daily $15 thresholds

## Sources

- [GitHub README](https://github.com/Owloops/claude-powerline)
- [npm package](https://www.npmjs.com/package/@owloops/claude-powerline)
- [Vibe Sparking AI: Claude Powerline statusline](https://www.vibesparking.com/en/blog/ai/2026-01-05-claude-powerline-statusline/)
- [Jerad Bitner: Leveling Up Claude Code with a Killer Statusline](https://jeradbitner.com/blog/claude-code-statusline)
- [Claude Hub: claude-powerline resource](https://www.claude-hub.com/resource/awesome-claude-powerline/)
- [Awesome Claude Code list](https://github.com/hesreallyhim/awesome-claude-code)

---
*Last reviewed: 2026-02-07*
