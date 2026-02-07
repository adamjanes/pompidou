# Destructive Command Guard

| Field | Value |
|-------|-------|
| GitHub | [kenryu42/claude-code-safety-net](https://github.com/kenryu42/claude-code-safety-net) |
| Stars | 976 |
| Last Commit | Feb 2026 |
| Install | See README (Rust-based hook) |
| Status | Watching |
| Category | execution |
| Holy Grail Phase | 3-Run (Supporting) |

## What It Does

Safety net that catches destructive git and filesystem commands before Claude Code executes them. Intercepts commands like `rm -rf`, `git reset --hard`, `git push --force`, `DROP TABLE`, `chmod 777`, and other dangerous operations. Configurable severity levels with whitelist/blacklist approach. Written in Rust for performance. Essential safety layer for autonomous execution where `--dangerously-skip-permissions` is enabled.

## How It Works

Integrates as a PreToolUse hook for Bash commands. Before any shell command executes, the guard parses the command and checks it against a configurable list of destructive patterns. Matching commands are blocked with an explanation. Severity levels allow different responses (warn, block, require confirmation). Rust implementation ensures near-zero latency overhead.

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 3 | 0.90 |
| Simplicity | 20% | 4 | 0.80 |
| Community trust | 15% | 3 | 0.45 |
| Ecosystem fit | 15% | 4 | 0.60 |
| Cost efficiency | 10% | 5 | 0.50 |
| Maturity | 10% | 3 | 0.30 |
| **Composite** | | | **3.55** |

### Strengths
- Catches dangerous commands before execution — last line of defense
- Rust performance means negligible latency
- Configurable severity (warn vs block)
- Essential for `--dangerously-skip-permissions` mode
- Active development (Feb 2026 last commit)
- Reasonable adoption (976 stars)

### Weaknesses
- Pattern-based — may miss creative destruction commands
- May block legitimate destructive commands during cleanup tasks
- Rust dependency for building from source
- Cannot catch all dangerous side effects (e.g., a Python script that deletes files)

### Community Sentiment

Positive. Developers running autonomous loops consider this "mandatory." Referenced alongside container-use as the minimum safety stack for unsupervised execution.

### Compared To

- **Scope Guard** — Intent-based (blocks unrelated edits) vs command-based (blocks dangerous commands). Complementary.
- **Container-use (Dagger)** — Full isolation vs command-level protection. Container-use is safer but heavier.
- **SafeClaw** — Docker containers + destructive command guard = belt and suspenders.

## Our Usage

Watching. Should be part of the safety stack for Phase 3 autonomous execution. The recommended safety layers in order: (1) git worktree isolation (built into Claude Squad), (2) destructive command guard (this tool), (3) Docker isolation (SafeClaw/Container-use). Evaluate when setting up Ralph loops on Mac Mini.

## Sources

- [GitHub: kenryu42/claude-code-safety-net](https://github.com/kenryu42/claude-code-safety-net)
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)

---
*Last reviewed: 2026-02-07*
