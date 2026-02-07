# Ralph Loop Agent

| Field | Value |
|-------|-------|
| GitHub | [vercel-labs/ralph-loop-agent](https://github.com/vercel-labs/ralph-loop-agent) |
| Stars | 654 |
| Last Commit | 2026-01 (active) |
| Install | `npm install ralph-loop-agent ai zod` |
| Status | Evaluated |
| Category | execution |
| Holy Grail Phase | 3-Run |

## What It Does

Ralph Loop Agent is Vercel's TypeScript SDK wrapper that provides a framework for continuous AI agent autonomy. It wraps the Vercel AI SDK's tool-calling capabilities in an outer loop that persists until a verification callback confirms task completion. Think of it as `while (true)` for AI autonomy — the agent works, an evaluator checks the result, and if it's not done, the agent tries again with context from previous attempts. The key differentiator is the programmatic verification system and first-class TypeScript SDK integration, making it embeddable in existing Node.js applications rather than being a standalone CLI tool.

## How It Works

**Nested loop architecture:**
- **Outer loop** — Runs iterations until `verifyCompletion` callback returns success
- **Inner loop** — Standard AI SDK tool-calling between LLM and available functions
- **Verification step** — Custom completion checker provides feedback or approves

**Core API:**
```typescript
import { loop, iterationCountIs } from 'ralph-loop-agent';

const result = await loop({
  model: anthropic('claude-sonnet-4-20250514'),
  system: 'You are a coding assistant...',
  prompt: 'Build a REST API for...',
  tools: { /* AI SDK tools */ },
  verifyCompletion: async ({ text, iterations }) => {
    // Custom verification logic
    return { completed: true }; // or { completed: false, feedback: 'Fix X' };
  },
  stopConditions: [iterationCountIs(10)],
});
```

**Stop conditions** (combinable — stops when any triggers):
- `iterationCountIs(n)` — Limit by iteration count
- `tokenCountIs(n)` — Limit by total token usage
- `costIs(maxCost, rates?)` — Limit by estimated cost

**Streaming support:** `stream()` method streams the final iteration after non-streaming completion loops. Lifecycle hooks (`onIterationStart`, `onIterationEnd`) enable logging and monitoring.

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 3 | 0.90 |
| Simplicity | 20% | 2 | 0.40 |
| Community trust | 15% | 3 | 0.45 |
| Ecosystem fit | 15% | 2 | 0.30 |
| Cost efficiency | 10% | 3 | 0.30 |
| Maturity | 10% | 4 | 0.40 |
| **Composite** | | | **2.75** |

### Strengths
- Vercel authorship provides credibility and likely long-term maintenance
- Programmatic verification callbacks enable custom completion logic beyond test passing
- First-class TypeScript/AI SDK integration — embeddable in existing apps
- Flexible stop conditions (iterations, tokens, cost) are composable
- Clean API design with streaming support
- Feedback injection on failed verification guides subsequent attempts

### Weaknesses
- TypeScript SDK approach means it's not a drop-in CLI tool — requires writing code to use
- Tied to Vercel AI SDK ecosystem — not portable to other runtimes
- No built-in agents, task tracking, or workflow presets — you build everything yourself
- 654 stars is moderate — less battle-tested than Snarktank Ralph (9.6k)
- No task decomposition — operates on a single prompt, not a task list
- Requires Node.js runtime and AI SDK dependencies

### Community Sentiment

Solid reception, especially among TypeScript developers already using the Vercel AI SDK. The verification callback pattern is frequently cited as the cleanest abstraction for "loop until done." Criticism centers on it being a building block rather than a complete solution — you need to build the task tracking, spec management, and agent orchestration yourself. Vercel's involvement lends confidence in API stability.

### Compared To

- **Oh My ClaudeCode** (`catalogue/execution/oh-my-claudecode.md`): OMC is a complete system (modes, agents, monitoring). Ralph Loop Agent is a building block — a programmable loop primitive you compose into your own system. Different abstraction levels.
- **Snarktank Ralph** (`catalogue/execution/snarktank-ralph.md`): Snarktank is a Bash script with PRD tracking. Ralph Loop Agent is a TypeScript SDK. Snarktank is ready-to-use; Ralph Loop Agent is ready-to-build-with.
- **Ralph Plugin** (`catalogue/execution/ralph-plugin.md`): Both are loop primitives, but Ralph Plugin runs inside Claude Code while Ralph Loop Agent runs in any Node.js application.

## Our Usage

**Not chosen.** We use Claude Code directly with Oh My ClaudeCode for execution, which provides a complete solution without writing custom TypeScript. Ralph Loop Agent would be valuable if we were building a custom orchestration service or needed programmatic control over the loop from a Node.js application. Could be relevant for building custom tooling in the Pompidou project itself.

## Sources

- [GitHub README](https://github.com/vercel-labs/ralph-loop-agent)

---
*Last reviewed: 2026-02-06*
