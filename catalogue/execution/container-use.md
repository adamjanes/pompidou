# Container Use

| Field | Value |
|-------|-------|
| **GitHub** | [dagger/container-use](https://github.com/dagger/container-use) |
| **Stars** | 3,500 |
| **Last Commit** | Active (2026) |
| **Install** | macOS: `brew install dagger/tap/container-use` / All: `curl -fsSL https://raw.githubusercontent.com/dagger/container-use/main/install.sh \| bash` |
| **Status** | Watching |
| **Category** | Execution |
| **Holy Grail Phase** | 3-Run |

## What It Does

Container Use is an MCP server from Dagger that provides isolated, containerized development environments for coding agents. Each agent gets a fresh container on its own git branch, enabling multiple AI agents to work simultaneously on the same codebase without conflicts. It provides real-time command history, logs, and direct terminal intervention -- you can drop into any agent's container to see its state and take control when it gets stuck. No vendor lock-in; works with Claude Code, Cursor, Goose, and any MCP-compatible agent.

## How It Works

### Architecture

Container Use runs as an MCP server that any agent can connect to:

```bash
container-use stdio   # Start the MCP server
```

All agents use identical configuration -- just add `container-use stdio` as an MCP server. The shorthand `cu` is also available.

### Isolation Model

- Each agent operates in a fresh container with its own git branch
- Containers include the full development stack (configurable)
- Work is managed via standard git commands: `git checkout <branch_name>` to review results
- No cross-agent interference -- true parallel execution

### Visibility and Control

- **Command history**: Complete log of what agents actually did (not just what they claim)
- **Real-time logs**: Watch agent progress as it happens
- **Terminal intervention**: Drop into any agent's terminal to inspect state or take manual control
- **Git-based results**: Standard `git diff` and `git checkout` to review agent output

### Technical Details

- Built on Dagger (serious containerization platform by Docker co-founder)
- Written in Go (96.8% of codebase)
- Apache 2.0 license
- Early development stage but actively evolving

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 3 | 0.90 |
| Simplicity | 20% | 3 | 0.60 |
| Community trust | 15% | 3 | 0.45 |
| Ecosystem fit | 15% | 3 | 0.45 |
| Cost efficiency | 10% | 2 | 0.20 |
| Maturity | 10% | 2 | 0.20 |
| **Composite** | | | **2.80** |

### Strengths
- True isolation solves the multi-agent conflict problem -- agents cannot step on each other's work
- Backed by Dagger (Solomon Hykes, Docker co-founder) -- serious engineering, not a hobby project
- MCP server architecture means it works with any MCP-compatible agent, not just Claude Code
- Git-based workflow is natural for developers -- review agent work with familiar tools
- Terminal intervention is a unique feature: inspect and fix agent state without restarting
- Command history provides ground truth about what agents did (addresses hallucination concerns)

### Weaknesses
- Early development stage -- "experimental, actively evolving" per their own description
- Container overhead: each agent needs a full container, which consumes more resources than worktree-based isolation
- Requires Docker/container runtime on the host machine
- Resource-intensive for Mac Mini if running multiple containers simultaneously
- 3.5K stars is modest compared to other tools in this category
- No built-in scheduling or auto-restart -- purely an isolation layer

### Community Sentiment
Growing interest driven by Dagger's reputation. Users appreciate the isolation model but note the early-stage nature. The Docker/Dagger pedigree lends significant credibility. Discord community is active.

### Compared To
- **Git worktrees (Superpowers, Compound Engineering)**: Lighter weight isolation but agents share the same filesystem. Container Use provides stronger isolation at higher resource cost.
- **Claude Squad / tmux**: Process-level management without filesystem isolation. Container Use provides both isolation and management.
- **Docker Compose**: Manual container orchestration. Container Use is purpose-built for AI agent workflows with MCP integration.

## Our Usage

**Plan:** Evaluate for Phase 3-Run multi-agent execution on Mac Mini. The key question is whether the container overhead is worth the isolation benefit compared to git worktree-based approaches.

**Potential scenarios:**
1. **Parallel Ralph loops**: Run frequency-first, linkedin, and firstcomment loops in separate containers without cross-project conflicts
2. **Safe experimentation**: Agents working on risky refactors can't damage the main codebase
3. **Terminal intervention**: When a Ralph loop gets stuck overnight, drop in to inspect and unblock without killing the session
4. **Audit trail**: Command history provides ground truth for reviewing what overnight loops actually did

**Concerns:**
- Mac Mini resource constraints: running 3-4 containers plus Claude Code sessions may exceed available memory
- OpenClaw is designed to run in Docker already -- adding Container Use means two container layers
- Container startup time may slow down Ralph loop iterations that frequently restart
- Early-stage software risk: breaking changes likely

**Decision:** Watch for now. Current plan uses git worktrees (via Superpowers or Oh-My-ClaudeCode) for isolation, which is lighter weight. Revisit Container Use when:
- We need true multi-agent parallel execution (not just sequential loops)
- The project matures past "experimental" stage
- We have confirmed Mac Mini can handle the container overhead

## Sources

- [GitHub Repository](https://github.com/dagger/container-use)
- [Dagger Platform](https://dagger.io)

---
*Last reviewed: 2026-02-06*
