"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import BlurText from "./BlurText";
import TextType from "./TextType";

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
const titleTypingSpeed = 19;
const titleSegments = [
  { text: "Because ", initialDelay: 0 },
  { text: '"good enough" ', initialDelay: 150 },
  { text: "was never the plan.", initialDelay: 438 },
];
const titleAnimationDuration =
  Math.max(...titleSegments.map((segment) => segment.initialDelay + segment.text.length * titleTypingSpeed)) + 60;



export default function Clients() {
  const rowEls = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const titleRef = useRef<HTMLParagraphElement | null>(null);
  const descriptionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);
  const [startTitleAnimation, setStartTitleAnimation] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const positions = useRef<number[]>([]);
  const initialized = useRef(false);
  const scrollVelocity = useRef(0);

  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  useEffect(() => {
    const triggerAnimationsOnScroll = () => {
      if (!titleRef.current || startTitleAnimation) return;

      const rect = titleRef.current.getBoundingClientRect();
      const viewportTrigger = window.innerHeight * 0.8;

      if (rect.top <= viewportTrigger) {
        setStartTitleAnimation(true);

        descriptionTimeoutRef.current = setTimeout(() => {
          setShowDescription(true);
        }, titleAnimationDuration);
      }
    };

    window.addEventListener("scroll", triggerAnimationsOnScroll, { passive: true });
    window.addEventListener("resize", triggerAnimationsOnScroll);
    triggerAnimationsOnScroll();

    return () => {
      window.removeEventListener("scroll", triggerAnimationsOnScroll);
      window.removeEventListener("resize", triggerAnimationsOnScroll);
    };
  }, [startTitleAnimation]);

  useEffect(() => {
    return () => {
      if (descriptionTimeoutRef.current) {
        clearTimeout(descriptionTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    let animationFrameId: number;

    const handleScroll = () => {
      const currentY = window.scrollY;
      scrollVelocity.current = currentY - lastY;
      lastY = currentY;
    };

    const animate = () => {
      rowEls.current.forEach((rowEl, i) => {
        if (!rowEl) return;

        const cycleWidth = rowEl.scrollWidth / 3;

        // Initialize position to -cycleWidth (start on the middle copy)
        if (!initialized.current || positions.current.length <= i) {
          if (positions.current.length <= i) positions.current.push(-cycleWidth);
          else positions.current[i] = -cycleWidth;
        }

        const direction = i % 2 === 0 ? 1 : -1; // alternate row direction
        const speed = 1.2; // fixed optimal speed for all rows
        positions.current[i] += speed * direction;

        // Seamless wrap
        if (positions.current[i] > 0) {
          positions.current[i] -= cycleWidth;
        } else if (positions.current[i] < -2 * cycleWidth) {
          positions.current[i] += cycleWidth;
        }

        rowEl.style.transform = `translateX(${positions.current[i]}px)`;
      });

      initialized.current = true;
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
    const items = [...logos, ...logos, ...logos];

    return (
      <div
        className={`border-t border-white/15 overflow-hidden${rowIndex === 1 ? " border-b border-white/15" : ""}`}
        onMouseEnter={() => setHoveredRow(rowIndex)}
        onMouseLeave={() => {
          setHoveredRow(null);
          setHoveredLogo(null);
        }}
      >
        <div
          ref={(el) => { rowEls.current[rowIndex] = el; }}
          className="flex w-max"
        >
          {items.map((logo, i) => (
            <div
              key={i}
              className={`relative w-[140px] h-[68px] md:w-[180px] md:h-[82px] lg:w-[220px] lg:h-[96px] xl:w-[260px] xl:h-[110px] shrink-0 border-r border-white/15 px-5 md:px-7 lg:px-9 py-2 md:py-3 transition-opacity duration-300 cursor-pointer ${
                logo.blend ? "mix-blend-plus-lighter" : ""
              } ${
                hoveredRow === rowIndex && hoveredLogo !== `${rowIndex}-${i}`
                  ? "opacity-30"
                  : "opacity-100"
              }`}
              onMouseEnter={() => setHoveredLogo(`${rowIndex}-${i}`)}
              onMouseLeave={() => setHoveredLogo(null)}
            >
              <div className="relative w-full h-full">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain"
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
      <p ref={titleRef} className="absolute top-[14%] left-[8%] text-[30px] xl:text-[40px] font-garamond text-white tracking-[-0.8px] z-10">
        <TextType
          text={startTitleAnimation ? "Because " : ""}
          as="span"
          typingSpeed={titleTypingSpeed}
          pauseDuration={1500}
          deletingSpeed={50}
          loop={false}
          startOnVisible={false}
          showCursor={false}
          reverseMode={false}
          className="leading-[0.84]"
        />
        <TextType
          text={startTitleAnimation ? '"good enough" ' : ""}
          as="span"
          typingSpeed={titleTypingSpeed}
          pauseDuration={1500}
          deletingSpeed={50}
          loop={false}
          startOnVisible={false}
          showCursor={false}
          reverseMode={false}
          initialDelay={150}
          className="font-bold italic uppercase leading-[0.84]"
        />
        <TextType
          text={startTitleAnimation ? "was never the plan." : ""}
          as="span"
          typingSpeed={titleTypingSpeed}
          pauseDuration={1500}
          deletingSpeed={50}
          loop={false}
          startOnVisible={false}
          showCursor
          cursorCharacter="_"
          cursorBlinkDuration={0.5}
          reverseMode={false}
          initialDelay={438}
          className="leading-[0.84]"
        />
      </p>

      {/* Description */}
      <div
        className=" absolute top-[22%] left-[8%] text-[16px] text-green-900 xl:text-[20px] font-light text-white leading-[1.4] max-w-[600px] z-10"
      >
        {showDescription ? (
          <BlurText
            text="Brands that trusted Kurojin.studio to shape how the world sees them. From startups to established names, we build with those who value craft."
            delay={40}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="opacity-65"
          />
        ) : null}
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

      {/* Carousel — outer clips, inner holds perspective */}
      <div className="absolute bottom-0 top-[40%] left-[4%] right-[4%] rounded overflow-hidden z-10">
        <div
          className="absolute inset-0 bg-black border-t border-white/10"
          style={{ perspective: "900px" }}
        >
          {/* Edge fade gradients */}
          <div className="absolute top-0 left-0 w-[8%] md:w-[10%] lg:w-[12%] h-full bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[8%] md:w-[10%] lg:w-[12%] h-full bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

          {/* 4 rows — 3D tilted */}
          <div
            className="flex flex-col h-full justify-center"
            style={{ transform: "rotateX(20deg)", transformOrigin: "10% 20%" }}
          >
            {renderRow(row1, 0)}
            {renderRow(row2, 1)}
            {renderRow(row3, 2)}
            {renderRow(row4, 3)}
          </div>
        </div>
      </div>
    </section>
  );
}