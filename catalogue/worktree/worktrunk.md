# worktrunk

| Field | Value |
|-------|-------|
| GitHub | [max-sixty/worktrunk](https://github.com/max-sixty/worktrunk) |
| Stars | 1,829 |
| Last Commit | Feb 2026 |
| Install | `cargo install worktrunk` |
| Status | Watching |
| Category | worktree |
| Holy Grail Phase | 3-Run |

## What It Does

worktrunk is a CLI tool for Git worktree management designed specifically for parallel AI agent workflows. It simplifies the lifecycle of creating, switching between, and cleaning up git worktrees when running multiple Claude Code or other AI coding sessions simultaneously. Rather than managing worktrees through raw `git worktree` commands (which are verbose and error-prone), worktrunk provides opinionated shortcuts that match how AI agents actually use worktrees — spinning up isolated branches quickly, working in parallel, and tearing down cleanly.

## How It Works

**Key concepts:**
- **Opinionated worktree lifecycle**: worktrunk wraps `git worktree add`, `git worktree remove`, and related commands into a streamlined CLI that handles branch naming, directory placement, and cleanup automatically.
- **AI-agent-first design**: The defaults and workflows are optimized for the pattern of "create N isolated branches, run an agent on each, merge results." This is different from developer-oriented worktree tools that assume manual switching.
- **Fast creation and teardown**: Worktrees can be created and destroyed rapidly without manual branch management. worktrunk handles the bookkeeping.
- **Clean workspace management**: Stale worktrees (from crashed sessions or abandoned work) can be detected and cleaned up in batch.

**Usage:**
```bash
# Install via Cargo
cargo install worktrunk

# Create a new worktree for an agent session
worktrunk new feature-auth

# List active worktrees
worktrunk list

# Clean up completed/stale worktrees
worktrunk clean

# Remove a specific worktree
worktrunk rm feature-auth
```

**Workflow:**
1. Start a new task — `worktrunk new task-name` creates a worktree and branch
2. Point an AI agent (Claude Code, etc.) at the worktree directory
3. Agent works in isolation without affecting main branch or other worktrees
4. When done, review changes and merge the branch
5. Clean up with `worktrunk rm` or batch cleanup with `worktrunk clean`
6. Repeat for next task

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 2 | 0.60 |
| Simplicity | 20% | 4 | 0.80 |
| Community trust | 15% | 3 | 0.45 |
| Ecosystem fit | 15% | 2 | 0.30 |
| Cost efficiency | 10% | 5 | 0.50 |
| Maturity | 10% | 3 | 0.30 |
| **Composite** | | | **2.95** |

### Strengths
- Purpose-built for the AI agent parallel workflow pattern — not a general-purpose worktree manager retrofitted for agents
- Active development (Feb 2026 commits) — the author is clearly responding to the AI coding tool ecosystem
- Lightweight and focused — does one thing (worktree management) and does it well
- Written in Rust — fast execution, single binary, minimal overhead
- Batch cleanup of stale worktrees prevents the "accumulated worktree mess" problem that plagues long-running agent setups
- Good star count (1,829) for a focused utility — indicates real adoption

### Weaknesses
- Limited to worktree management — not a session manager, process manager, or orchestrator. You still need something else to manage the agent sessions themselves.
- Cargo install requirement means a Rust toolchain dependency
- Moderate adoption compared to full session managers like Claude Squad (~5,000 stars)
- No built-in integration with any specific AI coding tool — it manages worktrees, not agent sessions
- Overlaps significantly with the worktree management built into Claude Squad and ccmanager

### Community Sentiment

Well-regarded as a clean, focused utility. Developers who run parallel AI agent sessions praise it for eliminating the tedious `git worktree add/remove` boilerplate. Common sentiment: "I was doing this manually with shell scripts, worktrunk is just cleaner." Comparisons to Claude Squad are frequent — the consensus is that worktrunk is for developers who want to compose their own toolchain (worktrunk for worktrees + something else for sessions) rather than using an all-in-one solution. Some developers use worktrunk alongside Claude Squad for more granular worktree control than Squad provides natively.

### Compared To

- **Claude Squad** (`catalogue/process/claude-squad.md`): Claude Squad handles worktrees as part of its broader session management. worktrunk is worktree-only but offers finer control (batch cleanup, custom naming, etc.). They can be used together — Squad for session management, worktrunk for worktree housekeeping.
- **ccmanager** (`catalogue/process/ccmanager.md`): ccmanager also manages worktrees but bundles it with multi-agent session management. worktrunk is the unbundled, composable alternative.
- **Raw `git worktree` commands**: worktrunk is essentially a UX layer over the git worktree primitives. The value is automation of naming, placement, and cleanup — not new functionality.

## Our Usage

Watching. worktrunk solves a real problem (worktree lifecycle management) but Claude Squad already handles worktrees as part of its session management. Two scenarios where worktrunk becomes relevant:

1. **Worktree housekeeping**: If stale worktrees from crashed Claude Squad sessions accumulate on Mac Mini, worktrunk's batch cleanup (`worktrunk clean`) would be a useful maintenance tool alongside Claude Squad.
2. **Custom toolchain**: If we move away from Claude Squad toward a more composable setup (e.g., ccmanager + worktrunk + custom scripts), worktrunk would be the worktree management layer.

For now, Claude Squad's built-in worktree management is sufficient. Revisit if worktree housekeeping becomes a pain point on Mac Mini.

## Sources

- [GitHub: max-sixty/worktrunk](https://github.com/max-sixty/worktrunk)
- [awesome-claude-code](https://github.com/bwilliams-97/awesome-claude-code)

---
*Last reviewed: 2026-02-07*
