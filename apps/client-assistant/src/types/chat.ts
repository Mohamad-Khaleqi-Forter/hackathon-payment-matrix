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