# OMC Usage Guide — Thin Wrapper Strategy

> **Decision #21 (2026-02-09):** OMC is a disposable execution wrapper. We use 3 commands. We ignore everything else. When Native Agent Teams ships model routing, we drop OMC.

## Status: Ready to Use

| Prerequisite | Status |
|---|---|
| Plugin installed | `~/.claude/plugins/marketplaces/omc/` |
| Agent symlink | `~/.claude/agents/oh-my-claudecode` -> plugin agents |
| Permission bypass | `bypassPermissions` in `~/.claude/settings.json` |
| Agent Teams env var | `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in `~/.zshrc` |

---

## The 3 Commands

### 1. Autopilot — "Do this task autonomously"

```
/oh-my-claudecode:autopilot "Build a REST API for user management with tests"
```

**What it does:** Single agent works through the task continuously, spawning sub-agents as needed. Loops until it considers the work done.

**When to use:** Standard autonomous work. Good for well-defined features.

**Gotcha:** Will claim completion prematurely. Scope tasks tightly.

---

### 2. Ralph — "Don't stop until it's verified done"

```
/oh-my-claudecode:ralph "Refactor auth module with full test coverage

Requirements:
1. Extract auth logic into service layer
2. Add unit tests for all public methods
3. Integration tests for login/logout flow

Acceptance criteria:
- All tests pass (>80% coverage)
- TypeScript strict, zero errors
- Build succeeds

Do NOT stop until ALL criteria met and architect verifies."
```

**What it does:** Persistent loop. Includes ultrawork (parallel agents). Blocks premature completion. Requires architect verification before exit.

**When to use:** Overnight/weekend autonomous runs. Multi-hour tasks where you need completion enforcement.

**Key difference from autopilot:** Ralph won't stop. Autopilot runs once and declares "done."

**NOT YET TESTED** — The 36h challenge used ultrapilot, not ralph. Test on a small task first.

---

### 3. Ultrapilot — "Do this fast in parallel"

```
/oh-my-claudecode:ultrapilot "Build a full-stack todo app:
- Frontend: React with TypeScript
- Backend: Express API
- Database: SQLite with migrations
- Tests: Unit + integration"
```

**What it does:** Spawns 3-5 parallel agents, each owning different files. 3-5x faster but 3-5x the token cost.

**When to use:** Large features with clear component boundaries (frontend/backend/tests).

**Proven:** 36h challenge built 3 projects in 30 minutes using this mode.

---

## How to Launch

### Interactive (testing)

```bash
cd /path/to/project
claude
# Then type the command:
/oh-my-claudecode:autopilot "your task"
```

### Tmux (autonomous runs)

```bash
# 1. Prevent Mac sleep
caffeinate -di -t 151200 &

# 2. Create isolated session
tmux new-session -d -s my-project -c /path/to/project

# 3. Start Claude
tmux send-keys -t my-project 'claude' C-m

# 4. Wait for init
sleep 8

# 5. Launch task
tmux send-keys -t my-project '/oh-my-claudecode:ralph "your task description"' C-m

# 6. Detach (Ctrl+B, D) — or just close terminal
# Check progress: tmux attach -t my-project
```

---

## Pre-Launch Checklist

Run this before any autonomous session:

```
[x] caffeinate running
[x] bypassPermissions in ~/.claude/settings.json
[x] Agent symlink exists: ls -la ~/.claude/agents/oh-my-claudecode
[x] Task scoped appropriately:
    - Autopilot: 30 min - 2 hours of work
    - Ralph: 2-12 hours of work (with verification criteria)
    - Ultrapilot: 1-4 hours, parallelizable components
[ ] Test with small task first if using a mode for the first time
```

---

## Known Gotchas

### 1. Premature Completion

**Problem:** Autopilot and ultrapilot claim "done" after 30 minutes even on large tasks.

**Fix:** Use ralph mode for anything that needs to be truly complete. Include explicit acceptance criteria.

### 2. Permission Prompts (first ~15 min)

**Problem:** OMC permission hooks only auto-approve Bash tool. Read, Edit, Write, Glob still prompt.

**Workaround:** When prompted, select "allow all edits during this session."

**Root cause:** `~/.claude/hooks/omc-hooks.json` PermissionRequest hook only has matcher for "Bash."

### 3. Agent Types Not Found

**Problem:** `Error: Agent type 'oh-my-claudecode:analyst' not found`

**Fix:** Verify symlink exists:
```bash
ls -la ~/.claude/agents/oh-my-claudecode
# Should point to: ~/.claude/plugins/marketplaces/omc/agents
```

If missing:
```bash
ln -s ~/.claude/plugins/marketplaces/omc/agents ~/.claude/agents/oh-my-claudecode
```

### 4. Session Blocked Silently

**Problem:** Session asks a question ("Fix critical issues?") and waits indefinitely.

**Mitigation:** Check tmux sessions periodically. Future: OpenClaw Telegram alerts.

---

## Task Scoping Guide

From the 36h challenge: tasks scoped as "MVP" finished in 8-28 minutes. For multi-hour autonomous work, scope bigger.

| Duration Target | Scope Example |
|---|---|
| **30 min** | "Add a user profile API endpoint with tests" |
| **2-4 hours** | "Build complete auth system: login, register, OAuth, 2FA, password reset, admin panel, tests" |
| **8-12 hours** | "Build full e-commerce: product catalog, cart, Stripe checkout, order management, email notifications, admin dashboard, E2E tests, deployment config" |

**Rule of thumb:** If you can describe it in one sentence, it's probably 30 minutes of work. For multi-hour ralph sessions, write a paragraph with numbered requirements and explicit acceptance criteria.

---

## What We Deliberately Ignore

These OMC features exist but we don't use them (Decision #21):

| Feature | Why we skip it |
|---|---|
| 32 agent personas | CLAUDE.md + Task tool `subagent_type` already does this |
| Swarm mode | Haven't needed coordinated multi-agent |
| Pipeline mode | Haven't needed sequential chaining |
| Ecomode | Token savings not worth learning another mode |
| HUD statusline | Nice-to-have, not essential |
| `omc stats` / `omc cost` | No cost monitoring needed for now |
| Skill system | Adds complexity, not value at this stage |
| Magic keywords | Just use the slash commands explicitly |

---

## Updating OMC

If needed (not routine):

```bash
# In Claude Code interactive session:
/plugin install oh-my-claudecode
/oh-my-claudecode:omc-setup
```

If broken after update: `/oh-my-claudecode:doctor`

---

## Migration Plan

**Trigger:** Native Agent Teams ships cost-aware model routing.

**What replaces what:**

| OMC Feature | Replacement |
|---|---|
| Autopilot | Agent Teams + claude-auto-resume |
| Ralph | Agent Teams + CLAUDE.md completion enforcement instructions |
| Ultrapilot | Agent Teams (already does parallel execution) |

**When it happens:** Remove OMC plugin, delete symlink, update CLAUDE.md instructions. Zero regret.

---

*Last updated: 2026-02-09*
*Replaces: omc-installation-guide.md (obsolete)*
