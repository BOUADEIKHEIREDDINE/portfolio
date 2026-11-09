import { motion, AnimatePresence } from "framer-motion";
import { BrowserFrame, useStepper, useTyped, ease } from "../ui";

const docs = [
  { n: "SOP-001 Sample handling.pdf", c: "SOP" },
  { n: "SOP-014 Deviation reporting.docx", c: "SOP" },
  { n: "Guideline-A Clinical trials.pdf", c: "REG" },
  { n: "Training matrix.xlsx", c: "SOP" },
];

const question = "How fast must a major protocol deviation be reported?";

const chunks = [
  { doc: "SOP-014", p: "§4.2", s: 0.83, t: "Major deviations are reported to the sponsor within 24 hours of identification…" },
  { doc: "Guideline-A", p: "p. 12", s: 0.77, t: "…deviations affecting participant safety shall be notified without undue delay…" },
  { doc: "SOP-014", p: "§4.4", s: 0.69, t: "Minor deviations are logged and summarised in the monthly report." },
];

const answer =
  "A major deviation must be reported to the sponsor within 24 hours of being identified [1], and without undue delay if participant safety is affected [2]. Minor deviations only go in the monthly report [3].";

export default function RagDemo() {
  // 0 type question, 1 embed + retrieve, 2 answer, 3 hold
  const { ref, step, inView } = useStepper(4, [3000, 2200, 5200, 2200]);
  const q = useTyped(question, step === 0 && inView, 32);
  const qShown = step === 0 ? q : question;
  const a = useTyped(answer, step >= 2, 14);

  return (
    <div ref={ref} role="img" aria-label="Animated demo: a question about a procedure is embedded, the closest passages are retrieved with scores, and a local model writes an answer with numbered citations">
      <div aria-hidden>
        <BrowserFrame url="localhost:5173 · runs offline">
          <div className="grid min-h-[380px] sm:grid-cols-[180px_1fr]">
            <aside className="hidden border-r border-line bg-paper p-3 sm:block">
              <p className="label mb-2 text-mute">search in</p>
              <div className="mb-3 flex gap-1">
                {["All", "SOP", "Reg."].map((p, i) => (
                  <span key={p} className={`rounded-full border px-2 py-0.5 text-[9.5px] ${i === 1 ? "border-ink bg-ink text-white" : "border-line"}`}>
                    {p}
                  </span>
                ))}
              </div>
              <p className="label mb-2 text-mute">documents</p>
              <div className="space-y-1">
                {docs.map((d) => {
                  const used = step >= 1 && (d.n.startsWith("SOP-014") || d.n.startsWith("Guideline"));
                  return (
                    <div key={d.n} className={`flex items-center gap-1.5 rounded px-1.5 py-1 text-[9.5px] transition-colors duration-500 ${used ? "bg-ink text-white" : ""}`}>
                      <span className={`rounded-sm border px-1 font-mono text-[7.5px] ${used ? "border-white/50" : "border-ink"}`}>{d.n.split(".").pop()?.toUpperCase()}</span>
                      <span className="truncate">{d.n.replace(/\.\w+$/, "")}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 space-y-0.5 border-t border-line pt-3 font-mono text-[8.5px] leading-relaxed text-mute">
                <p>embed · bge-m3</p>
                <p>store · chromadb</p>
                <p>llm · mistral (ollama)</p>
              </div>
            </aside>

            <div className="flex flex-col gap-0 p-4">
              <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-sm bg-ink px-3 py-2 text-[11.5px] text-white">
                {qShown}
                {step === 0 && <span className="ml-0.5 inline-block h-3 w-[1px] animate-blink bg-white align-middle" />}
              </div>

              <AnimatePresence>
                {step >= 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-3">
                    <p className="label mb-1.5 text-mute">retrieved · top 3</p>
                    <div className="space-y-1.5">
                      {chunks.map((c, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.25, duration: 0.4, ease }}
                          className="flex items-start gap-2 rounded-md border border-line px-2 py-1.5"
                        >
                          <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full border border-ink font-mono text-[8px]">{i + 1}</span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[10px] italic text-mute">{c.t}</p>
                            <div className="mt-1 flex items-center gap-2">
                              <span className="font-mono text-[8.5px]">
                                {c.doc} {c.p}
                              </span>
                              <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-smoke">
                                <motion.div className="h-full bg-ink" initial={{ width: 0 }} animate={{ width: `${c.s * 100}%` }} transition={{ delay: 0.2 + i * 0.25, duration: 0.6, ease }} />
                              </div>
                              <span className="font-mono text-[8.5px] tabular-nums">{c.s.toFixed(2)}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {step >= 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-3 rounded-2xl rounded-bl-sm border border-ink p-3">
                    <p className="text-[11.5px] leading-relaxed">
                      {a.split(/(\[\d\])/).map((part, i) =>
                        /\[\d\]/.test(part) ? (
                          <sup key={i} className="mx-0.5 rounded bg-ink px-1 font-mono text-[8px] text-white">
                            {part.slice(1, -1)}
                          </sup>
                        ) : (
                          <span key={i}>{part}</span>
                        )
                      )}
                    </p>
                    {a.length >= answer.length && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 border-t border-line pt-1.5 font-mono text-[8.5px] text-mute">
                        3 passages · 2 documents · nothing left this machine
                      </motion.p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-auto flex items-center gap-2 rounded-full border border-line px-3 py-1.5 pt-1.5">
                <span className="flex-1 truncate text-[10.5px] text-mute">Ask your documents…</span>
                <span className="font-mono text-[8.5px] text-mute">k = 3</span>
                <span className={`grid h-5 w-5 place-items-center rounded-full ${step === 0 ? "bg-ink text-white" : "border border-line"}`}>
                  <svg viewBox="0 0 12 12" className="h-2.5 w-2.5"><path d="M6 10V2M2.5 5.5L6 2l3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
                </span>
              </div>
            </div>
          </div>
        </BrowserFrame>
      </div>
    </div>
  );
}
