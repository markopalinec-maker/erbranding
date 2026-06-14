'use client';

import { Project } from '@/types';
import { ProjectCard } from './ProjectCard';

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-neutral-500">No projects found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {projects.map((project, index) => (
        <ProjectCard key={project._id} project={project} index={index} />
      ))}
    </div>
  );
}
