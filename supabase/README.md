# Supabase Database

This folder tracks database migrations for BOB's Supabase backend.

## Folder Structure

```
supabase/
└── migrations/     # SQL migration files (applied via dashboard or MCP)
```

## Migration Naming Convention

`YYYYMMDD_description.sql` — e.g., `20260106_enable_rls_test_devices.sql`

## How Migrations Work

Currently, migrations are applied directly to Supabase via:
1. Supabase Dashboard SQL editor
2. Claude Code MCP tools (`mcp__supabase__apply_migration`)

These files serve as documentation and version control for schema changes.

## Tables

| Table | Purpose |
|-------|---------|
| `games` | Analytics — completed games |
| `feedback` | User feedback from in-app form |
| `shared_brackets` | Public bracket shares |
| `shared_vaults` | Public vault shares |
| `test_devices` | Device IDs to filter from analytics |

## RLS Status

All tables have RLS enabled. Security audit completed Jan 6, 2026:

| Table | SELECT | INSERT | UPDATE | DELETE |
|-------|--------|--------|--------|--------|
| `games` | anon | anon | — | — |
| `feedback` | anon | anon | — | — |
| `shared_brackets` | anon | anon | view_count only | — |
| `shared_vaults` | anon | anon | view_count only | — |
| `custom_categories` | anon | anon | — | — |
| `test_devices` | authenticated | — | — | — |

**Security fixes applied Jan 6, 2026:**
- Removed `feedback` DELETE policy (was allowing anyone to delete all feedback)
- Restricted `shared_brackets` UPDATE to view_count field only
- Restricted `shared_vaults` UPDATE to view_count field only

## Service Role vs Anon Key

- **Anon key** (in frontend code): Respects RLS policies
- **Service role key** (server-side only): Bypasses RLS
