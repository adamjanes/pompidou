# Linear MCP

| Field | Value |
|-------|-------|
| GitHub | [linear.app/docs/mcp](https://linear.app/docs/mcp) (official, hosted) |
| Stars | N/A (SaaS product, not open-source repo) |
| Last Commit | N/A (hosted service) |
| Install | `claude mcp add --transport sse linear-server https://mcp.linear.app/sse` |
| Status | Evaluated |
| Category | tasks |
| Holy Grail Phase | 2-Task |

## What It Does

Linear MCP is an officially hosted MCP server that connects Claude Code directly to Linear's project management platform. It allows Claude to search, create, and update Linear issues, projects, and comments from within a coding session. The integration follows the authenticated remote MCP spec, meaning the server is centrally hosted and managed by Linear — no local setup beyond the MCP connection string.

## How It Works

**Setup:**
```bash
# Add Linear MCP server to Claude Code
claude mcp add --transport sse linear-server https://mcp.linear.app/sse

# Or run /mcp inside a Claude Code session for interactive auth
```

On first connection, you authenticate via OAuth to grant Claude access to your Linear workspace. After that, Claude can use Linear tools directly in conversation.

**Available tools:**
- Search issues by text, status, assignee, project
- Create new issues with title, description, priority, labels
- Update issue status, assignee, or other fields
- Add comments to issues
- Manage projects and cycles
- Handle attachments

**Example: Cyrus AI Agent**
The most notable implementation is [Cyrus](https://github.com/ceedaragents/cyrus) — a Claude Code-powered Linear agent that operates as an actual team member inside Linear. You assign issues to Cyrus like any other developer. Cyrus monitors assignments, creates isolated git worktrees per issue, runs Claude Code sessions to process them, and streams activity updates back to Linear. This demonstrates the full potential of Linear as an AI agent coordination layer.

**How Cyrus works:**
1. Team member assigns an issue to Cyrus in Linear
2. Cyrus detects the assignment, creates a git worktree
3. Claude Code processes the issue autonomously
4. Rich status updates (dropdowns, approvals) stream back to Linear
5. Human reviews and merges the result

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 3 | 0.90 |
| Simplicity | 20% | 3 | 0.60 |
| Community trust | 15% | 4 | 0.60 |
| Ecosystem fit | 15% | 2 | 0.30 |
| Cost efficiency | 10% | 2 | 0.20 |
| Maturity | 10% | 3 | 0.30 |
| **Composite** | | | **2.90** |

### Strengths
- Official, hosted MCP server — no infrastructure to maintain
- Linear is a best-in-class issue tracker with excellent UX for humans
- Cross-project visibility is built-in (workspaces, teams, projects, cycles)
- Cyrus proves the agent-as-team-member pattern works in production
- OAuth authentication is simpler than API token management
- Rich metadata (priorities, labels, estimates, cycles) available to agents
- Linear's API is fast and well-documented

### Weaknesses
- Requires a Linear subscription ($8/user/month minimum)
- Not git-native — issues live in Linear's cloud, not alongside code
- Remote MCP connections are "still early" per Linear's own docs — can fail or require reconnection
- Network dependency for every task operation (latency in agent loops)
- Adds a SaaS dependency to the development workflow
- Cyrus requires its own infrastructure (polling, worktrees, persistent process)
- Not suitable for offline development

### Community Sentiment

Linear is widely loved as a product ("the best issue tracker for engineering teams" is a common refrain). The MCP integration is newer and getting positive-but-cautious reception. Composio and LobeHub both list Linear MCP as a featured integration. The Cyrus project demonstrates real production usage with detailed guides. Main complaints center on MCP connection reliability — several reports of needing to restart clients or re-authenticate. A LinkedIn article by Mark Mitchell provides a practical setup walkthrough. The community distinguishes between Linear-the-product (universally praised) and Linear-MCP-the-integration (promising but immature).

### Compared To

- **Beads** (`catalogue/tasks/beads.md`): Beads is local-first, free, git-native. Linear is cloud-first, paid, API-driven. Beads for agent-speed task tracking; Linear for team-wide project management. Not really the same category.
- **CCPM** (`catalogue/tasks/ccpm.md`): Both use external issue trackers (GitHub Issues vs Linear). CCPM is free; Linear requires subscription. Linear has better UX; GitHub has broader adoption.
- **Claude Task Master** (`catalogue/tasks/claude-task-master.md`): Task Master is a task decomposer; Linear is a full project management platform. Task Master generates tasks; Linear stores and tracks them. Could use both together.

## Our Usage

**Evaluated as a future option.** Linear MCP would add value if we need cross-project visibility for client work (clients/fractional-first, clients/e-america, clients/semble) or if GitHub Issues proves insufficient for coordination at scale. The Cyrus pattern (agent-as-team-member) is compelling for client-facing workflows where stakeholders need real-time visibility.

Not chosen currently because:
1. We don't use Linear (would need to adopt a new tool)
2. Network dependency is a liability for autonomous Ralph loops
3. Beads covers our immediate task tracking needs for free, locally

Would reconsider if: client teams already use Linear, or cross-project coordination becomes a bottleneck that GitHub + Beads can't handle.

## Sources

- [Linear MCP Docs](https://linear.app/docs/mcp)
- [Linear + Claude Integration](https://linear.app/integrations/claude)
- [Cyrus: Claude Code-powered Linear Agent](https://github.com/ceedaragents/cyrus)
- [Cyrus + Linear Guide](https://www.atcyrus.com/stories/linear-claude-code-integration-guide)
- [Linear AI Agents Docs](https://linear.app/docs/agents-in-linear)
- [Composio: Linear MCP Setup](https://composio.dev/blog/how-to-set-up-linear-mcp-in-claude-code-to-automate-issue-tracking)
- [Mark Mitchell: Connect Linear MCP to Claude Code](https://www.linkedin.com/pulse/how-connect-linear-mcp-server-claude-code-mark-mitchell-pkawc)

---
*Last reviewed: 2026-02-07*
