# Claude Squad

| Field | Value |
|-------|-------|
| GitHub | [smtg-ai/claude-squad](https://github.com/smtg-ai/claude-squad) |
| Stars | ~5,000 |
| Last Commit | 2026-01 (approx) |
| Install | `brew install claude-squad` |
| Status | ★ CHOSEN |
| Category | process |
| Holy Grail Phase | 5-Repeat |

## What It Does

Claude Squad is a terminal UI (TUI) application for managing multiple Claude Code sessions in parallel. It provides a single pane of glass to monitor, control, and switch between several autonomous Claude Code instances, each running in its own git worktree. Designed for developers running multiple AI coding sessions simultaneously, it handles the tedious parts — worktree creation, session lifecycle, output monitoring — through a clean terminal interface.

## How It Works

**Installation:**
```bash
brew install claude-squad
# or
go install github.com/smtg-ai/claude-squad@latest
```

**Key concepts:**
- **Sessions**: Each session is a named Claude Code instance with its own prompt, working directory, and git worktree. Sessions persist across Claude Squad restarts.
- **Git worktree isolation**: Each session automatically gets its own worktree branched from the current HEAD. Changes in one session don't affect others.
- **Auto-accept mode**: Sessions can run in fully autonomous mode, automatically accepting all Claude Code tool use prompts. Essential for background execution.
- **TUI dashboard**: Shows all active sessions with their current status, recent output, and resource usage. Navigate with keyboard shortcuts.

**Usage:**
```bash
# Start Claude Squad
claude-squad

# Create a new session
# (within TUI) press 'n', enter name and prompt

# Auto-accept mode for background execution
# (within TUI) toggle with 'a' on selected session
```

**Workflow:**
1. Launch Claude Squad
2. Create sessions for different tasks/projects
3. Each session runs in its own worktree
4. Monitor all sessions from the TUI dashboard
5. Switch into any session to interact directly
6. When a session completes, review changes and merge the worktree branch

**Key shortcuts:**
- `n` — New session
- `a` — Toggle auto-accept
- `Enter` — Attach to session
- `d` — Detach from session
- `q` — Quit (sessions continue in background)

## Evaluation

### Strengths
- Clean TUI interface — works in any terminal, including SSH sessions and tmux
- Git worktree management is automatic and reliable
- Auto-accept mode enables fully autonomous execution
- Sessions persist across Claude Squad restarts
- Homebrew installation makes setup trivial on macOS
- Lightweight — just a Go binary, no runtime dependencies
- Can run on headless servers (Mac Mini / Ralph)

### Weaknesses
- No built-in scheduling — sessions must be manually created or scripted
- No inter-session communication — sessions are independent
- No task DAG — sessions don't know about each other's work
- Limited to Claude Code (no cross-provider support)
- No built-in cost tracking per session
- Worktree merge conflicts must be resolved manually
- No session templates (must re-enter prompts each time)

### Community Sentiment
Well-received in the Claude Code community. Users praise its simplicity and reliability compared to more complex orchestration tools. Common sentiment: "It does one thing well — managing parallel sessions." Developers using it for multi-feature development report it significantly improves throughput. Some wish for more integration with task tracking tools.

Frequently compared to Crystal, with the consensus being Claude Squad is better for automation (TUI/headless) while Crystal is better for visual exploration.

### Compared To
- **Crystal** (`catalogue/orchestration/crystal.md`): Crystal is a desktop app with visual diff comparison. Claude Squad is a TUI that works in headless environments. We chose Claude Squad because it runs on Mac Mini without a GUI.
- **tmux sessions** (`catalogue/process/tmux-sessions.md`): Raw tmux is more flexible but requires manual worktree management and session monitoring. Claude Squad automates the boring parts. We use both — Claude Squad as primary, tmux as fallback.
- **Native Agent Teams** (`catalogue/orchestration/native-agent-teams.md`): Agent Teams provides in-session multi-agent coordination. Claude Squad manages multiple independent sessions. They serve different purposes and can be used together.

## Our Usage

Chosen as our primary process manager for multi-project Ralph loops. Each active project gets its own Claude Squad session running in auto-accept mode on Mac Mini.

**Planned setup:**
```bash
# On Mac Mini (Ralph)
claude-squad
# Create sessions:
#   ff-talentflow  → /path/to/fractional-first/talentflow
#   ff-profiles    → /path/to/fractional-first/public-profiles
#   linkedin       → /path/to/linkedin/app
#   frequency      → /path/to/frequency-first
```

Combined with `claude-auto-resume` for usage limit handling and `runCLAUDErun` for nightly scheduling. Claude Squad manages the runtime, the other tools handle restart and scheduling respectively.

## Sources

- [GitHub: smtg-ai/claude-squad](https://github.com/smtg-ai/claude-squad)
- [Homebrew formula](https://formulae.brew.sh/formula/claude-squad)

---
*Last reviewed: 2026-02-07*
