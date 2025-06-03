import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Verify environment variables are loaded
if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is not set');
}

export const config = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    modelName: process.env.MODEL_NAME || 'gpt-4-turbo-preview',
  }
}; 