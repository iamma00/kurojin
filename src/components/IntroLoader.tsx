import { useEffect, useRef, useState } from "react";

/**
 * IntroLoader - A full-screen animated intro loader with left-to-down slide effect and custom radial gradient.
 */
export default function IntroLoader({
  text = "LOADING",
  duration = 1800,
  onFinish,
}: {
  text?: string;
  duration?: number;
  onFinish?: () => void;
}) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [slideOut, setSlideOut] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSlideOut(true);
      setTimeout(() => {
        if (onFinish) onFinish();
        if (loaderRef.current) {
          loaderRef.current.style.opacity = "0";
          loaderRef.current.style.pointerEvents = "none";
        }
      }, 700); // match slide duration
    }, duration);
    return () => clearTimeout(timeout);
  }, [duration, onFinish]);

  return (
    <div
      ref={loaderRef}
      style={{
        position: "fixed",
        inset: 0,
        background:
          "radial-gradient(ellipse at 60% 0%, #ff8c2b 0%, #ff3c00 40%, #1a1a1a 100%)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.7s cubic-bezier(.77,0,.18,1)",
        pointerEvents: slideOut ? "none" : undefined,
      }}
    >
      <div
        className={`intro-slide${slideOut ? " slide-out" : ""}`}
        style={{ textAlign: "center" }}
      >
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 8,
        }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: 16,
                height: 16,
                margin: "0 2px",
                background: "#111",
                borderRadius: 3,
                transform: `translateY(${i % 2 === 0 ? -6 : 6}px)`,
                animation: `intro-bounce 1s ${i * 0.12}s infinite cubic-bezier(.77,0,.18,1)`,
              }}
            />
          ))}
        </div>
        <span style={{
          color: "#111",
          fontWeight: 600,
          fontSize: 18,
          letterSpacing: 1.5,
        }}>{text}</span>
      </div>
      <style>{`
        @keyframes intro-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        .intro-slide {
          animation: slide-in-left-down 0.7s cubic-bezier(.77,0,.18,1);
        }
        .intro-slide.slide-out {
          animation: slide-out-left-down 0.7s cubic-bezier(.77,0,.18,1) forwards;
        }
        @keyframes slide-in-left-down {
          0% { opacity: 0; transform: translate(-60vw, -60vh) scale(0.8); }
          100% { opacity: 1; transform: translate(0, 0) scale(1); }
        }
        @keyframes slide-out-left-down {
          0% { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(60vw, 60vh) scale(0.8); }
        }
      `}</style>
    </div>
  );
}
