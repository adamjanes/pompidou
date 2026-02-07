# Crystal

| Field | Value |
|-------|-------|
| GitHub | [stravu/crystal](https://github.com/stravu/crystal) |
| Stars | 2,872 |
| Last Commit | 2026-01 (approx) |
| Install | Download from [crystal.sh](https://crystal.sh) or `brew install --cask crystal` |
| Status | Evaluated |
| Category | orchestration |
| Holy Grail Phase | N/A |

## What It Does

Crystal is a desktop application for managing multiple parallel Claude Code sessions with git worktree isolation. It provides a visual interface for running several Claude Code instances simultaneously on different branches or features, with diff visualization, commit tracking, and session templates. It is designed for developers who want to explore multiple AI-driven approaches to the same problem in parallel, then compare and cherry-pick the best results.

## How It Works

**Key concepts:**
- **Sessions**: Each session is an independent Claude Code instance running in its own git worktree. Sessions can run in parallel without interfering with each other.
- **Worktree isolation**: Crystal automatically creates and manages git worktrees so each session operates on a separate branch. Changes don't conflict.
- **Diff visualization**: Side-by-side comparison of changes made by different sessions. Useful for evaluating which approach is better.
- **Commit tracking**: Visual timeline of commits made by each session, making it easy to see what each agent did and when.
- **Session templates**: Pre-configured prompts and settings that can be reused across sessions. Define a template once, spin up multiple variations.
- **Visual status**: Dashboard showing all active sessions, their progress, token usage, and current state.

**Workflow:**
1. Create a new session from a template or ad-hoc prompt
2. Crystal creates a git worktree and launches Claude Code in it
3. Monitor progress via the visual dashboard
4. Compare diffs across sessions when complete
5. Merge the preferred approach back to main

**Interface**: Native desktop app (Electron-based) with a clean, modern UI. Runs on macOS, Windows, and Linux.

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 2 | 0.60 |
| Simplicity | 20% | 4 | 0.80 |
| Community trust | 15% | 3 | 0.45 |
| Ecosystem fit | 15% | 2 | 0.30 |
| Cost efficiency | 10% | 3 | 0.30 |
| Maturity | 10% | 3 | 0.30 |
| **Composite** | | | **2.75** |

### Strengths
- Excellent visual interface for managing parallel sessions
- Git worktree management is automatic and clean
- Diff comparison across sessions is genuinely useful for evaluating approaches
- Session templates save time on repetitive setups
- Good for "try three approaches, pick the best one" workflows
- Commit timeline gives clear visibility into agent activity

### Weaknesses
- Desktop app — requires GUI, not suitable for headless Mac Mini / Ralph loops
- No DAG-based task coordination (sessions are independent, not collaborating)
- No inter-session communication — sessions can't share findings
- Limited to Claude Code (no cross-provider support)
- Relatively small community (2,872 stars) compared to alternatives
- No API or CLI mode for scripting/automation
- No scheduling — sessions must be manually started

### Community Sentiment
Generally positive among users who try it. Praised for the clean UI and worktree management. Main criticism is that it's a "nice-to-have" visual layer rather than a fundamental capability improvement. Some users note that tmux + git worktrees achieves 80% of the same result. Others appreciate the diff comparison feature as the key differentiator.

Reddit comments note it's best for "exploration mode" — trying multiple approaches — rather than production autonomous execution.

### Compared To
- **Claude Squad** (`catalogue/process/claude-squad.md`): Claude Squad is a TUI (terminal-based) that also manages parallel sessions with worktree isolation. Less visual polish but more suitable for headless/automated environments. Claude Squad chosen over Crystal for our setup.
- **Native Agent Teams** (`catalogue/orchestration/native-agent-teams.md`): Agent Teams provides collaborative multi-agent with task DAGs and messaging. Crystal provides parallel-but-independent sessions. Different use cases — Agent Teams for collaborative work, Crystal for comparing approaches.
- **tmux sessions** (`catalogue/process/tmux-sessions.md`): Raw tmux achieves similar parallelism without the visual layer. Less user-friendly but more flexible and automatable.

## Our Usage

**Evaluated but not chosen.** Crystal's strengths are in visual session management and approach comparison, which are valuable for interactive development. However, our primary need is automated, headless execution on Mac Mini (Ralph loops), where a desktop app is not suitable. Claude Squad provides the multi-session management we need in a terminal-friendly format.

Crystal could be useful for Adam's local development when exploring multiple approaches to a complex problem, but it's not part of the core autonomous pipeline.

## Sources

- [GitHub: stravu/crystal](https://github.com/stravu/crystal)
- [crystal.sh](https://crystal.sh)

---
*Last reviewed: 2026-02-07*
