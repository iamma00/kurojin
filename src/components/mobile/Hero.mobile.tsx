"use client";

import Image from "next/image";

export default function HeroMobile() {
  return (
    <section className="relative w-full min-h-svh flex flex-col overflow-hidden bg-[#0c0c0c]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          className="object-cover rotate-180"
          priority
        />
        {/* Darkened overlay for better text legibility on mobile */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Main content — vertically centered with stagger reveal */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-7 gap-5">
        {/* KUROJIN. studio — mobile-first dramatic sizing */}
        <div
          className="flex items-baseline gap-1 animate-[fadeSlideUp_0.8s_ease-out_both]"
          style={{
            textShadow:
              "0px 0px 25px rgba(255,189,136,0.37), -0.8px 0.8px 2.8px rgba(255,0,4,0.5), 0.8px -1.7px 1.7px rgba(0,178,255,0.53)",
          }}
        >
          <span className="font-garamond font-bold italic text-[52px] text-white uppercase tracking-[-2px] leading-none">
            Kurojin.
          </span>
          <span className="font-garamond italic text-[15px] text-white/80 ml-[-2px]">
            studio
          </span>
        </div>

        {/* Thin accent line — mobile-only element */}
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[fadeSlideUp_0.8s_ease-out_0.15s_both]" />

        {/* Icon + kanji */}
        <div className="flex items-center gap-2.5 animate-[fadeSlideUp_0.8s_ease-out_0.25s_both]">
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
          className="text-white text-[17px] font-garamond tracking-[-0.3px] text-center leading-[1.5] animate-[fadeSlideUp_0.8s_ease-out_0.4s_both]"
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
      <div className="relative z-10 pb-[max(env(safe-area-inset-bottom),24px)] px-7 flex flex-col items-center gap-4 animate-[fadeSlideUp_0.8s_ease-out_0.55s_both]">
        <p
          className="text-white/90 text-[13px] font-light leading-[1.6] text-center max-w-[280px]"
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

        {/* Scroll hint — mobile-only bouncing chevron */}
        <div className="mt-2 animate-bounce">
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none" className="opacity-50">
            <path d="M1 1L8 8L15 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Bottom line divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] z-20">
        <Image src="/images/line-divider-full.svg" alt="" fill className="object-cover" />
      </div>
    </section>
  );
}
