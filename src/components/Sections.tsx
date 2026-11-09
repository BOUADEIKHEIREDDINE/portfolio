import { motion, useInView, useScroll, useTransform, animate, MotionValue } from "framer-motion";
import { useEffect, useRef, useState, ComponentType } from "react";
import dynamic from "next/dynamic";
import { profile, stats, experience, projects, skills, languages, education, certifications, Entry, DemoKind } from "@/data/content";
import { Reveal, SectionHeader, DemoCaption, Arrow, ease } from "./ui";
import { SkillIcon, tickerIcons, SiGithub, SiLinkedin } from "./icons";

const demos: Record<DemoKind, ComponentType> = {
  phone: dynamic(() => import("./demos/PhoneDemo"), { ssr: false }),
  quiz: dynamic(() => import("./demos/QuizDemo"), { ssr: false }),
  ratios: dynamic(() => import("./demos/RatiosDemo"), { ssr: false }),
  rag: dynamic(() => import("./demos/RagDemo"), { ssr: false }),
  weather: dynamic(() => import("./demos/WeatherDemo"), { ssr: false }),
  market: dynamic(() => import("./demos/MarketDemo"), { ssr: false }),
};

/* ───────────── Ticker ───────────── */

export function Ticker() {
  const row = [...tickerIcons, ...tickerIcons];
  return (
    <div className="overflow-hidden border-y border-ink bg-ink py-5 text-paper" aria-label="Tools I use">
      <div className="flex w-max animate-marquee gap-12 pr-12">
        {row.map(([name, Icon], i) => (
          <span key={i} className="flex items-center gap-3 whitespace-nowrap" aria-hidden={i >= tickerIcons.length}>
            <Icon className="h-5 w-5" aria-hidden />
            <span className="font-serif text-[26px] italic leading-none">{name}</span>
            <span className="ml-9 text-white/30">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ───────────── About ───────────── */

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v.toString().padStart(2, "0")}</span>;
}

export function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = profile.summary.split(" ");
  return (
    <section className="container-x py-24 sm:py-36" id="about">
      <div className="grid gap-8 md:grid-cols-12">
        <p className="label text-mute md:col-span-3">(01) About</p>
        <p ref={ref} className="font-serif text-[clamp(1.9rem,4.4vw,3.6rem)] leading-[1.08] md:col-span-9" aria-label={profile.summary}>
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </p>
      </div>
      <div className="mt-20 grid grid-cols-2 border-t border-ink md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className={`border-ink py-8 pr-4 ${i % 2 ? "pl-4 md:pl-6" : ""} ${i > 0 ? "md:border-l md:pl-6" : ""} ${i % 2 ? "border-l" : ""} ${i >= 2 ? "border-t md:border-t-0" : ""}`}>
            <p className="font-serif text-[clamp(3.5rem,7vw,6rem)] leading-none tabular-nums">
              <Counter to={s.value} />
            </p>
            <p className="label mt-3 text-mute">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───────────── Entries (experience + projects) ───────────── */

function EntryBlock({ e, n, flip }: { e: Entry; n: string; flip: boolean }) {
  const Demo = demos[e.demo];
  return (
    <article className="grid gap-10 border-t border-line py-16 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-12 md:py-24" aria-labelledby={`${e.id}-title`}>
      <div className={`md:col-span-5 ${flip ? "md:order-2" : ""}`}>
        <div className="md:sticky md:top-24">
          <Reveal>
            <div className="flex items-baseline justify-between">
              <span className="flex items-center gap-2 font-mono text-[11px] text-mute">
                <span className="h-2.5 w-2.5 rounded-full border border-ink" style={{ background: e.tint }} />
                {n}
              </span>
              <span className="label text-mute">
                {e.kind} · {e.period}
              </span>
            </div>
            <h3 id={`${e.id}-title`} className="mt-4 font-serif text-[clamp(2.6rem,5vw,4.2rem)] leading-[0.95]">
              {e.org}
            </h3>
            <p className="mt-2 text-[15px] font-medium">{e.title}</p>
            <p className="label mt-1 text-mute">{e.location}</p>
            <p className="mt-6 text-[17px] leading-snug">{e.summary}</p>
          </Reveal>
          <ul className="mt-6 space-y-3 border-t border-line pt-6">
            {e.bullets.map((b, i) => (
              <Reveal key={i} delay={0.05 * i} y={12}>
                <li className="grid grid-cols-[18px_1fr] text-[14px] leading-relaxed text-ink/80">
                  <span className="mt-[9px] h-px w-2.5 bg-ink" />
                  {b}
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.1}>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {e.stack.map((s) => (
                <span key={s} className="rounded-full border border-ink px-2.5 py-1 font-mono text-[10.5px] transition-colors hover:border-accent hover:bg-accent">
                  {s}
                </span>
              ))}
            </div>
            {e.link && (
              <a href={e.link.href} target="_blank" rel="noreferrer" className="group mt-6 inline-flex items-center gap-2 border-b border-ink pb-1 text-[14px]">
                {e.link.label}
                <Arrow className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
          </Reveal>
        </div>
      </div>
      <div className={`min-w-0 md:col-span-7 ${flip ? "md:order-1" : ""}`}>
        <Reveal y={40}>
          <div className="grain rounded-[14px] border border-ink/10 p-4 sm:p-8" style={{ background: e.tint }}>
            <Demo />
          </div>
          <DemoCaption>Live demo, recreated with synthetic data · no client data shown</DemoCaption>
        </Reveal>
      </div>
    </article>
  );
}

export function Experience() {
  return (
    <section id="experience" className="container-x py-20 sm:py-28">
      <SectionHeader index="02" label="Experience" title="Internships" />
      {experience.map((e, i) => (
        <EntryBlock key={e.id} e={e} n={`0${i + 1}`} flip={i % 2 === 1} />
      ))}
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className="container-x py-20 sm:py-28">
      <SectionHeader index="03" label="Industry projects" title="Built for real companies" />
      {projects.map((e, i) => (
        <EntryBlock key={e.id} e={e} n={`0${i + 1}`} flip={i % 2 === 1} />
      ))}
    </section>
  );
}

/* ───────────── Skills ───────────── */

export function Skills() {
  return (
    <section id="skills" className="bg-ink py-24 text-paper sm:py-32">
      <div className="container-x">
        <SectionHeader index="04" label="Skills" title="The toolbox" dark />
        <div className="grid border-t border-white/20 md:grid-cols-2">
          {skills.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.05} className={`border-b border-white/20 py-8 ${gi % 2 === 1 ? "md:border-l md:pl-10" : "md:pr-10"}`}>
              <div className="mb-5 flex items-baseline justify-between">
                <h3 className="font-serif text-[30px] leading-none">{g.title}</h3>
                <span className="font-mono text-[11px] text-white/40">{String(g.items.length).padStart(2, "0")}</span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-2 rounded-full border border-white/25 px-3 py-1.5 text-[13px] transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-ink"
                  >
                    <SkillIcon name={s} className="h-3.5 w-3.5" />
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Credentials ───────────── */

function Seal({ code, ring }: { code: string; ring: string }) {
  const id = `ring-${code}`;
  return (
    <div className="relative h-[120px] w-[120px]">
      <motion.svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 30, ease: "linear" }} aria-hidden>
        <defs>
          <path id={id} d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text className="fill-current font-mono" fontSize="7.6">
          <textPath href={`#${id}`} textLength="286" lengthAdjust="spacing">
            {ring}
          </textPath>
        </text>
      </motion.svg>
      <div className="absolute inset-[22px] grid place-items-center rounded-full border border-current">
        <span className="font-serif text-[19px] leading-none">{code}</span>
      </div>
    </div>
  );
}

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

export function Credentials() {
  return (
    <section id="credentials" className="container-x py-24 sm:py-32">
      <SectionHeader index="05" label="Credentials" title="Certified & educated" />

      <p className="label mb-6 text-mute">Certifications</p>
      <div className="grid gap-px border border-ink bg-ink sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((c, i) => {
          const Wrapper = c.href ? "a" : "div";
          return (
            <Reveal key={c.code} delay={i * 0.07} className="bg-paper">
              <Wrapper
                {...(c.href ? { href: c.href, target: "_blank", rel: "noreferrer" } : {})}
                className={`group flex h-full flex-col items-start gap-8 p-6 transition-colors duration-500 ${c.href ? "hover:bg-accent" : ""}`}
              >
                <Seal code={c.code} ring={`${c.issuer === "Microsoft" ? "MICROSOFT · CERTIFIED" : "FEI · LANGUAGE DIPLOMA"} · ${c.year} · ${c.code} · `} />
                <div className="mt-auto">
                  <p className="label opacity-60">
                    {c.issuer} · {c.year}
                  </p>
                  <p className="mt-2 text-[16px] leading-snug">{c.name}</p>
                  {c.href && (
                    <p className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px]">
                      Verify credential <Arrow className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </p>
                  )}
                </div>
              </Wrapper>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-20 grid gap-16 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="label mb-6 text-mute">Education</p>
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.08}>
              <div className="grid grid-cols-[1fr_auto] gap-4 border-t border-ink py-6">
                <div>
                  <h3 className="font-serif text-[clamp(1.6rem,3vw,2.3rem)] leading-[1.05]">
                    {e.degree}
                    {e.note && <span className="ml-2 align-middle font-mono text-[10px] uppercase tracking-widest text-mute">({e.note})</span>}
                  </h3>
                  <p className="mt-2 text-[14px]">
                    {e.school} · <span className="text-mute">{e.location}</span>
                  </p>
                </div>
                <span className="font-mono text-[12px] tabular-nums">{e.period}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="md:col-span-5">
          <p className="label mb-6 text-mute">Languages · CEFR</p>
          <div className="border-t border-ink">
            {languages.map((l, i) => {
              const idx = levels.indexOf(l.level);
              return (
                <div key={l.name} className="border-b border-line py-5">
                  <div className="mb-3 flex items-baseline justify-between">
                    <span className="font-serif text-[26px] leading-none">{l.name}</span>
                    <span className="font-mono text-[12px]">{l.level}</span>
                  </div>
                  <div className="grid grid-cols-6 gap-1">
                    {levels.map((lv, j) => (
                      <motion.span
                        key={lv}
                        className={`h-1.5 origin-left ${j <= idx ? (j === idx ? "bg-accent" : "bg-ink") : "bg-smoke"}`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease, delay: i * 0.1 + j * 0.06 }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Contact ───────────── */

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };
  return (
    <section id="contact" className="bg-ink text-paper">
      <div className="container-x pb-10 pt-24 sm:pt-36">
        <p className="label text-white/50">(06) Contact</p>
        <h2 className="mt-8 font-serif text-[clamp(3.8rem,13vw,11rem)] leading-[0.86] tracking-[-0.02em]">
          <span className="block overflow-hidden">
            <motion.span className="block" initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease }}>
              Let&apos;s build
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span className="block italic text-accent" initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease, delay: 0.1 }}>
              something.
            </motion.span>
          </span>
        </h2>

        <div className="mt-16 grid gap-10 border-t border-white/20 pt-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <a href={`mailto:${profile.email}`} className="link-u break-all text-[clamp(1.3rem,3vw,2.2rem)] font-light">
              {profile.email}
            </a>
            <div className="mt-4">
              <button onClick={copy} className="rounded-full border border-white/30 px-4 py-2 font-mono text-[11px] transition-colors hover:border-accent hover:bg-accent hover:text-ink">
                {copied ? "Copied ✓" : "Copy email"}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-3 md:col-span-4 md:col-start-9">
            {[
              { href: profile.linkedin, label: "LinkedIn", Icon: SiLinkedin },
              { href: profile.github, label: "GitHub", Icon: SiGithub },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border-b border-white/20 pb-3 text-[18px] transition-colors hover:border-white"
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4" aria-hidden /> {label}
                </span>
                <Arrow className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </div>

        <footer className="mt-24 flex flex-col justify-between gap-3 border-t border-white/20 pt-6 font-mono text-[11px] text-white/50 sm:flex-row">
          <span>© 2026 {profile.firstName} {profile.lastName}</span>
          <span>Demos use synthetic data · no client information</span>
          <a href="#top" className="link-u text-white">
            Back to top ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
