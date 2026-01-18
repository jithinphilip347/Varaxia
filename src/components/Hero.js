'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight, ArrowRight } from 'lucide-react'; // Updated generic Arrow if needed, keeping ArrowDownRight for now or swapping
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef();
  
  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Text Reveal
    tl.from('.hero-line', {
      y: 200,
      opacity: 0,
      duration: 1.5,
      stagger: 0.15,
      ease: 'power4.out',
      delay: 0.2
    });

    // Right Side Content Fade In
    tl.from('.hero-right', {
       opacity: 0,
       x: 50,
       duration: 1,
       ease: 'power3.out'
    }, "-=1");

    // Parallax Image Effect
    gsap.to('.hero-image-img', {
      yPercent: 20, // Move image down slightly as we scroll
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Pill Image Parallax
    gsap.fromTo('.hero-pill-img', {
      scale: 1.3,
      y: "-20%"
    }, {
      y: "20%",
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
    
  }, { scope: container });

  return (
    <section ref={container} className="min-h-screen w-full bg-[#0e0e0e] text-white pt-32 px-6 md:px-10 flex flex-col justify-between overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start w-full relative z-10">
          <div>
            {/* 3. "We Design Creative Ideas" Layout */}
            {/* 3. "We Design Creative" Layout with Pill Image */}
            <div className="hero-line text-[13vw] leading-[0.85] font-black uppercase tracking-tighter">
              <div className="flex items-center gap-4 md:gap-8 flex-wrap">
                  <span>We</span>
                  
                  {/* Pill Shaped Image */}
                  <div className="relative w-[22vw] h-[11vw] md:w-[16vw] md:h-[8vw] rounded-full overflow-hidden border-2 border-white/20 mt-2 md:mt-4">
                      <Image 
                         src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop" 
                         alt="Agency Life"
                         fill
                         className="object-cover hero-pill-img"
                      />
                  </div>
              </div>
              <div>Design</div>
              <div>Creative</div>
            </div>
          </div>

          {/* 4. Right Side Content */}
          {/* 4. Right Side Content - Visible on Mobile now, stacked */}
          <div className="flex flex-col items-start mt-8 md:mt-20 max-w-xs hero-right">
             {/* Big Arrow Icon - Smaller on mobile */}
             <ArrowDownRight className="w-16 h-16 md:w-24 md:h-24 mb-4 md:mb-6 stroke-1" />
             
             {/* Description Text */}
             <p className="text-xs md:text-sm opacity-70 leading-relaxed mb-6">
               We felt strongly that design was more than pretty pictures, it was a powerful tool that could really transform business.
             </p>

             {/* 5. "KNOW MORE US" Link */}
             <a href="#" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest pb-1 border-b border-white/30 hover:border-white transition-colors">
                Know More Us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </a>
          </div>
      </div>

      {/* 6. Parallax Image at Bottom */}
      <div className="w-full h-[40vh] md:h-[65vh] mt-10 md:mt-0 relative overflow-hidden">
         <div className="absolute inset-0 w-full h-[120%] -top-[10%] hero-image-wrapper">
             <Image 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
                alt="Creative Agency Team"
                fill
                className="hero-image-img object-cover"
                priority
             />
         </div>
      </div>
    </section>
  );
}
