"use client";

import { useIsMobile } from "@/hooks/useIsMobile";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeroMobile from "@/components/Hero.mobile";
import Clients from "@/components/Clients";
import ClientsMobile from "@/components/Clients.mobile";
import Story from "@/components/Story";
import StoryMobile from "@/components/Story.mobile";
import Services from "@/components/Services";
import ServicesMobile from "@/components/Services.mobile";
import Work from "@/components/Work";
import WorkMobile from "@/components/Work.mobile";
import Budget from "@/components/Budget";
import BudgetMobile from "@/components/Budget.mobile";
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
