# claude-mem

| Field | Value |
|-------|-------|
| GitHub | [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) |
| Stars | 24,300 |
| Last Commit | Feb 2026 |
| Install | `/plugin` > Discover > claude-mem |
| Status | Watching |
| Category | memory |
| Holy Grail Phase | 3-Run (Supporting) |

## What It Does

Persistent long-term memory plugin for Claude Code. Auto-captures session context via 5 lifecycle hooks, compresses it with AI, and injects relevant memories into future sessions. Uses SQLite for structured storage and Chroma vector DB for semantic retrieval. Includes an "Endless Mode" beta that claims ~95% context window reduction by offloading historical context to the memory layer. Ships with a web viewer UI at localhost:37777 for browsing and managing stored memories. Hit #1 trending on GitHub within 24 hours of launch (Feb 3, 2026).

## How It Works

claude-mem hooks into 5 Claude Code lifecycle events: session start, session end, tool call, conversation turn, and idle timeout. At each hook, it extracts salient context (decisions made, files modified, errors encountered, architectural choices) and compresses it using an AI summarization pass. Compressed memories are stored in SQLite (structured metadata) and Chroma (vector embeddings for semantic search). On session start, it performs a hybrid semantic/keyword search against the memory store and injects the most relevant memories into the system prompt. The web viewer (Express server on port 37777) provides a browsable UI for inspecting, editing, and deleting memories. "Endless Mode" aggressively compresses and externalizes context to keep the active window small.

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 3 | 0.90 |
| Simplicity | 20% | 2 | 0.40 |
| Community trust | 15% | 4 | 0.60 |
| Ecosystem fit | 15% | 4 | 0.60 |
| Cost efficiency | 10% | 3 | 0.30 |
| Maturity | 10% | 1 | 0.10 |
| **Composite** | | | **2.90** |

### Strengths
- Solves the #1 community pain point — no cross-session memory in Claude Code
- Massive adoption: 24,300 stars in days, #1 trending on GitHub
- Hybrid semantic/keyword search ensures relevant memory retrieval
- Web viewer UI for browsing, inspecting, and managing memories
- 5 lifecycle hooks capture context automatically without manual effort
- "Endless Mode" beta could dramatically extend effective session length

### Weaknesses
- Heavy dependencies: SQLite + Chroma vector DB + Express server
- Runs a background process on port 37777 (resource usage, port conflicts)
- Extremely new (days old as of Feb 2026) — stability and data integrity unproven at scale
- "Endless Mode" ~95% context reduction claim is unverified by independent benchmarks
- Chroma dependency adds complexity compared to simpler file-based approaches
- No clear migration path if the project is abandoned

### Community Sentiment

Explosive positive sentiment across Reddit, Hacker News, and X/Twitter. Multiple independent users confirm it works as advertised for basic memory persistence. Comments like "game changer" and "this is what Claude Code was missing" are common. Some caution from experienced developers about the heavy dependency stack and the risk of trusting a days-old project with important context. The speed of adoption (24K stars in under a week) is unprecedented for a Claude Code plugin.

### Compared To

- **claude-brain (memvid)** — Uses a single portable video file for memory storage. Simpler architecture, no database dependencies, but less sophisticated retrieval. Better for portability, worse for semantic search.
- **claude-supermemory** — Adds team-level shared memory features. Targets collaborative workflows vs claude-mem's individual focus. Heavier infrastructure requirements.
- **Continuous-Claude-v2** — Uses a ledger-based approach (append-only markdown files) instead of a vector database. Simpler and more transparent, but less powerful search capabilities.

## Our Usage

Watching. claude-mem is the most promising memory solution in the ecosystem and would directly solve cross-session context loss in Ralph loops — currently one of our biggest pain points. The plan is to wait for the initial hype cycle to settle (2-3 weeks), monitor for stability reports and bug fixes, then evaluate on frequency-first as a test project. If it stabilizes and the dependency overhead proves manageable, it could become the chosen memory layer for all autonomous execution loops.

## Sources

- [GitHub: thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)
- [Medium: claude-mem hits #1 trending on GitHub](https://medium.com/)
- [Reddit: r/ClaudeAI discussions](https://reddit.com/r/ClaudeAI)

---
*Last reviewed: 2026-02-07*
