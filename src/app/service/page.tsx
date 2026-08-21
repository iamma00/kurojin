"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Code2,
  Globe,
  Layers3,
  Rocket,
  Sparkles,
  Workflow,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import SvcParallax from "@/components/SvcParallax";

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────────
   BLUEPRINT — technical spec-sheet theme
   accent: electric cyan #22d3ee / base #030303
   generous whitespace per user request
   ──────────────────────────────────────────────── */

const CYAN = "#22d3ee";

const services = [
  {
    number: "01",
    title: "Brand Systems",
    description:
      "Positioning, visual language, messaging structure, and digital identity systems designed to make your product feel coherent from the first impression to the final interaction.",
    icon: Sparkles,
    items: ["Identity direction", "Messaging structure", "Design language"],
  },
  {
    number: "02",
    title: "Web Design",
    description:
      "Minimal, modern websites with strong hierarchy, better spacing, clear motion, and layouts that feel deliberate instead of template-driven.",
    icon: Globe,
    items: ["Landing pages", "Portfolio sites", "Marketing websites"],
  },
  {
    number: "03",
    title: "Product Design",
    description:
      "Interfaces shaped around usability, conversion, and clarity — designed to remove friction and make complex products easier to understand.",
    icon: Layers3,
    items: ["UX systems", "Dashboards", "Design refinement"],
  },
  {
    number: "04",
    title: "Development",
    description:
      "Fast, scalable frontend and full-stack implementation using modern tooling, with an emphasis on maintainability, performance, and clean component systems.",
    icon: Code2,
    items: ["Next.js builds", "Full-stack apps", "Performance optimization"],
  },
  {
    number: "05",
    title: "Automation",
    description:
      "Operational workflows, integrations, and backend processes that reduce repetitive work and help teams move with less manual overhead.",
    icon: Workflow,
    items: ["API integrations", "Internal workflows", "Process automation"],
  },
  {
    number: "06",
    title: "Launch Support",
    description:
      "Structured support before and after launch to ensure the product ships with confidence, stays polished, and continues improving after release.",
    icon: Rocket,
    items: ["QA review", "Launch planning", "Post-launch iteration"],
  },
];

const process = [
  { step: "01", title: "Discover", body: "We dig into your brand, audience, and goals before a single pixel moves." },
  { step: "02", title: "Design", body: "Identity, layout, and motion — one coherent visual language, explored in variants." },
  { step: "03", title: "Build", body: "Clean, performant implementation. Fast loads, smooth interactions, no shortcuts." },
  { step: "04", title: "Launch & Refine", body: "We ship with confidence, then keep sharpening after release." },
];

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Landing pages ship in 2–3 weeks. Full brand systems and multi-page experiences run 4–8 weeks depending on scope. We set the timeline in discovery and hold it.",
  },
  {
    q: "What does an engagement cost?",
    a: "Budgets change; standards don't. We scope to your number and refine the output — never the excellence. You get less volume before you get less quality.",
  },
  {
    q: "Do you work with early-stage brands?",
    a: "Yes. Some of our best work started as a blank page and a strong story. We shape identity, web, and motion around it — all under one roof.",
  },
  {
    q: "Can you take over an existing site?",
    a: "We audit, then rebuild or refine. If the foundation is sound we elevate it; if it fights the brand, we replace it with something considered.",
  },
  {
    q: "What happens after launch?",
    a: "We stay on. Post-launch iteration, performance tuning, and content systems keep the site alive instead of frozen in time.",
  },
];

const capabilities = [
  "Brand Identity",
  "Web Design",
  "Development",
  "2D Illustration",
  "3D Content",
  "Motion Graphics",
  "Product Shoots",
  "Social Media",
  "Packaging",
  "Campaign Direction",
];

export default function Service() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [openSvc, setOpenSvc] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-bp-reveal]",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" }
      );
      gsap.utils.toArray<HTMLElement>("[data-bp-section]").forEach((sec) => {
        gsap.fromTo(
          sec.querySelectorAll("[data-bp-item]"),
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: sec, start: "top 78%" },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <SmoothScrollProvider>
      <div ref={rootRef} className="relative bg-[#030303] text-white">
        {/* blueprint grid lines backdrop */}
        <div
          className="pointer-events-none fixed inset-0 z-0 opacity-[0.05]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(to right, #22d3ee 1px, transparent 1px), linear-gradient(to bottom, #22d3ee 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <Navbar />

        {/* ══════════ 1. HERO — spec-sheet header (generous space) ══════════ */}
        <section className="relative z-10 pt-52 pb-36 md:pt-60 md:pb-44">
          <div className="k-container">
            <p
              data-bp-reveal
              className="mb-10 font-montserrat text-[11px] uppercase tracking-[0.4em] text-[#22d3ee]"
            >
              Services / Specification 黒人
            </p>
            <h1
              data-bp-reveal
              className="k-display k-safe max-w-[1100px] font-garamond text-white"
            >
              <span className="font-normal">Built with clarity,</span>
              <br />
              <span className="font-bold italic text-[#22d3ee]">restraint, and intent.</span>
            </h1>
            <p
              data-bp-reveal
              className="mt-12 max-w-[560px] text-[15px] font-light leading-[1.75] text-white/60 md:text-[17px]"
            >
              Six disciplines, one specification: reduce noise, improve clarity,
              and make the final product feel considered at every layer.
            </p>

            {/* drawing title block */}
            <div
              data-bp-reveal
              className="mt-20 grid grid-cols-2 border border-white/15 md:grid-cols-4"
            >
              {[
                { k: "REV", v: "04 — 2026" },
                { k: "SCOPE", v: "Full-stack creative" },
                { k: "STATUS", v: "Accepting projects" },
                { k: "SHEET", v: "01 / 01" },
              ].map((cell, i) => (
                <div
                  key={cell.k}
                  className={`px-6 py-5 ${i > 0 ? "border-l border-white/15" : ""} ${
                    i >= 2 ? "border-t border-white/15 md:border-t-0" : ""
                  }`}
                >
                  <p className="font-montserrat text-[10px] uppercase tracking-[0.3em] text-white/35">
                    {cell.k}
                  </p>
                  <p className="mt-2 font-montserrat text-[13px] uppercase tracking-[0.12em] text-white/85">
                    {cell.v}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ 2. SERVICE MODULES — full-width expanding rows ══════════ */}
        <section data-bp-section className="relative z-10 py-28 md:py-36">
          <div className="k-container">
            <p data-bp-item className="mb-16 font-montserrat text-[11px] uppercase tracking-[0.4em] text-white/40">
              Modules — 06
            </p>

            <div className="border-b border-white/12">
              {services.map((service, i) => {
                const Icon = service.icon;
                const open = openSvc === i;
                return (
                  <div key={service.number} data-bp-item className="border-t border-white/12">
                    <button
                      onClick={() => setOpenSvc(open ? null : i)}
                      aria-expanded={open}
                      className="group flex w-full cursor-pointer items-center justify-between gap-6 py-14 text-left md:py-16"
                    >
                      <span className="flex items-baseline gap-6 md:gap-10 min-w-0">
                        <span className="font-montserrat text-[12px] tracking-[0.25em] text-[#22d3ee]/70 shrink-0">
                          M.{service.number}
                        </span>
                        <span
                          className={`font-garamond text-[clamp(28px,4.5vw,60px)] leading-none tracking-[-0.02em] transition-all duration-500 ${
                            open
                              ? "italic text-white"
                              : "text-white/75 group-hover:text-white group-hover:translate-x-2"
                          }`}
                        >
                          {service.title}
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-5">
                        <span
                          className={`hidden h-12 w-12 items-center justify-center rounded-full border transition-all duration-500 md:flex ${
                            open
                              ? "border-[#22d3ee]/60 text-[#22d3ee] rotate-45"
                              : "border-white/15 text-white/50 group-hover:border-white/40"
                          }`}
                        >
                          {open ? (
                            <span className="text-[20px] leading-none -rotate-45">+</span>
                          ) : (
                            <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                          )}
                        </span>
                        <span
                          className={`text-[26px] transition-all duration-500 ${
                            open ? "rotate-45 text-[#22d3ee]" : "text-white/30 group-hover:text-white/70"
                          }`}
                        >
                          +
                        </span>
                      </span>
                    </button>

                    <div
                      className="grid transition-all duration-500 ease-out"
                      style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <div className="grid gap-10 pb-16 md:grid-cols-[1.4fr_1fr] md:gap-16 md:pl-[104px]">
                          <p className="max-w-[640px] text-[15px] font-light leading-[1.8] text-white/60">
                            {service.description}
                          </p>
                          <ul className="space-y-3 border-l border-[#22d3ee]/20 pl-6">
                            {service.items.map((item) => (
                              <li
                                key={item}
                                className="flex items-center gap-3 font-montserrat text-[12px] uppercase tracking-[0.18em] text-white/70"
                              >
                                <span className="h-1 w-4 bg-[#22d3ee]/60" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════ 2.5 DELIVERABLES — parallax cards ══════════ */}
        <SvcParallax
          cards={[
            { tag: "Identity", title: "Brand guidelines", body: "A living spec: logo systems, type, color, motion behavior — documented so any team can execute it.", image: "/images/work/06.jpg" },
            { tag: "Web", title: "Production sites", body: "Shipped Next.js builds with animation systems, CMS hooks, and performance budgets already met.", image: "/images/work/07.jpg" },
            { tag: "Motion", title: "Animation kits", body: "Loops, transitions, and social-ready motion assets cut for every platform's aspect ratio.", image: "/images/work/05.jpg" },
            { tag: "2D / 3D", title: "Visual content", body: "Illustration, renders, and product shots — one art direction across every dimension.", image: "/images/work/04.jpg" },
            { tag: "Social", title: "Content systems", body: "Template logic + launch calendars so the feed stays sharp after we hand it over.", image: "/images/work/08.jpg" },
            { tag: "Support", title: "Iteration retainers", body: "Post-launch tuning, A/B visuals, and new pages as your product evolves.", image: "/images/work/09.jpg" },
          ]}
        />

        {/* ══════════ 3. PROCESS — numbered rail ══════════ */}
        <section data-bp-section className="relative z-10 border-t border-white/10 py-28 md:py-36">
          <div className="k-container">
            <p data-bp-item className="mb-6 font-montserrat text-[11px] uppercase tracking-[0.4em] text-white/40">
              Procedure
            </p>
            <h2 data-bp-item className="k-display-sm k-safe max-w-[760px] font-garamond text-white">
              <span className="font-normal">One core, </span>
              <span className="font-bold italic text-[#22d3ee]">all dimensions.</span>
            </h2>

            <div className="relative mt-24">
              {/* connecting line */}
              <div className="absolute left-0 right-0 top-[26px] hidden h-px bg-white/12 lg:block" />
              <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                {process.map((p) => (
                  <div key={p.step} data-bp-item className="relative">
                    <span className="relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#22d3ee]/40 bg-[#030303] font-montserrat text-[12px] tracking-[0.2em] text-[#22d3ee]">
                      {p.step}
                    </span>
                    <h3 className="mt-8 font-garamond text-[24px] text-white">{p.title}</h3>
                    <p className="mt-4 max-w-[280px] text-[13px] font-light leading-7 text-white/55">
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ 4. CAPABILITIES MARQUEE ══════════ */}
        <section className="relative z-10 w-full overflow-hidden border-y border-white/10 py-16 md:py-20">
          <div className="flex w-max animate-marquee">
            {[...capabilities, ...capabilities].map((cap, i) => (
              <span
                key={`${cap}-${i}`}
                className="whitespace-nowrap px-8 font-garamond text-[28px] uppercase leading-none text-white/80 italic md:text-[42px]"
              >
                {cap} <span className="not-italic text-[#22d3ee]/80">✦</span>
              </span>
            ))}
          </div>
        </section>

        {/* ══════════ 5. FAQ — blueprint accordion ══════════ */}
        <section data-bp-section className="relative z-10 py-28 md:py-36">
          <div className="k-container">
            <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
              <div>
                <p data-bp-item className="mb-6 font-montserrat text-[11px] uppercase tracking-[0.4em] text-white/40">
                  Questions
                </p>
                <h2 data-bp-item className="k-display-sm k-safe font-garamond text-white">
                  <span className="font-normal">Asked before </span>
                  <span className="font-bold italic text-[#22d3ee]">every project.</span>
                </h2>
                <p data-bp-item className="mt-8 max-w-[400px] text-[14px] font-light leading-7 text-white/55">
                  The honest answers, up front. Anything else — ask us directly.
                </p>
              </div>

              <div className="border-b border-white/12">
                {faqs.map((f, i) => {
                  const open = openFaq === i;
                  return (
                    <div key={i} data-bp-item className="border-t border-white/12">
                      <button
                        onClick={() => setOpenFaq(open ? null : i)}
                        aria-expanded={open}
                        className="group flex w-full cursor-pointer items-center justify-between gap-6 py-8 text-left"
                      >
                        <span className="flex items-baseline gap-5 min-w-0">
                          <span className="font-montserrat text-[11px] tracking-[0.25em] text-[#22d3ee]/60 shrink-0">
                            Q.{String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`font-garamond text-[20px] leading-snug transition-colors duration-300 md:text-[24px] ${
                              open ? "italic text-white" : "text-white/70 group-hover:text-white"
                            }`}
                          >
                            {f.q}
                          </span>
                        </span>
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-[18px] transition-all duration-300 ${
                            open
                              ? "rotate-45 border-[#22d3ee]/60 text-[#22d3ee]"
                              : "border-white/15 text-white/60 group-hover:border-white/40"
                          }`}
                        >
                          +
                        </span>
                      </button>
                      <div
                        className="grid transition-all duration-500 ease-out"
                        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                      >
                        <div className="overflow-hidden">
                          <p className="pb-8 pr-12 text-[14px] font-light leading-7 text-white/55 md:pl-[72px]">
                            {f.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ 6. CTA ══════════ */}
        <section className="relative z-10 overflow-hidden border-t border-white/10 py-32 md:py-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.06),transparent_50%)]" />
          <div className="k-container relative text-center">
            <p className="mb-8 font-montserrat text-[11px] uppercase tracking-[0.4em] text-white/40">
              End of specification
            </p>
            <h2 className="k-display-sm k-safe mx-auto max-w-[820px] font-garamond text-white">
              <span className="font-normal">Ready to build something </span>
              <span className="font-bold italic text-[#22d3ee]">extraordinary?</span>
            </h2>
            <div className="mt-14 flex justify-center">
              <Link
                href="/contact"
                data-cursor="TALK"
                className="group inline-flex items-center gap-3 rounded-full bg-white px-10 py-4 font-montserrat text-[13px] font-extrabold uppercase italic tracking-[0.06em] text-black transition-all duration-300 hover:bg-[#22d3ee] hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] active:scale-95"
              >
                Start a project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
