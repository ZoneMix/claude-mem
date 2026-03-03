# Addressed Security Findings

This document summarizes the security vulnerabilities addressed from the comprehensive security audit (Issue #1251).

## Critical/High Severity

### C-1: Path Traversal in MCP Tools
**Vulnerability:** The `smart_search`, `smart_unfold`, and `smart_outline` MCP tools accepted arbitrary file paths without validating that they were within the project's root directory, allowing access to any file on the system.
**Fix:** Implemented `validatePath` in a new `src/utils/security.ts` file and applied it to all relevant MCP tool handlers to restrict access to the allowed root directory.

### C-2 & C-3: Missing Authentication & Unrestricted Network Exposure
**Vulnerability:** The Worker HTTP API (default port 37777) lacked authentication. While bound to localhost, it could be exposed via DNS rebinding or if a user specifically modified the host to `0.0.0.0`, allowing unauthorized execution of agent tasks or data extraction.
**Fix:**
- Auto-generated a secure `CLAUDE_MEM_API_KEY` on first run.
- Implemented an Express middleware enforcing the `X-API-Key` header for all requests (except static UI and health checks).
- Updated the MCP server and CLI hooks to utilize a new `fetchWithAuth` wrapper.

### C-4: API Keys Exposed in Cleartext
**Vulnerability:** The `GET /api/settings` endpoint returned sensitive credentials (Gemini, OpenRouter, and Internal API keys) in cleartext, exposing them to any local process or XSS attack in the Viewer UI.
**Fix:** Masked sensitive keys in the API response (e.g., `********1234`) and updated the settings update logic to ignore masked values, preventing accidental overwrites.

## Medium Severity

### M-1: Insecure File Permissions
**Vulnerability:** Sensitive files like `~/.claude-mem/settings.json` and `~/.claude-mem/.env` were created with default system permissions, potentially allowing other users on the system to read API keys.
**Fix:** Updated `SettingsDefaultsManager.ts` and `EnvManager.ts` to enforce `0o600` (read/write only by owner) permissions when creating or updating these files.

### M-3: Gemini API Keys in URL Parameters
**Vulnerability:** `GeminiAgent.ts` passed the API key via a URL parameter (`?key=...`), which could be logged by intermediate proxies or system network monitors.
**Fix:** Refactored the API call to pass the key via the `x-goog-api-key` HTTP header.

### M-4: Large JSON Body Limits
**Vulnerability:** The Express server used a global `50mb` limit for JSON parsing, increasing susceptibility to Denial of Service (DoS) attacks.
**Fix:** Reduced the global limit to `1mb`. Kept higher limits (`10mb` for observations and `50mb` for bulk imports) strictly on the specific routes that require them.

### M-5: Leaking Stack Traces
**Vulnerability:** Unhandled exceptions exposed internal system paths and stack traces in the HTTP responses.
**Fix:** Updated `ErrorHandler.ts` to suppress stack traces and detailed error messages when the environment is set to `production`.
