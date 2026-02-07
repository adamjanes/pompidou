# claude-code-scheduler

| Field | Value |
|-------|-------|
| GitHub | [jshchnz/claude-code-scheduler](https://github.com/jshchnz/claude-code-scheduler) |
| Stars | 220 |
| Last Commit | 2025-12 (approx) |
| Install | `npm install -g claude-code-scheduler` |
| Status | Evaluated |
| Category | scheduling |
| Holy Grail Phase | N/A |

## What It Does

claude-code-scheduler is a CLI tool and JSON-config-based scheduler for running Claude Code sessions on a defined schedule. It provides a cross-platform alternative to OS-specific scheduling (launchd, cron, Task Scheduler) with a configuration file that defines what to run, when, and where. Aimed at developers who want repeatable, version-controlled scheduling without platform-specific tooling.

## How It Works

**Installation:**
```bash
npm install -g claude-code-scheduler
```

**Configuration** (`claude-scheduler.json`):
```json
{
  "schedules": [
    {
      "name": "frequency-first-nightly",
      "cron": "0 0 * * *",
      "directory": "/path/to/frequency-first",
      "prompt": "Work on the next task from the spec",
      "flags": ["--dangerously-skip-permissions"],
      "timeout": "4h",
      "enabled": true
    },
    {
      "name": "linkedin-morning",
      "cron": "0 6 * * 1-5",
      "directory": "/path/to/linkedin/app",
      "prompt": "Generate this week's LinkedIn posts",
      "timeout": "2h",
      "enabled": true
    }
  ],
  "defaults": {
    "timeout": "2h",
    "flags": []
  }
}
```

**Usage:**
```bash
# Start the scheduler daemon
claude-code-scheduler start

# List configured schedules
claude-code-scheduler list

# Manually trigger a schedule
claude-code-scheduler run frequency-first-nightly

# Check status
claude-code-scheduler status

# Stop the scheduler
claude-code-scheduler stop
```

**Key concepts:**
- **Cron syntax**: Uses standard cron expressions for scheduling. Familiar to anyone who's used cron.
- **JSON config**: All schedules defined in a single JSON file. Version-controllable, portable.
- **Daemon mode**: Runs as a background process that triggers sessions at scheduled times.
- **Cross-platform**: Works on macOS, Linux, and Windows (Node.js runtime).
- **Manual trigger**: Can trigger any defined schedule on-demand for testing.
- **Timeout**: Maximum runtime per session to prevent runaway costs.

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 3 | 0.90 |
| Simplicity | 20% | 3 | 0.60 |
| Community trust | 15% | 2 | 0.30 |
| Ecosystem fit | 15% | 2 | 0.30 |
| Cost efficiency | 10% | 3 | 0.30 |
| Maturity | 10% | 2 | 0.20 |
| **Composite** | | | **2.60** |

### Strengths
- Cross-platform — works anywhere Node.js runs (macOS, Linux, Windows)
- JSON config is version-controllable and easily shared across machines
- Familiar cron syntax — no new scheduling language to learn
- CLI-first — easy to script and automate
- Timeout support prevents unbounded cost
- Manual trigger mode useful for testing schedules
- Open source and simple enough to fork/modify

### Weaknesses
- Small community (220 stars) — maintenance risk
- Requires Node.js runtime
- No GUI — all configuration is JSON editing and CLI commands
- No integration with claude-auto-resume — sessions stop at usage limits
- No built-in notification system when sessions complete or fail
- No run history or logging beyond what the system provides
- Daemon must be running for schedules to trigger (no launchd-level reliability)
- No session management (tmux, worktree, etc.) — only launches the process

### Community Sentiment
Niche tool with a small but appreciative user base. Most users are on Linux servers where runCLAUDErun (macOS-only) isn't an option. Common feedback: "Good for CI/CD-style scheduling of Claude Code." Some users report issues with the daemon crashing silently, losing scheduled runs. The JSON config approach is praised by DevOps-minded users.

### Compared To
- **runCLAUDErun** (`catalogue/scheduling/runclaunderun.md`): runCLAUDErun is macOS-native with a GUI, launchd-backed reliability, and macOS notifications. More user-friendly but macOS-only. We chose runCLAUDErun for Adam's setup because we're on macOS and the GUI is more approachable.
- **launchd (manual)**: Raw launchd is more reliable (OS-level) but harder to configure. claude-code-scheduler is easier to set up but less reliable (user-space daemon).
- **cron**: Standard cron is simpler and more reliable than a Node.js daemon. claude-code-scheduler adds Claude-specific features (prompt, timeout, flags) but at the cost of an additional dependency.
- **claude-auto-resume** (`catalogue/scheduling/claude-auto-resume.md`): Different scope — claude-auto-resume handles within-session limit recovery, while claude-code-scheduler handles cross-session scheduling. They're complementary, not competing.

## Our Usage

**Evaluated but not chosen.** runCLAUDErun provides a better experience for our macOS-based setup:
- Native macOS GUI vs. JSON config editing
- launchd-backed reliability vs. Node.js daemon
- macOS notifications vs. no built-in alerts
- No Node.js dependency required

If we ever move to a Linux-based server for Ralph, claude-code-scheduler would be worth reconsidering as runCLAUDErun won't be available. For now, it's filed as "good alternative for non-macOS environments."

## Sources

- [GitHub: jshchnz/claude-code-scheduler](https://github.com/jshchnz/claude-code-scheduler)
- [npm package](https://www.npmjs.com/package/claude-code-scheduler)

---
*Last reviewed: 2026-02-07*
