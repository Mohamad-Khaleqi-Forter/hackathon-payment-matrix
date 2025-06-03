import { motion } from 'framer-motion';
import { UserCircleIcon } from '@heroicons/react/24/solid';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

export const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <motion.div
      layout
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-end gap-2`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-semibold font-display">AI</span>
        </div>
      )}
      
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[80%]`}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`
            relative px-4 py-3 rounded-2xl
            ${isUser ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' : 'glass'}
            shadow-sm
          `}
        >
          <p className={`font-sans text-[15px] leading-relaxed ${isUser ? 'text-white' : 'text-gray-700'}`}>
            {message}
          </p>
        </motion.div>
        <span className="text-xs text-gray-400 mt-1 px-2 font-sans">
          {timestamp}
        </span>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
          <UserCircleIcon className="w-6 h-6 text-gray-600" />
        </div>
      )}
    </motion.div>
  );
}; 