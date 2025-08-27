import { useEffect, useState } from "react";

export default function Bg() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className="absolute top-20 left-10 w-72 h-72 bg-[#6c48b8] rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.2}px)`, zIndex: 0 }}
      />
      <div
        className="absolute top-40 right-10 w-96 h-96 bg-[#8BBfFF] rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.3}px)`, zIndex: 0 }}
      />
      <div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#8B46F6] rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.15}px)`, zIndex: 0 }}
      />
    </>
  );
}
