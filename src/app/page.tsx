"use client";

import { useEffect, useState } from "react";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import GlobalBackground from "@/components/GlobalBackground";
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
import Engage from "@/components/Engage";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Loader is an overlay now — page stays mounted underneath,
    // so scroll animations initialize correctly.
    const timer = setTimeout(() => setLoading(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SmoothScrollProvider>
      <IntroLoader done={!loading} />
      <GlobalBackground />
      <main className="relative">
        <Navbar />
        <Watermark />
        <div className="relative z-20">
          <Hero />
          <Clients />
          <Story />
          <Services />
          <TextVideo />
          <CTA />
          <Engage />
          <Work />
          <Budget />
        </div>
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
