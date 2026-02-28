"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import ContactUs from "./CotactUs";

const AsteriskShape = () => (
    <div className="w-full h-full bg-[#ffe01b] flex items-center justify-center p-0 overflow-hidden relative">
        <div className="w-full h-full flex items-center justify-center scale-[0.7]">
            <svg viewBox="0 0 16 16" className="w-full h-full text-black" fill="currentColor">
                {[
                    "M5.6906 6.00001L3.16512 1.62576C4.50811 0.605527 6.18334 0 8 0C8.37684 0 8.74759 0.0260554 9.11056 0.076463L5.6906 6.00001Z",
                    "M5.11325 9L1.69363 3.07705C0.632438 4.43453 0 6.14341 0 8C0 8.33866 0.0210434 8.67241 0.0618939 9H5.11325Z",
                    "M4.89635 15.3757C2.93947 14.5512 1.37925 12.9707 0.581517 11H7.42265L4.89635 15.3757Z",
                    "M8 16C7.62316 16 7.25241 15.9739 6.88944 15.9235L10.3094 10L12.8349 14.3742C11.4919 15.3945 9.81666 16 8 16Z",
                    "M16 8C16 9.85659 15.3676 11.5655 14.3064 12.9229L10.8868 7H15.9381C15.979 7.32759 16 7.66134 16 8Z",
                    "M11.1036 0.624326C13.0605 1.44877 14.6208 3.02927 15.4185 5H8.57735L11.1036 0.624326Z"
                ].map((d, i) => (
                    <path key={i} d={d} />
                ))}
            </svg>
        </div>
    </div>
);

const ClusterShape = () => (
    <div className="w-full h-full bg-white flex items-center justify-center p-0">
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
                <path d="M60 135 L78 78 L63 35" stroke="white" strokeWidth="14" strokeLinecap="round" fill="none" />
                <path d="M120 135 L102 78 L117 35" stroke="white" strokeWidth="14" strokeLinecap="round" fill="none" />
                <circle cx="90" cy="75" r="14" fill="white" />
            </g>
        </svg>
    </div>
);

const SmallLabel = ({ children, className = "", style }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 2.4, duration: 1 }}
        style={style}
        className={`absolute font-sans text-[10px] md:text-[11px] font-bold text-zinc-900 uppercase tracking-[0.15em] leading-relaxed z-[100] ${className}`}
    >
        <div className={`flex items-center gap-3 ${className.includes('text-right') ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffe01b] shrink-0" />
            <span>{children}</span>
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
            setStatus("button");
            const t1 = setTimeout(() => setStatus("center"), 20);
            const t2 = setTimeout(() => setStatus("pillar"), 550);
            const t3 = setTimeout(() => setStatus("modal"), 1100);
            const t4 = setTimeout(() => setShowContent(true), 1650);
            return () => {
                clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
            };
        } else {
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
        button: {
            top: initialPos.top,
            left: initialPos.left,
            width: initialPos.width,
            height: initialPos.height,
            x: 0,
            y: 0,
            clipPath: "polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)",
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
        },
        center: {
            top: "50%",
            left: "50%",
            x: "-50%",
            y: "-50%",
            width: initialPos.height,
            height: initialPos.height,
            clipPath: "polygon(0 0, 100% 0, 100% 0, 100% 100%, 100% 100%, 0 100%, 0 100%, 0 0)",
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
        },
        pillar: {
            top: 0,
            left: "50%",
            x: "-50%",
            y: 0,
            width: initialPos.height,
            height: "100vh",
            clipPath: "polygon(0 0, 100% 0, 100% 0, 100% 100%, 100% 100%, 0 100%, 0 100%, 0 0)",
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
        },
        modal: {
            top: 0,
            left: "50%",
            x: "-50%",
            y: 0,
            width: "100vw",
            height: "100vh",
            clipPath: "polygon(0 0, 100% 0, 100% 0, 100% 100%, 100% 100%, 0 100%, 0 100%, 0 0)",
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
        }
    };

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[99999] pointer-events-none">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50 backdrop-blur-md pointer-events-auto" onClick={handleClose} />
                    <motion.div initial="button" animate={status} exit="button" variants={variants} className="absolute bg-[#ffe01b] overflow-hidden flex flex-col items-center justify-center pointer-events-auto shadow-2xl">
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
    const yText = useTransform(scrollY, [0, 1500], [0, 50]);
    const scaleText = useTransform(scrollY, [0, 1500], [1, 0.98]);

    // Split Motion with Spring smoothing for fluidity
    const xLeftRaw = useTransform(scrollY, [0, 1500], [0, -600]);
    const xRightRaw = useTransform(scrollY, [0, 1500], [0, 600]);

    const springConfig = { stiffness: 40, damping: 20, mass: 0.5 };
    const xLeft = useSpring(xLeftRaw, springConfig);
    const xRight = useSpring(xRightRaw, springConfig);

    // Icon Fading - smoother transition as next page comes
    const iconOpacity = useTransform(scrollY, [0, 1000], [1, 0.2]);
    const iconScale = useTransform(scrollY, [0, 1000], [1, 0.9]);

    // Opacity for lines - stay visible longer to overlap with services
    const opacityLine1 = useTransform(scrollY, [600, 1800], [1, 0]);
    const opacityLine2 = useTransform(scrollY, [700, 1900], [1, 0]);
    const opacityLine3 = useTransform(scrollY, [800, 2000], [1, 0]);

    // Label horizontal motion
    const xLabelLeft = useTransform(scrollY, [0, 500], [0, -150]);
    const xLabelRight = useTransform(scrollY, [0, 500], [0, 150]);
    const buttonRotate = useTransform(scrollY, [0, 1500], [0, 8]);
    const mobileButtonRotate = useTransform(scrollY, [0, 1000], [0, 4]);

    const [showOrbit, setShowOrbit] = useState(true);
    const [introFinished, setIntroFinished] = useState(false);

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

    const fontClass = "font-bebas text-[18vw] sm:text-[20vw] md:text-[9.2rem] lg:text-[12.8rem] leading-[0.8] tracking-[0.04em] text-zinc-900 select-none whitespace-nowrap";
    const shapeWrapper = "w-[16vw] h-[16vw] sm:w-[18vw] sm:h-[18vw] md:w-[7rem] md:h-[7rem] lg:w-[10.5rem] lg:h-[10.5rem] mx-0.5 md:mx-4 lg:mx-6 shrink-0 self-center z-20 relative";

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

        const introTimer = setTimeout(() => {
            setIntroFinished(true);
        }, 5500); // Wait for the button expansion and shine to finish before allowing scroll

        return () => {
            clearTimeout(timer);
            clearTimeout(introTimer);
        };
    }, []);

    const textFade = {
        initial: { opacity: 0, y: 20, filter: "blur(10px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        transition: { duration: 0.8, delay: introFinished ? 0 : 2.0, ease: "easeOut" }
    };

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Forceful scroll lock during intro animation and when contact modal is open
    useEffect(() => {
        const preventDefault = (e) => {
            if (!introFinished || isContactOpen) {
                e.preventDefault();
            }
        };

        if (!introFinished || isContactOpen) {
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
            document.body.style.touchAction = "none";
            window.scrollTo(0, 0);

            window.addEventListener('wheel', preventDefault, { passive: false });
            window.addEventListener('touchmove', preventDefault, { passive: false });
            window.addEventListener('keydown', (e) => {
                // Don't block keyboard input when user is typing in form fields
                const tag = e.target.tagName;
                if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
                if (['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.code)) {
                    preventDefault(e);
                }
            }, { passive: false });
        } else {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "unset";
            document.body.style.touchAction = "auto";
        }

        return () => {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "unset";
            document.body.style.touchAction = "auto";
            window.removeEventListener('wheel', preventDefault);
            window.removeEventListener('touchmove', preventDefault);
        };
    }, [introFinished, isContactOpen]);

    const CenteredOrbit = () => {
        // Diagonal offset values
        const offset = isMobile ? 60 : 150;

        return (
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            >
                <div className="relative flex items-center justify-center gap-4 md:gap-12 lg:gap-16">
                    {/* Icon 1: Asterisk - From Left -> Horizontal -> Up-Left Diagonal */}
                    <motion.div
                        className="w-[18vw] h-[18vw] md:w-[7rem] md:h-[7rem] lg:w-[10.5rem] lg:h-[10.5rem] relative"
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
                        <motion.div className="w-full h-full relative" layoutId="icon1">
                            <AsteriskShape />
                        </motion.div>
                    </motion.div>

                    {/* Icon 2: Cluster - From Bottom -> Horizontal -> Center Diagonal */}
                    <motion.div
                        className="w-[18vw] h-[18vw] md:w-[7rem] md:h-[7rem] lg:w-[10.5rem] lg:h-[10.5rem] relative"
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
                        <motion.div className="w-full h-full relative" layoutId="icon2">
                            <ClusterShape />
                        </motion.div>
                    </motion.div>

                    {/* Icon 3: Arrow - From Right -> Horizontal -> Down-Right Diagonal */}
                    <motion.div
                        className="w-[18vw] h-[18vw] md:w-[7rem] md:h-[7rem] lg:w-[10.5rem] lg:h-[10.5rem] relative"
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
                        <motion.div className="w-full h-full relative" layoutId="icon3">
                            <ArrowIconShape />
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="sticky top-0 w-full h-[100dvh] bg-white selection:bg-[#ffe01b] selection:text-black overflow-hidden z-0 flex flex-col items-center justify-center pt-10 md:pt-16">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap'); .font-bebas { font-family: 'Bebas Neue', sans-serif; }`}</style>

            {/* CenteredOrbit moved inside layout below */}

            <motion.div
                className="w-full h-full flex flex-col items-center justify-center gap-4 sm:gap-5 md:gap-7 lg:gap-8 pointer-events-none px-4"
            >
                {showOrbit && <CenteredOrbit />}
                <motion.div style={{ opacity: opacityLine1 }} className={`relative flex ${isMobile ? 'flex-col gap-3' : 'items-center justify-center'} w-full overflow-visible`}>
                    <motion.div className={`flex items-center ${isMobile ? 'justify-start pl-2 gap-4' : 'justify-center'}`}>
                        <motion.span {...textFade} style={{ x: xLeft }} className={fontClass}>TRANS</motion.span>
                        <motion.div style={{ opacity: iconOpacity, scale: iconScale }} className={shapeWrapper}>
                            {!showOrbit && (
                                <motion.div
                                    className="w-full h-full"
                                    layoutId="icon1"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                >
                                    <AsteriskShape />
                                </motion.div>
                            )}
                        </motion.div>
                        {!isMobile && <motion.span {...textFade} style={{ x: xRight }} className={fontClass}>FORMING</motion.span>}
                    </motion.div>
                    {isMobile && (
                        <motion.div className="flex justify-end w-full pr-2">
                            <motion.span {...textFade} style={{ x: xRight }} className={fontClass}>FORMING</motion.span>
                        </motion.div>
                    )}
                </motion.div>

                <motion.div style={{ opacity: opacityLine2 }} className={`relative flex ${isMobile ? 'flex-col gap-6' : 'items-center'} justify-center w-full text-center overflow-visible`}>
                    <motion.div className="flex justify-center items-center">
                        <motion.span {...textFade} style={{ x: xLeft }} className={fontClass}>IDEAS</motion.span>
                        <motion.div style={{ opacity: iconOpacity, scale: iconScale }} className={shapeWrapper}>
                            {!showOrbit && (
                                <motion.div
                                    className="w-full h-full"
                                    layoutId="icon2"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                >
                                    <ClusterShape />
                                </motion.div>
                            )}
                        </motion.div>
                        <motion.span {...textFade} style={{ x: xRight }} className={fontClass}>INTO</motion.span>
                    </motion.div>

                    <motion.button
                        ref={buttonRef}
                        initial={{ width: "65px", opacity: 0, scale: 0.8 }}
                        animate={{
                            width: isContactOpen ? "50px" : (isMobile ? "260px" : "280px"),
                            opacity: isContactOpen ? 0 : 1,
                            scale: isContactOpen ? 0.5 : 1,
                            y: [0, -4, 0]
                        }}
                        transition={{
                            width: { delay: introFinished ? 0 : 3.2, duration: introFinished ? 0.6 : 1.4, ease: [0.16, 1, 0.3, 1] },
                            opacity: { delay: introFinished ? 0 : 2.4, duration: introFinished ? 0.4 : 0.8 },
                            scale: { delay: introFinished ? 0 : 2.4, duration: introFinished ? 0.4 : 0.8 },
                            y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleOpenContact}
                        className="relative bg-zinc-900 text-white h-[48px] md:h-[55px] lg:h-[62px] flex items-center justify-center overflow-hidden ml-0 md:ml-10 self-center group pointer-events-auto flex-shrink-0"
                        style={{
                            clipPath: "polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)",
                            x: isMobile ? 0 : xRight,
                            rotate: isMobile ? mobileButtonRotate : buttonRotate
                        }}
                    >
                        {/* Shine effect on expand */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "200%" }}
                            transition={{ delay: introFinished ? 0 : 3.8, duration: 1.5, ease: "easeInOut" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
                        />

                        <div className="flex items-center justify-between w-full h-full px-4 md:px-8">
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: introFinished ? 0 : 3.6, duration: 0.8 }}
                                className="font-sans font-bold text-[14px] md:text-[16px] lg:text-[18px] whitespace-nowrap tracking-[0.1em] uppercase"
                            >
                                Work with us
                            </motion.span>
                            <motion.div
                                initial={{ rotate: -90, scale: 0 }}
                                animate={{ rotate: 0, scale: 1 }}
                                transition={{ delay: introFinished ? 0 : 2.8, duration: 0.6, type: "spring" }}
                                className="shrink-0"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </motion.div>
                        </div>
                    </motion.button>
                </motion.div>

                <motion.div style={{ opacity: opacityLine3 }} className="relative flex items-center justify-center w-full text-center overflow-visible">
                    <motion.div className="flex justify-center items-center">
                        <motion.span {...textFade} style={{ x: xLeft }} className={`${fontClass} !text-[#ffe01b]`}>EXPERI</motion.span>
                        <motion.div style={{ opacity: iconOpacity, scale: iconScale }} className={shapeWrapper}>
                            {!showOrbit && (
                                <motion.div
                                    className="w-full h-full"
                                    layoutId="icon3"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                >
                                    <ArrowIconShape />
                                </motion.div>
                            )}
                        </motion.div>
                        <motion.span {...textFade} style={{ x: xRight }} className={`${fontClass} !text-[#ffe01b]`}>ENCES</motion.span>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Sub-labels positioned in "safe zones" to ensure visibility */}
            <SmallLabel
                style={{ x: xRight }}
                className="hidden lg:block absolute right-[45%] top-[6%] text-right"
            >
                CUSTOM AI SOLUTIONS<br />& INTEGRATIONS
            </SmallLabel>

            <SmallLabel
                style={{ x: xLeft }}
                className="hidden lg:block absolute left-[2%] top-[45%] text-left"
            >
                WEB & APP<br />DEVELOPMENT
            </SmallLabel>

            <SmallLabel
                style={{ x: xLeft }}
                className="hidden lg:block absolute left-[2%] top-[80%] text-left"
            >
                SYSTEM INTEGRATION<br />& CLOUD
            </SmallLabel>

            <SmallLabel
                style={{ x: xRight }}
                className="hidden lg:block absolute right-[5%] top-[80%] text-right"
            >
                MAINTENANCE<br />& SECURITY
            </SmallLabel>

            <MorphingModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} initialPos={buttonPos} />
        </div>
    );
}
