"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
const titleLead = "Because ";
const titleMiddle = '"good enough" ';
const titleTail = "was never the plan.";
const descriptionText =
  "Brands that trusted Kurojin.studio to shape how the world sees them. From startups to established names, we build with those who value craft.";

export default function ClientsMobile() {
  const rowEls = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const positions = useRef([0, 0, 0]);
  const scrollVelocity = useRef(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLParagraphElement | null>(null);
  const titleCharRefs = useRef<HTMLSpanElement[]>([]);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const descriptionCharRefs = useRef<HTMLSpanElement[]>([]);

  titleCharRefs.current = [];
  descriptionCharRefs.current = [];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(titleCharRefs.current, { opacity: 0, y: -22, filter: "blur(7px)" });
      gsap.set(descriptionRef.current, { opacity: 0, y: 26, filter: "blur(9px)" });
      gsap.set(descriptionCharRefs.current, { opacity: 0 });

      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          end: "+=90%",
          scrub: 0.6,
        },
      });

      if (bgRef.current) {
        timeline.fromTo(
          bgRef.current,
          { scale: 1.1, yPercent: -4 },
          { scale: 1, yPercent: 3, duration: 3.2 },
          0,
        );
      }

      if (titleCharRefs.current.length > 0) {
        timeline.to(
          titleCharRefs.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.28,
            stagger: 0.02,
          },
          0.18,
        );
      }

      if (descriptionRef.current) {
        timeline.fromTo(
          descriptionRef.current,
          { opacity: 0, y: 26, filter: "blur(9px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.22 },
          ">",
        );
      }

      if (descriptionCharRefs.current.length > 0) {
        timeline.fromTo(
          descriptionCharRefs.current,
          { opacity: 0 },
          {
            opacity: 1,
            stagger: 0.008,
            duration: 0.22,
          },
          ">",
        );
      }
    }, sectionRef);

    return () => ctx.revert();
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
        <div ref={bgRef} className="absolute inset-0 overflow-hidden will-change-transform">
          <Image
            src="/images/clients-bg.png"
            alt=""
            fill
            className="object-cover -scale-x-100 -scale-y-100"
          />
        </div>
      </div>

      {/* Text content — fade-in on scroll */}
      <div
        className="relative z-10 px-6 pt-22 pb-6"
      >
        <p
          ref={titleRef}
          className="text-[clamp(24px,7.4vw,32px)] font-garamond text-white tracking-[-0.55px] leading-[1.23] min-h-[74px] max-w-[330px]"
        >
          <span className="font-normal">
            {titleLead.split("").map((character, index) => (
              <span
                key={`lead-${character}-${index}`}
                ref={(element) => {
                  if (element) {
                    titleCharRefs.current[index] = element;
                  }
                }}
                className="inline-block"
              >
                {character === " " ? "\u00A0" : character}
              </span>
            ))}
          </span>

          <span className="font-bold italic uppercase">
            {titleMiddle.split("").map((character, index) => {
              const charIndex = titleLead.length + index;

              return (
                <span
                  key={`middle-${character}-${index}`}
                  ref={(element) => {
                    if (element) {
                      titleCharRefs.current[charIndex] = element;
                    }
                  }}
                  className="inline-block"
                >
                  {character === " " ? "\u00A0" : character}
                </span>
              );
            })}
          </span>

          <span className="font-normal">
            {titleTail.split("").map((character, index) => {
              const charIndex = titleLead.length + titleMiddle.length + index;

              return (
                <span
                  key={`tail-${character}-${index}`}
                  ref={(element) => {
                    if (element) {
                      titleCharRefs.current[charIndex] = element;
                    }
                  }}
                  className="inline-block"
                >
                  {character === " " ? "\u00A0" : character}
                </span>
              );
            })}
          </span>
        </p>

        <p
          ref={descriptionRef}
          className="mt-4 min-h-[96px] max-w-[330px] text-[13px] font-light text-white/82 leading-[1.65]"
          style={{ textShadow: "0px 0px 30px rgba(255,255,255,0.22)" }}
        >
          {descriptionText.split("").map((character, index) => (
            <span
              key={`${character}-${index}`}
              ref={(element) => {
                if (element) {
                  descriptionCharRefs.current[index] = element;
                }
              }}
              className="inline-block opacity-0"
            >
              {character === " " ? "\u00A0" : character}
            </span>
          ))}
        </p>

        <div className="absolute top-[92px] right-6 w-[38px] h-[124px] -rotate-90 origin-center mix-blend-color-dodge opacity-80 z-10 pointer-events-none">
          <Image
            src="/images/decor-clients.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Logo carousel — 3 rows with edge fades */}
      <div className="relative z-10 mt-auto mb-8 mx-4 rounded-[22px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_100%)] backdrop-blur-[6px] px-2 py-5 overflow-hidden shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
        <div className="absolute top-0 left-0 w-[14%] h-full bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[14%] h-full bg-gradient-to-l from-black/80 via-black/40 to-transparent z-10 pointer-events-none" />

        <div className="flex flex-col justify-center gap-3">
          {renderRow(row1, 0)}
          {renderRow(row2, 1)}
          {renderRow(row3, 2)}
        </div>
      </div>
    </section>
  );
}
