# SuperClaude Framework

| Field | Value |
|-------|-------|
| GitHub | [SuperClaude-Org/SuperClaude_Framework](https://github.com/SuperClaude-Org/SuperClaude_Framework) |
| Stars | 20,700 |
| Last Commit | 2025-06-22 |
| Install | `pipx install superclaude && superclaude install` |
| Status | Watching |
| Category | Execution |
| Holy Grail Phase | Phase 1 (Foundation) |

## What It Does

Meta-programming configuration framework that transforms Claude Code into a structured development platform. Injects 30 slash commands, 16 specialized agents (PM, Security Engineer, Frontend Architect, etc.), 7 behavioral modes (Brainstorming, Orchestration, Token-Efficiency, etc.), and 8 optional MCP server integrations. Includes a deep research system with multi-hop reasoning and case-based learning across sessions.

## How It Works

- Behavioral instruction injection via CLAUDE.md-like configuration files
- Agents are domain-specialized prompts loaded on demand (not separate processes)
- MCP servers (Tavily, Context7, Sequential-Thinking, Playwright, etc.) are optional enhancements
- Deep research: autonomous web research with up to 5 iterative searches, quality scoring (0.0-1.0)
- v5.0 planned: TypeScript plugin system (no ETA)

## Evaluation

**Strengths:**
- Massive command library covering full dev lifecycle
- Large community (20.7k stars, 1.8k forks) means active maintenance
- Modular -- MCP servers optional, framework works standalone
- MIT licensed

**Weaknesses:**
- Claims "2-3x faster" and "30-50% fewer tokens" without benchmarks
- Plugin system delayed indefinitely (v5.0 "in development")
- Heavy configuration layer adds complexity over native Claude Code
- 52 open issues suggests active churn

**Community Sentiment:** Popular but polarizing. Some see it as the definitive Claude Code enhancement; others view it as over-engineered prompt injection.

**Compared To:** Oh-My-ClaudeCode (our chosen execution tool) is simpler and focused on autonomous loops. SuperClaude is broader but heavier. They could complement each other but the overlap is significant.

## Our Usage

Watching only. We already have Oh-My-ClaudeCode for execution and custom agents in `~/.claude/agents/`. SuperClaude's command library is interesting but risks conflicting with our existing setup. Revisit if v5.0 plugin system materializes.

## Sources

- [GitHub README](https://github.com/SuperClaude-Org/SuperClaude_Framework)

Last reviewed: 2026-02-06
