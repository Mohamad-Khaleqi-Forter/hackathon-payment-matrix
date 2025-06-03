import { ChatMessage, ChatSession } from '../types/chat';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const api = {
  // Create a new chat session
  createSession: async (): Promise<ChatSession> => {
    const response = await fetch(`${API_URL}/sessions`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to create session');
    return response.json();
  },

  // Get a specific chat session
  getSession: async (id: string): Promise<ChatSession> => {
    const response = await fetch(`${API_URL}/sessions/${id}`);
    if (!response.ok) throw new Error('Failed to get session');
    return response.json();
  },

  // Get all chat sessions
  getAllSessions: async (): Promise<ChatSession[]> => {
    const response = await fetch(`${API_URL}/sessions`);
    if (!response.ok) throw new Error('Failed to get sessions');
    return response.json();
  },

  // Send a message in a chat session
  sendMessage: async (sessionId: string, text: string, isUser: boolean): Promise<ChatMessage> => {
    const response = await fetch(`${API_URL}/sessions/${sessionId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, isUser }),
    });
    if (!response.ok) throw new Error('Failed to send message');
    return response.json();
  },
}; 