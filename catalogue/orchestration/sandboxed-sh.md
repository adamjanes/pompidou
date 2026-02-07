# sandboxed.sh

| Field | Value |
|-------|-------|
| GitHub | [Th0rgal/sandboxed.sh](https://github.com/Th0rgal/sandboxed.sh) |
| Stars | 186 |
| Last Commit | 2026-02-07 |
| Install | [Docker guide](https://github.com/Th0rgal/sandboxed.sh/blob/main/docs/install-docker.md) or [Native guide](https://github.com/Th0rgal/sandboxed.sh/blob/main/docs/install-native.md) |
| Status | Watching |
| Category | orchestration |
| Holy Grail Phase | Supporting |

## What It Does

Self-hosted cloud orchestrator for AI coding agents that runs Claude Code, OpenCode, and Amp in isolated Linux workspaces (systemd-nspawn containers) with a unified dashboard (Next.js web + SwiftUI iOS). Manages skills, tools, rules, agents, and MCPs via git-backed Library with real-time monitoring (CPU, memory, network, mission timeline).

## How It Works

Install via Docker (5 min, any OS) or native (30 min, Ubuntu 24.04 LTS). Dashboard runs on localhost:3000.

**Core features**:
- **Dual Runtime Support**: Claude Code or OpenCode agents in same infrastructure
- **Mission Control**: Start, stop, monitor agents remotely with real-time streaming
- **Isolated Workspaces**: Containerized Linux environments (systemd-nspawn) with per-mission directories
- **Git-backed Library**: Single repo for skills, tools, rules, agents, MCPs (version controlled)
- **MCP Registry**: Optional tool servers (desktop/playwright/etc.) when needed
- **Multi-platform**: Web dashboard (Next.js) + iOS app (SwiftUI) with Picture-in-Picture

**Ecosystem support**:
- **Claude Code**: Anthropic's official agent with native skills support (.claude/skills/)
- **OpenCode**: Open-source alternative via [oh-my-opencode](https://github.com/code-yeongyu/oh-my-opencode)
- **Amp**: Sourcegraph's frontier agent with multi-model support

**Use cases**:
- Point agent at GitHub issue → writes code, tests, opens PR → you review diff, not process
- Multi-day operations: Give agent SSH + VPN → reads Nvidia docs, sets up training, fine-tunes models while you sleep
- Local data: Analyze sequenced DNA against literature (local inference, isolated containers, nothing leaves machine)

**Infrastructure**: Rust backend (systemd-nspawn orchestration), Next.js dashboard, optional Docker deployment, native X11 or Xvfb for desktop automation.

## Evaluation

### Strengths
- Ambitious vision: "Hand off entire dev cycles" to autonomous agents
- Isolation via systemd-nspawn (safer than shared environments)
- Multi-runtime support (Claude Code, OpenCode, Amp)
- Git-backed configuration (skills, tools, rules versioned)
- Real-time monitoring dashboard (CPU, memory, network, timeline)
- Desktop automation support (headless Xvfb or native X11)
- Active development (updated Feb 7, 2026)
- Good documentation (install guides, getting started, screenshots)
- iOS app for mobile monitoring
- Self-hosted (no vendor lock-in)

### Weaknesses
- Heavy infrastructure (requires Docker or Ubuntu 24.04 + systemd-nspawn)
- Complexity: Not "zero config" (Docker needs privileged mode for containers, native needs 30 min setup)
- Work in progress (README: "This project is under active development")
- Young project (fewer stars than AI Maestro)
- Overlaps with simpler tools (tmux + Claude Squad for process isolation)
- No integration with OpenSpec, Beads, or OMC
- Desktop automation via Xvfb adds overhead for CLI-only workflows
- Multi-runtime support may fragment focus (Claude Code, OpenCode, Amp all different APIs)

### Community Sentiment

Vision resonates with autonomous agent community. Reddit/HN discussions on "sandboxing AI agents" cite sandboxed.sh as example of self-hosted orchestrators.

Blog posts like ["Taming AI agents: The autonomous workforce of 2026"](https://www.cio.com/article/4064998/taming-ai-agents-the-autonomous-workforce-of-2026.html) and ["Top AI sandbox platforms in 2026"](https://northflank.com/blog/top-ai-sandbox-platforms-for-code-execution) mention sandboxing trend but don't specifically endorse sandboxed.sh.

[Complete Guide to Sandboxing Autonomous Agents](https://www.ikangai.com/the-complete-guide-to-sandboxing-autonomous-agents-tools-frameworks-and-safety-essentials/) covers tools/frameworks — sandboxed.sh fits the "self-hosted orchestrator" category alongside AI Maestro.

Community interest in MicroVMs, gVisor, isolation strategies suggests this problem space is hot but fragmented (many solutions, no clear winner).

### Compared To

- **AI Maestro**: Similar vision (orchestrate agents across machines) but different implementation (dashboard + memory vs isolated workspaces + git library)
- **Claude Squad + tmux**: Process isolation via tmux sessions vs containerized Linux workspaces. Simpler but less isolation.
- **Docker + Claude Code**: Manual docker run vs orchestrated mission control. sandboxed.sh adds dashboard, git-backed config, multi-runtime support.
- **Native Claude Code**: No isolation, shared filesystem. sandboxed.sh adds safety via systemd-nspawn containers.

## Our Usage

**Watching** — Fascinating vision for autonomous multi-day operations but overkill for current needs. Adam's setup:
- Single machine (Mac) for now
- Planned: Ralph (Mac Mini) will run Claude Squad in tmux sessions
- No need for desktop automation (CLI workflows only)
- No multi-runtime requirement (Claude Code only)

**When to revisit**:
- If Adam runs untrusted code (open-source contributions, security analysis)
- If multi-day autonomous operations require isolation (training models, long-running tests)
- If Ralph needs stronger safety guarantees (systemd-nspawn vs tmux)

**Blockers**:
- Heavy infrastructure (Docker privileged mode or Ubuntu 24.04 native)
- Work in progress (not production-ready)
- Overlaps with simpler chosen tools (Claude Squad for process, Native Agent Teams for coordination)
- No integration path with OpenSpec → Beads → OMC pipeline
- Desktop automation overhead (Xvfb) unnecessary for CLI workflows

**Decision**: Defer until isolation becomes critical. For now, tmux + Claude Squad + git worktree isolation (planned) cover 80% of use case with lower overhead.

**Score**: 3.50/5.00
- Holy Grail alignment (30%): 0.80 — Enables autonomous multi-day operations but not a core phase tool
- Simplicity (20%): 0.40 — Complex setup (Docker privileged, systemd-nspawn, git library, dashboard)
- Community trust (15%): 0.55 — 186 stars, active development, transparent roadmap (WIP disclaimer)
- Ecosystem fit (15%): 0.50 — Works alongside Claude Code but doesn't integrate with our pipeline
- Cost efficiency (10%): 0.70 — Self-hosted (no API costs) but heavy infrastructure overhead
- Maturity (10%): 0.55 — Early stage (WIP) but actively developed, good docs

## Sources

- [GitHub - Th0rgal/sandboxed.sh](https://github.com/Th0rgal/sandboxed.sh)
- [sandboxed.sh Website](https://sandboxed.sh)
- [Docker Installation Guide](https://github.com/Th0rgal/sandboxed.sh/blob/main/docs/install-docker.md)
- [Native Installation Guide](https://github.com/Th0rgal/sandboxed.sh/blob/main/docs/install-native.md)
- [Getting Started Guide](https://github.com/Th0rgal/sandboxed.sh/blob/main/docs/getting-started.md)
- [Taming AI agents: The autonomous workforce of 2026 - CIO](https://www.cio.com/article/4064998/taming-ai-agents-the-autonomous-workforce-of-2026.html)
- [Top AI sandbox platforms in 2026 - Northflank](https://northflank.com/blog/top-ai-sandbox-platforms-for-code-execution)
- [Complete Guide to Sandboxing Autonomous Agents](https://www.ikangai.com/the-complete-guide-to-sandboxing-autonomous-agents-tools-frameworks-and-safety-essentials/)

---
*Last reviewed: 2026-02-07*
