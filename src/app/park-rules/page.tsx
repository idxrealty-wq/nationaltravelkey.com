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
};

const owl: Rule[] = [
  {
    e: "🎄", t: "Christmas Closure",
    w: "They close for Christmas. And they really want you to know.",
    d: "All parks closed Dec 24 & 25. Campgrounds close NOON Dec 23, reopen 2 PM Dec 26. Open New Year's Day — yes, they clarified.",
    c: "from-red-950 to-red-900", a: "text-red-300", b: "border-red-700",
  },
  {
    e: "🍺", t: "No Alcohol. Ever.",
    w: "No alcohol on park property. Any park. Any time. Any excuse.",
    d: "Every Orange County park. No exceptions. Not a seltzer. Not a sunrise mimosa. Nothing.",
    c: "from-amber-950 to-amber-900", a: "text-amber-300", b: "border-amber-700",
  },
  {
    e: "🐾", t: "Pets — Know Before You Go",
    w: "Not all parks welcome your four-legged co-pilot.",
    d: "No pets at Moss Park or Kelly Park. Pets allowed at Clarcona Horse Park, Magnolia Park, and Trimble Park if registered. Contact parks directly.",
    p: "🚫 Moss · Kelly | ✅ Clarcona · Magnolia · Trimble (registered)",
    c: "from-emerald-950 to-emerald-900", a: "text-emerald-300", b: "border-emerald-700",
  },
  {
    e: "⏰", t: "Park Hours",
    w: "Florida has two seasons: summer and still warm. Parks adjust.",
    d: "Summer (Mar–Oct): 8 AM – 8 PM. Winter (Nov–Feb): 8 AM – 6 PM. Follows daylight saving time. Check in before close — gate code at check-in.",
    c: "from-sky-950 to-sky-900", a: "text-sky-300", b: "border-sky-700",
  },
];

const tips: Rule[] = [
  {
    e: "📞", t: "Cancellations & Changes",
    w: "The number is on your receipt. They put it there on purpose.",
    d: "Kelly: KellyCamping@ocfl.net | Clarcona: (407) 254-9010 | Moss: (407) 254-6840 | Magnolia: (407) 254-9046 | Trimble: (407) 254-1982",
    c: "from-purple-950 to-purple-900", a: "text-purple-300", b: "border-purple-700",
  },
  {
    e: "🏕️", t: "Group & Handicap Sites, Pavilions",
    w: "Some things still need a real human on the phone.",
    d: "For group campsites, handicap sites, or pavilions contact the park directly. Staff ready to help.",
    c: "from-blue-950 to-blue-900", a: "text-blue-300", b: "border-blue-700",
  },
  {
    e: "📱", t: "They Recommend a Desktop Computer",
    w: "Orange County suggests a computer — not your phone — in 2026.",
    d: "NationalTravelKey.com was built phone-first. Every rule, every park, every detail — on the device in your hand.",
    c: "from-rose-950 to-rose-900", a: "text-rose-300", b: "border-rose-700",
  },
];

function useVis(ref: React.RefObject<HTMLElement | null>) {
  const [v, setV] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true); },
      { threshold: 0.15 }
    );
    o.observe(ref.current);
    return () => o.disconnect();
  }, [ref]);
  return v;
}
function EagleScene() {
  const ref = useRef<HTMLDivElement>(null);
  const v = useVis(ref);
  const [landed, setLanded] = useState(false);
  useEffect(() => {
    if (v) {
      const t = setTimeout(() => setLanded(true), 1400);
      return () => clearTimeout(t);
    }
  }, [v]);
  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-sky-950 to-sky-900 px-4 py-20">
      <div className="absolute top-4 right-4 flex gap-3 z-10">
        <img src={USA} alt="American flag" className={`w-24 md:w-32 rounded shadow-lg transition-all duration-1000 ${v ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`} />
        <img src={FL} alt="Florida flag" className={`w-24 md:w-32 rounded shadow-lg transition-all duration-1000 delay-300 ${v ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`} />
      </div>
      <img
        src={EAGLE}
        alt="Bald eagle delivering park rules"
        className={`w-48 md:w-72 drop-shadow-2xl transition-all duration-[1800ms] ease-out ${v ? "translate-x-0 translate-y-0 opacity-100 scale-100" : "-translate-x-full -translate-y-20 opacity-0 scale-75"}`}
      />
      <div className={`mt-10 text-center max-w-xl transition-all duration-1000 delay-700 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Orange County Park Rules
        </h1>
        <p className="text-sky-300 text-base md:text-lg italic">
          Delivered from 30,000 feet. No desktop required.
        </p>
      </div>
      <div className={`mt-8 transition-all duration-700 delay-[1400ms] ${landed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <div className="bg-sky-900/40 border border-sky-700/50 rounded-2xl px-6 py-4 text-center">
          <p className="text-sky-200 text-sm">📜 Scroll delivered. The Owl takes it from here.</p>
        </div>
      </div>
      <div className={`absolute bottom-8 transition-all duration-1000 delay-[1800ms] ${landed ? "opacity-100" : "opacity-0"}`}>
        <p className="text-sky-600 text-xs animate-bounce">↓ scroll to read the rules</p>
      </div>
    </section>
  );
}

function Card({ r, i, v }: { r: Rule; i: number; v: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`bg-gradient-to-br ${r.c} border ${r.b} rounded-2xl p-5 md:p-6 cursor-pointer transition-all duration-500 hover:scale-[1.02] active:scale-[0.99] ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${i * 180 + 400}ms` }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl mt-1">{r.e}</span>
        <div className="flex-1">
          <h3 className={`font-bold text-base md:text-lg ${r.a} leading-snug`}>{r.t}</h3>
          <p className="text-gray-300 text-sm mt-1 leading-relaxed">{r.w}</p>
          <div className={`overflow-hidden transition-all duration-500 ${open ? "max-h-64 mt-3" : "max-h-0"}`}>
            <p className="text-gray-400 text-sm leading-relaxed">{r.d}</p>
            {r.p && <p className={`text-xs mt-3 font-medium ${r.a}`}>{r.p}</p>}
          </div>
          <p className="text-gray-600 text-xs mt-2">{open ? "▲ tap to close" : "▼ tap for details"}</p>
        </div>
      </div>
    </div>
  );
}
function OwlScene() {
  const ref = useRef<HTMLDivElement>(null);
  const v = useVis(ref);
  return (
    <section ref={ref} className="bg-gradient-to-b from-sky-900 via-gray-950 to-gray-950 px-4 py-20">
      <div className="max-w-2xl mx-auto">
        <div className={`flex flex-col items-center mb-12 transition-all duration-1000 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <img src={OWL} alt="Wise owl reading the rules" className="w-36 md:w-44 drop-shadow-2xl" />
          <div className="mt-5 text-center">
            <p className="text-white font-semibold text-lg md:text-xl">The Rules, As Written</p>
            <p className="text-gray-400 italic text-sm mt-1">
              &ldquo;I don&rsquo;t make them. I just unfold them. Tap each one for the full story.&rdquo;
            </p>
          </div>
        </div>
        <div className="space-y-4">
          {owl.map((r, i) => (
            <Card key={r.t} r={r} i={i} v={v} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RaccoonScene() {
  const ref = useRef<HTMLDivElement>(null);
  const v = useVis(ref);
  return (
    <section ref={ref} className="bg-gradient-to-b from-gray-950 via-gray-950 to-black px-4 py-20">
      <div className="max-w-2xl mx-auto">
        <div className={`flex flex-col items-center mb-12 transition-all duration-1000 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <img src={RACCOONS} alt="Raccoon safety guards with headsets" className="w-44 md:w-56 drop-shadow-2xl" />
          <div className="mt-5 text-center">
            <div className="inline-block bg-gray-800/60 border border-gray-700 rounded-xl px-5 py-2 mb-3">
              <p className="text-gray-300 text-sm font-semibold">🎧 SAFETY HQ — On Duty</p>
            </div>
            <p className="text-gray-400 italic text-sm">
              &ldquo;Copy that, Owl. The practical stuff is ours.&rdquo;
            </p>
          </div>
        </div>
        <div className="space-y-4">
          {tips.map((r, i) => (
            <Card key={r.t} r={r} i={i} v={v} />
          ))}
        </div>
      </div>
    </section>
  );
}
function ClosingScene() {
  const ref = useRef<HTMLDivElement>(null);
  const v = useVis(ref);
  return (
    <section ref={ref} className="bg-black px-4 py-24">
      <div className="max-w-2xl mx-auto text-center">
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
          <div className="flex justify-center items-end gap-6 mb-8">
            <img src={EAGLE} alt="Eagle" className="w-16 md:w-20" />
            <img src={OWL} alt="Owl" className="w-14 md:w-16" />
            <img src={RACCOONS} alt="Raccoons" className="w-20 md:w-28" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">
            NationalTravelKey.com
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Adventure starts here. Rules included.
          </p>
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
      <OwlScene />
      <RaccoonScene />
      <ClosingScene />
    </main>
  );
}
