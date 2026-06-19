'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onLoadComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onLoadComplete }) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const t1 = gsap.timeline();
    const exit1 = gsap.timeline({pause: true});
  
    if (titleRef.current && loaderRef.current) {
    t1.fromTo(letterRefs.current, { opacity: 0}, { opacity: 1, duration: 0.9, ease: "power2.inOut"});

    t1.to(letterRefs.current, { opacity: 1, scale: 0, y: 20, stagger: 0.05, duration: 0.8, ease: "back.out(1.7)", });
  }

})

  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} ref={el => {
        if (el) letterRefs.current[index] = el;
      }}
      className="inline-block"
      >
        {char}
      </span>
    ));

};

  return (
      <div ref={loaderRef} className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
        <h1  ref={titleRef} className="text-black text-[10vw] font-bold tracking-wider animate-pulse">
          {splitText("Kurojin.")}
        </h1>
      </div>
  )
}
 
export default  Loader;