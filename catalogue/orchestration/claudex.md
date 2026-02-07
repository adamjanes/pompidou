# Claudex

| Field | Value |
|-------|-------|
| GitHub | [Mng-dev-ai/claudex](https://github.com/Mng-dev-ai/claudex) |
| Stars | 192 |
| Last Commit | 2026-02-07 |
| Install | `git clone https://github.com/Mng-dev-ai/claudex.git && cd claudex && docker compose -p claudex-web -f docker-compose.yml up -d` |
| Status | Watching |
| Category | orchestration |
| Holy Grail Phase | 3-Run |
| Score | **3.60** |

## What It Does

Self-hosted, open-source Claude Code UI with full IDE experience (VS Code in browser, terminal, file explorer). Supports multiple AI providers (Anthropic Max, OpenAI Codex, OpenRouter, custom), multiple sandboxes (Docker, E2B, Modal), and extensibility (skills, agents, slash commands, MCP servers).

## How It Works

**Architecture:**
```
Frontend (React) → FastAPI Backend → PostgreSQL + Redis + Celery
                        ↓
         Docker/E2B/Modal Sandboxes
                        ↓
         VS Code + Terminal + File System
```

**Multi-Provider Setup:**
- **Anthropic:** OAuth token from `claude setup-token`
- **OpenAI:** Auth file from `codex login` (ChatGPT Pro)
- **OpenRouter:** API key
- **Custom:** Any Anthropic-compatible endpoint

All providers share:
- Same conversation history (`~/.claude` JSONL files)
- Same slash commands, skills, agents, MCP servers
- Can switch mid-chat (e.g., develop with Claude, review with GPT-5.2 Codex)

**Anthropic Bridge:**
Non-Anthropic providers work via [Anthropic Bridge](https://github.com/Mng-dev-ai/anthropic-bridge), which translates Anthropic API calls to other providers.

**Features:**
- **Sandboxed code execution:** Docker (local), E2B (cloud), Modal (cloud)
- **Full IDE:** VS Code editor, terminal, file explorer, port forwarding
- **VNC browser control:** View/interact with browser in sandbox via VNC
- **Skills & agents:** ZIP packages with YAML metadata
- **Scheduled tasks:** Celery workers for recurring automation
- **Chat features:** Fork chats, restore to any message, file attachments
- **Previews:** Web preview, mobile viewport, Markdown, HTML, images, CSV, PDF, PowerPoint
- **Marketplace:** Browse/install plugins (agents, skills, commands, MCPs)
- **Secrets management:** Environment variables for sandbox execution
- **Gmail integration:** Read/send/manage emails via [Gmail MCP Server](https://github.com/GongRzhe/Gmail-MCP-Server)

**Deployment:**
- Docker Compose for local/VPS
- Desktop app for macOS (native)
- [Coolify guide](https://github.com/Mng-dev-ai/claudex/blob/main/docs/coolify-installation-guide.md) for production VPS

**Stack:**
- **Frontend:** React 19, TypeScript, Vite, TailwindCSS, Zustand, Monaco Editor, XTerm.js
- **Backend:** FastAPI, Python 3.13, SQLAlchemy 2.0, Celery, Redis

**Services:**
- Frontend: 3000
- Backend: 8080
- PostgreSQL: 5432
- Redis: 6379

## Evaluation

### Strengths
- **Self-hosted** — Runs entirely on your machine, full control
- **Multi-provider** — Switch between Anthropic, OpenAI, OpenRouter, custom in same chat
- **Full IDE** — VS Code in browser, terminal, file system (not just a chat UI)
- **Multiple sandboxes** — Docker (local), E2B (cloud), Modal (cloud) options
- **Extensible** — Skills, agents, slash commands, MCP servers
- **Scheduled tasks** — Celery integration for recurring automation
- **Very active** — Feb 2026 commits, 37 forks, growing community
- **Production-ready** — PostgreSQL, Redis, Celery, Docker deployment
- **VNC browser** — Control browser inside sandbox (Playwright + CDP)
- **Gmail integration** — Email management via MCP
- **Apache 2.0 license** — Permissive, can fork/modify freely

### Weaknesses
- **Heavy infrastructure** — PostgreSQL, Redis, Celery, Docker (vs. lightweight CLI)
- **Complexity** — Full web stack vs. simple terminal workflow
- **Not git-native** — Web UI doesn't emphasize versioned, human-readable config
- **Small community** — 192 stars, 37 forks (early stage)
- **Unofficial** — Not from Anthropic, could diverge from Claude Code evolution
- **Multi-provider confusion** — "Share same history" claim needs validation (JSONL format compatibility?)
- **Dashboard overhead** — Must check web UI vs. agent reaching out to you
- **No mobile app** — Web-only, macOS desktop app only (no iOS/Android)
- **Anthropic Bridge risk** — Translation layer could break with API changes

### Community Sentiment

**Self-hosted demand:** 2026 blog post "The Best Self-hosted Claude Alternative" and "2026 is the year of self-hosting" indicate strong interest in on-premise AI tools.

**Enterprise gap:** Claude Code reviews note "no self-hosted option limits enterprise adoption in regulated industries" — Claudex fills this gap.

**Discord server:** Active Discord ([discord.gg/qVJBdPjr](https://discord.gg/qVJBdPjr)) shows community forming.

**Coolify deployment guide:** Production deployment documentation suggests serious usage beyond tinkering.

**No major Reddit/HN threads** yet — tool is very new (Feb 2026 commits).

**Competitor:** `siteboon/claudecodeui` (CloudCLI) also offers web UI for Claude Code, suggesting market demand.

### Compared To

**vs. Native Claude Code CLI**
- CLI: Lightweight, git-native, terminal-based
- Claudex: Full IDE, multi-provider, sandboxed, web UI
- **Trade-off:** Simplicity vs. features

**vs. Oh My ClaudeCode ([execution/oh-my-claudecode.md](oh-my-claudecode.md))**
- OMC: TDD, 32 agents, model routing, code review (CLI-based)
- Claudex: Full IDE, multi-provider, web UI (platform-based)
- **Trade-off:** Execution framework vs. orchestration platform

**vs. Native Agent Teams ([orchestration/native-agent-teams.md](native-agent-teams.md))**
- Native: Claude Code built-in multi-agent, no setup
- Claudex: Custom UI, multi-provider, sandboxes, more control
- **Trade-off:** Zero-config vs. customization

**vs. ralphex ([execution/ralphex.md](ralphex.md))**
- ralphex: Elixir-based multi-agent with browser control
- Claudex: Python/React platform with browser VNC
- **Trade-off:** Execution focus vs. full platform

**vs. Claude Code Workflow ([orchestration/claude-code-workflow.md](claude-code-workflow.md))**
- Workflow: YAML-based task orchestration
- Claudex: Web UI with visual task management
- **Trade-off:** Config-as-code vs. GUI

## Our Usage

**Watching** — impressive full-featured platform, but too heavy for our CLI-first, git-native workflow.

**Why watching instead of choosing:**
1. **Overhead mismatch** — PostgreSQL + Redis + Celery + Docker is overkill for our needs
2. **Not git-first** — Web UI doesn't produce versioned, markdown-based config
3. **Dashboard anti-pattern** — We want agents to reach us (OpenClaw), not us checking a dashboard
4. **Small community** — 192 stars, 37 forks; too early to bet on
5. **OMC already chosen** — Oh My ClaudeCode covers execution needs without web stack

**Why it's compelling:**
- **Self-hosted** — Full control, no cloud dependencies (appeals to enterprise/privacy-conscious)
- **Multi-provider** — Anthropic Max, OpenAI Codex, OpenRouter in same chat is powerful
- **Full IDE** — VS Code in browser + terminal + file system is more than a chat UI
- **VNC browser** — Playwright + CDP control inside sandbox is unique
- **Scheduled tasks** — Celery integration for recurring work

**Re-evaluate if:**
1. **Team scenario** — If Adam builds a team, Claudex could be shared workspace
2. **Client demos** — Self-hosted UI for showing AI dev to clients
3. **Multi-provider becomes critical** — If we need to frequently switch between Anthropic/OpenAI
4. **OMC limitations** — If CLI-based execution hits walls (e.g., no visual debugging)
5. **Community grows** — If Claudex hits 1,000+ stars and proves production-ready

**Potential use cases:**
- **Ralph UI** — If we want visual monitoring of Ralph's work (vs. terminal logs)
- **Client projects** — Self-hosted option for enterprise clients with compliance needs
- **Teaching** — Visual IDE for demos/workshops (easier to follow than terminal)
- **Multi-model experiments** — Compare Claude vs. GPT-5.2 Codex on same task

**Why CLI-first wins for us:**
- **Git-native** — Bash scripts, markdown files, versioned config
- **Agent-reaches-you** — OpenClaw pushes notifications, no dashboard babysitting
- **Simplicity** — No PostgreSQL, Redis, Celery to maintain
- **Reproducibility** — Clone repo, run bootstrap script, done

## Sources

- [README](https://github.com/Mng-dev-ai/claudex)
- [Discord Server](https://discord.gg/qVJBdPjr)
- [Coolify Deployment Guide](https://github.com/Mng-dev-ai/claudex/blob/main/docs/coolify-installation-guide.md)
- [Desktop Setup (macOS)](https://github.com/Mng-dev-ai/claudex/blob/main/docs/desktop-local.md)
- [Anthropic Bridge](https://github.com/Mng-dev-ai/anthropic-bridge)
- [Best Self-hosted Claude Alternative (2026)](https://multitaskai.com/self-hosted-claude/)
- [2026 is the year of self-hosting](https://fulghum.io/self-hosting)
- [GitHub Repository](https://github.com/Mng-dev-ai/claudex)

---
*Last reviewed: 2026-02-07*
