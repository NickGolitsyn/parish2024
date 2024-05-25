import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'services',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
      options: {
        dateFormat: 'DD/MM/YYYY',
      },
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
  preview: {
    select: {
      date: 'date',
    },
    prepare({ date }) {
      return {
        title: `${new Date(date).toLocaleDateString()}`,
      };
    },
  },
});
