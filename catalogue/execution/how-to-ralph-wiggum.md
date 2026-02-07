# How to Ralph Wiggum (Playbook)

| Field | Value |
|-------|-------|
| GitHub | [ghuntley/how-to-ralph-wiggum](https://github.com/ghuntley/how-to-ralph-wiggum) + [ClaytonFarr/ralph-playbook](https://github.com/ClaytonFarr/ralph-playbook) |
| Stars | N/A (methodology, not starred as a single repo) |
| Last Commit | 2026-01 (both repos active) |
| Install | N/A (reference material — read, don't install) |
| Status | Evaluated |
| Category | execution |
| Holy Grail Phase | 3-Run (methodology) |

## What It Does

This is the definitive reference material for the Ralph Wiggum loop pattern, combining Geoffrey Huntley's original methodology (the creator of the Ralph concept) with Clayton Farr's community-refined playbook. Together they define the three-phase funnel (requirements, planning, building), the file structure (PROMPT, IMPLEMENTATION_PLAN, AGENTS.md, specs/), the steering techniques (upstream control, downstream backpressure, signs and gates), and the operational philosophy ("Let Ralph Ralph"). This is not a tool — it is the methodology that every Ralph tool in this catalogue implements some version of.

## How It Works

**Three-phase funnel:**

1. **Phase 1 — Define Requirements:** LLM conversation identifies Jobs to Be Done (JTBD), broken into topics of concern, each with its own spec document. One JTBD produces multiple topics, each topic produces one spec, each spec produces multiple tasks.

2. **Phase 2 — Plan:** `PROMPT_plan.md` drives gap analysis between specs and existing code, producing a prioritized `IMPLEMENTATION_PLAN.md`. No implementation happens here.

3. **Phase 3 — Build:** `PROMPT_build.md` drives task-by-task implementation with backpressure (tests, typecheck, lint). Each iteration: select task, implement, validate, commit, update plan.

**The loop itself** is a simple Bash script:
```bash
while :; do cat PROMPT.md | claude --dangerously-skip-permissions; done
```

**Key files:**

| File | Purpose |
|------|---------|
| `PROMPT_plan.md` | Gap analysis prompt; outputs prioritized task list |
| `PROMPT_build.md` | Implementation prompt; validates via tests |
| `AGENTS.md` | Operational learnings, build/test commands |
| `IMPLEMENTATION_PLAN.md` | Shared state; checkbox-based task tracking |
| `specs/*.md` | One spec per topic of concern |
| `loop.sh` | Orchestration script with mode selection |

**Steering techniques:**

- **Upstream (prevention):** Load identical files each iteration for deterministic starting state. Use existing code patterns to guide generation. Allocate ~5,000 tokens for specs.
- **Downstream (backpressure):** Tests, typechecks, lints reject invalid work automatically. LLM-as-judge tests handle subjective criteria.
- **Signs and gates** (from ralph-playbook): Observable signals that indicate when to intervene, regenerate the plan, or adjust the prompt. Watch initial loops for failure patterns, then tune.

**Effective prompt language patterns:**
- "Study" (not "read") — implies deeper analysis
- "Don't assume not implemented" — the Achilles' heel of LLMs
- "Using parallel subagents" / "up to N subagents"
- "Only 1 subagent for build/tests" — prevent race conditions
- "Capture the why" — documentation as side effect

**Context management:** ~176K usable tokens from Claude's ~200K window. The 40-60% range is the "smart zone." One task per loop = 100% smart zone utilization. Main agent acts as scheduler; subagents handle expensive work and are garbage-collected.

**Plan regeneration:** Plans are disposable. Regenerate when Ralph goes off-track, specs change, or confusion about completion status. Cost is negligible (one planning loop).

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 5 | 1.50 |
| Simplicity | 20% | 4 | 0.80 |
| Community trust | 15% | 5 | 0.75 |
| Ecosystem fit | 15% | 4 | 0.60 |
| Cost efficiency | 10% | 4 | 0.40 |
| Maturity | 10% | 5 | 0.50 |
| **Composite** | | | **4.55** |

### Strengths
- Authoritative — written by the creator of the Ralph concept (Geoffrey Huntley)
- Battle-tested across the entire Ralph ecosystem — every tool implements some version of this
- The three-phase funnel is the clearest articulation of spec-to-execution workflow
- Upstream/downstream steering provides concrete, actionable control mechanisms
- Plan disposability principle prevents sunk-cost fallacy in autonomous loops
- Prompt language patterns are immediately applicable

### Weaknesses
- Methodology only — requires picking a tool to implement it
- Assumes `--dangerously-skip-permissions` which requires sandboxing infrastructure
- JTBD framework adds overhead for simple feature requests
- The funnel is optimized for greenfield features — less clear for bug fixes or refactoring
- Multiple blog posts and repos fragment the information

### Community Sentiment

Foundational reference for the entire Ralph community. Huntley's blog posts (ghuntley.com/ralph/, /loop/, /pressure/, /cursed/) are the most-cited resources in Ralph-related discussions. Clayton Farr's playbook is praised for organizing the scattered methodology into a structured, actionable guide. The "Let Ralph Ralph" philosophy resonates broadly — trust the LLM, engineer the environment. The `--dangerously-skip-permissions` requirement is the most controversial aspect.

### Compared To

- **Advanced Context Engineering** (`catalogue/orchestration/advanced-context-engineering.md`): ACE focuses on context window optimization within a single session. This playbook focuses on the outer loop structure, steering, and multi-iteration patterns. They complement each other — ACE for intra-iteration quality, this for inter-iteration structure.
- **Every execution tool in this catalogue** implements some subset of this methodology. This is the source material.

## Our Usage

**Core reference material.** This methodology informs every execution decision in our stack:
- Three-phase funnel maps to: OpenSpec (Phase 1) -> Beads (Phase 2) -> OMC (Phase 3)
- Upstream/downstream steering principles apply to our CLAUDE.md and hooks design
- Plan disposability informs how we use Beads — tasks are cheap to regenerate
- Prompt language patterns should be incorporated into our agent definitions
- "Let Ralph Ralph" aligns with our orchestrator philosophy (Adam steers, agents execute)

The `--dangerously-skip-permissions` requirement means we need sandboxing on the Mac Mini (Docker) before running fully autonomous loops.

## Sources

- [ghuntley/how-to-ralph-wiggum](https://github.com/ghuntley/how-to-ralph-wiggum)
- [ClaytonFarr/ralph-playbook](https://github.com/ClaytonFarr/ralph-playbook)
- [ghuntley.com/ralph/](https://ghuntley.com/ralph/) — Original concept post
- [ghuntley.com/loop/](https://ghuntley.com/loop/) — Loop mechanics
- [ghuntley.com/pressure/](https://ghuntley.com/pressure/) — Backpressure patterns
- [ghuntley.com/cursed/](https://ghuntley.com/cursed/) — Failure modes and debugging

---
*Last reviewed: 2026-02-06*
