'use client';
import { useState } from 'react';
import MagneticButton from "@/components/MagneticButton";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from 'next/link';
import localFont from 'next/font/local';

const logoFont = localFont({ src: '../assets/fonts/logo-font.otf' });

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
        <header className="absolute top-0 left-0 w-full z-50 px-6 md:px-10 py-6 flex justify-between items-center text-white mix-blend-difference">
      
          {/* 1. Left: Logo */}
          <div className="flex-1">
            <Link 
              href="/" 
              className={`text-2xl md:text-3xl font-black uppercase tracking-widest cursor-pointer relative z-50 ${logoFont.className} text-white`}
            >
               Varaxia
            </Link>
          </div>

          {/* 2. Center: Desktop Navigation Links (Hidden < 1280px, visible on large desktops) */}
          <nav className="hidden xl:flex flex-1 justify-center">
            <ul className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
               {["Home", "About", "Services", "Portfolio", "Blog"].map((item) => (
                 <li key={item} className="cursor-pointer hover:text-neutral-400 transition-colors relative group">
                    <Link href={item === "Home" ? "/" : item === "Blog" ? "/blog" : `/#${item.toLowerCase()}`}>
                       {item}
                    </Link>
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                 </li>
              ))}
            </ul>
          </nav>
          
          {/* 3. Right: Buttons */}
          <div className="flex-1 flex justify-end items-center gap-4">
              
              {/* Let's Talk Button (Always Visible or Hidden on Mobile if crowded? Keeping visible) */}
              <div className="hidden md:block">
                  <MagneticButton>
                     <Link href="/contact">
                        <button className="bg-white text-black px-6 py-3 rounded-full flex items-center gap-3 font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors">
                            <ArrowRight className="w-4 h-4" />
                            Let's Talk
                        </button>
                     </Link>
                  </MagneticButton>
              </div>

              {/* Mobile Menu Toggle (Visible < 1280px) */}
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="xl:hidden p-2 text-white relative z-50"
              >
                  <Menu className="w-8 h-8" />
              </button>
          </div>
        </header>

        {/* 4. Side Navigation Overlay */}
        <div 
            className={`fixed inset-0 z-[60] bg-[#0e0e0e] text-white flex flex-col justify-center items-center transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
            {/* Close Button */}
            <button 
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-8 right-8 p-2 text-white/50 hover:text-white transition-colors"
            >
                <X className="w-10 h-10" />
            </button>

            {/* Menu Links */}
            <ul className="flex flex-col gap-6 text-center">
                {["Home", "About", "Services", "Portfolio", "Blog"].map((item) => (
                    <li key={item} className="overflow-hidden">
                         <Link 
                            href={item === "Home" ? "/" : item === "Blog" ? "/blog" : `/#${item.toLowerCase()}`}
                            onClick={() => setIsMenuOpen(false)}
                            className="block text-5xl md:text-7xl font-black uppercase tracking-tighter hover:text-[#d0fd3e] transition-colors"
                         >
                            {item}
                         </Link>
                    </li>
                ))}
            </ul>

            {/* Mobile Let's Talk (If hidden in header) */}
            <div className="mt-12 md:hidden">
                 <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                    <button className="bg-[#d0fd3e] text-black px-8 py-4 rounded-full flex items-center gap-3 font-bold uppercase tracking-widest">
                        Let's Talk
                    </button>
                 </Link>
            </div>
        </div>
    </>
  );
}
