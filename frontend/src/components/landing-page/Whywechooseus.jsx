"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const features = [
    {
        title: "Custom Strategies",
        category: "Strategy",
        number: "01",
        desc: "We tailor our solutions to meet your unique business requirements.",
        details: ["Tailored Roadmaps", "Business Analysis", "Unique KPIs", "Adaptive Planning"],
        color: "#F4F4F5",
        textColor: "#000000",
        theme: "#000000"
    },
    {
        title: "Expert Team",
        category: "Expertise",
        number: "02",
        desc: "Our skilled professionals ensure exceptional results every time.",
        details: ["Senior Developers", "UX Specialists", "Certified Pros", "Global Talent"],
        color: "#E4E4E7",
        textColor: "#000000",
        theme: "#000000"
    },
    {
        title: "Innovative Technology",
        category: "Innovation",
        number: "03",
        desc: "We leverage the latest tools and trends for future-ready outcomes.",
        details: ["AI Integration", "Latest Frameworks", "Cloud Native", "Future Proof"],
        color: "#D4D4D8",
        textColor: "#000000",
        theme: "#000000"
    },
    {
        title: "Proven Experience",
        category: "Trust",
        number: "04",
        desc: "A portfolio of successful projects across diverse industries.",
        details: ["Diverse Portfolio", "Case Studies", "Industry Leaders", "Success Stories"],
        color: "#A1A1AA",
        textColor: "#000000",
        theme: "#000000"
    },
    {
        title: "Affordable Pricing",
        category: "Value",
        number: "05",
        desc: "High-quality services that fit your budget.",
        details: ["Competitive Rates", "Transparent Costs", "Value Focused", "ROI Optimized"],
        color: "#71717A",
        textColor: "#FFFFFF",
        theme: "#000000"
    },
    {
        title: "Client-Centric Approach",
        category: "Service",
        number: "06",
        desc: "We prioritize your satisfaction with transparent communication and timely delivery.",
        details: ["24/7 Support", "Clear Communication", "User First", "Agile Feedback"],
        color: "#52525B",
        textColor: "#FFFFFF",
        theme: "#000000"
    },
    {
        title: "End-to-End Solutions",
        category: "Completeness",
        number: "07",
        desc: "Comprehensive services from design to marketing in one place.",
        details: ["Design to Deploy", "Full Stack", "Marketing Integration", "Lifecycle Mgmt"],
        color: "#3F3F46",
        textColor: "#FFFFFF",
        theme: "#000000"
    },
    {
        title: "Post-Delivery Support",
        category: "Reliability",
        number: "08",
        desc: "Reliable maintenance and updates after project completion.",
        details: ["Maintenance", "SLA Guarantees", "Bug Fixes", "Updates"],
        color: "#27272A",
        textColor: "#FFFFFF",
        theme: "#000000"
    },
    {
        title: "Scalable Options",
        category: "Growth",
        number: "09",
        desc: "Flexible services that grow alongside your business.",
        details: ["Cloud Scaling", "Modular Code", "Growth Ready", "Enterprise Grade"],
        color: "#18181B",
        textColor: "#FFFFFF",
        theme: "#000000"
    },
    {
        title: "Creative Excellence",
        category: "Design",
        number: "10",
        desc: "Innovative designs and strategies that make your brand stand out.",
        details: ["Award Winning", "Brand Identity", "Visual Storytelling", "Modern UI/UX"],
        color: "#09090B",
        textColor: "#FFFFFF",
        theme: "#000000"
    }
];

const Noise = () => (
    <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.035]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
);

const FeatureCard = ({ item, index, totalCards, scrollYProgress }) => {
    const containerRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const targetScale = 1 - ((totalCards - index) * 0.04);
    const startRange = index / totalCards;
    const endRange = 1;

    const scrollScale = useTransform(scrollYProgress, [startRange, endRange], [1, targetScale]);


    return (
        <div className="sticky top-0 h-screen flex items-center justify-center px-4 md:px-0 perspective-1200">
            <motion.div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                initial="initial"
                whileInView="hover"
                viewport={{ once: true, margin: "-20%" }}
                style={{
                    scale: scrollScale,
                    rotateX,
                    rotateY,
                    backgroundColor: item.color,
                    color: item.textColor,
                }}
                className="group relative w-full max-w-6xl h-auto min-h-[60vh] md:h-[80vh] rounded-[2rem] md:rounded-[6rem] p-6 md:p-24 shadow-[0_80px_150px_-30px_rgba(0,0,0,0.2)] flex flex-col justify-between overflow-hidden border border-white/10 cursor-crosshair transition-all duration-300 transform-gpu"
            >
                <div className="flex justify-between items-start z-10">
                    <div className="space-y-6">
                        <motion.p
                            className="text-[10px] md:text-xs font-black uppercase tracking-[0.6em] opacity-40"
                        >
                            {item.category}
                        </motion.p>
                        <h3 className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-[-0.06em] leading-[0.9] mb-4 md:mb-8">
                            {item.title}
                        </h3>
                    </div>
                    <span className="text-4xl md:text-8xl font-thin italic opacity-10 select-none">
                        {item.number}
                    </span>
                </div>

                <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-24 items-end z-10">
                    <div className="space-y-8">
                        <motion.p
                            variants={{
                                initial: { y: 30, opacity: 0 },
                                hover: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
                            }}
                            className="text-xl md:text-3xl font-medium leading-[1.1] tracking-tight max-w-xl"
                        >
                            {item.desc}
                        </motion.p>

                        <motion.div
                            variants={{
                                initial: { height: 0, opacity: 0 },
                                hover: {
                                    height: "auto",
                                    opacity: 1,
                                    transition: {
                                        height: { duration: 0.6, ease: "circOut" },
                                        opacity: { duration: 0.5, delay: 0.2 },
                                        staggerChildren: 0.08,
                                        delayChildren: 0.3
                                    }
                                }
                            }}
                            className="overflow-hidden"
                        >
                            <div className="flex flex-wrap gap-3 pt-6">
                                {item.details.map((detail, i) => (
                                    <motion.span
                                        key={i}
                                        variants={{
                                            initial: { y: 40, opacity: 0 },
                                            hover: { y: 0, opacity: 0.6 }
                                        }}
                                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                        className="px-5 py-2 rounded-full border border-current text-xs font-bold uppercase tracking-widest"
                                    >
                                        {detail}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div className="flex justify-end items-center gap-10">
                        <div className="hidden lg:block text-right opacity-0 group-hover:opacity-40 transition-opacity duration-700">
                            <p className="text-xs font-black uppercase tracking-widest mb-1">Status</p>
                            <p className="text-sm font-bold">Operational</p>
                        </div>

                    </div>
                </div>

                <div
                    className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] md:text-[8rem] font-black whitespace-nowrap pointer-events-none select-none italic tracking-tighter"
                    style={{
                        WebkitTextStroke: `2px ${item.textColor === '#000000' ? '#000000' : '#ccff00'}`,
                        color: 'transparent',
                        opacity: 0.15
                    }}
                >
                    ZIPPYY
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
        </div>
    );
};

export default function WhyChooseUs() {
    const container = useRef(null);
    const heroRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 60,
        damping: 25,
        restDelta: 0.001
    });

    const bgColor = useTransform(
        smoothProgress,
        [0, 0.02, 1],
        ["#FFFFFF", "#000000", "#000000"]
    );

    return (
        <motion.section
            style={{ backgroundColor: bgColor }}
            className="transition-colors duration-1000 ease-in-out selection:bg-black selection:text-white relative"
        >
            <Noise />

            <section ref={heroRef} className="min-h-[80vh] md:h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden py-20 md:py-0">
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                    <h2 className="text-[45vw] font-black tracking-tighter select-none">ZIPPYY</h2>
                </div>

                <div className="text-center space-y-6 md:space-y-8 z-10 max-w-5xl">
                    <h1 className="text-[25vw] md:text-[15rem] font-bold tracking-[-0.09em] leading-[0.85] md:leading-[0.7] text-center">
                        <motion.span
                            initial={{ opacity: 0, y: 150, rotateX: -20, filter: "blur(20px)" }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                            viewport={{ once: false, margin: "-100px" }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="block bg-gradient-to-b from-black to-black/60 bg-clip-text text-transparent"
                        >
                            WHY
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 150, rotateX: -20, filter: "blur(20px)" }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                            viewport={{ once: false, margin: "-100px" }}
                            transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="block bg-gradient-to-b from-gray-200 to-gray-400 bg-clip-text text-transparent h-[1em]"
                        >
                            CHOOSE
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 150, rotateX: -20, filter: "blur(20px)" }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                            viewport={{ once: false, margin: "-100px" }}
                            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="block bg-gradient-to-b from-black to-black/60 bg-clip-text text-transparent"
                        >
                            US?
                        </motion.span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-2xl md:text-2xl font-medium text-gray-500 max-w-3xl mx-auto leading-tight px-4"
                    >
                        At Zippyy Digital Solutions, we provide tailored digital solutions designed to elevate your business
                    </motion.p>
                </div>


            </section>

            <section ref={container} className="relative pb-24">
                {features.map((item, index) => (
                    <FeatureCard
                        key={item.number}
                        item={item}
                        index={index}
                        totalCards={features.length}
                        scrollYProgress={smoothProgress}
                    />
                ))}
            </section>





            <style>{`
        .perspective-1200 {
          perspective: 1200px;
        }
      `}</style>
        </motion.section>
    );
}
