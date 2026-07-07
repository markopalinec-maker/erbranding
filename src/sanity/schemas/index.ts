import { award } from './award';
import { gallerySection } from './gallerySection';
import { page } from './page';
import { project } from './project';
import { service } from './service';
import { siteSettings } from './siteSettings';
import { videoAsset } from './videoAsset';

export const schemaTypes = [
  // Documents
  project,
  page,
  service,
  award,
  siteSettings,
  // Objects
  gallerySection,
  videoAsset,
];
