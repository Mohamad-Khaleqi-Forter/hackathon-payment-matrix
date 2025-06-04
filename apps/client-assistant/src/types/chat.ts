export interface ChatMessage {
  role: 'user' | 'assistant';
  content?: string;
  autoBuy?: boolean;
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