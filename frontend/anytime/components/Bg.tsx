import { useEffect, useState } from "react";

export default function Bg() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />
      <div className="bg-blob bg-blob-3" />
      <style jsx global>{`
        .bg-blob {
          position: absolute;
          border-radius: 9999px;
          mix-blend-mode: multiply;
          filter: blur(32px);
          opacity: 0.3;
          pointer-events: none;
          z-index: 0;
          will-change: transform;
          transition: transform 0.2s cubic-bezier(.4,0,.2,1);
        }
        .bg-blob-1 {
          top: 5rem; left: 2.5rem; width: 18rem; height: 18rem; background: #6c48b8;
        }
        .bg-blob-2 {
          top: 10rem; right: 2.5rem; width: 24rem; height: 24rem; background: #8BBfFF;
        }
        .bg-blob-3 {
          bottom: 5rem; left: 50%; transform: translateX(-50%); width: 20rem; height: 20rem; background: #8B46F6;
        }
      `}</style>
    </>
  );
}
