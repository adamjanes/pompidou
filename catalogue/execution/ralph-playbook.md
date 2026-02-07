# Ralph Playbook

| Field | Value |
|-------|-------|
| GitHub | [ClaytonFarr/ralph-playbook](https://github.com/ClaytonFarr/ralph-playbook) |
| Stars | 735 |
| Last Commit | 2026 |
| Install | Reference documentation (not executable) |
| Status | Watching |
| Category | execution |
| Holy Grail Phase | 3-Run |

## What It Does

The definitive community guide to the Ralph Wiggum technique. Not a tool but a comprehensive reference implementation with best practices. Key insight: "Three Phases, two Prompts, one Loop" — Ralph is a funnel from requirements through planning to implementation, not just a while loop. Provides practical templates, mental models, and patterns for implementing effective Ralph loops.

## How It Works

Three-phase mental model:
1. **Requirements Phase** — Define what to build, establish constraints, identify success criteria
2. **Planning Phase** — Break down into tasks, establish verification steps, create PROMPT.md
3. **Implementation Phase** — The actual loop (`while :; do cat PROMPT.md | claude-code ; done`) with built-in verification

The playbook emphasizes that the quality of Phase 1 and 2 (requirements + planning) determines the quality of Phase 3 (execution). Most Ralph loop failures trace back to underspecified requirements, not execution problems.

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 3 | 0.90 |
| Simplicity | 20% | 5 | 1.00 |
| Community trust | 15% | 3 | 0.45 |
| Ecosystem fit | 15% | 4 | 0.60 |
| Cost efficiency | 10% | 5 | 0.50 |
| Maturity | 10% | 3 | 0.30 |
| **Composite** | | | **3.75** |

### Strengths
- Best-written Ralph documentation available — clear, practical, actionable
- The 3-phase mental model prevents the "just loop and hope" anti-pattern
- Practical templates for PROMPT.md and verification steps
- Community-validated across multiple independent developers
- Complementary to any Ralph implementation (Oh-My-ClaudeCode, ralph-claude-code, etc.)

### Weaknesses
- Documentation only — not executable, no automation
- May become outdated as Ralph implementations evolve
- Single author (Clayton Farr)
- 735 stars — modest adoption for a reference guide

### Community Sentiment

Highly praised by developers who've implemented Ralph loops. Common refrain: "Read the playbook first, then choose your tool." Seen as required reading before setting up autonomous execution.

### Compared To

- **how-to-ralph-wiggum** (Geoffrey Huntley) — The original creator's guide. More historical/philosophical. Ralph Playbook is more practical and template-driven.
- **Oh-My-ClaudeCode docs** — Tool-specific documentation vs Ralph Playbook's tool-agnostic best practices.

## Our Usage

Watching. Should be read before implementing Phase 3 execution loops. The 3-phase model (requirements → planning → implementation) aligns perfectly with our Holy Grail phases (Spec → Task → Run). Reference material, not a dependency.

## Sources

- [GitHub: ClaytonFarr/ralph-playbook](https://github.com/ClaytonFarr/ralph-playbook)

---
*Last reviewed: 2026-02-07*
