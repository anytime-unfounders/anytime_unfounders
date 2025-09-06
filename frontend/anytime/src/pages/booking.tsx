import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";

export default function Booking() {
    const router = useRouter();
    const [showCardModal, setShowCardModal] = useState(false);
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const serviceDetails = {
        service: "Dog Walker",
        provider: "Mary Cape",
        price: "10/h"
    };

    function openPayment() {
        setShowCardModal(true);
    }

    function handleCardSubmit(e: React.FormEvent) {
        e.preventDefault();
        // Minimal validation
        if (!cardName || cardNumber.length < 12 || !expiry || cvc.length < 3) {
            alert("Please enter valid card details (demo validation).");
            return;
        }
        setShowCardModal(false);
        // Navigate to confirmation page with service details (no card data in query)
        router.push({
            pathname: "/confirm-booking",
            query: {
                service: serviceDetails.service,
                provider: serviceDetails.provider,
                price: serviceDetails.price
            }
        });
    }

    return (
        <div className="min-h-screen bg-[#F6F8FB] flex flex-col">


            {/* NavBar */}
            <div className="w-full bg-white flex items-center justify-between px-8 py-4 shadow-gray-500/60 shadow-lg">
                {/* Logo and Brand */}
                <div className="flex items-center gap-8 ml-17">
                    <img src="/anytimelogo.png" alt="Logo" className="h-20 w-20" />
                    <span className="text-4xl font-bold">Anytime</span>
                </div>
                {/* Hamburger Icon */}
                <button className="flex flex-col gap-1 mr-17 ">
                    <span className="block w-8 h-0.5 bg-gray-600"></span>
                    <span className="block w-8 h-0.5 bg-gray-600"></span>
                    <span className="block w-8 h-0.5 bg-gray-600"></span>
                </button>
            </div>

            {/* Header Section */}
            <section className="bg-white pt-12  flex flex-col items-center">

                <h1 className="text-4xl font-bold mb-2 text-center">Let’s Book Your Service.</h1>
                <p className="text-lg text-gray-600 mb-6 text-center">Browse trusted providers and book instantly.</p>
                {/* Floating Guy at Top */}
                <div className="w-full flex justify-center pt-8 ">
                    <Image src="/floatingguy.png" alt="Booking Illustration" width={400} height={600} />
                </div>
            </section>

            {/* Main Booking Card Section */}
            <section className="bg-[#E6E1F7] py-16 flex flex-col items-center">

                <div className="bg-white rounded-xl shadow-xl p-8 flex flex-row gap-8 max-w-3xl w-full">
                    {/* Left: Provider Info */}
                    <div className="flex flex-col items-start w-[260px]">
                        <div className="flex items-center gap-4 mb-2">
                            <Image src="/service-icons/mary.png" alt="Provider" width={70} height={70} className="rounded-full object-cover" />
                            <div>
                                <div className="text-xl font-bold">Dog Walker</div>
                                <div className="text-sm text-gray-500">by Mary Cape</div>
                            </div>
                        </div>
                        <div className="flex gap-2 mb-2">
                            <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 rounded text-sm font-semibold"><span>★</span> 4.1</span>
                            <span className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded text-sm font-semibold"><span>$</span> 10/hr</span>
                        </div>
                        <button className="bg-[#C7B2F9] text-white px-4 py-1 rounded-lg text-sm font-semibold mb-2">Send Inquiry</button>
                        <p className="text-xs text-gray-700 mb-2">
                            Hi, I’m Mary! 🐾 I’ve been walking and caring for dogs for over 5 years, and I absolutely love spending time with them. Whether it’s a playful puppy or a senior dog who enjoys a slower stroll, I tailor each walk to your pet’s needs. I also make sure they get plenty of exercise, love, and treats along the way. Your dog’s safety and happiness are always my top priority!
                        </p>
                    </div>
                    {/* Middle: Recent Work */}
                    <div className="flex flex-col items-center gap-2 w-[140px]">
                        <div className="text-sm font-semibold mb-1">Recent Work:</div>
                        <div className="grid grid-cols-1 gap-2">
                            <Image src="/service-photos/dog.jpg" alt="Recent Work 1" width={90} height={90} className="rounded-lg object-cover" />
                            {/* <Image src="/service-photos/dog2.jpg" alt="Recent Work 2" width={90} height={90} className="rounded-lg object-cover" /> */}
                        </div>
                    </div>
                    {/* Right: Reviews */}
                    <div className="flex flex-col w-[220px]">
                        <div className="bg-[#F6F8FB] rounded-lg p-4 mb-2">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-yellow-500 text-xl">★</span>
                                <span className="font-semibold">Reviews:</span>
                            </div>
                            <div className="text-xs text-gray-700 mb-1"><span className="font-bold">Matthius:</span> 💜💜🤍 When the dog sitter walked me it was so awesome sauce</div>
                            <div className="text-xs text-gray-700 mb-1"><span className="font-bold">Amogh:</span> 💜🤍🤍 She gave my obese dog 10 treats</div>
                            <div className="text-xs text-gray-700 mb-1"><span className="font-bold">Michelle:</span> 💜💜💜 Mary is so sweet! She brought my dog some yummy treats :)</div>
                            <div className="text-xs text-gray-700"><span className="font-bold">Alyssa:</span> 💜💜💜 Lovely Service.</div>
                        </div>
                    </div>
                </div>

                {/* Booking Form */}
                <div className="bg-white rounded-xl shadow p-6 mt-6 flex flex-row gap-8 max-w-3xl w-full">
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex gap-8">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold mb-1">DATE</label>
                                <div className="flex gap-2">
                                    <button className="px-4 py-1 rounded-full border border-gray-300 bg-[#F6F8FB] text-xs font-semibold">Today</button>
                                    <select className="px-4 py-1 rounded-full border border-gray-300 bg-[#F6F8FB] text-xs font-semibold">
                                        <option>Select Date</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold mb-1">TIME</label>
                                <div className="flex gap-2 items-center">
                                    <input type="number" min="1" max="12" className="w-12 px-2 py-1 rounded-full border border-gray-300 bg-[#F6F8FB] text-xs font-semibold" placeholder="--" />
                                    <span>:</span>
                                    <select className="px-2 py-1 rounded-full border border-gray-300 bg-[#F6F8FB] text-xs font-semibold">
                                        <option>00</option>
                                    </select>
                                    <div className="flex gap-2 ml-2">
                                        <button className="px-3 py-1 rounded-full border border-gray-300 bg-[#F6F8FB] text-xs font-semibold">AM</button>
                                        <button className="px-3 py-1 rounded-full border border-gray-300 bg-[#F6F8FB] text-xs font-semibold">PM</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end mt-2">
                            <button
                                className="bg-[#6C38B8] text-white px-8 py-2 rounded-full font-bold text-sm shadow"
                                onClick={openPayment}
                            >
                                BOOK
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Card Modal */}
            {showCardModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black opacity-40" onClick={() => setShowCardModal(false)}></div>
                    <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md p-6 z-10">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Payment</h3>
                            <button className="text-gray-500" onClick={() => setShowCardModal(false)}>✕</button>
                        </div>
                        <form onSubmit={handleCardSubmit} className="flex flex-col gap-3">
                            <label className="text-xs font-semibold">Name on card</label>
                            <input
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                className="px-3 py-2 border rounded"
                                placeholder="Jane Doe"
                                required
                            />
                            <label className="text-xs font-semibold">Card number</label>
                            <input
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                                className="px-3 py-2 border rounded"
                                placeholder="XXXX-XXXX-XXXX-XXXX"
                                maxLength={19}
                                required
                            />
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <label className="text-xs font-semibold">Expiry (MM/YY)</label>
                                    <input
                                        value={expiry}
                                        onChange={(e) => setExpiry(e.target.value)}
                                        className="px-3 py-2 border rounded w-full"
                                        placeholder="12/26"
                                        required
                                    />
                                </div>
                                <div style={{ width: 100 }}>
                                    <label className="text-xs font-semibold">CVC</label>
                                    <input
                                        value={cvc}
                                        onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
                                        className="px-3 py-2 border rounded w-full"
                                        placeholder="123"
                                        maxLength={4}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-2">
                                <div className="text-sm text-gray-600">Total: <span className="font-bold">{serviceDetails.price}</span></div>
                                <div className="flex gap-2">
                                    <button type="button" className="px-4 py-2 rounded border" onClick={() => setShowCardModal(false)}>Cancel</button>
                                    <button type="submit" className="px-4 py-2 rounded bg-[#6C38B8] text-white font-bold">Proceed</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Similar Services Section */}
            <section className="py-12 px-8">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-xl font-bold mb-4">Similar Services:</h2>
                    <div className="flex flex-col gap-6">
                        {/* Service 1 */}
                        <div className="bg-white rounded-xl shadow flex flex-row items-center p-4 gap-4">
                            {/* <Image src="/service-photos/dog2.jpg" alt="Dog Walker" width={90} height={90} className="rounded-lg object-cover" /> */}
                            <div className="flex flex-col flex-1">
                                <div className="text-lg font-bold">Dog Walker</div>
                                <div className="text-xs text-gray-500">by Michelle Thorpe</div>
                                <div className="text-xs text-gray-400 mb-2">3 years experience</div>
                                <div className="flex gap-2 mb-2">
                                    <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 rounded text-xs font-semibold"><span>★</span> 4.1</span>
                                    <span className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded text-xs font-semibold"><span>$</span> 5/h</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className="bg-pink-400 text-white text-xs font-bold px-3 py-1 rounded-full">Off 55%</span>
                                <button className="bg-[#6C38B8] text-white px-6 py-2 rounded-full font-bold text-xs flex items-center gap-2">Book Now <span className="ml-1">→</span></button>
                            </div>
                        </div>
                        {/* Service 2 */}
                        <div className="bg-white rounded-xl shadow flex flex-row items-center p-4 gap-4">
                            {/* <Image src="/service-photos/dog3.jpg" alt="Dog Sitter" width={90} height={90} className="rounded-lg object-cover" /> */}
                            <div className="flex flex-col flex-1">
                                <div className="text-lg font-bold">Dog Sitter</div>
                                <div className="text-xs text-gray-500">by Chloe Fox</div>
                                <div className="text-xs text-gray-400 mb-2">12 years experience</div>
                                <div className="flex gap-2 mb-2">
                                    <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 rounded text-xs font-semibold"><span>★</span> 5.0</span>
                                    <span className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded text-xs font-semibold"><span>$</span> 24/h</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className="bg-pink-400 text-white text-xs font-bold px-3 py-1 rounded-full">Verified</span>
                                <button className="bg-[#6C38B8] text-white px-6 py-2 rounded-full font-bold text-xs flex items-center gap-2">Book Now <span className="ml-1">→</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}