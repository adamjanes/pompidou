# Claude Code Usage Monitor

| Field | Value |
|-------|-------|
| GitHub | [Maciek-roboblog/Claude-Code-Usage-Monitor](https://github.com/Maciek-roboblog/Claude-Code-Usage-Monitor) |
| Stars | 6,400 |
| Last Commit | Recent (active) |
| Install | `uv tool install claude-monitor` |
| Status | Watching |
| Category | Scheduling |
| Holy Grail Phase | Phase 6 (Scheduling & Multi-Project) |

## What It Does

Real-time terminal monitor for Claude Code token usage with ML-based predictions. Tracks consumption patterns across subscription tiers (Pro, Max5, Max20), predicts when you will hit rate limits, and provides cost analysis. Uses P90 percentile calculations over 8-day rolling windows to determine personalized limits.

## How It Works

- Rich terminal UI with color-coded progress bars (WCAG-compliant)
- Auto-detects subscription plan or calculates custom limits from usage history
- ML prediction analyzes token usage, message count, and cost across last 192 hours
- 95% confidence threshold detection for limit warnings
- Configurable refresh rates (0.1-20 Hz)
- Model-specific pricing including cache token calculations
- Optional Sentry integration for error monitoring
- Aliases: `claude-monitor`, `cmonitor`, `ccmonitor`, `ccm`

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 2 | 0.60 |
| Simplicity | 20% | 3 | 0.60 |
| Community trust | 15% | 4 | 0.60 |
| Ecosystem fit | 15% | 2 | 0.30 |
| Cost efficiency | 10% | 4 | 0.40 |
| Maturity | 10% | 4 | 0.40 |
| **Composite** | | | **2.90** |

**Strengths:**
- Solves a real pain point -- knowing when limits will hit before they do
- Clean modular architecture (v3.0 rewrite, Pydantic config, 100+ tests)
- Multiple install methods (uv, pip, pipx, source)
- Active development and large community

**Weaknesses:**
- Terminal-only -- no programmatic API for integration with Ralph loops
- P90 predictions only useful with enough historical data
- Adds another terminal window to manage
- No webhook/notification output for automated systems

**Community Sentiment:** Well-liked utility tool. Fills a gap Anthropic hasn't addressed natively.

**Compared To:** claude-auto-resume (our chosen tool) handles the consequence of hitting limits (auto-restart). This tool handles the prediction side. They are complementary, not competing.

## Our Usage

Watching. Useful for manual development sessions to avoid surprise rate limits. For Ralph loops, claude-auto-resume handles limit recovery automatically, which matters more than prediction. Could install on Adam's MacBook for interactive sessions.

## Sources

- [GitHub README](https://github.com/Maciek-roboblog/Claude-Code-Usage-Monitor)

Last reviewed: 2026-02-06
