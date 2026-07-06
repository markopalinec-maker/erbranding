'use client';

import { useState } from 'react';
import { GallerySection as GallerySectionType, SanityImage } from '@/types';
import { GallerySection } from './GallerySection';
import { Lightbox } from './Lightbox';
import { getRenderableImages } from './imageHelpers';

interface ProjectGalleryProps {
  sections: GallerySectionType[];
}

export function ProjectGallery({ sections }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const allImages: SanityImage[] = [];
  const sectionOffsets: number[] = [];

  for (const section of sections) {
    const renderableImages = getRenderableImages(section.images);
    sectionOffsets.push(allImages.length);
    allImages.push(...renderableImages);
  }

  const closeLightbox = () => setActiveIndex(null);
  const showPreviousImage = () => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null || allImages.length === 0) {
        return currentIndex;
      }

      return (currentIndex - 1 + allImages.length) % allImages.length;
    });
  };

  const showNextImage = () => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null || allImages.length === 0) {
        return currentIndex;
      }

      return (currentIndex + 1) % allImages.length;
    });
  };

  return (
    <>
      <div className="space-y-12">
        {sections.map((section, index) => (
          <GallerySection
            key={index}
            section={section}
            imageStartIndex={sectionOffsets[index]}
            onImageClick={setActiveIndex}
          />
        ))}
      </div>

      {activeIndex !== null && allImages.length > 0 && (
        <Lightbox
          images={allImages}
          activeIndex={activeIndex}
          onClose={closeLightbox}
          onPrevious={showPreviousImage}
          onNext={showNextImage}
        />
      )}
    </>
  );
}