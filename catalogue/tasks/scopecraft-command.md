# Scopecraft Command

| Field | Value |
|-------|-------|
| GitHub | [scopecraft/command](https://github.com/scopecraft/command) |
| Stars | 169 |
| Last Commit | Recent (775 commits on main) |
| Install | `npm install -g @scopecraft/cmd` |
| Status | Evaluated |
| Category | Tasks |
| Holy Grail Phase | Phase 3 (Task Tracking) |

## What It Does

CLI and MCP server for Markdown-Driven Task Management (MDTM). Tasks are markdown files with TOML/YAML frontmatter, organized in a two-state workflow (current/ with phases like backlog and active, plus archive/). Supports parent-child task hierarchies with sequential or parallel execution modes.

## How It Works

- Tasks stored as markdown files with structured frontmatter metadata
- Two interfaces: CLI (`sc` command) and MCP server (`scopecraft-mcp`)
- Parent tasks contain folders of sequenced or parallel subtasks
- Phase-based organization: backlog, active, done, archived
- Operations: create, list, promote, change execution mode
- IDE-agnostic: works with Cursor, Claude Desktop, and other AI tools
- Auto-detects project type and adapts structure

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 3 | 0.90 |
| Simplicity | 20% | 3 | 0.60 |
| Community trust | 15% | 2 | 0.30 |
| Ecosystem fit | 15% | 2 | 0.30 |
| Cost efficiency | 10% | 5 | 0.50 |
| Maturity | 10% | 2 | 0.20 |
| **Composite** | | | **2.80** |

**Strengths:**
- Markdown-native -- tasks are human-readable files in the repo
- Dual CLI + MCP interface gives flexibility
- Parent-child hierarchy handles complex features well
- Active development (775 commits)

**Weaknesses:**
- Small community (169 stars) -- bus factor risk
- No cross-project task queries (single-repo focused)
- TOML frontmatter is less common than YAML in the ecosystem
- No built-in agent consumption format

**Community Sentiment:** Niche but dedicated users. Well-designed for its scope.

**Compared To:** Beads (our chosen tool) is git-native and designed for cross-project tracking. Scopecraft is more structured but single-repo. Simone (below) is another alternative with a different philosophy.

## Our Usage

Evaluated, not adopting. Beads better fits our cross-project needs. Scopecraft's MDTM format is clean but we would need one installation per project with no unified view. Revisit if Beads proves inadequate for complex task hierarchies.

## Sources

- [GitHub README](https://github.com/scopecraft/command)

Last reviewed: 2026-02-06
