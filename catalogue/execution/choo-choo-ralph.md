# Choo Choo Ralph

| Field | Value |
|-------|-------|
| GitHub | [mj-meyer/choo-choo-ralph](https://github.com/mj-meyer/choo-choo-ralph) |
| Stars | 23 |
| Last Commit | 2026-01 |
| Install | Claude Code plugin (per-project) |
| Status | Watching |
| Category | execution |
| Holy Grail Phase | 3-Run |

## What It Does

Choo Choo Ralph is a Claude Code plugin that adds structured, customizable workflow formulas to the Ralph loop, built on top of Beads (Steve Yegge's git-native task tracker). It bridges the gap between having a spec and having executable tasks by providing a 5-phase flow: Plan, Spec, Pour (create beads), Ralph Loop (execute), and Harvest (capture learnings). The key insight is that the Ralph loop alone lacks structure — Choo Choo Ralph adds a repeatable workflow formula that turns specs into dependency-aware beads, executes them with verification gates, and captures learnings for future sessions.

## How It Works

**5-phase workflow:**

| Phase | Command | Description |
|-------|---------|-------------|
| 1. Plan | Manual / external | Write or generate your plan (can come from OpenSpec, BMAD, or manual) |
| 2. Spec | `/choo-choo-ralph:spec` | Generate a structured specification from the plan |
| 3. Pour | `/choo-choo-ralph:pour` | Decompose the spec into beads with dependencies (Beads molecules) |
| 4. Loop | `/choo-choo-ralph:loop` | Execute beads via Ralph loop with verification at each step |
| 5. Harvest | `/choo-choo-ralph:harvest` | Capture learnings, propose documentation artifacts, update skills |

**Beads integration (hard requirement):**
Choo Choo Ralph depends on Beads. The "pour" phase creates Beads molecules — groups of beads with real dependency chains. Each bead has an ID, and every commit links back to the bead it addresses. This creates full traceability from spec to code.

**Verification cycle within the loop:**
Each bead goes through: Bearings (orient) -> Implement -> Verify -> Commit. The verification step ensures tests pass and the implementation matches the spec before moving to the next bead.

**Formulas:**
Workflows are defined as "formulas" — customizable templates that describe the phases and their behavior. You can modify the default formula or create project-specific ones. This makes the workflow repeatable and adaptable.

**Harvest phase:**
After a session, `/choo-choo-ralph:harvest` does something unique: it extracts learnings from the work (what patterns worked, what failed, what was discovered) and converts them into skills and documentation artifacts. This creates a compounding knowledge effect — each session makes future sessions smarter.

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 5 | 1.50 |
| Simplicity | 20% | 3 | 0.60 |
| Community trust | 15% | 1 | 0.15 |
| Ecosystem fit | 15% | 5 | 0.75 |
| Cost efficiency | 10% | 3 | 0.30 |
| Maturity | 10% | 1 | 0.10 |
| **Composite** | | | **3.40** |

### Strengths
- Solves the full spec-to-tasks-to-execute-to-learn cycle in one tool
- Built on Beads (our chosen task tracker) — not a competing format
- Harvest phase creates compounding knowledge — genuinely novel
- Verification gates (Bearings -> Implement -> Verify -> Commit) prevent sloppy execution
- Customizable formulas allow per-project workflow tuning
- Git-native throughout — beads, commits, and learnings all live in the repo
- Dependency-aware execution means beads are processed in the right order
- Bounded context per bead prevents the agent from losing focus

### Weaknesses
- Very early stage (23 stars) — small community, limited battle-testing
- Per-project installation means setup for every repo
- Depends on Beads being installed and initialized first
- Formula system adds a learning curve on top of Beads + Ralph
- No parallel execution — beads are processed sequentially
- Limited documentation compared to more mature tools
- Single maintainer (mj-meyer) — bus factor of 1
- Unclear how it interacts with OMC modes (Ultrapilot, Swarm)

### Community Sentiment

Very early-stage community. Listed in the awesome-ralph curated list (snwfdhmp/awesome-ralph) as a Beads-powered workflow tool. Referenced on ralph-tui.com as a Beads tracker integration. Steve Yegge's Beads ecosystem acknowledges it as a downstream consumer. The HN thread "I replaced Beads with a faster, simpler Markdown-based task tracker" indirectly references choo-choo-ralph's complexity as motivation for simpler alternatives. Most discussion happens in Beads' own GitHub Discussions rather than choo-choo-ralph's repo. The "harvest" concept gets the most interest — the idea of automatically extracting learnings from coding sessions resonates with developers building knowledge bases.

### Compared To

- **Oh My ClaudeCode** (`catalogue/execution/oh-my-claudecode.md`): OMC provides execution modes; Choo Choo Ralph provides workflow structure. They operate at different layers and could potentially complement each other (OMC Autopilot executing choo-choo-ralph formulas).
- **Ralph Plugin (Official)** (`catalogue/execution/ralph-plugin.md`): The official plugin is the bare loop; Choo Choo Ralph wraps it with spec → tasks → verification → learnings.
- **CCPM** (`catalogue/tasks/ccpm.md`): Both provide structured workflows (PRD → tasks → execution), but CCPM uses GitHub Issues while Choo Choo Ralph uses Beads. Different storage backends, similar workflow philosophy.

## Our Usage

**Watching.** Choo Choo Ralph solves exactly the pipeline we want: spec (Phase 1) -> tasks/beads (Phase 2) -> execute (Phase 3) -> learn. It aligns with our Holy Grail phases almost perfectly. The harvest concept is unique and valuable for building compounding project knowledge.

However, at 23 stars and single-maintainer status, it's too early to commit. The formula system adds complexity on top of already-new tools (Beads + OMC). Plan to monitor development and test on a small project (frequency-first) once our Beads setup is stable.

**If adopted, the integration would be:**
1. OpenSpec generates the spec (Phase 1)
2. Choo Choo Ralph pours spec into beads (Phase 2)
3. OMC Autopilot executes the Ralph loop (Phase 3)
4. Harvest captures learnings into project knowledge/

## Sources

- [GitHub README](https://github.com/mj-meyer/choo-choo-ralph)
- [awesome-ralph listing](https://github.com/snwfdhmp/awesome-ralph)
- [Ralph TUI: Beads Tracker](https://ralph-tui.com/docs/plugins/trackers/beads)
- [Beads Best Practices (references downstream tools)](https://steve-yegge.medium.com/beads-best-practices-2db636b9760c)

---
*Last reviewed: 2026-02-07*
