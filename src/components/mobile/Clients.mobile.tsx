"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

interface Logo {
  src: string;
  alt: string;
  blend?: boolean;
}

const row1: Logo[] = [
  { src: "/images/logo-01.png", alt: "Client 1" },
  { src: "/images/logo-02.png", alt: "Client 2" },
  { src: "/images/logo-03.png", alt: "Client 3" },
  { src: "/images/logo-09.png", alt: "Client 9" },
  { src: "/images/logo-04.png", alt: "Client 4", blend: true },
  { src: "/images/logo-05.png", alt: "Client 5" },
  { src: "/images/logo-06.png", alt: "Client 6" },
  { src: "/images/logo-07.png", alt: "Client 7" },
];

const row2: Logo[] = [
  { src: "/images/logo-08.png", alt: "Client 8" },
  { src: "/images/logo-10.png", alt: "Client 10" },
  { src: "/images/logo-11.png", alt: "Client 11" },
  { src: "/images/logo-12.png", alt: "Client 12" },
  { src: "/images/logo-13.png", alt: "Client 13" },
  { src: "/images/logo-14.png", alt: "Client 14" },
  { src: "/images/logo-15.png", alt: "Client 15" },
];

const row3: Logo[] = [
  { src: "/images/logo-03.png", alt: "Client 3" },
  { src: "/images/logo-07.png", alt: "Client 7" },
  { src: "/images/logo-11.png", alt: "Client 11" },
  { src: "/images/logo-01.png", alt: "Client 1" },
  { src: "/images/logo-14.png", alt: "Client 14" },
  { src: "/images/logo-05.png", alt: "Client 5" },
  { src: "/images/logo-09.png", alt: "Client 9" },
];

export default function ClientsMobile() {
  const rowEls = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const positions = useRef([0, 0, 0]);
  const scrollVelocity = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  /* Intersection observer for fade-in of text block */
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("opacity-100", "translate-y-0");
          el.classList.remove("opacity-0", "translate-y-6");
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Scroll-driven marquee with 3 rows */
  useEffect(() => {
    let lastY = 0;
    let rafId: number;

    const handleScroll = () => {
      const currentY = window.scrollY;
      scrollVelocity.current = currentY - lastY;
      lastY = currentY;
    };

    const animate = () => {
      rowEls.current.forEach((el, i) => {
        if (!el) return;

        const baseDir = i % 2 === 0 ? 1 : -1;
        const scrollDir = scrollVelocity.current > 0 ? 1 : -1;
        const direction = baseDir * scrollDir;
        const speed = 0.35 + Math.abs(scrollVelocity.current) * 0.1;
        positions.current[i] += speed * direction;

        const half = el.scrollWidth / 2;
        if (positions.current[i] > half) positions.current[i] -= half;
        else if (positions.current[i] < -half) positions.current[i] += half;

        el.style.transform = `translate3d(${positions.current[i]}px,0,0)`;
      });

      scrollVelocity.current *= 0.88;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    animate();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const setRowRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      rowEls.current[index] = el;
    },
    [],
  );

  const renderRow = (logos: Logo[], rowIndex: number) => {
    const items = [...logos, ...logos];
    return (
      <div className="overflow-hidden">
        <div ref={setRowRef(rowIndex)} className="flex w-max">
          {items.map((logo, i) => (
            <div
              key={i}
              className={`relative w-[52px] h-[52px] shrink-0 mx-2.5 ${
                logo.blend ? "mix-blend-plus-lighter" : ""
              }`}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain opacity-80"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-svh bg-bg overflow-hidden flex flex-col"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/clients-bg.png"
          alt=""
          fill
          className="object-cover -scale-x-100 -scale-y-100"
        />
      </div>

      {/* Text content — fade-in on scroll */}
      <div
        ref={textRef}
        className="relative z-10 px-7 pt-24 pb-6 opacity-0 translate-y-6 transition-all duration-700 ease-out"
      >
        {/* Small label */}
        <span className="inline-block text-[10px] uppercase tracking-[3px] text-white/40 font-montserrat mb-4">
          Our Clients
        </span>

        <p className="text-[24px] font-garamond text-white tracking-[-0.5px] leading-[1.25]">
          <span>Because </span>
          <span className="font-bold italic uppercase">&quot;good enough&quot; </span>
          <span>was never the plan.</span>
        </p>

        <p
          className="mt-4 text-[13px] font-light text-white/85 leading-[1.65] max-w-[320px]"
          style={{ textShadow: "0px 0px 33px rgba(255,255,255,0.15)" }}
        >
          Brands that trusted Kurojin.studio to shape how the world sees them.
          From startups to established names, we build with those who value craft.
        </p>

        {/* Accent dashes — mobile-only decorative */}
        <div className="flex gap-1.5 mt-5">
          <div className="w-6 h-px bg-white/50" />
          <div className="w-3 h-px bg-white/25" />
        </div>
      </div>

      {/* Logo carousel — 3 rows with edge fades */}
      <div className="relative z-10 flex-1 flex flex-col justify-center gap-3 py-4">
        <div className="absolute top-0 left-0 w-[14%] h-full bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[14%] h-full bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

        {renderRow(row1, 0)}
        {renderRow(row2, 1)}
        {renderRow(row3, 2)}
      </div>
    </section>
  );
}
