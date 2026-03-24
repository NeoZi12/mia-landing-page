import { defineField, defineType } from 'sanity'

/**
 * faq — a single frequently-asked question and its answer.
 */
export const faq = defineType({
  name: 'faq',
  title: 'שאלה נפוצה',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'שאלה',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'תשובה',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'סדר תצוגה',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],

  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],

  preview: {
    select: { title: 'question' },
  },
})
