import type { AppProps } from "next/app";
import "@/styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-dark-background text-slate-100 font-mono">
      <Component {...pageProps} />
    </div>
  );
}

