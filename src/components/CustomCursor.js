"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursor = useRef(null);
  const follower = useRef(null);
  const cursorText = useRef(null);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none";

    // QuickTo for high performance
    const xTo = gsap.quickTo(cursor.current, "x", {
      duration: 0.1,
      ease: "power3",
      overwrite: "auto",
    });
    const yTo = gsap.quickTo(cursor.current, "y", {
      duration: 0.1,
      ease: "power3",
      overwrite: "auto",
    });

    // Follower - smoother lag
    const xToFollower = gsap.quickTo(follower.current, "x", {
      duration: 0.6,
      ease: "power3",
      overwrite: "auto",
    });
    const yToFollower = gsap.quickTo(follower.current, "y", {
      duration: 0.6,
      ease: "power3",
      overwrite: "auto",
    });

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest("[data-cursor-text]");
      if (target) {
        const text = target.getAttribute("data-cursor-text");
        cursorText.current.innerText = text.replace(" ", "\n");
        gsap.to(follower.current, {
          scale: 3,
          backgroundColor: "#ffffff",
          mixBlendMode: "normal",
        });
        gsap.to(cursor.current, { opacity: 0 }); // Hide small dot
        gsap.to(cursorText.current, { opacity: 1, color: "black" });
      } else {
        gsap.to(follower.current, {
          scale: 1,
          backgroundColor: "transparent",
          mixBlendMode: "difference",
        });
        gsap.to(cursor.current, { opacity: 1 });
        gsap.to(cursorText.current, { opacity: 0 });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.style.cursor = "auto"; // Restore cursor on unmount
    };
  }, []);

  return (
    <>
      <div
        ref={cursor}
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={follower}
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9998] mix-blend-difference -translate-x-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden transition-colors"
      >
        <div
          ref={cursorText}
          className="text-[4px] font-bold text-center uppercase leading-tight opacity-0 whitespace-pre-line"
        ></div>
      </div>
    </>
  );
}
