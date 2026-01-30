"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react';

const teamMembers = [
    {
        id: 1,
        name: "David Okyere",
        role: "Senior Consultant • Africa & Middle East",
        bio: "David specializes in operational efficiency and has helped over 50 startups streamline their workflows. His approach combines data-driven insights with human-centric design.",
        tags: ["Operations", "Lean Management", "Consulting"],
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
        socials: { linkedin: "#", twitter: "#" }
    },
    {
        id: 2,
        name: "Sarah Jenkins",
        role: "Head of Product • Europe",
        bio: "With a background in cognitive psychology, Sarah builds products that feel natural. She leads our European design division with a focus on accessibility.",
        tags: ["Product", "UX Research", "Strategy"],
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
        socials: { linkedin: "#", instagram: "#" }
    },
    {
        id: 3,
        name: "Michael Chen",
        role: "Tech Lead • Asia Pacific",
        bio: "Michael is a full-stack wizard who turns complex requirements into elegant code. He ensures our technical architecture is scalable and future-proof.",
        tags: ["Engineering", "Cloud Arch", "DevOps"],
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
        socials: { twitter: "#", github: "#" }
    },
    {
        id: 4,
        name: "Emily Rodriguez",
        role: "Creative Director • Americas",
        bio: "Emily brings brands to life through compelling visual storytelling. Her work has been featured in major design publications across the globe.",
        tags: ["Design", "Branding", "Art Direction"],
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
        socials: { instagram: "#", linkedin: "#" }
    }
];

export default function Team() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const handleNext = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % teamMembers.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
    };

    const cardVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 200 : -200,
            opacity: 0,
            scale: 0.9,
            filter: "blur(4px)",
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 200 : -200,
            opacity: 0,
            scale: 0.9,
            filter: "blur(4px)",
        })
    };

    return (
        <section className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex flex-col lg:flex-row">

            {/* Left Content - White Background with Slant */}
            <div className="relative w-full lg:w-[55%] bg-white h-full min-h-0 lg:min-h-screen p-6 md:p-16 flex flex-col justify-center z-10">

                <div className="max-w-xl">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4 block"
                    >
                        Zippyy Digital Solutions
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-black leading-[0.9] text-black mb-6"
                    >
                        Company
                        <span className="block text-[#ccff00]" style={{ textShadow: '2px 2px 0px #000' }}>Team</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-600 mb-12 max-w-sm"
                    >
                        We're a global consultancy helping the world's most ambitious change makers define the future.
                    </motion.p>

                    {/* Thumbnails */}
                    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                        {teamMembers.map((member, index) => (
                            <motion.button
                                key={member.id}
                                onClick={() => {
                                    setDirection(index > activeIndex ? 1 : -1);
                                    setActiveIndex(index);
                                }}
                                className={`relative w-20 h-24 md:w-24 md:h-32 rounded-2xl overflow-hidden flex-shrink-0 transition-all duration-300 ${activeIndex === index ? 'ring-4 ring-[#ccff00] ring-offset-2' : 'opacity-50 hover:opacity-100'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover ml-0"
                                />
                                {activeIndex === index && (
                                    <div className="absolute inset-0 bg-[#ccff00]/20 mix-blend-overlay" />
                                )}
                            </motion.button>
                        ))}
                    </div>

                    <div className="mt-12 flex gap-4">
                        <button
                            onClick={handlePrev}
                            className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-[#ccff00] transition-colors"
                        >
                            <ArrowRight className="rotate-180" size={20} />
                        </button>
                        <button
                            onClick={handleNext}
                            className="w-12 h-12 rounded-full bg-[#ccff00] text-black flex items-center justify-center hover:bg-black hover:text-[#ccff00] transition-colors"
                        >
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Content - Dark Background Card Display */}
            <div className="relative w-full lg:w-[45%] h-auto lg:h-screen flex flex-col items-center justify-center p-6 lg:p-16 bg-[#050505]">
                <div className="relative w-full max-w-md h-[600px] flex items-center justify-center">
                    <AnimatePresence mode="popLayout" custom={direction}>
                        <motion.div
                            key={activeIndex}
                            custom={direction}
                            variants={cardVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.4 },
                                scale: { duration: 0.4 },
                                filter: { duration: 0.4 }
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = offset.x;
                                if (swipe < -100 || (swipe < -20 && velocity.x < -100)) {
                                    handleNext();
                                } else if (swipe > 100 || (swipe > 20 && velocity.x > 100)) {
                                    handlePrev();
                                }
                            }}
                            className="absolute w-full pt-10 lg:pt-0 cursor-grab active:cursor-grabbing touch-none"
                        >
                            {/* Name & Role */}
                            <div className="text-right mb-6">
                                <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
                                    {teamMembers[activeIndex].name}
                                </h3>
                                <p className="text-[#ccff00] font-bold tracking-widest text-xs uppercase mb-4">
                                    {teamMembers[activeIndex].role}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 justify-end">
                                    {teamMembers[activeIndex].tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 rounded-full bg-[#1a1a1a] text-xs font-bold text-gray-400 uppercase tracking-wider border border-white/10"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Image Card */}
                            <div className="relative aspect-[3/4] w-full rounded-[2rem] overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10" />
                                <img
                                    src={teamMembers[activeIndex].image}
                                    alt={teamMembers[activeIndex].name}
                                    className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110"
                                />

                                {/* Bio Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-gray-300 text-sm leading-relaxed backdrop-blur-sm bg-black/40 p-4 rounded-xl border border-white/10 shadow-2xl">
                                        {teamMembers[activeIndex].bio}
                                    </p>
                                </div>
                            </div>

                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Mobile Pagination Indicator */}
                <div className="flex gap-2 mt-8 lg:hidden">
                    {teamMembers.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-8 bg-[#ccff00]' : 'w-2 bg-white/20'
                                }`}
                        />
                    ))}
                </div>
            </div>

        </section>
    );
}
