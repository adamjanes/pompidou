# Pompidou — Command Centre

Named after the Pompidou Centre in Paris. This project is the **intelligence layer** for Adam's autonomous development system — researching, evaluating, and recommending the tools that power all other projects.

> "Pompidou" is also a meta-command in the root CLAUDE.md meaning "stop working on the current task and modify the system itself."

## Purpose

Build and maintain a system where AI agents work on Adam's projects autonomously. Adam is the product owner and architect. AI agents are the dev team. He sets direction, they execute. He reviews, unblocks, and steers — the system handles the grunt work around the clock.

## The Holy Grail (5 bullets)

1. **Spec it** — OpenSpec (brownfield) or BMAD (greenfield) defines what to build, surfaces blockers upfront
2. **Task it** — Beads (git-native) breaks specs into dependency-aware tasks across all projects
3. **Run it** — Per-project Ralph loops (Oh-My-ClaudeCode + claude-auto-resume) execute autonomously, pause on limits, auto-resume
4. **Flag it** — Ralph loops push blockers to a shared file; OpenClaw (isolated in Docker, Telegram-only) pings Adam when something's stuck
5. **Repeat it** — runCLAUDErun schedules nightly kickoffs; Adam reviews results each morning, unblocks via Telegram, the system keeps going

## Directory Structure

```
pompidou/
├── CLAUDE.md                    # This file — navigation and context
├── knowledge/                   # Briefings, calls, updates
│   ├── briefing.md
│   ├── context.md
│   └── updates/
│
├── catalogue/                   # 80 tool evaluations across 13 categories
│   ├── _template.md             # Standard evaluation format
│   ├── _index.md                # Master index (all tools, grouped)
│   ├── spec/                    # Phase 1 tools (8 entries)
│   ├── tasks/                   # Phase 2 tools (6 entries)
│   ├── execution/               # Phase 3 tools (30 entries)
│   ├── orchestration/           # Multi-agent coordination (8 entries)
│   ├── process/                 # Session management (4 entries)
│   ├── scheduling/              # Auto-restart & scheduling (5 entries)
│   ├── notification/            # Blocker notification (6 entries)
│   ├── native/                  # Claude Code built-ins (4 entries)
│   ├── context/                 # Documentation & search (3 entries)
│   ├── memory/                  # Persistent memory (2 entries)
│   ├── monitoring/              # Cost & usage tracking (2 entries)
│   ├── worktree/                # Git worktree management (1 entry)
│   └── security/                # Security tools (1 entry)
│
├── stack/                       # The output — recommended tech stack
│   ├── current.md               # Holy Grail phase → tool mapping
│   ├── decisions.md             # Decision log with dates & rationale
│   └── roadmap.md               # What to evaluate next
│
├── research/                    # Research pipeline
│   ├── SWEEP.md                 # Prompt for automated research sweeps
│   ├── sources.md               # Awesome lists, blogs, communities
│   └── methodology.md           # Evaluation criteria & scoring
│
└── plans/
    └── dev-system-restructuring.md  # Phases 1-6 execution plan
```

## Quick Navigation

| What | Where |
|------|-------|
| **Find a tool** | `catalogue/_index.md` |
| **Current stack** | `stack/current.md` |
| **Why we chose X** | `stack/decisions.md` |
| **What to evaluate next** | `stack/roadmap.md` |
| **Run a research sweep** | Feed `research/SWEEP.md` to a Claude session |
| **Add a new tool** | Copy `catalogue/_template.md` to appropriate category |
| **Evaluation criteria** | `research/methodology.md` |

## Key References

- **Root CLAUDE.md:** `../../CLAUDE.md` — folder structure, orchestrator pattern, project navigation
- **Original research doc:** `../../shared/skills/ai-dev-tooling-research.md` — monolithic predecessor (now decomposed into catalogue)
- **Shared agents:** `~/.claude/agents/` (globally accessible)
- **OpenClaw config:** `/Users/adamjanes/code/ralph/`
- **Bootstrap script:** `../../shared/scripts/bootstrap-claude.sh`

## Implementation Status

| Phase | Status | Key Tool |
|-------|--------|----------|
| Phase 1: Foundation | ✅ Complete | Bootstrap script, shared agents |
| Phase 2: Spec-Driven Dev | ✅ Complete | OpenSpec on frequency-first |
| Phase 3: Task Tracking | Pending | Beads |
| Phase 4: Autonomous Execution | Pending | Oh-My-ClaudeCode |
| Phase 5: Blocker Notification | Pending | OpenClaw (Docker) |
| Phase 6: Scheduling | Pending | runCLAUDErun |

## Configuration Propagation

| Config | Inherits? |
|--------|-----------|
| CLAUDE.md | YES — walks up and merges |
| .claude/settings.local.json | NO — CWD only |
| .claude/hooks/ | NO — CWD only |
| .claude/commands/ | NO — CWD only |
| ~/.claude/skills/ | YES — always loaded |
| ~/.claude/agents/ | YES — always loaded |

## Workflow

This is a **project** (greenfield) — direct push OK:
- Can push directly to main
- Move fast, experiment freely
- This project modifies the development system itself
