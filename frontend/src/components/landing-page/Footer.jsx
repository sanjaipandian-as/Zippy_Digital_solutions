"use client";

import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedContactReveal from './AnimatedContactReveal';

export default function Footer() {
  // We use inline styles for the animations to ensure precise control over the keyframes
  // without needing an external CSS file, making this a self-contained artifact.

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <footer id="contact-us" className="relative w-full h-screen md:h-screen bg-black overflow-hidden flex flex-col justify-between items-center font-sans select-none z-[10002] pt-10 md:pt-0 -mt-1">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        .font-bebas { font-family: 'Bebas Neue', sans-serif; }
        
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        
        .animate-marquee-reverse {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite reverse;
        }
        
        .mask-linear {
          mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
        }
      `}</style>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.12] pointer-events-none overflow-hidden flex items-center justify-center">
        <h2 className="text-[60vw] font-black text-white leading-none tracking-tighter select-none font-bebas">ZIPPY</h2>
      </div>

      <div className="w-full flex-grow flex flex-col justify-center items-center gap-4 md:gap-4 z-10">
        {/* Top Marquee */}
        <div className="w-full h-10 md:h-16 overflow-hidden border-y border-white/10 rotate-[-1deg] scale-105 bg-zinc-900/50 backdrop-blur-sm flex items-center">
          <div className="animate-marquee">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <span key={i} className="text-2xl md:text-5xl font-bebas text-white/20 mx-4 md:mx-12 whitespace-nowrap">
                READY TO DISCUSS YOUR NEXT PROJECT <span className="text-[#FFFF00] opacity-100">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* Main CTA Section */}
        <div className="relative px-6 py-2 md:py-2 text-center group">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="space-y-4 md:space-y-4"
          >
            <h2 className="text-5xl md:text-[8.5rem] lg:text-[10rem] font-bebas leading-[0.85] md:leading-[0.8] text-white tracking-tighter">
              LET'S <span className="text-[#FFFF00]">CREATE</span> <br />
              SOMETHING <span className="italic">GREAT</span>
            </h2>
            <p className="text-zinc-500 text-[10px] md:text-lg font-medium tracking-wide max-w-xl mx-auto uppercase">
              Tailored Digital Solutions for the Modern Era
            </p>
          </motion.div>
        </div>

        {/* Integrated Button - Now in the layout flow for better mobile spacing */}
        <div className="z-20 pointer-events-none py-4 md:py-0 w-full flex justify-center">
          <AnimatedContactReveal />
        </div>

        {/* Bottom Marquee */}
        <div className="w-full h-10 md:h-16 overflow-hidden border-y border-white/10 rotate-[1deg] scale-105 bg-black flex items-center">
          <div className="animate-marquee-reverse">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <span key={i} className="text-2xl md:text-5xl font-bebas text-white/20 mx-4 md:mx-12 whitespace-nowrap">
                TRANSFORMING IDEAS INTO EXPERIENCES <span className="text-[#FFFF00] opacity-100">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>



      {/* Footer Info Bar */}
      <div className="w-full border-t border-white/5 py-4 px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-6 items-end z-10 backdrop-blur-xl bg-black/80">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <img src="/zippywhite.png" alt="Zippy Logo" className="h-12 md:h-16 w-auto object-contain" />
            <div className="flex flex-col">
              <span className="text-white font-bebas text-3xl md:text-5xl leading-none tracking-wide">ZIPPY</span>
              <span className="text-[#FFFF00] font-bold text-[8px] md:text-[10px] tracking-[0.4em] uppercase mt-1">Digital solutions</span>
            </div>
          </div>
          <p className="text-zinc-500 text-xs md:text-sm font-medium leading-relaxed max-w-xs uppercase mt-2 md:mt-0">
            Providing high-quality digital solutions to elevate your brand presence.
          </p>
        </div>

        <div className="flex flex-col md:items-center gap-2">
          <div className="flex gap-4 md:gap-10">
            {[
              { name: 'LinkedIn', url: 'https://www.linkedin.com/company/zippydigitalsolutions/' },
              { name: 'Instagram', url: 'https://www.instagram.com/zippydigitalsolutions?igsh=enBzOHp0dG5ocWth' },
              { name: 'Mail', url: 'mailto:tech@zippydigitalsolutions.in' }
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target={social.name !== 'Mail' ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="text-white/40 hover:text-[#FFFF00] text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors duration-300"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        <div className="text-right space-y-1">
          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">© 2026 Zippy Digital Solutions</p>
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest hover:text-[#FFFF00] transition-colors cursor-pointer">All Rights Reserved</p>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-transparent to-black opacity-60"></div>

      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FFFF00]/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#FFFF00]/5 rounded-full blur-[120px] pointer-events-none"></div>
    </footer >
  );
}
