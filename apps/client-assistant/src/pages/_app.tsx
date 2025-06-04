import { SessionProvider } from "next-auth/react";
import type { AppProps } from 'next/app';
import { Outfit, DM_Sans } from "next/font/google";
import Head from 'next/head';
import "../styles/globals.css";
import { Session } from "next-auth";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ['400', '500', '700'],
  display: 'swap',
});

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session} refetchInterval={0}>
      <Head>
        <title>AI Shopping Assistant - Forter Demo</title>
        <meta name="description" content="An AI-powered shopping assistant that helps you find and purchase products seamlessly." />
        <meta name="theme-color" content="#4F46E5" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${outfit.variable} ${dmSans.variable} font-sans antialiased`}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
} 