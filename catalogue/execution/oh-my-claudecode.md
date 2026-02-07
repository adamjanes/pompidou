# Oh My ClaudeCode

| Field | Value |
|-------|-------|
| GitHub | [Yeachan-Heo/oh-my-claudecode](https://github.com/Yeachan-Heo/oh-my-claudecode) |
| Stars | 4,844 |
| Last Commit | 2026-02 (active) |
| Install | Claude Code marketplace plugin |
| Status | ★ CHOSEN |
| Category | execution |
| Holy Grail Phase | 3-Run |

## What It Does

Oh My ClaudeCode (OMC) is a multi-agent orchestration framework for Claude Code that provides five execution modes, 32 specialized agents, and 31+ skills with zero configuration. It transforms Claude Code from a single-agent tool into a full development team that can run autonomously (Autopilot), in parallel (Ultrapilot at 3-5x speed), as coordinated swarms (Swarm), in sequential chains (Pipeline), or in cost-efficient mode (Ecomode). The key value is that it adds sophisticated multi-agent behavior on top of Claude Code without requiring any infrastructure or learning curve.

## How It Works

**Five execution modes:**

| Mode | Description | Use Case |
|------|-------------|----------|
| **Autopilot** | Fully autonomous single-agent | Standard autonomous builds |
| **Ultrapilot** | 3-5x parallel execution | Large features, multi-file changes |
| **Swarm** | Coordinated agent teams | Complex projects needing specialization |
| **Pipeline** | Sequential chains | Multi-step workflows (build → test → deploy) |
| **Ecomode** | Token-efficient | Refactoring, small tasks, budget-conscious |

**Key commands:**
```bash
omc autopilot "Build auth system"      # Single autonomous agent
omc ultrapilot "Refactor API layer"    # Parallel execution
omc swarm "Full-stack feature"          # Coordinated team
omc pipeline build test deploy          # Sequential chain
omc eco "Fix typos in docs"             # Token-efficient mode

omc stats                               # Session statistics
omc cost daily                          # Daily cost report
omc cost weekly                         # Weekly cost report
```

**32 specialized agents** include roles like: architect, coder, tester, reviewer, security-reviewer, build-fixer, tdd-guide, code-reviewer, debugger, documenter, and more. Each agent has a defined persona, skill set, and trigger conditions.

**Intelligent model routing:** OMC automatically selects the right model (Haiku for simple tasks, Sonnet for standard work, Opus for complex reasoning) based on task complexity analysis. This aligns perfectly with our orchestrator pattern.

**Real-time HUD statusline** shows current mode, active agents, token usage, and progress — visible directly in the terminal.

## Evaluation

### Strengths
- Zero configuration — install as marketplace plugin, immediately available
- Five modes cover every development scenario from quick fixes to full builds
- Intelligent model routing saves tokens automatically (Haiku/Sonnet/Opus)
- 32 agents provide deep specialization without manual persona management
- Built-in cost monitoring (`omc stats`, `omc cost`) for budget control
- Real-time HUD gives terminal visibility into agent activity
- Active development with v4.0 planned (modular plugin architecture)
- Ecomode is genuinely useful for token-constrained environments

### Weaknesses
- Marketplace plugin distribution means version management is less explicit than npm/brew
- 32 agents and 5 modes is a lot of surface area — unclear how much is actually used in practice
- Token usage in Ultrapilot/Swarm modes can be substantial (3-5x parallel = 3-5x cost)
- Documentation is thorough but spread across multiple docs/ files
- No built-in task tracking — needs Beads or similar for persistent state
- v4.0 (modular architecture) not yet released — current version may change significantly

### Community Sentiment

Growing positive reception. The GitHub repo is actively maintained with frequent releases and detailed changelogs. The five-mode approach gets praise for flexibility — developers appreciate choosing between speed (Ultrapilot) and cost (Ecomode) based on the task. The 32-agent roster draws comparisons to BMAD Method's agent approach. Some skepticism about whether all 32 agents are meaningfully differentiated or if it's feature bloat. The real-time HUD and cost monitoring are consistently highlighted as standout features. Token usage concerns are the primary criticism, especially for Ultrapilot mode on Max plans with usage limits.

### Compared To

- **Ralph Plugin** (`catalogue/execution/ralph-plugin.md`): Ralph is a simpler loop (while true → prompt → execute). OMC adds modes, agents, model routing, and monitoring. OMC is more feature-rich; Ralph is more predictable.
- **ralph-claude-code** (`catalogue/execution/ralph-claude-code.md`): Frank Bria's implementation adds circuit breakers and exit detection to the Ralph loop. OMC goes further with full multi-agent orchestration. Different level of complexity.
- **ralph-orchestrator** (`catalogue/execution/ralph-orchestrator.md`): Similar philosophy (multi-agent, hat system) but in Rust with 7 backends. OMC is Claude Code-specific and simpler to set up.

## Our Usage

**Chosen for zero-config multi-agent execution.** OMC's five modes map directly to our needs:
- **Autopilot** for standard Ralph loops on personal projects
- **Ultrapilot** for large features that benefit from parallelism
- **Ecomode** for budget-conscious maintenance tasks
- **Pipeline** for build → test → deploy sequences

The intelligent model routing aligns with our orchestrator pattern (Haiku for grunt work, Sonnet for standard, Opus for complex). Built-in cost monitoring via `omc stats` and `omc cost` helps track API spend across all project loops.

**Configuration:** Install via Claude Code marketplace. No additional config needed. Per-project settings can be added to `.claude/` as OMC evolves.

## Sources

- [GitHub README](https://github.com/Yeachan-Heo/oh-my-claudecode)
- [Reference Docs](https://github.com/Yeachan-Heo/oh-my-claudecode/blob/main/docs/REFERENCE.md)
- [Migration Guide](https://github.com/Yeachan-Heo/oh-my-claudecode/blob/main/docs/MIGRATION.md)
- [Changelog](https://github.com/Yeachan-Heo/oh-my-claudecode/blob/main/CHANGELOG.md)
- [Releases](https://github.com/Yeachan-Heo/oh-my-claudecode/releases)

---
*Last reviewed: 2026-02-07*
