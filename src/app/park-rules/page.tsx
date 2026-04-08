"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const EAGLE = "/images/eagle-new.png";
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
    e: "🎄", t: "CHRISTMAS CLOSURE",
    w: "They close for Christmas. And they really want you to know.",
    d: "All parks closed Dec 24 & 25. Campgrounds close NOON Dec 23, reopen 2 PM Dec 26. Open New Year's Day — yes, they clarified that too.",
    c: "from-red-950 to-red-900", a: "text-red-300", b: "border-red-700",
    reaction: "❄️",
  },
  {
    e: "🍺", t: "NO ALCOHOL. EVER.",
    w: "No alcohol on park property. Any park. Any time. Any excuse.",
    d: "Every Orange County park. No exceptions. Not a seltzer. Not a sunrise mimosa. Nothing.",
    c: "from-amber-950 to-amber-900", a: "text-amber-300", b: "border-amber-700",
    reaction: "🙅",
  },
  {
    e: "🐾", t: "PETS — KNOW BEFORE YOU GO",
    w: "Not all parks welcome your four-legged co-pilot.",
    d: "No pets at Moss Park or Kelly Park. Pets allowed at Clarcona Horse Park, Magnolia Park, and Trimble Park if properly registered.",
    p: "🚫 Moss · Kelly  |  ✅ Clarcona · Magnolia · Trimble (registered)",
    c: "from-emerald-950 to-emerald-900", a: "text-emerald-300", b: "border-emerald-700",
    reaction: "🐾",
  },
  {
    e: "⏰", t: "PARK HOURS",
    w: "Florida has two seasons: summer and still warm. Parks adjust.",
    d: "Summer (Mar–Oct): 8 AM – 8 PM. Winter (Nov–Feb): 8 AM – 6 PM. Follows daylight saving. Check in before close — gate code at check-in.",
    c: "from-sky-950 to-sky-900", a: "text-sky-300", b: "border-sky-700",
    reaction: "👍",
  },
];

const tips: Rule[] = [
  {
    e: "📞", t: "CANCELLATIONS & CHANGES",
    w: "The number is on your receipt. They put it there on purpose.",
    d: "Kelly: KellyCamping@ocfl.net | Clarcona: (407) 254-9010 | Moss: (407) 254-6840 | Magnolia: (407) 254-9046 | Trimble: (407) 254-1982",
    c: "from-purple-950 to-purple-900", a: "text-purple-300", b: "border-purple-700",
    reaction: "📋",
  },
  {
    e: "🏕️", t: "GROUP & HANDICAP SITES",
    w: "Some things still need a real human on the phone.",
    d: "For group campsites, handicap sites, or pavilions contact the park directly. Staff ready to help with special accommodations.",
    c: "from-blue-950 to-blue-900", a: "text-blue-300", b: "border-blue-700",
    reaction: "🤝",
  },
  {
    e: "📱", t: "THEY RECOMMEND A DESKTOP",
    w: "Orange County suggests a computer — not your phone — in 2026.",
    d: "NationalTravelKey.com was built phone-first. Every rule, every park, every detail — on the device already in your hand.",
    c: "from-rose-950 to-rose-900", a: "text-rose-300", b: "border-rose-700",
    reaction: "🤷",
  },
];
function useVis(ref: React.RefObject<HTMLElement | null>, threshold = 0.1) {
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

function useAutoReveal(count: number, visible: boolean, delay = 900) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (!visible || shown >= count) return;
    const t = setTimeout(() => setShown(s => s + 1), delay);
    return () => clearTimeout(t);
  }, [visible, shown, count, delay]);
  return shown;
}

function useMetalType(text: string, trigger: boolean, speed = 80) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!trigger) return;
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [trigger, text, speed]);
  return displayed;
}

const sounds = {
  clank: () => {
    try {
      const ctx = new AudioContext();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = "square";
      o.frequency.setValueAtTime(180, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.15);
      g.gain.setValueAtTime(0.4, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      o.start(); o.stop(ctx.currentTime + 0.15);
    } catch {}
  },
  sonar: () => {
    try {
      const ctx = new AudioContext();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = "sine";
      o.frequency.setValueAtTime(880, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 1.2);
      g.gain.setValueAtTime(0.2, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      o.start(); o.stop(ctx.currentTime + 1.2);
    } catch {}
  },
  radio: () => {
    try {
      const ctx = new AudioContext();
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.3, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * 0.3;
      const src = ctx.createBufferSource();
      const g = ctx.createGain();
      const f = ctx.createBiquadFilter();
      f.type = "bandpass"; f.frequency.value = 1200;
      src.buffer = buf;
      src.connect(f); f.connect(g); g.connect(ctx.destination);
      g.gain.setValueAtTime(0.4, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      src.start(); src.stop(ctx.currentTime + 0.3);
    } catch {}
  },
  eagle: () => {
    try {
      const ctx = new AudioContext();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = "sawtooth";
      o.frequency.setValueAtTime(1200, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.9);
      g.gain.setValueAtTime(0.35, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);
      o.start(); o.stop(ctx.currentTime + 0.9);
    } catch {}
  },
};

function MetalText({ text, trigger, speed = 60, className = "" }: {
  text: string; trigger: boolean; speed?: number; className?: string;
}) {
  const displayed = useMetalType(text, trigger, speed);
  const lastRef = useRef(0);
  useEffect(() => {
    if (displayed.length > lastRef.current) {
      if (displayed.length % 3 === 0) sounds.clank();
      lastRef.current = displayed.length;
    }
  }, [displayed]);
  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && trigger && (
        <span className="animate-pulse text-green-400">█</span>
      )}
    </span>
  );
}

function EagleScene() {
  const ref = useRef<HTMLDivElement>(null);
  const v = useVis(ref);
  const [started, setStarted] = useState(false);
  const [phase, setPhase] = useState(0);

  const handleEnter = useCallback(() => {
    setStarted(true);
    sounds.sonar();
    setTimeout(() => { setPhase(1); sounds.eagle(); }, 600);
    setTimeout(() => setPhase(2), 2800);
    setTimeout(() => { setPhase(3); sounds.clank(); }, 4200);
    setTimeout(() => setPhase(4), 5800);
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black px-4 py-20">
      {/* Radial glow */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-[3000ms] ${phase >= 1 ? "opacity-100" : "opacity-0"}`}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(8,47,73,0.4), black)" }} />
      </div>

      {/* ENTER button */}
      {!started && v && (
        <div className="relative z-30 flex flex-col items-center gap-8">
          <p className="text-green-400 font-mono text-xs tracking-[0.4em] animate-pulse">
            // CLASSIFIED — ORANGE COUNTY PARKS DIVISION //
          </p>
          <button
            onClick={handleEnter}
            className="px-10 py-5 bg-green-900/40 border-2 border-green-500 rounded-2xl text-green-400 font-mono font-black text-xl md:text-3xl tracking-widest hover:bg-green-800/50 hover:scale-105 active:scale-95 transition-all duration-300 animate-pulse"
            style={{ boxShadow: "0 0 40px rgba(34,197,94,0.3), inset 0 0 20px rgba(34,197,94,0.1)" }}
          >
            ▶ ENTER BRIEFING
          </button>
          <p className="text-gray-600 text-xs">TAP TO BEGIN</p>
        </div>
      )}

      {started && (
        <>
          {/* EAGLE — flies in from left as standalone character */}
          <div
            className="absolute z-10"
            style={{
              width: "clamp(200px, 50vw, 480px)",
              top: "50%",
              left: "50%",
              transition: "transform 2200ms cubic-bezier(0.22, 1, 0.36, 1), opacity 800ms ease",
              transform: phase >= 2
                ? "translate(-50%, -60%) rotate(0deg) scale(1)"
                : phase >= 1
                  ? "translate(-50%, -58%) rotate(-4deg) scale(1.05)"
                  : "translate(-160%, -40%) rotate(-18deg) scale(0.65)",
              opacity: phase >= 1 ? 1 : 0,
            }}
          >
            <img
              src={EAGLE}
              alt="Bald eagle delivering park rules over Florida"
              className="w-full h-auto"
              style={{ filter: "drop-shadow(0 0 40px rgba(255,255,255,0.2)) contrast(1.3) brightness(0.95)" }}
            />
          </div>

          {/* FLAGS — drop from top after eagle lands */}
          <div className="absolute top-0 left-0 right-0 flex justify-between px-6 pt-6 z-20">
            <img
              src={FL}
              alt="Florida flag"
              className="w-28 md:w-44 rounded-lg shadow-2xl"
              style={{
                filter: "drop-shadow(0 0 20px rgba(255,255,255,0.3))",
                opacity: phase >= 3 ? 1 : 0,
                transform: phase >= 3 ? "translateY(0)" : "translateY(-60px)",
                transition: "opacity 1000ms ease, transform 1000ms ease",
                transitionDelay: "0ms",
              }}
            />
            <img
              src={USA}
              alt="American flag"
              className="w-28 md:w-44 rounded-lg shadow-2xl"
              style={{
                filter: "drop-shadow(0 0 20px rgba(255,255,255,0.3))",
                opacity: phase >= 3 ? 1 : 0,
                transform: phase >= 3 ? "translateY(0)" : "translateY(-60px)",
                transition: "opacity 1000ms ease, transform 1000ms ease",
                transitionDelay: "200ms",
              }}
            />
          </div>

          {/* TEXT — types in after flags */}
          <div className="relative z-20 text-center max-w-4xl mx-auto px-4 mt-[52vh]">
            <div style={{ opacity: phase >= 3 ? 1 : 0, transition: "opacity 500ms ease" }}>
              <p className="text-green-400 text-xs tracking-[0.4em] mb-4 font-mono">
                <MetalText text="// ORANGE COUNTY PARKS DIVISION //" trigger={phase >= 3} speed={40} />
              </p>
            </div>
            <h1
              className="text-4xl md:text-7xl font-black tracking-tight text-white leading-none mb-6"
              style={{ textShadow: "0 0 40px rgba(255,255,255,0.2), 0 4px 20px rgba(0,0,0,0.8)" }}
            >
              {phase >= 3 && (
                <MetalText text="PARK RULES" trigger={phase >= 3} speed={80} className="block" />
              )}
            </h1>
            <div style={{ opacity: phase >= 4 ? 1 : 0, transform: phase >= 4 ? "translateY(0)" : "translateY(16px)", transition: "opacity 700ms ease 1000ms, transform 700ms ease 1000ms" }}>
              <p className="text-sky-300 text-base md:text-xl italic font-light">
                Delivered from 30,000 feet. No desktop required.
              </p>
            </div>
            <div style={{ opacity: phase >= 4 ? 1 : 0, transition: "opacity 700ms ease 1500ms" }} className="mt-8">
              <div className="inline-block border border-green-700/50 bg-green-950/30 rounded-xl px-6 py-3">
                <p className="text-green-400 font-mono text-sm">📜 TRANSMISSION RECEIVED — SCROLL TO DECODE</p>
              </div>
            </div>
            <div style={{ opacity: phase >= 4 ? 1 : 0, transition: "opacity 500ms ease 2000ms" }} className="mt-6">
              <p className="text-sky-700 text-xs animate-bounce">↓</p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

function OwlCatch() {
  const ref = useRef<HTMLDivElement>(null);
  const v = useVis(ref);
  const [caught, setCaught] = useState(false);
  useEffect(() => {
    if (v) {
      sounds.sonar();
      const t = setTimeout(() => { setCaught(true); sounds.clank(); }, 900);
      return () => clearTimeout(t);
    }
  }, [v]);
  return (
    <section ref={ref} className="relative bg-gradient-to-b from-black via-sky-950 to-gray-950 px-4 py-20 overflow-hidden">
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
        <div className={`transition-all duration-700 text-5xl mb-4 ${v ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-16"}`}>
          📜
        </div>
        <img
          src={OWL}
          alt="Wise owl"
          className={`w-48 md:w-64 drop-shadow-2xl transition-all duration-500 ${caught ? "scale-110 -rotate-2" : "scale-100"} ${v ? "opacity-100" : "opacity-0"}`}
          style={{ filter: "drop-shadow(0 0 30px rgba(100,150,255,0.4))" }}
        />
        <div className={`mt-6 transition-all duration-700 delay-700 ${caught ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="text-green-400 font-mono text-xs tracking-widest mb-2">// RULES RECEIVED //</p>
          <p className="text-gray-300 italic text-base md:text-lg">
            &ldquo;I don&rsquo;t make them. I just unfold them.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
function RaccoonGuards({ reaction, vis }: { reaction: string; vis: boolean }) {
  return (
    <div className="flex justify-between items-end px-2 mb-3">
      <div className={`transition-all duration-700 ${vis ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}>
        <img
          src={RACCOONS}
          alt="Guard left"
          className="w-16 md:w-24 drop-shadow-xl scale-x-[-1]"
          style={{ filter: "drop-shadow(0 0 15px rgba(100,200,100,0.3))" }}
        />
        <p className="text-center text-lg mt-1">{reaction}</p>
      </div>
      <div className={`transition-all duration-700 delay-200 ${vis ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}>
        <img
          src={RACCOONS}
          alt="Guard right"
          className="w-16 md:w-24 drop-shadow-xl"
          style={{ filter: "drop-shadow(0 0 15px rgba(100,200,100,0.3))" }}
        />
        <p className="text-center text-lg mt-1">{reaction}</p>
      </div>
    </div>
  );
}

function AutoCard({ r, vis, dir }: { r: Rule; vis: boolean; dir: "left" | "right" }) {
  const played = useRef(false);
  useEffect(() => {
    if (vis && !played.current) {
      played.current = true;
      sounds.radio();
      setTimeout(() => sounds.clank(), 300);
    }
  }, [vis]);
  const slide = dir === "left" ? "-translate-x-20" : "translate-x-20";
  return (
    <div className={`transition-all duration-700 ${vis ? "opacity-100 translate-x-0 translate-y-0 scale-100" : `opacity-0 ${slide} translate-y-6 scale-95`}`}>
      <RaccoonGuards reaction={r.reaction} vis={vis} />
      <div className={`bg-gradient-to-br ${r.c} border ${r.b} rounded-2xl p-5 md:p-7`}
        style={{ boxShadow: vis ? "0 0 30px rgba(0,0,0,0.5)" : "none" }}>
        <div className="flex items-start gap-4">
          <span className="text-3xl md:text-4xl mt-1">{r.e}</span>
          <div className="flex-1">
            <h3 className={`font-black text-base md:text-xl ${r.a} tracking-wide`}>
              {r.t}
            </h3>
            <p className="text-gray-300 text-sm md:text-base mt-2 leading-relaxed">
              {r.w}
            </p>
            <p className="text-gray-400 text-sm mt-2 leading-relaxed">
              {r.d}
            </p>
            {r.p && (
              <p className={`text-xs md:text-sm mt-3 font-semibold ${r.a}`}>
                {r.p}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function OwlScene() {
  const ref = useRef<HTMLDivElement>(null);
  const v = useVis(ref);
  const shown = useAutoReveal(owl.length, v, 1200);
  return (
    <section ref={ref} className="bg-gradient-to-b from-gray-950 to-gray-950 px-4 py-20">
      <div className="max-w-3xl mx-auto">
        <div className={`text-center mb-14 transition-all duration-1000 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-green-400 font-mono text-xs tracking-[0.3em] mb-3">
            // OFFICIAL RULES — AUTO DECODING //
          </p>
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
            THE RULES, AS WRITTEN
          </h2>
          <p className="text-gray-500 italic text-sm mt-2">
            Each one is real. Every word from the source.
          </p>
        </div>
        <div className="space-y-10">
          {owl.map((r, i) => (
            <AutoCard
              key={r.t}
              r={r}
              vis={i < shown}
              dir={i % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function RaccoonScene() {
  const ref = useRef<HTMLDivElement>(null);
  const v = useVis(ref);
  const shown = useAutoReveal(tips.length, v, 1200);
  useEffect(() => {
    if (v) sounds.radio();
  }, [v]);
  return (
    <section ref={ref} className="bg-gradient-to-b from-gray-950 to-black px-4 py-20">
      <div className="max-w-3xl mx-auto">
        <div className={`text-center mb-14 transition-all duration-1000 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-block bg-gray-800/60 border border-green-700/50 rounded-xl px-6 py-3 mb-4">
            <p className="text-green-400 font-mono text-sm font-bold">
              🎧 SAFETY HQ — TRANSMISSION ACTIVE
            </p>
          </div>
          <p className="text-gray-400 italic text-sm">
            &ldquo;Copy that, Owl. The practical stuff is ours.&rdquo;
          </p>
        </div>
        <div className="space-y-10">
          {tips.map((r, i) => (
            <AutoCard
              key={r.t}
              r={r}
              vis={i < shown}
              dir={i % 2 === 0 ? "right" : "left"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
function Confetti() {
  const items = Array.from({ length: 40 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.map((_, i) => {
        const left = (i * 2.5) % 100;
        const delay = (i * 0.15) % 4;
        const dur = 3 + (i % 3);
        const colors = ["bg-red-400","bg-blue-400","bg-yellow-300","bg-green-400","bg-pink-400","bg-white"];
        const color = colors[i % colors.length];
        const size = 6 + (i % 6);
        return (
          <div
            key={i}
            className={`absolute rounded-sm ${color} opacity-80`}
            style={{
              left: `${left}%`,
              top: "-10px",
              width: size,
              height: size,
              animation: `fall ${dur}s ${delay}s linear infinite`,
              transform: `rotate(${i * 30}deg)`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0.8; }
          100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function ClosingScene() {
  const ref = useRef<HTMLDivElement>(null);
  const v = useVis(ref);
  const [bow, setBow] = useState(false);
  useEffect(() => {
    if (v) {
      sounds.sonar();
      const t = setTimeout(() => { setBow(true); sounds.clank(); }, 800);
      return () => clearTimeout(t);
    }
  }, [v]);
  return (
    <section ref={ref} className="relative bg-black px-4 py-24 overflow-hidden">
      {bow && <Confetti />}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className={`transition-all duration-1000 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-green-400 font-mono text-xs tracking-[0.3em] mb-6">
            // END OF TRANSMISSION //
          </p>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4">
            Their site recommends<br />
            <span className="text-red-400">using a desktop computer.</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base mb-10">
            In 2026. On a planet with 7 billion phones.
          </p>
          <div className="bg-gradient-to-br from-emerald-950 to-emerald-900 border border-emerald-600 rounded-2xl p-6 md:p-10 mb-14"
            style={{ boxShadow: "0 0 40px rgba(16,185,129,0.15)" }}>
            <p className="text-emerald-300 font-black text-xl md:text-2xl mb-3">
              NationalTravelKey.com
            </p>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              100% phone-friendly. Every rule. Every park. Every detail.<br />
              Built for the device already in your hand.
            </p>
          </div>
        </div>
        <div className="flex justify-center items-end gap-6 md:gap-12 mb-12">
          <div className={`flex flex-col items-center transition-all duration-700 delay-100 ${bow ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <img src={RACCOONS} alt="Raccoon left" className="w-20 md:w-28 scale-x-[-1]"
              style={{ filter: "drop-shadow(0 0 20px rgba(100,200,100,0.4))" }} />
            <p className="text-xs text-gray-600 mt-1">🎧</p>
          </div>
          <div className={`flex flex-col items-center transition-all duration-700 delay-200 ${bow ? "-translate-y-6 opacity-100" : "translate-y-10 opacity-0"}`}>
            <img src={EAGLE} alt="Eagle" className="w-32 md:w-48 drop-shadow-2xl"
              style={{ filter: "drop-shadow(0 0 30px rgba(255,255,255,0.2))" }} />
            <p className="text-xs text-gray-600 mt-1">🦅</p>
          </div>
          <div className={`flex flex-col items-center transition-all duration-700 delay-300 ${bow ? "-translate-y-3 opacity-100" : "translate-y-10 opacity-0"}`}>
            <img src={OWL} alt="Owl" className="w-20 md:w-28 drop-shadow-2xl"
              style={{ filter: "drop-shadow(0 0 20px rgba(100,150,255,0.4))" }} />
            <p className="text-xs text-gray-600 mt-1">📜</p>
          </div>
          <div className={`flex flex-col items-center transition-all duration-700 delay-100 ${bow ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <img src={RACCOONS} alt="Raccoon right" className="w-20 md:w-28"
              style={{ filter: "drop-shadow(0 0 20px rgba(100,200,100,0.4))" }} />
            <p className="text-xs text-gray-600 mt-1">🎧</p>
          </div>
        </div>
        <div className={`transition-all duration-1000 delay-500 ${bow ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight">
            NationalTravelKey.com
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-8">
            Adventure starts here. Rules included.
          </p>
          <div className="flex justify-center gap-6">
            <img src={USA} alt="American flag" className="w-20 md:w-28 rounded-lg shadow-2xl"
              style={{ filter: "drop-shadow(0 0 15px rgba(255,255,255,0.2))" }} />
            <img src={FL} alt="Florida flag" className="w-20 md:w-28 rounded-lg shadow-2xl"
              style={{ filter: "drop-shadow(0 0 15px rgba(255,255,255,0.2))" }} />
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
