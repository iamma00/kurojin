"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const storyBodyText =
  "Every brand begins with a story. We shape that story into a powerful Brand Identity, bring it to life through mindful Design, craft visuals with Product Shoots & immersive 3D Content, build your presence with high-impact Web Experiences, and finally set the momentum through strategic Social Media.";
const bottomHeadlineLead = "We Care How ";
const bottomHeadlineTail = "The World Sees It";

export default function StoryMobile() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const topHeadlineRef = useRef<HTMLParagraphElement | null>(null);
  const bodyTextRef = useRef<HTMLParagraphElement | null>(null);
  const bodyCharRefs = useRef<HTMLSpanElement[]>([]);
  const bottomCharRefs = useRef<HTMLSpanElement[]>([]);

  bodyCharRefs.current = [];
  bottomCharRefs.current = [];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(topHeadlineRef.current, { opacity: 0, y: 54, filter: "blur(8px)" });
      gsap.set(bodyTextRef.current, { opacity: 0, y: 34, filter: "blur(9px)" });
      gsap.set(bodyCharRefs.current, { opacity: 0 });
      gsap.set(bottomCharRefs.current, { opacity: 0, y: -46, filter: "blur(8px)" });

      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "+=95%",
          scrub: 0.65,
        },
      });

      if (bgRef.current) {
        timeline.fromTo(
          bgRef.current,
          { scale: 1.12, yPercent: -5 },
          { scale: 1, yPercent: 4, duration: 3.6 },
          0,
        );
      }

      if (topHeadlineRef.current) {
        timeline.fromTo(
          topHeadlineRef.current,
          { opacity: 0, y: 54, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.3 },
          0.14,
        );
      }

      if (bodyTextRef.current) {
        timeline.fromTo(
          bodyTextRef.current,
          { opacity: 0, y: 34, filter: "blur(9px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.22 },
          ">",
        );
      }

      if (bodyCharRefs.current.length > 0) {
        timeline.fromTo(
          bodyCharRefs.current,
          { opacity: 0 },
          {
            opacity: 1,
            stagger: 0.01,
            duration: 0.22,
          },
          ">",
        );
      }

      if (bottomCharRefs.current.length > 0) {
        timeline.to(
          bottomCharRefs.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.32,
            stagger: 0.024,
            ease: "power2.out",
          },
          ">",
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-svh bg-bg overflow-hidden flex flex-col">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#080808]" />
        <div ref={bgRef} className="absolute inset-0 overflow-hidden will-change-transform">
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

      {/* Text content */}
      <div className="relative z-10 mt-auto mb-auto px-6 py-16 flex flex-col items-center text-center gap-6">
        <p
          ref={topHeadlineRef}
          className="text-off-white text-[clamp(24px,7.2vw,33px)] font-garamond tracking-[-0.6px] max-w-[330px]"
          style={{ textShadow: "0px 0px 40.9px rgba(255,236,185,0.6)" }}
        >
          <span className="font-normal leading-[1.3]">Your focus is on what </span>
          <span className="font-bold italic uppercase">you build.</span>
        </p>

        <p
          ref={bodyTextRef}
          className="min-h-[176px] max-w-[336px] text-white/82 text-[13px] font-light leading-[1.72]"
          style={{ textShadow: "0px 0px 33px rgba(255,255,255,0.3)" }}
        >
          {storyBodyText.split("").map((character, index) => (
            <span
              key={`${character}-${index}`}
              ref={(element) => {
                if (element) {
                  bodyCharRefs.current[index] = element;
                }
              }}
              className="inline-block opacity-0"
            >
              {character === " " ? "\u00A0" : character}
            </span>
          ))}
        </p>

        <p
          className="text-white text-[clamp(20px,6.3vw,28px)] tracking-[-0.55px] uppercase mt-1 min-h-[68px] max-w-[330px]"
          style={{ textShadow: "0px 0px 45.2px rgba(255,236,185,0.28)" }}
        >
          <span className="font-garamond font-light leading-[1.3]">
            {bottomHeadlineLead.split("").map((character, index) => (
              <span
                key={`lead-${character}-${index}`}
                ref={(element) => {
                  if (element) {
                    bottomCharRefs.current[index] = element;
                  }
                }}
                className="inline-block"
              >
                {character === " " ? "\u00A0" : character}
              </span>
            ))}
          </span>
          <span className="font-garamond font-light italic leading-[1.3]">
            {bottomHeadlineTail.split("").map((character, index) => {
              const charIndex = bottomHeadlineLead.length + index;

              return (
                <span
                  key={`tail-${character}-${index}`}
                  ref={(element) => {
                    if (element) {
                      bottomCharRefs.current[charIndex] = element;
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
      </div>

      {/* Bottom line divider */}
      <div className="absolute bottom-0 left-7 right-7 h-[2px] z-20">
        <Image src="/images/line-divider.svg" alt="" fill className="object-cover" />
      </div>
    </section>
  );
}
