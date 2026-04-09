"use client";

interface StepContactEmergencyProps {
  data: {
    primaryPhone: string;
    secondaryPhone: string;
    emergencyName: string;
    emergencyPhone: string;
    emergencyRelationship: string;
    preferredContact: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function StepContactEmergency({ data, onChange }: StepContactEmergencyProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
          Contact & Emergency
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          Who should parks reach — and who should they call if something goes sideways on the trail.
        </p>
      </div>

      <div className="space-y-6">
        {/* Phone numbers */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
              Primary Phone <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              value={data.primaryPhone}
              onChange={(e) => onChange("primaryPhone", e.target.value)}
              placeholder="(555) 555-5555"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
              Secondary Phone <span className="text-gray-600 text-[10px] normal-case tracking-normal">(optional)</span>
            </label>
            <input
              type="tel"
              value={data.secondaryPhone}
              onChange={(e) => onChange("secondaryPhone", e.target.value)}
              placeholder="(555) 555-5555"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-6">
          <p className="text-[#c9a227] text-xs font-bold uppercase tracking-[0.2em] mb-5">
            Emergency Contact
          </p>
        </div>

        {/* Emergency name & relationship */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
              Emergency Contact Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={data.emergencyName}
              onChange={(e) => onChange("emergencyName", e.target.value)}
              placeholder="Full name"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
              Relationship <span className="text-red-400">*</span>
            </label>
            <select
              value={data.emergencyRelationship}
              onChange={(e) => onChange("emergencyRelationship", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition appearance-none"
            >
              <option value="" className="bg-[#08152b]">Select relationship</option>
              <option value="spouse" className="bg-[#08152b]">Spouse / Partner</option>
              <option value="parent" className="bg-[#08152b]">Parent</option>
              <option value="sibling" className="bg-[#08152b]">Sibling</option>
              <option value="child" className="bg-[#08152b]">Adult Child</option>
              <option value="friend" className="bg-[#08152b]">Friend</option>
              <option value="other" className="bg-[#08152b]">Other</option>
            </select>
          </div>
        </div>

        {/* Emergency phone */}
        <div>
          <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
            Emergency Contact Phone <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            value={data.emergencyPhone}
            onChange={(e) => onChange("emergencyPhone", e.target.value)}
            placeholder="(555) 555-5555"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition"
          />
        </div>

        {/* Preferred contact method */}
        <div>
          <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
            Preferred Contact Method <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "phone", label: "📞 Phone" },
              { value: "email", label: "📧 Email" },
              { value: "sms", label: "💬 SMS" },
            ].map((method) => (
              <button
                key={method.value}
                type="button"
                onClick={() => onChange("preferredContact", method.value)}
                className={`rounded-xl border px-4 py-3.5 text-sm font-semibold transition ${
                  data.preferredContact === method.value
                    ? "border-[#c9a227] bg-[#c9a227]/10 text-[#c9a227]"
                    : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
                }`}
              >
                {method.label}
              </button>
            ))}
          </div>
        </div>

        {/* Info box */}
        <div className="rounded-xl border border-[#c9a227]/20 bg-[#c9a227]/5 p-4">
          <p className="text-[#c9a227] text-xs font-bold uppercase tracking-wide mb-1">Why we ask</p>
          <p className="text-gray-300 text-sm leading-relaxed">
            Emergency contacts are shared with park staff only during check-in. They are never visible to other members or used for marketing.
          </p>
        </div>
      </div>
    </div>
  );
}
