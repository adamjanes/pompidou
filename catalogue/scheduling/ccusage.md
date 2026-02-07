# ccusage

| Field | Value |
|-------|-------|
| **GitHub** | [ryoppippi/ccusage](https://github.com/ryoppippi/ccusage) |
| **Stars** | 10,400 |
| **Last Commit** | Active (2026) |
| **Install** | `npx ccusage@latest` or `bunx ccusage` |
| **Status** | Watching |
| **Category** | Scheduling (Cost Monitoring) |
| **Holy Grail Phase** | 5-Repeat |

## What It Does

ccusage is a CLI tool that analyzes Claude Code token usage and costs from local JSONL session files. It provides daily, monthly, session-level, and 5-hour billing window breakdowns with per-model cost analysis. No network connectivity required for analysis -- it reads directly from your local Claude Code data directory. This is the essential cost monitoring tool for running multiple autonomous Ralph loops without losing track of API spend.

## How It Works

### Report Types

| Command | Description |
|---------|-------------|
| `ccusage daily` | Token usage aggregated by date (default) |
| `ccusage monthly` | Month-level aggregation |
| `ccusage session` | Grouped by conversation sessions |
| `ccusage blocks` | 5-hour billing window tracking |
| `ccusage statusline` | Compact status bar display (Beta) |

### Key Options

- `--since` / `--until` -- Date range filtering
- `--json` -- Structured JSON output for programmatic use
- `--breakdown` -- Per-model cost analysis (Opus vs Sonnet vs Haiku)
- `--timezone` -- Custom timezone configuration
- `--instances` -- Project/instance grouping (track per-project spend)
- `--compact` -- Forced compact table layout for narrow terminals
- `--offline` -- Use pre-cached pricing (no network needed)

### What It Tracks

- Input tokens, output tokens, cache creation tokens, cache read tokens
- Per-model cost breakdowns (Opus, Sonnet, Haiku variants)
- Daily and monthly cost aggregation in USD
- 5-hour billing window active block monitoring
- Multi-instance usage aggregation (critical for tracking multiple Ralph loops)

### Ecosystem

- **MCP Server integration** for Claude Desktop compatibility
- **Companion package** `@ccusage/codex` for OpenAI Codex analysis
- **Configuration file support** with IDE autocomplete and validation

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 3 | 0.90 |
| Simplicity | 20% | 5 | 1.00 |
| Community trust | 15% | 5 | 0.75 |
| Ecosystem fit | 15% | 3 | 0.45 |
| Cost efficiency | 10% | 5 | 0.50 |
| Maturity | 10% | 5 | 0.50 |
| **Composite** | | | **4.10** |

### Strengths
- Zero-config: reads local JSONL files directly, no API keys or setup needed
- Ultra-compact bundle size, minimal installation footprint
- 5-hour billing window tracking is unique and maps directly to Claude's billing model
- JSON export enables building dashboards or alerts on top
- `--instances` flag is purpose-built for our multi-project Ralph loop tracking
- Offline mode means it works without internet (useful on Mac Mini)
- Active development (1,128 commits, 57 contributors)

### Weaknesses
- Read-only analysis -- no alerting or budget caps built in
- No built-in visualization (tables only, no charts)
- Pricing data may lag behind new model releases
- No direct integration with scheduling tools (runCLAUDErun, cron)

### Community Sentiment
Strong adoption (10K+ stars) for a cost monitoring CLI. Users praise the simplicity and zero-config nature. The `blocks` report type is frequently cited as the killer feature for understanding Claude's billing model.

### Compared To
- **Manual tracking**: ccusage automates what would otherwise require parsing JSONL files by hand
- **Claude dashboard**: ccusage provides local, offline, per-session granularity that the web dashboard doesn't
- **Custom scripts**: ccusage's `--json` output is more reliable than hand-rolled parsers

## Our Usage

**Plan:** Essential tool for Phase 5-Repeat cost monitoring across Ralph loops. Specific use cases:

1. **Daily cost reports**: Run `ccusage daily --since 7d` each morning to review overnight Ralph loop spend
2. **Per-project tracking**: Use `--instances` to compare cost across frequency-first, linkedin, firstcomment loops
3. **Budget alerting**: Pipe `ccusage daily --json` into a simple script that sends Telegram alerts if daily spend exceeds threshold
4. **Billing window optimization**: Use `ccusage blocks` to understand whether Ralph loops are hitting billing window limits

**Integration with Pompidou stack:**
- Schedule via runCLAUDErun or launchd to generate daily reports
- Feed JSON output to OpenClaw for cost alerting via Telegram
- Include in morning review dashboard alongside Ralph loop status

**Next step:** Install and run against existing Claude Code session data to establish baseline usage patterns.

## Sources

- [GitHub Repository](https://github.com/ryoppippi/ccusage)

---
*Last reviewed: 2026-02-06*
