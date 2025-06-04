import { useState, FormEvent, KeyboardEvent, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperAirplaneIcon, MicrophoneIcon, SparklesIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  initialValue?: string;
}

const MAX_HISTORY_SIZE = 50; // Maximum number of messages to store

export const ChatInput = ({ onSendMessage, isLoading, initialValue = '' }: ChatInputProps) => {
  const [message, setMessage] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const [messageHistory, setMessageHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const localInputRef = useRef<HTMLTextAreaElement>(null);

  // Update message when initialValue changes
  useEffect(() => {
    if (initialValue) {
      setMessage(initialValue);
      // If there's an initial value, submit it
      if (initialValue.trim() && !isLoading) {
        handleSubmit(new Event('submit') as any);
      }
    }
  }, [initialValue]);

  const saveMessageToHistory = (newMessage: string) => {
    const updatedHistory = [
      newMessage,
      ...messageHistory.filter(msg => msg !== newMessage) // Remove duplicates
    ].slice(0, MAX_HISTORY_SIZE); // Limit size

    setMessageHistory(updatedHistory);
    localStorage.setItem('chatMessageHistory', JSON.stringify(updatedHistory));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      saveMessageToHistory(message.trim());
      onSendMessage(message.trim());
      setMessage('');
      setHistoryIndex(-1);
      // Reset textarea height
      if (localInputRef.current) {
        localInputRef.current.style.height = 'auto';
        localInputRef.current.style.height = `${localInputRef.current.scrollHeight}px`;
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        e.preventDefault();
        if (message.trim() && !isLoading) {
          handleSubmit(e as unknown as FormEvent);
        }
      }
    } else if (e.key === 'ArrowUp' && !e.shiftKey) {
      e.preventDefault();
      if (messageHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < messageHistory.length) {
          setHistoryIndex(newIndex);
          setMessage(messageHistory[newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown' && !e.shiftKey) {
      e.preventDefault();
      if (historyIndex > -1) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setMessage(newIndex === -1 ? '' : messageHistory[newIndex]);
      }
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (localInputRef.current) {
      localInputRef.current.style.height = 'auto';
      localInputRef.current.style.height = `${localInputRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white border-t border-gray-100 shadow-lg"
    >
      <div className="max-w-4xl mx-auto px-4 py-4">
        <form onSubmit={handleSubmit} className="relative">
          <motion.div
            animate={{
              scale: isFocused ? 1.02 : 1,
              boxShadow: isFocused
                ? '0 8px 30px rgba(0,0,0,0.12)'
                : '0 2px 4px rgba(0,0,0,0.05)',
            }}
            transition={{ duration: 0.2 }}
            className="relative flex items-end gap-2 bg-white rounded-2xl border border-gray-200 p-2"
          >
            <div className="flex-grow relative">
              <textarea
                ref={localInputRef}
                rows={1}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (historyIndex !== -1) setHistoryIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Ask about products or provide payment details..."
                className="w-full text-base resize-none bg-transparent border-0 focus:ring-0 focus:outline-none py-2 px-3 max-h-32"
                style={{ minHeight: '44px' }}
                disabled={isLoading}
              />
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <div className="flex items-center gap-2 text-primary-500">
                      <SparklesIcon className="w-5 h-5 animate-pulse" />
                      <span className="text-sm">Processing...</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <MicrophoneIcon className="w-6 h-6" />
              </motion.button>

              <motion.button
                type="submit"
                disabled={!message.trim() || isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={clsx(
                  'p-3 rounded-xl text-white transition-colors duration-200',
                  message.trim() && !isLoading
                    ? 'bg-gradient-to-r from-primary-600 to-primary-500 shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 cursor-not-allowed'
                )}
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={false}
            animate={{
              width: isFocused ? '100%' : '0%',
            }}
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"
          />
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-xs text-center text-gray-400"
        >
          Press Enter to send, Shift + Enter for new line, ↑↓ for message history
        </motion.div>
      </div>
    </motion.div>
  );
}; 