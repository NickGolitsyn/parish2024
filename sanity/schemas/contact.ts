import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({
      name: "contact",
      title: "Contact us",
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
      name: "email",
      title: "Contact email",
      validation: (Rule) => Rule.required(),
      type: 'string', 
    }),
    defineField({
      name: "tel",
      title: "Contact phone number",
      validation: (Rule) => Rule.required(),
      type: 'string', 
    }),
    defineField({
      name: "vitis",
      title: "Visit us",
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
      name: "address",
      title: "Church address",
      validation: (Rule) => Rule.required(),
      type: 'string', 
    }),
  ],
});