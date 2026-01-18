'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { 
    id: "01", 
    title: "BRANDING", 
    desc: "Crafting unique brand identities."
  },
  { 
    id: "02", 
    title: "UI/UX DESIGN", 
    desc: "Designing intuitive digital experiences."
  },
  { 
    id: "03", 
    title: "DEVELOPMENT", 
    desc: "Building robust, scalable solutions."
  },
  { 
    id: "04", 
    title: "MARKETING", 
    desc: "Data-driven growth strategies."
  },
  { 
    id: "05", 
    title: "CONTENT", 
    desc: "Compelling storytelling."
  }
];

export default function Services() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=300%", 
                pin: true,
                scrub: 1,
            }
        });

        cardsRef.current.forEach((card, i) => {
            // Card 01: Static (Scrolls naturally with the section)
            // Cards 02+: Fly in from Bottom-Right and stack
            
            if (i === 0) return; 

            tl.fromTo(card, 
                { 
                    x: "100vw", 
                    y: "100vh", 
                }, 
                { 
                    x: `${i * 12}vw`, // 12vw, 24vw, 36vw... (Horizontal Stack)
                    y: 0,
                    ease: "none", 
                    duration: 1
                }
            );
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen bg-[#0e0e0e] text-white overflow-hidden relative flex items-center">
      
      {/* Background Title */}
      <div className="absolute top-8 left-10 z-0">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
             Our Services
          </h2>
      </div>

      {/* Cards Container - Aligned with Title using margin-left */}
      <div className="relative w-full h-[70vh] flex items-center ml-10 mt-20">
        {services.map((service, i) => (
          <div 
            key={i} 
            ref={el => cardsRef.current[i] = el}
            className="absolute top-0 h-full w-[85vw] md:w-[45vw] bg-black border-l border-white/20 p-8 flex flex-col justify-between"
            // Initial position for static first card is correct (left: 0)
            // Others will be animated, but we set initial css for the first one primarily
            style={{ 
                zIndex: i + 1,
                left: 0 // All visually start at 0, animation moves them or they start offscreen via GSAP
            }} 
          >
               {/* Number - Top Left (Visible Area) */}
               <div className="text-6xl md:text-8xl font-black text-[#ff8ba7] tracking-tighter leading-none opacity-100 mb-10">
                  {service.id}
               </div>

               {/* Content - Bottom */}
               <div className="flex flex-col gap-4 items-start pl-2">
                  <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none max-w-lg">
                     {service.title}
                  </h3>
                  <p className="text-sm md:text-lg font-medium text-neutral-400 max-w-xs uppercase tracking-wide leading-relaxed text-left">
                     {service.desc}
                  </p>
               </div>
          </div>
        ))}
      </div>
    </section>
  );
}
