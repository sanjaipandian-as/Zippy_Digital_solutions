"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ContactUs from "./CotactUs";

const AsteriskShape = () => (
    <div className="w-full h-full bg-[#ccff00] flex items-center justify-center p-4">
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className={`absolute font-sans text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight ${className}`}
    >
        {children}
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
                    <motion.div initial="button" animate={status} exit="button" variants={variants} className="absolute bg-[#ccff00] overflow-hidden flex flex-col items-center justify-center pointer-events-auto shadow-2xl">
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
    const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

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

    const fontClass = "font-bebas text-[18vw] md:text-[8rem] lg:text-[11rem] leading-[0.85] tracking-tight text-white select-none whitespace-normal md:whitespace-nowrap";
    const shapeWrapper = "w-[16vw] h-[16vw] md:w-[7rem] md:h-[7rem] lg:w-[9rem] lg:h-[9rem] mx-2 md:mx-4 shrink-0 self-center z-20";

    useEffect(() => {
        // Force scroll to top on mount/reload
        if (typeof window !== 'undefined') {
            window.history.scrollRestoration = 'manual';
            window.scrollTo(0, 0);
        }

        const timer = setTimeout(() => {
            setShowOrbit(false);
        }, 2000); // Extended to 2 seconds for full expand-collapse cycle
        return () => clearTimeout(timer);
    }, []);

    const textFade = {
        initial: { opacity: 0, y: 20, filter: "blur(10px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        transition: { duration: 0.8, delay: 2.2, ease: "easeOut" } // Delayed to match new orbit time
    };

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const CenteredOrbit = () => {
        // Dynamic values based on screen size
        const radius = isMobile ? -70 : -120; // Smaller orbit radius on mobile
        const stackSpacing = isMobile ? 45 : 60; // Tighter stacking on mobile

        return (
            <motion.div
                className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
            >
                {/* Icons Layer - Stays opaque for layoutId transition */}
                <motion.div
                    className="relative flex items-center justify-center"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, ease: "linear" }}
                >
                    {/* Icon 1 - Top Position (Start Angle 0) -> Becomes Arrow (Targeting Slot 3 - Bottom) */}
                    <motion.div
                        className="absolute"
                        initial={{ opacity: 0, rotate: 0 }}
                        animate={{ opacity: 1, rotate: [0, 0, 0, 360] }}
                        transition={{
                            rotate: { duration: 2, times: [0, 0.2, 0.8, 1], ease: "easeInOut" },
                            opacity: { duration: 0.2 } // Fade in quickly, don't take 2s
                        }}
                    >
                        <motion.div
                            initial={{ y: 0 }}
                            animate={{ y: [0, radius, radius, stackSpacing] }} // Ends at bottom (+spacing)
                            transition={{ duration: 2, times: [0, 0.2, 0.8, 1], ease: "easeInOut" }}
                        >
                            <motion.div
                                className="w-[16vw] h-[16vw] md:w-32 md:h-32 -translate-x-1/2 -translate-y-1/2"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 2, ease: "linear" }}
                            >
                                <motion.div className="w-full h-full" layoutId="icon3">
                                    <ArrowIconShape />
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Icon 2 - Right Position (Start Angle 120) -> Becomes Asterisk (Targeting Slot 1 - Top) */}
                    <motion.div
                        className="absolute"
                        initial={{ rotate: 120, opacity: 0 }}
                        animate={{ rotate: [120, 120, 120, 360], opacity: 1 }} // Aligns to vertical
                        transition={{
                            rotate: { duration: 2, times: [0, 0.2, 0.8, 1], ease: "easeInOut" },
                            opacity: { duration: 0.2 }
                        }}
                    >
                        <motion.div
                            initial={{ y: 0 }}
                            animate={{ y: [0, radius, radius, -stackSpacing] }} // Ends at top (-spacing)
                            transition={{ duration: 2, times: [0, 0.2, 0.8, 1], ease: "easeInOut" }}
                        >
                            <motion.div
                                className="w-[16vw] h-[16vw] md:w-32 md:h-32 -translate-x-1/2 -translate-y-1/2"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 2, ease: "linear" }}
                            >
                                <motion.div className="w-full h-full" layoutId="icon1">
                                    <AsteriskShape />
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Icon 3 - Left Position (Start Angle 240) -> Becomes Cluster (Targeting Slot 2 - Middle) */}
                    <motion.div
                        className="absolute"
                        initial={{ rotate: 240, opacity: 0 }}
                        animate={{ rotate: [240, 240, 240, 360], opacity: 1 }} // Aligns to vertical
                        transition={{
                            rotate: { duration: 2, times: [0, 0.2, 0.8, 1], ease: "easeInOut" },
                            opacity: { duration: 0.2 }
                        }}
                    >
                        <motion.div
                            initial={{ y: 0 }}
                            animate={{ y: [0, radius, radius, 0] }} // Ends in middle (0)
                            transition={{ duration: 2, times: [0, 0.2, 0.8, 1], ease: "easeInOut" }}
                        >
                            <motion.div
                                className="w-[16vw] h-[16vw] md:w-32 md:h-32 -translate-x-1/2 -translate-y-1/2"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 2, ease: "linear" }}
                            >
                                <motion.div className="w-full h-full" layoutId="icon2">
                                    <ClusterShape />
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        );
    };

    return (
        <div className="relative w-full min-h-screen bg-[#e0e0e0] overflow-x-hidden selection:bg-[#ccff00] selection:text-black">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap'); .font-bebas { font-family: 'Bebas Neue', sans-serif; }`}</style>

            {/* CenteredOrbit moved inside layout below */}

            <motion.div
                style={{ y: yText, scale: scaleText, opacity: opacityText }}
                className="w-full h-screen md:min-h-screen flex flex-col items-center justify-evenly md:justify-center md:gap-4 py-20 md:py-0"
            >
                {showOrbit && <CenteredOrbit />}
                <div className="relative flex items-center justify-center w-full px-4 text-center overflow-visible">
                    <motion.div className="flex flex-wrap justify-center items-center">
                        <motion.span {...textFade} className={fontClass}>TURNING</motion.span>
                        <div className={`${shapeWrapper} relative`}>
                            {!showOrbit && (
                                <motion.div className="w-full h-full" layoutId="icon1" transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                                    <AsteriskShape />
                                </motion.div>
                            )}
                        </div>
                        <motion.span {...textFade} className={fontClass}>YOUR IDEAS</motion.span>
                    </motion.div>
                </div>

                <div className="relative flex items-center justify-center w-full px-4 text-center gap-2 md:gap-4 overflow-visible">
                    <motion.div className="flex flex-wrap justify-center items-center">
                        <motion.span {...textFade} className={fontClass}>INTO</motion.span>
                        <div className={shapeWrapper}>
                            {!showOrbit && (
                                <motion.div className="w-full h-full" layoutId="icon2" transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                                    <ClusterShape />
                                </motion.div>
                            )}
                        </div>
                        <motion.span {...textFade} className={fontClass}>IMPACTFUL</motion.span>
                        <motion.button
                            ref={buttonRef}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 2.4, duration: 0.8 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleOpenContact}
                            className={`h-[50px] md:h-[70px] lg:h-[80px] bg-black text-white px-6 md:px-10 rounded-full flex items-center gap-2 md:gap-4 ml-0 mt-4 md:mt-0 md:ml-8 self-center group transition-all duration-300 ${isContactOpen ? 'opacity-0 pointer-events-none scale-50' : 'opacity-100'}`}
                        >
                            <span className="font-sans font-medium text-sm md:text-xl whitespace-nowrap uppercase tracking-tighter">Innovate With Us</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                        </motion.button>
                    </motion.div>
                    <SmallLabel className="hidden lg:block absolute right-[12%] top-0 text-left">AI SOLUTIONS<br />BUILT FOR YOU</SmallLabel>
                </div>

                <div className="relative flex items-center justify-center w-full px-4 text-center overflow-visible">
                    <motion.div className="flex flex-wrap justify-center items-center">
                        <motion.span {...textFade} className={`${fontClass} !text-[#ccff00]`}>EXPERI</motion.span>
                        <div className={shapeWrapper}>
                            {!showOrbit && (
                                <motion.div className="w-full h-full" layoutId="icon3" transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                                    <ArrowIconShape />
                                </motion.div>
                            )}
                        </div>
                        <motion.span {...textFade} className={`${fontClass} !text-[#ccff00]`}>ENCES</motion.span>
                    </motion.div>
                    <SmallLabel className="hidden lg:block absolute right-[18%] bottom-0 text-left">ONGOING MAINTENANCE<br />& PROTECTION</SmallLabel>
                    <SmallLabel className="hidden lg:block absolute left-[18%] bottom-4 text-right">CLOUD & SYSTEM<br />INTEGRATION</SmallLabel>
                </div>
            </motion.div>
            <MorphingModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} initialPos={buttonPos} />
        </div>
    );
}