import { ChatContainer } from '../../components/ChatContainer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ChatPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth/signin');
    },
  });
  const router = useRouter();
  const isMockAuth = process.env.NEXT_PUBLIC_MOCK_AUTH === "true";

  useEffect(() => {
    if (status === "unauthenticated" && !isMockAuth) {
      router.push('/auth/signin');
    }
  }, [status, router, isMockAuth]);

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

  if (status === "unauthenticated" && !isMockAuth) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-50 to-gray-100">
      <ChatContainer />
    </div>
  );
} 