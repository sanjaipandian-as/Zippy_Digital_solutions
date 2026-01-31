"use client";

import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import AnimatedContactReveal from './AnimatedContactReveal';

export default function Footer() {
  // We use inline styles for the animations to ensure precise control over the keyframes
  // without needing an external CSS file, making this a self-contained artifact.

  return (
    <div id="contact" className="relative w-full h-[100vh] bg-black overflow-hidden flex flex-col justify-center items-center font-sans select-none">

      {/* Custom Styles for Keyframe Animations */}
      <style>
        {`
          @keyframes slide-right-left {
            0% { transform: translate3d(10%, 0, 0); }
            100% { transform: translate3d(-30%, 0, 0); }
          }
          
          @keyframes slide-left-right {
            0% { transform: translate3d(-30%, 0, 0); }
            100% { transform: translate3d(10%, 0, 0); }
          }

          .animate-row-1, .animate-row-2, .animate-row-3 {
            will-change: transform;
            backface-visibility: hidden;
            transform: translateZ(0);
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
      <div className="flex flex-col items-center justify-between md:justify-center h-[80vh] md:h-auto py-14 md:py-0 w-full z-0 opacity-90">

        <div className="flex flex-col items-center md:gap-0">
          {/* ROW 1: READY TO (Moves Right to Left) */}
          <div className="w-full flex justify-center animate-row-1">
            <h1 className="text-[22vw] md:text-[18vw] leading-[0.85] md:leading-[0.8] font-black text-white whitespace-nowrap tracking-tighter">
              READY TO
            </h1>
          </div>

          {/* ROW 2: DISCUSS YOUR (Moves Left to Right) */}
          <div className="w-full flex justify-center animate-row-2">
            <h1 className="text-[22vw] md:text-[18vw] leading-[0.85] md:leading-[0.8] font-black text-white whitespace-nowrap tracking-tighter">
              DISCUSS YOUR
            </h1>
          </div>
        </div>

        {/* This gap in the middle is where the button will sit naturally on mobile */}

        {/* ROW 3: NEXT PROJECT (Moves Right to Left) */}
        <div className="w-full flex justify-center animate-row-3">
          <h1 className="text-[22vw] md:text-[18vw] leading-[0.85] md:leading-[0.8] font-black text-white whitespace-nowrap tracking-tighter">
            NEXT PROJECT
          </h1>
        </div>
      </div>

      {/* Animated Contact Reveal Component */}
      <AnimatedContactReveal />


      {/* Decorative Gradient Overlay to soften edges (optional, adds depth) */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-black/10"></div>

    </div>
  );
}
