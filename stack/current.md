# Current Tech Stack

> The recommended tools for Adam's autonomous development system.
> Last updated: 2026-02-07

## The Holy Grail --- Phase-by-Phase

### Phase 1: Spec It

| Role | Tool | Score | Status | Install | Notes |
|------|------|-------|--------|---------|-------|
| Brownfield specs | [OpenSpec](https://github.com/Fission-AI/OpenSpec) | 4.75 | CHOSEN | `npm install -g @fission-ai/openspec@latest` | Installed globally. Not yet initialized on any project. |
| Greenfield specs | [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD) | 2.95 | Planned | `npx bmad-method install` | For future 0-to-1 projects. Not needed yet. |

### Phase 2: Task It

| Role | Tool | Score | Status | Install | Notes |
|------|------|-------|--------|---------|-------|
| Git-native tasks | [Beads](https://github.com/steveyegge/beads) | 4.65 | CHOSEN | `brew install steveyegge/beads/bd` | Not yet installed. Essential for multi-agent concurrency (hash IDs, dependency graph, merge-safe JSONL). |

### Phase 3: Run It

| Role | Tool | Score | Status | Install | Notes |
|------|------|-------|--------|---------|-------|
| Execution engine | [Oh-My-ClaudeCode](https://github.com/Yeachan-Heo/oh-my-claudecode) | 4.20 | CHOSEN | Marketplace plugin | Ralph loop + 5 modes + 32 agents + model routing. Not yet installed. |
| Methodology layer | [Superpowers](https://github.com/obra/superpowers) | 3.85 | Planned | Marketplace plugin | Layers on OMC: brainstorm, plan, TDD, review. Test for conflicts with OMC first. |
| Auto-restart on limits | [claude-auto-resume](https://github.com/terryso/claude-auto-resume) | 4.65 | CHOSEN | `curl -fsSL .../install.sh \| bash` | Wraps every autonomous session. Not yet installed. |
| Within-session parallelism | Native Agent Teams | 4.00 | CHOSEN | `export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` | Already enabled in ~/.zshrc. DAG-based, worktree-isolated. |
| TDD quality gate | [TDD Guard](https://github.com/nicepkg/tdd-guard) | 3.65 | Planned | Hooks install | Blocks code without tests. May be redundant with Superpowers' TDD skill. |
| Safety net | [Destructive Command Guard](https://github.com/kenryu42/claude-code-safety-net) | 3.55 | Planned | Rust binary | Catches rm -rf, git push --force. Essential for --dangerously-skip-permissions. |

### Phase 4: Flag It

| Role | Tool | Score | Status | Install | Notes |
|------|------|-------|--------|---------|-------|
| Blocker notification | [OpenClaw](https://github.com/nicepkg/openclaw) | 3.55 | CHOSEN (isolated) | Docker only | NOT an orchestrator. Read-only blocker file + Telegram. Not yet running. |

### Phase 5: Repeat It

| Role | Tool | Score | Status | Install | Notes |
|------|------|-------|--------|---------|-------|
| Scheduling | [runCLAUDErun](https://runclauderun.com/) | 4.05 | CHOSEN | macOS app download | Native macOS. launchd-backed. GUI scheduling. Not yet installed. |
| Process management | [Claude Squad](https://github.com/smtg-ai/claude-squad) | 4.75 | CHOSEN | `brew install claude-squad` | TUI. Git worktree isolation. Auto-accept mode. Not yet installed. |

### Spec-to-Beads Bridge (DIY)

| Role | Approach | Notes |
|------|----------|-------|
| Pour (tasks.md -> Beads) | Custom `/pour` slash command | Reads OpenSpec tasks.md, runs `bd add` + `bd dep`. Replaces Choo Choo Ralph's pour phase. |
| Harvest (learnings capture) | Custom `/harvest` slash command | After completing work, extracts learnings into knowledge/updates/. Inspired by Choo Choo Ralph. |

## Execution Architecture

```
┌─────────────────────────────────┐
│  Adam (direction, review)       │
├─────────────────────────────────┤
│  OpenSpec (what to build)       │  ← Phase 1
├─────────────────────────────────┤
│  Beads (what's next, deps)      │  ← Phase 2
├─────────────────────────────────┤
│  OMC Autopilot (execute)        │  ← Phase 3
│  + Superpowers (methodology)    │
│  + TDD Guard (quality gate)     │
│  + Destructive Cmd Guard (safe) │
├─────────────────────────────────┤
│  OpenClaw (blocker alerts)      │  ← Phase 4
├─────────────────────────────────┤
│  runCLAUDErun + auto-resume     │  ← Phase 5
│  Claude Squad (process mgmt)    │
└─────────────────────────────────┘
```

### How a loop runs:

1. **runCLAUDErun** triggers a scheduled session (or Adam kicks one off manually)
2. **Claude Squad** manages the process in a tmux session with worktree isolation
3. **claude-auto-resume** wraps the session to handle usage limits
4. **OMC Autopilot** runs the Ralph loop with model routing
5. Agent reads **CLAUDE.md** for project context
6. Agent runs `bd list --unblocked` to get next task from **Beads**
7. Agent executes: implement, test (**TDD Guard** enforces), commit
8. Agent marks bead done, picks up next unblocked bead
9. If stuck -> writes blocker -> **OpenClaw** pings Adam on Telegram
10. If context limit -> **claude-auto-resume** restarts with fresh context
11. Beads knows what's done, agent picks up where it left off

## Integration Chain

```
runCLAUDErun (scheduling)
  -> Claude Squad (session management, worktree isolation)
    -> claude-auto-resume (usage limit handling)
      -> Oh-My-ClaudeCode (execution modes + agents)
        -> Superpowers (methodology: plan, TDD, review)
        -> OpenSpec / Beads (what to work on)
        -> Native Agent Teams (within-session parallelism)
  -> OpenClaw [Docker] (blocker detection -> Telegram)
```

## Supporting Tools (Evaluate Next)

| Tool | Category | Score | Why Evaluate |
|------|----------|-------|-------------|
| [Context7](https://github.com/upstash/context7) | context | 4.05 | Most-installed plugin (71.8K installs). Eliminates doc hallucinations. Zero config. |
| [ccusage](https://github.com/yayoc/ccusage) | scheduling | 4.10 | Cost tracking across sessions. Pairs with OMC's built-in monitoring. |
| [claude-mem](https://github.com/thedotmack/claude-mem) | memory | 2.90 | Cross-session memory. Wait for stability reports. |
| [Ralph TUI](https://github.com/snwfdhmp/ralph-tui) | execution | 3.70 | Native Beads integration + remote orchestration. Revisit for Mac Mini visibility. |
| [Choo Choo Ralph](https://github.com/mj-meyer/choo-choo-ralph) | execution | 3.40 | Concepts adopted (pour/harvest). Revisit the tool itself when it matures. |

## Explicitly Rejected

| Tool | Score | Why Rejected | Date |
|------|-------|-------------|------|
| [claude-flow](https://github.com/claude-flow) | 1.75 | Fabricated 84.8% SWE-Bench benchmark. Broken memory and hooks. 92% overlap with native Agent Teams. | 2026-02-06 |
| Kimi | N/A | Competing model ecosystem. Not relevant to our Claude Code workflow. | 2026-02-06 |
| Living Spec skill | N/A | No author, no repo, no update path. Retired. | 2026-02-06 |

## Installation Status

| Tool | Installed? | Where | Next Step |
|------|-----------|-------|-----------|
| OpenSpec | CLI only | Global (`openspec` in PATH, v1.1.1) | `openspec init --tools claude` on frequency-first |
| Agent Teams (env var) | Yes | ~/.zshrc | Already enabled |
| Beads | No | --- | `brew install steveyegge/beads/bd` then `bd init` on active projects |
| Oh-My-ClaudeCode | No | --- | Install from marketplace |
| Superpowers | No | --- | Install from marketplace, test for OMC conflicts |
| claude-auto-resume | No | --- | `curl -fsSL .../install.sh \| bash` |
| Claude Squad | No | --- | `brew install claude-squad` |
| runCLAUDErun | No | --- | Download macOS app |
| OpenClaw | No (broken) | /Users/adamjanes/code/ralph/ | Clean reinstall + Docker containerization |
| TDD Guard | No | --- | Evaluate after Superpowers (may be redundant) |
| Destructive Command Guard | No | --- | Install before enabling --dangerously-skip-permissions |
