# Roadmap

> What to evaluate, adopt, and build next.
> Organized by urgency. Updated as decisions are made.

## Immediate (Next Session)

| Priority | Tool | Action | Why | Catalogue |
|----------|------|--------|-----|-----------|
| HIGH | [Context7](https://github.com/upstash/context7) | Install plugin and test on frequency-first | 44.8K stars, 71.8K installs. Zero-config docs accuracy boost for Next.js, Supabase, Tailwind, Drizzle. Every project benefits. Lowest effort, highest value. | `catalogue/context/context7.md` |
| HIGH | [claude-mem](https://github.com/thedotmack/claude-mem) | Monitor stability for 2-3 weeks, then test on frequency-first | 24.3K stars. Solves cross-session memory for Ralph loops. Heavy deps (SQLite + Chroma + Express). Too new to trust blindly --- wait for bug fixes. | `catalogue/memory/claude-mem.md` |
| HIGH | [Ralph Playbook](https://github.com/ClaytonFarr/ralph-playbook) | Read thoroughly before implementing any Ralph loops | Required reading. 3-phase model (requirements, planning, implementation). Not a tool --- a reference. Prevents "just loop and hope" anti-pattern. | `catalogue/execution/ralph-playbook.md` |
| HIGH | Beads | `brew install steveyegge/beads/bd` then `bd init` on frequency-first, linkedin, firstcomment | Task tracking is the missing link between specs and execution. Cannot run Phase 3 without Phase 2. | `catalogue/tasks/beads.md` |

## Short-Term (This Week)

| Priority | Tool | Action | Why | Catalogue |
|----------|------|--------|-----|-----------|
| HIGH | Oh-My-ClaudeCode | Install from marketplace. Test Autopilot mode on frequency-first. | Execution engine for Ralph loops. Must be working before scheduling anything. | `catalogue/execution/oh-my-claudecode.md` |
| HIGH | claude-auto-resume | Install. Test limit detection with a long-running session. | Foundational wrapper. Every autonomous session needs this. | `catalogue/scheduling/claude-auto-resume.md` |
| MEDIUM | [Claude HUD](https://github.com/jarrodwatts/claude-hud) | Install plugin. Evaluate statusline during Ralph loop test. | Real-time context/agent monitoring. 3,079 stars, 14 contributors, 0 issues. Low risk. | `catalogue/notification/claude-hud.md` |
| MEDIUM | [QMD](https://github.com/tobi/qmd) | Install. Point at knowledge/ folders across all projects. Measure token reduction. | 95% token reduction for markdown search. MCP server mode. Perfect for second-brain knowledge bases. By Tobi Lutke (Shopify CEO). | `catalogue/context/qmd.md` |
| MEDIUM | [SafeClaw](https://github.com/ykdojo/safeclaw) | Docker setup test on Mac Mini. | Safe autonomous execution via containers. Enables --dangerously-skip-permissions without actual danger. | `catalogue/process/safeclaw.md` |

## Medium-Term (This Month)

| Priority | Tool | Action | Why | Catalogue |
|----------|------|--------|-----|-----------|
| HIGH | Claude Squad | Install on Mac Mini. Create sessions for active projects. Test with claude-auto-resume. | Process management layer. Needed before scheduling nightly loops. | `catalogue/process/claude-squad.md` |
| HIGH | runCLAUDErun | Install on Mac Mini. Configure nightly schedule for 3-4 projects. | Scheduling layer. The "Repeat" in the Holy Grail. | `catalogue/scheduling/runclaunderun.md` |
| HIGH | OpenClaw Docker setup | Clean reinstall following CLEAN_INSTALL_PREP.md. Containerize with read-only blocker file + Telegram only. | Blocker notification. Currently broken. Must work before end-to-end pipeline is real. | `catalogue/notification/openclaw.md` |
| MEDIUM | [Vibe Kanban](https://github.com/BloopAI/vibe-kanban) | Hands-on evaluation on one project | 20.7K stars. Visual orchestration layer our terminal-only stack lacks. Multi-agent support. Worth testing to see if visual helps. | `catalogue/orchestration/vibe-kanban.md` |
| MEDIUM | [ccflare / better-ccflare](https://github.com/tombii/better-ccflare) | Install better-ccflare for cost monitoring | Track Ralph loop costs before investing in full claude-code-otel. Web dashboard, multi-provider. | `catalogue/monitoring/ccflare.md` |
| LOW | [Adversarial Spec](https://github.com/zscole/adversarial-spec) | Test on one high-stakes spec (client project) | Multi-LLM debate for spec quality. 474 stars. Niche but interesting for critical specs. | `catalogue/spec/adversarial-spec.md` |
| LOW | [cc-sdd](https://github.com/gotalab/cc-sdd) | Compare validation gates against OpenSpec | Kiro-compatible specs. Cross-tool portability. The validation gates are the feature OpenSpec lacks. | `catalogue/spec/cc-sdd.md` |

## Watching (Check Next Sweep)

These tools are interesting but not yet actionable. Re-evaluate during the next monthly sweep or when a specific trigger fires.

| Tool | Stars | Trigger to Re-Evaluate | Catalogue |
|------|-------|----------------------|-----------|
| [claude-code-otel](https://github.com/ColeMurray/claude-code-otel) | ~500 | Mac Mini running 4+ nightly loops and cost tracking is a pain point | `catalogue/monitoring/claude-code-otel.md` |
| [Gas Town](https://github.com/steveyegge/gastown) | 8,500 | Budget to justify 20+ agents or simpler stack hits its ceiling | `catalogue/orchestration/gas-town.md` |
| [Scope Guard](https://github.com/andreahlert/scope-guard) | N/A | First Ralph loops running and scope creep is observed | `catalogue/execution/scope-guard.md` |
| [Destructive Command Guard](https://github.com/kenryu42/claude-code-safety-net) | 976 | Setting up --dangerously-skip-permissions on Mac Mini | `catalogue/execution/destructive-command-guard.md` |
| [ccmanager](https://github.com/kbwo/ccmanager) | 815 | tmux friction on Mac Mini or we adopt Codex/Gemini CLI | `catalogue/process/ccmanager.md` |
| [Auto-Claude](https://github.com/AndyMik90/Auto-Claude) | 11,500 | When we need visual Kanban for agents or composable stack feels too fragmented | `catalogue/execution/auto-claude.md` |
| [ccusage](https://github.com/) | N/A | Quick CLI cost checks before ccflare is set up | `catalogue/scheduling/ccusage.md` |

## Upcoming Decisions

These are unresolved questions that need hands-on testing to answer.

### 1. Memory Layer
**Question:** claude-mem vs Cipher vs claude-brain --- which one?

| Tool | Approach | Strength | Weakness |
|------|----------|----------|----------|
| claude-mem (24.3K) | 5 lifecycle hooks, SQLite + Chroma, web viewer | Deepest Claude Code integration, automatic capture | Heavy deps, extremely new, Claude Code-only |
| Cipher (3.5K) | MCP-based, cross-tool | Works across Claude Code + Cursor + Codex + others | Less automatic, smaller community |
| claude-brain/memvid | Single portable video file | Simplest architecture, no database deps | No semantic search, less sophisticated retrieval |

**Plan:** Test claude-mem first (highest potential). If unstable or too heavy, try Cipher. Keep claude-brain as lightweight fallback.

### 2. Visual Dashboard
**Question:** Vibe Kanban vs Auto-Claude vs terminal-only --- does a visual layer add value?

**Hypothesis:** Terminal-only (Claude Squad + tmux) is sufficient for 1-5 parallel sessions. Visual may become necessary at 5+ sessions or when Adam wants to monitor from his phone/iPad. Test Vibe Kanban when we have 3+ loops running.

### 3. Cost Monitoring
**Question:** ccflare vs claude-code-otel vs ccusage --- match tool to infrastructure scale.

| Scale | Tool | Why |
|-------|------|-----|
| 1-2 sessions | ccusage (CLI) | Quick spot-checks, no dashboard needed |
| 3-5 sessions | better-ccflare (web) | Visual dashboard, session-level cost, low overhead |
| 5+ nightly loops | claude-code-otel (Prometheus+Grafana) | Full observability, alerting, log search, fleet-scale |

**Plan:** Start with ccusage, graduate to better-ccflare, only invest in otel when justified.

### 4. Safety Stack
**Question:** How much safety is enough for overnight autonomous execution?

**Layers (in order of priority):**
1. Git worktree isolation (built into Claude Squad) --- **free, always on**
2. Destructive Command Guard (Rust hook) --- **low overhead, high value**
3. Scope Guard (intent-based diff checking) --- **moderate overhead, catches scope creep**
4. Docker isolation (SafeClaw) --- **heavier but bulletproof**

**Plan:** Start with layers 1-2. Add 3-4 after first week of overnight runs based on observed issues.

## Re-Run Research

Use `research/SWEEP.md` to re-scan the ecosystem. Cadence and triggers:

| When | Action |
|------|--------|
| Monthly | Full sweep of awesome lists, GitHub trending, Reddit, HN |
| New Claude Code major release | Spot-check for new native features that obsolete tools |
| New tool trending (5K+ stars) | Deep eval using catalogue/_template.md |
| Community sentiment shift | Re-evaluate any CHOSEN tool losing trust |
| New category of tool emerges | Add new catalogue subfolder, eval top 3 tools |
| After each tool adoption | Update stack/current.md, stack/decisions.md |
