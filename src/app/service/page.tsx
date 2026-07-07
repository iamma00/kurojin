"use client";

import Link from "next/link";
import { ArrowUpRight, Code2, Globe, Layers3, Rocket, Sparkles, Workflow } from "lucide-react";

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
      "Interfaces shaped around usability, conversion, and clarity—designed to remove friction and make complex products easier to understand.",
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

export default function Service() {
  return (
    <section className="relative w-full border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-[1520px] px-6 py-24 sm:px-8 sm:py-28 md:px-10 lg:px-14 lg:py-32 xl:px-16">
        <div className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20 xl:gap-24">
          {/* Left Intro */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="mb-4 text-[11px] uppercase tracking-[0.34em] text-emerald-400/80">
              Services
            </p>

            <h2 className="max-w-xl text-4xl font-semibold leading-[0.92] tracking-[-0.05em] text-[#f5f1e8] sm:text-5xl md:text-6xl">
              Built with clarity,
              <br />
              restraint, and intent.
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/58 sm:text-base sm:leading-8">
              We design and build digital experiences that feel modern, usable,
              and memorable. Every service is structured to reduce noise, improve
              clarity, and help the final product feel more considered.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/55">
                Strategy
              </span>
              <span className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/55">
                Design
              </span>
              <span className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/55">
                Development
              </span>
            </div>

            <Link
              href="/contact"
              className="group mt-12 inline-flex items-center gap-2 rounded-full bg-[#f5f1e8] px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.02]"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Right Grid */}
          <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.number}
                  className="group flex min-h-[320px] flex-col justify-between rounded-[28px] border border-white/10 bg-white/[0.025] p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04] sm:p-7 md:min-h-[340px] md:p-8"
                >
                  <div>
                    <div className="mb-8 flex items-start justify-between gap-4">
                      <span className="text-[11px] uppercase tracking-[0.28em] text-white/35">
                        {service.number}
                      </span>

                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#f5f1e8]">
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                      </div>
                    </div>

                    <h3 className="text-2xl font-medium tracking-[-0.03em] text-[#f5f1e8] sm:text-[30px]">
                      {service.title}
                    </h3>

                    <p className="mt-4 max-w-md text-sm leading-7 text-white/58 sm:text-[15px] sm:leading-8">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-10 border-t border-white/8 pt-5">
                    <ul className="space-y-2">
                      {service.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 text-sm text-white/72"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}