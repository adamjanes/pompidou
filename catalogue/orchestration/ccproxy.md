# ccproxy (Claude Code Proxy)

| Field | Value |
|-------|-------|
| GitHub | [starbaser/ccproxy](https://github.com/starbaser/ccproxy) |
| Stars | 162 |
| Last Commit | 2026-02-06 |
| Install | `uv tool install claude-ccproxy --with 'litellm[proxy]'` |
| Status | Evaluated |
| Category | orchestration |
| Holy Grail Phase | Supporting |

## What It Does

ccproxy unlocks multi-provider LLM usage in Claude Code by intercepting Claude's API requests through a LiteLLM proxy server and routing them to different models (OpenAI, Gemini, Perplexity, or other Claude models) based on intelligent rules — token count, tool usage, thinking mode, or custom logic. You keep unlimited Claude for standard coding, send large contexts to Gemini's 2M token window, route web searches to Perplexity, and use cheaper Haiku for background tasks, all while Claude Code thinks it's talking to the standard Anthropic API.

## How It Works

**Architecture:**
```
Claude Code → ccproxy (localhost:4000) → LiteLLM Proxy → Provider API
                                              ↓
                                         Rule evaluation
                                         Model routing
                                         OAuth forwarding
```

**Installation:**
```bash
# Install with uv (recommended)
uv tool install claude-ccproxy --with 'litellm[proxy]'

# Or with pip (same virtual environment required)
pip install git+https://github.com/starbased-co/ccproxy.git
pip install 'litellm[proxy]'

# Setup
ccproxy install      # Creates ~/.ccproxy/ccproxy.yaml and config.yaml
ccproxy start --detach
ccproxy run claude   # Or set ANTHROPIC_BASE_URL=http://localhost:4000
```

**Configuration Files:**

**`ccproxy.yaml`** — Rules and hooks:
```yaml
ccproxy:
  debug: true

  # OAuth token sources (loaded at startup)
  oat_sources:
    anthropic: "jq -r '.claudeAiOauth.accessToken' ~/.claude/.credentials.json"

  # Hooks (order matters)
  hooks:
    - ccproxy.hooks.rule_evaluator    # Labels requests with matching rule
    - ccproxy.hooks.model_router      # Routes to model based on label
    - ccproxy.hooks.forward_oauth     # Forwards OAuth token
    - ccproxy.hooks.extract_session_id # Extracts session ID for LangFuse

  # Rules (evaluated top-to-bottom, first match wins)
  rules:
    - name: token_count
      rule: ccproxy.rules.TokenCountRule
      params:
        - threshold: 60000
    - name: web_search
      rule: ccproxy.rules.MatchToolRule
      params:
        - tool_name: WebSearch
    - name: background
      rule: ccproxy.rules.MatchModelRule
      params:
        - model_name: claude-3-5-haiku-20241022
    - name: think
      rule: ccproxy.rules.ThinkingRule
```

**`config.yaml`** — LiteLLM model deployments:
```yaml
model_list:
  # Aliases (rule labels map here)
  - model_name: default
    litellm_params:
      model: claude-sonnet-4-5-20250929

  - model_name: think
    litellm_params:
      model: claude-opus-4-5-20251101

  - model_name: token_count
    litellm_params:
      model: gemini/gemini-2.0-flash-exp  # 2M token context

  - model_name: web_search
    litellm_params:
      model: perplexity/sonar-pro

  # Deployments (actual API configs)
  - model_name: claude-sonnet-4-5-20250929
    litellm_params:
      model: anthropic/claude-sonnet-4-5-20250929
      api_base: https://api.anthropic.com

  - model_name: gemini/gemini-2.0-flash-exp
    litellm_params:
      model: vertex_ai/gemini-2.0-flash-exp
      # GCP credentials via environment
```

**Routing Flow:**
```mermaid
graph LR
    Request --> RuleEvaluator
    RuleEvaluator --> |"token_count (65K tokens)"| TokenCountRule
    TokenCountRule --> |"label: token_count"| ModelRouter
    ModelRouter --> |"rewrite model to 'token_count'"| LiteLLM
    LiteLLM --> |"select deployment"| Gemini2MContext
```

**Built-in Rules:**
- `MatchModelRule` — Routes based on requested model name (e.g., haiku → cheaper provider)
- `ThinkingRule` — Routes requests with `thinking: {enabled: true}` to Opus
- `TokenCountRule` — Routes large contexts (>60K tokens) to Gemini 2M window
- `MatchToolRule` — Routes specific tool usage (e.g., WebSearch → Perplexity)

**Custom Rules:**
You can write custom rules in Python and reference them in `ccproxy.yaml`.

**Hooks:**
- `rule_evaluator` — Labels requests with first matching rule
- `model_router` — Rewrites model field based on label
- `forward_oauth` — Forwards Claude OAuth tokens to providers (multi-provider with custom User-Agent)
- `forward_apikey` — Forwards `x-api-key` header
- `extract_session_id` — Extracts session ID for LangFuse tracking
- `capture_headers` — Logs HTTP headers (with redaction)

## Evaluation

### Strengths
- **Multi-provider routing** — Use unlimited Claude + Gemini + Perplexity + OpenAI in single session
- **Cost optimization** — Route background tasks to Haiku, large contexts to Gemini (cheaper than Opus)
- **Intelligent rules** — Token count, tool usage, thinking mode, custom logic
- **OAuth forwarding** — Reuses Claude Code's auth (no separate API keys needed for Anthropic)
- **LiteLLM integration** — Mature proxy with 100+ provider support
- **Active development** — v1.2.0 released 2026-02-06
- **uv tool install** — Modern Python packaging (editable mode for local dev)
- **Auto-regenerated handler** — `ccproxy.py` regenerated on `ccproxy start` (no manual sync)
- **LangFuse tracking** — Session ID extraction for observability

### Weaknesses
- **⚠️ Main branch unstable** — "As of 2026-02-05, current release may not be stable for ALL Claude Code versions"
- **Python dependency** — Requires Python, uv/pip, and LiteLLM in same environment
- **Installation complexity** — uv tool install + config setup + environment variables
- **ImportError risk** — LiteLLM and ccproxy must be in same virtual environment (common failure mode)
- **Configuration split** — `ccproxy.yaml` (rules) + `config.yaml` (deployments) is fragmented
- **Rule order matters** — First match wins; unclear behavior if rules overlap
- **Limited documentation** — `docs/configuration.md` exists but not comprehensive
- **Breaking changes** — Project admits stability issues in main branch
- **Multi-provider API costs** — Routing to OpenAI, Gemini, Perplexity adds costs beyond Claude subscription

### Community Sentiment

**General feedback (2026):**
- **Medium (Feb 2026):** ["Claude Code in the Enterprise — Model Mapping for LLM Proxies"](https://medium.com/@trevor00/claude-code-in-the-enterprise-model-mapping-for-llm-proxies-b0d8069c6aa3) — Highlights ccproxy as enterprise solution for model routing.
- **Medium (Dec 2025):** ["Using Local LLM Models with Claude Code: A Step-by-Step Guide with ccproxy-tools"](https://medium.com/codex/using-local-llm-models-with-claude-code-a-step-by-step-guide-with-ccproxy-tools-b3551a139d81) — Shows local model integration.
- **LiteLLM docs:** [Claude Code Quickstart](https://docs.litellm.ai/docs/tutorials/claude_responses_api) and [Use Claude Code with Non-Anthropic Models](https://docs.litellm.ai/docs/tutorials/claude_non_anthropic_models) — Official LiteLLM docs reference ccproxy pattern.

**Key insight:** ccproxy is recognized as the **primary solution for multi-provider routing in Claude Code**. Enterprise use cases (model mapping, cost optimization) are driving adoption.

**Concerns:**
- **Stability warnings** — Main branch instability noted in README
- **Setup friction** — uv/pip + LiteLLM + environment config is complex
- **ImportError issues** — Common failure mode (LiteLLM can't import ccproxy handler)

**Discord community:** Project maintainer runs [starbased HQ Discord](https://discord.gg/HDuYQAFsbw) for support and setup sharing.

### Compared To

| vs. Native Claude Code | ccproxy Advantage | Native Advantage |
|------------------------|------------------|------------------|
| Model Selection | Route to any provider (Gemini, OpenAI, Perplexity) | Zero setup |
| Cost Optimization | Use cheaper models for background tasks | No proxy overhead |
| Large Contexts | Send 100K+ tokens to Gemini 2M window | Simpler architecture |
| Setup | Requires Python + LiteLLM + config | Works out of box |

**When to use ccproxy:**
- You need **multi-provider routing** (Gemini for large contexts, Perplexity for search)
- You want **cost optimization** (Haiku for background, Sonnet for main work)
- You're okay with **Python dependency and config complexity**
- You have **enterprise budget constraints** (maximize free tier across providers)

**When NOT to use:**
- You're happy with **Claude models only**
- You want **zero external dependencies**
- You need **production stability** (main branch admits instability)

## Our Usage

**Status: Evaluated, Not Chosen**

**Why we're not using it:**
1. **Stability concerns** — Main branch admits instability; we need reliable tools for client work
2. **Claude models are sufficient** — We use Opus for complex work, Sonnet for standard work, Haiku for background tasks; no need for Gemini/OpenAI
3. **Setup complexity** — Python + uv + LiteLLM + config is overhead for uncertain benefit
4. **Cost is not a bottleneck** — Adam's unlimited Claude subscription covers our needs; multi-provider cost optimization is premature

**Potential future use:**
- If we need **Gemini's 2M token context** for large codebase analysis (OpenSpec on massive repos)
- If we implement **cost tracking** and discover Opus usage is too expensive (route background tasks to Haiku via ccproxy)
- If **Perplexity integration** becomes valuable (web search routing)
- Once project stabilizes (wait for v2.0 or stable release)

**Key takeaway:** This is the **right tool for multi-provider routing**, but we don't need that yet. For autonomous agents with **heavy background task volume**, ccproxy's cost optimization (Haiku for background, Opus for complex) becomes **compelling**. For Adam's supervised workflow, it's **overkill**.

**Watch this:** If we scale to autonomous Ralph Loop (100+ iterations/day), revisit for cost optimization.

## Sources

- [README](https://github.com/starbaser/ccproxy)
- [ccproxy Documentation](https://github.com/starbased-co/ccproxy/blob/main/docs/configuration.md)
- [Claude Code in the Enterprise — Model Mapping for LLM Proxies](https://medium.com/@trevor00/claude-code-in-the-enterprise-model-mapping-for-llm-proxies-b0d8069c6aa3)
- [Using Local LLM Models with Claude Code with ccproxy-tools](https://medium.com/codex/using-local-llm-models-with-claude-code-a-step-by-step-guide-with-ccproxy-tools-b3551a139d81)
- [LiteLLM: Claude Code Quickstart](https://docs.litellm.ai/docs/tutorials/claude_responses_api)
- [LiteLLM: Use Claude Code with Non-Anthropic Models](https://docs.litellm.ai/docs/tutorials/claude_non_anthropic_models)

---
*Last reviewed: 2026-02-07*
