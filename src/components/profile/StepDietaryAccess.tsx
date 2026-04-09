"use client";

interface StepDietaryAccessProps {
  data: {
    dietaryRestrictions: string[];
    customDietary: string;
    mobilityNeeds: string;
    serviceAnimalType: string;
    serviceAnimalTask: string;
    languagePref: string;
    additionalAccommodations: string;
  };
  onChange: (field: string, value: string | string[]) => void;
}

const DIETARY_OPTIONS = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Dairy-Free",
  "Nut Allergy",
  "Shellfish Allergy",
  "Kosher",
  "Halal",
  "Diabetic-Friendly",
  "Low Sodium",
];

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "pt", label: "Portuguese" },
  { value: "zh", label: "Chinese" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
  { value: "other", label: "Other" },
];

export default function StepDietaryAccess({ data, onChange }: StepDietaryAccessProps) {
  const toggleDietary = (option: string) => {
    const current = data.dietaryRestrictions || [];
    if (current.includes(option)) {
      onChange("dietaryRestrictions", current.filter((o) => o !== option));
    } else {
      onChange("dietaryRestrictions", [...current, option]);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
          Dietary & Accessibility
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          Parks with food service and special accommodations need this. Shared only with properties that offer relevant amenities.
        </p>
      </div>

      <div className="space-y-6">
        {/* Dietary Restrictions */}
        <div>
          <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-3">
            Dietary Restrictions <span className="text-gray-600 text-[10px] normal-case tracking-normal">(select all that apply)</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {DIETARY_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => toggleDietary(opt)}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold text-left transition ${
                  (data.dietaryRestrictions || []).includes(opt)
                    ? "border-[#c9a227] bg-[#c9a227]/10 text-[#c9a227]"
                    : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
                }`}
              >
                {(data.dietaryRestrictions || []).includes(opt) ? "✓ " : ""}{opt}
              </button>
            ))}
          </div>
        </div>

        {/* Custom dietary */}
        <div>
          <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
            Other Dietary Notes <span className="text-gray-600 text-[10px] normal-case tracking-normal">(optional)</span>
          </label>
          <textarea
            value={data.customDietary}
            onChange={(e) => onChange("customDietary", e.target.value)}
            placeholder="Any specific allergies, intolerances, or dietary needs not listed above"
            rows={3}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition resize-none"
          />
        </div>

        {/* Divider — Mobility */}
        <div className="border-t border-white/5 pt-6">
          <p className="text-[#c9a227] text-xs font-bold uppercase tracking-[0.2em] mb-5">
            Mobility & Assistance
          </p>
        </div>

        {/* Mobility needs */}
        <div>
          <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
            Mobility Assistance
          </label>
          <select
            value={data.mobilityNeeds}
            onChange={(e) => onChange("mobilityNeeds", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition appearance-none"
          >
            <option value="" className="bg-[#08152b]">No mobility assistance needed</option>
            <option value="wheelchair" className="bg-[#08152b]">Wheelchair user</option>
            <option value="walker" className="bg-[#08152b]">Walker / cane user</option>
            <option value="limited-mobility" className="bg-[#08152b]">Limited mobility (no device)</option>
            <option value="temporary" className="bg-[#08152b]">Temporary mobility limitation</option>
          </select>
        </div>

        {/* Divider — Service Animal */}
        <div className="border-t border-white/5 pt-6">
          <p className="text-[#c9a227] text-xs font-bold uppercase tracking-[0.2em] mb-5">
            Service Animal
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
              Service Animal Type
            </label>
            <select
              value={data.serviceAnimalType}
              onChange={(e) => onChange("serviceAnimalType", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition appearance-none"
            >
              <option value="" className="bg-[#08152b]">No service animal</option>
              <option value="dog" className="bg-[#08152b]">Service dog</option>
              <option value="miniature-horse" className="bg-[#08152b]">Miniature horse</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
              Task / Function <span className="text-gray-600 text-[10px] normal-case tracking-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={data.serviceAnimalTask}
              onChange={(e) => onChange("serviceAnimalTask", e.target.value)}
              placeholder="e.g. Guide, mobility support, seizure alert"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition"
            />
          </div>
        </div>

        {/* ADA info box */}
        <div className="rounded-xl border border-sky-700/30 bg-sky-950/30 p-4">
          <p className="text-sky-300 text-xs font-bold uppercase tracking-wide mb-1">📋 ADA Compliance</p>
          <p className="text-gray-300 text-sm leading-relaxed">
            Under the ADA, properties may only ask two questions: (1) Is this a service animal required because of a disability? (2) What task has the animal been trained to perform? No documentation or certification is required.
          </p>
        </div>

        {/* Divider — Language */}
        <div className="border-t border-white/5 pt-6">
          <p className="text-[#c9a227] text-xs font-bold uppercase tracking-[0.2em] mb-5">
            Language & Additional
          </p>
        </div>

        {/* Language */}
        <div>
          <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
            Preferred Language
          </label>
          <select
            value={data.languagePref}
            onChange={(e) => onChange("languagePref", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition appearance-none"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.value} value={lang.value} className="bg-[#08152b]">
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        {/* Additional accommodations */}
        <div>
          <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
            Additional Accommodations <span className="text-gray-600 text-[10px] normal-case tracking-normal">(optional)</span>
          </label>
          <textarea
            value={data.additionalAccommodations}
            onChange={(e) => onChange("additionalAccommodations", e.target.value)}
            placeholder="Anything else parks should know to make your stay comfortable"
            rows={3}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition resize-none"
          />
        </div>
      </div>
    </div>
  );
}
