"use client";

import { useEffect, useState } from "react";

/* ═══════════════════════════════════════════
   PARK RULES — ANIMATED EXPERIENCE
   NationalTravelKey.com
   ═══════════════════════════════════════════ */

type RuleItem = {
  title: string;
  summary: string;
  detail: string;
};

const rules: RuleItem[] = [
  {
    title: "Respect Closures",
    summary: "If an area is closed, it is closed for a reason.",
    detail:
      "Closed areas protect wildlife, restoration work, water quality, and public safety. Do not cross barriers, ropes, fences, or posted closure lines.",
  },
  {
    title: "Protect Wildlife",
    summary: "Give animals space and keep the habitat calm.",
    detail:
      "Do not chase, feed, corner, or disturb wildlife. Florida habitats depend on visitors keeping a respectful distance.",
  },
  {
    title: "Pack Out Trash",
    summary: "Leave the area cleaner than you found it.",
    detail:
      "Take all trash, cans, food waste, and personal items with you. Even small litter can damage waterways and harm animals.",
  },
  {
    title: "Use Safe Access Areas",
    summary: "Stay in approved zones and marked paths.",
    detail:
      "Use designated entry points, approved walkways, and posted recreation zones to prevent erosion and habitat damage.",
  },
  {
    title: "Keep Noise Reasonable",
    summary: "Enjoy the day without overwhelming the area.",
    detail:
      "Keep speakers, shouting, and engine noise at a respectful level. Sound carries across water much farther than most people expect.",
  },
  {
    title: "Follow Local Signs",
    summary: "Posted signs are the final word on-site.",
    detail:
      "Conditions change. Temporary closures, weather restrictions, and safety notices always override assumptions or old habits.",
  },
];

/* ─── SVG EAGLE ─── */
function EagleSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body */}
      <ellipse cx="100" cy="65" rx="30" ry="18" fill="#3B2314" />
      {/* White head */}
      <circle cx="125" cy="52" r="14" fill="#FAFAFA" />
      {/* Eye */}
      <circle cx="130" cy="50" r="2.5" fill="#1a1a1a" />
      {/* Beak */}
      <polygon points="139,52 148,55 139,57" fill="#F5A623" />
      {/* Left wing up */}
      <path
        d="M70,60 Q40,20 20,30 Q50,45 70,50 Z"
        fill="#4A3728"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 70 60;-12 70 60;0 70 60"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </path>
      {/* Right wing up */}
      <path
        d="M100,55 Q120,15 145,20 Q115,40 100,50 Z"
        fill="#4A3728"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 100 55;10 100 55;0 100 55"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </path>
      {/* Tail feathers */}
      <polygon points="70,65 45,75 50,60" fill="#3B2314" />
      <polygon points="70,68 42,82 48,66" fill="#2C1A0E" />
      {/* White tail tip */}
      <polygon points="48,66 42,82 38,70" fill="#FAFAFA" />
      {/* Talons */}
      <path d="M90,82 L87,95 M90,82 L93,95" stroke="#F5A623" strokeWidth="2" fill="none" />
      <path d="M110,82 L107,95 M110,82 L113,95" stroke="#F5A623" strokeWidth="2" fill="none" />
    </svg>
  );
}
/* ─── SVG RACCOON ─── */
function RaccoonSVG({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 140 180"
      className={`w-28 sm:w-36 ${flip ? "scale-x-[-1]" : ""}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ranger hat */}
      <ellipse cx="70" cy="38" rx="38" ry="10" fill="#5C4033" />
      <path d="M45,38 Q70,5 95,38 Z" fill="#6B4F3A" />
      <rect x="55" y="30" width="30" height="5" rx="2" fill="#F5A623" />
      {/* Head */}
      <ellipse cx="70" cy="60" rx="28" ry="24" fill="#8B8B8B" />
      {/* Mask */}
      <ellipse cx="57" cy="56" rx="12" ry="8" fill="#2C2C2C" />
      <ellipse cx="83" cy="56" rx="12" ry="8" fill="#2C2C2C" />
      {/* Eyes */}
      <circle cx="57" cy="56" r="4" fill="white" />
      <circle cx="83" cy="56" r="4" fill="white" />
      <circle cx="58" cy="55" r="2" fill="#1a1a1a" />
      <circle cx="84" cy="55" r="2" fill="#1a1a1a" />
      {/* Nose */}
      <ellipse cx="70" cy="66" rx="4" ry="3" fill="#2C2C2C" />
      {/* White muzzle stripe */}
      <path d="M62,48 Q70,42 78,48" stroke="white" strokeWidth="3" fill="none" />
      {/* Body — uniform shirt */}
      <rect x="48" y="82" width="44" height="50" rx="8" fill="#2D5016" />
      {/* Badge */}
      <circle cx="62" cy="98" r="5" fill="#F5A623" />
      <text x="62" y="101" textAnchor="middle" fontSize="6" fill="#2D5016" fontWeight="bold">★</text>
      {/* Headset */}
      <path d="M42,50 Q38,35 45,30" stroke="#333" strokeWidth="3" fill="none" />
      <circle cx="42" cy="52" r="5" fill="#444" />
      <rect x="39" y="56" width="6" height="8" rx="2" fill="#555" />
      {/* Arms */}
      <rect x="36" y="88" width="12" height="35" rx="6" fill="#2D5016" />
      <rect x="92" y="88" width="12" height="35" rx="6" fill="#2D5016" />
      {/* Paws */}
      <ellipse cx="42" cy="126" rx="7" ry="5" fill="#8B8B8B" />
      <ellipse cx="98" cy="126" rx="7" ry="5" fill="#8B8B8B" />
      {/* Striped tail */}
      <path d="M90,125 Q115,110 110,85" stroke="#8B8B8B" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M95,120 Q112,108 108,92" stroke="#2C2C2C" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="8 8" />
    </svg>
  );
}

/* ─── SVG OWL ─── */
function OwlSVG() {
  return (
    <svg
      viewBox="0 0 140 180"
      className="w-32 sm:w-40"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body */}
      <ellipse cx="70" cy="110" rx="35" ry="45" fill="#8B6F47" />
      {/* Belly */}
      <ellipse cx="70" cy="120" rx="22" ry="30" fill="#D4C4A0" />
      {/* Belly feather lines */}
      <path d="M55,105 Q70,110 85,105" stroke="#B8A67A" strokeWidth="1" fill="none" />
      <path d="M55,115 Q70,120 85,115" stroke="#B8A67A" strokeWidth="1" fill="none" />
      <path d="M55,125 Q70,130 85,125" stroke="#B8A67A" strokeWidth="1" fill="none" />
      {/* Head */}
      <circle cx="70" cy="55" r="28" fill="#8B6F47" />
      {/* Ear tufts */}
      <polygon points="48,35 42,10 56,30" fill="#6B5535" />
      <polygon points="92,35 98,10 84,30" fill="#6B5535" />
      {/* Facial disc */}
      <circle cx="58" cy="52" r="14" fill="#D4C4A0" />
      <circle cx="82" cy="52" r="14" fill="#D4C4A0" />
      {/* Eyes — large and wise */}
      <circle cx="58" cy="52" r="9" fill="#F5A623" />
      <circle cx="82" cy="52" r="9" fill="#F5A623" />
      <circle cx="58" cy="52" r="5" fill="#1a1a1a" />
      <circle cx="82" cy="52" r="5" fill="#1a1a1a" />
      <circle cx="60" cy="50" r="2" fill="white" />
      <circle cx="84" cy="50" r="2" fill="white" />
      {/* Beak */}
      <polygon points="70,58 66,66 74,66" fill="#D4883A" />
      {/* Glasses — wise look */}
      <circle cx="58" cy="52" r="13" stroke="#5C4033" strokeWidth="2" fill="none" />
      <circle cx="82" cy="52" r="13" stroke="#5C4033" strokeWidth="2" fill="none" />
      <line x1="71" y1="52" x2="69" y2="52" stroke="#5C4033" strokeWidth="2" />
      {/* Wings */}
      <ellipse cx="38" cy="105" rx="12" ry="30" fill="#6B5535" />
      <ellipse cx="102" cy="105" rx="12" ry="30" fill="#6B5535" />
      {/* Feet */}
      <path d="M58,152 L50,165 M58,152 L58,165 M58,152 L66,165" stroke="#D4883A" strokeWidth="2.5" fill="none" />
      <path d="M82,152 L74,165 M82,152 L82,165 M82,152 L90,165" stroke="#D4883A" strokeWidth="2.5" fill="none" />
      {/* Scroll in wing */}
      <rect x="96" y="88" width="22" height="32" rx="4" fill="#FFF8E7" stroke="#D4883A" strokeWidth="1.5" />
      <line x1="101" y1="96" x2="113" y2="96" stroke="#C4A46A" strokeWidth="1" />
      <line x1="101" y1="101" x2="113" y2="101" stroke="#C4A46A" strokeWidth="1" />
      <line x1="101" y1="106" x2="110" y2="106" stroke="#C4A46A" strokeWidth="1" />
    </svg>
  );
}

/* ─── AMERICAN FLAG ─── */
function FlagSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Stripes */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
        <rect key={i} x="0" y={i * 3.077} width="60" height="3.077" fill={i % 2 === 0 ? "#B22234" : "white"} />
      ))}
      {/* Blue canton */}
      <rect x="0" y="0" width="24" height="21.54" fill="#3C3B6E" />
      {/* Simplified stars */}
      {[0, 1, 2, 3, 4].map((row) =>
        [0, 1, 2, 3, 4, 5].map((col) => (
          <circle key={`${row}-${col}`} cx={2 + col * 4} cy={2 + row * 4.3} r="0.9" fill="white" />
        ))
      )}
    </svg>
  );
}
/* ─── RULE CARD ─── */
function RuleCard({ rule, index, visible }: { rule: RuleItem; index: number; visible: boolean }) {
  return (
    <div
      className={`rounded-3xl border-2 border-amber-200 bg-white p-6 shadow-lg transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-700">
          {index + 1}
        </div>
        <h3 className="text-xl font-bold text-slate-900">{rule.title}</h3>
      </div>
      <p className="mb-2 font-semibold text-slate-700">{rule.summary}</p>
      <p className="text-sm leading-7 text-slate-500">{rule.detail}</p>
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function ParkRulesPage() {
  const [scene, setScene] = useState(0);
  const [eagleX, setEagleX] = useState(110);
  const [rulesVisible, setRulesVisible] = useState(false);

  useEffect(() => {
    // Scene 0 → Eagle flies in
    const t1 = setTimeout(() => setEagleX(0), 300);
    // Scene 1 → Raccoons appear
    const t2 = setTimeout(() => setScene(1), 2200);
    // Scene 2 → Owl appears
    const t3 = setTimeout(() => setScene(2), 4000);
    // Scene 3 → Rules reveal
    const t4 = setTimeout(() => {
      setScene(3);
      setRulesVisible(true);
    }, 5800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-900 via-sky-800 to-emerald-900 text-white">

      {/* ── HERO STAGE ── */}
      <section className="relative overflow-hidden px-6 pb-0 pt-16">

        {/* Florida sky background */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-600 to-emerald-800 opacity-40" />

        {/* Sun */}
        <div className="absolute right-16 top-10 h-20 w-20 rounded-full bg-yellow-300 shadow-[0_0_60px_20px_rgba(253,224,71,0.5)]" />

        {/* Clouds */}
        <div className="absolute left-10 top-8 flex gap-2 opacity-80">
          <div className="h-8 w-20 rounded-full bg-white blur-sm" />
          <div className="h-6 w-14 rounded-full bg-white blur-sm" />
        </div>
        <div className="absolute right-40 top-16 flex gap-2 opacity-60">
          <div className="h-6 w-16 rounded-full bg-white blur-sm" />
          <div className="h-8 w-10 rounded-full bg-white blur-sm" />
        </div>

        <div className="relative mx-auto max-w-5xl">

          {/* Title */}
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-amber-300">
              National Travel Key
            </p>
            <h1 className="text-4xl font-black tracking-tight drop-shadow-lg sm:text-6xl">
              Florida Park Rules
            </h1>
            <p className="mt-3 text-lg text-sky-100">
              Our team is here to make sure everyone has a great time.
            </p>
          </div>

          {/* ── ANIMATION STAGE ── */}
          <div className="relative mx-auto h-72 max-w-3xl overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-b from-sky-300/30 to-emerald-900/60 shadow-2xl backdrop-blur sm:h-80">

            {/* Ground */}
            <div className="absolute bottom-0 left-0 right-0 h-16 rounded-b-3xl bg-gradient-to-t from-emerald-800 to-emerald-600" />
            {/* Grass tufts */}
            <div className="absolute bottom-14 left-8 h-4 w-2 rounded-t-full bg-emerald-500" />
            <div className="absolute bottom-14 left-14 h-6 w-2 rounded-t-full bg-emerald-400" />
            <div className="absolute bottom-14 right-10 h-5 w-2 rounded-t-full bg-emerald-500" />
            <div className="absolute bottom-14 right-20 h-3 w-2 rounded-t-full bg-emerald-400" />

            {/* ── EAGLE flying in with flag ── */}
            <div
              className="absolute top-10 flex items-center gap-3 transition-all duration-[1800ms] ease-out"
              style={{ right: `${eagleX}%` }}
            >
              <EagleSVG className="w-28 drop-shadow-xl sm:w-36" />
              <FlagSVG className="h-10 w-16 drop-shadow-lg sm:h-14 sm:w-20" />
            </div>

            {/* ── RACCOON GUARDS ── */}
            <div
              className={`absolute bottom-14 left-6 transition-all duration-700 ${
                scene >= 1 ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <RaccoonSVG />
              {scene >= 1 && (
                <div className="mt-1 rounded-2xl bg-slate-900/80 px-3 py-1 text-center text-xs font-bold text-amber-300 backdrop-blur">
                  "Copy that, Eagle."
                </div>
              )}
            </div>

            <div
              className={`absolute bottom-14 right-6 transition-all duration-700 ${
                scene >= 1 ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <RaccoonSVG flip />
              {scene >= 1 && (
                <div className="mt-1 rounded-2xl bg-slate-900/80 px-3 py-1 text-center text-xs font-bold text-amber-300 backdrop-blur">
                  "Rules incoming."
                </div>
              )}
            </div>

            {/* ── OWL CENTER ── */}
            <div
              className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-700 ${
                scene >= 2 ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <OwlSVG />
              {scene >= 2 && (
                <div className="mt-1 rounded-2xl bg-amber-500/90 px-3 py-1 text-center text-xs font-bold text-slate-900 backdrop-blur">
                  "Unrolling the rules..."
                </div>
              )}
            </div>

            {/* Scene progress dots */}
            <div className="absolute right-4 top-4 flex gap-1.5">
              {[0, 1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-2 w-2 rounded-full transition-all duration-500 ${
                    scene >= s ? "bg-amber-400 scale-125" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Scene caption */}
          <div className="mt-4 text-center text-sm font-semibold text-sky-200">
            {scene === 0 && "🦅 The Eagle approaches from the north..."}
            {scene === 1 && "🦝 Raccoon guards report for duty..."}
            {scene === 2 && "🦉 The wise owl prepares the scroll..."}
            {scene === 3 && "✅ Rules delivered. Read carefully."}
          </div>
        </div>
      </section>

      {/* ── RULES SECTION ── */}
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            The Official Rules
          </h2>
          <p className="mt-3 text-sky-200">
            Delivered by Eagle. Verified by Owl. Enforced by the Raccoon Guard.
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

        <div className="mt-12 rounded-3xl border border-amber-400/30 bg-amber-500/10 p-6 text-center backdrop-blur">
          <p className="text-lg font-bold text-amber-300">
            Questions? Our team is always nearby.
          </p>
          <p className="mt-2 text-sm text-sky-200">
            Unlike some county websites, we're mobile-friendly and easy to reach.
          </p>
        </div>
      </section>
    </main>
  );
}
