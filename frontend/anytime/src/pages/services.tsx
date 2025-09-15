import Greeting from "../../components/Services/Greeting";
import BookingCard from "../../components/Services/BookingCard";
import ServiceCard from "../../components/Services/ServiceCard";
import ServiceCategoryCard from "../../components/Services/ServiceCategoryCard";
import SectionTitle from "../../components/Services/Section";
import SortDropdown from "../../components/Services/SortDropdown";
import { useRouter } from "next/router";
import { useState } from "react";

function ServicesPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentView, setCurrentView] = useState("Customers");

  // Example data for demonstration
  const categories = [
    { icon: "/service-icons/repair.svg", label: "Plumbing", hot: true },
    { icon: "/service-icons/petcare.svg", label: "Petcare" },
    { icon: "/service-icons/chef.svg", label: "Catering" },
    { icon: "/service-icons/electrician.png", label: "Electricians" },
    { icon: "/service-icons/locksmith.svg", label: "Locksmiths" },
    { icon: "/service-icons/photographer.png", label: "Photographers" },
    { icon: "/service-icons/tutor.png", label: "Tutors", hot: true },
    { icon: "/service-icons/flower.svg", label: "Florists" },
  ];

  const servicesNearYou = [
    {
      image: "/service-photos/dog.jpg",
      title: "Dog Walker",
      provider: "Mary Cape",
      experience: "5 years experience",
      rating: 4.1,
      price: "$10/hr",
      tag: "-15%",
      tagColor: "bg-pink-400",
    },
    {
      image: "/service-photos/electrician.jpg",
      title: "Electrician",
      provider: "Samuel Lee",
      experience: "10 years experience",
      rating: 5.0,
      price: "$50/h",
    },
    {
      image: "/service-photos/babysitter.jpg",
      title: "Babysitter",
      provider: "Seraphina Gomez",
      experience: "20 years experience",
      rating: 5.0,
      price: "$28/h",
    },
    {
      image: "/service-photos/dogtrainer.jpg",
      title: "Dog Trainer",
      provider: "Lily Hemmingway",
      experience: "35 years experience",
      rating: 5.0,
      price: "$50/h",
    },
    {
      image: "/service-photos/babysitter2.jpg",
      title: "Babysitter",
      provider: "Sarah Johnson",
      experience: "2 years experience",
      rating: 3.0,
      price: "$18/h",
    },
  ];

  const upcomingBooking = {
    image: "/service-photos/chef.jpg",
    title: "Private Chef",
    provider: "Marques Jacob",
    experience: "10 years experience",
    rating: 5.0,
    price: "$460/h",
    tag: "Verified",
    tagColor: "bg-pink-400",
  };

  const continueBrowsing = [
    {
      image: "/service-photos/barista.jpg",
      title: "Personal Barista",
      provider: "Tiffony Blyeur",
      experience: "5 years experience",
      rating: 4.2,
      price: "$10/hr",
      tag: "Verified",
      tagColor: "bg-pink-400",
    },
    {
      image: "/service-photos/chef2.jpg",
      title: "Personal Chef",
      provider: "Susanne Baker",
      experience: "3 years experience",
      rating: 4.9,
      price: "$23/h",
    },
    {
      image: "/service-photos/chef3.jpg",
      title: "Nutritionist",
      provider: "Sophia Turner",
      experience: "17 years experience",
      rating: 4.0,
      price: "$50/h",
      tag: "HOT",
      tagColor: "bg-pink-400",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F8FB]">
      {/* Top right dropdown button */}
      <div className="absolute top-10 right-12 z-20">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-[#8B46F6] hover:bg-[#6C38B8] text-white font-semibold px-4 py-2 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
          >
            {currentView}
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-30">
              <button
                onClick={() => {
                  setCurrentView("Customers");
                  setDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${currentView === "Customers" ? "bg-purple-50 text-[#8B46F6] font-semibold" : "text-gray-700"
                  }`}
              >
                Customers
              </button>
              <button
                onClick={() => {
                  setCurrentView("Providers");
                  setDropdownOpen(false);
                  router.push("/signup");
                }}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${currentView === "Providers" ? "bg-purple-50 text-[#8B46F6] font-semibold" : "text-gray-700"
                  }`}
              >
                Providers
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main content with responsive padding */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-6 md:py-8">
        {/* Responsive grid layout */}
        <div className="grid w-full gap-5 lg:grid-cols-[1fr_1.2fr] xl:grid-cols-[1fr_1.3fr] items-start">
          {/* LEFT COLUMN — keep EVERYTHING that should stack vertically here */}
          <div className="flex flex-col gap-6 md:gap-8 px-0 sm:px-2 md:px-4">
            <Greeting name="Test Account" />

            <div className="flex items-center bg-[#F3F0FF] rounded-lg px-4 py-2 border border-gray-200">
              <span className="mr-2 text-lg text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search for a Service..."
                className="w-full bg-transparent outline-none text-gray-700"
              />
            </div>

            {/* Categories with responsive grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
              {categories.map((cat) => (
                <ServiceCategoryCard
                  key={cat.label}
                  icon={cat.icon}
                  label={cat.label}
                />
              ))}
            </div>

            {/* Upcoming Bookings */}
            <div>
              <SectionTitle>My Upcoming Bookings:</SectionTitle>
              <div className="w-full">
                <BookingCard {...upcomingBooking} onView={() => { }} />
              </div>
            </div>

            {/* Continue Browsing */}
            <div>
              <SectionTitle>Continue Browsing:</SectionTitle>
              <div className="grid gap-4">
                {continueBrowsing.map((service, idx) => (
                  <div className="w-full" key={idx}>
                    <ServiceCard
                      {...service}
                      onBook={() => router.push("/booking")}
                      smallButton={true}
                      shortCard={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Services Near You */}
          <div className="flex flex-col gap-2 px-0 sm:px-2 w-full mt-6 lg:mt-0">
            <div className="flex justify-between items-center mb-2">
              <div className="block lg:hidden">
                <SectionTitle>
                  <span className="text-lg sm:text-xl font-bold">
                    Services Near You:
                  </span>
                </SectionTitle>
              </div>
              <SortDropdown />
            </div>
            <div className="hidden lg:block">
              <SectionTitle>
                <span className="text-xl font-bold">Services Near You:</span>
              </SectionTitle>
            </div>
            <div className="grid gap-4 w-full">
              {servicesNearYou.map((service, idx) => (
                <ServiceCard
                  key={idx}
                  {...service}
                  onBook={() => router.push("/booking")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;
