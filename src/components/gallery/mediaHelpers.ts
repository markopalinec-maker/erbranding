import { SanityImage, SanityMedia, SanityVideo } from '@/types';
import { projectId, dataset } from '@/sanity/lib/client';

export function isVideo(media?: SanityMedia): media is SanityVideo {
  return media?._type === 'videoAsset';
}

export function isImage(media?: SanityMedia): media is SanityImage {
  return media?._type === 'image' || !media?._type;
}

export function getRenderableMedia(media?: SanityMedia[]): SanityMedia[] {
  return (media || []).filter((m): m is SanityMedia => {
    if (isVideo(m)) {
      return Boolean(m?.fileAsset || m?.asset?.asset || m?.asset?._ref || m?.asset?.url);
    }
    return Boolean(m?.asset);
  });
}

/**
 * Constructs the Sanity file CDN URL directly from an asset reference.
 * File asset refs have the form: "file-{hash}-{extension}"
 * CDN URL: https://cdn.sanity.io/files/{projectId}/{dataset}/{hash}.{extension}
 */
export function getVideoFileUrl(video?: SanityVideo): string | null {
  const candidates = [video?.fileAsset, video?.asset?.asset, video?.asset] as Array<
    { _ref?: string; url?: string } | undefined
  >;

  for (const candidate of candidates) {
    if (!candidate) continue;
    if (candidate.url) return candidate.url;

    const ref = candidate._ref;
    if (!ref || !ref.startsWith('file-')) continue;

    const withoutPrefix = ref.slice(5);
    const lastDash = withoutPrefix.lastIndexOf('-');
    if (lastDash === -1) continue;

    const hash = withoutPrefix.slice(0, lastDash);
    const ext = withoutPrefix.slice(lastDash + 1);
    return `https://cdn.sanity.io/files/${projectId}/${dataset}/${hash}.${ext}`;
  }

  return null;
}

export function getMediaUrl(media: SanityMedia): string | null {
  if (isImage(media)) {
    return media?.asset?.url || null;
  }
  if (isVideo(media)) {
    return getVideoFileUrl(media);
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
