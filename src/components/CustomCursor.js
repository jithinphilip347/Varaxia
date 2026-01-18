'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursor = useRef(null);
  const follower = useRef(null);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';

    // QuickTo for high performance
    const xTo = gsap.quickTo(cursor.current, "x", {duration: 0.1, ease: "power3", overwrite: "auto"});
    const yTo = gsap.quickTo(cursor.current, "y", {duration: 0.1, ease: "power3", overwrite: "auto"});
    
    // Follower - smoother lag
    const xToFollower = gsap.quickTo(follower.current, "x", {duration: 0.6, ease: "power3", overwrite: "auto"});
    const yToFollower = gsap.quickTo(follower.current, "y", {duration: 0.6, ease: "power3", overwrite: "auto"});

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.style.cursor = 'auto'; // Restore cursor on unmount
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
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9998] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}
