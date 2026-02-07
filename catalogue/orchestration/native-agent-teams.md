# Native Agent Teams (Claude Code)

| Field | Value |
|-------|-------|
| GitHub | Built-in (Anthropic) |
| Stars | N/A (native feature) |
| Last Commit | N/A (ships with Claude Code) |
| Install | `export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` |
| Status | ★ CHOSEN |
| Category | orchestration |
| Holy Grail Phase | Supporting |

## What It Does

Claude Code Agent Teams is an experimental multi-agent orchestration feature built directly into Claude Code (Opus 4.6). A Team Lead agent coordinates multiple teammate agents, each with independent 1M token context windows, working in parallel on different parts of a codebase. The lead decomposes work into a shared task list (DAG), delegates to teammates, and synthesizes their results — enabling parallel development across files and concerns without context window contention.

## How It Works

Enable with the environment variable:
```bash
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

**Key concepts:**
- **Team Lead**: The primary agent that coordinates all work. Breaks down the user's request into a task DAG, assigns tasks to teammates, and synthesizes final results.
- **Teammates**: Independent Claude Code instances, each with their own 1M token context. They can read/write files, run commands, and communicate results back.
- **Shared Task List (DAG)**: Tasks have dependencies. Teammates pick up tasks when prerequisites are met. Visible via Ctrl+T.
- **Peer-to-Peer Messaging**: Teammates can communicate directly, not just through the lead.
- **Git Worktree Isolation**: Each teammate operates in its own git worktree, preventing merge conflicts during parallel work.
- **Delegate Mode**: Press Shift+Tab to lock the Team Lead into coordination-only mode — it plans and delegates but never writes code itself.

**Workflow:**
1. User describes the task
2. Team Lead creates task DAG
3. Teammates are spawned and assigned tasks
4. Teammates work in parallel with independent contexts
5. Results are synthesized by the lead
6. Changes merged back from worktrees

**Cost**: ~5-7x token usage compared to single-agent (each teammate has full context loaded).

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 4 | 1.20 |
| Simplicity | 20% | 4 | 0.80 |
| Community trust | 15% | 5 | 0.75 |
| Ecosystem fit | 15% | 5 | 0.75 |
| Cost efficiency | 10% | 2 | 0.20 |
| Maturity | 10% | 3 | 0.30 |
| **Composite** | | | **4.00** |

### Strengths
- Native to Claude Code — no plugins, no MCP servers, no dependency management
- Reliable and well-tested by Anthropic
- True parallel execution with independent 1M token contexts
- Git worktree isolation prevents conflicts
- DAG-based task scheduling handles dependencies correctly
- Delegate mode enforces clean separation of concerns

### Weaknesses
- No session resumption — if the session ends, all teammate state is lost
- One team per session — cannot run multiple teams simultaneously
- No nested teams — a teammate cannot spawn its own team
- Experimental flag required — API may change
- 5-7x token cost makes it expensive for routine work
- No persistent memory across sessions
- No verification pipeline (teammates trust each other's output)
- No cost-aware routing (cannot send simple tasks to cheaper models)
- No cross-session learning

### Community Sentiment
Early adopters report it works well for large refactors and multi-file features. The main complaints center on cost and the experimental nature. Many note it provides the "real" version of what tools like claude-flow promise but fail to deliver. Anthropic has been iterating on this feature based on feedback.

### Compared To
- **claude-flow** (`catalogue/orchestration/claude-flow.md`): 92% architectural overlap. Native Agent Teams is more reliable, better tested, and doesn't require external dependencies. claude-flow's only unique value is cross-provider routing.
- **Crystal** (`catalogue/orchestration/crystal.md`): Crystal manages parallel sessions visually but doesn't provide the DAG-based coordination or peer messaging that Agent Teams offers.
- **Subagents** (`catalogue/native/subagents.md`): Subagents are lighter weight (summarized results, lower cost) but don't have independent contexts or parallel execution.

## Our Usage

Chosen as our primary orchestration mechanism for complex multi-file tasks. Used when a task naturally decomposes into 3+ parallel workstreams (e.g., "add a new feature that touches API, frontend, and tests simultaneously"). For simpler tasks, we use standard subagents to save on token costs.

**Configuration:**
```bash
# Add to shell profile
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

Not used for routine single-concern work — the 5-7x cost multiplier means subagents remain the default for most tasks. Agent Teams is reserved for genuinely parallel workloads.

## Sources

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Claude Code Agent Teams Announcement](https://www.anthropic.com/news)

---
*Last reviewed: 2026-02-07*
