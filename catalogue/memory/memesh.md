# MeMesh (formerly Claude Code Buddy)

| Field | Value |
|-------|-------|
| GitHub | [PCIRCLE-AI/claude-code-buddy](https://github.com/PCIRCLE-AI/claude-code-buddy) |
| Stars | 59 (was 162 as CCB before rename) |
| Last Commit | 2026-02-06 |
| Install | `npm install -g @pcircle/memesh` |
| Status | Evaluated |
| Category | memory |
| Holy Grail Phase | Supporting |

## What It Does

MeMesh (formerly Claude Code Buddy) is an MCP server that adds persistent project memory, smart task routing, and intelligent model selection to Claude Code. It eliminates repetitive context re-explanation across sessions by building a knowledge graph of your project's architecture, design decisions, and code changes. Each project gets isolated memory, and the system automatically recalls relevant context when you ask questions or work on related tasks.

## How It Works

**Installation:**
```bash
# Global install (auto-configures MCP settings)
npm install -g @pcircle/memesh

# Or via quick-install script
git clone https://github.com/PCIRCLE-AI/claude-code-buddy.git
cd claude-code-buddy
./scripts/quick-install.sh
```

Restart Claude Code completely (quit and reopen) to load the MCP server.

**Core Commands:**
- `buddy-do "task description"` — Execute any development task with memory awareness
- `buddy-remember "query"` — Search project memory (semantic + tagged)
- `buddy-help` — Show all available commands
- `buddy-secret-store "key" "value" type` — Store encrypted credentials (AES-256-GCM)
- `buddy-secret-get "key"` — Retrieve stored credentials
- `buddy-secret-list` — List all stored secrets
- `buddy-secret-delete "key"` — Remove credential

**Memory System:**
- **Knowledge graph** — Stores decisions, architecture, code changes, test results
- **Auto-tagging** — Organizes memories by topic (auth, API, UI, etc.)
- **Semantic search** — Finds relevant memories by context, not just keywords
- **Relevance scoring** — Ranks results based on session context
- **Multi-project support** — Each project gets isolated memory space (no cross-contamination)

**Auto-Memory Hooks (Session Continuity):**
When you open Claude Code, MeMesh shows:
```
🧠 MeMesh Memory Recall

  🕐 Last session: 2 hours ago (45 minutes)

  📋 What you did:
    📁 Changed 5 files in src/auth/
    ✅ Made 3 git commits
    💡 Implemented JWT refresh tokens
```

- Saves automatically every 250K tokens (~1-2 hours of work)
- Session memories kept for 30 days, then auto-cleaned
- Project memories (code changes, test results) kept for 90 days
- Currently available in Claude Code only

**What Gets Saved:**
- Files changed
- Git commits made
- Implementation learnings
- Problems encountered
- Architecture decisions
- Test results
- API design choices

**Smart Task Routing:**
Detects task type and activates appropriate mode:
```bash
You: "Review this code"
MeMesh: *Detects: code review task*
     *Activates: code review mode*
     *Applies: best practices checklist*
     *Delivers: structured review*
```

**SecretManager (Credential Storage):**
- AES-256-GCM encryption
- Local SQLite storage (never transmitted)
- API keys, tokens, passwords stored securely
- Per-project credential scoping

**Multi-Session Support (Daemon Mode):**
- First Claude Code instance becomes daemon
- Subsequent instances connect as proxies
- Shared knowledge graph across all sessions

## Evaluation

### Strengths
- **Persistent project memory** — Eliminates "re-explain architecture every session" pain
- **Auto-memory hooks** — Session continuity (shows what you did last time)
- **Knowledge graph** — Semantic search + tagging + relevance scoring
- **Multi-project isolation** — No cross-contamination between projects
- **Secure credential storage** — AES-256-GCM, local only, never transmitted
- **MCP standard integration** — 18+ MCP tools, native Claude Code support
- **Auto-configuration** — npm install auto-configures `~/.claude/mcp_settings.json`
- **Active development** — v2.6.3 released 3 days ago (as of 2026-02-07)
- **Open source** — AGPL-3.0, fully auditable
- **Local processing** — Zero external API calls, uses Claude Code subscription
- **npm audit: 0 vulnerabilities**

### Weaknesses
- **Recent rename confusion** — Was "Claude Code Buddy (CCB)", now "MeMesh" (to avoid trademark issues)
- **Star count drop** — Rename caused GitHub star reset (was 162, now 59)
- **MCP dependency** — Requires Claude Code with MCP support
- **Memory bloat risk** — 90-day retention could fill up over time (no clear pruning strategy)
- **Auto-memory hooks Claude Code only** — Session continuity doesn't work in Cursor or other clients
- **Documentation gaps** — Auto-memory hooks mentioned but not detailed in main README
- **Daemon mode unclear** — Multi-session support (daemon mode) not well-documented
- **Task routing opaque** — "Detects task type" but doesn't explain how or show routing rules
- **SecretManager trust** — Local encryption is good, but no key rotation or security audit mentioned

### Community Sentiment

**General feedback (2026):**
- **MCP Market:** [Claude Code Buddy: AI Teammate, Project Memory](https://mcpmarket.com/server/claude-code-buddy) — Listed as production MCP server for memory
- **mem0.ai blog:** ["Persistent Memory for Claude Code with Mem0 (5-Minute Setup)"](https://mem0.ai/blog/persistent-memory-for-claude-code) — Alternative memory solution, suggests demand for persistent memory
- **Competitors:** [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) (24.3K stars) and [doobidoo/mcp-memory-service](https://github.com/doobidoo/mcp-memory-service) (1,277 stars) — Multiple memory solutions emerging

**Key insight:** **Persistent memory is a recognized pain point** in Claude Code. Multiple solutions (MeMesh, claude-mem, MCP Memory Service) are competing.

**Unique to MeMesh:**
- **Auto-memory hooks** (session continuity) — None of the competitors show this
- **Task routing** — Other memory tools just store/recall; MeMesh adds "autopilot mode"
- **SecretManager** — Credential storage is unique

**Concerns:**
- **Rename confusion** — Community may not know CCB → MeMesh
- **Ecosystem fragmentation** — 3-4 memory solutions, unclear which is best
- **AGPL-3.0 license** — May deter commercial use (compared to MIT alternatives)

### Compared To

| vs. | MeMesh Advantage | Competitor Advantage |
|-----|------------------|---------------------|
| **claude-mem** (24.3K stars) | Auto-memory hooks, task routing, SecretManager | Massive community, simpler (no task routing complexity) |
| **MCP Memory Service** (1,277 stars) | Task routing, SecretManager | Focused on memory only (no feature bloat) |
| **Manual CLAUDE.md** | Auto-memory hooks, semantic search | Zero dependencies, Git-based, human-readable |

**When to use MeMesh:**
- You want **automated session continuity** (see what you did last session)
- You need **smart task routing** (auto-detect code review vs. API dev)
- You want **credential storage** (SecretManager for API keys)
- You trust **MCP server architecture** (background process per session)

**When NOT to use:**
- You prefer **simple memory** (just store/recall, no task routing)
- You want **Git-based memory** (CLAUDE.md + knowledge/ folder)
- You're concerned about **AGPL-3.0 license** (commercial work)
- You don't need **auto-memory hooks** (manual session notes are fine)

## Our Usage

**Status: Evaluated, Not Chosen**

**Why we're not using it:**
1. **We already have Git-based memory** — Our CLAUDE.md cascade + `knowledge/updates/` folder is working well
2. **Task routing is unclear** — We prefer explicit orchestrator pattern (Adam delegates to sub-agents) over "auto-detect task type"
3. **AGPL-3.0 license** — For client work (clients/ directory), GPL is problematic
4. **Auto-memory hooks are Claude Code only** — We may use Cursor or other clients in the future
5. **Memory bloat risk** — 90-day retention without clear pruning strategy concerns us

**Potential future use:**
- If **auto-memory hooks become multi-client** (Cursor, etc.), this becomes more valuable
- If we need **semantic search across all project memories** (our Git-based system requires manual grep)
- **SecretManager** — We store credentials in `.env` (gitignored); encrypted storage is better for sensitive keys
- If **task routing becomes transparent and configurable** (show me the rules, let me customize)

**Key takeaway:** MeMesh solves a **real problem (session continuity)** with **unique features (auto-memory hooks, task routing, SecretManager)**, but our **Git-based memory system (CLAUDE.md + knowledge/)** is **simpler, more transparent, and license-compatible** for client work. For **autonomous agents** or **solo developers**, MeMesh's automation is compelling. For our **orchestrator pattern (Adam supervises)**, it's **overkill**.

**Watch this:** If auto-memory hooks become multi-client and AGPL compatibility gets resolved (dual-license?), revisit for session continuity.

## Sources

- [README](https://github.com/PCIRCLE-AI/claude-code-buddy)
- [MCP Market: Claude Code Buddy](https://mcpmarket.com/server/claude-code-buddy)
- [Persistent Memory for Claude Code with Mem0](https://mem0.ai/blog/persistent-memory-for-claude-code)
- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)
- [doobidoo/mcp-memory-service](https://github.com/doobidoo/mcp-memory-service)

---
*Last reviewed: 2026-02-07*
