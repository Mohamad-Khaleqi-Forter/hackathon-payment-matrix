import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCardIcon,
  PlusIcon,
  ArrowLeftIcon,
  TrashIcon,
  PencilIcon,
  CheckCircleIcon,
  XCircleIcon,
  WalletIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'paypal' | 'wallet';
  name: string;
  last4?: string;
  expiryDate?: string;
  isDefault: boolean;
}

const PaymentMethodsPage = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth/signin');
    },
  });
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedType, setSelectedType] = useState<'credit_card' | 'paypal' | 'wallet' | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'credit_card',
      name: 'Visa ending in 4242',
      last4: '4242',
      expiryDate: '12/25',
      isDefault: true
    },
    {
      id: '2',
      type: 'paypal',
      name: 'PayPal Account',
      isDefault: false
    }
  ]);

  const handleAddPaymentMethod = () => {
    setShowAddModal(true);
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const handleDelete = (id: string) => {
    setPaymentMethods(methods =>
      methods.filter(method => method.id !== id)
    );
  };

  const getPaymentMethodIcon = (type: string) => {
    switch (type) {
      case 'credit_card':
        return <CreditCardIcon className="w-6 h-6" />;
      case 'paypal':
        return <CurrencyDollarIcon className="w-6 h-6" />;
      case 'wallet':
        return <WalletIcon className="w-6 h-6" />;
      default:
        return <CreditCardIcon className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
                <CreditCardIcon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 font-display">
                Payment Methods
              </h1>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddPaymentMethod}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <PlusIcon className="w-5 h-5" />
                Add Payment Method
              </motion.button>
            </div>

            <div className="grid gap-4">
              <AnimatePresence>
                {paymentMethods.map((method, index) => (
                  <motion.div
                    key={method.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
                          {getPaymentMethodIcon(method.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{method.name}</h3>
                          {method.last4 && (
                            <p className="text-sm text-gray-500">
                              Expires {method.expiryDate}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {method.isDefault ? (
                          <span className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                            <CheckCircleIcon className="w-4 h-4" />
                            Default
                          </span>
                        ) : (
                          <button
                            onClick={() => handleSetDefault(method.id)}
                            className="px-3 py-1 text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                          >
                            Set as default
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(method.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md p-6 bg-white rounded-2xl shadow-2xl"
            >
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <XCircleIcon className="w-5 h-5 text-gray-500" />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
                  <PlusIcon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 font-display mb-2">
                  Add Payment Method
                </h2>
                <p className="text-gray-600">
                  Choose a payment method to add
                </p>
              </div>

              <div className="grid gap-4">
                <button
                  onClick={() => setSelectedType('credit_card')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedType === 'credit_card'
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
                      <CreditCardIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">Credit Card</h3>
                      <p className="text-sm text-gray-500">Add a credit or debit card</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedType('paypal')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedType === 'paypal'
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
                      <CurrencyDollarIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">PayPal</h3>
                      <p className="text-sm text-gray-500">Connect your PayPal account</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedType('wallet')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedType === 'wallet'
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
                      <WalletIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">Digital Wallet</h3>
                      <p className="text-sm text-gray-500">Add Apple Pay or Google Pay</p>
                    </div>
                  </div>
                </button>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentMethodsPage; 