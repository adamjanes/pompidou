# repomix

| Field | Value |
|-------|-------|
| GitHub | [yamadashy/repomix](https://github.com/yamadashy/repomix) |
| Stars | 21,700 |
| Last Commit | Feb 2026 |
| Install | `npx repomix` or official Claude Code plugin |
| Status | Watching |
| Category | context |
| Holy Grail Phase | Supporting |

## What It Does

Packs an entire repository into a single AI-friendly file optimized for feeding to LLMs. Works with Claude, ChatGPT, DeepSeek, Gemini, and other models. Processes your codebase by respecting .gitignore rules, removing binary files, and formatting the output with clear file boundaries and token counts. Also available as an official Claude Code plugin for direct integration. Widely adopted as a standard tool for sharing full project context with AI assistants.

## How It Works

Run `npx repomix` in any repository and it generates a single output file (default: `repomix-output.txt`) containing your entire codebase in a structured format. Each file is wrapped with clear delimiters showing the file path, and the output includes a table of contents and token count summary. Configuration is handled via a `repomix.config.json` file where you can specify include/exclude patterns, output format (plain text, XML, or markdown), and token counting model. The plugin mode integrates directly into Claude Code, allowing you to reference repomix output within sessions. repomix also supports remote repositories — pass a GitHub URL and it clones, packs, and outputs without needing a local checkout.

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 2 | 0.60 |
| Simplicity | 20% | 4 | 0.80 |
| Community trust | 15% | 4 | 0.60 |
| Ecosystem fit | 15% | 3 | 0.45 |
| Cost efficiency | 10% | 2 | 0.20 |
| Maturity | 10% | 4 | 0.40 |
| **Composite** | | | **3.05** |

### Strengths
- Massive adoption (21,700 stars) — battle-tested across thousands of workflows
- Simple concept that just works — one command, one output file
- Cross-model compatible — not locked to any specific LLM provider
- Official Claude Code plugin provides native integration
- Remote repo support (pack any GitHub repo without cloning)
- Respects .gitignore and supports custom exclude patterns to avoid bloating output
- Multiple output formats (plain text, XML, markdown) for different use cases

### Weaknesses
- Token-heavy approach — dumps the full repo into context, which can exhaust the window on large codebases
- Doesn't solve token efficiency — it is packaging, not intelligent retrieval
- Less useful for large codebases where context window is already tight
- Static snapshot — doesn't update as files change during a session
- No semantic understanding — includes everything matching the patterns, not just what is relevant to the current task

### Community Sentiment

Widely referenced across developer communities as a standard tool. Appears in multiple "awesome-claude-code" lists and plugin recommendation threads. Developers primarily use it for initial project onboarding (sharing full context with a new AI session) and cross-model workflows (packing a repo to paste into ChatGPT or Gemini). Some criticism that it encourages "dump everything" approaches rather than targeted context management.

### Compared To

- **Context7** — Dynamic, real-time documentation injection for external libraries vs repomix's static, full-repo dump. Complementary tools serving different purposes: Context7 for library docs, repomix for project code.
- **QMD** — Semantic search over markdown files vs full repository packaging. QMD is targeted retrieval, repomix is wholesale packaging. QMD claims 95% token reduction; repomix maximizes token usage by design.
- **Native Claude Code context** — Claude Code already reads files on demand. repomix is most useful when you need to share context with non-Claude tools or start a fresh session with full project awareness.
- **aider /architect** — Includes its own repo mapping for context management. More integrated but model-specific.

## Our Usage

Watching. Lower priority than Context7 and QMD because Claude Code already has native file reading capabilities. The primary use case in our stack would be: (1) sharing full project context when starting new Ralph sessions, (2) handing off context between different AI models, or (3) generating a snapshot for archival or review purposes. Not solving an urgent pain point but good to have in the toolkit. Would become more valuable if we start using multi-model workflows (e.g., Claude Code + Gemini).

## Sources

- [GitHub: yamadashy/repomix](https://github.com/yamadashy/repomix)
- [awesome-claude-code lists](https://github.com/topics/awesome-claude-code)
- [Claude Code plugin marketplace](https://claude.ai/plugins)

---
*Last reviewed: 2026-02-07*
