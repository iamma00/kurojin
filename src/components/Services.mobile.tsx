"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const servicesList = [
  "Branding",
  "3D Production",
  "Web Design & Dev",
  "Product/ads Shoot",
  "Marketing",
  "Printing Media",
  "Social Media",
  "Architectural Viz",
  "Post-Production",
  "Software visualization",
];

export default function ServicesMobile() {
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    const list = listRef.current;
    if (!heading || !list) return;

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
              el.classList.add("opacity-100", "translate-x-0");
              el.classList.remove("opacity-0", "-translate-x-4");
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
      <div className="relative z-10 px-7 pt-24 pb-14 flex flex-col gap-5 flex-1">
        {/* Heading block — fade in */}
        <div
          ref={headingRef}
          className="flex flex-col gap-5 opacity-0 translate-y-6 transition-all duration-700 ease-out"
        >
          {/* Section label — mobile-only */}
          <span className="text-[10px] uppercase tracking-[3px] text-white/35 font-montserrat">
            Services
          </span>

          <p
            className="text-[26px] font-garamond italic font-light text-off-white tracking-[-0.6px] uppercase leading-[1.2]"
            style={{ textShadow: "0px 0px 40.9px rgba(255,236,185,0.6)" }}
          >
            One core, All dimensions.
          </p>

          <p className="text-light-gray/85 text-[13px] font-light leading-[1.7] max-w-[340px]">
            Kurojin Studios is built on the idea that creativity shouldn&apos;t live in
            silos. Whether you&apos;re launching a brand, redefining an identity, or
            scaling your digital presence, you shouldn&apos;t have to chase multiple
            agencies. We unify every creative discipline under one seamless studio.
          </p>

          {/* CTA */}
          <button className="bg-white text-bg rounded-[55px] h-[40px] w-[180px] font-montserrat font-extrabold italic text-[15px] uppercase overflow-hidden relative group cursor-pointer border border-bg active:scale-95 transition-transform">
            <span className="block transition-transform duration-300 group-hover:-translate-y-full leading-[1.4]">
              Our Services
            </span>
            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0 leading-[1.4]">
              Our Dimensions
            </span>
          </button>
        </div>

        {/* Services list — stagger reveal from left */}
        <div
          ref={listRef}
          className="mt-3 flex flex-col opacity-0 translate-y-6 transition-all duration-700 ease-out delay-200"
        >
          {servicesList.map((service, i) => (
            <div
              key={i}
              data-service-item
              data-delay={i * 60}
              className="flex items-center gap-3 opacity-0 -translate-x-4 transition-all duration-500 ease-out border-b border-white/[0.06] py-2.5 first:pt-0"
            >
              {/* Index number — mobile-only touch */}
              <span className="text-[10px] font-montserrat text-white/20 tabular-nums w-4 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                className="font-garamond italic text-[22px] uppercase leading-[1.6] bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(175,146,128,1) 50%, rgba(94,36,0,1) 100%)",
                }}
              >
                {service}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
