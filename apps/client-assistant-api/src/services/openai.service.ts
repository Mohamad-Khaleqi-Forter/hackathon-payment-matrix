import OpenAI from 'openai';
import { config } from '../config';

class OpenAIService {
  private client: OpenAI;
  private modelName: string;

  constructor() {
    if (!config.openai.apiKey) {
      throw new Error('OpenAI API key is not configured');
    }
    
    this.client = new OpenAI({
      apiKey: config.openai.apiKey,
    });
    this.modelName = config.openai.modelName;
  }

  async generateChatResponse(messages: Array<{ role: 'user' | 'assistant'; content: string }>) {
    try {
      const completion = await this.client.chat.completions.create({
        model: this.modelName,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful shopping assistant helping users with their shopping experience. Be concise, friendly, and helpful.'
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      return completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to generate AI response');
    }
  }
}

export const openAIService = new OpenAIService(); 