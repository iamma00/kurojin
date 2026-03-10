"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Shuffle from './Shuffle';

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

const row3 = [...row1];
const row4 = [...row2];

export default function Clients() {
  const rowEls = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);

  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);
  const positions = useRef([0, 0, 0, 0]);
  const scrollVelocity = useRef(0);

  useEffect(() => {
    let lastY = 0;
    let animationFrameId: number;

    const handleScroll = () => {
      const currentY = window.scrollY;
      scrollVelocity.current = currentY - lastY;
      lastY = currentY;
    };

    const animate = () => {
      rowEls.current.forEach((rowEl, i) => {
        if (!rowEl) return;

        // Base alternating direction
        const baseDir = i % 2 === 0 ? 1 : -1;

        // Apply scroll direction - reverse when scrolling opposite
        const scrollDir = scrollVelocity.current > 0 ? 1 : -1;
        const direction = baseDir * scrollDir;

        // Calculate movement: base speed + scroll velocity bonus
        const speed = 0.8 + Math.abs(scrollVelocity.current) * 0.15;
        positions.current[i] += speed * direction;

        // Infinite loop wrapping
        const containerWidth = rowEl.scrollWidth / 2;

        if (positions.current[i] > containerWidth) {
          positions.current[i] -= containerWidth;
        } else if (positions.current[i] < -containerWidth) {
          positions.current[i] += containerWidth;
        }

        rowEl.style.transform = `translateX(${positions.current[i]}px)`;
      });

      // Dampen velocity over time
      scrollVelocity.current *= 0.85;
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    animate();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const renderRow = (logos: Logo[], rowIndex: number) => {
    const items = [...logos, ...logos];

    return (
      <div
        className="overflow-hidden"
        onMouseEnter={() => setHoveredRow(rowIndex)}
        onMouseLeave={() => {
          setHoveredRow(null);
          setHoveredLogo(null);
        }}
      >
        <div ref={(el) => { rowEls.current[rowIndex] = el; }} className="flex w-max">
          {items.map((logo, i) => (
            <div
              key={i}
              className={`relative w-[90px] h-[90px] md:w-[110px] md:h-[110px] lg:w-[140px] lg:h-[140px] xl:w-[160px] xl:h-[160px] shrink-0 transition-all duration-300 cursor-pointer ${
                i % 2 === 0 ? "mx-4 md:mx-6 lg:mx-8 xl:mx-10" : "mx-5 md:mx-7 lg:mx-9 xl:mx-12"
              } ${logo.blend ? "mix-blend-plus-lighter" : ""} ${
                hoveredRow === rowIndex && hoveredLogo !== `${rowIndex}-${i}`
                  ? "opacity-40 scale-95"
                  : "opacity-100 scale-100"
              }`}
              onMouseEnter={() => setHoveredLogo(`${rowIndex}-${i}`)}
              onMouseLeave={() => setHoveredLogo(null)}
            >
              <div className="relative w-full h-full group">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className={`object-contain transition-all duration-300 ${
                    hoveredLogo === `${rowIndex}-${i}`
                      ? "brightness-150 drop-shadow-[0_0_15px_rgba(0,255,145,0.4)]"
                      : "brightness-100"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="relative w-full h-screen bg-bg overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/clients-bg.png"
          alt=""
          fill
          className="object-cover -scale-x-100 -scale-y-100"
        />
      </div>

      {/* Title */}
      
      
      <p className="absolute top-[14%] left-[8%] text-[30px] xl:text-[40px] font-garamond text-white tracking-[-0.8px] z-10">
        <span className="leading-[0.84]">Because</span>{" "}
        <span className="font-bold italic uppercase leading-[0.84]">
          &quot;good enough&quot;{" "}
        </span>
        <span className="leading-[0.84]">was never the plan.</span>
      </p>

      {/* Description */}

<div
  className="absolute top-[22%] left-[8%] text-[16px] xl:text-[20px] font-light text-white leading-[1.4] max-w-[600px] mix-blend-difference z-10"
  style={{ textShadow: "0px 0px 33px rgba(255,255,255,0.3)" }}
>
    <Shuffle
      text="Brands that trusted Kurojin.studio to shape how the world sees them."
      shuffleDirection="down"
      duration={0.35}
      animationMode="evenodd"
      shuffleTimes={1}
      ease="back.out(1.1)"
      stagger={0.03}
      threshold={0.1}
      triggerOnce={true}
      triggerOnHover
      respectReducedMotion={true}
      loop={false}
      loopDelay={0}
    />

    <Shuffle
      text="From startups to established names, we build with those who value craft."
      shuffleDirection="down"
      duration={0.35}
      animationMode="evenodd"
      shuffleTimes={1}
      ease="back.out(1.1)"
      stagger={0.03}
      threshold={0.1}
      triggerOnce={true}
      triggerOnHover
      respectReducedMotion={true}
      loop={false}
      loopDelay={0}
    />
</div>

      {/* Decorative */}
      <div className="absolute top-[18%] right-[8%] w-[78px] h-[264px] -rotate-90 origin-center mix-blend-color-dodge opacity-90 z-10">
        <Image
          src="/images/decor-clients.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      {/* Carousel */}
      <div className="absolute bottom-0 top-[35%] left-1/2 -translate-x-1/2 w-full bg-black border border-black overflow-hidden py-8 md:py-10 lg:py-12 xl:py-14 z-10">
        {/* Edge fade gradients */}
        <div className="absolute top-0 left-0 w-[10%] md:w-[12%] lg:w-[15%] h-full bg-gradient-to-r from-bg via-bg/70 to-transparent z-20" />
        <div className="absolute top-0 right-0 w-[10%] md:w-[12%] lg:w-[15%] h-full bg-gradient-to-l from-bg via-bg/70 to-transparent z-20" />

        {/* Four rows with proper spacing */}
        <div className="flex flex-col gap-y-4 md:gap-y-6 lg:gap-y-8 xl:gap-y-10 px-[4%] md:px-[6%] lg:px-[8%] h-full justify-center">
          {renderRow(row1, 0)}
          {renderRow(row2, 1)}
          {renderRow(row3, 2)}
          {renderRow(row4, 3)}
        </div>
      </div>
    </section>
  );
}