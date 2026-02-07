# Superpowers

| Field | Value |
|-------|-------|
| **GitHub** | [obra/superpowers](https://github.com/obra/superpowers) |
| **Stars** | 46,100 |
| **Last Commit** | Active (2026) |
| **Install** | `/plugin marketplace add obra/superpowers-marketplace` then `/plugin install superpowers@superpowers-marketplace` |
| **Status** | Watching |
| **Category** | Execution |
| **Holy Grail Phase** | 3-Run |

## What It Does

Superpowers is an agentic skills framework that gives Claude Code a structured software development methodology. Rather than letting the agent jump straight into coding, it auto-triggers composable "skills" that guide the agent through brainstorming, planning, test-driven development, code review, and branch management. The result is that Claude can work autonomously for hours without deviating from an approved plan -- it provides the *how to work* that execution engines like Oh-My-ClaudeCode don't offer.

## How It Works

### Workflow Phases

1. **Brainstorm** (`/brainstorm`) -- Refines ideas through Socratic questioning, presents design in digestible sections before any code is written.
2. **Git Worktrees** -- Creates isolated workspaces on separate branches with test baseline verification, keeping experimental work off main.
3. **Planning** (`/write-plan`) -- Breaks work into 2-5 minute tasks with exact file paths and verification steps.
4. **Development** (`/execute-plan`) -- Executes tasks either via subagents or batched implementation with checkpoints.
5. **TDD** -- Enforces RED-GREEN-REFACTOR cycle. Tests must fail first, then pass with minimal implementation.
6. **Code Review** -- Multi-stage validation against plan; critical issues block progress.
7. **Branch Completion** -- Verifies all tests pass, then offers merge/PR/discard options.

### Key Skills (20+ included)

- Test-driven development (RED-GREEN-REFACTOR enforcement)
- Systematic debugging (4-phase root cause analysis)
- Parallel agent dispatching for independent tasks
- Git worktree management
- Skill creation framework (write your own skills)

### Architecture

Skills live in a `/skills` directory and auto-trigger based on development context. The framework is primarily Shell (76%), JavaScript (12%), Python (6%), TypeScript (4%). It works natively as a Claude Code plugin, with manual setup paths for Codex and OpenCode.

## Evaluation

### Strengths
- Provides structured *methodology*, not just execution tooling -- the missing layer in most setups
- TDD enforcement is baked in, not optional
- Subagent-driven development with two-stage review (spec compliance, then code quality)
- Design-first approach prevents premature coding (YAGNI, DRY principles enforced)
- Massive community adoption (46K stars) means battle-tested patterns
- Plugin marketplace install is zero-friction

### Weaknesses
- Platform-specific installation for non-Claude Code agents (Codex, OpenCode) is more complex
- Opinionated workflow may conflict with existing project conventions
- 20+ skills can be overwhelming; unclear which activate when without reading source
- No explicit documentation on customizing or disabling individual skills

### Community Sentiment
Extremely positive. 46K stars in a short period suggests strong word-of-mouth. The author (Jesse/obra) is a well-known open source contributor. The project is MIT licensed and actively maintained.

### Compared To
- **Oh-My-ClaudeCode**: Provides execution *modes* (auto, plan, review) but not structured methodology. Superpowers fills the methodology gap.
- **Compound Engineering**: Similar planning-first philosophy but lighter on TDD enforcement. Superpowers is more comprehensive.
- **TDD Guard**: Focuses solely on TDD hooks. Superpowers includes TDD as one skill among many.

## Our Usage

**Plan:** Layer Superpowers on top of Oh-My-ClaudeCode for Ralph loops. Oh-My-ClaudeCode handles the execution mode and auto-resume; Superpowers provides the structured development methodology within each iteration. Specifically:

- Use `/brainstorm` and `/write-plan` during the spec-to-task handoff (Phase 1-Spec to Phase 2-Task)
- Use `/execute-plan` with subagents for Phase 3-Run autonomous execution
- TDD enforcement improves Ralph loop output quality without human review
- Git worktree isolation prevents Ralph from polluting main during overnight runs

**Watch for:** Potential conflicts between Superpowers' skill auto-triggering and Oh-My-ClaudeCode's execution modes. Test on a single project (frequency-first) before rolling out.

## Sources

- [GitHub Repository](https://github.com/obra/superpowers)
- [Plugin Marketplace](https://github.com/obra/superpowers-marketplace)

---
*Last reviewed: 2026-02-06*
