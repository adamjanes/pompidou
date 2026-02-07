# Spec Workflow MCP

| Field | Value |
|-------|-------|
| GitHub | [Pimzino/spec-workflow-mcp](https://github.com/Pimzino/spec-workflow-mcp) |
| Stars | 3,845 |
| Last Commit | Feb 2026 |
| Install | `npx -y @pimzino/spec-workflow-mcp@latest /path/to/project` |
| Status | Watching |
| Category | spec |
| Holy Grail Phase | 1-Spec |

## What It Does

MCP server for structured spec-driven development with a real-time web dashboard and VSCode extension. Implements a sequential Requirements → Design → Tasks workflow with approval stages and revision tracking between phases. The dashboard runs on port 5000 and provides live progress updates, approval workflow management, and searchable implementation logs across multiple projects.

## How It Works

Functions as a Model Context Protocol server that integrates with Claude Code, Augment Code, Continue IDE, Cursor, and others through standardized MCP configuration. The development workflow is sequential: Requirements → Design → Tasks, with approval gates between phases. The web dashboard provides centralized monitoring with live updates, progress tracking bars, and task visualization. Available on npm and as a VSCode extension. Multi-language support (11 languages). GPL-3.0 license.

## Evaluation

### Strengths
- Real-time web dashboard — visual progress monitoring that OpenSpec lacks
- MCP-based — clean integration without tool-specific plugins
- VSCode extension for IDE integration
- Approval workflow built in — human gates between spec phases
- Zero open issues — suggests stable or well-maintained
- Multi-language support (11 languages)

### Weaknesses
- GPL-3.0 license — more restrictive than MIT
- Web dashboard adds another port/process to manage
- MCP dependency — requires MCP-compatible tools
- Overlaps significantly with OpenSpec's workflow
- Smaller community (3.8K stars vs OpenSpec's 22.5K)

### Community Sentiment

Positive but limited discussion. Featured in awesome-claude-code lists. Developers appreciate the visual dashboard aspect that most spec tools lack. The MCP approach gets praise from developers who prefer protocol-based integration over file-based.

### Compared To

- **OpenSpec** — CLI/file-based vs MCP/dashboard. OpenSpec is lighter and more established. Spec Workflow MCP's dashboard is its unique advantage.
- **cc-sdd** — Similar spec workflow but without the dashboard or MCP. Cross-tool compatible.
- **Spec Kit** — Much heavier framework. Both have structured workflows but different complexity levels.

## Our Usage

Watching. The dashboard is the standout feature — would be valuable for monitoring autonomous spec execution during Ralph loops. However, OpenSpec is already ★ CHOSEN and adding an MCP server for the same workflow phase adds complexity. Revisit if visual monitoring becomes a priority.

## Sources

- [GitHub: Pimzino/spec-workflow-mcp](https://github.com/Pimzino/spec-workflow-mcp)
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)

---
*Last reviewed: 2026-02-07*
