"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

interface TrailImage {
  element: HTMLImageElement;
  rotation: number;
  removeTime: number;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Mouse Trail Refs
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
    (_, i) => `/images/work-items/work-item-${i + 1}.jpg`
  );

  const createTrailImage = useCallback((clientX: number, clientY: number) => {
    const container = trailContainerRef.current;
    if (!container) return;

    const img = document.createElement("img");
    img.classList.add("trail-img");

    const randomIndex = Math.floor(Math.random() * images.length);
    const rotation = (Math.random() - 0.5) * 40;

    img.src = images[randomIndex];

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

    container.appendChild(img);

    setTimeout(() => {
      img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(1)`;
    }, 16);

    trailRef.current.push({
      element: img,
      rotation,
      removeTime: Date.now() + config.imageLifespan,
    });
  }, [images, config]);

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

  const handleMouseMove = useCallback((e: MouseEvent) => {
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
  }, [createTrailImage, config.mouseThreshold]);

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

    // Cleanup remaining images
    trailRef.current.forEach((item) => {
      if (item.element.parentNode) {
        item.element.parentNode.removeChild(item.element);
      }
    });
    trailRef.current = [];
  }, []);

  // Initialize Trail + Floating Elements + Resize Handler
  useEffect(() => {
    // Floating Elements
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

    // Start trail on desktop
    startTrailAnimation();

    // Resize handler
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

  // Form Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1400));

    setSubmitted(true);
    setIsSubmitting(false);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3200);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-neutral-950 text-white">
      <BackgroundRippleEffect />

      {/* Hero Section */}
      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center pt-20 pb-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Let&apos;s Connect
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto">
            Have a project in mind? Want to collaborate? <br className="hidden md:block" />
            Drop us a message.
          </p>
        </div>

        <div className="mt-16 w-full max-w-6xl px-6">
          <ContainerScroll
            titleComponent={
              <>
                <h2 className="text-4xl font-semibold text-white">Scroll to see the magic</h2>
                <p className="text-neutral-400 mt-4 text-lg">
                  Interactive animations that make your site feel alive
                </p>
              </>
            }
          >
            <img
              src="/linear.webp"
              alt="hero visual"
              height={720}
              width={1400}
              className="mx-auto rounded-3xl object-cover shadow-2xl"
              draggable={false}
            />
          </ContainerScroll>
        </div>
      </div>

      {/* Interactive Trail + Contact Form */}
      <div className="relative z-10 bg-neutral-900 py-24 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Send us a Message</h2>
            <p className="text-neutral-400">We typically respond within 24 hours</p>
          </div>

          {/* Mouse Trail Container */}
          <div
            ref={trailContainerRef}
            className="trail-container relative h-[420px] rounded-3xl border border-neutral-800 bg-neutral-950/70 overflow-hidden mb-12"
          >
            <div className="floating-elements absolute inset-0 pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center text-neutral-500/70 text-sm pointer-events-none">
              Move your mouse here • Desktop only
            </div>
          </div>

          {submitted ? (
            <div className="bg-green-950/80 border border-green-500/30 rounded-3xl p-16 text-center">
              <div className="text-7xl mb-6">✉️</div>
              <h3 className="text-3xl font-semibold mb-3">Message Received!</h3>
              <p className="text-neutral-400 text-lg">Thank you. We&apos;ll get back to you shortly.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-8 bg-neutral-950 border border-neutral-800 rounded-3xl p-10 md:p-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-6 py-4 focus:outline-none focus:border-white transition-all duration-200 text-lg"
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-group">
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-6 py-4 focus:outline-none focus:border-white transition-all duration-200 text-lg"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-neutral-400 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-6 py-4 focus:outline-none focus:border-white transition-all duration-200 text-lg"
                  placeholder="Project Inquiry / Collaboration"
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-neutral-400 mb-2">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={8}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-white transition-all duration-200 text-lg resize-y"
                  placeholder="Tell us about your project, ideas, or how we can help..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn w-full bg-white hover:bg-neutral-100 active:scale-[0.985] transition-all duration-200 text-black font-semibold py-5 rounded-2xl text-lg disabled:opacity-70 flex items-center justify-center"
              >
                {isSubmitting ? "Sending Message..." : "Send Message →"}
              </button>

              <p className="text-center text-xs text-neutral-500">
                Your information is safe. We respect your inbox.
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-black py-12 border-t border-neutral-800 text-center text-neutral-500 text-sm">
        <p>© {new Date().getFullYear()} Your Company. Made with ripple effects &amp; love.</p>
      </footer>
    </div>
  );
}