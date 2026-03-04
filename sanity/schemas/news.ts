import { defineType, defineField } from 'sanity';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';

export default defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'news', newItemPosition: 'before' }),
    defineField({
      name: 'title',
      title: 'News Title',
      validation: (Rule) => Rule.required(),
      type: 'object',
      fields: [
        {
          title: 'English', 
          name: 'en',
          type: 'string', 
        },
        {
          title: 'Romanian', 
          name: 'ro',
          type: 'string',
        }
      ]
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title.en'
      }
    }),
    defineField({
      name: 'content',
      title: 'Content',
      validation: (Rule) => Rule.required(),
      type: 'object',
      description: 'Full article. Cards show the first ~220 characters; "Read more" links to the full page.',
      fields: [
        {
          title: 'English',
          name: 'en',
          type: 'array',
          of: [{ type: 'block' }],
        },
        {
          title: 'Romanian',
          name: 'ro',
          type: 'array',
          of: [{ type: 'block' }],
        },
      ],
    }),
    defineField({
      name: "imagedata",
      title: "Image Data",
      validation: (Rule) => Rule.required(),
      type: 'object', 
      fields: [
        {
          name: 'image',
          title: 'Image',
          type: 'object',
          fields: [
            {
              title: 'English',
              name: 'en',
              type: 'image',
            },
            {
              title: 'Romanian',
              name: 'ro',
              type: 'image',
            }
          ]
        },
        {
          name: "alt",
          title: "Alternative text",
          type: 'object', 
          fields: [
            {
              title: 'English',
              name: 'en',
              type: 'string'
            },
            {
              title: 'Romanian',
              name: 'ro',
              type: 'string'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'archived',
      title: 'Move to archive (Past events page)',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) => Rule.required(),
      description: 'When on, this post is removed from the main News feed and appears only on the Past events page.',
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      archived: 'archived',
    },
    prepare({ title, archived }) {
      return {
        title: title ?? 'Untitled',
        subtitle: archived ? 'Archived' : 'Active',
      };
    },
  },
});
