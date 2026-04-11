const steps = [
  { number: '01', title: 'Find fast', description: 'Search participating counties and parks from a mobile-first experience instead of bouncing through scattered county pages.' },
  { number: '02', title: 'Compare openings', description: 'See where inventory is still open, how many parks are participating, and which counties still have room before you waste time driving.' },
  { number: '03', title: 'Register smarter', description: 'Build one reusable Travel Key profile so your core traveler information is ready when it is time to move toward check-in.' },
  { number: '04', title: 'Go prepared', description: 'Arrive with less friction, less repeated paperwork, and a cleaner path from search to stay.' },
] as const;

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#c9a227]">How It Works</p>
          <h2 className="mb-4 text-3xl font-black text-white md:text-5xl">Find. Register. Go.</h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-400">Four steps from searching to staying. No scattered county websites. No repeated paperwork. No guessing.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {steps.map((step) => (
            <div key={step.number} className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <span className="mb-4 inline-block text-4xl font-black text-[#c9a227]">{step.number}</span>
              <h3 className="mb-3 text-xl font-black text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
