'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Preloader() {
  const containerRef = useRef(null);
  const dotsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    const dots = dotsRef.current.children;

    // 1. Dots Animation (Horizontal Fade/Scale Wave)
    const waveTl = gsap.timeline({ repeat: -1 }); 
    waveTl.to(dots, {
      opacity: 0.2,
      scale: 0.8,
      duration: 0.5,
      stagger: {
        each: 0.2,
        yoyo: true,
        repeat: 1
      },
      ease: "power1.inOut"
    });

    // 2. Main Sequence
    // Run loop for a bit, then exit
    tl.to({}, { duration: 2.5 }) // Wait 2.5s simulating load
      .to(dots, { autoAlpha: 0, duration: 0.3 }) 
      .to(containerRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "expo.inOut"
      });

  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] bg-[#0e0e0e] flex items-center justify-center">
      <div ref={dotsRef} className="flex gap-4">
        <div className="w-4 h-4 rounded-full bg-white"></div>
        <div className="w-4 h-4 rounded-full bg-white"></div>
        <div className="w-4 h-4 rounded-full bg-white"></div>
      </div>
    </div>
  );
}
