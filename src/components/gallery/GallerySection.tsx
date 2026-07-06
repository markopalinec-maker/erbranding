'use client';

import { GallerySection as GallerySectionType, GalleryLayout } from '@/types';
import { TwoColumnGallery } from './TwoColumnGallery';
import { ThreeColumnGallery } from './ThreeColumnGallery';
import { MasonryGallery } from './MasonryGallery';
import { CustomGridGallery } from './CustomGridGallery';
import { FullWidthGallery } from './FullWidthGallery';
import { SplitGallery } from './SplitGallery';
import { getRenderableImages } from './imageHelpers';

interface GallerySectionProps {
  section: GallerySectionType;
  imageStartIndex?: number;
  onImageClick?: (globalIndex: number) => void;
}

export function GallerySection({ section, imageStartIndex = 0, onImageClick }: GallerySectionProps) {
  const { layout, spacing = 16, maxPerRow = 4, images, sectionTitle } = section;
  const renderableImages = getRenderableImages(images);

  if (renderableImages.length === 0) {
    return null;
  }

  const renderGallery = () => {
    switch (layout as GalleryLayout) {
      case 'twoCol':
        return <TwoColumnGallery images={renderableImages} spacing={spacing} imageStartIndex={imageStartIndex} onImageClick={onImageClick} />;
      case 'threeCol':
        return <ThreeColumnGallery images={renderableImages} spacing={spacing} imageStartIndex={imageStartIndex} onImageClick={onImageClick} />;
      case 'masonry':
        return <MasonryGallery images={renderableImages} spacing={spacing} imageStartIndex={imageStartIndex} onImageClick={onImageClick} />;
      case 'grid':
        return <CustomGridGallery images={renderableImages} spacing={spacing} maxPerRow={maxPerRow} imageStartIndex={imageStartIndex} onImageClick={onImageClick} />;
      case 'fullWidth':
        return <FullWidthGallery images={renderableImages} spacing={spacing} imageStartIndex={imageStartIndex} onImageClick={onImageClick} />;
      case 'split':
        return <SplitGallery images={renderableImages} spacing={spacing} imageStartIndex={imageStartIndex} onImageClick={onImageClick} />;
      default:
        // Fallback to two column if layout is unknown
        return <TwoColumnGallery images={renderableImages} spacing={spacing} imageStartIndex={imageStartIndex} onImageClick={onImageClick} />;
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
