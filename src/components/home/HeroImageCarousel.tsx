'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroCarouselProps {
  images?: string[];
  autoPlayInterval?: number;
}

// Default placeholder images - replace with actual hero images in /public/assets/hero/
const defaultImages = [
  '/assets/hero/hero-1.jpg',
  '/assets/hero/hero-2.jpg',
  '/assets/hero/hero-3.jpg',
];

// Placeholder gradient backgrounds when images are missing
const placeholderGradients = [
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #2d2d2d 100%)',
  'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
];

export function HeroImageCarousel({ 
  images = defaultImages, 
  autoPlayInterval = 5000 
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = images.length - 1;
      if (newIndex >= images.length) newIndex = 0;
      return newIndex;
    });
  }, [images.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  };

  // Auto-play functionality
  useEffect(() => {
    if (images.length <= 1) return;
    
    const timer = setInterval(() => {
      paginate(1);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlayInterval, images.length, paginate]);

  if (images.length === 0) {
    return (
      <div className="relative w-full h-[70vh] bg-neutral-900 flex items-center justify-center">
        <p className="text-neutral-500">Add hero images to /public/assets/hero/</p>
      </div>
    );
  }

  const hasImageError = imageErrors.has(currentIndex);

  return (
    <div className="relative w-full h-[70vh] overflow-hidden bg-black">
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0"
          style={hasImageError ? { background: placeholderGradients[currentIndex % 3] } : undefined}
        >
          {!hasImageError && (
            <Image
              src={images[currentIndex]}
              alt={`Hero slide ${currentIndex + 1}`}
              fill
              className="object-cover"
              priority={currentIndex === 0}
              sizes="100vw"
              onError={() => handleImageError(currentIndex)}
            />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => paginate(-1)}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}

      {/* Pagination Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-0.5 transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 bg-white' 
                  : 'w-4 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
