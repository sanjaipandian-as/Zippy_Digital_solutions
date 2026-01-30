"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";

// --- ASSETS & SHAPES ---

const AsteriskShape = () => (
    <div className="w-full h-full bg-[#e6ff57] relative flex items-center justify-center overflow-hidden">
        <div className="absolute w-[12%] h-[60%] bg-[#b0b0b0]" />
        <div className="absolute w-[12%] h-[60%] bg-[#b0b0b0] rotate-90" />
        <div className="absolute w-[12%] h-[60%] bg-[#b0b0b0] rotate-45" />
        <div className="absolute w-[12%] h-[60%] bg-[#b0b0b0] -rotate-45" />
        <div className="absolute w-[24%] h-[24%] bg-[#e6ff57] z-10" />
    </div>
);

const FourHexagons = () => {
    const hexPath = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";
    return (
        <div className="w-full h-full relative grid grid-cols-2 grid-rows-2 gap-1 p-1">
            {[0, 1, 2, 3].map((i) => (
                <div key={i} className="bg-black w-full h-full" style={{ clipPath: hexPath }} />
            ))}
        </div>
    );
};

const ArrowShape = () => {
    const decagonPath = "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";
    return (
        <div className="w-full h-full bg-black flex items-center justify-center" style={{ clipPath: decagonPath }}>
            <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="square" />
            </svg>
        </div>
    );
};

// --- COMPONENTS ---

const SmallLabel = ({ children, className = "", delay = 0 }) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay, duration: 0.8 }}
            className={`absolute text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-widest leading-tight whitespace-nowrap ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default function Hero() {
    const { scrollY } = useScroll();

    // SCROLL EFFECTS
    const scrollExitLeft = useTransform(scrollY, [0, 600], [0, -600]);
    const scrollExitRight = useTransform(scrollY, [0, 600], [0, 600]);
    const scrollOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const scrollScale = useTransform(scrollY, [0, 600], [1, 0.95]);

    const shapeScale = useTransform(scrollY, [0, 600], [1, 0.5]);
    const shapeOpacity = useTransform(scrollY, [0, 300], [1, 0]);

    // Determine screen size for responsive coordinates
    const [layout, setLayout] = useState({
        row1: { x: 33, y: -148 },
        row2: { x: -143, y: 0 },
        row3: { x: 77, y: 148 },
    });

    useEffect(() => {
        const updateLayout = () => {
            if (window.innerWidth >= 1024) {
                // Desktop (lg)
                setLayout({
                    // row1.x reduced from 45 to 10 to move the shape/gap to the left
                    row1: { x: 10, y: -154 },
                    row2: { x: -160, y: 0 },
                    row3: { x: 88, y: 154 },
                });
            } else if (window.innerWidth >= 768) {
                // Tablet (md)
                setLayout({
                    row1: { x: 10, y: -115 },
                    row2: { x: -121, y: 0 },
                    row3: { x: 66, y: 115 },
                });
            } else {
                // Mobile
                setLayout({
                    row1: { x: 5, y: -88 },
                    row2: { x: -88, y: 0 },
                    row3: { x: 44, y: 88 },
                });
            }
        };

        updateLayout();
        window.addEventListener("resize", updateLayout);
        return () => window.removeEventListener("resize", updateLayout);
    }, []);

    const controls = {
        leftShape: useAnimation(),
        centerShape: useAnimation(),
        rightShape: useAnimation(),
        textRow1Left: useAnimation(),
        textRow1Right: useAnimation(),
        textRow2Left: useAnimation(),
        textRow2Right: useAnimation(),
        textRow3Left: useAnimation(),
        textRow3Right: useAnimation(),
        button: useAnimation(),
    };

    useEffect(() => {
        const sequence = async () => {
            // 1. CONVERGENCE
            await Promise.all([
                controls.centerShape.start({ opacity: 1, scale: 1, transition: { duration: 0.5 } }),
                controls.leftShape.start({ x: -145, opacity: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }),
                controls.rightShape.start({ x: 145, opacity: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }),
            ]);

            await new Promise((r) => setTimeout(r, 400));

            // 2. SCATTER (Using dynamic layout state)
            await Promise.all([
                controls.leftShape.start({ x: layout.row1.x, y: layout.row1.y, transition: { duration: 1.2, ease: "easeInOut" } }),
                controls.centerShape.start({ x: layout.row2.x, y: layout.row2.y, transition: { duration: 1.2, ease: "easeInOut" } }),
                controls.rightShape.start({ x: layout.row3.x, y: layout.row3.y, transition: { duration: 1.2, ease: "easeInOut" } }),
            ]);

            // 3. TEXT REVEAL
            const textEase = [0.16, 1, 0.3, 1];
            const textDur = 1;

            controls.textRow1Left.start({ x: 0, opacity: 1, transition: { duration: textDur, ease: textEase } });
            controls.textRow1Right.start({ x: 0, opacity: 1, transition: { duration: textDur, ease: textEase } });

            await new Promise((r) => setTimeout(r, 100));
            controls.textRow2Left.start({ x: 0, opacity: 1, transition: { duration: textDur, ease: textEase } });
            controls.textRow2Right.start({ x: 0, opacity: 1, transition: { duration: textDur, ease: textEase } });

            await new Promise((r) => setTimeout(r, 100));
            controls.textRow3Left.start({ x: 0, opacity: 1, transition: { duration: textDur, ease: textEase } });
            controls.textRow3Right.start({ x: 0, opacity: 1, transition: { duration: textDur, ease: textEase } });

            controls.button.start({ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200 } });
        };

        sequence();
    }, [layout]);

    // Typography Styles - Increased by ~10%
    const textClass = "text-[14.5vw] md:text-[7.2rem] lg:text-[9.4rem] leading-[0.8] font-black tracking-tighter scale-y-110";

    // Shape/Spacer Sizes - Increased by ~10%
    const shapeSizeClass = "w-[88px] h-[88px] md:w-[122px] md:h-[122px] lg:w-[154px] lg:h-[154px]";
    const spacerSizeClass = "w-[88px] md:w-[122px] lg:w-[154px] shrink-0 h-22";

    return (
        <div className="relative w-full min-h-[100vh] bg-[#d6d6d6] overflow-x-hidden font-sans selection:bg-[#e6ff57] selection:text-black">

            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden sticky top-0">

                {/* === SHAPE LAYER === */}
                <motion.div
                    style={{ opacity: shapeOpacity, scale: shapeScale }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                >
                    {/* Row 1 Shape */}
                    <motion.div
                        initial={{ x: -1000, opacity: 0 }}
                        animate={controls.leftShape}
                        className={`absolute ${shapeSizeClass}`}
                    >
                        <AsteriskShape />
                    </motion.div>

                    {/* Row 2 Shape */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={controls.centerShape}
                        className={`absolute ${shapeSizeClass}`}
                    >
                        <FourHexagons />
                    </motion.div>

                    {/* Row 3 Shape */}
                    <motion.div
                        initial={{ x: 1000, opacity: 0 }}
                        animate={controls.rightShape}
                        className={`absolute ${shapeSizeClass}`}
                    >
                        <ArrowShape />
                    </motion.div>
                </motion.div>

                {/* === TEXT GRID LAYER === */}
                <div className="relative z-30 w-full flex flex-col items-center justify-center pointer-events-none gap-0">

                    {/* ROW 1: TRANS [GAP] FORMING */}
                    <div
                        className="flex items-center justify-center w-full relative"
                        style={{ transform: `translateX(${layout.row1.x}px)` }}
                    >
                        <motion.div style={{ x: scrollExitLeft, opacity: scrollOpacity, scale: scrollScale }}>
                            <motion.div initial={{ x: -800, opacity: 0 }} animate={controls.textRow1Left} className="relative flex items-center">
                                <h1 className={`${textClass} text-white`}>TRANS</h1>
                                <SmallLabel className="right-[102%] top-[50%] -translate-y-1/2 text-right w-max hidden md:block" delay={3}>
                                    WEB & APP<br />DEVELOPMENT
                                </SmallLabel>
                            </motion.div>
                        </motion.div>

                        {/* SPACER */}
                        <div className={spacerSizeClass} />

                        <motion.div style={{ x: scrollExitRight, opacity: scrollOpacity, scale: scrollScale }}>
                            <motion.div initial={{ x: 800, opacity: 0 }} animate={controls.textRow1Right} className="relative flex items-center">
                                <h1 className={`${textClass} text-white`}>FORMING</h1>
                                <SmallLabel className="left-1 bottom-[100%] mb-2 text-left w-max hidden md:block text-[#888]" delay={3.2}>
                                    CUSTOM AI SOLUTIONS<br />& INTEGRATION
                                </SmallLabel>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* ROW 2: IDEAS [GAP] INTO */}
                    <div
                        className="flex items-center justify-center w-full relative mt-2 md:mt-4"
                        style={{ transform: `translateX(${layout.row2.x}px)` }}
                    >
                        <motion.div style={{ x: scrollExitLeft, opacity: scrollOpacity, scale: scrollScale }}>
                            <motion.div initial={{ x: -800, opacity: 0 }} animate={controls.textRow2Left} className="relative flex items-center">
                                <h1 className={`${textClass} text-white`}>IDEAS</h1>
                            </motion.div>
                        </motion.div>

                        <div className={spacerSizeClass} />

                        <motion.div style={{ x: scrollExitRight, opacity: scrollOpacity, scale: scrollScale }}>
                            <motion.div initial={{ x: 800, opacity: 0 }} animate={controls.textRow2Right} className="relative flex items-center">
                                <h1 className={`${textClass} text-white`}>INTO</h1>

                                <motion.button
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={controls.button}
                                    style={{ opacity: scrollOpacity }}
                                    className="pointer-events-auto absolute left-[110%] top-1/2 -translate-y-1/2 bg-black text-white pl-6 pr-8 py-4 rounded-full flex items-center gap-3 group hover:bg-[#e6ff57] hover:text-black transition-colors duration-300 whitespace-nowrap hidden lg:flex shadow-xl"
                                >
                                    <span className="font-bold text-lg">Work with us</span>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                                    </svg>
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* ROW 3: EXPERI [GAP] ENCES */}
                    <div
                        className="flex items-center justify-center w-full relative mt-2 md:mt-4"
                        style={{ transform: `translateX(${layout.row3.x}px)` }}
                    >
                        <motion.div style={{ x: scrollExitLeft, opacity: scrollOpacity, scale: scrollScale }}>
                            <motion.div initial={{ x: -800, opacity: 0 }} animate={controls.textRow3Left} className="relative flex items-center">
                                <h1 className={`${textClass} text-[#e6ff57]`}>EXPERI</h1>
                                <SmallLabel className="right-[102%] top-[50%] -translate-y-1/2 text-right w-max hidden md:block" delay={3.4}>
                                    SYSTEM<br />INTEGRATION<br />& CLOUD
                                </SmallLabel>
                            </motion.div>
                        </motion.div>

                        <div className={spacerSizeClass} />

                        <motion.div style={{ x: scrollExitRight, opacity: scrollOpacity, scale: scrollScale }}>
                            <motion.div initial={{ x: 800, opacity: 0 }} animate={controls.textRow3Right} className="relative flex items-center">
                                <h1 className={`${textClass} text-[#e6ff57]`}>ENCES</h1>
                                <SmallLabel className="left-1 top-[100%] mt-2 text-left w-max hidden md:block" delay={3.6}>
                                    MAINTENANCE<br />& SECURITY
                                </SmallLabel>
                            </motion.div>
                        </motion.div>
                    </div>

                </div>
            </section>
        </div>
    );
}