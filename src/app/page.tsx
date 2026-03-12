"use client";

import { useIsMobile } from "@/hooks/useIsMobile";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeroMobile from "@/components/mobile/Hero.mobile";
import Clients from "@/components/Clients";
import ClientsMobile from "@/components/mobile/Clients.mobile";
import Story from "@/components/Story";
import StoryMobile from "@/components/mobile/Story.mobile";
import Services from "@/components/Services";
import ServicesMobile from "@/components/mobile/Services.mobile";
import Work from "@/components/Work";
import WorkMobile from "@/components/mobile/Work.mobile";
import Budget from "@/components/Budget";
import BudgetMobile from "@/components/mobile/Budget.mobile";
import Watermark from "@/components/Watermark";

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <main className="relative">
      <Navbar />
      <Watermark />
      {isMobile ? <HeroMobile /> : <Hero />}
      {isMobile ? <ClientsMobile /> : <Clients />}
      {isMobile ? <StoryMobile /> : <Story />}
      {isMobile ? <ServicesMobile /> : <Services />}
      {isMobile ? <WorkMobile /> : <Work />}
      {isMobile ? <BudgetMobile /> : <Budget />}
    </main>
  );
}
