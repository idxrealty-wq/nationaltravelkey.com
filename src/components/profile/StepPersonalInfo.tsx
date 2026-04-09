"use client";

interface StepPersonalInfoProps {
  data: {
    fullName: string;
    dateOfBirth: string;
    phone: string;
    email: string;
    pronouns: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function StepPersonalInfo({ data, onChange }: StepPersonalInfoProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
          Personal Information
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          This is the foundation of your Travel Key. Enter your details once — use them everywhere.
        </p>
      </div>

      <div className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            placeholder="First and last name"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
            Date of Birth <span className="text-red-400">*</span>
          </label>
          <input
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => onChange("dateOfBirth", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition [color-scheme:dark]"
          />
        </div>

        {/* Phone & Email row */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="(555) 555-5555"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition"
            />
          </div>
        </div>

        {/* Pronouns */}
        <div>
          <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
            Preferred Pronouns <span className="text-gray-600 text-[10px] normal-case tracking-normal">(optional)</span>
          </label>
          <select
            value={data.pronouns}
            onChange={(e) => onChange("pronouns", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/30 transition appearance-none"
          >
            <option value="" className="bg-[#08152b]">Select pronouns</option>
            <option value="he/him" className="bg-[#08152b]">He / Him</option>
            <option value="she/her" className="bg-[#08152b]">She / Her</option>
            <option value="they/them" className="bg-[#08152b]">They / Them</option>
            <option value="prefer-not" className="bg-[#08152b]">Prefer not to say</option>
          </select>
        </div>

        {/* Face Photo placeholder */}
        <div>
          <label className="block text-xs font-bold text-[#c9a227] uppercase tracking-[0.15em] mb-2">
            Face Photo <span className="text-gray-600 text-[10px] normal-case tracking-normal">(optional)</span>
          </label>
          <div className="rounded-xl border-2 border-dashed border-white/10 bg-white/[0.02] p-8 text-center hover:border-[#c9a227]/30 transition cursor-pointer">
            <div className="text-3xl mb-2">📷</div>
            <p className="text-gray-400 text-sm">Click to upload a photo</p>
            <p className="text-gray-600 text-xs mt-1">Used for identity verification at check-in. You control who sees it.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
