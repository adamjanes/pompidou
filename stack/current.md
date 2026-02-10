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
| Execution wrapper (interim) | [Oh-My-ClaudeCode](https://github.com/Yeachan-Heo/oh-my-claudecode) | 3.48 | CHOSEN (thin wrapper) | Marketplace plugin | **Thin layer only** — use autopilot/ralph/ultrapilot as execution wrappers. Don't invest in full OMC abstraction set. Score revised from 4.20 after independent verification (Decision #21). |
| Multi-agent execution (long-term) | Native Agent Teams | 4.00 | CHOSEN (primary) | `export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` | Already enabled in ~/.zshrc. **Migration trigger:** when Agent Teams ships model routing. Monitoring actively. |
| Methodology (deferred) | [Superpowers](https://github.com/obra/superpowers) | 3.85 | Deferred | Marketplace plugin | 47.6K stars, massive community. Evaluate independently of OMC — complementary to Agent Teams too. |
| TDD quality gate (if needed) | [TDD Guard](https://github.com/nicepkg/tdd-guard) | 3.65 | Deferred | Hooks install | Evaluate after execution engine stabilizes. |

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
| Process management | tmux (direct) | — | ACTIVE | `brew install tmux` (pre-installed on macOS) | Dreams of Code config. Replaced Claude Squad — worktree isolation unnecessary for multi-repo setup. See [shared/skills/tmux-parallel-sessions.md](../../../shared/skills/tmux-parallel-sessions.md). Decision #22. |
| Resilience | [claude-auto-resume](https://github.com/terryso/claude-auto-resume) | 4.65 | CHOSEN | `curl -fsSL .../install.sh \| bash` | Wraps every session. Not yet installed. |
| Scheduling | [runCLAUDErun](https://runclauderun.com/) | 4.05 | CHOSEN | macOS app download | Nightly scheduling. Not yet installed. |
| Blocker notification | [OpenClaw](https://github.com/nicepkg/openclaw) | 3.55 | CHOSEN (isolated) | Docker only | Read-only blocker file + Telegram. Currently broken. |
| Safety: commands | [Destructive Command Guard](https://github.com/kenryu42/claude-code-safety-net) | 3.55 | Planned | Rust binary | Catches rm -rf, git push --force. |
| Safety: isolation | Git worktrees (manual) | — | Available | `git worktree add` | For parallel Claude work on same repo. Not needed for separate projects. |

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
│  Process:       tmux (parallel sessions)             │
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
| Oh-My-ClaudeCode | `~/.claude/plugins/marketplaces/omc/` — see [omc-usage-guide.md](omc-usage-guide.md) |

### Not Yet Installed
| Tool | Next Step |
|------|-----------|
| Beads | `brew install steveyegge/beads/bd` then `bd init` on active projects |
| claude-auto-resume | `curl -fsSL .../install.sh \| bash` |
| Claude Squad | Superseded by tmux (Decision #22). Revisit only if worktree isolation needed. |
| runCLAUDErun | Download macOS app |
| Destructive Command Guard | Install Rust binary |
| OpenClaw | Clean reinstall + Docker containerization |

### Not Yet Built
| Tool | What it is |
|------|-----------|
| /pour | Slash command: OpenSpec tasks → Beads |
| /harvest | Slash command: session learnings → knowledge/updates/ |
| verify.sh | Per-project CI script: lint + types + test + build |
