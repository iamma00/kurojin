"use client";

import {
  useEffect,
  useRef,
  useCallback,
  useState,
} from "react";
import { motion } from "framer-motion";

const services = [
  {
    name: "Branding",
    video: "https://vimeo.com/showcase/12294817?video=1183919850",
  },
  {
    name: "Brand Strategy",
    video: "https://vimeo.com/showcase/12294817?video=1183919848",
  },
  {
    name: "Motion Graphics",
    video: "https://vimeo.com/showcase/12294817?video=1183919849",
  },
  {
    name: "Video Editing",
    video: "https://vimeo.com/showcase/12294817?video=1183919890",
  },
  {
    name: "3D Animation",
    video: "https://vimeo.com/showcase/12294817?video=1183919909",
  },
  {
    name: "Web Development",
    video: "https://vimeo.com/showcase/12294817?video=1183919928",
  },
  {
    name: "Naming & Packaging",
    video: "https://vimeo.com/showcase/12294817?video=1066726309",
  },
  {
    name: "Branding & Advertising",
    video: "https://vimeo.com/showcase/12294817?video=1066726233",
  },
];

const TextVideo: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLIFrameElement | null }>({});

  const setTextRef = useCallback((el: HTMLDivElement | null, index: number) => {
    textRefs.current[index] = el;
  }, []);

  const setVideoRef = useCallback(
    (el: HTMLIFrameElement | null, src: string) => {
      videoRefs.current[src] = el;
    },
    [],
  );

  // Lazy load Vimeo embeds
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const iframe = entry.target as HTMLIFrameElement;
            if (iframe && !iframe.src) {
              iframe.src = iframe.dataset.src || "";
            }
            observer.unobserve(iframe);
          }
        });
      },
      { threshold: 0.2 }
    );

    Object.values(videoRefs.current).forEach((videoEl) => {
      if (videoEl) observer.observe(videoEl);
    });

    return () => observer.disconnect();
  }, []);

  const handleSelect = useCallback((service: any, index: number) => {
    setActiveIndex(index);
    setActiveVideo(service.video);
  }, []);

  const handleVideoContainerHover = useCallback(() => {
    if (activeIndex !== -1 && services[activeIndex]) {
      setActiveVideo(services[activeIndex].video);
    }
  }, [activeIndex]);

  return (
    <div className="bg-transparent lg:h-[80vw] h-[115vh] w-full" ref={containerRef}>
      <div className="w-full lg:h-[83vw] lg:p-14 p-4 relative">
        <h1 className="text-white lg:text-[3.5vw] text-sm mb-4">Our Services</h1>

        <div className="content flex flex-col-reverse lg:flex-row items-start justify-between gap-8 lg:gap-0">
          {/* ==================== VIDEO CONTAINER ==================== */}
          <div className="w-full lg:w-[100%] relative" style={{ height: "100%" }}>
            <div
              ref={videoContainerRef}
              className="media w-full lg:w-[45vw] aspect-video lg:aspect-square relative lg:sticky lg:top-20 rounded-lg overflow-hidden"
              onMouseEnter={handleVideoContainerHover}
              onMouseLeave={() => {
                setActiveIndex(-1);
                setActiveVideo("");
              }}
            >
              {services.map((service) => (
                <iframe
                  key={service.video}
                  ref={(el) => setVideoRef(el, service.video)}
                  data-src={`https://player.vimeo.com/video/${new URL(service.video).searchParams.get(
                    "video"
                  )}?autoplay=1&muted=1&loop=1&background=1`}
                  width="100%"
                  height="100%"
                  allow="autoplay; fullscreen"
                  className={`absolute inset-0 w-full h-full transition-opacity duration-300 object-cover ${
                    activeVideo === service.video ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ pointerEvents: "none" }}
                ></iframe>
              ))}
            </div>
          </div>

          {/* ==================== TEXT LIST ==================== */}
          <div className="text-content w-full lg:w-[70vw] lg:pl-8">
            {services.map((service, index) => (
              <motion.h2
                key={index}
                ref={(el) => setTextRef(el, index)}
                className="lg:text-[4.5vw] text-xl md:text-2xl font-bold tracking-tight leading-none mb-4 lg:mb-2 cursor-pointer text-[#333333] active:text-white transition-colors"
                initial={{ x: 0 }}
                animate={{
                  x: activeIndex === index ? 30 : 0,
                  color: activeIndex === index ? "#ffffff" : "#333333",
                }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => handleSelect(service, index)}
                onClick={() => handleSelect(service, index)}
                onMouseLeave={() => {
                  setActiveVideo("");
                  setActiveIndex(-1);
                }}
              >
                {service.name}
              </motion.h2>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextVideo;