"use client";

import { useMemo, useState } from "react";

type RuleItem = {
  title: string;
  summary: string;
  detail: string;
  icon: string;
};

const rules: RuleItem[] = [
  {
    title: "Respect Closures",
    summary: "If an area is closed, it is closed for a reason.",
    detail:
      "Closed areas protect wildlife, restoration work, water quality, and public safety. Please do not cross barriers, ropes, fences, or posted closure lines.",
    icon: "🚫",
  },
  {
    title: "Protect Wildlife",
    summary: "Give animals space and keep the habitat calm.",
    detail:
      "Do not chase, feed, corner, or disturb wildlife. Florida habitats depend on visitors keeping a respectful distance and leaving natural behavior undisturbed.",
    icon: "🦅",
  },
  {
    title: "Pack Out Trash",
    summary: "Leave the area cleaner than you found it.",
    detail:
      "Take all trash, cans, food waste, and personal items with you. Even small litter can damage waterways, harm animals, and ruin the experience for everyone else.",
    icon: "🗑️",
  },
  {
    title: "Use Safe Access Areas",
    summary: "Stay in approved zones and marked paths.",
    detail:
      "Use designated entry points, approved walkways, and posted recreation zones. This helps prevent erosion, habitat damage, and unnecessary risk.",
    icon: "🛟",
  },
  {
    title: "Keep Noise Reasonable",
    summary: "Enjoy the day without overwhelming the area.",
    detail:
      "Keep speakers, shouting, and engine noise at a respectful level. Sound carries across water and natural areas much farther than most people expect.",
    icon: "🔊",
  },
  {
    title: "Follow Local Signs",
    summary: "Posted signs are the final word on-site.",
    detail:
      "Conditions change. Temporary closures, weather restrictions, safety notices, and local enforcement instructions always override assumptions or old habits.",
    icon: "🪧",
  },
];

function EagleScene() {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-amber-300/20 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-8 text-white shadow-2xl">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -left-12 top-10 h-32 w-32 rounded-full bg-amber-300 blur-3xl" />
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-sky-400 blur-3xl" />
      </div>

      <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
            Opening Fly-In
          </p>
          <h2 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            The eagle brings the message in.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            This experience is designed like a theatrical rules reveal, not a boring notice board.
            The tone is memorable, visual, and clean — the kind of page people will actually watch.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
              Florida tone
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
              Story-first
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
              Mobile-ready
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="mx-auto flex aspect-square max-w-md items-center justify-center rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur">
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[24px] bg-gradient-to-br from-sky-500/20 via-transparent to-amber-300/10">
              <div className="absolute left-6 top-8 text-7xl motion-safe:animate-bounce">🦅</div>
              <div className="absolute bottom-8 right-8 text-5xl">🌴</div>
              <div className="absolute left-10 bottom-10 text-4xl">☀️</div>
              <div className="text-center">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-300">Scene 1</p>
                <p className="mt-2 text-2xl font-bold text-white">Florida Fly-In</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RaccoonScene() {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="rounded-[28px] bg-gradient-to-br from-amber-50 to-orange-100 p-8">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="text-5xl">🦝</div>
              <p className="mt-2 text-sm font-semibold text-slate-700">Guard One</p>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="text-5xl">🎧</div>
              <p className="mt-2 text-sm font-semibold text-slate-700">Headset Check</p>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="text-5xl">🦝</div>
              <p className="mt-2 text-sm font-semibold text-slate-700">Guard Two</p>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="text-5xl">✅</div>
              <p className="mt-2 text-sm font-semibold text-slate-700">Checkpoint</p>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-600">
            Character Moment
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            The raccoon guards set the tone.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Instead of dumping rules in a list, the page moves through a staged experience:
            eagle arrival, raccoon checkpoint, owl briefing, then the actual rule cards.
          </p>
          <p className="mt-4 text-base leading-7 text-slate-500">
            That structure gives you something people will remember, screenshot, and share.
          </p>
        </div>
      </div>
    </div>
  );
}

function OwlScene() {
  return (
    <div className="rounded-[32px] border border-indigo-200 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 p-8 text-white shadow-2xl">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-indigo-300">
            Main Reveal
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            The wise old owl unfolds the rules.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            This is where the theatrical setup turns into clarity. The page keeps the charm,
            but the rules themselves stay direct, readable, and professionally presented.
          </p>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="flex items-center justify-center gap-6">
            <span className="text-7xl">🦉</span>
            <div className="rounded-2xl bg-white/10 px-6 py-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-300">Scroll</p>
              <p className="mt-2 text-2xl font-bold">Park Rules</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RuleCard({ rule, index }: { rule: RuleItem; index: number }) {
  return (
    <div className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-3xl">
          {rule.icon}
        </div>
        <span className="text-sm font-semibold text-slate-400">Rule {index + 1}</span>
      </div>
      <h3 className="text-2xl font-bold tracking-tight text-slate-900">{rule.title}</h3>
      <p className="mt-3 text-base font-medium text-slate-700">{rule.summary}</p>
      <p className="mt-4 text-sm leading-7 text-slate-500">{rule.detail}</p>
    </div>
  );
}

export default function ParkRulesPage() {
  const [started, setStarted] = useState(false);

  const buttonLabel = useMemo(() => {
    return started ? "Rules Activated" : "Let's See The Rules";
  }, [started]);

  return (
    <main className="min-h-screen bg-[#f7f3ec] text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-[#10213d] to-[#1a2b4a] px-6 py-24 text-white">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://cdn.sintra.ai/img/UtWPxCE8kTWQxy2rF4CZE9ZNZKZ4fG7T5J0pYQ3kIm0/g:ce/rs:fill:0:0:0/czM6Ly9zaW50cmEtYnJhaW5haS1tZWRpYS9rbm93bGVkZ2UtcHJvZmlsZXMvYTU4Njk0OWItNjE3Yy00ZDU3LTkwMmMtZWY3NTA3Zjc2ODk5L2Fzc2V0cy9kZDk0MTBlNC03ZmU1LTQ3MTUtYjNjNC1iOTc0Mzk0Mjk3YmIvSW1hZ2U.jpg"
            alt="National Travel Key card"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/35" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-amber-300">
                National Travel Key
              </p>
              <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                A rules page people will actually watch.
              </h1>
              <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-300">
                Built with a theatrical Florida feel: eagle fly-in, raccoon checkpoint,
                owl briefing, then a clean professional rules reveal.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={() => setStarted(true)}
                  className="group inline-flex items-center justify-center rounded-2xl bg-amber-400 px-8 py-5 text-lg font-bold text-slate-950 shadow-lg transition hover:bg-amber-300"
                >
                  <span className="mr-3 text-2xl transition group-hover:scale-110">✨</span>
                  {buttonLabel}
                </button>
                <a
                  href="#rules"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-8 py-5 text-lg font-semibold text-white transition hover:bg-white/10"
                >
                  Jump to Rules
                </a>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="rounded-[28px] bg-gradient-to-br from-white/10 to-white/5 p-8">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="rounded-2xl bg-white/10 p-5">
                    <div className="text-5xl">🦅</div>
                    <p className="mt-2 text-sm font-semibold text-slate-200">Eagle</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-5">
                    <div className="text-5xl">🦝</div>
                    <p className="mt-2 text-sm font-semibold text-slate-200">Guards</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-5">
                    <div className="text-5xl">🦉</div>
                    <p className="mt-2 text-sm font-semibold text-slate-200">Owl</p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/30 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Experience Goal</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Memorable enough to be shared. Clear enough to be respected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8">
          <EagleScene />
          <RaccoonScene />
          <OwlScene />
        </div>
      </section>

      <section id="rules" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-amber-600">
            The Rules
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Clear, direct, and professionally presented.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            The page keeps the personality, but the actual guidance stays serious, readable,
            and easy to follow on mobile or desktop.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {rules.map((rule, index) => (
            <RuleCard key={rule.title} rule={rule} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
