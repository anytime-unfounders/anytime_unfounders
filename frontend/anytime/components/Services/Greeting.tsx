import React from "react";

export default function Greeting({ name }: { name: string }) {
  return (
    <div className="text-2xl font-semibold mb-2">
      Hello, <span className="text-[#6C38B8]">{name}!</span>
    </div>
  );
}