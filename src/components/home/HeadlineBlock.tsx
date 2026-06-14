'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InlineImageProps {
  images: string[];
  interval?: number;
  width?: number;
  height?: number;
  className?: string;
}

// Placeholder colors for when images fail to load
const placeholderColors = [
  '#2d2d2d',
  '#3d3d3d',
  '#4d4d4d',
];

// Animated inline image that swaps vertically
function AnimatedInlineImage({ 
  images, 
  interval = 5000, 
  width = 50,
  height = 50,
  className = ''
}: InlineImageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errorSet, setErrorSet] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (images.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const hasError = errorSet.has(currentIndex);

  if (images.length === 0) {
    return (
      <span 
        className={`inline-block align-middle rounded-lg ${className}`}
        style={{ 
          width, 
          height, 
          backgroundColor: placeholderColors[0] 
        }}
      />
    );
  }

  return (
    <span 
      className={`inline-block relative align-middle overflow-hidden rounded-lg ${className}`}
      style={{ width, height }}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={currentIndex}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.4, 0, 0.2, 1]
          }}
          className="absolute inset-0"
          style={hasError ? { backgroundColor: placeholderColors[currentIndex % 3] } : undefined}
        >
          {!hasError && (
            <img
              src={images[currentIndex]}
              alt=""
              className="w-full h-full object-cover rounded-lg"
              onError={() => setErrorSet((prev) => new Set(prev).add(currentIndex))}
            />
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

interface HeadlineBlockProps {
  inlineImages?: string[][];
  swapInterval?: number;
}

// Default inline images
const defaultInlineImageSets = [
  ['/assets/inline/cittaora_06.jpg', '/assets/inline/inline-1.png', '/assets/inline/inline-2.png', '/assets/inline/inline-3.png'],
  ['/assets/inline/cittaora_06.jpg', '/assets/inline/inline-4.png', '/assets/inline/inline-5.png', '/assets/inline/inline-6.png'],
  ['/assets/inline/cittaora_06.jpg', '/assets/inline/inline-7.png', '/assets/inline/inline-8.png', '/assets/inline/inline-9.png', '/assets/inline/inline-10.png'],
];

export function HeadlineBlock({ 
  inlineImages = defaultInlineImageSets,
  swapInterval = 5000 
}: HeadlineBlockProps) {
  // Stagger the intervals for each image set
  const intervals = [swapInterval, swapInterval + 1500, swapInterval + 3000];

  return (
    <section className="bg-black py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] tracking-tight text-center">
          {/* Line 1 */}
          <span className="block">
            <span className="text-white">+A</span>
            <AnimatedInlineImage 
              images={inlineImages[0] || defaultInlineImageSets[0]} 
              interval={intervals[0]}
              width={70}
              height={70}
              className="mx-2 md:mx-3"
            />
            <span className="text-white">FULL SERVICE</span>
          </span>
          
          {/* Line 2 */}
          <span className="block mt-2">
            <span className="text-white">DESIGN</span>
            <AnimatedInlineImage 
              images={inlineImages[1] || defaultInlineImageSets[1]} 
              interval={intervals[1]}
              width={90}
              height={70}
              className="mx-2 md:mx-3"
            />
            <span className="text-white">STUDIO—</span>
          </span>
          
          {/* Line 3 */}
          <span className="block mt-2">
            <span className="text-white">—SPECIALIZED IN</span>
          </span>
          
          {/* Line 4 */}
          <span className="block mt-2">
            <span className="text-white">CRAFTING</span>
            <AnimatedInlineImage 
              images={inlineImages[2] || defaultInlineImageSets[2]} 
              interval={intervals[2]}
              width={70}
              height={70}
              className="mx-2 md:mx-3"
            />
            <span className="text-white">VISUAL</span>
          </span>
          
          {/* Line 5 */}
          <span className="block mt-2">
            <span className="text-white">IDENTITES+</span>
          </span>
        </h1>
      </div>
    </section>
  );
}
