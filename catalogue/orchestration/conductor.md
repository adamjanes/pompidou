# Conductor

| Field | Value |
|-------|-------|
| GitHub | Closed source (Melty Labs) |
| Stars | N/A |
| Last Commit | Feb 2026 |
| Install | macOS native app from [conductor.build](https://www.conductor.build/) |
| Status | Watching |
| Category | orchestration |
| Holy Grail Phase | 3-Run |

## What It Does

macOS-native desktop app that orchestrates multiple Claude Code instances across git worktrees. Handles worktree creation, cleanup, and lifecycle automatically. Integrates with Linear and GitHub Issues for task management. Recommended in "The best way to do agentic development in 2026" (dev.to) as the primary orchestration layer for parallel agent workflows.

## How It Works

Download the macOS app, point it at a repository, and it manages parallel Claude Code sessions — each in its own git worktree. The app handles worktree creation when you start a task, cleanup when you're done, and conflict resolution between parallel agents. Linear integration pulls tasks directly into the orchestration UI. GitHub Issues integration enables task-to-worktree mapping.

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 3 | 0.90 |
| Simplicity | 20% | 4 | 0.80 |
| Community trust | 15% | 2 | 0.30 |
| Ecosystem fit | 15% | 2 | 0.30 |
| Cost efficiency | 10% | 3 | 0.30 |
| Maturity | 10% | 3 | 0.30 |
| **Composite** | | | **2.90** |

### Strengths
- Native macOS UX — polished, purpose-built desktop experience
- Automatic worktree lifecycle management (create, work, cleanup)
- Linear + GitHub Issues integration for task management
- Recommended by multiple independent developers
- Purpose-built for the parallel agent workflow pattern

### Weaknesses
- **Closed source** — vendor lock-in risk, no ability to audit, customize, or contribute
- macOS only — no Linux, no Windows
- No CLI mode — cannot run headless on Mac Mini
- Depends on Melty Labs' continued development and business viability
- No community contributions possible

### Community Sentiment

Positive from macOS developers who use it daily. The polish and UX are praised. Skeptics note the closed-source model in an ecosystem where most tools are open source. Featured in dev.to "Best way to do agentic development in 2026."

### Compared To

- **Claude Squad** — Open source, terminal-based, works on any OS including headless. Less polished but no vendor risk.
- **Crystal** — Also a desktop app but open source. Less mature than Conductor.
- **ccmanager** — CLI-only, multi-agent support (8 tools). No GUI but no lock-in.
- **Vibe Kanban** — Visual dashboard but multi-tool (not just Claude Code).

## Our Usage

Watching but unlikely to adopt. Closed source is a red flag for a tool this central to our workflow. Won't work headless on Mac Mini, which is our primary execution target. Claude Squad remains the better choice — open source, terminal-native, works everywhere. Conductor is interesting for Adam's local Mac for quick parallel work, but not strategic.

## Sources

- [conductor.build](https://www.conductor.build/)
- [DEV.to: The best way to do agentic development in 2026](https://dev.to/chand1012/the-best-way-to-do-agentic-development-in-2026-14mn)

---
*Last reviewed: 2026-02-07*
