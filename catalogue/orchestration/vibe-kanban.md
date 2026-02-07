# Vibe Kanban

| Field | Value |
|-------|-------|
| GitHub | [BloopAI/vibe-kanban](https://github.com/BloopAI/vibe-kanban) |
| Stars | 20,700 |
| Last Commit | Feb 2026 |
| Install | See README (TypeScript 51% + Rust 47%) |
| Status | Watching |
| Category | orchestration |
| Holy Grail Phase | 2-Task + 3-Run |

## What It Does

Kanban board orchestration platform for AI coding agents. Manages Claude Code, Codex, Gemini CLI, and Amp in parallel from a single visual dashboard. Built on the philosophy that "human engineers now spend the majority of their time planning, reviewing, and orchestrating tasks" rather than writing code directly. Provides a unified interface for spinning up agent sessions, assigning tasks, monitoring progress, and reviewing output across multiple AI coding tools simultaneously.

## How It Works

Vibe Kanban runs as a local web application (TypeScript frontend, Rust backend for performance). You create cards on a kanban board, each representing a task or feature. Cards can be assigned to specific AI agents (Claude Code, Codex, Gemini CLI, Amp) or left for automatic assignment. When a card moves to "In Progress," Vibe Kanban spawns the appropriate agent session, feeds it the task context from the card description and linked files, and monitors execution. The board updates in real-time as agents work — showing output, errors, and completion status. Cards move through columns (Backlog, In Progress, Review, Done) with human checkpoints at configurable stages. The Rust backend handles process management and file system operations for performance.

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 3 | 0.90 |
| Simplicity | 20% | 3 | 0.60 |
| Community trust | 15% | 4 | 0.60 |
| Ecosystem fit | 15% | 2 | 0.30 |
| Cost efficiency | 10% | 3 | 0.30 |
| Maturity | 10% | 2 | 0.20 |
| **Composite** | | | **2.90** |

### Strengths
- Multi-agent support — not locked into Claude Code alone, can orchestrate Codex, Gemini CLI, and Amp alongside
- Visual kanban dashboard provides the oversight layer missing from terminal-only tools
- High star count (20,700) indicates strong community interest and validation
- TypeScript + Rust architecture balances developer ergonomics with performance
- Open source with no additional fees or API key requirements beyond the underlying agents
- Aligns with the shift toward "engineer as orchestrator" workflow

### Weaknesses
- Multi-tool approach means less deep integration with any single agent — Claude Code-specific features may be underutilized
- Relatively new project with unclear long-term maintenance commitment from BloopAI
- Unclear how it handles Ralph-style autonomous loops with auto-restart on usage limits
- TypeScript + Rust build requirements add complexity to installation
- Web UI means another local server process to manage
- No built-in task decomposition — you still need to break work into cards manually

### Community Sentiment

Positive on Reddit and developer forums. Seen as a serious orchestration layer that fills the visual management gap in multi-agent workflows. Developers appreciate the multi-agent support, with several reporting they use it to run Claude Code and Codex side by side on different parts of the same project. Some skepticism about whether a visual layer adds enough value over terminal-based approaches like Claude Squad.

### Compared To

- **Auto-Claude (11,500 stars)** — Similar visual approach but Claude-only. Vibe Kanban's multi-agent support is a differentiator, but Auto-Claude may have deeper Claude Code integration.
- **Claude Squad** — Terminal-only, no visual dashboard. Lighter weight and simpler, but lacks the visual oversight that Vibe Kanban provides.
- **Our composable stack (Oh-My-ClaudeCode + Beads + tmux)** — More flexible and modular, but no unified visual layer. Vibe Kanban trades flexibility for visual coherence.
- **Gas Town** — More ambitious (20-30 agents, 7 roles) but also more expensive and complex. Vibe Kanban is a middle ground between simple and extreme orchestration.

## Our Usage

Watching. Vibe Kanban is interesting because it solves the "no visual dashboard" gap in our current terminal-only stack (Oh-My-ClaudeCode + tmux + Beads). The visual kanban board would make it easier to track what multiple Ralph loops are doing across projects. Worth evaluating once we have multiple parallel loops running and the terminal-only approach starts feeling insufficient. The multi-agent support is a bonus but not critical since we are primarily Claude Code-focused.

## Sources

- [GitHub: BloopAI/vibe-kanban](https://github.com/BloopAI/vibe-kanban)
- [Reddit: r/ClaudeAI discussions on orchestration tools](https://reddit.com/r/ClaudeAI)

---
*Last reviewed: 2026-02-07*
