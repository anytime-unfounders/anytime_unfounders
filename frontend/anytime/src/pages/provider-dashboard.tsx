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
        bio: "Hi, I'm Mary! I've been walking and caring for dogs for over 5 years, and I absolutely love spending time with them. Whether it's a playful puppy or a senior dog who enjoys a slower stroll, I tailor each walk to your pet's needs. I also make sure they get plenty of exercise, love, and treats along the way. Your dog's safety and happiness are always my top priority!",
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
            <div className="w-full bg-white flex items-center justify-between px-4 md:px-8 py-3 shadow-gray-500/40 shadow-sm md:shadow-lg">
                {/* Logo and Brand */}
                <div className="flex items-center gap-4 md:gap-8">
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 md:w-14 md:h-14">
                            <Image src="/anytimelogo.png" alt="Logo" fill className="object-contain rounded-md" />
                        </div>
                        <span className="text-lg md:text-2xl font-bold">Anytime</span>
                    </div>
                </div>
                {/* Profile & Notifications */}
                <div className="flex items-center space-x-3 md:space-x-4">
                    <div className="relative">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <div className="w-8 h-8 md:w-6 md:h-6 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-purple-600 text-sm">🔔</span>
                            </div>
                        </button>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm md:text-base">MC</span>
                    </div>
                </div>
            </div>

            {/* Provider Header Section */}
            <section className="bg-white pt-6 pb-4 flex flex-col items-center">
                {/* Welcome Section */}
                <div className="mb-4 text-center px-4">
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">Hello,</h1>
                    <h2 className="text-2xl md:text-4xl font-bold text-purple-600">{providerData.name}!</h2>
                </div>

                {/* Action Buttons: full width on small screens */}
                <div className="flex flex-wrap gap-3 md:gap-4 mb-6 px-4 justify-center w-full max-w-3xl">
                    <button
                        onClick={handleViewBookingRequests}
                        className="bg-purple-200 hover:bg-purple-300 text-purple-800 font-semibold px-4 md:px-6 py-2 rounded-full transition-all duration-200 transform hover:scale-105 text-sm md:text-base w-full sm:w-auto"
                    >
                        View Booking Requests
                    </button>
                    <button
                        onClick={handleViewInquiryMessages}
                        className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-semibold px-4 md:px-6 py-2 rounded-full transition-all duration-200 transform hover:scale-105 text-sm md:text-base w-full sm:w-auto"
                    >
                        📩 View Inquiry Messages
                    </button>
                    <button
                        onClick={handleEditServiceProfile}
                        className="bg-green-200 hover:bg-green-300 text-green-800 font-semibold px-4 md:px-6 py-2 rounded-full transition-all duration-200 transform hover:scale-105 text-sm md:text-base w-full sm:w-auto"
                    >
                        Edit Service Profile
                    </button>
                </div>

                <h1 className="text-lg md:text-4xl font-bold mb-1 text-center px-4">View Your Service.</h1>
                <p className="text-sm md:text-lg text-gray-600 mb-4 text-center px-4 max-w-2xl">Here&#39;s how your service looks to our users.</p>

                {/* Floating Guy at Top - responsive container */}
                <div className="w-full flex justify-center pt-4 px-4">
                    <div className="relative w-[220px] h-[260px] md:w-[400px] md:h-[400px]">
                        <Image src="/floatingguy.png" alt="Provider Illustration" fill className="object-contain" />
                    </div>
                </div>
            </section>

            {/* Main Service Card Section */}
            <section className="bg-[#E6E1F7] py-8 md:py-16 flex flex-col items-center px-4">
                <div className="bg-white rounded-xl shadow-xl p-4 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8 max-w-3xl w-full">
                    {/* Left: Provider Info */}
                    <div className="flex flex-row items-start md:flex-col md:items-start w-full md:w-[260px] gap-3">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="relative w-14 h-14 md:w-20 md:h-20 flex-shrink-0">
                                <Image src={providerData.profilePhoto} alt="Provider" fill className="rounded-full object-cover" />
                            </div>
                            <div className="min-w-0">
                                <div className="text-base md:text-xl font-bold truncate">{providerData.service}</div>
                                <div className="text-xs md:text-sm text-gray-500 truncate">by {providerData.name}</div>
                            </div>
                        </div>

                        <div className="flex gap-2 mb-2 flex-wrap">
                            <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 rounded text-xs md:text-sm font-semibold"><span>★</span> {providerData.rating}</span>
                            <span className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded text-xs md:text-sm font-semibold"><span>$</span> 10/h</span>
                        </div>
                        <button className="bg-[#C7B2F9] text-white px-4 py-1 rounded-lg text-xs md:text-sm font-semibold mb-2 w-full md:w-auto">Send Inquiry</button>

                        {/* Bio: clamp on small screens */}
                        <p className="text-xs md:text-sm text-gray-700 mb-2 max-h-[5.2rem] overflow-hidden md:max-h-none md:overflow-visible">
                            {providerData.bio}
                        </p>
                    </div>

                    {/* Middle: Recent Work */}
                    <div className="flex flex-row md:flex-col items-center gap-3 w-full md:w-[140px]">
                        <div className="text-sm font-semibold mb-1">Recent Work:</div>
                        <div className="grid grid-cols-2 md:grid-cols-1 gap-2 w-full">
                            <div className="relative w-full h-20 md:h-24 rounded-lg overflow-hidden">
                                <Image src="/service-photos/dog.jpg" alt="Recent Work 1" fill className="object-cover" />
                            </div>
                            <div className="relative w-full h-20 md:h-24 rounded-lg overflow-hidden">
                                <Image src="/service-photos/dog2.jpg" alt="Recent Work 2" fill className="object-cover" />
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
                            {providerData.recentWork.map((review, index) => (
                                <div key={index} className="text-xs md:text-sm text-gray-700 mb-2">
                                    <span className="font-bold">{review.reviewer}:</span> {review.hearts} {review.review}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Booking Form */}
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
                                        <option>15</option>
                                        <option>30</option>
                                        <option>45</option>
                                    </select>
                                    <div className="flex gap-2 ml-0 sm:ml-2 mt-2 sm:mt-0">
                                        <button className="px-3 py-1 rounded-full border border-gray-300 bg-[#F6F8FB] text-xs font-semibold">AM</button>
                                        <button className="px-3 py-1 rounded-full border border-gray-300 bg-[#F6F8FB] text-xs font-semibold">PM</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end mt-2">
                            <button className="bg-[#6C38B8] text-white px-6 md:px-8 py-2 rounded-full font-bold text-sm shadow">BOOK</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
