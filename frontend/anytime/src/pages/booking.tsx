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
        if (!cardName || cardNumber.length < 12 || !expiry || cvc.length < 3) {
            alert("Please enter valid card details (demo validation).");
            return;
        }
        setShowCardModal(false);
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
            {/* NavBar (matches provider-dashboard mobile) */}
            <div className="w-full bg-white flex items-center justify-between px-4 md:px-8 py-3 shadow-gray-500/40 shadow-sm md:shadow-lg">
                <div className="flex items-center gap-4 md:gap-8">
                    <div className="relative w-10 h-10 md:w-14 md:h-14">
                        <Image src="/anytimelogo.png" alt="Logo" fill className="object-contain rounded-md" />
                    </div>
                    <span className="text-lg md:text-2xl font-bold">Anytime</span>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors md:hidden">
                    <div className="flex flex-col gap-1">
                        <span className="block w-6 h-0.5 bg-gray-600"></span>
                        <span className="block w-6 h-0.5 bg-gray-600"></span>
                        <span className="block w-6 h-0.5 bg-gray-600"></span>
                    </div>
                </button>
            </div>

            {/* Header */}
            <section className="bg-white pt-6 pb-6 flex flex-col items-center px-4">
                <h1 className="text-2xl md:text-4xl font-bold mb-2 text-center">Let’s Book Your Service.</h1>
                <p className="text-sm md:text-lg text-gray-600 mb-4 text-center">Browse trusted providers and book instantly.</p>
                <div className="w-full flex justify-center pt-4">
                    <div className="relative w-[220px] h-[260px] md:w-[400px] md:h-[420px]">
                        <Image src="/floatingguy.png" alt="Booking Illustration" fill className="object-contain" />
                    </div>
                </div>
            </section>

            {/* Main Booking Card Section (stack on mobile, row on md) */}
            <section className="bg-[#E6E1F7] py-8 md:py-16 flex flex-col items-center px-4">
                <div className="bg-white rounded-xl shadow-xl p-4 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8 max-w-3xl w-full">
                    {/* Left: Provider Info */}
                    <div className="flex flex-col items-start w-full md:w-[260px]">
                        <div className="flex items-center gap-3 mb-2 w-full">
                            <div className="relative w-14 h-14 md:w-20 md:h-20 flex-shrink-0">
                                <Image src="/service-icons/mary.png" alt="Provider" fill className="rounded-full object-cover" />
                            </div>
                            <div className="min-w-0">
                                <div className="text-base md:text-xl font-bold truncate">Dog Walker</div>
                                <div className="text-xs md:text-sm text-gray-500 truncate">by Mary Cape</div>
                            </div>
                        </div>

                        <div className="flex gap-2 mb-2 flex-wrap">
                            <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 rounded text-xs md:text-sm font-semibold"><span>★</span> 4.1</span>
                            <span className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded text-xs md:text-sm font-semibold"><span>$</span> 10/hr</span>
                        </div>

                        <button className="bg-[#C7B2F9] text-white px-4 py-1 rounded-lg text-xs md:text-sm font-semibold mb-2 w-full md:w-auto">Send Inquiry</button>

                        <p className="text-xs md:text-sm text-gray-700 mb-2 max-h-[5.2rem] overflow-hidden md:max-h-none md:overflow-visible">
                            Hi, I’m Mary! 🐾 I’ve been walking and caring for dogs for over 5 years, and I absolutely love spending time with them. Whether it’s a playful puppy or a senior dog who enjoys a slower stroll, I tailor each walk to your pet’s needs. I also make sure they get plenty of exercise, love, and treats along the way. Your dog’s safety and happiness are always my top priority!
                        </p>
                    </div>

                    {/* Middle: Recent Work */}
                    <div className="flex flex-row md:flex-col items-center gap-3 w-full md:w-[140px]">
                        <div className="text-sm font-semibold mb-1">Recent Work:</div>
                        <div className="grid grid-cols-2 md:grid-cols-1 gap-2 w-full">
                            <div className="relative w-full h-20 md:h-24 rounded-lg overflow-hidden">
                                <Image src="/service-photos/dog.jpg" alt="Recent Work 1" fill className="object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Right: Reviews */}
                    <div className="flex flex-col w-full md:w-[220px]">
                        <div className="bg-[#F6F8FB] rounded-lg p-3 md:p-4 mb-2 max-h-40 md:max-h-48 overflow-auto">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-yellow-500 text-lg">★</span>
                                <span className="font-semibold">Reviews:</span>
                            </div>
                            <div className="text-xs md:text-sm text-gray-700 mb-2"><span className="font-bold">Matthius:</span> 💜💜🤍 When the dog sitter walked me it was so awesome sauce</div>
                            <div className="text-xs md:text-sm text-gray-700 mb-2"><span className="font-bold">Amogh:</span> 💜🤍🤍 She gave my obese dog 10 treats</div>
                            <div className="text-xs md:text-sm text-gray-700 mb-2"><span className="font-bold">Michelle:</span> 💜💜💜 Mary is so sweet! She brought my dog some yummy treats :)</div>
                            <div className="text-xs md:text-sm text-gray-700"><span className="font-bold">Alyssa:</span> 💜💜💜 Lovely Service.</div>
                        </div>
                    </div>
                </div>

                {/* Booking Form - mobile-first layout like provider-dashboard */}
                <div className="bg-white rounded-xl shadow p-4 md:p-6 mt-4 md:mt-6 flex flex-col gap-4 max-w-3xl w-full">
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex flex-col gap-2 w-full md:w-1/2">
                                <label className="text-xs font-semibold mb-1">DATE</label>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 rounded-full border border-gray-300 bg-[#F6F8FB] text-xs font-semibold">Today</button>
                                    <select className="px-3 py-1 rounded-full border border-gray-300 bg-[#F6F8FB] text-xs font-semibold w-full">
                                        <option>Select Date</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 w-full md:w-1/2">
                                <label className="text-xs font-semibold mb-1">TIME</label>
                                <div className="flex gap-2 items-center flex-wrap">
                                    <input type="number" min="1" max="12" className="w-16 px-2 py-1 rounded-full border border-gray-300 bg-[#F6F8FB] text-xs font-semibold" placeholder="--" />
                                    <span className="hidden sm:inline">:</span>
                                    <select className="px-2 py-1 rounded-full border border-gray-300 bg-[#F6F8FB] text-xs font-semibold">
                                        <option>00</option>
                                    </select>
                                    <div className="flex gap-2 ml-0 sm:ml-2 mt-2 sm:mt-0 w-full sm:w-auto">
                                        <button className="px-3 py-1 rounded-full border border-gray-300 bg-[#F6F8FB] text-xs font-semibold w-full sm:w-auto">AM</button>
                                        <button className="px-3 py-1 rounded-full border border-gray-300 bg-[#F6F8FB] text-xs font-semibold w-full sm:w-auto">PM</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end mt-2 w-full">
                            <button
                                className="bg-[#6C38B8] text-white px-6 md:px-8 py-2 rounded-full font-bold text-sm shadow w-full sm:w-auto"
                                onClick={openPayment}
                            >
                                BOOK
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Card Modal (responsive) */}
            {showCardModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black opacity-40" onClick={() => setShowCardModal(false)}></div>
                    <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md p-6 z-10 mx-4 md:mx-0 max-h-[90vh] overflow-auto">
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
                            <div className="flex flex-col sm:flex-row gap-2">
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
                                <div className="sm:w-28">
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

                            <div className="flex flex-col sm:flex-row justify-between items-center mt-2 gap-2">
                                <div className="text-sm text-gray-600">Total: <span className="font-bold">{serviceDetails.price}</span></div>
                                <div className="flex gap-2 w-full sm:w-auto">
                                    <button type="button" className="px-4 py-2 rounded border w-1/2 sm:w-auto" onClick={() => setShowCardModal(false)}>Cancel</button>
                                    <button type="submit" className="px-4 py-2 rounded bg-[#6C38B8] text-white font-bold w-1/2 sm:w-auto">Proceed</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Similar Services */}
            <section className="py-8 md:py-12 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-lg md:text-xl font-bold mb-4">Similar Services:</h2>
                    <div className="flex flex-col gap-4">
                        <div className="bg-white rounded-xl shadow flex flex-col md:flex-row items-center p-4 gap-4">
                            <div className="flex flex-col flex-1">
                                <div className="text-lg font-bold">Dog Walker</div>
                                <div className="text-xs text-gray-500">by Michelle Thorpe</div>
                                <div className="text-xs text-gray-400 mb-2">3 years experience</div>
                                <div className="flex gap-2 mb-2">
                                    <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 rounded text-xs font-semibold"><span>★</span> 4.1</span>
                                    <span className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded text-xs font-semibold"><span>$</span> 5/h</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                                <span className="bg-pink-400 text-white text-xs font-bold px-3 py-1 rounded-full">Off 55%</span>
                                <button className="bg-[#6C38B8] text-white px-6 py-2 rounded-full font-bold text-xs flex items-center gap-2 w-full md:w-auto">Book Now <span className="ml-1">→</span></button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow flex flex-col md:flex-row items-center p-4 gap-4">
                            <div className="flex flex-col flex-1">
                                <div className="text-lg font-bold">Dog Sitter</div>
                                <div className="text-xs text-gray-500">by Chloe Fox</div>
                                <div className="text-xs text-gray-400 mb-2">12 years experience</div>
                                <div className="flex gap-2 mb-2">
                                    <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 rounded text-xs font-semibold"><span>★</span> 5.0</span>
                                    <span className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded text-xs font-semibold"><span>$</span> 24/h</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                                <span className="bg-pink-400 text-white text-xs font-bold px-3 py-1 rounded-full">Verified</span>
                                <button className="bg-[#6C38B8] text-white px-6 py-2 rounded-full font-bold text-xs flex items-center gap-2 w-full md:w-auto">Book Now <span className="ml-1">→</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}