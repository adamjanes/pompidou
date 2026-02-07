# ccmanager

| Field | Value |
|-------|-------|
| GitHub | [kbwo/ccmanager](https://github.com/kbwo/ccmanager) |
| Stars | 815 |
| Last Commit | Feb 2026 |
| Install | `cargo install ccmanager` |
| Status | Watching |
| Category | process |
| Holy Grail Phase | 3-Run |

## What It Does

ccmanager is a CLI application for managing multiple AI coding agent sessions across git worktrees. Unlike Claude Squad, which is Claude Code-specific and tmux-dependent, ccmanager supports 8 different coding agents: Claude Code, Gemini CLI, Codex CLI, Cursor Agent, Copilot CLI, Cline CLI, OpenCode, and Kimi CLI. It provides real-time session status monitoring (idle/busy/waiting), git worktree isolation for parallel work, and the ability to copy conversation history between worktrees. Designed for developers who use multiple AI coding tools and want a single manager for all of them.

## How It Works

**Key concepts:**
- **Multi-agent sessions**: Each session can run any of the 8 supported coding agents. Sessions are not tied to a single tool — you can run Claude Code on one worktree and Codex on another simultaneously.
- **Git worktree isolation**: Like Claude Squad, each session gets its own git worktree. Changes are isolated and can be merged independently.
- **Real-time status monitoring**: Sessions report their current state (idle, busy, waiting for input) so you can see at a glance which agents need attention.
- **Conversation history copy**: Unique feature — you can copy the conversation context from one worktree session to another, enabling handoffs between agents or continuing work in a fresh worktree.
- **No tmux dependency**: Runs as a standalone process without requiring tmux. This simplifies setup, especially on systems where tmux configuration is a friction point.

**Usage:**
```bash
# Install
cargo install ccmanager

# Start managing sessions
ccmanager

# Create sessions for different agents
# Each session gets its own worktree and agent type
```

**Workflow:**
1. Launch ccmanager
2. Create sessions, specifying the agent type (claude, gemini, codex, etc.)
3. Each session runs in its own git worktree
4. Monitor session status from the CLI dashboard
5. Copy conversation history between sessions if needed
6. Merge worktree branches when work is complete

## Evaluation

### Strengths
- Multi-agent support (8 agents) — the only session manager that handles Claude Code, Gemini CLI, Codex CLI, and others in a unified interface
- No tmux dependency — simpler setup, fewer moving parts, no tmux configuration headaches
- Real-time status monitoring with idle/busy/waiting states provides immediate visibility
- Conversation history copy between worktrees is unique and enables agent handoffs
- Lighter and simpler than Claude Squad — fewer abstractions, more direct control
- Written in Rust (via Cargo) — fast, single binary, minimal resource overhead

### Weaknesses
- Lower star count (815 vs Claude Squad's ~5,000) — smaller community, fewer battle-tested reports
- CLI-only interface — no TUI dashboard like Claude Squad's navigable panel
- May lack the mature feature set of Claude Squad (session persistence, auto-accept toggle, etc.)
- Rust/Cargo install may be a barrier for developers without a Rust toolchain
- Less Claude Code-specific optimization — generalist approach means less depth per agent

### Community Sentiment

Early but positive reception. Developers on Reddit and GitHub praise the multi-agent approach as forward-thinking — "finally something that doesn't assume you only use Claude." The no-tmux architecture resonates with developers who find tmux-based tools brittle or overengineered for session management. The conversation history copy feature gets specific callouts as a differentiator. Comparisons to Claude Squad are frequent, with the consensus being ccmanager trades TUI polish for broader agent support. Some concern about the smaller community size and whether the project will keep pace with Claude Squad's development velocity.

### Compared To

- **Claude Squad** (`catalogue/process/claude-squad.md`): Claude Squad has a polished TUI, higher adoption (~5,000 stars), and Claude Code-specific features like auto-accept toggle. But it depends on tmux and only supports Claude Code. ccmanager trades the TUI for multi-agent support and tmux independence.
- **Crystal**: Desktop app with visual diff comparison. Different paradigm — GUI vs CLI. Crystal is for visual exploration, ccmanager is for headless multi-agent management.
- **Gas Town**: Much heavier orchestration layer managing 20-30 agents. ccmanager is lighter and more focused on session management rather than full orchestration.

## Our Usage

Watching. ccmanager is the most interesting alternative to Claude Squad for session management. Two scenarios where it becomes relevant:

1. **If tmux setup on Mac Mini proves problematic** — ccmanager's tmux-free architecture would eliminate that friction entirely.
2. **If we adopt multiple AI coding tools** — currently all-in on Claude Code, but if Codex CLI or Gemini CLI mature and we want to run them alongside Claude Code, ccmanager is the only tool that manages all of them.

For now, Claude Squad remains our chosen process manager because we are Claude Code-only and its TUI is more polished. Revisit if our tool stack diversifies.

## Sources

- [GitHub: kbwo/ccmanager](https://github.com/kbwo/ccmanager)
- [Reddit: r/ClaudeAI discussions](https://reddit.com/r/ClaudeAI)
- [awesome-claude-code](https://github.com/bwilliams-97/awesome-claude-code)

---
*Last reviewed: 2026-02-07*
