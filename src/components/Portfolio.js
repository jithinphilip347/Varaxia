"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "EcoBottle Rebrand",
    image:
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
    tags: ["Branding", "2025"],
    aspect: "aspect-[4/5]",
  },
  {
    title: "Abstract Art",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
    tags: ["Art Direction", "2024"],
    aspect: "aspect-square",
  },
  {
    title: "NewMe Magazine",
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2000&auto=format&fit=crop", // Reliable Editorial Image
    tags: ["Editorial", "2025"],
    aspect: "aspect-[21/9]",
  },
  {
    title: "Botanical 3D",
    image:
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2000&auto=format&fit=crop", // Reliable Abstract 3D
    tags: ["3D Design", "2025"],
    aspect: "aspect-square",
  },
  {
    title: "Mobile App Sol",
    image:
      "https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=2000&auto=format&fit=crop",
    tags: ["App Design", "2025"],
    aspect: "aspect-[3/5]",
  },
];

const WorkCard = ({ project, className }) => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    const container = containerRef.current;

    // Parallax Effect: Move image vertically within container
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.fromTo(
      img,
      { y: "-15%", scale: 1.2 },
      { y: "15%", scale: 1.2, ease: "none" },
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className={`group flex flex-col gap-6 ${className}`}>
      {/* Image Container */}
      <div
        ref={containerRef}
        className={`relative w-full overflow-hidden bg-neutral-900 ${project.aspect}`}
      >
        <Image
          ref={imgRef}
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xl md:text-2xl font-bold text-white">
          Crafting Digital Experiences
        </h3>
        <div className="flex gap-2">
          <span className="px-4 py-1.5 rounded-full border border-white/20 text-xs md:text-sm text-zinc-400 uppercase tracking-wide bg-white/5">
            UI/UX Design
          </span>
          <span className="px-4 py-1.5 rounded-full border border-white/20 text-xs md:text-sm text-zinc-400 uppercase tracking-wide bg-white/5">
            2025
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="py-24 px-6 md:px-16 bg-[#0e0e0e] text-white overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center md:items-center justify-between mb-24 gap-6 md:gap-14">
        {/* Big Title */}
        <h2 className="text-[15vw] md:text-[10rem] font-black leading-none tracking-tighter uppercase text-center md:text-left">
          Work
        </h2>

        {/* Horizontal Line (Hidden on mobile, visible/grow on desktop) */}
        <div className="hidden md:block h-[2px] bg-white text-white flex-1 mt-6"></div>

        {/* Description & Tags */}
        <div className="flex flex-col gap-8 max-w-sm w-full md:w-auto self-start md:self-center">
          <p className="text-zinc-400 text-sm leading-relaxed text-left">
            We pride ourselves on delivering innovative, impactful, and
            results-driven projects that exceed expectations.
          </p>
          <div className="flex gap-4">
            {["Dribbble", "Behance", "GitHub"].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-neutral-900 border border-zinc-800 rounded-full text-xs font-bold uppercase tracking-wider text-zinc-400 cursor-pointer hover:bg-white hover:text-black transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Works Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 mb-24">
        {/* 1. Left Vertical-ish */}
        <WorkCard project={projects[0]} />

        {/* 2. Right Square (Offset Top) */}
        <WorkCard project={projects[1]} className="md:pt-20" />

        {/* 3. Full Width */}
        <div className="md:col-span-2">
          <WorkCard project={projects[2]} />
        </div>

        {/* 4. Left Square */}
        <WorkCard project={projects[3]} />

        {/* 5. Right Tall */}
        <WorkCard project={projects[4]} />
      </div>

      {/* View All Button */}
      <div className="flex justify-center">
        <button className="group flex items-center gap-3 bg-white text-black px-8 py-4 !rounded-none font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors shadow-none">
          View All Work
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}
