"use client";


import Image from "next/image"
import { motion, Variants } from "framer-motion";
import React from "react";

type AnimatedIntroProps = {
    size?: number;
    delay?: number;
    fromX?: NumberConstructor;
};

const slideInFromLeft = (fromX: number, delay: number): Variants => ({
    initial: { x: -fromX, opacity: 0 },
    animate: {
        x: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 60, damping: 18, delay },
    },
});

export default function AnimatedIntro({
    size = 3000,
    delay = 1.0,
    fromX = 150,
}: AnimatedIntroProps) {
    return (
        <div className="relative flex min-h-[520px] w-full items-center justify-center p-4 overflow-hidden">



            {/* Background phone / letters */}
            <Image
                src="/motorcycle_components/phone.svg"
                alt="Anytime app phone mock"
                width={size}
                height={size}
                priority
                className="object-cover rounded-lg"
            />

            <Image
                src="/motorcycle_components/anytime-letters.svg"
                alt="Anytime letters"
                width={size}
                height={size}
                className="absolute top-[10px] left-[100px]"
            />

            {/* Wheels */}
            <Image
                src="/motorcycle_components/Rectangle.svg"
                alt="Wheel"
                width={150}
                height={150}
                className="absolute top-[700px] left-[570px] animate-spin"
            />

            <Image
                src="/motorcycle_components/rightwheel.svg"
                alt="Wheel"
                width={150}
                height={150}
                className="absolute top-[690px] left-[880px] animate-spin"
            />


            {/* Motorcycle sliding in */}
            <motion.div
                variants={slideInFromLeft(fromX, delay)}
                initial="initial"
                animate="animate"
                className="absolute top-6 left-3"
            >
                <Image
                    src="/motorcycle_components/new-motorcycle.svg"
                    alt="Delivery scooter"
                    width={size}
                    height={size}
                    className="ease-in-out duration-500"
                    priority
                />
            </motion.div>

        </div>
    );
}