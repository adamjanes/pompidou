# claude-cmd

| Field | Value |
|-------|-------|
| GitHub | [kiliczsh/claude-cmd](https://github.com/kiliczsh/claude-cmd) |
| Stars | 279 |
| Last Commit | 2026-01-30 |
| Install | `npm install -g claude-cmd@latest` |
| Status | Evaluated |
| Category | native |
| Holy Grail Phase | Supporting |
| Score | **3.65** |

## What It Does

A lightweight (46kB) CLI tool for managing Claude Code commands, configurations, and workflows with interactive menus. Provides command discovery (184+ commands), CLAUDE.md management, security profiles, and MCP server configuration through a centralized interface.

## How It Works

**Interactive Mode:**
- Run `claude-cmd` for an interactive menu system
- Browse and install commands from online repositories (184+ available)
- Create project-specific CLAUDE.md files from templates
- Configure security profiles (strict/moderate/permissive)
- Manage MCP servers and settings

**CLI Mode:**
```bash
claude-cmd list                    # List installed commands
claude-cmd search git              # Search remote commands
claude-cmd install git-helper      # Install a command
claude-cmd --local search api      # Search local repository
```

**File Structure:**
```
~/.claude/
├── commands/           # Installed commands
├── settings.json       # Global config
└── CLAUDE.md          # Global instructions

Project:
├── CLAUDE.md          # Project-specific
├── CLAUDE.local.md    # Local overrides (gitignored)
└── .claude/           # Project configs
```

## Evaluation

### Strengths
- **Command marketplace** — 184+ community commands with search/install
- **Zero dependencies** — Lightweight at ~46kB
- **Hierarchical config** — Global → project → local overrides
- **Security management** — Built-in permission profiles
- **Template system** — Quick project initialization (Node.js, React, Python, etc.)
- **MCP integration** — List and manage MCP servers
- **Active maintenance** — Recent commits (Jan 2026)

### Weaknesses
- **Overlaps with native skills** — Claude Code already supports `.claude/commands/`
- **Not git-first** — Commands stored in `~/.claude/` instead of per-repo
- **Marketplace lock-in** — 184 commands hosted externally, not versioned with projects
- **No command validation** — Doesn't verify command compatibility before install
- **Interactive mode friction** — GUI-style menus break scriptability

### Community Sentiment

**Homebrew listing:** Available via `brew install claude-cmd`, indicating some adoption.

**Tutorial coverage:** Blog post (August 2025) covers setup and features, but no strong user testimonials or reviews found.

**GitHub activity:** 19 forks, steady updates through Jan 2026 — signs of healthy maintenance but modest community size.

**No HN/Reddit discussion** found — tool hasn't gained significant mindshare in AI dev communities yet.

### Compared To

**vs. Native `.claude/commands/`**
- Native approach: Commands checked into each project repo, versioned with code
- claude-cmd: Global command marketplace, shared across all projects
- **Trade-off:** Convenience vs. reproducibility

**vs. skillshare ([native/skillshare.md](skillshare.md))**
- skillshare: Share commands via GitHub, pull into project
- claude-cmd: Centralized marketplace with 184+ curated commands
- **Trade-off:** Curation vs. flexibility

**vs. ccexp ([native/ccexp.md](ccexp.md))**
- ccexp: Export entire Claude Code setups for sharing
- claude-cmd: Install individual commands from catalog
- **Trade-off:** Full environment vs. à la carte

## Our Usage

**Not chosen** — while claude-cmd offers a polished command marketplace experience, it conflicts with our git-first, project-scoped approach.

**Why not:**
1. **Global state problem** — Commands in `~/.claude/` aren't versioned with projects
2. **Reproducibility gap** — Another dev cloning a project won't get the same command set
3. **Overlaps native features** — Claude Code already supports `.claude/commands/` per-project
4. **Marketplace dependency** — 184 commands hosted externally, could disappear
5. **Not markdown-native** — Interactive menus don't compose with automation

**What we use instead:**
- `.claude/commands/*.md` checked into each project repo
- `~/.claude/skills/` for global, reusable documentation (e.g., Apify, Fathom)
- Direct file creation instead of templates (more explicit, less magic)

**When it might fit:**
- Solo developers who prefer curated marketplaces over manual curation
- Teams wanting a standardized command library without git overhead
- Exploratory work where trying many commands is valuable

## Sources

- [README](https://github.com/kiliczsh/claude-cmd)
- [NPM Package](https://www.npmjs.com/package/claude-cmd)
- [Homebrew Formula](https://formulae.brew.sh/formula/claude-cmd)
- [Blog: Manage Claude AI commands](https://www.blog.brightcoding.dev/2025/08/10/claude-cmd-manage-claude-ai-commands-and-configs-from-your-terminal/)
- [GitHub Repository](https://github.com/kiliczsh/claude-cmd)

---
*Last reviewed: 2026-02-07*
