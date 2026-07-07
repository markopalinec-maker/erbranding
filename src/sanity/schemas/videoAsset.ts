import { defineField, defineType } from 'sanity';

export const videoAsset = defineType({
  name: 'videoAsset',
  title: 'Video Asset',
  type: 'object',
  fields: [
    defineField({
      name: 'asset',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/mp4, video/webm, video/*',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Important for accessibility and SEO',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption displayed below video',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      description: 'Poster image shown before video plays',
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
    }),
  ],
  preview: {
    select: {
      filename: 'asset.originalFilename',
      alt: 'alt',
      thumbnail: 'thumbnail',
    },
    prepare({ filename, alt, thumbnail }) {
      return {
        title: alt || filename || 'Video',
        subtitle: 'Video Asset',
        media: thumbnail,
      };
    },
  },
});
