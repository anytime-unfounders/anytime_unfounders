import React from "react";

interface ServiceCategoryCardProps {
  icon: React.ReactNode;
  label: string;
  hot?: boolean;
}

export default function ServiceCategoryCard({ icon, label, hot }: ServiceCategoryCardProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-xl border border-[#E5E5E5] shadow p-4 w-28 h-28 relative">
      {hot && (
        <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded">
          HOT
        </span>
      )}
      <div className="text-3xl mb-2">{icon}</div>
      <span className="text-xs text-gray-700 text-center">{label}</span>
    </div>
  );
}