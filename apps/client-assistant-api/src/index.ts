import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.CLIENT_ASSISTANT_API_PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/chat', chatRoutes);

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'MCP Backend is running' });
});

// Start server
app.listen(port, () => {
  console.log(`MCP Backend server is running on port ${port}`);
}); 