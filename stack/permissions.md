# Permissions Manifest

Last audited: 2026-02-09

## External Service Access

### GitHub (3 accounts, each scoped to specific repos)

| Account | Scope | Directory | Orgs |
|---------|-------|-----------|------|
| **adamjanes** | Personal projects | `projects/` | adamjanes/* |
| **adam-frationalfirst** | Fractional First | `clients/fractional-first/` | Fractional-First/* |
| **adam-mission-plus** | E-America + Semble | `clients/e-america/`, `clients/semble/` | E-America/*, SembleHouse/* |

**CRITICAL:** Always `gh auth switch --user <account>` before any push or gh command. The account determines which org you're authenticating to.

All three tokens have `repo` + `workflow` scope (full read/write/admin + Actions).

**SSH routing:** `~/.ssh/config` maps `github.com-e-america` → e-america key, `github.com-adamjanes` → adamjanes key.

### Branch Protection (rulesets on main)

| Repo | Ruleset | Require PR | No Force Push | No Delete | Notes |
|------|---------|-----------|---------------|-----------|-------|
| Fractional-First/talentflow | "Protect Main Branch" | Yes (1 approval) | Yes | Yes | Updated 2026-02-09 |
| Fractional-First/candidates | "Protect Main Branch" | Yes (1 approval) | Yes | Yes | Set 2026-02-09 |
| Fractional-First/ff-workspace | **None** | - | - | - | Private repo, needs GitHub Team |
| Fractional-First/fractional-command | **None** | - | - | - | Private repo, needs GitHub Team |
| E-America/e-america | "Protect Main Branch" | Yes (1 approval) | Yes | Yes | Set 2026-02-09 |
| SembleHouse/Semble | **None** | - | - | - | Private repo, needs GitHub Team |

### Supabase (4 projects, 1 personal access token)

| Project | Ref | Used By |
|---------|-----|---------|
| Fractional First | dtyugokvlksnatftpucm | public-profiles, fractional-command |
| E-America | xsbtpulbqfxxrvpzxtpi | e-america-frontend, content-studio |
| 16insecurities | nlvlkhiwlijarfcbmheh | 16insecurities |
| Semble | xopgoepsswzvzyqrmaaf | semble-app |

**Token:** SUPABASE_ACCESS_TOKEN in shared/.env. MCP servers read from environment.

### Google Cloud

| Credential | Location | Scope |
|------------|----------|-------|
| OAuth (Client ID + Secret) | shared/.env | Google Sheets API |
| Refresh Token | shared/.env | Long-lived Sheets access |
| API Key | shared/.env | Gemini / Imagen |
| Service Account Key | shared/google-cloud/credentials/ | Full GCP access (fractional-command) |

### Vercel (3 projects, auto-deploy on push)

| Project | Auto-Deploy? |
|---------|-------------|
| 16insecurities | Yes — push to main = live |
| firstcomment | Yes — push to main = live |
| frequency-first | Yes — push to main = live |

**Risk:** No staging gate. Any push to main deploys immediately.

### Other Services

| Service | Projects | Token Location |
|---------|----------|---------------|
| Fathom | shared (all) | shared/.env |
| Apify | 7 projects | Per-project .env.local (different tokens) |
| OpenAI | fractional-command | Project .env |
| OpenRouter | content-studio, firstcomment | Per-project .env.local |
| Stripe | semble-app, kangaroo-hook | Per-project .env.local |
| Pinecone | fractional-command | Project .env |
| n8n | semble-app, fractional-command | Per-project .env.local |
| Trello | linkedin/post-writer | Project .env |
| Upstash Redis | semble-app | Project .env.local |

---

## Claude Code Permission Model

### Global Settings

| Setting | Value | Effect |
|---------|-------|--------|
| `permissionMode` | auto | Auto-approve tools |
| `dangerouslyDisablePermissions` | true | Bypass all permission checks |
| `autoApproveTools` | Bash, Read, Write, Edit, Glob, Grep | All core tools whitelisted |
| `trustedPaths` | /Users/adamjanes/code/projects/ | Auto-approve in greenfield |

### Safety Hooks

| Hook | What It Does | Strength |
|------|-------------|----------|
| pre-bash-safety.sh | **Blocks** force push, hard reset, rm -rf / | Hard block |
| Same hook | **Warns** (2s delay) push to main, npm publish, rm -rf | Soft warning only |
| auto-approve-all.mjs | Auto-approves all tools in projects/ | By design |
| iteration-limit.sh | Max 50 tool calls per session | Prevents runaway |
| pre-tool-api-limit.sh | $500 cost cap per 36h | Only if OMC stats exist |
| pre-tool-rate-limit.sh | 500ms between API calls | Rate limiting |

### What's Protected vs What's Not

| Operation | Client Repos | Project Repos |
|-----------|-------------|---------------|
| Read any file | Allowed | Allowed |
| Write any file | Allowed | Allowed |
| Push to feature branch | Allowed | Allowed |
| Push to main | 2s warning | 2s warning |
| Force push | **Blocked** | **Blocked** |
| Hard reset | **Blocked** | **Blocked** |
| rm -rf / | **Blocked** | **Blocked** |
| Trigger GitHub Actions | Allowed | Allowed |
| Deploy via Vercel | N/A | Auto on push |

---

## Credential Storage Rules

| Location | What Goes Here | Gitignored? |
|----------|---------------|-------------|
| shared/.env | Service-level credentials (API keys, tokens) | Yes (.env rule) |
| Per-project .env.local | Project-specific config (URLs, public keys) | Yes (*.local rule) |
| .mcp.json | MCP server config (NO inline tokens) | Yes (.mcp.json rule) |
| shared/google-cloud/credentials/ | GCP service account keys | Yes (**/credentials.json rule) |
| macOS Keychain | GitHub tokens | N/A (OS-level) |
| ~/.ssh/ | SSH keys for GitHub | N/A (not in repo) |

### Rules

1. **Never inline tokens** in .mcp.json — use environment variables
2. **Rotate credentials** by updating shared/.env, then restart terminal
3. **Per-project .env.local** only for project-specific config (URLs, feature flags)
4. **Google Cloud keys** stay in shared/google-cloud/credentials/ (covered by gitignore)
5. **Before adding a new service:** add its token to shared/.env, NOT a project .env

---

## Gaps & Future Work

### Unresolved

- [x] ~~No branch protection on any repo~~ — Rulesets added to talentflow, candidates, e-america (2026-02-09)
- [ ] Push-to-main only warns, doesn't block for client repos
- [ ] No audit log of file reads/writes or git operations
- [ ] Vercel auto-deploys with no staging gate
- [ ] Google Cloud service account key has broad scope (should be narrowed)
- [ ] 7 separate Apify tokens — could consolidate if rate limits allow

### Planned

- [ ] Harden pre-bash-safety.sh: hard block push-to-main for client repos
- [x] ~~Enable branch protection on public client repos~~ — Done (2026-02-09)
- [ ] Upgrade Fractional-First + SembleHouse orgs to GitHub Team for private repo rulesets
- [ ] dotenvx encryption for shared/.env (can then commit safely)
- [ ] Audit logging hook for sensitive operations
- [ ] Vercel preview-only deploys (disable auto-production on push)
