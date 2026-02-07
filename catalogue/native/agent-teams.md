# Agent Teams (Native Claude Code)

| Field | Value |
|-------|-------|
| GitHub | Built-in (Anthropic) |
| Stars | N/A (native feature) |
| Last Commit | N/A (ships with Claude Code) |
| Install | `export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` |
| Status | ★ CHOSEN |
| Category | native |
| Holy Grail Phase | Supporting |

## What It Does

Claude Code Agent Teams is an experimental native feature that enables multi-agent collaboration within a single Claude Code session. A Team Lead agent coordinates multiple teammates, each running as an independent Claude Code instance with their own 1M token context window. The lead decomposes complex tasks into a shared DAG (directed acyclic graph) of subtasks, assigns them to teammates who execute in parallel, and synthesizes the results. This is Claude Code's built-in answer to multi-agent orchestration.

## How It Works

**Enable the feature:**
```bash
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

Add to your shell profile (`~/.zshrc` or `~/.bashrc`) for persistence.

**Architecture:**
- **Team Lead**: The primary agent you interact with. Responsible for task decomposition, delegation, and result synthesis. In Delegate mode (Shift+Tab), the lead is locked to coordination-only — it never writes code itself.
- **Teammates**: Independent Claude Code instances spawned by the lead. Each has its own 1M token context, can read/write files, run commands, and use tools. They report results back to the lead.
- **Shared Task DAG**: Tasks are organized in a dependency graph. A task can depend on other tasks, and teammates only pick up tasks whose dependencies are satisfied. View the task list with Ctrl+T.
- **Peer-to-Peer Messaging**: Teammates can communicate directly with each other, not just through the lead. Useful when one teammate's output is needed by another.
- **Git Worktree Isolation**: Each teammate operates in its own git worktree to prevent merge conflicts during parallel work. Changes are merged back when tasks complete.

**Workflow:**
1. User describes a complex task
2. Team Lead analyzes and creates a task DAG
3. Lead spawns teammates and assigns initial tasks
4. Teammates work in parallel on independent subtasks
5. As tasks complete, dependent tasks become available
6. Teammates communicate peer-to-peer as needed
7. Lead synthesizes results and presents to user
8. Worktree changes are merged

**Delegate mode:**
Press Shift+Tab to toggle Delegate mode. When enabled, the Team Lead cannot write code or run commands — it can only plan, delegate, and review. This enforces clean separation between coordination and execution, preventing the lead from "doing everything itself."

**Cost model:**
Each teammate loads full context (~1M tokens), so a team of 5 uses ~5-7x the tokens of a single agent. Token usage scales linearly with team size. There is no cost-aware routing — all teammates use the same model (Opus 4.6).

## Evaluation

### Strengths
- Native to Claude Code — zero installation, zero dependencies, zero configuration beyond the env var
- Reliable — tested and maintained by Anthropic, not a community plugin
- True parallelism — teammates work simultaneously on different parts of the codebase
- 1M token contexts — each teammate has the full context window, no summarization needed
- DAG-based scheduling — tasks execute in dependency order automatically
- Peer messaging — teammates coordinate directly without bottlenecking through the lead
- Worktree isolation — git-level separation prevents merge conflicts
- Delegate mode — clean separation of planning and execution

### Weaknesses
- **No session resumption**: If the session ends (crash, limit, close), all teammate state is lost. The team must be rebuilt from scratch.
- **One team per session**: Cannot run multiple teams simultaneously within a single Claude Code instance.
- **No nested teams**: A teammate cannot spawn its own team of sub-teammates.
- **Experimental**: Requires an environment variable flag. API and behavior may change between Claude Code versions.
- **5-7x token cost**: Linear cost scaling with team size makes it expensive for routine tasks.
- **No persistent memory**: Teams don't learn from previous sessions. Each session starts fresh.
- **No verification pipeline**: Teammates trust each other's output. No built-in code review or test gate between teammates.
- **No cost-aware routing**: Cannot send simple tasks to cheaper models (Haiku/Sonnet). All teammates use Opus.
- **No cross-session learning**: Patterns discovered by one team don't transfer to future teams.

### Community Sentiment
Early adopters report strong results for large refactors, multi-file features, and complex migrations. The consensus is that it delivers on the promise of multi-agent coordination where third-party tools (especially claude-flow) fall short. Main complaints center on cost (5-7x multiplier) and lack of session persistence.

Frequently cited as "what claude-flow should have been" — the same architectural concepts (DAG, delegation, parallel execution) but actually working. Power users note the experimental flag makes them cautious about production reliance.

### Compared To
- **Subagents** (`catalogue/native/subagents.md`): Subagents are lighter weight — results are summarized before returning, reducing token cost. But subagents don't have independent contexts or true parallelism. Use subagents for simple delegation, Agent Teams for complex parallel work.
- **claude-flow** (`catalogue/orchestration/claude-flow.md`): 92% architectural overlap. Agent Teams is native, reliable, and working. claude-flow has broken memory, broken hooks, and fabricated benchmarks. No contest.
- **Claude Squad** (`catalogue/process/claude-squad.md`): Claude Squad manages independent sessions. Agent Teams manages collaborating agents within one session. Complementary tools — use Squad for cross-project parallelism, Teams for within-project collaboration.

## Our Usage

Chosen as our native multi-agent solution for complex within-project tasks. Used when a task naturally decomposes into 3+ parallel workstreams that benefit from collaboration (shared task DAG, peer messaging).

**When to use Agent Teams:**
- Large refactors touching many files
- New features that span API, frontend, and tests
- Complex migrations requiring coordinated changes
- Architecture changes with many interdependencies

**When NOT to use Agent Teams (use subagents instead):**
- Simple delegation (research, writing, single-file changes)
- Cost-sensitive tasks
- Tasks that don't benefit from parallel execution
- Quick explorations or questions

**Configuration:**
```bash
# In ~/.zshrc
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

Used in combination with Delegate mode (Shift+Tab) when we want strict separation between planning and coding. This mirrors the orchestrator pattern defined in root CLAUDE.md: Claude plans, subagents/teammates execute.

## Sources

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Claude Code Changelog](https://docs.anthropic.com/en/docs/claude-code/changelog)

---
*Last reviewed: 2026-02-07*
