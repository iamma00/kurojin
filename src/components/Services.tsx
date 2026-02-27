import Image from "next/image";

const serviceCategories = [
  "Brand\nStrategy &\nDesign",
  "web Design",
  "filmmaking",
  "Product Design",
  "UI UX",
];

const servicesList = [
  "Branding",
  "3D Production",
  "Web Design & Dev",
  "Product/ads Shoot",
  "Marketing",
  "Printing Media",
  "Social Media",
  "Architectural Viz",
  "Post-Production",
  "Software visualization",
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
        className="absolute top-[219px] left-[calc(50%-765px)] text-[40px] font-garamond italic font-light text-off-white tracking-[-0.8px] uppercase z-10"
        style={{
          textShadow: "0px 0px 40.9px rgba(255,236,185,0.6)",
        }}
      >
        One core , All dimensions.
      </p>

      {/* Description */}
      <p className="absolute top-[392px] left-[calc(50%-765px)] text-light-gray text-[15px] font-light leading-[1.4] w-[680px] z-10">
        Kurojin Studios is built on the idea that creativity shouldn&apos;t live
        in silos. Whether you&apos;re launching a brand, redefining an identity,
        or scaling your digital presence, you shouldn&apos;t have to chase
        multiple agencies. We unify every creative discipline strategy, design,
        tech, visuals, and digital growth under one seamless studio.
      </p>

      {/* CTA Button */}
      <div className="absolute top-[611px] left-[calc(50%-765px)] z-10">
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
      <div className="absolute top-[811px] left-[calc(50%-765px)] flex gap-[114px] z-10">
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
      <div className="absolute bottom-[41px] left-[calc(50%-757px)] w-[16px] h-[16px] rotate-90 mix-blend-difference z-10">
        <Image
          src="/images/down-arrow.svg"
          alt="Scroll down"
          fill
          className="object-contain"
        />
      </div>

      {/* Floating services list (right side) */}
      <div className="absolute top-1/2 -translate-y-1/2 right-[calc(50%-784px)] w-[588px] h-[904px] rounded-[35px] overflow-y-auto overflow-x-hidden blur-[2.5px] mix-blend-color-dodge z-10">
        <div className="pt-[25px] pl-[calc(50%-133px)]">
          {servicesList.map((service, i) => (
            <p
              key={i}
              className="font-garamond italic text-[36px] uppercase leading-[2.39] bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(175,146,128,1) 50%, rgba(94,36,0,1) 100%)",
              }}
            >
              {service}
            </p>
          ))}
        </div>
      </div>

      {/* Decorative flower */}
      <div className="absolute top-[588px] left-[514px] w-[75px] h-[186px] rotate-90 origin-center mix-blend-lighten z-10">
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
