'use client'
/**
 * src/app/studio/[[...tool]]/page.tsx — Embedded Sanity Studio.
 *
 * `[[...tool]]` is an optional catch-all segment so every Studio sub-route
 * (e.g. /studio/desk, /studio/vision) is handled by this single file.
 *
 * The `'use client'` directive is required because the Studio is a rich
 * interactive React app that uses browser APIs extensively.
 *
 * `NextStudio` mounts the full Sanity Studio v3 inside your Next.js app.
 */
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
