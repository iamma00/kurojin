"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import GlassSurface from "@/components/GlassSurface";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: string;
  title: string;
  tag: string;
  year: string;
  stack: string;
  status: "LIVE" | "BUILDING" | "ARCHIVED";
  href?: string;
};

const PROJECTS: Project[] = [
  {
    id: "01",
    title: "KUROJIN",
    tag: "Creative studio platform",
    year: "2026",
    stack: "Next.js · GSAP · GlassSurface",
    status: "BUILDING",
  },
  {
    id: "02",
    title: "Slide",
    tag: "AI Instagram automation",
    year: "2025",
    stack: "Next.js 14 · Prisma · OpenAI",
    status: "LIVE",
    href: "https://slide-pearl.vercel.app",
  },
  {
    id: "03",
    title: "Cluster Ops",
    tag: "Hadoop / Cloudera infra tooling",
    year: "2025",
    stack: "Linux · AWS · OCI",
    status: "LIVE",
  },
  {
    id: "04",
    title: "Field Notes",
    tag: "Selected writing & experiments",
    year: "2026",
    stack: "MDX · Edge functions",
    status: "ARCHIVED",
  },
];

const STATUS_COLOR: Record<Project["status"], string> = {
  LIVE: "text-data",
  BUILDING: "text-signal",
  ARCHIVED: "text-muted",
};

export default function PortfolioPage() {
  const root = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // hero entrance
      gsap.from(".hero-line", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
      });

      if (!reduceMotion) {
        // parallax rack cards — each layer drifts at a different rate on scroll
        cardsRef.current.forEach((card, i) => {
          if (!card) return;
          const depth = (i % 2 === 0 ? 1 : -1) * (40 + i * 10);

          gsap.to(card, {
            y: depth,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });

          gsap.from(card, {
            opacity: 0,
            y: 60,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });
      }

      // section reveals
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} id="top" className="bg-void text-ink">
      {/* ---------- HERO ---------- */}
      <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-10 pt-32 pb-20 overflow-hidden">
        <p className="hero-line mono-label mb-6">
          PUNE, IN · CLUSTERS ONLINE: 12 · UPTIME: 5Y
        </p>
        <h1 className="hero-line font-display text-[14vw] md:text-[7vw] leading-[0.9] tracking-tight">
          Selected
          <br />
          Work
        </h1>
        <p className="hero-line mt-8 max-w-md text-muted text-base md:text-lg">
          Infrastructure engineering and interface design, run from the same
          terminal. A log of what got shipped, racked, and pushed to
          production.
        </p>
      </section>

      {/* ---------- PARALLAX PROJECT RACK ---------- */}
      <section className="relative px-6 md:px-10 py-24 md:py-40 space-y-10 md:space-y-16">
        <p className="reveal mono-label mb-4">WORK / 0{PROJECTS.length} RACKED</p>

        {PROJECTS.map((p, i) => (
          <div
            key={p.id}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className="will-change-transform"
          >
            <motion.a
              href={p.href ?? "#"}
              whileHover={{ scale: p.href ? 1.01 : 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="block"
            >
              <GlassSurface
                borderRadius={20}
                className="!w-full px-6 md:px-10 py-8 md:py-10"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex items-baseline gap-5">
                    <span className="mono-label text-signal">{p.id}</span>
                    <h3 className="font-display text-3xl md:text-5xl tracking-tight">
                      {p.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <span className="text-muted text-sm md:text-base">
                      {p.tag}
                    </span>
                    <span className="mono-label">{p.stack}</span>
                    <span className="mono-label">{p.year}</span>
                    <span className={`mono-label ${STATUS_COLOR[p.status]}`}>
                      ● {p.status}
                    </span>
                  </div>
                </div>
              </GlassSurface>
            </motion.a>
          </div>
        ))}
      </section>

      {/* ---------- CLOSING / CTA ---------- */}
      <section className="reveal px-6 md:px-10 py-32 border-t border-line">
        <p className="mono-label mb-6">CONTACT</p>
        <h2 className="font-display text-[10vw] md:text-[5vw] leading-[0.95] tracking-tight max-w-3xl">
          Got a cluster to fix, or an interface to build?
        </h2>
        <motion.a
          href="mailto:hello@example.com"
          whileHover={{ x: 6 }}
          className="inline-flex items-center gap-3 mt-10 mono-label text-data"
        >
          hello@example.com →
        </motion.a>
      </section>
    </div>
  );
}