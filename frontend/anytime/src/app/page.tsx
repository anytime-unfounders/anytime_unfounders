"use client";

import { useEffect, useState } from "react";
import AnimatedIntro from "../../components/AnimatedIntro/AnimatedIntro";

// Social icons (using SVGs for simplicity)
function SocialIcons() {
  return (
    <div className="flex justify-center gap-6 mt-6">
      {/* Instagram */}
      <a
        href="https://instagram.com/anytime.hq"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="7" fill="pink" />
          <path
            d="M12 8.5A3.5 3.5 0 1 0 12 15.5A3.5 3.5 0 1 0 12 8.5Z"
            fill="#fff"
          />
          <circle cx="17.5" cy="6.5" r="1" fill="#fff" />
        </svg>
      </a>
      {/* TikTok */}
      <a
        href="https://tiktok.com/@anytime.hq"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="TikTok"
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="7" fill="#000" />
          <path
            d="M16.5 8.5V13.5C16.5 15.433 14.933 17 13 17C11.067 17 9.5 15.433 9.5 13.5C9.5 11.567 11.067 10 13 10V12C12.172 12 11.5 12.672 11.5 13.5C11.5 14.328 12.172 15 13 15C13.828 15 14.5 14.328 14.5 13.5V7.5H16.5V8.5Z"
            fill="#fff"
          />
        </svg>
      </a>
      {/* Twitter/X */}
      <a
        href="https://x.com/anytime_hq"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter"
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="7" fill="#1DA1F2" />
          <path
            d="M17.316 9.246c.008.117.008.234.008.352 0 3.59-2.732 7.728-7.728 7.728-1.536 0-2.965-.45-4.17-1.224.213.025.418.034.64.034 1.276 0 2.45-.434 3.386-1.166a2.72 2.72 0 0 1-2.54-1.888c.168.025.336.042.512.042.247 0 .486-.033.713-.094a2.717 2.717 0 0 1-2.177-2.666v-.034c.364.202.78.324 1.222.338a2.713 2.713 0 0 1-.84-3.626 7.715 7.715 0 0 0 5.6 2.84 2.713 2.713 0 0 1 4.624-2.473 5.41 5.41 0 0 0 1.72-.656 2.72 2.72 0 0 1-1.192 1.5 5.44 5.44 0 0 0 1.56-.426 5.81 5.81 0 0 1-1.36 1.408z"
            fill="#fff"
          />
        </svg>
      </a>
    </div>
  );
}

// Join Us form component
function JoinUsForm() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("https://formspree.io/f/manbrabd", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.ok) {
        setSubmitted(true);
        setEmail(""); // Clear the input after successful submit
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/90 rounded-xl shadow-xl p-8 flex flex-col gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md min-w-0"
    >
      <h2 className="text-2xl font-bold mb-2 text-[#7163FF] text-center">
        Join us
      </h2>
      <p className="text-gray-600 mb-2 text-center">
        Be the first to know when we launch!
      </p>
      <input
        type="email"
        name="email"
        placeholder="Your email"
        className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#8B46F6] w-full"
        required
        disabled={submitted}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="submit"
        className="bg-[#7163FF] hover:bg-[#8B46F6] text-white font-semibold rounded p-2 mt-2 w-full"
        disabled={submitted}
      >
        {submitted ? "Thank you!" : "Notify me"}
      </button>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <SocialIcons />
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
    <main className="min-h-screen flex-col items-center justify-center overflow-hidden bg-[#F8F7FF] relative">
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
      <div
        className={
          introDone
            ? "blur-md transition-all duration-700 2xl:translate-x-[-20rem] max-md:scale-30 max-md:translate-x-46"
            : "2xl:translate-x-[-20rem] max-md:scale-30 max-md:translate-x-46"
        }
      >
        <AnimatedIntro onIntroDone={() => setIntroDone(true)} />
      </div>

      {/* Join Us Form (slides in after intro) */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-1/2 flex items-center justify-center transition-all duration-700 ${
          introDone
            ? "translate-y-0 opacity-100"
            : "translate-y-[100vh] opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 20 }}
      >
        <JoinUsForm />
      </div>
    </main>
  );
}
