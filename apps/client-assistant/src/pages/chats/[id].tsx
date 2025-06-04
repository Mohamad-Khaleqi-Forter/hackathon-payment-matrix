import { ChatContainer } from '../../components/ChatContainer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesIcon, ShoppingBagIcon, TagIcon, CreditCardIcon } from '@heroicons/react/24/solid';

const suggestedQueries = [
  {
    icon: ShoppingBagIcon,
    title: "Browse Products",
    queries: [
      "Show me the latest sneakers",
      "What are the trending t-shirts?",
      "Find me red t-shirts",
      "Show me running shoes under $100",
      "What are the best-selling t-shirts?"
    ]
  },
  {
    icon: TagIcon,
    title: "Deals & Discounts",
    queries: [
      "Show me t-shirts on sale",
      "Find shoes with free shipping",
      "What are today's best deals on sneakers?",
      "Show me discounted t-shirts",
      "Find shoes with 50% off or more"
    ]
  },
  {
    icon: CreditCardIcon,
    title: "Order & Payment",
    queries: [
      "I want to buy these t-shirts",
      "Help me order these shoes",
      "I'm ready to pay for my items",
      "Complete my purchase",
      "Checkout my cart"
    ]
  }
];

export default function ChatPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth/signin');
    },
  });
  const router = useRouter();
  const isMockAuth = process.env.NEXT_PUBLIC_MOCK_AUTH === "true";
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [selectedQuery, setSelectedQuery] = useState<string | null>(null);

  useEffect(() => {
    if (!session && !isMockAuth) {
      router.push('/auth/signin');
    }
  }, [session, router, isMockAuth]);

  const handleSuggestionClick = (query: string) => {
    setSelectedQuery(query);
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

  if (!session && !isMockAuth) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-50 to-gray-100">
      <ChatContainer 
        onFirstMessage={() => setShowSuggestions(false)}
        emptyState={
          showSuggestions ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto px-4 py-8"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 font-display">
                    Welcome to AI Shopping Assistant
                  </h1>
                  <p className="text-gray-600">
                    I can help you find products, compare prices, and make purchases
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {suggestedQueries.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
                        <category.icon className="w-5 h-5 text-indigo-500" />
                      </div>
                      <h2 className="font-semibold text-gray-900">{category.title}</h2>
                    </div>
                    <ul className="space-y-3">
                      {category.queries.map((query, queryIndex) => (
                        <motion.li
                          key={queryIndex}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="cursor-pointer"
                        >
                          <button
                            onClick={() => handleSuggestionClick(query)}
                            className="w-full text-left p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow text-gray-700 hover:text-indigo-600"
                          >
                            {query}
                          </button>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm">
                  Start typing or click any suggestion above to begin shopping
                </p>
              </div>
            </motion.div>
          ) : null
        }
        initialMessage={selectedQuery}
      />
    </div>
  );
} 