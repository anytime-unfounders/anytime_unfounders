import Image from "next/image"
export default function AnimatedIntro() {
    return (
        <div className="flex flex-col items-center justify-center p4">

            <Image
                src="/motorcyle_components/phone.svg"
                alt="Anytime"
                width={3000}
                height={3000}
                className="object-cover rounded-lg"
            />
            <Image
                src="/motorcyle_components/anytime-letters.svg"
                alt="Anytime"
                width={3000}
                height={3000}
                className="absolute top-6 left-6"
            />
            <Image
                src="/motorcyle_components/Rectangle.svg"
                alt="Anytime"
                width={150}
                height={150}
                className="absolute top-[700px] left-[570px] animate-spin"
            />
            <Image
                src="/motorcyle_components/rightwheelcropped.svg"
                alt="Anytime"
                width={150}
                height={150}
                className="absolute top-[700px] left-[900px] animate-spin"
            />

            <Image
                src="/motorcyle_components/new-motorcycle.svg"
                alt="Anytime"
                width={3000}
                height={3000}
                className="absolute top-6 left-6 animate-[slideIn_1s_ease-in-out]"
            />


        </div>
    )
}