# claude-code-sandbox

| Field | Value |
|-------|-------|
| GitHub | [textcortex/claude-code-sandbox](https://github.com/textcortex/claude-code-sandbox) |
| Stars | 289 |
| Last Commit | 2026-02-05 |
| Install | `npm install -g @textcortex/claude-code-sandbox` |
| Status | Watching |
| Category | execution |
| Holy Grail Phase | 3-Run |
| Score | **3.60** |

## What It Does

claude-code-sandbox runs Claude Code in isolated Docker containers with automatic GitHub integration, bypassing all permissions safely via `--dangerously-skip-permissions`. It creates a new git branch per session, monitors for commits made by Claude, displays interactive diffs with syntax highlighting, prompts for push/PR creation, and provides a browser-based terminal at `localhost:3456` for async monitoring. Containers are truly isolated (files copied, not mounted) with credentials forwarded securely (read-only mounts) and optional custom setup commands.

## How It Works

**Architecture:**
```
Host project → Docker container (Ubuntu + Claude Code) → Auto-branch → Monitor commits → Interactive review
                  ↓
            Browser terminal (localhost:3456) or terminal attach
```

**Container Environment:**
- Ubuntu 22.04 base image
- Git, GitHub CLI, Node.js, Python 3, Claude Code (latest)
- Files **copied** into container (not mounted) — true isolation
- Credentials mounted read-only: `~/.claude/`, `~/.codex/`, `~/.gitconfig`, `~/.config/ralphex/`
- Network access: Full (required for Claude API)
- Privileges: Non-root user, no elevated capabilities

**Workflow:**
1. **Start:** `claude-sandbox` (or `claude-sandbox start`)
   - Creates branch `claude/[timestamp]` (or specify with `-b`)
   - Starts container with Claude Code + `--dangerously-skip-permissions`
   - Launches web UI at `localhost:3456` (auto-opens browser)
   - Optional: attach to terminal directly with `--no-web`

2. **Interact:** Ask Claude to implement features, fix bugs, run tests
   - Claude executes commands instantly (no approval prompts)
   - Makes code changes autonomously
   - Commits changes (monitored by host)

3. **Review:** When Claude commits:
   - Real-time notification appears in terminal/web UI
   - Full diff displayed with syntax highlighting
   - Interactive menu:
     - Continue working
     - Push branch to remote
     - Push branch and create PR
     - Exit

4. **Cleanup:** Container stops, files preserved in branch

**Commands:**
```bash
claude-sandbox                 # Start new container (web UI, default)
claude-sandbox start -n main-dev --no-web  # Terminal attach mode
claude-sandbox attach          # Interactive selector, or specify container ID
claude-sandbox list            # Show running containers
claude-sandbox stop [id]       # Stop specific or all (--all)
claude-sandbox logs [id] -f    # Follow logs
claude-sandbox clean           # Remove stopped containers
claude-sandbox config          # Show current config
```

**Configuration** (`claude-sandbox.config.json`):
```json
{
  "dockerImage": "claude-code-sandbox:latest",
  "dockerfile": "./custom.Dockerfile",
  "detached": false,
  "autoPush": true,
  "autoCreatePR": true,
  "autoStartClaude": true,
  "envFile": ".env",
  "environment": { "NODE_ENV": "development" },
  "setupCommands": ["npm install", "npm run build"],
  "mounts": [
    { "source": "./data", "target": "/workspace/data", "readonly": false },
    { "source": "/home/user/configs", "target": "/configs", "readonly": true }
  ],
  "allowedTools": ["*"],
  "maxThinkingTokens": 100000,
  "bashTimeout": 600000,
  "containerPrefix": "my-project",
  "claudeConfigPath": "~/.claude.json"
}
```

**Mount Configuration:**
- `source` — host path (relative to CWD or absolute)
- `target` — container path (relative to /workspace or absolute)
- `readonly` — optional boolean (default: false)

**Podman Support:**
Auto-detects Docker or Podman. Set `dockerSocketPath` in config or `DOCKER_HOST` env var to override.

**Credential Discovery (automatic):**
- Claude: `ANTHROPIC_API_KEY`, macOS Keychain, AWS Bedrock, Google Vertex, `.claude.json`, `~/.claude/`
- GitHub: `gh auth`, `GITHUB_TOKEN`, `GH_TOKEN`, `.gitconfig`

## Evaluation

### Strengths
- **True isolation** — files copied, not mounted. Claude can only access project, not host system.
- **Zero approval prompts** — `--dangerously-skip-permissions` safe in container
- **Browser-based terminal** — monitor Claude's work while doing other tasks
- **Automatic credential forwarding** — discovers and mounts credentials securely (read-only)
- **Multi-container support** — run multiple Claude instances simultaneously (`-n` flag)
- **Interactive commit review** — syntax-highlighted diffs, push/PR prompts
- **Custom setup commands** — run `npm install`, build steps, etc. before Claude starts
- **Podman compatible** — auto-detects, no Docker-lock-in
- **Active development** — 289 stars, last commit Feb 5, 2026

### Weaknesses
- **Alpha software** — README warns: *"This work is alpha and might have security issues, use at your own risk"*
- **No session persistence** — stopping container loses uncommitted work
- **Single-session isolation only** — doesn't help with multi-repo coordination
- **Docker overhead** — heavier than native Ralph loops (image build, container startup)
- **Network access unrestricted** — full network access required for Claude API (can't restrict)
- **Manual PR creation** — requires user intervention (though auto-prompt makes it easy)
- **No built-in notifications** — commit review is interactive, not async alerting
- **README TODOs** — [TODO.md](https://github.com/textcortex/claude-code-sandbox/blob/main/TODO.md) lists incomplete features

### Community Sentiment

From web search and GitHub:
- [Docker Blog (2026)](https://www.docker.com/blog/docker-sandboxes-run-claude-code-and-other-coding-agents-unsupervised-but-safely/): *"Allowing `/var/run/docker.sock` gives the sandboxed process full Docker API access, which effectively means host system access. Only allow Unix sockets you fully understand and trust."*
- [Claude Code Docs: Sandboxing](https://code.claude.com/docs/en/sandboxing): Official recognition of sandboxing need
- [Docker Docs: Configure Claude Code](https://docs.docker.com/ai/sandboxes/claude-code/): Docker's official integration guide
- [claudefa.st blog (2026)](https://claudefa.st/blog/guide/sandboxing-guide): *"Community-built sandbox environments run Claude Code inside Docker containers, providing isolation between the AI agent and your main system while still allowing Claude Code to operate with full autonomy."*
- [codewithandrea.com](https://codewithandrea.com/articles/run-ai-agents-inside-devcontainer/): Guide on running AI agents (Cursor, Claude Code) inside DevContainers for safety

**Alternatives:**
- **ralphex Docker mode** — similar isolation approach, but focused on plan execution
- **Native Docker sandboxing** — DIY setup without textcortex wrapper
- **DevContainers** — VS Code integration for containerized dev environments

claude-code-sandbox is the most polished npm-installable solution for sandboxed Claude Code execution.

### Compared To

- **ralphex (Docker mode)** — Plan execution focus, multi-phase review. claude-code-sandbox is more general-purpose.
- **Oh My ClaudeCode** — Native Ralph loop, no isolation. claude-code-sandbox adds Docker safety layer.
- **DevContainers** — VS Code specific. claude-code-sandbox is CLI-native.

claude-code-sandbox's unique value: **npm-installable, browser-based async monitoring with full Docker isolation**.

## Our Usage

**Status: Watching** — valuable for safety-critical autonomous execution, but adds overhead. Monitor for stability improvements.

**Rationale:**
- **Safety is compelling:** Docker isolation prevents Claude from accessing host system outside project directory
- **Browser terminal useful:** Async monitoring aligns with "Flag It" phase (check progress without interrupting)
- **Alpha status concerning:** README warns of security issues, TODO list shows incomplete features
- **Overhead vs. benefit:** Docker adds startup time, resource usage — worth it for untrusted code execution, but Adam's projects are greenfield (direct push OK)

**When to revisit:**
- If client work requires sandboxed execution (e.g., sensitive data, untrusted repos)
- If alpha issues are resolved and tool reaches stable release
- If Ralph (Mac Mini) runs autonomous sessions overnight where safety is paramount
- If Docker overhead is justified by safety gains

**Configuration (if adopted):**
```bash
# Install
npm install -g @textcortex/claude-code-sandbox

# Start with web UI (default)
claude-sandbox

# Start with custom setup commands
cat > claude-sandbox.config.json <<EOF
{
  "setupCommands": ["npm install", "npm run build"],
  "autoPush": true,
  "autoCreatePR": false
}
EOF
claude-sandbox

# Multi-container workflow
claude-sandbox start -n main-dev
claude-sandbox start -n feature-auth
claude-sandbox list
claude-sandbox attach
```

**Access:** `http://localhost:3456` (web terminal), or `claude-sandbox attach` for terminal.

## Scoring

| Criterion | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| Holy Grail alignment | 3.5/5 | 30% | 1.05 |
| Simplicity | 3/5 | 20% | 0.60 |
| Community trust | 3/5 | 15% | 0.45 |
| Ecosystem fit | 4/5 | 15% | 0.60 |
| Cost efficiency | 3/5 | 10% | 0.30 |
| Maturity | 2/5 | 10% | 0.20 |
| **Total** | | | **3.60** |

**Holy Grail alignment (3.5/5):** Supports Phase 3 (Run It) with safety layer. Browser-based monitoring aligns with "Flag It" visibility needs. Doesn't integrate with Beads/OpenSpec (general-purpose sandbox). Loses 1.5 points for lack of workflow-specific features (plan execution, task tracking, notifications).

**Simplicity (3/5):** npm install is easy, but Docker required (heavier than native tools). Config file optional but useful. Browser UI is intuitive. Loses 2 points for Docker setup complexity and multi-step workflow (start → interact → review → push).

**Community trust (3/5):** 289 stars, active development, featured in Docker blog and official docs. Loses 2 points for **alpha status** and explicit security warning in README.

**Ecosystem fit (4/5):** Designed specifically for Claude Code. Auto-discovers credentials. Git-native. GitHub integration (branch, PR). Podman compatible. Loses 1 point for Docker dependency (not all environments support containers).

**Cost efficiency (3/5):** Docker overhead (image build, container startup, resource usage). No additional API costs beyond Claude Code. Free, open-source. Loses 2 points for resource overhead vs. native execution.

**Maturity (2/5):** **Alpha software** (explicit warning). TODO list shows incomplete features. Active development but new (289 stars, published recently). Good docs but setup is manual. Loses 3 points for alpha status and instability risks.

## Sources

- [GitHub: textcortex/claude-code-sandbox](https://github.com/textcortex/claude-code-sandbox)
- [Docker Blog: Docker Sandboxes - Run Claude Code Safely](https://www.docker.com/blog/docker-sandboxes-run-claude-code-and-other-coding-agents-unsupervised-but-safely/)
- [Claude Code Docs: Sandboxing](https://code.claude.com/docs/en/sandboxing)
- [Docker Docs: Configure Claude Code](https://docs.docker.com/ai/sandboxes/claude-code/)
- [claudefa.st: Claude Code Sandbox Guide (2026)](https://claudefa.st/blog/guide/sandboxing-guide)
- [codewithandrea.com: Run AI Agents Inside DevContainer](https://codewithandrea.com/articles/run-ai-agents-inside-devcontainer/)

---
*Last reviewed: 2026-02-07*
