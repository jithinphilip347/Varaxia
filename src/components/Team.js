'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const team = [
  { 
    name: "KAMAL ABRAHAM", 
    role: "CEO, WEALCODER", 
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
  },
  { 
    name: "SELINA GOMAZE", 
    role: "JUNIOR EXECUTIVE", 
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop"
  },
  { 
    name: "PEDRIK", 
    role: "SR. DEVELOPER", 
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop"
  },
  { 
    name: "THOMAS RIBBON", 
    role: "UI DESIGN", 
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop"
  }
];

export default function Team() {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    // Internal Image Parallax
    // The image is larger than container and moves opposite to scroll
    imagesRef.current.forEach((img, i) => {
        if (!img) return;
        
        gsap.fromTo(img, 
            { y: "-20%" }, // Start pulled up
            {
                y: "20%", // Move down
                ease: "none",
                scrollTrigger: {
                    trigger: img.parentElement, // Trigger by container
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            }
        );
    });
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-10 bg-[#0e0e0e] text-white overflow-hidden">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 max-w-7xl mx-auto">
         <h2 className="text-5xl md:text-[5.5vw] font-black uppercase tracking-tighter leading-[0.9] max-w-4xl">
            TEAM, <span className="text-neutral-800">BEHIND</span> THE CREATIVITY
         </h2>
         <p className="text-sm md:text-base text-neutral-400 max-w-xs text-right mt-8 md:mt-0 font-medium">
            Our ability to combine expertise and systems thinking is what fuels us as a team.
         </p>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
        {team.map((member, i) => {
            // Stagger Logic: 
            // Odd indices (1, 3) -> High (No margin)
            // Even indices (0, 2) -> Low (Top Margin)
            // Wait, Reference image: 1st(Low), 2nd(High), 3rd(Low), 4th(High).
            // So Even Index (0, 2) => Low (Top Margin).
            // Odd Index (1, 3) => High.
            
            const isLow = i % 2 === 0;

            return (
              <div 
                key={i} 
                className={`flex flex-col ${isLow ? 'md:mt-24' : ''}`}
              >
                 {/* Image Container */}
                 <div className="w-full aspect-[3/4] overflow-hidden mb-6 relative bg-white/5">
                    {/* Parallax Image Target */}
                    <div ref={el => imagesRef.current[i] = el} className="w-full h-[140%] relative -top-[20%]">
                        <Image 
                           src={member.img}
                           alt={member.name}
                           fill
                           className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                 </div>
                 
                 {/* Info */}
                 <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-1">{member.name}</h3>
                 <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">{member.role}</p>
              </div>
            );
        })}
      </div>
    </section>
  );
}
