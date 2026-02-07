# Claude Swarm

| Field | Value |
|-------|-------|
| GitHub | [parruda/claude-swarm](https://github.com/parruda/claude-swarm) |
| Stars | 1,600 |
| Last Commit | Recent (active) |
| Install | `gem install swarm_cli` |
| Status | Evaluated |
| Category | Orchestration |
| Holy Grail Phase | Phase 4 (Autonomous Execution) |

## What It Does

Ruby-based multi-agent orchestration framework. Agents with specialized roles collaborate within a single process, delegating subtasks to teammates. Includes persistent memory with FAISS-based semantic search (SwarmMemory) and a CLI for interactive or non-interactive execution.

## How It Works

- Three components: SwarmSDK (framework), SwarmCLI (interface), SwarmMemory (persistence)
- Single Ruby process -- no multi-process complexity
- Agents defined via YAML or Ruby DSL with roles, tools, and delegation rules
- 11 built-in tools (Read, Write, Edit, Bash, etc.)
- FAISS indexing with local ONNX embeddings for semantic search across memory
- Node workflows for multi-stage pipelines with dependency management
- Cost tracking and structured logging built in
- Works with Claude, OpenAI, Gemini via RubyLLM

## Evaluation

**Strengths:**
- Single-process architecture is simpler than multi-process alternatives
- Semantic memory via FAISS is genuinely useful for long-running agents
- Multi-LLM support (not locked to Anthropic)
- Clean YAML configuration
- Role-based permissions for security

**Weaknesses:**
- Ruby dependency -- our stack is JS/TS/Python, adding Ruby is friction
- Decoupled from Claude Code entirely -- loses native tool access
- 1,600 stars is moderate; Ruby AI community is smaller
- No native Claude Code integration (can't use hooks, commands, etc.)

**Community Sentiment:** Well-regarded in the Ruby community. Less relevant to Claude Code-centric workflows.

**Compared To:** Native Claude Code subagents (our chosen approach) stay within the ecosystem. Oh-My-ClaudeCode adds autonomous execution without changing the runtime. Claude Swarm is powerful but requires buying into a Ruby-based parallel system.

## Our Usage

Evaluated, not adopting. The Ruby dependency and decoupling from Claude Code are dealbreakers. The FAISS semantic memory concept is worth watching -- if native Claude Code adds something similar, that would be ideal. For now, native subagents + Oh-My-ClaudeCode cover our orchestration needs.

## Sources

- [GitHub README](https://github.com/parruda/claude-swarm)

Last reviewed: 2026-02-06
