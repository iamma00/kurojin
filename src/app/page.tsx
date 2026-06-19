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
import CTA from "@/components/CTA";
import Loader from "@/components/Loader";
import TextVideo from "@/components/TextVideo";

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
      <main className="relative z-10 ">
        <Navbar />
        <Watermark />
        <div
          className="relative z-20 " >
          <div data-scroll-section className="relative z-10 gap-8">
            <Hero />
          </div>

          <div className="section-step section-z-20">
            <Clients />
          </div>

          <div className="section-step section-z-30">
            <Story />
          </div>

          <div className="section-step section-z-30">
            <Services />
          </div>

          <div className="section-step section-z-60">
            <TextVideo />
          </div>

          <div className="section-step section-z-40">
            <Work />
          </div>

          <div className="section-step section-z-80">
            <Budget />
          </div>
        </div>

        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
