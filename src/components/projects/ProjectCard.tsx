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
      className="group block"
    >
      <article className="bg-neutral-900 border border-neutral-800 rounded overflow-hidden hover:border-neutral-700 transition-colors">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <span className="w-4 h-0.5 bg-neutral-500" />
              <span className="w-4 h-0.5 bg-neutral-500" />
              <span className="w-4 h-0.5 bg-neutral-500" />
            </div>
            <span className="text-neutral-500 text-xs tracking-wider">ERBRANDING.STUDIO</span>
            <div className="flex gap-1">
              <span className="w-4 h-0.5 bg-neutral-500" />
              <span className="w-4 h-0.5 bg-neutral-500" />
              <span className="w-4 h-0.5 bg-neutral-500" />
            </div>
          </div>
          <div className="flex gap-2">
            <span className="w-2 h-2 rounded-full bg-neutral-600" />
            <span className="w-2 h-2 rounded-full bg-neutral-600" />
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={urlFor(project.coverImage.asset).width(600).height(450).url()}
            alt={project.coverImage.alt || project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-yellow-400 text-xs mb-1">
            {project.category ? categoryLabels[project.category] || project.category : 'Design'}
          </p>
          <h3 className="text-white font-medium mb-2">{project.title}</h3>
          <div className="text-neutral-500 text-xs space-y-1">
            {project.client && (
              <p>
                <span className="text-neutral-400">Client:</span> {project.client}
              </p>
            )}
            {project.year && (
              <p>
                <span className="text-neutral-400">Year:</span> {project.year}
              </p>
            )}
          </div>
          {project.description && (
            <p className="text-neutral-400 text-xs mt-3 line-clamp-3">
              {project.description}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
