"use client";

import { useEffect, useRef, useState } from "react";

const EAGLE_IMG = "/images/eagle.png";
const RACCOONS_IMG = "/images/raccoons.png";
const OWL_IMG = "/images/owl.png";
const FLAG_IMG = "/images/flag.png";

type RuleItem = {
  emoji: string;
  title: string;
  summary: string;
  detail: string;
  color: string;
  accent: string;
  border: string;
};

const owlRules: RuleItem[] = [
  {
    emoji: "🕐",
    title: "Park Hours",
    summary: "Parks open at 8:00 AM. Close at sundown or 8:00 PM.",
    detail: "Nature has a curfew. Whichever comes first wins. Plan accordingly and don't get caught in the dark.",
    color: "from-amber-950 to-amber-900",
    accent: "text-amber-300",
    border: "border-amber-700",
  },
  {
    emoji: "🏕️",
    title: "Check-In & Check-Out",
    summary: "Check-in at 1:00 PM. Check-out by 11:00 AM.",
    detail: "Show up early? That's called loitering with intent to camp. Be on time both ways.",
    color: "from-emerald-950 to-emerald-900",
    accent: "text-emerald-300",
    border: "border-emerald-700",
  },
  {
    emoji: "🚫",
    title: "Alcohol Policy",
    summary: "No alcohol in any Orange County park. Period.",
    detail: "Yes, really. No exceptions. No loopholes. No 'but it's just a seltzer.' Put it back.",
    color: "from-red-950 to-red-900",
    accent: "text-red-300",
    border: "border-red-700",
  },
  {
    emoji: "🐕",
    title: "Pets",
    summary: "Pets must be on a leash no longer than 6 feet.",
    detail: "Your dog is welcome. Your dog's behavior is your responsibility. Clean up after them — every time.",
    color: "from-blue-950 to-blue-900",
    accent: "text-blue-300",
    border: "border-blue-700",
  },
];

const raccoonTips: RuleItem[] = [
  {
    emoji: "🔥",
    title: "Fire Rules",
    summary: "Fires only in designated rings or grills.",
    detail: "No ground fires. No unattended flames. We're raccoons — we know what happens when fire gets out of hand.",
    color: "from-orange-950 to-orange-900",
    accent: "text-orange-300",
    border: "border-orange-700",
  },
  {
    emoji: "🤫",
    title: "Quiet Hours",
    summary: "Quiet hours: 11:00 PM to 7:00 AM.",
    detail: "Your playlist is not as good as you think it is. Trust us. Sound carries farther than you expect over water.",
    color: "from-purple-950 to-purple-900",
    accent: "text-purple-300",
    border: "border-purple-700",
  },
  {
    emoji: "🦝",
    title: "Wildlife",
    summary: "Do not feed the wildlife. Yes, that includes us.",
    detail: "We're cute. We know. But your trail mix is not worth the incident report. Keep all food secured.",
    color: "from-sky-950 to-sky-900",
    accent: "text-sky-300",
    border: "border-sky-700",
  },
];

function useOnScreen(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}
function EagleScene() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useOnScreen(ref);
  return (
    <section ref={ref} className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-sky-950 via-sky-900 to-sky-800 px-4 py-20">
      <img
        src={FLAG_IMG}
        alt="American flag"
        className={`absolute top-6 right-6 w-20 md:w-28 opacity-80 transition-all duration-1000 ${visible ? "translate-y-0 opacity-80" : "-translate-y-10 opacity-0"}`}
      />
      <img
        src={EAGLE_IMG}
        alt="Bald eagle delivering the rules"
        className={`w-40 md:w-56 drop-shadow-2xl transition-all duration-[1500ms] ease-out ${visible ? "translate-x-0 translate-y-0 opacity-100 scale-100" : "-translate-x-40 -translate-y-20 opacity-0 scale-75"}`}
      />
      <div className={`mt-8 text-center transition-all duration-1000 delay-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <p className="text-sky-300 text-lg md:text-xl italic font-light">
          &ldquo;Somewhere over Florida… the rules are on their way.&rdquo;
        </p>
        <div className={`mt-6 transition-all duration-700 delay-[1200ms] ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
          <div className="inline-block bg-sky-700/40 border border-sky-600/50 rounded-xl px-6 py-3">
            <p className="text-sky-200 text-sm">📜 The scroll has been delivered…</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RuleCard({ rule, index, visible }: { rule: RuleItem; index: number; visible: boolean }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={`bg-gradient-to-br ${rule.color} border ${rule.border} rounded-2xl p-5 md:p-6 cursor-pointer transition-all duration-500 hover:scale-[1.02] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 150 + 300}ms` }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{rule.emoji}</span>
        <div className="flex-1">
          <h3 className={`font-bold text-lg ${rule.accent}`}>{rule.title}</h3>
          <p className="text-gray-300 text-sm mt-1">{rule.summary}</p>
          <div className={`overflow-hidden transition-all duration-500 ${expanded ? "max-h-40 mt-3" : "max-h-0"}`}>
            <p className="text-gray-400 text-sm leading-relaxed">{rule.detail}</p>
          </div>
          <p className="text-gray-500 text-xs mt-2">{expanded ? "Tap to close" : "Tap for details"}</p>
        </div>
      </div>
    </div>
  );
}

function OwlScene() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useOnScreen(ref);
  return (
    <section ref={ref} className="bg-gradient-to-b from-sky-800 via-gray-900 to-gray-900 px-4 py-20">
      <div className="max-w-2xl mx-auto">
        <div className={`flex flex-col items-center mb-10 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <img src={OWL_IMG} alt="Wise owl reading the rules" className="w-32 md:w-40 drop-shadow-xl" />
          <p className="text-gray-300 italic mt-4 text-center text-sm md:text-base">
            &ldquo;Every adventure has rules. Let&rsquo;s make sure you actually enjoy reading these.&rdquo;
          </p>
          <p className="text-gray-500 text-xs mt-2">— The Wise Owl</p>
        </div>
        <div className="space-y-4">
          {owlRules.map((rule, i) => (
            <RuleCard key={rule.title} rule={rule} index={i} visible={visible} />
          ))}
        </div>
        <div className={`mt-10 text-center transition-all duration-700 delay-[1000ms] ${visible ? "opacity-100" : "opacity-0"}`}>
          <p className="text-gray-400 italic text-sm">&ldquo;I don&rsquo;t make the rules. I just unfold them.&rdquo;</p>
        </div>
      </div>
    </section>
  );
}
function RaccoonScene() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useOnScreen(ref);
  return (
    <section ref={ref} className="bg-gradient-to-b from-gray-900 via-gray-950 to-gray-950 px-4 py-20">
      <div className="max-w-2xl mx-auto">
        <div className={`flex flex-col items-center mb-10 transition-all duration-1000 \${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <img src={RACCOONS_IMG} alt="Raccoon guards with headsets" className="w-40 md:w-52 drop-shadow-xl" />
          <div className="mt-4 inline-block bg-gray-800/60 border border-gray-700 rounded-xl px-5 py-2">
            <p className="text-gray-300 text-sm font-medium">🎧 SAFETY HQ — Standing By</p>
          </div>
          <p className="text-gray-400 italic mt-3 text-center text-sm">
            &ldquo;Copy that, Owl. We&rsquo;ll take it from here.&rdquo;
          </p>
        </div>
        <div className="space-y-4">
          {raccoonTips.map((rule, i) => (
            <RuleCard key={rule.title} rule={rule} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileMoment() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useOnScreen(ref);
  return (
    <section ref={ref} className="bg-gradient-to-b from-gray-950 to-black px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className={`transition-all duration-1000 \${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-gray-400 text-sm mb-2">🦝 One more thing…</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            The county website told you<br />
            <span className="text-red-400">not to use your phone</span> for this.
          </h2>
          <p className="text-gray-500 text-sm mb-2">In 2026. On a planet where phones exist.</p>
        </div>
        <div className={`mt-10 transition-all duration-1000 delay-500 \${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="bg-gradient-to-br from-emerald-950 to-emerald-900 border border-emerald-700 rounded-2xl p-6 md:p-8">
            <p className="text-emerald-300 font-bold text-lg mb-2">You&rsquo;re not on the county website anymore.</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              NationalTravelKey.com — built for the device already in your hand. Every rule. Every park. Every detail. Mobile-first, always.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClosingScene() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useOnScreen(ref);
  return (
    <section ref={ref} className="bg-black px-4 py-24">
      <div className="max-w-2xl mx-auto text-center">
        <div className={`transition-all duration-1000 \${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <div className="flex justify-center gap-4 mb-8">
            <img src={EAGLE_IMG} alt="Eagle" className="w-16 md:w-20" />
            <img src={OWL_IMG} alt="Owl" className="w-14 md:w-18" />
            <img src={RACCOONS_IMG} alt="Raccoons" className="w-18 md:w-24" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            NationalTravelKey.com
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-6">
            Every rule. Every park. Every detail.<br />
            Built for the device already in your hand.
          </p>
          <p className="text-gray-600 italic text-xs">
            &ldquo;Adventure starts here. Rules included.&rdquo;
          </p>
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
      <MobileMoment />
      <ClosingScene />
    </main>
  );
}

  return (
    <main className="min-h-screen bg-black text-white">
