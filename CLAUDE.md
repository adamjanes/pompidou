# Pompidou — Command Centre

Named after the Pompidou Centre in Paris. This project is the **intelligence layer** for Adam's autonomous development system — researching, evaluating, and recommending the tools that power all other projects.

> "Pompidou" is also a meta-command in the root CLAUDE.md meaning "stop working on the current task and modify the system itself."

## Purpose

Build and maintain a system where AI agents work on Adam's projects autonomously. Adam is the product owner and architect. AI agents are the dev team. He sets direction, they execute. He reviews, unblocks, and steers — the system handles the grunt work around the clock.

## The Holy Grail (5 phases + platform)

**Development phases:**
1. **Spec It** — OpenSpec defines what to build, surfaces blockers upfront
2. **Task It** — Beads breaks specs into dependency-aware tasks; /pour bridges specs to beads
3. **Build It** — OMC Autopilot executes (32 agents, model routing, TDD, code review)
4. **Verify It** — Full CI validation (test suite + lint + types + build) before merge; Adam eyeballs deployed version (V1)
5. **Learn It** — /harvest captures session learnings into knowledge/updates/

**Infrastructure platform** (keeps the cycle running):
- Scheduling: runCLAUDErun | Process: Claude Squad | Resilience: claude-auto-resume
- Notifications: OpenClaw [Docker] → Telegram | Safety: worktree isolation + command guard

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
│   ├── how-it-works.md          # ★ START HERE — full system narrative
│   ├── omc-usage-guide.md       # Phase 3: How to use OMC (3 commands only)
│   ├── current.md               # Quick-reference tables (tool → phase)
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
| **Understand the system** | `stack/how-it-works.md` ★ Start here |
| **Use OMC (Phase 3)** | `stack/omc-usage-guide.md` — 3 commands, gotchas, launch instructions |
| **Find a tool** | `catalogue/_index.md` |
| **Current stack (tables)** | `stack/current.md` |
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

| Component | Status | Details |
|-----------|--------|---------|
| Foundation | ✅ Complete | Bootstrap script, shared agents, CLAUDE.md cascade |
| Phase 1: Spec It | CLI installed | OpenSpec global. Not initialized on any project. |
| Phase 2: Task It | Not installed | Beads chosen. /pour to build. |
| Phase 3: Build It | Not installed | OMC chosen. Superpowers deferred (test OMC first). |
| Phase 4: Verify It | Not built | Per-project verify scripts needed. |
| Phase 5: Learn It | Not built | /harvest slash command to build. |
| Platform: Process | Not installed | Claude Squad chosen. |
| Platform: Resilience | Not installed | claude-auto-resume chosen. |
| Platform: Scheduling | Not installed | runCLAUDErun chosen. |
| Platform: Notifications | Broken | OpenClaw needs Docker reinstall. |
| Platform: Safety | Not installed | Destructive Command Guard + worktree isolation. |

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
