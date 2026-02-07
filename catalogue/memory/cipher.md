# Cipher

| Field | Value |
|-------|-------|
| GitHub | [campfirein/cipher](https://github.com/campfirein/cipher) |
| Stars | 3,502 |
| Last Commit | Jan 2026 |
| Install | MCP server (configure in `.mcp.json`) |
| Status | Watching |
| Category | memory |
| Holy Grail Phase | Supporting |

## What It Does

Cipher is an open-source memory layer specifically designed for AI coding agents — Cursor, Codex, Claude Code, Windsurf, and others. It provides persistent memory via the Model Context Protocol (MCP), meaning any MCP-compatible coding tool can read from and write to the same memory store. The key differentiator is cross-tool compatibility: memories created in a Claude Code session are accessible from Cursor, and vice versa. This makes Cipher the "shared brain" for developers who use multiple AI coding tools, rather than being locked into one tool's memory system.

## How It Works

**Key concepts:**
- **MCP-based integration**: Cipher runs as an MCP server that coding agents connect to. Any tool that supports MCP (Claude Code, Cursor, Cline, etc.) can use Cipher without tool-specific plugins or hooks.
- **Persistent memory store**: Memories are stored locally and persist across sessions, tools, and projects. The memory layer is independent of any single coding agent's lifecycle.
- **Coding-agent-optimized**: Unlike general-purpose memory systems, Cipher is tuned for the types of context coding agents need — file patterns, architectural decisions, project conventions, debugging history, API patterns.
- **Read/write via MCP tools**: Agents interact with Cipher through MCP tool calls — storing context ("remember that we use Zod for validation in this project") and retrieving context ("what validation library does this project use?").

**Setup:**
```json
// .mcp.json
{
  "mcpServers": {
    "cipher": {
      "command": "npx",
      "args": ["-y", "@campfirein/cipher"]
    }
  }
}
```

**Workflow:**
1. Configure Cipher as an MCP server in your project or globally
2. Start a coding session in any MCP-compatible tool
3. The agent automatically has access to Cipher's memory via MCP tools
4. During work, the agent stores relevant context (decisions, patterns, preferences)
5. In future sessions — even with a different tool — stored memories are available
6. Memory accumulates over time, building a persistent project knowledge base

**Memory types:**
- Project conventions and patterns
- Architectural decisions and rationale
- Common errors and their fixes
- API patterns and integration details
- User preferences and coding style

## Evaluation

### Strengths
- Cross-tool compatible — the only memory solution that works across Claude Code, Cursor, Codex, Cline, and others via MCP
- MCP-based architecture is clean and standards-compliant — no tool-specific hooks or plugins needed
- Open source with solid adoption (3,502 stars) — indicates real community validation
- Designed specifically for coding agents — not a general-purpose memory system adapted for code
- Local storage — memories don't leave your machine
- Works at both project level (`.mcp.json`) and global level, providing flexibility

### Weaknesses
- MCP dependency — requires tools that support the Model Context Protocol. If a tool doesn't support MCP, Cipher is inaccessible.
- Less Claude Code-specific than claude-mem — claude-mem hooks into Claude Code's 5 lifecycle events for automatic capture. Cipher relies on the agent choosing to use MCP tools, which may be less reliable.
- Smaller community than claude-mem (3,502 vs 24,300 stars) — less momentum and fewer battle reports
- No automatic memory capture — unlike claude-mem's lifecycle hooks, Cipher depends on the agent explicitly deciding to store and retrieve memories
- No web viewer UI — claude-mem has a browsable web interface at localhost:37777. Cipher's memories are less inspectable.
- Retrieval quality depends on how well the agent formulates MCP queries

### Community Sentiment

Positive and growing, especially among developers who use multiple AI coding tools. The cross-tool angle is Cipher's standout value proposition — developers on Reddit describe it as "the Rosetta Stone for AI coding memory." Comparisons to claude-mem are constant, with the community split: claude-mem fans value the deep Claude Code integration and automatic capture, while Cipher advocates value the tool-agnostic approach. The MCP architecture gets praise from developers familiar with the protocol — "using an open standard instead of tool-specific hooks is the right long-term bet." Some concern about whether agents reliably use MCP memory tools without being explicitly prompted to do so.

### Compared To

- **claude-mem** (`catalogue/memory/claude-mem.md`): claude-mem is Claude Code-specific with 5 automatic lifecycle hooks, vector DB (Chroma) for semantic search, web viewer UI, and "Endless Mode." Much deeper integration with Claude Code but completely locked to one tool. Cipher trades depth for breadth — works across all MCP-compatible tools but with less automatic capture. claude-mem has 7x the stars (24,300 vs 3,502).
- **claude-brain (memvid)**: Uses a single portable video file for memory. Simpler architecture than both Cipher and claude-mem. No cross-tool support, no semantic search, but extremely portable.
- **OpenMemory**: Broader scope memory platform with external connectors (Notion, Slack, etc.). Heavier infrastructure, team-oriented. Cipher is developer-focused and local-first.
- **claude-supermemory**: Team-level shared memory for Claude Code. Different use case — collaboration vs individual memory. More infrastructure requirements.

## Our Usage

Watching. Cipher is the most interesting cross-tool memory solution in the ecosystem, but our current workflow is Claude Code-only, which makes claude-mem the higher-priority evaluation. Two scenarios where Cipher becomes the better choice:

1. **Multi-tool adoption**: If we start using Codex CLI or Gemini CLI alongside Claude Code (as ccmanager enables), Cipher becomes essential — a shared memory layer across all agents.
2. **MCP standardization**: If the MCP ecosystem matures and becomes the dominant integration pattern, building on Cipher (MCP-native) is a better long-term bet than claude-mem (Claude Code-specific hooks).

**Current priority order for memory evaluation:**
1. claude-mem — deeper Claude Code integration, evaluate first on frequency-first
2. Cipher — evaluate second if we diversify tools or if claude-mem proves unstable
3. claude-brain — evaluate as lightweight fallback if both prove too heavy

Monitor Cipher's development and community growth. The cross-tool bet becomes more compelling as the AI coding tool landscape fragments.

## Sources

- [GitHub: campfirein/cipher](https://github.com/campfirein/cipher)
- [awesome-claude-code](https://github.com/bwilliams-97/awesome-claude-code)
- [Reddit: r/ClaudeAI discussions](https://reddit.com/r/ClaudeAI)
- [Model Context Protocol documentation](https://modelcontextprotocol.io)

---
*Last reviewed: 2026-02-07*
