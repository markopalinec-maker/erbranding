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
}

export function GallerySection({ section }: GallerySectionProps) {
  const { layout, spacing = 16, maxPerRow = 4, images, sectionTitle } = section;

  if (!images || images.length === 0) {
    return null;
  }

  const renderGallery = () => {
    switch (layout as GalleryLayout) {
      case 'twoCol':
        return <TwoColumnGallery images={images} spacing={spacing} />;
      case 'threeCol':
        return <ThreeColumnGallery images={images} spacing={spacing} />;
      case 'masonry':
        return <MasonryGallery images={images} spacing={spacing} />;
      case 'grid':
        return <CustomGridGallery images={images} spacing={spacing} maxPerRow={maxPerRow} />;
      case 'fullWidth':
        return <FullWidthGallery images={images} spacing={spacing} />;
      case 'split':
        return <SplitGallery images={images} spacing={spacing} />;
      default:
        // Fallback to two column if layout is unknown
        return <TwoColumnGallery images={images} spacing={spacing} />;
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
