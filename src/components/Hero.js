import React from 'react'

// src/components/Hero.jsx
export default function Hero() {
    return (
        <div className="bg-white h-screen flex flex-col items-center justify-center">
            <img src="/phone-background.svg" alt="Services" className="absolute w=[1000px]" />
            <img src="/anytime-letters.svg" alt="Anytime" className="relative translate-x-1w-[1000px]" />
            <img src="/phone-border.svg" alt="Services" className="absolute w=[1000px]" />
            <img src="/left-wheel.svg" alt="Services" className="absolute w=[1000px] animate-spin origin-[30_70]" />
            <img src="/right-wheel.svg" alt="Services" className="absolute w=[1000px] " />
            <img src="/new-motorcycle.svg" alt="motorcyle" className="absolute w=[1000px]" />

        </div>
    );
}




