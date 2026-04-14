-- Structured blog template (2026-04-14)
-- Adds: subtitle, intro, points (jsonb array of single-line strings)
-- content_md becomes optional so new posts can use structured fields only.

ALTER TABLE blog_posts
  ADD COLUMN IF NOT EXISTS intro    text,
  ADD COLUMN IF NOT EXISTS points   jsonb;

ALTER TABLE blog_posts
  ALTER COLUMN content_md DROP NOT NULL;
