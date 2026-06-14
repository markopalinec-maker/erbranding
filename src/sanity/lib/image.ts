import { createImageUrlBuilder } from '@sanity/image-url';
import { client } from './client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function urlForImage(source: SanityImageSource, width?: number, height?: number) {
  let imageBuilder = builder.image(source).auto('format').fit('max');
  
  if (width) {
    imageBuilder = imageBuilder.width(width);
  }
  if (height) {
    imageBuilder = imageBuilder.height(height);
  }
  
  return imageBuilder.url();
}
