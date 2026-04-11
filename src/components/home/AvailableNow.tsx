import FeaturedParksGrid from "./FeaturedParksGrid";

export default function AvailableNow() {
  return (
    <section id="available-now" className="bg-[#0d1f3c]/60 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#c9a227]">Available Now</p>
          <h2 className="mb-4 text-3xl font-black text-white md:text-5xl">Parks with something left</h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-400">Only parks with remaining inventory appear here. Once a park is fully booked, it drops off this list immediately.</p>
        </div>
        <FeaturedParksGrid />
      </div>
    </section>
  );
}
