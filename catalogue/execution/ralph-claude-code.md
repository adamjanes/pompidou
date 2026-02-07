# ralph-claude-code

| Field | Value |
|-------|-------|
| GitHub | [frankbria/ralph-claude-code](https://github.com/frankbria/ralph-claude-code) |
| Stars | 6,372 |
| Last Commit | 2026-01 (active) |
| Install | `curl -sSL https://raw.githubusercontent.com/frankbria/ralph-claude-code/main/install.sh \| bash` |
| Status | Evaluated |
| Category | execution |
| Holy Grail Phase | 3-Run |

## What It Does

ralph-claude-code is an autonomous AI development loop for Claude Code with intelligent exit detection, circuit breakers, and safety guardrails. Created by Frank Bria, it is the most-starred community implementation of the Ralph Wiggum technique, adding the production-grade robustness that the official Anthropic plugin lacks. The key innovation is applying the circuit breaker pattern from microservice architecture to AI agent loops — detecting when an agent is stuck, spinning, or making no progress, and stopping it before it wastes tokens.

## How It Works

**Core loop:** Like all Ralph implementations, the fundamental pattern is a while loop feeding prompts to Claude Code. ralph-claude-code wraps this with multiple detection and safety layers.

**Intelligent exit detection (dual-condition gate):**
Both conditions must be true to exit:
1. Completion indicators detected in output (e.g., "all tests pass", "task complete")
2. Explicit EXIT_SIGNAL present

This prevents premature exits (Claude saying "done" when it isn't) and missed completions (Claude looping past the finish line).

**Circuit breaker pattern:**
The circuit breaker opens (halts the loop) under three conditions:
- **No progress** — No file changes for 3 consecutive iterations
- **Stuck loop** — Same error message output for 5 consecutive iterations
- **Anomalous output** — Output decreases by 70%+ compared to previous iteration (agent in "nothing to do" state)

**Additional safeguards:**
```bash
MAX_CONSECUTIVE_TEST_LOOPS=3       # Exit if agent just runs tests repeatedly
MAX_CONSECUTIVE_DONE_SIGNALS=2     # Exit on repeated "I'm done" without changes
TEST_PERCENTAGE_THRESHOLD=30%      # Flag if testing dominates recent iterations
```

**Error detection:**
- Two-stage filtering for error classification
- Multi-line error matching for complex stack traces
- Automatic recovery attempts before circuit breaker trips

**Usage:**
```bash
./ralph_loop.sh --prompt "Implement user authentication" --max-iterations 20
```

The system also includes a `ralph-enable` wizard for bootstrapping existing projects with Ralph loop configuration.

## Evaluation

### Strengths
- Circuit breaker pattern is a genuinely good idea — prevents the #1 problem with naive Ralph loops (infinite spinning)
- Dual-condition exit gate reduces both false positives and false negatives
- Configurable thresholds let you tune aggressiveness per project
- More robust than the official plugin for production use
- Active development (v0.9.8 as of Jan 2026, Phase 1 core complete)
- `ralph-enable` wizard lowers setup friction for existing projects
- Live streaming output mode for real-time monitoring
- Well-documented with SPECIFICATION_WORKSHOP.md and TESTING.md

### Weaknesses
- Shell script implementation (bash) — harder to extend than a plugin/npm package
- Still single-agent — no parallel execution or agent specialization
- Thresholds need tuning per project (what counts as "no progress" varies)
- v0.9.8 means pre-1.0 — API may change
- Documentation is thorough but spread across many markdown files in the repo
- The circuit breaker can be too aggressive for exploratory/research tasks where "no file changes" is expected
- No built-in model routing (always uses whatever model Claude Code defaults to)

### Community Sentiment

Strong positive reception in the agentic coding community. The DEV Community article on the circuit breaker pattern ("The Technology to Stop AI Agents") brought attention from the broader software engineering community, connecting the pattern to established microservice reliability concepts. Frank Bria's track record (6K+ GitHub stars across agentic coding projects) lends credibility. A Windows port (jvdsouza/windows-ralph-claude) and multiple forks (DmitrySolana, AI-App) indicate real adoption. The main praise centers on "finally, a Ralph loop that knows when to stop." The main criticism: it's still bash scripts, and some developers want a more structured (TypeScript/Rust) implementation.

### Compared To

- **Ralph Plugin (Official)** (`catalogue/execution/ralph-plugin.md`): The official plugin is simpler but lacks circuit breakers and intelligent exit detection. ralph-claude-code is the "production-hardened" version.
- **Oh My ClaudeCode** (`catalogue/execution/oh-my-claudecode.md`): OMC adds multi-agent orchestration, 5 modes, and model routing. ralph-claude-code focuses purely on making the single-agent loop robust. Different priorities.
- **ralph-orchestrator** (`catalogue/execution/ralph-orchestrator.md`): Rust-based, multi-backend, hat system. More complex and ambitious. ralph-claude-code is simpler and more focused.

## Our Usage

**Evaluated but not chosen as primary tool.** The circuit breaker pattern is excellent and the intelligent exit detection is the best in class. However, Oh My ClaudeCode covers our execution needs with more features (5 modes, model routing, cost monitoring), and its Autopilot mode provides comparable loop behavior.

The circuit breaker concepts from ralph-claude-code inform how we think about safety in any Ralph loop. If OMC proves insufficient for single-agent robustness, ralph-claude-code is the fallback.

Worth revisiting if: OMC's Autopilot mode proves less reliable at detecting stuck states, or if we need a lightweight loop without OMC's full framework.

## Sources

- [GitHub README](https://github.com/frankbria/ralph-claude-code)
- [CLAUDE.md](https://github.com/frankbria/ralph-claude-code/blob/main/CLAUDE.md)
- [ralph_loop.sh (core script)](https://github.com/frankbria/ralph-claude-code/blob/main/ralph_loop.sh)
- [Implementation Status](https://github.com/frankbria/ralph-claude-code/blob/main/IMPLEMENTATION_STATUS.md)
- [DEV Community: Circuit Breaker Pattern for AI Agents](https://dev.to/tumf/ralph-claude-code-the-technology-to-stop-ai-agents-how-the-circuit-breaker-pattern-prevents-3di4)
- [Specification Workshop](https://github.com/frankbria/ralph-claude-code/blob/main/SPECIFICATION_WORKSHOP.md)

---
*Last reviewed: 2026-02-07*
