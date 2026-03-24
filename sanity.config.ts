/**
 * sanity.config.ts — root Sanity Studio configuration.
 *
 * This file is imported by the embedded Studio at /studio.
 * It lives at the project root so that Sanity CLI commands
 * (e.g. `npx sanity deploy`) can find it automatically.
 */
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Mia Landing Page',

  /**
   * basePath tells the Studio's internal router where it is mounted inside
   * the Next.js app. Without this, the Studio sees "/studio" in the URL and
   * tries to treat "studio" as a tool name → "Tool not found: studio".
   */
  basePath: '/studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',

  plugins: [
    structureTool(), // the main content editing UI
  ],

  schema: {
    types: schemaTypes,
  },
})
