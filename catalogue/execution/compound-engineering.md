# Compound Engineering

| Field | Value |
|-------|-------|
| **GitHub** | [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin) |
| **Stars** | 7,400 |
| **Last Commit** | Active (2026) |
| **Install** | `/plugin marketplace add https://github.com/EveryInc/compound-engineering-plugin` then `/plugin install compound-engineering` |
| **Status** | Watching |
| **Category** | Execution |
| **Holy Grail Phase** | 3-Run |

## What It Does

Compound Engineering is a Claude Code plugin built on the philosophy that each engineering task should be easier than the previous one. It implements a four-phase cycle -- plan, execute with tracking, multi-agent code review, document learnings -- where accumulated knowledge from past iterations informs better future plans. The approach inverts traditional development effort: 80% planning/review, 20% execution. Built by the team at Every (TypeScript/Bun).

## How It Works

### Four-Phase Workflow Cycle

| Phase | Command | What Happens |
|-------|---------|--------------|
| **Plan** | `/workflows:plan` | Creates detailed implementation plan from feature concept. Heavy upfront design (the 80%). |
| **Execute** | `/workflows:work` | Executes plan using git worktrees and task tracking. Progress checkpoints throughout. |
| **Review** | `/workflows:review` | Multi-agent code review before merging. Multiple agents collaborate to identify issues and capture team learnings. |
| **Compound** | `/workflows:compound` | Documents learnings, extracts reusable patterns, feeds knowledge back into the system for future iterations. |

### Compounding Mechanism

Each cycle builds on previous iterations:
1. Plans reference past learnings and documented patterns
2. Reviews capture additional insights during quality checks
3. Documented patterns become reusable foundations for future work
4. The knowledge base grows with every completed cycle

This is the core differentiator -- the system gets smarter over time rather than starting from scratch each session.

### Technical Details

- Built with TypeScript and Bun
- Uses git worktrees for isolated execution (similar to Superpowers)
- Experimental conversion formats for OpenCode and Codex
- MIT licensed

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 4 | 1.20 |
| Simplicity | 20% | 4 | 0.80 |
| Community trust | 15% | 3 | 0.45 |
| Ecosystem fit | 15% | 3 | 0.45 |
| Cost efficiency | 10% | 2 | 0.20 |
| Maturity | 10% | 3 | 0.30 |
| **Composite** | | | **3.40** |

### Strengths
- The "compounding" philosophy directly addresses the biggest weakness of AI agents: they forget everything between sessions
- Four-phase cycle is simple enough to understand but rigorous enough to enforce quality
- Multi-agent code review catches issues that single-agent review misses
- Git worktree usage keeps experimental work isolated
- 80/20 planning/execution ratio is aggressive but produces higher quality output
- From Every Inc (reputable engineering publication/company)

### Weaknesses
- Smaller community (7.4K stars) compared to Superpowers (46K) and Everything Claude Code (41K)
- Less comprehensive than Superpowers -- no TDD enforcement, no debugging skills, no brainstorming
- The "compound" phase requires discipline to use consistently -- easy to skip the documentation step
- OpenCode and Codex conversion targets remain experimental
- No clear documentation on how learnings persist across sessions or projects

### Community Sentiment
Positive but smaller. Users who adopt it tend to be philosophy-aligned -- they buy into the "80% planning" approach. Less mainstream than Superpowers. The Every Inc brand lends credibility.

### Compared To
- **Superpowers**: More comprehensive (20+ skills, TDD, debugging, brainstorming). Compound Engineering is simpler (4 commands) but has the unique compounding/learning mechanism.
- **Everything Claude Code**: Much broader toolkit. Compound Engineering is more focused and opinionated about the plan-execute-review-learn cycle.
- **Oh-My-ClaudeCode**: Execution engine without methodology. Compound Engineering provides the methodology layer.

## Our Usage

**Plan:** The compounding mechanism is the key value proposition. Over multiple Ralph loop iterations, documented learnings should improve code quality and reduce repeated mistakes. This aligns directly with our goal of autonomous loops that get better over time.

**Specific interest:**
- `/workflows:compound` (document learnings) phase could feed into project-level `knowledge/updates/` files
- Multi-agent review via `/workflows:review` could replace or supplement our reviewer agent
- The learning-from-mistakes pattern is exactly what we need for overnight Ralph loops

**Concerns:**
- Potential overlap with Superpowers' planning and review phases
- Need to test whether the "compound" phase learnings actually persist and improve subsequent iterations, or if it's just documentation theater
- The 80/20 planning ratio may be too slow for Ralph loops where we want fast autonomous execution

**Decision:** Watch alongside Superpowers. If we adopt Superpowers for methodology, Compound Engineering's `/workflows:compound` learning phase might still be worth cherry-picking. Test both on frequency-first to compare.

## Sources

- [GitHub Repository](https://github.com/EveryInc/compound-engineering-plugin)

---
*Last reviewed: 2026-02-06*
