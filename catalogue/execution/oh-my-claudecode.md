# Oh My ClaudeCode

| Field | Value |
|-------|-------|
| GitHub | [Yeachan-Heo/oh-my-claudecode](https://github.com/Yeachan-Heo/oh-my-claudecode) |
| Stars | 5,423 |
| Age | 30 days (created 2026-01-09) |
| Last Commit | 2026-02-08 (active) |
| Contributors | 19 (97% from one person) |
| Install | Claude Code marketplace plugin |
| Status | ★ CHOSEN (thin wrapper — see Decision #21) |
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

### Scores (revised 2026-02-09 after independent verification)

| Criterion | Weight | Score | Weighted | Notes |
|-----------|--------|-------|----------|-------|
| Holy Grail alignment | 30% | 5 | 1.50 | Still best-in-class for Phase 3 |
| Simplicity | 20% | 3 | 0.60 | Agent symlink needed, permission issues, mode confusion |
| Community trust | 15% | 1.5 | 0.225 | One person, zero Reddit/HN/YouTube, no tutorials |
| Ecosystem fit | 15% | 4 | 0.60 | Works but fragile (one maintainer = bus factor 1) |
| Cost efficiency | 10% | 4 | 0.40 | Ecomode is genuinely useful |
| Maturity | 10% | 1.5 | 0.15 | 30 days old, 20 releases, version churn |
| **Composite** | | | **3.48** | Down from 4.20 — see Independent Verification below |

Previous score: **4.20** (2026-02-07, before verification)

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
- **Bus factor of 1** — 97% of contributions from one developer (Yeachan-Heo). Only 2 external PRs merged out of 307 total.
- **No community presence** — Zero Reddit threads, zero HN discussions, zero YouTube tutorials, zero independent blog posts. Unusual for 5.4K stars.
- **No learning resources** — Only author-created docs exist. No community tutorials, videos, or guides.
- **30 days old** with 20 releases — hyperactive development suggests instability and breaking changes.
- **Stars-to-engagement mismatch** — 5,423 stars but only 27 watchers and ~50-60 unique issue reporters. Likely a single viral launch event.
- 32 agents and 7 modes is a lot of surface area — unclear how much is actually used in practice
- Token usage in Ultrapilot/Swarm modes can be substantial (3-5x parallel = 3-5x cost)
- No built-in task tracking — needs Beads or similar for persistent state
- Permission hooks don't cover all tools (Read, Edit, Write, Glob not auto-approved)
- Agent symlink required but not documented in install guide

### Community Sentiment (revised 2026-02-09)

**Verified reality:** Essentially no independent community discussion exists. Zero Reddit threads, zero Hacker News posts, zero YouTube tutorials, zero independent blog posts. One inaccessible Medium article (Joe Njenga, Jan 2026) is the only potential independent content found. The 5,423 stars likely came from a single viral event (possibly Korean dev community), not sustained organic adoption. The ~50-60 unique GitHub issue reporters represent the real user base. Issues are genuine (real problems from real users) and the author is responsive (98.9% closure rate), but this is a **niche tool with a small user base**, not a widely-adopted community project.

**Previous assessment (2026-02-07, now retracted):** ~~Growing positive reception... five-mode approach gets praise... HUD and cost monitoring consistently highlighted.~~ This was inferred from README claims, not verified against independent sources.

### Compared To

- **Native Agent Teams** (built-in): Anthropic's own multi-agent feature. Experimental (Feb 5, 2026). Less flexible today but zero abandonment risk and will improve. Long-term replacement for OMC.
- **Superpowers** (47.6K stars): Methodology framework, not execution engine. Complementary, not competitive. Has massive community and independent tutorials.
- **Ralph TUI** (1.7K stars): Loop orchestrator with **working** Beads integration. Doesn't do parallel execution but handles Phase 2→3 bridge better than OMC.
- **Ralph Plugin** (`catalogue/execution/ralph-plugin.md`): Simpler loop. OMC is more feature-rich; Ralph is more predictable.
- **ralph-claude-code** (`catalogue/execution/ralph-claude-code.md`): Circuit breakers + exit detection. OMC goes further with full multi-agent orchestration.

### Independent Verification (2026-02-09)

Full research report: `knowledge/updates/2026-02-09-omc-independent-verification.md`

**Methodology:** GitHub API analysis (contributors, issues, PRs, stargazers, forks, releases), web search across Reddit, HN, YouTube, Twitter, blogs, Discord. Three parallel research agents.

**Key findings:**
1. **One-person project** — 97% of 702 contributions from Yeachan-Heo. Only 2 external PRs merged.
2. **Stars are real but misleading** — Sampled stargazers are real developers, but 5,423 stars with 27 watchers suggests a single viral event, not sustained adoption.
3. **Zero external presence** — No Reddit, HN, YouTube, Twitter, or independent blog content found.
4. **Real but small user base** — ~50-60 unique issue reporters. Issues are genuine.
5. **Project is 30 days old** — Created Jan 9, 2026. 20 releases in 30 days.
6. **Inspired by oh-my-opencode** (29.5K stars) — The original has a visible community and Discord. OMC borrowed the concept but not the community.

**Verdict:** Real tool, works as claimed, but drastically overrated by vanity metrics. Keep using (no better alternative today) but design system to be OMC-independent.

## Our Usage

**Thin execution wrapper only (Decision #21, 2026-02-09).** OMC is used as a disposable Phase 3 layer, not load-bearing architecture. We use two features:
- **Autopilot / Ralph** for persistent autonomous execution
- **Ultrapilot** for parallel execution on large features

We do NOT invest in learning OMC's full abstraction set (32 agents, 7 modes, skill system, HUD, cost monitoring). When Native Agent Teams gains model routing, we migrate off OMC.

**Migration trigger:** Native Agent Teams ships cost-aware model routing (Haiku/Sonnet/Opus selection per task).

## Sources

- [GitHub README](https://github.com/Yeachan-Heo/oh-my-claudecode)
- [Reference Docs](https://github.com/Yeachan-Heo/oh-my-claudecode/blob/main/docs/REFERENCE.md)
- [Migration Guide](https://github.com/Yeachan-Heo/oh-my-claudecode/blob/main/docs/MIGRATION.md)
- [Changelog](https://github.com/Yeachan-Heo/oh-my-claudecode/blob/main/CHANGELOG.md)
- [Releases](https://github.com/Yeachan-Heo/oh-my-claudecode/releases)

---
*Last reviewed: 2026-02-09 (independent verification)*
*Previous review: 2026-02-07 (initial evaluation)*
