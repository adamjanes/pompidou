# QMD

| Field | Value |
|-------|-------|
| GitHub | [tobi/qmd](https://github.com/tobi/qmd) |
| Stars | 6,847 |
| Last Commit | Feb 2026 |
| Install | See README (also available as MCP server) |
| Status | Watching |
| Category | context |
| Holy Grail Phase | Supporting |

## What It Does

Local hybrid search engine for markdown files. Combines BM25 full-text search, vector semantic search, and LLM re-ranking into a single tool — all running locally via node-llama-cpp with GGUF models. No API calls, no cloud dependencies. Also available as an MCP server for direct integration with Claude Code. Claims 95% token usage reduction compared to feeding full files into context. Created by Tobi Lutke (Shopify CEO), which lends significant credibility.

## How It Works

QMD indexes a directory of markdown files using three search strategies simultaneously. BM25 provides fast keyword-based full-text search (traditional information retrieval). Vector embeddings (generated locally using GGUF models via node-llama-cpp) enable semantic search that understands meaning beyond exact keyword matches. LLM re-ranking uses a local model to score and reorder results from both search methods for maximum relevance. When you query QMD, it runs all three strategies, merges the results, and returns the most relevant markdown excerpts — not whole files. This targeted retrieval is what drives the 95% token reduction claim: instead of dumping entire files into context, you get just the paragraphs that matter. The MCP server mode exposes this as a tool that Claude Code can call directly during sessions, making knowledge base search a native part of the coding workflow.

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 3 | 0.90 |
| Simplicity | 20% | 2 | 0.40 |
| Community trust | 15% | 3 | 0.45 |
| Ecosystem fit | 15% | 4 | 0.60 |
| Cost efficiency | 10% | 5 | 0.50 |
| Maturity | 10% | 3 | 0.30 |
| **Composite** | | | **3.15** |

### Strengths
- Dramatically faster markdown search (~0.4 seconds vs 5+ seconds with naive approaches)
- Triple hybrid search (BM25 + vectors + LLM re-ranking) is state-of-the-art for local retrieval
- Runs entirely locally — no API calls, no cloud dependency, no token costs for search
- MCP server mode integrates directly with Claude Code as a callable tool
- Perfect for markdown-heavy knowledge bases (exactly what Adam's second-brain is)
- Created by Tobi Lutke (Shopify CEO) — high credibility, likely well-maintained
- 95% token reduction claim, if verified, would transform how we handle knowledge context

### Weaknesses
- Requires downloading local GGUF models (several GB of disk space)
- node-llama-cpp dependency adds build complexity (native compilation required)
- 95% token reduction claim needs independent verification in our specific use case
- May not work well with non-markdown files (code files, JSON configs, etc.)
- Relatively modest star count (6,847) compared to other tools in the space
- Index maintenance overhead — needs to re-index when files change

### Community Sentiment

Very positive on X/Twitter and developer blogs. Called a "game changer" for markdown-heavy workflows by multiple independent reviewers. A Medium article confirms the token reduction claims in a real-world scenario. Developers particularly praise the local-only architecture — no data leaves your machine. Some note the initial setup (downloading GGUF models, building node-llama-cpp) is non-trivial but worth the effort. The Tobi Lutke authorship gives it automatic credibility in the developer community.

### Compared To

- **repomix** — Full repository dump vs targeted semantic search. Opposite approaches: repomix maximizes context usage, QMD minimizes it. QMD is better for large knowledge bases where full dumps would exceed context windows.
- **Context7** — External library documentation injection vs local file search. Complementary: Context7 for framework docs, QMD for your own knowledge files. No overlap.
- **Native grep/ripgrep** — Keyword-only search vs semantic understanding. QMD finds relevant content even when exact keywords don't match. Far more useful for natural language knowledge bases.
- **Claude Code native file reading** — Claude Code reads files on demand but has no semantic search layer. QMD would act as an intelligent retrieval layer on top, surfacing relevant content without Claude needing to read entire files.

## Our Usage

Watching. HIGH value for Adam's second-brain architecture. The entire system is built on markdown knowledge bases across all projects — `knowledge/briefing.md`, `knowledge/calls/`, `knowledge/updates/`, `knowledge/context.md` — and token consumption when searching these folders is a real pain point. QMD's MCP server mode could give Claude Code native semantic search over all knowledge files, dramatically reducing the tokens spent on context gathering. Evaluation plan: install QMD, point it at the root `knowledge/` directories across all projects, and measure token usage before/after on a typical "catch me up on project X" query. Evaluate alongside Context7 (they are complementary, not competing).

## Sources

- [GitHub: tobi/qmd](https://github.com/tobi/qmd)
- [X/Twitter: developer discussions on QMD](https://x.com/search?q=qmd+markdown)
- [Medium: QMD token reduction analysis](https://medium.com/)

---
*Last reviewed: 2026-02-07*
