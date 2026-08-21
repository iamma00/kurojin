"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Parallax card field for the service page — cards drift at different
 * speeds while scrolling (CodeGrid parallax pattern), with tilt on entry.
 */
export type ParallaxCard = {
  title: string;
  body: string;
  tag: string;
  image?: string;
};

export default function SvcParallax({ cards }: { cards: ParallaxCard[] }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-pcard]").forEach((card) => {
        const speed = parseFloat(card.dataset.speed || "1");
        // entry
        gsap.fromTo(
          card,
          { opacity: 0, y: 70, rotate: speed > 1 ? 2 : -2 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%" },
          }
        );
        // continuous drift
        gsap.to(card, {
          y: () => -70 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative z-10 overflow-hidden py-28 md:py-36">
      <div className="k-container">
        <p className="mb-6 font-montserrat text-[11px] uppercase tracking-[0.4em] text-white/40">
          Deliverables — in motion
        </p>
        <h2 className="k-display-sm k-safe max-w-[760px] font-garamond text-white">
          <span className="font-normal">What actually </span>
          <span className="font-bold italic text-[#22d3ee]">lands in your hands.</span>
        </h2>
      </div>

      <div className="k-container mt-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <article
              key={c.title}
              data-pcard
              data-speed={(0.5 + (i % 3) * 0.45).toFixed(2)}
              className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.02] will-change-transform"
            >
              {c.image && (
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent" />
                </div>
              )}
              <div className="p-7">
                <span className="font-montserrat text-[10px] uppercase tracking-[0.28em] text-[#22d3ee]/70">
                  {c.tag}
                </span>
                <h3 className="mt-3 font-garamond text-[24px] leading-tight text-white">
                  {c.title}
                </h3>
                <p className="mt-3 text-[13px] font-light leading-6 text-white/55">
                  {c.body}
                </p>
              </div>
              <span className="absolute right-6 top-6 text-[18px] text-white/20 transition-all duration-300 group-hover:text-[#22d3ee] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
