# cc-sdd

| Field | Value |
|-------|-------|
| GitHub | [gotalab/cc-sdd](https://github.com/gotalab/cc-sdd) |
| Stars | N/A (new) |
| Last Commit | 2026 |
| Install | `npx cc-sdd@latest --claude --lang en` |
| Status | Watching |
| Category | spec |
| Holy Grail Phase | 1-Spec |

## What It Does

Kiro-style spec-driven development commands for Claude Code and 7 other AI coding tools. Enforces a structured Requirements → Design → Tasks workflow with validation gates between each phase. Cross-tool compatible: Claude Code, Codex, Cursor, Copilot, Gemini CLI, Windsurf, OpenCode. Supports 8 agents and 13 languages. Kiro-compatible specs are portable between tools.

## How It Works

Sequential workflow with validation:
1. **steering** — Set project direction and constraints
2. **spec-init** — Initialize spec structure
3. **validate-gap** — Verify requirements cover all gaps
4. **spec-design** — Create technical design
5. **validate-design** — Verify design addresses all requirements
6. **spec-tasks** — Break design into implementation tasks
7. **spec-impl** — Execute tasks from spec

The validation gates (`validate-gap`, `validate-design`) are the key differentiator — they catch issues between phases rather than letting them compound through to implementation.

## Evaluation

### Strengths
- Cross-tool compatible (8 tools) — specs aren't locked to Claude Code
- Validation gates catch issues early between phases
- Kiro-compatible spec format — portable industry standard
- Lightweight npm install via npx
- Multi-language support (13 languages)

### Weaknesses
- New project with unclear adoption (no star count visible)
- Cross-tool compatibility may mean less deep Claude Code integration
- Competes with OpenSpec (already ★ CHOSEN)
- Less established community than OpenSpec or Spec Kit

### Community Sentiment

Limited due to newness. The Kiro-compatible angle gets attention from developers already using Kiro or wanting portable specs. The validation gates concept generates positive discussion.

### Compared To

- **OpenSpec** — Our ★ CHOSEN tool. Brownfield-first, more established (22.5K stars). cc-sdd's unique advantage: validation gates and cross-tool portability.
- **Spec Kit** — Much heavier framework. cc-sdd is lighter but less comprehensive.
- **spec-workflow-mcp** — MCP-based with dashboard vs cc-sdd's CLI/file-based approach.

## Our Usage

Watching. The validation gates are the feature OpenSpec doesn't have. Worth evaluating if: (1) cross-tool portability becomes important, (2) spec quality issues suggest we need more validation between phases. For now, OpenSpec remains ★ CHOSEN.

## Sources

- [GitHub: gotalab/cc-sdd](https://github.com/gotalab/cc-sdd)
- [npm: cc-sdd](https://www.npmjs.com/package/cc-sdd)

---
*Last reviewed: 2026-02-07*
