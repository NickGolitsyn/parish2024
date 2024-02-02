import {NumberRule, defineField, defineType} from 'sanity';

export default defineType({
  name: "foodItems",
  title: "Food Items",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        {
          type: "string"
        },
      ],
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (rule: NumberRule) => rule.required().min(1).max(5)
    }),
  ],
});