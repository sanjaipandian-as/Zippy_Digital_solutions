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

        // Delay the navbar appearance
        const timer = setTimeout(() => {
            handleScroll(); // Check initial position after delay
            window.addEventListener('scroll', handleScroll, { passive: true });
        }, 2200);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navLinks = [
        { name: "SERVICES", href: "#services" },
        { name: "PRODUCTS", href: "#products" },
        { name: "TEAM", href: "#team" },
    ];

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - 100;

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
                className={`fixed top-0 left-0 right-0 z-[9999] flex items-center justify-between px-6 md:px-12 py-8 md:py-10 transition-all duration-500 ease-in-out ${isVisible || isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                    }`}
            >
                <div className="flex items-center gap-3 pointer-events-auto">
                    <img src="/zippybg.png" alt="Zippy Logo" className="h-10 md:h-16 w-auto object-contain" />
                    <div className="flex flex-col">
                        <span className={`text-3xl md:text-5xl font-bebas tracking-wide leading-none pt-1 transition-colors duration-300 ${isMenuOpen ? 'text-white' : 'text-black'}`}>ZIPPYY</span>
                        <span className={`text-[8px] md:text-[10px] font-bold tracking-[0.3em] uppercase mt-0.5 transition-colors duration-300 ${isMenuOpen ? 'text-white' : 'text-gray-500'}`}>Digital solutions</span>
                    </div>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex gap-8 text-2xl font-bebas text-black tracking-wide pointer-events-auto">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="hover:opacity-60 transition-opacity cursor-pointer">{link.name}</a>
                    ))}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden flex flex-col gap-1.5 p-2 pointer-events-auto z-[110]"
                >
                    <div className={`w-8 h-1 transition-transform duration-300 ${isMenuOpen ? 'bg-white rotate-45 translate-y-2.5' : 'bg-black'}`} />
                    <div className={`w-8 h-1 transition-opacity duration-300 ${isMenuOpen ? 'bg-white opacity-0' : 'bg-black opacity-100'}`} />
                    <div className={`w-8 h-1 transition-transform duration-300 ${isMenuOpen ? 'bg-white -rotate-45 -translate-y-2.5' : 'bg-black'}`} />
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black z-[90] transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'
                    } flex flex-col items-center justify-center gap-12`}
            >
                {navLinks.map((link, i) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`text-6xl font-bebas text-[#F0FF80] tracking-widest hover:text-white transition-colors duration-300 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                            }`}
                        style={{ transitionDelay: `${i * 100}ms` }}
                    >
                        {link.name}
                    </a>
                ))}

                <div className="absolute bottom-12 text-gray-500 font-bebas tracking-[0.3em] text-sm">
                    ZIPPYY DIGITAL SOLUTIONS © 2026
                </div>
            </div>
        </>
    );
};

export default NavBar;
