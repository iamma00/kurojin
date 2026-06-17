// components/Loader.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
    ``
  useEffect(() => {
    // Fast, aggressive counting
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black flex items-center justify-between px-12"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Left side: Brand */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="text-white text-4xl font-bold tracking-tighter"
            >
              KUROJIN
            </motion.h1>
          </div>

          {/* Right side: Brutalist Counter */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="text-white text-[10rem] md:text-[14rem] font-bold leading-none tracking-tighter"
            >
              {Math.min(count, 100)}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}