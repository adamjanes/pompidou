# tmux Sessions (Pattern)

| Field | Value |
|-------|-------|
| GitHub | N/A (standard Unix tool) |
| Stars | N/A |
| Last Commit | N/A |
| Install | `brew install tmux` (pre-installed on most systems) |
| Status | ★ CHOSEN |
| Category | process |
| Holy Grail Phase | 5-Repeat |

## What It Does

This is not a tool — it's a pattern for using tmux (terminal multiplexer) to manage per-project Claude Code sessions. Each project gets its own named tmux session running Claude Code (or `claude-auto-resume`), enabling parallel autonomous execution across multiple projects from a single terminal. tmux sessions persist when you detach, survive SSH disconnections, and can be scripted for automated startup.

## How It Works

**Core pattern:**
```bash
# Create a detached session for each project
tmux new-session -s ff -d "cd /path/to/fractional-first/talentflow && claude-auto-resume -p 'work on open tasks'"
tmux new-session -s linkedin -d "cd /path/to/linkedin/app && claude-auto-resume -p 'continue development'"
tmux new-session -s freq -d "cd /path/to/frequency-first && claude-auto-resume -p 'implement features from spec'"
```

**Session management:**
```bash
# List all sessions
tmux ls

# Attach to a specific session
tmux attach -t ff

# Detach (from inside session)
Ctrl+B, then D

# Kill a session
tmux kill-session -t ff

# Kill all sessions
tmux kill-server
```

**Startup script pattern:**
```bash
#!/bin/bash
# ralph-start.sh — Launch all project loops

# Kill existing sessions
tmux kill-server 2>/dev/null

# Start per-project sessions
tmux new-session -s ff-talentflow -d \
  "cd /Users/adamjanes/code/clients/fractional-first/talentflow && claude-auto-resume -p 'work on priority tasks'"

tmux new-session -s linkedin -d \
  "cd /Users/adamjanes/code/projects/linkedin/app && claude-auto-resume -p 'continue from where you left off'"

tmux new-session -s frequency -d \
  "cd /Users/adamjanes/code/projects/frequency-first && claude-auto-resume -p 'implement next feature'"

echo "Sessions started:"
tmux ls
```

**Monitoring pattern:**
```bash
# Quick status check across all sessions
for s in $(tmux ls -F '#{session_name}'); do
  echo "=== $s ==="
  tmux capture-pane -t "$s" -p | tail -5
done
```

**Key concepts:**
- **Named sessions**: Each project gets a descriptive session name for easy identification
- **Detached startup**: `-d` flag starts sessions in the background immediately
- **Command injection**: The command after the session name runs inside the session
- **Persistence**: Sessions survive SSH disconnects and terminal closes
- **Scriptable**: Entire multi-project startup can be a single shell script

## Evaluation

### Strengths
- Universal — works on any Unix system, nothing to install
- Battle-tested — tmux has been stable for decades
- Fully scriptable — startup, teardown, and monitoring can all be automated
- Lightweight — negligible resource overhead
- Composable — combines naturally with claude-auto-resume, cron, launchd
- SSH-friendly — attach from any machine, survives disconnects
- No dependencies — no Go runtime, no npm, no Homebrew required

### Weaknesses
- No git worktree isolation — must manage branches manually or combine with other tools
- No visual dashboard — must attach to each session individually or script monitoring
- No auto-accept built-in — relies on Claude Code's `--dangerously-skip-permissions` or similar flags
- Manual session management — no TUI for creating/destroying sessions
- No session templates — must script everything yourself
- Output scrollback is limited by tmux buffer size (configurable but finite)
- No built-in cost tracking or resource monitoring

### Community Sentiment
tmux is universally respected as a foundational tool. In the Claude Code community, the tmux pattern is considered the "reliable fallback" — not as polished as Claude Squad but guaranteed to work everywhere. Many autonomous AI workflows start with tmux before graduating to more specialized tools. Blog posts on "running Claude Code overnight" frequently use tmux as the base layer.

### Compared To
- **Claude Squad** (`catalogue/process/claude-squad.md`): Claude Squad adds automatic worktree isolation, a TUI dashboard, and session persistence on top of what tmux provides. We use Claude Squad as primary and tmux as fallback.
- **Crystal** (`catalogue/orchestration/crystal.md`): Crystal provides a visual desktop app. tmux is the polar opposite — minimal, terminal-only, scriptable. Different audiences entirely.
- **screen**: GNU Screen is the older alternative to tmux. tmux is preferred for its better scripting API, window splitting, and active development.

## Our Usage

Chosen as our fallback process manager and the foundation for Mac Mini (Ralph) execution. Used alongside Claude Squad — when Claude Squad works well, we use it; when we need maximum control or scripting, we fall back to raw tmux.

**Mac Mini setup:**
- Primary: Claude Squad manages sessions with TUI
- Fallback: tmux script for automated startup without Claude Squad
- Combined with `claude-auto-resume` inside each session for usage limit handling
- Combined with launchd or `runCLAUDErun` for nightly scheduling

**tmux config additions** (in `~/.tmux.conf`):
```bash
# Increase scrollback buffer for long Claude sessions
set-option -g history-limit 50000

# Enable mouse for easier session switching
set -g mouse on
```

## Sources

- [tmux GitHub](https://github.com/tmux/tmux)
- [tmux man page](https://man.openbsd.org/tmux)
- [tmux cheat sheet](https://tmuxcheatsheet.com/)

---
*Last reviewed: 2026-02-07*
