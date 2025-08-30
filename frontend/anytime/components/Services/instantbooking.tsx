import Image from "next/image";
import { useRouter } from "next/router";

export default function InstantBookingCard() {
    const router = useRouter();
    return (
        <div className="w-full max-w-[900px] mx-auto mb-8">
            <div className="bg-white rounded-2xl shadow-xl flex flex-row items-center p-8 gap-8 border border-[#E6E1F7]">

                <div className="flex flex-col flex-1">
                    <div className="text-3xl font-bold mb-2">Instant Booking</div>


                </div>
            </div>

        </div>

    );
}
