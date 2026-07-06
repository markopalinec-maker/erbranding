'use client';

import Image from 'next/image';
import { SanityImage } from '@/types';
import { urlFor } from '@/sanity/lib';

interface SplitGalleryProps {
  images: SanityImage[];
  spacing: number;
  imageStartIndex?: number;
  onImageClick?: (globalIndex: number) => void;
}

export function SplitGallery({ images, spacing, imageStartIndex = 0, onImageClick }: SplitGalleryProps) {
  if (!images || images.length === 0) return null;

  // Split images into pairs: first large, rest small
  const chunks: SanityImage[][] = [];
  for (let i = 0; i < images.length; i += 3) {
    chunks.push(images.slice(i, i + 3));
  }

  return (
    <div className="flex flex-col" style={{ gap: `${spacing}px` }}>
      {chunks.map((chunk, chunkIndex) => (
        <div
          key={chunkIndex}
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: `${spacing}px` }}
        >
          {/* Large image */}
          {chunk[0] && (
            <button
              type="button"
              className="md:col-span-2 relative aspect-[4/3] overflow-hidden bg-neutral-900 text-left cursor-zoom-in"
              onClick={() => onImageClick?.(imageStartIndex + chunkIndex * 3)}
              aria-label={`Open image ${chunkIndex * 3 + 1}`}
            >
              <Image
                src={urlFor(chunk[0].asset).width(1200).height(900).url()}
                alt={chunk[0].alt || ''}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              {chunk[0].caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-sm text-white">{chunk[0].caption}</p>
                </div>
              )}
            </button>
          )}
          {/* Small images stacked */}
          <div className="flex flex-col" style={{ gap: `${spacing}px` }}>
            {chunk.slice(1).map((image, index) => (
              <button
                type="button"
                key={image._key || index}
                className="relative aspect-[4/3] overflow-hidden bg-neutral-900 flex-1 text-left cursor-zoom-in"
                onClick={() => onImageClick?.(imageStartIndex + chunkIndex * 3 + index + 1)}
                aria-label={`Open image ${chunkIndex * 3 + index + 2}`}
              >
                <Image
                  src={urlFor(image.asset).width(600).height(450).url()}
                  alt={image.alt || ''}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-sm text-white">{image.caption}</p>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
