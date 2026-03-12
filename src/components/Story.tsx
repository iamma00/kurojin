import Image from "next/image";

export default function Story() {
  return (
    <section className="relative w-full h-screen bg-bg overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#080808]" />
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/story-bg.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgb(0,0,0) 0%, rgba(0,0,0,0) 25.8%), linear-gradient(0deg, rgb(0,0,0) 0%, rgba(0,0,0,0) 20.1%), linear-gradient(90deg, rgba(0,0,0,0.06) 8.3%, rgb(1,1,1) 33.5%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-[8%] gap-y-15">
        <p
          className="text-off-white text-[40px] font-garamond tracking-[-0.8px] whitespace-nowrap"
          style={{
            textShadow: "0px 0px 40.9px rgba(255,236,185,0.6)",
          }}
        >
          <span className="font-normal leading-[1.4] tracking-[-0.32px]">Your focus is on what </span><span className="font-bold italic uppercase">you build.</span>
        </p>

        <p
          className="text-white text-[15px] font-light leading-[1.4] max-w-[683px] blur-[0.5px] mix-blend-difference"
          style={{
            textShadow: "0px 0px 33px rgba(255,255,255,0.3)",
          }}
        >
          Every brand begins with a story. We shape that story into a powerful
          Brand Identity, bring it to life through mindful Design, craft visuals
          with Product Shoots & immersive 3D Content, build your presence with
          high-impact Web Experiences, and finally set the momentum through
          strategic Social Media.
        </p>

        <p
          className="text-white text-[40px] tracking-[-0.8px] uppercase whitespace-nowrap"
          style={{
            textShadow: "0px 0px 45.2px rgba(255,236,185,0.28)",
          }}
        >
          <span className="font-garamond font-light leading-[1.4]">We Care How </span><span className="font-garamond font-light italic leading-[1.4]">The World Sees It</span>
        </p>
      </div>

      {/* Bottom line divider */}
      <div className="absolute bottom-[-2px] left-[8%] right-[8%] h-[2px]">
        <Image
          src="/images/line-divider.svg"
          alt=""
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
