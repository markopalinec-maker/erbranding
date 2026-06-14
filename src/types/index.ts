// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageAsset = any;

export interface SanityImage {
  _key?: string;
  asset: SanityImageAsset;
  alt?: string;
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export type GalleryLayout = 'twoCol' | 'threeCol' | 'masonry' | 'grid' | 'fullWidth' | 'split';

export interface GallerySection {
  sectionTitle?: string;
  layout: GalleryLayout;
  spacing: number;
  maxPerRow?: number;
  images: SanityImage[];
}

export interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  category?: string;
  client?: string;
  year?: string;
  description?: string;
  coverImage: SanityImage;
  featured?: boolean;
  order?: number;
  sections?: GallerySection[];
}

export interface Page {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  coverImage?: SanityImage;
  sections?: GallerySection[];
}

export interface Service {
  _id: string;
  title: string;
  description?: string;
  icon?: SanityImage;
  order?: number;
}

export interface Award {
  _id: string;
  title: string;
  year: string;
  city: string;
  placement: string;
  category: string;
  person: string;
  badgeImage: SanityImage;
  order?: number;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface HeroImage extends SanityImage {
  projectRef?: {
    title: string;
    slug: {
      current: string;
    };
  };
}

export interface SiteSettings {
  studioName: string;
  tagline: string;
  heroImages?: HeroImage[];
  marqueeText?: string;
  contactEmail?: string;
  phone?: string;
  location?: string;
  socialLinks?: SocialLink[];
}

export const categoryLabels: Record<string, string> = {
  branding: 'Branding & Logo Design',
  'social-media': 'Branding & Social Media',
  packaging: 'Branding, Logo Design & Packaging',
  'social-design': 'Social Media Design',
  'web-design': 'Web Design',
  'ui-ux': 'UI/UX Design',
  photography: 'Photography and Videography',
  'visual-identity': 'Visual Identity',
};
