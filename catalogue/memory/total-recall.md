# Total Recall

| Field | Value |
|-------|-------|
| GitHub | [davegoldblatt/total-recall](https://github.com/davegoldblatt/total-recall) |
| Stars | 21 |
| Last Commit | 2026-02-07 |
| Install | `/plugin marketplace add davegoldblatt/recall-marketplace` then `/plugin install recall@recall-marketplace` |
| Status | Watching |
| Category | memory |
| Holy Grail Phase | Supporting |

## What It Does

Curated persistent memory for Claude Code with a write gate that filters aggressively. Instead of auto-ingesting everything into context, Total Recall asks "Does this change future behavior?" before saving. Captures to daily logs first, promotes to long-term registers only when user approves. Result: lean, trustworthy memory (~1500 words) that doesn't bloat context windows.

## How It Works

**Four-tier architecture:**

| Tier | What | How It Loads |
|------|------|-------------|
| Working Memory | `CLAUDE.local.md` (~1500 words) | Auto-loaded by Claude Code |
| Registers | `memory/registers/*.md` (structured domain knowledge) | On demand (searched when relevant) |
| Daily Logs | `memory/daily/YYYY-MM-DD.md` (timestamped raw capture) | Checked on session start |
| Archive | `memory/archive/` (completed/superseded items) | On search |

**The Write Gate (five-point filter):**
1. Does it change future behavior? (preference, boundary, recurring pattern)
2. Is it a commitment with consequences? (deadline, deliverable, follow-up)
3. Is it a decision with rationale? (why X over Y)
4. Is it a stable fact that will matter again? (not transient)
5. Did the user explicitly say "remember this"?

If none are true, it doesn't get saved.

**Protocol lives in `.claude/rules/total-recall.md`** (auto-loads every session via native Claude Code mechanism).

**Commands** (namespaced for plugin, bare for standalone):
- `/recall-write <note>` - Write with gate evaluation
- `/recall-log <note>` - Quick append (no gate)
- `/recall-search <query>` - Search all tiers
- `/recall-promote` - Review daily logs, promote to registers
- `/recall-status` - Health check
- `/recall-maintain` - Verify stale entries, prune, clean up
- `/recall-forget <query>` - Mark as superseded
- `/recall-context` - Show loaded memory

**Hooks:**
- SessionStart: Injects open loops + recent highlights
- PreCompact: Writes timestamp marker to daily log (not injected to model)

**Correction Protocol:** Human corrections get highest priority. One correction triggers writes to daily log + register + working memory.

## Evaluation

### Strengths
- **Write gate prevents noise**: Most memory tools save too much; Total Recall filters aggressively
- **Daily log first**: Prevents premature solidification of inferences
- **Deterministic loading**: Uses native Claude Code mechanisms (rules auto-load, CLAUDE.local.md auto-loads)
- **Metadata-rich registers**: Confidence, evidence, last_verified for each claim
- **Contradiction protocol**: Old claims marked `[superseded]` with date/reason, pattern of change preserved
- **Local only, no network calls, no telemetry**
- **No transcript parsing**: Hooks never read conversation history (complies with Anthropic directory policy)
- **Plain markdown**: Fully inspectable, git-friendly
- **Team mode**: Selective gitignore allows shared registers while keeping personal notes local
- **Works with Superpowers**: Complementary (Superpowers = methodology, Total Recall = persistence)

### Weaknesses
- Very young project (created Feb 2026, 21 stars)
- No automated tests
- Correction gate relies on user explicitly saying "that's wrong" vs Claude detecting its own errors
- ~1500 word working memory limit may be too small for complex projects
- Promotion workflow (`/recall-promote`) is manual — no AI assistance to suggest what's worth promoting
- Recall Nudges (off by default) feel awkward if they fire mid-session

### Community Sentiment

Found positive Medium article ([Claude Code Deep Dive - Total Recall](https://medium.com/@the.gigi/claude-code-deep-dive-total-recall-cb0317d67669)) and Hacker News discussion ([Show HN: Total Recall – write-gated memory for Claude Code](https://news.ycombinator.com/item?id=46907183)). Community recognizes the "auto-ingest everything" problem in other memory tools ([claude-mem](https://yuv.ai/blog/claude-mem), [Claude Supermemory](https://medium.com/coding-nexus/claude-supermemory-the-plugin-that-gives-claude-code-long-term-memory-6b02cff2bef0)). Total Recall explicitly positions itself as the opposite: filter first, save second.

### Compared To

- **vs claude-mem**: claude-mem auto-captures everything with AI compression; Total Recall uses write gate + manual promotion
- **vs MCP Memory Service**: MCP Memory stores K/V pairs; Total Recall has tiered markdown files
- **vs Claude Supermemory**: Supermemory auto-saves; Total Recall gates writes
- **vs native CLAUDE.md**: CLAUDE.md is static project context; Total Recall is dynamic session memory

**Position**: Only write-gated memory system in catalogue. Opinionated: "memory that doesn't change future behavior shouldn't exist."

## Our Usage

**Watching** — not installed yet.

**Why not chosen yet:**
- Very new (2 days old), needs time to mature
- Need to see community adoption and real-world usage patterns
- Unclear if ~1500 word working memory limit works for Adam's multi-project setup
- Manual promotion workflow (`/recall-promote`) may be too high-touch for autonomous system

**Why we're watching:**
- Write gate philosophy aligns with Adam's "signal vs noise" preference
- Deterministic loading via native Claude Code mechanisms (rules + CLAUDE.local.md)
- No transcript parsing keeps privacy clean
- Plain markdown fits our git-native workflow
- Could replace manual knowledge/updates/ workflow with structured memory

**How we'd use it if we adopt:**
1. **Per-project memory**: One Total Recall instance per client/project directory
2. **Daily logs as session summaries**: Replace manual `knowledge/updates/YYYY-MM-DD-*.md` files
3. **Registers for project-specific decisions**: Architecture decisions, tech stack choices, team preferences
4. **Working memory for project status**: Current sprint, blockers, next steps
5. **Archive for completed work**: Old features, resolved issues

**Evaluation criteria before adopting:**
- 100+ stars and active community discussion
- At least 1-2 blog posts from users showing real-world workflows
- Test coverage added
- `/recall-promote` gets AI-assisted suggestions (not just user review)

## Sources

- [README](https://github.com/davegoldblatt/total-recall)
- [Claude Code Deep Dive - Total Recall](https://medium.com/@the.gigi/claude-code-deep-dive-total-recall-cb0317d67669)
- [Show HN: Total Recall](https://news.ycombinator.com/item?id=46907183)
- [Claude-Mem: Persistent Memory for Claude Code](https://yuv.ai/blog/claude-mem)
- [Claude Supermemory Plugin](https://medium.com/coding-nexus/claude-supermemory-the-plugin-that-gives-claude-code-long-term-memory-6b02cff2bef0)

---
*Last reviewed: 2026-02-07*
