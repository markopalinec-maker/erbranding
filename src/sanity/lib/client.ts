import { createClient } from 'next-sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

// Create client only if we have a valid project ID
const isValidProjectId = projectId && projectId !== 'your_project_id' && projectId !== 'placeholder';

export const client = createClient({
  projectId: isValidProjectId ? projectId : 'placeholder',
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  // Return empty results if project ID is not configured
  perspective: 'published',
});
