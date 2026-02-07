# MCP Memory Service

| Field | Value |
|-------|-------|
| GitHub | [doobidoo/mcp-memory-service](https://github.com/doobidoo/mcp-memory-service) |
| Stars | 1,277 |
| Last Commit | 2026-02-06 |
| Install | `pip install mcp-memory-service` (auto-configures for Claude Desktop on macOS/Linux) |
| Status | Watching |
| Score | 3.75 |
| Category | memory |
| Holy Grail Phase | Supporting (all phases) |

## What It Does

An MCP server that automatically captures and maintains project context, architecture decisions, and code patterns across AI sessions. Eliminates the need to re-explain your project every time you start a new chat. Works with Claude Desktop, VS Code, Cursor, and 13+ AI tools via the Model Context Protocol.

## How It Works

**Installation:**
```bash
pip install mcp-memory-service
# Auto-configures for Claude Desktop (macOS/Linux)
```

**Memory System:**
- **Natural Memory Triggers** — AI-based detection (85%+ accuracy) of what to remember
- **Context-Provider patterns** — Rule-based triggers (100% guaranteed coverage)
- **Dream-inspired consolidation** — Decay scoring, association discovery, compression, archival
- **24/7 automatic scheduling** — Daily/weekly/monthly consolidation via HTTP server

**Storage:**
- Token-efficient Code Execution API (90% token reduction vs MCP tools)
- Hybrid backend for 2,495 memories
- SHODH Unified Memory API v1.0.0 compliant (interoperability across ecosystem)

**Integration:**
- Works with Claude Desktop, VS Code, Cursor, Windsurf, Continue, Zed, and more
- MCP protocol — no custom client code needed
- Optional: `claude-memory-context` utility to sync memories into CLAUDE.md

**Key Features:**
- Persistent memory across sessions
- Automatic capture (no manual saving)
- Association discovery (links related memories)
- Decay scoring (prunes stale memories)
- HTTP server for scheduled consolidation
- SHODH API compliant (full fidelity preservation)

## Evaluation

### Strengths
- **Solves re-explaining problem** — Core pain point for autonomous dev
- **Active development** — Last commit Feb 6, 2026 (yesterday)
- **MCP-native** — Works with 13+ tools, no custom integration per client
- **Hybrid approach** — AI triggers + rule-based = high coverage + reliability
- **Token-efficient** — 90% reduction vs standard MCP tools
- **SHODH compliant** — Interoperable memory format
- **Automatic consolidation** — Dream-inspired decay + archival
- **HTTP server** — Enables scheduled background jobs
- **Well-documented** — Wiki, FAQ, releases, examples

### Weaknesses
- **Python dependency** — Adds runtime to our Node/Bash stack
- **HTTP server for scheduling** — Requires always-on process for full features
- **Not git-native** — Memories stored in service, not markdown in repo
- **MCP-only** — Requires MCP-compatible client (Claude Desktop, Cursor, etc.)
- **No direct Claude Code integration yet** — Works via Claude Desktop, not CLI
- **Memory persistence unclear** — Where are 2,495 memories stored? Disk? DB?
- **SHODH dependency** — Locked into SHODH ecosystem for full features

### Community Sentiment

From web search:
- **1,277 stars** — Strong traction for a memory service
- **Listed on Glama.ai MCP directory** — [Link](https://glama.ai/mcp/servers/@doobidoo/mcp-memory-service)
- **MCP Server Finder** — Featured in MCP discovery tools
- **Wiki + FAQ** — Comprehensive documentation suggests active user base
- **Related project:** `claude-memory-context` — Utility to sync memories to CLAUDE.md (git-native bridge)
- **Related project:** `n8n-claude-memory-agent` — N8N workflow integration
- **No user reviews found** — Search results mostly documentation, no Reddit/HN discussions

### Compared To

- **claude-mem** (Watching) — 24,300 stars, CLI-based, simpler approach. **claude-mem is more popular.**
- **Cipher** (Watching) — 3,502 stars, focused on encrypted memories.
- **CLAUDE.md cascade** — Our current approach: context files walk up directory tree.
- **Native context** — Claude Code's built-in CLAUDE.md + project instructions.

**Differentiation:** MCP Memory Service is **automatic** (no manual CLAUDE.md updates) and **cross-tool** (works with Cursor, VS Code, Claude Desktop). But it's **not git-native** (memories in service, not repo) and **requires Python + HTTP server** for full features.

## Our Usage

**Status: Watching**

**Why not chosen (yet):**
1. **Not Claude Code CLI compatible** — Works with Claude Desktop, not `claude` CLI for Ralph loops
2. **Not git-native** — Memories stored in service, not markdown we can commit/review
3. **CLAUDE.md cascade works** — Our current approach (project → client → root CLAUDE.md) is sufficient
4. **Adds Python dependency** — Our stack is Node/Bash; Python adds complexity
5. **HTTP server overhead** — Requires always-on process for scheduling

**Why we're watching:**
1. **Active development** — Feb 6, 2026 commit (same day as evaluation)
2. **Solves re-explaining problem** — Core pain point for autonomous loops
3. **MCP-native** — If Claude Code CLI adds MCP support, this becomes viable
4. **claude-memory-context bridge** — Could sync memories → CLAUDE.md (git-native)
5. **Automatic capture** — Less manual than updating CLAUDE.md after each session
6. **Token-efficient** — 90% reduction is compelling for long-running Ralph loops

**When we'd choose it:**
- If Claude Code CLI adds MCP server support (check Anthropic roadmap)
- If we build a bridge: MCP Memory Service → CLAUDE.md sync (via `claude-memory-context`)
- If autonomous Ralph loops exceed context limits and need aggressive memory pruning
- If we expand to multi-tool workflows (Claude Code + Cursor + VS Code)

**Experiment idea:**
1. Install MCP Memory Service on Ralph (Mac Mini)
2. Use Claude Desktop to capture memories during manual sessions
3. Use `claude-memory-context` to sync memories → CLAUDE.md before Ralph runs
4. Measure: Does it reduce re-explaining time? Does it improve task success rate?

**Score Breakdown (max 5.00):**
- Holy Grail alignment (30%): 4.0 — Supports all phases by maintaining context, but doesn't directly execute
- Simplicity (20%): 3.5 — `pip install`, auto-config, but HTTP server + Python stack
- Community trust (15%): 3.5 — 1,277 stars, active dev, well-documented
- Ecosystem fit (15%): 3.5 — MCP-native, but not Claude Code CLI compatible yet
- Cost efficiency (10%): 4.5 — 90% token reduction is huge for long sessions
- Maturity (10%): 4.0 — SHODH v1.0.0 compliant, wiki/FAQ, but relatively new

**Weighted Score:** (4.0×0.30) + (3.5×0.20) + (3.5×0.15) + (3.5×0.15) + (4.5×0.10) + (4.0×0.10) = **3.75**

## Sources

- [GitHub: doobidoo/mcp-memory-service](https://github.com/doobidoo/mcp-memory-service)
- [Glama: MCP Memory Service by doobidoo](https://glama.ai/mcp/servers/@doobidoo/mcp-memory-service)
- [MCP Server Finder: mcp-memory-service](https://www.mcpserverfinder.com/servers/doobidoo/mcp-memory-service)
- [MCP.so: MCP Memory Service MCP Server](https://mcp.so/server/mcp-memory-service/doobidoo)
- [GitHub: doobidoo/claude-memory-context](https://github.com/doobidoo/claude-memory-context)
- [GitHub: doobidoo/n8n-claude-memory-agent](https://github.com/doobidoo/n8n-claude-memory-agent)

---
*Last reviewed: 2026-02-07*
