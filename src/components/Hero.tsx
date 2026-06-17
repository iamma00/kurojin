import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[620px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">

        {/* ── Middle row: three branding items ── */}
        <div className="absolute top-[38%] md:top-[40%] left-4 md:left-[8%] right-4 md:right-[8%] z-10">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-6 lg:gap-8">
            
            {/* Left — KUROJIN. studio */}
            <div
              className="whitespace-nowrap flex items-baseline gap-2 order-2 md:order-1"
              style={{
                textShadow:
                  "0px 0px 25px rgba(255,189,136,0.37), -0.8px 0.8px 2.8px rgba(255,0,4,0.5), 0.8px -1.7px 1.7px rgba(0,178,255,0.53)",
              }}
            >
              <span className="font-garamond font-bold italic text-[42px] sm:text-[52px] md:text-[68px] lg:text-[85px] xl:text-[107px] text-white uppercase tracking-[-1.8px] md:tracking-[-2.1px]">
                Kurojin.
              </span>
              <span className="font-garamond italic text-[15px] sm:text-[18px] md:text-[22px] lg:text-[26px] xl:text-[30px] text-white align-baseline ml-[-3px] md:ml-[-4px]">
                studio
              </span>
            </div>

            {/* Center — icon + 黒人 */}
            <div className="flex items-center gap-3 order-1 md:order-2">
              <div className="relative w-[48px] h-[32px] sm:w-[55px] sm:h-[38px] md:w-[60px] md:h-[40px] xl:w-[87px] xl:h-[58px]">
                <Image
                  src="/images/kuro-icon.png"
                  alt="Kurojin"
                  fill
                  className="object-contain"
                />
              </div>
              <span
                className="font-montserrat text-[20px] sm:text-[24px] md:text-[28px] lg:text-[34px] xl:text-[36px] text-white tracking-[-0.6px] md:tracking-[-0.72px]"
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
              className="text-white text-[15px] sm:text-[17px] md:text-[20px] lg:text-[26px] xl:text-[32px] font-garamond tracking-[-0.5px] md:tracking-[-0.64px] text-center md:text-right max-w-[260px] md:max-w-none order-3"
              style={{
                textShadow:
                  "0px 0px 30.4px rgba(255,189,136,0.37), -1px 1px 3.4px rgba(255,0,4,0.5), 1px -2px 2px rgba(0,178,255,0.53)",
              }}
            >
              <span className="font-normal">Ordinary isn&apos;t in our </span>
              <span className="font-bold italic uppercase leading-[1.3] md:leading-[1.4]">
                vocabulary.
              </span>
            </p>
          </div>
        </div>

        {/* ── Bottom tagline ── */}
        <div className="absolute bottom-[8%] md:bottom-[10%] lg:bottom-[12%] left-1/2 -translate-x-1/2 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 z-10 px-4 text-center">
          <p
            className="text-white text-[15px] sm:text-[16px] md:text-[18px] lg:text-[22px] xl:text-[24px] font-light leading-tight sm:leading-[1.4] max-w-[380px]"
            style={{
              textShadow:
                "0px 4px 4px rgba(0,0,0,0.25), 0px 0px 12px #ffe0c8, -1px 1px 3.4px rgba(255,0,4,0.5), 1px -1px 2px rgba(0,178,255,0.53)",
            }}
          >
            A full-spectrum creative partner for modern brands.
          </p>
          
          <div className="relative w-[85px] h-[40px] sm:w-[100px] sm:h-[48px] xl:w-[156px] xl:h-[80px] mix-blend-plus-lighter shrink-0">
            <Image
              src="/images/decor-hero.png"
              alt=""
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}