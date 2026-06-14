import { client } from '@/sanity/lib';
import { servicesQuery, featuredProjectsQuery } from '@/sanity/lib/queries';
import { Service, Project } from '@/types';
import { HeroImageCarousel, HeadlineBlock, ServicesGrid, FeaturedProjects } from '@/components/home';

// Revalidate every 60 seconds for ISR
export const revalidate = 60;

async function getServices(): Promise<Service[]> {
  try {
    return await client.fetch(servicesQuery);
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch(featuredProjectsQuery);
    console.log('Featured projects fetched:', projects?.length || 0);
    return projects || [];
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
}

// Hero carousel images from assets folder
const heroImages = [
  '/assets/hero/hero-1.jpg',
  '/assets/hero/hero-2.jpg',
  '/assets/hero/hero-3.jpg',
];

// Inline images for headline block (3 sets, one for each animated position)
const inlineImageSets = [
  ['/assets/inline/inline-1.png', '/assets/inline/inline-2.png', '/assets/inline/inline-3.png'],
  ['/assets/inline/inline-4.png', '/assets/inline/inline-5.png', '/assets/inline/inline-6.png'],
  ['/assets/inline/inline-7.png', '/assets/inline/inline-8.png', '/assets/inline/inline-9.png'],
];

export default async function HomePage() {
  const [services, featuredProjects] = await Promise.all([
    getServices(),
    getFeaturedProjects(),
  ]);

  return (
    <div>
      {/* Hero Section: Full-width Image Carousel */}
      <HeroImageCarousel images={heroImages} autoPlayInterval={5000} />

      {/* Headline Block with Animated Inline Images */}
      <HeadlineBlock inlineImages={inlineImageSets} swapInterval={5000} />

      {/* Services Section */}
      <div className="container mx-auto px-6">
        <ServicesGrid services={services} />
      </div>

      {/* Featured Projects Section */}
      <div className="container mx-auto px-6">
        <FeaturedProjects projects={featuredProjects} />
      </div>
    </div>
  );
}
