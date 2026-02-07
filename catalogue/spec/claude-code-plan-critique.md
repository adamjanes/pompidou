# claude-code-plan-critique

| Field | Value |
|-------|-------|
| GitHub | [serbanghita/claude-code-plan-critique](https://github.com/serbanghita/claude-code-plan-critique) |
| Stars | 11 |
| Last Commit | 2026-02-04 |
| Install | Clone repo, copy commands to `.claude/commands/` |
| Status | Evaluated |
| Category | spec |
| Holy Grail Phase | 1-Spec |

## What It Does

Iterative plan review workflow for Claude Code. Enables a Plan → Critique (N times) → Execute → Archive cycle where you maintain control of the feedback loop. Multiple plans can exist simultaneously while keeping critique explicit and user-controlled.

## How It Works

**Workflow:**
```
/plan-create ──► edit plan.md ──► /plan-critique ──► read critique.md, update plan.md
                      ▲                                     │
                      └──────── iterate until satisfied ────┘
                                        │
                                        ▼
                              /plan-execute ──► /plan-archive
```

**Commands:**
1. `/plan-create` - Create plan in `.planning/[plan name]/plan.md`
2. `/plan-critique` - Claude reviews plan, generates `critique.md` with issues/suggestions
3. User updates `plan.md` based on critique
4. Repeat steps 2-3 until satisfied
5. `/plan-execute` - Parse plan into steps, confirm, run with resume support
6. `/plan-archive` - Move to `.planning/archived/[plan name]`

**File Structure:**
```
.planning/
├── auth-feature/
│   ├── plan.md
│   └── critique.md
└── archived/
    └── previous-feature/
```

**Pre-requisites:**
- `CLAUDE.md` file with project standards (used as context for critique)

## Evaluation

### Strengths
- Simple file-based workflow (no database, no complex state)
- Separates planning from execution explicitly
- User controls when to accept critique vs iterate
- Multiple plans can coexist
- Resume support for execution
- Git-friendly (plain markdown)
- Zero dependencies (just Claude Code commands)

### Weaknesses
- Very young project (created Jan 2026, 11 stars)
- No test coverage
- Minimal documentation (README is 40 lines)
- Requires manual editing of `plan.md` between critique iterations (no inline feedback)
- No automated quality checks on plan before execution
- No integration with task systems (Linear, Beads, etc.)
- Critique is unstructured markdown (no schema, no severity levels)
- Plan format is undefined (no template, no conventions)

### Community Sentiment

Broader 2026 planning discussions show iterative plan review is a recognized pattern ([Claude Code Plan Mode](https://stevekinney.com/courses/ai-development/claude-code-plan-mode), [AddyOsmani.com workflow](https://addyosmani.com/blog/ai-coding-workflow/)). Users feed plans into multiple AI systems (ChatGPT + Gemini) for review before executing. No specific discussion of this tool found — too small and new.

### Compared To

- **vs OpenSpec**: OpenSpec generates structured specs with blocker surfacing; plan-critique does iterative review of user-written plans
- **vs deep-plan**: deep-plan orchestrates research → interview → external LLM review → TDD; plan-critique is simpler file-based iteration
- **vs Planning with Files**: That's a general approach; plan-critique provides specific commands
- **vs native Plan Mode**: Claude Code's Shift+Tab plan mode previews execution; plan-critique adds critique step

**Position**: Lightweight alternative to deep-plan for simpler projects. Lacks OpenSpec's blocker surfacing and deep-plan's multi-LLM review orchestration.

## Our Usage

**Not chosen.**

**Why not:**
- OpenSpec (our chosen Phase 1 tool) provides structured specs with blocker surfacing upfront
- deep-plan (evaluated, not chosen) offers more sophisticated multi-LLM review with research/interview
- This tool requires too much manual editing between iterations (no inline feedback, no structured critique)
- No schema for plans means Claude has no guardrails for critique quality
- No integration path with Beads (our Phase 2 task tool)

**What we liked:**
- File-based approach fits our git-native workflow
- Separating planning from execution is correct conceptually
- Multiple plans coexisting is useful

**What would make us reconsider:**
- Structured plan format (markdown with frontmatter schema)
- Inline critique annotations (not separate `critique.md` file)
- Severity levels for critique items (blocker, suggestion, question)
- Integration with OpenSpec output format (critique OpenSpec specs)
- AI-assisted plan refinement (not just critique, but proposed edits)

**If OpenSpec doesn't work for us:**
We'd likely build custom commands using deep-plan's external LLM review approach rather than adopt plan-critique.

## Sources

- [README](https://github.com/serbanghita/claude-code-plan-critique)
- [Blog post: claude-code-plan-critique](https://ghita.org/blog/claude-code-plan-critique/)
- [Claude Code Plan Mode - Steve Kinney](https://stevekinney.com/courses/ai-development/claude-code-plan-mode)
- [AddyOsmani: My LLM coding workflow going into 2026](https://addyosmani.com/blog/ai-coding-workflow/)

---
*Last reviewed: 2026-02-07*
