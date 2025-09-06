import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function ProviderDashboard() {
    const router = useRouter();

    // Mock provider data - in real app this would come from API/database
    const [providerData] = useState({
        name: "Test Account",
        service: "Dog Walker",
        rating: 4.1,
        totalEarnings: "$10.7k",
        profilePhoto: "/service-icons/mary.png",
        coverPhoto: "/service-photos/dog.jpg",
        bio: "Hi, I'm Mary! � I've been walking and caring for dogs for over 5 years, and I absolutely love spending time with them. Whether it's a playful puppy or a senior dog who enjoys a slower stroll, I tailor each walk to your pet's needs. I also make sure they get plenty of exercise, love, and treats along the way. Your dog's safety and happiness are always my top priority!",
        recentWork: [
            {
                reviewer: "Matthius",
                rating: 5,
                review: "When the dog sitter walked me it was so awesome sauce",
                hearts: "💜💜🤍"
            },
            {
                reviewer: "Amogh",
                rating: 4,
                review: "She gave my obese dog 10 treats",
                hearts: "💜🤍🤍"
            },
            {
                reviewer: "Michelle",
                rating: 5,
                review: "Mary is so sweet! She brought my dog some yummy treats :)",
                hearts: "💜💜💜"
            },
            {
                reviewer: "Alyssa",
                rating: 5,
                review: "Lovely Service.",
                hearts: "💜💜💜"
            }
        ],
        availability: "Available Today",
        responseTime: "Usually responds within 2 hours"
    });

    const handleViewBookingRequests = () => {
        router.push("/provider/booking-requests");
    };

    const handleViewInquiryMessages = () => {
        router.push("/provider/messages");
    };

    const handleEditServiceProfile = () => {
        router.push("/provider/edit-profile");
    };

    return (
        <div className="min-h-screen bg-[#F6F8FB] flex flex-col">
            {/* NavBar */}
            <div className="w-full bg-white flex items-center justify-between px-8 py-4 shadow-gray-500/60 shadow-lg">
                {/* Logo and Brand */}
                <div className="flex items-center gap-8 ml-17">
                    <img src="/anytimelogo.png" alt="Logo" className="h-20 w-20" />
                    <span className="text-4xl font-bold">Anytime</span>
                </div>
                {/* Profile & Notifications */}
                <div className="flex items-center space-x-4 mr-17">
                    <div className="relative">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-purple-600 text-sm">🔔</span>
                            </div>
                        </button>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">MC</span>
                    </div>
                </div>
            </div>

            {/* Provider Header Section */}
            <section className="bg-white pt-8 pb-4 flex flex-col items-center">
                {/* Welcome Section */}
                <div className="mb-6">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
                        Hello,
                    </h1>
                    <h2 className="text-4xl font-bold text-purple-600 text-center">
                        {providerData.name}!
                    </h2>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <button
                        onClick={handleViewBookingRequests}
                        className="bg-purple-200 hover:bg-purple-300 text-purple-800 font-semibold px-6 py-3 rounded-full transition-all duration-200 transform hover:scale-105"
                    >
                        View Booking Requests
                    </button>
                    <button
                        onClick={handleViewInquiryMessages}
                        className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-semibold px-6 py-3 rounded-full transition-all duration-200 transform hover:scale-105"
                    >
                        📩 View Inquiry Messages
                    </button>
                    <button
                        onClick={handleEditServiceProfile}
                        className="bg-green-200 hover:bg-green-300 text-green-800 font-semibold px-6 py-3 rounded-full transition-all duration-200 transform hover:scale-105"
                    >
                        Edit Service Profile
                    </button>
                </div>

                <h1 className="text-4xl font-bold mb-2 text-center">View Your Service.</h1>
                <p className="text-lg text-gray-600 mb-6 text-center">Here's how your service looks to our users.</p>
                {/* Floating Guy at Top */}
                <div className="w-full flex justify-center pt-8">
                    <Image src="/floatingguy.png" alt="Provider Illustration" width={400} height={600} />
                </div>
            </section>

            {/* Main Service Card Section */}
            <section className="bg-[#E6E1F7] py-16 flex flex-col items-center">
                <div className="bg-white rounded-xl shadow-xl p-8 flex flex-row gap-8 max-w-3xl w-full">
                    {/* Left: Provider Info */}
                    <div className="flex flex-col items-start w-[260px]">
                        <div className="flex items-center gap-4 mb-2">
                            <Image src={providerData.profilePhoto} alt="Provider" width={70} height={70} className="rounded-full object-cover" />
                            <div>
                                <div className="text-xl font-bold">{providerData.service}</div>
                                <div className="text-sm text-gray-500">by {providerData.name}</div>
                            </div>
                        </div>
                        <div className="flex gap-2 mb-2">
                            <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 rounded text-sm font-semibold"><span>★</span> {providerData.rating}</span>
                            <span className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded text-sm font-semibold"><span>$</span> 10/h</span>
                        </div>
                        <button className="bg-[#C7B2F9] text-white px-4 py-1 rounded-lg text-sm font-semibold mb-2">Send Inquiry</button>
                        <p className="text-xs text-gray-700 mb-2">
                            {providerData.bio}
                        </p>
                    </div>
                    {/* Middle: Recent Work */}
                    <div className="flex flex-col items-center gap-2 w-[140px]">
                        <div className="text-sm font-semibold mb-1">Recent Work:</div>
                        <div className="grid grid-cols-1 gap-2">
                            <Image src="/service-photos/dog.jpg" alt="Recent Work 1" width={90} height={90} className="rounded-lg object-cover" />
                            <Image src="/service-photos/dog2.jpg" alt="Recent Work 2" width={90} height={90} className="rounded-lg object-cover" />
                        </div>
                    </div>
                    {/* Right: Reviews */}
                    <div className="flex flex-col w-[220px]">
                        <div className="bg-[#F6F8FB] rounded-lg p-4 mb-2">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-yellow-500 text-xl">★</span>
                                <span className="font-semibold">Reviews:</span>
                            </div>
                            {providerData.recentWork.map((review, index) => (
                                <div key={index} className="text-xs text-gray-700 mb-1">
                                    <span className="font-bold">{review.reviewer}:</span> {review.hearts} {review.review}
                                </div>
                            ))}
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
                                        <option>15</option>
                                        <option>30</option>
                                        <option>45</option>
                                    </select>
                                    <div className="flex gap-2 ml-2">
                                        <button className="px-3 py-1 rounded-full border border-gray-300 bg-[#F6F8FB] text-xs font-semibold">AM</button>
                                        <button className="px-3 py-1 rounded-full border border-gray-300 bg-[#F6F8FB] text-xs font-semibold">PM</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end mt-2">
                            <button className="bg-[#6C38B8] text-white px-8 py-2 rounded-full font-bold text-sm shadow">BOOK</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
