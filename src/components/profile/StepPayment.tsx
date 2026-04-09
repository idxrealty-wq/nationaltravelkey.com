"use client";

interface StepPaymentProps {
  data: {
    primaryPayment: string;
    backupPayment: string;
    checkinPayment: string;
    billingStreet: string;
    billingCity: string;
    billingState: string;
    billingZip: string;
  };
  onChange: (field: string, value: string) => void;
}

const PAYMENT_METHODS = [
  { value: "visa", label: "Visa", icon: "💳" },
  { value: "mastercard", label: "Mastercard", icon: "💳" },
  { value: "amex", label: "Amex", icon: "💳" },
  { value: "discover", label: "Discover", icon: "💳" },
  { value: "debit", label: "Debit Card", icon: "🏦" },
  { value: "cash", label: "Cash", icon: "💵" },
  { value: "apple-pay", label: "Apple Pay", icon: "🍎" },
  { value: "google-pay", label: "Google Pay", icon: "📱" },
  { value: "cash-app", label: "Cash App", icon: "💲" },
];

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
];

export default function StepPayment({ data, onChange }: StepPaymentProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
          Payment Methods
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          Parks see your preferred payment method at check-in. No card numbers are stored — only your preference.
        </p>
      </div>

      <div className="space-y-6">
        {/* Primary Payment */}
        <div>
          <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-3">
            Primary Payment Method <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
            {PAYMENT_METHODS.map((pm) => (
              <button
                key={pm.value}
                type="button"
                onClick={() => onChange("primaryPayment", pm.value)}
                className={`rounded-xl border px-3 py-3 text-center transition ${
                  data.primaryPayment === pm.value
                    ? "border-[#c9a227] bg-[#c9a227]/10 text-[#c9a227]"
                    : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
                }`}
              >
                <span className="text-lg block mb-1">{pm.icon}</span>
                <span className="text-xs font-semibold">{pm.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Backup Payment */}
        <div>
          <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
            Backup Payment Method <span className="text-gray-600 text-[10px] normal-case tracking-normal">(optional)</span>
          </label>
          <select
            value={data.backupPayment}
            onChange={(e) => onChange("backupPayment", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition appearance-none"
          >
            <option value="" className="bg-[#08152b]">Select backup method</option>
            {PAYMENT_METHODS.map((pm) => (
              <option key={pm.value} value={pm.value} className="bg-[#08152b]">
                {pm.icon} {pm.label}
              </option>
            ))}
          </select>
        </div>

        {/* Preferred at check-in */}
        <div>
          <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
            Preferred Payment at Check-In
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "pay-online", label: "💻 Pay Online Before Arrival" },
              { value: "pay-arrival", label: "🏕️ Pay at Check-In" },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange("checkinPayment", opt.value)}
                className={`rounded-xl border px-4 py-3.5 text-sm font-semibold transition ${
                  data.checkinPayment === opt.value
                    ? "border-[#c9a227] bg-[#c9a227]/10 text-[#c9a227]"
                    : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Divider — Billing */}
        <div className="border-t border-white/5 pt-6">
          <p className="text-[#c9a227] text-xs font-bold uppercase tracking-[0.2em] mb-5">
            Billing Address
          </p>
        </div>

        {/* Street */}
        <div>
          <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
            Street Address <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={data.billingStreet}
            onChange={(e) => onChange("billingStreet", e.target.value)}
            placeholder="123 Main Street"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition"
          />
        </div>

        {/* City, State, Zip */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
              City <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={data.billingCity}
              onChange={(e) => onChange("billingCity", e.target.value)}
              placeholder="City"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
              State <span className="text-red-400">*</span>
            </label>
            <select
              value={data.billingState}
              onChange={(e) => onChange("billingState", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition appearance-none"
            >
              <option value="" className="bg-[#08152b]">State</option>
              {US_STATES.map((st) => (
                <option key={st} value={st} className="bg-[#08152b]">{st}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
              ZIP Code <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={data.billingZip}
              onChange={(e) => onChange("billingZip", e.target.value)}
              placeholder="32778"
              maxLength={10}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition"
            />
          </div>
        </div>

        {/* Security note */}
        <div className="rounded-xl border border-[#c9a227]/20 bg-[#c9a227]/5 p-4">
          <p className="text-[#c9a227] text-xs font-bold uppercase tracking-wide mb-1">🔒 Security Note</p>
          <p className="text-gray-300 text-sm leading-relaxed">
            National Travel Key never stores card numbers. We only save your preferred payment type so parks know how you plan to pay. Actual transactions happen directly with the property.
          </p>
        </div>
      </div>
    </div>
  );
}
