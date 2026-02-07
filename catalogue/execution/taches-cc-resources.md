# TACHES Claude Code Resources

| Field | Value |
|-------|-------|
| GitHub | [glittercowboy/taches-cc-resources](https://github.com/glittercowboy/taches-cc-resources) |
| Stars | 1,300 |
| Last Commit | Recent (active) |
| Install | `claude plugin marketplace add glittercowboy/taches-cc-resources && claude plugin install taches-cc-resources` |
| Status | Evaluated |
| Category | Execution |
| Holy Grail Phase | Phase 1 (Foundation) |

## What It Does

Collection of 27 commands, 9 skills, and 3 agents for Claude Code workflows. Covers meta-prompting, project planning, skill creation, autonomous coding loops, and debugging. Designed for solo developers working with Claude Code as their primary dev tool.

## How It Works

- **Commands (27):** Meta-prompting (`/create-prompt`, `/run-prompt`), task capture (`/add-to-todos`, `/check-todos`), thinking frameworks (`/consider:pareto`, `/consider:first-principles`, `/consider:inversion`), context handoff (`/whats-next`), debugging (`/debug`)
- **Skills (9):** Plan creation, agent/skill/command builders, MCP server creation, debugging methodology, Ralph loop setup
- **Agents (3):** Specialized auditors for skills, commands, and subagents
- **Workflow:** `/create-plan` + `/run-plan` for hierarchical execution with domain expertise
- Auto-healing via `/heal-skill` for broken skills
- Shell-heavy (72.6% Shell, 12.9% Python, 12.4% TypeScript)

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 2 | 0.60 |
| Simplicity | 20% | 4 | 0.80 |
| Community trust | 15% | 3 | 0.45 |
| Ecosystem fit | 15% | 3 | 0.45 |
| Cost efficiency | 10% | 4 | 0.40 |
| Maturity | 10% | 2 | 0.20 |
| **Composite** | | | **2.90** |

**Strengths:**
- Practical, real-workflow-tested commands and skills
- Thinking framework commands (`/consider:*`) are a clever UX pattern
- Includes Ralph loop setup skill -- directly relevant to our Phase 4
- Plugin marketplace install is clean

**Weaknesses:**
- Only 2 contributors -- bus factor risk
- Shell-heavy codebase is harder to extend
- Many commands overlap with what we already have or plan to build
- Quality varies across the 27 commands (some are thin wrappers)

**Community Sentiment:** Well-liked by the Claude Code power user community. Referenced frequently in discussions about Claude Code customization.

**Compared To:** Our own `shared/templates/claude-code/` and `~/.claude/skills/` serve a similar purpose. TACHES is more comprehensive out of the box, but adopting it wholesale means depending on external maintenance.

## Our Usage

Evaluated. Cherry-picking specific commands rather than full adoption. The thinking framework commands (`/consider:*`) and Ralph setup skill are worth studying. May adapt patterns into our own `shared/templates/` rather than installing as a dependency.

## Sources

- [GitHub README](https://github.com/glittercowboy/taches-cc-resources)

Last reviewed: 2026-02-06
