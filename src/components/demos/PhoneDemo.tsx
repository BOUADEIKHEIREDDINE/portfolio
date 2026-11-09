import { AnimatePresence, motion } from "framer-motion";
import { PhoneFrame, useStepper, ease, Check } from "../ui";

type Lang = "en" | "fr" | "ar";
type Screen = "home" | "approvals" | "chat";

const t = {
  en: { hi: "Good morning, Sam", role: "Manager", leave: "Leave balance", days: "days", pending: "Pending", team: "Team presence", nav: ["Home", "Time off", "Chat", "Docs", "Stats"], approvals: "Time-off requests", approve: "Approve", approved: "Approved", chat: "Design team" },
  fr: { hi: "Bonjour, Sam", role: "Manager", leave: "Solde de congés", days: "jours", pending: "En attente", team: "Présence équipe", nav: ["Accueil", "Congés", "Chat", "Docs", "Stats"], approvals: "Demandes de congés", approve: "Valider", approved: "Validé", chat: "Équipe design" },
  ar: { hi: "صباح الخير، سام", role: "مدير", leave: "رصيد الإجازات", days: "يوم", pending: "قيد الانتظار", team: "حضور الفريق", nav: ["الرئيسية", "إجازات", "دردشة", "وثائق", "إحصاء"], approvals: "طلبات الإجازة", approve: "موافقة", approved: "تمت الموافقة", chat: "فريق التصميم" },
};

const steps: { screen: Screen; lang: Lang; dark: boolean; note: string }[] = [
  { screen: "home", lang: "en", dark: false, note: "Dashboard · role: Manager" },
  { screen: "approvals", lang: "en", dark: false, note: "Time-off approvals" },
  { screen: "chat", lang: "en", dark: false, note: "Team chat" },
  { screen: "home", lang: "fr", dark: false, note: "Localised · French" },
  { screen: "home", lang: "ar", dark: false, note: "Localised · Arabic, RTL" },
  { screen: "home", lang: "ar", dark: true, note: "Material 3 · dark theme" },
  { screen: "home", lang: "en", dark: true, note: "Encrypted session storage" },
];

const bars = [62, 80, 74, 90, 55];

export default function PhoneDemo() {
  const { ref, step } = useStepper(steps.length, 2600);
  const s = steps[step];
  const tx = t[s.lang];
  const fg = s.dark ? "text-white" : "text-ink";
  const sub = s.dark ? "text-white/50" : "text-mute";
  const card = s.dark ? "border-white/15 bg-white/[0.04]" : "border-line bg-paper";

  return (
    <div ref={ref} className="flex flex-col items-center gap-5" role="img" aria-label="Animated demo of an HR Android app: dashboard, approvals, chat, three languages and dark mode">
      <div aria-hidden className="w-full">
        <PhoneFrame dark={s.dark}>
          <div dir={s.lang === "ar" ? "rtl" : "ltr"} className={`flex h-full flex-col px-4 pb-3 pt-10 transition-colors duration-700 ${fg}`}>
            <div className={`mb-1 flex items-center justify-between font-mono text-[9px] ${sub}`}>
              <span>09:41</span>
              <span className="flex items-center gap-1">
                <svg viewBox="0 0 12 12" className="h-2.5 w-2.5"><rect x="2" y="5" width="8" height="6" rx="1" fill="none" stroke="currentColor" /><path d="M4 5V3.5a2 2 0 014 0V5" fill="none" stroke="currentColor" /></svg>
                AES
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={s.screen + s.lang}
                className="flex flex-1 flex-col"
                initial={{ opacity: 0, x: s.lang === "ar" ? -16 : 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: s.lang === "ar" ? 16 : -16 }}
                transition={{ duration: 0.45, ease }}
              >
                {s.screen === "home" && (
                  <>
                    <div className="mt-2 flex items-center justify-between">
                      <div>
                        <p className={`text-[10px] ${sub}`}>{tx.role}</p>
                        <p className="text-[17px] font-medium leading-tight">{tx.hi}</p>
                      </div>
                      <div className={`grid h-9 w-9 place-items-center rounded-full border text-[11px] font-medium ${s.dark ? "border-white/30" : "border-ink"}`}>S</div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className={`rounded-2xl border p-3 ${card}`}>
                        <p className={`text-[9px] ${sub}`}>{tx.leave}</p>
                        <p className="mt-1 font-serif text-[30px] leading-none">18</p>
                        <p className={`text-[9px] ${sub}`}>{tx.days}</p>
                      </div>
                      <div className={`rounded-2xl p-3 ${s.dark ? "bg-white text-ink" : "bg-ink text-white"}`}>
                        <p className="text-[9px] opacity-60">{tx.pending}</p>
                        <p className="mt-1 font-serif text-[30px] leading-none">3</p>
                        <div className="mt-1 h-1 w-full rounded-full bg-current opacity-20" />
                      </div>
                    </div>
                    <div className={`mt-2 rounded-2xl border p-3 ${card}`}>
                      <p className={`mb-2 text-[9px] ${sub}`}>{tx.team}</p>
                      <div className="flex h-[70px] items-end gap-2">
                        {bars.map((h, i) => (
                          <motion.div
                            key={i}
                            className={`flex-1 rounded-t-md ${s.dark ? "bg-white" : "bg-ink"}`}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 0.8, ease, delay: 0.1 + i * 0.07 }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className={`mt-2 space-y-1.5 rounded-2xl border p-3 ${card}`}>
                      {[0, 1].map((i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className={`h-5 w-5 rounded-full ${s.dark ? "bg-white/20" : "bg-smoke"}`} />
                          <span className={`h-1.5 flex-1 rounded-full ${s.dark ? "bg-white/15" : "bg-smoke"}`} />
                          <span className={`h-1.5 w-8 rounded-full ${s.dark ? "bg-white/30" : "bg-line"}`} />
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {s.screen === "approvals" && (
                  <>
                    <p className="mt-2 text-[17px] font-medium">{tx.approvals}</p>
                    <div className="mt-4 space-y-2">
                      {[
                        { n: "Lina M.", d: "12 → 16 May", main: true },
                        { n: "Yanis B.", d: "3 → 4 Jun" },
                        { n: "Inès K.", d: "20 Jun" },
                      ].map((r, i) => (
                        <div key={i} className={`rounded-2xl border p-3 ${card}`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-[12px] font-medium">{r.n}</p>
                              <p className={`font-mono text-[9px] ${sub}`}>{r.d}</p>
                            </div>
                            {r.main ? (
                              <motion.span
                                className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px]"
                                initial={{ backgroundColor: "rgba(10,10,10,0)", color: "#0a0a0a", border: "1px solid #0a0a0a" }}
                                animate={{ backgroundColor: "#0a0a0a", color: "#ffffff" }}
                                transition={{ delay: 1.1, duration: 0.3 }}
                              >
                                <motion.span initial={{ width: 0, opacity: 0 }} animate={{ width: "auto", opacity: 1 }} transition={{ delay: 1.1 }}>
                                  <Check />
                                </motion.span>
                                {tx.approved}
                              </motion.span>
                            ) : (
                              <span className="rounded-full border border-current px-2.5 py-1 text-[9px] opacity-60">{tx.approve}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <motion.div
                      className="pointer-events-none absolute right-[52px] top-[132px] h-8 w-8 rounded-full border border-ink bg-ink/10"
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: [0.4, 1, 1.4], opacity: [0, 0.8, 0] }}
                      transition={{ delay: 0.7, duration: 0.7 }}
                    />
                  </>
                )}

                {s.screen === "chat" && (
                  <>
                    <p className="mt-2 text-[17px] font-medium">{tx.chat}</p>
                    <div className="mt-4 flex flex-1 flex-col gap-2">
                      {[
                        { me: false, m: "Is the Q3 planning doc final?" },
                        { me: true, m: "Yes, uploaded it to Documents." },
                        { me: false, m: "Perfect, thanks!" },
                        { me: true, m: "I'll book the room for Thursday." },
                      ].map((b, i) => (
                        <motion.div
                          key={i}
                          className={`max-w-[78%] rounded-2xl px-3 py-2 text-[11px] leading-snug ${
                            b.me ? "self-end rounded-br-sm bg-ink text-white" : `self-start rounded-bl-sm border ${card}`
                          }`}
                          initial={{ opacity: 0, y: 10, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: 0.15 + i * 0.45, duration: 0.35, ease }}
                        >
                          {b.m}
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className={`mt-auto grid grid-cols-5 border-t pt-2 ${s.dark ? "border-white/10" : "border-line"}`}>
              {tx.nav.map((n, i) => {
                const active = (s.screen === "home" && i === 0) || (s.screen === "approvals" && i === 1) || (s.screen === "chat" && i === 2);
                return (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span className={`h-1.5 w-6 rounded-full transition-colors ${active ? (s.dark ? "bg-white" : "bg-ink") : s.dark ? "bg-white/15" : "bg-line"}`} />
                    <span className={`text-[8px] ${active ? "" : sub}`}>{n}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </PhoneFrame>
      </div>
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em]">
        {(["en", "fr", "ar"] as Lang[]).map((l) => (
          <span key={l} className={`rounded-full border px-2 py-0.5 transition-colors ${s.lang === l ? "border-ink bg-ink text-white" : "border-line text-mute"}`}>
            {l}
          </span>
        ))}
        <span className="text-mute">·</span>
        <span className="min-w-[180px] text-ink">{s.note}</span>
      </div>
    </div>
  );
}
