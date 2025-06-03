import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { ChatSession } from '../../types/chat';
import { api } from '../../lib/api';
import { ChatBubbleLeftRightIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function ChatsPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
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

    loadSessions();
  }, []);

  const handleCreateSession = async () => {
    try {
      const session = await api.createSession();
      router.push(`/chats/${session.session_id}`);
    } catch (error) {
      console.error('Failed to create session:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Shopping Assistant
          </h1>
          <p className="text-lg text-gray-600">
            Start a new conversation or continue where you left off
          </p>
        </motion.div>

        <motion.button
          onClick={handleCreateSession}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mb-8 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center justify-center gap-3 border border-gray-100"
        >
          <PlusIcon className="w-6 h-6 text-primary-500" />
          <span className="text-lg font-medium text-gray-900">
            Start New Chat
          </span>
        </motion.button>

        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center text-gray-500">Loading sessions...</div>
          ) : sessions.length > 0 ? (
            sessions.map((session) => (
              <motion.div
                key={session.session_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push(`/chats/${session.session_id}`)}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary-50 rounded-lg">
                    <ChatBubbleLeftRightIcon className="w-6 h-6 text-primary-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      Chat Session {session.session_id.slice(0, 8)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(session.lastActivity).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {session.messageCount} messages
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              No chat sessions yet. Start a new one!
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 