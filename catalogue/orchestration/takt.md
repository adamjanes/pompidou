# takt

| Field | Value |
|-------|-------|
| GitHub | [nrslib/takt](https://github.com/nrslib/takt) |
| Stars | 277 |
| Last Commit | 2026-02-07 |
| Install | `npm install -g takt` |
| Status | Watching |
| Category | orchestration |
| Holy Grail Phase | Supporting |
| Score | **3.80** |

## What It Does

takt (Task Agent Koordination Tool) is a YAML-based multi-agent orchestration system that runs Claude Code and Codex through declarative workflow definitions called "pieces". Each piece defines movements (steps), agents, permission modes, routing rules, and failure handling. It supports interactive mode (refine task with AI before execution), GitHub Issue integration, task file batch processing (`.takt/tasks/`), isolated execution with shared clones, parallel movements with aggregate conditions, pipeline mode for CI/CD, and session logs in NDJSON format with automatic context inheritance.

## How It Works

**Music Metaphor:**
- **Piece** — workflow definition (YAML file)
- **Movement** — step inside a piece (plan → implement → review)
- **Orchestration** — engine coordinating agents across movements

**Piece Structure:**
```yaml
name: default
max_iterations: 10
initial_movement: plan

movements:
  - name: plan
    agent: ../agents/default/planner.md
    model: opus
    edit: false
    rules:
      - condition: Planning complete
        next: implement
    instruction_template: |
      Analyze the request and create an implementation plan.

  - name: implement
    agent: ../agents/default/coder.md
    edit: true
    permission_mode: edit
    rules:
      - condition: Implementation complete
        next: review
      - condition: Blocked
        next: ABORT
    instruction_template: |
      Implement based on the plan.

  - name: review
    agent: ../agents/default/architecture-reviewer.md
    edit: false
    rules:
      - condition: Approved
        next: COMPLETE
      - condition: Needs fix
        next: implement
    instruction_template: |
      Review the implementation from architecture and code quality perspectives.
```

**Rule Condition Types:**
| Type | Syntax | Description |
|------|--------|-------------|
| Tag-based | `"condition text"` | Agent outputs `[MOVEMENTNAME:N]` tag, matched by index |
| AI judge | `ai("condition text")` | AI evaluates condition against agent output |
| Aggregate | `all("X")` / `any("X")` | Aggregates parallel sub-movement matched conditions |

**Parallel Movements:**
```yaml
  - name: reviewers
    parallel:
      - name: arch-review
        agent: ../agents/default/architecture-reviewer.md
        rules:
          - condition: approved
          - condition: needs_fix
      - name: security-review
        agent: ../agents/default/security-reviewer.md
        rules:
          - condition: approved
          - condition: needs_fix
    rules:
      - condition: all("approved")
        next: supervise
      - condition: any("needs_fix")
        next: fix
```

**Builtin Pieces:**
| Piece | Description |
|-------|-------------|
| `default` | Full dev: plan → arch design → implement → AI review → parallel review (architect + security) → supervisor |
| `minimal` | Quick: plan → implement → review → supervisor |
| `review-fix-minimal` | Review-focused: review → fix → supervisor |
| `research` | Research: planner → digger → supervisor (autonomous, no questions) |
| `expert` | Full-stack: architecture, frontend, security, QA reviews with fix loops |
| `expert-cqrs` | CQRS+ES specialized: CQRS+ES, frontend, security, QA reviews |
| `magi` | Evangelion-inspired: 3 AI personas (MELCHIOR, BALTHASAR, CASPER) analyze and vote |
| `coding` | Lightweight: architect-planner → implement → parallel review (antipattern + arch) → fix |
| `passthrough` | Thinnest wrapper: task → coder, no review |
| `review-only` | Read-only code review, no changes |

**Hybrid Codex variants** (`*-hybrid-codex`): Coder on Codex, reviewers on Claude. Available for: default, minimal, expert, expert-cqrs, passthrough, review-fix-minimal, coding.

**Builtin Agents:**
| Agent | Role |
|-------|------|
| planner | Task analysis, spec investigation, planning |
| architect-planner | Task analysis + design planning |
| coder | Feature implementation, bug fixing |
| ai-antipattern-reviewer | AI-specific antipatterns (non-existent APIs, incorrect assumptions, scope creep) |
| architecture-reviewer | Architecture and code quality review |
| qa-reviewer | Test coverage and QA |
| security-reviewer | Security vulnerabilities |
| conductor | Phase 3 judgment: reads reports, outputs status tags |
| supervisor | Final validation, approval |

**Modes:**
```bash
# Interactive mode (refine task with AI)
takt                          # Select piece, refine, execute
takt hello                    # Initial message, refine, execute

# Direct task execution
takt --task "Fix bug"         # Skip interactive, execute directly
takt #6                       # Execute GitHub Issue #6
takt --issue 6                # Same as above

# Task management (batch processing)
takt add                      # Refine task, add to .takt/tasks/
takt add #28                  # Add GitHub Issue #28
takt run                      # Execute all pending tasks
takt watch                    # Monitor .takt/tasks/, auto-execute (resident)
takt list                     # List task branches, merge/delete

# Pipeline mode (CI/CD)
takt --pipeline --task "Fix bug" --auto-pr
takt --pipeline --issue 99 --auto-pr
takt --pipeline --task "Fix bug" --skip-git  # Piece-only, no git ops
takt --pipeline --task "Fix bug" --quiet     # Minimal output

# Other
takt switch                   # Interactively switch pieces
takt eject                    # Copy builtin pieces/agents to .takt/ (project)
takt eject --global           # Copy to ~/.takt/ (global)
takt clear                    # Clear agent conversation sessions
takt export-cc                # Deploy as Claude Code Skill
takt prompt [piece]           # Preview assembled prompts
takt config                   # Configure permission mode
takt reset categories         # Reset piece categories to defaults
```

**Configuration** (`~/.takt/config.yaml` or `.takt/config.yaml` per-project):
```yaml
language: en
default_piece: default
log_level: info
provider: claude         # 'claude' or 'codex'
model: sonnet            # Default model (optional, provider-specific aliases)

# API Keys (optional, can use env vars TAKT_ANTHROPIC_API_KEY / TAKT_OPENAI_API_KEY)
anthropic_api_key: sk-ant-...
# openai_api_key: sk-...

# Pipeline templates (optional)
pipeline:
  default_branch_prefix: "takt/"
  commit_message_template: "feat: {title} (#{issue})"
  pr_body_template: |
    ## Summary
    {issue_body}
    Closes #{issue}
```

**Task Files** (`.takt/tasks/`):
```yaml
# YAML format (recommended)
task: "Add authentication feature"
worktree: true                  # Execute in isolated shared clone
branch: "feat/add-auth"         # Branch name (auto-generated if omitted)
piece: "default"                # Piece specification (uses current if omitted)
```

```markdown
# Markdown format (simple, backward compatible)
Add login feature to the application.

Requirements:
- Username and password fields
- Form validation
- Error handling on failure
```

**Isolated Execution:** Specifying `worktree` in YAML creates ephemeral shared clones (`.git` directory independent, not gitdir pointer to main repo). Auto-commit + push + delete after completion. Branches persist, use `takt list` to manage.

**Session Logs** (`.takt/logs/`):
- `.takt/logs/latest.json` — Pointer to current/latest session
- `.takt/logs/previous.json` — Pointer to previous session
- `.takt/logs/{sessionId}.jsonl` — NDJSON log per piece execution

Agents can read `previous.json` to inherit context from prior execution. Session continuation is automatic.

**GitHub Actions Integration:**
[takt-action](https://github.com/nrslib/takt-action) automates PR reviews and task execution. Example workflow:
```yaml
name: TAKT
on:
  issue_comment:
    types: [created]
jobs:
  takt:
    if: contains(github.event.comment.body, '@takt')
    runs-on: ubuntu-latest
    permissions:
      contents: write
      issues: write
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
      - uses: nrslib/takt-action@main
        with:
          anthropic_api_key: ${{ secrets.TAKT_ANTHROPIC_API_KEY }}
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

## Evaluation

### Strengths
- **Declarative workflow** — YAML pieces define structure, not left to agent non-determinism
- **Visible and replayable** — NDJSON session logs make decisions auditable
- **Parallel movements** — aggregate conditions (`all()`, `any()`) enable complex coordination
- **Builtin library** — 10+ pieces covering common patterns (full-stack, CQRS, research, review-only)
- **CI/CD ready** — pipeline mode with `--quiet`, `--skip-git`, `--auto-pr`, GitHub Actions integration
- **Hybrid Codex support** — coder on Codex, reviewers on Claude (cost optimization)
- **Task batch processing** — `.takt/tasks/` with `watch` mode enables accumulate-and-execute workflow
- **API Key support** — direct Anthropic/OpenAI API calls, no CLI required
- **Agentless movements** — instruction-only movements don't require agent files
- **Session inheritance** — agents read previous session logs for context

### Weaknesses
- **YAML learning curve** — requires understanding piece syntax, rules, variables
- **Git repository required** — Codex SDK needs git repo (no `--skip-git-repo-check` like CLI)
- **Limited parallelism** — parallel movements within a single piece only, not cross-piece
- **No built-in notifications** — requires custom integration (webhook, script)
- **Task file limitations** — YAML format supports `worktree`, but Markdown format is simpler (no options)
- **Model resolution complexity** — priority chain (movement > agent > global > provider default) can be confusing
- **No native dashboard** — relies on NDJSON logs, no real-time UI (unlike ralphex web dashboard)
- **Isolated execution cleanup** — ephemeral clones deleted after task, but branches persist (requires manual `takt list` management)

### Community Sentiment

From web search and GitHub:
- [nrslib/takt](https://github.com/nrslib/takt): 277 stars, active development (last commit Feb 7, 2026)
- [Zenn.dev blog (Japanese)](https://zenn.dev/nrs/articles/c6842288a526d7): *"TAKT - AI Agent Orchestration: Design philosophy and practical usage guide"*
- [Medium: "Oh My Claude Code - The Only Agents Swarm Orchestration You Need" (Jan 2026)](https://medium.com/@joe.njenga/i-tested-oh-my-claude-code-the-only-agents-swarm-orchestration-you-need-7338ad92c00f): Community comparison, TAKT positioned as "declarative coordination" vs. OMC's "execution focus"
- [Shipyard blog (2026)](https://shipyard.build/blog/claude-code-multi-agent/): *"Multi-agent orchestration for Claude Code in 2026"* — mentions TAKT alongside other coordination tools
- [GitHub Gists](https://gist.github.com/kieranklaassen/d2b35569be2c7f1412c64861a219d51f): *"Claude Code Multi-Agent Orchestration System"* — references TAKT as YAML-based workflow alternative

**Alternatives:**
- **OMC Autopilot** — 32 agents, execution-focused. TAKT is coordination-focused.
- **ralphex** — Plan execution + multi-phase review. TAKT is workflow-agnostic.
- **Native Agent Teams** — Claude Code built-in. TAKT adds declarative routing and aggregate conditions.

takt's unique value: **YAML-defined workflows with declarative routing, parallel movements with aggregate conditions, and CI/CD-ready pipeline mode**.

### Compared To

- **OMC Autopilot** — Execution system (32 agents, model routing, TDD). TAKT is orchestration layer (define coordination, not execution details).
- **ralphex** — Plan execution tool with multi-phase review. TAKT is workflow engine (any workflow, not just plan execution).
- **Native Agent Teams** — Claude Code built-in parallel agents. TAKT adds declarative routing, aggregate conditions, CI/CD mode, session logs.
- **Claude Swarm** — Multi-agent coordination. TAKT adds YAML-defined structure, not ad-hoc coordination.

takt's unique value: **Declarative YAML workflows make agent coordination visible, replayable, and CI/CD-friendly**.

## Our Usage

**Status: Watching** — valuable for structured multi-agent workflows, but adds abstraction layer. Monitor for ecosystem fit with chosen tools.

**Rationale:**
- **Strengths align with orchestrator pattern:** YAML pieces define coordination structure, not left to agent non-determinism
- **CI/CD integration impressive:** Pipeline mode + GitHub Actions enable automated PR reviews and task execution
- **Parallel movements useful:** Aggregate conditions (`all()`, `any()`) enable complex coordination (e.g., 5 reviewers must all approve)
- **Session logs valuable:** NDJSON format with automatic context inheritance supports session continuation

**Why watching, not chosen:**
- **Abstraction layer:** YAML pieces add overhead — need to learn syntax, variables, rules
- **Overlap with OMC:** OMC Autopilot already provides 32-agent coordination with model routing. TAKT's declarative approach is different but solving similar problems.
- **No Beads integration:** Task file format doesn't match Beads dependency graph output, would need adapter
- **Ecosystem fit uncertain:** Need to test if TAKT pieces complement OMC agents or compete with them

**When to revisit:**
- If OMC's imperative approach proves too complex and declarative YAML workflows are cleaner
- If CI/CD integration becomes critical (GitHub Actions automation)
- If parallel review workflows with aggregate conditions become a requirement (e.g., 5 reviewers all approve before merge)
- If session log inheritance proves valuable for long-running workflows

**Configuration (if adopted):**
```bash
# Install
npm install -g takt

# Initialize project
cd project-repo
takt config  # Configure provider, model

# Interactive mode
takt  # Select piece, refine task with AI, execute

# Direct execution with GitHub Issue
takt #42 --auto-pr

# Task batch processing
takt add #28  # Add GitHub Issue to .takt/tasks/
takt add #29
takt run      # Execute all pending tasks

# CI/CD (GitHub Actions)
# Add takt-action to .github/workflows/
# Trigger with @takt in issue comments
```

**Custom Pieces:** Use `takt eject` to copy builtin pieces to `.takt/pieces/` for customization.

## Scoring

| Criterion | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| Holy Grail alignment | 3.5/5 | 30% | 1.05 |
| Simplicity | 3/5 | 20% | 0.60 |
| Community trust | 4/5 | 15% | 0.60 |
| Ecosystem fit | 4/5 | 15% | 0.60 |
| Cost efficiency | 4/5 | 10% | 0.40 |
| Maturity | 3.5/5 | 10% | 0.35 |
| **Total** | | | **3.80** |

**Holy Grail alignment (3.5/5):** Supporting infrastructure for multi-agent orchestration. Parallel movements with aggregate conditions enable complex coordination (e.g., Phase 4 "Verify It" with 5 reviewers). CI/CD integration supports "Repeat It" phase. Loses 1.5 points for lack of direct integration with OpenSpec/Beads (workflow-agnostic, not Holy Grail-specific).

**Simplicity (3/5):** YAML pieces require learning syntax, variables, rules. Builtin pieces provide good starting point. npm install is easy. Loses 2 points for abstraction layer complexity vs. native Ralph loops.

**Community trust (4/5):** 277 stars, active development (last commit Feb 7, 2026), comprehensive docs, blog posts explaining design philosophy, GitHub Actions integration. Loses 1 point for relatively small community vs. established tools.

**Ecosystem fit (4/5):** Works with Claude Code and Codex. API Key support enables direct API calls (no CLI required). Git-native. NDJSON session logs. GitHub Actions integration. Loses 1 point for no Beads/OpenSpec integration (would need adapters).

**Cost efficiency (4/5):** API Keys enable direct Anthropic/OpenAI calls (same pricing as CLI). Hybrid Codex mode (coder on Codex, reviewers on Claude) optimizes costs. No infrastructure fees. Loses 1 point for potential redundant agent calls during complex workflows.

**Maturity (3.5/5):** Active development, comprehensive docs, 10+ builtin pieces, GitHub Actions integration. Relatively new (277 stars). Loses 1.5 points for newness and smaller community vs. established orchestration tools.

## Sources

- [GitHub: nrslib/takt](https://github.com/nrslib/takt)
- [Zenn.dev: TAKT - AI Agent Orchestration (Japanese)](https://zenn.dev/nrs/articles/c6842288a526d7)
- [GitHub: takt-action](https://github.com/nrslib/takt-action)
- [Medium: Oh My Claude Code - The Only Agents Swarm Orchestration You Need](https://medium.com/@joe.njenga/i-tested-oh-my-claude-code-the-only-agents-swarm-orchestration-you-need-7338ad92c00f)
- [Shipyard: Multi-agent orchestration for Claude Code in 2026](https://shipyard.build/blog/claude-code-multi-agent/)
- [GitHub Gist: Claude Code Multi-Agent Orchestration System](https://gist.github.com/kieranklaassen/d2b35569be2c7f1412c64861a219d51f)

---
*Last reviewed: 2026-02-07*
