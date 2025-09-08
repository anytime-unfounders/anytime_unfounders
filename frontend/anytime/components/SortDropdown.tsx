import { useState } from "react";

export default function SortDropdown() {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative inline-block">
            <button
                onClick={() => setOpen(!open)}
                className="bg-gray-100 rounded-xl px-6 py-2 flex items-center gap-2 shadow-sm"
            >
                Sort
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path d="M6 8l4 4 4-4" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            {open && (
                <div className="absolute left-0 mt-2 w-32 bg-white rounded-xl shadow-lg z-10">
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Price</button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Rating</button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Experience</button>
                </div>
            )}
        </div>
    );
}
