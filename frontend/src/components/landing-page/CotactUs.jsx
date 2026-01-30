"use client";

import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactUs({ isOpen, onClose }) {
    const [view, setView] = useState("selection"); // 'selection' or 'form'
    const [formData, setFormData] = useState({
        email: "",
        company: "",
        interest: "",
        message: ""
    });

    // Reset view when modal opens/closes
    React.useEffect(() => {
        if (!isOpen) {
            // Wait for exit animation to finish before resetting
            const timer = setTimeout(() => setView("selection"), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // Add actual submission logic here
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="w-full h-full flex items-center justify-center font-sans pointer-events-auto">

            {/* Main Modal Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative bg-black text-white w-full max-w-lg md:max-w-2xl p-6 md:p-12 rounded-none md:rounded-[40px] shadow-2xl mx-0 md:mx-4 flex flex-col h-full md:h-auto md:min-h-[600px] overflow-y-auto md:overflow-hidden"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 text-white/80 hover:text-[#EAFE7C] transition-colors z-20"
                >
                    <X size={32} strokeWidth={3} />
                </button>

                <AnimatePresence mode="wait">
                    {view === "selection" ? (
                        <motion.div
                            key="selection"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center justify-center flex-1 space-y-8 text-center"
                        >
                            <h2 className="text-4xl md:text-5xl font-black mb-12 uppercase tracking-tight">Let's Work Together</h2>

                            <div className="w-full space-y-4 max-w-md">
                                <button className="w-full py-5 bg-[#EAFE7C] text-black font-black text-xl rounded-2xl hover:bg-[#d9ed60] transition-transform hover:scale-[1.02] uppercase leading-none">
                                    Schedule a Meeting
                                </button>

                                <button
                                    onClick={() => setView("form")}
                                    className="w-full py-5 border-2 border-[#EAFE7C] text-[#EAFE7C] font-black text-xl rounded-2xl hover:bg-[#EAFE7C] hover:text-black transition-all uppercase leading-none"
                                >
                                    Send us a Message
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col flex-1"
                        >
                            <div className="mb-8 text-center md:text-left">
                                <h2 className="text-3xl md:text-4xl font-black mb-1 uppercase tracking-tight">Send us a Message</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col space-y-5 flex-1 w-full">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="flex flex-col space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email</label>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="w-full bg-[#111] border border-[#333] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#EAFE7C] transition-colors"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Company</label>
                                        <input
                                            type="text"
                                            placeholder="Company name"
                                            className="w-full bg-[#111] border border-[#333] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#EAFE7C] transition-colors"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Interest</label>
                                    <div className="relative">
                                        <select
                                            className="w-full bg-[#111] border border-[#333] rounded-xl px-5 py-4 text-gray-300 appearance-none focus:outline-none focus:border-[#EAFE7C] transition-colors"
                                            value={formData.interest}
                                            onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                                        >
                                            <option value="" disabled>What are you interested in?</option>
                                            <option value="web">Web Development</option>
                                            <option value="mobile">Mobile App</option>
                                            <option value="design">UI/UX Design</option>
                                            <option value="other">Other</option>
                                        </select>
                                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-1 flex-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Project Details</label>
                                    <textarea
                                        placeholder="Tell us about your project..."
                                        className="w-full flex-1 bg-[#111] border border-[#333] rounded-xl px-5 py-4 text-white resize-none focus:outline-none focus:border-[#EAFE7C] transition-colors min-h-[150px]"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                <div className="flex space-x-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setView("selection")}
                                        className="px-8 py-4 border border-[#333] rounded-xl font-bold text-white hover:bg-[#222] transition-colors uppercase text-sm tracking-wide"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-4 bg-[#EAFE7C] text-black rounded-xl font-black text-lg hover:bg-[#d9ed60] transition-colors uppercase tracking-tight shadow-[0_0_20px_rgba(234,254,124,0.1)]"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
