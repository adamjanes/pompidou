# Everything Claude Code

| Field | Value |
|-------|-------|
| **GitHub** | [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) |
| **Stars** | 41,300 |
| **Last Commit** | Active (2026) |
| **Install** | `/plugin marketplace add affaan-m/everything-claude-code` then `/plugin install everything-claude-code@everything-claude-code` |
| **Status** | Watching |
| **Category** | Execution |
| **Holy Grail Phase** | 3-Run |

## What It Does

Everything Claude Code is a production-ready collection of 12 agents, 16+ skills, 30+ commands, hooks, and MCP configurations evolved over 10+ months of daily intensive use. It is the most comprehensive single plugin for Claude Code, covering planning, TDD, code review, security, build fixing, and multi-language support (TypeScript, Python, Go, Java). It also includes a "Continuous Learning v2" system that auto-extracts patterns from sessions for reuse across projects.

## How It Works

### Agents (12 total)
- Planning and architecture specialists
- TDD and testing specialists
- Code review and security reviewers
- Build error resolvers
- Language-specific reviewers (Go, Python, database)

### Skills (16+)
Workflow definitions covering coding standards, backend/frontend patterns, testing methodologies, security reviews, and the continuous learning system.

### Commands (30+)
Slash commands for quick execution:
- `/plan` -- Create implementation plans
- `/tdd` -- Enter test-driven development mode
- `/code-review` -- Trigger multi-perspective code review
- `/build-fix` -- Resolve build errors systematically
- Language-specific variants for Go, Python, etc.

### Continuous Learning v2
"Instinct-based learning with confidence scoring" that auto-extracts patterns from sessions. Learnings persist and inform future sessions, creating a compounding knowledge base. The `/skill-create` command analyzes git history to extract patterns.

### MCP Configurations
Pre-configured integrations for GitHub, Supabase, Vercel, and Railway.

### Installation Note
Rules (language-specific configs in `rules/common/` and stack-specific folders) **cannot** be distributed via plugins due to an upstream Claude Code limitation. They must be manually copied to `~/.claude/rules/`. Hooks auto-load by convention; explicit declaration causes duplicate detection errors.

## Evaluation

### Strengths
- Most comprehensive single plugin available -- agents, skills, commands, hooks, and MCP configs in one package
- Battle-tested over 10+ months of daily production use
- Multi-language support means it works across our entire stack
- Continuous Learning system creates compounding value over time
- Cross-platform (Windows, macOS, Linux) with auto-detection of package managers
- Massive community (41K stars, 5K+ forks)

### Weaknesses
- Rules require manual installation (cannot ship via plugin) -- adds friction to setup
- Hooks auto-load by convention, which can cause duplicate detection errors if misconfigured
- Breadth over depth: 30+ commands and 16+ skills may overlap or conflict with other plugins
- No clear documentation on which skills/agents activate in which contexts
- Requires Claude Code CLI v2.1.0+ (version pinning)

### Community Sentiment
Very popular (41K stars). The breadth of the collection is its main selling point -- users adopt it as a one-stop-shop rather than assembling individual tools. Criticism tends to focus on the manual rules installation step and the sheer size of the configuration.

### Compared To
- **Superpowers**: More focused on structured methodology (brainstorm-plan-execute-review). Everything Claude Code is broader but less opinionated about workflow sequence.
- **Compound Engineering**: Similar learning-from-sessions philosophy, but Compound Engineering is more focused on the four-phase cycle. Everything Claude Code bundles more utilities.
- **Individual tools (TDD Guard, etc.)**: Everything Claude Code includes TDD, security review, and more in one package, but individual tools may have deeper implementations.

## Our Usage

**Plan:** Evaluate as a potential replacement for assembling individual plugins. The main appeal is getting 12 agents, 16 skills, and 30 commands in one install rather than configuring each separately. Specifically:

- The continuous learning system aligns with our goal of Ralph loops improving over time
- Pre-configured MCP setups for GitHub and Supabase match our stack
- Multi-language support covers TypeScript (most projects) and Python (scripts)

**Concerns:** The breadth may conflict with Superpowers (overlapping planning/TDD commands). Need to test whether both can coexist or if we pick one. The manual rules installation step is friction for bootstrapping new projects.

**Next step:** Install on a test project and inventory which agents/skills/commands actually activate. Compare overlap with Superpowers to determine if they complement or conflict.

## Sources

- [GitHub Repository](https://github.com/affaan-m/everything-claude-code)

---
*Last reviewed: 2026-02-06*
