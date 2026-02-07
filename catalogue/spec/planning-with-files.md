# Planning with Files

| Field | Value |
|-------|-------|
| GitHub | [OthmanAdi/planning-with-files](https://github.com/OthmanAdi/planning-with-files) |
| Stars | 13,200 |
| Last Commit | Jan 2026 (v2.14.0) |
| Install | `/plugin marketplace add OthmanAdi/planning-with-files` then `/plugin install planning-with-files` |
| Status | Watching |
| Category | spec |
| Holy Grail Phase | 1-Spec |

## What It Does

Manus-style persistent markdown planning plugin for Claude Code. Treats the filesystem as working memory — creates and maintains three structured markdown files (`task_plan.md`, `findings.md`, `progress.md`) that persist across sessions and survive `/clear` commands. Supports 14 platforms including Claude Code, Cursor, Gemini CLI, Codex, OpenCode, and Kiro. The core principle: "Markdown is my working memory on disk" — structured files replace volatile context window with unlimited persistent storage.

## How It Works

Three-file system:
1. **task_plan.md** — Tracks phases and progress with checkboxes
2. **findings.md** — Stores research and discovered information
3. **progress.md** — Session logs and test results

Hooks maintain plan awareness: pre-tool hooks inject current plan state, post-tool hooks update progress, stop hooks save state. Session recovery automatically reconstructs context after `/clear`. Error persistence logs failures to prevent repetition.

Commands: `/plan` (create/update plan), `/planning` (start working from plan).

## Evaluation

### Strengths
- High adoption (13.2K stars, MIT license) — well-validated approach
- 14-platform support — not locked to Claude Code
- Filesystem-as-memory eliminates context window pressure
- Hook system maintains plan awareness automatically
- Session recovery — survives `/clear` and session restarts
- Markdown-based — git-friendly, human-readable, agent-writable

### Weaknesses
- Static plan files (no delta/change tracking like OpenSpec)
- No spec evolution model — plans are updated in place, not through proposals
- May clutter project root with plan files
- Simpler than OpenSpec's structured workflow (specs/ + changes/)

### Community Sentiment

Very popular. Featured in multiple "best Claude Code plugins" lists. Developers praise the simplicity — "just three files, but they change everything about how sessions work." Some criticism that it's too simple for complex projects where OpenSpec's change proposal workflow provides better governance.

### Compared To

- **OpenSpec** — More structured (specs/ vs changes/ with delta tracking). Planning-with-files is simpler and lighter; OpenSpec provides formal spec evolution. Complementary: use planning-with-files for session continuity, OpenSpec for formal spec governance.
- **Spec Kit** — Much heavier. Planning-with-files is a plugin, Spec Kit is a full framework.
- **Native Claude Code tasks** — Claude Code's built-in task system doesn't persist across sessions. Planning-with-files solves that.

## Our Usage

Watching. Could complement OpenSpec by providing lightweight session continuity (plan files persist across restarts) while OpenSpec handles formal spec management. The 14-platform support is interesting if we diversify tools. Lower priority than OpenSpec which is already ★ CHOSEN.

## Sources

- [GitHub: OthmanAdi/planning-with-files](https://github.com/OthmanAdi/planning-with-files)
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)

---
*Last reviewed: 2026-02-07*
