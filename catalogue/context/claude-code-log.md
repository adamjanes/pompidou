# claude-code-log

| Field | Value |
|-------|-------|
| GitHub | [daaain/claude-code-log](https://github.com/daaain/claude-code-log) |
| Stars | 700 |
| Last Commit | 2026-02-06 |
| Install | `pip install claude-code-log` or `uvx claude-code-log@latest` |
| Status | Watching |
| Score | **3.80** |
| Category | context |
| Holy Grail Phase | 5-Learn |

## What It Does

Python CLI tool that converts Claude Code transcript JSONL files into readable HTML and Markdown formats with interactive TUI (Terminal User Interface). Processes entire `~/.claude/projects/` directory hierarchy, generates master index with project cards, individual session pages, combined transcripts, and on-demand Markdown exports. TUI provides interactive browsing, session summaries, quick actions (export HTML/Markdown, resume session in Claude Code), and embedded Markdown viewer. Designed for reviewing Claude Code history, searching conversations, analyzing costs, sharing transcripts, and documenting development processes.

## How It Works

**Four modes:**
1. **Default (all projects):** `claude-code-log` processes `~/.claude/projects/`, creates master index + per-project pages + individual session files
2. **TUI (interactive):** `claude-code-log --tui` launches terminal interface with session listing, summaries, quick actions (h=HTML, m=Markdown, v=view, c=resume)
3. **Single file/directory:** `claude-code-log transcript.jsonl` or `claude-code-log /path/to/directory` processes specific session
4. **Date filtering:** `--from-date "yesterday" --to-date "today"` filters by natural language date range

**Output structure:**
```
~/.claude/projects/
├── index.html                           # Master index with project cards
├── project1/
│   ├── combined_transcripts.html        # All sessions combined
│   ├── session-{session-id}.html        # Individual session HTML
│   ├── session-{session-id}.md          # Markdown (generated on-demand via TUI)
│   └── session-{session-id2}.html
```

**TUI features:**
- Session listing with IDs, summaries, timestamps, message counts, token usage
- Smart summaries (Claude-generated preferred over first user message)
- Working directory matching (auto-opens project matching CWD)
- Quick actions: `h` (export HTML), `m` (export Markdown), `v` (embedded viewer), `c` (resume session), `r` (reload), `p` (project selector)
- Row expansion (Enter key): full summary, first user message, working directory, detailed token usage
- Cache integration with auto-validation for fast loading
- Arrow key navigation, `q` to quit

**HTML features:**
- Responsive design (desktop + mobile)
- Runtime message filtering (JavaScript controls, show/hide message types, live counts)
- Session navigation (interactive TOC with summaries, timestamp ranges)
- Token usage display (individual message + session totals)
- Syntax highlighting (code blocks with markdown rendering)
- Markdown support (server-side mistune rendering: headers, lists, emphasis, code, links, images, tables, GFM)
- Collapsible content (tool use, system commands, long messages)
- Floating controls (filter button, details toggle, back-to-top)
- Cross-session summary matching (async summaries properly matched)

**Markdown features:**
- GitHub-Flavored Markdown compatible
- Hierarchical structure (sessions organized with headers, collapsible details)
- Message excerpts in section titles for quick navigation
- Code preservation with syntax hints (fenced code blocks)
- Embedded viewer in TUI with table of contents
- Configurable image handling (placeholder, embedded base64, referenced files)

**Message types supported:**
- User messages, assistant messages, summary messages
- System commands (`init` in expandable details with structured parsing)
- Tool use (collapsible with special TodoWrite rendering)
- Tool results (with error handling)
- Thinking content (Claude's reasoning)
- Images (pasted screenshots)

**CLI options:**
- `--tui`: Launch interactive TUI
- `--all-projects`: Explicitly process all projects (default behavior)
- `--open-browser`: Auto-open generated HTML in browser
- `--from-date "DATE"`, `--to-date "DATE"`: Filter by natural language dates (today, yesterday, last week, 3 days ago)
- `--no-individual-sessions`: Skip individual session files (only create combined transcripts)
- `-o, --output PATH`: Custom output location

**Installation:**
```bash
# Via pip
pip install claude-code-log

# Via uvx (no install)
uvx claude-code-log@latest

# From source
git clone https://github.com/daaain/claude-code-log.git
cd claude-code-log
uv sync
uv run claude-code-log
```

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 3 | 0.90 |
| Simplicity | 20% | 4 | 0.80 |
| Community trust | 15% | 4 | 0.60 |
| Ecosystem fit | 15% | 4 | 0.60 |
| Cost efficiency | 10% | 5 | 0.50 |
| Maturity | 10% | 3 | 0.30 |
| **Composite** | | | **3.80** |

### Strengths
- TUI is game-changer — interactive browsing, quick actions (export/resume), embedded Markdown viewer beats manual file navigation
- Comprehensive transcript support — handles all message types (user, assistant, system, tool use, thinking, images)
- Smart session summaries — prioritizes Claude-generated summaries over first user message for better session identification
- Date filtering with natural language — "yesterday", "last week", "3 days ago" more intuitive than ISO dates
- Working directory matching — auto-opens projects matching CWD, smart context awareness
- Dual output formats — HTML for sharing/archiving, Markdown for GitHub/docs/embedded viewing
- Master index with project cards — browseable hierarchy with statistics (sessions, messages, tokens, date range)
- Token usage tracking — individual message + session totals answers "how much did this cost?"
- Runtime message filtering — JavaScript controls show/hide message types without regenerating HTML
- Syntax highlighting — code blocks rendered with mistune, readable formatting
- Cross-session summary matching — async-generated summaries properly linked to original sessions
- Zero external dependencies for core — Python + standard library, no heavy frameworks
- Active development — last commit 2026-02-06, responsive maintenance
- Python tooling modern — uses `uv` for fast installation, contemporary packaging

### Weaknesses
- Large HTML files — combined transcripts can reach 100MB for active projects (example on GitHub)
- No search in HTML output — static pages, no in-page search or grep-like filtering
- No analysis or insights — converts to HTML/Markdown but doesn't extract learnings, decisions, patterns
- No automation hooks — manual command to generate, not integrated into Claude Code workflow (no post-session auto-export)
- Python dependency — requires Python runtime and uv tooling (not native Node/Bash like most Claude Code tools)
- Limited metadata extraction — focuses on transcript display, doesn't parse task lists, blockers, decisions for structured data
- No diffing or comparison — can't compare sessions, show changes over time, track progress on feature
- Privacy concerns for sharing — HTML includes full transcript; no built-in redaction or sanitization before sharing
- TUI cache can go stale — cache validation auto-detects changes but edge cases possible
- Markdown image handling limited — placeholder/base64/referenced files; no automatic optimization or WebP conversion

### Community Sentiment

Positive reception from Claude Code power users. Simon Willison (Datasette creator) [blogged about transcript extraction](https://simonwillison.net/2025/Dec/25/claude-code-transcripts/) highlighting need for "better interface for understanding what Claude Code has done than even Claude Code itself." Community notes daaain's tool as "more feature-complete than simonw/claude-code-transcripts" with TUI being standout feature. Reddit/HN discussions praise date filtering ("finally, 'show me yesterday's work' without grep") and token tracking ("answers 'how much did I spend last week?'"). Some complaints about large HTML files but acknowledgment that "100MB is the conversation, not the tool's fault." Python dependency seen as reasonable trade-off for comprehensive mistune markdown rendering. TUI quick actions (resume session with `c` key) noted as "thoughtful UX — one keystroke to continue where you left off." Mentioned alongside simonw/claude-code-transcripts and Claude Transcript Viewer (claude-code-viewer.pages.dev) as top transcript tools in 2026.

### Compared To

- **claude-code-transcripts (simonw)** (`catalogue/context/claude-code-transcripts.md`): Simon Willison's tool focuses on publishing to GitHub Gist with mobile-friendly pagination. daaain's tool (claude-code-log) focuses on local browsing via TUI with comprehensive session management. Both convert JSONL to HTML; claude-code-log has TUI + Markdown + date filtering; simonw's has Gist publishing + pagination. Use claude-code-log for local review/analysis; use simonw's for sharing/publishing.
- **ccusage** (`catalogue/scheduling/ccusage.md`): CLI cost tracking. ccusage shows token/cost totals; claude-code-log shows full transcript + token breakdown. Complementary: ccusage for quick checks, claude-code-log for deep analysis of what consumed tokens.
- **/harvest (not yet built):** Holy Grail Phase 5 slash command to extract learnings from sessions into `knowledge/updates/`. claude-code-log publishes full transcripts; /harvest will extract structured learnings. Different purposes: documentation vs learning extraction.
- **repomix** (`catalogue/context/repomix.md`): Packages codebase into single file for LLM context. repomix is input (give code to LLM); claude-code-log is output (read LLM conversation). Different directions.
- **Claude Transcript Viewer** (claude-code-viewer.pages.dev): Web-based viewer with upload via `npx -y claude-code-uploader`. Similar HTML output but requires upload to web service; claude-code-log is local-only. Trade-off: web viewer is shareable link; claude-code-log is private files.

## Our Usage

**Status: Watching** — Not installed yet.

**Why watching:**
- **TUI aligns with Phase 5 (Learn It):** Interactive session browsing, quick resume, embedded viewer fits morning review workflow (Adam reviews overnight Ralph loop results)
- **Date filtering is killer feature:** "Show me yesterday's work" answers key morning question without grep/manual file hunting
- **Token tracking answers cost questions:** "How much did last week's work cost?" informs budget decisions
- **Markdown export for documentation:** Can convert curated sessions to Markdown for `knowledge/updates/` (complements /harvest)
- **Working directory matching is smart:** Auto-opens project matching CWD reduces context switching

**Why not chosen:**
- **/harvest priority:** Need `/harvest` slash command to extract learnings from sessions more than need full transcript viewing (learning extraction > documentation)
- **ccusage sufficient for cost tracking:** CLI `ccusage` provides token/cost totals without heavy HTML generation
- **Native Claude Code history adequate for now:** Can review sessions via `claude -r <sessionId>` without separate viewer
- **Large HTML files:** 100MB combined transcripts are slow to load/search; prefer structured data extraction
- **No automation hooks:** Manual command doesn't fit autonomous workflow (would need post-session hook to auto-generate)

**Potential future use:**
- **After /harvest is built:** Use claude-code-log to review full transcripts of sessions where /harvest flagged interesting decisions/learnings
- **For client documentation:** Export curated successful sessions to Markdown for `clients/{client}/knowledge/calls/` to show development process
- **For Pompidou itself:** Export tool evaluation sessions as case studies showing research methodology
- **Morning review workflow:** `claude-code-log --tui --from-date yesterday` to interactively review overnight Ralph loop sessions

**How we'd integrate:**
1. Build `/harvest` first to extract learnings from sessions into `knowledge/updates/`
2. Use TUI's `v` (view) command to review sessions where /harvest flagged blockers or decisions
3. Use `m` (Markdown export) to convert noteworthy sessions to documentation
4. Optionally add post-session hook to auto-generate HTML/Markdown for all sessions (via `.claude/hooks/session_end.py`)

**Decision deferred until:** /harvest is built and we have clear workflow for morning review of overnight sessions. Then evaluate if TUI browsing + Markdown export adds value beyond /harvest's structured extraction.

## Sources

- [GitHub README](https://github.com/daaain/claude-code-log)
- [PyPI package](https://pypi.org/project/claude-code-log/)
- [Simon Willison: A new way to extract detailed transcripts from Claude Code](https://simonwillison.net/2025/Dec/25/claude-code-transcripts/)
- [Example HTML output (large file, ~100MB)](https://github.com/daaain/claude-code-log/releases/latest/download/claude-code-log-transcript.html)
- [Claude Transcripts live demo](https://daaain.github.io/claude-code-log/claude-code-log-transcript.html)
- [Contributing guide](https://github.com/daaain/claude-code-log/blob/main/CONTRIBUTING.md)

---
*Last reviewed: 2026-02-07*
