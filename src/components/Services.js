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
    let mm = gsap.matchMedia();

    mm.add({
        // DESKTOP: Horizontal Deck Scroll
        desktop: "(min-width: 768px)",
        // MOBILE: Vertical Stack Scroll
        mobile: "(max-width: 767px)"
    }, (context) => {
        let { desktop, mobile } = context.conditions;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: desktop ? "+=300%" : "+=500%", // Longer scroll for mobile vertical stack
                pin: true,
                scrub: 1,
            }
        });

        cardsRef.current.forEach((card, i) => {
            if (i === 0) return; // First card is anchor

            if (desktop) {
                // Desktop: Horizontal Deck (Right -> Left)
                tl.fromTo(card, 
                    { x: "100vw", y: "100vh" }, 
                    { 
                        x: `${i * 12}vw`, 
                        y: 0,
                        ease: "none", 
                        duration: 1
                    }
                );
            } else {
                // Mobile: Vertical Stepped Stack (Bottom -> Top)
                // Cards slide UP and stop at specific offsets to reveal numbers of previous cards
                // e.g. Card 01 at 0px, Card 02 at 60px...
                tl.fromTo(card,
                    { y: "100vh" }, 
                    {
                        y: `${i * 55}px`, // 55px Vertical Gap to Show Number of card behind
                        ease: "none",
                        duration: 1
                    }
                );
            }
        });
    }); 

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen bg-[#0e0e0e] text-white overflow-hidden relative flex items-center">
      
      {/* Background Title */}
      <div className="absolute top-8 left-6 md:left-10 z-0">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
             Our Services
          </h2>
      </div>

      {/* Cards Container */}
      <div className="relative w-full h-[90vh] md:h-[70vh] flex items-center justify-center md:justify-start ml-0 md:ml-10 mt-32 md:mt-20">
        {services.map((service, i) => (
          <div 
            key={i} 
            ref={el => cardsRef.current[i] = el}
            // Mobile: h-[50vh] (Reduced height to fit stack), Desktop: h-full (Full height)
            className="absolute top-0 h-[50vh] md:h-full w-[85vw] md:w-[45vw] bg-black border-l border-white/20 p-6 md:p-8 flex flex-col justify-between left-0 right-0 mx-auto md:mx-0 md:left-0"
            style={{ zIndex: i + 1 }} 
          >
               {/* Number - Top Left (Visible Area) */}
               <div className="text-5xl md:text-8xl font-black text-[#ff8ba7] tracking-tighter leading-none opacity-100 mb-6 md:mb-10">
                  {service.id}
               </div>

               {/* Content - Bottom */}
               <div className="flex flex-col gap-2 md:gap-4 items-start pl-2">
                  <h3 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none max-w-lg">
                     {service.title}
                  </h3>
                  <p className="text-xs md:text-lg font-medium text-neutral-400 max-w-xs uppercase tracking-wide leading-relaxed text-left">
                     {service.desc}
                  </p>
               </div>
          </div>
        ))}
      </div>
    </section>
  );
}
