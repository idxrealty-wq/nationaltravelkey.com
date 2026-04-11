const stats = [
  { value: '67', label: 'Participating Parks' },
  { value: '412', label: 'Available Units Right Now' },
  { value: '21', label: 'Counties With Openings' },
  { value: '9', label: 'Parks Showing No Vacancy' },
] as const;

export default function StatsBar() {
  return (
    <section className="border-b border-[#c9a227]/15 bg-[#0d1f3c]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 py-6 text-center md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-3xl font-black text-[#c9a227]">{stat.value}</p>
            <p className="mt-1 text-xs text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
