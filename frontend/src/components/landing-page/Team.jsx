"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Linkedin, Twitter, Dribbble } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Team = () => {
    const teamMembers = [
        {
            id: 1,
            name: "Kavi Raja",
            role: "Full-Stack Developer",
            region: "Engineering Team",
            bio: "Kavi is a versatile Full-Stack Developer who specializes in building scalable web applications. He seamlessly integrates front-end interfaces with robust back-end systems.",
            skills: ["React", "Node.js", "Cloud Engineer"],
            image: "/kavi.png",
            thumbnail: "/kavi.png"
        },
        {
            id: 2,
            name: "John Ebenezer",
            role: "Full-Stack Developer",
            region: "Engineering Team",
            bio: "John is a passionate Full-Stack Developer with a knack for creating intuitive user experiences. He bridges the gap between complex logic and beautiful design.",
            skills: ["Next.js", "TypeScript", "Tailwind"],
            image: "/john.png",
            thumbnail: "/john.png"
        },
        {
            id: 3,
            name: "Sanjai Pandian",
            role: "Full-Stack Developer",
            region: "Engineering Team",
            bio: "Sanjai is a full-stack wizard who turns complex requirements into elegant code. He ensures our technical architecture is scalable and future-proof.",
            skills: ["MERN Stack", "DevOps", "AWS"],
            image: "/sanjai.png",
            thumbnail: "/sanjai.png"
        },
        {
            id: 4,
            name: "Selva Dhanush",
            role: "Full-Stack Developer",
            region: "Engineering Team",
            bio: "Dhanush brings ideas to life through code. As a Full-Stack Developer, he crafts performant applications with a keen eye for detail and user interaction.",
            skills: ["TypeScript", "GraphQL", "System Design"],
            image: "/dhanush.png",
            thumbnail: "/dhanush.png"
        },
        {
            id: 5,
            name: "Balaji",
            role: "Full-Stack Developer",
            region: "Engineering Team",
            bio: "Balaji drives innovation through cutting-edge technologies. He specializes in scalable solutions and emerging tech trends.",
            skills: ["Python", "Docker", "Cloud Security"],
            image: "/balaji.png",
            thumbnail: "/balaji.png"
        },
        {
            id: 6,
            name: "Sachin",
            role: "Full-Stack Developer",
            region: "Engineering Team",
            bio: "Sachin is a skilled developer focusing on backend efficiency and database management. He ensures data integrity and high-performance server-side operations.",
            skills: ["Java", "Spring Boot", "Microservices"],
            image: "/sachin.png",
            thumbnail: "/sachin.png"
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const scrollContainerRef = useRef(null);

    const isFirstRun = useRef(true);

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        if (scrollContainerRef.current) {
            const activeItem = scrollContainerRef.current.children[activeIndex];
            if (activeItem) {
                activeItem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }
    }, [activeIndex]);

    const activeMember = teamMembers[activeIndex];

    const nextMember = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % teamMembers.length);
    };

    const prevMember = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
    };

    const handleThumbnailClick = (index) => {
        setDirection(index > activeIndex ? 1 : -1);
        setActiveIndex(index);
    };

    const textVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
    };

    const imageVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 80 : -80,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 80 : -80,
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.4 }
        })
    };

    return (
        <div id="team" className="min-h-screen md:h-screen bg-[#111] flex items-center justify-center font-sans relative overflow-y-auto md:overflow-hidden">
            <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-white w-full min-h-screen md:h-full shadow-2xl flex flex-col relative overflow-hidden"
            >
                <div className="absolute top-4 right-4 md:top-10 md:right-10 pointer-events-none z-0">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeMember.id}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5 }}
                            className="text-[8rem] md:text-[12rem] lg:text-[18rem] font-bold leading-none text-transparent opacity-5"
                            style={{
                                WebkitTextStroke: '2px rgba(0,0,0,0.1)',
                            }}
                        >
                            0{activeMember.id}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row h-full w-full">
                    <div className="w-full md:w-5/12 flex flex-col justify-between h-auto md:h-full p-6 md:p-10 lg:p-10 relative z-20">
                        <div className="space-y-8 mt-4 relative z-30">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center gap-4"
                            >
                                <div className="h-[2px] w-12 bg-black" />
                                <h5 className="text-xs font-bold tracking-[0.25em] text-gray-500 uppercase">
                                    Zippy Digital Solutions
                                </h5>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-5xl md:text-7xl lg:text-8xl font-black text-black leading-[0.85] tracking-tighter"
                            >
                                Our<br />
                                Team
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="max-w-lg hidden md:block pt-2"
                            >
                                <p className="text-gray-600 text-lg leading-relaxed font-medium border-l-4 border-gray-200 pl-6">
                                    We're a global consultancy helping the world's most ambitious change makers define the future.
                                </p>
                            </motion.div>
                        </div>

                        <div className="mt-8 md:mt-auto">
                            <div ref={scrollContainerRef} className="flex space-x-4 md:space-x-6 overflow-x-auto pb-4 md:pb-8 pt-4 no-scrollbar items-end pl-2">
                                {teamMembers.map((member, index) => (
                                    <motion.button
                                        key={member.id}
                                        onClick={() => handleThumbnailClick(index)}
                                        whileHover={{ y: -10, scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`group relative flex-shrink-0 transition-all duration-500 ease-out ${index === activeIndex
                                            ? 'w-20 h-28 md:w-40 md:h-52 z-10'
                                            : 'w-16 h-24 md:w-28 md:h-40 opacity-40 hover:opacity-100 z-0'
                                            }`}
                                    >
                                        <div className={`absolute inset-0 transform -skew-x-6 overflow-hidden rounded-2xl shadow-lg transition-all duration-500 ${index === activeIndex
                                            ? 'border-4 border-black shadow-2xl scale-100'
                                            : 'border border-transparent bg-gray-100 group-hover:border-gray-300'
                                            }`}>
                                            <motion.img
                                                src={member.thumbnail}
                                                alt={member.name}
                                                className={`w-full h-full object-cover transition-all duration-700 ${index === activeIndex
                                                    ? 'grayscale-0 scale-110'
                                                    : 'grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110'
                                                    }`}
                                            />
                                        </div>
                                    </motion.button>
                                ))}
                            </div>

                            <div className="flex gap-4 items-center">
                                <motion.button
                                    whileHover={{ scale: 1.1, backgroundColor: "#000", color: "white" }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={prevMember}
                                    className="w-12 h-12 rounded-full border border-slate-200 text-slate-600 flex items-center justify-center transition-colors hover:shadow-lg"
                                >
                                    <ArrowLeft size={20} />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1, backgroundColor: "#000" }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={nextMember}
                                    className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-lg shadow-black/30"
                                >
                                    <ArrowRight size={20} />
                                </motion.button>

                                <div className="h-[1px] bg-slate-200 flex-grow ml-4 mr-8 hidden md:block"></div>


                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-7/12 relative h-[700px] md:h-full mt-4 md:mt-0">
                        <motion.div
                            className="absolute inset-0 bg-black z-0 [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] md:[clip-path:polygon(15%_0,100%_0,100%_100%,0%_100%)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-[#0a0a0a] to-gray-800/80"></div>
                            <div
                                className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
                                style={{
                                    backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
                                    backgroundSize: '20px 20px'
                                }}
                            ></div>
                        </motion.div>

                        <div className="relative w-full h-full flex flex-col justify-end">
                            <div className="absolute top-4 left-4 right-4 md:top-8 md:right-12 md:left-auto z-30 w-auto md:w-full md:max-w-[420px] pointer-events-auto">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeMember.id}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        variants={{
                                            hidden: { opacity: 0, x: 50 },
                                            visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.05, duration: 0.5 } },
                                            exit: { opacity: 0, x: 50 }
                                        }}
                                        className="bg-white/10 backdrop-blur-md p-6 md:p-8 pb-8 md:pb-24 rounded-3xl shadow-2xl border border-white/20 text-right"
                                    >
                                        <div className="flex flex-wrap gap-2 justify-end mb-4">
                                            {activeMember.skills.map((skill, idx) => (
                                                <motion.span
                                                    key={idx}
                                                    variants={textVariants}
                                                    className="px-3 py-1 bg-white/20 text-white rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm"
                                                >
                                                    {skill}
                                                </motion.span>
                                            ))}
                                        </div>

                                        <motion.h2 variants={textVariants} className="text-3xl font-bold text-white mb-1 leading-tight tracking-tight">
                                            {activeMember.name}
                                        </motion.h2>
                                        <motion.p variants={textVariants} className="text-white font-bold text-xs tracking-widest uppercase mb-4">
                                            {activeMember.role} • {activeMember.region}
                                        </motion.p>
                                        <motion.p variants={textVariants} className="text-gray-300 text-sm leading-relaxed mb-6 font-medium">
                                            {activeMember.bio}
                                        </motion.p>

                                        <motion.div variants={textVariants} className="flex justify-end gap-4 pt-4 border-t border-white/10">
                                            <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                                            <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                                            <Dribbble className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                                        </motion.div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            <div className="absolute bottom-0 right-0 h-[75%] w-full z-20 pointer-events-none flex items-end justify-end">
                                <AnimatePresence initial={false} custom={direction}>
                                    <motion.img
                                        key={activeMember.id}
                                        custom={direction}
                                        variants={imageVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        src={activeMember.image}
                                        alt={activeMember.name}
                                        className="h-[55%] md:h-full w-auto object-contain object-bottom drop-shadow-2xl md:mr-[350px]"
                                    />
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Team;
