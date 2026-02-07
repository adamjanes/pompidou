# Claude Code Chat

| Field | Value |
|-------|-------|
| GitHub | [andrepimenta/claude-code-chat](https://github.com/andrepimenta/claude-code-chat) |
| Stars | 988 |
| Last Commit | 2025-12-06 |
| Install | `ext install claude-code-chat` or download .vsix from releases |
| Status | Watching |
| Score | **3.50** |
| Category | native |
| Holy Grail Phase | Supporting |

## What It Does

A VS Code extension that provides a beautiful chat interface for Claude Code, replacing command-line interactions with a graphical UI. Includes conversation history, checkpoint restoration, inline diff viewer, MCP server management, image/clipboard support, sidebar integration, slash commands modal, model selection (Opus/Sonnet/Default), and advanced AI modes (Plan First, Thinking modes).

## How It Works

**Architecture:** Acts as a bridge connecting the Claude Code CLI in your terminal to VS Code's UI. You still type prompts in VS Code's integrated terminal, but get graphical feedback and controls.

**Key features:**
- **Chat interface:** Real-time streaming responses, typing indicators, markdown with syntax highlighting, copy-to-clipboard
- **Checkpoint & session management:** Git-based backup system, restore to any previous state, automatic conversation saving, cost/token tracking
- **Inline diff viewer (v1.1+):** Full diff display in Edit/MultiEdit/Write messages, one-click VS Code diff editor, syntax highlighting
- **MCP server management (v1.0+):** Popular servers gallery, one-click install, custom server creation, cross-platform WSL support
- **Permissions system (v1.0+):** Interactive permission dialogs, "Always Allow" pattern matching, YOLO mode, workspace permissions
- **Image support (v1.0+):** Drag & drop images, clipboard paste (Ctrl+V), multiple image selection, organized storage in `.claude/claude-code-chat-images/`
- **Sidebar integration (v1.0+):** Native VS Code sidebar panel, smart panel management, activity bar integration
- **File integration:** Type `@` to search and reference workspace files, image attachments via file browser
- **Tool management:** Visual dashboard, real-time execution, process control, permission system
- **Slash commands:** Type `/` to access 23+ built-in commands (/agents, /cost, /config, /memory, /review), custom command support
- **Model selection:** Opus (deep reasoning), Sonnet (balanced), Default (configured), persisted across sessions
- **AI modes:** Plan First toggle, Thinking mode intensity levels (Think, Think Hard, Think Harder, Ultrathink)

**Keyboard shortcuts:**
- `Ctrl+Shift+C`: Open Claude Code Chat
- `Enter`: Send message
- `@`: Open file picker
- `/`: Open slash commands modal

**WSL configuration:** Enable WSL integration via VS Code settings (`claudeCodeChat.wsl.enabled`, `claudeCodeChat.wsl.distro`, `claudeCodeChat.wsl.nodePath`, `claudeCodeChat.wsl.claudePath`)

## Evaluation

### Strengths

- **Beautiful UI:** Polished chat interface, native theming, responsive design
- **Checkpoint restoration:** Instant undo to any previous state via Git-based backups, safe experimentation
- **Inline diff viewer:** See complete file changes directly in messages, one-click VS Code diff editor
- **MCP server management:** One-click install of popular servers, custom server creation, WSL compatibility
- **Image support:** Drag & drop, clipboard paste, multiple formats (PNG, JPG, JPEG, GIF, SVG, WebP, BMP)
- **Sidebar integration:** Native VS Code panel, activity bar, smart panel management
- **Permissions system:** Interactive dialogs, "Always Allow" pattern matching, YOLO mode for power users
- **File integration:** Type `@` to search workspace files, lightning-fast fuzzy search
- **Slash commands:** 23+ built-in commands accessible via `/` modal, session-aware execution
- **Model selection:** Easy switching between Opus/Sonnet/Default, preference persisted
- **AI modes:** Plan First toggle, configurable Thinking intensity
- **Active development:** Multiple major versions (v1.0, v1.1), feature-rich updates
- **Open source:** JavaScript, can customize and extend

### Weaknesses

- **130 open issues:** High number of unresolved issues suggests maintenance challenges
- **Last commit 2 months ago (2025-12-06):** Recent but not actively developed in Jan/Feb 2026
- **VS Code only:** Not available for JetBrains, Zed, or other editors
- **Requires terminal integration:** Still uses VS Code integrated terminal for actual Claude Code CLI, not pure GUI
- **Bridge complexity:** Adds layer between user and Claude Code, potential for UI/CLI state mismatch
- **WSL setup complexity:** Requires manual configuration of distro name, Node path, Claude path
- **No official endorsement:** Community project, not official Anthropic VS Code extension
- **JavaScript codebase:** May be harder to maintain than TypeScript for large extension
- **Unofficial license:** "Other" license, not standard MIT/Apache
- **Not in mainstream guides:** 988 stars, but not mentioned in major "Claude Code tools" lists

### Community Sentiment

Positive reception for UI improvements over terminal. VS Code marketplace description emphasizes "No terminal required" and "Beautiful chat interface." Users appreciate checkpoint restoration for safe experimentation. However, official Claude Code documentation recommends the official VS Code extension ("acts as a bridge," "native graphical interface"). A 2026 review noted: "Some great unofficial extensions have popped up in the community—the official tool is all about deep workflow integration, while the unofficial ones are about providing a familiar chat window."

### Compared To

- **Official Claude Code VS Code extension:** Official extension is "deep workflow integration" with review/edit plans, auto-accept edits, @-mention with line ranges, conversation history, multiple tabs. This tool is "familiar chat window" with checkpoints, MCP management, inline diffs, permissions. Different design philosophies.
- **Native Claude Code CLI:** CLI is minimal, fast, keyboard-driven. This tool adds GUI, mouse-driven controls, visual feedback. Trade-off: convenience vs speed.
- **Claude Desktop:** Claude Desktop has chat UI but no file editing integration. This tool bridges chat UI with VS Code file system.
- **Cursor/Windsurf:** Cursor/Windsurf have built-in AI chat. This tool brings Claude Code specifically into VS Code with checkpoints and MCP management.

## Our Usage

**Status: Watching** — Not installed yet.

**Why watching:**
- Interesting UI improvements: inline diffs, checkpoint restoration, MCP server management
- Sidebar integration could improve workflow vs terminal switching
- Permissions system (Always Allow, YOLO mode) addresses common friction
- Image support (drag & drop, clipboard paste) is convenient for visual context

**Why not chosen:**
- **Unofficial tool, uncertain maintenance:** 130 open issues, last commit 2 months ago, no recent activity
- **Official extension exists:** Anthropic provides official VS Code extension with different (possibly better) workflow integration
- **Bridge complexity:** Adds layer between user and Claude Code, potential for bugs/state mismatch
- **Not aligned with autonomous workflow:** This tool optimizes for Adam manually chatting in VS Code. Our goal is autonomous sessions (Ralph).
- **Checkpoint via Git is clever but risky:** Auto-creating Git commits could pollute repo history or conflict with actual commits
- **YOLO mode defeats security:** Skipping all permissions is convenient but dangerous for autonomous agents

**Potential use case:** If Adam prefers VS Code for interactive sessions (vs terminal), could use this for manual work while Ralph uses CLI for autonomous work. But official extension likely better for that.

**Decision deferred until:** We've tested official VS Code extension and can compare UX. Also until we know if Adam primarily works in VS Code or terminal.

## Sources

- [GitHub README](https://github.com/andrepimenta/claude-code-chat)
- [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=AndrePimenta.claude-code-chat)
- [Claude Code VS Code extension: A complete guide in 2025](https://www.eesel.ai/blog/claude-code-vs-code-extension)
- [Use Claude Code in VS Code - Claude Code Docs](https://code.claude.com/docs/en/vs-code)

---
*Last reviewed: 2026-02-07*
