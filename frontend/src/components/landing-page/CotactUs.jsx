"use client";

import React, { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { InlineWidget } from "react-calendly";

export default function ContactUs({ isOpen, onClose }) {
    const [view, setView] = useState("selection"); // 'selection' or 'form'
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        interest: "",
        message: ""
    });
    const [isInterestOpen, setIsInterestOpen] = useState(false);

    // Reset view when modal opens/closes
    React.useEffect(() => {
        if (!isOpen) {
            // Wait for exit animation to finish before resetting
            const timer = setTimeout(() => setView("selection"), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const [status, setStatus] = useState("idle"); // idle, loading, success, error

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 640);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ email: "", company: "", interest: "", message: "" });
                setTimeout(() => {
                    onClose();
                    setStatus("idle");
                }, 2000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Error sending email:", error);
            setStatus("error");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="w-full h-full flex items-center justify-center font-sans pointer-events-auto relative z-[10002]">
            <style jsx="true">{`
                input:-webkit-autofill,
                input:-webkit-autofill:hover, 
                input:-webkit-autofill:focus,
                textarea:-webkit-autofill,
                textarea:-webkit-autofill:hover,
                textarea:-webkit-autofill:focus {
                    -webkit-text-fill-color: #ffff00;
                    -webkit-box-shadow: 0 0 0px 1000px #111 inset;
                    transition: background-color 5000s ease-in-out 0s;
                }
            `}</style>

            {/* Main Modal Container */}
            <motion.div
                transition={{
                    duration: 0.4,
                    ease: [0.23, 1, 0.32, 1],
                }}
                className={`relative bg-black text-white w-full 
                    ${view === 'calendly'
                        ? 'max-w-full sm:max-w-lg md:max-w-3xl px-0 sm:px-3 md:px-5 py-3 sm:py-6 md:py-10 pb-2 sm:pb-6'
                        : 'max-w-lg md:max-w-3xl p-4 sm:p-6 md:p-10 pb-8 sm:pb-12 md:pb-16'
                    } 
                    ${view === 'calendly'
                        ? 'rounded-none sm:rounded-[30px] md:rounded-[40px] mx-0 sm:mx-2 md:mx-4'
                        : 'rounded-[20px] sm:rounded-[30px] md:rounded-[40px] mx-1 sm:mx-2 md:mx-4'
                    } shadow-2xl flex flex-col 
                    ${view === 'calendly'
                        ? 'h-[100dvh] sm:h-[92dvh] md:h-[90vh] overflow-hidden'
                        : 'h-auto max-h-[95dvh] sm:max-h-[92dvh] md:max-h-[90vh] overflow-y-auto'
                    }`}
                style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
            >
                {/* Header Controls: Back & Close */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-10 md:right-10 flex items-center gap-3 sm:gap-4 md:gap-6 z-20">
                    {view !== "selection" && (
                        <button
                            onClick={() => setView("selection")}
                            className="text-xs sm:text-sm font-bold text-gray-400 hover:text-white uppercase tracking-wider transition-all flex items-center h-8 cursor-pointer"
                        >
                            Back
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="text-white/80 hover:text-[#FFFF00] transition-all flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full hover:bg-white/10 cursor-pointer"
                    >
                        <X size={20} className="sm:hidden" strokeWidth={2.5} />
                        <X size={24} className="hidden sm:block" strokeWidth={2.5} />
                    </button>
                </div>

                <div className="flex-1 flex flex-col min-h-0">
                    <AnimatePresence mode="wait">
                        {view === "selection" ? (
                            <motion.div
                                key="selection"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col items-center justify-center flex-1 space-y-6 sm:space-y-8 text-center py-6 sm:py-8 md:py-10 px-2"
                            >
                                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-6 sm:mb-8 md:mb-12 uppercase tracking-tight leading-tight">
                                    Let's Work Together
                                </h2>

                                <div className="w-full space-y-3 sm:space-y-4 md:space-y-5 max-w-md">
                                    <motion.button
                                        onClick={() => setView("calendly")}
                                        whileHover={{ scale: 1.02, backgroundColor: "#E6E600" }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 sm:py-5 md:py-6 bg-[#FFFF00] text-black font-black text-base sm:text-lg md:text-xl rounded-xl sm:rounded-2xl transition-all shadow-[0_10px_30px_rgba(255,255,0,0.2)] uppercase leading-none cursor-pointer"
                                    >
                                        Schedule a Meeting
                                    </motion.button>

                                    <motion.button
                                        onClick={() => setView("form")}
                                        whileHover={{ scale: 1.02, borderColor: "#FFFF00", color: "#FFFF00" }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 sm:py-5 md:py-6 border-2 border-white/20 text-white font-black text-base sm:text-lg md:text-xl rounded-xl sm:rounded-2xl transition-all uppercase leading-none cursor-pointer"
                                    >
                                        Send us a Message
                                    </motion.button>
                                </div>
                            </motion.div>
                        ) : view === "calendly" ? (
                            <motion.div
                                key="calendly"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.35 }}
                                className="flex flex-col flex-1 h-full min-h-0"
                            >
                                <div className="flex items-center justify-between mb-2 sm:mb-4 md:mb-6 shrink-0 px-3 sm:px-0">
                                    <h2 className="text-lg sm:text-2xl md:text-3xl font-black uppercase tracking-tight">Schedule Meeting</h2>
                                </div>

                                <div className="calendly-container flex-1 w-full rounded-none sm:rounded-[16px] md:rounded-[20px] overflow-hidden bg-white/5 sm:border sm:border-white/10 shadow-inner min-h-0">
                                    <InlineWidget
                                        url="https://cal.id/zippy-digital-solutions"
                                        styles={{
                                            height: '100%',
                                            width: '100%',
                                            borderRadius: '20px'
                                        }}
                                        pageSettings={{
                                            backgroundColor: 'ffffff',
                                            hideEventTypeDetails: false,
                                            hideLandingPageDetails: isMobile,
                                            primaryColor: 'ffed00',
                                            textColor: '000000'
                                        }}
                                    />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.35 }}
                                className="flex flex-col flex-1 pb-4 sm:pb-6 md:pb-10 pt-6 sm:pt-0"
                            >
                                <div className="mb-6 sm:mb-8 md:mb-10 text-center md:text-left">
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-1 uppercase tracking-tight">Send us a Message</h2>
                                    <p className="text-gray-500 font-medium text-sm sm:text-base">We'll get back to you within 24 hours.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="flex flex-col space-y-3 sm:space-y-4 md:space-y-5 flex-1 w-full">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                                        <div className="flex flex-col space-y-1 sm:space-y-1.5">
                                            <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                            <input
                                                type="text"
                                                placeholder="Enter your name"
                                                className="w-full bg-[#111] border border-[#222] rounded-lg sm:rounded-xl px-4 py-2.5 sm:py-3.5 text-sm text-white focus:outline-none focus:border-[#FFFF00] transition-all"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col space-y-1 sm:space-y-1.5">
                                            <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email</label>
                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                className="w-full bg-[#111] border border-[#222] rounded-lg sm:rounded-xl px-4 py-2.5 sm:py-3.5 text-sm text-white focus:outline-none focus:border-[#FFFF00] transition-all"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col space-y-1 sm:space-y-1.5">
                                            <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Company</label>
                                            <input
                                                type="text"
                                                placeholder="Company name"
                                                className="w-full bg-[#111] border border-[#222] rounded-lg sm:rounded-xl px-4 py-2.5 sm:py-3.5 text-sm text-white focus:outline-none focus:border-[#FFFF00] transition-all"
                                                value={formData.company}
                                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            />
                                        </div>
                                        <div className="flex flex-col space-y-1 sm:space-y-1.5">
                                            <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Interest</label>
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsInterestOpen(!isInterestOpen)}
                                                    className={`w-full bg-[#111] border rounded-lg sm:rounded-xl px-4 py-2.5 sm:py-3.5 text-sm text-left flex items-center justify-between transition-all duration-300 cursor-pointer ${isInterestOpen ? 'border-[#FFFF00] ring-1 ring-[#FFFF00]/20' : 'border-[#222] text-gray-400'}`}
                                                >
                                                    <span className={formData.interest ? 'text-white font-medium' : 'text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap'}>
                                                        {formData.interest
                                                            ? ["Web Development", "Mobile App", "UI/UX Design", "Other"].find(l => l.toLowerCase().includes(formData.interest)) || formData.interest
                                                            : "What are you interested in?"}
                                                    </span>
                                                    <motion.div
                                                        animate={{ rotate: isInterestOpen ? 180 : 0 }}
                                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                                    >
                                                        <ChevronDown className={`w-4 h-4 transition-colors ${isInterestOpen ? 'text-[#FFFF00]' : 'text-gray-500'}`} />
                                                    </motion.div>
                                                </button>

                                                <AnimatePresence>
                                                    {isInterestOpen && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                            animate={{ opacity: 1, y: 5, scale: 1 }}
                                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                                            className="absolute top-full left-0 w-full bg-[#0a0a0a] border border-[#222] rounded-xl overflow-hidden z-[60] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                                                        >
                                                            {[
                                                                { value: "web", label: "Web Development" },
                                                                { value: "mobile", label: "Mobile App" },
                                                                { value: "design", label: "UI/UX Design" },
                                                                { value: "other", label: "Other" }
                                                            ].map((opt) => (
                                                                <motion.button
                                                                    key={opt.value}
                                                                    type="button"
                                                                    whileHover={{ backgroundColor: "rgba(255, 255, 0, 0.05)" }}
                                                                    onClick={() => {
                                                                        setFormData({ ...formData, interest: opt.value });
                                                                        setIsInterestOpen(false);
                                                                    }}
                                                                    className="w-full text-left px-5 py-3 text-sm text-gray-300 hover:text-[#FFFF00] transition-colors flex items-center justify-between group cursor-pointer"
                                                                >
                                                                    <span className="font-medium tracking-wide uppercase text-[10px] sm:text-[11px]">{opt.label}</span>
                                                                    {formData.interest === opt.value && (
                                                                        <motion.div
                                                                            layoutId="active-indicator"
                                                                            className="w-1.5 h-1.5 rounded-full bg-[#FFFF00]"
                                                                        />
                                                                    )}
                                                                </motion.button>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col space-y-1 sm:space-y-1.5">
                                        <label className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Project Details</label>
                                        <textarea
                                            placeholder="Tell us about your project..."
                                            className="w-full h-20 sm:h-24 md:h-28 bg-[#111] border border-[#222] rounded-lg sm:rounded-xl px-4 py-3 text-sm text-white resize-none focus:outline-none focus:border-[#FFFF00] transition-all"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="pt-2 sm:pt-3">
                                        <motion.button
                                            whileHover={{ scale: 1.01, backgroundColor: "#E6E600" }}
                                            whileTap={{ scale: 0.99 }}
                                            disabled={status === "loading"}
                                            className="w-full py-3.5 sm:py-4 md:py-5 bg-[#FFFF00] text-black rounded-xl sm:rounded-2xl font-black text-base sm:text-lg md:text-xl transition-all uppercase tracking-tight shadow-[0_15px_40px_rgba(255,255,0,0.15)] disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
                                        >
                                            <div className="flex items-center justify-center gap-2 sm:gap-3">
                                                {status === "loading" ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                                        <span>Processing...</span>
                                                    </div>
                                                ) : status === "success" ? (
                                                    "Sent Successfully!"
                                                ) : status === "error" ? (
                                                    "Failed. Try Again"
                                                ) : (
                                                    "Send Message"
                                                )}
                                            </div>
                                        </motion.button>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
