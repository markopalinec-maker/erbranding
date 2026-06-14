'use client';

import Image from 'next/image';
import Masonry from 'react-masonry-css';
import { SanityImage } from '@/types';
import { urlFor } from '@/sanity/lib';

interface MasonryGalleryProps {
  images: SanityImage[];
  spacing: number;
}

export function MasonryGallery({ images, spacing }: MasonryGalleryProps) {
  if (!images || images.length === 0) return null;

  const breakpointColumns = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="masonry-grid"
      columnClassName="masonry-grid-column"
      style={{ marginLeft: `-${spacing}px` }}
    >
      {images.map((image, index) => (
        <div
          key={image._key || index}
          className="relative overflow-hidden bg-neutral-900"
          style={{ marginBottom: `${spacing}px`, marginLeft: `${spacing}px` }}
        >
          <Image
            src={urlFor(image.asset).width(600).url()}
            alt={image.alt || ''}
            width={600}
            height={800}
            className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 500px) 100vw, (max-width: 700px) 50vw, 33vw"
          />
          {image.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-sm text-white">{image.caption}</p>
            </div>
          )}
        </div>
      ))}
    </Masonry>
  );
}
