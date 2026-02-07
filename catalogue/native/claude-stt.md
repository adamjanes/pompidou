# Claude STT

| Field | Value |
|-------|-------|
| GitHub | [jarrodwatts/claude-stt](https://github.com/jarrodwatts/claude-stt) |
| Stars | 304 |
| Last Commit | 2026-02-07 |
| Install | `/plugin marketplace add jarrodwatts/claude-stt && /plugin install claude-stt && /claude-stt:setup` |
| Status | Watching |
| Category | native |
| Holy Grail Phase | Supporting |
| Score | **3.55** |

## What It Does

Speech-to-text input for Claude Code via hotkey (Ctrl+Shift+Space). Hold to record, release to transcribe — all processed locally using Moonshine STT (~400ms latency). No cloud APIs, no subscriptions, full privacy.

## How It Works

**Flow:**
```
Press hotkey → Record audio from mic
              ↓
Release hotkey → Moonshine STT processes locally (~400ms)
              ↓
Text inserted into Claude Code input (keyboard injection or clipboard)
```

**Installation:**
1. Add marketplace: `/plugin marketplace add jarrodwatts/claude-stt`
2. Install plugin: `/plugin install claude-stt`
3. Run setup: `/claude-stt:setup`
   - Installs dependencies (uv if available, otherwise `.venv`)
   - Downloads Moonshine model (~200MB)
   - Checks microphone permissions

**Commands:**
```
/claude-stt:setup     # First-time setup
/claude-stt:start     # Start STT daemon
/claude-stt:stop      # Stop STT daemon
/claude-stt:status    # Check readiness
/claude-stt:config    # Change settings
```

**CLI (alternative):**
```bash
claude-stt setup
claude-stt start --background
```

**Configuration:**
```toml
# ~/.claude/plugins/claude-stt/config.toml
hotkey = "ctrl+shift+space"
mode = "toggle"  # or "push-to-talk"
engine = "moonshine"  # or "whisper"
moonshine_model = "moonshine/base"  # or "moonshine/tiny"
output_mode = "auto"  # "injection" or "clipboard"
sound_effects = true
max_recording_seconds = 300
```

**Requirements:**
- Python 3.10-3.13
- ~200MB disk space for model
- Microphone access
- **macOS:** Accessibility permissions (System Settings > Privacy & Security)
- **Linux:** xdotool, X11 recommended (Wayland limited), WSL not supported
- **Windows:** pywin32 for window tracking

## Evaluation

### Strengths
- **Local processing** — All audio processed on-device, zero cloud calls
- **Fast** — ~400ms transcription time (Moonshine ONNX)
- **Privacy-first** — Audio never sent anywhere, never stored (in-memory, discarded)
- **Low friction** — Hotkey-based, no typing required
- **Cross-platform** — macOS, Linux, Windows support
- **Moonshine STT** — Lightweight, efficient model (base ~200MB)
- **Very active** — Feb 2026 commits (today!), 27 forks
- **Clean integration** — Native Claude Code plugin, not a hack
- **Push-to-talk or toggle** — Flexible recording modes
- **No telemetry** — Zero analytics, no data collection

### Weaknesses
- **Platform-specific quirks** — macOS Accessibility, Linux xdotool/X11, Windows pywin32
- **Model download** — ~200MB upfront (not huge, but not zero)
- **Hotkey conflicts** — Must check for conflicts with other apps
- **Window tracking** — Must stay focused on Claude Code window
- **WSL not supported** — Linux users on Windows need native install
- **Whisper optional** — Requires extra dependencies (`--with-whisper`)
- **Setup friction** — Multi-step install vs. just launching Claude Code
- **Voice input niche** — Not everyone types slower than they speak

### Community Sentiment

**Medium tutorial (Jan 2026):** "Voice Control for Claude Code: A Step-by-Step Guide to Local Speech Recognition" — shows community demand for voice input.

**Wispr Flow comparison:** Commercial alternative (Wispr Flow) exists, but claude-stt is free/local.

**Chrome extensions:** Multiple "Claude Speech-to-Text" Chrome extensions exist, showing demand for voice input in Claude ecosystem.

**Voicy alternative:** Privacy-focused Chrome extension for voice-to-text in all fields — claude-stt is Claude Code-specific.

**No Hacker News thread** found — tool hasn't hit HN front page yet.

**Star growth:** 304 stars, 27 forks — modest but healthy for a niche tool.

### Compared To

**vs. VoiceMode ([notification/voicemode.md](voicemode.md))**
- VoiceMode: Voice input + output (two-way voice conversation)
- claude-stt: Voice input only (STT, no TTS)
- **Trade-off:** Full voice conversation vs. input-only simplicity

**vs. Whisper MCP**
- Whisper: Cloud-based, higher accuracy, slower
- Moonshine: Local, fast (~400ms), privacy-first
- **Trade-off:** Accuracy vs. speed/privacy

**vs. Wispr Flow (commercial)**
- Wispr: Paid, polished UX, system-wide
- claude-stt: Free, Claude Code-specific, local
- **Trade-off:** Polish vs. cost/privacy

**vs. Voicy Chrome extension**
- Voicy: Browser-based, works everywhere
- claude-stt: Native plugin, Claude Code-specific
- **Trade-off:** Universal vs. integrated

**vs. Native typing**
- Typing: Zero setup, always works
- Voice: Faster for long input, hands-free
- **Trade-off:** Reliability vs. speed (for some users)

## Our Usage

**Watching** — excellent privacy-first voice input, but not critical for our workflow.

**Why watching instead of choosing:**
1. **Adam types fast** — Voice input isn't a bottleneck for him
2. **Ralph is CLI-based** — Autonomous agents don't use voice input
3. **Setup overhead** — ~200MB model + permissions + hotkey config
4. **Platform-specific quirks** — Accessibility (macOS), xdotool (Linux), pywin32 (Windows)
5. **Not directly supporting Holy Grail** — Doesn't fit Spec/Task/Run/Flag/Repeat phases

**Why it's compelling:**
- **Privacy-first** — Local processing, no cloud, no telemetry
- **Fast** — ~400ms transcription (Moonshine)
- **Active maintenance** — Feb 2026 commits (today!)
- **Clean plugin** — Native Claude Code integration

**Re-evaluate if:**
1. **Adam starts dictating more** — E.g., morning voice briefings while making coffee
2. **Mobile scenario** — If we build mobile integration, voice becomes critical
3. **Accessibility needs** — If typing becomes difficult (injury, etc.)
4. **Multimodal workflows** — Voice input + screen recording + code generation

**Potential use cases:**
- **Morning briefings** — Voice dictate task list into Claude Code
- **Mobile + voice** — Phone + claude-stt for on-the-go task creation
- **Pair programming** — Voice describe changes while Claude writes code
- **Rapid prototyping** — Voice spec while commuting, Claude implements later

**Why typing wins for us now:**
- **Adam types 120+ WPM** — Voice isn't faster for him
- **Text is editable** — Easy to fix typos before sending
- **Precision** — Technical terms (e.g., "Moonshine ONNX") typed more reliably than spoken
- **No setup** — Works everywhere, zero config

**Watch for:**
- Community growth (500+ stars = proven useful)
- Whisper integration maturity (better accuracy)
- Mobile Claude Code (voice input critical on phone)
- Multimodal agent workflows (voice + vision + code)

## Sources

- [README](https://github.com/jarrodwatts/claude-stt)
- [Medium Tutorial: Voice Control for Claude Code](https://medium.com/@agentic.ai.forge/voice-control-for-claude-code-a-step-by-step-guide-to-local-speech-recognition-ffc4928a9aec)
- [Voicy Speech-to-Text (Chrome Extension)](https://usevoicy.com/speech-to-text-in-claude-code)
- [Wispr Flow (Commercial Alternative)](https://wisprflow.ai/use-cases/claude)
- [Best Open Source STT Model in 2026](https://northflank.com/blog/best-open-source-speech-to-text-stt-model-in-2026-benchmarks)
- [GitHub Repository](https://github.com/jarrodwatts/claude-stt)

---
*Last reviewed: 2026-02-07*
