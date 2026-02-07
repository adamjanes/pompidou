# Claude Code Transcripts

| Field | Value |
|-------|-------|
| GitHub | [simonw/claude-code-transcripts](https://github.com/simonw/claude-code-transcripts) |
| Stars | 970 |
| Last Commit | 2026-01-25 |
| Install | `uv tool install claude-code-transcripts` or `uvx claude-code-transcripts` |
| Status | Watching |
| Score | **3.65** |
| Category | context |
| Holy Grail Phase | 5-Learn |

## What It Does

Converts Claude Code session files (JSON or JSONL) into clean, mobile-friendly HTML pages with pagination. Provides tools for publishing transcripts as browseable multi-page archives with timeline of prompts/commits, GitHub Gist integration, and web session import via Claude API.

## How It Works

**Four commands:**
1. **`local` (default):** Select from local sessions in `~/.claude/projects`, interactive picker, opens in browser
2. **`web`:** Select from web sessions via Claude API, interactive picker grouped by GitHub repo, specify `--repo` to filter
3. **`json`:** Convert specific JSON/JSONL file (local path or URL)
4. **`all`:** Convert all local sessions to browseable HTML archive with master index and per-project pages

**Output structure:**
- `index.html`: Timeline of prompts and commits
- `page-001.html`, `page-002.html`, etc.: Paginated transcript pages

**Output options:**
- `-o, --output DIRECTORY`: Output directory (default: temp dir + open browser)
- `-a, --output-auto`: Auto-name subdirectory based on session ID or filename
- `--repo OWNER/NAME`: GitHub repo for commit links (auto-detected if not specified). For `web` command, filters session list.
- `--open`: Open generated `index.html` in browser (default if no `-o` specified)
- `--gist`: Upload HTML files to GitHub Gist, output preview URL via gisthost.github.io
- `--json`: Include original session file in output directory

**Web session picker:** Sessions grouped by GitHub repo, filter with `--repo`:
```
simonw/datasette              2025-01-15T10:30:00  Fix the bug in query parser
simonw/llm                    2025-01-14T09:00:00  Add streaming support
(no repo)                     2025-01-13T14:22:00  General coding session
```

**Gist publishing:**
```bash
claude-code-transcripts --gist
# Output:
# Gist: https://gist.github.com/username/abc123def456
# Preview: https://gisthost.github.io/?abc123def456/index.html
```
Requires GitHub CLI (`gh`) installed and authenticated.

**Archive generation:**
```bash
claude-code-transcripts all
# Creates ./claude-archive/ with:
# - Master index listing all projects
# - Per-project pages listing sessions
# - Individual session transcripts
```

**Credentials (macOS):** Auto-retrieved from keychain if logged into Claude Code. Other platforms: provide `--token` and `--org-uuid` manually.

## Evaluation

### Strengths

- **Mobile-friendly:** Clean HTML design, pagination for large sessions
- **GitHub integration:** Auto-detects repo, creates commit links, filters web sessions by repo
- **Gist publishing:** One-click upload to GitHub Gist with shareable preview URL via gisthost.github.io
- **Multiple import sources:** Local JSONL, local JSON, web sessions via API, URLs
- **Interactive pickers:** User-friendly session selection for local and web
- **Auto-naming:** `-a` flag creates subdirectories named after session ID
- **Archive mode:** `all` command converts entire session history to browseable site
- **Active development:** Recent commit (2026-01-25), maintained by Simon Willison (well-known in data/AI community)
- **Python tooling:** Uses `uv` for fast installation, modern Python packaging
- **Comprehensive test suite:** Tests included in repo
- **Apache 2.0 license:** Permissive open source

### Weaknesses

- **Limited to publishing:** Doesn't analyze or process sessions, just converts to HTML
- **No search/filtering in output:** HTML pages are static, no in-page search or filtering by tool/command
- **Pagination breaks long context:** Can't see entire session on one page (though mobile-friendly is trade-off)
- **GitHub Pages not auto-deployed:** Manual step to publish gist or host HTML elsewhere
- **Web session import requires credentials:** Auto-retrieval only works on macOS with keychain, manual token/org-uuid elsewhere
- **No privacy controls:** Published gists are public (unless you manually set to secret)
- **Python dependency:** Requires Python runtime and uv tooling
- **Not integrated with Claude Code:** External tool, no hooks or automation within sessions
- **Limited metadata extraction:** Focuses on prompts/commits, doesn't extract task lists, decisions, learnings
- **No diffing or comparison:** Can't compare sessions or show changes over time

### Community Sentiment

Positive reception from data/AI community. Simon Willison is well-known (creator of Datasette), brings credibility. Announced in late Dec 2025 blog post "A new way to extract detailed transcripts from Claude Code." Simon writes: "I write significantly more code via Claude Code than typing into a text editor... My actual work is increasingly represented by Claude Code conversations that capture important context about projects including what was asked for, what Claude suggested, and decisions made." Tool addresses need to publish and share these conversations as documentation.

### Compared To

- **Native Claude Code history:** Claude Code saves sessions but no built-in HTML export or publishing. This tool fills that gap.
- **/harvest (Phase 5):** /harvest (not yet built) will extract learnings from sessions into `knowledge/updates/`. This tool publishes full transcripts. Different purposes: learning extraction vs full documentation.
- **repomix ([context/repomix.md](../context/repomix.md)):** repomix packages codebase into single file for LLM context. This tool publishes Claude Code session history. Different direction: input vs output.
- **Context7 ([context/context7.md](../context/context7.md)):** Context7 tracks documentation context. This tool publishes session transcripts as documentation. Complementary.

## Our Usage

**Status: Watching** — Not installed yet.

**Why watching:**
- **Aligns with Phase 5 (Learn It):** Publishing transcripts could be part of learning/documentation workflow
- **Simon Willison credibility:** Well-known developer, likely to maintain long-term
- **Gist publishing is clever:** Easy sharing of session documentation via GitHub Gist
- **GitHub integration:** Commit links, repo filtering show thoughtful design

**Why not chosen:**
- **Publishing is lower priority than extraction:** We need `/harvest` to extract learnings into `knowledge/updates/` more than we need full transcript publishing
- **Static HTML is limited:** No search, filtering, or analysis in output
- **Privacy concerns:** Publishing to public Gist may expose sensitive work (though can set secret manually)
- **Not automated:** Manual command to publish sessions, not integrated into workflow

**Potential use case:**
- **After /harvest is built:** Could use this tool to publish curated sessions as case studies or documentation
- **For client work:** Publish transcripts of successful features to show development process
- **For Pompidou itself:** Publish evaluation sessions as examples of tool research methodology

**How we'd integrate:**
1. Build `/harvest` first to extract learnings from sessions
2. Use this tool to publish selected sessions (not all) after manual review
3. Set up automation: session → /harvest → manual review → publish to secret Gist → optionally make public

**Decision deferred until:** /harvest is built and we have sessions worth publishing. Then evaluate if this tool or custom HTML generation is better fit.

## Sources

- [GitHub README](https://github.com/simonw/claude-code-transcripts)
- [A new way to extract detailed transcripts from Claude Code](https://simonwillison.net/2025/Dec/25/claude-code-transcripts/)
- [Releases](https://github.com/simonw/claude-code-transcripts/releases)
- [PyPI package](https://pypi.org/project/claude-code-transcripts/)

---
*Last reviewed: 2026-02-07*
