import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
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
      name: 'description',
      title: 'Description',
      validation: (Rule) => Rule.required(),
      type: 'object', 
      fields: [
        {
          title: 'English',
          name: 'en',
          type: 'array', 
          of: [{type: 'block'}]
        },
        {
          title: 'Romanian',
          name: 'ro',
          type: 'array', 
          of: [{type: 'block'}]
        }
      ]
    }),
    defineField({
      name: 'content',
      title: 'Content',
      validation: (Rule) => Rule.required(),
      type: 'object', 
      fields: [
        {
          title: 'English', 
          name: 'en',
          type: 'array', 
          of: [{type: 'block'}]
        },
        {
          title: 'Romanian', 
          name: 'ro',
          type: 'array', 
          of: [{type: 'block'}]
        }
      ]
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
          type: 'image', 
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
      name: 'button',
      title: 'Read button',
      type: 'boolean',
      validation: (Rule) => Rule.required(),
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
