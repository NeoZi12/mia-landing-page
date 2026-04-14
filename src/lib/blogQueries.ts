import { supabaseAnon } from "./supabase";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  intro: string | null;
  points: string[] | null;
  content_md: string | null;
  meta_description: string;
  keywords: string[];
  image_url: string;
  published_at: string;
  created_at: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabaseAnon
    .from("blog_posts")
    .select("id, slug, title, excerpt, image_url, published_at, keywords")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("getAllPosts error:", error.message);
    return [];
  }
  return (data as BlogPost[]) ?? [];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabaseAnon
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("getPostBySlug error:", error.message);
    return null;
  }
  return data as BlogPost;
}

export async function getAllSlugs(): Promise<string[]> {
  const { data, error } = await supabaseAnon
    .from("blog_posts")
    .select("slug, published_at")
    .order("published_at", { ascending: false });

  if (error) return [];
  return (data ?? []).map((r: { slug: string }) => r.slug);
}
