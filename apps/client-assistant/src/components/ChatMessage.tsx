import { motion } from 'framer-motion';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import DOMPurify from 'dompurify';
import type { Config } from 'dompurify';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

const isHTML = (text: string): boolean => {
  // Basic check for HTML content - looks for opening and closing tags
  const htmlRegex = /<[a-z][\s\S]*>/i;
  return htmlRegex.test(text);
};

const extractHTMLFromCodeBlock = (text: string): string | null => {
  const htmlCodeBlockRegex = /```html\n([\s\S]*?)```/;
  const match = text.match(htmlCodeBlockRegex);
  return match ? match[1].trim() : null;
};

const preprocessMessage = (text: string): string => {
  // Don't preprocess if it's HTML content
  if (isHTML(text)) return text;
  
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

  const renderContent = () => {
    // Check for HTML code blocks first
    const htmlContent = extractHTMLFromCodeBlock(message);
    if (htmlContent) {
      // Create a custom config for DOMPurify
      const config: Config = {
        ALLOWED_TAGS: ['p', 'a', 'ul', 'ol', 'li', 'strong', 'em', 'code', 'br', 'div', 'span', 'table', 'tr', 'td', 'th', 'thead', 'tbody', 'img'],
        ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'src', 'alt', 'width', 'height'],
      };

      // Sanitize the HTML
      const wrappedHtml = DOMPurify.sanitize(`
        <div class="chat-content">
          ${htmlContent}
        </div>
      `, config);
      
      return (
        <div 
          dangerouslySetInnerHTML={{ __html: wrappedHtml }}
          className={`
            font-sans text-[15px] leading-relaxed 
            ${isUser ? 'text-white [&_a]:text-white' : 'text-gray-700'}
            [&_.chat-content_a]:underline [&_.chat-content_a]:hover:text-primary-600 [&_.chat-content_a]:transition-colors
            [&_.chat-content_ul]:list-disc [&_.chat-content_ul]:ml-4 [&_.chat-content_ul]:mb-2
            [&_.chat-content_ol]:list-decimal [&_.chat-content_ol]:ml-4 [&_.chat-content_ol]:mb-2
            [&_.chat-content_li]:mb-1
            [&_.chat-content_p]:mb-2 [&_.chat-content_p:last-child]:mb-0
            [&_.chat-content_strong]:font-semibold
            [&_.chat-content_code]:bg-opacity-20 [&_.chat-content_code]:bg-gray-800 [&_.chat-content_code]:rounded [&_.chat-content_code]:px-1
            [&_.chat-content_table]:w-full [&_.chat-content_table]:border-collapse [&_.chat-content_table]:mb-4
            [&_.chat-content_th]:border [&_.chat-content_th]:border-gray-300 [&_.chat-content_th]:p-2 [&_.chat-content_th]:bg-gray-50 [&_.chat-content_th]:text-left
            [&_.chat-content_td]:border [&_.chat-content_td]:border-gray-300 [&_.chat-content_td]:p-2
            [&_.chat-content_img]:max-w-full [&_.chat-content_img]:h-auto [&_.chat-content_img]:rounded
          `}
        />
      );
    }
    
    // If no HTML code block is found, check for regular HTML content
    if (isHTML(message)) {
      const config: Config = {
        ALLOWED_TAGS: ['p', 'a', 'ul', 'ol', 'li', 'strong', 'em', 'code', 'br', 'div', 'span', 'table', 'tr', 'td', 'th', 'thead', 'tbody', 'img'],
        ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'src', 'alt', 'width', 'height'],
      };

      const wrappedHtml = DOMPurify.sanitize(`
        <div class="chat-content">
          ${message}
        </div>
      `, config);
      
      return (
        <div 
          dangerouslySetInnerHTML={{ __html: wrappedHtml }}
          className={`
            font-sans text-[15px] leading-relaxed 
            ${isUser ? 'text-white [&_a]:text-white' : 'text-gray-700'}
            [&_.chat-content_a]:underline [&_.chat-content_a]:hover:text-primary-600 [&_.chat-content_a]:transition-colors
            [&_.chat-content_ul]:list-disc [&_.chat-content_ul]:ml-4 [&_.chat-content_ul]:mb-2
            [&_.chat-content_ol]:list-decimal [&_.chat-content_ol]:ml-4 [&_.chat-content_ol]:mb-2
            [&_.chat-content_li]:mb-1
            [&_.chat-content_p]:mb-2 [&_.chat-content_p:last-child]:mb-0
            [&_.chat-content_strong]:font-semibold
            [&_.chat-content_code]:bg-opacity-20 [&_.chat-content_code]:bg-gray-800 [&_.chat-content_code]:rounded [&_.chat-content_code]:px-1
            [&_.chat-content_table]:w-full [&_.chat-content_table]:border-collapse [&_.chat-content_table]:mb-4
            [&_.chat-content_th]:border [&_.chat-content_th]:border-gray-300 [&_.chat-content_th]:p-2 [&_.chat-content_th]:bg-gray-50 [&_.chat-content_th]:text-left
            [&_.chat-content_td]:border [&_.chat-content_td]:border-gray-300 [&_.chat-content_td]:p-2
            [&_.chat-content_img]:max-w-full [&_.chat-content_img]:h-auto [&_.chat-content_img]:rounded
          `}
        />
      );
    }

    // Fall back to markdown rendering
    return (
      <div className={`font-sans text-[15px] leading-relaxed ${isUser ? 'text-white' : 'text-gray-700'} markdown-content`}>
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={markdownComponents}
        >
          {preprocessMessage(message)}
        </ReactMarkdown>
      </div>
    );
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
          {renderContent()}
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