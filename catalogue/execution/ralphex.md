# ralphex

| Field | Value |
|-------|-------|
| GitHub | [umputun/ralphex](https://github.com/umputun/ralphex) |
| Stars | 299 |
| Last Commit | 2026-02-07 |
| Install | `go install github.com/umputun/ralphex/cmd/ralphex@latest` or `brew install umputun/apps/ralphex` |
| Status | Evaluated |
| Category | execution |
| Holy Grail Phase | 3-Run |
| Score | **4.10** |

## What It Does

ralphex is a standalone CLI that executes markdown-based implementation plans autonomously through Claude Code with multi-phase code review. It runs task-by-task in fresh Claude sessions (keeping model sharp), validates after each task, commits changes, then runs a 5-agent parallel first review, external review via codex (or custom script), and a 2-agent second review. It creates branches, tracks progress, moves completed plans to `completed/`, and supports interactive plan creation via `--plan` flag or automatic detection when no plans exist.

## How It Works

**4-Phase Execution Flow:**

**Phase 1: Task Execution**
```
Read plan → Find first incomplete task (- [ ]) → Send to Claude Code
→ Run validation commands (tests/lint) → Mark [x] → Commit → Repeat
```

**Phase 2: First Code Review (5 agents in parallel)**
| Agent | Purpose |
|-------|---------|
| quality | Bugs, security, race conditions |
| implementation | Verifies code achieves goals |
| testing | Test coverage and quality |
| simplification | Detects over-engineering |
| documentation | Checks if docs need updates |

Claude verifies findings, fixes confirmed issues, commits.

**Phase 3: External Review (optional)**
- Runs codex (GPT-5.2) by default, or custom script wrapping any AI
- Claude evaluates findings, fixes valid issues, iterates until clean
- Set `external_review_tool = none` to skip

**Phase 4: Second Code Review (2 agents)**
- Launches `quality` + `implementation` for final review
- Focuses on critical/major issues only
- Moves plan to `completed/` on success

**Plan File Format:**
```markdown
# Plan: Add User Authentication

## Validation Commands
- `go test ./...`
- `golangci-lint run`

### Task 1: Add auth middleware
- [ ] Create JWT validation middleware
- [ ] Add to router for protected routes
- [ ] Add tests
- [ ] Mark completed

### Task 2: Add login endpoint
- [ ] Create /api/login handler
- [ ] Return JWT on successful auth
- [ ] Add tests
- [ ] Mark completed
```

**Modes:**
```bash
ralphex docs/plans/feature.md        # Full execution (tasks + reviews)
ralphex --review docs/plans/feature.md  # Review-only (skip tasks)
ralphex --external-only               # External review loop only
ralphex --tasks-only docs/plans/feature.md  # Tasks only, no reviews
ralphex --plan "add health check"     # Interactive plan creation
ralphex --serve docs/plans/feature.md  # Web dashboard (real-time streaming)
ralphex                               # fzf plan selector, or create if none exist
```

**Configuration** (`~/.config/ralphex/config` or `.ralphex/config` per-project):
```ini
claude_command = claude
claude_args = --dangerously-skip-permissions --output-format stream-json --verbose
codex_enabled = true
codex_model = gpt-5.3-codex
external_review_tool = codex  # or 'custom' or 'none'
custom_review_script = ~/.config/ralphex/scripts/my-review.sh
iteration_delay_ms = 2000
task_retry_count = 1
plans_dir = docs/plans
```

**Custom Agents** (`~/.config/ralphex/agents/*.txt`):
- Edit builtin agents or add new ones
- Variables: `{{DEFAULT_BRANCH}}`, `{{PLAN_FILE}}`, `{{PROGRESS_FILE}}`
- Comment syntax: lines starting with `#` are stripped

**Custom Prompts** (`~/.config/ralphex/prompts/*.txt`):
- `task.txt` — task execution
- `review_first.txt` — 5 agents (customizable)
- `codex.txt` — external review
- `review_second.txt` — 2 agents (customizable)
- `finalize.txt` — optional post-reviews step (disabled by default)

**Docker Support:**
```bash
# Use wrapper script with Go image (default)
curl -sL https://raw.githubusercontent.com/umputun/ralphex/master/scripts/ralphex-dk.sh -o /usr/local/bin/ralphex
chmod +x /usr/local/bin/ralphex
ralphex docs/plans/feature.md  # Runs in container

# Or use base image
export RALPHEX_IMAGE=ghcr.io/umputun/ralphex:latest

# Isolation: project dir read-write, ~/.claude read-only, no host system access
```

**Why Docker?** ralphex runs with `--dangerously-skip-permissions` — container isolation prevents Claude from accessing host system outside the project directory.

## Evaluation

### Strengths
- **Zero setup** — works out of the box with sensible defaults
- **Fresh context per task** — prevents model degradation during long plans
- **Multi-phase review pipeline** — catches issues human reviewers would spot
- **Fully customizable** — agents, prompts, external tools all configurable
- **Web dashboard** — `--serve` flag provides real-time browser view with SSE
- **Docker isolation** — safe autonomous execution with container-based sandboxing
- **Notification support** — Telegram, Email, Slack, Webhook, custom script
- **Comment-friendly** — lines starting with `#` stripped from prompts/agents
- **Active development** — last commit Feb 7, 2026, responsive maintainer
- **Comprehensive docs** — excellent README, FAQ, troubleshooting, llms.txt

### Weaknesses
- **Requires ralphex-specific plans** — can't execute arbitrary task lists, needs `### Task N:` format
- **Codex dependency for full review** — external review phase requires codex (or custom script)
- **Git repository required** — won't run outside a repo (branch management + diffs)
- **No plan DAG** — tasks execute sequentially, no dependency graph
- **Agent noise** — 5 agents in first review can produce overlapping feedback
- **Iteration limits** — max_iterations config prevents infinite loops but can cut work short
- **Progress tracking** — progress files are plaintext logs, not structured (hard to parse programmatically)

### Community Sentiment

From [GitHub repository](https://github.com/umputun/ralphex):
- 299 stars, active issues/PRs, community forks (e.g., [hlexx/ralphex](https://github.com/hlexx/ralphex) with codex-primary changes)
- [ralphex.com](https://ralphex.com/) — official site with llms.txt for LLM consumption
- Published Feb 3, 2026 — very recent launch
- Built in Go, cross-platform (macOS, Linux, Windows via Docker)

**Alternatives:**
- **Native Ralph (how-to-ralph-wiggum)** — simpler but no multi-phase review
- **Ralphy** — Ruby-based, less mature
- **OMC Autopilot** — 32 agents, model routing, TDD, more complex

ralphex is the most polished standalone Ralph loop tool with multi-phase review built-in.

### Compared To

- **OMC Autopilot** — More agents (32), model routing, TDD enforcement. ralphex is simpler, focuses on review pipeline.
- **Ralphy** — Ruby-based, less mature, no multi-phase review.
- **Native Ralph (how-to-ralph-wiggum)** — Pattern, not a tool. ralphex implements it with review layers.
- **Claude Squad** — Process manager (tmux sessions), not execution engine.

ralphex's unique value: **multi-phase code review pipeline** with parallel agents, external AI review, and final validation before merge.

## Our Usage

**Status: Evaluated** — reviewed thoroughly, strong contender for Phase 3 (Run It), but deferring in favor of OMC Autopilot to test 32-agent approach first.

**Rationale:**
- **Strengths align with Holy Grail:** Fresh-context execution, autonomous loop, git-native, markdown-based plans
- **Multi-phase review impressive:** 5-agent parallel first review + codex + 2-agent second review catches more issues than single-pass
- **Docker isolation valuable:** Safe autonomous execution with `--dangerously-skip-permissions`
- **Web dashboard useful:** Real-time monitoring aligns with "Flag It" phase visibility needs

**Why deferring:**
- **OMC chosen first:** Want to test 32-agent approach with model routing + TDD enforcement before adopting ralphex
- **Plan format lock-in:** ralphex requires `### Task N:` format — Beads outputs different structure, would need `/pour` adapter
- **Codex dependency:** External review phase requires codex (or custom script) — adds setup complexity

**When to revisit:**
- If OMC proves too complex or heavyweight
- If multi-phase review pipeline becomes critical (OMC has review but not 5-agent parallel)
- If Docker isolation becomes a requirement for safety

**Configuration (if adopted):**
```bash
# Install
brew install umputun/apps/ralphex

# Create plan
ralphex --plan "add user authentication"

# Execute with web dashboard
ralphex --serve docs/plans/add-user-auth.md

# Docker mode (safer for autonomous execution)
curl -sL https://raw.githubusercontent.com/umputun/ralphex/master/scripts/ralphex-dk.sh -o /usr/local/bin/ralphex
chmod +x /usr/local/bin/ralphex
ralphex --serve docs/plans/add-user-auth.md
```

**Integration with Beads:**
Need `/pour` slash command to convert Beads dependency graph to ralphex's sequential plan format.

## Scoring

| Criterion | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| Holy Grail alignment | 4.5/5 | 30% | 1.35 |
| Simplicity | 4/5 | 20% | 0.80 |
| Community trust | 4/5 | 15% | 0.60 |
| Ecosystem fit | 4/5 | 15% | 0.60 |
| Cost efficiency | 3.5/5 | 10% | 0.35 |
| Maturity | 4/5 | 10% | 0.40 |
| **Total** | | | **4.10** |

**Holy Grail alignment (4.5/5):** Directly addresses Phase 3 (Run It). Fresh-context execution, autonomous loop, multi-phase review, git-native, markdown plans. Only missing: direct Beads integration and built-in "Flag It" notifications (though it has webhook support).

**Simplicity (4/5):** Zero-config defaults, one-command install (Homebrew or go install), sensible agent/prompt defaults. Loses 1 point for custom agents/prompts requiring manual file editing.

**Community trust (4/5):** Active development, honest documentation, comprehensive README, FAQ, troubleshooting. Published very recently (Feb 2026) but already 299 stars and community engagement.

**Ecosystem fit (4/5):** Designed specifically for Claude Code + codex. Docker support for isolation. Git-native. Markdown plans. Loses 1 point for ralphex-specific plan format (not compatible with Beads output without adapter).

**Cost efficiency (3.5/5):** Requires codex for external review phase (GPT-5.2 costs). Multiple Claude Code sessions (one per task + 7 agents total across phases). Docker mode adds resource overhead but no infrastructure fees. Can disable external review to reduce costs.

**Maturity (4/5):** Very new (published Feb 2026) but built by experienced maintainer (umputun), comprehensive docs, active issues/PRs, cross-platform support, Docker images published. Loses 1 point for newness.

## Sources

- [GitHub: umputun/ralphex](https://github.com/umputun/ralphex)
- [ralphex.com](https://ralphex.com/)
- [llms.txt](https://github.com/umputun/ralphex/blob/master/llms.txt)
- [Docker Blog: Run Claude Code safely with Docker Sandboxes](https://www.docker.com/blog/docker-sandboxes-run-claude-code-and-other-coding-agents-unsupervised-but-safely/)
- [hlexx/ralphex fork](https://github.com/hlexx/ralphex)

---
*Last reviewed: 2026-02-07*
