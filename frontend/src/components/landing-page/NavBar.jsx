"use client";

import React, { useState, useEffect } from 'react';

const NavBar = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY < 50) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        const timer = setTimeout(() => {
            handleScroll();
            window.addEventListener('scroll', handleScroll, { passive: true });
        }, 2200);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navLinks = [
        { id: "01", name: "SERVICES", href: "#services" },
        { id: "02", name: "WHY CHOOSE US", href: "#why-choose-us" },
        { id: "03", name: "TEAM", href: "#team" },
    ];

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
        setIsMenuOpen(false);
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-[10000] flex items-center justify-between px-6 md:px-12 py-4 md:py-6 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible || isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
                    }`}
            >
                {/* Logo Section */}
                <div className="flex items-center gap-3 pointer-events-auto cursor-pointer group z-[101]">
                    <img src="/zippybg.png" alt="Zippy Logo" className="h-10 md:h-14 w-auto object-contain group-hover:scale-110 transition-transform duration-500" />
                    <div className="flex flex-col gap-1">
                        <span className={`text-2xl md:text-4xl font-bebas tracking-wider leading-none transition-colors duration-500 ${isMenuOpen ? 'text-white' : 'text-black'}`}>ZIPPY</span>
                        <span className={`text-[7px] md:text-[9px] font-bold tracking-[0.4em] uppercase transition-colors duration-500 ${isMenuOpen ? 'text-gray-400' : 'text-gray-500'}`}>Digital solutions</span>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-8 items-center pointer-events-auto">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-lg font-bebas text-black tracking-[0.2em] hover:text-[#ffe01b] transition-all duration-300 relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ffe01b] transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                </div>

                {/* Enhanced Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden flex items-center pointer-events-auto z-[101] group outline-none"
                    aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
                >

                    <div className="relative w-12 h-12 flex items-center justify-center">
                        {/* Circular Background with Ripple Effect */}
                        <div className={`absolute inset-0 rounded-full border transition-all duration-700 ease-out ${isMenuOpen
                            ? 'bg-[#ffe01b] border-[#ffe01b] scale-100 rotate-180'
                            : 'bg-transparent border-black/10 group-hover:border-black group-hover:scale-110'
                            }`} />

                        {/* Animated Lines */}
                        <div className="relative flex flex-col items-center gap-1.5">
                            <div className={`h-[2px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isMenuOpen ? 'w-6 bg-black rotate-45 translate-y-[4px]' : 'w-6 bg-black'
                                }`} />
                            <div className={`h-[2px] rounded-full transition-all duration-300 ${isMenuOpen ? 'w-0 opacity-0' : 'w-4 bg-black self-end'
                                }`} />
                            <div className={`h-[2px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isMenuOpen ? 'w-6 bg-black -rotate-45 -translate-y-[4px]' : 'w-6 bg-black'
                                }`} />
                        </div>
                    </div>
                </button>
            </nav>

            {/* Premium Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-[90] bg-[#0d0d0d] flex flex-col transition-all duration-800 ease-[cubic-bezier(0.85,0,0.15,1)] ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                    }`}
            >
                {/* Custom Font Imports */}
                <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;500;700;800&family=JetBrains+Mono:wght@400;700&display=swap');`}</style>

                {/* Background Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_10%,#1a1a1a_0%,#000000_100%)] opacity-80" />
                    <div className={`absolute top-[15%] left-[15%] w-[400px] h-[400px] bg-[#ffe01b]/5 rounded-full blur-[120px] transition-all duration-1000 ${isMenuOpen ? 'opacity-100 scale-125' : 'opacity-0 scale-50'}`}></div>
                </div>

                <div className="relative flex-1 flex flex-col justify-center px-8 md:px-24 gap-6 md:gap-8 pt-24">
                    {navLinks.map((link, i) => (
                        <div key={link.name} className="overflow-hidden group py-1">
                            <a
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className={`flex items-baseline gap-4 md:gap-8 transition-all duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${isMenuOpen ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-20 opacity-0 blur-sm'
                                    }`}
                                style={{ transitionDelay: `${300 + i * 150}ms` }}
                            >
                                {/* Refined Numbering */}
                                <span className="font-['JetBrains_Mono'] text-[10px] md:text-xs font-medium text-[#ffe01b] opacity-30 group-hover:opacity-100 transition-opacity duration-500 shrink-0">
                                    {link.id}
                                </span>

                                <div className="relative overflow-visible flex-1">
                                    {/* Main Text - Plus Jakarta Sans */}
                                    <span className="block text-4xl sm:text-6xl md:text-[7.5rem] font-['Plus_Jakarta_Sans'] font-extrabold text-white uppercase tracking-tight leading-[1] transition-all duration-500 group-hover:text-[#ffe01b] group-hover:translate-x-2">
                                        {link.name}
                                    </span>

                                    {/* Decorative thin accent line */}
                                    <div className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#ffe01b] transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-1/4" />
                                </div>

                                {/* Arrow reveal on hover */}
                                <div className="opacity-0 -translate-x-4 group-hover:opacity-40 group-hover:translate-x-0 transition-all duration-500 hidden md:block">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                                        <path d="M17 7L7 17M17 7H7M17 7V17" />
                                    </svg>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>

                {/* Mobile Menu Footer CTA & Info */}
                <div className={`relative p-8 md:p-14 flex flex-col gap-6 transition-all duration-1000 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '700ms' }}>

                    {/* Work with us Button in Menu */}
                    <button
                        onClick={(e) => {
                            setIsMenuOpen(false);
                            // Dispatch custom event to open the contact modal
                            setTimeout(() => {
                                window.dispatchEvent(new CustomEvent('open-contact-modal'));
                            }, 300); // Wait for menu close animation
                        }}
                        className="group relative self-start px-8 py-4 bg-[#ffe01b] text-zinc-900 font-bebas text-xl tracking-widest overflow-hidden transition-transform active:scale-95"
                        style={{
                            clipPath: "polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)"
                        }}
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            WORK WITH US
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                        </span>
                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                    </button>

                    <div className="h-[1px] w-full bg-white/5"></div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold tracking-[0.4em] text-gray-400 uppercase">Contact us</span>
                            <span className="text-sm font-sans text-white tracking-wider opacity-60">hello@zippydigital.com</span>
                        </div>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-bold tracking-[0.3em] text-gray-400/60 uppercase">
                            <a href="#" className="hover:text-[#ffe01b] transition-colors">Instagram</a>
                            <a href="#" className="hover:text-[#ffe01b] transition-colors">Twitter</a>
                            <a href="#" className="hover:text-[#ffe01b] transition-colors">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBar;
