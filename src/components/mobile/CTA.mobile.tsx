"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function CTAMobile() {
  const ref = useRef<HTMLElement | null>(null);
  const [splitPercent, setSplitPercent] = useState(0);
  const [overlayColor, setOverlayColor] = useState("#e11");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setSplitPercent(100);
      setOverlayColor("#000");
      return;
    }

    let rafId = 0;

    const onScroll = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      let progress = (window.innerHeight - rect.top) / total;
      progress = Math.max(0, Math.min(1, progress));
      const percent = Math.round(progress * 100);

      setSplitPercent(percent);
      setOverlayColor(percent >= 100 ? "#000" : "#e11");
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
      className="relative w-full min-h-svh bg-bg overflow-hidden"
      style={{ ["--split" as any]: `${splitPercent}%`, ["--overlay-color" as any]: overlayColor }}
    >
      <div aria-hidden className="absolute top-0 left-0 bottom-0 bg-[#e11] transition-width duration-150" style={{ width: "var(--split)" }} />

      <div className="relative z-10 flex items-center justify-center min-h-svh px-6">
        <h2 className="font-garamond uppercase tracking-[-0.8px] leading-[0.95] text-center" style={{ fontSize: "clamp(28px, 8.5vw, 48px)" }}>
          <span className="block text-[#111]">BE THE ONE WHO</span>
          <span className="block text-[#111]">DEFENDS</span>

          <span aria-hidden className="absolute inset-0 pointer-events-none">
            <span className="absolute inset-0 font-garamond uppercase leading-[0.95]" style={{ fontSize: "clamp(28px, 8.5vw, 48px)", clipPath: "inset(0 0 0 calc(100% - var(--split)))", color: "var(--overlay-color)", transition: "color 250ms linear" }}>
              <span className="block">BE THE ONE WHO</span>
              <span className="block">DEFENDS</span>
            </span>
          </span>
        </h2>
      </div>

      <div className="absolute bottom-0 left-7 right-7 h-[2px]">
        <Image src="/images/line-divider.svg" alt="" fill className="object-cover" />
      </div>
      {/* DEBUG: show split percent (temporary) */}
      <div className="fixed right-3 top-16 z-[9999] bg-black/60 text-white px-2 py-1 rounded-md text-xs">
        <strong>split:</strong>&nbsp;{splitPercent}%
      </div>
    </section>
  );
}
