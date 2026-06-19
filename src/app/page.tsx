"use client";
import { useState, useEffect } from "react";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import GlobalBackground from "@/components/GlobalBackground";

// UI Components
import IntroLoader from "@/components/IntroLoader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Story from "@/components/Story";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Budget from "@/components/Budget";
import Footer from "@/components/Footer";
import Watermark from "@/components/Watermark";
import TextVideo from "@/components/TextVideo";
import CTA from "@/components/CTA";

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (showLoader) {
    return <IntroLoader />;
  }

  return (
    <SmoothScrollProvider>
      <GlobalBackground />
      <main className="relative">
        <Navbar />
        <Watermark />

        <div className="relative z-20">
          {/* Hero - usually full height, no extra gap */}
          <Hero />

          {/* Tight sections */}
          <Clients />
          <Story />
          <Services />
          <TextVideo />

          {/* CTA - your special component */}
          <CTA />

          <Work />
          <Budget />
        </div>

        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}