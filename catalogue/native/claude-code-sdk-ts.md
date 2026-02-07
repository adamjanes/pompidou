# Claude Code SDK (TypeScript)

| Field | Value |
|-------|-------|
| GitHub | [instantlyeasy/claude-code-sdk-ts](https://github.com/instantlyeasy/claude-code-sdk-ts) |
| Stars | 202 |
| Last Commit | 2026-02-05 |
| Install | `npm install @instantlyeasy/claude-code-sdk-ts` |
| Status | Watching |
| Category | native |
| Holy Grail Phase | Supporting |
| Score | **3.75** |

## What It Does

Unofficial TypeScript SDK providing a fluent, chainable API for programmatic Claude Code interaction. Wraps the CLI in a type-safe interface for scripting, automation, and building tools on top of Claude Code.

## How It Works

**Fluent API:**
```javascript
import { claude } from '@instantlyeasy/claude-code-sdk-ts';

const response = await claude()
  .withModel('sonnet')
  .allowTools('Read', 'Write')
  .skipPermissions()
  .inDirectory('/path/to/project')
  .query('Refactor this code')
  .asText();
```

**Response Parsing:**
```javascript
// Get plain text
const text = await claude().query('Explain this').asText();

// Parse JSON
const data = await claude().query('Return JSON array').asJSON<string[]>();

// Get tool executions
const tools = await claude()
  .allowTools('Read', 'Grep')
  .query('Find TODOs')
  .asToolExecutions();
```

**Session Management:**
```javascript
const session = claude().withModel('sonnet');

const response1 = await session.query('Pick a random number').asText();
const sessionId = await session.query('').getSessionId();

const response2 = await session
  .withSessionId(sessionId)
  .query('What number did you pick?')
  .asText();
// Claude remembers!
```

**Advanced Features:**
- **Streaming:** `.stream(callback)` for real-time message handling
- **Cancellation:** `.withSignal(abortController.signal)` for cancellable queries
- **Logging:** Built-in loggers (Console, JSON, Multi, Null)
- **Event handlers:** `.onMessage()`, `.onAssistant()`, `.onToolUse()`
- **Roles/personas:** Load YAML config with template variables
- **Token streaming:** Typewriter effects with `createTokenStream()`
- **Retry strategies:** `withRetry()` with exponential backoff

**Authentication:**
Delegates to Claude CLI — run `claude login` once.

## Evaluation

### Strengths
- **Type safety** — Full TypeScript definitions for IDE autocomplete
- **Fluent API** — Readable, chainable method syntax
- **Response parsing** — `.asText()`, `.asJSON()`, `.asToolExecutions()` convenience
- **Session continuity** — Maintain context across queries with session IDs
- **Production features** — Cancellation, retries, logging, error handling
- **Active maintenance** — Feb 2026 commits, v0.3.3 with streaming enhancements
- **Good docs** — Comprehensive README with examples
- **Backward compatible** — Classic async generator API still works

### Weaknesses
- **Unofficial SDK** — Not from Anthropic, could break with CLI changes
- **Adds abstraction layer** — Another dependency between you and Claude CLI
- **Not git-native** — Programmatic use doesn't produce versioned scripts by default
- **Token streaming caveat** — Docs warn "streaming analysis" behavior differs from expectations
- **Requires Node.js 18+** — Version constraint
- **Limited community** — 202 stars, 27 forks (modest adoption)
- **No Anthropic endorsement** — Could be deprecated if official SDK arrives

### Community Sentiment

**Business guide mention:** Blog post "A business leader's guide to the TypeScript Claude Code SDK" suggests some enterprise interest.

**NPM downloads:** Available on npm, but no download stats found (likely modest).

**GitHub activity:** 27 forks, steady commits through Feb 2026 — signs of active maintenance.

**No strong Reddit/HN discussion** — Tool hasn't become a standard in the ecosystem yet.

**Alternative forks:** `@lasercat/claude-code-sdk-ts` and `@botanicastudios/claude-code-sdk-ts` exist, suggesting some adoption but also fragmentation.

### Compared To

**vs. Native Claude Code CLI**
- CLI: Direct invocation, no dependencies, always up-to-date
- SDK: Type safety, fluent API, programmatic convenience
- **Trade-off:** Simplicity vs. developer experience

**vs. Official Agent SDK (TypeScript)**
- Official: Anthropic-maintained, guaranteed compatibility
- Unofficial: Community-driven, faster iteration, more features (roles, streaming)
- **Trade-off:** Stability vs. innovation

**vs. claude-cmd ([native/claude-cmd.md](claude-cmd.md))**
- claude-cmd: Command marketplace, interactive management
- SDK: Programmatic API, scripting/automation focus
- **Trade-off:** Human UX vs. machine UX

**vs. Superpowers ([execution/superpowers.md](superpowers.md))**
- Superpowers: Multi-agent patterns, test generation, workflows
- SDK: Low-level API wrapper
- **Trade-off:** High-level patterns vs. building blocks

## Our Usage

**Watching** — high-quality SDK with excellent developer experience, but not aligned with our current needs.

**Why watching instead of choosing:**
1. **No immediate need** — We use Claude Code CLI directly, plus bash scripts for automation
2. **Unofficial status** — Could break if Anthropic changes CLI internals
3. **Not git-first** — Programmatic use doesn't produce versioned, human-readable scripts
4. **Abstraction overhead** — Another layer between us and Claude
5. **Node.js dependency** — Adds runtime requirement to projects

**Why it's compelling:**
- **Type safety** — TypeScript definitions catch errors at compile time
- **Fluent API** — Much more readable than raw CLI invocations
- **Production features** — Retries, cancellation, logging out-of-the-box
- **Session management** — Easier to maintain context across queries

**Re-evaluate if:**
- We build a dashboard or UI on top of Claude Code (SDK would be perfect)
- We need programmatic orchestration of multiple Claude sessions
- Anthropic endorses or acquires the SDK (reduces risk)
- We build custom agent workflows that benefit from type safety

**Potential use cases:**
- **Ralph dashboard** — If we build a web UI to monitor/control Ralph, this SDK is ideal
- **Scheduled tasks** — runCLAUDErun could use SDK instead of raw CLI calls
- **Custom tools** — Building MCP servers or plugins that invoke Claude programmatically
- **Testing** — Automated testing of Claude Code workflows with retries and assertions

**Alternative we prefer:**
- Direct CLI invocation via bash scripts (simpler, no dependencies, versioned in git)
- Native Claude Code features (subagents, tasks, hooks) for orchestration

## Sources

- [README](https://github.com/instantlyeasy/claude-code-sdk-ts)
- [NPM Package](https://www.npmjs.com/package/@instantlyeasy/claude-code-sdk-ts)
- [Fluent API Docs](https://github.com/instantlyeasy/claude-code-sdk-ts/blob/main/docs/FLUENT_API.md)
- [Business Leader's Guide](https://www.eesel.ai/blog/typescript-claude-code-sdk)
- [GitHub Repository](https://github.com/instantlyeasy/claude-code-sdk-ts)

---
*Last reviewed: 2026-02-07*
