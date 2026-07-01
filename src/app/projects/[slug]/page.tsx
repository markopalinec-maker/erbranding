import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib';
import { projectBySlugQuery, projectSlugsQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib';
import { Project, categoryLabels } from '@/types';
import { GallerySection } from '@/components/gallery';

// Revalidate every 60 seconds for ISR
export const revalidate = 60;

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getProject(slug: string): Promise<Project | null> {
  try {
    return await client.fetch(projectBySlugQuery, { slug });
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

// Generate static paths for all projects
export async function generateStaticParams() {
  try {
    const slugs: string[] = await client.fetch(projectSlugsQuery);
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);
  
  if (!project) {
    return {
      title: 'Project Not Found | ERBRANDING.STUDIO',
    };
  }

  return {
    title: `${project.title} | ERBRANDING.STUDIO`,
    description: project.description || `View ${project.title} project details`,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Back Link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to Projects
      </Link>

      {/* Project Header */}
      <header className="mb-12">
        {/* Cover Image */}
        <div className="relative aspect-[21/9] overflow-hidden rounded-lg bg-neutral-900 mb-8">
          <Image
            src={urlFor(project.coverImage.asset).width(1920).height(820).url()}
            alt={project.coverImage.alt || project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <p className="text-neutral-400 text-sm mb-2">
              {project.category ? categoryLabels[project.category] || project.category : 'Design'}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white">{project.title}</h1>
          </div>
        </div>

        {/* Project Meta */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-neutral-800 pb-8">
          <div>
            <h3 className="text-neutral-400 text-sm mb-1">Client</h3>
            <p className="text-white">{project.client || '—'}</p>
          </div>
          <div>
            <h3 className="text-neutral-400 text-sm mb-1">Year</h3>
            <p className="text-white">{project.year || '—'}</p>
          </div>
          <div>
            <h3 className="text-neutral-400 text-sm mb-1">Category</h3>
            <p className="text-white">
              {project.category ? categoryLabels[project.category] || project.category : '—'}
            </p>
          </div>
        </div>

        {/* Description */}
        {project.description && (
          <div className="mt-8 max-w-3xl">
            <p className="text-neutral-300 leading-relaxed">{project.description}</p>
          </div>
        )}
      </header>

      {/* Gallery Sections */}
      {project.sections && project.sections.length > 0 && (
        <div className="space-y-12">
          {project.sections.map((section, index) => (
            <GallerySection key={index} section={section} />
          ))}
        </div>
      )}

      {/* No Gallery Message */}
      {(!project.sections || project.sections.length === 0) && (
        <div className="py-20 text-center border border-neutral-800 rounded-lg">
          <p className="text-neutral-500">No gallery sections added yet.</p>
          <p className="text-neutral-600 text-sm mt-2">
            Add gallery sections in Sanity Studio to showcase this project.
          </p>
        </div>
      )}
    </div>
  );
}
