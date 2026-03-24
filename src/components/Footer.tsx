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

import dynamic from "next/dynamic";


export default function Footer() {
  return (
    <>
      {/* Desktop/tablet footer */}
      <footer
        id="site-footer"
        className="hidden md:flex relative z-60 w-full min-h-screen flex-col justify-between items-center overflow-hidden bg-[#05070a] px-0 pt-0 pb-0"
      >
      {/* Animated background overlays */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "radial-gradient(circle at 50% 112%, rgba(255,64,64,0.16), transparent 32%)," +
            "radial-gradient(circle at 20% 10%, rgba(120,170,255,0.16), transparent 30%)," +
            "linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 22%, rgba(255,255,255,0) 42%)"
        }}
      />
      {/* Floating decorative element */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[10%] z-10 -translate-x-1/2"
        initial={{ opacity: 0, scale: 0.8, y: -40 }}
        whileInView={{ opacity: 0.7, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ filter: "blur(2px)" }}
      >
        <div className="w-80 h-30 rounded-full bg-linear-to-r from-[#00ff91]/30 via-[#7aa2ff]/20 to-[#ff4050]/30 opacity-70 animate-pulse" />
      </motion.div>
      {/* Main content grid */}
      <motion.div
        className="relative z-20 mx-auto w-full max-w-300 flex-1 flex flex-col justify-center items-center px-4 py-20 md:px-12 md:py-32"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16">
          {/* About */}
          <div className="flex flex-col items-start justify-start gap-4 md:col-span-1">
            <h2 className="font-garamond text-[clamp(28px,8vw,42px)] font-semibold leading-[0.95] tracking-[-0.04em] text-white">
              Kurojin Studio
            </h2>
            <p className="text-[13px] font-light leading-[1.7] text-white/60 max-w-80">
              Design systems that feel precise, cinematic, and alive. Brand direction, digital surfaces, and motion-led experiences for teams that want clarity with edge.
            </p>
          </div>
          {/* Navigation */}
          <div className="flex flex-col items-start gap-3 md:col-span-1">
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/50 mb-1">Navigate</span>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group inline-flex items-center gap-2 text-[16px] font-light tracking-[-0.02em] text-white/80 transition-colors duration-300 hover:text-[#00ff91] focus:text-[#00fee0] relative"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-linear-to-r from-[#00ff91] to-[#00fee0] rounded-full transition-all duration-300 group-hover:w-full group-focus:w-full"></span>
              </Link>
            ))}
          </div>
          {/* Socials */}
          <div className="flex flex-col items-start gap-3 md:col-span-1">
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/50 mb-1">Socials</span>
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-[15px] font-light text-white/70 transition-colors duration-300 hover:text-[#7aa2ff] focus:text-[#00ff91]"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/4 transition duration-300 group-hover:border-white/22 group-hover:bg-white/7">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>
          {/* Contact */}
          <div className="flex flex-col items-start gap-4 md:col-span-1">
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/50 mb-1">Contact</span>
            <a
              href="mailto:hello@kurojin.studio"
              className="group inline-flex items-center gap-2 text-[15px] text-white/88 transition-colors duration-300 hover:text-[#7aa2ff]"
            >
              <Mail className="h-4 w-4 text-[#7aa2ff]" />
              <span>hello@kurojin.studio</span>
            </a>
            <p className="text-[12px] font-light leading-[1.65] text-white/62">
              Available for identity systems, product design, visual direction, and launch support.
            </p>
            <Link
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/10 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition duration-300 hover:border-white/30 hover:bg-white/14"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
        {/* Divider */}
        <div className="w-full border-t border-white/10 my-12" />
        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-2 text-[11px] uppercase tracking-[0.16em] text-white/33">
          <span>© 2026 Kurojin. All rights reserved.</span>
          <span>Built for brands that want clarity with edge.</span>
        </div>
        {/* Logo wordmark */}
        <div className="relative mt-16 flex justify-center items-center w-full">
          <motion.p
            aria-hidden="true"
            className="pointer-events-none select-none text-center font-montserrat text-[clamp(56px,22vw,132px)] font-extrabold uppercase leading-[0.72] tracking-[-0.06em] text-white md:text-[clamp(78px,24vw,250px)] md:tracking-[-0.08em] drop-shadow-[0_0_40px_rgba(0,255,145,0.08)] animate-pulse"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 0.98, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              textShadow: "0 0 30px rgba(0,255,145,0.10)",
            }}
          >
            kurojin
          </motion.p>
        </div>
      </motion.div>
      </footer>
      {/* Mobile footer */}
      <div className="md:hidden">
        
      </div>
    </>
  );
}