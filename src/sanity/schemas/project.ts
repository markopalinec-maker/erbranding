import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Branding & Logo Design', value: 'branding' },
          { title: 'Branding & Social Media', value: 'social-media' },
          { title: 'Branding, Logo Design & Packaging', value: 'packaging' },
          { title: 'Social Media Design', value: 'social-design' },
          { title: 'Web Design', value: 'web-design' },
          { title: 'UI/UX Design', value: 'ui-ux' },
          { title: 'Photography', value: 'photography' },
          { title: 'Visual Identity', value: 'visual-identity' },
        ],
      },
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
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
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Show this project on the homepage carousel',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
    defineField({
      name: 'sections',
      title: 'Gallery Sections',
      type: 'array',
      of: [{ type: 'gallerySection' }],
      description: 'Add multiple gallery sections with different layouts',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'coverImage',
    },
    prepare({ title, category, media }) {
      const categoryNames: Record<string, string> = {
        branding: 'Branding & Logo Design',
        'social-media': 'Branding & Social Media',
        packaging: 'Branding & Packaging',
        'social-design': 'Social Media Design',
        'web-design': 'Web Design',
        'ui-ux': 'UI/UX Design',
        photography: 'Photography',
        'visual-identity': 'Visual Identity',
      };
      return {
        title,
        subtitle: categoryNames[category] || category,
        media,
      };
    },
  },
});
