import { ChatSessionStore, ChatMessage } from '../models/ChatSession';
import { openAIService } from './openai.service';

class ChatService {
  async createSession() {
    return ChatSessionStore.createSession();
  }

  async getSession(id: string) {
    return ChatSessionStore.getSession(id);
  }

  async getAllSessions() {
    return ChatSessionStore.getAllSessions();
  }

  async addMessage(sessionId: string, text: string, isUser: boolean) {
    const message = ChatSessionStore.addMessage(sessionId, {
      text,
      isUser,
      timestamp: new Date().toLocaleTimeString()
    });

    if (!message) {
      throw new Error('Session not found');
    }

    // If it's a user message, generate AI response
    if (isUser) {
      await this.generateAIResponse(sessionId);
    }

    return message;
  }

  private async generateAIResponse(sessionId: string) {
    const session = ChatSessionStore.getSession(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    // Convert messages to OpenAI format
    const messages = session.messages.map(msg => ({
      role: msg.isUser ? 'user' as const : 'assistant' as const,
      content: msg.text
    }));

    try {
      // Generate AI response
      const aiResponse = await openAIService.generateChatResponse(messages);

      // Add AI response to session
      return ChatSessionStore.addMessage(sessionId, {
        text: aiResponse,
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      });
    } catch (error) {
      console.error('Failed to generate AI response:', error);
      throw new Error('Failed to generate AI response');
    }
  }
}

export const chatService = new ChatService(); 