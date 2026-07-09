import { groq } from 'next-sanity';

// Get all projects
export const projectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    slug,
    category,
    client,
    year,
    description,
    coverImage,
    featured,
    order
  }
`;

// Get featured projects for homepage
export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc) {
    _id,
    title,
    slug,
    category,
    coverImage
  }
`;

// Get single project by slug
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    client,
    year,
    description,
    coverImage,
    sections[] {
      sectionTitle,
      layout,
      spacing,
      maxPerRow,
      "media": (coalesce(media, []) + coalesce(images, []))[] {
        _key,
        _type,
        asset,
        "fileAsset": select(_type == "videoAsset" => asset.asset),
        alt,
        caption,
        hotspot,
        crop,
        "thumbnail": thumbnail { asset, alt }
      }
    }
  }
`;

// Get all pages
export const pagesQuery = groq`
  *[_type == "page"] {
    _id,
    title,
    slug,
    coverImage
  }
`;

// Get single page by slug
export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    coverImage,
    sections[] {
      sectionTitle,
      layout,
      spacing,
      maxPerRow,
      "media": (coalesce(media, []) + coalesce(images, []))[] {
        _key,
        _type,
        asset,
        "fileAsset": select(_type == "videoAsset" => asset.asset),
        alt,
        caption,
        hotspot,
        crop,
        "thumbnail": thumbnail { asset, alt }
      }
    }
  }
`;

// Get all services
export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    description,
    icon,
    order
  }
`;

// Get site settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    studioName,
    tagline,
    heroImages[] {
      _key,
      asset,
      alt,
      projectRef-> {
        title,
        slug
      }
    },
    marqueeText,
    contactEmail,
    phone,
    location,
    socialLinks
  }
`;

// Get all project slugs for static generation
export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`;

// Get all page slugs for static generation
export const pageSlugsQuery = groq`
  *[_type == "page" && defined(slug.current)][].slug.current
`;

// Get all awards
export const awardsQuery = groq`
  *[_type == "award"] | order(order asc) {
    _id,
    title,
    year,
    city,
    placement,
    category,
    person,
    badgeImage,
    order
  }
`;
