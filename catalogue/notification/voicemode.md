# VoiceMode

| Field | Value |
|-------|-------|
| GitHub | [mbailey/voicemode](https://github.com/mbailey/voicemode) |
| Stars | 692 |
| Last Commit | 2026-02-02 (v8.1.0) |
| Install | `claude plugin install voicemode@mbailey` |
| Status | Evaluated |
| Category | Notification |
| Holy Grail Phase | Phase 5 (Blocker Notification) |

## What It Does

Voice conversations with Claude Code via speech-to-text and text-to-speech. Supports both local engines (Whisper.cpp for STT, Kokoro for TTS) and cloud (OpenAI). Includes an "operator" feature -- a headless Claude Code instance running in tmux that can be remotely controlled via iOS app or web interface.

## How It Works

- STT/TTS with automatic silence detection
- Local processing option (no API calls needed for voice)
- Agent management: `voicemode agent start/stop/status/send`
- Operator mode: headless Claude Code in tmux, awakened remotely
- Platforms: Linux, macOS, Windows (WSL), NixOS
- Python 3.10-3.14, MIT licensed
- 140 releases, very active development (8 contributors)

## Evaluation

**Strengths:**
- Operator mode could enable voice-based unblocking of Ralph loops
- Local STT/TTS means no cloud dependency for basic voice
- Active development (140 releases, latest Feb 2026)
- Plugin install is clean and standard

**Weaknesses:**
- Voice is a niche interaction mode -- typing is usually faster for dev work
- Operator mode is interesting but adds complexity vs. Telegram notifications
- 692 stars is modest
- Python dependency for voice processing

**Community Sentiment:** Enthusiastic niche following. Users who want hands-free coding love it.

**Compared To:** OpenClaw/Telegram (our chosen notification path) is text-based and simpler. VoiceMode's operator feature is more powerful but more complex. For blocker notification, Telegram is sufficient.

## Our Usage

Evaluated, not adopting now. The operator mode concept -- remotely controlling a headless Claude Code instance -- is genuinely interesting for Phase 5. If Telegram-based unblocking feels too slow, voice commands via VoiceMode could be a faster path. Low priority but worth remembering.

## Sources

- [GitHub README](https://github.com/mbailey/voicemode)

Last reviewed: 2026-02-06
