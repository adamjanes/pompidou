# ccflare / better-ccflare

| Field | Value |
|-------|-------|
| GitHub | [snipeship/ccflare](https://github.com/snipeship/ccflare) + [tombii/better-ccflare](https://github.com/tombii/better-ccflare) |
| Stars | ~820 (combined) |
| Last Commit | 2026 |
| Install | `npm install -g ccflare` or clone better-ccflare |
| Status | Watching |
| Category | monitoring |
| Holy Grail Phase | 5-Repeat |

## What It Does

ccflare is a Claude Code usage dashboard with a web UI that provides comprehensive metrics, cost tracking, and detailed session logging. It runs a local web server that visualizes your Claude Code usage in a browser — token consumption, cost breakdowns, session history, and model distribution. better-ccflare is an enhanced community fork by tombii that adds performance improvements, extended provider support (beyond just Anthropic), and additional dashboard features. Together they represent the "web dashboard" approach to Claude Code monitoring.

## How It Works

**Key concepts:**
- **Local web dashboard**: ccflare runs a lightweight web server (typically on localhost) that serves a dashboard UI in your browser. No external services or cloud dependencies.
- **Session log parsing**: Reads Claude Code's local session logs and JSONL files to extract usage data — tokens consumed, models used, API calls made, timestamps, and costs.
- **Cost calculation**: Applies current Anthropic pricing to token counts, providing cost breakdowns by session, model tier, and time period.
- **Real-time updates**: The dashboard refreshes to show ongoing session activity, not just historical data.

**better-ccflare additions:**
- **Multi-provider support**: Tracks usage across Anthropic, OpenAI, and other providers — useful if you use Claude Code with different model backends.
- **Performance improvements**: Faster log parsing and dashboard rendering, especially for large session histories.
- **Extended metrics**: Additional visualizations and data points beyond the original ccflare.

**Usage:**
```bash
# Original ccflare
npm install -g ccflare
ccflare
# Open browser to localhost (port shown in terminal)

# better-ccflare (fork)
git clone https://github.com/tombii/better-ccflare.git
cd better-ccflare
npm install && npm start
```

**What the dashboard shows:**
- Total token usage (input/output) with cost
- Cost breakdown by model (Haiku/Sonnet/Opus)
- Session history with per-session cost
- Usage trends over time (daily/weekly charts)
- Model distribution pie chart
- Active session indicators (better-ccflare)

## Evaluation

### Strengths
- Visual web dashboard — much easier to parse than CLI output for ongoing monitoring
- Lightweight compared to claude-code-otel — no Docker, no Prometheus, no Grafana. Just npm install and run.
- Cost tracking with model-tier breakdowns is immediately useful for budget awareness
- better-ccflare's multi-provider support is forward-looking for mixed-model workflows
- Local-only — no data leaves your machine, no cloud dependencies
- Session history gives a browsable timeline of all Claude Code activity

### Weaknesses
- Moderate adoption (~820 stars combined) — smaller community than the heavyweights
- Web UI means running another local server process and keeping a browser tab open
- Fork fragmentation — choosing between ccflare and better-ccflare creates maintenance ambiguity. Which one gets updates? Which one will the community standardize on?
- Less comprehensive than claude-code-otel — no log aggregation (Loki), no alerting, no custom queries
- Log parsing approach means it depends on Claude Code's log format remaining stable
- No built-in alerting for cost thresholds — you must check the dashboard manually

### Community Sentiment

Positive reception as a "just right" monitoring tool — more visual than ccusage (CLI-only) but lighter than claude-code-otel (full observability stack). Developers appreciate the instant setup and visual cost breakdowns. The fork situation (ccflare vs better-ccflare) generates some confusion — Reddit threads often feature "which one should I use?" discussions, with the consensus leaning toward better-ccflare for its multi-provider support and ongoing maintenance. Some developers report using ccflare alongside ccusage — the dashboard for trends and the CLI for quick checks. The web UI approach is polarizing: visual thinkers love it, terminal purists prefer ccusage.

### Compared To

- **ccusage**: CLI-only cost tracking. Simpler (no web server, no browser), but less visual. Better for quick spot-checks; ccflare is better for trend analysis and ongoing monitoring.
- **claude-code-otel** (`catalogue/monitoring/claude-code-otel.md`): Full Prometheus + Grafana observability stack. Much more comprehensive (log search, custom queries, alerting) but dramatically heavier infrastructure. ccflare is the pragmatic middle ground.
- **CodexBar**: macOS menu bar usage indicator. Even lighter than ccflare — just a glanceable number. No historical data, no cost breakdowns, no session analysis.
- **claude-code-usage-monitor**: Focused specifically on usage limit tracking (approaching rate limits). Narrower scope than ccflare's general cost and usage dashboard.

## Our Usage

Watching. ccflare (likely better-ccflare specifically) is the pragmatic choice for cost monitoring before we need the full claude-code-otel infrastructure. The sweet spot for adoption is:

- **Now → Phase 4**: Use ccusage (CLI) for quick cost checks. No dashboard needed for 1-2 sessions.
- **Phase 4-5**: When running multiple autonomous loops, better-ccflare's visual dashboard becomes valuable for tracking cross-session costs without the overhead of Prometheus + Grafana.
- **Phase 6+**: If cost monitoring needs outgrow ccflare (alerting, custom queries, fleet-scale), upgrade to claude-code-otel.

better-ccflare is preferred over the original ccflare for its multi-provider support and active maintenance. Monitor the fork situation — if the original ccflare merges better-ccflare's improvements, consolidation simplifies the choice.

## Sources

- [GitHub: snipeship/ccflare](https://github.com/snipeship/ccflare)
- [GitHub: tombii/better-ccflare](https://github.com/tombii/better-ccflare)
- [Reddit: r/ClaudeAI discussions](https://reddit.com/r/ClaudeAI)
- [Hacker News threads](https://news.ycombinator.com)

---
*Last reviewed: 2026-02-07*
