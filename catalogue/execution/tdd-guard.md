# TDD Guard

| Field | Value |
|-------|-------|
| **GitHub** | [nizos/tdd-guard](https://github.com/nizos/tdd-guard) |
| **Stars** | 1,700 |
| **Last Commit** | Active (2026) |
| **Install** | `npm install -g tdd-guard` or `brew install tdd-guard` |
| **Status** | Watching |
| **Category** | Execution (Hooks / Quality) |
| **Holy Grail Phase** | 3-Run |

## What It Does

TDD Guard is a hooks-driven TDD enforcement tool for Claude Code. It intercepts file write and edit operations and blocks implementations that violate test-driven development principles: writing code before tests exist, implementing beyond what tests require, or skipping the RED-GREEN-REFACTOR cycle. It is a quality gate that prevents autonomous agents from writing untested code -- critical for Ralph loops running overnight without human review.

## How It Works

### Hook Architecture

TDD Guard operates through three Claude Code hooks:

| Hook | Trigger | Purpose |
|------|---------|---------|
| **PreToolUse** | `Write`, `Edit`, `MultiEdit`, `TodoWrite` | Validates that file changes comply with TDD -- blocks implementation without failing tests |
| **UserPromptSubmit** | User prompts | Processes prompts for TDD compliance |
| **SessionStart** | `startup`, `resume`, `clear` | Initializes enforcement per session |

### Enforcement Rules

1. **No implementation without failing tests** -- blocks code creation if corresponding tests don't exist or aren't failing
2. **Minimal implementation** -- stops over-engineering beyond what current tests require
3. **Linting integration** -- uses project linting rules for automated refactoring guidance
4. **Customizable rules** -- can be configured to match project-specific TDD conventions

### Language Support

Each language requires a specific test reporter that pipes results to `.claude/tdd-guard/data/test.json`:

| Language | Framework | Reporter |
|----------|-----------|----------|
| JavaScript/TypeScript | Vitest, Jest, Storybook | Built-in |
| Python | pytest | tdd-guard-pytest |
| PHP | PHPUnit | tdd-guard/phpunit |
| Go | Native | tdd-guard-go |
| Rust | cargo, cargo-nextest | tdd-guard-rust |

### Session Management

TDD enforcement can be toggled on/off mid-session without restarting. This is useful when doing non-code tasks (documentation, configuration) where TDD enforcement would be counterproductive.

### Requirements

- Node.js 22+
- Anthropic API key or Claude Code integration
- Language-specific test reporter installed and configured

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 4 | 1.20 |
| Simplicity | 20% | 3 | 0.60 |
| Community trust | 15% | 3 | 0.45 |
| Ecosystem fit | 15% | 4 | 0.60 |
| Cost efficiency | 10% | 5 | 0.50 |
| Maturity | 10% | 3 | 0.30 |
| **Composite** | | | **3.65** |

### Strengths
- Hooks-based enforcement is the right architectural choice -- operates at the tool level, not prompt level
- Multi-language support covers our full stack (TypeScript via Vitest, Python via pytest)
- Prevents the #1 risk of autonomous agents: writing untested code that looks correct but isn't
- Session toggle means it doesn't block non-code work
- Customizable rules allow matching project conventions
- The PreToolUse hook intercepts *before* code is written, not after

### Weaknesses
- Requires per-language reporter setup -- adds complexity to project bootstrapping
- Does **not** validate modifications made through MCPs or shell commands (acknowledged roadmap gap)
- Runs with full user file system permissions -- security depends on code review before use
- Smaller community (1.7K stars) compared to comprehensive tools
- Node.js 22+ requirement may conflict with projects pinned to older versions
- Project root path must be specified for monorepos or non-standard directory structures

### Community Sentiment
Niche but enthusiastic. Users who adopt TDD Guard tend to be strict TDD practitioners. The tool fills a gap that no other Claude Code plugin addresses as directly. The MCP/shell escape hatch is the most cited limitation.

### Compared To
- **Superpowers TDD skill**: Superpowers includes TDD enforcement as one of 20+ skills. TDD Guard is laser-focused on just TDD, with deeper hook integration.
- **Everything Claude Code TDD agent**: Broader but less strict. TDD Guard actually *blocks* non-compliant writes; Everything Claude Code *suggests* TDD.
- **Manual TDD discipline**: Autonomous agents don't have discipline. TDD Guard enforces it mechanically.

## Our Usage

**Plan:** Quality gate for Ralph loops. The primary risk of autonomous overnight execution is agents producing plausible but untested code. TDD Guard addresses this directly by blocking implementation without failing tests.

**Integration points:**
- Install globally: `npm install -g tdd-guard`
- Add hooks to each project's `.claude/settings.local.json` during bootstrap (Phase 1)
- Configure Vitest reporter for TypeScript projects, pytest reporter for Python scripts
- Enable for all Ralph loop sessions; toggle off only for documentation/config tasks

**Concerns:**
- The MCP/shell escape hatch means agents could bypass TDD Guard by writing code through shell commands instead of the Write tool. Need to verify how Oh-My-ClaudeCode's execution modes interact with this.
- Reporter setup per language adds to project bootstrap complexity. Include in `shared/scripts/bootstrap-claude.sh`.
- If Superpowers is adopted, its built-in TDD skill may make TDD Guard redundant. Need to test whether Superpowers' TDD enforcement is as strict as TDD Guard's hook-level blocking.

**Decision:** High priority for Phase 3-Run. Even if Superpowers provides TDD methodology, TDD Guard's hook-level enforcement is a harder guarantee. They can likely coexist -- Superpowers guides the workflow, TDD Guard enforces the constraint.

## Sources

- [GitHub Repository](https://github.com/nizos/tdd-guard)

---
*Last reviewed: 2026-02-06*
