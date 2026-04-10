import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";

export const BLOG_PATH = "src/data/blog";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      description: z.string().default(""),
      category: z.string().default("Others"),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      ogImage: image().or(z.string()).optional(),
      math: z.boolean().optional(),
      mermaid: z.boolean().optional(),
    }),
});

export const collections = { blog };
