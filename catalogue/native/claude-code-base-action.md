# Claude Code Base Action

| Field | Value |
|-------|-------|
| GitHub | [anthropics/claude-code-base-action](https://github.com/anthropics/claude-code-base-action) |
| Stars | 569 |
| Last Commit | 2026-02-06 |
| Install | `uses: anthropics/claude-code-base-action@beta` |
| Status | Evaluated |
| Category | native |
| Holy Grail Phase | Supporting |

## What It Does

Claude Code Base Action is Anthropic's official GitHub Action that runs Claude Code within CI/CD workflows. It's a mirror of the base-action directory from the main claude-code-action repository, designed for pure Claude Code execution without GitHub integration UI. You provide a prompt (direct or file), allowed tools, and optional system prompts, and it executes Claude Code in a GitHub Actions runner.

## How It Works

**Basic workflow file:**
```yaml
- name: Run Claude Code with direct prompt
  uses: anthropics/claude-code-base-action@beta
  with:
    prompt: "Your prompt here"
    allowed_tools: "Bash(git:*),View,GlobTool,GrepTool,BatchTool"
    anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

**Key parameters:**
- `prompt` or `prompt_file` — What to ask Claude
- `allowed_tools` — Comma-separated list of permitted tools
- `max_turns` — Limit conversation length (optional)
- `system_prompt` / `append_system_prompt` — Override or extend default instructions
- `claude_env` — Custom environment variables (YAML format)
- `model` — Default `claude-4-0-sonnet-20250219`, supports Opus 4.1
- `fallback_model` — Auto-fallback when API overloaded

**Authentication options:**
1. Anthropic API key (direct)
2. Claude Code OAuth token
3. AWS Bedrock (OIDC authentication)
4. Google Vertex AI (OIDC authentication)

**Outputs:**
- `conclusion` — 'success' or 'failure'
- `execution_file` — Path to JSON execution log (full conversation history)

**Use cases:**
- Automated PR code reviews
- Scheduled repository maintenance
- Event-driven automation (issue opened, deployment triggered, etc.)
- CI/CD pipeline integration (linting, refactoring, security scans)

## Evaluation

### Strengths
- **Official Anthropic release** — First-party support, guaranteed compatibility
- **Clean separation** — Base action focuses on execution, main action handles GitHub UI
- **Flexible authentication** — Supports API key, OAuth, Bedrock, Vertex AI
- **System prompt control** — Override or append to default behavior
- **Full conversation logs** — JSON output contains entire execution history for parsing
- **Security-first** — Clear documentation on secrets management, optional debug mode

### Weaknesses
- **GitHub-only** — Requires GitHub Actions infrastructure
- **Limited context** — Runs in ephemeral runner, no persistent state across invocations
- **No built-in state management** — You must handle session continuity yourself
- **Tool allowlist required** — Must explicitly grant permissions (conservative by default)
- **Beta status** — API may change, not yet production-hardened
- **Cost per run** — GitHub Actions minutes + Anthropic API costs per execution

### Community Sentiment

**Official documentation is extensive:** Anthropic maintains detailed guides for MCP config, settings files, cloud provider setup (Bedrock/Vertex), and security best practices.

> "This repo is a mirror of the contents of base-action in https://github.com/anthropics/claude-code-action. Do not submit PRs or issues to this repository." — [README](https://github.com/anthropics/claude-code-base-action)

**Production use:** Featured in Anthropic's official docs and used by teams running automated PR reviews and code quality checks. The main claude-code-action repo (569 stars on the base-action mirror) shows active usage.

**Security focus:** Documentation explicitly warns about `show_full_output` mode potentially exposing secrets and recommends short-lived tokens.

### Compared To

**vs. Main claude-code-action** — Main action provides GitHub integration (comment tracking, PR UI). Base action is pure execution for custom workflows.

**vs. [Sandbox Agent](../execution/sandbox-agent.md)** — Sandbox Agent runs agents in remote sandboxes via HTTP. Base Action runs in GitHub runners with direct API access.

**vs. Local Claude Code** — Local runs interactively with state persistence. Base Action is stateless, event-driven, automation-focused.

**vs. [Oh My ClaudeCode](../execution/oh-my-claudecode.md)** — OMC orchestrates local multi-agent workflows. Base Action is for CI/CD automation.

## Our Usage

**Status: Evaluated.** Not chosen for our core workflow because we're building around local execution (Ralph) with manual review steps, not GitHub Actions automation.

**Why we evaluated it:**
- Official Anthropic release = reliable API compatibility
- Could automate PR reviews for client projects (Fractional First, E-America, Semble)
- MCP server support means we could inject project-specific context

**Why we're not using it (yet):**
- Our workflow is Adam-reviews-deployed-version, not automated-merge
- GitHub Actions costs add up across multiple client repos
- We prefer local execution with persistent state (tmux + Ralph)
- No integration with our chosen tools (OpenSpec, Beads, OMC Autopilot)

**Re-evaluate if:**
- We want automated PR reviews before Adam's eyeball review
- Client projects need CI/CD integration with Claude Code
- We build a "Claude Code as a Service" offering for GitHub-hosted projects

**Configuration pattern (if we use it):**
```yaml
# .github/workflows/claude-review.yml
on: [pull_request]
jobs:
  code-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: anthropics/claude-code-base-action@beta
        with:
          prompt_file: ".claude/review-prompt.md"
          allowed_tools: "Bash(git:*),View,GlobTool,GrepTool"
          mcp_config: ".claude/mcp.json"
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

## Sources

- [GitHub Repository](https://github.com/anthropics/claude-code-base-action)
- [Main claude-code-action](https://github.com/anthropics/claude-code-action)
- [Claude Code GitHub Actions Docs](https://code.claude.com/docs/en/github-actions)
- [Security Documentation](https://github.com/anthropics/claude-code-action/blob/main/docs/security.md)

---
*Last reviewed: 2026-02-07*
