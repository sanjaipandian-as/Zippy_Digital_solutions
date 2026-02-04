"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ContactUs from "./CotactUs";

const AsteriskShape = () => (
    <div className="w-full h-full bg-[#F0FF80] flex items-center justify-center p-4">
        <svg viewBox="0 0 16 16" className="w-full h-full text-black" fill="currentColor">
            <path d="M5.6906 6.00001L3.16512 1.62576C4.50811 0.605527 6.18334 0 8 0C8.37684 0 8.74759 0.0260554 9.11056 0.076463L5.6906 6.00001Z" />
            <path d="M5.11325 9L1.69363 3.07705C0.632438 4.43453 0 6.14341 0 8C0 8.33866 0.0210434 8.67241 0.0618939 9H5.11325Z" />
            <path d="M4.89635 15.3757C2.93947 14.5512 1.37925 12.9707 0.581517 11H7.42265L4.89635 15.3757Z" />
            <path d="M8 16C7.62316 16 7.25241 15.9739 6.88944 15.9235L10.3094 10L12.8349 14.3742C11.4919 15.3945 9.81666 16 8 16Z" />
            <path d="M16 8C16 9.85659 15.3676 11.5655 14.3064 12.9229L10.8868 7H15.9381C15.979 7.32759 16 7.66134 16 8Z" />
            <path d="M11.1036 0.624326C13.0605 1.44877 14.6208 3.02927 15.4185 5H8.57735L11.1036 0.624326Z" />
        </svg>
    </div>
);

const ClusterShape = () => (
    <div className="w-full h-full bg-[#e0e0e0] flex items-center justify-center p-0">
        <svg viewBox="0 0 150 150" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 130 L75 25 L130 130"
                stroke="black" strokeWidth="22" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="75" y1="25" x2="75" y2="5"
                stroke="black" strokeWidth="22" strokeLinecap="round" />
            <path d="M55 130 L75 85 L95 130"
                stroke="black" strokeWidth="16" fill="none" opacity="0.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
);

const ArrowIconShape = () => (
    <div className="w-full h-full bg-transparent flex items-center justify-center p-0">
        <svg viewBox="0 0 200 200" className="w-full h-full scale-[1.25]" xmlns="http://www.w3.org/2000/svg">
            <polygon
                points="100,10 140,20 170,50 180,90 170,130 140,160 100,170 60,160 30,130 20,90 30,50 60,20"
                fill="black"
            />
            <g transform="translate(10, 15)">
                <path d="M60 135 L78 78 L63 35" stroke="#e0e0e0" strokeWidth="14" strokeLinecap="round" fill="none" />
                <path d="M120 135 L102 78 L117 35" stroke="#e0e0e0" strokeWidth="14" strokeLinecap="round" fill="none" />
                <circle cx="90" cy="75" r="14" fill="#e0e0e0" />
            </g>
        </svg>
    </div>
);

const SmallLabel = ({ children, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 2.8, duration: 1 }}
        className={`absolute font-sans text-[10px] md:text-[11px] font-bold text-zinc-800 uppercase tracking-[0.2em] leading-relaxed z-50 ${className}`}
    >
        <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F0FF80]" />
            {children}
        </div>
    </motion.div>
);



const OrbitWrapper = ({ children, delay = 0, reverse = false }) => (
    <motion.div
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{
            duration: 12,
            ease: "linear",
            repeat: Infinity,
            delay: delay
        }}
        className="w-full h-full"
    >
        {children}
    </motion.div>
);

function MorphingModal({ isOpen, onClose, initialPos }) {
    const [mounted, setMounted] = useState(false);
    const [status, setStatus] = useState("button");
    const [showContent, setShowContent] = useState(false);
    const isClosingRef = useRef(false);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (isOpen && initialPos) {
            isClosingRef.current = false;
            document.body.style.overflow = "hidden";
            setStatus("button");
            const t1 = setTimeout(() => setStatus("center"), 20);
            const t2 = setTimeout(() => setStatus("pillar"), 550);
            const t3 = setTimeout(() => setStatus("modal"), 1100);
            const t4 = setTimeout(() => setShowContent(true), 1650);
            return () => {
                clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
            };
        } else {
            document.body.style.overflow = "unset";
            setStatus("button");
            setShowContent(false);
        }
    }, [isOpen, initialPos]);

    const handleClose = () => {
        if (isClosingRef.current) return;
        isClosingRef.current = true;
        setShowContent(false);
        setStatus("pillar");
        setTimeout(() => {
            setStatus("center");
            setTimeout(() => {
                setStatus("button");
                setTimeout(() => {
                    onClose();
                    isClosingRef.current = false;
                }, 500);
            }, 550);
        }, 550);
    };

    useEffect(() => {
        if (!isOpen) return;

        const handleScrollAttempt = () => {
            handleClose();
        };

        window.addEventListener('wheel', handleScrollAttempt, { passive: true });
        window.addEventListener('touchmove', handleScrollAttempt, { passive: true });

        return () => {
            window.removeEventListener('wheel', handleScrollAttempt);
            window.removeEventListener('touchmove', handleScrollAttempt);
        };
    }, [isOpen]);

    if (!mounted || !initialPos) return null;

    const variants = {
        button: { top: initialPos.top, left: initialPos.left, width: initialPos.width, height: initialPos.height, x: 0, y: 0, borderRadius: "9999px", transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
        center: { top: "50%", left: "50%", x: "-50%", y: "-50%", width: initialPos.height, height: initialPos.height, borderRadius: "9999px", transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
        pillar: { top: 0, left: "50%", x: "-50%", y: 0, width: initialPos.height, height: "100vh", borderRadius: "0px", transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
        modal: { top: 0, left: "50%", x: "-50%", y: 0, width: "100vw", height: "100vh", borderRadius: "0px", transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }
    };

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[10002] pointer-events-none">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50 backdrop-blur-md pointer-events-auto" onClick={handleClose} />
                    <motion.div initial="button" animate={status} exit="button" variants={variants} className="absolute bg-[#F0FF80] overflow-hidden flex flex-col items-center justify-center pointer-events-auto shadow-2xl">
                        <AnimatePresence mode="wait">

                            {status === "modal" && showContent && (
                                <motion.div key="content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5, ease: "easeOut" }} className="w-full h-full">
                                    <ContactUs isOpen={true} onClose={handleClose} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}

export default function App() {
    const { scrollY } = useScroll();
    const yText = useTransform(scrollY, [0, 500], [0, 100]);
    const scaleText = useTransform(scrollY, [0, 500], [1, 0.95]);

    // Parallax Curtain Effect with Horizontal Motion
    const yLine1 = useTransform(scrollY, [0, 500], [0, 0]); // Zero vertical movement
    const yLine2 = useTransform(scrollY, [0, 500], [0, 0]);
    const yLine3 = useTransform(scrollY, [0, 500], [0, 0]);

    // Horizontal Motion
    const xLine1 = useTransform(scrollY, [0, 400], [0, 200]);   // Move Right
    const xLine3 = useTransform(scrollY, [0, 400], [0, -200]);  // Move Left

    // Opacity
    const opacityLine1 = useTransform(scrollY, [0, 300], [1, 1]); // Solid
    const opacityLine2 = useTransform(scrollY, [0, 200], [1, 0]); // FADE OUT
    const opacityLine3 = useTransform(scrollY, [0, 500], [1, 1]); // Solid

    const [showOrbit, setShowOrbit] = useState(true);

    const [isContactOpen, setIsContactOpen] = useState(false);
    const [buttonPos, setButtonPos] = useState(null);
    const buttonRef = useRef(null);

    const handleOpenContact = (e) => {
        e.stopPropagation();
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setButtonPos({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
            setIsContactOpen(true);
        }
    };

    const fontClass = "font-bebas text-[19vw] sm:text-[20vw] md:text-[11rem] lg:text-[14.5rem] leading-[0.8] md:leading-[0.75] tracking-tight text-white select-none whitespace-normal md:whitespace-nowrap";
    const shapeWrapper = "w-[17vw] h-[17vw] sm:w-[18vw] sm:h-[18vw] md:w-[8rem] md:h-[8rem] lg:w-[11.5rem] lg:h-[11.5rem] mx-2 sm:mx-2.5 md:mx-6 shrink-0 self-center z-20";

    useEffect(() => {
        // Force scroll to top on mount/reload
        if (typeof window !== 'undefined') {
            window.history.scrollRestoration = 'manual';

            // Clear any hash from URL that might cause auto-scroll
            if (window.location.hash) {
                window.history.replaceState(null, '', window.location.pathname);
            }

            // Use requestAnimationFrame to ensure DOM is ready
            requestAnimationFrame(() => {
                window.scrollTo(0, 0);
                // Double-check after a brief delay
                setTimeout(() => {
                    window.scrollTo(0, 0);
                }, 10);
            });
        }

        const timer = setTimeout(() => {
            setShowOrbit(false);
        }, 1800); // reduced to 1.8s for immediate transition
        return () => clearTimeout(timer);
    }, []);

    const textFade = {
        initial: { opacity: 0, y: 20, filter: "blur(10px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        transition: { duration: 0.8, delay: 2.0, ease: "easeOut" } // Appearing right after orbit ends
    };

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (showOrbit) {
            // Disable scrolling
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
            window.scrollTo(0, 0);
        } else {
            // Re-enable scrolling
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        }

        // Cleanup to ensure scroll is restored
        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, [showOrbit]);

    const CenteredOrbit = () => {
        // Diagonal offset values
        const offset = isMobile ? 50 : 150;

        return (
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            >
                <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-12 lg:gap-16">
                    {/* Icon 1: Asterisk - From Left -> Horizontal -> Up-Left Diagonal */}
                    <motion.div
                        className="w-[17vw] h-[17vw] sm:w-[18vw] sm:h-[18vw] md:w-[8rem] md:h-[8rem] lg:w-[11.5rem] lg:h-[11.5rem] relative"
                        initial={{ x: "-100vw", y: 0, opacity: 0 }}
                        animate={{
                            x: 0,
                            y: [0, 0, -offset], // 0 to 0.5 (Horizontal), 0.5 to 1 (Diagonal Up)
                            opacity: 1
                        }}
                        transition={{
                            x: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                            y: { duration: 1.6, times: [0, 0.5, 1], ease: "easeInOut" },
                            opacity: { duration: 0.5 }
                        }}
                    >
                        <motion.div className="w-full h-full" layoutId="icon1">
                            <AsteriskShape />
                        </motion.div>
                    </motion.div>

                    {/* Icon 2: Cluster - From Bottom -> Horizontal -> Center Diagonal */}
                    <motion.div
                        className="w-[17vw] h-[17vw] sm:w-[18vw] sm:h-[18vw] md:w-[8rem] md:h-[8rem] lg:w-[11.5rem] lg:h-[11.5rem] relative"
                        initial={{ y: "100vh", opacity: 0 }}
                        animate={{
                            y: ["100vh", 0, 0], // 0 to 0.5 (Enter), 0.5 to 1 (Stay)
                            opacity: 1
                        }}
                        transition={{
                            y: { duration: 1.6, times: [0, 0.5, 1], ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.5 }
                        }}
                    >
                        <motion.div className="w-full h-full" layoutId="icon2">
                            <ClusterShape />
                        </motion.div>
                    </motion.div>

                    {/* Icon 3: Arrow - From Right -> Horizontal -> Down-Right Diagonal */}
                    <motion.div
                        className="w-[17vw] h-[17vw] sm:w-[18vw] sm:h-[18vw] md:w-[8rem] md:h-[8rem] lg:w-[11.5rem] lg:h-[11.5rem] relative"
                        initial={{ x: "100vw", y: 0, opacity: 0 }}
                        animate={{
                            x: 0,
                            y: [0, 0, offset], // 0 to 0.5 (Horizontal), 0.5 to 1 (Diagonal Down)
                            opacity: 1
                        }}
                        transition={{
                            x: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
                            y: { duration: 1.6, times: [0, 0.5, 1], ease: "easeInOut" },
                            opacity: { duration: 0.5 }
                        }}
                    >
                        <motion.div className="w-full h-full" layoutId="icon3">
                            <ArrowIconShape />
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="relative w-full min-h-screen flex flex-col justify-center bg-[#e0e0e0] selection:bg-[#F0FF80] selection:text-black">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap'); .font-bebas { font-family: 'Bebas Neue', sans-serif; }`}</style>

            {/* CenteredOrbit moved inside layout below */}

            <motion.div
                style={{ y: yText, scale: scaleText }}
                className="w-full flex flex-col items-center justify-center gap-8 sm:gap-10 md:gap-10 py-12 md:pt-36 md:pb-32 pointer-events-none"
            >
                {showOrbit && <CenteredOrbit />}
                <motion.div style={{ opacity: opacityLine1, y: yLine1, x: xLine1 }} className="relative flex items-center justify-center w-full px-4 sm:px-5 md:px-4 text-center overflow-visible">
                    <motion.div className="flex flex-wrap justify-center items-center gap-x-1.5 sm:gap-x-2 md:gap-x-2 gap-y-1 sm:gap-y-1.5">
                        <motion.span {...textFade} className={fontClass}>TRANS</motion.span>
                        <div className={`${shapeWrapper} relative`}>
                            {!showOrbit && (
                                <motion.div
                                    className="w-full h-full"
                                    layoutId="icon1"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                >
                                    <AsteriskShape />
                                </motion.div>
                            )}
                        </div>
                        <motion.span {...textFade} className={fontClass}>FORMING</motion.span>
                    </motion.div>
                </motion.div>

                <motion.div style={{ opacity: opacityLine2, y: yLine2 }} className="relative flex items-center justify-center w-full px-4 sm:px-5 md:px-4 text-center overflow-visible">
                    <motion.div className="flex flex-wrap justify-center items-center gap-x-1.5 sm:gap-x-2 md:gap-x-2 gap-y-1 sm:gap-y-1.5">
                        <motion.span {...textFade} className={fontClass}>IDEAS</motion.span>
                        <div className={shapeWrapper}>
                            {!showOrbit && (
                                <motion.div
                                    className="w-full h-full"
                                    layoutId="icon2"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                >
                                    <ClusterShape />
                                </motion.div>
                            )}
                        </div>
                        <motion.span {...textFade} className={fontClass}>INTO</motion.span>
                        <motion.button
                            ref={buttonRef}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 2.4, duration: 0.8 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleOpenContact}
                            className={`basis-full md:basis-auto h-[52px] sm:h-[56px] md:h-[65px] lg:h-[80px] bg-black text-white px-7 sm:px-9 md:px-12 rounded-full flex items-center justify-center gap-2.5 sm:gap-3 md:gap-6 mt-5 sm:mt-6 md:mt-0 md:ml-12 self-center group transition-all duration-300 pointer-events-auto shadow-2xl ${isContactOpen ? 'opacity-0 pointer-events-none scale-50' : 'opacity-100'}`}
                        >
                            <span className="font-sans font-black text-[15px] sm:text-base md:text-lg whitespace-nowrap uppercase tracking-tighter">Work with us</span>
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform sm:w-[18px] sm:h-[18px]"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                        </motion.button>
                    </motion.div>
                </motion.div>

                <motion.div style={{ opacity: opacityLine3, y: yLine3, x: xLine3 }} className="relative flex items-center justify-center w-full px-4 sm:px-5 md:px-4 text-center overflow-visible">
                    <motion.div className="flex flex-wrap justify-center items-center gap-x-1.5 sm:gap-x-2 md:gap-x-2 gap-y-1 sm:gap-y-1.5">
                        <motion.span {...textFade} className={`${fontClass} !text-[#F0FF80]`}>EXPERI</motion.span>
                        <div className={`${shapeWrapper} !rounded-full overflow-hidden`}>
                            {!showOrbit && (
                                <motion.div
                                    className="w-full h-full"
                                    layoutId="icon3"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                >
                                    <ArrowIconShape />
                                </motion.div>
                            )}
                        </div>
                        <motion.span {...textFade} className={`${fontClass} !text-[#F0FF80]`}>ENCES</motion.span>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Sub-labels positioned to match reference image exactly */}
            <SmallLabel className="hidden lg:block absolute left-[56%] top-[5%] text-left">
                CUSTOM AI SOLUTIONS<br />& INTEGRATIONS
            </SmallLabel>
            <SmallLabel className="hidden lg:block absolute left-[3%] top-[35%] text-left">
                WEB & APP<br />DEVELOPMENT
            </SmallLabel>
            <SmallLabel className="hidden lg:block absolute left-[8%] bottom-[20%] text-left">
                SYSTEM INTEGRATION<br />& CLOUD
            </SmallLabel>
            <SmallLabel className="hidden lg:block absolute right-[8%] bottom-[5%] text-left">
                MAINTENANCE<br />& SECURITY
            </SmallLabel>

            <MorphingModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} initialPos={buttonPos} />
        </div>
    );
}
