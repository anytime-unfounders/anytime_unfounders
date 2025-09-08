import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect } from "react";

export default function ConfirmBooking() {
    const router = useRouter();
    const { service, provider, price } = router.query as { service?: string; provider?: string; price?: string };

    useEffect(() => {
        // simple guard: if required info missing, go back to booking
        if (!service || !provider) {
            router.replace("/booking");
        }
    }, [service, provider, router]);

    function handleConfirm() {
        // In a real app you'd send booking/payment info to your server here
        router.push("/thanksforbooking");
    }

    function handleCancel() {
        router.back();
    }

    return (
        <div className="min-h-screen bg-[#F6F8FB] flex items-center justify-center p-8">
            <div className="bg-white rounded-xl shadow-xl p-8 max-w-xl w-full">
                <h1 className="text-2xl font-bold mb-4">Confirm your booking</h1>
                <div className="mb-4">
                    <div className="text-sm text-gray-600">Service</div>
                    <div className="text-lg font-semibold">{service}</div>
                </div>
                <div className="mb-4">
                    <div className="text-sm text-gray-600">Provider</div>
                    <div className="text-lg font-semibold">{provider}</div>
                </div>
                <div className="mb-6">
                    <div className="text-sm text-gray-600">Price</div>
                    <div className="text-lg font-semibold">{price}</div>
                </div>

                <div className="mb-6 text-gray-700">
                    Are you sure you want to book this service?
                </div>

                <div className="flex justify-end gap-3">
                    <button className="px-4 py-2 rounded border" onClick={handleCancel}>Cancel</button>
                    <button className="px-6 py-2 rounded bg-[#6C38B8] text-white font-bold" onClick={handleConfirm}>Yes, confirm</button>
                </div>
            </div>
        </div>
    );
}