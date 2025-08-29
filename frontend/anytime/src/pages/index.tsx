import Image from "next/image";
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
        <Image
          src="/sm-icons/instagram-icon.svg"
          alt="Instagram"
          width={28}
          height={28}
        />
      </a>
      {/* TikTok */}
      <a
        href="https://tiktok.com/@anytime.hq"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="TikTok"
      >
        <Image
          src="/sm-icons/tiktok-icon.svg"
          alt="Tiktok"
          width={28}
          height={28}
        />
      </a>
      {/* Twitter/X */}
      <a
        href="https://x.com/anytime_hq"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter"
      >
        <Image
          src="/sm-icons/twitter-icon.svg"
          alt="Twitter"
          width={28}
          height={28}
        />
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
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 rounded-xl shadow-xl p-8 flex flex-col gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md min-w-0"
      >
        <h2 className="text-2xl font-bold mb-2 text-[#6C38B8] text-center">
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
          className="bg-[#6C38B8] hover:bg-[#8B46F6] text-white font-semibold rounded p-2 mt-2 w-full"
          disabled={submitted}
        >
          {submitted ? "Thank you!" : "Notify me"}
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <SocialIcons />

        <a
          className="flex justify-center text-[#6C38B8] underline-offset-2 hover:underline"
          href="/signin"
        >
          Sign In Now
        </a>
      </form>
    </>
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
    <main className="min-h-screen flex-col items-center justify-center overflow-hidden relative">
      {/* Parallax Blobs removed, now handled by Bg component */}

      {/* Animated Intro (left side) */}

      <div
        className={
          introDone
            ? "blur-md transition-all duration-700 2xl:translate-x-[-2em] max-md:scale-90 max-md:translate-x-290"
            : "2xl:translate-x-[-20rem] max-md:scale-90 max-md:translate-x-120"
        }
      >
        <AnimatedIntro onIntroDone={() => setIntroDone(true)} />
      </div>

      {/* Join Us Form (slides in after intro) */}
      <div
        className={`fixed inset-0 flex items-center justify-center transition-all duration-700 ${introDone
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
