"use client";

interface StepPrivacyProps {
  data: {
    publicProfile: string;
    supplierVisibility: string[];
    photoVisibility: string;
    identityVerification: string;
    dataSharingConsent: string;
  };
  onChange: (field: string, value: string | string[]) => void;
}

const SUPPLIER_FIELDS = [
  { value: "name", label: "Full Name", locked: true },
  { value: "contact", label: "Phone & Email", locked: true },
  { value: "occupancy", label: "Occupancy (adults, children)" },
  { value: "bed-pref", label: "Bed Type Preference" },
  { value: "rv-details", label: "RV Type & Length" },
  { value: "hookup", label: "Hookup Requirements" },
  { value: "pet-info", label: "Pet Information" },
  { value: "accessibility", label: "Accessibility Needs" },
  { value: "dietary", label: "Dietary Restrictions" },
  { value: "payment", label: "Payment Preference" },
  { value: "loyalty", label: "Loyalty Program Names" },
  { value: "emergency", label: "Emergency Contact" },
];

export default function StepPrivacy({ data, onChange }: StepPrivacyProps) {
  const toggleSupplierField = (field: string) => {
    const current = data.supplierVisibility || [
      "name", "contact", "occupancy", "bed-pref", "rv-details",
      "hookup", "pet-info", "accessibility", "payment",
    ];
    if (current.includes(field)) {
      onChange("supplierVisibility", current.filter((f) => f !== field));
    } else {
      onChange("supplierVisibility", [...current, field]);
    }
  };

  const supplierVis = data.supplierVisibility || [
    "name", "contact", "occupancy", "bed-pref", "rv-details",
    "hookup", "pet-info", "accessibility", "payment",
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
          Privacy & Visibility
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          You control exactly what parks and other members see. Nothing is shared without your permission.
        </p>
      </div>

      <div className="space-y-6">
        {/* Public Profile */}
        <div>
          <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
            Public Profile Visibility
          </label>
          <p className="text-gray-500 text-xs mb-3">
            Controls what other National Travel Key members can see about you.
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { value: "full", label: "🌐 Full Profile", desc: "Name, tier, and preferences visible" },
              { value: "limited", label: "👤 Name & Tier Only", desc: "Basic info only" },
              { value: "hidden", label: "🔒 Hidden", desc: "Not visible to other members" },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange("publicProfile", opt.value)}
                className={`rounded-xl border p-4 text-left transition ${
                  data.publicProfile === opt.value
                    ? "border-[#c9a227] bg-[#c9a227]/10 text-[#c9a227]"
                    : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
                }`}
              >
                <p className="text-sm font-bold mb-1">{opt.label}</p>
                <p className="text-xs opacity-70">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Divider — Supplier Data */}
        <div className="border-t border-white/5 pt-6">
          <p className="text-[#c9a227] text-xs font-bold uppercase tracking-[0.2em] mb-2">
            Supplier-Facing Data
          </p>
          <p className="text-gray-500 text-xs mb-5">
            Choose which fields parks receive when you check in. Name and contact are always shared for verification.
          </p>
        </div>

        {/* Supplier field toggles */}
        <div className="grid sm:grid-cols-2 gap-3">
          {SUPPLIER_FIELDS.map((field) => {
            const isActive = supplierVis.includes(field.value);
            const isLocked = "locked" in field && field.locked;

            return (
              <button
                key={field.value}
                type="button"
                onClick={() => {
                  if (!isLocked) toggleSupplierField(field.value);
                }}
                disabled={isLocked}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold text-left transition flex items-center justify-between ${
                  isLocked
                    ? "border-white/5 bg-white/[0.02] text-gray-500 cursor-not-allowed"
                    : isActive
                    ? "border-[#c9a227] bg-[#c9a227]/10 text-[#c9a227]"
                    : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
                }`}
              >
                <span>{isActive && !isLocked ? "✓ " : ""}{field.label}</span>
                {isLocked && (
                  <span className="text-[10px] bg-white/10 rounded-full px-2 py-0.5 text-gray-500">
                    Required
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Divider — Face Photo */}
        <div className="border-t border-white/5 pt-6">
          <p className="text-[#c9a227] text-xs font-bold uppercase tracking-[0.2em] mb-5">
            Face Photo Visibility
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { value: "all", label: "👁️ Everyone", desc: "Members & suppliers" },
            { value: "suppliers", label: "🏕️ Suppliers Only", desc: "Parks at check-in" },
            { value: "members", label: "👥 Members Only", desc: "Other travelers" },
            { value: "none", label: "🚫 Nobody", desc: "Photo stays private" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange("photoVisibility", opt.value)}
              className={`rounded-xl border p-4 text-center transition ${
                data.photoVisibility === opt.value
                  ? "border-[#c9a227] bg-[#c9a227]/10 text-[#c9a227]"
                  : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
              }`}
            >
              <p className="text-sm font-bold mb-1">{opt.label}</p>
              <p className="text-[10px] opacity-70">{opt.desc}</p>
            </button>
          ))}
        </div>

        {/* Divider — Identity Verification */}
        <div className="border-t border-white/5 pt-6">
          <p className="text-[#c9a227] text-xs font-bold uppercase tracking-[0.2em] mb-5">
            Identity Verification
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {[
            {
              value: "pin-only",
              label: "🔢 PIN Only",
              desc: "One-time PIN sent to your phone at check-in",
            },
            {
              value: "pin-photo",
              label: "🔢 + 📷 PIN + Photo",
              desc: "PIN verification plus face photo match for maximum security",
            },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange("identityVerification", opt.value)}
              className={`rounded-xl border p-4 text-left transition ${
                data.identityVerification === opt.value
                  ? "border-[#c9a227] bg-[#c9a227]/10 text-[#c9a227]"
                  : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
              }`}
            >
              <p className="text-sm font-bold mb-1">{opt.label}</p>
              <p className="text-xs opacity-70">{opt.desc}</p>
            </button>
          ))}
        </div>

        {/* Data Sharing Consent */}
        <div>
          <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
            Data Sharing Consent <span className="text-red-400">*</span>
          </label>
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              By enabling data sharing, you authorize National Travel Key to transmit your selected profile fields to participating parks and properties during the check-in process. You can modify or revoke this consent at any time.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "granted", label: "✅ I Consent" },
                { value: "denied", label: "🚫 Do Not Share" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onChange("dataSharingConsent", opt.value)}
                  className={`rounded-xl border px-4 py-3.5 text-sm font-bold transition ${
                    data.dataSharingConsent === opt.value
                      ? opt.value === "granted"
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                        : "border-red-500 bg-red-500/10 text-red-400"
                      : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Security info box */}
        <div className="rounded-xl border border-emerald-700/30 bg-emerald-950/30 p-4">
          <p className="text-emerald-300 text-xs font-bold uppercase tracking-wide mb-1">🛡️ Your Data, Your Rules</p>
          <p className="text-gray-300 text-sm leading-relaxed">
            Every check-in sends a one-time PIN to your phone. No one can access your profile without it. Lost your card? Block it instantly from your account. Every access is logged with a timestamp, location, and supplier name.
          </p>
        </div>
      </div>
    </div>
  );
}
