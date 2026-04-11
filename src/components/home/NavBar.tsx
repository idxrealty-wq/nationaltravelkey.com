'use client';

import { useAuth } from "../auth/AuthProvider";
import { signOut } from "../../lib/firebase/auth";

export default function NavBar() {
  const { user, loading } = useAuth();
  const handleSignOut = async () => { await signOut(); };

  return (
    <nav className="sticky top-0 z-50 border-b border-[#c9a227]/20 bg-[#08152b]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c9a227]">
            <span className="text-sm font-black text-[#08152b]">NTK</span>
          </div>
          <span className="text-lg font-black tracking-tight text-white">
            National Travel Key
          </span>
        </div>
        <div className="hidden items-center gap-8 md:flex">
          <a href="#county-grid" className="text-sm font-medium text-gray-300 transition hover:text-white">Find Parks</a>
          <a href="#how-it-works" className="text-sm font-medium text-gray-300 transition hover:text-white">How It Works</a>
          <a href="#available-now" className="text-sm font-medium text-gray-300 transition hover:text-white">Available Now</a>
          {!loading && user && (
            <a href="/profile" className="text-sm font-bold text-[#c9a227] transition hover:text-[#d8b13a]">My Profile</a>
          )}
        </div>
        {!loading && (user ? (
          <div className="flex items-center gap-4">
            <a href="/profile" className="hidden rounded-xl bg-[#c9a227] px-5 py-2.5 text-sm font-black text-[#08152b] transition hover:bg-[#d8b13a] sm:inline-flex">My Profile</a>
            <button onClick={handleSignOut} className="rounded-xl border border-white/20 px-4 py-2.5 text-sm font-bold text-white transition hover:border-white/40">Sign Out</button>
          </div>
        ) : (
          <a href="/signin" className="rounded-xl bg-[#c9a227] px-5 py-2.5 text-sm font-black text-[#08152b] transition hover:bg-[#d8b13a]">Sign In</a>
        ))}
      </div>
    </nav>
  );
}
