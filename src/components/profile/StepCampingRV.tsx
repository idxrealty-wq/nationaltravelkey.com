"use client";

interface StepCampingRVProps {
  data: {
    rvType: string;
    rvLength: string;
    hookupReq: string;
    tentPref: string;
    waterfrontPref: string;
    shadePref: string;
    petFriendlyReq: string;
    campAccessibility: string[];
  };
  onChange: (field: string, value: string | string[]) => void;
}

const RV_TYPES = [
  { value: "class-a", label: "Class A", icon: "🚌" },
  { value: "class-c", label: "Class C", icon: "🚐" },
  { value: "travel-trailer", label: "Travel Trailer", icon: "🏕️" },
  { value: "fifth-wheel", label: "Fifth Wheel", icon: "🔗" },
  { value: "popup", label: "Pop-Up Camper", icon: "⛺" },
  { value: "van", label: "Camper Van", icon: "🚎" },
  { value: "tent", label: "Tent Only", icon: "🏕️" },
  { value: "none", label: "No RV", icon: "❌" },
];

const CAMP_ACCESSIBILITY = [
  "Paved pad required",
  "Level site required",
  "Wide site for mobility",
  "Close to restrooms",
  "Close to water spigot",
  "ADA compliant site",
];

export default function StepCampingRV({ data, onChange }: StepCampingRVProps) {
  const toggleCampAccess = (option: string) => {
    const current = data.campAccessibility || [];
    if (current.includes(option)) {
      onChange("campAccessibility", current.filter((o) => o !== option));
    } else {
      onChange("campAccessibility", [...current, option]);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
          Camping & RV Details
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          Parks need to know what you are bringing. Fill this once — every campground in the network gets it automatically.
        </p>
      </div>

      <div className="space-y-6">
        {/* RV Type grid */}
        <div>
          <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-3">
            RV / Camping Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {RV_TYPES.map((rv) => (
              <button
                key={rv.value}
                type="button"
                onClick={() => onChange("rvType", rv.value)}
                className={`rounded-xl border px-3 py-4 text-center transition ${
                  data.rvType === rv.value
                    ? "border-[#c9a227] bg-[#c9a227]/10 text-[#c9a227]"
                    : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
                }`}
              >
                <span className="text-2xl block mb-1">{rv.icon}</span>
                <span className="text-xs font-semibold">{rv.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* RV Length & Hookup */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
              RV Length (feet)
            </label>
            <input
              type="number"
              value={data.rvLength}
              onChange={(e) => onChange("rvLength", e.target.value)}
              placeholder="e.g. 32"
              min="0"
              max="60"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition"
            />
            <p className="text-gray-600 text-xs mt-1">Leave blank if tent only</p>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
              Hookup Requirements
            </label>
            <select
              value={data.hookupReq}
              onChange={(e) => onChange("hookupReq", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition appearance-none"
            >
              <option value="" className="bg-[#08152b]">Select hookup type</option>
              <option value="full" className="bg-[#08152b]">Full hookup (water, electric, sewer)</option>
              <option value="water-electric" className="bg-[#08152b]">Water & electric only</option>
              <option value="electric" className="bg-[#08152b]">Electric only</option>
              <option value="none" className="bg-[#08152b]">No hookups (dry camping)</option>
            </select>
          </div>
        </div>

        {/* Tent preference */}
        <div>
          <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
            Tent Camping Preference
          </label>
          <select
            value={data.tentPref}
            onChange={(e) => onChange("tentPref", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition appearance-none"
          >
            <option value="" className="bg-[#08152b]">Not applicable</option>
            <option value="established" className="bg-[#08152b]">Established tent site (pad, table, fire ring)</option>
            <option value="primitive" className="bg-[#08152b]">Primitive / backcountry</option>
            <option value="either" className="bg-[#08152b]">Either is fine</option>
          </select>
        </div>

        {/* Divider — Site Preferences */}
        <div className="border-t border-white/5 pt-6">
          <p className="text-[#c9a227] text-xs font-bold uppercase tracking-[0.2em] mb-5">
            Site Preferences
          </p>
        </div>

        {/* Waterfront, Shade, Pet-Friendly */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              field: "waterfrontPref",
              label: "Waterfront",
              icon: "🌊",
              options: [
                { value: "", label: "No preference" },
                { value: "required", label: "Required" },
                { value: "preferred", label: "Preferred" },
                { value: "not-needed", label: "Not needed" },
              ],
            },
            {
              field: "shadePref",
              label: "Shade",
              icon: "🌳",
              options: [
                { value: "", label: "No preference" },
                { value: "full-shade", label: "Full shade" },
                { value: "partial", label: "Partial shade" },
                { value: "open", label: "Open / sunny" },
              ],
            },
            {
              field: "petFriendlyReq",
              label: "Pet-Friendly Site",
              icon: "🐾",
              options: [
                { value: "", label: "No preference" },
                { value: "required", label: "Required" },
                { value: "preferred", label: "Preferred" },
                { value: "not-needed", label: "Not needed" },
              ],
            },
          ].map((pref) => (
            <div key={pref.field} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xl text-center mb-2">{pref.icon}</p>
              <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2 text-center">
                {pref.label}
              </label>
              <select
                value={data[pref.field as keyof typeof data] as string}
                onChange={(e) => onChange(pref.field, e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-[#08152b] px-3 py-2.5 text-white text-xs focus:outline-none focus:border-[#c9a227] transition appearance-none text-center"
              >
                {pref.options.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[#08152b]">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Camp Accessibility */}
        <div>
          <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-3">
            Campsite Accessibility <span className="text-gray-600 text-[10px] normal-case tracking-normal">(select all that apply)</span>
          </label>
          <div className="grid sm:grid-cols-2 gap-3">
            {CAMP_ACCESSIBILITY.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => toggleCampAccess(opt)}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold text-left transition ${
                  (data.campAccessibility || []).includes(opt)
                    ? "border-[#c9a227] bg-[#c9a227]/10 text-[#c9a227]"
                    : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
                }`}
              >
                {(data.campAccessibility || []).includes(opt) ? "✓ " : ""}{opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
