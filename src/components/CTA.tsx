"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function CTA() {
  const ref = useRef<HTMLElement | null>(null);
  const [splitPercent, setSplitPercent] = useState(0);
  const [overlayColor, setOverlayColor] = useState("#e11");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setSplitPercent(100);
      setOverlayColor("#000");
      setIsSticky(false);
      return;
    }
    

    let rafId = 0;

    const onScroll = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      let progress = (window.innerHeight - rect.top) / total; // when rect.top==window.innerHeight => 0; when rect.top==-rect.height => 1
      progress = Math.max(0, Math.min(1, progress));
      const percent = Math.round(progress * 100);

      // Apply sticky manually when section is in viewport (desktop only)
      const inViewport = rect.top <= window.innerHeight && rect.bottom >= 0;
      const isDesktop = window.innerWidth >= 768;
      // Sticky should be active while animation is running and while in viewport
      const shouldStick = isDesktop && inViewport && percent < 100;

      setSplitPercent(percent);
      setOverlayColor(percent >= 100 ? "#000" : "#e11");
      setIsSticky(shouldStick);
    };

    const handle = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(onScroll);
    };
    

    window.addEventListener("scroll", handle, { passive: true });
    window.addEventListener("resize", handle);
    handle();

    return () => {
      window.removeEventListener("scroll", handle);
      window.removeEventListener("resize", handle);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="work"
      ref={ref}
      className="relative w-full bg-bg"
      style={{
        ["--split" as any]: `${splitPercent}%`,
        ["--overlay-color" as any]: overlayColor,
        position: isSticky ? "sticky" : undefined,
        top: isSticky ? 0 : undefined,
        height: isSticky ? "100svh" : undefined,
        overflow: isSticky ? "hidden" : undefined,
      }}
    >
      {/* Left expanding red panel */}
      <div aria-hidden className="absolute top-0 left-0 bottom-0 bg-[#e11] transition-width duration-150" style={{ width: "var(--split)" }} />

      {/* Background image for subtle texture */}
      <div className="absolute inset-0 opacity-0 pointer-events-none">
        <Image src="/images/work-bg.png" alt="" fill className="object-cover" />
      </div>

      {/* Headline with overlay that follows split */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-6">
        <div className="max-w-[900px] w-full text-center">
          <h2 className="relative font-garamond uppercase tracking-[-1px] leading-[0.95]" style={{ fontSize: "clamp(40px, 8vw, 96px)" }}>
            <span className="block text-[#111]">BE THE ONE WHO</span>
            <span className="block text-[#111]">DEFINES THE SKY</span>

            <span aria-hidden className="absolute inset-0 pointer-events-none">
              <span className="absolute inset-0 font-garamond uppercase leading-[0.95]" style={{ fontSize: "clamp(40px, 8vw, 96px)", clipPath: "inset(0 0 0 calc(100% - var(--split)))", color: "var(--overlay-color)", transition: "color 250ms linear" }}>
                <span className="block">BE THE ONE WHO</span>
                <span className="block">DEFINES THE SKY</span>
              </span>
            </span>
          </h2>
        </div>
      </div>

      {/* DEBUG: show split percent (temporary) */}
      

      {/* Bottom divider to match other sections */}
      <div className="absolute bottom-0 left-[8%] right-[8%] h-[2px]">
        <Image src="/images/line-divider.svg" alt="" fill className="object-cover" />
      </div>
    </section>
  );
}
