# runCLAUDErun

| Field | Value |
|-------|-------|
| GitHub | N/A (commercial macOS app) |
| Stars | N/A |
| Last Commit | N/A |
| Install | Download from [runclauderun.com](https://runclauderun.com/) |
| Status | ★ CHOSEN |
| Category | scheduling |
| Holy Grail Phase | 5-Repeat |

## What It Does

runCLAUDErun is a native macOS GUI application for scheduling Claude Code sessions at specific times or intervals. It provides a user-friendly interface for defining when Claude Code should start working, what prompt to use, and which directory to run in. Think of it as a visual cron job manager purpose-built for Claude Code — you set your nightly schedule in a graphical interface rather than editing plist files or crontab entries.

## How It Works

**Installation:**
Download from [runclauderun.com](https://runclauderun.com/) and install the macOS app.

**Key concepts:**
- **Scheduled runs**: Define when Claude Code sessions should start. Supports one-time, daily, weekly, and custom interval schedules.
- **Run configuration**: Each scheduled run specifies a working directory, prompt, and optional Claude Code flags.
- **macOS native scheduling**: Uses launchd under the hood for reliable, system-level scheduling that works even when the app isn't open.
- **Run history**: Tracks past scheduled runs, their output, duration, and success/failure status.
- **Notifications**: macOS native notifications when runs start, complete, or fail.

**Workflow:**
1. Open runCLAUDErun
2. Create a new scheduled run:
   - Set the working directory (e.g., `/Users/adamjanes/code/projects/frequency-first`)
   - Write the prompt (e.g., "Work on the next task from the spec")
   - Choose schedule (e.g., "Every day at midnight")
   - Set optional flags (timeout, auto-accept, etc.)
3. Save and enable the schedule
4. runCLAUDErun handles the rest — launching Claude Code at the specified time

**Configuration example (conceptual):**
```
Name:      frequency-first-nightly
Directory: /Users/adamjanes/code/projects/frequency-first
Prompt:    "Review open tasks, pick the highest priority, and implement it"
Schedule:  Daily at 00:00
Timeout:   4 hours
Flags:     --dangerously-skip-permissions
```

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 5 | 1.50 |
| Simplicity | 20% | 5 | 1.00 |
| Community trust | 15% | 3 | 0.45 |
| Ecosystem fit | 15% | 4 | 0.60 |
| Cost efficiency | 10% | 3 | 0.30 |
| Maturity | 10% | 2 | 0.20 |
| **Composite** | | | **4.05** |

### Strengths
- Native macOS experience — feels like a real app, not a hack
- Visual scheduling is much easier than editing launchd plists manually
- Run history provides accountability and debugging for overnight sessions
- macOS notifications keep you informed without actively monitoring
- launchd-backed scheduling is more reliable than cron on macOS
- No terminal required — Adam can configure schedules from anywhere

### Weaknesses
- macOS only — won't work on Linux servers if we ever move off Mac Mini
- Commercial product — dependency on a third-party developer for updates
- GUI-only — no CLI or API for scripting schedule creation
- No built-in integration with claude-auto-resume or Claude Squad
- Limited to launching Claude Code — doesn't manage the session lifecycle after start
- No cost tracking or budget limits per scheduled run
- Relatively new product — long-term maintenance uncertain

### Community Sentiment
Small but enthusiastic community. Users praise the ease of setup compared to manually configuring launchd. Common feedback: "Finally, scheduling Claude Code without writing shell scripts." Some power users note they outgrew it quickly and moved to custom launchd + shell scripts for more control. The target audience is developers who want scheduling without DevOps complexity.

### Compared To
- **launchd (manual)**: Writing plist files directly is more flexible but error-prone and tedious. runCLAUDErun generates the same launchd configuration through a GUI. For power users who want maximum control, raw launchd is better.
- **cron**: macOS deprecated cron in favor of launchd. cron jobs for Claude Code work but lack the reliability guarantees of launchd (e.g., running missed jobs after sleep/wake).
- **claude-code-scheduler** (`catalogue/scheduling/claude-code-scheduler.md`): CLI-based, cross-platform, JSON config. More scriptable but less user-friendly. We chose runCLAUDErun for its macOS-native experience.

## Our Usage

Chosen as our scheduling layer for nightly Claude Code kickoffs. Configured on Mac Mini (Ralph) to start project loops at midnight.

**Planned schedule:**
- 00:00 — Start frequency-first session
- 00:05 — Start linkedin session
- 00:10 — Start firstcomment session
- 00:15 — Start fractional-first session (PR workflow)

Each scheduled run launches `claude-auto-resume` rather than bare `claude`, so usage limits are handled automatically. The session runs inside a tmux or Claude Squad context for persistence.

**Integration chain:**
runCLAUDErun (scheduling) -> claude-auto-resume (limit handling) -> Claude Code (execution) -> OpenClaw (blocker notification)

## Sources

- [runCLAUDErun website](https://runclauderun.com/)
- [macOS launchd documentation](https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/CreatingLaunchdJobs.html)

---
*Last reviewed: 2026-02-07*
