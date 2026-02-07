# Context7

| Field | Value |
|-------|-------|
| GitHub | [upstash/context7](https://github.com/upstash/context7) |
| Stars | 44,850 |
| Last Commit | Feb 2026 |
| Install | `/plugin install context7@claude-plugins-official` or `claude mcp add context7 -- npx -y @upstash/context7-mcp@latest` |
| Status | Watching |
| Category | context |
| Holy Grail Phase | 3-Run (Supporting) |

## What It Does

MCP server and official Claude Code plugin that fetches real-time, version-specific library documentation and injects it directly into prompts. Auto-triggers when working with frameworks and libraries, pulling the exact docs for the version you are using. With 71,800+ installs as an official plugin on the Anthropic marketplace, it is the most-installed community plugin. Eliminates hallucinated APIs, deprecated code patterns, and version mismatches by grounding Claude in live documentation rather than training data.

## How It Works

Context7 runs as an MCP server (either via the official plugin or standalone via npx). When Claude Code encounters code referencing external libraries or frameworks, Context7 auto-detects the library and version from your project's dependency files (package.json, requirements.txt, etc.). It then fetches the corresponding documentation from its index, processes it into a concise format, and injects the relevant sections into the current prompt context. The documentation index is maintained by Upstash and covers major frameworks including Next.js, React, Supabase, Tailwind, and hundreds more. The plugin mode requires zero configuration — install it and it works automatically.

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 3 | 0.90 |
| Simplicity | 20% | 5 | 1.00 |
| Community trust | 15% | 5 | 0.75 |
| Ecosystem fit | 15% | 4 | 0.60 |
| Cost efficiency | 10% | 4 | 0.40 |
| Maturity | 10% | 4 | 0.40 |
| **Composite** | | | **4.05** |

### Strengths
- Most-installed community plugin with 71,800+ installs — proven at scale
- Backed by Upstash, a well-funded infrastructure company with a track record of maintaining open source
- Eliminates stale documentation hallucinations — the single biggest source of incorrect code suggestions
- Zero-config in plugin mode: install once, auto-triggers on all projects
- Official Anthropic marketplace listing signals quality vetting
- Supports both MCP server and plugin installation modes

### Weaknesses
- Requires internet access during coding sessions — no offline fallback
- Adds latency to context fetching (network round-trip for each doc lookup)
- Documentation coverage varies by library — less popular libraries may have gaps
- Can inject large amounts of documentation context, consuming tokens and potentially crowding out project-specific context
- Dependency on Upstash's infrastructure — if their service goes down, the plugin becomes inert

### Community Sentiment

Universally positive. Referenced in Firecrawl's "Top 10 Claude Code Plugins" list, multiple developer blogs, and the dev.to "Best way to do agentic development in 2026" article as an essential install. Developers consistently report fewer hallucinated API calls and more accurate code generation. The most common sentiment is "I don't know how I coded without this." No significant negative reports found.

### Compared To

- **Manual doc pasting** — The current approach for our projects. Works but is tedious, error-prone, and doesn't scale across sessions or agents.
- **repomix** — Packs your own repo for context, but doesn't address external library documentation. Complementary rather than competing.
- **Cursor/Windsurf built-in docs** — IDE-specific features that serve a similar purpose but are locked to those editors. Context7 is editor-agnostic via MCP.

## Our Usage

Watching but should evaluate immediately. Every project in our stack uses external frameworks (Next.js, Supabase, Tailwind, Drizzle, etc.) and would benefit from real-time documentation injection. This is a low-effort, high-value install — the plugin mode requires zero configuration. Priority evaluation: install on one active project (e.g., frequency-first or content-studio), run for a week, and measure whether hallucinated API usage decreases. If confirmed, roll out to all projects.

## Sources

- [GitHub: upstash/context7](https://github.com/upstash/context7)
- [Firecrawl Blog: Top 10 Claude Code Plugins](https://www.firecrawl.dev/blog)
- [dev.to: Best way to do agentic development in 2026](https://dev.to/)

---
*Last reviewed: 2026-02-07*
