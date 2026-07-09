'use client';

import { SanityVideo } from '@/types';

interface VideoPlayerProps {
  video: SanityVideo;
  onClick?: () => void;
  showPlayIcon?: boolean;
  className?: string;
}

export function VideoPlayer({ video, onClick, showPlayIcon = true, className = '' }: VideoPlayerProps) {
  const videoUrl = video.videoUrl || video.asset?.url;

  if (!videoUrl) {
    return null;
  }

  const thumbnailUrl = video.thumbnailUrl || video.thumbnail?.asset?.url;

  // Thumbnail preview mode (usually in gallery grid)
  if (showPlayIcon) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`relative w-full h-full cursor-zoom-in overflow-hidden bg-neutral-900 ${className}`}
        aria-label={`Play video: ${video.alt || 'video'}`}
      >
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={video.alt || ''}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-neutral-800" />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:bg-black/50">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 transition hover:bg-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="ml-1 text-black">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>
        {video.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="text-sm text-white">{video.caption}</p>
          </div>
        )}
      </button>
    );
  }

  // Full video player mode (lightbox)
  return (
    <video
      src={videoUrl}
      poster={thumbnailUrl}
      controls
      className={`w-full h-full object-contain ${className}`}
      aria-label={video.alt || 'video'}
    >
      Your browser does not support the video tag.
    </video>
  );
}
