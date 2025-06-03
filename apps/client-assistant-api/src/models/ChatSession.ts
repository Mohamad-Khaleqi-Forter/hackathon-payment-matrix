export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  sessionId: string;
}

export interface ChatSession {
  id: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

// In-memory store for development
export class ChatSessionStore {
  private static sessions: Map<string, ChatSession> = new Map();

  static createSession(): ChatSession {
    const id = Math.random().toString(36).substring(2, 15);
    const session: ChatSession = {
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [{
        id: '1',
        text: "Hello! I'm your AI shopping assistant. I can help you find products, compare prices, and make recommendations based on your preferences. What are you looking to shop for today?",
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
        sessionId: id
      }]
    };
    this.sessions.set(id, session);
    return session;
  }

  static getSession(id: string): ChatSession | undefined {
    return this.sessions.get(id);
  }

  static addMessage(sessionId: string, message: Omit<ChatMessage, 'id' | 'sessionId'>): ChatMessage | undefined {
    const session = this.sessions.get(sessionId);
    if (!session) return undefined;

    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substring(2, 15),
      ...message,
      sessionId
    };

    session.messages.push(newMessage);
    session.updatedAt = new Date().toISOString();
    this.sessions.set(sessionId, session);

    return newMessage;
  }

  static getAllSessions(): ChatSession[] {
    return Array.from(this.sessions.values());
  }
} 