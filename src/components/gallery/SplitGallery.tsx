'use client';

import Image from 'next/image';
import { SanityMedia } from '@/types';
import { urlFor } from '@/sanity/lib';
import { isVideo } from './mediaHelpers';
import { VideoPlayer } from './VideoPlayer';

interface SplitGalleryProps {
  media: SanityMedia[];
  spacing: number;
  imageStartIndex?: number;
  onImageClick?: (globalIndex: number) => void;
}

export function SplitGallery({ media, spacing, imageStartIndex = 0, onImageClick }: SplitGalleryProps) {
  if (!media || media.length === 0) return null;

  // Split media into pairs: first large, rest small
  const chunks: SanityMedia[][] = [];
  for (let i = 0; i < media.length; i += 3) {
    chunks.push(media.slice(i, i + 3));
  }

  return (
    <div className="flex flex-col" style={{ gap: `${spacing}px` }}>
      {chunks.map((chunk, chunkIndex) => {
        const globalStartIndex = imageStartIndex + chunkIndex * 3;

        return (
          <div
            key={chunkIndex}
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ gap: `${spacing}px` }}
          >
            {/* Large media */}
            {chunk[0] && (
              <div className="md:col-span-2 relative aspect-[4/3] overflow-hidden bg-neutral-900">
                {isVideo(chunk[0]) ? (
                  <VideoPlayer
                    video={chunk[0]}
                    onClick={() => onImageClick?.(globalStartIndex)}
                    showPlayIcon={true}
                    className="h-full"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => onImageClick?.(globalStartIndex)}
                    className="relative w-full h-full text-left cursor-zoom-in"
                    aria-label={`Open image`}
                  >
                    <Image
                      src={urlFor(chunk[0].asset).width(1200).height(900).url()}
                      alt={chunk[0].alt || ''}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 66vw"
                    />
                  </button>
                )}
                {chunk[0].caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-sm text-white">{chunk[0].caption}</p>
                  </div>
                )}
              </div>
            )}
            {/* Small media stacked */}
            <div className="flex flex-col" style={{ gap: `${spacing}px` }}>
              {chunk.slice(1).map((item, itemIndex) => {
                const index = itemIndex + 1;
                const globalIndex = globalStartIndex + index;

                return (
                  <div key={item._key || itemIndex} className="relative aspect-[4/3] overflow-hidden bg-neutral-900 flex-1">
                    {isVideo(item) ? (
                      <VideoPlayer
                        video={item}
                        onClick={() => onImageClick?.(globalIndex)}
                        showPlayIcon={true}
                        className="h-full"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => onImageClick?.(globalIndex)}
                        className="relative w-full h-full text-left cursor-zoom-in"
                        aria-label={`Open image`}
                      >
                        <Image
                          src={urlFor(item.asset).width(600).height(450).url()}
                          alt={item.alt || ''}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </button>
                    )}
                    {item.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <p className="text-sm text-white">{item.caption}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
