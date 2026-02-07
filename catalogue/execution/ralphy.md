# Ralphy

| Field | Value |
|-------|-------|
| GitHub | [michaelshimeles/ralphy](https://github.com/michaelshimeles/ralphy) |
| Stars | 2,228 |
| Last Commit | 2026-02-05 |
| Install | `npm install -g ralphy-cli` or `git clone https://github.com/michaelshimeles/ralphy.git && chmod +x ralphy.sh` |
| Status | Evaluated |
| Score | 4.15 |
| Category | execution |
| Holy Grail Phase | 3-Run / 5-Repeat |

## What It Does

An autonomous AI coding loop that runs multiple AI engines (Claude Code, OpenCode, Cursor, Codex, Qwen, Droid, Copilot, Gemini) on a task list until a PRD is complete. Reads tasks from markdown, YAML, JSON, or GitHub Issues, executes via configurable AI CLIs, handles parallel agents with worktrees or sandboxes, auto-commits, creates PRs, and loops until all tasks are done.

## How It Works

**Two Modes:**
1. **Single task:** `ralphy "add dark mode"` — one-shot execution
2. **Task list:** `ralphy --prd PRD.md` — iterate through checklist

**Task Sources:**
- Markdown files with `- [ ]` checkboxes (default: PRD.md)
- Markdown folders (aggregates tasks from all `.md` files)
- YAML with `tasks` array
- JSON with `tasks` array and `parallel_group` support
- GitHub Issues (`--github owner/repo --github-label "ready"`)

**Engine Support:**
```bash
ralphy "task"              # Claude Code (default)
ralphy --opencode "task"   # OpenCode
ralphy --cursor "task"     # Cursor agent
ralphy --codex "task"      # Codex
ralphy --qwen "task"       # Qwen-Code
ralphy --droid "task"      # Factory Droid
ralphy --copilot "task"    # GitHub Copilot
ralphy --gemini "task"     # Gemini CLI
ralphy --model sonnet      # Override model
```

**Parallel Execution:**
```bash
ralphy --parallel --max-parallel 5
```
- Each agent gets isolated worktree + branch: `ralphy/agent-1-create-auth`
- Falls back to sandbox mode (symlinks `node_modules`, copies source) if worktree fails
- Auto-merges branches or creates PRs (`--create-pr`, `--draft-pr`)

**Config (.ralphy/config.yaml):**
```yaml
project:
  name: "my-app"
  language: "TypeScript"
  framework: "Next.js"

commands:
  test: "npm test"
  lint: "npm run lint"

rules:
  - "use server actions not API routes"

boundaries:
  never_touch:
    - "src/legacy/**"

capabilities:
  browser: "auto"  # Enable agent-browser for UI testing

notifications:
  discord_webhook: "https://discord.com/..."
  slack_webhook: "https://hooks.slack.com/..."
```

**Browser Automation:**
- `--browser` enables agent-browser for UI testing
- AI can run `agent-browser open`, `snapshot`, `click @e1`, `type @e1 "text"`

**Webhook Notifications:**
- Discord, Slack, or custom webhooks notify on session completion

## Evaluation

### Strengths
- **Multi-engine support** — 8 AI CLIs, hot-swappable mid-project
- **Parallel execution** — Multiple agents with conflict resolution
- **Git-native** — Tasks stored in markdown, branches per task
- **Project config** — Rules, boundaries, never-touch patterns
- **Active development** — Last commit Feb 5, 2026; hit 1K stars in 3 days
- **Both npm and bash versions** — npm for cross-platform, bash for Unix
- **Browser automation** — Test UI flows with agent-browser integration
- **Webhook notifications** — Discord/Slack alerts on completion
- **Sandbox mode** — Lightweight isolation with symlinked deps (faster than worktrees)
- **GitHub Issues integration** — Pull tasks directly from issues
- **Retry logic** — Configurable retries per task with exponential backoff
- **Draft PR support** — Create draft PRs for review

### Weaknesses
- **No spec integration** — Doesn't generate PRDs, assumes you have one
- **No blocker detection** — Loops until task succeeds or retries exhausted
- **Task breakdown manual** — Doesn't split tasks into smaller units (see Beads)
- **Limited context management** — No memory service integration
- **Webhook-only notifications** — No Telegram support (OpenClaw needed)
- **Parallel isolation brittle** — Falls back to sandbox if worktree fails
- **No cost tracking** — Token usage displayed but no budget limits
- **Single-repo focused** — Not designed for multi-repo orchestration

### Community Sentiment

From web search:
- **"Hit 1K GitHub stars in 3 days"** — [SourcePulse](https://www.sourcepulse.org/projects/22804331)
- **"Someone finally built the Ralph loop I wanted"** — [Vibe Coding (Medium)](https://medium.com/vibe-coding/someone-finally-built-the-ralph-loop-i-wanted-8f3050b7b181)
- **"Loops cleanly, predictably, and ships code"** — [Coding Nexus (Medium)](https://medium.com/coding-nexus/ralph-an-autonomous-ai-loop-that-actually-ships-code-5807a4a4e3bb)
- **"Worth adding to a dev stack whether you're a solo developer or a team"** — [AIBit](https://aibit.im/blog/post/ralphy-ai-powered-autonomous-coding-loop-cli)
- Active GitHub issues (multiple opened late Jan 2026) — ongoing community engagement

### Compared To

- **OMC Autopilot (CHOSEN)** — 32 agents, TDD-first, model routing, code review. OMC is full dev cycle; Ralphy is execution loop.
- **Ralphy (Official Plugin)** — Anthropic's own Ralph implementation (not yet released).
- **How to Ralph Wiggum** — Pattern/guide, not a tool.
- **Snarktank Ralph** — Single-engine (Claude), no parallel, no config.
- **Ralph TUI** — Terminal UI for monitoring Ralph loops, not a runner.

**Differentiation:** Ralphy is the **most feature-complete open-source Ralph loop**. Multi-engine, parallel agents, browser testing, webhooks, GitHub Issues integration. It's a **Phase 3 executor** but needs Phase 1 (OpenSpec) and Phase 2 (Beads) upstream.

## Our Usage

**Status: Evaluated**

**Why not chosen (yet):**
1. **OMC Autopilot chosen first** — We selected OMC for its 32-agent system, TDD approach, and code review bots. Test OMC before adding Ralphy.
2. **No spec integration** — Ralphy assumes PRD exists; we want OpenSpec → Beads → Executor pipeline.
3. **No blocker detection** — Loops until success/failure; doesn't push blockers to Adam proactively.
4. **Parallel isolation concerns** — Worktree fallback to sandbox suggests edge cases; needs testing.

**Why we're watching:**
1. **Active development** — Feb 2026 commit, community traction, responsive maintainer.
2. **Multi-engine flexibility** — If OMC fails, Ralphy can swap to Cursor/Codex/Qwen.
3. **GitHub Issues integration** — Could bridge Linear (via Linear MCP) → GitHub Issues → Ralphy.
4. **Browser automation** — UI testing without manual intervention is compelling.
5. **Project config** — Rules, boundaries, never-touch patterns align with our safety needs.

**When we'd choose it:**
- If OMC proves too complex or breaks frequently
- If we need multi-engine support (e.g., Gemini for cost, Claude for quality)
- If we build a custom spec → task pipeline and need a solid executor
- If browser testing becomes critical to our workflow

**Score Breakdown (max 5.00):**
- Holy Grail alignment (30%): 4.5 — Strong Phase 3 (Run) + partial Phase 5 (Repeat via parallel)
- Simplicity (20%): 4.0 — `npm install -g`, one command, but config file complexity
- Community trust (15%): 4.5 — 2,228 stars, hit 1K in 3 days, positive Medium reviews
- Ecosystem fit (15%): 3.5 — Works with any task list, but no OpenSpec/Beads integration
- Cost efficiency (10%): 4.0 — Multi-engine = cost flexibility, but no budget limits
- Maturity (10%): 4.0 — v4.7.2, active issues, changelog, but relatively young

**Weighted Score:** (4.5×0.30) + (4.0×0.20) + (4.5×0.15) + (3.5×0.15) + (4.0×0.10) + (4.0×0.10) = **4.15**

## Sources

- [GitHub: michaelshimeles/ralphy](https://github.com/michaelshimeles/ralphy)
- [npm: ralphy-cli](https://www.npmjs.com/package/ralphy-cli)
- [Vibe Coding: Someone Finally Built the Ralph Loop I Wanted](https://medium.com/vibe-coding/someone-finally-built-the-ralph-loop-i-wanted-8f3050b7b181)
- [Coding Nexus: Ralph - An Autonomous AI Loop That Actually Ships Code](https://medium.com/coding-nexus/ralph-an-autonomous-ai-loop-that-actually-ships-code-5807a4a4e3bb)
- [AIBit: Ralphy AI-Powered Autonomous Coding Loop CLI](https://aibit.im/blog/post/ralphy-ai-powered-autonomous-coding-loop-cli)
- [SourcePulse: ralphy by michaelshimeles](https://www.sourcepulse.org/projects/22804331)

---
*Last reviewed: 2026-02-07*
