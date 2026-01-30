"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ContactUs from "./CotactUs";

const AsteriskShape = () => (
    <div className="w-full h-full bg-[#ccff00] relative flex items-center justify-center overflow-hidden">
        <div className="absolute w-[15%] h-[70%] bg-[#b0b0b0]" />
        <div className="absolute w-[15%] h-[70%] bg-[#b0b0b0] rotate-90" />
        <div className="absolute w-[15%] h-[70%] bg-[#b0b0b0] rotate-45" />
        <div className="absolute w-[15%] h-[70%] bg-[#b0b0b0] -rotate-45" />
    </div>
);

const ClusterShape = () => (
    <div className="w-full h-full bg-transparent grid grid-cols-2 grid-rows-2 gap-1 p-1">
        <div className="bg-black" style={{ clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)" }}></div>
        <div className="bg-black" style={{ clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)" }}></div>
        <div className="bg-black" style={{ clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)" }}></div>
        <div className="bg-black" style={{ clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)" }}></div>
    </div>
);

const ArrowIconShape = () => (
    <div className="w-full h-full bg-black flex items-center justify-center" style={{ clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)" }}>
        <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="square" strokeLinejoin="miter" />
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
                <div className="fixed inset-0 z-[100] pointer-events-none">
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

    const getComplexAnimation = (id) => {
        let initialX = 0;
        let initialY = 0;
        let midX = 0;

        if (id === "icon1") {
            initialX = 2000;
            midX = "-22vw";
        }
        if (id === "icon2") {
            initialX = -2000;
            midX = "0vw";
        }
        if (id === "icon3") {
            initialY = 2000;
            midX = "22vw";
        }

        return {
            initial: { x: initialX, y: initialY, opacity: 0, scale: 0.4, rotate: -45 },
            animate: {
                x: [initialX, midX, 0],
                y: [initialY, 0, 0],
                opacity: [0, 1, 1],
                scale: [0.4, 1.1, 1],
                rotate: [-45, 0, 0]
            },
            transition: {
                duration: 2.8,
                times: [0, 0.45, 1],
                ease: [0.76, 0, 0.24, 1],
                delay: 0.2
            }
        };
    };

    const textFade = {
        initial: { opacity: 0, y: 40, filter: "blur(10px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        transition: { duration: 1, delay: 2.4, ease: [0.22, 1, 0.36, 1] }
    };

    return (
        <div className="relative w-full min-h-screen bg-[#e0e0e0] overflow-x-hidden selection:bg-[#ccff00] selection:text-black">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap'); .font-bebas { font-family: 'Bebas Neue', sans-serif; }`}</style>

            <motion.div
                style={{ y: yText, scale: scaleText, opacity: opacityText }}
                className="w-full h-screen md:min-h-screen flex flex-col items-center justify-evenly md:justify-center md:gap-4 py-20 md:py-0"
            >
                <div className="relative flex items-center justify-center w-full px-4 text-center overflow-visible">
                    <motion.div className="flex flex-wrap justify-center items-center">
                        <motion.span {...textFade} className={fontClass}>TRANS</motion.span>
                        <motion.div className={shapeWrapper} {...getComplexAnimation("icon1")}>
                            <AsteriskShape />
                        </motion.div>
                        <motion.span {...textFade} className={fontClass}>FORMING</motion.span>
                    </motion.div>
                    <SmallLabel className="hidden lg:block absolute left-[8%] top-1/2 -translate-y-1/2 text-right">WEB & APP<br />DEVELOPMENT</SmallLabel>
                </div>

                <div className="relative flex items-center justify-center w-full px-4 text-center gap-2 md:gap-4 overflow-visible">
                    <motion.div className="flex flex-wrap justify-center items-center">
                        <motion.span {...textFade} className={fontClass}>IDEAS</motion.span>
                        <motion.div className={shapeWrapper} {...getComplexAnimation("icon2")}>
                            <ClusterShape />
                        </motion.div>
                        <motion.span {...textFade} className={fontClass}>INTO</motion.span>
                        <motion.button
                            ref={buttonRef}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 3.4, duration: 0.8 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleOpenContact}
                            className={`h-[50px] md:h-[70px] lg:h-[80px] bg-black text-white px-6 md:px-10 rounded-full flex items-center gap-2 md:gap-4 ml-0 mt-4 md:mt-0 md:ml-8 self-center group transition-all duration-300 ${isContactOpen ? 'opacity-0 pointer-events-none scale-50' : 'opacity-100'}`}
                        >
                            <span className="font-sans font-medium text-sm md:text-xl whitespace-nowrap uppercase tracking-tighter">Work with us</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                        </motion.button>
                    </motion.div>
                    <SmallLabel className="hidden lg:block absolute right-[12%] top-0 text-left">CUSTOM AI SOLUTIONS<br />& INTEGRATION</SmallLabel>
                </div>

                <div className="relative flex items-center justify-center w-full px-4 text-center overflow-visible">
                    <motion.div className="flex flex-wrap justify-center items-center">
                        <motion.span {...textFade} className={`${fontClass} !text-[#ccff00]`}>EXPERI</motion.span>
                        <motion.div className={shapeWrapper} {...getComplexAnimation("icon3")}>
                            <ArrowIconShape />
                        </motion.div>
                        <motion.span {...textFade} className={`${fontClass} !text-[#ccff00]`}>ENCES</motion.span>
                    </motion.div>
                    <SmallLabel className="hidden lg:block absolute right-[18%] bottom-0 text-left">MAINTENANCE<br />& SECURITY</SmallLabel>
                    <SmallLabel className="hidden lg:block absolute left-[18%] bottom-4 text-right">SYSTEM<br />INTEGRATION<br />& CLOUD</SmallLabel>
                </div>
            </motion.div>
            <MorphingModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} initialPos={buttonPos} />
        </div>
    );
}