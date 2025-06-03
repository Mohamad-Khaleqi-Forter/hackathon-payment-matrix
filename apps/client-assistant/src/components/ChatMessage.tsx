import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { SparklesIcon } from '@heroicons/react/24/solid';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

export const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  console.log('ChatMessage props:', { message, isUser, timestamp });
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className={clsx(
        'flex items-start gap-3 px-2',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-shrink-0 mt-1"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-md">
          {isUser ? (
            <UserCircleIcon className="w-5 h-5" />
          ) : (
            <SparklesIcon className="w-5 h-5" />
          )}
        </div>
      </motion.div>

      <div className="flex flex-col gap-1 max-w-[80%]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className={clsx(
            'text-xs text-gray-500',
            isUser ? 'text-right' : 'text-left'
          )}
        >
          {timestamp}
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className={clsx(
            'relative rounded-2xl px-4 py-3 shadow-sm',
            isUser
              ? 'bg-gradient-to-r from-primary-600 to-primary-500'
              : 'bg-white border border-gray-100'
          )}
        >
          <div 
            className={clsx(
              'text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words',
              isUser ? 'text-white' : 'text-gray-900'
            )}
          >
            {message || 'No message content'}
          </div>

          <div
            className={clsx(
              'absolute top-4 w-2 h-2 transform rotate-45',
              isUser
                ? '-right-1 bg-primary-500'
                : '-left-1 bg-white border border-gray-100'
            )}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}; 