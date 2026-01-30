"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
        bgColor: "bg-[#5DD3B6]",
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
        bgColor: "bg-[#EFE1B5]",
        textColor: "text-black",
        gridClass: "lg:col-span-1 lg:row-span-1",
        colIndex: 2,
        rowIndex: 0
    },
    {
        id: 3,
        title: "Digital Marketing",
        subItems: ["SEO (Local, Int, Tech)", "PPC Advertising", "Google/FB/IG Ads", "Social Media Marketing", "Reputation Management", "Conversion Rate Optimization"],
        category: "MARKETING",
        bgColor: "bg-[#5DD3B6]",
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
        bgColor: "bg-[#5DD3B6]",
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
        bgColor: "bg-[#EFE1B5]",
        textColor: "text-black",
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
        bgColor: "bg-[#5DD3B6]",
        textColor: "text-black",
        gridClass: "lg:col-span-2 lg:row-span-1",
        colIndex: 2,
        rowIndex: 3
    }
];

const ServiceAccordion = () => {
    const [activeId, setActiveId] = useState(null);
    const [isDesktop, setIsDesktop] = useState(false);

    React.useEffect(() => {
        const checkLayout = () => setIsDesktop(window.innerWidth >= 1024);
        checkLayout();
        window.addEventListener('resize', checkLayout);
        return () => window.removeEventListener('resize', checkLayout);
    }, []);

    const getGridStyles = () => {
        if (!isDesktop) return {};
        if (!activeId) return { gridTemplateColumns: "1fr 1fr 1fr 1fr", gridTemplateRows: "1fr 1fr 1fr 1fr" };
        const activeItem = services.find(s => s.id === activeId);
        const cols = [0.7, 0.7, 0.7, 0.7];
        const rows = [0.7, 0.7, 0.7, 0.7];
        cols[activeItem.colIndex] = 1.9;
        rows[activeItem.rowIndex] = 1.4;
        return {
            gridTemplateColumns: cols.map(c => `${c}fr`).join(" "),
            gridTemplateRows: rows.map(r => `${r}fr`).join(" ")
        };
    };

    return (
        <div id="services" className="w-full min-h-screen bg-white p-4 sm:p-6 flex items-center justify-center overflow-x-hidden">
            <div
                className="w-full max-w-[1600px] flex flex-col gap-4 lg:gap-3 lg:grid lg:h-[85vh] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={getGridStyles()}
                onMouseLeave={() => setActiveId(null)}
            >
                {services.map((service) => {
                    const isActive = activeId === service.id;

                    return (
                        <motion.div
                            key={service.id}
                            layout
                            onMouseEnter={() => setActiveId(service.id)}
                            onViewportEnter={() => !isDesktop && setActiveId(service.id)}
                            viewport={{ margin: "-20% 0px -20% 0px", amount: "some" }}
                            className={`relative flex flex-col justify-between cursor-pointer overflow-hidden rounded-2xl shadow-sm border border-black/5 ${service.bgColor} ${service.textColor} ${service.gridClass} ${isActive ? 'z-20 shadow-xl' : 'z-10'} transition-all duration-500 p-6 lg:p-8 min-h-[250px] lg:min-h-0`}
                        >
                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div className="flex justify-between items-start">
                                    <motion.div layout="position">
                                        <HexArrowIcon
                                            color={service.textColor === 'text-white' ? 'white' : 'black'}
                                            arrowColor={(service.id === 4 || service.id === 9) && isActive ? '#5DD3B6' : null}
                                        />
                                    </motion.div>
                                    <motion.span layout="position" className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40">
                                        {service.category}
                                    </motion.span>
                                </div>

                                <div className="mt-4 flex-grow flex flex-col justify-end">
                                    <AnimatePresence mode="wait">
                                        {isActive ? (
                                            <motion.div key="active" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                                                <h2 className="text-2xl lg:text-3xl font-black uppercase leading-[0.9] tracking-tighter mb-4">{service.title}</h2>
                                                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                                    {service.subItems.map((item, i) => (
                                                        <span key={i} className="text-[10px] lg:text-[11px] font-bold uppercase border-l-2 border-current pl-2 py-0.5 opacity-70 leading-tight">
                                                            {item}
                                                        </span>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div key="inactive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                                <h3 className="text-xl lg:text-2xl font-black uppercase leading-none tracking-tight">{service.title}</h3>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div >
    );
};

export default ServiceAccordion;
