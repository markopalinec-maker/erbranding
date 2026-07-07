import { SanityImage, SanityMedia, SanityVideo } from '@/types';

export function isVideo(media?: SanityMedia): media is SanityVideo {
  return media?._type === 'videoAsset';
}

export function isImage(media?: SanityMedia): media is SanityImage {
  return media?._type === 'image' || !media?._type;
}

export function getRenderableMedia(media?: SanityMedia[]): SanityMedia[] {
  return (media || []).filter((m): m is SanityMedia => {
    if (isVideo(m)) {
      return Boolean(m?.asset);
    }
    return Boolean(m?.asset);
  });
}

export function getMediaUrl(media: SanityMedia): string | null {
  if (isImage(media)) {
    return media?.asset?.url || null;
  }
  if (isVideo(media)) {
    return media?.asset?.url || null;
  }
  return null;
}

export function getMediaThumbnail(media: SanityMedia): SanityImage | null {
  if (isVideo(media)) {
    return media?.thumbnail || null;
  }
  if (isImage(media)) {
    return media;
  }
  return null;
}
