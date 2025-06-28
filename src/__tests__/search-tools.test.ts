import { handleSearchTool } from '../search-tools';
import { OpenAIClient } from '../openai-client';

jest.mock('../openai-client');

describe('handleSearchTool', () => {
  let mockOpenAIClient: jest.Mocked<OpenAIClient>;

  beforeEach(() => {
    mockOpenAIClient = {
      searchAndReason: jest.fn(),
    } as any;
  });

  it('should handle valid search query', async () => {
    const mockResult = 'Search result content';
    mockOpenAIClient.searchAndReason.mockResolvedValue(mockResult);

    const result = await handleSearchTool(mockOpenAIClient, { query: 'test query' });

    expect(mockOpenAIClient.searchAndReason).toHaveBeenCalledWith('test query');
    expect(result).toEqual({
      content: [
        {
          type: 'text',
          text: mockResult
        }
      ]
    });
  });

  it('should throw error for missing query', async () => {
    await expect(handleSearchTool(mockOpenAIClient, {}))
      .rejects.toThrow('Query parameter is required and must be a string');
  });

  it('should throw error for non-string query', async () => {
    await expect(handleSearchTool(mockOpenAIClient, { query: 123 }))
      .rejects.toThrow('Query parameter is required and must be a string');
  });

  it('should handle OpenAI client errors', async () => {
    mockOpenAIClient.searchAndReason.mockRejectedValue(new Error('API error'));

    await expect(handleSearchTool(mockOpenAIClient, { query: 'test query' }))
      .rejects.toThrow('Search failed: API error');
  });
});