# OpenSpec

| Field | Value |
|-------|-------|
| GitHub | [Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec) |
| Stars | 22,700 |
| Last Commit | 2026-01-30 (v1.1.1) |
| Install | `npm install -g @fission-ai/openspec@latest && openspec init --tools claude` |
| Status | ★ CHOSEN |
| Category | spec |
| Holy Grail Phase | 1-Spec |

## What It Does

OpenSpec is a lightweight spec-driven development (SDD) framework for AI coding assistants. It adds a thin spec layer so you and your AI agree on *what* to build before any code is written. The core insight is that AI coding assistants are powerful but unpredictable when requirements live only in chat history — OpenSpec solves this by externalizing requirements into structured spec files that persist across sessions. It is purpose-built for brownfield codebases, making it ideal for iterating on existing projects rather than starting from scratch.

## How It Works

### Core Concepts

- **`specs/`** — The source of truth. Baseline spec files describing the current state of the system. These are what the codebase *is*.
- **`changes/`** — Proposals for what to build next. Each change gets its own folder containing a proposal, delta specs, design doc, and task checklist.
- **Delta Specs** — Specs within a change use `[ADDED]`, `[MODIFIED]`, and `[REMOVED]` markers to describe what differs from the baseline, rather than rewriting entire specs.
- **Artifacts** — Each change folder can contain: `proposal.md` (why), `specs/` (what), `design.md` (how), `tasks.md` (checklist).

### Commands

| Command | Purpose |
|---------|---------|
| `/opsx:explore` | Think through ideas, investigate problems — explicitly prevents implementation |
| `/opsx:new` | Scaffold a new change folder and wait for direction |
| `/opsx:continue` | Create the next artifact based on dependency order |
| `/opsx:ff` | Fast-forward: generate all planning artifacts at once (proposal, specs, design, tasks) |
| `/opsx:apply` | Implement tasks from the checklist — picks up where you left off |
| `/opsx:verify` | Validate that implementation matches the spec, catch drift |
| `/opsx:sync` | Merge delta specs back into baseline `specs/` |
| `/opsx:archive` | Complete and archive a finished change |
| `/opsx:bulk-archive` | Archive multiple completed changes at once |
| `/opsx:onboard` | Guided tutorial through the complete workflow |

### Workflows

**Quick Execution** (you know what to build):
`/opsx:new` --> `/opsx:ff` --> `/opsx:apply` --> `/opsx:verify` --> `/opsx:archive`

**Exploratory** (requirements unclear):
`/opsx:explore` --> `/opsx:new` --> `/opsx:continue` (repeat) --> `/opsx:apply`

### Technical Details

- Written in TypeScript (~250 lines core)
- Requires Node.js 20.19.0+
- Works with 20+ AI coding assistants (Claude Code, Cursor, Windsurf, etc.)
- 45 contributors, MIT license, 168 open issues

## Evaluation

### Strengths

- **Lightweight** — ~250 lines of core code. Zero bloat, zero learning curve. The entire framework is simple enough to understand in one sitting.
- **Brownfield-first** — Delta specs (`[ADDED]`/`[MODIFIED]`/`[REMOVED]`) are purpose-built for evolving existing codebases, not starting from zero.
- **Context efficient** — One user reported completing 54 file changes and 5,409 lines of code within a single Claude Code session, using only 30% of context window, leaving room for debugging.
- **Fluid workflow** — Artifacts can be created in any order. No rigid waterfall pipeline. You can explore, then spec, or spec then explore.
- **Fast** — From idea to implementation plan in minutes, not hours. The `/opsx:ff` command generates everything at once when you already know what you want.
- **TypeScript-native** — Clean, readable codebase. Easy to extend or contribute to.

### Weaknesses

- **No cross-project tracking** — Each project is an island. No way to query tasks or specs across multiple repos.
- **Basic task management** — Tasks are markdown checklists inside `tasks.md`. No dependencies, no priorities, no assignment. For real task tracking, you need something like Beads on top.
- **AI can ignore the workflow** — Nothing prevents the AI from skipping the spec step and writing code directly. Discipline depends on the user and prompt engineering.
- **168 open issues** — Active project, but the issue backlog is growing. Some feature requests sit for weeks.
- **No built-in subagent delegation** — Issue #572 proposes that `/opsx:apply` should delegate tasks to subagents, but this is not yet implemented.
- **Context limits on large changes** — Issue #257 raises concerns about what happens when context exceeds limits during implementation or when requirements change after implementation.

### Community Sentiment

Generally positive, with users praising the speed and simplicity. A Hacker News thread on SDD tools consistently recommended OpenSpec for brownfield work. One blogger wrote: "OpenSpec was designed to address [context loss] problems. It's not merely a tool but an engineering methodology aiming to solve AI programming's context loss and uncontrollability through the principle of 'structure before code'." The Beads project (task tracking) has an active discussion thread about integrating with OpenSpec, suggesting the ecosystem is converging. The main complaints center around the AI sometimes ignoring the spec workflow and the lack of cross-project coordination.

### Compared To

- **vs Spec Kit** ([`spec/spec-kit.md`](spec-kit.md)) — OpenSpec is lighter, faster, and better at brownfield. Spec Kit is heavier, more structured, and better at greenfield. Spec Kit consumes ~18.6k tokens just loading commands; OpenSpec is much leaner. Choose OpenSpec for iterating on existing codebases, Spec Kit for building from scratch.
- **vs BMAD Method** ([`spec/bmad-method.md`](bmad-method.md)) — BMAD is a full framework simulating an agile team (21 agents, 50+ workflows). OpenSpec is a spec layer, not a team simulator. If you need comprehensive planning with multiple personas, use BMAD. If you need to quickly align on changes to existing code, use OpenSpec.
- **vs prd-generator** ([`spec/prd-generator.md`](prd-generator.md)) — prd-generator creates a one-time PRD document. OpenSpec manages an ongoing spec lifecycle. They are complementary — use prd-generator to capture initial requirements, then feed into OpenSpec.

## Our Usage

**Status: Active on frequency-first.**

We initialized OpenSpec on `projects/frequency-first/` with 6 baseline specs and 8 change proposals. The typical workflow is `/opsx:explore` to investigate, then `/opsx:new` + `/opsx:ff` + `/opsx:apply` for execution. We chose OpenSpec over Spec Kit because our work is almost entirely brownfield (iterating on existing projects), and the context efficiency matters when running autonomous loops on Ralph.

**Configuration:**
- Installed globally: `npm install -g @fission-ai/openspec@latest`
- Initialized per-project: `openspec init --tools claude`
- Specs live in `specs/` at project root, changes in `changes/`

**Next steps:**
- Initialize on `projects/linkedin/app/` and `projects/firstcomment/`
- Evaluate integration with Beads for cross-project task tracking
- Test subagent delegation when Issue #572 lands

## Sources

- [GitHub Repository](https://github.com/Fission-AI/OpenSpec)
- [Commands Documentation](https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md)
- [Workflows Documentation](https://github.com/Fission-AI/OpenSpec/blob/main/docs/workflows.md)
- [Getting Started](https://github.com/Fission-AI/OpenSpec/blob/main/docs/getting-started.md)
- [OpenSpec Deep Dive (redreamality.com)](https://redreamality.com/garden/notes/openspec-guide/)
- [Trying OpenSpec — A Lighter Approach (darrenonthe.net)](https://darrenonthe.net/2026/01/01/open-spec-a-lighter-approach-to-specification-driven-development/)
- [Issue #257: Context exceeds limits](https://github.com/Fission-AI/OpenSpec/issues/257)
- [Issue #572: Subagent delegation](https://github.com/Fission-AI/OpenSpec/issues/572)

---
*Last reviewed: 2026-02-07*
