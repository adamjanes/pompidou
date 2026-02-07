# Claude Code Supervisor (ccc)

| Field | Value |
|-------|-------|
| GitHub | [guyskk/claude-code-supervisor](https://github.com/guyskk/claude-code-supervisor) |
| Stars | 37 |
| Last Commit | 2026-02-04 |
| Install | One-line script (see README) or download binary |
| Status | Evaluated |
| Category | execution |
| Holy Grail Phase | 3-Run |

## What It Does

Claude Code Supervisor (ccc) wraps Claude Code with automatic quality review that iterates until work is truly complete. It uses a Stop Hook to fork the full session context and evaluate actual work quality, preventing "fake completions" where AI claims done but delivers poor quality or leaves issues unresolved.

## How It Works

**Supervisor Mode** is the core feature:

1. Start `ccc`, chat with the Agent to confirm requirements
2. Enable with `/supervisor OK, start executing`
3. Agent executes task and stops, triggering Claude Code's Stop Hook
4. Supervisor (separate Claude instance) performs strict review with full context
5. If incomplete or low quality, Supervisor provides feedback and Agent continues
6. Repeats until Supervisor confirms work is complete

**Provider Switching**: Secondary feature allows switching between Kimi, GLM, MiniMax, and other Anthropic-compatible providers with one command.

**Configuration**: `~/.claude/ccc.json` merges base settings with provider-specific overrides. Custom supervisor prompts via `~/.claude/SUPERVISOR.md`.

**CLI**:
- `ccc glm` - switch provider and run
- `ccc` - run with current provider
- `ccc validate` - check provider config

## Evaluation

### Strengths
- Prevents premature completion claims by forking full context for review
- Stop Hook integration is cleaner than signal-based exit detection (vs ralph-claude-code)
- Configurable max iterations (default 20) and timeout (default 600s)
- Written in Go, single binary, cross-platform
- Supervisor prompt is customizable
- Supports multiple Anthropic-compatible providers

### Weaknesses
- Requires `bypassPermissions` mode (security concern in untrusted environments)
- No test coverage in repository
- Supervisor review doubles token cost for every stop
- Young project (created Dec 2025), only 37 stars
- Documentation assumes familiarity with Claude Code hooks
- Provider switching is niche feature for most users

### Community Sentiment

The project positions itself as "better than ralph-claude-code" by using context-aware review instead of signal detection. Found references in broader 2026 code review discussions ([9 Parallel AI Agents That Review My Code](https://hamy.xyz/blog/2026-02_code-reviews-claude-subagents), [Auto-Reviewing Claude's Code](https://www.oreilly.com/radar/auto-reviewing-claudes-code/)) suggesting iterative review workflows are a recognized pattern. No significant community discussion specific to this tool yet — too new.

### Compared To

- **vs ralph-claude-code**: ccc's Supervisor uses full context fork vs signal-based detection, claims to prevent fake completions
- **vs native code-review plugin**: Anthropic's official plugin reviews git diffs; ccc reviews task completion holistically
- **vs OMC Autopilot**: OMC has 32 specialized agents with model routing and TDD; ccc has simple stop-hook review

## Our Usage

**Not chosen.**

**Why not:**
- OMC Autopilot (our chosen Phase 3 tool) already includes multi-agent execution with built-in review agents
- The supervisor review doubles token cost at every stop — expensive for autonomous overnight runs
- We prefer native Claude Code hooks over wrapper binaries for transparency
- The provider switching feature doesn't apply to our Anthropic-only setup

**When we'd reconsider:**
- If OMC's review agents prove insufficient or too rigid
- If we need lightweight review for quick tasks without OMC overhead
- If the project matures significantly (500+ stars, active community)

## Sources

- [README](https://github.com/guyskk/claude-code-supervisor)
- [9 Parallel AI Agents That Review My Code](https://hamy.xyz/blog/2026-02_code-reviews-claude-subagents)
- [Auto-Reviewing Claude's Code - O'Reilly Radar](https://www.oreilly.com/radar/auto-reviewing-claudes-code/)
- [A Local Code Review System for Claude Code](https://medium.com/@ben.bowles/i-built-a-local-code-review-system-because-ai-agents-need-adult-supervision-21949ec600ef)

---
*Last reviewed: 2026-02-07*
