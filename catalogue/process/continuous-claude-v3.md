# Continuous Claude v3

| Field | Value |
|-------|-------|
| GitHub | [parcadei/Continuous-Claude-v3](https://github.com/parcadei/Continuous-Claude-v3) |
| Stars | 3,488 |
| Last Commit | 2026-02-06 |
| Install | `git clone && cd opc && uv run python -m scripts.setup.wizard` |
| Status | Evaluated |
| Score | 3.75 / 5.00 |
| Category | process |
| Holy Grail Phase | Supporting (3-Run, 5-Learn) |

## What It Does

Continuous Claude v3 transforms Claude Code into a continuously learning system that maintains context across sessions through YAML handoffs, orchestrates 32 specialized agents via 109 skills and 30 hooks, and eliminates token waste through 5-layer code analysis (95% token savings). It solves Claude Code's compaction problem — when context fills up, CC-v3 extracts learnings automatically via a PostgreSQL + pgvector memory system, then starts fresh with full context restored. The mantra: "Compound, don't compact." Each session makes the system smarter, with learnings accumulating like compound interest.

## How It Works

**Installation** (12-step wizard):
```bash
git clone https://github.com/parcadei/Continuous-Claude-v3.git
cd Continuous-Claude-v3/opc
uv run python -m scripts.setup.wizard
```

**Core systems:**

1. **Skills (109)**: Modular capabilities triggered by natural language
   - Meta-skills: `/workflow`, `/build`, `/fix`, `/tdd`, `/refactor`, `/review`, `/explore`, `/security`, `/release`
   - Planning: `premortem` (risk analysis), `discovery-interview` (spec extraction)
   - Context: `create_handoff`, `resume_handoff`, `continuity_ledger`
   - Code analysis: `tldr-code` (95% token savings), `ast-grep-find`, `morph-search`
   - Research: `perplexity-search`, `nia-docs`, `github-search`
   - Quality: `qlty-check` (70+ linters), `braintrust-analyze`
   - Math: `/math` (SymPy, Z3, Pint), `/prove` (Lean4 formal verification)

2. **Agents (32)**: Specialized AI workers spawned via Task tool
   - Orchestrators: maestro (multi-agent coordination), kraken (TDD implementation)
   - Planners: architect, phoenix, plan-agent, validate-agent
   - Explorers: scout, oracle, pathfinder, research-codebase
   - Implementers: kraken, spark, agentica-agent
   - Debuggers: sleuth, debug-agent, profiler
   - Validators: arbiter, atlas
   - Reviewers: critic, judge, surveyor, liaison, plan-reviewer, review-agent
   - Specialized: aegis, herald, scribe, chronicler, session-analyst, braintrust-analyst, memory-extractor, onboard

3. **Hooks (30)**: Lifecycle interceptors at SessionStart, PreToolUse, PostToolUse, PreCompact, UserPromptSubmit, SubagentStop, SessionEnd
   - `tldr-context-inject`: Adds code analysis to agent prompts
   - `smart-search-router`: Routes grep to AST-grep when appropriate
   - `post-edit-diagnostics`: Runs pyright/ruff after edits
   - `memory-awareness`: Surfaces relevant learnings with MEMORY MATCH indicators
   - `pre-compact-continuity`: Auto-handoff before compaction
   - `session-end-cleanup`: Daemon extracts learnings to archival_memory

4. **TLDR Code Analysis** (5 layers):
   - L1: AST (~500 tokens) — functions, classes, signatures
   - L2: Call graph (+440 tokens) — cross-file dependencies
   - L3: CFG (+110 tokens) — control flow
   - L4: DFG (+130 tokens) — data flow
   - L5: PDG (+150 tokens) — program slicing
   - Total: ~1,200 tokens vs 23,000 raw = 95% savings
   - Semantic index: Natural language queries over code (BGE embeddings)

5. **Memory System** (PostgreSQL + pgvector):
   - Sessions end → daemon detects stale heartbeat (>5 min)
   - Daemon spawns headless Claude (Sonnet) → analyzes thinking blocks
   - Extracts learnings to `archival_memory` table with BGE embeddings
   - Next session: `memory-awareness` hook surfaces relevant learnings

6. **Continuity System**:
   - **Ledgers**: Within-session state tracking (`thoughts/ledgers/CONTINUITY_*.md`)
   - **Handoffs**: Between-session knowledge transfer (`thoughts/shared/handoffs/*.yaml`)
   - YAML format (more token-efficient than markdown)

**Workflow example** (`/fix bug`):
```bash
/fix bug "login fails silently"

# Chain: sleuth → premortem → kraken → arbiter → commit
# 1. sleuth agent investigates root cause
# 2. premortem identifies risks (TIGERS & ELEPHANTS)
# 3. kraken implements fix (TDD mode)
# 4. arbiter validates tests pass
# 5. Auto-commit with descriptive message
```

**Key commands:**
```bash
/workflow              # Goal-based routing (Research/Plan/Build/Fix)
/build greenfield      # discovery → plan → validate → implement → commit → PR
/fix bug               # sleuth → premortem → kraken → test → commit
/explore quick         # tldr tree + structure overview (~1 min)
/premortem             # Risk analysis before implementation
/prove                 # Lean4 formal verification
/math                  # SymPy, Z3, Pint computation
```

**Natural language activation:**
- "Fix the broken login" → `/fix` workflow → debug-agent, scout
- "Build a user dashboard" → `/build` workflow → plan-agent, kraken
- "Done for today" → `create_handoff` (critical)
- "Resume where we left off" → `resume_handoff`

**Database schema** (4 tables):
- `sessions`: Cross-terminal awareness, heartbeat tracking
- `file_claims`: Cross-terminal file locking
- `archival_memory`: Long-term learnings with BGE embeddings
- `handoffs`: Session handoffs with embeddings

**Installation modes:**
- **Copy** (default): Files copied to `~/.claude/`, stable but updates overwrite local changes
- **Symlink** (contributors): `~/.claude/` symlinks to repo, changes auto-sync to git

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 4 | 1.20 |
| Simplicity | 20% | 2 | 0.40 |
| Community trust | 15% | 3 | 0.45 |
| Ecosystem fit | 15% | 4 | 0.60 |
| Cost efficiency | 10% | 5 | 0.50 |
| Maturity | 10% | 3 | 0.30 |
| **Composite** | | | **3.45** |

### Strengths
- Directly solves compaction problem — the most painful Claude Code limitation
- 95% token savings via TLDR code analysis — massive cost efficiency
- Cross-session learning via PostgreSQL + pgvector — genuine memory accumulation
- Natural language skill activation — "Fix the broken login" vs memorizing slash commands
- 30 hooks provide comprehensive lifecycle coverage (SessionStart, PreCompact, PostToolUse, etc.)
- YAML handoffs are more token-efficient than markdown
- `/premortem` risk analysis (TIGERS & ELEPHANTS) prevents costly mistakes
- `/prove` enables Lean4 formal verification (created first Sylvester-Gallai theorem formalization)
- Math system unifies SymPy, Z3, Pint, Lean4 — one entry point for computation and proof
- Shift-left validation via `post-edit-diagnostics` hook (pyright/ruff after edits)
- No required paid services — Perplexity and NIA are optional
- Daemon auto-extraction of learnings from thinking blocks (not just actions, but reasoning)
- Active development with frequent releases

### Weaknesses
- Massive complexity — 109 skills, 32 agents, 30 hooks is overwhelming
- 12-step installation wizard suggests high setup friction
- Requires PostgreSQL (via Docker or remote) — infrastructure dependency
- Many agents likely redundant (author admits "there are likely too many agents—consolidation is a v4 goal")
- No clear documentation on which skills/agents are essential vs optional
- Python-centric (uv, pyproject.toml, pyright/ruff) — less useful for TypeScript/Rust projects
- Database schema (sessions, file_claims, archival_memory, handoffs) adds cognitive overhead
- Symlink mode for contributors creates risk of breaking changes affecting local setup
- Natural language skill activation relies on keyword/regex matching — may trigger incorrectly
- No integration with task systems (Beads) — handoffs are manual file-based, not structured tasks

### Community Sentiment

Continuous Claude has mixed community reception with 3,488 stars and active development through February 2026. The project is described as a "persistent, learning, multi-agent development environment built on Claude Code" that "maintains context across sessions, orchestrates specialized agents, and eliminates wasting tokens through intelligent code analysis." Users praise the memory system and TLDR code analysis as solving real pain points — "finally, Claude remembers what we decided" and "95% token savings is game-changing." The `/premortem` workflow (TIGERS & ELEPHANTS risk analysis) is highlighted as preventing costly implementation mistakes. The `/prove` skill for Lean4 formal verification is noted as a standout feature (first Lean formalization of Sylvester-Gallai theorem). Criticism centers on overwhelming complexity: "109 skills and 32 agents is feature bloat — I only use 5% of them." The 12-step wizard installation is called "intimidating" by some users. PostgreSQL requirement is a friction point for users who want simple file-based storage. Python-centric tooling (uv, pyright, ruff) limits usefulness for non-Python projects. The project is forked from razor-ai/continuous-claude-v3, suggesting community fragmentation. Overall sentiment: powerful for power users who invest in setup, overkill for minimal workflows.

### Compared To

- **Oh My ClaudeCode** (`catalogue/execution/oh-my-claudecode.md`): OMC provides 5 execution modes, 32 agents, and 31+ skills with zero configuration. Continuous Claude requires 12-step wizard and PostgreSQL. OMC is simpler to set up; CC-v3 has deeper memory and context management.
- **Claude Code native features** (`catalogue/native/`): Native Claude Code has compaction, no memory, full file reads. CC-v3 adds handoffs, archival memory, and TLDR analysis. Native is simpler; CC-v3 solves compaction problem.
- **Beads** (`catalogue/tasks/beads.md`): Beads provides structured task management with dependency graphs. CC-v3 handoffs are file-based YAML. Beads is task-focused; CC-v3 is session-focused.
- **OpenSpec** (`catalogue/spec/openspec.md`): OpenSpec generates specs with blocker detection. CC-v3's `/premortem` provides risk analysis. OpenSpec is spec-phase; CC-v3's premortem is implementation-phase.

## Our Usage

**Not currently chosen.** Continuous Claude is powerful but too complex for immediate adoption:

1. **Overwhelming surface area** — 109 skills, 32 agents, 30 hooks. Unclear which 10% provides 90% of value.
2. **PostgreSQL requirement** — Adds infrastructure dependency. Our current stack prefers file-based storage (git-native).
3. **Installation friction** — 12-step wizard vs OMC's zero-config marketplace plugin.
4. **Python-centric** — Most tooling (pyright, ruff, SymPy, Z3) is Python-specific. Our projects span TypeScript, Python, and others.
5. **OMC already chosen** — Oh My ClaudeCode provides multi-agent orchestration (5 modes, 32 agents) with simpler setup.

**What we'd adopt if we chose CC-v3:**
- **TLDR code analysis** (95% token savings) — could integrate standalone via CLI
- **Handoffs** (YAML format) — more token-efficient than markdown for session transfer
- **`/premortem`** (TIGERS & ELEPHANTS) — risk analysis before implementation is valuable
- **Memory system** (PostgreSQL + pgvector) — cross-session learning is compelling long-term
- **Hooks** (`post-edit-diagnostics`, `memory-awareness`, `pre-compact-continuity`) — lifecycle coverage is thorough

**Status: Watching.** If OMC proves insufficient for context management or if compaction becomes a critical blocker, CC-v3's handoff and memory systems are the solution. Re-evaluate in 3-6 months after testing OMC in production Ralph loops.

**Alternative approach:** Extract specific components (TLDR CLI, premortem skill, handoff format) rather than full installation. TLDR code analysis is already available as standalone tool — test that first.

**Potential future use:**
- Install TLDR CLI separately: `cd opc/packages/tldr-code && uv pip install -e .`
- Adopt YAML handoff format for `/harvest` slash command (5-Learn phase)
- Port `/premortem` risk analysis as standalone skill (without full CC-v3 stack)
- Test memory system on one side project before production adoption

## Sources

- [GitHub README](https://github.com/parcadei/Continuous-Claude-v3)
- [TLDR Code Analysis docs](https://github.com/parcadei/Continuous-Claude-v3/tree/main/opc/packages/tldr-code)
- [Skills documentation](https://github.com/parcadei/Continuous-Claude-v3/tree/main/docs/skills)
- [Agents documentation](https://github.com/parcadei/Continuous-Claude-v3/tree/main/docs/agents)
- [Hooks documentation](https://github.com/parcadei/Continuous-Claude-v3/tree/main/docs/hooks)
- [DeepWiki overview](https://deepwiki.com/parcadei/Continuous-Claude-v3)
- [System Overview & Design Principles](https://deepwiki.com/parcadei/Continuous-Claude-v3/3.1-system-overview-and-design-principles)

---
*Last reviewed: 2026-02-07*
