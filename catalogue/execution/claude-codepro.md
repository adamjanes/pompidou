# Claude CodePro (Claude Pilot)

| Field | Value |
|-------|-------|
| GitHub | [maxritter/claude-codepro](https://github.com/maxritter/claude-codepro) |
| Stars | 438 |
| Last Commit | Recent (active) |
| Install | `curl -fsSL https://raw.githubusercontent.com/maxritter/claude-pilot/main/install.sh \| bash` |
| Status | Watching |
| Category | Execution |
| Holy Grail Phase | Phase 4 (Autonomous Execution) |

## What It Does

Framework that enforces production-grade development practices in Claude Code. "Endless Mode" provides persistent memory across sessions via automatic handoffs when context limits approach. Spec-driven development creates implementation plans in `docs/plans/` for review before execution. TDD enforcement via pre-edit hooks warns when modifying code without failing tests first.

## How It Works

- **Endless Mode:** Automatic context handoff between sessions, persistent memory eliminates re-explanation
- **Spec-driven flow:** Plan -> Approve -> Implement -> Verify, with automatic retry on failures
- **TDD hook:** Pre-edit hook blocks code changes that lack corresponding failing tests
- **Quality automation:** Language-specific hooks for Python, TypeScript, Go; integrated language servers
- Run via `pilot` command, `/sync` loads rules, `/spec` triggers planned features
- Commercial source-available license (not MIT)

## Evaluation

**Strengths:**
- Endless Mode directly addresses session continuity -- our biggest Ralph loop pain point
- TDD enforcement is genuinely useful for code quality
- Spec-driven workflow aligns with our OpenSpec approach
- Clean UX (single command to start)

**Weaknesses:**
- Commercial license -- not MIT, may have restrictions
- Smaller community (438 stars) limits ecosystem
- Overlaps heavily with Oh-My-ClaudeCode + OpenSpec combination
- "Pilot" branding suggests it may have renamed from "CodePro" -- potential confusion
- Installs via curl pipe to bash (security concern)

**Community Sentiment:** Small but enthusiastic user base. Praised for session continuity features.

**Compared To:** Oh-My-ClaudeCode (our chosen tool) handles autonomous execution. OpenSpec handles specs. claude-auto-resume handles session limits. Together they cover what CodePro does, with more modularity and MIT licensing.

## Our Usage

Watching. The Endless Mode concept is compelling -- if our Oh-My-ClaudeCode + claude-auto-resume combo doesn't handle session continuity well enough, CodePro's approach is worth revisiting. The TDD hook idea could be replicated in our own `.claude/hooks/`.

## Sources

- [GitHub README](https://github.com/maxritter/claude-codepro)

Last reviewed: 2026-02-06
