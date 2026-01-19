'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Mail, Phone, MapPin, Send, User, AtSign, Smartphone, MessageSquare } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer'; // Assuming you have a Footer, if not I will skip or create a basic one. 
// I'll assume Footer might not exist or I should just use the layout.
// Actually, I'll stick to the page content. The root layout provides the smooth scroll wrapper.

export default function Contact() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from('.contact-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
      .from('.contact-info-item', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      }, "-=0.5")
      .from('.contact-form', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, "-=0.5");
      // Map animation removed to prevent visibility issues
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-[#0e0e0e] text-white min-h-screen pt-24 md:pt-32 pb-10">
      <Header />
      
      {/* 1. Header Section */}
      <section className="px-6 md:px-10 mb-16 md:mb-32 text-center max-w-4xl mx-auto">
        <h1 className="contact-title text-3xl md:text-5xl lg:text-8xl font-black uppercase tracking-tighter mb-4 md:mb-6">
          Get <span className="text-neutral-700">In</span> Touch
        </h1>
        <p className="contact-title text-xs md:text-sm lg:text-lg text-neutral-400 max-w-xl md:max-w-2xl mx-auto leading-relaxed">
           Have a project in mind? Need help with branding, web design, or digital marketing? 
           Let's discuss how we can bring your ideas to life.
        </p>
      </section>

      {/* 2. Content Grid (Info + Form) */}
      <section className="px-6 md:px-10 mb-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">
        
        {/* Left: Contact Information */}
        <div className="flex flex-col gap-6 md:gap-10">
           {/* Email */}
           <div className="contact-info-item p-6 md:p-8 border border-white/10 bg-white/5 rounded-2xl md:rounded-[2rem] hover:bg-white/10 transition-colors group">
              <div className="flex items-center gap-4 md:gap-6 mb-4">
                 <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#d0fd3e] flex items-center justify-center text-black">
                    <Mail className="w-5 h-5 md:w-6 md:h-6" />
                 </div>
                 <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight">Email Us</h3>
              </div>
              <p className="text-neutral-400 pl-[3.5rem] md:pl-[4.5rem] text-sm md:text-base break-all group-hover:text-white transition-colors">
                 hello@varaxia.com <br/>
                 support@varaxia.com
              </p>
           </div>

           {/* Phone */}
           <div className="contact-info-item p-6 md:p-8 border border-white/10 bg-white/5 rounded-2xl md:rounded-[2rem] hover:bg-white/10 transition-colors group">
              <div className="flex items-center gap-4 md:gap-6 mb-4">
                 <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#d0fd3e] flex items-center justify-center text-black">
                    <Phone className="w-5 h-5 md:w-6 md:h-6" />
                 </div>
                 <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight">Call Us</h3>
              </div>
              <p className="text-neutral-400 pl-[3.5rem] md:pl-[4.5rem] text-sm md:text-base group-hover:text-white transition-colors">
                 +1 (555) 123-4567 <br/>
                 +1 (555) 987-6543
              </p>
           </div>
           
           {/* Address */}
           <div className="contact-info-item p-6 md:p-8 border border-white/10 bg-white/5 rounded-2xl md:rounded-[2rem] hover:bg-white/10 transition-colors group">
              <div className="flex items-center gap-4 md:gap-6 mb-4">
                 <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#d0fd3e] flex items-center justify-center text-black">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                 </div>
                 <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight">Visit Us</h3>
              </div>
              <p className="text-neutral-400 pl-[3.5rem] md:pl-[4.5rem] text-sm md:text-base group-hover:text-white transition-colors">
                 123 Creative Street, <br/>
                 Design District, California, USA
              </p>
           </div>
        </div>

        {/* Right: Form */}
        <div className="contact-form bg-[#1a1a1a] p-6 md:p-12 rounded-2xl md:rounded-[2rem] border border-white/5 shadow-2xl">
           <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-6 md:mb-8">Send a Message</h3>
           
           <form className="flex flex-col gap-5 md:gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Your Name</label>
                    <div className="relative">
                       <input type="text" placeholder="John Doe" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 md:px-5 py-3 md:py-4 focus:outline-none focus:border-[#d0fd3e] focus:bg-black/50 transition-all text-sm" />
                       <User className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Your Email</label>
                    <div className="relative">
                       <input type="email" placeholder="john@example.com" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 md:px-5 py-3 md:py-4 focus:outline-none focus:border-[#d0fd3e] focus:bg-black/50 transition-all text-sm" />
                       <AtSign className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Phone (Optional)</label>
                    <div className="relative">
                       <input type="tel" placeholder="+1 123 456 7890" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 md:px-5 py-3 md:py-4 focus:outline-none focus:border-[#d0fd3e] focus:bg-black/50 transition-all text-sm" />
                       <Smartphone className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Subject</label>
                    <div className="relative">
                       <select className="w-full bg-black/30 border border-white/10 rounded-xl px-4 md:px-5 py-3 md:py-4 focus:outline-none focus:border-[#d0fd3e] focus:bg-black/50 transition-all text-sm appearance-none text-neutral-300">
                          <option>Branding</option>
                          <option>Web Design</option>
                          <option>Development</option>
                          <option>Marketing</option>
                          <option>Other</option>
                       </select>
                    </div>
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Message</label>
                 <div className="relative">
                    <textarea rows="4" placeholder="Tell us about your project..." className="w-full bg-black/30 border border-white/10 rounded-xl px-4 md:px-5 py-3 md:py-4 focus:outline-none focus:border-[#d0fd3e] focus:bg-black/50 transition-all text-sm resize-none"></textarea>
                    <MessageSquare className="absolute right-4 top-4 w-4 h-4 text-neutral-600" />
                 </div>
              </div>

              <button type="button" className="group mt-2 bg-[#d0fd3e] hover:bg-white text-black font-black uppercase tracking-widest py-4 md:py-5 rounded-xl transition-all flex items-center justify-center gap-3 text-sm">
                 Submit Project
                 <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
           </form>
        </div>
      </section>

      {/* 3. Map Section */}
      <section className="w-full px-0 md:px-0 mb-[-1px]"> {/* mb-[-1px] to fix potential gap */}
         <div className="map-container w-full h-[300px] md:h-[500px] grayscale transition-all duration-700 hover:grayscale-0">
            <iframe 
               title="Google Map"
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968482413!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1626359960000!5m2!1sen!2sus" 
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen="" 
               loading="lazy"
               referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
         </div>
      </section>

      <Footer />
    </main>
  );
}
