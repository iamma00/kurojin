"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const SECTIONS = [
  {
    id: "01",
    title: "Acceptance of terms",
    body: "By accessing or using this site, you agree to be bound by these terms. If you don't agree, please don't use the site.",
  },
  {
    id: "02",
    title: "Use of the site",
    body: "Content here — case studies, write-ups, code snippets — is for informational purposes. You may not reproduce, redistribute, or repurpose it for commercial use without written permission.",
  },
  {
    id: "03",
    title: "Intellectual property",
    body: "All designs, code, and written content on this site are owned by the site operator unless otherwise credited. Project names and client work shown remain the property of their respective owners.",
  },
  {
    id: "04",
    title: "Third-party links",
    body: "This site may link to external tools, repositories, or live projects. We're not responsible for the content, availability, or practices of those third-party destinations.",
  },
  {
    id: "05",
    title: "No warranties",
    body: "This site is provided as-is. We make no guarantees about uptime, accuracy, or fitness for a particular purpose. Things may break; we'll fix what we can, when we can.",
  },
  {
    id: "06",
    title: "Limitation of liability",
    body: "We're not liable for any indirect, incidental, or consequential damages arising from your use of this site.",
  },
  {
    id: "07",
    title: "Changes to these terms",
    body: "Terms may be updated periodically. Continued use of the site after changes means you accept the updated terms.",
  },
  {
    id: "08",
    title: "Contact",
    body: "Questions about these terms can be sent through the contact page.",
  },
];

export default function TermsPage() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.06,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className="bg-void text-ink min-h-screen px-6 md:px-10 pt-32 pb-24"
    >
      <div className="max-w-2xl">
        <p className="reveal mono-label mb-6">LEGAL / TERMS OF SERVICE</p>
        <h1 className="reveal font-display text-[12vw] md:text-[4.5vw] leading-[0.95] tracking-tight">
          Terms of Service
        </h1>
        <p className="reveal mt-6 text-muted">
          Last updated: June 2026. Plain-language terms covering how this
          site and its content may be used.
        </p>
      </div>

      <div className="mt-16 max-w-2xl divide-y divide-line">
        {SECTIONS.map((s) => (
          <div key={s.id} className="reveal py-8">
            <div className="flex items-baseline gap-4 mb-3">
              <span className="mono-label text-signal">{s.id}</span>
              <h2 className="font-display text-xl md:text-2xl tracking-tight">
                {s.title}
              </h2>
            </div>
            <p className="text-muted leading-relaxed max-w-xl">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}