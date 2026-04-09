"use client";

const STEP_LABELS = [
  "Personal",
  "Contact",
  "Lodging",
  "Camping & RV",
  "Payment",
  "Dietary",
  "Membership",
  "Privacy",
];

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const pct = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <div className="w-full mb-10">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[#c9a227] text-xs font-bold uppercase tracking-[0.2em]">
          Step {currentStep + 1} of {totalSteps}
        </p>
        <p className="text-gray-400 text-xs font-semibold">{pct}% complete</p>
      </div>

      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#c9a227] to-[#d8b13a] transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="hidden md:flex items-center justify-between mt-4">
        {STEP_LABELS.map((label, i) => (
          <button
            key={label}
            type="button"
            className="flex flex-col items-center gap-2 group"
            disabled
          >
            <div
              className={`h-3 w-3 rounded-full border-2 transition-all duration-300 ${
                i < currentStep
                  ? "bg-[#c9a227] border-[#c9a227]"
                  : i === currentStep
                  ? "bg-[#c9a227] border-[#c9a227] ring-4 ring-[#c9a227]/20"
                  : "bg-transparent border-white/20"
              }`}
            />
            <span
              className={`text-[10px] font-semibold transition-colors ${
                i <= currentStep ? "text-[#c9a227]" : "text-gray-600"
              }`}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
