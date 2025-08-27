import React from "react";

interface BookingCardProps {
  image: string;
  title: string;
  provider: string;
  experience: string;
  rating: number;
  price: string;
  tag?: string;
  tagColor?: string;
  onView?: () => void;
}

export default function BookingCard({
  image,
  title,
  provider,
  experience,
  rating,
  price,
  tag,
  tagColor = "bg-pink-400",
  onView,
}: BookingCardProps) {
  return (
    <div className="flex bg-white rounded-xl shadow border border-[#E5E5E5] p-3 mb-4 items-center relative max-w-lg">
      <img src={image} alt={title} className="w-24 h-24 rounded-lg object-cover mr-4" />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">{title}</span>
          {tag && (
            <span className={`ml-2 ${tagColor} text-white text-xs font-bold px-2 py-0.5 rounded`}>
              {tag}
            </span>
          )}
        </div>
        <div className="text-xs text-gray-600">by {provider}</div>
        <div className="text-xs text-gray-500">{experience}</div>
        <div className="flex items-center gap-2 mt-2">
          <span className="bg-yellow-300 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded flex items-center">
            ★{rating}
          </span>
          <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded">
            {price}
          </span>
        </div>
      </div>
      <button
        className="ml-4 bg-[#8B46F6] hover:bg-[#6C38B8] text-white font-semibold rounded px-4 py-2 text-sm transition"
        onClick={onView}
      >
        View Booking
      </button>
    </div>
  );
}