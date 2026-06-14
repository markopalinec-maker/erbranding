// Configuration file for hero and inline images
// Edit this file to change images without modifying component code

export const heroImages = [
  '/assets/hero/hero-1.jpg',
  '/assets/hero/hero-2.jpg',
  '/assets/hero/hero-3.jpg',
];

// Each array represents a set of images that will cycle at one position in the headline
export const inlineImageSets = [
  // Position 1: After "+A"
  [
    '/assets/inline/inline-1.jpg',
    '/assets/inline/inline-2.jpg',
    '/assets/inline/inline-3.jpg',
  ],
  // Position 2: After "DESIGN"
  [
    '/assets/inline/inline-4.jpg',
    '/assets/inline/inline-5.jpg',
    '/assets/inline/inline-6.jpg',
  ],
  // Position 3: After "CRAFTING"
  [
    '/assets/inline/inline-7.jpg',
    '/assets/inline/inline-8.jpg',
    '/assets/inline/inline-9.jpg',
  ],
];

// Timing configuration (in milliseconds)
export const heroAutoPlayInterval = 5000;
export const inlineSwapInterval = 5000;
