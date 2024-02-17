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