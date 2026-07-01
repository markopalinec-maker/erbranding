'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Project, categoryLabels } from '@/types';
import { urlFor } from '@/sanity/lib';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug.current}`}
      className="group block relative overflow-hidden rounded-lg aspect-[3/4] bg-neutral-900"
    >
      {project.coverImage?.asset && (
        <Image
          src={urlFor(project.coverImage.asset).width(450).height(600).url()}
          alt={project.coverImage.alt || project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

      {/* Project info */}
      <div className="absolute bottom-0 left-0 right-0 p-6" style={{ fontFamily: 'var(--font-inter-display)' }}>
        <p className="text-neutral-400 text-sm mb-2">
          {project.category ? categoryLabels[project.category] || project.category : 'Design'}
        </p>
        <h3 className="text-white text-xl font-medium group-hover:translate-x-1 transition-transform duration-300">
          {project.title}
        </h3>
      </div>

      {/* Arrow indicator */}
      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </div>
    </Link>
  );
}
