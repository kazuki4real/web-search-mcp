import OpenAI from 'openai';
import { Config } from './config.js';

export class OpenAIClient {
  private client: OpenAI;
  private config: Config;

  constructor(config: Config) {
    this.config = config;
    this.client = new OpenAI({
      apiKey: config.openaiApiKey,
    });
  }

  async searchAndReason(query: string): Promise<string> {
    try {
      const response = await this.client.chat.completions.create({
        model: 'o3-mini',
        messages: [
          {
            role: 'system',
            content: `You are a helpful assistant that performs web searches and provides comprehensive analysis. 
            Search for information about the given query and provide a detailed response with reasoning.
            Context size limit: ${this.config.searchContextSize} characters.
            Reasoning effort: ${this.config.reasoningEffort}
            
            Please search the web for current information about the user's query and provide a comprehensive response.`
          },
          {
            role: 'user',
            content: `Please search for information about: ${query}`
          }
        ],
        reasoning_effort: this.config.reasoningEffort
      } as any);

      return response.choices[0]?.message?.content || 'No response received from OpenAI';
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`OpenAI API error: ${error.message}`);
      }
      throw new Error('Unknown error occurred while calling OpenAI API');
    }
  }
}