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
  tagColor = "bg-pink-500",
  onBook,
  smallButton,
  shortCard,
}: ServiceCardProps) {
  return (
    <div className={`flex w-full items-stretch rounded-2xl bg-[#F1E8FF] ${shortCard ? "h-32" : "h-44"}`}>
      {/* Left: image fills full card height */}
      <img
        src={image}
        alt={title}
        className={`object-cover rounded-l-2xl ${shortCard ? "h-32 w-32" : "h-full w-64"}`}
      />

      {/* Middle: content fills remaining width */}
      <div className="flex-1 min-w-0 p-6">
        {/* Title + promo tag inline */}
        <div className="flex items-center gap-3">
          <h3 className={`font-extrabold tracking-tight truncate ${shortCard ? "text-base" : "text-2xl"}`}>
            {title}
          </h3>
          {tag && (
            <span
              className={`${tagColor} text-white ${shortCard ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1"} font-bold rounded-lg`}
            >
              {tag}
            </span>
          )}
        </div>

        {/* Subheader */}
        <p className={`mt-1 truncate text-gray-600 ${shortCard ? "text-sm" : "text-lg"}`}>by {provider}</p>
        <p className={`${shortCard ? "text-xs" : "text-base"} text-gray-500`}>{experience}</p>

        {/* Badges row */}
        <div className={`mt-3 flex items-center gap-3 ${shortCard ? "text-xs" : "text-sm"}`}>
          <span className="inline-flex items-center rounded-md bg-yellow-300/90 px-2.5 py-1 font-semibold text-yellow-900">
            ★ {rating}
          </span>
          <span className="inline-flex items-center rounded-md bg-green-100 px-2.5 py-1 font-semibold text-green-700">
            {price}
          </span>
        </div>
      </div>

      {/* Right: action button */}
      <div className="flex items-center pr-6">
        <button
          className={`shrink-0 rounded-xl bg-[#8B46F6] ${smallButton ? "px-3 py-1 text-sm" : "px-6 py-3 text-base"} font-semibold text-white transition hover:bg-[#6C38B8]`}
          onClick={onBook}
        >
          Book Now <span aria-hidden>→</span>
        </button>
      </div>
    </div>)
}
