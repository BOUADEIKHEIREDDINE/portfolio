import { motion, AnimatePresence } from "framer-motion";
import { BrowserFrame, useStepper, ease, Check } from "../ui";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const THRESHOLD = 60; // km/h wind gusts
const MAX = 90;

const branches = [
  { id: "01", city: "Lyon", gusts: [22, 31, 28, 35, 40, 26, 19] },
  { id: "02", city: "Lille", gusts: [38, 44, 41, 52, 47, 33, 30] },
  { id: "03", city: "Brest", gusts: [41, 49, 58, 72, 66, 45, 37] },
  { id: "04", city: "Nice", gusts: [18, 15, 24, 30, 27, 21, 16] },
];

export default function WeatherDemo() {
  // 0 import xlsx, 1 fetch forecasts, 2 check thresholds, 3 alert email
  const { ref, step } = useStepper(4, [2000, 2400, 2400, 3400]);

  return (
    <div ref={ref} role="img" aria-label="Animated demo: branches imported from Excel, 7-day wind forecasts fetched, a threshold breach detected and an alert email sent">
      <div aria-hidden>
        <BrowserFrame url="weather-alerts · flask">
          <div className="relative min-h-[360px] p-4">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <motion.span
                className="flex items-center gap-1.5 rounded-full border border-ink px-2.5 py-0.5 font-mono text-[9.5px]"
                initial={false}
                animate={{ backgroundColor: step >= 1 ? "#0a0a0a" : "#ffffff", color: step >= 1 ? "#ffffff" : "#0a0a0a" }}
              >
                {step >= 1 ? (
                  <>
                    <Check className="h-2.5 w-2.5" /> branches.xlsx · 4 rows
                  </>
                ) : (
                  "importing branches.xlsx…"
                )}
              </motion.span>
              <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[9.5px] text-mute">open-meteo · 7 days</span>
              <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[9.5px] text-mute">APScheduler · daily 07:00</span>
              <span className="ml-auto font-mono text-[9.5px]">
                threshold <span className="font-medium">gusts &gt; {THRESHOLD} km/h</span>
              </span>
            </div>

            <div className="space-y-2.5">
              {branches.map((b, bi) => (
                <motion.div
                  key={b.id}
                  className="grid grid-cols-[64px_1fr] items-end gap-3 sm:grid-cols-[86px_1fr]"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: bi * 0.12, duration: 0.5, ease }}
                >
                  <div className="pb-0.5">
                    <p className="font-mono text-[9px] text-mute">Branch {b.id}</p>
                    <p className="text-[11.5px] font-medium">{b.city}</p>
                  </div>
                  <div className="relative flex h-[46px] items-end gap-1 border-b border-ink">
                    <div className="pointer-events-none absolute inset-x-0 border-t border-dashed border-ink/60" style={{ bottom: `${(THRESHOLD / MAX) * 100}%` }} />
                    {b.gusts.map((g, i) => {
                      const breach = g > THRESHOLD;
                      return (
                        <div key={i} className="relative flex-1">
                          <motion.div
                            className={`w-full rounded-t-[3px] ${breach && step >= 2 ? "bg-ink" : "bg-ink/20"}`}
                            initial={false}
                            animate={{ height: step >= 1 ? `${(g / MAX) * 46}px` : "2px" }}
                            transition={{ duration: 0.7, ease, delay: step === 1 ? bi * 0.1 + i * 0.04 : 0 }}
                          />
                          {breach && step >= 2 && (
                            <motion.span
                              className="absolute -top-4 left-1/2 -translate-x-1/2 font-mono text-[8px] font-medium"
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              {g}
                            </motion.span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
              <div className="grid grid-cols-[64px_1fr] gap-3 sm:grid-cols-[86px_1fr]">
                <span />
                <div className="flex gap-1">
                  {days.map((d) => (
                    <span key={d} className="flex-1 text-center font-mono text-[8.5px] text-mute">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {step >= 2 && step < 3 && (
              <motion.div
                className="pointer-events-none absolute inset-y-[64px] w-[2px] bg-ink"
                initial={{ left: "18%" }}
                animate={{ left: "96%" }}
                transition={{ duration: 2, ease: "linear" }}
              />
            )}

            <AnimatePresence>
              {step >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.5, ease }}
                  className="absolute bottom-3 right-3 w-[230px] rounded-lg border border-ink bg-white p-3 shadow-[4px_4px_0_0_#0a0a0a]"
                >
                  <div className="flex items-center justify-between">
                    <span className="label">Email sent</span>
                    <span className="font-mono text-[9px] text-mute">07:00:04</span>
                  </div>
                  <p className="mt-1.5 text-[11.5px] font-medium">Wind alert · Branch 03, Brest</p>
                  <p className="mt-0.5 text-[10.5px] leading-snug text-mute">Gusts up to 72 km/h forecast on Thu and 66 km/h on Fri (threshold 60).</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </BrowserFrame>
      </div>
    </div>
  );
}
