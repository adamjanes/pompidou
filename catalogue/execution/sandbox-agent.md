# Sandbox Agent

| Field | Value |
|-------|-------|
| GitHub | [rivet-dev/sandbox-agent](https://github.com/rivet-dev/sandbox-agent) |
| Stars | 614 |
| Last Commit | 2026-02-07 |
| Install | `curl -fsSL https://releases.rivet.dev/sandbox-agent/latest/install.sh \| sh` or `npm install sandbox-agent` |
| Status | Watching |
| Category | execution |
| Holy Grail Phase | Supporting |

## What It Does

Sandbox Agent is a universal HTTP/SSE server that runs coding agents (Claude Code, Codex, OpenCode, Amp) inside isolated sandboxes and exposes them via a standardized REST API. It solves the problem of remote agent control by providing streaming events, human-in-the-loop permissions, and a universal session schema that normalizes differences between agent implementations.

## How It Works

**Three deployment modes:**
1. **Embedded Mode** — Import the TypeScript SDK and run agents locally as subprocesses
2. **Server Mode** — Run as HTTP daemon in E2B, Daytona, Vercel Sandboxes, or Docker
3. **CLI Mode** — Use `sandbox-agent` commands to mirror HTTP endpoints

**Key components:**
- **Rust server** — Static binary exposing HTTP + SSE API on port 2468
- **TypeScript SDK** — Full type safety for embedded or remote connections
- **Inspector UI** — Built-in web interface for debugging sessions (e.g., `localhost:2468/ui/`)
- **Universal schema** — Normalizes tool calls, permissions, edits across agents

**API workflow:**
```bash
# Create session
POST /sessions/demo {"agent": "codex", "agentMode": "default"}

# Send message
POST /sessions/demo/messages {"message": "Hello"}

# Stream events (SSE)
GET /sessions/demo/events
# Returns: tool_called, permission_requested, file_edited, etc.
```

**Auto-installs agents** on first use (no manual setup). Agents run inside the sandbox, not on your local machine.

## Evaluation

### Strengths
- **Universal adapter pattern** — Swap agents with config change, no code rewrite
- **Streaming + human-in-the-loop** — Approve/deny tool executions remotely via HTTP
- **Production-ready** — Static Rust binary, predictable memory, fast startup
- **Sandbox-first design** — Built for remote execution, not retrofitted from local CLI tools
- **Strong DevEx** — Interactive Inspector UI, TypeScript SDK with full types, OpenAPI spec
- **Multi-agent support** — Claude Code, Codex, OpenCode, Amp all supported via adapters

### Weaknesses
- **New ecosystem** — Released January 2026, limited production battle-testing
- **Storage out of scope** — Streaming-only, you must persist events yourself (Postgres, ClickHouse, Rivet)
- **Adds network layer** — HTTP latency vs direct CLI invocation
- **Sandbox provider required** — For production, assumes E2B/Daytona/Vercel infrastructure
- **Complex for simple use cases** — Overkill if you're only running agents locally

### Community Sentiment

**Positive reception:** Launched with extensive documentation and active Rivet team support. Reddit and HN discussions praise the unified API approach to multi-agent orchestration.

> "Coding agents expect interactive terminals with proper TTY handling. SSH with piped commands breaks tool confirmations, streaming output, and human-in-the-loop flows. The SDK handles all of this over a clean HTTP API." — [Sandbox Agent Docs](https://sandboxagent.dev/)

**Production validation:** Rivet.dev (the team behind it) uses this for their own game backend infrastructure, running agents in sandboxes for player-facing code execution.

**Early adoption:** Featured in [Claude Code Sandbox Guide](https://claudefa.st/blog/guide/sandboxing-guide) (2026) as recommended approach for remote agent control.

### Compared To

**vs. Native Claude Code** — Native runs locally with direct process control. Sandbox Agent adds HTTP layer for remote sandboxes. Use native for local dev, Sandbox Agent for production isolation.

**vs. [Container Use](container-use.md)** — Container Use focuses on Docker isolation. Sandbox Agent is sandbox-agnostic (E2B, Daytona, Vercel, Docker) and provides full HTTP API + event streaming.

**vs. [claude-code-proxy](claude-code-proxy-1rgs.md)** — Proxies intercept Claude Code traffic. Sandbox Agent runs agents as subprocesses and normalizes their APIs. Different architecture.

**vs. [Oh My ClaudeCode](oh-my-claudecode.md)** — OMC is a local CLI orchestrator. Sandbox Agent is for remote sandboxed execution with HTTP control.

## Our Usage

**Status: Watching.** Not chosen for Phase 3 because we're using [Oh My ClaudeCode](oh-my-claudecode.md) for local execution orchestration, and we don't currently need remote sandbox deployment.

**Potential future use case:** If we expand to multi-tenant hosted development (e.g., running agent sessions for clients in isolated sandboxes), Sandbox Agent becomes the obvious choice. The universal API would let us swap between Claude Code and other agents without rewriting integration logic.

**Deferred because:**
- Our current workflow is local-first (Mac Mini "Ralph")
- We don't have the infrastructure to run E2B/Daytona/Vercel sandboxes at scale yet
- The HTTP layer adds latency we don't need for local execution

**Re-evaluate if:** We start offering AI dev services to clients, need multi-tenant isolation, or want to run agents remotely for cost/security reasons.

## Sources

- [Sandbox Agent SDK Docs](https://sandboxagent.dev/)
- [GitHub Repository](https://github.com/rivet-dev/sandbox-agent)
- [Rivet Changelog: Introducing Sandbox Agent SDK](https://www.rivet.dev/changelog/2026-01-28-sandbox-agent-sdk/)
- [Claude Code Sandbox Guide](https://claudefa.st/blog/guide/sandboxing-guide)

---
*Last reviewed: 2026-02-07*
