// components/BrutalistWorkList.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const projects = [
  { id: 1, title: 'Brand Film X', year: '2024', tag: 'MOTION' },
  { id: 2, title: 'Neon Campaign', year: '2024', tag: '3D' },
  { id: 3, title: 'Identity Shift', year: '2023', tag: 'BRANDING' },
];

export default function BrutalistWorkList() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="bg-black min-h-screen py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title - Unmasked, raw */}
        <div className="border-b border-white/10 pb-4 mb-12">
          <span className="text-white/40 text-sm tracking-[0.3em] uppercase">(Selected Work)</span>
        </div>

        {projects.map((project, i) => {
          // Huncwot alternates slide directions
          const isEven = i % 2 === 0;
          const slideFrom = isEven ? { x: '-100vw' } : { x: '100vw' };

          return (
            <motion.div
              key={project.id}
              initial={slideFrom}
              whileInView={{ x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 1,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.1, // Slight delay per row for that cascading feel
              }}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              className="group border-b border-white/10 py-8 flex items-center justify-between cursor-pointer relative overflow-hidden"
            >
              {/* Hover background flash */}
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: '-100%' }}
                animate={{ x: hovered === project.id ? '0%' : '-100%' }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              />

              {/* Text content */}
              <div className="flex items-center gap-8 relative z-10">
                <span className="text-white/30 group-hover:text-black transition-colors duration-300 text-sm font-mono">
                  0{i + 1}
                </span>
                <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white group-hover:text-black transition-colors duration-300">
                  {project.title}
                </h2>
              </div>

              <div className="relative z-10 flex items-center gap-4">
                <span className="text-white/40 group-hover:text-black/60 transition-colors duration-300 text-sm border border-white/20 group-hover:border-black/30 px-3 py-1 rounded-full">
                  {project.tag}
                </span>
                <span className="text-white/40 group-hover:text-black/60 transition-colors duration-300 font-mono">
                  {project.year}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}