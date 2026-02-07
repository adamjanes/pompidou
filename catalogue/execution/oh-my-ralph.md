# Oh My Ralph

| Field | Value |
|-------|-------|
| GitHub | [vivganes/oh-my-ralph](https://github.com/vivganes/oh-my-ralph) |
| Stars | 1 |
| Last Commit | 2026-02-01 (v0.4.0) |
| Install | `pip install oh-my-ralph` |
| Status | Evaluated |
| Category | execution |
| Holy Grail Phase | 3-Run |

## What It Does

Oh My Ralph is a Python-based orchestrator implementing the Ralph Wiggum loop pattern. It executes an agent command repeatedly until a completion signal is detected (`<PROMPT>DONE</PROMPT>`), max iterations are reached, 5 consecutive errors occur, or manual interruption. It is the simplest Python-native Ralph implementation — a minimal loop wrapper around external agent tools, primarily tested with OpenCode rather than Claude Code.

## How It Works

**Basic execution:**
```bash
oh-my-ralph --agent "opencode run" --model opencode/glm-4.7-free \
  --start-opencode-web-at-port 8089 --working-dir /path/to/requirements
```

**Requirements:** Users must provide a `requirements.md` file in the working directory containing detailed project specifications.

**Stop conditions:**
- Agent outputs `<PROMPT>DONE</PROMPT>` — task complete
- Max iterations reached (configurable)
- 5 consecutive errors — circuit breaker
- Manual `Ctrl+C` interruption

**Dependencies:** Python 3.10+. No other runtime requirements.

The tool is designed as a generic wrapper — the `--agent` flag accepts any CLI command, making it technically agent-agnostic. The `--model` flag configures which LLM the wrapped agent uses.

## Evaluation

### Strengths
- Python-native — useful for teams in Python ecosystems
- Minimal and easy to understand (24 commits total)
- pip-installable — clean dependency management
- Agent-agnostic via configurable `--agent` command
- Circuit breaker (5 consecutive errors) prevents runaway loops

### Weaknesses
- 1 star — essentially no community, no battle-testing
- Primarily tested with OpenCode, not Claude Code
- No task tracking, no spec management, no cost monitoring
- No verification callbacks — relies on agent self-reporting completion
- Very early (v0.4.0) — API may change significantly
- Adds little value over a simple Bash while-loop

### Community Sentiment

No meaningful community presence. 1 star, 0 forks. The tool appears to be a personal project with no evidence of external adoption.

### Compared To

- **Oh My ClaudeCode** (`catalogue/execution/oh-my-claudecode.md`): Despite the similar name, these tools are completely different in scope. OMC provides 5 modes, 32 agents, and model routing. Oh My Ralph is a minimal loop wrapper. OMC is for Claude Code; Oh My Ralph targets OpenCode.
- **Ralph Plugin** (`catalogue/execution/ralph-plugin.md`): Both are minimal loops, but Ralph Plugin is Claude Code-native. Oh My Ralph is Python-based and agent-agnostic.
- **Ralph Wiggum BDD** (`catalogue/execution/ralph-wiggum-bdd.md`): Both are minimal Bash/script-level tools, but BDD adds Gherkin tracking. Oh My Ralph is even simpler.

## Our Usage

**Not chosen.** Adds negligible value over a Bash while-loop. We use Claude Code with Oh My ClaudeCode, which is a fundamentally more capable tool in the same space. Oh My Ralph targets a different ecosystem (OpenCode/Python) that doesn't align with our stack.

## Sources

- [GitHub README](https://github.com/vivganes/oh-my-ralph)
- [PyPI](https://pypi.org/project/oh-my-ralph/)

---
*Last reviewed: 2026-02-06*
