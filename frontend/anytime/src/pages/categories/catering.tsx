import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

function InstantBookingBox({ category }: { category: string }) {
    const router = useRouter();
    const [date, setDate] = useState<string>(() =>
        new Date().toISOString().slice(0, 10)
    );
    const [time, setTime] = useState("18:00");
    const [hours, setHours] = useState(2);
    const [guests, setGuests] = useState(2);
    const [notes, setNotes] = useState("");

    const handleInstant = async () => {
        // TODO: replace with API call to actually book.
        // Example:
        // await fetch("/api/book", { method: "POST", headers: {"Content-Type":"application/json"},
        //   body: JSON.stringify({ category, date, time, hours, guests, notes, instant: true }) });

        router.push("/thanksforbooking");
    };

    return (
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="mb-2 text-[#8841FA] text-large font-extrabold">Instant booking</div>

            <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                    <label className="block text-xs text-gray-600">Category</label>
                    <input
                        value={category}
                        readOnly
                        className="w-full rounded-lg border bg-gray-50 px-3 py-2 text-gray-700"
                    />
                </div>

                <div>
                    <label className="block text-xs text-gray-600">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full rounded-lg border px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-xs text-gray-600">Time</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full rounded-lg border px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-xs text-gray-600">Hours</label>
                    <input
                        type="number"
                        min={1}
                        max={12}
                        value={hours}
                        onChange={(e) => setHours(Number(e.target.value))}
                        className="w-full rounded-lg border px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-xs text-gray-600">Guests</label>
                    <input
                        type="number"
                        min={1}
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full rounded-lg border px-3 py-2"
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-xs text-gray-600">Notes</label>
                    <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Dietary needs, time window, address…"
                        className="w-full rounded-lg border px-3 py-2"
                    />
                </div>
            </div>

            <button
                onClick={handleInstant}
                className="mt-3 w-full rounded-xl bg-[#8B46F6] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#6C38B8]"
            >
                Instant Book →
            </button>

            <p className="mt-2 text-[11px] text-gray-500">
                We’ll match you with an available provider instantly.
            </p>
        </div>
    );
}


type Service = {
    image: string;
    title: string;
    provider: string;
    experience: string;
    rating: number;
    price: string;
    tag?: string;
    tagColor?: string; // Tailwind class, e.g. "bg-pink-500"
};

const CATEGORY_META: Record<string, { title: string; icon: string; blurb: string; chips: string[] }> = {
    catering: {
        title: "Catering",
        icon: "/service-icons/chef.svg",
        blurb: "Private chefs, event catering, meal prep & more — book vetted pros near you.",
        chips: ["Private Chef", "Buffet", "Cocktail Party", "Meal Prep", "Vegan", "Gluten-Free"],
    },
    electricians: {
        title: "Electricians",
        icon: "/service-icons/electrician.png",
        blurb: "Licensed pros for installs, repairs, and inspections.",
        chips: ["Emergency", "Installation", "Rewiring", "Inspection"],
    },
};

const MOCK_RESULTS: Service[] = [
    {
        image: "/service-photos/chef.jpg",
        title: "Private Chef",
        provider: "Marques Jacob",
        experience: "10 years experience",
        rating: 5,
        price: "$460/h",
        tag: "Verified",
        tagColor: "bg-pink-500",
    },
    {
        image: "/service-photos/dog.jpg",
        title: "Buffet Catering",
        provider: "Amara Foods",
        experience: "7 years experience",
        rating: 4.7,
        price: "$120/h",
        tag: "–15%",
        tagColor: "bg-pink-500",
    },
    {
        image: "/service-photos/electrician.jpg",
        title: "Meal Prep (Weekly)",
        provider: "Chef Lina",
        experience: "6 years experience",
        rating: 4.9,
        price: "$85/h",
    },
];

export default function CategoryPage() {
    const { query } = useRouter();
    const category = (query.category as string) ?? "catering";
    const meta = CATEGORY_META[category] ?? CATEGORY_META.catering;

    const [q, setQ] = useState("");
    const [minRating, setMinRating] = useState(0);
    const [sort, setSort] = useState<"relevance" | "rating" | "price_asc" | "price_desc">("relevance");

    const results = useMemo(() => {
        const parsePrice = (p: string) => Number((p.match(/[\d.]+/) || ["0"])[0]);
        let r = MOCK_RESULTS.filter(
            (s) =>
                (!q || `${s.title} ${s.provider}`.toLowerCase().includes(q.toLowerCase())) &&
                s.rating >= minRating
        );
        r = r.sort((a, b) => {
            if (sort === "rating") return b.rating - a.rating;
            if (sort === "price_asc") return parsePrice(a.price) - parsePrice(b.price);
            if (sort === "price_desc") return parsePrice(b.price) - parsePrice(a.price);
            return 0;
        });
        return r;
    }, [q, minRating, sort]);

    return (
        <div className="min-h-screen bg-[#F6F8FB]">
            {/* Sticky category header */}
            <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4">
                    <Link href="/services" className="text-[#6C38B8] font-semibold">← Back</Link>
                    <img src={meta.icon} alt="" className="h-10 w-10" />
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-extrabold leading-tight">{meta.title}</h1>
                        <p className="text-sm text-gray-600">{meta.blurb}</p>
                    </div>
                    <div className="ml-auto">
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value as any)}
                            className="rounded-lg border bg-white px-3 py-2 text-sm"
                        >
                            <option value="relevance">Sort: Relevance</option>
                            <option value="rating">Sort: Rating</option>
                            <option value="price_asc">Sort: Price (Low → High)</option>
                            <option value="price_desc">Sort: Price (High → Low)</option>
                        </select>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 md:grid-cols-[280px_1fr]">
                {/* Filters / chips */}
                {/* ...rest of your filter UI */}


                <aside className="h-fit rounded-2xl border bg-white p-4 shadow-sm md:sticky md:top-20">

                    <InstantBookingBox category={meta.title} />

                    <div className="my-4 h-px bg-gray-200" />

                    {/* existing search + filters… */}
                    <label className="mb-2 block text-sm font-semibold">
                        Search within {meta.title}
                    </label>
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder={`Search "${meta.title}"...`}
                        className="w-full rounded-lg border px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8B46F6]"
                    />
                    <div className="mt-4">
                        <p className="mb-2 text-sm font-semibold">Popular tags</p>
                        <div className="flex flex-wrap gap-2">
                            {meta.chips.map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setQ(c)}
                                    className="rounded-full border px-3 py-1 text-sm hover:border-[#8B46F6] hover:text-[#8B46F6]"
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="mb-2 text-sm font-semibold">Minimum rating</p>
                        <select
                            value={minRating}
                            onChange={(e) => setMinRating(Number(e.target.value))}
                            className="w-full rounded-lg border px-3 py-2"
                        >
                            <option value={0}>Any</option>
                            <option value={4}>4.0+</option>
                            <option value={4.5}>4.5+</option>
                            <option value={5}>5.0</option>
                        </select>
                    </div>
                </aside>

                {/* Results */}
                <section className="space-y-5">
                    {results.map((s, i) => (
                        <ResultCard key={i} {...s} />
                    ))}
                    {results.length === 0 && (
                        <div className="rounded-2xl border bg-white p-8 text-center text-gray-600">
                            No results. Try clearing filters.
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

/** Result card: image fills card height, text expands, CTA on right */
function ResultCard({ image, title, provider, experience, rating, price, tag, tagColor = "bg-pink-500" }: Service) {
    return (
        <div className="flex w-full items-stretch overflow-hidden rounded-2xl border bg-white shadow-sm">
            {/* Image column fills card height */}
            <img src={image} alt={title} className="h-auto w-60 object-cover md:h-full" />

            {/* Content */}
            <div className="min-w-0 flex-1 p-5">
                <div className="flex items-center gap-3">
                    <h3 className="truncate text-2xl font-extrabold tracking-tight">{title}</h3>
                    {tag && (
                        <span className={`rounded-lg px-3 py-1 text-sm font-bold text-white ${tagColor}`}>{tag}</span>
                    )}
                </div>
                <p className="mt-1 text-gray-600">by {provider}</p>
                <p className="text-gray-500">{experience}</p>

                <div className="mt-3 flex items-center gap-2">
                    <span className="inline-flex items-center rounded-md bg-yellow-300/90 px-2.5 py-1 text-sm font-semibold text-yellow-900">
                        ★ {rating}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-green-100 px-2.5 py-1 text-sm font-semibold text-green-700">
                        {price}
                    </span>
                </div>
            </div>

            {/* CTA */}
            <div className="flex items-center p-5">
                <Link
                    href={`/book?title=${encodeURIComponent(title)}`}
                    className="rounded-xl bg-[#8B46F6] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#6C38B8]"
                >
                    Book Now →
                </Link>
            </div>
        </div>
    );
}
