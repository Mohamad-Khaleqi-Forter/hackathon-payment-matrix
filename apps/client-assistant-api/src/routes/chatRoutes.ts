import { Router } from 'express';
import { chatService } from '../services/chat.service';

const router = Router();

// Create a new chat session
router.post('/sessions', async (req, res) => {
  try {
    const session = await chatService.createSession();
    res.json(session);
  } catch (error) {
    console.error('Failed to create session:', error);
    res.status(500).json({ error: 'Failed to create session' });
  }
});

// Get all chat sessions
router.get('/sessions', async (req, res) => {
  try {
    const sessions = await chatService.getAllSessions();
    res.json(sessions);
  } catch (error) {
    console.error('Failed to get sessions:', error);
    res.status(500).json({ error: 'Failed to get sessions' });
  }
});

// Get a specific chat session
router.get('/sessions/:id', async (req, res) => {
  try {
    const session = await chatService.getSession(req.params.id);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json(session);
  } catch (error) {
    console.error('Failed to get session:', error);
    res.status(500).json({ error: 'Failed to get session' });
  }
});

// Add a message to a chat session
router.post('/sessions/:id/messages', async (req, res) => {
  try {
    const { text, isUser } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Message text is required' });
    }

    const message = await chatService.addMessage(req.params.id, text, isUser);
    res.json(message);
  } catch (error) {
    console.error('Failed to add message:', error);
    if (error instanceof Error && error.message === 'Session not found') {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.status(500).json({ error: 'Failed to add message' });
  }
});

export default router; 