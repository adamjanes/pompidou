# Continuous Claude

| Field | Value |
|-------|-------|
| GitHub | [AnandChowdhary/continuous-claude](https://github.com/AnandChowdhary/continuous-claude) |
| Stars | 1,200 |
| Last Commit | Jan 2026 |
| Install | `npm install -g continuous-claude` |
| Status | Watching |
| Category | execution |
| Holy Grail Phase | 3-Run + 5-Repeat |

## What It Does

Continuous Claude runs Claude Code in a continuous loop, autonomously creating pull requests, waiting for CI checks to pass, and merging them. It transforms Claude Code from an interactive assistant into a self-driving CI/CD pipeline where the agent writes code, opens a PR, monitors GitHub Actions or other CI systems, and — if all checks pass — merges the PR automatically. Designed for teams and solo developers who want fully autonomous code shipping with a safety net (CI must pass before merge).

## How It Works

**Key concepts:**
- **Continuous loop**: Claude Code runs repeatedly against a task list or backlog. After completing a unit of work, it opens a PR rather than committing directly.
- **PR-based workflow**: All changes go through pull requests. This provides a natural checkpoint — the CI/CD pipeline runs tests, linting, and builds against the PR branch.
- **CI check monitoring**: After opening a PR, Continuous Claude polls GitHub for check status. It waits for all required checks to pass (green) before proceeding.
- **Auto-merge**: If all CI checks pass, the PR is automatically merged. If checks fail, the loop can either attempt a fix or flag the failure for human review.
- **Task progression**: After merging a PR, the loop picks up the next task and repeats.

**Workflow:**
1. Configure the tool with your repo, task source, and CI requirements
2. Continuous Claude starts a Claude Code session
3. Claude writes code for the current task
4. A PR is opened with the changes
5. CI checks run (tests, linting, type checking, etc.)
6. If checks pass → auto-merge → move to next task
7. If checks fail → attempt fix or flag blocker
8. Repeat until task list is exhausted or a hard blocker is hit

**Safety model:**
The PR + CI gate pattern means no code ships without passing your existing quality checks. This is fundamentally safer than direct-commit autonomous loops because your test suite is the gatekeeper.

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 4 | 1.20 |
| Simplicity | 20% | 3 | 0.60 |
| Community trust | 15% | 3 | 0.45 |
| Ecosystem fit | 15% | 3 | 0.45 |
| Cost efficiency | 10% | 3 | 0.30 |
| Maturity | 10% | 3 | 0.30 |
| **Composite** | | | **3.30** |

### Strengths
- Full CI/CD integration — the only autonomous execution tool that explicitly waits for CI checks before merging
- PR-based workflow provides natural safety boundaries — all changes are reviewable before merge
- Leverages existing CI/CD infrastructure (GitHub Actions, etc.) rather than building its own test runner
- Auto-merge on green checks enables true hands-off autonomous shipping
- Task progression creates a pipeline of autonomous work, not just single-shot execution
- Aligns with production workflows — PRs are how teams already ship code

### Weaknesses
- Moderate star count (1,200) — less battle-tested than larger execution tools
- Requires trust in autonomous merging — your CI/CD pipeline must be robust enough to catch all issues
- If CI is flaky, the loop can get stuck in retry cycles
- Needs a well-defined task list or backlog to be effective — not great for open-ended exploration
- GitHub-specific (PR + checks model) — less portable to other git platforms
- No built-in cost tracking or token monitoring

### Community Sentiment

Positive reception from developers who already have strong CI/CD pipelines. The "PR as safety net" approach resonates with teams that are nervous about autonomous code changes — knowing that tests must pass before merge provides confidence. Common praise: "This is how autonomous coding should work — through PRs, not direct commits." Criticism focuses on the assumption that CI catches everything — developers with weaker test suites note that auto-merge is only as good as your tests. Some compare it favorably to the Ralph loop pattern, noting that the CI gate is a meaningful improvement over "loop until done" approaches.

### Compared To

- **Ralph loops** (`catalogue/execution/ralph-plugin.md`): Ralph loops run Claude Code in a while-true loop with direct commits or manual review. Continuous Claude adds the PR + CI gate, making it safer for production repos but slower for rapid iteration.
- **choo-choo-ralph** (`catalogue/execution/choo-choo-ralph.md`): Beads-based Ralph approach with task tracking. Different focus — choo-choo-ralph is about task progression, Continuous Claude is about CI/CD integration. Could complement each other.
- **claude-auto-resume** (`catalogue/execution/auto-claude.md`): Handles usage limit detection and auto-restart. Orthogonal concern — claude-auto-resume manages session continuity, Continuous Claude manages the ship-code lifecycle. Can be combined.
- **Oh My ClaudeCode** (`catalogue/execution/oh-my-claudecode.md`): OMC's Pipeline mode (build -> test -> deploy) is similar in spirit but doesn't include the PR + CI polling + auto-merge loop. Different level of CI integration.

## Our Usage

Watching. The auto-PR + wait-for-checks + merge pattern is the most production-safe approach to autonomous code shipping in the ecosystem. Two scenarios where it becomes relevant:

1. **Client projects (PR workflow required)**: For clients/fractional-first and other production repos where all changes must go through PRs, Continuous Claude's workflow is a natural fit. Ralph loops + Continuous Claude could produce PRs that auto-merge only if CI passes.
2. **Phase 5 (Repeat)**: When nightly Ralph loops are running, adding CI awareness means shipped code is automatically validated. This is a significant improvement over the current plan of "run overnight, review in morning."

The main prerequisite is having robust CI/CD on all target repos. Currently, not all projects have full test suites or GitHub Actions configured. Worth evaluating once CI infrastructure is more mature.

## Sources

- [GitHub: AnandChowdhary/continuous-claude](https://github.com/AnandChowdhary/continuous-claude)
- [awesome-claude-code](https://github.com/bwilliams-97/awesome-claude-code)
- [Reddit: r/ClaudeAI discussions](https://reddit.com/r/ClaudeAI)

---
*Last reviewed: 2026-02-07*
