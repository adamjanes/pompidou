# Spec Kit

| Field | Value |
|-------|-------|
| GitHub | [github/spec-kit](https://github.com/github/spec-kit) |
| Stars | 68,100 |
| Last Commit | 2026-02-04 |
| Install | `uvx --from git+https://github.com/github/spec-kit.git specify init <PROJECT>` |
| Status | Evaluated |
| Category | spec |
| Holy Grail Phase | 1-Spec |

## What It Does

Spec Kit is GitHub's official open-source toolkit for spec-driven development. Backed by GitHub/Microsoft, it provides a structured five-phase process for turning product ideas into working software through AI coding agents. The core philosophy is that specifications become executable — directly generating working implementations rather than just guiding them. It positions itself as the antidote to "vibe coding," where developers throw prompts at AI and hope for the best. Spec Kit is the industry standard by star count and corporate backing, but it is optimized for greenfield features (building 0-to-1) with a 1-5 day scope.

## How It Works

### Core Concepts

- **Constitution** — A project-level document defining coding standards, architecture patterns, tech stack, and constraints. Loaded into every session to keep the AI aligned.
- **Spec** — A detailed feature specification covering scenarios, acceptance criteria, and technical approach. The single source of truth for what to build.
- **Plan** — An implementation plan breaking the spec into ordered steps with file-level granularity.
- **Tasks** — Individual task files, one per implementation step. Each task is self-contained with context, instructions, and validation criteria.

### Commands (Five Phases)

| Phase | Command | Purpose |
|-------|---------|---------|
| 1. Constitution | `/speckit.constitution` | Define project standards, stack, and constraints |
| 2. Specify | `/speckit.specify` | Write a detailed feature spec with scenarios |
| 3. Plan | `/speckit.plan` | Break the spec into an ordered implementation plan |
| 4. Tasks | `/speckit.tasks` | Generate individual task files from the plan |
| 5. Implement | `/speckit.implement` | Execute tasks one at a time with the AI |

Additional commands: `/speckit.clarify` (ask clarifying questions), `/speckit.analyze` (analyze existing code), `/speckit.checklist` (validate completion), `/speckit.taskstoissues` (export tasks to GitHub Issues).

### Workflow

The process is linear and sequential: constitution --> specify --> plan --> tasks --> implement. Each phase produces artifacts that feed the next. The constitution is written once and reused; specs, plans, and tasks are per-feature.

### Technical Details

- Written in Python, requires Python 3.11+ and `uv` package manager
- Works with 15+ AI tools: Claude Code, Cursor, GitHub Copilot, Gemini CLI, Windsurf, etc.
- 528 open issues, 92 open PRs, 5,900 forks
- MIT license

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 3 | 0.90 |
| Simplicity | 20% | 2 | 0.40 |
| Community trust | 15% | 5 | 0.75 |
| Ecosystem fit | 15% | 3 | 0.45 |
| Cost efficiency | 10% | 2 | 0.20 |
| Maturity | 10% | 5 | 0.50 |
| **Composite** | | | **3.20** |

### Strengths

- **Industry standard** — 68k+ stars, GitHub/Microsoft backing, massive community. If spec-driven development has a default choice, this is it.
- **Strong task decomposition** — The spec --> plan --> tasks pipeline produces individual task files with full context. Each task is self-contained, which is excellent for agent execution.
- **Comprehensive tooling** — 15+ AI tool integrations out of the box. Works everywhere.
- **GitHub Issues export** — `/speckit.taskstoissues` bridges spec-driven development with traditional project management.
- **Well-documented** — Extensive documentation, blog posts, Microsoft Developer tutorials, and third-party guides. Easy to find help.
- **Active development** — Regular releases, responsive maintainers, strong ecosystem.

### Weaknesses

- **Context window consumption** — The single biggest complaint. Issue #1401 documents that Spec Kit commands consume ~18.6k tokens just by being loaded, before any actual work begins. Breakdown: `speckit.checklist` (4.2k), `speckit.specify` (3.1k), `speckit.implement` (3.1k), `speckit.clarify` (2.8k), `speckit.analyze` (1.8k), `speckit.tasks` (1.5k), `speckit.constitution` (1.2k), `speckit.plan` (690). Every token consumed by commands is a token unavailable for code context.
- **Spec drift** — No built-in mechanism to detect when implementation diverges from spec. The spec and code can silently go out of sync. Issue #803 requests clarification on context isolation and cleanup.
- **Brownfield support is weak** — Issue #806 states "Brownfield project require more iterating / explicit technical guidance, makes spec messy with technical details." Issue #959 requests enhanced brownfield support. Multiple discussion threads (#678, #746, #331) ask how to use Spec Kit on existing codebases. The `/speckit.analyze` command exists but is limited.
- **Overhead for small tasks** — The five-phase process is overkill for bug fixes or small changes. No "quick mode" for sub-day work.
- **Greenfield bias** — Designed for 0-to-1 features. When pointed at an existing codebase, it tends to regenerate existing classes as new specs rather than recognizing what already exists.
- **Rigid pipeline** — constitution --> specify --> plan --> tasks --> implement is linear. No flexibility to create artifacts in different orders or skip phases.

### Community Sentiment

Community sentiment is mixed. The star count suggests massive interest, but the issues and discussions reveal friction in practice. A Scott Logic blog post titled "Putting Spec Kit Through Its Paces: Radical Idea or Reinvented Waterfall?" captures the ambivalence. On Hacker News, a thread "Are you still using spec driven development?" showed users gravitating toward lighter alternatives. The EPAM blog post on brownfield usage concluded that "supplying architectural context early allows the plan to align with actual architecture, but without this input, Spec Kit generates generic, often suboptimal structures." Martin Fowler's team wrote a technical comparison noting Spec Kit works best for greenfield but struggles with existing codebases. The context window issue (#1401) is frequently cited as the top pain point.

### Compared To

- **vs OpenSpec** ([`spec/openspec.md`](openspec.md)) — OpenSpec is lighter (~250 lines vs full Python toolkit), consumes far less context, and is brownfield-first with delta specs. Spec Kit has better task decomposition (individual task files vs markdown checklists) and stronger tooling ecosystem. If you work primarily on existing codebases, OpenSpec wins. If you are building new features from scratch with a clear scope, Spec Kit is more thorough.
- **vs BMAD Method** ([`spec/bmad-method.md`](bmad-method.md)) — Spec Kit and BMAD solve similar problems from different angles. Spec Kit is a toolkit with commands; BMAD is a framework with agent personas. Spec Kit is more prescriptive (five phases); BMAD is more flexible (quick flow vs full planning). BMAD has richer planning with 21 specialized agents; Spec Kit has better downstream tooling (GitHub Issues integration, task files).
- **vs prd-generator** ([`spec/prd-generator.md`](prd-generator.md)) — prd-generator produces a single PRD document; Spec Kit manages the full lifecycle from spec through implementation. prd-generator could feed into Spec Kit's `/speckit.specify` phase.

## Our Usage

**Status: Evaluated, not chosen for primary use.**

We evaluated Spec Kit in January 2026 and chose OpenSpec instead for three reasons: (1) our work is almost entirely brownfield, where Spec Kit is weakest; (2) the ~18.6k token context tax is unacceptable for autonomous Ralph loops where every token counts; (3) the five-phase pipeline adds overhead for the small-to-medium changes that make up most of our work.

**May revisit for:** Greenfield projects where we need comprehensive planning (new client projects, major new features). The task decomposition into individual files would integrate well with Beads for cross-project tracking. The `/speckit.taskstoissues` command is compelling for client work where GitHub Issues are the communication layer.

**Not installed.** Would install per-project if needed: `uvx --from git+https://github.com/github/spec-kit.git specify init <PROJECT>`.

## Sources

- [GitHub Repository](https://github.com/github/spec-kit)
- [GitHub Blog: Spec-Driven Development with AI](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/)
- [Microsoft Developer Blog: Diving Into SDD](https://developer.microsoft.com/blog/spec-driven-development-spec-kit)
- [Issue #1401: Context window consumption](https://github.com/github/spec-kit/issues/1401)
- [Issue #806: Brownfield projects messy with technical details](https://github.com/github/spec-kit/issues/806)
- [Issue #959: Enhanced brownfield support](https://github.com/github/spec-kit/issues/959)
- [Scott Logic: Putting Spec Kit Through Its Paces](https://blog.scottlogic.com/2025/11/26/putting-spec-kit-through-its-paces-radical-idea-or-reinvented-waterfall.html)
- [Martin Fowler: SDD Tools Comparison](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
- [LogRocket: Exploring Spec-Driven Development](https://blog.logrocket.com/github-spec-kit/)
- [EPAM: Using Spec Kit for Brownfield](https://www.epam.com/insights/ai/blogs/using-spec-kit-for-brownfield-codebase)

---
*Last reviewed: 2026-02-07*
