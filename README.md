# Pompidou — Command Centre

Named after the Pompidou Centre in Paris, this project is the **intelligence layer** for an autonomous AI development system. It researches, evaluates, and recommends the tools that power AI-driven software development workflows.

## What This Is

Pompidou is a research and evaluation project that:
- **Discovers** tools for autonomous AI development (Claude Code ecosystem, MCP servers, workflow automation)
- **Evaluates** them across standardized criteria (autonomy, composability, observability, etc.)
- **Recommends** a curated tech stack for the "Holy Grail" 5-phase development workflow

This is the meta-layer — the project that improves the development system itself.

## The Holy Grail Workflow

The goal is a 5-phase autonomous development cycle:

1. **Spec It** — Define what to build, surface blockers upfront (OpenSpec)
2. **Task It** — Break specs into dependency-aware tasks (Beads)
3. **Build It** — Execute with multi-agent orchestration (Oh-My-ClaudeCode)
4. **Verify It** — Full CI validation before merge/deploy
5. **Learn It** — Capture session learnings into knowledge base

Plus **infrastructure platform** components for scheduling, resilience, notifications, and safety.

## Directory Structure

```
pompidou/
├── catalogue/           # 130+ tool evaluations across 13 categories
│   ├── _index.md        # Master index (all tools, grouped by category)
│   ├── spec/            # Phase 1: Specification tools
│   ├── tasks/           # Phase 2: Task management tools
│   ├── execution/       # Phase 3: Build automation tools
│   ├── orchestration/   # Multi-agent coordination
│   ├── process/         # Session management
│   ├── scheduling/      # Auto-restart & cron
│   ├── notification/    # Blocker notifications
│   └── ...              # + 6 more categories
│
├── stack/               # Recommended tech stack (the output)
│   ├── how-it-works.md  # ★ Full system narrative
│   ├── current.md       # Quick-reference tables
│   ├── decisions.md     # Decision log with rationale
│   └── roadmap.md       # Future evaluation targets
│
└── research/            # Research pipeline
    ├── SWEEP.md         # Automated research prompt
    ├── sources.md       # Awesome lists, blogs, communities
    ├── methodology.md   # Evaluation criteria & scoring
    └── discover.js      # Tool discovery automation
```

## Quick Start

**Understand the system:**
```bash
cat stack/how-it-works.md
```

**Find a tool:**
```bash
cat catalogue/_index.md
```

**See current stack:**
```bash
cat stack/current.md
```

## Current Stack (11 Tools)

| Phase | Tool | Status |
|-------|------|--------|
| **Spec It** | OpenSpec | CLI installed globally |
| **Task It** | Beads | Not installed |
| **Build It** | Oh-My-ClaudeCode (OMC) | Not installed |
| **Build It** | Superpowers | Deferred (test OMC first) |
| **Verify It** | Per-project verify scripts | To build |
| **Learn It** | /harvest slash command | To build |
| **Platform: Process** | Claude Squad | Not installed |
| **Platform: Resilience** | claude-auto-resume | Not installed |
| **Platform: Scheduling** | runCLAUDErun | Not installed |
| **Platform: Notifications** | OpenClaw | Broken (Docker reinstall needed) |
| **Platform: Safety** | Destructive Command Guard + worktree isolation | Not installed |

## Tool Discovery

The `research/discover.js` script automates tool discovery via:
- GitHub Search API (repos, stars, recent activity)
- Awesome lists (awesome-claude, awesome-ai-devtools, etc.)
- npm search (Claude Code plugins, MCP servers)

## Evaluation Methodology

Tools are scored across 5 weighted dimensions:
- **Autonomy** (30%) — How much human intervention is reduced
- **Composability** (25%) — Integration with existing tools
- **Observability** (20%) — Visibility into agent behavior
- **Maturity** (15%) — Stability, adoption, maintenance
- **Cost** (10%) — Token usage, API costs, infrastructure

See `research/methodology.md` for full criteria.

## Contributing

This is a personal research project, but evaluation templates and methodology can be adapted for similar tool discovery efforts.

## Meta-Command

In the broader development system, "Pompidou" is also a meta-command meaning **"stop working on the current task and modify the system itself."**

## License

MIT
