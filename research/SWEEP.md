# Research Sweep Prompt

> Feed this file to a Claude Code session to run an incremental research sweep.
> Expected runtime: 30-60 minutes. Expected cost: $5-15.
> Last run: 2026-02-07

## Instructions

You are running a research sweep for the Pompidou command centre — Adam's intelligence layer for evaluating Claude Code ecosystem tools.

### Step 1: Understand Current State

Read these files:
- `catalogue/_index.md` — master list of all catalogued tools
- `stack/current.md` — current recommended stack
- `research/sources.md` — where to look for new tools
- `research/methodology.md` — how to evaluate tools

### Step 2: Scan Sources for New Tools

For each source in `sources.md`:

**Awesome Lists:**
1. Fetch the README of each awesome list
2. Extract every tool/project mentioned
3. Diff against `catalogue/_index.md` — identify tools NOT already catalogued
4. For each new tool with 500+ stars: create a catalogue entry

**GitHub Trending:**
1. Search GitHub for "claude code" repos created or trending in the last 30 days
2. Filter for 500+ stars
3. Diff against catalogue

**Community Sources:**
1. Web search: `"claude code" new tool site:reddit.com` (last 30 days)
2. Web search: `"claude code" plugin tool site:news.ycombinator.com` (last 30 days)
3. Web search: `"claude code" tool announcement 2026` (last 30 days)
4. Note any tools with significant community discussion

### Step 3: Write Catalogue Entries

For each new tool discovered (parallelized via sub-agents):
1. Fetch the GitHub README
2. Check star count, last commit, activity level
3. Web search for community sentiment
4. Evaluate against Holy Grail criteria (see methodology.md)
5. Write catalogue entry using `catalogue/_template.md` format
6. Place in the appropriate category directory

### Step 4: Update Existing Entries

For each ★ CHOSEN tool:
1. Check if star count has changed significantly (±20%)
2. Check if there are new major releases
3. Check for negative community sentiment shifts
4. Update the entry if anything changed

### Step 5: Synthesize

1. Update `catalogue/_index.md` with new entries
2. Flag any new tool that might change `stack/current.md` recommendations
3. Add new decisions to `stack/decisions.md` if warranted
4. Update `stack/roadmap.md` with newly discovered tools worth evaluating
5. Update this file's "Last run" date

### Step 6: Report

Output a summary:
- New tools catalogued (count + names)
- Existing tools updated (count + what changed)
- Recommendations that changed (if any)
- Tools removed or deprecated
- Next sweep date recommendation

## Sweep Triggers

Run this sweep:
- **Monthly** (scheduled)
- **After major Claude Code release** (spot check)
- **When a tool hits 5K+ stars** (spot check specific tool)
- **When community sentiment shifts** on a ★ CHOSEN tool
