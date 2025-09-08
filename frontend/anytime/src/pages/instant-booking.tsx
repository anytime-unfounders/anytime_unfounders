import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

export default function InstantBooking() {
    const router = useRouter();
    const [date, setDate] = useState<string>(() =>
        new Date().toISOString().slice(0, 10)
    );
    const [time, setTime] = useState("18:00");
    const [hours, setHours] = useState(2);
    const [guests, setGuests] = useState(2);
    const [notes, setNotes] = useState("");
    const [category, setCategory] = useState("Electricians");

    const handleInstant = async () => {
        // TODO: replace with API call to actually book.
        // Example:
        // await fetch("/api/book", { method: "POST", headers: {"Content-Type":"application/json"},
        //   body: JSON.stringify({ category, date, time, hours, guests, notes, instant: true }) });

        router.push("/thanksforbooking");
    };

    return (
        <div className="min-h-screen bg-[#F6F8FB]">
            {/* Header */}
            <header className="bg-white border-b">
                <div className="mx-auto max-w-4xl px-4 py-4">
                    <Link href="/services" className="text-[#6C38B8] font-semibold">← Back</Link>
                    <h1 className="text-3xl font-extrabold mt-2">Instant Booking</h1>
                    <p className="text-gray-600">Book a trusted provider instantly and get started right away.</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-2xl px-4 py-8">
                <div className="rounded-2xl border bg-white p-8 shadow-sm">
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-bold text-[#8841FA] mb-2">Instant Booking</h2>
                        <p className="text-gray-600">Fill out the details below and we'll match you with an available provider instantly.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full rounded-lg border px-3 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8B46F6]"
                            >
                                <option value="Electricians">Electricians</option>
                                <option value="Catering">Catering</option>
                                <option value="Petcare">Petcare</option>
                                <option value="Emergencies">Emergencies</option>
                                <option value="Locksmiths">Locksmiths</option>
                                <option value="Photographers">Photographers</option>
                                <option value="Tutors">Tutors</option>
                                <option value="Florists">Florists</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full rounded-lg border px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B46F6]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full rounded-lg border px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B46F6]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Hours Needed</label>
                            <input
                                type="number"
                                min={1}
                                max={12}
                                value={hours}
                                onChange={(e) => setHours(Number(e.target.value))}
                                className="w-full rounded-lg border px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B46F6]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Number of People</label>
                            <input
                                type="number"
                                min={1}
                                value={guests}
                                onChange={(e) => setGuests(Number(e.target.value))}
                                className="w-full rounded-lg border px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B46F6]"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
                            <textarea
                                rows={4}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Please provide any specific requirements, address, or additional details..."
                                className="w-full rounded-lg border px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B46F6]"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleInstant}
                        className="mt-8 w-full rounded-xl bg-[#8B46F6] px-6 py-4 text-lg font-semibold text-white transition hover:bg-[#6C38B8]"
                    >
                        Book Instantly →
                    </button>

                    <p className="mt-4 text-sm text-gray-500 text-center">
                        We'll match you with an available provider instantly and send you confirmation details.
                    </p>
                </div>
            </main>
        </div>
    );
}
