import { defineField, defineType } from 'sanity';

export const award = defineType({
  name: 'award',
  title: 'Award',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Award Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'placement',
      title: 'Placement',
      type: 'string',
      placeholder: 'e.g., 1st place, 2nd place, 3rd place',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      placeholder: 'e.g., DESIGN CATEGORY',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'person',
      title: 'Person/Team Name',
      type: 'string',
      placeholder: 'e.g., EROL ČINDRAK',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'badgeImage',
      title: 'Badge Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'badgeImage',
      year: 'year',
      city: 'city',
    },
    prepare({ title, media, year, city }) {
      return {
        title: `${title}`,
        subtitle: `${year} - ${city}`,
        media,
      };
    },
  },
});
