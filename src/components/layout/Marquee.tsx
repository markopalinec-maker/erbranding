'use client';

import { motion } from 'framer-motion';

interface MarqueeProps {
  text?: string;
}

export function Marquee({ text = 'ERBRANDING.STUDIO' }: MarqueeProps) {
  const repeatedText = Array(12).fill(text).join(' • ');

  return (
    <div className="overflow-hidden bg-black border-t border-neutral-800 py-4 flex flex-col gap-2">
      {/* Row 1 — scrolls right */}
      <motion.div
        className="whitespace-nowrap"
        animate={{ x: [-3000, 0] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 25,
            ease: 'linear',
          },
        }}
      >
        <span className="text-7xl md:text-9xl font-bold text-white tracking-tighter" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          {repeatedText}
        </span>
      </motion.div>

      {/* Row 2 — scrolls left */}
      <motion.div
        className="whitespace-nowrap"
        animate={{ x: [0, -3000] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 25,
            ease: 'linear',
          },
        }}
      >
        <span className="text-7xl md:text-9xl font-bold text-white tracking-tighter" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          {repeatedText}
        </span>
      </motion.div>
    </div>
  );
}

