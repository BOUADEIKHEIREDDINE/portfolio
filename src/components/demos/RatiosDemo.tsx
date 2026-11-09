import { motion, AnimatePresence } from "framer-motion";
import { BrowserFrame, useStepper, ease, Check } from "../ui";

const lines = [
  { code: "FL", label: "Chiffre d'affaires net", v: "4 820 000" },
  { code: "FY", label: "Salaires et traitements", v: "1 310 000" },
  { code: "GA", label: "Dotations aux amortissements", v: "212 000" },
  { code: "GG", label: "Résultat d'exploitation", v: "472 000" },
  { code: "HN", label: "Bénéfice ou perte", v: "318 000" },
];

const ratios = [
  { name: "EBITDA margin", val: "14.2%", f: "(GG + GA) / FL", src: "2052·GG, 2052·GA, 2052·FL" },
  { name: "Net margin", val: "6.6%", f: "HN / FL", src: "2053·HN, 2052·FL" },
  { name: "Payroll / revenue", val: "27.2%", f: "FY / FL", src: "2052·FY, 2052·FL" },
  { name: "Net debt / EBITDA", val: "1.8×", f: "(DU − CF) / EBITDA", src: "2051·DU, 2050·CF" },
  { name: "Return on equity", val: "11.4%", f: "HN / DL", src: "2053·HN, 2051·DL" },
];

export default function RatiosDemo() {
  // 0 upload, 1 extract (scan), 2 compute, 3 provenance, 4 tests
  const { ref, step } = useStepper(5, [1600, 2600, 2600, 2600, 2400]);

  return (
    <div ref={ref} role="img" aria-label="Animated demo: values are extracted from a French tax form and turned into financial ratios with their source lines and passing tests">
      <div aria-hidden>
        <BrowserFrame url="scoring-engine · target: Example Co. SAS (fictional)">
          <div className="grid min-h-[360px] sm:grid-cols-2">
            <div className="relative border-b border-line p-4 sm:border-b-0 sm:border-r">
              <div className="mb-3 flex items-center justify-between">
                <p className="label text-mute">liasse fiscale · form 2052</p>
                <span className="rounded border border-ink px-1.5 font-mono text-[9px]">PDF</span>
              </div>
              <div className="relative overflow-hidden rounded-md border border-line">
                {lines.map((l, i) => (
                  <div key={l.code} className="relative flex items-center gap-2 border-b border-line px-2.5 py-2 last:border-b-0">
                    <span className="w-6 font-mono text-[9.5px] font-medium">{l.code}</span>
                    <span className="flex-1 truncate text-[10.5px] text-mute">{l.label}</span>
                    <motion.span
                      className="font-mono text-[10.5px] tabular-nums"
                      initial={false}
                      animate={{ fontWeight: step >= 1 ? 600 : 400 }}
                    >
                      {l.v}
                    </motion.span>
                    <motion.span
                      className="absolute right-1 top-1/2 -translate-y-1/2"
                      initial={false}
                      animate={{ opacity: step >= 1 ? 1 : 0, scale: step >= 1 ? 1 : 0.5 }}
                      transition={{ delay: step === 1 ? 0.3 + i * 0.35 : 0 }}
                    >
                      <span className="sr-only">extracted</span>
                    </motion.span>
                  </div>
                ))}
                {step === 1 && (
                  <motion.div
                    className="pointer-events-none absolute inset-x-0 h-9 border-y border-accent bg-accent/15"
                    initial={{ top: "-15%" }}
                    animate={{ top: "100%" }}
                    transition={{ duration: 2.2, ease: "linear" }}
                  />
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["2050", "2051", "2052", "2053", "2054", "…", "2059"].map((f, i) => (
                  <motion.span
                    key={f}
                    className="rounded-full border px-2 py-0.5 font-mono text-[9px]"
                    initial={false}
                    animate={{ backgroundColor: step >= 1 ? "#0a0a0a" : "#ffffff", color: step >= 1 ? "#ffffff" : "#0a0a0a", borderColor: "#0a0a0a" }}
                    transition={{ delay: step === 1 ? i * 0.12 : 0, duration: 0.3 }}
                  >
                    {f}
                  </motion.span>
                ))}
              </div>
              <p className="mt-3 font-mono text-[9.5px] text-mute">{step === 0 ? "uploading tax_return.pdf…" : "layout-independent parser · any accounting software"}</p>
            </div>

            <div className="relative p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="label text-mute">ratios · 5 of 66</p>
                <span className="font-mono text-[9px] text-mute">formulas v2.3</span>
              </div>
              <div className="space-y-1.5">
                {ratios.map((r, i) => (
                  <motion.div
                    key={r.name}
                    className="rounded-md border border-line px-2.5 py-1.5"
                    initial={false}
                    animate={{ opacity: step >= 2 ? 1 : 0.3, borderColor: step >= 3 && i === 0 ? "#0a0a0a" : "#dcdcd8" }}
                    transition={{ delay: step === 2 ? i * 0.15 : 0, duration: 0.4 }}
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="text-[11px]">{r.name}</span>
                      <span className="font-serif text-[18px] leading-none tabular-nums">{step >= 2 ? r.val : "—"}</span>
                    </div>
                    <AnimatePresence>
                      {step >= 3 && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease, delay: i * 0.08 }}
                          className="overflow-hidden"
                        >
                          <p className="mt-1 font-mono text-[9px] text-mute">
                            = {r.f} <span className="text-ink">← {r.src}</span>
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
              <div className="mt-3 rounded-md border border-ink p-2">
                <div className="flex items-center justify-between font-mono text-[9.5px]">
                  <span>pytest</span>
                  <span className="tabular-nums">{step >= 4 ? "44 passed" : step >= 2 ? "running…" : "idle"}</span>
                </div>
                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-smoke">
                  <motion.div className={`h-full ${step >= 4 ? "bg-accent" : "bg-ink"}`} initial={false} animate={{ width: step >= 4 ? "100%" : step >= 2 ? "45%" : "0%" }} transition={{ duration: 1, ease }} />
                </div>
                {step >= 4 && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1.5 flex items-center gap-1 font-mono text-[9px]">
                    <Check className="h-2.5 w-2.5" /> deterministic · every value traceable to its form line
                  </motion.p>
                )}
              </div>
            </div>
          </div>
        </BrowserFrame>
      </div>
    </div>
  );
}
