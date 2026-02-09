# Research Methodology

## The Holy Grail

Every tool is evaluated against how well it supports Adam's autonomous development system:

1. **Spec It** — Define what to build, surface blockers upfront
2. **Task It** — Break specs into dependency-aware, agent-executable tasks
3. **Run It** — Execute autonomously via Ralph loops, pause on limits, auto-resume
4. **Flag It** — Push blockers to shared file, notify Adam via Telegram
5. **Repeat It** — Schedule nightly kickoffs, review results each morning

## Evaluation Criteria

### Must-Have (Hard Requirements)
- **Works with Claude Code** — must integrate as skill, hook, command, plugin, or MCP server
- **Git-native or git-compatible** — state stored in repo or alongside it
- **Markdown-based** — AI agents can read and write it
- **Active maintenance** — commits in last 3 months, responsive to issues

### Scoring (Soft Criteria)

| Criterion | Weight | Description |
|-----------|--------|-------------|
| Holy Grail alignment | 30% | Does it fill a gap in the 5-phase workflow? |
| Simplicity | 20% | Zero-config preferred. Can Adam explain it in one sentence? |
| Community trust | 15% | Real users, honest claims, transparent benchmarks |
| Ecosystem fit | 15% | Works with our other chosen tools (OpenSpec, Beads, etc.) |
| Cost efficiency | 10% | Token usage, API costs, infrastructure requirements |
| Maturity | 10% | Stable API, good docs, not likely to break |

### Community Trust — Mandatory Verification Checklist (added 2026-02-09)

**Before scoring Community Trust above 2/5, you MUST verify:**

| Check | How to verify | Red flag if... |
|-------|---------------|----------------|
| Stars-to-watchers ratio | `gh api repos/OWNER/REPO` — compare `stargazers_count` to `subscribers_count` | Ratio > 100:1 (stars are bookmarks, not users) |
| Contributor diversity | `gh api repos/OWNER/REPO/contributors` — count people with >5 commits | <3 real contributors = bus factor risk |
| External PR acceptance | `gh api repos/OWNER/REPO/pulls?state=closed` — count merged PRs from non-authors | <5 merged external PRs = closed project |
| Reddit presence | Search `"tool-name" site:reddit.com` | Zero results for a 1K+ star project |
| Hacker News presence | Search `"tool-name" site:news.ycombinator.com` | Zero results for a 1K+ star project |
| YouTube/tutorial content | Search `"tool-name" tutorial` or `"tool-name" review` | Zero independent content |
| Independent blog posts | Search `"tool-name" review` or `"I tried tool-name"` | Only author-created content |
| Project age | Check repo creation date | <90 days old = too early to trust star count |
| Issue reporter diversity | Count unique non-author issue reporters | <20 unique reporters for 1K+ stars |

**Lesson learned (OMC evaluation, 2026-02-07):** The original evaluation scored Community Trust 3/5 based on README claims and GitHub vanity metrics. Independent verification revealed zero Reddit/HN/YouTube presence, one-person project (97% contributions), and only 2 merged external PRs. Actual score: 1.5/5. Star count alone is NOT community trust.

### Red Flags (Immediate Rejection)
- Fabricated benchmarks or unverifiable claims
- Requires competing model ecosystem (e.g., Kimi, OpenAI-only)
- No source code or closed-source core
- Requires always-on server for basic functionality
- Plaintext credential storage with no alternative

## Status Labels

| Status | Meaning |
|--------|---------|
| ★ CHOSEN | In our stack, installed or planned for installation |
| Evaluated | Reviewed thoroughly, not chosen (yet) |
| Rejected | Reviewed and explicitly rejected, with documented reasons |
| Watching | Interesting but too early, check back next sweep |

## Research Process

1. **Discovery** — Scan awesome lists, blogs, HN/Reddit, GitHub trending
2. **Triage** — Quick check: stars, last commit, README quality, Holy Grail relevance
3. **Deep Eval** — Fetch README, check issues, search community sentiment, test if possible
4. **Document** — Write catalogue entry using `_template.md`
5. **Decide** — Update `stack/current.md` if the tool changes recommendations

## Sweep Cadence

- **Full sweep**: Monthly (or when a major ecosystem shift happens)
- **Spot checks**: When a specific tool is mentioned in conversation or a new need arises
- **Automated**: Via `research/SWEEP.md` prompt fed to a Claude session
