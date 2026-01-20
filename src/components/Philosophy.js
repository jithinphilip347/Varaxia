"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: "design",
    title: "Design",
    description:
      "Intelligent design is the essence of nature; that’s our inspiration in crafting tomorrow’s tech realm.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop", // Abstract 3D shape (Butterfly-ish)
  },
  {
    id: "build",
    title: "Build",
    description:
      "Constantly adopting cutting edge technology for your enterprise to harness its endless possibilities and leave a global imprint.",
    image:
      "https://images.unsplash.com/photo-1614730373829-51c853037a60?q=80&w=1000&auto=format&fit=crop", // Abstract Sphere/Orb
  },
  {
    id: "market",
    title: "Market",
    description:
      "Experts in solving the WHY, WHERE and HOW of propelling your business to new frontiers.",
    image:
      "https://images.unsplash.com/photo-1636819488524-1f019c4e1c44?q=80&w=1000&auto=format&fit=crop", // 3D Rocket
  },
];

export default function Philosophy() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Text Reveal Animation
      const textElenents = gsap.utils.toArray(".reveal-text span");

      gsap.to(textElenents, {
        bg: "white", // This won't work for gradient/clip, we need opacity or color
        color: "white",
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 70%",
          end: "bottom 70%",
          scrub: 1,
        },
      });

      // 2. Steps Pinned Animation
      const stepsContainer = document.querySelector(".steps-container");
      const stepPanels = gsap.utils.toArray(".step-panel");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stepsContainer,
          start: "top top",
          end: "+=300%", // Scroll distance
          pin: true,
          scrub: 1,
        },
      });

      stepPanels.forEach((panel, i) => {
        if (i === 0) return; // First one is already visible

        // Previous panel fades out with blur
        tl.to(
          stepPanels[i - 1],
          {
            opacity: 0,
            filter: "blur(20px)",
            duration: 1,
            scale: 0.9,
          },
          `step-${i}`,
        );

        // Current panel fades in from blur
        tl.fromTo(
          panel,
          {
            opacity: 0,
            filter: "blur(20px)",
            scale: 1.1,
          },
          {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            duration: 1,
          },
          `step-${i}`, // Sync start
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-[#0e0e0e] text-white relative z-10"
    >
      {/* 1. Intro Reveal Text */}
      <div
        ref={textRef}
        className="py-24 px-6 md:px-16 max-w-7xl mx-auto min-h-[50vh] flex items-center justify-center"
      >
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-medium text-center leading-tight">
          {`We believe in a world where technology fosters your everyday experiences. And our mission is to make it happen!`
            .split(" ")
            .map((word, i) => (
              <span
                key={i}
                className="reveal-text inline-block mr-3 text-neutral-800 transition-colors"
              >
                {word}
              </span>
            ))}
        </h2>
      </div>

      {/* 2. Three Steps (Design, Build, Market) */}
      <div className="steps-container w-full h-screen relative overflow-hidden">
        {steps.map((step, i) => (
          <div
            key={step.id}
            className={`step-panel absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 px-6 ${i !== 0 ? "opacity-0" : "opacity-100"}`}
            style={{ zIndex: steps.length - i }}
          >
            {/* Visual (Left for even, Right for odd - alternating or centered?) 
                    User image had Image on top/center and text below. Let's do Center alignment.
                */}
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              {/* 3D Image Representative */}
              <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] relative mb-8 md:mb-12">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                />
              </div>

              {/* Text Content */}
              <h3 className="text-6xl md:text-9xl font-extralight mb-6 tracking-tight">
                {step.title}
              </h3>
              <p className="text-lg md:text-2xl text-neutral-400 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
                {step.description}
              </p>

              <Link
                href="/services"
                className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors text-lg uppercase tracking-widest font-bold"
              >
                Learn More
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
