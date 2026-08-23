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

// One master array of all client logos — each logo appears in EXACTLY ONE row.
// alt="" — decorative in the marquee; the section header carries the meaning.
const allLogos: Logo[] = [
  { src: "/images/logo-01.png", alt: "" },
  { src: "/images/logo-02.png", alt: "" },
  { src: "/images/logo-03.png", alt: "" },
  { src: "/images/logo-04.png", alt: "", blend: true },
  { src: "/images/logo-05.png", alt: "" },
  { src: "/images/logo-06.png", alt: "" },
  { src: "/images/logo-07.png", alt: "" },
  { src: "/images/logo-08.png", alt: "" },
  { src: "/images/logo-09.png", alt: "" },
  { src: "/images/logo-10.png", alt: "" },
  { src: "/images/logo-11.png", alt: "" },
  { src: "/images/logo-12.png", alt: "" },
  { src: "/images/logo-13.png", alt: "" },
  { src: "/images/logo-14.png", alt: "" },
  { src: "/images/logo-15.png", alt: "" },
];

// Split: first carousel row = first half, second row = the rest. No overlap.
const splitAt = Math.ceil(allLogos.length / 2);
const row1: Logo[] = allLogos.slice(0, splitAt); // logos 01–08
const row2: Logo[] = allLogos.slice(splitAt); // logos 09–15

// Only 2 rows rendered; each row tripled inside renderRow for seamless wrap.
const renderedRows = [row1, row2];
const titleTypingSpeed = 19;
const titleSegments = [
  { text: "Because ", initialDelay: 0 },
  { text: '"good enough" ', initialDelay: 150 },
  { text: "was never the plan.", initialDelay: 438 },
];
const titleAnimationDuration =
  Math.max(
    ...titleSegments.map(
      (segment) =>
        segment.initialDelay + segment.text.length * titleTypingSpeed,
    ),
  ) + 60;

export default function Clients() {
  const rowEls = useRef<(HTMLDivElement | null)[]>([null, null]);
  const titleRef = useRef<HTMLParagraphElement | null>(null);
  const descriptionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);
  const [startTitleAnimation, setStartTitleAnimation] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const positions = useRef<number[]>([]);
  const initialized = useRef(false);
  const scrollVelocity = useRef(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const currentSkew = useRef(0);

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

    window.addEventListener("scroll", triggerAnimationsOnScroll, {
      passive: true,
    });
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
    let animationFrameId: number | null = null;
    let running = false;
    let scrollDir = 1; // 1 = down, -1 = up

    const handleScroll = () => {
      const currentY = window.scrollY;
      scrollVelocity.current = currentY - lastY;
      if (currentY > lastY) {
        scrollDir = 1; // scrolling down
      } else if (currentY < lastY) {
        scrollDir = -1; // scrolling up
      }
      lastY = currentY;
    };

    const animate = () => {
      if (!running) return;

      rowEls.current.forEach((rowEl, i) => {
        if (!rowEl) return;

        const cycleWidth = rowEl.scrollWidth / 3;

        // Initialize position to -cycleWidth (start on the middle copy)
        if (!initialized.current || positions.current.length <= i) {
          if (positions.current.length <= i)
            positions.current.push(-cycleWidth);
          else positions.current[i] = -cycleWidth;
        }

        // alternate row direction, but reverse on scroll up
        const baseDirection = i % 2 === 0 ? 1 : -1;
        const effectiveDirection = baseDirection * scrollDir;
        const speed = 1.2;
        positions.current[i] += speed * effectiveDirection;

        // Seamless wrap
        if (positions.current[i] > 0) {
          positions.current[i] -= cycleWidth;
        } else if (positions.current[i] < -2 * cycleWidth) {
          positions.current[i] += cycleWidth;
        }

        rowEl.style.transform = `translateX(${positions.current[i]}px)`;
      });

      // CodeGrid-style velocity skew: fast scroll skews the whole carousel,
      // then it eases back to 0. Clamped so it never looks broken.
      if (carouselRef.current) {
        const targetSkew = Math.max(
          -8,
          Math.min(8, scrollVelocity.current * 0.22)
        );
        currentSkew.current += (targetSkew - currentSkew.current) * 0.08;
        if (Math.abs(currentSkew.current) > 0.01) {
          carouselRef.current.style.transform = `skewX(${currentSkew.current}deg)`;
        } else {
          carouselRef.current.style.transform = "skewX(0deg)";
        }
      }

      initialized.current = true;
      animationFrameId = requestAnimationFrame(animate);
    };

    // Only burn frames while the carousel is on screen
    const start = () => {
      if (running) return;
      running = true;
      lastY = window.scrollY;
      animationFrameId = requestAnimationFrame(animate);
    };
    const stop = () => {
      running = false;
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    let io: IntersectionObserver | null = null;
    if (carouselRef.current && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? start() : stop()),
        { rootMargin: "120px" }
      );
      io.observe(carouselRef.current);
    } else {
      start();
    }

    return () => {
      stop();
      io?.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const renderRow = (logos: Logo[], rowIndex: number) => {
    const items = [...logos, ...logos, ...logos];

    return (
      <div
        key={rowIndex}
        className={`border-t border-white/15 overflow-hidden ${rowIndex === 1 ? "border-b border-white/15" : ""}`}
        onMouseEnter={() => setHoveredRow(rowIndex)}
        onMouseLeave={() => {
          setHoveredRow(null);
          setHoveredLogo(null);
        }}
      >
        <div
          ref={(el) => {
            rowEls.current[rowIndex] = el;
          }}
          className="flex w-max"
        >
          {items.map((logo, i) => (
            <div
              key={i}
              className={`group relative w-[136px] h-[64px] sm:w-[168px] sm:h-[77px] md:w-[208px] md:h-[93px] lg:w-[256px] lg:h-[112px] xl:w-[304px] xl:h-[128px] shrink-0 border-r border-white/15 px-5 sm:px-6 md:px-8 lg:px-10 py-3 md:py-4 transition-opacity duration-300 cursor-pointer ${
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
                  className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="relative w-full min-h-screen bg-transparent backdrop-blur-md overflow-hidden flex flex-col">
      {/* Background */}
      <div className="absolute inset-0" />

      {/* Header block — generous top spacing so navbar clears */}
      <div className="relative z-10 pt-[110px] md:pt-[140px] px-4 md:px-[8%]">
        <p className="font-montserrat text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-white/50 mb-5">
          Trusted by / 15+ brands
        </p>
        <p
          ref={titleRef}
          className="text-[26px] sm:text-[30px] md:text-[38px] xl:text-[44px] font-garamond text-white tracking-[-0.7px] md:tracking-[-0.8px]"
        >
        {/* TextType components unchanged */}
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
          className="leading-[0.9]"
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
          className="font-bold italic uppercase leading-[0.9]"
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
          className="leading-[0.9]"
        />
        </p>

        {/* Description */}
        <div className="mt-6 text-[15px] sm:text-[16px] md:text-[18px] xl:text-[20px] font-light text-white leading-[1.45] max-w-[340px] sm:max-w-[420px] md:max-w-[520px] lg:max-w-[600px]">
        {showDescription ? (
          <BlurText
            text="Brands that trusted Kurojin.studio to shape how the world sees them. From startups to established names, we build with those who value craft."
            delay={40}
            animateBy="words"
            direction="top"
            className="opacity-65"
          />
          ) : null}
        </div>
      </div>

      {/* Decorative */}
      <div className="hidden md:block absolute top-[16%] right-[6%] w-[68px] h-[220px] -rotate-90 origin-center mix-blend-color-dodge opacity-90 z-10">
        <Image
          src="/images/decor-clients.jpg"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      {/* Carousel — full-bleed across the whole section, no card, no margin */}
      <div
        ref={carouselRef}
        className="relative z-10 flex-1 min-h-[300px] mt-10 md:mt-14 overflow-hidden will-change-transform"
      >
        <div className="absolute inset-0" style={{ perspective: "900px" }}>
          {/* Rows */}
          <div
            className="flex flex-col h-full justify-center"
            style={{ transform: "rotateX(20deg)", transformOrigin: "10% 20%" }}
          >
            {renderedRows.map((row, i) => renderRow(row, i))}
          </div>
        </div>
      </div>
    </section>
  );
}