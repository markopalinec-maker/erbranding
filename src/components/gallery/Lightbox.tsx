'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { SanityMedia } from '@/types';
import { urlFor } from '@/sanity/lib';
import { isVideo } from './mediaHelpers';
import { VideoPlayer } from './VideoPlayer';

interface LightboxProps {
  media: SanityMedia[];
  activeIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export function Lightbox({ media, activeIndex, onClose, onPrevious, onNext }: LightboxProps) {
  const activeMedia = media[activeIndex];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'ArrowLeft') {
        onPrevious();
      }

      if (event.key === 'ArrowRight') {
        onNext();
      }
    };

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNext, onPrevious]);

  if (!activeMedia?.asset) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Project media viewer"
    >
      <button
        type="button"
        className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        aria-label="Close media viewer"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18" />
          <path d="M6 6l12 12" />
        </svg>
      </button>

      <button
        type="button"
        className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
        onClick={(event) => {
          event.stopPropagation();
          onPrevious();
        }}
        aria-label="Show previous media"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        type="button"
        className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
        aria-label="Show next media"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div
        className="relative flex h-full w-full max-w-7xl flex-col items-center justify-center gap-4"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative h-full max-h-[80vh] w-full">
          {isVideo(activeMedia) ? (
            <VideoPlayer
              video={activeMedia}
              showPlayIcon={false}
              className="h-full w-full"
            />
          ) : (
            <Image
              src={urlFor(activeMedia.asset).width(2400).url()}
              alt={activeMedia.alt || ''}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          )}
        </div>

        <div className="flex max-w-3xl flex-col items-center gap-2 text-center text-white">
          <p className="text-sm text-neutral-300">
            {activeIndex + 1} / {media.length}
          </p>
          {activeMedia.caption && <p className="text-sm md:text-base">{activeMedia.caption}</p>}
        </div>
      </div>
    </div>
  );
}