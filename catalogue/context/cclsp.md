# cclsp (Claude Code LSP)

| Field | Value |
|-------|-------|
| GitHub | [ktnyt/cclsp](https://github.com/ktnyt/cclsp) |
| Stars | 556 |
| Last Commit | 2026-02-06 |
| Install | `npx cclsp@latest setup` or `npm install -g cclsp` |
| Status | Watching |
| Category | context |
| Holy Grail Phase | Supporting |

## What It Does

cclsp is an MCP server that bridges Language Server Protocol (LSP) capabilities into Claude Code, enabling symbol navigation, reference finding, and safe refactoring across entire codebases. It solves the "LLM position ambiguity" problem by intelligently trying multiple line/column combinations when Claude provides approximate positions, making LSP integration robust even when AI assistants count lines incorrectly.

## How It Works

**Setup:**
```bash
# Interactive setup wizard
npx cclsp@latest setup

# Auto-detects languages in your project
# Offers to install LSP servers (TypeScript, Python, Go, Rust, etc.)
# Creates .claude/cclsp.json configuration
# Optionally adds to Claude MCP automatically
```

**Configuration:**
```json
{
  "servers": [
    {
      "extensions": ["py", "pyi"],
      "command": ["pylsp"],
      "rootDir": ".",
      "restartInterval": 5  // Auto-restart every 5min (fixes pylsp performance degradation)
    },
    {
      "extensions": ["ts", "tsx", "js", "jsx"],
      "command": ["npx", "--", "typescript-language-server", "--stdio"],
      "rootDir": "."
    }
  ]
}
```

**MCP Tools Exposed:**
- `find_definition` — Jump to symbol definition by name and kind
- `find_references` — Locate all usages of a symbol across workspace
- `rename_symbol` — Refactor symbol names with dry-run preview or actual file modification
- `rename_symbol_strict` — Rename at specific position (when multiple symbols match)
- `get_diagnostics` — Pull errors, warnings, hints from LSP
- `restart_server` — Manually restart LSP servers (by extension or all)

**Robust position matching:**
Instead of failing when Claude says "line 45, character 10" but means "line 46, character 9", cclsp tries multiple nearby positions and returns all matching symbols. This makes LSP integration actually usable with LLMs.

**Symbol-based operations:**
```
Claude: Find definition of processRequest function
> cclsp.find_definition(symbol_name="processRequest", symbol_kind="function")
Result: src/handlers/request.ts:127:1

Claude: Rename getUserData to fetchUserProfile
> cclsp.rename_symbol(symbol_name="getUserData", new_name="fetchUserProfile")
Result: Modified 12 files, created .bak backups
```

## Evaluation

### Strengths
- **AI-friendly design** — Built for LLMs, not humans with precise position knowledge
- **Universal language support** — Works with any LSP server (TypeScript, Python, Go, Rust, C/C++, Ruby, PHP, Java, Swift, etc.)
- **Interactive setup wizard** — Auto-detects languages, shows install commands, configures MCP
- **Auto-restart for pylsp** — Solves known Python LSP performance degradation issue
- **Dry-run mode** — Preview refactors before applying
- **Backup files** — Creates `.bak` before rename operations
- **Symbol-based not position-based** — More reliable than "go to line X"
- **Active maintenance** — Commits within last 24 hours, responsive to issues

### Weaknesses
- **LSP servers required** — You must install language servers separately (not bundled)
- **Learning curve** — Understanding LSP server configs (initializationOptions, etc.) takes time
- **Performance** — Some LSP servers (pylsp) degrade over hours, need auto-restart workaround
- **Limited to LSP capabilities** — Can't do cross-language refactors or semantic analysis beyond what LSP provides
- **Bun/Node dependency** — Requires Node.js 18+ runtime
- **Symbol ambiguity** — When multiple symbols match, requires strict mode with specific position

### Community Sentiment

**Strong positive reception:** Featured on Hacker News ([Claude Code gets native LSP support](https://news.ycombinator.com/item?id=46355165)) with developers praising the semantic understanding upgrade.

> "With native LSP integration, Claude Code can now see your project the same way your IDE does — symbols, definitions, references, types, diagnostics, and all. This is not a cosmetic upgrade - it's a shift from pattern-matching to semantic understanding." — [Medium: How Claude Code's New LSP Support Changes the Way You Debug](https://medium.com/algomart/how-claude-codes-new-lsp-support-changes-the-way-you-debug-navigate-and-understand-code-d9649eb6dd33)

**Production guides:** Multiple walkthrough guides published in 2026 for Windows, C#, and cross-platform setups. Featured in [MCP Market](https://mcpmarket.com/server/cclsp) as recommended LSP integration.

**Developer testimonials:**
> "LSP integration uses less tokens and allows the agent to understand code more semantically, enabling better refactors by seeing actual usages and references and function calls, instead of guessing them by grep." — [Medium: How I'm Using Claude Code LSP](https://medium.com/@joe.njenga/how-im-using-new-claude-code-lsp-to-code-fix-bugs-faster-language-server-protocol-cf744d228d02)

**Known issues:** GitHub issue #741 shows users requesting LSP integration before cclsp existed. Now that it's here, adoption is growing rapidly.

### Compared To

**vs. Native Claude Code LSP** — Claude Code 2.0.74+ has built-in LSP support, but it's "pretty raw" (still experimental). cclsp provides a more robust, battle-tested implementation via MCP.

**vs. [Context7](context7.md)** — Context7 focuses on embedding search and codebase intelligence. cclsp provides real-time LSP capabilities (definitions, references, diagnostics). Complementary tools.

**vs. Grep/Glob** — Grep finds text patterns. cclsp finds semantic symbols (respecting scope, imports, language rules). Much more accurate for refactoring.

**vs. IDE integration** — IDEs run LSP natively. cclsp brings LSP to CLI-based Claude Code sessions. Use cclsp when you're in terminal, IDE when you're in GUI.

## Our Usage

**Status: Watching.** Not chosen yet because we're evaluating whether native Claude Code LSP (2.0.74+) is sufficient, or if we need cclsp's robustness.

**Why we're interested:**
- Symbol-based navigation would reduce token waste from grepping entire files
- Safe refactoring with dry-run mode aligns with our verification workflows
- Auto-restart for pylsp solves known performance issues in Python projects
- Works across all our client codebases (TypeScript, Python, Ruby, PHP)

**Why we haven't installed it (yet):**
- Need to test native Claude Code LSP first (baseline)
- Uncertain if LSP adds meaningful value over Grep + human review
- Setup overhead across multiple projects (each needs `.claude/cclsp.json`)
- LSP server installation required on Ralph (Mac Mini)

**Re-evaluate if:**
- We start doing large-scale refactors (symbol renaming, API changes)
- Native Claude Code LSP proves insufficient
- We need diagnostics integration for pre-commit validation
- Client projects grow beyond 50k lines (where Grep becomes slow)

**Installation pattern (if we adopt it):**
```bash
# On Ralph (Mac Mini)
cd ~/fractional-first/talentflow
npx cclsp@latest setup --user  # Global config
# Select: TypeScript, Python, Ruby
# Auto-install LSP servers via wizard

# Add to .claude/settings.json
# MCP server: cclsp, env: CCLSP_CONFIG_PATH=~/.config/claude/cclsp.json

# Test with:
# "Find definition of createProfile function"
# "Show all references to API_BASE_URL"
# "Rename getUserData to fetchUserData (dry-run first)"
```

## Sources

- [GitHub Repository](https://github.com/ktnyt/cclsp)
- [LSP Integration Guide for Claude Code on Windows](https://gist.github.com/stanicio/7b64a1f7f947b4d8f87d774e5baae0c0)
- [Hacker News: Claude Code gets native LSP support](https://news.ycombinator.com/item?id=46355165)
- [Medium: How I'm Using Claude Code LSP to Code & Fix Bugs Faster](https://medium.com/@joe.njenga/how-im-using-new-claude-code-lsp-to-code-fix-bugs-faster-language-server-protocol-cf744d228d02)
- [MCP Market: cclsp](https://mcpmarket.com/server/cclsp)

---
*Last reviewed: 2026-02-07*
