"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-work-reveal]",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
      // subtle parallax on the background image
      gsap.fromTo(
        "[data-work-bg]",
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full h-screen min-h-[620px] bg-bg overflow-hidden"
    >
      {/* Background image container */}
      <div className="absolute top-[13%] left-[8%] right-[8%] h-[74vh] max-h-[802px] shadow-[0px_0px_20px_0px_rgba(255,255,255,0.11)] overflow-hidden rounded-lg">
        <div data-work-bg className="absolute inset-0 will-change-transform">
          <Image
            src="/images/hero-bg.jpg"
            alt="Selected work by Kurojin Studio"
            fill
            className="object-cover"
            sizes="84vw"
            quality={80}
          />
        </div>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Center text */}
      <div className="absolute top-[41%] left-1/2 -translate-x-1/2 text-center max-w-[768px] w-[80%] z-10">
        <p
          data-work-reveal
          className="font-garamond text-[36px] lg:text-[42px] xl:text-[48px] text-near-white uppercase"
          style={{ textShadow: "0px 0px 56.7px rgba(255,255,255,0.6)" }}
        >
          <span className="font-normal leading-[1.08]">Every Pixel</span>
          <span className="font-bold italic leading-[1.08]">, </span>
          <span className="font-bold italic leading-[1.08] text-[#f2f2f2]">
            Handcrafted.
          </span>
        </p>
      </div>

      {/* CTA Button */}
      <div data-work-reveal className="absolute top-[56%] left-1/2 -translate-x-1/2 z-10">
        <Link
          href="/work"
          className="bg-white text-bg rounded-[55px] h-[44px] px-[10px] w-[211px] font-montserrat font-extrabold italic text-[18px] uppercase overflow-hidden relative group cursor-pointer border border-bg inline-flex items-center justify-center transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.35)]"
        >
          <span className="block transition-transform duration-300 group-hover:-translate-y-full leading-[1.4]">
            Our Work
          </span>
          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0 leading-[1.4]">
            Our Legacy
          </span>
        </Link>
      </div>
    </section>
  );
}
