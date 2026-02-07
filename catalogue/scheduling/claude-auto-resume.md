# claude-auto-resume

| Field | Value |
|-------|-------|
| GitHub | [terryso/claude-auto-resume](https://github.com/terryso/claude-auto-resume) |
| Stars | ~1,200 |
| Last Commit | 2026-01 (approx) |
| Install | `curl -fsSL https://raw.githubusercontent.com/terryso/claude-auto-resume/main/install.sh \| bash` |
| Status | ★ CHOSEN |
| Category | scheduling |
| Holy Grail Phase | 5-Repeat |

## What It Does

claude-auto-resume is a wrapper around Claude Code that detects usage limit messages, parses the reset timestamp, displays a countdown timer, and automatically resumes the session when the limit resets. It solves the single biggest obstacle to autonomous Claude Code execution: the tool stops working when you hit API rate limits, and without this wrapper, no one is there to restart it. Purpose-built for overnight and unattended autonomous workflows.

## How It Works

**Installation:**
```bash
curl -fsSL https://raw.githubusercontent.com/terryso/claude-auto-resume/main/install.sh | bash
```

**Usage:**
```bash
# Start a new session with a prompt
claude-auto-resume -p "implement the user authentication feature"

# Continue a previous session
claude-auto-resume -c -p "continue where you left off"

# With additional Claude Code flags
claude-auto-resume -p "work on tasks" -- --dangerously-skip-permissions
```

**How it detects limits:**
1. Wraps the Claude Code process, monitoring its stdout/stderr
2. Pattern-matches on usage limit messages (e.g., "You've reached your usage limit")
3. Parses the reset timestamp from the message (e.g., "resets at 3:00 AM")
4. Displays a countdown timer in the terminal showing time until reset
5. When the countdown reaches zero, automatically restarts Claude Code with the same prompt

**Key behaviors:**
- **Transparent wrapping**: All Claude Code output is passed through normally. You interact with Claude Code exactly as usual.
- **Limit detection**: Recognizes multiple formats of usage limit messages across Claude Code versions.
- **Smart resume**: Passes the original prompt (or a "continue" prompt) when restarting, so Claude Code picks up where it left off.
- **Countdown display**: Shows a clear timer so you know when the session will resume (useful when checking in on Ralph).
- **Session continuity**: Uses `-c` flag to resume previous conversation context when possible.

## Evaluation

### Strengths
- Solves the exact problem it targets — usage limit interruption — cleanly and reliably
- Zero configuration required — install and use immediately
- Transparent — doesn't modify Claude Code's behavior, just wraps the process lifecycle
- Lightweight — shell script wrapper, no runtime dependencies
- Composable — works inside tmux, Claude Squad, or any other process manager
- Countdown timer provides visibility into when work will resume

### Weaknesses
- Dependent on parsing Claude Code's output format — could break if Anthropic changes message formatting
- No built-in session logging — relies on the terminal (tmux scrollback) for history
- Cannot distinguish between "limit hit, will reset" and "limit hit, plan upgrade" scenarios
- No cost tracking — doesn't monitor how many tokens were used before the limit
- Single-session only — manages one Claude Code instance at a time (use Claude Squad for multiple)
- No notification when limits are hit — silently waits (combine with OpenClaw for alerts)

### Community Sentiment
Highly praised in the autonomous Claude Code community. Seen as an essential building block — almost every "run Claude overnight" tutorial mentions it. Users report it "just works" for the most part, with occasional issues when Claude Code's output format changes between versions. The simplicity is frequently cited as a strength: "It does one thing and does it well."

Some users report edge cases where the limit message format isn't recognized, leading to the session hanging instead of restarting. These are typically fixed quickly by the maintainer.

### Compared To
- **Manual restart**: The obvious alternative — set an alarm, wake up, restart Claude Code. Doesn't scale and defeats the purpose of autonomous execution.
- **Custom wrapper scripts**: Many developers write their own retry logic. claude-auto-resume is more robust because it specifically parses reset timestamps rather than using fixed delays.
- **Oh-My-ClaudeCode** (`catalogue/execution/oh-my-claudecode.md`): OMCC includes auto-resume as one of many features. claude-auto-resume is more focused and easier to compose with other tools.

## Our Usage

Chosen as our usage limit handler. Used inside every Claude Code session that runs autonomously, whether in tmux or Claude Squad.

**Pattern:**
```bash
# Inside a tmux session or Claude Squad session
claude-auto-resume -p "work on the highest priority task from the spec"
```

**Integration with other tools:**
- **Claude Squad**: Each Claude Squad session runs `claude-auto-resume` instead of bare `claude`
- **tmux**: Each tmux session command uses `claude-auto-resume`
- **runCLAUDErun**: Scheduled sessions launch with `claude-auto-resume`
- **OpenClaw**: When claude-auto-resume hits a limit, OpenClaw detects the pause and notifies Adam via Telegram

This is a foundational building block in the autonomous execution stack. Without it, every other tool is limited to single-session-length runs.

## Sources

- [GitHub: terryso/claude-auto-resume](https://github.com/terryso/claude-auto-resume)
- [Install script](https://raw.githubusercontent.com/terryso/claude-auto-resume/main/install.sh)

---
*Last reviewed: 2026-02-07*
