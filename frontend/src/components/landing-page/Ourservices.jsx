"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

const HexArrowIcon = ({ color, arrowColor }) => (
    <div className="relative w-10 h-10 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            <path
                d="M50 5 L89 27.5 L89 72.5 L50 95 L11 72.5 L11 27.5 Z"
                fill="none"
                stroke={color}
                strokeWidth="8"
            />
        </svg>
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 relative z-10">
            <path
                d="M7 17L17 7M17 7H8M17 7V16"
                stroke={arrowColor || color}
                strokeWidth="2.5"
                strokeLinecap="square"
            />
        </svg>
    </div>
);

const services = [
    {
        id: 1,
        title: "Web Development",
        subItems: ["Basic Website Design", "Custom Website Design", "Responsive Web Design", "E-commerce Website Design", "Landing Page Design", "One-Page Website", "Mobile-Optimized Website", "Multilingual Website Development", "CMS Website", "Custom Web Development", "Website Redesign", "Maintenance & Support"],
        category: "ENGINEERING",
        bgColor: "bg-[#ffe01b]",
        textColor: "text-black",
        gridClass: "lg:col-span-2 lg:row-span-1",
        colIndex: 0,
        rowIndex: 0
    },
    {
        id: 2,
        title: "Branding",
        subItems: ["Logo Design", "Brand Identity Creation", "Guidelines & Strategy", "Business Card & Stationery", "Packaging Design", "Corporate Identity", "Brand Positioning", "Messaging & Voice"],
        category: "CREATIVE",
        bgColor: "bg-zinc-900",
        textColor: "text-white",
        gridClass: "lg:col-span-1 lg:row-span-1",
        colIndex: 2,
        rowIndex: 0
    },
    {
        id: 3,
        title: "Digital Marketing",
        subItems: ["SEO (Local, Int, Tech)", "PPC Advertising", "Google/FB/IG Ads", "Social Media Marketing", "Reputation Management", "Conversion Rate Optimization"],
        category: "MARKETING",
        bgColor: "bg-[#ffe01b]",
        textColor: "text-black",
        gridClass: "lg:col-span-1 lg:row-span-2",
        colIndex: 3,
        rowIndex: 0
    },
    {
        id: 4,
        title: "Design",
        subItems: ["Social Media Graphics", "Infographics", "Website Graphics", "Product Design", "Illustrations", "Brochure & Poster Design"],
        category: "CREATIVE",
        bgColor: "bg-zinc-900",
        textColor: "text-white",
        gridClass: "lg:col-span-1 lg:row-span-1",
        colIndex: 0,
        rowIndex: 1
    },
    {
        id: 5,
        title: "E-commerce",
        subItems: ["Store Setup (Shopify/Woo)", "Payment Integration", "Inventory Management", "Marketplace Integration", "Migration", "Custom Development"],
        category: "SALES",
        bgColor: "bg-zinc-200",
        textColor: "text-black",
        gridClass: "lg:col-span-2 lg:row-span-1",
        colIndex: 1,
        rowIndex: 1
    },
    {
        id: 6,
        title: "Mobile Apps",
        subItems: ["iOS & Android Dev", "Cross-Platform", "App UI/UX Design", "App Store Optimization", "PWA Development", "Prototyping"],
        category: "ENGINEERING",
        bgColor: "bg-[#ffe01b]",
        textColor: "text-black",
        gridClass: "lg:col-span-1 lg:row-span-1",
        colIndex: 0,
        rowIndex: 2
    },
    {
        id: 7,
        title: "Content & Video",
        subItems: ["Copywriting & Blogging", "SEO Content", "Video Production", "Explainer Videos", "Social Media Copy", "Whitepapers"],
        category: "PRODUCTION",
        bgColor: "bg-zinc-900",
        textColor: "text-white",
        gridClass: "lg:col-span-1 lg:row-span-2",
        colIndex: 1,
        rowIndex: 2
    },
    {
        id: 8,
        title: "Analytics",
        subItems: ["GA4 Setup", "Heatmaps", "User Behavior", "A/B Testing", "Data Visualization", "Sales Funnel Opt"],
        category: "STRATEGY",
        bgColor: "bg-zinc-50",
        textColor: "text-black",
        gridClass: "lg:col-span-1 lg:row-span-1",
        colIndex: 2,
        rowIndex: 2
    },
    {
        id: 9,
        title: "Hosting",
        subItems: ["Shared/VPS/Dedicated", "Cloud & WP Hosting", "SSL & Security", "CDN Integration", "Domain Registration"],
        category: "SYSTEMS",
        bgColor: "bg-zinc-800",
        textColor: "text-white",
        gridClass: "lg:col-span-1 lg:row-span-1",
        colIndex: 3,
        rowIndex: 2
    },
    {
        id: 10,
        title: "Consulting",
        subItems: ["Digital Transformation", "SEO Strategy", "Marketing Automation", "Content Strategy", "E-commerce Strategy"],
        category: "ADVISORY",
        bgColor: "bg-zinc-200",
        textColor: "text-black",
        gridClass: "lg:col-span-1 lg:row-span-1",
        colIndex: 0,
        rowIndex: 3
    },
    {
        id: 11,
        title: "Specialized",
        subItems: ["Voice Search Opt", "Chatbot Dev", "AI/ML Solutions", "Blockchain", "VR/AR Design", "CRM/ERP Integration"],
        category: "INNOVATION",
        bgColor: "bg-[#ffe01b]",
        textColor: "text-black",
        gridClass: "lg:col-span-2 lg:row-span-1",
        colIndex: 2,
        rowIndex: 3
    },
    {
        id: 12,
        title: "IT STAFFING",
        subItems: ["Permanent Staffing", "Contract Staffing", "Contract-to-Hire", "Dedicated Development Teams", "Remote IT Resources", "Project-Based Staffing"],
        category: "RESOURCES",
        bgColor: "bg-white",
        textColor: "text-black",
        gridClass: "lg:col-span-4 lg:row-span-1",
        colIndex: 0,
        rowIndex: 4
    }
];

const ServiceAccordion = () => {
    const [activeId, setActiveId] = useState(null);
    const [isDesktop, setIsDesktop] = useState(false);
    const containerRef = useRef(null);

    // Scroll-based animation
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start start"]
    });

    // Smoothed scroll progress for buttery movement
    const smoothScroll = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Fluid scroll-driven values
    const yPosition = useTransform(smoothScroll, [0, 1], [120, 0]);
    const opacity = useTransform(smoothScroll, [0, 0.4, 0.8], [0, 1, 1]);
    const scale = useTransform(smoothScroll, [0, 1], [0.98, 1]);

    React.useEffect(() => {
        const checkLayout = () => setIsDesktop(window.innerWidth >= 1024);
        checkLayout();
        window.addEventListener('resize', checkLayout);
        return () => window.removeEventListener('resize', checkLayout);
    }, []);

    const getGridStyles = () => {
        if (!isDesktop) return {};
        if (!activeId) return { gridTemplateColumns: "1fr 1fr 1fr 1fr", gridTemplateRows: "1fr 1fr 1fr 1fr 1fr" };
        const activeItem = services.find(s => s.id === activeId);
        const cols = [1, 1, 1, 1];
        const rows = [0.9, 0.9, 0.9, 0.9, 0.9];
        cols[activeItem.colIndex] = 1.6;
        rows[activeItem.rowIndex] = 2.5;
        return {
            gridTemplateColumns: cols.map(c => `${c}fr`).join(" "),
            gridTemplateRows: rows.map(r => `${r}fr`).join(" ")
        };
    };

    return (
        <section
            ref={containerRef}
            id="services"
            className="w-full min-h-screen bg-white p-4 sm:p-6 flex flex-col items-center justify-start pt-6 md:pt-10 relative z-10 overflow-hidden"
        >
            <motion.div
                className="w-full flex flex-col items-center"
                style={{
                    y: yPosition,
                    opacity,
                    scale
                }}
            >
                <div className="w-full max-w-[1600px] mb-2 lg:mb-4 px-2 self-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="block text-xs sm:text-sm lg:text-base font-bold tracking-[0.4em] lg:tracking-[0.5em] uppercase text-gray-400 mb-2">
                            WHAT WE DO
                        </span>
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bebas font-black uppercase text-black tracking-tight leading-none flex overflow-hidden">
                            {"OUR SERVICES".split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ y: "100%", opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.8,
                                        delay: i * 0.04,
                                        ease: [0.33, 1, 0.68, 1]
                                    }}
                                    className={char === " " ? "mr-4" : ""}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </h3>
                    </motion.div>
                </div>
                <div
                    className="w-full max-w-[1600px] flex flex-col gap-3 lg:grid lg:h-[105vh] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={getGridStyles()}
                    onMouseLeave={() => setActiveId(null)}
                >
                    {services.map((service) => {
                        const isActive = activeId === service.id;

                        return (
                            <motion.div
                                key={service.id}
                                layout
                                onMouseEnter={() => isDesktop && setActiveId(service.id)}
                                whileInView={!isDesktop ? { opacity: 1 } : {}}
                                onViewportEnter={() => !isDesktop && setActiveId(service.id)}
                                viewport={{
                                    once: false,
                                    amount: !isDesktop ? 0.1 : 0.6,
                                    margin: !isDesktop ? "0px" : "-10% 0px -10% 0px"
                                }}
                                className={`relative flex flex-col justify-between cursor-pointer overflow-hidden rounded-2xl border border-black/5 ${service.bgColor} ${service.textColor} ${service.gridClass} ${isActive && isDesktop ? 'z-20' : isActive && !isDesktop ? 'z-20 scale-[1.02]' : 'z-10 scale-100'} transition-all duration-500 p-5 lg:p-6 min-h-[300px] lg:min-h-0`}
                            >
                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <div className="flex justify-between items-start">
                                        <motion.div layout="position">
                                            <HexArrowIcon
                                                color={service.textColor === 'text-white' ? 'white' : 'black'}
                                                arrowColor={(service.id === 4 || service.id === 9) && isActive ? '#ffe01b' : null}
                                            />
                                        </motion.div>
                                        <motion.span layout="position" className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40">
                                            {service.category}
                                        </motion.span>
                                    </div>

                                    <div className={`mt-4 flex-grow flex flex-col ${isActive || !isDesktop ? 'justify-start md:justify-center' : 'justify-end'}`}>
                                        <AnimatePresence mode="wait">
                                            {(isActive || !isDesktop) ? (
                                                <motion.div key="active" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                                                    <h2 className="text-xl lg:text-3xl font-black uppercase leading-[0.9] tracking-tighter mb-4">{service.title}</h2>
                                                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                                        {service.subItems.map((item, i) => (
                                                            <span key={i} className="text-[9px] lg:text-[10px] font-bold uppercase border-l-2 border-current pl-2 py-0.5 opacity-80 leading-tight">
                                                                {item}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <motion.div key="inactive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col">
                                                    <h3 className="text-xs lg:text-base font-black uppercase leading-tight tracking-tight mb-1 truncate">{service.title}</h3>
                                                    <p className="text-[8px] lg:text-[9px] opacity-60 font-bold uppercase tracking-wider">{service.subItems.length} SERVICES</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </section>
    );
};

export default ServiceAccordion;
