import Image from "next/image";

export default function Work() {
  return (
    <section
      id="work"
      className="relative w-full h-screen bg-bg overflow-hidden"
    >
      {/* Background image container */}
      <div className="absolute top-[13%] left-[8%] right-[8%] h-[74vh] max-h-[802px] shadow-[0px_0px_20px_0px_rgba(255,255,255,0.11)] overflow-hidden">
        <Image src="/images/work-bg.png" alt="" fill className="object-cover" />
      </div>

      {/* Center text */}
      <div className="absolute top-[41%] left-1/2 -translate-x-1/2 text-center max-w-[768px] w-[80%] z-10">
        <p
          className="font-garamond text-[36px] lg:text-[42px] xl:text-[48px] text-near-white uppercase"
          style={{
            textShadow: "0px 0px 56.7px rgba(255,255,255,0.6)",
          }}
        >
          <span className="font-normal leading-[1.08]">Every Pixel</span>
          <span className="font-bold italic leading-[1.08]">, </span>
          <span className="font-bold italic leading-[1.08] text-[#f2f2f2]">
            Handcrafted.
          </span>
        </p>
      </div>

      {/* CTA Button */}
      <div className="absolute top-[56%] left-1/2 -translate-x-1/2 z-10">
        <button className="bg-white text-bg rounded-[55px] h-[38px] px-[10px] w-[211px] font-montserrat font-extrabold italic text-[20px] uppercase overflow-hidden relative group cursor-pointer border border-bg">
          <span className="block transition-transform duration-300 group-hover:-translate-y-full leading-[1.4]">
            Our Work
          </span>
          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0 leading-[1.4]">
            Our Legacy
          </span>
        </button>
      </div>
    </section>
  );
}