import { Router } from 'express';
import { ChatController } from '../controllers/chatController';

const router = Router();
const chatController = new ChatController();

// List all sessions
router.get('/', chatController.getAllSessions.bind(chatController));

// Chat with product
router.post('/:session_id', chatController.chatWithProduct.bind(chatController));

// Get chat history
router.get('/:session_id/history', chatController.getChatHistory.bind(chatController));

export default router; 