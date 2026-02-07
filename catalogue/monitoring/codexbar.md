# CodexBar

| Field | Value |
|-------|-------|
| GitHub | [steipete/CodexBar](https://github.com/steipete/CodexBar) |
| Stars | 5,197 |
| Last Commit | 2026-02-07 |
| Install | `brew install --cask steipete/tap/codexbar` or download from [releases](https://github.com/steipete/CodexBar/releases) |
| Status | Evaluated |
| Score | 3.30 / 5.00 |
| Category | monitoring |
| Holy Grail Phase | Supporting |

## What It Does

CodexBar is a macOS menu bar app that shows usage stats for Claude Code, Codex, Cursor, Gemini, and 10+ other AI coding providers without requiring login. It displays session and weekly usage meters with reset countdowns, performs local cost-usage scans from Claude logs (last 30 days), and provides a bundled CLI (`codexbar`) for scripts and CI. Think of it as a persistent dashboard for your AI coding usage and costs — always visible in your menu bar, tracking multiple providers simultaneously.

## How It Works

**Installation:**
```bash
# macOS via Homebrew
brew install --cask steipete/tap/codexbar

# Or download from GitHub releases
# Linux CLI-only builds also available
```

**Key concepts:**
- **Multi-provider menu bar**: One status item per enabled provider (or merge into single item with switcher)
- **Session + weekly meters**: Top bar shows 5-hour/session window, bottom bar shows weekly window (hairline)
- **Local cost scanning**: Reads Claude and Codex JSONL logs from `~/.claude/` and calculates last 30 days of usage
- **Provider status polling**: Checks for incidents and displays badges/overlays in menu and icon
- **Bundled CLI**: `codexbar cost --provider codex|claude` for scripting and CI integration
- **WidgetKit widget**: macOS widget mirrors menu card snapshot

**Supported providers:**
- Codex (local CLI RPC + optional OpenAI web dashboard)
- Claude (OAuth API or browser cookies + CLI fallback)
- Cursor (browser cookies for plan + usage + billing)
- Gemini (OAuth via Gemini CLI credentials)
- Antigravity (local language server probe, experimental)
- Droid/Factory (browser cookies + WorkOS tokens)
- Copilot (GitHub device flow + usage API)
- z.ai (API token from Keychain)
- Kimi, Kimi K2, Kiro, Vertex AI, Augment, Amp, JetBrains AI

**Workflow:**
1. Install CodexBar
2. Open Settings → Providers and enable what you use (Codex, Claude, Cursor, etc.)
3. Sign in to provider sources (CLI, browser cookies, or OAuth)
4. Menu bar icon shows two-bar meter: session window (top), weekly window (bottom)
5. Click icon for detailed breakdown: credits remaining, reset countdowns, usage stats
6. Optional: `codexbar cost --provider claude` for local cost reports

**macOS permissions:**
- **Full Disk Access** (optional): Required only for Safari cookies/local storage; use Chrome/Firefox cookies as alternative
- **Keychain access**: Reads Claude OAuth credentials, Chrome Safe Storage keys, z.ai tokens
- **Files & Folders**: CodexBar launches provider CLIs (codex/claude/gemini) which may access project directories

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 2 | 0.60 |
| Simplicity | 20% | 4 | 0.80 |
| Community trust | 15% | 4 | 0.60 |
| Ecosystem fit | 15% | 4 | 0.60 |
| Cost efficiency | 10% | 4 | 0.40 |
| Maturity | 10% | 3 | 0.30 |
| **Composite** | | | **3.30** |

### Strengths
- Always-visible menu bar monitoring — no need to check web dashboards or run CLI commands
- Multi-provider support consolidates usage tracking in one place (Claude, Codex, Cursor, Gemini, etc.)
- Local cost scanning from Claude logs provides accurate 30-day usage without API calls
- Bundled CLI enables scripting and CI integration (`codexbar cost`)
- Privacy-first: on-device parsing by default, browser cookies are opt-in
- Native macOS experience with WidgetKit widget support
- Linux CLI builds available for cross-platform cost tracking
- Merge Icons mode combines providers into single status item to reduce menu bar clutter
- Refresh cadence presets (manual, 1m, 2m, 5m, 15m) balance freshness vs battery life

### Weaknesses
- macOS-only for GUI (Linux CLI exists but lacks menu bar)
- Does not integrate with Holy Grail phases — purely monitoring, no automation or task management
- Requires Full Disk Access for Safari cookies (security-conscious users may avoid)
- Multi-provider tracking only useful if you actually use multiple providers (most users stick to Claude)
- No budget alerts or cost limit enforcement — just displays usage, doesn't act on it
- No integration with runCLAUDErun or Claude Squad — tracks usage but doesn't inform scheduling or session management
- Browser cookie authentication requires manual re-auth when cookies expire

### Community Sentiment

CodexBar has positive community reception with 5,197 stars and active development through early 2026. Users praise the menu bar convenience and multi-provider consolidation — "finally, one place to see all my AI coding usage." The local cost scanning feature is frequently highlighted as a standout (no API calls, accurate historical data from JSONL logs). Recent January 2026 pull requests include cost summary refresh interval configuration, Antigravity OAuth support, and Qwen Code provider, indicating responsive maintenance. Privacy-conscious users appreciate the on-device parsing and optional Full Disk Access. Some criticism around the complexity of supporting 15+ providers when most users only need Claude or Codex. The bundled CLI (`codexbar cost`) is called out as useful for CI pipelines and cost monitoring scripts. Overall sentiment: useful for power users who actively monitor usage, potentially overkill for casual users who don't track costs closely.

### Compared To

- **ccusage** (`catalogue/scheduling/ccusage.md`): CLI-only tool that tracks Claude Code usage metrics. CodexBar provides GUI + CLI and supports 15+ providers. ccusage is simpler and scriptable; CodexBar is more comprehensive.
- **ccflare** (`catalogue/monitoring/ccflare.md`): Cost tracking via CloudFlare Workers with budget alerts. CodexBar is local-only, no server. ccflare provides proactive alerting; CodexBar is passive monitoring.
- **Native provider dashboards**: Anthropic Console, OpenAI Dashboard, etc. CodexBar consolidates multiple dashboards into one menu bar app, but requires per-provider auth setup.

## Our Usage

**Not currently chosen.** CodexBar is useful for tracking usage across multiple providers, but:

1. **Single provider focus** — We primarily use Claude Code with Anthropic models (Haiku/Sonnet/Opus). Multi-provider tracking isn't needed.
2. **No automation** — CodexBar displays usage but doesn't enforce budgets, pause sessions, or notify Adam when limits are near. It's passive monitoring.
3. **ccusage integration sufficient** — We already integrate ccusage via ccstatusline custom command widget for session-level cost tracking.
4. **macOS-specific** — Limits portability if we ever move off Mac Mini (Ralph) to Linux servers.

**Status: Watching.** If we adopt Claude Code Router and start routing to DeepSeek, Gemini, or other providers, CodexBar becomes valuable for consolidated usage tracking. Also useful if Adam wants persistent menu bar visibility for costs (currently he checks ccusage in terminal).

**Potential future use:** Install on Adam's local MacBook (not Ralph) for personal cost awareness during interactive sessions. Use `codexbar cost --provider claude` in scheduled reports (e.g., weekly cost summary Telegram message via OpenClaw).

## Sources

- [GitHub README](https://github.com/steipete/CodexBar)
- [Codex provider docs](https://github.com/steipete/CodexBar/blob/main/docs/codex.md)
- [Claude provider docs](https://github.com/steipete/CodexBar/blob/main/docs/claude.md)
- [CLI reference](https://github.com/steipete/CodexBar/blob/main/docs/cli.md)
- [Architecture overview](https://github.com/steipete/CodexBar/blob/main/docs/architecture.md)

---
*Last reviewed: 2026-02-07*
