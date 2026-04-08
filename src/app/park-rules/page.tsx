"use client";

import { useEffect, useRef, useState } from "react";

const EAGLE = "/images/eagle.png";
const OWL = "/images/owl.png";
const RACCOONS = "/images/raccoons.png";
const USA = "/images/flag-usa.png";
const FL = "/images/flag-florida.png";

type Rule = {
  e: string;
  t: string;
  w: string;
  d: string;
  p?: string;
  c: string;
  a: string;
  b: string;
  reaction: string;
};

const owl: Rule[] = [
  {
    e: "🎄", t: "Christmas Closure",
    w: "They close for Christmas. And they really want you to know.",
    d: "All parks closed Dec 24 & 25. Campgrounds close NOON Dec 23, reopen 2 PM Dec 26. Open New Year's Day — yes, they clarified that too.",
    c: "from-red-950 to-red-900", a: "text-red-300", b: "border-red-700",
    reaction: "❄️",
  },
  {
    e: "🍺", t: "No Alcohol. Ever.",
    w: "No alcohol on park property. Any park. Any time. Any excuse.",
    d: "Every Orange County park. No exceptions. Not a seltzer. Not a sunrise mimosa. Nothing.",
    c: "from-amber-950 to-amber-900", a: "text-amber-300", b: "border-amber-700",
    reaction: "🙅",
  },
  {
    e: "🐾", t: "Pets — Know Before You Go",
    w: "Not all parks welcome your four-legged co-pilot.",
    d: "No pets at Moss Park or Kelly Park. Pets allowed at Clarcona Horse Park, Magnolia Park, and Trimble Park if registered. Contact parks directly.",
    p: "🚫 Moss · Kelly | ✅ Clarcona · Magnolia · Trimble (registered)",
    c: "from-emerald-950 to-emerald-900", a: "text-emerald-300", b: "border-emerald-700",
    reaction: "🐾",
  },
  {
    e: "⏰", t: "Park Hours",
    w: "Florida has two seasons: summer and still warm. Parks adjust.",
    d: "Summer (Mar–Oct): 8 AM – 8 PM. Winter (Nov–Feb): 8 AM – 6 PM. Follows daylight saving time. Check in before close — gate code at check-in.",
    c: "from-sky-950 to-sky-900", a: "text-sky-300", b: "border-sky-700",
    reaction: "👍",
  },
];

const tips: Rule[] = [
  {
    e: "📞", t: "Cancellations & Changes",
    w: "The number is on your receipt. They put it there on purpose.",
    d: "Kelly: KellyCamping@ocfl.net | Clarcona: (407) 254-9010 | Moss: (407) 254-6840 | Magnolia: (407) 254-9046 | Trimble: (407) 254-1982",
    c: "from-purple-950 to-purple-900", a: "text-purple-300", b: "border-purple-700",
    reaction: "📋",
  },
  {
    e: "🏕️", t: "Group & Handicap Sites, Pavilions",
    w: "Some things still need a real human on the phone.",
    d: "For group campsites, handicap sites, or pavilions contact the park directly. Staff ready to help.",
    c: "from-blue-950 to-blue-900", a: "text-blue-300", b: "border-blue-700",
    reaction: "🤝",
  },
  {
    e: "📱", t: "They Recommend a Desktop Computer",
    w: "Orange County suggests a computer — not your phone — in 2026.",
    d: "NationalTravelKey.com was built phone-first. Every rule, every park, every detail — on the device in your hand.",
    c: "from-rose-950 to-rose-900", a: "text-rose-300", b: "border-rose-700",
    reaction: "🤷",
  },
];

function useVis(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
  const [v, setV] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true); },
      { threshold }
    );
    o.observe(ref.current);
    return () => o.disconnect();
  }, [ref]);
  return v;
}

function useAutoReveal(count: number, visible: boolean, delay = 600) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (!visible) return;
    if (shown >= count) return;
    const t = setTimeout(() => setShown(s => s + 1), delay);
    return () => clearTimeout(t);
  }, [visible, shown, count, delay]);
  return shown;
}

function playEagleScreech() {
  try {
    const ctx = new AudioContext();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g);
    g.connect(ctx.destination);
    o.type = "sawtooth";
    o.frequency.setValueAtTime(800, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.8);
    g.gain.setValueAtTime(0.3, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    o.start();
    o.stop(ctx.currentTime + 0.8);
  } catch {}
}
function Particles({ type }: { type: "light" | "snow" | "confetti" }) {
  const dots = Array.from({ length: type === "light" ? 20 : 30 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {dots.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 3;
        const dur = 2 + Math.random() * 3;
        const size = type === "confetti" ? 8 : type === "snow" ? 6 : 3;
        const color = type === "confetti"
          ? ["bg-red-400","bg-blue-400","bg-yellow-400","bg-green-400","bg-pink-400"][i % 5]
          : type === "snow" ? "bg-white" : "bg-yellow-200";
        return (
          <div
            key={i}
            className={`absolute rounded-full ${color} opacity-70 animate-fall`}
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              animationDelay: `${delay}s`,
              animationDuration: `${dur}s`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0.7; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .animate-fall { animation: fall linear infinite; }
      `}</style>
    </div>
  );
}

function EagleScene() {
  const ref = useRef<HTMLDivElement>(null);
  const v = useVis(ref);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!v) return;
    playEagleScreech();
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 2000);
    const t3 = setTimeout(() => setPhase(3), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [v]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black px-4 py-20">
      {v && <Particles type="light" />}
      <div className={`absolute inset-0 bg-gradient-to-b from-slate-950 via-sky-950 to-sky-900 transition-opacity duration-[2000ms] ${phase >= 1 ? "opacity-100" : "opacity-0"}`} />
      <div className="relative z-10 flex flex-col items-center">
        <div className="absolute top-4 right-4 flex gap-3">
          <img src={USA} alt="American flag" className={`w-24 md:w-32 rounded shadow-lg transition-all duration-1000 ${phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}`} />
          <img src={FL} alt="Florida flag" className={`w-24 md:w-32 rounded shadow-lg transition-all duration-1000 delay-300 ${phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}`} />
        </div>
        <img
          src={EAGLE}
          alt="Bald eagle delivering park rules"
          className={`w-52 md:w-80 drop-shadow-2xl transition-all duration-[2000ms] ease-out ${phase >= 1 ? "translate-x-0 translate-y-0 opacity-100 scale-100 rotate-0" : "-translate-x-[80vw] -translate-y-32 opacity-0 scale-50 -rotate-12"}`}
        />
        <div className={`mt-10 text-center max-w-xl transition-all duration-1000 ${phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
            Orange County Park Rules
          </h1>
          <p className="text-sky-300 text-lg md:text-xl italic">
            Delivered from 30,000 feet. No desktop required.
          </p>
        </div>
        <div className={`mt-8 transition-all duration-700 ${phase >= 3 ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
          <div className="bg-sky-900/40 border border-sky-700/50 rounded-2xl px-6 py-4 text-center">
            <p className="text-sky-200 text-sm">📜 Scroll delivered. The Owl takes it from here.</p>
          </div>
        </div>
        <div className={`mt-8 transition-all duration-1000 ${phase >= 3 ? "opacity-100" : "opacity-0"}`}>
          <p className="text-sky-600 text-xs animate-bounce">↓ scroll down</p>
        </div>
      </div>
    </section>
  );
}

function OwlCatch() {
  const ref = useRef<HTMLDivElement>(null);
  const v = useVis(ref);
  const [caught, setCaught] = useState(false);
  useEffect(() => {
    if (v) {
      const t = setTimeout(() => setCaught(true), 1000);
      return () => clearTimeout(t);
    }
  }, [v]);
  return (
    <section ref={ref} className="relative bg-gradient-to-b from-sky-900 to-gray-950 px-4 py-20 overflow-hidden">
      <div className="max-w-md mx-auto flex flex-col items-center text-center">
        <div className={`transition-all duration-700 ${v ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-20"}`}>
          <p className="text-4xl mb-4">📜</p>
        </div>
        <img
          src={OWL}
          alt="Owl catching the scroll"
          className={`w-36 md:w-44 drop-shadow-2xl transition-all duration-500 ${caught ? "scale-110 -rotate-3" : "scale-100 rotate-0"} ${v ? "opacity-100" : "opacity-0"}`}
        />
        <div className={`mt-4 transition-all duration-700 delay-500 ${caught ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="text-gray-300 italic text-sm">
            *adjusts glasses* &ldquo;I don&rsquo;t make the rules. I just unfold them.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
function RaccoonGuards({ reaction, visible }: { reaction: string; visible: boolean }) {
  return (
    <div className="flex justify-between items-center px-2 mb-2">
      <div className={`transition-all duration-500 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
        <div className="flex flex-col items-center gap-1">
          <img src={RACCOONS} alt="Raccoon guard left" className="w-12 md:w-16 drop-shadow-lg scale-x-[-1]" />
          <span className="text-lg">{reaction}</span>
        </div>
      </div>
      <div className={`transition-all duration-500 delay-150 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
        <div className="flex flex-col items-center gap-1">
          <img src={RACCOONS} alt="Raccoon guard right" className="w-12 md:w-16 drop-shadow-lg" />
          <span className="text-lg">{reaction}</span>
        </div>
      </div>
    </div>
  );
}

function AutoCard({ r, visible }: { r: Rule; visible: boolean }) {
  return (
    <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"}`}>
      <RaccoonGuards reaction={r.reaction} visible={visible} />
      <div className={`bg-gradient-to-br ${r.c} border ${r.b} rounded-2xl p-5 md:p-6`}>
        <div className="flex items-start gap-4">
          <span className="text-3xl mt-1">{r.e}</span>
          <div className="flex-1">
            <h3 className={`font-bold text-base md:text-lg ${r.a} leading-snug`}>{r.t}</h3>
            <p className="text-gray-300 text-sm mt-2 leading-relaxed">{r.w}</p>
            <p className="text-gray-400 text-sm mt-2 leading-relaxed">{r.d}</p>
            {r.p && <p className={`text-xs mt-3 font-medium ${r.a}`}>{r.p}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function OwlScene() {
  const ref = useRef<HTMLDivElement>(null);
  const v = useVis(ref, 0.1);
  const shown = useAutoReveal(owl.length, v, 800);
  return (
    <section ref={ref} className="bg-gradient-to-b from-gray-950 to-gray-950 px-4 py-20">
      <div className="max-w-2xl mx-auto">
        <div className={`flex flex-col items-center mb-12 transition-all duration-1000 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-white font-bold text-xl md:text-2xl text-center mb-2">
            The Rules, As Written
          </p>
          <p className="text-gray-400 italic text-sm text-center">
            Watch them unfold. Each one is real. Every word straight from the source.
          </p>
        </div>
        <div className="space-y-8">
          {owl.map((r, i) => (
            <AutoCard key={r.t} r={r} visible={i < shown} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RaccoonScene() {
  const ref = useRef<HTMLDivElement>(null);
  const v = useVis(ref, 0.1);
  const shown = useAutoReveal(tips.length, v, 800);
  return (
    <section ref={ref} className="bg-gradient-to-b from-gray-950 to-black px-4 py-20">
      <div className="max-w-2xl mx-auto">
        <div className={`flex flex-col items-center mb-12 transition-all duration-1000 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-block bg-gray-800/60 border border-gray-700 rounded-xl px-5 py-2 mb-3">
            <p className="text-gray-300 text-sm font-semibold">🎧 SAFETY HQ — On Duty</p>
          </div>
          <p className="text-gray-400 italic text-sm text-center">
            &ldquo;Copy that, Owl. The practical stuff is ours.&rdquo;
          </p>
        </div>
        <div className="space-y-8">
          {tips.map((r, i) => (
            <AutoCard key={r.t} r={r} visible={i < shown} />
          ))}
        </div>
      </div>
    </section>
  );
}
function ClosingScene() {
  const ref = useRef<HTMLDivElement>(null);
  const v = useVis(ref);
  const [bow, setBow] = useState(false);
  useEffect(() => {
    if (v) {
      const t = setTimeout(() => setBow(true), 800);
      return () => clearTimeout(t);
    }
  }, [v]);
  return (
    <section ref={ref} className="relative bg-black px-4 py-24 overflow-hidden">
      {v && <Particles type="confetti" />}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className={`transition-all duration-1000 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Their site recommends<br />
            <span className="text-red-400">using a desktop computer.</span>
          </h2>
          <p className="text-gray-500 text-sm mb-10">
            In 2026. On a planet with 7 billion phones.
          </p>
          <div className="bg-gradient-to-br from-emerald-950 to-emerald-900 border border-emerald-700 rounded-2xl p-6 mb-12">
            <p className="text-emerald-300 font-bold text-lg mb-2">
              NationalTravelKey.com — 100% phone-friendly.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Every rule. Every park. Every detail. Built for the device already in your hand.
            </p>
          </div>
        </div>
        <div className="flex justify-center items-end gap-8 mb-10">
          <div className={`flex flex-col items-center transition-all duration-700 delay-100 ${bow ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
            <img src={RACCOONS} alt="Raccoon left" className="w-16 md:w-20 scale-x-[-1]" />
            <p className="text-gray-500 text-xs mt-1">🎧</p>
          </div>
          <div className={`flex flex-col items-center transition-all duration-700 delay-200 ${bow ? "-translate-y-4 opacity-100" : "translate-y-6 opacity-0"}`}>
            <img src={EAGLE} alt="Eagle" className="w-20 md:w-28 drop-shadow-2xl" />
            <p className="text-gray-500 text-xs mt-1">🦅</p>
          </div>
          <div className={`flex flex-col items-center transition-all duration-700 delay-300 ${bow ? "-translate-y-2 opacity-100" : "translate-y-6 opacity-0"}`}>
            <img src={OWL} alt="Owl" className="w-14 md:w-18" />
            <p className="text-gray-500 text-xs mt-1">📜</p>
          </div>
          <div className={`flex flex-col items-center transition-all duration-700 delay-100 ${bow ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
            <img src={RACCOONS} alt="Raccoon right" className="w-16 md:w-20" />
            <p className="text-gray-500 text-xs mt-1">🎧</p>
          </div>
        </div>
        <div className={`transition-all duration-1000 delay-500 ${bow ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <h2 className="text-3xl font-bold text-white mb-3">NationalTravelKey.com</h2>
          <p className="text-gray-400 text-sm mb-8">Adventure starts here. Rules included.</p>
          <div className="flex justify-center gap-4">
            <img src={USA} alt="American flag" className="w-16 rounded shadow" />
            <img src={FL} alt="Florida flag" className="w-16 rounded shadow" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ParkRulesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <EagleScene />
      <OwlCatch />
      <OwlScene />
      <RaccoonScene />
      <ClosingScene />
    </main>
  );
}
