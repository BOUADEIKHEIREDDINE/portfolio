import Head from "next/head";
import React, { useCallback, useState } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import IntroScreen from "@/components/IntroScreen";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
  }, []);

  return (
    <>
      <Head>
        <title>Kheireddine Bouadi · AI &amp; Data · Android</title>
        <meta
          name="description"
          content="Portfolio of Kheireddine Bouadi, AI & Data Science student (aivancity) and Android developer: data pipelines, NLP, RAG and Kotlin apps."
        />
      </Head>

      {/* Intro screen overlays everything until finished */}
      {!introDone && <IntroScreen onComplete={handleIntroComplete} />}

      <div className="relative min-h-screen bg-dark-background text-slate-100">
        {/* Minimal 2D background wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.12),transparent_60%),radial-gradient(circle_at_bottom,_rgba(255,212,59,0.12),transparent_55%)] opacity-80"
        />

        {/* Top bar with name */}
        <header className="relative z-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-1 px-4 py-4 text-center md:px-8">
            <h1 className="text-lg font-semibold tracking-[0.22em] text-electric-blue md:text-2xl">
              BOUADI KHEIREDDINE
            </h1>
            <p className="text-[11px] text-slate-400">
              // AI &amp; Data Student • Android Developer • portfolio.py
            </p>
          </div>
        </header>

        <main className="relative z-10 flex flex-col gap-0">
          <Hero startTyping={introDone} />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
          <Footer />
        </main>
      </div>
    </>
  );
}



