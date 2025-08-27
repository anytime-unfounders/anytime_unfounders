// app/login/page.tsx
"use client";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    onScroll(); // set initial value
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-[1fr_1.5fr] items-center gap-8 px-8">
      <div
        className="absolute top-20 left-10 w-90 h-90 bg-[#6c48b8] rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      />
      <div
        className="absolute top-40 right-10 w-150 h-150 bg-[#8BBfFF] rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      />


      {/* left column */}
      <div className="text-center md:text-left md:justify-self-end md:pr-12">
        <h1 className="text-7xl font-bold">Log In.</h1>
        <p className="text-xl font-normal">Services on Standby.</p>
      </div>

      {/* right column → boxed card */}
      <div className="w-full flex md:justify-center">
        <div className="w-full max-w-lg rounded-3xl border border-[#E5E7EB] bg-white/90 backdrop-blur p-8 shadow-xl">
          {/* put your form fields inside this box */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[#6D39B8]">
                Username / Email
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none
                           focus:ring-2 focus:ring-[#6D39B8] focus:border-[#6D39B8]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#6D39B8]">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none
                           focus:ring-2 focus:ring-[#6D39B8] focus:border-[#6D39B8]"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#6D39B8] px-4 py-3 font-semibold text-white hover:opacity-95
                         focus:outline-none focus:ring-2 focus:ring-[#6D39B8]"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
