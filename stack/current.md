# Current Tech Stack

> The recommended tools for Adam's autonomous development system.
> Last updated: 2026-02-07

## The Holy Grail --- Phase-by-Phase

### Phase 1: Spec It

| Role | Tool | Stars | Status | Install | Notes |
|------|------|-------|--------|---------|-------|
| Brownfield specs | [OpenSpec](https://github.com/Fission-AI/OpenSpec) | 22,700 | CHOSEN | `npm install -g @fission-ai/openspec@latest` | Active on frequency-first. 6 baseline specs, 8 changes. |
| Greenfield specs | [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD) | 34,500 | CHOSEN | `npx bmad-method install` | Not yet installed. Waiting for stable v6 release. |
| Quick PRD capture | [prd-generator](https://github.com/dredozubov/prd-generator) | 12 | Watching | Plugin install | Low priority --- OpenSpec's /opsx:explore covers most use cases. |

### Phase 2: Task It

| Role | Tool | Stars | Status | Install | Notes |
|------|------|-------|--------|---------|-------|
| Git-native tasks | [Beads](https://github.com/steveyegge/beads) | 15,104 | CHOSEN | `brew install steveyegge/beads/bd` | Not yet installed. Hash-based IDs, dependency graphs, JSONL format. |
| Task generation (alternative) | [Claude Task Master](https://github.com/eyaltoledano/claude-task-master) | 25,315 | Watching | `npx task-master-ai init` | Large community. IDE-first, not git-native. Watching for headless improvements. |

### Phase 3: Run It

| Role | Tool | Stars | Status | Install | Notes |
|------|------|-------|--------|---------|-------|
| Autonomous execution | [Oh-My-ClaudeCode](https://github.com/Yeachan-Heo/oh-my-claudecode) | 4,844 | CHOSEN | Marketplace plugin | 5 modes (Autopilot, Ultrapilot, Swarm, Pipeline, Ecomode). 32 agents. |
| Auto-restart on limits | [claude-auto-resume](https://github.com/terryso/claude-auto-resume) | ~1,200 | CHOSEN | `curl -fsSL .../install.sh \| bash` | Foundational --- every autonomous session wraps with this. |
| Multi-agent coordination | Native Agent Teams | N/A | CHOSEN | `export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` | Feb 2026. DAG-based, worktree-isolated. 5-7x cost. |

### Phase 4: Flag It

| Role | Tool | Stars | Status | Install | Notes |
|------|------|-------|--------|---------|-------|
| Blocker notification | [OpenClaw](https://github.com/nicepkg/openclaw) | 167,000 | CHOSEN (isolated) | Docker only | NOT an orchestrator. Read-only blocker file + Telegram. Currently not running. |

### Phase 5: Repeat It

| Role | Tool | Stars | Status | Install | Notes |
|------|------|-------|--------|---------|-------|
| Scheduling | [runCLAUDErun](https://runclauderun.com/) | N/A | CHOSEN | macOS app download | Native macOS. launchd-backed. GUI scheduling. |
| Process management | [Claude Squad](https://github.com/smtg-ai/claude-squad) | ~5,000 | CHOSEN | `brew install claude-squad` | TUI. Git worktree isolation. Auto-accept mode. |

## Integration Chain

```
runCLAUDErun (scheduling)
  -> Claude Squad (session management)
    -> claude-auto-resume (usage limit handling)
      -> Oh-My-ClaudeCode (execution modes + agents)
        -> OpenSpec / Beads (what to work on)
        -> Native Agent Teams (within-session parallelism)
  -> OpenClaw [Docker] (blocker detection -> Telegram)
```

## Supporting Tools (Evaluate Next)

| Tool | Category | Stars | Holy Grail Phase | Why Evaluate |
|------|----------|-------|------------------|-------------|
| [Context7](https://github.com/upstash/context7) | context | 44,850 | 3-Run (supporting) | Most-installed plugin (71.8K installs). Eliminates doc hallucinations. Zero config. |
| [claude-mem](https://github.com/thedotmack/claude-mem) | memory | 24,300 | 3-Run (supporting) | Solves #1 pain point: cross-session memory. 5 lifecycle hooks. Endless Mode beta. |
| [Vibe Kanban](https://github.com/BloopAI/vibe-kanban) | orchestration | 20,700 | 2-Task + 3-Run | Visual dashboard for parallel agents. Multi-tool support. |
| [Auto-Claude](https://github.com/AndyMik90/Auto-Claude) | execution | 11,500 | 2+3+5 | All-in-one Kanban + execution + QA. Could simplify the stack. |
| [Gas Town](https://github.com/steveyegge/gastown) | orchestration | 8,500 | 3-Run | Yegge's Beads execution layer. 20-30 agents. Wait for budget to justify. |
| [QMD](https://github.com/tobi/qmd) | context | 6,847 | Supporting | 95% token reduction for markdown search. MCP server. By Tobi Lutke. |
| [Cipher](https://github.com/campfirein/cipher) | memory | 3,502 | Supporting | Cross-tool memory via MCP. Evaluate if we diversify beyond Claude Code. |
| [Claude HUD](https://github.com/jarrodwatts/claude-hud) | notification | 3,079 | 4-Flag | Real-time context/agent statusline. Pairs with Claude Squad. |
| [claude-auto-resume](https://github.com/terryso/claude-auto-resume) | scheduling | ~1,200 | 5-Repeat | Already CHOSEN. Listed here for completeness. |
| [Destructive Command Guard](https://github.com/kenryu42/claude-code-safety-net) | safety | 976 | 3-Run (supporting) | Catches rm -rf, git push --force. Essential for --dangerously-skip-permissions. |
| [ccflare / better-ccflare](https://github.com/tombii/better-ccflare) | monitoring | ~820 | 5-Repeat | Web dashboard for cost tracking. Middle ground before claude-code-otel. |
| [ccmanager](https://github.com/kbwo/ccmanager) | process | 815 | 3-Run | Multi-agent session manager. No tmux dependency. Evaluate if tmux is problematic. |
| [Ralph Playbook](https://github.com/ClaytonFarr/ralph-playbook) | reference | 735 | 3-Run | Required reading before implementing Ralph loops. Not a tool. |
| [claude-code-otel](https://github.com/ColeMurray/claude-code-otel) | monitoring | ~500 | 5-Repeat | Full Prometheus + Grafana stack. Phase 6 when running 4-5 nightly loops. |
| [Adversarial Spec](https://github.com/zscole/adversarial-spec) | spec | 474 | 1-Spec | Multi-LLM debate for high-stakes specs. Niche but interesting. |

## Explicitly Rejected

| Tool | Stars | Why Rejected | Date |
|------|-------|-------------|------|
| [claude-flow](https://github.com/claude-flow) | 13,700 | Fabricated 84.8% SWE-Bench benchmark. Broken memory and hooks. 92% overlap with native Agent Teams. | 2026-02-06 |
| [Spec Kit](https://github.com/github/spec-kit) | 67,886 | Good but heavy. Greenfield-optimized. ~18.6K tokens just loading commands. Context window issues. | 2026-02-06 |
| [Conductor](https://www.conductor.build/) | N/A | Closed source. macOS only. No headless mode. No CLI. Claude Squad preferred. | 2026-02-07 |
| Kimi | N/A | Competing model ecosystem. Not relevant to our Claude Code workflow. | 2026-02-06 |
| Living Spec skill | N/A | No author, no repo, no update path. Retired. | 2026-02-06 |

## Installation Status

| Tool | Installed? | Where | Next Step |
|------|-----------|-------|-----------|
| OpenSpec | Yes | frequency-first | Initialize on linkedin/app and firstcomment |
| Agent Teams (env var) | Yes | ~/.zshrc | Already enabled |
| BMAD Method | No | --- | Wait for stable v6, then install per-project |
| Beads | No | --- | `brew install steveyegge/beads/bd` then `bd init` on active projects |
| Oh-My-ClaudeCode | No | --- | Install from marketplace |
| claude-auto-resume | No | --- | `curl -fsSL .../install.sh \| bash` |
| Claude Squad | No | --- | `brew install claude-squad` |
| runCLAUDErun | No | --- | Download macOS app |
| OpenClaw | No (broken) | /Users/adamjanes/code/ralph/ | Clean reinstall + Docker containerization |
