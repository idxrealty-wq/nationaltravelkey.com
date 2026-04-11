export default function SiteFooter() {
  return (
    <footer className="border-t border-[#c9a227]/15 bg-[#08152b] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c9a227]">
                <span className="text-sm font-black text-[#08152b]">NTK</span>
              </div>
              <span className="text-lg font-black tracking-tight text-white">National Travel Key</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">One travel profile. Faster check-in. Smarter Florida park search.</p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#c9a227]">Platform</h4>
            <ul className="space-y-2">
              <li><a href="#county-grid" className="text-sm text-gray-400 transition hover:text-white">Find Parks</a></li>
              <li><a href="#how-it-works" className="text-sm text-gray-400 transition hover:text-white">How It Works</a></li>
              <li><a href="#available-now" className="text-sm text-gray-400 transition hover:text-white">Available Now</a></li>
              <li><a href="/profile" className="text-sm text-gray-400 transition hover:text-white">My Profile</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#c9a227]">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-sm text-gray-400 transition hover:text-white">Privacy Policy</a></li>
              <li><a href="/terms" className="text-sm text-gray-400 transition hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-gray-500">National Travel Key. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
