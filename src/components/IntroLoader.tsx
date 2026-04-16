import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const IntroLoader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate progress
      gsap.to({}, {
        duration: 2.5,
        onUpdate: function() {
          setProgress(Math.round(this.progress() * 100));
        },
      });

      // Text reveal animation
      gsap.fromTo(
        textRef.current,
        { 
          opacity: 0, 
          y: 50,
          filter: 'blur(20px)',
        },
        { 
          opacity: 1, 
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
        }
      );

      // Glow pulse animation
      gsap.to(glowRef.current, {
        scale: 1.5,
        opacity: 0.3,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      });

      // Progress bar animation
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        { 
          scaleX: 1, 
          duration: 2.3,
          ease: 'power2.inOut',
        }
      );

      // Exit animation
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.1,
        filter: 'blur(30px)',
        duration: 0.6,
        delay: 2.3,
        ease: 'power3.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center"
    >
      {/* Animated background glow */}
      <div 
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          // Studio warm gradient: deep red -> orange for glow
          background: 'radial-gradient(circle, rgba(255,60,0,0.45) 0%, rgba(255,140,43,0.25) 30%, transparent 70%)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo text */}
        <div ref={textRef} className="text-center mb-12">
          <h1 className="font-garamond font-bold italic text-white text-5xl md:text-7xl lg:text-8xl tracking-tight text-glow">
            KUROJIN.
          </h1>
          <p className="font-montserrat text-white/60 text-sm md:text-base mt-4 tracking-[0.3em] uppercase">
            Studio
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-48 md:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div 
            ref={progressRef}
            className="h-full origin-left"
            style={{
              // Progress uses studio red->orange gradient
              background: 'linear-gradient(90deg, #ff3c00, #ff8c2b)',
              boxShadow: '0 0 20px rgba(255,60,0,0.45)',
            }}
          />
        </div>

        {/* Progress percentage */}
        <div className="mt-4 font-montserrat text-white/50 text-xs tracking-widest">
          {progress}%
        </div>

        {/* Japanese characters */}
        <div className="absolute -bottom-32 font-montserrat text-white/10 text-6xl md:text-8xl select-none">
          黒人
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-white/10" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-white/10" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-white/10" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-white/10" />
    </div>
  );
};

export default IntroLoader;
