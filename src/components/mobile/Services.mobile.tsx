"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const servicesList = [
  "Brand Strategy & Design",
  "Web Design",
  "Filmmaking",
  "Product Design",
  "UI UX",
];

export default function ServicesMobile() {
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    const list = listRef.current;
    if (!heading || !list) return;

    // Respect reduced motion preference — reveal immediately
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      heading.classList.add("opacity-100", "translate-y-0");
      list.classList.add("opacity-100", "translate-y-0");
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-6");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    obs.observe(heading);
    obs.observe(list);
    return () => obs.disconnect();
  }, []);

  /* Stagger-reveal individual service items */
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = list.querySelectorAll("[data-service-item]");

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseInt(el.dataset.delay || "0", 10);
            setTimeout(() => {
              el.classList.add("opacity-100", "translate-y-0");
              el.classList.remove("opacity-0", "translate-y-4");
            }, delay);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.1 },
    );
    items.forEach((item) => obs.observe(item));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="services"
      className="relative w-full min-h-svh bg-bg overflow-hidden flex flex-col"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-bg" />
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/services-bg.png"
            alt=""
            fill
            className="object-cover -scale-x-100 -scale-y-100"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at right center, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-5 pt-20 pb-10 flex flex-col min-h-svh">
        {/* Heading block */}
        <div
          ref={headingRef}
          className="mx-auto mt-8 flex w-full max-w-[360px] flex-col items-center gap-4 text-center opacity-0 translate-y-6 transition-all duration-700 ease-out"
        >
          <p
            className="text-[clamp(25px,7vw,34px)] font-garamond italic font-light text-off-white tracking-[-0.6px] uppercase leading-[1.16]"
            style={{ textShadow: "0px 0px 40.9px rgba(255,236,185,0.6)" }}
          >
            One core, All dimensions.
          </p>

          <p className="text-light-gray/82 text-[13px] font-light leading-[1.72] max-w-[336px]">
            Kurojin Studios is built on the idea that creativity shouldn&apos;t live in
            silos. Whether you&apos;re launching a brand, redefining an identity, or
            scaling your digital presence, you shouldn&apos;t have to chase multiple
            agencies. We unify every creative discipline under one seamless studio.
          </p>

          {/* CTA */}
          <button type="button" aria-label="View our services" className="bg-white text-bg rounded-[55px] h-[48px] w-[186px] font-montserrat font-extrabold italic text-[15px] uppercase overflow-hidden relative group cursor-pointer border border-bg active:scale-95 transition-transform shadow-[0_10px_30px_rgba(255,255,255,0.15)]">
            <span className="block transition-transform duration-300 group-hover:-translate-y-full leading-[1.4]">
              Our Services
            </span>
            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0 leading-[1.4]">
              Our Dimensions
            </span>
          </button>
        </div>

        {/* Services categories */}
        <div
          ref={listRef}
          className="mt-auto mb-14 mx-auto max-w-[360px] flex flex-wrap justify-center gap-x-4 gap-y-3 opacity-0 translate-y-6 transition-all duration-700 ease-out delay-200"
        >
          {servicesList.map((service, i) => (
            <div
              key={i}
              data-service-item
              data-delay={i * 60}
              className="opacity-0 translate-y-4 transition-all duration-500 ease-out"
            >
              <p
                className="text-light-gray text-[11px] font-medium leading-none uppercase whitespace-nowrap"
              >
                {service}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll down arrow */}
        <div className="absolute bottom-8 right-5 w-[14px] h-[14px] mix-blend-difference z-10">
          <Image
            src="/images/down-arrow.svg"
            alt="Scroll down"
            fill
            className="object-contain"
          />
        </div>

        {/* Decorative flower */}
        <div className="absolute bottom-10 right-10 w-[48px] h-[120px] rotate-90 origin-center mix-blend-lighten z-10">
          <Image
            src="/images/decor-flower.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
