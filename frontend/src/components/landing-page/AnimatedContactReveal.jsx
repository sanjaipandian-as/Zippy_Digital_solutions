"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ContactUs from "./CotactUs";

export default function AnimatedContactReveal() {
    const [status, setStatus] = useState("button");
    const [showContent, setShowContent] = useState(false);
    const isClosingRef = useRef(false);

    useEffect(() => {
        if (status !== "button") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [status]);

    useEffect(() => {
        if (status === "button") return;

        const handleScrollAttempt = () => {
            handleClose();
        };

        window.addEventListener('wheel', handleScrollAttempt, { passive: true });
        window.addEventListener('touchmove', handleScrollAttempt, { passive: true });

        return () => {
            window.removeEventListener('wheel', handleScrollAttempt);
            window.removeEventListener('touchmove', handleScrollAttempt);
        };
    }, [status]);

    const handleOpen = () => {
        isClosingRef.current = false;
        setStatus("pillar");
        setTimeout(() => setStatus("modal"), 600);
        setTimeout(() => setShowContent(true), 1100);
    };

    const handleClose = () => {
        if (isClosingRef.current) return;
        isClosingRef.current = true;
        setShowContent(false);
        setStatus("pillar");
        setTimeout(() => {
            setStatus("button");
            setTimeout(() => {
                isClosingRef.current = false;
            }, 600);
        }, 600);
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
            <motion.div
                layout
                transition={{
                    layout: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
                }}
                className={`
                    bg-[#ccff00] overflow-hidden flex flex-col items-center justify-center pointer-events-auto
                    ${status === "button" ? "w-[88vw] max-w-sm h-16 md:w-80 md:h-20 rounded-[1.5rem] md:rounded-[2rem] cursor-pointer" : ""}
                    ${status === "pillar" ? "w-80 h-screen rounded-none" : ""}
                    ${status === "modal" ? "w-full h-screen rounded-none" : ""}
                `}
                onClick={() => {
                    if (status === "button") handleOpen();
                }}
            >
                <AnimatePresence mode="wait">
                    {status === "button" && (
                        <motion.div
                            key="btn-content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.1 } }}
                            className="flex items-center gap-4 text-black"
                        >
                            <span className="text-lg md:text-2xl font-black uppercase tracking-tighter">Work with us</span>
                            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                                <ArrowUpRight className="w-5 h-5 text-[#ccff00]" strokeWidth={3} />
                            </div>
                        </motion.div>
                    )}

                    {status === "modal" && (
                        <motion.div
                            key="modal-content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.1 }}
                            className="w-full h-full flex items-center justify-center relative"
                        >
                            {showContent && (
                                <ContactUs
                                    isOpen={true}
                                    onClose={(e) => {
                                        if (e) e.stopPropagation();
                                        handleClose();
                                    }}
                                />
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
