"use client";
import Image from "next/image";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

import Link from "next/link";

export default function Blog() {
  const blogs = [
    {
      img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop", // Abstract cells
      date: "JAN 12, 2026",
      title: "BUSINESS GROWTH STRATEGIES",
    },
    {
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop", // Woman w/ glasses
      date: "DEC 15, 2025",
      title: "ENTREPRENEURIAL JOURNEYS",
    },
  ];

  return (
    <section id="blog" className="py-24 px-6 md:px-10 bg-[#0e0e0e] text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 items-start">
        {/* Column 1: Title & Info */}
        <div className="flex flex-col pt-0 md:pt-10">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
            BLOG <br />
            INSIGHT THE <br />
            VARIXIA
          </h2>
          <p className="text-neutral-500 text-sm md:text-base leading-relaxed max-w-xs mb-10">
            We lead by the design philosophy that every deal only visually
          </p>

          <div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border-b border-white pb-1 hover:opacity-70 transition-opacity"
            >
              READ ALL POST <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Column 2 & 3: Blog Posts */}
        {blogs.map((blog, i) => (
          <Link
            href={`/blog/${blog.title.toLowerCase().replace(/ /g, "-")}`}
            key={i}
            className="group cursor-pointer"
          >
            {/* Image */}
            <div className="w-full aspect-square bg-[#1a1a1a] mb-6 overflow-hidden relative">
              <Image
                src={blog.img}
                alt={blog.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-white/10">
                {blog.date}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-tight group-hover:text-neutral-400 transition-colors">
              {blog.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
