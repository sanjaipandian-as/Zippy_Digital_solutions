"use client";

import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Linkedin, Twitter, Dribbble } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Team from './Team';

const ArrowOctagonIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block w-[0.85em] h-[0.85em] mx-[0.2em] lg:mx-[0.1em] align-baseline -mb-[0.05em]">
        <path fillRule="evenodd" clipRule="evenodd" d="M7.5 2L2 7.5V16.5L7.5 22H16.5L22 16.5V7.5L16.5 2H7.5Z" fill="black" />
        <path d="M7 17L17 7M17 7H10M17 7V14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const HexClusterIcon = () => (
    <svg viewBox="35 35 110 110" xmlns="http://www.w3.org/2000/svg" className="inline-block w-[0.8em] h-[0.8em] mr-[0.25em] align-baseline -mb-[0.05em] text-black">
        <rect x="40" y="40" width="100" height="25" rx="8" fill="currentColor" />
        <rect x="55" y="75" width="70" height="25" rx="8" fill="currentColor" />
        <rect x="70" y="110" width="40" height="25" rx="8" fill="currentColor" />
    </svg>
);

const GrainOverlay = () => (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.035] mix-blend-multiply">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <filter id="noiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
    </div>
);

const WordReveal = ({ text, delay = 0 }) => {
    const words = text.split(" ");
    return (
        <span className="inline-block overflow-hidden">
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    className="inline-block mr-[0.3em] font-medium"
                    initial={{ y: "100%", opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.8,
                        delay: delay + i * 0.05,
                        ease: [0.215, 0.61, 0.355, 1],
                    }}
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
};

const ProjectShowcase = () => {
    const projects = [
        // Column 1
        {
            id: 1,
            title: "WeChange",
            src: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80",
            description: "Fintech Crypto On/Off-Ramp",
            aspect: "aspect-[16/10]"
        },
        {
            id: 3,
            title: "GrowHub",
            src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
            description: "AI Platform B2B Matching Engine",
            aspect: "aspect-[16/10]"
        },
        {
            id: 6,
            title: "Evominter",
            src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
            description: "Financial Solutions",
            aspect: "aspect-[16/10]"
        },
        {
            id: 7,
            title: "Zippy Digital",
            src: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&w=800&q=80",
            description: "Digital Innovation Hub",
            aspect: "aspect-[16/10]"
        },
        // Column 2
        {
            id: 2,
            title: "Eneftro",
            src: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&w=800&q=80",
            description: "NFT Marketplace",
            // Making Eneftro slightly taller or just distinct as per screenshot
            aspect: "aspect-[3/4]"
        },
        {
            id: 4,
            title: "Otthon",
            src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
            description: "Real Estate Platform",
            aspect: "aspect-[16/10]"
        },
        {
            id: 5,
            title: "Budai Probaterem",
            src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
            description: "Music Studio Booking",
            aspect: "aspect-[16/10]"
        }
    ];

    const shrinkVariants = {
        initial: { opacity: 0, scale: 1.15, filter: "blur(20px)", y: 40 },
        animate: {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            y: 0,
            transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
        },
        exit: { opacity: 0, scale: 0.9, filter: "blur(10px)", transition: { duration: 0.8, ease: "circIn" } }
    };

    const trackingVariants = {
        hidden: { letterSpacing: "0.25em" },
        visible: {
            letterSpacing: "-0.05em",
            transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }
        }
    };

    // Split projects into two columns
    const column1 = [projects[0], projects[1], projects[2], projects[3]];
    const column2 = [projects[4], projects[5], projects[6]];

    return (
        <section className="w-full min-h-full bg-[#E5E5E5] flex flex-col px-6 sm:px-10 lg:px-14 pt-4 pb-10 lg:pb-20 overflow-hidden relative font-sans cursor-default">
            <GrainOverlay />

            <div className="z-20 pt-0 mb-12">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="block text-xs sm:text-sm lg:text-base font-bold tracking-[0.4em] lg:tracking-[0.5em] uppercase text-gray-400 mb-2">
                        Projects
                    </span>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bebas font-black uppercase text-black tracking-tight leading-none">
                        CHECKOUT OUR SERVICES
                    </h3>
                </motion.div>
            </div>

            {/* --- MAIN TYPOGRAPHY SECTION --- */}
            <div className="w-full z-10 relative mb-10 lg:mb-20">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between font-bebas font-black uppercase leading-[0.8] tracking-[-0.03em] select-none">

                    {/* Left Side: Big Text */}
                    <div className="flex flex-col gap-1 sm:gap-2 lg:gap-4">
                        {/* Group 1: WE HAVE COMPLETED MORE THAN 100 */}
                        <div className="flex flex-col gap-1 sm:gap-2 lg:gap-4">
                            {/* Line 1: WE HAVE COMPLETED (White) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="text-white text-[9.5vw] sm:text-[12.5vw] lg:text-[11.5vw] whitespace-normal md:whitespace-nowrap leading-[0.8]"
                            >
                                WE HAVE COMPLETED
                            </motion.div>

                            {/* Line 2: MORE THAN [Icon] 100 (White text, Black 100) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="flex flex-wrap items-center text-[9.5vw] sm:text-[12.5vw] lg:text-[11.5vw] whitespace-normal md:whitespace-nowrap leading-[0.8]"
                            >
                                <span className="text-white mr-[0.2em]">MORE THAN</span>
                                <div className="inline-flex items-center text-black">
                                    <ArrowOctagonIcon />
                                    <span className="ml-[0.1em]">50+</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Group 2: EXCEPTIONAL PROJECTS */}
                        <div className="flex flex-col gap-1 sm:gap-2 lg:gap-4">
                            {/* Line 3: EXCEPTIONAL (Black) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-black text-[9.5vw] sm:text-[12.5vw] lg:text-[11.5vw] leading-[0.8]"
                            >
                                REAL WORLD
                            </motion.div>

                            {/* Line 4: [Icon] PROJECTS. (Black) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="flex flex-wrap items-center text-black text-[9.5vw] sm:text-[12.5vw] lg:text-[11.5vw] leading-[0.8]"
                            >
                                <HexClusterIcon />
                                <span>PROJECTS.</span>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Side: Description Text (Aligned to bottom right) */}
                    <div className="mt-8 lg:mt-0 lg:mb-4 lg:ml-10 max-w-[280px] sm:max-w-xs md:max-w-lg text-left self-start lg:self-end">
                        <p className="text-xl sm:text-2xl md:text-3xl font-bebas text-black leading-[0.85] tracking-wide uppercase">
                            <WordReveal
                                delay={0.6}
                                text="We engineer sophisticated digital platforms that go far beyond visuals. Our team builds intuitive, high-performance websites and applications designed to engage and retain users."
                            />
                        </p>
                    </div>
                </div>
            </div>



        </section>
    );
};



export default function Industries() {
    return (
        <div id="our-work">
            <ProjectShowcase />
        </div>
    );
}
