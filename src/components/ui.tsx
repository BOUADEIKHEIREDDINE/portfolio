import { motion, useInView, useReducedMotion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Text that slides up line by line from behind a mask. */
export function MaskText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <motion.span className={className} aria-label={text} initial="hidden" whileInView="show" viewport={{ once: true }}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
            transition={{ duration: 0.9, ease, delay: delay + i * 0.06 }}
          >
            {word}
            {" "}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function SectionHeader({ index, label, title, dark }: { index: string; label: string; title: string; dark?: boolean }) {
  return (
    <div className={`mb-12 grid gap-6 border-t pt-6 sm:mb-16 md:grid-cols-12 ${dark ? "border-white/20" : "border-ink"}`}>
      <div className={`label md:col-span-3 ${dark ? "text-white/60" : "text-mute"}`}>
        ({index}) {label}
      </div>
      <h2 className="font-serif text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.01em] md:col-span-9">
        <MaskText text={title} />
      </h2>
    </div>
  );
}

/** Cycles 0..n-1 every `ms` while the element is on screen. */
export function useStepper(n: number, ms: number | number[]) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setStep(n - 1);
      return;
    }
    const d = Array.isArray(ms) ? ms[step % ms.length] : ms;
    const t = setTimeout(() => setStep((s) => (s + 1) % n), d);
    return () => clearTimeout(t);
  }, [inView, step, n, ms, reduced]);
  return { ref, step, inView };
}

/** Types `text` out once `start` becomes true. */
export function useTyped(text: string, start: boolean, speed = 28) {
  const [out, setOut] = useState("");
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!start) {
      setOut("");
      return;
    }
    if (reduced) {
      setOut(text);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, start, speed, reduced]);
  return out;
}

export function BrowserFrame({ url, children, className = "" }: { url: string; children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[10px] border border-ink bg-white shadow-[8px_8px_0_0_#0a0a0a] ${className}`}>
      <div className="flex items-center gap-3 border-b border-ink px-3 py-2">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full border border-ink" />
          <span className="h-2.5 w-2.5 rounded-full border border-ink" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink" />
        </div>
        <div className="mx-auto truncate rounded-full border border-line px-3 py-0.5 font-mono text-[10px] text-mute">{url}</div>
        <span className="w-[42px]" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

export function PhoneFrame({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className="relative mx-auto w-[260px] rounded-[38px] border-[1.5px] border-ink bg-ink p-[7px] shadow-[8px_8px_0_0_rgba(10,10,10,0.18)] sm:w-[280px]">
      <div className={`relative h-[540px] overflow-hidden rounded-[31px] transition-colors duration-700 sm:h-[570px] ${dark ? "bg-[#111]" : "bg-white"}`}>
        <div className="absolute left-1/2 top-2 z-20 h-[18px] w-[80px] -translate-x-1/2 rounded-full bg-ink" />
        {children}
      </div>
    </div>
  );
}

export function DemoCaption({ children }: { children: ReactNode }) {
  return (
    <p className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-mute">
      <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-ink" />
      {children}
    </p>
  );
}

export function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`h-3 w-3 ${className}`} aria-hidden>
      <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`h-3.5 w-3.5 ${className}`} aria-hidden>
      <path d="M4 12L12 4M6 4h6v6" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
