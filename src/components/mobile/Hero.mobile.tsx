"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function HeroMobile() {
  // Disable decorative animations when user prefers reduced motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq && mq.matches) {
      // disable CSS animations on elements that use animate- classes
      const els = document.querySelectorAll("[class*='animate-']");
      els.forEach((el) => {
        (el as HTMLElement).style.animation = "none";
      });
    }
  }, []);
  return (
    <section role="region" aria-label="Hero" className="relative w-full min-h-svh flex flex-col overflow-hidden bg-[#080808]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          className="object-cover rotate-180 scale-[1.05]"
          priority
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(129,196,255,0.18),transparent_34%),radial-gradient(circle_at_78%_20%,rgba(255,102,102,0.16),transparent_36%),linear-gradient(180deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.22)_42%,rgba(0,0,0,0.72)_100%)]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-[max(env(safe-area-inset-top),28px)] gap-5">
        {/* KUROJIN. studio — mobile-first dramatic sizing */}
        <div
          className="flex items-baseline gap-1.5 animate-[fadeSlideUp_0.8s_ease-out_both]"
          style={{
            textShadow:
              "0px 0px 25px rgba(255,189,136,0.37), -0.8px 0.8px 2.8px rgba(255,0,4,0.5), 0.8px -1.7px 1.7px rgba(0,178,255,0.53)",
          }}
        >
          <span className="font-garamond font-bold italic text-[clamp(46px,14vw,62px)] text-white uppercase tracking-[-2.2px] leading-none">
            Kurojin.
          </span>
          <span className="font-garamond italic text-[15px] text-white/82 ml-[-1px]">
            studio
          </span>
        </div>

        {/* Icon + kanji */}
        <div className="flex items-center gap-2.5 animate-[fadeSlideUp_0.8s_ease-out_0.2s_both]">
          <div className="relative w-[44px] h-[30px]">
            <Image
              src="/images/kuro-icon.png"
              alt="Kurojin"
              fill
              className="object-contain"
            />
          </div>
          <span
            className="font-montserrat text-[20px] text-white tracking-[-0.5px]"
            style={{
              textShadow:
                "0px 0px 30.4px rgba(255,189,136,0.37), -1px 1px 3.4px rgba(255,0,4,0.5), 1px -2px 2px rgba(0,178,255,0.53)",
            }}
          >
            黒人
          </span>
        </div>

        {/* Tagline */}
        <p
          className="text-white text-[clamp(16px,4.6vw,20px)] font-garamond tracking-[-0.34px] text-center leading-[1.5] max-w-[320px] animate-[fadeSlideUp_0.8s_ease-out_0.4s_both]"
          style={{
            textShadow:
              "0px 0px 30.4px rgba(255,189,136,0.37), -1px 1px 3.4px rgba(255,0,4,0.5), 1px -2px 2px rgba(0,178,255,0.53)",
          }}
        >
          <span className="font-normal">Ordinary isn&apos;t in our </span>
          <span className="font-bold italic uppercase">vocabulary.</span>
        </p>
      </div>

      {/* Bottom section — pinned to bottom with safe area */}
      <div className="relative z-10 pb-[max(env(safe-area-inset-bottom),22px)] px-6 flex flex-col items-center gap-3 animate-[fadeSlideUp_0.8s_ease-out_0.5s_both]">
        <p
          className="text-white/88 text-[13px] font-light leading-[1.6] text-center max-w-[292px]"
          style={{
            textShadow:
              "0px 4px 4px rgba(0,0,0,0.25), 0px 0px 12px #ffe0c8",
          }}
        >
          A full-spectrum creative partner for modern brands.
        </p>
        <div className="relative w-[70px] h-[34px] mix-blend-plus-lighter">
          <Image src="/images/decor-hero.png" alt="" fill className="object-cover" />
        </div>
      </div>

      {/* Bottom line divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] z-20">
        <Image src="/images/line-divider-full.svg" alt="" fill className="object-cover" />
      </div>
    </section>
  );
}
