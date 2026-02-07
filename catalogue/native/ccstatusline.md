# ccstatusline

| Field | Value |
|-------|-------|
| GitHub | [sirmalloc/ccstatusline](https://github.com/sirmalloc/ccstatusline) |
| Stars | 3,545 |
| Last Commit | 2026-02-07 |
| Install | `npx ccstatusline@latest` or `bunx ccstatusline@latest` (no global install needed) |
| Status | Evaluated |
| Score | 2.80 / 5.00 |
| Category | native |
| Holy Grail Phase | Supporting |

## What It Does

ccstatusline is a highly customizable status line formatter for Claude Code CLI that displays model info, git branch, token usage, session duration, block timer, current working directory, session cost, and 20+ other metrics in your terminal. It provides an interactive Terminal UI (built with React/Ink) for configuring multiple independent status lines with Powerline-style rendering, advanced color support (16-color, 256-color, truecolor), and built-in themes. Think of it as a dashboard for your Claude Code session — always visible at the bottom of your terminal, showing what matters most to you.

## How It Works

**Installation:**
```bash
# Run directly with npx (no global install)
npx ccstatusline@latest

# Or with Bun (faster)
bunx ccstatusline@latest

# Configure via interactive TUI
# Settings saved to ~/.config/ccstatusline/settings.json
```

**Key concepts:**
- **Multi-line support**: Configure multiple independent status lines (no line limit)
- **20+ widgets**: Model name, git branch/changes/worktree, session clock/cost, block timer, tokens (input/output/cached/total), context length/percentage, CWD, version, output style, terminal width, custom text, custom commands, separators, flex separators
- **Powerline mode**: Beautiful arrow separators, caps, and custom fonts
- **Global options**: Consistent formatting (padding, separators, bold, background, color overrides)
- **Custom commands**: Execute shell commands and display output (receives Claude Code JSON via stdin)
- **Raw value mode**: Strip labels for compact display (e.g., "Model: Claude 3.5 Sonnet" → "Claude 3.5 Sonnet")
- **Smart truncation**: Auto-truncate with ellipsis when terminal width is exceeded
- **Terminal width detection**: Full width always, full width minus 40 (for auto-compact message), or dynamic switching

**Workflow:**
1. Run `npx ccstatusline@latest` to launch TUI
2. Configure status lines: add/remove/reorder widgets, customize colors
3. Preview in real-time
4. Install to `~/.claude/settings.json` via TUI
5. Claude Code automatically uses ccstatusline for status line rendering

**Example widgets:**
- **Block Timer**: Shows time elapsed in current 5-hour block ("3hr 45m") or progress bar
- **Session Cost**: Displays total session cost in USD ("$1.23")
- **Current Working Directory**: Shows CWD with configurable segment display (e.g., ".../Personal/ccstatusline")
- **Custom Command**: Execute `npx -y ccusage@latest statusline` to integrate ccusage metrics

**Custom command example:**
```bash
# Widget: Custom Command
# Command: npx -y ccusage@latest statusline
# Timeout: 5000ms
# Preserve colors: true
# Receives Claude Code JSON via stdin, returns formatted output
```

**Configuration example** (`~/.claude/settings.json`):
```json
{
  "statusLine": "npx ccstatusline@latest"
}
```

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 2 | 0.60 |
| Simplicity | 20% | 3 | 0.60 |
| Community trust | 15% | 3 | 0.45 |
| Ecosystem fit | 15% | 3 | 0.45 |
| Cost efficiency | 10% | 4 | 0.40 |
| Maturity | 10% | 3 | 0.30 |
| **Composite** | | | **2.80** |

### Strengths
- No global installation required — run directly with `npx` or `bunx`
- Interactive TUI makes configuration accessible without editing JSON
- 20+ widgets provide comprehensive session visibility (tokens, costs, git, context, CWD)
- Powerline support with custom fonts and themes for aesthetic status lines
- Custom command widget enables integration with other tools (ccusage, git, weather, etc.)
- Block timer helps track progress through 5-hour conversation blocks
- Session cost widget tracks spending in real-time (requires Claude Code 1.0.85+)
- Smart truncation prevents line wrapping in narrow terminals
- Cross-platform: Works on macOS, Linux, and Windows (PowerShell, Command Prompt, WSL)
- Windows-specific optimizations: handles drive letters, UNC paths, CRLF line endings

### Weaknesses
- Does not integrate with Holy Grail phases — purely cosmetic, no automation or task management
- Status line complexity can be overwhelming (20+ widget types, Powerline mode, global options)
- Custom command timeouts can delay status line rendering (default 1000ms)
- VSCode integrated terminal color issues due to contrast ratio enforcement (requires manual setting adjustment)
- Block timer calculations require accurate transcript timestamps (may be inaccurate with `/resume`)
- Session cost may not update properly when using `/resume` (Claude Code limitation)
- No built-in budget alerts or cost enforcement — just displays data
- Bun runtime recommended for faster startup (Node.js works but slower)

### Community Sentiment

ccstatusline has positive community reception with 3,545 stars and active development through February 2026. Users praise the interactive TUI and Powerline aesthetics — "finally, a status line that looks good and shows what I need." The custom command widget is highlighted as powerful, enabling integration with ccusage, git, and other CLI tools. Recent updates (v2.0.16 with fish-style path abbreviation, v2.0.15 block timer fixes, v2.0.14 remaining mode for context percentage, v2.0.12 emoji support, v2.0.11 unlimited status lines, v2.0.10 git worktree support, v2.0.8 powerline auto-alignment) show responsive maintenance and feature development. Windows support is comprehensive with detailed documentation for PowerShell, Command Prompt, and WSL. Some criticism around the learning curve for Powerline configuration and the need for Nerd Fonts. Listed on [ClaudeLog](https://claudelog.com/claude-code-mcps/ccstatusline/) and in [Awesome Claude Code](https://github.com/hesreallyhim/awesome-claude-code). Overall sentiment: highly customizable, great for power users who care about terminal aesthetics, potentially overkill for minimal setups.

### Compared To

- **Claude Code's default status line**: Shows model, tokens, and context. ccstatusline adds git info, session cost, block timer, CWD, and 15+ other widgets. Default is simpler; ccstatusline is comprehensive.
- **tweakcc** (`Piebald-AI/tweakcc`): Customizes Claude Code themes, thinking verbs, and other UI elements. ccstatusline focuses on status line only. tweakcc is broader; ccstatusline is deeper.
- **ccusage** (`catalogue/scheduling/ccusage.md`): CLI tool for usage tracking. ccstatusline integrates ccusage via custom command widget for in-terminal display. ccusage is data-focused; ccstatusline is presentation-focused.

## Our Usage

**Not currently chosen.** ccstatusline is useful for terminal aesthetics and session visibility, but:

1. **No Holy Grail integration** — Purely cosmetic. Doesn't automate tasks, notify Adam, or enforce budgets.
2. **Adam's workflow preference** — Adam typically reviews session output after completion (via OpenClaw Telegram notifications), not during interactive sessions. Status line is less valuable for autonomous Ralph loops.
3. **Complexity overhead** — 20+ widget types, Powerline configuration, global options add cognitive load for marginal benefit.

**Status: Evaluated, not chosen.** If Adam shifts to more interactive Claude Code sessions (local laptop vs Ralph Mac Mini), ccstatusline could be useful for real-time visibility. For now, OpenClaw notifications and post-session review are sufficient.

**Potential future use:**
- Install on Adam's local MacBook for interactive development sessions
- Use custom command widget to integrate ccusage for cost tracking
- Configure minimal status line: model name, session cost, block timer, git branch (avoid Powerline complexity)

## Sources

- [GitHub README](https://github.com/sirmalloc/ccstatusline)
- [ClaudeLog listing](https://claudelog.com/claude-code-mcps/ccstatusline/)
- [GitHub Issues](https://github.com/sirmalloc/ccstatusline/issues)
- [Pull Requests](https://github.com/sirmalloc/ccstatusline/pulls)

---
*Last reviewed: 2026-02-07*
