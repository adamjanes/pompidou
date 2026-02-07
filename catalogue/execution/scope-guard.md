# Scope Guard

| Field | Value |
|-------|-------|
| GitHub | [andreahlert/scope-guard](https://github.com/andreahlert/scope-guard) |
| Stars | N/A |
| Last Commit | 2026 |
| Install | See README |
| Status | Watching |
| Category | execution |
| Holy Grail Phase | 3-Run (Supporting) |

## What It Does

Prevents agent scope creep by tracking code changes against stated intent via Git diffs. When an agent is working on a specific task, Scope Guard monitors which files are being modified and blocks changes to files not mentioned in the task description. If scope creep is detected, it halts the agent with a clear explanation of what was attempted and why it was blocked. AGPL-3.0 license.

## How It Works

Integrates as a Claude Code hook (PostToolUse). After each file edit, Scope Guard compares the modified files against the stated task intent. Uses Git diffs to detect what's changing and a matching algorithm to determine if changes fall within scope. If an edit touches a file not related to the current task, the hook blocks the completion and surfaces an explanation. Configurable strictness levels.

## Evaluation

### Strengths
- Addresses a real problem — agents frequently edit unrelated files during autonomous execution
- Git-based detection is reliable and fast
- Clear halt mechanism with explanations (not silent failures)
- Useful safety net specifically for Ralph loops where focus is critical
- HN discussion validates the concept

### Weaknesses
- Unknown adoption (star count not visible)
- AGPL-3.0 license — restrictive
- May be too restrictive for complex tasks that legitimately touch many files
- False positives possible — agent may need to edit "unrelated" files for valid reasons (imports, configs)
- Intent matching algorithm quality is unknown

### Community Sentiment

Well-received concept on Hacker News. Developers agree scope creep is a real problem. Some concern about false positives — "what if the agent needs to update an import in a file it wasn't explicitly told about?"

### Compared To

- **Destructive Command Guard** — Blocks dangerous commands (rm -rf) vs Scope Guard blocks unintended edits. Complementary.
- **TDD Guard** — Test-based verification vs diff-based scope checking. Different approaches to agent safety.
- **Container-use** — Full isolation vs targeted scope enforcement.

## Our Usage

Watching. Useful safety layer for Phase 3 autonomous execution — pair with destructive command guard for defense in depth. Evaluate after basic Ralph loops are working to see if scope creep is a real problem in practice.

## Sources

- [GitHub: andreahlert/scope-guard](https://github.com/andreahlert/scope-guard)
- [HN discussion](https://news.ycombinator.com/item?id=46897408)

---
*Last reviewed: 2026-02-07*
