# Dev Browser

| Field | Value |
|-------|-------|
| GitHub | [SawyerHood/dev-browser](https://github.com/SawyerHood/dev-browser) |
| Stars | 3,470 |
| Last Commit | 2026-02-07 |
| Install | `/plugin marketplace add sawyerhood/dev-browser` then `/plugin install dev-browser@sawyerhood/dev-browser` |
| Status | Evaluated |
| Score | 3.65 / 5.00 |
| Category | native |
| Holy Grail Phase | 4-Verify |

## What It Does

Dev Browser is a Claude Code plugin that gives Claude the ability to control a persistent Chromium browser instance for web automation, testing, and data extraction. Unlike traditional browser automation that starts fresh each time, Dev Browser maintains cookies, localStorage, and page state between executions, enabling multi-step workflows like form filling, authenticated portal navigation, and incremental web scraping. It includes a Chrome extension that lets Claude control your existing Chrome browser with all your logged-in sessions, bookmarks, and extensions intact — perfect for testing web apps on localhost or verifying deployed features.

## How It Works

**Installation:**
```bash
# Claude Code
/plugin marketplace add sawyerhood/dev-browser
/plugin install dev-browser@sawyerhood/dev-browser
# Restart Claude Code

# Amp / Codex (manual)
git clone https://github.com/sawyerhood/dev-browser /tmp/dev-browser-skill
cp -r /tmp/dev-browser-skill/skills/dev-browser ~/.claude/skills/dev-browser
cd ~/.claude/skills/dev-browser && npm install && npm run start-server  # Amp only
```

**Key concepts:**
- **Persistent pages**: Navigate once, interact across multiple scripts — state persists between Claude turns
- **Flexible execution**: Full scripts when possible (fast), step-by-step when exploring (safe)
- **LLM-friendly DOM snapshots**: Structured page inspection optimized for AI (ARIA snapshots, element discovery)
- **Visual feedback**: Screenshots for debugging and verification
- **Chrome extension** (optional): Control your existing Chrome browser instead of launching separate Chromium

**Workflow:**
1. Ask Claude to navigate to a URL: "Open localhost:3000 and verify the signup flow works"
2. Dev Browser launches persistent Chromium instance (or connects to Chrome via extension)
3. Claude writes and executes Playwright scripts to interact with the page
4. DOM snapshots and screenshots are returned to Claude for analysis
5. State persists — subsequent requests can continue from the same page

**Common use cases:**
- "Go to localhost:3000 and test the login form"
- "Navigate to the settings page and figure out why the save button isn't working"
- "Fill out the signup form and take a screenshot"
- "Scrape the pricing table from https://example.com"
- "Automate clicking through the onboarding flow"

**Chrome extension setup** (optional):
1. Download `extension.zip` from [latest release](https://github.com/sawyerhood/dev-browser/releases/latest)
2. Unzip to permanent location (e.g., `~/.dev-browser-extension`)
3. Chrome → `chrome://extensions` → Enable "Developer mode" → "Load unpacked"
4. Click extension icon → Toggle to "Active"
5. Ask Claude to connect: "use the extension" or "connect to my Chrome"

**Benchmark results** (from dev-browser-eval):
- Dev Browser: 3m 53s, $0.88, 29 turns, 100% success
- Playwright MCP: 4m 31s, $1.45, 51 turns, 100% success
- Playwright Skill: 8m 07s, $1.45, 38 turns, 67% success
- Claude Chrome Extension: 12m 54s, $2.81, 80 turns, 100% success

## Evaluation

### Scores

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Holy Grail alignment | 30% | 4 | 1.20 |
| Simplicity | 20% | 4 | 0.80 |
| Community trust | 15% | 3 | 0.45 |
| Ecosystem fit | 15% | 3 | 0.45 |
| Cost efficiency | 10% | 4 | 0.40 |
| Maturity | 10% | 3 | 0.30 |
| **Composite** | | | **3.60** |

### Strengths
- Maps directly to **4-Verify** phase — "Build It" completes, then Dev Browser verifies the deployed version works
- Persistent browser state enables realistic testing (logged-in sessions, localStorage, cookies)
- Chrome extension mode uses real browser with all your data — no separate Chromium instance
- Faster and cheaper than alternatives (3m 53s vs 12m 54s for Claude Chrome Extension)
- LLM-friendly DOM snapshots reduce token usage compared to raw HTML dumps
- Plugin installation is simple (Claude Code marketplace)
- Benchmarks show 100% success rate on test suite
- Supports both automated scripts (fast) and step-by-step exploration (safe)

### Weaknesses
- Requires Node.js and npm (dependency on JavaScript runtime)
- Playwright dependency adds installation complexity (large node_modules)
- No built-in integration with CI/CD — manual setup needed for GitHub Actions verification
- Amp requires manual server start (`npm run start-server`) before use
- Chrome extension requires "Developer mode" and manual load (not in Chrome Web Store)
- Benchmarks are self-published (dev-browser-eval repo) — no third-party validation
- No integration with OpenSpec or Beads — Dev Browser is invoked ad-hoc, not as part of task flow
- Browser automation can be flaky (timeouts, selectors breaking, race conditions)

### Community Sentiment

Dev Browser has positive reception with 3,470 stars and active development through February 2026. Users praise the persistent state approach — "finally, browser automation that doesn't start fresh every time." The Chrome extension is frequently highlighted as a killer feature, allowing Claude to control the browser you're already using with all logged-in sessions intact. Benchmarks showing 3x speed improvement over Claude Chrome Extension and 2x cost reduction are cited as major selling points. Some skepticism about the self-published benchmarks (dev-browser-eval repo is by the same author), but users report similar performance gains in practice. Criticism centers on Playwright dependency size and occasional Chromium launch failures. The skill is mentioned in community resources like [Optimizing Claude Code: Skills, Plugins, and the Art of Teaching Your AI to Code Like You](https://mays.co/optimizing-claude-code) and listed on [MCP Market](https://mcpmarket.com/tools/skills/dev-browser) and [FastMCP](https://fastmcp.me/Skills/Details/460/dev-browser). Overall sentiment: highly useful for web testing and automation, but requires comfort with browser automation quirks.

### Compared To

- **Playwright MCP** (`microsoft/playwright-mcp`): Observe-think-act loop with individual tool calls. Simple but slow (4m 31s vs 3m 53s). Dev Browser's persistent state and script execution is faster and cheaper.
- **Playwright Skill** (`lackeyjb/playwright-skill`): Full scripts that run end-to-end. Fast but fragile (67% success rate). Dev Browser combines persistent state with flexible execution for higher reliability.
- **Claude Chrome Extension**: Browser control via extension. Slow (12m 54s) and expensive ($2.81). Dev Browser is 3x faster and 3x cheaper with same 100% success rate.
- **Manual testing**: Adam manually testing deployed features. Dev Browser automates verification, freeing Adam to review only the results.

## Our Usage

**Strong candidate for 4-Verify phase.** Dev Browser maps directly to our Holy Grail workflow:

1. **3-Run** (OMC Autopilot) builds the feature and pushes to GitHub
2. **4-Verify** (Dev Browser) tests the deployed version on localhost or staging
3. If tests pass → Adam eyeballs the deployed version, then merges
4. If tests fail → blockers are logged, Adam investigates

**Planned usage:**
- Install as Claude Code plugin on Ralph (Mac Mini)
- Create per-project verification scripts in `.claude/hooks/verify.sh`:
  ```bash
  # Example: talentflow verification
  claude "Use dev-browser to test localhost:3000/auth/login. Verify:
  - Login form renders
  - Email/password validation works
  - Successful login redirects to dashboard
  - Take screenshots of each step
  - Report any errors"
  ```
- Integrate with GitHub Actions: After build passes, run Dev Browser verification before merge
- Use Chrome extension mode for testing with logged-in sessions (e.g., authenticated admin panels)

**Why not chosen yet:**
- Need to test reliability on Ralph's Mac Mini setup (headless Chromium on macOS)
- Need to validate GitHub Actions integration for CI/CD verification
- Want to build out verification scripts for each project before committing

**Status: Evaluated, likely CHOSEN after testing.** This fills a clear gap in our 4-Verify phase. Alternative is manual testing, which doesn't scale with autonomous Ralph loops.

## Sources

- [GitHub README](https://github.com/SawyerHood/dev-browser)
- [dev-browser-eval benchmarks](https://github.com/SawyerHood/dev-browser-eval)
- [MCP Market listing](https://mcpmarket.com/tools/skills/dev-browser)
- [FastMCP listing](https://fastmcp.me/Skills/Details/460/dev-browser)
- [Optimizing Claude Code blog post](https://mays.co/optimizing-claude-code)

---
*Last reviewed: 2026-02-07*
