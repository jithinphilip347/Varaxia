"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import localFont from "next/font/local";

gsap.registerPlugin(ScrollTrigger);

const logoFont = localFont({ src: "../assets/fonts/logo-font.otf" });

export default function Preloader() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    const letters = textRef.current.children;

    gsap.set(letters, { opacity: 1 });

    tl.to(letters, {
      opacity: 0,
      duration: 1.2,
      stagger: 0.35,
      ease: "power2.inOut",
    });

    const homeContent = containerRef.current.parentElement
      ? Array.from(containerRef.current.parentElement.children).filter(
          (child) => {
            if (child === containerRef.current) return false;
            const style = window.getComputedStyle(child);
            return style.position !== "fixed";
          },
        )
      : [];

    if (homeContent.length > 0) {
      gsap.set(homeContent, { opacity: 0, y: 50 });
    }

    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
          containerRef.current.style.display = "none";
        },
      },
      "-=0.5",
    );

    if (homeContent.length > 0) {
      tl.to(
        homeContent,
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          onComplete: () => {
            ScrollTrigger.refresh();
          },
          clearProps: "all",
        },
        "<",
      );
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#0e0e0e] flex items-center justify-center"
    >
      <div
        ref={textRef}
        className={`${logoFont.className} flex overflow-hidden`}
      >
        {"VARIXIA".split("").map((char, i) => (
          <span
            key={i}
            className="text-4xl md:text-6xl font-black text-white inline-block tracking-[0.5em] md:tracking-[0.8em]"
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
