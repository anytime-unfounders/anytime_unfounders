"use client";

import { Instagram, Music2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AnimatedIntro from "../../components/AnimatedIntro";
import button from "../../components/ui/button";


export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#F8F7FF] p-6">

    //   {/* Parallax Blobs */}
    //   <motion.div
    //     className="absolute top-20 left-10 w-72 h-72 bg-[#7163FF] rounded-full mix-blend-multiply filter blur-3xl opacity-30"
    //     style={{ y: scrollY * 0.2 }}
    //   />
    //   <motion.div
    //     className="absolute top-40 right-10 w-96 h-96 bg-[#F5A623] rounded-full mix-blend-multiply filter blur-3xl opacity-30"
    //     style={{ y: scrollY * 0.3 }}
    //   />
    //   <motion.div
    //     className="absolute bottom-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#8B46F6] rounded-full mix-blend-multiply filter blur-3xl opacity-30"
    //     style={{ y: scrollY * 0.15 }}
    //   />

    //   {/* Content */}
    //   <div className="relative z-10 max-w-2xl text-center">
    //     {/* Title */}
    //     <motion.h1 
    //       className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#F5A623] via-[#8B46F6] to-[#7163FF]"
    //       animate={{
    //         backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    //       }}
    //       transition={{
    //         duration: 8,
    //         repeat: Infinity,
    //         ease: "linear",
    //       }}
    //     >
    //       Anytime
    //     </motion.h1>

    //     {/* Subtitle */}
    //     <motion.p 
    //       className="text-lg md:text-xl text-[#2C2C2C] leading-relaxed max-w-xl mx-auto font-medium mt-4"
    //       initial={{ opacity: 0, y: 20 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ delay: 0.3 }}
    //     >
    //       Join us in <span className="text-[#8B46F6] font-semibold">bringing people you need instantly</span>.
    //     </motion.p>

    //     {/* Email signup */}
    //     <motion.form 
    //       className="flex w-full max-w-md mx-auto gap-2 mt-8"
    //       initial={{ opacity: 0, y: 20 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ delay: 0.6 }}
    //     >
    //       <Input
    //         type="email"
    //         placeholder="Enter your email"
    //         className="rounded-lg border border-[#E1E0FF] bg-white/80 text-[#2C2C2C] focus:border-[#8B46F6] focus:ring-[#8B46F6]"
    //       />
    //       <Button className="rounded-lg px-6 bg-[#7163FF] hover:bg-[#8B46F6] text-white font-semibold">
    //         Join
    //       </Button>
    //     </motion.form>

    //     {/* Socials */}
    //     <motion.div 
    //       className="flex justify-center gap-6 mt-8"
    //       initial={{ opacity: 0, y: 20 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ delay: 0.9 }}
    //     >
    //       <a
    //         href="https://www.instagram.com/anytime.hq/#"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="text-[#2C2C2C] hover:text-[#F5A623] transition"
    //       >
    //         <Instagram size={32} />
    //       </a>
    //       <a
    //         href="https://tiktok.com/@anytime.hq"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="text-[#2C2C2C] hover:text-[#7163FF] transition"
    //       >
    //         <Music2 size={32} />
    //       </a>
    //     </motion.div>
    //   </div>
    // </main>
    <main>
      <div>
        <AnimatedIntro />
        {/* Text at the bottom */}
        <div className="absolute bottom-5 w-full flex flex-col items-center space-y-3">
          <div className="text-center">
            <p className="text-2xl font-semibold text-gray-800">
              Services Delivered to Your Door, Instantly.
            </p>
            <p className="text-lg text-gray-600">
              Anytime, anywhere, Anyone You Need.
            </p>
          </div>
          <button className="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white shadow-lg transition duration-300 hover:bg-purple-700">
            Get Started
          </button>
        </div>
      </div>
    </main>
  );
}
