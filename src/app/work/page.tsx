"use client";

import React, { useState, useEffect } from "react";
import Ferrofluid from "../../components/Ferrofluid";
import CircularGallery from "../../components/CircularGallery";
import BlurText from "../../components/BlurText";
import Odometer from "@/components/Odometer";

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

export default function WorkPage() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [odometerVisible, setOdometerVisible] = useState(false);

  const caseStudies = [
    { id: "cs1", title: "Twitter MTC", subtitle: "Mobile Experience" },
    { id: "cs2", title: "Stink Studios", subtitle: "Brand Campaign" },
    { id: "cs3", title: "Found Them First", subtitle: "Social Movement" },
    { id: "cs4", title: "Lumen Archive", subtitle: "Digital Exhibition" },
    { id: "cs5", title: "Neon Reverie", subtitle: "Fashion Film" },
  ];

  // Odometer Logic
  useEffect(() => {
    const visibleSections = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.add(entry.target.id);
            const index = caseStudies.findIndex((cs) => cs.id === entry.target.id);
            if (index !== -1) {
              setCurrentIndex(index + 1);
            }
          } else {
            visibleSections.delete(entry.target.id);
          }
          setOdometerVisible(visibleSections.size > 0);
        });
      },
      { threshold: 0.6 }
    );

    caseStudies.forEach((study) => {
      const el = document.getElementById(study.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      {/* HERO SECTION - UNCHANGED */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Ferrofluid
            colors={["#ffffff", "#a1a1aa", "#e2e8f0"]}
            speed={0.6}
            scale={1.4}
            turbulence={0.8}
            fluidity={0.15}
            rimWidth={0.25}
            sharpness={2.2}
            shimmer={1.8}
            glow={2.5}
            flowDirection="down"
            opacity={0.85}
            mouseInteraction
            mouseStrength={1.1}
            mouseRadius={0.4}
          />
        </div>

        <div className="relative z-10 text-center px-6">
          <h1 className="font-garamond text-[clamp(52px,9vw,120px)] leading-none tracking-[-2.5px] text-white mb-6">
            <BlurText
              text="Our Work"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="inline-block"
            />
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto">
            Explore our portfolio of projects and collaborations.
          </p>
        </div>
      </section>

      {/* Circular Gallery - UNCHANGED */}
      <section className="relative w-full h-screen bg-black overflow-hidden">
        <div style={{ height: "800px", position: "relative" }}>
          <CircularGallery
            bend={1}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.05}
            fontUrl="./font/AppleGaramond.ttf"
            font="bold 30px Orbitron"
            scrollSpeed={3}
          />
        </div>
      </section>

      {/* 5 Case Study Sections + Odometer */}
      <div className="relative">
        {/* Fixed Odometer — only visible within case study sections */}
        <div
          className="fixed bottom-12 right-8 md:right-12 z-50 font-mono pointer-events-none transition-opacity duration-500"
          style={{ opacity: odometerVisible ? 1 : 0 }}
        >
          <div className="flex items-baseline gap-1 text-white">
            <Odometer value={currentIndex} maxValue={5} />
            <span className="text-5xl font-light text-white/30">/</span>
            <span className="text-5xl font-light text-white/30">5</span>
          </div>
        </div>

        {/* Case Studies */}
        {caseStudies.map((study, index) => (
          <section
            key={study.id}
            id={study.id}
            className="h-screen flex items-center justify-center border-b border-white/10"
            style={{
              background: `linear-gradient(135deg, #${(index + 1) * 111111}, #111)`,
            }}
          >
            <div className="text-center px-6">
              <h1 className="text-6xl md:text-7xl font-light mb-4">{study.title}</h1>
              <p className="text-xl text-gray-400">{study.subtitle}</p>
              <div className="mt-12 text-sm tracking-widest text-white/40">
                CASE STUDY {String(index + 1).padStart(2, '0')}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}