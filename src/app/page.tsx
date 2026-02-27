import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Story from "@/components/Story";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Budget from "@/components/Budget";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Clients />
      <Story />
      <Services />
      <Work />
      <Budget />
    </main>
  );
}
