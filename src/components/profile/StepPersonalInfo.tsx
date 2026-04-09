"use client";

interface StepPersonalInfoProps {
  data: {
    fullName: string;
    dateOfBirth: string;
    phone: string;
    email: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function StepPersonalInfo({ data, onChange }: StepPersonalInfoProps) {
  return (
    <div>
      <h2 className="text-white text-2xl font-black tracking-tight mb-1">Personal Information</h2>
      <p className="text-gray-400 text-sm mb-8">Basic details for your Travel Key profile.</p>

      <div className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            placeholder="First and last name"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white text-sm placeholder:text-gray-600 focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227] outline-none transition"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => onChange("dateOfBirth", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white text-sm focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227] outline-none transition"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="(555) 555-5555"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white text-sm placeholder:text-gray-600 focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227] outline-none transition"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white text-sm placeholder:text-gray-600 focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227] outline-none transition"
          />
        </div>

        {/* Photo Upload Placeholder */}
        <div>
          <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider mb-2">
            Profile Photo
          </label>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-gray-600 text-xl">👤</span>
            </div>
            <button
              type="button"
              className="rounded-xl border border-[#c9a227]/30 px-5 py-2.5 text-[#c9a227] text-xs font-bold hover:bg-[#c9a227]/10 transition"
            >
              Upload Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
