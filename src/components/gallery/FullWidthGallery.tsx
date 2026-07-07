'use client';

import Image from 'next/image';
import { SanityMedia } from '@/types';
import { urlFor } from '@/sanity/lib';
import { isVideo } from './mediaHelpers';
import { VideoPlayer } from './VideoPlayer';

interface FullWidthGalleryProps {
  media: SanityMedia[];
  spacing: number;
  imageStartIndex?: number;
  onImageClick?: (globalIndex: number) => void;
}

export function FullWidthGallery({ media, spacing, imageStartIndex = 0, onImageClick }: FullWidthGalleryProps) {
  if (!media || media.length === 0) return null;

  return (
    <div className="flex flex-col" style={{ gap: `${spacing}px` }}>
      {media.map((item, index) => {
        if (isVideo(item)) {
          return (
            <div key={item._key || index} className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-900">
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
            className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-900 text-left cursor-zoom-in"
            onClick={() => onImageClick?.(imageStartIndex + index)}
            aria-label={`Open image ${index + 1}`}
          >
            <Image
              src={urlFor(item.asset).width(1920).height(1080).url()}
              alt={item.alt || ''}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
            />
            {item.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-white">{item.caption}</p>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
