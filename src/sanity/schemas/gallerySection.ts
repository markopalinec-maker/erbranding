import { defineField, defineType } from 'sanity';

export const gallerySection = defineType({
  name: 'gallerySection',
  title: 'Gallery Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      description: 'Optional title for this gallery section',
    }),
    defineField({
      name: 'layout',
      title: 'Layout Type',
      type: 'string',
      options: {
        list: [
          { title: 'Two Columns', value: 'twoCol' },
          { title: 'Three Columns', value: 'threeCol' },
          { title: 'Masonry', value: 'masonry' },
          { title: 'Custom Grid', value: 'grid' },
          { title: 'Full Width', value: 'fullWidth' },
          { title: 'Split (Large + Small)', value: 'split' },
        ],
        layout: 'radio',
      },
      initialValue: 'twoCol',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'spacing',
      title: 'Spacing (px)',
      type: 'number',
      description: 'Gap between images in pixels',
      initialValue: 16,
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'maxPerRow',
      title: 'Max Images Per Row',
      type: 'number',
      description: 'Number of columns (only for Custom Grid layout)',
      initialValue: 4,
      hidden: ({ parent }) => parent?.layout !== 'grid',
      validation: (Rule) => Rule.min(1).max(6),
    }),
    defineField({
      name: 'media',
      title: 'Images & Videos',
      type: 'array',
      description: 'Add images and videos. New content goes here.',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Important for accessibility and SEO',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
        {
          type: 'videoAsset',
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'images',
      title: 'Legacy Images',
      type: 'array',
      description: 'Existing images from before the video update. Move these to "Images & Videos" above to manage them together.',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
  ],
  preview: {
    select: {
      layout: 'layout',
      media: 'media',
    },
    prepare({ layout, media }) {
      const layoutNames: Record<string, string> = {
        twoCol: 'Two Columns',
        threeCol: 'Three Columns',
        masonry: 'Masonry',
        grid: 'Custom Grid',
        fullWidth: 'Full Width',
        split: 'Split Layout',
      };
      return {
        title: layoutNames[layout] || 'Gallery Section',
        subtitle: `${media?.length || 0} items`,
      };
    },
  },
});
