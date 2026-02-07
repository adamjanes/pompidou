# Ralph Starter

| Field | Value |
|-------|-------|
| GitHub | [rubenmarcus/ralph-starter](https://github.com/rubenmarcus/ralph-starter) |
| Stars | 5 |
| Last Commit | 2026-01-21 |
| Install | `npm install -g ralph-starter` or `npx ralph-starter` |
| Status | Evaluated |
| Category | execution |
| Holy Grail Phase | 3-Run |

## What It Does

Ralph Starter is a CLI tool that automates project creation by pulling specifications from multiple sources (GitHub, Linear, Notion, Figma) and executing autonomous AI coding loops. It bridges planning tools and implementation through an interactive wizard, 16+ workflow presets, and built-in cost tracking. The unique value proposition is the integration breadth — it can ingest specs from wherever they live — and the cost tracking feature, which is absent from most Ralph implementations.

## How It Works

**Interactive wizard** guides users through project setup, or run headless with `ralph-starter run [task]`. The tool generates a Ralph Playbook on init:

| File | Purpose |
|------|---------|
| `AGENTS.md` | Agent instructions and validation commands |
| `PROMPT_plan.md` | Planning prompt template |
| `PROMPT_build.md` | Building prompt template |
| `IMPLEMENTATION_PLAN.md` | Prioritized task list (checkbox-based) |
| `specs/` | Specification files pulled from integrations |

**Key commands:**
```bash
ralph-starter              # Launch interactive wizard
ralph-starter run [task]   # Execute autonomous coding loop
ralph-starter init         # Initialize Ralph Playbook files
ralph-starter plan         # Generate implementation plan from specs
ralph-starter presets      # List 16+ workflow templates (TDD, debug, code review, etc.)
ralph-starter integrations # Manage GitHub/Linear/Notion/Figma sources
ralph-starter mcp          # Start as MCP server for Claude Desktop
```

**Safety features:** Circuit breaker stops failed loops after configurable thresholds. Backpressure validation runs tests/linting/build after each iteration. Rate limiting controls API call frequency. Cost tracking estimates tokens across Claude and GPT-4 models.

## Evaluation

### Strengths
- Broadest integration set of any Ralph implementation (GitHub, Linear, Notion, Figma, URL, PDF)
- Built-in cost tracking with per-model token estimates — rare and valuable
- 16+ workflow presets cover common scenarios out of the box
- Interactive wizard lowers barrier for non-developers
- MCP server mode enables use from Claude Desktop
- Circuit breaker and backpressure provide sensible safety defaults

### Weaknesses
- Only 5 stars — very early/small community, limited battle-testing
- Heavy feature set for what is fundamentally a loop tool — risk of over-engineering
- pnpm-based TypeScript project adds dependency complexity vs. a Bash script
- Integration with Figma/Notion adds attack surface and maintenance burden
- No evidence of adoption beyond the author

### Community Sentiment

Minimal community footprint. 5 stars, 0 forks, 10 PRs (likely author-only). The tool has a polished README and documentation site (ralphstarter.ai), suggesting intent to grow, but no visible external adoption yet. The cost tracking feature is the most commonly cited differentiator in discussions about Ralph tools.

### Compared To

- **Oh My ClaudeCode** (`catalogue/execution/oh-my-claudecode.md`): OMC focuses on execution modes and agent specialization. Ralph Starter focuses on spec ingestion and project bootstrapping. Different stages of the workflow — Ralph Starter feeds into where OMC takes over.
- **Ralph Plugin** (`catalogue/execution/ralph-plugin.md`): Ralph Plugin is a minimal loop. Ralph Starter wraps a similar loop with integrations, presets, and cost tracking.
- **Smart Ralph** (`catalogue/execution/smart-ralph.md`): Both bridge spec-to-execution, but Smart Ralph generates specs from feature requests while Ralph Starter ingests specs from external tools.

## Our Usage

**Not chosen.** The integration breadth is impressive but adds complexity we don't need — we already manage specs via OpenSpec and tasks via Beads. The cost tracking feature is genuinely useful but can be replicated with OMC's `omc cost` commands. Worth revisiting if we need a spec ingestion pipeline from Linear or Notion.

## Sources

- [GitHub README](https://github.com/rubenmarcus/ralph-starter)
- [Documentation](https://ralphstarter.ai)

---
*Last reviewed: 2026-02-06*
