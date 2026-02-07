# ClaudeKit

| Field | Value |
|-------|-------|
| GitHub | [carlrannaberg/claudekit](https://github.com/carlrannaberg/claudekit) |
| Stars | 581 |
| Last Commit | Recent (active) |
| Install | `npm install -g claudekit && claudekit setup` |
| Status | Evaluated |
| Category | Execution |
| Holy Grail Phase | Phase 4 (Autonomous Execution) |

## What It Does

CLI toolkit providing smart guardrails for Claude Code development. Key features: git checkpoint system (automatic savepoints when Claude stops), real-time error prevention (blocks `any` types, detects sensitive file access), multi-agent code review (6 parallel specialized reviewers), and 20+ subagents for domain expertise.

## How It Works

- **Checkpointing:** Auto-creates git savepoints, restore via `/checkpoint:restore`
- **Error prevention:** Pre-edit hooks block problematic patterns, run linting/tests as files change
- **Code review:** 6 parallel agents (architecture, security, performance, testing, quality, docs)
- **Subagents:** Domain experts (TypeScript, React, database, testing) plus research and triage
- **Codebase navigation:** Automatic mapping provides invisible context to Claude
- Requires Node.js 20+, works best with Claude Max plan

## Evaluation

**Strengths:**
- Checkpointing is directly useful for Ralph loops -- rollback on bad iterations
- Error prevention hooks are practical and immediately valuable
- Parallel code review is a nice pattern for quality gates
- npm install is familiar, Node.js aligns with our stack

**Weaknesses:**
- 581 stars and 95 forks -- moderate adoption
- "Smart guardrails" philosophy may conflict with autonomous execution (too restrictive for Ralph?)
- 20+ subagents adds prompt overhead
- Overlaps with our planned hook system and shared agents

**Community Sentiment:** Solid reviews from quality-focused developers. Less popular with the "move fast" crowd.

**Compared To:** Oh-My-ClaudeCode (our chosen tool) focuses on autonomous execution modes. ClaudeKit focuses on quality guardrails. The checkpointing concept is the most unique feature -- could be replicated in our own hooks.

## Our Usage

Evaluated. The git checkpoint pattern is worth stealing for Ralph loops -- create a savepoint before each iteration, rollback if tests fail. Could implement this as a custom hook in `shared/templates/claude-code/hooks/` rather than adopting the full toolkit. The parallel code review pattern is also interesting for our reviewer agent.

## Sources

- [GitHub README](https://github.com/carlrannaberg/claudekit)

Last reviewed: 2026-02-06
