/**
 * App constants
 *
 * VERSION WORKFLOW:
 * 1. Update APP_VERSION here before shipping
 * 2. Update CLAUDE.md changelog
 * 3. Commit with message "Release vX.X"
 */

export const APP_VERSION = '2.9.4'
export const APP_VERSION_NAME = 'January Update'

// For display: "v2.9.4 — January Update"
export const getVersionString = () => `v${APP_VERSION} — ${APP_VERSION_NAME}`
