# BMAD Method

| Field | Value |
|-------|-------|
| GitHub | [bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) |
| Stars | 34,500 |
| Last Commit | 2026-02-04 (v6.0.0-Beta.6) |
| Install | `npx bmad-method install` (stable) / `npx bmad-method@alpha install` (v6 alpha) |
| Status | Evaluated |
| Category | spec |
| Holy Grail Phase | 1-Spec |

## What It Does

BMAD (Breakthrough Method of Agile AI-Driven Development) is a comprehensive AI-driven development framework that simulates a full agile team using specialized AI agent personas. Rather than providing a simple spec layer like OpenSpec, BMAD gives you 21 domain experts — PM, Architect, Developer, UX Designer, Scrum Master, Analyst, and more — each defined as markdown persona files. The framework's premise is that different planning activities benefit from different "mindsets," and by switching between agent personas, you get more thorough, consistent planning output. It is best suited for complex greenfield projects where comprehensive upfront planning justifies the investment.

## How It Works

### Core Concepts

- **Agent-as-Code** — Each persona is a markdown file defining the agent's role, expertise, communication style, and available workflows. The AI "becomes" that persona when activated.
- **Two Phases** — (1) Agentic Planning: dedicated agents collaborate to produce PRDs and architecture docs. (2) Context-Engineered Development: implementation guided by the planning output.
- **Scale-Adaptive Intelligence** — The framework adjusts its level of ceremony based on project complexity. Bug fixes get a quick flow; enterprise systems get the full planning path.
- **Party Mode** — Brings multiple agent personas into one session to plan, troubleshoot, or discuss collaboratively. Useful for architecture debates or cross-cutting concerns.

### Agents (Key Personas)

| Agent | Role |
|-------|------|
| Analyst | Requirements gathering, stakeholder analysis |
| PM | Product briefs, roadmaps, prioritization |
| Architect | System design, tech stack decisions, API design |
| Developer | Implementation, code review |
| UX Designer | User flows, wireframes, accessibility |
| Scrum Master | Sprint planning, task breakdown, process |
| QA Specialist | Test strategy, quality gates |
| DevOps | CI/CD, infrastructure, deployment |

Plus 13 more specialized agents covering security, data, documentation, etc.

### Workflows

**Quick Flow** (bug fixes, small features):
`/quick-spec` --> `/dev-story` --> `/code-review`

**Full Planning Path** (products, platforms):
`/product-brief` --> `/prd` --> `/architecture` --> `/design-system` --> `/epic-breakdown` --> `/story-writing` --> `/code-review`

### Official Modules

| Module | Purpose |
|--------|---------|
| BMad Method (BMM) | Core framework, 34+ workflows |
| BMad Builder (BMB) | Custom agent and workflow creation |
| Test Architect (TEA) | Enterprise testing, 8 workflows |
| Game Dev Studio (BMGD) | Unity/Unreal/Godot support |
| Creative Intelligence Suite (CIS) | Innovation and design thinking |

### Technical Details

- Written in JavaScript (94.1%)
- Works with Claude Code, Cursor, GitHub Copilot, Windsurf
- MIT license, 58 open issues, 4,400 forks
- Active Discord community and YouTube tutorials
- v6 currently in alpha with breaking changes from v5

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 3 | 0.90 |
| Simplicity | 20% | 2 | 0.40 |
| Community trust | 15% | 4 | 0.60 |
| Ecosystem fit | 15% | 3 | 0.45 |
| Cost efficiency | 10% | 3 | 0.30 |
| Maturity | 10% | 3 | 0.30 |
| **Composite** | | | **2.95** |

### Strengths

- **Comprehensive planning** — No other SDD tool comes close to the depth of planning. The 21-agent, 50+ workflow system covers every aspect of software development from stakeholder analysis to deployment.
- **Scale-adaptive** — The quick flow for small tasks and full planning for complex projects means you do not pay ceremony overhead on trivial work.
- **Agent-as-Code pattern** — Defining personas as markdown is elegant and extensible. You can create custom agents for domain-specific needs using BMad Builder.
- **Party Mode** — Having multiple personas debate in one session produces more robust architecture decisions than a single perspective.
- **Free and open source** — MIT license, committed to staying free. No commercial upsell.
- **Active community** — Discord, YouTube, GitHub discussions. The maintainer is responsive and the community is engaged.
- **Modules for specialization** — Test Architect for QA-heavy projects, Game Dev Studio for game development. The module system extends without bloating the core.

### Weaknesses

- **Heavy for small projects** — Even the quick flow is more ceremony than OpenSpec's `/opsx:new` + `/opsx:ff`. For simple feature iterations on existing codebases, BMAD is overkill.
- **Learning curve** — 21 agents, 50+ workflows, 5 modules. Understanding which agent to use when takes time. The v5-to-v6 migration adds complexity.
- **Greenfield bias** — Like Spec Kit, BMAD is designed for building new things. Brownfield support exists but is not the primary use case.
- **Context window cost** — Loading agent personas and workflows into context is not free. The full framework consumes significant context, though less than Spec Kit's 18.6k tokens since you only load the agents you need.
- **v6 instability** — Currently in alpha (v6.0.0-Beta.6). Breaking changes from v5. Early adopters report rough edges.
- **No built-in task tracking** — Like OpenSpec, tasks are checklist-based within the framework. No cross-project visibility or dependency management.

### Community Sentiment

Community sentiment is enthusiastic but realistic. A Medium comparison piece noted: "For complex domain logic and early architecture debates, BMAD excels." The common recommendation pattern across blogs and forums is: "If you're working on existing code, try OpenSpec. If you're starting fresh, try Spec-Kit. If you're building something genuinely complex, maybe BMAD is worth the learning curve." A technical deep dive on Medium described BMAD, Spec Kit, and OpenSpec as "structurally isomorphic expressions of the same underlying intelligent system model" — each solving the same problem with different levels of abstraction. GitHub Issue #1219 is a user-created comparative analysis of BMAD vs alternatives, showing active community interest in understanding trade-offs. The Discord community is active with users sharing custom agents and workflows.

### Compared To

- **vs OpenSpec** ([`spec/openspec.md`](openspec.md)) — OpenSpec is a spec layer; BMAD is a full agile simulation. OpenSpec is lighter, faster, brownfield-first. BMAD is more thorough, better for complex greenfield. They are complementary rather than competing — you could use BMAD for initial project planning and OpenSpec for ongoing iteration.
- **vs Spec Kit** ([`spec/spec-kit.md`](spec-kit.md)) — Both target greenfield, but from different philosophies. Spec Kit is a toolkit with commands (five-phase pipeline). BMAD is a framework with agent personas (flexible workflow paths). Spec Kit has better downstream tooling (GitHub Issues export). BMAD has richer planning depth (21 agents vs 9 commands). Spec Kit has GitHub/Microsoft backing and 2x the stars; BMAD has a more engaged community relative to its size.
- **vs prd-generator** ([`spec/prd-generator.md`](prd-generator.md)) — prd-generator creates a single PRD; BMAD's PM agent creates PRDs as one step in a much larger planning process. If you only need a PRD, prd-generator is faster. If you need a PRD plus architecture plus user stories plus test strategy, use BMAD.

## Our Usage

**Status: Evaluated, held as greenfield alternative.**

We evaluated BMAD in February 2026 as part of the Pompidou tool selection. We did not choose it as our primary SDD tool because our work is predominantly brownfield iteration on existing projects, where OpenSpec's lightweight delta-spec approach is more appropriate.

**Plan to use for:** Major greenfield initiatives (new client projects, new products) where comprehensive upfront planning justifies the overhead. The agent-as-Code pattern is also interesting for our `shared/agents/` directory — we may adopt BMAD's persona format for our own agent definitions.

**Not currently installed.** Would install per-project when needed: `npx bmad-method install`. The v6 alpha is not stable enough for production use; we will wait for the stable v6 release.

## Sources

- [GitHub Repository](https://github.com/bmad-code-org/BMAD-METHOD)
- [Official Documentation](https://docs.bmad-method.org/)
- [Getting Started Tutorial](https://github.com/bmad-code-org/BMAD-METHOD/blob/main/docs/tutorials/getting-started.md)
- [Medium: Steering the Agentic Future (BMAD, Spec Kit, OpenSpec)](https://medium.com/@ap3617180/steering-the-agentic-future-a-technical-deep-dive-into-bmad-spec-kit-and-openspec-in-the-sdd-4f425f1f8d2b)
- [Medium: Spec Kit vs BMAD Method Comparison](https://medium.com/@visrow/github-spec-kit-vs-bmad-method-a-comprehensive-comparison-part-1-996956a9c653)
- [Comparison Gist: OpenSpec vs SpecKit vs BMAD](https://gist.github.com/lukasjsk/7b8d950091aef74b31dcd2216c4acb6d)
- [redreamality.com: BMAD-METHOD Guide](https://redreamality.com/garden/notes/bmad-method-guide/)
- [redreamality.com: In-Depth SDD Framework Comparison](https://redreamality.com/blog/-sddbmad-vs-spec-kit-vs-openspec-vs-promptx/)

---
*Last reviewed: 2026-02-07*
