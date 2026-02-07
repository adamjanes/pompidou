# Adversarial Spec

| Field | Value |
|-------|-------|
| GitHub | [zscole/adversarial-spec](https://github.com/zscole/adversarial-spec) |
| Stars | 474 |
| Last Commit | Jan 2026 |
| Install | `claude plugin marketplace add zscole/adversarial-spec && claude plugin install adversarial-spec` |
| Status | Watching |
| Category | spec |
| Holy Grail Phase | 1-Spec |

## What It Does

Plugin that refines product specs by orchestrating adversarial debate between multiple LLMs until consensus. Instead of a single model reviewing a spec, multiple models (GPT-4o, Gemini, Grok, Claude, Mistral, etc.) simultaneously critique it, challenge assumptions, and surface edge cases. The process iterates until all models AND Claude agree the spec is solid. Supports PRDs and Technical Specifications with focus modes (security, scalability, performance, UX) and model personas (security engineer, QA specialist, etc.).

## How It Works

1. **Initial Draft** — Claude synthesizes requirements into a spec
2. **Parallel Critique** — Multiple LLM opponents analyze simultaneously and identify gaps
3. **Claude's Active Response** — Claude independently critiques, challenges opponents, contributes improvements
4. **Synthesis & Revision** — All feedback integrates into refined version
5. **Convergence Loop** — Repeats until ALL models reach agreement
6. **User Review** — Accept, request changes, or initiate another cycle

Supports 7+ providers via litellm (OpenAI, Anthropic, Google, xAI, Mistral, Groq, OpenRouter). Interview mode for requirements gathering. Session persistence for resuming interrupted debates. Cost tracking per model per round.

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 2 | 0.60 |
| Simplicity | 20% | 2 | 0.40 |
| Community trust | 15% | 2 | 0.30 |
| Ecosystem fit | 15% | 2 | 0.30 |
| Cost efficiency | 10% | 1 | 0.10 |
| Maturity | 10% | 2 | 0.20 |
| **Composite** | | | **1.90** |

### Strengths
- Novel multi-LLM debate approach — catches gaps any single model would miss
- Claude actively participates (not just orchestrating) — challenges opponent findings
- Early agreement verification — prevents false consensus
- Focus modes direct debate toward specific concerns (security, scalability, etc.)
- Model personas add professional perspectives (security engineer, QA specialist)
- Session persistence — resume interrupted debates
- MIT license

### Weaknesses
- Low star count (474) — small community, limited battle reports
- Requires multiple LLM API keys — adds cost and complexity
- Each debate round costs tokens across multiple providers
- Single author (zscole) — bus factor of 1
- May add significant time/cost to spec phase for marginal quality improvement
- Convergence not guaranteed — models could debate indefinitely

### Community Sentiment

Limited discussion due to small community. Those who've tried it are impressed by the quality of specs produced. The multi-model debate concept generates intellectual excitement but practical adoption is limited by the multi-API-key requirement and cost.

### Compared To

- **OpenSpec** — OpenSpec doesn't have adversarial review. Could run after OpenSpec /opsx:new to stress-test specs.
- **BMAD** — BMAD has multiple agent personas but they collaborate. Adversarial-spec has them debate.
- **Agent Tower** — Similar multi-model concept but for code review, not spec writing.

## Our Usage

Watching. Interesting concept for high-stakes specs where getting the spec wrong is expensive. The validation approach (debate until consensus) is philosophically appealing but the multi-API cost and complexity may not be justified for most work. Revisit for critical client projects where spec quality directly impacts outcomes.

## Sources

- [GitHub: zscole/adversarial-spec](https://github.com/zscole/adversarial-spec)
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)

---
*Last reviewed: 2026-02-07*
