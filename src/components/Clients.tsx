import Image from "next/image";

const logos = [
  { src: "/images/logo-01.png", alt: "Client 1" },
  { src: "/images/logo-02.png", alt: "Client 2" },
  { src: "/images/logo-03.png", alt: "Client 3" },
  { src: "/images/logo-09.png", alt: "Client 9" },
  { src: "/images/logo-04.png", alt: "Client 4", blend: true },
  { src: "/images/logo-05.png", alt: "Client 5" },
  { src: "/images/logo-06.png", alt: "Client 6" },
  { src: "/images/logo-07.png", alt: "Client 7" },
  { src: "/images/logo-08.png", alt: "Client 8" },
  { src: "/images/logo-10.png", alt: "Client 10" },
  { src: "/images/logo-11.png", alt: "Client 11" },
  { src: "/images/logo-12.png", alt: "Client 12" },
  { src: "/images/logo-13.png", alt: "Client 13" },
  { src: "/images/logo-14.png", alt: "Client 14" },
  { src: "/images/logo-15.png", alt: "Client 15" },
];

export default function Clients() {
  return (
    <section className="relative w-full h-screen bg-bg overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/clients-bg.png"
          alt=""
          fill
          className="object-cover -scale-x-100 -scale-y-100"
        />
      </div>

      {/* Title */}
      <p className="absolute top-[162px] left-[calc(50%-767px)] text-[40px] font-garamond text-white tracking-[-0.8px] blur-[4px]">
        <span className="leading-[0.84]">Because</span>{" "}
        <span className="font-bold italic uppercase leading-[0.84]">
          &quot;good enough&quot;{" "}
        </span>
        <span className="leading-[0.84]">was never the plan.</span>
      </p>

      {/* Description */}
      <div
        className="absolute top-[277px] left-[calc(50%-767px)] text-[20px] font-light text-white leading-[1.4] w-[788px] blur-[0.5px] mix-blend-difference whitespace-pre-wrap"
        style={{
          textShadow: "0px 0px 33px rgba(255,255,255,0.3)",
        }}
      >
        <p>
          Brands that trusted Kurojin.studio to shape how the world sees them.
        </p>
        <p>
          From startups to established names, we build with those who value
          craft.
        </p>
      </div>

      {/* Logo grid container */}
      <div className="absolute top-[454px] left-1/2 -translate-x-1/2 w-[1533px] h-[626px] bg-black/88 border border-black overflow-hidden">
        {/* Side fades */}
        <div className="absolute top-0 left-0 w-[274px] h-[547px] bg-bg blur-[25px] z-10" />
        <div className="absolute top-0 right-0 w-[274px] h-[547px] bg-bg blur-[25px] z-10" />

        {/* Logo grid */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-wrap items-center justify-center gap-x-[71px] gap-y-[44px] w-[1918px]">
          {logos.map((logo, i) => (
            <div
              key={i}
              className={`relative w-[150px] h-[150px] shrink-0 ${
                logo.blend ? "mix-blend-plus-lighter" : ""
              }`}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative side image */}
      <div className="absolute top-[358px] right-[calc(50%-781px)] w-[78px] h-[264px] -rotate-90 origin-center mix-blend-color-dodge opacity-90">
        <Image
          src="/images/decor-clients.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
