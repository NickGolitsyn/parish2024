import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pastevents',
  title: 'Past events',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'slideshow',
      title: 'Slideshow',
      type: 'array',
      of: [{
        name: "image",
        title: "Image",
        type: 'image', 
      }]
    }),
    defineField({
      name: 'screening',
      type: 'document',
      fields: [
        {
          name: 'news',
          title: 'News',
          type: 'reference',
          weak: true,
          to: [{type: 'news'}],
          description: 'Which movie are we screening'
        },
      ]
    })
  ],
  preview: {
    select: {
      title: 'title.en',
    },
    prepare({ title }) {
      return {
        title: title,
      };
    },
  },
});