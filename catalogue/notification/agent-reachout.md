# Agent Reachout

| Field | Value |
|-------|-------|
| GitHub | [vibe-with-me-tools/agent-reachout](https://github.com/vibe-with-me-tools/agent-reachout) |
| Stars | 36 |
| Last Commit | 2026-02-03 |
| Install | `/plugin marketplace add vibe-with-me-tools/agent-reachout && /plugin install agent-reachout@agent-reachout` |
| Status | Watching |
| Category | notification |
| Holy Grail Phase | 4-Flag |
| Score | **3.80** |

## What It Does

Telegram bridge for Claude Code that sends notifications when agents finish work or need decisions. Supports both one-way notifications and two-way conversations, plus a task runner that lets you trigger Claude Code jobs from Telegram messages.

## How It Works

**Setup:**
1. Create Telegram bot via [@BotFather](https://t.me/botfather)
2. Get your chat ID from [@userinfobot](https://t.me/userinfobot)
3. Set environment variables:
   ```bash
   AGENT_REACHOUT_TELEGRAM_BOT_TOKEN=your_token
   AGENT_REACHOUT_TELEGRAM_CHAT_ID=your_id
   ```
4. Install as Claude Code plugin

**Notification Flow:**
```
Agent finishes task → Agent Reachout → Telegram → Human sees push notification
Agent hits blocker → Agent asks question → Telegram → Human replies → Agent resumes
```

**Telegram Task Runner:**
Run from `server/` directory: `bun run telegram-agent`

Commands:
- `/task <description>` — Start new task (queued)
- `/continue <description>` — Continue latest session
- `/resume <session_id> <description>` — Resume specific session
- `/history [count]` — Show recent jobs
- `/status` — Current job + queue depth + allowed tools
- `/allowed_tools <list>` — Set CLI `--allowedTools` for future tasks
- `/cancel` — Cancel current job and clear queue

**Configuration:**
```bash
AGENT_REACHOUT_NOTIFY_DEFAULT_TIMEOUT_MS=300000  # 5 min default
AGENT_REACHOUT_CLAUDE_COMMAND=claude             # CLI command
AGENT_REACHOUT_TELEGRAM_TASK_PREFIX=/task        # Command prefix
AGENT_REACHOUT_ALLOWED_TOOLS=Read,Write,Grep     # Default tools
AGENT_REACHOUT_HISTORY_LIMIT=25                  # History entries
```

## Evaluation

### Strengths
- **Genuine async workflow** — Agent reaches out to you, not vice versa
- **Two-way conversation** — Reply to Telegram message to unblock agent
- **Task runner** — Trigger Claude Code from phone, queued execution
- **Session continuity** — Remembers latest session for `/continue`
- **Tool control** — Configure allowed tools per task from Telegram
- **Low friction** — Uses Telegram (already on phone) vs. custom dashboard
- **Very recent updates** — Feb 2026 commits show active development
- **Clean architecture** — Agent SDK CLI integration, not a hack

### Weaknesses
- **Telegram-only** — No Slack, Discord, email, or other channels (yet)
- **Single-user focus** — No multi-user or team support
- **Requires Bun** — Adds runtime dependency beyond Node.js
- **Small community** — Only 36 stars, 3 forks (very early)
- **No persistence** — Task history is in-memory (lost on restart)
- **Manual server** — Must run `bun run telegram-agent` separately (not auto-start)
- **Limited docs** — README is clear but no advanced usage patterns

### Community Sentiment

**Hacker News (Jan 2026):** "Show HN: Let your Claude Code message you on Telegram" — positive reception, users excited about async agent workflows.

**Medium tutorial (Jan 2026):** Step-by-step guide connecting Telegram with Claude Code hooks — shows community interest in integration patterns.

**Competitors emerging:** Multiple Telegram bots for Claude Code appeared Jan-Feb 2026 (claude-code-telegram, Claude-Code-Remote), indicating strong demand for this notification pattern.

**Reddit/X:** Limited discussion, but concept of "agent reaches you" resonates with people tired of babysitting AI in terminal.

### Compared To

**vs. OpenClaw ([notification/openclaw.md](openclaw.md))**
- OpenClaw: Docker-based, multi-channel (Telegram + more), richer framework
- agent-reachout: Lightweight plugin, Telegram-only, faster setup
- **OpenClaw chosen** for our stack (more mature, multi-channel), but agent-reachout is simpler

**vs. Happy Coder ([notification/happy-coder.md](happy-coder.md))**
- Happy Coder: Dashboard + notifications, more observability
- agent-reachout: Pure messaging, no dashboard overhead
- **Trade-off:** Visibility vs. simplicity

**vs. Call Me ([notification/call-me.md](call-me.md))**
- Call Me: Multiple channels (SMS, email, webhook)
- agent-reachout: Telegram + task runner
- **Trade-off:** Channel flexibility vs. deep Telegram integration

**vs. Claude Code Remote ([notification/claude-code-remote.md](claude-code-remote.md))**
- Claude Code Remote: Email, Discord, Telegram support
- agent-reachout: Telegram-focused with task queuing
- **Trade-off:** Multi-channel vs. task management

## Our Usage

**Watching** — excellent concept and clean implementation, but OpenClaw is already chosen for Phase 4 (Flag It).

**Why watching instead of choosing:**
1. **OpenClaw covers broader needs** — Multi-channel (not just Telegram), Docker-based, more mature
2. **Small community** — Only 36 stars, 3 forks; want to see if it gains traction
3. **Telegram-only** — If we later want Slack/email/webhook, would need to swap tools
4. **In-memory history** — Task history doesn't persist across restarts
5. **Manual server start** — Requires running `bun run telegram-agent` separately

**Why it's compelling:**
- **Task runner is unique** — `/task` from Telegram → queued Claude Code execution is powerful
- **Very recent updates** — Active development (Feb 2026) shows momentum
- **Clean API** — Uses Agent SDK CLI, not a hack
- **Async-first mindset** — Matches our "agent reaches you" philosophy

**Re-evaluate if:**
- Community grows (e.g., 200+ stars, proven in production)
- Multi-channel support added (Slack, Discord, webhooks)
- Task persistence added (SQLite or file-based queue)
- OpenClaw implementation hits blockers (e.g., Docker issues on Ralph)

**Potential use case:**
- Could run alongside OpenClaw — OpenClaw for critical blockers, agent-reachout for task dispatching from phone
- Greenfield projects where Telegram-only is acceptable
- Personal workflows (solo dev) where simplicity beats flexibility

## Sources

- [README](https://github.com/vibe-with-me-tools/agent-reachout)
- [Hacker News Discussion](https://news.ycombinator.com/item?id=46563672)
- [Medium Tutorial: Connect Telegram with Claude Code Hooks](https://medium.com/@dan.avila7/step-by-step-guide-connect-telegram-with-claude-code-hooks-1686fadcee65)
- [Medium: Use Claude Code From Phone With Telegram Bot](https://medium.com/@amirilovic/how-to-use-claude-code-from-your-phone-with-a-telegram-bot-dde2ac8783d0)
- [MCP Market: Telegram Notifications](https://mcpmarket.com/server/telegram-notifications)
- [GitHub Repository](https://github.com/vibe-with-me-tools/agent-reachout)

---
*Last reviewed: 2026-02-07*
