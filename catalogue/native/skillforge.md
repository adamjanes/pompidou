# SkillForge

| Field | Value |
|-------|-------|
| GitHub | [tripleyak/SkillForge](https://github.com/tripleyak/SkillForge) |
| Stars | 503 |
| Last Commit | 2026-02-06 |
| Install | `cp -r skillforge ~/.claude/skills/` |
| Status | Watching |
| Category | native |
| Holy Grail Phase | Supporting |

## What It Does

SkillForge (formerly SkillCreator) is a meta-skill for generating best-in-class Claude Code skills through a rigorous 4-phase architecture: Deep Analysis (11 thinking lenses), Specification (XML template), Generation (autonomous build), and Multi-Agent Synthesis (unanimous approval panel). It includes Phase 0 universal triage that analyzes any input and routes to USE_EXISTING, IMPROVE_EXISTING, CREATE_NEW, or COMPOSE actions.

## How It Works

**Phase 0: Universal Skill Triage**
```
User: "create a skill for automated code review"
→ SkillForge analyzes input
→ Routes to CREATE_NEW (no match found)
→ Proceeds to Phase 1-4

User: "help me debug this TypeError"
→ Analyzes against installed skills
→ Routes to USE_EXISTING (debugging skills found)
→ Recommends matching skills

User: "do I have a skill for Excel?"
→ Searches by concept (spreadsheets)
→ Returns matches or CREATE_NEW
```

**Phase 1: Deep Analysis**
11 thinking lenses force holistic evaluation:
- Systems Thinking, First Principles, User-Centric, Edge Cases
- Temporal Analysis, Security, Ethics, Regression Analysis
- Scalability, Performance, Long-Term Viability

**Phase 2 & 3: Specification + Generation**
Codifies insights into standardized XML template, then autonomous generation using the spec as blueprint.

**Phase 4: Multi-Agent Synthesis**
Approval panel of Opus 4.5 agents (unanimous required):
- **Code Quality Agent** — Architecture, patterns, correctness
- **Evolution Agent** — Timelessness, extensibility, future-readiness (≥7/10 score required)
- **Security Agent** — Vulnerability assessment, safe patterns
- **Script Agent** — Validates code quality when scripts present (conditional)

**Agentic Capabilities (v4.0):**
- **Phase 1D: Automation Analysis** — Identifies opportunities for Python scripts
- Self-verification, error recovery, state persistence
- New scripts: `triage_skill_request.py`, `discover_skills.py`, `match_skills.py`, `verify_recommendation.py`

**Directory structure:**
```
skillforge/
├── SKILL.md                    # Main skill definition
├── references/                 # The "brain" of the system
│   ├── multi-lens-framework.md
│   ├── specification-template.md
│   ├── evolution-scoring.md
│   └── synthesis-protocol.md
├── assets/templates/           # Reusable blueprints
│   ├── skill-spec-template.xml
│   ├── skill-md-template.md
│   └── script-template.py
└── scripts/                    # Automated quality gates
    ├── triage_skill_request.py
    ├── discover_skills.py
    └── validate-skill.py
```

**Triggers:**
- `SkillForge: {goal}` — Full autonomous creation
- `create skill for {purpose}` — Natural language activation
- `{any input}` — Analyzes and routes automatically (v4.0)
- `improve {skill-name} skill` — Improvement mode

## Evaluation

### Strengths
- **Quality-first methodology** — Transforms skill creation from art to engineering discipline
- **Multi-agent peer review** — Unanimous approval panel ensures high bar
- **Evolution mandate** — ≥7/10 timelessness score required (non-negotiable quality gate)
- **Universal domain matching** — Matches by concept, not hardcoded names (works for everyone)
- **Agentic scripts** — Self-verification, state persistence, error recovery
- **Comprehensive analysis** — 11 thinking lenses force unbiased evaluation
- **Template-driven** — Standardized XML specs ensure consistency

### Weaknesses
- **Heavy process** — 4 phases + multi-agent synthesis takes significant time/tokens
- **Opus 4.5 dependency** — Synthesis panel requires most expensive model
- **Overkill for simple skills** — Not every skill needs 11-lens analysis
- **No incremental adoption** — All-or-nothing methodology
- **Python 3.8+ required** — For validation scripts
- **Learning curve** — Understanding the framework, templates, and process takes time
- **Token cost** — Multiple Opus calls per skill generation

### Community Sentiment

**Featured in curated directories:** Awesome Claude Skills lists SkillForge as a meta generator tooling resource with 493 references. [Awesome Skills](https://awesome-skills.com/) features it prominently.

**Positive reception:** GitHub stars (503) indicate strong community interest. The rebranding from SkillCreator to SkillForge signals maturation and focus on engineering rigor.

**Production use:** Featured in [The Ultimate Claude Code Resource List (2026 Edition)](https://www.scriptbyai.com/claude-code-resource-list/) as recommended approach for systematic skill creation.

**Philosophical alignment:**
> "Quality is built in, not bolted on. SkillForge is a fundamental shift from reactive testing to proactive engineering." — [README](https://github.com/tripleyak/SkillForge)

**Compared to ad-hoc methods:**
> "The central challenge in AI development isn't a lack of ideas, but the inconsistent process of turning them into robust, reliable skills." — [Problem Statement](https://github.com/tripleyak/SkillForge/blob/main/README.md)

### Compared To

**vs. [Oh My ClaudeCode](../execution/oh-my-claudecode.md)** — OMC is an execution framework with 32 agents + TDD + code review. SkillForge is a meta-skill for creating skills. Complementary tools.

**vs. Manual skill creation** — Manual is faster for simple skills. SkillForge adds rigor for complex, production-critical skills that need evolution-readiness.

**vs. [Subagents](subagents.md) / [Agent Teams](agent-teams.md)** — Native features provide basic delegation. SkillForge creates reusable skills that can be used within those workflows.

**vs. [skill-builder (metaskills)](https://github.com/metaskills/skill-builder)** — Similar concept (meta-skill for skill creation), but SkillForge has 4-phase architecture, multi-agent synthesis, and evolution scoring.

## Our Usage

**Status: Watching.** Not chosen yet because we're focused on execution workflows (Phase 3: Run It), not skill creation methodology.

**Why we're interested:**
- Evolution scoring (≥7/10) aligns with our multi-year lifespan requirement
- Multi-agent synthesis could reduce low-quality skill proliferation
- Universal triage (Phase 0) could help Adam decide when to create vs. reuse skills
- Agentic scripts (self-verification) fit our automation philosophy

**Why we haven't adopted it (yet):**
- We don't have a skills quality problem (yet) — only a few custom skills so far
- Token cost of 4-phase + Opus panel is high for frequent skill creation
- Our current workflow is "write skills manually, iterate when they break"
- Uncertain if the rigor justifies the overhead for simple skills

**Re-evaluate if:**
- We start building a skill library (10+ custom skills)
- We need to delegate skill creation to Ralph (autonomous agent)
- Client projects require auditable skill creation process
- We build a "Skills as a Service" offering requiring quality guarantees

**Adoption pattern (if we use it):**
```bash
# Install SkillForge
cp -r ~/.claude/skills/skillforge ~/.claude/skills/

# Test with complex skill
SkillForge: Create a skill for autonomous PR review with security scanning, test coverage analysis, and code quality scoring

# Review outputs:
# - specification.xml (full analysis)
# - SKILL.md (generated skill)
# - synthesis-report.md (approval panel decisions)

# If approved, move to ~/.claude/skills/pr-review/
```

**Hybrid approach (likely):**
- Use SkillForge for complex, production-critical skills (e.g., /harvest, /verify)
- Use manual creation for simple, one-off skills
- Let SkillForge's triage (Phase 0) guide the decision

## Sources

- [GitHub Repository](https://github.com/tripleyak/SkillForge)
- [Awesome Claude Skills](https://awesome-skills.com/)
- [The Ultimate Claude Code Resource List (2026)](https://www.scriptbyai.com/claude-code-resource-list/)
- [SkillHub Marketplace](https://skillforge.cc/)

---
*Last reviewed: 2026-02-07*
