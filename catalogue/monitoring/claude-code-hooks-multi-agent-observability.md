# claude-code-hooks-multi-agent-observability

| Field | Value |
|-------|-------|
| GitHub | [disler/claude-code-hooks-multi-agent-observability](https://github.com/disler/claude-code-hooks-multi-agent-observability) |
| Stars | 960 |
| Last Commit | 2026-02-06 |
| Install | Copy `.claude` directory to project root + `./scripts/start-system.sh` |
| Status | Watching |
| Score | **3.85** |
| Category | monitoring |
| Holy Grail Phase | 5-Repeat |

## What It Does

Real-time monitoring dashboard for Claude Code agents through comprehensive hook event tracking. Captures all hook lifecycle events (PreToolUse, PostToolUse, UserPromptSubmit, Notification, Stop, etc.) via Python scripts, sends them to a Bun server with SQLite storage, and visualizes everything in a Vue.js web dashboard with live WebSocket updates. Enables monitoring multiple concurrent agents with session tracking, event filtering, and a live pulse chart showing activity across projects.

## How It Works

**Architecture:**
```
Claude Agents → Hook Scripts → HTTP POST → Bun Server → SQLite → WebSocket → Vue Client
```

**Key components:**
- **Hook System (`.claude/hooks/`)**: Python scripts using `uv` that intercept Claude Code lifecycle events. Core script `send_event.py` transmits event data to server. Each hook (pre_tool_use.py, post_tool_use.py, user_prompt_submit.py, etc.) validates and extracts data before sending.
- **Server (`apps/server/`)**: Bun TypeScript server with SQLite (WAL mode). Endpoints: `POST /events` (receive from agents), `GET /events/recent` (paginated retrieval), `WS /stream` (real-time broadcast). Automatic schema migrations.
- **Client (`apps/client/`)**: Vue 3 app with dual-color system (app colors + session colors), live pulse chart with session-colored bars, multi-criteria filtering (app/session/event type), auto-scroll, chat transcript viewer with syntax highlighting.

**Setup:**
1. Copy `.claude` directory to project root
2. Update `settings.json` with `--source-app YOUR_PROJECT_NAME` in hook commands
3. Start server: `./scripts/start-system.sh`
4. Open `http://localhost:5173` to view dashboard

**Event types tracked:** PreToolUse 🔧, PostToolUse ✅, Notification 🔔, Stop 🛑, SubagentStop 👥, PreCompact 📦, UserPromptSubmit 💬, SessionStart 🚀, SessionEnd 🏁

**Custom slash command:** `/convert_paths_absolute` converts all relative hook paths to absolute paths in settings.json (recommended by Claude Code docs).

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 3 | 0.90 |
| Simplicity | 20% | 3 | 0.60 |
| Community trust | 15% | 4 | 0.60 |
| Ecosystem fit | 15% | 4 | 0.60 |
| Cost efficiency | 10% | 5 | 0.50 |
| Maturity | 10% | 4 | 0.40 |
| **Composite** | | | **3.85** |

### Strengths
- Comprehensive hook coverage — tracks every Claude Code lifecycle event with detailed payload data
- Real-time visualization — WebSocket streaming means you see events as they happen across multiple agents
- Multi-agent support — designed explicitly for monitoring concurrent Claude sessions with session-based color coding
- Zero external dependencies — local SQLite, no cloud services, no data leaves your machine
- Security features built-in — pre_tool_use.py blocks dangerous commands (rm -rf, etc.) and validates inputs
- Educational value — well-documented architecture with video tutorials by IndyDevDan, shows hook system mastery
- Active maintenance — last commit 2026-02-06, responsive to community feedback
- Lightweight infrastructure — Bun server is fast, Vue client renders smoothly even with thousands of events

### Weaknesses
- Complex setup — requires copying `.claude` directory to every project, updating settings.json with project-specific `--source-app` flags
- Multi-process overhead — running server (port 4000) + client (port 5173) consumes resources even when not actively monitoring
- Hook script dependency on uv — every project needs Python 3.8+ and Astral uv configured correctly
- No built-in aggregation — dashboard shows raw events; no automatic cost rollups, session summaries, or trend analysis
- UI noise for single-agent use — dual-color session tracking, multi-app filtering designed for parallel agents feels heavy for one-off sessions
- Limited alerting — no threshold notifications, no blocker detection, no Telegram/Slack integration
- Fork fragmentation risk — 291 forks suggests potential community splitting if alternative versions emerge

### Community Sentiment

Positive reception from multi-agent developers and those learning Claude Code hooks. IndyDevDan's [YouTube tutorial](https://youtu.be/9ijnN985O_c) demonstrates the system thoroughly, building credibility. Community discussions highlight it as the definitive example of hook-based observability — "if you want to understand hooks deeply, read this codebase." Some users report it's "overkill for single-agent work" but "indispensable when running 3+ agents in parallel." The security features (dangerous command blocking) get praise as a production-ready pattern worth copying even without the full monitoring stack. Mentioned in [Awesome Claude Code](https://github.com/hesreallyhim/awesome-claude-code) list and featured in DEV Community articles on [observable AI systems](https://dev.to/bredmond1019/mastering-claude-hooks-building-observable-ai-systems-part-2-2ic4).

### Compared To

- **ccflare** (`catalogue/monitoring/ccflare.md`): Web dashboard for cost tracking. ccflare parses logs post-facto; this tool streams events in real-time. ccflare focuses on token/cost metrics; this tool captures full hook payloads (tool use, prompts, system commands). This tool is heavier infrastructure but more comprehensive for multi-agent debugging.
- **claude-code-otel** (`catalogue/monitoring/claude-code-otel.md`): Full Prometheus + Grafana observability stack. claude-code-otel is enterprise-grade with log aggregation (Loki), custom queries, alerting; this tool is lighter (Bun + Vue vs Docker + Prometheus + Grafana). This tool is better for developer understanding; claude-code-otel is better for production fleet monitoring.
- **ccusage** (`catalogue/scheduling/ccusage.md`): CLI-only cost tracking. ccusage is instant (one command, no server); this tool requires running server + client. ccusage shows costs; this tool shows event flow. Complementary rather than competing — use ccusage for quick checks, this tool for deep debugging.
- **Dev-Agent-Lens** (Arize): Commercial observability platform for Claude Code with cloud-based tracing. This tool is local-only, free, open source. Dev-Agent-Lens offers cross-session analytics and ML-powered insights; this tool offers real-time visibility and educational code examples.

## Our Usage

**Status: Watching** — Not installed yet.

**Why watching:**
- **Multi-agent focus aligns with Phase 5:** When running Ralph loops via Claude Squad + runCLAUDErun, real-time monitoring across sessions becomes valuable
- **Hook mastery educational value:** The codebase demonstrates production-ready hook patterns (validation, security, event transmission) worth studying even if we don't run the full dashboard
- **Real-time debugging:** When a Ralph loop hits a blocker, seeing the exact event flow (PreToolUse → error → Stop) helps diagnose faster than log parsing
- **Security patterns reusable:** The dangerous command blocking in pre_tool_use.py is a pattern we should implement regardless of the monitoring dashboard

**Why not chosen:**
- **Infrastructure overhead for current workflow:** Running server + client + per-project hook setup is heavy when we're primarily running single-agent sessions
- **ccusage + Claude Code native logging sufficient for now:** We don't yet have the multi-agent parallelism that justifies real-time event streaming
- **Hook setup fragmentation:** Copying `.claude` directory to every project creates maintenance burden (updates to hook scripts require propagation)
- **No blocker notification integration:** Dashboard shows events but doesn't push blockers to Telegram (our chosen notification channel via OpenClaw)

**Potential future use:**
- **Phase 5 (Repeat It):** When running 3+ autonomous Ralph loops overnight, start the dashboard to monitor progress before morning review
- **Hook script extraction:** Copy pre_tool_use.py's dangerous command validation into our global `~/.claude/hooks/` as a security layer
- **Educational reference:** Use the architecture and video tutorials to train Adam on advanced hook patterns before building custom workflow automation

**Decision criteria for adoption:**
- **Trigger:** Running 3+ concurrent Claude sessions regularly (Claude Squad with multiple projects)
- **Alternative check:** First try ccflare/better-ccflare for lighter-weight multi-session monitoring; only upgrade to this if event-level visibility is needed
- **Integration requirement:** Build custom bridge to push Stop events with blockers to OpenClaw → Telegram before full adoption

## Sources

- [GitHub README](https://github.com/disler/claude-code-hooks-multi-agent-observability)
- [IndyDevDan YouTube: Full breakdown](https://youtu.be/9ijnN985O_c)
- [IndyDevDan YouTube: Haiku 4.5 vs Sonnet 4.5 comparison](https://youtu.be/aA9KP7QIQvM)
- [DEV Community: Mastering Claude Hooks Part 2](https://dev.to/bredmond1019/mastering-claude-hooks-building-observable-ai-systems-part-2-2ic4)
- [Arize: Claude Code Observability and Tracing](https://arize.com/blog/claude-code-observability-and-tracing-introducing-dev-agent-lens/)
- [Claude Code Resource List (2026 Edition)](https://www.scriptbyai.com/claude-code-resource-list/)

---
*Last reviewed: 2026-02-07*
