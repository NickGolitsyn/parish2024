import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'parishhistory',
  title: 'Parish History',
  type: 'document',
  fields: [
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
          initialValue: [],
          of: [
            {type: 'block'},
            {type: 'youtube'},
            {type: 'image'}
          ]
        },
        {
          title: 'Romanian', 
          name: 'ro',
          type: 'array',
          initialValue: [],
          of: [
            {type: 'block'},
            {type: 'youtube'},
            {type: 'image'}
          ]
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'parishhistory.en'
    },
    prepare() {
      return {
        title: 'Parish History'
      }
    }
  },
});
