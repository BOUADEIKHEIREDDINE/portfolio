import { Html, Head, Main, NextScript } from "next/document";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Kheireddine Bouadi, AI & Data Science student in Paris. Data pipelines, LLM / RAG tools and native Android apps." />
        <meta name="theme-color" content="#0a0a0a" />
        <meta property="og:title" content="Kheireddine Bouadi | AI & Data Science" />
        <meta property="og:description" content="Data pipelines, LLM / RAG tools and native Android apps." />
        <meta property="og:image" content={`${base}/photo/portrait.jpg`} />
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%230a0a0a'/%3E%3Ctext x='16' y='22' font-family='Georgia,serif' font-size='17' fill='%23f7f7f5' text-anchor='middle'%3EKB%3C/text%3E%3C/svg%3E"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
