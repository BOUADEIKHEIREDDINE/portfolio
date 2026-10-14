import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const typedRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!typedRef.current) return;

    const typed = new Typed(typedRef.current, {
      strings: [
        `name = "<span class='text-python-orange'>Bouadi Kheireddine</span>"\nprint("<span class='text-emerald-400'>welcome to my portfolio</span>")`
      ],
      // around 5s total typing duration
      typeSpeed: 80,
      backSpeed: 0,
      smartBackspace: false,
      showCursor: true,
      cursorChar: "_",
      contentType: "html",
      loop: false,
      onComplete: () => {
        // allow ~3 seconds for the reader to see the message
        setTimeout(() => onComplete(), 3000);
      }
    });

    return () => {
      typed.destroy();
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-background">
      <div className="mx-4 flex max-w-xl flex-col items-center gap-6 rounded-2xl border border-slate-800 bg-slate-950/90 p-6 text-center shadow-2xl shadow-glow-blue">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 overflow-hidden rounded-full border border-electric-blue/60 bg-slate-900">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/photo/portrait.png`}
              alt="Bouadi Kheireddine portrait"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-left">
            <p className="text-xs uppercase tracking-[0.25em] text-electric-blue/70">
              initializing
            </p>
            <p className="text-lg font-semibold text-slate-50">
              Bouadi Kheireddine
            </p>
          </div>
        </div>

        <div className="w-full terminal-window text-left">
          <div className="terminal-bar">
            <div className="terminal-button red" />
            <div className="terminal-button yellow" />
            <div className="terminal-button green" />
            <span className="ml-3 text-xs text-slate-400">
              python welcome.py
            </span>
          </div>
          <div className="terminal-content text-sm">
            <span
              ref={typedRef}
              className="whitespace-pre-wrap text-slate-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;

