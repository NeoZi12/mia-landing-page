import { defineField, defineType } from 'sanity'

/**
 * testimonial — a client quote / review card.
 */
export const testimonial = defineType({
  name: 'testimonial',
  title: 'המלצה',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'שם הלקוח',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clientTitle',
      title: 'תפקיד / עסק',
      type: 'string',
      description: 'e.g. "בעל עסק עצמאי" or "מנהל כספים"',
    }),
    defineField({
      name: 'quote',
      title: 'ציטוט',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'דירוג (1–5)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5).integer(),
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
    select: { title: 'clientName', subtitle: 'quote' },
  },
})
