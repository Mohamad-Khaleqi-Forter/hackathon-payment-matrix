export interface ChatMessage {
  role: 'user' | 'assistant';
  content?: string;
}

export interface ChatSession {
  session_id: string;
  messageCount: number;
  lastActivity: string;
}

export interface ChatHistory {
  history: ChatMessage[];
}

export interface ChatResponse {
  response: string;
}

export interface ChatSessionsResponse {
  sessions: ChatSession[];
} 