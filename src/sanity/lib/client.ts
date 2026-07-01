import { createClient } from 'next-sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

const isValidProjectId = projectId && projectId !== 'your_project_id' && projectId !== 'placeholder';

const realClient = createClient({
  projectId: isValidProjectId ? projectId : 'placeholder',
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
});

// Proxy that short-circuits fetch when no valid project ID is set,
// preventing network errors while developing without credentials.
export const client = isValidProjectId
  ? realClient
  : new Proxy(realClient, {
      get(target, prop, _receiver) {
        if (prop === 'fetch') {
          return () => Promise.resolve([]);
        }
        // Always use target as receiver so private class members (e.g. #clientConfig)
        // are accessed on the real SanityClient instance, not the Proxy.
        const value = Reflect.get(target, prop, target);
        if (typeof value === 'function') {
          return (value as (...args: unknown[]) => unknown).bind(target);
        }
        return value;
      },
    });
