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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;

          // Make sticky transition instant and trigger at a lower threshold
          if (y > 10) {
            setScrolled(true);
          } else {
            setScrolled(false);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Mobile navbar (< md) ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex md:hidden items-center justify-between px-5 transition-all duration-400"
        style={{
          height: scrolled ? 58 : 66,
          paddingTop: "max(env(safe-area-inset-top), 8px)",
          background: scrolled ? "rgba(1,1,1,0.76)" : "linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 100%)",
          backdropFilter: scrolled ? "blur(14px)" : "blur(4px)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(255,255,255,0)",
        }}
      >
        <span className="font-garamond font-bold italic text-white uppercase text-[18px] tracking-[-0.55px] drop-shadow-[0_0_14px_rgba(255,255,255,0.18)]">
          KUROJIN.
        </span>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative w-10 h-10 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex flex-col items-center justify-center gap-[5px] z-50"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${
              menuOpen ? "opacity-0 scale-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile fullscreen overlay menu */}
      <div
        className={`fixed inset-0 z-40 bg-[radial-gradient(circle_at_20%_15%,rgba(53,168,255,0.2),transparent_38%),radial-gradient(circle_at_82%_22%,rgba(255,92,92,0.2),transparent_36%),linear-gradient(180deg,#020202_0%,#000_100%)] backdrop-blur-xl flex md:hidden flex-col items-center justify-center transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-[86%] max-w-[360px] rounded-[28px] border border-white/14 bg-white/[0.04] px-6 py-8 flex flex-col items-center gap-7 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
          {navLinks.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-garamond text-white text-[31px] leading-none tracking-[-0.65px] uppercase transition-all duration-300 hover:scale-[1.04]"
              style={{ transitionDelay: menuOpen ? `${index * 45}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}

          <button className="mt-1 bg-white text-black rounded-[55px] h-[42px] px-9 font-montserrat font-extrabold italic text-[14px] uppercase shadow-[0_8px_30px_rgba(255,255,255,0.18)] active:scale-95 transition-transform">
            LET&apos;S TALK
          </button>
        </div>
      </div>

      {/* ── Desktop navbar (>= md) ── */}
      <nav
        className="fixed left-1/2 -translate-x-1/2 z-50 hidden md:block transition-all duration-150 ease-linear"
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
          <div
            className="flex items-center justify-between w-full h-full"
            style={{
              paddingLeft: scrolled ? "24px" : "32px",
              paddingRight: scrolled ? "24px" : "32px",
              transition: "padding 0.15s linear",
            }}
          >
            {/* Logo */}
            <span
              className={`relative z-10 font-garamond font-bold italic text-white uppercase tracking-[-0.4px] transition-all duration-150 whitespace-nowrap shrink-0 ${
                scrolled ? "text-[16px]" : "text-[20px]"
              }`}
            >
              KUROJIN.
            </span>

            {/* Nav Links */}
            <div
              className={`flex items-center justify-center flex-1 transition-all duration-150 ${
                scrolled ? "gap-6" : "gap-16"
              }`}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`font-garamond text-white tracking-[-0.32px] hover:opacity-80 transition-all duration-150 whitespace-nowrap ${
                    scrolled ? "text-[14px]" : "text-[16px]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <button
              className={`relative z-10 bg-white text-black rounded-[55px] font-montserrat font-extrabold italic uppercase overflow-hidden group cursor-pointer shrink-0 transition-all duration-150 hover:bg-gradient-to-r hover:from-[#00ff91] hover:to-[#00fee0] hover:text-black hover:shadow-[0_0_30px_rgba(0,255,145,0.8),0_0_60px_rgba(0,254,224,0.5)] ${
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
    </>
  );
}
