import { QuestionsProvider } from "@/contexts";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <QuestionsProvider>
    <Component {...pageProps} />
    </QuestionsProvider>
    <Analytics />
    </>
  );
}
