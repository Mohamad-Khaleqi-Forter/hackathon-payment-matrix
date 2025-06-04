import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { 
  Cog6ToothIcon, 
  KeyIcon, 
  ShoppingCartIcon, 
  SparklesIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label: string;
  description: string;
}

const Toggle = ({ enabled, onChange, label, description }: ToggleProps) => (
  <div className="flex items-start justify-between py-4">
    <div className="flex-1">
      <label className="text-base font-medium text-gray-900">{label}</label>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    <button
      type="button"
      className={`${
        enabled ? 'bg-indigo-600' : 'bg-gray-200'
      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
    >
      <span
        aria-hidden="true"
        className={`${
          enabled ? 'translate-x-5' : 'translate-x-0'
        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
      />
    </button>
  </div>
);

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  description: string;
  options: { value: string; label: string }[];
}

const Select = ({ value, onChange, label, description, options }: SelectProps) => (
  <div className="py-4">
    <label className="text-base font-medium text-gray-900">{label}</label>
    <p className="text-sm text-gray-500 mb-2">{description}</p>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  description: string;
  type?: string;
  placeholder?: string;
}

const Input = ({ value, onChange, label, description, type = 'text', placeholder }: InputProps) => (
  <div className="py-4">
    <label className="text-base font-medium text-gray-900">{label}</label>
    <p className="text-sm text-gray-500 mb-2">{description}</p>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    />
  </div>
);

export default function SettingsPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth/signin');
    },
  });
  const router = useRouter();
  const isMockAuth = process.env.NEXT_PUBLIC_MOCK_AUTH === "true";

  const [autoBuy, setAutoBuy] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [apiKey, setApiKey] = useState('');

  // Load saved settings
  useEffect(() => {
    const savedAutoBuy = localStorage.getItem('autoBuy');
    if (savedAutoBuy !== null) {
      setAutoBuy(savedAutoBuy === 'true');
    }
  }, []);

  // Save autoBuy setting
  const handleAutoBuyChange = (enabled: boolean) => {
    setAutoBuy(enabled);
    localStorage.setItem('autoBuy', enabled.toString());
    // Trigger storage event for other tabs
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'autoBuy',
      newValue: enabled.toString(),
      oldValue: (!enabled).toString(),
      storageArea: localStorage
    }));
  };

  const llmModels = [
    { value: 'gpt-4', label: 'GPT-4 (Most Capable)' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo (Faster)' },
    { value: 'claude-3-opus', label: 'Claude 3 Opus (Most Advanced)' },
    { value: 'claude-3-sonnet', label: 'Claude 3 Sonnet (Balanced)' },
  ];

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
                <Cog6ToothIcon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 font-display">
                Settings
              </h1>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ShoppingCartIcon className="w-5 h-5 text-indigo-500" />
                Shopping Preferences
              </h2>
              <Toggle
                enabled={autoBuy}
                onChange={handleAutoBuyChange}
                label="Automated Content Buying"
                description="Allow the AI to automatically purchase content on your behalf when it finds good deals"
              />
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-indigo-500" />
                AI Configuration
              </h2>
              <Select
                value={selectedModel}
                onChange={setSelectedModel}
                label="LLM Model"
                description="Choose which AI model to use for generating responses"
                options={llmModels}
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <KeyIcon className="w-5 h-5 text-indigo-500" />
                API Configuration
              </h2>
              <Input
                value={apiKey}
                onChange={setApiKey}
                label="Custom API Key"
                description="Enter your own API key to use with the selected model"
                type="password"
                placeholder="sk-..."
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 