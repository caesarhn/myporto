import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    creator: z.string(),
    description: z.string(),
    category: z.string(),
    Layout: z.string().optional()
  }),
});

export const collections = {
  blog: blogCollection,
};