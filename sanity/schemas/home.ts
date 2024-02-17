import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({
      name: 'slideshow',
      title: 'Slideshow',
      validation: (Rule) => Rule.required(),
      type: 'array',
      of: [{
        name: "image",
        title: "Image",
        validation: (Rule) => Rule.required(),
        type: 'image', 
      }]
    }),
    defineField({
      name: "welcomeText",
      title: "Welcome text",
      validation: (Rule) => Rule.required(),
      type: 'object', 
      fields: [
        {
          title: 'English',
          name: 'en',
          type: 'text'
        },
        {
          title: 'Romanian',
          name: 'ro',
          type: 'text'
        }
      ]
    }),
  ],
});