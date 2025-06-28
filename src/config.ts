export interface Config {
  openaiApiKey: string;
  searchContextSize: number;
  reasoningEffort: 'low' | 'medium' | 'high';
}

export function loadConfig(): Config {
  const openaiApiKey = process.env.OPENAI_API_KEY;
  if (!openaiApiKey) {
    throw new Error('OPENAI_API_KEY environment variable is required');
  }

  const searchContextSize = parseInt(process.env.SEARCH_CONTEXT_SIZE || '2000', 10);
  const reasoningEffort = (process.env.REASONING_EFFORT || 'medium') as Config['reasoningEffort'];

  if (!['low', 'medium', 'high'].includes(reasoningEffort)) {
    throw new Error('REASONING_EFFORT must be one of: low, medium, high');
  }

  return {
    openaiApiKey,
    searchContextSize,
    reasoningEffort
  };
}