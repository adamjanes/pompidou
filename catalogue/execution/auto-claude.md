# Auto-Claude

| Field | Value |
|-------|-------|
| GitHub | [AndyMik90/Auto-Claude](https://github.com/AndyMik90/Auto-Claude) |
| Stars | 11,500 |
| Last Commit | Jan 2026 (v2.7.5 stable) |
| Install | Desktop app (macOS/Windows/Linux) or CLI (`pip install auto-claude`) |
| Status | Watching |
| Category | execution |
| Holy Grail Phase | 3-Run (also spans 2-Task and 5-Repeat) |

## What It Does

All-in-one autonomous multi-agent coding framework. Instead of assembling separate tools for tasks, execution, and process management, Auto-Claude wraps Claude Code into a visual Kanban board where each task row has its own agent. Users define goals in natural language, agents plan/build/validate in parallel (up to 12 concurrent terminals), and work happens in isolated git worktrees so main stays safe.

## How It Works

1. **Kanban Board** — visual task management with drag-and-drop. Each row/state has its own agent.
2. **Agent Terminals** — up to 12 concurrent Claude Code sessions with context injection
3. **QA Pipeline** — self-validating quality assurance before human review
4. **Git Worktree Isolation** — all agent work in separate worktrees, merge via PR
5. **Multi-Account** — swap between Claude Pro/Max accounts to work around usage limits
6. **Integrations** — GitHub, GitLab, Linear
7. **Additional modules** — Roadmap planning, Insights Chat (codebase Q&A), Ideation (vulnerability/improvement discovery), Changelog generator

Architecture: Electron desktop app (TypeScript 58%, Python 40%). Backend is Python agents + task specs + QA pipeline. Also has CLI mode for headless/CI-CD workflows.

Security: 3-layer sandbox (OS sandbox, filesystem restrictions, dynamic command allowlist).

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 4 | 1.20 |
| Simplicity | 20% | 3 | 0.60 |
| Community trust | 15% | 3 | 0.45 |
| Ecosystem fit | 15% | 2 | 0.30 |
| Cost efficiency | 10% | 3 | 0.30 |
| Maturity | 10% | 3 | 0.30 |
| **Composite** | | | **3.15** |

### Strengths
- **All-in-one** — collapses tasks + execution + process management + QA into a single tool
- **Visual** — Kanban board gives real-time agent progress. Click into any task to see live terminal feed.
- **Parallel execution** — 12 concurrent agents is more than most Ralph loop implementations
- **Multi-account swapping** — clever usage limit workaround, eliminates need for claude-auto-resume
- **Built-in QA** — automated validation before human review (something our composable stack lacks)
- **Active development** — 818 commits, 73 contributors, 29 releases, regular cadence
- **Cross-platform** — native desktop apps with auto-updates + CLI for headless

### Weaknesses
- **Monolithic** — lock-in to their workflow. If Auto-Claude stalls, you lose tasks + execution + process management
- **Bus factor** — primarily single developer (AndyMik90), despite 73 contributors
- **Electron dependency** — heavier than CLI tools
- **AGPL-3.0 license** — restrictive for any commercial derivative work
- **Requires Claude Pro/Max subscription** — can't use API keys directly (though multi-account helps)
- **No spec integration** — no OpenSpec or Spec Kit awareness. Tasks are natural language, not spec-driven.
- **11.5k stars** — decent but not massive for a tool this ambitious. Compare Beads (15k), Spec Kit (67k)

### Community Sentiment

LinkedIn post (Feb 2026): Enthusiastic user reports "running for hours", "100x faster than multiple chats", "completely new work mode". Claims it "squeezes every bit out of Claude" and "feels 6 months ahead." Notes downside: "generates more than I can review" and "hours reviewing and debugging after a sprint."

Medium review (Jan 2026): Tester ran it autonomously for 6 hours building a finance dashboard — produced a "fully functional trading app with live market signals, AI-generated analysis, real-time order books, and a complete security audit report." Praised transparency and ease of setup.

Hype-adjusted assessment: The enthusiasm is real but the marketing tone is strong. No independent benchmarks. Worth hands-on testing.

### Compared To

| Feature | Auto-Claude | Our Composable Stack |
|---------|-------------|---------------------|
| Task management | Built-in Kanban | Beads (git-native JSONL) |
| Execution | 12 parallel agents | Oh-My-ClaudeCode (5 modes) |
| Process management | Built-in multi-session | Claude Squad / tmux |
| QA/Validation | Built-in pipeline | None (gap in our stack) |
| Spec integration | None | OpenSpec (★ CHOSEN) |
| Headless/CLI | Yes (Python CLI) | Yes (all tools CLI-native) |
| Visual UI | Electron Kanban | None (terminal-only) |
| Composability | Low (monolithic) | High (swap any layer) |
| Mac Mini headless | CLI mode possible | All tools CLI-native |

**Key trade-off:** Auto-Claude is easier to get running (one install) but less flexible. Our stack is more work to assemble but each piece can be swapped independently.

## Our Usage

**Status: Watching.** Not yet tested hands-on.

Auto-Claude is interesting because it solves the "orchestration layer" problem — the gap between having individual tools and having them work together. Our current stack has this gap: OpenSpec doesn't talk to Beads, Beads doesn't talk to Oh-My-ClaudeCode, etc.

Before promoting to CHOSEN, we'd need to:
1. Install and test on a real project (frequency-first would be ideal)
2. Verify CLI mode works headless on Mac Mini
3. Assess whether it plays nicely with OpenSpec (or replaces the need for it)
4. Check if the QA pipeline actually catches real issues
5. Understand the multi-account mechanics and cost implications

If it delivers on the promise, it could replace: Oh-My-ClaudeCode, Claude Squad, claude-auto-resume, and parts of Beads.

## Sources

- [GitHub Repo](https://github.com/AndyMik90/Auto-Claude)
- [Medium Review: "I Tested This Autonomous Framework"](https://medium.com/@joe.njenga/i-tested-this-autonomous-framework-that-turns-claude-code-into-a-virtual-dev-team-a030ab702630)
- [AutoCloud: AI Coding on Steroids](https://www.mejba.me/blog/autocloud-autonomous-ai-coding)

---
*Last reviewed: 2026-02-06*
