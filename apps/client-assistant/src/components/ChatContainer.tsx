import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { SparklesIcon } from '@heroicons/react/24/solid';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const messageVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setMounted(true);
    const initialMessage: Message = {
      id: '1',
      text: 'Welcome to our AI-powered marketplace! How can I help you today?',
      isUser: false,
      timestamp: new Date().toLocaleTimeString(),
    };
    console.log('Setting initial message:', initialMessage);
    setMessages([initialMessage]);
  }, []);

  useEffect(() => {
    scrollToBottom();
    console.log('Current messages:', messages);
  }, [messages]);

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  };

  const handleSendMessage = async (text: string) => {
    console.log('Sending message:', text);
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => {
      console.log('Previous messages:', prev);
      console.log('Adding new message:', newMessage);
      return [...prev, newMessage];
    });
    
    setIsLoading(true);
    simulateTyping();

    // Simulate response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: "I understand you're looking for products. Let me help you with that. What specific items are you interested in?",
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      };
      console.log('Adding response:', response);
      setMessages(prev => [...prev, response]);
      setIsLoading(false);
    }, 2000);
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-500 to-secondary-500 flex items-center justify-center">
            <SparklesIcon className="w-5 h-5 text-white" />
          </div>
          <span className="font-medium text-gray-900">AI Assistant</span>
        </div>
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-sm text-gray-500 flex items-center gap-2"
          >
            <span className="hidden sm:inline">AI is typing</span>
            <motion.div
              animate={{
                opacity: [0.4, 1, 0.4],
                transition: { duration: 1.5, repeat: Infinity },
              }}
              className="flex gap-1"
            >
              <span>•</span>
              <span>•</span>
              <span>•</span>
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {messages.map((message) => {
            console.log('Rendering message:', message);
            return (
              <motion.div
                key={message.id}
                layout
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 40,
                }}
              >
                <ChatMessage
                  message={message.text}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={messagesEndRef} className="h-4" />
      </div>

      <div className="sticky bottom-0 z-10">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}; 