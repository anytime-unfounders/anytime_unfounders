import React, { useEffect, useState } from "react";
import MotorcycleSVG from "./Motorcycle";
import WheelSVG from "./WheelSVG";

export default function AnimatedMotorcycle({
  stopSpin,
}: {
  stopSpin: boolean;
}) {
  const [showMotorcycle, setShowMotorcycle] = useState(false);

  useEffect(() => {
    setShowMotorcycle(true);
  }, []);

  return (
    <div
      className={`absolute top-[-45rem] right-[-45rem] scale-[0.3] ${showMotorcycle ? "animate-slide-in-left" : "opacity-0"
        }`}
    >
      {/* Wheels spin while bike is sliding in, stop when Anytime shows */}
      <WheelSVG
        className={`absolute scale-[0.15] left-[-15rem] bottom-[-29rem] rotate-[250deg] z-0 ${showMotorcycle
          ? stopSpin
            ? "animate-spin-stop"
            : "animate-spin-stop"
          : ""
          }`}
      />

      <WheelSVG
        className={`absolute scale-[0.15] left-[27.8rem] bottom-[-30rem] z-0 rotate-180 ${showMotorcycle
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
