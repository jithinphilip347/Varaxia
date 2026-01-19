'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, User, Calendar, Tag, Quote, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

// Mock Data for a single post (In a real app, fetch based on params.slug)
const blogPost = {
  title: "BUSINESS GROWTH STRATEGIES",
  category: "Business, Improvements",
  author: "Admin",
  date: "JUNE 12, 2024",
  content: [
    "However, putting up a personal portfolio is no easy feat. In search of inspiration, you can find yourself scrolling through hundreds of personal portfolios and still not know where to start.",
    "Responsive and interactive design with muted colors so as not to distract. Good use of whitespace and neat typography. The case studies layout is distinctively clear and has a valid value."
  ],
  quote: "COMFORTABLE FULL LEATHER LINING EYE-CATCHING UNIQUE DETAIL TO THE TOE LOW 'CUT-AWAY' SIDES CLEAN AND SLEEK HARMONY.",
  quoteAuthor: "Alonza Lewin",
  subHeadings: [
    {
      title: "RESEARCH & STRATEGY",
      text: "We love to bring designs to life as a developer, and I aim to do this using whatever front-end tools necessary. My preferred tools are more modern javascript libraries like React.js but I use whatever is best for the website. I have vast experience in working with react hooks and functional components."
    },
    {
      title: "WORKFLOW",
      text: "Always ready to push the boundaries, especially when it comes to our own platform, Our analytical eye creates a site that was visual engaging and also optimized for maximum performance. It also perfectly reflects the journey to help it tell a story to increase its understanding and drive action."
    }
  ],
  lists: [
     "Brand Development",
     "UX/UI Design",
     "Frontend Development",
     "Copywriting",
     "Shopify Development"
  ]
};

const relatedBlogs = [
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
    }
];

export default function BlogDetails({ params }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
        // Hero Parallax
        gsap.to('.blog-hero-img', {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: '.blog-hero-container',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

        // Content Fade In
        gsap.from('.blog-content > *', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.blog-content',
                start: 'top 80%'
            }
        });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-[#0e0e0e] text-white min-h-screen">
      <Header />
      
      {/* 1. Header / Title Section */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 px-6 md:px-10 max-w-5xl mx-auto text-center md:text-left">
         <div className="flex flex-col gap-6">
             <h1 className="text-3xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-4 break-words">
                 {blogPost.title}
             </h1>
             
             {/* Meta Data */}
             <div className="flex flex-col md:flex-row flex-wrap items-center justify-center md:justify-start gap-6 md:gap-12 text-xs md:text-sm font-bold uppercase tracking-widest text-neutral-400 border-t border-b border-white/10 py-6 md:py-6">
                 <div className="flex flex-col gap-1 items-center md:items-start">
                     <span className="text-neutral-600">Categories</span>
                     <span className="text-white">{blogPost.category}</span>
                 </div>
                 <div className="flex flex-col gap-1 items-center md:items-start">
                     <span className="text-neutral-600">Author</span>
                     <span className="text-white">{blogPost.author}</span>
                 </div>
                 <div className="flex flex-col gap-1 items-center md:items-end md:ml-auto">
                     <span className="text-neutral-600">Date</span>
                     <span className="text-white">{blogPost.date}</span>
                 </div>
             </div>
         </div>
      </section>

      {/* 2. Hero Image Parallax */}
      <section className="blog-hero-container w-full h-[30vh] md:h-[70vh] relative overflow-hidden mb-16 md:mb-20">
         <Image 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop" // Team/Meeting image
            alt="Blog Featured"
            fill
            className="blog-hero-img object-cover"
         />
      </section>

      {/* 3. Article Content */}
      <article className="blog-content px-6 md:px-10 max-w-4xl mx-auto mb-24">
          
          {/* Intro Text */}
          <div className="text-neutral-300 text-base md:text-lg leading-relaxed space-y-6 mb-16 font-medium">
             <p>{blogPost.content[0]}</p>
             <p>{blogPost.content[1]}</p>
          </div>

          {/* Quote Block */}
          <div className="bg-white text-black p-6 md:p-12 mb-12 md:mb-16 relative">
              <Quote className="text-neutral-300 w-10 h-10 md:w-16 md:h-16 mb-6 opacity-30" />
              <h3 className="text-lg md:text-2xl font-black uppercase tracking-tight leading-tight mb-6">
                  "{blogPost.quote}"
              </h3>
              <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-black/20"></div>
                  <span className="text-xs font-bold uppercase tracking-widest">{blogPost.quoteAuthor}</span>
              </div>
          </div>

          {/* Secondary Image */}
          <div className="w-full aspect-[16/9] relative mb-16 overflow-hidden">
              <Image 
                 src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2000&auto=format&fit=crop"
                 alt="Workspace"
                 fill
                 className="object-cover hover:scale-105 transition-transform duration-700"
              />
          </div>

          {/* Subheadings & Text */}
          <div className="space-y-12 mb-16">
             {blogPost.subHeadings.map((section, i) => (
                 <div key={i}>
                     <h2 className="text-2xl font-black uppercase tracking-tighter mb-4">{section.title}</h2>
                     <p className="text-neutral-400 leading-relaxed font-medium">
                        {section.text}
                     </p>
                 </div>
             ))}
          </div>

          {/* List/Tags */}
          <div className="mb-16">
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6">Key Areas</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {blogPost.lists.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-wide text-white">
                          <div className="w-1.5 h-1.5 bg-[#d0fd3e] rounded-full"></div>
                          {item}
                      </li>
                  ))}
              </ul>
          </div>
          
          <div className="w-full h-[1px] bg-white/10 my-16"></div>

          {/* Tags Footer */}
          <div className="flex gap-4 mb-20">
              <span className="text-neutral-500 text-sm">Tags:</span>
              {["Design", "Development", "Marketing"].map(tag => (
                  <span key={tag} className="text-white text-sm font-bold uppercase hover:text-[#d0fd3e] cursor-pointer transition-colors">
                      #{tag}
                  </span>
              ))}
          </div>

          {/* Leave a Reply Form */}
          <div className="mb-20">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-10">Leave a Reply</h2>
              <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Name</label>
                          <input type="text" className="w-full bg-transparent border-b border-white/20 py-4 focus:border-[#d0fd3e] outline-none transition-colors text-white text-lg" placeholder="Enter your name" />
                      </div>
                      <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Email</label>
                          <input type="email" className="w-full bg-transparent border-b border-white/20 py-4 focus:border-[#d0fd3e] outline-none transition-colors text-white text-lg" placeholder="Enter your email" />
                      </div>
                  </div>
                  <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Message</label>
                      <textarea rows="4" className="w-full bg-transparent border-b border-white/20 py-4 focus:border-[#d0fd3e] outline-none transition-colors text-white text-lg resize-none" placeholder="Write your comment..."></textarea>
                  </div>
                  <button type="button" className="bg-[#d0fd3e] text-black px-10 py-4 font-black uppercase tracking-widest hover:bg-white transition-colors">
                      Post Comment
                  </button>
              </form>
          </div>

      </article>

      {/* 4. Related Articles */}
      <section className="px-6 md:px-10 py-20 bg-[#111] max-w-[100vw] overflow-hidden">
          <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-12">Related Articles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {relatedBlogs.map((blog, i) => (
                    <div key={i} className="blog-grid-item group cursor-pointer">
                       {/* Image */}
                       <div className="w-full aspect-square bg-[#1a1a1a] mb-6 overflow-hidden relative border border-white/5">
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
                       
                       {/* Content */}
                       <h3 className="text-lg font-black uppercase tracking-tight leading-tight group-hover:text-neutral-400 transition-colors mb-2">
                          {blog.title}
                       </h3>
                    </div>
                ))}
              </div>
          </div>
      </section>

      <Footer />
    </main>
  );
}
