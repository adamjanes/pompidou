# Sub-Agents Manager

| Field | Value |
|-------|-------|
| GitHub | [webdevtodayjason/sub-agents](https://github.com/webdevtodayjason/sub-agents) |
| Stars | 182 |
| Last Commit | 2026-02-06 |
| Install | `npm install -g @webdevtoday/claude-agents` |
| Status | Evaluated |
| Category | native |
| Holy Grail Phase | Supporting |

## What It Does

Sub-Agents Manager is a CLI tool that enhances Claude Code with 15+ specialized AI assistants (subagents) designed for specific development tasks — from automated code reviews and test fixing to intelligent debugging, documentation generation, API development, and marketing content. Each subagent is an expert in its domain, with pre-built agents installable via npm and custom agent creation support.

## How It Works

**Installation & Management:**
- Install globally via npm or from source
- `claude-agents init` sets up all agents in a project
- `--respect-context-forge` flag integrates with existing context-forge setups
- Agents install to `~/.claude/agents/` (user scope) or `.claude/agents/` (project scope)
- Commands placed in `.claude/commands/agents/` to avoid conflicts

**Agent Execution:**
- **Via slash commands:** `/review`, `/test`, `/debug`, `/api`, `/frontend`, etc.
- **Via CLI:** `claude-agents run <agent> --task "description"`
- **Via Task tool:** `Task("project-planner: analyze all PRPs")`
- Agents operate in isolated contexts with access to project files and tools

**Agent Types:**
- **Development:** code-reviewer, test-runner, debugger, refactor
- **Technical Writing:** doc-writer, api-documenter
- **Security:** security-scanner
- **UI/UX:** shadcn-ui-builder
- **Planning:** project-planner
- **Backend/Frontend:** api-developer, frontend-developer, tdd-specialist
- **DevOps:** devops-engineer
- **Product/Marketing:** product-manager, marketing-writer

**Hooks System:**
Agents can define hooks for automated workflows:
- `PostToolUse:Edit` — Triggers after file edits
- `PostToolUse:Write` — After file creation
- `PostToolUse:Bash` — After command execution
- `TaskComplete` — When agent finishes task
- `Stop` — On conversation end

**PRP Awareness (Context-Forge Integration):**
- Agents detect and work with existing PRPs (Project Requirement Plans)
- Append to CLAUDE.md without overwriting
- Understand project conventions from existing files

## Evaluation

### Strengths
- **15 production-ready agents** covering wide development lifecycle
- **Context-forge integration** — works alongside existing PRPs and CLAUDE.md files
- **Flexible installation** — user-global or project-specific scope
- **Hooks system** — enables automation (auto-review on edit, auto-test on commit)
- **npm distribution** — easy install, version management
- **Custom agent creation** — extend with project-specific agents
- **Independent execution** — can run outside Claude Code for scripting/automation
- **Web dashboard** — real-time monitoring and management (port 7842)
- **Active development** — v1.4.0 released 2026-02-06 with context-forge support
- **Strong community adoption** — multiple forks and derivatives on npm

### Weaknesses
- **Overlaps with native subagents** — Claude Code has built-in subagent support
- **Agent proliferation** — 15+ agents may be overwhelming; unclear which to use when
- **Hook complexity** — JSON hook configuration requires understanding of triggers and matchers
- **Documentation scattered** — hooks, PRP awareness, context-forge integration not well-consolidated
- **State management** — `.claude-agents.json` tracking adds another config file
- **Potential conflicts** — multiple agent systems (this + native) could create confusion
- **npm package issues** — past "agent not found" errors with global installations (fixed in v1.3.1)

### Community Sentiment

Recent feedback from developers using sub-agents for code review is **positive**:

- **Hamy.xyz (Feb 2026):** ["9 Parallel AI Agents That Review My Code"](https://hamy.xyz/blog/2026-02_code-reviews-claude-subagents) — "Suggestions are approximately 75% useful, which is much better than the <50% they saw previously. The feedback is generally pretty good - critical and high severity issues are almost always useful unless they're just out of scope and the medium/low severity issues are usually good ideas."

- **Multiple npm derivatives** — Community has forked into `@zamaz/claude-agents` and `@lsendel/claude-agents`, indicating strong interest and active extension.

- **VoltAgent awesome list** — [awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) lists 100+ specialized subagents, showing ecosystem growth.

**Concerns:**
- Setup complexity vs. native subagents (why install a package when Claude Code has it built-in?)
- Hook configuration requires JSON schema understanding
- Some users report installation path issues (though v1.3.1 addressed this)

### Compared To

| vs. Native Subagents | Sub-Agents Manager Advantage | Native Advantage |
|---------------------|------------------------------|------------------|
| Setup | npm install, pre-built agents | Zero setup, built-in |
| Agent Library | 15 production agents + custom | Create any agent in `.claude/agents/` |
| Hooks | JSON hook system (PostToolUse, etc.) | Built-in Claude Code hooks |
| Distribution | npm versioning, shareable | Git-committed `.claude/agents/` files |
| Execution | CLI + slash commands + Task tool | Slash commands + Task tool |

**When to use Sub-Agents Manager:**
- You want **pre-built agents** (code-reviewer, api-developer, etc.) without writing them
- You need **hooks automation** (auto-review on edit, auto-test on save)
- You want **npm versioning** for agent updates
- You prefer **centralized management** via CLI

**When to use Native Subagents:**
- You want **zero external dependencies**
- You prefer **Git-based distribution** (commit `.claude/agents/` to repo)
- You want **full control** over agent definitions
- You're already using Claude Code's built-in features

## Our Usage

**Status: Evaluated, Not Chosen**

**Why we're not using it:**
1. **Native subagents are sufficient** — Claude Code's built-in subagent support (see [native/subagents.md](subagents.md)) covers our needs without npm dependencies
2. **We prefer orchestrator pattern** — Our CLAUDE.md workflow (root + project-level) uses native agents committed to Git (see `~/.claude/agents/` and `.claude/agents/`)
3. **Hooks are overkill** — We use Claude Code's native hooks system (`.claude/hooks/`) which is simpler
4. **Avoid package lock-in** — npm dependencies add another layer; we prefer portable `.md` files

**Potential future use:**
- If we need **pre-built specialized agents** (e.g., api-documenter, security-scanner), this is a good source
- **Code review parallelization** — Hamy's "9 parallel agents" pattern is interesting for PR reviews
- **Marketing/product agents** — product-manager and marketing-writer agents could be useful for client work

**Key takeaway:** This is a **well-executed npm package** for teams that want **pre-built agents and hooks automation**. For our setup (Git-based, native subagents, CLAUDE.md cascade), it's **redundant but worth watching** for specific agent implementations we can port to native format.

## Sources

- [README](https://github.com/webdevtodayjason/sub-agents)
- [9 Parallel AI Agents That Review My Code](https://hamy.xyz/blog/2026-02_code-reviews-claude-subagents)
- [Supercharge Claude Code: Custom Commands + Sub Agents](https://www.thetoolnerd.com/p/supercharge-claude-code-custom-commands-thetoolnerd)
- [A Guide to Claude Code 2.0 and getting better at using coding agents](https://sankalp.bearblog.dev/my-experience-with-claude-code-20-and-how-to-get-better-at-using-coding-agents/)
- [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents)

---
*Last reviewed: 2026-02-07*
