import React, { useEffect, useState } from "react";
import MotorcycleSVG from "./Motorcycle";
import WheelSVG from "./WheelSVG";

export default function AnimatedMotorcycle({
  stopSpin,
}: {
  stopSpin: boolean;
}) {
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    setShowPhone(true);
  }, []);

  return (
    <div
      className={`absolute top-[-50rem] right-[-40rem] scale-[0.3] ${
        showPhone ? "animate-slide-in-left" : "opacity-0"
      }`}
    >
      {/* Wheels spin while bike is sliding in, stop when Anytime shows */}
      <WheelSVG
        className={`absolute scale-[0.15] left-[-15rem] bottom-[-29rem] rotate-[250deg] z-0 ${
          showPhone
            ? stopSpin
              ? "animate-spin-stop"
              : "animate-spin-stop"
            : ""
        }`}
      />

      <WheelSVG
        className={`absolute scale-[0.15] left-[26rem] bottom-[-29rem] z-0 rotate-180 ${
          showPhone
            ? stopSpin
              ? "animate-spin-stop"
              : "animate-spin-stop"
            : ""
        }`}
      />
      <MotorcycleSVG className="relative z-10" />
    </div>
  );
}
