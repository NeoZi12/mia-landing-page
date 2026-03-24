/**
 * src/app/studio/[[...tool]]/layout.tsx — Server Component wrapper for the Studio.
 *
 * - Exports the `metadata` and `viewport` values that next-sanity provides.
 *   These set the correct <title>, <meta> tags, and viewport for the Studio.
 * - `dynamic = 'force-dynamic'` prevents Next.js from trying to statically
 *   pre-render this route (the Studio is a fully client-side app).
 */
export { metadata, viewport } from 'next-sanity/studio'
export const dynamic = 'force-dynamic'

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
