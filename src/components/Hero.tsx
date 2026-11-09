import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/content";
import { ease } from "./ui";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#credentials", label: "Credentials" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > 160 && y > prev);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent" style={{ scaleX: progress }} />
      <motion.header
        className="fixed inset-x-0 top-0 z-50 text-white mix-blend-difference"
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease }}
      >
        <div className="container-x flex h-16 items-center justify-between">
          <a href="#top" className="font-serif text-[22px] leading-none">
            K.B.
          </a>
          <nav className="hidden gap-8 md:flex" aria-label="Main">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="link-u label">
                {l.label}
              </a>
            ))}
          </nav>
          <button className="label md:hidden" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-menu">
            Menu
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[70] flex flex-col bg-ink text-white"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="container-x flex h-16 items-center justify-between">
              <span className="font-serif text-[22px]">K.B.</span>
              <button className="label" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
            <nav className="container-x mt-10 flex flex-col gap-2" aria-label="Mobile">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/15 py-3 font-serif text-[44px] leading-none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.5, ease }}
                >
                  <span className="mr-4 font-mono text-[11px] text-white/50">0{i + 1}</span>
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Letters({ word, delay }: { word: string; delay: number }) {
  return (
    <span className="block overflow-hidden" aria-hidden>
      {word.split("").map((c, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "105%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1.1, ease, delay: delay + i * 0.035 }}
        >
          {c}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const nameX = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden pt-24 sm:pt-28">
      <div className="container-x">
        <motion.div className="flex items-center justify-between border-b border-ink pb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }}>
          <span className="label">Portfolio · 2026</span>
          <span className="label flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Open to internships
          </span>
        </motion.div>

        <div className="relative grid gap-8 pt-8 md:grid-cols-12 md:pt-10">
          <motion.h1
            style={{ x: nameX }}
            className="font-serif text-[clamp(4.2rem,15.5vw,13.5rem)] leading-[0.82] tracking-[-0.03em] md:col-span-9"
            aria-label={`${profile.firstName} ${profile.lastName}`}
          >
            <Letters word={profile.firstName} delay={0.1} />
            <span className="flex items-end gap-4">
              <Letters word={profile.lastName} delay={0.35} />
              <motion.span
                className="mb-[0.12em] hidden font-sans text-[clamp(0.8rem,1.2vw,1rem)] italic leading-tight tracking-normal text-mute lg:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
— based in Paris
              </motion.span>
            </span>
          </motion.h1>

          <motion.div
            className="relative order-first aspect-[3/4] w-[46%] max-w-[300px] justify-self-end overflow-hidden bg-smoke md:order-none md:col-span-3 md:w-full md:self-end"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.4, ease, delay: 0.3 }}
          >
            <motion.img
              src={`${base}/photo/portrait.jpg`}
              alt="Portrait of Kheireddine Bouadi"
              className="h-[118%] w-full object-cover object-top grayscale"
              style={{ y: imgY }}
              initial={{ scale: 1.25 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8, ease, delay: 0.3 }}
            />
          </motion.div>
        </div>

        <div className="grid gap-10 border-t border-ink py-10 md:mt-10 md:grid-cols-12">
          <motion.p
            className="text-[clamp(1.15rem,2vw,1.6rem)] font-light leading-snug md:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.9, ease }}
          >
            <span className="font-medium">{profile.role}</span> at {profile.school}. {profile.intro}
          </motion.p>
          <motion.dl
            className="grid grid-cols-2 gap-6 self-end md:col-span-4 md:col-start-9"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {[
              ["Focus", "Data · NLP · RAG · Android"],
              ["Location", profile.location],
              ["Studying", "MSc AI & Data Science"],
              ["Contact", "Email ↓"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="label text-mute">{k}</dt>
                <dd className="mt-1 text-[14px]">{k === "Contact" ? <a href="#contact" className="link-u">{v}</a> : v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
