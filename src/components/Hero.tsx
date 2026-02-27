import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0c0c0c]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Center branding */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
        <div className="flex items-baseline justify-center gap-2">
          {/* Kuro icon */}
          <div className="relative w-[87px] h-[58px] blur-[4px]">
            <Image
              src="/images/kuro-icon.png"
              alt="Kurojin"
              fill
              className="object-contain"
            />
          </div>
          {/* Japanese characters */}
          <span
            className="font-montserrat text-[36px] text-white tracking-[-0.72px] blur-[4px]"
            style={{
              textShadow:
                "0px 0px 30.4px rgba(255,189,136,0.37), -1px 1px 3.4px rgba(255,0,4,0.5), 1px -2px 2px rgba(0,178,255,0.53)",
            }}
          >
            黒人
          </span>
        </div>
      </div>

      {/* Large KUROJIN text */}
      <div
        className="absolute top-[465px] left-1/2 -translate-x-1/2 text-center blur-[3.4px] whitespace-nowrap z-10"
        style={{
          textShadow:
            "0px 0px 25px rgba(255,189,136,0.37), -0.8px 0.8px 2.8px rgba(255,0,4,0.5), 0.8px -1.7px 1.7px rgba(0,178,255,0.53)",
        }}
      >
        <span className="font-garamond font-bold italic text-[107px] text-white uppercase tracking-[-2.1px]">
          Kurojin.
        </span>
        <span className="font-garamond italic text-[30px] text-white">
          studio
        </span>
      </div>

      {/* Right side text */}
      <p
        className="absolute top-[517px] right-[calc(50%-660px)] text-center text-white text-[32px] font-garamond tracking-[-0.64px] blur-[4px] w-[415px] z-10"
        style={{
          textShadow:
            "0px 0px 30.4px rgba(255,189,136,0.37), -1px 1px 3.4px rgba(255,0,4,0.5), 1px -2px 2px rgba(0,178,255,0.53)",
        }}
      >
        <span className="leading-[1.4]">Ordinary isn&apos;t in our </span>
        <span className="italic uppercase leading-[1.4]">vocabulary.</span>
      </p>

      {/* Bottom tagline */}
      <p
        className="absolute bottom-[130px] left-1/2 -translate-x-1/2 text-center text-white text-[24px] font-light leading-[1.4] blur-[4px] w-[570px] z-10"
        style={{
          textShadow:
            "0px 4px 4px rgba(0,0,0,0.25), 0px 0px 12px #ffe0c8, -1px 1px 3.4px rgba(255,0,4,0.5), 1px -1px 2px rgba(0,178,255,0.53)",
        }}
      >
        A full-spectrum creative partner for modern brands.
      </p>

      {/* Decorative image near tagline */}
      <div className="absolute bottom-[144px] left-[calc(50%+259px)] w-[126px] h-[60px] mix-blend-plus-lighter z-10">
        <Image
          src="/images/decor-hero.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      {/* kurojin.studio watermark */}
      <p className="absolute top-[1002px] left-[calc(10%+3px)] font-garamond font-bold text-[20px] text-white tracking-[-0.4px] mix-blend-difference z-10">
        kurojin.studio
      </p>

      {/* Bottom line divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] z-20">
        <Image
          src="/images/line-divider-full.svg"
          alt=""
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
