'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types';
import { urlFor } from '@/sanity/lib';

interface HeroCarouselProps {
  projects: Project[];
}

export function HeroCarousel({ projects }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  if (!projects || projects.length === 0) {
    return (
      <div className="relative aspect-[16/9] bg-neutral-900 flex items-center justify-center">
        <p className="text-neutral-500">No featured projects</p>
      </div>
    );
  }

  const currentProject = projects[currentIndex];

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-neutral-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Link href={`/projects/${currentProject.slug.current}`}>
              <Image
                src={urlFor(currentProject.coverImage.asset).width(1920).height(1080).url()}
                alt={currentProject.coverImage.alt || currentProject.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="absolute bottom-6 right-6 flex items-center gap-4">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="Previous slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="Next slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Studio Name Overlay */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-6 h-0.5 bg-white" />
            <span className="w-6 h-0.5 bg-white" />
            <span className="w-6 h-0.5 bg-white" />
          </div>
          <span className="text-white text-sm tracking-wider">ERBRANDING.STUDIO</span>
          <div className="flex gap-1">
            <span className="w-6 h-0.5 bg-white" />
            <span className="w-6 h-0.5 bg-white" />
            <span className="w-6 h-0.5 bg-white" />
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
        {projects.map((project, index) => (
          <button
            key={project._id}
            onClick={() => setCurrentIndex(index)}
            className={`relative flex-shrink-0 w-32 h-24 overflow-hidden rounded ${
              index === currentIndex ? 'ring-2 ring-yellow-400' : ''
            }`}
          >
            <Image
              src={urlFor(project.coverImage.asset).width(200).height(150).url()}
              alt={project.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <span className="absolute bottom-1 left-2 text-xs text-white truncate max-w-[90%]">
              {project.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
