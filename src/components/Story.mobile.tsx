"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function StoryMobile() {
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [imageRef.current, contentRef.current].filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative w-full min-h-svh bg-bg overflow-hidden flex flex-col">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#080808]" />
        <div className="absolute inset-0 overflow-hidden">
          <Image src="/images/story-bg.png" alt="" fill className="object-cover" />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgb(0,0,0) 0%, rgba(0,0,0,0) 30%), linear-gradient(0deg, rgb(0,0,0) 0%, rgba(0,0,0,0) 25%)",
          }}
        />
      </div>

      {/* Image — fade in from below */}
      <div
        ref={imageRef}
        className="relative z-10 w-full aspect-[3/4] max-h-[50vh] mix-blend-plus-lighter mt-16 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
      >
        <Image src="/images/story-figure.png" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[70%] to-black to-[95%]" />
      </div>

      {/* Text content — staggered fade in */}
      <div
        ref={contentRef}
        className="relative z-10 px-7 pb-14 flex flex-col gap-5 opacity-0 translate-y-8 transition-all duration-700 ease-out delay-300"
      >
        {/* Section label — mobile-only */}
        <span className="text-[10px] uppercase tracking-[3px] text-white/35 font-montserrat">
          Our Story
        </span>

        <p
          className="text-off-white text-[26px] font-garamond tracking-[-0.6px]"
          style={{ textShadow: "0px 0px 40.9px rgba(255,236,185,0.6)" }}
        >
          <span className="font-normal leading-[1.3]">Your focus is on what </span>
          <span className="font-bold italic uppercase">you build.</span>
        </p>

        {/* Decorative accent */}
        <div className="flex gap-1.5">
          <div className="w-8 h-px bg-gradient-to-r from-[#ffe0c8]/60 to-transparent" />
          <div className="w-2 h-px bg-white/20" />
        </div>

        <p
          className="text-white/85 text-[13px] font-light leading-[1.7]"
          style={{ textShadow: "0px 0px 33px rgba(255,255,255,0.15)" }}
        >
          Every brand begins with a story. We shape that story into a powerful Brand
          Identity, bring it to life through mindful Design, craft visuals with Product
          Shoots & immersive 3D Content, build your presence with high-impact Web
          Experiences, and finally set the momentum through strategic Social Media.
        </p>

        <p
          className="text-white text-[22px] tracking-[-0.5px] uppercase mt-2"
          style={{ textShadow: "0px 0px 45.2px rgba(255,236,185,0.28)" }}
        >
          <span className="font-garamond font-light leading-[1.3]">We Care How </span>
          <span className="font-garamond font-light italic leading-[1.3]">The World Sees It</span>
        </p>
      </div>

      {/* Bottom line divider */}
      <div className="absolute bottom-0 left-7 right-7 h-[2px]">
        <Image src="/images/line-divider.svg" alt="" fill className="object-cover" />
      </div>
    </section>
  );
}
