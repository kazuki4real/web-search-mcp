import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { OpenAIClient } from './openai-client.js';

export const searchTool: Tool = {
  name: 'web_search',
  description: 'Search the web using OpenAI o3 model with reasoning capabilities. Provide a search query and get comprehensive results with analysis.',
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'The search query to execute'
      }
    },
    required: ['query']
  }
};

export async function handleSearchTool(
  openaiClient: OpenAIClient,
  args: any
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  if (!args.query || typeof args.query !== 'string') {
    throw new Error('Query parameter is required and must be a string');
  }

  try {
    const result = await openaiClient.searchAndReason(args.query);
    return {
      content: [
        {
          type: 'text',
          text: result
        }
      ]
    };
  } catch (error) {
    throw new Error(`Search failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}