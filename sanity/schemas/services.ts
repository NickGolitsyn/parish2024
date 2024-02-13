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
      name: 'fastingCode',
      title: 'Fasting Code',
      validation: (Rule) => Rule.required(),
      type: 'string',
      options: {
        list: [
          { title: 'f3 - Strict vegan diet, no animal products, no oil or alcohol; (other than fish itself, sea foods are permitted on f3 days);', value: 'f3' },
          { title: 'f2 - as f3, but wine (alcohol) & oil also permitted;', value: 'f2' },
          { title: 'f1 - as f2, but fish also permitted;', value: 'f1' },
          { title: 'nf - no fasting enjoined, all foods permitted.', value: 'nf' },
        ],
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
    defineField({
      name: 'bibleReadings',
      title: 'Bible Readings',
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
