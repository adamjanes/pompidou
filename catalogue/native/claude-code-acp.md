# Claude Code ACP

| Field | Value |
|-------|-------|
| GitHub | [zed-industries/claude-code-acp](https://github.com/zed-industries/claude-code-acp) |
| Stars | 892 |
| Last Commit | 2026-02-07 |
| Install | `npm install -g @zed-industries/claude-code-acp` (or built-in to Zed) |
| Status | Watching |
| Score | **3.60** |
| Category | native |
| Holy Grail Phase | Supporting |

## What It Does

ACP (Agent Client Protocol) adapter that enables Claude Code to run from any ACP-compatible editor such as Zed, Neovim, Emacs, and JetBrains IDEs. Wraps Claude Code's official SDK and translates its interactions into ACP's JSON-RPC format, allowing developers to use Claude Code's full capabilities (context @-mentions, images, tool calls, permission requests, edit review, TODO lists, interactive terminals, slash commands, client MCP servers) directly from their preferred editor instead of the standalone CLI.

## How It Works

**Architecture:**
- **Protocol Bridge**: Implements ACP agent interface by using Claude Agent SDK internally. Receives JSON-RPC requests from ACP clients, translates to Claude Code SDK calls, returns responses in ACP format.
- **Process Model**: Claude Code runs as independent process, communicating with editor via stdio JSON-RPC. Editor stays in control; Claude Code is the agent.
- **Feature Parity**: Supports all Claude Code capabilities — context @-mentions, images, tool permissions, edit review (multibuffer in Zed), TODO lists, background terminals, slash commands, MCP servers.

**Installation:**
```bash
# Standalone (for non-Zed editors)
npm install -g @zed-industries/claude-code-acp

# Usage with ACP client
ANTHROPIC_API_KEY=sk-... claude-code-acp
```

**In Zed (built-in):**
1. Open Agent Panel
2. Click "+" button in top-right
3. Select "New Claude Code Thread"
4. Zed launches claude-code-acp automatically

**Features supported:**
- Context @-mentions: Reference files, directories, symbols from editor
- Images: Paste screenshots, diagrams into conversation
- Tool calls: File edits, shell commands, searches with permission prompts
- Following: Track cursor position, auto-update context
- Edit review: See diffs in multibuffer (Zed) before accepting
- TODO lists: Task tracking via TodoWrite tool
- Terminals: Interactive and background command execution
- Slash commands: Custom commands defined in `.claude/commands/`
- MCP servers: Client-side MCP servers (defined in editor config, not Claude Code)

**Editor compatibility:**
- Zed: Native support, latest version includes claude-code-acp out-of-box
- Neovim: Via ACP plugin (community)
- Emacs: Via ACP plugin (community)
- JetBrains: Via ACP plugin (community)
- Any editor implementing ACP client: See [agentclientprotocol.com](https://agentclientprotocol.com)

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 2 | 0.60 |
| Simplicity | 20% | 4 | 0.80 |
| Community trust | 15% | 5 | 0.75 |
| Ecosystem fit | 15% | 4 | 0.60 |
| Cost efficiency | 10% | 5 | 0.50 |
| Maturity | 10% | 4 | 0.40 |
| **Composite** | | | **3.60** |

### Strengths
- Editor choice freedom — use Claude Code from Vim, Emacs, VSCode, JetBrains without leaving your environment
- Official Zed partnership — maintained by Zed Industries, backed by Anthropic endorsement, Apache-2.0 license
- Full feature parity — supports all Claude Code capabilities (not a limited subset), including MCP servers, slash commands, edit review
- Open protocol standard — ACP is [open standard](https://agentclientprotocol.com) adopted by Neovim, Emacs, JetBrains. Not Zed-only.
- Clean architecture — uses official Claude Agent SDK internally, no reimplementation or forking of Claude Code logic
- Active development — last commit 2026-02-07, rapid iteration based on feedback
- Multibuffer edit review in Zed — see all changes across files before accepting, syntax highlighting, language server support
- Zero cost overhead — same token usage as standalone Claude Code CLI

### Weaknesses
- Requires editor ACP support — only works if your editor has ACP client implementation (limits adoption to supported editors)
- Zed gets priority — feature parity across all ACP editors depends on Zed's implementation; other editors may lag
- No Ralph loops in-editor — autonomous workflows (runCLAUDErun, claude-auto-resume) assume CLI environment, not clear how to run unattended from editor
- Session persistence tied to editor — closing editor closes Claude session (no background continuation)
- Documentation split — Claude Code docs focus on CLI; ACP docs focus on protocol. Editor-specific setup requires piecing together both.
- MCP server split brain — MCP servers defined in editor config (ACP client-side) vs `.mcp.json` (Claude Code CLI). Dual configuration for hybrid workflows.
- Limited adoption data — too new to know which editors will maintain ACP support long-term (Neovim/Emacs plugins are community-driven)

### Community Sentiment

Strong positive reception from Zed users who want Claude Code without leaving their editor. Zed's blog post ["Claude Code: Now in Beta in Zed"](https://zed.dev/blog/claude-code-via-acp) highlights the integration as "Claude Code running natively in Zed through Agent Client Protocol." Community notes it provides "the real Claude Code, not a knockoff" — official SDK, full feature set. Developers appreciate the multibuffer edit review: "finally, a way to see all Claude's changes at once before accepting." Some friction reported around MCP server configuration ("do I define it in Zed or .mcp.json?") but generally seen as solvable documentation issue. Neovim and Emacs adopters excited about [ACP adoption](https://zed.dev/blog/acp-progress-report) expanding to their editors. JetBrains integration still early. Overall sentiment: "if you live in Zed/Neovim/Emacs, this is a no-brainer; if you're CLI-first for automation, stick with standalone Claude Code."

### Compared To

- **Standalone Claude Code CLI** (`catalogue/native/`): CLI is for automation, scripting, Ralph loops, unattended execution. ACP is for interactive development in-editor. Complementary, not competing.
- **Cursor / Windsurf / Supermaven**: Editor-native AI assistants. These use proprietary protocols and non-Claude models (or Claude via vendor API). ACP uses official Claude Code via open protocol. Feature parity varies; Cursor/Windsurf have more polish but less transparency.
- **VSCode Continue extension**: Another in-editor AI assistant. Continue supports multiple models but doesn't use Claude Code SDK. ACP provides official Claude Code experience.
- **Zed AI (built-in)**: Zed's native AI panel predates Claude Code integration. Now Zed supports both: native AI for quick queries, Claude Code via ACP for complex tasks. ACP is more powerful (tool use, MCP, slash commands) but higher token cost.

## Our Usage

**Status: Watching** — Not installed, not blocking current workflow.

**Why watching:**
- **Editor-agnostic protocol is forward-thinking:** If ACP becomes standard, Adam could switch editors without losing Claude Code access
- **Zed Industries credibility:** Official partnership with Anthropic, actively maintained, well-documented
- **Multibuffer edit review is compelling:** Seeing all Claude changes across files before accepting reduces risk of blind auto-apply
- **Feature parity maintained:** Uses official SDK, not reimplementation, so updates flow from Anthropic

**Why not chosen:**
- **CLI-first workflow:** Adam's automation (Ralph loops, runCLAUDErun, claude-auto-resume) assumes standalone CLI, not in-editor sessions
- **Terminal is our editor:** Adam primarily works in terminal + VSCode for quick edits. Adding Zed/Neovim/Emacs introduces editor switching friction.
- **Session persistence mismatch:** Ralph loops run unattended overnight; in-editor sessions close when editor closes
- **MCP configuration split:** Defining MCP servers in both editor config and `.mcp.json` creates dual source of truth
- **Not essential for Holy Grail phases:** Phases 1-5 assume CLI execution, not in-editor workflows

**Potential future use:**
- **For client work in specific editor:** If Adam adopts Zed/Neovim full-time for a specific project, ACP becomes natural fit
- **Pair programming sessions:** When working interactively (not autonomously), in-editor Claude Code with multibuffer review is smoother than CLI + manual file checks
- **Prototyping before automation:** Use ACP in-editor for interactive exploration, then port successful patterns to CLI-based Ralph loops

**Decision criteria for adoption:**
- **Trigger:** Adam switches primary editor to Zed/Neovim/Emacs for daily work
- **Validation:** Test MCP server configuration split (editor config vs .mcp.json) to confirm no conflicts in hybrid workflows
- **Integration question:** Can Claude Code resume sessions started in-editor when editor closes? If yes, ACP becomes viable for overnight Ralph loops. If no, remains interactive-only.

## Sources

- [GitHub README](https://github.com/zed-industries/claude-code-acp)
- [Zed Blog: Claude Code: Now in Beta in Zed](https://zed.dev/blog/claude-code-via-acp)
- [Zed Blog: How the Community is Driving ACP Forward](https://zed.dev/blog/acp-progress-report)
- [Zed Docs: External Agents](https://zed.dev/docs/ai/external-agents)
- [Agent Client Protocol (official site)](https://agentclientprotocol.com)
- [Tessl Blog: Zed debuts Agent Client Protocol](https://tessl.io/blog/zed-debuts-agent-client-protocol-to-connect-ai-coding-agents-to-any-editor/)

---
*Last reviewed: 2026-02-07*
