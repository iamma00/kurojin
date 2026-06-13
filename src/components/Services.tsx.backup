import Image from "next/image";

const serviceCategories = [
  "Brand\nStrategy &\nDesign",
  "web Design",
  "filmmaking",
  "Product Design",
  "UI UX",
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative w-full h-screen bg-bg overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-bg" />
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/services-bg.png"
            alt=""
            fill
            className="object-cover -scale-x-100 -scale-y-100"
          />
        </div>
        {/* Vignette overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at right center, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
          }}
        />
      </div>

      {/* Section heading */}
      <p
        className="absolute top-[20%] left-1/2 -translate-x-1/2 text-center text-[40px] font-garamond italic font-light text-off-white tracking-[-0.8px] uppercase z-10 whitespace-nowrap"
        style={{
          textShadow: "0px 0px 40.9px rgba(255,236,185,0.6)",
        }}
      >
        One core , All dimensions.
      </p>

      {/* Description */}
      <p className="absolute top-[34%] left-1/2 -translate-x-1/2 text-center text-light-gray text-[15px] font-light leading-[1.4] max-w-[680px] z-10 px-6">
        Kurojin Studios is built on the idea that creativity shouldn&apos;t live
        in silos. Whether you&apos;re launching a brand, redefining an identity,
        or scaling your digital presence, you shouldn&apos;t have to chase
        multiple agencies. We unify every creative discipline strategy, design,
        tech, visuals, and digital growth under one seamless studio.
      </p>

      {/* CTA Button */}
      <div className="absolute top-[55%] left-1/2 -translate-x-1/2 z-10">
        <button className="bg-white text-bg rounded-[55px] h-[38px] px-[10px] w-[211px] font-montserrat font-extrabold italic text-[20px] uppercase overflow-hidden relative group cursor-pointer border border-bg">
          <span className="block transition-transform duration-300 group-hover:-translate-y-full leading-[1.4]">
            Our Services
          </span>
          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0 leading-[1.4]">
            Our Dimensions
          </span>
        </button>
      </div>

      {/* Service categories row */}
      <div className="absolute bottom-[22%] left-1/2 -translate-x-1/2 flex gap-[5vw] z-10 w-[min(85%,1020px)] justify-between">
        {serviceCategories.map((cat, i) => (
          <p
            key={i}
            className="text-light-gray text-[15px] font-medium leading-none uppercase whitespace-pre-line"
          >
            {cat}
          </p>
        ))}
      </div>

      {/* Scroll down arrow */}
      <div className="absolute bottom-[22%] right-[3.8%] w-[16px] h-[16px] mix-blend-difference z-10">
        <Image
          src="/images/down-arrow.svg"
          alt="Scroll down"
          fill
          className="object-contain"
        />
      </div>

      {/* Decorative flower */}
      <div className="absolute bottom-[20%] right-[8%] w-[75px] h-[186px] rotate-90 origin-center mix-blend-lighten z-10">
        <Image
          src="/images/decor-flower.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
