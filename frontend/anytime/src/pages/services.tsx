import Greeting from "../../components/Services/Greeting";
import BookingCard from "../../components/Services/BookingCard";
import ServiceCard from "../../components/Services/ServiceCard";
import ServiceCategoryCard from "../../components/Services/ServiceCategoryCard";
import SectionTitle from "../../components/Services/Section";

export default function Services() {
  // Example data for demonstration
  const categories = [
    { icon: "🛠️", label: "Home Emergencies", hot: true },
    { icon: "🏠", label: "Pet Care" },
    { icon: "👨‍🍳", label: "Catering" },
    { icon: "🔌", label: "Electricians" },
    { icon: "🔒", label: "Locksmiths" },
    { icon: "📷", label: "Photographers" },
    { icon: "🎓", label: "Tutors", hot: true },
    { icon: "⚙️", label: "Florists" },
  ];

  const servicesNearYou = [
    {
      image: "/file.svg",
      title: "Dog Walker",
      provider: "Mary Cape",
      experience: "5 years experience",
      rating: 4.1,
      price: "$10/h",
      tag: "Off 15%",
      tagColor: "bg-pink-400",
    },
    {
      image: "/motorcycle_components/right-wheel.svg",
      title: "Electrician",
      provider: "Samuel Lee",
      experience: "10 years experience",
      rating: 5.0,
      price: "$50/h",
    },
  ];

  const upcomingBooking = {
    image: "/motorcycle_components/letters.svg",
    title: "Private Chef",
    provider: "Gordon Ramsay",
    experience: "10 years experience",
    rating: 5.0,
    price: "$1k/h",
    tag: "Verified",
    tagColor: "bg-pink-400",
  };

  const continueBrowsing = [
    {
      image: "/motorcycle_components/right-wheel.svg",
      title: "Electrician",
      provider: "Samuel Lee",
      experience: "10 years experience",
      rating: 5.0,
      price: "$50/h",
      tag: "Verified",
      tagColor: "bg-pink-400",
    },
    {
      image: "/motorcycle_components/right-wheel.svg",
      title: "Electrician",
      provider: "Samuel Lee",
      experience: "10 years experience",
      rating: 5.0,
      price: "$50/h",
    },
    {
      image: "/motorcycle_components/right-wheel.svg",
      title: "Electrician",
      provider: "Samuel Lee",
      experience: "10 years experience",
      rating: 5.0,
      price: "$50/h",
      tag: "HOT",
      tagColor: "bg-pink-400",
    },
  ];

  // Shared card width style
  const cardWidthClass = "w-full max-w-[420px]";

  return (
    <div className="bg-[#F6F8FB] min-h-screen w-full px-20 py-20">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
        {/* Left Grid */}
        <div className="flex flex-col gap-8 px-6">
          <Greeting name="Test Account" />
          <div>
            <div className="flex items-center bg-[#F3F0FF] rounded-lg px-4 py-2 border border-gray-200 mb-4">
              <span className="mr-2 text-lg text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search for a Service..."
                className="w-full bg-transparent outline-none text-gray-700"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {categories.map((cat) => (
                <ServiceCategoryCard
                  key={cat.label}
                  icon={cat.icon}
                  label={cat.label}
                  hot={cat.hot}
                />
              ))}
            </div>
          </div>
          <div>
            <SectionTitle>My Upcoming Bookings:</SectionTitle>
            <div className={cardWidthClass}>
              <BookingCard {...upcomingBooking} onView={() => {}} />
            </div>
          </div>
          <div>
            <SectionTitle>Continue Browsing:</SectionTitle>
            <div className="grid gap-4">
              {continueBrowsing.map((service, idx) => (
                <div className={cardWidthClass} key={idx}>
                  <ServiceCard {...service} onBook={() => {}} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right Grid */}
        <div className="flex flex-col gap-8 px-6">
          <SectionTitle>Services Near You:</SectionTitle>
          <div className="grid gap-4">
            {servicesNearYou.map((service, idx) => (
              <div className={cardWidthClass} key={idx}>
                <ServiceCard {...service} onBook={() => {}} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
