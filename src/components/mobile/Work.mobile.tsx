"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function WorkMobile() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      id="work"
      className="group/work relative w-full min-h-svh bg-bg overflow-hidden flex flex-col items-center justify-center px-7"
    >
      {/* Background image — subtle scale-in on view */}
      <div className="absolute inset-x-7 inset-y-[8%] shadow-[0px_0px_24px_0px_rgba(255,255,255,0.09)] overflow-hidden rounded-sm transition-transform duration-1000 ease-out scale-105 group-[.is-visible]/work:scale-100">
        <Image src="/images/work-bg.png" alt="" fill className="object-cover" />
        {/* Overlay for text legibility */}
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Center content — slide up on view */}
      <div className="relative z-10 text-center flex flex-col items-center gap-6 opacity-0 translate-y-6 transition-all duration-700 ease-out delay-200 group-[.is-visible]/work:opacity-100 group-[.is-visible]/work:translate-y-0">
        {/* Section label */}
        <span className="text-[10px] uppercase tracking-[3px] text-white/35 font-montserrat">
          Our Work
        </span>

        <p
          className="font-garamond text-[30px] text-near-white uppercase leading-[1.15]"
          style={{ textShadow: "0px 0px 56.7px rgba(255,255,255,0.6)" }}
        >
          <span className="font-normal">Every Pixel</span>
          <span className="font-bold italic">, </span>
          <br />
          <span className="font-bold italic text-[#f2f2f2]">Handcrafted.</span>
        </p>

        {/* Accent divider */}
        <div className="w-10 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

        {/* CTA — active:scale for mobile tap feedback */}
        <button className="bg-white text-bg rounded-[55px] h-[40px] w-[180px] font-montserrat font-extrabold italic text-[15px] uppercase overflow-hidden relative group cursor-pointer border border-bg active:scale-95 transition-transform">
          <span className="block transition-transform duration-300 group-hover:-translate-y-full leading-[1.4]">
            Our Work
          </span>
          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0 leading-[1.4]">
            Our Legacy
          </span>
        </button>
      </div>
    </section>
  );
}
