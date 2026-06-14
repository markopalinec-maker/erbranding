import { notFound } from 'next/navigation';
import Image from 'next/image';
import { client } from '@/sanity/lib';
import { pageBySlugQuery, pageSlugsQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib';
import { Page } from '@/types';
import { GallerySection } from '@/components/gallery';

// Revalidate every 60 seconds for ISR
export const revalidate = 60;

interface DynamicPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getPage(slug: string): Promise<Page | null> {
  try {
    return await client.fetch(pageBySlugQuery, { slug });
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

// Generate static paths for all pages
export async function generateStaticParams() {
  try {
    const slugs: string[] = await client.fetch(pageSlugsQuery);
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: DynamicPageProps) {
  const { slug } = await params;
  const page = await getPage(slug);
  
  if (!page) {
    return {
      title: 'Page Not Found | ERBRANDING.STUDIO',
    };
  }

  return {
    title: `${page.title} | ERBRANDING.STUDIO`,
  };
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Page Header */}
      <header className="mb-12">
        {page.coverImage && (
          <div className="relative aspect-[21/9] overflow-hidden rounded-lg bg-neutral-900 mb-8">
            <Image
              src={urlFor(page.coverImage.asset).width(1920).height(820).url()}
              alt={page.coverImage.alt || page.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white">{page.title}</h1>
            </div>
          </div>
        )}

        {!page.coverImage && (
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">{page.title}</h1>
        )}
      </header>

      {/* Gallery Sections */}
      {page.sections && page.sections.length > 0 && (
        <div className="space-y-12">
          {page.sections.map((section, index) => (
            <GallerySection key={index} section={section} />
          ))}
        </div>
      )}

      {/* No Content Message */}
      {(!page.sections || page.sections.length === 0) && (
        <div className="py-20 text-center border border-neutral-800 rounded-lg">
          <p className="text-neutral-500">No content added yet.</p>
          <p className="text-neutral-600 text-sm mt-2">
            Add gallery sections in Sanity Studio to add content to this page.
          </p>
        </div>
      )}
    </div>
  );
}
