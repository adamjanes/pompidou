# Ralph TUI

| Field | Value |
|-------|-------|
| GitHub | [subsy/ralph-tui](https://github.com/subsy/ralph-tui) |
| Stars | 1,700 |
| Last Commit | 2026-02 (active, 1,163 commits) |
| Install | `bun install -g ralph-tui` |
| Status | Evaluated |
| Category | execution |
| Holy Grail Phase | 3-Run |

## What It Does

Ralph TUI is a terminal UI orchestrator that connects AI coding assistants (Claude Code, OpenCode, Gemini CLI, Codex, and others) to task trackers and runs them autonomously. It provides a rich interactive interface for watching agent execution in real-time, managing tasks, controlling the loop with keyboard shortcuts, and even monitoring remote instances. The standout features are the TUI itself (full visibility into what agents are doing), native Beads integration as a task tracker, and multi-machine remote orchestration.

## How It Works

**5-step execution cycle:**
1. Select highest-priority task from tracker (prd.json or Beads)
2. Build a contextual prompt with cross-iteration progress
3. Execute AI agent (Claude Code, OpenCode, Gemini CLI, etc.)
4. Detect task completion via output analysis
5. Move to next task; repeat until all items finish

**Key commands:**
```bash
ralph-tui setup                         # Initial configuration
ralph-tui create-prd --chat             # Interactive PRD creation
ralph-tui run --prd ./prd.json          # Run with PRD tracker
ralph-tui run --tracker beads           # Run with Beads tracker
ralph-tui resume                        # Restart interrupted session
ralph-tui run --headless                # CI/CD mode (no TUI)
ralph-tui run --listen                  # Enable remote listener on port 7890
ralph-tui remote add <alias> <host>     # Add remote instance
```

**TUI keyboard shortcuts:** `s` = start, `p` = pause/resume, `d` = toggle dashboard, `T` = toggle subagent tree, `o` = cycle views, `q` = quit, `1-9` = switch remote tabs.

**Task trackers:** Supports `prd.json` (simple flat list) and Beads (git-backed with dependency graphs). The Beads integration means tasks can have dependencies, and the TUI respects execution order.

**Remote instances:** Multi-machine orchestration via authenticated connections. Servers expose port 7890, generate 90-day tokens, and clients connect to monitor/control. All actions logged to audit.log.

**Theming:** Bundled themes (bright, catppuccin, dracula, high-contrast, solarized-light).

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 4 | 1.20 |
| Simplicity | 20% | 3 | 0.60 |
| Community trust | 15% | 4 | 0.60 |
| Ecosystem fit | 15% | 4 | 0.60 |
| Cost efficiency | 10% | 4 | 0.40 |
| Maturity | 10% | 3 | 0.30 |
| **Composite** | | | **3.70** |

### Strengths
- 1,700 stars and 1,163 commits — well-maintained, actively developed
- TUI provides real-time visibility into agent execution (subagent tracing is unique)
- Native Beads integration aligns with our task tracking choice
- Multi-agent support (6+ agents) avoids vendor lock-in
- Remote instance management enables Mac Mini orchestration
- Session persistence survives crashes and interruptions
- Headless mode for CI/CD integration
- Sandboxing support (bwrap on Linux, sandbox-exec on macOS)

### Weaknesses
- Requires Bun runtime — additional dependency beyond Node.js
- Rich TUI is great for interactive use but adds complexity for headless/automated scenarios
- 1,163 commits in ~1 month suggests very rapid development — stability concerns
- Remote orchestration adds network security surface area
- No built-in agent specialization (unlike OMC's 32 agents)
- The TUI is the product — if you don't need the UI, the overhead isn't justified

### Community Sentiment

Strong and growing at 1,700 stars with 170 forks. The TUI is the most discussed feature — developers appreciate seeing what agents are actually doing rather than watching a blank terminal. The Beads integration is popular with users who want dependency-aware task execution. Remote orchestration attracts users managing multiple machines. The Bun requirement is the most common complaint. Comparisons to Claude Squad are frequent, with Ralph TUI winning on features and Claude Squad winning on simplicity.

### Compared To

- **Oh My ClaudeCode** (`catalogue/execution/oh-my-claudecode.md`): OMC provides execution modes and agent specialization. Ralph TUI provides a visual orchestration layer and task tracker integration. They could complement each other — OMC as the agent, Ralph TUI as the orchestrator.
- **Claude Squad** (`catalogue/process/claude-squad.md`): Both manage multiple agent sessions. Claude Squad is simpler (tmux-based). Ralph TUI is richer (full TUI, remote instances, Beads integration).
- **Snarktank Ralph** (`catalogue/execution/snarktank-ralph.md`): Ralph TUI can consume Snarktank's `prd.json` format, effectively wrapping it in a visual interface.

## Our Usage

**Not chosen, but worth revisiting.** The Beads integration and remote instance management are directly relevant to our stack (Beads for tasks, Mac Mini for execution). The TUI would provide visibility into Ralph loops running on the Mac Mini. Currently we plan to use Claude Squad/tmux for process management, but Ralph TUI offers a more capable alternative. The Bun dependency is the main friction point. Revisit when setting up Phase 4 (autonomous execution).

## Sources

- [GitHub README](https://github.com/subsy/ralph-tui)

---
*Last reviewed: 2026-02-06*
