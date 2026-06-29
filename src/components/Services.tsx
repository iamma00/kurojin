import Image from "next/image";

import DomeGallery from "./DomeGallery";

import ScrollFloat from './ScrollFloat';



export default function Services() {
  return (
    <section
      id="services"
      className="relative w-full h-screen bg-black overflow-hidden"
    >
      <div style={{ width: "100vw", height: "120vh" }}>
        <DomeGallery
          fit={0.8}
          minRadius={600}
          maxVerticalRotationDeg={0}
          segments={34}
          dragDampening={2}
          grayscale
        />
      </div>

      {/* Section heading */}
      <p
        className="absolute top-[20%] left-1/2 -translate-x-1/2 text-center text-[300px] font-garamond italic font-light text-off-white tracking-[-0.8px] uppercase z-10 whitespace-nowrap"
        style={{
          textShadow: "0px 0px 40.9px rgba(255,236,185,0.6)",
        }}
      >
        <ScrollFloat
  animationDuration={1}
  ease='back.inOut(2)'
  scrollStart='center bottom+=50%'
  scrollEnd='bottom bottom-=40%'
  stagger={0.03}
>
  One core , All dimensions.
</ScrollFloat>
        
      </p>
    </section>
  );
}
