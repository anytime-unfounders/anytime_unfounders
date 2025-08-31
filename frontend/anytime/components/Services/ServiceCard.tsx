import React, { useState } from "react";
import Image from "next/image";

type ServiceCardProps = {
  image: string;
  title: string;
  provider: string;
  experience: string;
  rating: number;
  price: string;
  tag?: string;
  tagColor?: string;
  onBook?: () => void;
  smallButton?: boolean;
  shortCard?: boolean;
};

export default function ServiceCard({
  image,
  title,
  provider,
  experience,
  rating,
  price,
  tag,
  tagColor,
  onBook,
  smallButton = false,
  shortCard = false,
}: ServiceCardProps) {
  const [imgSrc, setImgSrc] = useState(image || "/file.svg");

  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${shortCard ? "h-auto min-h-[120px]" : ""}`}>
      <div className="flex h-full">
        {/* Image container with better proportions */}
        <div className={`${shortCard ? "w-28 h-auto" : "w-32"} relative flex-shrink-0`}>
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
          <div className="mb-1">
            <div className="flex items-start justify-between">
              <h3 className="font-bold text-lg min-w-0 break-words pr-2">
                {title}
              </h3>
              
              {tag && (
                <span className={`${tagColor || "bg-blue-500"} text-white text-xs px-2 py-1 rounded-md flex-shrink-0`}>
                  {tag}
                </span>
              )}
            </div>

            <div className="text-gray-600 text-sm">by {provider}</div>
            <div className="text-gray-500 text-xs">{experience}</div>
          </div>

          {/* Bottom section with rating, price and book button */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <span className="bg-yellow-300 text-xs font-semibold rounded-md px-1.5 py-0.5 mr-2">
                ★ {rating}
              </span>
              <span className="font-bold">{price}</span>
            </div>
            
            <button
              onClick={onBook}
              className={`${
                smallButton ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm"
              } bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-md`}
            >
              Book Now →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
