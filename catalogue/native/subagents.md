# Subagents (Native Claude Code)

| Field | Value |
|-------|-------|
| GitHub | Built-in (Anthropic) |
| Stars | N/A (native feature) |
| Last Commit | N/A (ships with Claude Code) |
| Install | N/A (always available) |
| Status | ★ CHOSEN |
| Category | native |
| Holy Grail Phase | Supporting |

## What It Does

Claude Code subagents are the built-in mechanism for delegating work to child agents. The primary Claude Code instance (the orchestrator) can spawn subagents to handle specific tasks — research, code writing, testing, exploration — and receive summarized results back. Unlike Agent Teams, subagents don't have independent persistent contexts; their results are compressed and returned to the parent. This makes them cheaper and simpler, ideal for the majority of delegation tasks that don't require parallel collaboration.

## How It Works

**Built-in subagent types:**
- **Explore agents**: Read-only access. Use Haiku model for speed. Good for searching codebases, reading documentation, answering questions about existing code.
- **Plan agents**: Read-only access. Help with planning and architecture without modifying files.
- **General-purpose agents**: Full read/write access. Can modify files, run commands, and make changes.

**Custom agent definitions:**

Global agents (available everywhere):
```
~/.claude/agents/architect.md
~/.claude/agents/reviewer.md
~/.claude/agents/tester.md
```

Project-specific agents:
```
.claude/agents/deploy.md
.claude/agents/migration.md
```

**Agent file format:**
```markdown
---
model: opus
tools: read, write, bash, glob, grep
---

# Agent Name

You are a [role description].

## Instructions
- What to do
- How to do it
- What to return
```

**How delegation works:**
1. The orchestrator (parent Claude Code) identifies a task suitable for delegation
2. It spawns a subagent with a specific prompt and context
3. The subagent executes independently (reads files, writes code, runs tests, etc.)
4. When the subagent finishes, its results are **summarized** before returning to the parent
5. The parent receives a condensed version of what was done, not the full subagent context

**Key difference from Agent Teams:**
- Subagent results are summarized (cheaper, less context used)
- Agent Team teammates maintain independent full contexts (more expensive, richer collaboration)
- Subagents are sequential by default; Agent Teams are parallel
- Subagents don't communicate with each other; Agent Team teammates can message peer-to-peer

**Model selection for custom agents:**

| Model | Best For | Cost |
|-------|----------|------|
| Haiku | Fast execution, simple code, content writing, research | Lowest |
| Sonnet | Standard execution, moderate complexity, debugging | Medium |
| Opus | Complex architecture, security review, difficult problems | Highest |

## Evaluation

### Strengths
- Always available — no flags, no installation, no configuration needed
- Lower cost than Agent Teams (summarized results, not full context duplication)
- Custom agents via simple markdown files — easy to create, modify, share
- Global agents in `~/.claude/` work across all projects
- Project-specific agents in `.claude/agents/` for domain-specific delegation
- Model selection per agent allows cost optimization
- Stable and production-ready (not experimental)
- Clean orchestrator pattern: parent plans, subagent executes, parent reviews

### Weaknesses
- Sequential execution — subagents run one at a time, not in parallel
- Results are summarized — some detail is lost in compression
- No inter-subagent communication — each subagent is isolated
- No shared task DAG — the parent must manually coordinate task order
- No git worktree isolation — subagents write to the same working directory
- Custom agent definitions don't cascade (CWD-only for `.claude/agents/`)
- No persistent memory across subagent invocations

### Community Sentiment
Subagents are the most widely used delegation mechanism in Claude Code. The community treats them as the "default" approach for breaking down work. Custom agent definitions (the markdown files) are shared extensively on GitHub and in Claude Code communities. The main feature request is parallel subagent execution, which Agent Teams partially addresses.

Users appreciate the simplicity: "Just write a markdown file and you have a new agent." The cost savings over Agent Teams make subagents the preferred choice for 80% of tasks.

### Compared To
- **Agent Teams** (`catalogue/native/agent-teams.md`): Agent Teams provides parallel execution, peer messaging, and independent contexts — but at 5-7x cost. Use subagents for most tasks, Agent Teams for genuinely parallel workloads.
- **claude-flow** (`catalogue/orchestration/claude-flow.md`): claude-flow promised advanced delegation but core features are broken. Native subagents work reliably. No comparison.
- **External LLM calls**: Some tools call other LLMs (GPT, Gemini) for subtasks. Subagents stay within the Claude ecosystem, which means consistent behavior and no cross-provider integration complexity.

## Our Usage

Chosen as our primary delegation mechanism. The orchestrator pattern in root CLAUDE.md defines: "Claude plans, sub-agents execute, Claude reviews." Subagents are how this works in practice.

**Our 5 custom agents** (in `shared/agents/`, to be moved to `~/.claude/agents/`):

| Agent | Model | Purpose |
|-------|-------|---------|
| `architect.md` | Opus | Design decisions, architecture review |
| `reviewer.md` | Opus | Code review, security audits |
| `tester.md` | Haiku | Test writing, test execution |
| `debugger.md` | Sonnet | Bug investigation, root cause analysis |
| `ui-designer.md` | Sonnet | UI/UX design, component layout |

**When to use subagents:**
- Writing more than 20 lines of code
- Creating new files or pages
- Any copywriting or content writing
- Research and exploration
- Running builds/tests

**When the orchestrator should act directly:**
- Quick edits (< 10 lines)
- Answering questions
- Planning and delegating
- Reviewing subagent output

**Current issue:** Custom agents live in `shared/agents/` but Claude Code only loads from `~/.claude/agents/` (global) or `.claude/agents/` (CWD). Phase 1 of Pompidou fixes this by moving them to `~/.claude/agents/`.

## Sources

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Claude Code Custom Agents](https://docs.anthropic.com/en/docs/claude-code/agents)
- Our custom agents: `/Users/adamjanes/code/shared/agents/`

---
*Last reviewed: 2026-02-07*
