"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import BlurText from "../BlurText";
import TextType from "../TextType";

const storyBodyText =
  "Every brand begins with a story. We shape that story into a powerful Brand Identity, bring it to life through mindful Design, craft visuals with Product Shoots & immersive 3D Content, build your presence with high-impact Web Experiences, and finally set the momentum through strategic Social Media.";
const bottomHeadlineLead = "We Care How ";
const bottomHeadlineTail = "The World Sees It";
const bottomTypingSpeed = 22;
const bottomTailDelay = bottomHeadlineLead.length * bottomTypingSpeed;

export default function StoryMobile() {
  const sectionRef = useRef<HTMLElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [startSequence, setStartSequence] = useState(false);
  const [showBody, setShowBody] = useState(false);
  const [showBottom, setShowBottom] = useState(false);

  useEffect(() => {
    const triggerSequenceOnScroll = () => {
      if (!sectionRef.current || startSequence) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportTrigger = window.innerHeight * 0.8;

      if (rect.top <= viewportTrigger) {
        setStartSequence(true);

        timeoutsRef.current.push(
          setTimeout(() => {
            setShowBody(true);
          }, 320)
        );
      }
    };

    window.addEventListener("scroll", triggerSequenceOnScroll, { passive: true });
    window.addEventListener("resize", triggerSequenceOnScroll);
    triggerSequenceOnScroll();

    return () => {
      window.removeEventListener("scroll", triggerSequenceOnScroll);
      window.removeEventListener("resize", triggerSequenceOnScroll);
      timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [startSequence]);

  return (
    <section ref={sectionRef} className="relative w-full min-h-svh bg-bg overflow-hidden flex flex-col">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#080808]" />
        <div className="absolute inset-0 overflow-hidden">
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

      <p
        className={`pointer-events-none absolute inset-x-0 top-[16%] z-[6] text-center font-garamond text-[clamp(2.7rem,18vw,6rem)] font-semibold uppercase tracking-[-0.05em] text-[#dcdcdc]/35 transition-all duration-1000 ease-out ${
          startSequence ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{
          textShadow: "0px 0px 32px rgba(255,236,185,0.18)",
        }}
      >
        KUROJIN
      </p>

      {/* Text content */}
      <div className="relative z-10 mt-auto mb-auto px-7 py-16 flex flex-col items-center text-center gap-5">
        <p
          className={`text-off-white text-[26px] font-garamond tracking-[-0.6px] transition-all duration-500 ease-out ${
            startSequence ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-6 blur-sm"
          }`}
          style={{ textShadow: "0px 0px 40.9px rgba(255,236,185,0.6)" }}
        >
          <span className="font-normal leading-[1.3]">Your focus is on what </span>
          <span className="font-bold italic uppercase">you build.</span>
        </p>

        <div className="min-h-[164px] max-w-[340px]">
          {showBody ? (
            <BlurText
              text={storyBodyText}
              delay={24}
              animateBy="words"
              direction="top"
              stepDuration={0.18}
              className="text-white/85 text-[13px] font-light leading-[1.7]"
              onAnimationComplete={() => setShowBottom(true)}
            />
          ) : null}
        </div>

        <p
          className="text-white text-[22px] tracking-[-0.5px] uppercase mt-1 min-h-[60px]"
          style={{ textShadow: "0px 0px 45.2px rgba(255,236,185,0.28)" }}
        >
          <TextType
            text={showBottom ? bottomHeadlineLead : ""}
            as="span"
            typingSpeed={bottomTypingSpeed}
            pauseDuration={1500}
            deletingSpeed={50}
            loop={false}
            startOnVisible={false}
            showCursor={false}
            reverseMode={false}
            className="font-garamond font-light leading-[1.3]"
          />
          <TextType
            text={showBottom ? bottomHeadlineTail : ""}
            as="span"
            typingSpeed={bottomTypingSpeed}
            pauseDuration={1500}
            deletingSpeed={50}
            loop={false}
            startOnVisible={false}
            showCursor={false}
            reverseMode={false}
            initialDelay={bottomTailDelay}
            className="font-garamond font-light italic leading-[1.3]"
          />
        </p>
      </div>

      {/* Bottom line divider */}
      <div className="absolute bottom-0 left-7 right-7 h-[2px] z-20">
        <Image src="/images/line-divider.svg" alt="" fill className="object-cover" />
      </div>
    </section>
  );
}
