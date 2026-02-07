# deep-plan

| Field | Value |
|-------|-------|
| GitHub | [piercelamb/deep-plan](https://github.com/piercelamb/deep-plan) |
| Stars | 12 |
| Last Commit | 2026-02-07 |
| Install | `/plugin marketplace add piercelamb/deep-plan` then `/plugin install deep-plan` |
| Status | Evaluated |
| Category | spec |
| Holy Grail Phase | 1-Spec |

## What It Does

Claude Code plugin that transforms vague requirements into detailed, production-ready implementation plans through AI-assisted research, stakeholder interviews, multi-LLM review, and TDD planning. Produces parallelizable section files ready for implementation by `/deep-implement` or human engineers.

## How It Works

**The Deep Trilogy Pipeline:**
```
/deep-project (decompose) → /deep-plan (plan) → /deep-implement (build)
```

**Workflow phases:**
```
Research → Interview → External LLM Review → TDD Plan → Section Splitting
```

1. **Research Phase**: Codebase exploration + web research for current best practices
2. **Interview Phase**: Structured Q&A to surface hidden requirements and edge cases
3. **Planning Phase**: Synthesize spec, generate implementation plan
4. **Review Phase**: External LLM review (Gemini/OpenAI or Opus subagent), integrate feedback, user review
5. **TDD Phase**: Generate test stubs mirroring plan structure
6. **Section Phase**: Split into self-contained implementation units, generate files in parallel via subagents

**Output structure:**
```
planning/
├── your-spec.md                 # Input
├── deep_plan_config.json        # Session state (resume)
├── claude-research.md           # Research findings
├── claude-interview.md          # Q&A transcript
├── claude-spec.md               # Synthesized spec
├── claude-plan.md               # ★ Primary deliverable
├── claude-integration-notes.md  # Feedback decisions
├── claude-plan-tdd.md           # Test stubs
├── reviews/
│   ├── gemini-review.md
│   ├── openai-review.md
│   └── opus-review.md
└── sections/
    ├── index.md
    ├── section-01-*.md
    └── section-02-*.md
```

**Commands:**
- `/deep-plan @path/to/your-spec.md` - Run full workflow
- Resume supported (detects existing artifacts, continues from appropriate step)

**Requirements:**
- Python 3.11+, uv package manager
- (Optional) `GEMINI_API_KEY` or `OPENAI_API_KEY` for external review
- If no external keys, review performed via Opus subagent

## Evaluation

### Strengths
- **Comprehensive planning workflow**: Research → Interview → Multi-LLM review → TDD → Sections
- **External validation**: Independent feedback from Gemini/OpenAI catches blind spots
- **TDD integration**: Test stubs generated before implementation
- **Section splitting**: Parallelizable, self-contained implementation units
- **Resume support**: Can recover from context limit interruptions
- **Part of trilogy**: Works with deep-project (decompose) and deep-implement (build)
- **Active development**: Commits in last 24h
- **Well documented**: Detailed README, blog posts, changelog

### Weaknesses
- **Token-intensive**: Research + multi-turn interview + multi-LLM review = high token cost
- **External API costs**: Gemini/OpenAI reviews incur costs on your accounts
- **Python dependency**: Requires uv + Python 3.11+ (not pure Claude Code)
- **Very young project**: Created Jan 2026, only 12 stars
- **No community validation**: No third-party blog posts or reviews yet
- **Opinionated workflow**: Can't skip phases, must follow full pipeline
- **30min time investment**: Too heavy for simple features
- **Requires /compact before starting**: Context window pressure

### Community Sentiment

Author's blog posts ([Building /deep-plan](https://pierce-lamb.medium.com/building-deep-plan-a-claude-code-plugin-for-comprehensive-planning-30e0921eb841), [The Deep Trilogy](https://pierce-lamb.medium.com/the-deep-trilogy-claude-code-plugins-for-writing-good-software-fast-33b76f2a022d), [What I Learned](https://pierce-lamb.medium.com/what-i-learned-while-building-a-trilogy-of-claude-code-plugins-72121823172b)) describe the motivation and technical lessons. No third-party reviews or HN/Reddit discussion found — too new. Broader 2026 planning discussions show external LLM review is a recognized pattern ([AddyOsmani workflow](https://addyosmani.com/blog/ai-coding-workflow/)).

### Compared To

- **vs OpenSpec**: OpenSpec generates structured specs with blocker surfacing; deep-plan does iterative multi-LLM review + TDD + sections
- **vs plan-critique**: plan-critique is simple file-based iteration; deep-plan is full orchestrated workflow
- **vs Spec Kit**: Spec Kit is prompt library; deep-plan is executable plugin with external LLM integration
- **vs native Plan Mode**: Shift+Tab plan mode previews execution; deep-plan generates production-ready section files

**Position**: Most comprehensive planning tool in catalogue. Overlaps with OpenSpec (Phase 1) but adds TDD + section splitting. High token/time cost. Best for complex, vague requirements where deep planning pays off.

## Our Usage

**Not chosen.**

**Why not:**
- OpenSpec (our chosen Phase 1 tool) surfaces blockers upfront, which is more valuable than multi-LLM review
- Token cost is too high for autonomous overnight runs (research + interview + multi-LLM review)
- 30min time investment doesn't fit our "move fast" greenfield projects preference
- Python + uv dependency adds complexity vs pure Claude Code tools
- Section splitting is interesting but we haven't validated if parallel implementation works with Claude Code

**What we liked:**
- TDD phase (test stubs before implementation)
- Section splitting concept (parallelizable implementation units)
- External LLM review (catches blind spots)
- Resume support (handles context limit gracefully)

**What would make us reconsider:**
- If OpenSpec proves insufficient for complex features
- If we adopt parallel implementation workflow (multiple Claude sessions working on sections)
- If token costs drop significantly (cheaper models for research/interview phases)
- If community validates the approach (100+ stars, blog posts from other users)

**If we need something similar:**
We'd likely adopt specific components (external LLM review, section splitting) as custom slash commands rather than the full deep-plan workflow.

**For now:**
- OpenSpec for Phase 1 (spec with blockers)
- Beads for Phase 2 (task breakdown)
- OMC for Phase 3 (execution with built-in review)

deep-plan tries to do all three phases, but we prefer specialized tools per phase.

## Sources

- [README](https://github.com/piercelamb/deep-plan)
- [Building /deep-plan - Medium](https://pierce-lamb.medium.com/building-deep-plan-a-claude-code-plugin-for-comprehensive-planning-30e0921eb841)
- [The Deep Trilogy - Medium](https://pierce-lamb.medium.com/the-deep-trilogy-claude-code-plugins-for-writing-good-software-fast-33b76f2a022d)
- [What I Learned - Medium](https://pierce-lamb.medium.com/what-i-learned-while-building-a-trilogy-of-claude-code-plugins-72121823172b)
- [TDD with Claude Code - DeepWiki](https://deepwiki.com/FlorianBruniaux/claude-code-ultimate-guide/10.1-tdd-with-claude-code)

---
*Last reviewed: 2026-02-07*
