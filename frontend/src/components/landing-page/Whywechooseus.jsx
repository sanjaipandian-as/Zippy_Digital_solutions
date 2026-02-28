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
        theme: "#000000",
        bgPattern: "blueprint"
    },
    {
        title: "Expert Team",
        category: "Expertise",
        number: "02",
        desc: "Our skilled professionals ensure exceptional results every time.",
        details: ["Senior Developers", "UX Specialists", "Certified Pros", "Global Talent"],
        color: "#E4E4E7",
        textColor: "#000000",
        theme: "#000000",
        bgPattern: "dots"
    },
    {
        title: "Innovative Technology",
        category: "Innovation",
        number: "03",
        desc: "We leverage the latest tools and trends for future-ready outcomes.",
        details: ["AI Integration", "Latest Frameworks", "Cloud Native", "Future Proof"],
        color: "#D4D4D8",
        textColor: "#000000",
        theme: "#000000",
        bgPattern: "hexagons"
    },
    {
        title: "Proven Experience",
        category: "Trust",
        number: "04",
        desc: "A portfolio of successful projects across diverse industries.",
        details: ["Diverse Portfolio", "Case Studies", "Industry Leaders", "Success Stories"],
        color: "#A1A1AA",
        textColor: "#000000",
        theme: "#000000",
        bgPattern: "waves"
    },
    {
        title: "Affordable Pricing",
        category: "Value",
        number: "05",
        desc: "High-quality services that fit your budget.",
        details: ["Competitive Rates", "Transparent Costs", "Value Focused", "ROI Optimized"],
        color: "#71717A",
        textColor: "#FFFFFF",
        theme: "#000000",
        bgPattern: "diagonal"
    },
    {
        title: "Client-Centric Approach",
        category: "Service",
        number: "06",
        desc: "We prioritize your satisfaction with transparent communication and timely delivery.",
        details: ["24/7 Support", "Clear Communication", "User First", "Agile Feedback"],
        color: "#52525B",
        textColor: "#FFFFFF",
        theme: "#000000",
        bgPattern: "circles"
    },
    {
        title: "End-to-End Solutions",
        category: "Completeness",
        number: "07",
        desc: "Comprehensive services from design to marketing in one place.",
        details: ["Design to Deploy", "Full Stack", "Marketing Integration", "Lifecycle Mgmt"],
        color: "#3F3F46",
        textColor: "#FFFFFF",
        theme: "#000000",
        bgPattern: "circuit"
    },
    {
        title: "Post-Delivery Support",
        category: "Reliability",
        number: "08",
        desc: "Reliable maintenance and updates after project completion.",
        details: ["Maintenance", "SLA Guarantees", "Bug Fixes", "Updates"],
        color: "#27272A",
        textColor: "#FFFFFF",
        theme: "#000000",
        bgPattern: "mesh"
    },
    {
        title: "Scalable Options",
        category: "Growth",
        number: "09",
        desc: "Flexible services that grow alongside your business.",
        details: ["Cloud Scaling", "Modular Code", "Growth Ready", "Enterprise Grade"],
        color: "#18181B",
        textColor: "#FFFFFF",
        theme: "#000000",
        bgPattern: "topology"
    },
    {
        title: "Creative Excellence",
        category: "Design",
        number: "10",
        desc: "Innovative designs and strategies that make your brand stand out.",
        details: ["Award Winning", "Brand Identity", "Visual Storytelling", "Modern UI/UX"],
        color: "#09090B",
        textColor: "#FFFFFF",
        theme: "#000000",
        bgPattern: "starburst"
    }
];

/* ─── Background Pattern Components ─── */

const BlueprintPattern = ({ textColor }) => {
    const c = textColor === "#FFFFFF" ? "255,255,255" : "0,0,0";
    return (
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700">
            <defs>
                <radialGradient id="blue-glow" cx="75%" cy="50%" r="55%">
                    <stop offset="0%" stopColor={`rgba(${c},0.1)`} />
                    <stop offset="100%" stopColor={`rgba(${c},0)`} />
                </radialGradient>
            </defs>

            {/* Background glow */}
            <rect width="1200" height="700" fill="url(#blue-glow)" />

            {/* ── Fibonacci / Golden-Ratio Arcs ── */}
            <g fill="none" strokeWidth="1.5" opacity="0.18">
                <path d="M 800 280 A 40 40 0 0 1 840 240" stroke={`rgba(${c},1)`} />
                <path d="M 840 240 A 65 65 0 0 1 905 305" stroke={`rgba(${c},1)`} />
                <path d="M 905 305 A 105 105 0 0 1 800 410" stroke={`rgba(${c},1)`} />
                <path d="M 800 410 A 170 170 0 0 1 970 240" stroke={`rgba(${c},1)`} />
                <path d="M 970 240 A 275 275 0 0 1 695 515" stroke={`rgba(${c},1)`} />
                <path d="M 695 515 A 445 445 0 0 1 1140 70" stroke={`rgba(${c},1)`} />
                <path d="M 1140 70 A 720 720 0 0 1 420 790" stroke={`rgba(${c},0.5)`} />
            </g>

            {/* ── Golden Ratio rectangles ── */}
            <g fill="none" strokeWidth="1" opacity="0.12">
                <rect x="695" y="240" width="105" height="65" stroke={`rgba(${c},1)`} />
                <rect x="695" y="240" width="170" height="275" stroke={`rgba(${c},1)`} />
                <rect x="525" y="240" width="445" height="275" stroke={`rgba(${c},0.8)`} />
                <rect x="525" y="-35" width="720" height="720" stroke={`rgba(${c},0.5)`} />
            </g>

            {/* ── Origin crosshair ── */}
            <g stroke={`rgba(${c},0.15)`} strokeWidth="0.8" strokeDasharray="6 5">
                <line x1="840" y1="0" x2="840" y2="700" />
                <line x1="0" y1="280" x2="1200" y2="280" />
            </g>

            {/* ── Large diffused ring for visual weight ── */}
            <circle cx="840" cy="280" r="380" fill="none" stroke={`rgba(${c},0.06)`} strokeWidth="70" />

            {/* ── Fine dot at spiral origin ── */}
            <circle cx="840" cy="280" r="4" fill={`rgba(${c},0.25)`} />
            <circle cx="840" cy="280" r="10" fill="none" stroke={`rgba(${c},0.2)`} strokeWidth="1" />
        </svg>
    );
};

const GridPattern = ({ textColor }) => {
    const c = textColor === "#FFFFFF" ? "255,255,255" : "0,0,0";
    return (
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="grid-p" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke={`rgba(${c},0.12)`} strokeWidth="1" />
                </pattern>
                <radialGradient id="grid-fade" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor={`rgba(${c},0.18)`} />
                    <stop offset="100%" stopColor={`rgba(${c},0)`} />
                </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-p)" />
            <rect width="100%" height="100%" fill="url(#grid-fade)" />
            {/* Accent cross */}
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke={`rgba(${c},0.08)`} strokeWidth="1" />
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke={`rgba(${c},0.08)`} strokeWidth="1" />
        </svg>
    );
};

const DotsPattern = ({ textColor }) => {
    const c = textColor === "#FFFFFF" ? "255,255,255" : "0,0,0";
    return (
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="dots-p" width="30" height="30" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill={`rgba(${c},0.15)`} />
                </pattern>
                <radialGradient id="dots-fade" cx="70%" cy="70%" r="60%">
                    <stop offset="0%" stopColor={`rgba(${c},0.2)`} />
                    <stop offset="100%" stopColor={`rgba(${c},0)`} />
                </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots-p)" />
            <rect width="100%" height="100%" fill="url(#dots-fade)" />
            <circle cx="80%" cy="20%" r="120" fill="none" stroke={`rgba(${c},0.1)`} strokeWidth="1" />
            <circle cx="80%" cy="20%" r="80" fill="none" stroke={`rgba(${c},0.1)`} strokeWidth="1" />
        </svg>
    );
};

const HexagonsPattern = ({ textColor }) => {
    const c = textColor === "#FFFFFF" ? "255,255,255" : "0,0,0";
    const hex = "M 30,0 L 60,17.3 L 60,51.9 L 30,69.2 L 0,51.9 L 0,17.3 Z";
    return (
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="hex-p" width="60" height="69.2" patternUnits="userSpaceOnUse">
                    <path d={hex} fill="none" stroke={`rgba(${c},0.15)`} strokeWidth="1" />
                    <path d={hex} fill="none" stroke={`rgba(${c},0.12)`} strokeWidth="1" transform="translate(30,34.6)" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hex-p)" />
            <circle cx="25%" cy="75%" r="200" fill="none" stroke={`rgba(${c},0.08)`} strokeWidth="60" />
        </svg>
    );
};

const WavesPattern = ({ textColor }) => {
    const c = textColor === "#FFFFFF" ? "255,255,255" : "0,0,0";
    return (
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            {[0, 1, 2, 3, 4, 5, 6].map(i => (
                <path
                    key={i}
                    d={`M -100 ${80 + i * 90} Q 300 ${20 + i * 90} 700 ${80 + i * 90} T 1500 ${80 + i * 90}`}
                    fill="none"
                    stroke={`rgba(${c},${0.15 - i * 0.01})`}
                    strokeWidth={i === 0 ? 3 : 1.5}
                />
            ))}
            <radialGradient id="waves-glow" cx="80%" cy="20%" r="50%">
                <stop offset="0%" stopColor={`rgba(${c},0.15)`} />
                <stop offset="100%" stopColor={`rgba(${c},0)`} />
            </radialGradient>
            <rect width="100%" height="100%" fill="url(#waves-glow)" />
        </svg>
    );
};

const DiagonalPattern = ({ textColor }) => {
    const c = textColor === "#FFFFFF" ? "255,255,255" : "0,0,0";
    return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="diag-p" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="10" stroke={`rgba(${c},0.18)`} strokeWidth="0.5" />
                </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#diag-p)" />
            {/* Accent corner shape */}
            <polygon points="100,0 100,40 60,0" fill={`rgba(${c},0.08)`} />
        </svg>
    );
};

const CirclesPattern = ({ textColor }) => {
    const c = textColor === "#FFFFFF" ? "255,255,255" : "0,0,0";
    return (
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {[60, 120, 200, 300, 420, 560].map((r, i) => (
                <circle key={i} cx="85%" cy="15%" r={r}
                    fill="none"
                    stroke={`rgba(${c},${0.18 - i * 0.02})`}
                    strokeWidth={i === 0 ? 3 : 1.5}
                />
            ))}
            {[60, 120, 200].map((r, i) => (
                <circle key={`b${i}`} cx="15%" cy="85%" r={r}
                    fill="none"
                    stroke={`rgba(${c},0.1)`}
                    strokeWidth="1.5"
                />
            ))}
        </svg>
    );
};

const CircuitPattern = ({ textColor }) => {
    const c = textColor === "#FFFFFF" ? "255,255,255" : "0,0,0";
    const lines = [
        "M 80 0 L 80 80 L 160 80",
        "M 160 80 L 160 160 L 240 160",
        "M 240 160 L 240 80 L 320 80",
        "M 0 160 L 80 160 L 80 240",
        "M 320 0 L 320 160 L 400 160",
        "M 400 160 L 400 80 L 480 80",
        "M 160 240 L 240 240 L 240 320",
        "M 400 240 L 480 240",
    ];
    const nodes = [[80, 80], [160, 80], [240, 160], [80, 160], [320, 80], [400, 160], [240, 240], [480, 240]];
    return (
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.25">
                {lines.map((d, i) => <path key={i} d={d} fill="none" stroke={`rgba(${c},0.8)`} strokeWidth="2" />)}
                {nodes.map(([cx, cy], i) => (
                    <g key={i}>
                        <circle cx={cx} cy={cy} r="6" fill="none" stroke={`rgba(${c},0.9)`} strokeWidth="2" />
                        <circle cx={cx} cy={cy} r="3" fill={`rgba(${c},0.6)`} />
                    </g>
                ))}
            </g>
            <radialGradient id="circuit-glow" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor={`rgba(${c},0.1)`} />
                <stop offset="100%" stopColor={`rgba(${c},0)`} />
            </radialGradient>
            <rect width="100%" height="100%" fill="url(#circuit-glow)" />
        </svg>
    );
};

const MeshPattern = ({ textColor }) => {
    const c = textColor === "#FFFFFF" ? "255,255,255" : "0,0,0";
    const pts = [
        [100, 120], [250, 60], [420, 150], [600, 80], [750, 180],
        [150, 300], [350, 250], [520, 320], [700, 260], [880, 310],
        [80, 450], [280, 400], [460, 480], [640, 420], [820, 470],
        [200, 580], [400, 540], [580, 600], [760, 550],
    ];
    const edges = [
        [0, 1], [1, 2], [2, 3], [3, 4],
        [5, 6], [6, 7], [7, 8], [8, 9],
        [10, 11], [11, 12], [12, 13], [13, 14],
        [15, 16], [16, 17], [17, 18],
        [0, 5], [1, 6], [2, 7], [3, 8], [4, 9],
        [5, 10], [6, 11], [7, 12], [8, 13], [9, 14],
        [10, 15], [11, 16], [12, 17], [13, 18],
    ];
    return (
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.18">
                {edges.map(([a, b], i) => (
                    <line key={i}
                        x1={pts[a][0]} y1={pts[a][1]}
                        x2={pts[b][0]} y2={pts[b][1]}
                        stroke={`rgba(${c},1)`} strokeWidth="1"
                    />
                ))}
                {pts.map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="3" fill={`rgba(${c},0.7)`} />
                ))}
            </g>
        </svg>
    );
};

const TopologyPattern = ({ textColor }) => {
    const c = textColor === "#FFFFFF" ? "255,255,255" : "0,0,0";
    const contours = [
        "M 200 400 Q 350 250 500 300 Q 650 350 750 250 Q 850 200 900 350",
        "M 150 480 Q 350 300 550 360 Q 700 420 850 300 Q 950 220 1000 400",
        "M 100 550 Q 300 380 500 430 Q 700 480 900 360 Q 1000 290 1100 450",
        "M 50 620 Q 280 460 500 510 Q 720 560 950 420 Q 1050 360 1200 510",
        "M 0 680 Q 260 540 500 590 Q 740 640 980 480 Q 1080 410 1300 580",
        "M 200 200 Q 400 80 600 150 Q 780 220 900 120",
        "M 100 280 Q 350 130 600 220 Q 800 300 950 180",
    ];
    return (
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            {contours.map((d, i) => (
                <path key={i} d={d} fill="none" stroke={`rgba(${c},0.15)`} strokeWidth="2" />
            ))}
            <radialGradient id="topo-glow" cx="30%" cy="60%" r="60%">
                <stop offset="0%" stopColor={`rgba(${c},0.15)`} />
                <stop offset="100%" stopColor={`rgba(${c},0)`} />
            </radialGradient>
            <rect width="100%" height="100%" fill="url(#topo-glow)" />
        </svg>
    );
};

const StarburstPattern = ({ textColor }) => {
    const c = textColor === "#FFFFFF" ? "255,255,255" : "0,0,0";
    const spokes = React.useMemo(() => Array.from({ length: 24 }, (_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        return {
            x2: (500 + Math.cos(angle) * 700).toFixed(2),
            y2: (400 + Math.sin(angle) * 700).toFixed(2),
        };
    }), []);
    return (
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.06">
                {spokes.map((s, i) => (
                    <line key={i} x1={500} y1={400} x2={s.x2} y2={s.y2}
                        stroke={`rgba(${c},1)`} strokeWidth={i % 3 === 0 ? 2 : 1} />
                ))}
                {[80, 160, 260, 380, 520].map((r, i) => (
                    <circle key={i} cx={500} cy={400} r={r}
                        fill="none" stroke={`rgba(${c},0.8)`} strokeWidth="1" />
                ))}
            </g>
        </svg>
    );
};

const CardBackground = ({ pattern, textColor }) => {
    const map = {
        grid: GridPattern,
        dots: DotsPattern,
        hexagons: HexagonsPattern,
        waves: WavesPattern,
        diagonal: DiagonalPattern,
        circles: CirclesPattern,
        circuit: CircuitPattern,
        mesh: MeshPattern,
        topology: TopologyPattern,
        starburst: StarburstPattern,
        blueprint: BlueprintPattern,
    };
    const Comp = map[pattern] || GridPattern;
    return (
        <div className="absolute inset-0 overflow-hidden rounded-[2rem] md:rounded-[6rem] pointer-events-none">
            <Comp textColor={textColor} />
            {/* Subtle vignette to keep content readable */}
            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(ellipse at 50% 50%, transparent 30%, ${textColor === '#FFFFFF' ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.12)'} 100%)`
                }}
            />
        </div>
    );
};

/* ─────────────────────────────────── */

const Noise = React.memo(() => (
    <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.035] transform-gpu"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backfaceVisibility: 'hidden',
        }}
    ></div>
));

const FeatureCard = React.memo(({ item, index, totalCards, scrollYProgress, isMobile }) => {
    const containerRef = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        if (isMobile) return;
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

    const opacity = useTransform(
        scrollYProgress,
        [startRange + 0.2, startRange + 0.5],
        [1, 0.95]
    );

    return (
        <div className="sticky top-0 h-screen flex items-center justify-center px-4 md:px-0 perspective-1200 will-change-transform">
            <motion.div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                initial="initial"
                whileInView="hover"
                viewport={{ once: true, amount: isMobile ? 0.1 : 0.2 }}
                style={{
                    scale: scrollScale,
                    opacity: opacity,
                    rotateX: isMobile ? 0 : rotateX,
                    rotateY: isMobile ? 0 : rotateY,
                    backgroundColor: item.color,
                    color: item.textColor,
                    backfaceVisibility: 'hidden',
                    z: 0
                }}
                className="group relative w-full max-w-6xl h-auto min-h-[60vh] md:h-[80vh] rounded-[2rem] md:rounded-[6rem] p-6 md:p-24 shadow-[0_80px_150px_-30px_rgba(0,0,0,0.2)] flex flex-col justify-between overflow-hidden border border-white/10 cursor-crosshair transform-gpu"
            >
                {/* ── Unique card background pattern ── */}
                <CardBackground pattern={item.bgPattern} textColor={item.textColor} />

                <div className="flex justify-between items-start z-10">
                    <div className="space-y-6">
                        <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.6em] opacity-80">
                            {item.category}
                        </p>
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
                        <p className="text-xl md:text-3xl font-medium leading-[1.1] tracking-tight max-w-xl opacity-90">
                            {item.desc}
                        </p>

                        <div className="flex flex-wrap gap-3 pt-6">
                            {item.details.map((detail, i) => (
                                <span
                                    key={i}
                                    className="px-5 py-2 rounded-full border border-current text-xs font-bold uppercase tracking-widest opacity-90"
                                >
                                    {detail}
                                </span>
                            ))}
                        </div>
                    </div>


                </div>

                {/* Hover shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2rem] md:rounded-[6rem]" />
            </motion.div>
        </div>
    );
});

export default function WhyChooseUs() {
    const container = useRef(null);
    const heroRef = useRef(null);
    const [mounted, setMounted] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 150,
        damping: 35,
        restDelta: 0.001
    });

    const bgColor = useTransform(
        smoothProgress,
        [0, 0.01, 1],
        ["#FFFFFF", "#000000", "#000000"]
    );

    return (
        <motion.section
            id="why-choose-us"
            style={{ backgroundColor: bgColor }}
            className="selection:bg-black selection:text-white relative"
        >
            <Noise />

            {/* Premium Static Background - Clean & Minimalist */}
            <motion.div
                style={{
                    opacity: useTransform(smoothProgress, [0, 0.1], [0, 1]),
                }}
                className="sticky top-0 left-0 w-full h-screen pointer-events-none overflow-hidden z-0 bg-[#020202]"
            >
                {/* 1. Subtle Static Texture */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `radial-gradient(#ff3c00 0.5px, transparent 0.5px)`,
                        backgroundSize: '30px 30px'
                    }}
                />

                {/* 2. Static 'ZIPPY' Branding - Large but subtle */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    <h2 className="text-[25vw] md:text-[30rem] font-black italic tracking-tighter text-white/[0.02] uppercase leading-none">
                        ZIPPY
                    </h2>
                </div>

                {/* 3. Deep Vignette for focus */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#000_100%)] opacity-80" />
            </motion.div>

            <div className="relative z-10 -mt-[100vh]">
                <section ref={heroRef} className="min-h-screen flex flex-col justify-between px-6 md:px-16 relative pt-24 pb-16">

                    {/* Top row: eyebrow label + counter */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="flex items-center justify-between z-10"
                    >
                        <div className="flex items-center gap-3">
                            <span className="w-8 h-[1.5px] bg-black inline-block" />
                            <span className="text-[10px] font-black uppercase tracking-[0.15em] md:tracking-[0.35em] text-black/50">Zippy Digital Solutions</span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.15em] md:tracking-[0.35em] text-black/30">10 Reasons</span>
                    </motion.div>

                    {/* Centre: main editorial split */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12 z-10 flex-1 py-10 md:py-0">

                        {/* Left: Headline */}
                        <div className="flex-1 min-w-0 overflow-hidden">
                            <h1 className="font-black leading-[0.85] tracking-[-0.04em] uppercase select-none">
                                {/* WHY */}
                                <div className="overflow-hidden">
                                    <motion.span
                                        initial={{ y: "100%", opacity: 0 }}
                                        animate={{ y: "0%", opacity: 1 }}
                                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                                        className="block text-[17vw] md:text-[11vw] text-black"
                                    >
                                        Why
                                    </motion.span>
                                </div>

                                {/* CHOOSE */}
                                <div className="overflow-hidden">
                                    <motion.span
                                        initial={{ y: "100%", opacity: 0 }}
                                        animate={{ y: "0%", opacity: 1 }}
                                        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                        className="block text-[17vw] md:text-[11vw] text-[#ffe01b]"
                                        style={{ WebkitTextStroke: "2px #000" }}
                                    >
                                        Choose
                                    </motion.span>
                                </div>

                                {/* US? */}
                                <div className="overflow-hidden">
                                    <motion.span
                                        initial={{ y: "100%", opacity: 0 }}
                                        animate={{ y: "0%", opacity: 1 }}
                                        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                        className="block text-[17vw] md:text-[11vw] text-black"
                                    >
                                        Us?
                                    </motion.span>
                                </div>
                            </h1>
                        </div>

                        {/* Right: Descriptor + Stats */}
                        <div className="md:max-w-[380px] shrink-0 flex flex-col gap-5">
                            {/* ── Animated rule ── */}
                            <motion.div
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: 1, opacity: 1 }}
                                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                style={{ originX: 0 }}
                                className="hidden md:block w-full h-px bg-black/20"
                            />

                            {/* ── Tagline ── */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.45 }}
                                className="text-[15px] md:text-[16px] font-medium text-black/70 leading-[1.8] tracking-[0.01em]"
                            >
                                We engineer tailored digital solutions that transform ambitious ideas into{" "}
                                <span className="font-black text-black">measurable results</span>
                                {" "}— fast, refined, and built to last.
                            </motion.p>

                            {/* ── Stat rows with progress bar animation ── */}
                            <div className="divide-y divide-black/[0.08]">
                                {[
                                    { val: "10+", pct: 100, label: "Curated Advantages", sub: "Tailored for growth" },
                                    { val: "100%", pct: 100, label: "Client-First Focus", sub: "Every decision, your way" },
                                    { val: "∞", pct: 85, label: "Infinite Scalability", sub: "Grows as you grow" },
                                ].map(({ val, pct, label, sub }, i) => (
                                    <div key={label} className="group py-4 cursor-default">
                                        <div className="flex items-center justify-between mb-2.5">
                                            <div>
                                                <motion.p
                                                    initial={{ opacity: 0, x: -12 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.5, delay: 0.6 + i * 0.12 }}
                                                    className="text-[11px] font-black uppercase tracking-[0.22em] text-black/70 group-hover:text-black transition-colors duration-300"
                                                >
                                                    {label}
                                                </motion.p>
                                                <motion.p
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.5, delay: 0.7 + i * 0.12 }}
                                                    className="text-[11px] font-medium text-black/50 mt-0.5"
                                                >
                                                    {sub}
                                                </motion.p>
                                            </div>
                                            <motion.span
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.7, delay: 0.65 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                                                className="text-[2.6rem] font-black leading-none tracking-tighter text-black group-hover:text-[#ffe01b] transition-colors duration-300"
                                                style={{ WebkitTextStroke: "1px rgba(0,0,0,0.08)" }}
                                            >
                                                {val}
                                            </motion.span>
                                        </div>
                                        {/* Animated fill bar */}
                                        <div className="h-[2px] w-full bg-black/[0.07] rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: "0%" }}
                                                animate={{ width: `${pct}%` }}
                                                transition={{ duration: 1.2, delay: 0.8 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                                                className="h-full bg-black group-hover:bg-[#ffe01b] rounded-full transition-colors duration-300"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* ── Bottom badge ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 1.1 }}
                                className="flex items-center justify-between border-t border-black/[0.08] pt-4"
                            >
                                <div className="flex items-center gap-2.5">
                                    <motion.span
                                        animate={{ scale: [1, 1.3, 1] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        className="w-2 h-2 rounded-full bg-[#ffe01b] border border-black/15 inline-block"
                                    />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-black/60">Scroll to see all 10</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-px bg-black/15" />
                                    <div className="w-6 h-px bg-black/40" />
                                    <div className="w-2 h-px bg-black/15" />
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Bottom: animated scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex items-center gap-4 z-10"
                    >
                        <div className="relative w-px h-14 bg-black/10 overflow-hidden">
                            <motion.div
                                animate={{ y: ["-100%", "200%"] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-x-0 h-1/2 bg-black/50"
                            />
                        </div>
                        {/* <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">Scroll to explore</span> */}
                    </motion.div>

                </section>

                <section ref={container} className="relative">
                    {features.map((item, index) => (
                        <FeatureCard
                            key={item.number}
                            item={item}
                            index={index}
                            totalCards={features.length}
                            scrollYProgress={smoothProgress}
                            isMobile={isMobile}
                        />
                    ))}
                </section>
            </div>

            <style>{`
        .perspective-1200 {
          perspective: 1200px;
        }
        
        .digital-blaze-text {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 60, 0, 0.5);
          background: linear-gradient(180deg, #ff3c00 0%, #ff8800 50%, #ff3c00 100%);
          -webkit-background-clip: text;
          background-clip: text;
          animation: text-pulse 4s infinite ease-in-out;
          filter: drop-shadow(0 0 15px rgba(255, 60, 0, 0.3));
        }

        @keyframes text-pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; filter: drop-shadow(0 0 25px rgba(255, 60, 0, 0.5)); }
        }
      `}</style>
        </motion.section>
    );
}
