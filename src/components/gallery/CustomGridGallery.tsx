'use client';

import Image from 'next/image';
import { SanityMedia } from '@/types';
import { urlFor } from '@/sanity/lib';
import { isVideo } from './mediaHelpers';
import { VideoPlayer } from './VideoPlayer';

interface CustomGridGalleryProps {
  media: SanityMedia[];
  spacing: number;
  maxPerRow: number;
  imageStartIndex?: number;
  onImageClick?: (globalIndex: number) => void;
}

export function CustomGridGallery({ media, spacing, maxPerRow, imageStartIndex = 0, onImageClick }: CustomGridGalleryProps) {
  if (!media || media.length === 0) return null;

  const columns = Math.min(Math.max(maxPerRow || 4, 1), 6);

  return (
    <div
      className="grid"
      style={{
        gap: `${spacing}px`,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {media.map((item, index) => {
        if (isVideo(item)) {
          return (
            <div key={item._key || index} className="relative aspect-square overflow-hidden bg-neutral-900">
              <VideoPlayer
                video={item}
                onClick={() => onImageClick?.(imageStartIndex + index)}
                showPlayIcon={true}
                className="h-full"
              />
            </div>
          );
        }

        return (
          <button
            type="button"
            key={item._key || index}
            className="relative aspect-square overflow-hidden bg-neutral-900 text-left cursor-zoom-in"
            onClick={() => onImageClick?.(imageStartIndex + index)}
            aria-label={`Open image ${index + 1}`}
          >
            <Image
              src={urlFor(item.asset).width(500).height(500).url()}
              alt={item.alt || ''}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes={`(max-width: 768px) 50vw, ${Math.round(100 / columns)}vw`}
            />
            {item.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-sm text-white">{item.caption}</p>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
