"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Exact position for the inner dot
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Spring-physics position for the lagging outer ring
  const ringX = useSpring(-100, { stiffness: 300, damping: 20 });
  const ringY = useSpring(-100, { stiffness: 300, damping: 20 });

  useEffect(() => {
    // Don't render custom cursor on touch devices
    if (typeof window !== "undefined" && "ontouchstart" in window) return;

    const moveCursor = (e: MouseEvent) => {
      // Update positions
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      // Smart hover check: Check the element directly under the mouse
      const target = e.target as HTMLElement;
      // Check for links, buttons, or anything explicitly marked with data-cursor-hover
      const isInteractive = !!target.closest("a, button, [data-cursor-hover]");
      setIsHovering(isInteractive);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [dotX, dotY, ringX, ringY]);

  return (
    <>
      {/* Inner Dot - Pinpoint accuracy */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference rounded-full bg-white"
        style={{
          x: dotX,
          y: dotY,
          width: 8,
          height: 8,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible && !isHovering ? 1 : 0, // Hide dot when hovering interactive elements
        }}
      />

      {/* Outer Ring - Fluid motion & Hover feedback */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference rounded-full bg-transparent border-2 border-white"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
          width: isHovering ? 64 : 40,
          height: isHovering ? 64 : 40,
          backgroundColor: isHovering ? "rgba(255, 255, 255, 0.15)" : "transparent", // Slight fill on hover
        }}
        // Smooth transition for the scale/fill effect
        transition={{ 
          width: { type: "spring", stiffness: 300, damping: 20 }, 
          height: { type: "spring", stiffness: 300, damping: 20 }, 
          backgroundColor: { duration: 0.2 } 
        }}
      />
    </>
  );
}