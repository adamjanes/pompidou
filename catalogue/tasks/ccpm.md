# CCPM (Claude Code Project Management)

| Field | Value |
|-------|-------|
| GitHub | [automazeio/ccpm](https://github.com/automazeio/ccpm) |
| Stars | ~7,000 |
| Last Commit | 2026-01 (active) |
| Install | `curl -sSL https://raw.githubusercontent.com/automazeio/ccpm/main/install/install.sh \| bash` |
| Status | Evaluated |
| Category | tasks |
| Holy Grail Phase | 2-Task |

## What It Does

CCPM is a project management system for Claude Code that uses GitHub Issues as a distributed database for task coordination and git worktrees for parallel agent execution. Built at Automaze, it provides a specification-driven development workflow that transforms Product Requirements Documents into shipped code through AI agent orchestration, with a complete audit trail from PRD to Epic to Task to Issue to Code to Commit.

## How It Works

CCPM treats GitHub Issues as the single source of truth. Local files serve as the working copy, while GitHub provides the team-visible state. Multiple Claude instances work on the same project simultaneously via git worktrees, which provide conflict-free parallel isolation.

**Slash commands:**
```
/pm:epic-start     # Create a new epic from a spec/PRD
/pm:issue-start    # Begin work on a specific issue
/pm:next           # Pick up the next unblocked task
/pm:status         # Show current project state
/pm:sync           # Sync local state with GitHub Issues
```

**Workflow:**
1. **Spec** — Write or generate a PRD/spec document
2. **Epic** — `/pm:epic-start` decomposes the spec into an epic with child issues on GitHub
3. **Execute** — `/pm:issue-start` or `/pm:next` picks an issue, creates a git worktree, and begins work
4. **Parallel** — Tasks marked `parallel: true` can run concurrently in separate worktrees
5. **Review** — Progress is visible as GitHub Issue comments in real time; team members can jump in anywhere

**Architecture:** Each issue maps to a git worktree. When an agent starts an issue, CCPM creates an isolated worktree so multiple agents (or human+agent pairs) can work without stepping on each other. Issue comments serve as the activity log — AI progress is visible to humans in real time.

## Evaluation

### Strengths
- GitHub Issues as backbone means zero new infrastructure — teams already have it
- Git worktrees for parallel isolation is a solid architectural choice
- Full audit trail (PRD → Epic → Task → Issue → Code → Commit) provides traceability
- Human-AI handoff works naturally — anyone can see issue state, comment, or take over
- Team transparency — managers see progress without interrupting flow
- Active development with 1,000+ issues in their own repo (dogfooding)

### Weaknesses
- Depends on GitHub API — rate limits, network latency, and authentication complexity
- GitHub Issues are not optimized for agent consumption (HTML-heavy, pagination, etc.)
- Worktree management adds complexity and disk usage
- Less suitable for offline or air-gapped development
- Smaller community compared to Task Master or Beads
- Slash command model requires Claude Code specifically (not portable to other agents)

### Community Sentiment

Positive reception on Hacker News (Show HN post). Developers appreciate the GitHub-native approach — the pitch "your PM tools are already in GitHub, why not use them?" resonates. Several users report success with parallel agent execution via worktrees. The main criticism is the GitHub API dependency — some prefer local-first alternatives that avoid rate limits and network issues. The project has an active DeepWiki documentation site and community engagement. A few forks exist (nadalpiantini/automazeio-ccpm), indicating community interest in extending the approach.

### Compared To

- **Beads** (`catalogue/tasks/beads.md`): Beads is local-first (JSONL in git), CCPM is GitHub-first (Issues API). Beads is faster for agent loops (no network); CCPM is better for team visibility. For solo autonomous loops, Beads wins. For team coordination, CCPM wins.
- **Claude Task Master** (`catalogue/tasks/claude-task-master.md`): Both decompose specs into tasks, but CCPM uses GitHub Issues while Task Master uses local JSON. CCPM better for teams; Task Master better for IDE integration.
- **Linear MCP** (`catalogue/tasks/linear-mcp.md`): Both use external APIs (GitHub vs Linear). Linear is more polished as a product but requires a paid subscription. CCPM is free and open source.

## Our Usage

**Evaluated but not chosen.** CCPM's GitHub Issues approach provides great team visibility, but for our autonomous Ralph loop workflows, the GitHub API dependency adds unnecessary latency and failure modes. Beads' git-native JSONL storage is faster, simpler, and more resilient for agent-to-agent task handoff.

CCPM remains interesting as a potential layer for client-facing projects (clients/fractional-first, clients/e-america) where team visibility matters more than agent speed. Could revisit if we need human stakeholders to see task progress via GitHub.

## Sources

- [GitHub README](https://github.com/automazeio/ccpm)
- [Commands Reference](https://github.com/automazeio/ccpm/blob/main/COMMANDS.md)
- [Install Guide](https://github.com/automazeio/ccpm/blob/main/install/README.md)
- [Show HN discussion](https://news.ycombinator.com/item?id=44960594)
- [DeepWiki: GitHub Integration](https://deepwiki.com/automazeio/ccpm/5.2-github-integration)
- [Killer Code overview](https://cc.deeptoai.com/docs/en/tools/ccpm-claude-code-project-manager)

---
*Last reviewed: 2026-02-07*
