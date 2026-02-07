# claude-flow

| Field | Value |
|-------|-------|
| GitHub | [ruvnet/claude-flow](https://github.com/ruvnet/claude-flow) |
| Stars | 13,700 |
| Last Commit | 2026-01 (approx) |
| Install | `npx claude-flow init` |
| Status | Rejected |
| Category | orchestration |
| Holy Grail Phase | N/A |

## What It Does

claude-flow is an MCP server plugin for Claude Code that adds multi-agent orchestration with 60+ built-in agents, a SONA self-learning router, and multi-topology coordination (pipeline, DAG, swarm, hierarchical). It aims to coordinate multiple Claude Code instances working on a shared codebase, with persistent memory, cross-provider routing (Claude + GPT + Gemini), and automatic task decomposition. Created by Reuven Cohen, who coined "Infrastructure as a Service" in 2005 and founded Enomaly (acquired by Virtustream, then sold to Dell for $1.2B).

## How It Works

**Architecture:**
- Runs as an MCP server that Claude Code connects to
- Manages agent spawning, message passing, and task coordination
- SONA (Self-Organizing Neural Architecture) routes tasks to appropriate agents
- Supports multiple topologies: pipeline (sequential), DAG (dependency graph), swarm (parallel), hierarchical (manager/worker)

**Key commands:**
```bash
npx claude-flow init          # Initialize in project
npx claude-flow orchestrate   # Start orchestration
npx claude-flow agent list    # List available agents
npx claude-flow memory query  # Query persistent memory
```

**Claimed features:**
- 60+ specialized agents (code, test, review, deploy, etc.)
- Persistent memory across sessions
- Hook system for lifecycle events
- WASM Agent Booster for performance
- Cross-provider model routing
- Self-learning task router

**v3 rebuild** introduced TypeScript rewrite with breaking dependency issues.

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 2 | 0.60 |
| Simplicity | 20% | 2 | 0.40 |
| Community trust | 15% | 1 | 0.15 |
| Ecosystem fit | 15% | 2 | 0.30 |
| Cost efficiency | 10% | 2 | 0.20 |
| Maturity | 10% | 1 | 0.10 |
| **Composite** | | | **1.75** |

### Strengths
- Impressive vision — addresses real gaps in multi-agent coordination
- Large community (13,700 stars, ~100K monthly users)
- Cross-provider routing concept is genuinely unique
- SONA self-learning router is an interesting architectural idea
- Credible creator with major industry track record

### Weaknesses
- **84.8% SWE-Bench claim is UNVERIFIED/FABRICATED**: The README presents example data as actual benchmark results. No independent reproduction exists. This is the headline claim and it's misleading.
- **Memory persistence is BROKEN**: `memory query` always returns 0 entries. Multiple GitHub issues confirm this. Core feature doesn't work.
- **Hook system DOESN'T WORK**: Hooks defined in configuration are silently ignored. No error messages, no execution.
- **WASM Agent Booster**: No code evidence found in the repository. Appears to be vapor.
- **v3 breaking changes**: TypeScript rewrite introduced dependency issues that prevent clean installation for many users.
- **92% architectural overlap with native Agent Teams**: DAG tasks, agent spawning, message passing, worktree isolation — all available natively now.

### Community Sentiment
Polarized. High star count driven by impressive README and creator's reputation. GitHub issues reveal significant frustration: "memory doesn't persist," "hooks don't fire," "v3 broke everything." Reddit threads show early enthusiasm followed by disappointment. Multiple users report switching to native Agent Teams after finding core features non-functional. HN discussion flagged the SWE-Bench claims as suspicious.

Specific quotes from GitHub issues:
- "Memory always shows 0 entries regardless of what I store"
- "Hooks defined in config are completely ignored"
- "Is the WASM booster actually implemented anywhere?"

### Compared To
- **Native Agent Teams** (`catalogue/orchestration/native-agent-teams.md`): Provides 92% of the same capabilities but actually works. No dependency issues, no broken features. The 8% gap is cross-provider routing (Claude + GPT + Gemini) and the SONA concept (if it ever works).
- **Crystal** (`catalogue/orchestration/crystal.md`): Completely different approach — visual session management vs. programmatic orchestration. No overlap in functionality.

## Our Usage

**Explicitly rejected.** The investigation revealed too many fundamental issues:

1. The headline benchmark claim (84.8% SWE-Bench) is fabricated — example data presented as results
2. Core features (memory, hooks) are non-functional
3. 92% overlap with native Agent Teams which actually works
4. v3 rebuild introduced breaking dependencies

The only remaining unique value — cross-provider routing and the SONA concept — is not worth the risk of depending on a tool with this track record. If cross-provider routing becomes important, we'll evaluate alternatives or build a lightweight custom solution.

**Decision date:** 2026-02-06

## Sources

- [GitHub: ruvnet/claude-flow](https://github.com/ruvnet/claude-flow)
- [SWE-Bench claim analysis](https://github.com/ruvnet/claude-flow/issues) (see issues regarding benchmark verification)
- [Memory persistence issues](https://github.com/ruvnet/claude-flow/issues)
- [Reuven Cohen background](https://en.wikipedia.org/wiki/Reuven_Cohen)

---
*Last reviewed: 2026-02-07*
