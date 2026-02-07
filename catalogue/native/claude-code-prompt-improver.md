# Claude Code Prompt Improver

| Field | Value |
|-------|-------|
| GitHub | [severity1/claude-code-prompt-improver](https://github.com/severity1/claude-code-prompt-improver) |
| Stars | 1,115 |
| Last Commit | 2025-12-13 |
| Install | `claude plugin install prompt-improver@severity1-marketplace` |
| Status | Watching |
| Score | **3.75** |
| Category | native |
| Holy Grail Phase | Supporting |

## What It Does

An intelligent UserPromptSubmit hook that intercepts vague prompts and asks targeted clarifying questions before Claude Code executes them. Uses conversation history to evaluate clarity, proceeding immediately for clear prompts (zero overhead) while invoking a research skill for vague prompts to gather context and ask 1-6 grounded questions.

## How It Works

**Architecture (v0.4.0):** Skill-based with hook-level evaluation.

- **Hook (scripts/improve-prompt.py):** Intercepts prompts via stdin/stdout JSON, handles bypass prefixes (`*`, `/`, `#`), wraps prompts with evaluation instructions (~189 tokens). Claude evaluates clarity using conversation history. If vague, instructs Claude to invoke `prompt-improver` skill.

- **Skill (skills/prompt-improver/):** Research and question workflow. SKILL.md defines 4-phase process: Research → Questions → Clarify → Execute. Progressive disclosure loads reference files on-demand (question-patterns.md, research-strategies.md, examples.md).

**Flow for clear prompts:** Hook wraps with evaluation (~189 tokens) → Claude evaluates: clear → proceeds immediately. Total overhead: ~189 tokens.

**Flow for vague prompts:** Hook wraps (~189 tokens) → Claude evaluates: vague → invokes skill → loads research/question guidance → creates research plan → gathers context → asks questions.

**Bypass prefixes:**
- `*` = skip evaluation entirely
- `/` = slash commands bypass automatically
- `#` = memorize bypass

**Example transformation:**
```
User: "fix the bug"
```
Claude asks:
```
Which error needs fixing?
  ○ TypeError in src/components/Map.tsx (recent change)
  ○ API timeout in src/services/osmService.ts
  ○ Other (paste error message)
```

## Evaluation

### Strengths

- **Zero overhead for clear prompts:** Evaluation happens in hook (~189 tokens), no skill load if prompt is clear
- **Progressive disclosure:** Reference files only load when needed for vague prompts
- **Conversation-aware:** Uses existing conversation history to avoid redundant exploration
- **Transparent:** Evaluation visible in conversation, never hidden
- **31% token reduction (v0.4.0):** Down from ~275 tokens to ~189 tokens per prompt vs v0.3.x
- **AskUserQuestion tool:** Uses Claude Code 2.0.22+ native question UI for better UX
- **Manual invocation:** Can invoke skill manually without hook: `Use the prompt-improver skill to research and clarify: "add authentication"`

### Weaknesses

- **Requires Claude Code 2.0.22+:** Depends on AskUserQuestion tool
- **189 tokens per prompt:** Even clear prompts pay evaluation cost (though minimal)
- **30-message session overhead:** ~5.7k tokens (~2.8% of 200k context) for evaluation wrappers
- **May interrupt flow:** Asking questions can slow down rapid iteration
- **Requires plugin marketplace:** Installation via severity1-marketplace, not core Claude Code
- **Python dependency:** Hook script requires Python 3 runtime

### Community Sentiment

Strong positive reception. Described as "The Prompt Improver Every Serious Claude Code User Needs" in January 2026 article by JP Caparas. Community recognizes the core problem: "garbage prompts produce garbage results." v0.4.0 architecture improvements praised for 31% token reduction while maintaining effectiveness. Active maintenance with regular releases based on user feedback.

### Compared To

- **Native CLAUDE.md:** Static instructions vs dynamic question system. Prompt improver adapts to conversation context.
- **Manual clarification:** User asks own questions vs AI-driven research plan with grounded options.
- **Superpowers ([execution/superpowers.md](../execution/superpowers.md)):** Superpowers enriches capabilities after execution; prompt improver clarifies intent before execution.
- **Planning with Files ([spec/planning-with-files.md](../spec/planning-with-files.md)):** Planning with Files structures specs in files; prompt improver refines prompts in conversation.

## Our Usage

**Status: Watching** — Not installed yet.

**Why watching:**
- Interesting concept for improving prompt quality upfront
- 189 token overhead per prompt is reasonable but adds up
- May conflict with our orchestrator pattern (Adam plans, sub-agents execute)
- Unclear if benefit justifies interruption cost in our workflow

**Potential use case:** Could be valuable for solo Adam sessions when exploring new projects, less valuable when delegating to sub-agents with clear instructions.

**Decision deferred until:** We've established baseline workflow with Beads + OMC and can measure if prompt quality is a blocker.

## Sources

- [GitHub README](https://github.com/severity1/claude-code-prompt-improver)
- [The Prompt Improver Every Serious Claude Code User Needs](https://blog.devgenius.io/the-prompt-improver-every-serious-claude-code-user-needs-899d09251de0)
- [Releases](https://github.com/severity1/claude-code-prompt-improver/releases)
- [Claude Docs: Prompt Improver](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/prompt-improver)

---
*Last reviewed: 2026-02-07*
