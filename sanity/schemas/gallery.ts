import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: "image",
      title: "Image",
      validation: (Rule) => Rule.required(),
      type: 'image', 
    }),
    defineField({
      name: "width",
      title: "Image width",
      validation: (Rule) => Rule.required(),
      type: 'number', 
    }),
    defineField({
      name: "height",
      title: "Image height",
      validation: (Rule) => Rule.required(),
      type: 'number', 
    }),
    defineField({
      name: "alt",
      title: "Alternative text",
      validation: (Rule) => Rule.required(),
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
    }),
  ],
});