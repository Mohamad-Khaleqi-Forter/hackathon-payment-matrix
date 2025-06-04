import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatSession } from '../../types/chat';
import { api } from '../../lib/api';
import { 
  ChatBubbleLeftRightIcon, 
  PlusIcon, 
  SparklesIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';

const features = [
  {
    icon: ShieldCheckIcon,
    title: "Secure Payments",
    description: "Advanced fraud protection and secure payment processing"
  },
  {
    icon: ShoppingBagIcon,
    title: "Smart Shopping",
    description: "AI-powered product recommendations and price comparisons"
  },
  {
    icon: CurrencyDollarIcon,
    title: "Best Deals",
    description: "Find the best prices and exclusive offers automatically"
  }
];

export default function ChatsPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth/signin');
    },
  });
  const isMockAuth = process.env.NEXT_PUBLIC_MOCK_AUTH === "true";

  const loadSessions = async () => {
    try {
      const data = await api.getAllSessions();
      setSessions(data);
    } catch (error) {
      console.error('Failed to load sessions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated" || isMockAuth) {
      loadSessions();
    }
  }, [status, isMockAuth]);

  const handleCreateSession = async () => {
    if (!session && !isMockAuth) {
      router.push('/auth/signin');
      return;
    }

    try {
      const newSession = await api.createSession();
      router.push(`/chats/${newSession.session_id}`);
    } catch (error) {
      console.error('Failed to create session:', error);
    }
  };

  if (status === "loading" && !isMockAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-tr from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto relative">
            <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-20"></div>
            <div className="relative w-full h-full border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-50 to-gray-100 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 py-8 relative">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg"
          >
            <SparklesIcon className="w-12 h-12 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-5xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
          >
            AI Shopping Assistant
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Your personal AI shopping companion that helps you find the best deals,
            compare prices, and make secure purchases with confidence.
          </motion.p>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* New Chat Button */}
        <motion.button
          onClick={handleCreateSession}
          whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          whileTap={{ scale: 0.98 }}
          className="w-full mb-12 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-4 border border-gray-100 relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
            animate={{ x: ["0%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <PlusIcon className="w-8 h-8 text-primary-500" />
          <span className="text-xl font-medium text-gray-900">
            Start New Shopping Session
          </span>
        </motion.button>

        {/* Recent Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Sessions</h2>
            {sessions.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsLoading(true);
                  loadSessions();
                }}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <ArrowPathIcon className="w-5 h-5 text-gray-600" />
              </motion.button>
            )}
          </div>

          {isLoading ? (
            <div className="text-center text-gray-500">Loading sessions...</div>
          ) : sessions.length > 0 ? (
            <AnimatePresence>
              {sessions.map((session, index) => (
                <motion.div
                  key={session.session_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push(`/chats/${session.session_id}`)}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-100 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                    animate={{ x: ["0%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary-50 rounded-xl">
                      <ChatBubbleLeftRightIcon className="w-7 h-7 text-primary-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-lg">
                        Shopping Session {session.session_id.slice(0, 8)}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(session.lastActivity).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                      {session.messageCount} messages
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-center text-gray-500 bg-white p-8 rounded-2xl shadow-sm"
            >
              <ShoppingBagIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg">No shopping sessions yet. Start a new one!</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 