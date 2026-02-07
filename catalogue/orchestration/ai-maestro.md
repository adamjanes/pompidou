# AI Maestro

| Field | Value |
|-------|-------|
| GitHub | [23blocks-OS/ai-maestro](https://github.com/23blocks-OS/ai-maestro) |
| Stars | 236 |
| Last Commit | 2026-02-07 |
| Install | See [QUICKSTART.md](https://github.com/23blocks-OS/ai-maestro/blob/main/docs/QUICKSTART.md) |
| Status | Watching |
| Category | orchestration |
| Holy Grail Phase | Supporting |

## What It Does

AI Maestro is a self-hosted AI agent orchestrator that gives Claude Code agents persistent memory (Code Graph + CozoDB), agent-to-agent messaging, and a unified web dashboard (port :23000) to manage Claude, Aider, and Cursor across multiple machines (laptop, remote servers, Docker containers). It's a tmux alternative with modern AI-first features.

## How It Works

Deploy AI Maestro on your infrastructure (laptop, server, or cloud). It provides:

- **Dashboard**: Web UI (Next.js) and iOS app (SwiftUI) with Picture-in-Picture to view all agents across all machines
- **Agent discovery**: Automatically finds terminal-based AI coding agents (Claude Code, Aider, Continue, GitHub Copilot CLI)
- **Persistent memory**: Shared knowledge base (Code Graph + CozoDB) that grows over time
- **Agent-to-agent messaging**: Direct communication without manual copy-paste
- **Multi-machine support**: One dashboard, unlimited nodes (MacBook, Mac Mini, AWS server all visible)
- **Skills system**: Git-backed library of tools and configurations
- **Zero config**: Works out-of-the-box with supported agents

Architecture: Browser connects to any node at :23000 → nodes sync state → agents communicate via messaging layer.

Open-source (MIT license), no SaaS, no premium tiers, no usage limits.

## Evaluation

### Strengths
- Addresses real pain point: scattered agents across terminals/machines
- Persistent memory across sessions (vs. Claude Code's per-session context)
- Agent-to-agent messaging (no human-in-the-loop relay)
- Multi-machine orchestration from single dashboard
- Works with multiple agent types (Claude, Aider, Cursor)
- Free and open-source (MIT)
- Active development (updated Feb 7, 2026)
- Mobile access (iOS app)
- No vendor lock-in (self-hosted)

### Weaknesses
- Requires infrastructure setup (Node.js >=18.17, CozoDB, potentially Docker)
- Complexity: Not "zero config" for multi-machine setup (VPN/SSH coordination)
- Overlaps with native Claude Code features (subagents, agent teams, background tasks)
- Young project (v0.21.2) — API stability unknown
- CozoDB dependency adds learning curve
- No integration with OpenSpec, Beads, or OMC (independent stack)
- Dashboard overhead for single-machine workflows

### Community Sentiment

Positive reception for vision of "coordinated team not isolated tools." Blog post ["The Future of Work: Humans + AI Agents"](https://ai-maestro.23blocks.com/vision.html) resonates with autonomous coding narrative.

Compared favorably to basic tmux but criticized as overkill for solo developers on one machine. [Medium article](https://medium.com/@joe.njenga/i-tested-oh-my-claude-code-the-only-agents-swarm-orchestration-you-need-7338ad92c00f) titled "I Tested Oh My Claude Code The Only Agents Swarm Orchestration You Need" suggests ecosystem competition.

GitHub [discussions/issues](https://github.com/23blocks-OS/ai-maestro/issues) show users deploying on AWS, Mac Mini, multi-machine setups (target audience: power users, teams, autonomous systems).

### Compared To

- **tmux + Claude Squad**: AI Maestro = tmux + dashboard + agent messaging + memory. More features but heavier.
- **Claude Code Native Agent Teams**: Native agent-to-agent via `.claude/agents/` — simpler, no dashboard, no multi-machine.
- **sandboxed.sh**: Similar vision (orchestrator for autonomous agents) but different focus (isolated workspaces vs. unified dashboard).
- **claude-flow**: Multi-agent orchestration but [ranked #1 in frameworks](https://github.com/ruvnet/claude-flow), different architecture (swarm intelligence vs. hub-and-spoke).

## Our Usage

**Watching** — Fascinating vision but not needed yet. Adam's current setup uses:
- Single machine (Mac) for now
- Native Claude Code subagents + agent teams (no dashboard required)
- tmux sessions for process management
- Planned: Ralph (Mac Mini) will run Claude Squad, but still single-operator

**When to revisit**:
- If Adam scales to multi-machine autonomous agents (Ralph + cloud workers)
- If agent-to-agent messaging becomes critical (currently handled by human review)
- If persistent memory (Code Graph + CozoDB) proves superior to file-based knowledge/

**Blockers**:
- Adds infrastructure complexity (CozoDB, dashboard, multi-machine networking)
- Overlaps with already-chosen tools (Claude Squad for process, Native Agent Teams for coordination)
- No clear integration path with OpenSpec → Beads → OMC pipeline

**Decision**: Defer until multi-machine orchestration becomes a bottleneck. For now, Native Agent Teams + Claude Squad + tmux cover 90% of the use case with lower overhead.

**Score**: 3.70/5.00
- Holy Grail alignment (30%): 0.85 — Enables multi-machine autonomous agents but not a core phase
- Simplicity (20%): 0.50 — Complex setup (CozoDB, dashboard, multi-machine networking)
- Community trust (15%): 0.60 — 236 stars, active development, transparent roadmap
- Ecosystem fit (15%): 0.50 — Works alongside Claude Code but doesn't integrate with our pipeline
- Cost efficiency (10%): 0.70 — Self-hosted (no API costs) but infrastructure overhead
- Maturity (10%): 0.55 — Early stage (v0.21.2) but actively developed

## Sources

- [GitHub - 23blocks-OS/ai-maestro](https://github.com/23blocks-OS/ai-maestro)
- [AI Maestro - The Future of Work: Humans + AI Agents](https://ai-maestro.23blocks.com/)
- [AI Maestro Vision](https://ai-maestro.23blocks.com/vision.html)
- [Medium: I Tested Oh My Claude Code](https://medium.com/@joe.njenga/i-tested-oh-my-claude-code-the-only-agents-swarm-orchestration-you-need-7338ad92c00f)

---
*Last reviewed: 2026-02-07*
