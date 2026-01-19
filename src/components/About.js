'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const container = useRef();
  
  const stats = [
    { value: "15", label: "Year\nExperience" },
    { value: "25K", label: "+ Happy\nCustomer" },
    { value: "8K", label: "Project\nCompleted" },
    { value: "98", label: "Team\nMember" }// Updated label based on image "Team Member" seems likely or Success
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        end: "bottom bottom",
        toggleActions: "play none none reverse"
      }
    });

    tl.from('.about-title-line', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out'
    })
    .from(['.about-desc', '.about-link'], {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    }, "-=0.5");

    // Parallax effect for images
    gsap.to('.parallax-img-1', {
      yPercent: -30, // Increased intensity
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1 // Smoother scrub
      }
    });

    gsap.to('.parallax-img-2', {
      yPercent: 30, // Increased intensity
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1 // Smoother scrub
      }
    });

  }, { scope: container });

  return (
    <section id="about" ref={container} className="py-20 px-6 md:px-10 bg-[#0e0e0e] text-white overflow-hidden">
      {/* 1. Main Heading - Increased Size & Visibility */}
      <div className="mb-8"> 
        <h2 className="text-[15px] md:text-[63px] font-black uppercase tracking-tighter leading-[1.1] md:leading-[0.9] w-full">
           <span className="about-title-line block flex items-end gap-3 md:gap-5">
              <span className="w-12 md:w-20 h-[2px] bg-neutral-600 mb-3 md:mb-5"></span>
              We're Friendly And <span className="text-neutral-600">Experienced</span>
           </span>
           <span className="about-title-line block">Creative Agency Based In California</span>
           <span className="about-title-line block">And Our Team Creates An Exceptional</span>
           <span className="about-title-line block">UI/UX Visualization And <span className="text-neutral-600">Thought-Out</span></span>
           <span className="about-title-line block">Functionality By Thinking Creative</span>
           <span className="about-title-line block">Ideas.</span>
        </h2>
      </div>

      {/* 2. Description & Link - Centered */}
      <div className="flex flex-col items-center justify-center text-center mb-10 md:mb-16">
         <p className="about-desc text-sm md:text-base leading-relaxed text-gray-400 max-w-2xl mb-6 text-center mx-auto">
             We Deploy World-Class Creative Design Team On Demand. That Can Design, Build, Ship And Scale Your Vision In The Most Efficient Way. We Believe That The Surest Measure Of Success Is When A Client Partners With Us More Than Once.
         </p>
         <a href="#" className="about-link group flex items-center gap-2 text-xs font-bold uppercase tracking-widest pb-1 border-b border-white hover:text-gray-300 hover:border-gray-300 transition-colors">
            Know More Us
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
         </a>
      </div>

      {/* 3. Images - Centered with Parallax & Reduced Gap */}
      <div className="parallax-wrapper flex justify-center items-start gap-4 md:gap-5 mb-20 md:mb-32 h-[300px] md:h-[550px] relative">
          {/* Image 1: Landscape - Moves Up */}
          <div className="parallax-img-1 w-[45vw] md:w-[450px] h-[30vw] md:h-[300px] relative overflow-hidden self-center md:self-start mt-8 md:mt-24">
             <Image 
               src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
               alt="Creative Team"
               fill
               className="object-cover hover:scale-105 transition-transform duration-700"
             />
          </div>
          
          {/* Image 2: Portrait - Moves Down */}
          <div className="parallax-img-2 w-[35vw] md:w-[320px] h-[50vw] md:h-[480px] relative overflow-hidden">
             <Image 
               src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop"
               alt="Office Discussion"
               fill
               className="object-cover hover:scale-105 transition-transform duration-700"
             />
          </div>
      </div>

      {/* 4. Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-white/10 pt-16">
        {stats.map((stat, i) => (
          <div key={i} className="stat-item flex items-center gap-4">
             <span className="text-5xl md:text-8xl font-black tracking-tighter leading-none">{stat.value}</span>
             <span className="text-[10px] md:text-xs font-bold uppercase leading-tight text-white">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
