"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = 0;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          // Shrink when scrolling down past 80px, expand when near top or scrolling up
          if (y > 80 && y > lastY) {
            setScrolled(true);
          } else if (y < lastY || y <= 80) {
            setScrolled(false);
          }
          lastY = y;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* SVG filter for liquid glass distortion */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="liquid-glass">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves="3"
              seed="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="6"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <nav
        className="fixed left-1/2 -translate-x-1/2 z-50 rounded-[45px] flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] overflow-hidden"
        style={{
          top: scrolled ? 30 : 62,
          width: scrolled ? 780 : 1140,
          maxWidth: scrolled ? "90vw" : "92vw",
          height: scrolled ? 50 : 66,
          paddingLeft: scrolled ? 12 : 42,
          paddingRight: scrolled ? 10 : 22,
          gap: scrolled ? 24 : 32,
        }}
      >
        {/* Liquid glass background layers */}
        <div className="absolute inset-0 rounded-[45px] overflow-hidden pointer-events-none">
          {/* Base blur layer */}
          <div
            className="absolute inset-0 backdrop-blur-2xl"
            style={{ filter: "url(#liquid-glass)" }}
          />
          {/* Tinted overlay */}
          <div className="absolute inset-0 bg-white/[0.04]" />
          {/* Specular highlight - top edge */}
          <div className="absolute inset-x-0 top-0 h-[50%] bg-gradient-to-b from-white/[0.12] to-transparent" />
          {/* Inner glow ring */}
          <div className="absolute inset-[1px] rounded-[44px] border border-white/[0.1]" />
          {/* Subtle color refraction */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.03] via-transparent to-purple-500/[0.03]" />
        </div>

        {/* Outer border + shadow */}
        <div className="absolute inset-0 rounded-[45px] border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] pointer-events-none" />

        {/* Logo */}
        <span
          className={`relative z-10 font-garamond font-bold italic text-white uppercase tracking-[-0.4px] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] whitespace-nowrap ${
            scrolled ? "text-[16px]" : "text-[20px]"
          }`}
        >
          Kurojin.
        </span>

        {/* Nav Links */}
        <div
          className={`relative z-10 flex items-center transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] overflow-hidden ${
            scrolled
              ? "gap-6 opacity-100 max-w-[400px]"
              : "gap-20 opacity-100 max-w-[700px]"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`font-garamond text-white tracking-[-0.32px] hover:opacity-80 transition-all duration-500 whitespace-nowrap ${
                scrolled ? "text-[14px]" : "text-[16px]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <button
          className={`relative z-10 bg-white text-bg rounded-[55px] font-montserrat font-extrabold italic uppercase overflow-hidden group cursor-pointer shrink-0 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hover:bg-gradient-to-r hover:from-[#00ff91] hover:to-[#00fee0] hover:text-black ${
            scrolled ? "h-[28px] px-4 text-[12px]" : "h-[32px] px-5 text-[14px]"
          }`}
        >
          <span className="block transition-transform duration-300 group-hover:-translate-y-full">
            LET&apos;s TALK
          </span>
          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">
            LET&apos;S GO
          </span>
        </button>
      </nav>
    </>
  );
}
