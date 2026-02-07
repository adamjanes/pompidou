# Decision Log

> Documented decisions about the autonomous dev system tech stack.
> Each decision is tied to a Holy Grail phase and includes the rationale and alternatives considered.

## Active Decisions

| # | Date | Phase | Decision | Rationale | Alternatives Considered | Status |
|---|------|-------|----------|-----------|------------------------|--------|
| 1 | 2026-02-06 | 1-Spec | OpenSpec for brownfield specs | Lightweight (~250 lines core), brownfield-first delta specs, fast (/opsx:ff), context-efficient (30% window on 54-file changes). Better than Spec Kit for iterating on existing projects. | Spec Kit (67.8K stars, heavy, greenfield-optimized, ~18.6K tokens to load), cc-sdd (new, unproven) | Active |
| 2 | 2026-02-06 | 1-Spec | BMAD Method for greenfield specs | 34.5K stars, 21 agent personas, 50+ workflows, scale-adaptive. Most comprehensive planning framework for 0-to-1 projects. | Spec Kit (less flexible), prd-generator (one-shot only, no lifecycle) | Active |
| 3 | 2026-02-06 | 2-Task | Beads for cross-project task tracking | Git-native JSONL, hash-based IDs (no merge conflicts), dependency graphs, agent-optimized JSON output. Steve Yegge (Google/Amazon) author. Gas Town validates this as the foundation. | Claude Task Master (25K stars but IDE-first, single JSON file, not git-native), CCPM (GitHub Issues, good for teams but adds API dependency), Linear MCP (SaaS, overkill) | Active |
| 4 | 2026-02-06 | 3-Run | Oh-My-ClaudeCode for autonomous execution | 5 modes cover every scenario (Autopilot, Ultrapilot, Swarm, Pipeline, Ecomode). 32 agents. Intelligent Haiku/Sonnet/Opus routing. Built-in cost monitoring. Zero config. | Bare Ralph loop (simpler but fewer features), ralph-claude-code (circuit breakers but less modes), ralph-orchestrator (Rust, 7 backends, more complex) | Active |
| 5 | 2026-02-06 | 3-Run | Native Agent Teams for within-session multi-agent | Built-in to Claude Code. Reliable (Anthropic-maintained). True parallelism with 1M token contexts per teammate. DAG scheduling. Peer-to-peer messaging. Worktree isolation. | claude-flow (92% overlap but fabricated benchmarks, broken), Claude Swarm (less mature) | Active |
| 6 | 2026-02-06 | 4-Flag | OpenClaw isolated to Docker + Telegram only | Proactive heartbeat pattern is unique. 167K stars, massive community. BUT: not trusted as orchestrator (misses things, struggles with context switching, security concerns). Docker isolation prevents $75-500 API bill scenarios, ClawHub risks, and plaintext credential exposure. | Custom notification scripts (simpler but no intelligence), Slack bot (no heartbeat pattern), happy-coder (less proven) | Active |
| 7 | 2026-02-06 | 5-Repeat | claude-auto-resume for usage limit handling | Purpose-built. Parses reset timestamps. Countdown timer. Transparent wrapping. Lightweight shell script. Composable with tmux, Claude Squad, runCLAUDErun. | Manual restart (doesn't scale), fixed-delay retry scripts (less smart), OMC built-in (less composable) | Active |
| 8 | 2026-02-06 | 5-Repeat | Claude Squad for process management | TUI. Git worktree isolation. Auto-accept mode. Homebrew install. Works headless on Mac Mini via SSH. ~5K stars, proven community. | Crystal (desktop app, no headless), ccmanager (815 stars, multi-agent but smaller community), tmux-only (more manual) | Active |
| 9 | 2026-02-06 | 5-Repeat | runCLAUDErun for scheduling | Native macOS. launchd-backed (reliable after sleep/wake). GUI scheduling. Run history. macOS notifications. | launchd manual (more flexible but tedious), cron (deprecated on macOS), claude-code-scheduler (CLI, cross-platform but less UX) | Active |
| 10 | 2026-02-06 | Foundation | Fix .claude/ propagation via bootstrap | .claude/ directories do NOT cascade (hooks, commands, settings are CWD-only). Solution: global config in ~/.claude/, per-project bootstrap from shared/templates/claude-code/. | Monorepo restructure (too invasive), symlinks (fragile), single .claude/ at root (doesn't work) | Active |

## Rejection Decisions

| # | Date | Decision | Rationale | Status |
|---|------|----------|-----------|--------|
| R1 | 2026-02-06 | Reject claude-flow | Fabricated 84.8% SWE-Bench benchmark (unverifiable). Broken memory layer. Broken hooks. 92% architectural overlap with native Agent Teams which actually works. 13.7K stars are misleading. | Active |
| R2 | 2026-02-06 | Reject Spec Kit as primary SDD tool | 67.8K stars but: ~18.6K tokens just loading commands (context window hog), greenfield-optimized (our work is brownfield), heavy framework for what should be a lightweight spec layer. Good tool, wrong fit. | Active |
| R3 | 2026-02-06 | Reject Kimi | Competing model ecosystem. Not relevant to Claude Code workflow. No integration path. | Active |
| R4 | 2026-02-06 | Retire Living Spec skill | No author, no repository, no update path. Dead skill. | Active |
| R5 | 2026-02-07 | Reject Conductor (closed source) | Closed source (no audit, no contribute, no customize). macOS only. No CLI/headless mode. Depends on Melty Labs' business viability. Claude Squad is open source and works headless. | Active |

## Pending Evaluations

| # | Date | Decision | Rationale | Status |
|---|------|----------|-----------|--------|
| P1 | 2026-02-07 | Context7 high-priority for evaluation | 44.8K stars, 71.8K installs. Most-installed Claude Code plugin. Eliminates doc hallucinations for frameworks (Next.js, Supabase, Tailwind, Drizzle). Zero config. Every project benefits. | Pending |
| P2 | 2026-02-07 | claude-mem high-priority for evaluation | 24.3K stars, #1 trending GitHub. Solves cross-session memory --- the #1 community pain point and critical for Ralph loops. 5 lifecycle hooks, Endless Mode beta. Wait 2-3 weeks for stability reports, then test on frequency-first. | Pending |
| P3 | 2026-02-07 | Ralph Playbook required reading | 735 stars. Best-written Ralph documentation. 3-phase model (requirements, planning, implementation). Must read before implementing Phase 3 loops. Not a tool, just a reference. | Pending |
| P4 | 2026-02-07 | Memory layer bake-off: claude-mem vs Cipher vs claude-brain | Three competing approaches: claude-mem (deep Claude Code hooks, heavy deps), Cipher (cross-tool via MCP, lighter), claude-brain/memvid (portable video file, simplest). Test all three, pick one. | Pending |
| P5 | 2026-02-07 | Safety stack for autonomous execution | Three layers in order: (1) git worktree isolation (built into Claude Squad), (2) Destructive Command Guard (976 stars, Rust), (3) Docker isolation (SafeClaw). Plus Scope Guard for intent-based scope enforcement. Define minimum safety before running overnight. | Pending |

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
