# Skill Seekers

| Field | Value |
|-------|-------|
| GitHub | [yusufkaraaslan/Skill_Seekers](https://github.com/yusufkaraaslan/Skill_Seekers) |
| Stars | 9,000 |
| Last Commit | Recent (v2.7.4) |
| Install | `pip install skill-seekers` or `uv tool install skill-seekers` |
| Status | Watching |
| Category | Execution |
| Holy Grail Phase | Phase 1 (Foundation) |

## What It Does

Converts documentation websites, GitHub repositories, and PDF files into Claude Code skills automatically. Uses AST parsing across 6 languages (Python, JS, TS, Java, C++, Go) to extract APIs, functions, classes, and methods. Detects conflicts between documented APIs and actual code implementations. Produces production-ready skill files in 20-40 minutes.

## How It Works

- Multi-source pipeline: websites, GitHub repos, PDFs (with OCR for scanned docs)
- Auto-detects llms.txt format for faster processing of LLM-ready docs
- AST parsing extracts structured API information from source code
- Conflict detection compares docs against actual implementations
- Multi-source integration combines inputs into single skills with conflict resolution
- Optional AI enhancement extracts best practices and configuration patterns
- MCP integration available as optional feature
- 1,200+ tests in the suite

## Evaluation

**Strengths:**
- Solves a real problem: turning client/library docs into usable AI context
- AST parsing is more reliable than text scraping alone
- Conflict detection catches outdated documentation
- Large community (9k stars), active development
- MIT licensed, well-tested

**Weaknesses:**
- 20-40 minute generation time is slow for iterative workflows
- Generated skills may need manual curation for quality
- Python dependency (our stack is primarily JS/TS)
- Skill quality depends heavily on source documentation quality

**Community Sentiment:** Popular and well-regarded. Fills a genuine gap in the Claude Code ecosystem.

**Compared To:** Manual skill writing (our current approach) is slower but produces more targeted results. Skill Seekers could bootstrap skills that we then refine.

## Our Usage

Watching. High potential for client projects where we need to quickly understand external APIs or frameworks. Could generate initial skills from client documentation (Supabase, Apify, etc.) that we then curate. Worth installing when we start a new client project with unfamiliar tech.

## Sources

- [GitHub README](https://github.com/yusufkaraaslan/Skill_Seekers)

Last reviewed: 2026-02-06
