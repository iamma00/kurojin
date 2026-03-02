import Image from "next/image";

interface Logo {
  src: string;
  alt: string;
  blend?: boolean;
}

const row1: Logo[] = [
  { src: "/images/logo-01.png", alt: "Client 1" },
  { src: "/images/logo-02.png", alt: "Client 2" },
  { src: "/images/logo-03.png", alt: "Client 3" },
  { src: "/images/logo-09.png", alt: "Client 9" },
  { src: "/images/logo-04.png", alt: "Client 4", blend: true },
  { src: "/images/logo-05.png", alt: "Client 5" },
  { src: "/images/logo-06.png", alt: "Client 6" },
  { src: "/images/logo-07.png", alt: "Client 7" },
];

const row2: Logo[] = [
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
      <p className="absolute top-[14%] left-[8%] text-[30px] xl:text-[40px] font-garamond text-white tracking-[-0.8px] z-10">
        <span className="leading-[0.84]">Because</span>{" "}
        <span className="font-bold italic uppercase leading-[0.84]">
          &quot;good enough&quot;{" "}
        </span>
        <span className="leading-[0.84]">was never the plan.</span>
      </p>

      {/* Description */}
      <div
        className="absolute top-[22%] left-[8%] text-[16px] xl:text-[20px] font-light text-white leading-[1.4] max-w-[600px] mix-blend-difference z-10"
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

      {/* Decorative side image */}
      <div className="absolute top-[18%] right-[8%] w-[78px] h-[264px] -rotate-90 origin-center mix-blend-color-dodge opacity-90 z-10">
        <Image
          src="/images/decor-clients.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      {/* Logo grid container — full width, centered vertically in lower portion */}
      <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[80%] bg-black/88 border border-black overflow-hidden py-8 xl:py-12 z-10">
        {/* Side fades */}
        <div className="absolute top-0 left-0 w-[12%] h-full bg-bg blur-[25px] z-10" />
        <div className="absolute top-0 right-0 w-[12%] h-full bg-bg blur-[25px] z-10" />

        {/* Row 1 */}
        <div className="relative z-0 flex items-center justify-center gap-x-6 xl:gap-x-12 2xl:gap-x-16 mb-6 xl:mb-10 px-[8%]">
          {row1.map((logo, i) => (
            <div
              key={i}
              className={`relative w-[80px] h-[80px] xl:w-[120px] xl:h-[120px] 2xl:w-[150px] 2xl:h-[150px] shrink-0 ${
                logo.blend ? "mix-blend-plus-lighter" : ""
              }`}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="relative z-0 flex items-center justify-center gap-x-6 xl:gap-x-12 2xl:gap-x-16 px-[8%]">
          {row2.map((logo, i) => (
            <div
              key={i}
              className={`relative w-[80px] h-[80px] xl:w-[120px] xl:h-[120px] 2xl:w-[150px] 2xl:h-[150px] shrink-0 ${
                logo.blend ? "mix-blend-plus-lighter" : ""
              }`}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
