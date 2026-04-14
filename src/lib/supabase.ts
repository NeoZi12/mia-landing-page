/**
 * Server-only Supabase client using the service-role key.
 * Never import this in client components.
 *
 * Required Supabase setup (run once in the SQL editor):
 *
 * CREATE TABLE IF NOT EXISTS blog_posts (
 *   id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 *   slug          text UNIQUE NOT NULL,
 *   title         text NOT NULL,
 *   excerpt       text NOT NULL,
 *   intro         text,
 *   points        jsonb,
 *   content_md    text,
 *   meta_description text NOT NULL,
 *   keywords      text[] DEFAULT '{}',
 *   image_url     text NOT NULL,
 *   published_at  timestamptz DEFAULT now(),
 *   created_at    timestamptz DEFAULT now()
 * );
 *
 * -- Enable public read access (no auth needed to view posts):
 * ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "public read" ON blog_posts FOR SELECT USING (true);
 * CREATE POLICY "service role write" ON blog_posts FOR ALL USING (auth.role() = 'service_role');
 *
 * -- Storage bucket (create in Supabase dashboard > Storage > New bucket):
 * --   Name: blog-images
 * --   Public: true
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Service-role client — bypasses RLS, server-side only
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});

// Anon client — respects RLS, safe for read queries in server components
export const supabaseAnon = createClient(
  supabaseUrl,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } }
);
