'use client';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

const initialBlogs = [
  { 
    img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop", 
    date: "JUNE 12, 2024", 
    title: "BUSINESS GROWTH STRATEGIES" 
  },
  { 
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop", 
    date: "JUNE 12, 2024", 
    title: "ENTREPRENEURIAL JOURNEYS" 
  },
  { 
    img: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=800&auto=format&fit=crop", 
    date: "MAY 28, 2024", 
    title: "DIGITAL INNOVATION TRENDS" 
  },
  { 
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop", 
    date: "MAY 15, 2024", 
    title: "THE FUTURE OF AI DESIGN" 
  },
  { 
    img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop", 
    date: "APRIL 10, 2024", 
    title: "MINIMALISM IN 2024" 
  },
  { 
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop", 
    date: "MARCH 22, 2024", 
    title: "AGENCY CULTURAL SHIFTS" 
  }
];

const moreBlogs = [
    { 
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop", 
      date: "FEB 18, 2024", 
      title: "CREATIVE LEADERSHIP" 
    },
    { 
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop", 
      date: "JAN 30, 2024", 
      title: "REMOTE WORK DYNAMICS" 
    },
    { 
      img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop", 
      date: "JAN 12, 2024", 
      title: "SUSTAINABLE TECH" 
    }
  ];

export default function BlogList() {
  const containerRef = useRef(null);
  const [visibleBlogs, setVisibleBlogs] = useState(initialBlogs);
  const [hasMore, setHasMore] = useState(true);

  // Load More Function
  const loadMore = () => {
    setVisibleBlogs([...visibleBlogs, ...moreBlogs]);
    setHasMore(false); // For demo, just one load
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
        // Hero Text Animation
        gsap.from('.blog-hero-text', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out'
        });

        // Parallax Image
        gsap.to('.blog-parallax-img', {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: '.blog-parallax-container',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

        // Blog Items Animation (New ones also animate in automatically due to React re-render + GSAP handling might need tween but simple fade in via CSS is easier for dynamic lists, or we stagger here initially)
        gsap.from('.blog-grid-item', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.blog-grid',
                start: 'top 80%'
            }
        });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-[#0e0e0e] text-white min-h-screen">
      <Header />
      
      {/* 1. Header Section */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-20 px-6 md:px-10 max-w-7xl mx-auto">
         <div className="max-w-3xl">
            <h1 className="text-[13vw] md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
               <span className="blog-hero-text block">BLOG</span>
               <span className="blog-hero-text block text-neutral-600">INSIGHT THE</span>
               <span className="blog-hero-text block">VARAXIA</span>
            </h1>
            <p className="blog-hero-text text-sm md:text-lg text-neutral-400 leading-relaxed max-w-xl">
               We lead by the design philosophy that every deal only visually represents our commitment to innovation and storytelling.
            </p>
         </div>
      </section>

      {/* 2. Full Width Parallax Image */}
      <section className="blog-parallax-container w-full h-[30vh] md:h-[50vh] relative overflow-hidden mb-16 md:mb-24">
         <div className="absolute inset-0 w-full h-[120%] -top-[10%]">
             <Image 
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2000&auto=format&fit=crop" // Wide office/abstract shot
                alt="Blog Feature"
                fill
                className="blog-parallax-img object-cover opacity-80"
             />
         </div>
         {/* Overlay Gradient */}
         <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] to-transparent"></div>
      </section>

      {/* 3. Blog List Grid */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto pb-24 md:pb-32">
         {/* Grid: 1 col (mobile), 2 col (tablet), 3 col (desktop) */}
         <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16 mb-16 md:mb-20">
            {visibleBlogs.map((blog, i) => (
                <Link href={`/blog/${blog.title.toLowerCase().replace(/ /g, '-')}`} key={i} className="blog-grid-item group cursor-pointer">
                   {/* Image */}
                   <div className="w-full aspect-square bg-[#1a1a1a] mb-6 overflow-hidden relative border border-white/5">
                      <Image 
                        src={blog.img}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* Date Badge */}
                      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-white/10">
                         {blog.date}
                      </div>
                   </div>
                   
                   {/* Content */}
                   <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-tight group-hover:text-neutral-400 transition-colors mb-2">
                      {blog.title}
                   </h3>
                   <div className="w-full h-[1px] bg-white/10 mt-6 group-hover:w-full group-hover:bg-[#d0fd3e] transition-all duration-500"></div>
                </Link>
            ))}
         </div>

         {/* Load More Button */}
         {hasMore && (
             <div className="flex justify-center">
                <button 
                    onClick={loadMore}
                    className="group bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-[#d0fd3e] transition-colors flex items-center gap-2"
                >
                    Load More Articles
                    <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </button>
             </div>
         )}
      </section>

      <Footer />
    </main>
  );
}
