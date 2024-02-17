import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'donate',
  title: 'Donate',
  type: 'document',
  fields: [
    defineField({
      name: "donateDesc",
      title: "Description",
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
      name: "link",
      title: "Payment link",
      validation: (Rule) => Rule.required(),
      type: 'string', 
    }),
  ],
});