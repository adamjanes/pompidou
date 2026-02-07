# Claude Code MCP

| Field | Value |
|-------|-------|
| GitHub | [steipete/claude-code-mcp](https://github.com/steipete/claude-code-mcp) |
| Stars | 1,074 |
| Last Commit | 2026-01-01 |
| Install | `npx -y @steipete/claude-code-mcp@latest` |
| Status | Watching |
| Score | **3.60** |
| Category | orchestration |
| Holy Grail Phase | Supporting |

## What It Does

An MCP (Model Context Protocol) server that exposes Claude Code as a one-shot tool for other AI clients (Claude Desktop, Cursor, Windsurf). Allows LLMs to invoke Claude Code with all permissions bypassed automatically (`--dangerously-skip-permissions`), creating an "agent in your agent" pattern where external tools can leverage Claude Code's file editing and command execution capabilities.

## How It Works

**Setup:**
1. Install Claude CLI and run once with `--dangerously-skip-permissions` to accept terms (one-time requirement)
2. Configure MCP client (Cursor: `~/.cursor/mcp.json`, Windsurf: `~/.codeium/windsurf/mcp_config.json`) to use the npx command
3. External AI clients can now invoke `claude_code` tool via MCP protocol

**Tool provided:**
- **`claude_code`:** Executes prompt directly using Claude Code CLI with `--dangerously-skip-permissions`
  - Arguments: `prompt` (string, required), `options.tools` (array, optional) to enable specific tools
  - Example: `{"prompt": "Refactor the function foo in main.py to be async."}`

**Environment variables:**
- `CLAUDE_CLI_NAME`: Override binary name or provide absolute path (default: `claude`)
- `MCP_CLAUDE_DEBUG`: Enable debug logging (`true` for verbose output)

**Use cases:**
- Claude/Windsurf file editing offload: "Claude Code is better and faster at it"
- Command queueing: Multiple commands queued instead of direct execution saves context space
- Cost optimization: Offload to cheaper models via Claude Code while using expensive models (Gemini, o3) in Max mode
- Wider system access: Claude Code can do things Cursor/Windsurf can't or won't
- Un-sticking: When other tools are stuck, "use claude code" often resolves

## Evaluation

### Strengths

- **Cursor/Windsurf integration:** Proven to work smoothly with popular AI code editors
- **Permission bypass built-in:** Auto-uses `--dangerously-skip-permissions` for zero-interruption execution
- **Cost effective:** Offload grunt work to Claude Code while using expensive models for planning
- **Comprehensive test suite:** Unit tests, e2e tests with mocks, e2e tests locally, watch mode, coverage
- **Active maintenance:** Recent commits (Jan 2026), comprehensive documentation
- **Multiple installation methods:** npx (recommended), global npm install, or local development setup
- **Configurable:** Custom Claude CLI binary path, debug logging, timeout configuration
- **MIT license:** Open source, permissive

### Weaknesses

- **Requires first-time manual setup:** Must run Claude CLI with `--dangerously-skip-permissions` once manually before MCP server works
- **macOS permission prompts:** First run may ask for folder permissions and fail; subsequent runs work
- **Node.js v20+ required:** Dependency on modern Node runtime
- **One-shot execution only:** Not designed for persistent sessions or back-and-forth with Claude Code
- **No built-in permission controls:** Always bypasses permissions (by design, but risky if invoked carelessly)
- **MCP configuration complexity:** Requires understanding MCP client config file locations and JSON syntax
- **Limited to file/command operations:** Doesn't expose all Claude Code features (e.g., no conversation history, no checkpoints)

### Community Sentiment

Positive reception in "agent in agent" use case. Listed in "Top 10 Essential MCP Servers for Claude Code (2026)" and "50+ Best MCP Servers for Claude Code in 2026" guides. Users report that "Claude/Windsurf often have trouble editing files. Claude Code is better and faster at it." Active discussions on setup and real-world usage. Community appreciates the ability to "queue commands" and "offload to cheaper models."

### Compared To

- **Native `claude mcp serve`:** This is a wrapper around native MCP serve mode with added configuration (custom timeouts, debug logging, custom binary locations). Use native for simplicity, wrapper for configurability.
- **Claude Code Bridge ([orchestration/claude_code_bridge.md](../orchestration/claude_code_bridge.md)):** Bridge runs multiple AIs in split-pane terminal for real-time collaboration. MCP server is one-shot delegation from external client. Different use cases.
- **Subagents ([native/subagents.md](../native/subagents.md)):** Subagents spawn within Claude Code session. MCP server exposes Claude Code to external clients. Reverse direction.
- **Claude Squad ([process/claude-squad.md](../process/claude-squad.md)):** Squad manages multiple Claude Code sessions directly. MCP server is called by non-Claude-Code tools.

## Our Usage

**Status: Watching** — Not installed yet.

**Why watching:**
- Interesting for delegating file operations from other tools (Cursor, Windsurf) to Claude Code
- "Agent in agent" pattern aligns with our orchestrator philosophy
- Could be useful if Adam uses Cursor for planning and Claude Code for execution
- `--dangerously-skip-permissions` auto-bypass is convenient but risky

**Why not chosen:**
- Our primary workflow is Claude Code-first (not Cursor/Windsurf-first)
- We already have native subagents for delegation within Claude Code
- One-shot execution doesn't fit our persistent session model (Claude Squad, tmux Sessions)
- Unclear if "better file editing" claim justifies switching primary tool

**Potential use case:** If Adam adopts Cursor for UI work, could use this to delegate file operations to Claude Code from Cursor sessions.

**Decision deferred until:** We establish whether Adam wants multi-tool workflow (Cursor + Claude Code) or stays Claude Code-native.

## Sources

- [GitHub README](https://github.com/steipete/claude-code-mcp)
- [npm package](https://www.npmjs.com/package/@steipete/claude-code-mcp)
- [Top 10 Essential MCP Servers for Claude Code (2026)](https://apidog.com/blog/top-10-mcp-servers-for-claude-code/)
- [Claude Code as an MCP Server: Setup and Real-World Usage](https://www.ksred.com/claude-code-as-an-mcp-server-an-interesting-capability-worth-understanding/)
- [Best MCP Servers for Claude Code](https://mcpcat.io/guides/best-mcp-servers-for-claude-code/)

---
*Last reviewed: 2026-02-07*
