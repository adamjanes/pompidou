# claude-historian-mcp

| Field | Value |
|-------|-------|
| GitHub | [Vvkmnn/claude-historian-mcp](https://github.com/Vvkmnn/claude-historian-mcp) |
| Stars | 217 |
| Last Commit | 2026-02-06 |
| Install | `claude mcp add claude-historian-mcp -- npx claude-historian-mcp` |
| Status | Watching |
| Category | memory |
| Holy Grail Phase | Supporting |

## What It Does

An MCP server that gives Claude Code fast search across conversation history (~/.claude/conversations/) to find past solutions, track file changes, retrieve error fixes, and learn from tool usage patterns. Zero persistent storage (reads .jsonl files on-demand), runs locally with no API costs.

## How It Works

Install via `claude mcp add` and restart Claude Code. The MCP provides 8 tools:

1. **search_conversations** — Find past solutions, discussions, context by query
2. **find_file_context** — Track modifications/edits for specific files across sessions
3. **get_error_solutions** — Retrieve how you resolved similar errors before
4. **find_similar_queries** — Discover related questions and answers
5. **list_recent_sessions** — Browse recent sessions with project context
6. **find_tool_patterns** — Learn successful tool usage workflows (e.g., "Read → Edit → Bash")
7. **search_plans** — Search plan files for past implementation approaches
8. **extract_compact_summary** — Get concise summary of session accomplishments

**Under the hood**:
- **JSON streaming parser**: Reads .jsonl files on-demand without full deserialization
- **LRU caching**: In-memory cache with intelligent eviction for frequently accessed conversations
- **TF-IDF inspired scoring**: Term frequency + document frequency weighting for relevance
- **Query classification**: Naive Bayes-style (error/implementation/analysis/general) with adaptive limits
- **Edit distance**: Fuzzy matching for technical terms and typos
- **Exponential time decay**: Recent messages weighted higher
- **Parallel file processing**: Concurrent project scanning with early termination (0.8s response times)
- **Workflow pattern recognition**: Detects tool sequences like "Edit → Read → Bash"
- **Content-aware truncation**: Never truncates mid-function or mid-error
- **Technical content prioritization**: Code blocks, errors, file paths get full preservation

Performance: 4.7/5 average score across 8 tools (v1.0.4). Latest: fixed word matching bug (+1.0 point relevance improvement).

## Evaluation

### Strengths
- Zero API costs (local-only)
- Fast (<1s typical response)
- No persistent storage or indexing (reads .jsonl on-demand)
- Comprehensive search capabilities (8 tools covering errors, files, patterns, sessions)
- Sophisticated search algorithms (TF-IDF, query classification, fuzzy matching, time decay)
- Intelligent truncation (preserves semantic boundaries)
- Active development (updated Feb 6, 2026)
- Featured in mcpmarket.com, LobeHub, playbooks.com
- Strong documentation (PERF.md with benchmarks and quality scores)
- TypeScript strict mode + MCP protocol standards
- Git hooks (pre-commit: format/lint, pre-push: validation)

### Weaknesses
- Requires Node.js >=20.0.0
- Only works with Claude Code (not Claude Desktop — server-side conversations)
- Overlaps with native `grep` + file-based knowledge/ updates
- Performance degrades with very large conversation histories (100+ projects)
- No cross-project insights (searches per-project .jsonl files)
- Renamed from claude-historian to claude-historian-mcp (migration confusion)

### Community Sentiment

Positive reception on mcpmarket.com: "AI Code Conversation History Search for Claude" — users appreciate fast local search without API costs.

[PERF.md](https://github.com/Vvkmnn/claude-historian-mcp/blob/master/PERF.md) shows transparency with benchmarks and quality scores (4.7/5 average). Recent bug fix (v1.0.4) for word matching (e.g., "react" vs "ReAct") demonstrates active maintenance.

Community compares favorably to [claude-mem](https://github.com/thedotmack/claude-mem) (SQLite + always-on context loading):

| Feature | claude-historian-mcp | claude-mem |
|---------|---------------------|------------|
| Setup | One command | Plugin install + database |
| Session startup | Instant | Loads 5-8k tokens every session |
| First response | Immediate | Processes context before responding |
| Token cost | 0 (only when queried) | 5-8k per session always |
| Storage | None (reads .jsonl) | SQLite database + migrations |

Real-world testing (270+ sessions): 95% never query history → claude-historian-mcp saves 98% tokens (0 vs 475k wasted).

### Compared To

- **claude-mem**: Always-on context (5-8k tokens/session) vs on-demand search (0 tokens unless queried). claude-historian-mcp wins for occasional history lookups.
- **grep + knowledge/updates/**: Native file search vs semantic search with ranking. Historian adds query classification, fuzzy matching, pattern detection.
- **Native Claude Code history**: No built-in search across sessions. Historian fills this gap.
- **External tools** (Elasticsearch, Meilisearch): Over-engineered for local .jsonl files. Historian optimized for Claude Code's storage format.

## Our Usage

**Watching** — Valuable for large codebases with long conversation histories but not essential yet. Adam's workflow already uses:
- `knowledge/updates/` for manual session summaries
- `rg` for searching code/docs
- `grep` for conversation file exploration

**When to revisit**:
- If Adam accumulates 50+ Claude Code sessions and needs to recall old solutions
- If error patterns repeat across projects (cross-project learning)
- If tool usage patterns need optimization (e.g., "how often do I use Edit → Bash?")

**Blockers**:
- Overlaps with file-based `knowledge/updates/` workflow
- Adam currently reviews sessions manually (no need for automated retrieval yet)
- Most valuable with 100+ sessions (Adam has ~10-20 meaningful sessions so far)

**Decision**: Defer until conversation history grows. Install when Adam says "I know I solved this before but can't remember which session."

**Score**: 3.65/5.00
- Holy Grail alignment (30%): 0.80 — Supports learning from past work (Phase 5: Repeat It) but not core
- Simplicity (20%): 0.75 — One-line MCP install, zero config, 8 tools to learn
- Community trust (15%): 0.60 — 217 stars, featured in MCP directories, transparent benchmarks
- Ecosystem fit (15%): 0.50 — Works standalone, no integration with OpenSpec/Beads/OMC
- Cost efficiency (10%): 0.50 — Zero API costs but requires Node.js runtime + LRU cache memory
- Maturity (10%): 0.50 — Stable (v1.0.4) but recent rename causes migration confusion

## Sources

- [GitHub - Vvkmnn/claude-historian-mcp](https://github.com/Vvkmnn/claude-historian-mcp)
- [PERF.md - Benchmarks and Quality Scores](https://github.com/Vvkmnn/claude-historian-mcp/blob/master/PERF.md)
- [Historian on mcpmarket.com](https://mcpmarket.com/server/historian)
- [LobeHub MCP Server](https://lobehub.com/mcp/vvkmnn-claude-historian-mcp)
- [Playbooks MCP Server](https://playbooks.com/mcp/vvkmnn/claude-historian-mcp)

---
*Last reviewed: 2026-02-07*
