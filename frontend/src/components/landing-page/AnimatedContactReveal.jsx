"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import ContactUs from "./CotactUs";

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

    const modalContentRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleScrollAttempt = (e) => {
            // Allow scrolling inside the modal content area
            if (modalContentRef.current && modalContentRef.current.contains(e.target)) {
                return;
            }
            // Close the modal only if scrolling outside the modal content
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
                    <motion.div ref={modalContentRef} initial="button" animate={status} exit="button" variants={variants} className="absolute bg-[#FFFF00] overflow-hidden flex flex-col items-center justify-center pointer-events-auto shadow-2xl">
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

export default function AnimatedContactReveal() {
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

    // Listen for navbar's "open-contact-modal" event
    useEffect(() => {
        const handleNavbarContact = () => {
            if (buttonRef.current) {
                const rect = buttonRef.current.getBoundingClientRect();
                setButtonPos({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
            } else {
                // Fallback position if button not in view
                setButtonPos({ top: window.innerHeight / 2, left: window.innerWidth / 2, width: 280, height: 55 });
            }
            setIsContactOpen(true);
        };

        window.addEventListener('open-contact-modal', handleNavbarContact);
        return () => window.removeEventListener('open-contact-modal', handleNavbarContact);
    }, []);

    return (
        <div className="relative z-10 w-full flex items-center justify-center">
            <motion.div
                ref={buttonRef}
                animate={{
                    opacity: isContactOpen ? 0 : 1,
                    scale: isContactOpen ? 0.8 : 1,
                    pointerEvents: isContactOpen ? "none" : "auto"
                }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#FFFF00] overflow-hidden flex flex-col items-center justify-center pointer-events-auto shadow-[0_20px_50px_rgba(255,224,27,0.3)] w-[260px] h-[55px] md:w-[320px] md:h-[65px] cursor-pointer"
                style={{
                    clipPath: "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)"
                }}
                onClick={handleOpenContact}
            >
                <div className="flex items-center justify-between w-full px-8 text-black">
                    <span className="text-sm md:text-lg font-black uppercase tracking-[0.1em] font-sans">Work with us</span>
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-black rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                        <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-[#FFFF00]" strokeWidth={3} />
                    </div>
                </div>
            </motion.div>

            <MorphingModal
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
                initialPos={buttonPos}
            />
        </div>
    );
}
