import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import { Link as ScrollLink } from "react-scroll";

const pythonSnippet = [
  "def main():",
  "    model = load_model('model.py')",
  "    stream = DataStream(source='prod')",
  "    for event in stream:",
  "        features = encode(event)",
  "        prediction = model.predict(features)",
  "        yield prediction",
  "",
  "if __name__ == '__main__':",
  "    for y in main():",
  "        log(y)"
].join("\n");

interface HeroProps {
  startTyping: boolean;
}

const Hero: React.FC<HeroProps> = ({ startTyping }) => {
  const typedRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!typedRef.current || !startTyping) {
      if (typedRef.current) {
        typedRef.current.innerHTML = "";
      }
      return;
    }

    const typed = new Typed(typedRef.current, {
      strings: [pythonSnippet],
      typeSpeed: 26,
      backSpeed: 0,
      smartBackspace: false,
      showCursor: false,
      loop: false
    });

    return () => {
      typed.destroy();
    };
  }, [startTyping]);

  const lineNumbers = Array.from({ length: 11 }, (_, i) => i + 1);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-8 pb-12 md:px-8 md:pt-10 md:pb-16 lg:px-24"
      aria-labelledby="hero-title"
    >
      <div className="grid-overlay" />

      <div className="relative z-10 flex w-full max-w-6xl flex-col gap-12 md:flex-row md:items-center">
        <div className="flex-1 space-y-3 md:space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-electric-blue/70">
            &gt; initializing session
          </p>
          <h1
            id="hero-title"
            className="text-3xl font-semibold text-slate-50 sm:text-4xl lg:text-5xl"
          >
            AI &amp; Data Student · Android Developer
          </h1>
          <p className="max-w-xl text-sm text-slate-300 sm:text-base">
            I build automated data pipelines and AI solutions{" "}
            <span className="text-electric-blue">
              (NLP, RAG, machine learning)
            </span>{" "}
            and native Android apps in Kotlin.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <ScrollLink
              to="projects"
              smooth
              duration={500}
              offset={-80}
              className="cursor-pointer rounded-md bg-python-orange px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-glow-orange transition hover:bg-electric-blue hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-python-orange focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              View Projects
            </ScrollLink>
            <ScrollLink
              to="contact"
              smooth
              duration={500}
              offset={-80}
              className="cursor-pointer rounded-md border border-electric-blue px-5 py-2.5 text-sm font-semibold text-electric-blue shadow-sm transition hover:bg-electric-blue/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Contact
            </ScrollLink>
          </div>

          <div className="mt-4 space-y-1 text-xs text-slate-500">
            <p>// stack: Python • FastAPI • Flask • SQL • Kotlin • Jetpack Compose</p>
            <p>// focus: data pipelines, NLP &amp; RAG, Android development</p>
          </div>
        </div>

        <div className="flex-1">
          <div className="editor-window animate-float-slow">
            <div className="editor-header">
              <div className="flex items-center gap-1">
                <span className="terminal-button red" />
                <span className="terminal-button yellow" />
                <span className="terminal-button green" />
              </div>
              <div className="editor-tabs">
                <div className="editor-tab editor-tab--active">
                  <span className="h-2 w-2 rounded-full bg-python-orange" />
                  <span>main.py</span>
                </div>
                <div className="editor-tab">
                  <span className="h-2 w-2 rounded-full bg-electric-blue" />
                  <span>model.py</span>
                </div>
              </div>
              <div className="text-[10px] text-slate-500">
                ● LIVE • AI Coding Session
              </div>
            </div>
            <div className="editor-body">
              <div className="editor-gutter">
                {lineNumbers.map((n) => (
                  <div key={n} className="leading-relaxed">
                    {n}
                  </div>
                ))}
              </div>
              <pre
                className="editor-code"
                aria-label="Animated Python code being written by an AI"
              >
                <code>
                  <span
                    ref={typedRef}
                    className="whitespace-pre text-[13px]"
                  />
                  <span className="editor-cursor" aria-hidden="true" />
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

