# cc-audit

| Field | Value |
|-------|-------|
| GitHub | [ryo-ebata/cc-audit](https://github.com/ryo-ebata/cc-audit) |
| Stars | 15 |
| Last Commit | 2026-02-06 |
| Install | `brew install ryo-ebata/tap/cc-audit` or `cargo install cc-audit` or `npx @cc-audit/cc-audit` |
| Status | ★ CHOSEN |
| Category | security |
| Holy Grail Phase | Supporting |

## What It Does

AI-free static security scanner for Claude Code artifacts (Skills, Hooks, MCP configs). Detects data exfiltration, privilege escalation, persistence, prompt injection, and supply chain risks with deterministic, reproducible results. Scans before you install third-party tools to close the security gap left by Anthropic's "we do not audit MCP servers" policy.

## How It Works

**Scan Types:**
- Skills, hooks, MCP servers, commands
- Docker configurations, dependencies, subagents, plugins
- Remote GitHub repositories
- All installed AI coding clients (Claude, Cursor, Windsurf, VS Code)

**Detection:**
- 100+ detection rules covering exfiltration, escalation, persistence, injection, overpermissions
- CVE vulnerability database for known AI coding tool vulnerabilities
- Risk scoring (0-100) with category breakdown
- CWE references for each finding

**Output Formats:** Terminal, JSON, SARIF (GitHub Security integration), HTML, Markdown

**Advanced Features:**
- Baseline/drift detection (prevent rug pull attacks)
- MCP pinning (detect unauthorized config changes)
- Auto-fix for certain issues
- Watch mode (real-time scanning during development)
- Pre-commit hook integration
- MCP proxy mode (runtime monitoring with transparent proxy)
- SBOM generation (CycloneDX format)

**CLI:**
```bash
cc-audit init                           # Generate config
cc-audit check ./my-skill/              # Scan directory
cc-audit check --type mcp ~/.claude/mcp.json
cc-audit check --all-clients            # Scan all AI clients
cc-audit check --watch ./my-skill/      # Watch mode
cc-audit hook init                      # Install pre-commit hook
cc-audit serve                          # Run as MCP server
cc-audit proxy                          # Run as MCP proxy
```

## Evaluation

### Strengths
- **Fills critical gap**: Third-party Claude Code tools are unaudited by Anthropic
- AI-free static analysis (deterministic, reproducible)
- Written in Rust (fast, memory-safe)
- Multi-format output (JSON, SARIF, HTML, Markdown)
- Remote repo scanning (no need to clone)
- Pre-commit hook integration
- MCP proxy mode for runtime monitoring
- Auto-fix capability
- SBOM generation
- Active development (created Jan 2026, commits in last 24h)
- Multi-client support (Claude, Cursor, Windsurf, VS Code)
- Baseline/drift detection prevents supply chain attacks

### Weaknesses
- Very young project (created Jan 2026, only 15 stars)
- No community validation yet
- Rule coverage unknown (100+ rules claimed, no public list in README)
- No published false positive rate
- Rust dependency may limit contributions vs Node/Python
- Documentation focuses on installation over detection methodology

### Community Sentiment

Found related tools (Trail of Bits skills, wrsmith108 security-auditor) suggesting security audit workflows are emerging in 2026. No direct discussion of cc-audit found — too new. The broader Claude Code security space is gaining attention with multiple security-focused skills and the Ultimate Claude Code Resource List featuring audit tools.

### Compared To

- **vs Trail of Bits skills**: Trail of Bits offers security research skills; cc-audit scans artifacts themselves
- **vs wrsmith108/claude-skill-security-auditor**: That's a Claude skill for auditing code; cc-audit audits Claude tools
- **vs manual review**: cc-audit provides 100+ automated checks vs ad-hoc manual scanning

**Unique in the catalogue**: Only tool focused on security scanning of Claude Code artifacts themselves.

## Our Usage

**Chosen** for security validation of third-party tools before installation.

**Why chosen:**
- Closes Anthropic's acknowledged audit gap ("we do not manage or audit MCP servers")
- Adam's autonomous system will install many third-party tools; need automated vetting
- Static analysis prevents exfiltration of API keys, SSH keys, secrets
- Pre-commit hook prevents accidental introduction of vulnerable artifacts
- Remote repo scanning allows checking tools before cloning

**How we use it:**
1. **Pre-installation**: `cc-audit check https://github.com/org/repo` before adding new skills/hooks
2. **Continuous monitoring**: Pre-commit hook scans `.claude/` directory changes
3. **Periodic audits**: `cc-audit check --all-clients` weekly on Ralph
4. **Baseline protection**: Run after initial setup, track drift over time

**Configuration:**
- Strict mode enabled (`--strict`) to catch medium/low severity issues
- SARIF output to `.security/` for GitHub Security integration (future)
- Baseline stored in repo for drift detection

**When we'd reconsider:**
- If false positive rate is too high after real-world usage
- If Anthropic launches official marketplace with curated, audited tools

## Sources

- [README](https://github.com/ryo-ebata/cc-audit)
- [Claude Code Security Docs](https://code.claude.com/docs/en/security)
- [Trail of Bits Claude Code Skills](https://github.com/trailofbits/skills)
- [The Ultimate Claude Code Resource List (2026 Edition)](https://www.scriptbyai.com/claude-code-resource-list/)

---
*Last reviewed: 2026-02-07*
