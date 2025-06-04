import { ChatMessage, ChatSession, ChatHistory, ChatResponse, ChatSessionsResponse } from '../types/chat';
import { v4 as uuidv4 } from 'uuid';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const api = {
  // Create a new chat session
  createSession: async (): Promise<ChatSession> => {
    // Generate a new session ID
    const session_id = uuidv4();
    return {
      session_id,
      messageCount: 0,
      lastActivity: new Date().toISOString()
    };
  },

  // Get all chat sessions
  getAllSessions: async (): Promise<ChatSession[]> => {
    const response = await fetch(`${API_URL}/chat`);
    if (!response.ok) throw new Error('Failed to get sessions');
    const data: ChatSessionsResponse = await response.json();
    return data.sessions;
  },

  // Get chat history for a session
  getChatHistory: async (sessionId: string): Promise<ChatMessage[]> => {
    const response = await fetch(`${API_URL}/chat/${sessionId}/history`);
    if (!response.ok) throw new Error('Failed to get chat history');
    const data: ChatHistory = await response.json();
    return data.history;
  },

  // Send a message in a chat session
  sendMessage: async (sessionId: string, message: string, email: string): Promise<ChatResponse> => {
    const response = await fetch(`${API_URL}/chat/${sessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: message, email }),
    });
    if (!response.ok) throw new Error('Failed to send message');
    return response.json();
  },
}; 