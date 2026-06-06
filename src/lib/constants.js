/**
 * App constants
 *
 * VERSION WORKFLOW:
 * 1. Update APP_VERSION here before shipping
 * 2. Update CLAUDE.md changelog
 * 3. Commit with message "Release vX.X"
 */

export const APP_VERSION = '3.0.0'
export const APP_VERSION_NAME = 'BOB Daily'

// For display: "v2.9.4 — January Update"
export const getVersionString = () => `v${APP_VERSION} — ${APP_VERSION_NAME}`
