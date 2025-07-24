---
inclusion: always
---

# MCP Servers Reference for ERA Development

## Available MCP Servers

The ERA project has the following MCP servers configured for AI agent use:

### GitHub MCP Server
**Purpose:** Project management and issue tracking
**Key Tools:** `create_issue`, `list_issues`, `get_issue`, `update_issue`, `create_pull_request`, `list_repositories`, `search_repositories`
**Usage:** Bug tracking, feature requests, project management tasks

### Notion MCP Server
**Purpose:** Documentation management and knowledge base
**Key Tools:** `query_database`, `create_page`, `update_page`, `get_page`, `list_databases`
**Usage:** Living documentation, requirements, design decisions

### Brave Search MCP Server
**Purpose:** Web search and research capabilities
**Key Tools:** `brave_web_search`, `brave_local_search`
**Usage:** Research industry practices, find technical solutions, gather information

### AWS Documentation MCP Server
**Purpose:** AWS service documentation for infrastructure decisions
**Key Tools:** `search_aws_docs`, `get_aws_service_info`, `list_aws_services`
**Usage:** Infrastructure research, cloud service decisions

### PostgreSQL MCP Server
**Purpose:** Production database operations
**Key Tools:** `query`, `list_tables`, `describe_table`, `list_schemas`
**Usage:** Production database management, data analysis

### SQLite MCP Server
**Purpose:** Local database operations for development
**Key Tools:** `query`, `list_tables`, `describe_table`, `read_query`
**Usage:** Local development, testing, prototyping

## Usage Guidelines

### When to Use MCP Servers

- **GitHub:** Creating issues, tracking progress, managing PRs
- **Notion:** Maintaining documentation, storing decisions
- **Brave Search:** Research industry practices, find technical solutions
- **AWS Docs:** Researching cloud services and best practices
- **PostgreSQL:** Production database operations and analysis
- **SQLite:** Local development and testing database needs

### Error Handling

When MCP servers are unavailable:
1. Continue with available tools
2. Use manual research or documentation
3. Inform user of limitations
4. Implement appropriate retry logic

### Security Considerations

1. Never expose API keys in logs or outputs
2. Be mindful of sensitive data sent to external services
3. Respect API rate limits and usage quotas
4. Use minimal required permissions for API keys

## Configuration

MCP servers are configured in `.kiro/settings/mcp.json`. Check server status before use and handle unavailability gracefully.

For detailed setup instructions, see: `docs/setup/mcp-servers.md`