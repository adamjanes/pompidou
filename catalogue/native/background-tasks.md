# Background Tasks (Native Claude Code)

| Field | Value |
|-------|-------|
| GitHub | Built-in (Anthropic) |
| Stars | N/A (native feature) |
| Last Commit | N/A (ships with Claude Code) |
| Install | N/A (always available) |
| Status | Evaluated |
| Category | native |
| Holy Grail Phase | Supporting |

## What It Does

Claude Code Background Tasks allow you to send long-running commands (builds, tests, deployments, linting) to the background while continuing to work on other things in the same session. Instead of waiting for a 5-minute test suite to finish before asking your next question, you background the command and keep going. When the background task completes, you're notified and can review the results. This also includes the Bash mode (`!` prefix) for direct command execution without AI interpretation.

## How It Works

**Backgrounding a command:**
While Claude Code is executing a long-running command (e.g., running tests, building a project), press `Ctrl+B` to send it to the background. The command continues running, and you're returned to the Claude Code prompt to continue working.

**Checking background tasks:**
Background tasks show their status in the Claude Code interface. When a task completes (success or failure), you receive a notification within the session. You can then review the output.

**Bash mode (direct execution):**
Prefix any command with `!` to execute it directly in the shell without Claude Code interpreting or wrapping it:
```
! npm run build
! pytest -v tests/
! docker compose up -d
```

This bypasses Claude Code's tool use flow and runs the command as if you typed it in a raw terminal. Useful for commands you know exactly and don't need AI assistance with.

**Typical workflow:**
1. Ask Claude Code to run the test suite
2. While tests are running, press Ctrl+B to background
3. Continue asking Claude Code about other code changes
4. Tests finish — notification appears
5. Review test results and continue

**Key behaviors:**
- Background tasks run in the same shell environment as the foreground
- Multiple commands can be backgrounded simultaneously
- Background task output is captured and available for review
- If a background task fails, you're notified immediately
- Background tasks survive context compaction (the task continues even if the conversation is summarized)

## Evaluation

### Strengths
- Zero friction — Ctrl+B is instant, no configuration needed
- Eliminates waiting — don't waste session time on builds and tests
- Multiple concurrent backgrounds — run tests, build, and lint simultaneously
- Bash mode (`!`) provides escape hatch for direct command execution
- Output capture means results aren't lost when backgrounded
- Failure notification ensures broken builds don't go unnoticed
- Survives context compaction — background tasks are independent of conversation state

### Weaknesses
- Background tasks share the same working directory — potential for conflicts if a background build and a foreground edit touch the same files
- No persistent queue — if the Claude Code session ends, background tasks may be terminated
- No scheduling — can't say "run this in 10 minutes"
- No priority system — background tasks compete for resources equally
- Limited to the current session — can't background a task and check it from another session
- No cost attribution — background task token usage isn't separately tracked
- Bash mode (`!`) bypasses all Claude Code safety checks — use with caution

### Community Sentiment
Widely appreciated as a quality-of-life feature. Users frequently cite it as one of the reasons Claude Code feels more productive than other AI coding tools: "I can keep working while tests run — it's like having a second terminal built in." The Bash mode is popular among power users who want quick command execution without AI overhead.

Main criticism is that it's not well-documented — many users discover Ctrl+B accidentally or from community tips rather than official docs. Some users wish for a more robust background task manager with queuing and history.

### Compared To
- **tmux split panes**: Running a second terminal pane achieves similar parallelism. Background tasks are integrated into the Claude Code session, so the AI can automatically react to results. A tmux pane requires manual copy-paste of results back to Claude.
- **Agent Teams** (`catalogue/native/agent-teams.md`): Agent Teams provide true parallel agent execution. Background tasks are simpler — just running shell commands in the background. Different scope: Agent Teams for parallel AI work, background tasks for parallel shell commands.
- **CI/CD pipelines**: For automated testing, CI/CD is more robust (persistent, reproducible, logged). Background tasks are for local dev iteration speed, not production automation.

## Our Usage

Used opportunistically during interactive Claude Code sessions. Not a core part of the autonomous pipeline (Ralph loops run in their own sessions where everything is "foreground"), but valuable for Adam's interactive development workflow.

**Common patterns:**
```
# Background a test suite while continuing to code
> Run the test suite
[tests start running]
[Ctrl+B to background]
> Now let's work on the authentication module...

# Direct command execution
! git status
! npm run lint
! docker ps
```

**When to use:**
- Running test suites (often 2-5 minutes)
- Building projects (webpack, Next.js builds)
- Docker operations (compose up, image builds)
- Any command that takes more than 30 seconds

**When NOT to use:**
- Commands whose output you need immediately (git diff, file reads)
- Commands that require interactive input
- Destructive commands you want to monitor closely

**Bash mode use cases:**
- Quick git operations (`! git status`, `! git log --oneline -5`)
- Checking running processes (`! ps aux | grep node`)
- Environment checks (`! echo $PATH`, `! which python`)
- File system operations (`! ls -la`, `! du -sh .`)

## Sources

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Claude Code Keyboard Shortcuts](https://docs.anthropic.com/en/docs/claude-code/shortcuts)

---
*Last reviewed: 2026-02-07*
