import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";

import Preloader from '@/components/Preloader';

export default function Home() {
  return (
    <main className="relative bg-[#0e0e0e] text-white overflow-x-hidden">
      <Preloader />
      {/* Header */}
      <Header />
      <Hero />
      <Portfolio />
      <About />
      <Services />
      <Testimonials />
      <Team />
      <Blog />
      <Footer />
    </main>
  );
}
