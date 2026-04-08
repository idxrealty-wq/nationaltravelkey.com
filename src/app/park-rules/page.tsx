"use client";

import { useEffect, useRef, useState } from "react";

const EAGLE_IMG = "https://us.chat-img.sintra.ai/f3b53c23-1962-4de9-bee1-1ab563b224f9/1c86eb82-f41e-496a-aba9-b013f6c2f1b9/image.png";
const RACCOONS_IMG = "https://us.chat-img.sintra.ai/f3b53c23-1962-4de9-bee1-1ab563b224f9/844cdffd-6646-4a92-bd27-0fcb7728db6a/image.png";
const OWL_IMG = "https://us.chat-img.sintra.ai/f3b53c23-1962-4de9-bee1-1ab563b224f9/3fd56b96-ad2b-46a3-a7a2-6789e33a8937/image.png";

type RuleItem = {
  title: string;
  summary: string;
  detail: string;
  color: string;
  accent: string;
};

const rules: RuleItem[] = [
  {
    title: "Respect Closures",
    summary: "If an area is closed, it is closed for a reason.",
    detail: "Closed areas protect wildlife, restoration work, water quality, and public safety. Do not cross barriers, ropes, fences, or posted closure lines.",
    color: "from-red-950 to-red-900",
    accent: "text-red-300",
  },
  {
    title: "Protect Wildlife",
    summary: "Give animals space and keep the habitat calm.",
    detail: "Do not chase, feed, corner, or disturb wildlife. Florida habitats depend on visitors keeping a respectful distance and leaving natural behavior undisturbed.",
    color: "from-emerald-950 to-emerald-900",
    accent: "text-emerald-300",
  },
  {
    title: "Pack Out Trash",
    summary: "Leave the area cleaner than you found it.",
    detail: "Take all trash, cans, food waste, and personal items with you. Even small litter can damage waterways, harm animals, and ruin the experience for everyone else.",
    color: "from-blue-950 to-blue-900",
    accent: "text-blue-300",
  },
  {
    title: "Use Safe Access Areas",
    summary: "Stay in approved zones and marked paths.",
    detail: "Use designated entry points, approved walkways, and posted recreation zones. This helps prevent erosion, habitat damage, and unnecessary risk.",
    color: "from-amber-950 to-amber-900",
    accent: "text-amber-300",
  },
  {
    title: "Keep Noise Reasonable",
    summary: "Enjoy the day without overwhelming the area.",
    detail: "Keep speakers, shouting, and engine noise at a respectful level. Sound carries across water and natural areas much farther than most people expect.",
    color: "from-purple-950 to-purple-900",
    accent: "text-purple-300",
  },
  {
    title: "Follow Local Signs",
    summary: "Posted signs are the final word on-site.",
    detail: "Conditions change. Temporary closures, weather restrictions, safety notices, and local enforcement instructions always override assumptions or old habits.",
    color: "from-sky-950 to-sky-900",
    accent: "text-sky-300",
  },
];

const GLOBAL_STYLES = `
  @keyframes eagleFly {
    0%   { transform: translateX(120vw) translateY(0px) scaleX(-1); }
    40%  { transform: translateX(60vw)  translateY(-30px) scaleX(-1); }
    70%  { transform: translateX(20vw)  translateY(10px) scaleX(-1); }
    100% { transform: translateX(-10vw) translateY(0px) scaleX(-1); }
  }
  @keyframes eagleHover {
    0%,100% { transform: translateY(0px) scaleX(-1) rotate(-2deg); }
    50%      { transform: translateY(-18px) scaleX(-1) rotate(2deg); }
  }
  @keyframes wingPulse {
    0%,100% { transform: scaleY(1) scaleX(1); }
    50%      { transform: scaleY(1.04) scaleX(1.02); }
  }
  @keyframes slideInLeft {
    0%   { transform: translateX(-120%) opacity: 0; opacity: 0; }
    100% { transform: translateX(0%)   opacity: 1; opacity: 1; }
  }
  @keyframes slideInRight {
    0%   { transform: translateX(120%); opacity: 0; }
    100% { transform: translateX(0%);   opacity: 1; }
  }
  @keyframes riseUp {
    0%   { transform: translateY(80px); opacity: 0; }
    100% { transform: translateY(0px);  opacity: 1; }
  }
  @keyframes owlGlow {
    0%,100% { filter: drop-shadow(0 0 12px rgba(251,191,36,0.4)); }
    50%      { filter: drop-shadow(0 0 35px rgba(251,191,36,0.9)); }
  }
  @keyframes scrollUnroll {
    0%   { max-height: 0px;   opacity: 0; }
    100% { max-height: 600px; opacity: 1; }
  }
  @keyframes raccoonSway {
    0%,100% { transform: rotate(-1.5deg) translateY(0px); }
    50%      { transform: rotate(1.5deg)  translateY(-4px); }
  }
  @keyframes raccoonSway2 {
    0%,100% { transform: rotate(1.5deg) translateY(-4px); }
    50%      { transform: rotate(-1.5deg) translateY(0px); }
  }
  @keyframes firefly {
    0%   { transform: translate(0,0);    opacity: 0; }
    20%  { opacity: 1; }
    80%  { opacity: 0.8; }
    100% { transform: translate(var(--fx), var(--fy)); opacity: 0; }
  }
  @keyframes typeCursor {
    0%,100% { opacity: 1; }
    50%      { opacity: 0; }
  }
  @keyframes ruleCardIn {
    0%   { transform: translateY(40px) scale(0.95); opacity: 0; }
    100% { transform: translateY(0px)  scale(1);    opacity: 1; }
  }
  @keyframes skyShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes starTwinkle {
    0%,100% { opacity: 0.3; transform: scale(1); }
    50%      { opacity: 1;   transform: scale(1.4); }
  }
  @keyframes flagWave {
    0%,100% { transform: skewX(0deg) scaleX(1); }
    25%      { transform: skewX(3deg) scaleX(1.02); }
    75%      { transform: skewX(-3deg) scaleX(0.98); }
  }
  @keyframes pulseRing {
    0%   { transform: scale(0.8); opacity: 1; }
    100% { transform: scale(2.2); opacity: 0; }
  }
  @keyframes badgeShine {
    0%,100% { filter: brightness(1); }
    50%      { filter: brightness(1.6) drop-shadow(0 0 8px rgba(251,191,36,0.8)); }
  }
  .eagle-fly    { animation: eagleFly 3.5s cubic-bezier(0.25,0.46,0.45,0.94) forwards; }
  .eagle-hover  { animation: eagleHover 4s ease-in-out infinite; }
  .wing-pulse   { animation: wingPulse 1.2s ease-in-out infinite; }
  .slide-left   { animation: slideInLeft 1s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  .slide-right  { animation: slideInRight 1s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  .rise-up      { animation: riseUp 1.2s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  .owl-glow     { animation: owlGlow 2.5s ease-in-out infinite; }
  .sway1        { animation: raccoonSway  3s ease-in-out infinite; }
  .sway2        { animation: raccoonSway2 3s ease-in-out infinite; }
  .flag-wave    { animation: flagWave 2s ease-in-out infinite; }
  .badge-shine  { animation: badgeShine 2s ease-in-out infinite; }
`;
/* ── FIREFLIES ── */
function Fireflies() {
  const flies = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    fx: `${(Math.random() - 0.5) * 120}px`,
    fy: `${(Math.random() - 0.5) * 120}px`,
    delay: Math.random() * 4,
    duration: 3 + Math.random() * 4,
    size: 3 + Math.random() * 4,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {flies.map((f) => (
        <div
          key={f.id}
          className="absolute rounded-full bg-yellow-300"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: f.size,
            height: f.size,
            // @ts-ignore
            "--fx": f.fx,
            "--fy": f.fy,
            animation: `firefly ${f.duration}s ${f.delay}s ease-in-out infinite`,
            boxShadow: `0 0 ${f.size * 2}px ${f.size}px rgba(253,224,71,0.6)`,
          }}
        />
      ))}
    </div>
  );
}

/* ── TYPEWRITER ── */
function TypeWriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;
    const t = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, 45);
    return () => clearTimeout(t);
  }, [started, displayed, text]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && started && (
        <span
          className="ml-0.5 inline-block w-0.5 bg-amber-400"
          style={{ animation: "typeCursor 0.7s ease-in-out infinite", height: "1em", verticalAlign: "text-bottom" }}
        />
      )}
    </span>
  );
}

/* ── RULE CARD ── */
function RuleCard({ rule, index, visible }: { rule: RuleItem; index: number; visible: boolean }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="cursor-pointer"
      style={{
        animation: visible ? `ruleCardIn 0.7s ${index * 180}ms cubic-bezier(0.34,1.56,0.64,1) both` : "none",
        perspective: "1000px",
      }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative h-56 w-full transition-transform duration-700"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${rule.color} p-6 shadow-2xl border border-white/10 flex flex-col justify-between`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div>
            <span className={`text-xs font-black uppercase tracking-widest ${rule.accent}`}>
              Rule {index + 1}
            </span>
            <h3 className="mt-2 text-2xl font-black text-white leading-tight">{rule.title}</h3>
          </div>
          <div>
            <p className={`text-sm font-semibold ${rule.accent}`}>{rule.summary}</p>
            <p className="mt-3 text-xs text-white/50 font-medium">Tap to read full rule →</p>
          </div>
          {/* Pulse ring */}
          <div className="absolute right-5 top-5">
            <div className={`h-3 w-3 rounded-full ${rule.accent.replace("text-", "bg-")}`} />
            <div
              className={`absolute inset-0 rounded-full ${rule.accent.replace("text-", "bg-")}`}
              style={{ animation: "pulseRing 2s ease-out infinite" }}
            />
          </div>
        </div>
        {/* Back */}
        <div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${rule.color} p-6 shadow-2xl border border-white/10 flex flex-col justify-center`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className={`text-xs font-black uppercase tracking-widest ${rule.accent} mb-3`}>
            Full Rule
          </span>
          <p className="text-sm leading-7 text-white/90">{rule.detail}</p>
          <p className="mt-4 text-xs text-white/40">Tap to flip back</p>
        </div>
      </div>
    </div>
  );
}
/* ── EAGLE SCENE ── */
function EagleScene({ active }: { active: boolean }) {
  const [phase, setPhase] = useState<"flying" | "hovering">("flying");

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setPhase("hovering"), 3600);
    return () => clearTimeout(t);
  }, [active]);

  if (!active) return null;

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {/* Dramatic sky */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 30%, #b45309 70%, #f59e0b 100%)",
          backgroundSize: "400% 400%",
          animation: "skyShift 8s ease infinite",
        }}
      />
      <Fireflies />

      {/* Sun burst */}
      <div className="absolute right-16 top-8 h-24 w-24 rounded-full bg-amber-400 opacity-80"
        style={{ boxShadow: "0 0 80px 40px rgba(251,191,36,0.5), 0 0 160px 80px rgba(251,191,36,0.2)" }}
      />

      {/* Clouds */}
      <div className="absolute left-0 top-12 h-12 w-48 rounded-full bg-white/20 blur-xl" />
      <div className="absolute left-20 top-6 h-8 w-32 rounded-full bg-white/15 blur-lg" />
      <div className="absolute right-32 top-16 h-10 w-36 rounded-full bg-white/10 blur-xl" />

      {/* American Flag */}
      <div
        className="absolute right-8 top-6 z-10 overflow-hidden rounded shadow-2xl flag-wave"
        style={{ width: 80, height: 52 }}
      >
        {/* Stripes */}
        {Array.from({ length: 13 }, (_, i) => (
          <div key={i} className="w-full" style={{ height: 4, background: i % 2 === 0 ? "#B22234" : "white" }} />
        ))}
        {/* Canton */}
        <div className="absolute left-0 top-0 flex flex-wrap content-start gap-0.5 p-0.5" style={{ width: 32, height: 28, background: "#3C3B6E" }}>
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i} className="h-1 w-1 rounded-full bg-white" style={{ animation: `starTwinkle ${1 + i * 0.15}s ease-in-out infinite` }} />
          ))}
        </div>
      </div>

      {/* Eagle image */}
      <div
        className={phase === "flying" ? "eagle-fly" : "eagle-hover wing-pulse"}
        style={{ position: "absolute", top: "15%", zIndex: 20 }}
      >
        <img
          src={EAGLE_IMG}
          alt="Majestic American Bald Eagle"
          className="w-64 drop-shadow-2xl sm:w-80"
          style={{ filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.8))" }}
        />
      </div>

      {/* Caption */}
      <div className="absolute bottom-6 left-0 right-0 text-center z-30">
        <p className="text-sm font-black uppercase tracking-widest text-amber-300 drop-shadow-lg">
          {phase === "flying" ? (
            <TypeWriter text="The Eagle arrives from the north..." delay={500} />
          ) : (
            <TypeWriter text="Rules secured. Preparing handoff." delay={0} />
          )}
        </p>
      </div>
    </div>
  );
}

/* ── RACCOON SCENE ── */
function RaccoonScene({ active }: { active: boolean }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {/* Night forest background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #0f172a 0%, #14532d 60%, #052e16 100%)" }} />
      <Fireflies />

      {/* Moon */}
      <div className="absolute right-12 top-6 h-16 w-16 rounded-full bg-amber-50 opacity-90"
        style={{ boxShadow: "0 0 40px 20px rgba(255,251,235,0.3)" }}
      />

      {/* Trees silhouette */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end opacity-40">
        {[60, 90, 70, 100, 65, 85, 75].map((h, i) => (
          <div key={i} className="bg-emerald-950 rounded-t-full" style={{ width: 28, height: h }} />
        ))}
      </div>

      {/* Raccoons slide in */}
      <div className={`absolute bottom-12 left-4 z-20 ${active ? "slide-left" : "opacity-0"}`}>
        <div className="sway1">
          <img
            src={RACCOONS_IMG}
            alt="Raccoon Ranger Guard"
            className="w-40 drop-shadow-2xl sm:w-52"
            style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.9))" }}
          />
        </div>
        {active && (
          <div className="mt-2 rounded-2xl border border-amber-400/40 bg-slate-900/90 px-3 py-2 text-center backdrop-blur">
            <p className="text-xs font-black text-amber-300">
              <TypeWriter text='"Copy that, Eagle. Rules received."' delay={800} />
            </p>
          </div>
        )}
      </div>

      <div className={`absolute bottom-12 right-4 z-20 ${active ? "slide-right" : "opacity-0"}`}>
        <div className="sway2">
          <img
            src={RACCOONS_IMG}
            alt="Raccoon Ranger Guard"
            className="w-40 drop-shadow-2xl sm:w-52"
            style={{
              filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.9))",
              transform: "scaleX(-1)",
            }}
          />
        </div>
        {active && (
          <div className="mt-2 rounded-2xl border border-amber-400/40 bg-slate-900/90 px-3 py-2 text-center backdrop-blur">
            <p className="text-xs font-black text-amber-300">
              <TypeWriter text='"Perimeter secure. Owl is up."' delay={1400} />
            </p>
          </div>
        )}
      </div>

      {/* Center badge */}
      <div className="absolute top-6 left-0 right-0 text-center z-30">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-slate-900/80 px-5 py-2 backdrop-blur badge-shine">
          <span className="text-amber-400 text-lg">★</span>
          <span className="text-xs font-black uppercase tracking-widest text-white">Ranger Guard Unit</span>
          <span className="text-amber-400 text-lg">★</span>
        </div>
      </div>
    </div>
  );
}

/* ── OWL SCENE ── */
function OwlScene({ active }: { active: boolean }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {/* Deep forest dusk */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #1e1b4b 0%, #312e81 30%, #065f46 100%)" }} />
      <Fireflies />

      {/* Mystical light beam */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-32 opacity-30"
        style={{
          height: "100%",
          background: "linear-gradient(180deg, rgba(251,191,36,0.8) 0%, transparent 100%)",
          filter: "blur(20px)",
        }}
      />

      {/* Owl rises */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 ${active ? "rise-up owl-glow" : "opacity-0"}`}>
        <img
          src={OWL_IMG}
          alt="Wise Owl Professor"
          className="w-48 drop-shadow-2xl sm:w-64"
          style={{ filter: "drop-shadow(0 0 30px rgba(251,191,36,0.6))" }}
        />
      </div>

      {/* Scroll unrolling */}
      {active && (
        <div
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-44 overflow-hidden rounded-2xl border border-amber-400/40 bg-amber-50/95 shadow-2xl backdrop-blur"
          style={{ animation: "scrollUnroll 1.5s 1s ease-out both" }}
        >
          <div className="bg-amber-800 px-3 py-1.5 text-center">
            <p className="text-xs font-black uppercase tracking-widest text-amber-100">Official Rules</p>
          </div>
          <div className="p-3 space-y-1.5">
            {rules.map((r, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                <p className="text-xs font-semibold text-slate-800">{r.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Caption */}
      <div className="absolute bottom-4 left-0 right-0 text-center z-30">
        {active && (
          <p className="text-sm font-black uppercase tracking-widest text-amber-300 drop-shadow-lg">
            <TypeWriter text='"The rules have been unrolled. Listen carefully."' delay={600} />
          </p>
        )}
      </div>
    </div>
  );
}
/* ── MAIN PAGE ── */
export default function ParkRulesPage() {
  const [scene, setScene] = useState(0);
  const [rulesVisible, setRulesVisible] = useState(false);
  const rulesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setScene(1), 4200);
    const t2 = setTimeout(() => setScene(2), 7500);
    const t3 = setTimeout(() => {
      setScene(3);
      setRulesVisible(true);
    }, 11000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    if (scene === 3 && rulesRef.current) {
      setTimeout(() => rulesRef.current?.scrollIntoView({ behavior: "smooth" }), 800);
    }
  }, [scene]);

  const sceneLabels = [
    "🦅 Eagle approaching from the north...",
    "🦝 Raccoon Guard Unit reporting for duty...",
    "🦉 The Wise Owl prepares the scroll...",
    "✅ Rules delivered. Read carefully.",
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />
      <main className="min-h-screen bg-slate-950 text-white">

        {/* ── CINEMATIC HEADER ── */}
        <section className="relative overflow-hidden px-6 py-16 text-center">
          <div className="absolute inset-0" style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
            backgroundSize: "400% 400%",
            animation: "skyShift 12s ease infinite",
          }} />
          <Fireflies />
          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-5 py-2 backdrop-blur">
              <span className="text-amber-400 text-sm">★</span>
              <span className="text-xs font-black uppercase tracking-widest text-amber-300">National Travel Key</span>
              <span className="text-amber-400 text-sm">★</span>
            </div>
            <h1 className="mt-4 text-5xl font-black tracking-tight drop-shadow-2xl sm:text-7xl">
              Florida Park Rules
            </h1>
            <p className="mt-4 text-xl text-sky-200 font-medium">
              Delivered by Eagle. Verified by Owl. Enforced by the Raccoon Guard.
            </p>
            {/* Scene progress */}
            <div className="mt-8 flex justify-center gap-3">
              {[0, 1, 2, 3].map((s) => (
                <div key={s} className="flex flex-col items-center gap-1">
                  <div className={`h-3 w-3 rounded-full transition-all duration-700 \${
                    scene >= s ? "bg-amber-400 scale-125 shadow-[0_0_12px_rgba(251,191,36,0.8)]" : "bg-white/20"
                  }`} />
                  <span className={`text-xs font-bold transition-all duration-500 ${scene >= s ? "text-amber-300" : "text-white/30"}`}>
                    {["Eagle", "Guards", "Owl", "Rules"][s]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ANIMATION STAGE ── */}
        <section className="relative mx-auto max-w-5xl px-4 pb-4">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_80px_rgba(251,191,36,0.15)]" style={{ height: 420 }}>
            <EagleScene active={scene >= 0} />
            {scene >= 1 && (
              <div className="absolute inset-0">
                <RaccoonScene active={scene >= 1} />
              </div>
            )}
            {scene >= 2 && (
              <div className="absolute inset-0">
                <OwlScene active={scene >= 2} />
              </div>
            )}
          </div>

          {/* Scene label */
		            {/* Scene label */}
          <div className="mt-4 text-center">
            <p className="text-sm font-black uppercase tracking-widest text-amber-300 drop-shadow-lg">
              {sceneLabels[scene]}
            </p>
          </div>
        </section>

        {/* ── RULES SECTION ── */}
        <section ref={rulesRef} className="mx-auto max-w-5xl px-6 pb-24 pt-16">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2">
              <span className="text-amber-400">🦉</span>
              <span className="text-xs font-black uppercase tracking-widest text-white/70">As Decreed By The Owl</span>
            </div>
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              The Official Rules
            </h2>
            <p className="mt-3 text-sky-300 text-lg">
              Tap any card to read the full rule.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {rules.map((rule, index) => (
              <RuleCard
                key={rule.title}
                rule={rule}
                index={index}
                visible={rulesVisible}
              />
            ))}
          </div>

          {/* Footer callout */}
          <div className="mt-16 rounded-3xl border border-amber-400/20 bg-amber-400/5 p-8 text-center backdrop-blur">
            <div className="mb-3 flex justify-center gap-4 text-4xl">
              <span style={{ animation: "raccoonSway 3s ease-in-out infinite" }}>🦅</span>
              <span style={{ animation: "raccoonSway2 3s ease-in-out infinite" }}>🦝</span>
              <span style={{ animation: "raccoonSway 3s ease-in-out infinite 0.5s" }}>🦉</span>
            </div>
            <p className="text-xl font-black text-amber-300">
              Our team is always nearby.
            </p>
            <p className="mt-2 text-sm text-sky-300">
              Unlike some county websites, we're mobile-friendly and easy to reach — no desktop required.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

