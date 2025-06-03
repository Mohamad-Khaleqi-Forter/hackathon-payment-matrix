export interface Message {
  role: 'user' | 'assistant';
  content: string | Record<string, any>;
}

interface ChatSession {
  messages: Message[];
  lastActivity: Date;
}

export interface SessionInfo {
  session_id: string;
  messageCount: number;
  lastActivity: Date;
}

export class ChatSessionService {
  private sessions: Map<string, ChatSession> = new Map();

  private readonly SESSION_TIMEOUT = 60 * 60 * 1000; // 1 hour
  private readonly MAX_MESSAGES_PER_SESSION = 10_000; // Maximum number of messages per session

  constructor() {
    setInterval(() => this.cleanupOldSessions(), this.SESSION_TIMEOUT);
  }

  private cleanupOldSessions() {
    const now = new Date();
    for (const [sessionId, session] of this.sessions.entries()) {
      if (now.getTime() - session.lastActivity.getTime() > this.SESSION_TIMEOUT) {
        this.sessions.delete(sessionId);
      }
    }
  }

  getOrCreate(sessionId: string): ChatSession {
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, {
        messages: [],
        lastActivity: new Date()
      });
    }
    const session = this.sessions.get(sessionId)!;
    session.lastActivity = new Date();
    return session;
  }

  getHistory(sessionId: string): Message[] {
    return this.getOrCreate(sessionId).messages;
  }

  addMessage(sessionId: string, message: Message): void {
    const session = this.getOrCreate(sessionId);
    session.messages.push(message);

    // Remove oldest messages if we exceed the limit
    if (session.messages.length > this.MAX_MESSAGES_PER_SESSION) {
      const excessMessages = session.messages.length - this.MAX_MESSAGES_PER_SESSION;
      session.messages.splice(0, excessMessages);
    }
  }

  getAllSessions(): SessionInfo[] {
    return Array.from(this.sessions.entries()).map(([session_id, session]) => ({
      session_id,
      messageCount: session.messages.length,
      lastActivity: session.lastActivity
    }));
  }
} 