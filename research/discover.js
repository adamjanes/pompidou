#!/usr/bin/env node

/**
 * Pompidou Discovery Script
 *
 * Scans GitHub, awesome lists, and npm to find Claude Code ecosystem tools
 * not yet in the Pompidou catalogue. Outputs research/candidates.md.
 *
 * Usage:
 *   node research/discover.js                # Full discovery run
 *   node research/discover.js --dry-run      # Preview without writing files
 *   node research/discover.js --verbose       # Show detailed output
 *   node research/discover.js --github-only   # Skip awesome lists and npm
 *   node research/discover.js --awesome-only  # Skip GitHub search and npm
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..'); // pompidou/
const CATALOGUE_DIR = join(PROJECT_ROOT, 'catalogue');
const STATE_PATH = join(__dirname, '.discovery-state.json');
const OUTPUT_PATH = join(__dirname, 'candidates.md');
const SEARCH_DELAY_MS = 2500; // 24 queries/min, under 30/min limit

const CATALOGUE_SUBDIRS = [
  'spec', 'tasks', 'execution', 'orchestration', 'process',
  'scheduling', 'notification', 'native', 'context', 'memory',
  'monitoring', 'worktree', 'security',
];

const GITHUB_URL_RE = /https:\/\/github\.com\/([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)/g;

const AWESOME_LISTS = [
  'hesreallyhim/awesome-claude-code',
  'jqueryscript/awesome-claude-code',
  'travisvn/awesome-claude-skills',
  'ComposioHQ/awesome-claude-skills',
  'quemsah/awesome-claude-plugins',
];

const NPM_QUERIES = ['claude-code', 'claude-agent', 'ralph-wiggum'];

// ---------------------------------------------------------------------------
// CLI flags
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const VERBOSE = args.includes('--verbose');
const GITHUB_ONLY = args.includes('--github-only');
const AWESOME_ONLY = args.includes('--awesome-only');

// ---------------------------------------------------------------------------
// Logging
// ---------------------------------------------------------------------------

function log(msg) {
  const prefix = DRY_RUN ? '[DRY RUN] ' : '';
  console.log(`${prefix}${msg}`);
}

function verbose(msg) {
  if (VERBOSE) log(`  ${msg}`);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sleep(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) { /* busy-wait — fine for short CLI delays */ }
}

function thirtyDaysAgo() {
  const d = new Date();
  d.setDate(d.getDate() - 30);
  return d.toISOString().split('T')[0]; // YYYY-MM-DD
}

function truncate(str, len) {
  if (!str) return '';
  return str.length > len ? str.slice(0, len - 3) + '...' : str;
}

function formatNumber(n) {
  return n.toLocaleString('en-US');
}

/**
 * Run a shell command, return stdout. On failure log a warning and return null.
 * If `retry` is true, wait 5 s and retry once on error.
 */
function execCommand(cmd, { retry = false, label = '' } = {}) {
  try {
    return execSync(cmd, {
      encoding: 'utf-8',
      maxBuffer: 10 * 1024 * 1024,
      stdio: ['pipe', 'pipe', 'pipe'],
    });
  } catch (err) {
    if (retry) {
      verbose(`Retrying after error${label ? ` (${label})` : ''}: ${err.message}`);
      sleep(5000);
      try {
        return execSync(cmd, {
          encoding: 'utf-8',
          maxBuffer: 10 * 1024 * 1024,
          stdio: ['pipe', 'pipe', 'pipe'],
        });
      } catch (err2) {
        verbose(`Retry also failed${label ? ` (${label})` : ''}: ${err2.message}`);
        return null;
      }
    }
    verbose(`Command failed${label ? ` (${label})` : ''}: ${err.message}`);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Phase 1: Load known repos from catalogue
// ---------------------------------------------------------------------------

function loadKnownRepos() {
  log('Phase 1: Loading known repos...');
  const known = new Set();

  // Scan catalogue subdirectories
  for (const sub of CATALOGUE_SUBDIRS) {
    const dir = join(CATALOGUE_DIR, sub);
    if (!existsSync(dir) || !statSync(dir).isDirectory()) continue;

    const files = readdirSync(dir).filter(
      f => f.endsWith('.md') && f !== '_index.md' && f !== '_template.md'
    );

    for (const file of files) {
      const content = readFileSync(join(dir, file), 'utf-8');
      let match;
      GITHUB_URL_RE.lastIndex = 0;
      while ((match = GITHUB_URL_RE.exec(content)) !== null) {
        // Strip trailing .git, slashes, anchors, etc.
        const repo = match[1].replace(/\.git$/, '').replace(/\/+$/, '').toLowerCase();
        known.add(repo);
        verbose(`Known: ${repo} (from catalogue/${sub}/${file})`);
      }
    }
  }

  // Also scan stack/current.md
  const stackPath = join(PROJECT_ROOT, 'stack', 'current.md');
  if (existsSync(stackPath)) {
    const content = readFileSync(stackPath, 'utf-8');
    let match;
    GITHUB_URL_RE.lastIndex = 0;
    while ((match = GITHUB_URL_RE.exec(content)) !== null) {
      const repo = match[1].replace(/\.git$/, '').replace(/\/+$/, '').toLowerCase();
      known.add(repo);
      verbose(`Known: ${repo} (from stack/current.md)`);
    }
  }

  log(`  Found ${known.size} known repos in catalogue + stack.`);
  return known;
}

// ---------------------------------------------------------------------------
// Phase 2a: Discover via GitHub search
// ---------------------------------------------------------------------------

function ghSearchPage(query, sort, page, perPage = 100) {
  const q = encodeURIComponent(query);
  const cmd = `gh api "search/repositories?q=${q}&sort=${sort}&per_page=${perPage}&page=${page}" --cache 1h`;
  return execCommand(cmd, { retry: true, label: `search: ${query} p${page}` });
}

function discoverViaGitHub() {
  log('Phase 2a: Searching GitHub (14 queries)...');

  const QUERIES = [
    { q: 'topic:claude-code', sort: 'stars', maxPages: 10, label: 'topic-claude-code-stars' },
    { q: 'topic:claude-code', sort: 'updated', maxPages: 10, label: 'topic-claude-code-updated' },
    { q: '"claude code" in:name', sort: 'stars', maxPages: 5, label: 'name-claude-code-stars' },
    { q: '"claude code" in:name', sort: 'updated', maxPages: 3, label: 'name-claude-code-updated' },
    { q: '"claude code" plugin in:name,description', sort: 'stars', maxPages: 3, label: 'plugin' },
    { q: '"claude code" hook in:name,description', sort: 'stars', maxPages: 3, label: 'hook' },
    { q: '"claude code" skill in:name,description', sort: 'stars', maxPages: 3, label: 'skill' },
    { q: '"claude code" mcp in:name,description', sort: 'stars', maxPages: 3, label: 'mcp' },
    { q: '"ralph wiggum" in:name,description,readme', sort: 'stars', maxPages: 10, label: 'ralph-wiggum' },
    { q: '"ralph loop" in:name,description,readme', sort: 'stars', maxPages: 5, label: 'ralph-loop' },
    { q: `"claude code" in:description created:>${thirtyDaysAgo()}`, sort: 'stars', maxPages: 5, label: 'new-tools' },
    { q: '"claude-code" in:name fork:false', sort: 'stars', maxPages: 5, label: 'exact-name' },
    { q: 'topic:mcp-server claude in:description', sort: 'stars', maxPages: 3, label: 'mcp-server' },
    { q: '"CLAUDE.md" tool OR framework OR plugin in:readme', sort: 'stars', maxPages: 3, label: 'claudemd-refs' },
  ];

  /** @type {Map<string, object>} */
  const repos = new Map();
  let errors = 0;

  for (let qi = 0; qi < QUERIES.length; qi++) {
    const { q, sort, maxPages, label } = QUERIES[qi];

    for (let page = 1; page <= maxPages; page++) {
      log(`  [${qi + 1}/${QUERIES.length}] Searching: ${label} (page ${page}/${maxPages})...`);

      const raw = ghSearchPage(q, sort, page);
      if (!raw) {
        errors++;
        break; // move to next query
      }

      let data;
      try {
        data = JSON.parse(raw);
      } catch {
        verbose(`Failed to parse JSON for ${label} page ${page}`);
        errors++;
        break;
      }

      const items = data.items || [];
      const totalCount = data.total_count || 0;

      verbose(`${items.length} results (total_count: ${totalCount})`);

      for (const item of items) {
        if (item.fork || item.archived) continue;

        const key = (item.full_name || '').toLowerCase();
        if (!key) continue;

        if (repos.has(key)) {
          // Merge sources
          const existing = repos.get(key);
          if (!existing.sources.includes(label)) {
            existing.sources.push(label);
          }
        } else {
          repos.set(key, {
            full_name: item.full_name,
            description: item.description || '',
            stars: item.stargazers_count || 0,
            created_at: item.created_at || '',
            pushed_at: item.pushed_at || '',
            language: item.language || '',
            topics: item.topics || [],
            html_url: item.html_url || `https://github.com/${item.full_name}`,
            sources: [label],
          });
        }
      }

      // Stop paginating if we've fetched all results or got a short page
      if (items.length < 100 || (page * 100) >= totalCount) {
        break;
      }

      sleep(SEARCH_DELAY_MS);
    }

    // Delay between queries
    if (qi < QUERIES.length - 1) {
      sleep(SEARCH_DELAY_MS);
    }
  }

  log(`  GitHub search complete: ${repos.size} unique repos, ${errors} errors.`);
  return { repos, errors };
}

// ---------------------------------------------------------------------------
// Phase 2b: Discover via awesome lists
// ---------------------------------------------------------------------------

function discoverViaAwesomeLists() {
  log('Phase 2b: Scanning awesome lists...');

  /** @type {Map<string, { sources: string[] }>} */
  const repos = new Map();
  let errors = 0;

  for (const list of AWESOME_LISTS) {
    const [owner, repo] = list.split('/');
    log(`  Fetching: ${list}`);

    const cmd = `gh api "repos/${owner}/${repo}/readme" -H "Accept: application/vnd.github.raw" --cache 1h`;
    const raw = execCommand(cmd, { retry: false, label: `awesome: ${list}` });

    if (!raw) {
      errors++;
      continue;
    }

    GITHUB_URL_RE.lastIndex = 0;
    let match;
    while ((match = GITHUB_URL_RE.exec(raw)) !== null) {
      const key = match[1].replace(/\.git$/, '').replace(/\/+$/, '').toLowerCase();
      // Skip the awesome list itself
      if (key === list.toLowerCase()) continue;

      if (repos.has(key)) {
        if (!repos.get(key).sources.includes(list)) {
          repos.get(key).sources.push(list);
        }
      } else {
        repos.set(key, { sources: [list] });
      }
    }

    sleep(SEARCH_DELAY_MS);
  }

  log(`  Awesome lists complete: ${repos.size} unique repos, ${errors} errors.`);
  return { repos, errors };
}

// ---------------------------------------------------------------------------
// Phase 2c: Discover via npm
// ---------------------------------------------------------------------------

function discoverViaNpm() {
  log('Phase 2c: Searching npm...');

  /** @type {Map<string, { npmPackage: string }>} */
  const repos = new Map();
  let errors = 0;

  for (const query of NPM_QUERIES) {
    log(`  Searching npm: "${query}"`);

    const cmd = `npm search --json "${query}"`;
    const raw = execCommand(cmd, { retry: false, label: `npm: ${query}` });

    if (!raw) {
      errors++;
      continue;
    }

    let results;
    try {
      results = JSON.parse(raw);
    } catch {
      verbose(`Failed to parse npm JSON for "${query}"`);
      errors++;
      continue;
    }

    if (!Array.isArray(results)) {
      verbose(`npm search for "${query}" returned non-array`);
      continue;
    }

    for (const pkg of results) {
      const repoUrl = pkg.links?.repository || '';
      if (!repoUrl.includes('github.com')) continue;

      GITHUB_URL_RE.lastIndex = 0;
      const match = GITHUB_URL_RE.exec(repoUrl);
      if (!match) continue;

      const key = match[1].replace(/\.git$/, '').replace(/\/+$/, '').toLowerCase();
      if (!repos.has(key)) {
        repos.set(key, { npmPackage: pkg.name || '' });
      }
    }
  }

  log(`  npm search complete: ${repos.size} unique repos, ${errors} errors.`);
  return { repos, errors };
}

// ---------------------------------------------------------------------------
// Merge and deduplicate
// ---------------------------------------------------------------------------

function mergeResults(githubRepos, awesomeRepos, npmRepos, knownRepos) {
  log('Merging and deduplicating...');

  /** @type {Map<string, object>} */
  const merged = new Map();
  const alreadyKnown = new Set();

  // Start with GitHub results (richest metadata)
  for (const [key, data] of githubRepos) {
    if (knownRepos.has(key)) {
      alreadyKnown.add(key);
      continue;
    }
    merged.set(key, {
      ...data,
      fromGitHub: true,
      fromAwesome: false,
      fromNpm: false,
      awesomeSources: [],
      npmPackage: '',
    });
  }

  // Merge awesome list findings
  for (const [key, data] of awesomeRepos) {
    if (knownRepos.has(key)) {
      alreadyKnown.add(key);
      continue;
    }
    if (merged.has(key)) {
      const existing = merged.get(key);
      existing.fromAwesome = true;
      existing.awesomeSources = data.sources;
      // Add awesome list names to sources
      for (const src of data.sources) {
        const awesomeLabel = `awesome:${src}`;
        if (!existing.sources.includes(awesomeLabel)) {
          existing.sources.push(awesomeLabel);
        }
      }
    } else {
      merged.set(key, {
        full_name: key,
        description: '',
        stars: 0,
        created_at: '',
        pushed_at: '',
        language: '',
        topics: [],
        html_url: `https://github.com/${key}`,
        sources: data.sources.map(s => `awesome:${s}`),
        fromGitHub: false,
        fromAwesome: true,
        fromNpm: false,
        awesomeSources: data.sources,
        npmPackage: '',
        needsMetadata: true,
      });
    }
  }

  // Merge npm findings
  for (const [key, data] of npmRepos) {
    if (knownRepos.has(key)) {
      alreadyKnown.add(key);
      continue;
    }
    if (merged.has(key)) {
      const existing = merged.get(key);
      existing.fromNpm = true;
      existing.npmPackage = data.npmPackage;
      if (!existing.sources.includes('npm')) {
        existing.sources.push('npm');
      }
    } else {
      merged.set(key, {
        full_name: key,
        description: '',
        stars: 0,
        created_at: '',
        pushed_at: '',
        language: '',
        topics: [],
        html_url: `https://github.com/${key}`,
        sources: ['npm'],
        fromGitHub: false,
        fromAwesome: false,
        fromNpm: true,
        awesomeSources: [],
        npmPackage: data.npmPackage,
        needsMetadata: true,
      });
    }
  }

  log(`  Merged: ${merged.size} net new, ${alreadyKnown.size} already known.`);
  return { merged, alreadyKnown };
}

// ---------------------------------------------------------------------------
// Phase 3: Fetch missing metadata
// ---------------------------------------------------------------------------

function fetchMissingMetadata(merged) {
  const needMetadata = [...merged.entries()].filter(([, v]) => v.needsMetadata);
  if (needMetadata.length === 0) {
    log('Phase 3: No missing metadata to fetch.');
    return;
  }

  log(`Phase 3: Fetching metadata for ${needMetadata.length} repos...`);

  const BATCH_SIZE = 10;
  let fetched = 0;
  let errors = 0;

  for (let i = 0; i < needMetadata.length; i += BATCH_SIZE) {
    const batch = needMetadata.slice(i, i + BATCH_SIZE);

    for (const [key] of batch) {
      const cmd = `gh api "repos/${key}" --cache 1h`;
      const raw = execCommand(cmd, { retry: false, label: `meta: ${key}` });

      if (!raw) {
        errors++;
        continue;
      }

      let data;
      try {
        data = JSON.parse(raw);
      } catch {
        errors++;
        continue;
      }

      const entry = merged.get(key);
      entry.full_name = data.full_name || key;
      entry.description = data.description || '';
      entry.stars = data.stargazers_count || 0;
      entry.created_at = data.created_at || '';
      entry.pushed_at = data.pushed_at || '';
      entry.language = data.language || '';
      entry.topics = data.topics || [];
      entry.html_url = data.html_url || `https://github.com/${key}`;
      delete entry.needsMetadata;
      fetched++;
    }

    // Small delay between batches
    if (i + BATCH_SIZE < needMetadata.length) {
      sleep(200);
    }
  }

  log(`  Metadata fetched: ${fetched} OK, ${errors} errors.`);
}

// ---------------------------------------------------------------------------
// Phase 3.5: Relevance scoring
// ---------------------------------------------------------------------------

// High-signal GitHub search queries (these specifically target Claude Code tools)
const HIGH_SIGNAL_SOURCES = new Set([
  'topic-claude-code-stars', 'topic-claude-code-updated',
  'name-claude-code-stars', 'name-claude-code-updated',
  'plugin', 'hook', 'skill', 'mcp',
  'ralph-wiggum', 'ralph-loop',
  'new-tools', 'exact-name',
]);

// Awesome lists specifically about Claude Code (not general coding)
const CLAUDE_AWESOME_LISTS = new Set([
  'hesreallyhim/awesome-claude-code',
  'jqueryscript/awesome-claude-code',
  'travisvn/awesome-claude-skills',
  'ComposioHQ/awesome-claude-skills',
]);

// Keywords that indicate Claude Code relevance in name or description
const CLAUDE_KEYWORDS_RE = /\bclaude[\s-]?code\b|\bclaude[\s-]?agent\b|\bclaude[\s-]?skill\b|\bclaude[\s-]?hook\b|\bclaude[\s-]?plugin\b|\bralph[\s-]?wiggum\b|\bralph[\s-]?loop\b|\banthropic\b|\bCLAUDE\.md\b|\bclaude[\s-]?mcp\b/i;

// Known noise: general tools, competing products, awesome lists themselves
const NOISE_RE = /^(vercel|next\.?js|react|vue|angular|svelte|tailwind|supabase|prisma|drizzle|openai|gemini|copilot|cursor|windsurf|kimi|metabase|payload|cherry|theia|daily|gitops|devtools)/i;

function scoreRelevance(candidate) {
  let score = 0;
  const name = (candidate.full_name || '').toLowerCase();
  const desc = (candidate.description || '').toLowerCase();
  const topics = (candidate.topics || []).map(t => t.toLowerCase());
  const sources = candidate.sources || [];

  // Topic tag is the strongest signal
  if (topics.includes('claude-code')) score += 30;
  if (topics.includes('claude-code-plugin')) score += 25;
  if (topics.includes('claude-code-skill')) score += 25;
  if (topics.includes('claude-code-hook')) score += 25;
  if (topics.includes('mcp-server') && (desc.includes('claude') || name.includes('claude'))) score += 20;

  // Name contains Claude Code terms
  if (/claude[\s_-]?code/.test(name)) score += 20;
  if (/ralph[\s_-]?(wiggum|loop)/.test(name)) score += 20;

  // Description mentions Claude Code
  if (CLAUDE_KEYWORDS_RE.test(desc)) score += 15;
  if (CLAUDE_KEYWORDS_RE.test(candidate.description || '')) score += 5; // case-sensitive bonus

  // Found via high-signal search queries
  const highSignalHits = sources.filter(s => HIGH_SIGNAL_SOURCES.has(s)).length;
  score += highSignalHits * 8;

  // Found in Claude-specific awesome lists
  const awesomeLists = (candidate.awesomeSources || []);
  const claudeAwesomeHits = awesomeLists.filter(s => CLAUDE_AWESOME_LISTS.has(s)).length;
  score += claudeAwesomeHits * 10;

  // Found in multiple sources (cross-validation)
  if (sources.length >= 3) score += 10;
  if (sources.length >= 5) score += 5;

  // npm package (someone published it as a tool)
  if (candidate.fromNpm) score += 5;

  // Penalty: only found via low-signal queries
  const onlyClaudemdRefs = sources.length === 1 && sources[0] === 'claudemd-refs';
  if (onlyClaudemdRefs) score -= 10;

  // Penalty: only found in quemsah list (includes general tools)
  const onlyQuemsah = sources.length === 1 && sources[0] === 'awesome:quemsah/awesome-claude-plugins';
  if (onlyQuemsah) score -= 5;

  // Penalty: name matches known noise patterns
  const repoName = name.split('/')[1] || '';
  if (NOISE_RE.test(repoName)) score -= 15;

  // Penalty: likely an awesome list itself, not a tool
  if (repoName.startsWith('awesome-') || repoName.startsWith('awesome_')) score -= 10;

  return Math.max(0, score);
}

function filterByRelevance(merged) {
  log('Phase 3.5: Scoring relevance...');

  const relevant = new Map();
  const filtered = new Map();
  const THRESHOLD = 30;

  for (const [key, data] of merged) {
    data.relevance = scoreRelevance(data);
    if (data.relevance >= THRESHOLD) {
      relevant.set(key, data);
    } else {
      filtered.set(key, data);
    }
  }

  log(`  Relevant (score >= ${THRESHOLD}): ${relevant.size}`);
  log(`  Filtered out: ${filtered.size}`);

  return { relevant, filtered };
}

// ---------------------------------------------------------------------------
// Phase 4: Generate candidates.md
// ---------------------------------------------------------------------------

function generateCandidatesMd(relevant, filtered, alreadyKnown, _knownRepos, previousState) {
  log('Phase 4: Generating candidates.md...');

  const now = new Date().toISOString();
  const allCandidates = [...relevant.values()].sort((a, b) => b.relevance - a.relevance || b.stars - a.stars);

  // Determine "new since last run"
  const previousSeen = previousState?.seen || {};
  const newSinceLastRun = allCandidates.filter(
    c => !previousSeen[(c.full_name || '').toLowerCase()]
  );
  const lastRunDate = previousState?.lastRun || 'N/A (first run)';

  // Summary stats
  const totalScanned = relevant.size + filtered.size + alreadyKnown.size;

  let md = '';

  // Header
  md += `# Discovery Candidates\n\n`;
  md += `> Auto-generated by \`research/discover.js\` on ${now}\n`;
  md += `> Run: \`node research/discover.js\` from pompidou/\n\n`;

  // Summary table
  md += `## Summary\n\n`;
  md += `| Metric | Count |\n`;
  md += `|--------|-------|\n`;
  md += `| Total repos scanned | ${formatNumber(totalScanned)} |\n`;
  md += `| Already in catalogue | ${formatNumber(alreadyKnown.size)} |\n`;
  md += `| Relevant candidates | ${formatNumber(relevant.size)} |\n`;
  md += `| Filtered out (noise) | ${formatNumber(filtered.size)} |\n`;
  md += `| New since last run | ${formatNumber(newSinceLastRun.length)} |\n\n`;

  // New since last run
  if (newSinceLastRun.length > 0) {
    md += `## New Since Last Run\n\n`;
    md += `> Repos not seen in the previous discovery run (${lastRunDate}).\n\n`;
    md += `| Repo | Rel | Stars | Description | Created | Last Push | Language | Sources |\n`;
    md += `|------|-----|-------|-------------|---------|-----------|----------|---------|\n`;
    for (const c of newSinceLastRun) {
      md += formatCandidateRow(c);
    }
    md += '\n';
  }

  // All relevant candidates
  md += `## All Candidates\n\n`;
  md += `| Repo | Rel | Stars | Description | Created | Last Push | Language | Sources |\n`;
  md += `|------|-----|-------|-------------|---------|-----------|----------|---------|\n`;
  for (const c of allCandidates) {
    md += formatCandidateRow(c);
  }
  md += '\n';

  // Filtered out (collapsed)
  const filteredSorted = [...filtered.values()].sort((a, b) => b.stars - a.stars);
  md += `## Filtered Out (Low Relevance)\n\n`;
  md += `<details>\n`;
  md += `<summary>${filtered.size} repos scored below relevance threshold</summary>\n\n`;
  md += `| Repo | Rel | Stars | Description | Sources |\n`;
  md += `|------|-----|-------|-------------|---------|\n`;
  for (const c of filteredSorted) {
    const name = c.full_name || '';
    const link = `[${name}](${c.html_url})`;
    const desc = truncate(c.description, 60).replace(/\|/g, '\\|');
    const sources = (c.sources || []).join(', ');
    md += `| ${link} | ${c.relevance} | ${formatNumber(c.stars)} | ${desc} | ${sources} |\n`;
  }
  md += `\n</details>\n\n`;

  // Already known
  md += `## Already Known (Skipped)\n\n`;
  md += `<details>\n`;
  md += `<summary>${alreadyKnown.size} repos already in catalogue</summary>\n\n`;
  const sortedKnown = [...alreadyKnown].sort();
  for (const k of sortedKnown) {
    md += `- ${k}\n`;
  }
  md += `\n</details>\n`;

  return md;
}

function formatCandidateRow(c) {
  const name = c.full_name || '';
  const link = `[${name}](${c.html_url})`;
  const desc = truncate(c.description, 80).replace(/\|/g, '\\|');
  const created = (c.created_at || '').split('T')[0];
  const pushed = (c.pushed_at || '').split('T')[0];
  const lang = c.language || '';
  const sources = (c.sources || []).join(', ');
  return `| ${link} | ${c.relevance} | ${formatNumber(c.stars)} | ${desc} | ${created} | ${pushed} | ${lang} | ${sources} |\n`;
}

// ---------------------------------------------------------------------------
// Phase 5: State management
// ---------------------------------------------------------------------------

function loadState() {
  if (existsSync(STATE_PATH)) {
    try {
      return JSON.parse(readFileSync(STATE_PATH, 'utf-8'));
    } catch {
      verbose('Failed to parse state file, starting fresh.');
    }
  }
  return {
    lastRun: null,
    version: 1,
    stats: { totalScanned: 0, alreadyKnown: 0, netNew: 0 },
    seen: {},
  };
}

function saveState(state) {
  writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
}

function updateState(previousState, merged, alreadyKnown) {
  const now = new Date().toISOString();
  const seen = { ...(previousState.seen || {}) };

  for (const [key, data] of merged) {
    const lowerKey = key.toLowerCase();
    if (!seen[lowerKey]) {
      seen[lowerKey] = {
        firstSeen: now,
        stars: data.stars,
      };
    } else {
      // Update star count
      seen[lowerKey].stars = data.stars;
    }
  }

  return {
    lastRun: now,
    version: 1,
    stats: {
      totalScanned: merged.size + alreadyKnown.size,
      alreadyKnown: alreadyKnown.size,
      netNew: merged.size,
    },
    seen,
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  log('=== Pompidou Discovery ===\n');

  // Check gh is available
  const ghCheck = execCommand('gh --version', { retry: false, label: 'gh check' });
  if (!ghCheck) {
    console.error('Error: `gh` CLI not found. Install it: https://cli.github.com/');
    process.exit(1);
  }
  verbose(`gh version: ${ghCheck.trim().split('\n')[0]}`);

  // Load previous state
  const previousState = loadState();

  // Phase 1
  const knownRepos = loadKnownRepos();

  // Phase 2a, 2b, 2c
  let githubRepos = new Map();
  let githubErrors = 0;
  let awesomeRepos = new Map();
  let awesomeErrors = 0;
  let npmRepos = new Map();
  let npmErrors = 0;

  if (!AWESOME_ONLY) {
    const gh = discoverViaGitHub();
    githubRepos = gh.repos;
    githubErrors = gh.errors;
  }

  if (!GITHUB_ONLY) {
    const aw = discoverViaAwesomeLists();
    awesomeRepos = aw.repos;
    awesomeErrors = aw.errors;
  }

  if (!GITHUB_ONLY && !AWESOME_ONLY) {
    const npm = discoverViaNpm();
    npmRepos = npm.repos;
    npmErrors = npm.errors;
  }

  // Merge
  const { merged, alreadyKnown } = mergeResults(githubRepos, awesomeRepos, npmRepos, knownRepos);

  // Phase 3
  fetchMissingMetadata(merged);

  // Phase 3.5 — relevance filter
  const { relevant, filtered } = filterByRelevance(merged);

  // Phase 4
  const markdown = generateCandidatesMd(relevant, filtered, alreadyKnown, knownRepos, previousState);

  if (!DRY_RUN) {
    writeFileSync(OUTPUT_PATH, markdown);
    log(`\nOutput written: ${OUTPUT_PATH}`);
  } else {
    log(`\n[DRY RUN] Would write ${markdown.length} bytes to ${OUTPUT_PATH}`);
  }

  // Phase 5 — state tracks ALL seen repos (not just relevant)
  const newState = updateState(previousState, merged, alreadyKnown);
  if (!DRY_RUN) {
    saveState(newState);
    log(`State saved: ${STATE_PATH}`);
  } else {
    log(`[DRY RUN] Would save state to ${STATE_PATH}`);
  }

  // Final summary
  const totalErrors = githubErrors + awesomeErrors + npmErrors;

  const previousSeen = previousState?.seen || {};
  const newSinceLastRun = [...relevant.keys()].filter(k => !previousSeen[k.toLowerCase()]);

  log(`\n=== Discovery Complete ===`);
  log(`Total repos scanned: ${formatNumber(merged.size + alreadyKnown.size)}`);
  log(`Already in catalogue: ${formatNumber(alreadyKnown.size)}`);
  log(`Relevant candidates: ${formatNumber(relevant.size)}`);
  log(`Filtered out (noise): ${formatNumber(filtered.size)}`);
  log(`New since last run: ${formatNumber(newSinceLastRun.length)}`);
  log(`Errors: ${totalErrors}`);
  log('');
  log(`Output: research/candidates.md`);
  log(`State: research/.discovery-state.json`);
}

main().catch(err => {
  console.error('Discovery failed:', err);
  process.exit(1);
});
