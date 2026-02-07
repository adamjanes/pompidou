# Call Me

| Field | Value |
|-------|-------|
| GitHub | [ZeframLou/call-me](https://github.com/ZeframLou/call-me) |
| Stars | 2,281 |
| Last Commit | Jan 2026 |
| Install | `/plugin marketplace add ZeframLou/call-me` then `/plugin install callme@callme` |
| Status | Watching |
| Category | notification |
| Holy Grail Phase | 4-Flag |

## What It Does

Minimal plugin that lets Claude Code call you on the phone when it hits a blocker or completes a task. Uses Telnyx (~$0.007/min) or Twilio (~$0.014/min) for calls, with OpenAI APIs for speech processing. Multi-turn voice conversations between Claude and the user — Claude can perform web searches and use tools during the call. Four primary tools: `initiate_call`, `continue_call`, `speak_to_user`, `end_call`.

## How It Works

Architecture: Claude Code → stdin JSON → local MCP Server → ngrok tunnel → phone provider (Telnyx/Twilio) → your phone. TypeScript-based, MIT license. The MCP server runs locally and establishes an ngrok tunnel for incoming webhooks. Claude can compose tool calls during voice conversations (e.g., searching the web while talking to you). 3 contributors, 8 open issues.

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 3 | 0.90 |
| Simplicity | 20% | 2 | 0.40 |
| Community trust | 15% | 2 | 0.30 |
| Ecosystem fit | 15% | 2 | 0.30 |
| Cost efficiency | 10% | 3 | 0.30 |
| Maturity | 10% | 2 | 0.20 |
| **Composite** | | | **2.40** |

### Strengths
- Most direct notification possible — impossible to miss a phone call
- Multi-turn voice conversations (not just one-way alerts)
- Tool composability during calls — Claude can search/act while talking
- Low cost (~$0.007/min Telnyx + ~$0.006/min STT + ~$0.02/min TTS)
- MIT license

### Weaknesses
- Requires Telnyx/Twilio account + OpenAI API key
- ngrok dependency for webhook routing
- Could be annoying at scale if agents call frequently
- Phone calls are interruptive — less suitable for routine updates
- 8 open issues, small team (3 contributors)

### Community Sentiment

Positive and enthusiastic. Developers love the concept — "finally, my AI can call me when it's stuck." Some concern about being woken up by 3am agent calls during nightly Ralph loops.

### Compared To

- **OpenClaw (Telegram)** — Less intrusive, text-based. Better for routine updates. call-me is for urgent escalation.
- **claude-island (macOS notifications)** — Local only, easy to miss. call-me is impossible to miss.
- **Claude-Code-Remote** — Multi-channel (email/Discord/Telegram) but no voice.

## Our Usage

Watching. OpenClaw via Telegram is our chosen notification path. call-me could serve as an escalation tier: Telegram for routine blocker updates, phone call for critical failures that need immediate attention. Low priority — Telegram is sufficient for now.

## Sources

- [GitHub: ZeframLou/call-me](https://github.com/ZeframLou/call-me)

---
*Last reviewed: 2026-02-07*
