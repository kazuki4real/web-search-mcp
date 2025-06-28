# Web Search MCP Server

An MCP server that provides web search capabilities using OpenAI's o3 model for Claude Code.

## Features

- **Web Search**: Perform web searches with OpenAI o3 model's reasoning capabilities
- **Configurable**: Customizable search context size and reasoning effort
- **MCP Compatible**: Seamlessly integrates with Claude Code via MCP protocol
- **TypeScript**: Full TypeScript support with type safety

## Installation

```bash
npm install -g web-search-mcp
```

Or install locally:

```bash
npm install web-search-mcp
```

## Configuration

Set the following environment variables:

- `OPENAI_API_KEY` (required): Your OpenAI API key
- `SEARCH_CONTEXT_SIZE` (optional): Maximum context size for search results (default: 2000)
- `REASONING_EFFORT` (optional): Reasoning effort level - low, medium, high (default: medium)

### Example .env file

```env
OPENAI_API_KEY=your_openai_api_key_here
SEARCH_CONTEXT_SIZE=3000
REASONING_EFFORT=high
```

## Usage with Claude Code

### Global Configuration

Add to your global Claude Code settings:

```json
{
  "mcpServers": {
    "web-search": {
      "command": "npx",
      "args": ["web-search-mcp"],
      "env": {
        "OPENAI_API_KEY": "your_openai_api_key_here"
      }
    }
  }
}
```

### Project-specific Configuration

Add to your project's `.claude/settings.local.json`:

```json
{
  "mcpServers": {
    "web-search": {
      "command": "npx",
      "args": ["web-search-mcp"],
      "env": {
        "OPENAI_API_KEY": "your_openai_api_key_here",
        "REASONING_EFFORT": "high"
      }
    }
  }
}
```

## Available Tools

### web_search

Searches the web using OpenAI o3 model with reasoning capabilities.

**Parameters:**
- `query` (string, required): The search query to execute

**Example:**
```typescript
// Claude Code will automatically have access to this tool
// You can ask Claude to search for information like:
// "Search for the latest React 19 features"
// "Find information about TypeScript 5.0 new features"
```

## Development

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
git clone https://github.com/yourusername/web-search-mcp.git
cd web-search-mcp
npm install
```

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

### Development Mode

```bash
npm run dev
```

## Project Structure

```
web-search-mcp/
├── src/
│   ├── index.ts          # MCP server entry point
│   ├── config.ts         # Configuration management
│   ├── openai-client.ts  # OpenAI API client
│   ├── search-tools.ts   # Search tool definitions
│   └── __tests__/        # Unit tests
├── dist/                 # Build output
├── package.json
├── tsconfig.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and add tests
4. Run tests: `npm test`
5. Commit your changes: `git commit -am 'Add new feature'`
6. Push to the branch: `git push origin feature/new-feature`
7. Create a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- GitHub Issues: [Report bugs or request features](https://github.com/yourusername/web-search-mcp/issues)
- Documentation: See this README and inline code documentation

## Changelog

### 0.1.0
- Initial release
- Basic web search functionality
- OpenAI o3 integration
- MCP protocol support
- Environment-based configuration