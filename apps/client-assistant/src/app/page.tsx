'use client';

import { motion } from 'framer-motion';
import { ChatContainer } from '../components/ChatContainer';
import { SparklesIcon, ShoppingBagIcon, CreditCardIcon } from '@heroicons/react/24/solid';

const features = [
  {
    icon: <SparklesIcon className="w-6 h-6" />,
    title: 'AI-Powered Shopping',
    description: 'Get personalized product recommendations instantly',
  },
  {
    icon: <ShoppingBagIcon className="w-6 h-6" />,
    title: 'Smart Checkout',
    description: 'Seamless and secure payment processing',
  },
  {
    icon: <CreditCardIcon className="w-6 h-6" />,
    title: 'Secure Payments',
    description: 'Advanced fraud protection by Forter',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-primary-500 to-secondary-500 flex items-center justify-center shadow-xl"
          >
            <SparklesIcon className="w-12 h-12 text-white" />
          </motion.div>

          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl sm:text-6xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600"
          >
            AI Shopping Assistant
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
          >
            Your personal shopping companion powered by AI. Ask about products,
            get recommendations, and complete your purchase seamlessly.
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-primary-500/10 to-secondary-500/10 flex items-center justify-center text-primary-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto border border-gray-100"
        >
          <ChatContainer />
        </motion.div>
      </div>
    </main>
  );
}
