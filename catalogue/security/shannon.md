# Shannon

| Field | Value |
|-------|-------|
| GitHub | [KeygraphHQ/shannon](https://github.com/KeygraphHQ/shannon) |
| Stars | 6,707 |
| Last Commit | Jan 2026 |
| Install | `git clone` + Docker + Anthropic API key |
| Status | Watching |
| Category | security |
| Holy Grail Phase | Supporting (not core workflow) |

## What It Does

Fully autonomous AI-powered penetration tester for web applications. Analyses source code (white-box) and the running app (black-box) simultaneously, then attempts real exploits — SQL injection, XSS, SSRF, auth bypass — to prove vulnerabilities are actually exploitable. Strict "No Exploit, No Report" policy: if it can't demonstrate a working PoC, it discards the finding. Eliminates false positives by design.

## How It Works

Four-phase methodology:

1. **Reconnaissance** — Source code analysis, attack surface mapping, API endpoint discovery (Nmap, Subfinder, WhatWeb, Schemathesis)
2. **Vulnerability Analysis** — Parallel vulnerability hunters per OWASP category (Injection, XSS, SSRF, Auth)
3. **Exploitation** — Real attacks via browser automation and CLI tools against hypothesised vulnerabilities
4. **Reporting** — Validated findings with reproducible PoC exploit code

Architecture: Multi-agent system built on Claude Agent SDK + Temporal for distributed workflows. Runs entirely in Docker.

```bash
git clone https://github.com/KeygraphHQ/shannon.git
cd shannon
export ANTHROPIC_API_KEY="your-key"
./shannon start URL=https://your-app.com REPO=/path/to/source
```

**Cost:** ~$8-50 per assessment depending on target complexity. 60-90 minute runs typical. Requires source code (white-box only).

**License:** AGPL-3.0 (Lite), Commercial (Pro — adds data flow analysis, CI/CD integration, compliance reporting).

## Evaluation

### Strengths
- Zero false positives by design — only reports what it can prove with a working exploit
- White-box + black-box combined gives deeper coverage than either approach alone
- Fully autonomous — handles auth (including 2FA/TOTP), navigation, exploitation, reporting end-to-end
- Docker-contained — clean isolation, easy setup and teardown
- Actionable output — reports include copy-paste exploit code and reproduction steps
- Fast ROI — 90 minutes and $8-50 vs. traditional pentests costing $10,000-50,000 over weeks
- Real community traction — 6,700 stars, active issues, multiple independent write-ups confirming it works

### Weaknesses
- Narrow vulnerability scope — only Injection, XSS, SSRF, Auth bypass. Ignores business logic, race conditions, config issues
- Requires source code — cannot test third-party apps without source
- API cost unpredictability — no built-in budget limits
- No releases or versioning — clone main and hope for the best
- Small team — 84 of 116 commits from one person (ajmallesh). Bus factor of 1
- Rough edges — open issues include can't change repo between runs, no retry on report creation failure
- AGPL-3.0 for Lite — real features (data flow, CI/CD) locked behind commercial Pro tier

### Community Sentiment

Coverage from security-focused publications (GBHackers, CyberSecurityNews, Help Net Security). Sentiment positive but measured — people impressed it produces real exploits with zero false positives, but note narrow scope and API costs. Independent user testing (DEV.to article on vulnerable Go app) confirms core promise: 40+ vulnerabilities, zero false positives, 90 minutes. Has not broken through to mainstream developer awareness yet — 6,700 stars reflects niche security audience.

Benchmark claim: 96.15% success rate on XBOW benchmark, "surpassing human pentesters who averaged 85%." Comparison methodology not independently verified — take with appropriate skepticism.

### Compared To

Not comparable to anything in our stack — this is a security tool, not a dev workflow tool. The closest analogy would be running it as a quality gate after Phase 3 (Run), similar to how TDD Guard enforces test-passing but for security instead of correctness.

## Our Usage

**Watching — different domain.** Shannon doesn't fit any Holy Grail phase directly. It's a specialised security tool, not a dev workflow tool.

**Potential future integration:** After Phase 3 (Run) completes a feature, automatically run Shannon against the deployed app before merging — a security gate. This would be a Phase 6+ enhancement.

**Not a priority** for the core autonomous dev system. Worth revisiting when:
- We have deployed apps that handle user data or auth
- We want to add a security gate to the Ralph loop pipeline
- The tool matures past the "no releases" stage

## Sources

- [GitHub Repository](https://github.com/KeygraphHQ/shannon)
- [GBHackers: Shannon AI Pentesting Tool](https://gbhackers.com/shannon-ai-pentesting-tool/)
- [Help Net Security: Open-source AI pentesting tools](https://www.helpnetsecurity.com/2026/02/02/open-source-ai-pentesting-tools-test/)
- [DEV.to: I Let An AI Pentester On My Vulnerable Go App](https://dev.to/bhavishya_aggarwal_2651e7/i-let-an-ai-pentester-shannon-on-my-vulnerable-go-app-heres-what-happened-1p09)

---
*Last reviewed: 2026-02-07*
