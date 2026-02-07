# Snarktank Ralph

| Field | Value |
|-------|-------|
| GitHub | [snarktank/ralph](https://github.com/snarktank/ralph) |
| Stars | 9,600 |
| Last Commit | 2026-01 (active) |
| Install | Copy `ralph.sh` + `CLAUDE.md` to project, or install via Claude marketplace |
| Status | Evaluated |
| Category | execution |
| Holy Grail Phase | 3-Run |

## What It Does

Snarktank Ralph is a PRD-driven autonomous agent loop that decomposes a product requirements document into individual stories, then executes them one at a time with fresh context per iteration. Each cycle selects the highest-priority incomplete story, implements it, runs quality checks (typecheck, tests), commits, updates the PRD status, and appends learnings. The standout feature is the structured PRD-to-task decomposition with automatic git branching and flowchart visualization of the process.

## How It Works

**PRD-driven workflow:** Define requirements in `prd.json` with stories sized to fit one context window. The loop iterates through stories in priority order.

**Each cycle:**
1. Select highest-priority incomplete story from `prd.json`
2. Implement in a fresh AI context window
3. Run quality checks (typecheck, tests, lint)
4. Commit changes to git
5. Update story status (`passes: true/false`) in `prd.json`
6. Append learnings to `progress.txt`
7. Repeat until all stories pass

**Key files:**

| File | Purpose |
|------|---------|
| `ralph.sh` | Main Bash orchestration loop |
| `prd.json` | Task list with completion status per story |
| `progress.txt` | Append-only learnings log across iterations |
| `CLAUDE.md` / `prompt.md` | Agent instructions (Claude Code or Amp) |
| `skills/prd/` | PRD generation skill |

**Execution:**
```bash
./scripts/ralph/ralph.sh [max_iterations]              # Default: Amp
./scripts/ralph/ralph.sh --tool claude [max_iterations] # Claude Code
```

**Tool flexibility:** Supports both Amp CLI and Claude Code. Also available as a Claude Code marketplace plugin.

## Evaluation

### Strengths
- 9.6k stars — one of the most popular Ralph implementations, well battle-tested
- Clean PRD-to-execution pipeline with structured JSON tracking
- Fresh context per iteration prevents context degradation
- Append-only `progress.txt` captures learnings across loops
- Tool-agnostic (Amp + Claude Code)
- Simple Bash script — easy to understand, modify, and debug
- Marketplace availability for quick install

### Weaknesses
- Task sizing is critical and manual — stories must fit one context window
- No built-in cost tracking or token monitoring
- `prd.json` is flat — no dependency graph between stories
- No parallel execution support (single-agent, sequential only)
- Limited error recovery beyond quality check failures

### Community Sentiment

Strong adoption at 9.6k stars, 1.1k forks. Ryan Carson's original tweet thread drove significant initial traction. The PRD-driven approach resonates with product-minded developers who think in stories. Criticism focuses on the manual story sizing requirement — if stories are too large, the loop stalls. The `progress.txt` learnings log is frequently praised as a simple but effective cross-iteration memory mechanism.

### Compared To

- **Oh My ClaudeCode** (`catalogue/execution/oh-my-claudecode.md`): OMC provides execution modes and agent specialization but no task decomposition. Snarktank provides task structure but simpler execution. They complement each other — use Snarktank's PRD format with OMC's execution modes.
- **Ralph Plugin** (`catalogue/execution/ralph-plugin.md`): Both are Bash loops, but Snarktank adds PRD tracking, learnings log, and quality checks. More opinionated and structured.
- **Ralph TUI** (`catalogue/execution/ralph-tui.md`): Ralph TUI can consume `prd.json` as a task tracker format, effectively building a UI layer on top of Snarktank's data format.

## Our Usage

**Not chosen, but influential.** The `prd.json` format has become a de facto standard for Ralph task tracking. We use Beads for cross-project task management instead, but Snarktank's learnings-log pattern (`progress.txt`) is worth adopting in our loops. The PRD-to-story decomposition approach informs how we structure specs in OpenSpec.

## Sources

- [GitHub README](https://github.com/snarktank/ralph)
- [Ryan Carson's thread](https://x.com/ryancarson/status/2008548371712135632)

---
*Last reviewed: 2026-02-06*
