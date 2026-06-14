"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { HelpCircle, Lightbulb, ArrowRight, ArrowUpRight } from 'lucide-react';

const caseStudies = [
    {
        id: "01",
        title: "WeChange Platform",
        sector: "FINTECH & DEFI",
        problem: "Users faced a high-friction onboarding and verification flow, causing a 65% drop-off rate during identity validation.",
        solution: "Engineered a modular single-page KYC process with instant rate mapping and optimized WebSockets, cutting onboarding time by 60%.",
        metrics: "+140% Conversion Lift • 50ms Tx Latency",
        challengeStat: "65% Drop-off Rate • High Friction",
        problemBg: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=600&q=80",
        solutionBg: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "02",
        title: "GrowHub Analytics",
        sector: "ENTERPRISE AI",
        problem: "Sales operations struggled to identify patterns across massive raw databases, delaying target customer acquisition.",
        solution: "Deployed an interactive B2B intelligence hub leveraging reactive filters, path-finding graph views, and background analytics pipelines.",
        metrics: "99.2% Search Accuracy • 6.4x Lead Scaling",
        challengeStat: "Manual Analysis • Delayed Targeting",
        problemBg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        solutionBg: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "03",
        title: "Otthon Luxury",
        sector: "REAL ESTATE PORTAL",
        problem: "UHD video tours and asset-heavy page listings created excessive load times on mobile viewports, losing luxury buyers.",
        solution: "Developed a progressive Next-generation server-rendered index with adaptive media compression and pre-fetching models.",
        metrics: "-45% Mobile Latency • +80% User Retention",
        challengeStat: "Slow Mobile Load • High Dropouts",
        problemBg: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
        solutionBg: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "04",
        title: "EduPulse System",
        sector: "EDTECH PLATFORM",
        problem: "Students frequently lost motivation due to rigid, non-interactive course curricula that ignored personal learning speeds.",
        solution: "Created an adaptive learning path engine driven by progressive state matching and responsive client-side milestones.",
        metrics: "+92% Completion Rate • 4.9/5 Rating",
        challengeStat: "Low Student Focus • Rigid Curricula",
        problemBg: "https://images.unsplash.com/photo-1526512340740-9217d0159da9?auto=format&fit=crop&w=600&q=80",
        solutionBg: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "05",
        title: "Apex Logistics",
        sector: "LOGISTICS & ROUTING",
        problem: "Legacy tracking screens had a 5-second delay, causing dispatch teams to make routing decisions on stale GPS coordinates.",
        solution: "Engineered an event-driven live tracking board mapping coordinate paths with lightweight SSE streams.",
        metrics: "Sub-second live updates • -30% Routing Delay",
        challengeStat: "5s Dispatch Lag • Stale GPS Tracking",
        problemBg: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80",
        solutionBg: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80"
    }
];

export default function CaseStudy() {
    const containerRef = useRef(null);
    const prevActiveIndexRef = useRef(0);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [overlap, setOverlap] = useState("-9rem");
    const [isMobile, setIsMobile] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const index = Math.min(
            caseStudies.length - 1,
            Math.floor(latest * caseStudies.length)
        );
        setActiveIndex(index);
    });

    useEffect(() => {
        prevActiveIndexRef.current = activeIndex;
    }, [activeIndex]);

    const prevActiveIndex = prevActiveIndexRef.current;

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setOverlap("1.5rem");
                setIsMobile(true);
                setIsLargeScreen(false);
            } else if (window.innerWidth < 1024) {
                setOverlap("-7.5rem");
                setIsMobile(false);
                setIsLargeScreen(false);
            } else {
                setOverlap("-9rem");
                setIsMobile(false);
                setIsLargeScreen(true);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize, { passive: true });
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getDiff = (index, activeIndex) => {
        let diff = index - activeIndex;
        if (diff < -2) diff += 5;
        if (diff > 2) diff -= 5;
        return diff;
    };

    const getLeftPercentage = (diff) => {
        const absDiff = Math.abs(diff);
        if (isLargeScreen) {
            return 22 - absDiff * 10;
        } else {
            return 12 - absDiff * 6;
        }
    };

    const getRightPercentage = (diff) => {
        const absDiff = Math.abs(diff);
        if (isLargeScreen) {
            return 22 - absDiff * 10;
        } else {
            return 12 - absDiff * 6;
        }
    };

    return (
        <div ref={containerRef} id="case-studies" className="relative w-full h-[300vh] bg-[#020202]">
            <div className="sticky top-0 w-full py-12 md:py-0 h-screen flex flex-col justify-center items-center overflow-hidden select-none">
                {/* ─── Visual Effects Backdrops ─── */}
                <div className="absolute inset-0 bg-transparent z-0 pointer-events-none" />

                {/* Subtle Radial Gold Glow behind center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-[#ffe01b]/10 rounded-full blur-[160px] pointer-events-none z-0" />

                {/* Fine dot pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
                    style={{
                        backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
                        backgroundSize: '35px 35px'
                    }}
                />

                {/* Content Container */}
                <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 relative z-20 flex flex-col justify-between md:justify-center h-[88vh] md:h-auto py-4 md:py-0">

                    {/* ─── Top: Header Typography ─── */}
                    <div className="w-full text-center mb-8 lg:mb-14 flex flex-col items-center">
                        <span className="block text-[10px] font-bold tracking-[0.45em] uppercase text-zinc-400 mb-1.5 font-mono">
                            PROVEN IMPACT
                        </span>
                        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bebas font-black tracking-tighter leading-none text-white uppercase">
                            THE PROBLEM & SOLUTION
                        </h2>
                        
                        {/* Mobile Center Text */}
                        <div className="mt-6 md:hidden px-4 w-full flex flex-col items-center gap-2 text-center">
                            <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase font-mono">
                                ONLY SOLUTIONS WERE THERE
                            </p>
                            <div className="w-8 h-[1px] bg-zinc-800" />
                            <p className="text-xs font-black tracking-[0.08em] text-[#ffe01b] uppercase font-sans">
                                BUT NOW ZIPPY DIGITAL SOLUTIONS IS HERE
                            </p>
                        </div>

                        {/* Mobile Center Button (Placed ABOVE the cards) */}
                        <div className="flex md:hidden justify-center mt-5 z-[120] relative pointer-events-auto">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="group relative focus:outline-none"
                            >
                                <div
                                    className="bg-zinc-900 p-[1px] transition-colors duration-300 group-hover:bg-zinc-700"
                                    style={{
                                        clipPath: "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)"
                                    }}
                                >
                                    <div
                                        className="bg-[#ffe01b] pl-8 pr-4 py-3.5 flex items-center justify-between gap-6"
                                        style={{
                                            clipPath: "polygon(11px 0, calc(100% - 11px) 0, 100% 11px, 100% calc(100% - 11px), calc(100% - 11px) 100%, 11px 100%, 0 calc(100% - 11px), 0 11px)"
                                        }}
                                    >
                                        <span className="text-zinc-950 font-sans font-bold tracking-[0.12em] text-xs uppercase">
                                            EXPLORE FULL CASE STUDY
                                        </span>
                                        <div
                                            className="w-8 h-8 bg-zinc-950 flex items-center justify-center text-white transition-transform duration-300 shrink-0"
                                            style={{
                                                clipPath: "polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)"
                                            }}
                                        >
                                            <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </motion.button>
                        </div>
                    </div>

                    {/* Grid Split */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative mt-16 md:mt-0">

                        {/* Left Column - Staggered Challenge Cards (Curved like ) with upright flat cards) */}
                        <div className="md:col-span-6 relative w-full h-[45vh] md:h-[70vh] flex flex-col items-start pb-8 md:pb-0 justify-center">
                            {caseStudies.map((study, index) => {
                                const isActive = index === activeIndex;
                                const diff = getDiff(index, activeIndex);
                                const prevDiff = getDiff(index, prevActiveIndex);
                                const isWrapping = Math.abs(diff - prevDiff) > 1;
                                return (
                                    <motion.div
                                        key={study.id}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        animate={{
                                            filter: isActive ? "blur(0px)" : (isMobile ? "blur(3px)" : "blur(8px)"),
                                            opacity: isActive ? 1 : (isMobile ? 0.15 : 0.22),
                                            scale: isActive ? 1.02 : 0.96,
                                            borderColor: "transparent",
                                            boxShadow: isMobile ? "0 10px 25px rgba(0, 0, 0, 0.4)" : "0 20px 40px -10px rgba(0, 0, 0, 0.5)",
                                            y: isMobile ? `calc(-50% + ${diff * 8}vh)` : `calc(-50% + ${diff * 18}vh)`,
                                            x: isMobile ? "-50%" : (isLargeScreen ? `${-Math.abs(diff) * 22.22}%` : `${-Math.abs(diff) * 10.9}%`),
                                            backgroundColor: "#ffffff",
                                            pointerEvents: isActive ? "auto" : "none"
                                        }}
                                        transition={{
                                            y: {
                                                type: isWrapping ? "tween" : "spring",
                                                bounce: 0,
                                                duration: isWrapping ? 0 : 0.6
                                            },
                                            x: {
                                                type: isWrapping ? "tween" : "spring",
                                                bounce: 0,
                                                duration: isWrapping ? 0 : 0.6
                                            },
                                            filter: { duration: isWrapping ? 0 : 0.4 },
                                            opacity: { duration: isWrapping ? 0 : 0.4 },
                                            scale: { duration: isWrapping ? 0 : 0.4 }
                                        }}
                                        className={`absolute w-[88%] sm:w-[70%] md:w-[55%] lg:w-[45%] aspect-auto md:aspect-square rounded-3xl overflow-hidden border shadow-2xl flex flex-col group cursor-pointer`}
                                        style={{
                                            zIndex: isActive ? 100 : 50 - Math.abs(diff) * 10,
                                            top: "50%",
                                            left: isMobile ? "50%" : (isLargeScreen ? "22%" : "12%"),
                                            willChange: "transform, opacity"
                                        }}
                                    >
                                        {/* Header */}
                                        <div className="px-4 md:px-6 py-3 md:py-4 pb-0 flex flex-col items-center text-center w-full z-20 relative">
                                            <span className={`text-[10px] font-mono uppercase tracking-[0.15em] font-bold transition-colors duration-300 ${isActive ? "text-amber-700" : "text-zinc-500"}`}>
                                                {isMobile ? study.sector : study.title}
                                            </span>
                                            <span className={`text-base lg:text-lg font-bold tracking-wide mt-0.5 leading-none uppercase font-bebas transition-colors duration-300 ${isActive ? "text-zinc-950" : "text-zinc-500"}`}>
                                                {isMobile ? study.title : "THE PROBLEM"}
                                            </span>
                                        </div>

                                        {/* Card Body */}
                                        <div className={`grid grid-cols-1 border-t mt-2 md:mt-3 relative z-10 flex-grow transition-colors duration-300 ${isActive ? "border-zinc-200" : "border-zinc-100"}`}>
                                            {/* Challenge Section */}
                                            <div className="relative overflow-hidden px-4 md:px-6 py-3 md:py-4 pt-2 md:pt-3 pb-2 md:pb-3 flex flex-col justify-center items-center text-center flex-grow">
                                                <img
                                                    src={study.problemBg}
                                                    alt={`${study.title} Problem`}
                                                    className="absolute inset-0 w-full h-full object-cover transition-all duration-[1.2s] ease-out z-0 pointer-events-none"
                                                    style={{ opacity: isActive ? 0.18 : 0.05 }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/85 to-white z-10" />

                                                <div className="relative z-20 flex flex-col items-center justify-center flex-grow w-full">
                                                    <h4 className={`text-[9px] font-bold uppercase tracking-[0.3em] mb-2 font-mono flex items-center justify-center gap-1.5 transition-colors duration-300 ${isActive ? "text-rose-600" : "text-rose-500/80"}`}>
                                                        <HelpCircle className="w-3.5 h-3.5" /> THE CHALLENGE
                                                    </h4>
                                                    <p className={`text-[13px] md:text-[14px] lg:text-[16px] leading-relaxed text-center font-normal transition-colors duration-300 ${isActive ? "text-zinc-800" : "text-zinc-500"}`}>
                                                        {study.problem}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Solution Section - Only Visible on Mobile Stack */}
                                            <div className={`relative overflow-hidden px-4 py-3 pt-2 pb-2 flex flex-col justify-center items-center text-center min-h-[140px] border-t md:hidden transition-colors duration-300 ${isActive ? "border-zinc-200" : "border-zinc-100"}`}>
                                                <img
                                                    src={study.solutionBg}
                                                    alt={`${study.title} Solution`}
                                                    className="absolute inset-0 w-full h-full object-cover transition-all duration-[1.2s] ease-out z-0 pointer-events-none"
                                                    style={{ opacity: isActive ? 0.18 : 0.05 }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/85 to-white z-10" />

                                                <div className="relative z-20 flex flex-col items-center justify-center flex-grow w-full">
                                                    <h4 className="text-emerald-600 text-[9px] font-bold uppercase tracking-[0.3em] mb-2 font-mono flex items-center justify-center gap-1.5">
                                                        <Lightbulb className="w-3.5 h-3.5" /> ZIPPY RESOLUTION
                                                    </h4>
                                                    <p className="text-zinc-800 text-[13px] leading-relaxed text-center font-normal">
                                                        {study.solution}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Right Column - Staggered Solution Cards (Curved like ( with upright flat cards) */}
                        <div className="hidden md:flex md:col-span-6 relative w-full md:h-[70vh] flex flex-col items-end pb-8 md:pb-0 justify-center">
                            {caseStudies.map((study, index) => {
                                const isActive = index === activeIndex;
                                const diff = getDiff(index, activeIndex);
                                const prevDiff = getDiff(index, prevActiveIndex);
                                const isWrapping = Math.abs(diff - prevDiff) > 1;
                                return (
                                    <motion.div
                                        key={study.id}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        animate={{
                                            filter: isMobile ? "none" : (isActive ? "blur(0px)" : "blur(8px)"),
                                            opacity: isMobile ? 1 : (isActive ? 1 : 0.22),
                                            scale: isMobile ? 1 : (isActive ? 1.03 : 0.97),
                                            borderColor: "transparent",
                                            boxShadow: isMobile ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "0 20px 40px -10px rgba(0, 0, 0, 0.5)",
                                            y: isMobile ? 0 : `calc(-50% + ${diff * 18}vh)`,
                                            x: isMobile ? 0 : (isLargeScreen ? `${Math.abs(diff) * 22.22}%` : `${Math.abs(diff) * 10.9}%`),
                                            backgroundColor: "#ffffff",
                                            pointerEvents: isMobile ? "auto" : (isActive ? "auto" : "none")
                                        }}
                                        transition={{
                                            y: {
                                                type: isWrapping ? "tween" : "spring",
                                                bounce: 0,
                                                duration: isWrapping ? 0 : 0.6
                                            },
                                            x: {
                                                type: isWrapping ? "tween" : "spring",
                                                bounce: 0,
                                                duration: isWrapping ? 0 : 0.6
                                            },
                                            filter: { duration: isWrapping ? 0 : 0.4 },
                                            opacity: { duration: isWrapping ? 0 : 0.4 },
                                            scale: { duration: isWrapping ? 0 : 0.4 }
                                        }}
                                        className={`relative md:absolute w-full lg:w-[45%] md:w-[55%] aspect-auto md:aspect-square rounded-3xl overflow-hidden border shadow-2xl flex flex-col group cursor-pointer`}
                                        style={{
                                            zIndex: isActive ? 100 : 50 - Math.abs(diff) * 10,
                                            marginTop: isMobile ? (index === 0 ? "0px" : "1.5rem") : "0px",
                                            top: isMobile ? "auto" : "50%",
                                            right: isMobile ? "auto" : (isLargeScreen ? "22%" : "12%"),
                                            willChange: "transform, opacity"
                                        }}
                                    >
                                        {/* Header */}
                                        <div className="px-6 py-4 pb-0 flex flex-col items-center text-center w-full z-20 relative">
                                            <span className={`text-[10px] font-mono uppercase tracking-[0.15em] font-bold transition-colors duration-300 ${isActive ? "text-amber-700" : "text-zinc-500"}`}>
                                                {study.title}
                                            </span>
                                            <span className={`text-base lg:text-lg font-bold tracking-wide mt-0.5 leading-none uppercase font-bebas transition-colors duration-300 ${isActive ? "text-zinc-950" : "text-zinc-500"}`}>
                                                THE SOLUTION
                                            </span>
                                        </div>

                                        {/* Card Body */}
                                        <div className={`grid grid-cols-1 border-t mt-3 relative z-10 flex-grow transition-colors duration-300 ${isActive ? "border-zinc-200" : "border-zinc-100"}`}>
                                            {/* Solution Section */}
                                            <div className="relative overflow-hidden px-6 py-4 pt-3 pb-3 flex flex-col justify-center items-center text-center flex-grow">
                                                <img
                                                    src={study.solutionBg}
                                                    alt={`${study.title} Solution`}
                                                    className="absolute inset-0 w-full h-full object-cover transition-all duration-[1.2s] ease-out z-0 pointer-events-none"
                                                    style={{ opacity: isActive ? 0.18 : 0.05 }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/85 to-white z-10" />

                                                <div className="relative z-20 flex flex-col items-center justify-center flex-grow w-full">
                                                    <h4 className={`text-[9px] font-bold uppercase tracking-[0.3em] mb-2 font-mono flex items-center justify-center gap-1.5 transition-colors duration-300 ${isActive ? "text-emerald-600" : "text-emerald-500/80"}`}>
                                                        <Lightbulb className="w-3.5 h-3.5" /> ZIPPY RESOLUTION
                                                    </h4>
                                                    <p className={`text-[14px] lg:text-[16px] leading-relaxed text-center font-normal transition-colors duration-300 ${isActive ? "text-zinc-800" : "text-zinc-500"}`}>
                                                        {study.solution}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Center Space Enhancements */}
                        {/* Thin vertical center divider line */}
                        <div className="absolute left-1/2 top-[12%] bottom-[12%] w-[1px] bg-gradient-to-b from-transparent via-zinc-800/60 to-transparent -translate-x-1/2 pointer-events-none hidden md:block z-10" />

                        {/* Desktop Center Text */}
                        <div className="absolute left-1/2 top-[24%] -translate-x-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-2 w-[310px] pointer-events-none text-center">
                            <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase font-mono">
                                ONLY SOLUTIONS WERE THERE
                            </p>
                            <div className="w-8 h-[1px] bg-zinc-800" />
                            <p className="text-sm font-black tracking-[0.08em] text-[#ffe01b] uppercase font-sans">
                                BUT NOW ZIPPY DIGITAL SOLUTIONS IS HERE
                            </p>
                        </div>

                        {/* Horizontal Connector Flow Line with Arrow Motif */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center gap-4 pointer-events-none w-[38%] justify-between">
                            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-zinc-800" />
                            {/* Spacer to avoid drawing line behind the yellow CTA pill */}
                            <div className="w-[310px] shrink-0" />
                            <div className="h-[1px] flex-grow bg-gradient-to-r from-zinc-800 to-transparent flex items-center justify-end">
                                <ArrowRight className="w-3.5 h-3.5 text-zinc-700 -mr-1" />
                            </div>
                        </div>

                        {/* Desktop Center Button */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden md:block pointer-events-auto">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="group relative focus:outline-none"
                            >
                                <div
                                    className="bg-zinc-900 p-[1px] transition-colors duration-300 group-hover:bg-zinc-700"
                                    style={{
                                        clipPath: "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)"
                                    }}
                                >
                                    <div
                                        className="bg-[#ffe01b] pl-8 pr-4 py-3.5 flex items-center justify-between gap-6"
                                        style={{
                                            clipPath: "polygon(11px 0, calc(100% - 11px) 0, 100% 11px, 100% calc(100% - 11px), calc(100% - 11px) 100%, 11px 100%, 0 calc(100% - 11px), 0 11px)"
                                        }}
                                    >
                                        <span className="text-zinc-950 font-sans font-bold tracking-[0.12em] text-xs md:text-[13px] uppercase">
                                            EXPLORE FULL CASE STUDY
                                        </span>
                                        <div
                                            className="w-8 h-8 bg-zinc-950 flex items-center justify-center text-white transition-transform duration-300 shrink-0"
                                            style={{
                                                clipPath: "polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)"
                                            }}
                                        >
                                            <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </motion.button>
                        </div>

                    </div>

                    {/* Space padding */}
                    <div className="pb-4" />

                </div>
            </div>
        </div>
    );
}
