<h4 align="center">Persistent memory compression system built for <a href="https://claude.com/claude-code" target="_blank">Claude Code</a>.</h4>

<p align="center">
  <a href="#quick-start">Quick Start</a> •
  <a href="#platform-integrations">Platform Integrations</a> •
  <a href="#security-notice">Security Notice</a> •
  <a href="#mcp-search-tools">Search Tools</a> •
  <a href="#documentation">Documentation</a> •
  <a href="#license">License</a>
</p>

<p align="center">
  Claude-Mem seamlessly preserves context across sessions by automatically capturing tool usage observations, generating semantic summaries, and making them available to future sessions. This enables Claude to maintain continuity of knowledge about projects even after sessions end or reconnect.
</p>

---

## Quick Start

Start a new Claude Code session in the terminal and enter the following commands:

```bash
/plugin marketplace add thedotmack/claude-mem

/plugin install claude-mem
```

Restart Claude Code. Context from previous sessions will automatically appear in new sessions.

---

## Platform Integrations

### 🤖 Gemini Support
Claude-Mem supports Google Gemini as a reasoning provider for memory generation. To use Gemini:
1. Open `~/.claude-mem/settings.json`.
2. Set `"CLAUDE_MEM_PROVIDER": "gemini"`.
3. Provide your API key in `"CLAUDE_MEM_GEMINI_API_KEY": "your_api_key"`.
4. (Optional) Select a model like `"CLAUDE_MEM_GEMINI_MODEL": "gemini-2.0-flash"`.

### 🖱️ Cursor Integration
Maintain your project memory within Cursor. Claude-Mem can be integrated into Cursor to provide cross-session context during IDE-based agent tasks.
- See the **[Cursor Hooks Guide](./cursor-hooks/README.md)** for standalone setup and integration steps.

---

## 🔒 Security Notice

The Claude-Mem Worker API (port 37777) has been hardened to prevent unauthorized access.

- **Authentication:** All API requests now require a valid `X-API-Key` header.
- **Local Access:** The API is restricted to `localhost` and `127.0.0.1` by default.
- **Automatic Management:** If you are using Claude-Mem via the official Claude Code plugin or Cursor hooks, this key is managed for you automatically.
- **Manual API Usage:** If you are calling the API manually (e.g., via `curl`), you must include the header:
  ```bash
  curl -H "X-API-Key: YOUR_API_KEY" http://127.0.0.1:37777/api/health
  ```
  *You can find your auto-generated API key in `~/.claude-mem/settings.json` under `CLAUDE_MEM_API_KEY`.*

---

## Key Features

- 🧠 **Persistent Memory** - Context survives across sessions.
- 🔍 **Skill-Based Search** - Query your project history with the `mem-search` skill.
- 🖥️ **Web Viewer UI** - Real-time memory stream at `http://localhost:37777` (requires X-API-Key for data access).
- 🔒 **Privacy Control** - Use `<private>` tags to exclude sensitive content from storage.
- ⚙️ **Context Configuration** - Fine-grained control over what context gets injected.
- 🤖 **Automatic Operation** - No manual intervention required.

---

## MCP Search Tools

Claude-Mem provides intelligent memory search through **4 MCP tools** following a token-efficient **3-layer workflow pattern**:

1. **`search`** - Get a compact index with IDs.
2. **`timeline`** - Get chronological context around interesting results.
3. **`get_observations`** - Fetch full details ONLY for filtered IDs.

**Example Usage:**
```typescript
// Step 1: Search for index
search(query="authentication bug", type="bugfix", limit=10)

// Step 2: Fetch full details for relevant IDs (e.g., #123)
get_observations(ids=[123])
```

---

## Documentation

📚 **[View Full Documentation](https://docs.claude-mem.ai/)**

- **[Installation Guide](https://docs.claude-mem.ai/installation)**
- **[Configuration](https://docs.claude-mem.ai/configuration)**
- **[Troubleshooting](https://docs.claude-mem.ai/troubleshooting)**

---

## License

This project is licensed under the **GNU Affero General Public License v3.0** (AGPL-3.0).

Copyright (C) 2025 Alex Newman (@thedotmack). All rights reserved.

---

## Support

- **Official X Account**: [@Claude_Memory](https://x.com/Claude_Memory)
- **Official Discord**: [Join Discord](https://discord.com/invite/J4wttp9vDu)
- **Repository**: [github.com/thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)

**Built with Claude Agent SDK** | **Powered by Claude Code** | **Made with TypeScript**
