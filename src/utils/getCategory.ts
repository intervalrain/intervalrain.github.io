import type { CollectionEntry } from "astro:content";

/**
 * Derives category from the post's file path (top-level directory).
 * e.g. "src/data/blog/database/postgresql.md" → "database"
 *      "src/data/blog/aboutme.md" → "others"
 */
const getCategory = (post: CollectionEntry<"blog">): string => {
  // post.id is the relative path from the collection base, e.g. "database/postgresql-data-security.md"
  const parts = post.id.split("/");
  if (parts.length <= 1) return "others";
  return parts[0];
};

export default getCategory;
