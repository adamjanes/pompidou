# claude-context-local

| Field | Value |
|-------|-------|
| GitHub | [FarhanAliRaza/claude-context-local](https://github.com/FarhanAliRaza/claude-context-local) |
| Stars | 184 |
| Last Commit | 2026-02-06 |
| Install | `curl -fsSL https://raw.githubusercontent.com/FarhanAliRaza/claude-context-local/main/scripts/install.sh \| bash` |
| Status | Watching |
| Category | context |
| Holy Grail Phase | Supporting |

## What It Does

Semantic code search MCP for Claude Code that runs 100% locally using Google's EmbeddingGemma (768-dim embeddings) with advanced multi-language chunking (AST for Python, tree-sitter for JS/TS/Go/Java/Rust/C/C++/C#) and FAISS indexing. Makes entire codebase searchable by meaning, not strings, with zero API costs and complete privacy.

## How It Works

Install via one-liner (downloads uv, clones repo to ~/.local/share/claude-context-local, downloads EmbeddingGemma model ~1.2-1.3 GB, sets up Python venv). Register MCP server:

```bash
claude mcp add code-search --scope user -- uv run --directory ~/.local/share/claude-context-local python mcp_server/server.py
```

**Workflow**: Open Claude Code → say "index this codebase" (no manual commands) → interact via chat (no function calls needed).

**Architecture**:
- **Chunking**: Multi-language chunker extracts functions/classes/types/enums/namespaces across 15 file extensions (9+ languages)
- **Embedding**: EmbeddingGemma with device=auto (CUDA → MPS → CPU), offline cache
- **Indexing**: FAISS (CPU by default, GPU if NVIDIA detected), Merkle DAG for incremental updates
- **Search**: Intelligent ranking + filters, natural language queries
- **Storage**: ~/.claude_code_search (models, index/, metadata.db SQLite)

**Rich metadata**: File paths, folder structure, semantic tags, function/class names, relationships, line numbers, language-specific features (async, generics, modifiers).

**Incremental updates**: Merkle-driven change detection (re-index only changed files).

Supported languages: Python (.py), JavaScript (.js, .jsx), TypeScript (.ts, .tsx), Java (.java), Go (.go), Rust (.rs), C (.c), C++ (.cpp, .cc, .cxx, .c++), C# (.cs), Svelte (.svelte) — **15 extensions, 9+ languages**.

## Evaluation

### Strengths
- 100% local (no API keys, zero costs, complete privacy)
- Advanced chunking (AST + tree-sitter for 9+ languages)
- Semantic search by meaning (natural language queries)
- Rich metadata (functions, classes, relationships, line numbers)
- Incremental indexing (Merkle DAG change detection)
- FAISS GPU support (auto-detected, faster search on large codebases)
- One-liner installer (uv, model, venv all automated)
- Active development (updated Feb 6, 2026)
- Good documentation (architecture, troubleshooting, performance tips)
- Ignore common noise directories (node_modules, .venv, build, dist, etc.)
- GPL-3.0 license (free, copyleft)

### Weaknesses
- Heavy dependencies (Python 3.12+, uv, EmbeddingGemma model ~1.2GB, FAISS)
- Slow first index on large repos (model load + chunk + embed + index)
- Overlaps with native `rg` (ripgrep) for known string searches
- Requires Hugging Face authentication (model download, one-time setup)
- Python-only implementation (not Rust/Go for speed)
- No cross-repo search (per-codebase index)
- Beta release (core works but benchmarks TBD)
- SQLite metadata.db (vs in-memory for ultra-fast queries)

### Community Sentiment

Featured on [Hacker News](https://news.ycombinator.com/item?id=45162595): "Show HN: Claude Context but local – semantic code search without API keys" — positive reception for privacy-first approach.

[Medium: "Semantic Code Search in Claude Code: The Missing Feature"](https://medium.com/@jldavern/semantic-code-search-in-claude-code-the-missing-feature-32b22d62f6a2) highlights pain point this solves.

[Local RAG Guide](https://www.arsturn.com/blog/local-rag-claude-code-semantic-search-guide) positions claude-context-local as answer to "how do I avoid sending my entire codebase to OpenAI?"

Listed on mcpmarket.com, Glama, PulseMCP as "Private & Local Semantic Code Search."

Community compares favorably to [zilliztech/claude-context](https://github.com/zilliztech/claude-context) (original):

| Feature | claude-context-local | zilliztech/claude-context |
|---------|---------------------|--------------------------|
| Embeddings | Local (EmbeddingGemma) | OpenAI API (costs money) |
| Vector storage | Local (FAISS) | Zilliz Cloud (costs money) |
| Privacy | 100% local | Code sent to OpenAI + Zilliz |
| Cost | Zero (one-time disk/compute) | Per-query API costs |

Users appreciate "inspired by zilliztech but fully local" approach.

### Compared To

- **zilliztech/claude-context**: OpenAI embeddings + Zilliz Cloud vs local EmbeddingGemma + FAISS. Local wins for privacy/cost.
- **ripgrep (rg)**: String search vs semantic search. rg faster for known strings, context-local better for "find authentication code."
- **Context7**: Codebase context tool (watching, 4.05 score) — different approach (static analysis vs embeddings).
- **repomix**: Codebase packaging tool (watching, 3.05 score) — focuses on LLM context prep, not search.

## Our Usage

**Watching** — Valuable for large codebases (50k+ lines) where semantic search outperforms string search, but not essential yet. Adam's workflow:
- `rg` for known strings (fast, lightweight)
- `knowledge/` for project context (markdown files)
- Claude Code native context (read files as needed)

**When to revisit**:
- If Adam inherits large unfamiliar codebase (e-america-frontend ~30k lines?)
- If "find all authentication logic" queries become frequent
- If onboarding new contributors (semantic search aids discovery)

**Blockers**:
- Heavy setup (Python 3.12+, uv, 1.2GB model, FAISS)
- Overlaps with `rg` + native Read tool for most queries
- First index slow on large repos (model load + chunk + embed)
- Beta status (benchmarks TBD, may have bugs)
- No integration with OpenSpec/Beads/OMC (standalone search tool)

**Decision**: Defer until codebase size or complexity makes semantic search necessary. For now, `rg` + `knowledge/` + native Read cover 95% of use cases.

**Potential use case**: Index e-america-frontend (React + TypeScript) to help Claude Code find component relationships without reading entire codebase.

**Score**: 3.60/5.00
- Holy Grail alignment (30%): 0.75 — Aids discovery but not a core phase tool
- Simplicity (20%): 0.60 — One-liner install but heavy dependencies (Python, model, FAISS)
- Community trust (15%): 0.60 — 184 stars, featured on HN/Medium/MCP directories, beta status
- Ecosystem fit (15%): 0.55 — MCP integration with Claude Code but no pipeline integration
- Cost efficiency (10%): 0.60 — Zero API costs but disk (1.2GB) + compute (model inference) overhead
- Maturity (10%): 0.50 — Beta release, core works, benchmarks TBD

## Sources

- [GitHub - FarhanAliRaza/claude-context-local](https://github.com/FarhanAliRaza/claude-context-local)
- [GitHub - zilliztech/claude-context (original)](https://github.com/zilliztech/claude-context)
- [Show HN: Claude Context but local - Hacker News](https://news.ycombinator.com/item?id=45162595)
- [Semantic Code Search in Claude Code: The Missing Feature - Medium](https://medium.com/@jldavern/semantic-code-search-in-claude-code-the-missing-feature-32b22d62f6a2)
- [Local RAG Guide: Semantic Search for Code with Claude Code](https://www.arsturn.com/blog/local-rag-claude-code-semantic-search-guide)
- [Claude Context Local on mcpmarket.com](https://mcpmarket.com/server/claude-context-local)
- [Claude Context Local on Glama](https://glama.ai/mcp/servers/@FarhanAliRaza/claude-context-local)

---
*Last reviewed: 2026-02-07*
