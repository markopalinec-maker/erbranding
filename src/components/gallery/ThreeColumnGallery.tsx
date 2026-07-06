'use client';

import Image from 'next/image';
import { SanityImage } from '@/types';
import { urlFor } from '@/sanity/lib';

interface ThreeColumnGalleryProps {
  images: SanityImage[];
  spacing: number;
  imageStartIndex?: number;
  onImageClick?: (globalIndex: number) => void;
}

export function ThreeColumnGallery({ images, spacing, imageStartIndex = 0, onImageClick }: ThreeColumnGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      style={{ gap: `${spacing}px` }}
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
            src={urlFor(image.asset).width(600).height(600).url()}
            alt={image.alt || ''}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
