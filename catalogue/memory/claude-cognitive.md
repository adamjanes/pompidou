# Claude Cognitive

| Field | Value |
|-------|-------|
| GitHub | [GMaN1911/claude-cognitive](https://github.com/GMaN1911/claude-cognitive) |
| Stars | 433 |
| Last Commit | 2026-02-03 |
| Install | `git clone https://github.com/GMaN1911/claude-cognitive.git ~/.claude-cognitive` |
| Status | Watching |
| Category | memory |
| Holy Grail Phase | Supporting |

## What It Does

Claude Cognitive gives Claude Code working memory through two complementary systems: (1) Context Router with attention-based file injection (HOT/WARM/COLD tiers), and (2) Pool Coordinator for multi-instance state sharing. It solves the stateless problem where every new Claude Code instance rediscovers your codebase from scratch, hallucinates non-existent integrations, and burns tokens re-reading unchanged files.

## How It Works

**1. Context Router (Attention Dynamics)**

Files transition between tiers based on keywords and decay:
- **HOT (>0.8)**: Full file injection — active development
- **WARM (0.25-0.8)**: Headers only (first 25 lines) — background awareness
- **COLD (<0.25)**: Evicted from context

**Attention mechanics:**
```
User mentions "orin" in message
    ↓
systems/orin.md → score = 1.0 (HOT)
    ↓
Co-activation:
  integrations/pipe-to-orin.md → +0.35 (WARM)
  modules/t3-telos.md → +0.35 (WARM)
    ↓
Next turn (no mention):
  systems/orin.md → 1.0 × 0.85 decay = 0.85 (still HOT)
    ↓
3 turns later (no mention):
  systems/orin.md → 0.85³ = 0.61 (now WARM)
```

**Configuration (`/.claude/keywords.json`):**
```json
{
  "keywords": {
    "path/to/doc.md": ["keyword1", "keyword2", "phrase to match"]
  },
  "co_activation": {
    "path/to/doc.md": ["related/doc.md"]
  },
  "pinned": ["always/warm/file.md"]
}
```

**2. Pool Coordinator (Multi-Instance State)**

**Automatic mode:** Detects completions/blockers from conversation every 5min
```
Instance A completes task
    ↓
Auto-detector finds: "Successfully deployed PPE to Orin"
    ↓
Writes pool entry:
  action: completed
  topic: PPE deployment to Orin
  affects: orin_sensory_cortex/
    ↓
Instance B starts session
    ↓
Pool loader shows: "[A] completed: PPE deployment to Orin"
```

**Manual mode:** Explicit `pool` blocks for critical coordination
````markdown
```pool
INSTANCE: A
ACTION: completed
TOPIC: Fixed authentication bug
SUMMARY: Resolved race condition in token refresh. Added mutex.
AFFECTS: auth.py, session_handler.py
BLOCKS: Session management refactor can proceed
```
````

**3. History Tracking (v1.1+)**

Every turn logged with structured data:
```json
{
  "turn": 47,
  "timestamp": "2025-12-31T18:43:21Z",
  "instance_id": "A",
  "prompt_keywords": ["refactor", "ppe", "routing"],
  "activated": ["ppe-anticipatory-coherence.md"],
  "hot": ["ppe-anticipatory-coherence.md", "t3-telos.md"],
  "warm": ["orin.md", "pipeline.md"],
  "transitions": {
    "to_hot": ["ppe-anticipatory-coherence.md"],
    "to_cold": ["img-to-asus.md"]
  },
  "total_chars": 18420
}
```

**Query history:**
```bash
python3 ~/.claude/scripts/history.py --since 2h
python3 ~/.claude/scripts/history.py --file ppe --transitions
python3 ~/.claude/scripts/history.py --stats --since 7d
```

**Hooks:**
- `UserPromptSubmit`: Context router + pool auto-update
- `SessionStart`: Pool loader
- `Stop`: Pool extractor (manual blocks)

**State files:**
- `.claude/attn_state.json` — Context router scores
- `.claude/pool/instance_state.jsonl` — Pool entries
- `~/.claude/attention_history.jsonl` — 30-day attention log

## Evaluation

### Strengths
- **Token savings: 64-95%** — Cold start: 120K → 25K chars; warm: 80K → 24K chars
- **Production validated** — 1M+ line codebase, 3,200+ Python modules, 8 concurrent instances
- **Multi-day sessions** — Persistent memory across days-long work
- **Zero hallucinations** — No fabricated imports/integrations
- **Fractal documentation** — Progressive disclosure via HOT/WARM/COLD tiers
- **History tracking** — Queryable attention trajectories (v1.1+)
- **Monorepo-friendly** — Project-local first, `~/.claude/` fallback
- **Auto-restart for pylsp** — Solves Python LSP performance degradation

### Weaknesses
- **Setup complexity** — Multiple scripts, hooks, configs to install
- **Project-specific config** — Each project needs `.claude/keywords.json` tuning
- **Keyword dependency** — Relies on manual keyword mapping (no semantic embeddings)
- **Decay tuning required** — Default 0.85 decay may not fit all workflows
- **Python dependency** — Requires Python 3.8+ for scripts
- **Instance ID required** — Must set `CLAUDE_INSTANCE` env var per terminal
- **No automatic keyword generation** — You must define keywords manually

### Community Sentiment

**Strong real-world validation:** Built on production experience with massive codebase (1M+ lines) and distributed architecture (4 nodes, 8 concurrent instances).

**File-based memory approach:**
> "Instead of relying on complex vector databases and semantic search, Anthropic opted for a transparent, file-based approach with Memory stored in simple Markdown files named CLAUDE.md." — [DEV Community: The Architecture of Persistent Memory for Claude Code](https://dev.to/suede/the-architecture-of-persistent-memory-for-claude-code-17d)

**Community need:**
> "Claude Code is powerful but stateless. Every new instance rediscovers your codebase from scratch, hallucinates integrations that don't exist, repeats debugging you already tried, and burns tokens re-reading unchanged files. With large codebases (50k+ lines), this becomes painful fast." — [README](https://github.com/GMaN1911/claude-cognitive)

**Developer testimonials (DEV Community):**
> "Every 10 extractions (or when active memories exceed 80), Haiku reviews all memories grouped by type, identifying overlapping entries to merge, outdated entries to drop, and contradictions to resolve—functioning as garbage collection for knowledge." — [Article on persistent memory architecture](https://dev.to/suede/the-architecture-of-persistent-memory-for-claude-code-17d)

**Enterprise interest:** Contact email for custom implementations suggests commercial usage.

### Compared To

**vs. [MCP Memory Service](mcp-memory-service.md)** — MCP Memory is general-purpose persistent memory. Claude Cognitive is Claude Code-specific with attention dynamics and multi-instance coordination.

**vs. [claude-mem](claude-mem.md)** — claude-mem focuses on long-term factual memory. Claude Cognitive manages session context and instance coordination.

**vs. Native CLAUDE.md** — CLAUDE.md is static context. Claude Cognitive adds dynamic attention (HOT/WARM/COLD) and multi-instance state.

**vs. [Context7](../context/context7.md)** — Context7 uses embeddings for codebase search. Claude Cognitive uses keyword-based attention routing. Complementary approaches.

## Our Usage

**Status: Watching.** Not chosen yet because we're evaluating whether the complexity justifies the token savings for our current workflow.

**Why we're interested:**
- **Token savings (64-95%)** — Massive reduction in API costs
- **Multi-instance coordination** — Perfect for Ralph (Mac Mini) running multiple sessions
- **History tracking** — Queryable attention trajectories align with our /harvest vision
- **Production-validated** — Real-world testing on 1M+ line codebase
- **Fractal docs** — HOT/WARM/COLD tiers match our progressive disclosure philosophy

**Why we haven't installed it (yet):**
- **Setup overhead** — Multiple scripts, hooks, per-project config required
- **Keyword maintenance** — Manual keyword mapping vs. our preference for zero-config
- **Uncertain ROI** — Our projects are 10-50k lines, not 1M+ (smaller benefit)
- **Native memory coming** — Anthropic is building native memory features (may obsolete this)
- **Competing priorities** — Phase 3 execution (OMC) higher priority than memory optimization

**Re-evaluate if:**
- Client projects grow beyond 50k lines (where token costs become painful)
- We run 8+ concurrent instances on Ralph (multi-instance coordination critical)
- Native Claude memory proves insufficient for our use case
- We build a "memory as a service" offering requiring attention history

**Installation pattern (if we adopt it):**
```bash
# On Ralph (Mac Mini)
cd ~
git clone https://github.com/GMaN1911/claude-cognitive.git .claude-cognitive
cp -r .claude-cognitive/scripts ~/.claude/scripts/
cat .claude-cognitive/hooks-config.json >> ~/.claude/settings.json

# Per project (e.g., Fractional First)
cd ~/fractional-first/talentflow
mkdir -p .claude/{systems,modules,integrations,pool}
cp -r ~/.claude-cognitive/templates/* .claude/

# Create .claude/keywords.json
{
  "keywords": {
    ".claude/systems/talentflow.md": ["talentflow", "talent", "pipeline"],
    ".claude/modules/auth.md": ["auth", "authentication", "login", "session"]
  },
  "co_activation": {
    ".claude/systems/talentflow.md": [".claude/modules/pipeline.md"]
  },
  "pinned": [".claude/CLAUDE.md"]
}

# Set instance ID
export CLAUDE_INSTANCE=A  # in ~/.bashrc

# Test
claude
# First message should show: "ATTENTION STATE [Turn 1]" with HOT/WARM/COLD counts
```

**Hybrid approach (likely):**
- Use for large projects (Fractional First Talentflow, E-America)
- Skip for small projects (16insecurities, Kangaroo Hook)
- Combine with [cclsp](../context/cclsp.md) for semantic + keyword-based routing

## Sources

- [GitHub Repository](https://github.com/GMaN1911/claude-cognitive)
- [DEV Community: The Architecture of Persistent Memory for Claude Code](https://dev.to/suede/the-architecture-of-persistent-memory-for-claude-code-17d)
- [Claude Code Session Memory Guide](https://claudefa.st/blog/guide/mechanics/session-memory)
- [Mintlify: How Claude's memory and MCP work](https://www.mintlify.com/blog/how-claudes-memory-and-mcp-work)

---
*Last reviewed: 2026-02-07*
