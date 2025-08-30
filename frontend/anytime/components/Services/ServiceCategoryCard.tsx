import Image from "next/image";
import { useRouter } from "next/router";

type Props = {
  icon: string;   // emoji or image path
  label: string;
  hot?: boolean;
};

export default function ServiceCategoryCard({ icon, label, hot }: Props) {
  const isImagePath = icon.startsWith("/");
  const router = useRouter();

  return (
    <button
      className="w-full focus:outline-none"
      onClick={() => router.push(`/categories/${label.toLowerCase()}`)}
      type="button"
    >
      <div className="relative flex flex-col items-center justify-center rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition border border-gray-400">
        {/* HOT badge */}
        {hot && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-md shadow">
            HOT
          </div>
        )}
        {isImagePath ? (
          <Image src={icon} alt={label} width={60} height={60} className="mb-1 object-contain" priority />
        ) : (
          <span className="mb-2 text-3xl">{icon}</span>
        )}
        <span className="text-sm font-medium">{label}</span>
      </div>
    </button>
  );
}