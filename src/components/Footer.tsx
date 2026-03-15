"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Dribbble,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Dribbble", href: "https://dribbble.com", icon: Dribbble },
];

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="relative z-60 w-full overflow-hidden bg-[#05070a] px-2 pb-4 pt-12 md:px-[2.8%] md:pb-8 md:pt-22"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_112%,rgba(255,64,64,0.16),transparent_32%),radial-gradient(circle_at_20%_10%,rgba(120,170,255,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.045)_0%,rgba(255,255,255,0.015)_22%,rgba(255,255,255,0)_42%)]" />

      <motion.div
        className="relative mx-auto w-full overflow-hidden rounded-2xl border border-white/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0.045)_38%,rgba(255,255,255,0.02)_100%)] px-4 pb-2 pt-6 shadow-[0_28px_95px_rgba(0,0,0,0.38)] backdrop-blur-2xl md:px-9 md:pb-3 md:pt-10"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

        <div className="relative z-10 grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-[minmax(0,1.35fr)_minmax(0,0.78fr)_minmax(0,0.78fr)_minmax(300px,0.95fr)] md:gap-10">
          <div className="max-w-[290px] space-y-3.5 sm:col-span-2 md:col-span-1 md:max-w-[420px] md:space-y-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/42">
              Kurojin Studio
            </p>
            <h2 className="font-garamond text-[clamp(28px,11vw,42px)] font-semibold leading-[0.95] tracking-[-0.04em] text-white md:text-[clamp(30px,6vw,48px)] md:leading-[0.94] md:tracking-[-0.05em]">
              Design systems that feel precise, cinematic, and alive.
            </h2>
            <p className="max-w-[300px] text-[12px] font-light leading-[1.65] text-white/58 md:max-w-[320px] md:text-[13px] md:leading-[1.7] md:text-white/56">
              Brand direction, digital surfaces, and motion-led experiences for teams that want clarity with edge.
            </p>
          </div>

          <div className="space-y-3 border-t border-white/8 pt-4 sm:border-t-0 sm:pt-0 md:border-t-0 md:pt-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/38">
              Navigate
            </p>
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group inline-flex w-fit items-center gap-2 text-[17px] font-light tracking-[-0.02em] text-white/86 transition-colors duration-300 hover:text-white md:text-[18px] md:tracking-[-0.03em]"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-4 w-4 text-white/34 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/72" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3 border-t border-white/8 pt-4 sm:border-t-0 sm:pt-0 md:border-t-0 md:pt-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/38">
              Socials
            </p>
            <div className="flex flex-col gap-2.5">
              {socialLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex w-fit items-center gap-2.5 text-[14px] font-light text-white/72 transition-colors duration-300 hover:text-white md:text-[15px]"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition duration-300 group-hover:border-white/22 group-hover:bg-white/[0.07]">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="sm:col-span-2 md:col-span-1 flex justify-center md:justify-self-end md:w-full md:max-w-[360px]">
            <Card className="relative w-full overflow-hidden rounded-2xl border border-white/16 !bg-white/[0.045] py-0 text-white ring-0 shadow-[0_22px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(175deg,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0.03)_38%,rgba(255,255,255,0.012)_100%)]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white/10 via-white/[0.04] to-transparent" />
              <div className="pointer-events-none absolute -right-14 -top-16 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(125,170,255,0.16),rgba(125,170,255,0)_72%)]" />
              <CardHeader className="items-center px-5 pt-5 text-center md:items-start md:text-left">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/46">
                  Contact
                </p>
                <CardTitle className="text-[20px] font-medium tracking-[-0.02em] text-white">
                  Let&apos;s build your next launch.
                </CardTitle>
              </CardHeader>

              <CardContent className="px-5 pb-5">
                <div className="space-y-4 text-center md:text-left">
                  <a
                    href="mailto:hello@kurojin.studio"
                    className="group inline-flex items-center gap-2 text-[14px] text-white/88 transition-colors duration-300 hover:text-white"
                  >
                    <Mail className="h-4 w-4 text-[#7aa2ff]" />
                    <span>hello@kurojin.studio</span>
                  </a>

                  <p className="text-[12px] font-light leading-[1.65] text-white/62 md:text-[13px]">
                    Available for identity systems, product design, visual direction, and launch support.
                  </p>

                  <div className="h-px w-full bg-gradient-to-r from-white/20 via-white/10 to-transparent" />

                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">
                    Usually replies in 24h
                  </p>

                  <Link
                    href="#contact"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/16 bg-white/[0.1] px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition duration-300 hover:border-white/30 hover:bg-white/[0.14] md:w-auto md:justify-start"
                  >
                    <span>Start a Project</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="relative z-10 mt-7 border-t border-white/8 pt-4 md:mt-10 md:pt-6">
          <div className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.16em] text-white/33 md:text-[11px] md:tracking-[0.18em] md:flex-row md:items-center md:justify-between">
            <p>© 2026 Kurojin. All rights reserved.</p>
            <p>Built for brands that want clarity with edge.</p>
          </div>
        </div>

        <div className="relative mt-8 overflow-hidden md:mt-12">
          <motion.p
            aria-hidden="true"
            className="pointer-events-none select-none text-center font-montserrat text-[clamp(56px,22vw,132px)] font-extrabold uppercase leading-[0.72] tracking-[-0.06em] text-white md:text-[clamp(78px,24vw,250px)] md:tracking-[-0.08em]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 0.98, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.95, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              textShadow: "0 0 30px rgba(255,255,255,0.06)",
            }}
          >
            kurojin
          </motion.p>
        </div>
      </motion.div>
    </footer>
  );
}