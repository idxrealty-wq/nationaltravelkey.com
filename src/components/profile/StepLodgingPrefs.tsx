"use client";

interface StepLodgingPrefsProps {
  data: {
    bedType: string;
    adultsCount: string;
    childrenCount: string;
    infantsCount: string;
    petType: string;
    petSize: string;
    petCount: string;
    accessibilityNeeds: string[];
    smokingPref: string;
    floorPref: string;
    roomLocation: string;
  };
  onChange: (field: string, value: string | string[]) => void;
}

const ACCESSIBILITY_OPTIONS = [
  "Wheelchair accessible",
  "Mobility assistance",
  "Hearing impaired",
  "Visual impaired",
  "Service animal",
  "Ground floor required",
];

export default function StepLodgingPrefs({ data, onChange }: StepLodgingPrefsProps) {
  const toggleAccessibility = (option: string) => {
    const current = data.accessibilityNeeds || [];
    if (current.includes(option)) {
      onChange("accessibilityNeeds", current.filter((o) => o !== option));
    } else {
      onChange("accessibilityNeeds", [...current, option]);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
          Lodging Preferences
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          Tell parks what you need before you arrive. No more repeating yourself at every front desk.
        </p>
      </div>

      <div className="space-y-6">
        {/* Bed Type */}
        <div>
          <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
            Bed Type Preference
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["King", "Queen", "Double", "Twin"].map((bed) => (
              <button
                key={bed}
                type="button"
                onClick={() => onChange("bedType", bed.toLowerCase())}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  data.bedType === bed.toLowerCase()
                    ? "border-[#c9a227] bg-[#c9a227]/10 text-[#c9a227]"
                    : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
                }`}
              >
                {bed}
              </button>
            ))}
          </div>
        </div>

        {/* Occupancy */}
        <div>
          <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-3">
            Occupancy
          </label>
          <div className="grid grid-cols-3 gap-4">
            {[
              { field: "adultsCount", label: "Adults", icon: "🧑" },
              { field: "childrenCount", label: "Children", icon: "👦" },
              { field: "infantsCount", label: "Infants", icon: "👶" },
            ].map((occ) => (
              <div key={occ.field} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="text-xl mb-1">{occ.icon}</p>
                <p className="text-gray-400 text-xs mb-2">{occ.label}</p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const val = Math.max(0, parseInt(data[occ.field as keyof typeof data] as string || "0") - 1);
                      onChange(occ.field, val.toString());
                    }}
                    className="h-8 w-8 rounded-lg border border-white/10 bg-white/5 text-white text-sm font-bold hover:border-[#c9a227] transition"
                  >
                    −
                  </button>
                  <span className="text-white font-black text-lg w-6 text-center">
                    {data[occ.field as keyof typeof data] || "0"}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const val = parseInt(data[occ.field as keyof typeof data] as string || "0") + 1;
                      onChange(occ.field, val.toString());
                    }}
                    className="h-8 w-8 rounded-lg border border-white/10 bg-white/5 text-white text-sm font-bold hover:border-[#c9a227] transition"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider — Pets */}
        <div className="border-t border-white/5 pt-6">
          <p className="text-[#c9a227] text-xs font-bold uppercase tracking-[0.2em] mb-5">
            Pet Information
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
              Pet Type
            </label>
            <select
              value={data.petType}
              onChange={(e) => onChange("petType", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition appearance-none"
            >
              <option value="" className="bg-[#08152b]">No pets</option>
              <option value="dog" className="bg-[#08152b]">Dog</option>
              <option value="cat" className="bg-[#08152b]">Cat</option>
              <option value="other" className="bg-[#08152b]">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
              Pet Size
            </label>
            <select
              value={data.petSize}
              onChange={(e) => onChange("petSize", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition appearance-none"
            >
              <option value="" className="bg-[#08152b]">Select size</option>
              <option value="small" className="bg-[#08152b]">Small (under 25 lbs)</option>
              <option value="medium" className="bg-[#08152b]">Medium (25–50 lbs)</option>
              <option value="large" className="bg-[#08152b]">Large (50+ lbs)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
              Number of Pets
            </label>
            <select
              value={data.petCount}
              onChange={(e) => onChange("petCount", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition appearance-none"
            >
              <option value="" className="bg-[#08152b]">0</option>
              <option value="1" className="bg-[#08152b]">1</option>
              <option value="2" className="bg-[#08152b]">2</option>
              <option value="3" className="bg-[#08152b]">3+</option>
            </select>
          </div>
        </div>

        {/* Smoking */}
        <div>
          <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
            Smoking Preference
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "non-smoking", label: "🚭 Non-Smoking" },
              { value: "smoking", label: "🚬 Smoking" },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange("smokingPref", opt.value)}
                className={`rounded-xl border px-4 py-3.5 text-sm font-semibold transition ${
                  data.smokingPref === opt.value
                    ? "border-[#c9a227] bg-[#c9a227]/10 text-[#c9a227]"
                    : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Floor & Room Location */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
              Floor Preference
            </label>
            <select
              value={data.floorPref}
              onChange={(e) => onChange("floorPref", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition appearance-none"
            >
              <option value="" className="bg-[#08152b]">No preference</option>
              <option value="ground" className="bg-[#08152b]">Ground floor</option>
              <option value="low" className="bg-[#08152b]">Low floor</option>
              <option value="high" className="bg-[#08152b]">High floor</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
              Room Location
            </label>
            <select
              value={data.roomLocation}
              onChange={(e) => onChange("roomLocation", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition appearance-none"
            >
              <option value="" className="bg-[#08152b]">No preference</option>
              <option value="quiet" className="bg-[#08152b]">Quiet area</option>
              <option value="elevator" className="bg-[#08152b]">Near elevator</option>
              <option value="pool" className="bg-[#08152b]">Near pool / amenities</option>
            </select>
          </div>
        </div>

        {/* Accessibility */}
        <div>
          <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-3">
            Accessibility Needs <span className="text-gray-600 text-[10px] normal-case tracking-normal">(select all that apply)</span>
          </label>
          <div className="grid sm:grid-cols-2 gap-3">
            {ACCESSIBILITY_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => toggleAccessibility(opt)}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold text-left transition ${
                  (data.accessibilityNeeds || []).includes(opt)
                    ? "border-[#c9a227] bg-[#c9a227]/10 text-[#c9a227]"
                    : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
                }`}
              >
                {(data.accessibilityNeeds || []).includes(opt) ? "✓ " : ""}{opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
