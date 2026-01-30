"use client";

import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
    // We use inline styles for the animations to ensure precise control over the keyframes
    // without needing an external CSS file, making this a self-contained artifact.

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-center items-center font-sans select-none">

            {/* Custom Styles for Keyframe Animations */}
            <style>
                {`
          @keyframes slide-right-left {
            0% { transform: translateX(10%); }
            100% { transform: translateX(-30%); }
          }
          
          @keyframes slide-left-right {
            0% { transform: translateX(-30%); }
            100% { transform: translateX(10%); }
          }

          .animate-row-1 {
            animation: slide-right-left 15s ease-in-out infinite alternate;
          }
          
          .animate-row-2 {
            animation: slide-left-right 15s ease-in-out infinite alternate;
          }

          .animate-row-3 {
            animation: slide-right-left 15s ease-in-out infinite alternate;
          }
        `}
            </style>

            {/* Main Text Container */}
            <div className="flex flex-col items-center justify-center w-full z-0 opacity-90">

                {/* ROW 1: READY TO (Moves Right to Left) */}
                <div className="w-full flex justify-center animate-row-1">
                    <h1 className="text-[18vw] leading-[0.8] font-black text-white whitespace-nowrap tracking-tighter">
                        READY TO
                    </h1>
                </div>

                {/* ROW 2: DISCUSS YOUR (Moves Left to Right) */}
                <div className="w-full flex justify-center animate-row-2">
                    <h1 className="text-[18vw] leading-[0.8] font-black text-white whitespace-nowrap tracking-tighter">
                        DISCUSS YOUR
                    </h1>
                </div>

                {/* ROW 3: NEXT PROJECT (Moves Right to Left) */}
                <div className="w-full flex justify-center animate-row-3">
                    <h1 className="text-[18vw] leading-[0.8] font-black text-white whitespace-nowrap tracking-tighter">
                        NEXT PROJECT
                    </h1>
                </div>

            </div>

            {/* Centered Button Overlay */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <button
                    className="group flex items-center gap-3 bg-[#EAFE7C] hover:bg-[#d9ed60] text-black px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(234,254,124,0.3)]"
                    aria-label="Work with us"
                >
                    <span className="text-lg font-medium tracking-wide">Work with us</span>
                    <ArrowUpRight
                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        strokeWidth={2.5}
                    />
                </button>
            </div>

            {/* Decorative Gradient Overlay to soften edges (optional, adds depth) */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-black/10"></div>

        </div>
    );
}
