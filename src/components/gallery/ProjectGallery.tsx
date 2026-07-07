'use client';

import { useState } from 'react';
import { GallerySection as GallerySectionType, SanityMedia } from '@/types';
import { GallerySection } from './GallerySection';
import { Lightbox } from './Lightbox';
import { getRenderableMedia } from './mediaHelpers';

interface ProjectGalleryProps {
  sections: GallerySectionType[];
}

export function ProjectGallery({ sections }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const allMedia: SanityMedia[] = [];
  const sectionOffsets: number[] = [];

  for (const section of sections) {
    const renderableMedia = getRenderableMedia(section.media);
    sectionOffsets.push(allMedia.length);
    allMedia.push(...renderableMedia);
  }

  const closeLightbox = () => setActiveIndex(null);
  const showPreviousImage = () => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null || allMedia.length === 0) {
        return currentIndex;
      }

      return (currentIndex - 1 + allMedia.length) % allMedia.length;
    });
  };

  const showNextImage = () => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null || allMedia.length === 0) {
        return currentIndex;
      }

      return (currentIndex + 1) % allMedia.length;
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

      {activeIndex !== null && allMedia.length > 0 && (
        <Lightbox
          media={allMedia}
          activeIndex={activeIndex}
          onClose={closeLightbox}
          onPrevious={showPreviousImage}
          onNext={showNextImage}
        />
      )}
    </>
  );
}