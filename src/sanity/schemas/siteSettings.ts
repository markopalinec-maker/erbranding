import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'studioName',
      title: 'Studio Name',
      type: 'string',
      initialValue: 'ERBRANDING.STUDIO',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 3,
      initialValue: '+A✨FULL SERVICE DESIGN🎨STUDIO——SPECIALIZED IN CRAFTING 🍀VISUAL IDENTITES+',
    }),
    defineField({
      name: 'heroImages',
      title: 'Hero Carousel Images',
      type: 'array',
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
              name: 'projectRef',
              title: 'Link to Project',
              type: 'reference',
              to: [{ type: 'project' }],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'marqueeText',
      title: 'Marquee Text',
      type: 'string',
      initialValue: 'ERBRANDING.STUDIO',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'erol.condrak@gmail.com',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      initialValue: '+385 91 234 5678',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Zagreb, Croatia',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});
