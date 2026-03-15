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
import Footer from "@/components/Footer";
import Watermark from "@/components/Watermark";

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <main className="relative">
      <Navbar />
      {!isMobile ? <Watermark /> : null}
      {isMobile ? (
        <>
          <div data-scroll-section>
            <HeroMobile />
          </div>

          <div data-scroll-section>
            <ClientsMobile />
          </div>

          <div data-scroll-section>
            <StoryMobile />
          </div>

          <div data-scroll-section>
            <ServicesMobile />
          </div>

          <div data-scroll-section>
            <WorkMobile />
          </div>

          <div data-scroll-section>
            <BudgetMobile />
          </div>
        </>
      ) : (
        <>
          <div data-scroll-section>
            <Hero />
          </div>

          <div className="section-stack" data-scroll-section>
            <div className="section-step section-z-10">
              <div className="section-sticky">
                <Clients />
              </div>
            </div>

            <div className="section-step section-z-20">
              <div className="section-sticky">
                <Story />
              </div>
            </div>

            <div className="section-step section-z-30">
              <div className="section-sticky">
                <Services />
              </div>
            </div>

            <div className="section-step section-z-40">
              <div className="section-sticky">
                <Work />
              </div>
            </div>
          </div>

          <div data-scroll-section>
            <Budget />
          </div>
        </>
      )}
      <Footer />
    </main>
  );
}
