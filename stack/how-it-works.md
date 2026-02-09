# How the System Works

> A plain-English guide to Adam's autonomous development system.
> Read this top to bottom and you'll know exactly what every piece does and how they connect.
> Last updated: 2026-02-07

## The Idea in One Paragraph

You set direction. AI agents do the coding. You review their work, unblock them when they're stuck, and steer — but you're not writing code. The system follows five development phases — spec, task, build, verify, learn — running on an infrastructure platform that handles scheduling, process management, resilience, notifications, and safety. Some parts are manual today (you review the UI, you set priorities) and get automated over time. Multiple agents can work on different projects in parallel, each in isolated git branches so they can't break each other's work.

---

## The Five Phases

| # | Phase | What happens | Tools |
|---|-------|-------------|-------|
| 1 | **Spec It** | Define what to build | OpenSpec |
| 2 | **Task It** | Break into dependency-aware tasks | Beads, /pour |
| 3 | **Build It** | Plan → implement with TDD → code review, per task | Oh-My-ClaudeCode |
| 4 | **Verify It** | Full project validation: test suite + lint + types + build | CI scripts / GitHub Actions |
| 5 | **Learn It** | Capture what happened, what worked, what failed | /harvest |

These five phases are the **development work**. The infrastructure that keeps the cycle running overnight (scheduling, auto-resume, process management, blocker notifications, safety) is the **platform** — described separately below.

---

## Phase 1: Spec It — OpenSpec

**What it is:** A spec-writing framework. You describe a change you want to make to an existing codebase, and OpenSpec structures that into a formal specification with requirements, affected files, tasks, and acceptance criteria.

**How it works in practice:**
- You run `openspec init --tools claude` in a project to set it up
- When you want to build something, you run `/opsx:ff` (fast-forward mode) and describe what you want
- OpenSpec creates a `changes/your-change-name/` folder with structured markdown files: `requirements.md`, `tasks.md`, `design.md`
- The `tasks.md` file is the critical output — it's the list of concrete things to implement
- OpenSpec uses delta notation: `[ADDED]`, `[MODIFIED]`, `[REMOVED]` to be precise about what changes in an existing codebase

**Why this one:** Lightweight (~250 lines of core code), brownfield-first (built for changing existing projects, not starting from scratch), and context-efficient (one user completed 54 file changes using only 30% of their context window). Scored 4.75/5.

**What it replaces:** Jumping straight into coding without a plan. Or spending hours writing specs manually. OpenSpec makes the agent think before it codes.

**V1 (now):** Adam writes/reviews specs manually. OpenSpec structures them.
**V2 (later):** Agent proposes specs from a backlog, Adam approves/rejects.

**Status:** CLI installed globally (`openspec` command works). Not yet initialized on any project.

---

## Phase 2: Task It — Beads + /pour

### Beads — "What to do next"

**What it is:** A task tracker that lives inside your git repo. Like GitHub Issues, but stored as files in a `.beads/` folder that gets committed alongside your code.

**How it works in practice:**
- You run `bd init` in a project to set it up
- Tasks are created with `bd add "Fix the auth bug"` — each gets a hash-based ID like `bd-a1b2`
- Tasks can depend on each other: `bd dep bd-a1b2 bd-c3d4` means "finish a1b2 before starting c3d4"
- An agent asks "what should I work on?" by running `bd list --unblocked` — Beads returns only the tasks whose dependencies are satisfied
- When a task is done, the agent runs `bd done bd-a1b2` and the next unblocked task becomes available
- Everything is stored as JSONL (one JSON object per line) — a format designed to avoid merge conflicts

**Why this one:** When multiple agents work on the same project, you need a system that won't break:
1. **Merge conflicts on the task list** — two agents edit the same file simultaneously. With Beads, JSONL is append-only, so git merges cleanly.
2. **Race conditions** — two agents both grab the same task. With Beads, hash-based IDs and `bd start` provide locking.
3. **No ordering** — agents implement things in the wrong order. Beads' dependency graph enforces correct order.
4. **Network kills the loop** — tasks in GitHub Issues are unreachable during network hiccups. Beads is local files.
5. **ID collisions** — two agents on different branches both create "Task 12." Beads uses content-hashed IDs, so collisions are impossible.

**What the data looks like:**
```jsonl
{"id":"bd-a1b2","type":"task","title":"Add login endpoint","status":"open","deps":[]}
{"id":"bd-c3d4","type":"task","title":"Add auth middleware","status":"open","deps":["bd-a1b2"]}
{"id":"bd-e5f6","type":"task","title":"Add protected routes","status":"open","deps":["bd-c3d4"]}
```

**Status:** Not yet installed. Install: `brew install steveyegge/beads/bd`.

### /pour — "Specs become tasks"

**What it is:** A custom slash command we'll build. It reads the `tasks.md` file that OpenSpec produces and converts each task into a Bead with the right dependencies.

**How it works in practice:**
- OpenSpec creates `changes/new-feature/tasks.md` with a structured task list
- You run `/pour new-feature`
- The command parses tasks.md, runs `bd add` for each task, and `bd dep` to wire up dependencies
- Now the tasks live in Beads and agents can pick them up autonomously

**V1 (now):** Adam reviews the task list after /pour and sets priorities manually.
**V2 (later):** Auto-prioritization based on labels, urgency, or project needs.

**Status:** Not yet built. Concept from Choo Choo Ralph (23 stars, too young to depend on).

---

## Phase 3: Build It — Native Agent Teams + OMC (thin wrapper)

> **Strategy (Decision #21, 2026-02-09):** Native Agent Teams is the long-term execution engine. OMC is a thin, disposable wrapper used only for features Agent Teams doesn't have yet (persistence loops, model routing). Don't invest in learning OMC's full abstraction set. When Agent Teams ships model routing, migrate off OMC entirely.

### Native Agent Teams — "The long-term engine"

**What it is:** Anthropic's built-in multi-agent feature. A Team Lead coordinates multiple Teammates, each with their own 1M token context and git worktree, working in parallel on a shared task DAG.

**How it works:**
- Enabled via: `export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` (already in ~/.zshrc)
- Team Lead decomposes work into a task DAG with dependencies
- Teammates pick up tasks when prerequisites are met, work in parallel
- Peer-to-peer messaging between teammates (not just hub-and-spoke)
- Git worktree isolation prevents merge conflicts
- **Delegate mode** (Shift+Tab): locks Lead to coordination only — matches our orchestrator pattern
- View task list: Ctrl+T

**What it does well today:**
- Parallel execution across files/concerns
- DAG-based task scheduling with dependency tracking
- Research and review with competing hypotheses
- Cross-layer coordination (frontend/backend/tests each owned by a teammate)

**What it can't do yet (and why we still need OMC wrappers):**
- No model routing (can't send simple tasks to Haiku, complex to Opus)
- No persistence through rate limits (session ends = state lost)
- No "don't stop until done" enforcement (no ralph-style loops)
- No built-in cost monitoring

**When to use Agent Teams vs. Claude Squad:**
- **Agent Teams** = multiple agents inside ONE session, working on ONE project collaboratively
- **Claude Squad** = multiple SEPARATE sessions, each working on a DIFFERENT project independently

**Cost note:** Each teammate loads full context (~1M tokens). A team of 5 uses ~5-7x the tokens. Use for big tasks, not routine work.

**Status:** Already enabled in ~/.zshrc. Experimental but functional.

### OMC — "Thin execution wrappers until Agent Teams matures"

**What we use from OMC (and nothing more):**

| Wrapper | What it does | When Agent Teams replaces it |
|---------|-------------|------------------------------|
| **Autopilot** | Persistent single-agent loop | When Agent Teams gets session resumption |
| **Ralph** | "Don't stop until architect verifies" loop | When Agent Teams gets completion enforcement |
| **Ultrapilot** | 3-5x parallel execution | Agent Teams already does this — use Agent Teams instead when stable |

**What we deliberately ignore from OMC:**
- 32 agent personas (CLAUDE.md + Task tool subagent_type already handles this)
- 7 execution modes (we use 2-3 max)
- Skill system, HUD, cost monitoring CLI
- Swarm, Pipeline, Ecomode modes

**Migration trigger:** Native Agent Teams ships cost-aware model routing (Haiku/Sonnet/Opus selection per task). When that happens, OMC is dropped with zero regret.

### What about Superpowers?

Superpowers (47.6K stars, by obra) is a methodology framework that enforces brainstorm → plan → TDD → review. It's complementary to *any* execution engine — Agent Teams or OMC.

**Our approach:** Evaluate Superpowers independently. It's a methodology layer, not an execution engine. Can sit on top of Agent Teams just as easily as on top of OMC. Deferred until execution engine is stable.

**Status:** Deferred.

---

## Phase 4: Verify It — Full Project Validation

**What it is:** After all tasks for a feature are built, run the full test suite + lint + type check + build to confirm the whole project still works. This is the gate between "worktree branch" and "main."

**Why it's separate from Build It:** During Build It, the agent writes tests for each individual task (per-task TDD). But passing one task's tests doesn't mean the whole project still builds. Task 3 might introduce a type error that Task 5 depends on. Verify It catches integration-level breakage that per-task testing misses.

**How it works in practice:**
- Agent finishes all unblocked beads for a feature
- Agent runs a verification script: `npm run lint && npm run typecheck && npm run test && npm run build`
- If everything passes, the worktree branch is ready to merge
- If something fails, the agent fixes it before proceeding
- For client projects (`clients/`): the agent creates a PR. Adam reviews before merge.
- For personal projects (`projects/`): the agent can merge directly if verification passes.

**V1 (now):** Automated tests + **Adam opens the deployed version and eyeballs it**. Manual visual review is fine for now.
**V2 (later):** Agent takes Chrome screenshots of affected pages and reviews them visually (Claude is multimodal). Tools like Pix (Figma MCP + Chrome) could automate design fidelity checking when we have Figma designs.

**What's needed:** A `verify.sh` or CI workflow per project. Set up once during project bootstrap.

**Status:** Not yet built. Each project needs a verification script.

---

## Phase 5: Learn It — /harvest

**What it is:** A custom slash command that runs after a session completes. It extracts what was learned — patterns that worked, mistakes made, things discovered — and saves them as structured knowledge.

**How it works in practice:**
- Agent finishes a session (all unblocked beads done, or a blocker was hit)
- `/harvest` runs, reviewing what happened during the session
- It creates a file in `knowledge/updates/YYYY-MM-DD-topic.md` documenting the work
- Over time, these accumulate into a knowledge base that makes future sessions smarter

**Why this matters:** Without harvest, the system is open-loop — it produces code but never improves. Session 10 is no smarter than session 1. With harvest, patterns compound. The fifth time the agent works on a project, it has four sessions of documented context to draw on. This is the compound interest of the system.

**Status:** Not yet built.

---

## The Infrastructure Platform

The five phases above are the development work. The tools below keep the cycle running — especially overnight when Adam is asleep.

### Claude Squad — "Process manager"

**What it is:** A terminal dashboard (TUI) for running multiple Claude Code sessions simultaneously. Each session gets its own git worktree.

**How it works:**
- `brew install claude-squad` then `claude-squad`
- Press `n` to create a session — give it a name, directory, and prompt
- Press `a` for auto-accept mode (fully autonomous, no permission prompts)
- Each session gets its own git worktree — changes can't break each other
- Press `q` to quit — sessions keep running in the background

**Planned setup on Mac Mini:**
```
Session: ff-talentflow    → /path/to/fractional-first/talentflow     [auto-accept]
Session: linkedin         → /path/to/linkedin/app                    [auto-accept]
Session: frequency-first  → /path/to/frequency-first                 [auto-accept]
Session: firstcomment     → /path/to/firstcomment                    [auto-accept]
```

**Status:** Not yet installed.

### claude-auto-resume — "Survives rate limits"

**What it is:** A wrapper that detects usage limits, waits for reset, and auto-restarts.

**How it works:**
```bash
claude-auto-resume -p "work on tasks"
```
1. Launches Claude Code normally
2. Monitors output for "You've reached your usage limit. Resets at 3:00 AM"
3. Displays countdown: `Limit hit. Resuming in 2h 34m...`
4. Restarts when the timer hits zero
5. Beads knows what's done, so the agent picks up the next unblocked task

**Why it's critical:** Without this, overnight runs stop at the first rate limit. Someone has to manually restart. claude-auto-resume means "start it, go to bed, it handles the rest."

**Status:** Not yet installed.

### runCLAUDErun — "Nightly scheduling"

**What it is:** A native macOS app for scheduling Claude Code sessions. Like an alarm clock for your AI agents.

**How it works:**
- Download from runclauderun.com
- Create scheduled runs with directory, prompt, schedule, and timeout
- Uses launchd under the hood — reliable after sleep/wake
- Run history shows what happened

**Planned schedule:**
```
00:00  frequency-first
00:05  linkedin
00:10  firstcomment
00:15  fractional-first (PR workflow)
```

**Status:** Not yet installed.

### OpenClaw — "Blocker notifications via Telegram"

**What it is:** An AI agent with a "heartbeat" that checks for blockers and messages Adam on Telegram. We run it locked down in Docker.

**How it works (our restricted setup):**
1. When an agent gets stuck, it writes a blocker to `~/.claude/shared-state/blockers.jsonl`
2. OpenClaw runs in Docker with **read-only** access to that one file + Telegram (outbound only)
3. Every 15 minutes it checks for new blockers
4. New blocker → Telegram message to Adam
5. Adam replies with instructions

**Why Docker isolation:** Prevents $75-500 API bills, malicious skills, accidental code modification, and credential exposure.

**Status:** Currently broken. Needs clean reinstall and Docker containerization.

### Safety Layers

Three layers, always on:

**Layer 1: Git Worktree Isolation** (free, built into Claude Squad)
Every session runs on its own branch. If an agent makes a mess, `main` is untouched.

**Layer 2: Destructive Command Guard** (pre-execution hook, Rust)
Intercepts `rm -rf`, `git push --force`, `git reset --hard`, `DROP TABLE` before execution. Critical for `--dangerously-skip-permissions` mode.

**Layer 3: Docker Isolation** (OpenClaw only)
OpenClaw has read-only access to one file and Telegram. Nothing else.

**Additional guardrails:**
- Client project PR workflow: agents create PRs, Adam reviews before merge
- Cost monitoring: `omc stats` and `omc cost` track spending
- Ecomode routes to cheaper models when full power isn't needed

---

## How They Fit Together

### The Architecture

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  THE FIVE PHASES (development work)                 │
│                                                     │
│  1. SPEC IT ──→ 2. TASK IT ──→ 3. BUILD IT         │
│     OpenSpec       Beads          OMC Autopilot     │
│     /pour          bd list        32 agents         │
│                    --unblocked    model routing      │
│                                                     │
│             4. VERIFY IT ──→ 5. LEARN IT            │
│                test suite       /harvest             │
│                lint + types     knowledge/updates/   │
│                build gate                            │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  THE PLATFORM (keeps the cycle running)             │
│                                                     │
│  Scheduling:    runCLAUDErun (nightly triggers)     │
│  Process:       Claude Squad (multi-session TUI)    │
│  Resilience:    claude-auto-resume (limit handling) │
│  Notification:  OpenClaw [Docker] (Telegram alerts) │
│  Safety:        Worktree isolation + Cmd Guard      │
│  Parallelism:   Native Agent Teams (within-session) │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### A Night in the Life

**6:00 PM — Adam sets direction (HITL: spec review + priority setting)**

1. Adam opens frequency-first and describes what he wants: "Add a user profile page with edit capability"
2. He runs `/opsx:ff` — OpenSpec creates `changes/user-profile/requirements.md`, `tasks.md`, `design.md`
3. He reviews the spec, tweaks a few things, approves it
4. He runs `/pour user-profile` — the tasks become Beads with dependencies:
   - `bd-a1b2` "Create user profile API endpoint" (no deps)
   - `bd-c3d4` "Add profile database migration" (no deps)
   - `bd-e5f6` "Build profile page component" (depends on a1b2)
   - `bd-g7h8` "Add profile edit form" (depends on e5f6)
   - `bd-i9j0` "Write integration tests" (depends on g7h8)
5. He reviews the task list — reorders if needed, adjusts priorities
6. He does the same for linkedin and firstcomment
7. Adam goes to dinner

**12:00 AM — The platform starts the cycle**

1. **runCLAUDErun** fires at midnight, launching the frequency-first session
2. **Claude Squad** creates a git worktree (isolated branch off main)
3. **claude-auto-resume** wraps the session for rate limit handling
4. **OMC Autopilot** takes over — reads CLAUDE.md for context

**12:01 AM — Phase 3: Build It**

1. Agent runs `bd list --unblocked` — sees two available tasks (no dependencies)
2. Picks "Create user profile API endpoint"
3. OMC's tdd-guide agent kicks in — writes a test first (RED), implements (GREEN), cleans up (REFACTOR)
4. OMC routes models: Haiku for boilerplate, Sonnet for business logic
5. Agent runs `bd done bd-a1b2` — "Build profile page component" becomes unblocked
6. Continues: pick task → TDD → done → next task

**1:45 AM — Phase 4: Verify It**

1. All beads for user-profile are done
2. Agent runs verification: `npm run lint && npm run typecheck && npm run test && npm run build`
3. Full test suite passes — the whole project still works
4. Agent merges worktree branch (personal project, direct merge OK)

**1:46 AM — Phase 5: Learn It**

1. `/harvest` auto-triggers — reviews what happened
2. Creates `knowledge/updates/2026-02-08-user-profile.md` documenting the work
3. Agent checks `bd list --unblocked` for any remaining work across the project

**2:15 AM — Rate limit hit**

1. Claude Code: "Usage limit reached. Resets at 4:30 AM"
2. **claude-auto-resume** starts countdown: `Resuming in 2h 15m...`
3. Meanwhile, linkedin and firstcomment sessions continue in their own Claude Squad sessions

**3:00 AM — Agent gets stuck**

1. The linkedin agent can't proceed — tests depend on a missing database table
2. Writes blocker to `~/.claude/shared-state/blockers.jsonl`
3. **OpenClaw** (Docker) checks at 3:15 AM, messages Adam on Telegram

**4:30 AM — Rate limit resets**

1. **claude-auto-resume** restarts Claude Code
2. Beads knows what's done — agent picks up where it left off

**7:00 AM — Adam reviews (HITL: visual review + unblocking)**

1. Checks Telegram — sees linkedin blocker. Replies with fix instructions.
2. SSHs into Mac Mini, opens Claude Squad dashboard:
   - frequency-first: ✅ Feature complete, merged to main, deployed via Vercel
   - linkedin: ⏸ Blocked (waiting for Adam's reply)
   - firstcomment: ✅ All tasks complete
3. **Opens the deployed version of frequency-first** — eyeballs the new profile page
4. Reviews the git diffs for anything that needs changes
5. Specs the next round of work for tonight

---

## The HITL Progression

The system doesn't need to be fully autonomous on day one. Some steps are manual now and get automated over time.

| Phase | V1 (Now — manual is fine) | V2 (Automate later) |
|-------|--------------------------|---------------------|
| **Spec It** | Adam writes/reviews specs | Agent proposes specs from backlog, Adam approves |
| **Task It** | Adam reviews task list, sets priorities after /pour | Auto-prioritization based on labels/urgency |
| **Build It** | Automated (OMC handles execution) | Same, potentially with Superpowers methodology if OMC agents aren't enough |
| **Verify It** | Automated tests + Adam eyeballs the deployed version | Agent takes Chrome screenshots, compares against references |
| **Learn It** | /harvest auto-captures at session end | Learnings auto-feed into next spec cycle |

The goal is to systematically remove HITL bottlenecks as the system proves itself. Start with the manual safety net, earn trust, then automate.

---

## What's Installed vs. What's Not

### Development Phases

| Tool | Phase | Installed? | What's needed |
|------|-------|-----------|---------------|
| OpenSpec CLI | Spec It | ✅ Yes (global) | `openspec init --tools claude` on each project |
| Beads | Task It | ❌ No | `brew install steveyegge/beads/bd` then `bd init` per project |
| /pour command | Task It | ❌ Not built | Custom slash command |
| Oh-My-ClaudeCode | Build It | ❌ No | Install from Claude Code marketplace |
| Verify scripts | Verify It | ❌ Not built | Per-project `verify.sh` or CI workflow |
| /harvest command | Learn It | ❌ Not built | Custom slash command |

### Infrastructure Platform

| Tool | Role | Installed? | What's needed |
|------|------|-----------|---------------|
| Agent Teams env var | Parallelism | ✅ Yes (~/.zshrc) | Already working |
| Claude Squad | Process mgmt | ❌ No | `brew install claude-squad` |
| claude-auto-resume | Resilience | ❌ No | `curl -fsSL .../install.sh \| bash` |
| runCLAUDErun | Scheduling | ❌ No | Download macOS app |
| OpenClaw | Notifications | ❌ Broken | Clean reinstall + Docker containerization |
| Destructive Cmd Guard | Safety | ❌ No | Rust binary install |

### Deferred (evaluate later)

| Tool | Why deferred |
|------|-------------|
| Superpowers | Install OMC first. Only add if OMC's 32 agents don't provide enough development discipline. |
| TDD Guard | May be redundant with OMC's tdd-guide agent. Evaluate after OMC is tested. |
| Visual testing (Pix-style) | V1 uses manual visual review. Automate when we have Chrome screenshot workflow established. |

---

## Glossary

| Term | Meaning |
|------|---------|
| **Ralph** | The pattern of running Claude Code in a continuous loop. Named after Adam's Mac Mini. OMC Autopilot IS a Ralph loop implementation. |
| **Bead** | A single task in Beads. Has an ID, title, status, and dependencies. |
| **Worktree** | A git feature that lets you have multiple branches checked out simultaneously. Each agent session works in its own worktree. |
| **JSONL** | JSON Lines — one JSON object per line. Append-friendly, merge-safe, machine-readable. |
| **DAG** | Directed Acyclic Graph — tasks point to their prerequisites. Used by Beads and Agent Teams. |
| **HUD** | Heads-Up Display — OMC's terminal statusline showing mode, agent, tokens, progress. |
| **TDD** | Test-Driven Development — write test first (RED), make it pass (GREEN), clean up (REFACTOR). |
| **Pour** | Converting OpenSpec tasks into Beads. Concept from Choo Choo Ralph. |
| **Harvest** | Extracting learnings after a session into structured documentation. |
| **HITL** | Human In The Loop — steps where Adam is involved manually. Reduced over time. |
| **Holy Grail** | The five-phase development cycle: Spec It → Task It → Build It → Verify It → Learn It. |

---

## Related Docs

| Doc | What it contains |
|-----|-----------------|
| [current.md](current.md) | Quick-reference tables of all tools with scores, install commands, and status |
| [decisions.md](decisions.md) | Why we chose each tool, what alternatives we considered, dates |
| [roadmap.md](roadmap.md) | What to install next, in what order, with triggers for re-evaluation |

For deep dives on any individual tool, see the relevant entry in `catalogue/`.
