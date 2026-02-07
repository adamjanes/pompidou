# Ralph Plugin (Official)

| Field | Value |
|-------|-------|
| GitHub | [anthropics/claude-code/tree/main/plugins/ralph-wiggum](https://github.com/anthropics/claude-code/tree/main/plugins/ralph-wiggum) |
| Stars | Part of claude-code monorepo |
| Last Commit | 2026-02 (active, maintained by Anthropic) |
| Install | Claude Code marketplace / plugin directory |
| Status | Evaluated |
| Category | execution |
| Holy Grail Phase | 3-Run |

## What It Does

The Ralph Wiggum plugin is Anthropic's official implementation of the autonomous loop technique for Claude Code. Named after the Simpsons character ("I'm in danger!"), it intercepts session exits via a stop hook and automatically re-feeds your prompt, creating iterative improvement cycles where Claude refines its work based on test failures and previous attempts. This is the canonical, Anthropic-backed version of the technique that Geoffrey Huntley originated in late 2025.

## How It Works

**Core concept (Geoffrey Huntley, late 2025):**
The fundamental insight is a while loop running Claude Code until tasks complete:
```bash
while :; do cat PROMPT.md | claude-code ; done
```

Each iteration gets fresh context, but memory persists via files on disk and git history. The agent reads its own previous output (modified files, test results, commit messages) to understand where it left off.

**The official plugin refines this with:**
1. **Stop hook interception** — When Claude thinks it's done and exits, the plugin's stop hook catches the exit event
2. **Prompt re-injection** — The original prompt is re-fed to a fresh Claude session
3. **File persistence** — All modifications, test results, and git history carry over between iterations
4. **Iteration tracking** — The plugin counts iterations and can enforce a maximum

**Usage:**
```bash
/ralph-loop "Migrate all tests from Jest to Vitest"
```

When Claude completes an iteration and exits, the stop hook intercepts, re-injects the prompt, and Claude continues. Each new session sees the current file state and git log, providing context continuity without token-heavy conversation history.

**Best practices (from community and Anthropic docs):**
- ALWAYS set `--max-iterations` to prevent infinite loops
- Use isolated environments (containers, VMs, or at minimum fresh branches)
- Git as safety net — commit before each iteration, easy to rollback
- Keep prompts specific and testable — vague prompts cause drift
- Monitor token usage — each iteration is a full session

## Evaluation

### Strengths
- Anthropic-backed — maintained in the official claude-code repo
- Simple and predictable — just a loop with a stop hook, no complex orchestration
- File-based memory is robust — survives crashes, restarts, and context limits
- Git provides natural checkpointing and rollback
- Works with any prompt — not opinionated about task format
- Low overhead — minimal code, minimal dependencies
- Matt Pocock: "Ralph Wiggum + Opus 4.5 is really, really good"

### Weaknesses
- No intelligent exit detection — relies on Claude deciding to exit, which can be unreliable
- No circuit breakers — can loop indefinitely on impossible tasks without --max-iterations
- No progress tracking — doesn't know if the agent is making progress or spinning
- Single-agent only — no parallel execution or agent specialization
- Fresh context each iteration means re-reading files and re-orienting (token cost)
- No built-in cost monitoring or rate limit handling
- Becoming less necessary as models improve — tasks needing 20 iterations now often complete in 5

### Community Sentiment

The Ralph technique is one of the most discussed patterns in the Claude Code community. Matt Pocock's endorsement ("Ralph Wiggum + Opus 4.5 is really, really good") brought mainstream attention. A Webcoda article calls it "Ship Code While You Sleep." Joe Njenga's Medium piece describes running "for hours without drama." Paddo.dev provides a detailed walkthrough. The community consensus is: simple, effective for well-defined tasks, but needs guardrails for production use. The ironic naming (Ralph Wiggum being famously clueless) resonates — the technique works despite its simplicity, much like how the character stumbles into success.

### Compared To

- **Oh My ClaudeCode** (`catalogue/execution/oh-my-claudecode.md`): OMC builds on top of Ralph with 5 modes, 32 agents, and model routing. Ralph Plugin is the foundation; OMC is the full framework. We chose OMC for the added features.
- **ralph-claude-code** (`catalogue/execution/ralph-claude-code.md`): Frank Bria's version adds circuit breakers, intelligent exit detection, and safety guardrails that the official plugin lacks. More robust but more complex.
- **choo-choo-ralph** (`catalogue/execution/choo-choo-ralph.md`): Adds structured Beads-based workflows on top of the Ralph loop. Different layer — task structure vs execution mechanics.

## Our Usage

**Evaluated as the foundation for our execution loops.** The official Ralph Plugin is the reference implementation, but we chose Oh My ClaudeCode for its additional modes (Ultrapilot parallel, Ecomode for cost savings) and intelligent model routing. The Ralph Plugin remains our conceptual foundation — OMC and other tools build on this pattern.

Understanding the Ralph Plugin is essential for working with any execution tool in this category. The core insight (loop + file persistence + git checkpointing) underpins everything else.

**Key configuration if using directly:**
```bash
# Always set max iterations
/ralph-loop --max-iterations 20 "Implement feature X"

# Always work on a branch
git checkout -b feature/ralph-migration
/ralph-loop "Migrate auth system"
```

## Sources

- [Official Plugin (claude-code monorepo)](https://github.com/anthropics/claude-code/tree/main/plugins/ralph-wiggum)
- [Plugin README](https://github.com/anthropics/claude-code/blob/main/plugins/ralph-wiggum/README.md)
- [Awesome Claude: Ralph Wiggum](https://awesomeclaude.ai/ralph-wiggum)
- [Paddo.dev: Autonomous Loops](https://paddo.dev/blog/ralph-wiggum-autonomous-loops/)
- [Webcoda: Ship Code While You Sleep](https://ai-checker.webcoda.com.au/articles/ralph-wiggum-technique-claude-code-autonomous-loops-2026)
- [Joe Njenga: Run Autonomously for Hours (Medium)](https://medium.com/@joe.njenga/ralph-wiggum-claude-code-new-way-to-run-autonomously-for-hours-without-drama-095f47fbd467)
- [Cyrus: Ralph Wiggum Technique](https://www.atcyrus.com/stories/ralph-wiggum-technique-claude-code-autonomous-loops)

---
*Last reviewed: 2026-02-07*
