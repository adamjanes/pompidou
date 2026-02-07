# Claude Code Tools

| Field | Value |
|-------|-------|
| **GitHub** | [pchalasani/claude-code-tools](https://github.com/pchalasani/claude-code-tools) |
| **Stars** | 1,400 |
| **Last Commit** | Active (2026) |
| **Install** | `uv tool install claude-code-tools` + `brew install pchalasani/tap/aichat-search` (search engine) |
| **Status** | Watching |
| **Category** | Execution (Session Management) |
| **Holy Grail Phase** | 3-Run |

## What It Does

Claude Code Tools is a session continuity suite that solves the biggest problem with long-running agent work: context loss during compaction. It provides three resume strategies (trim, smart trim, rollover) that preserve complete session history without lossy summarization, plus full-text search across all past sessions, cross-agent handoff between Claude Code and Codex, safety hooks, and workflow commands. The core insight is that compaction is lossy and sessions should maintain a lineage chain instead.

## How It Works

### Core Commands

| Command | Purpose |
|---------|---------|
| `aichat` | Session management: search, resume, trim, rollover |
| `tmux-cli` | Terminal automation for AI agents |
| `fix-session` | Repair broken conversation chains |
| `vault` | Encrypted .env backup and sync |
| `env-safe` | Safe environment variable inspection |

### Three Resume Strategies

**1. Trim + Resume**
Truncates large tool results (default >500 chars) and optionally older assistant messages. Deterministic and user-controlled, typically freeing 30-50% context on first application. Configurable thresholds for which tool types to truncate and how many recent messages to preserve.

**2. Smart Trim + Resume**
Uses headless Claude/Codex analysis to identify safe truncation points without affecting current work. Slower but more selective -- an AI decides what can safely be trimmed rather than using fixed thresholds.

**3. Rollover**
Creates fresh sessions with "session-lineage pointers" (chronologically ordered ancestor session paths). Starts at 15-20% context usage. Two variants:
- **Quick rollover**: Lineage only, minimal overhead
- **Rollover with context**: AI-extracted work summary carried forward

All strategies preserve complete parent sessions for on-demand retrieval. Nothing is permanently lost.

### Lineage System

Instead of lossy compaction, sessions maintain a chain:
```
Original (abc123) -> Trimmed (def456) -> Trimmed (ghi789) -> ...
```
Agents can reach back into any ancestor session to retrieve forgotten context. This is the key architectural difference from native compaction.

### Full-Text Search

Powered by Rust/Tantivy for performance:
- `aichat search` -- Interactive TUI for humans
- `aichat search --json -g "topic"` -- JSONL output for agent consumption
- Filters by session type (original, trimmed, rollover), date range, and agent
- Auto-indexes on startup

### Claude Code Plugins

Available as plugin marketplace installs:
- **aichat** -- Session management hooks and skills (`/session-search`, `/recover-context`, `session-searcher` agent)
- **safety-hooks** -- Blocks `rm -rf` on critical paths, blocks `git add -A`, blocks `.env` file operations, prevents reading files >500 lines
- **workflow** -- `/code-walk-thru`, `/log-work`, `/make-issue-spec`, `ui-tester` agent
- **tmux-cli** -- Interact with CLI apps in other tmux panes
- **voice** -- Spoken audio summaries

### Cross-Agent Handoff

Resume mechanisms support switching between Claude Code and Codex-CLI:
1. Type `>resume` in session to copy session ID
2. Use `aichat search` TUI to select session and resume action
3. Direct CLI: `aichat resume [session-id]`

## Evaluation

### Strengths
- Directly addresses the #1 problem with long-running Ralph loops: context loss during compaction
- Lineage system is architecturally elegant -- nothing is permanently lost, agents can retrieve ancestor context on demand
- Three resume strategies cover different scenarios (fast/deterministic, smart/selective, clean restart)
- Rust-based search is fast and works offline
- Safety hooks provide sane defaults (block `rm -rf`, block `git add -A`, block `.env` access)
- Cross-agent handoff is useful for Claude Code to Codex transitions
- Plugin ecosystem is modular -- install only what you need

### Weaknesses
- Smaller community (1.4K stars) means less battle-testing
- Two-part installation (Python package + Rust search engine) adds complexity
- The "smart trim" strategy uses additional API calls (AI-powered trimming costs tokens)
- Safety hooks may conflict with other hook-based tools (TDD Guard, Oh-My-ClaudeCode)
- File read protection (>500 lines) may block legitimate large-file operations
- Requires disabling native auto-compaction (setting change)

### Community Sentiment
Niche but highly valued by power users running long sessions. The lineage concept resonates with users who have experienced lossy compaction. The author (pchalasani) is known for the Langroid multi-agent framework.

### Compared To
- **Native compaction**: Lossy and irreversible. Claude Code Tools preserves everything and provides retrieval.
- **claude-auto-resume**: Handles usage limit restarts but not context preservation. Claude Code Tools handles context; they're complementary.
- **Manual session management**: `aichat search` automates what would otherwise require manual JSONL parsing and session ID tracking.

## Our Usage

**Plan:** High priority for Phase 3-Run. Context loss during compaction is the primary quality degradation mechanism in Ralph loops. The lineage system directly addresses this.

**Integration strategy:**
1. Disable auto-compaction in all Ralph loop sessions
2. Use **Trim + Resume** as default strategy (deterministic, no extra API cost)
3. Use **Rollover** when sessions hit context limits (clean restart with lineage pointers)
4. Deploy **safety hooks** as baseline protection for all autonomous sessions
5. Use `aichat search --json` to build session history reports alongside ccusage cost reports

**Concerns:**
- Hook conflicts: need to test coexistence with TDD Guard hooks and Oh-My-ClaudeCode hooks
- The "disable auto-compaction" requirement changes Claude Code's default behavior -- ensure this doesn't cause issues in interactive sessions
- Smart trim API cost may be significant across many Ralph loop iterations

**Compatibility testing needed:**
- Oh-My-ClaudeCode execution modes + Claude Code Tools resume strategies
- TDD Guard PreToolUse hooks + safety-hooks PreToolUse hooks
- claude-auto-resume restart + lineage chain preservation

**Next step:** Install and test Trim + Resume on a single project. Measure context recovery quality compared to native compaction.

## Sources

- [GitHub Repository](https://github.com/pchalasani/claude-code-tools)

---
*Last reviewed: 2026-02-06*
