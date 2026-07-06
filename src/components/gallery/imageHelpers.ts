import { SanityImage } from '@/types';

export function getRenderableImages(images?: SanityImage[]) {
  return (images || []).filter((image): image is SanityImage => Boolean(image?.asset));
}