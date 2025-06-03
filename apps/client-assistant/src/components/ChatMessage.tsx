import { motion } from 'framer-motion';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

const preprocessMessage = (text: string): string => {
  // Replace bullet points followed by space with proper markdown list items
  text = text.replace(/[•●] /g, '- ');
  
  // Ensure there are proper line breaks before and after lists
  text = text.replace(/\n[-•●]/g, '\n\n-');
  
  // Add line breaks between sentences that start with bullet points
  text = text.replace(/\. [-•●]/g, '.\n\n-');
  
  // Ensure double line breaks before lists
  text = text.replace(/([^\\n])\n+[-•●]/g, '$1\n\n-');
  
  // Add double line breaks after colons that precede lists
  text = text.replace(/:\n*([-•●])/g, ':\n\n$1');
  
  // Ensure proper spacing around headings (lines ending with :)
  text = text.replace(/:\n([^\n])/g, ':\n\n$1');
  
  return text;
};

export const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  const { data: session } = useSession();

  const markdownComponents: Components = {
    p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
    strong: ({children}) => <strong className="font-semibold">{children}</strong>,
    ul: ({children}) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
    ol: ({children}) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
    li: ({children}) => <li className="mb-1">{children}</li>,
    a: ({children, href}) => (
      <a 
        href={href}
        className={`underline ${isUser ? 'text-white' : 'text-primary-600'}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    code: ({children}) => (
      <code className="bg-opacity-20 bg-gray-800 rounded px-1">{children}</code>
    ),
  };
  
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
          <div className={`font-sans text-[15px] leading-relaxed ${isUser ? 'text-white' : 'text-gray-700'} markdown-content`}>
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {preprocessMessage(message)}
            </ReactMarkdown>
          </div>
        </motion.div>
        <span className="text-xs text-gray-400 mt-1 px-2 font-sans">
          {timestamp}
        </span>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-xl overflow-hidden flex-shrink-0">
          {session?.user?.image ? (
            <div className="relative w-full h-full">
              <Image
                src={session.user.image}
                alt={session.user.name || 'User profile'}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <UserCircleIcon className="w-6 h-6 text-gray-600" />
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}; 