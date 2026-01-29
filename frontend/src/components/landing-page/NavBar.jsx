"use client";

import React, { useState, useEffect } from 'react';

const NavBar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // If at the top or scrolling up, show navbar
            if (currentScrollY < 10 || currentScrollY < lastScrollY) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY) {
                // Scrolling down, hide navbar
                setIsVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-8 pointer-events-none transition-all duration-300 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}
        >
            <div className="text-3xl font-black tracking-tighter flex items-center pointer-events-auto">
                <span className="text-[#333]">VANDS</span>
                <span className="text-[#333] border-2 border-[#333] px-1 ml-1 rounded-sm">LAB</span>
            </div>
            <div className="hidden md:flex gap-12 text-[13px] font-bold text-[#333] tracking-wider pointer-events-auto">
                <a href="#" className="hover:text-black">SERVICES</a>
                <a href="#" className="hover:text-black">OUR WORK</a>
                <a href="#" className="hover:text-black">CONTACT</a>
            </div>
        </nav>
    );
};

export default NavBar;
