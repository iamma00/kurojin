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
      className="group/work relative w-full min-h-svh bg-bg overflow-hidden"
    >
      {/* Background image — subtle scale-in on view */}
      <div className="absolute top-[14%] left-[5%] right-[5%] h-[72svh] shadow-[0px_0px_30px_0px_rgba(255,255,255,0.12)] overflow-hidden rounded-[14px] transition-transform duration-1000 ease-out scale-105 group-[.is-visible]/work:scale-100">
        <Image src="/images/work-bg.png" alt="" fill className="object-cover" />
        {/* Overlay for text legibility */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.58)_100%)]" />
      </div>

      {/* Center content — slide up on view */}
      <div className="absolute top-[39%] left-1/2 -translate-x-1/2 z-10 text-center w-[84%] max-w-[350px] flex flex-col items-center gap-6 opacity-0 translate-y-6 transition-all duration-700 ease-out delay-200 group-[.is-visible]/work:opacity-100 group-[.is-visible]/work:translate-y-0">
        <p
          className="font-garamond text-[clamp(27px,7.2vw,34px)] text-near-white uppercase leading-[1.12]"
          style={{ textShadow: "0px 0px 56.7px rgba(255,255,255,0.6)" }}
        >
          <span className="font-normal">Every Pixel</span>
          <span className="font-bold italic">, </span>
          <br />
          <span className="font-bold italic text-[#f2f2f2]">Handcrafted.</span>
        </p>

        {/* CTA — active:scale for mobile tap feedback */}
        <button className="bg-white text-bg rounded-[55px] h-[42px] w-[186px] font-montserrat font-extrabold italic text-[15px] uppercase overflow-hidden relative group cursor-pointer border border-bg active:scale-95 transition-transform shadow-[0_10px_30px_rgba(255,255,255,0.15)]">
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
