import { useRouter } from "next/router";

export default function EmergenciesPage() {
    const router = useRouter();

    const emergencyServices = [
        {
            id: 1,
            name: "Emergency Plumber",
            description: "24/7 emergency plumbing services for urgent repairs",
            price: "$150/hour",
            rating: 4.9,
            reviews: 342,
            image: "/service-photos/plumber.jpg",
            availability: "Available 24/7",
            responseTime: "15-30 minutes"
        },
        {
            id: 2,
            name: "Emergency Electrician",
            description: "Urgent electrical repairs and safety inspections",
            price: "$180/hour",
            rating: 4.8,
            reviews: 289,
            image: "/service-photos/electrician.jpg",
            availability: "Available 24/7",
            responseTime: "20-45 minutes"
        },
        {
            id: 3,
            name: "Emergency Locksmith",
            description: "Locked out? We can help you get back in quickly",
            price: "$120/service",
            rating: 4.7,
            reviews: 456,
            image: "/service-photos/locksmith.jpg",
            availability: "Available 24/7",
            responseTime: "10-25 minutes"
        },
        {
            id: 4,
            name: "Emergency HVAC",
            description: "Heating and cooling emergency repairs",
            price: "$200/hour",
            rating: 4.6,
            reviews: 203,
            image: "/service-photos/hvac.jpg",
            availability: "Available 24/7",
            responseTime: "30-60 minutes"
        },
        {
            id: 5,
            name: "Emergency Cleaning",
            description: "Urgent cleaning services for accidents and spills",
            price: "$100/hour",
            rating: 4.5,
            reviews: 178,
            image: "/service-photos/cleaning.jpg",
            availability: "Available 24/7",
            responseTime: "45-90 minutes"
        },
        {
            id: 6,
            name: "Emergency Pest Control",
            description: "Immediate pest control for urgent infestations",
            price: "$250/service",
            rating: 4.4,
            reviews: 134,
            image: "/service-photos/pest-control.jpg",
            availability: "Available 24/7",
            responseTime: "60-120 minutes"
        }
    ];

    const handleInstantBooking = () => {
        router.push("/instant-booking");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold mb-4">Emergency Services</h1>
                        <p className="text-xl opacity-90 mb-8">
                            24/7 urgent services when you need them most
                        </p>
                        <div className="flex justify-center">
                            <button
                                onClick={handleInstantBooking}
                                className="bg-white text-red-600 font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
                            >
                                🚨 Book Emergency Service Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {emergencyServices.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-red-100"
                        >
                            {/* Emergency Badge */}
                            <div className="bg-red-500 text-white text-center py-2 font-bold text-sm">
                                🚨 EMERGENCY SERVICE
                            </div>
                            
                            {/* Image */}
                            <div className="h-48 bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
                                <div className="text-6xl opacity-50">🚨</div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
                                <p className="text-gray-600 mb-3">{service.description}</p>
                                
                                {/* Response Time */}
                                <div className="flex items-center mb-2">
                                    <span className="text-green-600 font-semibold">⚡ Response Time: </span>
                                    <span className="ml-2 text-gray-700">{service.responseTime}</span>
                                </div>

                                {/* Rating and Price */}
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center">
                                        <span className="text-yellow-400">★</span>
                                        <span className="ml-1 text-gray-700">{service.rating}</span>
                                        <span className="ml-1 text-gray-500">({service.reviews})</span>
                                    </div>
                                    <div className="text-lg font-bold text-red-600">{service.price}</div>
                                </div>

                                {/* Availability */}
                                <div className="text-center mb-4">
                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                        {service.availability}
                                    </span>
                                </div>

                                {/* Book Button */}
                                <button
                                    onClick={handleInstantBooking}
                                    className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-all duration-200"
                                >
                                    Book Emergency Service
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Emergency Info Section */}
            <div className="bg-red-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-red-800 mb-6">How Emergency Booking Works</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="text-4xl mb-4">📞</div>
                                <h3 className="text-xl font-bold text-red-700 mb-2">1. Call or Book Online</h3>
                                <p className="text-gray-700">Contact us immediately through our emergency hotline or book online</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-4">🚗</div>
                                <h3 className="text-xl font-bold text-red-700 mb-2">2. Fast Dispatch</h3>
                                <p className="text-gray-700">Our nearest available professional is dispatched to your location</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-4">🔧</div>
                                <h3 className="text-xl font-bold text-red-700 mb-2">3. Immediate Service</h3>
                                <p className="text-gray-700">Quick resolution of your emergency with professional service</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-600 text-white py-8">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold mb-4">Need Immediate Help?</h2>
                    <p className="text-lg mb-4">Call our 24/7 emergency hotline</p>
                    <a
                        href="tel:1-800-EMERGENCY"
                        className="text-3xl font-bold hover:text-red-200 transition-colors"
                    >
                        📞 1-800-EMERGENCY
                    </a>
                </div>
            </div>
        </div>
    );
}
