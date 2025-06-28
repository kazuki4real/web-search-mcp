import { loadConfig } from '../config';

describe('loadConfig', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should load config with default values', () => {
    process.env.OPENAI_API_KEY = 'test-api-key';
    
    const config = loadConfig();
    
    expect(config.openaiApiKey).toBe('test-api-key');
    expect(config.searchContextSize).toBe(2000);
    expect(config.reasoningEffort).toBe('medium');
  });

  it('should load config with custom values', () => {
    process.env.OPENAI_API_KEY = 'test-api-key';
    process.env.SEARCH_CONTEXT_SIZE = '5000';
    process.env.REASONING_EFFORT = 'high';
    
    const config = loadConfig();
    
    expect(config.openaiApiKey).toBe('test-api-key');
    expect(config.searchContextSize).toBe(5000);
    expect(config.reasoningEffort).toBe('high');
  });

  it('should throw error when OPENAI_API_KEY is missing', () => {
    delete process.env.OPENAI_API_KEY;
    
    expect(() => loadConfig()).toThrow('OPENAI_API_KEY environment variable is required');
  });

  it('should throw error for invalid reasoning effort', () => {
    process.env.OPENAI_API_KEY = 'test-api-key';
    process.env.REASONING_EFFORT = 'invalid';
    
    expect(() => loadConfig()).toThrow('REASONING_EFFORT must be one of: low, medium, high');
  });
});