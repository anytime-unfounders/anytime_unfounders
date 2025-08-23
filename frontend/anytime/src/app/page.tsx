"use client";

import { useEffect, useState } from "react";
import AnimatedIntro from "../../components/AnimatedIntro/AnimatedIntro";

// Dummy login form component
function LoginForm() {
  return (
    <form className="bg-white/90 rounded-xl shadow-xl p-8 flex flex-col gap-4 w-80">
      <h2 className="text-2xl font-bold mb-2 text-[#7163FF]">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#8B46F6]"
      />
      <input
        type="password"
        placeholder="Password"
        className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#8B46F6]"
      />
      <button
        type="submit"
        className="bg-[#7163FF] hover:bg-[#8B46F6] text-white font-semibold rounded p-2 mt-2"
      >
        Login
      </button>
    </form>
  );
}

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen flex-col items-center justify-center overflow-hidden bg-[#F8F7FF] ">
      {/* Parallax Blobs */}
      <div
        className="absolute top-20 left-10 w-72 h-72 bg-[#7163FF] rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      />
      <div
        className="absolute top-40 right-10 w-96 h-96 bg-[#F5A623] rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      />
      <div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#8B46F6] rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      />

      {/* Animated Intro (left side) */}
      <div className={introDone ? "blur-md transition-all duration-700 " : "transition-all duration-700"}>
        <AnimatedIntro onIntroDone={() => setIntroDone(true)} />
      </div>

      {/* Login Form (slides in after intro) */}
      <div
        className={`fixed right-0 top-0 h-full w-1/2 flex items-center justify-center transition-all duration-700 ${
          introDone
            ? "translate-y-0 opacity-100"
            : "translate-y-[100vh] opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 20 }}
      >
        <LoginForm />
      </div>
    </main>
  );
}
