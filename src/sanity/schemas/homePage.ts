import { defineField, defineType } from 'sanity'

/**
 * homePage — singleton document that drives all editable text on the landing page.
 * Only one document of this type should ever exist.
 */
export const homePage = defineType({
  name: 'homePage',
  title: 'דף הבית',
  type: 'document',
  fields: [
    // ── Hero section ──────────────────────────────────────────────────────────
    defineField({
      name: 'heroBadge',
      title: 'Hero Badge (eyebrow text)',
      type: 'string',
      description: 'Small all-caps label above the heading, e.g. "משרד ללא נייר"',
    }),
    defineField({
      name: 'heroLine1',
      title: 'Hero Heading — Line 1 (white)',
      type: 'string',
      description: 'First heading line, rendered in white',
    }),
    defineField({
      name: 'heroLine2',
      title: 'Hero Heading — Line 2 (blue gradient)',
      type: 'string',
      description: 'Second heading line, rendered with a blue gradient',
    }),
    defineField({
      name: 'heroLine3',
      title: 'Hero Heading — Line 3 (blue gradient)',
      type: 'string',
      description: 'Third heading line, rendered with a blue gradient',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 3,
      description: 'Short paragraph below the heading',
    }),
    defineField({
      name: 'heroCtaLabel',
      title: 'Hero CTA Button Label',
      type: 'string',
      description: 'Text on the primary call-to-action button',
    }),
    defineField({
      name: 'heroCtaUrl',
      title: 'Hero CTA Button URL',
      type: 'string',
      description: 'Where the CTA button links to, e.g. "/contact" or "#contact"',
    }),
    defineField({
      name: 'heroScrollLabel',
      title: 'Hero Scroll Indicator Label',
      type: 'string',
      description: 'Text above the animated scroll arrow, e.g. "גלו עוד עלינו"',
    }),

    // ── About section ─────────────────────────────────────────────────────────
    defineField({
      name: 'aboutHeading',
      title: 'About Heading',
      type: 'string',
      description: 'Main heading of the About section, e.g. "קצת עלינו"',
    }),
    defineField({
      name: 'aboutBody',
      title: 'About Body',
      type: 'text',
      rows: 5,
      description: 'Main paragraph of the About section',
    }),
    defineField({
      name: 'aboutOrgsLabel',
      title: 'About — Organizations Label',
      type: 'string',
      description: 'Bold label above the organization list',
    }),
    defineField({
      name: 'aboutOrgs',
      title: 'About — Organizations',
      type: 'string',
      description: 'List of organizations, e.g. "רשות המסים · ביטוח לאומי · משרד האוצר"',
    }),
    defineField({
      name: 'aboutScrollLabel',
      title: 'About Scroll Indicator Label',
      type: 'string',
      description: 'Text above the animated scroll arrow in the About section',
    }),
  ],

  preview: {
    select: { title: 'heroLine1' },
    prepare: ({ title }) => ({ title: title ?? 'דף הבית' }),
  },
})
