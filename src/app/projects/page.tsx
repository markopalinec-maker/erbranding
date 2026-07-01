import { client } from '@/sanity/lib';
import { projectsQuery } from '@/sanity/lib/queries';
import { Project } from '@/types';
import { ProjectsGrid } from '@/components/projects';

// Revalidate every 60 seconds for ISR
export const revalidate = 60;

async function getProjects(): Promise<Project[]> {
  try {
    return await client.fetch(projectsQuery);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export const metadata = {
  title: 'Projects | ERBRANDING.STUDIO',
  description: 'Explore our portfolio of branding, design, and creative projects.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Page Header */}
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
          <span className="text-white">+</span> PROJECTS
        </h1>
        <p className="text-neutral-400">
          A collection of our work across branding, design, and digital experiences.
        </p>
      </header>

      {/* Projects Grid */}
      <ProjectsGrid projects={projects} />
    </div>
  );
}
