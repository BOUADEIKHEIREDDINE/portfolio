import { motion, AnimatePresence } from "framer-motion";
import { BrowserFrame, useStepper, ease } from "../ui";

const keywords = [
  { k: "free delivery", v: 92 },
  { k: "subscription", v: 74 },
  { k: "gift box", v: 61 },
  { k: "eco-friendly", v: 55 },
  { k: "refill pack", v: 38 },
];

const offers = [
  { b: "Brand A", price: "24.90", ship: "Free > 40", sub: true },
  { b: "Brand B", price: "19.50", ship: "4.90", sub: false },
  { b: "Brand C", price: "27.00", ship: "Free", sub: true },
];

const recos = [
  "Push free shipping above a cart threshold: it is the #1 keyword in competitor ads.",
  "Launch a subscription offer: 2 of 3 competitors have one.",
  "Target 'gift box' searches ahead of the holiday season.",
];

export default function MarketDemo() {
  // 0 scrape, 1 keywords, 2 offers, 3 recommendations
  const { ref, step } = useStepper(4, [2000, 2600, 2600, 3600]);
  const pages = step === 0 ? "scraping…" : "128 pages";

  return (
    <div ref={ref} role="img" aria-label="Animated demo of a competitive analysis dashboard: scraped pages, keyword frequency chart, offer comparison and generated recommendations">
      <div aria-hidden>
        <BrowserFrame url="localhost:8501 · streamlit">
          <div className="grid min-h-[380px] sm:grid-cols-[150px_1fr]">
            <aside className="hidden border-r border-line bg-paper p-3 sm:block">
              <p className="label mb-2 text-mute">filters</p>
              {["Market", "Competitors", "Period"].map((f, i) => (
                <div key={f} className="mb-2">
                  <p className="text-[9.5px] text-mute">{f}</p>
                  <div className="mt-0.5 rounded border border-line bg-white px-1.5 py-1 text-[9.5px]">{["Home & gifts", "3 selected", "Last 90 days"][i]}</div>
                </div>
              ))}
              <div className="mt-4 rounded border border-ink p-2">
                <p className="font-mono text-[8.5px] text-mute">beautifulsoup</p>
                <p className="font-serif text-[20px] leading-none">{pages}</p>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-smoke">
                  <motion.div className="h-full bg-ink" initial={false} animate={{ width: step === 0 ? "60%" : "100%" }} transition={{ duration: step === 0 ? 1.8 : 0.3, ease }} />
                </div>
              </div>
            </aside>

            <div className="p-4">
              <p className="font-serif text-[22px] leading-none">Market overview</p>
              <p className="mt-1 text-[10px] text-mute">Competitor ads & offers, sample data</p>

              <div className="mt-4 grid gap-4 md:grid-cols-[1.2fr_1fr]">
                <div>
                  <p className="label mb-2 text-mute">keyword frequency</p>
                  <div className="space-y-1.5">
                    {keywords.map((k, i) => (
                      <div key={k.k} className="grid grid-cols-[78px_1fr_22px] items-center gap-2">
                        <span className="truncate text-[10px]">{k.k}</span>
                        <div className="h-3 overflow-hidden bg-smoke">
                          <motion.div
                            className="h-full bg-ink"
                            initial={false}
                            animate={{ width: step >= 1 ? `${k.v}%` : "0%" }}
                            transition={{ duration: 0.8, ease, delay: step === 1 ? i * 0.1 : 0 }}
                          />
                        </div>
                        <span className="text-right font-mono text-[9px] tabular-nums">{step >= 1 ? k.v : ""}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="label mb-2 text-mute">offer comparison</p>
                  <div className="overflow-hidden rounded border border-line text-[9.5px]">
                    <div className="grid grid-cols-[1.2fr_1fr_1fr_0.6fr] bg-ink px-2 py-1 font-mono text-[8.5px] text-white">
                      <span>brand</span>
                      <span>€</span>
                      <span>ship</span>
                      <span>sub</span>
                    </div>
                    {offers.map((o, i) => (
                      <motion.div
                        key={o.b}
                        className="grid grid-cols-[1.2fr_1fr_1fr_0.6fr] border-t border-line px-2 py-1"
                        initial={false}
                        animate={{ opacity: step >= 2 ? 1 : 0.15 }}
                        transition={{ delay: step === 2 ? i * 0.2 : 0 }}
                      >
                        <span>{o.b}</span>
                        <span className="tabular-nums">{o.price}</span>
                        <span>{o.ship}</span>
                        <span>{o.sub ? "●" : "○"}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="label mb-2 mt-4 text-mute">recommendations</p>
              <div className="space-y-1.5">
                <AnimatePresence>
                  {step >= 3 &&
                    recos.map((r, i) => (
                      <motion.div
                        key={r}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: i * 0.35, duration: 0.45, ease }}
                        className="flex gap-2 rounded border-l-2 border-accent bg-paper px-2.5 py-1.5 text-[10.5px] leading-snug"
                      >
                        <span className="font-mono text-[9px] text-mute">0{i + 1}</span>
                        {r}
                      </motion.div>
                    ))}
                </AnimatePresence>
                {step < 3 && <div className="h-[86px] rounded border border-dashed border-line" />}
              </div>
            </div>
          </div>
        </BrowserFrame>
      </div>
    </div>
  );
}
