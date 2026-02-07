# Beads

| Field | Value |
|-------|-------|
| GitHub | [steveyegge/beads](https://github.com/steveyegge/beads) |
| Stars | 15,104 |
| Last Commit | 2026-02 (active) |
| Install | `brew install steveyegge/beads/bd` |
| Status | ★ CHOSEN |
| Category | tasks |
| Holy Grail Phase | 2-Task |

## What It Does

Beads is a git-native, distributed issue tracker designed from the ground up for AI coding agents. Created by Steve Yegge (formerly Google, Amazon), it solves what he calls the "50 First Dates" problem — agents waking up with no memory of yesterday's work. Issues are stored as JSONL in `.beads/`, versioned and branched alongside code, giving agents persistent structured memory with a dependency-aware graph that enables long-horizon task execution without losing context.

## How It Works

Beads stores issues as JSONL files inside a `.beads/` directory that lives in your git repo. Each issue gets a hash-based ID (e.g., `bd-a1b2`) that prevents merge conflicts when multiple agents or branches create issues concurrently.

**Key concepts:**
- **Beads** — Individual task/issue units with structured metadata
- **Molecules** — Groups of related beads with dependency chains
- **Dependencies** — Graph-based ordering so agents always know what to work on next
- **JSON output** — Agent-optimized format (not markdown) for programmatic consumption

**Core commands:**
```bash
bd init                    # Initialize beads in a repo
bd add "Fix auth bug"      # Create a new bead
bd list                    # List all beads (JSON output for agents)
bd list --unblocked        # Show only actionable beads
bd start bd-a1b2           # Mark a bead as in-progress
bd done bd-a1b2            # Mark complete
bd dep bd-a1b2 bd-c3d4     # Add dependency between beads
```

**Workflow:** Beads syncs via git — no server, no rate limits, no network errors when agents update tasks. Multiple agents on multiple branches can create and modify beads concurrently; hash-based IDs ensure zero collisions on merge.

**Companion tools:**
- `beads_rust` (476 stars) — Fast Rust port for performance-critical workflows
- `beads_viewer` by Dicklesworthstone — TUI viewer for browsing beads
- Claude Code marketplace plugin — Native integration

## Evaluation

### Strengths
- Truly git-native: issues travel with the code, branch, merge, and diff like any other file
- Hash-based IDs eliminate merge conflicts in multi-agent workflows
- Dependency graph means agents always know the correct execution order
- JSON-first output is ideal for agent consumption (not human markdown)
- Zero infrastructure — no server, no database, no API keys
- Active ecosystem: Rust port, TUI viewer, Claude Code plugin, multiple community UIs
- Yegge's track record and writing bring strong community attention

### Weaknesses
- Young project (launched Jan 2026) — API surface still evolving
- JSONL format is less human-readable than markdown-based alternatives
- No built-in web UI (community tools fill this gap)
- Cross-repo task views require manual aggregation or tooling
- Dependency graph can get complex for large projects without visualization

### Community Sentiment

Overwhelmingly positive. Steve Yegge's Medium articles ("Introducing Beads", "The Beads Revolution", "Beads Best Practices") drove rapid adoption — 1,000 stars and 50 forks in the first six days. The GitHub Discussions are active with feature requests and workflow tips. Multiple community members have built UI implementations (beads-viz-prototype, beads-ui, beady, monitor-webui). Ian Bull's blog post calls it "The Best Damn Issue Tracker You're Not Using." The Claude Code marketplace plugin and choo-choo-ralph integration confirm real adoption in the agent ecosystem.

### Compared To

- **Claude Task Master** (`catalogue/tasks/claude-task-master.md`): Task Master is IDE-focused (Cursor, Windsurf) with PRD parsing. Beads is agent-focused with git-native storage. Task Master has more stars but is heavier and less suited to autonomous agent loops.
- **CCPM** (`catalogue/tasks/ccpm.md`): CCPM uses GitHub Issues as its database. Beads uses git-native JSONL. CCPM better for human visibility; Beads better for agent speed and offline operation.
- **Linear MCP** (`catalogue/tasks/linear-mcp.md`): Linear is a full SaaS product management tool. Beads is lightweight and local-first. Linear for cross-project visibility at scale; Beads for per-repo agent workflows.

## Our Usage

**Chosen as the cross-project task tracking layer.** Beads fits our architecture perfectly: git-native storage means tasks live alongside code with no external dependencies, hash-based IDs support our multi-agent (Ralph loop) workflows without collision, and the dependency graph lets agents self-direct through complex task sequences.

Used by choo-choo-ralph (`catalogue/execution/choo-choo-ralph.md`) for the spec-to-task-to-execute pipeline. Plan to initialize Beads on frequency-first, linkedin, and firstcomment projects first, then expand to client repos.

**Configuration:**
```bash
brew install steveyegge/beads/bd
cd /Users/adamjanes/code/projects/frequency-first && bd init
```

## Sources

- [GitHub README](https://github.com/steveyegge/beads)
- [Beads Documentation](https://steveyegge.github.io/beads/)
- [Introducing Beads — Steve Yegge (Medium)](https://steve-yegge.medium.com/introducing-beads-a-coding-agent-memory-system-637d7d92514a)
- [Beads Best Practices — Steve Yegge (Medium)](https://steve-yegge.medium.com/beads-best-practices-2db636b9760c)
- [The Beads Revolution — Steve Yegge (Medium)](https://steve-yegge.medium.com/the-beads-revolution-how-i-built-the-todo-system-that-ai-agents-actually-want-to-use-228a5f9be2a9)
- [Ian Bull: Best Damn Issue Tracker](https://ianbull.com/posts/beads/)
- [Better Stack Guide](https://betterstack.com/community/guides/ai/beads-issue-tracker-ai-agents/)
- [beads_viewer (TUI)](https://github.com/Dicklesworthstone/beads_viewer)

---
*Last reviewed: 2026-02-07*
