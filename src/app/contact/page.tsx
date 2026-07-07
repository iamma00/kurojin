"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Mail, MapPin } from "lucide-react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface TrailImage {
  element: HTMLImageElement;
  rotation: number;
  removeTime: number;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const trailContainerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<TrailImage[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const lastRemovalRef = useRef(0);
  const mouseMoveListenerRef = useRef<((e: MouseEvent) => void) | null>(null);

  const config = {
    imageCount: 8,
    imageLifespan: 800,
    removalDelay: 60,
    mouseThreshold: 80,
    inDuration: 600,
    outDuration: 800,
    inEasing: "cubic-bezier(.07,.5,.5,1)",
    outEasing: "cubic-bezier(.87, 0, .13, 1)",
  };

  const images = Array.from(
    { length: config.imageCount },
    (_, i) => `/images/All/Artboard-${i + 1}.png`
  );

  useGSAP(
    () => {
      gsap.from(".contact-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: sectionRef }
  );

  const createTrailImage = useCallback(
    (clientX: number, clientY: number) => {
      const container = trailContainerRef.current;
      if (!container) return;

      const img = document.createElement("img");
      img.classList.add("trail-img");

      const randomIndex = Math.floor(Math.random() * images.length);
      const rotation = (Math.random() - 0.5) * 40;

      img.src = images[randomIndex];
      img.alt = "";

      const rect = container.getBoundingClientRect();
      const relativeX = clientX - rect.left;
      const relativeY = clientY - rect.top;

      img.style.position = "absolute";
      img.style.left = `${relativeX}px`;
      img.style.top = `${relativeY}px`;
      img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(0)`;
      img.style.transition = `transform ${config.inDuration}ms ${config.inEasing}`;
      img.style.pointerEvents = "none";
      img.style.zIndex = "5";
      img.style.borderRadius = "12px";
      img.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.6)";
      img.style.maxWidth = "180px";
      img.style.height = "auto";

      container.appendChild(img);

      setTimeout(() => {
        img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(1)`;
      }, 16);

      trailRef.current.push({
        element: img,
        rotation,
        removeTime: Date.now() + config.imageLifespan,
      });
    },
    [images, config]
  );

  const removeOldTrailImages = useCallback(() => {
    const now = Date.now();
    if (now - lastRemovalRef.current < config.removalDelay || trailRef.current.length === 0) return;

    const oldest = trailRef.current[0];
    if (now >= oldest.removeTime) {
      const toRemove = trailRef.current.shift()!;

      toRemove.element.style.transition = `transform ${config.outDuration}ms ${config.outEasing}`;
      toRemove.element.style.transform = `translate(-50%, -50%) rotate(${toRemove.rotation}deg) scale(0)`;

      lastRemovalRef.current = now;

      setTimeout(() => {
        if (toRemove.element.parentNode) {
          toRemove.element.parentNode.removeChild(toRemove.element);
        }
      }, config.outDuration);
    }
  }, [config]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const container = trailContainerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!isInside) return;

      const distance = Math.hypot(
        e.clientX - lastMouseRef.current.x,
        e.clientY - lastMouseRef.current.y
      );

      if (distance > config.mouseThreshold) {
        lastMouseRef.current = { x: e.clientX, y: e.clientY };
        createTrailImage(e.clientX, e.clientY);
      }
    },
    [createTrailImage, config.mouseThreshold]
  );

  const startTrailAnimation = useCallback(() => {
    if (typeof window === "undefined" || window.innerWidth <= 1000) return;

    mouseMoveListenerRef.current = handleMouseMove;
    document.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      removeOldTrailImages();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [handleMouseMove, removeOldTrailImages]);

  const stopTrailAnimation = useCallback(() => {
    if (mouseMoveListenerRef.current) {
      document.removeEventListener("mousemove", mouseMoveListenerRef.current);
      mouseMoveListenerRef.current = null;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    trailRef.current.forEach((item) => {
      if (item.element.parentNode) {
        item.element.parentNode.removeChild(item.element);
      }
    });
    trailRef.current = [];
  }, []);

  useEffect(() => {
    const floatingContainer = document.querySelector(".floating-elements");

    if (floatingContainer) {
      for (let i = 0; i < 12; i++) {
        const el = document.createElement("div");
        el.className = "floating-element";
        el.style.left = `${Math.random() * 100}%`;
        el.style.animationDelay = `${Math.random() * 8}s`;
        el.style.animationDuration = `${8 + Math.random() * 4}s`;
        floatingContainer.appendChild(el);
      }
    }

    startTrailAnimation();

    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        stopTrailAnimation();
      } else {
        startTrailAnimation();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      stopTrailAnimation();
      window.removeEventListener("resize", handleResize);
      if (floatingContainer) floatingContainer.innerHTML = "";
    };
  }, [startTrailAnimation, stopTrailAnimation]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsSubmitting(false);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    }, 3200);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-neutral-950 text-white">
      <BackgroundRippleEffect />

      <style jsx global>{`
        .floating-element {
          position: absolute;
          top: 100%;
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.12);
          filter: blur(0.2px);
          animation-name: floatUp;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .trail-img {
          user-select: none;
          -webkit-user-drag: none;
        }

        @keyframes floatUp {
          from {
            transform: translateY(0px);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          to {
            transform: translateY(-520px);
            opacity: 0;
          }
        }
      `}</style>

      {/* Hero Section */}
      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center pb-20 pt-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tighter md:text-7xl">
            Let&apos;s Connect
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-neutral-400 md:text-2xl">
            Have a project in mind? Want to collaborate?{" "}
            <br className="hidden md:block" />
            Drop us a message.
          </p>
        </div>

        <div className="mt-16 w-full max-w-6xl px-6">
          <ContainerScroll
            titleComponent={
              <div className="text-center">
                <h2 className="text-4xl font-semibold text-white">
                  Scroll to see the magic
                </h2>
                <p className="mt-4 text-lg text-neutral-400">
                  Interactive animations that make your site feel alive
                </p>
              </div>
            }
          >
            <div className="w-full h-[260px] sm:h-[320px] md:h-[420px]">
              <div
                ref={trailContainerRef}
                className="trail-container relative h-full w-full overflow-hidden rounded-3xl border border-neutral-800 bg-black"
              >
                <div className="floating-elements absolute inset-0 pointer-events-none" />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center text-xs text-neutral-500/70 sm:text-sm">
                  Move your mouse here • Desktop only
                </div>
              </div>
            </div>
          </ContainerScroll>
        </div>
      </div>

      {/* Contact Form */}
      <section
  ref={sectionRef}
  className="relative z-10 border-t border-white/8 flex items-center justify-center bg-[#010101]"
>
  <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 md:px-8 md:py-28 lg:px-10 lg:py-32 ">
    <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
      <h1 className="text-4xl font-bold  text-[#00ff91]/80 sm:text-5xl md:text-6xl">
        Contact Us
      </h1>
      <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[#fffaee] sm:text-5xl md:text-6xl">
        Let&apos;s build something clear, elegant, and memorable.
      </h2>
    </div>

    <div className="mx-auto max-w-6xl ">
      <div className="grid gap-6 rounded-[32px] border border-white/10 bg-[#0a0a0a]/92 p-4 shadow-[0_24px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-6 md:gap-8 md:rounded-[36px] md:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-10 ">
        {/* LEFT — Info panel */}
        <section className="contact-reveal flex flex-col justify-between rounded-[28px] border border-white/8 bg-white/[0.025] p-6 sm:p-8 md:p-10">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[#00ff91]/85">
              Contact
            </p>
            <h3 className="max-w-sm text-4xl italic leading-[0.95] tracking-[-0.045em] text-[#fffaee] sm:text-5xl md:text-6xl">
              Get in Touch
            </h3>
            <p className="mt-6 max-w-md text-sm leading-7 text-[#fffaee]/60 sm:text-base sm:leading-8">
              Whether it&apos;s a question, an idea, or a collaboration,
              we&apos;d love to hear from you.
            </p>
          </div>

          <div className="mt-10 space-y-5 sm:mt-12 sm:space-y-6">
            <ContactRow
              icon={<Phone size={18} strokeWidth={1.5} />}
              label="Number"
              value="+894 022 0232"
            />
            <ContactRow
              icon={<Mail size={18} strokeWidth={1.5} />}
              label="Email"
              value="info@kurojin.studio"
            />
            <ContactRow
              icon={<MapPin size={18} strokeWidth={1.5} />}
              label="Location"
              value={
                <>
                  1234 Innovation Street, Suite 567
                  <br />
                  New York, US
                </>
              }
            />
          </div>
        </section>

        {/* RIGHT — Form panel */}
        <section className="contact-reveal rounded-[28px] border border-white/8 bg-white/[0.02] p-6 sm:p-8 md:p-10">
          {submitted ? (
            <div className="flex min-h-[520px] flex-col items-center justify-center rounded-[24px] border border-emerald-400/15 bg-emerald-400/[0.03] px-6 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-4xl text-[#fffaee]">
                ✉
              </div>
              <h3 className="text-3xl italic tracking-[-0.03em] text-[#fffaee] sm:text-4xl">
                Message Received
              </h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-[#fffaee]/60 sm:text-base sm:leading-8">
                Thank you. We&apos;ll get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                <Field
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                />
                <Field
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                />
              </div>

              <div className="space-y-5 sm:space-y-6">
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="info@gmail.com"
                />

                <Field
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />

                <div>
                  <label className="mb-3 block text-[11px] uppercase tracking-[0.3em] text-[#fffaee]/48">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={7}
                    placeholder="Type your message here"
                    className="w-full resize-none rounded-[22px] border border-white/10 bg-white/[0.03] px-5 py-4 text-sm leading-7 text-[#fffaee] placeholder:text-[#fffaee]/26 transition-all duration-300 focus:border-[#00ff91]/45 focus:bg-white/[0.045] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex h-14 w-full items-center justify-center rounded-full bg-[#fffaee] px-6 text-sm font-medium tracking-wide text-[#010101] transition-all duration-200 hover:scale-[1.01] hover:bg-white active:scale-[0.985] disabled:opacity-60"
                >
                  <span className="relative z-10">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </span>
                </button>

                <p className="mt-4 text-center text-xs tracking-[0.18em] text-[#fffaee]/34">
                  CLEAR COMMUNICATION • THOUGHTFUL EXECUTION • FAST RESPONSE
                </p>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-neutral-800 bg-black py-12 text-center text-sm text-neutral-500">
        <p>
          © {new Date().getFullYear()} Your Company. Made with ripple effects &amp; love.
        </p>
      </footer>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#fffaee]/70">
        {icon}
      </div>
      <div>
        <p className="mb-1 text-xs uppercase tracking-[0.24em] text-[#7aa2ff]">
          {label}
        </p>
        <p className="text-sm text-[#fffaee]/80">{value}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.24em] text-[#fffaee]/50">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-[#fffaee] placeholder:text-[#fffaee]/30 transition-colors duration-200 focus:border-[#00ff91]/50 focus:outline-none"
      />
    </div>
  );
}