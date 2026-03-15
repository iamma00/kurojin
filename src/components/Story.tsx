"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const storyBodyText =
  "Every brand begins with a story. We shape that story into a powerful Brand Identity, bring it to life through mindful Design, craft visuals with Product Shoots & immersive 3D Content, build your presence with high-impact Web Experiences, and finally set the momentum through strategic Social Media.";
const bottomHeadlineLead = "We Care How ";
const bottomHeadlineTail = "The World Sees It";

export default function Story() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const topHeadlineRef = useRef<HTMLParagraphElement | null>(null);
  const bodyTextRef = useRef<HTMLParagraphElement | null>(null);
  const bodyCharRefs = useRef<HTMLSpanElement[]>([]);
  const bottomHeadlineRef = useRef<HTMLParagraphElement | null>(null);
  const bottomCharRefs = useRef<HTMLSpanElement[]>([]);
  const dropTextRef = useRef<HTMLParagraphElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  bodyCharRefs.current = [];
  bottomCharRefs.current = [];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(topHeadlineRef.current, { opacity: 0, y: 70, filter: "blur(8px)" });
      gsap.set(bodyTextRef.current, { opacity: 0, y: 45, filter: "blur(10px)" });
      gsap.set(bodyCharRefs.current, { opacity: 0 });
      gsap.set(bottomHeadlineRef.current, { opacity: 1 });
      gsap.set(bottomCharRefs.current, { opacity: 0, y: -65, filter: "blur(8px)" });
      gsap.set(dropTextRef.current, {
        yPercent: -145,
        scale: 0.42,
        opacity: 0,
        transformOrigin: "50% 0%",
      });
      gsap.set(lineRef.current, { opacity: 0.15 });

      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 0.55,
          pin: true,
          anticipatePin: 1,
        },
      });

      if (bgRef.current) {
        timeline.fromTo(
          bgRef.current,
          { scale: 1.15, yPercent: -6 },
          { scale: 1, yPercent: 6, duration: 4 },
          0
        );
      }

      if (topHeadlineRef.current) {
        timeline
          .fromTo(
            topHeadlineRef.current,
            { opacity: 0, y: 70, filter: "blur(8px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.28 },
            0.2
          );
      }

      if (bodyTextRef.current) {
        timeline.fromTo(
          bodyTextRef.current,
          { opacity: 0, y: 45, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.2 },
          ">"
        );
      }

      if (bodyCharRefs.current.length > 0) {
        timeline.fromTo(
          bodyCharRefs.current,
          { opacity: 0 },
          {
            opacity: 1,
            stagger: 0.008,
            duration: 0.18,
          },
          ">"
        );
      }

      if (bottomCharRefs.current.length > 0) {
        timeline.to(
          bottomCharRefs.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.3,
            stagger: 0.022,
            ease: "power2.out",
          },
          ">"
        );
      }

      if (dropTextRef.current) {
        timeline
          .fromTo(
            dropTextRef.current,
            {
              yPercent: -145,
              scale: 0.42,
              opacity: 0,
              transformOrigin: "50% 0%",
            },
            {
              yPercent: -22,
              scale: 1.15,
              opacity: 0.28,
              duration: 0.9,
            },
            2.65
          )
          .to(
            dropTextRef.current,
            {
              yPercent: 48,
              scale: 2.95,
              opacity: 0.42,
              ease: "power2.out",
              duration: 1.2,
            },
            3.15
          );
      }

      if (lineRef.current) {
        timeline.fromTo(
          lineRef.current,
          { opacity: 0.15 },
          { opacity: 1, duration: 0.4 },
          3.45
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-bg overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#080808]" />
        <div ref={bgRef} className="absolute inset-0 overflow-hidden will-change-transform">
          <Image
            src="/images/story-bg.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgb(0,0,0) 0%, rgba(0,0,0,0) 25.8%), linear-gradient(0deg, rgb(0,0,0) 0%, rgba(0,0,0,0) 20.1%), linear-gradient(90deg, rgba(0,0,0,0.06) 8.3%, rgb(1,1,1) 33.5%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-[8%] gap-y-15">
        <p
          ref={topHeadlineRef}
          className="text-off-white text-[40px] font-garamond tracking-[-0.8px] whitespace-nowrap"
          style={{
            textShadow: "0px 0px 40.9px rgba(255,236,185,0.6)",
          }}
        >
          <span className="font-normal leading-[1.4] tracking-[-0.32px]">Your focus is on what </span><span className="font-bold italic uppercase">you build.</span>
        </p>

        <p
          ref={bodyTextRef}
          className="text-white text-[15px] font-light leading-[1.4] max-w-[683px] blur-[0.5px] "
          style={{
            textShadow: "0px 0px 33px rgba(255,255,255,0.3)",
          }}
        >
          {storyBodyText.split("").map((character, index) => (
            <span
              key={`${character}-${index}`}
              ref={(element) => {
                if (element) {
                  bodyCharRefs.current[index] = element;
                }
              }}
              className="inline-block opacity-[0] will-change-transform"
            >
              {character === " " ? "\u00A0" : character}
            </span>
          ))}
        </p>

        <p
          ref={bottomHeadlineRef}
          className="absolute bottom-[8%] left-1/2 -translate-x-1/2 text-white text-[80px] tracking-[-0.8px] uppercase whitespace-nowrap"
          style={{
            textShadow: "0px 0px 45.2px rgba(255,236,185,0.28)",
          }}
        >
          <span className="font-garamond font-light leading-[1.4]">
            {bottomHeadlineLead.split("").map((character, index) => (
              <span
                key={`lead-${character}-${index}`}
                ref={(element) => {
                  if (element) {
                    bottomCharRefs.current[index] = element;
                  }
                }}
                className="inline-block will-change-transform"
              >
                {character === " " ? "\u00A0" : character}
              </span>
            ))}
          </span>
          <span className="font-garamond font-light italic leading-[1.4]">
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
                  className="inline-block will-change-transform"
                >
                  {character === " " ? "\u00A0" : character}
                </span>
              );
            })}
          </span>
        </p>
      </div>

      {/* Bottom line divider */}
      <div ref={lineRef} className="absolute bottom-[-2px] left-[8%] right-[8%] h-[2px] z-20">
        <Image
          src="/images/line-divider.svg"
          alt=""
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
