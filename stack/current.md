# Current Tech Stack

> Quick-reference tables for Adam's autonomous development system.
> For the full narrative explanation, see [how-it-works.md](how-it-works.md).
> Last updated: 2026-02-07

## The Holy Grail — Five Phases + Platform

### Phase 1: Spec It

| Role | Tool | Score | Status | Install | Notes |
|------|------|-------|--------|---------|-------|
| Brownfield specs | [OpenSpec](https://github.com/Fission-AI/OpenSpec) | 4.75 | CHOSEN | `npm install -g @fission-ai/openspec@latest` | Installed globally. Not yet initialized on any project. |
| Greenfield specs | [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD) | 2.95 | Planned | `npx bmad-method install` | For future 0-to-1 projects. Not needed yet. |

### Phase 2: Task It

| Role | Tool | Score | Status | Install | Notes |
|------|------|-------|--------|---------|-------|
| Git-native tasks | [Beads](https://github.com/steveyegge/beads) | 4.65 | CHOSEN | `brew install steveyegge/beads/bd` | Not yet installed. |
| Spec-to-tasks bridge | /pour (DIY) | — | To build | Custom slash command | Reads OpenSpec tasks.md, runs `bd add` + `bd dep`. |

### Phase 3: Build It

| Role | Tool | Score | Status | Install | Notes |
|------|------|-------|--------|---------|-------|
| Multi-agent execution engine | [Oh-My-ClaudeCode](https://github.com/Yeachan-Heo/oh-my-claudecode) | 4.20 | CHOSEN | Marketplace plugin | **Installation method:** `claude`, then `/plugin marketplace add https://github.com/Yeachan-Heo/oh-my-claudecode` + `/plugin install oh-my-claudecode` + `/oh-my-claudecode:omc-setup`. See [omc-installation-guide.md](omc-installation-guide.md). 7 execution modes (autopilot, ultrawork, ralph, ultrapilot, ecomode, swarm, pipeline) + 32 agents + intelligent model routing. |
| Within-session parallelism | Native Agent Teams | 4.00 | CHOSEN | `export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` | Already enabled in ~/.zshrc. |
| Methodology (deferred) | [Superpowers](https://github.com/obra/superpowers) | 3.85 | Deferred | Marketplace plugin | Install OMC first. Only add if OMC's agents aren't sufficient. Test for conflicts with OMC's auto-triggering. |
| TDD quality gate (if needed) | [TDD Guard](https://github.com/nicepkg/tdd-guard) | 3.65 | Deferred | Hooks install | May be redundant with OMC's tdd-guide agent. Evaluate after OMC is live. |

### Phase 4: Verify It

| Role | Tool | Score | Status | Install | Notes |
|------|------|-------|--------|---------|-------|
| Full CI validation | Per-project verify script | — | To build | `verify.sh` per project | `npm run lint && typecheck && test && build` before merge. |
| Visual review (V1) | Manual | — | Active | None | Adam eyeballs deployed version. Automate later with Chrome screenshots. |

### Phase 5: Learn It

| Role | Tool | Score | Status | Install | Notes |
|------|------|-------|--------|---------|-------|
| Session learnings | /harvest (DIY) | — | To build | Custom slash command | Extracts learnings into knowledge/updates/. |

### Infrastructure Platform

| Role | Tool | Score | Status | Install | Notes |
|------|------|-------|--------|---------|-------|
| Process management | [Claude Squad](https://github.com/smtg-ai/claude-squad) | 4.75 | CHOSEN | `brew install claude-squad` | TUI. Git worktree isolation. Not yet installed. |
| Resilience | [claude-auto-resume](https://github.com/terryso/claude-auto-resume) | 4.65 | CHOSEN | `curl -fsSL .../install.sh \| bash` | Wraps every session. Not yet installed. |
| Scheduling | [runCLAUDErun](https://runclauderun.com/) | 4.05 | CHOSEN | macOS app download | Nightly scheduling. Not yet installed. |
| Blocker notification | [OpenClaw](https://github.com/nicepkg/openclaw) | 3.55 | CHOSEN (isolated) | Docker only | Read-only blocker file + Telegram. Currently broken. |
| Safety: commands | [Destructive Command Guard](https://github.com/kenryu42/claude-code-safety-net) | 3.55 | Planned | Rust binary | Catches rm -rf, git push --force. |
| Safety: isolation | Git worktrees (Claude Squad) | — | Built-in | — | Every session on its own branch. |

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  THE FIVE PHASES (development work)                 │
│                                                     │
│  1. SPEC IT ──→ 2. TASK IT ──→ 3. BUILD IT         │
│     OpenSpec       Beads          OMC Multi-Agent   │
│                    /pour          7 modes           │
│                                   32 agents         │
│                                   model routing     │
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

## Supporting Tools (Evaluate Next)

| Tool | Category | Score | Why Evaluate |
|------|----------|-------|-------------|
| [Context7](https://github.com/upstash/context7) | context | 4.05 | Most-installed plugin (71.8K installs). Eliminates doc hallucinations. Zero config. |
| [ccusage](https://github.com/yayoc/ccusage) | monitoring | 4.10 | Cost tracking across sessions. Pairs with OMC's built-in monitoring. |
| [claude-mem](https://github.com/thedotmack/claude-mem) | memory | 2.90 | Cross-session memory. Wait for stability reports. |
| [Ralph TUI](https://github.com/snwfdhmp/ralph-tui) | execution | 3.70 | Native Beads integration + remote orchestration. Revisit for Mac Mini visibility. |
| [Choo Choo Ralph](https://github.com/mj-meyer/choo-choo-ralph) | execution | 3.40 | Concepts adopted (pour/harvest). Revisit the tool when it matures. |

## Explicitly Rejected

| Tool | Score | Why Rejected | Date |
|------|-------|-------------|------|
| [claude-flow](https://github.com/claude-flow) | 1.75 | Fabricated benchmarks. Broken memory/hooks. 92% overlap with native Agent Teams. | 2026-02-06 |
| Kimi | N/A | Competing model ecosystem. | 2026-02-06 |
| Living Spec skill | N/A | No author, no repo, no update path. | 2026-02-06 |
| Pencil.dev | N/A | Closed-source, VC-backed, no community, very early stage. Design tool, not verification. | 2026-02-07 |

## Installation Status

### Installed
| Tool | Where |
|------|-------|
| OpenSpec CLI (v1.1.1) | Global (`openspec` in PATH) |
| Agent Teams env var | ~/.zshrc |

### Not Yet Installed
| Tool | Next Step |
|------|-----------|
| Oh-My-ClaudeCode | Open Claude Code and follow [omc-installation-guide.md](omc-installation-guide.md) |
| Beads | `brew install steveyegge/beads/bd` then `bd init` on active projects |
| claude-auto-resume | `curl -fsSL .../install.sh \| bash` |
| Claude Squad | `brew install claude-squad` |
| runCLAUDErun | Download macOS app |
| Destructive Command Guard | Install Rust binary |
| OpenClaw | Clean reinstall + Docker containerization |

### Not Yet Built
| Tool | What it is |
|------|-----------|
| /pour | Slash command: OpenSpec tasks → Beads |
| /harvest | Slash command: session learnings → knowledge/updates/ |
| verify.sh | Per-project CI script: lint + types + test + build |
