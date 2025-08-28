import Greeting from "../../components/Services/Greeting";
import BookingCard from "../../components/Services/BookingCard";
import ServiceCard from "../../components/Services/ServiceCard";
import ServiceCategoryCard from "../../components/Services/ServiceCategoryCard";
import SectionTitle from "../../components/Services/Section";

export default function Services() {
  // Example data for demonstration
  const categories = [
    { icon: "/service-icons/repair.svg", label: "Emergencies", hot: true },
    { icon: "/service-icons/petcare.svg", label: "Petcare" },
    { icon: "/service-icons/chef.svg", label: "Catering" },
    { icon: "/service-icons/electrician.png", label: "Electricians" },
    { icon: "/service-icons/locksmith.svg", label: "Locksmiths" },
    { icon: "/service-icons/photographer.png", label: "Photographers" },
    { icon: "/service-icons/tutor.png", label: "Tutors", hot: true },
    { icon: "/service-icons/florist.png", label: "Florists" },
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
  const cardWidthClass = "w-full max-w-[500px]";

  return (
    <div className="bg-[#F6F8FB] min-h-screen w-full px-15 py-15">
      <div className="bg-[#F6F8FB] min-h-screen w-full px-15 py-15">
        {/* Two columns overall: LEFT (all main content) | RIGHT (services near you) */}
        <div className="grid w-full max-w-[1200px] gap-10 md:grid-cols-2">

          {/* LEFT COLUMN — keep EVERYTHING that should stack vertically here */}
          <div className="flex flex-col gap-8 px-6 max-w-[700px]">

            <Greeting name="Test Account" />

            <div className="flex items-center bg-[#F3F0FF] rounded-lg px-4 py-2 border border-gray-200 mb-4">
              <span className="mr-2 text-lg text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search for a Service..."
                className="w-full bg-transparent outline-none text-gray-700"
              />
            </div>

            {/* Categories */}
            <div className="grid grid-cols-4 gap-3">
              {categories.map((cat) => (
                <ServiceCategoryCard
                  key={cat.label}
                  icon={cat.icon}
                  label={cat.label}
                  hot={cat.hot}
                />
              ))}
            </div>

            {/* Upcoming Bookings — now BELOW the icons */}
            <div>
              <SectionTitle>My Upcoming Bookings:</SectionTitle>
              <div className="w-full max-w-[500px]">
                <BookingCard {...upcomingBooking} onView={() => { }} />
              </div>
            </div>

            {/* Continue Browsing */}
            <div>
              <SectionTitle>Continue Browsing:</SectionTitle>
              <div className="grid gap-4">
                {continueBrowsing.map((service, idx) => (
                  <div className="w-full max-w-[500px]" key={idx}>
                    <ServiceCard {...service} onBook={() => { }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Services Near You */}
          <div className="flex flex-col gap-8 px-6">
            <SectionTitle>Services Near You:</SectionTitle>
            <div className="grid gap-4">
              {servicesNearYou.map((service, idx) => (
                <div className="w-full max-w-[500px]" key={idx}>
                  <ServiceCard {...service} onBook={() => { }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>);
}
