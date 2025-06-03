import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { ChatMessage as ChatMessageType } from '../types/chat';
import { api } from '../lib/api';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { SparklesIcon, ExclamationCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const messageVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export const ChatContainer = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { id: sessionId } = router.query;
  const { data: session, status } = useSession();
  const isMockAuth = process.env.NEXT_PUBLIC_MOCK_AUTH === "true";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (status === "unauthenticated" && !isMockAuth) {
      router.push('/auth/signin');
      return;
    }

    const initializeChat = async () => {
      if (!router.isReady || (status !== "authenticated" && !isMockAuth)) return;

      setIsInitializing(true);
      setError(null);
      
      try {
        if (router.pathname === '/chats' && !sessionId) {
          const newSession = await api.createSession();
          router.push(`/chats/${newSession.session_id}`, undefined, { shallow: true });
        } else if (typeof sessionId === 'string') {
          const history = await api.getChatHistory(sessionId);
          setMessages(history);
        }
      } catch (error) {
        console.error('Failed to initialize chat:', error);
        setError('Failed to load chat session. Please try again or start a new chat.');
        if (error instanceof Error && error.message.includes('404')) {
          setTimeout(() => {
            router.push('/chats');
          }, 3000);
        }
      } finally {
        setIsInitializing(false);
      }
    };

    initializeChat();
  }, [router.isReady, sessionId, status, isMockAuth]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  };

  const handleSendMessage = async (text: string) => {
    if (!sessionId || typeof sessionId !== 'string' || (!session && !isMockAuth)) return;

    try {
      setIsLoading(true);
      setError(null);
      simulateTyping();

      // Add user message to the UI immediately
      const userMessage: ChatMessageType = {
        role: 'user',
        content: text
      };
      setMessages(prev => [...prev, userMessage]);

      // Send message to API
      const response = await api.sendMessage(sessionId, text);

      // Add assistant response to the UI
      const assistantMessage: ChatMessageType = {
        role: 'assistant',
        content: response.response
      };
      setMessages(prev => [...prev, assistantMessage]);
      
    } catch (error) {
      console.error('Failed to send message:', error);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitializing) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] bg-transparent">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6 p-8 glass rounded-2xl"
        >
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-20"></div>
            <div className="relative w-full h-full border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 font-display">
            Loading your conversation...
          </h2>
          <p className="text-gray-500 font-sans">Please wait while we fetch your chat history</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-transparent relative">
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass sticky top-0 z-20 border-b border-gray-100"
    >
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/chats')}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
              </motion.button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center animate-float">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold font-display gradient-text">
                    AI Shopping Assistant
                  </h1>
                  {sessionId && (
                    <p className="text-sm text-gray-500 font-sans">
                      Session: {typeof sessionId === 'string' ? sessionId.slice(0, 8) : ''}
                    </p>
                  )}
        </div>
      </div>
            </div>
            <div className="flex items-center gap-4">
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600"
                >
                  <span className="text-sm font-medium font-sans">AI is thinking</span>
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
              {session?.user?.image && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{session.user.name}</span>
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={session.user.image}
                      alt={session.user.name || 'User profile'}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

          {error && (
            <motion.div
          initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-4"
        >
          <div className="max-w-5xl mx-auto">
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl">
              <div className="flex items-center gap-2 text-red-700">
                <ExclamationCircleIcon className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-medium font-sans">{error}</p>
              </div>
            </div>
          </div>
            </motion.div>
          )}

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={index}
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
                  message={message.content || ''}
                  isUser={message.role === 'user'}
                  timestamp={new Date().toISOString()}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      <div className="sticky bottom-0 z-10 pb-4 pt-2 px-4 bg-gradient-to-t from-gray-50 to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="glass rounded-2xl p-1">
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}; 