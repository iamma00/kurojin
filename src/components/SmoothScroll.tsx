"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    let locomotive: any = null;
    let refreshHandler: (() => void) | null = null;

    const setup = async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      locomotive = new LocomotiveScroll({
        lenisOptions: {
          duration: 0.8,
          lerp: 0.1,
          smoothWheel: true,
          syncTouch: true,
          wheelMultiplier: 1.25,
          touchMultiplier: 1.15,
        },
        scrollCallback: () => {
          ScrollTrigger.update();
        },
      });

      refreshHandler = () => locomotive?.resize();
      ScrollTrigger.addEventListener("refresh", refreshHandler);
      ScrollTrigger.refresh();
    };

    setup();

    return () => {
      if (refreshHandler) {
        ScrollTrigger.removeEventListener("refresh", refreshHandler);
      }
      ScrollTrigger.clearScrollMemory();
      locomotive?.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} data-scroll-container>
      {children}
    </div>
  );
}
