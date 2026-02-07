# Simone (claude-simone)

| Field | Value |
|-------|-------|
| GitHub | [Helmi/claude-simone](https://github.com/Helmi/claude-simone) |
| Stars | 542 |
| Last Commit | 2025-08-19 (v0.4.0 release) |
| Install | Universal installer via `hello-simone` |
| Status | Evaluated |
| Category | Tasks |
| Holy Grail Phase | Phase 3 (Task Tracking) |

## What It Does

Project and task management framework for AI-assisted development. Uses structured directory conventions and prompts so AI assistants understand project context, task dependencies, and work organization. Available as both a legacy directory-based system and a newer MCP server implementation.

## How It Works

- Two implementations: legacy (directory-based, production-tested) and MCP server (early access, v0.4.0)
- Directory structure provides project context to AI tools
- Structured prompts guide AI through task workflows
- Activity tracking for work documentation
- Universal installer (`hello-simone`) lets you choose between implementations
- TypeScript-based (81.8% TS, 14.6% JS)

## Evaluation

**Strengths:**
- Production-tested legacy system (used in real projects)
- MCP server adds programmatic access for agents
- Structured approach reduces AI hallucination about project state
- MIT licensed, 6 contributors

**Weaknesses:**
- Small community (542 stars, 49 forks)
- Split between legacy and MCP versions creates confusion
- MCP server still "early access" -- not stable
- Directory-convention approach is rigid and project-specific
- No cross-project support

**Community Sentiment:** Respected in the AI-dev niche. The legacy system works; the MCP version needs time.

**Compared To:** Beads (our chosen tool) is lighter and cross-project. Scopecraft (above) is more structured. Simone sits in between -- more opinionated than Beads, less feature-rich than Scopecraft.

## Our Usage

Evaluated, not adopting. The directory-based approach conflicts with our existing knowledge/ structure. Beads is a better fit for git-native cross-project task tracking. The MCP server concept is interesting but too early.

## Sources

- [GitHub README](https://github.com/Helmi/claude-simone)

Last reviewed: 2026-02-06
