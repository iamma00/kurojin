"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Cinematic preloader — CodeGrid "landing page reveal" pattern:
 * circular SVG progress ring fills → overlay wipe-exposes a decorative
 * interface-text backdrop → backdrop wipes away, page is handed over.
 * Renders as a fixed overlay; the page stays mounted underneath.
 */

const RING_R = 54;
const RING_C = 2 * Math.PI * RING_R;

const backdropRows = [
  ["SCENE 01", "RENDER: OK", "黒人", "GRID 12-COL", "TYPE: GARAMOND"],
  ["LAT 19.0760", "LON 72.8777", "EST. 2024", "MOTION: GSAP", "SCROLL: LENIS"],
];

export default function IntroLoader({ done }: { done: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const exitedRef = useRef(false);

  // Phase A — progress ring + counter
  useEffect(() => {
    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      gsap.to(counter, {
        v: 100,
        duration: 2.1,
        ease: "power2.inOut",
        onUpdate: () => {
          const v = Math.round(counter.v);
          if (countRef.current) countRef.current.textContent = `${v}`;
          if (ringRef.current)
            ringRef.current.style.strokeDashoffset = String(
              RING_C * (1 - counter.v / 100)
            );
        },
      });

      gsap.fromTo(
        wordRef.current,
        { opacity: 0, y: 24, filter: "blur(12px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Phase B — wipe exit once the page says it's ready
  useEffect(() => {
    if (!done || exitedRef.current || !containerRef.current) return;
    exitedRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) containerRef.current.style.display = "none";
      },
    });

    // front panel wipes away to the left like a scan
    tl.to(frontRef.current, {
      clipPath: "inset(0 100% 0 0)",
      duration: 0.85,
      ease: "power4.inOut",
    });

    // decorative backdrop text arrives as the wipe passes
    tl.fromTo(
      "[data-backdrop-cell]",
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.03, ease: "power2.out" },
      0.1
    );

    // hold the backdrop for a beat, then wipe it upward
    tl.to(backdropRef.current, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.65,
      ease: "power4.inOut",
    }, 0.95);
  }, [done]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100]"
      aria-hidden="true"
    >
      {/* ── Backdrop layer: decorative interface text ── */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-[#030303] flex flex-col justify-between p-8 md:p-12"
        style={{ clipPath: "inset(0 0 0% 0)" }}
      >
        {backdropRows.map((row, ri) => (
          <div
            key={ri}
            className={`flex justify-between gap-4 font-montserrat text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/25 ${
              ri === 1 ? "items-end" : ""
            }`}
          >
            {row.map((cell, ci) => (
              <span key={ci} data-backdrop-cell className="whitespace-nowrap">
                {cell}
              </span>
            ))}
          </div>
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            data-backdrop-cell
            className="font-garamond italic text-white/8 text-[22vw] leading-none select-none"
          >
            黒人
          </span>
        </div>
      </div>

      {/* ── Front panel: the preloader itself ── */}
      <div
        ref={frontRef}
        className="absolute inset-0 bg-[#050505] flex flex-col items-center justify-center"
        style={{ clipPath: "inset(0 0% 0 0)" }}
      >
        <div ref={wordRef} className="relative flex flex-col items-center">
          <p className="font-montserrat text-white/50 text-[11px] md:text-xs tracking-[0.4em] uppercase mb-8">
            Kurojin — Studio
          </p>

          {/* progress ring */}
          <div className="relative w-[150px] h-[150px] md:w-[180px] md:h-[180px]">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
              <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff3c00" />
                  <stop offset="100%" stopColor="#ff8c2b" />
                </linearGradient>
              </defs>
              <circle
                cx="60" cy="60" r={RING_R}
                fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5"
              />
              <circle
                ref={ringRef}
                cx="60" cy="60" r={RING_R}
                fill="none" stroke="url(#ringGrad)" strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={RING_C}
                strokeDashoffset={RING_C}
                style={{ filter: "drop-shadow(0 0 6px rgba(255,60,0,0.5))" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-garamond font-bold italic text-white text-4xl md:text-5xl leading-none">
                <span ref={countRef}>0</span>
              </span>
              <span className="font-montserrat text-white/40 text-[10px] tracking-[0.3em] mt-1">
                LOADING
              </span>
            </div>
          </div>

          <p className="font-montserrat text-white/30 text-[10px] tracking-[0.35em] uppercase mt-8">
            Ordinary isn&apos;t in our vocabulary
          </p>
        </div>

        {/* corner ticks */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-white/10" />
        <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-white/10" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-white/10" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-white/10" />
      </div>
    </div>
  );
}
