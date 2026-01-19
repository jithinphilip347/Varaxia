"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const initialWorks = [
  {
    title: "EcoBottle Rebrand",
    category: "Branding",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Abstract Art",
    category: "Art Direction",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "NewMe Magazine",
    category: "Editorial",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Botanical 3D",
    category: "3D Design",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Mobile App Sol",
    category: "App Design",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Neon Cyberpunk",
    category: "Digital Art",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop",
  },
];

const moreWorks = [
  {
    title: "Modern Architecture",
    category: "Photography",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Fashion Editorial",
    category: "Photography",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Tech Dashboard",
    category: "UI Design",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
  },
];

export default function WorkList() {
  const containerRef = useRef(null);
  const [visibleWorks, setVisibleWorks] = useState(initialWorks);
  const [hasMore, setHasMore] = useState(true);

  // Load More Function
  const loadMore = () => {
    setVisibleWorks([...visibleWorks, ...moreWorks]);
    setHasMore(false); // For demo, just one load
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Text Animation
      gsap.from(".work-hero-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Work Items Animation
      gsap.from(".work-grid-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".work-grid",
          start: "top 85%",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []); // Re-run if list changes? No, just initial load. Dynamic items handled by React/CSS or separate trigger if needed.

  return (
    <main ref={containerRef} className="bg-[#0e0e0e] text-white min-h-screen">
      <Header />

      {/* 1. Header Section */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-20 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <h1 className="text-[13vw] md:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] mb-8">
            <span className="work-hero-text block">SELECTED</span>
            <span className="work-hero-text block text-neutral-600">
              WORKS &
            </span>
            <span className="work-hero-text block">PROJECTS</span>
          </h1>
          <p className="work-hero-text text-sm md:text-lg text-neutral-400 leading-relaxed max-w-xl">
            A curated selection of our finest work, showcasing our expertise in
            digital design, branding, and immersive experiences.
          </p>
        </div>
      </section>

      {/* 2. Work Grid */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto pb-24 md:pb-32">
        <div className="work-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-y-20 mb-20">
          {visibleWorks.map((work, i) => (
            <div
              key={i}
              className="work-grid-item group cursor-pointer flex flex-col gap-4"
              data-cursor-text="View More"
            >
              {/* Image Container */}
              <div className="w-full aspect-[4/5] bg-neutral-900 overflow-hidden relative">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-bold uppercase tracking-tight text-white group-hover:text-neutral-400 transition-colors">
                  {work.title}
                </h3>
                <div className="flex justify-between items-center border-t border-white/10 pt-3 mt-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                    {work.category}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-white">
                    {work.year}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center">
            <button
              onClick={loadMore}
              className="group bg-white text-black px-10 py-5 !rounded-none font-black uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center gap-3 shadow-none text-sm md:text-base"
            >
              Load More Works
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
