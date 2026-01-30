"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function MorphingModal({ isOpen, onClose, initialPos }) {
    const [mounted, setMounted] = useState(false);
    const [status, setStatus] = useState("button");
    const [showContent, setShowContent] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (isOpen && initialPos) {
            setStatus("button");
            const t1 = setTimeout(() => setStatus("pillar"), 50);
            const t2 = setTimeout(() => setStatus("modal"), 650);
            const t3 = setTimeout(() => setShowContent(true), 1100);
            return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
        } else {
            setStatus("button");
            setShowContent(false);
        }
    }, [isOpen, initialPos]);

    const handleClose = () => {
        setShowContent(false);
        setStatus("pillar");
        setTimeout(() => {
            setStatus("button");
            setTimeout(onClose, 600);
        }, 600);
    };

    if (!mounted || !initialPos) return null;

    const variants = {
        button: { top: initialPos.top, left: initialPos.left, width: initialPos.width, height: initialPos.height, borderRadius: "100px", x: 0, y: 0 },
        pillar: { top: 0, left: initialPos.left, width: initialPos.width, height: "100vh", borderRadius: "0px" },
        modal: { top: 0, left: 0, width: "100vw", height: "100vh", borderRadius: "0px" }
    };

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] pointer-events-none">
                    <motion.div
                        initial="button"
                        animate={status}
                        exit="button"
                        variants={variants}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute bg-[#EAFE7C] overflow-hidden flex flex-col items-center justify-center pointer-events-auto"
                    >
                        <AnimatePresence>
                            {status === "modal" && showContent && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="w-full h-full flex flex-col items-center justify-center px-6 relative"
                                >
                                    <button onClick={handleClose} className="absolute top-10 right-10 text-black p-4"><X size={48} /></button>
                                    <h2 className="text-black text-[15vw] font-[1000] tracking-tighter text-center uppercase leading-[0.7] mb-12">LET'S WORK<br />TOGETHER</h2>
                                    <div className="flex flex-col gap-6 w-full max-w-xl">
                                        <button className="w-full py-10 bg-black text-[#EAFE7C] rounded-[40px] font-black text-4xl uppercase">Schedule a Meeting</button>
                                        <button className="w-full py-10 border-[6px] border-black text-black rounded-[40px] font-black text-4xl uppercase">Send us a Message</button>
                                    </div>
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

const X = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);
