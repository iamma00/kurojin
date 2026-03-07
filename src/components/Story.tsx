"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import DecryptedText from "./DecryptedText";

export default function Story() {
  const ref = useRef(null);

  /* Scroll progress */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* Smooth parallax layers */
  const bgY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "15%"]), {
    stiffness: 40,
    damping: 20,
  });

  const figureY = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]),
    { stiffness: 40, damping: 20 }
  );

  const textY = useTransform(scrollYProgress, [0, 0.4], ["60px", "0px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  /* Word reveal helper */
  const revealWords = (text: string) =>
    text.split(" ").map((word, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: i * 0.05,
          duration: 0.5,
          ease: "easeOut",
        }}
        className="inline-block mr-2"
      >
        {word}
      </motion.span>
    ));

  return (
    <section
      ref={ref}
      className="relative w-full h-[1085px] bg-black overflow-hidden perspective-[1200px]"
    >
      {/* PARTICLE ATMOSPHERE */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: ["0px", "-120px"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* BACKGROUND PARALLAX */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src="/images/story-bg.png"
          alt=""
          fill
          className="object-cover opacity-70"
        />

        {/* cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </motion.div>

      {/* CINEMATIC LIGHT SWEEP */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ x: ["-40%", "120%"] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="w-[400px] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent blur-3xl" />
      </motion.div>

      {/* HEADING */}
      <motion.div
        style={{ y: textY, opacity }}
        className="absolute top-[285px] left-[calc(50%-532px)] w-[468px] text-center text-off-white text-[40px] font-garamond tracking-[-0.8px] z-10"
      >
        {revealWords("Your focus is on what")}
        <span className="font-bold italic uppercase">
          {revealWords("you build")}
        </span>
      </motion.div>

      {/* BODY TEXT */}
      <p
        className="absolute top-[484px] left-[194px] text-white text-[15px] font-light leading-[1.4] w-[683px] text-justify mix-blend-difference z-10"
      >
<div style={{ marginTop: '4rem' }}>
<DecryptedText
  text="Every brand begins with a story. We shape that story into a powerful Brand Identity, bring it to life through mindful Design, craft visuals with Product Shoots and immersive 3D Content, build your presence with high-impact Web Experiences, and finally set the momentum through strategic Social Media."
  animateOn="both"
  revealDirection="start"
  sequential
  speed={0.2}
  useOriginalCharsOnly={false}
/>
</div>
      </p>

      {/* SECOND HEADING */}
      <motion.div
        style={{ y: textY, opacity }}
        className="absolute top-[692px] left-[calc(50%-766px)] text-white text-[40px] uppercase w-[554px] z-10 font-garamond"
      >
        {revealWords("We Care How")}
        <span className="italic">{revealWords("The World Sees It")}</span>
      </motion.div>

      {/* FLOATING FIGURE */}
      <motion.div
        style={{ y: figureY }}
        animate={{
          y: ["0px", "-20px", "0px"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 -translate-y-1/2 right-[calc(50%-687px)] w-[504px] h-[756px] mix-blend-plus-lighter z-10"
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/story-figure.png"
            alt=""
            fill
            className="object-cover"
          />

          {/* glow */}
          <motion.div
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute inset-0 bg-white/10 blur-[80px]"
          />

          {/* fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[75%] to-black to-[94%]" />
        </div>
      </motion.div>

      {/* DECOR PLANT SWAY */}
      <motion.div
        animate={{ rotate: [-90, -87, -90] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[88px] right-[calc(50%-840px)] w-[121px] h-[341px] -rotate-90 mix-blend-plus-lighter z-10"
      >
        <Image
          src="/images/decor-plant.png"
          alt=""
          fill
          className="object-cover"
        />
      </motion.div>

      {/* DIVIDER */}
      <div className="absolute bottom-[-2px] left-[10.1%] right-[10.1%] h-[2px]">
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