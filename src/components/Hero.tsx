"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "@/components/Magnetic";

gsap.registerPlugin(ScrollTrigger);

const glowShadow =
  "0px 0px 25px rgba(255,189,136,0.37), -0.8px 0.8px 2.8px rgba(255,0,4,0.5), 0.8px -1.7px 1.7px rgba(0,178,255,0.53)";

const tickerItems = [
  "Brand Identity", "Web Experiences", "2D Design", "3D Content",
  "Motion Graphics", "Product Shoots", "Social Media", "Campaign Direction",
];

/**
 * Hero — KINETIC POSTER.
 * Oversized editorial type (huncwot wide-text doctrine) + line-mask entrance
 * + mouse-parallax collage + rotating badge + services ticker.
 * Scroll choreography: type skews & recedes, collage outruns it, overlay dims.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      /* ── entrance: line-mask reveals, staggered ── */
      gsap.fromTo(
        "[data-hero-line]",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.25,
          ease: "power4.out",
          stagger: 0.12,
          delay: 0.35,
        }
      );
      gsap.fromTo(
        "[data-hero-fade]",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1, delay: 0.9 }
      );

      if (reduced) return;

      /* ── scroll choreography — one scrubbed timeline ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      // giant type recedes: drift up + skew + slight shrink
      tl.to(typeRef.current, { yPercent: -22, skewY: -2.5, scale: 0.94, ease: "none" }, 0);
      // sub block lifts away faster
      tl.to(subRef.current, { yPercent: -60, opacity: 0, ease: "none" }, 0);
      // dim handoff
      tl.to(overlayRef.current, { opacity: 1, ease: "none" }, 0.2);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-[640px] overflow-hidden"
    >
      {/* ══ corner meta — mono micro-labels ══ */}
      <div data-hero-fade className="absolute top-[88px] left-4 md:left-[4%] z-30 font-montserrat text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-white/50">
        Est. 2024 — 黒人
      </div>
      <div data-hero-fade className="absolute top-[88px] right-4 md:right-[4%] z-30 font-montserrat text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-white/50 text-right">
        Full-spectrum
        <br className="hidden md:block" /> creative studio
      </div>

      {/* ══ giant type block ══ */}
      <div
        ref={typeRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4"
      >
        <div className="overflow-hidden">
          <h1
            data-hero-line
            className="font-garamond font-bold uppercase leading-[0.85] tracking-[-0.03em] text-white text-center"
            style={{ fontSize: "clamp(72px, 17vw, 250px)", textShadow: glowShadow }}
          >
            Kurojin
          </h1>
        </div>
        <div className="overflow-hidden">
          <div
            data-hero-line
            className="font-garamond italic uppercase leading-[0.9] tracking-[-0.02em] text-center text-transparent"
            style={{
              fontSize: "clamp(40px, 9vw, 130px)",
              WebkitTextStroke: "1.5px rgba(255,255,255,0.85)",
            }}
          >
            Studio<span className="align-super text-[0.3em] tracking-normal">®</span>
          </div>
        </div>

        {/* rotating badge — awwwards classic */}
        <div data-hero-fade className="relative mt-6 md:mt-8 w-[92px] h-[92px] md:w-[116px] md:h-[116px]">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_14s_linear_infinite]">
            <defs>
              <path id="hero-badge-circle" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
            </defs>
            <text className="fill-white/70 font-montserrat uppercase" style={{ fontSize: "8.2px", letterSpacing: "0.22em" }}>
              <textPath href="#hero-badge-circle">
                ordinary isn&apos;t in our vocabulary •
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/80 text-lg md:text-xl">✦</span>
          </div>
        </div>
      </div>

      {/* ══ sub block: tagline + CTAs ══ */}
      <div
        ref={subRef}
        className="absolute bottom-[16%] md:bottom-[15%] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-5 px-4 text-center w-full"
      >
        <p
          data-hero-fade
          className="text-white/85 font-garamond text-[16px] md:text-[20px] font-light max-w-[440px] leading-snug"
          style={{ textShadow: "0px 4px 4px rgba(0,0,0,0.25), 0px 0px 12px #ffe0c8" }}
        >
          A full-spectrum creative partner for modern brands —
          identity, web, 2D, 3D &amp; motion under one roof.
        </p>
        <div data-hero-fade className="flex items-center gap-4">
          <Magnetic strength={0.3}>
            <Link
              href="/work"
              data-cursor="VIEW"
              className="cta-button h-[46px] px-9 text-[13px] md:h-[50px] md:px-11 md:text-[14px]"
            >
              See Our Work
            </Link>
          </Magnetic>
          <Magnetic strength={0.3}>
            <Link
              href="/contact"
              data-cursor="TALK"
              className="h-[46px] px-9 md:h-[50px] md:px-11 inline-flex items-center justify-center rounded-[55px] border border-white/25 text-white font-montserrat font-bold italic uppercase text-[13px] md:text-[14px] tracking-[0.05em] transition-all duration-300 hover:bg-white/10 hover:border-white/50"
            >
              Start a Project
            </Link>
          </Magnetic>
        </div>
      </div>

      {/* ══ services ticker — bottom strip ══ */}
      <div data-hero-fade className="absolute bottom-0 left-0 right-0 z-30 border-t border-white/12 bg-black/40 backdrop-blur-sm overflow-hidden">
        <div className="flex w-max animate-marquee py-3">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-6 pr-6 font-montserrat text-[11px] md:text-[12px] uppercase tracking-[0.3em] text-white/60 whitespace-nowrap"
            >
              {item} <span className="text-white/30">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* dim overlay — scroll handoff */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-40 bg-black pointer-events-none opacity-0"
      />
    </section>
  );
}
