"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, easeOut, motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlurText from "@/components/BlurText";
import Ferrofluid from "../../components/Ferrofluid";
import CircularText from "@/components/CircularText";
import CurvedLoop from "@/components/CurvedLoop";
import CircularGallery from "@/components/CircularGallery";

gsap.registerPlugin(ScrollTrigger);

type WorkCategory = "web" | "2d" | "video" | "social" | "branding" | "campaign";

type WorkProject = {
  id: string;
  title: string;
  subtitle: string;
  category: WorkCategory;
  year: string;
  services: string[];
  description: string;
  image: string;
  accent: string;
  featured?: boolean;
};

const categories: { id: WorkCategory; label: string }[] = [
  { id: "web", label: "Web" },
  { id: "2d", label: "2D" },
  { id: "video", label: "Video" },
  { id: "social", label: "Social" },
  { id: "branding", label: "Branding" },
  { id: "campaign", label: "Campaign" },
];

const projects: WorkProject[] = [
  {
    id: "p1",
    title: "Twitter MTC",
    subtitle: "Mobile Experience",
    category: "web",
    year: "2025",
    services: ["UX/UI", "Frontend", "Motion"],
    description:
      "A fast product interface designed with sharp pacing, tactile transitions, and a highly responsive visual system.",
    image: "/images/work/01.jpg",
    accent: "#8B5CF6",
    featured: true,
  },
  {
    id: "p2",
    title: "Stink Studios",
    subtitle: "Brand Campaign",
    category: "campaign",
    year: "2025",
    services: ["Direction", "Campaign", "Digital"],
    description:
      "A campaign experience with cinematic motion, bold framing, and a layered content rhythm across touchpoints.",
    image: "/images/work/02.jpg",
    accent: "#06B6D4",
    featured: true,
  },
  {
    id: "p3",
    title: "Found Them First",
    subtitle: "Social Movement",
    category: "social",
    year: "2024",
    services: ["Strategy", "Social", "Identity"],
    description:
      "A social-first movement identity built for clarity, memorability, and distribution at scale.",
    image: "/images/work/03.jpg",
    accent: "#F97316",
    featured: true,
  },
  {
    id: "p4",
    title: "Lumen Archive",
    subtitle: "Digital Exhibition",
    category: "2d",
    year: "2024",
    services: ["2D Design", "Editorial", "Experience"],
    description:
      "An exhibition-led interface with atmospheric visuals, layered typography, and slow editorial transitions.",
    image: "/images/work/04.jpg",
    accent: "#10B981",
    featured: true,
  },
  {
    id: "p5",
    title: "Neon Reverie",
    subtitle: "Fashion Film",
    category: "video",
    year: "2026",
    services: ["Film", "Post", "Color"],
    description:
      "A fashion-driven visual story shaped through tonal contrast, controlled cuts, and moving texture.",
    image: "/images/work/05.jpg",
    accent: "#EC4899",
  },
  {
    id: "p6",
    title: "North Axis",
    subtitle: "Identity System",
    category: "branding",
    year: "2026",
    services: ["Branding", "Typography", "System Design"],
    description:
      "A restrained identity framework built around modular marks, premium spacing, and clean hierarchy.",
    image: "/images/work/06.jpg",
    accent: "#EAB308",
  },
  {
    id: "p7",
    title: "Frame / Form",
    subtitle: "Interactive Portfolio",
    category: "web",
    year: "2025",
    services: ["Development", "Design", "GSAP"],
    description:
      "An interactive portfolio with fluid transitions, pinned storytelling, and a polished front-end system.",
    image: "/images/work/07.jpg",
    accent: "#3B82F6",
  },
  {
    id: "p8",
    title: "Pulse Theory",
    subtitle: "Launch Assets",
    category: "social",
    year: "2026",
    services: ["Social Media", "Motion", "Content System"],
    description:
      "A launch-ready content system spanning vertical assets, loops, and platform-aware templates.",
    image: "/images/work/08.jpg",
    accent: "#EF4444",
  },
  {
    id: "p9",
    title: "Monolith Zero",
    subtitle: "Launch Web Experience",
    category: "web",
    year: "2026",
    services: ["Frontend", "Design System", "Interaction"],
    description:
      "A high-contrast launch site with pinned layouts, tactile transitions, and fast-loading visual storytelling.",
    image: "/images/work/01.jpg",
    accent: "#22C55E",
  },
  {
    id: "p10",
    title: "Velvet Cut",
    subtitle: "Fashion Direction",
    category: "video",
    year: "2025",
    services: ["Direction", "Video", "Post Production"],
    description:
      "A fashion-led moving image system balancing mood, rhythm, and restraint.",
    image: "/images/work/02.jpg",
    accent: "#A855F7",
  },
  {
    id: "p11",
    title: "Grid Memory",
    subtitle: "Poster Series",
    category: "2d",
    year: "2025",
    services: ["2D", "Print System", "Art Direction"],
    description:
      "A modular print language built around form, spacing, and tonal precision.",
    image: "/images/work/03.jpg",
    accent: "#14B8A6",
  },
  {
    id: "p12",
    title: "Signal House",
    subtitle: "Brand Identity",
    category: "branding",
    year: "2024",
    services: ["Branding", "Identity", "Strategy"],
    description:
      "A graphic identity system with strong reduction, motion behaviors, and brand clarity.",
    image: "/images/work/04.jpg",
    accent: "#F59E0B",
  },
];

const ease = [0.22, 1, 0.36, 1];

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function OdometerMini({
  current,
  total,
  visible,
}: {
  current: number;
  total: number;
  visible: boolean;
}) {
  const format = (n: number) => String(n).padStart(2, "0");

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 18,
        pointerEvents: visible ? "auto" : "none",
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed bottom-6 right-4 z-[70] md:bottom-10 md:right-10"
    >
      <div className="rounded-full border border-white/10 bg-black/50 px-4 py-3 backdrop-blur-xl">
        <div className="flex items-end gap-2 font-mono tabular-nums text-white">
          <motion.span
            key={current}
            initial={{ y: 18, opacity: 0, filter: "blur(8px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-2xl md:text-4xl"
          >
            {format(current)}
          </motion.span>
          <span className="pb-0.5 text-xl text-white/25 md:text-3xl">/</span>
          <span className="pb-0.5 text-xl text-white/25 md:text-3xl">
            {format(total)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous cards" : "Next cards"}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-white transition-all duration-300",
        "hover:bg-white hover:text-black active:scale-[0.96]",
        disabled &&
          "cursor-not-allowed opacity-30 hover:bg-white/[0.05] hover:text-white",
      )}
    >
      <span className="text-lg">{direction === "prev" ? "←" : "→"}</span>
    </button>
  );
}

function ArchiveRow({ title, items }: { title: string; items: WorkProject[] }) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateButtons = () => {
    const el = viewportRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < maxScroll - 8);
  };

  useEffect(() => {
    updateButtons();
    const el = viewportRef.current;
    if (!el) return;

    const onScroll = () => updateButtons();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateButtons);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateButtons);
    };
  }, [items.length]);

  const scrollByCards = (direction: "prev" | "next") => {
    const el = viewportRef.current;
    if (!el) return;
    const amount =
      window.innerWidth < 768 ? el.clientWidth * 0.86 : el.clientWidth * 0.72;
    el.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="space-y-6 md:space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/38 md:text-xs">
            Category
          </p>
          <h3 className="mt-2 text-2xl tracking-[-0.04em] text-white md:text-4xl">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <ArrowButton
            direction="prev"
            onClick={() => scrollByCards("prev")}
            disabled={!canPrev}
          />
          <ArrowButton
            direction="next"
            onClick={() => scrollByCards("next")}
            disabled={!canNext}
          />
        </div>
      </div>

      <div
        ref={viewportRef}
        className="no-scrollbar overflow-x-auto overflow-y-hidden scroll-smooth"
      >
        <div className="flex gap-4 pb-2 md:gap-6">
          {items.map((project) => (
            <motion.article
              key={project.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group relative w-[84vw] shrink-0 overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] md:w-[420px] xl:w-[460px]"
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  draggable={false}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 ring-1 ring-white/10" />

                <div className="absolute left-4 top-4 z-20 md:left-5 md:top-5">
                  <div className="rounded-full border border-white/10 bg-black/35 px-3 py-2 backdrop-blur-md">
                    <span className="text-[10px] uppercase tracking-[0.24em] text-white/65 md:text-[11px]">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="absolute right-3 top-3 z-20 md:right-5 md:top-5">
                  <div className="h-20 w-20 md:h-24 md:w-24">
                    <CircularText
                      text={`${project.title.toUpperCase()} ✦ ${project.category.toUpperCase()} ✦ `}
                      onHover="speedUp"
                      spinDuration={20}
                      className="h-full w-full text-[9px] tracking-[0.18em] text-white/80 md:text-[10px]"
                    />
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 z-20 p-4 md:p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: project.accent }}
                    />
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white/55 md:text-[11px]">
                      {project.year}
                    </span>
                  </div>

                  <h4 className="text-2xl leading-[0.95] tracking-[-0.04em] text-white md:text-3xl">
                    {project.title}
                  </h4>
                  <p className="mt-2 text-sm text-white/55 md:text-base">
                    {project.subtitle}
                  </p>
                </div>
              </div>

              <div className="space-y-5 p-4 md:p-5 md:pt-5">
                <p className="max-w-md text-sm leading-7 text-white/58">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      className="rounded-full bg-white/[0.04] px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white/50"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <button className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-white/85">
                  Open Study
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function WorkPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const categoryRef = useRef<HTMLElement | null>(null);
  const featuredRef = useRef<HTMLDivElement | null>(null);
  const archiveRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const [activeCategory, setActiveCategory] = useState<WorkCategory | "all">(
    "all",
  );
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);
  const [heroReady, setHeroReady] = useState(false);
  const [odometerVisible, setOdometerVisible] = useState(false);

  const allCategories = useMemo(
    () => [{ id: "all" as const, label: "All" }, ...categories],
    [],
  );

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  const featuredProjects = useMemo(() => {
    const found = filteredProjects.filter((project) => project.featured);
    return found.length ? found : filteredProjects.slice(0, 4);
  }, [filteredProjects]);

  const groupedArchiveRows = useMemo(() => {
    const source = activeCategory === "all" ? projects : filteredProjects;
    return categories
      .map((category) => ({
        category,
        items: source.filter((project) => project.category === category.id),
      }))
      .filter((row) => row.items.length > 0);
  }, [activeCategory, filteredProjects]);

  useEffect(() => {
    setActiveFeaturedIndex(0);
  }, [activeCategory]);

  useEffect(() => {
    const timeout = setTimeout(() => setHeroReady(true), 150);
    return () => clearTimeout(timeout);
  }, []);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const hero = heroRef.current;
      const category = categoryRef.current;
      const featured = featuredRef.current;
      const archive = archiveRef.current;
      const progress = progressRef.current;

      if (hero) {
        gsap.fromTo(
          hero.querySelectorAll("[data-hero-reveal]"),
          { y: 60, opacity: 0, filter: "blur(14px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.15,
            stagger: 0.09,
            ease: "power3.out",
            delay: 0.15,
          },
        );
      }

      if (category) {
        gsap.fromTo(
          category,
          { y: -28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: category,
              start: "top 85%",
            },
          },
        );
      }

      const rows = gsap.utils.toArray<HTMLElement>("[data-featured-row]");
      rows.forEach((row, index) => {
        ScrollTrigger.create({
          trigger: row,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveFeaturedIndex(index),
          onEnterBack: () => setActiveFeaturedIndex(index),
        });

        const inner = row.querySelector("[data-featured-inner]");
        if (inner) {
          gsap.fromTo(
            inner,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 82%",
              },
            },
          );
        }
      });

      if (featured) {
        const sticky = featured.querySelector("[data-sticky-preview]");
        if (sticky && window.innerWidth >= 768) {
          ScrollTrigger.create({
            trigger: featured,
            start: "top top",
            end: "bottom bottom",
            pin: sticky,
            pinSpacing: false,
          });
        }

        ScrollTrigger.create({
          trigger: featured,
          start: "top 70%",
          end: "bottom 30%",
          onEnter: () => setOdometerVisible(true),
          onEnterBack: () => setOdometerVisible(true),
          onLeave: () => setOdometerVisible(false),
          onLeaveBack: () => setOdometerVisible(false),
        });
      }

      if (progress && featured) {
        gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
        gsap.to(progress, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: featured,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }

      if (archive) {
        gsap.fromTo(
          archive.querySelectorAll("[data-archive-row]"),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: archive,
              start: "top 78%",
            },
          },
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, [featuredProjects, groupedArchiveRows]);

  return (
    <main
      ref={rootRef}
      className="overflow-x-clip bg-black text-white selection:bg-white/20 selection:text-white"
    >
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <OdometerMini
        current={Math.min(
          activeFeaturedIndex + 1,
          Math.max(featuredProjects.length, 1),
        )}
        total={Math.max(featuredProjects.length, 1)}
        visible={odometerVisible}
      />

      <section
        ref={heroRef}
        className="relative flex min-h-screen items-end overflow-hidden px-5 pb-14 pt-28 md:px-10 md:pb-20"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-80">
            <Ferrofluid
              colors={["#ffffff", "#d4d4d8", "#52525b"]}
              speed={0.42}
              scale={1.28}
              turbulence={0.58}
              fluidity={0.14}
              rimWidth={0.2}
              sharpness={1.7}
              shimmer={1.2}
              glow={1.7}
              flowDirection="down"
              opacity={0.7}
              mouseInteraction
              mouseStrength={0.8}
              mouseRadius={0.34}
            />
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_35%),linear-gradient(to_bottom,rgba(0,0,0,0.08),rgba(0,0,0,0.75)_60%,#000_100%)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1600px]">
          <div className="max-w-[1120px]">
            <h1 className="max-w-6xl  justify-center  font-serif text-[clamp(4rem,10vw,10rem)] leading-[0.9] tracking-[-0.055em] text-white">
              {heroReady ? (
                <BlurText
                  text="Work across web, motion, campaigns, film, and visual systems."
                  delay={80}
                  animateBy="words"
                  direction="top"
                  className="inline-block"
                />
              ) : (
                <span data-hero-reveal>
                  Work across web, motion, campaigns, film, and visual systems.
                </span>
              )}
            </h1>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-t border-white/10 px-3 py-10 md:px-6 md:py-14">
        <div className="mx-auto max-w-[1600px]">
          <CurvedLoop
            marqueeText="WEB ✦ 2D ✦ VIDEO ✦ SOCIAL ✦ BRANDING ✦ CAMPAIGNS ✦"
            speed={1.8}
            curveAmount={320}
            direction="right"
            interactive
            className="py-6 text-[clamp(1.5rem,4vw,3.75rem)] font-light tracking-[-0.04em] text-white/80"
          />
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

      <section ref={featuredRef} className="relative">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-5 py-10 md:grid-cols-12 md:gap-8 md:px-10 md:py-20">
          <div className="md:col-span-5">
            {featuredProjects.map((project, index) => (
              <article
                key={project.id}
                data-featured-row
                className="flex min-h-[80vh] items-center border-b border-white/10 py-12 last:border-b-0 md:min-h-screen md:py-20"
              >
                <div data-featured-inner className="max-w-xl">
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: project.accent }}
                    />
                    <span className="text-[11px] uppercase tracking-[0.24em] text-white/35 md:text-xs">
                      {String(index + 1).padStart(2, "0")} / {project.category}
                    </span>
                  </div>

                  <h3 className="text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.92] tracking-[-0.05em] text-white">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-base text-white/55 md:text-xl">
                    {project.subtitle}
                  </p>

                  <p className="mt-8 max-w-lg text-sm leading-7 text-white/62 md:text-base">
                    {project.description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {project.services.map((service) => (
                      <span
                        key={service}
                        className="rounded-full border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white/50 md:text-[11px]"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  <div className="mt-10 flex items-center gap-5">
                    <span className="text-sm text-white/35">
                      {project.year}
                    </span>
                    <div className="h-px w-12 bg-white/15" />
                    <button className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-white/80">
                      View Project
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="md:col-span-7">
            <div
              data-sticky-preview
              className="top-24 h-[64vh] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] md:sticky md:h-[calc(100vh-8rem)]"
            >
              <AnimatePresence mode="wait">
                {featuredProjects[activeFeaturedIndex] && (
                  <motion.div
                    key={featuredProjects[activeFeaturedIndex].id}
                    initial={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.985, filter: "blur(8px)" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="relative h-full w-full"
                  >
                    <img
                      src={featuredProjects[activeFeaturedIndex].image}
                      alt={featuredProjects[activeFeaturedIndex].title}
                      className="h-full w-full object-cover"
                      draggable={false}
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.88),rgba(0,0,0,0.18)_45%,rgba(0,0,0,0.12))]" />

                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.65,
                        delay: 0.1,
                        ease: "easeOut",
                      }}
                      className="absolute inset-x-0 bottom-0 p-6 md:p-10"
                    >
                      <div className="mb-4 flex items-center gap-3">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{
                            backgroundColor:
                              featuredProjects[activeFeaturedIndex].accent,
                          }}
                        />
                        <span className="text-[11px] uppercase tracking-[0.22em] text-white/45 md:text-xs">
                          {featuredProjects[activeFeaturedIndex].category}
                        </span>
                      </div>

                      <h4 className="max-w-3xl text-3xl leading-[0.96] tracking-[-0.04em] text-white md:text-6xl">
                        {featuredProjects[activeFeaturedIndex].title}
                      </h4>

                      <div className="mt-4 flex flex-wrap items-center gap-3 text-white/55">
                        <span>
                          {featuredProjects[activeFeaturedIndex].subtitle}
                        </span>
                        <span className="text-white/22">•</span>
                        <span>
                          {featuredProjects[activeFeaturedIndex].year}
                        </span>
                      </div>
                    </motion.div>

                    <div className="absolute inset-0 ring-1 ring-white/10" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={archiveRef}
        className="border-t border-white/10 bg-black px-5 py-18 md:px-10 md:py-24"
      >
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/38 md:text-xs">
                More Selected Work
              </p>
              <h2 className="mt-3 text-3xl tracking-[-0.04em] text-white md:text-6xl">
                Browse by category, without the clutter.
              </h2>
            </div>

            <div className="max-w-xl text-sm leading-7 text-white/55 md:text-base">
              Each row is horizontally browsable with previous and next
              controls, so you can keep adding work without turning this section
              into a crowded grid.
            </div>
          </div>

          <div className="space-y-14 md:space-y-20">
            {groupedArchiveRows.map((row) => (
              <div key={row.category.id} data-archive-row>
                <ArchiveRow title={row.category.label} items={row.items} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/10 px-5 py-20 md:px-10 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_40%)]" />
        <div className="relative mx-auto max-w-[1600px]">
          <div className="max-w-5xl">
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/38 md:text-xs">
              Next
            </p>
            <h2 className="mt-4 max-w-5xl text-[clamp(2.75rem,6vw,6.5rem)] leading-[0.94] tracking-[-0.05em] text-white">
              Building visual systems, stories, and interfaces that don’t sit
              still.
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/58 md:text-lg md:leading-8">
              This closing section is spaced more openly so the page can
              breathe, especially on mobile, while still leading naturally into
              the final motion cue.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="rounded-full bg-white px-6 py-4 text-sm uppercase tracking-[0.18em] text-black transition-transform duration-300 hover:scale-[1.02]">
                Start a Project
              </button>
              <button className="rounded-full border border-white/15 px-6 py-4 text-sm uppercase tracking-[0.18em] text-white/80">
                View Full Archive
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
