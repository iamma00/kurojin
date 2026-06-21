"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const SECTIONS = [
  {
    id: "01",
    title: "What we collect",
    body: "When you use the contact form, we collect your name, email address, subject, and message. We don't collect anything beyond what you submit.",
  },
  {
    id: "02",
    title: "How it's used",
    body: "Submitted information is logged to a private spreadsheet and used solely to respond to your message. It's not sold, shared, or used for marketing.",
  },
  {
    id: "03",
    title: "Cookies and analytics",
    body: "This site may use basic, privacy-respecting analytics to understand traffic patterns. No cross-site tracking or ad-targeting cookies are used.",
  },
  {
    id: "04",
    title: "Third-party services",
    body: "Form submissions are processed through a Google Sheets backend. Google's own privacy policy governs how that infrastructure handles data in transit and storage.",
  },
  {
    id: "05",
    title: "Data retention",
    body: "Contact form entries are kept only as long as needed to respond, then periodically cleared. You can request deletion at any time via the contact page.",
  },
  {
    id: "06",
    title: "Your rights",
    body: "You can request access to, correction of, or deletion of any personal data you've submitted. Reach out through the contact page and we'll handle it promptly.",
  },
  {
    id: "07",
    title: "Security",
    body: "We take reasonable measures to protect submitted data, but no method of transmission over the internet is 100% secure.",
  },
  {
    id: "08",
    title: "Changes to this policy",
    body: "This policy may be updated as practices change. The latest version will always be posted here.",
  },
];

export default function PolicyPage() {
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
        <p className="reveal mono-label mb-6">LEGAL / PRIVACY POLICY</p>
        <h1 className="reveal font-display text-[12vw] md:text-[4.5vw] leading-[0.95] tracking-tight">
          Privacy Policy
        </h1>
        <p className="reveal mt-6 text-muted">
          Last updated: June 2026. A straightforward account of what's
          collected and how it's handled.
        </p>
      </div>

      <div className="mt-16 max-w-2xl divide-y divide-line">
        {SECTIONS.map((s) => (
          <div key={s.id} className="reveal py-8">
            <div className="flex items-baseline gap-4 mb-3">
              <span className="mono-label text-data">{s.id}</span>
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