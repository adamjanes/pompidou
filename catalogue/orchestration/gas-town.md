# Gas Town

| Field | Value |
|-------|-------|
| GitHub | [steveyegge/gastown](https://github.com/steveyegge/gastown) |
| Stars | 8,500 |
| Last Commit | Feb 2026 |
| Install | See README (Go-based, requires tmux) |
| Status | Watching |
| Category | orchestration |
| Holy Grail Phase | 3-Run |

## What It Does

Multi-agent workspace manager by Steve Yegge (creator of Beads). Coordinates 20-30 parallel Claude Code agents using tmux sessions. Defines 7 specialized agent roles: Mayor (orchestrator), Polecats (workers), Refinery (code review), Witness (testing), Deacon (documentation), Dogs (security), and Crew (general purpose). Built on top of Beads for git-backed issue tracking, making it the natural "execution layer" for Beads-managed projects. Designed for developers who want maximum parallelism and are willing to pay the API costs.

## How It Works

Gas Town runs as a Go binary that manages a fleet of tmux sessions, each running a Claude Code agent with a specific role. The Mayor agent reads tasks from Beads (git-native issue tracker) and decomposes them into subtasks assigned to specialized agents. Polecats are the primary worker agents that write code. Refinery agents review Polecat output. Witness agents run tests. Deacon agents maintain documentation. Dogs agents scan for security issues. Crew agents handle miscellaneous tasks. All agents work on isolated git worktrees to avoid conflicts, and the Mayor coordinates merges. Communication between agents happens through the git-backed Beads issue system — agents update issue status, leave comments, and flag blockers. The Go binary handles process management, health checks, and automatic respawning of failed agents.

## Evaluation

### Strengths
- Created by Steve Yegge, the author of Beads — validates our choice of Beads as the task tracking layer and ensures tight integration
- Mature orchestration architecture with 7 specialized roles covering the full development lifecycle (code, review, test, docs, security)
- Built on Beads for git-backed issue tracking — no additional task management layer needed
- Serious parallel execution: designed for 20-30 simultaneous agents
- Git worktree isolation prevents agent conflicts on shared codebases
- Go binary is fast and has minimal runtime dependencies

### Weaknesses
- Extremely expensive to run — designed for developers who "don't worry about API costs" (20-30 agents burning tokens simultaneously)
- Complex 7-role hierarchy may be overkill for small-to-medium projects with 1-3 active tasks
- Go-based — adds a build dependency outside our typical TypeScript/Node stack
- Requires significant infrastructure (tmux, multiple git worktrees, disk space for parallel checkouts)
- Less community adoption (8,500 stars) compared to simpler alternatives
- No built-in cost monitoring or budget controls

### Community Sentiment

Positive on Reddit and developer forums. Seen as "what Beads was building toward" — the full realization of Steve Yegge's vision for git-native AI orchestration. Developers respect the architecture but many note it is aspirational for their current budget and project size. Common sentiment: "I want to run this but can't justify the API costs yet." Some excitement about the specialized roles, particularly the Dogs (security) and Witness (testing) agents.

### Compared To

- **Our composable stack (Oh-My-ClaudeCode + Beads + tmux)** — Simpler, cheaper, and more flexible. We can scale from 1 to N agents incrementally. Gas Town is all-or-nothing at 20-30 agents.
- **Oh-My-ClaudeCode** — Zero-config autonomous execution for a single agent. Gas Town is the multi-agent version of this concept but with far more complexity and cost.
- **Claude Squad** — Lighter-weight multi-session management via tmux. Less sophisticated (no specialized roles) but much simpler to set up and run.
- **Vibe Kanban** — Visual dashboard approach vs Gas Town's terminal-based approach. Vibe Kanban supports multiple AI tools; Gas Town is Claude Code-only but deeper.
- **claude-flow** — Claims similar multi-agent orchestration but with fabricated benchmarks and broken features. Gas Town is the credible version of what claude-flow promised.

## Our Usage

Watching. Gas Town validates our Beads choice — if the Beads author built his orchestration layer on top of it, the foundation is solid. However, Gas Town is overkill for our current needs. We are in the "1-3 parallel loops" phase, not the "20-30 agents" phase. The cost alone (estimated $50-200+ per run with 20+ agents) makes it impractical until our projects generate revenue to justify the spend. Worth revisiting when: (1) we have revenue from projects, (2) we need more than 5 parallel agents, and (3) the simpler Oh-My-ClaudeCode + tmux approach hits its ceiling.

## Sources

- [GitHub: steveyegge/gastown](https://github.com/steveyegge/gastown)
- [Reddit: r/ClaudeAI discussions on Gas Town and Beads](https://reddit.com/r/ClaudeAI)
- [Steve Yegge's blog posts on AI orchestration](https://steve-yegge.blogspot.com/)

---
*Last reviewed: 2026-02-07*
