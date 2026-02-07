# Claude Code Workflow

| Field | Value |
|-------|-------|
| GitHub | [catlog22/Claude-Code-Workflow](https://github.com/catlog22/Claude-Code-Workflow) |
| Stars | 1,259 |
| Last Commit | 2026-02-06 |
| Install | `npm install -g claude-code-workflow && ccw install -m Global` |
| Status | Watching |
| Score | 3.45 |
| Category | orchestration |
| Holy Grail Phase | 2-Task / 3-Run / Supporting |

## What It Does

A JSON-driven multi-agent development framework with intelligent CLI orchestration (Gemini, Qwen, Codex, Claude), 4-level workflow system, and dependency-aware parallelism. Provides semantic CLI invocation (describe what you want, system calls the right tool), dashboard for session management, and CodexLens for hybrid code search.

## How It Works

**Installation:**
```bash
npm install -g claude-code-workflow
ccw install -m Global
```

**4-Level Workflow System:**
1. **Level 1: lite-lite-lite** — Instant execution, no artifacts (quick fixes, config changes)
2. **Level 2: lite-plan / lite-fix / multi-cli-plan** — Lightweight planning (single-module features, bug diagnosis)
3. **Level 3: plan / tdd-plan / test-fix-gen** — Standard planning with session persistence (multi-module development)
4. **Level 4: brainstorm:auto-parallel** — Multi-role brainstorming + parallel execution (new features, architecture design)

**Semantic CLI Invocation:**
- User: "Use Gemini to analyze the auth module"
- System: Auto-invokes `gemini` CLI with analysis task
- Multi-CLI: "Have Gemini, Codex, and Qwen analyze architecture in parallel"
- Pipeline: "Gemini designs, Codex implements, Claude reviews"

**CLI Tools:**
- Gemini (Google AI analysis)
- Codex (OpenAI autonomous coding)
- OpenCode (open-source multi-model)
- Qwen (Alibaba Qwen-Code)
- Claude Code (via proxy or native)

**Custom CLI Registration:**
- Dashboard → Status → API Settings → Add Custom CLI
- Register any API endpoint (e.g., DeepSeek) with name + endpoint + key
- Invoke semantically in prompts after registration

**Dashboard Features:**
- Session Overview — track workflow sessions + progress
- CodexLens — FTS + Semantic + Hybrid code search (local embedding models)
- Graph Explorer — interactive code relationship visualization
- CLI Manager — execution history with session resume

**Issue Workflow (Supplement):**
- `discover` → `plan` → `queue` → `execute` (optional worktree isolation)
- Post-development maintenance workflow

**ACE Tool Configuration:**
- Augment Context Engine (semantic code search)
- Official: [Augment MCP Documentation](https://docs.augmentcode.com/context-services/mcp/overview)
- Proxy: [ace-tool (GitHub)](https://github.com/eastxiaodong/ace-tool)

**Key Commands:**
```bash
# Auto workflow orchestrator (main process)
/ccw "Add user authentication"  # Auto-selects workflow level

# Smart orchestrator (external CLI, state persistence)
/ccw-coordinator "Implement OAuth2 system"  # Recommends chain → confirm → execute

# Other CLI
ccw install           # Install workflow files
ccw view              # Open dashboard
ccw cli -p "..."      # Execute CLI tools
ccw upgrade -a        # Upgrade all
```

## Evaluation

### Strengths
- **4-level workflow system** — Matches task complexity (instant → brainstorm)
- **Semantic CLI invocation** — Describe intent, system calls tool (no manual switching)
- **Multi-CLI orchestration** — Gemini, Qwen, Codex, Claude, OpenCode, custom APIs
- **Dependency-aware parallelism** — No worktree complexity (agent parallel execution)
- **Dashboard** — Visual session management, search, graph explorer
- **CodexLens** — Hybrid search (FTS + Semantic + Reranking)
- **Active development** — Last commit Feb 6, 2026 (yesterday)
- **JSON-first state** — `.task/IMPL-*.json` as single source of truth
- **npm package** — Easy install, no manual setup
- **Custom CLI registration** — Add any API endpoint via dashboard

### Weaknesses
- **Complex architecture** — 4 workflow levels + dashboard + CodexLens + ACE tool
- **Not Claude Code native** — Uses external CLIs, not integrated into `claude` command
- **JSON state** — Not markdown-based (AI agents prefer markdown)
- **Dashboard required** — Web UI dependency for full features
- **CodexLens in development** — "Under iterative optimization. Some features may be unstable."
- **No git-native spec integration** — Doesn't generate OpenSpec-style specs
- **ACE tool dependency** — Requires separate MCP service or proxy
- **Workflow mapping unclear** — How do Level 1-4 map to our Holy Grail phases?
- **Chinese documentation** — README_CN.md suggests Chinese-first project (translation concerns)

### Community Sentiment

From web search:
- **1,259 stars** — Moderate traction
- **Active development** — Feb 6, 2026 commit (same day as evaluation)
- **No user reviews found** — Search results show docs, GitHub, no Reddit/HN discussions
- **Related projects mentioned** — claude-flow (ruvnet), Claude Code Swarm Orchestration, Agentrooms
- **MCP integration** — Mentions MCP protocol support for Claude Code
- **InfoQ article** — [OpenCode: Open-source AI Coding Agent Competing with Claude Code](https://www.infoq.com/news/2026/02/opencode-coding-agent/)

### Compared To

- **Native Agent Teams (CHOSEN)** — Claude Code's built-in TeammateTool + subagents. **Simpler, native.**
- **Ralphy** (Evaluated) — Single PRD → multi-engine loop. **More focused, less complex.**
- **OMC Autopilot** (CHOSEN) — 32 agents, TDD-first, model routing. **More opinionated, deeper execution.**
- **Gas Town** (Watching) — Multi-agent coordination. **8,500 stars, more mature.**
- **claude-flow** (Rejected) — Over-engineered, 13,700 stars but rejected.

**Differentiation:** Claude-Code-Workflow is a **workflow orchestrator** (Level 1-4 decision tree) + **multi-CLI bridge** (semantic invocation) + **dashboard** (session management). It's **comprehensive but complex**. Ralphy is simpler for execution loops; OMC is deeper for TDD workflows; Native Agent Teams is native to Claude Code.

## Our Usage

**Status: Watching**

**Why not chosen (yet):**
1. **Too complex** — 4 workflow levels + dashboard + CodexLens + ACE tool exceeds "Adam explains in one sentence"
2. **Not Claude Code native** — External CLIs, not integrated into `claude` command
3. **JSON state, not markdown** — Our stack is markdown-first (AI-readable, git-friendly)
4. **Native Agent Teams chosen** — Claude Code's built-in orchestration is simpler
5. **No OpenSpec/Beads integration** — Doesn't fit our spec → task → execute pipeline
6. **CodexLens unstable** — "Under iterative optimization" = not production-ready

**Why we're watching:**
1. **Active development** — Feb 6, 2026 commit suggests momentum
2. **Semantic CLI invocation** — "Use Gemini to analyze" is compelling UX
3. **4-level workflow system** — Matches our need to scale from quick fixes to architecture design
4. **Multi-CLI flexibility** — If OMC fails, this could swap Gemini/Qwen/Codex
5. **Dashboard** — Visual session tracking could help Adam monitor Ralph runs
6. **Custom CLI registration** — Could bridge to proprietary models

**When we'd choose it:**
- If Native Agent Teams proves insufficient for complex orchestration
- If we need multi-CLI flexibility (Gemini for cost, Claude for quality, Qwen for speed)
- If semantic CLI invocation becomes standard UX pattern in our workflows
- If we build a dashboard for monitoring autonomous Ralph runs

**Experiment idea:**
1. Install CCW on Ralph: `npm install -g claude-code-workflow && ccw install -m Global`
2. Test Level 2 workflow (`/workflow:lite-plan`) on a single-module feature
3. Compare to Native Agent Teams (CHOSEN) for orchestration complexity
4. Evaluate: Is semantic CLI invocation worth the added architecture?

**Score Breakdown (max 5.00):**
- Holy Grail alignment (30%): 3.5 — Covers Phase 2 (Task) + Phase 3 (Run), but no spec/notify/schedule
- Simplicity (20%): 2.5 — 4 workflow levels + dashboard + CLI manager = complex
- Community trust (15%): 3.5 — 1,259 stars, active dev, but no user reviews
- Ecosystem fit (15%): 3.0 — Multi-CLI, but no OpenSpec/Beads integration
- Cost efficiency (10%): 4.0 — Multi-CLI = cost flexibility (Gemini/Qwen cheaper)
- Maturity (10%): 3.5 — npm package, changelog, but CodexLens unstable

**Weighted Score:** (3.5×0.30) + (2.5×0.20) + (3.5×0.15) + (3.0×0.15) + (4.0×0.10) + (3.5×0.10) = **3.45**

## Sources

- [GitHub: catlog22/Claude-Code-Workflow](https://github.com/catlog22/Claude-Code-Workflow)
- [npm: claude-code-workflow](https://www.npmjs.com/package/claude-code-workflow)
- [Workflow Guide](https://github.com/catlog22/Claude-Code-Workflow/blob/main/WORKFLOW_GUIDE.md)
- [Dashboard Guide](https://github.com/catlog22/Claude-Code-Workflow/blob/main/DASHBOARD_GUIDE.md)
- [Getting Started](https://github.com/catlog22/Claude-Code-Workflow/blob/main/GETTING_STARTED.md)
- [InfoQ: OpenCode - Open-source AI Coding Agent](https://www.infoq.com/news/2026/02/opencode-coding-agent/)

---
*Last reviewed: 2026-02-07*
