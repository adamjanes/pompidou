# Claude Code Router

| Field | Value |
|-------|-------|
| GitHub | [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router) |
| Stars | 27,380 |
| Last Commit | 2026-02-07 |
| Install | `npm install -g @musistudio/claude-code-router` |
| Status | Evaluated |
| Score | 3.33 / 5.00 |
| Category | orchestration |
| Holy Grail Phase | Supporting |

## What It Does

Claude Code Router is a routing proxy that sits between Claude Code and model providers, enabling dynamic model switching, multi-provider support, and custom request/response transformations. It allows you to use Claude Code as a foundation while routing requests to OpenRouter, DeepSeek, Ollama, Gemini, and other providers based on task type (background, thinking, long context, web search). Think of it as a smart traffic router that sends different Claude Code tasks to the most appropriate and cost-effective model.

## How It Works

**Installation:**
```bash
npm install -g @musistudio/claude-code-router
ccr code  # Launches Claude Code with routing enabled
```

**Key concepts:**
- **Model routing**: Configure which model handles different scenarios (default, background, think, longContext, webSearch, image)
- **Multi-provider support**: Supports 10+ providers including OpenRouter, DeepSeek, Ollama, Gemini, Volcengine, SiliconFlow, ModelScope, Dashscope
- **Transformers**: Middleware that adapts requests/responses for different provider APIs (deepseek, gemini, openrouter, tooluse, reasoning, etc.)
- **Dynamic switching**: Use `/model provider,model_name` command to change models mid-session
- **Custom routing**: Write your own router function in JavaScript for complex routing logic
- **Subagent routing**: Specify models per subagent with `<CCR-SUBAGENT-MODEL>provider,model</CCR-SUBAGENT-MODEL>` tags

**Configuration** (`~/.claude-code-router/config.json`):
```json
{
  "Providers": [
    {
      "name": "openrouter",
      "api_base_url": "https://openrouter.ai/api/v1/chat/completions",
      "api_key": "sk-xxx",
      "models": ["anthropic/claude-sonnet-4", "google/gemini-2.5-pro-preview"],
      "transformer": { "use": ["openrouter"] }
    }
  ],
  "Router": {
    "default": "deepseek,deepseek-chat",
    "background": "ollama,qwen2.5-coder:latest",
    "think": "deepseek,deepseek-reasoner",
    "longContext": "openrouter,google/gemini-2.5-pro-preview",
    "longContextThreshold": 60000,
    "webSearch": "gemini,gemini-2.5-flash"
  }
}
```

**Workflow:**
1. Configure providers and routing rules in `config.json`
2. Run `ccr code` to start Claude Code with routing
3. Claude Code requests are intercepted and routed based on your configuration
4. Use `ccr ui` for visual configuration editing
5. Use `ccr model` for interactive CLI model switching

**Unique features:**
- **GitHub Actions integration**: Run Claude Code in CI/CD with `NON_INTERACTIVE_MODE: true`
- **Preset management**: Export/install/share routing configurations
- **Activate command**: `eval "$(ccr activate)"` sets environment variables for SDK integration
- **UI mode**: Web-based configuration editor via `ccr ui`
- **Statusline integration**: Built-in statusline support (beta)

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 3 | 0.90 |
| Simplicity | 20% | 2 | 0.40 |
| Community trust | 15% | 3 | 0.45 |
| Ecosystem fit | 15% | 4 | 0.60 |
| Cost efficiency | 10% | 5 | 0.50 |
| Maturity | 10% | 3 | 0.30 |
| **Composite** | | | **3.15** |

### Strengths
- Unlocks cost-efficient model routing (use Haiku for background, DeepSeek for reasoning, Gemini for long context)
- Multi-provider support reduces vendor lock-in and API rate limits
- Dynamic model switching via `/model` command allows per-task optimization
- Transformer system makes incompatible APIs work with Claude Code
- GitHub Actions support enables CI/CD automation with any provider
- UI mode makes configuration accessible to non-technical users
- Preset system enables configuration sharing across teams
- Environment variable activation integrates with Agent SDK apps
- Built-in statusline for runtime monitoring

### Weaknesses
- Complex configuration surface area — 5 routing types, 15+ transformers, custom routers
- Recent 2.0.0 release introduced breaking changes and bugs (routing failures, Docker issues, token-speed plugin errors)
- README frequently out of date relative to actual behavior
- `ccr code` command fails to properly set `ANTHROPIC_BASE_URL` for some users, causing requests to hit Anthropic API instead of proxy
- Docker container path mismatches (`/app/.claude-code-router` vs `/root/.claude-code-router`)
- Requires understanding of provider APIs, transformer options, and routing logic
- No built-in cost tracking or budget limits (you're routing to various APIs with different pricing)
- Maturity concerns — rapid-fire bug fixes in January 2026 suggest instability

### Community Sentiment

Community feedback is mixed to negative for the 2.0.0 release. The project has 27,380 stars and 2,100 forks, indicating significant interest, but recent issues dominate user discussions. Users report that the `ccr code` command starts the router service but fails to set the `ANTHROPIC_BASE_URL` environment variable before launching Claude Code, resulting in requests bypassing the proxy entirely. Docker users encounter configuration path mismatches where documentation instructs mounting to `/app/.claude-code-router` but the container actually writes to `/root/.claude-code-router`, causing user configurations to be ignored. The repository has seen rapid-fire fixes in January 2026 (restart errors, dockerfile issues, token-speed plugin bugs, preset installation errors), suggesting reactive rather than proactive maintenance. Multiple reports indicate the README is out of date. Positive sentiment exists around the cost-saving potential and multi-provider flexibility, but current usability issues overshadow those benefits. The project is actively maintained but appears to be in a turbulent phase.

### Compared To

- **Oh My ClaudeCode** (`catalogue/orchestration/oh-my-claudecode.md`): OMC provides built-in intelligent model routing (Haiku/Sonnet/Opus) without configuration. Claude Code Router requires manual routing setup but supports more providers. OMC is simpler; CCR is more flexible.
- **Native Claude Code model selection**: Claude Code natively supports switching between Claude models (Haiku, Sonnet, Opus) via settings. CCR extends this to non-Anthropic models (DeepSeek, Gemini, local Ollama).
- **MCP servers for other models**: You could build an MCP server for each provider instead of using a proxy. CCR centralizes routing logic in one place rather than per-provider MCP implementations.

## Our Usage

**Not currently chosen.** The routing proxy concept is valuable for cost optimization (route background tasks to Haiku or DeepSeek, thinking tasks to Opus or DeepSeek-R1, long context to Gemini 2.5). However:

1. **Recent instability** — 2.0.0 release bugs and frequent patches suggest the project isn't production-ready yet
2. **Configuration complexity** — transformers, custom routers, and multi-provider auth add cognitive overhead
3. **OMC provides model routing** — Oh My ClaudeCode already does intelligent model routing (Haiku/Sonnet/Opus) without configuration
4. **Anthropic models sufficient** — Haiku/Sonnet 4.5/Opus 4.6 cover our current needs; DeepSeek/Gemini routing is overkill unless we hit budget constraints

**Status: Watching.** If Anthropic API costs become prohibitive or if we need 1M+ context windows regularly, Claude Code Router would enable cost-effective DeepSeek or Gemini usage. Re-evaluate once 2.x stabilizes (3-6 months) or if Adam's API costs exceed $500/month.

**Alternative approach:** Use OMC's built-in routing for now. If we need non-Anthropic models, test Claude Code Router in a side project before adopting for main workflows.

## Sources

- [GitHub README](https://github.com/musistudio/claude-code-router)
- [Claude Code Router on ClaudeLog](https://claudelog.com/claude-code-mcps/claude-code-router/)
- [Project Blog](https://musistudio.github.io/claude-code-router/blog/)
- [Issues and Feedbacks](https://zread.ai/musistudio/claude-code-router/7-issues-and-feedbacks)

---
*Last reviewed: 2026-02-07*
