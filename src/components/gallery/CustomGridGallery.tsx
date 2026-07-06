'use client';

import Image from 'next/image';
import { SanityImage } from '@/types';
import { urlFor } from '@/sanity/lib';

interface CustomGridGalleryProps {
  images: SanityImage[];
  spacing: number;
  maxPerRow: number;
  imageStartIndex?: number;
  onImageClick?: (globalIndex: number) => void;
}

export function CustomGridGallery({ images, spacing, maxPerRow, imageStartIndex = 0, onImageClick }: CustomGridGalleryProps) {
  if (!images || images.length === 0) return null;

  const columns = Math.min(Math.max(maxPerRow || 4, 1), 6);

  return (
    <div
      className="grid"
      style={{
        gap: `${spacing}px`,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {images.map((image, index) => (
        <button
          type="button"
          key={image._key || index}
          className="relative aspect-square overflow-hidden bg-neutral-900 text-left cursor-zoom-in"
          onClick={() => onImageClick?.(imageStartIndex + index)}
          aria-label={`Open image ${index + 1}`}
        >
          <Image
            src={urlFor(image.asset).width(500).height(500).url()}
            alt={image.alt || ''}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes={`(max-width: 768px) 50vw, ${Math.round(100 / columns)}vw`}
          />
          {image.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-sm text-white">{image.caption}</p>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
