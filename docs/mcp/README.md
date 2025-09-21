# Model Context Protocol Server Setup

This directory documents how to run the Model Context Protocol (MCP) servers that Claude Desktop (or any MCP-compatible client) can use with this project. The goal is to expose tooling for documentation crawling, browser automation, search, local project files, and Notion research from inside your model.

## Servers Covered

| Server | Purpose | Upstream package |
| --- | --- | --- |
| Firecrawl | Structured documentation crawling & scraping | `@modelcontextprotocol/server-firecrawl` |
| Puppeteer | Headful/headless browser automation | `@modelcontextprotocol/server-puppeteer` |
| Exa Search | Web search w/ citations | `@modelcontextprotocol/server-exa` |
| Filesystem | Read/write access to this repo | `@modelcontextprotocol/server-filesystem` |
| Notion | Query pages & databases from Notion | `@modelcontextprotocol/server-notion` |

> Each server is distributed through the [`modelcontextprotocol/servers`](https://github.com/modelcontextprotocol/servers) monorepo. The commands below use `npx` so you do not need to install them globally.

## Prerequisites

- Node.js 18+ (recommended Node 20) installed and on your PATH (for `npx`).
- Claude Desktop ≥ v0.6.0 or another MCP client that reads a `claude_desktop_config.json` file.
- API credentials:
  - `FIRECRAWL_API_KEY`
  - `EXA_API_KEY`
  - `NOTION_API_KEY` (internal integration token)
- Optional configuration values:
  - `FIRECRAWL_BASE_URL` (defaults to `https://api.firecrawl.dev`)
  - `NOTION_ROOT_PAGE_ID` or a comma-separated list in `NOTION_ROOT_PAGE_IDS`
  - `MCP_SERVER_FILESYSTEM_ROOT` (set to the absolute path of this repository)

Store secrets outside the repository. The sample configuration in this folder uses obvious placeholders that you must replace locally.

## Installing / Updating Dependencies

All servers can be executed with `npx` which downloads the package on first run and caches it under your npm cache directory. If you prefer to pin versions, install them as dev dependencies of this workspace:

```bash
npm install --save-dev \
  @modelcontextprotocol/server-firecrawl \
  @modelcontextprotocol/server-puppeteer \
  @modelcontextprotocol/server-exa \
  @modelcontextprotocol/server-filesystem \
  @modelcontextprotocol/server-notion
```

When using Claude Desktop, `npx -y` in the configuration will automatically run the project-local copy if it exists, or fetch the package if not.

## Configuration File

1. Copy `docs/mcp/claude_desktop_config.example.json` to your OS-specific Claude config location:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%/Claude/claude_desktop_config.json`
   - Linux: `~/.config/Claude/claude_desktop_config.json`
2. Replace every `<<PLACEHOLDER>>` value with your real tokens, paths, or preferred options.
3. Restart Claude Desktop (or reload your MCP client) so it rereads the config.

If you already have a config file, merge the `mcpServers` entries instead of overwriting.

## Server-Specific Notes

### Firecrawl

- Requires a Firecrawl account and API key.
- Supports both crawl and scrape tools with filter options for depth, exclusion patterns, and structured outputs.
- Environment variables:
  - `FIRECRAWL_API_KEY` (required)
  - `FIRECRAWL_BASE_URL` (optional for self-hosted deployments)

### Puppeteer

- Lets the model drive Chromium/Chrome via Puppeteer, making it useful for rich UI automation and visual validation.
- Works headless by default; set `MCP_SERVER_PUPPETEER_HEADLESS="false"` to require the browser window.
- Ensure Chrome/Chromium is installed or allow Puppeteer to download its bundled browser on first launch.

### Exa Search

- Wraps the Exa Search API for fast, citation-rich web search.
- Requires setting `EXA_API_KEY`.
- Optional tuning with `EXA_DEFAULT_NUM_RESULTS` (integer) or `EXA_REGION` (two-letter code).

### Filesystem

- Grants the client read/write access to your local checkout.
- Set `MCP_SERVER_FILESYSTEM_ROOT` to the absolute path of this repository.
- Optionally configure `MCP_SERVER_FILESYSTEM_MODE` to `ro` if you only want read access.

### Notion

- Requires a Notion internal integration token (`NOTION_API_KEY`).
- Share the pages or databases you want accessible with the integration in Notion.
- You can scope the server with `NOTION_ROOT_PAGE_IDS` (comma-separated) to restrict available content.

## Verifying the Setup

1. After restarting Claude Desktop, open **Settings → Model Context Protocol** and ensure each server shows as **Connected**.
2. Ask Claude to run a simple tool from each server, e.g. "List files in the repo" or "Search Exa for MCP".
3. For Puppeteer, request a navigation command (e.g. "Open example.com") to confirm the browser automation works.
4. Monitor the Claude Desktop logs (`~/Library/Logs/Claude/` or `%APPDATA%/Claude/logs/`) if any server fails to start.

## Troubleshooting

- **Command not found**: confirm Node.js is installed and available, or install the package locally and remove `-y` from the command.
- **Auth failures**: double-check API tokens and that the integration has access. Notion requires sharing the page with the integration explicitly.
- **Filesystem permission issues**: on Windows you may need to run Claude Desktop with permission to access the WSL filesystem if you point to `/mnt/c/...`.

Update this document if you introduce additional MCP integrations so that the setup stays reproducible for the rest of the team.
