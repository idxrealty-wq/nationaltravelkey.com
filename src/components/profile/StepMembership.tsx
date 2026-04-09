"use client";

interface StepMembershipProps {
  data: {
    membershipTier: string;
    loyaltyPrograms: string[];
    customLoyalty: string;
    commPref: string;
    marketingOptIn: string;
  };
  onChange: (field: string, value: string | string[]) => void;
}

const TIERS = [
  {
    value: "standard",
    label: "Standard",
    icon: "🔑",
    desc: "Digital profile, QR check-in, park search",
    color: "border-gray-500 bg-gray-500/10 text-gray-300",
    activeColor: "border-gray-400 bg-gray-400/15 text-white ring-4 ring-gray-400/20",
  },
  {
    value: "premium",
    label: "Premium",
    icon: "⭐",
    desc: "Everything in Standard + PVC card, priority support",
    color: "border-[#c9a227]/40 bg-[#c9a227]/5 text-[#c9a227]/70",
    activeColor: "border-[#c9a227] bg-[#c9a227]/15 text-[#c9a227] ring-4 ring-[#c9a227]/20",
  },
  {
    value: "founder",
    label: "Founder",
    icon: "👑",
    desc: "Everything in Premium + metal card, lifetime perks, early access",
    color: "border-amber-500/40 bg-amber-500/5 text-amber-400/70",
    activeColor: "border-amber-400 bg-amber-400/15 text-amber-300 ring-4 ring-amber-400/20",
  },
];

const LOYALTY_PROGRAMS = [
  "Good Sam Club",
  "Passport America",
  "Harvest Hosts",
  "Thousand Trails",
  "KOA Rewards",
  "FMCA",
  "Escapees RV Club",
  "Boondockers Welcome",
  "AAA / CAA",
  "Hilton Honors",
  "Marriott Bonvoy",
  "IHG Rewards",
];

export default function StepMembership({ data, onChange }: StepMembershipProps) {
  const toggleLoyalty = (program: string) => {
    const current = data.loyaltyPrograms || [];
    if (current.includes(program)) {
      onChange("loyaltyPrograms", current.filter((p) => p !== program));
    } else {
      onChange("loyaltyPrograms", [...current, program]);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
          Membership & Account
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          Your Travel Key tier and loyalty memberships. Parks in the network can honor your existing rewards.
        </p>
      </div>

      <div className="space-y-6">
        {/* Membership Tier */}
        <div>
          <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-3">
            Membership Tier
          </label>
          <div className="grid sm:grid-cols-3 gap-4">
            {TIERS.map((tier) => (
              <button
                key={tier.value}
                type="button"
                onClick={() => onChange("membershipTier", tier.value)}
                className={`rounded-2xl border p-5 text-left transition-all duration-300 ${
                  data.membershipTier === tier.value ? tier.activeColor : tier.color
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{tier.icon}</span>
                  <span className="font-black text-lg">{tier.label}</span>
                </div>
                <p className="text-xs leading-relaxed opacity-80">{tier.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Divider — Loyalty */}
        <div className="border-t border-white/5 pt-6">
          <p className="text-[#c9a227] text-xs font-bold uppercase tracking-[0.2em] mb-2">
            Loyalty Programs
          </p>
          <p className="text-gray-500 text-xs mb-5">
            Select programs you belong to. Parks can apply your discounts automatically.
          </p>
        </div>

        {/* Loyalty grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {LOYALTY_PROGRAMS.map((prog) => (
            <button
              key={prog}
              type="button"
              onClick={() => toggleLoyalty(prog)}
              className={`rounded-xl border px-4 py-3 text-sm font-semibold text-left transition ${
                (data.loyaltyPrograms || []).includes(prog)
                  ? "border-[#c9a227] bg-[#c9a227]/10 text-[#c9a227]"
                  : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
              }`}
            >
              {(data.loyaltyPrograms || []).includes(prog) ? "✓ " : ""}{prog}
            </button>
          ))}
        </div>

        {/* Custom loyalty */}
        <div>
          <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
            Other Loyalty Programs <span className="text-gray-600 text-[10px] normal-case tracking-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={data.customLoyalty}
            onChange={(e) => onChange("customLoyalty", e.target.value)}
            placeholder="Enter any other memberships or loyalty numbers"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition"
          />
        </div>

        {/* Divider — Communication */}
        <div className="border-t border-white/5 pt-6">
          <p className="text-[#c9a227] text-xs font-bold uppercase tracking-[0.2em] mb-5">
            Communication Preferences
          </p>
        </div>

        {/* Preferred communication */}
        <div>
          <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
            Preferred Communication
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "email", label: "📧 Email" },
              { value: "sms", label: "💬 SMS" },
              { value: "phone", label: "📞 Phone" },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange("commPref", opt.value)}
                className={`rounded-xl border px-4 py-3.5 text-sm font-semibold transition ${
                  data.commPref === opt.value
                    ? "border-[#c9a227] bg-[#c9a227]/10 text-[#c9a227]"
                    : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Marketing opt-in */}
        <div>
          <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
            Marketing Communications
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "opt-in", label: "✅ Yes, send me deals & updates" },
              { value: "opt-out", label: "🚫 No marketing emails" },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange("marketingOptIn", opt.value)}
                className={`rounded-xl border px-4 py-3.5 text-sm font-semibold transition text-left ${
                  data.marketingOptIn === opt.value
                    ? "border-[#c9a227] bg-[#c9a227]/10 text-[#c9a227]"
                    : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Info box */}
        <div className="rounded-xl border border-[#c9a227]/20 bg-[#c9a227]/5 p-4">
          <p className="text-[#c9a227] text-xs font-bold uppercase tracking-wide mb-1">🎁 Loyalty Perks</p>
          <p className="text-gray-300 text-sm leading-relaxed">
            Participating parks in the National Travel Key network can see your loyalty memberships and apply relevant discounts at check-in. Your membership numbers are never shared — only the program name.
          </p>
        </div>
      </div>
    </div>
  );
}
