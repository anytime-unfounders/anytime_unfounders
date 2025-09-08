export default function ThanksForBooking() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F6F8FB]">
            <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center">
                <h1 className="text-3xl font-bold text-[#6C38B8] mb-4">Thank You for Booking!</h1>
                <p className="text-lg text-gray-700 mb-6 text-center">
                    Your booking was successful. We’ve sent you a confirmation email and your provider will be in touch soon.
                </p>
                <button
                    className="bg-[#6C38B8] text-white px-6 py-2 rounded-full font-bold text-sm shadow"
                    onClick={() => window.location.href = "/services"}
                >
                    Back to Services
                </button>
            </div>
        </div>
    );
}