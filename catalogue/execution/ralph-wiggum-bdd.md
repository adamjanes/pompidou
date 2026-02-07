# Ralph Wiggum BDD

| Field | Value |
|-------|-------|
| GitHub | [marcindulak/ralph-wiggum-bdd](https://github.com/marcindulak/ralph-wiggum-bdd) |
| Stars | 4 |
| Last Commit | 2026-01 |
| Install | `git clone` + add `scripts/` to PATH |
| Status | Evaluated |
| Category | execution |
| Holy Grail Phase | 3-Run |

## What It Does

Ralph Wiggum BDD is a standalone Bash script that executes the Claude Code agent in a loop using Behavior-Driven Development as its task tracking mechanism. Instead of a PRD or JSON task list, it uses Gherkin feature files with status tags (`@status-todo`, `@status-active`, `@status-done`) to track implementation progress. Each loop iteration produces a git commit representing a completed, testable unit. The unique angle is BDD-native execution — requirements are executable tests from the start, and the loop implements until all feature scenarios pass.

## How It Works

**BDD-driven loop:**
1. `ralph-wiggum-bdd.sh` reads feature files with Gherkin scenarios
2. Each iteration invokes Claude Code with a fresh prompt
3. Agent implements the next `@status-todo` scenario
4. Tests run (Behave for Python, Cucumber for Ruby/JS/TS)
5. On pass: git commit, update status tag to `@status-done`
6. Repeat until all scenarios pass

**Execution:**
```bash
# Non-interactive (timeout after 600s)
timeout 600 ralph-wiggum-bdd.sh --iterations 5

# Interactive (human supervision)
ralph-wiggum-bdd.sh --interactive
```

**Electronic Lab Notebook:** An append-only `ELN.md` file logs observations across iterations, kept separate from agent decision-making to prevent feedback loops.

**Context rot mitigation:** Fresh prompts each iteration prevent quality degradation from growing context windows. Bidirectional sync keeps requirements and code aligned, though code-to-requirements sync still requires human interaction.

## Evaluation

### Strengths
- BDD-native approach means requirements are executable from day one
- Gherkin status tags provide simple, readable task tracking without JSON
- Standalone Bash script — zero dependencies beyond Claude CLI and a Gherkin framework
- ELN (lab notebook) pattern is a clean separation of observational data
- Interactive mode supports supervised execution for trust-building

### Weaknesses
- Only 4 stars — essentially a proof of concept, not battle-tested
- BDD-only — if your project doesn't use Gherkin, this tool doesn't apply
- Human supervision "remains essential" per the author's own admission
- No cost tracking, no parallel execution, no agent specialization
- Limited error recovery — agent can enter non-terminating loops
- Bidirectional code-to-requirements sync is incomplete

### Community Sentiment

Minimal community presence. The BDD angle is novel in the Ralph ecosystem and draws occasional interest from TDD/BDD practitioners, but the 4-star count reflects niche appeal. The concept is sound — executable requirements as task tracking — but execution remains academic.

### Compared To

- **Oh My ClaudeCode** (`catalogue/execution/oh-my-claudecode.md`): OMC is a full execution framework. Ralph Wiggum BDD is a single-purpose Bash script for BDD workflows. No overlap in scope.
- **Snarktank Ralph** (`catalogue/execution/snarktank-ralph.md`): Both are Bash loops with task tracking, but Snarktank uses `prd.json` while this uses Gherkin feature files. Snarktank is more general-purpose.
- **How-to Ralph Wiggum** (`catalogue/execution/how-to-ralph-wiggum.md`): The playbook methodology could be applied on top of this BDD-specific implementation.

## Our Usage

**Not chosen.** We don't use Gherkin/BDD in our projects, making this tool inapplicable. The concept of using executable specifications as task tracking is interesting and validates the idea that backpressure (tests as gates) is central to effective Ralph loops. The ELN pattern could be borrowed as a learnings-log approach.

## Sources

- [GitHub README](https://github.com/marcindulak/ralph-wiggum-bdd)

---
*Last reviewed: 2026-02-06*
