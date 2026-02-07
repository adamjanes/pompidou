# Claude Code Remote

| Field | Value |
|-------|-------|
| GitHub | [JessyTsui/Claude-Code-Remote](https://github.com/JessyTsui/Claude-Code-Remote) |
| Stars | 1,017 |
| Last Commit | Aug 2025 |
| Install | `git clone` + `npm install` |
| Status | Watching |
| Category | notification |
| Holy Grail Phase | 4-Flag |

## What It Does

Control Claude Code remotely via multiple messaging platforms — Email, Telegram, LINE, and Desktop notifications. Receive notifications when tasks complete and send commands back without SSH. Two-way communication: not just alerts, but remote command injection back into running sessions. Uses hooks integrated into Claude Code's settings.

## How It Works

Monitors Claude Code execution through hooks in `~/.claude/settings.json`. When tasks complete, triggers notifications across configured channels. Supports PTY mode (direct terminal injection), tmux mode (session-based), and clipboard fallback (macOS). Session tracking via `session-map.json` with 24-hour token validity. ID-based whitelist verification for security. Smart monitoring detects real conversations vs subagent activity. MIT license.

## Evaluation

### Strengths
- Multi-channel (Email, Telegram, LINE, Desktop) — choose what works for you
- Two-way communication — send commands back, not just receive notifications
- Multiple injection modes (PTY, tmux, clipboard) — flexible architecture
- Group support for team collaboration
- Security via ID-based whitelisting

### Weaknesses
- Last commit Aug 2025 — potentially stale (6 months old)
- Security implications of remote command injection
- Requires external service setup (SMTP, Telegram bot, etc.)
- 9 open issues, unclear maintenance status
- Complex setup compared to simpler notification tools

### Community Sentiment

Limited discussion. Telegram integration praised by users who want mobile control. Some security concerns about remote command injection without proper authentication.

### Compared To

- **OpenClaw** — Broader proactive AI but Telegram-only. Claude-Code-Remote is multi-channel.
- **call-me** — Phone-only, voice. Claude-Code-Remote is text, multi-channel.
- **claude-island** — macOS-only local notifications. Claude-Code-Remote is remote.

## Our Usage

Watching. The Telegram channel could complement our OpenClaw setup. However, the Aug 2025 last commit is concerning — may be abandoned. OpenClaw remains our chosen notification tool. Revisit if the project shows signs of active development.

## Sources

- [GitHub: JessyTsui/Claude-Code-Remote](https://github.com/JessyTsui/Claude-Code-Remote)

---
*Last reviewed: 2026-02-07*
