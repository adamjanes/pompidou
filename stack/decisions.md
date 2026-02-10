# Decision Log

> Documented decisions about the autonomous dev system tech stack.
> Each decision is tied to a Holy Grail phase and includes the rationale and alternatives considered.

## Active Decisions

| # | Date | Phase | Decision | Rationale | Alternatives Considered | Status |
|---|------|-------|----------|-----------|------------------------|--------|
| 1 | 2026-02-06 | 1-Spec | OpenSpec for brownfield specs | Lightweight (~250 lines core), brownfield-first delta specs, fast (/opsx:ff), context-efficient (30% window on 54-file changes). Better than Spec Kit for iterating on existing projects. Score: 4.75. | Spec Kit (3.40, heavy, greenfield-optimized, ~18.6K tokens to load), cc-sdd (2.60, unproven) | Active |
| 2 | 2026-02-06 | 1-Spec | BMAD Method planned for greenfield | 34.5K stars, 21 agent personas, 50+ workflows. Most comprehensive planning framework for 0-to-1 projects. Not needed yet — all current work is brownfield. Score: 2.95. | Spec Kit (less flexible), prd-generator (one-shot only) | Active |
| 3 | 2026-02-06 | 2-Task | Beads for cross-project task tracking | Git-native JSONL, hash-based IDs (no merge conflicts in multi-agent), dependency graphs (agents self-direct via `bd list --unblocked`), agent-optimized JSON output. Essential for autonomous multi-agent: prevents race conditions, merge conflicts, and ordering mistakes that break overnight loops. Score: 4.65. | Claude Task Master (3.25, IDE-first, single JSON file), CCPM (3.40, GitHub Issues API dependency), Linear MCP (2.90, SaaS subscription, network dependent) | Active |
| 4 | 2026-02-06 | 3-Run | Oh-My-ClaudeCode for autonomous execution | 5 modes cover every scenario (Autopilot = Ralph loop, Ultrapilot = parallel, Ecomode = budget). 32 agents. Intelligent Haiku/Sonnet/Opus routing. Built-in cost monitoring. Zero config marketplace install. Score: 4.20. | Bare Ralph Plugin (4.35 score but just a loop, no modes/routing/monitoring), ralph-claude-code (3.70, good circuit breakers but fewer features), ralph-orchestrator (2.95, Rust, more complex) | Active |
| 5 | 2026-02-06 | 3-Run | Native Agent Teams for within-session parallelism | Built-in to Claude Code. Reliable (Anthropic-maintained). True parallelism with 1M token contexts per teammate. DAG scheduling. Worktree isolation. Score: 4.00. | claude-flow (1.75, fabricated benchmarks, broken), Claude Swarm (2.70, less mature) | Active |
| 6 | 2026-02-06 | 4-Flag | OpenClaw isolated to Docker + Telegram only | Proactive heartbeat pattern is unique. 167K stars. BUT: not trusted as orchestrator. Docker isolation prevents $75-500 API bill scenarios and credential exposure. Score: 3.55. | Custom notification scripts (simpler but no intelligence), happy-coder (3.30, less proven) | Active |
| 7 | 2026-02-06 | 5-Repeat | claude-auto-resume for usage limit handling | Purpose-built. Parses reset timestamps. Countdown timer. Composable with tmux, Claude Squad, runCLAUDErun. Score: 4.65. | Manual restart (doesn't scale), fixed-delay retry scripts (less smart) | Active |
| 8 | 2026-02-06 | 5-Repeat | Claude Squad for process management | TUI. Git worktree isolation. Auto-accept mode. Works headless on Mac Mini via SSH. Score: 4.75. | Crystal (2.75, desktop app, no headless), ccmanager (2.70, smaller community) | Active |
| 9 | 2026-02-06 | 5-Repeat | runCLAUDErun for scheduling | Native macOS. launchd-backed (reliable after sleep/wake). GUI scheduling. Run history. Score: 4.05. | launchd manual (tedious), cron (deprecated on macOS), claude-code-scheduler (2.60, CLI) | Active |
| 10 | 2026-02-06 | Foundation | Fix .claude/ propagation via bootstrap | .claude/ directories do NOT cascade. Solution: global config in ~/.claude/, per-project bootstrap from shared/templates/claude-code/. | Monorepo restructure (too invasive), symlinks (fragile) | Active |
| 11 | 2026-02-07 | 3-Run | Superpowers as methodology layer on OMC | OMC handles the execution engine (modes, routing, monitoring). Superpowers provides the methodology (brainstorm, plan, TDD, review). Different layers, complementary. 46K stars, obra is a well-known OSS contributor. Score: 3.85. Test for conflicts with OMC agent auto-triggering before committing. | Relying on OMC's 32 agents alone (no structured methodology), TDD Guard only (just one aspect of methodology) | Active |
| 12 | 2026-02-07 | 2→3 Bridge | Steal Choo Choo Ralph concepts, skip the tool | Choo Choo Ralph (3.40) solves two gaps: "pour" (OpenSpec tasks -> Beads) and "harvest" (capture learnings after sessions). But 23 stars, single maintainer, too fragile to depend on. Build DIY `/pour` and `/harvest` slash commands instead. Revisit the tool when it matures. | Adopting Choo Choo Ralph directly (too risky at 23 stars), manual pour/harvest (no structure) | Active |
| 13 | 2026-02-07 | 3-Run | Safety stack: worktree isolation + command guard + Docker | Three layers before enabling overnight autonomous execution: (1) git worktree isolation via Claude Squad, (2) Destructive Command Guard for rm -rf / git push --force, (3) Docker isolation for OpenClaw. TDD Guard as quality gate (may be covered by Superpowers). | Single layer only (insufficient for overnight), full Docker sandboxing for everything (overkill for dev) | Active |
| 14 | 2026-02-07 | All | Restructure Holy Grail: 5 dev phases + infrastructure platform | Old: Spec→Task→Run→Flag→Repeat. New: Spec It→Task It→Build It→Verify It→Learn It. "Flag It" and "Repeat It" were infrastructure plumbing, not development phases. New model separates development work (5 phases) from the platform that keeps it running (scheduling, process mgmt, resilience, notifications, safety). Added two missing SDLC steps: Verify It (full CI before merge) and Learn It (feedback loop via /harvest). | Keep old 5 phases (mixing plumbing with dev work), expand to 7 phases (too many) | Active |
| 15 | 2026-02-07 | 3-Build | OMC first, Superpowers deferred | Both tools auto-trigger agent behaviors and inject instructions. OMC has tester + code-reviewer agents; Superpowers has TDD + review skills. Running both risks conflicting instructions. Install OMC alone, test whether its 32 agents provide enough discipline (planning, testing, review). Only add Superpowers if OMC's agents feel shallow, and only after confirming no conflicts. | Install both simultaneously (conflict risk), Superpowers only (no execution engine), OMC only permanently (may lack methodology depth) | Active |
| 16 | 2026-02-07 | 4-Verify | Verify It as explicit phase with HITL visual review | Per-task TDD (Build It) catches "does this task work?" but not "does the whole project still work?" Full CI validation (lint + types + test + build) before merge catches integration-level breakage. V1: automated tests + Adam eyeballs deployed version. V2: Chrome screenshots + visual comparison. | Testing buried inside Build It (easy to skip), visual testing tools now (premature — no Figma designs) | Active |
| 17 | 2026-02-07 | 5-Learn | Learn It closes the feedback loop | Without /harvest, the system is open-loop — session 10 is no smarter than session 1. With it, patterns compound. Each session deposits learnings into knowledge/updates/. Agents read accumulated context on future runs. This is the compound interest of the system. | No learning phase (open-loop), claude-mem for memory (heavy deps, unproven), manual session notes (no structure) | Active |
| 18 | 2026-02-07 | All | HITL is fine for V1, automate gradually | Not everything needs to be autonomous on day one. V1 has manual steps: Adam reviews specs, sets priorities, eyeballs deployed UI, unblocks via Telegram. Each HITL step is a candidate for future automation (auto-prioritization, Chrome screenshots, spec generation from backlog). Earn trust first, then automate. | Full automation from day one (too risky, too complex), permanent manual steps (defeats the purpose) | Active |
| 19 | 2026-02-07 | 4-Verify | Pencil.dev assessed, not adopted | Closed-source (no GitHub repo), VC-backed (a16z Speedrun), no community, very early stage. It's a design/build tool (infinite canvas → code), not a verification tool. Doesn't solve our visual verification gap. Revisit in 6-12 months if it builds a community. | Adopt Pencil now (too risky, wrong tool for verification), build custom canvas (overkill) | Active |

## Rejection Decisions

| # | Date | Decision | Rationale | Status |
|---|------|----------|-----------|--------|
| R1 | 2026-02-06 | Reject claude-flow | Fabricated 84.8% SWE-Bench benchmark (unverifiable). Broken memory layer. Broken hooks. 92% architectural overlap with native Agent Teams which actually works. Score: 1.75. | Active |
| R2 | 2026-02-06 | Reject Kimi | Competing model ecosystem. Not relevant to Claude Code workflow. No integration path. | Active |
| R3 | 2026-02-06 | Retire Living Spec skill | No author, no repository, no update path. Dead skill. | Active |

## Corrected Records

| # | Date | Correction | Details |
|---|------|-----------|---------|
| C1 | 2026-02-07 | OpenSpec not active on frequency-first | Previous docs claimed "6 baseline specs, 8 changes." In reality, OpenSpec CLI is installed globally but `openspec init` was never run on any project. No specs/, changes/, or .openspec/ directories exist. |
| C2 | 2026-02-07 | BMAD downgraded from CHOSEN to Planned | Scored 2.95 (Evaluated in catalogue). Still the right choice for greenfield, but no greenfield project needs it yet. Changed from CHOSEN to Planned. |
| C3 | 2026-02-07 | Spec Kit reclassified from Rejected to Evaluated | Scored 3.40. Previously listed as "Rejected" in stack docs. It was rejected as *primary* SDD tool (OpenSpec won), but it's a solid tool — just not the right fit for our brownfield work. Catalogue correctly lists it as Evaluated. |
| C4 | 2026-02-07 | Phase status corrected | Phase 1 (Spec) and Phase 2 (Task) were marked as "Complete" in CLAUDE.md. In reality, only the tool *decisions* are made — nothing is installed or initialized beyond OpenSpec CLI. Corrected to reflect actual deployment state. |
| C5 | 2026-02-07 | Holy Grail phases restructured | Old 5 phases (Spec→Task→Run→Flag→Repeat) mixed development work with infrastructure plumbing. New 5 phases (Spec→Task→Build→Verify→Learn) are all development work. Infrastructure (scheduling, process mgmt, resilience, notifications, safety) is the platform, not a phase. Added missing SDLC steps: Verify It and Learn It. |
| C6 | 2026-02-07 | Superpowers downgraded from Planned to Deferred | Was "Planned" as methodology layer on OMC. Downgraded to "Deferred" because OMC and Superpowers have overlapping agent/skill auto-triggering that risks conflicts. Install OMC first, evaluate, only add Superpowers if needed. |

## Decision Template

When making future decisions, answer these questions:

1. **What problem does this solve in the Holy Grail?** (Phase 1-5 or Supporting)
2. **What alternatives exist?** (Check catalogue/ and run a spot-check sweep if needed)
3. **Hard requirements** (from research/methodology.md):
   - Works with Claude Code?
   - Git-native or git-compatible?
   - Markdown-based?
   - Active maintenance (commits in last 3 months)?
4. **Soft scoring** (from research/methodology.md):
   - Holy Grail alignment (30%)
   - Simplicity (20%)
   - Community trust (15%)
   - Ecosystem fit (15%)
   - Cost efficiency (10%)
   - Maturity (10%)
5. **Red flags?**
   - Fabricated benchmarks?
   - Competing model ecosystem?
   - Closed source?
   - Always-on server required?
   - Plaintext credentials with no alternative?
6. **Document in this file** with date, phase, rationale, and alternatives considered.
| 20 | 2026-02-07 | 3-Build | Oh-My-ClaudeCode confirmed as Phase 3 execution engine | OMC scores 4.20 and covers all execution modes (autopilot, ultrawork, ralph, ultrapilot, ecomode, swarm, pipeline). 32 specialized agents + intelligent Haiku/Sonnet/Opus routing. Built-in cost monitoring. Zero-config marketplace install. Confirmed as primary execution engine for autonomous development. Installation via Claude Code plugin marketplace. See omc-usage-guide.md. | Bare Ralph Plugin (4.35 but single feature), ralph-claude-code (3.70, good circuit breakers but fewer features), custom agent orchestration (overkill for phase 1) | **Superseded by #21** |
| 22 | 2026-02-10 | Platform | tmux over Claude Squad for parallel session management | Our projects are already separate repos — Claude Squad's main differentiator (git worktree isolation) doesn't apply. tmux is zero dependencies, decades stable, fully scriptable, composable with claude-auto-resume/launchd/SSH. Claude Squad is built on tmux anyway. Using Dreams of Code config (Ctrl+Space prefix, mouse, catppuccin theme, vim navigation). See shared/skills/tmux-parallel-sessions.md. | Claude Squad (4.75, worktree isolation unnecessary for multi-repo), Native Agent Teams (experimental, single-directory only), manual VSCode windows (no overview, heavy context switching) | Active |
| 21 | 2026-02-09 | 3-Build | OMC downgraded to thin execution wrapper; Native Agent Teams as long-term target | Independent verification (knowledge/updates/2026-02-09-omc-independent-verification.md) revealed OMC is a 30-day-old, one-person project with ~50-100 real users, zero community presence (no Reddit/HN/YouTube), and a revised score of 3.48 (down from 4.20). The tool works — 36h challenge proved ultrapilot parallelism is real — but investing in learning "the OMC way" (32 agents, 7 modes, skill system) is high-risk when Native Agent Teams (Anthropic-built, zero abandonment risk) will absorb these patterns. **Strategy:** Use OMC as disposable execution wrappers only (autopilot, ralph). Don't build mental models around OMC abstractions. Monitor Agent Teams for model routing capability — when it ships, migrate. Keep Holy Grail phases tool-agnostic so Phase 3 engine is swappable. | Abandon OMC now (premature — Agent Teams lacks persistence/routing/monitoring), go all-in on OMC (high single-maintainer risk), build custom orchestration (overkill) | Active |

