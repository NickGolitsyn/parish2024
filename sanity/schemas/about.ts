import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: "parish",
      title: "About our parish",
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
    defineField({
      name: "saints",
      title: "About out saints",
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
  options: {
    singleInstance: true,
    preview: {
      select: {
        title: 'about.en'
      },
      prepare() {
        return {
          title: 'About'
        }
      }
    }
  },
});
