# claude-code-ui

| Field | Value |
|-------|-------|
| GitHub | [KyleAMathews/claude-code-ui](https://github.com/KyleAMathews/claude-code-ui) |
| Stars | 351 |
| Last Commit | 2026-02-06 |
| Install | `git clone https://github.com/KyleAMathews/claude-code-ui && cd claude-code-ui && pnpm install && pnpm start` |
| Status | Watching |
| Category | monitoring |
| Holy Grail Phase | Supporting |
| Score | **3.70** |

## What It Does

claude-code-ui is a real-time dashboard for monitoring multiple Claude Code sessions across repositories using Durable Streams. It watches `~/.claude/projects/` for session log changes, parses JSONL logs incrementally, derives session status using an XState state machine, generates AI-powered summaries via Claude Sonnet API, detects git branches and polls for PR/CI status, and presents everything in a React-based Kanban UI grouped by repository with real-time streaming updates.

## How It Works

**Architecture:**
```
Claude Code Sessions (logs) → Daemon (watcher + state machine) → UI (React + TanStack)
                                   ↓
                             Durable Streams (SSE)
```

**Daemon (`packages/daemon`):**
- Watches `~/.claude/projects/` with chokidar
- Parses JSONL incrementally (handles partial files)
- XState state machine derives status from log events:
  - `idle` — no activity 5+ minutes
  - `working` — actively processing
  - `waiting_for_approval` — tool use needs approval
  - `waiting_for_input` — turn complete, waiting for user
- Calls Claude Sonnet API for session summaries
- Detects git branches, polls GitHub for PR/CI status
- Publishes updates to Durable Streams

**UI (`packages/ui`):**
- React app with TanStack Router + Radix UI
- Kanban columns: Working, Needs Approval, Waiting, Idle
- Groups sessions by GitHub repository
- Real-time SSE subscription
- Hover cards with recent output preview

**State Machine Events:**
| Event | Trigger | Description |
|-------|---------|-------------|
| `USER_PROMPT` | User message | User sent text |
| `TOOL_RESULT` | User approved tool | Tool ran |
| `ASSISTANT_STREAMING` | Assistant response | Claude outputting |
| `ASSISTANT_TOOL_USE` | Tool request | Claude wants tool |
| `TURN_END` | System marker | Turn completed |

**Fallback Timeouts** (for older Claude Code versions):
- 5 sec: tool_use pending → `waiting_for_approval`
- 60 sec: no turn-end → `waiting_for_input`
- 5 min: no activity → `idle`

**PermissionRequest Hook (Optional):**
For accurate "Needs Approval" detection, install hook via `pnpm run setup`. Without it, daemon uses heuristics based on tool names.

## Evaluation

### Strengths
- **Real-time visibility** — see all Claude sessions at a glance
- **Multi-repo support** — groups sessions by repository automatically
- **AI-powered summaries** — Claude Sonnet generates session descriptions
- **PR/CI integration** — tracks associated PRs and their CI status
- **Smart state detection** — XState machine handles complex session states
- **Late-join friendly** — new clients get full history via Durable Streams
- **Incremental parsing** — handles large JSONL files efficiently

### Weaknesses
- **Requires ANTHROPIC_API_KEY** — daemon needs Claude Sonnet for summaries (adds cost)
- **No built-in install** — manual git clone + pnpm setup
- **Network dependency** — requires Durable Streams service running
- **PermissionRequest hook optional** — without it, "Needs Approval" detection is heuristic
- **Single-machine** — watches local `~/.claude/projects/`, no cross-machine view
- **No historical analytics** — real-time only, no persistence or trends
- **Node/pnpm required** — heavier than pure CLI tools

### Community Sentiment

[Medium review by Ramu Narasinga (Jan 2026)](https://medium.com/@ramunarasinga/claude-code-ui-to-track-your-sessions-4df91cc59802):
- *"A real-time dashboard for monitoring Claude Code sessions across multiple projects to see what Claude is working on, which sessions need approval, and track PR/CI status."*
- Codebase analysis praises architecture: daemon + UI separation, XState for state management

[DEV Community post](https://dev.to/ramunarasinga-11/claude-code-ui-to-track-your-sessions-3no8):
- Highlights usefulness for teams running multiple Claude sessions
- Notes that it complements Claude Code's native analytics (which focuses on usage, not real-time session state)

**Alternatives:**
- [t09911221/claude-code-ui](https://github.com/t09911221/claude-code-ui) — fork with additional features
- [siteboon/claudecodeui (CloudCLI)](https://github.com/siteboon/claudecodeui) — mobile/web remote access to Claude Code sessions
- Native Claude Code analytics — [team usage tracking](https://code.claude.com/docs/en/analytics) (usage stats, not session monitoring)

### Compared To

- **ccmanager** — Process manager for starting/stopping sessions, not a dashboard
- **Claude HUD** — Notification-focused, not multi-session monitoring
- **claude-code-otel** — OpenTelemetry tracing, not UI dashboard
- **ccflare** — Cost tracking, not session status

claude-code-ui is the most comprehensive real-time multi-session dashboard for Claude Code.

## Our Usage

**Status: Watching** — not currently installed, but valuable for multi-session scenarios.

**Rationale:**
- Adam currently runs one primary Claude Code session at a time
- Useful when Ralph (Mac Mini) runs autonomous sessions overnight while Adam works on other tasks
- Adds API costs (Claude Sonnet for summaries) — worth evaluating if visibility justifies cost
- Requires Durable Streams setup — adds infrastructure complexity

**When to revisit:**
- When running multiple autonomous sessions simultaneously (Ralph + manual)
- When building team workflows where visibility into agent status is critical
- When managing client repos with separate Claude sessions per project
- If native Claude Code adds similar dashboard (reduce custom tool reliance)

**Configuration (if adopted):**
```bash
# Clone and install
git clone https://github.com/KyleAMathews/claude-code-ui.git
cd claude-code-ui
pnpm install

# Set API key
export ANTHROPIC_API_KEY=sk-ant-...

# Install PermissionRequest hook (optional, for accurate "Needs Approval" detection)
pnpm run setup

# Start daemon + UI
pnpm start
```

**Access:** `http://localhost:4450` (daemon), UI dev server auto-opens

## Scoring

| Criterion | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| Holy Grail alignment | 3/5 | 30% | 0.90 |
| Simplicity | 3/5 | 20% | 0.60 |
| Community trust | 4/5 | 15% | 0.60 |
| Ecosystem fit | 4/5 | 15% | 0.60 |
| Cost efficiency | 3/5 | 10% | 0.30 |
| Maturity | 3/5 | 10% | 0.30 |
| **Total** | | | **3.70** |

**Holy Grail alignment (3/5):** Supporting infrastructure for monitoring multiple autonomous sessions. Useful for "Run It" and "Flag It" phases when visibility is critical, but not essential for core workflow.

**Simplicity (3/5):** Manual setup (git clone + pnpm), requires Durable Streams, PermissionRequest hook for best accuracy. Not one-command install.

**Community trust (4/5):** Active development (last commit Feb 6, 2026), reviewed in community blogs, honest documentation about dependencies and tradeoffs.

**Ecosystem fit (4/5):** Designed specifically for Claude Code, reads native JSONL logs, integrates with GitHub PR/CI. Requires external API (Claude Sonnet) for summaries.

**Cost efficiency (3/5):** Requires Claude Sonnet API calls for summaries (adds cost per session). Node/pnpm runtime overhead. No infrastructure fees beyond API.

**Maturity (3/5):** Actively developed, but still early (351 stars, niche use case). XState and Durable Streams are mature dependencies. Documentation is good but setup is manual.

## Sources

- [GitHub: KyleAMathews/claude-code-ui](https://github.com/KyleAMathews/claude-code-ui)
- [Medium: Claude Code UI to track your sessions](https://medium.com/@ramunarasinga/claude-code-ui-to-track-your-sessions-4df91cc59802)
- [DEV Community: Claude Code UI to track your sessions](https://dev.to/ramunarasinga-11/claude-code-ui-to-track-your-sessions-3no8)
- [Claude Code Docs: Track team usage with analytics](https://code.claude.com/docs/en/analytics)
- [Alternatives: t09911221/claude-code-ui fork](https://github.com/t09911221/claude-code-ui)

---
*Last reviewed: 2026-02-07*
