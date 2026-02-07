# claude-code-proxy (fuergaosi233)

| Field | Value |
|-------|-------|
| GitHub | [fuergaosi233/claude-code-proxy](https://github.com/fuergaosi233/claude-code-proxy) |
| Stars | 1,995 |
| Last Commit | 2025-10-15 |
| Install | `pip install -r requirements.txt && python start_proxy.py` |
| Status | Watching |
| Score | 2.85 |
| Category | execution |
| Holy Grail Phase | 3-Run / Supporting |

## What It Does

A Python-based proxy server that converts Claude Code API requests to OpenAI-compatible formats, enabling Claude Code CLI to work with OpenAI, Azure OpenAI, local models (Ollama), and any OpenAI-compatible API provider. Handles streaming, function calling, and image support.

## How It Works

**Setup:**
1. Install Python dependencies via `pip install -r requirements.txt`
2. Copy `.env.example` to `.env` and configure:
   - `OPENAI_API_KEY` — Target API key
   - `OPENAI_BASE_URL` — API endpoint (default: `https://api.openai.com/v1`)
   - `BIG_MODEL` — Model for opus/sonnet (default: `gpt-4o`)
   - `MIDDLE_MODEL` — Model for sonnet (default: `gpt-4o`)
   - `SMALL_MODEL` — Model for haiku (default: `gpt-4o-mini`)
   - `ANTHROPIC_API_KEY` — (Optional) Client validation key
3. Run: `python start_proxy.py` (defaults to `0.0.0.0:8082`)
4. Point Claude Code: `ANTHROPIC_BASE_URL=http://localhost:8082 claude`

**Model Mapping:**
- Models with "haiku" → `SMALL_MODEL`
- Models with "sonnet" → `MIDDLE_MODEL`
- Models with "opus" → `BIG_MODEL`

**Provider Examples:**
- **OpenAI:** `OPENAI_BASE_URL=https://api.openai.com/v1`
- **Azure OpenAI:** `OPENAI_BASE_URL=https://your-resource.openai.azure.com/...`
- **Ollama (local):** `OPENAI_BASE_URL=http://localhost:11434/v1` + dummy API key

**Features:**
- Full `/v1/messages` endpoint support
- Streaming SSE responses
- Function calling / tool use conversion
- Base64 image input
- Custom HTTP headers via `CUSTOM_HEADER_*` env vars
- Docker Compose support
- Configurable timeouts and token limits

**Security:**
- If `ANTHROPIC_API_KEY` set in proxy → clients must provide exact matching key
- If not set → any API key accepted

## Evaluation

### Strengths
- **Full Claude API compatibility** — Complete `/v1/messages` support
- **Multiple providers** — OpenAI, Azure, Ollama, any OpenAI-compatible
- **Custom headers** — Inject headers via `CUSTOM_HEADER_*` env vars
- **Image support** — Base64 encoded images
- **Async/await architecture** — High concurrency via asyncio
- **Docker support** — docker-compose deployment option
- **Configurable** — Timeouts, token limits, logging levels

### Weaknesses
- **No recent commits** — Last update Oct 15, 2025 (4 months stale)
- **Less feature-rich than 1rgs fork** — No Gemini support, no LiteLLM backbone
- **Requires always-on server** — Infrastructure overhead
- **Not git-native** — State in server process, not repo
- **No token tracking** — No cost monitoring or budget limits
- **Python dependencies** — Heavier than pure Node.js solutions
- **Limited community traction** — 1,995 stars vs 2,994 for 1rgs fork

### Community Sentiment

From web search:
- **Active on OSRepos** — Listed in awesome lists as a community solution
- **Third-party tool** — Not officially supported by Anthropic
- **No 2026 discussions found** — Search results show primarily documentation
- **Anthropic blocking concerns** — [Hacker News discussion](https://news.ycombinator.com/item?id=46625918) about Anthropic explicitly blocking OpenCode (may affect proxies)
- **Multiple similar tools exist** — claude_n_codex_api_proxy, CLIProxyAPI, AI-Worker-Proxy-2026 — suggests proxy demand but also fragmentation

### Compared To

- **1rgs/claude-code-proxy** — More stars (2,994), active development (Nov 2025), LiteLLM backbone, Gemini + Vertex AI support. **1rgs is superior.**
- **fuergaosi233 version** — Older codebase, simpler architecture, Python-only.
- **Native Claude Code** — No proxy needed if using Anthropic API directly.
- **OMC Autopilot** (CHOSEN) — Full autonomous execution, not just model switching.

**Differentiation:** This is a legacy option. 1rgs fork is more modern, better maintained, and more feature-rich. Unless you need Python specifically or prefer simpler code, choose 1rgs instead.

## Our Usage

**Status: Watching (but 1rgs preferred)**

**Why not chosen:**
1. **Stale maintenance** — 4 months since last commit (Oct 2025)
2. **1rgs fork is better** — More stars, recent updates, LiteLLM, Gemini support
3. **Doesn't fill Holy Grail gap** — Model switching doesn't advance autonomous workflow
4. **Infrastructure overhead** — Running a server adds complexity
5. **No workflow integration** — Doesn't help with spec → task → execute → notify

**Why watching:**
1. **Simpler codebase** — Pure Python, easier to fork/modify if needed
2. **Custom headers support** — Useful for proprietary API providers
3. **Docker support** — Easy deployment if we need proxy for Ralph runs

**When we'd use it:**
- If 1rgs fork breaks or introduces breaking changes
- If we need Python-based proxy for custom middleware (e.g., token logging)
- If we deploy Ralph on a server and need Ollama integration

**Score Breakdown (max 5.00):**
- Holy Grail alignment (30%): 1.5 — Supports Phase 3 but no autonomous features
- Simplicity (20%): 3.0 — Requires server, Python deps, env config
- Community trust (15%): 3.0 — 1,995 stars, but stale (Oct 2025 last commit)
- Ecosystem fit (15%): 2.5 — Works with Claude Code but no OpenSpec/Beads integration
- Cost efficiency (10%): 4.0 — Enables cheaper models, but no tracking
- Maturity (10%): 3.0 — Stable proxy, but less mature than 1rgs fork

**Weighted Score:** (1.5×0.30) + (3.0×0.20) + (3.0×0.15) + (2.5×0.15) + (4.0×0.10) + (3.0×0.10) = **2.85**

## Sources

- [GitHub: fuergaosi233/claude-code-proxy](https://github.com/fuergaosi233/claude-code-proxy)
- [Script by AI: Claude Code Proxy - Use Claude Code CLI with Any OpenAI-Compatible API](https://www.scriptbyai.com/claude-code-cli-proxy/)
- [Hacker News: Anthropic Explicitly Blocking OpenCode](https://news.ycombinator.com/item?id=46625918)
- [Awesome Ecosyste.ms: fuergaosi233/claude-code-proxy](https://awesome.ecosyste.ms/projects/github.com/fuergaosi233/claude-code-proxy)

---
*Last reviewed: 2026-02-07*
