# Ralph Orchestrator

| Field | Value |
|-------|-------|
| GitHub | [mikeyobrien/ralph-orchestrator](https://github.com/mikeyobrien/ralph-orchestrator) |
| Stars | 1,673 |
| Last Commit | 2026-01 (active) |
| Install | `npm install -g ralph-orchestrator` or `cargo install ralph-cli` or `npx ralph-orchestrator` |
| Status | Evaluated |
| Category | execution |
| Holy Grail Phase | 3-Run |

## What It Does

Ralph Orchestrator is a Rust-based, multi-backend autonomous agent orchestration framework implementing an improved version of the Ralph Wiggum technique. It supports 7 AI backends (Claude Code, Kiro, Gemini CLI, Codex, Amp, Copilot CLI, OpenCode), features a "Hat System" for specialized agent personas, event-driven coordination, backpressure enforcement, and an interactive TUI for monitoring. The philosophy is "deterministically bad in an undeterministic world" — it fails predictably in ways you can diagnose and fix, improving through iterative tuning.

## How It Works

**Hat System:**
The core abstraction is "hats" — specialized personas that agents wear during different phases of work. You define the roles that fit your workflow (coder, reviewer, tester, documenter, security auditor, etc.), and hats coordinate through typed events with glob pattern matching.

```yaml
# Example hat configuration
hats:
  coder:
    backend: claude-code
    triggers: ["task.assigned", "review.revision-needed"]
    emits: ["code.complete", "test.needed"]
  reviewer:
    backend: claude-code
    triggers: ["code.complete"]
    emits: ["review.approved", "review.revision-needed"]
  tester:
    backend: gemini-cli
    triggers: ["code.complete", "review.approved"]
    emits: ["test.passed", "test.failed"]
```

**Event-driven coordination:**
Hats communicate through typed events. When a coder completes work, it emits `code.complete`, which triggers the reviewer and tester hats. This creates a natural workflow without centralized control.

**Backpressure enforcement:**
Gates reject incomplete work. If tests don't pass, lint fails, or typecheck errors exist, the gate blocks progression. This prevents the common Ralph loop problem of agents moving forward with broken code.

**7 AI backends:**

| Backend | Recommended For |
|---------|-----------------|
| Claude Code | Complex reasoning, balanced performance |
| Kiro | AWS-integrated projects |
| Gemini CLI | Large context window requirements |
| Codex | OpenAI ecosystem |
| Amp | Sourcegraph-integrated workflows |
| Copilot CLI | GitHub-native workflows |
| OpenCode | Open-source alternative |

**Additional features:**
- **Presets library** — 20+ pre-configured workflows for common patterns
- **Interactive TUI** — Terminal UI for monitoring agent activity in real time
- **Session recording** — Capture and replay agent sessions for debugging
- **Persistent learning** — Runtime work tracking that improves across sessions

**Installation options:**
```bash
npm install -g ralph-orchestrator    # Global npm
npx ralph-orchestrator               # Run directly
cargo install ralph-cli              # Rust native
brew install ralph-orchestrator      # Homebrew
```

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 4 | 1.20 |
| Simplicity | 20% | 2 | 0.40 |
| Community trust | 15% | 3 | 0.45 |
| Ecosystem fit | 15% | 2 | 0.30 |
| Cost efficiency | 10% | 4 | 0.40 |
| Maturity | 10% | 2 | 0.20 |
| **Composite** | | | **2.95** |

### Strengths
- Multi-backend support (7 backends) provides vendor flexibility
- Hat System is an elegant abstraction for agent specialization
- Event-driven coordination avoids centralized bottlenecks
- Backpressure gates enforce quality before progression — genuinely useful
- Rust implementation means fast startup and low resource usage
- 20+ workflow presets lower the barrier to entry
- Session recording is valuable for debugging failed runs
- Interactive TUI provides real-time visibility
- Active development (v2.0 released, v2.1.1 on Homebrew)

### Weaknesses
- More complex than needed for single-backend (Claude Code only) workflows
- Hat System + event-driven coordination has a significant learning curve
- 7 backends means testing surface is large — edge cases likely in less-used backends
- "Expect rough edges and breaking changes between releases" (from README)
- Smaller community than OMC or ralph-claude-code
- The philosophy of "deterministically bad" is honest but not confidence-inspiring
- Requires tuning — "improving through iterative tuning" means it doesn't work great out of the box
- Overkill for our current single-backend setup

### Community Sentiment

Moderate positive reception. The Rust implementation and multi-backend support attract developers who want vendor flexibility. The Hat System concept gets praise for being a clean abstraction, though some find it over-engineered for simple use cases. The comprehensive documentation site (mikeyobrien.github.io/ralph-orchestrator) with research/theory pages shows intellectual ambition. The comparison matrix page positions it against other tools transparently. The FAQ addresses common concerns about complexity honestly. The main criticism on forums: it tries to do too much — developers who just want a reliable Claude Code loop prefer simpler tools. The "expect rough edges" warning in the README is both appreciated for honesty and cited as a reason to wait.

### Compared To

- **Oh My ClaudeCode** (`catalogue/execution/oh-my-claudecode.md`): OMC is Claude Code-specific with zero config. Ralph Orchestrator is multi-backend with significant config. For Claude Code-only users (us), OMC is simpler. For multi-backend shops, Ralph Orchestrator wins.
- **ralph-claude-code** (`catalogue/execution/ralph-claude-code.md`): Frank Bria's version focuses on making the single-agent loop robust (circuit breakers). Ralph Orchestrator focuses on multi-agent coordination (hats, events). Different problems.
- **Ralph Plugin (Official)** (`catalogue/execution/ralph-plugin.md`): The official plugin is the minimal loop. Ralph Orchestrator is the maximalist version with every feature imaginable.

## Our Usage

**Evaluated but not chosen.** Ralph Orchestrator is the most ambitious tool in this category, and the Hat System + event-driven coordination is architecturally interesting. However, it's more complex than we need right now:

1. We only use Claude Code (don't need 7 backends)
2. Oh My ClaudeCode provides multi-agent execution with zero config
3. The learning curve for hats + events + presets is high
4. "Expect rough edges" is not ideal for a system we want running autonomously overnight

Would reconsider if: we adopt multiple AI backends (e.g., Gemini for large-context tasks), or if OMC proves insufficient for complex multi-agent coordination. The backpressure gate concept is worth borrowing regardless — enforcing test/lint/typecheck passes before progression is a pattern we should implement in any execution tool.

## Sources

- [GitHub README](https://github.com/mikeyobrien/ralph-orchestrator)
- [Documentation Site](https://mikeyobrien.github.io/ralph-orchestrator/)
- [Quick Start Guide](https://mikeyobrien.github.io/ralph-orchestrator/getting-started/quick-start/)
- [Concepts: Hat System](https://mikeyobrien.github.io/ralph-orchestrator/concepts/)
- [Agent Comparison Matrix](https://mikeyobrien.github.io/ralph-orchestrator/06-analysis/comparison-matrix/)
- [Research and Theory](https://mikeyobrien.github.io/ralph-orchestrator/research/)
- [Homebrew listing](https://libraries.io/homebrew/ralph-orchestrator)
- [Lib.rs: ralph-cli](https://lib.rs/crates/ralph-cli)

---
*Last reviewed: 2026-02-07*
