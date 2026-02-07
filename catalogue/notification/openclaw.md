# OpenClaw

| Field | Value |
|-------|-------|
| GitHub | [openclaw/openclaw](https://github.com/nicepkg/openclaw) |
| Stars | 167,000 |
| Last Commit | 2026-01 (approx) |
| Install | `curl -fsSL https://raw.githubusercontent.com/nicepkg/openclaw/main/install.sh \| bash` |
| Status | ★ CHOSEN (isolated) |
| Category | notification |
| Holy Grail Phase | 4-Flag |

## What It Does

OpenClaw is an autonomous AI agent with a "heartbeat" — it wakes up on its own on a configurable schedule, checks the state of the world, and proactively reaches out with suggestions, reminders, or alerts. Created by Peter Steinberger (PSPDFKit founder), it's designed to be a persistent AI assistant that lives on your machine and maintains ongoing awareness of your projects. With 167,000 GitHub stars, it's one of the most popular AI agent tools in the ecosystem.

## How It Works

**Core architecture:**
- **SOUL.md**: Defines the agent's personality and behavior
- **IDENTITY.md**: Names the agent (Adam's instance is named "Ralph")
- **USER.md**: Context about the user (background, preferences, projects)
- **HEARTBEAT.md**: Proactive checklist — what to check on wake-up
- **WORKFLOW.md**: Task lifecycle definition
- **memory/**: Daily logs maintaining persistent context across sessions
- **skills/**: Custom skill definitions (including spawning Claude Code sessions)

**Scheduling:**
Built-in cron-like scheduling in `~/.openclaw/cron/`. The agent wakes up at defined intervals, runs through its heartbeat checklist, and takes action or sends notifications.

**Communication:**
Supports multiple channels — Telegram, Slack, email. Each channel has an approved contacts list for security.

**Adam's instance ("Ralph"):**
- Location: `/Users/adamjanes/code/ralph/`
- Telegram contacts: Adam (6963887105), Clairo (1981391864)
- Skills: claude-code-orchestration (spawning Claude Code sessions)
- Memory: Daily logs from January 2025 onward
- Current state: **NOT RUNNING** — broken cron jobs, missing `~/.clawdbot/` directory

**Key commands:**
```bash
# Start OpenClaw
openclaw start

# Check status
openclaw status

# Send a message
openclaw message "Check on the frequency-first build"

# View memory
openclaw memory list

# View heartbeat config
cat ~/.openclaw/HEARTBEAT.md
```

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 4 | 1.20 |
| Simplicity | 20% | 2 | 0.40 |
| Community trust | 15% | 4 | 0.60 |
| Ecosystem fit | 15% | 3 | 0.45 |
| Cost efficiency | 10% | 2 | 0.20 |
| Maturity | 10% | 3 | 0.30 |
| **Composite** | | | **3.15** |

### Strengths
- Proactive "heartbeat" pattern is genuinely unique — the agent initiates contact, not the user
- Massive community (167,000 stars) ensures ongoing development and support
- Built-in scheduling eliminates need for external cron/launchd configuration
- Telegram integration is well-implemented for mobile notifications
- Memory system maintains context across sessions (daily logs)
- Skill system is extensible — can teach it new capabilities
- Created by a credible, well-known developer (Peter Steinberger)

### Weaknesses
- **Security concerns**: Plaintext credentials stored in config files. No default authentication. Malicious skills in ClawHub (community skill store) are a real risk. Users have reported $75-500 unexpected API bills from runaway sessions.
- **Context switching issues**: Adam's direct assessment: "misses things and struggles with context switching." Not reliable enough to be a primary orchestrator.
- **Broad scope**: OpenClaw tries to be everything — orchestrator, scheduler, notifier, memory system, skill platform. Jack of all trades, master of none.
- **Cost risk**: Without budget limits, the heartbeat pattern can generate significant API costs checking on things that haven't changed.
- **ClawHub risks**: Community-contributed skills have no security review. Installing skills is analogous to `curl | bash` — trust-based.
- **Broken on Adam's machine**: Currently not running. Missing directories, broken cron jobs. Needs a clean reinstall.

### Community Sentiment
Extremely popular (167K stars) but sentiment is split between enthusiasts and cautious power users. Enthusiasts love the proactive pattern and Telegram integration. Power users warn about security (plaintext creds, ClawHub risks) and cost ($75-500 bills from forgotten instances). Reddit threads frequently mention both the "magic" of getting proactive messages and the "surprise" of large API bills.

Notable quotes:
- "The heartbeat is genuinely useful — it's like having a junior dev who checks in on things"
- "Be very careful with costs. Set hard limits on your API keys before enabling heartbeat"
- "ClawHub skills are the Wild West — audit everything before installing"
- "Great concept, needs better security defaults"

### Compared To
- **Custom notification scripts**: Simpler, cheaper, no security concerns. But lack the proactive intelligence — they only report what you explicitly check for, not emergent issues.
- **Slack/Discord bots**: Similar notification capability but no heartbeat pattern or project awareness. OpenClaw understands your codebase; a Slack bot just forwards messages.
- **GitHub Actions notifications**: Good for CI/CD events but no awareness of local development, blockers, or cross-project state.

## Our Usage

**Chosen as an ISOLATED blocker notifier.** Critical distinction: we are NOT using OpenClaw as a full orchestrator. Adam's direct experience is that it "misses things and struggles with context switching." Instead, it serves one narrow purpose in our pipeline: detecting blockers and notifying Adam via Telegram.

**Architecture (target state):**
1. Ralph loops (Claude Code sessions) write blockers to a shared file: `~/.claude/shared-state/blockers.jsonl`
2. OpenClaw runs in Docker on Mac Mini with restricted access:
   - READ-ONLY access to the blockers file
   - Telegram API access (outbound only)
   - No file system access beyond the blockers file
   - No ability to modify code or spawn processes
3. OpenClaw checks the blockers file every 15 minutes
4. When a new blocker appears, it messages Adam on Telegram
5. Adam can reply with unblock instructions
6. OpenClaw writes the unblock to a response file that Ralph loops check

**Docker isolation:**
```dockerfile
# Concept — OpenClaw sees only what we allow
volumes:
  - ~/.claude/shared-state/blockers.jsonl:/data/blockers.jsonl:ro
  - ~/.openclaw/telegram-config:/config/telegram:ro
```

**Why Docker isolation is critical:**
- Prevents $75-500 API bill scenarios (no ability to make arbitrary API calls)
- Prevents ClawHub skill risks (no skill installation possible)
- Prevents plaintext credential exposure (credentials only for Telegram)
- Prevents accidental code modification (read-only file access)

**Current status:** Not running. Needs clean reinstall following `CLEAN_INSTALL_PREP.md` at `/Users/adamjanes/code/ralph/CLEAN_INSTALL_PREP.md`, then Docker containerization.

## Sources

- [GitHub: openclaw/openclaw](https://github.com/nicepkg/openclaw)
- [OpenClaw documentation](https://docs.openclaw.dev/)
- [Adam's Ralph instance](file:///Users/adamjanes/code/ralph/)
- [Clean install prep](file:///Users/adamjanes/code/ralph/CLEAN_INSTALL_PREP.md)

---
*Last reviewed: 2026-02-07*
