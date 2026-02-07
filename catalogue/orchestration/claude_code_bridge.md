# Claude Code Bridge (ccb)

| Field | Value |
|-------|-------|
| GitHub | [bfly123/claude_code_bridge](https://github.com/bfly123/claude_code_bridge) |
| Stars | 1,059 |
| Last Commit | 2026-02-06 |
| Install | `git clone https://github.com/bfly123/claude_code_bridge.git && cd claude_code_bridge && ./install.sh install` |
| Status | Watching |
| Score | **3.40** |
| Category | orchestration |
| Holy Grail Phase | Supporting |

## What It Does

A multi-model collaboration tool that runs Claude, Codex, Gemini, OpenCode, and Droid simultaneously in a split-pane terminal (WezTerm or tmux). Enables real-time WYSIWYG multi-AI collaboration with persistent context, minimal token overhead, and cross-AI orchestration where multiple agents can delegate tasks to each other via lightweight prompts instead of full file history.

## How It Works

**Architecture:**
- **Terminal backend abstraction:** Unified layer (TmuxBackend / WeztermBackend) with auto-detection and WSL path handling
- **Daemon system (v3.0+):** `caskd`, `gaskd`, `oaskd`, `daskd`, `laskd` auto-start on first request, shut down after 60s idle
- **Unified command system (v5.1.0+):** `ask <provider> <message>`, `ping <provider>`, `pend <provider> [N]` replace provider-specific commands
- **Skills system:** `/ask <provider> <message>`, `/ping <provider>`, `/pend <provider>`, `/all-plan <requirement>`
- **Mail system (v5.2.0+):** Email-to-AI gateway for remote access via IMAP/SMTP (Gmail, Outlook, QQ, 163 mail)

**Launch:**
```bash
ccb codex gemini opencode claude    # Start all four
ccb -r codex gemini                 # Resume last session
ccb -a codex gemini opencode        # Auto-approval mode
```

**Layout:** Last provider runs in current pane. Extras ordered as `[cmd?, reversed providers]`. First extra goes top-right, then left column fills top-to-bottom, then right column.

**Configuration:** `.ccb_config/ccb.config` (project) or `~/.ccb/ccb.config` (global). Simple format: `codex,gemini,opencode,claude` or JSON for advanced flags/cmd pane.

**Cross-AI delegation examples:**
- Claude: "Have Codex review the changes in main.py."
- Claude: "Ask Gemini for alternative implementation approaches."
- Codex: Autonomously call `/ask opencode <task>` to delegate sub-tasks

**Platform support:**
- Linux/macOS/WSL: Uses tmux as terminal backend
- Windows native: Uses WezTerm + PowerShell with `DETACHED_PROCESS` background execution

## Evaluation

### Strengths

- **Visual & controllable:** Multiple AI models in split-pane CLI, see everything, control everything
- **Persistent context:** Each AI maintains its own memory, close and resume anytime (`-r` flag)
- **Token savings:** Sends lightweight prompts instead of full file history
- **True parallelism:** Submit multiple tasks to different AIs simultaneously, queued and executed serially by daemons
- **Cross-AI orchestration:** Claude and Codex can simultaneously drive OpenCode agents, arbitrated by unified daemon layer
- **Interruption awareness:** Gemini tasks support intelligent interruption detection
- **Active development:** Recent commit (2026-02-06), active maintenance
- **Comprehensive features:** Email integration, session switch tracking, completion hooks, zombie cleanup
- **Any terminal support:** If terminal can run tmux, CCB provides full multi-model split experience
- **Windows native support:** WezTerm + PowerShell, not just WSL

### Weaknesses

- **High complexity:** 32KB README, steep learning curve, many moving parts (daemons, backends, hooks, mail system)
- **WezTerm dependency:** Highly recommended, limits terminal choice
- **Installation varies by platform:** Different installers for Linux/macOS/WSL/Windows native, easy to pick wrong one
- **Environment mismatch issues:** Common problem: ccb in WSL but codex in native Windows (or vice versa) causes `cping` to fail
- **First-time setup friction:** WezTerm config, distro name for WSL, PATH issues on macOS, permission prompts
- **No clear upgrade path from native workflow:** If using Claude Code alone, unclear how to gradually adopt multi-AI
- **Daemon management:** Auto-start/stop is convenient but adds invisible complexity
- **Python 3.10+ required:** Dependency on modern Python runtime
- **Not well-known outside niche:** 1,059 stars, but not in mainstream Claude Code tooling guides
- **Chinese community focus:** WeChat contact, some docs reference Chinese concepts (Dou Di Zhu card game)

### Community Sentiment

Limited English-language community discussion. GitHub activity shows active development and bug fixes. Users praise the "WYSIWYG solution" vs "MCP, Skills and other direct API approaches" which "have many limitations." The project positions itself as solving "model bias, cognitive blind spots, and context limitations" through multi-model collaboration. v5.x updates focus on stability (daemon lifecycle, session tracking, completion hooks). No major blog posts or reviews found in mainstream AI dev community.

### Compared To

- **Claude Code MCP ([orchestration/claude-code-mcp.md](../orchestration/claude-code-mcp.md)):** MCP is one-shot delegation from external client. Bridge is persistent split-pane collaboration. Different use cases.
- **Native Agent Teams ([orchestration/native-agent-teams.md](../orchestration/native-agent-teams.md)):** Agent Teams coordinates multiple Claude Code sessions with Team Lead. Bridge coordinates different AI providers (Claude, Codex, Gemini). Bridge more heterogeneous.
- **tmux Sessions ([process/tmux-sessions.md](../process/tmux-sessions.md)):** tmux Sessions manages Claude Code sessions in tmux. Bridge manages multiple AI providers in tmux. Bridge adds cross-AI delegation layer.
- **Claude Squad ([process/claude-squad.md](../process/claude-squad.md)):** Squad manages parallel Claude Code sessions. Bridge manages heterogeneous AI providers. Squad more homogeneous.

## Our Usage

**Status: Watching** — Not installed yet.

**Why watching:**
- Interesting concept for multi-AI collaboration, could avoid model bias
- Split-pane WYSIWYG approach is intuitive vs API-driven delegation
- Cross-AI orchestration (Claude driving Codex driving OpenCode) shows thoughtful architecture
- Active development, recent stability improvements (v5.2.x)

**Why not chosen:**
- **High complexity:** 32KB README, steep learning curve, many features we don't need (mail system, zombie cleanup)
- **Unclear value proposition:** We already have subagents and agent teams within Claude Code. Do we need Codex/Gemini?
- **Not aligned with Holy Grail phases:** Our focus is Claude Code autonomy. This tool optimizes for Adam manually orchestrating multiple AIs.
- **Installation friction:** Platform-specific installers, environment mismatch issues, WezTerm dependency
- **Limited mainstream adoption:** 1,059 stars, not in major tooling guides, unclear long-term support
- **Overkill for current workflow:** We're building spec → task → execute → verify → learn pipeline within Claude Code. Multi-AI adds coordination complexity without clear benefit at this stage.

**Potential use case:** If we hit limitations with Claude's reasoning and want to delegate specific tasks to Codex (code) or Gemini (search), could revisit. But likely better to use native MCP servers or subagents for that.

**Decision deferred until:** We've established baseline autonomous workflow and can identify specific tasks where Claude Code alone is insufficient.

## Sources

- [GitHub README](https://github.com/bfly123/claude_code_bridge)
- [Building AI-driven workflows powered by Claude Code and other tools](https://uxdesign.cc/designing-with-claude-code-and-codex-cli-building-ai-driven-workflows-powered-by-code-connect-ui-f10c136ec11f)
- [Claude Code and Agentic AI: 7 Powerful Shifts in Knowledge Work](https://techgenyz.com/claude-code-agentic-ai-future-of-knowledge-work/)

---
*Last reviewed: 2026-02-07*
