
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'framer-motion';
import { ChevronsDown } from 'lucide-react';

const IMAGES = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop',
        title: "Neon Cyberpunk City",
        description: "Experience the vibrant energy of a futuristic metropolis bathed in neon lights. This digital landscape captures the essence of a high-tech society.",
        extraImages: [
            'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1516055562723-5e744d952674?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1531297461136-82ae8b2a520a?q=80&w=600&auto=format&fit=crop'
        ],
        link: "#"
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=2070&auto=format&fit=crop',
        title: "Abstract Liquid Art",
        description: "A mesmerizing flow of colors and shapes, creating a unique abstract masterpiece. Perfect for modern artistic expressions.",
        extraImages: [
            'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1509281393307-365c6f760b5b?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=600&auto=format&fit=crop'
        ],
        link: "#"
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop',
        title: "Technological Network",
        description: "Visualize the complex web of connections that power our digital world. A deep dive into the infrastructure of the internet.",
        extraImages: [
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1558494949-ef2bb6ffa874?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=600&auto=format&fit=crop'
        ],
        link: "#"
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2070&auto=format&fit=crop',
        title: "Fluid Dynamics",
        description: "Capturing the elegance of motion in a static image. The smooth curves and transitions represent seamless integration.",
        extraImages: [
            'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=600&auto=format&fit=crop'
        ],
        link: "#"
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2070&auto=format&fit=crop',
        title: "Modern Architecture",
        description: "Clean lines and bold structures defining the skylines of tomorrow. A testament to human engineering and design.",
        extraImages: [
            'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1431576901776-e539bd916ba2?q=80&w=600&auto=format&fit=crop'
        ],
        link: "#"
    },
    {
        id: 6,
        src: 'https://images.unsplash.com/photo-1515462277126-2dd0c162007a?q=80&w=2070&auto=format&fit=crop',
        title: "Digital Bubbles",
        description: "Floating spheres of data in a digital void. Represents the isolated yet connected nature of modern information.",
        extraImages: [
            'https://images.unsplash.com/photo-1496065187959-7f07b8353c55?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1534081333815-ae5019106622?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1504198322253-cfa87a0ff25f?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600&auto=format&fit=crop'
        ],
        link: "#"
    },
    {
        id: 7,
        src: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=2070&auto=format&fit=crop',
        title: "Circuit Board Patterns",
        description: "The intricate pathways of electrons that drive our devices. A macro view of the silicon heartbeat.",
        extraImages: [
            'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop'
        ],
        link: "#"
    },
];

export default function App() {
    const containerRef = useRef(null);
    const [index, setIndex] = useState(0);
    const [showInstruction, setShowInstruction] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowInstruction(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const laptopContentRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const scrollIndex = useTransform(scrollYProgress, [0, 1], [-0.5, IMAGES.length - 0.5]);
    const smoothIndex = useSpring(scrollIndex, {
        stiffness: isMobile ? 150 : 100,
        damping: isMobile ? 40 : 20
    });

    useMotionValueEvent(smoothIndex, "change", (latest) => {
        const newIndex = Math.max(0, Math.min(Math.round(latest), IMAGES.length - 1));
        const activeStart = newIndex - 0.5;
        const rawFraction = Math.max(0, Math.min(1, latest - activeStart));

        // Add buffer: 0-25% (start), 25-85% (scroll), 85-100% (end)
        let fraction = 0;
        const startBuffer = 0.25;
        const endBuffer = 0.85;
        const scrollRange = endBuffer - startBuffer;

        if (rawFraction > startBuffer && rawFraction < endBuffer) {
            fraction = (rawFraction - startBuffer) / scrollRange;
        } else if (rawFraction >= endBuffer) {
            fraction = 1;
        }

        if (newIndex !== index) {
            setIndex(newIndex);
        }

        if (laptopContentRef.current) {
            const { scrollHeight, clientHeight } = laptopContentRef.current;
            const maxScroll = scrollHeight - clientHeight;
            if (maxScroll > 0) {
                laptopContentRef.current.scrollTop = fraction * maxScroll;
            }
        }
    });

    // Reset scroll to top when index changes to ensure it starts fresh
    useEffect(() => {
        if (laptopContentRef.current) {
            laptopContentRef.current.scrollTop = 0;
        }
    }, [index]);

    const currentData = IMAGES[index] || IMAGES[0];

    // Entrance Animation Logic
    const { scrollYProgress: entranceProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start start"],
    });

    const entranceScale = useTransform(entranceProgress, [0, 1], [0.8, 1]);
    const entranceOpacity = useTransform(entranceProgress, [0, 0.8], [0, 1]);
    const entranceY = useTransform(entranceProgress, [0, 1], [100, 0]);

    return (
        <div id="products" ref={containerRef} className="relative h-[1200vh] md:h-[1600vh] bg-white">
            <div className="sticky top-0 h-screen bg-white text-black font-sans overflow-hidden select-none pt-4 pb-2 flex items-center justify-center">
                <motion.div
                    style={{ scale: entranceScale, opacity: entranceOpacity, y: entranceY }}
                    className="flex flex-col items-center justify-center md:justify-start w-full h-full"
                >
                    <div className="relative flex items-center justify-center w-full h-[250px] md:h-[300px]">
                        {IMAGES.map((img, i) => {
                            const len = IMAGES.length;
                            let offset = i - index;

                            if (offset > Math.floor(len / 2)) offset -= len;
                            if (offset < -Math.floor(len / 2)) offset += len;

                            const absOffset = Math.abs(offset);
                            const isAtEdge = absOffset >= 3;

                            // Responsive animation values
                            const xFactor = isMobile ? 120 : 180;
                            const yFactor = isMobile ? 20 : 30;
                            const scaleFactor = isMobile ? 0.1 : 0.15;

                            return (
                                <motion.div
                                    key={img.id}
                                    initial={false}
                                    animate={{
                                        x: offset * xFactor,
                                        y: absOffset * yFactor,
                                        scale: 1 - absOffset * scaleFactor,
                                        zIndex: 10 - Math.round(absOffset),
                                        opacity: isAtEdge ? 0 : 1 - absOffset * 0.35,
                                        rotateY: offset * -15,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 70,
                                        damping: 18,
                                        mass: 0.8,
                                        opacity: { duration: 0.2 }
                                    }}
                                    className="absolute w-[160px] h-[220px] md:w-[220px] md:h-[300px] pointer-events-auto"
                                    style={{
                                        transformStyle: 'preserve-3d',
                                        pointerEvents: isAtEdge ? 'none' : 'auto'
                                    }}
                                >
                                    <div className="relative w-full h-full bg-black overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] rounded-[1.5rem] md:rounded-[2.5rem]">
                                        <motion.img
                                            src={img.src}
                                            alt=""
                                            className="w-full h-full object-cover rounded-[1.5rem] md:rounded-[2.5rem]"
                                            animate={{
                                                filter: offset === 0 ? 'grayscale(0%)' : 'grayscale(100%)',
                                            }}
                                            transition={{ duration: 0.6 }}
                                        />
                                        {offset === 0 && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 pointer-events-none"
                                            />
                                        )}

                                        {/* Card Title Overlay */}
                                        <div className="absolute bottom-0 inset-x-0 p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end justify-center rounded-b-[1.5rem] md:rounded-b-[2.5rem] z-10">
                                            <h3 className={`text-white font-bold text-center transition-all duration-300 drop-shadow-md ${offset === 0 ? 'text-base md:text-xl opacity-100 translate-y-0' : 'text-xs md:text-sm opacity-0 translate-y-4'}`}>
                                                {img.title}
                                            </h3>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Laptop/Tablet Design */}
                    <div className="relative w-[98%] md:w-[600px] lg:w-[800px] mt-8 md:mt-12 flex flex-col items-center">
                        {/* Device Body (Tablet on Mobile / Screen on Desktop) */}
                        <div className="relative w-[95%] md:w-[80%] h-[400px] sm:h-[280px] lg:h-[380px] bg-[#1a1a1a] rounded-[2rem] md:rounded-b-none md:rounded-t-[1.5rem] p-[3px] border-2 border-gray-800 shadow-2xl">
                            {/* Camera Notch */}
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 md:w-20 h-2 md:h-3 bg-black rounded-b-lg z-20"></div>

                            {/* Screen Display */}
                            <div className="w-full h-full bg-white rounded-[1.8rem] md:rounded-b-none md:rounded-t-[1.2rem] overflow-hidden relative group">
                                {/* Scrollable Content Container */}
                                <div
                                    ref={laptopContentRef}
                                    className={`absolute inset-0 overflow-hidden p-5 md:p-6 transition-all duration-700 ${showInstruction ? 'blur-sm scale-[0.98] opacity-50' : 'blur-0 scale-100 opacity-100'}`}
                                >
                                    <motion.div
                                        key={currentData.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex flex-col gap-3 md:gap-4 text-center items-center"
                                    >
                                        {/* Title & Description */}
                                        <div className="space-y-2">
                                            <h2 className="text-2xl md:text-2xl font-bold text-gray-800">{currentData.title}</h2>
                                            <p className="text-sm md:text-sm text-gray-600 max-w-[95%] mx-auto leading-relaxed">
                                                {currentData.description}
                                            </p>
                                        </div>

                                        {/* Action Button */}
                                        <motion.a
                                            href={currentData.link}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="mt-2 md:mt-3 px-6 md:px-8 py-2 md:py-2.5 bg-neutral-900 text-white text-xs md:text-sm font-medium rounded-full shadow-[0_4px_14px_0_rgba(0,0,0,0.39)] hover:shadow-[0_6px_20px_rgba(93,93,93,0.23)] hover:bg-neutral-800 transition-all duration-300"
                                        >
                                            Visit Site
                                        </motion.a>

                                        {/* Gallery Grid */}
                                        <div className="grid grid-cols-1 gap-2 md:gap-3 w-full mt-2 md:mt-4">
                                            {currentData.extraImages.map((src, i) => (
                                                <div key={i} className="relative aspect-video rounded-md md:rounded-lg overflow-hidden shadow-md group/img">
                                                    <img
                                                        src={src}
                                                        alt={`Detail ${i + 1} `}
                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-110"
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Additional text to make it scrollable */}
                                        <p className="text-[10px] md:text-xs text-gray-400 mt-2 md:mt-4 pb-4">
                                            Explore our extensive collection of digital assets. Every piece is crafted with precision and care to ensure the highest quality for your projects. Scroll to view more details.
                                        </p>
                                    </motion.div>
                                </div>

                                {/* Scroll Indicator Overlay */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: showInstruction ? 1 : 0, scale: showInstruction ? 1 : 0.8 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className={`absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none ${showInstruction ? 'visible' : 'invisible'}`}
                                >
                                    <div className="flex flex-col items-center gap-2 md:gap-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl shadow-[0_10px_30px_rgba(79,70,229,0.5)] border border-white/20 backdrop-blur-md">
                                        <span className="text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] drop-shadow-md">
                                            Scroll to Explore
                                        </span>
                                        <motion.div
                                            animate={{ y: [0, 6, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <ChevronsDown className="w-4 h-4 md:w-6 md:h-6 text-white drop-shadow-md" />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Base (Hidden on Mobile/Tablet view) */}
                        <div className="hidden md:flex relative w-full h-[10px] sm:h-[20px] bg-black rounded-b-[1rem] shadow-[0_10px_20px_rgba(0,0,0,0.5)] items-start justify-center">
                            <div className="w-[15%] h-[4px] bg-gray-800 rounded-b-md"></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
