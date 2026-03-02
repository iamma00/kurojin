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
    <nav
      className="fixed left-1/2 -translate-x-1/2 z-50 rounded-[45px] bg-white/[0.04] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/[0.08] flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
      style={{
        top: scrolled ? 62 : 30,
        width: scrolled ? 1140 : 780,
        maxWidth: scrolled ? "92vw" : "90vw",
        height: scrolled ? 66 : 50,
        paddingLeft: scrolled ? 12 : 8,
        paddingRight: scrolled ? 12 : 8,
        gap: scrolled ? 32 : 24,
      }}
    >
      {/* Logo */}
      <span
        className={`font-garamond font-bold italic text-white uppercase tracking-[-0.4px] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] whitespace-nowrap ${
          scrolled ? "text-[20px]" : "text-[16px]"
        }`}
      >
        Kurojin.
      </span>

      {/* Nav Links */}
      <div
        className={`flex items-center transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] overflow-hidden ${
          scrolled
            ? "gap-12 opacity-100 max-w-[600px]"
            : "gap-6 opacity-100 max-w-[400px]"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`font-garamond text-white tracking-[-0.32px] hover:opacity-80 transition-all duration-500 whitespace-nowrap ${
              scrolled ? "text-[16px]" : "text-[14px]"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* CTA Button */}
      <button
        className={`bg-white text-bg rounded-[55px] font-montserrat font-extrabold italic uppercase overflow-hidden relative group cursor-pointer shrink-0 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hover:bg-[#00c853] hover:text-white ${
          scrolled ? "h-[32px] px-5 text-[14px]" : "h-[28px] px-4 text-[12px]"
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
  );
}
