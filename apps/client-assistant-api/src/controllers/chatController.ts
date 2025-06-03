import { Request, Response } from 'express';
import { ChatService } from '../services/chatService.js';

const chatService = new ChatService();

export class ChatController {
  async chatWithProduct(req: Request, res: Response) {
    try {
      const { session_id } = req.params;
      const { text } = req.body;

      const response = await chatService.generateResponse(session_id, text);
      
      res.json({ response });
    } catch (error) {
      console.error('Chat error:', error);
      res.status(500).json({ error: 'Failed to process chat request' });
    }
  }

  async getChatHistory(req: Request, res: Response) {
    try {
      const { session_id } = req.params;
      const history = chatService.getSessionHistory(session_id);

      res.json({ history });
    } catch (error) {
      console.error('Error fetching chat history:', error);
      res.status(500).json({ error: 'Failed to fetch chat history' });
    }
  }

  async getAllSessions(req: Request, res: Response) {
    try {
      const sessions = chatService.getAllSessions();
      res.json({ sessions });
    } catch (error) {
      console.error('Error fetching sessions:', error);
      res.status(500).json({ error: 'Failed to fetch sessions' });
    }
  }
} 