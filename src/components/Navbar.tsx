"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import GlassSurface from "./GlassSurface";

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
    <nav
      className="fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
      style={{
        top: scrolled ? 30 : 62,
        width: scrolled ? 780 : 1140,
        maxWidth: scrolled ? "90vw" : "92vw",
        height: scrolled ? 50 : 66,
      }}
    >
      <GlassSurface
        width="100%"
        height="100%"
        borderRadius={45}
        displace={0.5}
        distortionScale={-180}
        redOffset={0}
        greenOffset={10}
        blueOffset={20}
        brightness={50}
        opacity={0.93}
        mixBlendMode="screen"
        className="flex items-center justify-between w-full h-full"
      >
        {/* inner container with proper padding for logo and CTA spacing */}
        <div
          className="flex items-center justify-between w-full h-full"
          style={{
            paddingLeft: scrolled ? "24px" : "32px",
            paddingRight: scrolled ? "24px" : "32px",
            transition: "padding 0.5s ease-[cubic-bezier(0.76,0,0.24,1)]",
          }}
        >
          {/* Logo */}
          <span
            className={` relative z-10  font-garamond font-bold italic text-white uppercase tracking-[-0.4px] transition-all duration-500 whitespace-nowrap shrink-0 ${
              scrolled ? "text-[16px]" : "text-[20px]"
            }`}
          >
            KUROJIN.
          </span>

          {/* Nav Links */}
          <div
            className={`flex items-center justify-center flex-1 transition-all duration-500 ${
              scrolled ? "gap-6" : "gap-16"
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`font-garamond text-white tracking-[-0.32px] hover:opacity-80 transition-all whitespace-nowrap ${
                  scrolled ? "text-[14px]" : "text-[16px]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <button
            className={`relative z-10 bg-white text-black rounded-[55px] font-montserrat font-extrabold italic uppercase overflow-hidden group cursor-pointer shrink-0 transition-all duration-500 hover:bg-gradient-to-r hover:from-[#00ff91] hover:to-[#00fee0] hover:text-black hover:shadow-[0_0_30px_rgba(0,255,145,0.8),0_0_60px_rgba(0,254,224,0.5)] ${
              scrolled
                ? "h-[28px] px-9 text-[12px] tracking-[0.5px]"
                : "h-[32px] px-10 text-[14px] tracking-[0.8px] "
            }`}
          >
            <span className="flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
              LET&apos;S TALK
            </span>

            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">
              LET&apos;S GO
            </span>
          </button>
        </div>
      </GlassSurface>
    </nav>
  );
}
