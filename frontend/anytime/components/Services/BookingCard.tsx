import React, { useState } from "react";

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
  tagColor,
  onView,
}: BookingCardProps) {
  const [imgSrc, setImgSrc] = useState(image || "/file.svg");

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Switch to vertical layout on mobile, horizontal on larger screens */}
      <div className="flex flex-col sm:flex-row h-full">
        {/* Image container - responsive width */}
        <div className="w-full sm:w-28 h-36 sm:h-auto relative flex-shrink-0">
          <img
            src={imgSrc}
            alt={title}
            className="h-full w-full object-cover"
            onError={() => setImgSrc("/file.svg")}
          />
        </div>

        {/* Content container */}
        <div className="flex-1 p-3 flex flex-col justify-between">
          {/* Top section with title and tag */}
          <div className="mb-2">
            <div className="flex flex-wrap items-start gap-2">
              <h3 className="font-bold text-lg">{title}</h3>

              {tag && (
                <span
                  className={`${
                    tagColor || "bg-pink-400"
                  } text-white text-xs px-2 py-1 rounded-md flex-shrink-0`}
                >
                  {tag}
                </span>
              )}
            </div>

            <div className="text-gray-600 text-sm">by {provider}</div>
            <div className="text-gray-500 text-xs">{experience}</div>
          </div>

          {/* Bottom section with rating, price and view button */}
          <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
            <div className="flex items-center">
              <span className="bg-yellow-300 text-xs font-semibold rounded-md px-1.5 py-0.5 mr-2">
                ★ {rating}
              </span>
              <span className="font-bold">{price}</span>
            </div>

            <button
              onClick={onView}
              className="px-3 py-1.5 text-sm bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-md"
            >
              View Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}