import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const mockSession = {
  user: {
    name: "Mock User",
    email: "mock@example.com",
    image: "https://via.placeholder.com/150",
  },
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
};

export const authOptions: NextAuthOptions = {
  providers: process.env.MOCK_AUTH === "true" 
    ? []
    : [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          authorization: {
            params: {
              prompt: "select_account",
            },
          },
        }),
      ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session }) {
      if (process.env.MOCK_AUTH === "true") {
        return mockSession;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  debug: process.env.NODE_ENV === "development",
}; 