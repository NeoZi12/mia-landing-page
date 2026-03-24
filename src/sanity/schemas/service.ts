import { defineField, defineType } from 'sanity'

/**
 * service — one card in the Services section.
 * Each document represents a single service offering.
 */
export const service = defineType({
  name: 'service',
  title: 'שירות',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'שם השירות',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'תיאור',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'אייקון (Emoji או שם)',
      type: 'string',
      description: 'Optional emoji or icon identifier to display with this service',
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
    select: { title: 'title', subtitle: 'description' },
  },
})
