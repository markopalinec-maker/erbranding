'use client';

import Image from 'next/image';
import { SanityImage } from '@/types';
import { urlFor } from '@/sanity/lib';

interface FullWidthGalleryProps {
  images: SanityImage[];
  spacing: number;
  imageStartIndex?: number;
  onImageClick?: (globalIndex: number) => void;
}

export function FullWidthGallery({ images, spacing, imageStartIndex = 0, onImageClick }: FullWidthGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col" style={{ gap: `${spacing}px` }}>
      {images.map((image, index) => (
        <button
          type="button"
          key={image._key || index}
          className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-900 text-left cursor-zoom-in"
          onClick={() => onImageClick?.(imageStartIndex + index)}
          aria-label={`Open image ${index + 1}`}
        >
          <Image
            src={urlFor(image.asset).width(1920).height(1080).url()}
            alt={image.alt || ''}
            fill
            className="object-cover"
            sizes="100vw"
            priority={index === 0}
          />
          {image.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-white">{image.caption}</p>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
