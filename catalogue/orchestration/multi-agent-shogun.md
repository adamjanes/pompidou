# multi-agent-shogun

| Field | Value |
|-------|-------|
| GitHub | [yohey-w/multi-agent-shogun](https://github.com/yohey-w/multi-agent-shogun) |
| Stars | 743 |
| Last Commit | 2026-02-07 |
| Install | `git clone https://github.com/yohey-w/multi-agent-shogun.git && cd multi-agent-shogun && ./shogun.sh install` |
| Status | Watching |
| Score | **3.25** |
| Category | orchestration |
| Holy Grail Phase | 3-Run |

## What It Does

Samurai-inspired multi-agent system for Claude Code that orchestrates 8 parallel AI workers via tmux with a feudal hierarchy: Shogun (you) → Karo (manager) → Ashigaru (8 workers). Zero coordination overhead — tasks written as plain YAML files, each agent runs in visible tmux pane, control returns immediately to user. Karo breaks tasks into subtasks, assigns to Ashigaru, aggregates results to dashboard.md. Every instruction, report, and decision is a plain YAML/markdown file you can read, diff, and version-control. Includes Memory MCP for preference persistence across sessions.

## How It Works

**Hierarchy:**
```
You (Shogun / Lord) → give orders
    ↓
Shogun script → receives command, delegates instantly
    ↓
Karo (Manager) → distributes tasks to workers
    ↓
Ashigaru (8 workers) → execute in parallel
```

**Workflow:**
1. Run `./shogun.sh "Build user auth system"` from project root
2. Shogun writes task to `queue/shogun_to_karo.yaml`, wakes Karo
3. Control returns to you immediately (no waiting)
4. Karo breaks task into subtasks, assigns each to Ashigaru (1-8)
5. Ashigaru work in visible tmux panes (tmux-multiagent session)
6. Results aggregated to `dashboard.md` (real-time updates)
7. Blockers surface in YAML files for review

**Key components:**
- **Shogun script** (`shogun.sh`): CLI entry point, writes tasks to queue
- **Karo** (Manager): Reads `queue/shogun_to_karo.yaml`, delegates to Ashigaru via `queue/karo_to_ashigaru_N.yaml`
- **Ashigaru** (Workers 1-8): Read assigned YAML tasks, execute, write results to `results/ashigaru_N_results.yaml`
- **Queue system**: Plain YAML files (`queue/`, `results/`) — no database, no coordination API
- **Dashboard** (`dashboard.md`): Markdown file showing aggregated results, skill candidates, blockers
- **Memory MCP**: Remembers your preferences (coding style, patterns, decisions) across sessions

**Why "zero coordination overhead":**
- No API coordination between agents
- No shared database or lock files
- No inter-agent messaging protocol
- Just YAML files written/read by agents
- Contrast with Agent Teams (peer messaging, shared task DAG) or claude-flow (complex orchestration)

**Installation:**
```bash
git clone https://github.com/yohey-w/multi-agent-shogun.git
cd multi-agent-shogun
./shogun.sh install
# Sets up tmux session, configures Karo + Ashigaru
```

**Usage:**
```bash
# From project root
./shogun.sh "Add dark mode to settings page"

# Open dashboard
cat dashboard.md

# View specific worker
tmux attach -t tmux-multiagent
# Navigate panes to see Ashigaru 1-8 working
```

**Tmux layout:**
9 panes: 1 Karo + 8 Ashigaru, all visible in split-screen grid.

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 3 | 0.90 |
| Simplicity | 20% | 3 | 0.60 |
| Community trust | 15% | 3 | 0.45 |
| Ecosystem fit | 15% | 3 | 0.45 |
| Cost efficiency | 10% | 2 | 0.20 |
| Maturity | 10% | 3 | 0.30 |
| **Composite** | | | **3.25** |

### Strengths
- Zero coordination overhead — no API calls between agents, no database, no lock files. Just plain YAML.
- Transparent execution — every agent runs in visible tmux pane, watch them work in real-time
- Git-native state — YAML files for queue/results, markdown for dashboard. All version-controllable, diffable.
- Immediate control return — `./shogun.sh` delegates and exits instantly, no blocking wait
- 8-way parallelism — maximum Claude Code free tier allows (8 concurrent sessions)
- Memory MCP integration — preferences persist across sessions (coding style, patterns, decisions)
- Feudal metaphor is memorable — Shogun/Karo/Ashigaru hierarchy intuitive for delegation
- Active development — last commit 2026-02-07, responsive to community
- English + Japanese docs — well-documented in both languages

### Weaknesses
- tmux dependency — requires tmux session running, manual `tmux attach` to view progress
- No session resumption — if tmux session dies, all Ashigaru state lost
- Limited to 8 agents — hardcoded Ashigaru count, cannot scale beyond free tier limit
- Manual dashboard monitoring — `cat dashboard.md` to see results, no push notifications
- YAML queue polling — agents poll queue files (inefficient vs push-based coordination)
- No dependency management — Karo assigns subtasks but doesn't enforce prerequisites (unlike Agent Teams DAG)
- No verification pipeline — Ashigaru results trusted without cross-checking
- No cost-aware routing — all agents use same model, cannot assign simple tasks to Haiku
- Git conflicts possible — 8 agents writing to repo simultaneously without worktree isolation
- Memory MCP setup friction — requires MCP server configuration, not auto-installed
- Compared to Native Agent Teams — 92% architectural overlap but Agent Teams has DAG scheduling, git worktree isolation, peer messaging

### Community Sentiment

Early adopters (743 stars, 162 forks) appreciate the "samurai theme is fun and memorable" and "tmux visualization is powerful for debugging." Developers note it fills gap before Native Agent Teams was released (Feb 2026) but now face decision: stick with Shogun's simplicity or migrate to Agent Teams' robustness. Community discussions compare Shogun to [Agent Teams tutorial by NxCode](https://www.nxcode.io/resources/news/claude-agent-teams-parallel-ai-development-guide-2026) and [Addy Osmani's Claude Code Swarms](https://addyosmani.com/blog/claude-code-agent-teams/). Consensus: Shogun is "educational and approachable" but Agent Teams is "production-ready if you can afford 5-7x token cost." Some users report Shogun's YAML queue approach as "simple to debug — just cat the file" vs Agent Teams' opaque internal state. Japanese community (via README_ja.md) actively using Shogun for learning multi-agent patterns. Related article: [Building with Gemini CLI + tmux](https://ranveersequeira.medium.com/building-full-stack-applications-with-gemini-cli-tmux-a-repo-first-multi-agent-workflow-27c082ea5d83) demonstrates similar tmux-based workflow.

### Compared To

- **Native Agent Teams** (`catalogue/orchestration/native-agent-teams.md`): Built-in Claude Code feature. Agent Teams has DAG task scheduling (dependencies), git worktree isolation (no conflicts), peer messaging, but 5-7x token cost. Shogun is lighter (no coordination overhead) but no dependency management, no worktree isolation. Use Shogun for cost-sensitive parallel work; use Agent Teams for complex task graphs.
- **Claude Squad** (`catalogue/process/claude-squad.md`): Process manager for multiple Claude sessions. Claude Squad manages sessions across repos/projects; Shogun manages agents within one repo. Complementary: use Claude Squad to run multiple Shogun instances across projects.
- **tmux Sessions** (`catalogue/process/tmux-sessions.md`): Raw tmux-based session management. Shogun is tmux-based but adds YAML queue system and Karo/Ashigaru delegation. tmux Sessions is manual; Shogun is scripted.
- **Crystal** (`catalogue/orchestration/crystal.md`): Visual orchestration with web dashboard. Crystal manages parallel sessions visually; Shogun uses tmux panes + YAML files. Crystal is GUI-focused; Shogun is terminal-native.
- **claude-flow** (`catalogue/orchestration/claude-flow.md`): Complex orchestration framework. claude-flow has provider routing, sophisticated coordination; Shogun has simple YAML queue. claude-flow is heavy; Shogun is light. Shogun wins on simplicity.

## Our Usage

**Status: Watching** — Not installed, monitoring competition with Native Agent Teams.

**Why watching:**
- **YAML queue simplicity:** Plain files for task delegation is debuggable, version-controllable, git-friendly (aligns with our git-native requirement)
- **tmux visualization:** Seeing all 8 agents work in real-time is powerful for debugging parallel execution
- **Zero coordination overhead:** No API coordination, no database, no locks — just files. Reduces complexity vs Agent Teams' peer messaging.
- **Memory MCP integration:** Preference persistence across sessions aligns with learning goal (Phase 5)

**Why not chosen:**
- **Native Agent Teams available:** Feb 2026 release provides DAG scheduling, worktree isolation, peer messaging. Shogun's value prop weakened by official native solution.
- **No dependency management:** Karo delegates but doesn't enforce prerequisites. Agent Teams' DAG is more robust for task graphs.
- **No worktree isolation:** 8 agents writing to same repo creates merge conflict risk. Agent Teams isolates each teammate.
- **Manual dashboard monitoring:** `cat dashboard.md` is friction vs Agent Teams' built-in task list (Ctrl+T)
- **YAML polling inefficiency:** Agents poll queue files. Agent Teams uses push-based task assignment.
- **Limited to 8 agents:** Hardcoded count. Agent Teams scales to team size needed.

**Potential future use:**
- **Cost-constrained parallelism:** If Agent Teams' 5-7x token cost is prohibitive, Shogun's lighter coordination could justify trade-off
- **Educational deep dive:** Study YAML queue implementation as alternative to DAG-based coordination
- **Hybrid approach:** Use Shogun's tmux visualization pattern with Agent Teams' coordination logic

**Decision criteria for adoption:**
- **Trigger:** Agent Teams cost becomes blocker (e.g., burning $100/day on 5-agent teams)
- **Feature parity gap:** If Shogun adds DAG scheduling and worktree isolation, reassess vs Agent Teams
- **Integration test:** Run Shogun + Agent Teams side-by-side on same task to compare cost vs quality trade-off

**If Agent Teams didn't exist:** Shogun would score **4.00+** and be CHOSEN for Phase 3 (Run It) parallel execution. But Native Agent Teams is more reliable, better tested, and Anthropic-maintained.

## Sources

- [GitHub README](https://github.com/yohey-w/multi-agent-shogun)
- [GitHub README (Japanese)](https://github.com/yohey-w/multi-agent-shogun/blob/main/README_ja.md)
- [GitHub Wiki](https://github.com/yohey-w/multi-agent-shogun/wiki)
- [Addy Osmani: Claude Code Swarms](https://addyosmani.com/blog/claude-code-agent-teams/)
- [NxCode: Claude Agent Teams Tutorial](https://www.nxcode.io/resources/news/claude-agent-teams-parallel-ai-development-guide-2026)
- [Marco Patzelt: Claude Code Agent Teams Setup Guide](https://www.marc0.dev/en/blog/claude-code-agent-teams-multiple-ai-agents-working-in-parallel-setup-guide-1770317684454)
- [Medium: Building with Gemini CLI + tmux](https://ranveersequeira.medium.com/building-full-stack-applications-with-gemini-cli-tmux-a-repo-first-multi-agent-workflow-27c082ea5d83)
- [Kaushik Gopal: Forking subagents with tmux](https://kau.sh/blog/agent-forking/)

---
*Last reviewed: 2026-02-07*
