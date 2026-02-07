# claude-code-proxy (1rgs)

| Field | Value |
|-------|-------|
| GitHub | [1rgs/claude-code-proxy](https://github.com/1rgs/claude-code-proxy) |
| Stars | 2,994 |
| Last Commit | 2025-11-19 |
| Install | `git clone https://github.com/1rgs/claude-code-proxy.git && cd claude-code-proxy && uv run uvicorn server:app --host 0.0.0.0 --port 8082` |
| Status | Watching |
| Score | 3.25 |
| Category | execution |
| Holy Grail Phase | 3-Run / Supporting |

## What It Does

A proxy server that translates Claude Code API requests to OpenAI or Gemini via LiteLLM, allowing you to run Claude Code CLI with alternative model providers (GPT-4o, Gemini 2.5, or direct Anthropic) without changing client code. Acts as a transparent API bridge with automatic model mapping.

## How It Works

**Setup:**
1. Clone repo and install dependencies via `uv`
2. Configure `.env` with API keys and model preferences
3. Run proxy server on localhost:8082
4. Point Claude Code to proxy: `ANTHROPIC_BASE_URL=http://localhost:8082 claude`

**Model Mapping:**
- `haiku` → `SMALL_MODEL` (default: gpt-4o-mini or gemini-2.0-flash)
- `sonnet` → `BIG_MODEL` (default: gpt-4o or gemini-2.5-pro)
- Automatically adds `openai/` or `gemini/` prefixes based on `PREFERRED_PROVIDER`

**Provider Options:**
- `openai` (default) — OpenAI models
- `google` — Gemini via API key or Vertex AI with ADC
- `anthropic` — Direct pass-through to Anthropic (transparent proxy mode)

**Features:**
- Streaming and non-streaming responses
- Function calling / tool use support
- Docker container available (`ghcr.io/1rgs/claude-code-proxy`)
- Custom model configuration via environment variables

## Evaluation

### Strengths
- **Zero code changes** — works with any Anthropic client via environment variable
- **Flexible provider options** — OpenAI, Gemini (API or Vertex), or Anthropic
- **LiteLLM backbone** — mature translation layer with broad model support
- **Docker support** — easy deployment with docker-compose
- **Transparent proxy mode** — can use real Anthropic models with proxy middleware
- **Active maintenance** — Docker images published, solid documentation

### Weaknesses
- **Requires always-on server** — adds infrastructure complexity
- **Not git-native** — state lives in server process, not in repo
- **Translation layer risk** — LiteLLM may not perfectly match Anthropic API semantics
- **Cost unclear** — no token usage tracking or cost comparison built-in
- **Limited to API translation** — doesn't add Ralph loop or autonomous features

### Community Sentiment

From web search:
- Part of a broader ecosystem of AI proxy solutions emerging in 2025-2026
- Documented on PyPI and OSRepos as a well-known community tool
- No specific user reviews found in search results (mostly documentation links)
- Similar tools exist (ariangibson fork, CCProxy, AI-Worker-Proxy-2026) suggesting healthy demand

### Compared To

- **fuergaosi233/claude-code-proxy** — Similar concept, older (last commit Oct 2025), less feature-rich
- **OMC Autopilot** (CHOSEN) — Full autonomous execution system, not just model switching
- **Superpowers** (Watching) — Claude Code extension pack, not a proxy
- **Native Claude Code** — Built-in multi-model support via API key, no proxy needed

**Differentiation:** This is purely infrastructure — swaps model backend without adding workflow features. Useful for cost optimization or Gemini testing, but doesn't directly advance Holy Grail phases.

## Our Usage

**Status: Watching**

**Why not chosen:**
1. **Doesn't fill Holy Grail gap** — We're building autonomous Ralph loops, not optimizing API costs
2. **Adds infrastructure** — Requires running a server, managing uptime, Docker overhead
3. **Native options exist** — Can use Anthropic API directly or test Gemini via official clients
4. **No workflow integration** — Doesn't help with spec → task → execute → notify → schedule

**When we'd reconsider:**
- If Claude API costs become prohibitive and Gemini 2.5 proves 80%+ equivalent
- If we need to A/B test multiple models on same prompts without code changes
- If a future tool in our stack (e.g., Beads or OMC) requires multi-provider support

**Score Breakdown (max 5.00):**
- Holy Grail alignment (30%): 2.0 — Supports Phase 3 execution but adds no autonomous features
- Simplicity (20%): 3.5 — Zero client changes, but requires server setup
- Community trust (15%): 3.5 — 2,994 stars, active repo, Docker images published
- Ecosystem fit (15%): 3.0 — Works with Claude Code but doesn't integrate with OpenSpec/Beads
- Cost efficiency (10%): 4.0 — Enables cheaper models, but no built-in cost tracking
- Maturity (10%): 3.5 — Stable for proxy use, but relatively new (Nov 2025 latest)

**Weighted Score:** (2.0×0.30) + (3.5×0.20) + (3.5×0.15) + (3.0×0.15) + (4.0×0.10) + (3.5×0.10) = **3.25**

## Sources

- [GitHub: 1rgs/claude-code-proxy](https://github.com/1rgs/claude-code-proxy)
- [PyPI: claude-code-proxy](https://pypi.org/project/claude-code-proxy/)
- [Vibe Sparking AI: claude-code-proxy OpenAI/Gemini Engine Swap](https://www.vibesparking.com/en/blog/ai/claude-code-proxy/2025-08-22-claude-code-proxy-openai-gemini-engine-swap/)
- [OSRepos: Use Anthropic Clients with OpenAI and Gemini Models](https://osrepos.com/repo/1rgs-claude-code-proxy)

---
*Last reviewed: 2026-02-07*
