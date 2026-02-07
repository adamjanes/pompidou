# prd-generator

| Field | Value |
|-------|-------|
| GitHub | [dredozubov/prd-generator](https://github.com/dredozubov/prd-generator) |
| Stars | 12 |
| Last Commit | 2026-01 |
| Install | `git clone https://github.com/dredozubov/prd-generator.git ~/.claude/plugins/prd-generator` |
| Status | Evaluated |
| Category | spec |
| Holy Grail Phase | 1-Spec (supporting) |

## What It Does

prd-generator is a Claude Code plugin that generates comprehensive Product Requirements Documents from conversation context. It is not a spec-driven development framework — it is a one-shot document generator. You discuss requirements conversationally with Claude, then invoke `/create-prd` and it produces a structured PRD with 15 standard sections. The value proposition is speed: capture requirements in a structured format in seconds rather than writing a PRD from scratch. It serves as a quick on-ramp to more comprehensive SDD tools like OpenSpec or BMAD.

## How It Works

### Commands

| Command | Purpose |
|---------|---------|
| `/create-prd [output_file]` | Generate a complete PRD from conversation context |

That is the entire interface. One command, one output.

### Output Sections

The generated PRD includes:

1. Executive Summary
2. Problem Statement
3. User Personas
4. User Stories
5. MVP Scope
6. Feature Requirements
7. Non-Functional Requirements
8. Architecture Patterns
9. Technology Recommendations
10. API Documentation
11. Security Specifications
12. Success Metrics
13. Implementation Phases
14. Risk Assessment
15. Appendix

### Installation

Two options:

**Global (recommended):**
```bash
git clone https://github.com/dredozubov/prd-generator.git ~/.claude/plugins/prd-generator
```
Then enable in Claude Code settings.

**Per-project:**
Clone into the project directory and reference in the project's `.claude/` configuration.

### Technical Details

- 3 total commits, MIT license
- Author: Denis Redozubov (@dredozubov)
- Pure Claude Code plugin — no external dependencies
- Works by injecting a system prompt that instructs Claude to extract requirements from the conversation context and format them into the 15-section template

## Evaluation

### Strengths

- **Dead simple** — One command, one output. No learning curve, no configuration, no workflow to internalize.
- **Quick capture** — Turns a rambling planning conversation into a structured document in seconds. Useful when you have been discussing requirements and want to capture them before they are lost.
- **Standard format** — The 15-section PRD template covers all the bases. Good for client-facing documentation or handoff to another developer.
- **Lightweight** — A plugin, not a framework. Does not impose any workflow on your project. Install it, use it when you need it, ignore it otherwise.
- **Complementary** — Works well as an input to OpenSpec (`/opsx:new` with the PRD as context) or BMAD (feed the PRD to the PM agent).

### Weaknesses

- **One-shot only** — Generates the PRD and that is it. No lifecycle management, no versioning, no drift detection. The document becomes stale the moment you change direction.
- **No iteration** — Cannot update or refine a previously generated PRD. You regenerate from scratch each time.
- **Tiny community** — 12 stars, 3 commits. Effectively a solo developer's side project. No guarantee of maintenance or updates.
- **Not a spec tool** — Does not manage specs, changes, tasks, or implementation. It is a document generator, not a development framework. Calling it an "SDD tool" would be misleading.
- **Claude Code only** — No support for Cursor, Windsurf, Copilot, or other AI coding assistants. Locked to one ecosystem.
- **Plugin system dependency** — Relies on Claude Code's plugin architecture, which is still evolving. Breaking changes in the plugin system could break prd-generator.

### Community Sentiment

Minimal community presence due to the small star count. Referenced in the "awesome-claude-code" curated list, which is how most people discover it. No blog posts, reviews, or forum discussions found. The tool is useful but niche — most developers who need PRD generation either write their own prompt or use a more comprehensive tool like BMAD's PM agent.

### Compared To

- **vs OpenSpec** ([`spec/openspec.md`](openspec.md)) — Entirely different scope. prd-generator creates a single document; OpenSpec manages an ongoing spec lifecycle with proposals, delta specs, design docs, and task checklists. Use prd-generator to capture initial requirements, then feed into OpenSpec for development.
- **vs BMAD Method** ([`spec/bmad-method.md`](bmad-method.md)) — BMAD's PM agent produces PRDs as one step in a much larger planning process. If you only need a PRD, prd-generator is faster and lighter. If you need PRD + architecture + stories + tests, use BMAD.
- **vs Spec Kit** ([`spec/spec-kit.md`](spec-kit.md)) — Spec Kit's `/speckit.specify` phase produces a spec document that overlaps with a PRD. prd-generator is faster for a one-time document but offers no downstream workflow. Spec Kit's spec feeds directly into planning and task generation.
- **vs prd-dxt** ([Njengah/prd-dxt](https://github.com/Njengah/prd-dxt)) — A similar concept packaged as a Claude DXT app (MCP server) that generates PRDs from README files. Different mechanism (MCP vs plugin) but similar output. prd-generator works from conversation context, prd-dxt works from existing documentation.
- **vs prd-taskmaster** ([anombyte93/prd-taskmaster](https://github.com/anombyte93/prd-taskmaster)) — Extends the PRD concept with taskmaster integration for task tracking. More feature-complete but also more complex. If you need PRD + tasks, prd-taskmaster is a better fit.

## Our Usage

**Status: Evaluated, potential supplementary tool.**

We evaluated prd-generator as a quick requirements capture tool. It fills a narrow but useful gap: when Adam is describing what he wants in conversation, `/create-prd` can capture that as a structured document before it is lost to chat history. The generated PRD can then be fed into OpenSpec as the starting point for a change.

**Not currently installed.** Low priority given that OpenSpec's `/opsx:explore` and `/opsx:new` commands achieve similar requirements capture within the SDD workflow itself. Would install if we find ourselves frequently losing requirements from conversations.

**If we install:**
```bash
git clone https://github.com/dredozubov/prd-generator.git ~/.claude/plugins/prd-generator
```
Then enable in `~/.claude/settings.json` or per-project `.claude/settings.local.json`.

## Sources

- [GitHub Repository](https://github.com/dredozubov/prd-generator)
- [awesome-claude-code (references prd-generator)](https://github.com/hesreallyhim/awesome-claude-code)
- [Related: prd-dxt (MCP-based alternative)](https://github.com/Njengah/prd-dxt)
- [Related: prd-taskmaster (PRD + task integration)](https://github.com/anombyte93/prd-taskmaster)

---
*Last reviewed: 2026-02-07*
