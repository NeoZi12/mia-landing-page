/**
 * src/lib/sanity.ts — Sanity client for server-side data fetching.
 *
 * Uses `createClient` from `next-sanity` which wraps `@sanity/client`
 * with Next.js cache integration (fetch deduplication & revalidation).
 *
 * Import this file only in Server Components or Route Handlers.
 * Never import it in 'use client' files — use API routes instead.
 */
import { createClient } from 'next-sanity'

export const client = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  ? createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
      apiVersion: '2024-01-01',
      useCdn: process.env.NODE_ENV === 'production',
    })
  : null;
