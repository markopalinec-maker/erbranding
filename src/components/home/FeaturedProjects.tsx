'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project, categoryLabels } from '@/types';
import { urlFor } from '@/sanity/lib';

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <h2 className="text-xl font-medium text-white mb-10 flex items-center gap-2">
        <span className="text-white">+</span> Featured Work
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link 
              href={`/projects/${project.slug.current}`}
              className="group block relative overflow-hidden rounded-lg aspect-[3/4] bg-neutral-900"
            >
              {project.coverImage?.asset && (
                <Image
                  src={urlFor(project.coverImage).width(600).height(800).url()}
                  alt={project.coverImage.alt || project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              
              {/* Project info */}
              <div className="absolute bottom-0 left-0 right-0 p-6" style={{ fontFamily: 'var(--font-inter-display)' }}>
                <p className="text-neutral-400 text-sm mb-2">
                  {project.category ? categoryLabels[project.category] || project.category : 'Project'}
                </p>
                <h3 className="text-white text-xl font-medium group-hover:translate-x-1 transition-transform duration-300">
                  {project.title}
                </h3>
              </div>
              
              {/* Arrow indicator */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="2"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      {/* View all projects link */}
      <div className="mt-10 text-center">
        <Link 
          href="/projects"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-300"
        >
          View All Projects
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
