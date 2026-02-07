# Task System (Native Claude Code)

| Field | Value |
|-------|-------|
| GitHub | Built-in (Anthropic) |
| Stars | N/A (native feature) |
| Last Commit | N/A (ships with Claude Code) |
| Install | `export CLAUDE_CODE_TASK_LIST_ID=project-name` |
| Status | Evaluated |
| Category | native |
| Holy Grail Phase | Supporting |

## What It Does

The Claude Code Task System provides structured, persistent task tracking within and across Claude Code sessions. Tasks are organized as a directed acyclic graph (DAG) with dependencies, priorities, and statuses. The task list persists across context compactions (when the conversation exceeds the context window and is summarized), ensuring long-running sessions don't lose track of what needs to be done. When shared via `CLAUDE_CODE_TASK_LIST_ID`, multiple Claude Code instances can coordinate on the same task list.

## How It Works

**Enable cross-session sharing:**
```bash
export CLAUDE_CODE_TASK_LIST_ID=project-name
```

Without this env var, tasks are session-local and don't persist beyond the current session.

**Viewing tasks:**
Press `Ctrl+T` within a Claude Code session to open the task list viewer. Shows all tasks with their status, dependencies, and assigned agent (if using Agent Teams).

**Task structure:**
Each task has:
- **ID**: Unique identifier
- **Description**: What needs to be done
- **Status**: pending, in_progress, completed, blocked
- **Dependencies**: List of task IDs that must complete first
- **Priority**: Ordering hint for task selection
- **Assignee**: Which agent/teammate is working on it (Agent Teams only)

**How tasks are created:**
- Claude Code automatically creates tasks when decomposing complex requests
- The TodoWrite tool (available to Claude Code) manages the task list
- Agent Team leads create tasks when building the DAG for teammates
- Users can request task creation by describing what needs to be done

**DAG execution:**
Tasks respect dependencies. A task with status "pending" won't be started until all its dependencies are "completed." This ensures work proceeds in the correct order, especially important for Agent Teams where multiple teammates pick up tasks in parallel.

**Context compaction resilience:**
When a long session hits the context window limit, Claude Code summarizes the conversation but preserves the task list intact. This means a 4-hour session that compacts multiple times still has the full task list available, with correct statuses and dependencies.

**Cross-session coordination:**
With `CLAUDE_CODE_TASK_LIST_ID` set, multiple Claude Code instances see the same task list. This enables:
- One instance creates tasks, another picks them up
- Agent Team teammates share the same task list
- A monitoring session can view progress without interfering

## Evaluation

### Strengths
- Native to Claude Code — no external tools or dependencies
- DAG structure handles complex task dependencies correctly
- Survives context compaction — critical for long autonomous sessions
- Cross-session sharing enables multi-agent coordination
- Ctrl+T provides quick visibility into task state
- Tasks are automatically created from natural language requests
- Integrates with Agent Teams for automated task assignment

### Weaknesses
- No persistent storage beyond active sessions — once all sessions sharing the ID close, tasks may be lost
- No visualization beyond the Ctrl+T text view
- No export to external tools (GitHub Issues, Linear, etc.)
- Limited filtering and search — works for dozens of tasks, not hundreds
- No notifications when tasks complete or get blocked
- No built-in prioritization algorithm — relies on manual or AI-driven ordering
- Task IDs are session-generated, not stable across restarts
- No audit trail of who changed what and when

### Community Sentiment
Underappreciated feature that most Claude Code users don't know about. Those who discover it (usually through Agent Teams) praise the context compaction resilience: "My 6-hour session compacted 3 times and still knew exactly what was left to do." The cross-session sharing via `CLAUDE_CODE_TASK_LIST_ID` is considered a hidden gem by power users running multiple sessions.

Main complaint is the lack of persistence — tasks disappear when all sessions close. Users working on multi-day features wish tasks would persist to disk or integrate with external tracking tools.

### Compared To
- **Beads** (`catalogue/tasks/`): Beads is a git-native task tracker that persists to the repository and works across sessions, days, and projects. The native task system is session-scoped. Beads is better for cross-project, persistent task tracking; the native system is better for within-session coordination.
- **GitHub Issues**: Full persistence, comments, labels, milestones — but requires API calls and is external to Claude Code. The native task system is instant and integrated.
- **TodoWrite tool**: The TodoWrite tool IS the interface to the native task system. They're the same feature viewed from different angles — TodoWrite is the write API, Ctrl+T is the read UI.

## Our Usage

Used for within-session task coordination, especially with Agent Teams. Not used as our primary task tracker (that role is filled by Beads for cross-project persistence).

**Configuration:**
```bash
# Per-project task sharing
export CLAUDE_CODE_TASK_LIST_ID=frequency-first
```

**When we use it:**
- During Agent Teams sessions for DAG-based task coordination
- For long single-agent sessions that might compact multiple times
- When a single session needs to track 5+ related tasks

**When we DON'T use it (use Beads instead):**
- Cross-session task tracking (tasks that span days)
- Cross-project task visibility (what's pending across all projects)
- Tasks that need persistence, audit trails, or external visibility

The native task system is a tactical tool for session management. Beads is the strategic tool for project management.

## Sources

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Claude Code Task Sharing](https://docs.anthropic.com/en/docs/claude-code/tasks)

---
*Last reviewed: 2026-02-07*
