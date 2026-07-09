import { SanityImage, SanityMedia, SanityVideo } from '@/types';
import { projectId, dataset } from '@/sanity/lib/client';

export function isVideo(media?: SanityMedia): media is SanityVideo {
  return media?._type === 'videoAsset';
}

export function isImage(media?: SanityMedia): media is SanityImage {
  return media?._type === 'image' || !media?._type;
}

export function getRenderableMedia(media?: SanityMedia[]): SanityMedia[] {
  return (media || []).filter((m): m is SanityMedia => Boolean(m?.asset));
}

/**
 * Constructs the Sanity file CDN URL directly from an asset reference.
 * File asset refs have the form: "file-{hash}-{extension}"
 * CDN URL: https://cdn.sanity.io/files/{projectId}/{dataset}/{hash}.{extension}
 */
export function getVideoFileUrl(asset?: { _ref?: string; url?: string }): string | null {
  // If already resolved (future-proof)
  if (asset?.url) return asset.url;

  const ref = asset?._ref;
  if (!ref || !ref.startsWith('file-')) return null;

  const withoutPrefix = ref.slice(5); // remove 'file-'
  const lastDash = withoutPrefix.lastIndexOf('-');
  if (lastDash === -1) return null;

  const hash = withoutPrefix.slice(0, lastDash);
  const ext = withoutPrefix.slice(lastDash + 1);
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${hash}.${ext}`;
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
