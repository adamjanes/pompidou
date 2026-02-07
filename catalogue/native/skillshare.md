# skillshare

| Field | Value |
|-------|-------|
| GitHub | [runkids/skillshare](https://github.com/runkids/skillshare) |
| Stars | 353 |
| Last Commit | 2026-02-07 |
| Install | `curl -fsSL https://raw.githubusercontent.com/runkids/skillshare/main/install.sh \| sh` |
| Status | Watching |
| Category | native |
| Holy Grail Phase | Supporting |
| Score | **3.85** |

## What It Does

skillshare is a cross-CLI skill synchronization tool that maintains one source of truth for AI agent skills and syncs them across Claude Code, OpenClaw, OpenCode, Cursor, and 40+ other AI CLI tools using symlinks (macOS/Linux) or NTFS junctions (Windows). It provides bidirectional sync, cross-machine propagation via git, project-level skills, organization-wide sharing with tracked repos, and a built-in skill that teaches AI agents how to operate skillshare directly.

## How It Works

**Architecture:**
- Source directory at `~/.config/skillshare/skills/` (git-backed)
- Symlinks to target CLI skill directories (e.g., `~/.claude/skills/`)
- Per-skill symlinks preserve CLI-specific skills during merge

**Key Commands:**
```bash
skillshare init              # Auto-detect CLIs, setup git
skillshare sync              # Sync source to all targets
skillshare collect <target>  # Pull skills from target back to source
skillshare push/pull         # Cross-machine sync via git
skillshare install <repo>    # Install from GitHub or local path
skillshare search <query>    # GitHub skill discovery
```

**Modes:**
- **Global skills** (`~/.config/skillshare/skills/`) — user-level, git-backed
- **Project skills** (`.skillshare/skills/`) — committed to repo, auto-detected
- **Organization skills** — tracked repos with nested namespacing

**AI Integration:**
The built-in `skillshare` skill lets agents manage skills via natural language:
```
User: "sync my skills to all targets"
AI: [reads skillshare skill, runs: skillshare sync]
```

## Evaluation

### Strengths
- **Zero-friction sync** — one command syncs skills across all AI CLI tools
- **Bidirectional workflow** — create in Claude, collect back, share with others
- **Cross-machine built-in** — git-backed source means `git push/pull` syncs everywhere
- **Team-friendly** — organization repos + project-level skills enable team sharing
- **AI-native** — built-in skill teaches agents to self-manage
- **Non-destructive merge** — preserves CLI-specific skills during sync
- **Well-documented** — comprehensive docs site, clear examples, FAQ

### Weaknesses
- **Manual first sync** — requires running `init` to set up symlinks
- **Symlink reliance** — accidental deletion via symlink can corrupt source (mitigated by git)
- **No conflict resolution UI** — duplicate skill names across org repos just warn
- **Windows setup** — NTFS junctions work but less tested than Unix symlinks
- **Namespace collisions** — nested org skills flatten to `org__team__skill`, could collide

### Community Sentiment

From the [Show HN thread](https://news.ycombinator.com/item?id=46693056), users appreciate the problem it solves:
- *"Finally a way to manage shared skills long-term across different environments"*
- Active integration examples: [ai-hooks-integration](https://github.com/runkids/ai-hooks-integration) shows cross-tool hook syncing
- Featured in [Medium walkthrough](https://medium.com/@markchen69/claude-code-has-a-skills-marketplace-now-a-beginner-friendly-walkthrough-8adeb67cdc89) on Claude Code marketplace ecosystem
- Active development: last commit Feb 7, 2026, responsive maintainer

The tool addresses a real pain point in the multi-AI-CLI world: skill drift across tools and machines.

### Compared To

- **VoltAgent/awesome-agent-skills** — Curated list, not a sync tool
- **Claude Code Skills Marketplace** — Discovery only, no cross-CLI sync
- **Manual copying** — Error-prone, no bidirectional flow, no git history

skillshare is the only tool providing automated, bidirectional, git-backed skill sync across multiple AI CLI ecosystems.

## Our Usage

**Status: Watching** — not currently installed, but useful for future multi-CLI scenarios.

**Rationale:**
- Adam currently uses Claude Code exclusively, so cross-CLI sync isn't needed yet
- Project-level skills (`.skillshare/skills/`) could be useful for client repos
- Organization skills valuable if onboarding Ralph or team members to shared workflows
- AI-native skill management aligns with orchestrator pattern

**When to revisit:**
- When adding OpenClaw, Codex, or other AI CLIs to the stack
- When client repos need shared skill definitions
- When building organization-wide skill libraries for agents

**Configuration (if adopted):**
```bash
# Install
curl -fsSL https://raw.githubusercontent.com/runkids/skillshare/main/install.sh | sh

# Initialize (auto-detects Claude Code)
skillshare init

# Sync global skills
skillshare sync

# Project-level skills (per repo)
cd client-repo
skillshare init -p
skillshare install anthropics/skills/skills/pdf -p
```

## Scoring

| Criterion | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| Holy Grail alignment | 3.5/5 | 30% | 1.05 |
| Simplicity | 4/5 | 20% | 0.80 |
| Community trust | 4/5 | 15% | 0.60 |
| Ecosystem fit | 4/5 | 15% | 0.60 |
| Cost efficiency | 5/5 | 10% | 0.50 |
| Maturity | 3/5 | 10% | 0.30 |
| **Total** | | | **3.85** |

**Holy Grail alignment (3.5/5):** Supporting infrastructure for skill management across agents. Not directly tied to a phase but enables orchestrator pattern when using multiple AI CLIs.

**Simplicity (4/5):** Single binary, one-command install, auto-detection of CLIs. Symlink model is elegant but requires understanding.

**Community trust (4/5):** Active GitHub, responsive maintainer, honest documentation with tradeoffs explained, no inflated claims.

**Ecosystem fit (4/5):** Works with Claude Code and all major AI CLIs. Git-native aligns with our workflow. AI-native skill teaches agents to self-manage.

**Cost efficiency (5/5):** Pure CLI tool, no API costs, no infrastructure. Symlinks add zero overhead.

**Maturity (3/5):** Relatively new (v0.9.0), but stable API, good docs, active development. Windows support is newer and less battle-tested.

## Sources

- [GitHub: runkids/skillshare](https://github.com/runkids/skillshare)
- [Show HN: Skillshare](https://news.ycombinator.com/item?id=46693056)
- [skillshare.runkids.cc (Docs)](https://skillshare.runkids.cc)
- [Medium: Claude Code Skills Marketplace Walkthrough](https://medium.com/@markchen69/claude-code-has-a-skills-marketplace-now-a-beginner-friendly-walkthrough-8adeb67cdc89)
- [GitHub: ai-hooks-integration example](https://github.com/runkids/ai-hooks-integration)

---
*Last reviewed: 2026-02-07*
