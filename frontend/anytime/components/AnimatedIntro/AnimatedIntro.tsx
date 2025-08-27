
import React, { useEffect, useState } from "react";
import AnytimeSVG from "./AnytimeSVG";
import PhoneSVG from "./PhoneSVG";
import AnimatedMotorcycle from "./AnimatedMotorcycle";
import PhoneCoverSVG from "./PhoneCoverSVG";

export default function AnimatedIntro({ onIntroDone }: { onIntroDone: () => void }) {
  //const [showMotorcycle, setShowMotorcycle] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showAnytime, setShowAnytime] = useState(false);

  useEffect(() => {
    //setShowMotorcycle(true);
    const phoneTimer = setTimeout(() => setShowPhone(true), 1000);
    const anytimeTimer = setTimeout(() => setShowAnytime(true), 2000);
    const doneTimer = setTimeout(() => onIntroDone(), 3000); // Call parent after animation

    return () => {
      clearTimeout(phoneTimer);
      clearTimeout(anytimeTimer);
      clearTimeout(doneTimer);
    };
  }, [onIntroDone]);

  return (
    <div className="flex w-full">
      {/* Phone slides in after motorcycle */}
      <PhoneSVG
        className={`scale-[0.3] absolute top-[-44rem] right-[-46.5rem] ${showPhone ? "animate-slide-in-left" : "opacity-0"
          }`}
      />

      {/* Anytime slides in after phone */}
      <AnytimeSVG
        className={`scale-[0.3] absolute top-[-45rem] right-[-49rem] ${showAnytime ? "animate-slide-in-left " : "opacity-0 scale-[0.05]"
          }`}
      />
      <PhoneCoverSVG
        className={`scale-[0.171] absolute top-[-44rem] right-[-33rem] ${showPhone ? "animate-slide-in-left " : "opacity-0"
          }`}
      />
      {/* Pass stop condition down */}
      <AnimatedMotorcycle stopSpin={showPhone} />
    </div>
  );
}
