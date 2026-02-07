# Claude Code Boost

| Field | Value |
|-------|-------|
| GitHub | [yifanzz/claude-code-boost](https://github.com/yifanzz/claude-code-boost) |
| Stars | 162 |
| Last Commit | 2026-01-31 |
| Install | `npm install -g claude-code-boost && ccb install` |
| Status | Evaluated |
| Category | execution |
| Holy Grail Phase | Supporting |

## What It Does

Claude Code Boost provides smart hooks for Claude Code that reduce manual approval friction by auto-approving safe development operations (file reads, npm test, git commit) while blocking destructive commands (rm -rf /, disk formatting). It also includes test enforcement via conversation analysis (detects when code changes warrant testing before session end) and optional desktop notifications for long-running tasks.

## How It Works

**Installation:**
```bash
npm install -g claude-code-boost
ccb install
```

The install wizard guides you through:
1. Choose installation location (user, project, or project-local settings)
2. Choose authentication method (API proxy or direct API key)
3. Configure Claude Code settings automatically
4. Verify setup works

**Auto-Approval Hook:**
Intercepts Claude Code tool calls using the hook system:
```
Claude Code Tool Request → CCB Hook → Decision (approve/block) → Execute/Block
```

**Decision Logic:**
1. **Fast approval** for obviously safe operations (Read, LS, Glob)
2. **LLM analysis** for complex operations using system prompts (Anthropic API or OpenAI)
3. **Caching** to avoid redundant API calls for identical requests (working directory scoped)
4. **Always block** destructive commands

**What gets auto-approved:**
- File operations: Read, Write, Edit
- Development tools: `npm test`, `npm build`, `git commit`
- Localhost requests: `curl http://localhost:3000`
- Docker operations: `docker build`, `docker run`
- Package management: `npm install`, `yarn add`

**What gets blocked:**
- System destruction: `rm -rf /`, `rm -rf /usr`
- Disk operations: `mkfs`, destructive `fdisk`
- Malicious activity: DoS attacks, credential theft

**Test Enforcement Hook:**
- Parses Claude Code conversation transcripts (JSONL format)
- Uses LLM analysis to determine if code changes warrant testing
- Can block session termination until tests are executed

**Configuration:**
`~/.ccb/config.json`:
```json
{
  "log": true,        // Enable approval logging
  "cache": true,      // Enable caching (default: true)
  "apiKey": "sk-..."  // Anthropic API key (optional)
}
```

**Caching behavior:**
- Working directory scoped (safe across projects)
- Caches only definitive decisions (approve/block, not "unsure")
- Instant responses for repeated operations
- `ccb debug clear-approval-cache` to reset

## Evaluation

### Strengths
- **Reduces friction** — auto-approves ~80% of safe operations, saving clicks
- **Smart caching** — avoids redundant LLM calls for identical requests
- **Working directory scoped** — safe isolation across projects
- **Transparent logging** — `~/.ccb/approval.jsonl` shows all decisions
- **Test enforcement** — prevents ending sessions without running tests when warranted
- **Authentication flexibility** — supports API proxy (beyondthehype.dev) or direct API keys
- **Early but functional** — addresses real workflow pain (manual approvals)

### Weaknesses
- **Requires external API** — LLM analysis needs Anthropic or OpenAI API access (costs money)
- **Early-stage project** — "figuring out what developers actually need from Claude Code automation"
- **Test enforcement limited** — conversation analysis may miss context (false positives/negatives)
- **Documentation sparse** — setup is clear, but hook internals and edge cases not well-documented
- **Single maintainer** — yifanzz is sole contributor
- **No safety audit** — auto-approval decisions rely on LLM judgment (could miss edge cases)
- **Caching complexity** — working directory scoping good, but cache invalidation logic unclear

### Community Sentiment

**General feedback (2026):**
- **Medium (Jan 2026):** ["Claude Code Hooks: 5 Automations That Eliminate Developer Friction"](https://medium.com/coding-nexus/claude-code-hooks-5-automations-that-eliminate-developer-friction-7b6ddeff9dd2) — Highlights auto-approval as key friction reducer.
- **SmartScope Blog:** ["Claude Code Auto-Permission (2026): When to Skip Prompts Safely"](https://smartscope.blog/en/generative-ai/claude/claude-code-auto-permission-guide/) and ["Boost Development Efficiency 3x with Claude Code Auto-Approval"](https://smartscope.blog/en/ai-development/claude-code-auto-approval-settings-guide/) — Both recommend auto-approval for common workflows.

**Key insight:** Auto-approval is a **widely recognized pain point** in Claude Code workflows. Multiple blog posts and guides recommend this approach.

**Concerns:**
- **Security risk** — LLM-based auto-approval could miss edge cases (e.g., `curl` to a malicious local server)
- **API costs** — Each complex operation requires LLM call (even with caching)
- **Trust threshold** — Users must trust the tool won't auto-approve something destructive

**Overall:** Community sees value in auto-approval, but this specific implementation is **early-stage and lightly tested**.

### Compared To

| vs. Manual Approval | Claude Code Boost Advantage | Manual Approval Advantage |
|---------------------|----------------------------|---------------------------|
| Speed | Instant approval for safe ops | N/A |
| Safety | LLM analysis + always-block list | Human judgment for edge cases |
| Cost | API calls for complex ops | Free |
| Friction | ~80% fewer clicks | Full control |

**When to use Claude Code Boost:**
- You run **many safe operations** (file reads, npm test, git commit) and hate clicking "Approve"
- You trust **LLM-based safety analysis** for complex commands
- You're okay with **API costs** for approval decisions

**When NOT to use:**
- You work with **sensitive systems** where auto-approval is too risky
- You want **zero external API dependencies**
- You prefer **full manual control** over every operation

## Our Usage

**Status: Evaluated, Not Chosen**

**Why we're not using it:**
1. **API cost vs. benefit** — We'd pay for LLM calls to approve operations we can just click once
2. **Trust threshold too high** — Auto-approval for Bash commands (even with LLM analysis) feels risky for production client work
3. **Early-stage maturity** — Project admits it's "figuring out what developers need"; we prefer battle-tested tools
4. **Manual approval is acceptable** — For our workflow (orchestrator pattern, Adam reviews), the click overhead is not a bottleneck

**Potential future use:**
- If we implement **Ralph Loop automation** (runCLAUDErun + claude-auto-resume), auto-approval becomes critical
- **Test enforcement hook** is interesting for CI/CD integration (block merge if tests not run)
- Once the project matures and community validates safety, we'd reconsider

**Key takeaway:** This addresses a **real pain point** (approval friction), but the **solution (LLM-based auto-approval) introduces new risks** (security, API costs). For autonomous agents running unattended, this becomes **essential**. For Adam's supervised workflow, it's **premature optimization**.

**Watch this:** If Ralph Loop becomes our primary workflow, revisit for auto-approval automation.

## Sources

- [README](https://github.com/yifanzz/claude-code-boost)
- [Claude Code Hooks: 5 Automations That Eliminate Developer Friction](https://medium.com/coding-nexus/claude-code-hooks-5-automations-that-eliminate-developer-friction-7b6ddeff9dd2)
- [Claude Code Auto-Permission (2026): When to Skip Prompts Safely](https://smartscope.blog/en/generative-ai/claude/claude-code-auto-permission-guide/)
- [Boost Development Efficiency 3x with Claude Code Auto-Approval](https://smartscope.blog/en/ai-development/claude-code-auto-approval-settings-guide/)

---
*Last reviewed: 2026-02-07*
