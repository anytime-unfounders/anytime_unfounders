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
    { icon: "/service-icons/flower.svg", label: "Florists" },
  ];

  const servicesNearYou = [
    {
      image: "/service-photos/dog.jpg",
      title: "Dog Walker",
      provider: "Mary Cape",
      experience: "5 years experience",
      rating: 4.1,
      price: "$10/h",
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
      price: "$10/h",
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

  // Shared card width style
  const cardWidthClass = "w-full max-w-[500px]";

  return (
    <div className="bg-[#F6F8FB] min-h-screen w-full px-10 py-10">
      <div className="bg-[#F6F8FB] min-h-screen w-full px-10 py-10">
        {/* Two columns overall: LEFT (all main content) | RIGHT (services near you) */}
        <div className="grid w-full max-w-none gap-5 md:grid-cols-[1.35fr_1.75fr] items-start max-md:grid-cols-1">




          {/* LEFT COLUMN — keep EVERYTHING that should stack vertically here */}
          <div className="flex flex-col gap-8 px-6 ">

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
                  <div className="w-full max-w-[700px]" key={idx}>
                    <ServiceCard {...service} onBook={() => { }} smallButton={true} shortCard={true} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Services Near You */}
          <div className="flex flex-col gap-2 px-4 w-full">
            <SectionTitle>
              <span className="text-xl font-bold">Services Near You:</span></SectionTitle>
            <div className="grid gap-4 w-full">
              {servicesNearYou.map((service, idx) => (
                <ServiceCard key={idx} {...service} onBook={() => { }} />
              ))}
            </div>
          </div>


        </div>
      </div>
    </div>);
}
