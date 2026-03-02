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
          className="object-cover rotate-180"
          priority
        />

        {/* ── Middle row: three branding items ── */}
        <div className="absolute top-[40%] left-40 right-40 flex items-center justify-between px-[8%] z-10">
          {/* Left — KUROJIN. studio */}
          <div
            className="whitespace-nowrap flex items-baseline gap-2"
            style={{
              textShadow:
                "0px 0px 25px rgba(255,189,136,0.37), -0.8px 0.8px 2.8px rgba(255,0,4,0.5), 0.8px -1.7px 1.7px rgba(0,178,255,0.53)",
            }}
          >
            <span className="font-garamond font-bold italic text-[80px] xl:text-[107px] text-white uppercase tracking-[-2.1px]">
              Kurojin.
            </span>
            <span className="font-garamond italic text-[22px] xl:text-[30px] text-white align-baseline ml-[-4px]">
              studio
            </span>
          </div>

          {/* Center — icon + 黒人 */}
          <div className="flex items-center gap-3">
            <div className="relative w-[60px] h-[40px] xl:w-[87px] xl:h-[58px]">
              <Image
                src="/images/kuro-icon.png"
                alt="Kurojin"
                fill
                className="object-contain"
              />
            </div>
            <span
              className="font-montserrat text-[28px] xl:text-[36px] text-white tracking-[-0.72px]"
              style={{
                textShadow:
                  "0px 0px 30.4px rgba(255,189,136,0.37), -1px 1px 3.4px rgba(255,0,4,0.5), 1px -2px 2px rgba(0,178,255,0.53)",
              }}
            >
              黒人
            </span>
          </div>

          {/* Right — Ordinary isn't in our VOCABULARY. */}
          <p
            className="text-white text-[24px] xl:text-[32px] font-garamond tracking-[-0.64px] text-right whitespace-nowrap"
            style={{
              textShadow:
                "0px 0px 30.4px rgba(255,189,136,0.37), -1px 1px 3.4px rgba(255,0,4,0.5), 1px -2px 2px rgba(0,178,255,0.53)",
            }}
          >
            <span className="font-normal">Ordinary isn&apos;t in our </span>
            <span className="font-bold italic uppercase leading-[1.4]">
              vocabulary.
            </span>
          </p>
        </div>

        {/* ── Bottom tagline ── */}
        <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
          <p
            className="text-white text-[18px] xl:text-[24px] font-light leading-[1.4] text-center"
            style={{
              textShadow:
                "0px 4px 4px rgba(0,0,0,0.25), 0px 0px 12px #ffe0c8, -1px 1px 3.4px rgba(255,0,4,0.5), 1px -1px 2px rgba(0,178,255,0.53)",
            }}
          >
            A full-spectrum creative partner for modern brands.
          </p>
          <div className="relative w-[100px] h-[48px] xl:w-[126px] xl:h-[60px] mix-blend-plus-lighter shrink-0">
            <Image
              src="/images/decor-hero.png"
              alt=""
              fill
              className="object-cover "
            />
          </div>
        </div>
      </div>

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
