# Oh-My-ClaudeCode (OMC) Installation Guide

## Status

**Installation Method:** Claude Code Plugin (marketplace)

OMC cannot be installed via bash/CLI — it requires interactive Claude Code interface. This guide explains how to install it.

## Installation Steps

### Step 1: Open Claude Code
```bash
cd /Users/adamjanes/code/projects/pompidou
claude
```

### Step 2: Install via Plugin Marketplace
In the Claude Code interactive interface, run:

```
/plugin marketplace add https://github.com/Yeachan-Heo/oh-my-claudecode
/plugin install oh-my-claudecode
```

### Step 3: Setup OMC
After installation completes, run:

```
/oh-my-claudecode:omc-setup
```

This initializes OMC configuration with intelligent defaults.

### Step 4: Verify Installation
Test basic commands:

```
omc --version
omc help
omc stats
```

Or try a simple task:

```
autopilot: analyze project structure
```

## What Gets Installed

Once installed, OMC provides:

### Execution Modes (7 total)
| Mode | Speed | Use Case |
|------|-------|----------|
| **Autopilot** | Fast | Full autonomous workflows |
| **Ultrawork** | Parallel | Maximum parallelism |
| **Ralph** | Persistent | Tasks that must complete fully |
| **Ultrapilot** | 3-5x faster | Multi-component systems |
| **Ecomode** | Fast + 30-50% cheaper | Budget-conscious |
| **Swarm** | Coordinated | Parallel independent tasks |
| **Pipeline** | Sequential | Multi-stage processing |

### Magic Keywords
- `autopilot: [task]` — Full autonomous execution
- `ralph: [task]` — Persistence mode (ralph mode includes ultrawork)
- `ulw: [task]` — Maximum parallelism
- `eco: [task]` — Token-efficient execution
- `plan: [task]` — Planning interview
- `ralplan: [task]` — Iterative planning consensus

### Built-in Agents (32 total)
- Architecture, Research, Design, Testing, Data Science
- Smart model routing (Haiku → simple, Opus → complex)
- Automatic delegation to right agent

### Utilities
- `omc wait` — Rate limit management with auto-resume
- `omc stats` — Session analytics
- `omc cost` — Token usage tracking
- `omc doctor` — Diagnostic tools

## Configuration

After setup, OMC works with zero configuration. However, you can:

1. **Enable HUD statusline** — Real-time orchestration metrics
2. **Configure smart routing** — Custom model preferences
3. **Set up skill learning** — Extract patterns from sessions

All configured via:
```
/oh-my-claudecode:omc-config
```

## Integration with Pompidou Stack

OMC aligns with the Holy Grail 5-phase system:

| Phase | OMC Feature |
|-------|-------------|
| **Phase 1: Spec It** | `plan` keyword + Opus architect agent |
| **Phase 2: Task It** | Task decomposition in OMC → Beads integration |
| **Phase 3: Build It** | `autopilot` / `ultrapilot` modes |
| **Phase 4: Verify It** | Automatic CI validation before merge |
| **Phase 5: Learn It** | Skill extraction `/oh-my-claudecode:extract-skills` |

## Updating OMC

When new versions release:

```bash
cd /Users/adamjanes/code/projects/pompidou
claude

# In Claude Code interface:
/plugin install oh-my-claudecode
/oh-my-claudecode:omc-setup
```

If issues occur after update:

```
/oh-my-claudecode:doctor
```

## Requirements

- Claude Code CLI 2.1.33+ (installed: YES ✓)
- Claude Max/Pro subscription OR Anthropic API key
- Optional: tmux (for auto-resume daemon)

## Links

- GitHub: https://github.com/Yeachan-Heo/oh-my-claudecode
- Documentation: https://yeachan-heo.github.io/oh-my-claudecode-website
- Full Reference: https://github.com/Yeachan-Heo/oh-my-claudecode/blob/main/docs/REFERENCE.md

## Next Steps After Installation

1. **Test basic modes** in a simple project
2. **Enable skill learning** to accumulate patterns
3. **Configure smart routing** for your preferred models
4. **Set up rate limit daemon** (`omc wait --start`)
5. **Document Phase 3 execution** once verified on real task
