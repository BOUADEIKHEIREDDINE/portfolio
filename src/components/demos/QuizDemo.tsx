import { motion, AnimatePresence } from "framer-motion";
import { BrowserFrame, useStepper, ease, Check } from "../ui";

const stages = ["Ingest", "Structure", "Generate", "Validate", "Export"];

const passage = [
  { t: "To all staff: the ", k: false },
  { t: "quarterly meeting", k: true },
  { t: " has been moved from Tuesday to ", k: false },
  { t: "Thursday at 10 a.m.", k: true },
  { t: " in the main conference room. Please submit your ", k: false },
  { t: "department reports", k: true },
  { t: " to Ms. Lopez ", k: false },
  { t: "by Wednesday noon", k: true },
  { t: ".", k: false },
];

const options = [
  { l: "A", t: "On Tuesday morning" },
  { l: "B", t: "By Wednesday at noon", correct: true },
  { l: "C", t: "On Thursday at 10 a.m." },
  { l: "D", t: "At the end of the quarter" },
];

const checks = ["Single correct answer", "Distractors plausible", "No duplicate in bank", "Not ambiguous", "Part 7 format"];

export default function QuizDemo() {
  // 0 ingest, 1 structure, 2 generate, 3 validate, 4 export
  const { ref, step } = useStepper(5, [1800, 2200, 2800, 2800, 2600]);

  return (
    <div ref={ref} role="img" aria-label="Animated demo: a short memo is turned into a TOEIC Part 7 question with four options, then validated">
      <div aria-hidden>
        <BrowserFrame url="toeic-generator · pipeline">
          <div className="flex gap-1 border-b border-line px-3 py-2.5 sm:px-4">
            {stages.map((s, i) => (
              <div key={s} className="flex-1">
                <div className="h-[3px] w-full overflow-hidden rounded-full bg-smoke">
                  <motion.div className="h-full bg-ink" initial={false} animate={{ width: i <= step ? "100%" : "0%" }} transition={{ duration: 0.6, ease }} />
                </div>
                <p className={`mt-1.5 font-mono text-[9px] uppercase tracking-wider ${i <= step ? "text-ink" : "text-mute/60"}`}>{s}</p>
              </div>
            ))}
          </div>

          <div className="grid min-h-[340px] gap-0 sm:grid-cols-[1fr_1.15fr]">
            <div className="border-b border-line p-4 sm:border-b-0 sm:border-r">
              <p className="label mb-2 text-mute">source · memo.txt</p>
              <p className="text-[12px] leading-relaxed">
                {passage.map((p, i) =>
                  p.k ? (
                    <span key={i} className="relative">
                      <motion.span
                        className="absolute inset-x-[-2px] inset-y-0 -z-0 origin-left bg-ink"
                        initial={false}
                        animate={{ scaleX: step >= 1 ? 1 : 0 }}
                        transition={{ duration: 0.5, ease, delay: step === 1 ? i * 0.08 : 0 }}
                      />
                      <span className={`relative transition-colors duration-500 ${step >= 1 ? "text-white" : ""}`}>{p.t}</span>
                    </span>
                  ) : (
                    <span key={i}>{p.t}</span>
                  )
                )}
              </p>
              <AnimatePresence>
                {step >= 1 && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 rounded-md border border-line bg-paper p-2.5 font-mono text-[9.5px] leading-relaxed text-mute">
                    {"{"} event: <span className="text-ink">&quot;meeting&quot;</span>, when: <span className="text-ink">&quot;Thu 10:00&quot;</span>,<br />
                    &nbsp;&nbsp;task: <span className="text-ink">&quot;reports&quot;</span>, deadline: <span className="text-ink">&quot;Wed 12:00&quot;</span> {"}"}
                  </motion.div>
                )}
              </AnimatePresence>
              {step === 0 && (
                <div className="mt-4 flex items-center gap-2 font-mono text-[10px] text-mute">
                  <motion.span className="h-3 w-3 rounded-full border border-ink border-t-transparent" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} />
                  reading source…
                </div>
              )}
            </div>

            <div className="relative p-4">
              <p className="label mb-2 text-mute">question 147 · part 7</p>
              <AnimatePresence mode="wait">
                {step >= 2 ? (
                  <motion.div key="q" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <p className="text-[13px] font-medium leading-snug">When must the department reports be submitted?</p>
                    <div className="mt-3 space-y-1.5">
                      {options.map((o, i) => {
                        const reveal = step >= 4 && o.correct;
                        return (
                          <motion.div
                            key={o.l}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: step === 2 ? 0.25 + i * 0.18 : 0, duration: 0.4, ease }}
                            className={`flex items-center gap-2.5 rounded-md border px-2.5 py-1.5 text-[11.5px] transition-colors duration-500 ${reveal ? "border-ink bg-accent text-ink" : "border-line"}`}
                          >
                            <span className={`grid h-4 w-4 place-items-center rounded-full border font-mono text-[8.5px] ${reveal ? "border-white" : "border-ink"}`}>{o.l}</span>
                            {o.t}
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="sk" exit={{ opacity: 0 }} className="space-y-2">
                    {[90, 70, 80, 60, 75].map((w, i) => (
                      <div key={i} className="h-3 animate-pulse rounded bg-smoke" style={{ width: `${w}%` }} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-4 grid grid-cols-1 gap-1">
                {checks.map((c, i) => (
                  <motion.div
                    key={c}
                    className="flex items-center gap-2 font-mono text-[9.5px]"
                    initial={false}
                    animate={{ opacity: step >= 3 ? 1 : 0.25 }}
                    transition={{ delay: step === 3 ? i * 0.2 : 0 }}
                  >
                    <span className={`grid h-3.5 w-3.5 place-items-center rounded-sm border border-ink ${step >= 3 ? "bg-ink text-white" : ""}`}>{step >= 3 && <Check className="h-2.5 w-2.5" />}</span>
                    {c}
                  </motion.div>
                ))}
              </div>
              <AnimatePresence>
                {step >= 4 && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute bottom-3 right-3 rounded-full bg-ink px-3 py-1 font-mono text-[9.5px] text-white">
                    exported → exam_set.json
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </BrowserFrame>
      </div>
    </div>
  );
}
