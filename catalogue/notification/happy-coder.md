# Happy Coder

| Field | Value |
|-------|-------|
| **GitHub** | [slopus/happy](https://github.com/slopus/happy) |
| **Stars** | 10,500 |
| **Last Commit** | Active (2026) |
| **Install** | `npm install -g happy-coder` + App Store / Google Play / [app.happy.engineering](https://app.happy.engineering) |
| **Status** | Watching |
| **Category** | Notification |
| **Holy Grail Phase** | 4-Flag |

## What It Does

Happy Coder is a mobile and web client for accessing Claude Code remotely with end-to-end encryption. You run `happy` instead of `claude` on your machine, then monitor, control, and interact with the agent from your phone, tablet, or browser. It provides push notifications when agents need permissions or encounter errors -- making it an alternative or complement to OpenClaw for blocker notification. Your code never leaves your devices unencrypted.

## How It Works

### Architecture

The system has three components:
1. **Happy CLI** -- Wrapper that replaces the `claude` command (`happy` or `happy codex`)
2. **Happy App** -- Mobile (iOS/Android via Expo) and web client at app.happy.engineering
3. **Happy Server** -- Backend handling encrypted synchronization between CLI and app

### Workflow

1. Install the mobile app from App Store or Google Play (or use the web version)
2. Install the CLI globally: `npm install -g happy-coder`
3. Run `happy` instead of `claude` in your terminal
4. When you step away, the session switches to remote mode
5. Receive push notifications when the agent needs input, permissions, or hits an error
6. Respond from your phone to unblock the agent
7. Press any keyboard key to switch back to desktop control

### Key Features

- **Push notifications** when Claude Code needs permissions or encounters errors
- **Device switching** -- take control from phone or desktop with one keypress
- **End-to-end encryption** -- code never leaves devices unencrypted
- **Open source** (MIT) with no telemetry or tracking
- **Codex support** -- `happy codex` works the same way

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 3 | 0.90 |
| Simplicity | 20% | 3 | 0.60 |
| Community trust | 15% | 3 | 0.45 |
| Ecosystem fit | 15% | 2 | 0.30 |
| Cost efficiency | 10% | 4 | 0.40 |
| Maturity | 10% | 3 | 0.30 |
| **Composite** | | | **2.95** |

### Strengths
- Solves the "agent is blocked waiting for my input" problem directly from mobile
- E2E encryption is a strong security stance -- important when code involves client secrets
- Open source with no telemetry (trust but verify)
- Push notifications are more immediate than polling (OpenClaw checks every 15 min)
- Cross-platform mobile app (iOS, Android, web) means access from any device
- Active community (10.5K stars, 1,500+ commits, 43 contributors)

### Weaknesses
- Requires running `happy` wrapper instead of `claude` -- changes the invocation pattern
- Third-party server handles encrypted sync (even though E2E, there is a relay)
- Mobile app is Expo-based which may have platform-specific quirks
- Only works for interactive sessions -- unclear how it integrates with headless/autonomous Ralph loops
- No Telegram integration (our preferred notification channel)

### Community Sentiment
Very positive. Users appreciate the "check on your agent from the couch" use case. The E2E encryption decision has been well-received. Primary criticism is around the wrapper approach requiring behavior change.

### Compared To
- **OpenClaw (Ralph)**: OpenClaw is more about proactive monitoring (reads shared blocker files, sends Telegram alerts). Happy Coder is about direct interactive control from mobile. They serve different but complementary roles.
- **Claude Squad / tmux**: These manage multiple sessions but require terminal access. Happy Coder provides mobile access without SSH.
- **SMS/email alerts**: Happy Coder provides rich interactive control, not just one-way notifications.

## Our Usage

**Plan:** Evaluate as a complement to OpenClaw for Phase 4-Flag blocker notification. The key question is whether Happy Coder can work with headless Ralph loops or if it only supports interactive sessions.

**Potential scenarios:**
1. **Interactive development**: When Adam is working on a project but steps away, Happy Coder provides mobile continuity
2. **Permission requests**: Ralph loops that hit permission prompts could notify via Happy Coder
3. **Quick unblocks**: Approve file operations or tool use from phone without opening laptop

**Concerns:**
- Our primary notification channel is Telegram (via OpenClaw). Happy Coder uses its own push notification system, which adds another channel to monitor.
- The `happy` wrapper may not integrate cleanly with Oh-My-ClaudeCode's execution modes or claude-auto-resume's restart logic.
- For overnight Ralph loops on Mac Mini, we need headless notification, not interactive mobile control.

**Decision:** Watch for now. OpenClaw remains the primary notification path for autonomous loops. Happy Coder is more relevant for Adam's interactive development sessions during the day. Revisit once we confirm whether it works with headless execution.

## Sources

- [GitHub Repository](https://github.com/slopus/happy)
- [Web App](https://app.happy.engineering)

---
*Last reviewed: 2026-02-06*
