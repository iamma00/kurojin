import Image from "next/image";

export default function Budget() {
  return (
    <section
      id="contact"
      className="relative w-full h-screen bg-bg overflow-hidden"
    >
      {/* Background glow container */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1426px] h-[802px] shadow-[0px_0px_20px_0px_rgba(255,255,255,0.11)]">
        {/* Red glow (bottom-right) */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at bottom right, rgba(196,37,8,1) 0%, rgba(49,9,2,1) 50%, rgba(0,0,0,1) 100%)",
          }}
        />
        {/* Teal glow (top-left) */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at top left, rgba(8,196,181,1) 0%, rgba(2,49,45,1) 50%, rgba(0,0,0,1) 100%)",
          }}
        />
      </div>

      {/* Center orb/video placeholder */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full mix-blend-screen overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-white/5 via-white/2 to-transparent rounded-full" />
      </div>

      {/* Text content */}
      <div className="absolute top-[480px] left-1/2 -translate-x-1/2 text-center w-[768px] z-10">
        <p className="font-garamond text-[48px] text-near-white uppercase mix-blend-difference leading-[1.08]">
          <span className="font-normal">Budget Never</span>
          <span className="font-bold italic"> Limits Quality</span>
        </p>
        <p className="mt-8 text-light-gray text-[15px] font-light leading-[1.4] w-[655px] mx-auto mix-blend-difference">
          Budgets change. Standards don&apos;t. When numbers shift, we refine
          the output not the excellence. You get less volume, never less value.
        </p>
      </div>

      {/* CTA Button */}
      <div className="absolute bottom-[calc(100%-812px)] left-1/2 -translate-x-1/2 z-10">
        <button className="bg-white text-bg rounded-[55px] h-[38px] px-5 w-[139px] font-montserrat font-extrabold italic text-[20px] uppercase overflow-hidden relative group cursor-pointer">
          <span className="block transition-transform duration-300 group-hover:-translate-y-full leading-[1.4]">
            LET&apos;s TALK
          </span>
          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0 leading-[1.4]">
            LET&apos;S GO
          </span>
        </button>
      </div>

      {/* Bottom line divider */}
      <div className="absolute bottom-0 left-[10.1%] right-[10.1%] h-[2px]">
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
