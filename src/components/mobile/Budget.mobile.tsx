"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function BudgetMobile() {
  const contentRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    const orb = orbRef.current;
    if (!content || !orb) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    obs.observe(content);
    obs.observe(orb);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="contact"
      className="relative w-full min-h-svh bg-bg overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute top-1/2 left-[8%] right-[8%] -translate-y-1/2 h-[74svh] shadow-[0px_0px_24px_0px_rgba(255,255,255,0.09)]">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at bottom right, rgba(196,37,8,1) 0%, rgba(49,9,2,1) 50%, rgba(0,0,0,1) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at top left, rgba(8,196,181,1) 0%, rgba(2,49,45,1) 50%, rgba(0,0,0,1) 100%)",
          }}
        />
      </div>

      {/* Orb — scale in on view */}
      <div
        ref={orbRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72vw] max-w-[360px] aspect-square rounded-full mix-blend-screen overflow-hidden scale-75 opacity-0 transition-all duration-1000 ease-out [&.is-visible]:scale-100 [&.is-visible]:opacity-100"
      >
        <div className="w-full h-full bg-gradient-to-br from-white/5 via-white/2 to-transparent rounded-full animate-[gentlePulse_4s_ease-in-out_infinite]" />
      </div>

      {/* Text — fade up on view */}
      <div
        ref={contentRef}
        className="absolute top-[43%] left-1/2 -translate-x-1/2 z-10 text-center w-[82%] max-w-[360px] flex flex-col items-center gap-5 opacity-0 translate-y-6 transition-all duration-700 ease-out delay-200 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0"
      >
        <p className="font-garamond text-[28px] text-near-white uppercase mix-blend-difference leading-[1.15]">
          <span className="font-normal">Budget Never</span>
          <br />
          <span className="font-bold italic">Limits Quality</span>
        </p>

        <p className="text-light-gray/85 text-[13px] font-light leading-[1.7] max-w-[300px] mx-auto mix-blend-difference">
          Budgets change. Standards don&apos;t. When numbers shift, we refine the
          output not the excellence. You get less volume, never less value.
        </p>

        {/* CTA — tap feedback */}
        <button className="mt-2 bg-white text-bg rounded-[55px] h-[40px] px-5 w-[150px] font-montserrat font-extrabold italic text-[15px] uppercase overflow-hidden relative group cursor-pointer active:scale-95 transition-transform">
          <span className="block transition-transform duration-300 group-hover:-translate-y-full leading-[1.4]">
            LET&apos;S TALK
          </span>
          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0 leading-[1.4]">
            LET&apos;S GO
          </span>
        </button>
      </div>

      {/* Bottom line divider */}
      <div className="absolute bottom-0 left-7 right-7 h-[2px]">
        <Image src="/images/line-divider.svg" alt="" fill className="object-cover" />
      </div>
    </section>
  );
}
