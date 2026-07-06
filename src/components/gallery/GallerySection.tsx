'use client';

import { GallerySection as GallerySectionType, GalleryLayout } from '@/types';
import { TwoColumnGallery } from './TwoColumnGallery';
import { ThreeColumnGallery } from './ThreeColumnGallery';
import { MasonryGallery } from './MasonryGallery';
import { CustomGridGallery } from './CustomGridGallery';
import { FullWidthGallery } from './FullWidthGallery';
import { SplitGallery } from './SplitGallery';

interface GallerySectionProps {
  section: GallerySectionType;
  imageStartIndex?: number;
  onImageClick?: (globalIndex: number) => void;
}

export function GallerySection({ section, imageStartIndex = 0, onImageClick }: GallerySectionProps) {
  const { layout, spacing = 16, maxPerRow = 4, images, sectionTitle } = section;

  if (!images || images.length === 0) {
    return null;
  }

  const renderGallery = () => {
    switch (layout as GalleryLayout) {
      case 'twoCol':
        return <TwoColumnGallery images={images} spacing={spacing} imageStartIndex={imageStartIndex} onImageClick={onImageClick} />;
      case 'threeCol':
        return <ThreeColumnGallery images={images} spacing={spacing} imageStartIndex={imageStartIndex} onImageClick={onImageClick} />;
      case 'masonry':
        return <MasonryGallery images={images} spacing={spacing} imageStartIndex={imageStartIndex} onImageClick={onImageClick} />;
      case 'grid':
        return <CustomGridGallery images={images} spacing={spacing} maxPerRow={maxPerRow} imageStartIndex={imageStartIndex} onImageClick={onImageClick} />;
      case 'fullWidth':
        return <FullWidthGallery images={images} spacing={spacing} imageStartIndex={imageStartIndex} onImageClick={onImageClick} />;
      case 'split':
        return <SplitGallery images={images} spacing={spacing} imageStartIndex={imageStartIndex} onImageClick={onImageClick} />;
      default:
        // Fallback to two column if layout is unknown
        return <TwoColumnGallery images={images} spacing={spacing} imageStartIndex={imageStartIndex} onImageClick={onImageClick} />;
    }
  };

  return (
    <section className="mb-8">
      {sectionTitle && (
        <h2 className="text-xl font-medium text-white mb-6">{sectionTitle}</h2>
      )}
      {renderGallery()}
    </section>
  );
}
