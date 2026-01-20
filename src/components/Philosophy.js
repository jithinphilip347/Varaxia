"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { PhilosophyBackground, PhilosophyShape } from "./Philosophy3D";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: "design",
    title: "Design",
    description:
      "Intelligent design is the essence of nature; that’s our inspiration in crafting tomorrow’s tech realm.",
  },
  {
    id: "build",
    title: "Build",
    description:
      "Constantly adopting cutting edge technology for your enterprise to harness its endless possibilities and leave a global imprint.",
  },
  {
    id: "market",
    title: "Market",
    description:
      "Experts in solving the WHY, WHERE and HOW of propelling your business to new frontiers.",
  },
];

export default function Philosophy() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Text Reveal Animation
      const textElements = gsap.utils.toArray(".reveal-text");

      gsap.to(textElements, {
        color: "white",
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "bottom 50%",
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
          end: "+=150%",
          pin: true,
          scrub: 0.5,
          fastScrollEnd: true,
          preventOverlaps: true,
          refreshPriority: 1, // Ensure this calculates spacing before subsequent triggers
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
      <PhilosophyBackground />

      {/* 1. Intro Reveal Text */}
      <div
        ref={textRef}
        className="pt-24 pb-12 px-6 md:px-16 max-w-7xl mx-auto min-h-[30vh] flex items-center justify-center relative z-10"
      >
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-light text-center leading-tight">
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
            className={`step-panel absolute inset-0 w-full h-full flex flex-col md:flex-row items-center md:items-center justify-start md:justify-center gap-10 md:gap-32 px-6 md:px-20 ${i !== 0 ? "opacity-0" : "opacity-100"}`}
            style={{ zIndex: steps.length - i }}
          >
            {/* Text Content (Left side) */}
            <div className="flex flex-col items-start text-left max-w-xl order-2 md:order-1 pt-[40vh] md:pt-0 pointer-events-auto">
              <h3 className="text-6xl md:text-8xl font-thin mb-8 tracking-tight">
                {step.title}
              </h3>
              <p className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed mb-10 max-w-md">
                {step.description}
              </p>

              <Link
                href="/services"
                className="group flex items-center gap-3 text-white hover:text-neutral-300 transition-colors text-sm uppercase tracking-[0.2em] font-medium border-b border-white/20 pb-1"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Visual (Right side) - Now containing separate 3D shape */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-full flex justify-center items-center order-1 md:order-2 relative z-10">
              <PhilosophyShape type={step.id} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
