# claude-code-otel

| Field | Value |
|-------|-------|
| GitHub | [ColeMurray/claude-code-otel](https://github.com/ColeMurray/claude-code-otel) |
| Stars | ~500 |
| Last Commit | 2026 |
| Install | Docker Compose (`docker compose up -d`) |
| Status | Watching |
| Category | monitoring |
| Holy Grail Phase | 5-Repeat |

## What It Does

claude-code-otel is a comprehensive OpenTelemetry observability solution for Claude Code. It provides production-grade monitoring with real-time dashboards that refresh every 30 seconds. The pipeline flows from Claude Code through an OpenTelemetry Collector to Prometheus (metrics) and Loki (logs), with Grafana as the visualization layer. It tracks cost per model, per user, and per time period — giving full visibility into how much autonomous Claude Code sessions are spending and what they are doing.

## How It Works

**Architecture:**
```
Claude Code → OTel Collector → Prometheus (metrics)
                             → Loki (logs)
                             → Grafana (dashboards)
```

**Key concepts:**
- **OpenTelemetry Collector**: Receives telemetry data from Claude Code sessions via the standard OTel protocol. Acts as the ingestion layer, routing metrics to Prometheus and logs to Loki.
- **Prometheus**: Time-series database storing metrics — token usage, API calls, model selection, response times, cost calculations. Scraped by Grafana for dashboard visualization.
- **Loki**: Log aggregation system storing Claude Code session logs. Enables searching through agent conversation history and error logs across all sessions.
- **Grafana dashboards**: Pre-configured dashboards showing real-time and historical data. 30-second refresh cycle. Includes cost breakdowns, usage trends, model distribution, and session activity.
- **Cost tracking**: Calculates cost per model (Haiku/Sonnet/Opus), per user, and per time period using current Anthropic pricing. Essential for budget management when running multiple autonomous loops.

**Setup:**
```bash
# Clone the repo
git clone https://github.com/ColeMurray/claude-code-otel.git

# Start the stack
docker compose up -d

# Access Grafana
open http://localhost:3000

# Configure Claude Code to export OTel data
# (environment variables or config file)
```

**What the dashboards show:**
- Total tokens consumed (input/output) across all sessions
- Cost breakdown by model tier (Haiku vs Sonnet vs Opus)
- Cost breakdown by project/session
- API call volume and error rates
- Session activity timeline (when agents are active/idle)
- Historical trends (daily, weekly, monthly)

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 3 | 0.90 |
| Simplicity | 20% | 1 | 0.20 |
| Community trust | 15% | 2 | 0.30 |
| Ecosystem fit | 15% | 3 | 0.45 |
| Cost efficiency | 10% | 2 | 0.20 |
| Maturity | 10% | 3 | 0.30 |
| **Composite** | | | **2.35** |

### Strengths
- Production-grade monitoring stack — Prometheus + Grafana is the industry standard for infrastructure observability
- Real-time dashboards with 30-second refresh provide immediate visibility into running sessions
- Cost tracking per model/user/time period is critical for budget management at scale
- Standard OpenTelemetry protocol means it works with any OTel-compatible tool, not just Claude Code
- Pre-configured Grafana dashboards reduce setup time — not starting from scratch
- Loki integration means full session log search across all agents — invaluable for debugging autonomous runs
- Docker Compose deployment is reproducible and isolated

### Weaknesses
- Heavy infrastructure footprint — Docker Compose with 4+ services (OTel Collector, Prometheus, Loki, Grafana) is substantial for a single developer
- Complex setup compared to simpler cost tracking tools — requires Docker, port management, and Grafana familiarity
- Resource consumption on Mac Mini — Prometheus and Loki are not lightweight services, especially with high-volume telemetry data
- Requires Grafana expertise to customize dashboards beyond the pre-configured ones
- Overkill for tracking 1-2 sessions — the monitoring stack is designed for fleet-scale observability
- Storage management — Prometheus and Loki need retention policies configured or disk usage grows unbounded

### Community Sentiment

Respected as the most thorough monitoring solution in the Claude Code ecosystem. Developers running multiple autonomous sessions praise the Grafana dashboards as "finally, real visibility into what my agents are spending." The Docker Compose approach is both praised (reproducible, isolated) and criticized (heavy for solo use). Common feedback: "Perfect for a dedicated development server, overkill for a laptop." The OpenTelemetry approach gets approval from infrastructure-minded developers who appreciate the standard protocol rather than a custom integration. Some wish for a lighter "just show me the costs" option without the full Prometheus/Loki stack.

### Compared To

- **ccusage**: CLI-only cost tracking tool. Much simpler — just run a command and see your usage. No dashboards, no real-time monitoring, no log search. Better for quick checks; claude-code-otel is better for ongoing monitoring of autonomous loops.
- **ccflare / better-ccflare** (`catalogue/monitoring/ccflare.md`): Web dashboard for usage metrics. Middle ground between ccusage (CLI-only) and claude-code-otel (full observability stack). Less comprehensive but lighter weight.
- **claude-code-usage-monitor**: Lighter weight monitoring focused on usage limits. Solves a narrower problem (am I about to hit my limit?) vs claude-code-otel's broader observability.
- **CodexBar**: macOS menu bar usage stats. Minimal — just a glanceable indicator. No historical data or cost breakdowns.

## Our Usage

Watching. claude-code-otel is the right solution for Phase 6 (multi-project Ralph loops on Mac Mini) where cost visibility across all running sessions becomes critical. The infrastructure is justified when running 4-5 autonomous loops nightly and needing to answer questions like:

- "How much did last night's runs cost across all projects?"
- "Which project is consuming the most Opus tokens?"
- "Did any session error out and spend tokens on retries?"

**Prerequisites before adopting:**
1. Mac Mini (Ralph) must be operational with Docker
2. Multiple autonomous loops must be running (Phase 4+)
3. Cost tracking must be a real pain point, not a theoretical one

For the current single-session development setup, simpler tools like ccusage or ccflare are sufficient. Revisit when the Mac Mini infrastructure is running nightly loops.

## Sources

- [GitHub: ColeMurray/claude-code-otel](https://github.com/ColeMurray/claude-code-otel)
- [OpenTelemetry documentation](https://opentelemetry.io/docs/)
- [awesome-claude-code](https://github.com/bwilliams-97/awesome-claude-code)

---
*Last reviewed: 2026-02-07*
